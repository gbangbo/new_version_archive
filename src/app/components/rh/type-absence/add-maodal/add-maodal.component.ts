import {Component, EventEmitter, HostListener, Input, Output, SimpleChanges} from '@angular/core';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    ValidationErrors,
    Validators
} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {environment} from "../../../../../environments/environment";
import {Authorization} from "../../../../protect/authorization.service";
import {HttpService} from "../../../../core/http.service";
import Swal from "sweetalert2";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {Select2Module} from "ng-select2-component";

@Component({
    selector: 'app-add-maodal',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NzSwitchModule, Select2Module],
    templateUrl: './add-maodal.component.html',
    styleUrl: './add-maodal.component.scss',
})
export class AddMaodalComponent {
    @Output() modalOpen = new EventEmitter<boolean>();
    @Input() dataLigne: any;

    validationForm = new FormGroup({
        idtype_absence: new FormControl('',),
        type_absence: new FormControl('', Validators.required),
        lib_type_absence: new FormControl('', Validators.required),
        dure_absence: new FormControl('', [
            Validators.required,
            Validators.min(1),
            this.entierPositifValidator
        ])
    })
    dataType: any = [
        {value: 'conge', label: 'congé'},
        {value: 'permission', label: 'permission'}
    ]
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
            console.log("Update user ", changes['dataLigne']?.currentValue)
            this.validationForm.patchValue({
                ...changes['dataLigne']?.currentValue,
                idtype_absence: changes['dataLigne']?.currentValue.uid || changes['dataLigne']?.currentValue.id
            });
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
            ...this.validationForm.value,
            "action": this.validationForm.value.idtype_absence ? 2 : 1,
            "idtype_absence": this.validationForm.value.idtype_absence || '',
            "idsociete": this.users?.datasociete?.uid,
        }

        console.log("payload ===", payload)
        this.httService.postData(`${environment.api_url}auth/:save-type-absence`, payload, this.users?.access_token || '')
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
    entierPositifValidator(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
        if (!value) return null; // laisser required gérer le champ vide

        const nombre = Number(value);
        if (!Number.isInteger(nombre) || nombre <= 0) {
            return { entierPositif: true };
        }
        return null;
    }
}


