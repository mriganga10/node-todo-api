var url ,data;
var userData;
function postAjax(url, data, success) {
    var params = typeof data == 'string' ? data : Object.keys(data).map(
            function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
        ).join('&');

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status==200) { 
            success(xhr.responseText); 
            window.location.href = '/signup';
        }
        else if(xhr.readyState>3 && xhr.status!=200){
            alert('Error!..Probable errors 1)E-mail already exists \n 2)Password-length is less than 6 \n 3)Incorrect Email');
         }
    };
   // xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(params);
    return xhr;
}
function postAjaxLogin(url, data, success) {
    var params = typeof data == 'string' ? data : Object.keys(data).map(
            function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
        ).join('&');

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status==200) { 
            success(xhr.responseText); 
            userData = xhr.responseText;
            userData= JSON.parse(userData);
            console.log(userData);
            window.location.href ='/login?id='+userData._id;
        }
        else if(xhr.readyState>3 && xhr.status!=200){
            alert('Error!..Incorrect email or password');
         }
    };
   // xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(params);
    return xhr;
}
$(document).ready(function() {
        $('#submit_signup').click(function() {

            url = 'http://localhost:3000/user';
            var email = $('#email_signup').val();
            var password = $('#password_signup').val();
           // data = ` email: ${email}, password: ${password}`;
           data = `{  "email": "${email}",   "password": "${password}" }`;
            var xhr =postAjax(url,data, function(res){ console.log(res); });
        });
        $('#login_submit').click(function() {
            url = 'http://localhost:3000/user/login';
            var email = $('#email_login').val();
            var password = $('#password_login').val();
            
           // data = ` email: ${email}, password: ${password}`;
           data = `{  "email": "${email}",   "password": "${password}" }`;
            var xhr =postAjaxLogin(url,data, function(res){ console.log(res); });
        });
    });