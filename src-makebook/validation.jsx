function validateFolder(path) {
    var folder = Folder(path);

    if(!folder.exists) {
        alert("Folder '" + path + ' was not found.');
    }
}

function validateFile(docName) {
    var file = File(docName);

    if(!file.exists) {
        alert("File '" + docName + ' was not found.');
    }
}

function validateParentPage(docName, parentName) {
    var doc = app.open(docName, false);
    var masterSpread = doc.masterSpreads.itemByName(parentName);

    if(masterSpread === null) {
        alert("Parent page '" + parentName + "' in document '" + doc.fullName + "' was not found.");
    }
}

function validateParagraphStyle(docName, styleName) {
    var doc = app.open(docName, false);
    var style = doc.paragraphStyles.itemByName(styleName);

    if(style === null) {
        alert("Paragraph style '" + styleName + "' in document '" + docName + "' was not found.");
    }
}

function validateCharacterStyle(docName, styleName) {
    var doc = app.open(docName, false);
    var style = doc.characterStyles.itemByName(styleName);

    if(style === null) {
        alert("Character style '" + styleName + "' in document '" + docName + "' was not found.");
    }
}

function validateTableStyle(docName, styleName) {
    var doc = app.open(docName, false);
    var style = doc.tableStyles.itemByName(styleName);

    if(style === null) {
        alert("Table style '" + styleName + "' in document '" + docName + "' was not found.");
    }
}

function validatePagePart(docName, parentName, partName) {
    var doc = app.open(docName, false);
    var parent = doc.masterSpreads.itemByName(parentName);

    var pageItems = parent.allPageItems;

    var found = false;
    for (var i = 0; i < pageItems.length; i++) {
        if (pageItems[i].name === partName) {
            found = true;
            break;
        }
    }

    if(!found) {
        alert("Page part '" + partName + "' on parent '" + parentName + "' in document '" + docName + "' was not found.");
    }
}

function validateFunction(funcName) {
    if (typeof this[funcName] !== "function") {
        alert("Function '" + funcName + "' was not found.");
    }
}

function validateArray(arr) {
    if(this[arr] === null || this[arr].length === 0) {
        alert("Array '" + arr + "' is missing or empty.");
    }
}

function validateString(str, strName) {
    if(str === null || str.length === 0) {
        alert("String '" + strName + "' is missing or empty.");
    }
}

function validateSettingsBothTrue(settingName1, settingName2) {
    if(this[settingName1] === true && this[settingName2] !== true) {
        alert("If setting '" + settingName1 + "' is true, then setting '" + settingName2 + "' must be true.");
    }
}

function validateSettingsBothFalse(settingNam1, settingName2) {
    if(this[settingName1] === false && this[settingName2] !== false) {
        alert("If setting '" + settingName1 + "' is true, then setting '" + settingName2 + "' must be true.");
    }
}

