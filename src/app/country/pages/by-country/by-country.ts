import { Component, inject, signal } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { List } from "../../components/list/list";
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/CountryService';

@Component({
  selector: 'app-by-country',
  imports: [SearchInput, List],
  templateUrl: './by-country.html',
})
export class ByCountry {

  country = inject(CountryService);
  countries = signal<Country[]>([]);

  onSearch(event: string) {
    this.country.searchByCountry(event).subscribe(
      data => {
        console.log(data)
        this.countries.set(data);
      }
    );
  }
}
