
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
let myCard = document.getElementsByClassName("card");
let myCards = [...myCard];

//Get elements from html

//Array for opened cards
let openCards = [];

//Array for matched cards
let matchedCards = [];

const cards = ["fa-diamond", "fa-diamond",
  "fa-paper-plane-o", "fa-paper-plane-o",
   "fa-anchor", "fa-anchor",
   "fa-bolt", "fa-bolt",
   "fa-cube", "fa-cube",
   "fa-leaf", "fa-leaf",
   "fa-bicycle", "fa-bicycle",
   "fa-bomb", "fa-bomb"];

/***Setting Global variables***/

const cBoard = document.querySelector('#cards-board');

let moves = 0;
const movesCntr = document.querySelector(".moves");

const stars = document.querySelector('.starts').childNodes;
const rateStars = document.querySelector('.stars');

let seconds = 0, minutes = 0, hours = 0;

const timer = document.querySelector(".timer");

const hourTimer = document.querySelector(".hour");
const minuteTimer = document.querySelector(".minute");
const secondsTimer = document.querySelector(".seconds");

let timerCounter;
let onTimer = false;

/*Restart*/
const restart = document.querySelector(".restart");

/*Modal*/
const modal = document.querySelector(".modal");
const timeModal = document.querySelector(".time-modal");
const rartingModal = document.querySelector(".rating-modal");
const movesModal = document.querySelector(".btn-modal");


/*Cards Array*/

let checkCards = [];
let matchedCards = [];

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


createCardsBoards();

function createCardsBoards() {

  //Empty card board
  cardsBoard.innerHTML = "";
  //Create new ul element to append it to "CardsBaords"
  const newDeck = document.createElement('ul');
  newDeck.classList.add('deck');
  //Shuffle cards list
  let shuffCards = shuffle(cards);
  for (let i = 0; i < shuffCards.length; i++) {
    const newLi = document.createElement('li');
    newLi.classList.add('card');
    newLi.innerHTML = `<i class="${shuffCards[i]}"></i>`;
    newDeck.appendChild(newLi);
  }
  cardsBoard.append(newDeck);

  //event listener to cards board
  cardsBoard.addEventListener('click', respondToTheClick);
}


myCards.forEach(function(card){
  card.addEventListener('click',function(e){
    card.classList.add('open','show');
    openCards.push(card);

    if (openCards.length == 2) {
      setTimeout(function() {
        openCards.forEach(function(card) {
          card.classList.remove('open','show');
        });
        openCards=[];
      }, 200);

    }
  });
});


function respondToTheClick(e) {
  let selectedCard = e.target;
  if (selectedCard.classList.contains("card") &&
      !selectedCard.classList.contains("open", "show", "match")) {
        if (onTimer == false) {
            timerStart();
            onTimer = true;
        }

        selectedCard.classList.add("open","show");
        checkCards.push(selectedCard);
      }

      if (checkCards.length === 2) {
        cardsBoard.classList.add("stop-event");

        movesNum();
      }
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
