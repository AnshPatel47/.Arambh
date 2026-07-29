export interface SelectedDateTime {
  date: Date;
  timeSlot: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  notes: string;
  guests: string[];
}
