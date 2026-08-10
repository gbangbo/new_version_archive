import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {StepsNavComponent, Step} from './widgets/steps-nav/steps-nav.component';
import {ConnexionsComponent} from './widgets/connexions/connexions.component';
import {RequetesComponent} from './widgets/requetes/requetes.component';
import {ExecutionComponent} from './widgets/execution/execution.component';

@Component({
    selector: 'app-execution-sql',
    imports: [CommonModule, FormsModule, StepsNavComponent, ConnexionsComponent, RequetesComponent, ExecutionComponent],
    templateUrl: './execution-sql.component.html',
    styleUrl: './execution-sql.component.scss',
})
export class ExecutionSqlComponent {

    // Menu latéral
    steps: Step[] = [
        {id: 'connexions', label: 'Connexions', icon: 'fa-solid fa-database'},
        {id: 'requetes', label: 'Requêtes', icon: 'fa-solid fa-terminal'},
        {id: 'execution', label: 'Exécution', icon: 'fa-solid fa-play'},
    ];
    activeStep = 'connexions';

    // Onglet Transactions
    transaction: 'especes' | 'credit' | 'mobile' = 'especes';

    get activeLabel(): string {
        return this.steps.find(s => s.id === this.activeStep)?.label || '';
    }
}
