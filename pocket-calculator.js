function numPress(number){
  let p = document.getElementById("display");
  let list=[];
  if(p.innerHTML=="0"){
    p.innerHTML="";
  }
  p.innerHTML+=number;
  for(let i = 0; i<p.innerHTML.length; i++){
    if(p.innerHTML[i]!=","){
      if(list.length%4==3){
        list.push(",");
      }
      list.push(p.innerHTML[i]);
    }
  }
  p.innerHTML="";
  let j;
  for(j in list){
    p.innerHTML+=list[j];
  }
}
