import { Component, inject, resource, signal } from '@angular/core';
import { List } from "../../components/list/list";
import { CountryService } from '../../services/CountryService';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-by-region',
  imports: [List],
  templateUrl: './by-region.html',
})
export class ByRegion {
  country = inject(CountryService);
  query = signal('');
  regions : string[]=["Africa","America","Asia","Europe","Oceania" ]
  selectedRegion = signal<string>('');

  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if (!params.query) return of([]);

      return this.country.searchByRegion(this.query())
    }
  })

  selectRegion(value: string){
    this.query.set(value);
    this.selectedRegion.set(value);
  }

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
