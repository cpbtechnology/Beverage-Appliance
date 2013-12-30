var App = App || {};

App.Global = (function (window, document) {
	var /*$menuButton = $('#menu_header li:nth-child(1) a'),*/
        $serveButton = $('#menu_header li:nth-child(1) a'),
        $mixButton = $('#menu_header li:nth-child(2) a'),
        $enjoyButton = $('#menu_header li:nth-child(3) a'),
        $footerMenu = $('#menu_footer'),
        $menuDrinks = $('#menu_drinks li a'),
        $menuContainer = $('#menu_background'),
        $hexagonBackground = $('#hexagon'),
        $menuLoader = $('#menu_loader'),
        $menuPulse = $('#menu_pulse'),
				$pageOverlay = $('#page_overlay'),
				$initialResponseContainer = $('#initial_response_container'),
				$initialResponsePositive = $('#response_yes'),
				$initialResponseNegative = $('#response_no'),
				$activeResponseCopy = $('#modal_copy li.active'),
				$inactiveResponseCopy = $('#modal_copy li.inactive'),
				$initalResponseAdditional = $('#response_additional'),
				$activeModalHeader = $('.active_header'),
				$inactiveModalHeader = $('.inactive_header');

	var menuButtonsLocationsOpen = [[364, -343], [227, -421], [77, -421], [-60, -343], [-135, -213], [-135, -49], [-60, 81], [77, 156], [227, 156], [364, 81]],
      menuButtonsLocationsClose = [[262, -196], [237, -196], [96, -191], [55, -160], [55, -165], [55, -88], [55, -88], [96, -88], [237, -88], [262, -74]];

	var menuCounter = 1,
      inactiveDrink,
      menuItemSelected = '',
      currentState = 'menu',
      currentFooterClassAttached = '',
      connectionDataReceived,
      userClickDoOnce = false,
      userInteraction = false;

	var connection;
	var connectinArduino;
	var stateConversion = { 0: 'connecting', 1: 'connected', 2: 'reconnecting', 4: 'disconnected' };

	/*
	function connectionStateChanged(state) {

		console.log('SignalR state changed from: ' + stateConversion[state.oldState]
     + ' to: ' + stateConversion[state.newState]);
	}
	*/

	var self = {
		'init': function () {
			//self.initConnections();
			self.initEventListeners();
			//self.initMenuPulse();
		},

		'initConnections': function () {
			//alert('about to init connections');
			connection = $.connection('http://192.168.1.100:8081/browser');
			connectinArduino = $.connection('http://192.168.1.100:8081/arduino');

			connection.stateChanged(connectionStateChanged);
			connection.start();
			connectinArduino.start();

			connection.received(function (data) {
				switch (data) {
					case 'drink_finished':
						self.hideLoader();
						self.selectHeaderAnimation('enjoy');
						break;
				}
				connectionDataReceived = data;
				console.log('data received: ' + data);
			});
		},

		'initEventListeners': function () {
			$initialResponsePositive.on('click', function (e) {
				e.preventDefault();

				self.hideInitialComponents();
			});

			$initialResponseNegative.on('click', function (e) {
				e.preventDefault();

				$activeResponseCopy.hide();
				$inactiveResponseCopy.show();
				$initialResponsePositive.hide();
				$activeModalHeader.hide();
				$inactiveModalHeader.show();
				$(this).hide();

				$initalResponseAdditional.show();
			});

			$initalResponseAdditional.on('click', function (e) {
				e.preventDefault();

				$activeResponseCopy.show();
				$inactiveResponseCopy.hide();
				$initialResponsePositive.show();
				$initialResponseNegative.show();
				$activeModalHeader.show();
				$inactiveModalHeader.hide();

				$(this).hide();
				//self.hideInitialComponents();
			});
			//self.animateHexagon(530, 457, 120, 246, true);
			/*$menuButton.on('click', function (e) {
			e.preventDefault();

			if (!userClickDoOnce) {
			//console.log('click on menu -> serve');
			userClickDoOnce = true;
			userInteraction = true;
			self.animateHexagon(530, 457, 120, 246, true);
			}
			});*/

			$serveButton.on('click', function (e) {
				e.preventDefault();

				if (menuItemSelected != '') {
					if (!userClickDoOnce) {
						userClickDoOnce = true;
						userInteraction = true;
						self.animateMenuButtons('close');
						self.showLoader();
					}
				}
			});

			$mixButton.on('click', function (e) {
				e.preventDefault();
			});

			$enjoyButton.on('click', function (e) {
				e.preventDefault();
			});
		},

		'hideInitialComponents': function () {
			$pageOverlay.animate({
				opacity: 0
			}, 500, 'linear', function (e) {
				$(this).hide();
			});

			$initialResponseContainer.animate({
				opacity: 0
			}, 500, 'linear', function (e) {
				$(this).hide();

				self.animateHexagon(530, 457, 120, 246, true);
			});
		},

		'displayInitialComponents': function () {
			$pageOverlay.show();
			$pageOverlay.animate({
				opacity: 0.5
			}, 500, 'linear');

			$initialResponseContainer.show();
			$initialResponseContainer.animate({
				opacity: 1
			}, 500, 'linear');

			$activeResponseCopy.show();
			$inactiveResponseCopy.hide();
			$initialResponsePositive.show();
			$initialResponseNegative.show();
			$activeModalHeader.show();
			$inactiveModalHeader.hide();
			$initalResponseAdditional.hide();
		},

		'animateHexagon': function (hWidth, hHeight, hMarTop, hMarLeft, continueProcess) {
			$hexagonBackground.animate({
				height: hHeight + 'px',
				marginLeft: hMarLeft + 'px',
				marginTop: hMarTop + 'px',
				width: hWidth + 'px'
			}, 1000, 'easeOutBack', function () {
				if (continueProcess) {
					//self.selectHeaderAnimation('serve');
					self.animateMenuButtons('open');
				}
			});
		},

		'selectHeaderAnimation': function (headerOption) {
			switch (headerOption) {
				case 'serve':
					self.animateHeaders($enjoyButton, $serveButton);
					self.animateFooter('serveDrink');
					break;
				case 'mix':
					self.animateHeaders($serveButton, $mixButton);
					self.animateFooter('mixDrink');
					break;
				case 'enjoy':
					self.animateHeaders($mixButton, $enjoyButton);
					self.animateFooter('enjoyDrink');
					break;
				default:
					self.animateHeaders($enjoyButton, $serveButton);
					self.animateFooter('serveDrink');
			}
		},

		'animateHeaders': function ($currentMenuButton, $nextNextButton) {
			$currentMenuButton.animate({
				opacity: 0
			}, 500, 'linear', function () {
				$(this).hide();

				$nextNextButton.css({ 'display': 'block' });
				$nextNextButton.animate({
					opacity: 1
				}, 500, 'linear');
			});
		},

		'animateFooter': function (footerHeader) {
			$footerMenu.removeClass(currentFooterClassAttached);

			switch (footerHeader) {
				case 'serveDrink':
					currentFooterClassAttached = 'switch_text_serve';
					break;
				case 'mixDrink':
					currentFooterClassAttached = 'switch_text_mix';
					break;
				case 'enjoyDrink':
					currentFooterClassAttached = 'switch_text_enjoy';
					setTimeout(function () {
						self.resetMenu();
					}, 3000);
					break;
				default:
					currentFooterClassAttached = '';
			}

			$footerMenu.addClass(currentFooterClassAttached);
		},

		'animateMenuButtons': function (direction) {
			var liLength = $('#menu_drinks li.drink_holder').length;

			if (menuCounter <= liLength) {
				var buttonMarginTop,
                    buttonMarginLeft,
                    buttonZIndex;

				if (direction == 'open') {
					buttonMarginTop = menuButtonsLocationsOpen[menuCounter - 1][0];
					buttonMarginLeft = menuButtonsLocationsOpen[menuCounter - 1][1];
					buttonZIndex = 9999;
				} else {
					buttonMarginTop = menuButtonsLocationsClose[menuCounter - 1][0];
					buttonMarginLeft = menuButtonsLocationsClose[menuCounter - 1][1];
					$('#menu_drinks li:nth-child(' + menuCounter + ') a').css({ 'z-index': '1' });
					buttonZIndex = 1;
				}

				$('#menu_drinks li:nth-child(' + menuCounter + ') a').animate({
					marginTop: buttonMarginTop + 'px',
					marginLeft: buttonMarginLeft + 'px',
					zIndex: buttonZIndex
				}, 300, 'easeOutBack', function () {
					if (direction == 'open') {
						$('#menu_drinks li:nth-child(' + menuCounter + ') a .drink-title').show();
					} else {
						$('#menu_drinks li:nth-child(' + menuCounter + ') a .drink-title').hide();
					}

					menuCounter++;
					self.animateMenuButtons(direction);
				});
			} else {
				menuCounter = 1;
				self.animateHexagon(400, 345, 172, 307, false);
			}

			self.initDrinksEvents();
		},

		'initDrinksEvents': function () {
			userClickDoOnce = false;

			$menuDrinks.on('click', function (e) {
				e.preventDefault();

				var drinkSelected = $(this).attr('href').split('-'),
            liLength = $('#menu_drinks li.drink_holder').length;

				menuItemSelected = $(this).attr('drink-data-id');

				userInteraction = false;
				self.initMenuPulse();

				if (menuItemSelected != '') {
					for (var i = 1; i <= liLength; i++) {
						if (i != Number(drinkSelected[1])) {
							$('#menu_drinks li:nth-child(' + i + ') a').removeClass('active_drink'); //.addClass('over_bbackground');
						} else {
							$('#menu_drinks li:nth-child(' + i + ') a').addClass('active_drink');
						}
					}
				}
			});
		},

		'showLoader': function () {
			console.log('sending data : ' + menuItemSelected);

			//console.log('about to send -- connection = ' + stateConversion[connectinArduino.state]);
			//connectinArduino.send(menuItemSelected);

			// For now using HTTP POST to communicate to server, we should switch to WebSockets: http://socketo.me/
			$.ajax({
				type: "POST",
					url: "/services/Post/",
					data: "action=make-drink&drinkId=" + menuItemSelected
				}).done(function(data) {
					console.log(data);
					self.hideLoader();
					self.selectHeaderAnimation('enjoy');
				});

			self.selectHeaderAnimation('mix');

			$menuLoader.show();
			$menuLoader.animate({
				opacity: 1
			}, 500, 'linear', function () {
				/* for testing until message received from connection*/
				/*setTimeout(function () {
					self.hideLoader();
					self.selectHeaderAnimation('enjoy');
				}, 5000);*/
			});
		},

		'hideLoader': function () {
			$menuLoader.animate({
				opacity: 0
			}, 500, 'linear', function () {
				$(this).hide();
			});
		},

		'resetMenu': function () {
			var liLength = $('#menu_drinks li').length;

			userClickDoOnce = false;
			menuItemSelected = '';

			self.selectHeaderAnimation('serve');
			self.displayInitialComponents();
			//self.animateHexagon(530, 457, 120, 246, true);

			for (var i = 1; i <= liLength; i++) {
				$('#menu_drinks li:nth-child(' + i + ') a').removeClass('over_bbackground').removeClass('out_bbackground').removeClass('active_drink');
			}
		},

		'initMenuPulse': function () {
			$menuPulse.removeClass('pulse_centered').show();
			$menuPulse.animate({
				height: 355 + 'px',
				width: 355 + 'px',
				marginTop: 155 + 'px',
				marginLeft: 324 + 'px'
			}, 1000, 'easeOutBack', function () {
				$(this).removeAttr('style');
				$(this).addClass('pulse_centered');

				if (!userInteraction) {
					self.initMenuPulse();
				} else {
					$(this).hide();
				}
			});
		}
	}

	return self;
})(this, this.document);