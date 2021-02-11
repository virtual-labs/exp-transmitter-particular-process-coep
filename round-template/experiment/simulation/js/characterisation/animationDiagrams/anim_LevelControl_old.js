
//var SINGLEACTINGCYLINDER = SINGLEACTINGCYLINDER || {};


	//SINGLEACTINGCYLINDER.anim_LevelControl = function (lowerSpanLevel,higherSpanLevel){	

var LC_lowlevel, LC_highlevel, LC_setlevel  ;
var LC_Oldsetlevel = 0, old_ht = 0, ht = 0;

function anim_LevelControl(lowerSpanLevel,higherSpanLevel, waterlevel){
	ht = 0
	paper = new Raphael(document.getElementById('canvas'), '100%', 700);
	
	
	x = 40;
	y = 180;

	LC_lowlevel = lowerSpanLevel;
	LC_highlevel = higherSpanLevel;
	LC_setlevel = waterlevel;
	
	
	var LC_tank1 = LC_Tank1(x,y);
	
	var LECircle1 = LC_CircleWithLabel1((x+245), (y+40), 25,"LE 100");	
    LTCircle1 = LC_LTCircleWithLabel1((x+380), (y+40), 25,"LT 100");		
	var LYCircle1 = 	LC_CircleWithLabel1((x+380), (y+215), 25,"LY 100");
	var LICCircle1 = LC_CircleWithLine1((x+380), (y+125), 25, "LIC", "100");	
	var LY200Circle1 = 	LC_CircleWithLabel1((x+380), (y-40), 25,"LY 200");
	var LIC200Circle1 = 	LC_CircleWithLine1((x+485), (y+40), 25,"LIC", "200");
	var LY200Circle1 = 	LC_CircleWithLabel1((x+380), (y-40), 25,"LY 200");
	
	
	paper.path('M'+(x+95)+' '+(y-42)+'l 0 -45 100 0').attr({'stroke':'black', 'stroke-width':'2', 'arrow-start':'classic-wide-long'});	
	
	LC_ControlValve1((x+202), (y-95)); 
	
	paper.path('M'+(x+230)+' '+(y-85)+'l 100 0').attr({'stroke':'black', 'stroke-width':'1'});

	var inletSource = Label((x+380), (y-85), "Inlet Source");
	
	paper.path('M'+(x+212)+' '+(y-65)+ 'l 0 25 145 0').attr({'stroke':'black', 'stroke-width':'1'});
	
	paper.path('M'+(x+405)+' '+(y-40)+ 'l 80 0 0 55').attr({'stroke':'black', 'stroke-width':'1', 'stroke-dasharray' : '--'});
	
	paper.path('M'+(x+405)+' '+(y+40)+ 'l 60 0 ').attr({'stroke':'black', 'stroke-width':'1', 'stroke-dasharray' : '--'});
	
	paper.path('M'+(x+95)+' '+(y+225)+ 'l 0 100 267 0 ').attr({'stroke':'black', 'stroke-width':'2'});
	
	paper.path('M'+(x+398)+' '+(y+325)+ 'l  30 0 ').attr({'stroke':'black', 'stroke-width':'2', 'arrow-end':'classic-wide-long'});
	
	paper.path('M'+(x+173)+' '+(y+40)+ 'l 47 0 ').attr({'stroke':'black', 'stroke-width':'1'});	
	
	paper.path('M'+(x+272)+' '+(y+40)+ 'l 82 0 ').attr({'stroke':'black', 'stroke-width':'1', 'stroke-dasharray' : '--'});	
	
	paper.path('M'+(x+380)+' '+(y+65)+ 'l 0 35 ').attr({'stroke':'black', 'stroke-width':'1', 'stroke-dasharray' : '--'});	
	
	paper.path('M'+(x+380)+' '+(y+150)+ 'l 0 40').attr({'stroke':'black', 'stroke-width':'1', 'stroke-dasharray' : '--'});
	
	paper.path('M'+(x+380)+' '+(y+240)+ 'l 0 65').attr({'stroke':'black', 'stroke-width':'1'});
	
	paper.path('M'+(x+390)+' '+(y+255)+ 'l -20 20').attr({'stroke':'black', 'stroke-width':'2'});
	
	paper.path('M'+(x+390)+' '+(y+265)+ 'l -20 20').attr({'stroke':'black', 'stroke-width':'2'});
	
    LC_ControlValve((x+370), (y+315));
	
	
	
	var LCV100_Label = Label1((x+380), (y+350), "LCV 100");
	var LCV200_Label = Label1((x+210), (y-105), "LCV 200");
	var Liquid_outlet = Label1((x+470), (y+325), "User Demand");
	Label1((x+440), (y+10), "OR");

	
	//var height = Height((x+5), (y+20));
	
	paper.text((x+200), (y+400), "Level Control System").attr({
			stroke : 'black',
			'font-size' : 25,
			"font-family": "sans-serif" 
		});
	
 //   LC_checkWaterLevel(LC_lowlevel, LC_highlevel, LC_setlevel, x, y);
    

};


