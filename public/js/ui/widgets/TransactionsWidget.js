'use strict';

class TransactionsWidget {

  constructor( element ) {
    this.element = element;

    this.registerEvents();
  }

  registerEvents() {
    const btns = this.element.children;

    Array.from(btns).forEach( (btn) => {
      btn.addEventListener('click', (event) => {
        const classes = event.target.className;
        const flag = classes.match(/-[a-z]+-/i)[0];

        App.getModal(`new${flag.slice(1, 2).toUpperCase()}${flag.slice(2, -1)}`).open();
      });
    });
  }
}

