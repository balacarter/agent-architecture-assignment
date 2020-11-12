/* Remember, the solutions are provided for learning purposes only, use them as a guideline to write your own code.
 * You should not copy this solution and submit it as your own answer.
 */
lookAheadDirection = function(currentNode,sensor,graphData){
	/* dataPack - array of arrays used to sort arrays accordingly
	 * neighborExistence - array containing booleans pertaining to existence of neighbors [up left right down]
	 * directionalValueCounter - array containing numbers dictating the value of each direction [up left right down]
	 * preferredDirection - contains a number 0-3 dictating the direction it is currently moving in
	 * 						to give that direction preference
	 * 
	 */
	var dataPack = [],
		neighborExistence = sensor.neighborExistence,
		directionalValueCounter = sensor.directionalValueCounter,
		width = graphData.width,
		preferredDirection = sensor.preferredDirection;
		shift = 0;

	// LAB EXERCISE – Solution below
	//Initialization of arrays within dataPack	
	dataPack[0] = [];
	dataPack[1] = [];
	dataPack[2] = [];
	dataPack[3] = [];
	/* length - used for the for loops pertaining to dataPack
	 * displacementData - array containing the difference between current node and nodes in the four
	 * 						directions [up left right down]
	 */
	var	length = dataPack.length,
		displacementData = [];
	//Initialization of information within displacementData
	displacementData[0] = -(width);
	displacementData[1] = -1;
	displacementData[2] = 1;
	displacementData[3] = width;
	
	/*This checks to see if there is a preferred direction the agent is moving in and if there
	* is a value in that direction to keep the agent moving in that direction.
	*/
	if(preferredDirection !== -1 && directionalValueCounter[preferredDirection] !== 0){
		return -(-displacementData[preferredDirection]);
	}
	/*Fills in dataPack with boolean stating the existence of the direction, directionalValueCounter
	* which contains the sum of values in each direction, displacementData which dictates the difference
	* between current node and desired node
	*/
	for(var i = 0 ; i < length ; i++){
		dataPack[i][0] = neighborExistence[i];
		dataPack[i][1] = directionalValueCounter[i];
		dataPack[i][2] = displacementData[i];
	}
	//This sorts the array in order of existence
	dataPack.sort(function(a,b){
		return a[0] - b[0];
	});
	//Sorts array based on value in the direction
	dataPack.sort(function(a,b){
		return a[1] - b[1];
	});
	/*if the rightmost direction (best out of the sorting) exists it gives the instructions
	 *necessary for it
	 */
	if(dataPack[length - 1][0]){
		shift -= -(dataPack[length - 1][2]);
		
		//These if statements set the preferred direction based on the direction that will be taken
		if(shift == -width){
			sensor.preferredDirection = 0;
		}
		
		else if(shift == -1){
			sensor.preferredDirection = 1;
		}
		
		else if(shift == 1){
			sensor.preferredDirection = 2;
		}
		
		else if(shift == width){
			sensor.preferredDirection = 3;
		}
		
	}
	
	//If the best direction does not exist then a different movement algorithm will be used
	if(dataPack[length - 1][1] == 0){
		shift = direction(sensor,graphData)
	}
	// LAB EXERCISE – Solution above
	
	return shift;
	
}
