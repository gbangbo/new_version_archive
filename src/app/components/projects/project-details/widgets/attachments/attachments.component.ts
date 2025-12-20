import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { SvgIconComponent } from "../../../../../shared/components/ui/svg-icon/svg-icon.component";
import { projectDetails } from '../../../../../shared/data/project';

@Component({
  selector: 'app-attachments',
  imports: [RouterModule, CommonModule, CardComponent, SvgIconComponent],
  templateUrl: './attachments.component.html',
  styleUrl: './attachments.component.scss'
})

export class AttachmentsComponent {

  public attachmentType = projectDetails.attachment.attachment_types;
  public attachments = projectDetails.attachment.attachments;

}
