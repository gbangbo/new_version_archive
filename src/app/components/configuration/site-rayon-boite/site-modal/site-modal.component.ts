import {Component, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {environment} from "../../../../../environments/environment";
import {Authorization} from "../../../../protect/authorization.service";
import {HttpService} from "../../../../core/http.service";
import Swal from 'sweetalert2';

@Component({
    selector: 'app-site-modal',
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './site-modal.component.html',
    styleUrl: './site-modal.component.scss',
})
export class SiteModalComponent implements OnChanges {
    @Output() modalOpen = new EventEmitter<boolean>();
    @Input() dataLigne: any;

    public validationForm = new FormGroup({
        libelle_sites: new FormControl('', Validators.required),
        uid: new FormControl('')
    })

    @HostListener('document:keydown.escape', ['$event'])
    handleEscKey() {
        this.closeModal();
    }

    isloading: boolean = false;
    users: any = [];
    errorTexte: string = "";

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
        console.log()
        if (!this.validationForm.valid) {
            return;
        }

        this.isloading = true;
        let payload = {
            "action": this.validationForm.value.uid ? 2 : 1,
            "idsociete": this.users?.dataSociete?.uid,
            "idsite": this.validationForm.value.uid || '',
            "libelle_sites": this.validationForm.value.libelle_sites
        }
        console.log("payload ===", payload)
        this.httService.postData(`${environment.api_url}api/:savesites`, payload, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res.body.status) {
                    this.dataLigne = {};
                    this.validationForm.reset({});
                    this.closeModal(true);
                    // Swal.fire({
                    //     title: res?.body?.message,
                    //     icon: 'success',
                    //     toast: true,
                    //     timer: 3000,
                    //     timerProgressBar: true,
                    //     showConfirmButton: false,
                    //     position: 'top-end'
                    // })
                    Swal.fire({
                        title: res?.body?.message,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })

                    console.log("res.body  ======", res.body)
                }
            })
            .catch((err) => {
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

