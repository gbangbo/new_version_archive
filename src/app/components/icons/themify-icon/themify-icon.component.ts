import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { CardComponent } from "../../../shared/components/ui/card/card.component";
import { themifyIcon } from '../../../shared/data/icons/themify';

@Component({
  selector: 'app-themify-icon',
  imports: [CardComponent],
  templateUrl: './themify-icon.component.html',
  styleUrl: './themify-icon.component.scss'
})

export class ThemifyIconComponent {

  public themifyIcon = themifyIcon;
  public details: boolean = false;
  public icon: string;
  public val: string;

  constructor(private toast: ToastrService){}

  getDetails(value: string){
    this.details = true;
    this.icon = value;
    this.val = '<i class="icofont icofont-' + value + '"></i>';
  }

  copyText(val: string){
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    this.toast.show("Code Copied to clipboard!", "",
    {
      positionClass: 'toast-bottom-right',
      closeButton: true,
      toastClass: "alert alert-copy notify-alert",
      timeOut: 1000
    })
  }
  
}
