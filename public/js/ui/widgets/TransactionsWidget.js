'use strict';

class TransactionsWidget {

  constructor( element ) {
    if ( element ) {
      this.element = element;
      this.registerEvents();
    } else {
      throw ('Такого элменента не существует...');
    }
  };

  registerEvents() {
    Array.from(this.element.querySelectorAll('button')).forEach( element => {
      element.onclick = event => {
        if (element.classList.contains('create-income-button')) {
          App.getModal('newIncome').open();
        } else {
          App.getModal('newExpense').open();
        }
      }
    });
  };

}
