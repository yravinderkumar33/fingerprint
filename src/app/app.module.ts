import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TestServiceService } from './test-service.service';
import { RouterModule, Routes } from '@angular/router';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [TestServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
