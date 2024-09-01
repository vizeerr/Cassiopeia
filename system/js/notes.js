
const editor = new EditorJS({
    holder: "editorjs",
    placeholder: "Write a new note...",
    autofocus:true,
    tools: {
        header:{

            class:Header,
            shortcut: 'CMD+SHIFT+H',
            defaultLevel: 2,
            placeholder: 'Type a Heading',
            defaultAlignment: 'left',
            allowAnchor: true,
        anchorLength: 100,
        },
        toggle: {
          class: ToggleBlock,
          inlineToolbar: true,
        },
        embed: {
          class: Embed,
          config: {
            services: {
              youtube: true,
            }
          }
        },
        list:{
            class: NestedList,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+k',
            config: {
            defaultStyle: 'unordered'
            },
        },
        code:{
            class: CodeTool,
            shortcut: 'CMD+SHIFT+{',
        },
        checklist: {
            shortcut: 'CMD+SHIFT+c',
            class: Checklist,
            inlineToolbar: true,
          },
          delimiter: {
            class: Delimiter,
            shortcut: 'CMD+SHIFT+.',
            },
          image: SimpleImage,
          paragraph: {
            shortcut: 'CMD+SHIFT+p',
            class: Paragraph,
            inlineToolbar: true,
            defaultAlignment: 'left',
            allowAnchor: true,
        anchorLength: 100,
        },
        image: {
          class: InlineImage,
          inlineToolbar: true,
          config: {
            embed: {
              display: true,
            },
            unsplash: {
              appName: 'your_app_name',
              clientId: 'your_client_id'
            }
          }
        },
        linkTool: {
          class: LinkTool,
          config: {
            endpoint: 'http://localhost:8008/fetchUrl', // Your backend endpoint for url data fetching,
          }
        },
        table: {
          class: Table,
          inlineToolbar: true,
          config: {
            rows: 2,
            cols: 3,
          },
        },
    } 

  });


  document.getElementById('pagesaver').addEventListener('click',()=>{
    document.getElementById('notesbag').style.display = "inline-flex";
  
   getpages()

  
  })
  
  // document.getElementById('closeSave').addEventListener('click',()=>{
  //   document.getElementById('saveTab').style.display = "none";
  //   getpopfav()
  // })
  
  

  

  document.getElementById('createnote').addEventListener('click',()=>{
    document.querySelector('.innerContainer').style.display="block"
    document.querySelector('.bottomarea').style.display="flex"
    document.querySelector("#mainTabHead").style.display="flex"
    document.getElementById("pagerender").style.display = "none"
    document.getElementById("hellCont").style.display = "none"
  })


  document.getElementById('savenote').addEventListener('click',()=>{
    editor.save().then((outputData) => {
        const getNotes = JSON.parse(localStorage.getItem('SvNo')) || [];
        const newCollection = {
            name: outputData.blocks[0].data.text,
            data:outputData.blocks,
            favorites:false,
            categories:"vivek"
          };
          getNotes.push(newCollection);
          localStorage.setItem("SvNo", JSON.stringify(getNotes));
          getpages();
      }).catch((error) => {
        console.log('Saving failed: ', error)
      });
  })



  const getNotes = JSON.parse(localStorage.getItem('SvNo')) || [];
        console.log(getNotes);


