import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  email: string = "";
  password: string = "";
  isOpenRegisterForm: boolean = false;

  constructor(private apiService: ApiService, private appService: AppService, private router: Router) { }

  ngOnInit(): void {
  }

  // call login API
  login() {
    this.apiService.login(this.email, this.password).subscribe(
      data => {
        this.appService.user = data.id;
        this.router.navigate(["dashboard"]);
        console.log(data);
      }, error => {
        console.log(error);
      }
    );
  }

  // call register API
  register() {
    this.apiService.register(this.email, this.password).subscribe(
      data => {
        this.appService.user = data.id;
        console.log(data);
        this.isOpenRegisterForm = false;
        console.log("register successfull");
      }, error => {
        console.log("register error");
      }
    );
  }

  // switch among login and register form
  switchForms(switchTo: string) {
    if (switchTo === "register") {
      this.isOpenRegisterForm = true;
    } else {
      this.isOpenRegisterForm = false;
    }
  }

}
