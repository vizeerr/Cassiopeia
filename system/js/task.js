

const getDragSettings = JSON.parse(localStorage.getItem('DaSySt')) || {};
document.querySelector('#closetaskIt').addEventListener('click',()=>{
  document.querySelector('.taskshower').style.visibility="hidden";
  getDragSettings.settings.task.visibility = "hidden";
  localStorage.setItem('DaSySt', JSON.stringify(getDragSettings));
})

document.querySelector('#mintaskIt').addEventListener('click',()=>{
  document.querySelector('.taskshower p').classList.add("mintaskshower")
  document.querySelector('#tasklist').style.display="none";
})

document.querySelector('#maxtaskIt').addEventListener('click',()=>{
  document.querySelector('.taskshower p').classList.remove("mintaskshower")
  document.querySelector('#tasklist').style.display="block";
})

document.getElementById("addtasklogo").addEventListener('click',()=>{
  document.getElementById("tskcon").style.visibility="visible"
})

document.getElementById("tskcon").addEventListener('click',(e)=>{
    let get = document.getElementById('tasktaker');
    if (!get.contains(e.target)) {
      document.getElementById("tskcon").style.visibility="hidden"
    }
  })
  document.getElementById('timeSelect').addEventListener('change',(e)=>{
    if(e.target.value == "Schedule"){
      document.getElementById('timeInput').style.opacity='1';
    }
  })
  
  let taskForm = document.getElementById("tasktaker");
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let task= document.getElementById("gottask");
    task.select();
    let timeSelect= document.getElementById("timeSelect");
    let timeInput= document.getElementById("timeInput");
  
    if (task.value != "") {
    const localdata = JSON.parse(localStorage.getItem('task')) || [];
    const taskme = {
      task:task.value,
      status:"uncomplete",
      timer:timeSelect.value,
      timedate : timeInput.value,
    }
  
    localdata.push(taskme);
    localStorage.setItem("task", JSON.stringify(localdata));
    rendertask()
    // document.getElementById("tskcon").style.visibility="hidden"
    taskForm.reset();
    }
  });
  rendertask()
  function rendertask() {        
    const tasklist = document.getElementById('tasklist')
    tasklist.innerHTML=""
    const localdata = JSON.parse(localStorage.getItem('task')) || [];
    localdata.forEach((element,index) => {
      let li = document.createElement("li");
      let pli = document.createElement('p');
      pli.innerHTML = `${index+1}. ${element.task}`;
      li.appendChild(pli)
      let tskopt = document.createElement('div')
      tskopt.classList.add('taskoption')
      let hideopt = document.createElement('div');
      let delbtn = document.createElement('img');
      delbtn.src = "https://img.icons8.com/external-inkubators-detailed-outline-inkubators/25/FA5252/external-delete-email-inkubators-detailed-outline-inkubators.png";
      delbtn.addEventListener('click',()=>{
        localdata.splice(index, 1);
            localStorage.setItem('task', JSON.stringify(localdata));
            rendertask()
      })
      hideopt.appendChild(delbtn);
      tskopt.appendChild(hideopt);
      li.appendChild(tskopt)

      hideopt.classList.add('hideoption')
      if(element.status !="complete"){
        pli.addEventListener('click',()=>{
          localdata[index].status = "complete",
          localStorage.setItem('task', JSON.stringify(localdata));
          rendertask()
        })
          if(element.timer =="Schedule"){
            var tsktd = new Date(element.timedate).getTime();
            timeralert();
            chrome.runtime.sendMessage({ task: element });
            let dntsk = document.createElement('div')
            dntsk.id = 'donetask'
            dntsk.innerHTML = `<img width="25" height="25" src="https://img.icons8.com/ios/30/EBEBEB/time--v1.png" alt="time--v1"/>`;
            tskopt.appendChild(dntsk);
            function  timeralert() { 
              var now = new Date().getTime();
              var diff = tsktd - now;  
              if(now >= tsktd){
                // if(confirm('Time Up')){
                //   localdata.splice(index, 1);
                //   localStorage.setItem('task', JSON.stringify(localdata));
                //   rendertask();
                // }
              }else{
                setTimeout(() => {
                  timeralert();
                }, diff);
              }
            }
          }
      }else{
        if(element.timer == "ON"){
          const twentyFourHours = 5000; 
          setTimeout(() => {
            localdata.splice(index, 1);
            localStorage.setItem('task', JSON.stringify(localdata));
            rendertask()
          }, twentyFourHours);
        }else{
          li.addEventListener('click',()=>{
            localdata.splice(index, 1);
            localStorage.setItem('task', JSON.stringify(localdata));
            rendertask()
          })
        }
        li.style.textDecoration = "line-through";
      }
      tasklist.appendChild(li)
      
    });
  
  }
  