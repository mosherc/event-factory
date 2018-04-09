import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EventService {

  constructor(private http: HttpClient) { }

  getEvents() {
    return this.http.get('./assets/api/data.json');
  }
}
