import {AfterViewInit, Component, ElementRef, forwardRef, Input, OnDestroy, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {EditorView, placeholder as cmPlaceholder} from '@codemirror/view';
import {EditorState} from '@codemirror/state';
import {sql} from '@codemirror/lang-sql';
import {oneDark} from '@codemirror/theme-one-dark';
import {basicSetup} from 'codemirror';

@Component({
    selector: 'app-sql-editor',
    standalone: true,
    template: `<div #host class="sql-editor-host"></div>`,
    styleUrl: './sql-editor.component.scss',
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SqlEditorComponent), multi: true},
    ],
})
export class SqlEditorComponent implements AfterViewInit, OnDestroy, ControlValueAccessor {

    @ViewChild('host', {static: true}) host!: ElementRef<HTMLDivElement>;
    @Input() placeholder = 'SELECT * FROM ...';

    private view?: EditorView;
    private value = '';
    private disabled = false;
    private onChange: (v: string) => void = () => {
    };
    private onTouched: () => void = () => {
    };

    ngAfterViewInit(): void {
        this.view = new EditorView({
            parent: this.host.nativeElement,
            state: EditorState.create({
                doc: this.value,
                extensions: [
                    basicSetup,      // numéros de ligne, historique, raccourcis…
                    sql(),           // coloration SQL + autocomplétion mots-clés
                    oneDark,         // thème sombre (comme VS Code)
                    EditorView.lineWrapping,
                    cmPlaceholder(this.placeholder),
                    EditorView.editable.of(!this.disabled),
                    EditorView.updateListener.of(u => {
                        if (u.docChanged) {
                            this.value = u.state.doc.toString();
                            this.onChange(this.value);
                        }
                        if (u.focusChanged && !u.view.hasFocus) {
                            this.onTouched();
                        }
                    }),
                ],
            }),
        });
    }

    // ── ControlValueAccessor ──────────────────────────────────────────
    writeValue(v: string): void {
        this.value = v || '';
        if (this.view) {
            const cur = this.view.state.doc.toString();
            if (cur !== this.value) {
                this.view.dispatch({changes: {from: 0, to: cur.length, insert: this.value}});
            }
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    ngOnDestroy(): void {
        this.view?.destroy();
    }
}
