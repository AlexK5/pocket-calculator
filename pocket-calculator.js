let display = "";
let value = "";
let numLength = 0;

function numPress(y){
  if(numLength<9){
    let number;
    if(y===undefined){
      number=0;
    }else{
      number=String(y);
    }
    let p = document.getElementById("display");
    let displayList=[];
    let displayList2=[];
    if(p.innerHTML==="0"){
      display="";
      value="";
      numLength=0;
    }
    display+=number;
    value+=number;
    numLength+=1;
    for(let i = 0; i<display.length; i++){
      displayList.push(display[i]);
    }
    let x = displayList.length;
    for(let i = 0; i<x; i++){
      if(displayList[x-i-1]==","){
        displayList.splice(x-i-1,1);
      }
    }
    displayList2=displayList;
    for(let i = 0; i<x; i++){
      if(i%4==3 && i>0){
        displayList.splice(displayList2.length-i,0,",");
      }
    }
    display="";
    for(let i = 0; i<displayList.length; i++){
      display+=displayList[i]
    }
    console.log(display)
    p.innerHTML=display;
  }
}

function clear(){
  display=""
  value=""

}
