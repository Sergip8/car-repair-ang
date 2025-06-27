import { Component, OnDestroy, OnInit } from '@angular/core';
import { finalize, Subject, takeUntil } from 'rxjs';
import { CategoryService } from '../../../../_core/services/category-service.service';
import { ServiceRequest } from '../../../models/service';
import { StateService } from '../../../../_core/services/state.service';
import { CardData } from '../../components/card/card.component';
import { BrandService } from '../../../../_core/services/brand.service';
import { Brand } from '../../../models/brand';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit , OnDestroy{

  private destroy$ = new Subject<void>();
  private currentCategoryRequest: any = null;
  private currentBrandRequest: any = null;
  homeServices: CardData[] = [];
  homeBrands: CardData[] = [];
  error: string | null = null;
  loading = false;


  constructor(private categoryService: CategoryService, private brandService: BrandService) { }

  ngOnInit(): void {
    this.getHomeServices();
    this.getHomeBrands();
  }

  getHomeServices() {
    this.currentCategoryRequest = this.categoryService.gethomeServices()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.setLoading(false))
      )
      .subscribe({
        next: (response: ServiceRequest[]) => {
          this.homeServices = response.map(res => ({
            id: res.id,
            title: res.name,
            description: res.description,
            price: res.price,
            subtitle: res.categoryName
          }));
          this.currentCategoryRequest = null;
        },
        error: (error) => {
          this.currentCategoryRequest = null;
        }
      });
  }

 getHomeBrands() {
  this.currentBrandRequest = this.brandService.gethomeBrands()
    .pipe(
      takeUntil(this.destroy$),
      finalize(() => this.setLoading(false))
    )
    .subscribe({
      next: (response: Brand[]) => {
        console.log("line 67: ", response);
        this.homeBrands = response.map(res => ({
          id: res.id,
          title: res.title,
          imageUrl: res.imageUrl
        }));
        this.currentBrandRequest = null;
      },
      error: (error) => {
        this.currentBrandRequest = null;
      }
    });
}


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    // Cancelar request pendiente
    if (this.currentCategoryRequest) {
      this.currentCategoryRequest.unsubscribe();
    }
    if (this.currentBrandRequest) {
      this.currentBrandRequest.unsubscribe();
    }
  }

  private setLoading(loading: boolean): void {
    this.loading = loading;
    if (loading) {
      this.error = null;
    }
  }
}
