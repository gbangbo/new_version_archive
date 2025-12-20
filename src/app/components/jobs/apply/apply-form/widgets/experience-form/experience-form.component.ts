import { Component } from '@angular/core';
import { Select2Data, Select2Module } from 'ng-select2-component';

import { experience } from '../../../../../../shared/data/jobs/apply-form';

@Component({
  selector: 'app-experience-form',
  imports: [Select2Module],
  templateUrl: './experience-form.component.html',
  styleUrl: './experience-form.component.scss'
})

export class ExperienceFormComponent {

  public experience: Select2Data = experience;

}
