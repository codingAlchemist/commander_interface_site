import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AchievementEntryComponent } from './achievement-entry/achievement-entry.component';
import { AchievmentListComponent } from './achievment-list/achievment-list.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { CreateAccountScreenComponent } from './create-account-screen/create-account-screen.component';

const routes: Routes = [
  {path:'app-achievement-entry', component: AchievementEntryComponent},
  {path:'app-achievement-list', component: AchievmentListComponent},
  {path:'app-login-screen', component: LoginScreenComponent},
  {path:'app-create-account-screen', component: CreateAccountScreenComponent},
  {path:'', redirectTo: '/app-login-screen', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
