import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { usersChart } from '../../../../../shared/data/widgets/chart';

@Component({
  selector: 'app-users',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})

export class UsersComponent {

  public usersChart = usersChart;

}
