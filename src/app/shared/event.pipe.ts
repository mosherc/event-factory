import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'event'
})
export class EventPipe implements PipeTransform {

  transform(events: any[], search: string): any {
    if (!events) { return []; }
    if (!search) { return events; }

    search = search.toUpperCase();
    return events.filter(event => event.event.includes(search));
  }

}