function validate(doc, styleName) {
    validateFolder(inDesignPath);
    validateFolder(wordPath);
    
    validateFile(inDesignPath + masterBookName);
    validateFile(inDesignPath + masterDocName);

    if(hasUnicodeLanguageScripts) {
        validateArray("languageRules");
    }

    validateSettingsBothTrue("hasImages", "resizeImages");
    validateSettingsBothTrue("hasTables", "resizeTables");

    if(hasPageBackgroundImages) {
        validateFolder(imagePath);
    }

    if(replaceNormalParagraphStyle) {
        validateString(normalParagraphStyleName, "normalParagraphStyleName");
        validateParagraphStyle(inDesignPath + masterDocName, defaultParagraphStyleName);
    }

    
    if(hasFrontCover) {
        validateFile(projectInfoPath);
        validatePagePart(inDesignPath + masterDocName, frontCoverParentName, titleTextFrameName);
    }

    if(hasFrontEndPaper) {
        validateParentPage(inDesignPath + masterDocName, frontEndPaperParentName);
    }

    if(hasHalfTitle) {
        validateFile(projectInfoPath);
        validateParentPage(inDesignPath + masterDocName, halfTitleParentName);
        validatePagePart(inDesignPath + masterDocName, halfTitleParentName, halfTitleTextFrameName);
    }

    if(hasFrontispiece) {
        validateParentPage(inDesignPath + masterDocName, frontispieceParentName);
    }

    if(hasTitlePage) {
        validateFile(projectInfoPath);
        validateParentPage(inDesignPath + masterDocName, titlePageParentName);
        validatePagePart(inDesignPath + masterDocName, titlePageParentName, titleTextFrameName);
        validatePagePart(inDesignPath + masterDocName, titlePageParentName, subtitleTextFrameName);
        validatePagePart(inDesignPath + masterDocName, titlePageParentName, authorTextFrameName);
        validatePagePart(inDesignPath + masterDocName, titlePageParentName, publicationLocationTextFrameName);
        validatePagePart(inDesignPath + masterDocName, titlePageParentName, publicationDateTextFrameName);
        validatePagePart(inDesignPath + masterDocName, titlePageParentName, publisherTextFrameName);
    }

    if(hasCopyrightPage) {
        validateFile(projectInfoPath);
        validateParentPage(inDesignPath + masterDocName, copyrightPageParentName);
        validatePagePart(inDesignPath + masterDocName, copyrightPageParentName, copyrightBodyTextFrameName);
        validatePagePart(inDesignPath + masterDocName, copyrightPageParentName, copyrightEditionTextFrameName);
        validatePagePart(inDesignPath + masterDocName, copyrightPageParentName, copyrightTextFrameName);
        validatePagePart(inDesignPath + masterDocName, copyrightPageParentName, copyrightPublisherTextFrameName);
    }

    if(hasDedication) {
        validateParentPage(inDesignPath + masterDocName, dedicationParentName);
    }

    if(hasEpigraph) {
        validateParentPage(inDesignPath + masterDocName, epigraphParentName);
    }

    if(hasListOfTables) {
        validateFile(tablesTocPath);
        validateParentPage(inDesignPath + masterDocName, listOfTablesParentName);
    }

    if(hasListOfFigures) {
        validateFile(figuresTocPath);
        validateParentPage(inDesignPath + masterDocName, listOfFiguresParentName);
    }

    if(hasTOC) {
        validateFile(mainTocPath);
        validateParentPage(inDesignPath + masterDocName, tableOfContentsParentName);
    }

    if(hasTOC || hasListOfFigures || hasListOfTables) {
        validateParagraphStyle(inDesignPath + masterDocName, tocTitleParagraphStyleName);
        validateParagraphStyle(inDesignPath + masterDocName, tocTextParagraphStyleName);
    }
    
    if(hasForeword) {
        validateParentPage(inDesignPath + masterDocName, forewordParentName);
    }

    if(hasPreface) {
        validateParentPage(inDesignPath + masterDocName, prefaceParentName);
    }

    if(hasAcknowledgements) {
        validateParentPage(inDesignPath + masterDocName, acknowledgementsParentName);
    }

    if(hasIntroduction) {
        validateParentPage(inDesignPath + masterDocName, introductionParentName);
    }

    if(hasPrologue) {
        validateParentPage(inDesignPath + masterDocName, prologueParentName);
    }

    if(hasEpilogue) {
        validateParentPage(inDesignPath + masterDocName, epilogueParentName);
    }

    if(hasOutro) {
        validateParentPage(inDesignPath + masterDocName, outroParentName);
    }

    if(hasAfterword) {
        validateParentPage(inDesignPath + masterDocName, afterwordParentName);
    }

    if(hasConclusion) {
        validateParentPage(inDesignPath + masterDocName, conclusionParentName);
    }

    if(hasPostscript) {
        validateParentPage(inDesignPath + masterDocName, postscriptParentName);
    }

    if(hasAppendix) {
        validateParentPage(inDesignPath + masterDocName, appendixParentName);
    }

    if(hasAddendum) {
        validateParentPage(inDesignPath + masterDocName, addendumParentName);
    }

    if(hasGlossary) {
        validateParentPage(inDesignPath + masterDocName, glossaryParentName);
    }

    if(hasBibliography) {
        validateParentPage(inDesignPath + masterDocName, bibliographyParentName);
    }

    if(hasIndex) {
        validateFile(indexCsvPath);
        validateParentPage(inDesignPath + masterDocName, indexParentName);
    }

    if(hasColophon) {
        validateParentPage(inDesignPath + masterDocName, colophonParentName);
    }

    if(hasPostface) {
        validateParentPage(inDesignPath + masterDocName, postfaceParentName);
    }

    if(hasBackEndPaper) {
        validateParentPage(inDesignPath + masterDocName, backEndPaperParentName);
    }

    if(hasBackCover) {
        validateParentPage(inDesignPath + masterDocName, backCoverParentName);
    }
}