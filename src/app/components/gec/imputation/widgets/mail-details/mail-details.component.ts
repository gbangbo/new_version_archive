import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter,
  HostListener, Input, OnChanges, OnDestroy, Output, Renderer2, SimpleChanges, ViewChild,
} from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { OPTIONS_POPUP, echapper } from '../../imputation-popup';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';

import { FeatherIconComponent } from '../../../../../shared/components/ui/feather-icon/feather-icon.component';
import { SvgIconComponent } from "../../../../../shared/components/ui/svg-icon/svg-icon.component";
import { Emails } from '../../../../../shared/interface/email';
import { TooltipComponent } from "../../../../../shared/components/ui/tooltip/tooltip.component";
import {
  couleurAvatar, couleurTypeFichier, estCloturee, estValidee, Imputation,
  ImputationFichier, ImputationMessage, ImputationPersonne, libelleTypeFichier,
  niveauPriorite,
} from '../../imputation-api';

const AUTORISER_VISIONNEUSE_EXTERNE = true;

@Component({
  selector: 'app-mail-details',
  imports: [CommonModule, FormsModule, AngularEditorModule,
            SvgIconComponent, FeatherIconComponent, TooltipComponent],
  templateUrl: './mail-details.component.html',
  styleUrl: './mail-details.component.scss'
})

export class MailDetailsComponent implements AfterViewInit, OnChanges, OnDestroy {

  @Output() isMailOpen = new EventEmitter<boolean>();

  @Input() mailDetails: Emails;
  /** Donnée métier derrière la ligne affichée. */
  @Input() imputation: Imputation | null = null;
  /** uid de l'utilisateur connecté, pour situer ses propres messages. */
  @Input() moi: string = '';
  @Input() envoiEnCours: boolean = false;

  /** Message à publier dans la conversation (api/:imputations/message). */
  @Output() repondre = new EventEmitter<{ texte: string; fichiers: File[] }>();
  /** Les actions serveur sont exécutées par le conteneur, qui détient la liste. */
  @Output() transfererDemande = new EventEmitter<void>();
  @Output() traiterDemande = new EventEmitter<void>();
  @Output() validerDemande = new EventEmitter<void>();
  @Output() cloturerDemande = new EventEmitter<void>();
  @Output() supprimerDemande = new EventEmitter<void>();

  /** Transfert et traitement n'ont de sens que sur une imputation reçue. */
  @Input() actionsPossibles: boolean = false;
  /** Validation et clôture reviennent à l'émetteur (voir le récapitulatif). */
  @Input() actionsEmetteur: boolean = false;
  /** La suppression n'est proposée que depuis la corbeille. */
  @Input() actionsCorbeille: boolean = false;

  /**
   * Dossier clos. Tout se fige alors : plus de transfert, de traitement, de
   * validation, de nouvelle clôture, ni de message dans le fil. L'interface
   * doit le DIRE, pas seulement griser des boutons — sinon on croit à une
   * panne.
   */
  get conversationCloturee(): boolean {
    return estCloturee(this.imputation);
  }

  get dejaValidee(): boolean {
    return !!this.imputation && estValidee(this.imputation);
  }

  public reponseTexte: string = '';
  public fichiers: File[] = [];

  /** Conteneur de la visionneuse, déplacé sous <body> (voir ngAfterViewInit). */
  @ViewChild('visHote', { static: true }) visHote!: ElementRef<HTMLElement>;

