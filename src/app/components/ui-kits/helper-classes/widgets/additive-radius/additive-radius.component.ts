import { Component } from '@angular/core';

import { additiveRadius } from '../../../../../shared/data/ui-kits/helper-classes';

@Component({
  selector: 'app-additive-radius',
  imports: [],
  templateUrl: './additive-radius.component.html',
  styleUrl: './additive-radius.component.scss'
})
export class AdditiveRadiusComponent {

  public additiveRadius = additiveRadius;

}
