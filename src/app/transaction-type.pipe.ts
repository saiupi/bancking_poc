import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transactionType'
})
export class TransactionTypePipe implements PipeTransform {

  transform(value:boolean): string {
    if(value == true){
      return '+';
    }
    else{
      return '-';
    }
    
  }

}
