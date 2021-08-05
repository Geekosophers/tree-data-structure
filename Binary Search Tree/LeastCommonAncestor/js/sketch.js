var nodes = [];
var edges = [];
var coord = [];
var BST = null;
var node = null;
var n1 = null;
var n2 = null;
var timeout;
var algoSteps = [];
var currentStepIndex = 0;
var sketchCanvas = null;

function setup(preOrderNodes, node1, node2) {
  // Creating Canvas
  var canvasDiv = document.getElementById("myCanvas");
  var width = canvasDiv.offsetWidth;
  var height = canvasDiv.offsetHeight;
  if (!sketchCanvas) {
    var sketchCanvas = createCanvas(width, height);
    sketchCanvas.parent("myCanvas");
  }
  coord = [canvasDiv.offsetWidth / 2, canvasDiv.offsetWidth / 20];

  BST = new BinarySearchTree();
  ExtPoints = new ExtremePoints();

  // Inserting nodes to the BinarySearchTree
  if (preOrderNodes) {
    preOrderNodes.forEach((data) => {
      const insertedNode = BST.insert(data);
      if (insertedNode.circle.y < ExtPoints.top+insertedNode.circle.length/2)
        ExtPoints.top = insertedNode.circle.y - insertedNode.circle.length / 2;
      if (insertedNode.circle.x > ExtPoints.right-insertedNode.circle.length/2)
        ExtPoints.right =
          insertedNode.circle.x + insertedNode.circle.length / 2;
      if (insertedNode.circle.y > ExtPoints.bottom-insertedNode.circle.length/2)
        ExtPoints.bottom =
          insertedNode.circle.y + insertedNode.circle.length / 2;
      if (insertedNode.circle.x < ExtPoints.left+insertedNode.circle.length/2)
        ExtPoints.left = insertedNode.circle.x - insertedNode.circle.length / 2;
    });

    node = BST.root;
    n1 = node1;
    n2 = node2;

    BST.postorder(BST.root); // draws the tree
    noLoop();
  }
}

async function dr(status, circle, steps) {
  var promise = new Promise(function(resolve) {
    isPlayingSubject$.registerListener(function(isPlaying) {
      if (isPlaying && !timeout) {
        timeout = setTimeout(function() {
            highlight(status, circle, steps);
            timeout = undefined;
            currentStepIndex++;
            resolve();
        }, status === 'reset' ? 0 : animationSpeed);
      } else {
        clearTimeout(timeout);
        timeout = undefined;
      }
    });
  });
  return promise;
}

function highlight(status, circle, steps) {
  var color = '';
  switch (status) {
    case 'executing':
      color = '#FFC300';
      break;
    case 'success':
      color = '#4caf50';
      break;
    case 'failure':
      color = '#e14e87';
      break;
    case 'reset':
      color = '#4b5399';
      steps = ['highlightStep1', 'highlightStep2', 'highlightStep3', 'algoStep3', 'algoStep5', 'algoStep7'];
  }
  if (circle) {
    circle.color = color;
    circle.show();
  }
  if (steps) steps.forEach(function (step) {
    document.querySelector(`.${step}`).style.backgroundColor = color;
  });
}

function calcAlgoSteps() {
  // LCA logic
  algoSteps.push(['reset']);
  algoSteps.push(['executing', node.circle, ['highlightStep1']]);
  if (node.data > n1 && node.data > n2) {   // If both n1 and n2 are smaller than root then LCA lies in left
    algoSteps.push(['success', null, ['highlightStep1', 'algoStep3']]);
    algoSteps.push(['failure', node.circle]);
    node = node.left;
    calcAlgoSteps();
    return;
  }

  algoSteps.push(['failure', null, ['highlightStep1']]);
  algoSteps.push(['executing', null, ['highlightStep2']]);
  if (node.data < n1 && node.data < n2) {    // If both n1 and n2 are greater than root then LCA lies in right
    algoSteps.push(['success', null, ['highlightStep2', 'algoStep5']]);
    algoSteps.push(['failure', node.circle]);
    node = node.right;
    calcAlgoSteps();
    return;
  }

  algoSteps.push(['failure', null, ['highlightStep2']]);
  algoSteps.push(['success', node.circle, ['highlightStep3', 'algoStep7']]);
}

async function animate() {
  if (algoSteps.length) {
    while (currentStepIndex < algoSteps.length) {
      const status = algoSteps[currentStepIndex][0];
      const circle = algoSteps[currentStepIndex][1];
      const steps = algoSteps[currentStepIndex][2];
      await dr(status, circle, steps);
    }
    isPlayingSubject$.isPlaying = false;
    document.getElementById("play-button").innerHTML = "Play";
    animationStarted = false;
  }
}

// test data - 5, 2, 3, 9, 7, 11, 6, 10, 8, 15, 1, 4, 0
// red - e14e87 green - 4caf50 blue - 1e4265
