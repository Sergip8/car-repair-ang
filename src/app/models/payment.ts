export interface Payment {
    id: number;
    invoiceId: number;
    amount: number;
    date: string;
    method: string;
  }