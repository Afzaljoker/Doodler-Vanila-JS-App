const grid = document.querySelector('.grid');
const doodler = document.createElement('div');
let doodlerLeftSpace = 50;
let startPoint = 150;
let doodlerBottomSpace = startPoint;
let isGamerOver = false;
let platformCount = 5;
let platforms = [];
let upTimerId;
let downTimerID;
let isJumping = true;
let isGoingLeft = false;
let isGoingRight = false;
let leftTimerID;
let rightTimerID;
let score = 0;




const createDoodler = () => {
    grid.appendChild(doodler);
    doodler.classList.add('doodler');
    doodlerLeftSpace = platforms[0].left;
    doodler.style.left = doodlerLeftSpace + 'px';
    doodler.style.bottom = doodlerBottomSpace + 'px';
};


class Platform {
    constructor(newPlatBottom){
        this.bottom = newPlatBottom;
        this.left = Math.random() * 315;
        this.visual = document.createElement('div');

        const visual = this.visual;
        visual.classList.add('platform');
        visual.style.left = this.left + 'px';
        visual.style.bottom = this.bottom + 'px';
        grid.appendChild(visual)
    }
}

const createPlatforms = () => {
    for (let i = 0; i < platformCount; i++) {
        let platGap = 600 / platformCount; 
        let newPlatBottom = 100 + i * platGap;
        let newPlatform = new Platform(newPlatBottom);
        platforms.push(newPlatform);
        
    }
} 

const movePlatforms = () => {
    if (doodlerBottomSpace > 200) {
        platforms.forEach(platform =>  {
            platform.bottom -=4;
            let visual = platform.visual
            visual.style.bottom = platform.bottom + 'px'

            if (platform.bottom < 10) {
                let firstPlafotm = platforms[0].visual;
                firstPlafotm.classList.remove('platform');
                platforms.shift();
                score ++; 
                console.log(score);
                let newPlatform = new Platform(600);
                platforms.push(newPlatform);
            }
        })
    }
}
const jump = () => {
    clearInterval(downTimerID);
    isJumping = true;
    upTimerId = setInterval(function () {
        doodlerBottomSpace += 20;
        doodler.style.bottom = doodlerBottomSpace + 'px';
        if (doodlerBottomSpace > startPoint + 200) {
            fall();
        }
    }, 20)
}
const fall = () => {
    clearInterval(upTimerId);
    isJumping = false;
    downTimerID = setInterval(function (){
        doodlerBottomSpace -= 5;;
        doodler.style.bottom = doodlerBottomSpace + 'px';
        if (doodlerBottomSpace <= 0) {
            gameOver()
        }
platforms.forEach(platform => {
    if ((doodlerBottomSpace >= platform.bottom) &&
        (doodlerBottomSpace <= platform.bottom + 15) &&
        ((doodlerLeftSpace + 60) >= platform.left )  &&
        (doodlerLeftSpace <= (platform.left + 85)) &&
        !isJumping
){
    startPoint = doodlerBottomSpace;
    jump();
}
})

    },20)
}

const gameOver = () => {
    isGamerOver = true;
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
    grid.innerHTML = score;
    clearInterval(upTimerId);
    clearInterval(downTimerID);
    clearInterval(leftTimerID);
    clearInterval(rightTimerID);
}

const control = (e) => {
    if(e.key === "ArrowLeft"){
        moveLeft()
    }else if (e.key === "ArrowRight") {
        moveRight()
    }else if (e.key === "ArrowUp") {
        moveStraight ();
    }
}

const moveLeft = () => {
        if (isGoingRight) {
            clearInterval(rightTimerID);
            isGoingRight = false;
        }
        isGoingLeft = true;
        leftTimerID = setInterval(function () {
            if (doodlerLeftSpace >= 0) {
                doodlerLeftSpace -=5;
                doodler.style.left = (doodlerLeftSpace + 'px')
            }else moveRight()
            },30)
} 

const moveRight = () => {
    if (isGoingLeft) {
        clearInterval(leftTimerID);
        isGoingLeft = false;
    }
    isGoingRight = true;
    rightTimerID = setInterval(function (){
        if (doodlerLeftSpace <= 340) {
            doodlerLeftSpace += 5;
            doodler.style.left = doodlerLeftSpace + 'px'
        }else moveLeft()
    }, 30)
}

const moveStraight = () => {
    isGoingLeft = false;
    isGoingRight = false;
    clearInterval(rightTimerID);
    clearInterval(leftTimerID);
}

const start = () => {
    if (!isGamerOver) {
        createPlatforms();
        createDoodler();
        setInterval(movePlatforms,30);
        jump();
        document.addEventListener('keyup', control);
    }
}

//nneda button
start();