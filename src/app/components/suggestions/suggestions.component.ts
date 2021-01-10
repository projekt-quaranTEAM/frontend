import { Component, OnInit } from '@angular/core';
import { PlannerService } from 'src/app/services/planner.service';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css'],
})
export class SuggestionsComponent implements OnInit {
  suggestionListSelected: any[] = [];
  suggestionMap = new Map<string, Array<any>>();

  constructor(private plannerService: PlannerService) { }

  ngOnInit(): void {
    this.plannerService.getPropositions().subscribe((data) => {
      data.forEach(item => {
        if (item.category === 'SPECIAL FOR YOU') return
        if (this.suggestionMap.get(item.category)) {
          this.suggestionMap.get(item.category).push(item);
        }
        else {
          this.suggestionMap.set(item.category, [item])
        }
      });

      var c = 0;
      for (let item of data) {
        c++;
        if (item.category === 'SPECIAL FOR YOU') {
          c++;
          break;
        }
      }
      var counter = 0;
      for (let item of data) {
        counter++;
        if (counter >= c) {
          this.suggestionListSelected.push(item);
        }
      }
    });
  }
}
