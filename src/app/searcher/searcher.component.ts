import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';

import { Item } from '../models/item.model';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent implements OnInit {
  itemList: Item[];
  searchResults: Item[];
  query: string;

  constructor(private searchService: SearchService) {
    this.searchService.getItems().subscribe(
      data => { this.itemList = data; },
      error => console.log(error)
    );
  }

  ngOnInit() {
  }

  search(): void {
    this.searchResults = [];
    for (const key in this.itemList) {
      if (this.itemList[key]) {
        const item = this.itemList[key];
        if ((item.itemNameFR && item.itemNameFR.includes(this.query)) || (item.itemNameEN && item.itemNameEN.includes(this.query))) {
          this.searchResults.push(item);
        }
      }
    }
  }

}
