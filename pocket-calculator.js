let display = "";
let value = "";
let numLength = 0;
let decimal=false;
let operated=false;
let equals=false;
let lastNum="";
let lastOp=["",""];
let percent=false;
let ops=["+","-","*","/"];
let secondNum="0";
let error=false;

function listify(someString){
  let someList=[];
  for(let i = 0; i<someString.length; i++){
    someList.push(someString[i]);
  }
  return(someList);
}

function delineate(){
  let p = document.getElementById("display")
  let displayList=[];
  let displayList2=[];
  let decimalSetting=false;
  let iDigits=0;
  if(display.length>2 && display[0]==="-" && display[1]=="0" && display[2]!=="."){
    display="-"+display.substring(2);
  }
  for(let i = 0; i<display.length; i++){
    displayList.push(display[i]);
  }
  let x = displayList.length
  for(let i = 0; i<x; i++){
    if(displayList[x-i-1]==","){
      displayList.splice(x-i-1,1);
    }
  }
  let j=0;
  while(displayList[j]!="." && j<displayList.length){
    j++;
  }
  x = displayList.length+Math.floor((j-1)/3);
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
  if(displayList[0]==","){
    displayList.shift();
  }
  if(displayList[0]=="-" && displayList[1]==","){
    displayList[1]="-";
    displayList.shift();
  }
  display="";
  for(let i = 0; i<displayList.length; i++){
    display+=displayList[i];
  }
  p.innerHTML=display;
}

function replaceLast(){
  if(Number(lastNum)<0){
    lastNum=`(${lastNum})`
  }
  while(isNaN(value[value.length-1])==false || value[value.length-1]=="." || value[value.length-1]=="e" || (value[value.length-1]=="+" && value[value.length-2]=="e") || value[value.length-1]==")" || "InfinityErrorNaN".includes(value[value.length-1]) || value[value.length-1]=="(" || (value[value.length-1]=="-" && (value[value.length-2]=="(" || (value.length===1 && lastNum<=0) || value[value.length-2]=="e" || ops.includes(value[value.length-2]))) && value!=""){
    if(isNaN(value[value.length-1])==false || value[value.length-1]=="." || value[value.length-1]=="e" || (value[value.length-1]=="+" && value[value.length-2]=="e") || value[value.length-1]==")" || "InfinityErrorNaN".includes(value[value.length-1]) || value[value.length-1]=="(" || (value[value.length-1]=="-" && (value[value.length-2]=="(" || (value.length===1 && lastNum<=0) || value[value.length-2]=="e" ||  ops.includes(value[value.length-2])))){
      value=value.substring(0,value.length-1);
    }
  }
  value=`${value}${lastNum}`;
}

function numPress(y){
  let z = value.length;
  for(let i = 0; i<z; i++){
    if(value[y-i-1]==0 && value[z-i-2]=="-"){
      value=value.substring(0,z-i-1)+value.substring(z-i);
    }
  }
  if(numLength<9 || y===undefined || (operated===true && equals===false)){
    var number;
    if(y===undefined){
      number=0;
    }else{
      number=String(y);
    }
    if(y!==undefined && equals===true){
      clearAll();
    }
    let p = document.getElementById("display");
    if(display==="."){
      display="0.";
      numLength+=1
    }
    if(p.innerHTML==="0" && equals===false){
      display="";
      numLength=0;
    }
    if(p.innerHTML==="0" && operated===false){
      value="";
      lastNum="";
      lastOp[1]=lastNum;
    }
    if(y!==undefined){
      operated=false
    }
    if(operated===false){
      if(lastNum[0]=="(" && lastNum[lastNum.length-1]==")"){
        lastNum=lastNum.substring(0,lastNum.length-1)+number+")";
        lastOp[1]=lastNum;
        replaceLast();
      }else{
        value+=number;
        lastNum+=number;
        lastOp[1]+=number;
      }
    }
    if(equals===false){
      display+=number;
      numLength+=1;
    }
    if(number!=0){
      equals=false
    }
    if(error===false){
      delineate();
    }
  }else if(numLength>=9 && y!==undefined && !(operated===true && equals===false)){
    if(y!==undefined && equals===true || error===true){
      clearAll();
      numPress(y);
      lastNum=lastNum.substring(0,lastNum.length-1);
      lastOp[1]=lastNum;
      replaceLast();
    }
    if(decimal===false){
      if(lastNum[0]=="(" && lastNum[lastNum.length-1]==")"){
        lastNum=lastNum.substring(1,lastNum.length-1);
        lastNum=String(Number(lastNum)*10+y);
        lastNum=`(${lastNum})`;
      }else{
        lastNum=String(Number(lastNum)*10+y);
      }
      lastOp[1]=lastNum;
      replaceLast();
    }
    numLength+=1;

    if(lastNum[0]=="(" && lastNum[lastNum.length-1]==")"){
      lastNum=lastNum.substring(1,lastNum.length-1);
    }
    if(Math.abs(Number(lastNum))>=999999999.5){
      display=String(Number(lastNum).toExponential(5));
    }
    if(Math.abs(Number(lastNum))>=Math.pow(10,100)-0.5 || Math.abs(Number(lastNum))<Math.pow(10,-99) && lastNum!=0){
      equals=true;
      operated=true;
      decimal=false;
      percent=false;
      error=true;
      lastNum="Error";
      lastOp[1]=lastNum;
      display="Error";
    }
    if(Number(lastNum)<0){
      lastNum=`(${lastNum})`;
    }
    lastOp[1]=lastNum;
    operated=false;
    equals=false;
    percent=false
    document.getElementById("display").innerHTML=display;
  }
}

