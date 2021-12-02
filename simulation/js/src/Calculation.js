$(document).ready(function() {
    
	
	
	
	$("#next").hide();
	application = {
		
		0:"Select Application",
		1:"Level Controller",
		2:"Temperature  Controller",
		3:"Pressure Controller",
		4:"Flow Controller"
	}
	
	rangePercentage = 85;
	
	ExpTrackData = {};
	
	
		var appType = '';
		for ( var key in application) {
			appType += "<option value= " + key + ">" + application[key]
					+ "</option>";
		}
		$("#levels").append(appType);
		
		
		$('select#levels').on(
				'change',
				function() {
					if (this.value == "1") {
						
					    $( "#canvas" ).empty();
						LC_appData = {};
						LevelControl();
						showDiscription("1");
						
						stop_timer();
						set_timer();
						
						
						$("#next").show();
//						$("#levels").prop("disabled", true);
						
					}else if(this.value == "2"){
						
						$( "#canvas" ).empty();
						TC_appData = {};
						TempControl();
						showDiscription("2");
						
						
						stop_timer();
						set_timer();
						
						
						$("#next").show();
					} else if(this.value == "3"){
						
						$( "#canvas" ).empty();
						PC_appData = {};
						PressureControl();
						showDiscription("3");
						
						stop_timer();
						set_timer();
						
						$("#next").show();
						
					} else if(this.value == "4"){
						
						$( "#canvas" ).empty();
						FC_appData = {};
						FlowControl();
						showDiscription("4");
						
						stop_timer();
						set_timer();
						
						
						$("#next").show();
					} else{
						alertify.alert("Alert","Please select any application");
						$(".ajs-header").css("background-color","#ce6058");

						stop_timer();
						
						
						$("#next").hide();
						$( "#canvas" ).empty();
						$("#TestDiv").html('');
						
						
					
					}
				}); 
				
//				$('#next').on(
//				'click', function() {
//					var appId = $( "select#levels" ).val();
//					
//					if(appId == "1"){
//						
//						$("#next").hide();
//						showLC_Questions(appId);
//						$("#levels").prop("disabled", true);
//					}
//					if(appId == "2"){
//						
//						$("#next").hide();
//						showTC_Questions(appId);
//						$("#levels").prop("disabled", true);
//					}
//					if(appId == "3"){
//						
//						$("#next").hide();
//						showPC_Questions(appId);
//						$("#levels").prop("disabled", true);
//					}
//					if(appId == "4"){
//						
//						$("#next").hide();
//						showFC_Questions(appId);
//						$("#levels").prop("disabled", true);
//					}
//							
//				});
//			
//				
//	
	
});
