import {Component, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {environment} from "../../../../../../environments/environment";
import {Authorization} from "../../../../../protect/authorization.service";
import {HttpService} from "../../../../../core/http.service";
import Swal from 'sweetalert2';
import {Select2Module} from "ng-select2-component";

@Component({
    selector: 'app-rayon-modal',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, Select2Module],
    templateUrl: './rayon-modal.component.html',
    styleUrl: './rayon-modal.component.scss',
})
export class RayonModalComponent implements OnChanges {
    @Output() modalOpen = new EventEmitter<boolean>();
    @Input() dataLigne: any;

    public validationForm = new FormGroup({
        idsite: new FormControl('', Validators.required),
        libelle_rayon: new FormControl('', Validators.required),
        uid: new FormControl(''),
        value: new FormControl('')
    })

    @HostListener('document:keydown.escape', ['$event'])
    handleEscKey() {
        this.closeModal();
    }

    isloading: boolean = false;
    users: any = [];
    dataSite: any = [];
    dataService: any = [];
    errorTexte: string = "";
    loadingSites: boolean = false;
    loadingService: boolean = false;

    constructor(private autor: Authorization, private httService: HttpService) {
        this.users = this.autor.getInfosUsers();
        this.savesites(this.users?.datasociete?.uid || this.users?.uidsociete)
        this.chargerDernierNiveau(this.users?.datasociete?.uid || this.users?.uidsociete)
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['dataLigne'] && changes['dataLigne']?.currentValue) {
            setTimeout(() => {
                this.validationForm.patchValue({
                    idsite: String(changes['dataLigne']?.currentValue.datasite.uid),
                    uid: changes['dataLigne']?.currentValue.uid,
                    libelle_rayon: changes['dataLigne']?.currentValue.libelle_rayon,
                });
                this.preselectionnerLibelle();
            }, 1000)

        }
    }

    savesites(idsociete: string = '', idsite: string = '') {
        this.dataSite = [];
        this.loadingSites = true;
        this.httService.getData(`${environment.api_url}api/:savesites?idsociete=${idsociete}&idsite=${idsite}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.loadingSites = false;
                if (res.body.status) {
                    this.dataSite = res.body.data.map((d: any) => {
                        return {
                            label: d.libelle_sites,
                            value: String(d.uid),
                        }
                    });
                }
            })
            .catch((err) => {
                this.loadingSites = false;
            });
    }

    /**
     * Les libellés proposés sont les entités du **dernier niveau** de
     * l'organigramme : ce sont elles qui correspondent à un rayon physique,
     * les niveaux au-dessus ne sont que des regroupements.
     */
    chargerDernierNiveau(idsociete: string = '', niveau: string = '') {
        this.dataService = [];
        this.loadingService = true;
        this.httService.getData(`${environment.api_url}auth/:save-service-organigramme?societe=${idsociete}&niveau=${niveau}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.loadingService = false;
                if (res.body.status || res.body.success) {
                    this.dataService = this.feuilles(res.body.data || []);
                    this.preselectionnerLibelle();
                }
            })
            .catch(() => {
                this.loadingService = false;
            });
    }

    /**
     * Aplatit l'arbre renvoyé par l'API en ne gardant que les feuilles, avec
     * l'uid en valeur et le libellé à l'affichage.
     */
    private feuilles(noeuds: any[]): any[] {
        let out: any[] = [];
        for (const n of noeuds || []) {
            if (n?.children?.length) {
                out = out.concat(this.feuilles(n.children));
            } else if (n?.uid) {
                out.push({
                    value: String(n.uid),
                    label: n.libelle || n.sigle || '',
                    libelle: n.libelle || n.sigle || '',
                });
            }
        }
        return out;
    }

    /**
     * En modification, la ligne porte le libellé et non l'uid : on retrouve
     * l'entrée correspondante pour que la liste s'affiche déjà renseignée.
     */
    private preselectionnerLibelle(): void {
        const valeur = this.validationForm.value.libelle_rayon;
        if (!valeur || !this.dataService.length) {
            return;
        }
        const dejaUnUid = this.dataService.some((s: any) => s.value === valeur);
        if (dejaUnUid) {
            return;
        }
        const trouve = this.dataService.find((s: any) => s.libelle === valeur);
        if (trouve) {
            this.validationForm.patchValue({libelle_rayon: trouve.value});
        }
    }

    /** Le libellé à enregistrer : celui de l'entité choisie, ou la saisie libre. */
    private libelleRetenu(): string {
        const valeur = this.validationForm.value.libelle_rayon || '';
        const choisi = this.dataService.find((s: any) => s.value === valeur);
        return choisi ? choisi.libelle : valeur;
    }

    submitForm() {
        this.errorTexte = '';
        this.validationForm.markAllAsTouched();

        if (!this.validationForm.valid) {
            return;
        }
        this.isloading = true;
        let payload = {
            "action": this.validationForm.value.uid ? 2 : 1,
            "idsociete": this.users?.datasociete?.uid || this.users?.uidsociete,
            "idrayon": this.validationForm.value.uid || '',
            "idsite": this.validationForm.value.idsite,
            "libelle_rayon": this.libelleRetenu(),
            "code_rayon": this.libelleRetenu()
        }
        console.log("payload ===", payload)
        this.httService.postData(`${environment.api_url}api/:saverayons`, payload, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res.body.status) {
                    this.dataLigne = {};
                    this.validationForm.reset({});
                    this.closeModal(true);
                    Swal.fire({
                        title: res?.body?.message,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
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

