/**
 * Étiquette « courrier » apposée sur les pièces jointes PDF d'une imputation.
 *
 * Reproduit le post-it que les services collent sur le papier à l'arrivée du
 * courrier : en-tête ARRIVE / DEPART, références du dossier, puis la personne
 * et l'horodatage. Elle est dessinée sur la PREMIÈRE page de la PREMIÈRE pièce
 * PDF de chaque message du fil.
 *
 * Le fichier archivé n'est jamais modifié : l'étiquette est peinte à
 * l'affichage, à l'impression, et incrustée dans la copie téléchargée.
 */

import { Imputation, ImputationFichier } from './imputation-api';

export interface EtiquetteCourrier {
    /** « COURRIER ARRIVE » ou « COURRIER DEPART ». */
    entete: string;
    titre: string;
    reference: string;
    /** Libellé de la consigne, tel qu'il apparaît sur le courrier. */
    consigne: string;
    /** Libellé de la priorité (« Haute », « Basse »…), non réduit à oui/non. */
    priorite: string;
    auteur: string;
    date: string;
}

/** Valeur affichée quand la donnée n'est pas renseignée, comme sur le papier. */
const NON_RENSEIGNE = 'N/A';

/**
 * Les polices standard d'un PDF sont encodées en WinAnsi : un caractère
 * hors de ce jeu fait échouer l'écriture. Les intitulés viennent de saisies
 * libres et de copier-coller bureautiques, où guillemets courbes et tirets
 * longs abondent : on les ramène à leurs équivalents, et on écarte le reste.
 */
function nettoyerPourPdf(texte: string): string {
    return (texte || '')
        .replace(/[\u2018\u2019\u201B]/g, "'")
        .replace(/[\u201C\u201D]/g, '"')
        .replace(/[\u2013\u2014]/g, '-')
        .replace(/\u2026/g, '...')
        .replace(/\u00A0/g, ' ')
        .replace(/[^\u0020-\u007E\u00A1-\u00FF\u20AC\u0152\u0153]/g, '');
}

function valeur(texte: string | undefined | null): string {
    const net = nettoyerPourPdf((texte || '').toString()).trim();
    return net || NON_RENSEIGNE;
}

/**
 * Associe à chaque pièce PDF concernée l'étiquette à y apposer.
 *
 * La clé est l'identifiant du fichier : la visionneuse n'a ainsi pas besoin de
 * savoir de quel message vient la pièce qu'on lui demande d'ouvrir.
 *
 * @param moi uid de l'utilisateur connecté, pour situer le message d'origine.
 */
export function construireEtiquettes(
    imputation: Imputation | null, moi: string
): Map<string, EtiquetteCourrier> {
    const etiquettes = new Map<string, EtiquetteCourrier>();
    if (!imputation) return etiquettes;

    const commun = {
        titre: valeur(imputation.documentTitre),
        reference: valeur(imputation.documentReference),
        consigne: valeur(imputation.consigneLibelle),
        priorite: valeur(imputation.prioriteLibelle),
    };

    const poser = (
        fichiers: ImputationFichier[], emis: boolean, auteur: string, date: string
    ) => {
        const premierPdf = (fichiers || []).find(f => f.extension === 'pdf' && f.url);
        if (!premierPdf) return;
        etiquettes.set(premierPdf.id, {
            entete: emis ? 'COURRIER DEPART' : 'COURRIER ARRIVE',
            ...commun,
            auteur: valeur(auteur),
            date: valeur(date),
        });
    };

    // Pièces du document archivé : elles appartiennent au message d'origine,
    // dont le sens se lit par rapport à l'expéditeur de l'imputation.
    poser(
        imputation.piecesJointes,
        !!moi && imputation.expediteur?.uid === moi,
        imputation.expediteur?.nom || '',
        imputation.date
    );

    // Puis chaque message du fil, avec SON auteur et SA date : c'est ce que
    // porte un vrai post-it, pas la date de création du dossier.
    (imputation.messages || []).forEach(message => {
        poser(message.fichiers, message.estEmis, message.auteur?.nom || '', message.date);
    });

    return etiquettes;
}

// ══ Mise en page commune ═══════════════════════════════════════════════════
// Les dimensions sont exprimées en fraction de la largeur de page, pour que
// l'étiquette garde la même allure quel que soit le format ou le zoom.

const LARGEUR_RELATIVE = 0.34;   // part de la largeur de page
const LARGEUR_MIN = 170;         // en points PDF, pour rester lisible
const LARGEUR_MAX = 290;
const MARGE_RELATIVE = 0.045;

interface Plan {
    largeur: number;
    hauteur: number;
    x: number;
    y: number;
    pad: number;
    tailleEntete: number;
    tailleTexte: number;
    taillePied: number;
    lignes: string[];
    pied: string[];
}

/** Découpe un texte à la largeur utile, selon une fonction de mesure donnée. */
function replier(texte: string, largeurUtile: number, mesurer: (t: string) => number): string[] {
    const mots = (texte || '').split(/\s+/).filter(m => m);
    if (!mots.length) return [''];

    const lignes: string[] = [];
    let courante = '';

    for (const mot of mots) {
        const essai = courante ? courante + ' ' + mot : mot;
        if (mesurer(essai) <= largeurUtile || !courante) {
            courante = essai;
        } else {
            lignes.push(courante);
            courante = mot;
        }
    }
    if (courante) lignes.push(courante);
    return lignes;
}

