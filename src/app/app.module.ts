import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { EventFactoryComponent } from './event-factory/event-factory.component';
import { EventService } from './event-factory/event.service';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    EventFactoryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
