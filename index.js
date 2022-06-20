let breakIncrementButton = document.getElementById('break-increment');
let breakDecrementButton = document.getElementById('break-decrement');
let breakLength = document.getElementById('break-length');

let sessionIncrementButton = document.getElementById('session-increment');
let sessionDecrementButton = document.getElementById('session-decrement');
let sessionLength = document.getElementById('session-length');

let alarm = document.getElementById('beep');

let startStopButton = document.getElementById('start_stop');
let resetButton = document.getElementById('reset');
let timeLeft = document.getElementById('time-left');

let timerLabel = document.getElementById('timer-label');

let timer;
let timerStatus = "begin";
let loop = 0;

breakIncrementButton.addEventListener("click", () => {
    if (breakLength.innerText < 60) {
        breakLength.innerText = parseInt(breakLength.innerText) + 1;
    }
});

breakDecrementButton.addEventListener("click", () => {
    if (breakLength.innerText > 1) {
        breakLength.innerText = parseInt(breakLength.innerText) - 1;
    }
});

sessionIncrementButton.addEventListener("click", () => {
    if (sessionLength.innerText < 60 && sessionLength.innerText >= 9) {
        sessionLength.innerText = parseInt(sessionLength.innerText) + 1;
        timeLeft.innerText = sessionLength.innerText + ':00';
    } else if (sessionLength.innerText < 10) {
        sessionLength.innerText = parseInt(sessionLength.innerText) + 1;
        timeLeft.innerText = '0' + sessionLength.innerText + ':00';
    }
});

sessionDecrementButton.addEventListener("click", () => {
    if (sessionLength.innerText > 1 && sessionLength.innerText <= 10) {
        sessionLength.innerText = parseInt(sessionLength.innerText) - 1;
        timeLeft.innerText = '0' + sessionLength.innerText + ':00';
    } else if (sessionLength.innerText > 1) {
        sessionLength.innerText = parseInt(sessionLength.innerText) - 1;
        timeLeft.innerText = sessionLength.innerText + ':00';
    }
});

startStopButton.addEventListener("click", () => {
    if (timerStatus === "begin" || timerStatus === "stopped") {
        timerStatus = "counting";
        timer = accurateInterval(() => { timeLeft.innerText = decrementTime(timeLeft.innerText) }, 1000);
    } else if (timerStatus === "counting") {
        timerStatus = "stopped";
        timer.cancel();
    }
});

resetButton.addEventListener("click", () => {
    breakLength.innerText = '5';
    sessionLength.innerText = '25';
    timeLeft.innerText = '25:00';
    timerLabel.innerText = 'Session';
    alarm.pause();
    alarm.currentTime = 0;
});

function decrementTime(timeString) {
    let timeDisplay = timeString.split(":");
    let minuteDisplay = parseInt(timeDisplay[0]);
    let secondDisplay = parseInt(timeDisplay[1]);

    secondDisplay -= 1;

    if (secondDisplay === -1) {
        secondDisplay = 59;
        minuteDisplay -= 1;
    }

    if (minuteDisplay === 0 && secondDisplay === 0) {
        alarm.play();
    }

    if (minuteDisplay === -1) {
        if (loop === 0) {
            timerLabel.innerText = 'Break';
            secondDisplay = 0;
            minuteDisplay = breakLength.innerText;
            loop += 1;
        } else {
            timerLabel.innerText = 'Session';
            secondDisplay = 0;
            minuteDisplay = sessionLength.innerText;
            loop -= 1;
        }
    }

    if (secondDisplay <= 9) {
        secondDisplay = "0" + secondDisplay;
    }

    if (minuteDisplay <= 9) {
        minuteDisplay = "0" + minuteDisplay;
    }
    
    return minuteDisplay + ":" + secondDisplay;
}
