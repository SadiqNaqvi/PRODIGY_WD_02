const startBtn = document.getElementById("start")!;
const pauseBtn = document.getElementById("pause")!;
const lapBtn = document.getElementById("lap")!;
const resetBtn = document.getElementById("reset")!;
const hourCntr = document.getElementById("hourCounter")!;
const minCntr = document.getElementById("minCounter")!;
const secCntr = document.getElementById("secCounter")!;
const milisecCntr = document.getElementById("milisecCounter")!;
const lapContainer = document.querySelector("#lapContainer ol")!;

let isCounterRunning = false;
let counter: any;

const increaseHour = () => {
  minCntr.innerText = "00";
  const hour = parseInt(hourCntr.innerText) + 1;
  if (hour >= 24) window.location.reload();
  else hourCntr.innerText = `${hour < 10 ? "0" + hour : hour}`;
};

const increaseMin = () => {
  secCntr.innerText = "00";
  const min = parseInt(minCntr.innerText) + 1;
  if (min >= 60) increaseHour();
  else minCntr.innerText = `${min < 10 ? "0" + min : min}`;
};

const increaseSec = () => {
  milisecCntr.innerText = "00";
  const sec = parseInt(secCntr.innerText) + 1;
  if (sec >= 60) increaseMin();
  else secCntr.innerText = `${sec < 10 ? "0" + sec : sec}`;
};

const increaseMiliSec = () => {
  const mili = parseInt(milisecCntr.innerText) + 1;
  if (mili >= 10) increaseSec();
  else milisecCntr.innerText = `0${mili}`;
};

const startWatch = () => {
  if (isCounterRunning) return;
  isCounterRunning = true;
  startBtn.classList.add("disable");
  pauseBtn.classList.remove("disable");
  lapBtn.classList.remove("disable");
  resetBtn.classList.remove("disable");
  increaseMiliSec();
  counter = setInterval(increaseMiliSec, 100);
};

const pauseWatch = () => {
  if (!isCounterRunning) return;
  isCounterRunning = false;
  startBtn.classList.remove("disable");
  pauseBtn.classList.add("disable");
  clearInterval(counter);
};

const resetWatch = () => {
  hourCntr.innerText =
    minCntr.innerText =
    secCntr.innerText =
    milisecCntr.innerText =
      "00";
  pauseWatch();
  lapBtn.classList.add("disable");
  resetBtn.classList.add("disable");
};

const takeLap = () => {
  if (lapBtn.classList.contains("disable")) return;
  const li = document.createElement("li");
  li.classList.add("lapList");
  li.innerText = `${hourCntr.innerText} : ${minCntr.innerText} : ${secCntr.innerText} : ${milisecCntr.innerText}`;
  lapContainer.appendChild(li);
};

startBtn.addEventListener("click", startWatch);
pauseBtn.addEventListener("click", pauseWatch);
lapBtn.addEventListener("click", takeLap);
resetBtn.addEventListener("click", resetWatch);
document.getElementById("clearLap")?.addEventListener("click", () => {
  lapContainer.innerHTML = "";
});
