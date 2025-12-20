import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { SvgIconComponent } from '../../../../../../../shared/components/ui/svg-icon/svg-icon.component';
import { TooltipComponent } from "../../../../../../../shared/components/ui/tooltip/tooltip.component";
import { Projects } from '../../../../../../../shared/interface/project';
import { ChatService } from '../../../../../../../shared/services/chat.service';

@Component({
  selector: 'app-project-details',
  imports: [CommonModule, SvgIconComponent, TooltipComponent],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss'
})

export class ProjectDetailsComponent {

  @Input() project: Projects;

  constructor(public chatService: ChatService) { }

}