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
  public sortedEvents;
  public pages;
  public eventsPerPage = 500;
  public currPage = 1;
  public sorted = false;
  public idModel;
  public startTime;
  public endTime;
  public seqModel1;
  public seqModel2;
  public seqModel3;

  constructor(private _eventService: EventService) { }

  ngOnInit() {
    this.getEvents();
  }

  getEvents() {
    this._eventService.getEvents().subscribe(
      data => {
        this.events = data;
        this.filteredEvents = data;
        this.sortedEvents = [...this.events].sort((a, b) => a.created_at - b.created_at);
        this.getPage(1);
        let numPages = Math.ceil(this.events.length / this.eventsPerPage);
        this.pages = Array.from(Array(numPages)).map((x, i) => i + 1);
      },
      err => console.error(err),
      () => console.log('events loaded')
    );
  }

  getPage(n: number = this.currPage) {
    const min = (n - 1) * this.eventsPerPage;
    const max = n * this.eventsPerPage;
    this.currPage = n;
    this.filteredEvents = this.sorted ? this.sortedEvents.slice(min, max) : this.events.slice(min, max);
  }

  sortData() {
    this.sorted = this.sorted ? false : true;
    this.getPage();
  }
}
