import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StepsNavComponent, Step} from '../execution-sql/widgets/steps-nav/steps-nav.component';
import {DomainesComponent} from './widgets/domaines/domaines.component';
import {ClesApiComponent} from './widgets/cles-api/cles-api.component';
import {ProxyComponent} from './widgets/proxy/proxy.component';
import {PlateformesComponent} from './widgets/plateformes/plateformes.component';
import {RequetesExternesComponent} from './widgets/requetes-externes/requetes-externes.component';
import {ExecutionExterneComponent} from './widgets/execution-externe/execution-externe.component';

/** Une famille d'appels sortants, avec son propre menu d'étapes. */
interface Groupe {
    id: string;
    label: string;
    icon: string;
    steps: Step[];
}

@Component({
    selector: 'app-via-api',
    imports: [CommonModule, StepsNavComponent, DomainesComponent, ClesApiComponent,
        ProxyComponent, PlateformesComponent, RequetesExternesComponent,
        ExecutionExterneComponent],
    templateUrl: './via-api.component.html',
    styleUrl: './via-api.component.scss',
})
export class ViaApiComponent {

    /**
     * DEUX FAMILLES D'APPELS SORTANTS, chacune avec ses étapes.
     *
     * Ce qui les sépare n'est pas la forme de l'appel mais CE QUI PROUVE NOTRE
     * IDENTITÉ chez le partenaire : notre propre clé API d'un côté, un jeton
     * qu'il nous délivre de l'autre. Mêlées dans un seul menu, elles passaient
     * pour des variantes d'une même chose.
     */
    groupes: Groupe[] = [
        {
            id: 'cle',
            label: 'Avec clé API',
            icon: 'fa-solid fa-key',
            steps: [
                {id: 'domaines', label: 'Domaines', icon: 'fa-solid fa-globe'},
                {id: 'cles', label: 'Clés API', icon: 'fa-solid fa-key'},
                {id: 'proxy', label: 'Communication', icon: 'fa-solid fa-tower-broadcast'},
            ],
        },
        {
            id: 'auth',
            label: 'Avec authentification',
            icon: 'fa-solid fa-shield-halved',
            steps: [
                {id: 'plateformes', label: 'Plateformes', icon: 'fa-solid fa-shield-halved'},
                {id: 'requetes', label: 'Requêtes', icon: 'fa-solid fa-bookmark'},
                {id: 'execution', label: 'Exécution', icon: 'fa-solid fa-play'},
            ],
        },
    ];

    groupeActif = 'cle';
    activeStep = 'domaines';

    get groupe(): Groupe {
        return this.groupes.find(g => g.id === this.groupeActif) || this.groupes[0];
    }

    /**
     * Référence STABLE : `app-steps-nav` reçoit ce tableau en entrée, un getter
     * qui en reconstruirait un à chaque cycle relancerait le composant sans fin.
     */
    get steps(): Step[] {
        return this.groupe.steps;
    }

    get activeLabel(): string {
        return this.steps.find(s => s.id === this.activeStep)?.label || '';
    }

    /** Changer de famille ramène sur sa première étape. */
    choisirGroupe(id: string): void {
        if (this.groupeActif === id) return;
        this.groupeActif = id;
        this.activeStep = this.steps[0]?.id || '';
    }
}
