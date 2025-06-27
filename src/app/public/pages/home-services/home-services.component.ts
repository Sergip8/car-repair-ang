import { isPlatformBrowser, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';


interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
  price: string;
  duration: string;
}

@Component({
  selector: 'app-home-services',
  standalone:false,
  templateUrl: './home-services.component.html',
  styleUrl: './home-services.component.scss'
})
export class HomeServicesComponent {
  @ViewChild('backgroundCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  services: Service[] = [
    {
      id: 'mantenimiento',
      title: 'Mantenimiento Preventivo',
      description: 'Servicio completo de mantenimiento para mantener tu vehículo en óptimas condiciones y prevenir averías costosas.',
      features: [
        'Cambio de aceite y filtros',
        'Revisión de frenos y suspensión',
        'Diagnóstico computarizado',
        'Inspección de 25 puntos',
        'Revisión de fluidos'
      ],
      icon: '🔧',
      price: 'Desde $89.000',
      duration: '2-3 horas'
    },
    {
      id: 'motor',
      title: 'Reparación de Motor',
      description: 'Diagnóstico y reparación especializada de motores con tecnología de punta y repuestos originales.',
      features: [
        'Diagnóstico computarizado avanzado',
        'Reparación de sistema de inyección',
        'Cambio de componentes internos',
        'Pruebas de rendimiento',
        'Garantía extendida'
      ],
      icon: '⚙️',
      price: 'Desde $350.000',
      duration: '1-3 días'
    },
    {
      id: 'transmision',
      title: 'Sistema de Transmisión',
      description: 'Reparación y mantenimiento de transmisiones automáticas y manuales con equipos especializados.',
      features: [
        'Cambio de aceite de transmisión',
        'Reparación de embrague',
        'Diagnóstico de caja automática',
        'Rectificación de discos',
        'Ajustes de sincronización'
      ],
      icon: '⚡',
      price: 'Desde $280.000',
      duration: '4-8 horas'
    },
    {
      id: 'frenos',
      title: 'Sistema de Frenos',
      description: 'Mantenimiento y reparación completa del sistema de frenos para garantizar tu seguridad en la carretera.',
      features: [
        'Cambio de pastillas y discos',
        'Revisión de líquido de frenos',
        'Calibración de freno de mano',
        'Pruebas de frenado',
        'Mantenimiento ABS'
      ],
      icon: '🛑',
      price: 'Desde $120.000',
      duration: '1-2 horas'
    },
    {
      id: 'suspension',
      title: 'Suspensión y Dirección',
      description: 'Reparación y calibración de sistemas de suspensión y dirección para una conducción cómoda y segura.',
      features: [
        'Cambio de amortiguadores',
        'Alineación y balanceo',
        'Reparación de cremallera',
        'Cambio de terminales',
        'Calibración de geometría'
      ],
      icon: '🚗',
      price: 'Desde $150.000',
      duration: '2-4 horas'
    },
    {
      id: 'electrico',
      title: 'Sistema Eléctrico',
      description: 'Diagnóstico y reparación de sistemas eléctricos y electrónicos con equipos de última generación.',
      features: [
        'Diagnóstico computarizado completo',
        'Reparación de alternador y motor de arranque',
        'Sistema de luces y señales',
        'Instalación de accesorios',
        'Reparación de ECU'
      ],
      icon: '🔌',
      price: 'Desde $80.000',
      duration: '1-6 horas'
    }
  ];

  selectedService: Service | null = null;
  isBrowser: boolean;


  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.selectedService = this.services[0];
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return
    this.drawCanvasBackground();
  }

  selectService(service: Service): void {
    this.selectedService = service;
  }

  private drawCanvasBackground(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Colors from our palette
    const colors = {
      primary: '#001244',
      secondary: '#d2b48c',
      accent: '#3b82f6',
      light: '#f8f9fa'
    };

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, colors.light);
    gradient.addColorStop(0.5, '#ffffff');
    gradient.addColorStop(1, colors.light);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw geometric shapes
    this.drawGeometricShapes(ctx, canvas.width, canvas.height, colors);
  }

  private drawGeometricShapes(ctx: CanvasRenderingContext2D, width: number, height: number, colors: any): void {
    // Large circle - top right
    ctx.beginPath();
    ctx.arc(width * 0.85, height * 0.15, 120, 0, Math.PI * 2);
    ctx.fillStyle = this.hexToRgba(colors.secondary, 0.1);
    ctx.fill();

    // Medium circle - bottom left
    ctx.beginPath();
    ctx.arc(width * 0.15, height * 0.85, 80, 0, Math.PI * 2);
    ctx.fillStyle = this.hexToRgba(colors.accent, 0.08);
    ctx.fill();

    // Triangular shapes
    ctx.beginPath();
    ctx.moveTo(width * 0.1, height * 0.3);
    ctx.lineTo(width * 0.25, height * 0.2);
    ctx.lineTo(width * 0.2, height * 0.45);
    ctx.closePath();
    ctx.fillStyle = this.hexToRgba(colors.primary, 0.05);
    ctx.fill();

    // Hexagon - center right
    const hexX = width * 0.9;
    const hexY = height * 0.6;
    const hexRadius = 60;
    
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const x = hexX + hexRadius * Math.cos(angle);
      const y = hexY + hexRadius * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = this.hexToRgba(colors.secondary, 0.06);
    ctx.fill();

    // Curved lines
    ctx.beginPath();
    ctx.moveTo(0, height * 0.7);
    ctx.quadraticCurveTo(width * 0.3, height * 0.5, width * 0.6, height * 0.8);
    ctx.strokeStyle = this.hexToRgba(colors.accent, 0.15);
    ctx.lineWidth = 3;
    ctx.stroke();

    // Dotted pattern
    for (let i = 0; i < 15; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const radius = Math.random() * 3 + 1;
      
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = this.hexToRgba(colors.primary, 0.1);
      ctx.fill();
    }
  }

  private hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

}
