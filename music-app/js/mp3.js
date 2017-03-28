/**
 * Created by Administrator on 2017/3/21 0021.
 */
$(function(){
    audio=$('#audio').get(0);
    var playPause = $('.play-pause'),durationse = $('.duration'),current = $('.current')
        ,cret = $('.cret');
    var order = $('.order');
    var volumes = $('.volumes'),vol = $('.vol');
    var vouln = $('.vouln')
    var list =$('.list')
    //$('.text').text($(audio).attr('src').slice(6,-4))
    //播放
    $(playPause).on('click',function(){
        if(audio.paused){
            audio.play();
        }else{
            audio.pause();
        }
    })
    next = function(){
         $(playPause).removeClass('icon-music_play_button').addClass('icon-music_stop_button');
        $('.avatar-title').addClass('skew')
     }
    prev = function(){
        $(playPause).removeClass('icon-music_stop_button').addClass('icon-music_play_button');
        $('.avatar-title').removeClass('skew')
    }
    $(audio).on('play',next)
    $(audio).on('pause',prev)

    //进度条
    width = function(){
        var  w = $(durationse).width() * audio.currentTime / audio.duration ;
        $(current).width(w);
    }
        $(cret).on('mousedown',function(e){
            $(document).bind('mousemove',function(e){
               ox =  e.offsetX
                if(ox > $(durationse).width()){
                    ox = $(durationse).width();
                }
                $(current).css({width:ox})
            })
            $(document).mouseup(function(){
                $(document).unbind('mousemove');
                $(document).unbind('mouseup');
                $(current).css({width:ox})
            })
            return false
        })
    $(audio).on('timeupdate',width);

    //时间
    times = function (s) {
        s = Math.floor(s)
        sec = Math.floor(s % 60);
        min = Math.floor(s / 60);
        sec = sec < 10 ? '0' + sec : sec;
        min = min < 10 ? '0' + min : min;
        return min + ':' + sec;
    }
    furas = function(){
        $('.dura').html(times(audio.duration))
    }
    uptime = function (){
        $('.curr').html(times(audio.currentTime))
    }

    $(audio).on('timeupdate',uptime);
    $(audio).on('canplay',furas);

//点击 
    durati = function(e){
        t = audio.duration * e.offsetX / $(this).width();
        audio.currentTime = t;
    }
    $(cret).on('click',false);
    durationse.on('click',durati);
//声音
    /*音量开关键*/
    volumeclick = function (e) {
        if (audio.volume) {
            e.data.prev = audio.volume;
            audio.volume = 0;
        } else {
            audio.volume = e.data.prev;
        }
    }
     /*音量显示*/
    musicwidth = function(){
        width = audio.volume * $(volumes).height();
        $('.vol').height(width);
        if(audio.volume === 0){
            $(vouln ).removeClass('icon-music_volume_up').addClass('icon-music_mute')
        }else{
            $(vouln).removeClass('icon-music_mute').addClass('icon-music_volume_up')
        }
    }

    mousclick = function(e){
        vo = e.offsetY/$(this).height();
        audio.volume= vo;
    }
    $(volumes).on('click',mousclick)
    $(audio).on('volumechange', musicwidth);
    /*音量键*/
    $(vouln).on('click', {prev: 1}, volumeclick);

    $('.vol-sped').on('wheel',function(e){
        if($(vol).height() > 0){
            $(vol).css({height:0})
        }else if($(vol).height() < $(volumes).height()){
            $(vol).css({height:$(volumes).height()})
        }
        if(e.originalEvent.wheelDelta < 0){
            console.log(1)
            $(vol).css({height:'+=5'})
        }else if(e.originalEvent.wheelDelta > 0){
            $(vol).css({height:'-=5'})
        }
    })

    $('.vol_cret').on('mousedown',function(){
        $(document).mousemove(function(e){
            oy = e.offsetY;
            if(oy > $(vol).height()){
                oy = $(vol).height();
            }
            $(vol).css({height:oy});
        })
        $(document).mouseup(function(){
            $(document).unbind('mousemove');
            $(document).unbind('mousemup');
            $(vol).css({height:oy});
        })
    })
    //jiemain

    var musics= [
        {id:1,song:'悟空',singer:'戴荃',src:'music/戴荃-悟空.mp3',avatar:'image/9.jpg'},
        {id:2,song:'大约在冬季',singer:'刘惜君',src:'music/刘惜君-大约在冬季.mp3',avatar:'image/2.png'},
        {id:3,song:'我只在乎你',singer:'刘惜君',src:'music/刘惜君-我只在乎你.mp3',avatar:'image/3.jpg'},
        {id:4,song:'不再联系',singer:'群星',src:'music/不在联系.mp3',avatar:'image/4.jpg'},
        {id:5,song:'德国装甲师战歌',singer:'你猜猜',src:'music/德国装甲师战歌.mp3',avatar:'image/5.jpg'},
        {id:6,song:'爱情转移',singer:'王筝',src:'music/王筝 - 爱情转移.mp3',avatar:'image/6.jpg'},
        {id:7,song:'十年',singer:'陈奕迅',src:'music/陈奕迅 - 十年.mp3',avatar:'image/7.jpg'},
        {id:8,song:'偏偏喜欢你',singer:'谭晶',src:'music/陈晓东、谭晶 - 偏偏喜欢你.mp3',avatar:'image/8.jpg'},
    ]
    cuuent=0;
    musicinner = function(){
        if(musics.length){
            $('.text').html(musics[cuuent].song);
            $('.singer').html(musics[cuuent].singer);
            $(list,'li').removeClass('hover').eq(cuuent).addClass('hover');
            $('.avatar').css({backgroundImage:'url('+musics[cuuent].avatar+')'});
        }else{
            $('.text').html('----');
            $('.singer').html('----');
        }
    }
    $(audio).on('play',musicinner);
    //列表
    read = function(){
        $(list).empty();
        $(musics).each(function(index,value){
            $('<li><span>'+value.song+'--'+value.singer+'</span><span class="del">X</span></li>')
                .addClass(function(){
                    return (index === cuuent)? 'hover':'';
                }).appendTo(list);
        })
    }
    read();

    $(list).on('click','li',function(){
        cuuent = $(this).index();
        audio.src = musics[cuuent].src;
        read();
        audio.play();
    }).on('click','.del',function(){
        index = $(this).closest('li').index();
        musics.splice(index,1);
        if(index > cuuent){
            //********
        }else if(index === cuuent){
            if(musics.length){
                if(index === musics.length){
                    cuuent = 0;
                }else{
                    return index;
                }
                audio.src = musics[cuuent].src;
                audio.play();
            }else{
                audio.src = '';
                cuuent = null;
                prev();
                $('.text').html('----');
                $('.singer').html('----');
            }
        }else{
            cuuent -= 1;
        }
        read();
        return false;
    })
    // 切换
     lengths = musics.length;
    next = function(){
        cuuent +=1;
        if(cuuent >= lengths){
            cuuent=0;
        }
        audio.src = musics[cuuent].src;
        audio.play();
    }
    peav = function(){
        cuuent -=1;
        if(cuuent <= 0){
            cuuent=lengths
        }
        audio.src = musics[cuuent].src;
        audio.play();
    }
    random = function(){
        cuuent =Math.floor(Math.random()*lengths);
        audio.src = musics[cuuent].src;
        audio.play();
    }
    nextclick = function(){
        if($(order).hasClass('icon-music_repeat_button')){
            next();
        }else if($(order).hasClass('icon-music_shuffle_button')){
            random();
        }
        read();
    }
     orders = function(){
         if($(order).hasClass('icon-music_repeat_button')){
             $(order).removeClass('icon-music_repeat_button')
                 .addClass('icon-music_shuffle_button')
         }else{
             $(order).removeClass('icon-music_shuffle_button')
                 .addClass('icon-music_repeat_button')
         }
     }
    $('.next').on('click touchend',nextclick);
    $('.prav').on('click touchend',function(){
        if($(order).hasClass('icon-music_repeat_button')){
            peav();
        }else if($(order).hasClass('icon-music_shuffle_button')){
            random();
        }
        read();
    });
    $(order).click(orders);
    $(audio).on('ended',nextclick);
    $('.cole').click(function(){
        if(confirm('确认关闭？')) {
            window.close();
        }
    })
})
