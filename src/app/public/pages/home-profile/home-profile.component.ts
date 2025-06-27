import { Component } from '@angular/core';
import { Customer } from '../../../models/customer';
import { CustomerService } from '../../../../_core/services/customer.service';
import { GenericFormComponent } from "../../../../shared/components/form/form.component";
import { createCustomerFormConfig } from '../../../models/schemas/customer.schema';

@Component({
  selector: 'app-home-profile',
  standalone: false,
  templateUrl: './home-profile.component.html',
  styleUrl: './home-profile.component.scss'
})
export class HomeProfileComponent {
onFormSubmit($event: any) {
    const customer: Customer = $event;
    this.createCustomer(customer);
}

  constructor(private customerService: CustomerService) { 
   
  }
  customerSchema = createCustomerFormConfig


  createCustomer(customer: Customer) {
    this.customerService.createCustomer(customer).subscribe({
      next: (response) => {
        console.log('Cliente creado exitosamente:', response);
        // Aquí podrías mostrar un mensaje de éxito o redirigir al usuario
      },
      error: (error) => {
        console.error('Error al crear el cliente:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    });
  }
}
