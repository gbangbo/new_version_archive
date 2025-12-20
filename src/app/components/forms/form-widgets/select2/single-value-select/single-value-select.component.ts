import { Component } from '@angular/core';
import { Select2Module } from 'ng-select2-component';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { selectTheme } from '../../../../../shared/data/form-control';
import { component, designation, selectDetails } from '../../../../../shared/data/form-widgets';

@Component({
  selector: 'app-single-value-select',
  imports: [Select2Module, CardComponent],
  templateUrl: './single-value-select.component.html',
  styleUrl: './single-value-select.component.scss'
})

export class SingleValueSelectComponent {

  public selectTheme = selectTheme;
  public designation = designation;
  public component = component;
  public selectDetails = selectDetails;

}
