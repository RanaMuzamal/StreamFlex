import http from 'http'
import path from 'path'
import { spawn } from 'child_process'
import express from 'express'
import { Server as SocketIO } from 'socket.io'

const app = express();
const server = http.createServer(app);
const io = new SocketIO(server)

const options = [
    '-i',
    '-',
    '-c:v', 'libx264',
    '-preset', 'ultrafast',
    '-tune', 'zerolatency',
    '-r', `${25}`,
    '-g', `${25 * 2}`,
    '-keyint_min', 25,
    '-crf', '25',
    '-pix_fmt', 'yuv420p',
    '-sc_threshold', '0',
    '-profile:v', 'main',
    '-level', '3.1',
    '-c:a', 'aac',
    '-b:a', '128k',
    '-ar', 128000 / 4,
    '-f', 'flv',
    `${process.env.STREAM_URL}/${process.env.STREAM_KEY}` // YouTube RTMP URL
];

let ffmpegProcess = spawn('ffmpeg', options);

ffmpegProcess.stdout.on('data', (data) => {
    console.log(`ffmpeg stdout: ${data}`);
});

ffmpegProcess.stderr.on('data', (data) => {
    console.error(`ffmpeg stderr: ${data}`);
});

ffmpegProcess.on('close', (code) => {
    console.log(`ffmpeg process exited with code ${code}`);
    // Optionally restart the process
    if (code !== 0) {
        console.log('Restarting ffmpeg process...');
        ffmpegProcess = spawn('ffmpeg', options);
        attachFFmpegListeners(ffmpegProcess);
    }
});

function attachFFmpegListeners(process) {
    process.stdout.on('data', (data) => {
        console.log(`ffmpeg stdout: ${data}`);
    });

    process.stderr.on('data', (data) => {
        console.error(`ffmpeg stderr: ${data}`);
    });

    process.on('close', (code) => {
        console.log(`ffmpeg process exited with code ${code}`);
        // Optionally restart the process
        if (code !== 0) {
            console.log('Restarting ffmpeg process...');
            ffmpegProcess = spawn('ffmpeg', options);
            attachFFmpegListeners(ffmpegProcess);
        }
    });
}

app.use(express.static(path.resolve('./public')))

io.on('connection', socket => {
    console.log('Socket Connected', socket.id);
    socket.on('binaryStream', stream => {
        console.log('Binary Stream Incoming...');
        if (ffmpegProcess.stdin.writable) {
            ffmpegProcess.stdin.write(stream, (err) => {
                if (err) {
                    console.error('Error writing to ffmpeg stdin:', err);
                    // Handle the error, e.g., restart ffmpeg process
                }
            });
        } else {
            console.error('ffmpeg stdin is not writable');
            // Optionally restart the ffmpeg process or handle the situation
        }
    });
})

server.listen(3000, () => console.log(`HTTP Server is running on PORT 3000`))
