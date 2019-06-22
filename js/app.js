/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
*/
const cardIcons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];

const cardCntr = document.querySelector(".deck");

// Modal - to display win popup
const modal = document.querySelector('.modal');
const timeModal = document.querySelector('.time-modal');
const rateModal = document.querySelector('.rate-modal');
const movesModal = document.querySelector('.moves-modal');
const rstModal = document.querySelector('.rst-modal');


//Array for opened cards
let openCards = [];
//Array for matched cards
let matchedCards = [];

let ratingHTML = "";


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


/*Initalising Game*/

function init() {
  shuficon = shuffle(cardIcons);
  for(let i=0; i < shuficon.length; i++) {
    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = `<i class="${shuficon[i]}"></i>`;
    cardCntr.appendChild(card);
    //Click Event to each Card
    click(card);
  }
}

let chkFirstClick = true;

function click(card) {
  card.addEventListener("click", function() {
    /*The initial click will execute the timer, then set the chkFirstClick to false
    */
    if(chkFirstClick) {
      timerStart();
      chkFirstClick = false;
    }

    const clickedCard = this;
    const firstCard = openCards[0];

    /*There is already an opened card*/
    if(openCards.length === 1) {
      card.classList.add("open","show", "disable");
      openCards.push(card);
      /*So we compare the two cards, the opened one and the current open we opened*/
      compare(clickedCard, firstCard);

    } else {
      /*No Open Cards*/
      clickedCard.classList.add("open","show","disable");
      openCards.push(clickedCard);
    }
  });
}

/*Compare function*/
function compare(clickedCard, firstCard) {

  if(clickedCard.innerHTML === firstCard.innerHTML) {

    /*This will match the cards*/
    clickedCard.classList.add("match");
    firstCard.classList.add("match");

    matchedCards.push(clickedCard, firstCard);

    openCards = [];

    /**Validate if all cards have been matched i.e. check if the game is finished
    by checking the count of cards that are open*/

    allMatched();

  } else {
    //wait 250ms then check
    setTimeout(function() {
      clickedCard.classList.remove("open","show","disable");
      firstCard.classList.remove("open","show","disable");

    }, 250);

    openCards = [];
  }
  /*Allow new moves*/
  incrementMoves();

}


/**allow moves to be added**/
const movesCntr = document.querySelector(".moves");
let moves = 0;
movesCntr.innerHTML = 0;

function incrementMoves() {
  moves++;
  movesCntr.innerHTML = moves;
  //Star ratings
  starsCntrRating();
}

/***Rating for the game ***/
const star = "<i class='fa fa-star'></i>";
const star2 = "<i class='fa fa-star'></i><i class='fa fa-star'></i>"
const star3 = "<i class='fa fa-star'></i><i class='fa fa-star'></i><i class='fa fa-star'></i>";
const starsCntr = document.querySelector(".stars");

function starsCntrRating() {
    // if the moves number is between 12 and 15
    if (moves < 13) {
      //if below 13 moves then get 3 stars
      ratingHTML = star3;
    } else if (moves < 23) {
      //set modal counter to 2 stars
      ratingHTML = star2;
      //Set counter not in modal to 2 stars
      starsCntr.innerHTML = star2;
    } else  {
      ratingHTML = star;
      starsCntr.innerHTML = star;
    }
}

/*Checks if game is over*/
function allMatched() {
  if(matchedCards.length === cardIcons.length) {
    //Stop timer
    timerStop();
    timeModal.innerText = timerCntr.innerText;
    //Incerement final moves by 1 as it display -1 in Modal
    movesCntr.innerHTML = moves + 1;
    movesModal.innerHTML = movesCntr.innerText;
    rateModal.innerHTML = ratingHTML;
    modal.style.display = "block";
  }
}


/*Allows restart in Modal to reset the game*/
rstModal.addEventListener("click",  function() {
  modal.style.display = "none";
  cardCntr.innerHTML = "";
  init();
  reset();
});

//Timer vairables
const timerCntr = document.querySelector(".timer");
let currentTimer, totalSeconds = 0;

timerCntr.innerHTML = totalSeconds + 's';

function timerStart() {
  currentTimer = setInterval(function() {
    totalSeconds++;

    timerCntr.innerHTML = totalSeconds + 's';
  }, 1000);

}

function timerStop() {
  clearInterval(currentTimer);
}

const rstrBtn =document.querySelector(".restart");
rstrBtn.addEventListener("click", function() {
  cardCntr.innerHTML = "";

  init();
  reset();
});

function reset() {

  //Clear open cards
  openCards = []

  //Empty the deck
  matchedCards = [];

  //Reset Moves
  moves = 0;
  let ratingHTML = "";

  movesCntr.innerHTML = moves;

  //Reset star rating to 3
  starsCntr.innerHTML = star3;

  //Reset Timer
  /*Stop the timer, then reset the variable chkFirstClick to true*/
  timerStop();
  chkFirstClick = true;
  totalSeconds = 0;
  timerCntr.innerHTML = totalSeconds + "s";
}

/*Start game for the first time*/
init();
