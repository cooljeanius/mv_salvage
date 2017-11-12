// Custom scripts and Plugins for Nintendo.com

//v1.7
// Flash Player Version Detection
// Detect Client Browser type
// Copyright 2005-2007 Adobe Systems Incorporated.  All rights reserved.
var isIE  = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;

var $ = jQuery.noConflict();

//LATO Font Loader - Google Fonts API
/*WebFontConfig = {
    google: { families: [ 'Lato::latin' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();

*/
util = new Object;


//Image Preload Function
//util.preLoadImages("imgurl.jpg", "imgurl.jpg");
var cache = [];

// Arguments are image paths relative to the current page.
util.preLoadImages = function() {
    var el_list = arguments.length;
    for (var i = el_list; i--;) {
      var loadImg = document.createElement('img');
      loadImg.src = arguments[i];
      cache.push(loadImg);
    }
	//alert("UTIL!");
}

util.cutString = function(strText, strLength) {
	var tmpStr = strText;
	if(strText.length >= strLength) {
		tmpStr = strText.substring(0,(strLength-4));
		tmpStr = tmpStr + "...";
		return tmpStr;
	}
}

//Embed SWF
util.embedSWF = function(swfURL, swfWidth, swfHeight, divID, flashvarObj, paramObj) {
	
	if(flashvarObj != null || flashvarObj != undefined) {
		var flashvars = flashvarObj;
	} else {
		var flashvars = {};	
	}
	
	if(paramObj != null || paramObj != undefined) {
		var params = paramObj;
	} else {
		var params = {
			allowFullScreen:"true"
			//wmode: "window"		
		}
	}
	swfobject.embedSWF(swfURL, divID, swfWidth, swfHeight, "9.0.0", null, flashvars, params);
}


//Embed video
//util.embedVideo(vidURL, vidTitle, omnisection, omnipagename, divID, gamename, gamepub, gamegenre);
util.embedVideo = function(vidURL, vidTitle, omnisection, omnipagename, divID, gamenamet, gamepubt, gamegenret) {
	var pwidth = $("#"+divID).width();
	var pheight = $("#"+divID).height();
	
	//below args for games and are optional
	if(arguments[5] != undefined) {
		gname = gamenamet;
		gpub = gamepubt;
		ggenre = gamegenret;
	} else {
		gname = "";
		gpub = "";
		ggenre = "";
	}
	
	var flashvars = {
		url: vidURL, //*required
		title: vidTitle, //video title *required for omniture
		autoplay: "false", //defaults to false
		loop: "false", //defaults to false
		omniture:"live", //off, live, debug. Defaults to 'off'
		sectionname: omnisection, //for omniture. used for channel and pagename 
		pagename:omnipagename, //for omniture. used for channel and pagename
		gamename:gname, //game name. *required for omniture game videos
		gamepub:gpub, //game publisher. *required for omniture game videos
		gamegenre:ggenre, //game genre. *required for omniture game videos
		playerLocation:"", //where the video player is located (s.prop26). "in-promo", "pop-up", "product detail"
		color:"blue" //supports blue or red theme.
		
		/*
		FOR REFERENCE: OMNITURE BREAKDOWN
		
		chan:sectionname:pagename
			us:ncom: //chan (set automatically)
			games //sectionname
			pagename //Mario galaxy
				
				us:ncom:games:Mario Galaxy
				us:ncom:wii:netflix		
		*/		
	};
	var params = {
		allowFullScreen:"true",
		wmode: "window"		
	}
	
	swfobject.embedSWF("/video/globalplayer/player.swf", divID, pwidth, pheight, "9.0.0", "", flashvars, params);
}

//embed video but all flashvars and params must be provided in an object
util.embedVideoAdvance = function(divID, flashvarObj, paramObj) {
	var pwidth = $("#"+divID).width();
	var pheight = $("#"+divID).height();
	
	var flashvars = flashvarObj;
	var params = paramObj;
	
	swfobject.embedSWF("/video/globalplayer/player.swf", divID, pwidth, pheight, "9.0.0", "", flashvars, params);
}

//PointRoll tracking var
var prd=new Date(),pru=Date.UTC(prd.getUTCFullYear(),prd.getUTCMonth(),prd.getUTCDay(),prd.getUTCHours(),prd.getUTCMinutes(),prd.getUTCSeconds(),prd.getUTCMilliseconds());

util.addPointRollFrame = function(pointID) {
	var pr_eid=pru+Math.random();
	var pr_event='';
	var pr_item='';
	var pr_quantity='';
	var pr_value='';
	document.write("<iframe width='0' height='0' frameborder='0' src='http://container.pointroll.com/event/?ctid="+pointID+"&amp;av=777&eid="+pr_eid+"&amp;ev="+pr_event+"&amp;item="+pr_item+"&amp;q="+pr_quantity+"&amp;val="+pr_value+"&amp;r="+Math.random()+"'></iframe>");	
}
util.addPointRollImage = function(pointID) {
	var pr_eid=pru+Math.random();
	var pr_event='';
	var pr_item='';
	var pr_quantity='';
	var pr_value='';
	document.write("<img height='1' src='http://ev.ads.pointroll.com/event/?ss="+pointID+"&amp;av=777&amp;eid="+pr_eid+"&amp;ev="+pr_event+"&amp;item="+pr_item+"&amp;q="+pr_quantity+"&amp;val="+pr_value+"&amp;r="+Math.random()+"' width='1' />");
}
util.callPointRoll = function(pointID) {
	var pr_eid=pru+Math.random();
	var pr_event='';
	var pr_item='';
	var pr_quantity='';
	var pr_value='';
	var px=new Image(1,1);px.src="http://ev.ads.pointroll.com/event/?ss="+pointID+"&av=777&eid="+pr_eid+"&ev="+pr_event+"&item="+pr_item+"&q="+pr_quantity+"&val="+pr_value+"&r="+Math.random();
}

//Browser Detection Script
var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera",
			versionSearch: "Version"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "IE",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			   string: navigator.userAgent,
			   subString: "iPhone",
			   identity: "iPhone/iPod"
	    },
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};
BrowserDetect.init();


//Scrollable Nav
var $scrMarker = $('div#globalNavigation').outerHeight();
//alert($scrMarker);

$(window).scroll(function(){
if( $(window).scrollTop() > $scrMarker ){
	$("div#alwaysNav").fadeIn(400);
	$("div#alwaysNav").css("display", "block");
}else {
	$("div#alwaysNav").fadeOut(400);
	$("div#alwaysNav").css("display", "none");
}
});



$.fn.carousel = function(previous, next, options){
	var sliderList = $(this).children()[0];
	
	if (sliderList) {
		var increment = $(sliderList).children().outerWidth("true"),
		elmnts = $(sliderList).children(),
		numElmts = elmnts.length,
		sizeFirstElmnt = increment,
		shownInViewport = Math.round($(this).width() / sizeFirstElmnt),
		firstElementOnViewPort = 1,
		isAnimating = false;
		
		for (i = 0; i < shownInViewport; i++) {
			$(sliderList).css('width',(numElmts+shownInViewport)*increment + increment + "px");
			$(sliderList).append($(elmnts[i]).clone());
		}
		
		$(previous).click(function(event){
			if (!isAnimating) {
				if (firstElementOnViewPort == 1) {
					$(sliderList).css('left', "-" + numElmts * sizeFirstElmnt + "px");
					firstElementOnViewPort = numElmts;
				}
				else {
					firstElementOnViewPort--;
				}
				
				$(sliderList).animate({
					left: "+=" + increment,
					y: 0,
					queue: true
				}, "swing", function(){isAnimating = false;});
				isAnimating = true;
			}
			
		});
		
		$(next).click(function(event){
			if (!isAnimating) {
				if (firstElementOnViewPort > numElmts) {
					firstElementOnViewPort = 2;
					$(sliderList).css('left', "0px");
				}
				else {
					firstElementOnViewPort++;
				}
				$(sliderList).animate({
					left: "-=" + increment,
					y: 0,
					queue: true
				}, "swing", function(){isAnimating = false;});
				isAnimating = true;
			}
		});
	}
};



/*	
 *	jQuery carouFredSel 2.4.2
 *	Demo's and documentation:
 *	caroufredsel.frebsite.nl
 *	
 *	Copyright (c) 2010 Fred Heusschen
 *	www.frebsite.nl
 *
 *	Licensed under the MIT license.
 *	http://www.opensource.org/licenses/mit-license.php
 */

