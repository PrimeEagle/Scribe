/*
    TO DO
    create master pages
    move images during load
    resize images
    resize tables
    determine table styles during load
    move tables during load
    populate input config files
    epigraphs being on their own page
    style for footnotes and endnotes
    create all styles
    importing extra mater documents
*/


// debugging
var debug = 1;


// configure features
var loggingEnabled                       = true;
var validationEnabled                    = true;
var leftPageIsOdd                        = false;
var hasCrossReferences                   = true;
var hasUnicodeLanguageScripts            = true;
var hasImages                            = true;
var hasTables                            = true;
var hasPageBackgroundImages              = true;
var replaceNormalParagraphStyle          = true;
var clearImportedParagraphStyleOverrides = true;
var clearImportedCharacterStyleOverrides = true;
var deleteDefaultParentPages             = true;
var updateFirstParagraphStylePerChapter  = true;
var addChapterNumberStyles               = true;
var removeBlankLines                     = true;
var usesParentPages                      = true;
var removeDraftParagraphStyles           = true;
var resizeImages                         = true;
var resizeTables                         = true;


// configure book parts
var hasFrontCover                        = true;
var hasFrontEndPaper                     = true;
var hasHalfTitle                         = true;
var hasFrontispiece                      = true;
var hasTitlePage                         = true;
var hasCopyrightPage                     = true;
var hasDedication                        = true;
var hasEpigraph                          = true;
var hasListOfTables                      = true;
var hasListOfFigures                     = true;
var hasTOC                               = true;
var hasForeword                          = false;
var hasPreface                           = false;
var hasAcknowledgements                  = true;
var hasIntroduction                      = true;
var hasPrologue                          = false;
var hasEpilogue                          = false;
var hasOutro                             = false;
var hasAfterword                         = false;
var hasConclusion                        = false;
var hasPostscript                        = false;
var hasAppendix                          = true;
var hasAddendum                          = false;
var hasGlossary                          = false;
var hasBibliography                      = true;
var hasIndex                             = true;
var hasColophon                          = true;
var hasPostface                          = false;
var hasBackEndPaper                      = true;
var hasBackCover                         = true;


var logFileName                          = "D:\\makebook-whlc.log"


// input configuration file names
var cfgInputProjectInfoFileName          = "projectinfo.txt"
var cfgInputIndexFileName                = "index.csv";
var cfgInputMainTocFileName              = "tocMain.txt";
var cfgInputTableTocFileName             = "tocTables.txt";
var cfgInputIllustrationTocFileName      = "tocFigures.txt"; 


// parent page names
var defaultParentName                    = "A-Parent";
var noneParentName                       = "[None]";
var importParentName                     = "M-Chapter";
var frontCoverParentName                 = "F-FrontCover";
var frontEndPaperParentName              = "F-FrontEndPaper";
var halfTitleParentName                  = "F-HalfTitle";
var frontispieceParentName               = "F-Frontispiece";
var titlePageParentName                  = "F-TitlePage";
var copyrightPageParentName              = "F-Copyright";
var dedicationParentName                 = "FB-Matter";
var epigraphParentName                   = "M-Epigraph";
var listOfTablesParentName               = "F-Toc";
var listOfFiguresParentName              = "F-Toc";
var tableOfContentsParentName            = "F-Toc";
var forewordParentName                   = "";
var prefaceParentName                    = "";
var acknowledgementsParentName           = "FB-Matter";
var introductionParentName               = "FB-Matter";
var prologueParentName                   = "";
var epilogueParentName                   = "";
var outroParentName                      = "";
var afterwordParentName                  = "";
var conclusionParentName                 = "";
var postscriptParentName                 = "";
var appendixParentName                   = "B-Appendix";
var addendumParentName                   = "";
var glossaryParentName                   = "";
var bibliographyParentName               = "B-Bibliography";
var indexParentName                      = "B-Index";
var colophonParentName                   = "FB-Matter";
var postfaceParentName                   = "";
var backEndPaperParentName               = "B-BackEndPaper";
var backCoverParentName                  = "B-BackCover";


// page part names
var importTextFrameName                  = "chapter body";
var halfTitleTextFrameName               = "half title";
var titleTextFrameName                   = "title";
var subtitleTextFrameName                = "subtitle";
var authorTextFrameName                  = "author";
var editionTextFrameName                 = "edition";
var publisherTextFrameName               = "publisher";
var publicationLocationTextFrameName     = "publication location";
var publicationDateTextFrameName         = "publication date";
var copyrightDateTextFrameName           = "copyright date";
var copyrightBodyTextFrameName           = "copyright body";
var copyrightPublisherTextFrameName      = "copyright publisher";
var copyrightTextFrameName               = "copyright";
var copyrightEditionTextFrameName        = "copyright edition";
var tocBodyTextFrameName                 = "toc body";
var epigraphQuoteTextFrameName           = "epigraph quote";
var epigraphSourceTextFrameName          = "epigraph source";
var partTitleTextFrameName               = "part title";
var backgroundImageRectangleName         = "background image";


