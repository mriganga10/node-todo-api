function getUrlParams(prop ) {
    var params = {};
    var search = decodeURIComponent( window.location.href.slice( window.location.href.indexOf( '?' ) + 1 ) );
    var definitions = search.split( '&' );

    definitions.forEach( function( val, key ) {
        var parts = val.split( '=', 2 );
        params[ parts[ 0 ] ] = parts[ 1 ];
    } );

    return ( prop && prop in params ) ? params[ prop ] : params;
}
var params = getUrlParams();
var url = "http://localhost:3000/todos/auth";
var token_id;
function postAjax(url, data, success) {
    var params = typeof data == 'string' ? data : Object.keys(data).map(
            function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
        ).join('&');

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status==200) { 
            success(xhr.responseText); 
        }
        else if(xhr.readyState>3 && xhr.status!=200){
            alert('Error!..Probable errors 1)E-mail already exists \n 2)Password-length is less than 6 \n 3)Incorrect Email');
         }
    };
   // xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('x-auth', token_id);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(params);
    return xhr;
}

$(document).ready(function() {
        $('#submit_note_button').click(function() {
        	token_id = $('#id').val();
        	var text = $('#todo').val();
        	if(token_id!='' && token_id!=null && params.id!=null){
        		var data = `{ "text": "${text}"  ,	"_creator": "${params.id}" }`;
        		postAjax(url,data,function(res) { console.log(res); });
        	}
        });
 });