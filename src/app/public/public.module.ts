import { NgModule } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { PublicComponent } from "./public.component";
import { PublicHeaderComponent } from "./layouts/public-header/public-header.component";
import { HeroComponent } from "./layouts/hero/hero.component";
import { PublicRoutingModule } from "./public-routing.module";
import { HomeBackgroundComponent } from "./components/home-background/home-background.component";
import { PublicFooterComponent } from "./layouts/public-footer/public-footer.component";
import { HomeCategoriesComponent } from "./layouts/home-categories/home-categories.component";
import { HomeBrandsComponent } from "./layouts/home-brands/home-brands.component";
import { WhyChooseUsComponent } from "./layouts/why-choose-us/why-choose-us.component";
import { HomeTitleComponent } from "./components/home-title/home-title.component";
import { HomeFAQComponent } from "./layouts/home-faq/home-faq.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HomeServicesComponent } from "./pages/home-services/home-services.component";
import { HomeContactComponent } from "./pages/home-contact/home-contact.component";
import { CommonModule } from "@angular/common";
import { RegisterComponent } from "./pages/auth/register/register.component";
import { LoginComponent } from "./pages/auth/login/login.component";
import { AuthModule } from "./pages/auth/auth.module";
import { HomeProfileComponent } from "./pages/home-profile/home-profile.component";
import { HomeVehiclesComponent } from "./pages/home-vehicles/home-vehicles.component";
import { GenericFormComponent } from "../../shared/components/form/form.component";
import { UploadImageComponent } from "../../shared/components/upload-image/upload-image.component";
import { TableComponent } from "../../shared/components/table/table.component";
import { AlertComponent } from "../../shared/components/alert/alert.component";
import { HomeAppointmentComponent } from "./pages/home-profile/home-appointment/home-appointment.component";
@NgModule({
    declarations: [PublicComponent, HomeComponent, HomeServicesComponent, HomeContactComponent, HomeProfileComponent, HomeVehiclesComponent, HomeAppointmentComponent],
    imports: [
    PublicRoutingModule,
    PublicHeaderComponent,
    HeroComponent,
    RouterOutlet,
    HomeBackgroundComponent,
    PublicFooterComponent,
    HomeCategoriesComponent,
    HomeBrandsComponent,
    WhyChooseUsComponent,
    HomeTitleComponent,
    HomeFAQComponent,
    ReactiveFormsModule,
    CommonModule,
    AuthModule,
    GenericFormComponent,
    UploadImageComponent,
    TableComponent,
    AlertComponent
]
  })
  export class PublicModule {}