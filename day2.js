const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('day2_input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const rpsMap = {
      X: 0,
      Y: 3,
      Z: 6
  };

  const winMap = {
      A: 2, // win by paper
      B: 3, // win by scissor
      C: 1 // win by rock
  };

  const drawMap = {
      A: 1,
      B: 2,
      C: 3
  };

  const loseMap = {
      A: 3, // lose by scissor
      B: 1, // lose by rock
      C: 2 // lose by paper
  }

  let total = 0;

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    let moves = line.split(' ');
    let oppMove = moves[0];
    let endResult = moves[1];
    let currentScore = rpsMap[endResult];
    if (endResult === 'X') { // opponent win
        currentScore += loseMap[oppMove];
    } else if (endResult === 'Y') { // draw
        currentScore += drawMap[oppMove];
    } else { // I win
        currentScore += winMap[oppMove];
    }
    total += currentScore;
  }

  console.log('hey total score is: ', total);
}

processLineByLine();