import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StepsNavComponent, Step} from '../execution-sql/widgets/steps-nav/steps-nav.component';
import {DomainesComponent} from './widgets/domaines/domaines.component';
import {ClesApiComponent} from './widgets/cles-api/cles-api.component';
import {ProxyComponent} from './widgets/proxy/proxy.component';

@Component({
    selector: 'app-via-api',
    imports: [CommonModule, StepsNavComponent, DomainesComponent, ClesApiComponent, ProxyComponent],
    templateUrl: './via-api.component.html',
    styleUrl: './via-api.component.scss',
})
export class ViaApiComponent {

    // Menu latéral
    steps: Step[] = [
        {id: 'domaines', label: 'Domaines', icon: 'fa-solid fa-globe'},
        {id: 'cles', label: 'Clés API', icon: 'fa-solid fa-key'},
        {id: 'proxy', label: 'Communication', icon: 'fa-solid fa-tower-broadcast'},
    ];
    activeStep = 'domaines';

    get activeLabel(): string {
        return this.steps.find(s => s.id === this.activeStep)?.label || '';
    }
}
