import {AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, Input, OnDestroy, Output, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {EditorView, placeholder as cmPlaceholder} from '@codemirror/view';
import {EditorState} from '@codemirror/state';
import {json, jsonParseLinter} from '@codemirror/lang-json';
import {linter, lintGutter} from '@codemirror/lint';
import {oneDark} from '@codemirror/theme-one-dark';
import {basicSetup} from 'codemirror';

/*
 * Éditeur JSON (CodeMirror) : coloration, validation en direct (linter),
 * bouton « Formater ». Émet (validChange) = true si vide ou JSON valide.
 * S'utilise avec [(ngModel)] (chaîne).
 */
@Component({
    selector: 'app-json-editor',
    standalone: true,
    templateUrl: './json-editor.component.html',
    styleUrl: './json-editor.component.scss',
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JsonEditorComponent), multi: true},
    ],
})
export class JsonEditorComponent implements AfterViewInit, OnDestroy, ControlValueAccessor {

    @ViewChild('host', {static: true}) host!: ElementRef<HTMLDivElement>;
    @Input() placeholder = '{ "clé": "valeur" }';
    @Output() validChange = new EventEmitter<boolean>();

    private view?: EditorView;
    private value = '';
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
                    basicSetup,
                    json(),
                    oneDark,
                    EditorView.lineWrapping,
                    lintGutter(),
                    linter(jsonParseLinter()),
                    cmPlaceholder(this.placeholder),
                    EditorView.updateListener.of(u => {
                        if (u.docChanged) {
                            this.value = u.state.doc.toString();
                            this.onChange(this.value);
                            this.emitValid();
                        }
                        if (u.focusChanged && !u.view.hasFocus) this.onTouched();
                    }),
                ],
            }),
        });
        this.emitValid();
    }

    private emitValid(): void {
        this.validChange.emit(this.isValid());
    }

    isValid(): boolean {
        const t = this.value.trim();
        if (!t) return true;
        try {
            JSON.parse(t);
            return true;
        } catch {
            return false;
        }
    }

    format(): void {
        const t = this.value.trim();
        if (!t) return;
        try {
            this.setDoc(JSON.stringify(JSON.parse(t), null, 2));
        } catch {
            /* JSON invalide : on ne formate pas */
        }
    }

    private setDoc(text: string): void {
        if (!this.view) {
            this.value = text;
            return;
        }
        const cur = this.view.state.doc.toString();
        if (cur !== text) {
            this.view.dispatch({changes: {from: 0, to: cur.length, insert: text}});
            this.value = text;
        }
    }

    // ── ControlValueAccessor ──────────────────────────────────────────
    writeValue(v: string): void {
        this.value = v || '';
        if (this.view) this.setDoc(this.value);
        this.emitValid();
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    ngOnDestroy(): void {
        this.view?.destroy();
    }
}