(function($) {
	$.fn.carouFredSel = function(o) {
		if (this.length > 1) {
			return this.each(function() {
				$(this).carouFredSel(o);
			});
		}

		this.init = function(o) {
			if (typeof(o) != 'object')					o = {};
			if (typeof(o.scroll) == 'number') {
				if (o.scroll <= 50)						o.scroll	= { items	: o.scroll 	};
				else									o.scroll	= { duration: o.scroll 	};
			} else {
				if (typeof(o.scroll) == 'string')		o.scroll	= { easing	: o.scroll 	};
			}
				 if (typeof(o.items)  == 'number') 		o.items		= { visible	: o.items 	};
			else if (typeof(o.items)  == 'string') 		o.items		= { width	: o.items, 
																		height	: o.items	};

			opts = $.extend(true, {}, $.fn.carouFredSel.defaults, o);
			opts.padding = getPadding(opts.padding);
			opts.usePadding = (
				opts.padding[0] == 0 && 
				opts.padding[1] == 0 && 
				opts.padding[2] == 0 && 
				opts.padding[3] == 0
			) ? false : true;

			direction = (opts.direction == 'up' || opts.direction == 'left') ? 'next' : 'prev';

			if (opts.direction == 'right' || opts.direction == 'left') {
				opts.dimentions = ['width', 'outerWidth', 'height', 'outerHeight', 'left', 'top', 'marginRight'];
			} else {
				opts.dimentions = ['height', 'outerHeight', 'width', 'outerWidth', 'top', 'left', 'marginBottom'];
				opts.padding = [opts.padding[3], opts.padding[2], opts.padding[1], opts.padding[0]];
			}
			
			if (	  !opts.items.width)					opts.items.width 		= getItems($cfs).outerWidth(true);
			if (	  !opts.items.height)					opts.items.height		= getItems($cfs).outerHeight(true);
			if (typeof(opts.items.minimum)	 != 'number')	opts.items.minimum		= opts.items.visible;
			if (typeof(opts.scroll.items)	 != 'number')	opts.scroll.items		= opts.items.visible;
			if (typeof(opts.scroll.duration) != 'number')	opts.scroll.duration	= 500;

			opts.auto		= getNaviObject(opts.auto, false, true);
			opts.prev		= getNaviObject(opts.prev);
			opts.next		= getNaviObject(opts.next);
			opts.pagination	= getNaviObject(opts.pagination, true);

			opts.auto		= $.extend({}, opts.scroll, opts.auto);
			opts.prev		= $.extend({}, opts.scroll, opts.prev);
			opts.next		= $.extend({}, opts.scroll, opts.next);
			opts.pagination	= $.extend({}, opts.scroll, opts.pagination);

			if (typeof(opts.pagination.keys)			!= 'boolean')	opts.pagination.keys 			= false;
			if (typeof(opts.pagination.anchorBuilder)	!= 'function')	opts.pagination.anchorBuilder	= $.fn.carouFredSel.pageAnchorBuilder;
			if (typeof(opts.auto.play)					!= 'boolean')	opts.auto.play					= true;
			if (typeof(opts.auto.nap)					!= 'boolean')	opts.auto.nap					= true;
			if (typeof(opts.auto.delay)					!= 'number')	opts.auto.delay					= 0;
			if (typeof(opts.auto.pauseDuration)			!= 'number')	opts.auto.pauseDuration			= (opts.auto.duration < 10) ? 2500 : opts.auto.duration * 5;
		};	//	/init

		this.build = function() {
			$wrp.css({
				position: 'relative',
				overflow: 'hidden'
			});
			$cfs.data('cfs_origCss', {
				width	: $cfs.css('width'),
				height	: $cfs.css('height'),
				position: $cfs.css('position'),
				top		: $cfs.css('top'),
				left	: $cfs.css('left')
			}).css({
				position: 'absolute'
			});
			if (opts.usePadding) {
				getItems($cfs).each(function() {
					var m = parseInt($(this).css(opts.dimentions[6]));
					if (isNaN(m)) m = 0;
					$(this).data('cfs_origCssMargin', m);
				});
			}
			if (opts.items.minimum >= totalItems) {
				log('Not enough items: not scrolling');
				if (opts.prev.button) opts.prev.button.hide();
				if (opts.next.button) opts.next.button.hide();
			}
		};	//	/build

		this.bind_events = function() {
			$cfs
				.bind('pause', function(){
					if (autoInterval != null) {
						clearTimeout(autoInterval);
					}
				})
				.bind('play', function(e, d, f) {
					$cfs.trigger('pause');
					if (opts.auto.play) {
						if (d != 'prev' && d != 'next')	d = direction;
						if (typeof(f) != 'number')		f = 0;

						autoInterval = setTimeout(function() {
							if ($cfs.is(':animated'))	$cfs.trigger('play', d);
							else 						$cfs.trigger(d, opts.auto);
						}, opts.auto.pauseDuration + f);
					}
				})
				.bind('prev', function(e, sO, nI) {
					if ($cfs.is(':animated')) return false;
					if (opts.items.minimum >= totalItems) {
						log('Not enough items: not scrolling');
						return false;
					}
					if (typeof(sO) == 'number') nI = sO;
					if (typeof(sO) != 'object') sO = opts.prev;
					if (typeof(nI) != 'number') nI = sO.items;
					if (typeof(nI) != 'number') {
						log('Not a valid number: not scrolling');
						return false;
					}

					if (!opts.circular) {
						var nulItem = totalItems - firstItem;
						if (nulItem - nI < 0) {
							nI = nulItem;
						}
						if (firstItem == 0) {
							nI = 0;
						}
					}

					firstItem += nI;
					if (firstItem >= totalItems) firstItem -= totalItems;

					if (!opts.circular && !opts.infinite) {
						if (firstItem == 0 && 
							opts.prev.button) opts.prev.button.addClass('disabled');
						if (opts.next.button) opts.next.button.removeClass('disabled');
					}
					if (nI == 0) {
						if (opts.infinite) $cfs.trigger('next', totalItems-opts.items.visible);
						return false;
					}

					getItems($cfs, ':gt('+(totalItems-nI-1)+')').prependTo($cfs);
					if (totalItems < opts.items.visible + nI) getItems($cfs, ':lt('+((opts.items.visible+nI)-totalItems)+')').clone(true).appendTo($cfs);

					var c_itm = getCurrentItems($cfs, opts, nI),
						l_cur = getItems($cfs, ':nth('+(nI-1)+')'),
						l_old = c_itm[1].filter(':last'),
						l_new = c_itm[0].filter(':last');

					if (opts.usePadding) l_old.css(opts.dimentions[6], l_old.data('cfs_origCssMargin'));

					var i_siz = getSizes(opts, getItems($cfs, ':lt('+nI+')')),
						w_siz = mapWrapperSizes(getSizes(opts, c_itm[0], true), opts);
	
					if (opts.usePadding) l_old.css(opts.dimentions[6], l_old.data('cfs_origCssMargin') + opts.padding[1]);

					var a_cfs = {},
						a_new = {},
						a_cur = {},
						a_dur = sO.duration;

						 if (a_dur == 'auto')	a_dur = opts.scroll.duration / opts.scroll.items * nI;
					else if (a_dur <= 0)		a_dur = 0;
					else if (a_dur < 10)		a_dur = i_siz[0] / a_dur;

					if (sO.onBefore) sO.onBefore(c_itm[1], c_itm[0], w_siz, a_dur);

					if (opts.usePadding) {
						var new_m = opts.padding[3];
						a_cur[opts.dimentions[6]] = l_cur.data('cfs_origCssMargin');
						a_new[opts.dimentions[6]] = l_new.data('cfs_origCssMargin') + opts.padding[1];

						l_cur.css(opts.dimentions[6], l_cur.data('cfs_origCssMargin') + opts.padding[3]);
						l_cur.stop().animate(a_cur, {
							duration: a_dur,
							easing	: sO.easing
						});
						l_new.stop().animate(a_new, {
							duration: a_dur,
							easing	: sO.easing
						});
					} else {
						var new_m = 0;
					}
					a_cfs[opts.dimentions[4]] = new_m;

					if (typeof(opts.items[opts.dimentions[0]]) != 'number' ||
						typeof(opts.items[opts.dimentions[2]]) != 'number'
					) {
						$wrp.stop().animate(w_siz, {
							duration: a_dur,
							easing	: sO.easing
						});
					}
					$cfs.data('cfs_numItems', nI)
						.data('cfs_slideObj', sO)
						.data('cfs_oldItems', c_itm[1])
						.data('cfs_newItems', c_itm[0])
						.data('cfs_wrapSize', w_siz)
						.css(opts.dimentions[4], -i_siz[0])
						.animate(a_cfs, {
							duration: a_dur,
							easing	: sO.easing,
							complete: function() {
								if ($cfs.data('cfs_slideObj').onAfter) {
									$cfs.data('cfs_slideObj').onAfter($cfs.data('cfs_oldItems'), $cfs.data('cfs_newItems'), $cfs.data('cfs_wrapSize'));
								}
								if (totalItems < opts.items.visible + $cfs.data('cfs_numItems')) {
									getItems($cfs, ':gt('+(totalItems-1)+')').remove();
								}
								var l_itm = getItems($cfs, ':nth('+(opts.items.visible+$cfs.data('cfs_numItems')-1)+')');
								if (opts.usePadding) {
									l_itm.css(opts.dimentions[6], l_itm.data('cfs_origCssMargin'));
								}
							}
						});
					$cfs.trigger('updatePageStatus').trigger('play', ['', a_dur]);
				})
				.bind('next', function(e, sO, nI) {
					if ($cfs.is(':animated')) return false;
					if (opts.items.minimum >= totalItems) {
						log('Not enough items: not scrolling');
						return false;
					}
					if (typeof(sO) == 'number') nI = sO;
					if (typeof(sO) != 'object') sO = opts.next;
					if (typeof(nI) != 'number') nI = sO.items;
					if (typeof(nI) != 'number') {
						log('Not a valid number: not scrolling');
						return false;
					}

					if (!opts.circular) {
						if (firstItem == 0) {
							if (nI > totalItems - opts.items.visible) {
								nI = totalItems - opts.items.visible;
							}
						} else {
							if (firstItem - nI < opts.items.visible) {
								nI = firstItem - opts.items.visible;
							}
						}
					}

					firstItem -= nI;
					if (firstItem < 0) firstItem += totalItems;

					if (!opts.circular && !opts.infinite) {
						if (firstItem == opts.items.visible &&
							opts.next.button) opts.next.button.addClass('disabled');
						if (opts.prev.button) opts.prev.button.removeClass('disabled');
					}
					if (nI == 0) {
						if (opts.infinite) $cfs.trigger('prev', totalItems-opts.items.visible);
						return false;
					}

					if (totalItems < opts.items.visible + nI) getItems($cfs, ':lt('+((opts.items.visible+nI)-totalItems)+')').clone(true).appendTo($cfs);

					var c_itm = getCurrentItems($cfs, opts, nI),
						l_cur = getItems($cfs, ':nth('+(nI-1)+')'),
						l_old = c_itm[0].filter(':last'),
						l_new = c_itm[1].filter(':last');

					if (opts.usePadding) {
						l_old.css(opts.dimentions[6], l_old.data('cfs_origCssMargin'));
						l_new.css(opts.dimentions[6], l_new.data('cfs_origCssMargin'));
					}

					var i_siz = getSizes(opts, getItems($cfs, ':lt('+nI+')')),
						w_siz = mapWrapperSizes(getSizes(opts, c_itm[1], true), opts);

					if (opts.usePadding) {
						l_old.css(opts.dimentions[6], l_old.data('cfs_origCssMargin') + opts.padding[1]);
						l_new.css(opts.dimentions[6], l_new.data('cfs_origCssMargin') + opts.padding[1]);
					}

					var a_cfs = {},
						a_old = {},
						a_cur = {},
						a_dur = sO.duration;

						 if (a_dur == 'auto')	a_dur = opts.scroll.duration / opts.scroll.items * nI;
					else if (a_dur <= 0)		a_dur = 0;
					else if (a_dur < 10)		a_dur = i_siz[0] / a_dur;

					if (sO.onBefore) sO.onBefore(c_itm[0], c_itm[1], w_siz, a_dur);

					a_cfs[opts.dimentions[4]] = -i_siz[0];
					
					if (opts.usePadding) {
						a_old[opts.dimentions[6]] = l_old.data('cfs_origCssMargin');
						a_cur[opts.dimentions[6]] = l_cur.data('cfs_origCssMargin') + opts.padding[3];
						l_new.css(opts.dimentions[6], l_new.data('cfs_origCssMargin') + opts.padding[1]);

						l_old.stop().animate(a_old, {
							duration: a_dur,
							easing	: sO.easing
						});
						l_cur.stop().animate(a_cur, {
							duration: a_dur,
							easing	: sO.easing
						});
					}

					if (typeof(opts.items[opts.dimentions[0]]) != 'number' ||
						typeof(opts.items[opts.dimentions[2]]) != 'number'
					) {
						$wrp.stop().animate(w_siz, {
							duration: a_dur,
							easing	: sO.easing
						});
					}
					$cfs.data('cfs_numItems', nI)
						.data('cfs_slideObj', sO)
						.data('cfs_oldItems', c_itm[0])
						.data('cfs_newItems', c_itm[1])
						.data('cfs_wrapSize', w_siz)
						.animate(a_cfs, {
							duration: a_dur,
							easing	: sO.easing,
							complete: function() {
								if ($cfs.data('cfs_slideObj').onAfter) {
									$cfs.data('cfs_slideObj').onAfter($cfs.data('cfs_oldItems'), $cfs.data('cfs_newItems'), $cfs.data('cfs_wrapSize'));
								}
								if (totalItems < opts.items.visible+$cfs.data('cfs_numItems')) {
									getItems($cfs, ':gt('+(totalItems-1)+')').remove();
								}
								var org_m = (opts.usePadding) ? opts.padding[3] : 0;
								$cfs.css(opts.dimentions[4], org_m);
								
								var l_itm = getItems($cfs, ':lt('+$cfs.data('cfs_numItems')+')').appendTo($cfs).filter(':last');
								if (opts.usePadding) {
									l_itm.css(opts.dimentions[6], l_itm.data('cfs_origCssMargin'));
								}
							}
						});
					$cfs.trigger('updatePageStatus').trigger('play', ['', a_dur]);
				})
				.bind('slideTo', function(e, num, dev, org, obj) {
					if ($cfs.is(':animated')) return false;

					num = getItemIndex(num, dev, org, firstItem, totalItems, $cfs);
					if (num == 0) return false;
					if (typeof(obj) != 'object') obj = false;

					if (opts.circular) {
						if (num < totalItems / 2) 	$cfs.trigger('next', [obj, num]);
						else 						$cfs.trigger('prev', [obj, totalItems-num]);
					} else {
						if (firstItem == 0 ||
							firstItem > num)		$cfs.trigger('next', [obj, num]);
						else						$cfs.trigger('prev', [obj, totalItems-num]);
					}
				})
				.bind('insertItem', function(e, itm, num, org, dev) {
					if (typeof(itm) == 'object' && typeof(itm.jquery) == 'undefined') itm = $(itm);
					if (typeof(itm) == 'string') itm = $(itm);
					if (typeof(itm) != 'object' || 
						typeof(itm.jquery) == 'undefined' || 
						itm.length == 0
					) {
						log('Not a valid object.');
						return false;
					}
					if (typeof(num) == 'undefined' || num == 'end') {
						$cfs.append(itm);
					} else {
							num = getItemIndex(num, dev, org, firstItem, totalItems, $cfs);
						var $cit = getItems($cfs, ':nth('+num+')');

						if ($cit.length) {
							if (num <= firstItem) firstItem += itm.length;
							$cit.before(itm);
						} else {
							$cfs.append(itm);
						}
					}
					totalItems = getItems($cfs).length;
					setSizes($cfs, opts);
					$cfs.trigger('updatePageStatus', true);
				})
				.bind('removeItem', function(e, num, org, dev) {
					if (typeof(num) == 'undefined' || num == 'end') {
						getItems($cfs, ':last').remove();
					} else {
							num = getItemIndex(num, dev, org, firstItem, totalItems, $cfs);
						var $cit = getItems($cfs, ':nth('+num+')');
						if ($cit.length){
							if (num < firstItem) firstItem -= $cit.length;
							$cit.remove();
						}
					}
					totalItems = getItems($cfs).length;
					setSizes($cfs, opts);
					$cfs.trigger('updatePageStatus', true);
				})
				.bind('updatePageStatus', function(e, bpa) {
					if (!opts.pagination.container) return false;
					if (typeof(bpa) == 'boolean' && bpa) {
						getItems(opts.pagination.container).remove();
						for (var a = 0; a < Math.ceil(totalItems/opts.items.visible); a++) {
							opts.pagination.container.append(opts.pagination.anchorBuilder(a+1));
						}
						getItems(opts.pagination.container).unbind('click').each(function(a) {
							$(this).click(function(e) {
								$cfs.trigger('slideTo', [a * opts.items.visible, 0, true, opts.pagination]);
								e.preventDefault();
							});
						});
					}
					var nr = (firstItem == 0) ? 0 : Math.round((totalItems-firstItem)/opts.items.visible);
					getItems(opts.pagination.container).removeClass('selected').filter(':nth('+nr+')').addClass('selected');
				});

			if (opts.useScrollTo) {
				$cfs.bind('scrollTo', function(e, a, b, c, d) {
					$cfs.trigger('slideTo', [a, b, c, d]);
				});
			}
		};	//	/bind_events

		this.bind_buttons = function() {
			if (opts.auto.pauseOnHover && opts.auto.play) {
				$wrp.hover(
					function() { $cfs.trigger('pause'); },
					function() { $cfs.trigger('play');	}
				);
			}
			if (opts.prev.button) {
				opts.prev.button.click(function(e) {
					$cfs.trigger('prev');
					e.preventDefault();
				});
				if (opts.prev.pauseOnHover && opts.auto.play) {
					opts.prev.button.hover(
						function() { $cfs.trigger('pause');	},
						function() { $cfs.trigger('play');	}
					);
				}
				if (!opts.circular && !opts.infinite) {
					opts.prev.button.addClass('disabled');
				}
			}
			if (opts.next.button) {
				opts.next.button.click(function(e) {
					$cfs.trigger('next');
					e.preventDefault();
				});
				if (opts.next.pauseOnHover && opts.auto.play) {
					opts.next.button.hover(
						function() { $cfs.trigger('pause');	},
						function() { $cfs.trigger('play');	}
					)
				}
			}
			if (opts.pagination.container) {
				$cfs.trigger('updatePageStatus', true);
				if (opts.pagination.pauseOnHover && opts.auto.play) {
					opts.pagination.container.hover(
						function() { $cfs.trigger('pause');	},
						function() { $cfs.trigger('play');	}
					);
				}
			}
			if (opts.next.key || opts.prev.key) {
				$(document).keyup(function(e) {
					var k = e.keyCode;
					if (k == opts.next.key)	$cfs.trigger('next');
					if (k == opts.prev.key)	$cfs.trigger('prev');
				});
			}
			if (opts.pagination.keys) {
				$(document).keyup(function(e) {
					var k = e.keyCode;
					if (k >= 49 && k < 58) {
						k = (k-49) * opts.items.visible;
						if (k <= totalItems) {
							$cfs.trigger('slideTo', [k, 0, true, opts.pagination]);
						}
					}
				});
			}
			if (opts.auto.play) {
				$cfs.trigger('play', [direction, opts.auto.delay]);
				if ($.fn.nap && opts.auto.nap) {
					$cfs.nap('pause','play');
				}
			}
			if (opts.items.start != 0) {
				$cfs.trigger('slideTo', [0, opts.items.start, true, { duration: 0 }]);
			}
		};	//	/bind_buttons

		this.destroy = function() {
			$cfs.css($cfs.data('cfs_origCss'))
				.unbind('pause')
				.unbind('play')
				.unbind('prev')
				.unbind('next')
				.unbind('scrollTo')
				.unbind('slideTo')
				.unbind('insertItem')
				.unbind('removeItem')
				.unbind('updatePageStatus');

			$wrp.replaceWith($cfs);
			return this;
		};	//	/destroy

		this.configuration = function(a, b) {
			if (typeof(a) == 'undefined')	return opts;
			if (typeof(b) == 'undefined') 	return eval('opts.'+a);

			eval('opts.'+a+' = b');
			this.init(opts);
			setSizes($cfs, opts);
			return this;
		};	//	/configuration

		var $cfs 			= $(this),
			$wrp			= $(this).wrap('<div class="caroufredsel_wrapper" />').parent(),
			opts 			= {},
			totalItems		= getItems($cfs).length,
			firstItem 		= 0,
			autoInterval	= null,
			direction		= 'next';

		this.init(o);
		this.build();
		this.bind_events();
		this.bind_buttons();
		setSizes($cfs, opts);

		return this;
	};

	//	public
	$.fn.carouFredSel.defaults = {
		infinite	: true,
		circular	: true,
		direction	: 'left',
		padding		: 0,
		useScrollTo	: true,
		items		: {
			visible		: 5,
			start		: 0
		},
		scroll		: {
			easing		: 'swing',
			pauseOnHover: false
		}
	};
	$.fn.carouFredSel.pageAnchorBuilder = function(nr) {
		return '<a href="#"><span>'+nr+'</span></a>';
	};

	//	private
	function getKeyCode(k) {
		if (k == 'right')	return 39;
		if (k == 'left')	return 37;
		if (k == 'up')		return 38;
		if (k == 'down')	return 40;
		return -1
	};
	function getNaviObject(obj, pagi, auto) {
		if (typeof(pagi) != 'boolean') pagi = false;
		if (typeof(auto) != 'boolean') auto = false;

		if (typeof(obj) == 'undefined')	obj = {};
		if (typeof(obj) == 'string') {
			var temp = getKeyCode(obj);
			if (temp == -1) 			obj = $(obj);
			else 						obj = temp;
		}
		if (pagi) {
			if (typeof(obj.jquery) 		!= 'undefined')	obj = { container: obj };
			if (typeof(obj) 			== 'boolean')	obj = { keys: obj };
			if (typeof(obj.container) 	== 'string')	obj.container = $(obj.container);

		} else if (auto) {
			if (typeof(obj) == 'boolean')				obj = { play: obj };
			if (typeof(obj) == 'number')				obj = { pauseDuration: obj };

		} else {
			if (typeof(obj.jquery)	!= 'undefined')		obj = { button: obj };
			if (typeof(obj) 		== 'number')		obj = { key: obj };
			if (typeof(obj.button)	== 'string')		obj.button = $(obj.button);
			if (typeof(obj.key)		== 'string')		obj.key = getKeyCode(obj.key);
		}
		return obj;
	};
	function getItems(a, f) {
		if (typeof(f) != 'string') f = '';
		return $('> *:not(.caroufredsel_spacer)'+f, a);
	};
	function getCurrentItems(c, o, n) {
		var oi = getItems(c, ':lt('+o.items.visible+')'),
			ni = getItems(c, ':lt('+(o.items.visible+n)+'):gt('+(n-1)+')');
		return[oi, ni];
	};
	function getItemIndex(num, dev, org, firstItem, totalItems, $cfs) {
		if (typeof(num) == 'string') {
			if (isNaN(num)) num = $(num);
			else 			num = parseInt(num);
		}
		if (typeof(num) == 'object') {
			if (typeof(num.jquery) == 'undefined') num = $(num);
			num = getItems($cfs).index(num);
			if (typeof(org) != 'boolean') org = false;
		} else {
			if (typeof(org) != 'boolean') org = true;
		}
		if (isNaN(num))	num = 0;
		else 			num = parseInt(num);
		if (isNaN(dev))	dev = 0;
		else 			dev = parseInt(dev);

		if (org) {
			num += firstItem;
			if (num >= totalItems)	num -= totalItems;
		}
		num += dev;
		if (num >= totalItems)		num -= totalItems;
		if (num < 0)				num += totalItems;
		return num;
	};
	function getSizes(o, $i, wrap) {
		if (typeof(wrap) != 'boolean') wrap = false;
		var di = o.dimentions,
			s1 = 0,
			s2 = 0;

			 if (wrap && typeof(o[di[0]]) 		== 'number') 	s1 += o[di[0]];
		else if (		 typeof(o.items[di[0]]) == 'number') 	s1 += o.items[di[0]] * $i.length;
		else {
			$i.each(function() { 
				s1 += $(this)[di[1]](true);
			});
		}

			 if (wrap && typeof(o[di[2]]) 		== 'number') 	s2 += o[di[2]];
		else if (		 typeof(o.items[di[2]]) == 'number') 	s2 += o.items[di[2]];
		else {
			$i.each(function() {
				var m = $(this)[di[3]](true);
				if (s2 < m) s2 = m;
			});
		}
		return [s1, s2];
	};
	function mapWrapperSizes(ws, o) {
		var pad = (o.usePadding) ? o.padding : [0, 0, 0, 0];
		var wra = {};
			wra[o.dimentions[0]] = ws[0] + pad[1] + pad[3];
			wra[o.dimentions[2]] = ws[1] + pad[0] + pad[2];
		return wra;
	};
	function setSizes($c, o) {
		var $w = $c.parent(),
			$i = getItems($c),
			$l = $i.filter(':nth('+(o.items.visible-1)+')'),
			is = getSizes(o, $i);

		$w.css(mapWrapperSizes(getSizes(o, $i.filter(':lt('+o.items.visible+')'), true), o));
		if (o.usePadding) {
			$l.css(o.dimentions[6], $l.data('cfs_origCssMargin') + o.padding[1]);
			$c.css(o.dimentions[5], o.padding[0]);
			$c.css(o.dimentions[4], o.padding[3]);
		}
		$c.css(o.dimentions[0], is[0]*2);
		$c.css(o.dimentions[2], is[1]);
	};
	function getPadding(p) {
			 if (typeof(p) == 'number')	p = [p];
		else if (typeof(p) == 'string')	p = p.split('px').join('').split(' ');

		if (typeof(p) != 'object') {
			log('Not a valid value for padding.');
			p = [0];
		}
		for (i in p) {
			p[i] = parseInt(p[i]);
		}
		switch (p.length) {
			case 0:
				return [0, 0, 0, 0];
			case 1:
				return [p[0], p[0], p[0], p[0]];
			case 2:
				return [p[0], p[1], p[0], p[1]];
			case 3:
				return [p[0], p[1], p[2], p[1]];
			default:
				return p;
		}
	};
	function log(m) {
		if (typeof(m) == 'string') m = 'carouFredSel: ' + m;
		if (window.console && window.console.log) window.console.log(m);
		else try { console.log(m); } catch(err) { }
	};

	$.fn.caroufredsel = function(o) {
		this.carouFredSel(o);
	};

})(jQuery);


