import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { ClipboardOnParagraphComponent } from './clipboard-on-paragraph/clipboard-on-paragraph.component';
import { ClipboardOnTextInputComponent } from './clipboard-on-text-input/clipboard-on-text-input.component';
import { ClipboardOnTextareaComponent } from './clipboard-on-textarea/clipboard-on-textarea.component';
import { CopyPortionFromParagraphComponent } from './copy-portion-from-paragraph/copy-portion-from-paragraph.component';

@Component({
    selector: 'app-clipboard',
    imports: [CommonModule, ClipboardOnParagraphComponent, ClipboardOnTextInputComponent,
              ClipboardOnTextareaComponent, CopyPortionFromParagraphComponent],
    templateUrl: './clipboard.component.html',
    styleUrl: './clipboard.component.scss'
})

export class ClipboardComponent {

}
