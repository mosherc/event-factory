import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sequence'
})
export class SequencePipe implements PipeTransform {

  transform(events: any[], event1?: string, event2?: string, event3?: string): any {
    if (!events) { return []; }

    console.log(event1+event2+event3);

    // Specify a sequence of up to 3 events that can be used to search for all instances where that sequence of events occurs.


    if (event1) {
      if (event2) {
        if (event3) {
          return events.filter((event, i) => {
            return (event.event === event3 && events[i-1].event === event2 && events[i-2].event === event1);
          });
        } else {
          return events.filter((event, i) => {
            return (event.event === event2 && events[i-1].event === event1) || (event.event === event1 && events[i+1].event === event2);
          });
        }
      } else {
        return events.filter((event, i) => event.event === event1);
      }
    } else {
      return events;
    }
  }

}
