'use strict';

class User {
  
  static URL = '/user';
  
  static setCurrent(user) {
    const storage = {};

    storage.id = user.id;
    storage.name = user.name;    

    localStorage.setItem('user', JSON.stringify(storage) );
  }
  
  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  static current() {
    return JSON.parse( localStorage.getItem('user') );
  }

  static fetch( data = User.current(), callback = f => f ) {
    const options = {
      data,
      url: `${this.URL}/current`,
      method: 'GET',
      callback,   
    };

    return createRequest(options);
  }

  static login( data, callback = f => f ) {
    
    const options = {
      data,      
      url: `${this.URL}/login`,
      method: 'POST',
      callback: (error, response) => {
        if(error) {
          console.log(error);
        } else {
          User.setCurrent(response.user);
          callback(error, response);
        }
      }        
    };

    return createRequest(options);
  }

  static register( data, callback = f => f ) {
    const options = {
      data,      
      url: `${User.URL}/register`,
      method: 'POST',
      callback: (error, response) => {
        if(error) {
          console.log(error);
        } else {
          User.setCurrent(response.user);
          callback(error, response);
        }
      } 
    };

    return createRequest(options);
  }

  static logout( {}, callback = f => f ) {
    const options = {
      url: `${User.URL}/logout`,
      method: 'POST',
      callback: (error, response) => {
        if(error) {
          console.log(error);
        } else {
          User.unsetCurrent();
          callback(error, response);
        }
      }   
    }

    return createRequest(options);
  }
}