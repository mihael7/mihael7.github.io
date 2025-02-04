
;(function(jQuery) {
    var headerScroll,    parallaxEffect,
        blocksAtSameHeight,




        /* =============================================================================
        Settings
        ============================================================================= */
// Choose between ( fixed / autoHide / normal )
        headerScroll = 'fixed';

// Enable or disable Parallax Effect ( true / false )
    parallaxEffect = true;

// Make blocks at same Height as grid ( true / false )
    blocksAtSameHeight = true;





    /* =============================================================================
    Ajax
    ============================================================================= */
    jQuery.ajaxPrefilter(function (options) {
        'use strict';
        options.cache = true;
    });




    /* =============================================================================
    Document Ready Function
    ============================================================================= */
    jQuery(document).ready(function () {

        'use strict';

        var isWin,
            isOpera,
            headerTimer,
            currentPosition,



            /* =========================================================================
            Opera on Win Fix
            ========================================================================= */
            isWin = /win/.test(navigator.platform.toLowerCase());
        isOpera = /opera/.test(navigator.userAgent.toLowerCase());

        if (isWin) {
            if (isOpera) {
                jQuery('html').addClass('ie9');
            }
        }

        /* =========================================================================
        UP Button
        ========================================================================= */
        /* Button
        ------------------------------------------------------------------------- */
        jQuery('#up-button a').on('click', function () {
            jQuery('html, body').animate({scrollTop: '0'}, 800);
            return false;
        });

        /* Window Scroll
        ------------------------------------------------------------------------- */
        jQuery(window).scroll(function () {
            currentPosition = jQuery(window).scrollTop();
            if (currentPosition >= 300) {
                jQuery('#up-button').addClass('correct-position');
            } else {
                jQuery('#up-button').removeClass('correct-position');
            }
        });

        /* =========================================================================
        LPB Ripple Animation
        ========================================================================= */
        /* Main Function
        ------------------------------------------------------------------------- */
        function lpbuilderRippleAnimationfn(xAxes, yAxes) {

            jQuery('.lpbuilder-ripple').remove();

            var rippleTopPosition,
                rippleLeftPosition,
                el = jQuery('.lpbuilder-ripple-animation'),
                elPosTop = el.offset().top,
                elPosLeft = el.offset().left,
                elouterWidth = el.outerWidth(),
                elouterHeight = el.outerHeight();

            el.prepend('<span class="lpbuilder-ripple"></span>');

            if (elouterWidth >= elouterHeight) {
                elouterHeight = elouterWidth;
            } else {
                elouterWidth = elouterHeight;
            }

            rippleLeftPosition = xAxes - elPosLeft - elouterWidth / 2;
            rippleTopPosition = yAxes - elPosTop - elouterHeight / 2;

            jQuery('.lpbuilder-ripple').css({
                width: elouterWidth,
                height: elouterHeight,
                top: rippleTopPosition + 'px',
                left: rippleLeftPosition + 'px'
            }).addClass('ripple-animation');

        }

        /* Action
        ------------------------------------------------------------------------- */
        jQuery('body').on('click', '.wave-effect', function (e) {

            if (e.button === 2) {
                return false;
            }

            jQuery('.lpbuilder-ripple-animation').removeClass('lpbuilder-ripple-animation');
            jQuery(this).addClass('lpbuilder-ripple-animation');
            lpbuilderRippleAnimationfn(e.pageX, e.pageY);

        });







        /* =========================================================================
        Menu Button
        ========================================================================= */
        jQuery('.navbar-toggle').on('click', function () {
            jQuery('.navbar-toggle').toggleClass('lpbuilder-toggle');


        });






        /* Fixed Header Function
        ------------------------------------------------------------------------- */
        function fixedHeaderfn() {

            var headerEl = jQuery('.header-menu-container');

            headerEl = new Waypoint.Sticky({
                element: headerEl[0],
                stuckClass: 'header-menu-stuck',
                wrapper: '<div class="header-menu">'
            });

            jQuery(window).scroll(function () {

                currentPosition = jQuery(window).scrollTop();
                if (currentPosition >= 300) {
                    jQuery('.header-menu-stuck').addClass('header-menu-tiny');
                } else {
                    jQuery('.header-menu-stuck').removeClass('header-menu-tiny');
                }


                if (jQuery('.navbar-collapse').hasClass('in')) {
                    jQuery('.navbar-toggle').removeClass('lpbuilder-toggle');
                    jQuery('.navbar-collapse').removeClass('in').addClass('collapse');
                }

            });

            clearTimeout(headerTimer);

        }

        /* Auto Hide Header Function
        ------------------------------------------------------------------------- */
        function autoHideHeaderfn() {

            var headerEl = jQuery('.header-menu-container');

            headerEl = new Waypoint({
                element: headerEl[0],
                handler: function () {

                    var lastScrollTop = 0,
                        el = jQuery(this.element),
                        elParent = el.parent(),
                        elGParentHeight = elParent.parent().outerHeight(true);

                    elParent.css({height: el.outerHeight(true)});

                    jQuery(window).scroll(function () {

                        currentPosition = jQuery(window).scrollTop();

                        if (currentPosition > elGParentHeight) {

                            if (currentPosition > lastScrollTop) {
                                elParent.find('.header-menu-container').addClass('header-menu-autohide');
                                if (currentPosition >= 300) {
                                    jQuery('.header-menu-autohide').addClass('header-menu-tiny');
                                }
                            } else if (currentPosition < lastScrollTop) {
                                elParent.find('.header-menu-container').addClass('header-menu-stuck').removeClass('header-menu-autohide');
                            }

                        } else if (currentPosition < elGParentHeight && currentPosition < parseInt(elParent.offset().top, 10)) {
                            elParent.find('.header-menu-container').removeClass('header-menu-stuck');
                        }

                        if (currentPosition < 300) {
                            elParent.find('.header-menu-container').removeClass('header-menu-tiny');
                        }

                        lastScrollTop = currentPosition;

                    });

                }
            });

            clearTimeout(headerTimer);

        }

        /* Condition
        ------------------------------------------------------------------------- */
        if (headerScroll === 'fixed') {
            if (jQuery('.header-menu-container').length) {
                fixedHeaderfn();
            }
        } else if (headerScroll === 'autoHide') {
            if (jQuery('.header-menu-container').length) {
                autoHideHeaderfn();
            }
        }


        jQuery('ul.navbar-nav li ul').parent('li').addClass('parent-list');
        jQuery('.parent-list > a').append('<span class="menu-arrow"><i class="fa fa-angle-down"></i></span>');

        /* List
        ------------------------------------------------------------------------- */
        jQuery('.parent-list > ul').addClass('sub-menu');

        /* Parent Item
        ------------------------------------------------------------------------- */
        jQuery('.parent-list').each(function () {
            var el = jQuery('> .sub-menu', this);
            jQuery('> a', this).clone().prependTo(el).wrap('<li></li>');
        });


        /* Show / Hide Sub Menu
        ------------------------------------------------------------------------- */



        /* =========================================================================
        Swiper Slider
        ========================================================================= */
        /* Main Function
        ------------------------------------------------------------------------- */
        function swiperSliderfn() {
            jQuery('.lpbuilder-swiper-slider').each(function (index) {

                var grabTouchMouse,
                    sliderDirection,
                    el = jQuery(this),
                    slideItemsPerView,
                    slideItemsMDPerView,
                    slideItemsSMPerView,
                    slideItemsXSPerView,
                    centeredSlidesItems,
                    slideAnimationEffect,
                    windowWidth = jQuery(window).outerWidth(true);



                /* Slider, Pagination and Arrows IDs
                ----------------------------------------------------------------- */
                el.attr('id', 'lpbuilder-swiper-slider-' + index);


                /* Mouse Cursor
                ----------------------------------------------------------------- */
                grabTouchMouse = jQuery('#lpbuilder-swiper-slider-' + index).hasClass('fade-swiper-slider')
                    ? !1
                    : !0;

                /* Direction
                ----------------------------------------------------------------- */
                sliderDirection = jQuery('#lpbuilder-swiper-slider-' + index).hasClass('vertical-swiper-slider')
                    ? 'vertical'
                    : 'horizontal';

                /* Centerd Items
                ----------------------------------------------------------------- */
                centeredSlidesItems = jQuery('#lpbuilder-swiper-slider-' + index).hasClass('center-swiper-slider')
                    ? !0
                    : !1;

                /* Animation Effect ( fade / slide )
                ----------------------------------------------------------------- */
                slideAnimationEffect = jQuery('#lpbuilder-swiper-slider-' + index).hasClass('fade-swiper-slider')
                    ? 'fade'
                    : 'slide';

                /* Animation Effect ( coverflow )
                ----------------------------------------------------------------- */
                if (jQuery('#lpbuilder-swiper-slider-' + index).hasClass('coverflow-swiper-slider')) {
                    if (windowWidth < 1024) {
                        jQuery('#lpbuilder-swiper-slider-' + index).removeClass('swiper-container-3d');
                        jQuery('#lpbuilder-swiper-slider-' + index).find('.swiper-slide').css({transform: 'rotateY(0)'});
                        slideItemsPerView = '2';
                        slideAnimationEffect = 'slide';
                    } else {
                        slideAnimationEffect = 'coverflow';
                    }
                }

                /* Slide Items Per View ( on Large screen )
                ----------------------------------------------------------------- */
                slideItemsPerView = jQuery('#lpbuilder-swiper-slider-' + index).attr('data-swiper-items');
                if (slideItemsPerView === '' || slideItemsPerView === undefined) {
                    slideItemsPerView = 1;
                }

                /* Slide Items Per View ( on Medium screen )
                ----------------------------------------------------------------- */
                slideItemsMDPerView = jQuery('#lpbuilder-swiper-slider-' + index).attr('data-swiper-md-items');
                if (slideItemsMDPerView === '' || slideItemsMDPerView === undefined) {
                    slideItemsMDPerView = 2;
                }

                /* Slide Items Per View ( on Small screen )
                ----------------------------------------------------------------- */
                slideItemsSMPerView = jQuery('#lpbuilder-swiper-slider-' + index).attr('data-swiper-sm-items');
                if (slideItemsSMPerView === '' || slideItemsSMPerView === undefined) {
                    slideItemsSMPerView = 2;
                }

                /* Slide Items Per View ( on Small screen )
                ----------------------------------------------------------------- */
                slideItemsXSPerView = jQuery('#lpbuilder-swiper-slider-' + index).attr('data-swiper-xs-items');
                if (slideItemsXSPerView === '' || slideItemsXSPerView === undefined) {
                    slideItemsXSPerView = 1;
                }

                if (sliderDirection === 'horizontal') {
                    if (windowWidth < 401) {
                        slideItemsPerView = 1;
                    } else if (windowWidth < 601) {
                        slideItemsPerView = slideItemsPerView > 1
                            ? slideItemsXSPerView
                            : 1;
                    } else if (windowWidth < 768) {
                        slideItemsPerView = slideItemsPerView > 1
                            ? slideItemsSMPerView
                            : 1;
                    } else if (windowWidth < 1024) {
                        slideItemsPerView = slideItemsPerView > 1
                            ? slideItemsMDPerView
                            : 1;
                    }
                } else {
                    slideItemsPerView = 1;
                }

                /* Configurations
                ----------------------------------------------------------------- */
                jQuery('#lpbuilder-swiper-slider-' + index).swiper({
                    loop: true,
                    speed: 800,
                    coverflow: {
                        depth: 120,
                        rotate: -30,
                        stretch: 10
                    },
                    autoplay: 5000,
                    paginationClickable: true,
                    grabCursor: grabTouchMouse,
                    direction: sliderDirection,
                    effect: slideAnimationEffect,
                    simulateTouch: grabTouchMouse,
                    slidesPerView: slideItemsPerView,
                    centeredSlides: centeredSlidesItems,
                    autoplayDisableOnInteraction: false,
                    pagination: '#lpbuilder-swiper-pagination-' + index,
                    nextButton: '#lpbuilder-swiper-button-next-' + index,
                    prevButton: '#lpbuilder-swiper-button-prev-' + index
                });

                /* Hover
                ----------------------------------------------------------------- */
                jQuery('#lpbuilder-swiper-slider-' + index).on({
                    mouseenter: function () {
                        jQuery(this)[0].swiper.stopAutoplay();
                    },
                    mouseleave: function () {
                        jQuery(this)[0].swiper.startAutoplay();
                    }
                });

            });
        }

        /* Slider Height Function
        ------------------------------------------------------------------------- */
        function swiperSliderHeightfn() {
            jQuery('.swiper-container-horizontal').each(function () {
                var el = jQuery(this);
                el.css({height: '100%'});
                el.css({height: el.find('.swiper-wrapper').outerHeight(true)});
                if (el.height() === 0 || el.height() < 21) {
                    el.css({height: '100%'});
                }
            });
        }

        /* Swipe to Slide Funcrion
        ------------------------------------------------------------------------- */
        function swipToSlidefn() {

            jQuery('> :first-child', '[data-lpbuilder-swiper-slide-to]').on('click', function () {

                var el = jQuery(this),
                    elParent = el.parent(),
                    swipToSlide = elParent.attr('data-lpbuilder-swiper-slide-to'),
                    sliderID = '#' + el.parents('.section-container').find('.lpbuilder-swiper-slider').attr('id');

                if (jQuery(sliderID)[0] !== undefined) {
                    el.parents('.section-container').find('.active-swiper-slide').removeClass('active-swiper-slide');
                    elParent.addClass('active-swiper-slide');
                    jQuery(sliderID)[0].swiper.slideTo(swipToSlide, 500, false);
                }

            });

            if (jQuery('[data-lpbuilder-swiper-slide-to]').length) {
                jQuery('[data-lpbuilder-swiper-slide-to]').parents('.section-container').find('.lpbuilder-swiper-slider').each(function () {

                    var el = jQuery(this),
                        sliderID = '#' + el.attr('id'),
                        elParents = jQuery(sliderID).parents('.section-container');

                    elParents.find('.active-swiper-slide').removeClass('active-swiper-slide');
                    elParents.find('[data-lpbuilder-swiper-slide-to="1"]').addClass('active-swiper-slide');

                    jQuery(sliderID)[0].swiper.on('slideChangeStart', function () {

                        var slideIndex = jQuery(sliderID)[0].swiper.activeIndex,
                            swipToSlideLength = elParents.find('[data-lpbuilder-swiper-slide-to]').length;

                        elParents.find('.active-swiper-slide').removeClass('active-swiper-slide');
                        elParents.find('[data-lpbuilder-swiper-slide-to="' + slideIndex + '"]').addClass('active-swiper-slide');

                        if (slideIndex > swipToSlideLength) {
                            elParents.find('[data-lpbuilder-swiper-slide-to="1"]').addClass('active-swiper-slide');
                        }
                        if (slideIndex < 1) {
                            elParents.find('[data-lpbuilder-swiper-slide-to="' + swipToSlideLength + '"]').addClass('active-swiper-slide');
                        }

                    });

                });
            }

        }

        /* Condition
        ------------------------------------------------------------------------- */
        if (jQuery('.lpbuilder-swiper-slider').length) {
            swiperSliderfn();
            swiperSliderHeightfn();
            swipToSlidefn();
        }

        /* Resize Window
        ------------------------------------------------------------------------- */
        jQuery(window).resize(function () {
            if (jQuery('.lpbuilder-swiper-slider').length) {
                jQuery('.lpbuilder-swiper-slider').each(function () {
                    jQuery('#' + jQuery(this).attr('id'))[0].swiper.destroy();
                });
                swiperSliderfn();
                swiperSliderHeightfn();
                swipToSlidefn();
            }
        });







        /* Main Function
        ------------------------------------------------------------------------- */
        function lpbuilderMatchHeightfn() {

           /* jQuery('.content-block:not(.content-block-style-2)').each(function () {
                jQuery(this).parent().find('.content-block-container').matchHeight();
            });*/

            jQuery('.event-block').each(function () {
                jQuery(this).parent().find('.event-block-container').matchHeight();
            });

            jQuery('.audio-block').each(function () {
                jQuery(this).parent().find('.audio-block-container').matchHeight();
            });

            jQuery('.team-block').each(function () {
                jQuery(this).parent().find('.team-block-container').matchHeight();
            });

            jQuery('.portfolio-block:not(.isotope-item)').each(function () {
                jQuery(this).parent().find('.portfolio-block-container').matchHeight();
            });

            jQuery('.client-block').each(function () {
                jQuery(this).parent().find('.client-block-container').matchHeight();
            });

            jQuery('.testimonials-block').each(function () {
                jQuery(this).parent().find('.testimonials-block-container').matchHeight();
            });

            jQuery('.pricing-block').each(function () {
                jQuery(this).parent().find('.pricing-block-container').matchHeight();
            });

            jQuery('.counter-block').each(function () {
                jQuery(this).parent().find('.counter-block-container').matchHeight();
            });

            jQuery('.faq-block').each(function () {
                jQuery(this).parent().find('.faq-block-container').matchHeight();
            });

            jQuery('.contact-block').each(function () {
                jQuery(this).parent().find('.contact-block-container').matchHeight();
            });

        }

        /* Condition
        ------------------------------------------------------------------------- */
        if (blocksAtSameHeight === true) {
            lpbuilderMatchHeightfn();
        }





        /* =========================================================================
        Parallax Effect
        ========================================================================= */
        /* Main Function
        ------------------------------------------------------------------------- */
        function parallaxEffectfn(parallaxEffect) {
            jQuery('.parallax-effect').each(function () {

                var el = jQuery(this),
                    elImage = jQuery('> img', el),
                    elHeight = el.outerHeight(true),
                    scrollTop = jQuery(window).scrollTop(),
                    elOffsetBottom = el.offset().top + elHeight,
                    windowHeight = jQuery(window).outerHeight(true),
                    parallaxPixel = (el.offset().top - scrollTop) * 0.30,
                    differenceHeight = elImage.outerHeight(true) - elHeight;

                if (parallaxEffect !== false) {
                    elImage.css({top: -differenceHeight / 2});
                }

                if ((elOffsetBottom > scrollTop) && (el.offset().top < (scrollTop + windowHeight))) {
                    elImage.css({transform: 'translate(-50%,' + -parallaxPixel + 'px)'});
                }

            });
        }


        /* =========================================================================
        Check if it's a Mobile Device
        ========================================================================= */
        if (jQuery.browser.mobile) {

            /* Remove Transition From Links
            --------------------------------------------------------------------- */
            jQuery('a').each(function () {
                jQuery(this).addClass('no-transition');
            });

        } else {

            /* Transition Between Pages
            --------------------------------------------------------------------- */
            jQuery('#main-wrapper').css({
                opacity: '1'
            });

            /* Parallax Effect ( Condition )
            --------------------------------------------------------------------- */
            if (parallaxEffect === true) {
                jQuery(window).scroll(function () {
                    parallaxEffectfn(false);
                });
                parallaxEffectfn();
            }

        }

    });


})($);

