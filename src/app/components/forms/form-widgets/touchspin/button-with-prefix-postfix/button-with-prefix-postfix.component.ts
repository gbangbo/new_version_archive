import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-button-with-prefix-postfix',
  imports: [CardComponent],
  templateUrl: './button-with-prefix-postfix.component.html',
  styleUrl: './button-with-prefix-postfix.component.scss'
})

export class ButtonWithPrefixPostfixComponent {

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
