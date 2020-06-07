$(() => {


  const bannerBgArray = ['css/imgs/arrayimg2.jpg',
  'css/imgs/arrayimg4.jpg','css/imgs/arrayimg5.jpg']


let i = 0
const bannerBg = () => {
  setTimeout(function(){
    $('.recipe-feed-nav').hide(5).fadeIn(4000)
    .css('background-image', `url(${bannerBgArray[i]})`)
    .css('background-position', 'center')
    .css('background-size', 'cover')
    i++
    if (i < bannerBgArray.length) {
      bannerBg()
    }else {
      i = 0;
      bannerBg()
    }
  },5000)

}
bannerBg()


$(window).scroll(function() {

  let i = $(window).scrollTop()

  if(i >= 100){
    $('#top-nav').addClass('sticky')
  }else {
    $('#top-nav').removeClass('sticky')
  }
});



})
