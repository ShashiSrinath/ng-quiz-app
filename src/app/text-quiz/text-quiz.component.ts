import { Component, Input, OnInit } from '@angular/core';
import { Question } from '../types';

@Component({
  selector: 'app-text-quiz',
  templateUrl: './text-quiz.component.html',
  styleUrls: ['./text-quiz.component.css']
})
export class TextQuizComponent implements OnInit {
  
  @Input() question?:Question;

  constructor() { }

  ngOnInit(): void {
  }

  submit(){

  }

}
