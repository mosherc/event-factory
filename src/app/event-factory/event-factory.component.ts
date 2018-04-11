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
  public pages: number[];
  public eventsPerPage: number = 500;
  public currPage: number = 1;
  public numPages: number;
  public sorted: boolean = false;
  public idModel: number;
  public startTime: Date;
  public endTime: Date;
  public seqModel1: string;
  public seqModel2: string;
  public seqModel3: string;

  constructor(private _eventService: EventService) { }

  ngOnInit() {
    this.getEvents();
  }

  getEvents() {
    this._eventService.getEvents().subscribe(
      data => {
        this.events = data;
        this.filteredEvents = data;
      },
      err => console.error(err),
      () => {
        console.log('events loaded');
        this.sortedEvents = [...this.events].sort((a, b) => a.created_at - b.created_at);
        this.numPages = this.getNumPages();
        this.getPage(1);
        this.pages = Array.from(Array(this.numPages)).map((x, i) => i + 1);
      }
    );
  }

  getNumPages() {
    return Math.ceil(this.events.length / this.eventsPerPage);
  }

  getPage(n: number = this.currPage) {
    n = Math.max(1, Math.min(this.numPages, n));
    const min = Math.max(n - 1) * this.eventsPerPage;
    const max = n * this.eventsPerPage;
    this.currPage = n;
    this.filteredEvents = this.sorted ? this.sortedEvents.slice(min, max) : this.events.slice(min, max);
  }

  sortData() {
    this.sorted = this.sorted ? false : true;
    this.getPage();
  }
}
