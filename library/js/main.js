//@codekit-prepend "vendor-libs/jRespond.1.0.js"; // Responsive JS solution
//@codekit-prepend "vendor-libs/response-0.7.8.js"; // Responsive Image / Content solution
//@codekit-prepend "vendor-libs/jquery.bxslider4.1.1.js"; // BXSlider - Content slider
//@codekit-prepend "vendor-libs/jquery.hoverIntent.1.8.1.js"; // HoverIntent
//@codekit-prepend "vendor-libs/jquery.superfish.1.7.5.js"; // Superfish Menus
//@codekit-prepend "vendor-libs/jquery.fancybox.pack.js"; // 

(function(window, document, $, R, J) {
	
	// Setup our Responsive Content Object	
	R.create({ 
		prop: "width",
		prefix: "src",
		breakpoints: [0, 320, 640, 960, 1280],
		lazy: true
	});
	

	// ===== HOME PAGE
	// ================================================================================
	
	// smooth scrolling
	$('a[href*=#]:not([href=#])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      if (target.length) {
	        $('html,body').animate({
	          scrollTop: target.offset().top-50
	        }, 500);
	        return false;
	      }
	    }
	  });

	// ===== CONTACT FORMS
	// ================================================================================

	var contactForm = {
		settings: {
			input: $('.contact-form .input-gen')
		},
		init: function() {
			this.setInitialState();
			this.bindUIActions();
		},
		bindUIActions: function() {
			this.settings.input.on('focus blur', function(e) {
				contactForm.toggleLabelPosition($(this), e);
			});
		},

		// Looks for the presence of values witin form fields to determine if form
		// aesthetics (e.g. labels) need to change.
		setInitialState: function() {
			this.settings.input.each(function(i) {
				if($(this).val() != '') {
					$(this).parent('fieldset').addClass('label-up');
				}
			});
		},

		// Determines the position of a field's label based on focus and value
		toggleLabelPosition: function(elem, e) {
			if(e.type == 'focus') {
				elem.parent('fieldset').addClass('label-up');
			}
			if((e.type == 'blur') && (elem.val() == '')) {
				elem.parent('fieldset').removeClass('label-up');
			}
		}
	};
	contactForm.init();


	/*-----Internal Items------*/	
	// THE BLACK MAGIC OF RESPONSIVE JAVASCRIPT LIVES BELOW....
	var jRes = new J([ // Setup of jResponse
		{ label: '4', enter: 0, exit: 639 },
		{ label: '8', enter: 640, exit: 959 },
		{ label: '12', enter: 960, exit: 1279 },
		{ label: '16', enter: 1280, exit: 10000 }
	]);
	
	jRes.addFunc({ // Function Called On ALL Breakpoints during a Resize
		breakpoint: '*',
		enter: function() { // A function called on enter of ANY breakpoint

		},
		exit: function() { // Called on Exit of ANY breakpoing
			
		}
	});
	
	jRes.addFunc([ // Enter and Exit callbacks based on breakpoints
		{
			breakpoint: '16',
			enter: function() {

			},
			exit: function() {

			}
		},{
			breakpoint: '12',
			enter: function() {
				
			},
			exit: function() {

			}
		},{
			breakpoint: '8',
			enter: function() {

			},
			exit: function() {
				
			}
		},{
			breakpoint: '4',
			enter: function() {
			},
			exit: function() {
			}
		},{
			breakpoint: ['12', '16'], // Both 12 and 16 columns layouts
			enter: function() {
				// Main Navigation Element
				$('.navigation-list').superfish({
					delay : 300,
					animation : {opacity:'show',height:'show'},
					speed : 'fast',
					autoArrows : false
				});
			},
			exit: function() {
				// Main Navigation Element
				$('.navigation-list').superfish('destroy');
			}
		},{
			breakpoint: ['4', '8'], // Both 4 and 8 columns layouts
			enter: function() {
					
				// Our Mobile Navigation - We are going to leave this active during all breakpoints
				$('.navigation-list').removeClass('active');
				(function setup_mobile_nav(){
					// Do we have our Mobile Nav setup yet, if not, then let's add our .has-menu
					if($('.has-menu').length == 0){
						$('.sub-menu').siblings('a').addClass('has-menu').append('<span class="arrow"></span>');
					} else { // If was setup, let's close everything if a user is coming back
						close_menus();
					}
					
					var $menu = $('.navigation-list'),
						$menulink = $('.toggle-mobile-menu'),
						$menuTrigger = $('.has-menu .arrow'),
						close_menus = function(){
							$('.has-menu, .sub-menu').removeClass('active');
							$('.close-menu').stop().fadeOut(300);
						};
					
					$('.close-menu').on({
						'click' : function(){
							$menulink.trigger('click');
							return false;
						},
						'touchstart' : function(){
							$(this).trigger('click');
							return false;
						}
					});
					
					$menulink.on({
						'click' : function(){
							$menu.toggleClass('active');
							$('.close-menu').stop().fadeToggle(300);
							return false;
						},
						'touchstart' : function(){
							$(this).trigger('click');
							return false;
						}
					});
					$menuTrigger.on({
						'click' : function(){
							$(this).parent('.has-menu').toggleClass('active').next('ul').toggleClass('active');
							return false;
						},
						'touchstart' : function(){
							$(this).trigger('click');
							return false;
						}
					});
				}());
			},
			exit: function() {
				// Main Navigation Element
				$('.navigation-list, .has-menu, .sub-menu').removeClass('active');
				$('.close-menu').fadeOut(500);

				// Header Search Element
				$('.search-form-container').css({'max-height':'50px'});
				$('.search-form-container [type="submit"]').removeClass('visible');
			}
		}
	]);

}(this, this.document, this.jQuery, this.Response, this.jRespond));