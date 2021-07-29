function horizontalCenterAlign(canvasWidth, ExtPoints, screenWidth){
    xOffset = canvasWidth/2 - ((ExtPoints.right-ExtPoints.left)/2 + ExtPoints.left)
    checkXOffset = true;
    coord = [(screenWidth/2)+xOffset,screenWidth/20+yOffset]
    setup(preOrderNodes)
}

function verticalCenterAlign(canvasHeight, ExtPoints, screenWidth){
    yOffset = canvasHeight/2 - ((ExtPoints.bottom-ExtPoints.top)/2 + ExtPoints.top)
    checkYOffset = true;
    coord = [(screenWidth/2)+xOffset,(screenWidth/20)+yOffset]
    setup(preOrderNodes)
}

function scaleTree(ExtPoints, canvasHeight, canvasWidth){
    var heightOfTree = ExtPoints.bottom-ExtPoints.top
    if(heightOfTree>canvasHeight){
        console.log('yes')
        sizeMutliplier = heightOfTree/canvasHeight; 
    }
    checkHeightOfTree=true;
    var widthOfTree = ExtPoints.right-ExtPoints.left;
    if(widthOfTree>canvasWidth){
        widthOfTree/canvasWidth > sizeMutliplier ? sizeMutliplier = widthOfTree/canvasWidth : null;
    }
    checkWidthOfTree=true;
    setup(preOrderNodes)
}