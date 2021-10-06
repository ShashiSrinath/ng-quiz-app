import { Component, Input, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  @Input() gotoNextPage?: () => void;
  @Input() gotoPreviousPage?: () => void;
  @Input() submitAnswers?: () => void;
  @Input() isLastQuestion?: boolean;
  @Input() isFirstQuestion?: boolean;

  constructor(public appService: AppService) {}

  ngOnInit(): void {}
}
