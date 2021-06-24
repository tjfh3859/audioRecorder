const startBtn = document.getElementById("startBtn");
const audio = document.getElementById("preview");

let stream;
let recorder;
let audioFile;

const handleDownload = () => {
  const a = document.createElement("a");
  a.href = audioFile;
  a.download = "MyRecording.webm";
  document.body.appendChild(a);
  a.click();
};

const handleStop = () => {
  startBtn.removeEventListener("click", handleStop);
  startBtn.addEventListener("click", handleDownload);
};

const handleStart = () => {
  audio.play();
  startBtn.innerText = "Stop Recording";
  startBtn.removeEventListener("click", handleStart);
  startBtn.addEventListener("click", handleStop);
  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (event) => {
    audioFile = URL.createObjectURL(event.data);
    audio.srcObject = null;
    audio.src = audioFile;
  };
  recorder.start();
  setTimeout(() => {
    recorder.stop();
    startBtn.innerText = "Download Recording";
  }, 6000);
};

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false
  });
  audio.srcObject = stream;
};

init();

startBtn.addEventListener("click", handleStart);
