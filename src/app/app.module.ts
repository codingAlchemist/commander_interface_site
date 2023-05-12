import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AchievementEntryComponent } from './components/achievements/achievement-entry/achievement-entry.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AchievementItemComponent } from './components/achievements/achievement-item/achievement-item.component';
import { AchievementListComponent } from './components/achievements/achievement-list/achievement-list.component';
import { LoginScreenComponent } from './components/login-screen/login-screen.component';
import { StoreOwnerRegistrationComponent } from './components/stores/store-owner-registration/store-owner-registration.component';
import { StoreRegistrationComponent } from './components/stores/store-registration/store-registration.component';
import { StoreListComponent } from './components/stores/store-list/store-list.component';
import { StoreOwnerItemComponent } from './components/stores/store-owner-item/store-owner-item.component';
import { CookieService } from 'ngx-cookie-service';
import { StoreOwnerPageComponent } from './components/stores/store-owner-page/store-owner-page.component';
import { StoreComponent } from './components/stores/store/store.component';
import { EventPageComponent } from './components/events/event-page/event-page.component';
import { EventsLobbyComponent } from './components/events/event-page/events-lobby.component';
import { EventGamesComponent } from './components/events/event-games/event-games.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { ServiceWorkerModule } from '@angular/service-worker';
import { GameComponent } from './components/events/game/game.component';
import { PlayerAchievementComponent } from './components/events/player-achievement/player-achievement.component';
import { MaterialModule } from './material/material.module';
import { PasswordValidatorDirective } from 'src/directives/passwordValidatorDirective';
import { PasswordsMatchDirective } from 'src/directives/passwordsMatchDirective';
import { StoreEventDialogComponent } from './components/dialogs/store-event-dialog/store-event-dialog.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { PlayerItemComponent } from './components/events/player-item/player-item.component';
import { CommonModule, DatePipe } from '@angular/common';
import { PlayerAchievementDialogComponent } from './components/dialogs/player-achievement-dialog/player-achievement-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    AchievementEntryComponent,
    AchievementItemComponent,
    AchievementListComponent,
    LoginScreenComponent,
    StoreOwnerRegistrationComponent,
    StoreRegistrationComponent,
    StoreListComponent,
    StoreOwnerItemComponent,
    StoreOwnerPageComponent,
    StoreComponent,
    EventPageComponent,
    EventsLobbyComponent,
    EventGamesComponent,
    GameComponent,
    PlayerAchievementComponent,
    PasswordValidatorDirective,
    PasswordsMatchDirective,
    StoreEventDialogComponent,
    ConfirmDialogComponent,
    PlayerItemComponent,
    PlayerAchievementDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    DragDropModule,
    CdkAccordionModule,
    CommonModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    MaterialModule,
  ],
  providers: [CookieService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
