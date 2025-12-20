import { Component } from '@angular/core';

import { DefaultTouchspinComponent } from "./default-touchspin/default-touchspin.component";
import { OutlineTouchspinComponent } from "./outline-touchspin/outline-touchspin.component";
import { IconWithPrefixPostfixComponent } from "./icon-with-prefix-postfix/icon-with-prefix-postfix.component";
import { ButtonWithPrefixPostfixComponent } from "./button-with-prefix-postfix/button-with-prefix-postfix.component";
import { RoundedTouchspinComponent } from "./rounded-touchspin/rounded-touchspin.component";

@Component({
  selector: 'app-touchspin',
  imports: [DefaultTouchspinComponent, OutlineTouchspinComponent, IconWithPrefixPostfixComponent,
            ButtonWithPrefixPostfixComponent, RoundedTouchspinComponent],
  templateUrl: './touchspin.component.html',
  styleUrl: './touchspin.component.scss'
})

export class TouchspinComponent {

}
