import {Component, HostListener} from '@angular/core';
import {CommonModule} from '@angular/common';
import moment from 'moment';
import {CardComponent} from "../../card/card.component";
import {NzTagModule} from "ng-zorro-antd/tag";
import {FeatherIconComponent} from "../../feather-icon/feather-icon.component";

interface DetailRow {
    label: string;
    value?: string;
    bool?: boolean;   // si défini → rendu sous forme de badge Oui / Non
}

interface DetailProp {
    label: string;
    type: string;
    value: string;
}

@Component({
    selector: 'app-detail-modal',
    imports: [CommonModule, CardComponent, NzTagModule, FeatherIconComponent],
    templateUrl: './detail-modal.component.html',
    styleUrl: './detail-modal.component.scss',
})
export class DetailModalComponent {

    visible: boolean = false;
    doc: any = null;

    /* ────────────────────────────────────────
       Ouverture / fermeture
    ──────────────────────────────────────── */
    @HostListener('document:keydown.escape')
    handleEscKey(): void {
        if (this.visible) this.close();
    }

    open(doc: any): void {
        this.doc = doc || null;
        this.visible = true;
    }

    close(): void {
        this.visible = false;
    }

    /* ────────────────────────────────────────
       Titre / sous-titre de l'en-tête
    ──────────────────────────────────────── */
    get title(): string {
        return this.doc?.lib_document || this.doc?.lib_docs || 'Détail du document';
    }

    get reference(): string {
        return this.doc?.numero || this.doc?.code_docs || '';
    }

    get categorie(): string {
        return this.doc?.categorie || this.doc?.datacategories?.name_categories || '';
    }

    get categorieColor(): string {
        return this.doc?.categorie_color || '#6366f1';
    }

    /* ────────────────────────────────────────
       Sections de lignes (label / valeur)
    ──────────────────────────────────────── */
    get infosGenerales(): DetailRow[] {
        const d = this.doc || {};
        const type = d?.datatype_document?.[0]?.libelle_type_docs || '';
        const dboite = d?.databoites || {};

        const p = d?.datauser?.datapersonnel || d?.datapersonnel || {};
        const nomComplet = `${p?.nom || ''} ${p?.prenom || ''}`.trim();

        return this.clean([
            {label: 'Numéro', value: d?.numero || d?.code_docs},
            {label: 'Libellé', value: d?.lib_document || d?.lib_docs},
            {label: 'Description', value: d?.desc_docs},
            {label: 'Type de document', value: type},
            {label: 'Date du document', value: d?.date_document || this.formatDate(d?.date_docs)},
            {label: 'Créé le', value: this.formatDateTime(d?.created_at)},
            {label: 'Statut', bool: !!d?.publishe, value: d?.publishe ? 'Public' : 'Privée'},
            {
                label: 'Emplacement physique',
                value: `Ce dossier se trouve à ${d?.datasites?.libelle_sites} à l'épi ${d?.datarayons?.code_rayon} dans la boîte d'archives ${dboite.code_boites}`
            },
            {label: 'Auteur', value: nomComplet},
        ]);
    }


    get services(): DetailRow[] {
        const list = this.doc?.dataservices || [];
        return list.map((s: any) => ({
            label: s?.sigle || '—',
            value: s?.libelle || '',
        })).filter((r: DetailRow) => r.value);
    }

    // Champs à masquer dans « CHAMPS ADDITIONNELS » (déjà affichés ailleurs)
    private readonly PROPS_EXCLUES = [
        'numéro du document',
        'objet du document',
        'date du document',
    ];

    get proprietes(): DetailProp[] {
        const list = this.doc?.datatype_document?.[0]?.dataPro || [];
        return list.map((pr: any) => ({
            label: pr?.lib_proprietes_docs || '',
            type: pr?.type_proprietes_docs || '',
            // La valeur saisie se trouve dans dataPro.dataValue.value_proprietes_docs
            // (dataValue peut être un objet ou un tableau selon l'API)
            value: this.extractProValue(pr?.dataValue),
        })).filter((p: DetailProp) =>
            p.label && !this.PROPS_EXCLUES.includes(p.label.trim().toLowerCase())
        );
    }

    private extractProValue(dataValue: any): string {
        if (!Array.isArray(dataValue)) return '';
        return dataValue
            .map((v: any) => v?.value_proprietes_docs)
            .filter((v: any) => v !== null && v !== undefined && String(v).trim() !== '')
            .join(', ');
    }

    /* ────────────────────────────────────────
       Helpers
    ──────────────────────────────────────── */
    private clean(rows: DetailRow[]): DetailRow[] {
        return rows.filter(r =>
            r.bool !== undefined ||
            (r.value !== null && r.value !== undefined && String(r.value).trim() !== '')
        );
    }

    private formatDate(value: any): string {
        if (!value) return '';
        const m = moment(value);
        return m.isValid() ? m.format('DD/MM/YYYY') : '';
    }

    private formatDateTime(value: any): string {
        if (!value) return '';
        const m = moment(value);
        return m.isValid() ? m.format('DD/MM/YYYY [à] HH:mm') : '';
    }

    closeModal() {
        this.close();
    }
}
