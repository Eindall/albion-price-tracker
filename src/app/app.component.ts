import { Component } from '@angular/core';

import { LogService } from './services/log.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Albion Price Tracker';
  currentUser: User;
  loggedIn: boolean;

  constructor(private logService: LogService) {
    this.checkLog();
  }

  logOut() {
    this.logService.logOut();
  }

  checkLog() {
    console.log('Performing connected check');
    this.currentUser = this.logService.loggedUser;
    this.loggedIn = this.logService.isLogged;
  }
}
