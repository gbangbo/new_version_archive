import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { SvgIconComponent } from "../../../../../shared/components/ui/svg-icon/svg-icon.component";

@Component({
  selector: 'app-add-product-details',
  imports: [CommonModule, AngularEditorModule, SvgIconComponent],
  templateUrl: './add-product-details.component.html',
  styleUrl: './add-product-details.component.scss'
})

export class AddProductDetailsComponent {

  @Input() active: number;
  @Output() changeTab = new EventEmitter<number>();

  ngOnInit() {
    this.active
  }

  next() {
    this.active = this.active + 1;
    this.changeTab.emit(this.active);
  }

}
