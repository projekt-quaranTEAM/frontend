import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Proposition } from 'src/app/models/Proposition';
import { PlannerService } from 'src/app/services/planner.service';

@Component({
  selector: 'app-suggestion-list',
  templateUrl: './suggestion-list.component.html',
  styleUrls: ['./suggestion-list.component.css'],
})
export class SuggestionListComponent implements OnInit {
  @Input()
  suggestionList;
  constructor(
    private toastr: ToastrService,
    private plannerService: PlannerService
  ) {}

  ngOnInit(): void {}

  handleClick(propositon: Proposition): void {
    this.toastr.success(propositon.calendarEvent.title, 'Added to calendar');
    this.plannerService.saveProposition(propositon).subscribe();
  }

  sortByName(dir: boolean): void {
    const suggestionListCopy = [...this.suggestionList];
    suggestionListCopy.sort((a, b) =>
      a.calendarEvent.title > b.calendarEvent.title ? 1 : -1
    );
    if (dir === true) {
      this.suggestionList = suggestionListCopy;
    } else {
      suggestionListCopy.reverse();
      this.suggestionList = suggestionListCopy;
    }
  }

  sortByDate(dir: boolean): void {
    const suggestionListCopy = [...this.suggestionList];
    suggestionListCopy.sort((a, b) =>
      a.calendarEvent.start > b.calendarEvent.start ? 1 : -1
    );
    if (dir === true) {
      this.suggestionList = suggestionListCopy;
    } else {
      suggestionListCopy.reverse();
      this.suggestionList = suggestionListCopy;
    }
  }
}
