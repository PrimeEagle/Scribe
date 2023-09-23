#include "cfg-makebook/whlc-config.jsx"
#include "src-makebook/logging.jsx"
#include "src-makebook/util.jsx"
#include "src-makebook/word.jsx"
#include "src-makebook/indesign-util.jsx"
#include "src-makebook/project-info.jsx"
#include "src-makebook/tables.jsx"
#include "src-makebook/graphics.jsx"
#include "src-makebook/index.jsx"
#include "src-makebook/toc.jsx"
#include "src-makebook/languages.jsx"
#include "src-makebook/captions-cross-references.jsx"
#include "src-makebook/matter.jsx"
#include "src-makebook/post-process.jsx"
#include "src-makebook/import.jsx"
#include "src-makebook/validation.jsx"
#include "src-makebook/config.jsx"
// -----------------------------------------------------------------------------------------------------------------



function shouldProcessDoc(docName) {
    var docNum;

    try {
        docNum = Number(docName.substring(0, 3));
    } catch(e) {
        logMessage("ERROR: shouldProcessDoc error: " + e);
        return false;
    }

    if(containsValue(reservedDocs, docName) || docNum === 0 || docNum === 999 || (debug > 0 && debug != docNum)) {
        return false;
    }
    else {
        return true;
    }
}

function addDocsToBook(book) {
    addFrontAndBackMatterToBook(book);

    book.styleSourceDocument = getDocumentFromBook(book, styleSourceDocName);
    book.save();

    var wordDocs = getWordDocuments();

    for (var i = 0; i < wordDocs.length; i++) {
        var wordDoc = wordDocs[i];
        var newDocFile = new File(inDesignPath + convertWordToInDesignName(wordDoc.name));

        if (!shouldProcessDoc(newDocFile.name)) { continue; }

        if (!documentExistsInBook(book, newDocFile)) {
            var newDoc = app.documents.add();

            newDoc.save(newDocFile);
            newDoc.close(SaveOptions.YES);
            var bookIndex = book.bookContents.length - backMatterDocs.length - 1;
            book.bookContents.add(newDocFile, bookIndex);
        }
    }

    book.synchronize();
    book.save();
}

function getBook() {
    var newBookFile = File(inDesignPath + bookName);
    var newBook;

    try {
        if(!newBookFile.exists) {
            var newBook = copyDocAndOpen(inDesignPath + masterBookName, inDesignPath + bookName);
            
            addFrontAndBackMatterToBook(newBook);
            newBook.repaginationOption = RepaginateOption.NEXT_ODD_PAGE;

            newBook.save();
            newBook.close();
        }
        var newBook = app.open(newBookFile, false);

        return newBook;
    } catch(e) {
        alert("Failed to get book. Error '" + e + "'.");

        return null;
    }
}

function main() {
    if (loggingEnabled)                     { initializeLogging(); }
    if (validationEnabled)                  { validate(); }
    closeAll(); 
    
    var book = getBook();
    if(book === null)                       { return; }

    clearBook(book);
    addDocsToBook(book);
    importDocs(book);

    if (hasIndex)                           { processIndex(book); }
    if (hasTOC)                             { processTableOfContents(book); }
}


main();