import {Component, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {Authorization} from '../../../../protect/authorization.service';
import {HttpService} from '../../../../core/http.service';
import {environment} from '../../../../../environments/environment';
import Swal from 'sweetalert2';

const TYPE_FILE_OPTIONS = [
    {label: 'Documents',         value: 1, color: '#7366ff'},
    {label: 'Chargement de fichier',            value: 2, color: '#54ba4a'},
    {label: 'Upload temporaire', value: 3, color: '#f8c01c'},
];

@Component({
    selector: 'app-repertoire-modal',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NzSelectModule, NzTagModule],
    templateUrl: './repertoire-modal.component.html',
    styleUrl: './repertoire-modal.component.scss',
})
export class RepertoireModalComponent implements OnChanges {

    @Output() modalOpen = new EventEmitter<boolean>();
    @Input() dataLigne: any = {};

    typeFileOptions = TYPE_FILE_OPTIONS;
    isloading = false;
    errorTexte = '';
    users: any = [];

    validationForm = new FormGroup({
        uid:              new FormControl(''),
        path_repertoire:  new FormControl('', Validators.required),
        type_file:        new FormControl<number | null>(null, Validators.required),
    });

    @HostListener('document:keydown.escape')
    handleEscKey() { this.closeModal(); }

    constructor(private autor: Authorization, private httService: HttpService) {
        this.users = this.autor.getInfosUsers();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['dataLigne']?.currentValue) {
            const row = changes['dataLigne'].currentValue;
            this.validationForm.patchValue({
                uid:             row.uid             || '',
                path_repertoire: row.path_repertoire || '',
                type_file:       row.type_file       ?? null,
            });
        }
    }

    get isEdit(): boolean {
        return !!this.validationForm.value.uid;
    }

    submitForm(): void {
        this.errorTexte = '';
        this.validationForm.markAllAsTouched();
        if (!this.validationForm.valid) return;

        const v = this.validationForm.value;
        const payload = {
            action:          this.isEdit ? 2 : 1,
            idrepertoire:    v.uid || '',
            idsociete:       this.users?.datasociete?.uid || this.users?.uidsociete || '',
            path_repertoire: v.path_repertoire,
            type_file:       v.type_file,
        };

        this.isloading = true;
        this.httService
            .postData(`${environment.api_url}api/:saverepertoires`, payload, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res.body.status || res.body.success) {
                    Swal.fire({title: res?.body?.message, icon: 'success', confirmButtonText: 'OK'});
                    this.validationForm.reset();
                    this.closeModal(true);
                } else {
                    Swal.fire({title: res?.body?.message || 'Une erreur est survenue.', icon: 'error', confirmButtonText: 'OK'});
                }
            })
            .catch((err: any) => {
                this.isloading = false;
                this.errorTexte = err?.error?.err?.message || 'Une erreur est survenue !';
            });
    }

    closeModal(refresh = false): void {
        this.validationForm.reset();
        this.errorTexte = '';
        this.modalOpen.emit(refresh);
    }
}
