const start = document.querySelector('button');
    const theLeftSide = document.querySelector('#leftSide');
    const theRightSide = document.querySelector('#rightSide');
    const levels = document.querySelector('span');

    // window.addEventListener('load', setTimeout(generateFaces, 500));
    start.addEventListener('click', startGame);

    function startGame() {
      level = 1;
      levels.textContent = 1;
      event.stopPropagation();
      //this works...for some reason? I don't exactly get why, but I thought it might work since it seemed to do something in the nextLevel function...
      removeImages();
      const numberOfFaces = chooseDifficulty();
      generateFaces();
    }

    function chooseDifficulty() {
      numberOfFaces = (prompt('Choose your difficulty: easy, normal, hard')).toLowerCase();

      if (numberOfFaces === 'easy') {
        numberOfFaces = 2;
      } else if (numberOfFaces === 'normal') {
        numberOfFaces = 5;
      } else if (numberOfFaces === 'hard') {
        numberOfFaces = 8;
      } else {
        chooseDifficulty();
      }
      const audio = document.querySelector('audio');
      audio.play();

      return numberOfFaces;
    }

    function generateFaces() {

      for (let i = 0; i < numberOfFaces; i++) {
        const face = document.createElement('img');
        face.src = 'images/bmo.jpeg';
      
        let randomTop = Math.floor(Math.random() * 400) + 1;
        let randomLeft = Math.floor(Math.random() * 400) + 1;

        face.style.top = randomTop + 'px';
        face.style.left = randomLeft + 'px';

        theLeftSide.appendChild(face);
      }

      const leftSideImages = theLeftSide.cloneNode(true);

      leftSideImages.removeChild(leftSideImages.lastChild);
      theRightSide.appendChild(leftSideImages);

      theLeftSide.lastChild.addEventListener('click', nextLevel);
      document.body.addEventListener('click', gameOver);
    }

    function nextLevel() {
      event.stopPropagation();
      level++;
      document.querySelector('span').textContent = level;
      removeImages();
      numberOfFaces += numberOfFaces;
      generateFaces();
    }

    function gameOver(e) {
      if (e.target !== start) {
        alert('Game Over!');
      }
      theLeftSide.lastChild.removeEventListener('click', nextLevel);
      document.removeEventListener('click', gameOver);
    }

    function removeImages() {
      while (theLeftSide.firstChild) {
        theLeftSide.removeChild(theLeftSide.firstChild);
      }
      while (theRightSide.firstChild) {
        theRightSide.removeChild(theRightSide.firstChild);
      }
    }