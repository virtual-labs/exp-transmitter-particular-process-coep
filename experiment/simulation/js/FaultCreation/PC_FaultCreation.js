
 $(function () {	

	 var PC_RightFault = [];
	 var PC_oldFault = 0;
	 
PC_FaultCheckFun = function(lowerSpLevel, higherSpLevel, PColdreadingSorted, PCarr_actualValSorted, PCarr_stdValSorted) {
	
	
//	    index and related fault
//	   1 : impulse
//	   2 : saturation
//	   3 : fluctuate
//	   4 : Open Electrical Connection
	
//	PC_FaultIndexArr = [1,2,3,4] this index array is mentioned in PC_characterisationArr.js
	   
	    
		PCarr_stdValSuffled = shuffle_PCArr(PCarr_stdValSorted);
	
//		console.log("std value arr shuffled " + PCarr_stdValSuffled);
	    
		
		
		var PC_faultName = '';
	
		
		if(PC_RightFault.length != 0 || PC_oldFault != 0){
			
			
			do {
				
				PC_fault = randomFault_PC(PC_FaultIndexArr);
				
				}
				while (PC_RightFault. indexOf(PC_fault) != -1 || PC_fault == PC_oldFault); 
			
						
		}else{
			
			PC_fault = randomFault_PC(PC_FaultIndexArr);
			
		}
		
		
		
		PC_oldFault = PC_fault;
		
		
		
//		console.log("FAULT "+PC_fault);
		
		
		FindFault_PC(PC_fault, PCarr_stdValSuffled);
		
	
	

		
			
			
	
			 function shuffle_PCArr(PCarr_stdValSorted){
					
				 for(var j, x, i = PCarr_stdValSorted.length; i; j = parseInt(Math.random() * i), x = PCarr_stdValSorted[--i], 
				 PCarr_stdValSorted[i] = PCarr_stdValSorted[j], PCarr_stdValSorted[j] = x);
			        return PCarr_stdValSorted;
				
			}
			
			 function randomFault_PC(PC_FaultIndexArr)
				{
				  
				return PC_FaultIndexArr[Math.floor(Math.random()*PC_FaultIndexArr.length)];
				     
				}
			 
			 function FindFault_PC(PC_fault, PCarr_stdValSuffled){
				 
					var PC_faultAdd = '';
					PC_faultAdd +='<div class="container">'
						+'<div class="row">'
						+'<div class="col-md-12" id="PC_faultCkeck"  >'
						+'<h1>Identify PT Fault </h1>'
						+'<h6>In this level detect the fault in PT 100</h6>'
						+'<p class="faultMsg">The Output of Transmitter shown in the table Identify the Fault </p>'
						+'<div class="col-md-12" id="PC_FaultScroll"  >'
						//table start
						+ '<table id="PC_DataTable_IO" class="table table-striped table-bordered" style="width:100%">'
						+ '<thead>'
						+ '<tr>'
						+ '<th>Reading No.</th>'
						+ '<th>	Input (in kg/cm<sup>2</sup>)</th>'
						+ '<th>Output (in mA)</th>'
						+ '</tr>'
						+ '</thead>'			
						+ '<tbody >'
						for (var i = 0; i < PCarr_actualValSorted.length ; i++ ) {
							PC_faultAdd += '<tr><td>'
						+ (i+1)
						+ '</td><td>'
						+ PColdreadingSorted[i]
						+ '</td>'
						
						if(PC_fault == 1){
							PC_faultAdd +='<td>	4</td>'
						}if(PC_fault == 2){
							PC_faultAdd +='<td>	20</td>'
						}if(PC_fault == 3){
							PC_faultAdd +='<td>'
						+ PCarr_stdValSuffled[i]	
							PC_faultAdd +='</td>'
						}if(PC_fault == 4){
							PC_faultAdd +='<td>	0</td>'
						}
						
						PC_faultAdd +='</tr>'
						
						
						
				}
				PC_faultAdd += '</tbody>'
			
						+ '</table>'
						//table end
						//fault ckeck div
						+ '<div class="form-group" style="margin:20px 0; font-size:15px; font-weight:bold;">'
						+ '<label for="sel1" >Detect Fault:</label>'
						+ '<select class="form-control"  id = "findFault_PC">'
						+ ' <option  value="-1">Detect Fault</option>'
						+ ' <option  value="1"> Impulse Line Block</option>'
						+ '  <option value="2"> Transmitter is in saturation mode</option>'
						+ '  <option value="3"> Transmitter'+"'"+'s electrical section is expose to noise</option>'
						+ '  <option value="4"> Open Electrical Connection</option>'
						+ '</select><br>'
						+ '<button id="PC_FindFault">Identify Fault</button>'
						+ ' </div>'
						+'</div>'
						
						
						+'</div>'
						+'</div>'
						+'</div>'
						
						$('#mainDiv').html('');
						$('#mainDiv').html(PC_faultAdd);
				
	 
						
						

						
						
						$('#PC_FindFault').on('click', function() {
							
							 var selectedFault  = $( "#findFault_PC option:selected" ).val();

							 
							 if (selectedFault == -1) {

								 alertify.alert("Please Select The Fault Type");

							 }else{
								 
								 if(selectedFault == PC_fault){
									 PC_faultcheckCnt = 0;
									 ExpTrackData.pcFaultDetectionCnt = PC_wrongFaultCnt;
									 
							//	 console.log(ExpTrackData);
									 
									 PC_3FaultDetectionCnt++;
									 PC_RightFault.push(PC_fault);
									 
									 if(PC_3FaultDetectionCnt == 3){
										 alertify.alert("All Fault Detected Successfully !!!");
										 $('#mainDiv').html('');
											$('#mainDiv').html('<div class="col-md-offset-3 col-md-6 col-md-offset-3"><div class="alert alert-success" style="margin-top:150px; font-size:22px; font-weight:bold;">Congratulations!!! Pressure Control system experiment is completed successfully!!</div></div>');
										 
									 }else{
										 alertify.alert("Fault Detection Successful! Please detect another new fault");
										 PC_FaultCheckFun(lowerSpLevel, higherSpLevel, PColdreadingSorted, PCarr_actualValSorted, PCarr_stdValSorted);
									 }
									    
								 }else{
									 
									 PC_wrongFaultCnt++;
									 PC_faultcheckCnt++;
//									 console.log(PC_faultcheckCnt);
									 
									 if(PC_fault == 1){
										 PC_faultName = "Impulse Line Block";
									 }else if(PC_fault == 2){
										 PC_faultName = "Transmitter is in saturation mode";
									 }else if(PC_fault == 3){
										 PC_faultName = 'Transmitter'+"'"+'s electrical section is expose to noise';
									 }else if(PC_fault == 4){
										 PC_faultName = "Open Electrical Connection";
									 }
									 
									 									

									 
									 
									 if(PC_faultcheckCnt == 2){
										 
										 alertify.alert("Wrong Fault..\nThe fault was '"+ PC_faultName +".' \nPlease try again for new fault"); 
										 PC_faultcheckCnt = 0;
										 PC_FaultCheckFun(lowerSpLevel, higherSpLevel, PColdreadingSorted, PCarr_actualValSorted, PCarr_stdValSorted);
										 
									 }else{
										 alertify.alert("Wrong Fault...Please Try Again  !!!");
									 }
									
								 }
								 
							 }
							 
							 
							 
							 
							 
						});
				 
			 }
			 
			 
	
}

});