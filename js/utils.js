function getWidthOfGraph(id){
  var bb = document.querySelector(id).getBoundingClientRect();
  var width = bb.right - bb.left;

  return width;
}