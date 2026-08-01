import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { RestCountryResponse } from '../interfaces/rest-countries';
import { catchError, delay, map, of, tap, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../interfaces/country.interface';


@Injectable({
  providedIn: 'root',
})

export class CountryService {
  private http = inject(HttpClient);
  private capitalCache = new Map<string, Country[]>()
  private countryCache = new Map<string, Country[]>()
  private regionCache = new Map<string, Country[]>()
  private codeCache = new Map<string, Country | undefined>()

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
      tap((countries) => {
        switch (endpoint) {
          case '':
            this.countryCache.set(query, countries);
            break;
          case '/capitals':
            this.capitalCache.set(query, countries);
            break;
          case '/region':
            this.regionCache.set(query, countries);
            break;
        }
      }),
      delay(1000),
      catchError((err) => {
        throw ('Fetching error ' + err);
      })
    );
  }

  public searchCountryByCode(code: string) {
    // if(this.codeCache.has(code)) return of(this.codeCache.get(code))
    return this.http.get<RestCountryResponse>(`${environment.countriesUrl}/codes.alpha_3/${code}`, {
      // return this.http.get<RestCountryResponse>(`/codes.alpha_3/${code}`, {
      headers: {
        Authorization: `Bearer ${environment.api_key}`,
      },
    }).pipe(
      map(resp => CountryMapper.mapCountryResponseArrayToCountryArray(resp.data.objects ?? [])),
      map(countries => countries.at(0)),
      delay(1000),
      tap((country) => {
        return this.codeCache.set(code, country);
      }),
      catchError((err) => {
        return throwError(() => new Error('No se pudo obtener un pais con el codigo ' + code));
      })
    );
  }


  searchByCapital(query: string) {
    if (this.capitalCache.has(query)) return of(this.capitalCache.get(query));
    console.log('Buscando en el servidor')
    return this.search(query, '/capitals');
  }
  searchByCountry(query: string) {
    if (this.countryCache.has(query)) return of(this.countryCache.get(query));
    return this.search(query, '');
  }
  searchByRegion(query: string) {
    if (this.regionCache.has(query)) return of(this.regionCache.get(query));
    return this.search(query, '/region');
  }
}
