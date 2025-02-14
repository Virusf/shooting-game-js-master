document.addEventListener('DOMContentLoaded', function() {

    const canvas = document.getElementById('gameArea');
    const ctx = canvas.getContext('2d');

    const startButton = document.querySelector('.start');
	const score = document.getElementById('score');

    const countdownAff = document.getElementById('countdown');
	const bombAff = document.getElementById('bomb');

    const image = new Image();
    image.src = 'imgs/monster.png';

	const imageEx = new Image();
	imageEx.src = 'imgs/explosion.png';

	const imageBomb = new Image();
	imageBomb.src = 'imgs/bomb.png';


    let gameRunning = false;
	let debug = false;
    let images = [];
	let nbrsScore = 0;
	let nbrsSpawnImg = 2;

	var textString = "Time's up!";


	const startMin = 0;
	const startSec = 10;
	let time = startMin * 60 + startSec;



    function startGame() {
		init()

        spawnImage();
    }

    function spawnImage() 
	{
        if (!gameRunning) return;

		image.onload = function() {
			const imgWidth = this.width;
			const imgHeight = this.height;
	
			const x = Math.random() * (canvas.width - imgWidth);
			const y = Math.random() * (canvas.height - imgHeight);
			const imgObj = { x, y, width: imgWidth, height: imgHeight };
			images.push(imgObj);
	
			ctx.drawImage(image, x, y, imgWidth, imgHeight);

			// debug 
			if (debug) 
			{
				ctx.strokeStyle = 'red';
				ctx.lineWidth = 1;
				ctx.strokeRect(x, y, imgWidth, imgHeight);
			}

			
		};


		for (let index = 0; index < nbrsSpawnImg; index++) 
		{
			if (image.complete) {
				image.onload();
			}
		}


		updateCountdown()

		setTimeout(spawnImage, 1000);
    }


	function updateCountdown() {

		let minutes = Math.floor(time / 60);
		let seconds = time % 60;
		if (time < 0) 
		{
			gameRunning = false;
			startButton.disabled = false;

			endMessage();
		}
		else
		{
			seconds = seconds < 10 ? '0' + seconds : seconds;
			let minutesAff = minutes < 10 ? '0' + minutes : minutes;
			countdownAff.innerHTML = `${minutesAff}:${seconds}`;
			time--;
		}
	}



    canvas.addEventListener('click', function(event) 
	{
        if (!gameRunning) return;

        const rect = canvas.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;



        for (let i = 0; i < images.length; i++) {
            const img = images[i];
			let d1 = 0; 
			let d2 = 0;

            if (clickX > img.x && clickX < img.x + img.width+3 && 
				clickY > img.y && clickY < img.y + img.height+3) {
                images.splice(i, 1); // Supprimer l'élément à l'index i
				
				// -1 et +2 pour le mode debug
				if (debug) {
					d1 = 1; 
					d2 = 2;
					console.log(img.x, img.y, img.x+img.width, img.y+img.height);
					console.log(clickX, clickY);
				}

				ctx.clearRect(img.x-d1, img.y-d1, img.width+d2, img.height+d2);

				// ctx.drawImage(imageEx, img.x, img.y, img.Width, img.Height);
				ctx.drawImage(imageEx, img.x, img.y, img.width, img.height);
				setTimeout(() => {
					ctx.clearRect(img.x, img.y, img.width, img.height);
				}, 200);

				nbrsScore++;
				score.innerHTML = nbrsScore;

                break;
            }
        }
    });

	function init() 
	{
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		bombAff.innerHTML = "<img src='"+imageBomb.src+"'></img>";

        gameRunning = true;
        startButton.disabled = true;

		time = startMin * 60 + startSec;

		let minutes = Math.floor(time / 60);
        let seconds = time % 60;

		seconds = seconds < 10 ? '0' + seconds : seconds;
		let minutesAff = minutes < 10 ? '0' + minutes : minutes;
		countdownAff.innerHTML = `${minutesAff}:${seconds}`;
	}

	function endMessage() 
	{
		bombAff.innerHTML = "<img src='"+imageEx.src+"' width='50' height='50'></img>";
		countdownAff.innerHTML = textString;

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.fillStyle = "#ff0000";
		ctx.font = '48px sans-serif';
		textWidth = ctx.measureText(textString).width;
		textHeight = 250;

		ctx.fillText(textString, (canvas.width/2) - (textWidth / 2),textHeight);
	}

    startButton.addEventListener('click', startGame);
});
