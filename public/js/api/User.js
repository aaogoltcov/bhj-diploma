'use strict';

class User extends Entity {

    static setCurrent( user ) {
        localStorage.setItem('user', JSON.stringify( user ));
    };

    static unsetCurrent() {
        localStorage.removeItem('user');
    };

    static current() {
        return JSON.parse( localStorage.getItem('user') );
    };

    static isAuthorized( data, callback = f => f ) {
        super.list( Object.assign({ url: '/user/current', getAuthorizedUser: true }, data ), callback );
    };

    static login( data, callback = f => f ) {
        super.create( Object.assign({ url: '/user/login' }, data ), callback );
    };

    static register( data, callback = f => f ) {
        super.create( Object.assign({ url: '/user/register' }, data ), callback );
    };

    static logout( data, callback = f => f ) {
        super.create( Object.assign({ url: '/user/logout' }, data ), callback );
    };

}

