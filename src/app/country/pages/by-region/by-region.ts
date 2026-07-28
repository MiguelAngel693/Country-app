import { Component, inject, resource, signal } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { List } from "../../components/list/list";
import { CountryService } from '../../services/CountryService';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-by-region',
  imports: [SearchInput, List],
  templateUrl: './by-region.html',
})
export class ByRegion {
  country = inject(CountryService);
  query = signal('');

  countryResource = resource({
    params: () => ({ query: this.query() }),
    loader: async ({ params }) => {
      if (!params.query) return [];
      return await firstValueFrom(
        this.country.searchByRegion(this.query()),
      )
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
