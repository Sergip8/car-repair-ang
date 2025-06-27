import { Component } from '@angular/core';
import { appointmentFormConfig, appointmentTableConfig } from '../../../../models/schemas/appointment.schema';
import { Appointment } from '../../../../models/appointment';
import { Pagination } from '../../../../../shared/components/pagination/pagination-model';
import { PaginationRequest } from '../../../../models/pagination';

@Component({
  selector: 'app-home-appointment',
  standalone: false,
  templateUrl: './home-appointment.component.html',
  styleUrl: './home-appointment.component.scss'
})
export class HomeAppointmentComponent {


    appointmentSchema = appointmentFormConfig;
    appointmentTableColumns = appointmentTableConfig;
     pagination = new PaginationRequest();
      tableData: Appointment[] = [];
      paginationData: Pagination = { page: 0, size: 0, count: 0 };
    ngOnInit() {

  }
   onFormSubmit(event: any) {
  

      
      
    }
    pageChange(page: number) {
    this.pagination.page = page;
    console.log(`Page changed to: ${page}`);
    // if (this.user && this.user.customerId) {
    //   this.getCustomerVehicles(this.user.customerId);
    // }
}
  

}
