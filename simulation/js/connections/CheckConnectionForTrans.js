

checkConnectionsForTrans = function(appId, transType,jsonarray){

 var temp = JSON.parse(jsonarray);

 var connData = {};
 
		 if(temp.length != 0){
			 // LT Connection Check
			 if(appId == "1" && transType == "twowire"){
			 
			  
			   twoWireConnForLT(appId, transType,jsonarray);
			 
			}
			 if(appId == "1" && transType == "threewire"){
			 
			   threeWireConnForLT(appId, transType,jsonarray);
			 
			}
			if(appId == "1" && transType == "fourwire"){
			 
			   fourWireConnForLT(appId, transType,jsonarray);
			 
			}
			if(appId == "1" && transType == "hart"){
			 
			   hartConnForLT(appId, transType,jsonarray);
			 
			}
			
			if(appId == "1" && transType == "fftrans"){
			 
			   fftransConnForLT(appId, transType,jsonarray);
			 
			}
			
			
			// TT Connection Check
			if(appId == "2" && transType == "twowire"){
			 
			   twoWireConnForTT(appId, transType,jsonarray);
			 
			}
			
			if(appId == "2" && transType == "threewire"){
			 
			   threeWireConnForTT(appId, transType,jsonarray);
			 
			}
			if(appId == "2" && transType == "fourwire"){
			 
			   fourWireConnForTT(appId, transType,jsonarray);
			 
			}
			if(appId == "2" && transType == "hart"){
			 
			   hartConnForTT(appId, transType,jsonarray);
			 
			}
			if(appId == "2" && transType == "fftrans"){
			 
			   fftransConnForTT(appId, transType,jsonarray);
			 
			}
			
			
			
			// PT Connection Check
			if(appId == "3" && transType == "twowire"){
			 
			   twoWireConnForPT(appId, transType,jsonarray);
			 
			}
			
			if(appId == "3" && transType == "threewire"){
			 
			   threeWireConnForPT(appId, transType,jsonarray);
			 
			}
			if(appId == "3" && transType == "fourwire"){
			 
			   fourWireConnForPT(appId, transType,jsonarray);
			 
			}
			if(appId == "3" && transType == "hart"){
			 
			   hartConnForPT(appId, transType,jsonarray);
			 
			}
			if(appId == "3" && transType == "fftrans"){
			 
			   fftransConnForPT(appId, transType,jsonarray);
			 
			}
			
			
			
			// FT Connection Check
			if(appId == "4" && transType == "twowire"){
			 
			   twoWireConnForFT(appId, transType,jsonarray);
			 
			}
			
			if(appId == "4" && transType == "threewire"){
			 
			   threeWireConnForFT(appId, transType,jsonarray);
			 
			}
			if(appId == "4" && transType == "fourwire"){
			 
			   fourWireConnForFT(appId, transType,jsonarray);
			 
			}
			if(appId == "4" && transType == "hart"){
			 
			   hartConnForFT(appId, transType,jsonarray);
			 
			}
			if(appId == "4" && transType == "fftrans"){
			 
			   fftransConnForFT(appId, transType,jsonarray);
			 
			}
			
			
			minutes = document.getElementById("minutes").textContent;
    		seconds = document.getElementById("seconds").textContent;        		
//    		console.log(minutes+":"+seconds);
    		
    		
			
			
			connData.appId = appId;
			connData.trsmtrType = transType;
			connData.connDiagjson = jsonarray;
			connData.chkConnCnt = ConnFlagCnt;
			connData.chkRightConn = rightConn;
			connData.connTimeInMin = minutes;
			connData.connTimeInsec  = seconds;
//		    console.log(connData);
			ExpTrackData.connData = connData
//			console.log(ExpTrackData);
			 
		 }else{
			 
			 alertify.alert("Alert","Please Select Right Componants to Do the Connections");
			 $(".ajs-header").css("background-color","#ce6058");

			 
		 }
		 
		 
		 
		 
		 
		 
		
	
	
	
	
}	
	
