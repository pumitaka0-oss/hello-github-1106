const timeDisplay = document.querySelector('#time');
const minuteInput = document.querySelector('#minutes');
const secondInput = document.querySelector('#seconds');
const startButton = document.querySelector('#start');
const resetButton = document.querySelector('#reset');
const message = document.querySelector('#message');

let remainingSeconds = 300;
let intervalId = null;

function showTime() {
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  timeDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function stopTimer() {
  clearInterval(intervalId);
  intervalId = null;
  startButton.textContent = 'スタート';
}

function setFromInputs() {
  const minutes = Math.min(99, Math.max(0, Number(minuteInput.value) || 0));
  const seconds = Math.min(59, Math.max(0, Number(secondInput.value) || 0));
  minuteInput.value = minutes;
  secondInput.value = seconds;
  remainingSeconds = minutes * 60 + seconds;
  showTime();
}

function tick() {
  remainingSeconds -= 1;
  showTime();
  if (remainingSeconds <= 0) {
    stopTimer();
    message.textContent = '時間です！おつかれさま。';
  }
}

startButton.addEventListener('click', () => {
  if (intervalId) {
    stopTimer();
    message.textContent = '一時停止中';
    return;
  }
  if (remainingSeconds <= 0) setFromInputs();
  if (remainingSeconds <= 0) {
    message.textContent = '1秒以上に設定してください';
    return;
  }
  intervalId = setInterval(tick, 1000);
  startButton.textContent = '一時停止';
  message.textContent = '集中タイム';
});

resetButton.addEventListener('click', () => {
  stopTimer();
  setFromInputs();
  message.textContent = '時間を設定してスタート';
});

minuteInput.addEventListener('input', () => { if (!intervalId) setFromInputs(); });
secondInput.addEventListener('input', () => { if (!intervalId) setFromInputs(); });
showTime();
