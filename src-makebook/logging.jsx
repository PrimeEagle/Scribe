var logFile;

if(loggingEnabled) {
    logFile = new File(logFileName);
    logFile.encoding = "UTF-8";
}

function logMessage(message) {
    logFile.open("a");
    logFile.writeln(message);
    logFile.close();
}

function logObjectProperties(obj) {
    for (var prop in obj) {
        try {
            logMessage(prop + ": " + obj[prop]);
        } catch (e) {
            logMessage("Could not access property: " + prop);
        }
    }
}

function initializeLogging() {
    if(logFile.exists) {
        logFile.remove();
    }
}