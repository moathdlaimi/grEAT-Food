$(()=>{

// var url = window.location.href;

$(window).scroll(function() {

  let i = $(window).scrollTop()

  if(i >= 50){
    $('.nav-banner').addClass('sticky')
  }else {
    $('.nav-banner').removeClass('sticky')
  }
});





})
