/* Using lookAheadDirection and valueOfNeighbors methods that were made make a movement method which will have the agent move towards the most valuable
 * neighbor. If they are all clean then the agent should use the lookAheadDirection method to choose its next direction
 * graphData: Environment this agent is acting on
 * 
 * To test your solution, write the necessary changes on the code below and then open the index.html file.
 * 
 * If done with 1 agent starting at (18,13), no obstacles, length at 14 with width at 19 the agent should finish cleaning and stop at tile (18,1)
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
