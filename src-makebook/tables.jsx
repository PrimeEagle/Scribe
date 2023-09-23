function clearTableStyles(doc, table) {
    table.appliedTableStyle = doc.tableStyles.item(defaultTableStyleName);
    for (var rowIndex = 0; rowIndex < table.rows.length; rowIndex++) {
        for (var cellIndex = 0; cellIndex < table.rows[rowIndex].cells.length; cellIndex++) {
            table.rows[rowIndex].cells[cellIndex].appliedCellStyle = doc.cellStyles.item("[None]");
        }
    }
}

function scaleTableWidth(table) {
    var currentWidth = 0;
    for (var j = 0; j < table.columnCount; j++) {
        currentWidth += table.columns[j].width;
    }
    
    if (currentWidth > maxWidth) {
        var scalingFactor = maxWidth / currentWidth;
        for (var j = 0; j < table.columnCount; j++) {
            table.columns[j].width *= scalingFactor;
        }
    }
}