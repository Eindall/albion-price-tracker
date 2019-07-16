import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Item } from '../models/item.model';
import { Price } from '../models/price.model';

const itemList = [];

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) {
    this.get().subscribe((res) => {
      for (const key in res) {
        if (res[key]) {
          let itemIcon = 'https://gameinfo.albiononline.com/api/gameinfo/items/';
          if (res[key].UniqueName) { itemIcon += res[key].UniqueName; }
          const entry: Item = {
            itemId: res[key].UniqueName ? res[key].UniqueName : 'Not defined',
            itemIcon,
            itemNameEN: res[key].LocalizedNames ? res[key].LocalizedNames.EN : 'Not defined',
            itemNameFR: res[key].LocalizedNames ? res[key].LocalizedNames.FR : 'Not defined'
          };
          itemList.push(entry);
        }
      }
    });
  }

  refreshPrices(item) {
    let url = 'https://www.albion-online-data.com/api/v1/stats/Prices/';

    if (item.itemId) {
      url += item.itemId;
      this.http.get(url).subscribe((res) => {
        const itemPrices: Price = {};
        for (const key in res) {
          if (res[key]) {
            if (res[key].city === 'Black Market' || res[key].city === 'Fort Sterling') {
              res[key].city = res[key].city.replace(/\s/g, '');
            }
            const city = res[key].city;
            const values = {
              minSellOrder: res[key].sell_price_min,
              maxBuyOrder: res[key].buy_price_max
            };
            itemPrices[city] = values;
          }
        }
        console.log(itemPrices);
        item.itemPrices = itemPrices;
      });
    }
  }

  get(): Observable<object> {
    return this.http.get('assets/items.json');
  }

  getItems(): Observable<Item[]> {
    return of<Item[]>(itemList);
  }
}
