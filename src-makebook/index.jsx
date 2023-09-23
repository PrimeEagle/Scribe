function getIndexedRanges(doc, term) {
    var found = doc.findGrep({findWhat: term});
    var result = [];
    for (var i = 0; i < found.length; i++) {
        result.push({
            start: found[i].index,
            end: found[i].index + found[i].length
        });
    }
    return result;       
}

function isOverlapping(rangesA, rangesB) {
    for (var i = 0; i < rangesA.length; i++) {
        var rangeA = rangesA[i];
        for (var j = 0; j < rangesB.length; j++) {
            var rangeB = rangesB[j];
            if (rangeA.start < rangeB.end && rangeA.end > rangeB.start) {
                return true;
            }
        }
    }
    return false;
}   

function processIndex(book) {
    var originalInteractionLevel = app.scriptPreferences.userInteractionLevel;
    app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;

    var indexDocument = app.open(File(inDesignPath + indexDocName));
    if (indexDocument.indexes.length == 0) {
        indexDocument.indexes.add();
    }

    book.synchronize();
    indexDocument.indexes[0].generate();
    indexDocument.close(SaveOptions.YES);

    app.scriptPreferences.userInteractionLevel = originalInteractionLevel;
}