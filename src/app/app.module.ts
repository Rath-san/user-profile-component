import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';

import { createCustomElement } from '@angular/elements';


import { AppComponent } from './app.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './_services/data.service';
import { DateSpreadPipe } from './_pipes/date-spread.pipe';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    DateSpreadPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    DataService
  ],
  entryComponents: [
    UserProfileComponent
  ]
  // bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private injector: Injector
  ) {

  }

  ngDoBootstrap() {
    const el = createCustomElement(UserProfileComponent, {injector: this.injector});
    customElements.define('user-profile', el);
  }
}
