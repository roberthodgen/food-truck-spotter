import { Component, Input } from '@angular/core'

import { FoodTruckEvent } from '../../types/food-truck-event';

@Component({
  selector: 'event-details',
  templateUrl: './event-details.component.html'
})
export class EventDetails {
  @Input() public event: FoodTruckEvent;
}
