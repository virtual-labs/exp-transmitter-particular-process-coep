

twoWireConnForLT = function(appId, type,jsonarray){
/* var reader = new draw2d.io.json.Reader();
 reader.unmarshal(canvas1, json); */
 
 psToTransPlus_LT = 0, signToTransMinus_LT  = 0, psToSignMinus_LT = 0;
 wrongConnection_2wireLT = 0;
 // app  = new example.Application(appId, type);

 
 var temp = JSON.parse(jsonarray);
 
// console.log(temp);
 
 var temp1 = 0;
	 

	 
$.each(temp , function (key, value) {
  if(value.type == "draw2d.Connection"){
	  
	temp1 = 1; 
   
 }
 
});
	 
	 

	 if(temp1 != 0){
		 
		   for(i= 0; i < temp.length; i++){
		 
		if(temp[i].type == "draw2d.Connection"){
		 
		 
		 if((temp[i].source.port == "psPlus" &&  temp[i].target.port) == "LT_twowireTransPlus" || ( temp[i].source.port == "LT_twowireTransPlus"  &&  temp[i].target.port == "psPlus" )){
			
			psToTransPlus_LT = 1;
			
	 
		} else if(( temp[i].source.port == "sgnlplus" &&  temp[i].target.port == "LT_twowireTransMinus" ) || ( temp[i].source.port == "LT_twowireTransMinus" && temp[i].target.port == "sgnlplus")){
			
			signToTransMinus_LT = 1;
			
		} else if(( temp[i].source.port == "psMinus" &&  temp[i].target.port == "sgnlMinus" ) || ( temp[i].source.port == "sgnlMinus" && temp[i].target.port == "psMinus")){
			
			psToSignMinus_LT = 1;
			
		}else{
			
			wrongConnection_2wireLT = 1;
			CheckWrongConnection_2wireLT();
			break;
			
		}
		 
		 
	 }
		
 }

		CheckRightConnection_2wireLT();
		 
	 }else{
		 
		 alertify.alert("Alert","Connect atleast one wire");
		 $(".ajs-header").css("background-color","#ce6058");
		 
	 }
	
 

 
}

CheckRightConnection_2wireLT = function(){
	
	if(psToTransPlus_LT == 1 && signToTransMinus_LT == 1 && psToSignMinus_LT == 1 && wrongConnection_2wireLT == 0){
		alertify.alert('Success!!',"Correct Connection. Please click next level");
		$(".ajs-header").css("background-color","#4CAF50");alertify.alert("Correct Connection. Please click next level");
		app.toolbar.characterisation_Button.show();
//		app.toolbar.characterisation_Button.hide();
	    rightConn = 1;
		
	}else{
		
		if(wrongConnection_2wireLT == 0){

		
					if(ConnFlagCnt == 3){
							app.toolbar.hintButton.show();							
							alertify.alert("Alert","Wrong Connection");
							 $(".ajs-header").css("background-color","#ce6058");
							rightConn = 0;		
						}else{
							
							alertify.alert("Alert","Wrong Connection");
							 $(".ajs-header").css("background-color","#ce6058");
							ConnFlagCnt++
							rightConn = 0;
						}
		
			
			
		}
		
		
	}
	
}

  CheckWrongConnection_2wireLT = function(){
	
	
	                    if(ConnFlagCnt == 3){
							 app.toolbar.hintButton.show();
							 
							 alertify.alert("Alert","Wrong Connection");
							 $(".ajs-header").css("background-color","#ce6058");
							 rightConn = 0;
							 
													
						}else{
			
							if(wrongConnection_2wireLT == 1){
		
								alertify.alert("Alert","Wrong Connection");
								 $(".ajs-header").css("background-color","#ce6058");
							ConnFlagCnt++;
							rightConn = 0;
		
							}
						}
	
	
	
	
	
	
	
}
	
	
	
	
