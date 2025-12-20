import { Component } from '@angular/core';

import { SidebarComponent } from "./widgets/sidebar/sidebar.component";
import { FilesComponent } from "./widgets/files/files.component";

@Component({
  selector: 'app-file-manager',
  imports: [SidebarComponent, FilesComponent],
  templateUrl: './file-manager.component.html',
  styleUrl: './file-manager.component.scss'
})

export class FileManagerComponent {

}