/*!
 * jQuery Cycle Plugin (with Transition Definitions)
 * Examples and documentation at: http://jquery.malsup.com/cycle/
 * Copyright (c) 2007-2010 M. Alsup
 * Version: 2.9995 (09-AUG-2011)
 * Dual licensed under the MIT and GPL licenses.
 * http://jquery.malsup.com/license.html
 * Requires: jQuery v1.3.2 or later
 */
;(function($) {

var ver = '2.9995';

// if $.support is not defined (pre jQuery 1.3) add what I need
if ($.support == undefined) {
	$.support = {
		opacity: !($.browser.msie)
	};
}

function debug(s) {
	$.fn.cycle.debug && log(s);
}		
function log() {
	window.console && console.log && console.log('[cycle] ' + Array.prototype.join.call(arguments,' '));
}
$.expr[':'].paused = function(el) {
	return el.cyclePause;
}


// the options arg can be...
//   a number  - indicates an immediate transition should occur to the given slide index
//   a string  - 'pause', 'resume', 'toggle', 'next', 'prev', 'stop', 'destroy' or the name of a transition effect (ie, 'fade', 'zoom', etc)
//   an object - properties to control the slideshow
//
// the arg2 arg can be...
//   the name of an fx (only used in conjunction with a numeric value for 'options')
//   the value true (only used in first arg == 'resume') and indicates
//	 that the resume should occur immediately (not wait for next timeout)

$.fn.cycle = function(options, arg2) {
	var o = { s: this.selector, c: this.context };

	// in 1.3+ we can fix mistakes with the ready state
	if (this.length === 0 && options != 'stop') {
		if (!$.isReady && o.s) {
			log('DOM not ready, queuing slideshow');
			$(function() {
				$(o.s,o.c).cycle(options,arg2);
			});
			return this;
		}
		// is your DOM ready?  http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
		log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
		return this;
	}

	// iterate the matched nodeset
	return this.each(function() {
		var opts = handleArguments(this, options, arg2);
		if (opts === false)
			return;

		opts.updateActivePagerLink = opts.updateActivePagerLink || $.fn.cycle.updateActivePagerLink;
		
		// stop existing slideshow for this container (if there is one)
		if (this.cycleTimeout)
			clearTimeout(this.cycleTimeout);
		this.cycleTimeout = this.cyclePause = 0;

		var $cont = $(this);
		var $slides = opts.slideExpr ? $(opts.slideExpr, this) : $cont.children();
		var els = $slides.get();

		var opts2 = buildOptions($cont, $slides, els, opts, o);
		if (opts2 === false)
			return;

		if (els.length < 2) {
			log('terminating; too few slides: ' + els.length);
			return;
		}

		var startTime = opts2.continuous ? 10 : getTimeout(els[opts2.currSlide], els[opts2.nextSlide], opts2, !opts2.backwards);

		// if it's an auto slideshow, kick it off
		if (startTime) {
			startTime += (opts2.delay || 0);
			if (startTime < 10)
				startTime = 10;
			debug('first timeout: ' + startTime);
			this.cycleTimeout = setTimeout(function(){go(els,opts2,0,!opts.backwards)}, startTime);
		}
	});
};

function triggerPause(cont, byHover, onPager) {
	var opts = $(cont).data('cycle.opts');
	var paused = !!cont.cyclePause;
	if (paused && opts.paused)
		opts.paused(cont, opts, byHover, onPager);
	else if (!paused && opts.resumed)
		opts.resumed(cont, opts, byHover, onPager);
}

// process the args that were passed to the plugin fn
function handleArguments(cont, options, arg2) {
	if (cont.cycleStop == undefined)
		cont.cycleStop = 0;
	if (options === undefined || options === null)
		options = {};
	if (options.constructor == String) {
		switch(options) {
		case 'destroy':
		case 'stop':
			var opts = $(cont).data('cycle.opts');
			if (!opts)
				return false;
			cont.cycleStop++; // callbacks look for change
			if (cont.cycleTimeout)
				clearTimeout(cont.cycleTimeout);
			cont.cycleTimeout = 0;
			opts.elements && $(opts.elements).stop();
			$(cont).removeData('cycle.opts');
			if (options == 'destroy')
				destroy(opts);
			return false;
		case 'toggle':
			cont.cyclePause = (cont.cyclePause === 1) ? 0 : 1;
			checkInstantResume(cont.cyclePause, arg2, cont);
			triggerPause(cont);
			return false;
		case 'pause':
			cont.cyclePause = 1;
			triggerPause(cont);
			return false;
		case 'resume':
			cont.cyclePause = 0;
			checkInstantResume(false, arg2, cont);
			triggerPause(cont);
			return false;
		case 'prev':
		case 'next':
			var opts = $(cont).data('cycle.opts');
			if (!opts) {
				log('options not found, "prev/next" ignored');
				return false;
			}
			$.fn.cycle[options](opts);
			return false;
		default:
			options = { fx: options };
		};
		return options;
	}
	else if (options.constructor == Number) {
		// go to the requested slide
		var num = options;
		options = $(cont).data('cycle.opts');
		if (!options) {
			log('options not found, can not advance slide');
			return false;
		}
		if (num < 0 || num >= options.elements.length) {
			log('invalid slide index: ' + num);
			return false;
		}
		options.nextSlide = num;
		if (cont.cycleTimeout) {
			clearTimeout(cont.cycleTimeout);
			cont.cycleTimeout = 0;
		}
		if (typeof arg2 == 'string')
			options.oneTimeFx = arg2;
		go(options.elements, options, 1, num >= options.currSlide);
		return false;
	}
	return options;
	
	function checkInstantResume(isPaused, arg2, cont) {
		if (!isPaused && arg2 === true) { // resume now!
			var options = $(cont).data('cycle.opts');
			if (!options) {
				log('options not found, can not resume');
				return false;
			}
			if (cont.cycleTimeout) {
				clearTimeout(cont.cycleTimeout);
				cont.cycleTimeout = 0;
			}
			go(options.elements, options, 1, !options.backwards);
		}
	}
};

function removeFilter(el, opts) {
	if (!$.support.opacity && opts.cleartype && el.style.filter) {
		try { el.style.removeAttribute('filter'); }
		catch(smother) {} // handle old opera versions
	}
};

// unbind event handlers
function destroy(opts) {
	if (opts.next)
		$(opts.next).unbind(opts.prevNextEvent);
	if (opts.prev)
		$(opts.prev).unbind(opts.prevNextEvent);
	
	if (opts.pager || opts.pagerAnchorBuilder)
		$.each(opts.pagerAnchors || [], function() {
			this.unbind().remove();
		});
	opts.pagerAnchors = null;
	if (opts.destroy) // callback
		opts.destroy(opts);
};

// one-time initialization
function buildOptions($cont, $slides, els, options, o) {
	// support metadata plugin (v1.0 and v2.0)
	var opts = $.extend({}, $.fn.cycle.defaults, options || {}, $.metadata ? $cont.metadata() : $.meta ? $cont.data() : {});
	var meta = $.isFunction($cont.data) ? $cont.data(opts.metaAttr) : null;
	if (meta)
		opts = $.extend(opts, meta);
	if (opts.autostop)
		opts.countdown = opts.autostopCount || els.length;

	var cont = $cont[0];
	$cont.data('cycle.opts', opts);
	opts.$cont = $cont;
	opts.stopCount = cont.cycleStop;
	opts.elements = els;
	opts.before = opts.before ? [opts.before] : [];
	opts.after = opts.after ? [opts.after] : [];

	// push some after callbacks
	if (!$.support.opacity && opts.cleartype)
		opts.after.push(function() { removeFilter(this, opts); });
	if (opts.continuous)
		opts.after.push(function() { go(els,opts,0,!opts.backwards); });

	saveOriginalOpts(opts);

	// clearType corrections
	if (!$.support.opacity && opts.cleartype && !opts.cleartypeNoBg)
		clearTypeFix($slides);

	// container requires non-static position so that slides can be position within
	if ($cont.css('position') == 'static')
		$cont.css('position', 'relative');
	if (opts.width)
		$cont.width(opts.width);
	if (opts.height && opts.height != 'auto')
		$cont.height(opts.height);

	if (opts.startingSlide)
		opts.startingSlide = parseInt(opts.startingSlide,10);
	else if (opts.backwards)
		opts.startingSlide = els.length - 1;

	// if random, mix up the slide array
	if (opts.random) {
		opts.randomMap = [];
		for (var i = 0; i < els.length; i++)
			opts.randomMap.push(i);
		opts.randomMap.sort(function(a,b) {return Math.random() - 0.5;});
		opts.randomIndex = 1;
		opts.startingSlide = opts.randomMap[1];
	}
	else if (opts.startingSlide >= els.length)
		opts.startingSlide = 0; // catch bogus input
	opts.currSlide = opts.startingSlide || 0;
	var first = opts.startingSlide;

	// set position and zIndex on all the slides
	$slides.css({position: 'absolute', top:0, left:0}).hide().each(function(i) {
		var z;
		if (opts.backwards)
			z = first ? i <= first ? els.length + (i-first) : first-i : els.length-i;
		else
			z = first ? i >= first ? els.length - (i-first) : first-i : els.length-i;
		$(this).css('z-index', z)
	});

	// make sure first slide is visible
	$(els[first]).css('opacity',1).show(); // opacity bit needed to handle restart use case
	removeFilter(els[first], opts);

	// stretch slides
	if (opts.fit) {
		if (!opts.aspect) {
	        if (opts.width)
	            $slides.width(opts.width);
	        if (opts.height && opts.height != 'auto')
	            $slides.height(opts.height);
		} else {
			$slides.each(function(){
				var $slide = $(this);
				var ratio = (opts.aspect === true) ? $slide.width()/$slide.height() : opts.aspect;
				if( opts.width && $slide.width() != opts.width ) {
					$slide.width( opts.width );
					$slide.height( opts.width / ratio );
				}

				if( opts.height && $slide.height() < opts.height ) {
					$slide.height( opts.height );
					$slide.width( opts.height * ratio );
				}
			});
		}
	}

	if (opts.center && ((!opts.fit) || opts.aspect)) {
		$slides.each(function(){
			var $slide = $(this);
			$slide.css({
				"margin-left": opts.width ?
					((opts.width - $slide.width()) / 2) + "px" :
					0,
				"margin-top": opts.height ?
					((opts.height - $slide.height()) / 2) + "px" :
					0
			});
		});
	}

	if (opts.center && !opts.fit && !opts.slideResize) {
	  	$slides.each(function(){
	    	var $slide = $(this);
	    	$slide.css({
	      		"margin-left": opts.width ? ((opts.width - $slide.width()) / 2) + "px" : 0,
	      		"margin-top": opts.height ? ((opts.height - $slide.height()) / 2) + "px" : 0
	    	});
	  	});
	}
		
	// stretch container
	var reshape = opts.containerResize && !$cont.innerHeight();
	if (reshape) { // do this only if container has no size http://tinyurl.com/da2oa9
		var maxw = 0, maxh = 0;
		for(var j=0; j < els.length; j++) {
			var $e = $(els[j]), e = $e[0], w = $e.outerWidth(), h = $e.outerHeight();
			if (!w) w = e.offsetWidth || e.width || $e.attr('width');
			if (!h) h = e.offsetHeight || e.height || $e.attr('height');
			maxw = w > maxw ? w : maxw;
			maxh = h > maxh ? h : maxh;
		}
		if (maxw > 0 && maxh > 0)
			$cont.css({width:maxw+'px',height:maxh+'px'});
	}

	var pauseFlag = false;  // https://github.com/malsup/cycle/issues/44
	if (opts.pause)
		$cont.hover(
			function(){
				pauseFlag = true;
				this.cyclePause++;
				triggerPause(cont, true);
			},
			function(){
				pauseFlag && this.cyclePause--;
				triggerPause(cont, true);
			}
		);

	if (supportMultiTransitions(opts) === false)
		return false;

	// apparently a lot of people use image slideshows without height/width attributes on the images.
	// Cycle 2.50+ requires the sizing info for every slide; this block tries to deal with that.
	var requeue = false;
	options.requeueAttempts = options.requeueAttempts || 0;
	$slides.each(function() {
		// try to get height/width of each slide
		var $el = $(this);
		this.cycleH = (opts.fit && opts.height) ? opts.height : ($el.height() || this.offsetHeight || this.height || $el.attr('height') || 0);
		this.cycleW = (opts.fit && opts.width) ? opts.width : ($el.width() || this.offsetWidth || this.width || $el.attr('width') || 0);

		if ( $el.is('img') ) {
			// sigh..  sniffing, hacking, shrugging...  this crappy hack tries to account for what browsers do when
			// an image is being downloaded and the markup did not include sizing info (height/width attributes);
			// there seems to be some "default" sizes used in this situation
			var loadingIE	= ($.browser.msie  && this.cycleW == 28 && this.cycleH == 30 && !this.complete);
			var loadingFF	= ($.browser.mozilla && this.cycleW == 34 && this.cycleH == 19 && !this.complete);
			var loadingOp	= ($.browser.opera && ((this.cycleW == 42 && this.cycleH == 19) || (this.cycleW == 37 && this.cycleH == 17)) && !this.complete);
			var loadingOther = (this.cycleH == 0 && this.cycleW == 0 && !this.complete);
			// don't requeue for images that are still loading but have a valid size
			if (loadingIE || loadingFF || loadingOp || loadingOther) {
				if (o.s && opts.requeueOnImageNotLoaded && ++options.requeueAttempts < 100) { // track retry count so we don't loop forever
					log(options.requeueAttempts,' - img slide not loaded, requeuing slideshow: ', this.src, this.cycleW, this.cycleH);
					setTimeout(function() {$(o.s,o.c).cycle(options)}, opts.requeueTimeout);
					requeue = true;
					return false; // break each loop
				}
				else {
					log('could not determine size of image: '+this.src, this.cycleW, this.cycleH);
				}
			}
		}
		return true;
	});

	if (requeue)
		return false;

	opts.cssBefore = opts.cssBefore || {};
	opts.cssAfter = opts.cssAfter || {};
	opts.cssFirst = opts.cssFirst || {};
	opts.animIn = opts.animIn || {};
	opts.animOut = opts.animOut || {};

	$slides.not(':eq('+first+')').css(opts.cssBefore);
	$($slides[first]).css(opts.cssFirst);

	if (opts.timeout) {
		opts.timeout = parseInt(opts.timeout,10);
		// ensure that timeout and speed settings are sane
		if (opts.speed.constructor == String)
			opts.speed = $.fx.speeds[opts.speed] || parseInt(opts.speed,10);
		if (!opts.sync)
			opts.speed = opts.speed / 2;
		
		var buffer = opts.fx == 'none' ? 0 : opts.fx == 'shuffle' ? 500 : 250;
		while((opts.timeout - opts.speed) < buffer) // sanitize timeout
			opts.timeout += opts.speed;
	}
	if (opts.easing)
		opts.easeIn = opts.easeOut = opts.easing;
	if (!opts.speedIn)
		opts.speedIn = opts.speed;
	if (!opts.speedOut)
		opts.speedOut = opts.speed;

	opts.slideCount = els.length;
	opts.currSlide = opts.lastSlide = first;
	if (opts.random) {
		if (++opts.randomIndex == els.length)
			opts.randomIndex = 0;
		opts.nextSlide = opts.randomMap[opts.randomIndex];
	}
	else if (opts.backwards)
		opts.nextSlide = opts.startingSlide == 0 ? (els.length-1) : opts.startingSlide-1;
	else
		opts.nextSlide = opts.startingSlide >= (els.length-1) ? 0 : opts.startingSlide+1;

	// run transition init fn
	if (!opts.multiFx) {
		var init = $.fn.cycle.transitions[opts.fx];
		if ($.isFunction(init))
			init($cont, $slides, opts);
		else if (opts.fx != 'custom' && !opts.multiFx) {
			log('unknown transition: ' + opts.fx,'; slideshow terminating');
			return false;
		}
	}

	// fire artificial events
	var e0 = $slides[first];
	if (!opts.skipInitializationCallbacks) {
		if (opts.before.length)
			opts.before[0].apply(e0, [e0, e0, opts, true]);
		if (opts.after.length)
			opts.after[0].apply(e0, [e0, e0, opts, true]);
	}
	if (opts.next)
		$(opts.next).bind(opts.prevNextEvent,function(){return advance(opts,1)});
	if (opts.prev)
		$(opts.prev).bind(opts.prevNextEvent,function(){return advance(opts,0)});
	if (opts.pager || opts.pagerAnchorBuilder)
		buildPager(els,opts);

	exposeAddSlide(opts, els);

	return opts;
};

// save off original opts so we can restore after clearing state
function saveOriginalOpts(opts) {
	opts.original = { before: [], after: [] };
	opts.original.cssBefore = $.extend({}, opts.cssBefore);
	opts.original.cssAfter  = $.extend({}, opts.cssAfter);
	opts.original.animIn	= $.extend({}, opts.animIn);
	opts.original.animOut   = $.extend({}, opts.animOut);
	$.each(opts.before, function() { opts.original.before.push(this); });
	$.each(opts.after,  function() { opts.original.after.push(this); });
};

function supportMultiTransitions(opts) {
	var i, tx, txs = $.fn.cycle.transitions;
	// look for multiple effects
	if (opts.fx.indexOf(',') > 0) {
		opts.multiFx = true;
		opts.fxs = opts.fx.replace(/\s*/g,'').split(',');
		// discard any bogus effect names
		for (i=0; i < opts.fxs.length; i++) {
			var fx = opts.fxs[i];
			tx = txs[fx];
			if (!tx || !txs.hasOwnProperty(fx) || !$.isFunction(tx)) {
				log('discarding unknown transition: ',fx);
				opts.fxs.splice(i,1);
				i--;
			}
		}
		// if we have an empty list then we threw everything away!
		if (!opts.fxs.length) {
			log('No valid transitions named; slideshow terminating.');
			return false;
		}
	}
	else if (opts.fx == 'all') {  // auto-gen the list of transitions
		opts.multiFx = true;
		opts.fxs = [];
		for (p in txs) {
			tx = txs[p];
			if (txs.hasOwnProperty(p) && $.isFunction(tx))
				opts.fxs.push(p);
		}
	}
	if (opts.multiFx && opts.randomizeEffects) {
		// munge the fxs array to make effect selection random
		var r1 = Math.floor(Math.random() * 20) + 30;
		for (i = 0; i < r1; i++) {
			var r2 = Math.floor(Math.random() * opts.fxs.length);
			opts.fxs.push(opts.fxs.splice(r2,1)[0]);
		}
		debug('randomized fx sequence: ',opts.fxs);
	}
	return true;
};

// provide a mechanism for adding slides after the slideshow has started
function exposeAddSlide(opts, els) {
	opts.addSlide = function(newSlide, prepend) {
		var $s = $(newSlide), s = $s[0];
		if (!opts.autostopCount)
			opts.countdown++;
		els[prepend?'unshift':'push'](s);
		if (opts.els)
			opts.els[prepend?'unshift':'push'](s); // shuffle needs this
		opts.slideCount = els.length;

		$s.css('position','absolute');
		$s[prepend?'prependTo':'appendTo'](opts.$cont);

		if (prepend) {
			opts.currSlide++;
			opts.nextSlide++;
		}

		if (!$.support.opacity && opts.cleartype && !opts.cleartypeNoBg)
			clearTypeFix($s);

		if (opts.fit && opts.width)
			$s.width(opts.width);
		if (opts.fit && opts.height && opts.height != 'auto')
			$s.height(opts.height);
		s.cycleH = (opts.fit && opts.height) ? opts.height : $s.height();
		s.cycleW = (opts.fit && opts.width) ? opts.width : $s.width();

		$s.css(opts.cssBefore);

		if (opts.pager || opts.pagerAnchorBuilder)
			$.fn.cycle.createPagerAnchor(els.length-1, s, $(opts.pager), els, opts);

		if ($.isFunction(opts.onAddSlide))
			opts.onAddSlide($s);
		else
			$s.hide(); // default behavior
	};
}

// reset internal state; we do this on every pass in order to support multiple effects
$.fn.cycle.resetState = function(opts, fx) {
	fx = fx || opts.fx;
	opts.before = []; opts.after = [];
	opts.cssBefore = $.extend({}, opts.original.cssBefore);
	opts.cssAfter  = $.extend({}, opts.original.cssAfter);
	opts.animIn	= $.extend({}, opts.original.animIn);
	opts.animOut   = $.extend({}, opts.original.animOut);
	opts.fxFn = null;
	$.each(opts.original.before, function() { opts.before.push(this); });
	$.each(opts.original.after,  function() { opts.after.push(this); });

	// re-init
	var init = $.fn.cycle.transitions[fx];
	if ($.isFunction(init))
		init(opts.$cont, $(opts.elements), opts);
};

// this is the main engine fn, it handles the timeouts, callbacks and slide index mgmt
function go(els, opts, manual, fwd) {
	// opts.busy is true if we're in the middle of an animation
	if (manual && opts.busy && opts.manualTrump) {
		// let manual transitions requests trump active ones
		debug('manualTrump in go(), stopping active transition');
		$(els).stop(true,true);
		opts.busy = 0;
	}
	// don't begin another timeout-based transition if there is one active
	if (opts.busy) {
		debug('transition active, ignoring new tx request');
		return;
	}

	var p = opts.$cont[0], curr = els[opts.currSlide], next = els[opts.nextSlide];

	// stop cycling if we have an outstanding stop request
	if (p.cycleStop != opts.stopCount || p.cycleTimeout === 0 && !manual)
		return;

	// check to see if we should stop cycling based on autostop options
	if (!manual && !p.cyclePause && !opts.bounce &&
		((opts.autostop && (--opts.countdown <= 0)) ||
		(opts.nowrap && !opts.random && opts.nextSlide < opts.currSlide))) {
		if (opts.end)
			opts.end(opts);
		return;
	}

	// if slideshow is paused, only transition on a manual trigger
	var changed = false;
	if ((manual || !p.cyclePause) && (opts.nextSlide != opts.currSlide)) {
		changed = true;
		var fx = opts.fx;
		// keep trying to get the slide size if we don't have it yet
		curr.cycleH = curr.cycleH || $(curr).height();
		curr.cycleW = curr.cycleW || $(curr).width();
		next.cycleH = next.cycleH || $(next).height();
		next.cycleW = next.cycleW || $(next).width();

		// support multiple transition types
		if (opts.multiFx) {
			if (fwd && (opts.lastFx == undefined || ++opts.lastFx >= opts.fxs.length))
				opts.lastFx = 0;
			else if (!fwd && (opts.lastFx == undefined || --opts.lastFx < 0))
				opts.lastFx = opts.fxs.length - 1;
			fx = opts.fxs[opts.lastFx];
		}

		// one-time fx overrides apply to:  $('div').cycle(3,'zoom');
		if (opts.oneTimeFx) {
			fx = opts.oneTimeFx;
			opts.oneTimeFx = null;
		}

		$.fn.cycle.resetState(opts, fx);

		// run the before callbacks
		if (opts.before.length)
			$.each(opts.before, function(i,o) {
				if (p.cycleStop != opts.stopCount) return;
				o.apply(next, [curr, next, opts, fwd]);
			});

		// stage the after callacks
		var after = function() {
			opts.busy = 0;
			$.each(opts.after, function(i,o) {
				if (p.cycleStop != opts.stopCount) return;
				o.apply(next, [curr, next, opts, fwd]);
			});
		};

		debug('tx firing('+fx+'); currSlide: ' + opts.currSlide + '; nextSlide: ' + opts.nextSlide);
		
		// get ready to perform the transition
		opts.busy = 1;
		if (opts.fxFn) // fx function provided?
			opts.fxFn(curr, next, opts, after, fwd, manual && opts.fastOnEvent);
		else if ($.isFunction($.fn.cycle[opts.fx])) // fx plugin ?
			$.fn.cycle[opts.fx](curr, next, opts, after, fwd, manual && opts.fastOnEvent);
		else
			$.fn.cycle.custom(curr, next, opts, after, fwd, manual && opts.fastOnEvent);
	}

	if (changed || opts.nextSlide == opts.currSlide) {
		// calculate the next slide
		opts.lastSlide = opts.currSlide;
		if (opts.random) {
			opts.currSlide = opts.nextSlide;
			if (++opts.randomIndex == els.length)
				opts.randomIndex = 0;
			opts.nextSlide = opts.randomMap[opts.randomIndex];
			if (opts.nextSlide == opts.currSlide)
				opts.nextSlide = (opts.currSlide == opts.slideCount - 1) ? 0 : opts.currSlide + 1;
		}
		else if (opts.backwards) {
			var roll = (opts.nextSlide - 1) < 0;
			if (roll && opts.bounce) {
				opts.backwards = !opts.backwards;
				opts.nextSlide = 1;
				opts.currSlide = 0;
			}
			else {
				opts.nextSlide = roll ? (els.length-1) : opts.nextSlide-1;
				opts.currSlide = roll ? 0 : opts.nextSlide+1;
			}
		}
		else { // sequence
			var roll = (opts.nextSlide + 1) == els.length;
			if (roll && opts.bounce) {
				opts.backwards = !opts.backwards;
				opts.nextSlide = els.length-2;
				opts.currSlide = els.length-1;
			}
			else {
				opts.nextSlide = roll ? 0 : opts.nextSlide+1;
				opts.currSlide = roll ? els.length-1 : opts.nextSlide-1;
			}
		}
	}
	if (changed && opts.pager)
		opts.updateActivePagerLink(opts.pager, opts.currSlide, opts.activePagerClass);
	
	// stage the next transition
	var ms = 0;
	if (opts.timeout && !opts.continuous)
		ms = getTimeout(els[opts.currSlide], els[opts.nextSlide], opts, fwd);
	else if (opts.continuous && p.cyclePause) // continuous shows work off an after callback, not this timer logic
		ms = 10;
	if (ms > 0)
		p.cycleTimeout = setTimeout(function(){ go(els, opts, 0, !opts.backwards) }, ms);
};

// invoked after transition
$.fn.cycle.updateActivePagerLink = function(pager, currSlide, clsName) {
   $(pager).each(function() {
       $(this).children().removeClass(clsName).eq(currSlide).addClass(clsName);
   });
};

// calculate timeout value for current transition
function getTimeout(curr, next, opts, fwd) {
	if (opts.timeoutFn) {
		// call user provided calc fn
		var t = opts.timeoutFn.call(curr,curr,next,opts,fwd);
		while (opts.fx != 'none' && (t - opts.speed) < 250) // sanitize timeout
			t += opts.speed;
		debug('calculated timeout: ' + t + '; speed: ' + opts.speed);
		if (t !== false)
			return t;
	}
	return opts.timeout;
};

// expose next/prev function, caller must pass in state
$.fn.cycle.next = function(opts) { advance(opts,1); };
$.fn.cycle.prev = function(opts) { advance(opts,0);};

// advance slide forward or back
function advance(opts, moveForward) {
	var val = moveForward ? 1 : -1;
	var els = opts.elements;
	var p = opts.$cont[0], timeout = p.cycleTimeout;
	if (timeout) {
		clearTimeout(timeout);
		p.cycleTimeout = 0;
	}
	if (opts.random && val < 0) {
		// move back to the previously display slide
		opts.randomIndex--;
		if (--opts.randomIndex == -2)
			opts.randomIndex = els.length-2;
		else if (opts.randomIndex == -1)
			opts.randomIndex = els.length-1;
		opts.nextSlide = opts.randomMap[opts.randomIndex];
	}
	else if (opts.random) {
		opts.nextSlide = opts.randomMap[opts.randomIndex];
	}
	else {
		opts.nextSlide = opts.currSlide + val;
		if (opts.nextSlide < 0) {
			if (opts.nowrap) return false;
			opts.nextSlide = els.length - 1;
		}
		else if (opts.nextSlide >= els.length) {
			if (opts.nowrap) return false;
			opts.nextSlide = 0;
		}
	}

	var cb = opts.onPrevNextEvent || opts.prevNextClick; // prevNextClick is deprecated
	if ($.isFunction(cb))
		cb(val > 0, opts.nextSlide, els[opts.nextSlide]);
	go(els, opts, 1, moveForward);
	return false;
};

function buildPager(els, opts) {
	var $p = $(opts.pager);
	$.each(els, function(i,o) {
		$.fn.cycle.createPagerAnchor(i,o,$p,els,opts);
	});
	opts.updateActivePagerLink(opts.pager, opts.startingSlide, opts.activePagerClass);
};

$.fn.cycle.createPagerAnchor = function(i, el, $p, els, opts) {
	var a;
	if ($.isFunction(opts.pagerAnchorBuilder)) {
		a = opts.pagerAnchorBuilder(i,el);
		debug('pagerAnchorBuilder('+i+', el) returned: ' + a);
	}
	else
		a = '<a href="#">'+(i+1)+'</a>';
		
	if (!a)
		return;
	var $a = $(a);
	// don't reparent if anchor is in the dom
	if ($a.parents('body').length === 0) {
		var arr = [];
		if ($p.length > 1) {
			$p.each(function() {
				var $clone = $a.clone(true);
				$(this).append($clone);
				arr.push($clone[0]);
			});
			$a = $(arr);
		}
		else {
			$a.appendTo($p);
		}
	}

	opts.pagerAnchors =  opts.pagerAnchors || [];
	opts.pagerAnchors.push($a);
	
	var pagerFn = function(e) {
		e.preventDefault();
		opts.nextSlide = i;
		var p = opts.$cont[0], timeout = p.cycleTimeout;
		if (timeout) {
			clearTimeout(timeout);
			p.cycleTimeout = 0;
		}
		var cb = opts.onPagerEvent || opts.pagerClick; // pagerClick is deprecated
		if ($.isFunction(cb))
			cb(opts.nextSlide, els[opts.nextSlide]);
		go(els,opts,1,opts.currSlide < i); // trigger the trans
//		return false; // <== allow bubble
	}
	
	if ( /mouseenter|mouseover/i.test(opts.pagerEvent) ) {
		$a.hover(pagerFn, function(){/* no-op */} );
	}
	else {
		$a.bind(opts.pagerEvent, pagerFn);
	}
	
	if ( ! /^click/.test(opts.pagerEvent) && !opts.allowPagerClickBubble)
		$a.bind('click.cycle', function(){return false;}); // suppress click
	
	var cont = opts.$cont[0];
	var pauseFlag = false; // https://github.com/malsup/cycle/issues/44
	if (opts.pauseOnPagerHover) {
		$a.hover(
			function() { 
				pauseFlag = true;
				cont.cyclePause++; 
				triggerPause(cont,true,true);
			}, function() { 
				pauseFlag && cont.cyclePause--; 
				triggerPause(cont,true,true);
			} 
		);
	}
};

// helper fn to calculate the number of slides between the current and the next
$.fn.cycle.hopsFromLast = function(opts, fwd) {
	var hops, l = opts.lastSlide, c = opts.currSlide;
	if (fwd)
		hops = c > l ? c - l : opts.slideCount - l;
	else
		hops = c < l ? l - c : l + opts.slideCount - c;
	return hops;
};

// fix clearType problems in ie6 by setting an explicit bg color
// (otherwise text slides look horrible during a fade transition)
function clearTypeFix($slides) {
	debug('applying clearType background-color hack');
	function hex(s) {
		s = parseInt(s,10).toString(16);
		return s.length < 2 ? '0'+s : s;
	};
	function getBg(e) {
		for ( ; e && e.nodeName.toLowerCase() != 'html'; e = e.parentNode) {
			var v = $.css(e,'background-color');
			if (v && v.indexOf('rgb') >= 0 ) {
				var rgb = v.match(/\d+/g);
				return '#'+ hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
			}
			if (v && v != 'transparent')
				return v;
		}
		return '#ffffff';
	};
	$slides.each(function() { $(this).css('background-color', getBg(this)); });
};

// reset common props before the next transition
$.fn.cycle.commonReset = function(curr,next,opts,w,h,rev) {
	$(opts.elements).not(curr).hide();
	if (typeof opts.cssBefore.opacity == 'undefined')
		opts.cssBefore.opacity = 1;
	opts.cssBefore.display = 'block';
	if (opts.slideResize && w !== false && next.cycleW > 0)
		opts.cssBefore.width = next.cycleW;
	if (opts.slideResize && h !== false && next.cycleH > 0)
		opts.cssBefore.height = next.cycleH;
	opts.cssAfter = opts.cssAfter || {};
	opts.cssAfter.display = 'none';
	$(curr).css('zIndex',opts.slideCount + (rev === true ? 1 : 0));
	$(next).css('zIndex',opts.slideCount + (rev === true ? 0 : 1));
};

// the actual fn for effecting a transition
$.fn.cycle.custom = function(curr, next, opts, cb, fwd, speedOverride) {
	var $l = $(curr), $n = $(next);
	var speedIn = opts.speedIn, speedOut = opts.speedOut, easeIn = opts.easeIn, easeOut = opts.easeOut;
	$n.css(opts.cssBefore);
	if (speedOverride) {
		if (typeof speedOverride == 'number')
			speedIn = speedOut = speedOverride;
		else
			speedIn = speedOut = 1;
		easeIn = easeOut = null;
	}
	var fn = function() {
		$n.animate(opts.animIn, speedIn, easeIn, function() {
			cb();
		});
	};
	$l.animate(opts.animOut, speedOut, easeOut, function() {
		$l.css(opts.cssAfter);
		if (!opts.sync) 
			fn();
	});
	if (opts.sync) fn();
};

// transition definitions - only fade is defined here, transition pack defines the rest
$.fn.cycle.transitions = {
	fade: function($cont, $slides, opts) {
		$slides.not(':eq('+opts.currSlide+')').css('opacity',0);
		opts.before.push(function(curr,next,opts) {
			$.fn.cycle.commonReset(curr,next,opts);
			opts.cssBefore.opacity = 0;
		});
		opts.animIn	   = { opacity: 1 };
		opts.animOut   = { opacity: 0 };
		opts.cssBefore = { top: 0, left: 0 };
	}
};

$.fn.cycle.ver = function() { return ver; };

// override these globally if you like (they are all optional)
$.fn.cycle.defaults = {
	activePagerClass: 'activeSlide', // class name used for the active pager link
	after:		   null,  // transition callback (scope set to element that was shown):  function(currSlideElement, nextSlideElement, options, forwardFlag)
	allowPagerClickBubble: false, // allows or prevents click event on pager anchors from bubbling
	animIn:		   null,  // properties that define how the slide animates in
	animOut:	   null,  // properties that define how the slide animates out
	aspect:		   false,  // preserve aspect ratio during fit resizing, cropping if necessary (must be used with fit option)
	autostop:	   0,	  // true to end slideshow after X transitions (where X == slide count)
	autostopCount: 0,	  // number of transitions (optionally used with autostop to define X)
	backwards:     false, // true to start slideshow at last slide and move backwards through the stack
	before:		   null,  // transition callback (scope set to element to be shown):	 function(currSlideElement, nextSlideElement, options, forwardFlag)
	center: 	   null,  // set to true to have cycle add top/left margin to each slide (use with width and height options)
	cleartype:	   !$.support.opacity,  // true if clearType corrections should be applied (for IE)
	cleartypeNoBg: false, // set to true to disable extra cleartype fixing (leave false to force background color setting on slides)
	containerResize: 1,	  // resize container to fit largest slide
	continuous:	   0,	  // true to start next transition immediately after current one completes
	cssAfter:	   null,  // properties that defined the state of the slide after transitioning out
	cssBefore:	   null,  // properties that define the initial state of the slide before transitioning in
	delay:		   0,	  // additional delay (in ms) for first transition (hint: can be negative)
	easeIn:		   null,  // easing for "in" transition
	easeOut:	   null,  // easing for "out" transition
	easing:		   null,  // easing method for both in and out transitions
	end:		   null,  // callback invoked when the slideshow terminates (use with autostop or nowrap options): function(options)
	fastOnEvent:   0,	  // force fast transitions when triggered manually (via pager or prev/next); value == time in ms
	fit:		   0,	  // force slides to fit container
	fx:			  'fade', // name of transition effect (or comma separated names, ex: 'fade,scrollUp,shuffle')
	fxFn:		   null,  // function used to control the transition: function(currSlideElement, nextSlideElement, options, afterCalback, forwardFlag)
	height:		  'auto', // container height (if the 'fit' option is true, the slides will be set to this height as well)
	manualTrump:   true,  // causes manual transition to stop an active transition instead of being ignored
	metaAttr:     'cycle',// data- attribute that holds the option data for the slideshow
	next:		   null,  // element, jQuery object, or jQuery selector string for the element to use as event trigger for next slide
	nowrap:		   0,	  // true to prevent slideshow from wrapping
	onPagerEvent:  null,  // callback fn for pager events: function(zeroBasedSlideIndex, slideElement)
	onPrevNextEvent: null,// callback fn for prev/next events: function(isNext, zeroBasedSlideIndex, slideElement)
	pager:		   null,  // element, jQuery object, or jQuery selector string for the element to use as pager container
	pagerAnchorBuilder: null, // callback fn for building anchor links:  function(index, DOMelement)
	pagerEvent:	  'click.cycle', // name of event which drives the pager navigation
	pause:		   0,	  // true to enable "pause on hover"
	pauseOnPagerHover: 0, // true to pause when hovering over pager link
	prev:		   null,  // element, jQuery object, or jQuery selector string for the element to use as event trigger for previous slide
	prevNextEvent:'click.cycle',// event which drives the manual transition to the previous or next slide
	random:		   0,	  // true for random, false for sequence (not applicable to shuffle fx)
	randomizeEffects: 1,  // valid when multiple effects are used; true to make the effect sequence random
	requeueOnImageNotLoaded: true, // requeue the slideshow if any image slides are not yet loaded
	requeueTimeout: 250,  // ms delay for requeue
	rev:		   0,	  // causes animations to transition in reverse (for effects that support it such as scrollHorz/scrollVert/shuffle)
	shuffle:	   null,  // coords for shuffle animation, ex: { top:15, left: 200 }
	skipInitializationCallbacks: false, // set to true to disable the first before/after callback that occurs prior to any transition
	slideExpr:	   null,  // expression for selecting slides (if something other than all children is required)
	slideResize:   1,     // force slide width/height to fixed size before every transition
	speed:		   1000,  // speed of the transition (any valid fx speed value)
	speedIn:	   null,  // speed of the 'in' transition
	speedOut:	   null,  // speed of the 'out' transition
	startingSlide: 0,	  // zero-based index of the first slide to be displayed
	sync:		   1,	  // true if in/out transitions should occur simultaneously
	timeout:	   4000,  // milliseconds between slide transitions (0 to disable auto advance)
	timeoutFn:     null,  // callback for determining per-slide timeout value:  function(currSlideElement, nextSlideElement, options, forwardFlag)
	updateActivePagerLink: null, // callback fn invoked to update the active pager link (adds/removes activePagerClass style)
	width:         null   // container width (if the 'fit' option is true, the slides will be set to this width as well)
};

})(jQuery);


