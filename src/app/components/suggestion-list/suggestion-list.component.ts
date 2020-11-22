import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-suggestion-list',
  templateUrl: './suggestion-list.component.html',
  styleUrls: ['./suggestion-list.component.css'],
})
export class SuggestionListComponent implements OnInit {
  @Input()
  suggestionList;
  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {}

  handleClick(event: Event, ind: number): void {
    console.log('click!', event);
    console.log(this.suggestionList[ind]);
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
}
