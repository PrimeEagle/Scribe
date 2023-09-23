var ZWNBSP = "\uFEFF";
var ZWJ    = "\u200D";
var ZWS    = "\u200B";
var NBSP   = "\u00A0";
var DH     = "\u00AD";
var INDENT = "\u0002";
var ENS    = "\u0003";
var RTL    = "\u200F";
var LTR    = "\u200E";

var inDesignControlCodes = [
                                ZWNBSP,
                                ZWJ,
                                ZWS,
                                NBSP,
                                DH,
                                INDENT,
                                ENS,
                                RTL,
                                LTR
                            ];

function containsControlCodes(str) {
    for(var i = 0; i < inDesignControlCodes.length; i++) {
        if(str.indexOf(inDesignControlCodes[i] >= 0)) {
            return true;
        }
    }

    return false;
}

function isControlCodeString(str) {
    if(!containsControlCodes(str)) {
        return false;
    }

    for(var i = 0; i < str.length; i++) {
        if(!containsControlCodes(str[i])) {
            return false;
        }
    }

    return true;
}

function closeAll() {
    while (app.documents.length > 0) {
        app.documents[0].close(SaveOptions.NO);
    }

    while (app.books.length > 0) {
        app.books[0].close(SaveOptions.NO);
    }
}

function clearBook(book) {
    var bookContents = book.bookContents;

    for (var i = bookContents.length - 1; i >= 0; i--) {
        var bookContent = bookContents[i];
        bookContent.remove();
    }
}

function documentExistsInBook(book, file) {
    for (var j = 0; j < book.bookContents.length; j++) {
        if (book.bookContents[j].fullName.toString() === file.toString()) {
            return true;
        }
    }
    return false;
}

function getDocumentFromBook(book, name) {
    for (var j = 0; j < book.bookContents.length; j++) {
        if (book.bookContents[j].name === name) {
            return book.bookContents[j];
        }
    }
    
    return null;
}

function isMasterItemOverriddenOnPage(masterPageItem, page) {
    for (var i = 0; i < page.pageItems.length; i++) {
        if (page.pageItems[i].id === masterPageItem.id) {
            return true;
        }
    }
    return false;
}

function clearExistingIndexEntries(doc) {
    while(doc.indexes.length > 0 && doc.indexes[0].topics.length > 0) {
        doc.indexes[0].topics[0].remove();
    }
}

function applyMasterSpread(doc, page, masterName) {
    var masterSpread = doc.masterSpreads.itemByName(masterName);

    if(masterSpread !== null) {
        page.appliedMaster = masterSpread;
    }
}

function addPage(doc, masterName) {
    var newPage = doc.pages.add();
    applyMasterSpread(newPage, masterName);

    return newPage;
}

function addOrGetPageNumber(doc, pageNum, masterName) {
    var index = pageNum - 1;
    var newPage;

    if(doc.pages.length > index) {
        newPage = doc.pages[index];
    }
    else {
        while(index >= doc.pages.length) {
            newPage = doc.pages.add();
        }
    }

    if(masterName == noneParentName) {
        newPage.appliedMaster = null;
    }
    else {
        applyMasterSpread(doc, newPage, masterName);
    }
    
    return newPage;
}

function getTextFrameByName(page, name) {
    for(var i = 0; page.textFrames.length; i++) {
        if(page.textFrames[i].name == name) {
            return page.textFrames[i];
        }
    }

    return null;
}

function isPageRight(page) {
    var result = page.documentOffset % 2 == 0;

    if(leftPageIsOdd) {
        result = !result;
    }

    return result;
}

function getMasterSpreadPage(page) {
    var numMasterPages = page.appliedMaster.pages.length;
    var pageIndex = 0;

    if (numMasterPages > 1) {
        if(isPageRight(page)) {
            pageIndex = 1;
        }
    }
    //logMessage("pageIndex = " + pageIndex);
    return page.appliedMaster.pages[pageIndex];
}

function getMasterPageTextFrameByName(page, name) {
    try {
        var masterSpreadPage = getMasterSpreadPage(page);
        var textFrames = masterSpreadPage.textFrames;

        for (var i = 0; i < textFrames.length; i++) {
            if (textFrames[i].name == name) {
                return textFrames[i];
            }
        }

        logMessage("getMasterPageTextFrameByName: text frame '" + name + "' not found on master page '" + page.appliedMaster.name + "'");
        return null;
    } catch(e) {
        logMessage("getMasterPageTextFrameByName error: " + e);
    }
}

function getMasterPageItemByName(page, name) {
    try {
        var masterSpreadPage = getMasterSpreadPage(page);
        var pageItems = masterSpreadPage.allPageItems;

        for (var i = 0; i < pageItems.length; i++) {
            if (pageItems[i].name == name) {
                return pageItems[i];
            }
        }

        logMessage("getMasterPageItemByName: page item '" + name + "' not found on master page '" + page.appliedMaster.name + "'");
        return null;
    } catch(e) {
        logMessage("getMasterPageItemByName error: " + e);
    }
}