/*!
 * jQuery Cycle Plugin Transition Definitions
 * This script is a plugin for the jQuery Cycle Plugin
 * Examples and documentation at: http://malsup.com/jquery/cycle/
 * Copyright (c) 2007-2010 M. Alsup
 * Version:	 2.73
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
(function($) {

//
// These functions define slide initialization and properties for the named
// transitions. To save file size feel free to remove any of these that you
// don't need.
//
$.fn.cycle.transitions.none = function($cont, $slides, opts) {
	opts.fxFn = function(curr,next,opts,after){
		$(next).show();
		$(curr).hide();
		after();
	};
};

// not a cross-fade, fadeout only fades out the top slide
$.fn.cycle.transitions.fadeout = function($cont, $slides, opts) {
	$slides.not(':eq('+opts.currSlide+')').css({ display: 'block', 'opacity': 1 });
	opts.before.push(function(curr,next,opts,w,h,rev) {
		$(curr).css('zIndex',opts.slideCount + (!rev === true ? 1 : 0));
		$(next).css('zIndex',opts.slideCount + (!rev === true ? 0 : 1));
	});
	opts.animIn.opacity = 1;
	opts.animOut.opacity = 0;
	opts.cssBefore.opacity = 1;
	opts.cssBefore.display = 'block';
	opts.cssAfter.zIndex = 0;
};

// scrollUp/Down/Left/Right
$.fn.cycle.transitions.scrollUp = function($cont, $slides, opts) {
	$cont.css('overflow','hidden');
	opts.before.push($.fn.cycle.commonReset);
	var h = $cont.height();
	opts.cssBefore.top = h;
	opts.cssBefore.left = 0;
	opts.cssFirst.top = 0;
	opts.animIn.top = 0;
	opts.animOut.top = -h;
};
$.fn.cycle.transitions.scrollDown = function($cont, $slides, opts) {
	$cont.css('overflow','hidden');
	opts.before.push($.fn.cycle.commonReset);
	var h = $cont.height();
	opts.cssFirst.top = 0;
	opts.cssBefore.top = -h;
	opts.cssBefore.left = 0;
	opts.animIn.top = 0;
	opts.animOut.top = h;
};
$.fn.cycle.transitions.scrollLeft = function($cont, $slides, opts) {
	$cont.css('overflow','hidden');
	opts.before.push($.fn.cycle.commonReset);
	var w = $cont.width();
	opts.cssFirst.left = 0;
	opts.cssBefore.left = w;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
	opts.animOut.left = 0-w;
};
$.fn.cycle.transitions.scrollRight = function($cont, $slides, opts) {
	$cont.css('overflow','hidden');
	opts.before.push($.fn.cycle.commonReset);
	var w = $cont.width();
	opts.cssFirst.left = 0;
	opts.cssBefore.left = -w;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
	opts.animOut.left = w;
};
$.fn.cycle.transitions.scrollHorz = function($cont, $slides, opts) {
	$cont.css('overflow','hidden').width();
	opts.before.push(function(curr, next, opts, fwd) {
		if (opts.rev)
			fwd = !fwd;
		$.fn.cycle.commonReset(curr,next,opts);
		opts.cssBefore.left = fwd ? (next.cycleW-1) : (1-next.cycleW);
		opts.animOut.left = fwd ? -curr.cycleW : curr.cycleW;
	});
	opts.cssFirst.left = 0;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
	opts.animOut.top = 0;
};
$.fn.cycle.transitions.scrollVert = function($cont, $slides, opts) {
	$cont.css('overflow','hidden');
	opts.before.push(function(curr, next, opts, fwd) {
		if (opts.rev)
			fwd = !fwd;
		$.fn.cycle.commonReset(curr,next,opts);
		opts.cssBefore.top = fwd ? (1-next.cycleH) : (next.cycleH-1);
		opts.animOut.top = fwd ? curr.cycleH : -curr.cycleH;
	});
	opts.cssFirst.top = 0;
	opts.cssBefore.left = 0;
	opts.animIn.top = 0;
	opts.animOut.left = 0;
};

// slideX/slideY
$.fn.cycle.transitions.slideX = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$(opts.elements).not(curr).hide();
		$.fn.cycle.commonReset(curr,next,opts,false,true);
		opts.animIn.width = next.cycleW;
	});
	opts.cssBefore.left = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.width = 0;
	opts.animIn.width = 'show';
	opts.animOut.width = 0;
};
$.fn.cycle.transitions.slideY = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$(opts.elements).not(curr).hide();
		$.fn.cycle.commonReset(curr,next,opts,true,false);
		opts.animIn.height = next.cycleH;
	});
	opts.cssBefore.left = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.height = 0;
	opts.animIn.height = 'show';
	opts.animOut.height = 0;
};

// shuffle
$.fn.cycle.transitions.shuffle = function($cont, $slides, opts) {
	var i, w = $cont.css('overflow', 'visible').width();
	$slides.css({left: 0, top: 0});
	opts.before.push(function(curr,next,opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,true,true);
	});
	// only adjust speed once!
	if (!opts.speedAdjusted) {
		opts.speed = opts.speed / 2; // shuffle has 2 transitions
		opts.speedAdjusted = true;
	}
	opts.random = 0;
	opts.shuffle = opts.shuffle || {left:-w, top:15};
	opts.els = [];
	for (i=0; i < $slides.length; i++)
		opts.els.push($slides[i]);

	for (i=0; i < opts.currSlide; i++)
		opts.els.push(opts.els.shift());

	// custom transition fn (hat tip to Benjamin Sterling for this bit of sweetness!)
	opts.fxFn = function(curr, next, opts, cb, fwd) {
		if (opts.rev)
			fwd = !fwd;
		var $el = fwd ? $(curr) : $(next);
		$(next).css(opts.cssBefore);
		var count = opts.slideCount;
		$el.animate(opts.shuffle, opts.speedIn, opts.easeIn, function() {
			var hops = $.fn.cycle.hopsFromLast(opts, fwd);
			for (var k=0; k < hops; k++)
				fwd ? opts.els.push(opts.els.shift()) : opts.els.unshift(opts.els.pop());
			if (fwd) {
				for (var i=0, len=opts.els.length; i < len; i++)
					$(opts.els[i]).css('z-index', len-i+count);
			}
			else {
				var z = $(curr).css('z-index');
				$el.css('z-index', parseInt(z,10)+1+count);
			}
			$el.animate({left:0, top:0}, opts.speedOut, opts.easeOut, function() {
				$(fwd ? this : curr).hide();
				if (cb) cb();
			});
		});
	};
	$.extend(opts.cssBefore, { display: 'block', opacity: 1, top: 0, left: 0 });
};

// turnUp/Down/Left/Right
$.fn.cycle.transitions.turnUp = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,false);
		opts.cssBefore.top = next.cycleH;
		opts.animIn.height = next.cycleH;
		opts.animOut.width = next.cycleW;
	});
	opts.cssFirst.top = 0;
	opts.cssBefore.left = 0;
	opts.cssBefore.height = 0;
	opts.animIn.top = 0;
	opts.animOut.height = 0;
};
$.fn.cycle.transitions.turnDown = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,false);
		opts.animIn.height = next.cycleH;
		opts.animOut.top   = curr.cycleH;
	});
	opts.cssFirst.top = 0;
	opts.cssBefore.left = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.height = 0;
	opts.animOut.height = 0;
};
$.fn.cycle.transitions.turnLeft = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,true);
		opts.cssBefore.left = next.cycleW;
		opts.animIn.width = next.cycleW;
	});
	opts.cssBefore.top = 0;
	opts.cssBefore.width = 0;
	opts.animIn.left = 0;
	opts.animOut.width = 0;
};
$.fn.cycle.transitions.turnRight = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,true);
		opts.animIn.width = next.cycleW;
		opts.animOut.left = curr.cycleW;
	});
	$.extend(opts.cssBefore, { top: 0, left: 0, width: 0 });
	opts.animIn.left = 0;
	opts.animOut.width = 0;
};

// zoom
$.fn.cycle.transitions.zoom = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,false,true);
		opts.cssBefore.top = next.cycleH/2;
		opts.cssBefore.left = next.cycleW/2;
		$.extend(opts.animIn, { top: 0, left: 0, width: next.cycleW, height: next.cycleH });
		$.extend(opts.animOut, { width: 0, height: 0, top: curr.cycleH/2, left: curr.cycleW/2 });
	});
	opts.cssFirst.top = 0;
	opts.cssFirst.left = 0;
	opts.cssBefore.width = 0;
	opts.cssBefore.height = 0;
};

// fadeZoom
$.fn.cycle.transitions.fadeZoom = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,false);
		opts.cssBefore.left = next.cycleW/2;
		opts.cssBefore.top = next.cycleH/2;
		$.extend(opts.animIn, { top: 0, left: 0, width: next.cycleW, height: next.cycleH });
	});
	opts.cssBefore.width = 0;
	opts.cssBefore.height = 0;
	opts.animOut.opacity = 0;
};

// blindX
$.fn.cycle.transitions.blindX = function($cont, $slides, opts) {
	var w = $cont.css('overflow','hidden').width();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts);
		opts.animIn.width = next.cycleW;
		opts.animOut.left   = curr.cycleW;
	});
	opts.cssBefore.left = w;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
	opts.animOut.left = w;
};
// blindY
$.fn.cycle.transitions.blindY = function($cont, $slides, opts) {
	var h = $cont.css('overflow','hidden').height();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts);
		opts.animIn.height = next.cycleH;
		opts.animOut.top   = curr.cycleH;
	});
	opts.cssBefore.top = h;
	opts.cssBefore.left = 0;
	opts.animIn.top = 0;
	opts.animOut.top = h;
};
// blindZ
$.fn.cycle.transitions.blindZ = function($cont, $slides, opts) {
	var h = $cont.css('overflow','hidden').height();
	var w = $cont.width();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts);
		opts.animIn.height = next.cycleH;
		opts.animOut.top   = curr.cycleH;
	});
	opts.cssBefore.top = h;
	opts.cssBefore.left = w;
	opts.animIn.top = 0;
	opts.animIn.left = 0;
	opts.animOut.top = h;
	opts.animOut.left = w;
};

// growX - grow horizontally from centered 0 width
$.fn.cycle.transitions.growX = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,true);
		opts.cssBefore.left = this.cycleW/2;
		opts.animIn.left = 0;
		opts.animIn.width = this.cycleW;
		opts.animOut.left = 0;
	});
	opts.cssBefore.top = 0;
	opts.cssBefore.width = 0;
};
// growY - grow vertically from centered 0 height
$.fn.cycle.transitions.growY = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,false);
		opts.cssBefore.top = this.cycleH/2;
		opts.animIn.top = 0;
		opts.animIn.height = this.cycleH;
		opts.animOut.top = 0;
	});
	opts.cssBefore.height = 0;
	opts.cssBefore.left = 0;
};

// curtainX - squeeze in both edges horizontally
$.fn.cycle.transitions.curtainX = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,true,true);
		opts.cssBefore.left = next.cycleW/2;
		opts.animIn.left = 0;
		opts.animIn.width = this.cycleW;
		opts.animOut.left = curr.cycleW/2;
		opts.animOut.width = 0;
	});
	opts.cssBefore.top = 0;
	opts.cssBefore.width = 0;
};
// curtainY - squeeze in both edges vertically
$.fn.cycle.transitions.curtainY = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,false,true);
		opts.cssBefore.top = next.cycleH/2;
		opts.animIn.top = 0;
		opts.animIn.height = next.cycleH;
		opts.animOut.top = curr.cycleH/2;
		opts.animOut.height = 0;
	});
	opts.cssBefore.height = 0;
	opts.cssBefore.left = 0;
};

// cover - curr slide covered by next slide
$.fn.cycle.transitions.cover = function($cont, $slides, opts) {
	var d = opts.direction || 'left';
	var w = $cont.css('overflow','hidden').width();
	var h = $cont.height();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts);
		if (d == 'right')
			opts.cssBefore.left = -w;
		else if (d == 'up')
			opts.cssBefore.top = h;
		else if (d == 'down')
			opts.cssBefore.top = -h;
		else
			opts.cssBefore.left = w;
	});
	opts.animIn.left = 0;
	opts.animIn.top = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.left = 0;
};

// uncover - curr slide moves off next slide
$.fn.cycle.transitions.uncover = function($cont, $slides, opts) {
	var d = opts.direction || 'left';
	var w = $cont.css('overflow','hidden').width();
	var h = $cont.height();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,true,true);
		if (d == 'right')
			opts.animOut.left = w;
		else if (d == 'up')
			opts.animOut.top = -h;
		else if (d == 'down')
			opts.animOut.top = h;
		else
			opts.animOut.left = -w;
	});
	opts.animIn.left = 0;
	opts.animIn.top = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.left = 0;
};

// toss - move top slide and fade away
$.fn.cycle.transitions.toss = function($cont, $slides, opts) {
	var w = $cont.css('overflow','visible').width();
	var h = $cont.height();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,true,true);
		// provide default toss settings if animOut not provided
		if (!opts.animOut.left && !opts.animOut.top)
			$.extend(opts.animOut, { left: w*2, top: -h/2, opacity: 0 });
		else
			opts.animOut.opacity = 0;
	});
	opts.cssBefore.left = 0;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
};

// wipe - clip animation
$.fn.cycle.transitions.wipe = function($cont, $slides, opts) {
	var w = $cont.css('overflow','hidden').width();
	var h = $cont.height();
	opts.cssBefore = opts.cssBefore || {};
	var clip;
	if (opts.clip) {
		if (/l2r/.test(opts.clip))
			clip = 'rect(0px 0px '+h+'px 0px)';
		else if (/r2l/.test(opts.clip))
			clip = 'rect(0px '+w+'px '+h+'px '+w+'px)';
		else if (/t2b/.test(opts.clip))
			clip = 'rect(0px '+w+'px 0px 0px)';
		else if (/b2t/.test(opts.clip))
			clip = 'rect('+h+'px '+w+'px '+h+'px 0px)';
		else if (/zoom/.test(opts.clip)) {
			var top = parseInt(h/2,10);
			var left = parseInt(w/2,10);
			clip = 'rect('+top+'px '+left+'px '+top+'px '+left+'px)';
		}
	}

	opts.cssBefore.clip = opts.cssBefore.clip || clip || 'rect(0px 0px 0px 0px)';

	var d = opts.cssBefore.clip.match(/(\d+)/g);
	var t = parseInt(d[0],10), r = parseInt(d[1],10), b = parseInt(d[2],10), l = parseInt(d[3],10);

	opts.before.push(function(curr, next, opts) {
		if (curr == next) return;
		var $curr = $(curr), $next = $(next);
		$.fn.cycle.commonReset(curr,next,opts,true,true,false);
		opts.cssAfter.display = 'block';

		var step = 1, count = parseInt((opts.speedIn / 13),10) - 1;
		(function f() {
			var tt = t ? t - parseInt(step * (t/count),10) : 0;
			var ll = l ? l - parseInt(step * (l/count),10) : 0;
			var bb = b < h ? b + parseInt(step * ((h-b)/count || 1),10) : h;
			var rr = r < w ? r + parseInt(step * ((w-r)/count || 1),10) : w;
			$next.css({ clip: 'rect('+tt+'px '+rr+'px '+bb+'px '+ll+'px)' });
			(step++ <= count) ? setTimeout(f, 13) : $curr.css('display', 'none');
		})();
	});
	$.extend(opts.cssBefore, { display: 'block', opacity: 1, top: 0, left: 0 });
	opts.animIn	   = { left: 0 };
	opts.animOut   = { left: 0 };
};

})(jQuery);



function ControlVersion()
{
	var version;
	var axo;
	var e;

	// NOTE : new ActiveXObject(strFoo) throws an exception if strFoo isn't in the registry

	try {
		// version will be set for 7.X or greater players
		axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
		version = axo.GetVariable("$version");
	} catch (e) {
	}

	if (!version)
	{
		try {
			// version will be set for 6.X players only
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
			
			// installed player is some revision of 6.0
			// GetVariable("$version") crashes for versions 6.0.22 through 6.0.29,
			// so we have to be careful. 
			
			// default to the first public version
			version = "WIN 6,0,21,0";

			// throws if AllowScripAccess does not exist (introduced in 6.0r47)		
			axo.AllowScriptAccess = "always";

			// safe to call for 6.0r47 or greater
			version = axo.GetVariable("$version");

		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 4.X or 5.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
			version = axo.GetVariable("$version");
		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 3.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
			version = "WIN 3,0,18,0";
		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 2.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			version = "WIN 2,0,0,11";
		} catch (e) {
			version = -1;
		}
	}
	
	return version;
}

// JavaScript helper required to detect Flash Player PlugIn version information
function GetSwfVer(){
	// NS/Opera version >= 3 check for Flash plugin in plugin array
	var flashVer = -1;
	
	if (navigator.plugins != null && navigator.plugins.length > 0) {
		if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
			var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
			var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;
			var descArray = flashDescription.split(" ");
			var tempArrayMajor = descArray[2].split(".");			
			var versionMajor = tempArrayMajor[0];
			var versionMinor = tempArrayMajor[1];
			var versionRevision = descArray[3];
			if (versionRevision == "") {
				versionRevision = descArray[4];
			}
			if (versionRevision[0] == "d") {
				versionRevision = versionRevision.substring(1);
			} else if (versionRevision[0] == "r") {
				versionRevision = versionRevision.substring(1);
				if (versionRevision.indexOf("d") > 0) {
					versionRevision = versionRevision.substring(0, versionRevision.indexOf("d"));
				}
			}
			var flashVer = versionMajor + "." + versionMinor + "." + versionRevision;
		}
	}
	// MSN/WebTV 2.6 supports Flash 4
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) flashVer = 4;
	// WebTV 2.5 supports Flash 3
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) flashVer = 3;
	// older WebTV supports Flash 2
	else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 2;
	else if ( isIE && isWin && !isOpera ) {
		flashVer = ControlVersion();
	}	
	return flashVer;
}

// When called with reqMajorVer, reqMinorVer, reqRevision returns true if that version or greater is available
function DetectFlashVer(reqMajorVer, reqMinorVer, reqRevision)
{
	versionStr = GetSwfVer();
	if (versionStr == -1 ) {
		return false;
	} else if (versionStr != 0) {
		if(isIE && isWin && !isOpera) {
			// Given "WIN 2,0,0,11"
			tempArray         = versionStr.split(" "); 	// ["WIN", "2,0,0,11"]
			tempString        = tempArray[1];			// "2,0,0,11"
			versionArray      = tempString.split(",");	// ['2', '0', '0', '11']
		} else {
			versionArray      = versionStr.split(".");
		}
		var versionMajor      = versionArray[0];
		var versionMinor      = versionArray[1];
		var versionRevision   = versionArray[2];

        	// is the major.revision >= requested major.revision AND the minor version >= requested minor
		if (versionMajor > parseFloat(reqMajorVer)) {
			return true;
		} else if (versionMajor == parseFloat(reqMajorVer)) {
			if (versionMinor > parseFloat(reqMinorVer))
				return true;
			else if (versionMinor == parseFloat(reqMinorVer)) {
				if (versionRevision >= parseFloat(reqRevision))
					return true;
			}
		}
		return false;
	}
}

function AC_AddExtension(src, ext)
{
  if (src.indexOf('?') != -1)
    return src.replace(/\?/, ext+'?'); 
  else
    return src + ext;
}

function AC_Generateobj(objAttrs, params, embedAttrs) 
{ 
  var str = '';
  if (isIE && isWin && !isOpera)
  {
    str += '<object ';
    for (var i in objAttrs)
    {
      str += i + '="' + objAttrs[i] + '" ';
    }
    str += '>';
    for (var i in params)
    {
      str += '<param name="' + i + '" value="' + params[i] + '" /> ';
    }
    str += '</object>';
  }
  else
  {
    str += '<embed ';
    for (var i in embedAttrs)
    {
      str += i + '="' + embedAttrs[i] + '" ';
    }
    str += '> </embed>';
  }

  document.write(str);
}

function AC_FL_RunContent(){
  var ret = 
    AC_GetArgs
    (  arguments, ".swf", "movie", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
     , "application/x-shockwave-flash"
    );
  AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs);
}

function AC_SW_RunContent(){
  var ret = 
    AC_GetArgs
    (  arguments, ".dcr", "src", "clsid:166B1BCA-3F9C-11CF-8075-444553540000"
     , null
    );
  AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs);
}

function AC_GetArgs(args, ext, srcParamName, classid, mimeType){
  var ret = new Object();
  ret.embedAttrs = new Object();
  ret.params = new Object();
  ret.objAttrs = new Object();
  for (var i=0; i < args.length; i=i+2){
    var currArg = args[i].toLowerCase();    

    switch (currArg){	
      case "classid":
        break;
      case "pluginspage":
        ret.embedAttrs[args[i]] = args[i+1];
        break;
      case "src":
      case "movie":	
        args[i+1] = AC_AddExtension(args[i+1], ext);
        ret.embedAttrs["src"] = args[i+1];
        ret.params[srcParamName] = args[i+1];
        break;
      case "onafterupdate":
      case "onbeforeupdate":
      case "onblur":
      case "oncellchange":
      case "onclick":
      case "ondblclick":
      case "ondrag":
      case "ondragend":
      case "ondragenter":
      case "ondragleave":
      case "ondragover":
      case "ondrop":
      case "onfinish":
      case "onfocus":
      case "onhelp":
      case "onmousedown":
      case "onmouseup":
      case "onmouseover":
      case "onmousemove":
      case "onmouseout":
      case "onkeypress":
      case "onkeydown":
      case "onkeyup":
      case "onload":
      case "onlosecapture":
      case "onpropertychange":
      case "onreadystatechange":
      case "onrowsdelete":
      case "onrowenter":
      case "onrowexit":
      case "onrowsinserted":
      case "onstart":
      case "onscroll":
      case "onbeforeeditfocus":
      case "onactivate":
      case "onbeforedeactivate":
      case "ondeactivate":
      case "type":
      case "codebase":
      case "id":
        ret.objAttrs[args[i]] = args[i+1];
        break;
      case "width":
      case "height":
      case "align":
      case "vspace": 
      case "hspace":
      case "class":
      case "title":
      case "accesskey":
      case "name":
      case "tabindex":
        ret.embedAttrs[args[i]] = ret.objAttrs[args[i]] = args[i+1];
        break;
      default:
        ret.embedAttrs[args[i]] = ret.params[args[i]] = args[i+1];
    }
  }
  ret.objAttrs["classid"] = classid;
  if (mimeType) ret.embedAttrs["type"] = mimeType;
  return ret;
}

function MM_preloadImages() { 
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
	var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i < a.length; i++)
	if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { 
  var i,x,a=document.MM_sr; for(i=0;a&&i < a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { 
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
	d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i = 0;!x&&i < d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i < d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { 
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}



//random number generation 
var axel = Math.random() + "";  
var a = axel * 1000000000000000000;  
  
// 
//the spotlight image call functions (3) below 
// 
function dc_spotnetflix(href)  
{  
	document.url = href; 
	var doPing = new Image(); 
	// the URL below is a spotlight tag for page1 
	doPing.src = "http://fls.doubleclick.net/activityi;src=911828;type=ninte811;cat=ninte251;ord=1;num=" + a + "?"; 
	doPing.onLoad = passed; 
	return false; 
}
function passed() { 
	document.location = document.url; 
}  

function fbs_click(){
	u=location.href;
	window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(u)+'&'+(new Date).valueOf(),'sharer','toolbar=0,status=0,width=626,height=436');
	return false;
}

//Countdown Clock used for 3ds
var endDate;
var countdownDiv;
var countdownState = 'normal'
function initCountdown(domObject, endDateTemp, cdState) {
	
	//endDate = endDateTemp; //this should be a date object: new Date(2011,2,27,0,0,0);
	countdownDiv = domObject;
	countdownState = (cdState != undefined) ? cdState : 'normal';
	updateCountdown();
}

function updateCountdown(){
	/*
	current_date = new Date();									//grab current date
	time_left = endDate.getTime() - current_date.getTime();		//calc milliseconds between dates
	if(time_left>0) {
		time_left = Math.floor(time_left/1000);					
		days=0;hours=0;mins=0;secs=0;out="";				

		days=Math.floor(time_left/86400);
		time_left=time_left%86400;

		hours=Math.floor(time_left/3600);
		time_left=time_left%3600;

		mins=Math.floor(time_left/60);
		time_left=time_left%60;

		secs=Math.floor(time_left);				
	
		var daysTxt = "<strong>"+days +"</strong>day"+((days!=1)?"s":"");						
		var hoursTxt  = "<strong>"+hours +"</strong>hour"+((hours!=1)?"s":"");
		var minTxt = "<strong>"+mins +"</strong>min"+((mins!=1)?"s":"");
		var secTxt = "<strong>"+secs +"</strong>sec";
		
		var finalTxt = daysTxt + " : " + hoursTxt+ " : " + minTxt + " : "+ secTxt;
		$(countdownDiv).html(finalTxt)
		
		setTimeout("updateCountdown()", 1000);
	} else { */
	
		//if timer is done
		if(countdownState == "3dshome") {
			$(countdownDiv).html("")
			$("#txt-date").html("<div align='center'>Now Only <strong>$169.99*</strong></div>");
			$("#txt-price").html('<img src="/images/3ds/home/img_arrowright.png" /> Order Yours Today');
		} else if(countdownState == "ncomhome") {
			$("#countdown-timer").html("<a href='http://www.nintendo.com/3ds'>Now Only $169.99</a>");	
			$("#countdown-preorder").html('<img src="/images/home/3ds_countdownclock/order.jpg" alt="Nintendo 3DS" border="0" />');	
		}else {
			$(countdownDiv).parent().children("p").text('Nintendo 3DS Released!');
			$("#countdown-txt").html("<a href='http://www.nintendo.com/3ds'>Now Only $169.99</a>");
			//$(countdownDiv).parent().children("p").text('Nintendo 3DS Released!');
			$("#countdown-preorder").css('background-image', 'url(/images/3ds/countdown_order.png)');
		}
		
	//}

}


