var fs = require('fs');

/**
 * gets a random number between min (inclusive) and max (exclusive)
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 */
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * formats any string to be usable as a file name
 * @param {String} name
 * @return {String} filenameFormattedName
 */
function filenameFormat(name) {
 return name.replace(/\\|\/|\:|\?|\*|\"|\[|\]|\<|\>|\||\s/g, '_');
};

/**
 * Reads a set of JSON seed data and uses it to generate a
 * piece of fiction using a very simple markov chain.
 * @see http://en.wikipedia.org/wiki/Markov_chain
 * Saves the fiction as markdown.
 * @param {Object} options Example:
 * {
 * jsonFileName: 'mySeeds', // (becomes 'parsed_text/mySeeds.json')
 * pageTitle: 'Testing 1 2 3', // (Used at top of markdown and for filename,
 *                            // meaning fiction is saved as 'testing_1_2_3.md')
 * startsWith: 'Once upon a time, there', // used for first sentence.
 * minimumWords: 500 // It will stop generating after eaching this word count.
 * }
 */
var generateFiction = function(options) {
  var currentWordCount = 0;
  var sentenceData = JSON.parse(fs.readFileSync(('parsed_text/' + options.jsonFilename + '.json')));
  var currentParagraph = '';
  var allText = '';
  var starterWord = options.startsWith.toLowerCase();

  function findNextStarter() {
    var defaultStarterCount = 0;
    var defaultStarters = ['then', 'the', 'he', 'next', 'while', 'she'];
    while (defaultStarterCount < defaultStarters.length) {
      var defaultStarter = defaultStarters[getRandomArbitrary(0, defaultStarters.length)];
      if (sentenceData[defaultStarter] && sentenceData[defaultStarter].length) {
        return defaultStarter;
      }
      defaultStarterCount++;
    }
    for (var otherStarter in sentenceData) {
      return otherStarter;
    }
  };

  while (currentWordCount < options.minimumWords) {
    // paragraphs are between 3 and 10 sentences long.
    var parLength = getRandomArbitrary(3, 11);
    for (var parCount = 0; parCount <= parLength; parCount ++) {
      // get the next sentence

      var nextSentence = sentenceData[starterWord].shift();
      while (!nextSentence) {
        // set the next starterWord
        starterWord = findNextStarter();
        nextSentence = sentenceData[starterWord].shift();
      }
      var sentenceText = nextSentence.sentence;
      // add to the current paragraph
      currentParagraph = currentParagraph + ' ' + sentenceText;
      // increase wordcount
      currentWordCount = currentWordCount + sentenceText.split(' ').length;
      // set the next starterWord
      starterWord = nextSentence.nextSentStartsWith || findNextStarter();
    }
    // add paragraph to all the text
    allText = allText + '\n\n' + currentParagraph;
    currentParagraph = '';
 }


  allText = '#' + options.pageTitle + '\n\n' + allText;
  var chapterFileName = filenameFormat(options.pageTitle);
  fs.writeFileSync(('generated_chapters/' + chapterFileName + '.md'), allText);
};

module.exports = generateFiction;
