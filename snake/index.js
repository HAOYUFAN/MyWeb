/*this.sence=div
play


line	划线
for 0-20
create div
div.id=i+'_'+j
插入class
sence.appendChild

draw 初始蛇
forEach ele color*/


function snake(){
	this.sence=document.querySelector('.sences');//获取画布
	this.snake=['2_0','2_1','2_2'];//蛇
	this.flag={'2_0':true,'2_1':true,'2_2':true};
	this.dir = 39;//方向
	this.i=1;//分数
	this.speeds=0;
	this.grade=document.querySelector('span');//分数获取
	this.box=document.querySelector('.box');
	this.briefness=this.box.querySelector('.briefness');
	this.ordinary=this.box.querySelector('.ordinary');
	this.abnormal=this.box.querySelector('.abnormal');
	this.returns=document.querySelector('.return');
    this.briefness=this.box.querySelector('.briefness');
    this.ordinary=this.box.querySelector('.ordinary');
    this.abnormal=this.box.querySelector('.abnormal');
}
snake.prototype={
	play:function(){
		this.line();
		this.draw();
		this.move();
		this.direction();
		this.dropfood();
	},
	//格子
	line:function(){
		for(var i=0;i<=31;i++){
			for(var j=0;j<=60;j++){
				var divs=document.createElement('div');
				divs.id=i+"_"+j;
				divs.className="hot";
				this.sence.appendChild(divs);
			}
		};
	},
	//蛇
	draw:function(){
		//遍历添加
		this.snake.forEach(function(ele,index,arr){
			document.getElementById(ele).style.background='url(img/1-1.png)';
		});
	},
	//移动
	move:function(){
		var self=this;
        self.briefness.onclick=function(){
            box.style.display="none";
            self.sence.style.display='block';
            self.t=setInterval(moves,250);
        };
        self.ordinary.onclick=function(){
            box.style.display="none";
            self.sence.style.display='block';
            self.t=setInterval(moves,200);
        };
        self.abnormal.onclick=function(){
            box.style.display="none";
            self.sence.style.display='block';
            self.speeds=100;
            self.t=setInterval(moves,150);
        };
		function moves(){
			if(self.dir === 39 || self.dir === 67){//右
				var oldt=self.snake[self.snake.length-1];//从尾部开始
				var arr=oldt.split('_');//分割成数组
				var newt=arr[0]+'_'+(parseInt(arr[1])+1);//x轴坐标加1成新头
				var newarr=newt.split('_');//把新头分割成数组
			}else if(self.dir===40){//下
				var oldt=self.snake[self.snake.length-1];
				var arr=oldt.split('_');
				var newt=(parseInt(arr[0])+1)+'_'+arr[1];
				var newarr=newt.split('_');
			}else if(self.dir===38){//上
				var oldt=self.snake[self.snake.length-1];
				var arr=oldt.split('_');
				var newt=(parseInt(arr[0])-1)+'_'+arr[1];
				var newarr=newt.split('_');
			}else if(self.dir===37){//左
				var oldt=self.snake[self.snake.length-1];
				var arr=oldt.split('_');
				var newt=arr[0]+"_"+(parseInt(arr[1])-1);
				var newarr=newt.split('_');
			}
			//失败
			if(newarr[0] < 0 || newarr[0] > 31 || newarr[1] < 0 || newarr[1] > 60){
				clearInterval(self.t);//触碰边界关闭
				if(self.grade.innerHTML<10){
					alert("你太菜了，继续练练吧！")
				}else if(self.grade.innerHTML>11&&self.grade.innerHTML<25){
					alert('不错哦！继续努力')
				}else if(self.grade.innerHTML>25){
					alert('厉害啦，再接再厉。')
				}
				alert('您的分数为'+self.grade.innerHTML);
				if(confirm('GAME OVER !!!'+'\n是否重新开始')){
					location.reload();
				}else{
					location.assign('1.html');//重新打开
					if(confirm('确定关闭？')){
						close();//重新打开
					}else{
						location.reload();//刷新
					};
				};
				return;
			}else if(self.flag[newt]){
				if(confirm('你撞到了自己，是否重新开始')){
					document.getElementById(newt).style.transform='none';
				}else{
					location.reload();
				}
			}
			var newfood=self.food.split('_');
			if(newarr[0]==newfood[0]&&newarr[1]==newfood[1]){
				self.snake.push(self.food);//把新值放进蛇身
				self.grade.innerHTML=++self.i;//分数加1  先
				self.draw();//重新画蛇身
				document.getElementById(self.snake[self.snake.length-1]).style.background='url(img/1.png)';
				self.flag[self.food]=true;//吧食物改成true
				self.dropfood();//重新投放食物
			}else{
				var weiba=self.snake[0];//获取第一个
				document.getElementById(weiba).style.background="none";//取消颜色
				self.snake.push(newt);//把新头放进数组
				self.snake.shift();//删除数组第一个
				self.flag[newt]=true;
				delete self.flag[weiba];
				self.draw();//重写
				document.getElementById(self.snake[0]).style.background='url(img/1-4.png)';
				document.getElementById(self.snake[self.snake.length-1]).style.background='url(img/1.png)';
			}
		}
		self.returns.onclick=function(){
			clearInterval(self.t);
			self.box.style.display="block";
			self.sence.style.display='none';
		}
	},
	//键盘移动
	direction:function(){
		var self=this;
		document.onkeydown=function(e){
			if(Math.abs(self.dir-e.keyCode)==2){
				return;
			};
			self.dir=e.keyCode;
			if(e.keyCode==27){
				clearInterval(self.t);
			}
			switch(e.keyCode){
				case 37:
				self.dir=37;
				break;

				case 38:
				self.dir=38;
				break;

				case 39:
				self.dir=39;
				break;

				case 40:
				self.dir=40;
				break;

			}
			// console.log(self.dir)
		};
	},
	dropfood:function(){
		var x=Math.floor(Math.random()*31),y=Math.floor(Math.random()*60);
		this.food=x+'_'+y;
		//投到自身 重新头一次
		while(this.flag[this.food]){
			x=Math.floor(Math.random()*31),y=Math.floor(Math.random()*60);
			this.food=x+'_'+y;
		}
		document.getElementById(this.food).style.background="url(img/2.png)";
	}
}

