import {Component, OnInit} from '@angular/core';
import {CardComponent} from "../../../../shared/components/ui/card/card.component";
import {CommonModule} from "@angular/common";
import {Authorization} from "../../../../protect/authorization.service";
import {HttpService} from "../../../../core/http.service";
import {environment} from "../../../../../environments/environment";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzTooltipDirective} from "ng-zorro-antd/tooltip";
import {Select2Module} from "ng-select2-component";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzIconModule} from "ng-zorro-antd/icon";
import {TableComponent} from "../../../../shared/components/ui/table/table.component";
import {FeatherIconComponent} from "../../../../shared/components/ui/feather-icon/feather-icon.component";
import moment from "moment";
import {AddModalComponent} from "./add-modal/add-modal.component";

interface RowData {
  created_at: string;
  sigle_fonction: string;
  libelle_fonction: string;
}


@Component({
  selector: 'app-fonction',
  imports: [
    CommonModule,
    CardComponent,
    NzSwitchModule,
    NzTooltipDirective,
    NzSelectModule,
    Select2Module,
    NzTabsModule,
    NzIconModule,
    NzTableModule, TableComponent, FeatherIconComponent,AddModalComponent],
  providers: [],
  templateUrl: './fonction.component.html',
  styleUrl: './fonction.component.scss',
})
export class FonctionComponent implements OnInit {

  private users: any = [];
  errorTexte: string = '';
  isloading: boolean = false;
  modalOpen: boolean = false;
  dataLigne: any = {};

  searchValue = '';

  // ── Données ──────────────────────────────────────────────

  filteredData: RowData[] = [];

  // ── Fonctions de tri ──────────────────────────────────────
  sortFns = {
    created_at: (a: RowData, b: RowData) =>
        (a.created_at ?? '').localeCompare(b.created_at ?? ''),
    sigle_fonction: (a: RowData, b: RowData) =>
        (a.sigle_fonction ?? '').localeCompare(b.sigle_fonction ?? ''),
    libelle_fonction: (a: RowData, b: RowData) =>
        (a.libelle_fonction ?? '').localeCompare(b.libelle_fonction ?? '')
  };

  // ── Filtres ───────────────────────────────────────────────
  filters: {
    created_at: { text: string; value: string }[];
    sigle_fonction: { text: string; value: string }[];
    libelle_fonction: { text: string; value: string }[];
  } = {
    created_at: [],
    sigle_fonction: [],
    libelle_fonction: [],
  };

  filterFns = {
    // Filtre sur nom_beneficiaire
    created_at: (list: string[], item: RowData) =>
        list.some(val =>
            (item.created_at ?? '').toLowerCase().includes(val.toLowerCase())
        ),
    sigle_fonction: (list: string[], item: RowData) =>
        list.some(val =>
            (item.sigle_fonction ?? '').toLowerCase().includes(val.toLowerCase())
        ),
    libelle_fonction: (list: string[], item: RowData) =>
        list.some(val =>
            (item.libelle_fonction ?? '').toLowerCase().includes(val.toLowerCase())
        ),
  };

  private dataBenef: any = [];

  constructor(private autor: Authorization,
              private httService: HttpService) {

  }


  ngOnInit(): void {
    window.scrollTo({top: 0, behavior: 'smooth'});
    this.users = this.autor.getInfosUsers();
    this.showFonction(this.users?.datasociete?.uid, '');
  }

  // ── Recherche globale ─────────────────────────────────────
  onSearch(value: string): void {
    const val = value.trim().toLowerCase();
    this.filteredData = val
        ? this.dataBenef.filter((row: any) =>
            Object.values(row).some(v => String(v).toLowerCase().includes(val))
        )
        : [...this.dataBenef];
  }
  showFonction(idsociete: string = '', idfonction: string = '') {
    this.isloading = true;
    this.dataBenef = [];
    this.filteredData = [];
    this.httService.getData(`${environment.api_url}auth/:save-fonction?idsociete=${idsociete}&idfonction=${idfonction}`, false, this.users?.access_token || '')
        .toPromise()
        .then((res: any) => {
          this.isloading = false;
          if (res.body.status) {
            console.log("res.body.data ===", res.body.data)
            this.dataBenef = res.body.data.map((e: any) => {
              return {
                ...e,
                name:`${e.nom} ${e.prenom}`,
                created_at: moment(e?.created_at).format('DD/MM/YYYY')
              }
            });
            this.filters = {
              ...this.filters,
              libelle_fonction: [...new Set(
                  this.dataBenef
                      ?.filter((e: any) => e?.libelle_fonction)
                      .map((e: any) => e.libelle_fonction)
              )].map((v: any) => ({
                text: v,
                value: v
              })) || [],
              sigle_fonction: [...new Set(
                  this.dataBenef
                      ?.filter((e: any) => e?.sigle_fonction)
                      .map((e: any) => e.sigle_fonction)
              )].map((v: any) => ({
                text: v,
                value: v
              })) || []
            }
            this.filteredData = [...this.dataBenef];
          }
        })
        .catch((err) => {
          this.isloading = false;
        });

  }

  handleModal(value: boolean) {
    if (value) {
      this.showFonction(this.users?.datasociete?.uid, '');
    }
    this.modalOpen = false;
  }

  openModal(row?: any) {
    this.modalOpen = true;
    this.dataLigne = row || {};
  }

}
