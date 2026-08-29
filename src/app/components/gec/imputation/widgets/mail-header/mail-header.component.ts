import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SvgIconComponent } from "../../../../../shared/components/ui/svg-icon/svg-icon.component";
import { FeatherIconComponent } from "../../../../../shared/components/ui/feather-icon/feather-icon.component";
import { emailTypes } from '../../../../../shared/data/email';
import { OutsideDirective } from '../../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-mail-header',
  imports: [FormsModule, OutsideDirective, SvgIconComponent, FeatherIconComponent],
  templateUrl: './mail-header.component.html',
  styleUrl: './mail-header.component.scss'
})

export class MailHeaderComponent {

  @Output() emailType = new EventEmitter<string>();
  /** Terme de recherche, appliqué au dossier consulté. */
  @Output() rechercheChange = new EventEmitter<string>();
  @Output() rafraichir = new EventEmitter<void>();

  /** Pagination du dossier consulté (« 1–50 sur 1478 »). */
  @Input() debut: number = 0;
  @Input() fin: number = 0;
  @Input() total: number = 0;
  @Output() pagePrecedente = new EventEmitter<void>();
  @Output() pageSuivante = new EventEmitter<void>();

  public emailTypes = emailTypes;
  public activeType: string = 'important';
  public dropdownOpen: boolean = false;
  public recherche: string = '';

  handleRecherche(valeur: string) {
    this.recherche = valeur;
    this.rechercheChange.emit(valeur);
  }

  viderRecherche() {
    this.handleRecherche('');
  }

  ngOnInit() {
    this.emailType.emit(this.activeType);
  }

  handleType(value: string) {
    this.activeType = value;
    this.emailType.emit(this.activeType);
  }
  
  toggleDropdown() {
    this.dropdownOpen =! this.dropdownOpen;
  }

  clickOutside(): void {
    this.dropdownOpen = false;
  }

}
