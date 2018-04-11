import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sequence'
})
export class SequencePipe implements PipeTransform {

  transform(events: any[], ...pattern: string[]): any {
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
