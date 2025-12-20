import { Component } from '@angular/core';
import { DropzoneConfigInterface, DropzoneModule } from 'ngx-dropzone-wrapper';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-multiple-file-upload',
  imports: [DropzoneModule, CardComponent],
  templateUrl: './multiple-file-upload.component.html',
  styleUrl: './multiple-file-upload.component.scss'
})

export class MultipleFileUploadComponent {

  public text = '<h6>Drop files here or click to upload.</h6><span class="note needsclick">(This is just a demo dropzone. Selected files are <strong>not</strong> actually uploaded.)</span>'

  public config: DropzoneConfigInterface = {
    url: 'https://httpbin.org/post',
    addRemoveLinks: true
  };

}
