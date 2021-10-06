import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-join',
  templateUrl: './quiz-join.component.html',
  styleUrls: ['./quiz-join.component.css'],
})
export class QuizJoinComponent implements OnInit {
  error?: string;

  attendForm = new FormGroup({
    quizId: new FormControl(undefined, Validators.required),
    userCode: new FormControl(undefined, Validators.required),
    passcode: new FormControl(undefined, Validators.required),
  });

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {}

  attendQuiz(): void {
    this.error = undefined;
    this.attendForm.markAsDirty();
    if (this.attendForm.valid) {
      this.apiService.attendQuiz(this.attendForm.value).subscribe(
        (data) => {
          this.router.navigate([`quiz/${data.quizId}`]);
        },
        (err) => {
          if (err.error.name === 'ValidationError') {
            this.error = err.error.details[0].message;
          }
          console.log(err);
        }
      );
    } else {
      this.error = 'Please fill the required fields';
    }
  }
}
