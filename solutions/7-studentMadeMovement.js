/* Remember, the solutions are provided for learning purposes only, use them as a guideline to write your own code.
 * You should not copy this solution and submit it as your own answer.
 */

/*
 * SOLUTIONS MAY VARY. 
 * I created a mini-map for the value sensing agent.
 * Agent type that will move until there is no value remaining on the graph. Will move towards most
 * valuable direction and update a mini-map that it has
 * @method Agent.studentMadeAgent
 * @param {graph} graphData This is the graph that will be acted on
 */
Agent.prototype.studentMadeMovement = function (graphData) {

    // LAB EXERCISE – Solution below
    var locationChange,
		nodeValue,
		newLocation,
		searchSpace = graphData.vertices,
		rootNodeIndex = this.currentNode.index,
		sensors = this.sensors,
		miniMap = this.graph,
		valueInfo = [],
		shouldLookAtMap = false,
		masterMiniMap = this.masterMiniMap;
		effectors = this.effectors;
    	stack = new Array();
    		
    if(graphData.valueTiles !== 0){	
    	stack.push(searchSpace[rootNodeIndex]);
    	currentNode = stack.pop();
    	currentNode = childInterference(graphData, currentNode);

    	
    	nodeValue = currentNode.index;

    	if(sensors.doesTileHaveValue(currentNode)){
    		timesToChangeValue = sensors.hyperAction();
    		for(var i = 0 ; i < timesToChangeValue ; i++){
    			graphData.valueTiles += effectors.decreaseValue(currentNode);
    		}
    		this.timesActed += 1;
    	}
    	
    	valueInfo = sensors.neighboringValueInformation(currentNode);
    	miniMap.updateMiniMap(currentNode, valueInfo);
    	masterMiniMap.updateMiniMap(currentNode, valueInfo);
    	
    	if(!miniMap.graph.pathExists || miniMap.graph.valueTiles == 0){
    		this.sensors.checkSurroundings(currentNode);
    		locationChange = lookAheadDirection(currentNode,sensors,graphData);
    		valueInformation = sensors.valueOfNeighbors(currentNode);	
    		for (i = 0; i < currentNode.neighbors.length; i += 1) {
    			var indexToAdd = currentNode.neighbors[i];
    			if (nodeValue + locationChange == indexToAdd) {
    				stack.push(searchSpace[indexToAdd]);
    			}
    		}
    		if(stack.length == 0){
        		stack.push(currentNode);
        	}
    		if(stack[stack.length - 1].valueLevel == 0){
    			shouldLookAtMap = true;
    		}
    	}
    	if((miniMap.graph.pathExists || shouldLookAtMap) && miniMap.graph.valueTiles > 0){
    		var indexToAdd;
    		indexToAdd = lookAtMap(currentNode,miniMap);
    		if(sensors.checkPath(indexToAdd)){
    			stack.push(currentNode);
    		}
    		else{
    			stack.push(searchSpace[indexToAdd]);
    		}
    		shouldLookAtMap = false;
    	}
    	this.currentNode = stack[stack.length - 1];
    	this.sensors = sensors;
    	this.tiles_scanned += 1;
    	if(stack.length == 0){
    		stack.push(currentNode);
    	}
    }
    else{
		this.stillRunning = false;
	}
    // LAB EXERCISE – Solution above

};
