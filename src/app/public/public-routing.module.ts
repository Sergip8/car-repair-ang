import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { PublicRoutes } from "./public.routes";
import { NgModule } from "@angular/core";


const routes: Routes = [

    {
      path: PublicRoutes.Home,
      title: 'Home',
      component: HomeComponent,
    },
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
export class PublicRoutingModule {}