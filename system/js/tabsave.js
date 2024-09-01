document.getElementById('tabsaver').addEventListener('click',()=>{
  document.getElementById('saveTab').style.display = "inline-flex";

  //getting tabs
  getAllOpendTabs();
  showSavedTab()


})

document.getElementById('closeSave').addEventListener('click',()=>{
  document.getElementById('saveTab').style.display = "none";
  getpopfav()
})



let tablist;

//fetching tab and addcollection
function getAllOpendTabs(){
  chrome.tabs.query({}, function(tabs) {
    //creating tab item
    tablist = document.getElementById('tablist');
    tablist.innerHTML=""
    for (let i = 0; i < tabs.length; i++) {           
      const tab = tabs[i];
      if(tab.title !=="Cassiopeia ~ Home" && tab.title !== "Realm 3D"){
        const tabli = createTabElement(tab);
        tablist.appendChild(tabli);
      }
    }
//adding button feature
    document.querySelector('#newCollection').addEventListener('click',()=>{
      document.getElementById('addCollection').style.display="block"
      let tablistli = document.querySelectorAll('#tablist li');
      tablistli.forEach(ele=>{
        ele.click()
      })
      let cllinp = document.getElementById('collectName')
      cllinp.select();
    })
  });
}




//adding collection and tabs

document.getElementById('collform').addEventListener('submit', (e) => {
  e.preventDefault()
  const addedTabs = document.querySelectorAll('#tabsavelist li');
  let cllinp = document.getElementById('collectName');
  const getTab = JSON.parse(localStorage.getItem('SvTb')) || [];
  const indexToUpdate = getTab.findIndex(coll => coll.name === cllinp.value);
  var favorit = false
  if (indexToUpdate !== -1) {
    favorit= getTab[indexToUpdate].favorites;
    getTab.splice(indexToUpdate, 1);
    // favorit = getTab[indexToUpdate].favorites
    localStorage.setItem("SvTb", JSON.stringify(getTab));     
  }
    const newCollection = {
      name: cllinp.value,
      tabs: [],
      favorites:favorit
    };
    addedTabs.forEach(tabli => {
      const tab = {
        title: tabli.querySelector('p').textContent,
      url: tabli.querySelector('img').getAttribute('data-url'), 
      favIconUrl: tabli.querySelector('img').src
    };
    newCollection.tabs.push(tab);
  });
  cllinp.value = ""
  cllinp.readOnly = false
  getTab.push(newCollection);
  localStorage.setItem("SvTb", JSON.stringify(getTab));
  document.getElementById('addCollection').style.display="none"
  showSavedTab()
  document.querySelector('#tabsavelist').innerHTML=""
  getAllOpendTabs();
})

function generateRandomId() {
  const length = 12;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomId = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters.charAt(randomIndex);
  }

  return randomId;
}


