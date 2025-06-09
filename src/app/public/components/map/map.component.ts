import { AfterViewInit, Component, Input, Inject, PLATFORM_ID, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { isPlatformBrowser } from '@angular/common';

// Importación condicional para Leaflet
import type * as LeafletType from "leaflet";
import { Marker } from "../map/map";

@Component({
  selector: "app-map",
  imports: [],
  template: `
  <div id="map" #mapContainer></div>
  `,
  styles: [`
    #map {
    
      width: 100%;
      height: 100%;
      display: block;
    }
  `]
})
export class MapComponent implements AfterViewInit, OnDestroy {
  isPlatformBrowser = false;
  private map: any; 
  private L!: typeof LeafletType;

  private _markers!: Marker[];
  private mapInitialized = false;
  private resizeObserver?: ResizeObserver;

  @Input()
  set markers(markers: Marker[]) {
    this._markers = markers;
    if (this.mapInitialized && this._markers !== null) {
      this.loadMarkers();
    }
  }
  get markers() {
    return this._markers;
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {
    this.isPlatformBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit(): void {
    if (this.isPlatformBrowser) {
      // Aumentar el timeout para asegurar que el DOM esté completamente renderizado
      setTimeout(() => {
        this.initializeLeaflet().then(() => {
          this.initMap();
        }).catch(error => {
          console.error('Error inicializando Leaflet:', error);
        });
      }, 300);
    }
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    
    if (this.map) {
      this.map.remove();
      this.map = null;
      this.mapInitialized = false;
    }
  }

  private async initializeLeaflet(): Promise<void> {
    try {
      // Usar importación dinámica con múltiples fallbacks
      let leafletModule: any;
      
      try {
        leafletModule = await import('leaflet');
      } catch (e) {
        console.warn('Importación directa de leaflet falló, intentando CDN');
        await this.loadLeafletFromCDN();
        this.L = (window as any).L;
        return;
      }

      // Manejar diferentes estructuras de módulo
      this.L = leafletModule.default || leafletModule;
      
      // Verificar que se cargó correctamente
      if (!this.L?.map) {
        throw new Error('Leaflet no se cargó correctamente');
      }

      // Configurar iconos solo si están disponibles
      this.configureIcons();
      
    } catch (error) {
      console.error("Error al cargar Leaflet:", error);
      throw error;
    }
  }

  private async loadLeafletFromCDN(): Promise<void> {
    return new Promise((resolve, reject) => {
      if ((window as any).L) {
        resolve();
        return;
      }

      // Cargar CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      // Cargar JS
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => {
        // Esperar un poco más para asegurar que Leaflet esté completamente cargado
        setTimeout(() => resolve(), 100);
      };
      script.onerror = () => reject(new Error('Error cargando Leaflet desde CDN'));
      document.head.appendChild(script);
    });
  }

  private configureIcons(): void {
    if (!this.L?.icon) {
      console.warn('L.icon no disponible, saltando configuración de iconos');
      return;
    }

    try {
      const iconDefault = this.L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
      });
      
      if (this.L.Marker?.prototype) {
        this.L.Marker.prototype.options.icon = iconDefault;
      }
    } catch (error) {
      console.warn('Error configurando iconos:', error);
    }
  }

  private initMap(): void {
    if (!this.L?.map || !this.isPlatformBrowser) {
      console.error('Leaflet no está disponible o no estamos en el navegador');
      return;
    }
    
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
    
    const mapElement = document.getElementById('map');
    if (!mapElement) {
      console.error('Elemento del mapa no encontrado');
      return;
    }

    // Verificar que el elemento tenga dimensiones
    const rect = mapElement.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      console.warn('El contenedor del mapa no tiene dimensiones, reintentando...');
      setTimeout(() => this.initMap(), 100);
      return;
    }

    let center: [number, number] = [4.65, -74.1]; 
    let zoom = 17; 
    
    if (this.markers?.length === 1) {
      center = [this.markers[0].lat, this.markers[0].lon];
    }

    try {
      this.map = this.L.map("map", {
        center: center, 
        zoom: zoom,
        zoomControl: true,
        attributionControl: true,
        preferCanvas: false
      });

      const tiles = this.L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          maxZoom: 18,
          minZoom: 3,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }
      );

      tiles.addTo(this.map);

      // Forzar el redibujado del mapa después de que se inicialice
      setTimeout(() => {
        if (this.map) {
          this.map.invalidateSize();
          this.mapInitialized = true;
          
          if (this.markers?.length > 0) {
            this.loadMarkers();
          }
          
          // Configurar observer para redimensionamiento
          this.setupResizeObserver();
        }
      }, 100);

    } catch (e) {
      console.error('Error al inicializar el mapa:', e);
    }
  }

  private setupResizeObserver(): void {
    if (!this.isPlatformBrowser || typeof ResizeObserver === 'undefined') {
      return;
    }

    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    this.resizeObserver = new ResizeObserver((entries) => {
      if (this.map && this.mapInitialized) {
        // Debounce para evitar demasiadas llamadas
        setTimeout(() => {
          if (this.map) {
            this.map.invalidateSize();
          }
        }, 100);
      }
    });

    this.resizeObserver.observe(mapElement);
  }

  private loadMarkers(): void {
    if (!this.mapInitialized || !this.map || !this.L?.marker || !this.isPlatformBrowser) {
      return;
    }

    // Limpiar marcadores existentes
    this.map.eachLayer((layer: any) => {
      if (layer instanceof this.L.Marker) {
        this.map.removeLayer(layer);
      }
    });

    // Añadir nuevos marcadores
    this.markers?.forEach(marker => {
      try {
        const mapMarker = this.L.marker([marker.lat, marker.lon]);
        mapMarker.addTo(this.map);
      } catch (error) {
        console.error('Error añadiendo marcador:', error);
      }
    });

    // Si hay múltiples marcadores, ajustar la vista para mostrarlos todos
    if (this.markers?.length > 1) {
      const group = this.L.featureGroup(
        this.markers.map(marker => this.L.marker([marker.lat, marker.lon]))
      );
      this.map.fitBounds(group.getBounds().pad(0.1));
    }
  }

  // Método público para forzar redibujado (útil si el componente padre cambia de tamaño)
  public invalidateSize(): void {
    if (this.map && this.mapInitialized) {
      setTimeout(() => {
        this.map.invalidateSize();
      }, 0);
    }
  }
}