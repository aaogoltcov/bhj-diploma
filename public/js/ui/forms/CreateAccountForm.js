'use strict';

class CreateAccountForm extends AsyncForm {

  onSubmit( options ) {
    Account.create( options.data, response => {
      if ( response && response.success ) {
        super.resetFormData();
        App.getModal( 'createAccount' ).close();
        App.update();
      }
    })
  }

}
