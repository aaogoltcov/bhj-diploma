'use strict';

class CreateTransactionForm extends AsyncForm {

  constructor( element ) {
    super( element );
    this.element = element;
    this.selects = this.element.querySelectorAll('select.accounts-select');
    this.select = this.element.querySelector('select.accounts-select');
    this.renderAccountsList();
  };

  renderAccountsList() {
    // clear current options
    Array.from(this.element.querySelectorAll('option')).forEach( element => {
      element.remove();
    });
    // add new options
    try {
      Account.list( User.current().user, response => {
        if (response && response.success) {
          Array.from( response.data ).forEach( element => {
            let option = document.createElement('option');
            option.value = element.id;
            option.innerHTML = element.name;
            Array.from(this.selects).forEach( element => {
              element.appendChild( option );
            });
          });
        }
      });
    } catch ( error ) {
      console.log(`Пользователь не авторизирован: ${ error }`)
    };
  }

  onSubmit( options ) {
    let type = '';
    let account_id = this.select.options[this.select.selectedIndex].value;
    let data = Object.assign({ user_id: User.current().id, account_id: account_id }, options.data );
    data.type = (this.element.id === 'new-income-form' ? type = 'income' : type = 'expense');
    Transaction.create( data, response => {
      if (response.success && response) {
        if ( type.toUpperCase() == 'INCOME' ) {
          App.getModal('newIncome').close();
        } else {
          App.getModal('newExpense').close();
        }
        super.resetFormData();
        App.update();
        this.renderAccountsList();
      }
    });
  }
}
