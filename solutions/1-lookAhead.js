/* Remember, the solutions are provided for learning purposes only, use them as a guideline to write your own code.
 * You should not copy this solution and submit it as your own answer.
 */
lookAhead = function (currentNode, graphData,neighborExistence, directionalValueCounter){
   	var counterUp = 0,
   		counterLeft = 0,
   		counterRight = 0,
   		counterDown = 0,
   		spaces,
   		currentValue = currentNode.index,
   		length = graphData.length,
   		searchSpace = graphData.vertices,
   		width = graphData.width,
   		obstacleFound = false;

      // LAB EXERCISE – Solution below
   		
   	if(neighborExistence[0]){
   		spaces = Math.floor((currentValue)/width);
   		for(var i = 1 ; i <= spaces; i++){
   			if(searchSpace[currentValue - i * width].valueLevel == -1){
   				obstacleFound = true;
   			}
   			if(!obstacleFound){
   				counterUp += searchSpace[currentValue - i * width].valueLevel;
   			}
   		}
   	}
   	obstacleFound = false;
   	if(neighborExistence[1]){
   		spaces = Math.floor((currentValue)%width);
   		for(var i = 1 ; i <= spaces; i++){
   			if(searchSpace[currentValue - i].valueLevel == -1){
   				obstacleFound = true;
   			}
   			if(!obstacleFound){
   				counterLeft += searchSpace[currentValue - i].valueLevel;
   			}
   		}
   	}
   	obstacleFound = false;
   	if(neighborExistence[2]){
   		spaces = width - Math.floor((currentValue)%width);
   		for(var i = 1 ; i < spaces; i++){
   			if(searchSpace[currentValue + i].valueLevel == -1){
   				obstacleFound = true;
   			}
   			if(!obstacleFound){
   				counterRight += searchSpace[currentValue + i].valueLevel;
   			}
   		}
   	}
   	obstacleFound = false;
   	if(neighborExistence[3]){
   		spaces = length - Math.floor((currentValue)/width);
   		for(var i = 1 ; i < spaces; i++){
   			if(searchSpace[currentValue + i * width].valueLevel == -1){
   				obstacleFound = true;
   			}
   			if(!obstacleFound){
   				counterDown += searchSpace[currentValue + i * width].valueLevel;
   			}
   		}
   	}
   	directionalValueCounter[0] = counterUp;
   	directionalValueCounter[1] = counterLeft;
   	directionalValueCounter[2] = counterRight;
   	directionalValueCounter[3] = counterDown;

      // LAB EXERCISE – Solution above  	
   	
      alert(directionalValueCounter + " Look Ahead");
      return directionalValueCounter;
}
