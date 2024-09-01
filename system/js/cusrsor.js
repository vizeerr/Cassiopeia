const curr = document.getElementById('custCur');
            
            document.addEventListener('mousemove',(e)=>{
            curr.style.left = e.pageX- window.scrollX + "px";
            curr.style.top = e.pageY - window.scrollY + "px";
        })


let list = document.querySelectorAll('h1,p,h2,h3,ul,img')

list.forEach(element => {
    element.addEventListener('mouseover',()=>{
        document.getElementById('custCur').style.scale = 2.5;
        document.getElementById('custCur').style.transform= "translate(-50%,-30%)";
    })
    element.addEventListener('mouseout',()=>{
        document.getElementById('custCur').style.scale = 1;
        document.getElementById('custCur').style.transform= "translate(-50%,-70%)";
    })
});