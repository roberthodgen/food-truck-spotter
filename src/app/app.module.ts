import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MenuPage } from '../pages/menu/menu';
import { EventPage } from '../pages/event/event';

import { FutureEvents } from '../components/future-events.component';
import { CurrentEvent } from '../components/current-event.component';
import { EventDetails } from '../components/event-details.component';
import { MapView } from '../components/map-view/map-view.component';

import { EventService } from '../providers/event.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuPage,
    EventPage,
    FutureEvents,
    CurrentEvent,
    EventDetails,
    MapView
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuPage,
    EventPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EventService
  ]
})
export class AppModule {}
