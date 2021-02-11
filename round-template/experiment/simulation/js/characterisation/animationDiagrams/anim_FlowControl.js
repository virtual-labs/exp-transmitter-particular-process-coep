// JavaScript Documentvar paper;


function anim_FlowControl(lowerSpanLevel,higherSpanLevel){	
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
	
	x = -10;
	y = 200;

	
	var Ft_tank1 = FT_tank1(x,(y-30));	
	
	var FCCircle1 = FC_CircleWithLine1((x+300), (y-20), 25, "FIC", "100");			
	var FY_Circle1 = FC_CircleWithLabel1((x+510), (y+110), 25, "FY 100");	
	var FE_Circle1 = FC_CircleWithLabel1((x+300), (y+180), 25, "FE 100");
	
    FTCircle1 = FC_FTCircleWithLabel1((x+300), (y+80), 25, "FT 100");	
	
	paper.path('M'+(x+95)+' '+(y-90)+ 'l 0 20').attr({'stroke':'black', 'stroke-width':'2	', 'arrow-end':'classic-wide-long'});	
	paper.path('M'+(x+95)+' '+(y+195)+ 'l 0 65 l 35 0').attr({'stroke':'black', 'stroke-width':'1'});	
	paper.path('M'+(x+170)+' '+(y+257)+ 'l 118 0').attr({'stroke':'black', 'stroke-width':'1'});	
	paper.path('M'+(x+310)+' '+(y+257)+ 'l 183 0').attr({'stroke':'black', 'stroke-width':'1'});
	
	paper.path('M'+(x+527)+' '+(y+257)+ 'l 50 0').attr({'stroke':'black', 'stroke-width':'2', 'arrow-end':'classic-wide-long'});
	
	paper.path('M'+(x+287)+' '+(y+247)+ 'l 0 25').attr({'stroke':'black', 'stroke-width':'1'});
	paper.path('M'+(x+298)+' '+(y+253)+ 'l 0 10').attr({'stroke':'black', 'stroke-width':'1'});
	paper.path('M'+(x+310)+' '+(y+247)+ 'l 0 25').attr({'stroke':'black', 'stroke-width':'1'});
	
	
	
	paper.path('M'+(x+298)+' '+(y+5)+ 'l 0 50').attr({'stroke':'black', 'stroke-width':'1', 'stroke-dasharray' : '--'});
	paper.path('M'+(x+298)+' '+(y+105)+ 'l 0 50').attr({'stroke':'black', 'stroke-width':'1'});
	paper.path('M'+(x+298)+' '+(y+205)+ 'l 0 50').attr({'stroke':'black', 'stroke-width':'1'});
	paper.path('M'+(x+325)+' '+(y-20)+ 'l 185 0 l 0 105').attr({'stroke':'black', 'stroke-width':'2', 'stroke-dasharray' : '--'});	
	paper.path('M'+(x+510)+' '+(y+136)+ ' l 0 98').attr({'stroke':'black', 'stroke-width':'1'});	
	paper.path('M'+(x+520)+' '+(y+166)+ ' l -20 20').attr({'stroke':'black', 'stroke-width':'1'});
	paper.path('M'+(x+520)+' '+(y+176)+ ' l -20 20').attr({'stroke':'black', 'stroke-width':'1'});
	
	FC_ControlValve1((x+500), (y+243));	
	FC_pumpdesign((x+150),(y+258));
	
	
    Label((x+100), (y+75), "F 100");	
	inlet = Label((x+95), (y-105), "Inlet");
	Label((x+620), (y+257), "User Demand");
	Label((x+510), (y+280), "FCV 100");
	
	paper.text((x+270), (y+320), "Flow Control System").attr({
			stroke : 'black',
			'font-size' : 25,
			"font-family": "sans-serif" 
		});
	
};


function FT_tank1(x, y){
	
	tank = paper.path('M'+(x+25)+' '+(y-18)+'l 0 220 150 0 0 -220 -150 0').attr({
	"stroke-width" : 1,
	'stroke':'black',
	'fill' : '#7fbfff'
	}); 
	
	
	
	upperArc = paper.path('M'+(x+25)+' '+(y-18)+ 'l 0 0 q 68 -50 150 0  ').attr({'stroke':'black', 'stroke-width':'1'});	
	
    lowerArc = paper.path('M'+(x+25)+' '+(y+200)+ 'l 0 0 q 68 50 150 0  ').attr({'stroke':'black', 'stroke-width':'1'});
	
}

function FC_ControlValve1(x, y){
		
	FC_Valve = paper.path('M'+(x)+' '+(y)+ 'l 20 0 M'+(x)+' '+(y)+ 'l 0 0 q 10 -20 20 0  M'+(x+10)+' '+(y)+ 'l 0 15 M'+(x-8)+' '+(y+3)+ 'l 0 25 l 35 -25 l 0 25 l -35 -25').attr({'stroke':'black', 'stroke-width':'1'});

	FC_Valve.attr({'stroke':'green', 'stroke-width':'1'});
				
				glowFC = FC_Valve.glow({
					width: 8,
					'stroke':'green'
				});								
				
				animFC = Raphael.animation({
					"stroke-width": 1,
					opacity: 1
				}, 2000, function(){FC_Valve.attr({'stroke':'green', 'stroke-width':'1'});});
				
				animFC = animFC.repeat(Infinity);	
				glowFC.animate(animFC);
				
};

function FC_pumpdesign(x, y){
	
	paper.circle(x, y, 20).attr({'stroke':'black', 'stroke-width':'1'});
 	pumpTr = paper.path('M'+(x-10)+' '+(y-18)+ 'l 0 35 l 30 -18 l -30 -18').attr({'stroke':'black', 'stroke-width':'1', fill:'green'});	
};

function FT_CircleWithLabel1(x, y, r, l1){
	
	paper.circle(x, y, r).attr({'stroke':'black', 'stroke-width':'1'});
	paper.path('M'+(x+12)+' '+(y-20)+ 'l 0 -20 l 30 0 l 0 28 l -20 0').attr({'stroke':'black', 'stroke-width':'1'});
	paper.path('M'+(x+17)+' '+(y-23)+ 'l 5 3 l 0 -10 l 18 0').attr({'stroke':'black', 'stroke-width':'1'});
	Label1(x, y, l1);
};
 
 function Label1(x, y, text){
	
	paper.text(x, y, text).attr({
			stroke : 'black',
			'font-size' : 12,
			"font-family": "sans-serif" 
		});	 
 };
 
  function FC_LabelValue(x, y, text, color){
	
	paper.text(x, y, text).attr({
			stroke : color,
			'font-size' : 14,
			"font-family": "sans-serif" 
		}).toBack();	 
 };
   
 function FC_CircleWithLine1(x, y, r, l1, l2){	
	
	paper.circle(x, y, r).attr({'stroke':'black', 'stroke-width':'1'});
	paper.path('M'+(x-25)+' '+(y)+ 'l 50 0 ').attr({'stroke':'black', 'stroke-width':'1'});	
	Label1((x), (y-10), l1);
	Label1((x), (y+10), l2);	
};

 function FC_CircleWithLabel1(x, y, r, l1){
	
	
	paper.circle(x, y, r).attr({'stroke':'black', 'stroke-width':'1'});	
	Label1(x, y, l1);

	
	
};

function FC_FTCircleWithLabel1(x, y, r, l1){
	
	
	var c = paper.circle(x, y, r).attr({'stroke':'black', 'stroke-width':'1'}).toFront();
	Label1(x, y, l1);
    return c;
	
	
};
  
  
  