import { Routes } from '@angular/router';
import { ByCapital } from '../pages/by-capital-page/by-capital';

export const countryRoutes: Routes = [
  {
    path: '',
    component: ByCapital,
  },

]

export default countryRoutes;
