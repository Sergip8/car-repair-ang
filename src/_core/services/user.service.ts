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
import { UserSearch } from '../../app/models/user';

const baseUrl = `${environment.apiUrl}/User`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private cacheService: CacheService) {}


  searchCustomerByEmail(query: string): Observable<UserSearch[]> {
    const url = `${baseUrl}/email/${query}`;
    const cacheKey = this.cacheService.generateCacheKey(url);
    const cachedData = this.cacheService.getFromCache<UserSearch[]>(cacheKey);
    if (cachedData) {
      return of(cachedData);
    }
    this.cacheService.cleanExpiredCache();
    return this.http.get<UserSearch[]>(url)
      .pipe(
        timeout(10000),
        retry(2),
        tap(data => this.cacheService.setCache(cacheKey, data)),
        catchError(handleError)
      );
  }

}
