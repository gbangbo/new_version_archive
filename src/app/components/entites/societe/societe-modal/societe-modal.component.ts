import {Component, EventEmitter, HostListener, Input, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {environment} from "../../../../../environments/environment";
import {Authorization} from "../../../../protect/authorization.service";
import {HttpService} from "../../../../core/http.service";
import Swal from "sweetalert2";
import {ImageUploadComponent} from "../../../users/widgets/image-upload/image-upload.component";
import {NzSwitchModule} from "ng-zorro-antd/switch";

@Component({
    selector: 'app-societe-modal',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, ImageUploadComponent, NzSwitchModule],
    templateUrl: './societe-modal.component.html',
    styleUrl: './societe-modal.component.scss',
})
export class SocieteModalComponent {
    @Output() modalOpen = new EventEmitter<boolean>();
    @Input() dataLigne: any;

    public validationForm = new FormGroup({
        raison_sociale: new FormControl('', Validators.required),
        uid: new FormControl('',),
        telephone: new FormControl('',),
        email: new FormControl('',),
        localisation: new FormControl('',),
        active: new FormControl('',),

    })
    errorTexte: string = '';

    @HostListener('document:keydown.escape', ['$event'])
    handleEscKey() {
        this.closeModal();
    }

    isloading: boolean = false;
    users: any = [];

    constructor(private autor: Authorization, private httService: HttpService) {
        this.users = this.autor.getInfosUsers();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['dataLigne'] && changes['dataLigne']?.currentValue) {
            this.validationForm.patchValue(changes['dataLigne']?.currentValue);
        }
    }

    submitForm() {
        this.errorTexte = '';
        this.validationForm.markAllAsTouched();
        if (!this.validationForm.valid) {
            return;
        }

        this.isloading = true;
        let payload = {
            "action": this.validationForm.value.uid ? 2 : 1,
            "idsociete": this.users?.dataSociete?.uid,
            ...this.validationForm.value
        }
        console.log("payload ===", payload)
        this.httService.postData(`${environment.api_url}auth/:savesociete`, payload, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res.body.status) {
                    this.closeModal(true);
                    Swal.fire({
                        title: res?.body?.message,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                }
            })
            .catch((err) => {
                this.isloading = false;
                console.log("err", err)
                this.isloading = false;
                this.errorTexte = err?.error?.err?.message || "Une erreur est survenue !"
                this.isloading = false;
            });
    }

    closeModal(e?: boolean) {
        this.modalOpen.emit(e || false);
    }

    onImageSelected(file: File): void {
        console.log('Fichier sélectionné:', file);

        // Exemple: Upload vers votre API
        const formData = new FormData();
        formData.append('image', file);

        // this.http.post('votre-api/upload', formData).subscribe(...);
    }

    onImageRemoved(): void {
        console.log('Image supprimée');
    }
}
