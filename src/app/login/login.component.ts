import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private nickname: string;
  private password: string;
  private errorMessage: string;
  private error: boolean;

  constructor() { }

  ngOnInit() {
  }

  login() {
    this.error = false;
    if (this.password.length !== 4) {
      this.errorMessage = 'Incorrect Password Format (it must be 4 digits !)';
      this.error = true;
    } else {
      console.log('Here I need to check if the user exists or throw error :c');
    }
  }

  register() {
    this.error = false;
    if (this.password.length !== 4) {
      this.errorMessage = 'Incorrect Password Format (it must be 4 digits !)';
      this.error = true;
    } else {
      console.log('Here I need to add user to the database oyea');
    }
  }
}
