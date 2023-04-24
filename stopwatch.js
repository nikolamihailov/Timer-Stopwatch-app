const startB = document.getElementById("startTimer");
const pauseB = document.getElementById("pause");
const stopB = document.getElementById("stopTimer");
const timeNow = document.querySelector(".timeNow");
const timer = document.querySelector(".value-container");

timer.innerHTML = "00 : 00 : 00";

stopB.addEventListener("click", () => {
    startB.disabled = false;
    pauseB.disabled = true;
    clearInterval(timeInterval);
    timer.innerHTML = "00 : 00 : 00";
});

let progressStep = 0;

let timeInterval;

startB.addEventListener("click", () => {
    let progressTotal = 0;
    let totalSeconds = 0;
    let isPaused = false;
    pauseB.addEventListener("click", () => {
        if (!isPaused) {
            pauseB.innerHTML = `<i class="fa fa-play"></i>`;
            clearInterval(timeInterval);
            isPaused = true;
        } else {
            pauseB.innerHTML = `<i class="fa fa-pause"></i>`;
            clearInterval(timeInterval);
            timeInterval = setInterval(startTimer, 1000);
            isPaused = false;
        }
    });
    function startTimer() {
        totalSeconds++;
        const seconds = Math.floor(totalSeconds % 60);
        const minutes = Math.floor(totalSeconds / 60) % 60;
        const hours = Math.floor(totalSeconds / 3600) % 24;
        progressTotal += progressStep;
        timer.innerHTML = `${formatTime(hours)} : ${formatTime(minutes)} : ${formatTime(seconds)}`;

    }
    timeInterval = setInterval(startTimer, 1000);
    startB.disabled = true;
}
);

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

