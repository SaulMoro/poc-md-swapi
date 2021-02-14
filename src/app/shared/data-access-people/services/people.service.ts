import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@md-starwars/environment';
import { People } from '../models';

const API_PATCH = '/people';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  constructor(private http: HttpClient) {}

  getPeople(peopleId: number): Observable<People> {
    return this.http.get<People>(`${environment.apiUrl}${API_PATCH}/${peopleId}/`);
  }
}