// book and document names
var bookName                             = "WHLC History Book.indb";
var masterBookName                       = "Master Book.indb"
var masterDocName                        = "000-0 - Master.indd";
// ----- front matter
var frontMatterDocName                   = "000-1 - Front Matter.indd";
var dedicationDocName                    = "000-2 - Dedication.indd";
var epigraphDocName                      = "000-3 - Epigraph.indd";
var listOfTablesDocName                  = "000-4 - List of Tables.indd";
var listOfFiguresDocName                 = "000-5 - List of Figures.indd";
var tocDocName                           = "000-6 - Table of Contents.indd";
var forewordDocName                      = "";
var prefaceDocName                       = "";
var acknowledgementsDocName              = "000-7 - Acknowledgements.indd";
var introductionDocName                  = "000-8 - Introduction.indd";
var prologueDocName                      = "";
// ----- back matter
var afterwordDocName                     = "999-1 - Afterword.indd";
var bibliographyDocName                  = "999-3 - Bibliography.indd";
var indexDocName                         = "999-4 - Index.indd";
var colophonDocName                      = "999-5 - Colophon.indd";
var backMatterDocName                    = "999-6 - Back Matter.indd";
var epilogueDocName                      = "";
var outroDocName                         = "";
var conclusionDocName                    = "";
var postscriptDocName                    = "";
var addendumDocName                      = "";
var glossaryDocName                      = "";
var postfaceDocName                      = "";
var appendixDocName                      = "999-2 - Appendix.indd";
// ----- style source
var styleSourceDocName                   = frontMatterDocName;


// paths
var wordPath                             = "D:\\Dropbox\\Writing\\Manuscripts\\WHLC History Book\\Splits (Word)\\";
var inDesignPath                         = "D:\\Dropbox\\Writing\\Manuscripts\\WHLC History Book\\Layout (InDesign)\\";
var imagePath                            = inDesignPath + "images\\";
var projectInfoPath                      = inDesignPath + cfgInputProjectInfoFileName;
var indexCsvPath                         = inDesignPath + cfgInputIndexFileName;
var mainTocPath                          = inDesignPath + cfgInputMainTocFileName;
var tablesTocPath                        = inDesignPath + cfgInputTableTocFileName;
var figuresTocPath                       = inDesignPath + cfgInputIllustrationTocFileName;


// paragraph style names
var tableCaptionParagraphStyleName       = "Table Caption";
var figureCaptionParagraphStyleName      = "Figure Caption";
var halfTitleParagraphStyleName          = "Half Title";
var titleParagraphStyleName              = "Title";
var authorParagraphStyleName             = "Author";
var publicationLocationParagraphStyleName= "Publication Location";
var publicationDateParagraphStyleName    = "Publication Date";
var publisherParagraphStyleName          = "Publisher";
var copyrightParagraphStyleName          = "Copyright";
var copyrightEditionParagraphStyleName   = "Copyright Edition";
var copyrightTextParagraphStyleName      = "Copyright Text";
var copyrightPublisherParagraphStyleName = "Copyright Publisher";
var frontMatterTitleParagraphStyleName   = "Front Matter Title";
var frontMatterTextParagraphStyleName    = "Front Matter Text";
var tocTitleParagraphStyleName           = "TOC Title";
var tocTextParagraphStyleName            = "TOC Text";
var epigraphQuoteParagraphStyleName      = "Epigraph Quote";
var epigraphSourceParagraphStyleName     = "Epigraph Source";
var partTitleParagraphStyleName          = "Part Title";
var chapterTitleParagraphStyleName       = "Chapter Title";
var chapterTitleNumParagraphStyleName    = "Chapter Title Number";
var chapterBodyParagraphStyleName        = "Chapter Body";
var chapterBodyFirstParagraphStyleName   = "Chapter Body First";
var normalParagraphStyleName             = "Normal";
var defaultParagraphStyleName            = chapterBodyParagraphStyleName;
var draftParagraphStyleNames             = [ "To Do" ];


// character style names
var xRefCharacterStyleName               = "XRef";
var chineseCharacterStyleName            = "Chinese";
var arabicCharacterStyleName             = "Arabic";
var japaneseCharacterStyleName           = "Japanese";
var greekCharacterStyleName              = "Greek";
var akkadianCharacterStyleName           = "Akkadian";
var turkicCharacterStyleName             = "Turkic";
var sanskritCharacterStyleName           = "Sanskrit";
var hebrewCharacterStyleName             = "Hebrew";
var mongolianCharacterStyleName          = "Mongolian";
var tibetanCharacterStyleName            = "Tibetan";
var koreanCharacterStyleName             = "Korean";
var indexBoldItalicCharacterStyleName    = "Index Bold Italic";
var indexItalicCharacterStyleName        = "Index Italic";
var indexBoldCharacterStyleName          = "Index Bold";
var indexCharacterStyleName              = "Index";


// TOC styles
var tocStandardStyleName                 = "TOC Contents";
var tocTableStyleName                    = "TOC Tables";
var tocFigureStyleName                   = "TOC Figures";


