import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {CardComponent} from "../../../../shared/components/ui/card/card.component";
import {CommonModule} from "@angular/common";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Authorization} from "../../../../protect/authorization.service";
import {HttpService} from "../../../../core/http.service";
import {environment} from "../../../../../environments/environment";
import {ToastrService} from "ngx-toastr";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzTooltipDirective} from "ng-zorro-antd/tooltip";
import {Select2Module} from "ng-select2-component";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzIconModule} from "ng-zorro-antd/icon";
import {TableClickedAction} from "../../../../shared/interface/common";
import {TableComponent} from "../../../../shared/components/ui/table/table.component";
import {FeatherIconComponent} from "../../../../shared/components/ui/feather-icon/feather-icon.component";
import moment from "moment";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {RoleModalComponent} from "./role-modal/role-modal.component";


interface RowData {
    code_role: string;
    libelle_role: string;
    created_at: string;
}


@Component({
    selector: 'app-role',
    imports: [
        CommonModule,
        CardComponent,
        FormsModule,
        ReactiveFormsModule,
        NzSwitchModule,
        NzTooltipDirective,
        NzSelectModule,
        Select2Module,
        NzTabsModule,
        NzIconModule,
        TableComponent, FeatherIconComponent, RoleModalComponent],
    providers: [],
    templateUrl: './role.component.html',
    styleUrl: './role.component.scss',
})
export class RoleComponent implements OnInit, AfterViewInit {

    dataSociete: any = [];


    private users: any = [];
    errorTexte: string = '';
    isloading: boolean = false;
    modalOpen: boolean = false;
    modalOpenCarriere: boolean = false;
    dataOneLigne: any = {};

    searchValue = '';

    // ── Données ──────────────────────────────────────────────

    filteredData: RowData[] = [];

    // ── Tri (clic sur l'entête) ───────────────────────────────
    sortKey: string = '';
    sortOrder: 'asc' | 'desc' | '' = '';

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
                private fb: FormBuilder,
                private httService: HttpService,
                private sanitizer: DomSanitizer) {

    }


    ngOnInit(): void {
        window.scrollTo({top: 0, behavior: 'smooth'});
        this.users = this.autor.getInfosUsers();
        this.saveroles(this.users?.datasociete?.uid || this.users?.uidsociete, '');
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


    saveroles(idsociete: string = '', idrole: string = '') {
        this.isloading = true;
        this.dataBenef = [];
        this.filteredData = [];
        this.httService.getData(`${environment.api_url}auth/:saveroles?idsociete=${idsociete}&idrole=${idrole}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res.body.status) {
                    this.dataBenef = res.body.data.map((e: any) => {
                        return {
                            ...e,
                            name: `${e.nom} ${e.prenom}`,
                            created_at: moment(e?.created_at).format('DD/MM/YYYY')
                        }
                    });
                    this.filteredData = [...this.dataBenef];
                    this.applySort();
                    setTimeout(() => this.syncHScroll());
                    console.log("this.filteredData ===", this.filteredData)
                }
            })
            .catch((err) => {
                this.isloading = false;
            });

    }


    handleModal(value: boolean) {
        if (value) {
            this.saveroles(this.users?.datasociete?.uid || this.users?.uidsociete, '');
        }
        this.modalOpen = false;
    }

    handleModalCarriere(value: boolean) {
        if (value) {
            this.saveroles(this.users?.datasociete?.uid || this.users?.uidsociete, '');
        }
        this.modalOpenCarriere = false;
    }

    openModal(row?: any) {
        this.modalOpen = true;
        this.dataOneLigne = row || {};
    }

    openModalCarriere(row?: any) {
        this.modalOpenCarriere = true;
        this.dataOneLigne = row || {};
    }


    handleAction(value: TableClickedAction) {
        switch (value.action_to_perform) {
            case 'edit':
                this.modalOpen = true;
                this.dataOneLigne = value.data;
                break;
            default:
        }
    }
}
