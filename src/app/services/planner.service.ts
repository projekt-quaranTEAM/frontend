import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { EventObj } from '../models/EventObj';
import { CalendarEvent } from 'angular-calendar';
import { Proposition } from '../models/Proposition';
import { User } from '../models/User';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class PlannerService {
  private url = 'http://localhost:8080/';
  private currentUserId = this.localStorage.getUserIdFromLocalStorage();

  constructor(private httpClient: HttpClient,
              private localStorage: LocalStorageService) { }

  public getEvents() {
    return this.httpClient.get<EventObj[]>(this.url + this.currentUserId + '/events');
  }

  public getSpecifiedEvent(id: number) {
    return this.httpClient.get<EventObj>(this.url + this.currentUserId + '/event/' + id);
  }

  public saveEvent(body: EventObj) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.post(this.url + this.currentUserId + '/event', body, httpOptions);
  }

  public saveProposition(body: Proposition) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.post(this.url + this.currentUserId + '/event', body, httpOptions);
  }

  public updateEvent(body: EventObj) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient
      .put(this.url + this.currentUserId + '/event/' + body.calendarEvent.id, body, httpOptions);
  }

  public deleteEvent(event: CalendarEvent) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.delete(this.url + this.currentUserId + '/event/' + event.id, httpOptions);
  }

  public getPropositions() {
    const headersObject = new HttpHeaders();
    headersObject.append('Access-Control-Allow-Origin', '*');
    headersObject.append(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    return this.httpClient.get<Proposition[]>(this.url + this.currentUserId + '/proposition', {
      headers: headersObject,
    });
  }

  public registerUser(body: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.post(this.url + 'register', body, httpOptions);
  }

  public loginUser(body: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.post(this.url + 'login', body, httpOptions);
  }

  public logoutUser(userId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.post(this.url + 'logout/' + userId, httpOptions);
  }

  public getUserById(userId: number) {
    return this.httpClient.get<User>(this.url + 'user/' + userId);
  }

  public isUserLogged(userId: number) {
    let isLogged;
    this.getUserById(userId).subscribe((u) => {
      if (u.logged) {
        isLogged = true;
      } else {
        isLogged = false;
      }
    });
    return isLogged;
  }
}
