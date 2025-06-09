import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export type CardType = 'categoria' | 'servicio' | 'parte' | 'marca';
export type CardLayout = 'vertical' | 'horizontal';
export type CardImageType = 'none' | 'image' | 'icon';

export interface CardData {
  id?: string | number;
  title: string;
  subtitle?: string;
  description?: string;
  price?: number;
  originalPrice?: number;
  imageUrl?: string;
  iconName?: string;
  badge?: string;
  tags?: string[];
  available?: boolean;
  rating?: number;
  reviewCount?: number;
}

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() type: CardType = 'servicio';
  @Input() layout: CardLayout = 'vertical';
  @Input() imageType: CardImageType = 'image';
  @Input() data: CardData = {
    title: 'Título del Card',
    description: 'Descripción del servicio o producto'
  };
  @Input() clickable: boolean = true;
  @Input() showPrice: boolean = true;
  @Input() showRating: boolean = false;
  @Input() customClass: string = '';

  onCardClick(): void {
    if (this.clickable) {
      // Emit event or handle click logic
      console.log('Card clicked:', this.data);
    }
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  }
}