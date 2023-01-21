import { NgModule } from '@angular/core';
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
import { StoreOwnerComponent } from './components/stores/store-owner/store-owner.component';
import { StoreRegistrationComponent } from './components/stores/store-registration/store-registration.component';
import { StoreListComponent } from './components/stores/store-list/store-list.component';
import { StoreOwnerItemComponent } from './components/stores/store-owner-item/store-owner-item.component';
@NgModule({
  declarations: [
    AppComponent,
    AchievementEntryComponent,
    AchievementItemComponent,
    AchievmentListComponent,
    LoginScreenComponent,
    CreateAccountScreenComponent,
    StoreOwnerComponent,
    StoreRegistrationComponent,
    StoreListComponent,
    StoreOwnerItemComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
