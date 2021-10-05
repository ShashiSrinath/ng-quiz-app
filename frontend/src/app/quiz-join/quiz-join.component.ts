import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-quiz-join',
  templateUrl: './quiz-join.component.html',
  styleUrls: ['./quiz-join.component.css'],
})
export class QuizJoinComponent implements OnInit {
  attendForm = new FormGroup({
    quizId: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    passcode: new FormControl('', Validators.required),
  });

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  attendQuiz(): void {
    if (this.attendForm.valid) {
    }
  }
}
