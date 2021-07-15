var nodes = [];
var edges = [];
var coord = [window.innerWidth/2,window.innerWidth/20]
var BST = null;
var node = null;

function setup(preOrderNodes) {

    BST = new BinarySearchTree();
    ExtPoints = new ExtremePoints();

    // Inserting nodes to the BinarySearchTree
    if(preOrderNodes){
        preOrderNodes.forEach(data => {
            const insertedNode = BST.insert(data);
            if(insertedNode.circle.y<ExtPoints.top)
                ExtPoints.top = insertedNode.circle.y-insertedNode.circle.length/2;
            if(insertedNode.circle.x>ExtPoints.right)
                ExtPoints.right = insertedNode.circle.x+insertedNode.circle.length/2;
            if(insertedNode.circle.y>ExtPoints.bottom)
                ExtPoints.bottom = insertedNode.circle.y+insertedNode.circle.length/2;
            if(insertedNode.circle.x<ExtPoints.left)
                ExtPoints.left = insertedNode.circle.x-insertedNode.circle.length/2;
        });
    
        node = BST.root;
    }

    // Creating Canvas
    var canvasDiv = document.getElementById('myCanvas');
    var width = canvasDiv.offsetWidth;
    var height = canvasDiv.offsetHeight;
    var sketchCanvas = createCanvas(width,height);
    sketchCanvas.parent("myCanvas");
}

function draw() {

    if(preOrderNodes.length!=0){

        background('#4b5399');
        // let c = color(255, 204, 0);
        // fill(c);
        // rect(ExtPoints.left, ExtPoints.top, ExtPoints.right-ExtPoints.left, ExtPoints.bottom-ExtPoints.top);

        BST.postorder(BST.root); // draws the tree
    
        if(play===true){
            document.getElementById("play-button").innerHTML = "Pause";

            // Logic for finding node with minimum value
            if(node.left !== null){
                node.circle.color = '#e14e87';
                node = node.left;
            }
            else{
                node.circle.color = '#4caf50';
                redraw();
                play = false;
                document.getElementById("play-button").innerHTML = "Play";
            }
        }
        frameRate(1);
    }
}