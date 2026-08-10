import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';

@Component({
    selector: 'app-confidentialite',
    imports: [CommonModule],
    templateUrl: './confidentialite.component.html',
    styleUrl: './confidentialite.component.scss'
})
export class ConfidentialiteComponent {
    public majDate: string = '2 août 2026';
}
