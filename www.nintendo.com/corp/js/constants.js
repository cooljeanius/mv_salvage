var NIN = NIN || {};

(function( $objNS ) {

	'use strict';

	$objNS.clickTouch = 'ontouchstart' in document ? 'touchstart' : 'click';

	$objNS.mediaQuery = {
		mobile: 570,
		tablet: 768
	};

	/**
	 * Current breakpoint name (mobile, tablet, desktop)
	 * @type {String}
	 */
	$objNS.breakpoint = null;

	/**
	 * Breakpoint name based on z-index
	 * @type {Object}
	 */
	$objNS.breakpoints = {
		1: 'mobile',
		2: 'tablet',
		3: 'desktop'
	};

	$objNS.FILTER_CHANGE = 'onGameFilterChange';
	$objNS.BREAKPOINT_CHANGE = 'onBreakpointChange';
	$objNS.WIN_RESIZE = 'onWindowResize';
	$objNS.WIN_SCROLL = 'onWindowScroll';
	$objNS.GAME_LOAD = 'onGameLoad';

	$objNS.is3DS = (navigator.platform == 'Nintendo 3DS') ? true : false;
	$objNS.isNew3DS = (navigator.platform.indexOf('New Nintendo 3DS')>=0) ? true : false;
	$objNS.isWiiU = /WiiU/i.test(navigator.userAgent) ? true : false;
	$objNS.isIE = (navigator.userAgent.indexOf('MSIE')>=0) ? true : false;
	$objNS.isAndroid = /(android)/i.test(navigator.userAgent);
	$objNS.isIOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false;
	$objNS.isIOS6 = $objNS.isIOS && /(OS 6_)/.test(navigator.userAgent) ? true : false;
	$objNS.isIOS7 = $objNS.isIOS && /(OS 7_)/.test(navigator.userAgent) ? true : false;
	$objNS.isIOS8 = $objNS.isIOS && /(OS 8_)/.test(navigator.userAgent) ? true : false;

	$objNS.userId = "null";
	
	if( typeof Alps != 'undefined' ){
		Alps.Api.getUserData(function(error, result) { 
			if (!error) {
				$objNS.userId = result.getUserId();
			}
		}); 	
	}

	//the BASEURL can be changed on the actual site
	$objNS.BASEURL = "//" + window.location.host;
	// set locale
	$objNS.LOCALEURL = "";
	if( document.body.getAttribute("lang") === "en-CA" ) { $objNS.LOCALEURL = "/en_CA"	}

	$objNS.numGameGuideItems = 40;

	$objNS.URLS = {
		gameFilter: $objNS.BASEURL + "/json/content/get/filter/game?limit=" + $objNS.numGameGuideItems,
		gameDetail: $objNS.BASEURL + "/json/content/get/game/subset",
		game: $objNS.BASEURL + "/json/content/get/game/",
		gameDetailPage: $objNS.BASEURL + $objNS.LOCALEURL + '/games/detail/'
	};

	$objNS.substitutions = {
		'yokai': 'yo-kai'
	};

})(NIN);


