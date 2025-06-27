import { isPlatformBrowser, NgIf} from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../_core/services/auth.service';
import { User } from '../../../models/auth';


interface Car {
  x: number;
  y: number;
  speed: number;
  width: number;
  height: number;
  color: string;
  type: 'sedan' | 'suv' | 'truck' | 'sports';
}

@Component({
  selector: 'app-public-header',
  imports: [NgIf, RouterLink],
  templateUrl: './public-header.component.html',
  styleUrl: './public-header.component.scss'
})
export class PublicHeaderComponent  implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('backgroundCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  isMenuOpen = false;
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private cars: Car[] = [];
  private animationId!: number;
  private resizeTimeout!: any;
  public isBrowser: boolean;
  public user: User | null = null;
  activeSubmenu: string | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, public authService: AuthService) {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    if (!this.isMenuOpen) {
      this.activeSubmenu = null;
    }
  }

  closeMenu(): void {
    this.isMenuOpen = false;
    this.activeSubmenu = null;
  }

  showSubmenu(submenu: string): void {
    // Solo mostrar en desktop (hover)
    if (window.innerWidth > 768) {
      this.activeSubmenu = submenu;
    }
  }

  hideSubmenu(submenu: string): void {
    // Solo ocultar en desktop si no está en móvil
    if (window.innerWidth > 768 && this.activeSubmenu === submenu) {
      this.activeSubmenu = null;
    }
  }

  toggleSubmenu(submenu: string, event: Event): void {
    event.preventDefault();
    
    // En móvil, toggle del submenú
    if (window.innerWidth <= 768) {
      this.activeSubmenu = this.activeSubmenu === submenu ? null : submenu;
    } else {
      // En desktop, ir al enlace principal
      // Aquí puedes manejar la navegación o scroll a la sección
      this.navigateToSection(submenu);
    }
  }

  private navigateToSection(section: string): void {
    // Implementa tu lógica de navegación aquí
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  ngOnInit() {
    // Solo inicializar animaciones en el navegador
    if (this.isBrowser) {
      console.log(this.user)
      // Usar setTimeout para asegurar que el DOM esté listo
      setTimeout(() => {
        this.initCanvas();
      }, 100);
    }
  }

  ngAfterViewInit() {
    if (this.isBrowser && this.canvasRef) {
      this.setupCanvas();
      this.createCars();
      this.animate();
      this.addEventListeners();
    }
  }

  ngOnDestroy() {
    if (this.isBrowser) {
      this.cleanup();
    }
  }



  private initCanvas() {
    // Verificar que el canvas esté disponible
    if (!this.canvasRef?.nativeElement) {
      return;
    }
    this.setupCanvas();
    this.createCars();
    this.animate();
    this.addEventListeners();
  }

  private setupCanvas() {
    if (!this.canvasRef?.nativeElement) return;
    
    this.canvas = this.canvasRef.nativeElement;
    this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d') ;
    
    if (!this.ctx) {
      console.warn('Canvas context not available');
      return;
    }
    
    this.resizeCanvas();
  }

  private addEventListeners() {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.handleResize.bind(this), { passive: true });
    }
  }

  private cleanup() {
    if (this.animationId && typeof cancelAnimationFrame !== 'undefined') {
      cancelAnimationFrame(this.animationId);
    }
    
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.handleResize.bind(this));
    }
    
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
  }

  private resizeCanvas() {
    if (!this.canvas || !this.isBrowser) return;
    
    try {
      const rect = this.canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
      }
    } catch (error) {
      console.warn('Error resizing canvas:', error);
    }
  }

  private handleResize() {
    if (!this.isBrowser) return;
    
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    
    this.resizeTimeout = setTimeout(() => {
      this.resizeCanvas();
      this.createCars(); // Recrear carros para nueva resolución
    }, 100);
  }

  private createCars() {
    if (!this.canvas || !this.isBrowser) return;
    
    this.cars = [];
    const carCount = Math.max(3, Math.floor(this.canvas.width / 200));
    
    const carTypes: Car['type'][] = ['sedan', 'suv', 'truck'];
    const carColors = ['#2563eb', '#7c3aed', '#059669', '#dc2626', '#ea580c'];

    for (let i = 0; i < carCount; i++) {
      this.cars.push({
        x: -100 - (i * 300),
        y: 30 + Math.random() * 20,
        speed: 0.8 + Math.random() * 0.7,
        width: 60 + Math.random() * 20,
        height: 25 + Math.random() * 10,
        color: carColors[Math.floor(Math.random() * carColors.length)],
        type: carTypes[Math.floor(Math.random() * carTypes.length)]
      });
    }
  }

  private drawCar(car: Car) {
    if (!this.ctx) return;
    
    try {
      this.ctx.save();
      this.ctx.globalAlpha = 0.8;
      
      const wheelRadius = car.height * 0.25;
      const shadowOffset = 3;
      
      // Sombra del carro
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      this.ctx.fillRect(car.x + shadowOffset, car.y + car.height + shadowOffset, car.width, 4);
      
      // Cuerpo principal del carro con gradiente
      const gradient = this.ctx.createLinearGradient(car.x, car.y, car.x, car.y + car.height);
      gradient.addColorStop(0, this.lightenColor(car.color, 20));
      gradient.addColorStop(0.5, car.color);
      gradient.addColorStop(1, this.darkenColor(car.color, 20));
      
      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(car.x, car.y, car.width, car.height);
      
      // Borde del carro
      this.ctx.strokeStyle = this.darkenColor(car.color, 30);
      this.ctx.lineWidth = 1;
      this.ctx.strokeRect(car.x, car.y, car.width, car.height);
      
      // Parabrisas con gradiente
      const windshieldGradient = this.ctx.createLinearGradient(
        car.x + car.width * 0.2, car.y - 12,
        car.x + car.width * 0.2, car.y
      );
      windshieldGradient.addColorStop(0, '#3b82f6');
      windshieldGradient.addColorStop(1, '#1e40af');
      
      this.ctx.fillStyle = windshieldGradient;
      this.ctx.fillRect(car.x + car.width * 0.15, car.y - 12, car.width * 0.7, 12);
      
      // Marco del parabrisas
      this.ctx.strokeStyle = '#1f2937';
      this.ctx.lineWidth = 1;
      this.ctx.strokeRect(car.x + car.width * 0.15, car.y - 12, car.width * 0.7, 12);
      
      // Ventanas laterales
      this.ctx.fillStyle = '#1e40af';
      this.ctx.fillRect(car.x + car.width * 0.1, car.y + car.height * 0.1, car.width * 0.15, car.height * 0.4);
      this.ctx.fillRect(car.x + car.width * 0.75, car.y + car.height * 0.1, car.width * 0.15, car.height * 0.4);
      
      // Marcos de ventanas laterales
      this.ctx.strokeStyle = '#1f2937';
      this.ctx.strokeRect(car.x + car.width * 0.1, car.y + car.height * 0.1, car.width * 0.15, car.height * 0.4);
      this.ctx.strokeRect(car.x + car.width * 0.75, car.y + car.height * 0.1, car.width * 0.15, car.height * 0.4);
      
      // Ruedas con más detalle
      const wheel1X = car.x + car.width * 0.2;
      const wheel2X = car.x + car.width * 0.8;
      const wheelY = car.y + car.height;
      
      // Rueda trasera
      this.drawWheel(wheel1X, wheelY, wheelRadius);
      // Rueda delantera
      this.drawWheel(wheel2X, wheelY, wheelRadius);
      
      // Faros delanteros
      const headlightGradient = this.ctx.createRadialGradient(
        car.x + car.width - 1, car.y + car.height * 0.4, 0,
        car.x + car.width - 1, car.y + car.height * 0.4, 8
      );
      headlightGradient.addColorStop(0, '#fff');
      headlightGradient.addColorStop(0.7, '#fbbf24');
      headlightGradient.addColorStop(1, '#f59e0b');
      
      this.ctx.fillStyle = headlightGradient;
      this.ctx.fillRect(car.x + car.width - 3, car.y + car.height * 0.25, 3, car.height * 0.3);
      this.ctx.fillRect(car.x + car.width - 3, car.y + car.height * 0.65, 3, car.height * 0.2);
      
      // Luces traseras
      this.ctx.fillStyle = '#dc2626';
      this.ctx.fillRect(car.x, car.y + car.height * 0.3, 2, car.height * 0.4);
      
      // Manijas de puertas
      this.ctx.fillStyle = '#6b7280';
      this.ctx.fillRect(car.x + car.width * 0.3, car.y + car.height * 0.5, 3, 2);
      this.ctx.fillRect(car.x + car.width * 0.6, car.y + car.height * 0.5, 3, 2);
      
      // Detalles según tipo de carro
      this.drawCarTypeDetails(car);
      
      this.ctx.restore();
    } catch (error) {
      console.warn('Error drawing car:', error);
    }
  }
  
  private drawWheel(x: number, y: number, radius: number) {
    if (!this.ctx) return;
    
    // Llanta (neumático)
    this.ctx.fillStyle = '#1f2937';
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fill();
    
    // Aro
    this.ctx.fillStyle = '#6b7280';
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius * 0.7, 0, Math.PI * 2);
    this.ctx.fill();
    
    // Centro del aro
    this.ctx.fillStyle = '#374151';
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius * 0.3, 0, Math.PI * 2);
    this.ctx.fill();
    
    // Rayos del aro
    this.ctx.strokeStyle = '#4b5563';
    this.ctx.lineWidth = 1;
    for (let i = 0; i < 5; i++) {
      const angle = (i * Math.PI * 2) / 5;
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x + Math.cos(angle) * radius * 0.6, y + Math.sin(angle) * radius * 0.6);
      this.ctx.stroke();
    }
  }
  
  private drawCarTypeDetails(car: Car) {
    if (!this.ctx) return;
    
    if (car.type === 'truck') {
      // Caja del camión con más detalle
      const truckBedGradient = this.ctx.createLinearGradient(
        car.x - car.width * 0.4, car.y + 5,
        car.x - car.width * 0.4, car.y + car.height
      );
      truckBedGradient.addColorStop(0, this.lightenColor(car.color, 10));
      truckBedGradient.addColorStop(1, this.darkenColor(car.color, 10));
      
      this.ctx.fillStyle = truckBedGradient;
      this.ctx.fillRect(car.x - car.width * 0.4, car.y + 5, car.width * 0.4, car.height - 5);
      
      // Borde de la caja
      this.ctx.strokeStyle = this.darkenColor(car.color, 30);
      this.ctx.strokeRect(car.x - car.width * 0.4, car.y + 5, car.width * 0.4, car.height - 5);
      
      // Compuerta trasera
      this.ctx.strokeStyle = '#374151';
      this.ctx.beginPath();
      this.ctx.moveTo(car.x - car.width * 0.4, car.y + car.height * 0.7);
      this.ctx.lineTo(car.x, car.y + car.height * 0.7);
      this.ctx.stroke();
      
    } else if (car.type === 'suv') {
      // Hacer el SUV más alto y robusto
      const suvTopGradient = this.ctx.createLinearGradient(car.x, car.y - 8, car.x, car.y);
      suvTopGradient.addColorStop(0, this.lightenColor(car.color, 15));
      suvTopGradient.addColorStop(1, car.color);
      
      this.ctx.fillStyle = suvTopGradient;
      this.ctx.fillRect(car.x, car.y - 8, car.width, 8);
      
      // Borde superior
      this.ctx.strokeStyle = this.darkenColor(car.color, 30);
      this.ctx.strokeRect(car.x, car.y - 8, car.width, 8);
      
      // Rack del techo
      this.ctx.strokeStyle = '#6b7280';
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.moveTo(car.x + car.width * 0.2, car.y - 8);
      this.ctx.lineTo(car.x + car.width * 0.2, car.y - 10);
      this.ctx.moveTo(car.x + car.width * 0.8, car.y - 8);
      this.ctx.lineTo(car.x + car.width * 0.8, car.y - 10);
      this.ctx.stroke();
      
    } else if (car.type === 'sports') {
      // Carro deportivo más bajo y aerodinámico
      this.ctx.fillStyle = this.darkenColor(car.color, 10);
      this.ctx.fillRect(car.x, car.y + car.height - 3, car.width, 3);
      
      // Spoiler trasero
      this.ctx.fillStyle = '#1f2937';
      this.ctx.fillRect(car.x + car.width * 0.1, car.y - 3, car.width * 0.8, 3);
      
      // Detalles aerodinámicos
      this.ctx.strokeStyle = this.darkenColor(car.color, 40);
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.moveTo(car.x + car.width * 0.3, car.y + car.height * 0.7);
      this.ctx.lineTo(car.x + car.width * 0.7, car.y + car.height * 0.7);
      this.ctx.stroke();
    }
  }
  
  // Funciones auxiliares para colores
  private lightenColor(color: string, percent: number): string {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  }
  
  private darkenColor(color: string, percent: number): string {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = (num >> 8 & 0x00FF) - amt;
    const B = (num & 0x0000FF) - amt;
    return "#" + (0x1000000 + (R > 255 ? 255 : R < 0 ? 0 : R) * 0x10000 +
      (G > 255 ? 255 : G < 0 ? 0 : G) * 0x100 +
      (B > 255 ? 255 : B < 0 ? 0 : B)).toString(16).slice(1);
  }

  private animate() {
    if (!this.ctx || !this.canvas || !this.isBrowser) {
      return;
    }

    try {
      // Limpiar canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      // Dibujar carretera
      this.drawRoad();
      
      // Actualizar y dibujar carros
      this.cars.forEach(car => {
        car.x += car.speed;
        
        // Reiniciar carro cuando sale de pantalla
        if (car.x > this.canvas.width + 100) {
          car.x = -100 - Math.random() * 200;
          car.y = 30 + Math.random() * 20;
        }
        
        this.drawCar(car);
      });
      
      // Continuar animación solo si estamos en el navegador
      if (typeof requestAnimationFrame !== 'undefined') {
        this.animationId = requestAnimationFrame(() => this.animate());
      }
    } catch (error) {
      console.warn('Error in animation loop:', error);
    }
  }

  private drawRoad() {
    if (!this.ctx || !this.canvas) return;
    
    try {
      // Carretera base
      this.ctx.fillStyle = 'rgba(75, 85, 99, 0.3)';
      this.ctx.fillRect(0, 50, this.canvas.width, 40);
      
      // Líneas de carretera
      this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      this.ctx.lineWidth = 2;
      this.ctx.setLineDash([20, 20]);
      
      this.ctx.beginPath();
      this.ctx.moveTo(0, 70);
      this.ctx.lineTo(this.canvas.width, 70);
      this.ctx.stroke();
      
      this.ctx.setLineDash([]);
    } catch (error) {
      console.warn('Error drawing road:', error);
    }
  }
}