import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Select2Data, Select2Module } from 'ng-select2-component';

import { month } from '../../../../../../shared/data/jobs/apply-form';

@Component({
  selector: 'app-personal-details',
  imports: [CommonModule, Select2Module],
  templateUrl: './personal-details.component.html',
  styleUrl: './personal-details.component.scss'
})

export class PersonalDetailsComponent {

  public month: Select2Data = month;
  public date: Select2Data = new Array();
  public year: Select2Data = new Array();

  constructor() {
    for (let i = 1; i <= 31; i++) {
      this.date.push({ value: i, label: i.toString() })
    }

    for (let i = 1985; i <= 2025; i++) {
      this.year.push({ value: i, label: i.toString() })
    }
  }

}
