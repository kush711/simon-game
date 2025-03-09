var userClickedPattern=[];

var level=0;

let gamePattern=[];
var buttonColors=["red","blue","green","yellow"];





function playSound(name){
    var audio=new Audio("./sounds/"+name+".mp3");
    audio.play();
}


function animatePress(currentColor){

    $("#"+currentColor).addClass("pressed");

    playSound(currentColor);

    setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
    },100);
}

function nextSequence(){
    var randomNumber=Math.floor(Math.random()*4);

    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeOut(50).fadeIn(50);
    playSound(randomChosenColor);

    

    return;
}


function restart(){
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },1000);
    level=0;
    gamePattern.length=0;
    userClickedPattern.length=0;
    var audio=new Audio("./sounds/wrong.mp3");
    audio.play();

    index=0;
    $("h1").text("GAME OVER! press any key to restart");
    gameStarted=false;
    return;
}

function checkAnswer(currentLevel){
    for(let i=0;i<=currentLevel;i++){

        if(userClickedPattern[i]!==gamePattern[i]){
            restart();
            return ;


        }
    }
            
            
            return;
}

var gameStarted=false;


$(document).keydown(function(){

    if(!gameStarted){

        $("h1").text("level "+ ++level);
    nextSequence();
    gameStarted=true;

}});



    
let index=0;
    $(".btn").click(function(){

    let chosenID=$(this).attr("id");

    animatePress(chosenID);

    userClickedPattern.push(chosenID);
    
   
    checkAnswer(index++);
        if((index==level)&&(index!=0)){

            $("h1").text("level "+ ++level );
            setTimeout(nextSequence(),8000);
            userClickedPattern.length=0;
            index=0;
        }


    });
