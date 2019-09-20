(function($) {
    "use strict";
    
    /* jQuery MeanMenu */
    $('#mobile-menu-active').meanmenu({
        meanScreenWidth: "991",
        meanMenuContainer: ".mobile-menu-area .mobile-menu",
    });
    
    /*--
	Header Search Toggle
    -----------------------------------*/
    var searchToggle = $('.menu-toggle');
    searchToggle.on('click', function() {
        if ($(this).hasClass('open')) {
            $(this).removeClass('open');
            $(this).siblings('.main-menu').removeClass('open');
        } else {
            $(this).addClass('open');
            $(this).siblings('.main-menu').addClass('open');
        }
    })
    
    /* slider active */
    $('.slider-active').owlCarousel({
        loop: true,
        nav: false,
        autoplay: true,
        autoplayTimeout: 10000,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        item: 1,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    })
    
    /* hover 3d init for tilt */
    if ($('.tilter').length > 0) {
        $('.tilter').tilt({
            maxTilt: 30,
            perspective: 2600,
            easing: "cubic-bezier(.03,.98,.52,.99)",
            scale: .84,
            speed: 1220,
            transition: true,
        });
    }
    if ($('.tilter2').length > 0) {
        $('.tilter2').tilt({
            maxTilt: 50,
            perspective: 1920,
            easing: "cubic-bezier(.03,.98,.52,.99)",
            scale: .95,
            speed: 1220,
            transition: true,
        });
    }
    
    /* testimonial active */
    $('.product-slider-active').owlCarousel({
        loop: false,
        autoplay: false,
        autoplayTimeout: 5000,
        navText: ['<<<<','>>>>' ],
        nav: true,
        item: 3,
        margin: 20,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            1000: {
                items: 2
            },
            1200: {
                items: 3
            }
        }
    })
    
    
    /* cart */
    $(".icon-cart").on("click", function() {
        $(this).parent().find('.shopping-cart-content').slideToggle('medium');
    })
    
    /*---------------------
    shop grid list
    --------------------- */
    $('.view-mode li a').on('click', function() {
        var $proStyle = $(this).data('view');
        $('.view-mode li').removeClass('active');
        $(this).parent('li').addClass('active');
        $('.product-view').removeClass('product-grid product-list').addClass($proStyle);
    })
    
    /*--------------------------
    tab active
    ---------------------------- */
    var ProductDetailsSmall = $('.product-details-small a');
    
    ProductDetailsSmall.on('click', function(e) {
        e.preventDefault();
        
        var $href = $(this).attr('href');
        
        ProductDetailsSmall.removeClass('active');
        $(this).addClass('active');
        
        $('.product-details-large .tab-pane').removeClass('active');
        $('.product-details-large ' + $href).addClass('active');
    })




    var ProductDetailsSmall2 = $('.subtabl a');
    
    ProductDetailsSmall2.on('click', function(e) {
        e.preventDefault();
        
        var $href = $(this).attr('href');
        
        ProductDetailsSmall2.removeClass('active');
        $(this).addClass('active');
        
        $('.subtab').removeClass('active');
        if ($href == "#ALL") {
            $('.subtab').addClass('active');
          }
          else {
            $('.subtab' + $href).addClass('active');
          }
    })
    
    /*------ Wow Active ----*/
    new WOW().init();
    
    /*--
    Menu Stick
    -----------------------------------*/
    var header = $('.transparent-bar');
    var win = $(window);
    
    win.on('scroll', function() {
        var scroll = win.scrollTop();
        if (scroll < 200) {
            header.removeClass('stick');
        } else {
            header.addClass('stick');
        }
    });
    
    /*---------------------
    sidebar sticky
    --------------------- */
    $('.sidebar-active').stickySidebar({
        topSpacing: 80,
        bottomSpacing: 30,
        minWidth: 991,
    });
    
    /*---------------------
    chosen
    --------------------- */
    $('.orderby').chosen({
        disable_search: true,
        width: "auto"
    });
    
    /* product-dec-slider active */
    $('.product-dec-slider').owlCarousel({
        loop: true,
        autoplay: false,
        autoplayTimeout: 5000,
        navText: ['<i class="ti-angle-left"></i>', '<i class="ti-angle-right"></i>'],
        nav: true,
        item: 4,
        margin: 12,
        responsive: {
            0: {
                items: 2
            },
            768: {
                items: 4
            },
            1000: {
                items: 4
            }
        }
    })
    
    /*---------------------
    price slider
    --------------------- */
    var sliderrange = $('#slider-range');
    var amountprice = $('#amount');
    $(function() {
        sliderrange.slider({
            range: true,
            min: 0,
            max: 1200,
            values: [0, 1000],
            slide: function(event, ui) {
                amountprice.val("$" + ui.values[0] + " - $" + ui.values[1]);
            }
        });
        amountprice.val("$" + sliderrange.slider("values", 0) +
            " - $" + sliderrange.slider("values", 1));
    });
    
    
    // Instantiate EasyZoom instances
    var $easyzoom = $('.easyzoom').easyZoom();
    
    
    /*--- showlogin toggle function ----*/
    $('#showlogin').on('click', function() {
        $('#checkout-login').slideToggle(900);
    });
    
    
    /*--- showlogin toggle function ----*/
    $('#showcoupon').on('click', function() {
        $('#checkout_coupon').slideToggle(900);
    });
    
    
    /*--- showlogin toggle function ----*/
    $('#ship-box').on('click', function() {
        $('#ship-box-info').slideToggle(1000);
    })
    
    /*--------------------------
     ScrollUp
    ---------------------------- */
    $.scrollUp({
        scrollText: '<i class="icofont icofont-rounded-up"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    });




})(jQuery);