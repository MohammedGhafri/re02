'use strict';

$('.buttonShow').next().hide();

$('.buttonShow').on('click',function(){
    $(this).text(function(i,text){
return text === "Show Less" ? "Show More" : "Show Less";
    })

    $(this).next().toggle();

});
// $('button').css('color','red');