import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';

@Component({
    selector: 'app-expire',
    imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
    templateUrl: './expire.component.html',
    styleUrl: './expire.component.scss',
})

export class ExpireComponent {

    public show: boolean = false;
    public loginForm: FormGroup;
    public validate: boolean = false;
    loading: boolean = false;
    errorTexte: string = "";

    constructor(private router: Router) {
        localStorage.clear();
        sessionStorage.clear();
    }

    cnx() {
        this.router.navigate(['/auth/login'])
    }
}
