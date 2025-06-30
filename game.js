
// var buttonColours = ["red", "blue", "green", "yellow"];

// var gamePattern = [];
// var userClickedPattern = [];

// var started = false;
// var level = 0;

// $(document).keydown(function () {
  

//   if (!started) {
  

//     $("#level-title").text("Level " + level);

//     nextSequence();
//     started = true;
//   }
// });


// $(".btn").click(function() {

//   var userChosenColour = $(this).attr("id");
//   userClickedPattern.push(userChosenColour);

//   playSound(userChosenColour);
//   animatePress(userChosenColour);

//   checkAnswer(userClickedPattern.length-1);
// });

// $("#start-btn").click(function () {

//   if (!started) {
//     $("#level-title").text("Level " + level);
//     nextSequence();
//     started = true;
//   }
// });


// function checkAnswer(currentLevel) {


//     if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

//       console.log("success");

//       if (userClickedPattern.length === gamePattern.length){
//         setTimeout(function () {
//           nextSequence();
//         }, 1000);
//       }

//     } else {

//       console.log("wrong");

//       playSound("wrong");

//       $("body").addClass("game-over");
//       setTimeout(function () {
//         $("body").removeClass("game-over");
//       }, 200);

//       $("#level-title").text("Game Over, Press Any Key to Restart");

     
//       startOver();
//     }

// }

// function nextSequence() {

 

//   userClickedPattern = [];
//   level++;
//   $("#level-title").text("Level " + level);

//   var randomNumber = Math.floor(Math.random() * 4);
//   var randomChosenColour = buttonColours[randomNumber];
//   gamePattern.push(randomChosenColour);

//   $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
//   playSound(randomChosenColour);
// }


// function playSound(name) {
//   var audio = new Audio("sounds/" + name + ".mp3");
//   audio.play();
// }

// function animatePress(currentColor) {
//   $("#" + currentColor).addClass("pressed");
//   setTimeout(function () {
//     $("#" + currentColor).removeClass("pressed");
//   }, 100);
// }


// function startOver() {

//   level = 0;
//   gamePattern = [];
//   started = false;
// }





var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keydown(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  console.log("📥 User clicked pattern:", userClickedPattern);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

$("#start-btn").click(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel) {
  console.log("🧪 Checking answer at index:", currentLevel);
  console.log("👾 Game pattern:", gamePattern);
  console.log("🧍 User pattern:", userClickedPattern);

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("✅ Match at index", currentLevel);

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }

  } else {
    console.log("❌ Mismatch at index", currentLevel);
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  console.log("🎲 Random number:", randomNumber, "| 🎨 Chosen colour:", randomChosenColour);
  console.log("🧠 Updated game pattern:", gamePattern);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}




