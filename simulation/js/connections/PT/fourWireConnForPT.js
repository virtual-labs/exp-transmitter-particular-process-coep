
fourWireConnForPT = function(appId, type,jsonarray){
/* var reader = new draw2d.io.json.Reader();
 reader.unmarshal(canvas1, json); */
 
 transToSignlPlus_PT = 0, psToTransSuplyPlus_PT  = 0, psToTransSuplyMinus_PT = 0, transSignToSignMinus_PT = 0;
 wrongConnection_4wirePT = 0;
 

 
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
		 
		 
		 if((temp[i].source.port == "PT_fourWireTransSigPlus" &&  temp[i].target.port) == "sgnlplus" || ( temp[i].source.port == "sgnlplus" &&  temp[i].target.port == "PT_fourWireTransSigPlus" )){
			
			transToSignlPlus_PT = 1;
			
	 
		} else if(( temp[i].source.port == "psPlus" &&  temp[i].target.port == "PT_fourWireTransSuplyPlus" ) || ( temp[i].source.port == "PT_fourWireTransSuplyPlus" && temp[i].target.port == "psPlus")){
			
			psToTransSuplyPlus_PT = 1;
			
		} else if(( temp[i].source.port == "psMinus" &&  temp[i].target.port == "PT_fourWireTransSuplyMinus" ) || ( temp[i].source.port == "PT_fourWireTransSuplyMinus" && temp[i].target.port == "psMinus")){
			
			psToTransSuplyMinus_PT = 1;
			
		}else if(( temp[i].source.port == "sgnlMinus" &&  temp[i].target.port == "PT_fourWireTransSigMinus" ) || ( temp[i].source.port == "PT_fourWireTransSigMinus" && temp[i].target.port == "sgnlMinus")){
			
			transSignToSignMinus_PT = 1;
			
		}else{
			
			wrongConnection_4wirePT = 1;
			CheckWrongConnection_4wirePT();
			break;
			
		}
		 
		 
	 }
		
 }

		CheckRightConnection_4wirePT();
		 
	 }else{
		 
		 alertify.alert("Alert","Connect atleast one wire");
		 $(".ajs-header").css("background-color","#ce6058");
		 
	 }
	
 

 
}

CheckRightConnection_4wirePT = function(){
	
	if(transToSignlPlus_PT == 1 && psToTransSuplyPlus_PT == 1 && psToTransSuplyMinus_PT == 1 && transSignToSignMinus_PT == 1 && wrongConnection_4wirePT == 0){
		
		alertify.alert('Success!!',"Correct Connection. Please click next level");
		$(".ajs-header").css("background-color","#4CAF50");
		app.toolbar.characterisation_Button.show();
	//	app.toolbar.characterisation_Button.hide();
		rightConn = 1;
	}else{
		
		if(wrongConnection_4wirePT == 0){

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

CheckWrongConnection_4wirePT = function(){
	

	
						if(ConnFlagCnt == 3){
							 app.toolbar.hintButton.show();
							 
							 alertify.alert("Alert","Wrong Connection");
							 $(".ajs-header").css("background-color","#ce6058");
							 rightConn = 0;
							 
													
						}else{
			
							if(wrongConnection_4wirePT == 1){
		
								alertify.alert("Alert","Wrong Connection");
								 $(".ajs-header").css("background-color","#ce6058");
							ConnFlagCnt++;
							rightConn = 0;
		
							}
						}
	
}
	
	
	
	
