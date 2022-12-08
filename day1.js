const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
  
  let elfCalories = [];
  let index = 0;
  let currentCalories = 0;

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    if (line) {
        if (!elfCalories[index]) {
            elfCalories[index] = 0;
        }
        elfCalories[index] += parseInt(line);
    } else {
        index++;
        currentCalories = 0;
    }
  }

  let totalLength = elfCalories.length;
  elfCalories = elfCalories.sort((a,b) => a-b);
  console.log('top 3 elves: ', elfCalories[totalLength-1] + elfCalories[totalLength-2] + elfCalories[totalLength-3]);
}

processLineByLine();