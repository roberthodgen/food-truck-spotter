import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

import { FoodTruckEvent } from '../../types/food-truck-event';
import { NavController } from "ionic-angular";
import { EventPage } from '../../pages/event/event';

@Component({
  selector: 'current-event',
  templateUrl: './current-event.component.html'
})
export class CurrentEvent implements OnChanges {
  @Input() public events: FoodTruckEvent[];
  public event: FoodTruckEvent;

  constructor (private navCtrl: NavController) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.events) return;
    const now = new Date();
    const tmp = this.events.filter((event) => new Date(event.start) < now && new Date(event.end) > now);
    if (tmp && tmp.length > 0) {
      this.event = tmp[0];
    }
  }

  eventSelected({id}: FoodTruckEvent): void {
    this.navCtrl.push(EventPage, {id});
  }
}
