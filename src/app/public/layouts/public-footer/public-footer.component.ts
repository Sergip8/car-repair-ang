import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MapComponent } from '../../components/map/map.component';
import { Marker } from '../../components/map/map';

@Component({
  selector: 'app-public-footer',
  imports: [NgFor, MapComponent],
  templateUrl: './public-footer.component.html',
  styleUrl: './public-footer.component.scss'
})
export class PublicFooterComponent {
  currentYear = new Date().getFullYear();
  markers = [
    new Marker(4.624335, -74.063644)
    
  ]

  contactInfo = {
    phone: '+57 (1) 234-5678',
    email: 'info@autoreparaciones.com',
    address: 'Calle 123 #45-67, Bogotá, Colombia'
  };

  services = [
    'Mecánica General',
    'Electricidad Automotriz',
    'Frenos y Suspensión',
    'Aire Acondicionado',
    'Pintura y Latonería',
    'Cambio de Aceite'
  ];

  socialLinks = [
    { name: 'Facebook', url: '#', icon: 'fab fa-facebook-f' },
    { name: 'Instagram', url: '#', icon: 'fab fa-instagram' },
    { name: 'WhatsApp', url: '#', icon: 'fab fa-whatsapp' },
    { name: 'Twitter', url: '#', icon: 'fab fa-twitter' }
  ];

  quickLinks = [
    { name: 'Inicio', url: '/' },
    { name: 'Servicios', url: '/servicios' },
    { name: 'Nosotros', url: '/nosotros' },
    { name: 'Contacto', url: '/contacto' },
    { name: 'Citas', url: '/citas' }
  ];
}