function getpages(){
    const getNotes = JSON.parse(localStorage.getItem('SvNo')) || [];
    const pagnotes = document.getElementById('pagnotes')
    pagnotes.innerHTML=""
    getNotes.forEach(ele=>{
      const favtabli = document.createElement('li');
    
      var favpElement = document.createElement('p');
    
      var favtextNode = document.createTextNode(ele.name);
    
      favpElement.appendChild(favtextNode);
      
      var favtabadsbbtn = document.createElement('img');
      favtabadsbbtn.width = 25;
      favtabadsbbtn.height = 25;
      favtabadsbbtn.src = 'https://img.icons8.com/ios/30/AAAAAA/visible--v1.png';
      
      favtabli.addEventListener('click',()=>{
        document.querySelector('.mainTabHead').style.display="none"
        document.getElementById("hellCont").style.display = "none"
        const contentContainer = document.getElementById("pagerender");
        contentContainer.innerHTML="";

        const pageconfigbutton = document.createElement('div');
        pageconfigbutton.className = 'pageconfigbutton';
        
        // Create the inner div element
        const pagefunctions = document.createElement('div');
        pagefunctions.className = 'pagefunctions';
        
        // Create the first image element
        const favtab = document.createElement('img');
        favtab.width = 30;
        favtab.height = 30;
        if(ele.favorites){
          favtab.src = 'https://img.icons8.com/ios/30/FFD300/add-to-favorites--v1.png';
        }else{
          
          favtab.src = "https://img.icons8.com/ios/30/FFFFFF/add-to-favorites--v1.png"
        }
        
        // Create the second image element
        const liketab = document.createElement('img');
        liketab.width = 30;
        liketab.height = 30;
        liketab.src = 'https://img.icons8.com/metro/30/FFFFFF/like.png';
        liketab.alt = 'like';
        
        const edittab = document.createElement('img');
        edittab.width = 30;
        edittab.height = 30;
        edittab.src = 'https://img.icons8.com/ios/50/FFFFFF/edit--v1.png';
        edittab.alt = 'edit--v1';

        const deltab = document.createElement('img');
        deltab.width = 30;
        deltab.height = 30;
        deltab.src = 'https://img.icons8.com/ios-glyphs/30/FFFFFF/filled-trash.png';
        deltab.alt = 'filled-trash';

        favtab.addEventListener('click',()=>{
          if(ele.favorites){
            ele.favorites = false;
            favtab.src = "https://img.icons8.com/ios/30/FFFFFF/add-to-favorites--v1.png"
          }else{
            ele.favorites =true
            favtab.src = 'https://img.icons8.com/ios/30/FFD300/add-to-favorites--v1.png';
          }
          localStorage.setItem("SvNo", JSON.stringify(getNotes));
        })

        deltab.addEventListener('click',()=>{
          const indexToRemove = getNotes.findIndex(coll => coll.name === ele.name);
      if (indexToRemove !== -1) {
        getNotes.splice(indexToRemove, 1);
        localStorage.setItem("SvNo", JSON.stringify(getNotes));
        getpages();
      }
        })

        // liketab.addEventListener('click',()=>{
        //   if(ele.like){
        //     ele.favorites = false;
        //     favtab.src = "https://img.icons8.com/ios/30/FFFFFF/add-to-favorites--v1.png"
        //   }else{
        //     ele.favorites =true
        //     favtab.src = 'https://img.icons8.com/ios/30/FFD300/add-to-favorites--v1.png';
        //   }
        //   localStorage.setItem("SvNo", JSON.stringify(getNotes));
        // })
        let readmode = true,focus = false;
        edittab.addEventListener('click',()=>{
          readmode = false;
          focus = true;
          contentContainer.innerHTML="";
          renderContent()
        })

        renderContent()
        function renderContent(){
        pagefunctions.appendChild(favtab);
        pagefunctions.appendChild(liketab);
        pagefunctions.appendChild(edittab);
        pagefunctions.appendChild(deltab);

        pageconfigbutton.appendChild(pagefunctions);

        contentContainer.appendChild(pageconfigbutton)

        
          contentContainer.style.display = "block"
        document.querySelector("#mainTabHead").style.display="none"
        document.querySelector('.innerContainer').style.display="none"
        const data = ele.data;
        const savedData={
          "blocks": data
        };

        const newrender = new EditorJS({
          holder: "pagerender",
          data : savedData,
          readOnly:readmode,
          autofocus :focus,
          tools: {
            header:{
    
                class:Header,
                shortcut: 'CMD+SHIFT+H',
                defaultLevel: 2,
                placeholder: 'Type a Heading',
                defaultAlignment: 'left',
                allowAnchor: true,
            anchorLength: 100,
            },
            toggle: {
              class: ToggleBlock,
              inlineToolbar: true,
            },
            embed: {
              class: Embed,
              config: {
                services: {
                  youtube: true,
                }
              }
            },
            list:{
                class: NestedList,
                inlineToolbar: true,
                shortcut: 'CMD+SHIFT+k',
                config: {
                defaultStyle: 'unordered'
                },
            },
            code:{
                class: CodeTool,
                shortcut: 'CMD+SHIFT+{',
            },
            checklist: {
                shortcut: 'CMD+SHIFT+c',
                class: Checklist,
                inlineToolbar: true,
              },
              delimiter: {
                class: Delimiter,
                shortcut: 'CMD+SHIFT+.',
                },
              image: SimpleImage,
              paragraph: {
                shortcut: 'CMD+SHIFT+p',
                class: Paragraph,
                inlineToolbar: true,
                defaultAlignment: 'left',
                allowAnchor: true,
            anchorLength: 100,
            },
            image: {
              class: InlineImage,
              inlineToolbar: true,
              config: {
                embed: {
                  display: true,
                },
                unsplash: {
                  appName: 'your_app_name',
                  clientId: 'your_client_id'
                }
              }
            },
            linkTool: {
              class: LinkTool,
              config: {
                endpoint: 'http://localhost:8008/fetchUrl', // Your backend endpoint for url data fetching,
              }
            },
            table: {
              class: Table,
              inlineToolbar: true,
              config: {
                rows: 2,
                cols: 3,
              },
            },
        } 
        })
        }
        
        
        
      })
      favtabli.appendChild(favpElement);
      favtabli.appendChild(favtabadsbbtn);
      // popfavtab.appendChild(favtabli)
      pagnotes.appendChild(favtabli)
    })
  }

