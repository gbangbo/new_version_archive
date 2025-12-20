import { Component } from '@angular/core';

import { AjaxRequestSweetalertComponent } from "./widgets/ajax-request-sweetalert/ajax-request-sweetalert.component";
import { AnimatedSweetalertComponent } from "./widgets/animated-sweetalert/animated-sweetalert.component";
import { BasicSweetalertComponent } from "./widgets/basic-sweetalert/basic-sweetalert.component";
import { ConfirmationApprovalSweetalertComponent } from "./widgets/confirmation-approval-sweetalert/confirmation-approval-sweetalert.component";
import { ConfirmationSweetalertComponent } from "./widgets/confirmation-sweetalert/confirmation-sweetalert.component";
import { ConfirmationTriggerSweetalertComponent } from "./widgets/confirmation-trigger-sweetalert/confirmation-trigger-sweetalert.component";
import { CustomPositionedSweetalertComponent } from "./widgets/custom-positioned-sweetalert/custom-positioned-sweetalert.component";
import { DateSweetalertComponent } from "./widgets/date-sweetalert/date-sweetalert.component";
import { DismissSweetalertComponent } from "./widgets/dismiss-sweetalert/dismiss-sweetalert.component";
import { FormSweetalertComponent } from "./widgets/form-sweetalert/form-sweetalert.component";
import { ImageMessageSweetalertComponent } from "./widgets/image-message-sweetalert/image-message-sweetalert.component";
import { PasswordGeneratorSweetalertComponent } from "./widgets/password-generator-sweetalert/password-generator-sweetalert.component";
import { PositionSweetAlertComponent } from "./widgets/position-sweet-alert/position-sweet-alert.component";
import { RichHtmlSweetalertComponent } from "./widgets/rich-html-sweetalert/rich-html-sweetalert.component";
import { RtlSupportSweetalertComponent } from "./widgets/rtl-support-sweetalert/rtl-support-sweetalert.component";
import { TimerSweetalertComponent } from './widgets/timer-sweetalert/timer-sweetalert.component';
import { TitleTextSweetalertComponent } from "./widgets/title-text-sweetalert/title-text-sweetalert.component";

@Component({
  selector: 'app-sweetalert2',
  imports: [PositionSweetAlertComponent, BasicSweetalertComponent, TitleTextSweetalertComponent,
            DismissSweetalertComponent, RichHtmlSweetalertComponent, ConfirmationSweetalertComponent,
            AnimatedSweetalertComponent, ConfirmationTriggerSweetalertComponent, ImageMessageSweetalertComponent,
            TimerSweetalertComponent, AjaxRequestSweetalertComponent, ConfirmationApprovalSweetalertComponent,
            RtlSupportSweetalertComponent, PasswordGeneratorSweetalertComponent, DateSweetalertComponent,
            FormSweetalertComponent, CustomPositionedSweetalertComponent],
  templateUrl: './sweetalert2.component.html',
  styleUrl: './sweetalert2.component.scss'
})

export class Sweetalert2Component {

}
