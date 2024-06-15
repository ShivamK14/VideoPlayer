const playPauseBtn = document.querySelector(".play-pause-btn")
const video =document.querySelector("video")
const videoContainer = document.querySelector(".video-container")
const theaterBtn = document.querySelector(".theater-btn")
const fullscreenBtn = document.querySelector(".fullscreen-btn")
const currentTimeElem = document.querySelector(".current-time")
const totalTimeElem = document.querySelector(".total-time")


video.addEventListener("click",toggelPlay)
playPauseBtn.addEventListener("click",toggelPlay)
theaterBtn.addEventListener("click",toggelTheaterMode)
fullscreenBtn.addEventListener("click", toggelFullscreenbtn)


document.addEventListener("keydown",e=>{
    switch(e.key.toLowerCase()){
        case " ":
        case "k":
            toggelPlay()
            break
        case "arrowleft":
        case "j":
            skip(-5)
            break
        case "arrowright":
        case "l":
            skip(5)
            break
        case "f":
            toggelFullscreenbtn()
            break
    }
})


const leadingZeroFormatter = new Intl.NumberFormat(undefined,{
     minimumIntegerDigits:2,
})
//DUration
video.addEventListener("loadeddata",()=>{
    totalTimeElem.textContent = formatDuration(video.duration)
})

video.addEventListener("timeupdate",()=>{
    currentTimeElem.textContent = formatDuration(video.currentTime)
})

function skip(duration){
    video.currentTime +=duration
}


function formatDuration(time){
    const seconds = Math.floor(time%60)
    const minutes = Math.floor(time/60) % 60
    const hours = Math.floor(time/3600)
    if(hours===0){
        return `${minutes}:${leadingZeroFormatter.format(seconds)}`
    }else{
        return `${hours}:${leadingZeroFormatter.format(minutes)}:${leadingZeroFormatter.format(seconds)}`
    }

}
function toggelTheaterMode(){
    videoContainer.classList.toggle("theater")

}

function toggelFullscreenbtn(){
    if(document.fullscreenElement==null){
        videoContainer.requestFullscreen()
    }else{
    document.exitFullscreen()
    }
}



//play/pause
function toggelPlay(){
    video.paused ? video.play(): video.pause()
}

video.addEventListener("play",()=>{
    videoContainer.classList.remove("paused")
})

video.addEventListener("pause",()=>{
    videoContainer.classList.add("paused")
})
