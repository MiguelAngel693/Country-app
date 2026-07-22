import { Component } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { List } from "../../components/list/list";

@Component({
  selector: 'app-by-region',
  imports: [SearchInput, List],
  templateUrl: './by-region.html',
})
export class ByRegion {

   onSearch(event: string){
    console.log({event});
  }
}
