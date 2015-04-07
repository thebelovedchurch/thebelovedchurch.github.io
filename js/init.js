(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();

  }); // end of document ready
})(jQuery); // end of jQuery name space


var play_html = '<div style="float: left; margin-right: 10px;"><span class="glyphicon glyphicon-play" style="cursor: pointer;"></span></div>';
var pause_html = '<div style="float: left; margin-right: 10px;"><span class="glyphicon glyphicon-pause" style="cursor: pointer;"></span></div>';
var download_html = '<div style="float: right; margin-left: 10px;"><span class="glyphicon glyphicon-cloud-download" style="cursor: pointer;"></span></div>';
var bar_html = '<div style="overflow: hidden; height: 16px; background-color: rgba(221,187,51, .5)"></div>';
var inside_bar_html = '<div style="height: 100%; width: 0; background-color: rgba(0,0,0, .5)"></div>';

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
  

  SC.get('/playlists/51633482', function(playlist) {
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