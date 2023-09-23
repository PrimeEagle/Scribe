
var postProcessFuncListDocument = [];
var postProcessFuncListPage = [];
var postProcessFuncListTextFrame = [];
var postProcessFuncListParagraph = [];
var postProcessFuncListCharacter = [];

if(hasCrossReferences)                   { postProcessFuncListDocument.push("pp_d_updateCaptionsAndXRefsForDocument"); }
if(hasTables || hasImages)               { postProcessFuncListDocument.push("pp_d_updateCaptionsAndXRefsForDocument"); }
if(hasUnicodeLanguageScripts)            { postProcessFuncListDocument.push("pp_d_updateCaptionsAndXRefsForDocument"); }
if(hasTables)                            { postProcessFuncListDocument.push("pp_d_processTables"); }
if(hasIndex)                             { postProcessFuncListDocument.push("pp_d_processDocumentIndeces"); }
if(clearImportedParagraphStyleOverrides) { postProcessFuncListDocument.push("pp_d_clearParagraphStyleOverrides"); }
if(clearImportedCharacterStyleOverrides) { postProcessFuncListDocument.push("pp_d_clearCharacterStyleOverrides"); }
if(deleteDefaultParentPages)             { postProcessFuncListDocument.push("pp_d_deleteDefaultParent"); }

if(usesParentPages)                      { postProcessFuncListPage.push("pp_pg_applyParentPage"); }
if(hasPageBackgroundImages)              { postProcessFuncListPage.push("pp_pg_assignBackground"); }
if(hasTables)                            { postProcessFuncListPage.push("pp_pg_moveTables"); }
if(hasImages)                            { postProcessFuncListPage.push("pp_pg_moveImages"); }

if(hasImages)                            { postProcessFuncListTextFrame.push("pp_tf_processInlineGraphics"); }
if(hasUnicodeLanguageScripts)            { postProcessFuncListTextFrame.push("pp_tf_updateLanguageStyles"); }
if(updateFirstParagraphStylePerChapter)  { postProcessFuncListTextFrame.push("pp_tf_updateFirstParagraphOfChapters"); }
if(addChapterNumberStyles)               { postProcessFuncListTextFrame.push("pp_tf_addChapterNumberStyle"); }

if(replaceNormalParagraphStyle)          { postProcessFuncListParagraph.push("pp_p_changeNormalParagraphStyle"); }
if(removeBlankLines)                     { postProcessFuncListParagraph.push("pp_p_removeBlankLines"); }




// ___ doc functions (pp_d_...) (doc)
function pp_d_updateCaptionsAndXRefsForDocument(doc) {
    if(runIfCustomVersionExists("pp_d_updateCaptionsAndXRefsForDocument", [ doc ]) !== null) { return; }

    for (var i = 0; i < doc.stories.length; i++) {
        var story = doc.stories[i];

        var tableAndFigureInfo = processTableAndFigureTags(doc, story);
        processXRefTags(story, tableAndFigureInfo);
    }
}

function pp_d_processTables(doc) {
    if(runIfCustomVersionExists("pp_d_processTables", [ doc ]) !== null) { return; }

    var textFrame = doc.pages[0].textFrames[0];
    app.findTextPreferences = NothingEnum.nothing;
    app.changeTextPreferences = NothingEnum.nothing;
    app.findTextPreferences.findWhat = "START_TABLE";
    
    var foundItems = doc.findText();

    // Process the items in reverse order
    for (var i = foundItems.length - 1; i >= 0; _i--) {
        var startMarker = foundItems[i];
        var startParagraph = startMarker.paragraphs[0];
        var paraContents = startParagraph.contents;
        
        if (paraContents.indexOf("START_TABLE") !== _1 && paraContents.indexOf("END_TABLE") !== _1) {
            paraContents = paraContents.replace("START_TABLE|", "").replace("|END_TABLE", ""); 
            
            startParagraph.contents = paraContents;
            var newTable = startParagraph.convertToTable("^", "|");
            scaleTableWidth(newTable);
        }
    }
    app.findTextPreferences = NothingEnum.nothing;
}

