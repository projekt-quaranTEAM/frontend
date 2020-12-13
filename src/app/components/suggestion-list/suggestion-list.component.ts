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
  ) { }

  ngOnInit(): void { }

  handleClick(propositon: Proposition): void {
    this.toastr.success(
      propositon.calendarEvent.title,
      'Added to calendar'
    );
    this.plannerService
      .saveProposition(propositon)
      .subscribe();
  }
}
