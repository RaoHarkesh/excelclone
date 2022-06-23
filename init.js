let cellcontainer = document.querySelector(".cell-container");
let formulainputdiv = document.querySelector("#formula");
function cellinit(){
    let cell = " <div class='topleftcell'></div> ";
    // code for top row which has ABCD...
    cell+=" <div class='toprow'> ";
    for(let i=0 ; i<26 ; i++){
        cell+= `<div class='toprowcells ' trid="${i}">${String.fromCharCode(65+i)}</div>` ;
    }
    cell+=" </div> " ;
    // code for top row closed
    //code for left col which h 1234...
    cell+=" <div class='leftcol'> " ; 
    for(let i=0 ; i<100; i++){
        cell+=  `<div class='leftcolcells' lcid="${i}">${i+1}</div>` 
    }
    cell +=" </div> " ;
    //code for 2600 cells
    cell+= " <div class='allcells'> "; 
    for(let i=0; i<100; i++){
        cell+= " <div class='row'> ";
        for(let j=0 ; j<26; j++){
            cell+= ` <div class='cell' rowid='${i}' colid='${j}' contentEditable></div> `;
        }
        cell+=" </div> ";
    }
    cell+= " </div> ";
    cellcontainer.innerHTML = cell;
}
cellinit();
let db=[];
let sheetsdb=[];
let visitedcells;
function initdb(){
    let newsheetdb=[];
    for(let i=0; i<100; i++){
        let row = [];
        for(let j=0; j<26; j++){
            let name= String.fromCharCode(65+j) + (i+1) + "";
            let cellobj ={
                Name: name,
                Value: "",
                formula:"",
                children:[],
                parent:[],
                visited: false,
                fontstyle: {bold:false, italic:false, underline:false},
                color:{red:false,blue:false,green:false,yellow:false }
            };
            row.push(cellobj)
        }
        newsheetdb.push(row);
    }
    visitedcells=[];
    db=newsheetdb;
    sheetsdb.push({db: newsheetdb, visitedarray: visitedcells});
    console.log(sheetsdb.length);
}
initdb();