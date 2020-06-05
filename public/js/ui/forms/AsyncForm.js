'use strict';

class AsyncForm {

  constructor( element ) {
    if(!element) {
      throw new Error('Не могу создать что-то из ничего!');
    }
    
    this.element = element;
    this.registerEvents();
  }

  registerEvents() {
    this.element.addEventListener('submit', (event) => {
      event.preventDefault();
      
      this.submit();
    });    
  }

  getData() {
    const formdata = new FormData(this.element);
    const data = {};

    for(let item of formdata.entries()) {
      data[item[0]] = item[1];
    };

    return data;
  }

  onSubmit( options ) {

  }
 
  submit() {    
    this.onSubmit( this.getData() );
  }
}