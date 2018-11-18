var userScore = 0;
var computerScore = 0;
var userScore_span = document.getElementById("user-score");
var computerScore_span = document.getElementById("computer-score");
var scoreBoard_div = document.querySelector(".score-board");
var result_p = document.querySelector(".result > p");
var rock_div = document.getElementById("Rock");
var paper_div = document.getElementById("Paper");
var scissors_div = document.getElementById("Scissors");
var newGame_div = document.querySelector(".newGame");
var choices_div = document.querySelector(".choices");
var message_p = document.getElementById("message");
var trophy_p = document.getElementById("numberOfWins");
var roundsCounter_p = document.getElementById("numberOfRounds");
var numberOfGames;
var numberOfRounds = 0;

function main(){
    rock_div.addEventListener('click', function(){
      game("Rock");
    })

    paper_div.addEventListener('click', function(){
      game("Paper");
    })

    scissors_div.addEventListener('click', function(){
      game("Scissors");
    })
}

function game(userChoice) {
	var computerChoice = getComputerChoice();
	if (userChoice === "Rock"){
		if (computerChoice === "Rock") {
			draw(userChoice, computerChoice);
		}
		else if (computerChoice === "Paper"){
			lose(userChoice, computerChoice);
		}
		else {
			win(userChoice, computerChoice);
		}
	}
	else if (userChoice === "Paper"){
		if (computerChoice === "Paper") {
			draw(userChoice, computerChoice);
		}
		else if (computerChoice === "Rock"){
			win(userChoice, computerChoice);
		}
		else {
			lose(userChoice, computerChoice);
		}
	}
	else{
		if (computerChoice === "Scissors") {
			draw(userChoice, computerChoice);
		}
		else if (computerChoice === "Rock"){
			lose(userChoice, computerChoice);
		}
		else {
			win(userChoice, computerChoice);
		}
	}
}

function getComputerChoice() {
	var choices = ['Rock', 'Paper', 'Scissors'];
	randomNumber = Math.floor(Math.random() * 3)
	return choices[randomNumber];
}

function draw(userChoice, computerChoice) {
 	numberOfRounds++;
  	roundsCounter_p.innerHTML = "Number of rounds: " + numberOfRounds;
	computerScore_span.innerHTML = computerScore;
	userScore_span.innerHTML = userScore;
	var smallerUserWord = "user ".fontsize(4);
	var smallerCompWord = " comp".fontsize(4);
	result_p.innerHTML = smallerUserWord + userChoice + " vs " + computerChoice + smallerCompWord + "<br>It is a draw!";
	document.getElementById(userChoice).classList.add('gray-glow');
	setTimeout(function() {document.getElementById(userChoice).classList.remove('gray-glow')}, 400);
}

function win(userChoice, computerChoice) {
  	numberOfRounds++;
  	roundsCounter_p.innerHTML = "Number of rounds: " + numberOfRounds;
  	userScore++;
	userScore_span.innerHTML = userScore;
	computerScore_span.innerHTML = computerScore;
	var smallerUserWord = "user ".fontsize(4);
	var smallerCompWord = " comp".fontsize(4);
	result_p.innerHTML = smallerUserWord + userChoice + " vs " + computerChoice + smallerCompWord + "<br>You won!";
	document.getElementById(userChoice).classList.add('green-glow');
	setTimeout(function() {document.getElementById(userChoice).classList.remove('green-glow')}, 400);
  endGame(numberOfGames, userScore, computerScore);
}

function lose(userChoice, computerChoice) {
  	numberOfRounds++;
  	roundsCounter_p.innerHTML = "Number of rounds: " + numberOfRounds;
 	computerScore++;
	computerScore_span.innerHTML = computerScore;
	userScore_span.innerHTML = userScore;
	var smallerUserWord = "user ".fontsize(4);
	var smallerCompWord = " comp".fontsize(4);
	result_p.innerHTML = smallerUserWord + userChoice + " vs " + computerChoice + smallerCompWord + "<br>You lost!";
	document.getElementById(userChoice).classList.add('red-glow');
	setTimeout(function() {document.getElementById(userChoice).classList.remove('red-glow')}, 400);
  endGame(numberOfGames, userScore, computerScore);
}

function thereIsAnError(){
  	message_p.innerHTML = "Please press NEW GAME and choose the number!";
	setTimeout(function() {message_p.innerHTML = ""}, 3000);
}

function howManyWins(){
	var userAnswer = prompt("TILL HOW MANY WINS?");
		if (userAnswer === null || userAnswer === "" || isNaN(userAnswer)){
      thereIsAnError();
		}
		else {
      		choices_div.classList.remove('choices-disabled');
      		newGame_div.classList.add('newGame-disabled');
      		resetScore();
			games(userAnswer);
		}
}

function games(userAnswer){
	trophy_p.innerHTML = "Up to: " + userAnswer;
    numberOfGames = userAnswer;
}

function resetScore(){
	userScore = 0;
	computerScore = 0;
  	numberOfRounds = 0;
 	userScore_span.innerHTML = userScore;
 	computerScore_span.innerHTML = computerScore;
 	roundsCounter_p.innerHTML = ""
}

function thereIsAnError(){
  	var noAnswer
  	noAnswer = "Please press NEW GAME and choose the number!";
  	message_p.innerHTML = noAnswer;
	setTimeout(function() {message_p.innerHTML = ""}, 2000);
}

function newGame(){
	newGame_div.addEventListener('click', function(){
		howManyWins();
	})
  main();
}

function endGame(numberOfGames, userScore, computerScore){
  if (numberOfGames == userScore){
    choices_div.classList.add('choices-disabled');
    newGame_div.classList.remove('newGame-disabled');
    result_p.innerHTML = "You WON the ENTIRE game!";
  }
  else if(numberOfGames == computerScore){
    choices_div.classList.add('choices-disabled');
    newGame_div.classList.remove('newGame-disabled');
    result_p.innerHTML = "You LOSE the ENTIRE game!";
  }
}

newGame();
choices_div.classList.add('choices-disabled');


//MODAL


	var modal = document.getElementById("modal-one");
	
	var showModal = function(event){
		event.preventDefault();
		document.querySelector('#modal-overlay').classList.add('show');
		modal.classList.add('show'); //2
	};

	var hideModal = function(event){
		event.preventDefault();
		document.querySelector('#modal-overlay').classList.remove('show');
		this.parentElement.classList.remove('show'); //3
	};
	
	var closeButtons = document.querySelectorAll('.close');
	
	for(var i = 0; i < closeButtons.length; i++){
		closeButtons[i].addEventListener('click', hideModal);
	}

	document.querySelector('#modal-overlay').addEventListener('click', hideModal);

	var modals = document.querySelectorAll('.modal');
	
	for(var i = 0; i < modals.length; i++){
		modals[i].addEventListener('click', function(event){
			event.stopPropagation();
		});
	}