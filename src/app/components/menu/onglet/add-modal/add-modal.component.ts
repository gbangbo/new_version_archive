import {Component, EventEmitter, HostListener, Input, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {environment} from "../../../../../environments/environment";
import {Authorization} from "../../../../protect/authorization.service";
import {HttpService} from "../../../../core/http.service";
import Swal from "sweetalert2";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {Select2Module} from "ng-select2-component";

@Component({
    selector: 'app-add-modal',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NzSwitchModule, Select2Module],
    templateUrl: './add-modal.component.html',
    styleUrl: './add-modal.component.scss',
})
export class AddModalComponent {
    @Output() modalOpen = new EventEmitter<boolean>();
    @Input() dataLigne: any;

    public validationForm = new FormGroup({
        title: new FormControl('', Validators.required),
        path: new FormControl('', Validators.required),
        icon: new FormControl('',),
        idmenu: new FormControl('',),
        icontype: new FormControl('', Validators.required),
        iTrue: new FormControl('',),
        identity: new FormControl('',),
        rupture: new FormControl('',),
        rang: new FormControl('',),
        position: new FormControl('',),
        parent: new FormControl('',),
        actif: new FormControl(true,)
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
            console.log("Update user ", changes['dataLigne']?.currentValue)
            this.validationForm.patchValue({
                ...changes['dataLigne']?.currentValue,
                idfonction: changes['dataLigne']?.currentValue.uid
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
            "action": this.validationForm.value.idmenu ? 2 : 1,
            "idmenu": this.validationForm.value.idmenu || '',
            "position": this.validationForm.value.position || 0,
            "identity": this.validationForm.value.identity || 0,
            "iTrue": this.validationForm.value.iTrue || 1,
            "rupture": this.validationForm.value.rupture || 0,
            "idsociete": this.users?.datasociete?.uid,
        }

        console.log("payload ===", payload)
        this.httService.postData(`${environment.api_url}auth/:menu`, payload, this.users?.access_token || '')
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
}
