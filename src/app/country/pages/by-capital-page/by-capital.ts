import { Component, inject, resource, signal } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { List } from "../../components/list/list";
import { CountryService } from '../../services/CountryService';
import { Country } from '../../interfaces/country.interface';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop'
@Component({
  selector: 'by-capital',
  imports: [SearchInput, List],
  templateUrl: './by-capital.html',
})
export class ByCapital {
  country = inject(CountryService);
  query = signal('');

  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if (!params.query) return of([]);

      return this.country.searchByCapital(this.query())
    }
  })


  // countryResource = rxResource({
  //   params: () => ( {query: this.query()} ),
  //   stream: ({params}) => {
  //     if(!params.query) return of([]);
  //     return  this.countryService.searchByCountry(params.query)


  //   }
  // })
  // countryResource = resource({
  //   params: () => ({ query: this.query() }),
  //   loader: async ({ params }) => {
  //     if (!params.query) return [];

  //     return await firstValueFrom(
  //       this.country.searchByCapital(this.query()),
  //     )
  //   }
  // })







  // countries = signal<Country[]>([]);
  // isLoading = signal(false);
  // isError = signal<string | null>(null);

  // onSearch(query: string) {
  //   if (this.isLoading()) return;
  //   this.isLoading.set(true);
  //   this.isError.set(null);
  //   this.country.searchByCapital(query).subscribe({
  //     next: (countries) => {
  //       this.countries.set(countries);
  //       this.isLoading.set(false);
  //       if (this.countries().length == 0)
  //         this.isError.set(`No se encontraron paises para el termino ${query}`)
  //     },
  //     error: () => {
  //       this.isLoading.set(false);
  //       this.countries.set([]);
  //     }
  //   });

  // }
}
