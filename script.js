const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const start = document.querySelector('.start');
const gameOver = document.querySelector('.game-over');

const audioStart = new Audio('./sound/audio_theme.mp3');
const audioGameOver = new Audio('./sound/audio_gameover.mp3');

let loop;

const startGame = () => {
    pipe.classList.add("pipe-animation");
    start.style.display = 'none';

    // Reinicia o loop de verificação de colisão
    loop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = parseInt(window.getComputedStyle(mario).bottom.replace("px", ""));

        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;

            mario.src = "/image/game-over.png";
            mario.style.width = '75px';
            mario.style.marginLeft = '50px';

            audioStart.pause();
            audioGameOver.play();

            gameOver.style.display = 'flex';

            clearInterval(loop);
        }
    }, 10);

    // Inicia o áudio
    audioStart.play();
};

const restartGame = () => {
    // Reseta o estado do jogo
    pipe.classList.remove("pipe-animation");
    pipe.style.animation = 'none';
    pipe.style.left = '';
    pipe.offsetWidth; // Força reflow para reiniciar a animação

    mario.src = '/image/mario.gif';
    mario.style.width = '150px';
    mario.style.marginLeft = '0px';
    mario.style.animation = '';
    mario.style.bottom = '0px';

    gameOver.style.display = 'none';
    start.style.display = 'none';

    // Reseta os áudios
    audioGameOver.pause();
    audioGameOver.currentTime = 0;
    audioStart.currentTime = 0;

    // Reinicia o jogo
    startGame();
};

const jump = () => {
    mario.classList.add('jump');
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 800);
};

document.addEventListener("keypress", e => {
    if (e.key === 'Enter') {  // Usar Enter para iniciar o jogo
        startGame();
    }
    if (e.key === ' ') {  // Usar Espaço para pular
        jump();
    }
});

document.addEventListener("touchstart", () => {
    jump();
});

document.addEventListener("keydown", jump);
