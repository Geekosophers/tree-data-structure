class BinarySearchTree{
    
    constructor(){
        this.root = null;
    }
  
    insert(data){
        var newNode = new Node(data);
        if(this.root === null){
            newNode.coord = coord;
            newNode.parentCoord = coord;
            newNode.level = 0;
            newNode.circle = new Circle(newNode.coord[0], newNode.coord[1], newNode.data.toString(), window.innerWidth/20);
            newNode.edgeToParent = new Line(newNode.parentCoord, newNode.coord);
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
                newNode.circle = new Circle(newNode.coord[0], newNode.coord[1], newNode.data.toString(), window.innerWidth/20);
                newNode.edgeToParent = new Line(newNode.parentCoord, newNode.coord);
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
                newNode.circle = new Circle(newNode.coord[0], newNode.coord[1], newNode.data.toString(), window.innerWidth/20);
                newNode.edgeToParent = new Line(newNode.parentCoord, newNode.coord);
                node.right = newNode;
            }
            else
                this.insertNode(node.right,newNode);
        }
    }

    postorder(node){
        if(node !== null){
            this.postorder(node.left);
            this.postorder(node.right);
            node.edgeToParent.show();
            node.circle.show();
            
        }
    }

    minNode(node){
        var node = this.root;
        if(node.left !== null){
            node = node.left;
            node.circle.color = '#e14e87';
            console.log(node);
        }
        return (node.data);
    }
}