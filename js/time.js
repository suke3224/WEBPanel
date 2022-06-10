function  getD1(){
    var date=new Date();
    var d1=date.toLocaleString();
    var div1=document.getElementById("times");
    div1.innerHTML =d1;

}
//显示实时时间
setInterval("getD1();",1000);
//容器id里加上times