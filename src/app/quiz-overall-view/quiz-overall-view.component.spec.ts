import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizOverallViewComponent } from './quiz-overall-view.component';

describe('QuizOverallViewComponent', () => {
  let component: QuizOverallViewComponent;
  let fixture: ComponentFixture<QuizOverallViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizOverallViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizOverallViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
