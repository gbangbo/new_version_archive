import {Component, EventEmitter, HostListener, Input, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {environment} from "../../../../../environments/environment";
import {Authorization} from "../../../../protect/authorization.service";
import {HttpService} from "../../../../core/http.service";
import Swal from "sweetalert2";

/** Valeurs attendues par `auth/:types-objets` pour le champ `action`. */
export enum TypeObjetAction {
    Creer = 1,
    Modifier = 2,
    Supprimer = 3,
}

@Component({
    selector: 'app-type-objet-modal',
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './type-objet-modal.component.html',
    styleUrl: './type-objet-modal.component.scss',
})
export class TypeObjetModalComponent {
    @Output() modalOpen = new EventEmitter<boolean>();
    @Input() dataLigne: any;

    public validationForm = new FormGroup({
        code_type_objet: new FormControl('', Validators.required),
        lib_type_objet: new FormControl('', Validators.required),
        uid: new FormControl(''),
    })

    errorTexte: string = '';
    isloading: boolean = false;
    users: any = [];

    @HostListener('document:keydown.escape', ['$event'])
    handleEscKey() {
        this.closeModal();
    }

    constructor(private autor: Authorization, private httService: HttpService) {
        this.users = this.autor.getInfosUsers();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['dataLigne'] && changes['dataLigne']?.currentValue) {
            const ligne = changes['dataLigne'].currentValue;
            this.validationForm.patchValue({
                code_type_objet: ligne?.code_type_objet || '',
                lib_type_objet: ligne?.lib_type_objet || '',
                uid: ligne?.uid || '',
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
        // l'action dépend du contexte : création ou modification de la ligne ouverte
        const action = this.validationForm.value.uid ? TypeObjetAction.Modifier : TypeObjetAction.Creer;
        const payload = {
            action,
            idsociete: this.users?.datasociete?.uid || this.users?.uidsociete || '',
            idtypeobjet: this.validationForm.value.uid || '',
            code_type_objet: this.validationForm.value.code_type_objet,
            lib_type_objet: this.validationForm.value.lib_type_objet,
        };
        console.log("payload ==", payload)
        this.httService.postData(`${environment.api_url}auth/:types-objets`, payload, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res.body.status || res.body.success) {
                    this.closeModal(true);
                    Swal.fire({
                        title: res?.body?.message,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                } else {
                    this.errorTexte = res?.body?.message || "Une erreur est survenue !";
                }
            })
            .catch((err) => {
                this.isloading = false;
                this.errorTexte = err?.error?.err?.message || "Une erreur est survenue !";
            });
    }

    closeModal(e?: boolean) {
        this.modalOpen.emit(e || false);
    }
}
