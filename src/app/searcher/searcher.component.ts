import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';

import { Item } from '../models/item.model';
import { LogService } from '../services/log.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent implements OnInit {
  itemList: Item[];
  searchResults: Item[];
  query: string;

  itemIsPushable: boolean;

  constructor(private searchService: SearchService, private logService: LogService, private apiService: ApiService) {
    this.searchService.getItems().subscribe(
      data => { this.itemList = data; },
      error => console.log(error)
    );
  }

  ngOnInit() {
  }

  addTrackedItem(item) {
    this.itemIsPushable = true;
    const userId = this.logService.loggedUser._id;
    this.apiService.getUser(userId).subscribe((user) => {
      for (const key in user.userSubscribedItems) {
        if (user.userSubscribedItems[key]) {
          const logItem = user.userSubscribedItems[key];
          if (logItem.itemId === item.itemId) {
            this.itemIsPushable = false;
          }
        }
      }
      if (this.itemIsPushable) {
        user.userSubscribedItems.push(item);
      }
      this.apiService.updateUser(userId, user).subscribe(
        this.logService.loggedUser = user
      );
    });
  }

  search(): void {
    this.searchResults = [];
    for (const key in this.itemList) {
      if (this.itemList[key]) {
        const item = this.itemList[key];
        if (item.itemNameFR && item.itemNameEN
          && (item.itemNameFR.toUpperCase().includes(this.query.toUpperCase())
          || item.itemNameEN.toUpperCase().includes(this.query.toUpperCase()))
          && !item.itemId.includes('NONTRADABLE')) {
          this.searchResults.push(item);
        }
      }
    }
  }

}
