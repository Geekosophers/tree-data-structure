let nodes = [];
let edges = [];
let preorderlist = [5,3,10,32,11,1]
let coord = [window.innerWidth/2,window.innerWidth/20]

class Node
{
    constructor(data)
    {
        this.data = data;
        this.coord = null;
        this.parentCoord = null;
        this.left = null;
        this.right = null;
        this.level = null;
    }
}

class BinarySearchTree
{
    constructor(){
        this.root = null;
    }
  
    insert(data){
        var newNode = new Node(data);
        if(this.root === null){
            newNode.coord = coord;
            newNode.parentCoord = coord;
            newNode.level = 0;
            this.root = newNode;
        }
        else{
            this.insertNode(this.root, newNode);
        }
    }
    
    insertNode(node, newNode){
        if(newNode.data < node.data){
            if(node.left === null){
                newNode.level = node.level + 1;
                newNode.parentCoord = node.coord;
                newNode.coord = [node.coord[0] - (3/newNode.level)*(window.innerWidth/20), node.coord[1] + window.innerWidth/20]
                node.left = newNode;
            }
            else
                this.insertNode(node.left, newNode); 
        }
        else{
            if(node.right === null){
                newNode.level = node.level + 1;
                newNode.parentCoord = node.coord;
                newNode.coord = [node.coord[0] + (3/newNode.level)*(window.innerWidth/20), node.coord[1] + window.innerWidth/20];
                node.right = newNode;
            }
            else
                this.insertNode(node.right,newNode);
        }
    }

    inorder(node){
        if(node !== null)
        {
            this.inorder(node.left);
            console.log(node.data);
            var nodeInView = new Circle(node.coord[0], node.coord[1], node.data.toString(), window.innerWidth/20);
            var edge = new Line(node.parentCoord, node.coord);
            edges.push(edge);
            nodes.push(nodeInView);
            this.inorder(node.right);
        }
    }

    drawNodes(){
        if(this.root==null)
            return;
        
        this.inorder(this.root);
    }
}

function main(){

    var BST = new BinarySearchTree();
    // Inserting nodes to the BinarySearchTree
    BST.insert(15);
    BST.insert(25);
    BST.insert(10);
    BST.insert(7);
    BST.insert(22);
    BST.insert(17);
    BST.insert(13);
    BST.insert(5);
    BST.insert(9);
    BST.insert(27);
    BST.insert(20);
    BST.insert(11);
    BST.insert(8);
    BST.insert(2);
    BST.insert(10);
    BST.insert(9);


    console.log(BST.root);

    BST.drawNodes();
    

}

function setup() {
    main()
    let width = window.innerWidth;
    let height = window.innerHeight;
    createCanvas(width, height);
}

function draw() {
    background('#4b5399');
    edges.forEach(edge => {
        edge.show();
    });
    nodes.forEach(node => {
        node.show();
    });
}

class Circle {
    constructor(x, y, text, length) {
        this.x = x;
        this.y = y;
        this.text = text;
        this.length = length;
        this.brightness = 0;
    }

    show() {
        stroke(255);
        strokeWeight(1);
        fill('#4b5399');
        circle(this.x,this.y,this.length,this.length);
        textAlign(CENTER,CENTER);
        strokeWeight(1);
        fill(255);
        text(this.text, this.x,this.y);
    }
}

class Line {
    constructor(parentCoord, coord) {
        this.x1 = parentCoord[0];
        this.y1 = parentCoord[1];
        this.x2 = coord[0];
        this.y2 = coord[1];
    }

    show() {
        stroke(255);
        strokeWeight(1);
        line(this.x1,this.y1,this.x2,this.y2);
    }
}