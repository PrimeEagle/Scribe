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

    if(postProcessFuncListPage.length === 0 && postProcessFuncListTextFrame.length === 0 && postProcessFuncListParagraph.length === 0 && postProcessFuncListCharacter.length === 0) { return; }
    for(var pg = doc.pages.length - 1; pg >= 0; pg--) {
        var page = doc.pages[pg];
        postProcessPageFunctions(doc, page);

        if(postProcessFuncListTextFrame.length === 0 && postProcessFuncListParagraph.length === 0 && postProcessFuncListCharacter.length === 0) { continue; }
        for(var tf = page.textFrames.length - 1; tf >= 0; tf--) {
            var textFrame = page.textFrames[tf];
            postProcessTextFrameFunctions(doc, pg, textFrame);

            if(postProcessFuncListParagraph.length === 0 && postProcessFuncListCharacter.length === 0) { continue; }
            for(var p = textFrame.paragraphs.length - 1; p >= 0; p--) {
                var para = textFrame.paragraphs[p];
                postProcessParagraphFunctions(doc, pg, tf, para);

                if(postProcessFuncListCharacter.length === 0) { continue; }
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

function runFunction(funcName, params) {
    var customFuncName = funcName + "_custom";
    var cf = this[funcName];

    if(typeof cf === "function") {
        cf.apply(null, params);    
    }
    else {
        var f = this[funcName];

        if(typeof f !== "function") {
            alert("Function '" + funcName + "' is not a function. It is of type '" + (typeof f) + "'");
        }

        f.apply(null, params);
    }
}

function runIfCustomVersionExists(funcName, parameters) {
    var customFunc = funcName + "_custom";

    if(typeof this[customFunc] !== "function") {
        var func = customFunc;
        var params = parameters;
        runFunction(func, params);

        return 1;
    }

    return null;
}

function postProcessDocumentFunctions(doc) {
    if(postProcessFuncListDocument.length === 0) { return; }

    for(var i = 0; i < postProcessFuncListDocument.length; i++) {
        var func = postProcessFuncListDocument[i];
        var params = [ doc ];
        runFunction(func, params);
    }
}

function postProcessPageFunctions(doc, page) {
    if(postProcessFuncListPage.length === 0) { return; }

    for(var i = 0; i < postProcessFuncListPage.length; i++) {
        var func = postProcessFuncListPage[i];
        var params = [ doc, page ];
        runFunction(func, params);
    }
}

function postProcessTextFrameFunctions(doc, pageNum, textFrame) {
    if(postProcessFuncListTextFrame.length === 0) { return; }

    for(var i = 0; i < postProcessFuncListTextFrame.length; i++) {
        var func = postProcessFuncListTextFrame[i];
        var params = [ doc, pageNum, textFrame ];
        runFunction(func, params);
    }
}

function postProcessParagraphFunctions(doc, pageNum, textFrameNum, para) {
    if(postProcessFuncListParagraph.length === 0) { return; }

    for(var i = 0; i < postProcessFuncListParagraph.length; i++) {
        var func = postProcessFuncListParagraph[i];
        var params = [ doc, pageNum, textFrameNum, para ];
        runFunction(func, params);
    }
}

function postProcessCharacterFunctions(doc, pageNum, textFrameNum, paraNum, chr) {
    if(postProcessFuncListCharacter.length === 0) { return; }

    for(var i = 0; i < postProcessFuncListCharacter.length; i++) {
        var func = postProcessFuncListCharacter[i];
        var params = [ doc, pageNum, textFrameNum, paraNum, chr ];
        runFunction(func, params);
    }
}