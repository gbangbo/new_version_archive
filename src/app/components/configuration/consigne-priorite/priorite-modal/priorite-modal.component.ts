import {Component, EventEmitter, HostListener, Input, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {environment} from "../../../../../environments/environment";
import {Authorization} from "../../../../protect/authorization.service";
import {HttpService} from "../../../../core/http.service";
import Swal from 'sweetalert2';

@Component({
    selector: 'app-priorite-modal',
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './priorite-modal.component.html',
    styleUrl: './priorite-modal.component.scss',
})
export class PrioriteModalComponent {
    @Output() modalOpen = new EventEmitter<boolean>();
    @Input() dataLigne: any;

    public validationForm = new FormGroup({
        lib_priorite: new FormControl('', Validators.required),
        uid: new FormControl('',),
    })
    errorTexte: string='';

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
            this.validationForm.patchValue({
                uid: changes['dataLigne']?.currentValue?.uid,
                lib_priorite: changes['dataLigne']?.currentValue.lib_priorite
            });
        }
    }

    submitForm() {
        this.errorTexte =''
            this.validationForm.markAllAsTouched();
        console.log()
        if (!this.validationForm.valid) {
            return;
        }

        this.isloading = true;
        let payload = {
            "action": this.validationForm.value.uid ? 2 : 1,
            "idsociete": this.users?.dataSociete?.uid,
            "idpriorite": this.validationForm.value.uid || '',
            "lib_priorite": this.validationForm.value.lib_priorite
        }
        console.log("payload ===",payload)
        this.httService.postData(`${environment.api_url}api/:savepriorite`, payload, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res.body.status) {

                    // Swal.fire({
                    //   title: 'Copied API Key',
                    //   icon: 'success',
                    //   toast: true,
                    //   timer: 3000,
                    //   timerProgressBar: true,
                    //   showConfirmButton: false,
                    //   position:'top-end'
                    // })
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
                this.isloading = false;
                this.errorTexte = err?.error?.err?.message || "Une erreur est survenue !"
                this.isloading = false;
            });
    }

    closeModal(e?: boolean) {
        this.modalOpen.emit(e || false);
    }
}
