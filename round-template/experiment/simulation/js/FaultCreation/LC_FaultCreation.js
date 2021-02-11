
 $(function () {	

	 var LC_RightFault = [];
	 var LC_oldFault = 0;
	 
LC_FaultCheckFun = function(lowerSpLevel, higherSpLevel, LColdreadingSorted, LCarr_actualValSorted, LCarr_stdValSorted) {
	
	
//	    index and related fault
//	   1 : impulse
//	   2 : saturation
//	   3 : fluctuate
//	   4 : Open Electrical Connection
	
//	LC_FaultIndexArr = [1,2,3,4] this index array is mentioned in LC_characterisationArr.js
	   
	    
		LCarr_stdValSuffled = shuffle_LCArr(LCarr_stdValSorted);
	
//		console.log("std value arr shuffled " + LCarr_stdValSuffled);
	    
		
		
		var LC_faultName = '';
	
		
		if(LC_RightFault.length != 0 || LC_oldFault != 0){
			
			
			do {
				
				LC_fault = randomFault_LC(LC_FaultIndexArr);
				
				}
				while (LC_RightFault. indexOf(LC_fault) != -1 || LC_fault == LC_oldFault); 
			
						
		}else{
			
			LC_fault = randomFault_LC(LC_FaultIndexArr);
			
		}
		
		
		
		LC_oldFault = LC_fault;
		
		
		
//		console.log("FAULT "+LC_fault);
		
		
		FindFault_LC(LC_fault, LCarr_stdValSuffled);
			
			
	
			 function shuffle_LCArr(LCarr_stdValSorted){
					
				 for(var j, x, i = LCarr_stdValSorted.length; i; j = parseInt(Math.random() * i), x = LCarr_stdValSorted[--i], 
				 LCarr_stdValSorted[i] = LCarr_stdValSorted[j], LCarr_stdValSorted[j] = x);
			        return LCarr_stdValSorted;
				
			}
			
			 function randomFault_LC(LC_FaultIndexArr)
				{
				  
				return LC_FaultIndexArr[Math.floor(Math.random()*LC_FaultIndexArr.length)];
				     
				}
			 
			 function FindFault_LC(LC_fault, LCarr_stdValSuffled){
				 
					var LC_faultAdd = '';
					
					LC_faultAdd +='<div class="container">'
						+'<div class="row">'
						+'<div class="col-md-12" id="LC_faultCkeck"  >'
						+'<h1>Identify LT Fault </h1>'
						+'<h6>In this level detect the fault in LT 100</h6>'
						+'<p class="faultMsg">The Output of Transmitter shown in the table Identify the Fault </p>'
						
						+'<div class="col-md-12" id="LC_FaultScroll"  >'
						//table start
						+ '<table id="LC_DataTable_IO" class="table table-striped table-bordered" style="width:100%">'
						+ '<thead>'
						+ '<tr>'
						+ '<th>Reading No.</th>'
						+ '<th>	Input (in mtr)</th>'
						+ '<th>Output (in mA)</th>'
						+ '</tr>'
						+ '</thead>'			
						+ '<tbody >'
						for (var i = 0; i < LCarr_actualValSorted.length ; i++ ) {
							LC_faultAdd += '<tr><td>'
						+ (i+1)
						+ '</td><td>'
						+ LColdreadingSorted[i]
						+ '</td>'
						
						if(LC_fault == 1){
							LC_faultAdd +='<td>	4</td>'
						}if(LC_fault == 2){
							LC_faultAdd +='<td>	20</td>'
						}if(LC_fault == 3){
							LC_faultAdd +='<td>'
						+ LCarr_stdValSuffled[i]	
							LC_faultAdd +='</td>'
						}if(LC_fault == 4){
							LC_faultAdd +='<td>	0</td>'
						}
						
						LC_faultAdd +='</tr>'
						
						
						
				}
				LC_faultAdd += '</tbody>'
			
						+ '</table>'
						//table end
						//fault ckeck div
						+ '<div class="form-group" style="margin:20px 0; font-size:15px; font-weight:bold;">'
						+ '<label for="sel1" >Detect Fault:</label>'
						+ '<select class="form-control"  id = "findFault_LC">'
						+ ' <option  value="-1">Detect Fault</option>'
						+ ' <option  value="1"> Impulse Line Block</option>'
						+ '  <option value="2"> Transmitter is in saturation mode</option>'
						+ '  <option value="3"> Transmitter'+"'"+'s electrical section is expose to noise</option>'
						+ '  <option value="4"> Open Electrical Connection</option>'
						+ '</select><br>'
						+ '<button id="LC_FindFault">Identify Fault</button>'
						+ ' </div>'
						+'</div>'
						
						
						+'</div>'
						+'</div>'
						+'</div>'
						
						$('#mainDiv').html('');
						$('#mainDiv').html(LC_faultAdd);
				

						
						
						$('#LC_FindFault').on('click', function() {
							
							 var selectedFault  = $( "#findFault_LC option:selected" ).val();

							 
							 if (selectedFault == -1) {

								 alertify.alert("Please Select The Fault Type");

							 }else{
								 
								 if(selectedFault == LC_fault){
									 LC_faultcheckCnt = 0;
									 ExpTrackData.lcFaultDetectionCnt = LC_wrongFaultCnt;
									 
//									 console.log(ExpTrackData);
									 
									 LC_3FaultDetectionCnt++;
									 LC_RightFault.push(LC_fault);
									 
									 if(LC_3FaultDetectionCnt == 3){
										 alertify.alert("All Fault Detected Successfully !!!");
										 $('#mainDiv').html('');
											$('#mainDiv').html('<div class="col-md-offset-3 col-md-6 col-md-offset-3"><div class="alert alert-success" style="margin-top:150px; font-size:22px; font-weight:bold;">Congratulations!!! Level Control system experiment is completed successfully!!</div></div>');
										 
									 }else{
										 alertify.alert("Fault Detection Successful! Please detect another new fault");
										 LC_FaultCheckFun(lowerSpLevel, higherSpLevel, LColdreadingSorted, LCarr_actualValSorted, LCarr_stdValSorted);
									 }
									    
								 }else{
									 
									 LC_wrongFaultCnt++;
									 LC_faultcheckCnt++;
//									 console.log(LC_faultcheckCnt);
									 
									 if(LC_fault == 1){
										 LC_faultName = "Impulse Line Block";
									 }else if(LC_fault == 2){
										 LC_faultName = "Transmitter is in saturation mode";
									 }else if(LC_fault == 3){
										 LC_faultName = 'Transmitter'+"'"+'s electrical section is expose to noise';
									 }else if(LC_fault == 4){
										 LC_faultName = "Open Electrical Connection";
									 }
									 
									 									

									 
									 
									 if(LC_faultcheckCnt == 2){
										 
										 alertify.alert("Wrong Fault..\nThe fault was '"+ LC_faultName +".' \nPlease try again for new fault"); 
										 LC_faultcheckCnt = 0;
										 LC_FaultCheckFun(lowerSpLevel, higherSpLevel, LColdreadingSorted, LCarr_actualValSorted, LCarr_stdValSorted);
										 
									 }else{
										 alertify.alert("Wrong Fault...Please Try Again  !!!");
									 }
									
								 }
								 
							 }
							 
							 
							 
							 
							 
						});
				 
			 }
			 
			 
	
}

 });