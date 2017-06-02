import {EventLocation} from "./event-location";

export interface Event {
  id: string;
  name: string;
  description: string;
  created: string;
  updated: string;
  start: string;
  end: string;
  location: EventLocation;
}
