'use strict';

const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  
  const method = options.method;
  const data = options.data;
  let url = options.url;

  if ( Object.hasOwnProperty('headers') ) {
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
      if(xhr.status === 200) {
        options.callback(null, xhr.response)
      } else {
        options.callback(xhr.response.error, null);
      }
    }

  } catch (error) {
    console.log(`Упс!. Что-то пошло не так. ${error.message}`);
  }

  return xhr;	
};