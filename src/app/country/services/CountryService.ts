import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { RestCountryResponse } from '../interfaces/rest-countries';
import { catchError, map} from 'rxjs';
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
        q: query
      }
    }).pipe(
      map(resp => CountryMapper.mapCountryResponseArrayToCountryArray(resp.data.objects ?? [])),
      catchError((err) => {
        throw ('Fetching error ' + err);
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
