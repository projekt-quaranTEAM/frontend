import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css'],
})
export class SuggestionsComponent implements OnInit {
  suggestionListFirst: any[] = [
    {
      title: 'List group item heading',
      time: '3 days ago',
      desc1:
        'Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.',
      desc2: 'Donec id elit non mi porta.',
    },
    {
      title: 'List group item heading',
      time: '3 days ago',
      desc1:
        'Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.',
      desc2: 'Donec id elit non mi porta.',
    },
    {
      title: 'List group item heading',
      time: '3 days ago',
      desc1:
        'Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.',
      desc2: 'Donec id elit non mi porta.',
    },
    {
      title: 'List group item heading',
      time: '3 days ago',
      desc1:
        'Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.',
      desc2: 'Donec id elit non mi porta.',
    },
  ];

  suggestionListSecond: any[] = [
    {
      title: 'List group item heading',
      time: '4 days ago',
      desc1:
        'Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.',
      desc2: 'Donec id elit non mi porta.',
    },
    {
      title: 'List group item heading',
      time: '4 days ago',
      desc1:
        'Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.',
      desc2: 'Donec id elit non mi porta.',
    },
    {
      title: 'List group item heading',
      time: '4 days ago',
      desc1:
        'Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.',
      desc2: 'Donec id elit non mi porta.',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
