import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminRoutes, ElementRoutes } from './admin.routes';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminCustomerComponent } from './pages/registers/admin-customer/admin-customer.component';
import { AdminPageNotFoundComponent } from './pages/admin-page-not-found/admin-page-not-found.component';




const routes: Routes = [
  {
    path: '',
    redirectTo: AdminRoutes.Dashboard,
    pathMatch: 'full',
  },
  {
    title: 'Dashboard',
    path: AdminRoutes.Dashboard,
    component: AdminDashboardComponent,
  },
  {
      title: 'Registers',
      path: AdminRoutes.Registers,
      children: [
        {
          title: 'Customers',
          path: ElementRoutes.Customers,
          component: AdminCustomerComponent,
        },
        
       
       
      ],
  },

{ path: '**', component: AdminPageNotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}