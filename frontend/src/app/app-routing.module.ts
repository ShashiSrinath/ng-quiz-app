import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { McqComponent } from './mcq/mcq.component';
import { QuizJoinComponent } from './quiz-join/quiz-join.component';
import { QuizUploadComponent } from './quiz-upload/quiz-upload.component';
import { AllQuizComponent } from './all-quiz/all-quiz.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'attend', component: QuizJoinComponent },
  { path: 'upload', component: QuizUploadComponent, canActivate: [AuthGuard] },
  { path: 'auth', component: AuthComponent },
  { path: 'quiz/:id', component: AllQuizComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'mcq', component: McqComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
