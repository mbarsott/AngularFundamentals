import { Component, Input, OnChanges, inject } from "@angular/core";
import { ISession } from "../shared/index";
import { AuthService } from "../../user/auth.service";
import { VoterService } from "./voter.service";

@Component({
  selector: "session-list",
  templateUrl: "./session-list.component.html"
})
export class SessionListComponent implements OnChanges {
  @Input() sessions: ISession[];
  @Input() filterBy: string;
  @Input() sortBy: string;
  @Input() eventId: number;
  visibleSessions: ISession[] = [];

  constructor(private auth: AuthService, private voterService: VoterService) {}

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (!!this.sessions) {
      this.filterSessions(this.filterBy);
      this.sortBy === "name"
        ? this.visibleSessions.sort(sortByNameAsc)
        : this.visibleSessions.sort(sortByVotesDesc);
    }
  }

  toggleVote(session: ISession) {
    if (this.userHasVoted(session)) {
      this.voterService.deleteVoter(
        this.eventId,
        session,
        this.auth.currentUser.userName
      );
    } else {
      this.voterService.addVoter(
        this.eventId,
        session,
        this.auth.currentUser.userName
      );
    }
    if (this.sortBy === "votes") {
      this.visibleSessions.sort(sortByVotesDesc);
    }
  }

  userHasVoted(session: ISession) {
    return this.voterService.userHasVoted(
      session,
      this.auth.currentUser.userName
    );
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
