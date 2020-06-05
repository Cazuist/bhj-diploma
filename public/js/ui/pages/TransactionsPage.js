'use strict';

class TransactionsPage {

  constructor( element ) {
    if(!element) {
      throw new Error('Не могу создать что-то из ничего');
    }

    this.element = element;

    this.registerEvents();
  }

  registerEvents() {
    const accountBtn = this.element.querySelector('.remove-account');
    const content = this.element.querySelector('.content');

    accountBtn.addEventListener('click', () => {
      this.removeAccount();
    });

    content.addEventListener('click', (event) => {
      const node = event.target.nodeName;

      if (node === 'I' || node === 'BUTTON') {
        const id = event.target.closest('button').dataset.id;
        
        this.removeTransaction(id);
      }
    });
  }

  update() {    
    this.render(this.lastOptions);
  }

  removeAccount() {
    if (!this.lastOptions) {
      return
    }

    if( confirm('Вы действительно хотите удалить счет?') ) {
      Account.remove(this.lastOptions.account_id, {}, (error, response) => {        
        this.clear(); 
        App.update();               
      });
    }    
  }

  removeTransaction( id ) {
    if( confirm('Вы действительно хотите удалить эту транзакцию?') ) {
      Transaction.remove(id, {}, (error, response) => {
 
        App.update();
      }); 
    }    
  }

  render( options ) {
    if (!options) {
      return;
    }              

    Account.get(options.account_id, {}, (error, response) => {
      const currentAccount = response.data.filter( (item) => item.id === options.account_id);

      this.renderTitle(currentAccount[0].name);
    });

    Transaction.list( options, (error, response) => {
      this.renderTransactions(response.data);        
    });

    this.lastOptions = options;
  }

  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
    this.lastOptions = '';
  }

  renderTitle( name ) {
    this.element.querySelector('.content-title').innerText = name;
  }

  formatDate( date ) {
    const input = new Date(date);
    const hours = input.getHours() >= 10 ? input.getHours() : `0${input.getHours()}`;
    const min = input.getMinutes() >= 10 ? input.getMinutes() : `0${input.getMinutes()}`;
    const options ={
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };

    let string = input.toLocaleString('ru', options);    

    string += ` в ${hours}:${min}`;    
    return string;    
  }

  getTransactionHTML( item ) {    
    const color = item.type === 'INCOME' ? 'green' : 'red';

    const html = `
      <div class="transaction transaction_${item.type} row">
        <div class="col-md-7 transaction__details">
          <div class="transaction__icon">
              <span class="fa fa-money fa-2x" style="color: ${color}"></span>
          </div>
          <div class="transaction__info">
              <h4 class="transaction__title">${item.name}</h4>
              <div class="transaction__date">${this.formatDate(item.created_at)}</div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="transaction__summ">
          ${item.sum}
               <span class="currency">₽</span>
          </div>
        </div>
        <div class="col-md-2 transaction__controls">
            <button class="btn btn-danger transaction__remove" data-id=${item.id}>
                <i class="fa fa-trash"></i>  
            </button>
        </div>
      </div>
    `;

    return html;
  }

  renderTransactions( data ) {
    const content = this.element.lastElementChild;
    content.innerHTML = '';

    data.forEach( (item) => {
      const html = this.getTransactionHTML( item );
      content.insertAdjacentHTML('beforeend', html);
    });
  }
}