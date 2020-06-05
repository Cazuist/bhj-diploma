'use strict';

class UserWidget {

  constructor( element ) {
    if(!element) {
      throw new Error('Не могу создать что-то из ничего');
    }

    this.element = element;
  }

  update() {
    if( User.current() ) {
      document.querySelector('.user-name').innerText = User.current().name;
    }
  }
}
