

fftransConnForPT = function(appId, type,jsonarray){
/* var reader = new draw2d.io.json.Reader();
 reader.unmarshal(canvas1, json); */
 
 psToFFTransPlus_PT = 0, ffTransToFFTCardPlus_PT  = 0, psToFFTransMinus_PT = 0, ffTransToFFTCardMinus_PT = 0;
 wrongConnection_fft_PT = 0;
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
		 
		 
		 if((temp[i].source.port == "psPlus" &&  temp[i].target.port) == "PT_ffTransPlus" || ( temp[i].source.port == "PT_ffTransPlus"  &&  temp[i].target.port == "psPlus" )){
			
			psToFFTransPlus_PT = 1;
			
	 
		} else if(( temp[i].source.port == "PT_ffTransPlus" &&  temp[i].target.port == "fftCardPlus" ) || ( temp[i].source.port == "fftCardPlus" && temp[i].target.port == "PT_ffTransPlus")){
			
			ffTransToFFTCardPlus_PT = 1;
			
		} else if(( temp[i].source.port == "psMinus" &&  temp[i].target.port == "PT_ffTransMinus" ) || ( temp[i].source.port == "PT_ffTransMinus" && temp[i].target.port == "psMinus")){
			
			psToFFTransMinus_PT = 1;
			
		}else if(( temp[i].source.port == "PT_ffTransMinus" &&  temp[i].target.port == "fftCardMinus" ) || ( temp[i].source.port == "fftCardMinus" && temp[i].target.port == "PT_ffTransMinus")){
			
			ffTransToFFTCardMinus_PT = 1;
			
		}
		else{
			
			wrongConnection_fft_PT = 1;
			CheckWrongConnection_fft_PT();
			break;
			
		}
		 
		 
	 }
		
 }

		CheckRightConnection_fft_PT();
		 
	 }else{
		 
		 alertify.alert("Do Some Connection");
		 
	 }
	
 

 
}

CheckRightConnection_fft_PT = function(){
	
	if(psToFFTransPlus_PT == 1 && ffTransToFFTCardPlus_PT == 1 && psToFFTransMinus_PT == 1 &&  ffTransToFFTCardMinus_PT == 1 && wrongConnection_fft_PT == 0){
		
		alertify.alert("Correct Connection. Please click next level");
		app.toolbar.characterisation_Button.show();
	//	app.toolbar.characterisation_Button.hide();
	    rightConn = 1;
		
	}else{
		
		if(wrongConnection_fft_PT == 0){

		
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

  CheckWrongConnection_fft_PT = function(){
	
	
	                    if(ConnFlagCnt == 3){
							 app.toolbar.hintButton.show();
							 
							 alertify.alert("Wrong Connection");
							 rightConn = 0;
							 
													
						}else{
			
							if(wrongConnection_fft_PT == 1){
		
							alertify.alert("Wrong Connection");
							ConnFlagCnt++;
							rightConn = 0;
		
							}
						}
	
	
	
	
	
	
	
}
	
	
	
	
