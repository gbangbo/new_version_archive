import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ChatService {

  getUserText(userName: string, value: string = ''): string {
    let names = userName.split(' ');
    if(value == 'singleText') {
      return names[0][0];
    } else {
      return names.map(name => name[0]).join('');
    }
    
  }

  getTextColor(name: string) {
    let firstLetter = name[0];

    if(firstLetter >= 'A' && firstLetter <= 'E') {
      return 'primary'
    } else if(firstLetter >= 'F' && firstLetter <= 'J'){
      return 'success'
    } else if(firstLetter >= 'K' && firstLetter <= 'O'){
      return 'warning'
    } else if(firstLetter >= 'P' && firstLetter <= 'T'){
      return 'danger'
    } else {
      return 'secondary'
    }
  }

}
