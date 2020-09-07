'use strict';

const createRequest = (options = {}, callback) => {
    // console.log( options.data );
    const xhr = new XMLHttpRequest;
    // POST method
    const formData = new FormData;
    if (options.data.method === 'POST') {
        for ( let input in options.data ) { formData.append( `${ input }`, options.data[ input ] ) }
    }
    // create request
    // console.log( JSON.stringify(options.data), options.data.url );
    try {
        xhr.open( options.data.method, options.data.url, true );
        xhr.withCredentials = true;
        xhr.responseType = 'json';
        xhr.onreadystatechange = function () {
            if (xhr.status === 200 && xhr.readyState === 4) { callback( xhr.response ) }
        };
        xhr.onerror = function () { console.error('Данные не найдены...') };
        options.data.method === 'GET' ? xhr.send( JSON.stringify( options.data ) ) : xhr.send( formData );
    } catch ( err ) { callback( err ) }
}



