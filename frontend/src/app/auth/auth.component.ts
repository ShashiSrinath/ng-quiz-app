import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  email: string = '';
  password: string = '';
  isOpenRegisterForm: boolean = false;
  isClick: boolean = false;
  isRegisterFail: boolean = false;

  constructor(
    private apiService: ApiService,
    private appService: AppService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // call login API
  login() {
    this.apiService.login(this.email, this.password).subscribe(
      (data) => {
        //@ts-ignore
        this.appService.setUser({id:data.id, email: data.email});
        this.router.navigate(["dashboard"]);
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // call register API
  register() {
    this.isClick = true;
    this.apiService.register(this.email, this.password).subscribe(
      (data) => {
        console.log(data);
        this.isOpenRegisterForm = false;
        console.log('register successfull');
        this.email = '';
        this.password = '';
        this.isRegisterFail = false;
      },
      (error) => {
        this.isRegisterFail = true;
        console.log('register error');
      }
    );
    // setTimeout(function() { alert("my message"); }, time);
    setTimeout(() => {this.isClick = false}, 2000);
  }

  // switch among login and register form
  switchForms(switchTo: string) {
    if (switchTo === 'register') {
      this.isOpenRegisterForm = true;
    } else {
      this.isOpenRegisterForm = false;
    }
  }
}
