import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Output } from '@angular/core';

import { CompanyInfoComponent } from './widgets/company-info/company-info.component';
import { CompanyOverviewComponent } from './widgets/company-overview/company-overview.component';
import { FinancialInfoComponent } from './widgets/financial-info/financial-info.component';
import { FinishComponent } from './widgets/finish/finish.component';
import { PersonalInfoComponent } from './widgets/personal-info/personal-info.component';
import { addSeller } from '../../../../shared/data/seller';
import { OutsideDirective } from '../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-create-store-modal',
  imports: [CommonModule, OutsideDirective, PersonalInfoComponent, CompanyInfoComponent,
            CompanyOverviewComponent, FinancialInfoComponent, FinishComponent],
  templateUrl: './create-store-modal.component.html',
  styleUrl: './create-store-modal.component.scss'
})

export class CreateStoreModalComponent {
  
  @Output() modalOpen = new EventEmitter<boolean>();

  public addSeller = addSeller;
  public activeTab: number = 1;
  public closeResult: string;

  @HostListener('document:keydown.escape', ['$event'])
  handleEscKey() {
    this.closeModal();
  }

  closeModal() {
    this.modalOpen.emit(false);
  }

  handleStep(value: number) {
    if(value == -1) {
      this.activeTab = this.activeTab - 1;
    } else if(value == 1 && this.activeTab < this.addSeller.length) {
      this.activeTab = this.activeTab + 1;
    }
  }

}
