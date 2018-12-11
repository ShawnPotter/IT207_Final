var startButton = $("#startBtn");
var actionButton = $("#actionBtn");
var restartButton= $("#restartBtn");
var instructions= $("#instructions");
var story = $("#story");
var choice = $("#choice");
var progress = 0;
var chapter = "";
var username = "";

$(document).ready(function(){
   disableAll();
   defaultInstructions();
});