import { Component } from '@angular/core';

import { SupportTicketListComponent } from "./support-ticket-list/support-ticket-list.component";
import { SupportTicketDataTableComponent } from "./support-ticket-data-table/support-ticket-data-table.component";
import { ticketListStatus } from '../../shared/data/support-ticket';

@Component({
  selector: 'app-support-ticket',
  imports: [SupportTicketListComponent, SupportTicketDataTableComponent],
  templateUrl: './support-ticket.component.html',
  styleUrl: './support-ticket.component.scss'
})

export class SupportTicketComponent {

    public ticketListStatus = ticketListStatus;

}
