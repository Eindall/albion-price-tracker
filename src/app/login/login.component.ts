import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../models/user.model';
import { ApiService } from '../services/api.service';
import { LogService } from '../services/log.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  nickname: string;
  password: string;
  private userInfos: User;

  errorMessage: string;
  error: boolean;

  confirmMessage: string;
  confirm: boolean;

  constructor(private userApi: ApiService, private logService: LogService, private router: Router) {}

  ngOnInit() {
  }

  login() {
    this.error = false;
    this.confirm = false;
    if (this.password.length !== 4) {
      this.errorMessage = 'Incorrect Password Format (it must be 4 digits !)';
      this.error = true;
    } else {
      this.userApi.getUsers().subscribe(res => {
        for (const key in res) {
          if (res[key]) {
            const user = res[key];
            if (user.userNickname === this.nickname) {
              if (user.userPassword === this.password) {
                this.confirmMessage = 'Connected, redirecting...';
                this.confirm = true;
                this.logService.setLogged(user);
                this.router.navigateByUrl('dashboard');
                break;
              }
            }
          }
        }
        if (!this.confirm) {
          this.errorMessage = 'Incorrect Username or Password...';
          this.error = true;
        }
      });
    }
  }

  register() {
    this.error = false;
    this.confirm = false;
    if (this.password.length !== 4) {
      this.errorMessage = 'Incorrect Password Format (it must be 4 digits !)';
      this.error = true;
    } else {
      this.userApi.getUsers().subscribe(res => {
        for (const key in res) {
          if (res[key]) {
            const user = res[key];
            if (user.userNickname === this.nickname) {
              this.errorMessage = 'Username already registered';
              this.error = true;
              break;
            }
          }
        }
        if (!this.error) {
          this.userInfos = {
            userNickname: this.nickname,
            userPassword: this.password,
            userSubscribedItems: []
          };
          this.userApi.addUser(this.userInfos).subscribe(result => {
            console.log('Account ' + result.userNickname + ' registered');
            this.confirmMessage = 'Account ' + result.userNickname + ' registered, please log in';
            this.confirm = true;
          });
        }
      });
    }
  }
}
