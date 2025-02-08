const images = [
    "https://www.pngplay.com/wp-content/uploads/1/Sliced-Strawberry-Transparent-PNG.png", 
    "https://www.pngplay.com/wp-content/uploads/1/Sliced-Strawberry-Transparent-PNG.png",
    "https://pngimg.com/d/orange_PNG791.png", 
    "https://pngimg.com/d/orange_PNG791.png",
    "https://img.pikbest.com/png-images/20240830/realistic-image-of-dragon-fruit_10777008.png!sw800", 
    "https://img.pikbest.com/png-images/20240830/realistic-image-of-dragon-fruit_10777008.png!sw800",
    "https://freepngimg.com/save/22187-mango/567x426", 
    "https://freepngimg.com/save/22187-mango/567x426",
    "https://www.transparentpng.com/thumb/kiwi/NB7CCH-kiwi-hd-photo-png.png", 
    "https://www.transparentpng.com/thumb/kiwi/NB7CCH-kiwi-hd-photo-png.png",
    "https://freepngimg.com/thumb/coconut/61903-and-cuisine-coconut-oil-greenery-jesus-thai-thumb.png", 
    "https://freepngimg.com/thumb/coconut/61903-and-cuisine-coconut-oil-greenery-jesus-thai-thumb.png",
    "https://static.vecteezy.com/system/resources/previews/012/629/188/non_2x/avocado-fruit-healthy-food-free-png.png", 
    "https://static.vecteezy.com/system/resources/previews/012/629/188/non_2x/avocado-fruit-healthy-food-free-png.png",
    "https://www.pngkey.com/png/full/46-460871_svg-royalty-free-download-figs-welcome-to-fruttygarden.png", 
    "https://www.pngkey.com/png/full/46-460871_svg-royalty-free-download-figs-welcome-to-fruttygarden.png"
];

let flippedCards = [];
let matchedPairs = 0;
const gameBoard = document.getElementById("gameBoard");

// Shuffle images function
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Create game board
function createBoard() {
    shuffle(images);
    gameBoard.innerHTML = '';
    images.forEach((image, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-image', image);

        const img = document.createElement('img');
        img.src = image;
        card.appendChild(img);

        card.addEventListener('click', () => flipCard(card));
        gameBoard.appendChild(card);
    });
}

// Flip a card
function flipCard(card) {
    if (card.classList.contains('flipped') || card.classList.contains('matched') || flippedCards.length === 2) {
        return;
    }

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 1000);
    }
}

// Check if two flipped cards match
function checkMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.getAttribute('data-image') === card2.getAttribute('data-image')) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        
        if (matchedPairs === images.length / 2) {
            alert('You win!');
            saveProgress();
        }
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }

    flippedCards = [];
}

// Save progress
function saveProgress() {
    localStorage.setItem('matchedPairs', matchedPairs);
}

// Load progress
function loadProgress() {
    const savedMatchedPairs = localStorage.getItem('matchedPairs');
    if (savedMatchedPairs) {
        matchedPairs = parseInt(savedMatchedPairs);
        if (matchedPairs === images.length / 2) {
            alert('You already won!');
        }
    }
}

// Reset game
function resetGame() {
    matchedPairs = 0;
    flippedCards = [];
    localStorage.removeItem('matchedPairs');
    createBoard();
}

// Initialize the game
loadProgress();
createBoard();
