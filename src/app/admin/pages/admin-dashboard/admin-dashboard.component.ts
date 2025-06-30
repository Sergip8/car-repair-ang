import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  standalone: false,
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  // Datos de ejemplo para los gráficos
  ventasMensuales: ChartData<'line'> = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Ventas ($)',
        data: [15000, 22000, 18000, 25000, 30000, 28000],
        borderColor: '#001244',
        backgroundColor: 'rgba(0, 18, 68, 0.1)',
        tension: 0.4
      }
    ]
  };

  serviciosPorTipo: ChartData<'doughnut'> = {
    labels: ['Mantenimiento', 'Reparación', 'Revisión', 'Diagnóstico'],
    datasets: [{
      data: [35, 25, 20, 20],
      backgroundColor: ['#001244', '#d2b48c', '#3b82f6', '#6b7280']
    }]
  };

  vehiculosPorMarca: ChartData<'bar'> = {
    labels: ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan'],
    datasets: [{
      label: 'Cantidad de Vehículos',
      data: [45, 32, 28, 35, 22],
      backgroundColor: ['#001244', '#d2b48c', '#3b82f6', '#6b7280', '#10b981']
    }]
  };

  empleadosPorRol: ChartData<'pie'> = {
    labels: ['Mecánicos', 'Administradores', 'Recepcionistas', 'Supervisores'],
    datasets: [{
      data: [12, 3, 4, 2],
      backgroundColor: ['#001244', '#d2b48c', '#3b82f6', '#6b7280']
    }]
  };

  citasPorEstado: ChartData<'bar'> = {
    labels: ['Pendientes', 'En Proceso', 'Completadas', 'Canceladas'],
    datasets: [{
      label: 'Citas',
      data: [25, 15, 45, 8],
      backgroundColor: ['#ef4444', '#f59e0b', '#10b981', '#6b7280']
    }]
  };

  facturasPorMes: ChartData<'line'> = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Facturas Emitidas',
        data: [120, 140, 110, 160, 180, 170],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4
      },
      {
        label: 'Facturas Pagadas',
        data: [115, 135, 105, 155, 175, 165],
        borderColor: '#001244',
        backgroundColor: 'rgba(0, 18, 68, 0.1)',
        tension: 0.4
      }
    ]
  };

  // Configuraciones de gráficos
  lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      }
    },
    elements: {
      line: {
        tension: 0.4
      }
    }
  };

  doughnutChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right'
      }
    }
  };

  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  // Estadísticas rápidas
  estadisticas = {
    totalClientes: 1245,
    totalVehiculos: 856,
    citasHoy: 23,
    ingresosMes: 125000,
    ordenesAbiertas: 34,
    repuestosStock: 245,
    empleadosActivos: 21,
    facturasPendientes: 12
  };

  constructor() { }

  ngOnInit(): void {
    // Aquí puedes cargar datos reales desde tus servicios
    this.cargarDatos();
  }

  cargarDatos(): void {
    // Método para cargar datos reales desde tus servicios
    // Ejemplo:
    // this.dashboardService.getEstadisticas().subscribe(data => {
    //   this.estadisticas = data;
    // });
  }

  exportarReporte(): void {
    // Lógica para exportar reportes
    console.log('Exportando reporte...');
  }

  actualizarDatos(): void {
    // Lógica para actualizar los datos del dashboard
    this.cargarDatos();
    console.log('Datos actualizados');
  }
}