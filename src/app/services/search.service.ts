import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Item } from '../models/item.model';

const itemList = [];

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) {
    this.get().subscribe((res) => {
      for (const key in res) {
        if (res[key]) {
          const entry: Item = {
            itemId: res[key].UniqueName ? res[key].UniqueName : 'Not defined',
            itemNameEN: res[key].LocalizedNames ? res[key].LocalizedNames.EN : 'Not defined',
            itemNameFR: res[key].LocalizedNames ? res[key].LocalizedNames.FR : 'Not defined'
          };
          itemList.push(entry);
        }
      }
    });
  }

  get(): Observable<object> {
    return this.http.get('assets/items.json');
  }

  getItems(): Observable<Item[]> {
    return of<Item[]>(itemList);
  }
}
