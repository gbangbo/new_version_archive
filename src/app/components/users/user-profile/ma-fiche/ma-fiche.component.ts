import {Component, OnInit} from '@angular/core';
import {CommonModule, DatePipe} from "@angular/common";
import {Authorization} from "../../../../protect/authorization.service";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-ma-fiche',
    imports: [CommonModule],
    templateUrl: './ma-fiche.component.html',
    styleUrl: './ma-fiche.component.scss',
    providers: [DatePipe],
})
export class MaFicheComponent implements OnInit {
    errorTexte: string = '';
    isloading: boolean = false
    userData: any = []

    today = new Date();
    actes: any[] = [];
    photoBase64: string | null = null;
    logoSocieteBase64: string | null = null;
    logoGaucheBase64: string | null = null;
    private filePathAmoirie: string = 'assets/images/logo/amoirie_base64.txt';

    constructor(private autor: Authorization, private http: HttpClient) {

    }

    ngOnInit() {
        this.userData = this.autor.getInfosUsers();
        this.actes = this.userData?.actes || [];
        this.loadImages();
    }


    // ─── Chargement images en base64 ────────────────────────────
    private loadImages(): void {
        const photoPath = this.userData?.datapersonnel?.photo;
        if (photoPath) {
            this.imageToBase64(photoPath)
                .then(b64 => (this.photoBase64 = b64))
            // .catch(() => (this.photoBase64 = null));
        }

        const logoPath = this.userData?.datasociete?.logo;
        if (logoPath) {
            this.imageToBase64(logoPath)
                .then(b64 => (this.logoSocieteBase64 = b64))

            // .catch(() => (this.logoSocieteBase64 = null));
        }

        this.loadAmoirie()
    }

    getFileContent(filePath: string): Observable<string> {
        return this.http.get(filePath, {responseType: 'text'});
    }

    loadAmoirie(): void {
        this.getFileContent(this.filePathAmoirie).subscribe(
            (data: string) => {
                this.logoGaucheBase64 = data;
            },
            (error: any) => {
            }
        );
    }

