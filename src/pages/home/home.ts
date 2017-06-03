import {Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';

import { MenuPage } from '../menu/menu';
import { Event } from '../../types/event';
import { EventService } from '../../providers/event.service';

function startCompare(eventA: Event, eventB: Event): number {
  const a = new Date(eventA.start);
  const b = new Date(eventB.start);

  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  }
  return 0;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  public events: Event[];

  constructor(public navCtrl: NavController, private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getEvents()
      .then((events) => this.events = events.sort(startCompare));
  }

  goToMenu() {
    this.navCtrl.push(MenuPage);
  }
}
