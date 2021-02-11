//var SINGLEACTINGCYLINDER = SINGLEACTINGCYLINDER || {};

 $(function () {

//SINGLEACTINGCYLINDER.PC_Characterisation = function(appId, transType) {

	 PC_Characterisation = function(appId, transType){

//	var lowerSpLevel = 0;
//	var higherSpLevel = 6;
	
	var PC_CharacterisationData = {};
	
	
	 var lowerSpLevel = ExpTrackData.pcAppData.pcConfigData.lowerSpanLevel;
	 var higherSpLevel = ExpTrackData.pcAppData.pcConfigData.higherSpanLevel;

	

	var numofReading = 5;
	var PColdreading = [];
	var PCarr_trueread = [];
	var PCarr_actualVal = [];
	var PCarr_stdVal = [];
	var PColdreadingForGraph = [];
	var readingcnt = 0;

	PC_DefaultErr = randomErr_PC(PC_RandomErrArr);

//	console.log("PC ERROR " +PC_DefaultErr);
	
	
	$("#mainDiv").html('');

	var PC_characterisation = '';
	PC_characterisation += '<div class="col-md-6 col-sm-12" id="canvasMainDiv"><div id="canvas" class="col-md-12"></div></div>'

			+ '<div class="col-md-6 col-sm-12" id="PC_characterisationDIv">'
			+ '<div id = "TestDiv" >'
			+'<h1>PT Characterisation</h1>'
			+'<h6>In this level characterize the PT 100</h6>'
			+ '<div class="slidecontainer" id="PC_Slider">'
			+ '<div class="header">Tank Pressure (span  '
			+ lowerSpLevel
			+ '-'
			+ higherSpLevel
			+ '  kg/cm<sup>2</sup>)</div>'
			+ '<input step="0.1" type="range" min='
			+ lowerSpLevel
			+ ' max='
			+ higherSpLevel
			+ ' value='
			+ lowerSpLevel
			+ ' id="PC_tankLvl">'
			+ '<p>Value: <span id="demo"></span></p>'
			+ '</div>'
			+ '<div class="buttonDiv">'
			+ '<button id="submit_PC_WaterLevel">Submit</button>'
			+ '<button id="PC_graph" >Check Graph</button>'
			+ '<button id="PC_calibration" hidden >Next Level</button>'
			+ '</div>' + '</div>' + '</div>'
			+'<div class="col-md-6 col-sm-12" id = "TestNextDiv" style="display:none">'
			+'<div >'

	$(mainDiv).html(PC_characterisation);

	var slider = document.getElementById("PC_tankLvl");
	var output = document.getElementById("demo");
	output.innerHTML = slider.value;

	slider.oninput = function() {
		output.innerHTML = this.value;
	}

	$('#submit_PC_WaterLevel')
			.on(
					'click',
					function() {

						var waterlevel = slider.value;

						if ($.inArray(parseFloat(waterlevel), PColdreading) >= 0) {
							alertify.alert('This Value Reading is already Present. /n Please Select Another Value For Reading');
						} else {
							$("#PC_graph").prop("hidden", false);
							var trueReading = ((waterlevel - lowerSpLevel) * 100)
									/ (higherSpLevel - lowerSpLevel);

							var closestValue = PC_findColsetValue(trueReading
									.toFixed(2), PC_trueReading_arr);
							var idx = PC_trueReading_arr.indexOf(closestValue);

							var formulaVal = PC_applyFormula(closestValue, idx,
									trueReading).toFixed(2);

							var actualVal = PC_calActualVal(formulaVal,
									higherSpLevel, lowerSpLevel).toFixed(2);

							var standardVal = PC_calActualVal(trueReading,
									higherSpLevel, lowerSpLevel).toFixed(2);

							var trueread = ((trueReading * (higherSpLevel - lowerSpLevel)) / 100)
									.toFixed(2);

//							console.log("values   " + trueReading.toFixed(2)
//									+ "   " + closestValue + "    "
//									+ formulaVal + "    " + actualVal + "    "
//									+ trueread);

							PColdreading.push(parseFloat(waterlevel));
							PColdreadingForGraph.push(parseFloat(waterlevel));
//							PColdreading.sort(function(a, b) {
//								return a - b
//							});

							PCarr_trueread.push(parseFloat(trueread));

							PCarr_actualVal.push(parseFloat(actualVal));
//							PCarr_actualVal.sort(function(a, b) {
//								return a - b
//							});

							PCarr_stdVal.push(parseFloat(standardVal));
//							PCarr_stdVal.sort(function(a, b) {
//								return a - b
//							});

							// console.log("arr true reading"+PColdreading);
							// console.log("arr actual
							// reading"+PCarr_actualVal);

							var PC_IOtable = '';
							if (readingcnt == 0) {

								PC_IOtable += '<div id = "IOtable" >'
										+ '<table id="table_IO" class="table table-striped table-bordered" style="width:100%">'
										+ '<thead>'
										+ '<tr>'
										+ '<th>Reading No.</th>'
										+ '<th>Input (in kg/cm<sup>2</sup>)</th>'
										+ '<th>Output (in mA)</th>'
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
										// kg/cm<sup>2</sup>)</th><th>Output (in mA)</th>'
										// +'</tr><tr><td>'+(readingcnt+1)+'</td><td>'+waterlevel+'</td><td>'+actualVal+'</td></tr>'
										// +'</table>'
										+ '</div>'
										+ '<div id="PC_chartContainer" class="col-md-12"style="height: 400px; width: 90%; padding:0 5%"></div>'
										// +'<div id = "PCgraphContainer" >'
										+ '</div>';

								readingcnt++;

								$(TestDiv).append(PC_IOtable);

								paper.clear();
								anim_PressureControl(lowerSpLevel,
										higherSpLevel);
								PC_LabelValue((x + 205), (y - 140),
										parseFloat(actualVal) + " mA", "green");
								PC_LabelValue((x + 215), (y - 70),
										parseFloat(waterlevel) + " Kg/cm²",
										"green");
							} else {
								var table = $('#table_IO').DataTable({
									"pageLength" : 5,
									dom : 'Bfrtip',
									"bDestroy" : true,
									title : 'Data export',
									buttons : [ {
										extend : 'excelHtml5',
										title : 'PT Characterisation value'

									}, {
										extend : 'pdfHtml5',
										title : 'PT Characterisation value'
									} ]
								});
								table.row
										.add(
												[ readingcnt + 1, waterlevel,
														actualVal ]).draw();

								// PC_IOtable
								// +='<tr><td>'+(readingcnt+1)+'</td><td>'+waterlevel+'</td><td>'+actualVal+'</td></tr>'
								table.page('last').draw('page');
								+'</div>';

								readingcnt++;
								// $(table_IO).append(PC_IOtable);

								paper.clear();
								anim_PressureControl(lowerSpLevel,
										higherSpLevel);
								PC_LabelValue((x + 205), (y - 140),
										parseFloat(actualVal) + " mA", "green");
								PC_LabelValue((x + 215), (y - 70),
										parseFloat(waterlevel) + " Kg/cm²",
										"green");

							}

						}

					});

	$('#PC_graph')
			.on(
					'click',
					function() {

						if (readingcnt < numofReading) {

							alertify.alert("Please take at least " + numofReading
									+ " readings");
						}

						if (readingcnt >= numofReading) {
							
//							PColdreadingForGraph.push(parseFloat(waterlevel));
							PColdreadingForGraph.sort(function(a, b) {
								return a - b
							});

							var OldValue = [];
							for (var j = 0; j < PColdreadingForGraph.length; j++) {
								var olValueJson = {
										x : PColdreadingForGraph[j],
										y : PCarr_actualVal[PColdreading.indexOf(PColdreadingForGraph[j])],
									markerType : "circle",
									markerSize : 10

								};
								OldValue.push(olValueJson);
							}
							// console.log(OldValue);
							var chart = new CanvasJS.Chart("PC_chartContainer",
									{
										animationEnabled : true,
										theme : "light2",
										title : {
											text : "Pressure  Control System",
											fontSize : 20,
										},

										axisX : {
											title : "output",
											crosshair : {
												enabled : true,
												snapToDataPoint : true
											},
										// ticks: {suggestedMin: 2, max:6}
										},
										axisY : {
											title : "input",
											minimum : 3,
											maximum : 21
										},

										toolTip : {
											shared : true
										},
										legend : {
											cursor : "pointer",
											verticalAlign : "bottom",
											horizontalAlign : "right",
											dockInsidePlotArea : true,
											itemclick : toogleDataSeries
										},
										data : [ {
											type : "scatter",
											showInLegend : true,
											name : "Observed Output",
											markerType : "circle",
											// xValueFormatString: "DD MMM,
											// YYYY",
											color : "#F08080",

											dataPoints : OldValue
										}, {
											type : "line",
											showInLegend : true,
											name : "Standard Output",
											// lineDashType: "dash",
											dataPoints : [ {
												x : lowerSpLevel,
												y : 4
											}, {
												x : higherSpLevel,
												y : 20
											} ]
										} ]
									});
							chart.render();

							function toogleDataSeries(e) {
								if (typeof (e.dataSeries.visible) === "undefined"
										|| e.dataSeries.visible) {
									e.dataSeries.visible = false;
								} else {
									e.dataSeries.visible = true;
								}
								chart.render();
							}
							$("#PC_calibration").prop("hidden", false);
						}

						// $("#LC_calibration").prop("disabled", false);
						// $("#submit_LC_WaterLevel").prop("disabled", true);
						// $("#LC_graph").prop("disabled", true);
						//			     

					});

	
	$('#PC_calibration').on('click', function() {

		if(PColdreadingForGraph.indexOf(lowerSpLevel) == -1){
			
			alertify.alert("Please Select Lower Span Value And Plot The Graph Again");
			$("#PC_calibration").prop("hidden", true);
			$("#PC_graph").prop("hidden", true);			
			$("#PC_chartContainer").html('');
			
		}else if(PColdreadingForGraph.indexOf(higherSpLevel) == -1){
			
			alertify.alert("Please Select Higher Span Value And Plot The Graph Again");
			$("#PC_calibration").prop("hidden", true);
			$("#PC_graph").prop("hidden", true);	
			$("#PC_chartContainer").html('');
		
			
		}else{
			
			PC_CharacterisationData.pcreading = PColdreading;
			PC_CharacterisationData.pcactualVal = PCarr_actualVal;
			PC_CharacterisationData.pcstdVal = PCarr_stdVal;
			
//			console.log(PC_CharacterisationData);
			
		//	TC_appData.TCCharactData = TC_CharacterisationData;
			
			ExpTrackData.pcCharactData = PC_CharacterisationData;
			
//			console.log(ExpTrackData);
			
			PC_calibrationFun(lowerSpLevel, higherSpLevel, PColdreading, PCarr_actualVal, PCarr_stdVal);
			
//			PC_CALIBRATION.PC_calibrationFun(lowerSpLevel, higherSpLevel, PColdreading, PCarr_actualVal, PCarr_stdVal);
		}
		
		

	});
	anim_PressureControl(lowerSpLevel, higherSpLevel);

}

 });

