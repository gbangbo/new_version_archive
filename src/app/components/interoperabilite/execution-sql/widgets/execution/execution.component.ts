import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Select2Module} from 'ng-select2-component';
import * as XLSX from 'xlsx';
import moment from 'moment';
import {SqlEditorComponent} from '../sql-editor/sql-editor.component';
import {JsonEditorComponent} from '../../../shared/json-editor/json-editor.component';
import {Authorization} from '../../../../../protect/authorization.service';
import {HttpService} from '../../../../../core/http.service';
import {environment} from '../../../../../../environments/environment';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-execution',
    imports: [CommonModule, FormsModule, Select2Module, SqlEditorComponent, JsonEditorComponent],
    templateUrl: './execution.component.html',
    styleUrl: './execution.component.scss',
})
export class ExecutionComponent implements OnInit {

    private users: any = [];

    // Onglet actif
    mode: 'stored' | 'dynamic' | 'folder' = 'stored';

    // Logos SGBD
    dbLogos: { [k: string]: string } = {
        postgresql: 'assets/images/db/postgresql-logo-svgrepo-com.svg',
        mysql: 'assets/images/db/mysql-svgrepo-com.svg',
        mssql: 'assets/images/db/microsoft-sql-server-logo-svgrepo-com.svg',
        oracle: 'assets/images/db/oracle-svgrepo-com.svg',
    };

    // Selects
    connexionOptions: { value: any; label: string }[] = [];
    queryOptions: { value: any; label: string }[] = [];
    private connById: { [id: string]: { uid: string; name: string; db: string } } = {};
    private queryByUid: { [uid: string]: { query: string; connId: any } } = {};

    // Formulaire « requête enregistrée »
    stored = {idconnection: '' as any, idquery: '' as any, query: '', params: ''};

    // Formulaire « requête dynamique » (SQL Server)
    dynamic = {
        db_host: '', db_port: '1433' as any, db_name: '', db_user: '', db_password: '',
        db_driver: 'ODBC Driver 18 for SQL Server', query: '', params: '',
    };

    // Formulaire « vérification dossier »
    folder = {
        idconnection: '' as any, idquery: '' as any, query: '', folder_path: '',
        param_name: '', params: '', recursive: false, include_extension: false,
    };
    // Résultats groupés par fichier
    folderGroups: { file: string; columns: string[]; rows: any[]; count: number; error?: string }[] = [];
    folderExpanded = new Set<number>();

    // Validité JSON par onglet
    storedJsonValid = true;
    dynamicJsonValid = true;
    folderJsonValid = true;

    // Résultats
    executing = false;
    execError = '';
    resultMessage = '';
    columns: string[] = [];
    resultRows: any[] = [];

    constructor(
        private autor: Authorization,
        private httService: HttpService,
        private toast: ToastrService,
    ) {
    }

    ngOnInit(): void {
        this.users = this.autor.getInfosUsers();
        this.loadConnexions();
        this.loadQueries();
    }

    // ── Chargement des sélecteurs ─────────────────────────────────────
    private loadConnexions(): void {
        this.httService.getData(
            `${environment.api_url}api/:io-database-connections?idconnection=`,
            false, this.users?.access_token || ''
        ).toPromise().then((res: any) => {
            if (res.body.status || res.body.success) {
                this.connexionOptions = (res.body.data || []).map((c: any) => {
                    const uid = c?.uid || '';
                    const id = c?.id ?? c?.connection ?? uid;
                    this.connById[String(id)] = {uid, name: c?.name || '', db: c?.db_type || ''};
                    const logo = this.dbLogos[c?.db_type] || '';
                    return {
                        value: uid,
                        label: `${logo ? `<img src="${logo}" class="exopt-img" alt=""/>` : ''}${c?.name || 'Connexion'}`
                    };
                });
            }
        }).catch(() => {
        });
    }

    private loadQueries(): void {
        this.httService.getData(
            `${environment.api_url}api/:io-saved-queries?idquery=`,
            false, this.users?.access_token || ''
        ).toPromise().then((res: any) => {
            if (res.body.status || res.body.success) {
                this.queryOptions = (res.body.data || []).map((q: any) => {
                    const uid = q?.uid || q?.idquery || '';
                    this.queryByUid[uid] = {query: q?.query || '', connId: q?.connection ?? ''};
                    return {value: uid, label: q?.name || 'Requête'};
                });
            }
        }).catch(() => {
        });
    }

