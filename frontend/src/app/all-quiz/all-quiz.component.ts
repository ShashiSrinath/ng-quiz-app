import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-all-quiz',
  templateUrl: './all-quiz.component.html',
  styleUrls: ['./all-quiz.component.css']
})
export class AllQuizComponent implements OnInit {

  constructor(public appService: AppService) { }

  ngOnInit(): void {
  }

}
