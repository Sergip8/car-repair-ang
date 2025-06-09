import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { HomeTitleComponent } from "../../components/home-title/home-title.component";

@Component({
  selector: 'app-why-choose-us',
  imports: [NgFor, HomeTitleComponent],
  templateUrl: './why-choose-us.component.html',
  styleUrls: ['./why-choose-us.component.scss']
})
export class WhyChooseUsComponent {
  
  reasons = [
    {
      icon: '🔧',
      title: 'Experiencia Comprobada',
      description: 'Más de 15 años de experiencia en reparación de automóviles con técnicos certificados.'
    },
    {
      icon: '⚡',
      title: 'Servicio Rápido',
      description: 'Diagnóstico preciso y reparaciones eficientes para que vuelvas a la carretera pronto.'
    },
    {
      icon: '💎',
      title: 'Calidad Garantizada',
      description: 'Utilizamos repuestos originales y ofrecemos garantía en todos nuestros servicios.'
    },
    {
      icon: '💰',
      title: 'Precios Justos',
      description: 'Tarifas competitivas sin costos ocultos. Presupuesto gratuito y transparente.'
    }
  ];

  videoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ'; // Reemplaza con tu URL de video
  mechanicImage = 'assets/images/mechanic-portrait.jpg'; // Reemplaza con la ruta de tu imagen

}