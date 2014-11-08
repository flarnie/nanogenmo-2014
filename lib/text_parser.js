var fs = require('fs');

/**
 * Reads in a text file, and parses it into a JSON file with keys for each
 * unique word that starts a sentence, and an array of sentence objects under
 * each 'starterWord' key.
 * @param {String} filename
 */
var textParser = function(filename) {
  var text = fs.readFileSync(('seed_text/' + filename + '.txt'), 'utf8');
  var sentences = [];
  var punctuationEndings = { '.': true, '?': true, '!': true };
  var newlineChars = { '\n': true, '\r': true };
  var currentSentence = '';
  var inIllustration = false;
  // read the text one char at a time, building up sentences.
  for (var index in text) {
    var currentChar = text[index];
    if (currentChar === '[') {
      // We are in an illustration annotation.
      // Ignore all characters until we reach the end of the illustration.
      inIllustration = true;
    } else if (inIllustration) {
      if (currentChar === ']') {
        // We were in an illustration annotation, but we've reached the end.
        inIllustration = false;
      }
    } else if (currentChar in newlineChars) {
      // silently change it to a space - we will add our own linebreaks later.
      currentSentence = currentSentence + ' ';
    } else if (currentChar in punctuationEndings) {
      // We have built up a single sentence - save it and start a new one.
      currentSentence = currentSentence + currentChar;
      sentences.push(currentSentence);
      currentSentence = '';
    } else {
      // Keep saving letters in this sentence.
      currentSentence = currentSentence + currentChar;
    }
  }

  // build up our parsedText object by parsing each sentence.
  var parsedText = {};
  var flipper = true;

  for (var sentIndex in sentences) {
    var thisSentence = sentences[sentIndex],
        firstWord = thisSentence.split(' ', 1)[0],
        nextSentence = sentences[(sentIndex + 1)],
        nextSentWord;
    if (nextSentence) {
      var nextSentWord = nextSentence.split(' ', 1)[0];
    }

    parsedText[firstWord] = parsedText[firstWord] || [];
    var sentenceAttributes = { sentence: thisSentence, nextSentStartsWith: nextSentWord };
    // Randomly adding sentences to the front or back of the queue will mix
    // things up a bit.
    if (flipper) {
      flipper = false;
      parsedText[firstWord].push(sentenceAttributes);
    } else {
      flipper = true;
      parsedText[firstWord].unshift(sentenceAttributes);
    }
  }

  // Save the parsedText object to a json file
  fs.writeFile(('parsed_text/' + filename + '.json'), JSON.stringify(parsedText), function (err) {
    if (err) throw err;
  });
};

module.exports = textParser;
