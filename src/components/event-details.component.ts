import { Component, Input } from '@angular/core'

import { Event } from '../types/event';

@Component({
  selector: 'event-details',
  templateUrl: './event-details.component.html'
})
export class EventDetails {
  @Input() public event: Event;
}
