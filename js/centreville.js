(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();
    $('.modal-trigger').leanModal();

  }); // end of document ready
})(jQuery); // end of jQuery name space

$.get("http://announcementeditor-thebelovedchurch.rhcloud.com/storage/?campus=Centreville", function(data){
  $(data).each(function(i,e){
    $('#announcements').append('<div style="color: #606060"><strong>' + e.title + '</strong><p class="not-bold">' + e.body + '</p></div>');
  });
});

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