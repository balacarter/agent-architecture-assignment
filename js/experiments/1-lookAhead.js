/* Based on the information below make a look ahead counter which will return an array with the value of each of the four directions around the agent
 * This should be a relatively simple program that will be used for some of the movement types used by the agent
 * currentNode: Node which the agent is currently located
 * graphData: The graph that is shown on the screen
 * neighborExistence: array with booleans stating whether a neighbor in each direction exists
 * directionalDirtCounter: another array which will hold the value in each direction that the agent can perceive
 * Note: the two included arrays have the following order [up , left , right , down ]
 * The agents should not be able to see past an obstacle(other agents do not count as obstacles)
 * 
 * To test your solution, write the necessary changes on the code below and then open the index.html file.
 * Run the program with one Value Chasing Agent, starting at (0,0) and other default parameters.
 * Open the browser console [for Google Chrome use Ctrl+Shift+J (Windows / Linux) or Cmd+Opt+J (Mac)].
 * Look for " Look Ahead" in the panel and that will tell you the result of your code.
 * If you did the exercise correctly, you should get "0,0,6,39 Look Ahead" as the first line in your console.
 */
lookAhead = function (currentNode, graphData, neighborExistence, directionalValueCounter) {
      var counterUp = 0,                  //Dirt in up direction
            counterLeft = 0,                 //Dirt in left direction
            counterRight = 0,                //Dirt in right direction
            counterDown = 0,                 //Dirt in down direction
            spaces,                          //Number of tiles to explore in a direction
            currentValue = currentNode.index,//Current node value
            length = graphData.length,       //graph dimension up-down
            searchSpace = graphData.vertices,//Array of tiles
            width = graphData.width,         //Graph dimensions left-right
            obstacleFound = false;           //If wall

      /* Hint 1:
       *  
       * Find a way to check all four directions for validity (i.e. can't go right if you're all the way to the right, can't go down or to the right if you're in the bottom-right corner, etc.),
       * then proceed to check along the width of that entire direction for bugs (i.e. "value") in each of those spaces (i.e. shoot a "beam" down that direction and check each space for bugs. Increment
       * a counter for that direction with the value of that "row."
       *    
       * Example: If I'm two spaces away from the right wall and the space directly to my right has 3 bugs, and the space to my right hugging the wall has 4 bugs, then the value for the direction "right" is 7.
       */

      // LAB EXERCISE � Fill in solution below

      //Directions arrays: [up, left, right, down]

      //Check direction: up
      if (neighborExistence[0] > 0) {
            //calc how many spaces in up dir
            spaces = Math.floor((currentValue) / width);
            //loop through available up dir spaces
            for (var i = 1; i <= spaces; i++) {
                  //Check if wall
                  if (searchSpace[currentValue - i * width].valueLevel == -1) {
                        obstacleFound = true;
                  }
                  //else add dirt count
                  if (!obstacleFound) {
                        counterUp += searchSpace[currentValue - i * width].valueLevel;
                  }
            }
      }
      //Check direction left
      //Reset bool
      obstacleFound = false;
      //Checkif there are neighbors in the left direction
      if (neighborExistence[1]) {
            //Calc how many tiles in left direction
            spaces = Math.floor((currentValue) % width);
            //Loop through possible tiles
            for (var i = 1; i <= spaces; i++) {
                  //Check if wall
                  if (searchSpace[currentValue - i].valueLevel == -1) {
                        obstacleFound = true;
                  }
                  //Else add dirt from each tile
                  if (!obstacleFound) {
                        counterLeft += searchSpace[currentValue - i].valueLevel;
                  }
            }
      }
      //reset bool
      obstacleFound = false;
      //Check if neighbors exist the the right
      if (neighborExistence[2]) {
            //Calc how many spaces to the right 
            spaces = width - Math.floor((currentValue) % width);
            for (var i = 1; i < spaces; i++) {
                  if (searchSpace[currentValue + i].valueLevel == -1) {
                        obstacleFound = true;
                  }
                  if (!obstacleFound) {
                        counterRight += searchSpace[currentValue + i].valueLevel;
                  }
            }
      }
      //Reset bool
      obstacleFound = false;
      //Check if neighbors to the down
      if (neighborExistence[3]) {
            spaces = length - Math.floor((currentValue) / width);
            for (var i = 1; i < spaces; i++) {
                  if (searchSpace[currentValue + i * width].valueLevel == -1) {
                        obstacleFound = true;
                  }
                  if (!obstacleFound) {
                        counterDown += searchSpace[currentValue + i * width].valueLevel;
                  }
            }
      }

      //add dirt counts to direction count array
      directionalValueCounter[0] = counterUp;
      directionalValueCounter[1] = counterLeft;
      directionalValueCounter[2] = counterRight;
      directionalValueCounter[3] = counterDown;	

      //alert(directionalValueCounter + " part 1");

      //return direction count array
      return directionalValueCounter;
}
