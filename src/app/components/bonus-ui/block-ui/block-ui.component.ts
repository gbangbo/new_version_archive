import { Component } from '@angular/core';

import { BlockLoadingComponent } from "./widgets/block-loading/block-loading.component";
import { CardLoadingComponent } from "./widgets/card-loading/card-loading.component";
import { FormLoadingComponent } from "./widgets/form-loading/form-loading.component";

@Component({
  selector: 'app-block-ui',
  imports: [BlockLoadingComponent, CardLoadingComponent, FormLoadingComponent],
  templateUrl: './block-ui.component.html',
  styleUrl: './block-ui.component.scss'
})

export class BlockUiComponent {

}
