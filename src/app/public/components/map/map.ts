export class Marker {
    lat: number;
    lon: number;
  
    content?: MarkerPopupContent;
  
    constructor(lat: number, lon: number, content?: MarkerPopupContent) {
      this.lat = lat;
      this.lon = lon;
      this.content = content;
    }
  }
  
  export class MarkerPopupContent {
    title: String;
  
    content: String;
  
    constructor(title: String, content: String) {
      this.title = title;
      this.content = content;
    }
  }