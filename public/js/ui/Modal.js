'use strict';

class Modal {
  
  constructor( element ) {
    if(!element) {
      throw new Error('Не могу создать что-то из ничего');
    }

    this.element = element;
    this.registerEvents();
  }

  registerEvents() {
    const dismiss = Array.from( this.element.querySelectorAll('[data-dismiss=modal]') );

    dismiss.forEach( (item) => {
      item.addEventListener( 'click', this.onClose() );
    });
  }

  onClose(element) {    
    return () => {
      this.close();
      };    
  }
 
  unregisterEvents() {
    const dismiss = Array.from( this.element.querySelectorAll('[data-dismiss=modal]') );
    dismiss.forEach( (item) => {
      item.removeEventListener( 'click', this.onClose() );
    });
  }

  open() {
    this.element.style.display = 'block';
  }
 
  close() {
    this.element.style.display = 'none';
    this.element.querySelector('form').reset();
  }
}