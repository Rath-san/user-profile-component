import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateSpread'
})
export class DateSpreadPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    const ONE_DAY = 1000 * 3600 * 24;

    const dateInput = Number(value);
    const dateNow = Date.now();

    const timeDiff = Math.abs(dateNow - dateInput);
    const diffDays = Math.ceil(timeDiff / ONE_DAY);

    if (diffDays <= 1) {
      return 'today';
    } else if (diffDays > 1 && diffDays <= 31) {
      return diffDays - 1 + 'd';
    } else if (diffDays > 31 && diffDays <= 365) {
      return `${Math.round(Math.floor((diffDays - 1) / 31))}m`;
    } else if (diffDays > 365) {
      return `${Math.round(Math.floor((diffDays - 1) / 365))}y`;
    }
    return '';

  }
}
