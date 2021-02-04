

fftransConnForFT = function(appId, type,jsonarray){
/* var reader = new draw2d.io.json.Reader();
 reader.unmarshal(canvas1, json); */
 
 psToFFTransPlus_FT = 0, ffTransToFFTCardPlus_FT  = 0, psToFFTransMinus_FT = 0, ffTransToFFTCardMinus_FT = 0;
 wrongConnection_fft_FT = 0;
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
		 
		 
		 if((temp[i].source.port == "psPlus" &&  temp[i].target.port) == "FT_ffTransPlus" || ( temp[i].source.port == "FT_ffTransPlus"  &&  temp[i].target.port == "psPlus" )){
			
			psToFFTransPlus_FT = 1;
			
	 
		} else if(( temp[i].source.port == "FT_ffTransPlus" &&  temp[i].target.port == "fftCardPlus" ) || ( temp[i].source.port == "fftCardPlus" && temp[i].target.port == "FT_ffTransPlus")){
			
			ffTransToFFTCardPlus_FT = 1;
			
		} else if(( temp[i].source.port == "psMinus" &&  temp[i].target.port == "FT_ffTransMinus" ) || ( temp[i].source.port == "FT_ffTransMinus" && temp[i].target.port == "psMinus")){
			
			psToFFTransMinus_FT = 1;
			
		}else if(( temp[i].source.port == "FT_ffTransMinus" &&  temp[i].target.port == "fftCardMinus" ) || ( temp[i].source.port == "fftCardMinus" && temp[i].target.port == "FT_ffTransMinus")){
			
			ffTransToFFTCardMinus_FT = 1;
			
		}
		else{
			
			wrongConnection_fft_FT = 1;
			CheckWrongConnection_fft_FT();
			break;
			
		}
		 
		 
	 }
		
 }

		CheckRightConnection_fft_FT();
		 
	 }else{
		 
		 alertify.alert("Do Some Connection");
		 
	 }
	
 

 
}

CheckRightConnection_fft_FT = function(){
	
	if(psToFFTransPlus_FT == 1 && ffTransToFFTCardPlus_FT == 1 && psToFFTransMinus_FT == 1 &&  ffTransToFFTCardMinus_FT == 1 && wrongConnection_fft_FT == 0){
		
		alertify.alert("Correct Connection. Please click next level");
		app.toolbar.characterisation_Button.show();
	//	app.toolbar.characterisation_Button.hide();
	    rightConn = 1;
		
	}else{
		
		if(wrongConnection_fft_FT == 0){

		
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

  CheckWrongConnection_fft_FT = function(){
	
	
	                    if(ConnFlagCnt == 3){
							 app.toolbar.hintButton.show();
							 
							 alertify.alert("Wrong Connection");
							 rightConn = 0;
							 
													
						}else{
			
							if(wrongConnection_fft_FT == 1){
		
							alertify.alert("Wrong Connection");
							ConnFlagCnt++;
							rightConn = 0;
		
							}
						}
	
	
	
	
	
	
	
}
	
	
	
	
