//var SINGLEACTINGCYLINDER = SINGLEACTINGCYLINDER || {};

 $(function () {

//SINGLEACTINGCYLINDER.TC_Characterisation = function(appId, transType) {

	 TC_Characterisation = function(appId, transType){

//	var lowerSpLevel = -50;
//	var higherSpLevel = 250;
	
	var TC_CharacterisationData = {};
	
	 var lowerSpLevel = ExpTrackData.tcAppData.tcConfigData.lowerSpanLevel;
	 var higherSpLevel = ExpTrackData.tcAppData.tcConfigData.higherSpanLevel;

	
	
	
	

	var numofReading = 5;
	var TColdreading = [];
	var TCarr_trueread = [];
	var TCarr_actualVal = [];
	var TCarr_stdVal = [];
	var TColdreadingForGraph = [];
	var readingcnt = 0;

	
	TC_DefaultErr = randomErr_TC(TC_RandomErrArr);

//	console.log("TC Error" +TC_DefaultErr);
	
	$("#mainDiv").html('');

	var TC_characterisation = '';
	TC_characterisation += '<div class="col-md-6 col-sm-12" id="canvasMainDiv"><div id="canvas" class="col-md-12"></div></div>'

			+ '<div class="col-md-6 col-sm-12" id="TC_characterisationDIv">'
			+ '<div id = "TestDiv" >'
			+'<h1>TT Characterisation</h1>'
			+'<h6>In this level characterize the TT 100</h6>'
			+ '<div class="slidecontainer" id="TC_Slider">'
			+ '<div class="header">Reactor Temperature  (span  '
			+ lowerSpLevel
			+ '-'
			+ higherSpLevel
			+ '  <sup>0</sup>C)</div>'
			+ '<input step="1" type="range" min='
			+ lowerSpLevel
			+ ' max='
			+ higherSpLevel
			+ ' value='
			+ lowerSpLevel
			+ ' id="TC_tankLvl">'
			+ '<p>Value: <span id="demo"></span></p>'
			+ '</div>'
			+ '<div class="buttonDiv">'
			+ '<button id="submit_TC_WaterLevel">Submit</button>'
			+ '<button id="TC_graph" >Check Graph</button>'
			+ '<button id="TC_calibration" hidden >Next Level</button>'
			+ '</div>' + '</div>' + '</div>'
			+'<div class="col-md-6 col-sm-12" id = "TestNextDiv" style="display:none">'
			+'<div >'

	$(mainDiv).html(TC_characterisation);
	
	stop_timer();
	set_timer();

	var slider = document.getElementById("TC_tankLvl");
	var output = document.getElementById("demo");
	output.innerHTML = slider.value;

	slider.oninput = function() {
		output.innerHTML = this.value;
	}

	$('#submit_TC_WaterLevel')
			.on(
					'click',
					function() {

						var waterlevel = slider.value;

						if ($.inArray(parseFloat(waterlevel), TColdreading) >= 0) {
							alertify.alert("Alert",'This Value Reading is already Present.  Please Select Another Value For Reading');
							$(".ajs-header").css("background-color","#ce6058");
						} else {
							$("#TC_graph").prop("hidden", false);
							var trueReading = ((waterlevel - lowerSpLevel) * 100)
									/ (higherSpLevel - lowerSpLevel);

							var closestValue = TC_findColsetValue(trueReading
									.toFixed(2), TC_trueReading_arr);
							var idx = TC_trueReading_arr.indexOf(closestValue);

							var formulaVal = TC_applyFormula(closestValue, idx,
									trueReading).toFixed(2);

							var actualVal = TC_calActualVal(formulaVal,
									higherSpLevel, lowerSpLevel).toFixed(2);

							var standardVal = TC_calActualVal(trueReading,
									higherSpLevel, lowerSpLevel).toFixed(2);

							var trueread = ((trueReading * (higherSpLevel - lowerSpLevel)) / 100)
									.toFixed(2);

							// console.log("values "+trueReading.toFixed(2) +" "
							// +closestValue+" "+formulaVal+" "+actualVal+"
							// "+trueread);

							TColdreading.push(parseFloat(waterlevel));
							TColdreadingForGraph.push(parseFloat(waterlevel));
							
//							TColdreading.sort(function(a, b) {
//								return a - b
//							});

							TCarr_trueread.push(parseFloat(trueread));

							TCarr_actualVal.push(parseFloat(actualVal));
//							TCarr_actualVal.sort(function(a, b) {
//								return a - b
//							});

							TCarr_stdVal.push(parseFloat(standardVal));
//							TCarr_stdVal.sort(function(a, b) {
//								return a - b
//							});

							// console.log("arr true reading"+TCarr_trueread);
							// console.log("arr actual
							// reading"+TCarr_actualVal);

							var TC_IOtable = '';
							if (readingcnt == 0) {

								TC_IOtable += '<div id = "IOtable" >'
										+ '<table id="IO_table" class="table table-striped table-bordered" style="width:100%">'
										+ '<thead>'
										+ '<tr>'
										+ '<th>Reading No.</th>'
										+ '<th>Input (in <sup>0</sup>C)</th>'
										+ '<th>Output (in mA)</th>'
										+ '</tr>'
										+ '</thead>'

										+ '<tbody id="tablebody_IO">'
										+ '</tr><tr><td>'
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
										// <sup>0</sup>C)</th><th>Output (in mA)</th>'
										// +'</tr><tr><td>'+(readingcnt+1)+'</td><td>'+waterlevel+'</td><td>'+actualVal+'</td></tr>'
										// +'</table>'
										+ '</div>'
										+ '<div id="TC_chartContainer" class="col-md-12"style="height: 400px; width: 90%; padding:0 5%" hidden></div>'
										// +'<div id = "TCgraphContainer" >'
										+ '</div>';

								readingcnt++;

								$(TestDiv).append(TC_IOtable);

								paper.clear();

								anim_TempControl(lowerSpLevel, higherSpLevel);
								TC_LabelValue((x - 11), (y - 160),
										parseFloat(actualVal) + " mA", "green");
								TC_LabelValue((x - 12), (y - 80),
										parseFloat(waterlevel) + " °C",
										"green");
							} else {
								var table = $('#IO_table').DataTable({
									"pageLength" : 5,
									dom : 'Bfrtip',
									"bDestroy" : true,
									title : 'Data export',
									buttons : [ {
										extend : 'excelHtml5',
										title : 'TT Characterisation value'

									}, {
										extend : 'pdfHtml5',
										title : 'TT Characterisation value'
									} ]
								});
								table.row
										.add(
												[ readingcnt + 1, waterlevel,
														actualVal ]).draw();
								// TC_IOtable
								// +='<tr><td>'+(readingcnt+1)+'</td><td>'+waterlevel+'</td><td>'+actualVal+'</td></tr>'
								table.page('last').draw('page');
								+'</div>';

								readingcnt++;
								// $(table_IO).append(TC_IOtable);

								paper.clear();
								anim_TempControl(lowerSpLevel, higherSpLevel);
								TC_LabelValue((x - 11), (y - 160),
										parseFloat(actualVal) + " mA", "green");
								TC_LabelValue((x - 12), (y - 80),
										parseFloat(waterlevel) + " °C",
										"green");
							}

						}

					});

	$('#TC_graph')
			.on(
					'click',
					function() {

						if (readingcnt < numofReading) {

							alertify.alert("Alert","Please take at least " + numofReading
									+ " readings");
							$(".ajs-header").css("background-color","#ce6058");
						}
						
						if (readingcnt >= numofReading) {
							$("#TC_chartContainer").prop("hidden", false);	
							window.scrollTo(0,$('#TC_characterisationDIv').height());
//							TColdreadingForGraph.push(parseFloat(waterlevel));
							TColdreadingForGraph.sort(function(a, b) {
								return a - b
							});

							var OldValue = [];
							for (var j = 0; j < TColdreadingForGraph.length; j++) {
								var olValueJson = {
										x : TColdreadingForGraph[j],
										y : TCarr_actualVal[TColdreading.indexOf(TColdreadingForGraph[j])],
									markerType : "circle",
									markerSize : 10

								};
								OldValue.push(olValueJson);
							}
							// console.log(OldValue);
							 TCDrowGraph();
							 TC_Updategraph(OldValue,lowerSpLevel, higherSpLevel);
//							var chart = new CanvasJS.Chart("TC_chartContainer",
//									{
//										animationEnabled : true,
//										theme : "light2",
//										title : {
//											text : "Temperature  Control System",
//											fontSize : 20,
//										},
//
//										axisX : {
//											title : "Input flow (lph)",
//											crosshair : {
//												enabled : true,
//												snapToDataPoint : true
//											},
//										// ticks: {suggestedMin: 2, max:6}
//										},
//										axisY : {
//											title : "Output (mA)",
//											minimum : 2,
//											maximum : 21,
//											interval: 1
//										},
//
//										toolTip : {
//											shared : true
//										},
//										legend : {
//											cursor : "pointer",
//											verticalAlign : "bottom",
//											horizontalAlign : "right",
//											dockInsidePlotArea : true,
//											itemclick : toogleDataSeries
//										},
//										data : [ {
//											type : "scatter",
//											showInLegend : true,
//											name : "Observed Output",
//											markerType : "circle",
//											// xValueFormatString: "DD MMM,
//											// YYYY",
//											color : "#F08080",
//
//											dataPoints : OldValue
//										}, {
//											type : "line",
//											showInLegend : true,
//											name : "Standard Output",
//											// lineDashType: "dash",
//											dataPoints : [ {
//												x : lowerSpLevel,
//												y : 4
//											}, {
//												x : higherSpLevel,
//												y : 20
//											} ]
//										} ]
//									});
//							chart.render();
//
//							function toogleDataSeries(e) {
//								if (typeof (e.dataSeries.visible) === "undefined"
//										|| e.dataSeries.visible) {
//									e.dataSeries.visible = false;
//								} else {
//									e.dataSeries.visible = true;
//								}
//								chart.render();
//							}
							$("#TC_calibration").prop("hidden", false);
						}

						// $("#LC_calibration").prop("disabled", false);
						// $("#submit_LC_WaterLevel").prop("disabled", true);
						// $("#LC_graph").prop("disabled", true);
						//			     

					});

	$('#TC_calibration').on('click', function() {

		if(TColdreadingForGraph.indexOf(lowerSpLevel) == -1){
			
			alertify.alert("Alert","Please Select Lower Span Value And Plot The Graph Again");
			$(".ajs-header").css("background-color","#ce6058");
			$("#TC_calibration").prop("hidden", true);
			$("#TC_graph").prop("hidden", true);			
			$("#TC_chartContainer").html('');
			
		}else if(TColdreadingForGraph.indexOf(higherSpLevel) == -1){
			
			alertify.alert("Alert","Please Select Higher Span Value And Plot The Graph Again");
			$(".ajs-header").css("background-color","#ce6058");
			$("#TC_calibration").prop("hidden", true);
			$("#TC_graph").prop("hidden", true);	
			$("#TC_chartContainer").html('');
		
			
		}else{
			
			minutes = document.getElementById("minutes").textContent;
    		seconds = document.getElementById("seconds").textContent;        		
//    		console.log(minutes+":"+seconds);
			
			TC_CharacterisationData.tcreading = TColdreading;
			TC_CharacterisationData.tcactualVal = TCarr_actualVal;
			TC_CharacterisationData.tcstdVal = TCarr_stdVal;
			
			TC_CharacterisationData.CharacTimeInMin = minutes;
			TC_CharacterisationData.CharacTimeInSec = seconds;
			
//			console.log(TC_CharacterisationData);
			
		//	TC_appData.TCCharactData = TC_CharacterisationData;
			
			ExpTrackData.tcCharactData = TC_CharacterisationData;
			
//			console.log(ExpTrackData);
			
			stop_timer();
			
			TC_calibrationFun(lowerSpLevel, higherSpLevel, TColdreading, TCarr_actualVal, TCarr_stdVal);
			
//			TC_CALIBRATION.TC_calibrationFun(lowerSpLevel, higherSpLevel, TColdreading, TCarr_actualVal, TCarr_stdVal);
		}
		
		

	});
	
	
	
	anim_TempControl(lowerSpLevel, higherSpLevel);

}
 
 });

