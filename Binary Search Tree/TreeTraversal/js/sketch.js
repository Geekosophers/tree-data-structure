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

    BST.postorder(BST.root);
    noLoop();
}

function highlight([status, circle, node, steps]) {
    var color = '';
    switch (status) {
        case 'executing':
            color = '#ffcc00';
            node ? image(img, node.circle.x-10, node.circle.y+node.circle.length/2+5, 20, 10) : null;
            break;
        case 'success':
            color = '#4caf50';
            node ? image(img, node.circle.x-10, node.circle.y+node.circle.length/2+5, 20, 10) : null;
            break;
        case 'image':
            node ? image(img, node.circle.x-10, node.circle.y+node.circle.length/2+5, 20, 10) : null;
            break;
        case 'failure':
            color = '#e14e87';
            break;
        case 'reset':
            color = '#4b5399';
            steps = ['algoStep1', 'algoStep2', 'algoStep3', 'algoStep4', 'algoStep5'];
    }
    if (circle) {
        circle.color = color;
        circle.show();
    }
    if (steps) steps.forEach(function (step) {
        document.querySelector(`.${step}`).style.backgroundColor = color;
    });
}

function draw() {
    background('#4b5399');
    console.log('yes')

    if(currentStepIndex>=algoSteps.length){ // stopping animation and draw loop
        play = false;
        noLoop();
        document.getElementById("play-button").innerHTML = "Play";
    }
    
    if(preOrderNodes.length>0){
        BST.postorder(BST.root); // draws the tree
        
        if(play===true){ // for playing the animation next step
            highlight(algoSteps[currentStepIndex])
            currentStepIndex++;
            frameRate(1);
        }
    }
}

function calcPreorderAlgoSteps(node) {
    algoSteps.push(['reset',null,null,null])
    algoSteps.push(['executing', node ? node.circle : null, node, ['algoStep1']]);
    algoSteps.push(['executing', null, node, ['algoStep2']]);
    
    if(node!==null){
        algoSteps.push(['success', null, node, ['algoStep2']]);
        algoSteps.push(['success', node.circle, node, ['algoStep3']]);
        algoSteps.push(['success', node.circle, node, ['algoStep4']]);
        calcPreorderAlgoSteps(node.left);
        if(node.left!==null){
            algoSteps.push(['success', node.circle, node, []]);
        }
        algoSteps.push(['success', node.circle, node, ['algoStep5']]);
        calcPreorderAlgoSteps(node.right);
        if(node.right!==null){
            algoSteps.push(['success', node.circle, node, []]);
        }
    }  
    else{
        algoSteps.push(['failure', null, node, ['algoStep2']]);
        algoSteps.push(['reset',null,null,null])
    }
}

function calcInorderAlgoSteps(node) {
    algoSteps.push(['reset',null,null,null])
    algoSteps.push(['executing', node ? node.circle : null, node, ['algoStep1']]);
    algoSteps.push(['executing', null, node, ['algoStep2']]);
    
    if(node!==null){
        algoSteps.push(['success', null, node, ['algoStep2']]);
        algoSteps.push(['success', null, node, ['algoStep3']]);
        calcInorderAlgoSteps(node.left);
        algoSteps.push(['success', node.circle, node, ['algoStep4']]);
        if(node.left!==null){
            algoSteps.push(['success', node.circle, node, []]);
        }
        algoSteps.push(['success', node.circle, node, ['algoStep5']]);
        calcInorderAlgoSteps(node.right);
        if(node.right!==null){
            algoSteps.push(['success', node.circle, node, []]);
        }
    }  
    else{
        algoSteps.push(['failure', null, node, ['algoStep2']]);
        algoSteps.push(['reset',null,null,null])
    }
}

function calcPostorderAlgoSteps(node) {
    algoSteps.push(['reset',null,null,null])
    algoSteps.push(['executing', node ? node.circle : null, node, ['algoStep1']]);
    algoSteps.push(['executing', null, node, ['algoStep2']]);
    
    if(node!==null){
        algoSteps.push(['success', null, node, ['algoStep2']]);
        
        algoSteps.push(['success', null, node, ['algoStep3']]);
        calcPostorderAlgoSteps(node.left);
        if(node.left!==null){
            algoSteps.push(['success', null, node, []]);
            algoSteps.push(['reset',null,null,null])
        }
        algoSteps.push(['success', null, node, ['algoStep4']]);
        calcPostorderAlgoSteps(node.right);
        if(node.right!==null){
            algoSteps.push(['success', null, node, []]);
        }
        algoSteps.push(['success', node.circle, node, ['algoStep5']]);
    }  
    else{
        algoSteps.push(['failure', null, node, ['algoStep2']]);
        algoSteps.push(['reset',null,null,null])
    }
}