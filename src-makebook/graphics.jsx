function getNewImageSize(width, height) {
    var newWidth = width;
    var newHeight = height;
    var result = { width: 0, height: 0 };
    var needsResize = true;
    var resizeIndex = -1;

    if(width <= maxImageSizes[0].width && height <= maxImageSizes[0].height) {
        needsResize = false;
        result.width = width;
        result.height = height;
    }

    if(needsResize) {
        alert(width);
        alert(height);
        alert(maxImageSizes[0].width);
        alert(maxImageSizes[0].height);
        alert(maxImageSizes[1].width);
        alert(maxImageSizes[1].height);
        for(var i = 1; maxImageSizes.length - 1; i++) {
            if( width > maxImageSizes[i - 1].width && height > maxImageSizes[i - 1].height &&
                width <= maxImageSizes[i].width && height <= maxImageSizes[i].height) {
                    resizeIndex = i - 1;
                    break;
            }

            if(i == maxImageSizes.length - 1) {
                resizeIndex = i;
            }
        }

        result.width = maxImageSizes[resizeIndex].width;
        result.height = maxImageSizes[resizeIndex].height;

        var scale;
        var wDiff = width - result.width;
        var hDiff = heiht - result.height;

        if(wDiff > hDiff) {
            scale = width / result.width;
        }
        else {
            scale = height / result.height;
        }

        result.width = scale * result.width;
        result.height = scale * result.height;
    }

    return result;
}

function addFramedGraphic(graphic, textFrame, insertionPoint) {
    var newGraphic = graphic.duplicate();
    var bounds = graphic.geometricBounds;
    var width = (bounds[3] - bounds[1])/newGraphic.horizontalScale;
    var height = (bounds[2] - bounds[0])/newGraphic.verticalScale;
    var newSize = { width: width, height: height };

    if(resizeImages) {
        newSize = getNewImageSize(width, height);

        newGraphic.resize(
            CoordinateSpaces.INNER_COORDINATES,
            AnchorPoint.CENTER_ANCHOR,
            ResizeMethods.REPLACING_CURRENT_DIMENSIONS_WITH,
            [newSize.width, newSize.height]
        );
    }

    var rectangle = textFrame.rectangles.add({
        geometricBounds: [0, 0, newSize.height, newSize.width]
    });

    rectangle.anchoredObjectSettings.anchoredPosition = AnchorPosition.inlinePosition;
    rectangle.anchoredObjectSettings.insertAnchoredObject(textFrame.parentStory.insertionPoints[insertionPoint]);
    
    rectangle.placeInto(newGraphic);
    rectangle.fit(FitOptions.CONTENT_TO_FRAME);

    return rectangle;
}

function processX(doc, page, textFrame) {
    for (var g = 0; g < textFrame.allGraphics.length; g++) {
        var graphic = textFrame.allGraphics[g];

        if(graphic.name.length > 0) {
            continue;
        }

        var parentType = graphic.parent.constructor.name;
        var insertionPoint;

        if (graphic.isValid && (parentType === "Character" || parentType === "Paragraph" || parentType === "TextFrame")) {
            insertionPoint = graphic.index;
            addFramedGraphic(graphic, textFrame, insertionPoint);
            graphic.remove();
        }
        else if(graphic.isValid && parentType === "Rectangle")  {
            insertionPoint = graphic.parent.index;
            addFramedGraphic(graphic, textFrame, insertionPoint);
            graphic.parent.remove();
        }
        else {
            alert("Unsupported graphic with parent type '" + parentType + "'.");
        }

        graphic.name = graphic.id.toString();
    }
}

function processInlineGraphics(textFrame) {
    for (var g = 0; g < textFrame.allGraphics.length; g++) {
        var graphic = textFrame.allGraphics[g];
        
        var maxWidth = 0.98* (textFrame.geometricBounds[3] - textFrame.geometricBounds[1]);
        var parentType = graphic.parent.constructor.name;

        if (graphic.isValid && (parentType === "Character" || parentType === "Paragraph" || parentType === "TextFrame")) {
            graphic.anchoredObjectSettings.anchoredPosition = AnchorPosition.ANCHORED;
            var graphicWidth = (bounds[3] - bounds[1])/graphic.horizontalScale;

            var bounds = graphic.geometricBounds;
            if (graphicWidth <= maxWidth) break; 

            try {
                graphic.resize(
                    CoordinateSpaces.INNER_COORDINATES,
                    AnchorPoint.CENTER_ANCHOR,
                    ResizeMethods.REPLACING_CURRENT_DIMENSIONS_WITH,
                    [maxWidth, bounds[3]]
                );

                graphic.anchoredObjectSettings.anchoredPosition = AnchorPosition.INLINE_POSITION;
            } catch (e) {
                logMessage("An error occurred for parentType '" + parentType + "': " + e.toString());
            }
        }
    }
}

function processFirstRectangleGraphics(page, textFrame) {
    for (var g = 0; g < textFrame.allGraphics.length; g++) {
        var graphic = textFrame.allGraphics[g];
        if(graphic.name.length > 0) {
            continue;
        }

        graphic.name = graphic.id.toString();
        

        var lastInsertionPoint = textFrame.insertionPoints[-1];

        if (graphic.parent.constructor.name === 'Rectangle') {        
            var duplicatedGraphic = graphic.duplicate(textFrame.parentPage);
            duplicatedGraphic.move([0, 0]);
            duplicatedGraphic.select();
            
            var width = duplicatedGraphic.geometricBounds[3] - duplicatedGraphic.geometricBounds[1];
            var height = duplicatedGraphic.geometricBounds[2] - duplicatedGraphic.geometricBounds[0];

            var resize = false;

            if(width/graphic.horizontalScale > maxWidth) {
                var ratio = maxWidth / width;
                width = width * ratio;
                height = height * ratio;
                resize = true;
            }

            if(height/graphic.verticalScale > maxHeight) {
                var ratio = maxHeight / height;
                width = width * ratio;
                height = height * ratio;
                resize = true;
            }

            var insertionPoint;
            if(resize) {
                insertionPoint = lastInsertionPoint;

                app.scriptPreferences.measurementUnit = MeasurementUnits.POINTS;
                duplicatedGraphic.absoluteHorizontalScale = 100;
                duplicatedGraphic.absoluteVerticalScale = 100;

                try {
                    duplicatedGraphic.resize(
                        CoordinateSpaces.PARENT_COORDINATES,
                        AnchorPoint.CENTER_ANCHOR,
                        ResizeMethods.REPLACING_CURRENT_DIMENSIONS_WITH,
                        [width, height]
                    );

                    app.cut();
            
                    insertionPoint.select();
                    app.paste();

                    graphic.parent.remove();
                } catch (err) {
                    logMessage("Resize failed: " + err.toString());
                }
            }
            else {
                duplicatedGraphic.remove();
                return;
            }
        }
    }   
}