import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { SvgIconComponent } from '../../../../../../shared/components/ui/svg-icon/svg-icon.component';

@Component({
  selector: 'app-seo-tags',
  imports: [AngularEditorModule, SvgIconComponent],
  templateUrl: './seo-tags.component.html',
  styleUrl: './seo-tags.component.scss'
})

export class SeoTagsComponent {

  @Output() changeTabDetails = new EventEmitter<number>();
  
  @Input() additionalActiveId: number

  next() {
    this.additionalActiveId = this.additionalActiveId + 1;
    this.changeTabDetails.emit(this.additionalActiveId);
  }

  previous() {
    this.additionalActiveId = this.additionalActiveId - 1;
    this.changeTabDetails.emit(this.additionalActiveId);
  }

}
