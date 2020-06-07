$(() => {

  const bannerBgArray = ['css/imgs/arrayimg1.jpg','css/imgs/arrayimg2.jpg',
  'css/imgs/arrayimg3.jpg','css/imgs/arrayimg4.jpg','css/imgs/arrayimg5.jpg']




let i = 0
const bannerBg = () => {
  setTimeout(function(){
    $('.recipe-feed-nav').hide().fadeIn(2000)
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


  // let i = 0;
  // const bannerBg = () => {
  //   setTimeout(function() {
  //     $('recipe-feed-nav').css('background-image',`URL()`)
  //     i++
  //     if(i < bannerBgArray.length){
  //       bannerBg()
  //     } else {
  //       i = 0;
  //       bannerBg();
  //     }
  //   },2000)}
  //   bannerBg()
  // },
  // () => {
  //   console.log('error inside loop');
  // }) }



})
