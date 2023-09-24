// document lists
var frontMatterDocs = [];
var backMatterDocs =  [];
var reservedDocs =    [];

if(hasFrontCover)                           { frontMatterDocs.push(frontMatterDocName);      }
if(hasFrontEndPaper)                        { frontMatterDocs.push(frontMatterDocName);      }
if(hasHalfTitle)                            { frontMatterDocs.push(frontMatterDocName);      }
if(hasFrontispiece)                         { frontMatterDocs.push(frontMatterDocName);      }
if(hasTitlePage)                            { frontMatterDocs.push(frontMatterDocName);      }
if(hasCopyrightPage)                        { frontMatterDocs.push(frontMatterDocName);      }
if(hasDedication)                           { frontMatterDocs.push(dedicationDocName);       }
if(hasEpigraph)                             { frontMatterDocs.push(epigraphDocName);         }
if(hasListOfTables)                         { frontMatterDocs.push(listOfTablesDocName);     }
if(hasListOfFigures)                        { frontMatterDocs.push(listOfFiguresDocName);    }
if(hasTOC)                                  { frontMatterDocs.push(tocDocName);              }
if(hasForeword)                             { frontMatterDocs.push(forewordDocName);         }
if(hasPreface)                              { frontMatterDocs.push(prefaceDocName);          }
if(hasAcknowledgements)                     { frontMatterDocs.push(acknowledgementsDocName); }
if(hasIntroduction)                         { frontMatterDocs.push(introductionDocName);     }
if(hasPrologue)                             { frontMatterDocs.push(prologueDocName);         }
if(hasEpilogue)                             { backMatterDocs.push(epilogueDocName);          }
if(hasOutro)                                { backMatterDocs.push(outroDocName);             }
if(hasAfterword)                            { backMatterDocs.push(afterwordDocName);         }
if(hasConclusion)                           { backMatterDocs.push(conclusionDocName);        }
if(hasPostscript)                           { backMatterDocs.push(postscriptDocName);        }
if(hasAppendix)                             { backMatterDocs.push(appendixDocName);          }
if(hasAddendum)                             { backMatterDocs.push(addendumDocName);          }
if(hasGlossary)                             { backMatterDocs.push(glossaryDocName);          }
if(hasBibliography)                         { backMatterDocs.push(bibliographyDocName);      }
if(hasIndex)                                { backMatterDocs.push(indexDocName);             }
if(hasColophon)                             { backMatterDocs.push(colophonDocName);          }
if(hasPostface)                             { backMatterDocs.push(postfaceDocName);          }
if(hasBackEndPaper)                         { backMatterDocs.push(backMatterDocName);        }
if(hasBackCover)                            { backMatterDocs.push(backMatterDocName);        }

// remove duplicate front matter docs
var tempArray = [];
for(var i = 0; i < frontMatterDocs.length; i++) {
    if(!containsValue(tempArray, frontMatterDocs[i])) {
        tempArray.push(frontMatterDocs[i]);
    }
}

// populate front matter array
frontMatterDocs = [];
for(var i = 0; i < tempArray.length; i++) {
    frontMatterDocs.push(tempArray[i]);
}

// remove duplicate back matter docs
tempArray = [];
for(var i = 0; i < backMatterDocs.length; i++) {
    if(!containsValue(tempArray, backMatterDocs[i])) {
        tempArray.push(backMatterDocs[i]);
    }
}

// populate back matter array
backMatterDocs = [];
for(var i = 0; i < tempArray.length; i++) {
    backMatterDocs.push(tempArray[i]);
}

// add front matter docs to reserved docs
for(var i = 0; i < frontMatterDocs.length; i++) {
    reservedDocs.push(frontMatterDocs[i]);
}

// add back matter docs to reserved docs
for(var i = 0; i < backMatterDocs.length; i++) {
    reservedDocs.push(backMatterDocs[i]);
}