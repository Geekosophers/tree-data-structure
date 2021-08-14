var nodes = [];
var edges = [];
var xOffset = 0;
var yOffset = 0;
var coord = [(window.innerWidth/2)+xOffset,window.innerWidth/20+yOffset]
var BST = null;
var node = null;
var isPlayed = false;
var sizeMutliplier = 1;
var checkHeightOfTree = false;
var checkWidthOfTree = false;
var checkXOffset = false;
var checkYOffset = false;
let img;
var algoSteps = [];
var currentStepIndex = 0;

function resetGlobalVariables(){
    nodes = [];
    edges = [];
    xOffset = 0;
    yOffset = 0;
    coord = [(window.innerWidth/2)+xOffset,window.innerWidth/20+yOffset]
    BST = null;
    node = null;
    isPlayed = false;
    sizeMutliplier = 1;
    checkHeightOfTree = false;
    checkWidthOfTree = false;
    checkXOffset = false;
    checkYOffset = false;
    algoSteps = [];
    currentStepIndex = 0;
}