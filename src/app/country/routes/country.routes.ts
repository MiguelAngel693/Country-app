import { Routes } from '@angular/router';
import { ByCapital } from '../pages/by-capital-page/by-capital';
import { CountryLayout } from '../layouts/country-layout/country-layout';

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
        path: '**',
        redirectTo: 'by-capital',
      }


    ]
  },

]

export default countryRoutes;
