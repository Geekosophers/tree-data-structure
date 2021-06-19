var nodes = [];
var edges = [];
var preOrderNodes = [15,25,10,7,22,17,13,5,9];
var coord = [window.innerWidth/2,window.innerWidth/20]
var BST = new BinarySearchTree();
var node = null;

function setup() {
    
    // Inserting nodes to the BinarySearchTree
    preOrderNodes.forEach(node => {
        BST.insert(node);
    });

    node = BST.root;

    let width = window.innerWidth;
    let height = window.innerHeight;
    createCanvas(width, height);
    // noLoop();
}

function draw() {
    
    background('#4b5399');
 
    edges.forEach(edge => {
        edge.show();
    });

    console.log(BST);
    BST.postorder(BST.root);

    if(node.left !== null){
        node = node.left;
        node.circle.color = '#e14e87';
        console.log(node);
    }
    else{
        noLoop();
    }
    frameRate(1);
}

function mousePressed(){
    redraw(1);
}