/*
 * Shawn Potter
 * 12/3/2018
 * Player positioning
 * movement.js
*/

var fnstring = "room";
var roomCheck = fnstring + playerPosition;
var direction;


northButton.on("click", function(){
   moveNorth(playerPosition);
   console.log("Progress level at: " + progress);
});
eastButton.on("click", function(){
   moveEast(playerPosition);
   console.log("Progress level at: " + progress);
});
southButton.on("click", function(){
   moveSouth(playerPosition);
   console.log("Progress level at: " + progress);
});
westButton.on("click", function(){
   moveWest(playerPosition);
   console.log("Progress level at: " + progress);
});

function moveNorth(position){
   if(playerPosition ==4 && progress >= 5){
      finaleRunning();
      progress = 7;
      return progress;
   }else{
      playerPosition = position;
      //debug
      //console.log("Attempting to move North, player's current position is: " + playerPosition);
      check_for_path(position, true, false, false, false);
      //debug
      //console.log("Player has moved, now at position:" + playerPosition + " and the way is blocked: " + blocked);
      direction = "north";
      printResult(direction);
      return playerPosition;
   }
}
function moveEast(position){
   if(position == 3 && !inventory.includes("spacesuit")){
      story.append("<p class='storyline'>You depressurize the airlock. It's then that you realize you forgot to put on a spacesuit. As your body begins to swell you wonder how you could have forgotten something so simple...</p>");
      playerDead = true;
   }
   else{
      if(position == 6){
         story.append("<p class='storyline'>As you move east you trip and your magnetic boots prove to not be very powerful. You begin drifting away from the station. Woops.</p>");
         playerDead = true;
         
      } else{
         playerPosition = position;
         //debug
         //console.log("Attempting to move East, player's current position is: " + playerPosition);
         check_for_path(position, false, true, false, false);
         //debug
         //console.log("Player has moved, now at position:" + playerPosition);
         direction = "east";
         printResult(direction);
         
         return playerPosition;
      }
   }
}
function moveSouth(position){
   playerPosition = position;
   //debug
   //console.log("Attempting to move South, player's current position is: " + playerPosition);
   check_for_path(position, false, false, true, false);
   //debug
   //console.log("Player has moved, now at position:" + playerPosition);
   direction = "south";
   printResult(direction);
   
   return playerPosition;
}
function moveWest(position){
   if(progress <= 1){
      story.append("<p class='storyline'>As you start to head back into the station out of the airlock hatch you see your boss standing outside and decide you better do your work.</p>");
   } else{
      playerPosition = position;
      //debug
      //console.log("Attempting to move West, player's current position is: " + playerPosition);
      check_for_path(position, false, false, false, true);
      //debug
      //console.log("Player has moved, now at position:" + playerPosition);
      direction = "west";
      printResult(direction);
      
      return playerPosition;
   }
}

function locationDescription(){
   $.getJSON("gameplay.json", function(result){
      if(playerPosition == 1){
         surveyRoom1(result);
      } else if(playerPosition == 2){
         surveyRoom2(result);
      } else if(playerPosition == 3){
         surveyRoom3(result);
      }else if(playerPosition == 4){
         surveyRoom4(result);
      } else if(playerPosition == 5){
         surveyRoom5(result);
      } else if(playerPosition == 6){
         surveyRoom6(result);
      }
   });
}
function surveyRoom1(result){
   if(inventory.includes("keycard")){
      story.append("<p class='storyline'>" + result.rooms["room"+playerPosition+"b"] + "</p>");
   } else{
      story.append("<p class='storyline'>" + result.rooms["room"+playerPosition] + "</p>");
      story.append("<p class='storyline'>" + result.rooms["room"+playerPosition+"a"] + "</p>");
      progress++;
   }
}
function surveyRoom2(result){
   if(playerPosition == 2 && progress == 3){
      story.append("<p class='storyline'>" + result.rooms["room"+playerPosition] + "</p>");
      story.append("<p class='storyline'>" + result.rooms["room"+playerPosition+"a"] + "</p>");
      progress++;
      console.log(progress);
   } else{
      story.append("<p class='storyline'>" + result.rooms["room"+playerPosition] + "</p>");
   }
}
function surveyRoom3(result){
   story.append("<p class='storyline'>" + result.rooms["room"+playerPosition] + "</p>");
}
function surveyRoom4(result){
   if(playerPosition == 4 && progress == 2){
      story.append("<p class='storyline'>" + result.rooms["room"+playerPosition] + "</p>");
      story.append("<p class='storyline'>" + result.rooms["room"+playerPosition+"a"] + "</p>");
      progress++;
      console.log(progress);
   } else{
      story.append("<p class='storyline'>" + result.rooms["room"+playerPosition] + "</p>");
   }
}
function surveyRoom5(result){
   if(playerPosition == 5 && progress == 2){
      story.append("<p class='storyline'>" + result.rooms["room"+playerPosition] + "</p>");
      story.append("<p class='storyline'>" + result.rooms["room"+playerPosition+"a"] + "</p>");
      progress++;
      console.log(progress);
   } else{
      story.append("<p class='storyline'>" + result.rooms["room"+playerPosition] + "</p>");
   }
}
function surveyRoom6(result){
   story.append("<p class='storyline'>" + result.rooms["room"+playerPosition] + "</p>");
}

