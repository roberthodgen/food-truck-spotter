import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import { Event } from '../../shared/event';
import { MenuPage } from '../menu/menu';
import { EventService } from "../../providers/event.service";

@Component({
  selector: 'event-page',
  templateUrl: './event.html'
})
export class EventPage implements OnInit {
  public event: Event;

  constructor(private navCtrl: NavController, private eventService: EventService, private navParams: NavParams) {
  }

  ngOnInit(): void {
    this.eventService.getEvent(this.navParams.get('id'))
      .then((event) => this.event = event);
  }

  goToMenu() {
    this.navCtrl.push(MenuPage);
  }
}
