let toprowdiv = document.querySelector(".toprow");
let leftcoldiv = document.querySelector(".leftcol");
let topleftcelldiv = document.querySelector(".topleftcell");
let addressinput = document.querySelector("#address");
let lastselectedcell;
cellcontainer.addEventListener("scroll",function(e){
    let scrollfromtop = e.target.scrollTop;
    let scrollfromleft = e.target.scrollLeft;
    toprowdiv.style.top= scrollfromtop + "px";
    leftcoldiv.style.left= scrollfromleft +"px";
    topleftcelldiv.style.top = scrollfromtop + "px";
    topleftcelldiv.style.left = scrollfromleft +"px";
})

// rowid colid
let allcells = document.querySelectorAll(".cell");
for(let i=0; i<allcells.length; i++){
    allcells[i].addEventListener("click",function(e){
         let colid = Number(e.target.getAttribute("colid"));
         let rowid =Number(e.target.getAttribute("rowid"));
          address = String.fromCharCode(65+colid) + (rowid + 1) +"";
         addressinput.value = address;
         allcells[i].classList.add("active-cell");
         let cellobj = db[rowid][colid];
         formulainputdiv.value = cellobj.formula;
         cellobj.fontstyle.bold?document.querySelector(".bold").classList.add("active-fontstyle"):
         document.querySelector(".bold").classList.remove("active-fontstyle");
         cellobj.fontstyle.italic?document.querySelector(".italic").classList.add("active-fontstyle"):
         document.querySelector(".italic").classList.remove("active-fontstyle");
         cellobj.fontstyle.underline?document.querySelector(".under").classList.add("active-fontstyle"):
         document.querySelector(".under").classList.remove("active-fontstyle");
         if(lastselectedcell){
             document.querySelector(".highlightedcol").classList.remove("highlightedcol");
             document.querySelector(".highlightedrow").classList.remove("highlightedrow");
         }
         let selectedtoprowcell= document.querySelector(`[trid="${colid}"]`);
         selectedtoprowcell.classList.add("highlightedcol");
         let selectedleftcolcell= document.querySelector(`[lcid="${rowid}"]`);
         selectedleftcolcell.classList.add("highlightedrow");
         
    })
    allcells[i].addEventListener("blur",function(e){
        let cellvalue = e.target.textContent;
        lastselectedcell = e.target;
        let {rowid , colid} = getrowidcolid(e.target);
        allcells[i].classList.remove("active-cell");
        // let colid = e.target.getAttribute("colid");
        // let rowid = e.target.getAttribute("rowid");
        let cellobj = db[rowid][colid];
        if(cellobj.Value==cellvalue ){
            return;
        }
        cellobj.Value = cellvalue;
        if(cellvalue!="")
        updatechildren(cellobj);
        //////////////////////////////////////////
        // else{
        //     allchilds=cellobj.children;
        //     for(let i=0; i<allchilds.length; i++){
        //         let childone = allchilds[i];
        //         let {rowId ,colId}= ge
        // getRowIdColIdFromAddress(childone);
        //         childobj = db[rowId][colId];
        //         childobj.value="";
        //         childobj.formula="";
        //         let childeleonui = document.querySelector(`div[rowid='${rowId}'][colid='${colId}']`);
        //         childeleonui.textContent="";

        //     }
        //     cellobj.children=[];
        // }
        //////////////////////////////////////////
        // console.log(cellobj);
        formulainputdiv.value = cellobj.formula;
        // console.log(cellobj.formula);
        cellobj.visited=true;
        visitedcells.push({rowId: rowid, colId:colid});
        console.log(visitedcells);

    })
    allcells[i].addEventListener("keydown",function(e){
        if(e.key=='Backspace'){
            let cell = e.target;
            let {rowid,colid} = getrowidcolid(e.target);
            let cellobj= db[rowid][colid];
            if(cellobj.formula!=""){
                cellobj.formula= "";
                formulainputdiv.value="";
                cell.textContent="";
                breakrelations(cellobj);
                console.log(cellobj.parent);               
            }
        }
    })
}
function getrowidcolid(element){
    let rowid = element.getAttribute("rowid");
    let colid = element.getAttribute("colid");
    return{
        rowid,
        colid
    };
}
formulainputdiv.addEventListener("blur",function(e){
    let formula = e.target.value;
    
    if(formula){
      
        let {rowid,colid} = getrowidcolid(lastselectedcell);
      let cellobj = db[rowid][colid];
      if(cellobj.formula){
          breakrelations(cellobj);
      }
      cellobj.formula = formula;
         
       
      let computedanswer = solveformula(formula,cellobj);
    // console.log(computedanswer);
        cellobj.value= computedanswer;
      lastselectedcell.textContent = computedanswer;
         updatechildren(cellobj);
    }
})