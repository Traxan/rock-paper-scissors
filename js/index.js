var userScore_span = document.getElementById("user-score");
var computerScore_span = document.getElementById("computer-score");
var scoreBoard_div = document.querySelector(".score-board");
var result_p = document.querySelector(".result > p");
var moveButtons = document.querySelectorAll("[data-move]");
var newGame_div = document.querySelector(".newGame");
var choices_div = document.querySelector(".choices");
var message_p = document.getElementById("message");
var trophy_p = document.getElementById("numberOfWins");
var roundsCounter_p = document.getElementById("numberOfRounds");
var modal_h = document.getElementById("endMessage");
var userName_div = document.getElementById("user-label");
var userName;
var numberOfGames;
var params = {
	userScore: 0,
	computerScore: 0,
	numberOfRounds: 0,
	progress: []
}

function main(){
  moveButtons.forEach(function(button) {
    var userChoice = button.dataset.move;

    button.addEventListener('click', function(){
      game(userChoice);
    });
  });
}

function game(userChoice) {
	params.numberOfRounds++;
	var computerChoice = getComputerChoice()
	switch(userChoice + computerChoice) {
		case "RockRock":
		case "PaperPaper":
		case "ScissorsScissors":
			draw(userChoice, computerChoice);
			break;
		case "RockScissors":
		case "PaperRock":
		case "ScissorsPaper":
			win(userChoice, computerChoice);
			break;
		case "RockPaper":
		case "PaperScissors":
		case "ScissorsRock":
			lose(userChoice, computerChoice);
			break;
	}
}

function getComputerChoice() {
	var choices = ['Rock', 'Paper', 'Scissors'];
	randomNumber = Math.floor(Math.random() * 3)
	return choices[randomNumber];
}

function draw(userChoice, computerChoice) {
  	roundsCounter_p.innerHTML = "Number of rounds: " + params.numberOfRounds;
	computerScore_span.innerHTML = params.computerScore;
	userScore_span.innerHTML = params.userScore;
	var smallerUserWord = (userName + " ").fontsize(4);
	var smallerCompWord = " comp".fontsize(4);
	result_p.innerHTML = smallerUserWord + userChoice + " vs " + computerChoice + smallerCompWord + "<br>It is a draw!";
	var result = "draw";
	document.getElementById(userChoice).classList.add('gray-glow');
	setTimeout(function() {document.getElementById(userChoice).classList.remove('gray-glow')}, 400);
	var objectResults = {
		number: params.numberOfRounds,
		playerMove: userChoice,
		computerMove: computerChoice,
		result: result,
		gameResult: params.userScore+":"+params.computerScore,
	}
	params.progress[params.numberOfRounds] = objectResults;
}

function win(userChoice, computerChoice) {
	params.userScore++;
  	roundsCounter_p.innerHTML = "Number of rounds: " + params.numberOfRounds;
	userScore_span.innerHTML = params.userScore;
	computerScore_span.innerHTML = params.computerScore;
	var smallerUserWord = (userName + " ").fontsize(4);
	var smallerCompWord = " comp".fontsize(4);
	result_p.innerHTML = smallerUserWord + userChoice + " vs " + computerChoice + smallerCompWord + "<br>You won!";
	var result = "win";
	document.getElementById(userChoice).classList.add('green-glow');
	setTimeout(function() {document.getElementById(userChoice).classList.remove('green-glow')}, 400);
	var objectResults = {
		number: params.numberOfRounds,
		playerMove: userChoice,
		computerMove: computerChoice,
		result: result,
		gameResult: params.userScore+":"+params.computerScore,
	}
	params.progress[params.numberOfRounds] = objectResults;
  endGame();
}

function lose(userChoice, computerChoice) {
	params.computerScore++;
  	roundsCounter_p.innerHTML = "Number of rounds: " + params.numberOfRounds;
	computerScore_span.innerHTML = params.computerScore;
	userScore_span.innerHTML = params.userScore;
	var smallerUserWord = (userName + " ").fontsize(4);
	var smallerCompWord = " comp".fontsize(4);
	result_p.innerHTML = smallerUserWord + userChoice + " vs " + computerChoice + smallerCompWord + "<br>You lost!";
	var result = "lost";
	document.getElementById(userChoice).classList.add('red-glow');
	setTimeout(function() {document.getElementById(userChoice).classList.remove('red-glow')}, 400);
	var objectResults = {
		number: params.numberOfRounds,
		playerMove: userChoice,
		computerMove: computerChoice,
		result: result,
		gameResult: params.userScore+":"+params.computerScore,
	}
	params.progress[params.numberOfRounds] = objectResults;
  endGame();
}

