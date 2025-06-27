export class PaginationRequest{
 
  page: number = 0;
  size: number = 10;
 query?: string;
 direction?: 'asc' | 'desc';
    sort?: string;
}
export interface PaginationResponse<T> {
    content: T;
    page: number;
    size: number;
    totalPage: number;
    totalElements: number;
    last: boolean;
   
}

