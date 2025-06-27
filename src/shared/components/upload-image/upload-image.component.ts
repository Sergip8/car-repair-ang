import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-upload-image',
  imports: [NgIf, NgFor],
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.scss'
})
export class UploadImageComponent {
@Input() maxFileSize: number = 5000000; // 5MB por defecto
  @Input() acceptedFormats: string[] = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  @Input() multiple: boolean = false;
  @Input() disabled: boolean = false;
  
  @Output() filesSelected = new EventEmitter<File[]>();
  @Output() uploadProgress = new EventEmitter<number>();
  @Output() uploadComplete = new EventEmitter<any>();
  @Output() uploadError = new EventEmitter<string>();

  selectedFiles: File[] = [];
  previewUrls: string[] = [];
  isDragOver: boolean = false;
  isUploading: boolean = false;
  uploadProgressValue: number = 0;

  onFileSelect(event: any): void {
    const files = event.target.files;
    this.handleFiles(files);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (!this.disabled) {
      this.isDragOver = true;
    }
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
    
    if (!this.disabled) {
      const files = event.dataTransfer?.files;
      if (files) {
        this.handleFiles(files);
      }
    }
  }

  private handleFiles(fileList: FileList): void {
    const files = Array.from(fileList);
    const validFiles: File[] = [];
    
    files.forEach(file => {
      if (this.validateFile(file)) {
        validFiles.push(file);
      }
    });

    if (validFiles.length > 0) {
      if (this.multiple) {
        this.selectedFiles = [...this.selectedFiles, ...validFiles];
      } else {
        this.selectedFiles = [validFiles[0]];
      }
      
      this.generatePreviews();
      this.filesSelected.emit(this.selectedFiles);
    }
  }

  private validateFile(file: File): boolean {
    // Validar formato
    if (!this.acceptedFormats.includes(file.type)) {
      this.uploadError.emit(`Formato no válido: ${file.type}`);
      return false;
    }

    // Validar tamaño
    if (file.size > this.maxFileSize) {
      this.uploadError.emit(`Archivo demasiado grande: ${this.formatFileSize(file.size)}`);
      return false;
    }

    return true;
  }

  private generatePreviews(): void {
    this.previewUrls = [];
    
    this.selectedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrls.push(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    });
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.previewUrls.splice(index, 1);
    this.filesSelected.emit(this.selectedFiles);
  }

  clearFiles(): void {
    this.selectedFiles = [];
    this.previewUrls = [];
    this.uploadProgressValue = 0;
    this.filesSelected.emit(this.selectedFiles);
  }

  // Método para simular upload - reemplazar con tu lógica de upload
  simulateUpload(): void {
    if (this.selectedFiles.length === 0) return;
    
    this.isUploading = true;
    this.uploadProgressValue = 0;
    
    const interval = setInterval(() => {
      this.uploadProgressValue += 10;
      this.uploadProgress.emit(this.uploadProgressValue);
      
      if (this.uploadProgressValue >= 100) {
        clearInterval(interval);
        this.isUploading = false;
        this.uploadComplete.emit({ files: this.selectedFiles });
      }
    }, 200);
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  getFileExtension(filename: string): string {
    return filename.split('.').pop()?.toUpperCase() || '';
  }
}
