
/**
 * Init Bulma carousel extension
 */
var carousels = bulmaCarousel.attach(); // carousels now contains an array of all Carousel instances

/**
 *  Init AOS
 */
AOS.init();

/***
 * 
 * Scrollspy and smooth scrolling
 *  
 */
// this makes the height of each page equal to the height of the window
$('.page').css('height', $( window ).height());

// scrollspy section
(function($){
  //variable that will hold the href attr of the links in the menu
  var sections = [];
  //variable that stores the id of the section
  var id = false;
  //variable for the selection of the anchors in the navbar
  var $navbara = $('#navi a');
  
  $navbara.click(function(e){
    //prevent the page from refreshing
    e.preventDefault();
    //set the top offset animation and speed
    $('html, body').animate({
      scrollTop: $($(this).attr('href')).offset().top - 78
},1000);
    hash($(this).attr('href'));
  });
  
  
  
  //select all the anchors in the navbar one after another
  $navbara.each(function(){
   // and adds them in the sections variable
    sections.push($($(this).attr('href')));
    
  });
  $(window).scroll(function(e){
    // scrollTop retains the value of the scroll top with the reference at the middle of the page
    var scrollTop = $(this).scrollTop() + ($(window).height()/2);
    //cycle through the values in sections array
    for (var i in sections) {
      var section = sections[i];
      //if scrollTop variable is bigger than the top offset of a section in the sections array then 
      if (scrollTop > section.offset()){
        var scrolled_id = section.attr('id');
      }
    }
    if (scrolled_id !== id) {
      id = scrolled_id;
      $($navbara).removeClass('current');
      $('#navi a[href="#' + id + '"]').addClass('current'); 
    }
  });
})(jQuery);

hash = function(h){
  if (history.pushState){
    history.pushState(null, null, h);
  }else{
    location.hash = h;
  }
};


/**
 * Modal functionality
 */

$('#showModal').click(() => {
  $('.modal').addClass('is-active');
});

$('.modal-close').click(() => {
  $('.modal').removeClass('is-active');
});

$('.modal-background').click(() => {
  $('.modal').removeClass('is-active');
});

/**
 * Mobile hanburger toggle
 */
$('#nav-toggle').click(() => {
  let navMenu = $('#nav-menu');
  if (navMenu.hasClass('is-active')){
    navMenu.removeClass('is-active');
  } else {
    navMenu.addClass('is-active');
  }
});

