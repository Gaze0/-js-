var game = {
	own: {
		own1: {
			style: 'own1',
			blood: 5,
			skill: 3
		},
		own2: {
			style: 'own2',
			blood: 5,
			skill: 3
		},
		own3: {
			style: 'own3',
			blood: 5,
			skill: 3
		}
	},
	enemy: {
		enemy1: {
			style: 'enemy1',
			blood: 6,
			score: 200,
			special: false
		},
		enemy2: {
			style: 'enemy2',
			blood: 10,
			score: 500,
			special: true
		},
		enemy3: {
			style: 'enemy3',
			blood: 14,
			score: 800,
			special: false
		},
	},
	BossData: {
		b1: {
			style: 'boss1',
			blood: 500,
			score: 100,
			speed: 8,
			bulletspeed: 12
		},
		b2: {
			style: 'boss2',
			blood: 1000,
			score: 150,
			speed: 12,
			bulletspeed: 16
		},
		b3: {
			style: 'boss3',
			blood: 3000,
			score: 200,
			speed: 16,
			bulletspeed: 20
		}
	},

	bullet: {
		bullet1: {
			style: 'bullet1',
			dam: 2
		},
		bullet2: {
			style: 'bullet2',
			dam: 3
		},
		bullet3: {
			style: 'bullet3',
			dam: 4
		}
	},
	gkData: {
		gk1: {
			style: 'url(img/bac.jpg)',
			enemyNum: 25,
			boss: 'boss1'
		},
		gk2: {
			style: 'url(img/bac1.jpg)',
			enemyNum: 35,
			boss: 'boss2'
		},
		gk3: {
			style: 'url(img/bac3.jpg)',
			enemyNum: 45,
			boss: 'boss3'
		}
	},
	num: 1, //关卡
	b: 1, //记录子弹伤害
	sum: 0, //分数
	init() {
		this.main = document.querySelector('#main');
		this.creatBac();
		this.begin();
		// this.begin();
	},
	// begin() {
	// 	
	// 	// this.victory();
	// 	// this.score();
	// 	var begin = document.createElement('div');
	// 	begin.id = 'begin';
	// 	begin.innerHTML = '开始游戏';
	// 	this.main.appendChild(begin);
	// 	This = this;
	// 	begin.onclick = function() {
	// 		this.parentNode.removeChild(this);
	// 		This.gameBegin();
	// 	}
	// },
	begin() {
		var begin = document.createElement('div');
		begin.id = 'begin';
		begin.innerHTML = '<img id="logo" src="img/logo.png" alt=""><img id="start" src="img/start.png" alt="">';
		this.main.appendChild(begin);
		This = this;
		var aaa = document.getElementById('aaa');
		begin.onclick = function() {
			this.parentNode.removeChild(this);
			This.gameBegin();
			This.creatScore();
			aaa.play();
		}
	},

	gameBegin() {
		this.creatAir();
		this.moveAir();
		this.bacMove();
		this.air.style.transition = '1s';
		this.air.style.bottom = '10px';
		var This = this;
		timer = setTimeout(function() { //延时定时器
			This.creatBull.timer = setInterval(This.creatBull.bind(This), 200); //创建子弹定时器
		}, 1000)
		This.creatEnemy.timer = setInterval(This.creatEnemy.bind(This), 700); //创建敌人定时器
	},


	creatBac() { //创建背景
		var bac1 = document.createElement('div');
		var bac2 = document.createElement('div');
		this.bac1 = bac1;
		this.bac2 = bac2;
		bac1.id = 'bac1';
		bac2.id = 'bac2';
		// This = this;
		bac1.style.backgroundImage = this.gkData['gk' + (this.num) + ''].style;
		bac2.style.backgroundImage = this.gkData['gk' + (this.num) + ''].style;
		this.main.appendChild(bac1);
		this.main.appendChild(bac2);
	},

	bacMove() {
		this.gkData.timer = setInterval(function() { //关卡背景图移动定时器
			bac1.style.top = bac1.offsetTop + 5 + 'px';
			bac2.style.top = bac2.offsetTop + 5 + 'px';
			if (parseInt(bac1.style.top) > 760) {
				bac1.style.top = '-768px';
			}
			if (parseInt(bac2.style.top) > 760) {
				bac2.style.top = '-768px';
			}
		}, 50)
	},

	creatAir() { //创建飞机
		var air = document.createElement('div');
		this.air = air;
		air.id = 'fj';
		var This = this;
		var timer;
		this.main.appendChild(air);
		air.style.left = (this.main.offsetWidth - air.offsetWidth) / 2 + 'px';
	},
	moveAir() { //移动飞机
		var onoff1 = false;
		var onoff2 = false;
		var onoff3 = false;
		var onoff4 = false;
		var This = this;
		var timer;
		var dir;
		document.onkeydown = function(e) {
			This.air.style.transition = '';
			dir = e.keyCode;
			switch (dir) {
				case 37:
					onoff1 = true;
					break;
				case 38:
					onoff2 = true;
					break;
				case 39:
					onoff3 = true;
					break;
				case 40:
					onoff4 = true;
					break;
			}
			if (!timer) {
				timer = setInterval(run, 20) //移动飞机定时器
			}
			e.preventDefault();
		}
		document.onkeyup = function(ev) {
			dir = ev.keyCode;
			// if( dir == 32 ){
			//     This.creatBull();
			//     return;
			// }
			switch (dir) {
				case 37:
					onoff1 = false;
					This.air.style.width = '76px';
					This.air.style.backgroundPositionX = '-118px';
					break;
				case 38:
					onoff2 = false;
					break;
				case 39:
					onoff3 = false;
					This.air.style.width = '76px';
					This.air.style.backgroundPositionX = '-118px';
					break;
				case 40:
					onoff4 = false;
					break;
			}
			clearInterval(timer); //清楚移动飞机定时器 
			timer = null;
		};

		function run() {
			if (onoff1) {
				This.air.style.left = This.air.offsetLeft - 10 + 'px';
				This.air.style.width = '66px';
				This.air.style.backgroundPositionX = '-198px';
			}
			if (onoff2) {
				This.air.style.top = This.air.offsetTop - 10 + 'px';
			}
			if (onoff3) {
				This.air.style.left = This.air.offsetLeft + 10 + 'px';
				This.air.style.width = '66px';
				This.air.style.backgroundPositionX = '-53px';
			}
			if (onoff4) {
				This.air.style.top = This.air.offsetTop + 10 + 'px';
			}
			if (This.air.offsetLeft <= 0) {
				This.air.style.left = 0;
			}
			if (This.air.offsetLeft > This.main.offsetWidth - This.air.offsetWidth) {
				This.air.style.left = This.main.offsetWidth - This.air.offsetWidth + 'px';
			}
			if (This.air.offsetTop <= 0) {
				This.air.style.top = 0;
			}
			if (This.air.offsetTop > This.main.offsetHeight - This.air.offsetHeight) {
				This.air.style.top = This.main.offsetHeight - This.air.offsetHeight + 'px';
			}
			if (This.bosswarp) {
				if (This.pzjc(This.bosswarp, This.air)) {
					for (var i = 0; i < 100; i++) {
						clearInterval(i);
						document.onkeydown = null;
						This.main.onclick = null;
					}
					console.log(1)
					This.over();
				}
			}
		}

	},

	creatBull() { //创建自己子弹   p
		var bullet = document.createElement('p');
		// console.log(this.b);
		bullet.className = this.bullet['bullet' + this.b + ''].style;
		// console.log(bullet.className)
		bullet.dam = this.bullet['bullet' + this.b + ''].dam;
		// console.log(bullet.dam)
		this.main.appendChild(bullet);
		bullet.style.left = this.air.offsetLeft + this.air.offsetWidth / 2 - bullet.offsetWidth / 2 + 'px';
		bullet.style.top = this.air.offsetTop - bullet.offsetHeight + 'px';
		this.moveBullet(bullet);

	},

	moveBullet(bullet) { //自己子弹飞
		var This = this;
		var timer = setInterval(function() { //子弹移动定时器
			if (bullet.offsetTop < -(bullet.offsetHeight)) {
				clearInterval(timer); //清除子弹移动定时器
				this.main.removeChild(bullet);
			} else {
				bullet.style.top = bullet.offsetTop - 5 + 'px';
			}
			if (this.gkData['gk' + (this.num) + ''].enemyNum == 0) {
				this.daBoss(bullet, timer);
			}
			// var bullets = this.main.querySelectorAll('');
			// console.log(this.gkData.gk1.enemyNum);
			var enemys = this.main.querySelectorAll('span');
			// console.log(enemys)
			for (var i = 0; i < enemys.length; i++) {
				if (this.pzjc(bullet, enemys[i])) {
					clearInterval(timer);
					this.main.removeChild(bullet);
					if (enemys[i].blood <= bullet.dam) {
						if (enemys[i].special == true) {
							var special = document.createElement('div');
							special.className = 'special';
							this.main.appendChild(special);
							special.style.left = enemys[i].offsetLeft + 'px';
							special.style.top = enemys[i].offsetTop + 'px';
							upgrade(special);
							this.main.removeChild(enemys[i]);
							this.sum += enemys[i].score;
							this.sumScore.innerHTML = this.sum;
							clearInterval(enemys[i].timer);
						} else {
							this.sum += enemys[i].score;
							this.sumScore.innerHTML = this.sum;
							this.main.removeChild(enemys[i]);
							clearInterval(enemys[i].timer);
						}
					} else {
						enemys[i].blood -= bullet.dam;
					}
				}

			}

			// console.log(456789)

			function upgrade(elem) {
				// console.log(this.air)
				var timer = setInterval(function() { //开特殊定时器
					elem.style.top = elem.offsetTop + 10 + 'px';
					if (elem.offsetTop > This.main.offsetHeight) {
						This.main.removeChild(elem);
					}
					if (This.pzjc(elem, This.air)) {
						// console.log(This.b);
						This.main.removeChild(elem);
						clearInterval(timer); //关特殊定时器
						if (This.b >= 3) {
							This.b = 3;
						} else {
							This.b = This.b + 1;
						}
						return;
					}
				}, 100)
			}
		}.bind(this), 10);
		// this.timer = timer;
		this.bullet.timer = timer;
	},

	creatScore() {
		var score = document.createElement('div');
		score.id = 'score';
		score.innerHTML = `总分：<h6>0</h6>`;
		var sumScore = score.querySelector('h6');
		this.sumScore = sumScore;
		this.main.appendChild(score);
	},

	creatEnemy() { //创建敌人
		// console.log(this.gkData.gk1.enemyNum);
		if (this.gkData['gk' + (this.num) + ''].enemyNum > 0) {
			if (Math.random() < 0.4) {
				var enemy1 = document.createElement('span');
				enemy1.innerHTML = `<img src="../img/enemy1.png" alt="">`;
				enemy1.className = 'enemy1';
				enemy1.blood = this.enemy.enemy1.blood;
				enemy1.special = this.enemy.enemy1.special;
				enemy1.score = this.enemy.enemy1.score;
				// console.log(enemy1.blood)
				this.main.appendChild(enemy1);
				enemy1.style.left = this.randomPos(0, 422) + 'px';
				var This = this;
				var enemy1Timer = setInterval(function() {
					enemy1.style.top = enemy1.offsetTop + 4 + 'px';
					if (This.pzjc(enemy1, This.air)) {
						for (var i = 0; i < 100; i++) {
							clearInterval(i);
						}
						document.onkeydown = null;
						This.main.onclick = null;
						clearInterval(enemy1Timer);
						clearInterval(This.enemy1Timer);
						clearInterval(This.enemy2Timer);
						clearInterval(This.enemy3Timer);
						clearInterval(This.creatEnemy.timer);
						clearInterval(This.gkData.timer);
						clearInterval(This.creatBull.timer);
						clearInterval(This.Bossbullet.timer);
						clearInterval(This.Bossmove.timer);
						var lis = This.main.querySelectorAll('li');
						var h3s = This.main.querySelectorAll('h3');
						var h2s = This.main.querySelectorAll('h2');
						var ps = This.main.querySelectorAll('p');
						This.clearBull(lis);
						This.clearBull(h3s);
						This.clearBull(h2s);
						This.clearBull(ps);
						console.log(2)
						This.over();
					}
					if (enemy1.offsetTop >= This.main.offsetHeight) {
						This.main.removeChild(enemy1);
						clearInterval(enemy1Timer);
					}
				}, 30)
				// console.log(enemy1.offsetTop);
				this.enemy1Timer = enemy1Timer;
				this.gkData['gk' + (this.num) + ''].enemyNum--;
			} else if (Math.random() >= 0.4 && Math.random() < 0.8) {
				var enemy3 = document.createElement('span');
				enemy3.innerHTML = `<img src="../img/enemy1.png" alt="">`;
				enemy3.className = 'enemy3';
				enemy3.blood = this.enemy.enemy3.blood;
				enemy3.special = this.enemy.enemy3.special;
				enemy3.score = this.enemy.enemy3.score;
				this.main.appendChild(enemy3);
				enemy3.style.left = this.randomPos(0, 422) + 'px';
				var This = this;
				var enemy3Timer = setInterval(function() {
					enemy3.style.top = enemy3.offsetTop + 4 + 'px';
					if (This.pzjc(enemy3, This.air)) {
						for (var i = 0; i < 100; i++) {
							clearInterval(i);
						}
						document.onkeydown = null;
						This.main.onclick = null;
						clearInterval(enemy3Timer);
						clearInterval(This.enemy1Timer);
						clearInterval(This.enemy3Timer);
						clearInterval(This.enemy2Timer);
						clearInterval(This.creatEnemy.timer);
						clearInterval(This.gkData.timer);
						clearInterval(This.creatBull.timer);
						clearInterval(This.Bossmove.timer);
						clearInterval(This.Bossbullet.timer);
						var lis = This.main.querySelectorAll('li');
						var h3s = This.main.querySelectorAll('h3');
						var h2s = This.main.querySelectorAll('h2');
						var ps = This.main.querySelectorAll('p');
						This.clearBull(lis);
						This.clearBull(h3s);
						This.clearBull(h2s);
						This.clearBull(ps);
						console.log(3)
						This.over();
					}
					if (enemy3.offsetTop >= This.main.offsetHeight) {
						This.main.removeChild(enemy3);
						clearInterval(enemy3Timer);
					}
					// if(enemy3.offsetTop==200){  //创建敌人子弹追踪自己位置
					// 	createnemyBull();
					// }
				}, 30)
				this.enemy3Timer = enemy3Timer;
				this.gkData['gk' + (this.num) + ''].enemyNum--;
			} else if (Math.random() >= 0.8) {
				var enemy2 = document.createElement('span');
				enemy2.className = 'enemy2';
				enemy2.blood = this.enemy.enemy2.blood;
				enemy2.special = this.enemy.enemy2.special;
				enemy2.score = this.enemy.enemy2.score;
				this.main.appendChild(enemy2);
				enemy2.style.left = this.randomPos(0, 422) + 'px';
				var This = this;
				var enemy2Timer = setInterval(function() {
					enemy2.style.top = enemy2.offsetTop + 4 + 'px';
					if (This.pzjc(enemy2, This.air)) {
						for (var i = 0; i < 100; i++) {
							clearInterval(i);
						}
						document.onkeydown = null;
						This.main.onclick = null;
						clearInterval(enemy2Timer);
						clearInterval(This.enemy1Timer);
						clearInterval(This.enemy3Timer);
						clearInterval(This.enemy2Timer);
						clearInterval(This.creatEnemy.timer);
						clearInterval(This.gkData.timer);
						clearInterval(This.creatBull.timer);
						clearInterval(This.Bossmove.timer);
						clearInterval(This.Bossbullet.timer);
						var lis = This.main.querySelectorAll('li');
						var h3s = This.main.querySelectorAll('h3');
						var h2s = This.main.querySelectorAll('h2');
						var ps = This.main.querySelectorAll('p');
						This.clearBull(lis);
						This.clearBull(h3s);
						This.clearBull(h2s);
						This.clearBull(ps);
						console.log(4)
						This.over();
					}
					if (enemy2.offsetTop >= This.main.offsetHeight) {
						This.main.removeChild(enemy2);
						clearInterval(enemy2Timer);
					}
				}, 30)
				this.enemy2Timer = enemy2Timer;
				this.gkData['gk' + (this.num) + ''].enemyNum--;
			}
			if (this.gkData['gk' + (this.num) + ''].enemyNum == 0) {
				this.creatBoss();
			}
		}


		// 
	},

	daBoss(bullet, timer) {
		if (this.pzjc(this.bosswarp, bullet)) {
			clearInterval(timer);
			this.main.removeChild(bullet);
			if (this.progress.value <= 0) {
				// clearInterval(timer);
				this.main.removeChild(this.bosswarp);
				for (var i = 0; i < 200; i++) {
					clearInterval(i);
					document.onkeydown = null;
					this.main.onclick = null;
				}
				clearInterval(this.Bossmove.timer);
				clearInterval(this.Bossbullet.timer);
				var lis = this.main.querySelectorAll('li');
				var h3s = this.main.querySelectorAll('h3');
				var h2s = this.main.querySelectorAll('h2');
				var ps = this.main.querySelectorAll('p');
				var enemys = this.main.querySelectorAll('span');
				this.clearBull(enemys);
				this.clearBull(lis);
				this.clearBull(h3s);
				this.clearBull(h2s);
				this.clearBull(ps);
				clearInterval(this.enemy1Timer);
				clearInterval(this.enemy2Timer);
				clearInterval(this.enemy3Timer);
				var This = this;
				this.air.style.left = (this.main.offsetWidth - this.air.offsetWidth) / 2 + 'px';
				var timer = setInterval(function() {
					this.air.style.top = this.air.offsetTop - 8 + 'px';
					if (this.air.offsetTop < -this.air.offsetHeight) {
						// clearInterval(timer);
						// for (var i = 0; i < 200; i++) {
						// 	clearInterval(i);
						// }
						clearInterval(This.Bossmove.timer);
						this.main.removeChild(this.air);
						This.victory();
						clearInterval(timer);
					}
				}.bind(this), 16);
			} else {
				this.progress.value -= (bullet.dam / this.bosswarp.blood * 100);
				// this.mySpan.innerText = this.progress.value + '%';
			}
		}
	},

	nextGk() { //下一关
		this.num++;
		clearInterval(this.victory.timer);
		if (this.num == 4) {
			alert('恭喜通关');
			window.location.reload();
		} else {
			this.sum = 0;
			this.sumScore.innerHTML = this.sum;
			this.creatBac();
			this.gameBegin();
		}

	},

	victory() {
		// console.log(123)
		var victory = document.createElement('div');
		// this.victory = victory;
		victory.id = 'victory';
		victory.innerHTML = '<img src="img/victory.png" alt="">';
		this.main.appendChild(victory);
		var This = this;
		this.victory.timer = setTimeout(function() {
			This.main.removeChild(This.bac1);
			This.main.removeChild(This.bac2);
			This.main.removeChild(victory);
			This.nextGk();
		}, 2000)
	},

	clearBull(elem) {
		for (var i = 0; i < elem.length; i++) {
			this.main.removeChild(elem[i]);
		}
	},

	creatBoss() { //创建boss
		var bosswarp = document.createElement('div');
		this.bosswarp = bosswarp;
		bosswarp.className = 'bosswarp';
		bosswarp.blood = this.BossData['b'+this.num+''].blood;
		this.main.appendChild(bosswarp);
		bosswarp.innerHTML =
			` 
			<progress  id="myProgress" value="100" max="100"></progress>
			<h5 id="mySpan"></h5>`
		var mySpan = this.main.querySelector('#mySpan');
		var progress = this.main.querySelector('progress');
		this.progress = progress;
		this.mySpan = mySpan;
		this.Bossmove();
		this.Bossbullet();
	},

	Bossmove() { //boss移动
		var speedX = this.BossData.b1.speed; //This
		var bosswarp = document.querySelector('.bosswarp');
		this.Bossmove.timer = setInterval(function() {
			if (bosswarp.offsetLeft >= 252) {
				speedX *= -1;
			} else if (bosswarp.offsetLeft <= 0) {
				speedX *= -1;
			}
			bosswarp.style.left = bosswarp.offsetLeft + speedX + 'px';
		}, 200)

	},

	Bossbullet() { //boss子弹生成
		var This = this;
		this.Bossbullet.timer = setInterval(function() {
			var li = document.createElement('li');
			var h3 = document.createElement('h3');
			var h2 = document.createElement('h2');
			var lis = document.getElementsByTagName('li');
			h2.className = 'bossbullet1';
			h3.className = 'bossbullet';
			li.className = 'bossbullet';
			This.main.appendChild(li);
			This.main.appendChild(h3);
			This.main.appendChild(h2);
			li.style.left = This.bosswarp.offsetLeft + 'px';
			li.style.top = This.bosswarp.offsetHeight + 'px';
			h3.style.left = This.bosswarp.offsetLeft + This.bosswarp.offsetWidth - 6 + 'px';
			h3.style.top = This.bosswarp.offsetHeight + 'px';
			h2.style.left = This.bosswarp.offsetLeft + (This.bosswarp.offsetWidth / 2) - 6 + 'px';
			h2.style.top = This.bosswarp.offsetHeight + 'px';
			This.Bossbulletfly(li);
			This.Bossbulletfly(h3);
			This.Bossbulletfly1(h2);
		}, This.ran())
	},
	// 
	Bossbulletfly(elem) { //让子弹飞
		var speed = 12;
		var This = this;
		var tim = setInterval(function() {
			elem.style.top = elem.offsetTop + 15 + 'px';
			if (parseInt(elem.style.top) > This.main.offsetHeight) {
				clearInterval(tim);
				This.main.removeChild(elem);
			}
			if (This.pzjc(elem, This.air)) {
				clearInterval(tim);
				clearInterval(This.enemy1Timer);
				clearInterval(This.enemy3Timer);
				clearInterval(This.enemy2Timer);
				clearInterval(This.creatEnemy.timer);
				clearInterval(This.gkData.timer);
				clearInterval(This.creatBull.timer);
				clearInterval(This.Bossmove.timer);
				clearInterval(This.Bossbullet.timer);
				// This.main.removeChild(elem);
				// console.log(5)
				This.over();
				var lis = This.main.querySelectorAll('li');
				var h3s = This.main.querySelectorAll('h3');
				var h2s = This.main.querySelectorAll('h2');
				var ps = This.main.querySelectorAll('p');
				This.clearBull(lis);
				This.clearBull(h3s);
				This.clearBull(h2s);
				This.clearBull(ps);
				for (var i = 0; i < 100; i++) {
					clearInterval(i);
					document.onkeydown = null;
					This.main.onclick = null;
				}
				
			}
		}, 200)

	},

	Bossbulletfly1(elem) { //让子弹飞
		var speed = 12;
		var This = this;
		var timer = setInterval(function() {
			elem.style.top = elem.offsetTop + 15 + 'px';
			if (parseInt(elem.style.top) > This.main.offsetHeight) {
				clearInterval(timer);
				This.main.removeChild(elem);
			}
			if (This.pzjc(elem, This.air)) {
				clearInterval(timer);
				clearInterval(This.enemy1Timer);
				clearInterval(This.enemy3Timer);
				clearInterval(This.enemy2Timer);
				clearInterval(This.creatEnemy.timer);
				clearInterval(This.gkData.timer);
				clearInterval(This.creatBull.timer);
				clearInterval(This.Bossmove.timer);
				clearInterval(This.Bossbullet.timer);
				// This.main.removeChild(elem);
				// console.log(6)
				This.over();
				var lis = This.main.querySelectorAll('li');
				var h3s = This.main.querySelectorAll('h3');
				var h2s = This.main.querySelectorAll('h2');
				var ps = This.main.querySelectorAll('p');
				This.clearBull(lis);
				This.clearBull(h3s);
				This.clearBull(h2s);
				This.clearBull(ps);
				for (var i = 0; i < 100; i++) {
					clearInterval(i);
					document.onkeydown = null;
					This.main.onclick = null;
				}
			}
		}, 400)
	},

	ran() {
		return Math.floor((Math.random() * 4000) + 1000)
	},

	over() {
		var over = document.createElement('div');
		over.id = 'over';
		over.innerHTML = '<img src="img/f5.png" alt="">';
		var f5 = over.querySelector('img');
		this.main.appendChild(over);
		This = this;
		f5.onclick = function() {
			this.parentNode.parentNode.removeChild(this.parentNode);
			// This.pass();
			window.location.reload();
		}
	},



	randomPos(min, max) { //随机函数
		return Math.floor(Math.random() * (max - min + 1) + min);
	},

	pzjc(obj, obj1) { //碰撞检测
		var objLeft = obj.offsetLeft;
		var objWidth = objLeft + obj.offsetWidth;
		var objTop = obj.offsetTop;
		var objHeight = objTop + obj.offsetHeight;

		var obj1Left = obj1.offsetLeft;
		var obj1Width = obj1Left + obj1.offsetWidth;
		var obj1Top = obj1.offsetTop;
		var obj1Height = obj1Top + obj1.offsetHeight;
		if (!(objWidth < obj1Left || objHeight < obj1Top || obj1Width < objLeft || obj1Height < objTop)) {
			return true;
		} else {
			return false;
		}
	},
}
game.init();
// var timer = setTimeout(function() {}, 1000);
// //  清除多余的定时器  
// clearTimeout(timer)
// //  输出定时器的数量
// //  因为自己派发了一个，所以要减1
// console.log(timer - 1)
