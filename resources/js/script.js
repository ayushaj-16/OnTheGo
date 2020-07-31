$(document).ready(function() {
    
    /* For the sticky Navigation */
    
    $('.js--section-features').waypoint(function(direction) {
        if(direction == "down") {
            $('nav').addClass('sticky');
        }
        else {
            $('nav').removeClass('sticky');
        }
    }, {
        offset: '60px'
    });


    /* Navigation and Buttons scroll */
    
    $(function() {
        $('a[href*="#"]').not('[href="#"]').click(function() {
          if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
              $('html,body').animate({
                scrollTop: target.offset().top
              }, 1000);
              return false;
            }
          }
        });
    });
    

    /* Animation on scroll */
    
    $('.js--wp-1').waypoint(function(direction) {
        if(direction == "down")
        $('.js--wp-1').addClass('animate__animated animate__fadeIn');
    }, {
        offset: '50%'
    });
    
    $('.js--wp-2').waypoint(function(direction) {
        if(direction == "down")
        $('.js--wp-2').addClass('animate__animated animate__fadeInUp');
    }, {
        offset: '50%'
    });

    $('.js--wp-3').waypoint(function(direction) {
        if(direction == "down")
        $('.js--wp-3').addClass('animate__animated animate__fadeIn');
    }, {
        offset: '50%'
    });

    $('.js--wp-4').waypoint(function(direction) {
        if(direction == "down")
        $('.js--wp-4').addClass('animate__animated animate__pulse');
    }, {
        offset: '50%'
    });


    /* Mobile Navigation */

    $('.js--nav-icon').click(function() {
        var nav = $('.js--main-nav');
        var navi = $('.js--nav-icon ion-icon');
        nav.slideToggle(200);
        if(navi.attr('name')=='reorder-four-outline') 
            navi.attr('name', 'close-outline');
        else 
            navi.attr('name', 'reorder-four-outline');
    });

    
});

