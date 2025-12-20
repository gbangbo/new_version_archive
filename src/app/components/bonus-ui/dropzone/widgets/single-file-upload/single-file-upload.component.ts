import { Component } from '@angular/core';
import { DropzoneConfigInterface, DropzoneModule } from 'ngx-dropzone-wrapper';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-single-file-upload',
  imports: [DropzoneModule, CardComponent],
  templateUrl: './single-file-upload.component.html',
  styleUrl: './single-file-upload.component.scss'
})

export class SingleFileUploadComponent {

  public text = '<h6>Drop files here or click to upload.</h6><span class="note needsclick">(This is just a demo dropzone. Selected files are <strong>not</strong> actually uploaded.)</span>'
 
  public config: DropzoneConfigInterface = {
    url: 'https://httpbin.org/post',
    maxFiles: 1,
    uploadMultiple: false,
    addRemoveLinks: true
  };

}
