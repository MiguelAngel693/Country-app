import { Component, input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'list',
  imports: [DecimalPipe],
  templateUrl: './list.html',
})
export class List {
  countries = input.required<Country[]>();

}
