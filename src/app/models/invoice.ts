export interface Invoice {
    id: number;
    workOrderId: number;
    date: string;
    total: number;
    paid: boolean;
   
  }