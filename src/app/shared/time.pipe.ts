import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(events: any[], start?: Date, end?: Date): any {
    if (!events) { return []; }
    const startDate = new Date(start);
    const endDate = new Date(end);
    if (start) {
      if (end) {
        return events.filter(event => event.created_at >= startDate && event.created_at <= endDate);
      } else { return events.filter(event => event.created_at >= startDate); }
    } else if (end) {
      return events.filter(event => event.created_at <= endDate);
    } else {
      return events;
    }
  }

}
