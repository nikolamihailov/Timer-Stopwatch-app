const timeEl = document.getElementById("time");
const audio = document.getElementById("alarm");
const audioBeep = document.getElementById("beep");
const startB = document.getElementById("startTimer");
const pauseB = document.getElementById("pause");
const stopB = document.getElementById("stopTimer");
const timeNow = document.querySelector(".timeNow");
const timer = document.querySelector(".value-container");
const progressBar = document.querySelector(".circular-progress");
const valueContainer = document.querySelector(".value-container");
const minutesSelected = document.getElementById("times");

let dropdownValue = Number(minutesSelected.value);

timer.innerHTML = "00 : 00 : 00";

stopB.addEventListener("click", () => {
    minutesSelected.disabled = false;
    startB.disabled = false;
    switch (dropdownValue) {
        case 0:
            timer.innerHTML = "00 : 00 : 00"; break;
        case 1:
            timer.innerHTML = "00 : 01 : 00"; break;
        case 5:
            timer.innerHTML = "00 : 05 : 00"; break;
        case 10:
            timer.innerHTML = "00 : 10 : 00"; break;
        case 15:
            timer.innerHTML = "00 : 15 : 00"; break;
        case 30:
            timer.innerHTML = "00 : 30 : 00"; break;
        case 60:
            timer.innerHTML = "01 : 00 : 00"; break;
        case 120:
            timer.innerHTML = "02 : 00 : 00"; break;
    }
    clearInterval(timeInterval);
    audio.pause();
    audioBeep.pause();
    progressBar.style.background = `conic-gradient(
      red ${0 * 3.6}deg,
      #f0f0f0 ${0 * 3.6}deg
  )`;

});

let progressStep = 100 / (60 * 1);

minutesSelected.addEventListener("change", () => {
    dropdownValue = Number(minutesSelected.value);
    switch (dropdownValue) {
        case 1:
            timer.innerHTML = "00 : 01 : 00";
            progressStep = 100 / (60 * 1);
            break;
        case 5:
            timer.innerHTML = "00 : 05 : 00";
            progressStep = 100 / (60 * 5);
            break;
        case 10:
            timer.innerHTML = "00 : 10 : 00";
            progressStep = 100 / (60 * 10);
            break;
        case 15:
            timer.innerHTML = "00 : 15 : 00";
            progressStep = 100 / (60 * 15);
            break;
        case 30:
            timer.innerHTML = "00 : 30 : 00";
            progressStep = 100 / (60 * 30);
            break;
        case 60:
            timer.innerHTML = "01 : 00 : 00";
            progressStep = 100 / (60 * 60);
            break;
        case 120:
            timer.innerHTML = "02 : 00 : 00";
            progressStep = 100 / (60 * 120);
            break;
    }
});

let timeInterval;
startB.addEventListener("click", () => {
    if (dropdownValue > 0) {
        let progressTotal = 0;
        let totalSeconds = dropdownValue * 60 - 1;
        let isPaused = false;
        pauseB.addEventListener("click", () => {
            if (!isPaused) {
                pauseB.innerHTML = `<i class="fa fa-play"></i>`;
                clearInterval(timeInterval);
                isPaused = true;
            } else {
                pauseB.innerHTML = `<i class="fa fa-pause"></i>`;
                clearInterval(timeInterval);
                if (totalSeconds !== dropdownValue * 60 - 1) {
                    timeInterval = setInterval(startTimer, 1000);
                    isPaused = false;
                }
            }
        });
        function startTimer() {
            const hours = Math.floor(totalSeconds / 3600) % 24;
            const minutes = Math.floor(totalSeconds / 60) % 60;
            const seconds = Math.floor(totalSeconds % 60);
            totalSeconds--;
            progressTotal += progressStep;
            progressBar.style.background = `conic-gradient(
             red ${progressTotal * 3.6}deg,
             #f0f0f0 ${progressTotal * 3.6}deg)`;
            if (hours === 0 && minutes === 0 && seconds === 0) {
                audioBeep.pause();
                audio.play();
                clearInterval(timeInterval);
                return timer.innerText = "00 : 00 : 00";
            }

            if (seconds <= 10 && seconds >= 1 && minutes === 0 && hours === 0) {
                audioBeep.play();
            }
            timer.innerHTML = `${formatTime(hours)} : ${formatTime(minutes)} : ${formatTime(seconds)}`;

        }
        timeInterval = setInterval(startTimer, 1000);
        startB.disabled = true;
        minutesSelected.disabled = true;
    }
});

const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
};
function refreshTime() {
    const now = new Date();
    const hours = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours();;
    const minutes = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
    const seconds = now.getSeconds() < 10 ? `0${now.getSeconds()}` : now.getSeconds();
    const time = `${hours} : ${minutes} : ${seconds}`;
    timeNow.innerHTML = time;
}

refreshTime();
setInterval(refreshTime, 1000);