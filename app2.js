document.addEventListener('DOMContentLoaded', () => {

	/**
	 * les Variables
	 */
	var gameStart = false;
    const startMin = 0;
	const startSec = 10;
	const srcMonster = 'imgs/monster.png'
	const srcExplosion = 'imgs/explosion.png'


    let time = startMin * 60 + startSec;
    const countdownAff = document.getElementById('countdown');
	const bombAff = document.getElementById('bomb');


	/**
	 * le systeme
	 */
	// time
	const interval = setInterval(updateCountdown, 1000);
	// aff dans canva
	canva();



	/**
	 * les functions
	 */
	function canva() {
		var canvas = document.getElementById("gameArea");
		context = canvas.getContext("2d");
	 
		var imageParametre = new Image();
		imageParametre.src = srcMonster;
		let x = getRandomInt(710);
		let y = getRandomInt(470);
		imageParametre.addEventListener('load', function () {
			startDraw(x, y);
		});

		function startDraw(x, y) {
			context.drawImage(imageParametre, x, y, 40, 29);
		}
	}


    function updateCountdown() {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;

		if (time < 0) 
		{
			bombAff.innerHTML = "<img src='"+srcExplosion+"'></img>";
			countdownAff.innerHTML = `Time's up!`;

			clearInterval(interval);
		}
		else
		{
			seconds = seconds < 10 ? '0' + seconds : seconds;
			minutesAff = minutes < 10 ? '0' + minutes : minutes;
			countdownAff.innerHTML = `${minutesAff}:${seconds}`;
			time--;
		}
    }



	function getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}





});
