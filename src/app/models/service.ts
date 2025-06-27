export interface Service {
    id: number;
    name: string;
    description?: string;
    price: number;
    categoryId: number;
  }

  export interface ServiceRequest {
    id: number;
    name: string;
    description?: string;
    price: number;
    categoryName: string;
    categoryId: number;
  }