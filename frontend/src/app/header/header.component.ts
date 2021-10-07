import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() email: string | undefined;
  constructor(
    private apiService: ApiService,
    private router: Router,
    private appService: AppService
  ) {}

  ngOnInit(): void {}

  onClickLogout() {
    this.apiService.logout().subscribe();
    this.appService.user = undefined;
    console.log(this.appService.user);
    this.router.navigate(['']);
  }
}
