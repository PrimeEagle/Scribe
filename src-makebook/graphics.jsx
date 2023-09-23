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
                width = graphicSizeScaling * width;
                height = graphicSizeScaling * height;
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