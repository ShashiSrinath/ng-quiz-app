import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  email: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.checkAuth().subscribe((data) => {
      this.email = data.email;
      console.log(data);
    });
  }
}
