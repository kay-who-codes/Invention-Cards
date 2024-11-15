// Global variable to store card data
let cardsData = {};

// Fetch card data from cards.json
fetch('cards.json')
   .then(response => response.json())
   .then(data => {
      cardsData = data; // Store the data in cardsData
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
   // Hide the menu and show the card display section
   document.getElementById('menu').classList.add('hidden');
   document.getElementById('card-display').classList.remove('hidden');

   // Update the card display with the selected cards
   document.getElementById('cards-output').innerHTML = cards.join('<br>');
}

// Function to return to the main menu
function returnToMenu() {
   // Show the menu and hide the card display section
   document.getElementById('card-display').classList.add('hidden');
   document.getElementById('menu').classList.remove('hidden');
}
