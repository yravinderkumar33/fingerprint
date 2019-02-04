import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TestServiceService } from './test-service.service';
import {RouterModule, Routes} from '@angular/router';
import { TestComponent } from './test/test/test.component';
import { TestModule } from './test/test.module';
var routes : Routes =[
  {path:'home' , component : TestComponent}
]
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    TestModule
  ],
  providers: [TestServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
