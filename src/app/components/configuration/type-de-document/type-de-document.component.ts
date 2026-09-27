import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {CardComponent} from "../../../shared/components/ui/card/card.component";
import {CommonModule, DatePipe} from "@angular/common";
import {Authorization} from "../../../protect/authorization.service";
import {HttpService} from "../../../core/http.service";
import {environment} from "../../../../environments/environment";
import {NzSwitchModule} from "ng-zorro-antd/switch";
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
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

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
        TableComponent, FeatherIconComponent, TypeDocModalComponent, DatePipe],
    providers: [],
    templateUrl: './type-de-document.component.html',
    styleUrl: './type-de-document.component.scss',
})
export class TypeDeDocumentComponent implements OnInit, AfterViewInit {

    private users: any = [];
    errorTexte: string = '';
    isloading: boolean = false;
    modalOpen: boolean = false;
    dataLigne: any = {};

    searchValue = '';

    // ── Données ──────────────────────────────────────────────

    filteredData: RowData[] = [];

    // ── Tri (clic sur l'entête) ───────────────────────────────
    sortKey: string = '';
    sortOrder: 'asc' | 'desc' | '' = '';

    // ── Pagination (la liste est chargée en une fois) ─────────
    pageIndex = 1;
    pageSize = 10;
    readonly taillesPage = [10, 20, 50, 100];

    // ── Ascenseur horizontal dessiné (les barres natives sont masquées sur iOS) ──
    @ViewChild('tableWrap') tableWrap?: ElementRef<HTMLDivElement>;
    @ViewChild('hBar') hBar?: ElementRef<HTMLDivElement>;
    hScrollVisible = false;
    hScrollMore = false;
    thumbWidth = 0;
    thumbLeft = 0;
    private dragging = false;
    private dragStartX = 0;
    private dragStartScroll = 0;

    private dataBenef: any = [];

    constructor(private autor: Authorization,
                private httService: HttpService,
                private sanitizer: DomSanitizer) {

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
        this.applySort();
        this.pageIndex = 1;               // une nouvelle recherche repart de la première page
        setTimeout(() => this.syncHScroll());
    }

    // ── Tri par colonne : asc -> desc -> aucun ────────────────
    sortBy(key: string): void {
        if (this.sortKey !== key) {
            this.sortKey = key;
            this.sortOrder = 'asc';
        } else if (this.sortOrder === 'asc') {
            this.sortOrder = 'desc';
        } else {
            this.sortKey = '';
            this.sortOrder = '';
            this.onSearch(this.searchValue);   // on retrouve l'ordre initial, recherche conservée
            return;
        }
        this.applySort();
    }

    private applySort(): void {
        if (!this.sortKey || !this.sortOrder) {
            return;
        }
        const key = this.sortKey;
        const dir = this.sortOrder === 'desc' ? -1 : 1;
        this.filteredData = [...this.filteredData].sort((a: any, b: any) =>
            String(a?.[key] ?? '').localeCompare(String(b?.[key] ?? '')) * dir
        );
    }

    // ── Surlignage des occurrences recherchées ────────────────
    highlightMatch(text: string, search: string): SafeHtml {
        if (!search || !text) return text;
        const regex = new RegExp(`(${search})`, 'gi');
        const highlighted = text.replace(
            regex,
            '<mark style="background:#FEF08A;color:#713F12;border-radius:2px;padding:0 2px">$1</mark>'
        );
        return this.sanitizer.bypassSecurityTrustHtml(highlighted);
    }

    // ── Pagination ───────────────────────────────────────────
    // La liste arrive en une fois : la pagination ne fait que découper
    // `filteredData`.

    get nbPages(): number {
        return Math.max(1, Math.ceil(this.filteredData.length / this.pageSize));
    }

    get rowsPage(): any[] {
        const debut = (this.pageIndex - 1) * this.pageSize;
        return this.filteredData.slice(debut, debut + this.pageSize);
    }

    allerPage(page: number): void {
        const cible = Math.min(Math.max(page, 1), this.nbPages);
        if (cible === this.pageIndex) return;
        this.pageIndex = cible;
        setTimeout(() => this.syncHScroll());
    }

    changerTaille(taille: number): void {
        if (taille === this.pageSize) return;
        this.pageSize = taille;
        this.pageIndex = 1;
        setTimeout(() => this.syncHScroll());
    }

    // ══ Ascenseur horizontal personnalisé ═══════════════════════════════
    ngAfterViewInit(): void {
        setTimeout(() => this.syncHScroll());
    }

    @HostListener('window:resize')
    syncHScroll(): void {
        const el = this.tableWrap?.nativeElement;
        if (!el) {
            return;
        }
        const maxScroll = el.scrollWidth - el.clientWidth;
        this.hScrollVisible = maxScroll > 2;
        this.hScrollMore = el.scrollLeft < maxScroll - 2;

        const barEl = this.hBar?.nativeElement;
        if (this.hScrollVisible && !barEl) {
            // la barre vient d'apparaître : on recalcule une fois qu'elle est rendue
            setTimeout(() => this.syncHScroll());
        }

        const track = barEl?.clientWidth || el.clientWidth;
        this.thumbWidth = Math.max(40, Math.round(track * (el.clientWidth / el.scrollWidth)));
        const maxX = track - this.thumbWidth;
        this.thumbLeft = maxScroll > 0 ? Math.round((el.scrollLeft / maxScroll) * maxX) : 0;
    }

    onBarPointerDown(ev: PointerEvent): void {
        const el = this.tableWrap?.nativeElement;
        const bar = this.hBar?.nativeElement;
        if (!el || !bar) {
            return;
        }
        const rect = bar.getBoundingClientRect();
        const maxScroll = el.scrollWidth - el.clientWidth;
        const maxX = rect.width - this.thumbWidth;
        const pointerX = ev.clientX - rect.left;

        // clic hors du pouce : on saute directement à cette position
        if (pointerX < this.thumbLeft || pointerX > this.thumbLeft + this.thumbWidth) {
            const x = Math.min(Math.max(pointerX - this.thumbWidth / 2, 0), maxX);
            el.scrollLeft = maxX > 0 ? (x / maxX) * maxScroll : 0;
        }

        this.dragging = true;
        this.dragStartX = ev.clientX;
        this.dragStartScroll = el.scrollLeft;
        bar.setPointerCapture(ev.pointerId);
        ev.preventDefault();
        this.syncHScroll();
    }

    @HostListener('document:pointermove', ['$event'])
    onBarPointerMove(ev: PointerEvent): void {
        if (!this.dragging) {
            return;
        }
        const el = this.tableWrap?.nativeElement;
        const bar = this.hBar?.nativeElement;
        if (!el || !bar) {
            return;
        }
        const maxScroll = el.scrollWidth - el.clientWidth;
        const maxX = bar.clientWidth - this.thumbWidth;
        const dx = ev.clientX - this.dragStartX;
        el.scrollLeft = this.dragStartScroll + (maxX > 0 ? dx * (maxScroll / maxX) : 0);
    }

    @HostListener('document:pointerup')
    @HostListener('document:pointercancel')
    onBarPointerUp(): void {
        this.dragging = false;
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
                    this.filteredData = [...this.dataBenef];
                    this.applySort();
                    setTimeout(() => this.syncHScroll());
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