function getTextFrameOfInsertionPoint(insertionPoint, document) {
    for (var i = 0; i < document.textFrames.length; i++) {
        var frame = document.textFrames[i];
        if (insertionPoint.index >= frame.insertionPoints.firstItem().index && insertionPoint.index <= frame.insertionPoints.lastItem().index) {
            return frame;
        }
    }
    return null;
}

function overrideMasterPageTextFrame(page, textFrameName) {
    var textFrame = getMasterPageTextFrameByName(page, textFrameName);
    var newTextFrame;

    try {
        newTextFrame = textFrame.override(page);
    } catch(e) {
        logMessage("overrideTextFrame error: " + e);
    }

    return newTextFrame;
}

function overrideMasterPageItem(page, pageItemName) {
    var pageItem = getMasterPageItemByName(page, pageItemName);
    var newPageItem;

    try {
        newPageItem = pageItem.override(page);
    } catch(e) {
        logMessage("overrideMasterPageItem error: " + e);
    }

    return newPageItem;
}

function overrideTextFrameWithContents(page, textFrameName, value) {
    try {
        var newTextFrame = overrideMasterPageTextFrame(page, textFrameName);
        newTextFrame.contents = value;
    } catch(e) {
        logMessage("overrideTextFrameWithContents error: " + e);
    }   
}

function getNewPage(currentPageNum, doc, masterPageName) {
    var newPage;

    try {
        if(currentPageNum >= doc.pages.length) {
            newPage = doc.pages.add(LocationOptions.atEnd);
        }
        else {
            newPage = doc.pages[currentPageNum];
        }

        //logMessage("  new page num = " + newPage.documentOffset);
        newPage.appliedMaster = doc.masterSpreads.itemByName(masterPageName);
        //logMessage("  applied");
        return newPage;
    }
    catch(e) {
        logMessage("getNewPage error: " + e);
    }
}

function placeFile(textFrame, file) {
    var originalInteractionLevel = app.scriptPreferences.userInteractionLevel;
    app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;

    app.wordRTFImportPreferences.importFootnotes = true;
    app.wordRTFImportPreferences.importEndnotes = true;

    textFrame.place(file);   

    app.scriptPreferences.userInteractionLevel = originalInteractionLevel;
}

function isTextIntersecting(tableStart, tableEnd, frameStart, frameEnd) {
    return (tableStart < frameEnd && tableEnd > frameStart);
}

function visibleItems(textFrame) {
    var visibleContent = {
        paragraphs: [],
        graphics: [],
        tables: []
    };

    var frameBounds = textFrame.geometricBounds;
    var storyTables = textFrame.tables;
    var frameStart = textFrame.texts[0].index;
    var frameEnd = frameStart + textFrame.texts[0].length;
    var paragraphs = textFrame.texts[0].paragraphs;

    for (var i = 0; i < paragraphs.length; i++) {
        var para = paragraphs[i];
        
        var isVisible = false;
        for (var j = 0; j < para.insertionPoints.length; j++) {
            if (para.insertionPoints[j].parentTextFrames[0] === textFrame) {
                isVisible = true;
                break;
            }
        }
        
        if (isVisible) {
            if(para.contents.indexOf("START_TABLE") >= 0) {
                var paraContents = para.contents.replace("START_TABLE|", "").replace("|END_TABLE", ""); 
                var tempFrame = textFrame.parent.textFrames.add({
                    geometricBounds: [-200, -200, -100, -100] // This places the frame off the page
                });
                tempFrame.contents = paraContents;
                tempTable = tempFrame.paragraphs[0].convertToTable("^", "|");
                visibleContent.tables.push(tempTable.columnCount);
                tempFrame.remove();
            }
        }
        else {
            visibleContent.paragraphs.push(para);
        }
    }

    var pageItems = textFrame.allPageItems;
    for (var i = 0; i < pageItems.length; i++) {
        try {
            var itemBounds = pageItems[i].geometricBounds;
            if(pageItems[i] instanceof Image) {
                visibleContent.graphics.push(pageItems[i]);
            }
        } catch(e) {
            // not visible
        }           
    }

    return visibleContent;
}

function hasFootnoteOnLastLine(page) {
    var textFrames = page.textFrames;

    for (var i = 0; i < textFrames.length; i++) {
        var textFrame = textFrames[i];
        var lines = textFrame.lines;
        var lastLine = lines[lines.length - 1];
        var footnotes = lastLine.footnotes;

        if (footnotes.length > 0) {
            return true;
        }
    }

    return false;
}

function copyDocAndOpen(source, target) {
    var sourceFile = File(source);
    sourceFile.copy(target);
    var targetFile = File(target);

    if(!targetFile.exists) {
        alert("File '" + target + "' was not created.");
    }

    var doc = app.open(targetFile, false);

    return doc;
}