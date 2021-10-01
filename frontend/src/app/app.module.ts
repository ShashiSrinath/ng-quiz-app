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
import {FormsModule} from "@angular/forms";
import { HomeComponent } from './home/home.component';
import { AllQuizComponent } from './all-quiz/all-quiz.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    QuizResultComponent,
    QuizOverallViewComponent,
    McqComponent,
    TextQuizComponent,
    HomeComponent,
    AllQuizComponent
  ],
    imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
