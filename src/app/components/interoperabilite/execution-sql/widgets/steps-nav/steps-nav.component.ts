import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';

export interface Step {
    id: string;
    label: string;
    icon: string; // classe FontAwesome, ex. 'fa-solid fa-tag'
}

@Component({
    selector: 'app-steps-nav',
    imports: [CommonModule],
    templateUrl: './steps-nav.component.html',
    styleUrl: './steps-nav.component.scss',
})
export class StepsNavComponent {
    @Input() steps: Step[] = [];
    @Input() activeId = '';
    @Output() activeIdChange = new EventEmitter<string>();

    pick(id: string): void {
        this.activeId = id;
        this.activeIdChange.emit(id);
    }
}
