import {Injectable} from '@angular/core';
import {Http}       from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Event} from '../types/event';

@Injectable()
export class EventService {
  private apiUrl = 'https://food-truck-spotter.appspot.com/api/events';
  private events: Event[];

  constructor(private http: Http) {
  }

  /**
   * Gets Event objects from the API.
   * Attempts to cache within this session only.
   */
  getEvents(): Promise<Event[]> {
    if (this.events) {
      return Promise.resolve(this.events);
    }

    return this.http.get(this.apiUrl)
      .toPromise()
      .then((response) => response.json() as Event[])
      .then((events) => this.events = events)
      .catch(this.errorHandler)
  }

  getEvent(id: string): Promise<Event> {
    return this.getEvents()
      .then((events) => events.find((event) => event.id === id));
  }

  private errorHandler(error: any): Promise<any> {
    console.warn('DataService error:', error);
    return Promise.reject(error.message || error);
  }
}
