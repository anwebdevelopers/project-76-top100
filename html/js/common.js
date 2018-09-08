$(function() {

    'use strict';

    /****************************************************************/
    //NAV
    /****************************************************************/

    const $asideMenuButton = $('.aside__nav-button'),
        $nav = $('.nav');

    let nevMenuUl = '<ul>';

    $('.section').each(function(i) {
        let activeClass = '';
        const sectionName = $(this).attr('data-name'),
            href = sectionName.replace(/\s+/g, '-');
        if (i === 0) {
            activeClass = 'active';
        }
        nevMenuUl += '<li><a class=\"' + activeClass + '\" href=\"#' + href + '\">' + sectionName + '</a></li>';
    });

    nevMenuUl += "</ul>";

    $('.nav__menu').prepend(nevMenuUl);

    $('.nav__menu').on('click', 'a', function() {
        $asideMenuButton.removeClass('active');
        $nav.removeClass('active');
        if ($(window).width() < 768) {
            const thisSect = $('.section[data-name="' + $(this).attr('href').replace(/#+/g, '').replace(/-+/g, ' ') + '"]').offset().top;
            $('html, body').animate({
                scrollTop: thisSect
            }, ((Math.abs(thisSect - $(window).scrollTop()) * 0.1) + 600), 'swing');
        }
    });

    $asideMenuButton.click(function() {
        $(this).toggleClass('active');
        $nav.toggleClass('active');
    });

    /****************************************************************/
    //POPUP
    /****************************************************************/
    $('.call-popup').on('click', function(e) {
        e.stopPropagation();
        $($(this).attr('href')).addClass('active');
    });
    $('.popup__close').on('click', function(e) {
        $(this).closest('.popup').removeClass('active');
    });
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.popup').length) {
            $('.popup').removeClass('active');
        }
        e.stopPropagation();
    });

    /****************************************************************/
    //SECTIONS SCROLL
    /****************************************************************/



    function slideScroll() {
        if ($(window).width() <= 768) {
            $.scrollify.setOptions({
                setHeights: false
            });
            $.scrollify.disable();
            $('.section').css('height', 'auto').removeClass('active');
        } else {
            $.scrollify({
                section: '.section',
                sectionName: 'name',
                before: function(i, sections) {

                    const sectionHref = sections[i].attr('data-name').replace(/\s+/g, '-');

                    $('.nav__menu a').removeClass('active');
                    $('.nav__menu').find('a[href=\"#' + sectionHref + '\"]').addClass('active');

                    if (sections[i].index('.section') === sections.length - 1) {
                        $('.button-scroll-top').fadeIn();
                        $('.button-scroll-down').fadeOut();
                    } else {
                        $('.button-scroll-down').fadeIn();
                        $('.button-scroll-top').fadeOut();
                    }
                },
                afterRender: function(i, sections) {

                    $('.nav__menu a').on('click', function() {
                        $.scrollify.move($(this).attr('href'));
                    });

                    $('.button-scroll-down').on('click', $.scrollify.next);
                }
            });
            $.scrollify.enable();
            $.scrollify.setOptions({
                setHeights: true
            });
        }
    }

    slideScroll();



    /****************************************************************/
    //HEADER MASK
    /****************************************************************/
    $('.header').clipthru({
        autoUpdate: true,
        autoUpdateInterval: 30
    });

    /****************************************************************/
    //SCROLL TOP BUTTON
    /****************************************************************/

    $('.button-scroll-top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, $(window).scrollTop() * 0.1 + 600, 'swing');
    });

    /****************************************************************/
    //BREAKPOINT SLIDER
    /****************************************************************/

    function owlInit(element, resolution) {
        if ($(window).width() <= resolution) {
            $(element).addClass('owl-carousel').owlCarousel({
                loop: false,
                items: 1,
                nav: true,
                navText: '',
                autoplayTimeout: 5000,
                autoplay: false,
                smartSpeed: 1200,
                dots: false
            });
        } else {
            $(element).trigger('destroy.owl.carousel').removeClass('owl-carousel');
        }
    }
    owlInit('.speakers__box', 360);
    owlInit('.reasons__box', 640);



    $(window).resize(function() {
        slideScroll();
        owlInit('.speakers__box', 360);
        owlInit('.reasons__box', 640);
    });

});
