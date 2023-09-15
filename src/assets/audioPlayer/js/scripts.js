$(document).ready(function () {

    var player = document.getElementById('audio1'); //Get audio player

    $(document).on('click', '.play', function () { //Play on click
        player.play();
        $(".play").hide();
        $(".pause").show();
    });

    $(document).on('click', '.pause', function () { //Pause on click
        player.pause();
        $(".pause").hide();
        $(".play").show();
    });

   
	function updateProgress() {

        // audio.volume = volumeslider.value / 100;
          var progress = $(".progress"); //The progress bar
        var value = 0; //Song position starts at 0
  
        if(player.duration == 'Infinity') { //Song is infinate in length
           value = 100;
          } else if(player.currentTime > 0){ //Songs current time is past 0
           value = Math.floor((100 / player.duration) * player.currentTime);
          }
          progress.stop().animate({'width':value + '%'},500) //set the width of the progress bar
        $('#music-player #time').html(formatTime(player.currentTime)) //set the new timestamp
        $('#music-player #total-time').html(formatTime(player.duration));
  
      }
  
  

    function formatTime(time) { //Change time format
        minutes = Math.floor(time / 60);
        minutes = (minutes >= 10) ? minutes : "" + minutes;
        seconds = Math.floor(time % 60);
        seconds = (time >= 10) ? seconds : "0" + seconds;
        return minutes + ":" + ("0" + seconds).slice(-2);
    }
    player.addEventListener("timeupdate", updateProgress);
});