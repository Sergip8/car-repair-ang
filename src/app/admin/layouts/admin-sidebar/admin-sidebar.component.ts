import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  imports: [NgIf, NgFor],
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {

    isRegistrosExpanded = false;

  // ... tus métodos existentes

  toggleRegistrosMenu(): void {
    if (!this.isCollapsed) {
      this.isRegistrosExpanded = !this.isRegistrosExpanded;
    } else {
      // En modo colapsado, mostrar el menú temporalmente
      this.isRegistrosExpanded = true;
      // Opcional: cerrar después de un tiempo
      setTimeout(() => {
        this.isRegistrosExpanded = false;
      }, 3000);
    }
  }
  
  entitySpaList: string[] = [
    'Clientes',
    'Vehículos',
    'Servicios',
    'Empleados',
    'Citas',
    'Orden de Trabajos',
    'Repuestos',
    'Facturas',
    'Pagos',
    'Roles',
    'Usuarios',
    'Marcas'
  ];
  
  isCollapsed = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateTo(route: string): void {
    // Convertir el nombre español a ruta en inglés
    const routeMap: { [key: string]: string } = {
      'Dashboard': '/admin/dashboard',
      'Clientes': '/admin/registers/customers',
      'Vehículos': '/admin/registers/vehicles',
      'Servicios': '/admin/registers/services',
      'Empleados': '/admin/registers/employees',
      'Citas': '/admin/registers/appointments',
      'Orden de Trabajos': '/admin/registers/work-orders',
      'Repuestos': '/admin/registers/parts',
      'Facturas': '/admin/registers/invoices',
      'Pagos': '/admin/registers/payments',
      'Roles': '/admin/registers/roles',
      'Usuarios': '/admin/registers/users',
      'Marcas': '/admin/registers/brands'
    };
    this.isRegistrosExpanded = false;

    const targetRoute = routeMap[route] || '/admin/dashboard';
    this.router.navigate([targetRoute]);
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  onSettings(): void {
    this.router.navigate(['/admin/settings']);
  }

  onLogout(): void {
    // Aquí puedes agregar la lógica de logout
    // Por ejemplo: this.authService.logout();
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getIconForEntity(entity: string): string {
    const iconMap: { [key: string]: string } = {
      'Clientes': 'fas fa-users',
      'Vehículos': 'fas fa-car',
      'Servicios': 'fas fa-tools',
      'Empleados': 'fas fa-user-tie',
      'Citas': 'fas fa-calendar-alt',
      'Orden de Trabajos': 'fas fa-clipboard-list',
      'Repuestos': 'fas fa-cogs',
      'Facturas': 'fas fa-file-invoice',
      'Pagos': 'fas fa-credit-card',
      'Roles': 'fas fa-user-shield',
      'Usuarios': 'fas fa-user-cog',
      'Marcas': 'fas fa-tags'
    };
    
    return iconMap[entity] || 'fas fa-circle';
  }
}