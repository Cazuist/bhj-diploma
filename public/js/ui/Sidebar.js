'use strict';

class Sidebar {

  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  static initToggleButton() {
    const slidebarBtn = document.querySelector('.sidebar-toggle');
    
    slidebarBtn.addEventListener('click', (event) => {
      event.preventDefault();

      document.body.classList.toggle('sidebar-open');
      document.body.classList.toggle('sidebar-collapse');      
    });
  }

  static initAuthLinks() {
    const loginBtns = document.querySelectorAll('.menu-item a');
    
    Array.from(loginBtns).forEach( (btn) => {
      btn.addEventListener('click', (event) => {
        event.preventDefault();

        const parent = btn.closest('.menu-item');
        const flag = parent.className.match(/(?<=_)[a-z]+/)[0];
        const modal = App.getModal(flag);

        if(flag != 'logout') {
          modal.open();
        } else {
          User.logout({}, (error, response) => {
            App.setState('init');
          });          
        }           
      });
    });
  }
}
