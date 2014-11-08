// The Plan:
// 1. Analyze a seed text and turn it into a JSON file
var textParser = require('../lib/text_parser');
var seedTextFilename = 'pirates_1';
textParser(seedTextFilename);

// 2. Report on the contents of the JSON file, and inspect it to make sure it
// looks good.
/*
var fs = require('fs');
var jsonFilename = 'parsed_text/pirates_1.json';
var pirateSentences = JSON.parse(fs.readFileSync(jsonFilename));
for (var starterWord in pirateSentences) {
  if (pirateSentences.hasOwnProperty(starterWord)) {
    var count = pirateSentences[starterWord].length;
    console.log('The starter word ', starterWord, ' begins ', count, ' sentences.');
  }
}
*/

// 3. Use the JSON data to generate a markdown file with a paragraph of text,
// using a markov chain.
var generateFiction = require('../lib/generate_fiction');
generateFiction({
  jsonFilename: 'pirates_1',
  pageTitle: 'Test: Pirates',
  minimumWords: 500,
  startsWith: 'piracy'
});

// 4. Look at the generated text, and make sure it looks ok.
// 5. Generate the entire 5 chapters of the novel.
// 6. Use grunt-markdown-pdf to turn the markdown pages into a pdf book.
// https://www.npmjs.org/package/grunt-markdown-pdf
//
// Victory!
