// This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// This function creates an <iframe> (and YouTube player)
//    after the API code downloads.

function onYouTubeIframeAPIReady() {
    window.player = new YT.Player('music', {
        width="1",
        height="1",
        wmode="transparent",
        src="https://www.youtube.com/embed/5qap5aO4i9A?enablejsapi=1&controls=0",
        frameborder="0",
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    // currently does nothing   
    // event.target.playVideo();
    console.log("video ready");
}

function onPlayerStateChange() {
    // currently does nothing
}

// function playMusic() {
//     player.startVideo();
// }

// function pauseMusic() {
//     player.pauseVideo();
// }

// function setMusicVolume(volume) {
//     player.setVolume(volume);
// }

// // export {playMusic, pauseMusic, setMusicVolume};