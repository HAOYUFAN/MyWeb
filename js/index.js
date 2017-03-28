/**
 * Created by Administrator on 2017/3/14 0014.
 */
$(function(){
    var domItem=$('.domItem').offset().top,
        dom1=$('.dom1').offset().top,
        footer=$('.footer').offset().top,
        moduleSection=$('.module-section').offset().top,
        undergo = $('.undergo'),
       body =  $(document.body),
        list = $('.nav')
        ;
    $('.nav li:eq(0)').click(function(){
        $(body).animate({scrollTop:domItem})
    })
    $('.nav li:eq(1)').click(function(){
        $(body).animate({scrollTop:dom1})
    })
    $('.nav li:eq(2)').click(function(){
        $(body).animate({scrollTop:moduleSection})
    })
    $('.nav li:eq(3)').click(function(){
        $(body).animate({scrollTop:footer})
    })
    $(window).scroll(function(){
            if($(this).scrollTop() >= domItem ){
                $('li:eq(0)',list).find('a').css({color:'#FBD8C6'}).end().siblings().find('a').css({color:'#fff'});
            }
            if($(this).scrollTop() >= dom1 ){
                $('li:eq(1)',list).find('a').css({color:'#FBD8C6'}).end().siblings().find('a').css({color:'#fff'})
            }
            if($(this).scrollTop() >= moduleSection ){
                $('li:eq(2)',list).find('a').css({color:'#FBD8C6'}).end().siblings().find('a').css({color:'#fff'});
            }
            if($(this).scrollTop() +200>= footer ){
                $('li:eq(3)').find('a').css({color:'#FBD8C6'}).end().siblings().find('a').css({color:'#fff'});
            }
        if($(this).scrollTop()+$(this).height() > $('.main').offset().top){
            $('.main').css({opacity:1});
        }
        if($(this).scrollTop()+$(this).height() > $('.footer').offset().top){
            $('.footer').css({opacity:1});
        }
    })
    $('.backtop-section').click(function(){
        $(body).animate({scrollTop:0})
    })
    $('.button').click(function(){
        $(undergo).addClass('active');
            $('body').addClass('bodys');
    })
    $(undergo,'.close').click(function(){
        $(undergo).removeClass('active');
        $('body').removeClass('bodys');
    })

})