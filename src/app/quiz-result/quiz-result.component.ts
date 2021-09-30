import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Result } from '../types';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.css']
})
export class QuizResultComponent implements OnInit {

  result: Result;

  constructor(appService: AppService) { 
    this.result = appService.getResults();
  }

  ngOnInit(): void {
  }

}
