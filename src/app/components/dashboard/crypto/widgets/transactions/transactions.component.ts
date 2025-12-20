import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { FeatherIconComponent } from '../../../../../shared/components/ui/feather-icon/feather-icon.component';
import { transactions, transactionTab } from '../../../../../shared/data/dashboard/crypto';
import { Transactions } from '../../../../../shared/interface/dashboard/crypto';

@Component({
  selector: 'app-transactions',
  imports: [CommonModule, CardComponent, FeatherIconComponent],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})

export class TransactionsComponent {

  public activeTab: string = 'all';
  public transactionTab = transactionTab;
  public transactions = transactions;
  public filteredTransaction: Transactions[];

  constructor() {
    this.filterTransaction(this.activeTab);
  }

  changeTab(value: string) {
    this.activeTab = value;

    this.filterTransaction(this.activeTab);
  }

  filterTransaction(value: string) {
   this.filteredTransaction = this.transactions.filter((transaction) => {
      if(value == 'all') {
        return true;
      } else if(transaction.type == value) {
        return transaction;
      }
    })

  }
  
}

