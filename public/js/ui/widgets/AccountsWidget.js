'use strict';

class AccountsWidget {

  constructor( element ) {
    if(!element) {
      throw new Error('Не могу создать что-то из ничего!');
    }

    this.element = element;

    this.update();    
    this.registerEvents();    
  }

  registerEvents() {
    const createBtn = this.element.querySelector('.create-account');

    createBtn.addEventListener('click', () => {
      event.preventDefault();

      App.getModal('createAccount').open();      
    });

    this.element.addEventListener('click', (event) => {
      event.preventDefault();
            
      const node = event.target.nodeName;

      if ( (node === 'A' || node === 'SPAN') 
                && !event.target.classList.contains('label') ) {
        this.onSelectAccount(event.target);
      }
    }); 
  }

  update() {
    if(User.current()) {
      Account.list( User.current(), (error, response) => {
        const accounts = response.data;

        this.clear();
        accounts.forEach( (item) => this.renderItem(item) );        
      });
    }           
  }

  clear() {
    const clearAcc = this.element.getElementsByClassName('account');
    
    Array.from(clearAcc).forEach( (item) => {
      item.remove();
    });
  }

  onSelectAccount( element ) {
    const accounts = element.closest('UL').children;
    const id = element.closest('LI').dataset.id;

    Array.from(accounts).forEach( (item) => {
      item.classList.remove('active');
    });    

    element.closest('LI').classList.add('active');
    App.showPage('transactions', { account_id: id });
  }

  getAccountHTML( item ) {
    const html = `
      <li class="account" data-id="${item.id}">
        <a href="#">
          <span>${item.name}</span> /
          <span>${item.sum} ₽</span>
        </a>
      </li>
    `;  

    return html;
  }

  renderItem( item ) {
    const html = this.getAccountHTML(item);
    
    this.element.insertAdjacentHTML('beforeend', html);
  }
}