import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

/*
 * Coloration syntaxique SQL légère (lecture seule) pour les aperçus de liste.
 * Échappe le HTML puis enrobe mots-clés / chaînes / nombres / commentaires
 * dans des <span> colorés (thème sombre One Dark).
 */
@Pipe({name: 'sqlHighlight', standalone: true})
export class SqlHighlightPipe implements PipeTransform {

    private static readonly KEYWORDS = [
        'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'NOT', 'INSERT', 'INTO', 'VALUES',
        'UPDATE', 'SET', 'DELETE', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'FULL',
        'CROSS', 'ON', 'GROUP', 'BY', 'ORDER', 'HAVING', 'LIMIT', 'OFFSET', 'AS',
        'DISTINCT', 'LIKE', 'ILIKE', 'IN', 'IS', 'NULL', 'BETWEEN', 'UNION', 'ALL',
        'EXISTS', 'CREATE', 'TABLE', 'ALTER', 'DROP', 'TRUNCATE', 'INDEX', 'VIEW',
        'ASC', 'DESC', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'WITH', 'RETURNING',
    ];

    constructor(private sanitizer: DomSanitizer) {
    }

    transform(value: string | undefined | null): SafeHtml {
        if (!value) return '';

        // 1) échappement HTML
        let s = value
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        // 2) chaînes '...'
        s = s.replace(/('([^']|'')*')/g, '<span class="sqlh-str">$1</span>');
        // 3) commentaires -- ...
        s = s.replace(/(--[^\n]*)/g, '<span class="sqlh-com">$1</span>');
        // 4) nombres
        s = s.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="sqlh-num">$1</span>');
        // 5) mots-clés (insensible à la casse)
        const kw = SqlHighlightPipe.KEYWORDS.join('|');
        s = s.replace(new RegExp('\\b(' + kw + ')\\b', 'gi'), '<span class="sqlh-kw">$1</span>');

        return this.sanitizer.bypassSecurityTrustHtml(s);
    }
}
