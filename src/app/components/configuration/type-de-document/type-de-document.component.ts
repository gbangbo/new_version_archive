import {Component, OnInit} from '@angular/core';
import {CardComponent} from "../../../shared/components/ui/card/card.component";
import {CommonModule, DatePipe} from "@angular/common";
import {Authorization} from "../../../protect/authorization.service";
import {HttpService} from "../../../core/http.service";
import {environment} from "../../../../environments/environment";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzTooltipDirective} from "ng-zorro-antd/tooltip";
import {Select2Module} from "ng-select2-component";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzIconModule} from "ng-zorro-antd/icon";
import {TableComponent} from "../../../shared/components/ui/table/table.component";
import {FeatherIconComponent} from "../../../shared/components/ui/feather-icon/feather-icon.component";
import moment from "moment";
import Swal from "sweetalert2";
import {TypeDocModalComponent} from "./type-doc-modal/type-doc-modal.component";

interface RowData {
    created_at: string;
    libelle_type_docs: string;
    dure_prearchive: string;
    dure_conservatoire: string;
    code_type_docs: string;
    cree: string;
    dataPro: any;
    expand: boolean;
}

@Component({
    selector: 'app-type-de-document',
    imports: [
        CommonModule,
        CardComponent,
        NzSwitchModule,
        NzTooltipDirective,
        NzSelectModule,
        Select2Module,
        NzTabsModule,
        NzIconModule,
        NzTableModule, TableComponent, FeatherIconComponent, TypeDocModalComponent, DatePipe],
    providers: [],
    templateUrl: './type-de-document.component.html',
    styleUrl: './type-de-document.component.scss',
})
export class TypeDeDocumentComponent implements OnInit {

    private users: any = [];
    errorTexte: string = '';
    isloading: boolean = false;
    modalOpen: boolean = false;
    dataLigne: any = {};

    searchValue = '';

    // ── Données ──────────────────────────────────────────────

    filteredData: RowData[] = [];

    // ── Fonctions de tri ──────────────────────────────────────
    sortFns = {
        created_at: (a: RowData, b: RowData) =>
            (a.created_at ?? '').localeCompare(b.created_at ?? ''),
        libelle_type_docs: (a: RowData, b: RowData) =>
            (a.libelle_type_docs ?? '').localeCompare(b.libelle_type_docs ?? '')
    };

    // ── Filtres ───────────────────────────────────────────────
    filters: {
        created_at: { text: string; value: string }[];
        libelle_type_docs: { text: string; value: string }[];
    } = {
        created_at: [],
        libelle_type_docs: [],
    };

    filterFns = {
        // Filtre sur nom_beneficiaire
        created_at: (list: string[], item: RowData) =>
            list.some(val =>
                (item.created_at ?? '').toLowerCase().includes(val.toLowerCase())
            ),
        libelle_type_docs: (list: string[], item: RowData) =>
            list.some(val =>
                (item.libelle_type_docs ?? '').toLowerCase().includes(val.toLowerCase())
            )
    };

    private dataBenef: any = [];

    constructor(private autor: Authorization,
                private httService: HttpService) {

    }


    ngOnInit(): void {
        window.scrollTo({top: 0, behavior: 'smooth'});
        this.users = this.autor.getInfosUsers();
        this.showTypeDoc(this.users?.datasociete?.uid, '')
    }

    // ── Recherche globale ─────────────────────────────────────
    onSearch(value: string): void {
        const val = value.trim().toLowerCase();
        this.filteredData = val
            ? this.dataBenef.filter((row: any) =>
                Object.values(row).some(v => String(v).toLowerCase().includes(val))
            )
            : [...this.dataBenef];
    }

