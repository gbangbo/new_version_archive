import {Component, EventEmitter, HostListener, Input, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import Swal from "sweetalert2";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {environment} from "../../../../../../environments/environment";
import {Authorization} from "../../../../../protect/authorization.service";
import {HttpService} from "../../../../../core/http.service";

@Component({
    selector: 'app-add-modal',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NzSwitchModule],
    templateUrl: './add-modal.component.html',
    styleUrl: './add-modal.component.scss',
})
export class AddModalComponent {
    @Output() modalOpen = new EventEmitter<boolean>();
    @Input() dataLigne: any;

    public validationForm = new FormGroup({
        code_categories: new FormControl('', Validators.required),
        name_categories: new FormControl('', Validators.required),
        idcategories: new FormControl('',),
        idtype_document: new FormControl('',),
        position: new FormControl('',),
        actif: new FormControl(true,),
        parent: new FormControl('',),
    });

    errorTexte: string = '';
    imageUrl: string = '';

    @HostListener('document:keydown.escape', ['$event'])
    handleEscKey() {
        this.closeModal();
    }

    isloading: boolean = false;
    users: any = [];
    typeAlerte: string = '';
    title: string = '';

    constructor(private autor: Authorization, private httService: HttpService) {
        this.users = this.autor.getInfosUsers();
    }

    ngOnChanges(changes: SimpleChanges) {
        const data = changes['dataLigne']?.currentValue;
        console.log("data ====", data)
        if (data && Object.keys(data).length > 0) {
            this.validationForm.patchValue({
                name_categories: data.sens == 'a' ? '' : data?.name,
                code_categories: data.sens == 'a' ? '' : data?.code_categories,
                idcategories: data.sens == 'a' ? '' : data?.key,
                idtype_document: data?.uid_type_docs,
                position: data?.position || '',
                actif: data?.actif || true,
                parent: data?.parent,
            });
            this.title = data?.sens == 'a' ? `AJOUT DE SOUS-DOSSIER` : `MODIFICATION DE SOUS-DOSSIER`
            this.errorTexte = `Vous êtes sur le point ${data?.sens == 'a' ? `d’ajouter un` : `de modifier le`} sous-dossier  ${data?.sens == 'a' ? `au dossier` : ``} « ${changes['dataLigne']?.currentValue?.name} ».`;
            this.typeAlerte = 'prim';

            console.log(" this.validationForm ====", this.validationForm.value)
        }
    }

    submitForm(): void {
        this.errorTexte = ''
        let payload = {
            "action": this.validationForm.value.idcategories ? 2 : 1,
            "idcategorie_personnel": '',
            // "idcategories": this.validationForm.value.idcategories || '',
            "idpersonnel": this.users?.datapersonnel?.uid || '',
            // "code_categories": this.validationForm.value.code_categories || '',
            "name_categories": this.validationForm.value.name_categories || '',
            position: parseInt(String(this.validationForm.value.position || 0)),
            "actif": this.validationForm.value.actif || '',
            "parent": this.validationForm.value.parent || '',
            "idsociete": this.users?.datasociete?.uid,
        }

        this.isloading = true;
        console.log("payload ======", payload)

        this.httService.postData(`${environment.api_url}auth/:save-categorie-plan-classement-personnel`, payload, this.users?.access_token)
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                console.log("Res +++ ", res.body)
                if (res.body.status || res.body.success) {
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
                this.typeAlerte = 'danger';
                this.errorTexte = `${err?.error?.err?.message || 'Une erreur est survenue.'} `;
            });

    }

    closeModal(e?: boolean) {
        this.modalOpen.emit(e || false);
    }

}
