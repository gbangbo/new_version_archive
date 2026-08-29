/**
 * Convention des popups du module d'imputation.
 *
 * Regroupée ici parce que plusieurs écrans en ont besoin (la boîte, le volet de
 * lecture) et qu'une charte dupliquée finit toujours par diverger. Les styles
 * `imp-swal-*` sont, eux, GLOBAUX (src/styles.scss) : SweetAlert monte son
 * contenu hors du composant, une feuille de style de composant ne l'atteindrait
 * pas.
 */

/** `buttonsStyling: false` : les boutons sont entièrement à notre charte. */
export const OPTIONS_POPUP = {
    showCancelButton: true,
    cancelButtonText: 'Annuler',
    reverseButtons: true,
    buttonsStyling: false,
    width: 520,
    padding: 0,
    showClass: {popup: 'imp-swal-entree'},
    customClass: {
        popup: 'imp-swal',
        htmlContainer: 'imp-swal-html',
        actions: 'imp-swal-actions',
        confirmButton: 'imp-swal-btn imp-swal-btn-primary',
        cancelButton: 'imp-swal-btn imp-swal-btn-cancel',
    },
};

/**
 * Échappe un texte destiné au `html` d'un popup.
 *
 * Le contenu vient d'autrui (instruction, nom de document) : injecté tel quel
 * dans du HTML construit à la main, il ne passerait par aucune sanitisation
 * Angular.
 */
export function echapper(texte: string): string {
    return (texte || '').replace(/[&<>"']/g, caractere => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }[caractere] as string));
}