//end countdown


//POP Code for DS Lite Flashy Navigation

if (typeof console === 'undefined') {
	console = {
		log: function(message) { },
		warn: function(message) { }
	};
}


/**
 * Asset Loader
 * Load images
 */
var AssetLoader = function () {
	this.successCount = 0;
	this.errorCount = 0;
	this.cache = {};
	this.downloadQueue = [];
};

AssetLoader.prototype = {
	
	// queue individual downloads
	queueDownload: function(path) {
		this.downloadQueue.push(path);
	},
	
	// queue multiple downloads (as an array)
	queueDownloads: function(paths) {
		for(var i = 0, l = paths.length; i < l; i++) {
			this.downloadQueue.push(paths[i]);
		}
	},
	
	// download queued element
	download: function(el, callback) {
		var path = el;
		var img = new Image();
		var self = this;
		$(img).bind("load", function() {
			console.log(this.src + " is loaded");
			self.successCount += 1;
			if (self.isDone()) {
			    callback();
			}
		});
		$(img).bind("error", function() {
			console.log("error: can't find " + this.src);
			self.errorCount += 1;
			if (self.isDone()) {
		    	callback();
			}
		});
		$(img).attr('src', path);
		this.cache[path] = img;
	},
	
	// download all queued elements
	downloadAll: function(callback) {
		if (this.downloadQueue.length === 0) {
		    callback();
		}
		for (var i = 0; i < this.downloadQueue.length; i++) {
			this.download(this.downloadQueue[i], callback);
		}
	},
	
	// get asset
	getAsset: function(path) {
		return this.cache[path];
	},
	
	// are we done loading queued elements?
	isDone: function() {
		return ((this.downloadQueue.length) === this.successCount + this.errorCount);
	}
};

