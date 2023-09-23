function getWordDocuments() {
    var wordDocFolder = Folder(wordPath);

    var files = wordDocFolder.getFiles(function(file) {
        return (file instanceof File && file.name.match(/\.[dD][oO][cC][xX]$/));
    });

    return files;
}

function convertWordToInDesignName(name) {
    var lastDotPosition = name.lastIndexOf(".");
    if (lastDotPosition !== -1) {
        var docName = name.substring(0, lastDotPosition);
    } else {
        var docName = name;
    }
    docName = docName.replace("-WHLC%20History%20Book-", " - ") + ".indd";

    return docName;
}

function convertInDesignToWordName(name) {
    var lastDotPosition = name.lastIndexOf(".");
    if (lastDotPosition !== -1) {
        var docName = name.substring(0, lastDotPosition);
    } else {
        var docName = name;
    }
    docName = docName.replace(" - ", "-WHLC History Book-") + ".docx";

    return docName;
}