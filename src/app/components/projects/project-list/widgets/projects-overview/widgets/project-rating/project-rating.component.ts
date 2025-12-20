import { Component } from '@angular/core';

import { FeatherIconComponent } from "../../../../../../../shared/components/ui/feather-icon/feather-icon.component";
import { projectRating } from '../../../../../../../shared/data/project';

@Component({
  selector: 'app-project-rating',
  imports: [FeatherIconComponent],
  templateUrl: './project-rating.component.html',
  styleUrl: './project-rating.component.scss'
})

export class ProjectRatingComponent {

  public projectRating = projectRating;

}
