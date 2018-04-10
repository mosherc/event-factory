import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'id'
})
export class IdPipe implements PipeTransform {

  transform(events: any[], search: number): any {
    if (!events) { return []; }
    if (!search) { return events; }
    return events.filter(event => event.user_id == search);
  }

}
