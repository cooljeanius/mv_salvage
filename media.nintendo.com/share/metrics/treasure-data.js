/*
	Treasure Data
*/

//plugin
!function(t,e){if(void 0===e[t]){e[t]=function(){e[t].clients.push(this),this._init=[Array.prototype.slice.call(arguments)]},e[t].clients=[];for(var r=function(t){return function(){return this["_"+t]=this["_"+t]||[],this["_"+t].push(Array.prototype.slice.call(arguments)),this}},s=["addRecord","set","trackEvent","trackPageview","trackClicks","ready"],a=0;a<s.length;a++){var c=s[a];e[t].prototype[c]=r(c)}var n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=("https:"===document.location.protocol?"https:":"http:")+"//cdn.treasuredata.com/sdk/1.8.4/td.min.js";var i=document.getElementsByTagName("script")[0];i.parentNode.insertBefore(n,i)}}("Treasure",this);

(function() {
	var tryCount = 0,
		tryMax = 3;
	function waitForUserData() {
		var userData = JSON.parse( localStorage.getItem("alps/loginSession") );
		
		if( userData && userData.isConnected ) {
			initTD( JSON.parse( localStorage.getItem("alps/userData") ) );
		} else if(tryCount > tryMax || (userData && !userData.isConnected)) {
			initTD();
		} else if(tryCount <= tryMax) {
			setTimeout(waitForUserData, 2000);
			tryCount++;
		}
	}

	function initTD(userData) {
		var td = new Treasure({
			host: 'in.treasuredata.com',
            writeKey: '9450/288a7082814c10cd0ac1c36d01a94ac67577f8a1',
            database: 'noa_cdp_prod'
			// database: 'dev_ls'
		});
		// Enable cross-domain tracking
		td.set('$global', 'td_global_id', 'td_global_id');
		// Enable click tracking
        td.trackClicks();
        
        //track NSUID when on GDP
        var gameNSUID;
        if(document.getElementById('game-detail-page') && window.game) { 
            gameNSUID = ( window.game.nsuid) ?  window.game.nsuid : null;
        }

        //get EID (email)
        var eid = getQueryVariable("eid");
        eid = (eid) ? eid : null;

		if(userData) {            
			td.set('pageviews', {
				country: userData.country,
				language: userData.language,
				emailOptIn: userData.emailOptedIn,
				emailVerified: userData.emailVerified,
				gender: userData.gender,
				isChild: userData.isChild,
                alpsID: userData.id,
                ProductNSUID: gameNSUID,
                eid: eid
            });
		} else {
            td.set('pageviews', {
                ProductNSUID: gameNSUID,
                eid: eid
            });
        }
		// Track pageview information to 'pageviews' table
		td.trackPageview('pageviews');


		function getQueryVariable(variable) {
		     var query = window.location.search.substring(1), vars = query.split("&");
		     for (var i=0;i<vars.length;i++) {
		             var pair = vars[i].split("=");
		             if(pair[0] == variable){return pair[1];}
		     }
		     return(false);
		}
	}

	waitForUserData();
	
})();