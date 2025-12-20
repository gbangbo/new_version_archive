import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DropzoneConfigInterface, DropzoneModule } from 'ngx-dropzone-wrapper';

import { SvgIconComponent } from "../../../../../shared/components/ui/svg-icon/svg-icon.component";

@Component({
  selector: 'app-product-gallery',
  imports: [DropzoneModule, SvgIconComponent],
  templateUrl: './product-gallery.component.html',
  styleUrl: './product-gallery.component.scss'
})

export class ProductGalleryComponent {

  @Output() changeTab = new EventEmitter<number>();
  
  @Input() active: number;
  
  public text =' <i class="fa-solid fa-cloud-arrow-up fa-fade"></i><h6>Drop files here or click to upload.</h6><span class="note needsclick">SVG,PNG,JPG <strong>or</strong> GIF</span>';

  public config: DropzoneConfigInterface = {
    url: 'https://httpbin.org/post',
    maxFilesize: 50,
    acceptedFiles: 'image/*',
    addRemoveLinks: true
  };

  next() {
    this.active = this.active + 1;
    this.changeTab.emit(this.active);
  }

  previous() {
    this.active = this.active - 1;
    this.changeTab.emit(this.active);
  }

}
