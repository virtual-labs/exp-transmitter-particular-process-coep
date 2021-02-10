

PC_ConfigureLT = function(appId){
	
	
		var PC_ConfigFlagCnt = 0;
		
		$("#TestDiv").html('');
		
		var configure = '';
		configure +='<div id = "configDiv" class="container-fluid">'
				+'<h4 align="center">PT Configuration</h4>'
				+'<h6>In this level configure the PT 100</h6>'
				+'<div class="row topmargin">'
				+'<div class="col-sm-3 col-md-3 col-xl-3">'
				+'<span>Select Type:</span>'
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
				+'<span>Select Span:</span>'
				+'</div>'
				+'<div class="col-sm-9 col-md-9 col-xl-9">'
				+'<select class="form-control" name="App" id="PC_spanLevel" >'
				+'<option value= 0 >Select</option>'
				+'<option value= 6 data-lowerspan = "0" data-higherspan="6">0-6 cm²</option>'
				+'<option value= 6 data-lowerspan = "1" data-higherspan="7">1-7 cm²</option>'	
				+'<option value= 7 data-lowerspan = "3" data-higherspan="10">3-10 cm²</option>'	
				+'<option value= 8 data-lowerspan = "0" data-higherspan="8">0-8 cm²</option>'
				+'<option value= 6 data-lowerspan = "2" data-higherspan="8">2-8 cm²</option>'					
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
				+'<span>Range :</span>'
				+'</div>'
				+'<div class="col-sm-9 col-md-9 col-xl-9">'
				+'<input class="form-control" type="text" id="PC_Range" disabled  />'
				+'<div id="errRange" style="display:none; color:red">Range is not a number</div>'
				+'</div>'
				+'</div>'
				
				+'<div class="row topmargin">'
				+'<div class="col-sm-3 col-md-3 col-xl-3">'
				+'<span>Output :</span>'
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
				+'<button id="PC_PTcheckConfig">Check Configuration</button>&nbsp;&nbsp;&nbsp;'
				+'<button id="PC_PTwiringDiagram" hidden >Next Level</button>'
				+'</div>'
				+'</div>'
				+'</div>';
				
				
		        +'</div>'; // container close
			
			$("#TestDiv").html(configure);
		
		//animLT.repeat(0);
		PTCircle.attr({'fill':'green'});
		glowPT.stop(animPT);
		PTCircle.unclick(PTClick);
	     
		 
		 $('select#PC_spanLevel').on(
				'change',
				function() {
					
					if(this.value == "0"){
						
						$("#PC_Range").prop("disabled", true);
					}else{
						
						$("#PC_Range").prop("disabled", false);
					}
					
					
				});
		 
		 
		 
		 
		 
		 $('#PC_PTcheckConfig').on(
				'click', function() {
					
					var PC_configData = {};
					var selectedType = $( "#trsmtrType option:selected" ).val();
					var output = $( "#output option:selected" ).val();
					
					 var span = parseInt($( "#PC_spanLevel option:selected" ).val());
					// var temp = (rangePercentage/100)*span;
					// var range = span + temp;
					 var range = (span * 100)/rangePercentage;
//					console.log(range);
					
					 var lowerSpanLevel = $("#PC_spanLevel").find(':selected').data('lowerspan');
					 var higherSpanLevel =  $("#PC_spanLevel").find(':selected').data('higherspan');
					
					
					
					
					var calrange = $("#PC_Range").val();
					
					
					if(selectedType != "-1" && span != "0" && calrange != "" && output != "-1"){
						
						if(!isNaN(calrange)){
							
								if(calrange == range.toFixed(2) || calrange == range.toFixed(1)){
						
						if((selectedType == "twowire" && output == "0")|| (selectedType == "threewire" && output == "0")|| (selectedType == "fourwire" && output == "0")){
							
						   alertify.alert("Configuration is successful. Please click next level to do Electrical Wiring Connections of transmitter");
						   $("#PC_PTwiringDiagram").prop("hidden", false);
						   $("#trsmtrType, #PC_spanLevel, #PC_Range, #output").prop("disabled", true);				   
							
						}else if(selectedType == "hart" && output == "1"){
							
							alertify.alert("Configuration is successful.  Please click next level to do Electrical Wiring Connections of transmitter");
						   $("#PC_PTwiringDiagram").prop("hidden", false);
						   $("#trsmtrType, #PC_spanLevel, #PC_Range, #output").prop("disabled", true);
						}else if(selectedType == "fftrans" && output == "2"){
							
							alertify.alert("Configuration is successful.  Please click next level to do Electrical Wiring Connections of transmitter");
						   $("#PC_PTwiringDiagram").prop("hidden", false);
						   $("#trsmtrType, #PC_spanLevel, #PC_Range, #output").prop("disabled", true);
						}else{
							
							alertify.alert("Please Select The Correct Output As Per Selected Transmitter Type");
						}
						
						PC_configData.appId = appId;
						PC_configData.trsmtrTpye = selectedType;
						PC_configData.span = span;
						PC_configData.range = calrange;
						PC_configData.output = output;
						PC_configData.configcnt = PC_ConfigFlagCnt;
						PC_configData.lowerSpanLevel= lowerSpanLevel;
						PC_configData.higherSpanLevel= higherSpanLevel;
						
					//	console.log(PC_configData);
						PC_appData.pcConfigData = PC_configData;
					//	console.log(PC_appData);
						ExpTrackData.pcAppData = PC_appData
//						console.log(ExpTrackData);
						$("#errRange" ).css("display","none");
					}else{
						
						if(PC_ConfigFlagCnt == 3){
							$("#errRange" ).css("display","none");
							alertify.alert("Range is incorrect \n Correct Range is: " +range.toFixed(2));						
						}else{
							$("#errRange" ).css("display","none");
							alertify.alert("Range is incorrect");
							PC_ConfigFlagCnt++;
						}
		
						
					}
							
						}else{
							
							$("#errRange" ).css("display","inline");
						}
						
						
					}else{
						
						alertify.alert("Please Select All The Fields");
						
					}
					
					
				
					
		 });
		 
		 
	
			$('#PC_PTwiringDiagram').on(
				'click', function() {
					
						var selectedType = $( "#trsmtrType option:selected" ).val();
//						console.log(selectedType);
						connectionLevel(appId, selectedType);
						
						
					
					
					
							
				});
}

 
		   
			
							
							
			