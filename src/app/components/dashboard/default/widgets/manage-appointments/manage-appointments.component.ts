import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { manageAppointments } from '../../../../../shared/data/dashboard/default';
import { cardToggleOptions1 } from '../../../../../shared/data/common';

@Component({
  selector: 'app-manage-appointments',
  imports: [CardComponent],
  templateUrl: './manage-appointments.component.html',
  styleUrl: './manage-appointments.component.scss'
})

export class ManageAppointmentsComponent {

  public cardToggleOptions = cardToggleOptions1;
  public manageAppointments = manageAppointments;
  
}