function clearAll(operation){
  display="";
  numLength=0;
  let operated2=operated;
  let equals2=equals;
  if(operation!==undefined){
    replaceLast();
    secondNum=lastNum;
    operated=true;
    equals=false;
    decimal=false;
    percent=false;
    lastNum="";
    lastOp[1]=lastNum;
    numLength=0;
    lastOp[0]=operation;
    if(error===true){
      error=false
    }
  }
  if(error===false){
   numPress();
  }
  if(operation===undefined){
    secondNum="0";
    value=""
    lastNum="";
    lastOp[1]=lastNum;
    operated=false;
    equals=false;
    decimal=false;
    percent=false;
    numLength=0;
    display="0";
    lastOp=["",""];
    error=false;
    document.getElementById("display").innerHTML="0";
  }else{
    if(operated2==true && equals2==false){
      value=value.substring(0,value.length-1);
    }
    value+=operation;
  }
}

function useDecimal(){
  if(equals===true){
    clearAll();
  }
  operated=false;
  equals=false;
  percent=false;
  let p = document.getElementById("display");
  if(decimal===false && numLength<9){
    display+="."
    p.innerHTML+=".";
    decimal=true;
    value+=".";
    lastNum+=".";
    lastOp[1]=lastNum;
  }
}

function evaluate1(){
  replaceLast();
  let y = value.length;
  for(let i = 0; i<y; i++){
    if(value[y-i-1]==0 && value[y-i-2]=="-"){
      value=value.substring(0,y-i-1)+value.substring(y-i);
    }
  }
  for(let j = 0; j<y; j++){
    if(value[y-j-1]=="-" && value[y-j]=="(" && value[y-j+1]=="-"){
      value=value.substring(0,y-j-1)+value.substring(y-j);
    }
  }
  if(equals==true && percent===false){
    if(lastOp[0]!="" && lastOp[1]!=""){
      value+=lastOp[0]+lastOp[1];
    }
  }
  if(operated===true && equals===false){
    value+=secondNum;
    lastNum=secondNum;
    lastOp[1]=secondNum;
  }
  if(ops.includes(value[0])){
    value="0"+value;
  }
  let x=String(eval(value));
  value=x;
  lastNum=value;
  if(Number(value)<0){
    value=`(${value})`;
  }
  if(Math.abs(x)>=999999999.5 || Math.abs(x)<0.000001 && x!=0){
    x=Number(x).toExponential(5);
  }else{
    x=Number(x)*10/10;
    if(Math.abs(x)>1 && x*Math.pow(10,8-Math.floor(Math.log(Math.abs(x))/Math.log(10)))%1!=0){
      x=Number(x).toFixed(8-Math.floor(Math.log(Math.abs(x))/Math.log(10)));
      x=parseFloat(x);
    }else if(x*Math.pow(10,8)%1!=0 || x==0){
      x=Number(x).toFixed(8);
      x=parseFloat(x);
      if(x===0){
        x="0";
      }
    }else{
      x=x*Math.pow(10,8-Math.floor(Math.log(Math.abs(x))/Math.log(10)))/Math.pow(10,8-Math.floor(Math.log(Math.abs(x))/Math.log(10)));
    }
  }
  operated=true;
  equals=true;
  percent=false;
  if(Math.abs(Number(lastNum))>=Math.pow(10,100)-0.5 || Math.abs(Number(lastNum))<Math.pow(10,-99) && lastNum!=0 || isNaN(Number(lastNum))===true){
    equals=true;
    operated=true;
    decimal=false;
    percent=false;
    error=true;
    lastNum="Error";
    lastOp[1]=lastNum;
    x="Error";
  }
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
  if(p.innerHTML.includes('.')){
    numLength--;
  }
  if(p.innerHTML.includes('-')){
    numLength--;
  }
  numPress();
}

