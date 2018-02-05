(function($)
{
    /**
     * Auto-growing textareas; technique ripped from Facebook
     *
     * https://github.com/jaz303/jquery-grab-bag/tree/master/javascripts/jquery.autogrow-textarea.js
     */
    $.fn.autogrow = function(options)
    {
        return this.filter('textarea').each(function()
        {
            var self         = this;
            var $self        = $(self);
            var minHeight    = $self.height();
            var noFlickerPad = $self.hasClass('autogrow-short') ? 0 : parseInt($self.css('lineHeight')) || 0;

            var shadow = $('<div></div>').css({
                position:    'absolute',
                top:         -10000,
                left:        -10000,
                width:       $self.width(),
                fontSize:    $self.css('fontSize'),
                fontFamily:  $self.css('fontFamily'),
                fontWeight:  $self.css('fontWeight'),
                lineHeight:  $self.css('lineHeight'),
                resize:      'none',
                'word-wrap': 'break-word'
            }).appendTo(document.body);

            var update = function(event)
            {
                var times = function(string, number)
                {
                    for (var i=0, r=''; i<number; i++) r += string;
                    return r;
                };

                var val = self.value.replace(/</g, '&lt;')
                                    .replace(/>/g, '&gt;')
                                    .replace(/&/g, '&amp;')
                                    .replace(/\n$/, '<br/>&nbsp;')
                                    .replace(/\n/g, '<br/>')
                                    .replace(/ {2,}/g, function(space){ return times('&nbsp;', space.length - 1) + ' ' });

                // Did enter get pressed?  Resize in this keydown event so that the flicker doesn't occur.
                if (event && event.data && event.data.event === 'keydown' && event.keyCode === 13) {
                    val += '<br />';
                }

                shadow.css('width', $self.width());
                shadow.html(val + (noFlickerPad === 0 ? '...' : '')); // Append '...' to resize pre-emptively.
                $self.height(Math.max(shadow.height() + noFlickerPad, minHeight));
            }

            $self.change(update).keyup(update).keydown({event:'keydown'},update);
            $(window).resize(update);

            update();
        });
    };
})(jQuery);


var noteTemp =  '<div class="note">'
				+	'<a href="javascript:;" class="button remove">X</a>'
				+ 	'<div class="note_cnt">'
          //      +       '<textarea class="cnt" placeholder="Enter your token" id ="id"></textarea>'
				+		'<textarea class="title" placeholder="Enter note title"></textarea>'
                +       '<textarea class="cnt" placeholder="Enter note date"></textarea>'
				+ 		'<textarea class="cnt" placeholder="Enter note description here" id ="todo"></textarea>'
				+	'</div> '
                 +   '<button class ="button save" id ="submit_note_button">SAVE</button>'
				+'</div>';

var noteZindex = 1;
var notess=0;
function relPage(){
    location.reload();
}
function deleteNote(){
    $(this).parent('.note').hide("puff",{ percent: 133}, 250);
};

// function newNote() {
//     if(notess == 0){
//                  notess++;
//           $(noteTemp).hide().appendTo("#board").show("fade", 300).draggable().on('dragstart',
//             function(){
//                $(this).zIndex(++noteZindex);
//             });
         
//             $('.remove').click(deleteNote);
//             $('textarea').autogrow();
            
//           $('.note')
//             return false; 
//     }
//     else{
//         relPage();
//     }
   
// };
function newNote() {
          $(noteTemp).hide().appendTo("#board").show("fade", 300).draggable().on('dragstart',
            function(){
               $(this).zIndex(++noteZindex);
            });
         
            $('.remove').click(deleteNote);
            $('textarea').autogrow();
            
          $('.note')
            return false; 
 
};


$(document).ready(function() {
    
    $("#board").height($(document).height());
    
    $("#add_new").click(newNote);
    
    $('.remove').click(deleteNote);
    newNote();
	  
    return false;
});


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
var token_id= params.token;
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

// $(document).ready(function() {
//         $('#submit_note_button').click(function() {
//           //  token_id = $('#id').val();
//             var text = $('#todo').val();
//             if(token_id!='' && token_id!=null && params.id!=null){
//                 var data = `{ "text": "${text}"  ,  "_creator": "${params.id}" }`;
//                 postAjax(url,data,function(res) { console.log(res); });
//                 alert('note added');
//                 location.reload();
//             }
//             else{
//                 alert('please login properly')
//             }
//         });
//  });

var saveTodo = function(event){
     if(event.target.parentNode.childNodes[1].childNodes[2].value!=''){
        var text = event.target.parentNode.childNodes[1].childNodes[2].value;
        saveTodoDatabase(text);
    }
}
var saveTodoDatabase = function(text){
            if(token_id!='' && token_id!=null && params.id!=null){
                var data = `{ "text": "${text}"  ,  "_creator": "${params.id}" }`;
                postAjax(url,data,function(res) { console.log(res); });
                alert('note added');
            }
            else{
                alert('please login properly')
            }
}
var changeEvent = function(event){
    if(event.target.id == 'submit_note_button'){
        saveTodo(event);
    }
}
document.querySelector('.parent').addEventListener('click',changeEvent);