export interface Appointment {
    id: number;
    scheduledDateTime: Date; // ISO string
    customerId: number;
    vehicleId: number;
    estimatedDurationMinutes: number;
    status: AppointmentStatus;
    description?: string;
    customerNotes?: string;
  
  }

  export enum AppointmentStatus
    {
        Scheduled = 1,
        Confirmed = 2,
        InProgress = 3,
        Completed = 4,
        Cancelled = 5,
        NoShow = 6
    }