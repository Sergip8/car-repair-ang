import { Component, OnInit } from '@angular/core';
import { GenericFormComponent } from "../../../../shared/components/form/form.component";
import { vehicleFormConfig, vehicleTableConfig } from '../../../models/schemas/vehicle.schema.';
import { VehicleService } from '../../../../_core/services/vehicle.service';
import { PaginationRequest } from '../../../models/pagination';
import { Vehicle } from '../../../models/vehicle';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../../../_core/services/auth.service';
import { User } from '../../../models/auth';
import { Pagination } from '../../../../shared/components/pagination/pagination-model';

@Component({
  selector: 'app-home-vehicles',
  standalone: false,
  templateUrl: './home-vehicles.component.html',
  styleUrl: './home-vehicles.component.scss'
})


export class HomeVehiclesComponent implements OnInit {
pageChange(page: number) {
    this.pagination.page = page;
    console.log(`Page changed to: ${page}`);
    if (this.user && this.user.customerId) {
      this.getCustomerVehicles(this.user.customerId);
    }
}
  
  ngOnInit() {
    // Example: Fetch vehicles for a specific customer on component initialization
    const customerId = 1; // Replace with actual customer ID
    if (this.user && this.user.customerId) 
    this.getCustomerVehicles(this.user?.customerId);
  }
  
onUploadError($event: string) {

}
onUploadComplete($event: Event) {

}
onUploadProgress(process: number) {

}
onFilesSelected($event: File[]) {
  this.imageFile = $event[0] || null; // Assuming single file upload

}
public user: User | null = null;
  constructor(private vehicleService: VehicleService, private authService: AuthService) {
 this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });
    

  }

  onFormSubmit(event: any) {

    if (this.imageFile) {
      console.log(event)
      event.Year = new Date().getFullYear();
      this.createVehicle(<Vehicle>event, this.imageFile);
    }
    
  }
  imageFile: File | null = null;
  vehicleSchema = vehicleFormConfig;
  vehicleTableColumns = vehicleTableConfig;
  pagination = new PaginationRequest();
  tableData: Vehicle[] = [];
  paginationData: Pagination = { page: 0, size: 0, count: 0 };

  getCustomerVehicles(customerId: number) {

    this.vehicleService.getVehicleByCustomerId(customerId, this.pagination).subscribe(vehicles => {
      this.tableData = vehicles.content;
      console.log(vehicles);
      this.paginationData.page = vehicles.page;
      this.paginationData.count = vehicles.totalElements;
      this.paginationData.size = vehicles.size;
    });
  }
  createVehicle(vehicle: Vehicle, imageFile: File) {
    this.vehicleService.createVehicle(vehicle, imageFile).subscribe({
      next: (response) => {
        console.log('Vehículo creado exitosamente:', response);
        // Aquí podrías mostrar un mensaje de éxito o redirigir al usuario
      },
      error: (error) => {
        console.error('Error al crear el vehículo:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    });
  }

}