    // Sélection d'une requête → pré-remplit le SQL + résout la connexion (uid)
    onQuerySelected(uid: any): void {
        this.stored.idquery = uid;
        const q = this.queryByUid[uid];
        if (q) {
            this.stored.query = q.query || '';
            const conn = this.connById[String(q.connId)];
            if (conn) this.stored.idconnection = conn.uid;
        }
    }

    onFolderQuerySelected(uid: any): void {
        this.folder.idquery = uid;
        const q = this.queryByUid[uid];
        if (q) {
            this.folder.query = q.query || '';
            const conn = this.connById[String(q.connId)];
            if (conn) this.folder.idconnection = conn.uid;
        }
    }

    toggleFolder(i: number): void {
        this.folderExpanded.has(i) ? this.folderExpanded.delete(i) : this.folderExpanded.add(i);
    }

    private parseParams(raw: string): any {
        const t = (raw || '').trim();
        if (!t) return {};
        try {
            return JSON.parse(t);
        } catch {
            return null;
        }
    }

    // ── Exécution : requête enregistrée ───────────────────────────────
    executeStored(): void {
        this.execError = '';
        if (!this.stored.idconnection) {
            this.execError = 'Veuillez sélectionner une connexion.';
            return;
        }
        if (!this.stored.idquery && !this.stored.query.trim()) {
            this.execError = 'Sélectionnez une requête enregistrée ou saisissez une requête.';
            return;
        }
        const params = this.parseParams(this.stored.params);
        if (params === null) {
            this.execError = 'Le champ « Paramètres » doit être un JSON valide.';
            return;
        }

        const payload: any = {
            idconnection: this.stored.idconnection,
            idquery: this.stored.idquery || '',
            query: this.stored.query.trim(),
            params,
        };
        this.runExecution(`${environment.api_url}api/:io-execute-stored-query`, payload);
    }

    // ── Exécution : requête dynamique (SQL Server) ────────────────────
    executeDynamic(): void {
        this.execError = '';
        if (!this.dynamic.db_host.trim()) {
            this.execError = 'Veuillez saisir l\'hôte.';
            return;
        }
        if (!this.dynamic.db_name.trim()) {
            this.execError = 'Veuillez saisir la base de données.';
            return;
        }
        if (!this.dynamic.db_user.trim()) {
            this.execError = 'Veuillez saisir l\'utilisateur.';
            return;
        }
        if (!this.dynamic.db_password.trim()) {
            this.execError = 'Veuillez saisir le mot de passe.';
            return;
        }
        if (!this.dynamic.query.trim()) {
            this.execError = 'Veuillez saisir la requête SQL.';
            return;
        }
        const params = this.parseParams(this.dynamic.params);
        if (params === null) {
            this.execError = 'Le champ « Paramètres » doit être un JSON valide.';
            return;
        }

        const payload: any = {
            db_host: this.dynamic.db_host.trim(),
            db_port: this.dynamic.db_port !== '' ? Number(this.dynamic.db_port) : 1433,
            db_name: this.dynamic.db_name.trim(),
            db_user: this.dynamic.db_user.trim(),
            db_password: this.dynamic.db_password,
            db_driver: this.dynamic.db_driver.trim() || 'ODBC Driver 18 for SQL Server',
            query: this.dynamic.query.trim(),
            params,
        };

        this.runExecution(`${environment.api_url}api/:io-dynamic-query`, payload);
    }

    // ── Exécution : vérification dossier ──────────────────────────────
    executeFolder(): void {
        this.execError = '';
        if (!this.folder.idconnection) {
            this.execError = 'Veuillez sélectionner une connexion.';
            return;
        }
        if (!this.folder.folder_path.trim()) {
            this.execError = 'Veuillez saisir le chemin du dossier.';
            return;
        }
        if (!this.folder.param_name.trim()) {
            this.execError = 'Veuillez saisir le nom du paramètre.';
            return;
        }
        if (!this.folder.idquery && !this.folder.query.trim()) {
            this.execError = 'Sélectionnez une requête enregistrée ou saisissez une requête.';
            return;
        }
        const params = this.parseParams(this.folder.params);
        if (params === null) {
            this.execError = 'Le champ « Paramètres » doit être un JSON valide.';
            return;
        }

        const payload: any = {
            idconnection: this.folder.idconnection,
            idquery: this.folder.idquery || '',
            query: this.folder.query.trim(),
            folder_path: this.folder.folder_path.trim(),
            param_name: this.folder.param_name.trim(),
            params,
            recursive: !!this.folder.recursive,
            include_extension: !!this.folder.include_extension,
        };

        this.runExecution(`${environment.api_url}api/:io-folder-query-check`, payload, true);
    }

