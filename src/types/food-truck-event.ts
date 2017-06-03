import { FoodTruckEventLocation } from './food-truck-event-location';

export interface FoodTruckEvent {
  id: string;
  name: string;
  description: string;
  created: string;
  updated: string;
  start: string;
  end: string;
  location: FoodTruckEventLocation;
}
