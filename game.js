document.addEventListener("DOMContentLoaded", () => {
  const game = document.getElementById("game");
  const bins = {
    "trash-bin": document.getElementById("trash-bin"),
    "recycling-bin": document.getElementById("recycling-bin"),
    "compost-bin": document.getElementById("compost-bin"),
  };

  let score = 0;
  const scoreElement = document.getElementById("score-value");
  const hearts = document.querySelectorAll(".heart");
  let lives = hearts.length;
  let gameInterval;

  const binWidth = bins["trash-bin"].offsetWidth;
  const gameWidth = game.offsetWidth;
  const moveSpeed = 10;

    // setup tutorial overlay
    var overlay = document.getElementById("myOverlay");
    
    // Creating the button
    const buttonContainer = document.getElementById("button-container");
    const button = document.createElement("button");
    button.textContent = "Tutorial"; // Set the button text
    // button.classList.add("styled-button"); // Add the class for styling
    buttonContainer.appendChild(button); // Append button to container

    button.addEventListener("click", function() {
        
        overlay.style.display = "block"; 
        
        let exitButton = document.getElementById("exit-button");
        if (!exitButton) {
            const exitButton = document.createElement("button");
            exitButton.textContent = "x";
            exitButton.id = "exit-button"; // Set an id for easier retrieval
            overlay.appendChild(exitButton); 

            exitButton.style.position = "absolute";
            exitButton.style.top = "40px"; // Adjust this value as needed
            exitButton.style.right = "40px"; // Adjust this value as needed
            exitButton.style.scale = 2;

            exitButton.addEventListener("click", function(){
                overlay.style.display = "none";
            });
        }

    });

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
      bin.style.left = left + "px";
    }
  }

  // Prevent default scrolling behavior when arrow keys are pressed
  window.addEventListener("keydown", function (e) {
    if (["ArrowLeft", "ArrowRight"].indexOf(e.key) > -1) {
      e.preventDefault();
    }
  });

  const wasteTypes = [
    { type: "trash", image: "chips.png", width: "61px", height: "79.5px" },
    { type: "recycling", image: "bottle.png", width: "36px", height: "92.5px" },
    { type: "recycling", image: "glass.png", width: "26x", height: "92.5px" },
    { type: "compost", image: "egg.png", width: "37px", height: "54.5px" },
    {
      type: "compost",
      image: "banana.png",
      width: "85.125px",
      height: "52.125px",
    },
    { type: "heart", image: "heart.png", width: "50px", height: "50px" },
  ];

  function createWaste() {
    let waste;

    //making heart generation rare
    if (Math.random() < 0.1) {
      //5% chance
      waste = wasteTypes.find((w) => w.type === "heart");
    } else {
      waste = wasteTypes[Math.floor(Math.random() * (wasteTypes.length - 1))]; // Avoid selecting the heart type
    }

    const wasteElement = document.createElement("img");
    wasteElement.src = waste.image;
    wasteElement.classList.add("waste");
    wasteElement.dataset.type = waste.type;
    wasteElement.style.left = `${Math.random() * 750}px`;
    wasteElement.style.top = "0px";
    wasteElement.style.width = waste.width;
    wasteElement.style.height = waste.height;
    game.appendChild(wasteElement);

    if (waste.type === "heart") {
      wasteElement.addEventListener("click", () => {
        if (lives < hearts.length) {
          hearts[lives].style.display = "inline";
          lives++;
        }
        game.removeChild(wasteElement);
      });
    }

    moveWaste(wasteElement);
    closeToBinElement(wasteElement);
  }

  function moveWaste(element) {
    function fall() {
      const baseSpeed = 2; // Base speed in pixels per interval
      const speedMultiplier = Math.floor(score / 10) + 1; // Multiplier increases every 10 points
      const speed = baseSpeed * speedMultiplier; // Calculate current speed

      if (!element.parentNode) return; // Stop the interval if the element is removed
      element.style.top = `${element.offsetTop + speed}px`;

      if (element.offsetTop + element.offsetHeight >= game.offsetHeight) {
        game.removeChild(element);
        if (element.dataset.type !== "heart") {
          loseLife();
        }
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
        
        // Get the game element and flash it red
        const gameElement = document.getElementById('game');
        flashRed(gameElement);
        
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
          const binType = binId.replace("-bin", "");
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
        if (element.dataset.type !== "heart") {
          loseLife(); // Call loseLife() if non-heart waste reaches the bottom
        }
      }
    }, 5000); // Adjust the timeout as needed
  }

  function flashRed(element) {
    const originalColor = "rgb(142, 175, 204)"; // Original background color
    element.style.transition = "background-color 0.5s"; // Add transition for smooth effect
    element.style.backgroundColor = "red"; // Change to red

    // Change back to original color after a short delay (e.g., 500ms)
    setTimeout(() => {
      element.style.backgroundColor = originalColor;
    }, 500);
  }

  function endGame() {
    clearInterval(gameInterval); // Stop creating new waste
    document.removeEventListener("keydown", handleKeydown); // Disable keyboard inputs
    alert("Game Over!, WASTED!!");
    location.reload(); // Reload the page to restart the game
  }

  function handleKeydown(event) {
    if (event.key === "ArrowLeft") {
      moveBins(-moveSpeed);
    } else if (event.key === "ArrowRight") {
      moveBins(moveSpeed);
    }
  }

  document.addEventListener("keydown", handleKeydown);

  gameInterval = setInterval(createWaste, 2000);
});
