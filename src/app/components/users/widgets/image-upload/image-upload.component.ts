import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.scss',
})
export class ImageUploadComponent {
  @Input() placeholder: string = 'Ajouter une image';
  @Input() maxSizeInMB: number = 5;
  @Input() acceptedFormats: string = 'image/jpeg,image/png,image/jpg,image/webp';

  @Output() fileSelected = new EventEmitter<File>();
  @Output() fileRemoved = new EventEmitter<void>();

  previewUrl: string | null = null;
  selectedFile: File | null = null;
  errorMessage: string = '';

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    // Validation de la taille
    const maxSizeInBytes = this.maxSizeInMB * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      this.errorMessage = `Le fichier est trop volumineux. Taille max: ${this.maxSizeInMB}MB`;
      return;
    }

    // Validation du format
    if (!this.acceptedFormats.includes(file.type)) {
      this.errorMessage = 'Format de fichier non accepté';
      return;
    }

    this.errorMessage = '';
    this.selectedFile = file;

    // Créer la prévisualisation
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      this.previewUrl = e.target?.result as string;
    };
    reader.readAsDataURL(file);

    this.fileSelected.emit(file);
  }

  removeImage(event: Event): void {
    event.stopPropagation();
    this.previewUrl = null;
    this.selectedFile = null;
    this.errorMessage = '';
    this.fileRemoved.emit();
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }
}
