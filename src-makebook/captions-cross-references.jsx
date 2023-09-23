function processTableAndFigureTags(doc, story) {
    var info = {};

    var tagTypes = ['Table', 'Figure'];
    for (var t = 0; t < tagTypes.length; t++) {
        var tagType = tagTypes[t];
        var regex = new RegExp("\\[" + tagType + ":(.+?):(.+?)(?::(.*?))?\\]", "g");
        var match;
    
        while (match = regex.exec(story.contents)) {
            var uniqueTag = match[1];
            var name = match[2];
            var description = match[3] || "";
    
            var paraStyleName = tagType === "Table" ? tableCaptionParagraphStyleName : figureCaptionParagraphStyleName;
            var para = story.insertionPoints.item(match.index).paragraphs[0];
            var paraStyle = para.appliedParagraphStyle;

            // Ensure the paragraph has the right style.
            // if (paraStyle.name !== paraStyleName) {
            //     logMessage("Skipped a " + tagType + " tag due to style mismatch: " + match[0]);
            //     continue;
            // }
    
            para.contents = para.contents.replace(match[0], name + (description ? " (" + description + ")" : ""));
            para.appliedParagraphStyle = doc.paragraphStyles.item(paraStyleName); // Apply the correct style

            var destination = app.activeDocument.hyperlinkTextDestinations.add(para.insertionPoints[0]);
            info[uniqueTag] = { type: tagType, name: name, description: description, anchor: destination };
        }
    }

    return info;
}

function determineCrossReferenceFormat(options) {
    options = options.sort();
    return options.join('-');
}

function processXRefTags(story, tableAndFigureInfo) {
    var xRefRegex = /\[XRef:.+?\]/g;
    var match;

    while (match = xRefRegex.exec(story.contents)) {
        var components = match[0].match(/\[XRef:(.+?):(.+?)\]/);
        if (components) {
            var uniqueTag = components[1];
            var options = components[2].split(',');

            var info = tableAndFigureInfo[uniqueTag];
            if (!info) {
                logMessage("Info for uniqueTag " + uniqueTag + " not found.");
                continue;
        }
        } else {
            logMessage("Failed to get a detailed match for: " + match[0]);
        }

        var endRange = match.index + match[0].length - 1;
        var sourceRange = story.characters.itemByRange(match.index, endRange);
        var crossRefSource;
        if (sourceRange.isValid) {
            var myCrossRefFormat = app.activeDocument.crossReferenceFormats.itemByName(determineCrossReferenceFormat(options));

            if (!myCrossRefFormat.isValid) {
                myCrossRefFormat = app.activeDocument.crossReferenceFormats.add({name:determineCrossReferenceFormat(options)});
            }

            crossRefSource = app.activeDocument.crossReferenceSources.add(sourceRange, {
                appliedFormat: myCrossRefFormat
            });
        }

        var hyperlink = app.activeDocument.hyperlinks.add(crossRefSource, info.anchor);
        var textRange = story.characters.itemByRange(match.index, match.index + match[0].length - 1);
        textRange.contents = ''; 
    }
}