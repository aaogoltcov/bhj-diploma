'use strict';

class UserWidget {

  constructor( element ) {
    if (element) {
      this.element = element;
    } else {
      throw ('Такого элемента не существует...');
    }
  };

  update() {
    this.element.querySelector('p.user-name').innerHTML = User.current().name;
  };

}