// CSV: Term,Identifier,Italic,Bold,Parent,See,SeeAlso,PageNumberOptions
function pp_d_processDocumentIndeces(doc) {
    if(runIfCustomVersionExists("pp_d_processDocumentIndeces", [ doc ]) !== null) { return; }

    clearExistingIndexEntries(doc);
    var counter = 1; // Counter to generate unique IDs if not provided.

    // Define character styles for index entries
    var indexStyle = doc.characterStyles.item(indexCharacterStyleName);
    var indexItalicStyle = doc.characterStyles.item(indexItalicCharacterStyleName);
    var indexBoldStyle = doc.characterStyles.item(indexBoldCharacterStyleName);
    var indexBoldItalicStyle = doc.characterStyles.item(indexBoldItalicCharacterStyleName);

    // Load CSV content
    var csvFile = File(indexCsvPath);
    csvFile.open('r');
    var csvContent = csvFile.read();
    csvFile.close();

    var lines = csvContent.split("\n");
    var headers = lines[0].split(",");
    var csvData = [];

    for (var i = 1; i < lines.length; i++) {
        var data = lines[i].split(",");
        var obj = {};
        for (var j = 0; j < data.length; j++) {
            obj[headers[j]] = data[j];
        }
        csvData.push(obj);
    }

    // Sort the csvData to ensure longer terms are processed first.
    csvData.sort(function(a, b) {
        return b["Term"].length - a["Term"].length;
    });
    
    var indexedRanges = [];

    // First Pass: Create all main entries.
    for (var i = 0; i < csvData.length; i++) {
        var row = csvData[i];
        var term = row["Term"];
        var identifier = row["Identifier"];

        var termRanges = getIndexedRanges(doc, term);
        if (!isOverlapping(termRanges, indexedRanges)) {
            // If identifier is not provided, auto_generate one.
            if (!identifier) {
                identifier = term.replace(/\s+/g, '') + "_" + counter;
                counter++;
            }

            // Create main index entry
            var mainEntry = doc.indexes[0].topics.itemByName(term);
            if (!mainEntry.isValid) {
                mainEntry = doc.indexes[0].topics.add(term);
                indexedRanges = indexedRanges.concat(termRanges);
            }

            // Apply character styles to the index entries based on CSV data
            if (row["Italic"] === "true" && row["Bold"] === "true") {
                mainEntry.appliedCharacterStyle = indexBoldItalicStyle;
            } else if (row["Italic"] === "true") {
                mainEntry.appliedCharacterStyle = indexItalicStyle;
            } else if (row["Bold"] === "true") {
                mainEntry.appliedCharacterStyle = indexBoldStyle;
            }
            else {
                mainEntry.appliedCharacterStyle = indexStyle;
            }
        }
    }

    // Second Pass: Handle Parents, See, See Also, and Page Number Options.
    for(var i = 0; i < csvData.length; i++) {
        var row = csvData[i];
        var term = row["Term"];
        var seeAlso = row["SeeAlso"];
        var see = row["See"];
        var pageNumberOption = row["PageNumberOptions"];
        var parent = row["Parent"];
        var mainEntry = doc.indexes[0].topics.itemByName(term);
        
        // If a 'Parent' column is used, find the parent topic and nest the main entry.
        if (parent) {
            var parentTopic = doc.indexes[0].topics.itemByName(parent);
            if (parentTopic.isValid) {
                mainEntry.move(LocationOptions.AT_END, parentTopic);
            }
        }

        // Handle Page Number Options.
        if (pageNumberOption === "Range") {
            mainEntry.pageNumberType = PageNumberOptions.PAGE_RANGE;
        } else {
            mainEntry.pageNumberType = PageNumberOptions.CURRENT_PAGE;
        }

        // Add 'See' or 'See Also' references if specified.
        if (see) {
            var seeEntry = doc.indexes[0].topics.itemByName(see);
            if (seeEntry.isValid) {
                mainEntry.crossReferenceType = CrossReferenceType.SEE;
                mainEntry.crossReference = seeEntry;
            }
        } else if (seeAlso) {
            var seeAlsoEntry = doc.indexes[0].topics.itemByName(seeAlso);
            if (seeAlsoEntry.isValid) {
                mainEntry.crossReferenceType = CrossReferenceType.SEE_ALSO;
                mainEntry.crossReference = seeAlsoEntry;
            }
        }
    }

    if (doc.indexes.length > 0) {
        doc.indexes[0].update();
    }   
}

