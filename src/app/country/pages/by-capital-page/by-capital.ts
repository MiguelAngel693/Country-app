import { Component } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { List } from "../../components/list/list";

@Component({
  selector: 'by-capital',
  imports: [SearchInput, List],
  templateUrl: './by-capital.html',
})
export class ByCapital {

  onSearch(event: string){
    console.log({event});


  }
}
