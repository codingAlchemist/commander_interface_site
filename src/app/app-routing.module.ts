import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AchievementEntryComponent } from './components/achievements/achievement-entry/achievement-entry.component';
import { AchievmentListComponent } from './components/achievements/achievment-list/achievement-list.component';
import { LoginScreenComponent } from './components/login-screen/login-screen.component';
import { CreateAccountScreenComponent } from './components/create-account-screen/create-account-screen.component';
import { StoreOwnerComponent } from './components/stores/store-owner/store-owner.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { StoreListComponent } from './components/stores/store-list/store-list.component';

const routes: Routes = [
  {path:'app-achievement-entry', component: AchievementEntryComponent},
  {path:'app-achievment-list', component: AchievmentListComponent},
  {path:'app-login-screen', component: LoginScreenComponent},
  {path:'app-create-account-screen', component: CreateAccountScreenComponent},
  {path:'app-store-owner', component: StoreOwnerComponent},
  {path:'app-store-list', component: StoreListComponent},
  {path:'', redirectTo: '/app-login-screen', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload', useHash: true})],
  exports: [RouterModule],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AppRoutingModule { }
