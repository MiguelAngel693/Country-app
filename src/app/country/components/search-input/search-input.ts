import { Component } from '@angular/core';

@Component({
  selector: 'search-input',
  imports: [],
  templateUrl: './search-input.html',
})
export class SearchInput {

  onSearch(value: string){
    console.log({value});
  }
}
