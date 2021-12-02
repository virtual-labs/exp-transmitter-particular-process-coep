

TC_ConfigureLT = function(appId){
	
	
		var TC_ConfigFlagCnt = 0;
		
		$("#TestDiv").html('');
		
		var configure = '';
		configure +='<div id = "configDiv" class="container-fluid">'
		
				+'<h4 align="center">TT Configuration</h4>'
				+'<h6>In this level configure the TT 100</h6>'
				+'<div class="row topmargin">'
				+'<div class="col-sm-3 col-md-3 col-xl-3">'
				+'<label>Select Type:</label>'
				+'</div>'
				+'<div class="col-sm-9 col-md-9 col-xl-9">'
				+'<select class="form-control" name="App" id="trsmtrType" >'
				+'<option value="-1">Select</option>'
				+'<option value="twowire">2-Wire</option>'
				+'<option value="threewire">3-Wire</option>'
				+'<option value="fourwire">4-Wire</option>'
				+'<option value="hart">HART Transmitter</option>'
				+'<option value="fftrans">FF</option>'
				+'</select>'
				+'</div><br/>'
				+'</div>'
				
				+'<div class="row topmargin">'
				+'<div class="col-sm-3 col-md-3 col-xl-3">'
				+'<label>Select Span:</label>'
				+'</div>'
				+'<div class="col-sm-9 col-md-9 col-xl-9">'
				+'<select class="form-control" name="App" id="TC_spanLevel" >'
				+'<option value= 0 >Select</option>'
				+'<option value= 200 data-lowerspan = "0" data-higherspan="200">0-200 °C</option>'
				+'<option value= 50  data-lowerspan = "50" data-higherspan="250">50-250 °C</option>'	
				+'<option value= 150 data-lowerspan = "-50" data-higherspan="200">-50-200 °C</option>'	
				+'<option value= 300 data-lowerspan = "0" data-higherspan="300">0-300 °C</option>'								
				+'</select>'
				+'</div><br/>'
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
				+'<label>Range :</label>'
				+'</div>'
				+'<div class="col-sm-9 col-md-9 col-xl-9">'
				+'<input class="form-control" type="text" id="TC_Range" disabled  />'
				+'<div id="errRange" style="display:none; color:red">Range is not a number</div>'
				+'</div>'
				+'</div>'
				
				+'<div class="row topmargin">'
				+'<div class="col-sm-3 col-md-3 col-xl-3">'
				+'<label>Output :</label>'
				+'</div>'
				+'<div class="col-sm-9 col-md-9 col-xl-9">'				
				+'<select class="form-control" name="App" id="output" >'
				+'<option value="-1">Select</option>'
				+'<option value="0">4-20 mA</option>'
				+'<option value="1">4-20 mA and Modulated Signal</option>'	
				+'<option value="2">Digital Signal Output</option>'				
				+'</select>'
				+'</div><br/>'
				+'</div>'
				
				+'<div class="row topmargin">'
				+'<div class="col-sm-3 col-md-3 col-xl-3">'
				+'<label>Supply Voltage :</label>'
				+'</div>'
				+'<div class="col-sm-9 col-md-9 col-xl-9">'
				+'<div>24 VDC</div><br/>'
				+'</div><br/>'
				+'</div>'
				
				+'<div class="row topmargin">'
				+'<div class="col-sm-3 col-md-3 col-xl-3">'
				+'<label>Loop Impedance :</label>'
				+'</div>'
				+'<div class="col-sm-9 col-md-9 col-xl-9">'
				+'<div>750 Ohm</div><br/>'
				+'</div><br/>'
				+'</div>'
				
				+'<div class="row topmargin">'
				+'<div class="buttonDiv">'
				+'<button id="TC_TTcheckConfig">Check Configuration</button>&nbsp;&nbsp;&nbsp;'
				+'<button id="TC_TTwiringDiagram" hidden >Next Level</button>'
				+'</div>'
				+'</div>'
				+'</div>'
				
				+'</div>'; // container close
				
				
		
			
			$("#TestDiv").html(configure);
			
			stop_timer();
			set_timer();
			
		
		//animLT.repeat(0);
		TTCircle.attr({'fill':'green'});
		glowTT.stop(animTT);
		TTCircle.unclick(TTClick);
	     
		 
		 $('select#TC_spanLevel').on(
				'change',
				function() {
					
					if(this.value == "0"){
						
						$("#TC_Range").prop("disabled", true);
					}else{
						
						$("#TC_Range").prop("disabled", false);
					}
					
					
				});
		 
		 
		 
		 
		 
		 $('#TC_TTcheckConfig').on(
				'click', function() {
					
					var TC_configData = {};
					var selectedType = $( "#trsmtrType option:selected" ).val();
					var output = $( "#output option:selected" ).val();
					
					 var span = parseInt($( "#TC_spanLevel option:selected" ).val());
					// var temp = (rangePercentage/100)*span;					 
					// var range = span + temp;
					 var range = (span * 100)/rangePercentage;
//					console.log(range);
					
					
					var lowerSpanLevel = $("#TC_spanLevel").find(':selected').data('lowerspan');
					 var higherSpanLevel =  $("#TC_spanLevel").find(':selected').data('higherspan');
					
					
					var calrange = $("#TC_Range").val();
					
					if(selectedType != "-1" && span != "0" && calrange != "" && output != "-1"){
						
						if(!isNaN(calrange)){
							if(calrange == range.toFixed(2) || calrange == range.toFixed(1)){
						
						if((selectedType == "twowire" && output == "0")|| (selectedType == "threewire" && output == "0")|| (selectedType == "fourwire" && output == "0")){
							
						   alertify.alert('Success!!',"Configuration is successful. Please click next level to proceed for  wiring of transmitter");
						   $(".ajs-header").css("background-color","#4CAF50");

						   $("#TC_TTwiringDiagram").prop("hidden", false);
						   $("#trsmtrType, #TC_spanLevel, #TC_Range, #output").prop("disabled", true);				   
							
						}else if(selectedType == "hart" && output == "1"){
							
							alertify.alert('Success!!',"Configuration is successful. Please click next level to proceed for  wiring of transmitter");
							$(".ajs-header").css("background-color","#4CAF50");

						   $("#TC_TTwiringDiagram").prop("hidden", false);
						   $("#trsmtrType, #TC_spanLevel, #TC_Range, #output").prop("disabled", true);
						}else if(selectedType == "fftrans" && output == "2"){
							
							alertify.alert('Success!!',"Configuration is successful. Please click next level to proceed for  wiring of transmitter");
							$(".ajs-header").css("background-color","#4CAF50");

						   $("#TC_TTwiringDiagram").prop("hidden", false);
						   $("#trsmtrType, #TC_spanLevel, #TC_Range, #output").prop("disabled", true);
						}else{
							
							alertify.alert('Alert',"Please Select The Correct Output As Per Selected Transmitter Type");
							$(".ajs-header").css("background-color","#ce6058");
						}
						
						
						minutes = document.getElementById("minutes").textContent;
		        		seconds = document.getElementById("seconds").textContent;        		
//		        		console.log(minutes+":"+seconds);
						
						TC_configData.appId = appId;
						TC_configData.trsmtrTpye = selectedType;
						TC_configData.span = span;
						TC_configData.range = calrange;
						TC_configData.output = output;
						TC_configData.configcnt = TC_ConfigFlagCnt;
						TC_configData.lowerSpanLevel= lowerSpanLevel;
						TC_configData.higherSpanLevel= higherSpanLevel;
						TC_configData.configTimeInMin = minutes;
						TC_configData.configTimeInSec = seconds;
						
						
					//	console.log(TC_configData);
						TC_appData.tcConfigData = TC_configData;
					//	console.log(TC_appData);
						ExpTrackData.tcAppData = TC_appData
//						console.log(ExpTrackData);
						$("#errRange" ).css("display","none");
						
						stop_timer();
						
					}else{
						
						if(TC_ConfigFlagCnt == 3){
							$("#errRange" ).css("display","none");
							alertify.alert('Alert',"Range is incorrect \n Correct Range is: " +range.toFixed(2));	
							$(".ajs-header").css("background-color","#ce6058");
						}else{
							$("#errRange" ).css("display","none");
							alertify.alert('Alert',"Range is incorrect");
							$(".ajs-header").css("background-color","#ce6058");
							TC_ConfigFlagCnt++;
						}
		
						
					}
							
						}else{
							
							$("#errRange" ).css("display","inline");
						}
						
						
					}else{
						
						alertify.alert('Alert',"Please Select All The Fields");
						$(".ajs-header").css("background-color","#ce6058");
						
					}
					
					
					
					
					
		 });
		 
		 
	
			$('#TC_TTwiringDiagram').on(
				'click', function() {
					
						var selectedType = $( "#trsmtrType option:selected" ).val();
	//					console.log(selectedType);
						connectionLevel(appId, selectedType);
						
						
					
					
					
							
				});
}

 
		   
			
							
							
			