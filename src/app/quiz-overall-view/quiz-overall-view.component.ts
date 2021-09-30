import { Component, Input, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-quiz-overall-view',
  templateUrl: './quiz-overall-view.component.html',
  styleUrls: ['./quiz-overall-view.component.css'],
})
export class QuizOverallViewComponent implements OnInit {
  @Input() quizNumber: number = 0;

  constructor(public appService: AppService) {}

  ngOnInit(): void {}

  clickQuestion() {
    this.appService.gotoPage(this.quizNumber);
  }
}
