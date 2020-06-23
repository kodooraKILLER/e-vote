  var count=0;
  
  $(document).ready(function(){
                $("#add").click(function(){
                    count++;
                    var sen=$("#cand").val().toLowerCase();
                    
				    $("ul").append("<li class='lister' id='"+sen+"'>"+sen+"</li>")
                    
                 
					$("#cand").val("");
					$(".lister:even").css({"background-color":"white"})
					$(".lister:odd").css({"background-color":"aqua"})
              
    
                })
            
                $("#remove").click(function(){
                    console.log("working");
                    var sen=$("#cand").val().toLowerCase()
                    $("#"+sen).remove();
					count--;
					$("#cand").val("");
					$(".lister:even").css({"background-color":"white"})
					$(".lister:odd").css({"background-color":"aqua"})
              
				})
				
  })
function validate()
{
	var title=document.getElementById("title");
	if(title.value.length==0||title.value.length>=30)
		document.getElementById("error").innerHTML+="<li> Oops! thats a very long/too short title</li>";
	var date_start=document.getElementById("start");
	
	var date_end=document.getElementById("end");
	if(date_start.value==null||date_end.value==null||date_start.value>date_end.value)
	{
		document.getElementById("error").innerHTML+="<li> An election cannot end before beginning !</li>";
	}
	var regex=/^[A-Za-z0-9]+$/;
	var ide=document.getElementById("eid").value;
	if(!(ide.match(regex)&&ide.length>=4&&ide.length<=30))
		document.getElementById("error").innerHTML+="<li> Invalid election ID, please read the guidelines given alongside</li>";
	var pass=document.getElementById("pass").value;
	var conf=document.getElementById("conf").value;
	if(pass!=conf||conf.length==0||pass.length<4||pass.length>30)
		document.getElementById("error").innerHTML+="<li> Either the passwords dont match, or the password is of inappropriate length</li>";
	if(count<=1) document.getElementById("error").innerHTML+="<li> The number of candidates for election must be atleast 2</li>";
	

}

function chk()
{
document.getElementById("end").value=document.getElementById("start").value
document.getElementById("end").disabled = true	;

}