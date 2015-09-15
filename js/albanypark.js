(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();
    $('.modal-trigger').leanModal();

  }); // end of document ready
})(jQuery); // end of jQuery name space


$('.collapsible-header').click(function(object){
  $panel_headers = $('.collapsible-header');
  

  $panel_headers.not(object.target).removeClass('active').parent().removeClass('active');
  $panel_headers.not(object.target).parent().children('.collapsible-body').stop(true,false).slideUp(
    {
      duration: 350,
      easing: "easeOutQuart",
      queue: false,
      complete:
        function() {
          $(this).css('height', '');
        }
    });
});