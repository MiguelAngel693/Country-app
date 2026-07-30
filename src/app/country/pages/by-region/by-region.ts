import { Component, inject, resource, signal } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { List } from "../../components/list/list";
import { CountryService } from '../../services/CountryService';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-region',
  imports: [SearchInput, List],
  templateUrl: './by-region.html',
})
export class ByRegion {
  country = inject(CountryService);
  query = signal('');

  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if (!params.query) return of([]);

      return this.country.searchByRegion(this.query())
    }
  })
  // country = inject(CountryService);
  // countries = signal<Country[]>([]);

  // onSearch(event: string) {
  //   this.country.searchByRegion(event).subscribe(
  //     data => {
  //       console.log(data)
  //       this.countries.set(data);
  //     }
  //   );
  // }
}