function newGame(){
	newGame_div.addEventListener('click', function(){
		cleanTable();
		howManyWins();
	})
  	main();
}

function howManyWins(){
	var userAnswer = prompt("TILL HOW MANY WINS?");
		if (userAnswer === null || userAnswer === "" || isNaN(userAnswer)){
      		thereIsAnError();
		}
		else {
			giveMeYourName();
      		resetScore();
			games(userAnswer);
		}
}

function thereIsAnError(){
  	message_p.innerHTML = "Please press NEW GAME and choose the number!";
	setTimeout(function() {message_p.innerHTML = ""}, 3000);
}


function giveMeYourName(){
	var name = prompt("WHAT IS YOUR NAME?");
	if (name === null || name === "" || isNaN(name) === false) {
		thereIsAnError();
		document.querySelector('#trophy').classList.add('trophydisabled');
	}
	else if (name.length > 9){
		message_p.innerHTML = "Your name is too long. 9 letters summary!";
	}
	else {
		document.querySelector('#trophy').classList.remove('trophydisabled');
		choices_div.classList.remove('choices-disabled');
      	newGame_div.classList.add('newGame-disabled');
		userName_div.innerHTML = name;
		userName = name;
	}
}

function resetScore(){
	params.userScore = 0;
	params.computerScore = 0;
  	params.numberOfRounds = 0;
 	userScore_span.innerHTML = params.userScore;
 	computerScore_span.innerHTML = params.computerScore;
 	roundsCounter_p.innerHTML = "";
}

function games(userAnswer){
	trophy_p.innerHTML = "Up to: " + userAnswer;
    numberOfGames = userAnswer;
}


function endGame(){
  if (numberOfGames == params.userScore){
    choices_div.classList.add('choices-disabled');
    newGame_div.classList.remove('newGame-disabled');
    result_p.innerHTML = "";
    userName_h = userName;
    modal_h.innerHTML = userName + "<br>You won the ENTIRE game!";
    makeTableFromProgress();
    showModal();
    params.progress = [];
  }
  else if(numberOfGames == params.computerScore){
    choices_div.classList.add('choices-disabled');
    newGame_div.classList.remove('newGame-disabled');
    showModal();
    result_p.innerHTML = "";
    userName_h = userName;
	modal_h.innerHTML = userName + "<br>You lose the ENTIRE game!";
	makeTableFromProgress();
    showModal();
    params.progress = [];
  }
}

newGame();
choices_div.classList.add('choices-disabled');


//MODAL


	var modal = document.getElementById("modal-one");
	
	var showModal = function(){
		event.preventDefault();
		document.querySelector('#modal-overlay').classList.add('show');
		modal.classList.add('show');
	};

	var hideModal = function(event){
		event.preventDefault();
		document.querySelector('#modal-overlay').classList.remove('show');
		this.parentElement.classList.remove('show');
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

function makeTableFromProgress() {
	var resultsTable = document.querySelector('.resultsTable');
    resultsTable.innerHTML = `
    	<div class="resultsTable">
            <table>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Player move</th>
                        <th>Computer move</th>
                        <th>Result</th>
                        <th>Game score</th>
                    </tr>
                </thead>
                <tbody id="resultsTableBody"></tbody>
            </table>
        </div>`

    var resultsTableBody = document.querySelector('#resultsTableBody');
    var rows = params.progress.length;
    for (i = 1; i<rows; i++) {
      var row = resultsTableBody.insertRow(i-1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);
    cell1.innerHTML = params.progress[i]['number'];
    cell2.innerHTML = params.progress[i]['playerMove'];
    cell3.innerHTML = params.progress[i]['computerMove'];
    cell4.innerHTML = params.progress[i]['result'];
    cell5.innerHTML = params.progress[i]['gameResult'];
  }
};

function cleanTable() {
    var resultsTable = document.querySelector('.resultsTable');
    resultsTable.innerHTML = '';
};