function showSavedTab(){
  let alcol = document.querySelector('.allCollection')
  alcol.innerHTML=""
  document.querySelector('#cattab').innerHTML=""
  let favtab = document.querySelector('#favtab');
  favtab.innerHTML=""
  const getTab = JSON.parse(localStorage.getItem('SvTb')) || [];

  getTab.forEach(element => {
    let collhead = document.createElement('div');
    collhead.classList.add('collHead')
    let mainheadr = document.createElement('div')
    mainheadr.classList.add('mainheadr');
    let heading = document.createElement('h1');
    heading.innerHTML = `${capitFL(element.name)}`
    
    let editbtn = document.createElement('img');
    editbtn.src = "https://img.icons8.com/ios/30/FFFFFF/edit--v1.png"
    editbtn.style.marginLeft = "20px"
    editbtn.addEventListener('click',()=>{
      let editnamefrm = document.createElement('form');
      let inpeditname = document.createElement('input');
      inpeditname.type = "text";
      inpeditname.value = element.name
      inpeditname.select()
      editnamefrm.appendChild(inpeditname)

      editnamefrm.addEventListener('submit',(e)=>{
        e.preventDefault();
        element.name = inpeditname.value;
        localStorage.setItem("SvTb", JSON.stringify(getTab));
        alcol.innerHTML = "";
        document.querySelector('#favtab').innerHTML=""
        showSavedTab()
      })
      heading.innerHTML=""
      heading.appendChild(editnamefrm)
    })
    editbtn.style.display="none"
    heading.addEventListener('mouseover',()=>{
      editbtn.style.display="inline-flex" 
    })
    heading.addEventListener('mouseout',()=>{
      editbtn.style.display="none" 
    })
    heading.appendChild(editbtn)
    mainheadr.appendChild(heading)

    let optdiv = document.createElement('div')
    optdiv.classList.add('optdiv')

    let sclbtn = document.createElement('img');
    sclbtn.src = "https://img.icons8.com/ios/50/FFFFFF/expand-arrow--v2.png"
    let openbtn = document.createElement('img');
    openbtn.src = "https://img.icons8.com/ios/30/FFFFFF/external-link-squared.png"
    let tbbtn = document.createElement('img');
    tbbtn.src = "https://img.icons8.com/ios/30/FFFFFF/tab.png"
    let delbtn = document.createElement('img');
    delbtn.src = "https://img.icons8.com/external-inkubators-detailed-outline-inkubators/25/FA5252/external-delete-email-inkubators-detailed-outline-inkubators.png";
    let likebtn = document.createElement('img');
    likebtn.src = "https://img.icons8.com/ios/50/FF0096/like--v1.png";
    let addbtn = document.createElement('img');
    addbtn.src = "	https://img.icons8.com/ios/50/FFFFFF/plus-math--v1.png";
    let favbtn = document.createElement('img');
    
    optdiv.appendChild(sclbtn);
    optdiv.appendChild(addbtn);
    optdiv.appendChild(tbbtn)
    optdiv.appendChild(openbtn)
    
    optdiv.appendChild(delbtn)
    optdiv.appendChild(favbtn)
    optdiv.appendChild(likebtn)

    //gercateg
    let isadd=false;
    addbtn.addEventListener('click',()=>{
      if (!isadd) {
        addbtn.src = "https://img.icons8.com/ios/30/FFFFFF/minus-math.png"
        sclbtn.style.transform = "rotate(180deg)"
        colldata.style.display = 'block';
        
      document.getElementById('addCollection').style.display="block"
      let storedTab = element.tabs;
      storedTab.forEach(ele=>{
        const tabli = createTabElement(ele);
        tablist.appendChild(tabli);
        tabli.click()
      })
      
      let cllinp = document.getElementById('collectName')      
      cllinp.value = element.name
      cllinp.readOnly = true;
      cllinp.select;
      isadd=true
    }else{
      addbtn.src = "	https://img.icons8.com/ios/50/FFFFFF/plus-math--v1.png";
      document.getElementById('addCollection').style.display="none";
      document.getElementById('tabsavelist').innerHTML=""
      let cllinp = document.getElementById('collectName') 
      cllinp.readOnly = false;
      cllinp.value = ""
      isadd=false
      getAllOpendTabs();
    }
      
    })
    
    getcateg(element.name)
    if(element.favorites){
      favbtn.src = "https://img.icons8.com/ios/30/FFD300/add-to-favorites--v1.png"
      getfavColl(element.name)
    }
    else{
      favbtn.src = "https://img.icons8.com/ios/30/FFFFFF/add-to-favorites--v1.png"
    }

    

    favbtn.addEventListener('click',()=>{
      if(element.favorites){
        element.favorites = false;
      }else{
        element.favorites =true
      }
      localStorage.setItem("SvTb", JSON.stringify(getTab));
      alcol.innerHTML = ""
      document.querySelector('#favtab').innerHTML=""
      document.querySelector('#popfavtab').innerHTML=""
      showSavedTab()

    })
    sclbtn.addEventListener('click',()=>{
      if (colldata.style.display === 'none') {
  
        sclbtn.style.transform = "rotate(180deg)"
        colldata.style.display = 'block';
      } else {
        sclbtn.style.transform = "rotate(0deg)"
        colldata.style.display = 'none';
       
      }
    })

    let allTab = element.tabs;
    openbtn.addEventListener('click', () => {
      if (allTab.length > 0) {
        const firstTab = allTab[0];
        chrome.windows.create({
          url: firstTab.url,
          type: "normal"
        }, function(window) {
          for (let i = 1; i < allTab.length; i++) {
            chrome.tabs.create({
              url: allTab[i].url,
              windowId: window.id
            });
          }
        });
      }
    });

    tbbtn.addEventListener('click', () => {
      chrome.tabs.query({ currentWindow: true, active: true }, function (activeTabs) {
        const currentTab = activeTabs[0];
        for (let i = 0; i < allTab.length; i++) {
          if (i === 0) {
            chrome.tabs.update(currentTab.id, { url: allTab[i].url });
          } else {
            chrome.tabs.create({ url: allTab[i].url });
          }
        }
      });
    });

    delbtn.addEventListener('click',()=>{
      const indexToRemove = getTab.findIndex(coll => coll.name === element.name);
      if (indexToRemove !== -1) {
        getTab.splice(indexToRemove, 1);
        localStorage.setItem("SvTb", JSON.stringify(getTab));
        showSavedTab()
      }
    })
    mainheadr.appendChild(optdiv);
    collhead.appendChild(mainheadr)
    let colldata = document.createElement('div');
    colldata.classList.add('collData')
    colldata.style.display = 'none'
    let taball = document.createElement('ul');
      allTab.forEach(tab =>{
        const tabsli = document.createElement('li');
        tabsli.innerHTML = `<p><img src="${tab.favIconUrl}" alt="">${tab.title}</p> `
        
        let remimg = document.createElement('img')
        remimg.src = "https://img.icons8.com/ios/30/FFFFFF/tab.png"
        remimg.style.display="none" 
        remimg.id="delColl"
        tabsli.appendChild(remimg)


        taball.appendChild(tabsli)

        tabsli.addEventListener('click',(e)=>{
          if(!remimg.contains(e.target)){
            chrome.tabs.create({ url: tab.url });
          }
        })
        tabsli.addEventListener('mouseover',()=>{
          remimg.style.display="block" 
        })
        tabsli.addEventListener('mouseout',()=>{
          remimg.style.display="none" 
        })
      })
      colldata.appendChild(taball);
      collhead.appendChild(colldata)

      
    mainheadr.addEventListener('click',(e)=>{
      let get = optdiv;
      if (!get.contains(e.target)) {
      if (colldata.style.display === 'none') {
  
        sclbtn.style.transform = "rotate(180deg)"
        colldata.style.display = 'block';
      } else {
        sclbtn.style.transform = "rotate(0deg)"
        colldata.style.display = 'none';
       
      }}
    })

    alcol.appendChild(collhead)
    
  });
}

