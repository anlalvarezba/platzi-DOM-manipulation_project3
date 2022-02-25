/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

var supportsVideo = !!document.createElement('video').canPlayType;
if(supportsVideo){
    const videoContainer = document.getElementById('videoContainer');
    const video = document.getElementById('video');

    video.controls = false;

    const videoControls = document.createElement("ul");
    videoControls.className = "controls";

    videoContainer.appendChild(videoControls);


    const li1 = document.createElement("li");
    const li2 = document.createElement("li");
    const li3 = document.createElement("li");
    const li4 = document.createElement("li");
    const li5 = document.createElement("li");
    const li6 = document.createElement("li");
    const li7 = document.createElement("li");

    li1.className =  "li"; 
    li2.className =  "li"; 
    li3.className =  "progressli"; 
    li4.className =  "li"; 
    li5.className =  "li"; 
    li6.className =  "li"; 
    li7.className =  "li"; 

    videoControls.append(li1, li2, li3, li4, li5, li6, li7);
    
    const playpause   = document.createElement("button");
    const stop        = document.createElement("button");
    const progressDiv    = document.createElement("div");
    const mute        = document.createElement("button");
    const volinc      = document.createElement("button");
    const voldec      = document.createElement("button");
    const fullScreen  = document.createElement("button");

    playpause.className     = "playpause";
    stop.className          = "stop";
    progressDiv.className   = "progress";
    mute.className          = "mute";
    volinc.className        = "increase";
    voldec.className        = "decrease";
    fullScreen.className    = "fullscreen";

    li1.appendChild(playpause  );
    li2.appendChild(stop       );
    li3.appendChild(progressDiv);
    li4.appendChild(mute       );
    li5.appendChild(volinc     );
    li6.appendChild(voldec     );
    li7.appendChild(fullScreen );


    playpause.type      = "button";
    stop.type           = "button";
    progressDiv.type    = "button";
    mute.type           = "button";
    volinc.type         = "button";
    voldec.type         = "button";
    fullScreen.type     = "button";

    const progress    = document.createElement("progress");
    const progressBar = document.createElement("span");
    progressBar.className = "progress-bar";

    progressDiv.append(progress, progressBar);
    progress.value = "0";
    progress.min = "0";

    volinc.textContent = "+";
    voldec.textContent = "-";

    videoControls.style.display = 'inline-flex';

    // Para poner la imagen del boton play desde js:
    // playpause.style.backgroundImage = "url('_dist_/LightDarkIcons.jpg')"
    // playpause.style.backgroundImage = "url('_dist_/photo.png')"


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


    video.addEventListener('click', handlePlayPause);
    video.addEventListener('click', setClicked);
    playpause.addEventListener('click', setClicked);


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
        setVideoState(video.paused);
    }

    function handleStop(){
        video.pause();
        video.currentTime = 0; 
        progress.value = 0;
        setVideoState(video.paused);
    }


    function handleMuteUnmute(){
        if(video.volume >= 0.1){
            video.muted = !video.muted;
            setVolumeAttribute(video.muted);
        }
    }

    function alterVolume(value){
        var currentVolume = Math.floor(video.volume * 10)/10;
        if(value === '-'){
            if(currentVolume > 0){
                video.volume -= 0.1;
            }
        }
        else if(value === '+'){
            if(currentVolume < 1){
                video.volume += 0.1;
            }
        }
        video.muted=false;

        if(video.volume < 0.1){ 
            setVolumeAttribute(true);
        }
        else if(video.volume > 0.1){
            setVolumeAttribute(false);
        }
    }

    function handleFullScreen(){
        if(isFullScreen()){
            clearTimeout(timer);
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
            
            fixOrientation();

            // video.addEventListener('mousemove', opacityControls);
        }
    }


    video.addEventListener('mousemove', opacityControls);
    video.addEventListener('mouseenter', opacityControls);
    videoContainer.addEventListener('mousemove', opacityControls);
    document.addEventListener('fullscreenchange', () => {
        if(isFullScreen()){
            if(!video.paused){
                videoControls.style.opacity = '1';
                timer = setTimeout(() => {
                videoControls.style.opacity = '0';
                }, 4000);
            }
            else if(video.paused){
                videoControls.style.opacity = '1';
            }
        }
        else {
            videoControls.style.opacity = '1';
        }
    })

    var timer;
    function opacityControls() {
        if(isFullScreen()){
        clearTimeout(timer);
        videoControls.style.opacity = '1';
        timer = setTimeout(() => {
            videoControls.style.opacity = '0';
        }, 4000);
        }
    }



    function fixOrientation(){
        screen.orientation.lock("landscape")
            .then(
                console.log('screen orientation: ', screen.orientation.type)
            )
            .catch(
                error => console.log('Error: ', error)
            )
    }
    

    function isFullScreen(){
        return !!(document.fullscreenElement || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
    }

    function setFullScreenData(state){
        videoContainer.setAttribute('data-fullscreen', !!state);
    }

    function setVideoState(state){
        videoContainer.setAttribute('data-videopaused', !!state);
    }
    //Para cuando se tengan tres simbolos de volumen:
    // function setVolumeAttribute(volumeMuted){
    //     if(!!volumeMuted){
    //         videoContainer.setAttribute("data-vol","silence");
    //     }
    //     else{
    //         if(video.volume <= 0.4){
    //             videoContainer.setAttribute("data-vol","low");
    //         }
    //         else{
    //             videoContainer.setAttribute("data-vol","high");
    //         }
    //     }
    // }

    function setVolumeAttribute(volumeMuted){
        videoContainer.setAttribute('data-muted', !!volumeMuted);
    }


    var containerClicked;
    function setClicked(){
        if(video.paused){
            containerClicked = 'pause';
        } else {
            containerClicked = 'play';
        }
    }

    let options = {
        root: null,
        thereshold: 0.25,
    }

    let stopPlaying = (entries, observer) => {
        entries.forEach(entry => {
            if(containerClicked === 'play')
            {
                handlePlayPause()
            }
        });
    }

    let observer = new IntersectionObserver(stopPlaying, options);
    let target = video;
    observer.observe(target);



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
    console.log('window:', window);
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

