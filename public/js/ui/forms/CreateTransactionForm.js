'use strict';

class CreateTransactionForm extends AsyncForm {
 
  constructor( element ) {
    super(element);

    this.renderAccountsList();
  }

  renderAccountsList() {
    if(User.current()) {
      Account.list( User.current(), (error, response) => {
        const accounts = response.data;        
        const select = this.element.querySelector('.accounts-select');
        const fragment = new DocumentFragment();
        
        select.innerHTML = '';        

        accounts.forEach( (item) => {
          const option = document.createElement('option');
          option.value = item.id;
          option.innerText = item.name;

          fragment.append(option);
        });

        select.append(fragment);
      });
    }    
  }

  onSubmit( options ) {
    Transaction.create(options, (error, response) => {
      if(!error) {
        const flag = this.element.id.match(/-[a-z]+-/i)[0];
        
        App.getModal(`new${flag.slice(1, 2).toUpperCase()}${flag.slice(2, -1)}`).close();        
      }

      App.update();
    });
  }
}