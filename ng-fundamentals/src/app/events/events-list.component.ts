import { Component, OnInit } from "@angular/core";
import { EventService } from "./shared/event.service";
import { ToastrService } from "../common/toastr.service";

@Component({
  // selector: "events-list",
  template: `
    <div>
      <h1>Upcoming Angular Events</h1>
      <hr />
      <!--div class="well">
      <div>Hello World</div>
      </div-->
      <!--event-thumbnail
        (eventClick)="handleEventClicked($event)"
        [event]="event1"
      ></event-thumbnail-->
      <div class="row">
        <div *ngFor="let event of events" class="col-md-5">
          <event-thumbnail #thumbnail (click)="handleThumbnailClick(event.name)" [event]="event"></event-thumbnail>
        </div>
      </div>
      <!--h3>{{thumbnail.someProperty}}</h3>
      <button class="btn btn-primary" (click)="thumbnail.logFoo()">
        Log me some foo
      </button-->
    </div>
  `,
  styles: [
    `
      /* .well div {color: blue;} */
    `
  ]
})
export class EventsListComponent implements OnInit {
  events: any[];
  constructor(private eventService: EventService, private toastr: ToastrService) {}
  ngOnInit() {
    this.events = this.eventService.getEvents();
  }

  handleThumbnailClick(eventName) {
    this.toastr.success(eventName, "Event");
  }

  // handleEventClicked(data) {
  //   console.log("received: ", data);
  // }
}
