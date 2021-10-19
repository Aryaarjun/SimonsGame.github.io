var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var start = false;
var level = 0;


//detect any key is pressed for the first time

$(document).keypress(function () {
    if(!start){
        $("#level-title").html("level "+level);
    
        nextSequence();
        start=true;
    }
});

//detecting button clicked
$(".btn").on("click",function(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  
  checkAnswer(userClickedPattern.length-1);
 
})
 
//function that check answer

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
      
    }
  }else{
    playSound("wrong");
    setTimeout(function() {
      $("body").addClass("game-over");
    },200);
   $("#level-title").html("Game Over, Press Any Key to Restart");
   startOver();
  }
}



function nextSequence(){
  userClickedPattern=[];
    level++;

    $("#level-title").html("level "+level);
    
    var randomNum=Math.random()*4;
    randomNum=Math.floor(randomNum);
    var randomButtonChosen=buttonColors[randomNum];
    gamePattern.push(randomButtonChosen);
  
    $("#"+randomButtonChosen).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomButtonChosen);

   
}

function animatePress(currentColor) {
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
      $("#"+ currentColor).removeClass("pressed");
  },100);
}

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}



function startOver(){
  level=0;
  gamePattern=[];
  start=false;
}


