
fourWireConnForTT = function(appId, type,jsonarray){
/* var reader = new draw2d.io.json.Reader();
 reader.unmarshal(canvas1, json); */
 
 transToSignlPlus_TT = 0, psToTransSuplyPlus_TT  = 0, psToTransSuplyMinus_TT = 0, transSignToSignMinus_TT = 0;
 wrongConnection_4wireTT = 0;
 

 
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
		 
		 
		 if((temp[i].source.port == "TT_fourWireTransSigPlus" &&  temp[i].target.port) == "sgnlplus" || ( temp[i].source.port == "sgnlplus" &&  temp[i].target.port == "TT_fourWireTransSigPlus" )){
			
			transToSignlPlus_TT = 1;
			
	 
		} else if(( temp[i].source.port == "psPlus" &&  temp[i].target.port == "TT_fourWireTransSuplyPlus" ) || ( temp[i].source.port == "TT_fourWireTransSuplyPlus" && temp[i].target.port == "psPlus")){
			
			psToTransSuplyPlus_TT = 1;
			
		} else if(( temp[i].source.port == "psMinus" &&  temp[i].target.port == "TT_fourWireTransSuplyMinus" ) || ( temp[i].source.port == "TT_fourWireTransSuplyMinus" && temp[i].target.port == "psMinus")){
			
			psToTransSuplyMinus_TT = 1;
			
		}else if(( temp[i].source.port == "sgnlMinus" &&  temp[i].target.port == "TT_fourWireTransSigMinus" ) || ( temp[i].source.port == "TT_fourWireTransSigMinus" && temp[i].target.port == "sgnlMinus")){
			
			transSignToSignMinus_TT = 1;
			
		}else{
			
			wrongConnection_4wireTT = 1;
			CheckWrongConnection_4wireTT();
			break;
			
		}
		 
		 
	 }
		
 }

		CheckRightConnection_4wireTT();
		 
	 }else{
		 
		 alertify.alert("Alert","Connect atleast one wire");
		 $(".ajs-header").css("background-color","#ce6058");
		 
	 }
	
 

 
}

CheckRightConnection_4wireTT = function(){
	
	if(transToSignlPlus_TT == 1 && psToTransSuplyPlus_TT == 1 && psToTransSuplyMinus_TT == 1 && transSignToSignMinus_TT == 1 && wrongConnection_4wireTT == 0){
		
		alertify.alert('Success!!',"Correct Connection. Please click next level");
		 $(".ajs-header").css("background-color","#4CAF50");
		app.toolbar.characterisation_Button.show();
	//	app.toolbar.characterisation_Button.hide();
		rightConn = 1;
	}else{
		
		if(wrongConnection_4wireTT == 0){

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

CheckWrongConnection_4wireTT = function(){
	
	
	
						if(ConnFlagCnt == 3){
							 app.toolbar.hintButton.show();
							 
							 alertify.alert("Alert","Wrong Connection");
							 $(".ajs-header").css("background-color","#ce6058");
							 
							 rightConn = 0;
													
						}else{
			
							if(wrongConnection_4wireTT == 1){
		
								alertify.alert("Alert","Wrong Connection");
								 $(".ajs-header").css("background-color","#ce6058");
							ConnFlagCnt++;
							rightConn = 0;
		
							}
						}
	
	
}
	
	
	
	
