

hartConnForTT = function(appId, type,jsonarray){
/* var reader = new draw2d.io.json.Reader();
 reader.unmarshal(canvas1, json); */
 
 psToConfigPlus_TT = 0, configTohartTransPlus_TT  = 0, psToConfigMinus_TT = 0, configTohartTransMinus_TT = 0;
 wrongConnection_hartTT = 0;
 // app  = new example.Application(appId, type);

 
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
		 
		 
		 if((temp[i].source.port == "psPlus" &&  temp[i].target.port) == "configuratorPlus" || ( temp[i].source.port == "configuratorPlus" &&  temp[i].target.port == "psPlus" )){
			
			psToConfigPlus_TT = 1;
			
	 
		} else if(( temp[i].source.port == "configuratorPlus" &&  temp[i].target.port == "TTPort_hartTransplus" ) || ( temp[i].source.port == "TTPort_hartTransplus" && temp[i].target.port == "configuratorPlus")){
			
			configTohartTransPlus_TT = 1;
			
		} else if(( temp[i].source.port == "psMinus" &&  temp[i].target.port == "configuratorMinu" ) || ( temp[i].source.port == "configuratorMinu" && temp[i].target.port == "psMinus")){
			
			psToConfigMinus_TT = 1;
			
		}else if(( temp[i].source.port == "configuratorMinu" &&  temp[i].target.port == "TTPort_hartTransminus" ) || ( temp[i].source.port == "TTPort_hartTransminus" && temp[i].target.port == "configuratorMinu")){
			
			configTohartTransMinus_TT = 1;
			
		}else{
			
			wrongConnection_hartTT = 1;
			CheckWrongConnection_hartTT();
			break;
			
		}
		 
		 
	 }
		
 }

		CheckRightConnection_hartTT();
		 
	 }else{
		 
		 alertify.alert("Alert","Connect atleast one wire");
		 $(".ajs-header").css("background-color","#ce6058");
		 
	 }
	
 

 
}

CheckRightConnection_hartTT = function(){
	
	if(psToConfigPlus_TT == 1 && configTohartTransPlus_TT == 1 && psToConfigMinus_TT == 1 &&  configTohartTransMinus_TT == 1 && wrongConnection_hartTT == 0){
		
		alertify.alert('Success!!',"Correct Connection. Please click next level");
		 $(".ajs-header").css("background-color","#4CAF50");
		app.toolbar.characterisation_Button.show();
	//	app.toolbar.characterisation_Button.hide();
		rightConn = 1;
	}else{
		
		if(wrongConnection_hartTT == 0){

		
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

  CheckWrongConnection_hartTT = function(){
	
	
	                    if(ConnFlagCnt == 3){
							 app.toolbar.hintButton.show();
							 
							 alertify.alert("Alert","Wrong Connection");
							 $(".ajs-header").css("background-color","#ce6058");
							 rightConn = 0;
							 
													
						}else{
			
							if(wrongConnection_hartTT == 1){
		
								alertify.alert("Alert","Wrong Connection");
								 $(".ajs-header").css("background-color","#ce6058");
							ConnFlagCnt++;
							rightConn = 0;
							}
						}
	
	
	
	
	
	
	
}
	
	
	
	
