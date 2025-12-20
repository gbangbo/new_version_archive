import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { noticeBoard } from '../../../../../shared/data/dashboard/school-management';
import { cardToggleOptions3 } from '../../../../../shared/data/common';

@Component({
  selector: 'app-notice-board',
  imports: [CardComponent],
  templateUrl: './notice-board.component.html',
  styleUrl: './notice-board.component.scss'
})

export class NoticeBoardComponent {

  public noticeBoard = noticeBoard;
  public cardToggleOption = cardToggleOptions3;

}
