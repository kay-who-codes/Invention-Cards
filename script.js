// Global variable to store card data
let cardsData = {};

// Fetch card data from cards.json
fetch('cards.json')
   .then(response => response.json())
   .then(data => cardsData = data)
   .catch(error => console.error('Error loading card data:', error));

// Function to draw a single buyer card
function drawBuyerCard() {
   if (!cardsData.buyerCards || cardsData.buyerCards.length === 0) {
       alert("No more buyer cards available!");
       return;
   }

   // Draw a random buyer card and remove it from the array
   const randomIndex = Math.floor(Math.random() * cardsData.buyerCards.length);
   const buyerCard = cardsData.buyerCards.splice(randomIndex, 1)[0]; // Splice removes the card
   displayCards([buyerCard]);
}

// Function to draw seven unique product cards
function drawProductCards() {
   if (!cardsData.productCards || cardsData.productCards.length < 7) {
       alert("Not enough product cards available!");
       return;
   }

   const productCards = [];
   for (let i = 0; i < 7; i++) {
       // Draw a random product card and remove it from the array
       const randomIndex = Math.floor(Math.random() * cardsData.productCards.length);
       productCards.push(cardsData.productCards.splice(randomIndex, 1)[0]); // Splice removes the card
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
