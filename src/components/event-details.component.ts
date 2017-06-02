import {Component, Input} from '@angular/core'

@Component({
  selector: 'event-details',
  templateUrl: './event-details.component.html'
})
export class EventDetails {
  @Input() public event: Event;
}
