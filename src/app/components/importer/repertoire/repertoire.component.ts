import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzTooltipDirective} from 'ng-zorro-antd/tooltip';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {CardComponent} from '../../../shared/components/ui/card/card.component';
import {FeatherIconComponent} from '../../../shared/components/ui/feather-icon/feather-icon.component';
import {Authorization} from '../../../protect/authorization.service';
import {HttpService} from '../../../core/http.service';
import {environment} from '../../../../environments/environment';
import moment from 'moment';
import {RepertoireModalComponent} from "./repertoire-modal/repertoire-modal.component";

export const TYPE_FILE_LABELS: Record<number, {label: string; color: string}> = {
    1: {label: 'Documents',          color: '#7366ff'},
    2: {label: 'Chargement de fichier', color: '#54ba4a'},
    3: {label: 'Upload temporaire',  color: '#f8c01c'},
};

@Component({
    selector: 'app-repertoire',
    imports: [
        CommonModule,
        FormsModule,
        CardComponent,
        NzTableModule,
        NzTooltipDirective,
        NzIconModule,
        NzTagModule,
        FeatherIconComponent,
        RepertoireModalComponent,
    ],
    templateUrl: './repertoire.component.html',
    styleUrl: './repertoire.component.scss',
})
export class RepertoireComponent implements OnInit {

    private users: any = [];
    isloading = false;
    modalOpen = false;
    dataLigne: any = {};
    searchValue = '';
    typeFileLabels = TYPE_FILE_LABELS;

    private dataRaw: any[] = [];
    filteredData: any[] = [];

    sortFns = {
        path_repertoire: (a: any, b: any) =>
            (a.path_repertoire ?? '').localeCompare(b.path_repertoire ?? ''),
        type_file: (a: any, b: any) => a.type_file - b.type_file,
        created_at: (a: any, b: any) =>
            (a.created_at_raw ?? '').localeCompare(b.created_at_raw ?? ''),
    };

    constructor(private autor: Authorization, private httService: HttpService) {}

    ngOnInit(): void {
        window.scrollTo({top: 0, behavior: 'smooth'});
        this.users = this.autor.getInfosUsers();
        this.showRepertoires();
    }

    onSearch(value: string): void {
        const val = value.trim().toLowerCase();
        this.filteredData = val
            ? this.dataRaw.filter((row: any) =>
                Object.values(row).some(v => String(v).toLowerCase().includes(val))
            )
            : [...this.dataRaw];
    }

    showRepertoires(): void {
        this.isloading = true;
        this.dataRaw = [];
        this.filteredData = [];
        const idsociete = this.users?.datasociete?.uid || this.users?.uidsociete || '';
        this.httService
            .getData(
                `${environment.api_url}api/:saverepertoires?idsociete=${idsociete}`,
                false,
                this.users?.access_token || ''
            )
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res.body.status) {
                    this.dataRaw = res.body.data.map((e: any) => ({
                        ...e,
                        created_at_raw: e.created_at,
                        created_at: moment(e.created_at).format('DD/MM/YYYY HH:mm'),
                    }));
                    this.filteredData = [...this.dataRaw];
                }
            })
            .catch(() => {
                this.isloading = false;
            });
    }

    openModal(row?: any): void {
        this.dataLigne = row || {};
        this.modalOpen = true;
    }

    handleModal(refresh: boolean): void {
        if (refresh) this.showRepertoires();
        this.modalOpen = false;
    }
}
