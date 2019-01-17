let display = "";
let value = "";
let numLength = 0;
let decimal=false;
let operated=false;
let equals=false;

function numPress(y){
  if(numLength<9 || y===undefined || (operated===true && equals===false)){
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
    if(number!=0 && equals===true && operated===false){
      clearAll();
    }
    if(display==="."){
      display="0.";
    }
    if(p.innerHTML==="0" && equals===false){
      display="";
      numLength=0;
    }
    if(p.innerHTML==="0" && operated===false){
      value="";
    }
    if(y!==undefined){
      operated=false
    }
    if(operated===false){
      value+=number;
    }
    if(equals===false){
      display+=number;
      numLength+=1;
    }
    if(number!=0){
      equals=false
    }
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
  }else if(numLength>=9 && y!==undefined && !(operated===true && equals===false)){
    if(decimal===false){
      value=Number(value)*10+Number(y);
      value=Number(value).toExponential(5);
    }
    numLength+=1;
    display=value;
    operated=false;
    equals=false;
    document.getElementById("display").innerHTML=display;
  }
}

function clearAll(operation){
  display="";
  numlength=0;
  let operated2=operated;
  let equals2=equals;
  if(operation!==undefined){
    operated=true;
    equals=false;
  }
  numPress();
  if(operation===undefined){
    value=""
    operated=false;
    equals=false;
    decimal=false;
    numLength=0;
    display="0";
    document.getElementById("display").innerHTML="0";
  }else{
    if(operated2==true && equals2==false){
      value=value.substring(0,value.length-1);
    }
    value+=operation;
  }
}

function useDecimal(){
  operated=false;
  equals=false;
  let p = document.getElementById("display");
  if(decimal===false && numLength<9){
    display+="."
    p.innerHTML+=".";
    decimal=true;
    value+=".";
  }
}

function evaluate1(){
  let x=String(eval(value))
  if(Math.abs(Math.log(Math.abs(x))/Math.log(10))>=9 && x!=0){
    x=Number(x).toExponential(5);
  }else{
    if(Math.abs(x)>1 && x*Math.pow(10,8-Math.floor(Math.log(x)/Math.log(10)))%1>0){
      x=Number(x).toFixed(8-Math.floor(Math.log(x)/Math.log(10)));
      x=parseFloat(x);
    }else if(x*Math.pow(10,8-Math.floor(Math.log(x)/Math.log(10)))%1>0){
      x=Number(x).toFixed(8);
      x=parseFloat(x);
      if(x=0){
        x="0";
      }
    }
  }
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
