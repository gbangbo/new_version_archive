import { Component } from '@angular/core';
import { Select2Data, Select2Module } from 'ng-select2-component';

import { degree } from '../../../../../../shared/data/jobs/apply-form';

@Component({
  selector: 'app-education-form',
  imports: [Select2Module],
  templateUrl: './education-form.component.html',
  styleUrl: './education-form.component.scss'
})

export class EducationFormComponent {

  public degree: Select2Data = degree;

}
