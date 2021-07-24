var nodes = [];
var edges = [];
var coord = [];
var BST = null;
var node = null;
var n1 = null;
var n2 = null;
var isPlayed = false;

function setup(preOrderNodes, node1, node2) {

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
        n1 = node1;
        n2 = node2;
    }

    // Creating Canvas
    var canvasDiv = document.getElementById('myCanvas');
    var width = canvasDiv.offsetWidth;
    var height = canvasDiv.offsetHeight;
    var sketchCanvas = createCanvas(width,height);
    sketchCanvas.parent("myCanvas");
    coord = [canvasDiv.offsetWidth/2,canvasDiv.offsetWidth/20];
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// async function highlightFunctionCall() {
//     document.getElementById("statement1").style.backgroundColor = "#e14e87";
//     await sleep(2000);
//     document.getElementById('statement1').style.removeProperty("background-color");
// }

async function lca(node,n1,n2){
    try{
        for(let i=0;i<9;i++){
            var statement = 'statement' + (i+1).toString();
            document.getElementById(statement).style.removeProperty("background-color");
        }
    }catch(e){}
    await sleep(2000)
    if (node.data > n1 && node.data > n2) { // If both n1 and n2 are smaller than root then LCA lies in left
        node.circle.color = "#e14e87";
        await sleep(1000);
        document.getElementById("statement2").style.backgroundColor = "#e14e87";
        await sleep(2000);
        document.getElementById("statement2").style.backgroundColor = "#4caf50";
        await sleep(2000);
        document.getElementById("statement3").style.backgroundColor = "#4caf50";
        await sleep(2000);
        lca(node.left,n1,n2);
    } else if (node.data < n1 && node.data < n2) { // If both n1 and n2 are greater than root then LCA lies in right
        node.circle.color = "#e14e87";
        await sleep(1000);
        document.getElementById("statement2").style.backgroundColor = "#e14e87";
        await sleep(2000);
        document.getElementById("statement4").style.backgroundColor = "#e14e87";
        await sleep(2000);
        document.getElementById("statement4").style.backgroundColor = "#4caf50";
        await sleep(2000);
        document.getElementById("statement5").style.backgroundColor = "#4caf50";
        await sleep(2000);
        lca(node.right,n1,n2);
    } else {
        node.circle.color = "#e14e87";
        await sleep(1000);
        document.getElementById("statement2").style.backgroundColor = "#e14e87";
        await sleep(2000);
        document.getElementById("statement4").style.backgroundColor = "#e14e87";
        await sleep(2000);
        document.getElementById("statement6").style.backgroundColor = "#4caf50";
        await sleep(2000);
        node.circle.color = "#4caf50";
        document.getElementById("statement7").style.backgroundColor = "#4caf50";
        play = false;
        document.getElementById("play-button").innerHTML = "Play";
        return node;
    }
}

function draw() {

    if(preOrderNodes.length!=0){

        background('#4b5399');
        // let c = color(255, 204, 0);
        // fill(c);
        // rect(ExtPoints.left, ExtPoints.top, ExtPoints.right-ExtPoints.left, ExtPoints.bottom-ExtPoints.top);

        BST.postorder(BST.root); // draws the tree
        console.log('loop')
        if(isPlayed===false && play===true){
            document.getElementById("play-button").innerHTML = "Pause";
            
            // LCA logic
            // highlightFunctionCall()
            lca(node,n1,n2)
            isPlayed = true;
        }
        frameRate(1);
    }
}

// test data - 5, 2, 3, 9, 7, 11, 6, 10, 8, 15, 1, 4, 0