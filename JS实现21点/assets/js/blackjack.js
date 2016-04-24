/*随机生成一个花色
	1为红桃，2为方片，3为黑桃，4为梅花
*/
function Random(){ 
	var suit = Math.floor(Math.random()*(4-1+1)+1);
	return suit;
}
//判断花色并输出一张随机的牌
function cardRandom(suit){　	
	if(suit == 1){ 
		var pickSuit = Math.floor(Math.random()*(13-1+1)+1);//红桃pickSuit
	}else if(suit == 2){ 
		var pickSuit = Math.floor(Math.random()*(13-1+1)+1);//方片pickSuit
	}else if(suit == 3){ 
		var pickSuit = Math.floor(Math.random()*(13-1+1)+1);//黑桃pickSuit
	}else{ 
		var pickSuit = Math.floor(Math.random()*(13-1+1)+1);//梅花pickSuit
	}
	return pickSuit;
}
//判断点数
function judgeCount(pickSuit,cardSum){
	//将J，Q，K点数置为10
	if((pickSuit == 11)||(pickSuit == 12)||(pickSuit == 13))
		pickSuit = 10;
	//判断A是当做1还是11
	if(pickSuit == 1){ 
		if(cardSum+pickSuit > 11){ 
			pickSuit = 1;
		}else{ 
			pickSuit = 11;
		}
	}
	return pickSuit;
}
//还原点数
function reValue(liListValue){ 
	if(liListValue<100){ 
		return 10;
	}else{ 
		return 100;
	}
}
//控制其他按钮不可点击
document.getElementById('hit').disabled = true;
document.getElementById('stand').disabled = true;
//初始发牌，庄家一明一暗，玩家两明
function Deal(form){ 
	//判断若牌区有牌，则删除上一局的牌
	var divUl = document.getElementById('b_cardArea');
	var childs = divUl.childNodes; 
	if (childs) { 
  		for(var i = childs.length - 1; i >= 0; i--) { 
			divUl.removeChild(childs[i]); 
		}
		var divUl1 = document.getElementById('p_cardArea');
		var childs1 = divUl1.childNodes;
		for(var i = childs1.length - 1; i >= 0; i--) { 
			divUl1.removeChild(childs1[i]); 
		}
	};
	var b_cardSum = 0;
	var p_cardSum = 0;
	//庄家
	//暗牌
	var suit = Random();
	var pickSuit = cardRandom();
	var newLi = document.createElement('li');
	var classNode = document.createAttribute('class');
	classNode.value ='playCard playCard0';
	newLi.setAttributeNode(classNode);
	document.getElementById('b_cardArea').appendChild(newLi);
	//存牌的花色和点数
	var valueNode = document.createAttribute('value');
	valueNode.value =suit+''+pickSuit;
	newLi.setAttributeNode(valueNode);
	
	//明牌
	var newLi = document.createElement('li');
	var classNode = document.createAttribute('class');
	var suit = Random();
	var pickSuit = cardRandom();
	var p='playCard'+suit+pickSuit;
	classNode.value ='playCard'+' '+p;
	newLi.setAttributeNode(classNode);
	document.getElementById('b_cardArea').appendChild(newLi);
	//存牌的花色和点数
	var valueNode = document.createAttribute('value');
	valueNode.value =suit+''+pickSuit;
	newLi.setAttributeNode(valueNode);
	//计算点数
	var b_pickSuit=judgeCount(pickSuit,b_cardSum);
	b_cardSum+=b_pickSuit;
	//庄家点数更新
	var score = document.getElementById('b_score');
	score.innerHTML = b_cardSum;

	//玩家
	//两张明牌
	for(var i=0; i<2; i++){
		var newLi = document.createElement('li');
		var classNode = document.createAttribute('class');
		var suit = Random();
		var pickSuit = cardRandom();
		var p='playCard'+suit+pickSuit;
		classNode.value ='playCard'+' '+p;
		newLi.setAttributeNode(classNode);
		document.getElementById('p_cardArea').appendChild(newLi);
		//存牌的花色和点数
		var valueNode = document.createAttribute('value');
		valueNode.value =suit+''+pickSuit;
		newLi.setAttributeNode(valueNode);
		//计算点数
		var p_pickSuit = judgeCount(pickSuit,p_cardSum);
		p_cardSum += p_pickSuit;
	}
	//玩家点数更新
	var score = document.getElementById('p_score');
	score.innerHTML = p_cardSum;

	//控制其他按钮可点击
	document.getElementById('hit').disabled = false;
	document.getElementById('stand').disabled = false;

}

