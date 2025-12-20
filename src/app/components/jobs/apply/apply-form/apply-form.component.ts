import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarRatingModule } from 'ngx-bar-rating';

import { PersonalDetailsComponent } from "./widgets/personal-details/personal-details.component";
import { EducationFormComponent } from "./widgets/education-form/education-form.component";
import { ExperienceFormComponent } from "./widgets/experience-form/experience-form.component";
import { UploadFilesComponent } from "./widgets/upload-files/upload-files.component";

@Component({
  selector: 'app-apply-form',
  imports: [CommonModule, BarRatingModule, PersonalDetailsComponent,
            EducationFormComponent, ExperienceFormComponent, UploadFilesComponent, ],
  templateUrl: './apply-form.component.html',
  styleUrl: './apply-form.component.scss'
})

export class ApplyFormComponent {

}
