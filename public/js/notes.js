var url2 = "http://localhost:3000/todos/auth";
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
 var token = params.token;

function getTodo(theUrl,token)
{
var xmlHttp = new XMLHttpRequest();

xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
xmlHttp.setRequestHeader("x-auth",token);
xmlHttp.send( null );
return xmlHttp.responseText;
}

if(token!=null)
var todoarray = JSON.parse(getTodo(url2,token)).todos;
var parentDiv = document.getElementById("parentDiv");
console.log(parentDiv);
for(var i=0;i<todoarray.length;i++){
	parentDiv.insertAdjacentHTML('beforeend',`<li  id="${todoarray[i]._id}"><button id ="delete"> DELETE NOTE</button> <a> <h2>Title #${i+1}</h2>  <input type = "text" value = "${todoarray[i].text}"> <button id = "save">SAVE</button></a> </li>`
);
}

var changeEvent = function(event) {
	if(event.target.id == 'delete'){
		deleteTodo(event);
	}
	else if(event.target.id =='save'){
		updateTodo(event);
	}
}
var updateTodo = function(event){
	var todoItem = event.target.parentNode.parentNode.id;
	console.log(todoItem);
	var text = event.target.parentNode.childNodes[3].value;
	console.log(text);
	var completed = false;
	var response = updateTodoDatabase(todoItem,text,completed);
	console.log(response);
}
var deleteTodo = function(event) {
		var todoItem = event.target.parentNode;
		var el = document.getElementById(todoItem.id);
		el.parentNode.removeChild(el);
		var response = deleteTodoDatabase(todoItem.id);
		console.log(todoItem.id);
		console.log(response);
}

var deleteTodoDatabase = function(id) {
	var theUrl = `http://localhost:3000/todos/${id}`;
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "DELETE", theUrl, false ); // false for synchronous request
	xmlHttp.setRequestHeader('x-auth', token);

	xmlHttp.send( null );
	return xmlHttp.responseText;
}
var updateTodoDatabase = function(id,text,completed) {
	var theUrl = `http://localhost:3000/todos/${id}`;
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "PATCH", theUrl, false ); // false for synchronous request
	xmlHttp.setRequestHeader('x-auth', token);
	xmlHttp.setRequestHeader('Content-Type', 'application/json');
	var data = `{	"text": "${text}",	"completed": ${completed}} `;
	xmlHttp.send( data );
	return xmlHttp.responseText;
}


document.querySelector('.parent').addEventListener('click',changeEvent);



// if (performance.navigation.type == 1) {
// 	 window.location.href = "/notes"+'?id='+params.id+'&token='+token;
//     console.info( "This page is reloaded" );
//   } else {
//     console.info( "This page is not reloaded");
//   }

// window.onload=function(){
// history.pushState(`http://localhost:3000/notes"+'?id='+${params.id}+'&token='+${token}`,null, 'http://localhost:3000/notes');

// }