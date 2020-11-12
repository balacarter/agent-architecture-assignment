
/**
 * agent.js
 * 
 * @file Object intended to act on environment made be environment.js
 *
 * @author Miguel Vazquez
 * @version 3
 */


/* agent.js
 * 
 * Description:  Object intended to act on environment made be environment.js
 *
 * Created by:  @author Miguel Vazquez     Date:  7-8-2013
 *
 * Change History:
 * 07-8-2013		Miguel Vazquez  .Initial version.
 * 07-30-2013	  Miguel Vazquez  Changed variable names to be more generic so that if scenario 
 * 							 	changes same variables can be used
 * 12-21-2014	  Joaquin Loustau Reviewed previous changes
 								  Added mapping to all agents
 *							  Removed MiniMapping Agent
 * 6-01-2016		Gustavo Dias	Fixed a typo on child interference call in the value sensing agent
 * 6-29-2016	  Gustavo Dias	Changed the website design 
 **********************************************************************
*/

/**
 * @constructor Agent
 * @param {graph} graphData This is the graph that will be acted on
 * @param {number} agentNumber Index number of the agent
 * @param {number} currentLocation Value of the vertex the agent is currently located on
 * @param {miniGraph} miniMap This is the master mini-map that all of the agents update
 * @property {number} agentIndex Index number of the agent
 * @property {Sensors} sensors Sensor belonging to this agent
 * @property {Vertex} currentNode Vertex the agent is located on
 * @property {number} tiles_scanned Number of tiles this particular agent has scanned
 * @property {number} timesActed Number of times the agent has acted on the environment
 * @property {Graph} searchSpace The graph that will be acted on
 * @property {Effectors} effectors The effectors controlled by the agent
 * @property {number} area Calculated area of the environment
 * @property {boolean} stillRunning States whether the agent is still running or not
 * @property {number} leftOverValue Values that are left trapped under agent when it is done running
 * @property {MiniGraph} masterMiniMap MiniGraph that is shared by all agents
 * @property {MiniGraph} graph MiniGraph that belongs to this agent
 */

var Agent = function (graphData , agentNumber , rootNode, miniMap) {
	this.agentIndex = agentNumber;
	this.sensors;
	this.currentNode = graphData.vertices[rootNode];
	this.tiles_scanned = 0;
	this.timesActed = 0;
	this.searchSpace = graphData;
	this.effectors = new Effectors();
	this.area = graphData.length * graphData.width;
	this.stillRunning = true;
	this.leftOverValue = 0;
	this.masterMiniMap = miniMap;
	this.graph = new MiniGraph(graphData, agentNumber);
	this.graph.solutionPath = "";
};

/**
 * Agent type that will move until there is no value remaining on the graph. Will move towards most
 * valuable direction
 * @method Agent.valueSensingAgent
 * @param {graph} graphData This is the graph that will be acted on
 */
