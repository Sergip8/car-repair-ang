export interface ApiRequest<T> {
   success: boolean;
   message: string;
   data: T;
}