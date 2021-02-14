import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@md-starwars/environment';
import { ApiResponse } from '@md-starwars/shared/models';
import { Starship } from '../models';

const API_PATCH = '/starships';

@Injectable({
  providedIn: 'root',
})
export class StarshipsService {
  constructor(private http: HttpClient) {}

  getStarships(page: number = 1): Observable<ApiResponse<Starship>> {
    const params = new HttpParams().set('page', String(page));
    return this.http.get<ApiResponse<Starship>>(`${environment.apiUrl}${API_PATCH}/`, { params });
  }

  getStarship(starshipId: number): Observable<Starship> {
    return this.http.get<Starship>(`${environment.apiUrl}${API_PATCH}/${starshipId}/`);
  }
}
