import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, retry, tap, timeout } from 'rxjs/operators';
import { Customer } from '../../app/models/customer';
import { CacheService } from './cache.service';
import { handleError } from './handler/handle-error';
import { environment } from '../../environments/environment';
import { PaginationRequest, PaginationResponse } from '../../app/models/pagination';
import { ApiRequest } from '../../app/models/api-request';

const baseUrl = `${environment.apiUrl}/Customer`;

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http: HttpClient, private cacheService: CacheService) {}

  getCustomers(pagination: PaginationRequest): Observable<PaginationResponse<Customer[]>> {
    const cacheKey = this.cacheService.generateCacheKey(baseUrl+"/Paginated");
    const cachedData = this.cacheService.getFromCache<PaginationResponse<Customer[]>>(cacheKey);
    if (cachedData) {
      return of(cachedData);
    }
    this.cacheService.cleanExpiredCache();
    return this.http.post<PaginationResponse<Customer[]>>(baseUrl+"/Paginated", pagination)
      .pipe(
        timeout(10000),
        retry(2),
        tap(data => this.cacheService.setCache(cacheKey, data)),
        catchError(handleError)
      );
  }

  getCustomerById(id: number): Observable<Customer> {
    const url = `${baseUrl}/${id}`;
    const cacheKey = this.cacheService.generateCacheKey(url);
    const cachedData = this.cacheService.getFromCache<Customer>(cacheKey);
    if (cachedData) {
      return of(cachedData);
    }
    this.cacheService.cleanExpiredCache();
    return this.http.get<Customer>(url)
      .pipe(
        timeout(10000),
        retry(2),
        tap(data => this.cacheService.setCache(cacheKey, data)),
        catchError(handleError)
      );
  }

  createCustomer(customer: Customer): Observable<ApiRequest<Customer>> {
    this.cacheService.clearCache(); // Invalidate cache on create
    return this.http.post<ApiRequest<Customer>>(baseUrl, customer)
      .pipe(
        catchError(handleError)
      );
  }

  updateCustomer(id: number, customer: Customer): Observable<ApiRequest<Customer>> {
    const url = `${baseUrl}/${id}`;
    this.cacheService.clearCache();
    return this.http.put<ApiRequest<Customer>>(url, customer)
      .pipe(
        catchError(handleError)
      );
  }

  deleteCustomer(id: number): Observable<any> {
    const url = `${baseUrl}/${id}`;
    this.cacheService.clearCache(); // Invalidate cache on delete
    return this.http.delete(url)
      .pipe(
        catchError(handleError)
      );
  }
}
