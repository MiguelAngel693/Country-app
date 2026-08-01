import { Component, inject, linkedSignal, signal } from '@angular/core';
import { List } from "../../components/list/list";
import { CountryService } from '../../services/CountryService';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, } from "@angular/router";
import { of } from 'rxjs';

@Component({
  selector: 'app-by-region',
  imports: [List],
  templateUrl: './by-region.html',
})
export class ByRegion {
  country = inject(CountryService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  query = signal(this.queryParam);
  selectedRegion = linkedSignal<string>(() => this.queryParam);

  regions: string[] = ["africa", "americas", "asia", "europe", "oceania","antarctic"];
  regionSpanish = ['África', 'América', 'Asia', 'Europa', 'Oceanía','Antártida'];
  // regions: Record<string,string> = {
  //   'africa': 'África',
  //   'america': 'América',
  //   'asia': 'Asia',
  //   'europa': 'Europa',
  //   'oceania': 'Oceanía',
  // }
  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if (!params.query) return of([]);
      this.router.navigate(['/country/by-region/'], {
        queryParams: {
          query: params.query,
        }
      })
      return this.country.searchByRegion(this.query())
    }
  })

  selectRegion(value: string) {
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
