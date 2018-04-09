import { Component, OnInit } from '@angular/core';
import { EventService } from './event.service';

@Component({
  selector: 'event-factory',
  templateUrl: './event-factory.component.html',
  styleUrls: ['./event-factory.component.scss']
})
export class EventFactoryComponent implements OnInit {

  public events;
  public filteredEvents;
  public pages;
  public eventsPerPage = 500;
  public currPage = 1;

  constructor(private _eventService: EventService) { }

  ngOnInit() {
    this.getEvents();
    console.log(this.events);
  }

  getEvents() {
    this._eventService.getEvents().subscribe(
      data => {
        this.events = data;
        this.getPage(1);
        let numPages = Math.ceil(this.events.length / this.eventsPerPage);
        this.pages = Array.from(Array(numPages)).map((x, i) => i + 1);
      },
      err => console.error(err),
      () => console.log('events loaded')
    );
  }

  getPage(n: number) {
    const min = (n - 1) * this.eventsPerPage;
    const max = n * this.eventsPerPage;
    this.currPage = n;
    this.filteredEvents = this.events.slice(min, max);
  }

}
