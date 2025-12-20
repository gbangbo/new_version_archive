import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { chooseAccount } from '../../../../../../../shared/data/form-widgets';

@Component({
  selector: 'app-choose-account',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './choose-account.component.html',
  styleUrl: './choose-account.component.scss'
})

export class ChooseAccountComponent {

  @Output() changeTab = new EventEmitter<number>();
  
  @Input() active: number;

  public chooseAccount = chooseAccount;

  public formValidation = new FormGroup({
    chooseAccount: new FormControl('', Validators.required),
  });

  next() {
    this.active = this.active + 1;
    this.changeTab.emit(this.active);
  }
  
}
