import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dollar'
})
export class DollarPipe implements PipeTransform {

  transform(value: number | undefined, ...args: unknown[]): string {
    if (value == null || value == undefined) {
      return '';
    }

    return '$' + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

}
