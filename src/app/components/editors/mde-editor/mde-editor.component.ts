import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { CardComponent } from "../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-mde-editor',
  imports: [CommonModule, AngularEditorModule, FormsModule, CardComponent],
  templateUrl: './mde-editor.component.html',
  styleUrl: './mde-editor.component.scss'
})

export class MdeEditorComponent {

  public htmlContent = '';

  constructor() { }
    ngOnInit(): void {
 }

}
