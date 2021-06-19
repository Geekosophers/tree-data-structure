var nodes = [];
var edges = [];
var coord = [window.innerWidth/2,window.innerWidth/20]
var BST = null;
var node = null;

function setup(preOrderNodes) {

    BST = new BinarySearchTree();

    // Inserting nodes to the BinarySearchTree
    if(preOrderNodes){
        preOrderNodes.forEach(node => {
            BST.insert(node);
        });
    
        node = BST.root;
    }
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    createCanvas(width, height);
    loop();
}

function draw() {

    background('#4b5399');

    if(preOrderNodes.length!=0){
 
        edges.forEach(edge => {
            edge.show();
        });

        console.log(BST);
        BST.postorder(BST.root);
    
        if(play===true){
            if(node.left !== null){
                node.circle.color = '#e14e87';
                node = node.left;
            }
            else{
                node.circle.color = '#4caf50';
                redraw(1);
                play = false;
                document.getElementById("play-button").innerHTML = "Play";
            }
        }
        frameRate(1);
    }
}