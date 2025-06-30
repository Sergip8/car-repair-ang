import { Component, OnInit } from '@angular/core';
import { createCustomerFormConfig, customerTableConfig } from '../../../../models/schemas/customer.schema';
import { CustomerService } from '../../../../../_core/services/customer.service';
import { PaginationRequest } from '../../../../models/pagination';
import { AlertService } from '../../../../../_core/services/alert.service';

@Component({
  selector: 'app-admin-customer',
  standalone: false,
  templateUrl: './admin-customer.component.html',
  styleUrl: './admin-customer.component.scss'
})
export class AdminCustomerComponent implements OnInit {


  tableData: any[] = []; // Aquí deberías definir el tipo de datos correcto
  paginationData = { page: 0, size: 10, count: 0 };
  customerFormSchema = createCustomerFormConfig
  customerTableColumns = customerTableConfig
    pagination = new PaginationRequest();

  constructor(private customerService: CustomerService, private alert: AlertService) {
    
  }

  ngOnInit() {
    
    this.loadCustomers();
  }

  loadCustomers() {
    this.customerService.getCustomers(this.pagination).subscribe({
      next: (response) => {
        this.tableData = response.content; // Asegúrate de que 'data' es la propiedad correcta
        this.paginationData.count = response.totalElements; // Asegúrate de que 'count' es la propiedad correcta
        this.paginationData.page = response.page;
        this.paginationData.size = response.size;
        console.log('Clientes cargados:', this.tableData);
      },
      error: (error) => {
        console.error('Error al cargar los clientes:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    });
  }
  deleteCustomer(id:number){
    this.customerService.deleteCustomer(id).subscribe({
      next: msn => console.log(msn), 
      error: (error) =>  this.alert.error(error.message, 'danger')
      
    })
  }
  onEdit(data: any) {
    console.log(data)
}
onDelete(data: any) {
  this.deleteCustomer(data.id)
}
pageChange($event: number) {
throw new Error('Method not implemented.');
}
onFormSubmit($event: any) {
throw new Error('Method not implemented.');
}
 
}
