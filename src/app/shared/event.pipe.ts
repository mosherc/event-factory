import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'event'
})
export class EventPipe implements PipeTransform {

  transform(events: any[], search: string): any {
    if (!events) { return []; }
    if (!search) { return events; }

    if (search === 'default') {
      return events;
    } else {
    return events.filter(event => event.event.includes(search));
    }
  }

}
