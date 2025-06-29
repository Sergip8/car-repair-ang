import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ServiceRequest } from "../../app/models/service";
import { catchError, Observable, of, retry, Subject, tap, throwError, timeout } from "rxjs";
import { CacheService } from "./cache.service";
import { handleError } from "./handler/handle-error";
import { Brand } from "../../app/models/brand";
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
  export class BrandService {
    private cache = new Map<string, CacheEntry<any>>();
    private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutos
   
    constructor(private http: HttpClient, private cacheService: CacheService) { }

   

    gethomeBrands(){
        const relativePath = "Brand/Home"
        const cacheKey = this.cacheService.generateCacheKey(baseUrl + relativePath);
        const cachedData = this.cacheService.getFromCache<Brand[]>(cacheKey)
        if (cachedData) {
            return of(cachedData);
        }
        this.cacheService.cleanExpiredCache();
        return this.http.get<Brand[]>(baseUrl + relativePath)
        .pipe(
            timeout(10000), // 10 segundos de timeout
            retry(2), // Reintentar 2 veces en caso de error
            tap(data => this.cacheService.setCache(cacheKey, data)), // Guardar en caché
            catchError(handleError)
          );
    }

  

  }

  