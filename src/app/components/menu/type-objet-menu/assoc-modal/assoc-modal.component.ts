import {Component, EventEmitter, HostListener, Input, Output, SimpleChanges} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {environment} from "../../../../../environments/environment";
import {Authorization} from "../../../../protect/authorization.service";
import {HttpService} from "../../../../core/http.service";
import Swal from "sweetalert2";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzTreeSelectModule} from "ng-zorro-antd/tree-select";
import {SvgIconComponent} from "../../../../shared/components/ui/svg-icon/svg-icon.component";

/** Valeurs attendues par `auth/:type-objets-menus` pour le champ `action`. */
export enum TypeObjetMenuAction {
    Creer = 1,
    Modifier = 2,
    Supprimer = 3,
    ActiverDesactiver = 4,
    BulkUpdate = 5,
}

@Component({
    selector: 'app-assoc-modal',
    imports: [CommonModule, FormsModule, NzSelectModule, NzSwitchModule, NzTreeSelectModule, SvgIconComponent],
    templateUrl: './assoc-modal.component.html',
    styleUrl: './assoc-modal.component.scss',
})
export class AssocModalComponent {
    @Output() modalOpen = new EventEmitter<boolean>();
    @Input() dataLigne: any;
    @Input() menuNodes: any[] = [];      // arbre des menus (NzTreeNodeOptions)
    @Input() menuExpandedKeys: string[] = [];
    @Input() typesObjets: any[] = [];    // { uid, lib_type_objet, code_type_objet }

    /** Création : plusieurs menus × plusieurs actions (mode A de l'API). */
    uidmenus: string[] = [];
    datatypobjets: string[] = [];
    visible: boolean = true;

    /** Modification : un seul couple. */
    uidtypeobjetmenu: string = '';
    uidmenu: string = '';
    uidtypeobjet: string = '';

    errorTexte: string = '';
    isloading: boolean = false;
    users: any = [];

    /** Le panneau de l'arbre ne doit pas descendre au-delà de l'écran. */
    dropdownStyle = {'max-height': '300px', 'overflow-y': 'auto'};

    @HostListener('document:keydown.escape', ['$event'])
    handleEscKey() {
        this.closeModal();
    }

    constructor(private autor: Authorization, private httService: HttpService) {
        this.users = this.autor.getInfosUsers();
    }

    get isEdition(): boolean {
        return !!this.uidtypeobjetmenu;
    }

    /** Nombre d'associations qui seront créées (produit cartésien). */
    get nbCouples(): number {
        return this.uidmenus.length * this.datatypobjets.length;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['dataLigne'] && changes['dataLigne']?.currentValue) {
            const ligne = changes['dataLigne'].currentValue;
            this.uidtypeobjetmenu = ligne?.uid || '';
            this.uidmenu = ligne?.uidmenu || '';
            // ouverture depuis le bouton « + » d'un menu de l'arborescence :
            // pas d'association existante, mais le menu est déjà choisi
            this.uidmenus = !ligne?.uid && ligne?.uidmenu ? [ligne.uidmenu] : [];
            this.uidtypeobjet = ligne?.uidtypeobjet || '';
            this.visible = ligne?.visible ?? true;
        }
    }

    submitForm() {
        this.errorTexte = '';

        // l'action dépend du contexte : modification d'un couple existant ou création en masse
        let payload: any;
        if (this.isEdition) {
            if (!this.uidmenu || !this.uidtypeobjet) {
                this.errorTexte = "Veuillez choisir un menu et une action.";
                return;
            }
            payload = {
                action: TypeObjetMenuAction.Modifier,
                idsociete: this.users?.datasociete?.uid || this.users?.uidsociete || '',
                uidtypeobjetmenu: this.uidtypeobjetmenu,
                uidmenu: this.uidmenu,
                uidtypeobjet: this.uidtypeobjet,
            };
        } else {
            if (!this.uidmenus.length || !this.datatypobjets.length) {
                this.errorTexte = "Veuillez choisir au moins un menu et au moins une action.";
                return;
            }
            payload = {
                action: TypeObjetMenuAction.Creer,
                idsociete: this.users?.datasociete?.uid || this.users?.uidsociete || '',
                uidmenus: this.uidmenus,              // mode A : produit cartésien
                datatypobjets: this.datatypobjets,
                visible: this.visible,
            };
        }

        this.isloading = true;
        console.log("payload ===", payload)
        this.httService.postData(`${environment.api_url}auth/:type-objets-menus`, payload, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res.body.status || res.body.success) {
                    this.closeModal(true);
                    Swal.fire({
                        title: res?.body?.message,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                } else {
                    this.errorTexte = res?.body?.message || "Une erreur est survenue !";
                }
            })
            .catch((err) => {
                this.isloading = false;
                this.errorTexte = err?.error?.err?.message || "Une erreur est survenue !";
            });
    }

    closeModal(e?: boolean) {
        this.modalOpen.emit(e || false);
    }
}
