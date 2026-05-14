import {Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
    selector: 'app-doc-upload',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './doc-upload.component.html',
    styleUrl: './doc-upload.component.scss'
})
export class DocUploadComponent implements OnInit, OnChanges {

    @Input() placeholder: string = 'Joindre un document';
    @Input() maxSizeInMB: number = 10;
    @Input() acceptedFormats: string = 'application/pdf,.doc,.docx';
    @Input() existingFileUrl: string | null = null;
    @Input() existingFileName: string | null = null;

    @Output() fileSelected = new EventEmitter<File>();
    @Output() fileRemoved = new EventEmitter<void>();

    selectedFile: File | null = null;
    errorMessage: string = '';
    isDragging: boolean = false;
    previewObjectUrl: SafeResourceUrl | null = null;

    constructor(private sanitizer: DomSanitizer) {
    }

    ngOnInit(): void {
        // Fichier existant affiché au chargement
    }

    ngOnChanges(changes: SimpleChanges): void {
    }

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        if (!file) return;
        this.processFile(file);
    }

    processFile(file: File): void {
        const maxSizeInBytes = this.maxSizeInMB * 1024 * 1024;
        if (file.size > maxSizeInBytes) {
            this.errorMessage = `Fichier trop volumineux. Taille max : ${this.maxSizeInMB} MB`;
            return;
        }

        const accepted = this.acceptedFormats.split(',').map(f => f.trim());
        const isAccepted = accepted.some(f =>
            file.type === f || file.name.endsWith(f.replace('*', ''))
        );

        if (!isAccepted) {
            this.errorMessage = 'Format non accepté.';
            return;
        }

        this.errorMessage = '';
        this.selectedFile = file;

        // Génère la prévisualisation PDF
        if (file.type === 'application/pdf') {
            const objectUrl = URL.createObjectURL(file);
            this.previewObjectUrl = this.sanitizer.bypassSecurityTrustResourceUrl(objectUrl);
        } else {
            this.previewObjectUrl = null;
        }

        this.fileSelected.emit(file);
    }

    removeFile(event: Event): void {
        event.stopPropagation();
        this.selectedFile = null;
        this.previewObjectUrl = null;
        this.errorMessage = '';
        this.fileRemoved.emit();
    }

    isPdf(): boolean {
        return this.selectedFile?.type === 'application/pdf';
    }

    getFileIconClass(): string {
        if (this.isPdf()) return 'icon-pdf';
        return 'icon-doc';
    }

    formatFileSize(bytes: number): string {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }

    onDragOver(event: DragEvent): void {
        event.preventDefault();
        this.isDragging = true;
    }

    onDragLeave(event: DragEvent): void {
        this.isDragging = false;
    }

    onDrop(event: DragEvent): void {
        event.preventDefault();
        this.isDragging = false;
        const file = event.dataTransfer?.files[0];
        if (file) this.processFile(file);
    }
}