    showTypeDoc(idsociete: string = '', idtypedocuments: string = '') {
        this.isloading = true;
        this.dataBenef = [];
        this.filteredData = [];
        this.httService.getData(`${environment.api_url}api/:savetypedocuments?idsociete=${idsociete}&idtypedocuments=${idtypedocuments}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res.body.status) {
                    console.log("res.body.data ===", res.body.data)
                    this.dataBenef = res.body.data.map((e: any) => {
                        return {
                            ...e,
                            expand: false,
                            cree: moment(e?.created_at).format('DD/MM/YYYY')
                        }
                    });
                    this.filters = {
                        ...this.filters,
                        libelle_type_docs: [...new Set(
                            this.dataBenef
                                ?.filter((e: any) => e?.libelle_type_docs)
                                .map((e: any) => e.libelle_type_docs)
                        )].map((v: any) => ({
                            text: v,
                            value: v
                        })) || []
                    }
                    this.filteredData = [...this.dataBenef];
                }
            })
            .catch((err) => {
                this.isloading = false;
            });
    }


    handleModal(value: boolean) {
        if (value) {
            this.showTypeDoc(this.users?.datasociete?.uid, '')
        }
        this.modalOpen = false;
    }

    openModal(row?: any) {
        this.modalOpen = true;
        this.dataLigne = row || {};
    }


    exportModel(data: any) {
        let dataExcele: any = [
            {
                'code_docs': '',
                'date_docs': '',
                'lib_docs': ''
            }
        ];
        data.dataPro.forEach((event: any) => {
            if (
                event?.lib_proprietes_docs &&
                ![
                    'numéro du document',
                    'objet du document',
                    'date du document'
                ].includes(event.lib_proprietes_docs.toLowerCase())
            ) {
                dataExcele.push({
                    [event.lib_proprietes_docs]: ''
                });
            }
        });
        // Si vous avez installé xlsx: npm install xlsx
        import('xlsx').then(XLSX => {
            const worksheet = XLSX.utils.json_to_sheet(dataExcele);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
            XLSX.writeFile(workbook, `model_${data.libelle_type_docs}_${new Date().getTime()}.xlsx`);
        }).catch(() => {
            console.error('xlsx library not found. Install it with: npm install xlsx');
        });
    }

    deleteType(row?: any) {
        Swal.fire({
            title: `Êtes-vous sûr de bien vouloir supprimer ?`,
            html: `
        <p style="font-size: 14px; color: #475569; margin-bottom: 12px;">
            Type de document : <strong>${row.libelle_type_docs}</strong>
        </p>
        <textarea
            id="motif-suppression"
            class="swal2-textarea"
            placeholder="Saisissez le motif..."
            style="
                width: 80%;
                min-height: 90px;
                border: 1.5px solid #E2E8F0;
                border-radius: 8px;
                font-size: 13px;
                padding: 10px 12px;
                resize: vertical;
                outline: none;
                font-family: inherit;
                color: #0F172A;
            "
        ></textarea>
    `,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Oui, supprimer',
            cancelButtonText: 'Annuler',
            confirmButtonColor: '#DC2626',
            cancelButtonColor: '#E2E8F0',
            reverseButtons: true,
            customClass: {cancelButton: 'swal-cancel-custom'},
            preConfirm: async () => {
                const motif = (document.getElementById('motif-suppression') as HTMLTextAreaElement)?.value?.trim();

                if (!motif) {
                    Swal.showValidationMessage('Veuillez saisir un motif de suppression.');
                    return false;
                }

                Swal.showLoading();

                const payload = {
                    idtype_documents: row.uid,
                    idsociete: this.users?.datasociete?.uid,
                };

                try {
                    const res: any = await this.httService
                        .deleteData(`${environment.api_url}api/:savetypedocuments`, payload, this.users?.access_token)
                        .toPromise();

                    if (res.body.status || res.body.success) {
                        return res;
                    } else {
                        Swal.showValidationMessage(res.body.message || 'Une erreur est survenue, veuillez réessayer.');
                        return false;
                    }
                } catch (err: any) {
                    Swal.showValidationMessage(
                        err?.error?.err?.message || err?.message || 'Une erreur est survenue, veuillez réessayer.'
                    );
                    return false;
                }
            }
        }).then((result:any) => {
            if (result.isConfirmed) {
                this.showTypeDoc(this.users?.datasociete?.uid, '');
                Swal.fire({
                    title: 'Supprimé !',
                    text: result.body?.message || 'Le type de document a été supprimé avec succès.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#16A34A'
                });
            }
        });
    }


}
