var algo = `
function leastCommonAncestor(node, n1, n2) {
  if (node.data > n1 && node.data > n2) {   // highlight
    leastCommonAncestor(node.left, n1, n2);
  } else if (node.data < n1 && node.data < n2) {    // highlight
    leastCommonAncestor(node.right, n1, n2);
  } else {    // highlight
    return node;
  }
}
`;

function generateHtmlFromAlgo() {
  var html = '';
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