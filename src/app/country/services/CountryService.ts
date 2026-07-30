import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { RestCountryResponse } from '../interfaces/rest-countries';
import { catchError, delay, map, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);

  private search(query: string, endpoint: string) {
    return this.http.get<RestCountryResponse>(`${environment.countriesUrl}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${environment.api_key}`
      }, params: {
        q: query,
        limit: 100,
      }
    }).pipe(
      map(resp => CountryMapper.mapCountryResponseArrayToCountryArray(resp.data.objects ?? [])),
      delay(1000),
      catchError((err) => {
        throw ('Fetching error ' + err);
      })
    );
  }

  public searchCountryByCode(code: string) {
    return this.http.get<RestCountryResponse>(`${environment.countriesUrl}/codes.alpha_3/${code}`, {
    // return this.http.get<RestCountryResponse>(`/codes.alpha_3/${code}`, {
      headers: {
        Authorization: `Bearer ${environment.api_key}`,
      },
    }).pipe(
      map(resp => CountryMapper.mapCountryResponseArrayToCountryArray(resp.data.objects ?? [])),
      map(countries => countries.at(0)),
      delay(1000),
      catchError((err) => {
        return throwError(() => new Error('No se pudo obtener un pais con el codigo ' + code));
      })
    );
  }


  searchByCapital(query: string) {
    return this.search(query, '/capitals');
  }
  searchByCountry(query: string) {
    return this.search(query, '');
  }
  searchByRegion(query: string) {
    return this.search(query, '/region');
  }
}
