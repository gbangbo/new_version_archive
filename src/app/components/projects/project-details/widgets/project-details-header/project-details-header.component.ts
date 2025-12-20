import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SvgIconComponent } from "../../../../../shared/components/ui/svg-icon/svg-icon.component";
import { projectDetailsHeader } from '../../../../../shared/data/project';
import { ChatService } from '../../../../../shared/services/chat.service';

@Component({
  selector: 'app-project-details-header',
  imports: [RouterModule, SvgIconComponent],
  templateUrl: './project-details-header.component.html',
  styleUrl: './project-details-header.component.scss'
})

export class ProjectDetailsHeaderComponent {

  public projectDetailsHeader = projectDetailsHeader;

  constructor(public chatService: ChatService) {}
  
}
