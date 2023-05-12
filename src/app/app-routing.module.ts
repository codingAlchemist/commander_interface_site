import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AchievementEntryComponent } from './components/achievements/achievement-entry/achievement-entry.component';
import { AchievementListComponent } from './components/achievements/achievement-list/achievement-list.component';
import { LoginScreenComponent } from './components/login-screen/login-screen.component';
import { StoreOwnerRegistrationComponent } from './components/stores/store-owner-registration/store-owner-registration.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { StoreListComponent } from './components/stores/store-list/store-list.component';
import { StoreOwnerPageComponent } from './components/stores/store-owner-page/store-owner-page.component';
import { EventPageComponent } from './components/events/event-page/event-page.component';
import { EventGamesComponent } from './components/events/event-games/event-games.component';
const routes: Routes = [
  { path: 'app-achievement-entry', component: AchievementEntryComponent },
  { path: 'app-achievement-list', component: AchievementListComponent },
  { path: 'app-login-screen', component: LoginScreenComponent },
  { path: 'app-store-owner', component: StoreOwnerRegistrationComponent },
  { path: 'app-store-list', component: StoreListComponent },
  { path: 'app-store-owner-page', component: StoreOwnerPageComponent },
  { path: 'app-event-page/:event_code', component: EventPageComponent },
  { path: 'app-event-games/:event_code', component: EventGamesComponent },
  { path: '', redirectTo: '/app-login-screen', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
      useHash: true,
    }),
  ],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
})
export class AppRoutingModule {}
