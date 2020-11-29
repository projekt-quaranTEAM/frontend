import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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

  handleClick(event: Event, ind: number): void {
    console.log('click!', event);
    console.log(this.suggestionList[ind]);
    this.toastr.success('Hello world!', 'Toastr fun!');
    this.plannerService.saveEvent(this.suggestionList[ind].calendarEvent);
  }
}
