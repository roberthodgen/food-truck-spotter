import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {FoodTruckEvent} from '../types/food-truck-event';

@Injectable()
export class EventService {
  private apiUrl = 'https://food-truck-spotter.appspot.com/api/events';
  private events: FoodTruckEvent[];

  constructor(private http: Http) {
  }

  /**
   * Gets FoodTruckEvent objects from the API.
   * Attempts to cache within this session only.
   */
  getEvents(): Promise<FoodTruckEvent[]> {
    if (this.events) {
      return Promise.resolve(this.events);
    }

    return this.http.get(this.apiUrl)
      .toPromise()
      .then((response) => response.json() as FoodTruckEvent[])
      .then((events) => this.events = events)
      .catch(this.errorHandler)
  }

  getEvent(id: string): Promise<FoodTruckEvent> {
    return this.getEvents()
      .then((events) => events.find((event) => event.id === id));
  }

  private errorHandler(error: any): Promise<any> {
    console.warn('DataService error:', error);
    return Promise.reject(error.message || error);
  }
}
