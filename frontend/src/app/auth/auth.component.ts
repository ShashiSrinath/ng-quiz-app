import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  email: string = "";
  password: string = "";

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  login() {
    this.apiService.login(this.email, this.password).subscribe(
      data => {
        console.log("test 1");
      }, error => {
        console.log("error");
      }
    );
  }

}
