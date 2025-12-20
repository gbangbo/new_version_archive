import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Editor, NgxEditorModule } from 'ngx-editor';

import { CardComponent } from "../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-ngx-editor',
  imports: [CommonModule, FormsModule, NgxEditorModule, CardComponent],
  templateUrl: './ngx-editor.component.html',
  styleUrl: './ngx-editor.component.scss'
})

export class NgxEditorComponent {

  public editor: Editor;
  public html = '';

  ngOnInit(): void {
    this.editor = new Editor();
  }
  
  ngOnDestroy(): void {
    this.editor.destroy();
  }

}
