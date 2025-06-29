import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ServiceRequest } from "../../app/models/service";
import { catchError, Observable, of, retry, Subject, take, tap, throwError, timeout } from "rxjs";
import { CacheService } from "./cache.service";
import { handleError } from "./handler/handle-error";
import { environment } from "../../environments/environment";


interface CacheEntry<T> {
    data: T;
    timestamp: number;
    expiry: number;
  }

const baseUrl = `${environment.apiUrl}/`;
  
  @Injectable({
    providedIn: 'root'
  })
  export class CategoryService {
    private cache = new Map<string, CacheEntry<any>>();
    private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutos
   
    constructor(private http: HttpClient, private cacheService: CacheService) { }

   

    gethomeServices(){
        const relativePath = "Service/Home"
        const cacheKey = this.cacheService.generateCacheKey(baseUrl + relativePath);
        const cachedData = this.cacheService.getFromCache<ServiceRequest[]>(cacheKey)
        if (cachedData) {
            return of(cachedData);
        }
        this.cacheService.cleanExpiredCache();
        return this.http.get<ServiceRequest[]>(baseUrl + relativePath)
        .pipe(
            timeout(10000),
            retry(2),
            tap(data => this.cacheService.setCache(cacheKey, data)), // Guardar en caché
            catchError(handleError)
          );
    }

  

  }

  