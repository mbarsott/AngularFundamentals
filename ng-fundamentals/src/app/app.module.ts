import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import {
  EventsListComponent,
  EventThumbnailComponent,
  EventService,
  EventDetailsComponent,
  EventListResolver,
  CreateSessionComponent,
  SessionListComponent,
  UpvoteComponent,
  DurationPipe,
  LocationValidator,
  VoterService,
  EventResolver
} from "./events/index";
import { EventsAppComponent } from "./events-app.component";
import { NavBarComponent } from "./nav/nav-bar.component";
import {
  JQ_TOKEN,
  TOASTR_TOKEN,
  Toastr,
  CollapsibleWellComponent,
  ModalTriggerDirective,
  SimpleModalComponent
} from "./common";
import { appRoutes } from "./routes";
import { CreateEventComponent } from "./events/create-event.component";
import { Error404Component } from "./errors/404.component";
import { AuthService } from "./user/auth.service";

const toastr: Toastr = window["toastr"];
const jQuery = window["$"];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    NavBarComponent,
    CreateEventComponent,
    CreateSessionComponent,
    Error404Component,
    SessionListComponent,
    CollapsibleWellComponent,
    ModalTriggerDirective,
    LocationValidator,
    UpvoteComponent,
    SimpleModalComponent,
    DurationPipe
  ],
  providers: [
    EventService,
    { provide: TOASTR_TOKEN, useValue: toastr },
    { provide: JQ_TOKEN, useValue: jQuery },
    // next line is the same as EventRouteActivator,
    // usefull for using specific class when an interface is requested. Ex:
    // { provide: Logger, useClass: FileLogger },
    // To provide a smaller set of operations:
    // { provide: SmallLoggerClass, useExisting: BigLoggerInterface },
    // To use a factory (with a factory function, see documentation):
    // { provide: Logger, useFactory: Logger },
    EventListResolver,
    EventResolver,
    VoterService,
    AuthService,
    {
      provide: "canDeactivateCreateEvent",
      useValue: checkDirtyState
    }
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule {}

export function checkDirtyState(component: CreateEventComponent) {
  if (component.isDirty) {
    return window.confirm(
      "You have not saved this event, do you really want to cancel?"
    );
  }
  return true;
}
