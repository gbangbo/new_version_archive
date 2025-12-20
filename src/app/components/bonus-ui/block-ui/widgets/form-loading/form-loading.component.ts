import { Component } from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';

@Component({
  selector: 'app-form-loading',
  imports: [NgxSpinnerModule, CardComponent],
  templateUrl: './form-loading.component.html',
  styleUrl: './form-loading.component.scss',
})

export class FormLoadingComponent {

  public type: string;
  public loadingShow: boolean = false;

  constructor(private spinner: NgxSpinnerService) {}

  loading(type: string) {
    this.loadingShow = true;
    this.type = type;
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
      this.loadingShow = false;
    }, 3000);
  }
  
}
