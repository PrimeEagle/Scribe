function processTableOfContents(book) {
    var mainTocDoc;
    var tableTocDoc;
    var figureTocDoc;

    for (var i = 0; i < book.bookContents.length; i++) {
        if (book.bookContents[i].name == tocDocName) {
            mainTocDoc = app.open(book.bookContents[i].fullName, false);
        }
        
        if (book.bookContents[i].name == listOfTablesDocName) {
            tableTocDoc = app.open(book.bookContents[i].fullName, false);
        }

        if (book.bookContents[i].name == listOfFiguresDocName) {
            figureTocDoc = app.open(book.bookContents[i].fullName, false);
        }
    }

    if(hasTOC) {
        processTableOfContentsForDocument(mainTocPath, mainTocDoc, book, tocStandardStyleName);
    }

    if(hasListOfTables) {
        processTableOfContentsForDocument(tablesTocPath, tableTocDoc, book, tocTableStyleName);
    }

    if(hasListOfFigures) {
        processTableOfContentsForDocument(figuresTocPath, figureTocDoc, book, tocFigureStyleName);
    }
}

function processTableOfContentsForDocument(inputFile, doc, book, tocStyleName) {
        var txtFile = File(indexCsvPath);
        if(!txtFile.exists) { return; }

        var stylesHierarchy = [];
        var tocStyle = doc.tocStyles.itemByName(tocStyleName);

        txtFile.open('r');
        while (!txtFile.eof) {
            var line = txtFile.readln();
            var level = getIndentationLevel(line);
            var styleName = line.trim();
            stylesHierarchy.push({name: styleName, level: level});
        }
        txtFile.close();

        for (var i = doc.stories.length - 1; i >= 0; i--) {
            var story = doc.stories[i];
            if (story.storyType == StoryTypes.TOC_STORY) {
                story.remove();
            }
        }

        for (var i = 0; i < stylesHierarchy.length; i++) {
            var entry = tocStyle.tocStyleEntries.add({
                name: stylesHierarchy[i].name,
                sortType: SortType.SORT_BY_LAYOUT
            });

            entry.leftIndent = stylesHierarchy[i].level + " in";
        }

        doc.createTOC(tocStyle, true, book);
}