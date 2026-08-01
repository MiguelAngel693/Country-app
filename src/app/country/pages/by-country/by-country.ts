import { Component, inject, resource, signal } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { List } from "../../components/list/list";
import { CountryService } from '../../services/CountryService';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country',
  imports: [SearchInput, List],
  templateUrl: './by-country.html',
})
export class ByCountry {
  country = inject(CountryService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  query = signal(this.queryParam);

  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if (!params.query) return of([]);
      this.router.navigate(['/country/by-country/'], {
        queryParams: {
          query: params.query,
        }
      })
      return this.country.searchByCountry(this.query())
    }
  })
  // country = inject(CountryService);
  // countries = signal<Country[]>([]);

  // onSearch(event: string) {
  //   this.country.searchByCountry(event).subscribe(
  //     data => {
  //       console.log(data)
  //       this.countries.set(data);
  //     }
  //   );
  // }
}
