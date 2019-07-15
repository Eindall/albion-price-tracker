import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  isLogged: boolean;
  loggedUser: User;

  constructor() { }

  setLogged(user: User) {
    this.isLogged = true;
    this.loggedUser = user;
  }

  logOut() {
    this.isLogged = false;
    this.loggedUser = null;
  }
}