    // ── Exécution générique + rendu des résultats ─────────────────────
    private runExecution(url: string, payload: any, isFolder = false): void {
        this.executing = true;
        this.execError = '';
        this.resultMessage = '';
        this.columns = [];
        this.resultRows = [];
        this.folderGroups = [];
        this.folderExpanded.clear();

        this.httService.postData(url, payload, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.executing = false;
                console.log('execution ===', res.body);
                this.resultMessage = res.body?.message || '';
                if (res.body.status || res.body.success) {
                    if (isFolder) this.setFolderResults(res.body.data);
                    else this.setResults(res.body.data);
                    this.toast.success(res.body.message || 'Requête exécutée.', 'Succès');
                } else {
                    this.execError = res.body.message || 'Échec de l\'exécution.';
                }
            })
            .catch((err: any) => {
                this.executing = false;
                this.execError = err?.error?.err?.message || err?.error?.message || 'Une erreur est survenue.';
            });
    }

    // Normalise data → groupes { fichier, colonnes, lignes }
    private setFolderResults(data: any): void {
        const groups: { file: string; columns: string[]; rows: any[]; count: number; error?: string }[] = [];
        const push = (file: string, rowsRaw: any, error?: string) => {
            const rows = Array.isArray(rowsRaw) ? rowsRaw : (rowsRaw && typeof rowsRaw === 'object' ? [rowsRaw] : []);
            const cols = rows.length && typeof rows[0] === 'object' ? Object.keys(rows[0]) : [];
            groups.push({file: file || '—', columns: cols, rows, count: rows.length, error});
        };

        if (Array.isArray(data)) {
            for (const it of data) {
                if (it && typeof it === 'object') {
                    const file = it.file || it.filename || it.fichier || it.nom_fichier || it.name || '';
                    const rows = it.results ?? it.rows ?? it.data ?? it.matches ?? (file ? [] : it);
                    push(file, rows, it.error || it.erreur);
                }
            }
        } else if (data && typeof data === 'object') {
            for (const key of Object.keys(data)) push(key, data[key]);
        }
        this.folderGroups = groups;
        // ouvre le premier fichier par défaut
        if (groups.length) this.folderExpanded.add(0);
    }

    get folderTotalRows(): number {
        return this.folderGroups.reduce((s, g) => s + g.count, 0);
    }

    exportFolderExcel(): void {
        if (!this.folderGroups.length) return;
        const flat: any[] = [];
        for (const g of this.folderGroups) {
            if (g.rows.length) {
                for (const r of g.rows) flat.push({_fichier: g.file, ...(typeof r === 'object' ? r : {valeur: r})});
            } else {
                flat.push({_fichier: g.file, _resultat: 'Aucune donnée'});
            }
        }
        const ws = XLSX.utils.json_to_sheet(flat);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Verification');
        XLSX.writeFile(wb, `verification_dossier_${moment().format('YYYYMMDD_HHmmss')}.xlsx`);
    }

    // Normalise data → colonnes + lignes
    private setResults(data: any): void {
        let rows: any[] = [];
        if (Array.isArray(data)) {
            rows = data;
        } else if (data && Array.isArray(data.rows)) {
            rows = data.rows;
        } else if (data && Array.isArray(data.data)) {
            rows = data.data;
        } else if (data && typeof data === 'object') {
            rows = [data];
        }
        this.resultRows = rows;
        this.columns = rows.length && typeof rows[0] === 'object' ? Object.keys(rows[0]) : [];
    }

    cellVal(row: any, col: string): string {
        const v = row?.[col];
        if (v === null || v === undefined) return '';
        return typeof v === 'object' ? JSON.stringify(v) : String(v);
    }

    exportExcel(): void {
        if (!this.resultRows.length) return;
        const ws = XLSX.utils.json_to_sheet(this.resultRows);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Resultats');
        XLSX.writeFile(wb, `execution_${moment().format('YYYYMMDD_HHmmss')}.xlsx`);
    }
}
