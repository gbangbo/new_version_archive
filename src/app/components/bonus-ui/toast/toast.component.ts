import { Component } from '@angular/core';

import { MessageToastComponent } from "./widgets/message-toast/message-toast.component";
import { LiveToastComponent } from "./widgets/live-toast/live-toast.component";
import { ColorSchemeToastComponent } from "./widgets/color-scheme-toast/color-scheme-toast.component";
import { StackingToastComponent } from "./widgets/stacking-toast/stacking-toast.component";
import { TranslucentToastComponent } from "./widgets/translucent-toast/translucent-toast.component";
import { DefaultToastComponent } from "./widgets/default-toast/default-toast.component";
import { UniqueToastComponent } from "./widgets/unique-toast/unique-toast.component";
import { ToastPlacementComponent } from "./widgets/toast-placement/toast-placement.component";

@Component({
  selector: 'app-toast',
  imports: [MessageToastComponent, LiveToastComponent, ColorSchemeToastComponent,
            StackingToastComponent, TranslucentToastComponent, DefaultToastComponent, 
            UniqueToastComponent, ToastPlacementComponent],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})

export class ToastComponent {

}
