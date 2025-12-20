import { Component, Input } from '@angular/core';

import { CounterComponent } from "../../../shared/components/ui/counter/counter.component";
import { TicketListStatus } from '../../../shared/interface/support-ticket';

@Component({
  selector: 'app-support-ticket-list',
  imports: [CounterComponent],
  templateUrl: './support-ticket-list.component.html',
  styleUrl: './support-ticket-list.component.scss'
})

export class SupportTicketListComponent {

  @Input() item: TicketListStatus;

}
