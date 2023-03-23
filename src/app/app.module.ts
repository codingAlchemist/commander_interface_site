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
import { AchievmentListComponent } from './components/achievements/achievment-list/achievement-list.component'
import { LoginScreenComponent } from './components/login-screen/login-screen.component';
import { CreateAccountScreenComponent } from './components/create-account-screen/create-account-screen.component';
import { StoreOwnerRegistrationComponent } from './components/stores/store-owner-registration/store-owner-registration.component';
import { StoreRegistrationComponent } from './components/stores/store-registration/store-registration.component';
import { StoreListComponent } from './components/stores/store-list/store-list.component';
import { StoreOwnerItemComponent } from './components/stores/store-owner-item/store-owner-item.component';
import { CookieService } from 'ngx-cookie-service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { StoreOwnerPageComponent } from './components/stores/store-owner-page/store-owner-page.component';
import { StoreComponent } from './components/stores/store/store.component';
import { EventPageComponent } from './components/events/event-page/event-page.component';
import { MatTableModule } from '@angular/material/table';
import { EventsLobbyComponent } from './components/events/event-page/events-lobby.component';
import { EventGamesComponent } from './components/events/event-games/event-games.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { ServiceWorkerModule } from '@angular/service-worker';
import { GameComponent } from './components/events/game/game.component';
@NgModule({
  declarations: [
    AppComponent,
    AchievementEntryComponent,
    AchievementItemComponent,
    AchievmentListComponent,
    LoginScreenComponent,
    CreateAccountScreenComponent,
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
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatTabsModule,
    MatSidenavModule,
    DragDropModule,
    CdkAccordionModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
