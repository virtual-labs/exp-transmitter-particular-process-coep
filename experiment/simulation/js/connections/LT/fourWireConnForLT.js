
fourWireConnForLT = function(appId, type,jsonarray){
/* var reader = new draw2d.io.json.Reader();
 reader.unmarshal(canvas1, jsonarray); */
 
 transToSignlPlus_LT = 0, psToTransSuplyPlus_LT  = 0, psToTransSuplyMinus_LT = 0, transSignToSignMinus_LT = 0;
 wrongConnection_4wireLT = 0;
 

 
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
		 
		 
		 if((temp[i].source.port == "LT_fourWireTransSigPlus" &&  temp[i].target.port) == "sgnlplus" || ( temp[i].source.port == "sgnlplus" &&  temp[i].target.port == "LT_fourWireTransSigPlus" )){
			
			transToSignlPlus_LT = 1;
			
	 
		} else if(( temp[i].source.port == "psPlus" &&  temp[i].target.port == "LT_fourWireTransSuplyPlus" ) || ( temp[i].source.port == "LT_fourWireTransSuplyPlus" && temp[i].target.port == "psPlus")){
			
			psToTransSuplyPlus_LT = 1;
			
		} else if(( temp[i].source.port == "psMinus" &&  temp[i].target.port == "LT_fourWireTransSuplyMinus" ) || ( temp[i].source.port == "LT_fourWireTransSuplyMinus" && temp[i].target.port == "psMinus")){
			
			psToTransSuplyMinus_LT = 1;
			
		}else if(( temp[i].source.port == "sgnlMinus" &&  temp[i].target.port == "LT_fourWireTransSigMinus" ) || ( temp[i].source.port == "LT_fourWireTransSigMinus" && temp[i].target.port == "sgnlMinus")){
			
			transSignToSignMinus_LT = 1;
			
		}else{
			
			wrongConnection_4wireLT = 1;
			CheckWrongConnection_4wireLT();
			break;
			
		}
		 
		 
	 }
		
 }

		CheckRightConnection_4wireLT();
		 
	 }else{
		 
		 alertify.alert("Do Some Connection");
		 
	 }
	
 

 
}

CheckRightConnection_4wireLT = function(){
	
	if(transToSignlPlus_LT == 1 && psToTransSuplyPlus_LT == 1 && psToTransSuplyMinus_LT == 1 && transSignToSignMinus_LT == 1 && wrongConnection_4wireLT == 0){
		
		alertify.alert("Correct Connection. Please click next level");
		app.toolbar.characterisation_Button.show();
	//	app.toolbar.characterisation_Button.hide();
		rightConn = 1;
	}else{
		
		if(wrongConnection_4wireLT == 0){

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

CheckWrongConnection_4wireLT = function(){
	
	
	
	                    if(ConnFlagCnt == 3){
							 app.toolbar.hintButton.show();
							 
							 alertify.alert("Wrong Connection");
							 
							 rightConn = 0;
													
						}else{
			
							if(wrongConnection_4wireLT == 1){
		
							alertify.alert("Wrong Connection");
							ConnFlagCnt++;
							rightConn = 0;
							}
						}
	
	
	
}
	
	
	
	
