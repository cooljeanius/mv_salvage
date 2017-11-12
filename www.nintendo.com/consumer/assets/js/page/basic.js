$(function(){
	assignReferrerProperty();
});

/* Used to assign the referral property of the Newsletter Signup link */
function assignReferrerProperty(){
	//var referrerDomain = document.domain; //hard-coding for now
	var referrerDomain = "support.nintendo.com";
	var baseNewsletterURL = $(".newsletter-signup").attr("href");
	$(".newsletter-signup").attr("href", baseNewsletterURL + referrerDomain);
}

/* Used to create the popup for the Newsletter Signup link */
var NIN = NIN || {};
(function($objNS){
	'use strict';
	
	var common = $objNS.common();
	common.initialize();
	
	// Universal interactions
	$(".js-basic-popup").on("click", function(e) {
		e.preventDefault();		
		var url = $(this).attr("href");
		window.open(url, "_blank",'width=800,height=600,scrollbars=no');		
	});
})(NIN);