var preOrderAlgo = `
function preOrderTraversal(node) {
    if(node!=null){ // highlight
        console.log(node.data); // highlight
        preOrderTraversal(node.left); // highlight
        preOrderTraversal(node.right); // highlight
    }
}
`;

var inOrderAlgo = `
function inOrderTraversal(node) {
    if(node!=null){ // highlight
        inOrderTraversal(node.left); // highlight
        console.log(node.data); // highlight
        inOrderTraversal(node.right); // highlight
    }
}
`;

var postorderAlgo = `
function postOrderTraversal(node) {
    if(node!=null){ // highlight
        postOrderTraversal(node.left); // highlight
        postOrderTraversal(node.right); // highlight
        console.log(node.data); // highlight
    }
}
`;

function generateHtmlFromAlgo(algoName) {
  var html = '';
  var algo = '';
  switch (algoName) {
    case 'Inorder':
      algo = inOrderAlgo;
      break;
    case 'Preorder':
      algo = preOrderAlgo;
      break;
    case 'Postorder':
      algo = postorderAlgo;
      break;
    case 'default':
      algo = preOrderAlgo;
  }
  const match = algo.match(/(.+)/g);
  const hilMatch = algo.match(/(.+\/\/ highlight)/g);
  var highlightStepIndex = 1;
  match.forEach(function (m, i) {
    const hi = hilMatch.indexOf(m);
    var c = `algoStep${i+1}`;
    if (hi > -1) {
      c = c.concat(` highlightStep${highlightStepIndex++}`);
      hilMatch.splice(hi, 1);
    }
    html = html.concat(`<p class="${c}">${m.replace(/\/\/ highlight/g, '').replace(/\s/g, '&nbsp;&nbsp;')}</p>`);
  });
  return html;
}