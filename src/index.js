/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

var supportsVideo = !!document.createElement('video').canPlayType;
if(supportsVideo){
    const videoContainer = document.getElementById('videoContainer');
    const video = document.getElementById('video');
    const videoControls = document.getElementById('video-controls');

    video.controls = false;
    videoControls.style.display = 'block';

    var playpause = document.getElementById('playpause');
    var stop = document.getElementById('stop');
    var progress = document.getElementById('progress');
    var progressBar = document.getElementById('progress-bar');
    var mute = document.getElementById('mute');
    var volinc = document.getElementById('volinc');
    var voldec = document.getElementById('voldec');
    var fullScreen = document.getElementById('fs');

    var fullScreenEnabled = !!(document.fullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitSupportFullscreen || document.webkitFullscreenEnabled || document.createElement('video').webkitRequestFullScreen);
    console.log('FullScreenEnabled:', fullScreenEnabled);
    if(!fullScreenEnabled){
        fullScreen.style.display = 'none';
    }

    playpause.addEventListener('click', handlePlayPause);
    stop.addEventListener('click', handleStop);
    mute.addEventListener('click', handleMuteUnmute);
    voldec.addEventListener('click', () => { alterVolume('-') });
    volinc.addEventListener('click', () => { alterVolume('+') });
    fullScreen.addEventListener('click', handleFullScreen);

    video.addEventListener('loadedmetadata', function(){
        progress.setAttribute('max', video.duration);
    });

    video.addEventListener('timeupdate', () => {
        progress.value = video.currentTime;
        progressBar.style.width = Math.floor((video.currentTime / video.duration)*100) + '%';
    });

    video.addEventListener('timeupdate', () => {
        if(!progress.getAttribute('max')){
            progress.setAttribute('max', video.duration);
            progress.value = video.currentTime;
        progressBar.style.width = Math.floor((video.currentTime / video.duration)*100) + '%';
        }
    });

    progress.addEventListener('click', function(e){
        var rect = this.getBoundingClientRect();
        var pos = (e.pageX - rect.left) / this.offsetWidth;
        video.currentTime = pos * video.duration;
    });

    function handlePlayPause(){
        if(video.paused || video.ended){
            video.play();
        } else {
            video.pause();
        }
    }

    function handleStop(){
        video.pause();
        video.currentTime = 0; 
        progress.value = 0;
    }

    function handleMuteUnmute(){
        video.muted = !video.muted;
    }

    function alterVolume(value){
        var currentVolume = Math.floor(video.volume * 10)/10;
        if(value === '-'){
            if(currentVolume > 0){
                video.volume -= 0.1;
                console.log(video.volume);
            }
        }
        else if(value === '+'){
            if(currentVolume < 1){
                video.volume += 0.1;
                console.log(video.volume);
            }
        }
    }

    function handleFullScreen(){
        if(isFullScreen()){
            if(document.exitFullscreen){ document.exitFullscreen()}
            else if(document.mozCancelFullScreen){ document.mozCancelFullScreen()}
            else if(document.webkitCancelFullScreen){ document.webkitCancelFullScreen()}
            else if(document.msExitFullscreen){ document.msExitFullscreen()}
            setFullScreenData(false);
        }
        else {
            if(videoContainer.requestFullscreen){videoContainer.requestFullscreen()}
            else if(videoContainer.mozRequestFullScreen){videoContainer.mozRequestFullScreen()}
            else if(videoContainer.webkitRequestFullScreen){videoContainer.webkitRequestFullScreen()}
            else if(videoContainer.msRequestFullScreen){ videoContainer.msRequestFullScreen()}
            setFullScreenData(true);
        }
    }

    function isFullScreen(){
        return !!(document.fullscreenElement || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
    }

    function setFullScreenData(state){
        videoContainer.setAttribute('data-fullscreen', !!state);
    }


    document.addEventListener('fullscreenchange', () => {
        setFullScreenData(!!(document.fullscreenElement ));
    });

    document.addEventListener('webkitfullscreenchange', () => {
        setFullScreenData(!!document.webkitIsFullScreen);
    });

    document.addEventListener('mozfullscreenchange', () => {
        setFullScreenData(!!document.msFullscreenElement);
    });

    console.log('Video is supported.');
}

// const textCenter = document.querySelector('.text-center');

// const container = document.querySelector('.container');
// container.style.heigth = 'auto'
// container.style.width = '80%';
// container.style.margin = '0 auto';
// container.style.position = 'relative';

// const playButton = document.createElement('button');
// container.insertAdjacentElement('afterend', playButton);
// playButton.style.width = 'auto';
// playButton.innerText = 'Play/Pause';
// playButton.style.background = 'gray';
// playButton.style.margin = '10px';


// const muteButton = document.createElement('button');
// container.insertAdjacentElement('afterend', muteButton)
// muteButton.style.width = 'auto';
// muteButton.innerText = 'Mute/Unmute';
// muteButton.style.background = 'gray';
// muteButton.style.margin = '10px';



// const video = document.getElementById('video');
// video.controlsList.add('nodownload');
// video.disablePictureInPicture = 'true';
// video.controls = true;


// playButton.addEventListener('click', handlePlayButton);

// const playContainer = document.createElement('div');
// playContainer.style.height = '80%';
// playContainer.style.width = '100%';
// playContainer.style.position = 'absolute';
// playContainer.style.top = '0';
// playContainer.style.zIndex = '1';
// playContainer.style.opacity = '0';

// container.appendChild(playContainer);

// video.addEventListener('click', handlePlayButton);
// // video.muted = true; 
// // playVideo();

// muteButton.addEventListener('click', muteFunction);

// async function playVideo(){
//     try {
//         await video.play();
//         video.classList.add('playing');
//     } catch (error) {
//         video.classList.remove('playing');
//         console.log('Relax, nothing happenned.');
//     }
// }

// function handlePlayButton(){
//     if (video.paused) {
//         playVideo();
//     } else {
//         video.pause();
//         video.classList.remove('playing');
//     }
// }

// function muteFunction(){
//     if (video.muted) {
//         video.muted = false;
//     } else {
//         video.muted = true; 
//     }
// }

