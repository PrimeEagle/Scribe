function applyCharacterStyleToSubset(word, charStyle) {
    var wordContents = word.contents;
    var parts = splitOnChars(wordContents, punctuationSymbols);

    var currentIndex = 0;

    for (var i = 0; i < parts.length; i++) {
        var part = parts[i];

        var start = wordContents.indexOf(part, currentIndex);
        var end = start + part.length;
        var adjustment = countNonBMPChars(wordContents, end);

        try {
            word.characters.itemByRange(start, end - 1 - adjustment).applyCharacterStyle(charStyle);
        } catch(e) {
            logMessage("error = " + e);
            logMessage("start = " + start);
            logMessage("end = " + (end - adjustment));
            logMessage("wordContents = " + wordContents);
            logMessage("wordCharactersLength = " + word.characters.length);
            logMessage("current character causing error: " + wordContents.substring(start, end - adjustment));
        }

        currentIndex = end;
    }
}