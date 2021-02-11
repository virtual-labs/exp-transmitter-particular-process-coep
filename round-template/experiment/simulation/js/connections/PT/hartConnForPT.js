

hartConnForPT = function(appId, type,jsonarray){
/* var reader = new draw2d.io.json.Reader();
 reader.unmarshal(canvas1, json); */
 
 psToConfigPlus_PT = 0, configTohartTransPlus_PT  = 0, psToConfigMinus_PT = 0, configTohartTransMinus_PT = 0;
 wrongConnection_hartPT = 0;
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
			
			psToConfigPlus_PT = 1;
			
	 
		} else if(( temp[i].source.port == "configuratorPlus" &&  temp[i].target.port == "PTPort_hartTransplus" ) || ( temp[i].source.port == "PTPort_hartTransplus" && temp[i].target.port == "configuratorPlus")){
			
			configTohartTransPlus_PT = 1;
			
		} else if(( temp[i].source.port == "psMinus" &&  temp[i].target.port == "configuratorMinu" ) || ( temp[i].source.port == "configuratorMinu" && temp[i].target.port == "psMinus")){
			
			psToConfigMinus_PT = 1;
			
		}else if(( temp[i].source.port == "configuratorMinu" &&  temp[i].target.port == "PTPort_hartTransminus" ) || ( temp[i].source.port == "PTPort_hartTransminus" && temp[i].target.port == "configuratorMinu")){
			
			configTohartTransMinus_PT = 1;
			
		}else{
			
			wrongConnection_hartPT = 1;
			CheckWrongConnection_hartPT();
			break;
			
		}
		 
		 
	 }
		
 }

		CheckRightConnection_hartPT();
		 
	 }else{
		 
		 alertify.alert("Do Some Connection");
		 
	 }
	
 

 
}

CheckRightConnection_hartPT = function(){
	
	if(psToConfigPlus_PT == 1 && configTohartTransPlus_PT == 1 && psToConfigMinus_PT == 1 &&  configTohartTransMinus_PT == 1 && wrongConnection_hartPT == 0){
		
		alertify.alert("Correct Connection. Please click next level");
		app.toolbar.characterisation_Button.show();
	//	app.toolbar.characterisation_Button.hide();
		rightConn = 1;
	}else{
		
		if(wrongConnection_hartPT == 0){

		
					if(ConnFlagCnt == 3){
							app.toolbar.hintButton.show();
							
							alertify.alert("Wrong Connection");
									rightConn = 0;
						}else{
							
							alertify.alert("Wrong Connection");
							ConnFlagCnt++
							rightConn = 0;
						}
		
			
			
		}
		
		
	}
	
}

  CheckWrongConnection_hartPT = function(){
	
	
	                    if(ConnFlagCnt == 3){
							 app.toolbar.hintButton.show();
							 
							 alertify.alert("Wrong Connection");
							 
							 rightConn = 0;
													
						}else{
			
							if(wrongConnection_hartPT == 1){
		
							alertify.alert("Wrong Connection");
							ConnFlagCnt++;
							rightConn = 0;
							}
						}
	
	
	
	
	
	
	
}
	
	
	
	
