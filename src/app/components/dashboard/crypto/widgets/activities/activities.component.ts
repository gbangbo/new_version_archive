import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { activities } from '../../../../../shared/data/dashboard/crypto';
import { cardToggleOptions7 } from '../../../../../shared/data/common';

@Component({
  selector: 'app-activities',
  imports: [RouterModule, CardComponent],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss'
})

export class ActivitiesComponent {

  public activities = activities;
  public cardToggleOption = cardToggleOptions7;

}
