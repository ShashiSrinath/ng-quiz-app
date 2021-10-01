import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuizJoinComponent } from './quiz-join/quiz-join.component';

const routes: Routes = [
{path:"", component:HomeComponent},
{path:"attend", component:QuizJoinComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
