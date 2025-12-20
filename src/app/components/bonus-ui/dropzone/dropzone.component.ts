import { Component } from '@angular/core';

import { SingleFileUploadComponent } from "./widgets/single-file-upload/single-file-upload.component";
import { MultipleFileUploadComponent } from "./widgets/multiple-file-upload/multiple-file-upload.component";

@Component({
  selector: 'app-dropzone',
  imports: [SingleFileUploadComponent, MultipleFileUploadComponent],
  templateUrl: './dropzone.component.html',
  styleUrl: './dropzone.component.scss'
})

export class DropzoneComponent {

}
