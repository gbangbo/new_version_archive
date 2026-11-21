import {Component, EventEmitter, HostListener, Input, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {environment} from "../../../../../../environments/environment";
import {Authorization} from "../../../../../protect/authorization.service";
import {HttpService} from "../../../../../core/http.service";
import Swal from "sweetalert2";
import {HttpClient} from "@angular/common/http";
import {NzTreeSelectModule} from "ng-zorro-antd/tree-select";

@Component({
    selector: 'app-add-modal',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NzTreeSelectModule],
    templateUrl: './add-modal.component.html',
    styleUrl: './add-modal.component.scss',
})
export class AddModalComponent {
    @Output() modalOpen = new EventEmitter<boolean>();
    @Input() dataLigne: any;

    public validationForm = new FormGroup({
        idsociete: new FormControl('', Validators.required),
        sigle: new FormControl('', Validators.required),
        libelle: new FormControl('', Validators.required),
        idorganigramme: new FormControl('',),
        parent: new FormControl('',)

    })
    errorTexte: string = '';
    imageUrl: string = '';

    @HostListener('document:keydown.escape', ['$event'])
    handleEscKey() {
        this.closeModal();
    }

    isloading: boolean = false;
    users: any = [];
    dataSociete: any = [];
    typeAlerte: string = '';
    title: string = 'Ajouter un niveau';
    isEdit: boolean = false;
    // Les messages d'erreur n'apparaissent qu'apres une saisie ou une tentative d'envoi :
    // nz-tree-select se marque « touched » des son initialisation.
    soumisTente: boolean = false;

    expandKeys = [];
    is: boolean = false;
    isload: boolean = false;

    constructor(private autor: Authorization, private httService: HttpService, private http: HttpClient) {
        this.users = this.autor.getInfosUsers();
        this.showSociete(this.users?.datasociete?.code_societe)
    }

    ngOnChanges(changes: SimpleChanges) {

        const data = changes['dataLigne']?.currentValue;
        this.is = data?.is || false;

        if (data && Object.keys(data).length > 0) {
            // Titre et rappel affiches tout de suite : le patch du formulaire, lui, attend l'arbre des societes
            this.isEdit = data?.sens != 'a';
            this.title = data?.sens == 'a' ? `Ajouter un sous-niveau` : `Modifier le sous-niveau`;
            this.errorTexte = `Vous êtes sur le point ${data?.sens == 'a' ? `d’ajouter un sous-niveau a` : `de modifier le sous-niveau`} « ${data?.name} ».`;
            this.typeAlerte = 'prim';
        }

        setTimeout(() => {
            if (data && Object.keys(data).length > 0) {

                this.validationForm.patchValue({
                    libelle: data.sens == 'a' ? '' : data?.name,
                    sigle: data.sens == 'a' ? '' : data?.sigle,
                    idsociete: !data.sens ? '' : data?.datasociete.uid,
                    idorganigramme: data.sens == 'a' ? '' : data?.idorganigramme,
                    parent: data?.parent,
                });

            }
        }, 1000)

    }

    showSociete(code_societe: string = '') {
        this.dataSociete = [];
        this.isload = true;
        this.httService.getData(`${environment.api_url}auth/:savesociete?code_societe=${code_societe}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isload = false;
                if (res.body.status || res.body.success) {
                    this.dataSociete = res.body.data.map((e: any) => {
                        return this.formatNode(e);
                    });
                }
            })
            .catch((err) => {
                this.isload = false;
            });
    }

    formatNode(node: any): any {
        return {
            title: node.raison_sociale,
            key: node.uid,

            isLeaf: !node.children || node.children.length === 0,

            children: node.children?.map((child: any) => {
                return this.formatNode(child);
            }) || []
        };
    }

    // Un champ n'est signale qu'apres saisie ou tentative d'envoi
    champEnErreur(nom: string): boolean {
        const champ = this.validationForm.get(nom);
        return !!champ && champ.hasError('required') && (this.soumisTente || champ.dirty);
    }

    submitForm(): void {
        this.soumisTente = true;
        this.validationForm.markAllAsTouched();
        if (!this.validationForm.valid) {
            return;
        }

        this.errorTexte = '';
        this.typeAlerte = '';
        let payload = {
            ...this.validationForm.value,
            "action": this.validationForm.value.idorganigramme ? 2 : 1,
            "parent": this.validationForm.value.parent || ''
        }

        this.isloading = true;

        this.httService.postData(`${environment.api_url}auth/:save-service-organigramme`, payload, this.users?.access_token)
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
