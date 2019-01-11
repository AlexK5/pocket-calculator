let display = "";
let value = "";
let numLength = 0;
let decimal=false;

function numPress(y){
  if(numLength<9 || y===undefined){
    let number;
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
  numPress();
  if(operation===undefined){
    value=""
  }else{
    value+=operation
  }
}

function useDecimal(){
  let p = document.getElementById("display");
  display+="."
  if(decimal===false){
    p.innerHTML+=".";
    decimal=true;
  }
}

function evaluate1(){
  console.log(value);
  let p = document.getElementById("display");
  p.innerHTML=String(eval(value))
  value=String(eval(value))
  if(value.includes('.')){
    decimal=true;
  }
  else{
    decimal=false;
  }
  numLength=p.innerHTML.length();
  numPress();
}
