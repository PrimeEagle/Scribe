/*
    TO DO
    create master pages
    move images during load
    determine table styles during load
    move tables during load
    populate input config files
    epigraphs being on their own page
    to do style not deleting in scrivener
    style for footnotes and endnotes
    split into page, paragraph, character postprocessing
    make configurable for other books
    create all styles
*/


// debugging
var debug = 1;


// input configuration file names
var cfgInputProjectInfoFileName          = "projectinfo.txt"
var cfgInputIndexFileName                = "index.csv";
var cfgInputMainTocFileName              = "tocMain.txt";
var cfgInputTableTocFileName             = "tocTables.txt";
var cfgInputIllustrationTocFileName      = "tocFigures.txt"; 


// parent page names
var defaultParentName                    = "A-Parent";
var noneParentName                       = "[None]";
var frontCoverParentName                 = "F-FrontCover";
var frontEndPaperParentName              = "F-FrontEndPaper";
var halfTitleParentName                  = "F-HalfTitle";
var frontispieceParentName               = "F-Frontispiece";
var titlePageParentName                  = "F-TitlePage";
var copyrightPageParentName              = "F-Copyright";
var matterParentName                     = "FB-Matter";
var tableOfContentsParentName            = "F-Toc";
var epigraphParentName                   = "M-Epigraph";
var partParentName                       = "M-Part";
var chapterParentName                    = "M-Chapter";
var appendixParentName                   = "B-Appendix";
var bibliographyParentName               = "B-Bibliography";
var indexParentName                      = "B-Index";
var backEndPaperParentName               = "B-BackEndPaper";
var backCoverParentName                  = "B-BackCover";


// page part names
var chapterTitleTextFrameName            = "chapter title"
var chapterBodyTextFrameName             = "chapter body";
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
var matterBodyTextFrameName              = "matter body";
var tocBodyTextFrameName                 = "toc body";
var epigraphQuoteTextFrameName           = "epigraph quote";
var epigraphSourceTextFrameName          = "epigraph source";
var partTitleTextFrameName               = "part title";
var backgroundImageRectangleName         = "background image";
var pageNumberImageRectangleName         = "page number image";


// book and document names
// ----- book
var bookName                             = "WHLC History Book.indb";
var masterBookName                       = "Master Book.indb"
// ----- master
var masterDocName                        = "000-0 - Master.indd";
// ----- front matter
var frontMatterDocName                   = "000-1 - Front Matter.indd";
var listOfTablesDocName                  = "000-2 - List of Tables.indd";
var listOfFiguresDocName                 = "000-3 - List of Figures.indd";
var tocDocName                           = "000-4 - Table of Contents.indd";
// ----- back matter
var afterwordDocName                     = "999-1 - Afterword.indd";
var bibliographyDocName                  = "999-2 - Bibliography.indd";
var indexDocName                         = "999-3 - Index.indd";
var colophonDocName                      = "999-4 - Colophon.indd";
var backMatterDocName                    = "999-5 - Back Matter.indd";
// ----- style source
var styleSourceDocName                   = frontMatterDocName;


// document lists
var frontMatterDocs = [ frontMatterDocName, listOfTablesDocName, listOfFiguresDocName, tocDocName ];
var backMatterDocs =  [ afterwordDocName, bibliographyDocName, indexDocName, colophonDocName, backMatterDocName ];
var reservedDocs =    [];

for(var i = 0; i < frontMatterDocs; i++) {
    reservedDocs.push(frontMatterDocs[i]);
}

for(var i = 0; i < backMatterDocs; i++) {
    reservedDocs.push(backMatterDocs[i]);
}


// paths
var wordPath                             = "D:\\Dropbox\\Writing\\Manuscripts\\WHLC History Book\\Splits (Word)\\";
var inDesignPath                         = "D:\\Dropbox\\Writing\\Manuscripts\\WHLC History Book\\Layout (InDesign)\\";
var imagePath       = inDesignPath + "images\\";
var projectInfoPath = inDesignPath + cfgInputProjectInfoFileName;
var indexCsvPath    = inDesignPath + cfgInputIndexFileName;
var mainTocPath     = inDesignPath + cfgInputMainTocFileName;
var tablesTocPath   = inDesignPath + cfgInputTableTocFileName;
var figuresTocPath  = inDesignPath + cfgInputIllustrationTocFileName;


// image file names
var evenPageNumberImageName              = "dragon, half circle.png"
var oddPageNumberImageName               = "phoenix, half circle.png"
var elementImageExtension                = ".png";


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


// table style names
var defaultTableStyleName                = "Default Table Style";


// cross reference formats
var crossReferenceFormatName             = "Cross Reference";


// elements
var elements                            = [
                                                "earth",
                                                "metal",
                                                "water",
                                                "wood",
                                                "fire"
                                        ];


// titles
var listOfTablesTitle                   = "Tables";
var listOfFiguresTitle                  = "Illustrations";
var tocTitle                            = "Table of Contents";


// language definitions
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
// logging
var logFileName                          = "D:\\log.txt"
var logFile = new File(logFileName);
logFile.encoding                         = "UTF-8";


// miscellaenous
var leftPageIsOdd                        = false;
var graphicSizeScaling                   = 6;
var maxWidth                             = 45;
var maxHeight                            = 60;
var punctuationSymbols                   = ["[", "!", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "\"", "-", ".", "\\", "/", ":", ";", "<", "=", ">", "?", "@", "[", "^", "_", "`", "{", "|", "}", "~", "]"];
var lastImageNumber = {};
    lastImageNumber["earth"]             = "00";
    lastImageNumber["metal"]             = "00";
    lastImageNumber["water"]             = "00";
    lastImageNumber["wood"]              = "00";
    lastImageNumber["fire"]              = "00";
var lastElementIndex                     = -1;
var backgroundImageOpacity               = 20;