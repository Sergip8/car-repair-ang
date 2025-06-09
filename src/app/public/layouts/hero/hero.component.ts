import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
  
  constructor() { }

  onContactClick(): void {
    // Aquí puedes agregar la lógica para el botón de contacto
    console.log('Botón de contacto presionado');
  }

  onServicesClick(): void {
    // Aquí puedes agregar la lógica para ver servicios
    console.log('Ver servicios presionado');
  }
}