var DS_LITE = window.DS_LITE || {};
DS_LITE = {
	
	// these are all the image assets used
	assets: {
		globals: {
			ds: [
				//'/images/ds/systems/lite/animation/bg/hotspots.png',
				'/images/ds/systems/lite/animation/bg/ds-lite.png'
			],
			pen: [
				//'/images/ds/systems/lite/animation/bg/hotspot-pen.png',
				'/images/ds/systems/lite/animation/bg/touch-pen.png'
			]
		},
		screens: [
			'/images/ds/systems/lite/animation/screens/about.png',
			'/images/ds/systems/lite/animation/screens/dual-screens.png',
			'/images/ds/systems/lite/animation/screens/play-with-friends.png',
			'/images/ds/systems/lite/animation/screens/game-boy-advance.png',
			'/images/ds/systems/lite/animation/screens/touch-screen.png',
			'/images/ds/systems/lite/animation/screens/microphone.png',
			'/images/ds/systems/lite/animation/screens/pictochat.png'
		],
		animatable: {
			diddy: {
				src: '/images/ds/systems/lite/animation/sections/about/diddykong.png',
				id: 'diddy'
			},
			colorDS: {
				src: '/images/ds/systems/lite/animation/sections/about/color-ds.png',
				id: 'color-ds'
			},
			patapata: {
				src: '/images/ds/systems/lite/animation/sections/about/patapata.png',
				id: 'patapata'
			},
			mario: {
				src: '/images/ds/systems/lite/animation/sections/dual-screens/mario.png',
				id: 'mario'
			},
			propellerheyho: {
				src: '/images/ds/systems/lite/animation/sections/dual-screens/propellerheyho.png',
				id: 'propellerheyho'
			},
			groupBubble: {
				src: '/images/ds/systems/lite/animation/sections/play-with-friends/group-bubble.png',
				id: 'group-bubble'
			},
			kk: {
				src: '/images/ds/systems/lite/animation/sections/play-with-friends/kk.png',
				id: 'kk'
			},
			wifiWaves: {
				src: '/images/ds/systems/lite/animation/sections/play-with-friends/wifi-waves.png',
				id: 'wifi-waves'
			},
			zoomSlot: {
				src: '/images/ds/systems/lite/animation/sections/game-boy-advance/zoom-slot.png',
				id: 'zoom-slot'
			},
			peach: {
				src: '/images/ds/systems/lite/animation/sections/game-boy-advance/peach.png',
				id: 'peach'
			},
			rings: {
				src: '/images/ds/systems/lite/animation/sections/touch-screen/rings.png',
				id: 'rings'
			},
			luigi: {
				src: '/images/ds/systems/lite/animation/sections/touch-screen/luigi.png',
				id: 'luigi'
			},
			zoomMic: {
				src: '/images/ds/systems/lite/animation/sections/microphone/zoom-mic.png',
				id: 'zoom-mic'
			},
			microphoneBubble: {
				src: '/images/ds/systems/lite/animation/sections/microphone/microphone-bubble.png',
				id: 'microphone-bubble'
			},
			koopa: {
				src: '/images/ds/systems/lite/animation/sections/microphone/koopa.png',
				id: 'koopa'
			},
			hammerbros: {
				src: '/images/ds/systems/lite/animation/sections/pictochat/hammerbros.png',
				id: 'hammerbros'
			},
			yoshi: {
				src: '/images/ds/systems/lite/animation/sections/pictochat/yoshi.png',
				id: 'yoshi'
			}
		}
	},
	
	init: function() {
		
		// remove no-js and dls, we don't need them
		$('#dl').remove();
		$('.no-js').removeClass('no-js');
		
		// hide hotspots
		$('#hotspots').hide();
		
		// hide copy wrapper
		$('#copy-wrapper').hide();
		
		// do fade animations if browser supports opacity, just show/hide things otherwise
		this.animate = (jQuery.support.opacity) ? true : false;

		// hide all sections
		if(this.animate) {
			$('#copy-wrapper .section').fadeTo(0, 0).hide(); 
		} else {
			$('#copy-wrapper .section').hide(); 
		}
		
		this.glow();
		
		// create tooltips
		var tooltip = new DS_LITE.Tooltip('area');
		
		this.controller();
	},
	
	glow: function() {
		// create glow effect on the DS when hovered
		var dsLite = $('#ds-lite'),
			hotspots = $('#hotspots, area');
		hotspots.live('mouseenter', function(e) {
			//dsLite.addClass('active');
		});
		hotspots.live('mouseleave', function(e) {
			//dsLite.removeClass('active');
		});
		
	},
	
	controller: function() {
		
		var self = this, // scope alias
			loader = $('#loader'),
			path;
			
		// display loader
		loader.show();
		
		// have we loaded and create the basic structure?
		this.loaded = false;
		this.animating = false; // animation flag
		this.currentSection = null; // this currently active section
		this.oldSection = null; // previously active
		
		// listen for nav and image map click events
		$('#about-nav a, area').bind('click', function(e) {
			e.preventDefault();
			if(!self.animating) {
				$.address.value($(this).attr('href').replace('#', ''));
			} else {
				return false;
			}
		});
		
		// bind to the jQuery address object (this is basically our router)
		$.address.change(function(event) {
			path = event.value.replace('/', '');
			if(event.value === '' || event.value === '/') {
				// if we're at root, use the about section
				self.currentSection = path = 'about';
			} else {
				self.oldSection = self.currentSection;
				self.currentSection = self.camelCase(path);
			}
			if(self.loaded && !self.animating) {
				self.updateNav(path); // set navigation state
				self.action('DS_LITE.Views.' + self.oldSection, window, 'outro', self.currentSection);
			}
        });
		
		// load all the assets...
		this.ASSET_LOADER = new AssetLoader();
		this.ASSET_LOADER.queueDownloads(this.assets.screens);
		this.ASSET_LOADER.queueDownloads(this.assets.globals.pen);
		this.ASSET_LOADER.queueDownloads(this.assets.globals.ds);
		
		// loop through each animatable object and queue up download for the src property
		for (var key in this.assets.animatable) {
			if (this.assets.animatable.hasOwnProperty(key)) {
				var obj = this.assets.animatable[key];
				for (var prop in obj) {
					if(prop === 'src') {
						this.ASSET_LOADER.queueDownload(obj[prop]);
					}
				}
			}
		}

		// all assets have been downloaded
		this.ASSET_LOADER.downloadAll(function() {
			// hide the loader, create the overall layout, and load in the appropriate screen
			setTimeout(function() {
				loader.addClass('fade').fadeTo(250, 0, function() {
					DS_LITE.Views._layout();
					self.loaded = true;
					self.updateNav(path); // set navigation state
					self.action('DS_LITE.Views.' + self.currentSection, window, 'intro');
				});
			}, 500);
		});
	},
	
	// turn a dashed string into camelCase
	camelCase: function(str) {
		return str.replace(/(\-[a-z])/g, function($1) {
			return $1.toUpperCase().replace('-','');
		});
	},
	
	// call a function from string (without having to use eval)
	action: function (functionName, context) {
		var args = Array.prototype.slice.call(arguments, 2),
			namespaces = functionName.split("."),
			func = namespaces.pop();
			
		for (var i = 0; i < namespaces.length; i++) {
		    context = context[namespaces[i]];
		}
		if(typeof context[func] === 'function') {
			return context[func].apply(context, args);
		} else {
			return false;
		}
	},
	
	fadeScreens: function(index) {
		var activeScreens = $('.screens li.active');
		if(activeScreens.length > 0 && $('.screens li').eq(index).hasClass('active') === false) {
			if(DS_LITE.animate) {
				$('.screens li.active').stop(true, true).fadeTo(500, 0, function() {
					$(this).removeClass('active');
				});
			} else {
				$('.screens li.active').hide().removeClass('active');
			}
		}
		if(DS_LITE.animate) {
			$('.screens li').eq(index).stop(true, true).fadeTo(800, 1, function() {
				$(this).addClass('active');
			});
		} else {
			$('.screens li').eq(index).show().addClass('active');
		}

	},
	
	updateNav: function(path) {
		$('#about-nav a').removeClass('active');
		$('#nav-' + path + ' a').addClass('active');
	}
	
};

