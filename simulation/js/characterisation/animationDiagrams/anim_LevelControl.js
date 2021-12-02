
//var SINGLEACTINGCYLINDER = SINGLEACTINGCYLINDER || {};


	//SINGLEACTINGCYLINDER.anim_LevelControl = function (lowerSpanLevel,higherSpanLevel){	

var LC_lowlevel, LC_highlevel, LC_setlevel;


function anim_LevelControl(lowerSpanLevel,higherSpanLevel, waterlevel, oldreading){
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
	

	x = 40;
	y = 120;

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
	
	//onOffCir = paper.circle((x+680), (y-80), 25).attr({'stroke':'black', 'stroke-width':'1'});	
	
	
	
	
    LC_ControlValve((x+370), (y+315), waterlevel, oldreading, (x+202), (y-95));
	
	
	
	var LCV100_Label = Label1((x+380), (y+350), "LCV 100");
	var LCV200_Label = Label1((x+210), (y-105), "LCV 200");
	var Liquid_outlet = Label1((x+470), (y+325), "User Demand");
	Label((x+440), (y+10), "OR");

	
	//var height = Height((x+5), (y+20));
	
	paper.text((x+200), (y+400), "Level Control System").attr({
			stroke : 'black',
			'font-size' : 25,
			"font-family": "sans-serif" 
		});
	
    LC_checkWaterLevel(LC_lowlevel, LC_highlevel, LC_setlevel, x, y, waterlevel);
    

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

function LC_ControlValve(x, y, waterlevel, oldreading, x1, y1){

		loweroutlet = paper.path('M'+(x)+' '+(y)+ 'l 20 0 M'+(x)+' '+(y)+ 'l 0 0 q 10 -20 20 0  M'+(x+10)+' '+(y)+ 'l 0 10 M'+(x-8)+' '+(y+3)+ 'l 0 15 l 35 -15 l 0 15 l -35 -15').attr({'stroke':'black', 'stroke-width':'1'});
		loweroutlet1 = paper.path('M'+(x1)+' '+(y1+20)+ 'l 20 0 M'+(x1)+' '+(y1+20)+ 'l 0 0 q 10 20 20 0  M'+(x1+10)+' '+(y1+10)+ 'l 0 10 M'+(x1-8)+' '+(y1+3)+ 'l 0 15 l 35 -15 l 0 15 l -35 -15').attr({'stroke':'black', 'stroke-width':'1'});

};
 
 function Label1(x, y, text){
	
	paper.text(x, y, text).attr({
			stroke : 'black',
			'font-size' : 12,
			"font-family": "sans-serif" 
		}).toBack();	 
 };
 
 function LC_LabelValue(x, y, text, color){
	
	paper.text(x, y, text).attr({
			stroke : color,
			'font-size' : 12,
			"font-family": "sans-serif" 
		}).toBack();	 
 };
 
 function LabelOnOff(x1, y1, name, status){
	
	onOff = paper.text((x+x1), (y+y1), name+" = "+status).attr({
			stroke : 'black',
			'font-size' : 12,
			"font-family": "sans-serif" 
		})
	
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
	Label1(x, (y-10), l1);
    return c;
	
	
};
   
 function Height(x, y){
	 
	 
	 line1 = paper.path('M'+(x)+' '+(y)+'l 10 0');
	 line2 = paper.path('M'+(x+5)+' '+(y)+'l 0 80').attr({'stroke':'black', 'stroke-width':'2', 'arrow-start':'classic-wide-long'});
	 HT_Label1 = Label1((x+5), (y+90), "H");
	 line3 = paper.path('M'+(x+5)+' '+(y + 100)+'l 0 105').attr({'stroke':'black', 'stroke-width':'2', 'arrow-end':'classic-wide-long'});
	 line4 = paper.path('M'+(x)+' '+(y+205)+'l 80 0');
	 
 };
   

 function LC_checkWaterLevel(LC_lowlevel, LC_highlevel, LC_setlevel, x, y, waterlevel){
	 var ht;
	 if(LC_lowlevel == 1){
		 ht = 28
	 }
	 if(LC_lowlevel == 2){
		 ht = 60 
	 }

	if(waterlevel > 0 && waterlevel <= 0.12){
		 ht = 1
	}
	if(waterlevel > 0.12 && waterlevel <= 0.25){
		 ht = 4
	}	 
	if(waterlevel > 0.25 && waterlevel <= 0.37){
		 ht = 8
	}
	if(waterlevel > 0.37 && waterlevel <= 0.5){
		 ht = 12
	} 
	if(waterlevel > 0.5 && waterlevel <= 0.62){
		 ht = 16
	}
	if(waterlevel > 0.62 && waterlevel <= 0.75){
		 ht = 20
	}
	if(waterlevel > 0.75 && waterlevel <= 0.87){
		 ht = 24
	}	 
	if(waterlevel > 0.87 && waterlevel <= 1){
		 ht = 28
	} 
	 
	if(waterlevel > 1 && waterlevel <= 1.12){
		 ht = 32
	}
	if(waterlevel > 1.12 && waterlevel <= 1.25){
		 ht = 36
	}	 
	if(waterlevel > 1.25 && waterlevel <= 1.37){
		 ht = 40
	}
	if(waterlevel > 1.37 && waterlevel <= 1.5){
		 ht = 44
	} 
	if(waterlevel > 1.5 && waterlevel <= 1.62){
		 ht = 48
	}
	if(waterlevel > 1.62 && waterlevel <= 1.75){
		 ht = 52
	}
	if(waterlevel > 1.75 && waterlevel <= 1.87){
		 ht = 56
	}	 
	if(waterlevel > 1.87 && waterlevel <= 2){
		 ht = 60
	} 
	 
	if(waterlevel > 2 && waterlevel <= 2.12){
		 ht = 64
	}
	if(waterlevel > 2.12 && waterlevel <= 2.25){
		 ht = 68
	}	 
	if(waterlevel > 2.25 && waterlevel <= 2.37){
		 ht = 72
	}
	if(waterlevel > 2.37 && waterlevel <= 2.5){
		 ht = 76
	} 
	if(waterlevel > 2.5 && waterlevel <= 2.62){
		 ht = 80
	}
	if(waterlevel > 2.62 && waterlevel <= 2.75){
		 ht = 84
	}
	if(waterlevel > 2.75 && waterlevel <= 2.87){
		 ht = 88
	}	 
	if(waterlevel > 2.87 && waterlevel <= 3){
		 ht = 92
	}	 
	
	if(waterlevel > 3 && waterlevel <= 3.12){
		 ht = 96
	 }
	if(waterlevel > 3.12 && waterlevel <= 3.25){
		 ht = 100
	 }
	if(waterlevel > 3.25 && waterlevel <= 3.37){
		 ht = 104
	 }
	 if(waterlevel > 3.37 && waterlevel <= 3.5){
		 ht = 108
	 }
	 if(waterlevel > 3.5 && waterlevel <= 3.62){
		 ht = 112
	 }
	 if(waterlevel > 3.62 && waterlevel <= 3.75){
		 ht = 116
	 }
	if(waterlevel > 3.75 && waterlevel <= 3.87){
		 ht = 120
	 }	 
	 if(waterlevel > 3.87 && waterlevel <= 4){
		 ht = 124
	 }	 
	
	if(waterlevel > 4 && waterlevel <= 4.12){
		 ht = 128
	 }	
	if(waterlevel > 4.12 && waterlevel <= 4.25){
		 ht = 132
	 }
	if(waterlevel > 4.25 && waterlevel <= 4.37){
		 ht = 136
	 }		 
	 if(waterlevel > 4.37 && waterlevel <= 4.5){
		 ht = 140
	 }	
	if(waterlevel > 4.5 && waterlevel <= 4.62){
		 ht = 144
	 }		 
	 if(waterlevel > 4.62 && waterlevel <= 4.75){
		 ht = 148
	 }	 
	 if(waterlevel > 4.75 && waterlevel <= 4.87){
		 ht = 152
	 }	
	 if(waterlevel > 4.87 && waterlevel <= 5){
		 ht = 156
	 }	 
	
	if(waterlevel > 5 && waterlevel <= 5.12){
		 ht = 160
	 }	
	if(waterlevel > 5.12 && waterlevel <= 5.25){
		 ht = 164
	 }
	 if(waterlevel > 5.25 && waterlevel <= 5.37){
		 ht = 168
	 }
	 if(waterlevel > 5.37 && waterlevel <= 5.5){
		 ht = 172
	 }
	 if(waterlevel > 5.5 && waterlevel <= 5.62){
		 ht = 176
	 }
	if(waterlevel > 5.62 && waterlevel <= 5.75){
		 ht = 180
	 }	 
	 if(waterlevel > 5.75 && waterlevel <= 5.87){
		 ht = 184
	 }	 
	 if(waterlevel > 5.87 && waterlevel <= 6){
		 ht = 188
	 }
	 
	 if(waterlevel > 6 && waterlevel <= 6.12){
		 ht = 192
	}
	if(waterlevel > 6.12 && waterlevel <= 6.25){
		 ht = 196
	}	 
	if(waterlevel > 6.25 && waterlevel <= 6.37){
		 ht = 200
	}
	if(waterlevel > 6.37 && waterlevel <= 6.5){
		 ht = 204
	} 
	if(waterlevel > 6.5 && waterlevel <= 6.62){
		 ht = 208
	}
	if(waterlevel > 6.62 && waterlevel <= 6.75){
		 ht = 212
	}
	if(waterlevel > 6.75 && waterlevel <= 6.87){
		 ht = 216
	}	 
	if(waterlevel > 6.87 && waterlevel <= 7){
		 ht = 220
	}
	 
	 a = paper.path('M'+(x+100)+' '+(y+201)).attr({'stroke':'#7fbfff','stroke-width': '148', opacity : 1});
	 level = a.animate( {path:"M"+ (x+100) +" "+ (y+201) +" l 0" + -ht, 'stroke-width': '148', 'stroke':'#7fbfff',
			opacity : 1}, 010);
	 
	 y1 = y+201-ht;
	
	if(ht != undefined){
		LC_htlable(x,y, ht, LC_lowlevel, LC_highlevel, LC_setlevel, waterlevel); 
	}
 };
  
 function LC_htlable(x,y, ht, LC_lowlevel, LC_highlevel, LC_setlevel, waterlevel){
	   	 
		if(!(LC_setlevel >= 0 && LC_setlevel <= 0.2)){
			paper.path('M'+(x)+' '+(y+201)+'l 10 0').attr({
				'stroke' : 'black'
			});
			 
			paper.path('M'+(x+5)+' '+(y+201)+'l 0 '+ -ht).attr({
				'stroke' : 'black'
			});
			
			paper.path('M'+(x)+' '+(y+201-ht)+'l 10 0 ').attr({
				'stroke' : 'black'
			});
		}
		
		paper.text((x-20), (y+201-(ht/2)), "h="+waterlevel  ).attr({
			stroke : '#3788AC',
			'font-size' : 15
		});
		
 };
  
  //function LT_100L(lblt){
	//  paper.text((x+380), (y-10), lblt);
  //}