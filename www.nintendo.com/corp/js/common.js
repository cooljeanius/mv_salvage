var NIN = NIN || {};

(function( $objNS ){
	'use strict';

	$objNS.common = function ( $objOptions ) {

		var navBreakpoint = 600,
			speed           = 0.3,
			elMenuToggle    = $('.menu-toggle'),
			elHeader        = $('#global-header'),
			elSearchInput   = elHeader.find('input[type=search]'),
			elExpandedNavContainer = $("#global-header .expanded-nav-container"),
			expandedNavEase = Expo.easeInOut,
			currentSection = "",
			navMenuIsExpanded = false,
			searchMenuIsExpanded = false,
			navIsAnimating = false,
			elsNavLinks = $("#global-header nav ul li a"),
			elPageContainer = $('#page-container'),
			elBackToTop     = $('a.back-to-top'),
			elBody          = $('body'),
			elWindow        = $(window),
			elTopNav 		= $(".top-nav"),
			elChangeRegion  = $(".top-nav-change-region"),
			elCommon        = $("alps-account-nav"),
			elSearchOnLink  = $("a.top-nav-search"),
			elSearchContainer = $(".global-header-search"),
			elSearchContainerChildren = $(".global-header-search > *"),
			elHeaderOverlay = $("#header-overlay"),
			elHeaderSearchOverlay = $("#header-search-overlay"),
			elSearchCloseButton = $("#search-close-button"),
			elsExpandedNavLinks = $(".expanded-nav a"),
			elsQuickLinks = $("#global-header .top-nav .global-header-search .dropdown #quick-links ul li a"),
			elExpandedNavContainerBackgrounds = $(".expanded-nav-container-backgrounds"),
			htmlBody = $("html, body"),
			accordionWidget,
			isToasterActive = false,
			toasterInactiveInterval = null,
			currentScrollTop = $(window).scrollTop(),
			winWidth;



		function _initialize () {
			bindEvents();

			accordionWidget = new $objNS.accordion('.accordion', {});

			if ( $objNS.is3DS ) {
				elBody.addClass('nin3DS');
			}

			if ( $objNS.isNew3DS ) {
				elBody.addClass('new3DS');
			}

			resizeWindow();
			_initModals();
			_initModalVideos();

			// keep all search bars consistent
			var initialSearchTerm = $("#search-games").val();
		  	$('input[type=search]').each(function(){
				$(this).val(initialSearchTerm);
			});

			$('input[type=search]').bind('input', function() {
				var newValue = $(this).val();
			  	$('input[type=search]').each(function(){
					$(this).val(newValue);
				});
			});
		}

		function _initModals() {
			if( $('.modal-trigger').length && !$objNS.is3DS ) {
				var modal = new $objNS.modalWindow( '.modal-trigger', {});
					modal.initialize();
			}
		}

		function _initModalVideos() {
			if( $('.modal-video-trigger').length && !$objNS.is3DS ) {
				var videoModal = new $objNS.modalWindow( '.modal-video-trigger', {
					strClassName: 'modal-video',
					videoOnly: true
				});
				videoModal.initialize();
			}
		}

		function fireNavClickEvent(eventData) {
			var navClickEvent = document.createEvent("CustomEvent");
			navClickEvent.initCustomEvent("NintendoGlobalNavClick", true, true, { eventData: eventData.replace("threeds", "3ds") });
			window.dispatchEvent(navClickEvent);
		}


		function navSectionToggle($event) {
			var newSection = $($event.currentTarget).data("section");
			if ( $("html").hasClass("touch") || ( $event.originalEvent === undefined ) ) {
				$event.preventDefault();
				$event.stopPropagation();

				if ( newSection == currentSection ) {
					hideNavMenu();
				} else {
					elHeader.removeClass(currentSection);
					currentSection = newSection;
					elHeader.addClass(currentSection);
					
					if ( $("html").hasClass("touch") ) {
						fireNavClickEvent(currentSection);
					}

					if (!navMenuIsExpanded) {
						expandNavMenu();
						navMenuIsExpanded = true;
					}
				}
			} else {
				fireNavClickEvent(newSection);
			}
		}

		function expandNavMenu () {
			if ( !navIsAnimating ) {
				navIsAnimating = true;
				elExpandedNavContainer.css({ height: 'auto'	});
				var expandedNavHeight = elExpandedNavContainer.outerHeight( true ),
					windowHeight = elWindow.height(),
					headerHeight = elHeader.height(),
					height;

				var doAdjustScreenSize = (windowHeight < expandedNavHeight + headerHeight || winWidth <= navBreakpoint  );

				if ( doAdjustScreenSize ) {
					height = windowHeight - headerHeight;
					elExpandedNavContainer.css({ overflow: 'auto' });
				} else {
					height = expandedNavHeight;
					elExpandedNavContainer.css({ overflow: 'hidden' });
				}

				elExpandedNavContainerBackgrounds.css({ "min-height": expandedNavHeight });

				elExpandedNavContainer.css({
					display: 'block',
					height: 0
				});

				elHeaderOverlay.addClass("active");

				TweenMax.to( elExpandedNavContainer, speed, {
					height: height,
					ease: expandedNavEase,

					onComplete: function(){
						navIsAnimating = false;
					}
				});
			}
		}

		function hideNavMenu() {
			if ( !navIsAnimating ) {
				navIsAnimating = true;

				elHeaderOverlay.removeClass("active");

				TweenMax.to( elExpandedNavContainer, speed, {
					height: 0,
					margin: 0,
					ease: expandedNavEase,

					onComplete: function(){
						elExpandedNavContainer.css({
							display: 'none',
							height: 'auto'
						});

						elHeader.removeClass( currentSection );

						currentSection = "";

						navMenuIsExpanded = false;
						navIsAnimating = false;
					}
				});
			}
		}

		function resizeNavMenu() {
			if ( !navIsAnimating && navMenuIsExpanded ) {
				elExpandedNavContainer.css({ height: 'auto' });
				var expandedNavHeight = elExpandedNavContainer.outerHeight( true ),
					windowHeight = elWindow.height(),
					headerHeight = elHeader.height(),
					height;

				var doAdjustScreenSize = (windowHeight < expandedNavHeight + headerHeight  || winWidth <= navBreakpoint  );

				if ( doAdjustScreenSize ) {
					height = windowHeight - headerHeight;
					elExpandedNavContainer.css({ overflow: 'auto', height: height });
				} else {
					height = expandedNavHeight;
					elExpandedNavContainer.css({ overflow: 'hidden', height: height });
				}

				elExpandedNavContainerBackgrounds.css({ "min-height": expandedNavHeight });
			}
		}

		function _initAccordion () {
			accordionWidget.initialize();
		}

		function resetAccordion () {
			accordionWidget.remove();
		}

		function desktopResize () {
			resetAccordion();
		}

		function tabletResize () {
			resetAccordion();
		}

		function mobileResize () {
			_initAccordion();
		}



		/**
		 * Trigger custom events when certain breakpoints are triggered
		 * @return {void}
		 */
		function resizeWindow ( $forceEvent ) {
			winWidth = window.innerWidth;

			elBody.trigger('change');

			if ( winWidth <= $objNS.mediaQuery.mobile ) { // Trigger Mobile
				if ( $objNS.screenSize !== 'mobile' ) {
					$objNS.screenSize = 'mobile';
					elBody.trigger('mobile');
					elBody.trigger('breakpoint');
				}
			} else if ( winWidth <= $objNS.mediaQuery.tablet ) { // Trigger Tablet
				if ( $objNS.screenSize !== 'tablet' ) {
					$objNS.screenSize = 'tablet';
					elBody.trigger('tablet');
					elBody.trigger('breakpoint');
				}
			} else { 	// Trigger Desktop
				if ( $objNS.screenSize !== 'desktop' ) {
					$objNS.screenSize = 'desktop';
					elBody.trigger('desktop');
					elBody.trigger('breakpoint');
				}
			}

			resizeSearchBar();
			resizeNavMenu();

			if ( winWidth <=  navBreakpoint ) {
				if ( elHeader.hasClass("amiibo") ||  elHeader.hasClass("news") || elHeader.hasClass("support") || elHeader.hasClass("playnintendo") || elHeader.hasClass("mynintendo") ) {
					elHeader.removeClass("amiibo news support playnintendo mynintendo");
					hideNavMenu();
				}
			} else {
				if ( elHeader.hasClass("additional") ) {
					elHeader.removeClass("additional");
					hideNavMenu();
				}
			}
		}

		/**
		 * Force the breakpoint event to fire
		 * @return {void}
		 */
		function _triggerBreakpoint() {
			resizeWindow( true );
		}

		function onWindowScroll ( $event ){

			var scrollTop = elWindow.scrollTop(),
			direction = currentScrollTop - scrollTop;
			clearTimeout(toasterInactiveInterval);

			if ( $objNS.screenSize !== 'desktop' ) {

				if ( scrollTop <= 400 && direction > 0 ) {
				    toasterHide();

				} else if ( scrollTop >= 400 && !isToasterActive && direction !== 0 ) {
					toasterShow();
				}

				toasterInactiveInterval = setTimeout(function() {
					toasterInactive();
				}, 1000);

			} else if(isToasterActive){
				toasterHide();
			}
			

			// nav peekaboo
			if ( scrollTop > 96 ) {
				$("body").addClass("not-at-top");
				
				if (!navMenuIsExpanded) {
					if ( direction >= 0  ) {
						$("body").addClass("scrolling-up");
					} else {
						$("body").removeClass("scrolling-up");
					}
				}
			} else if ( $("body").hasClass("not-at-top") && scrollTop < 1 ) {
				$("body").removeClass("not-at-top");
			}


			currentScrollTop = scrollTop;
		}


		function toasterHide () {
			elBackToTop.removeClass("is-on is-inactive").addClass("is-off");
			isToasterActive = false;
			setTimeout(function() {
				elBackToTop.addClass("is-hidden");
			}, 600);
		}


		function toasterShow () {
			isToasterActive = true;
			elBackToTop.removeClass("is-off is-inactive is-hidden").addClass("is-on");
		}

		function toasterInactive() {
			if(isToasterActive) {
				isToasterActive = false;

				elBackToTop.removeClass("is-on is-off is-hidden").addClass("is-inactive");
			}
		}



		function scrollToTop ( $event ) {
			$event.preventDefault();

			TweenMax.to(window, 0.5, {
				scrollTo:{y:0, x:0},
				ease: Expo.easeInOut
			});
		}

		function onSearchFormSubmit( $event ) {
			$event.preventDefault();
			var formData = $(this).serializeArray();
			var searchTerms = formData[0].value;

			if ( searchTerms == "" ) {
				return;
			}

			for (var sub in $objNS.substitutions) {
				if (~searchTerms.toLowerCase().indexOf(sub))
					searchTerms = searchTerms.replace(new RegExp(sub, 'ig'), $objNS.substitutions[sub]);
			}

			window.location = '/search/#/results/' + searchTerms + '/1';
		}

		function showSearchBar() {
			searchMenuIsExpanded = true;
			hideNavMenu();

			var rightPosition = elChangeRegion.outerWidth(true) + elCommon.outerWidth(true) + 10;
			elSearchContainer.css({ left: 120, display: "block", right: rightPosition + "px" });

			elSearchOnLink.addClass("active");
			elHeaderOverlay.addClass("active");
			elHeaderSearchOverlay.addClass("active");

			elSearchContainerChildren.css({ opacity: 1 });

			elSearchInput.focus();

		}

		function hideSearchBar() {
			searchMenuIsExpanded = false;
			var leftPosition = elSearchContainer.width() + 120;

			elHeaderOverlay.removeClass("active");
			elHeaderSearchOverlay.removeClass("active");

			elSearchContainerChildren.css({ opacity: 0 });
			elSearchContainer.css({ left: leftPosition });

			elSearchContainer.css({ display: "none" });
			elSearchInput.blur();

			elSearchOnLink.removeClass("active");
		}

		function resizeSearchBar() {
			if ( elSearchContainer.is(':visible') ) {
				var rightPosition = elChangeRegion.outerWidth(true) + elCommon.outerWidth(true) + 10;
				elSearchContainer.css({ right: rightPosition + "px" });
			}
		}

		function onHeaderOverlayClick() {
			hideSearchBar();
			hideNavMenu();
		}

		function onHoverToCloseNav() {
			if ( navMenuIsExpanded && !navIsAnimating && winWidth >  navBreakpoint ) {
				hideNavMenu();
			}
		}

		function onSearchNavLinkClick() {
			if ( searchMenuIsExpanded ) {
				$('.search-form').submit();
			} else {
				showSearchBar();
			}
		}

		function trackExpandedNavButtonClick($event) {
			$event.preventDefault();
			fireNavClickEvent(currentSection + ":" + $(this).data("omniture"));
			var url = $(this).attr("href");
			setTimeout(function() {
				window.location.href = url;
			}, 200)
		}

		function onSearchCloseButtonClick() {
			elSearchInput.val("");
			hideSearchBar();
			elSearchCloseButton.removeClass("active");
		}


		function bindEvents () {
			elWindow.on( 'resize', resizeWindow );
			elWindow.on( 'scroll', onWindowScroll );
			document.addEventListener("touchmove", onWindowScroll);

			elBody.on( 'desktop', desktopResize );
			elBody.on( 'tablet', tabletResize );
			elBody.on( 'mobile', mobileResize );

			elsNavLinks.on( 'click', navSectionToggle );

			elSearchOnLink.on( 'click', onSearchNavLinkClick);

			elHeaderOverlay.on( 'click', onHeaderOverlayClick)

			elHeaderSearchOverlay.on( 'click', onHeaderOverlayClick)

			var timer, $hoveredNavTab;
			elsNavLinks.hover(function(e){
				$hoveredNavTab = $(this);
			    timer = setTimeout(function(){
					if ( $("html").hasClass("no-touch") && ( $hoveredNavTab.data("section") != currentSection ) ) {
						$hoveredNavTab.click();
					}
			    },  ( navIsAnimating || !navMenuIsExpanded ) ? 600: 200);
			}, function(){
			    clearTimeout(timer);
			});

			elHeaderOverlay.on( 'mousemove', onHoverToCloseNav );

			elTopNav.on( 'mousemove', onHoverToCloseNav );

			$('.search-form').on('submit', onSearchFormSubmit);

			elsExpandedNavLinks.on ( 'click', trackExpandedNavButtonClick )

			elBackToTop.on('click', scrollToTop );

			elSearchCloseButton.on('click', onSearchCloseButtonClick );

			elsQuickLinks.on('click', hideSearchBar );

			elSearchInput.on('input propertychange paste', function() {
				if ( $(this).val().length > 0 ) {
					elSearchCloseButton.addClass("active");
				} else {
					elSearchCloseButton.removeClass("active");
				}
			});

			if ( $("#search-games").length > 0 ) {
				var gameSearchAutoSuggest = $objNS.autosuggest( "#search-games", "#games-search-autosuggest", "#gsa-search-autosuggest" );
				gameSearchAutoSuggest.initialize();
			}
		}


		return {
			initialize: _initialize,
			triggerBreakpoint: _triggerBreakpoint
		};
	};
})(NIN);






// STRING.include() polyfill.
if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
    'use strict';
    if (typeof start !== 'number') {
      start = 0;
    }
    
    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}

