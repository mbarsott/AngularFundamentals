import { Component, Input, OnChanges } from "@angular/core";
import { ISession } from "../shared/index";

@Component({
  selector: "session-list",
  templateUrl: "./session-list.component.html"
})
export class SessionListComponent implements OnChanges {
  @Input() sessions: ISession[];
  @Input() filterBy: string;
  @Input() sortBy: string;
  visibleSessions: ISession[] = [];

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (!!this.sessions) {
      this.filterSessions(this.filterBy);
      this.sortBy === "name"
        ? this.visibleSessions.sort(sortByNameAsc)
        : this.visibleSessions.sort(sortByVotesDesc);
    }
  }

  filterSessions(filter) {
    if (filter === "all") {
      this.visibleSessions = this.sessions.slice(0);
    } else {
      this.visibleSessions = this.sessions.filter(session => {
        return session.level.toLowerCase() === filter;
      });
    }
  }
}

function sortByNameAsc(left: ISession, right: ISession) {
  if (left.name > right.name) {
    return 1;
  } else if (left.name < right.name) {
    return -1;
  } else {
    return 0;
  }
}

function sortByVotesDesc(left: ISession, right: ISession) {
  return right.voters.length - left.voters.length;
}
