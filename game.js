
const buttonColours = ["red", "blue", "green", "yellow"];//3
let gamePattern = [];//5
const userClickedPattern = [];
let started = false;
let level = 0;

// a jQuery method detect when a keyboard key has been pressed
$(document).keypress(function(){
    if(!started){
        $("h1").text("level " + level);
        nextSequence();
        started = true;
    }
});

// ataches an event handler in jQuery for any button with the class of .btn to store the id  of the button
$(".btn").click(function(){
    
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);//Add user chosen color to the empty clickedpatern array array

    //when a user clicks on a button, the corresponding sound should be played
    playSound(userChosenColour);
    // a callback Function that takes whatever button the user has clicked as argument and plays the sound

    // a callback function to add and remove the "pressed" class
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1); // Pass the index of the last answer
    console.log(userClickedPattern);
});

// a function to check the gameplay()
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
  
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");


        startOver();
    }
}
 // 1
 function nextSequence(){
   level++;// increase the level by 1
   $("h1").text("level " + level);// updates the value of the increased level in the h1
   

   //2 // created a random number from 0- 3
    let randomNumber = Math.floor(Math.random() * 4); 
   //4 //used that random number to randomly get color index from the array of colours
    let randomChosenColour = buttonColours[randomNumber];

    // added the random colour to the empty gane patter array
    gamePattern.push(randomChosenColour);//6

    //got the random button clicked an added an animation
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  
playSound(randomChosenColour);

 }

// I created a function that takes the name as parameter. and the function enables the playing of the sounds
 function playSound(name){
    let audio = new Audio(name+".mp3");
    audio.play();
 }

 function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed"); // I added the pressed class to the clicked button

    // Remove the pressed class after 0.1second
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
 }

 

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
