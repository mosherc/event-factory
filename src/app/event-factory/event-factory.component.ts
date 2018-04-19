import { Component, OnInit, OnChanges } from '@angular/core';
import { EventService } from './event.service';

@Component({
  selector: 'event-factory',
  templateUrl: './event-factory.component.html',
  styleUrls: ['./event-factory.component.scss']
})
export class EventFactoryComponent implements OnInit {

  public events;
  public filteredEvents;
  public filteredEventsPage;
  public pages: number[];
  public eventsPerPage: number = 500;
  public currPage: number = 1;
  public numPages: number;
  public sortAscending: boolean = true;
  public idModel: number;
  public startTime: Date;
  public endTime: Date;
  public seqModel1: string;
  public seqModel2: string;
  public seqModel3: string;

  constructor(private _eventService: EventService) {}

  ngOnInit() {
    this.getEvents();
  }

  getEvents() {
    this._eventService.getEvents().subscribe(
      data => {
        this.events = data;
      },
      err => console.error(err),
      () => {
        console.log('events loaded');
        this.events = this.events.sort((a, b) => a.created_at - b.created_at);
        this.filteredEvents = [...this.events];
        this.numPages = this.getNumPages();
        this.getPage(1);
        this.pages = Array.from(Array(this.numPages)).map((x, i) => i + 1);
      }
    );
  }

  getNumPages() {
    const lengthOfEvents = this.filteredEvents.length;
    const numberOfPages = Math.ceil(lengthOfEvents / this.eventsPerPage);
    this.pages = Array.from(Array(numberOfPages)).map((x, i) => i + 1);
    return numberOfPages;
  }

  getPage(n: number = this.currPage) {
    n = Math.max(1, Math.min(this.numPages, n));
    const min = Math.max(n - 1) * this.eventsPerPage;
    const max = n * this.eventsPerPage;
    this.currPage = n;
    this.filteredEventsPage = this.filteredEvents.slice(min, max);
  }

  sortData() {
    this.sortAscending = this.sortAscending ? false : true;
    this.filteredEvents = this.sortAscending ? this.filteredEvents.sort((a, b) => a.created_at - b.created_at) :
                                               this.filteredEvents.sort((a, b) => b.created_at - a.created_at);
    this.events = this.sortAscending ? this.events.sort((a, b) => a.created_at - b.created_at) :
                                       this.events.sort((a, b) => b.created_at - a.created_at);
    //this.filterData();
    this.getPage();
  }

  filterData() {
    this.filteredEvents = this.transformTime(this.events, this.startTime, this.endTime);
    this.filteredEvents = this.transformId(this.filteredEvents, this.idModel);
    this.filteredEvents = this.transformSeq(this.filteredEvents, this.seqModel1, this.seqModel2, this.seqModel3);
    this.numPages = this.getNumPages();
    this.getPage();
  }

  transformTime(events: any[], start?: Date, end?: Date): any {
    if (!events) {
      return [];
    }
    const startDate = new Date(start);
    const endDate = new Date(end);
    if (start) {
      if (end) {
        return events.filter(event => event.created_at >= startDate && event.created_at <= endDate);
      } else {
        return events.filter(event => event.created_at >= startDate);
      }
    } else if (end) {
      return events.filter(event => event.created_at <= endDate);
    } else {
      return events;
    }
  }

  transformId(events: any[], search: number): any {
    if (!events) {
      return [];
    }
    if (!search) {
      return events;
    }
    return events.filter(event => event.user_id == search);
  }

  transformSeq(events: any[], ...pattern: string[]): any {
    pattern = pattern.filter(e => e);
    const matches = (event, name: string) => event && event.event === name;
    const matchesPattern = (events: any[], pattern: string[]) =>
      events.length === pattern.length && events.every((event, i) => matches(event, pattern[i]));

    // Specify a sequence of up to 3 events that can be used to search for all instances where that sequence of events occurs.

    switch (pattern.length) {
      case 0:
        return events;
      case 1:
        return events.filter(event => matches(event, pattern[0]));
      case 2:
        return events.filter((event, i) =>
          matchesPattern(events.slice(i, i + 2), pattern) ||
          matchesPattern(events.slice(i - 1, i + 1), pattern));
      case 3:
        return events.filter((event, i) =>
          matchesPattern(events.slice(i, i + 3), pattern) ||
          matchesPattern(events.slice(i - 1, i + 2), pattern) ||
          matchesPattern(events.slice(i - 2, i + 1), pattern));
    }
  }
}
