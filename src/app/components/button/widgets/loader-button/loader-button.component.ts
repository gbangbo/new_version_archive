import { Component } from '@angular/core';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { loaderButton } from '../../../../shared/data/buttons';

@Component({
  selector: 'app-loader-button',
  imports: [CardComponent],
  templateUrl: './loader-button.component.html',
  styleUrl: './loader-button.component.scss'
})

export class LoaderButtonComponent {

  public loaderButton = loaderButton;

}
