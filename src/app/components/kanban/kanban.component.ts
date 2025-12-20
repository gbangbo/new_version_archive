import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DefaultDemoComponent } from "./default-demo/default-demo.component";

@Component({
  selector: 'app-kanban',
  imports: [FormsModule, ReactiveFormsModule, DefaultDemoComponent],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss'
})

export class KanbanComponent {

}
