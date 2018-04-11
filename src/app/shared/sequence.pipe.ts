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
    console.log(pattern);

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


    // if (event1) {
    //   if (event2) {
    //     if (event3) {
    //       return events.filter((event, i) => {
    //         return (event.event === event3 && events[i-1].event === event2 && events[i-2].event === event1);
    //       });
    //     } else {
    //       return events.filter((event, i) => {
    //         return (event.event === event2 && events[i-1].event === event1) || (event.event === event1 && events[i+1].event === event2);
    //       });
    //     }
    //   } else {
    //     return events.filter((event, i) => event.event === event1);
    //   }
    // } else {
    //   return events;
    // }
  }

}
