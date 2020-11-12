/* Remember, the solutions are provided for learning purposes only, use them as a guideline to write your own code.
 * You should not copy this solution and submit it as your own answer.
 */
Sensors.prototype.valueOfNeighbors = function(currentNode){
  	var neighborsToSort = [],
   		resultArray = [],
   		searchSpace = this.searchSpace.vertices,
   		neighbors = currentNode.neighbors,
   		partners = this.partners,
   		lengthOfArray = 0;

    // LAB EXERCISE – Solution below
    resultArray[0] = false;
    resultArray[1] = currentNode;
        
    for (i = 0; i < neighbors.length; i += 1) {
    	var indexToAdd = neighbors[i];
        if ((searchSpace[indexToAdd].valueLevel >= 1) && !(otherAgent(neighbors[i],partners))) {
           	neighborsToSort.push(searchSpace[indexToAdd])
        }
    }
    lengthOfArray = neighborsToSort.length;
    if (lengthOfArray >= 1){
    	neighborsToSort.sort(function (a, b) {
    		return (a.valueLevel) - (b.valueLevel);
	    });
    	resultArray[0] = true;
    	resultArray[1] = neighborsToSort[lengthOfArray-1];
    }
    // LAB EXERCISE – Solution above

    return resultArray;
}
