import { Component, inject, signal } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { List } from "../../components/list/list";
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/CountryService';

@Component({
  selector: 'app-by-region',
  imports: [SearchInput, List],
  templateUrl: './by-region.html',
})
export class ByRegion {
  country = inject(CountryService);
  countries = signal<Country[]>([]);

  onSearch(event: string) {
    this.country.searchByRegion(event).subscribe(
      data => {
        console.log(data)
        this.countries.set(data);
      }
    );
  }
}
