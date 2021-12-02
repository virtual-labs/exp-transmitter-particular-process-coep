

LC_ConfigureLT = function(appId){
	
	
		var LC_ConfigFlagCnt = 0;
		
		$("#TestDiv").html('');
		
		var configure = '';
		configure +='<div id = "configDiv" class="container-fluid">'
				+'<h4 align="center">LT Configuration</h4>'
				+'<h6>In this level configure the LT 100</h6>'
				//+'<div id="Reqtimer" class="col-md-12 col-sm-12"><i><label id="minutes">00</label><span>:</span><label id="seconds">00</label></i></div>'
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
				+'<select class="form-control" name="App" id="LC_spanLevel" >'
				+'<option value= 0 >Select</option>'
				+'<option value= 5 data-lowerspan = "0" data-higherspan="5">0-5 mtr</option>'
				+'<option value= 5 data-lowerspan = "1" data-higherspan="6">1-6 mtr</option>'	
				+'<option value= 4 data-lowerspan = "2" data-higherspan="6">2-6 mtr</option>'	
				+'<option value= 7 data-lowerspan = "0" data-higherspan="7">0-7 mtr</option>'
				+'<option value= 3 data-lowerspan = "2" data-higherspan="5">2-5 mtr</option>'					
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
				+'<input class="form-control" type="text" name="FC_Range" id="LC_Range" disabled  />'
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
				+'<label>Supply Voltage :</label> '
				+'</div>'
				+'<div class="col-sm-9 col-md-9 col-xl-9">'
				+'24 VDC'
				+'</div><br/>'
				+'</div>'
				
				+'<div class="row topmargin">'
				+'<div class="col-sm-3 col-md-3 col-xl-3">'
				+'<label>Loop Impedance :</label>'
				+'</div>'
				+'<div class="col-sm-9 col-md-9 col-xl-9">'
				+'750 Ohm'
				+'</div><br/>'
				+'</div>'
				
				+'<div class="row topmargin">'
				+'<div class="buttonDiv">'
				+'<button id="LC_LTcheckConfig">Check Configuration</button>&nbsp;&nbsp;&nbsp;'
				+'<button id="LC_LTwiringDiagram" hidden >Next Level</button>'
				+'</div>'
				+'</div>'
				+'</div>'
				
				+'</div>'; // container close
				
				
		
			
			$("#TestDiv").html(configure);
			
			stop_timer();
			set_timer();
		
		//animLT.repeat(0);
		LTCircle.attr({'fill':'green'});	
		glowLT.stop(animLT);
		LTCircle.unclick(LTClick);
	     
		 
		 $('select#LC_spanLevel').on(
				'change',
				function() {
					
					if(this.value == "0"){
						
						$("#LC_Range").prop("disabled", true);
					}else{
						
						$("#LC_Range").prop("disabled", false);
					}
					
					
				});
		 
		 
		 
		 
		 
		 $('#LC_LTcheckConfig').on(
				'click', function() {
					
					 var LC_configData = {};
					 var selectedType = $( "#trsmtrType option:selected" ).val();
					 var output = $( "#output option:selected" ).val();
					 var span = parseInt($( "#LC_spanLevel option:selected" ).val());
					// var temp = (rangePercentage/100)*span;
					 var range = (span * 100)/rangePercentage;
					// var range = span + temp;
		//			console.log(range);
					
					
					 var lowerSpanLevel = $("#LC_spanLevel").find(':selected').data('lowerspan');
					 var higherSpanLevel =  $("#LC_spanLevel").find(':selected').data('higherspan');
					
					
					var calrange = $("#LC_Range").val();
					
	             if(selectedType != "-1" && span != "0" && calrange != "" && output != "-1"){
						
						
						if(!isNaN(calrange)){
							
							
					if(calrange == range.toFixed(2) || calrange == range.toFixed(1)){
						if((selectedType == "twowire" && output == "0")|| (selectedType == "threewire" && output == "0")|| (selectedType == "fourwire" && output == "0")){
							
						   alertify.alert('Success!!',"Configuration is successful. Please click next level to proceed for  wiring of transmitter");
						   $(".ajs-header").css("background-color","#4CAF50");
						   $("#LC_LTwiringDiagram").prop("hidden", false);
						   $("#trsmtrType, #LC_spanLevel, #LC_Range, #output").prop("disabled", true);				   
							
						}else if(selectedType == "hart" && output == "1"){
							
							alertify.alert('Success!!',"Configuration is successful. Please click next level to proceed for  wiring of transmitter");
							 $(".ajs-header").css("background-color","#4CAF50");
							$("#LC_LTwiringDiagram").prop("hidden", false);
						   $("#trsmtrType, #LC_spanLevel, #LC_Range, #output").prop("disabled", true);
						   
						}else if(selectedType == "fftrans" && output == "2"){
							
							alertify.alert('Success!!',"Configuration is successful. Please click next level to proceed for  wiring of transmitter");
							 $(".ajs-header").css("background-color","#4CAF50");
							$("#LC_LTwiringDiagram").prop("hidden", false);
						   $("#trsmtrType, #LC_spanLevel, #LC_Range, #output").prop("disabled", true);
						   
						}else{
							
							alertify.alert("Alert","Please Select The Correct Output As Per Selected Transmitter Type");
							$(".ajs-header").css("background-color","#ce6058");
						}
						
						
						minutes = document.getElementById("minutes").textContent;
		        		seconds = document.getElementById("seconds").textContent;        		
//		        		console.log(minutes+":"+seconds);
						
						LC_configData.appId = appId;
						LC_configData.trsmtrTpye = selectedType;
						LC_configData.span = span;
						LC_configData.range = calrange;
						LC_configData.output = output;
						LC_configData.configcnt = LC_ConfigFlagCnt;
						LC_configData.lowerSpanLevel= lowerSpanLevel;
						LC_configData.higherSpanLevel= higherSpanLevel;
						LC_configData.configTimeInMin = minutes;
						LC_configData.configTimeInSec = seconds;
						
						
					//	console.log(LC_configData);
						LC_appData.lcConfigData = LC_configData;
					//	console.log(LC_appData);
						ExpTrackData.lcAppData = LC_appData
//						console.log(ExpTrackData);
						
						$("#errRange" ).css("display","none");
						
						stop_timer();
						
					}else{
						
						if(LC_ConfigFlagCnt == 3){
							
							$("#errRange" ).css("display","none");
							alertify.alert("Alert","Range is incorrect\nCorrect Range is: " +range.toFixed(2));						
						}else{
							
							$("#errRange" ).css("display","none");
							alertify.alert("Alert","Range is incorrect");
							$(".ajs-header").css("background-color","#ce6058");
							LC_ConfigFlagCnt++;
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
		 
		 
	
			$('#LC_LTwiringDiagram').on(
				'click', function() {
					
						var selectedType = $( "#trsmtrType option:selected" ).val();
		//				console.log(selectedType);
						connectionLevel(appId, selectedType);
						
						
					
					
					
							
				});
}

 
		   
			
							
							
			