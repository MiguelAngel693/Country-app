import { Routes } from '@angular/router';
import { ByCapital } from '../pages/by-capital-page/by-capital';
import { CountryLayout } from '../layouts/country-layout/country-layout';
import { ByRegion } from '../pages/by-region/by-region';
import { ByCountry } from '../pages/by-country/by-country';
import { CountryPage } from '../pages/country-page/country-page';

export const countryRoutes: Routes = [
  {
    path: '',
    component: CountryLayout,
    children: [
      {
        path: 'by-capital',
        component: ByCapital
      },
      {
        path:'by-region',
        component: ByRegion
      },
      {
        path:'by-country',
        component: ByCountry
      },
      {
        path:'by/:code',
        component: CountryPage,
      },
      {
        path: '**',
        redirectTo: 'by-capital',
      }


    ]
  },

]

export default countryRoutes;
