const userVedio= document.getElementById("user-vedio")
const startButton= document.getElementById("start-button");

const state= {media:null}
const socket= io()


startButton.addEventListener('click',()=>{
    const mediaRecorder= new MediaRecorder(state.media,{
        audioBitsPerSecond:128000,
        videoBitsPerSecond:2500000,
        framerate:25
    })
    mediaRecorder.ondataavailable=ev=>{
        console.log("Binary stram avaiable",ev.data)
        socket.emit("binaryStream",ev.data)
    }
    mediaRecorder.start(25)
})
window.addEventListener('load',async(e)=>{
    const media = await navigator.mediaDevices.getUserMedia({audio:true,video:true});
    state.media=media
    userVedio.srcObject= media;
})