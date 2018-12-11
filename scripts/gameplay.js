var startButton = $("#startBtn");
var actionButton = $("#actionBtn");
var restartButton= $("#restartBtn");
var instructions= $("#instructions");
var username = "";
//ready the page
$(document).ready(function(){
   disableAllButStart();
   defaultInstructions();
});

//load the first instructions
function defaultInstructions(){
   instructions.html("<p class='directions'>Please click the Start Button to begin the game</p>");    
}

//disable the action button and restart button
function disableActionAndStart(){
    actionButton.prop("disabled", true);
    startButton.prop("disabled", true);
}
//disable the start button
function disableStart(){
    startButton.prop("disabled", true);
}
//enable the start button
function enableStart(){
    startButton.prop("disabled", false);
}
//disable just the choices
function disableAction(){
    actionButton.prop("disabled", true);
}
//enable the restart button
function enableRestart(){
   actionButton.prop("disabled", true);
   restartButton.prop("disabled", false);
   northButton.prop("disabled", true);
   westButton.prop("disabled", true);
   eastButton.prop("disabled", true);
   southButton.prop("disabled", true);
   startButton.prop("disabled", true);
}
function disableAllButStart(){
    actionButton.prop("disabled", true);
    restartButton.prop("disabled", true);
    northButton.prop("disabled", true);
    westButton.prop("disabled", true);
    eastButton.prop("disabled", true);
    southButton.prop("disabled", true);
}
function enableActionAndMovement(){
   actionButton.prop("disabled", false);
   northButton.prop("disabled", false);
    westButton.prop("disabled", false);
    eastButton.prop("disabled", false);
    southButton.prop("disabled", false);
}

$(function(){
   //load the JSON
   startButton.on("click", function(){
     //enable choices and empty out story & choice divs
     enableActionAndMovement();
     story.empty();
     runIntro();
     disableStart();
   });
     
  actionButton.on("click", function(){
     search(playerPosition);
     console.log("Progress level at: " + progress);
     if(playerPosition==4 && progress <= 5 && !playEpilogue){
        runClimax();
        progress = 6;
        //debug
        console.log("Progress level at: " + progress);
        return progress;
     }else if(progress==6){
        finaleCombat();
        progress = 7;
        return progress;
     }else if(progress == 7){
        epilogue();
     }
  });
  //reset button resets the webpage back to how it worked when first loaded
  restartButton.on("click", function(){
     window.location.reload();
  });
  function runChecks(){
     if(playerDead == true){
        console.log("Not Dead");
        enableRestart();
     } else{
        console.log("Not Dead");
     }
  }
  $("button").on("click", runChecks);
});



