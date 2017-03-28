/*play 
产生字符
下落
消除
*/
function game(){
	this.char=[
		['A','image/a.gif'],
		['B','image/b.gif'],
		['C','image/c.gif'],
		['D','image/d.gif'],
		['E','image/e.gif'],
		['F','image/f.gif'],
		['G','image/g.gif'],
		['H','image/h.gif'],
		['I','image/i.gif'],
		['J','image/j.gif'],
		['K','image/k.gif'],
		['L','image/l.gif'],
		['M','image/m.gif'],
		['N','image/n.gif'],
		['O','image/o.gif'],
		['P','image/p.gif'],
		['Q','image/q.gif'],
		['R','image/r.gif'],
		['S','image/s.gif'],
		['T','image/t.gif'],
		['U','image/u.gif'],
		['V','image/v.gif'],
		['W','image/w.gif'],
		['X','image/x.gif'],
		['Y','image/y.gif'],
		['Z','image/z.gif']
	];
	this.cw=innerWidth;//浏览器宽
	this.lengths=5;//页面字符出现数量
	this.currentArr=[];//随机刷新数
	this.speed=5;//速度
	this.score=0;//分数
	this.fs=document.querySelector('#score');//获取分数
	this.hp=10;//定义hp
	this.p=document.querySelector('#hp');//获取hp值
	this.countdowns=60;//模拟时间
	this.gk=10;//过关需要的数
	this.gkgs=1;//关卡
	this.customspass=document.querySelector('#customspass');//关卡
	this.keyflag=true;
	// console.log(this.customspass)
	// console.log(this.p)
	// console.log(this.fs)
}
game.prototype={
	play:function(){
		this.createElE();//循环页面出现字符数，想页面添加字符
		this.move();
		this.keyDown();
	},
	createElE:function(){
		for(var i=0;i<this.lengths;i++){
			this.getChar();
		};
	},
	getChar:function(){
		//this.char[num][1]
		/*
		替换图片
			setattribute创建一个属性节点
			创建的divs的innerHTML==图片地址
		*/
		/* 
		去重
			this.currentArr   产生的字符
			this.char    定义的
			吧两个值传入函数checkreppt

			遍历 curr的inner==arr1[0]
			return true

		*/

		var num=Math.floor(Math.random()*this.char.length);//随机一个字母
		while(this.checkRepeat(this.currentArr,this.char[num])){
			num=Math.floor(Math.random()*this.char.length);
		}

		var divs=document.createElement('div');//创建一个div
		var y=Math.random()*40+20;//外高
		var x=this.cw-Math.floor(Math.random()*10)*100-200;//外宽
		while(this.checkZB(this.currentArr,x)){
			x=this.cw-Math.floor(Math.random()*10)*100-200;//外宽
			return;
		};
		// this.positionArr.push({min:x,max:x+50});
		divs.style.cssText='width:80px;height:90px;font-size:0;text-align:center;background:url('+this.char[num][1]+')center no-repeat;background-size:cover;position:absolute;top:'+y+'px;left:'+x+'px;'
		divs.innerHTML=this.char[num][0];//页面内容=定义字符的数组的【num】【0】；
		document.body.appendChild(divs);//吧div插入页面
		this.currentArr.push(divs);//吧字符div放进数组
	},
	checkZB:function(arr,num){
		//浏览器宽度-随机产生一个10的随机数乘100 然后-200  循环divs的数组  回相对复原苏的坐标 ==x 如果一样则返回
		for(var i=0;i<arr.length;i++){
			if(arr[i].offsetLeft==num){
				// console.log(num)
				// console.log(arr[i].offsetLeft)
				return true;
			};
		};
			return false;
	},
	checkRepeat:function(arr,arr1){
		for(var i=0;i<arr.length;i++){
			if(arr[i].innerHTML==arr1[0]){
				return true;
			};
		};
		return false;
	},
	move:function(){
		var self=this;
		self.t=setInterval(move,100);//定义时间函数
		function move(){
			// 遍历页面中字符的长度
			for(var i=0;i<self.currentArr.length;i++){//遍历数组长度
				var tops=self.currentArr[i].offsetTop;//声明数组高度=当前高度
				self.currentArr[i].style.top=tops+self.speed+'px';//移动现在的高等于当前高加上速度 模拟以偶定
				if(tops>400){//当高度大于400 从数组中清除 div  截取数组字符
					document.body.removeChild(self.currentArr[i]);
					self.currentArr.splice(i,1);
					self.hp--;
					self.p.innerHTML=self.hp;
					//hp==0时暂停	
						var tt=setTimeout(function(){
							if(self.hp==0){//当值等于0时弹框询问
								clearTimeout(tt);
								alert('你的分数为：'+self.score)
								if(confirm('是否继续游戏！')){
									self.restart();
								}else{
									// close();
									 location.reload();
								};
							};
						},10);

				};
			};
			if(self.currentArr.length<self.lengths){//数组长度=规定长度  不等时随机产生字符
				self.getChar();
			};
		};
	},
	keyDown:function(){
		var self=this;//转换this指正/.bind(this)
		document.onkeydown=function(e){//index遍历的位置   //obj  遍历的对象
			self.currentArr.forEach(function(obj,index,arr){//forFach遍历数组
			if(self.keyflag){
				if(String.fromCharCode(e.keyCode)==obj.innerHTML){//键盘码转为UNcode编码等于数组的字符
					document.body.removeChild(obj);
					self.currentArr.splice(index,1);
					self.score++;
					self.fs.innerHTML++;
					self.customspass.innerHTML=self.gkgs;//当前关卡
					// console.log(self.score)
					// console.log(self.gkgs)
					// console.log(self.lengths)
					// console.log(self.fs.innerHTML)
					// console.log(self.customspass.innerHTML)
					// console.log(self.gk)
					if(self.fs.innerHTML==self.gk){//页面分数等于过关需要的数量
						self.next();
					};
				};
				if(self.currentArr.length<self.lengths){
					self.getChar();;
				};
			}
			});
		};

	},
	restart:function(){
		// 停止时间  遍历清空 removeChild   数组
		clearInterval(this.t);
		for(var i=0; i<this.currentArr.length;i++){
			document.body.removeChild(this.currentArr[i]);
		}
		this.currentArr=[];
		this.hp=10;
		this.score=0;
		this.lengths=prompt('输入出现的字符数量','5');
		this.p.innerHTML=10;
		this.fs.innerHTML=0;
		this.speed=5;
		this.gk=10;//过关需要的数
		this.gkgs=1;//关卡
		this.countdowns.innerHTML=1
		this.positionArr=[];
		this.play();
	},
	next:function(){
		clearInterval(this.t);
		for(var i=0;i<this.currentArr.length;i++){
			document.body.removeChild(this.currentArr[i]);
		};
		this.currentArr=[];
		this.speed+=1;
		this.lengths++;
		this.gk*=3;
		// console.log(this.gk)
		this.gkgs++;
		// console.log(this.gkgs)
		// console.log(this.gk)
		if(this.gkgs==20||this.lengths==20){
			clearInterval(this.t);
			if(confirm("恭喜你，通关了，你的分数是："+this.fs.innerHTML+"\n你已经过了："+this.gkgs+"\n是否继续！")){
				self.restart();
			}else{
				close();
			};
		}
		this.play();
	},
	stop:function(){
		clearInterval(this.t);
		this.keyflag=false;
		// alert('点击继续');
	},
	goon:function(){
		this.move();
		this.keyflag=true;
	},
	oute:function(){
		clearInterval(this.t)
		location.reload();
		// location.reload();
	}

}