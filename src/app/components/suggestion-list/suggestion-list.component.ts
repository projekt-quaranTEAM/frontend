import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-suggestion-list',
  templateUrl: './suggestion-list.component.html',
  styleUrls: ['./suggestion-list.component.css'],
})
export class SuggestionListComponent implements OnInit {
  @Input()
  suggestionList;
  constructor() {}

  ngOnInit(): void {}

  handleClick(event: Event, ind: number): void {
    console.log('click!', event);
    console.log(this.suggestionList[ind]);
  }
}