function pp_d_clearParagraphStyleOverrides(doc) {
    if(runIfCustomVersionExists("pp_d_clearParagraphStyleOverrides", [ doc ]) !== null) { return; }

    for(var s = doc.stories.length - 1; s >= 0; s__) {
        s.clearOverrides(OverrideType.PARAGRAPH_ONLY);
    }
}

function pp_d_clearCharacterStyleOverrides(doc) {
    if(runIfCustomVersionExists("pp_d_clearCharacterStyleOverrides", [ doc ]) !== null) { return; }

    for(var s = doc.stories.length - 1; s >= 0; s__) {
        s.clearOverrides(OverrideType.CHARACTER_ONLY);
    }
}

function pp_d_deleteDefaultParent(doc) {
    if(runIfCustomVersionExists("pp_d_deleteDefaultParent", [ doc ]) !== null) { return; }

    try {
        var masterToBeDeleted = doc.masterSpreads.itemByName(defaultParentName);

        if(masterToBeDeleted !== null) {
            masterToBeDeleted.remove();
        }
    }
    catch(e) {
        logMessage("Error in pp_d_deleteDefaultParent: " + e);
    }
}


// ___ page functions (pp_pg_...) (doc, page)
function pp_pg_moveImages(doc, page) {
    if(runIfCustomVersionExists("pp_pg_moveImages", [ doc, page ]) !== null) { return; }
}

function p_pg_moveTables(doc, page) {
    if(runIfCustomVersionExists("pp_pg_moveTables", [ doc, page ]) !== null) { return; }
}

function pp_pg_assignBackground(doc, page) {
    if(runIfCustomVersionExists("pp_pg_assignBackground", [ doc, page ]) !== null) { return; }
}

function pp_pg_applyParentPage(doc, page) {
    if(runIfCustomVersionExists("pp_pg_applyParentPage", [ doc, page ]) !== null) { return; }
}


// ___ text frame functions (pp_tf_...) (doc, pageNum, textFrame)
function pp_tf_processInlineGraphics(doc, pageNum, textFrame) {
    if(runIfCustomVersionExists("pp_tf_processInlineGraphics", [ doc, pageNum, textFrame ]) !== null) { return; }

    processInlineGraphics(textFrame);
    processFirstRectangleGraphics(doc.pages[pageNum], textFrame);
}

function pp_tf_updateLanguageStyles(doc, pageNum, textFrame) {
    if(runIfCustomVersionExists("pp_tf_updateLanguageStyles", [ doc, pageNum, textFrame ]) !== null) { return; }

    var textFrame = page.textFrames[j];
    var words = textFrame.words;

    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        var wordContents = word.contents;

        for (var l = 0; l < languageRules.length; l++) {
            var rule = languageRules[l];
            var regex = rule.regex;
            var styleName = rule.styleName;
            var charStyle = app.activeDocument.characterStyles.item(styleName);

            if (wordContents.match(regex)) {
                applyCharacterStyleToSubset(word, charStyle);
            }
        }
    }
}

