/**
 * ══ ICÔNES DISPONIBLES POUR LA BARRE LATÉRALE ═══════════════════════════
 *
 * app-svg-icon pointe sur public/assets/svg/icon-sprite.svg et préfixe l'identifiant
 * par `stroke-` ou `fill-` selon layoutService.config.settings.icon. Une icône n'est
 * donc sûre que si les DEUX variantes existent dans le sprite.
 *
 * Relevé du sprite : 69 identifiants en `stroke-`, 54 en `fill-`.
 */

/** Les 48 icônes présentes dans les deux jeux : sûres quel que soit le thème. */
export const ICONES_SIDEBAR: string[] = [
    'animation', 'api', 'authenticate', 'blog', 'board', 'bonus-kit', 'bookmark', 'button',
    'calendar', 'charts', 'chat', 'coming-soon', 'contact', 'ecommerce', 'editors', 'email',
    'email-temp', 'error', 'faq', 'file', 'form', 'gallery', 'home', 'icons',
    'internationalization', 'job-search', 'knowledgebase', 'landing-page', 'layout',
    'learning', 'maps', 'price', 'project', 'reports', 'sample-page', 'search', 'sitemap',
    'social', 'starter-kit', 'subscribe', 'support-tickets', 'table', 'task', 'task-arrow',
    'to-do', 'ui-kits', 'user', 'widget'
];

/**
 * Présentes en `stroke-` seulement : elles s'affichent vides dès que le thème passe
 * en icônes pleines. Plusieurs sont pourtant déjà utilisées par le menu écrit en dur
 * (archive, document, folder, ged, import, validation…) : on les propose donc, mais
 * signalées, plutôt que de les cacher et de rendre incohérent l'existant.
 */
export const ICONES_STROKE_SEULEMENT: string[] = [
    'activity', 'archive', 'arrow', 'building', 'change', 'client', 'cogs', 'delivered',
    'document', 'files', 'flechedown', 'folder', 'ged', 'import', 'journal', 'msg', 'note',
    'package', 'progress-delivery', 'report', 'validation'
];

export function iconeIncomplete(nom: string): boolean {
    return ICONES_STROKE_SEULEMENT.includes(nom);
}
