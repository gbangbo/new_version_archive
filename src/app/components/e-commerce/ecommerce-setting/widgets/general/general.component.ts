import { Component } from '@angular/core';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { Select2Module } from 'ng-select2-component';

import { currency } from '../../../../../shared/data/currency';
import { timezones } from '../../../../../shared/data/timezone';

@Component({
  selector: 'app-general',
  imports: [AngularEditorModule, Select2Module],
  templateUrl: './general.component.html',
  styleUrl: './general.component.scss'
})

export class GeneralComponent {

  public currency = currency;
  public timezones = timezones;

}
