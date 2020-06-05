'use strict';

class CreateAccountForm extends AsyncForm {

  onSubmit( options ) {
    Account.create(options, (error, response) => {
      if(!error) {
        App.update();        
        App.getModal('createAccount').close();
      }
    });     
  }
}
