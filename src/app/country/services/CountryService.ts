import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { RestCountryResponse } from '../interfaces/rest-countries';
@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);


  searchByCapital(query: string) {
    return this.http.get<RestCountryResponse>(`${environment.countriesUrl}/capitals`, {
      headers: {
        Authorization: `Bearer ${environment.api_key}`
      }, params: {
        q: query
      }
    });
  }
}
