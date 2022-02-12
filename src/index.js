/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/
const textCenter = document.querySelector('.text-center');

const container = document.querySelector('.container');
container.style.heigth = 'auto'
container.style.width = '80%';
container.style.margin = '0 auto';
container.style.position = 'relative';

const playButton = document.createElement('button');
container.insertAdjacentElement('afterend', playButton);
playButton.style.width = 'auto';
playButton.innerText = 'Play/Pause';
playButton.style.background = 'gray';
playButton.style.margin = '10px';


const muteButton = document.createElement('button');
container.insertAdjacentElement('afterend', muteButton)
muteButton.style.width = 'auto';
muteButton.innerText = 'Mute/Unmute';
muteButton.style.background = 'gray';
muteButton.style.margin = '10px';



const video = document.getElementById('video');
video.controlsList.add('nodownload');
video.disablePictureInPicture = 'true';
video.controls = true;


playButton.addEventListener('click', handlePlayButton);

const playContainer = document.createElement('div');
playContainer.style.height = '80%';
playContainer.style.width = '100%';
playContainer.style.position = 'absolute';
playContainer.style.top = '0';
playContainer.style.zIndex = '1';
playContainer.style.opacity = '0';

container.appendChild(playContainer);

video.addEventListener('click', handlePlayButton);
// video.muted = true; 
// playVideo();

muteButton.addEventListener('click', muteFunction);

async function playVideo(){
    try {
        await video.play();
        video.classList.add('playing');
    } catch (error) {
        video.classList.remove('playing');
        console.log('Relax, nothing happenned.');
    }
}

function handlePlayButton(){
    if (video.paused) {
        playVideo();
    } else {
        video.pause();
        video.classList.remove('playing');
    }
}

function muteFunction(){
    if (video.muted) {
        video.muted = false;
    } else {
        video.muted = true; 
    }
}

//1. Hacer lo mismo con el sonido
//2. Usan un evento diferente a click, usar play
//3. Poner al final el source para otros formatos.
