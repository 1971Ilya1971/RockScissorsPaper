document.addEventListener('DOMContentLoaded', function () {
	const countUser = document.querySelector('.count-user'),
	countComp = document.querySelector('.count-comp'),
	userField = document.querySelector('.user-field'),
	compField = document.querySelector('.comp-field'),
	sound = document.querySelector('.sound'),
	play = document.querySelector('.play'),
	out = document.querySelector('.out');

	let res = document.querySelector('.result');
	let countU = 0;
	let countC = 0;

	function choiceComp(userCh) {
		let rand = Math.floor(Math.random() * 3);	
		let fields = compField.querySelectorAll('.field');
		compField.classList.add('blink');
		setTimeout(() => {
			compField.classList.remove('blink');
			let compCh = fields[rand].dataset.field;
			fields.forEach(item => item.classList.remove('active'));
			fields[rand].classList.add('active');
			winner(userCh, compCh);
		}, 3000);
	}

	function choiceUser(e) {
		let target = e.target;
		if (target.classList.contains('field')) {
			let fields = document.querySelectorAll('.field');
			fields.forEach(item => item.classList.remove('active', 'error'));
			let userCh = target.dataset.field;
			target.classList.add('active');
			choiceComp(userCh);
		}
	}

	function winner(userCh, compCh) {
		let comb = userCh + compCh;

		switch (comb) {
			case 'pp':
			case 'ss':
			case 'rr':
			res.innerText = 'Ничья!';
			sound.setAttribute('src', 'audio/draw.mp3');
			sound.play();
			break;
			
			case 'rs':
			case 'sp':
			case 'pr':
			res.innerText = 'Победили вы!';
			countU++;
			countUser.innerText = countU;
			compField.querySelector('[data-field="' + compCh + '"]').classList.add('error');
			sound.setAttribute('src', 'audio/win.mp3');
			sound.play();
			break;
			
			case 'sr':
			case 'ps':
			case 'rp':
			res.innerText = 'Победил компьютер!';
			countC++;
			countComp.innerText = countC;
			userField.querySelector('[data-field="' + userCh + '"]').classList.add('error');
			sound.setAttribute('src', 'audio/loss.mp3');
			sound.play();
			break;

			default:
			break;
		}
	}


	function playGame() {
		countU = 0;
		countC = 0;
		res.innerText = 'Сделайте выбор';
		countUser.innerText = '0';
		countComp.innerText = '0';
		let fields = document.querySelectorAll('.field');
		fields.forEach(item => item.classList.remove('active', 'error'));
	}

	userField.addEventListener('click', choiceUser);
	play.addEventListener('click', playGame);


});