function percentage(){
  if(display=="0." || display=="-0."){
    lastNum=0;
    lastOp[1]=lastNum;
  }
  if(lastNum[0]=="(" && lastNum[1]=="-" && lastNum[lastNum.length-1]==")"){
    lastNum=lastNum.substring(1,lastNum.length-1);
    lastOp[1]=lastNum;
  }
  if(lastNum.includes("e")){
    let k=0;
    let partOne="";
    let partTwo="";
    let mode;
    let negative;
    lastNum=String(Number(lastNum).toExponential(5));
    while(lastNum[k]!=="e"){
      if(isNaN(lastNum[k])===false || lastNum[k]=="-"){
        partOne+=lastNum[k];
      }
      k++;
    }
    k+=2;
    if(lastNum[k-1]=="+"){
      mode="+";
    }else{
      mode="-";
    }
    while(k<lastNum.length){
      if(isNaN(lastNum[k])==false){
        partTwo+=lastNum[k];
      }
      k++;
    }
    if(mode==="+"){
      for(let j=0; j<partTwo-5; j++){
        partOne+=0;
      }
    }else{
      if(negative===true){
        partOne=partOne.substring(1);
      }
      for(let j=0; j<partTwo-1; j++){
        partOne=`0${partOne}`;
      }
      partOne=`0.${partOne}`;
      if(negative===true){
        partOne=`-${partOne}`;
      }
    }
    lastNum=partOne;
  }
  if(Math.abs(Number(lastNum))>=999999999.5){
    if(listify(lastNum).indexOf(".")==-1){
      lastNum=lastNum.substring(0,lastNum.length-2)+"."+lastNum.substring(lastNum.length-2);
      lastOp[1]=lastNum;
    }else{
      lastNum=lastNum.substring(0,listify(lastNum).indexOf(".")-2)+"."+lastNum.substring(listify(lastNum).indexOf(".")-2,listify(lastNum).indexOf("."))+lastNum.substring(listify(lastNum).indexOf(".")+1);
      lastOp[1]=lastNum;
    }
  }else if(Math.abs(Number(lastNum))<0.0001 && lastNum!=0){
    if(lastNum>0){
      lastNum="0.00"+lastNum.substring(2);
      lastOp[1]=lastNum;
    }else{
      lastNum="-0.00"+lastNum.substring(3);
      lastOp[1]=lastNum;
    }
  }else{
    lastNum=String(Number(lastNum)*0.01);
    lastOp[1]=lastNum;
  }
  let x = lastNum;
  if(Math.abs(x)>999999999.5 || Math.abs(x)<0.000001 && x!=0){
    x=Number(x).toExponential(5);
  }else{
    x=(Number(x)*10)/10;
    lastNum=String(x);
    lastOp[1]=lastNum;
    if(Math.abs(x)>1 && x*Math.pow(10,8-Math.floor(Math.log(Math.abs(x))/Math.log(10)))%1!=0){
      x=Number(x).toFixed(8-Math.floor(Math.log(Math.abs(x))/Math.log(10)));
      x=parseFloat(x);
    }else if(x*Math.pow(10,8)%1!=0 || x==0){
      x=Number(x).toFixed(8);
      x=parseFloat(x);
      if(x===0){
        x="0";
      }
    }else{
      x=x*Math.pow(10,8-Math.floor(Math.log(Math.abs(x))/Math.log(10)))/Math.pow(10,8-Math.floor(Math.log(Math.abs(x))/Math.log(10)));
    }
  }
  if((Math.abs(Number(lastNum))>=Math.pow(10,100)-0.5 || Math.abs(Number(lastNum))<Math.pow(10,-99) && lastNum!=0) || isNaN(x)===true){
    equals=true;
    operated=true;
    decimal=false;
    percent=false;
    error=true;
    lastNum="Error";
    lastOp[1]=lastNum;
    x="Error";
  }
  display=String(x);
  if(display.includes(".")){
    decimal=true;
  }else{
    decimal=false;
  }
  replaceLast();
  if(decimal===true){
    numLength--;
  }
  if(display.includes('-')){
    numLength--;
  }
  if(lastNum[0]=="(" && lastNum[1]=="-" && lastNum[lastNum.length-1]==")"){
    lastNum=lastNum.substring(1,lastNum.length-1);
    lastOp[1]=lastNum;
  }
  if((Math.abs(Number(lastNum))<999999999.5 && Math.abs(Number(lastNum))>=0.000001) || lastNum==0){
    delineate();
  }else{
    document.getElementById("display").innerHTML=display;
  }
  if(Number(lastNum)<0){
    lastNum=`(${lastNum})`;
    lastOp[1]=lastNum;
    replaceLast();
  }
  operated=true;
  equals=true;
  percent=true;
}

