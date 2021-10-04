import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { QuizJoinComponent } from './quiz-join/quiz-join.component';
import { QuizUploadComponent } from './quiz-upload/quiz-upload.component';

const routes: Routes = [
{path:"", component:HomeComponent},
{path:"attend", component:QuizJoinComponent},
{path: "upload", component: QuizUploadComponent},
{path: "auth", component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
