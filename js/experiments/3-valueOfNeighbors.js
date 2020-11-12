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
Sensors.prototype.valueOfNeighbors = function(currentNode){
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

    // LAB EXERCISE – Fill in solution below
  
    // LAB EXERCISE – Fill in solution above
  
    return resultArray;
}
