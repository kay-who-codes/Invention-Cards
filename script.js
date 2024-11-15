// Global variable to store card data
let cardsData = {};

// Fetch card data from cards.json
fetch('cards.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    cardsData = data;
    console.log("Cards data loaded:", cardsData); // Check that cards data is being loaded
  })
  .catch(error => console.error('Error loading card data:', error));

// To keep track of used buyer and product cards
let usedBuyerCards = [];
let usedProductCards = [];

// Function to draw a single buyer card
function drawBuyerCard() {
  if (!cardsData.buyerCards || cardsData.buyerCards.length === 0) {
    alert("No more buyer cards available!");
    return;
  }

  // Filter out already used cards
  const availableBuyerCards = cardsData.buyerCards.filter(card => !usedBuyerCards.includes(card));

  if (availableBuyerCards.length === 0) {
    alert("No more unique buyer cards left!");
    return;
  }

  // Draw a random buyer card from the remaining available ones
  const randomIndex = Math.floor(Math.random() * availableBuyerCards.length);
  const buyerCard = availableBuyerCards[randomIndex];

  // Mark the card as used by adding it to the used list
  usedBuyerCards.push(buyerCard);

  displayCards([buyerCard]);
}

// Function to draw seven unique product cards
function drawProductCards() {
  if (!cardsData.productCards || cardsData.productCards.length < 7) {
    alert("Not enough product cards available!");
    return;
  }

  // Filter out already used cards
  const availableProductCards = cardsData.productCards.filter(card => !usedProductCards.includes(card));

  if (availableProductCards.length < 7) {
    alert("Not enough unique product cards left!");
    return;
  }

  const productCards = [];
  for (let i = 0; i < 7; i++) {
    const randomIndex = Math.floor(Math.random() * availableProductCards.length);
    const productCard = availableProductCards[randomIndex];

    // Mark the card as used by adding it to the used list
    usedProductCards.push(productCard);

    productCards.push(productCard);
  }
  displayCards(productCards);
}

// Function to display cards on the screen
function displayCards(cards) {
  console.log("Cards being displayed:", cards);  // Confirm the cards are being passed correctly

  // Ensure there are cards to display
  if (cards.length > 0) {
    // Hide the menu and show the card display
    document.getElementById('menu').classList.add('hidden');
    document.getElementById('card-display').classList.remove('hidden');

    // Clear any previous content in the card display
    document.getElementById('cards-output').innerHTML = '';

    // Display each card in the cards array
    cards.forEach(card => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('card'); // Add styling if needed
      cardElement.textContent = card;  // Add the card name as text
      document.getElementById('cards-output').appendChild(cardElement);
    });
  } else {
    console.log("No cards to display");
  }
}

// Function to return to the main menu
function returnToMenu() {
  // Show the menu and hide the card display section
  document.getElementById('card-display').classList.add('hidden');
  document.getElementById('menu').classList.remove('hidden');
}
