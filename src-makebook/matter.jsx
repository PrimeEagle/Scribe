function deleteFrontAndBackMatter() {
    for(var i = 0; i < frontMatterDocs.length; i++) {
        var file = File(inDesignPath + frontMatterDocs[i]);
        file.remove();
    }
    
    for(var i = 0; i < backMatterDocs.length; i++) {
        var file = File(inDesignPath + backMatterDocs[i]);
        file.remove();
    }
}

function createFrontAndBackMatter(info) {
    var pageNum;
    var doc;

    if(hasFrontCover || hasFrontEndPaper || hasHalfTitle || hasFrontispiece || hasTitlePage || hasCopyrightPage)
    {
        pageNum = 0;
        doc = copyDocAndOpen(inDesignPath + masterDocName, inDesignPath + frontMatterDocName);
        
        if(hasFrontCover) {
            addOrGetPageNumber(doc, ++pageNum, frontCoverParentName);
            overrideTextFrameWithContents(doc.pages[pageNum - 1], titleTextFrameName, info.title);
        }

        if(hasFrontEndPaper) {
            if(isEven(pageNum)) { addOrGetPageNumber(doc, ++pageNum, noneParentName); }

            addOrGetPageNumber(doc, ++pageNum, frontEndPaperParentName);
            addOrGetPageNumber(doc, ++pageNum, frontEndPaperParentName);
        }

        if(hasHalfTitle) {
            if(isOdd(pageNum)) { addOrGetPageNumber(doc, ++pageNum, noneParentName); }

            addOrGetPageNumber(doc, ++pageNum, halfTitleParentName);
            overrideTextFrameWithContents(doc.pages[pageNum - 1], halfTitleTextFrameName, info.title);
        }

        if(hasFrontispiece) {
            if(isEven(pageNum)) { addOrGetPageNumber(doc, ++pageNum, noneParentName); }

            addOrGetPageNumber(doc, ++pageNum, frontispieceParentName);
        }
        
        if(hasTitlePage) {
            if(isOdd(pageNum)) { addOrGetPageNumber(doc, ++pageNum, noneParentName); }

            addOrGetPageNumber(doc, ++pageNum, titlePageParentName);
            overrideTextFrameWithContents(doc.pages[pageNum - 1], titleTextFrameName, info.title);
            overrideTextFrameWithContents(doc.pages[pageNum - 1], subtitleTextFrameName, info.subtitle);
            overrideTextFrameWithContents(doc.pages[pageNum - 1], authorTextFrameName, info.author);
            overrideTextFrameWithContents(doc.pages[pageNum - 1], publicationLocationTextFrameName, info.publicationLocation);
            overrideTextFrameWithContents(doc.pages[pageNum - 1], publicationDateTextFrameName, info.publicationDate);
            overrideTextFrameWithContents(doc.pages[pageNum - 1], publisherTextFrameName, info.publisher);
        }

        if(hasCopyrightPage) {
            if(isEven(pageNum)) { addOrGetPageNumber(doc, ++pageNum, noneParentName); }

            addOrGetPageNumber(doc, ++pageNum, copyrightPageParentName);
            overrideTextFrameWithContents(doc.pages[pageNum - 1], copyrightBodyTextFrameName, info.copyrightText);
            overrideTextFrameWithContents(doc.pages[pageNum - 1], copyrightEditionTextFrameName, info.edition);
            overrideTextFrameWithContents(doc.pages[pageNum - 1], copyrightTextFrameName, info.copyrightDate);
            overrideTextFrameWithContents(doc.pages[pageNum - 1], copyrightPublisherTextFrameName, info.publisher);
        }

        doc.close(SaveOptions.YES);
    }

    if(hasDedication) {
        pageNum = 0;
        doc = copyDocAndOpen(inDesignPath + masterDocName, inDesignPath + dedicationDocName);

        addOrGetPageNumber(doc, ++pageNum, dedicationParentName);
        
        doc.close(SaveOptions.YES);    
    }

    if(hasEpigraph) {
        pageNum = 0;
        doc = copyDocAndOpen(inDesignPath + masterDocName, inDesignPath + epigraphDocName);

        addOrGetPageNumber(doc, ++pageNum, epigraphParentName);
        
        doc.close(SaveOptions.YES);        
    }

    if(hasTOC) {
        pageNum = 0;
        doc = copyDocAndOpen(inDesignPath + masterDocName, inDesignPath + tocDocName);

        addOrGetPageNumber(doc,++pageNum, tableOfContentsParentName);
        overrideTextFrameWithContents(doc.pages[pageNum - 1], tocBodyTextFrameName, tocTitle);

        addOrGetPageNumber(doc, ++pageNum, tableOfContentsParentName);
        doc.close(SaveOptions.YES);        
    }

    if(hasListOfTables) {
        pageNum = 0;
        doc = copyDocAndOpen(inDesignPath + masterDocName, inDesignPath + listOfTablesDocName);

        addOrGetPageNumber(doc, ++pageNum, tableOfContentsParentName);
        overrideTextFrameWithContents(doc.pages[pageNum - 1], tocBodyTextFrameName, listOfTablesTitle);

        addOrGetPageNumber(doc, ++pageNum, tableOfContentsParentName);
        doc.close(SaveOptions.YES);
    }

    if(hasListOfFigures) {
        pageNum = 0;
        doc = copyDocAndOpen(inDesignPath + masterDocName, inDesignPath + listOfFiguresDocName);

        addOrGetPageNumber(doc, ++pageNum, tableOfContentsParentName);
        overrideTextFrameWithContents(doc.pages[pageNum - 1], tocBodyTextFrameName, listOfFiguresTitle);

        addOrGetPageNumber(doc, ++pageNum, tableOfContentsParentName);
        doc.close(SaveOptions.YES);
    }

    if(hasForeword) {
        pageNum = 0;
        doc = copyDocAndOpen(inDesignPath + masterDocName, inDesignPath + forewordDocName);

        addOrGetPageNumber(doc, ++pageNum, forewordParentName);
        
        doc.close(SaveOptions.YES);    
    }

    if(hasPreface) {
        pageNum = 0;
        doc = copyDocAndOpen(inDesignPath + masterDocName, inDesignPath + prefaceDocName);

        addOrGetPageNumber(doc, ++pageNum, prefaceParentName);
        
        doc.close(SaveOptions.YES);    
    }

    if(hasAcknowledgements) {
        pageNum = 0;
        doc = copyDocAndOpen(inDesignPath + masterDocName, inDesignPath + acknowledgementsDocName);

        addOrGetPageNumber(doc, ++pageNum, acknowledgementsParentName);
        
        doc.close(SaveOptions.YES);    
    }

    if(hasIntroduction) {
        pageNum = 0;
        doc = copyDocAndOpen(inDesignPath + masterDocName, inDesignPath + introductionDocName);

        addOrGetPageNumber(doc, ++pageNum, introductionParentName);
        
        doc.close(SaveOptions.YES);    
    }

    if(hasPrologue) {
        pageNum = 0;
        doc = copyDocAndOpen(inDesignPath + masterDocName, inDesignPath + prologueDocName);

        addOrGetPageNumber(doc, ++pageNum, prologueParentName);
        
        doc.close(SaveOptions.YES);        
    }

    if(hasEpilogue) {
        pageNum = 0;
        doc = copyDocAndOpen(inDesignPath + masterDocName, inDesignPath + epilogueDocName);

        addOrGetPageNumber(doc, ++pageNum, epilogueParentName);
        
        doc.close(SaveOptions.YES);        
    }

    if(hasOutro) {
        pageNum = 0;
        doc = copyDocAndOpen(inDesignPath + masterDocName, inDesignPath + outroDocName);

        addOrGetPageNumber(doc, ++pageNum, outroParentName);
        
        doc.close(SaveOptions.YES);        
    }

    if(hasAfterword) {
        pageNum = 0;
        doc = copyDocAndOpen(inDesignPath + masterDocName, inDesignPath + afterwordDocName);

        addOrGetPageNumber(doc, ++pageNum, afterwordParentName);
        
        doc.close(SaveOptions.YES);    
    }

    if(hasConclusion) {
        pageNum = 0;
        doc = copyDocAndOpen(inDesignPath + masterDocName, inDesignPath + conclusionDocName);

        addOrGetPageNumber(doc, ++pageNum, conclusionParentName);
        
        doc.close(SaveOptions.YES);        
    }

    if(hasPostscript) {
        pageNum = 0;
        doc = copyDocAndOpen(inDesignPath + masterDocName, inDesignPath + postscriptParentName);

        addOrGetPageNumber(doc, ++pageNum, postscriptParentName);
        
        doc.close(SaveOptions.YES);        
    }

    if(hasAppendix) {
        pageNum = 0;
        doc = copyDocAndOpen(inDesignPath + masterDocName, inDesignPath + appendixDocName);

        addOrGetPageNumber(doc, ++pageNum, appendixParentName);
        
        doc.close(SaveOptions.YES);        
    }

    if(hasAddendum) {
        pageNum = 0;
        doc = copyDocAndOpen(inDesignPath + masterDocName, inDesignPath + addendumDocName);

        addOrGetPageNumber(doc, ++pageNum, addendumParentName);
        
        doc.close(SaveOptions.YES);        
    }

    if(hasGlossary) {
        pageNum = 0;
        doc = copyDocAndOpen(inDesignPath + masterDocName, inDesignPath + glossaryDocName);

        addOrGetPageNumber(doc, ++pageNum, glossaryParentName);
        
        doc.close(SaveOptions.YES);    
    }

    if(hasBibliography) {
        pageNum = 0;
        doc = copyDocAndOpen(inDesignPath + masterDocName, inDesignPath + bibliographyDocName);

        addOrGetPageNumber(doc, ++pageNum, bibliographyParentName);
        doc.close(SaveOptions.YES);    
    }

    if(hasIndex) {
        pageNum = 0;
        doc = copyDocAndOpen(inDesignPath + masterDocName, inDesignPath + indexDocName);

        addOrGetPageNumber(doc, ++pageNum, indexParentName);
        doc.close(SaveOptions.YES);    
    }

    if(hasColophon) {
        pageNum = 0;
        doc = copyDocAndOpen(inDesignPath + masterDocName, inDesignPath + colophonDocName);

        addOrGetPageNumber(doc, ++pageNum, colophonParentName);
        doc.close(SaveOptions.YES);    
    }

    if(hasPostface) {
        pageNum = 0;
        doc = copyDocAndOpen(inDesignPath + masterDocName, inDesignPath + postfaceDocName);

        addOrGetPageNumber(doc, ++pageNum, postfaceParentName);
        
        doc.close(SaveOptions.YES);        
    }

    if (hasBackEndPaper || hasBackCover) {
        pageNum = 0;
        doc = copyDocAndOpen(inDesignPath + masterDocName, inDesignPath + backMatterDocName);

        if(hasBackEndPaper) {
            if(isEven(pageNum)) { addOrGetPageNumber(doc, ++pageNum, noneParentName); }

            addOrGetPageNumber(doc, ++pageNum, backEndPaperParentName);
            addOrGetPageNumber(doc, ++pageNum, backEndPaperParentName);
        }
        
        if(hasBackCover) {
            if(isOdd(pageNum)) { addOrGetPageNumber(doc, ++pageNum, noneParentName); }

            addOrGetPageNumber(doc, ++pageNum, backCoverParentName);
        }

        doc.close(SaveOptions.YES);
    }
}

function addFrontAndBackMatterToBook(book) {
    var pi = readProjectInfo();

    deleteFrontAndBackMatter();
    createFrontAndBackMatter(pi);

    for(var i = 0; i < frontMatterDocs.length; i++) {
        book.bookContents.add(File(inDesignPath + frontMatterDocs[i]));
    }
    
    for(var i = 0; i < backMatterDocs.length; i++) {
        book.bookContents.add(File(inDesignPath + backMatterDocs[i]));
    }
}