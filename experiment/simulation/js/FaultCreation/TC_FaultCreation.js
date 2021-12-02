
 $(function () {	

	 var TC_RightFault = [];
	 var TC_oldFault = 0;
	 
TC_FaultCheckFun = function(lowerSpLevel, higherSpLevel, TColdreadingSorted, TCarr_actualValSorted, TCarr_stdValSorted) {
	
	
//	    index and related fault
//	   1 : impulse
//	   2 : saturation
//	   3 : fluctuate
//	   4 : Open Electrical Connection
	
//	TC_FaultIndexArr = [1,2,3,4] this index array is mentioned in TC_characterisationArr.js
	   
	    
		TCarr_stdValSuffled = shuffle_TCArr(TCarr_stdValSorted);
	
//		console.log("std value arr shuffled " + TCarr_stdValSuffled);
	    
		
		
		var TC_faultName = '';
	
		
		if(TC_RightFault.length != 0 || TC_oldFault != 0){
			
			
			do {
				
				TC_fault = randomFault_TC(TC_FaultIndexArr);
				
				}
				while (TC_RightFault. indexOf(TC_fault) != -1 || TC_fault == TC_oldFault); 
			
						
		}else{
			
			TC_fault = randomFault_TC(TC_FaultIndexArr);
			
		}
		
		
		
		TC_oldFault = TC_fault;
		
		
		
//		console.log("FAULT "+TC_fault);
		
		
		FindFault_TC(TC_fault, TCarr_stdValSuffled);
		
	
	

		
			
			
	
			 function shuffle_TCArr(TCarr_stdValSorted){
					
				 for(var j, x, i = TCarr_stdValSorted.length; i; j = parseInt(Math.random() * i), x = TCarr_stdValSorted[--i], 
				 TCarr_stdValSorted[i] = TCarr_stdValSorted[j], TCarr_stdValSorted[j] = x);
			        return TCarr_stdValSorted;
				
			}
			
			 function randomFault_TC(TC_FaultIndexArr)
				{
				  
				return TC_FaultIndexArr[Math.floor(Math.random()*TC_FaultIndexArr.length)];
				     
				}
			 
			 function FindFault_TC(TC_fault, TCarr_stdValSuffled){
				 
					var TC_faultAdd = '';
					TC_faultAdd +='<div class="container">'
						+'<div class="row">'
						+'<div class="col-md-12" id="TC_faultCkeck"  >'
						+'<h1>Identify TT Fault </h1>'
						+'<h6>In this level detect the fault in TT 100</h6>'
						+'<p class="faultMsg">The output of the Transmitter is as shown in the table. Identify the Fault </p>'
						+'<div class="col-md-12" id="TC_FaultScroll"  >'
						//table start
						+ '<table id="TC_DataTable_IO" class="table table-striped table-bordered" style="width:100%">'
						+ '<thead>'
						+ '<tr>'
						+ '<th>Reading No.</th>'
						+ '<th>	Input (in <sup>0</sup>C)</th>'
						+ '<th>Output (in mA)</th>'
						+ '</tr>'
						+ '</thead>'			
						+ '<tbody >'
						for (var i = 0; i < TCarr_actualValSorted.length ; i++ ) {
							TC_faultAdd += '<tr><td>'
						+ (i+1)
						+ '</td><td>'
						+ TColdreadingSorted[i]
						+ '</td>'
						
						if(TC_fault == 1){
							TC_faultAdd +='<td>	4</td>'
						}if(TC_fault == 2){
							TC_faultAdd +='<td>	20</td>'
						}if(TC_fault == 3){
							TC_faultAdd +='<td>'
						+ TCarr_stdValSuffled[i]	
							TC_faultAdd +='</td>'
						}if(TC_fault == 4){
							TC_faultAdd +='<td>	0</td>'
						}
						
						TC_faultAdd +='</tr>'
						
						
						
				}
				TC_faultAdd += '</tbody>'
			
						+ '</table>'
						//table end
						//fault ckeck div
						+ '<div class="form-group" style="margin:20px 0; font-size:15px; font-weight:bold;">'
						+ '<label for="sel1" >Detect Fault:</label>'
						+ '<select class="form-control"  id = "findFault_TC">'
						+ ' <option  value="-1">---Select Fault---</option>'
						+ ' <option  value="1"> Impulse Line Block</option>'
						+ '  <option value="2"> Transmitter is in saturation mode</option>'
						+ '  <option value="3"> Transmitter'+"'"+'s electrical section is expose to noise</option>'
						+ '  <option value="4"> Open Electrical Connection</option>'
						+ '</select><br>'
						+ '<button id="TC_FindFault">Identify Fault</button>'
						+ ' </div>'
						+'</div>'
						
						
						+'</div>'
						+'</div>'
						+'</div>'
					
						$('#mainDiv').html('');
						$('#mainDiv').html(TC_faultAdd);
				
						stop_timer();
						set_timer();
									 
						

						
						
						$('#TC_FindFault').on('click', function() {
							
							 var selectedFault  = $( "#findFault_TC option:selected" ).val();

							 
							 if (selectedFault == -1) {

								 alertify.alert("Alert","Please Select The Fault Type");
								 $(".ajs-header").css("background-color","#ce6058");


							 }else{
								 
								 if(selectedFault == TC_fault){
									 TC_faultcheckCnt = 0;
									 ExpTrackData.tcFaultDetectionCnt = TC_wrongFaultCnt;
									 
	//								 console.log(ExpTrackData);
									 
									 TC_3FaultDetectionCnt++;
									 TC_RightFault.push(TC_fault);
									 
									 if(TC_3FaultDetectionCnt == 3){
										 
										 
										 minutes = document.getElementById("minutes").textContent;
							        	 seconds = document.getElementById("seconds").textContent;        		
//							        	 console.log(minutes+":"+seconds);
							        	 
							        	 ExpTrackData.tcFaultDetectionTimeInMin = minutes;
							        	 ExpTrackData.tcFaultDetectionTimeInSec = seconds;
//							        	 console.log(JSON.stringify(ExpTrackData));		
							        	 
							        	 stop_timer();
										 
										 
										 alertify.alert('Success!!', "All Fault Detected Successfully !!!");
										 $(".ajs-header").css("background-color","#4CAF50");
										 $("#Reqtimer").css("display","none");
										 $('#mainDiv').html('');
//											$('#mainDiv').html('<div class="col-md-offset-2 col-md-8 col-md-offset-2"><div class="alert alert-success" style="margin-top:50px; font-size:17px; font-weight:bold; text-align:center;">Congratulations!!! Temperature Control system experiment is completed successfully!!</div></div>');
										 TCAnalysis_TransmitterDB();
									 }else{
										 alertify.alert("Success","Fault Detection Successful! Please detect another fault");
										 $(".ajs-header").css("background-color","#4CAF50");

										 TC_FaultCheckFun(lowerSpLevel, higherSpLevel, TColdreadingSorted, TCarr_actualValSorted, TCarr_stdValSorted);
									 }
									    
								 }else{
									 TC_wrongFaultCnt++;
									 TC_faultcheckCnt++;
//									 console.log(TC_faultcheckCnt);
									 
									 if(TC_fault == 1){
										 TC_faultName = "Impulse Line Block";
									 }else if(TC_fault == 2){
										 TC_faultName = "Transmitter is in saturation mode";
									 }else if(TC_fault == 3){
										 TC_faultName = 'Transmitter'+"'"+'s electrical section is expose to noise';
									 }else if(TC_fault == 4){
										 TC_faultName = "Open Electrical Connection";
									 }
									 
									 									

									 
									 
									 if(TC_faultcheckCnt == 2){
										 
//										 alertify.alert("Wrong Fault..\nThe fault was '"+ TC_faultName +".' \nPlease try again for new fault"); 
										 alertify.alert("Alert","The identified fault is wrong. \nThe fault was '"+ TC_faultName +".' \nPlease detect another fault."); 
										 $(".ajs-header").css("background-color","#ce6058");

										 TC_faultcheckCnt = 0;
										 TC_FaultCheckFun(lowerSpLevel, higherSpLevel, TColdreadingSorted, TCarr_actualValSorted, TCarr_stdValSorted);
										 
									 }else{
										 alertify.alert("Alert","Wrong Fault...Please Try Again  !!!");
										 $(".ajs-header").css("background-color","#ce6058");

									 }
									
								 }
								 
							 }
							 
							 
							 
							 
							 
						});
				 
			 }
			 
			 
	
}

});