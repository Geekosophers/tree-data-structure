var nodes = [];
var edges = [];
var xOffset = 0;
var yOffset = 0;
var coord = [(window.innerWidth/2)+xOffset,window.innerWidth/20+yOffset]
var BST = null;
var node = null;
var isPlayed = false;
var sizeMutliplier = 1;
var checkHeightOfTree = false;
var checkWidthOfTree = false;
var checkXOffset = false;
var checkYOffset = false;

let img;

function preload() {
  img = loadImage('assets/arrow-up.svg');
}

function setup(preOrderNodes) {

    BST = new BinarySearchTree();
    ExtPoints = new ExtremePoints();

    // Inserting nodes to the BinarySearchTree
    if(preOrderNodes){
        preOrderNodes.forEach(data => {
            const insertedNode = BST.insert(data);
            if(insertedNode.circle.y<ExtPoints.top+insertedNode.circle.length/2)
                ExtPoints.top = insertedNode.circle.y-insertedNode.circle.length/2;
            if(insertedNode.circle.x>ExtPoints.right-insertedNode.circle.length/2)
                ExtPoints.right = insertedNode.circle.x+insertedNode.circle.length/2;
            if(insertedNode.circle.y>ExtPoints.bottom-insertedNode.circle.length/2)
                ExtPoints.bottom = insertedNode.circle.y+insertedNode.circle.length/2;
            if(insertedNode.circle.x<ExtPoints.left+insertedNode.circle.length/2)
                ExtPoints.left = insertedNode.circle.x-insertedNode.circle.length/2;
        });
    
        node = BST.root;
    }

    // Creating Canvas
    var canvasDiv = document.getElementById('myCanvas');
    var canvasWidth = canvasDiv.offsetWidth;
    var canvasHeight = canvasDiv.offsetHeight;
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;
    var sketchCanvas = createCanvas(canvasWidth,canvasHeight);
    sketchCanvas.parent("myCanvas");

    if(ExtPoints.right>0 && !checkXOffset){
        xOffset = canvasWidth/2 - ((ExtPoints.right-ExtPoints.left)/2 + ExtPoints.left)
        checkXOffset = true;
        coord = [(screenWidth/2)+xOffset,screenWidth/20+yOffset]
        setup(preOrderNodes)
        return;
    }
    if(ExtPoints.bottom>0 && !checkYOffset){
        yOffset = canvasHeight/2 - ((ExtPoints.bottom-ExtPoints.top)/2 + ExtPoints.top)
        checkYOffset = true;
        coord = [(screenWidth/2)+xOffset,(screenWidth/20)+yOffset]
        setup(preOrderNodes)
        return;
    }
    // if(ExtPoints.bottom>0 && !checkHeightOfTree){
    //     var heightOfTree = ExtPoints.bottom-ExtPoints.top
    //     sizeMutliplier = heightOfTree/canvasHeight;
    //     console.log(sizeMutliplier)
    //     checkHeightOfTree=true;
    //     var widthOfTree = ExtPoints.right-ExtPoints.left;
    //     widthOfTree/canvasWidth > sizeMutliplier ? sizeMutliplier = widthOfTree/canvasWidth : null;
    //     console.log(sizeMutliplier)
    //     checkWidthOfTree=true;
    //     setup(preOrderNodes)
    //     return;
    // }
    // if(ExtPoints.bottom>0 && !checkHeightOfTree){
    //     var heightOfTree = ExtPoints.bottom-ExtPoints.top
    //     // sizeMutliplier = heightOfTree/(heightOfTree-(ExtPoints.bottom-canvasHeight));
    //     sizeMutliplier = heightOfTree/canvasHeight;
    //     console.log(sizeMutliplier)
    //     checkHeightOfTree=true;
    //     setup(preOrderNodes)
    //     return;
    // }
    // if(ExtPoints.right>0 && !checkWidthOfTree){
    //     var widthOfTree = ExtPoints.right-ExtPoints.left;
    //     // sizeMutliplier = widthOfTree/(widthOfTree-(ExtPoints.right-canvasWidth));
    //     sizeMutliplier = widthOfTree/canvasWidth;
    //     console.log(sizeMutliplier)
    //     checkWidthOfTree=true;
    //     setup(preOrderNodes)
    //     return;
    // } 
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function preOrder(node) {
    if (node !== null) {
        node.circle.color = '#4caf50';
        image(img, node.circle.x-10, node.circle.y+node.circle.length/2+5, 20, 10);
        await sleep(2000);
        await preOrder(node.left);
        if(node.left!=null){
            image(img, node.circle.x-10, node.circle.y+node.circle.length/2+5, 20, 10);
            await sleep(2000);
        }
        await preOrder(node.right);
        if(node.right!=null){
            image(img, node.circle.x-10, node.circle.y+node.circle.length/2+5, 20, 10);
            await sleep(2000);
        }
    }
    play=false;
    document.getElementById("play-button").innerHTML = "Play";
}

function draw() {

    if(preOrderNodes.length!=0){

        background('#4b5399');
        let c = color(255, 204, 0);
        fill(c);
        rect(ExtPoints.left, ExtPoints.top, ExtPoints.right-ExtPoints.left, ExtPoints.bottom-ExtPoints.top);

        BST.postorder(BST.root); // draws the tree
    
        if(isPlayed===false && play===true){
            document.getElementById("play-button").innerHTML = "Pause";

            // Logic for preorder traversal
            preOrder(node);
            isPlayed = true;
        }
        frameRate(1);
    }
}