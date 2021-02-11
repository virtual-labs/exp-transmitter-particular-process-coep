
fourWireConnForFT = function(appId, type,jsonarray){
/* var reader = new draw2d.io.json.Reader();
 reader.unmarshal(canvas1, json); */
 
 transToSignlPlus_FT = 0, psToTransSuplyPlus_FT  = 0, psToTransSuplyMinus_FT = 0, transSignToSignMinus_FT = 0;
 wrongConnection_4wireFT = 0;
 

 
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
		 
		 
		 if((temp[i].source.port == "FT_fourWireTransSigPlus" &&  temp[i].target.port) == "sgnlplus" || ( temp[i].source.port == "sgnlplus" &&  temp[i].target.port == "FT_fourWireTransSigPlus" )){
			
			transToSignlPlus_FT = 1;
			
	 
		} else if(( temp[i].source.port == "psPlus" &&  temp[i].target.port == "FT_fourWireTransSuplyPlus" ) || ( temp[i].source.port == "FT_fourWireTransSuplyPlus" && temp[i].target.port == "psPlus")){
			
			psToTransSuplyPlus_FT = 1;
			
		} else if(( temp[i].source.port == "psMinus" &&  temp[i].target.port == "FT_fourWireTransSuplyMinus" ) || ( temp[i].source.port == "FT_fourWireTransSuplyMinus" && temp[i].target.port == "psMinus")){
			
			psToTransSuplyMinus_FT = 1;
			
		}else if(( temp[i].source.port == "sgnlMinus" &&  temp[i].target.port == "FT_fourWireTransSigMinus" ) || ( temp[i].source.port == "FT_fourWireTransSigMinus" && temp[i].target.port == "sgnlMinus")){
			
			transSignToSignMinus_FT = 1;
			
		}else{
			
			wrongConnection_4wireFT = 1;
			CheckWrongConnection_4wireFT();
			break;
			
		}
		 
		 
	 }
		
 }

		CheckRightConnection_4wireFT();
		 
	 }else{
		 
		 alertify.alert("Do Some Connection");
		 
	 }
	
 

 
}

CheckRightConnection_4wireFT = function(){
	
	if(transToSignlPlus_FT == 1 && psToTransSuplyPlus_FT == 1 && psToTransSuplyMinus_FT == 1 && transSignToSignMinus_FT == 1 && wrongConnection_4wireFT == 0){
		
		alertify.alert("Correct Connection. Please click next level");
		app.toolbar.characterisation_Button.show();
	//	app.toolbar.characterisation_Button.hide();
		rightConn = 1;
	}else{
		
		if(wrongConnection_4wireFT == 0){

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

CheckWrongConnection_4wireFT = function(){
	
	
	
						if(ConnFlagCnt == 3){
							 app.toolbar.hintButton.show();
							 
							 alertify.alert("Wrong Connection");
							 rightConn = 0;
							 
													
						}else{
			
							if(wrongConnection_4wireFT == 1){
		
							alertify.alert("Wrong Connection");
							ConnFlagCnt++;
							rightConn = 0;
		
							}
						}
	
	
	
}
	
	
	
	
