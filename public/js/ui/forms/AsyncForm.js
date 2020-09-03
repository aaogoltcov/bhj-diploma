'use strict';

class AsyncForm {

  constructor( element ) {
    if ( element ) {
      this.element = element;
      this.formData = new FormData( this.element );
      this.registerEvents();
    } else {
      throw ('Такого элемента не существует...');
    }
  };

  registerEvents() {
    this.element.onsubmit = event => {
      this.submit( event );
      return false;
    }
  };

  getData() {
    let data = {};
    let formData = new FormData( this.element );
    for ( let key of this.formData.keys() ) {
      data[key] = formData.get(key);
    }
    return data;
  }

  onSubmit( options ) {
  };

  submit() {
    this.onSubmit({ data: this.getData() } );
  };

  resetFormData() {
    this.element.querySelectorAll('input').forEach( element => {
      element.value = '';
    })
  };

}
