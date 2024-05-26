document.addEventListener('DOMContentLoaded', () => {
    const game = document.getElementById('game');
    const bins = {
        'trash-bin': document.getElementById('trash-bin'),
        'recycling-bin': document.getElementById('recycling-bin'),
        'compost-bin': document.getElementById('compost-bin')
    };

    let score = 0;
    const scoreElement = document.getElementById('score-value');
    const hearts = document.querySelectorAll('.heart');
    let lives = hearts.length;
    let gameInterval;

    const binWidth = bins['trash-bin'].offsetWidth;
    const gameWidth = game.offsetWidth;
    const moveSpeed = 10;

    // Handle keyboard events
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            moveBins(-moveSpeed);
        } else if (event.key === 'ArrowRight') {
            moveBins(moveSpeed);
        }
    });

    function moveBins(offset) {
        for (const binId in bins) {
            const bin = bins[binId];
            let left = bin.offsetLeft + offset;
            // Wrap around the game area
            if (left < -binWidth) {
                left = gameWidth;
            } else if (left > gameWidth) {
                left = -binWidth;
            }
            bin.style.left = left + 'px';
        }
    }

    // Prevent default scrolling behavior when arrow keys are pressed
    window.addEventListener('keydown', function(e) {
        if(['ArrowLeft', 'ArrowRight'].indexOf(e.key) > -1) {
            e.preventDefault();
        }
    });

    const wasteTypes = [
        { type: 'trash', image: 'chips.png', width: '61px', height: '79.5px' },
        { type: 'recycling', image: 'bottle.png', width: '36px', height: '92.5px' },
        { type: 'recycling', image: 'glass.png', width: '26x', height: '92.5px' },
        { type: 'compost', image: 'egg.png', width: '37px', height: '54.5px' },
        { type: 'compost', image: 'banana.png', width: '85.125px', height: '52.125px' }
    ];

    function createWaste() {
        const waste = wasteTypes[Math.floor(Math.random() * wasteTypes.length)];
        const wasteElement = document.createElement('img');
        wasteElement.src = waste.image;
        wasteElement.classList.add('waste');
        wasteElement.dataset.type = waste.type;
        wasteElement.style.left = `${Math.random() * 750}px`;
        wasteElement.style.top = '0px';
        wasteElement.style.width = waste.width;
        wasteElement.style.height = waste.height;
        game.appendChild(wasteElement);

        moveWaste(wasteElement);
        closeToBinElement(wasteElement);
    }

    function moveWaste(element) {
        const speed = 2; // pixels per interval
        function fall() {
            if (!element.parentNode) return; // Stop the interval if the element is removed
            element.style.top = `${element.offsetTop + speed}px`;

            if (element.offsetTop + element.offsetHeight >= game.offsetHeight) {
                game.removeChild(element);
                loseLife(); // Call loseLife() if waste reaches the bottom
            } else {
                requestAnimationFrame(fall);
            }
        }
        requestAnimationFrame(fall);
    }

    function increaseScore() {
        score++;
        scoreElement.textContent = score; // Update the score text content
    }

    function loseLife() {
        if (lives > 0) {
            lives--;
            hearts[lives].style.display = 'none';
            if (lives === 0) {
                endGame(); // Call endGame() if lives reach zero
            }
        }
    }

    function closeToBinElement(element) {
        const intervalId = setInterval(() => {
            const elementRect = element.getBoundingClientRect();
            for (const binId in bins) {
                const bin = bins[binId];
                const binRect = bin.getBoundingClientRect();

                if (
                    elementRect.left < binRect.right &&
                    elementRect.right > binRect.left &&
                    elementRect.top < binRect.bottom &&
                    elementRect.bottom > binRect.top
                ) {
                    // Check if the waste type matches the bin type
                    const wasteType = element.dataset.type;
                    const binType = binId.replace('-bin', '');
                    if (wasteType === binType) {
                        game.removeChild(element); // Remove the waste element if it matches the bin type
                        clearInterval(intervalId); // Stop checking once waste is disposed
                        increaseScore(); // Call increaseScore function to update the score
                        return; // Exit the function early since the waste has been disposed
                    }
                }
            }
        }, 100); // Adjust the interval as needed

        // Check if the waste reaches the bottom
        setTimeout(() => {
            if (element.parentNode) {
                game.removeChild(element); // Remove the waste element if it reaches the bottom
                clearInterval(intervalId); // Stop checking if waste is disposed
                loseLife(); // Call loseLife() if waste reaches the bottom
            }
        }, 5000); // Adjust the timeout as needed
    }

    function endGame() {
        clearInterval(gameInterval); // Stop creating new waste
        document.removeEventListener('keydown', handleKeydown); // Disable keyboard inputs
        alert("Game Over!, WASTED!!");
        location.reload(); // Reload the page to restart the game
    }

    function handleKeydown(event) {
        if (event.key === 'ArrowLeft') {
            moveBins(-moveSpeed);
        } else if (event.key === 'ArrowRight') {
            moveBins(moveSpeed);
        }
    }

    document.addEventListener('keydown', handleKeydown);

    gameInterval = setInterval(createWaste, 2000);
});