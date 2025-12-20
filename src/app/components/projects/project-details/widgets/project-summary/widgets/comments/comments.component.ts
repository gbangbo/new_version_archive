import { Component } from '@angular/core';

import { CardComponent } from '../../../../../../../shared/components/ui/card/card.component';
import { SvgIconComponent } from "../../../../../../../shared/components/ui/svg-icon/svg-icon.component";
import { projectDetails } from '../../../../../../../shared/data/project';

@Component({
  selector: 'app-comments',
  imports: [CardComponent, SvgIconComponent],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})

export class CommentsComponent {

  public comments = projectDetails.project_summary.comments;

}
