var url = "http://localhost:3000/user/token";
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
var data = `{ "_id": "${params.id}" }`;
var token;
function postAjaxToken(url, data, success) {
    var params = typeof data == 'string' ? data : Object.keys(data).map(
            function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
        ).join('&');

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status==200) { 
            success(xhr.responseText);
            token = xhr.responseText;
            // var n = str.length; 
            // var str1 = str.substr(0,n/2+1);
            // var str2 = str.substr(n/2+1);
            // document.getElementById("#token").innerHTML = "Your Token is:  \n"+str1+"\n"+str2;
           //  document.getElementById("#token").innerHTML = "Your Token is:  \n"+token;
           //window.location.href ='/login?id='+userData._id;
        }
        else if(xhr.readyState>3 && xhr.status!=200){
         }
    };
   // xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(params);
    return xhr;
}
postAjaxToken(url,data,function(res){ console.log(res); });


$(document).ready(function() {
        $('#write_note_button').click(function() {

         //   window.location.href = "/write_note"+'?id='+params.id;
          window.location.href = "/write_note"+'?id='+params.id+'&token='+token;
        });
 });

$(document).ready(function() {
    $('#get_note_button').click(function() {
        window.location.href = "/notes"+'?id='+params.id+'&token='+token;
    });
});