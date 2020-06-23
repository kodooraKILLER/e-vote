
  $(document).ready(function(){
                $(".box").click(function(){
                    $(".box").css({"background-image":"linear-gradient(brown,magenta)","color":"white"});
					
					$(this).css({"background-image":"linear-gradient(orange,yellow)","color":"black"});
					var abc=$(this).text();
					$("article").css({"display":"none"});
					$("#"+abc).css({"display":"inline-block"});
					
					
					
    
                })
            
				
  })