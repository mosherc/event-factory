import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { EventFactoryComponent } from './event-factory/event-factory.component';
import { EventService } from './event-factory/event.service';
import { CommonModule } from '@angular/common';
import { EventPipe } from './shared/event.pipe';
import { FormsModule } from '@angular/forms';
import { IdPipe } from './shared/id.pipe';
import { TimePipe } from './shared/time.pipe';


@NgModule({
  declarations: [
    AppComponent,
    EventFactoryComponent,
    EventPipe,
    IdPipe,
    TimePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule
  ],
  providers: [EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
