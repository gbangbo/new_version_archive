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
import {OWL_DATE_TIME_LOCALE, OwlDateTimeModule, OwlNativeDateTimeModule} from "@danielmoncada/angular-datetime-picker";
import moment from "moment";

@Component({
    selector: 'app-add-modal',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NzSwitchModule,
        Select2Module, OwlDateTimeModule,
        OwlNativeDateTimeModule],
    providers: [
        {provide: OWL_DATE_TIME_LOCALE, useValue: 'fr'}
    ],
    templateUrl: './add-modal.component.html',
    styleUrl: './add-modal.component.scss',
})
export class AddModalComponent {
    @Output() modalOpen = new EventEmitter<boolean>();
    @Input() dataLigne: any;

    public validationForm = new FormGroup({
        agent_en_absence: new FormControl('', Validators.required),
        remplacant_absence: new FormControl('', Validators.required),
        type_absence: new FormControl('', Validators.required),
        motif_absence: new FormControl('', Validators.required),
        date_debut: new FormControl('', Validators.required),
        date_fin: new FormControl('', Validators.required),
        idautorisation_absence: new FormControl('',),
    }, {validators: this.dateRangeValidator})
    errorTexte: string = '';
    dataAgentAbsent: any = [];
    dataRemplace: any = [];
    dataTypeAbsence: any = [];

    @HostListener('document:keydown.escape', ['$event'])
    handleEscKey() {
        this.closeModal();
    }

    isloading: boolean = false;
    loadingRemplace: boolean = false;
    users: any = [];


    constructor(private autor: Authorization, private httService: HttpService) {
        this.users = this.autor.getInfosUsers();
        this.viewCompte(this.users?.datasociete?.uid, '');
        this.showTypeAbsence(this.users?.datasociete?.uid);
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
            date_debut: moment(this.validationForm.value.date_debut).format('YYYY-MM-DD'),
            date_fin: moment(this.validationForm.value.date_fin).format('YYYY-MM-DD'),
            "action": this.validationForm.value.idautorisation_absence ? 2 : 1,
            "idautorisation_absence": this.validationForm.value.idautorisation_absence || '',
            "idsociete": this.users?.datasociete?.uid,
        }

        console.log("payload ===", payload)
        this.httService.postData(`${environment.api_url}auth/:save-autorisation-absence`, payload, this.users?.access_token || '')
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

    dateRangeValidator(control: AbstractControl): ValidationErrors | null {
        const debut = control.get('date_debut')?.value;
        const fin = control.get('date_fin')?.value;

        if (debut && fin && new Date(debut) > new Date(fin)) {
            return { dateInvalide: true };
        }
        return null;
    }

    viewCompte(idsociete: string = '', idpersonnel: string = '') {
        this.isloading = true;
        this.dataAgentAbsent = []
        this.httService.getData(`${environment.api_url}auth/:liste-des-comptes?idsociete=${idsociete}&idpersonnel=${idpersonnel}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                console.log("Liste des comptes ===", res.body)
                if (res.body.status || res.body.success) {

                    this.dataAgentAbsent = res.body.data.map((e: any) => ({
                        label: `${e.datapersonnel?.nom || ''} ${e.datapersonnel?.prenom || ''}`.trim(),
                        value: e.uid || e.id,
                    }));

                    console.log("this.filteredData ===", this.dataAgentAbsent)

                }
            })
            .catch((err) => {
                this.isloading = false;
            });

    }

    showTypeAbsence(idsociete: string = '') {
        this.isloading = true;
        this.dataTypeAbsence = []
        this.httService.getData(`${environment.api_url}auth/:save-type-absence?idsociete=${idsociete}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                console.log("Type d'absence ===", res.body.data)
                if (res.body.status) {

                    this.dataTypeAbsence = res.body.data.map((e: any) => {
                        return {
                            label: e.lib_type_absence,
                            value: e.uid || e.id,
                        }
                    });

                    console.log("this.filteredData ===", this.dataTypeAbsence)

                }
            })
            .catch((err) => {
                this.isloading = false;
            });

    }

    selectInterim(event: any) {
        this.validationForm.get('remplacant_absence')?.setValue('');
        this.validationForm.get('remplacant_absence')?.markAsUntouched();
        this.dataRemplace = this.dataAgentAbsent.filter((d: any) => d.value != event.value);
    }
}
