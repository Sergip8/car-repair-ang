import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, retry, tap, timeout } from 'rxjs/operators';
import { Customer } from '../../app/models/customer';
import { CacheService } from './cache.service';
import { handleError } from './handler/handle-error';

const baseUrl = 'http://localhost:5167/api/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http: HttpClient, private cacheService: CacheService) {}

  getCustomers(): Observable<Customer[]> {
    const cacheKey = this.cacheService.generateCacheKey(baseUrl);
    const cachedData = this.cacheService.getFromCache<Customer[]>(cacheKey);
    if (cachedData) {
      return of(cachedData);
    }
    this.cacheService.cleanExpiredCache();
    return this.http.get<Customer[]>(baseUrl)
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

  createCustomer(customer: Customer): Observable<Customer> {
    this.cacheService.clearCache(); // Invalidate cache on create
    return this.http.post<Customer>(baseUrl, customer)
      .pipe(
        catchError(handleError)
      );
  }

  updateCustomer(id: number, customer: Customer): Observable<Customer> {
    const url = `${baseUrl}/${id}`;
    this.cacheService.clearCache(); // Invalidate cache on update
    return this.http.put<Customer>(url, customer)
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
