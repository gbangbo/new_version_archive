import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { topCustomers } from '../../../../../shared/data/dashboard/e-commerce';

@Component({
  selector: 'app-top-customers',
  imports: [RouterModule, CardComponent],
  templateUrl: './top-customers.component.html',
  styleUrl: './top-customers.component.scss'
})

export class TopCustomersComponent {

  public topCustomers = topCustomers;

}
