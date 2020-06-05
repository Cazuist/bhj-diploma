'use strict';

const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  
  const method = options.method;
  const data = options.data;
  let url = options.url;

  if ( options.hasOwnProperty('headers') ) {
    for (let header in headers) {
      xhr.setRequestHeader(header, headers[header]);
    }
  }

  xhr.responseType = options.ressponseType || 'json';
  xhr.withCredentials = true;  

  try {
    
    if(method === 'GET') {
      let URLForGET = `${url}?`;
      
      for (let key in data) {
        URLForGET += `${key}=${data[key]}&`;
      }

      xhr.open(method, URLForGET.slice(0, -1));
      xhr.send();
    } else {
      const formData = new FormData();

      for (let key in data) {
        formData.append(key, data[key]);
      }

      xhr.open(method, url);
      xhr.send(formData);
    }

    xhr.onload = function() {
      if(this.status === 200 && this.response.success) {
        options.callback(null, this.response);
      } else {
        options.callback(this.response.error);
      }
    }

  } catch (error) {
    console.log(`Упс!. Что-то пошло не так. ${error.message}`);
  }

  return xhr;	
};