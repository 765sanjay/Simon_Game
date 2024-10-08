var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var clickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  var chosenColor = $(this).attr("id");
  clickedPattern.push(chosenColor);
  console.log(clickedPattern);
  playSound(chosenColor);
  animateButton(chosenColor);

  checkAnswer(clickedPattern.length-1);
});

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === clickedPattern[currentLevel]){
    if(gamePattern.length === clickedPattern.length)
    setTimeout(function(){
  nextSequence()},1000);
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

    
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
    startOver();
  }

}

function nextSequence(){
  clickedPattern = [];
  level++;
  $('#level-title').text("Level "+level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);
  
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animateButton(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
