var loc = "images/";
function swapImage(toChange, nImg){
	toChange.src = nImg;
}
/*
Name				propID	s.prop #
System						1
DocType						2
Region/Lang					6
Article Name				8
Section Navigation	prop A	29
Hub Name			prop B	30
Hub Menu Name		prop C	31
Lifecycle Stage		prop D	32
Consumer Need		prop E	33
Media Name			prop F	34
*/

function omnitureHelp34(var_pageName,var_channel,var_prop1,var_prop2,var_prop6,var_prop8,var_prop29,var_prop30,var_prop31,var_prop32,var_prop33,var_prop34){
	s			= s_gi('ncomglobal,ncomprod');
	s.prop1		= var_prop1;
	s.prop2		= var_prop2;
	s.prop6		= var_prop6;
	s.prop8		= var_prop8;
	s.prop29	= var_prop29;
	s.prop30	= var_prop30;
	s.prop31	= var_prop31;
	s.prop32	= var_prop32;
	s.prop33	= var_prop33;
	s.prop34	= var_prop34;
	
	s.pageName="";
	if(typeof(var_prop1) != "undefined") s.pageName+=var_prop1+":";
	var go8=false;
	if(var_prop8){
		if(var_prop8!=""){
			var go8=true;
		}
	}
	
	if(go8){
		if(typeof(var_prop2) != "undefined") s.pageName+=":";
	}
	else{
		if(typeof(var_prop2) != "undefined") s.pageName+=var_prop2+":";
	}
	
	s.pageName+=var_pageName;
	s.channel=var_channel;
	//if((s.channel+s.pageName).length>=100)alert("(DEV ONLY) Omniture Pagename longer than 100 characters:\n"+s.pageName);
	void(s.t());
}


function omnitureHelp(var_pageName,var_channel,var_prop6,var_prop1,var_prop2,var_prop8){
	s=s_gi('ncomglobal,ncomprod');
	s.prop1=var_prop1;
	s.prop6=var_prop6;
	s.pageName="";
	if(typeof(var_prop1) != "undefined") s.pageName+=var_prop1+":";
	var go8=false;
	if(var_prop8){
		if(var_prop8!=""){
			var go8=true;
		}
	}
	
	if(go8){
		s.prop2=var_prop2;
		s.prop8=var_prop8;
		if(typeof(var_prop2) != "undefined") s.pageName+=":";
	}
	else{
		s.prop2="";
		s.prop8="";
		if(typeof(var_prop2) != "undefined") s.pageName+=var_prop2+":";
	}
	
	s.pageName+=var_pageName;
	s.channel=var_channel;
	//if((s.channel+s.pageName).length>=100)alert("(DEV ONLY) Omniture Pagename longer than 100 characters:\n"+s.pageName);
	void(s.t());
}
	
