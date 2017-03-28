/*
	获取指定类名的元素集合
	getClass(classname,obj)
	classname:指定类名
	obj:范围，是一个对象
	思路：
		判断浏览器是否支持该方法；
			true  document.getElementByClassName
			false  其他方法模拟
				1、获取所有元素
				2、筛选		obj.className==classname	
*/

function getClass(classname,obj){
	//obj= obj==undefined?document:obj;
	//obj= obj?obj:document;
	obj= obj||document;

	if(document.getElementsByClassName){
		return obj.getElementsByClassName(classname);
	}else{
		var arr=[];
		var all=obj.getElementsByTagName('*');
		for(var i=0;i<all.length;i++){
				//当前元素类名包含指定类名
			if(cleckClass(all[i].className,classname)){
				arr.push(all[i]);
			}
		}
		return arr;
	}
}

        /*

		checkClass(str,str1)
		某个元素的类名是否包含指定类名
		str  某个对象的类名
		str1 指定的类名
		拆分
			指定对象的类名
			arr=obj.classaName.split('')；
		遍历
			className是否存在于 arr

		*/

		function checkClass(str,str1){
			var arr=str.split(' ');
			for(var i=0;i<arr.length;i++){
				if(arr[i]==str1){
					return true;
				}
			}
			return false;
		}



	/*
	一、设置元素文本  setText(obj,text)

	1、判断浏览器
		obj.innerText  obj.textContent
	2、obj.innerText=text  obj.textContent=text
	
	二、获取文本  setText(obj)

	一，二  函数重载（参数个数不同，实现不同的效果）

	bug：获取的文本可能为undefined;

	*/
	function setText(obj,text){
		if(arguments.length==1){
			if(obj.innerText){
				return obj.innerText;
			}else{
				return obj.textContent;
			}
		}else if(arguments.length==2){
			if(obj.innerText){
				obj.innerText=text;
			}else{
				obj.textContent=text;
			}
		}
		
	}



	/*
	获取元素样式的样式
	getStyle（obj,attr）


	*/
	function getStyle(obj,attr){
		if(window.getComputedStyle){
			return getComputedStyle(obj,null)[attr];
			/*return getComputerStyle(obj,null).arrt
			  获取属性的两种方法：对象.属性；
			  					  对象[“属性”]
			  最后不能是.arrt，因为调用函数时参数是一个字符串
			*/;
		}else{
			return obj.currentStyle[attr];
		}
	}




	/*
	获取元素
	$(selsct,ranger(范围))
	$('.box')
	getClass('box')
	  首字符
	  	.
	  	#
	  	符合标签
	*/

	function $(select,ranger){
		if(typeof(select)=='function'){
/*			window.onload=function(){
				select();
			}*/
			addEvent(window,'load',select);
		}else if(typeof(select)=='string'){		
			ranger=ranger?ranger:document;
			var first=select.charAt(0);
			if(first=='.'){
				return getClass(select.substring(1),ranger);
			}else if(first=='#'){
				return document.getElementById(select.substring(1));
			}else if(/^[a-zA-Z][a-zA-Z1-6]{0,7}$/.test(select)){
				return ranger.getElementsByTagName(select);
			}else if(/^<[a-zA-Z][a-zA-Z1-6]{0,7}>$/.test(select)){
				return document.createElement(select.slice(1,-1));
			}
		}
	}
	
	/*
	getChild(obj)
	获取指定元素的元素节点的集合

	模拟	
	 */
	
	function getChild(obj,type){
		type=type===undefined?true:type;		
		var childs=obj.childNodes;
		var arr=[];
		if(type){
			for(var i=0;i<childs.length;i++){
				if(childs[i].nodeType==1){
					arr.push(childs[i]);
				}
			}
			return arr;			
		}else{
			for(var i=0;i<childs.length;i++){
				if(childs[i].nodeType==1 || (childs[i].nodeType==3&&childs[i].nodeValue.trim().length>0)){
					arr.push(childs[i]);
				}
			}
			return arr;
		}
	}

//获得第一个子节点
	function firstChild(obj,type){
		type=type===undefined?true:type;
		return getChild(obj,type)[0];
	}
