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
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import moment from "moment";

@Component({
    selector: 'app-add-modal',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NzSwitchModule,
        Select2Module, NzDatePickerModule],
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
    private agentAbsentId: any = '';

    // Date minimale sélectionnable : aujourd'hui (pas de dates antérieures)
    minDate: Date = moment().startOf('day').toDate();

    // La date de fin ne peut être antérieure ni à aujourd'hui ni à la date de début
    get minDateFin(): Date {
        const debut = this.validationForm.value.date_debut;
        const d = debut ? new Date(debut) : this.minDate;
        return d > this.minDate ? d : this.minDate;
    }

    // Désactive toutes les dates antérieures à aujourd'hui (date de début)
    disabledDateDebut = (current: Date): boolean => {
        return !!current && current < this.minDate;
    };

    // Désactive les dates antérieures à aujourd'hui ou à la date de début (date de fin)
    disabledDateFin = (current: Date): boolean => {
        return !!current && current < this.minDateFin;
    };

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
            const row = changes['dataLigne'].currentValue;
            console.log("Update user ", row)

            // Les valeurs de la liste sont des libellés / dates formatées : on remappe
            // vers les identifiants (uid) attendus par les select2 et les dates parsables.
            const agentAbsentId = row?.idagent_en_absence
                || row?.data_agent_absence?.uid || row?.data_agent_absence?.id || '';
            const remplacantId = row?.idagent_remplacant || row?.idremplacant_absence
                || row?.data_remplacant_absence?.uid || row?.data_remplacant_absence?.id || '';
            const typeId = row?.idtype_absence
                || row?.datatype_absence?.uid || row?.datatype_absence?.id || '';

            this.agentAbsentId = agentAbsentId;
            setTimeout(()=>{
                this.validationForm.patchValue({
                    agent_en_absence: agentAbsentId,
                    remplacant_absence: remplacantId,
                    type_absence: typeId,
                    motif_absence: row?.motif_absence || '',
                    date_debut: this.toDate(row?.date_debut),
                    date_fin: this.toDate(row?.date_fin),
                    idautorisation_absence: row?.idautorisation_absence || row?.uid || row?.id || '',
                });

            },1000)

            // Le select remplaçant doit contenir des options (agent absent exclu)
            this.buildRemplacants();
        }
    }

    private toDate(value: any): any {
        if (!value) return '';
        // La liste reformate les dates en 'DD-MM-YYYY' ; on gère aussi l'ISO par sécurité.
        let m = moment(value, 'DD-MM-YYYY', true);
        if (!m.isValid()) m = moment(value);
        return m.isValid() ? m.toDate() : '';
    }

    private buildRemplacants() {
        this.dataRemplace = this.dataAgentAbsent.filter((d: any) => d.value != this.agentAbsentId);
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

                    // En édition, les comptes arrivent après ngOnChanges : on (re)construit
                    // la liste des remplaçants une fois les options disponibles.
                    this.buildRemplacants();

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
        // Sélection initiale (hydratation en édition) : ne pas vider le remplaçant.
        if (event?.value && event.value === this.agentAbsentId) {
            this.buildRemplacants();
            return;
        }
        this.agentAbsentId = event?.value || '';
        this.validationForm.get('remplacant_absence')?.setValue('');
        this.validationForm.get('remplacant_absence')?.markAsUntouched();
        this.buildRemplacants();
    }
}
