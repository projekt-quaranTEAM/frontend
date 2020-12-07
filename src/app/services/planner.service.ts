import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { EventObj } from '../models/EventObj';
import { CalendarEvent } from 'angular-calendar';
import { Proposition } from '../models/Proposition';

@Injectable({
  providedIn: 'root',
})
export class PlannerService {
  private url = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) { }

  public getEvents() {
    return this.httpClient.get<EventObj[]>(this.url + 'events');
  }

  public getSpecifiedEvent(id: number) {
    return this.httpClient.get<EventObj>(this.url + 'event/' + id);
  }

  public saveEvent(body: EventObj) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient
      .post(this.url + 'event', body, httpOptions);
  }

  public saveProposition(body: Proposition) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.post(this.url + 'event', body, httpOptions);
  }

  public updateEvent(body: EventObj) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient
      .put(this.url + 'event/' + body.calendarEvent.id, body, httpOptions);
  }

  public deleteEvent(event: CalendarEvent) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.delete(this.url + 'event/' + event.id, httpOptions);
  }

  public getPropositions() {
    const headersObject = new HttpHeaders();
    headersObject.append('Access-Control-Allow-Origin', '*');
    headersObject.append(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    return this.httpClient.get<Proposition[]>(this.url + 'proposition', {
      headers: headersObject,
    });
  }
}
