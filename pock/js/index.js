$(function(){
	$('.play').click(function(){
		puke($('.zhuozi'))
		$(this).hide();
		$(".left").fadeIn().delay(1000);
		$('.right').fadeIn().delay(1000);
	})
function puke(zhuozi){
	/* S 黑桃   H 红桃   C梅花  D方块*/
	var poke=[];
	var color=['s','h','c','d'],biao={};
	//洗牌
	while(poke.length<52){
		var shuzi=Math.ceil(Math.random()*13);//随机13个数字
		var huase=color[Math.floor(Math.random()*4)];//随机4个数字等于花色
		if(!biao[shuzi+'_'+huase]){
			biao[shuzi+'_'+huase]=true;
			poke.push({
				'shuzi':shuzi,
				'huase':huase
			})
		}
	}
//	console.log(poke)
	dirs={
		'1':'A',
		'2':'2',
		'3':'3',
		'4':'4',
		'5':'5',
		'6':'6',
		'7':'7',
		'8':'8',
		'9':'9',
		'10':'T',
		'11':'J',
		'12':'Q',
		'13':'K'
	}
	//发牌      item=puke[index]  
	for (var i=0,index=0;i<7;i++) {
		for(var j=0;j<i+1;j++){
			index++;
			//桌子的
			var item = poke[index];
			url='url(pukes/'+dirs[item.shuzi]+item.huase+'.png)';
			$('<div>').attr({id:i+'_'+j}).data('num',item.shuzi).addClass('pai').css({backgroundImage:url}).appendTo(zhuozi).delay(i*i)
			.animate({
				opacity:1,
				top:i*50,
				left:(6-i)*50+j*100
			})
//			if($('.pai').data('num')<13)
		};
	};
	for(;index<poke.length;index++){
		var item = poke[index];
		url='url(pukes/'+dirs[item.shuzi]+item.huase+'.png)';
		$('<div>').attr({id:i+'_'+j}).data('num',item.shuzi).addClass('pai zuo').css({backgroundImage:url}).appendTo(zhuozi).delay(index*index)
		.animate({
			opacity:1,
			top:440,
			left:150
		})
	}
	
		var first=null;
	$('.pai').click(function(){
		var gps=$(this).attr('id').split('_');
		var i=parseInt(gps[0]),j=parseInt(gps[1]);//id获取到是字符串，需要转化
		if(i<6){
			if($('#'+(i+1)+'_'+j).length || $('#'+(i+1)+'_'+(j+1)).length ){
				return;
			}
		}
		if($(this).data('num')==13){
			$(this).animate({top:0,left:600,opacity:0}).queue(function(){$(this).remove();}); return;
		};
		
		$(this).toggleClass('active');
		if($(this).hasClass('active')){
			$(this).animate({top:'-=30'});		
		}else{
			$(this).animate({top:'+=30'});					
		}
		
		if(!first){
			first=$(this);
		}else{
			if($(this).data('num')+first.data('num')==13){
				$('.pai.active').animate({top:0,left:600,opacity:0}).queue(function(){$(this).remove();});
				
			}else{
				$('.pai.active').removeClass('active').animate({top:'+=30'})
				first=null;
			}
		}		
	})
		var zindex=1;
		$('.right').click(function(){
			if(!$('.pai.zuo').length){
				return;
			}
			$('.pai.zuo').eq(-1).each(function(index,obj){
				zindex++;
//				console.log(index)
				$(this).addClass('you').removeClass('zuo').css({'z-index':zindex}).animate({
					left:'+=340'
				}).delay(200)
			})
		});
		$('.left').click(function(){
			if(!$('.pai.you').length){
				return;
			}
			$('.pai.you').eq(0).each(function(index,obj){
				zindex++;
				$(this).addClass('zuo').removeClass('you').css({'z-index':zindex}).animate({
					left:'-=340'
				})
			}).delay(200)
		})
		
		
		
}
	
	
	
	
})
