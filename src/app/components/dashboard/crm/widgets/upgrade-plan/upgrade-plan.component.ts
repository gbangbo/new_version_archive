import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';

@Component({
  selector: 'app-upgrade-plan',
  imports: [RouterModule, CardComponent],
  templateUrl: './upgrade-plan.component.html',
  styleUrl: './upgrade-plan.component.scss'
})

export class UpgradePlanComponent {

}
