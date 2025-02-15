document.addEventListener('DOMContentLoaded', function () {

    const gameArea = document.querySelector('.gameArea');
    const startButton = document.querySelector('.start');
    const scoreDisplay = document.getElementById('score');
    const countdownDisplay = document.getElementById('countdown');

    const targetImage = 'imgs/monster.png';
	const widthImg = 40;
	const heightImg = 29;
	const exploImage = 'imgs/explosion.png';
    let gameRunning = false;

	const startMin = 0;
	const startSec = 10;

    function spawnTarget() {
        const target = document.createElement('img');
        target.src = targetImage;
        target.id = 'target';

        // Position aléatoire
        const x = Math.random() * (gameArea.offsetWidth - widthImg);
        const y = Math.random() * (gameArea.offsetHeight - heightImg);
		// console.log(x, y);
        target.style.left = x + 'px';
        target.style.top = y + 'px';

        // Ajouter la cible à la zone de jeu
        gameArea.appendChild(target);

        // Gestion du clic sur la cible
		target.addEventListener('click', function () {
			score++;
			scoreDisplay.textContent = score;
		
			// Change l'image pour l'explosion
			target.src = exploImage;
		
			// Attend 200 ms avant de supprimer l'élément
			setTimeout(() => {
				target.remove();
			}, 200);
		});

        // Supprimer la cible après 2 secondes si elle n'est pas cliquée
        setTimeout(() => {
            if (target.parentNode) {
                target.remove();
            }
        }, 2500);
    }


	function updateCountdownDisplay(time) {
		const minutes = Math.floor(time / 60).toString().padStart(2, "0");
		const seconds = (time % 60).toString().padStart(2, "0");
		countdownDisplay.innerHTML = `${minutes}:${seconds}`;
	}


    startButton.onclick = function () {
		if (gameRunning) return;
	
		// Réinitialise le jeu
		gameArea.innerHTML = "";
		gameRunning = true;
		score = 0;
	
		// Initialisation du temps
		let time = startMin * 60 + startSec;
	
		// Mise à jour initiale de l'affichage
		updateCountdownDisplay(time);
		scoreDisplay.textContent = score;
	
		// Démarre le jeu avec un intervalle
		const interval = setInterval(() => {
			if (time <= 0) {
				clearInterval(interval);
				gameRunning = false;
	
				// Affiche le message de fin
				countdownDisplay.innerHTML = gameArea.innerHTML = "Time's up!";
				gameArea.classList.add("game-over");
			} else {
				// Décrémente le temps et met à jour l'affichage
				time--;
				updateCountdownDisplay(time);
	
				// Fait apparaître une nouvelle cible
				spawnTarget();
			}
		}, 1000);
	};
});
