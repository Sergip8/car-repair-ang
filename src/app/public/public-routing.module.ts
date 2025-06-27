import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { PublicRoutes } from "./public.routes";
import { NgModule } from "@angular/core";
import { HomeServicesComponent } from "./pages/home-services/home-services.component";
import { HomeContactComponent } from "./pages/home-contact/home-contact.component";
import { LoginComponent } from "./pages/auth/login/login.component";
import { RegisterComponent } from "./pages/auth/register/register.component";
import { HomeProfileComponent } from "./pages/home-profile/home-profile.component";
import { HomeVehiclesComponent } from "./pages/home-vehicles/home-vehicles.component";
import { HomeAppointmentComponent } from "./pages/home-profile/home-appointment/home-appointment.component";


const routes: Routes = [

    {
      path: PublicRoutes.Home,
      title: 'Home',
      component: HomeComponent,
    },
    {
      path: PublicRoutes.Services,
      title: 'Home',
      component: HomeServicesComponent,
    },
    {
      path: PublicRoutes.Contact,
      title: 'Home',
      component: HomeContactComponent,
    },
    {
      path: PublicRoutes.Login,
      title: 'Login',
      component: LoginComponent,
    },
    {
      path: PublicRoutes.Register,
      title: 'Register',
      component: RegisterComponent,
    },
    {
      path: PublicRoutes.Profile,
      title: 'Profile',
      component: HomeProfileComponent,
    },
      {
      path: PublicRoutes.Vehicles,
      title: 'Vehicles',
      component: HomeVehiclesComponent,
    },
    {
      path: PublicRoutes.Appointments,
      title: 'Appointments',
      component: HomeAppointmentComponent,
    },
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
export class PublicRoutingModule {}