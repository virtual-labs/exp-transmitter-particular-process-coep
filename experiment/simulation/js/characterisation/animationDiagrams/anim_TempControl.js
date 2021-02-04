// JavaScript Documentvar paper;


function anim_TempControl(lowerSpanLevel,higherSpanLevel){	
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
    //x = 310;
	//y = 160;
	
	x = 200;
	y = 300;

	
	 var TL_tank1 = TL_Tank1 (x, y);
	 
	
	 
     var TICCircle1 = TC_CircleWithLine1((x+48), (y-250), 25, "TIC", "100"); 	
	 TTCircle1 = TC_TTCircleWithLabel1((x+48), (y-160), 25, "TT 100");	 
	 var TECircle1 = TC_CircleWithLabel1((x+48), (y-80), 25, "TE 100");	 
	 var TYCircle1 = TC_CircleWithLabel1((x-95), (y-105), 25, "TY 100");
	
	
     paper.path('M'+(x+10)+' '+(y+50)+'l -90 0 ').attr({'stroke':'black', 'stroke-width':'1'}); 
	 
	 paper.path('M'+(x-115)+' '+(y+50)+'l -50 0 ').attr({'stroke':'black', 'stroke-width':'2', 'arrow-start':'classic-wide-long'});	 
	 
	 paper.path('M'+(x-97)+' '+(y+30)+'l 0 -110 ').attr({'stroke':'black', 'stroke-width':'1'});
	 
	 paper.path('M'+(x-85)+' '+(y-30)+'l -20 20 ').attr({'stroke':'black', 'stroke-width':'1'});
	 
	  paper.path('M'+(x-85)+' '+(y-40)+'l -20 20 ').attr({'stroke':'black', 'stroke-width':'1'});
	 
	 paper.path('M'+(x-97)+' '+(y-130)+'l 0 -120 l 120 0 ').attr({'stroke':'black', 'stroke-width':'1', 'stroke-dasharray' : '--'});	 
	
	 paper.path('M'+(x+48)+' '+(y-225)+'l 0 40').attr({'stroke':'black', 'stroke-width':'1', 'stroke-dasharray' : '--'});
	 
	 paper.path('M'+(x+48)+' '+(y-135)+'l 0 30').attr({'stroke':'black', 'stroke-width':'1', 'stroke-dasharray' : '--'});
	 
	 paper.path('M'+(x+48)+' '+(y-55)+'l 0 140').attr({'stroke':'black', 'stroke-width':'1'});
	 
	 paper.rect((x+87), (y-165), 40, 35).attr({'stroke':'black', 'stroke-width':'1'});
	 
	 paper.path('M'+(x+105)+' '+(y-130)+'l 0 290').attr({'stroke':'black', 'stroke-width':'1'});
	 
	 paper.path('M'+(x+88)+' '+(y+152)+ 'l 0 15 l 35 -15 l 0 15 l -35 -15').attr({'stroke':'black', 'stroke-width':'1'});
	 
	 paper.path('M'+(x+135)+' '+(y+235)+ 'l 0 15 l 55 0').attr({'stroke':'black', 'stroke-width':'2', 'arrow-end':'classic-wide-long'});
	 
	 paper.path('M'+(x+190)+' '+(y+180)+ ' l 55 0').attr({'stroke':'black', 'stroke-width':'2', 'arrow-end':'classic-wide-long'});
	 
	 paper.path('M'+(x+135)+' '+(y-35)+ 'l 0 -15 l 55 0').attr({'stroke':'black', 'stroke-width':'2', 'arrow-start':'classic-wide-long'});
	 
	 
	 
	 TC_ControlValve((x -107), (y+40));
	 
	 
	 var SteamIn = Label2((x-165), (y+35), "Steam In");
	 var TCV100 = Label2((x-97), (y+75), "TCV 100");	
	 var M = Label2((x+105), (y-145), "M");
	 var HotWaterOutlet = Label2((x+240), (y+250), "Hot Water Outlet");
	 var CondensateOutlet = Label2((x+300), (y+180), "Condensate Outlet");
	 var ColdWater = Label2((x+230), (y-50), "Cold Water");
	
	paper.text((x+100), (y+300), "Temperature  Control System").attr({
			stroke : 'black',
			'font-size' : 25,
			"font-family": "sans-serif" 
		});
	
	
	TC_WaterLevel(x, y, 170);
	
	
//	 M170,90C170,70,210,110,210,90C210,70,170,110,170,90Z
};	


	function TL_Tank1 (x, y){
		
		tank = paper.path('M'+(x+25)+' '+(y-18)+'l 0 220 150 0 0 -220 -150 0').attr({
	"stroke-width" : 1,
	'stroke':'black',
	}); 
	
	
	outertankCover1 = paper.path('M'+(x+25)+' '+(y+20)+'l -15 0 0 195').attr({'stroke':'black', 'stroke-width':'1'});
	
	outertankCover1 = paper.path('M'+(x+175)+' '+(y+20)+'l 15 0 0 198').attr({'stroke':'black', 'stroke-width':'1'});
	
	upperArc = paper.path('M'+(x+25)+' '+(y-18)+ 'l 0 0 q 68 -50 150 0  ').attr({'stroke':'black', 'stroke-width':'1'});	
	
    lowerArc = paper.path('M'+(x+25)+' '+(y+200)+ 'l 0 0 q 68 50 150 0  ').attr({'stroke':'black', 'stroke-width':'1'});
	
	outertankCoverArc  = paper.path('M'+(x+10)+' '+(y+215)+ 'l 0 0 q 68 50 180 3  ').attr({'stroke':'black', 'stroke-width':'1'});

	
	};


	function TC_ControlValve(x, y){
	
	
	loweroutlet = paper.path('M'+(x)+' '+(y)+ 'l 20 0').attr({'stroke':'black', 'stroke-width':'1'});
	
	Arc = paper.path('M'+(x)+' '+(y)+ 'l 0 0 q 10 -20 20 0  ').attr({'stroke':'black', 'stroke-width':'1'});
	
	joiningline = paper.path('M'+(x+10)+' '+(y)+ 'l 0 10').attr({'stroke':'black', 'stroke-width':'1'});
	
	valve = paper.path('M'+(x-8)+' '+(y+3)+ 'l 0 15 l 35 -15 l 0 15 l -35 -15').attr({'stroke':'black', 'stroke-width':'1'});
	
	
	
};
 
 function Label2(x, y, text){
	
	paper.text(x, y, text).attr({
			stroke : 'black',
			'font-size' : 12,
			"font-family": "sans-serif" 
		}).toBack();
	 
	 
	 
 };
 
 
 function TC_LabelValue(x, y, text, color){
	 
	
	 
	  TC_lb = paper.text(x, y, text).attr({
				stroke : color,
				'font-size' : 15,
				"font-family": "sans-serif" 
			}).toBack();	 
	 };
 
 
  function TC_CircleWithLine1(x, y, r, l1, l2){
	
	
	paper.circle(x, y, r).attr({'stroke':'black', 'stroke-width':'1'});
	paper.path('M'+(x-25)+' '+(y)+ 'l 50 0 ').attr({'stroke':'black', 'stroke-width':'1'});	
	Label2((x), (y-10), l1);
	Label2((x), (y+10), l2);
	
	
	
};

 function TC_CircleWithLabel1(x, y, r, l1){
	
	
	paper.circle(x, y, r).attr({'stroke':'black', 'stroke-width':'1'});	
	Label2(x, y, l1);

	
	
};

   

function TC_TTCircleWithLabel1(x, y, r, l1){
	
	
	var c = paper.circle(x, y, r).attr({'stroke':'black', 'stroke-width':'1'}).toFront();	
	Label2(x, y, l1);
    return c;
	
	
};
 
function TC_WaterLevel(x, y, ht){
	
	 b = paper.path('M'+(x+100)+' '+(y+201)+" l 0" + -ht).attr({'stroke':'#7fbfff','stroke-width': '148', opacity : 1}).toBack();
	
  
};
  