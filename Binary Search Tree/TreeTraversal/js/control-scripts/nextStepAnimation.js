var nextStep = function(){
    play = true;
    redraw(); 
    play = false;
    document.getElementById("play-button").innerHTML = "Play";
}