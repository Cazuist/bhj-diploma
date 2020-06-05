'use strict';

class RegisterForm extends AsyncForm {
  
  constructor(element) {
  	super(element);
  }

  onSubmit( options ) {
    this.element.reset();
    
  	User.register(options, (error, response) => {
      App.setState( 'user-logged' );
      App.getModal('register').close();
    });
  }
}
