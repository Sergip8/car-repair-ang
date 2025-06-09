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
@NgModule({
    declarations: [PublicComponent, HomeComponent],
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
    HomeFAQComponent
]
  })
  export class PublicModule {}