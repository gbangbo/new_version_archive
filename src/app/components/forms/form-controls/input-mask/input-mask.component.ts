import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-input-mask',
  imports: [FormsModule, CardComponent],
  providers: [DecimalPipe],
  templateUrl: './input-mask.component.html',
  styleUrl: './input-mask.component.scss'
})

export class InputMaskComponent {

  public formattedDate: string = '';
  public formattedMonthDate: string = '';
  public formattedTime: string = '';
  public formattedHourTime: string = '';
  public currency: string = '';
  public prefixNumber: string = 'PREFIX-';
  public delimiterNumber: string = '';
  public phoneNumber: string = '';
  public cardNumber: string = '';
  public tailPrefix: string = '';
  public ipAddress: string = '';
  public multipleDelimiter: string = '';
  public multipleCharacters: string = '';

  constructor(private DecimalPipe: DecimalPipe) {}

  formatDate(event: string) {
    let inputDate = event.replace(/[^0-9]/g, '');
    
    let day = inputDate.slice(0, 2);
    if (+day > 31) {
      day = `0${inputDate.slice(0, 1)}`;
    }
  
    let month = inputDate.slice(2, 4);
    if (+month > 12) {
      month = `0${inputDate.slice(2, 3)}`;
    }
  
    let year = inputDate.slice(4, 8);
  
    if (inputDate.length == 2) {
      this.formattedDate = `${day}-`;
    } else if (inputDate.length == 4) {
      this.formattedDate = `${day}-${month}-`;
    } else if (inputDate.length >= 6) {
      this.formattedDate = `${day}-${month}-${year}`;
    }
  }

  formatMonthDateDate(event: string) {
    const inputDate = event.replace(/[^0-9]/g, '');
    let month = inputDate.slice(0, 2);
    if (+month > 12) {
      month = `0${inputDate.slice(0,1)}`;
    }
  
    let year = inputDate.slice(2, 6);
  
    if (inputDate.length == 2) {
      this.formattedMonthDate = `${month}/`;
    } else if (inputDate.length >= 6) {
      this.formattedMonthDate = `${month}/${year}`;
    }
  }

  formatTime(event: string) {
    let inputTime = event.replace(/[^0-9]/g, '');

    let hours = inputTime.slice(0, 2);
    if (+hours > 23) {
      hours = `0${inputTime.slice(0, 1)}`;
    }

    let minutes = inputTime.slice(2, 4);
    if (+minutes > 59) {
      minutes = `0${inputTime.slice(2,3)}`;
    }

    let seconds = inputTime.slice(4, 6);
    if (+seconds > 59) {
      seconds = `0${inputTime.slice(4,5)}`;
    }

    if (inputTime.length == 2) {
      this.formattedTime = `${hours}:`;
    } else if (inputTime.length == 4) {
      this.formattedTime = `${hours}:${minutes}:`;
    } else if (inputTime.length >= 6) {
      this.formattedTime = `${hours}:${minutes}:${seconds}`;
    }
  }

  formatHoutTime(event: string) {
    const inputTime = event.replace(/[^0-9]/g, '');
    let minutes = inputTime.slice(0,2);
    if (+minutes > 59) {
      minutes = `0${inputTime.slice(0,1)}`;
    }

    let seconds = inputTime.slice(2,4);
    if (+seconds > 59) {
      seconds = `0${inputTime.slice(2,3)}`;
    }

    if (inputTime.length == 2) {
      this.formattedHourTime = `${minutes}:`;
    } else if (inputTime.length == 4) {
      this.formattedHourTime = `${minutes}:${seconds}`;
    }
  }

  formatCurrency(event: string) {
    const cleanedAmount = event.replace(/[^0-9]/g, '');

    const formattedAmount = this.DecimalPipe.transform(cleanedAmount, '1.0-0');
    this.currency = formattedAmount || '';
  }

  formatPrefix(event: string) {
    let prefix = event.replace(/[^0-9]/g, ''); 
    let formattedPrefix = 'PREFIX-';
  
    for (let i = 0; i < prefix.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedPrefix += '-';  
      }
      formattedPrefix += prefix[i];  
    }
  
    this.prefixNumber = formattedPrefix; 
  }

  formatDelimiter(event: string) {
    let input = event.replace(/[^0-9]/g, ''); 
    let formattedInput = '';
    
    for (let i = 0; i < input.length; i++) {
      if (i > 0 && i % 3 === 0) {
        formattedInput += '·'; 
      }
      formattedInput += input[i]; 
    }
    
    this.delimiterNumber = formattedInput;
  }
  

formatPhoneNumber(event: string) {
  let input = event.replace(/[^0-9]/g, ''); 
  
  let formattedPhoneNumber = '';
  
  if (input.length > 0) {
    formattedPhoneNumber += '(' + input.substring(0, 3); 
  }
  if (input.length >= 4) {
    formattedPhoneNumber += ') ' + input.substring(3, 6); 
  }
  if (input.length >= 7) {
    formattedPhoneNumber += '-' + input.substring(6, 10);
  }
  
  this.phoneNumber = formattedPhoneNumber;

}

formatCardNumber(event: string) {
  let input = event.replace(/[^0-9]/g, ''); 
  let formattedCardNumber = '';
  
  for (let i = 0; i < input.length; i++) {
    if (i > 0 && i % 4 === 0) {
      formattedCardNumber += ' '; 
    }
    formattedCardNumber += input[i]; 
  }
  
  this.cardNumber = formattedCardNumber; 
}

formatTailPrefix(event: string) {
  let input = event.replace(/[^0-9.]/g, ''); 
  
  const dotIndex = input.indexOf('.');
  if (dotIndex !== -1) {
    input = input.substring(0, dotIndex + 1) + input.substring(dotIndex + 1).replace('.', ''); 
  }

  let parts = input.split('.');
  if (parts[1]) {
    parts[1] = parts[1].substring(0, 2); 
  }
  
  input = parts.join('.');

  if (input.length > 0) {
    input = input + '€';
  }

  this.tailPrefix = input; 
}

formatIpAddress(event: string) {
  let input = event.replace(/[^0-9]/g, '');

  let formattedValue = '';
  let counter = 0;

  for (let i = 0; i < input.length; i++) {
    if (counter === 3 || counter === 6 || counter === 8) {
      formattedValue += '.';
    }
    formattedValue += input[i];
    counter++;
  }

  this.ipAddress = formattedValue;
}

formatMultipleDelimiter(event: string) {
  let input = event.replace(/[^0-9]/g, '');
  
  let formattedValue = '';
  
  for (let i = 0; i < input.length; i++) {
    if (i === 3 || i === 6) {
      formattedValue += '.';  
    }
    if (i === 9) {
      formattedValue += '-';  
    }
    formattedValue += input[i];  
  }

  this.multipleDelimiter = formattedValue; 
}

formatMultipleCharacters(event: string) {
  let input = event.replace(/[^0-9]/g, ''); 
  
  let formattedValue = '';
  
  for (let i = 0; i < input.length; i++) {
  
    if (i > 0 && i % 3 === 0) {
      formattedValue += ' | '; 
    }
    formattedValue += input[i];
  }
  
  this.multipleCharacters = formattedValue; 
}

}