    private imageToBase64(url: string): Promise<string> {
        return fetch(url, {mode: 'cors'})
            .then(response => response.blob())
            .then(blob => new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            }));
    }

    // private imageToBase64(url: string): Promise<string> {
    //     return new Promise((resolve, reject) => {
    //         const img = new Image();
    //         img.crossOrigin = 'anonymous';
    //         img.onload = () => {
    //             const canvas = document.createElement('canvas');
    //             canvas.width = img.naturalWidth;
    //             canvas.height = img.naturalHeight;
    //             canvas.getContext('2d')!.drawImage(img, 0, 0);
    //             resolve(canvas.toDataURL('image/png').split(',')[1]);
    //         };
    //         img.onerror = reject;
    //         img.src = url;
    //     });
    // }

    // ─── Helpers affichage ───────────────────────────────────────
    getNomComplet(): string {
        const nom = this.userData?.datapersonnel?.nom || '';
        const prenom = this.userData?.datapersonnel?.prenom || '';
        return `${nom} ${prenom}`.trim().toUpperCase() || 'AGENT INCONNU';
    }

    getInitiales(): string {
        const nom = this.userData?.datapersonnel?.nom?.[0] || '';
        const prenom = this.userData?.datapersonnel?.prenom?.[0] || '';
        return `${nom}${prenom}`.toUpperCase() || '?';
    }

    formatSexe(sexe: string | null): string {
        if (!sexe) return '—';
        return sexe.toUpperCase() === 'M' ? 'Masculin' : 'Féminin';
    }

    getRoleLabel(): string {
        const roles: Record<number, string> = {
            1: 'Super Administrateur',
            2: 'Administrateur',
            3: 'Gestionnaire',
            4: 'Agent',
        };
        return roles[this.userData?.roles] || `Rôle ${this.userData?.roles}`;
    }

    getStatutLabel(): string {
        const statut = this.userData?.datastatutpersonnel?.statut_personnel;
        const map: Record<number, string> = {1: 'Actif', 2: 'Inactif', 3: 'Suspendu', 4: 'Retraité'};
        return map[statut] || '—';
    }

    getStatutClass(): string {
        const statut = this.userData?.datastatutpersonnel?.statut_personnel;
        const map: Record<number, string> = {1: 'green', 2: 'red', 3: 'orange', 4: 'gray'};
        return map[statut] || '';
    }

    exportPDF(): void {
        Promise.all([
            import('jspdf'),
            import('jspdf-autotable'),
        ]).then(([jsPDFModule, autoTableModule]) => {
            const {jsPDF} = jsPDFModule;
            const autoTable = autoTableModule.default;

            const doc = new jsPDF({orientation: 'portrait', unit: 'mm', format: 'a4'});
            const W = 210;
            const margin = 14;
            let y = 0;

            const p = this.userData?.datapersonnel;
            const s = this.userData?.datastatut_personnel;
            const serv = this.userData?.dataservice;
            const soc = this.userData?.datasociete;
            const fonc = this.userData?.datafonction;
            const pos = this.userData?.dataposte;
            const role = this.userData.dataroles

            // ── Helpers PDF ────────────────────────────────────────
            const setF = (size: number, style: 'normal' | 'bold' | 'italic' = 'normal') => {
                doc.setFontSize(size);
                doc.setFont('helvetica', style);
            };

            const rgb = (hex: string): [number, number, number] => [
                parseInt(hex.slice(1, 3), 16),
                parseInt(hex.slice(3, 5), 16),
                parseInt(hex.slice(5, 7), 16),
            ];

            const sectionHeader = (title: string, yPos: number): number => {
                doc.setFillColor(...rgb('#eeeeee'));
                doc.rect(0, yPos, W, 7, 'F');
                setF(9, 'bold');
                doc.setTextColor(0, 0, 0);
                doc.text(title.toUpperCase(), margin, yPos + 4.8);
                return yPos + 7;
            };

            const fieldRow = (
                label: string, value: string,
                xLeft: number, xRight: number,
                yPos: number, col: 'left' | 'right'
            ): void => {
                const x = col === 'left' ? xLeft : xRight;
                setF(8, 'normal');
                doc.setTextColor(80, 80, 80);
                doc.text(`${label} :`, x, yPos);
                setF(8, 'bold');
                doc.setTextColor(...rgb('#c62828'));
                const maxW = (W / 2) - margin - 4;
                const truncated = doc.splitTextToSize(value || '—', maxW)[0];
                doc.text(truncated, x + doc.getTextWidth(`${label} :`) + 2, yPos);
            };

            // ═══════════════ 1. HEADER ════════════════════════════
            doc.setFillColor(255, 255, 255);
            doc.rect(0, 0, W, 32, 'F');
            doc.setFillColor(...rgb('#eeeeee'));
            doc.rect(0, 30, W, 2, 'F');

            if (this.logoGaucheBase64) {
                doc.addImage(this.logoGaucheBase64, 'PNG', margin, 4, 18, 18);
            } else {
                doc.setFillColor(200, 200, 200);
                doc.rect(margin, 4, 18, 18, 'F');
            }

            if (this.logoSocieteBase64) {
                doc.addImage(this.logoSocieteBase64, 'PNG', W - margin - 18, 4, 18, 18);
            } else {
                doc.setFillColor(200, 200, 200);
                doc.rect(W - margin - 18, 4, 18, 18, 'F');
            }

            setF(6, 'normal');
            doc.setTextColor(50, 50, 50);
            doc.text(
                ["RÉPUBLIQUE DE CÔTE D'IVOIRE", 'Union – Discipline – Travail', '',
                    "Ministère d'État, Ministère", 'de la Fonction Publique', 'et de la Modernisation'],
                margin + 20, 7, {lineHeightFactor: 1.4}
            );

            setF(14, 'bold');
            doc.setTextColor(20, 20, 20);
            doc.text('FICHE DE RENSEIGNEMENT', W / 2, 14, {align: 'center'});
            setF(8, 'normal');
            doc.setTextColor(...rgb('#2e7d32'));
            doc.text(soc?.raison_sociale || '', W / 2, 20, {align: 'center'});
            y = 34;

            // ═══════════════ 2. PHOTO + IDENTITÉ ═════════════════
            const photoX = W / 2 - 15;
            const photoW = 30;
            const photoH = 36;

            if (this.photoBase64) {
                doc.addImage(this.photoBase64, 'JPEG', photoX, y, photoW, photoH);
                doc.setDrawColor(...rgb('#bbbbbb'));
                doc.rect(photoX, y, photoW, photoH);
            } else {
                doc.setFillColor(220, 220, 220);
                doc.rect(photoX, y, photoW, photoH, 'F');
                setF(7, 'normal');
                doc.setTextColor(150, 150, 150);
                doc.text('PHOTO', photoX + photoW / 2, y + photoH / 2, {align: 'center'});
            }

            y += photoH + 4;
            setF(11, 'bold');
            doc.setTextColor(20, 20, 20);
            doc.text(`M. ${p?.nom || ''} ${p?.prenom || ''}`.toUpperCase(), W / 2, y, {align: 'center'});
            y += 5;
            setF(9, 'normal');
            doc.setTextColor(...rgb('#2e7d32'));
            doc.text(
                `Badge N° ${s?.numero_badge || ''} — ${soc?.raison_sociale || ''}`.toUpperCase(),
                W / 2, y, {align: 'center'}
            );
            y += 8;

            // ═══════════════ 3. INFOS PERSONNELLES ═══════════════
            y = sectionHeader('Informations Personnelles', y);
            const colLeft = margin;
            const colRight = W / 2 + 4;
            const lineH = 5.5;
            y += 4;

            const infoPerso: [string, string][][] = [
                [['Nom', p?.nom], ['Prénom', p?.prenom]],
                [['Sexe', this.formatSexe(p?.sexe)], ['Email', p?.emailAgent]],
                [['Tél. mobile', p?.telMobile], ['', '']]
            ];
            infoPerso.forEach(row => {
                fieldRow(row[0][0], row[0][1], colLeft, colRight, y, 'left');
                if (row[1][0]) fieldRow(row[1][0], row[1][1], colLeft, colRight, y, 'right');
                y += lineH;
            });
            y += 3;

            // ═══════════════ 4. EMPLOI ════════════════════════════
            y = sectionHeader('Emploi & Affectation', y);
            y += 4;
            const emploiRows: [string, string][][] = [
                [['Société', soc?.raison_sociale], ['Code société', soc?.code_societe]],
                [['N° Badge', s?.numero_badge], ['Localisation', soc?.localisation]],
                [['Service', String(serv?.libelle_service)], ['Poste', String(pos?.libelle_poste)]],
                [['Fonction', String(fonc?.libelle_fonction)], ['Statut', this.getStatutLabel()]],
                [['Date début contrat', s?.date_debut_contrat], ['Date fin contrat', s?.date_fin_contrat]],
            ];
            emploiRows.forEach(row => {
                fieldRow(row[0][0], row[0][1], colLeft, colRight, y, 'left');
                if (row[1][0]) fieldRow(row[1][0], row[1][1], colLeft, colRight, y, 'right');
                y += lineH;
            });
            y += 3;

            // ═══════════════ 5. COMPTE ════════════════════════════
            y = sectionHeader('Compte & Accès', y);
            y += 4;
            const compteRows: [string, string][][] = [
                [['Utilisateur',`${p?.nom || ''} ${p?.prenom || ''}`.toUpperCase()], ['Email compte', this.userData?.email]],
                [['Rôle', `${role.libelle_role}`], ['Double auth', soc?.double_auth ? 'Activée' : 'Non activée']],
            ];
            compteRows.forEach(row => {
                fieldRow(row[0][0], row[0][1], colLeft, colRight, y, 'left');
                if (row[1][0]) fieldRow(row[1][0], row[1][1], colLeft, colRight, y, 'right');
                y += lineH;
            });
            y += 3;

            // ═══════════════ 6. ACTES ═════════════════════════════
            // y = sectionHeader('Actes', y);
            // autoTable(doc, {
            //     head: [['N°', 'Nature', 'État', 'Signature', 'Effet', 'Statut']],
            //     body: this.actes.length > 0
            //         ? this.actes.map((a: any) => [
            //             a.numero || '—', a.nature || '—', a.etat || '—',
            //             a.dateSignature || '—', a.dateEffet || '—', a.statut || '—',
            //         ])
            //         : [['—', 'Aucun acte disponible', '—', '—', '—', '—']],
            //     startY: y,
            //     margin: {left: margin, right: margin},
            //     styles: {
            //         fontSize: 7.5,
            //         cellPadding: 2.5,
            //         textColor: [40, 40, 40],
            //         lineColor: [220, 220, 220],
            //         lineWidth: 0.2
            //     },
            //     headStyles: {
            //         fillColor: rgb('#3949ab'),
            //         textColor: [255, 255, 255],
            //         fontStyle: 'bold',
            //         fontSize: 8,
            //         cellPadding: 3
            //     },
            //     alternateRowStyles: {fillColor: [248, 249, 255]},
            //     didParseCell: (data: any) => {
            //         if (data.section === 'body' && data.column.index === 5) {
            //             const val = String(data.cell.text);
            //             if (val.includes('Non encore')) {
            //                 data.cell.styles.textColor = rgb('#c62828');
            //                 data.cell.styles.fontStyle = 'bold';
            //             } else if (val.includes('traitement')) {
            //                 data.cell.styles.textColor = rgb('#e65100');
            //                 data.cell.styles.fontStyle = 'bold';
            //             }
            //         }
            //     },
            //     theme: 'grid',
            // });

            // ═══════════════ FOOTER PAGES ═════════════════════════
            const pageCount = (doc as any).internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                const footerY = 292;
                doc.setFillColor(245, 245, 245);
                doc.rect(0, footerY - 3, W, 10, 'F');
                doc.setDrawColor(...rgb('#eeeeee'));
                doc.line(0, footerY - 3, W, footerY - 3);
                setF(7, 'normal');
                doc.setTextColor(120, 120, 120);
                const dateStr = new Date().toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                });
                doc.text(`© 2025, RCI – ${soc?.raison_sociale || 'fiche de renseignement'}.`, margin, footerY + 2);
                doc.text(`Imprimé le ${dateStr}`, W / 2, footerY + 2, {align: 'center'});
                doc.text(`Page ${i} / ${pageCount}`, W - margin, footerY + 2, {align: 'right'});
            }

            // ═══════════════ SAUVEGARDE ═══════════════════════════
            const nom = `${p?.nom || 'Agent'}_${p?.prenom || ''}_Badge${s?.numero_badge || ''}`;
            doc.save(`Fiche_${nom.replace(/\s+/g, '_')}.pdf`);
        });
    }

}
