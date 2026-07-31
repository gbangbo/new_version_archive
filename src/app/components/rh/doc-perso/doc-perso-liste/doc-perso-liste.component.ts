import {Component, HostListener, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import moment from 'moment';
import {environment} from '../../../../../environments/environment';
import {Authorization} from '../../../../protect/authorization.service';
import {HttpService} from '../../../../core/http.service';
import {CardComponent} from '../../../../shared/components/ui/card/card.component';

interface DocFile {
    uid: string;
    nom_fichiers: string;
    url: string;
    extension: string;
    date: string;
    dossier: string;
    personnel: string;
}

interface PersonnelGroup {
    key: string;
    personnel: string;
    email: string;
    files: DocFile[];
}

@Component({
    selector: 'app-doc-perso-liste',
    imports: [CommonModule, FormsModule, NzTagModule, NzToolTipModule, CardComponent],
    templateUrl: './doc-perso-liste.component.html',
    styleUrl: './doc-perso-liste.component.scss',
})
export class DocPersoListeComponent implements OnInit {

    users: any = [];
    isloading: boolean = false;
    searchValue: string = '';

    private allGroups: PersonnelGroup[] = [];
    groups: PersonnelGroup[] = [];
    collapsed: Record<string, boolean> = {};

    // ── Aperçu ────────────────────────────────────────────────────────
    previewRow: DocFile | null = null;
    previewSafeUrl: SafeResourceUrl | null = null;

    private readonly IMAGE_EXTS = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];
    private readonly OFFICE_EXTS = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'];

    constructor(
        private autor: Authorization,
        private httService: HttpService,
        private sanitizer: DomSanitizer,
    ) {
    }

    ngOnInit(): void {
        this.users = this.autor.getInfosUsers();
        this.loadDocuments();
    }

    @HostListener('document:keydown.escape')
    onEscape(): void {
        if (this.previewRow) this.closePreview();
    }

    get totalFiles(): number {
        return this.groups.reduce((n, g) => n + g.files.length, 0);
    }

    // ── Chargement ────────────────────────────────────────────────────
    loadDocuments(): void {
        this.isloading = true;
        this.allGroups = [];
        this.groups = [];
        const id = this.users?.datasociete?.uid || '';
        this.httService.getData(
            `${environment.api_url}auth/:save-rangement-fichier-personnel-plan-classement?idsociete=${id}`,
            false,
            this.users?.access_token || ''
        ).toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res.body.status || res.body.success) {
                    this.allGroups = this.buildGroups(res.body.data || []);
                    // Chaque bloc personnel est fermé par défaut
                    this.collapsed = {};
                    this.allGroups.forEach(g => this.collapsed[g.key] = true);
                    this.applyFilter();
                }
            })
            .catch(() => {
                this.isloading = false;
            });
    }

    /* Regroupe toutes les pièces par personnel (un seul bloc par personne,
       quels que soient ses dossiers/sous-dossiers) */
    private buildGroups(nodes: any[]): PersonnelGroup[] {
        const map = new Map<string, PersonnelGroup>();

        const walk = (list: any[]) => {
            for (const node of list) {
                const personnel = `${node?.nom || ''} ${node?.prenom || ''}`.trim();
                const key = String(node?.idpersonnel ?? node?.email ?? personnel);
                if (!map.has(key)) {
                    map.set(key, {key, personnel, email: node?.email || '', files: []});
                }
                const group = map.get(key)!;
                (node?.datapieces || []).forEach((p: any) => {
                    const url = p?.piece_jointe || '';
                    group.files.push({
                        uid: p?.uid,
                        nom_fichiers: p?.nom_fichiers || '',
                        url,
                        extension: this.cleanExt(p?.nom_fichiers || url),
                        date: p?.created_at ? moment(p.created_at).format('DD/MM/YYYY') : '',
                        dossier: node?.name_categories || '',
                        personnel,
                    });
                });
                if (node?.children?.length) walk(node.children);
            }
        };

        walk(nodes);
        return Array.from(map.values()).filter(g => g.files.length > 0);
    }

    // ── Recherche ─────────────────────────────────────────────────────
    onSearch(value: string): void {
        this.searchValue = value;
        this.applyFilter();
    }

    private applyFilter(): void {
        const q = this.searchValue.trim().toLowerCase();
        if (!q) {
            this.groups = this.allGroups.map(g => ({...g, files: [...g.files]}));
            return;
        }
        this.groups = this.allGroups
            .map(g => {
                const persoMatch = g.personnel.toLowerCase().includes(q) || g.email.toLowerCase().includes(q);
                const files = persoMatch
                    ? g.files
                    : g.files.filter(f =>
                        f.nom_fichiers.toLowerCase().includes(q) || f.dossier.toLowerCase().includes(q));
                return {...g, files};
            })
            .filter(g => g.files.length > 0);
        // Ouvre les blocs correspondant à la recherche pour révéler les résultats
        this.groups.forEach(g => this.collapsed[g.key] = false);
    }

    toggleGroup(key: string): void {
        this.collapsed[key] = !this.collapsed[key];
    }

    // ── Aperçu ────────────────────────────────────────────────────────
    openPreview(file: DocFile): void {
        this.previewRow = file;
        this.previewSafeUrl = null;
        if (this.isPdf(file.extension)) {
            this.previewSafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(file.url);
        } else if (this.isOffice(file.extension)) {
            this.previewSafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
                `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(file.url)}`
            );
        }
    }

    closePreview(): void {
        this.previewRow = null;
        this.previewSafeUrl = null;
    }

    download(file: DocFile): void {
        if (file?.url) window.open(file.url, '_blank');
    }

    // ── Helpers type de fichier ───────────────────────────────────────
    isImage(ext: string): boolean {
        return this.IMAGE_EXTS.includes((ext || '').toLowerCase());
    }

    isPdf(ext: string): boolean {
        return (ext || '').toLowerCase() === 'pdf';
    }

    isOffice(ext: string): boolean {
        return this.OFFICE_EXTS.includes((ext || '').toLowerCase());
    }

    /* Extension propre : retire ?query et #hash des URL S3 signées */
    private cleanExt(src: string): string {
        const clean = String(src || '').split('?')[0].split('#')[0];
        return (clean.split('.').pop() || '').toLowerCase();
    }

    initials(name: string): string {
        const parts = (name || '').trim().split(/\s+/).filter(Boolean);
        if (!parts.length) return '?';
        return (parts[0][0] + (parts[1]?.[0] || '')).toUpperCase();
    }

    getFileIconClass(ext: string): string {
        const e = (ext || '').toLowerCase();
        if (e === 'pdf') return 'fa-file-pdf';
        if (['doc', 'docx'].includes(e)) return 'fa-file-word';
        if (['xls', 'xlsx'].includes(e)) return 'fa-file-excel';
        if (['ppt', 'pptx'].includes(e)) return 'fa-file-powerpoint';
        if (this.IMAGE_EXTS.includes(e)) return 'fa-file-image';
        if (['zip', 'rar', '7z', 'tar'].includes(e)) return 'fa-file-archive';
        return 'fa-file-lines';
    }

    getFileIconColor(ext: string): string {
        const e = (ext || '').toLowerCase();
        if (e === 'pdf') return '#E53E3E';
        if (['doc', 'docx'].includes(e)) return '#3182CE';
        if (['xls', 'xlsx'].includes(e)) return '#276749';
        if (['ppt', 'pptx'].includes(e)) return '#DD6B20';
        if (this.IMAGE_EXTS.includes(e)) return '#805AD5';
        return '#64748B';
    }
}
