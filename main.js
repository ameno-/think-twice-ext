var gmail;

// var $ = jQuery;
// if (typeof localJQuery !== "undefined") {
//     $ = localJQuery;
// } else if (typeof jQuery !== "undefined") {
//     $ = jQuery;
// }

function refresh(f) {
  if( (/in/.test(document.readyState)) || (typeof Gmail === undefined) ) {
    setTimeout('refresh(' + f + ')', 10);
  } else {
    f();
  }
}

var main = function(){
  // NOTE: Always use the latest version of gmail.js from
  // https://github.com/KartikTalwar/gmail.js

    $.getJSON( "https://think-twise.herokuapp.com/", function( data ) {
        console.log(data);
    });


  // gmail = new Gmail();
  // console.log('uman has mounted');
  // gmail.observe.on("compose", function(compose, type) {
  //     // type can be compose, reply or forward
  //     var drafts = gmail.dom.composes();
  //     console.log('draft id: ', drafts);
  //     console.log('api.dom.compose object:', compose, 'type is:', type );  // gmail.dom.compose object
  //     retrieveEmailBody(':8w');
  //   });
}

var retrieveEmailBody = function(divId){
    var email = new gmail.dom.email(divId); // optionally can pass relevant $('div.adn');
    var body = email.body();
    var id = email.id;

// add a heading at the start of the email and update in the interface
    email.body('<h1>Pha-reeel</h1>' + body);
    console.log("body is:" + body);
    console.log("id is:" + id);
}

refresh(main);
