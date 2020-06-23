function f()
{
document.write("hello world");
var a, exam_result;
var a_mark,b_mark,c_mark;
a=prompt("Enter mark 1");
if(a!=null && a!="")a_mark=parseInt(a);

b=prompt("Enter mark 2");
if(a!=null && a!="")b_mark=parseInt(a);
c=prompt("Enter mark 3");
if(a!=null && a!="")c_mark=parseInt(a);
exam_result=a+b+c;
document.getElementById("display").innerHTML=exam_result;
}