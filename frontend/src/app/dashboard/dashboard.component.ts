import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  quizs: any;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getMyQuizes().subscribe(
      (data) => {
        console.log(data);
        this.quizs = data;
        console.log(this.quizs);
      },
      (err) => console.error(err)
    );
  }
}
