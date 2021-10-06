import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz-overall-view',
  templateUrl: './quiz-overall-view.component.html',
  styleUrls: ['./quiz-overall-view.component.css'],
})
export class QuizOverallViewComponent implements OnInit {
  @Input() quizNumber: number = 0;
  @Input() currentPage: number = 0;
  @Input() gotoPage?: (page: number) => void;

  constructor() {}

  ngOnInit(): void {}

  clickQuestion() {
    if (this.gotoPage) {
      this.gotoPage(this.quizNumber);
    }
  }
}
