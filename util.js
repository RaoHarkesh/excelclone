function solveformula(formula , selectedcellobj){
    // console.log("hello1");    
    let formulacomps = formula.split(" ");
    console.log(formulacomps.length);
    for(let i=0; i<formulacomps.length; i++){
        let formulaele = formulacomps[i];
        if(formulaele[0]>='A'&& formulaele[0]<='Z'){
            let {rowId,colId} = getRowIdColIdFromAddress(formulaele);
            let cellObject = db[rowId][colId];
            let value = cellObject.value;
            formula = formula.replace(formulaele,value);
            if(selectedcellobj){
                cellObject.children.push(selectedcellobj.Name);
                selectedcellobj.parent.push(cellObject.Name);
            }
            
            // console.log(cellObject);
            // console.log("hello");
        }
        
    }
    
    let computedValue = eval(formula);
        
        return computedValue;
}
function breakrelations(cellobj){
   let hisparentarray= cellobj.parent;
   for(let i=0; i<hisparentarray.length; i++){
       let singleparent = hisparentarray[i];
       let {rowId ,colId} = getRowIdColIdFromAddress(singleparent);
        let parentobj=db[rowId][colId];
        let updatechild= parentobj.children.filter(function(child){
            return child!=cellobj.Name;
        })
        parent.children=updatechild;
    } 
    cellobj.parent = [];
}
function updatechildren(parentcellobj){
    for(i=0; i<parentcellobj.children.length; i++){
       let childname = parentcellobj.children[i];
       
       let { rowId , colId} = getRowIdColIdFromAddress(childname);
       let childobj = db[rowId][colId];
    //    console.log(childobj);
       let newvalue = solveformula(childobj.formula);
       let childcellatui = document.querySelector(`div[rowid='${rowId}'][colid='${colId}']`);
       childcellatui.textContent= newvalue;
       childobj.value = newvalue;
       updatechildren(childobj);
    }
}
// function getRowIdColIdFromElement(element){
//     let rowId  = element.getAttribute("rowid");
//     let colId = element.getAttribute("colid");
//     return {
//         rowId,
//         colId
//     }
// }
function getRowIdColIdFromAddress(address){
    
    let colId = address.charCodeAt(0)-65;
    let rowId = Number(address.substring(1))-1;
    return {
        rowId,
        colId
    };
} 