/**
 * Calcule la géométrie de l'étiquette pour une page donnée. La hauteur
 * découle du texte replié : un intitulé long allonge le post-it au lieu
 * de déborder.
 */
function planifier(
    etiquette: EtiquetteCourrier, largeurPage: number, hauteurPage: number,
    mesurer: (texte: string, taille: number) => number
): Plan {
    const largeur = Math.max(LARGEUR_MIN, Math.min(LARGEUR_MAX, largeurPage * LARGEUR_RELATIVE));
    const pad = largeur * 0.075;
    const utile = largeur - pad * 2;

    const tailleEntete = largeur * 0.062;
    const tailleTexte = largeur * 0.049;
    const taillePied = largeur * 0.045;

    const champs = [
        '- Titre : ' + etiquette.titre,
        '- Ref : ' + etiquette.reference,
        '- Consigne : ' + etiquette.consigne,
        '- Priorité : ' + etiquette.priorite,
    ];

    const lignes: string[] = [];
    champs.forEach(champ => {
        replier(champ, utile, t => mesurer(t, tailleTexte)).forEach(l => lignes.push(l));
    });

    const pied: string[] = [];
    replier(etiquette.auteur, utile, t => mesurer(t, taillePied)).forEach(l => pied.push(l));
    pied.push(etiquette.date);

    const interligne = tailleTexte * 1.55;
    const interlignePied = taillePied * 1.5;

    const hauteur = pad                       // marge haute
        + tailleEntete * 1.9                  // en-tête + son espace
        + lignes.length * interligne
        + pad * 0.55                          // avant le filet
        + pied.length * interlignePied
        + pad * 0.9;

    return {
        largeur, hauteur,
        x: largeurPage * MARGE_RELATIVE,
        y: hauteurPage * MARGE_RELATIVE,
        pad, tailleEntete, tailleTexte, taillePied,
        lignes, pied,
    };
}

// Teintes du post-it : papier jaune, texte encre, punaise bleue.
const PAPIER = '#FBEE92';
const PAPIER_OMBRE = '#E9D86A';
const ENCRE = '#1F2937';
const ENCRE_TITRE = '#00366E';
const PUNAISE = '#2563EB';
const PUNAISE_OMBRE = '#1D4ED8';

// ══ Rendu sur un canvas (aperçu et impression) ═════════════════════════════

/**
 * Peint l'étiquette sur un canvas déjà occupé par la page rendue.
 * Les coordonnées canvas partent du haut : l'étiquette se place donc
 * directement depuis le bord supérieur.
 */
export function dessinerEtiquetteCanvas(
    ctx: CanvasRenderingContext2D, etiquette: EtiquetteCourrier,
    largeurPage: number, hauteurPage: number
): void {
    const police = (taille: number, gras = false) =>
        `${gras ? '700 ' : ''}${taille}px "Segoe UI", Arial, sans-serif`;

    const mesurer = (texte: string, taille: number) => {
        ctx.font = police(taille);
        return ctx.measureText(texte).width;
    };

    const p = planifier(etiquette, largeurPage, hauteurPage, mesurer);

    ctx.save();

    // Papier, avec une ombre portée qui le décolle de la page
    ctx.shadowColor = 'rgba(15, 23, 42, 0.35)';
    ctx.shadowBlur = p.largeur * 0.05;
    ctx.shadowOffsetX = p.largeur * 0.012;
    ctx.shadowOffsetY = p.largeur * 0.018;
    ctx.fillStyle = PAPIER;
    ctx.fillRect(p.x, p.y, p.largeur, p.hauteur);
    ctx.shadowColor = 'transparent';

    // Un liseré plus sombre suggère l'épaisseur du bloc de feuillets
    ctx.fillStyle = PAPIER_OMBRE;
    ctx.fillRect(p.x, p.y + p.hauteur - p.largeur * 0.012, p.largeur, p.largeur * 0.012);

    let y = p.y + p.pad + p.tailleEntete;

    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = ENCRE_TITRE;
    ctx.font = police(p.tailleEntete, true);
    ctx.fillText(etiquette.entete, p.x + p.pad, y);

    y += p.tailleEntete * 0.9;

    ctx.fillStyle = ENCRE;
    ctx.font = police(p.tailleTexte);
    const interligne = p.tailleTexte * 1.55;
    p.lignes.forEach(ligne => {
        y += interligne;
        ctx.fillText(ligne, p.x + p.pad, y);
    });

    // Filet de séparation avant la signature
    y += p.pad * 0.55;
    ctx.strokeStyle = 'rgba(31, 41, 55, 0.25)';
    ctx.lineWidth = Math.max(1, p.largeur * 0.004);
    ctx.beginPath();
    ctx.moveTo(p.x + p.pad, y);
    ctx.lineTo(p.x + p.largeur - p.pad, y);
    ctx.stroke();

    ctx.font = police(p.taillePied, true);
    const interlignePied = p.taillePied * 1.5;
    p.pied.forEach(ligne => {
        y += interlignePied;
        ctx.fillText(ligne, p.x + p.pad, y);
    });

    dessinerPunaiseCanvas(ctx, p.x + p.largeur / 2, p.y + p.pad * 0.15, p.largeur * 0.055);

    ctx.restore();
}

