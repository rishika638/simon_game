


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



window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (window.SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.continuous = true;

  recognition.start();

  recognition.onstart = function () {
    console.log("🎙️ Voice recognition started.");
    $("#mic-status").text("🎤 Listening...");
  };

  recognition.onend = function () {
    console.log("🔁 Restarting voice recognition...");
    $("#mic-status").text("🔇 Restarting mic...");
    recognition.start(); // Auto-restart
  };

  recognition.onresult = function (event) {
    const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
    console.log("🎤 Voice input:", transcript);

    if (buttonColours.includes(transcript)) {
      userClickedPattern.push(transcript);
      console.log("📥 User spoke pattern:", userClickedPattern);

      playSound(transcript);
      animatePress(transcript);
      checkAnswer(userClickedPattern.length - 1);
    } else {
      console.log("🚫 Invalid color spoken:", transcript);
    }
  };

  recognition.onerror = function (event) {
    console.error("❌ Voice recognition error:", event.error);
    $("#mic-status").text("❌ Mic error");
  };
} else {
  alert("Speech Recognition not supported in this browser. Try using Chrome.");
}




