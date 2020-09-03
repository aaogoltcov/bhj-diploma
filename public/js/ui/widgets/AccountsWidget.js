'use strict';

class AccountsWidget {

  constructor( element ) {
    if (element) {
      this.element = element;
      this.registerEvents();
      // this.update();
    } else {
      throw ('Такого элемента не существует...');
    }
  };

  registerEvents() {
    // create account
    this.element.getElementsByClassName('create-account').item(0).onclick = function () {
      App.getModal('createAccount').open();
    }
    // choose account
    let listAccounts = this.element.getElementsByClassName('account');
    if ( listAccounts.length > 0 ) {
      Array.from( listAccounts ).forEach( element => {
        element.onclick = event => {
            this.onSelectAccount( element );
          }
        });
      }
  };

  update() {
    try {
      Account.list(User.current().user, response => {
        if (response && response.success && response.data) {
          this.clear();
          Array.from(response.data).forEach(element => {
            this.renderItem( element );
          });
          this.registerEvents();
        }
      });
    } catch ( error ) {
      console.log(`Пользователь не авторизирован: ${ error }`)
    };
  };

  clear() {
    let listAccounts = Array.from(document.querySelectorAll('li.account'));
    if ( listAccounts.length > 0 ) {
      listAccounts.forEach(element => {
        element.remove();
      });
    }
  };

  onSelectAccount( element ) {
    let activeAccount = this.element.querySelector('li.active');
    activeAccount ? activeAccount.classList.toggle('active') : '';
    element.classList.toggle('active');
    App.showPage( 'transactions', { account_id: element.dataset.id });
  }

  getAccountHTML( item ) {
    return `<li class="account" data-id="${ item['id'] }">
              <a href="#">
              <span>${ item['name'] }</span> /
              <span>${ item['sum'] } ₽</span>
              </a>
            </li>`;
  }

  renderItem( item ) {
    let accountPanel = document.getElementsByClassName('accounts-panel').item(0);
    accountPanel.insertAdjacentHTML('beforeend', this.getAccountHTML( item ));
  }
}
