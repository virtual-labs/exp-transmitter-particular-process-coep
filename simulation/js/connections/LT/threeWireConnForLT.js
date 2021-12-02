

threeWireConnForLT = function(appId, type,jsonarray){
/* var reader = new draw2d.io.json.Reader();
 reader.unmarshal(canvas1, json); */
 
 psToSuplyPlus_LT = 0, signToSignPlus_LT  = 0, psToTransMinus_LT = 0, transToSignMinus_LT = 0;
 wrongConnection_3wireLT = 0;
 

 
 var temp = JSON.parse(jsonarray);

 var temp1 = 0;
	 

	 
$.each(temp , function (key, value) {
  if(value.type == "draw2d.Connection"){
	  
	temp1 = 1; 
   
 }
 
});
	 
	 

	 if(temp1 != 0){
		 
		   for(i= 0; i < temp.length; i++){
		 
		if(temp[i].type == "draw2d.Connection"){
		 
		 
		 if((temp[i].source.port == "psPlus" &&  temp[i].target.port) == "LT_threeWireTransSuplyPlus" || ( temp[i].source.port == "LT_threeWireTransSuplyPlus"  &&  temp[i].target.port == "psPlus" )){
			
			psToSuplyPlus_LT = 1;
			
	 
		} else if(( temp[i].source.port == "sgnlplus" &&  temp[i].target.port == "LT_threeWireTransSigPlus" ) || ( temp[i].source.port == "LT_threeWireTransSigPlus" && temp[i].target.port == "sgnlplus")){
			
			signToSignPlus_LT = 1;
			
		} else if(( temp[i].source.port == "psMinus" &&  temp[i].target.port == "LT_threeWireTransMinus" ) || ( temp[i].source.port == "LT_threeWireTransMinus" && temp[i].target.port == "psMinus")){
			
			psToTransMinus_LT = 1;
			
		}else if(( temp[i].source.port == "sgnlMinus" &&  temp[i].target.port == "LT_threeWireTransMinus" ) || ( temp[i].source.port == "LT_threeWireTransMinus" && temp[i].target.port == "sgnlMinus")){
			
			transToSignMinus_LT = 1;
			
		}else{
			
			wrongConnection_3wireLT = 1;
			CheckWrongConnection_3wireLT();
			break;
			
		}
		 
		 
	 }
		
 }

		CheckRightConnection_3wireLT();
		 
	 }else{
		 
		 alertify.alert("Alert","Connect atleast one wire");
		 $(".ajs-header").css("background-color","#ce6058");
		 
	 }
	
 

 
}

CheckRightConnection_3wireLT = function(){
	
	if(psToSuplyPlus_LT == 1 && signToSignPlus_LT == 1 && psToTransMinus_LT == 1 && transToSignMinus_LT == 1 && wrongConnection_3wireLT == 0){
		
		alertify.alert('Success!!',"Correct Connection. Please click next level");
		$(".ajs-header").css("background-color","#4CAF50");
		app.toolbar.characterisation_Button.show();
	//	app.toolbar.characterisation_Button.hide();
		rightConn = 1;
	}else{
		
		if(wrongConnection_3wireLT == 0){

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

  CheckWrongConnection_3wireLT = function(){
	

	
						
						
						 if(ConnFlagCnt == 3){
							 app.toolbar.hintButton.show();
							 
							 alertify.alert("Alert","Wrong Connection");
							 $(".ajs-header").css("background-color","#ce6058");
							 rightConn = 0;
							 
													
						}else{
			
							if(wrongConnection_3wireLT == 1){
		
								alertify.alert("Alert","Wrong Connection");
								 $(".ajs-header").css("background-color","#ce6058");
							ConnFlagCnt++;
							rightConn = 0;
							}
						}
	
	
	
	
}
	
	
	
	