Agent.prototype.valueSensingAgent = function (graphData) {
	
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
		effectors = this.effectors;
		stack = new Array();

	//Agent checks if there is anything left to act on
	if(graphData.valueTiles !== 0){
		stack.push(searchSpace[rootNodeIndex]);
		currentNode = stack.pop();
		currentNode = childInterference(graphData, currentNode);
		//acting on environment
		if(sensors.doesTileHaveValue(currentNode)){
			timesToChangeValue = sensors.hyperAction();
			
			for(var i = 0 ; i < timesToChangeValue ; i++){
				graphData.valueTiles += effectors.decreaseValue(currentNode);
			}
			
			this.timesActed += 1;
		}
		//Preparation for movement
		nodeValue = currentNode.index;
		this.sensors.checkSurroundings(currentNode);
		locationChange = lookAheadDirection(currentNode,sensors,graphData);
		//Movement
		for (i = 0; i < currentNode.neighbors.length; i += 1) {
			var indexToAdd = currentNode.neighbors[i];
			
			if (nodeValue + locationChange == indexToAdd) {
				stack.push(searchSpace[indexToAdd]);
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

	//Updating the mini-map
		valueInfo = sensors.neighboringValueInformation(currentNode);
    	miniMap.updateMiniMap(currentNode, valueInfo);
    	masterMiniMap.updateMiniMap(currentNode, valueInfo);
};

/**
 * Function that will cause the agent to be moved to a different vertex
 * @method Agent#childInterference
 * @param {graph} graphData This is the graph that will be acted on
 * @param {vertex} currentLocation Vertex the agent is currently located on
 * @returns {vertex} This will be either be a new randomly chosen vertex or the vertex the agent is already located on
 */		
childInterference = function(graphData, currentNode){
	var luck = Math.random() * 100,
		newLocation = Math.floor(Math.random() * graphData.vertices.length),
		childInterferencePercent = document.getElementById("childInterferenceValue").value,
		vertices = graphData.vertices,
		verticesNumber = vertices.length;

	if(luck <= childInterferencePercent & document.getElementById("childInterfere").checked){
		while(graphData.vertices[newLocation].valueLevel == -1){
			newLocation = Math.floor(Math.random()*(verticesNumber))
		}
		return vertices[newLocation];
	}
	
	return currentNode;
}

/**
 * Function meant to create sensors and create a connection between the agents so they know of one anothers location
 * @method Agent.partnerConnection
 * @param {Agent[]} agents array containing all of the other agents acting on the environment
 */
 Agent.prototype.partnerConnection = function(agents){
   	var numberOfAgents = agents.length,
   		roombaNumber = this.agentIndex,
   		agentSet = [];
   	
   	for(var i = 0 ; i < numberOfAgents-1 ; i++){
   		agentSet[i] = agents[(roombaNumber+i+1) % numberOfAgents];
   	}
   	
   	this.sensors = new Sensors(this.searchSpace,agentSet);
   	
}
 
 
/**
 * Function that uses sensory data to decide which direction to use. Simple movement decision
 * @method Agent#direction
 * @param {sensor} sensor This is the sensor with the bumper data to be used in order to decide on a direction
 * @param {graph} graphData This is the graph that will be acted on
 * @returns {number} shift This value is how much the currentLocations value needs to be incremented/decremented to give you the value of the neighbor in the desired direction
 */  
direction = function(sensor,graphData){
	/* neighborExistence - array containing whether neighbors exist or not. Array order is in up, left, right, down
	 * directionalData - array containing information for movement[movingRight, horizontalBumper, movingUp, verticalBumper]
	 * 					movingRight and moving Up dictate what the last movement made was to give it priority
	 * 					horizontalBumper and Vertical bumper dictates whether the agent is restricted vertically or horizontally
	 * randomFactor - used to allow vertical movement at random moments to prevent purely horizontal movement
	 * 
	 */
		var shift = 0,
			neighborExistence = sensor.neighborExistence,
			directionalData = sensor.directionalData,
			randomFactor = Math.random()*100,
			width = graphData.width;
			directionalData[1] = false;
		//used to give preference to vertical movement at random intervals opposed to horizontal movement	
		if(randomFactor < 20){
			directionalData[1] = true;
			directionalData[2] = true;
		}	
		//Right exists and left doesn't makes the agent give preference to moving right
		if(neighborExistence[2] && !neighborExistence[1]){	
			directionalData[0] = true;
			
			/*Since this if is to change directions from left and right this assumes it hit a wall
			*and will try to make a vertical movement
			*/
	    	if((neighborExistence[0] || neighborExistence[3]) && !directionalData[2]){
	    		directionalData[1] = true;
	     	}
	    	
	     }
		//left exists but right doesn't gives a preference to moving left
	     else if (!neighborExistence[2] && neighborExistence[1]){
	     	directionalData[0] = false;
	     	/*Change in direction may have been caused by hitting a wall, agent will attempt 
	     	*a vertical movement
	     	*/
	     	if((neighborExistence[0] || neighborExistence[3]) && !directionalData[2]){
	     		directionalData[1] = true;
	     	}
	     }
		//These if statements will set a direction based on preferences and restrictions
	     if  (neighborExistence[2] && directionalData[0] && !directionalData[1]){
	     	shift += 1;
	     	directionalData[2] = false;
	     }
	     
	     else if (neighborExistence[1] && !directionalData[0] && !directionalData[1]){
	     	shift -= 1;
	     	directionalData[2] = false;
	     }
	     
	     else if (neighborExistence[0] && (directionalData[3] || !neighborExistence[3])){
	     	shift -= (width);
	     	directionalData[2] = true;
	     	directionalData[3] = true;
	     }
			
	     else if (neighborExistence[3] && (!directionalData[3] || !neighborExistence[0])){ 
	     	shift -= (-width);
	     	directionalData[2] = true;
	     	directionalData[3] = false;
	     }
	     
	     sensor.preferredDirection = -1;
	     return shift;
}

/**
 * Function that uses sensory data to decide which direction to use. Informed movement decision
 * @method Agent#lookAtMap
 * @param {vertex} currentLocation This is the vertex the agent is currently located on
 * @param {minigraph} miniGraph This is the minigraph that will provide the information of the environment the agent knows of
 * @returns {vertex} nodeIndex This is the number of the vertex the agent should head towards next
 */ 
lookAtMap = function(currentNode, miniGraph){
	var search = new Search,
		bestValueLevel = 3,
		graph = miniGraph.graph,
		searchSpace = graph.vertices,
		counter = 0,
		numberOfVertices = searchSpace.length,
		rootIndex = 0,
		stringIndex,
		solution = graph.solutionPath,
		index = currentNode.index,
		nodeIndex = currentNode.index;
	
	rootIndex = currentNode.index;
	if(!graph.pathExists){
		while(searchSpace[index].valueLevel !== bestValueLevel && bestValueLevel !== 0){
			counter++;
			index = (index + 1) % numberOfVertices;
			if(counter == numberOfVertices){
				counter = 0;
				bestValueLevel -= 1;
			}
		}
		graph.goal = index;
	}
	if(solution === ""){
		graph.pathExists = false;
	}
	if(!graph.pathExists){
		Search.beam(graph, rootIndex);
		solution = graph.solutionPath;
	}
	else{
		stringIndex = solution.indexOf("-");
		if(stringIndex == -1){
			nodeIndex = solution;
			graph.solutionPath = "";
			graph.pathExists = false;
		}
		else{
			nodeIndex = solution.substring(0,stringIndex);
			graph.solutionPath = solution.slice(stringIndex + 1);
		}
	}
	return nodeIndex;
	
}