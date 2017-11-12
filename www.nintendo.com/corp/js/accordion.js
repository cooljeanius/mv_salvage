/**
*	Accordion
*		- Collapses content into a drawer
*
*	AUTHOR: AB
*	DEPENDENCIES:
*		jquery 1.7
*
**/

var NIN = NIN || {};

(function( $objNS ){
	'use strict';


	$objNS.accordion = function( $target, $objOptions ) {

		var wrapper = $($target);
		var options = $.extend({
			speed           : 200,
			trigger         : '.trigger',
			content         : '.content',
			closedClass     : 'closed',
			multipleOpen    : false,
			scrollToTrigger : true
		}, $objOptions);

		var trigger = $(options.trigger);
		var isAnimating = false;



		function _init(){
			_closeAll();
			_addEventListeners();
		}

		function _toggle(trigger){
			var content = trigger.parent().next(options.content),
				elItem = trigger.parent();
			if(!isAnimating){
				isAnimating = true;


				// If Item is already open, close it
				if ( !elItem.hasClass( options.closedClass ) ) {
				    _slideClose(elItem);

				} else { // If item is closed

					// If multiple items can be open is enabled
					if ( options.multipleOpen ) {

						if(elItem.hasClass( options.closedClass )){
							_slideOpen(elItem);
						} else {
							_slideClose(elItem);
						}

					} else { // If multiple items can be open is disabled
					    _closeAll();

						if(elItem.hasClass( options.closedClass )){
							_slideOpen(elItem);
						} else {
							_slideClose(elItem);
						}
					}
				}
			}
		}

		function _addStripes(){
			wrapper.find('>li:nth-child(odd)').addClass('stripe');
		}

		function _scrollToTrigger ( elItem ) {
			var scrollYPos = elItem.offset().top;
			
			// take into account secondary nav
			if ( $("#section-header .pin").outerHeight() ) {
				scrollYPos -= $("#section-header .pin").outerHeight();
			}
			TweenMax.to(window, 0.5, {
				scrollTo:{y:scrollYPos, x:0}
			});
		}

		function _closeAll(){
			wrapper.find(options.trigger).parent().addClass( options.closedClass )
				.find(options.content).slideUp(options.speed, 'swing' );
		}

		function _slideOpen(elItem){
			elItem.removeClass( options.closedClass )
				.find(options.content)
					.slideDown(options.speed, 'swing', $.proxy(_slideCallback, this));
		}

		function _slideClose(elItem){
			elItem.addClass( options.closedClass )
				.find(options.content)
				.slideUp(options.speed, 'swing', $.proxy(_slideCallback, this));
		}


		function _slideCallback(){
			isAnimating = false;

			var trigger = $(this).prev();

			if ( options.scrollToTrigger && !$objNS.is3DS ) {
				_scrollToTrigger( trigger );
			}
		}

		function _showAll () {
			var elLists = $( options.content ).parent();

			elLists.each( function( i, list ){
				$(list).removeClass( options.closedClass );
				$(list).find(options.content).show();
			});
		}

		function _reset(){
			_showAll();
			wrapper.off( $objNS.clickTouch );
		}

		function _addEventListeners(){

			wrapper.on('click', options.trigger, function( e ){
				e.preventDefault();
				_toggle($(this));
			});
		}

		return {
			initialize: _init,
			remove: _reset
		};

	};
})( NIN );