function getcateg(ele) {
  let favtab = document.querySelector('#cattab');
    const favtabli = document.createElement('li');
      var favpElement = document.createElement('p');
      var favtextNode = document.createTextNode(ele);
      favpElement.appendChild(favtextNode);
      var tabfav = document.createElement('img');
      tabfav.width = 25;
      tabfav.height = 25;
      tabfav.src = 'https://img.icons8.com/ios/30/AAAAAA/visible--v1.png';

      favtabli.addEventListener('click',()=>{
        scrollToCollection(ele)
      })
      favtabli.appendChild(favpElement);
      favtabli.appendChild(tabfav);
      favtab.appendChild(favtabli)
}

function getfavColl(ele) {
  let favtab = document.querySelector('#favtab');
  // let popfavtab = document.querySelector('#popfavtab');

    const favtabli = document.createElement('li');
    
      var favpElement = document.createElement('p');
    
      var favtextNode = document.createTextNode(ele);
    
      favpElement.appendChild(favtextNode);
      
      var favtabadsbbtn = document.createElement('img');
      favtabadsbbtn.width = 25;
      favtabadsbbtn.height = 25;
      favtabadsbbtn.src = 'https://img.icons8.com/ios/30/AAAAAA/visible--v1.png';

      favtabli.addEventListener('click',()=>{
        scrollToCollection(ele)
      })
      favtabli.appendChild(favpElement);
      favtabli.appendChild(favtabadsbbtn);
      // popfavtab.appendChild(favtabli)
      favtab.appendChild(favtabli)
}

// getpopfav()

