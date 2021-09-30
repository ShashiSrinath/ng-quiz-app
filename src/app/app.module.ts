import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { QuizResultComponent } from './quiz-result/quiz-result.component';
import { QuizOverallViewComponent } from './quiz-overall-view/quiz-overall-view.component';
import { McqComponent } from './mcq/mcq.component';
import { TextQuizComponent } from './text-quiz/text-quiz.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    QuizResultComponent,
    QuizOverallViewComponent,
    McqComponent,
    TextQuizComponent
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
