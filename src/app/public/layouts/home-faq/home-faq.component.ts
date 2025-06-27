import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';


interface FAQ {
  question: string;
  answer: string;
  isOpen: boolean;
}


@Component({
  selector: 'app-home-faq',
  imports: [ NgFor],
  templateUrl: './home-faq.component.html',
  styleUrl: './home-faq.component.scss'
})
export class HomeFAQComponent {
  faqs: FAQ[] = [
    {
      question: '¿Cuánto tiempo demora una reparación básica?',
      answer: 'El tiempo de reparación depende del tipo de servicio. Los servicios básicos como cambio de aceite toman entre 30-45 minutos, mientras que reparaciones más complejas pueden tomar de 2 a 8 horas o más.',
      isOpen: false
    },
    {
      question: '¿Ofrecen garantía en sus servicios?',
      answer: 'Sí, ofrecemos garantía de 6 meses o 10,000 km en todos nuestros servicios de reparación, y 12 meses en repuestos originales. La garantía cubre defectos de mano de obra y funcionamiento.',
      isOpen: false
    },
    {
      question: '¿Necesito cita previa para el servicio?',
      answer: 'Recomendamos agendar cita previa para garantizar disponibilidad y reducir tiempos de espera. Sin embargo, también atendemos servicios de emergencia sin cita previa según disponibilidad.',
      isOpen: false
    },
    {
      question: '¿Qué métodos de pago aceptan?',
      answer: 'Aceptamos efectivo, tarjetas de débito y crédito (Visa, Mastercard), transferencias bancarias y pagos con códigos QR. También ofrecemos planes de financiamiento para reparaciones mayores.',
      isOpen: false
    },
    {
      question: '¿Trabajan con todas las marcas de vehículos?',
      answer: 'Sí, trabajamos con todas las marcas y modelos de vehículos, desde autos compactos hasta camionetas y vehículos comerciales. Contamos con equipos especializados y técnicos certificados.',
      isOpen: false
    },
    {
      question: '¿Ofrecen servicio de grúa?',
      answer: 'Sí, contamos con servicio de grúa las 24 horas para emergencias. El costo varía según la distancia, pero ofrecemos tarifas preferenciales para nuestros clientes regulares.',
      isOpen: false
    },
    {
      question: '¿Pueden realizar diagnósticos computarizados?',
      answer: 'Contamos con equipos de diagnóstico computarizado de última generación para todos los sistemas del vehículo: motor, transmisión, frenos, suspensión y sistemas eléctricos.',
      isOpen: false
    },
    {
      question: '¿Qué incluye el servicio de mantenimiento preventivo?',
      answer: 'Nuestro servicio incluye: cambio de aceite y filtros, revisión de frenos, suspensión, sistema eléctrico, niveles de fluidos, presión de llantas y diagnóstico general de 25 puntos.',
      isOpen: false
    }
  ];

  toggleFaq(index: number): void {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }
}
