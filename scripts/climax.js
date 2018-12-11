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