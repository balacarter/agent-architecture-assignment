/* Remember, the solutions are provided for learning purposes only, use them as a guideline to write your own code.
 * You should not copy this solution and submit it as your own answer.
 */
untouchableValue = function(agents, graphData){

	// LAB EXERCISE – Solution below
	var counter = 0,
		agentLength = agents.length;
	for( var i = 0 ; i < agentLength ; i++){
		counter += agents[i].leftOverValue;
	}
	if(graphData.valueTiles - counter == 0){
		return true;
	}
	else{
		return false;
	}
	// LAB EXERCISE – Solution above
}
