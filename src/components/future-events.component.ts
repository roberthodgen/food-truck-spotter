import {Component, Input, OnChanges, SimpleChanges} from '@angular/core'
import {NavController} from 'ionic-angular';

import { FoodTruckEvent } from '../types/food-truck-event';
import {EventPage} from '../pages/event/event';

@Component({
  selector: 'future-events',
  templateUrl: './future-events.component.html'
})
export class FutureEvents implements OnChanges {
  @Input() public events: FoodTruckEvent[];

  constructor (private navCtrl: NavController) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.events) return;
    const now = new Date();
    this.events = this.events.filter(({start}) => new Date(start) > now);
  }

  eventSelected({id}: FoodTruckEvent) {
    this.navCtrl.push(EventPage, {id});
  }
}
