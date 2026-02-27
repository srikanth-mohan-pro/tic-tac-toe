const player1=document.getElementById("player-1");
const player2=document.getElementById("player-2");
const grid=document.querySelector(".board");
const start=document.getElementById("submit");
const startScreen=document.getElementsByClassName("start-screen")[0];
const gameScreen=document.getElementsByClassName("game-screen")[0];
const resetbtn=document.querySelector(".reset");
const msg=document.querySelector(".message");
const patterns=[
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
];
let player="X";
let gameactive=true;
function addmessage(){
    const name1=player1.value||"X";
    const name2=player2.value||"O";
    if(player==="X")
        {msg.textContent=name1+", you're up";
        }
    else{
        msg.textContent=name2+", you're up";
    }
}
start.addEventListener("click",function(){
   
    startScreen.style.display="none";
    gameScreen.classList.add("active");
    addmessage();
});

function checkWin(){
   for(let combo of patterns){
    const winning=combo.every(id=>{
        return document.getElementById(id).textContent===player;
    });
    if(winning){
        return combo;
    }
   }
   return null;
} 

function showWinner(p){
     const name1=player1.value||"X";
    const name2=player2.value||"O";
    if(p==="X")
        {msg.textContent=name1+" congratulations you won!";
        }
    else{
        msg.textContent=name2+", congratulations you won!";
    }
    msg.classList.add("win");
    resetbtn.style.display="block";
}
resetbtn.addEventListener("click",function(){
    document.querySelectorAll(".cell").forEach(cell=>{
        cell.textContent="";
        cell.classList.remove("winner-cell");
    });
    gameactive=true;
    player="X";
    msg.classList.remove("win");
    addmessage();

    resetbtn.style.display="none";
});
function highlight(w){
    w.forEach(id=>{
        document.getElementById(id).classList.add("winner-cell");
    });
}
grid.addEventListener("click",function(e){
    if(!gameactive) return;
    if(!e.target.classList.contains("cell"))  return;
    if(e.target.textContent!=="") return; 
    const cell=e.target;
    cell.textContent=player;
    const w=checkWin();
    if(w){
        gameactive=false;
        highlight(w);
        showWinner(player);
        return;
    }

    player= player==="X"?"O":"X";
    addmessage();
});

