import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'engineSize'
})
export class EngineSizePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any {

    return `${value} cmc/ ${Math.round(value/1000 * 10) / 10} L`;
  }

}
