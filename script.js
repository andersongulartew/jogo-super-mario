const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

const start = document.querySelector('.start');
const gameOver = document.querySelector('.game-over');

audioStart = new Audio('./sound/audio_theme.mp3');
audioGameOver = new Audio('./sound/audio_gameover.mp3');

const startGame = ()=>{
    pipe.classList.add("pipe-animation");
    start.style.display = 'none';

    // audio
    audioStart.play();
}

const restartGame = ()=>{
    gameOver.style.display = 'none';
    mario.src= '/image/mario.gif';
    start.style.display = "none"

    audioGameOver.pause()
    audioGameOver.currentTime = 0;

    audioStart.play()
    audioStart.currentTime = 0;
};

const jump = ()=>{
    mario.classList.add('jump')
    setTimeout(()=>{
        mario.classList.remove('jump')
    },800)
}
const loop = setInterval(()=>{
        console.log("loop")

        const pipePosition = pipe.offsetLeft;
        const marioPosition = parseInt(window.getComputedStyle(mario).bottom.replace("px",""))
        console.log(marioPosition)

        if( pipePosition <= 120 && pipePosition > 0 && marioPosition < 80){
            pipe.style.animation = 'none';
            pipe.style.left =`${pipePosition}px`;

            mario.style.animation= 'none';
            mario.style.bottom = `${marioPosition}px`;

            mario.src="/image/game-over.png";
            mario.style.width = '75px';
            mario.style.marginLeft = '50px';

            audioStart.pause()
            audioGameOver.play()

            gameOver.style.display = 'flex';

            clearInterval(loop);

        }
    },10);




document.addEventListener("keypress", e => {
    const tecla = e.key;
    if(tecla === ''){
        jump()
    }
});

document.addEventListener("touchstart", e => {
    if(e.touches.length ){
        jump();
    }
});

document.addEventListener("keypress", e => {
    const tecla = e.key;
    if(tecla === ''){
        startGame()
    }
});

document.addEventListener("keydown", jump);