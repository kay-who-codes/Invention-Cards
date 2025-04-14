// Game state
const gameState = {
    score: 0,
    cards: {
        buyerCards: [],
        entrepreneurCards: []
    }
};

// Helper function to convert to Title Case
function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

// DOM elements
const loadingScreen = document.getElementById('loading-screen');
const roleSelectionScreen = document.getElementById('role-selection-screen');
const buyerScreen = document.getElementById('buyer-screen');
const entrepreneurScreen = document.getElementById('entrepreneur-screen');
const entrepreneurFinalScreen = document.getElementById('entrepreneur-final-screen');

// Initialise the game after loading cards
loadCards().then(() => {
    loadingScreen.classList.add('hidden');
    roleSelectionScreen.classList.remove('hidden');

    // Set up event listeners
    document.getElementById('buyer-card').addEventListener('click', () => selectRole('buyer'));
    document.getElementById('entrepreneur-card').addEventListener('click', () => selectRole('entrepreneur'));
    document.getElementById('back-to-role').addEventListener('click', backToRole);
    document.getElementById('back-to-entrepreneur').addEventListener('click', backToEntrepreneur);
    document.getElementById('back-to-role-from-final').addEventListener('click', backToRole);
    document.getElementById('back-to-role-from-entrepreneur').addEventListener('click', backToRole);
    document.getElementById('earn-point').addEventListener('click', earnPoint);

}).catch(error => {
    loadingScreen.querySelector('.loading').textContent = "Error loading cards. Please ensure cards.json exists and is properly formatted.";
    console.error('Error loading cards:', error);
});

// Load cards exclusively from JSON
async function loadCards() {
    const response = await fetch('Assets/cards.json');
    if (!response.ok) {
        throw new Error('Failed to load cards.json');
    }
    gameState.cards = await response.json();
    
    // Validate we have at least some cards
    if (!gameState.cards.buyerCards || !gameState.cards.entrepreneurCards || 
        gameState.cards.buyerCards.length === 0 || gameState.cards.entrepreneurCards.length < 3) {
        throw new Error('cards.json must contain at least 1 buyer card and 3 entrepreneur cards');
    }
}

function selectRole(role) {
    if (role === 'buyer') {
        // Show buyer screen with random prompt
        const randomPrompt = gameState.cards.buyerCards[
            Math.floor(Math.random() * gameState.cards.buyerCards.length)
        ];
        document.getElementById('buyer-prompt').textContent = toTitleCase(randomPrompt);
        
        roleSelectionScreen.classList.add('hidden');
        buyerScreen.classList.remove('hidden');
    } else {
        // Entrepreneur - show card selection
        showEntrepreneurCards();
        roleSelectionScreen.classList.add('hidden');
        entrepreneurScreen.classList.remove('hidden');
    }
}

function showEntrepreneurCards() {
    const cardsContainer = document.getElementById('entrepreneur-cards');
    cardsContainer.innerHTML = '';
    
    // Shuffle and pick 7 cards (or all if less than 7)
    const shuffledCards = [...gameState.cards.entrepreneurCards].sort(() => 0.5 - Math.random());
    const selectedCards = shuffledCards.slice(0, Math.min(7, gameState.cards.entrepreneurCards.length));
    
    selectedCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        
        // Convert card text to Title Case
        const titleCaseCard = toTitleCase(card);
        
        cardElement.innerHTML = `<h3>Item ${index + 1}</h3><h2>${titleCaseCard}</h2>`;
        cardElement.dataset.cardText = titleCaseCard;
        
        cardElement.addEventListener('click', () => {
            cardElement.classList.toggle('selected');
            updateFinaliseButton();
        });
        
        cardsContainer.appendChild(cardElement);
    });
}

function updateFinaliseButton() {
    const selectedCards = document.querySelectorAll('#entrepreneur-cards .card.selected');
    const finaliseButton = document.getElementById('finalise-choices');
    
    finaliseButton.disabled = selectedCards.length !== 3;
    finaliseButton.textContent = `Finalise Choices (${selectedCards.length}/3)`;
    
    if (selectedCards.length === 3) {
        finaliseButton.addEventListener('click', showFinalSelection, { once: true });
    } else {
        finaliseButton.removeEventListener('click', showFinalSelection);
    }
}

function showFinalSelection() {
    const selectedCards = document.querySelectorAll('#entrepreneur-cards .card.selected');
    const finalSelectionContainer = document.getElementById('final-selection');
    finalSelectionContainer.innerHTML = '';
    
    selectedCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.innerHTML = `<h3>Selected Item</h3><h2>${card.dataset.cardText}</h2>`;
        finalSelectionContainer.appendChild(cardElement);
        updateScoreDisplay();
    });
    
    entrepreneurScreen.classList.add('hidden');
    entrepreneurFinalScreen.classList.remove('hidden');
}

function backToRole() {
    buyerScreen.classList.add('hidden');
    entrepreneurScreen.classList.add('hidden');
    entrepreneurFinalScreen.classList.add('hidden');
    roleSelectionScreen.classList.remove('hidden');
}

function backToEntrepreneur() {
    entrepreneurFinalScreen.classList.add('hidden');
    entrepreneurScreen.classList.remove('hidden');
    // Clear previous selections
    document.querySelectorAll('#entrepreneur-cards .card').forEach(card => {
        card.classList.remove('selected');
    });
    updateFinaliseButton();
}

function earnPoint() {
    playClick_Sound();
    gameState.score++;
    updateScoreDisplay();
}

function updateScoreDisplay() {
    const scoreDisplay = document.getElementById('score-display');
    scoreDisplay.textContent = `Score: ${gameState.score}`;
    scoreDisplay.classList.toggle('hidden', gameState.score === 0);
}

// Play Sound When Clicking Button
const Click_Sound = new Audio('Assets/click.mp3'); // Create an Audio object

// Function to play the sound
function playClick_Sound() {
  Click_Sound.play();
}

// Add event listeners to buttons
document.getElementById('finalise-choices').addEventListener('click', playClick_Sound);
document.getElementById('back-to-entrepreneur').addEventListener('click', playClick_Sound);
document.getElementById('back-to-role-from-final').addEventListener('click', playClick_Sound);
document.getElementById('back-to-role').addEventListener('click', playClick_Sound);
document.getElementById('back-to-role-from-entrepreneur').addEventListener('click', playClick_Sound);

const Card_Sound = new Audio('Assets/flip.mp3'); // Create an Audio object

// Function to play the sound
function playCard_Sound() {
  Card_Sound.play();
}

document.getElementById('buyer-card').addEventListener('click', playCard_Sound);
document.getElementById('entrepreneur-card').addEventListener('click', playCard_Sound);