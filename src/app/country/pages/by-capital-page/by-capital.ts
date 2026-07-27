import { Component, inject, signal } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { List } from "../../components/list/list";
import { CountryService } from '../../services/CountryService';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'by-capital',
  imports: [SearchInput, List],
  templateUrl: './by-capital.html',
})
export class ByCapital {
  country = inject(CountryService);
  countries = signal<Country[]>([]);
  onSearch(event: string) {
    this.country.searchByCapital(event).subscribe(
      data=>{
        console.log(data)
        this.countries.set(data);
      }
    );

  }
}
