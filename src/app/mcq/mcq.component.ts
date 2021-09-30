import { Component, Input, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Question } from '../types';

@Component({
  selector: 'app-mcq',
  templateUrl: './mcq.component.html',
  styleUrls: ['./mcq.component.css']
})
export class McqComponent implements OnInit {

@Input() question?:Question;

  constructor(
   
  ) {this.getQus() }

  ngOnInit(): void {
  }
getQus(){
  console.log(this.question?.type)
}
}
