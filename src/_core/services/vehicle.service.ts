import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, retry, tap, timeout } from 'rxjs/operators';
import { Vehicle } from '../../app/models/vehicle';
import { CacheService } from './cache.service';
import { handleError } from './handler/handle-error';
import { PaginationRequest, PaginationResponse } from '../../app/models/pagination';
import { environment } from '../../environments/environment';


const baseUrl = `${environment.apiUrl}/Vehicle`;

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  constructor(private http: HttpClient, private cacheService: CacheService) {}

  getVehicles(): Observable<Vehicle[]> {
    const cacheKey = this.cacheService.generateCacheKey(baseUrl);
    const cachedData = this.cacheService.getFromCache<Vehicle[]>(cacheKey);
    if (cachedData) {
      return of(cachedData);
    }
    this.cacheService.cleanExpiredCache();
    return this.http.get<Vehicle[]>(baseUrl)
      .pipe(
        timeout(10000),
        retry(2),
        tap(data => this.cacheService.setCache(cacheKey, data)),
        catchError(handleError)
      );
  }

  getVehicleById(id: number): Observable<Vehicle> {
    const url = `${baseUrl}/${id}`;
    const cacheKey = this.cacheService.generateCacheKey(url);
    const cachedData = this.cacheService.getFromCache<Vehicle>(cacheKey);
    if (cachedData) {
      return of(cachedData);
    }
    this.cacheService.cleanExpiredCache();
    return this.http.get<Vehicle>(url)
      .pipe(
        timeout(10000),
        retry(2),
        tap(data => this.cacheService.setCache(cacheKey, data)),
        catchError(handleError)
      );
  }

   getVehicleByCustomerId(id: number, pagination: PaginationRequest): Observable<PaginationResponse<Vehicle[]>> {
    const url = `${baseUrl}/customer/${id}`;
    const cacheKey = this.cacheService.generateCacheKey(url, JSON.stringify(pagination));
    const cachedData = this.cacheService.getFromCache<PaginationResponse<Vehicle[]>>(cacheKey);
    if (cachedData) {
      return of(cachedData);
    }
    this.cacheService.cleanExpiredCache();
    return this.http.post<PaginationResponse<Vehicle[]>>(url, pagination) // Updated type to Pagination<Vehicle[]>
      .pipe(
        timeout(10000),
        retry(2),
        tap(data => this.cacheService.setCache(cacheKey, data)),
        catchError(handleError)
      );
  }

  createVehicle(vehicle: Vehicle, imageFile: File): Observable<Vehicle> {
    this.cacheService.clearCache(); // Invalidate cache on create
    const formData = new FormData();
    formData.append('Image', imageFile);
    formData.append('Data', JSON.stringify(vehicle));
    return this.http.post<Vehicle>(baseUrl, formData)
      .pipe(
        catchError(handleError)
      );
  }

  updateVehicle(id: number, vehicle: Vehicle): Observable<Vehicle> {
    const url = `${baseUrl}/${id}`;
    this.cacheService.clearCache(); // Invalidate cache on update
    return this.http.put<Vehicle>(url, vehicle)
      .pipe(
        catchError(handleError)
      );
  }

  deleteVehicle(id: number): Observable<any> {
    const url = `${baseUrl}/${id}`;
    this.cacheService.clearCache(); // Invalidate cache on delete
    return this.http.delete(url)
      .pipe(
        catchError(handleError)
      );
  }
}
