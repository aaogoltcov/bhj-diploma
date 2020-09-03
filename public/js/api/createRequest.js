'use strict';

const createRequest = (options = {}, callback) => {
    // console.log(  options );
    const xhr = new XMLHttpRequest;

    // POST method
    const formData = new FormData;
    if (options.data.method === 'POST') {
        options.data.email ? formData.append( 'email', options.data.email ): '';
        options.data.password ? formData.append( 'password', options.data.password ) : '';
        options.data._method ? formData.append( '_method', options.data._method ) : '';
        options.data.name ? formData.append( 'name', options.data.name ) : '';
        options.data.id ? formData.append( 'id', options.data.id ) : '';
        options.data.type ? formData.append( 'type', options.data.type ) : '';
        options.data.user_id ? formData.append( 'user_id', options.data.user_id ) : '';
        options.data.sum ? formData.append( 'sum', options.data.sum ) : '';
        options.data.account_id ? formData.append( 'account_id', options.data.account_id ) : '';
    }

    // URLs for accounts, transactions and user
    let URL = options.data.url;
    options.data.getAccount ? URL = `${options.data.url}/${options.data.id}` : '';
    options.data.getTransaction ? URL = `${options.data.url}?account_id=${options.data.id}` : '';
    options.data.getAuthorizedUser ? URL = `${options.data.url}?id=${options.data.id}` : '';

    // create request
    // console.log( JSON.stringify(options.data), URL );
    try {
        xhr.open( options.data.method, URL, true );
        xhr.withCredentials = true;
        xhr.responseType = 'json';
        xhr.onreadystatechange = function () {
            if (xhr.status === 200 && xhr.readyState === 4) {
                callback( xhr.response );
            }
        };

        xhr.onerror = function () {
            console.log( 'Данные не найдены...', xhr.response );
        };
        options.data.method === 'GET' ? xhr.send( JSON.stringify( options.data ) ) : xhr.send( formData );
    } catch ( err ) {
        callback( err );
    }

}



