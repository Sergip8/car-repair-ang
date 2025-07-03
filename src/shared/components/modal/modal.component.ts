import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

import { fadeIn, slideIn } from '../../utils/animation';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  imports: [],
  styleUrls: ['./modal.component.scss'],
  animations: [ slideIn, fadeIn

  ]
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() isOpen = false;
  @Input() title = '';
  @Input() size: 'small' | 'medium' | 'large' | 'fullscreen' = 'fullscreen';
  @Input() position: 'left' | 'center' | 'right' = 'right';
  @Input() closeOnBackdrop = true;
  @Input() showCloseButton = true;
  
  @Output() closeModal = new EventEmitter<void>();
  @Output() modalOpened = new EventEmitter<void>();
  @Output() modalClosed = new EventEmitter<void>();

  private isBrowser: boolean;
  showModal = false;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);

  }

  ngOnInit(): void {
          
    if (this.isBrowser && this.isOpen) {
     
      this.handleBodyScroll(true);
      this.modalOpened.emit();
 
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      this.handleBodyScroll(false);
    }
  }

  ngOnChanges(): void {
    if (this.isBrowser) {
      if (this.isOpen) {
             setTimeout(() => {
    this.showModal = true;
  }, 100); 
        this.handleBodyScroll(true);
        this.modalOpened.emit();
      } else {
        this.handleBodyScroll(false);
        this.modalClosed.emit();
      }
    }
  }

 close(): void {

   this.showModal = false;
  setTimeout(() => {
    this.closeModal.emit()
  }, 300);
}
  onBackdropClick(event: MouseEvent): void {
    if (this.closeOnBackdrop && event.target === event.currentTarget) {
      this.close();
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  private handleBodyScroll(disable: boolean): void {
    if (this.isBrowser) {
      const body = document.body;
      if (disable) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = '';
      }
    }
  }

  get modalClasses(): string {
    return `modal modal--${this.size} modal--${this.position}`;
  }
}