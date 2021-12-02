//var SINGLEACTINGCYLINDER = SINGLEACTINGCYLINDER || {};

$(function () {

//SINGLEACTINGCYLINDER.LC_Characterisation = function(appId, transType) {
	
 LC_Characterisation = function(appId, transType){
	 
	 
	$("#submit_LC_WaterLevel").prop("hidden", false);
	 $("#LC_graph").prop("hidden", false);

//	 var lowerSpLevel = 2;
//	 var higherSpLevel = 6;
//
	 var lowerSpLevel = ExpTrackData.lcAppData.lcConfigData.lowerSpanLevel;
	 var higherSpLevel = ExpTrackData.lcAppData.lcConfigData.higherSpanLevel;

	var LC_CharacterisationData = {};
	 
	
	var waterlevel = lowerSpLevel;

	var numofReading = 5;
	var LColdreadingArr = [];
	var LCarr_formulaValue = [];
	var LColdreading = [];
	var LCarr_trueread = [];
	var LCarr_actualVal = [];
	var LCarr_stdVal = [];
	var LColdreadingForGraph = [];
	var readingcnt = 0;

	// oldreading.push(parseFloat(lowerSpLevel));
	// oldreading.push(parseFloat(higherSpLevel));
	
	LC_DefaultErr = randomErr_LC(LC_RandomErrArr);

//	console.log("LC ERROR "+LC_DefaultErr);

	$("#mainDiv").html('');

	var LC_characterisation = '';
	LC_characterisation += '<div class="col-md-6 col-sm-12" id="canvasMainDiv"><div id="canvas" class="col-md-12 col-sm-12"></div></div>'

			+ '<div class="col-md-6 col-sm-12" id="LC_characterisationDIv">'
			+ '<div id = "TestDiv" >'
			+'<h1>LT Characterisation</h1>'
			+'<h6>In this level characterize the LT 100</h6>'
			//+'<div id="Reqtimer" class="col-md-12 col-sm-12"><i><label id="minutes">00</label><span>:</span><label id="seconds">00</label></i></div>'
			+ '<div class="slidecontainer" id="LC_Slider">'
			+ '<div class="header">Tank level (span  '
			+ lowerSpLevel
			+ '-'
			+ higherSpLevel
			+ '  mtr)</div>'
			+ '<input step="0.1" type="range" min='
			+ lowerSpLevel
			+ ' max='
			+ higherSpLevel
			+ ' value='
			+ lowerSpLevel
			+ ' id="LC_tankLvl">'
			+ '<p>Value: <span id="demo"></span></p>'
			+ '</div>'
			+ '<div class="buttonDiv">'
			+ '<button id="submit_LC_WaterLevel">Submit</button>'
			+ '<button id="LC_graph" >Check Graph</button>'
			+ '<button id="LC_calibration" hidden >Next Level</button>'
			+ '</div>' + '</div>' + '</div>'
			+'<div class="col-md-6 col-sm-12" id = "TestNextDiv" style="display:none">'
			+'<div >'

	$(mainDiv).html(LC_characterisation);
	
	stop_timer();
	set_timer();
	

	var slider = document.getElementById("LC_tankLvl");
	var output = document.getElementById("demo");
	output.innerHTML = slider.value;

	slider.oninput = function() {
		output.innerHTML = this.value;
	}

	$('#submit_LC_WaterLevel')
			.on(
					'click',
					function() {
						
						waterlevel = slider.value;
						
						
						if ($.inArray(parseFloat(waterlevel), LColdreading) >= 0) {
							alertify.alert("Alert",'This Value Reading is already Present.  Please Select Another Value For Reading');
							$(".ajs-header").css("background-color","#ce6058");
						} else {
							$("#LC_graph").prop("hidden", false);
							var trueReading = ((waterlevel - lowerSpLevel) * 100)
									/ (higherSpLevel - lowerSpLevel);

							var closestValue = LC_findColsetValue(trueReading
									.toFixed(2), LC_trueReading_arr);
							var idx = LC_trueReading_arr.indexOf(closestValue);

							var formulaVal = LC_applyFormula(closestValue, idx,
									trueReading).toFixed(2);

							var actualVal = LC_calActualVal(formulaVal,
									higherSpLevel, lowerSpLevel).toFixed(2);

							var standardVal = LC_calActualVal(trueReading,
									higherSpLevel, lowerSpLevel).toFixed(2);

							var trueread = ((trueReading * (higherSpLevel - lowerSpLevel)) / 100)
									.toFixed(2);

//					        console.log("values "+trueReading.toFixed(2) +" " +closestValue+" "+formulaVal+" "+actualVal+" "+trueread);

							LColdreadingArr.push(parseFloat(waterlevel));

							LColdreading.push(parseFloat(waterlevel));
							LColdreadingForGraph.push(parseFloat(waterlevel));
//							LColdreading.sort(function(a, b) {
//								return a - b
//							});

							LCarr_formulaValue.push(parseFloat(formulaVal));
							LCarr_formulaValue.sort(function(a, b) {
								return a - b
							});
							
							LCarr_trueread.push(parseFloat(trueread));

							LCarr_actualVal.push(parseFloat(actualVal));
//							 console.log("arr true reading sorted "+LColdreading);
//							 console.log("arr Actual values  not  sorted"+LCarr_actualVal);
//							LCarr_actualVal.sort(function(a, b) {
//								return a - b
//							});

							LCarr_stdVal.push(parseFloat(standardVal));							
//							LCarr_stdVal.sort(function(a, b) {
//								return a - b
//							});
//							 console.log("arr true reading unsorted "+LColdreadingArr);	
//							console.log("arr formula values sorted "+LCarr_formulaValue);
//							
//							 console.log("arr true reading sorted "+LColdreading);
//							 console.log("arr Actual values sorted"+LCarr_actualVal);
//							 console.log("arr Standard values sorted"+LCarr_stdVal);
							
							 
							var LC_IOtable = '';
							if (readingcnt == 0) {

								LC_IOtable += '<div class="row"><div id = "IOtable" class="col-md-12">'
										+ '<table id="table_IO" class="table table-striped table-bordered" style="width:100%">'
										+ '<thead>'
										+ '<tr>'
										+ '<th>Reading No.</th>'
										+ '<th>	Input (in mtr)</th>'
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
										+ '</div>'
										+ '<div id="LC_chartContainer" class="col-md-12"style="height: 400px; width: 90%; padding:0 5%" hidden></div></div>'

								readingcnt++;

								$(TestDiv).append(LC_IOtable);

								paper.clear();
								anim_LevelControl(lowerSpLevel, higherSpLevel,
										waterlevel, LColdreading);
								LC_LabelValue((x + 379), (y + 47),
										parseFloat(actualVal) + " mA", "green");
								LC_ValveAnim(waterlevel, LColdreadingArr);
							} else {
								var table = $('#table_IO').DataTable({
									 "pageLength" : 5,
								        dom: 'Bfrtip',
								        "bDestroy": true,
									title : 'Data export',
									buttons : [ {
										extend : 'excelHtml5',
										title : 'LT Characterisation value'

									}, {
										extend : 'pdfHtml5',
										title : 'LT Characterisation value'
									} ]
								});
								table.row
										.add(
												[ readingcnt + 1, waterlevel,
														actualVal ]).draw();
								table.page('last').draw('page');
								+'</div>';

								readingcnt++;

								paper.clear();
								anim_LevelControl(lowerSpLevel, higherSpLevel,
										waterlevel, LColdreading);
								LC_LabelValue((x + 379), (y + 47),
										parseFloat(actualVal) + " mA", "green");
								LC_ValveAnim(waterlevel, LColdreadingArr);

							}
						}
					});

	$('#LC_graph')
			.on(
					'click',
					function() {

						if (readingcnt < numofReading) {

							alertify.alert("Alert","Please take at least " + numofReading
									+ " readings");
							$(".ajs-header").css("background-color","#ce6058");
						}
						
						
						if (readingcnt >= numofReading) {
							$("#LC_chartContainer").prop("hidden", false);	
							window.scrollTo(0,$('#LC_characterisationDIv').height());
					//		LColdreadingForGraph.push(parseFloat(waterlevel));
							LColdreadingForGraph.sort(function(a, b) {
								return a - b
							});


							var OldValue = [];
							for (var j = 0; j < LColdreadingForGraph.length; j++) {
								var olValueJson = {
									x : LColdreadingForGraph[j],
									y : LCarr_actualVal[LColdreading.indexOf(LColdreadingForGraph[j])],
									markerType : "circle",
									markerSize : 8

								};
								OldValue.push(olValueJson);
							}
//							 console.log(OldValue);
							 LCDrowGraph();
							 LC_Updategraph(OldValue,lowerSpLevel, higherSpLevel);
													 $("#LC_calibration").prop("hidden", false);
							 						}

						
					//	 $("#submit_LC_WaterLevel").prop("hidden", true);
					//	 $("#LC_graph").prop("hidden", true);
						 
						// $("#submit_LC_WaterLevel").prop("disabled", true);
						// $("#LC_graph").prop("disabled", true);
						//			     

					});

	
	
	$('#LC_calibration').on('click', function() {

		if(LColdreadingForGraph.indexOf(lowerSpLevel) == -1){
			
			alertify.alert("Alert","Please Select Lower Span Value And Plot The Graph Again");
			$(".ajs-header").css("background-color","#ce6058");
			$("#LC_calibration").prop("hidden", true);
			$("#LC_graph").prop("hidden", true);			
			$("#LC_chartContainer").html('');
			
		}else if(LColdreadingForGraph.indexOf(higherSpLevel) == -1){
			
			alertify.alert("Alert","Please Select Higher Span Value And Plot The Graph Again");
			$(".ajs-header").css("background-color","#ce6058");
			$("#LC_calibration").prop("hidden", true);
			$("#LC_graph").prop("hidden", true);	
			$("#LC_chartContainer").html('');
		
			
		}else{
			
			
			minutes = document.getElementById("minutes").textContent;
    		seconds = document.getElementById("seconds").textContent;        		
//    		console.log(minutes+":"+seconds);
    		
			
			LC_CharacterisationData.LCreading = LColdreading;
			LC_CharacterisationData.LCactualVal = LCarr_actualVal;
			LC_CharacterisationData.LCstdVal = LCarr_stdVal;
			
			LC_CharacterisationData.CharacTimeInMin = minutes;
			LC_CharacterisationData.CharacTimeInSec = seconds;
			
//			console.log(LC_CharacterisationData);
			
		//	LC_appData.lcCharactData = LC_CharacterisationData;
			
			ExpTrackData.lcCharactData = LC_CharacterisationData;
			
//			console.log(ExpTrackData);
			
			stop_timer();
			
//			$("#Reqtimer").prop("hidden", true);	
			
			
			LC_calibrationFun(lowerSpLevel, higherSpLevel, LColdreading, LCarr_actualVal, LCarr_stdVal);
			
//			LC_CALIBRATION.LC_calibrationFun(lowerSpLevel, higherSpLevel, LColdreading, LCarr_actualVal, LCarr_stdVal);
		}
		
		

	});

	anim_LevelControl(lowerSpLevel, higherSpLevel, waterlevel, LColdreading);

	LC_ValveAnim = function(waterlevel, LColdreading) {
		if (waterlevel < LColdreading.slice(-2)[0]) {
			loweroutlet.attr({
				'stroke' : 'green',
				'stroke-width' : '1'
			});
			loweroutlet1.attr({
				'stroke' : 'black',
				'stroke-width' : '1'
			});
			glowLC = loweroutlet.glow({
				width : 8,
				'stroke' : 'green'
			});

			animLC = Raphael.animation({
				"stroke-width" : 1,
				opacity : 1
			}, 800, function() {
				loweroutlet.attr({
					'stroke' : 'black',
					'stroke-width' : '1'
				});
			});

			glowLC.animate(animLC);

		} else {
			loweroutlet1.attr({
				'stroke' : 'green',
				'stroke-width' : '1'
			});
			loweroutlet.attr({
				'stroke' : 'black',
				'stroke-width' : '1'
			});
			glowLC = loweroutlet1.glow({
				width : 8,
				'stroke' : 'green'
			});

			animLC = Raphael.animation({
				"stroke-width" : 1,
				opacity : 1
			}, 800, function() {
				loweroutlet1.attr({
					'stroke' : 'black',
					'stroke-width' : '1'
				});
			});

			glowLC.animate(animLC);

		}
	}

}

});

