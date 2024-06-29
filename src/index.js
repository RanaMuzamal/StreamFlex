import http from 'http'
import path from 'path'
import express from 'express'
import {Server as SocketIO} from 'socket.io'
import { spawn } from 'child_process';



const app= express()

const server= http.createServer(app);
const io = new SocketIO(server);

 

app.use(express.static(path.resolve('./public')));

const ffmpeg = spawn('ffmpeg', [
    '-re',                      // Real-time streaming
    '-i', '-',                  // Input from stdin
    '-c:v', 'libx264',          // H.264 video codec
    '-preset', 'fast',          // Preset for encoding speed
    '-pix_fmt', 'yuv420p',      // Pixel format
    '-g', '60',                 // GOP size
    '-b:v', '2500k',            // Bitrate video
    '-c:a', 'aac',              // AAC audio codec
    '-b:a', '128k',             // Bitrate audio
    '-f', 'flv',                // Output format FLV for RTMP
    'rtmp://a.rtmp.youtube.com/live2/YOUR-YOUTUBE-STREAM-KEY'  // YouTube RTMP URL
]);

io.on("connection",socket=>{
    console.log("socket connected",socket.id)
    socket.on("binaryStream",stream=> {
        console.log("stream incomming")

        stream.pipe(ffmpeg.stdin);

        ffmpeg.stderr.on('data', data => {
            console.error(`ffmpeg stderr: ${data}`);
        });
        ffmpeg.stdout.on('data', data => {
            console.log(`ffmpeg stdout: ${data}`);
        });
    })
})


server.listen(3000,()=> console.log("StreamFlex is listening on 3000"))