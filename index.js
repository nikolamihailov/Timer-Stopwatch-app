const timeEl = document.getElementById("time");
const audio = document.getElementById("alarm");
const startB = document.getElementById("startTimer");
const stopB = document.getElementById("stopTimer");
const timeNow = document.querySelector(".timeNow");
const pomodoro = document.querySelector(".pomodoroTime");
const minutesSelected = document.getElementById("times");
//const secondsSelected = document.getElementById("seconds");

let dropdownValue = Number(minutesSelected.value);
console.log(dropdownValue);
pomodoro.innerHTML = "00 : 00 : 00";

stopB.addEventListener("click", () => {
    minutesSelected.disabled = false;
    startB.disabled = false;
    pomodoro.innerHTML = "00 : 00 : 00";
    clearInterval(timeInterval)
    audio.pause();
})

let pomodoroTimeC;

minutesSelected.addEventListener("change", () => {
    dropdownValue = Number(minutesSelected.value);
    console.log(dropdownValue);
    switch (dropdownValue) {
        case 1:
            pomodoro.innerHTML = "00 : 01 : 00"; break
        case 5:
            pomodoro.innerHTML = "00 : 05 : 00"; break
        case 10:
            pomodoro.innerHTML = "00 : 10 : 00"; break
        case 15:
            pomodoro.innerHTML = "00 : 15 : 00"; break
        case 30:
            pomodoro.innerHTML = "00 : 30 : 00"; break
        case 60:
            pomodoro.innerHTML = "01 : 00 : 00"; break
    }
});
let timeInterval;
startB.addEventListener("click", () => {

    const pomodoroTime = new Date();
    const now = new Date();
    pomodoroTimeC = pomodoroTime;
    console.log(dropdownValue);
    pomodoroTime.setMinutes(now.getMinutes() + dropdownValue);
    if (dropdownValue > 0) {
        minutesSelected.disabled = true;

        function startTimer() {
            const nowIn = new Date();
            const differenceInSeconds = (pomodoroTimeC - nowIn) / 1000;
            const hoursP = Math.floor(differenceInSeconds / 3600) % 24;
            const minutesP = Math.floor(differenceInSeconds / 60) % 60;
            const secondsP = Math.ceil(differenceInSeconds) % 60;
            const timeP = `${formatTime(hoursP)} : ${formatTime(minutesP)} : ${formatTime(secondsP)}`;
            pomodoro.innerHTML = timeP;
            console.log(pomodoro.innerHTML);
            if (pomodoro.innerHTML === "0-1 : 0-1 : 00") {
                clearInterval(timeInterval);
                audio.play();
                return pomodoro.innerText = "00 : 00 : 00";

            }
        }

        timeInterval = setInterval(startTimer, 1000);
        startB.disabled = true;
    }


})

const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
}/*
function refreshTime() {
    const now = new Date();
    const hours = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours();;
    const minutes = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
    const seconds = now.getSeconds() < 10 ? `0${now.getSeconds()}` : now.getSeconds();
    const time = `${hours} : ${minutes} : ${seconds}`;
    timeNow.innerHTML = time;
}
refreshTime();
setInterval(refreshTime, 1000);*/



