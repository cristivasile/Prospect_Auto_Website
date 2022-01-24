import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distance'
})
export class DistancePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any {

    var first = this.formatNumber(`${value%1000}`);
    var second = this.formatNumber(`${(Math.floor(value/1000))%1000}`);
    var third = this.formatNumber(`${(Math.floor(value/1000000 ))%1000}`);

    if(value < 1000)
      return `${value} km`;

    if(value < 1000000){
      return `${(Math.floor(value/1000))%1000}.${first} km`;
    }

    if(value < 1000000000)
      return `${(Math.floor(value/1000000))%1000}.${second}.${first} km`;

    return `${(Math.floor(value/1000000000))%1000}.${third}.${second}.${first}`;
  }

  private formatNumber(string: any) : string{
    if(string.length == 1)
      string = `00${string}`;
    if(string.length == 2)
      string = `0${string}`;

    return string;
  }

}
