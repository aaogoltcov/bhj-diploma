'use strict';

class Entity {

    static list( data, callback = f => f ) {
        createRequest({ data: Object.assign({ method: 'GET' }, data ) }, callback);
    };

    static create( data, callback = f => f ) {
        createRequest({ data: Object.assign({ method: 'POST', _method: 'PUT' }, data ) }, callback);
    };

    static get( id, data, callback = f => f ) {
        createRequest({ data: Object.assign({ method: 'GET' }, data ) }, callback);
    };

    static remove( id, data, callback = f => f ) {
        createRequest({ data: Object.assign({ method: 'POST', _method: 'DELETE' }, data ) }, callback);
    };

}