// Unicode language definitions
var languageRules                       = [
                                            {
                                                regex: /[\u4E00-\u9FFF]+/, // Chinese characters
                                                styleName: chineseCharacterStyleName,
                                            },
                                            {
                                                regex: /[\u0600-\u06FF\u0750-\u077F]+/, // Arabic characters
                                                styleName: arabicCharacterStyleName,
                                            },
                                            {
                                                regex: /[\u3040-\u309F\u30A0-\u30FF]+/, // Japanese characters
                                                styleName: japaneseCharacterStyleName,
                                            },
                                            {
                                                regex: /[\u0391-\u03C9]+/, // Greek characters
                                                styleName: greekCharacterStyleName,
                                            },
                                            {
                                                regex: /[\u1200-\u139F]+/, // Akkadian characters
                                                styleName: akkadianCharacterStyleName,
                                            },
                                            {
                                                regex: /[\u0400-\u04FF]+/, // Turkic characters
                                                styleName: turkicCharacterStyleName,
                                            },
                                            {
                                                regex: /[\u0900-\u097F]+/, // Sanskrit characters
                                                styleName: sanskritCharacterStyleName,
                                            },
                                            {
                                                regex: /[\u0590-\u05FF]+/, // Hebrew characters
                                                styleName: hebrewCharacterStyleName,
                                            },
                                            {
                                                regex: /[\u1800-\u18AF]+/, // Mongolian characters
                                                styleName: mongolianCharacterStyleName,
                                            },
                                            {
                                                regex: /[\u0F00-\u0FFF]+/, // Tibetan characters
                                                styleName: tibetanCharacterStyleName,
                                            },
                                            {
                                                regex: /[\uAC00-\uD7AF]+/, // Korean characters
                                                styleName: koreanCharacterStyleName,
                                            },
                                        ];


// table style names
var defaultTableStyleName                = "Default Table Style";


// cross reference formats
var crossReferenceFormatName             = "Cross Reference";


// titles
var listOfTablesTitle                   = "Tables";
var listOfFiguresTitle                  = "Illustrations";
var tocTitle                            = "Table of Contents";


// miscellaenous
var maxImageSizes                        = [
                                                { width: 45, height: 60 },
                                                { width: 90, height: 120 }
                                            ];
var maxWidth                             = 45;
var elements                             = [
                                                "earth",
                                                "metal",
                                                "water",
                                                "wood",
                                                "fire"
                                            ];
var lastImageNumber = {};
    lastImageNumber["earth"]             = "00";
    lastImageNumber["metal"]             = "00";
    lastImageNumber["water"]             = "00";
    lastImageNumber["wood"]              = "00";
    lastImageNumber["fire"]              = "00";
var lastElementIndex                     = -1;
var backgroundImageOpacity               = 20;
var elementImageExtension                = ".png";

// -------------------------------------------------------------------------------------------------------------------------

function pp_pg_assignBackground_custom(doc, page) {
    var newElementIndex = lastElementIndex + 1;

    if(newElementIndex > elements.length - 1) {
        newElementIndex = 0;
    }
    lastElementIndex = newElementIndex;

    var elementName = elements[newElementIndex];

    var imageNumber = randomPaddedInteger(1, 10, 2);
    while(lastImageNumber[elementName] == imageNumber) {
        imageNumber = randomPaddedInteger(1, 10, 2);
    }

    var side = isPageRight(page) ? "right" : "left";
    var fileName = imagePath + elementName + " " + imageNumber + "-" + side + elementImageExtension;
    var imageFile = File(fileName);

    if(!imageFile.exists) {
        fileName = imagePath + elementName + " " + imageNumber + elementImageExtension;
        imageFile = new File(fileName);
    }

    if(!imageFile.exists) {
        logMessage("ERROR: missing image file '" + fileName + "'");
        return;
    }

    var rect = overrideMasterPageItem(page, backgroundImageRectangleName);

    rect.place(imageFile);
    rect.fit(FitOptions.CONTENT_TO_FRAME);
    rect.transparencySettings.blendingSettings.opacity = backgroundImageOpacity;
}

function pp_pg_applyParentPage_custom(doc, page) {
    var alternateMasterPageName;
    var newMasterPageName = page.appliedMaster.name;
    var vi = visibleItems(textFrame);

    if(vi.graphics.length == 0 && vi.tables.length == 0) {
        return;
    }
    else if(vi.graphics.length > 0) {
        newMasterPageName += "-G" + vi.graphics.length;
    }
    else if(vi.tables.length > 0) {
        newMasterPageName += "-T" + vi.tables.length;
        var maxColumns = getMax(vi.tables);

        if(maxColumns > 4) {
            newMasterPageName += "-Span";
        }
    }

    if(newMasterPageName !== null) {
        var masterPage = doc.masterSpreads.itemByName(newMasterPageName);

        if(!masterPage){
            logMessage("ERROR: missing template '" + newMasterPageName + "'");
        }
        else {
            applyMasterSpread(doc, page, newMasterPageName);
        }
    }
}