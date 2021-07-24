var elem = document.getElementById("fullscreen");
var fullscreenview = false;
function handleFullScreen() {
    console.log('yes',fullscreenview)
    if(fullscreenview==false){
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }
        fullscreenview = true;
        document.getElementById("full-screen").innerHTML = "Exit Full Screen";
    }

    else if(fullscreenview==true){
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
        fullscreenview = false;
        document.getElementById("full-screen").innerHTML = "Full Screen";
    }
}