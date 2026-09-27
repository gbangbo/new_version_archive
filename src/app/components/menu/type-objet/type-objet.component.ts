import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {CardComponent} from "../../../shared/components/ui/card/card.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Authorization} from "../../../protect/authorization.service";
import {HttpService} from "../../../core/http.service";
import {environment} from "../../../../environments/environment";
import moment from "moment";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzTagModule} from "ng-zorro-antd/tag";
import {NzTooltipDirective} from 'ng-zorro-antd/tooltip';
import {FeatherIconComponent} from "../../../shared/components/ui/feather-icon/feather-icon.component";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import Swal from "sweetalert2";
import {TypeObjetModalComponent} from "./type-objet-modal/type-objet-modal.component";
import {TypeObjetAction} from "./type-objet-modal/type-objet-modal.component";


@Component({
    selector: 'app-type-objet',
    imports: [
        CommonModule,
        CardComponent,
        NzInputModule,
        NzIconModule,
        NzTagModule,
        NzTooltipDirective,
        FormsModule, FeatherIconComponent, TypeObjetModalComponent],
    templateUrl: './type-objet.component.html',
    styleUrl: './type-objet.component.scss',
})
export class TypeObjetComponent implements OnInit, AfterViewInit {
    dataLigne: any = [];
    private users: any = [];
    errorTexte: string = '';
    isloading: boolean = false;
    modalOpen: boolean = false;

    searchValue = '';

    // ── Données ──────────────────────────────────────────────
    filteredData: any[] = [];
    private dataTypes: any[] = [];

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

    constructor(private autor: Authorization, private httService: HttpService, private sanitizer: DomSanitizer) {
    }

    ngOnInit(): void {
        window.scrollTo({top: 0, behavior: 'smooth'});
        this.users = this.autor.getInfosUsers();
        this.showTypesObjets();
    }

    private get idsociete(): string {
        return this.users?.datasociete?.uid || this.users?.uidsociete || '';
    }

    // ── Liste ─────────────────────────────────────────────────
    showTypesObjets() {
        this.isloading = true;
        this.dataTypes = [];
        this.filteredData = [];
        this.httService.getData(`${environment.api_url}auth/:types-objets?idsociete=${this.idsociete}&idtypeobjet=`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res.body.status || res.body.success) {
                    this.dataTypes = (res.body.data || []).map((e: any) => {
                        return {
                            ...e,
                            uid: e?.uid || e?.idtypeobjet || e?.id,
                            code_type_objet: e?.code_type_objet || '',
                            cree: e?.created_at ? moment(e.created_at).format('DD-MM-YYYY') : '',
                        }
                    });
                    this.filteredData = [...this.dataTypes];
                    this.applySort();
                    setTimeout(() => this.syncHScroll());
                }
            })
            .catch((err) => {
                this.isloading = false;
                this.errorTexte = err?.error?.err?.message || "Une erreur est survenue !";
            });
    }

    // ── Recherche globale ─────────────────────────────────────
    onSearch(value: string): void {
        const val = value.trim().toLowerCase();
        this.filteredData = val
            ? this.dataTypes.filter((row: any) =>
                Object.values(row).some(v => String(v).toLowerCase().includes(val))
            )
            : [...this.dataTypes];
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

    // ── Modal ─────────────────────────────────────────────────
    openModal(e?: any) {
        this.modalOpen = true;
        this.dataLigne = e || {};
    }

    handleModal(value: boolean) {
        if (value) {
            this.showTypesObjets();
        }
        this.modalOpen = false;
    }

    // ── Suppression : action 3 du même endpoint ───────────────
    async deleteTypeObjet(e: any) {
        const result = await Swal.fire({
            html: `
      <div style="margin-top: 8px;">
        <p style="font-size: 17px; font-weight: 700; color: #0F172A; margin-bottom: 10px;">
          Êtes-vous sûr de vouloir supprimer cette action ?
        </p>
        <p style="font-size: 13px; color: #64748B; margin: 0;">
          L'action (${e?.lib_type_objet || ''}) sera supprimée de la liste.
        </p>
      </div>
    `,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Oui, supprimer',
            cancelButtonText: 'Annuler',
            confirmButtonColor: '#EF4444',
            cancelButtonColor: '#94A3B8',
            reverseButtons: true,
            customClass: {
                popup: 'swal-custom-popup',
                confirmButton: 'swal-custom-confirm',
                cancelButton: 'swal-custom-cancel',
            },
        });

        if (!result.isConfirmed) {
            return;
        }

        this.sendAction(TypeObjetAction.Supprimer, e, 'Action supprimée');
    }

    /**
     * Unique point d'appel de `auth/:types-objets`.
     * `action` est toujours passé par l'appelant : 1 = créer, 2 = modifier, 3 = supprimer.
     */
    private sendAction(action: TypeObjetAction, row: any, messageParDefaut: string) {
        const payload = {
            action,
            idsociete: this.idsociete,
            idtypeobjet: row?.uid || '',
            code_type_objet: row?.code_type_objet || '',
            lib_type_objet: row?.lib_type_objet || '',
        };

        this.isloading = true;

        this.httService.postData(`${environment.api_url}auth/:types-objets`, payload, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res.body.status || res.body.success) {
                    Swal.fire({
                        title: res?.body?.message || messageParDefaut,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    this.showTypesObjets();
                }
            })
            .catch((err) => {
                this.isloading = false;
                Swal.fire({
                    title: err?.error?.err?.message || "Une erreur est survenue !",
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
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
}
