/* Remember, the solutions are provided for learning purposes only, use them as a guideline to write your own code.
 * You should not copy this solution and submit it as your own answer.
 */
Agent.prototype.valueChasingAgent = function (graphData) {
    /*Explanation of variables
     * locationChange - will contain a value that states the offset in grid location from current node to desired node
     * nodeValue - grid location of the current node
     * searchSpace - collection of grids in the environment used for traversal
     * rootNodeIndex - used to push current node onto stack 
     * sensors - the sensor object the belongs to the particular agent
     * effectors - effector object that belongs to the particular agent
     */
    var locationChange,
        nodeValue,
        searchSpace = graphData.vertices,
        rootNodeIndex = this.currentNode.index,
        sensors = this.sensors,
        miniMap = this.graph,
        masterMiniMap = this.masterMiniMap;

        // LAB EXERCISE – Solution below
        effectors = this.effectors;
        stack = new Array();
        
    if(graphData.valueTiles !== 0){ 
        stack.push(searchSpace[rootNodeIndex]);
        currentNode = stack.pop();
        currentNode = childInterference(graphData, currentNode);
        
        //Acting on environment
        if(sensors.doesTileHaveValue(currentNode)){
            timesToChangeValue = sensors.hyperAction();
            
            for(var i = 0 ; i < timesToChangeValue ; i++){
                graphData.valueTiles += effectors.decreaseValue(currentNode);
            }
            
            this.timesActed += 1;
        }
        valueInformation = sensors.valueOfNeighbors(currentNode);
        //Preparation for movement
        nodeValue = currentNode.index;
        this.sensors.checkSurroundings(currentNode);
        locationChange = lookAheadDirection(currentNode,sensors,graphData);
        
        if(valueInformation[0]){
            stack.push(valueInformation[1]);
        }
        //If none of the neighboring tiles have a value the agent will use movement of look ahead
        else{
            
            for (i = 0; i < currentNode.neighbors.length; i += 1) {
                var indexToAdd = currentNode.neighbors[i];
                if (nodeValue + locationChange == indexToAdd) {
                    stack.push(searchSpace[indexToAdd]);
                }
            }
            
        }
        
        if(stack.length == 0){
            stack.push(currentNode);
        }
        
        this.currentNode = stack[stack.length - 1];
        this.sensors = sensors;
        this.tiles_scanned += 1;
        
    }
    
    else{
        this.stillRunning = false;
    }
    // LAB EXERCISE – Solution above

    //Updating the mini-map
        valueInfo = sensors.neighboringValueInformation(currentNode);
        miniMap.updateMiniMap(currentNode, valueInfo);
        masterMiniMap.updateMiniMap(currentNode, valueInfo);
    
};
