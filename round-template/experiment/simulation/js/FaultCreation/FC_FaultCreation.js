
 $(function () {	

	 var FC_RightFault = [];
	 var FC_oldFault = 0;
	 
FC_FaultCheckFun = function(lowerSpLevel, higherSpLevel, FColdreadingSorted, FCarr_actualValSorted, FCarr_stdValSorted) {
	
	
//	    index and related fault
//	   1 : impulse
//	   2 : saturation
//	   3 : fluctuate
//	   4 : Open Electrical Connection
	
//	FC_FaultIndexArr = [1,2,3,4] this index array is mentioned in FC_characterisationArr.js
	   
	    
		FCarr_stdValSuffled = shuffle_FCArr(FCarr_stdValSorted);
	
//		console.log("std value arr shuffled " + FCarr_stdValSuffled);
	    
		
		
		var FC_faultName = '';
	
		
		if(FC_RightFault.length != 0 || FC_oldFault != 0){
			
			
			do {
				
				FC_fault = randomFault_FC(FC_FaultIndexArr);
				
				}
				while (FC_RightFault. indexOf(FC_fault) != -1 || FC_fault == FC_oldFault); 
			
						
		}else{
			
			FC_fault = randomFault_FC(FC_FaultIndexArr);
			
		}
		
		
		
		FC_oldFault = FC_fault;
		
		
		
//		console.log("FAULT "+FC_fault);
		
		
		FindFault_FC(FC_fault, FCarr_stdValSuffled);
		
	
	

		
			
			
	
			 function shuffle_FCArr(FCarr_stdValSorted){
					
				 for(var j, x, i = FCarr_stdValSorted.length; i; j = parseInt(Math.random() * i), x = FCarr_stdValSorted[--i], 
				 FCarr_stdValSorted[i] = FCarr_stdValSorted[j], FCarr_stdValSorted[j] = x);
			        return FCarr_stdValSorted;
				
			}
			
			 function randomFault_FC(FC_FaultIndexArr)
				{
				  
				return FC_FaultIndexArr[Math.floor(Math.random()*FC_FaultIndexArr.length)];
				     
				}
			 
			 function FindFault_FC(FC_fault, FCarr_stdValSuffled){
				 
					var FC_faultAdd = '';
					FC_faultAdd +='<div class="container">'
						+'<div class="row">'
						+'<div class="col-md-12" id="FC_faultCkeck"  >'
						+'<h1>Identify FT Fault </h1>'
						+'<h6>In this level detect the fault in FT 100</h6>'
						+'<p class="faultMsg">The Output of Transmitter shown in the table Identify the Fault </p>'
						
						+'<div class="col-md-12" id="FC_FaultScroll"  >'
						//table start
						+ '<table id="FC_DataTable_IO" class="table table-striped table-bordered" style="width:100%">'
						+ '<thead>'
						+ '<tr>'
						+ '<th>Reading No.</th>'
						+ '<th>	Input (in lph)</th>'
						+ '<th>Output (in mA)</th>'
						+ '</tr>'
						+ '</thead>'			
						+ '<tbody >'
						for (var i = 0; i < FCarr_actualValSorted.length ; i++ ) {
							FC_faultAdd += '<tr><td>'
						+ (i+1)
						+ '</td><td>'
						+ FColdreadingSorted[i]
						+ '</td>'
						
						if(FC_fault == 1){
							FC_faultAdd +='<td>	4</td>'
						}if(FC_fault == 2){
							FC_faultAdd +='<td>	20</td>'
						}if(FC_fault == 3){
							FC_faultAdd +='<td>'
						+ FCarr_stdValSuffled[i]	
							FC_faultAdd +='</td>'
						}if(FC_fault == 4){
							FC_faultAdd +='<td>	0</td>'
						}
						
						FC_faultAdd +='</tr>'
						
						
						
				}
				FC_faultAdd += '</tbody>'
			
						+ '</table>'
						//table end
						//fault ckeck div
						+ '<div class="form-group" style="margin:20px 0; font-size:15px; font-weight:bold;">'
						+ '<label for="sel1" >Detect Fault:</label>'
						+ '<select class="form-control"  id = "findFault_FC">'
						+ ' <option  value="-1">Detect Fault</option>'
						+ ' <option  value="1"> Impulse Line Block</option>'
						+ '  <option value="2"> Transmitter is in saturation mode</option>'
						+ '  <option value="3"> Transmitter'+"'"+'s electrical section is expose to noise</option>'
						+ '  <option value="4"> Open Electrical Connection</option>'
						+ '</select><br>'
						+ '<button id="FC_FindFault">Identify Fault</button>'
						+ ' </div>'
						+'</div>'
						
						
						+'</div>'
						+'</div>'
						+'</div>'
						
						$('#mainDiv').html('');
						$('#mainDiv').html(FC_faultAdd);
				
				 
						
						

						
						
						$('#FC_FindFault').on('click', function() {
							
							 var selectedFault  = $( "#findFault_FC option:selected" ).val();

							 
							 if (selectedFault == -1) {

								 alertify.alert("Please Select The Fault Type");

							 }else{
								 
								 if(selectedFault == FC_fault){
									 FC_faultcheckCnt = 0;
									 ExpTrackData.fcFaultDetectionCnt = FC_wrongFaultCnt;
									 
							//		 console.log(ExpTrackData);
									 
									 FC_3FaultDetectionCnt++;
									 FC_RightFault.push(FC_fault);
									 
									 if(FC_3FaultDetectionCnt == 3){
										 alertify.alert("All Fault Detected Successfully !!!");
										 $('#mainDiv').html('');
											$('#mainDiv').html('<div class="col-md-offset-3 col-md-6 col-md-offset-3"><div class="alert alert-success" style="margin-top:150px; font-size:22px; font-weight:bold;">Congratulations!!! Flow Control system experiment is completed successfully!!</div></div>');
										 
									 }else{
										 alertify.alert("Fault Detection Successful! Please detect another new fault");
										 FC_FaultCheckFun(lowerSpLevel, higherSpLevel, FColdreadingSorted, FCarr_actualValSorted, FCarr_stdValSorted);
									 }
									    
								 }else{
									 
									 FC_wrongFaultCnt++;
									 FC_faultcheckCnt++;
//									 console.log(FC_faultcheckCnt);
									 
									 if(FC_fault == 1){
										 FC_faultName = "Impulse Line Block";
									 }else if(FC_fault == 2){
										 FC_faultName = "Transmitter is in saturation mode";
									 }else if(FC_fault == 3){
										 FC_faultName = 'Transmitter'+"'"+'s electrical section is expose to noise';
									 }else if(FC_fault == 4){
										 FC_faultName = "Open Electrical Connection";
									 }
									 
									 									

									 
									 
									 if(FC_faultcheckCnt == 2){
										 
										 alertify.alert("Wrong Fault..\nThe fault was '"+ FC_faultName +".' \nPlease try again for new fault"); 
										 FC_faultcheckCnt = 0;
										 FC_FaultCheckFun(lowerSpLevel, higherSpLevel, FColdreadingSorted, FCarr_actualValSorted, FCarr_stdValSorted);
										 
									 }else{
										 alertify.alert("Wrong Fault...Please Try Again  !!!");
									 }
									
								 }
								 
							 }
							 
							 
							 
							 
							 
						});
						
				 
			 }
			 
			 
	
}
});