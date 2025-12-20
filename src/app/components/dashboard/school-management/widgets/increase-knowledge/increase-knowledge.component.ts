import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-increase-knowledge',
  imports: [RouterModule, CardComponent],
  templateUrl: './increase-knowledge.component.html',
  styleUrl: './increase-knowledge.component.scss'
})

export class IncreaseKnowledgeComponent {

}
