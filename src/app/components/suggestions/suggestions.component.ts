import { Component, OnInit } from '@angular/core';
import { PlannerService } from 'src/app/services/planner.service';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css'],
})
export class SuggestionsComponent implements OnInit {
  suggestionListSport: any[] = [];
  suggestionListMusic: any[] = [];
  suggestionListGames: any[] = [];
  suggestionListSelected: any[] = [];

  constructor(private plannerService: PlannerService) { }

  ngOnInit(): void {
    this.plannerService.getPropositions().subscribe((data) => {
      this.suggestionListSport = data.filter(
        (item) => item.category === 'sport'
      );
      this.suggestionListMusic = data.filter(
        (item) => item.category === 'music'
      );
      this.suggestionListGames = data.filter(
        (item) => item.category === 'games'
      );

      var c = 0
      for (let item of data) {
        c++
        if (item.category === "SPECIAL FOR YOU") {
          c++
          break
        }
      }
      var counter = 0
      for (let item of data) {
        counter++
        if (counter >= c) {
          this.suggestionListSelected.push(item)
        }

      }
    });
  }
}
