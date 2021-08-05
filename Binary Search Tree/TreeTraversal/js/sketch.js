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


    if(ExtPoints.bottom>0 && !checkHeightOfTree){
        scaleTree(ExtPoints, canvasHeight, canvasWidth)
    }
    if(ExtPoints.right>0 && !checkXOffset){
        horizontalCenterAlign(canvasWidth, ExtPoints, screenWidth)
    }
    if(ExtPoints.bottom>0 && !checkYOffset){
        verticalCenterAlign(canvasHeight, ExtPoints, screenWidth)
    }
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
        // let c = color(255, 204, 0);
        // fill(c);
        // rect(ExtPoints.left, ExtPoints.top, ExtPoints.right-ExtPoints.left, ExtPoints.bottom-ExtPoints.top);

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