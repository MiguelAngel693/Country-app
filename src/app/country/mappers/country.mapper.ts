import { Country } from "../interfaces/country.interface";
import { RestCountryItem } from "../interfaces/rest-countries";

export class CountryMapper{
  static mapCountryResponseItemToCountryItem( countryItem: RestCountryItem): Country{
    const country: Country = {
      code: countryItem.codes.alpha_3 || 'No disponible',
      name: countryItem.names.translations["spa"].common || countryItem.names.official,
      flag: countryItem.flag.emoji || 'No disponible',
      flagSvg: countryItem.flag.url_svg || 'No disponible',
      capital: countryItem.capitals[0].name || 'No disponible',
      population: countryItem.population || 0
    }
    return country;
  }

  static mapCountryResponseArrayToCountryArray(countryItems: RestCountryItem[]): Country[]{
    return countryItems.map(this.mapCountryResponseItemToCountryItem);
  }
}
