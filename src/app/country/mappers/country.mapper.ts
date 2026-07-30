import { Country } from "../interfaces/country.interface";
import { RestCountryItem } from "../interfaces/rest-countries";

export class CountryMapper{
  static mapCountryResponseItemToCountryItem( countryItem: RestCountryItem): Country{
    const country: Country = {
      code: countryItem.codes.alpha_3 ?? 'No disponible',
      name: countryItem.names.translations["spa"].common ?? countryItem.names.official,
      flag: countryItem.flag.emoji ?? 'No disponible',
      flagSvg: countryItem.flag.url_svg ?? 'No disponible',
      capital: countryItem.capitals[0]?.name ?? 'No disponible',
      population: countryItem.population ?? 0,
      // region: countryItem.region,
      // subregion: countryItem.subregion,
      region: CountryMapper.translator(countryItem.region),
      subregion: CountryMapper.translator(countryItem.subregion),
      area: countryItem.area.kilometers,
      language: countryItem.languages[0]?.name ?? 'null',
      borders: countryItem.borders
    }
    return country;
  }

  static mapCountryResponseArrayToCountryArray(countryItems: RestCountryItem[]): Country[]{
    return countryItems.map(this.mapCountryResponseItemToCountryItem);
  }

  static translator(name: string){
    if(!name) return '';
    if(name == 'Americas') return 'América'
    if(name == 'Europe') return 'Europa'
    if(name == 'North America') return 'Norteamérica'
    if(name == 'South America') return 'Sudamérica'
    if(name == 'Africa') return 'África'
    if(name == 'Oceania') return 'Oceanía'
    return name;
  }
}
