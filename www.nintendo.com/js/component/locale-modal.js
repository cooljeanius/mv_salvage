/**
 * Alerts users if their logged in LOCALE is not US.
 * Should only be embedded in US pages.
 */

// Copyright (c) 2012 Florian H., https://github.com/js-coder https://github.com/js-coder/cookie.js
!function(e,t){var n=function(){return n.get.apply(n,arguments)},r=n.utils={isArray:Array.isArray||function(e){return Object.prototype.toString.call(e)==="[object Array]"},isPlainObject:function(e){return!!e&&Object.prototype.toString.call(e)==="[object Object]"},toArray:function(e){return Array.prototype.slice.call(e)},getKeys:Object.keys||function(e){var t=[],n="";for(n in e)e.hasOwnProperty(n)&&t.push(n);return t},escape:function(e){return String(e).replace(/[,;"\\=\s%]/g,function(e){return encodeURIComponent(e)})},retrieve:function(e,t){return e==null?t:e}};n.defaults={},n.expiresMultiplier=86400,n.set=function(n,i,s){if(r.isPlainObject(n))for(var o in n)n.hasOwnProperty(o)&&this.set(o,n[o],i);else{s=r.isPlainObject(s)?s:{expires:s};var u=s.expires!==t?s.expires:this.defaults.expires||"",a=typeof u;a==="string"&&u!==""?u=new Date(u):a==="number"&&(u=new Date(+(new Date)+1e3*this.expiresMultiplier*u)),u!==""&&"toGMTString"in u&&(u=";expires="+u.toGMTString());var f=s.path||this.defaults.path;f=f?";path="+f:"";var l=s.domain||this.defaults.domain;l=l?";domain="+l:"";var c=s.secure||this.defaults.secure?";secure":"";e.cookie=r.escape(n)+"="+r.escape(i)+u+f+l+c}return this},n.remove=function(e){e=r.isArray(e)?e:r.toArray(arguments);for(var t=0,n=e.length;t<n;t++)this.set(e[t],"",-1);return this},n.empty=function(){return this.remove(r.getKeys(this.all()))},n.get=function(e,n){n=n||t;var i=this.all();if(r.isArray(e)){var s={};for(var o=0,u=e.length;o<u;o++){var a=e[o];s[a]=r.retrieve(i[a],n)}return s}return r.retrieve(i[e],n)},n.all=function(){if(e.cookie==="")return{};var t=e.cookie.split("; "),n={};for(var r=0,i=t.length;r<i;r++){var s=t[r].split("=");n[decodeURIComponent(s[0])]=decodeURIComponent(s[1])}return n},n.enabled=function(){if(navigator.cookieEnabled)return!0;var e=n.set("_","_").get("_")==="_";return n.remove("_"),e},typeof define=="function"&&define.amd?define(function(){return n}):typeof exports!="undefined"?exports.cookie=n:window.cookie=n}(document);

(function(){
	'use strict';
	
	var isStaying = cookie.get("stayInDifferentLocale");

	function getLoggedStatus() {
		if (typeof Alps !== 'undefined' && typeof Alps.Api !== 'undefined') {
			Alps.Api.getUserData(function(error, result) {
				if (error) {
					// not logged in - do nothing
					removeAlert();
				} else {
					var country = result.getCountry();
					var language = result.getLanguage();

					if (country !== "US") {
						if (country === "CA") alertCAUsers();
						else alertGlobalUsers();
						enableAlert();
					}	
				}
			});
		} else {
			removeAlert();
		}
	}

	function enableAlert() {
		$("body").addClass("locale-modal-alert");
		$("#btn-locale-stay").on("click", onStayInLocale);
	}

	function removeAlert() {
		$("body").removeClass("locale-modal-alert");
	}

	function alertCAUsers() {
		var altURL = document.location.origin + '/en_CA' + document.location.pathname;
		$("#btn-locale-go").attr("href", altURL);
	}

	function alertGlobalUsers() {
		$("#locale-p1").text("We noticed that your account is set to another region, though you're viewing the U.S. version of Nintendo.com.");
		$("#locale-p2").text("If you'd like to purchase a game or see product details for your region, please select the link below to choose your region.  ");
		$("#btn-locale-go").text("Choose your region");
		
		$("#btn-locale-go").attr("href", "/countryselector");
	}

	function onStayInLocale( e ) {
		e.preventDefault();
		cookie.set('stayInDifferentLocale', 'true', {
			expires: 1
		});
		removeAlert();
	}

	if (isStaying !== 'true') {
		getLoggedStatus();
	}
})();


