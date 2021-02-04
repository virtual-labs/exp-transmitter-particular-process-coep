// JavaScript Documentvar paper;


function PressureControl(){	

	paper = new Raphael(document.getElementById('canvas'), '100%', 700);
	
    //x = 310;
	//y = 160;
	var w = 900;
    var h = 500;
	
var width = $(window).width();

  if ($(window).width() < 500) {
	    width = $(this).width();
	    paper = new Raphael(document.getElementById('canvas'), '100%', 500);
	paper.setViewBox(0,0,w,h,true);
	paper.setSize('100%', 500);
  }else
  {
      paper = new Raphael(document.getElementById('canvas'), '100%', 700);
	paper.setViewBox(0,0,w,h,true);
	paper.setSize('100%', 700);
  }
    x = 390;
	y = 290;
	
	var PL_tank = PL_Tank (x, y);
    PTCircle = PC_PTCircleWithLabel((x+150),(y-70), 25, "PT 100");	
	var PY100 = PC_CircleWithLabel((x-290),(y-60), 25, "PY 100");
	var PIC100_Circle = PC_CircleWithLine((x+150),(y-170), 25, "PIC", "100"); 	 
	 
		
	 
	 paper.path('M'+(x-350)+' '+(y+65)+ 'l 43 0').attr({'stroke':'black', 'stroke-width':'2', 'arrow-end':'classic-wide-long'});
	 
	 paper.path('M'+(x-274)+' '+(y+65)+ 'l 116 0').attr({'stroke':'black', 'stroke-width':'1'});
	 
	 paper.path('M'+(x-123)+' '+(y+65)+ 'l 115 0').attr({'stroke':'black', 'stroke-width':'2', 'arrow-end':'classic-wide-long'});
	 
	 paper.path('M'+(x+320)+' '+(y+95)+ 'l 73 0').attr({'stroke':'black', 'stroke-width':'1'});
	 
	 paper.path('M'+(x+427)+' '+(y+95)+ 'l 40 0').attr({'stroke':'black', 'stroke-width':'2', 'arrow-end':'classic-wide-long'});
	 
	 paper.path('M'+(x-290)+' '+(y-35)+ 'l 0 75').attr({'stroke':'black', 'stroke-width':'1'});
	 
	 paper.path('M'+(x-280)+' '+(y-10)+ 'l -25 25').attr({'stroke':'black', 'stroke-width':'1'});
	 
	 paper.path('M'+(x-280)+' '+(y-20)+ 'l -25 25').attr({'stroke':'black', 'stroke-width':'1'});
	 
	 paper.path('M'+(x-290)+' '+(y-85)+ 'l 0 -85 l 415 0').attr({'stroke':'black', 'stroke-width':'2',  'stroke-dasharray' : '--'});
	 	 
	 paper.path('M'+(x+150)+' '+(y-95)+ 'l 0 -50').attr({'stroke':'black', 'stroke-width':'1', 'stroke-dasharray' : '--'});
	 
	 paper.path('M'+(x+150)+' '+(y-18)+ 'l 0 -27').attr({'stroke':'black', 'stroke-width':'2'});
	 
	 paper.path('M'+(x+410)+' '+(y)+ 'l 0 70').attr({'stroke':'black', 'stroke-width':'1'});
	 
	 paper.path('M'+(x+420)+' '+(y+15)+ 'l -20 20').attr({'stroke':'black', 'stroke-width':'1'});
	 
	 paper.path('M'+(x+420)+' '+(y+25)+ 'l -20 20').attr({'stroke':'black', 'stroke-width':'1'});
	 
	 
	 PC_ControlValve((x-300),(y+50));	 
	 NRV_Valve((x-150),(y+50));  
	 var MVValve = PC_ControlValve((x+400),(y+80));
	 
	 
	 var CV100 = Label((x-290), (y+90), "PCV 100");	 
	 var NRV100 = Label((x-140), (y+90), "NRV 100");
	 var MV100 = Label((x+410), (y+120), "PCV 200");
	 var UD = Label((x+470), (y+25), "User Demand");
	 var outlet = Label((x+494), (y+93), "Gas Out");
	 var inlet = Label((x-370), (y+65), "Gas In");
	 var T100 = Label((x+150), (y+60), "P 100");
	
	paper.text((x+100), (y+200), "Pressure Control System").attr({
			stroke : 'black',
			'font-size' : 25,
			"font-family": "sans-serif" 
		});
	 
};	


	function PL_Tank (x, y){
		
	 paper.path('M'+(x+25)+' '+(y-18)+'l 0 150 270 0 0 -150 -270 0').attr({
	"stroke-width" : 1,
	'stroke':'black',
	}); 
	
	 paper.path('M'+(x+25)+' '+(y-18)+ 'l 0 0 q -68 70 0 150  ').attr({'stroke':'black', 'stroke-width':'1'});	
	
	 paper.path('M'+(x+295)+' '+(y-18)+ 'l 0 0 q 68 70 0 150  ').attr({'stroke':'black', 'stroke-width':'1'});	
		
	};


	function PC_ControlValve(x, y){
	
	
	paper.path('M'+(x)+' '+(y)+ 'l 20 0').attr({'stroke':'black', 'stroke-width':'1'});
	
	 paper.path('M'+(x)+' '+(y)+ 'l 0 0 q 10 -20 20 0  ').attr({'stroke':'black', 'stroke-width':'1'});
	
	paper.path('M'+(x+10)+' '+(y)+ 'l 0 15').attr({'stroke':'black', 'stroke-width':'1'});
	
	 paper.path('M'+(x-8)+' '+(y+3)+ 'l 0 25 l 35 -25 l 0 25 l -35 -25').attr({'stroke':'black', 'stroke-width':'1'});
	
	
	
};
 
	function NRV_Valve(x, y){
	
	
	
	 paper.path('M'+(x-8)+' '+(y+28)+ 'l 0 -25 l 35 25 l 0 -25').attr({'stroke':'black', 'stroke-width':'1'});
	
	 paper.circle((x-8), (y), 3).attr({'stroke':'black', 'stroke-width':'1'});
	 
	 paper.path('M'+(x-8)+' '+(y-8)+ 'l 35 0').attr({'stroke':'black', 'stroke-width':'1', 'arrow-end':'classic-wide-long'});
	
	
};
 

 
 function Label(x, y, text){
	
	paper.text(x, y, text).attr({
			stroke : 'black',
			'font-size' : 12,
			"font-family": "sans-serif" 
		}).toBack();
	 
	 
	 
 };
   
   function PC_CircleWithLine(x, y, r, l1, l2){
	
	
	paper.circle(x, y, r).attr({'stroke':'black', 'stroke-width':'1'});
	paper.path('M'+(x-25)+' '+(y)+ 'l 50 0 ').attr({'stroke':'black', 'stroke-width':'1'});	
	Label((x), (y-10), l1);
	Label((x), (y+10), l2);
	
	
	
};

 function PC_CircleWithLabel(x, y, r, l1){
	
	
	paper.circle(x, y, r).attr({'stroke':'black', 'stroke-width':'1'});	
	Label(x, y, l1);

	
	
};
  
  
  function PC_PTCircleWithLabel(x, y, r, l1){
	
	
	var c = paper.circle(x, y, r).attr({'stroke':'black', 'stroke-width':'1'}).toFront();
	Label(x, y, l1);
    return c;
	
	
}; 
  
  
  