(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();

  }); // end of document ready
})(jQuery); // end of jQuery name space

$.get("http://announcementeditor-thebelovedchurch.rhcloud.com/storage/?campus=Near%20West", function(data){
  $(data).each(function(i,e){
    $('#announcements').append('<div style="color: #606060"><strong>' + e.title + '</strong><p class="not-bold">' + e.body + '</p></div>');
  });
});


var play_html = '<div style="float: left; margin-right: 10px;"><i class="mdi-av-play-arrow" style="cursor: pointer; font-size: 1.5rem;"></i></div>';
var pause_html = '<div style="float: left; margin-right: 10px;"><i class="mdi-av-pause" style="cursor: pointer; font-size: 1.5rem;"></i></div>';
var download_html = '<div style="float: right; margin-left: 10px;"><i class="mdi-file-cloud-download" style="cursor: pointer; font-size: 1.5rem;"></i></div>';
var bar_html = '<div style="overflow: hidden; height: 4px; margin-top: 1rem;" class="teal lighten-4"></div>';
var inside_bar_html = '<div style="height: 100%; width: 0;" class="teal"></div>';

SC.initialize({
  client_id: 'e58500f22069ebf6de412ec63b4939b3'
});

splitOnBar = function(s, d){
  var splitTitle = s.split("|");
  if (splitTitle.length == 2) return splitTitle;
  if (d == null || d == "") d = "&nbsp;";
  return [s,d];
}

// stream track id 293
$(document).ready(function(){
  

  SC.get('/playlists/52692751', function(playlist) {
    if (playlist.tracks.length < 6){
      $('#tracks1').parent().addClass("col-sm-offset-3")
                   .removeClass("sm-50px-padding-right")
                   .removeClass("sm-right-border");
      $('#tracks2').parent().hide();
    }
    $(playlist.tracks.slice(0,10)).each(function(i,e){
      var trackDiv = $('<div style="margin-bottom: 20px"></div>')
        .appendTo(i < 5 ? '#tracks1' : '#tracks2');
      $("<div>" + splitOnBar(e.title, e.description)[0] + "</div>").appendTo(trackDiv);
      $('<div style="color: gray;">' + splitOnBar(e.title, e.description)[1] + "</div>").appendTo(trackDiv);
      var play = $(play_html).appendTo(trackDiv);
      var pause = $(pause_html).appendTo(trackDiv);
      pause.hide();
      var download = $(download_html).appendTo(trackDiv);
      var bar = $(bar_html).appendTo(trackDiv);
      var inside_bar = $(inside_bar_html).appendTo(bar);
      SC.stream("/tracks/" + e.id, function(sound){
        var intrvl;
        play.click(function(){
            sound.play();
            play.hide();
            pause.show();
            intrvl = setInterval(function () {
                var end = parseFloat(e.duration);
                var howMuchSoFar = parseFloat(sound.position);
                var fraction = howMuchSoFar / end;
                var percent = (fraction * parseFloat(100)) + "%";
                $(inside_bar).css("width", percent);
            }, 500);
        });
        pause.click(function(){
            clearInterval(intrvl);
            sound.pause();
            pause.hide();
            play.show();
        });
        download.click(function(){
          window.location = e.download_url + "?client_id=e58500f22069ebf6de412ec63b4939b3";
        });
      });
    });
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