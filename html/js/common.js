$(function() {

    'use strict';

    /****************************************************************/
    //TIMETABLE
    /****************************************************************/
    $('.timetable__item').not(':first').hide()
    $('.timetable__buttons').on('click', 'button:not(.active)', function() {
        $(this).addClass('active').siblings().removeClass('active')
        $('.timetable__box').children('.timetable__item').stop().hide()/*slideUp(300)*/.eq($(this).index()).stop().show()/*slideDown(300)*/;
        // initialScroll()
    }).children('button').first().addClass('active');
    // /****************************************************************/
    // //TABS
    // /****************************************************************/
    //
    // $('.tabs').each(function() {
    //     $(this).children('.tabs__item').not(':first').hide(),
    //     $(this).children('.tabs__buttons').on('click', 'button:not(.active)', function() {
    //         $(this).addClass('active').siblings().removeClass('active').closest('.tabs').children('.tabs__item').stop().slideUp(300).eq($(this).index()).stop().slideDown(300);
    //     }).children('button').first().addClass('active');
    // });


    /****************************************************************/
    //SECTIONS SCROLL
    /****************************************************************/
    function initialScroll() {
        if ( $(window).width() <= 768 ) {
           $.scrollify.setOptions({setHeights:false});
           $.scrollify.disable();
           $('.section').css('height', 'auto').removeClass('active');
        } else {
           $.scrollify({
               section : '.section',
               sectionName: 'name',
               before: function(i, sections) {

                   const sectionHref = sections[i].attr('data-name');

                   $('.section').removeClass('active');
                   sections[i].addClass('active');

                   $('.pagination a').removeClass('active');
                   $('.pagination').find('a[href=\"#' + sectionHref + '\"]').addClass('active');
               },
               afterRender: function(i, sections) {
                   let pagination = '<div class=\"pagination\">',
                       activeClass = '';
                   $('.section').each(function(i) {
                       activeClass = '';
                       const sectionName = $(this).attr('data-name'),
                           href = sectionName;
                       if (i === 0) {
                           activeClass = 'active';
                       }
                       pagination += '<a class=\"' + activeClass + '\" href=\"#' + href + '\"></a>';
                   });
                   pagination += "</div>";
                   $('body').prepend(pagination);


                   $('.pagination a').on('click', function() {
                       $.scrollify.move($(this).attr('href'));
                   });
                   $('.footer__button-scroll').on('click', $.scrollify.next);
               }
           });
           $.scrollify.enable();
           $.scrollify.setOptions({setHeights:true});
        }
    }
    initialScroll();
    $(window).resize(function() {
        initialScroll();
    });
});