function check_for_path(position, north, east, south, west){
    blocked = false;
    playerPosition = position;
    roomCheck = fnstring + playerPosition;
    switch(roomCheck){
        case "room1": room1(north, east, south, west); break;
        case "room2": room2(north, east, south, west); break;
        case "room3": room3(north, east, south, west); break;
        case "room4": room4(north, east, south, west); break;
        case "room5": room5(north, east, south, west); break;
        case "room6": room6(north, east, south, west); break;
    }
    checkIfBlocked(position, blocked);
    return playerPosition, blocked;
    
}
function checkIfBlocked(position, blocked){
   if(blocked === true){
        playerPosition = position;
        blocked = true;
        return playerPosition, blocked;
    }
    else{
        blocked = false;
        return playerPosition, blocked;
    }
}

function room1(north, east, south, west){
    if(playerPosition === 1){
        if(north === true){ //move to room 2
           playerPosition = 2;
           return playerPosition;
        } else if(east === true){ //move to room 3
           playerPosition = 3;
        }else if(south === true){ //move to room 4
            if(inventory.includes("keycard")){
               playerPosition = 4;   
            }
            else{
               blocked = true;
            }
        }else if(west === true){ //move to room 5
           playerPosition = 5;
        }
    }
}
function room2(north, east, south, west){
    if(playerPosition === 2){
        if(north === true){ //move to room 2
           blocked = true;
        } else if(east === true){ //move to room 3
           blocked = true;
        }else if(south === true){ //move to room 4
           playerPosition = 1;
        }else if(west === true){ //move to room 5
           blocked = true;
        }
    }
}
function room3(north, east, south, west){
    if(playerPosition === 3){
        if(north === true){ //move to room 2
           blocked = true;
        } else if(east === true){ //move to room 3
           playerPosition = 6;
        }else if(south === true){ //move to room 4
           blocked = true;
        }else if(west === true){ //move to room 5
           playerPosition = 1;
        }
    }
}
function room4(north, east, south, west){
    if(playerPosition === 4){
        if(north === true){ //move to room 2
           playerPosition = 1;
        } else if(east === true){ //move to room 3
           blocked = true;
        }else if(south === true){ //move to room 4
           blocked = true;
        }else if(west === true){ //move to room 5
           blocked = true;
        }
    }
}
function room5(north, east, south, west){
    if(playerPosition === 5){
        if(north === true){ //move to room 2
           blocked = true;
        } else if(east === true){ //move to room 3
           playerPosition = 1;
        }else if(south === true){ //move to room 4
           blocked = true;
        }else if(west === true){ //move to room 5
           blocked = true;
        }
    }
}
function room6(north, east, south, west){
   if(playerPosition === 6){
      if(north === true){ //move to room 2
         blocked = true;
      } else if(east === true){ //move to room 3
         blocked = false;
      }else if(south === true){ //move to room 4
         blocked = true;
      }else if(west === true){ //move to room 5
         playerPosition = 3;
      }
   }
}



function printResult(direction){
   $.getJSON("gameplay.json", function(result){  
      if(direction == "north"){
         if(blocked == true){
            story.append("<p class='storyline'>" + result.movement.north.failure + "</p>");
         }else{
            story.html("<p class='storyline'>" + result.movement.north.success + "</p>");
            locationDescription();
         }
      } else if(direction == "south"){
         if(playerPosition == 1 && !inventory.includes("keycard")){
            story.append("<p class='storyline'>" + result.movement.south.failureCC + "</p>");
         }
         else{
            if(blocked == true){
               story.append("<p class='storyline'>" + result.movement.south.failure + "</p>");
            }else{
               story.html("<p class='storyline'>" + result.movement.south.success + "</p>");
               locationDescription();
            }
         }
      } else if(direction == "east"){
         if(blocked == true){
            story.append("<p class='storyline'>" + result.movement.east.failure + "</p>");
         }else{
            story.html("<p class='storyline'>" + result.movement.east.success + "</p>");
            locationDescription();
         }
      } else if(direction == "west"){
         if(blocked == true){
            story.append("<p class='storyline'>" + result.movement.west.failure + "</p>");
         }else{
            story.html("<p class='storyline'>" + result.movement.west.success + "</p>");
            locationDescription();
         }
      }
   });   
}

