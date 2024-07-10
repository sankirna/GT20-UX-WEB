import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {}

  transform(value: any, format: string = 'mediumDate'): string | null {
    if (!value) {
      return null;
    }
    return this.datePipe.transform(value, format);
  }
}
