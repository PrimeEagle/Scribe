function importDocs(book) {
    var bookContents = book.bookContents;

    for (var i = 0; i < bookContents.length; i++) {
        var docName = bookContents[i].name;
        var docPath = inDesignPath + docName;
        
        if (!shouldProcessDoc(docName)) { continue; }

        var doc = app.open(File(docPath));
        var wordDocName = convertInDesignToWordName(docName);
        var wordDocPath = wordPath + wordDocName;
        var curPage = 0;
        var page = doc.pages[curPage];
        
        var textFrame = overrideMasterPageTextFrame(page, importTextFrameName);
        placeFile(textFrame, File(wordDocPath));
        processOverflow(doc, page, textFrame);
        postProcess(doc);

        doc.save();
        doc.close();
    }
}

function processOverflow(doc, page, textFrame) {
    var curPage = page.documentOffset;

    while (textFrame.overflows) {           
        curPage++;
        var newPage = getNewPage(curPage, doc, importParentName);
        var newMasterPageTextFrame = overrideMasterPageTextFrame(newPage, importTextFrameName);

        textFrame.nextTextFrame = newMasterPageTextFrame;
        textFrame = newMasterPageTextFrame;
    }
}

function postProcess(doc) {
    var lastTextFrame;

    postProcessDocumentFunctions(doc);

    if(postProcessFuncListPages.length === 0 && postProcessFuncListTextFrames.length === 0 && postProcessFuncListParagraphs.length === 0 && postProcessFuncListCharacters.length === 0) { return; }
    for(var pg = doc.pages.length - 1; pg >= 0; pg--) {
        var page = doc.pages[pg];
        postProcessPageFunctions(doc, page);

        if(postProcessFuncListTextFrames.length === 0 && postProcessFuncListParagraphs.length === 0 && postProcessFuncListCharacters.length === 0) { continue; }
        for(var tf = page.textFrames.leng - 1; tf >= 0; tf--) {
            var textFrame = page.textFrames[tf];
            postProcessTextFrameFunctions(doc, pg, textFrame);

            if(postProcessFuncListParagraphs.length === 0 && postProcessFuncListCharacters.length === 0) { continue; }
            for(var p = textFrame.paragraphs.length - 1; p >= 0; p--) {
                var para = textFrame.paragraphs[p];
                postProcessParagraphFunctions(doc, pg, tf, para);

                if(postProcessFuncListCharacters.length === 0) { continue; }
                for(var c = para.characters.length - 1; c >= 0; c--) {
                    var chr = para.characters[c];
                    postProcessCharacterFunctions(doc, pg, tf, p, chr);
                }
            }
        }
    }

    lastTextFrame = getTextFrameByName(doc.pages[-1], importTextFrameName);
    processOverflow(doc, doc.pages[-1], lastTextFrame);
}

function postProcessDocumentFunctions(doc) {
    if(postProcessFuncListDocument.length === 0) { return; }

    for(var i = 0; i < postProcessFuncListDocument.length; i++) {
        var func = postProcessPage[i];
        var params = [ doc ];
        func.apply(null, params);
    }
}

function postProcessPageFunctions(doc, page) {
    if(postProcessFuncListPages.length === 0) { return; }

    for(var i = 0; i < postProcessFuncListPages.length; i++) {
        var func = postProcessPage[i];
        var params = [ doc, page ];
        func.apply(null, params);
    }
}

function postProcessTextFrameFunctions(doc, pageNum, textFrame) {
    if(postProcessFuncListTextFrames.length === 0) { return; }

    for(var i = 0; i < postProcessFuncListTextFrames.length; i++) {
        var func = postProcessPage[i];
        var params = [ doc, pageNum, textFrame ];
        func.apply(null, params);
    }
}

function postProcessParagraphFunctions(doc, pageNum, textFrameNum, para) {
    if(postProcessFuncListParagraphs.length === 0) { return; }

    for(var i = 0; i < postProcessFuncListParagraphs.length; i++) {
        var func = postProcessPage[i];
        var params = [ doc, pageNum, textFrameNum, para ];
        func.apply(null, params);
    }
}

function postProcessCharacterFunctions(doc, pageNum, textFrameNum, paraNum, chr) {
    if(postProcessFuncListCharacters.length === 0) { return; }

    for(var i = 0; i < postProcessFuncListCharacters.length; i++) {
        var func = postProcessPage[i];
        var params = [ doc, pageNum, textFrameNum, paraNum, chr ];
        func.apply(null, params);
    }
}

function runIfCustomVersionExists(funcName, parameters) {
    var customFunc = funcName + "-custom";

    if(typeof this[customFunc] !== "function") {
        var func = customFunc;
        var params = parameters;
        func.apply(null, params);

        return 1;
    }

    return null;
}