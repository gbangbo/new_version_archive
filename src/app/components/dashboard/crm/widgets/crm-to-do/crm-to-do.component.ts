import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardDropdownButtonComponent } from '../../../../../shared/components/ui/card/card-dropdown-button/card-dropdown-button.component';
import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { crmTodo } from '../../../../../shared/data/dashboard/crm';
import { todoListColors } from '../../../../../shared/data/project';
import { cardToggleOptions3 } from '../../../../../shared/data/common';

@Component({
  selector: 'app-crm-to-do',
  imports: [RouterModule, CardComponent, CardDropdownButtonComponent],
  templateUrl: './crm-to-do.component.html',
  styleUrl: './crm-to-do.component.scss'
})

export class CrmToDoComponent {

  public crmTodo = crmTodo;
  public cardToggleOption = cardToggleOptions3;
  public colors = todoListColors;
  
  getColor(index: number) {
    return this.colors[index % this.colors.length];
  }

}
