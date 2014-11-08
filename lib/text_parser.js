var fs = require('fs');

/**
 * @const {Object} SENTENCE_ENDINGS
 */
var SENTENCE_ENDINGS = { '.': true, '?': true, '!': true };

/**
 * Trims whitespace from start or end of sentence.
 * @param {String} sentence
 * @return {String} trimmed sentence
 */
var trim = function(sentence) {
  var trimmedSentence = '';
  var firstLetterFound = false;
  var sentenceEndFound = false;
  for (var trimIndex in sentence) {
    var trimChar = sentence[trimIndex];
    if (!firstLetterFound) {
      if (trimChar !== ' ') {
        var firstLetterFound = true;
        trimmedSentence = trimmedSentence + trimChar;
      }
    } else if (!sentenceEndFound) {
      trimmedSentence = trimmedSentence + trimChar;
      if (trimChar in SENTENCE_ENDINGS) {
        sentenceEndFound = true;
      }
    }
  }
  return trimmedSentence;
};

/**
 * Reads in a text file, and parses it into a JSON file with keys for each
 * unique word that starts a sentence, and an array of sentence objects under
 * each 'starterWord' key.
 * @param {String} filename
 */
var textParser = function(filename) {
  var text = fs.readFileSync(('seed_text/' + filename + '.txt'), 'utf8');
  var sentences = [];
  var newlineChars = { '\n': true, '\r': true };
  var skipChars = { '-': true, '"': true, '_': true, "'": true }
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
    } else if (currentChar in skipChars) {
      // some characters get silently dropped to simplify things
    } else if (currentChar in SENTENCE_ENDINGS) {
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

  for (var sentIndex in sentences) {
    var thisSentence = trim(sentences[sentIndex]),
        firstWord = thisSentence.split(' ', 1)[0],
        nextSentence = trim(sentences[(sentIndex + 1)]),
        nextSentWord;
    if (nextSentence) {
      var nextSentWord = nextSentence.split(' ', 1)[0];
    }

    parsedText[firstWord] = parsedText[firstWord] || [];
    var sentenceAttributes = { sentence: thisSentence, nextSentStartsWith: nextSentWord };
    parsedText[firstWord].push(sentenceAttributes);
  }

  // Save the parsedText object to a json file
  fs.writeFileSync(('parsed_text/' + filename + '.json'), JSON.stringify(parsedText));
};

module.exports = textParser;
