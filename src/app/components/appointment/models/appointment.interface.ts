export interface Appointment {
  id: string;
  title: string;
  date: Date;
  description?: string;
  duration?: number;
}
