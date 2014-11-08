// The Plan:
// 1. Analyze a seed text and turn it into a JSON file
/*
var textParser = require('../lib/text_parser');

// Generate pirates seedfile
textParser('pirates_1', 'pirates_2');

// Generate vikings seedfile
textParser('vikings_1', 'vikings_2');

// Generate aliens seedfile
textParser('aliens_1', 'aliens_2');

// Generate dinosaurs seedfile
textParser('dinosaurs_1', 'dinosaurs_2');

// Generate combined seedfile
textParser('everything');
*/

// 2. Report on the contents of the JSON file, and inspect it to make sure it
// looks good.
/*
var fs = require('fs');
var jsonFilename = 'parsed_text/pirates_1.json';
var printReportOnParsedData = function(jsonFilename) {
  console.log('====================================');
  console.log('REPORT ON ', jsonFilename);
  var sentences = JSON.parse(fs.readFileSync(jsonFilename));
  for (var starterWord in sentences) {
    if (sentences.hasOwnProperty(starterWord)) {
      var count = sentences[starterWord].length;
      console.log('The starter word ', starterWord, ' begins ', count, ' sentences.');
    }
  }
  console.log('====================================');
};
printReportOnParsedData('parsed_text/pirates_1.json');
printReportOnParsedData('parsed_text/vikings_1.json');
printReportOnParsedData('parsed_text/aliens_1.json');
printReportOnParsedData('parsed_text/dinosaurs_1.json');
printReportOnParsedData('parsed_text/everything.json');
*/

// 3. Use the JSON data to generate a markdown file with a paragraph of text,
// using a markov chain.
/*
var generateFiction = require('../lib/generate_fiction');
generateFiction({
  jsonFilename: 'pirates_1',
  pageTitle: 'Test: Pirates',
  minimumWords: 500,
  startsWith: 'piracy'
});
*/

// 4. Look at the generated text, and make sure it looks ok.
// Done: https://github.com/flarnie/nanogenmo-2014/commit/93fcc6f2766300256ffae044d40403c8701cfa40/ Done.

// 5. Generate the entire 5 chapters of the novel.
/*
var generateFiction = require('../lib/generate_fiction');

generateFiction({
  jsonFilename: 'pirates_1',
  pageTitle: 'Test: Pirates',
  minimumWords: 500,
  startsWith: 'piracy'
});
*/
// 6. Use grunt-markdown-pdf to turn the markdown pages into a pdf book.
// https://www.npmjs.org/package/grunt-markdown-pdf
//
// Victory!
