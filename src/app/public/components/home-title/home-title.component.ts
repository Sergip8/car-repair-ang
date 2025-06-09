import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-title',
  imports: [NgFor, NgIf],
  templateUrl: './home-title.component.html',
  styleUrl: './home-title.component.scss'
})
export class HomeTitleComponent {
 
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() alignment: 'left' | 'center' | 'right' = 'center';
  @Input() variant: 'primary' | 'secondary' | 'accent' | 'gradient' = 'primary';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() showIcon: boolean = false;
  @Input() icon: string = '🔧'; // Emoji por defecto para tema automotriz
  @Input() animated: boolean = true;
  @Input() underlineStyle: 'solid' | 'gradient' | 'dotted' | 'animated' = 'gradient';

  get titleClasses(): string {
    return [
      'section-title',
      `section-title--${this.alignment}`,
      `section-title--${this.variant}`,
      `section-title--${this.size}`,
      `section-title--underline-${this.underlineStyle}`,
      this.animated ? 'section-title--animated' : ''
    ].filter(Boolean).join(' ');
  }
}
