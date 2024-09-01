
document.getElementById("editico").addEventListener('click',()=>{
    let editbag =  document.getElementById('editBag');
    editbag.style.visibility = "visible";
    let editableRele = document.querySelectorAll('.editableRele');
    let editableAbsol = document.querySelectorAll('.editableAbsol');
    editableRele.forEach((elem)=>{
      elem.addEventListener('click',()=>{
        elem.classList.add('draggableRele')
        editbag.addEventListener('click',()=>{
          elem.classList.remove('draggableRele')
        })
        dragassign()
      })
    })
    editableAbsol.forEach((elem)=>{
      elem.addEventListener('click',()=>{
        elem.classList.add('draggableAbsol')
        editbag.addEventListener('click',()=>{
          elem.classList.remove('draggableAbsol')
        })
        dragassign()
      })
    })
  })

  document.getElementById('exitEdit').addEventListener('click',()=>{
    document.getElementById('editBag').style.visibility = "hidden";
    location.reload();
  })

  document.getElementById("editreset").addEventListener('click',()=>{
    localStorage.setItem("DaSySt", JSON.stringify(DaSySt));
    addStyle()
  })

function dragassign(){
  const draggableAbsol = document.querySelectorAll('.draggableAbsol');
  const draggableRele = document.querySelectorAll('.draggableRele');
  const getDragSettings = JSON.parse(localStorage.getItem('DaSySt')) || {};


  draggableAbsol.forEach(ele=>{
    var isDragging = false;
    ele.addEventListener('dblclick', () => {
      isDragging = true
      document.addEventListener('mousemove', (e) => {
        if (isDragging) {
        ele.style.left = e.pageX- window.scrollX + 10+ 'px';
        ele.style.top = e.pageY- window.scrollY +10 + 'px';;
      }
    });
    document.addEventListener('click', () => {
      isDragging = false;
      const key = ele.id;
      getDragSettings.settings[key].top = ele.style.top;
      getDragSettings.settings[key].left = ele.style.left;
      localStorage.setItem('DaSySt', JSON.stringify(getDragSettings));
    });
  });
  
})

draggableRele.forEach(ele=>{
  var isDragging = false;
  ele.addEventListener('dblclick', (event) => {
    var initialX,initialY;
      initialX = event.clientX ;
      initialY = event.clientY ;
      isDragging = true
    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        ele.style.left = e.clientX- initialX + 'px';
        ele.style.top = e.clientY- initialY +150+ 'px';
      }
    });
    document.addEventListener('click', () => {
      isDragging = false;
      const key = ele.id;
      getDragSettings.settings[key].top = ele.style.top;
      getDragSettings.settings[key].left = ele.style.left;
      localStorage.setItem('DaSySt', JSON.stringify(getDragSettings));
    });
  });
  
});

}