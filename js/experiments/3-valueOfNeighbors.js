/* This method should return a data array. The first value in the array being a boolean indicating there is a neighbor with a value higher than 0
 * and second value being the most valuable neighbor
 * currentNode: node agent is currently located at
 * 
 * To test your solution, write the necessary changes on the code below and then open the index.html file.
 * Run the program with Value Chasing Agent selected.
 * 
 * Additional practice:
 * Have method return 2nd most valuable neighbor
 * 
 * If length is 14 and width 19, with no obstacles and 1 agent is selected and placed at (18,13) then the resulting array should be true, (17,13)
 */
Sensors.prototype.valueOfNeighbors = function (currentNode) {
  var neighborsToSort = [],
    resultArray = [],
    searchSpace = this.searchSpace.vertices,
    neighbors = currentNode.neighbors,
    partners = this.partners,
    lengthOfArray = 0;

  /* Hint 1:
   * 
   * Find the list of neighbors and sort them by "value." The highest valued neighbor should be first.
   */

  resultArray[0] = false;
  resultArray[1] = currentNode;

  for (i = 0; i < neighbors.length; i += 1) {
    var indexToAdd = neighbors[i];
    if ((searchSpace[indexToAdd].valueLevel >= 1) && !(otherAgent(neighbors[i], partners))) {
      neighborsToSort.push(searchSpace[indexToAdd])
    }
  }
  lengthOfArray = neighborsToSort.length;
  if (lengthOfArray >= 1) {
    neighborsToSort.sort(function (a, b) {
      return (a.valueLevel) - (b.valueLevel);
    });
    resultArray[0] = true;
    resultArray[1] = neighborsToSort[lengthOfArray-1];

    //My change, sends second best nieghbor if available. 
    
    /*if(lengthOfArray > 1) {
      resultArray[1] = neighborsToSort[lengthOfArray - 2];
    }
    else {
      resultArray[1] = neighborsToSort[lengthOfArray - 1];
    }*/
    
  }

  return resultArray;
}
