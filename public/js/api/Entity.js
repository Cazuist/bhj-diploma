'use strict';

class Entity {

  static URL = '';

  static list( data = User.current(), callback = f => f ) {
    const options = {
      data,
      url: this.URL,
      method: 'GET',
      callback, 
    }
    
    return createRequest(options);
  }

  static create( data, callback = f => f ) {
    const options = {
      data: Object.assign({_method: 'PUT'}, data),
      url: this.URL,
      method: 'POST',
      callback,  
    }

    return createRequest(options);
  }

  static get( id = '', data, callback = f => f ) {
    const options = {
      data: Object.assign({id}, {_method: 'DELETE'}, data),
      url: this.URL,
      method: 'GET',
      callback, 
    }

    return createRequest(options);
  }

  static remove( id = '', data, callback = f => f ) {
    const options = {
      data: Object.assign({id}, {_method: 'DELETE'}, data),
      url: this.URL,
      method: 'POST',
      callback,
    }

    return createRequest(options);
  }
}