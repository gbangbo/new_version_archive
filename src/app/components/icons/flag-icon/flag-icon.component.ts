import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { CardComponent } from "../../../shared/components/ui/card/card.component";
import { flagIcon } from '../../../shared/data/icons/flag-icon';

@Component({
  selector: 'app-flag-icon',
  imports: [CommonModule, CardComponent],
  templateUrl: './flag-icon.component.html',
  styleUrl: './flag-icon.component.scss'
})

export class FlagIconComponent {

  public flagIcon = flagIcon;
  public details: boolean = false;
  public flag: string;
  public val: string;

  constructor(private toast: ToastrService){}

  getDetails(value: string){
    this.details = true;
    this.flag = value;
    this.val = '<i class="flag-icon flag-icon-' + value + '"></i>';
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
