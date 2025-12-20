import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { FeatherIconComponent } from "../../../../../../../shared/components/ui/feather-icon/feather-icon.component";
import { netBanking } from '../../../../../../../shared/data/form-layout';

@Component({
  selector: 'app-net-banking',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FeatherIconComponent],
  templateUrl: './net-banking.component.html',
  styleUrl: './net-banking.component.scss'
})

export class NetBankingComponent {
  
  @Output() changeTab = new EventEmitter<number>();
  
  @Input() active: number;

  public netBanking = netBanking;
  public validate: boolean = false;
  public openMenu: boolean = false;
  public formValidation = new FormGroup({
    feedback: new FormControl('', Validators.required),
    agree: new FormControl('', Validators.required),
  });

  open() {
    this.openMenu = !this.openMenu
  }
  
  next() {
    this.validate = true;
    this.formValidation.markAllAsTouched();
    if (this.formValidation.valid) {
      this.active = this.active;
      this.changeTab.emit(this.active);
    }
  }

  previous() {
    this.active = this.active - 1;
    this.changeTab.emit(this.active);
  }

}
