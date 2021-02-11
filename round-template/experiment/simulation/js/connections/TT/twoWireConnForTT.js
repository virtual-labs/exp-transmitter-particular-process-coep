

twoWireConnForTT = function(appId, type,jsonarray){
/* var reader = new draw2d.io.json.Reader();
 reader.unmarshal(canvas1, json); */
 
 psToTransPlus_TT = 0, signToTransMinus_TT  = 0, psToSignMinus_TT = 0;
 wrongConnection_2wireTT = 0;
 

 
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
		 
		 
		 if((temp[i].source.port == "psPlus" &&  temp[i].target.port) == "TT_twowireTransPlus" || ( temp[i].source.port == "TT_twowireTransPlus"  &&  temp[i].target.port == "psPlus" )){
			
			psToTransPlus_TT = 1;
			
	 
		} else if(( temp[i].source.port == "sgnlplus" &&  temp[i].target.port == "TT_twowireTransMinus" ) || ( temp[i].source.port == "TT_twowireTransMinus" && temp[i].target.port == "sgnlplus")){
			
			signToTransMinus_TT = 1;
			
		} else if(( temp[i].source.port == "psMinus" &&  temp[i].target.port == "sgnlMinus" ) || ( temp[i].source.port == "sgnlMinus" && temp[i].target.port == "psMinus")){
			
			psToSignMinus_TT = 1;
			
		}else{
			
			wrongConnection_2wireTT = 1;
			CheckWrongConnection_2wireTT();
			break;
			
		}
		 
		 
	 }
		
 }

		CheckRightConnection_2wireTT();
		 
	 }else{
		 
		 alertify.alert("Do Some Connection");
		 
	 }
	
 

 
}

CheckRightConnection_2wireTT = function(){
	
	if(psToTransPlus_TT == 1 && signToTransMinus_TT == 1 && psToSignMinus_TT == 1 && wrongConnection_2wireTT == 0){
		
		alertify.alert("Correct Connection. Please click next level");
		app.toolbar.characterisation_Button.show();
	//	app.toolbar.characterisation_Button.hide();
		rightConn = 1;
	}else{
		
		if(wrongConnection_2wireTT == 0){

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

CheckWrongConnection_2wireTT = function(){
	

	
						if(ConnFlagCnt == 3){
							 app.toolbar.hintButton.show();
							 
							 alertify.alert("Wrong Connection");
							 
							 rightConn = 0;
													
						}else{
			
							if(wrongConnection_2wireTT == 1){
		
							alertify.alert("Wrong Connection");
							ConnFlagCnt++;
							rightConn = 0;
		
							}
						}
	
	
	
}
	
	
	
	
