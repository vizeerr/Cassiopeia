
function addStyle(){
  const getStyle = JSON.parse(localStorage.getItem('DaSySt')) || [];
  for (const key in getStyle.settings) {
    // console.log(key);
    const innerSettings = getStyle.settings[key];
    for (const entit in innerSettings) {
      // console.log(entit, innerSettings[entit]);
      document.getElementById(key).style[entit] = innerSettings[entit];
    }
  }

  getTime()
}

addStyle()


const curr = document.getElementById('custCur');
            
document.addEventListener('mousemove',(e)=>{
    console.log(e);
curr.style.left = e.pageX- window.scrollX + "px";
curr.style.top = e.pageY - window.scrollY + "px";
})


function getTime(){
    const time = new Date();
    const hours = time.getHours();
    const min = time.getMinutes();
    const sec = time.getSeconds();
    const day = time.getDate();
    const montharr = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const month = montharr[time.getMonth()];
    const weekarr = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const week = weekarr[time.getDay()];
    document.getElementById("day").innerText = `${week}, ${day} ${month}`;
    const timeText = `${String(hours).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
    document.getElementById("time").innerText= timeText;
    document.getElementById("sec").innerText= String(sec).padStart(2, '0');
    if (hours >=5 && hours <=12){
      document.getElementById("greeting").innerText= "Good Morning";
    }
    else if (hours >= 12 && hours <= 17){
       document.getElementById("greeting").innerText= "Good Afternoon";
    }
    else if (hours >= 17 && hours <= 22){
       document.getElementById("greeting").innerText= "Good Evening";
    }
    else{
      document.getElementById("greeting").innerText="Good Night"; 
    }
  }
setInterval(getTime,1000);

