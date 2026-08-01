import { Component, input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'list',
  imports: [RouterLink],
  templateUrl: './list.html',
})
export class List {
  countries = input.required<Country[]>();

  errorMessage = input<string | undefined | Error>();
  isLoading = input<boolean>(false);
  isEmpty = input<boolean>(false);
}
