//var SINGLEACTINGCYLINDER = SINGLEACTINGCYLINDER || {};

 $(function () {

//SINGLEACTINGCYLINDER.FC_Characterisation = function(appId, transType) {

	 FC_Characterisation = function(appId, transType){

//	var lowerSpLevel = 0;
//	var higherSpLevel = 4800;
	
	var FC_CharacterisationData = {};
	
	var lowerSpLevel = ExpTrackData.fcAppData.fcConfigData.lowerSpanLevel;
	var higherSpLevel = ExpTrackData.fcAppData.fcConfigData.higherSpanLevel;

	

	var numofReading = 5;
	var FColdreading = [];
	var FCarr_trueread = [];
	var FCarr_actualVal = [];
	var FCarr_stdVal = [];
	var FColdreadingForGraph = [];
	var readingcnt = 0;

	FC_DefaultErr = randomErr_FC(FC_RandomErrArr);

//	console.log("FC ERROR "+FC_DefaultErr);
	
	$("#mainDiv").html('');

	var FC_characterisation = '';
	FC_characterisation += '<div class="col-md-6 col-sm-12" id="canvasMainDiv"><div id="canvas" class="col-md-12"></div></div>'

			+ '<div class="col-md-6 col-sm-12" id="FC_characterisationDIv">'
			+ '<div id = "TestDiv" >'
			+'<h1>FT Characterisation</h1>'
			+'<h6>In this level characterize the FT 100</h6>'
			+ '<div class="slidecontainer" id="FC_Slider">'
			+ '<div class="header">Pump Outlet Flow (span  '
			+ lowerSpLevel
			+ '-'
			+ higherSpLevel
			+ '  lph)</div>'
			+ '<input step="100" type="range" min='
			+ lowerSpLevel
			+ ' max='
			+ higherSpLevel
			+ ' value='
			+ lowerSpLevel
			+ ' id="FC_tankLvl">'
			+ '<p>Value: <span id="demo"></span></p>'
			+ '</div>'
			+ '<div class="buttonDiv">'
			+ '<button id="submit_FC_WaterLevel">Submit</button>'
			+ '<button id="FC_graph" >Check Graph</button>'
			+ '<button id="FC_calibration" hidden >Next Level</button>'
			+ '</div>' + '</div>' + '</div>'
			+'<div class="col-md-6 col-sm-12" id = "TestNextDiv" style="display:none">'
			+'<div >'
	$(mainDiv).html(FC_characterisation);
	
	stop_timer();
	set_timer();
	

	var slider = document.getElementById("FC_tankLvl");
	var output = document.getElementById("demo");
	output.innerHTML = slider.value;

	slider.oninput = function() {
		output.innerHTML = this.value;
	}

	$('#submit_FC_WaterLevel')
			.on(
					'click',
					function() {

						var waterlevel = slider.value;

						if ($.inArray(parseFloat(waterlevel), FColdreading) >= 0) {
							alertify.alert("Alert",'This Value Reading is already Present.  Please Select Another Value For Reading');
							$(".ajs-header").css("background-color","#ce6058");

						} else {
							$("#FC_graph").prop("hidden", false);
							var trueReading = ((waterlevel - lowerSpLevel) * 100)
									/ (higherSpLevel - lowerSpLevel);

							var closestValue = FC_findColsetValue(trueReading
									.toFixed(2), FC_trueReading_arr);
							var idx = FC_trueReading_arr.indexOf(closestValue);

							var formulaVal = FC_applyFormula(closestValue, idx,
									trueReading).toFixed(2);

							var actualVal = FC_calActualVal(formulaVal,
									higherSpLevel, lowerSpLevel).toFixed(2);

							var standardVal = FC_calActualVal(trueReading,
									higherSpLevel, lowerSpLevel).toFixed(2);

							var trueread = ((trueReading * (higherSpLevel - lowerSpLevel)) / 100)
									.toFixed(2);

//							console.log("values   " + trueReading.toFixed(2)
//									+ "   " + closestValue + "    "
//									+ formulaVal + "    " + actualVal + "    "
//									+ trueread);

							FColdreading.push(parseFloat(waterlevel));
							FColdreadingForGraph.push(parseFloat(waterlevel));
//							FColdreading.sort(function(a, b) {
//								return a - b
//							});

							FCarr_trueread.push(parseFloat(trueread));

							FCarr_actualVal.push(parseFloat(actualVal));
//							FCarr_actualVal.sort(function(a, b) {
//								return a - b
//							});

							FCarr_stdVal.push(parseFloat(standardVal));
//							FCarr_stdVal.sort(function(a, b) {
//								return a - b
//							});

							// console.log("arr true reading"+FColdreading);
							// console.log("arr actual
							// reading"+FCarr_actualVal);

							var FC_IOtable = '';
							if (readingcnt == 0) {

								FC_IOtable += '<div id = "IOtable" >'
										+ '<table id="table_IO" class="table table-striped table-bordered" style="width:100%">'
										+ '<thead>'
										+ '<tr>'
										+ '<th>Reading No.</th><th>Input (in lph)</th><th>Output (in in mA)</th>'
										+ '</tr>'
										+ '</thead>'

										+ '<tbody id="tablebody_IO">'
										+ '<tr><td>'
										+ (readingcnt + 1)
										+ '</td><td>'
										+ waterlevel
										+ '</td><td>'
										+ actualVal
										+ '</td></tr>'

										+ '</tbody>'

										+ '</table>'
										// +'<table
										// id="table_IO"><tr><th>Reading
										// No.</th><th>Input (in
										// lph)</th><th>Output (in in mA)</th>'
										// +'</tr><tr><td>'+(readingcnt+1)+'</td><td>'+waterlevel+'</td><td>'+actualVal+'</td></tr>'
										// +'</table>'
										+ '</div>'
										+ '<div id="FC_chartContainer" class="col-md-12"style="height: 400px; width: 90%; padding:0 5%" hidden></div>'
										// +'<div id = "FCgraphContainer" >'
										+ '</div>';

								readingcnt++;

								$(TestDiv).append(FC_IOtable);

								paper.clear();
								anim_FlowControl(lowerSpLevel, higherSpLevel);
								FC_LabelValue((x + 350), (y + 80),
										parseFloat(actualVal) + " mA", "green");
								FC_LabelValue((x + 350), (y + 180),
										parseFloat(waterlevel) + " lph",
										"green");
								FC_LabelValue((x + 510), (y + 300),
										parseFloat(trueReading.toFixed(2))
												+ " %", "green");
							} else {
								var table = $('#table_IO').DataTable({
									"pageLength" : 5,
									dom : 'Bfrtip',
									"bDestroy" : true,
									title : 'Data export',
									buttons : [ {
										extend : 'excelHtml5',
										title : 'FT Characterisation value'

									}, {
										extend : 'pdfHtml5',
										title : 'FT Characterisation value'
									} ]
								});
								table.row
										.add(
												[ readingcnt + 1, waterlevel,
														actualVal ]).draw();
								// FC_IOtable
								// +='<tr><td>'+(readingcnt+1)+'</td><td>'+waterlevel+'</td><td>'+actualVal+'</td></tr>'
								table.page('last').draw('page');
								+'</div>';

								readingcnt++;
								// $(table_IO).append(FC_IOtable);

								paper.clear();
								anim_FlowControl(lowerSpLevel, higherSpLevel);
								FC_LabelValue((x + 350), (y + 80),
										parseFloat(actualVal) + " mA", "green");
								FC_LabelValue((x + 350), (y + 180),
										parseFloat(waterlevel) + " lph",
										"green");
								FC_LabelValue((x + 510), (y + 300),
										parseFloat(trueReading.toFixed(2))
												+ " %", "green");

							}

						}

					});

	$('#FC_graph')
			.on(
					'click',
					function() {

						if (readingcnt < numofReading) {

							alertify.alert("Alert","Please take at least " + numofReading
									+ " readings");
							$(".ajs-header").css("background-color","#ce6058");
						}
						
						if (readingcnt >= numofReading) {
							$("#FC_chartContainer").prop("hidden", false);	
							window.scrollTo(0,$('#FC_characterisationDIv').height());
//							FColdreadingForGraph.push(parseFloat(waterlevel));
							FColdreadingForGraph.sort(function(a, b) {
								return a - b
							});

							
							var OldValue = [];
							for (var j = 0; j < FColdreadingForGraph.length; j++) {
								var olValueJson = {
										x : FColdreadingForGraph[j],
										y : FCarr_actualVal[FColdreading.indexOf(FColdreadingForGraph[j])],
									markerType : "circle",
									markerSize : 8

								};
								OldValue.push(olValueJson);
							}
//							 console.log(OldValue);
							 FCDrowGraph();
							 FC_Updategraph(OldValue,lowerSpLevel, higherSpLevel);
							$("#FC_calibration").prop("hidden", false);
						}

						// $("#LC_calibration").prop("disabled", false);
						// $("#submit_LC_WaterLevel").prop("disabled", true);
						// $("#LC_graph").prop("disabled", true);
						//			     

					});

	
	$('#FC_calibration').on('click', function() {

		if(FColdreadingForGraph.indexOf(lowerSpLevel) == -1){
			
			alertify.alert("Alert","Please Select Lower Span Value And Plot The Graph Again");
			$(".ajs-header").css("background-color","#ce6058");
			$("#FC_calibration").prop("hidden", true);
			$("#FC_graph").prop("hidden", true);			
			$("#FC_chartContainer").html('');
			
		}else if(FColdreadingForGraph.indexOf(higherSpLevel) == -1){
			
			alertify.alert("Alert","Please Select Higher Span Value And Plot The Graph Again");
			$(".ajs-header").css("background-color","#ce6058");
			$("#FC_calibration").prop("hidden", true);
			$("#FC_graph").prop("hidden", true);	
			$("#FC_chartContainer").html('');
		
			
		}else{
			
			minutes = document.getElementById("minutes").textContent;
    		seconds = document.getElementById("seconds").textContent;        		
//    		console.log(minutes+":"+seconds);
			
			
			
			FC_CharacterisationData.fcreading = FColdreading;
			FC_CharacterisationData.fcactualVal = FCarr_actualVal;
			FC_CharacterisationData.fcstdVal = FCarr_stdVal;
			FC_CharacterisationData.CharacTimeInMin = minutes;
			FC_CharacterisationData.CharacTimeInSec = seconds;
			
//			console.log(FC_CharacterisationData);
			
	
			ExpTrackData.fcCharactData = FC_CharacterisationData;
			
//			console.log(ExpTrackData);
			
			stop_timer();
			
			
			FC_calibrationFun(lowerSpLevel, higherSpLevel, FColdreading, FCarr_actualVal, FCarr_stdVal); 
			
//			FC_CALIBRATION.FC_calibrationFun(lowerSpLevel, higherSpLevel, FColdreading, FCarr_actualVal, FCarr_stdVal);
		}
		
		

	});
	anim_FlowControl(lowerSpLevel, higherSpLevel);

}

 });

