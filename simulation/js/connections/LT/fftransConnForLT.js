

fftransConnForLT = function(appId, type,jsonarray){
/* var reader = new draw2d.io.json.Reader();
 reader.unmarshal(canvas1, json); */
 
 psToFFTransPlus_LT = 0, ffTransToFFTCardPlus_LT  = 0, psToFFTransMinus_LT = 0, ffTransToFFTCardMinus_LT = 0;
 wrongConnection_fft_LT = 0;
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
		 
		 
		 if((temp[i].source.port == "psPlus" &&  temp[i].target.port) == "LT_ffTransPlus" || ( temp[i].source.port == "LT_ffTransPlus"  &&  temp[i].target.port == "psPlus" )){
			
			psToFFTransPlus_LT = 1;
			
	 
		} else if(( temp[i].source.port == "LT_ffTransPlus" &&  temp[i].target.port == "fftCardPlus" ) || ( temp[i].source.port == "fftCardPlus" && temp[i].target.port == "LT_ffTransPlus")){
			
			ffTransToFFTCardPlus_LT = 1;
			
		} else if(( temp[i].source.port == "psMinus" &&  temp[i].target.port == "LT_ffTransMinus" ) || ( temp[i].source.port == "LT_ffTransMinus" && temp[i].target.port == "psMinus")){
			
			psToFFTransMinus_LT = 1;
			
		}else if(( temp[i].source.port == "LT_ffTransMinus" &&  temp[i].target.port == "fftCardMinus" ) || ( temp[i].source.port == "fftCardMinus" && temp[i].target.port == "LT_ffTransMinus")){
			
			ffTransToFFTCardMinus_LT = 1;
			
		}
		else{
			
			wrongConnection_fft_LT = 1;
			CheckWrongConnection_fft_LT();
			break;
			
		}
		 
		 
	 }
		
 }

		CheckRightConnection_fft_LT();
		 
	 }else{
		 
		 alertify.alert("Alert","Connect atleast one wire");
		 $(".ajs-header").css("background-color","#ce6058");
		 
	 }
	
 

 
}

CheckRightConnection_fft_LT = function(){
	
	if(psToFFTransPlus_LT == 1 && ffTransToFFTCardPlus_LT == 1 && psToFFTransMinus_LT == 1 &&  ffTransToFFTCardMinus_LT == 1 && wrongConnection_fft_LT == 0){
		
		alertify.alert('Success!!',"Correct Connection. Please click next level");
		$(".ajs-header").css("background-color","#4CAF50");
		app.toolbar.characterisation_Button.show();
	//	app.toolbar.characterisation_Button.hide();
	    rightConn = 1;
		
	}else{
		
		if(wrongConnection_fft_LT == 0){

		
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

  CheckWrongConnection_fft_LT = function(){
	
	
	                    if(ConnFlagCnt == 3){
							 app.toolbar.hintButton.show();
							 
							 alertify.alert("Alert","Wrong Connection");
							 $(".ajs-header").css("background-color","#ce6058");
							 rightConn = 0;
							 
													
						}else{
			
							if(wrongConnection_fft_LT == 1){
		
								alertify.alert("Alert","Wrong Connection");
								 $(".ajs-header").css("background-color","#ce6058");
							ConnFlagCnt++;
							rightConn = 0;
		
							}
						}
	
	
	
	
	
	
	
}
	
	
	
	