DS_LITE.Views = {
	
	// create the layouts
	_layout: function() {
		var container = $('#ds-lite');
		
		// show copy wrapper
		$('#copy-wrapper').show();
		
		// create all the elements needed
		var screens = $('<div/>', {
			'class': 'screens'
		});
		var ul = $('<ul/>');
		screens.append(ul);
		
		var screenshots = DS_LITE.assets.screens;
		for(var i = 0, l = screenshots.length; i < l; i++) {
			var li = $('<li/>');
			if(DS_LITE.animate) {
				li.css({'opacity': 0, 'z-index': 1});
			} else {
				li.hide();
			}
			
			ul.append(li);
			$(DS_LITE.ASSET_LOADER.getAsset(screenshots[i])).appendTo(li);
		}
		
		container.append(screens);
		
		var touchPen = $('<div/>', {
			'id': 'touch-pen'
		});
		var penHotspots = $(DS_LITE.ASSET_LOADER.getAsset(DS_LITE.assets.globals.pen[0]));
		penHotspots.attr('id', 'hotspot-pen');
		var pen = $(DS_LITE.ASSET_LOADER.getAsset(DS_LITE.assets.globals.pen[1]));
		touchPen.append(penHotspots).append(pen);
		container.append(touchPen);
		
		var hotspots = $(DS_LITE.ASSET_LOADER.getAsset(DS_LITE.assets.globals.ds[0]));
		hotspots.attr('id', 'hotspots-ds');
		
		var ds = $(DS_LITE.ASSET_LOADER.getAsset(DS_LITE.assets.globals.ds[1]));
		ds.attr('id', 'ds');
		
		container.append(hotspots).append(ds);
		
		// get the animatable images and place them on the canvas (CSS will deal with positioning)
		for (var key in DS_LITE.assets.animatable) {
			if (DS_LITE.assets.animatable.hasOwnProperty(key)) {
				var obj = DS_LITE.assets.animatable[key];
				$(DS_LITE.ASSET_LOADER.getAsset(obj['src'])).attr('id', obj['id']).attr('class', 'animatable').appendTo('#animation-canvas');
			}
		}
		
		// show hotspots
		$('#hotspots').show();
		
	},
	
	// about view... handles all animations for the default screen
	about: function(state, next) {
		if(state === 'intro') {
			DS_LITE.animating = true;
			DS_LITE.fadeScreens(0);
			
			// text & character animations
			if(DS_LITE.animate) {
				$('#about').stop().show().animate({
					'left': '70px',
					'opacity': 1
				}, 450);
			} else {
				$('#about').css({'left': '70px'}).show();
			}

			$('#diddy').stop().delay(200).show().animate({
				'right': '20px'
			}, 300);
			
			if(DS_LITE.animate) {
				$('#color-ds').stop().fadeTo(300, 1);
			} else {
				$('#color-ds').show();
			}
			
			$('#patapata').stop().delay(400).show().animate({
				'top': '30px'
			}, 300,
			   'easeOutBack', // requires easing plugin
				function() {
					DS_LITE.animating = false;
				}
			);
			
		} else {
			DS_LITE.animating = true;
			
			// text & character animations
			if(DS_LITE.animate) {
				$('#color-ds').stop().fadeTo(200, 0);
			} else {
				$('#color-ds').hide();
			}
			
			if(DS_LITE.animate) {
				$('#about').stop().animate({
					'left': '20px',
					'opacity': 0
				}, 250, function() {
					$(this).hide();
				});
			} else {
				$('#about').hide();
			}
			$('#diddy').stop().delay(200).show().animate({
				'right': '-300px'
			}, 300);
			
			$('#patapata').stop().delay(100).show().animate({
				'top': '-200px'
			}, 300,
				'easeInBack', // requires easing plugin
				function() {
					DS_LITE.animating = false;
					DS_LITE.action('DS_LITE.Views.' + next, window, 'intro'); // call next section
				}
			);
		}
	},
	
	dualScreens: function(state, next) {
		if(state === 'intro') {
			DS_LITE.animating = true;
			DS_LITE.fadeScreens(1);
			
			// text & character animations
			if(DS_LITE.animate) {
				$('#dual-screens').stop().show().animate({
					'left': '300px',
					'opacity': 1
				}, 450);
			} else {
				$('#dual-screens').css({'left': '300px'}).show();
			}
			
			$('#mario').stop().delay(200).show().animate({
				'left': '80px'
			}, 300,
			'easeOutBack', // requires easing plugin
				function() {
					DS_LITE.animating = false;
				} 
			); 
			
			$('#propellerheyho').stop(true, true).addClass('animating').show().animate({
				'right': '80px',
				'top': '0px'
			}, 2000, 
				'easeOutElastic' // requires easing plugin;
			);
			
		} else {
			DS_LITE.animating = true;
			// text & character animations
			if(DS_LITE.animate) {
				$('#dual-screens').stop().animate({
					'left': '320px',
					'opacity': 0
				}, 250, function() {
					$(this).hide();
				});
			} else {
				$('#dual-screens').hide();
			}
			$('#mario').stop().show().animate({
				'left': '-250px'
			}, 300);
			
			$('#propellerheyho').stop().delay(100).show().animate({
				'right': '-100px'
			}, 200, 
				'easeInBack', // requires easing plugin;
				function() {
					$(this).removeClass('animating');
					DS_LITE.animating = false;
					DS_LITE.action('DS_LITE.Views.' + next, window, 'intro'); // call next section
				}
			);
		}
	},
	
	playWithFriends: function(state, next) {
		if(state === 'intro') {
			DS_LITE.animating = true;
			DS_LITE.fadeScreens(2);
			
			// text & character animations
			if(DS_LITE.animate) {
				$('#play-with-friends').stop().show().animate({
					'left': '10px',
					'opacity': 1
				}, 150);
			} else {
				$('#play-with-friends').css({'left': '10px'}).show();
			}
			
			if(DS_LITE.animate) {
				$('#group-bubble').stop().css({'right': '20px'}).addClass('animating').fadeTo(200, 1);
			} else {
				$('#group-bubble').css({'right': '20px'}).addClass('animating').show();
			}
			
			if(DS_LITE.animate) {
				$('#wifi-waves').fadeTo(200, 0.7, function(e) {
					$(this).addClass('animating');
				});
			} else {
				$('#wifi-waves').show();
			}
			
			$('#kk').stop().delay(400).show().animate({
				'left': '88px'
			}, 300,
			   'easeOutBack', // requires easing plugin
				function() {
					DS_LITE.animating = false;
				}
			);
			
		} else {
			DS_LITE.animating = true;
			// text & character animations
			if(DS_LITE.animate) {
				$('#play-with-friends').stop().animate({
					'left': '0px',
					'opacity': 0
				}, 100, function() {
					$(this).hide();
				});
			} else {
				$('#play-with-friends').hide();
			}
			
			if(DS_LITE.animate) {
				$('#wifi-waves').stop().removeClass('animating').fadeTo(200, 0, function(e) {
					$(this).hide();
				});
			} else {
				$('#wifi-waves').removeClass('animating').hide();
			}
			
			if(DS_LITE.animate) {
				$('#group-bubble').stop().removeClass('animating').fadeTo(200, 0, function() {
					$(this).css({'right': '-2000px'});
				});
			} else {
				$('#group-bubble').removeClass('animating').hide();
			}
			
			$('#kk').delay(100).stop().show().animate({
				'left': '-200px'
			}, 300,
			   'easeInBack', // requires easing plugin
				function() {
					DS_LITE.animating = false;
					DS_LITE.action('DS_LITE.Views.' + next, window, 'intro'); // call next section
				}
			);
			
		}
	},
	
	gameBoyAdvance: function(state, next) {
		if(state === 'intro') {
			DS_LITE.animating = true;
			DS_LITE.fadeScreens(3);
			
			// text & character animations
			if(DS_LITE.animate) {
				$('#game-boy-advance').stop().show().animate({
					'left': '300px',
					'opacity': 1
				}, 150);
			} else {
				$('#game-boy-advance').css({'left': '300px'}).show();
			}
			
			if(DS_LITE.animate) {
				$('#zoom-slot').stop().fadeTo(200, 1);
			} else {
				$('#zoom-slot').show();
			}
			
			$('#peach').stop().delay(200).show().animate({
				'left': '63px'
			}, 300,
			'easeOutBack', // requires easing plugin
				function() {
					DS_LITE.animating = false;
				} 
			);
			
		} else {
			DS_LITE.animating = true;
			
			// text & character animations
			if(DS_LITE.animate) {
				$('#game-boy-advance').stop().show().animate({
					'left': '320px',
					'opacity': 0
				}, 150, function() {
					$(this).hide();
				});
			} else {
				$('#game-boy-advance').hide();
			}
			
			if(DS_LITE.animate) {
				$('#zoom-slot').stop().fadeTo(200, 0);
			} else {
				$('#zoom-slot').hide();
			}
			
			$('#peach').stop().delay(100).show().animate({
				'left': '-250px'
			}, 200, 
				'easeInBack', // requires easing plugin;
				function() {
					$(this).removeClass('animating');
					DS_LITE.animating = false;
					DS_LITE.action('DS_LITE.Views.' + next, window, 'intro'); // call next section
				}
			);
			
		}
	},
	
	touchScreen: function(state, next) {
		if(state === 'intro') {
			DS_LITE.animating = true;
			DS_LITE.fadeScreens(4);
			
			// text & character animations
			if(DS_LITE.animate) {
				$('#touch-screen').stop().show().animate({
					'left': '300px',
					'opacity': 1
				}, 150);
			} else {
				$('#touch-screen').css({'left': '300px'}).show();
			}
			
			if(DS_LITE.animate) {
				$('#rings').fadeTo(200, 0.7, function(e) {
					$(this).addClass('animating');
				});
			} else {
				$('#rings').show();
			}
			
			$('#luigi').stop().delay(200).show().animate({
				'left': '23px'
			}, 300,
			'easeOutBack', // requires easing plugin
				function() {
					DS_LITE.animating = false;
				} 
			);
			
		} else {
			DS_LITE.animating = true;
			
			// text & character animations
			if(DS_LITE.animate) {
				$('#touch-screen').stop().show().animate({
					'left': '320px',
					'opacity': 0
				}, 150, 
				function() {
					$(this).hide();
				});
			} else {
				$('#touch-screen').hide();
			}
			
			if(DS_LITE.animate) {
				$('#rings').stop().removeClass('animating').fadeTo(200, 0, function(e) {
					$(this).hide();
				});
			} else {
				$('#rings').hide();
			}
			
			$('#luigi').stop().delay(100).show().animate({
				'left': '-300px'
			}, 200, 
				'easeInBack', // requires easing plugin;
				function() {
					$(this).removeClass('animating');
					DS_LITE.animating = false;
					DS_LITE.action('DS_LITE.Views.' + next, window, 'intro'); // call next section
				}
			);
			
		}
	},
	
	microphone: function(state, next) {
		if(state === 'intro') {
			DS_LITE.animating = true;
			DS_LITE.fadeScreens(5);
			
			// text & character animations
			if(DS_LITE.animate) {
				$('#microphone').stop().show().animate({
					'left': '300px',
					'opacity': 1
				}, 150);
			} else {
				$('#microphone').css({'left': '300px'}).show();
			}
			
			if(DS_LITE.animate) {
				$('#microphone-bubble').stop().css({'left': '122px'}).addClass('animating').fadeTo(200, 1);
			} else {
				$('#microphone-bubble').css({'left': '122px'}).addClass('animating').show();
			}
			
			if(DS_LITE.animate) {
				$('#zoom-mic').fadeTo(200, 1);
			} else {
				$('#zoom-mic').show();
			}
			$('#koopa').stop().delay(400).show().animate({
				'left': '20px'
			}, 200,
			   'easeOutBack', // requires easing plugin
				function() {
					DS_LITE.animating = false;
				}
			);
			
		} else {
			DS_LITE.animating = true;
			
			// text & character animations
			if(DS_LITE.animate) {
				$('#microphone').stop().animate({
					'left': '320px',
					'opacity': 0
				}, 100, function() {
					$(this).hide();
				});
			} else {
				$('#microphone').hide();
			}
			
			if(DS_LITE.animate) {
				$('#zoom-mic').stop().fadeTo(200, 0, function(e) {
					$(this).hide();
				});
			} else {
				$('#zoom-mic').hide();
			}
			
			if(DS_LITE.animate) {
				$('#microphone-bubble').stop().removeClass('animating').fadeTo(200, 0, function() {
					$(this).css({'left': '-2000px'});
				});
			} else {
				$('#microphone-bubble').removeClass('animating').hide();
			}
			
			$('#koopa').delay(100).stop().show().animate({
				'left': '-300px'
			}, 300,
			   'easeInBack', // requires easing plugin
				function() {
					DS_LITE.animating = false;
					DS_LITE.action('DS_LITE.Views.' + next, window, 'intro'); // call next section
				}
			);
			
		}
	},
	pictochat: function(state, next) {
		if(state === 'intro') {
			DS_LITE.animating = true;
			DS_LITE.fadeScreens(6);
			
			// text & character animations
			if(DS_LITE.animate) {
				$('#pictochat').stop().show().animate({
					'left': '10px',
					'opacity': 1
				}, 150);
			} else {
				$('#pictochat').css({'left': '10px'}).show();
			}
			
			$('#hammerbros').stop().show().animate({
				'left': '80px'
			}, 350,
			   'easeOutBack', // requires easing plugin
				function() {
					DS_LITE.animating = false;
				}
			);
			
			$('#yoshi').stop().delay(400).show().animate({
				'right': '20px'
			}, 200,
			   'easeOutBack', // requires easing plugin
				function() {
					DS_LITE.animating = false;
				}
			);
			
		} else {
			DS_LITE.animating = true;
			
			// text & character animations
			if(DS_LITE.animate) {
				$('#pictochat').stop().animate({
					'left': '-10px',
					'opacity': 0
				}, 100, function() {
					$(this).hide();
				});
			} else {
				$('#pictochat').hide();
			}
			
			$('#hammerbros').stop().animate({
				'left': '-300px'
			}, 200);
			
			$('#yoshi').delay(100).stop().show().animate({
				'right': '-300px'
			}, 300,
				function() {
					DS_LITE.animating = false;
					DS_LITE.action('DS_LITE.Views.' + next, window, 'intro'); // call next section
				}
			);
			
		}
	}
	
};


