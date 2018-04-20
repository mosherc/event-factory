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

  ascending = (a, b) => a.created_at - b.created_at;
  descending = (a, b) => b.created_at - a.created_at;

  getEvents() {
    this._eventService.getEvents().subscribe(
      data => {
        this.events = data;
      },
      err => console.error(err),
      () => {
        console.log('events loaded');
        this.events = this.events.sort(this.ascending);
        this.filteredEvents = [...this.events];
        this.numPages = this.getNumPages();
        this.getPage(1);
        this.pages = Array.from(Array(this.numPages)).map((x, i) => i + 1);
      }
    );
  }

  /* This method will retrieve the number of pages for pagination
  based on how many filtered events are displayed and
  the given tolerance of events per page (500 by default) */
  getNumPages() {
    const lengthOfEvents = this.filteredEvents.length;
    const numberOfPages = Math.ceil(lengthOfEvents / this.eventsPerPage);
    /* Below line creates array with incrementing elements [1, 2,..., n] 
    for *ngFor to loop through */
    this.pages = Array.from(Array(numberOfPages)).map((x, i) => i + 1);
    return numberOfPages;
  }

  /* This method will take the given page number and return
  the events for this page. For example, page 2 will return
  a subset of filtered events 501-1000.
  Default without an argument returns the first 500 */
  getPage(n: number = this.currPage) {
    n = Math.max(1, Math.min(this.numPages, n));
    const min = Math.max(n - 1) * this.eventsPerPage;
    const max = n * this.eventsPerPage;
    this.currPage = n;
    // variable contains events for page n only
    this.filteredEventsPage = this.filteredEvents.slice(min, max);
  }

  /* This method will swap the sorting between ascending and descending
  It sorts the unfiltered data too so it is in sync when filters are removed */
  sortData() {
    this.sortAscending = this.sortAscending ? false : true;
    this.filteredEvents = this.sortAscending ? this.filteredEvents.sort(this.ascending) : this.filteredEvents.sort(this.descending);
    this.events = this.sortAscending ? this.events.sort(this.ascending) : this.events.sort(this.descending);
    this.getPage();
  }

  /* This method will apply all three filters, recalculate the necessary
  number of pages, and then get the first page by default */
  filterData() {
    this.filteredEvents = this.transformTime(this.events, this.startTime, this.endTime);
    this.filteredEvents = this.transformId(this.filteredEvents, this.idModel);
    this.filteredEvents = this.transformSeq(this.filteredEvents, this.seqModel1, this.seqModel2, this.seqModel3);
    this.numPages = this.getNumPages();
    this.getPage();
  }

  /* This method will filter the events by date. Starting and ending dates
  are optional, and will either find all events between both, before or
  after the end or start date respectively, or return all events */
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
    } else return end ? events.filter(event => event.created_at <= endDate) : events;
  }

  /* This method will filter events that match the given ID or return 
  all events if no number is given */
  transformId(events: any[], search: number): any {
    if (!events) {
      return [];
    }
    if (!search) {
      return events;
    }
    return events.filter(event => event.user_id == search);
  }

  /* This method will return events that follow a given pattern sequence. It reduces
  the pattern to the minimum actual inputs (getting rid of undefined from no selection),
  and then filters the events down where it matches */
  transformSeq(events: any[], ...pattern: string[]): any {
    pattern = pattern.filter(e => e);
    const matches = (event, name: string) => event && event.event === name;
    // Below function will check if each event in a slice of events matches the pattern
    const matchesPattern = (events: any[], pattern: string[]) =>
      events.length === pattern.length && events.every((event, i) => matches(event, pattern[i]));

    /* For case 2 and 3, the patterns must be matched looking ahead OR looking back */
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
