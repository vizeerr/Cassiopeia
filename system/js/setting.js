// document.getElementById('footset').addEventListener('mouseover',()=>{
//   document.getElementById('hidediv').style.left = "60px"
//   document.getElementById('hidediv').style.opacity = "1"
// })

// document.getElementById('footset').addEventListener('mouseout',()=>{
//   document.getElementById('hidediv').style.left = "0px"
//   document.getElementById('hidediv').style.opacity = "0"
// })




  
  document.getElementById("setbag").addEventListener('click',(e)=>{
    let get = document.getElementById('settingTab');
    if (!get.contains(e.target)) {
    document.getElementById("setbag").style.visibility="hidden"
    }
  })
  
  
  
let activetabs, prevtab ,tabfixed; 
activetabs = tabfixed;


const settingList = document.getElementById("settingList");

function capitFL(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


document.getElementById('setReset').addEventListener('click',()=>{
  localStorage.setItem("DaSySt", JSON.stringify(DaSySt));
  addStyle()
  settingList.innerHTML='';
  getallSettings()
})

document.getElementById("setico").addEventListener('click',()=>{
  document.getElementById("setbag").style.visibility="visible"
  settingList.innerHTML='';
  getallSettings()
})
function getallSettings(){
  const getSettings = JSON.parse(localStorage.getItem('DaSySt')) || {};
  const tabdata = document.getElementById("tabdata");
for (const key in getSettings.settings) {
  const innerSettings = getSettings.settings[key];
  const li = document.createElement('li');
  li.textContent = capitFL(key);
  li.addEventListener('click', () => {
    prevtab = activetabs
    activetabs = li
    if (activetabs !== prevtab) {
      li.classList.add('activetabs')
      if(prevtab !== undefined){
        prevtab.classList.remove('activetabs')
    
      }
    }
    
    tabdata.innerHTML = `<h1>${capitFL(key)}</h1>`;
    
    for (const entit in innerSettings) {
      let inputElement = '',type='',parsedValue;

      if (entit === 'fontSize') {
        type = "range"
        parsedValue = parseInt(innerSettings[entit], 10);
        inputElement = `<p>Font Size</p> <p class="showVal"> ${parsedValue}</p> <input class="tabselect" type="range" min = "0" max ="300" value="${parseInt(innerSettings[entit], 10)}">`;
      } else if (entit === 'fontWeight') {
        type = "select"
        inputElement = `<p>Font Weight</p> <select class="tabselect">
          <option value="100">100</option>
          <option value="200">200</option>
          <option value="300">300</option>
          <option value="400">400</option>
          <option value="500">500</option>
          <option value="600">600</option>
        </select>`;
        const selectedValue = innerSettings[entit];
        inputElement = inputElement.replace(`value="${selectedValue}"`, `value="${selectedValue}" selected`);
      } else if (entit === 'fontFamily') {
        type = "select"
        inputElement = `<p>Font Family</p>
<select class="tabselect">
    <option value="Beau Rivage, cursive">Beau Rivage</option>
    <option value="Cinzel Decorative, cursive">Cinzel Decorative</option>
    <option value="Cormorant, serif">Cormorant</option>
    <option value="EB Garamond, serif">EB Garamond</option>
    <option value="Flamenco, cursive">Flamenco</option>
    <option value="Great Vibes, cursive">Great Vibes</option>
    <option value="Josefin Sans, sans-serif">Josefin Sans</option>
    <option value="Josefin Slab, serif">Josefin Slab</option>
    <option value="Jost, sans-serif">Jost</option>
    <option value="Kalam, cursive">Kalam</option>
    <option value="Krub, sans-serif">Krub</option>
    <option value="Marcellus, serif">Marcellus</option>
    <option value="Mate SC, serif">Mate SC</option>
    <option value="Poiret One, cursive">Poiret One</option>
    <option value="Poppins, sans-serif">Poppins</option>
    <option value="Raleway, sans-serif">Raleway</option>
    <option value="Space Grotesk, sans-serif">Space Grotesk</option>
    <option value="Tangerine, cursive">Tangerine</option>
    <option value="Tenor Sans, sans-serif">Tenor Sans</option>
    <option value="Voltaire, sans-serif">Voltaire</option>
    <option value="Arial">Arial</option>
    <option value="Times New Roman">Times New Roman</option>
</select>`;
const selectedValue = innerSettings[entit];
inputElement = inputElement.replace(`value="${selectedValue}"`, `value="${selectedValue}" selected`);

      } else if (entit === 'letterSpacing') {
        type = "range"
        inputElement = `<p>Letter Spacing</p> <p class="showVal"> ${parseInt(innerSettings[entit], 10)}</p> <input class="tabselect" type="range" min = "0" max ="80" value="${parseInt(innerSettings[entit], 10)}">`;
      } else if (entit === "color") {
        type = "color"
        inputElement = `<p>Color</p> <p class="showVal"> ${innerSettings[entit]}</p> <input class="tabselect" value="innerSettings[entit]" type="color">`;
      }else if (entit === "visibility") {
        type = "select"
        inputElement = `<p>Visibility</p> <select class="tabselect">
        <option value="visible">Visible</option>
        <option value="hidden">Hidden</option>
        </select>`;
        const selectedValue = innerSettings[entit];
        inputElement = inputElement.replace(`value="${selectedValue}"`, `value="${selectedValue}" selected`); 
      }else if (entit === 'filter') {
        type = "filter"
        inputElement = `<p>Brightness</p> <select class="tabselect">
        <option value="0.1">0.1</option>
    <option value="0.2">0.2</option>
    <option value="0.3">0.3</option>
    <option value="0.4">0.4</option>
    <option value="0.5">0.5</option>
    <option value="0.6">0.6</option>
    <option value="0.7">0.7</option>
    <option value="0.8">0.8</option>
    <option value="0.9">0.9</option>
    <option value="1">1</option>
    <option value="1.1">1.1</option>
    <option value="1.2">1.2</option>
    <option value="1.3">1.3</option>
    <option value="1.4">1.4</option>
    <option value="1.5">1.5</option>
    <option value="1.6">1.6</option>
    <option value="1.7">1.7</option>
    <option value="1.8">1.8</option>
    <option value="1.9">1.9</option>
    <option value="2">2</option>
</select>`;
const selectedValue = innerSettings[entit];
inputElement = inputElement.replace(`value="${selectedValue}"`, `value="${selectedValue}" selected`);
      }

      if (inputElement !== '') {
        const settab = document.createElement('div');
        settab.classList = "tabcont";
        settab.innerHTML = inputElement;
        tabdata.appendChild(settab);
        
        const select = settab.querySelector('.tabselect');

        select.addEventListener('change', () => {
          if(type =="range"){
            const showVal = settab.querySelector('.showVal');
            innerSettings[entit] = select.value+"px";
            showVal.innerHTML = select.value;
          }else if(type=="color"){
            const showVal = settab.querySelector('.showVal');
            innerSettings[entit] = select.value;
            showVal.innerHTML = select.value;
          }else if(type=="filter"){
            innerSettings[entit] = `brightness(${select.value})`;
          }
          else{
            innerSettings[entit] = select.value;
          }
          localStorage.setItem('DaSySt', JSON.stringify(getSettings));
          addStyle()
          
        });
      }
    }
  });

  if(key=="time"){
    li.click()
    li.classList.add('activetabs')
    tabfixed = li
  }
  

  settingList.appendChild(li);
}

}
  
  let  DaSySt= {
    ver:1.0,
    settings:{
      time:{
        visibility:"visible",
        fontSize:"12em",
        fontWeight:"100",
        fontFamily:"Josefin Sans, sans-serif",
        letterSpacing:"0px", 
        color:"#ffffff",
        top:"0px",
        left:"0px",
        position:"relative"
      },
      day:{
        visibility:"visible",
        fontSize:"18px",
        fontWeight:"200",
        letterSpacing:"4px",
        fontFamily:"Josefin Sans, sans-serif",
        color:"#ffffff",
        top:"0px",
        left:"0px",
        position:"relative" 
      },
      sec:{
        visibility:"visible",
        fontSize:"15px",
        fontWeight:"200",
        letterSpacing:"0px",
        fontFamily:"Josefin Sans, sans-serif",
        color:"#ffffff",
        top:"0px",
        left:"0px",
        position:"relative"
      },
      greeting:{
        visibility:"visible",
        fontSize:"2.5em",
        fontWeight:"200",
        letterSpacing:"4px",
        fontFamily:"Josefin Sans, sans-serif",
        color:"#ffffff",
        top:"0px",
        left:"0px",
        position:"relative"
      },
      quote:{
        visibility:"visible",
        fontSize:"25px",
        fontWeight:"200",
        letterSpacing:"4px",
        fontFamily:"Josefin Sans, sans-serif",
        color:"#ffffff",
        top:"0px",
        left:"0px",
        position:"relative"
      },
      horizontal:{
        visibility:"visible",
      },
      name:{
        visibility:"visible",
        fontSize:"9em",
        fontWeight:"400",
        letterSpacing:"8px",
        fontFamily:"Josefin Sans, sans-serif",
        color:"#ffffff",
        top:"0px",
        left:"0px",
        position:"relative"
      },
      wallpaper:{
        visibility:"visible",
        filter:"brightness(0.5)"
      },
      task:{
        visibility:"visible"
      }
    }
  }


  const getStyle = JSON.parse(localStorage.getItem('DaSySt')) || [];
  if(getStyle == "[]"){
    localStorage.setItem("DaSySt", JSON.stringify(DaSySt));
  }
    

