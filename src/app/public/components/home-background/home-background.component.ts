import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, PLATFORM_ID, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home-background',
  imports: [],
  templateUrl: './home-background.component.html',
  styleUrl: './home-background.component.scss'
})
export class HomeBackgroundComponent {
  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private particlesArray: Particle[] = [];
  private partTypes = ['gear', 'wrench', 'sparkplug'];
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.setCanvasSize();
    this.init();
    this.animate();
  }

  @HostListener('window:resize')
  onResize() {
    this.setCanvasSize();
    this.init();
  }

  private setCanvasSize(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  public drawGear(x: number, y: number, size: number, rotation: number, color: string) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();

    const teeth = 8;
    const innerRadius = size * 0.5;
    const outerRadius = size;

    // Se necesitan 4 vértices por diente para crear una superficie plana:
    // dos en el radio exterior (la cara del diente) y dos en el radio interior (el valle).
    const totalVertices = teeth * 4;
    const angleStep = (Math.PI * 2) / totalVertices;

    for (let i = 0; i < totalVertices; i++) {
  
      const radius = (i % 4 < 2) ? outerRadius : innerRadius;
      const angle = i * angleStep;
      
      const pointX = radius * Math.cos(angle);
      const pointY = radius * Math.sin(angle);

      // Mueve el cursor al primer punto, luego dibuja líneas hacia los siguientes.
      if (i === 0) {
        ctx.moveTo(pointX, pointY);
      } else {
        ctx.lineTo(pointX, pointY);
      }
    }

    ctx.closePath(); // Cierra la forma para conectar el último punto con el primero.
    ctx.stroke();

    // Dibuja el círculo central (esta parte no cambió).
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.restore();
}

  public drawWrench(x: number, y: number, size: number, rotation: number, color: string) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    // Mango
    const radius = size * 0.2;
    ctx.beginPath();
    ctx.moveTo(-size * 1.5 + radius, -size * 0.2);
    ctx.lineTo(size * 1.5 - radius, -size * 0.2);
    ctx.quadraticCurveTo(size * 1.5, -size * 0.2, size * 1.5, -size * 0.2 + radius);
    ctx.lineTo(size * 1.5, size * 0.2 - radius);
    ctx.quadraticCurveTo(size * 1.5, size * 0.2, size * 1.5 - radius, size * 0.2);
    ctx.lineTo(-size * 1.5 + radius, size * 0.2);
    ctx.quadraticCurveTo(-size * 1.5, size * 0.2, -size * 1.5, size * 0.2 - radius);
    ctx.lineTo(-size * 1.5, -size * 0.2 + radius);
    ctx.quadraticCurveTo(-size * 1.5, -size * 0.2, -size * 1.5 + radius, -size * 0.2);
    ctx.closePath();
    ctx.stroke();

    // Cabeza
    ctx.beginPath();
    ctx.moveTo(size * 1.3, -size * 0.5);
    ctx.lineTo(size * 1.8, -size * 0.2);
    ctx.lineTo(size * 1.8, size * 0.2);
    ctx.lineTo(size * 1.3, size * 0.5);
    ctx.closePath();
    ctx.stroke();

    ctx.restore();
  }

  public drawSparkPlug(x: number, y: number, size: number, rotation: number, color: string) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.strokeRect(-size * 0.2, -size * 1.8, size * 0.4, size * 0.5);
    ctx.beginPath();
    ctx.moveTo(-size * 0.4, -size * 1.3);
    ctx.lineTo(-size * 0.4, size * 0.5);
    ctx.lineTo(size * 0.4, size * 0.5);
    ctx.lineTo(size * 0.4, -size * 1.3);
    ctx.stroke();
    for (let i = 0; i < 4; i++) {
      ctx.strokeRect(-size * 0.5, size * 0.6 + i * size * 0.2, size, size * 0.1);
    }
    ctx.strokeRect(-size * 0.1, size * 1.4, size * 0.2, size * 0.4);
    ctx.restore();
  }

  private init(): void {
    const canvas = this.canvasRef.nativeElement;
    this.particlesArray = [];
    const num = (canvas.width * canvas.height) / 25000;
    for (let i = 0; i < num; i++) {
      const size = Math.random() * 10 + 10;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const dx = (Math.random() * 0.4) - 0.2;
      const dy = (Math.random() * 0.4) - 0.2;
      const type = this.partTypes[Math.floor(Math.random() * this.partTypes.length)];
      this.particlesArray.push(new Particle(x, y, dx, dy, size, type, this));
    }
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.particlesArray.forEach(p => p.update());
    //this.connect();
  }

  private connect(): void {
    for (let a = 0; a < this.particlesArray.length; a++) {
      for (let b = a + 1; b < this.particlesArray.length; b++) {
        const dx = this.particlesArray[a].x - this.particlesArray[b].x;
        const dy = this.particlesArray[a].y - this.particlesArray[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 250) {
          const opacity = 1 - (distance / 250);
          this.ctx.strokeStyle = `rgba(200, 200, 200, ${opacity})`;
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particlesArray[a].x, this.particlesArray[a].y);
          this.ctx.lineTo(this.particlesArray[b].x, this.particlesArray[b].y);
          this.ctx.stroke();
        }
      }
    }
  }
}

class Particle {
  rotation = Math.random() * Math.PI * 2;
  rotationSpeed = (Math.random() - 0.5) * 0.02;
  color: string;

  constructor(
    public x: number,
    public y: number,
    public dx: number,
    public dy: number,
    public size: number,
    public type: string,
    private parent: HomeBackgroundComponent
  ) {
    const gray = Math.floor(Math.random() * 55 + 150);
    this.color = `rgb(${110},${gray},${gray})`;
  }

  update() {
    const canvas = this.parent.canvasRef.nativeElement;

    if (this.x > canvas.width + this.size || this.x < -this.size) {
      this.dx = -this.dx;
    }
    if (this.y > canvas.height + this.size || this.y < -this.size) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.rotation += this.rotationSpeed;

    switch (this.type) {
      case 'gear':
        this.parent.drawGear(this.x, this.y, this.size, this.rotation, this.color);
        break;
      case 'wrench':
        this.parent.drawWrench(this.x, this.y, this.size, this.rotation, this.color);
        break;
      case 'sparkplug':
        this.parent.drawSparkPlug(this.x, this.y, this.size, this.rotation, this.color);
        break;
    }
  }
}