//获得最后一个子节
	function lastChild(obj,type){
		type=type===undefined?true:type;
		var childs=getChild(obj,type);
		return(childs[childs.length-1]);
	}
	//随机获取一个子节点
	function randomChild(obj,num,type){
		type=type===undefined?true:type;
		var childs=getChild(obj,type);
		if(num<0||num>childs.length-1){
			return;
		}
		return(childs[num]);
	}


	/*
	getNext(obj)	 
	找相邻的兄弟元素节点
	*/
	//下一个兄弟
	function getNext(obj){
		var Next=obj.nextSibling;
		if(Next===null){
			return false;
		}
		while(Next.nodeType!=1){
			Next=Next.nextSibling;
			if(Next===null){
				return false;
			}
		}
		return Next;
	}
//上一个的节点
	function getPrevious(obj){
		var Next=obj.previousSibling;
		if(Next===null){
			return false;
		}
		while(Next.nodeType!=1){
			Next=Next.previousSibling;
			if(Next===null){
				return false;
			}
		}
		return Next;
	}


	/*
	在指定元素后面插入一个元素节点（obj下一个兄弟元素的前面）
	insertAfter(obj,ele)
	obj:位置  获取下一个兄弟节点
		false  插入父元素的最后
		next   parent.insertBefore(ele,next)
	ele:要插入的元素
	*/

	function insertAfter(obj,ele){
		var next=getNext(obj);
		var parent=obj.parentNode;
		if(next){
			parent.insertBefore(ele,next);
		}else{
			parent.appendChild(ele);
		}
	}
	
/*getEvent(obj事件,type,fn*/
	//添加事件
	function addEvent(obj,type,fn){
		if(addEventListener){
			obj.addEventListener(type,fn,false)
		}else{
			obj.attachEvent('on'+type,fn)
		}
	}
	//删除事件
	function removeEvent(obj,type,fn){
		if(removeEventListener){
			obj.removeEventListener(type,fn,false)
		}else{
			obj.detachEvent('on'+type,fn)
		}
	}
	
/*offset
获取页面中 任意元素相对于浏览器的位置
所有具有定位属性的父辈元素的offsetLeft+左边框+本身的相对位置
*/
function offset(obj){
	var result={left:0,top:0};
	//获取obj的所有具有定位属性的父辈元素
	var parent=obj.parentNode;
	var arr=[];
	//父元素的名字等于body
	while(parent.nodeName=='BODY'){
		//判断元素有没有定位
		if(getStyle(parent,'position')=='relative'||getStyle(parent,'absolute')){
			arr.push(parent);
		}
		parent=parent.parentNode;
	}
	for(var i=0;i<arr.length;i++){
		//获取父元素的宽高
		//获取父元素左上边框的宽
		var offsetl=arr[i].offsetLeft;
		var offsett=arr[i].offsetTop;
		var blw=getClass(arr[i],'border-left-width')?parseInt(getStyle(arr[i],'border-left-width')):0;
		var btw=getClass(arr[i],'border-Top-width')?parseInt(getStylel(arr[i],'border-top-width')):0;
		if(i==0){
			blw=0;
			btw=0;
		}
		result.left+=offsetl+blw
		result.top+=offsett+btw
	}
}


/*  滚轮事件 
	obj    downfn  upfn   
	先判断支持哪个方式attachEvent / addEventListener
*/
	function mousewheel(obj,upfn,downfn){
		if(addEventListener){
			obj.addEventListener('mousewheel',scrollfn,false)
			obj.addEventListener('DOMMmouseScroll',scrollfn,false)
		}else if(attachEvent){
			obj.attachEvent('onmousewheel',scrollfn)
		}
		function scrollfn (e){
			var ev=e||window.event;
			//事件对象阻止浏览器默认行为
			if (ev.preventDefault ){
				ev.preventDefault(); //阻止默认浏览器动作W3
			}else{
				ev.returnValue = false;//IE中阻止函数器默认动作
			}
			var dir=e.wheelDelta||e.detil;
			if(dir==-120||dir==3){
				downfn.call(obj);
			}else if(dir==120||dir==-3){
				upfn.apply(obj);
			}
		}
	}

//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
// 事件委派兼容
 function getEvent (e) {
      return e||window.event;
 }
 /*****************************************************/