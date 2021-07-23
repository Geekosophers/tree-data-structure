var nextStep = function(){
    play = true;
    redraw(1); 
    play = false;
    document.getElementById("play-button").innerHTML = "Play";
}