/** Punaise plantée en haut de l'étiquette. */
function dessinerPunaiseCanvas(
    ctx: CanvasRenderingContext2D, cx: number, cy: number, rayon: number
): void {
    ctx.save();
    ctx.fillStyle = PUNAISE_OMBRE;
    ctx.beginPath();
    ctx.arc(cx, cy + rayon * 0.35, rayon, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = PUNAISE;
    ctx.beginPath();
    ctx.arc(cx, cy, rayon, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
    ctx.beginPath();
    ctx.arc(cx - rayon * 0.3, cy - rayon * 0.3, rayon * 0.32, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

// ══ Incrustation dans le PDF téléchargé ════════════════════════════════════

/**
 * Renvoie une copie du PDF portant l'étiquette sur sa première page.
 *
 * Le contenu d'origine est conservé tel quel — on ne rastérise rien, le texte
 * du document reste sélectionnable. Un PDF chiffré ne peut pas être rouvert
 * par pdf-lib : l'appelant retombe alors sur le fichier d'origine.
 */
export async function incrusterEtiquettePdf(
    source: ArrayBuffer, etiquette: EtiquetteCourrier
): Promise<Uint8Array> {
    const { PDFDocument, StandardFonts, rgb } = await import('pdf-lib');

    const pdf = await PDFDocument.load(source);
    const page = pdf.getPages()[0];
    if (!page) throw new Error('document sans page');

    const normale = await pdf.embedFont(StandardFonts.Helvetica);
    const grasse = await pdf.embedFont(StandardFonts.HelveticaBold);

    const { width: largeurPage, height: hauteurPage } = page.getSize();
    const p = planifier(
        etiquette, largeurPage, hauteurPage,
        (texte, taille) => normale.widthOfTextAtSize(texte, taille)
    );

    // pdf-lib compte les ordonnées depuis le BAS de la page : on convertit le
    // coin haut-gauche calculé par planifier() en coin bas-gauche.
    const bas = hauteurPage - p.y - p.hauteur;
    const teinte = (hex: string) => rgb(
        parseInt(hex.slice(1, 3), 16) / 255,
        parseInt(hex.slice(3, 5), 16) / 255,
        parseInt(hex.slice(5, 7), 16) / 255
    );

    // Ombre portée, simulée par un rectangle gris légèrement décalé
    page.drawRectangle({
        x: p.x + p.largeur * 0.012,
        y: bas - p.largeur * 0.018,
        width: p.largeur,
        height: p.hauteur,
        color: rgb(0.06, 0.09, 0.16),
        opacity: 0.22,
    });

    page.drawRectangle({
        x: p.x, y: bas, width: p.largeur, height: p.hauteur, color: teinte(PAPIER),
    });
    page.drawRectangle({
        x: p.x, y: bas, width: p.largeur, height: p.largeur * 0.012, color: teinte(PAPIER_OMBRE),
    });

    // Même progression que sur le canvas, mais exprimée vers le bas
    let y = hauteurPage - p.y - p.pad - p.tailleEntete;

    page.drawText(etiquette.entete, {
        x: p.x + p.pad, y, size: p.tailleEntete, font: grasse, color: teinte(ENCRE_TITRE),
    });

    y -= p.tailleEntete * 0.9;

    const interligne = p.tailleTexte * 1.55;
    p.lignes.forEach(ligne => {
        y -= interligne;
        page.drawText(ligne, {
            x: p.x + p.pad, y, size: p.tailleTexte, font: normale, color: teinte(ENCRE),
        });
    });

    y -= p.pad * 0.55;
    page.drawLine({
        start: {x: p.x + p.pad, y},
        end: {x: p.x + p.largeur - p.pad, y},
        thickness: Math.max(0.6, p.largeur * 0.004),
        color: teinte(ENCRE),
        opacity: 0.25,
    });

    const interlignePied = p.taillePied * 1.5;
    p.pied.forEach(ligne => {
        y -= interlignePied;
        page.drawText(ligne, {
            x: p.x + p.pad, y, size: p.taillePied, font: grasse, color: teinte(ENCRE),
        });
    });

    // Punaise
    const rayon = p.largeur * 0.055;
    const cx = p.x + p.largeur / 2;
    const cy = hauteurPage - p.y - p.pad * 0.15;
    page.drawCircle({x: cx, y: cy - rayon * 0.35, size: rayon, color: teinte(PUNAISE_OMBRE)});
    page.drawCircle({x: cx, y: cy, size: rayon, color: teinte(PUNAISE)});
    page.drawCircle({
        x: cx - rayon * 0.3, y: cy + rayon * 0.3, size: rayon * 0.32,
        color: rgb(1, 1, 1), opacity: 0.55,
    });

    return pdf.save();
}