//玩家要牌
function Hit(form){ 
	//获取玩家当前每张牌的值，算总点数
	var p_cardSum = 0;
	var List=[];
	var divUl = document.getElementById('p_cardArea');
	var liList= divUl.getElementsByTagName('li');
	for(var i=0; i<liList.length; i++){ 
		List[i] = judgeCount((liList[i].value)%reValue(liList[i].value), p_cardSum);
		p_cardSum+=List[i];
	}


	//要一张牌，并判断是否爆了（大于21点）
	var newLi = document.createElement('li');
	var classNode = document.createAttribute('class');
	var suit = Random();
	var pickSuit = cardRandom();
	var p='playCard'+suit+pickSuit;
	classNode.value ='playCard'+' '+p;
	newLi.setAttributeNode(classNode);
	document.getElementById('p_cardArea').appendChild(newLi);
	//存牌的花色和点数
	var valueNode = document.createAttribute('value');
	valueNode.value =suit+''+pickSuit;
	newLi.setAttributeNode(valueNode);
	//计算点数
	var p_pickSuit = judgeCount(pickSuit,p_cardSum);
	p_cardSum += p_pickSuit;
	if(List[0]==11 &&(List[1]!=11)){
			if(p_cardSum>21){
				List[0] = 1;	
				p_cardSum = p_cardSum-10;	
			}
		}else if(List[0]!=11 &&(List[1]==11)){ 
			if(p_cardSum>21){ 
				List[1] = 1;	
				p_cardSum=p_cardSum-10;	
			}
		}
	//玩家点数更新
	var score = document.getElementById('p_score');
	score.innerHTML = p_cardSum;
	if(p_cardSum >21){ 
		document.getElementById('popup').style.display = "block";
		document.getElementById('popup').getElementsByTagName('span')[0].innerHTML = "玩家点数爆了，庄家赢！";
		//控制其他按钮不可点击
		document.getElementById('hit').disabled = true;
		document.getElementById('stand').disabled = true;
		document.getElementsByClassName('btn')[0].getElementsByTagName('input')[0].disabled = true;
	}
	document.getElementsByClassName('btn')[0].getElementsByTagName('input')[0].disabled = true;
}

//庄家开牌
function showdown(){ 	
	//获取庄家当前每张牌的值，算总点数
	var b_cardSum = 0;
	var List=[];
	var divUl = document.getElementById('b_cardArea');
	var liList= divUl.getElementsByTagName('li');
	for(var i=0;i<liList.length;i++){ 
		List[i]=judgeCount((liList[i].value)%reValue(liList[i].value),b_cardSum);
		b_cardSum += List[i];
	}
	//开暗牌
	var p = 'playCard'+(Math.floor(liList[0].value/reValue(liList[0].value)))+(liList[0].value%reValue(liList[0].value));
	liList[0].removeAttribute('class');
	var classNode = document.createAttribute('class');
	classNode.value ='playCard'+' '+p;
	liList[0].setAttributeNode(classNode);

	while(b_cardSum<=17){	
		//要一张牌，并判断是否爆了（大于21点）
		var newLi = document.createElement('li');
		var classNode = document.createAttribute('class');
		var suit = Random();
		var pickSuit = cardRandom();
		var p='playCard'+suit+pickSuit;
		classNode.value ='playCard'+' '+p;
		newLi.setAttributeNode(classNode);
		document.getElementById('b_cardArea').appendChild(newLi);
		var b_pickSuit = judgeCount(pickSuit,b_cardSum);
		b_cardSum += b_pickSuit;
		if(List[0]==11 &&List[1]!=11){
			if(b_cardSum>21){
				 List[0] = 1;	
				b_cardSum = b_cardSum-10;	
			}
		}else if(List[0]!=11 &&List[1]==11){ 
			if(b_cardSum>21){ 
				List[1] = 1;	
				b_cardSum=b_cardSum-10;	
			}
		}
	}
	//庄家点数更新
	var score = document.getElementById('b_score');
	score.innerHTML = b_cardSum;
	return b_cardSum;
}

//玩家喊停
function Stand(form){ 
	//庄家开牌后总点数
	var bScore = showdown();
	if(bScore>21){ 
		document.getElementById('popup').style.display = "block";
		document.getElementById('popup').getElementsByTagName('span')[0].innerHTML = "庄家点数爆了，玩家赢！";
	}else{
		//玩家总点数
		var pScore = 0;
		var divUl = document.getElementById('p_cardArea');
		var liList= divUl.getElementsByTagName('li');
		for(var i=0; i<liList.length; i++){ 
			pScore += judgeCount((liList[i].value)%reValue(liList[i].value), pScore);
		}
		if(bScore>pScore){ 
			document.getElementById('popup').style.display = "block";
			document.getElementById('popup').getElementsByTagName('span')[0].innerHTML = "庄家赢！";
		}else if(bScore<pScore){ 
			document.getElementById('popup').style.display = "block";
			document.getElementById('popup').getElementsByTagName('span')[0].innerHTML = "玩家赢！";
		}else{ 
			document.getElementById('popup').style.display = "block";
			document.getElementById('popup').getElementsByTagName('span')[0].innerHTML = "平局了！";
		}
	}
	//控制其他按钮不可点击
	document.getElementById('hit').disabled = true;
	document.getElementById('stand').disabled = true;
	document.getElementsByClassName('btn')[0].getElementsByTagName('input')[0].disabled = true;
}
//关闭弹窗
function Close(form){ 
	document.getElementById('popup').style.display = "none";
	//启动DEAL发牌按钮
	document.getElementsByClassName('btn')[0].getElementsByTagName('input')[0].disabled = false;

}