import { Component, OnInit } from '@angular/core';
import { LogService } from '../services/log.service';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { SearchService } from '../services/search.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public logService: LogService, private apiService: ApiService,
              private searchService: SearchService, private router: Router) {
    if (!logService.isLogged) {
      router.navigateByUrl('/login');
    }
  }

  removeItem(item) {
    const userId = this.logService.loggedUser._id;
    this.apiService.getUser(userId).subscribe((user) => {
      for (const key in user.userSubscribedItems) {
        if (user.userSubscribedItems[key]) {
          const logItem = user.userSubscribedItems[key];
          if (logItem.itemId === item.itemId) {
            user.userSubscribedItems.splice(key, 1);
          }
        }
      }
      this.apiService.updateUser(userId, user).subscribe(
        this.logService.loggedUser = user
      );
    });
  }

  refresh() {
    for (const key in this.logService.loggedUser.userSubscribedItems) {
      if (this.logService.loggedUser.userSubscribedItems[key]) {
        const item = this.logService.loggedUser.userSubscribedItems[key];
        this.searchService.refreshPrices(item);
      }
    }
  }

  ngOnInit() {
    this.refresh();
  }
}
