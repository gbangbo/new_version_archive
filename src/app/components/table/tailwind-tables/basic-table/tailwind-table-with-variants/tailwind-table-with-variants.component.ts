import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { student } from '../../../../../shared/data/tailwind-table';

@Component({
  selector: 'app-tailwind-table-with-variants',
  imports: [CardComponent],
  templateUrl: './tailwind-table-with-variants.component.html',
  styleUrl: './tailwind-table-with-variants.component.scss'
})

export class TailwindTableWithVariantsComponent {

  public student = student;

}
