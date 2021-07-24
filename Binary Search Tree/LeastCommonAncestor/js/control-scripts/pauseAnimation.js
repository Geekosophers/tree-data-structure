var playAnimation = function(){
    play = !play;
    play === false ? wasPaused=true : null;
    document.getElementById("play-button").innerHTML = play==true ? "Pause" : "Play";
}