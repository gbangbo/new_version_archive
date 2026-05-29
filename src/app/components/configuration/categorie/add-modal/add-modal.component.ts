import {Component, EventEmitter, HostListener, Input, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {environment} from "../../../../../environments/environment";
import {Authorization} from "../../../../protect/authorization.service";
import {HttpService} from "../../../../core/http.service";
import Swal from "sweetalert2";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {decryptData, postDataCrypte} from "../../../../config/config";

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
        name_categories: new FormControl('', Validators.required),
        code_categories: new FormControl('', Validators.required),
        idcategories: new FormControl('',),
        actif: new FormControl(true,),
        parent: new FormControl('',)

    })
    errorTexte: string = '';

    @HostListener('document:keydown.escape', ['$event'])
    handleEscKey() {
        this.closeModal();
    }

    isloading: boolean = false;
    users: any = [];
    typeAlerte: string = '';
    title: string = `AJOUTER UNE SERIE`;

    constructor(private autor: Authorization, private httService: HttpService, private http: HttpClient) {
        this.users = this.autor.getInfosUsers();
    }

    ngOnChanges(changes: SimpleChanges) {

        const data = changes['dataLigne']?.currentValue;
        console.log("data ====", data)
        if (data && Object.keys(data).length > 0) {
            this.validationForm.patchValue({
                name_categories: data.sens == 'a' ? '' : data?.name_categories,
                code_categories: data.sens == 'a' ? '' : data?.code_categories,
                idcategories: data.sens == 'a' ? '' : data?.idcategories,
                actif: data?.actif || true,
                parent: data?.parent,
            });
            console.log("this.validationForm ===", this.validationForm.value)
            this.title = data?.sens == 'a' ? `AJOUT DE SERIE` : `MODIFICATION DE SERIE`
            this.errorTexte = `Vous êtes sur le point de modifier la série « ${changes['dataLigne']?.currentValue?.name} ».`;
            this.typeAlerte = 'prim';
        }
    }

    async submitForm() {
        this.errorTexte = '';
        this.validationForm.markAllAsTouched();
        if (!this.validationForm.valid) {
            return;
        }

        this.isloading = true;
        let payload = {
            ...this.validationForm.value,
            "action": this.validationForm.value.idcategories ? 2 : 1,
            "parent": this.validationForm.value.parent || '',
            "idsociete": "",
            position: 1
        }
        console.log("payload ====", payload)
        this.httService.postData(`${environment.api_url}api/:save-categorie-plan-classement`, payload, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                console.log("res.body ===", res.body)
                if (res.body.status || res.body.success) {
                    this.closeModal(true);
                    Swal.fire({
                        title: res?.body?.message,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                } else {
                    Swal.fire({
                        title: res?.body?.message,
                        icon: 'error',
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
}
