let addbtn = document.querySelector(".add-icon");
let sheetid=0;
let sheetlist=document.querySelector(".sheets-list");
let firstsheet=document.querySelector(".active-sheet")
sheetlistner(firstsheet);
addbtn.addEventListener("click",function(){
  sheetid++;
  let activesheet=document.querySelector(".active-sheet");
  activesheet.classList.remove("active-sheet");
  let newsheet=document.createElement("div");
  newsheet.classList.add("sheet");
  newsheet.classList.add("active-sheet");
  newsheet.setAttribute("sheetid",sheetid);
  newsheet.innerText=`sheet ${sheetid+1}`;
  sheetlist.appendChild(newsheet);
  initdb();
  reinitui();
  sheetlistner(newsheet);
})

function sheetlistner(sheet){
    sheet.addEventListener("click",function(){
        if(sheet.classList.contains("active-sheet")){
            return;
        }
        let activesheet=document.querySelector(".active-sheet");
         activesheet.classList.remove("active-sheet");
         
         sheet.classList.add("active-sheet");
         let sheetid=sheet.getAttribute("sheetid");
         let prevvisitedcell=[];
         prevvisitedcell=visitedcells;
         db=sheetsdb[sheetid].db;
         visitedcells=sheetsdb[sheetid].visitedarray;
        
         reinituibyvisitedcell(prevvisitedcell);
        // reinitui();
         setui();
    })
   
}

function setui(){
    console.log(visitedcells);
   for(let i=0; i<visitedcells.length; i++){
      let {rowId,colId}=visitedcells[i];
    let cellobj=document.querySelector(`[rowid="${rowId}"][colid="${colId}"]`);
      cellobj.innerText=db[rowId][colId].Value;
    
   }
}

function reinitui(){
     for(let i=0; i<100; i++){
         for(let j=0; j<26; j++){
             let cell=document.querySelector(`div[rowid='${i}'][colid='${j}']`);
             cell.innerText="";
         }
     }
    
 }
 function reinituibyvisitedcell(prevvisitedcell){
        for(let i=0; i<prevvisitedcell.length; i++){
            let {rowId,colId}=prevvisitedcell[i];
           let cellobjatui=document.querySelector(`[rowid="${rowId}"][colid="${colId}"]`);
           cellobjatui.innerText="";
        }   
 }