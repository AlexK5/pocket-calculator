let display = [0];
let display2=[0];
let value = "";
function numPress(y){
  let number=String(y)
  let p = document.getElementById("display");
  let list=[];
  let numLength;
  if(p.innerHTML=="0"){
    p.innerHTML="";
    display=[];
    display2=[]
  }
  display=display2
  display.push(number);
  display2=display;
  value+=number;
  numLength+=1;
  for(let i = 0; i<display.length; i++){
    if(display[i]==","){
      display.splice(i,1);
    }
  }
  for(let j = 0; j<display.length; j++){
    if((numLength-j)%3==0 && numLength>j){
      display.splice(j,0,",");
    }
  }
  display.push("");
  let x = display.length;
  for(let k = 0; k<x-1; k++){
    display[x-1]+=display[k];
    display=display[x-1];
}
  p.innerHTML=display;
}