getpopfav()
function getpopfav() {
  const getTab = JSON.parse(localStorage.getItem('SvTb')) || [];
  let popfavtab = document.querySelector('#popfavtab');
  popfavtab.innerHTML=""
  getTab.forEach(ele => {
    if(ele.favorites){

      const favtabli = document.createElement('li');
      
      var favpElement = document.createElement('p');

      var optdiv = document.createElement('div');

      
      var favtextNode = document.createTextNode(ele.name);
      
      favpElement.appendChild(favtextNode);
      
      var popfav = document.createElement('img');
      popfav.width = 25;
      popfav.height = 25;
      popfav.src = 'https://img.icons8.com/ios/30/FFFFFF/tab.png';
      
      var tabpopfav = document.createElement('img');
      tabpopfav.width = 25;
      tabpopfav.height = 25;
      tabpopfav.src = '	https://img.icons8.com/ios/30/FFFFFF/external-link-squared.png';
      
      let tabd = ele.tabs;
      popfav.addEventListener('click',()=>{
          for (let i = 0; i < tabd.length; i++) {
            chrome.tabs.create({ url: tabd[i].url });
          }
      })
      
      tabpopfav.addEventListener('click', () => {
        if (tabd.length > 0) {
          const firstTab = tabd[0];
          chrome.windows.create({
            url: firstTab.url,
            type: "normal"
          }, function(window) {
            for (let i = 1; i <tabd.length; i++) {
              chrome.tabs.create({
                url: tabd[i].url,
                windowId: window.id
              });
            }
          });
        }
      });
      // favtabli.addEventListener('click',()=>{
        //   scrollToCollection(ele)
        // })
        favtabli.appendChild(favpElement);
        optdiv.appendChild(popfav);
        optdiv.appendChild(tabpopfav);
        favtabli.appendChild(optdiv);
        
        popfavtab.appendChild(favtabli)
      }
      })
}



function createTabElement(tab){
    const tabli = document.createElement('li');
      // var colarray = ["#ff000012","#ff00cd17","#c000ff1f","#0100ff1c","#0062ff1a","#ff4b0014"]
      // var randomColor = colarray[Math.floor(Math.random() * colarray.length)];
      var pElement = document.createElement('p');
      // tabli.style.background = randomColor;
      var imgElement1 = document.createElement('img');   
      imgElement1.src = tab.favIconUrl;
      imgElement1.setAttribute('data-url', tab.url);

      var textNode = document.createTextNode(tab.title);
      
      pElement.appendChild(imgElement1);  
      pElement.appendChild(textNode);
      
      var tabadsbbtn = document.createElement('img');
      tabadsbbtn.width = 30;
      tabadsbbtn.height = 30;
      tabadsbbtn.id="tabiopt"
      tabadsbbtn.src = 'https://img.icons8.com/ios/50/FFFFFF/plus-math--v1.png';

      tabli.appendChild(pElement);
      tabli.appendChild(tabadsbbtn);
        
      let isadd = false;
      tabli.addEventListener('click',addElement);
      
      let tabtoclone = tabli
      function addElement(){
  document.getElementById('addCollection').style.display="block"
  tabtoclone.querySelector('#tabiopt').src = " https://img.icons8.com/ios/30/FFFFFF/minus-math.png";
  let clonedTabli = tabtoclone.cloneNode(true);
  clonedTabli.removeEventListener('click', addElement);
  clonedTabli.addEventListener('click',function removeElement(){
    clonedTabli.remove()
    
    if(document.getElementById('tabsavelist').innerHTML==""){
      document.getElementById('addCollection').style.display="none"
    }
    // console.log(document.getElementById('tabsavelist'));
    var  againcloned = clonedTabli;
    tabtoclone = againcloned 
    againcloned.querySelector('#tabiopt').src="https://img.icons8.com/ios/50/FFFFFF/plus-math--v1.png"
    againcloned.addEventListener('click',addElement)
    tablist.appendChild(againcloned)
  })
  
  document.getElementById('tabsavelist').appendChild(clonedTabli);    
  tabtoclone.remove()
let cllinp = document.getElementById('collectName')
cllinp.select();
      }
      return tabli
}



document.getElementById('searchbar').addEventListener('input',()=>{
    const searchValue = searchbar.value.trim().toLowerCase();
    const collections = document.querySelectorAll('.collHead');
    collections.forEach(collection=>{
      const collectionTitle = collection.querySelectorAll('h1')
      collectionTitle.forEach(ele=>{
        const textEle = ele.textContent.trim().toLowerCase();
        if(textEle.includes(searchValue)){
          collection.style.display = 'block';
        }else {
          collection.style.display = 'none';
        }
      })
    })
})


//scrolltoconection
function scrollToCollection(collectionName) {
    const collections = document.querySelectorAll('.collHead');
    collections.forEach(collection => {
      const collectionTitle = collection.querySelector('h1').textContent;
      if (collectionTitle === capitFL(collectionName)) {
        collection.scrollIntoView({ behavior: 'smooth' });
      }
    });
}
  