  constructor(private cdr: ChangeDetectorRef, private renderer: Renderer2,
              private sanitizer: DomSanitizer) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = '/assets/pdfjs/pdf.worker.mjs';
  }

  /**
   * Les conteneurs de page du gabarit portent des `transform`, ce qui en fait
   * le référentiel des éléments `position: fixed`. La surcouche doit donc être
   * rattachée au <body> pour couvrir réellement toute la fenêtre, menu latéral
   * compris — c'est le procédé déjà employé par le loader global de l'appli.
   */
  ngAfterViewInit(): void {
    this.renderer.appendChild(document.body, this.visHote.nativeElement);
  }

  ngOnDestroy(): void {
    this.libererDefilement();
    if (this.visMinuteurOffice) clearTimeout(this.visMinuteurOffice);
    if (this.minuteurNouveaux) clearTimeout(this.minuteurNouveaux);
    const hote = this.visHote?.nativeElement;
    if (hote?.parentNode) {
      this.renderer.removeChild(hote.parentNode, hote);
    }
  }

  /** Empêche la page de défiler derrière la surcouche (double ascenseur). */
  private bloquerDefilement(): void {
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
  }

  private libererDefilement(): void {
    this.renderer.removeStyle(document.body, 'overflow');
  }

  @HostListener('document:keydown.escape')
  fermerAuClavier(): void {
    if (this.visionneuse) this.fermerVisionneuse();
  }

  public editeurConfig: AngularEditorConfig = {
    editable: true,
    height: '120px',
    minHeight: '90px',
    placeholder: 'Votre message…',
    sanitize: true,
    toolbarHiddenButtons: [['insertImage', 'insertVideo']],
  };

  /** Messages de la conversation, du plus ancien au plus récent. */
  get messages(): ImputationMessage[] {
    return this.imputation?.messages || [];
  }

  /** Même marqueur d'urgence que dans la liste (convention Outlook). */
  get marqueurPriorite(): { classe: string; couleur: string; titre: string } | null {
    const libelle = this.imputation?.prioriteLibelle;
    if (!libelle) return null;

    const niveau = niveauPriorite(libelle);
    if (niveau === 'haute') {
      return {classe: 'fa-solid fa-exclamation', couleur: '#d32f2f', titre: `Priorité : ${libelle}`};
    }
    if (niveau === 'basse') {
      return {classe: 'fa-solid fa-arrow-down', couleur: '#1976d2', titre: `Priorité : ${libelle}`};
    }
    return null;
  }

  /** Couleurs d'avatar d'une personne (stable d'un écran à l'autre). */
  avatar(personne: ImputationPersonne): { fond: string; trait: string } {
    return couleurAvatar(personne?.uid || personne?.email || personne?.nom || '');
  }

  get avatarExpediteur(): { fond: string; trait: string } {
    return couleurAvatar(
      this.imputation?.expediteur?.uid || this.mailDetails?.user_name || ''
    );
  }

  // ── Pliage du fil ────────────────────────────────────────────────────────
  /** Identifiants des messages dépliés. */
  private messagesOuverts = new Set<string>();

  /**
   * À l'ouverture d'une imputation, seul le dernier message est déplié : c'est
   * celui qui appelle une action. Les précédents restent repliés, avec un
   * aperçu, pour qu'un long échange tienne à l'écran.
   */
  ngOnChanges(changements: SimpleChanges): void {
    const evolution = changements['imputation'];
    if (!evolution) return;

    const avant = evolution.previousValue as Imputation | null;
    const apres = evolution.currentValue as Imputation | null;

    // Autre conversation : on repart de zéro, seul le dernier message compte.
    if (!avant || !apres || avant.uid !== apres.uid) {
      this.messagesOuverts.clear();
      this.nouveauxMessages.clear();
      const dernier = this.messages[this.messages.length - 1];
      if (dernier) {
        this.messagesOuverts.add(dernier.id);
      }
      return;
    }

    // MÊME conversation rechargée : le conteneur vient de la remplacer parce
    // qu'un signal temps réel est arrivé. Ce qui n'était pas là avant est
    // nouveau — sauf nos propres envois, qu'il serait absurde de s'annoncer.
    const connus = new Set((avant.messages || []).map(m => m.id));
    (apres.messages || [])
      .filter(m => !connus.has(m.id) && m.auteur?.uid !== this.moi)
      .forEach(m => {
        this.nouveauxMessages.add(m.id);
        // Déplié d'office : c'est le message qu'on veut lire.
        this.messagesOuverts.add(m.id);
      });
  }

  /** Messages arrivés pendant que l'utilisateur avait le fil sous les yeux. */
  private nouveauxMessages = new Set<string>();
  private minuteurNouveaux: any = null;

  get nbNouveaux(): number {
    return this.nouveauxMessages.size;
  }

  estNouveau(message: ImputationMessage): boolean {
    return this.nouveauxMessages.has(message.id);
  }

  /**
   * Amène le premier message arrivé sous les yeux de l'utilisateur.
   *
   * Le surlignage survit quelques secondes au défilement : disparaître à
   * l'instant du clic ferait perdre de vue ce qu'on est venu chercher.
   */
  allerAuxNouveaux(): void {
    const premier = this.messages.find(m => this.estNouveau(m));
    if (premier) {
      document.getElementById(`imput-msg-${premier.id}`)
        ?.scrollIntoView({behavior: 'smooth', block: 'center'});
    }

    if (this.minuteurNouveaux) clearTimeout(this.minuteurNouveaux);
    this.minuteurNouveaux = setTimeout(() => {
      this.nouveauxMessages.clear();
      this.minuteurNouveaux = null;
      this.cdr.detectChanges();
    }, 6000);
  }

  estOuvert(message: ImputationMessage): boolean {
    return this.messagesOuverts.has(message.id);
  }

  get toutEstOuvert(): boolean {
    return this.messages.length > 0 && this.messages.every(m => this.estOuvert(m));
  }

  basculerMessage(message: ImputationMessage): void {
    if (this.messagesOuverts.has(message.id)) {
      this.messagesOuverts.delete(message.id);
    } else {
      this.messagesOuverts.add(message.id);
    }
  }

  basculerTout(): void {
    if (this.toutEstOuvert) {
      this.messagesOuverts.clear();
    } else {
      this.messages.forEach(m => this.messagesOuverts.add(m.id));
    }
  }

  /** Aperçu d'une ligne affiché quand le message est replié. */
  apercu(contenu: string): string {
    const div = document.createElement('div');
    div.innerHTML = contenu || '';
    const texte = (div.textContent || '').replace(/\s+/g, ' ').trim();
    return texte.length > 160 ? `${texte.slice(0, 160)}…` : texte;
  }

  /**
   * Couleur de l'icône selon le type. Le gabarit n'ayant qu'une image de PDF,
   * l'icône est dessinée en SVG (voir le gabarit) et déclinée par famille.
   */
  couleurFichier(f: ImputationFichier): string {
    return couleurTypeFichier(f.extension);
  }

  /**
   * Texte de la pastille. Les extensions longues sont ramenées à leur forme
   * courte usuelle : à cette taille, quatre caractères deviennent illisibles.
   */
  libelleFichier(f: ImputationFichier): string {
    return libelleTypeFichier(f.extension);
  }

  /** La pastille a une largeur fixe : on réduit la police pour 4 caractères. */
  tailleTexteIcone(f: ImputationFichier): number {
    return this.libelleFichier(f).length >= 4 ? 7 : 9;
  }

  /** Ligne d'info sous le nom du fichier : taille ou nombre de pages. */
  detailFichier(f: ImputationFichier): string {
    const bouts = [f.tailleLisible];
    if (f.nombrePages) {
      bouts.push(`${f.nombrePages} page${f.nombrePages > 1 ? 's' : ''}`);
    }
    return bouts.filter(b => b).join(' · ');
  }

  // ══ Visionneuse intégrée ═════════════════════════════════════════════════
  visionneuse: ImputationFichier | null = null;
  visChargement = false;
  visErreur = '';
  visPage = 1;
  visTotalPages = 1;
  visZoomNiveau = 1;
  /** Adresse de la visionneuse Office, quand le fichier en relève. */
  visUrlOffice: SafeResourceUrl | null = null;
  private visDocument: any = null;
  private visMinuteurOffice: any = null;
  /**
   * Fichiers confidentiels pour lesquels l'utilisateur a accepté l'aperçu en
   * ligne, en connaissance de cause. Mémorisé par URL et pour la seule durée de
   * la consultation : rien n'est retenu d'une session à l'autre.
   */
  private accordsApercuExterne = new Set<string>();

  private static readonly EXTENSIONS_OFFICE =
    ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'odt', 'ods', 'odp', 'csv'];

  /** Progression de la préparation d'impression (documents volumineux). */
  impressionEnCours = false;
  impressionPage = 0;
  impressionTotal = 0;

  get impressionPourcent(): number {
    if (!this.impressionTotal) return 0;
    return Math.round((this.impressionPage / this.impressionTotal) * 100);
  }

  get visEstPdf(): boolean {
    return this.extension === 'pdf';
  }

  get visEstImage(): boolean {
    return ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'svg'].includes(this.extension);
  }

  get visEstOffice(): boolean {
    return MailDetailsComponent.EXTENSIONS_OFFICE.includes(this.extension);
  }

  /**
   * Une imputation confidentielle n'est pas envoyée à la visionneuse Microsoft
   * sans l'accord explicite de l'utilisateur : celle-ci télécharge le fichier
   * sur ses serveurs pour le convertir. On ne décide pas à sa place — il sait,
   * lui, ce que contient le document — mais il doit être averti.
   *
   * `AUTORISER_VISIONNEUSE_EXTERNE` à false interdirait ce recours pour tous
   * les documents, sans possibilité de le lever.
   */
  get visOfficeBloque(): boolean {
    if (!this.visEstOffice || !AUTORISER_VISIONNEUSE_EXTERNE) {
      return this.visEstOffice;
    }
    return !!this.imputation?.estConfidentiel
      && !this.accordsApercuExterne.has(this.visionneuse?.url || '');
  }

  private get extension(): string {
    return this.visionneuse?.extension || '';
  }

  ouvrirVisionneuse(fichier: ImputationFichier): void {
    if (!fichier.url) return;
    this.visionneuse = fichier;
    this.visErreur = '';
    this.visPage = 1;
    this.visTotalPages = 1;
    this.visZoomNiveau = 1;
    this.visDocument = null;
    this.visChargement = true;
    this.bloquerDefilement();

    if (this.visEstPdf) {
      this.chargerPdf(fichier);
    } else if (this.visEstOffice && !this.visOfficeBloque) {
      this.chargerOffice(fichier);
    } else if (this.visEstOffice && AUTORISER_VISIONNEUSE_EXTERNE) {
      // Confidentiel : on demande avant d'envoyer quoi que ce soit dehors.
      this.visChargement = false;
      this.demanderAccordApercu();
    } else if (!this.visEstImage) {
      this.visChargement = false;
    }
  }

  /**
   * Les formats Office ne se rendent pas dans le navigateur. On emploie la
   * visionneuse en ligne de Microsoft, déjà utilisée ailleurs dans
   * l'application (voir classer-document).
   */
  private chargerOffice(fichier: ImputationFichier): void {
    this.visUrlOffice = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fichier.url)}`
    );

    // L'iframe ne signale pas toujours sa fin de chargement (document lourd,
    // service lent) : sans ce garde-fou, le voile resterait indéfiniment.
    if (this.visMinuteurOffice) clearTimeout(this.visMinuteurOffice);
    if (this.minuteurNouveaux) clearTimeout(this.minuteurNouveaux);
    this.visMinuteurOffice = setTimeout(() => {
      this.visChargement = false;
      this.visMinuteurOffice = null;
      this.cdr.detectChanges();
    }, 12000);
  }

  /**
   * Explique le risque, puis laisse le choix. Tant que l'utilisateur n'a pas
   * confirmé, AUCUNE requête ne part vers Microsoft : l'iframe n'est créée
   * qu'après l'accord.
   */
  async demanderAccordApercu(): Promise<void> {
    const fichier = this.visionneuse;
    if (!fichier) return;

    const reponse = await Swal.fire({
      ...OPTIONS_POPUP,
      html: `
        <div class="imp-swal-tete">
          <span class="imp-swal-ico imp-swal-ico-alerte"><i class="fa-solid fa-shield-halved"></i></span>
          <div class="imp-swal-titres">
            <span class="imp-swal-titre">Imputation confidentielle</span>
            <span class="imp-swal-sous">${echapper(fichier.nom)}</span>
          </div>
        </div>
        <div class="imp-swal-contenu">
          <p class="imp-swal-texte">
            Les fichiers Word, Excel et PowerPoint ne peuvent pas être affichés
            par votre navigateur. Pour vous en montrer un aperçu, le fichier
            doit être <strong>transmis à la visionneuse en ligne de
            Microsoft</strong>, qui le télécharge sur ses serveurs pour le
            convertir.
          </p>
          <p class="imp-swal-avertissement">
            Cette imputation est marquée confidentielle : le document sortirait
            donc du périmètre de l'application. Le téléchargement, lui, reste
            entièrement sur votre poste.
          </p>
        </div>`,
      confirmButtonText: '<i class="fa-solid fa-eye"></i> Afficher quand même',
      cancelButtonText: 'Ne pas afficher',
    });

    if (!reponse.isConfirmed) return;

    this.accordsApercuExterne.add(fichier.url);
    this.visChargement = true;
    this.chargerOffice(fichier);
    this.cdr.detectChanges();
  }

  officeCharge(): void {
    if (this.visMinuteurOffice) clearTimeout(this.visMinuteurOffice);
    if (this.minuteurNouveaux) clearTimeout(this.minuteurNouveaux);
    this.visMinuteurOffice = null;
    this.visChargement = false;
  }

  fermerVisionneuse(): void {
    this.visionneuse = null;
    this.visUrlOffice = null;
    if (this.visMinuteurOffice) clearTimeout(this.visMinuteurOffice);
    if (this.minuteurNouveaux) clearTimeout(this.minuteurNouveaux);
    this.visMinuteurOffice = null;
    this.visDocument = null;
    this.visChargement = false;
    this.visErreur = '';
    this.libererDefilement();
  }

  /**
   * Le mot de passe des PDF protégés est passé directement à pdf.js : il n'est
   * jamais affiché, ni copiable, ni présent dans le DOM.
   */
  private chargerPdf(fichier: ImputationFichier): void {
    pdfjsLib.getDocument({
      url: fichier.url,
      password: fichier.motDePasse || undefined,
    }).promise
      .then((pdf: any) => {
        this.visDocument = pdf;
        this.visTotalPages = pdf.numPages;
        this.rendrePage(1);
      })
      .catch(() => {
        this.visChargement = false;
        this.visErreur = "Impossible d'afficher ce document.";
        this.cdr.detectChanges();
      });
  }

  private rendrePage(numero: number): void {
    if (!this.visDocument) return;
    this.visChargement = true;
    this.cdr.detectChanges();

    this.visDocument.getPage(numero).then((page: any) => {
      const canvas = document.getElementById('vis-canvas') as HTMLCanvasElement;
      if (!canvas) return;
      const viewport = page.getViewport({scale: this.visZoomNiveau * 1.5});
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      page.render({canvasContext: canvas.getContext('2d')!, viewport}).promise.then(() => {
        this.visChargement = false;
        this.cdr.detectChanges();
      });
    });
  }

  visPageSuivante(): void {
    if (this.visPage >= this.visTotalPages) return;
    this.visPage++;
    this.rendrePage(this.visPage);
  }

  visPagePrecedente(): void {
    if (this.visPage <= 1) return;
    this.visPage--;
    this.rendrePage(this.visPage);
  }

  visZoom(pas: number): void {
    const niveau = Math.min(3, Math.max(0.5, this.visZoomNiveau + pas));
    if (niveau === this.visZoomNiveau) return;
    this.visZoomNiveau = niveau;
    this.rendrePage(this.visPage);
  }

  /**
   * Impression. On n'envoie pas le fichier d'origine à l'imprimante : pour un
   * PDF protégé, la visionneuse native du navigateur redemanderait le mot de
   * passe. On imprime donc les pages telles que pdf.js les a déjà rendues.
   */
  async imprimer(): Promise<void> {
    const fichier = this.visionneuse;
    if (!fichier || this.impressionEnCours) return;

    let corps = '';

    if (this.visEstPdf && this.visDocument) {
      this.impressionEnCours = true;
      this.impressionTotal = this.visTotalPages;
      this.impressionPage = 0;
      this.cdr.detectChanges();

      const pages: string[] = [];
      try {
        for (let n = 1; n <= this.visTotalPages; n++) {
          pages.push(await this.pageEnImage(n));
          this.impressionPage = n;
          this.cdr.detectChanges();
          // Rend la main au navigateur pour que la progression s'affiche.
          await new Promise(resolve => setTimeout(resolve));
          if (!this.impressionEnCours) return;   // annulée entre-temps
        }
      } catch {
        this.impressionEnCours = false;
        this.visErreur = "Préparation de l'impression impossible.";
        this.cdr.detectChanges();
        return;
      }
      corps = pages.map(src => `<img src="${src}">`).join('');
      this.impressionEnCours = false;
      this.cdr.detectChanges();
    } else if (this.visEstImage) {
      corps = `<img src="${fichier.url}">`;
    } else {
      return;
    }

    this.lancerImpression(corps, fichier.nom);
  }

  annulerImpression(): void {
    this.impressionEnCours = false;
  }

  /** Rend une page hors écran et la renvoie en image. */
  private pageEnImage(numero: number): Promise<string> {
    return this.visDocument.getPage(numero).then((page: any) => {
      const canvas = document.createElement('canvas');
      const viewport = page.getViewport({scale: 2});
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      return page.render({canvasContext: canvas.getContext('2d')!, viewport})
        .promise.then(() => canvas.toDataURL('image/png'));
    });
  }

  /** Iframe masquée plutôt qu'une fenêtre : rien à bloquer côté navigateur. */
  private lancerImpression(corps: string, titre: string): void {
    const cadre = this.renderer.createElement('iframe') as HTMLIFrameElement;
    this.renderer.setStyle(cadre, 'position', 'fixed');
    this.renderer.setStyle(cadre, 'right', '0');
    this.renderer.setStyle(cadre, 'bottom', '0');
    this.renderer.setStyle(cadre, 'width', '0');
    this.renderer.setStyle(cadre, 'height', '0');
    this.renderer.setStyle(cadre, 'border', '0');
    this.renderer.appendChild(document.body, cadre);

    const doc = cadre.contentWindow?.document;
    if (!doc) return;

    doc.open();
    doc.write(`<!doctype html><html><head><title>${this.echapper(titre)}</title>
      <style>
        @page { margin: 10mm; }
        body { margin: 0; }
        img { display: block; width: 100%; page-break-after: always; }
        img:last-child { page-break-after: auto; }
      </style></head><body>${corps}</body></html>`);
    doc.close();

    const imprimer = () => {
      cadre.contentWindow?.focus();
      cadre.contentWindow?.print();
      // Laisse le temps à la boîte d'impression de s'ouvrir avant nettoyage.
      setTimeout(() => this.renderer.removeChild(document.body, cadre), 1000);
    };

    if (doc.readyState === 'complete') {
      setTimeout(imprimer, 100);
    } else {
      cadre.onload = () => setTimeout(imprimer, 100);
    }
  }

  private echapper(texte: string): string {
    const div = document.createElement('div');
    div.textContent = texte;
    return div.innerHTML;
  }

  /** Téléchargement via blob : évite d'exposer l'URL signée dans un onglet. */
  async telecharger(): Promise<void> {
    const fichier = this.visionneuse;
    if (!fichier?.url) return;
    try {
      const reponse = await fetch(fichier.url);
      const blob = await reponse.blob();
      const lien = document.createElement('a');
      lien.href = URL.createObjectURL(blob);
      lien.download = fichier.nom;
      lien.click();
      URL.revokeObjectURL(lien.href);
    } catch {
      this.visErreur = 'Téléchargement impossible.';
    }
  }

  ajouterFichiers(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.fichiers = [...this.fichiers, ...Array.from(input.files || [])];
    // Réinitialisé pour pouvoir re-sélectionner le même fichier ensuite.
    input.value = '';
  }

  retirerFichier(index: number): void {
    this.fichiers = this.fichiers.filter((_, i) => i !== index);
  }

  /** Contenu réellement saisi, balises retirées : sert à détecter le vide. */
  private enTextePur(html: string): string {
    const div = document.createElement('div');
    div.innerHTML = html || '';
    return (div.textContent || '').trim();
  }

  /** Un contenu contenant des balises est rendu en HTML, sinon en texte. */
  estHtml(contenu: string): boolean {
    return /<[a-z][\s\S]*>/i.test(contenu || '');
  }

  /**
   * Recompose un texte brut coupé à largeur fixe. Les messages collés depuis
   * un traitement de texte ou un mail arrivent avec un retour à la ligne tous
   * les ~70 caractères ; affichés tels quels, ils s'arrêtent en plein milieu
   * de la bulle. On rejoint les lignes coupées pour la mise en forme, en
   * conservant les vrais retours (fin de phrase, listes, paragraphes vides).
   *
   * Une coupure est considérée comme « de mise en forme » quand la ligne finit
   * par une espace, ou que la suivante commence par une espace ou une
   * minuscule — c'est la convention des messageries (RFC 3676).
   */
  texteMessage(contenu: string): string {
    const lignes = (contenu || '').replace(/\r\n?/g, '\n').split('\n');
    const sortie: string[] = [];

    for (const ligne of lignes) {
      const precedente = sortie[sortie.length - 1];
      if (precedente === undefined) {
        sortie.push(ligne);
        continue;
      }

      const suite = ligne.replace(/^\s+/, '');
      const estListe = /^([-*•>]|\d+[.)])\s/.test(suite);
      const coupureDeMiseEnForme =
        precedente.endsWith(' ') || /^\s/.test(ligne) || /^[a-zà-öø-ÿ]/.test(suite);

      if (suite && precedente.trim() && coupureDeMiseEnForme && !estListe) {
        sortie[sortie.length - 1] = `${precedente.replace(/\s+$/, '')} ${suite}`;
      } else {
        sortie.push(ligne);
      }
    }

    return sortie.join('\n');
  }

  /**
   * L'éditeur pose l'alignement via `style="text-align:…"`, or Angular retire
   * l'attribut `style` au rendu (sanitisation). On le bascule sur l'attribut
   * `align`, qui lui est conservé : l'alignement survit à l'aller-retour.
   */
  private preparerHtml(html: string): string {
    const div = document.createElement('div');
    div.innerHTML = html || '';
    div.querySelectorAll<HTMLElement>('[style]').forEach(el => {
      const alignement = el.style.textAlign;
      if (alignement) {
        el.setAttribute('align', alignement);
      }
    });
    return div.innerHTML;
  }

  envoyerReponse(): void {
    // Le composeur disparaît sur une conversation close, mais la clôture peut
    // tomber pendant la rédaction : on revérifie au moment d'envoyer.
    if (this.conversationCloturee) return;
    if (!this.enTextePur(this.reponseTexte)) return;
    this.repondre.emit({
      texte: this.preparerHtml(this.reponseTexte),
      fichiers: this.fichiers,
    });
    this.reponseTexte = '';
    this.fichiers = [];
  }



  getUserText(userName: string): string {
    let names = userName.split(' ');
    return names.map(name => name[0]).join('');
  }

  getTextColor(name: string) {
    let firstLetter = name[0];

    if(firstLetter >= 'A' && firstLetter <= 'M') {
      return 'primary'
    } else {
      return 'success'
    }
  }

  goPrevious() {
    this.isMailOpen.emit(false);
  }

}
