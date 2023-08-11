var gamePattern=[];
var userClickedPattern=[];
var level=0;
var gameStarted=false;
var buttonColours=["red","blue","green","yellow"];

$(document).keypress(function(){
    if(!gameStarted)
    {
        $("#level-title").text("Level "+ level);
        nextSequence();
        gameStarted=true;
    }
});

$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});
function nextSequence()
{
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+ level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}
function playSound(name)
{
    var audio= new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColour)
{
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}
function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel])
    {
        if(gamePattern.length==userClickedPattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press any key to restart!!");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}
function startOver(){
    gameStarted=false;
    level=0;
    gamePattern=[];
}