function plusMinus(){
  if(error===true){
    clearAll();
  }
  if(ops.includes(value[value.length-1])){
    if(document.getElementById("display").innerHTML=="0"){
      numLength--;
    }
    else{
      numLength++;
    }
  }
  if(lastNum[0]==="(" && lastNum[lastNum.length-1]===")"){
    if(Number(lastNum.substring(1,lastNum.length-1))<0){
      lastNum=lastNum.substring(1,lastNum.length-1);
      lastOp[1]=lastNum;
    }
  }
  lastNum=String(Number(lastNum)*-1);
  if(equals===false){
    lastOp[1]=String(Number(lastNum)*-1);
  }
  let x = lastNum;
  if(Math.abs(x)>=999999999.5 || Math.abs(x)<0.000001 && x!=0){
    x=Number(x).toExponential(5);
  }else{
    x=(Number(x)*10)/10;
    lastNum=String(x)
    if(equals===false){
      lastOp[1]=lastNum;
    }
    if(Math.abs(x)>1 && x*Math.pow(10,8-Math.floor(Math.log(Math.abs(x))/Math.log(10)))%1!=0){
      x=Number(x).toFixed(8-Math.floor(Math.log(Math.abs(x))/Math.log(10)));
      x=parseFloat(x);
    }else if(x*Math.pow(10,8)%1!=0 || x==0){
      x=Number(x).toFixed(8);
      x=parseFloat(x);
      if(x===0){
        x="0";
      }
    }else{
      x=x*Math.pow(10,8-Math.floor(Math.log(Math.abs(x))/Math.log(10)))/Math.pow(10,8-Math.floor(Math.log(Math.abs(x))/Math.log(10)));
    }
  }
  lastNum=String(x);
  if(equals===false){
    lastOp[1]=lastNum;
  }
  if(display==="-0"){
    lastNum="0";
    lastOp[1]=lastNum;
  }else if(lastNum==="0" || lastNum===""){
    lastNum="-0";
    lastOp[1]=lastNum;
  }
  if(display==="0." || display==="."){
    lastNum="-0.";
    lastOp[1]=lastNum;
    replaceLast();
  }else if(display==="-0."){
    lastNum="0.";
    lastOp[1]=lastNum;
    replaceLast();
  }
  display=lastNum;
  if(Number(lastNum)<0){
    lastNum=`(${lastNum})`;
    if(equals===false){
      lastOp[1]=lastNum;
    }
  }
  replaceLast();
  if((Math.abs(Number(display))<999999999.5 && Math.abs(Number(display))>=0.000001) || display==0){
    delineate();
  }else{
    document.getElementById("display").innerHTML=display;
  }
}
