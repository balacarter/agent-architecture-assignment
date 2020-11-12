/* If you test the program you'll notice the simple agent stops prematurely, without eating all the insects.
 * Change the simple agent so that it does not stop until all the insects are eaten.
 *  
 * Hint 1: Find in the code where the stopping criteria is for the Simple Agent and change it so that it eats all the bugs.
 *
 * To test your solution, write the necessary changes on the code below, then open the index.html file and run the application with Simple Agent selected.
 */
Agent.prototype.simpleAgent = function (graphData) {
	/*Explanation of variables
	 * locationChange - will contain a value that states the offset in grid location from current node to desired node
	 * nodeValue - grid location of the current node
	 * searchSpace - collection of grids in the environment used for traversal
	 * rootNodeIndex - used to push current node onto stack 
	 * tiles_scanned - a running tally of the number of tiles the agent has gone over
	 * sensors - the sensor object the belongs to the particular agent
	 * area - the width * height of the environment
	 * effectors - effector object that belongs to the particular agent
	 */
    var locationChange,
		nodeValue,
		searchSpace = graphData.vertices,
		rootNodeIndex = this.currentNode.index,
		tiles_scanned = this.tiles_scanned,
		sensors = this.sensors,
		miniMap = this.graph,
		masterMiniMap = this.masterMiniMap;
		area = this.area,
		effectors = this.effectors;
		stack = new Array();
		
	if(tiles_scanned < area){
		//It might be possible to merge the next two lines
		stack.push(searchSpace[rootNodeIndex]);
		currentNode = stack.pop();
		currentNode = childInterference(graphData, currentNode);
		//segment of code is what acts on the environment
		if(sensors.doesTileHaveValue(currentNode)){
			timesToChangeValue = sensors.hyperAction();
			
			for(var i = 0 ; i < timesToChangeValue ; i++){
				graphData.valueTiles += effectors.decreaseValue(currentNode);
			}
			this.timesActed += 1;
			
		}
		//Segment in charge of movement. Uses various movement functions
		nodeValue = currentNode.index; 
		this.sensors.checkSurroundings(currentNode);
		locationChange = direction(sensors,graphData);
		
		for (i = 0; i < currentNode.neighbors.length; i += 1) {
			var indexToAdd = currentNode.neighbors[i];
			
			if (nodeValue + locationChange == indexToAdd) {
				stack.push(searchSpace[indexToAdd]);
			}
		}

		//Updating the mini-map
		valueInfo = sensors.neighboringValueInformation(currentNode);
    	miniMap.updateMiniMap(currentNode, valueInfo);
    	masterMiniMap.updateMiniMap(currentNode, valueInfo);


		//If there are no possible movements the agent will stay in place
		if(stack.length == 0){
			stack.push(currentNode);
		}
		
		this.currentNode = stack[stack.length - 1];
		this.sensors = sensors;
		this.tiles_scanned += 1;
	
	}
	//This is the segment dicatating the agent thinks it is done acting on the environment
	else{
		
		this.stillRunning = false;
		this.leftOverValue = this.currentNode.valueLevel;
		
	}
};