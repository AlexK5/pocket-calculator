let display = "";
let value = "";
let numLength = 0;
let decimal=false;
let operated=false;
let equals=false;

function numPress(y){
  if(numLength<9 || y===undefined){
    var number;
    if(y===undefined){
      number=0;
    }else{
      number=String(y);
    }
    let p = document.getElementById("display");
    let displayList=[];
    let displayList2=[];
    let decimalSetting=false;
    let iDigits=0;
    if(p.innerHTML==="0"){
      display="";
      numLength=0;
    }
    if(p.innerHTML==="0" && operated===false){
      value="";
    }
    if(y!==undefined){
      operated=false;
    }
    if(operated===false){
      value+=number;
    }
    if(equals===false){
      display+=number;
      numLength+=1;
    }
    equals=false;
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
      if(decimal===true && decimalSetting===false){
        if(displayList[displayList2.length-i]=="."){
          decimalSetting=true;
        }
        if(decimalSetting===true){
          iDigits=i
        }
      }else{
        if((i-iDigits)%4==3 && i>0){
          displayList.splice(displayList2.length-i,0,",");
        }
      }
    }
    display="";
    for(let i = 0; i<displayList.length; i++){
      display+=displayList[i];
    }
    p.innerHTML=display;
  }
}

function clearAll(operation){
  display="";
  numlength=0;
  if(operation!==undefined){
    operated=true;
    equals=false;
  }
  numPress();
  if(operation===undefined){
    value=""
    operated=false;
    equals=false;
  }else{
    value+=operation
  }
}

function useDecimal(){
  operated=false;
  equals=false;
  let p = document.getElementById("display");
  display+="."
  if(decimal===false){
    p.innerHTML+=".";
    decimal=true;
  }
}

function evaluate1(){
  let x=eval(value)
  operated=true;
  equals=true;
  let p = document.getElementById("display");
  p.innerHTML=String(x);
  display=String(x);
  if(String(x).includes('.')){
    decimal=true;
  }
  else{
    decimal=false;
  }
  numLength=p.innerHTML.length;
  numPress();
}
