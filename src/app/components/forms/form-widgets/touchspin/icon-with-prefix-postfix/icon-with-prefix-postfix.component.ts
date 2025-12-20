import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-icon-with-prefix-postfix',
  imports: [CardComponent],
  templateUrl: './icon-with-prefix-postfix.component.html',
  styleUrl: './icon-with-prefix-postfix.component.scss'
})
export class IconWithPrefixPostfixComponent {

  public counter: number[] = [0, 0];

   increment(i: number) {
    if (i == 0 || i == 1) {
      this.counter[i] += 1;
    }
  }

   decrement(i: number) {
    if (i == 0 || i == 1) {
      if (this.counter[i] > 0) {
        this.counter[i] -= 1;
      }
    }
  }

}