/**
 * Tooltip
 * @param targets {string}
 * @param options {object}
 */
DS_LITE.Tooltip = function(targets, options) {

	var self = this;
	this.options = $.extend({
		animationDuration: 200, // time, in milliseconds, it takes for animation to complete
		attribute: 'title', // attribute to use as tooltip (most often title)
		dataAttribute: 'data-tooltip', // name of data-attribute
		container: document.body, // container to attach tooltip to
		followMouse: true, // follow the mouse around?
		offsetLeft: -10,
		offsetTop: -30,
		tooltipContent: 'tooltip-content',
		tooltipContainer: 'tooltip'
	}, options || {});

	this.targets = $(targets);
	var size = this.targets.length;
	// animate if browser supports opacity, just show otherwise
	this.animate = (jQuery.support.opacity) ? true : false;
	if(size > 0) {

		// create the tooltip
		this.createTooltip();

		// set attributes
		for (var i = 0; i < size; i++) {
			this.setAttributes(this.targets[i]);
		}

		// events
		this.targets.mouseenter(function(e) {
			var el = $(e.target);
			if(el.attr(self.options.dataAttribute)) {
				self.displayTooltip(el, el.attr(self.options.dataAttribute));
			}
		});

		this.targets.mouseleave(function(e) {
			var el = $(e.target);
			if(el.attr(self.options.dataAttribute)) {
				self.hideTooltip(el);
			}
		});
		
		if(this.options.followMouse) {
			this.targets.mousemove(function(e) {
				var left = e.pageX - self.tooltip.width() + self.options.offsetLeft + 'px';
				var top = e.pageY + self.options.offsetTop + 'px';
				self.tooltip.css({'left': left, 'top': top});
			});
		}
		
	}

};

DS_LITE.Tooltip.prototype = {

	createTooltip: function() {
		// create the HTML structure for the the tooltip
		this.tooltip = $('<div/>', {'class': this.options.tooltipContainer, 'style': 'display: none'});
		this.content = $('<div/>', {'class': this.options.tooltipContent}).appendTo(this.tooltip);
		var container = ($(this.options.container).length > 0) ? $(this.options.container) : document.body;
		this.tooltip.appendTo(container);
	},

	displayTooltip: function(el, attr) {
		var pos,
			top,
			left;
		// update the text
		this.content.text(attr);
		// get height of tooltip
		this.tooltipHeight = this.tooltip.height();
		
		if(!this.options.followMouse) {
			// get position of calling element
			pos = el.offset();
			top = (pos.top + this.options.offsetTop) - this.tooltipHeight + 'px';
			left = pos.left + this.options.offsetLeft + 'px';
			// set css of tooltip
			if(this.animate) {
				this.tooltip.css({'left': left, 'top': top, 'opacity': 0});
			} else {
				this.tooltip.css({'left': left, 'top': top});
			}
		} else {
			if(this.animate) {
				this.tooltip.css({'opacity': 0});
			}
		}
		this.tooltip.show();
		if(this.animate) {
			// animate in tooltip
			this.tooltip.stop().animate({
				opacity: 1
			}, this.options.animationDuration);
		} else {
			this.tooltip.show();
		}

	},

	hideTooltip: function(el) {
		var self = this;
		// animate out tooltip
		if(this.animate) {
			this.tooltip.stop().animate({
					opacity: 0
			}, this.options.animationDuration,
			function() {
				self.tooltip.hide(); // hide just in case
			});
		} else {
			this.tooltip.hide();
		}
	},

	setAttributes: function(el) {
		// copy title to data attribute
		var element = $(el);
		if(element.attr(this.options.attribute)) {
			var attr = element.attr(this.options.attribute);
			element.attr(this.options.dataAttribute, attr);
			element.attr('title', '');
		}
	}
};

//END POP Code for DS Lite Flashy Navigation



