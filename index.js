const timeEl = document.getElementById("time");
const audio = document.getElementById("alarm");
const audioBeep = document.getElementById("beep");
const startB = document.getElementById("startTimer");
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
            timer.innerHTML = "00 : 00 : 00"; break
        case 1:
            timer.innerHTML = "00 : 01 : 00"; break
        case 5:
            timer.innerHTML = "00 : 05 : 00"; break
        case 10:
            timer.innerHTML = "00 : 10 : 00"; break
        case 15:
            timer.innerHTML = "00 : 15 : 00"; break
        case 30:
            timer.innerHTML = "00 : 30 : 00"; break
        case 60:
            timer.innerHTML = "01 : 00 : 00"; break
        case 120:
            timer.innerHTML = "02 : 00 : 00"; break
    }
    clearInterval(timeInterval)
    audio.pause();
    audioBeep.pause();
    progressBar.style.background = `conic-gradient(
      red ${0 * 3.6}deg,
      #f0f0f0 ${0 * 3.6}deg
  )`;

})

//let progressValue = 0;
let progressStep = 0;
let progressEndValue = 100;




let timerC;

minutesSelected.addEventListener("change", () => {
    dropdownValue = Number(minutesSelected.value);
    switch (dropdownValue) {
        case 0:
            timer.innerHTML = "00 : 00 : 00"; break
        case 1:
            timer.innerHTML = "00 : 01 : 00";
            progressStep = 100 / (60 * 1);
            break
        case 5:
            timer.innerHTML = "00 : 05 : 00";
            progressStep = 100 / (60 * 5);
            break
        case 10:
            timer.innerHTML = "00 : 10 : 00";
            progressStep = 100 / (60 * 10);
            break
        case 15:
            timer.innerHTML = "00 : 15 : 00";
            progressStep = 100 / (60 * 15);
            break
        case 30:
            timer.innerHTML = "00 : 30 : 00";
            progressStep = 100 / (60 * 30);
            break
        case 60:
            timer.innerHTML = "01 : 00 : 00";
            progressStep = 100 / (60 * 60);
            break
        case 120:
            timer.innerHTML = "02 : 00 : 00";
            progressStep = 100 / (60 * 120);
            break
    }
});
let timeInterval;
startB.addEventListener("click", () => {
    let progressTotal = 0;
    const pomodoroTime = new Date();
    const now = new Date();
    timerC = pomodoroTime;
    pomodoroTime.setMinutes(now.getMinutes() + dropdownValue);
    if (dropdownValue > 0) {
        minutesSelected.disabled = true;
        function startTimer() {
            const nowIn = new Date();
            const differenceInSeconds = (timerC - nowIn) / 1000;
            const hoursP = Math.floor(differenceInSeconds / 3600) % 24;
            const minutesP = Math.floor(differenceInSeconds / 60) % 60;
            const secondsP = Math.ceil(differenceInSeconds) % 60;
            const timeP = `${formatTime(hoursP)} : ${formatTime(minutesP)} : ${formatTime(secondsP)}`;
            if (secondsP < 11 && secondsP >= 1 && minutesP === 0 && hoursP === 0) {
                audioBeep.play();
            }

            progressTotal += progressStep;
            progressBar.style.background = `conic-gradient(
      red ${progressTotal * 3.6}deg,
      #f0f0f0 ${progressTotal * 3.6}deg
  )`;

            if (hoursP === -1 && minutesP === -1 && secondsP === -0) {
                audioBeep.pause();
                clearInterval(timeInterval);
                audio.play();
                return timer.innerText = "00 : 00 : 00";
            }
            timer.innerHTML = timeP;
        }

        timeInterval = setInterval(startTimer, 1000);
        startB.disabled = true;
    }
})

const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
}
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








