import { Component } from '@angular/core';
import { Select2Data, Select2Module } from 'ng-select2-component';
import { DropzoneConfigInterface, DropzoneModule } from 'ngx-dropzone-wrapper';
import { Editor, NgxEditorModule } from 'ngx-editor';

import { CardComponent } from "../../../shared/components/ui/card/card.component";
import { addBlogCategory, blogType } from '../../../shared/data/blog';

@Component({
  selector: 'app-add-blog',
  imports: [Select2Module, DropzoneModule, NgxEditorModule, CardComponent],
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.scss'
})

export class AddBlogComponent {

  public addBlogCategory: Select2Data = addBlogCategory;
  public blogType = blogType;
  public text = ' <div class="dz-message needsclick"><i class="fa-solid fa-cloud-arrow-up fa-fade"></i><h6>Drop files here or click to upload.</h6><span class="note needsclick">(This is just a demo dropzone. Selected files are <strong>not</strong> actually uploaded.)</span></div>';

  public config: DropzoneConfigInterface = {
    url: 'https://httpbin.org/post',
    addRemoveLinks: true
  };

  public editor: Editor;
  public editor2: Editor;

  ngOnInit(): void {
    this.editor = new Editor();
    this.editor2 = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
    this.editor2.destroy();
  }

}
