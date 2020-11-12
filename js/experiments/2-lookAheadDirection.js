/* Based on the information below use the lookAhead method that you made for the sensor object to choose a direction to take. Also be sure
 * that the agent keeps a loyalty to this path meaning it will not change until it can no longer continue in that direction.
 * currentNode: Node which agent is currently placed
 * sensor: This sensor contains the lookAhead method and will also hold a prefferedDirection which holds the previous direction the agent took
 * graphData: This is the environment shown on the screen
 *
 * To test your solution, write the necessary changes on the code below and then open the index.html file.
 * Run the program with Value Chasing Agent selected.
 *
 * Additional Practice
 * Have the method return other directions besides the most valuable(e.g 2nd highest, 3rd highest , 4th highest)
 * Make agent have differing levels of loyalty. In other words make it change direction based on different rules(e.g if different direction has a value that is 3 higher
 * than current direction)
 *
 * If length is 14 and width 19, with no obstacles and 1 agent is selected and placed at (18,13) the agent should move to the left one vertex if it is done correctly
 */
lookAheadDirection = function (currentNode, sensor, graphData) {
	var dataPack = [],
		neighborExistence = sensor.neighborExistence,
		directionalValueCounter = sensor.directionalValueCounter,
		width = graphData.width,
		preferredDirection = sensor.preferredDirection;
	shift = 0;

	// LAB EXERCISE – Solution below
	//Initialize arrays	
	dataPack[0] = [];	//up
	dataPack[1] = [];	//left
	dataPack[2] = [];	//down
	dataPack[3] = [];	//right

	/* length - used for the for loops pertaining to dataPack
	 * displacementData - array containing the difference between current node and nodes in the four
	 * 						directions [up left right down]
	 */
	var length = dataPack.length,
		displacementData = [];
	//Initialization of information within displacementData
	displacementData[0] = -(width);	//up = -18
	displacementData[1] = -1;		//left = -1
	displacementData[2] = 1;		//right = 1
	displacementData[3] = width;	//down = 18

	//Check if agent already has a prefered direction
	if (preferredDirection !== -1 && directionalValueCounter[preferredDirection] !== 0) {
		return -(-displacementData[preferredDirection]);
	}
	//Loop through each direction and fill in infor for that direction
	//if neighbors exist how much dirt in that direction, 
	//and how many tiles in the array they need to move to be in the right place on the grid
	for (var i = 0; i < length; i++) {
		dataPack[i][0] = neighborExistence[i];
		dataPack[i][1] = directionalValueCounter[i];
		dataPack[i][2] = displacementData[i];
	}
	//Sort lookahead options by if they have neighbors in that dir
	dataPack.sort(function (a, b) {
		return a[0] - b[0];
	});
	//Sorts sorted array from above based on value in the direction
	//This ensures that the best direction choice has neighbors to visit
	//and the highest dirt value
	dataPack.sort(function (a, b) {
		return a[1] - b[1];
	});
	//Act on the chosen best direction, if its neighbors exists
	if (dataPack[length - 1][0]) {
		shift -= -(dataPack[length - 1][2]);

		//These if statements set the preferred direction based on the direction that will be taken
		//check if shift goes up
		if (shift == -width) {
			sensor.preferredDirection = 0;
		}
		//check if shift goes left
		else if (shift == -1) {
			sensor.preferredDirection = 1;
		}
		//check if shift goes right
		else if (shift == 1) {
			sensor.preferredDirection = 2;
		}
		//check if shift goes down
		else if (shift == width) {
			sensor.preferredDirection = 3;
		}

	}

	//If the best direction does not exist then a different movement algorithm will be used
	if (dataPack[length - 1][1] == 0) {
		shift = direction(sensor, graphData)
	}

	return shift;

}