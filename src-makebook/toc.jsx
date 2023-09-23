function processTableOfContents(book) {
    var mainTocDoc;
    var tableTocDoc;
    var figureTocDoc;

    for (var i = 0; i < book.bookContents.length; i++) {
        if (book.bookContents[i].name == tocDocName) {
            mainTocDoc = book.bookContents[i];
        }
        
        if (book.bookContents[i].name == listOfTablesDocName) {
            tableTocDoc = book.bookContents[i];
        }

        if (book.bookContents[i].name == listOfFiguresDocName) {
            figureTocDoc = book.bookContents[i];
        }
    }

    processTableOfContentsForDocument(mainTocPath, mainTocDoc);
    processTableOfContentsForDocument(tablesTocPath, tableTocDoc);
    processTableOfContentsForDocument(figuresTocPath, figureTocDoc);
}

function processTableOfContentsForDocument(inputFile, tocDoc) {
        var txtFile = File(indexCsvPath);
        if(!txtFile.exists) { return; }

        var stylesHierarchy = [];
        txtFile.open('r');
        while (!txtFile.eof) {
            var line = txtFile.readln();
            var level = getIndentationLevel(line);
            var styleName = line.trim();
            stylesHierarchy.push({name: styleName, level: level});
        }
        txtFile.close();

        for (var i = tocDoc.stories.length - 1; i >= 0; i--) {
            var story = tocDoc.stories[i];
            if (story.storyType == StoryTypes.TOC_STORY) {
                story.remove();
            }
        }

        for (var i = 0; i < stylesHierarchy.length; i++) {
            var entry = myTOCStyle.tocStyleEntries.add({
                name: stylesHierarchy[i].name,
                sortType: SortType.SORT_BY_LAYOUT
            });

            entry.leftIndent = stylesHierarchy[i].level + " in";
        }

        tocDoc.createTOC(myTOCStyle, true, myDocs, tocDoc.pages.item(0));
}