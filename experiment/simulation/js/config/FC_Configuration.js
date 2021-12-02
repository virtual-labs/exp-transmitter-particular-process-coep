

FC_ConfigureFT = function(appId){
	
	
		var FC_ConfigFlagCnt = 0;
		
		$("#TestDiv").html('');
		
		var configure = '';
		configure +='<div id = "configDiv" class="container-fluid">'
				+'<h4 align="center">FT Configuration</h4>'
				+'<h6>In this level configure the FT 100</h6>'
			//	+'<form id="FCConfigFlagCntForm" class="well form-horizontal"  >'
				+'<div class="row topmargin">'
				
				+'<div class="col-sm-3 col-md-3 col-xl-3">'
				
				+'<span>Select Type:</span>'
				+'</div>'
				+'<div class="col-sm-9 col-md-9 col-xl-9">'
				+'<select class="form-control" name="trsmtrType" id="trsmtrType" >'
				+'<option value="-1">Select</option>'
				+'<option value="twowire">2-Wire</option>'
				+'<option value="threewire">3-Wire</option>'
				+'<option value="fourwire">4-Wire</option>'
				+'<option value="hart">HART Transmitter</option>'
				+'<option value="fftrans">FF</option>'
				+'</select><br/>'
				+'</div>'
				
				+'<div class="row topmargin">'
				+'<div class="col-sm-3 col-md-3 col-xl-3">'
				+'<span>Select Span:</span>'
				+'</div>'
				+'<div class="col-sm-9 col-md-9 col-xl-9">'
				+'<select class="form-control" name="FC_spanLevel" id="FC_spanLevel" >'
				+'<option value= 0 >Select</option>'
				+'<option value= 3500 data-lowerspan = "0" data-higherspan="3500">0-3500 lph</option>'
				+'<option value= 3700 data-lowerspan = "100" data-higherspan="3800">100-3800 lph</option>'	
				+'<option value= 4000 data-lowerspan = "500" data-higherspan="4500">500-4500 lph</option>'	
				+'<option value= 4500 data-lowerspan = "0" data-higherspan="4500">0-4500 lph</option>'
				+'<option value= 4600 data-lowerspan = "200" data-higherspan="4800">200-4800 lph</option>'					
				+'</select><br/>'
				+'</div>'
				
				+'<div class="row topmargin">'
				+'<div class="col-sm-3 col-md-3 col-xl-3">'
//				+'<span>Select Span:</span>'
				+'</div>'
				+'<div class="col-sm-9 col-md-9 col-xl-9">'
				+'<div style="color:red;font-weight:bold;font-size:15px;"><i>(Range will be 100 &&nbsp;' +rangePercentage+ '% of span)</i></div>'			
				+'<br/>'
				+'</div>'
				
				+'<div class="row topmargin">'
				+'<div class="col-sm-3 col-md-3 col-xl-3">'
				+'<span>Range :</span>'
				+'</div>'
				+'<div class="col-sm-9 col-md-9 col-xl-9">'
				+'<input class="form-control" type="text" name="FC_Range" id="FC_Range" disabled  />'
				+'<div id="errRange" style="display:none; color:red">Range is not a number</div>'
				+'</div>'
				+'</div>'
				
				
				+'<div class="row topmargin">'
				+'<div class="col-sm-3 col-md-3 col-xl-3">'
				+'<span>Output :</span>'
				+'</div>'
				+'<div class="col-sm-9 col-md-9 col-xl-9">'
				+'<select class="form-control" name="output" id="output" >'
				+'<option value="-1">Select</option>'
				+'<option value="0">4-20 mA</option>'
				+'<option value="1">4-20 mA and Modulated Signal</option>'	
				+'<option value="2">Digital Signal Output</option>'				
				+'</select><br/>'
			
				+'</div>'
				
				+'<div class="row topmargin">'
				+'<div class="col-sm-3 col-md-3 col-xl-3">'
				+'<span>Supply Voltage :</span>'
				+'</div>'
				+'<div class="col-sm-9 col-md-9 col-xl-9">'
				+'<span>24 VDC</span><br/>'
				+'</div><br/>'
				+'</div>'
				
				
				+'<div class="row topmargin">'
				+'<div class="col-sm-3 col-md-3 col-xl-3">'
				+'<span>Loop Impedance :</span>' 
				+'</div>'
				+'<div class="col-sm-9 col-md-9 col-xl-9">'
				+'<span>750 Ohm</span><br/>'
				+'</div><br/>'
				+'</div>'
				
				+'<div class="row topmargin">'
				+'<div class="buttonDiv">'
				+'<button id="FC_FTcheckConfig">Check Configuration</button>&nbsp;&nbsp;&nbsp;'
				+'<button id="FC_FTwiringDiagram" hidden >Next Level</button>'
				
				+'</div>'
				+'</div>'
				
				+'</div>';
				
			//	+'</form>'
		        +'</div>'; // container close
			
			$("#TestDiv").html(configure);
			
			stop_timer();
			set_timer();
		
		//animLT.repeat(0);
		FTCircle.attr({'fill':'green'});
		glowFT.stop(animFT);
		FTCircle.unclick(FTClick);
	    
		 $('select#FC_spanLevel').on(
				'change',
				function() {
					
					if(this.value == "0"){
						
						$("#FC_Range").prop("disabled", true);
						
						
					}else{
						
						$("#FC_Range").prop("disabled", false);
						
					}
					
					
				});
		
		 
	
	
		 $('#FC_FTcheckConfig').on(
				'click', function() {
				
					 var FC_configData = {};
					 var selectedType = $( "#trsmtrType option:selected" ).val();
					 var output = $( "#output option:selected" ).val();
					
					 var span = parseInt($( "#FC_spanLevel option:selected" ).val());
					// var temp = (rangePercentage/100)*span;
					// var range = span + temp;
					 var range = (span * 100)/rangePercentage;
//					 console.log(range);
					
					 var lowerSpanLevel = $("#FC_spanLevel").find(':selected').data('lowerspan');
					 var higherSpanLevel =  $("#FC_spanLevel").find(':selected').data('higherspan');
					 
					 
					 
					 
					var calrange = $("#FC_Range").val();
					
				
					
					
					if(selectedType != "-1" && span != "0" && calrange != "" && output != "-1"){
						
						
						if(!isNaN(calrange)){
						
						
						if(calrange == range.toFixed(2) || calrange == range.toFixed(1)){
						
						
						
						if((selectedType == "twowire" && output == "0")|| (selectedType == "threewire" && output == "0")|| (selectedType == "fourwire" && output == "0")){
							
						   alertify.alert('Success!!',"Configuration is successful. Please click next level to proceed for  wiring of transmitter");
						   $(".ajs-header").css("background-color","#4CAF50");
						   $("#FC_FTwiringDiagram").prop("hidden", false);
						   $("#trsmtrType, #FC_spanLevel, #FC_Range, #output").prop("disabled", true);				   
							
						}else if(selectedType == "hart" && output == "1"){
							
							alertify.alert('Success!!',"Configuration is successful. Please click next level to proceed for  wiring of transmitter");
							$(".ajs-header").css("background-color","#4CAF50");
						   $("#FC_FTwiringDiagram").prop("hidden", false);
						   $("#trsmtrType, #FC_spanLevel, #FC_Range, #output").prop("disabled", true);
						}else if(selectedType == "fftrans" && output == "2"){
							
							alertify.alert('Success!!',"Configuration is successful. Please click next level to proceed for  wiring of transmitter");
							$(".ajs-header").css("background-color","#4CAF50");
						   $("#FC_FTwiringDiagram").prop("hidden", false);
						   $("#trsmtrType, #FC_spanLevel, #FC_Range, #output").prop("disabled", true);
						}else{
							
							alertify.alert("Alert","Please Select The Correct Output As Per Selected Transmitter Type");
							$(".ajs-header").css("background-color","#ce6058");
						}
						
						
						minutes = document.getElementById("minutes").textContent;
		        		seconds = document.getElementById("seconds").textContent;        		
//		        		console.log(minutes+":"+seconds);
						
						FC_configData.appId = appId;
						FC_configData.trsmtrTpye = selectedType;
						FC_configData.span = span;
						FC_configData.range = calrange;
						FC_configData.output = output;
						FC_configData.configcnt = FC_ConfigFlagCnt;
						FC_configData.lowerSpanLevel= lowerSpanLevel;
						FC_configData.higherSpanLevel= higherSpanLevel;
						FC_configData.configTimeInMin = minutes;
						FC_configData.configTimeInSec = seconds
						
					//	console.log(FC_configData);
						FC_appData.fcConfigData = FC_configData;
					//	console.log(FC_appData);
						ExpTrackData.fcAppData = FC_appData
//						console.log(ExpTrackData);
						
						$("#errRange" ).css("display","none");
						
						stop_timer();
						
					}else{
						
						if(FC_ConfigFlagCnt == 3){
							
							$("#errRange" ).css("display","none");
							alertify.alert("Alert","Range is incorrect \n Correct Range is: " +range.toFixed(2));	
							$(".ajs-header").css("background-color","#ce6058");
						}else{
							
							$("#errRange" ).css("display","none");
							alertify.alert("Alert","Range is incorrect");
							$(".ajs-header").css("background-color","#ce6058");
							
							FC_ConfigFlagCnt++;
						}
		
						
					}
						}else{
							
						//	alertify.alert("Range = "+calrange+" is not a number");
							$("#errRange" ).css("display","inline");
						}	
					}else{
						
						alertify.alert("Alert","Please Select All The Fields");
						$(".ajs-header").css("background-color","#ce6058");
						
					}
					
					   
				
		 });
		 
		 
	
			$('#FC_FTwiringDiagram').on(
				'click', function() {
					
						var selectedType = $( "#trsmtrType option:selected" ).val();
//						console.log(selectedType);
						connectionLevel(appId, selectedType);
						
						
					
					
					
							
				});
				
				
}

 
		   
						
							
			