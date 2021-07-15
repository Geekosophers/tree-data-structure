class BinarySearchTree{
    
    constructor(){
        this.root = null;
    }
  
    insert(data){
        var newNode = new Node(data);
        var width = window.innerWidth;
        var height = window.innerHeight;
        var length = null;
        
        if(width>height)
            length = width/20;
        else
            length = height/30;
        

        if(this.root === null){
            newNode.coord = coord;
            newNode.parentCoord = coord;
            newNode.level = 0;
            newNode.circle = new Circle(newNode.coord[0], newNode.coord[1], newNode.data.toString(), length);
            newNode.edgeToParent = new Line(newNode.parentCoord, newNode.coord);
            this.root = newNode;
            return this.root;
        }
        else{
            return this.insertNode(this.root, newNode,length);
        }
    }
    
    insertNode(node, newNode,length){
        if(newNode.data < node.data){
            if(node.left === null){
                newNode.level = node.level + 1;
                newNode.parentCoord = node.coord;
                newNode.coord = [node.coord[0] - (3/newNode.level)*(length), node.coord[1] + length]
                newNode.circle = new Circle(newNode.coord[0], newNode.coord[1], newNode.data.toString(), length);
                newNode.edgeToParent = new Line(newNode.parentCoord, newNode.coord);
                node.left = newNode;
                return node.left;
            }
            else
                return this.insertNode(node.left, newNode,length); 
        }
        else{
            if(node.right === null){
                newNode.level = node.level + 1;
                newNode.parentCoord = node.coord;
                newNode.coord = [node.coord[0] + (3/newNode.level)*(length), node.coord[1] + length];
                newNode.circle = new Circle(newNode.coord[0], newNode.coord[1], newNode.data.toString(), length);
                newNode.edgeToParent = new Line(newNode.parentCoord, newNode.coord);
                node.right = newNode;
                return node.right;
            }
            else
                return this.insertNode(node.right,newNode,length);
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