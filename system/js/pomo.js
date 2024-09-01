
document.getElementById('pomodora').addEventListener('click', () => {
    document.getElementById('pomodoraSet').style.visibility = "visible";
  });


//button action
const pmbtn = document.getElementById('pmbtn');
pmbtn.addEventListener('click', toggleTimer);
let totalSeconds = 1800;
let timerRun = "stop";
var storedtime;
let intervalId = null;

// reset button
document.getElementById('pmreset').addEventListener('click',()=>{
  totalSeconds = 1800;
  timerRun = "stop";
  clearInterval(intervalId);
  pomoobj = {
    time: 0,
    state: "off"
  };
  chrome.storage.local.set({ pomoobj: pomoobj });
  chrome.alarms.clear("PomoNotification")
  location.reload()
})

//time format
function formatTime(t) {
  var m = String(Math.floor(t / 60)).padStart(2, '0');
  var s = String(t % 60).padStart(2, '0');
  return `${m}:${s}`;
}

//date
const currentTime = new Date();
gotPomotime();

function gotPomotime() {
  chrome.storage.local.get(['pomoobj'], result => {
    storedtime = result.pomoobj.time
    var date,pomot
    if (result.pomoobj && result.pomoobj.state === "running") {
      pomot = new Date(storedtime).getTime();
      date = Math.max(0, pomot - Date.now()); 
      totalSeconds = Math.floor(date / 1000);
      intervalId = setInterval(updateTimer, 1000);
      timerRun = "pause"
      pmbtn.innerText = "Pause";
      document.getElementById('pomodoraSet').style.visibility = "visible";
      document.getElementById('pomodoraSet').classList.add('shortpana', 'editableAbsol');
    }else if (result.pomoobj && result.pomoobj.state === "paused") {
      totalSeconds = storedtime;
      timerRun = "resume"
      pmbtn.innerText = "Resume";
      const timerDiv = document.getElementById('pmtext');
      timerDiv.textContent = formatTime(totalSeconds);
      pauseTimer()
      document.getElementById('pomodoraSet').style.visibility = "visible";
      document.getElementById('pomodoraSet').classList.add('shortpana', 'editableAbsol');
    }
  });
}

function toggleTimer() {
  if (timerRun === "stop") {
    startTimer();
    pmbtn.innerText = "Pause";
    timerRun = "pause";
  } else if (timerRun === "pause") {
    pauseTimer();
    timerRun = "resume";
    pmbtn.innerText = "Resume";
  } else {
    resumeTimer();
    timerRun = "pause";
    pmbtn.innerText = "Pause";
  }
}

var pomoobj = {
  time:totalSeconds,
  state:"stop"
};

function startTimer() {
  updateTimer();
  chrome.runtime.sendMessage({ pomodora: true });
  const thirtyMinutesLater = new Date(Date.now() + 30 * 60000);
  pomoobj = {
    time: thirtyMinutesLater.getTime(),
    state: "running"
  };
  chrome.storage.local.set({ pomoobj: pomoobj });
  intervalId = setInterval(updateTimer, 1000);
}

function pauseTimer() {
  clearInterval(intervalId);
  pomoobj.state = "paused";
  pomoobj.time = totalSeconds;
  chrome.storage.local.set({ pomoobj: pomoobj });
  chrome.alarms.clear("PomoNotification")
}

function resumeTimer() {
  const thirtyMinutesLater = new Date(Date.now() + totalSeconds*1000);
  pomoobj = {
    time: thirtyMinutesLater.getTime(),
    state: "running"
  };
  updateTimer();
  intervalId = setInterval(updateTimer, 1000);
  chrome.storage.local.set({ pomoobj: pomoobj });
}

function updateTimer() {
  totalSeconds--;
  const timerDiv = document.getElementById('pmtext');
  timerDiv.textContent = formatTime(totalSeconds);
  if (totalSeconds === 0) {
    clearInterval(intervalId);
    totalSeconds = 31;
    timerRun = "stop";
    pmbtn.innerText = "Start";
    alert('Time is up!');
  }
}


document.getElementById('pomodoraSet').addEventListener('click', (e) => {
  let get = document.getElementById('pomosection');
  if (!get.contains(e.target)) {
    if (timerRun === "pause" || timerRun === "resume") {
      document.getElementById('pomodoraSet').classList.add('shortpana', 'editableAbsol');
      dragassign();
    } else {
      document.getElementById('pomodoraSet').style.visibility = "hidden";
    }
  }
});
