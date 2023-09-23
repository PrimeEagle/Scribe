function readProjectInfo() {
    var piFile = File(projectInfoPath);
    piFile.open('r');
    var piContent = piFile.read();
    piFile.close();

    var lines = piContent.split("\n");
      var info = new getProjectInfoData(lines);
    info = replaceTags(info);

    return info;
}

function getProjectInfoData(lines) {
    for(var i = 0; i < lines.length; i++) {
        var line = trim(lines[i]);

        if(line.indexOf("Title:") == 0) {
            this.title = getProjectInfoValue(line);
        }
        else if(line.indexOf("Subtitle") == 0) {
            this.subtitle = getProjectInfoValue(line);
        }
        else if(line.indexOf("Author") == 0) {
            this.author = getProjectInfoValue(line);
        }
        else if(line.indexOf("Edition") == 0) {
            this.edition = getProjectInfoValue(line);
        }
        else if(line.indexOf("Publisher") == 0) {
            this.publisher = getProjectInfoValue(line);
        }
        else if(line.indexOf("Publication Location") == 0) {
            this.publicationLocation = getProjectInfoValue(line);
        }
        else if(line.indexOf("Publication Date") == 0) {
            this.publicationDate = getProjectInfoValue(line);
        }
        else if(line.indexOf("Copyright Date") == 0) {
            this.copyrightDate = getProjectInfoValue(line);
        }
        else if(line.indexOf("Copyright Text") == 0) {
            this.copyrightText = getProjectInfoValue(line);
        }
    }
}

function getProjectInfoValue(str) {
    var startIdx = str.indexOf(":") + 1;
    var value = str.substring(startIdx);
    value = trim(value);

    return value;
}

function replaceTags(info) {
    info.title = replaceTag(info.title, info);
    info.subtitle = replaceTag(info.subtitle, info);
    info.author = replaceTag(info.author, info);
    info.edition = replaceTag(info.edition, info);
    info.publisher = replaceTag(info.publisher, info);
    info.publicationLocation = replaceTag(info.publicationLocation, info);
    info.publicationDate = replaceTag(info.publicationDate, info);
    info.copyrightDate = replaceTag(info.copyrightDate, info);
    info.copyrightText = replaceTag(info.copyrightText, info);

    return info;
}

function replaceTag(str, info) {
    var curDate = new Date();

    str = str.replace("[title]", info.title);
    str = str.replace("[subtitle]", info.subtitle);
    str = str.replace("[author]", info.author);
    str = str.replace("[edition]", info.edition);
    str = str.replace("[publisher]", info.publisher);
    str = str.replace("[publicationlocation]", info.publicationLocation);
    str = str.replace("[publicationdate]", info.publicationDate);
    str = str.replace("[copyrightdate]", info.copyrightDate);
    str = str.replace("[copyrighttext]", info.copyrightText);
    str = str.replace("[curdate]", (monthNames[curDate.getMonth()] + " " + curDate.getDay().toString() + ", " + curDate.getFullYear().toString()));
    str = str.replace("[curyear]", curDate.getFullYear().toString());

    return str;
}