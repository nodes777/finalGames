function getWidthOfGraph(id){
  var bb = document.querySelector(id).getBoundingClientRect();
  var width = bb.right - bb.left;

  return width;
}

// Add a way to directly append HTML - From https://gist.github.com/biovisualize/373c6216b5634327099a
d3.selection.prototype.appendHTML  = function(HTMLString) {
    return this.select(function() {
        return this.appendChild(document.importNode(new DOMParser().parseFromString(HTMLString, 'text/html').body.childNodes[0], true));
    });
};