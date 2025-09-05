let btnsClass = ["box1", "box2", "box3", "box4"];

let gameStart = false;
let level = 0;

document.addEventListener("keypress", function(){ //event,callback
    if(gameStart == false){
        console.log("game started..!");
        gameStart = true;
    }

    levelUp(); // function for flashing random box
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    }, 250);
}

let heading = document.querySelector('h2'); //class id elementname

let gameSeq = [];
let userSeq = [];
let para = document.createElement('h3');
para.style.margin = "0px";
heading.insertAdjacentElement("afterend", para);  

function levelUp(){
    userSeq = [];
    level++;
    
    if(level == 1){
        para.innerText = "click the flashed button..!";
    } else if(level == 2){
        para.innerText = "repeat the pattern from start...";
    } else if(level == 3){
        para.innerText = "Nice your doing good!";
    } else if(level > 4 && level%2 == 0){
            para.innerText = "Keep going..!";
    } else{
            para.innerText = "Nice Let's goo..!";
    }

    heading.innerText = `level ${level}`;
    let ranIdx = Math.floor(Math.random() * 2);
    let ranBoxClass = btnsClass[ranIdx];
    gameSeq.push(ranBoxClass);
    console.log(gameSeq);
    let ranBox = document.querySelector('.'+ranBoxClass);
    gameFlash(ranBox);
}


function check(idx){
    if(userSeq[idx] == gameSeq[idx]){
       if(gameSeq.length == userSeq.length){
           setTimeout(levelUp(), 1500);
       } 
    } else{
        setTimeout(function(){
            heading.innerText = "GAME OVER! press any key to restart";
            heading.style.color = "black";
        }, 300);
        heading.innerText = "GAME OVER! press any key to restart";
        para.innerHTML = "";
        heading.style.color = "red";
        console.log(userSeq);
        Object
        resize();

    }
}


function buttonPress(){
    let btn = this; // which ever button calls it, this will become that..!
    userFlash(btn);
    userChoose = btn.getAttribute("id");
    userSeq.push(userChoose);
    console.log(userSeq.length-1)

    check(userSeq.length-1);
}

let btns = document.querySelectorAll('.boxes');

for(btn of btns){
    btn.addEventListener('click', buttonPress);
}

function resize(){
    gameStart = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
    heading.style.color = "black";
}