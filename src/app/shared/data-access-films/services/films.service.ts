import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@md-starwars/environment';
import { Film } from '../models';

const API_PATCH = '/films';

@Injectable({
  providedIn: 'root',
})
export class FilmsService {
  constructor(private http: HttpClient) {}

  getFilm(filmId: number): Observable<Film> {
    return this.http.get<Film>(`${environment.apiUrl}${API_PATCH}/${filmId}/`);
  }
}
