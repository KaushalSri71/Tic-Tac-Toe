let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");


let turnO = true; 
let count = 0; 


const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];


const Xaudio = new Audio("./Sounds/Player X2.mp3");
const Oaudio = new Audio("./Sounds/Player O.wav");
const Winaudio = new Audio("./Sounds/Winner.wav");
const Win2audio = new Audio("./Sounds/Cheer.wav");
const Newaudio = new Audio("./Sounds/NewGame.wav");
const Backaudio = new Audio("./Sounds/Game-Background.wav");  



const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  Newaudio.play();
  Win2audio.pause();
  msgContainer.classList.add("hide");
  
};
const NewGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  Newaudio.play();
  msgContainer.classList.add("hide");
 
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
     
      box.innerText = "O";
      turnO = false;
      Oaudio.play();
      Backaudio.play();
     
    } else {
      
      box.innerText = "X";
      turnO = true;
      Xaudio.play();
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();
    

    if (count === 9 && !isWinner) {
      gameDraw();
      
    }
   
  });
});


const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
  
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  Winaudio.play();
  Win2audio.play();
  Backaudio.pause();
  disableBoxes();


};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);




