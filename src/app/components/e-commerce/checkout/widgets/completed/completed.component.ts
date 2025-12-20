import { Component, Input } from '@angular/core';

import { SvgIconComponent } from "../../../../../shared/components/ui/svg-icon/svg-icon.component";

@Component({
  selector: 'app-completed',
  imports: [SvgIconComponent],
  templateUrl: './completed.component.html',
  styleUrl: './completed.component.scss'
})

export class CompletedComponent {

  @Input() type: string = 'simple';

}
