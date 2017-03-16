/**
 * Created by Administrator on 2017/3/14 0014.
 */
$(function(){
    var domItem=$('.domItem').offset().top,
        dom1=$('.dom1').offset().top,
        footer=$('.footer').offset().top,
        moduleSection=$('.module-section').offset().top;
    $('.nav li:eq(0)').click(function(){
        $(document.body).animate({scrollTop:domItem})
    })
    $('.nav li:eq(1)').click(function(){
        $(document.body).animate({scrollTop:dom1})
    })
    $('.nav li:eq(2)').click(function(){
        $(document.body).animate({scrollTop:moduleSection})
    })
    $('.nav li:eq(3)').click(function(){
        $(document.body).animate({scrollTop:footer})
    })
    $(window).scroll(function(){
            if($(this).scrollTop() >= domItem ){
                $('.nav li:eq(0)').find('a').css({color:'#FBD8C6'}).end().siblings().find('a').css({color:'#fff'});
            }
            if($(this).scrollTop() >= dom1 ){
                $('.nav li:eq(1)').find('a').css({color:'#FBD8C6'}).end().siblings().find('a').css({color:'#fff'})
            }
            if($(this).scrollTop() >= moduleSection ){
                $('.nav li:eq(2)').find('a').css({color:'#FBD8C6'}).end().siblings().find('a').css({color:'#fff'});
            }
            if($(this).scrollTop() +200>= footer ){
                $('.nav li:eq(3)').find('a').css({color:'#FBD8C6'}).end().siblings().find('a').css({color:'#fff'});
            }
        if($(this).scrollTop()+$(this).height() > $('.main').offset().top){
            $('.main').css({opacity:1});
        }
        if($(this).scrollTop()+$(this).height() > $('.footer').offset().top){
            $('.footer').css({opacity:1});
        }
    })

})