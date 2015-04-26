(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();
    $('.modal-trigger').leanModal();

  }); // end of document ready
})(jQuery); // end of jQuery name space


$.get("http://announcementeditor-thebelovedchurch.rhcloud.com/storage/?campus=Seattle", function(data){
  $(data).each(function(i,e){
    $('#announcements').append('<div style="color: #606060"><strong>' + e.title + '</strong><p class="not-bold">' + e.body + '</p></div>');
  });
});