import { Component, Input } from '@angular/core';
import { CardComponent, CardData } from '../../components/card/card.component';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-home-categories',
  imports: [CardComponent, NgFor, NgClass],
  templateUrl: './home-categories.component.html',
  styleUrl: './home-categories.component.scss'
})
export class HomeCategoriesComponent {

  @Input() cardData: CardData[] = [ 
    {
      title: 'Cambio de Aceite',
      subtitle: 'Servicio Premium',
      description: 'Cambio de aceite sintético con filtro incluido. Revisión general del motor.',
      price: 85000,
      originalPrice: 120000,
      imageUrl: '/assets/images/cambio-aceite.jpg',
      badge: 'Popular',
      rating: 4.8,
      reviewCount: 156,
      available: true,
      tags: ['Motor', 'Mantenimiento']
    },
    {
      title: 'Cambio de Aceite',
      subtitle: 'Servicio Premium',
      description: 'Cambio de aceite sintético con filtro incluido. Revisión general del motor.',
      price: 85000,
      originalPrice: 120000,
      imageUrl: '/assets/images/cambio-aceite.jpg',
      badge: 'Popular',
      rating: 4.8,
      reviewCount: 156,
      available: true,
      tags: ['Motor', 'Mantenimiento']
    },
    {
      title: 'Cambio de Aceite',
      subtitle: 'Servicio Premium',
      description: 'Cambio de aceite sintético con filtro incluido. Revisión general del motor.',
      price: 85000,
      originalPrice: 120000,
      imageUrl: '/assets/images/cambio-aceite.jpg',
      badge: 'Popular',
      rating: 4.8,
      reviewCount: 156,
      available: true,
      tags: ['Motor', 'Mantenimiento']
    },
    {
      title: 'Cambio de Aceite',
      subtitle: 'Servicio Premium',
      description: 'Cambio de aceite sintético con filtro incluido. Revisión general del motor.',
      price: 85000,
      originalPrice: 120000,
      imageUrl: '/assets/images/cambio-aceite.jpg',
      badge: 'Popular',
      rating: 4.8,
      reviewCount: 156,
      available: true,
      tags: ['Motor', 'Mantenimiento']
    },
    {
      title: 'Cambio de Aceite',
      subtitle: 'Servicio Premium',
      description: 'Cambio de aceite sintético con filtro incluido. Revisión general del motor.',
      price: 85000,
      originalPrice: 120000,
      imageUrl: '/assets/images/cambio-aceite.jpg',
      badge: 'Popular',
      rating: 4.8,
      reviewCount: 156,
      available: true,
      tags: ['Motor', 'Mantenimiento']
    },
   ]
}
