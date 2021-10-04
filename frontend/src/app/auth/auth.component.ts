import { Component, OnInit } from '@angular/core';
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

  constructor(private apiService: ApiService, private appService: AppService) { }

  ngOnInit(): void {
  }

  login() {
    this.apiService.login(this.email, this.password).subscribe(
      data => {
        this.appService.user = data.id;
        console.log(data);
      }, error => {
        console.log("error");
      }
    );
  }

  register() {
    this.apiService.register(this.email, this.password).subscribe(
      data => {
        this.appService.user = data.id;
        console.log(data);
        console.log("register successfull");
      }, error => {
        console.log("register error");
      }
    );
  }

}
