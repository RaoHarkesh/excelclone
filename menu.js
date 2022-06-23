let bold=document.querySelector(".bold");
let italic=document.querySelector(".italic");
let underline=document.querySelector(".under");
let textcolorlist=document.querySelector(".textcolorlist");
let coloricon=document.querySelector(".coloricon");
let colors=document.querySelectorAll(".color");

for(let i=0;i<colors.length; i++){
    colors[i].addEventListener("click",function(){
        let coloris=colors[i].classList[0]; 
        settextcolor(coloris);
    })
}

function settextcolor(selectcolor){
    let {rowid,colid}= getrowidcolid(lastselectedcell);
    lastselectedcellobj=db[rowid][colid];
    if(lastselectedcellobj.color[selectcolor]){
        lastselectedcell.style.color="black";
    }
    else{
        lastselectedcell.style.color=selectcolor;
    }    
    console.log("error");
    lastselectedcellobj.color[selectcolor]=!lastselectedcellobj.color[selectcolor];
}




coloricon.addEventListener("click",function(){
    textcolorlist.classList.toggle("donotdisplay");
})



console.log("menu");
bold.addEventListener("click",function(){
   bold.classList.toggle("active-fontstyle");
    setfontstyle("bold",bold);
})

italic.addEventListener("click",function(){
    italic.classList.toggle("active-fontstyle");
    setfontstyle("italic",italic);
    
})

underline.addEventListener("click",function(){
    underline.classList.toggle("active-fontstyle");
    setfontstyle("underline",underline);
})

function setfontstyle(fontkey,element){
    console.log("hello");
    let {rowid,colid}= getrowidcolid(lastselectedcell);
    lastselectedcellobj=db[rowid][colid];
    if(lastselectedcellobj.fontstyle[fontkey]){
        if(fontkey=="bold"){
            lastselectedcell.style.fontWeight="normal";
            console.log("bold se normal");
        }
        else if(fontkey=="italic"){
            lastselectedcell.style.fontStyle="normal";
            console.log("italic se normal");
        }
        else{
            lastselectedcell.style.textDecoration="none";
            console.log("under se normal");
        }
        console.log("if me");
    }
    else{
        if(fontkey=="bold"){
            lastselectedcell.style.fontWeight="bold";
            console.log("bold se normal ulta");
        }
        else if(fontkey=="italic"){
            lastselectedcell.style.fontStyle="italic";
            console.log("italic se normal ulta");
        }
        else{
            lastselectedcell.style.textDecoration="underline";
            console.log("under se normal ulta");
        }
        console.log("else me");
    }
    lastselectedcellobj.fontstyle[fontkey]=!lastselectedcellobj.fontstyle[fontkey];
}