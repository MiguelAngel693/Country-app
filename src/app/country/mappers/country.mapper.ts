import { Country } from "../interfaces/country.interface";
import { RestCountryItem } from "../interfaces/rest-countries";

export class CountryMapper{
  static mapCountryResponseItemToCountryItem( countryItem: RestCountryItem): Country{
    const country: Country = {
      code: countryItem.codes.alpha_3,
      name: countryItem.names.translations["spa"].common,
      flag: countryItem.flag.emoji,
      flagSvg: countryItem.flag.url_svg,
      capital: countryItem.capitals[0].name,
      population: countryItem.population
    }
    return country;
  }

  static mapCountryResponseArrayToCountryArray(countryItems: RestCountryItem[]): Country[]{
    return countryItems.map(this.mapCountryResponseItemToCountryItem);
  }
}
