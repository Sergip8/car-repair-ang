import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { AdminSidebarComponent } from './layouts/admin-sidebar/admin-sidebar.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';

import { BaseChartDirective } from 'ng2-charts';
import { AdminCustomerComponent } from './pages/registers/admin-customer/admin-customer.component';
import { GenericFormComponent } from '../../shared/components/form/form.component';
import { TableComponent } from '../../shared/components/table/table.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';





@NgModule({

  declarations: [
   AdminComponent, AdminDashboardComponent, AdminCustomerComponent
  
    
  ],
  imports: [
    CommonModule,
    AdminSidebarComponent,
    AdminRoutingModule,
    BaseChartDirective,
    GenericFormComponent,
    TableComponent,
    ModalComponent
  ],
 
 
})
export class AdminModule { }