function LC_Tank1(x,y){
	
	tank = paper.path('M'+(x+25)+' '+(y-18)+'l 0 220 150 0 0 -220 -150 0').attr({
	"stroke-width" : 1,
	'stroke':'black',
	}); 
	
//	waterlevel = paper.path('M'+(x+25)+' '+(y+20)+'l 150 0').attr({'stroke':'black', 'stroke-width':'1', 'stroke-dasharray' : '--'});
	
	upperArc = paper.path('M'+(x+25)+' '+(y-18)+ 'l 0 0 q 68 -50 150 0  ').attr({'stroke':'black', 'stroke-width':'1'});	
	
    lowerArc = paper.path('M'+(x+25)+' '+(y+200)+ 'l 0 0 q 68 50 150 0  ').attr({'stroke':'black', 'stroke-width':'1'});
	
};

function LC_ControlValve(x, y){
	
	
	loweroutlet = paper.path('M'+(x)+' '+(y)+ 'l 20 0').attr({'stroke':'black', 'stroke-width':'1'});
	
	Arc = paper.path('M'+(x)+' '+(y)+ 'l 0 0 q 10 -20 20 0  ').attr({'stroke':'black', 'stroke-width':'1'});
	
	joiningline = paper.path('M'+(x+10)+' '+(y)+ 'l 0 10').attr({'stroke':'black', 'stroke-width':'1'});
	
	valve = paper.path('M'+(x-8)+' '+(y+3)+ 'l 0 15 l 35 -15 l 0 15 l -35 -15').attr({'stroke':'black', 'stroke-width':'1'});
	
	
	
};
 
 function LC_ControlValve1(x, y){

	 loweroutlet1 = paper.path('M'+(x)+' '+(y+20)+ 'l 20 0').attr({'stroke':'black', 'stroke-width':'1'});
	 
	 Arc1 = paper.path('M'+(x)+' '+(y+20)+ 'l 0 0 q 10 20 20 0  ').attr({'stroke':'black', 'stroke-width':'1'});
	
	joiningline1 = paper.path('M'+(x+10)+' '+(y+10)+ 'l 0 10').attr({'stroke':'black', 'stroke-width':'1'});
	
	valve1 = paper.path('M'+(x-8)+' '+(y+3)+ 'l 0 15 l 35 -15 l 0 15 l -35 -15').attr({'stroke':'black', 'stroke-width':'1'});
	 
 };
 
 
 function Label1(x, y, text){
	
	paper.text(x, y, text).attr({
			stroke : 'black',
			'font-size' : 12,
			"font-family": "sans-serif" 
		}).toBack();
	 
	 
	 
 };
 
 
 function LC_CircleWithLine1(x, y, r, l1, l2){
	
	
	paper.circle(x, y, r).attr({'stroke':'black', 'stroke-width':'1'});
	paper.path('M'+(x-25)+' '+(y)+ 'l 50 0 ').attr({'stroke':'black', 'stroke-width':'1'});	
	Label1((x), (y-10), l1);
	Label1((x), (y+10), l2);
	
	
	
};
 
  function LC_CircleWithLabel1(x, y, r, l1){
	
	
	var c = paper.circle(x, y, r).attr({'stroke':'black', 'stroke-width':'1'});	
	Label1(x, y, l1);
  
	
};
 
 
   function LC_LTCircleWithLabel1(x, y, r, l1){
	
	
	var c = paper.circle(x, y, r).attr({'stroke':'black', 'stroke-width':'1', 'cursor':'pointer'}).toFront();	
	Label1(x, y, l1);
    return c;
	
	
};
   
 function Height(x, y){
	 
	 
	 line1 = paper.path('M'+(x)+' '+(y)+'l 10 0');
	 line2 = paper.path('M'+(x+5)+' '+(y)+'l 0 80').attr({'stroke':'black', 'stroke-width':'2', 'arrow-start':'classic-wide-long'});
	 HT_Label1 = Label1((x+5), (y+90), "H");
	 line3 = paper.path('M'+(x+5)+' '+(y + 100)+'l 0 105').attr({'stroke':'black', 'stroke-width':'2', 'arrow-end':'classic-wide-long'});
	 line4 = paper.path('M'+(x)+' '+(y+205)+'l 80 0');
	 
 };
   

 function LC_checkWaterLevel(LC_lowlevel, LC_highlevel, LC_setlevel, x, y){
	 y1 = (y+201);
	 if(LC_setlevel == LC_Oldsetlevel){
		 
		 if(LC_lowlevel == 1){
			 ht = 30
			 LC_Oldsetlevel = LC_lowlevel;
			 LC_animateWaterLevel(ht);
		 }
		 if(LC_lowlevel == 2){
			 ht = 60 
			 LC_Oldsetlevel = LC_lowlevel;
			 LC_animateWaterLevel(ht);
		 }
		
		 y1 = (y+201)-ht;
//		 console.log(y1); 
		 
	 }
	
	if(LC_setlevel > LC_Oldsetlevel){
		
		
		 diff = (LC_setlevel - LC_Oldsetlevel).toFixed(2);
		
		 pixelNo = ((diff * 5)/0.1).toFixed(2);
		
		ht =  parseInt(pixelNo);
		
		y1 = y1 - ht;
		
		if(y1 < 161){
			
			ht = 220;
			
		}
		
		LC_animateIncreasedWaterLevel(ht, y1);
		
	}
	 
	
	 LC_htlable(x,y, ht, LC_lowlevel, LC_highlevel, LC_setlevel); 
	
	 
 };
  
 function LC_htlable(x,y, ht, LC_lowlevel, LC_highlevel, LC_setlevel){
	   
	    
		paper.path('M'+(x)+' '+(y+201)+'l 10 0').attr({
			'stroke' : 'black'
		});
	 
		paper.path('M'+(x+5)+' '+(y+201)+'l 0 '+ -ht).attr({
			'stroke' : 'black'
		});
	 
		paper.path('M'+(x)+' '+(y+201-ht)+'l 10 0 ').attr({
			'stroke' : 'black'
		});
	 
		paper.text((x-10), (y+201-(ht/2)), "h"  ).attr({
			stroke : '#3788AC',
			'font-size' : 15
		});
		
 };
  
 function LC_animateWaterLevel(ht){
	 
	 a = paper.path('M'+(x+100)+' '+(y+201)).attr({'stroke-width': '148', 'stroke':'#7fbfff',
			opacity : 1});
	 level = a.animate( {path:"M"+ (x+100) +" "+ (y+201) +" l 0" + -ht, 'stroke-width': '148', 'stroke':'#7fbfff',
			opacity : 1}, 1000);
	  
	 old_ht = ht;
 };
  
 
 function LC_animateIncreasedWaterLevel(ht, y1){
	 
	
	 
		 paper.path('M'+(x+100)+' '+(y+201)+'l 0'+ -old_ht).attr({'stroke-width': '148', 'stroke':'#7fbfff',
				opacity : 1});
		
	 a = paper.path('M'+(x+100)+' '+(y1-old_ht+4)).attr({'stroke-width': '148', 'stroke':'#7fbfff',
			opacity : 1});
	 level = a.animate( {path:"M"+ (x+100) +" "+(y1 -old_ht+4) +" l 0" + -ht, 'stroke-width': '148', 'stroke':'#7fbfff',
			opacity : 1}, 5000);
	 
	 old_ht = old_ht + ht;
 };