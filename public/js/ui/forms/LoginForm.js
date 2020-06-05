'use strict';

class LoginForm extends AsyncForm {
  
  constructor(element) {
  	super(element);
  }

  onSubmit( options ) {
    this.element.reset();    

    User.login(options, (error, response) => {
      App.setState( 'user-logged' );
      App.getModal('login').close();
    });
  }
}
