const minutesLbl = document.getElementById("minutes");
const secondsLbl = document.getElementById("seconds");
const millisecondsLbl = document.getElementById("milliseconds");

const startBtn = document.getElementById("startBTN");
const stopBtn = document.getElementById("stopBTN");
const pauseBtn = document.getElementById("pauseBTN");
const resetBtn = document.getElementById("resetBTN");

const laplist = document.getElementById("laplist");

/// stopwatch variables
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let interval;

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

function startTimer() {
  interval = setInterval(updateTimer, 10);
  startBtn.disabled = true;
}

function stopTimer() {
  clearInterval(interval);
  addToLapList();
  resetTimerData();
  startBtn.disabled = false;
}

function pauseTimer() {
  clearInterval(interval);
  startBtn.disabled = false;
}

function resetTimer() {
  clearInterval(interval);
  resetTimerData();
  startBtn.disabled = false;
}

function updateTimer() {
  milliseconds++;
  if (milliseconds === 100) {
    milliseconds = 0;
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
  }
  displayTimer();
}

function displayTimer() {
  millisecondsLbl.textContent = padTime(milliseconds);
  secondsLbl.textContent = padTime(seconds);
  minutesLbl.textContent = padTime(minutes);
}

function padTime(time) {
  return time.toString().padStart(2, "0");
}

function resetTimerData() {
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  displayTimer();
}

function addToLapList() {
  const lapTime = `${padTime(minutes)}:${padTime(seconds)}:${padTime(
    milliseconds
  )}`;

  const listItem = document.createElement("li");
  listItem.innerHTML = `<span>Lap ${
    laplist.childElementCount + 1
  }: </span>${lapTime}`;
  laplist.appendChild(listItem);
}
