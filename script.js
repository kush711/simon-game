

const botBtn=document.getElementById("player2-bot");
const friendBtn=document.getElementById("player2-friend");
const player2BtnField=document.getElementById("player2-btn");

let checkMatrix=[[0,0,0],[0,0,0],[0,0,0]];
const turnSymbol=['O','X'];

const infoPlayer=document.getElementById("info-player");
const infoSymbol=document.getElementById("info-symbol");

const gameBox=document.querySelectorAll(".game-box");
const gameField=document.getElementById("game-field");

const player2=[botBtn,friendBtn];
let symbol='O';

const resetBtn=document.getElementById("reset-btn");

player2BtnField.addEventListener("click",(event)=>{
    if(!event.target.classList.contains("player-btn-checked")){
        friendBtn.classList.toggle("player-btn-checked");
        botBtn.classList.toggle("player-btn-checked");
    }
});

function moveUpdate(coordX,coordY){
    let matrixValue=(symbol==turnSymbol[0])?-1:1;

    if(checkMatrix[coordY][coordX]!=0){
        return;
    }
    checkMatrix[coordY][coordX]=matrixValue;

    gameBox.forEach((ele)=>{
        if(ele.classList.contains(`box-coord-${coordY+1}${coordX+1}`)){
            ele.classList.add(`box-${symbol}`);
            ele.innerText=`${symbol}`;

        }
    });
            symbol=turnSymbol[(symbol==turnSymbol[0])?1:0];

            infoPlayer.innerText=`Turn of Player ${turnSymbol.indexOf(symbol)+1}`;
            infoSymbol.innerText=`Turn of ${symbol}`;
       

    if(checkWinner(coordX,coordY)){
        winner(coordX,coordY);
    }
}

function checkWinner(coordX,coordY){
    let checkValue=checkMatrix[coordY][coordX];
    
    for (let i=0;i<3;i++){
        if(checkValue!=checkMatrix[coordY][i])
            break;
        if(i==2)
            return true;
        
        }

    for (let i=0;i<3;i++){
        if(checkValue!=checkMatrix[i][coordX])
            break;
        if(i==2)
            return true;
            
        }   
        
    if(coordX==coordY){
        for(let i=0;i<3;i++){
            if(checkValue!=checkMatrix[i][i])
                break;
            if(i==2)
                return true;
        }
    }

    if(coordX+coordY==2){
        for(let i=0;i<3;i++){
            if(checkValue!=checkMatrix[i][2-i])
                break;
            if(i==2)
                return true;
        }
    }
    
    return false;

}

function celebrate() {
    confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 }
    });
}

function winner(coordX,coordY){
    let winner=(checkMatrix[coordY][coordX]==1)?'X':'O';     
    infoPlayer.innerText="Winner is...";
    infoSymbol.innerText=`Player ${turnSymbol.indexOf(winner)+1}`;
    


    if(winner=='O'|| (winner!='O' && friendBtn.classList.contains("player-btn-checked")))
        celebrate();

    gameField.addEventListener("click",()=>{
        reset();
    })
}

gameField.addEventListener("click",(event)=>{
    let coordX=-1;
    let coordY=-1;

    for(let i=1;i<=3;i++){
        for(let j=1;j<=3;j++){
            if(event.target.classList.contains(`box-coord-${i}${j}`)){
                coordX=j-1;
                coordY=i-1;
            }
        }
    }

    moveUpdate(coordX,coordY);

    if(symbol=='X'  && botBtn.classList.contains("player-btn-checked")){
        setTimeout(botTurn,1000);
    }
});

resetBtn.addEventListener("click",()=>{
    reset();
});


function reset(){
    location.reload();
}

function botTurn(){
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){

        if( checkMatrix[i][(j+1)%3]==checkMatrix[i][(j+2)%3] && checkMatrix[i][(j+1)%3]!=0 && checkMatrix[i][j]==0){
            moveUpdate(j,i);
            return;
        }
    }
    }

    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){

        if( checkMatrix[(j+1)%3][i]==checkMatrix[(j+2)%3][i] && checkMatrix[(j+1)%3][i]!=0 && checkMatrix[j][i]==0){
            moveUpdate(i,j);
            return;
        }
    }
    }

    for(let j=0;j<3;j++){
        if(checkMatrix[(j+1)%3][(j+1)%3]==checkMatrix[(j+2)%3][(j+2)%3] && checkMatrix[(j+1)%3][(j+1)%3]!=0 && checkMatrix[j][j]==0){
            moveUpdate(j,j);
            return;
        }
    }

    for(let i=0;i<3;i++){
        if(checkMatrix[(i+1)%3][(4-i)%3]==checkMatrix[(i+2)%3][(3-i)%3] && checkMatrix[(i+1)%3][(4-i)%3]!=0 && checkMatrix[i][2-i]==0){
            moveUpdate(2-i,i);
            return;
        }
    }

let i=0;
while(i<36){
    let Xcoord=Math.floor(Math.random() *3);
    let Ycoord=Math.floor(Math.random() *3);

    if((Xcoord+Ycoord)%2==0 && checkMatrix[Ycoord][Xcoord]==0){
        moveUpdate(Xcoord,Ycoord);
        return;
    }
    i++;
}
    

    let emptyCells = [];
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            if (checkMatrix[y][x] == 0) {
                emptyCells.push({ x, y });
            }
        }
    }

    if (emptyCells.length > 0) {
        let randomMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        moveUpdate(randomMove.x, randomMove.y);

    }
}