
// chrome.runtime.onMessage.addListener((message) => {
//     if (message.timerNotif === 'TimeUp') {
        
//     }
// })



//   chrome.alarms.onAlarm.addListener((alarm) => {
//     if (alarm.name === 'myTimerAlarm') {
//       showNotification();
//     }
//   });

// chrome.alarms.create('demo-default-alarm', {
//     delayInMinutes: 1,
//     periodInMinutes: 1
//   });





var titlenotif;
chrome.runtime.onMessage.addListener((message) => {
    var time;
    if(message.pomodora){
        time = 30;
        chrome.alarms.create('PomoNotification', {
            delayInMinutes:time
        });
        titlenotif = "Time Up! "
    }else{
        time = new Date(message.task.timedate).getTime();
        chrome.alarms.create('TaskNotification', {
            when:time
        });
        titlenotif = message.task.task
    }
    
});

chrome.alarms.onAlarm.addListener((alarm)=>{
    showNotification();
})
function showNotification() {
    const options = {
      type: 'basic',
      iconUrl: 'images/logo.png',
      title: titlenotif,
      message: 'Your timer has finished!',
    };
  
    chrome.notifications.create(options);
  }

//   chrome.alarms.clear("demo-default-alarm")
