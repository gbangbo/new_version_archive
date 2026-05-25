import {Component, EventEmitter, HostListener, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {CommonModule} from "@angular/common";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {environment} from "../../../../../../environments/environment";
import {FeatherIconComponent} from "../../../../../shared/components/ui/feather-icon/feather-icon.component";
import {NzTagModule} from "ng-zorro-antd/tag";
import {NzTooltipDirective} from "ng-zorro-antd/tooltip";


@Component({
    selector: 'app-view-doc-cond',
    imports: [CommonModule, FeatherIconComponent, NzTagModule, NzTooltipDirective],
    templateUrl: './view-doc-cond.component.html',
    styleUrl: './view-doc-cond.component.scss',
})
export class ViewDocCondComponent implements OnInit {
    @Output() modalOpen = new EventEmitter<boolean>();
    @Input() dataLigne: any;

    pdfUrl: SafeResourceUrl | null = null;
    rawUrl: string = '';
    isLoadingPdf = true;
    pdfError = false;
    zoom = 100;

    personnel: any = {};

    @HostListener('document:keydown.escape')
    handleEscKey() {
        this.closeModal();
    }

    constructor(private sanitizer: DomSanitizer) {}

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['dataLigne']?.currentValue) {
            const row = changes['dataLigne'].currentValue;
            if (Object.keys(row).length > 0) {
                this.personnel = row;
                this.buildPdfUrl(row);
            }
        }
    }

    private buildPdfUrl(row: any) {
        const piece = row?.data_fichiers?.[0]?.piece_jointe;
        if (piece) {
            this.rawUrl = piece.startsWith('http') ? piece : `${environment.URL_API}${piece}`;
            this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.rawUrl);
            this.isLoadingPdf = true;
            this.pdfError = false;
        } else {
            this.pdfUrl = null;
            this.pdfError = true;
            this.isLoadingPdf = false;
        }
    }

    onIframeLoad() {
        this.isLoadingPdf = false;
    }

    onIframeError() {
        this.isLoadingPdf = false;
        this.pdfError = true;
    }

    zoomIn() {
        if (this.zoom < 200) this.zoom += 25;
    }

    zoomOut() {
        if (this.zoom > 50) this.zoom -= 25;
    }

    resetZoom() {
        this.zoom = 100;
    }

    downloadPdf() {
        if (!this.rawUrl) return;
        const a = document.createElement('a');
        a.href = this.rawUrl;
        a.target = '_blank';
        a.download = this.personnel?.data_fichiers?.[0]?.nom_fichiers || 'document.pdf';
        a.click();
    }

    openInNewTab() {
        if (this.rawUrl) window.open(this.rawUrl, '_blank');
    }

    closeModal(e?: boolean) {
        this.modalOpen.emit(e ?? false);
    }
}