function pp_tf_updateFirstParagraphOfChapters(doc, pageNum, textFrame) {
    if(runIfCustomVersionExists("pp_tf_updateFirstParagraphOfChapters", [ doc, pageNum, textFrame ]) !== null) { return; }

    var chapterTitleStyle = doc.paragraphStyles.itemByName(chapterTitleParagraphStyleName);
    var chapterBodyStyle = doc.paragraphStyles.itemByName(chapterBodyParagraphStyleName);
    var chapterBodyFirstStyle = doc.paragraphStyles.itemByName(chapterBodyFirstParagraphStyleName);
    var titleFound = false;

    for (var p = 0; p < textFrame.paragraphs.length; p++) {
        logMessage("    p = " + p);
        
        if (textFrame.paragraphs[p].appliedParagraphStyle === chapterTitleStyle) {
            titleFound = true;
        }

        if(titleFound && textFrame.paragraphs[p].appliedParagraphStyle === chapterBodyStyle) {
            textFrame.paragraphs[p].appliedParagraphStyle = chapterBodyFirstStyle;
            titleFound = false;
        }
    }
}

function pp_tf_addChapterNumberStyle(doc, pageNum, textFrame) {
    if(runIfCustomVersionExists("pp_tf_addChapterNumberStyle", [ doc, pageNum, textFrame ]) !== null) { return; }

    var chapterTitleStyle = doc.paragraphStyles.itemByName(chapterTitleParagraphStyleName);
    var chapterTitleNumStyle = doc.paragraphStyles.itemByName(chapterTitleNumParagraphStyleName);
    var matched = false;

    for (var p = textFrame.paragraphs.length - 1; p >= 0; p__) {
        logMessage("    p = " + p);
        var refPara;              
        var refContents;
        var trimmedContents;

        currentStyle = textFrame.paragraphs[p].appliedParagraphStyle;

        if (lastParaValidTitle) {
            matched = true;
            var refValue = textFrame.paragraphs[p].contents;
            var trimRefValue = trim(textFrame.paragraphs[p].contents);

            if(isControlCodeString(refValue) || trimRefValue.length > 0) {
                if(p == 0) {

                    var line0 = textFrame.paragraphs[p].contents;
                    var line1 = textFrame.paragraphs[p + 1].contents;


                    textFrame.paragraphs[p + 1].contents = " " + "\r\r";
                    textFrame.paragraphs[p + 3].contents = line1;
                    textFrame.paragraphs[p + 2].appliedParagraphStyle = chapterTitleNumStyle;
                }
                else {
                    textFrame.paragraphs[p].contents += "\r";
                    textFrame.paragraphs[p + 1].appliedParagraphStyle = chapterTitleNumStyle;
                }
            }
            else {
                textFrame.paragraphs[p].appliedParagraphStyle = chapterTitleNumStyle;
            }
        }

        lastParaValidTitle = (currentStyle === chapterTitleStyle && trim(textFrame.paragraphs[p].contents).length > 0);

        if(p == 0 && lastParaValidTitle) {
            textFrame.paragraphs[p].contents = "\r" + textFrame.paragraphs[p].contents;
            textFrame.paragraphs[p].appliedParagraphStyle = chapterTitleNumStyle;
        }
    }
}


// ___ paragraph functions (pp_p_...) (doc, pageNum, textFrameNum, para)
function pp_p_removeBlankLines(doc, pageNum, textFrameNum, para) {
    if(runIfCustomVersionExists("pp_p_removeBlankLines", [ doc, pageNum, textFrameNum, para ]) !== null) { return; }

    if (para.contents.length == 0 && !isControlCodeString(para.contents)) {
        try {
            para.remove();
        }
        catch(e) {
            logMessage("Error in pp_p_removeBlankLines: " + e);
        }
    }    
}

function pp_p_changeNormalParagraphStyle(doc, pageNum, textFrameNum, para) {
    if(runIfCustomVersionExists("pp_p_changeNormalParagraphStyle", [ doc, pageNum, textFrameNum, para ]) !== null) { return; }

    var normalStyle = doc.paragraphStyles.itemByName(normalParagraphStyleName);
    var defaultStyle = doc.paragraphStyles.itemByName(defaultParagraphStyleName);
    
    if (para.appliedParagraphStyle == normalStyle) {
        try {
            para.appliedParagraphStyle = defaultStyle;
        }
        catch(e) {
            logMessage("Error in pp_p_changeNormalParagraphStyle: " + e);
        }
    }
}


// ___ character functions (pp_c_...) (doc, pageNum, textFrameNum, paraNum, chr)