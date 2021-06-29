// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
} 

function initialPrompt() {
  console.log("Let's play some Scrabble!" + "\n")
  let userInput = input.question("Enter a word to score: ");
  return userInput;
}

let simpleScore = function(word) {
  let numScore = word.length;
  return numScore;
}

let vowelBonusScore = function(word) {
  let score = 0;
  let vowels = ["a", "e", "i", "o", "u"];
  for (let i = 0; i < word.length; i++) {
    if (vowels.includes(word.toLowerCase().charAt(i))) {
      score += 3;
    } else {
      score += 1;
    }
  }
  return score;
}

let scrabbleScore = function(word) {
  word = word.toLowerCase();
  let myKey = "";
	let cumulativePoints = 0;
	for (let i = 0; i < word.length; i++) {
    for (let key in newPointStructure) {
      if(key === word[i]){
        cumulativePoints += Number(newPointStructure[key]);
      }
    }
  }
  return cumulativePoints;
}; 

const scoringAlgorithms = [
  {
    name: "Simple Score",
    description: "Each letter is worth 1 point.", 
    scoringFunction: simpleScore
  },
  {
    name: "Bonus Vowels",
    description: "Vowels are 3 pts, consonants are 1 pt.", 
    scoringFunction: vowelBonusScore
  },
  {
    name: "scrabbleScore",
    description: "Cumulative score for the whole word entered.",
    scoringFunction: scrabbleScore
  }
];

function scorerPrompt(word) {
  let userInput = input.question("\n" + "Which scoring algorithm would you like to use?" + "\n" + "0 - Simple: One point per character" + "\n" + "1 - Vowel Bonus: Vowels are worth 3 points" + "\n" + "2 - Scrabble: Uses scrabble point system" + "\n" + "Enter 0, 1, or 2: ");
  
  if (Number(userInput) >= 0 && Number(userInput) <= 2) {
    let score = scoringAlgorithms[Number(userInput)].scoringFunction(word);
    console.log(`Score for '${word}': ${score}`);
    // return scoringAlgorithms[Number(userInput)];
  } else {
    console.log("\n" + "Invalid entry.");
    runProgram();
  }
}

function transform(ops) {
  let newPointStructure = {};
  let key = "";
  for (item in ops) {
    for (let i = 0; i < ops[item].length; i++) {
      key = ops[item][i].toLowerCase(); 
      newPointStructure[key] = item;
    }   
  }
  return newPointStructure;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
  let word = initialPrompt();
  scorerPrompt(word);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};