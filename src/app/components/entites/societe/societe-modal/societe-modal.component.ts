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
        double_auth: new FormControl('',),
        actif: new FormControl(true,),
        position: new FormControl('',),
        parent: new FormControl('',),
        sens: new FormControl('',),
        action: new FormControl('',)

    })
    errorTexte: string = '';
    imageUrl: string = '';

    @HostListener('document:keydown.escape', ['$event'])
    handleEscKey() {
        this.closeModal();
    }

    isloading: boolean = false;
    users: any = [];
    selectedFile: File | null = null;
    typeAlerte: string = '';
    title: string = 'Ajouter une société';
    // Pilote le libellé et l'icône du bouton de validation
    isEdit: boolean = false;

    constructor(private autor: Authorization, private httService: HttpService) {
        this.users = this.autor.getInfosUsers();
    }

    ngOnChanges(changes: SimpleChanges) {
        // if (changes['dataLigne'] && changes['dataLigne']?.currentValue) {
        //     this.imageUrl = changes['dataLigne']?.currentValue?.logo || '';
        //     console.log(changes['dataLigne']?.currentValue)
        //     this.validationForm.patchValue({
        //         ...changes['dataLigne']?.currentValue,
        //         parent: changes['dataLigne']?.currentValue?.parent
        //     });
        //     if (changes['dataLigne']?.currentValue?.parent) {
        //         this.title = `AJOUT DE SOUS SOCIETE`
        //         this.errorTexte = `Vous êtes sur le point d'ajouter une sous société à la société ${changes['dataLigne']?.currentValue?.r}`;
        //         this.typeAlerte = 'prim';
        //     }
        //     if (changes['dataLigne']?.currentValue?.uid) {
        //         this.title = `MODIFICATION DE LA SOCIETE`;
        //     }
        // }


        const data = changes['dataLigne']?.currentValue;
        console.log("data ====", data)
        if (data && Object.keys(data).length > 0) {
            // En modification, on affiche le logo déjà enregistré
            this.imageUrl = data.sens == 'a' ? '' : (data?.logo || '');
            this.validationForm.patchValue({
                raison_sociale: data.sens == 'a' ? '' : data?.name,
                telephone: data.sens == 'a' ? '' : data?.telephone,
                email: data.sens == 'a' ? '' : data?.email,
                localisation: data.sens == 'a' ? '' : data?.localisation,
                double_auth: data.sens == 'a' ? '' : data?.double_auth,
                position: data?.position || '',
                actif: data?.actif || true,
                parent: data?.parent,
                uid: data?.key || '',
                action: data?.action || '',
            });

            // {
            //     raison_sociale: new FormControl('', Validators.required),
            //         uid: new FormControl('',),
            //     telephone: new FormControl('',),
            //     email: new FormControl('',),
            //     localisation: new FormControl('',),
            //     double_auth: new FormControl('',),
            //     actif: new FormControl(true,),
            //     position: new FormControl('',),
            //     parent: new FormControl('',)
            //
            // }

            console.log("this.validationForm ===", this.validationForm.value)
            this.isEdit = data?.sens != 'a';
            this.title = data?.sens == 'a' ? `Ajouter une sous-société` : `Modifier la sous-société`
            this.errorTexte = `Vous êtes sur le point ${data?.sens == 'a' ? `d’ajouter un` : `de modifier la`} sous-société  ${data?.sens == 'a' ? `à la société` : ``} « ${changes['dataLigne']?.currentValue?.name} ».`;
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
        const payload = {
            ...this.validationForm.value,
            "action": this.validationForm.value.action || '1',
            "double_auth": this.validationForm.value.double_auth ? 1 : 0,
            "parent": this.validationForm.value.parent || '',
            "idsociete": this.users?.datasociete?.uid,
        };

        // 1) Les données du formulaire, par la passerelle chiffrée.
        let rPons: any = {};
        try {
            const res: any = await this.httService
                .postData(`${environment.api_url}auth/:savesociete`, payload, this.users?.access_token || '')
                .toPromise();
            rPons = res?.body || {};
        } catch (e: any) {
            this.isloading = false;
            this.errorTexte = e?.error?.err?.message || e?.error?.message || "Une erreur est survenue !";
            this.typeAlerte = 'danger';
            return;
        }

        if (!rPons?.status) {
            this.isloading = false;
            this.errorTexte = `${rPons?.message || 'Une erreur est survenue.'}`;
            this.typeAlerte = 'danger';
            return;
        }

        const societeUid = rPons?.data?.uid || this.validationForm.value.uid || '';
        const libelle = rPons?.message || 'La société a bien été enregistrée.';

        // 2) Aucun logo choisi : il n'y a que le formulaire à annoncer.
        if (!this.selectedFile) {
            this.isloading = false;
            this.closeModal(true);
            Swal.fire({
                title: 'Enregistrement effectué',
                text: `${libelle} Aucun logo n'a été sélectionné.`,
                icon: 'success',
                confirmButtonText: 'OK'
            });
            return;
        }

        // 3) Le logo passe par la même passerelle que le reste : l'appel direct
        //    vers URL_API était bloqué par CORS depuis le navigateur.
        const formData = new FormData();
        formData.append('societe_uid', societeUid);
        formData.append('logo', this.selectedFile, this.selectedFile.name);

        let logoOk = false;
        let logoMessage = '';
        try {
            const resLogo: any = await this.httService
                .postDataMultipart(`${environment.api_url}auth/:save-logo-societe`, formData, this.users?.access_token || '')
                .toPromise();
            logoOk = !!(resLogo?.body?.status || resLogo?.body?.success);
            logoMessage = resLogo?.body?.message || '';
        } catch (e: any) {
            logoMessage = e?.error?.err?.message || e?.error?.message || '';
        }

        this.isloading = false;
        // La société existe déjà côté serveur : on ferme et on rafraîchit même
        // si le logo a échoué, sinon un nouvel envoi la créerait en double.
        this.closeModal(true);

        if (logoOk) {
            Swal.fire({
                title: 'Enregistrement effectué',
                text: `${libelle} Le logo a également été enregistré.`,
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } else {
            Swal.fire({
                title: 'Enregistrement partiel',
                text: `${libelle} En revanche, le logo n'a pas pu être enregistré${logoMessage ? ` : ${logoMessage}` : ''}. Reprenez-le en modifiant la société.`,
                icon: 'warning',
                confirmButtonText: 'OK'
            });
        }
    }

    closeModal(e?: boolean) {
        this.modalOpen.emit(e || false);
    }


    onImageSelected(file: File): void {
        this.selectedFile = file;
    }

    onImageRemoved(): void {
        this.selectedFile = null;
    }
}
