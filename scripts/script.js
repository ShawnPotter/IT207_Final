//set globals for all script files

//player's position in the dungeon
var playerPosition = 3;

//player is dead or alive
var playerDead = false;

//player's progress in the game
var progress = 0;
var playerWins = false;
var playerLoses = false;
var playEpilogue = false;

//true if the player's path is blocked otherwise false
var blocked;

//button jQuery assignments
var northButton = $("#northBtn");
var eastButton = $("#eastBtn");
var southButton = $("#southBtn");
var westButton = $("#westBtn");
var startButton = $("#startBtn");
var actionButton = $("#actionBtn");
var restartButton = $("#restartBtn");

//the instruction and story output divs
var instructions= $("#instructions");
var story = $("#story");

//Will not work after movement buttons are pushed
//supposed to keep story div scolled down when adding new text
/*
function scrollToBottom(){
   story.scrollTop(story[0].scrollHeight);
}
*/

//player's inventory
var inventory = [];

//items
var airlockItem = "spacesuit";
var outsideItem = "junk";
var cafeteriaItem = "spoon";
var barracksItem = "keycard";

function search(room){
   if (room == 3 && progress == 0){
      inventory.push(airlockItem);
      story.append("<p class='storyline'>You take a spacesuit and put it on.</p>");
      progress++;
   }
   if (room == 6 && progress == 1){
      inventory.push(outsideItem);
      story.append("<p class='storyline'>You activate your magnetic boots and clean up some junk from the outside of the station's hull. An hour later you are finished. While not spotless the station is nonetheless clean. It's time to head back inside.</p>");
      progress++;
   }
   if(room == 5){
      inventory.push(cafeteriaItem);
      story.append("<p class='storyline'>You search the cafeteria, more for food than people, but find nothing except a spoon. You pocket it for later.</p>");
      progress++;
   }
   if(room == 2){
      inventory.push(barracksItem);
      story.append("<p class='storyline'>You look through your footlocker and find that missing keycard. You can get into the command center now.</p>");
      
   }  
}
function runClimax(){
   $.getJSON("gameplay.json", function(result){
      //pull from the JSON 5 times to get the climatic text.
      for(var i = 0; i < 5; i++){
         if (i === 0){
            story.html("<p class='storyline'>" + result.climax['part'+i] + "</p>");
         } else if(i === 3){
            if(inventory.includes("spoon")){
               story.append("<p class='storyline'>" + result.climax['part'+i+'a'] + "</p>");
            } else{
               story.append("<p class='storyline'>" + result.climax['part'+i+'b'] + "</p>");
            }
         } else{
            story.append("<p class='storyline'>" + result.climax['part'+i] + "</p>");
         }
      }
   });
   instructions.html("<p class='directions'>You can either fight with the action button or you can attempt to run</p>");
   playEpilogue = true;
   return playEpilogue;
}
function runIntro(){
   $.getJSON("gameplay.json", function(result){
      //pull from the JSON 5 times to get the opening text.
      for(var i = 0; i < 5; i++){
          if (i === 0){
              story.html("<p class='storyline'>" + result.introduction['part'+i] + "</p>");
          }else{
              story.append("<p class='storyline'>" + result.introduction['part'+i] + "</p>");
          }
      }
   });
   //change the instructions div
   instructions.html("<p class='directions'>Use the arrow buttons to move around" +
                     " or use the action button to perform an action</p>");
}

function epilogue(){
    $.getJSON("gameplay.json", function(result){
        if(playerWins==true){
            story.append("<p class='storyline'>" + result.epilogue.success + "</p>");
        }else if(playerLoses==true){
            story.append("<p class='storyline'>" + result.epilogue.failure + "</p>");
        }
    });
    enableRestart();
}
function finaleCombat(){
    if(inventory.includes("spoon")){
        story.html("<p class='storyline'>You throw the spoon at the monster and it goes straight into it's mouth.</p>"+
                   "<p class='storyline'>Wasting your one single weapon you assume the fetal position and wait for the end.</p>"+
                   "<p class='storyline'>Instead you hear choking, apparently the entire monster isn't made of sludge.</p>");
        playerWins = true;
        playerLoses = false;
        console.log("Player wins is: "+playerWins+" & Player loses is: "+playerLoses);
        
    } else{
        story.html("<p class='storyline'>You attempt to throw a haymaker, or your poor attempt at one, at the monster.</p>"+
                   "<p class='storyline'>Your fist gets stuck in the sludge that makes up the monster's body.</p>"+
                   "<p class='storyline'>As the monster starts to devour you, you wonder why attempting to punch it was a good idea.</p>");
        playerWins = false;
        playerLoses = true;
        console.log("Player wins is: "+playerWins+" & Player loses is: "+playerLoses);
    }
    instructions.html("<p class='directions'>Press the Action Button to access the Epilogue.</p>");
    return playerLoses, playerWins;
}
function finaleRunning(){
    if(inventory.includes("spoon")){
        story.html("<p class='storyline'>You attempt to run from the monster dropping everything in the process.</p>"+
                   "<p class='storyline'>It is no use however as the monster easily catches up to you.</p>" +
                   "<p class='storyline'>As you are devoured you realize you could have attempted to use the spoon.</p>");
        playerWins = false;
        playerLoses = true;
        console.log("Player wins is: "+playerWins+" & Player loses is: "+playerLoses);
    } else{
        story.html("<p class='storyline'>You attempt to run from the monster dropping everything in the process.</p>"+
                 "<p class='storyline'>It is no use however as the monster easily catches up to you.</p>" +
                 "<p class='storyline'>As you are devoured you realize you wish you had found something to use against it.</p>");
        playerWins = false;
        playerLoses = true;
        console.log("Player wins is: "+playerWins+" & Player loses is: "+playerLoses);
    }
    instructions.html("<p class='directions'>Press the Action Button to access the Epilogue.</p>");
    return playerLoses, playerWins;
}