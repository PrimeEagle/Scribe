const punctuationSymbols                   = ["[", "!", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "\"", "-", ".", "\\", "/", ":", ";", "<", "=", ">", "?", "@", "[", "^", "_", "`", "{", "|", "}", "~", "]"];
const monthNames                           = ["January", "February", "March", "April", "May", "June",
                                                "July", "August", "September", "October", "November", "December"
                                            ];

function containsValue(array, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] === value) {
            return true;
        }
    }
    return false;
}

function countNonBMPChars(str, endIndex) {
    var count = 0;
    for (var i = 0; i < endIndex; i++) {
        if (/[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(str[i] + str[i+1])) {
            count++;
            i++; // Skip the next code unit
        }
    }
    return count;
}

function splitOnChars(inputString, charArray) {
    var specialChars = ['[', ']', '\\', '^', '$', '.', '|', '?', '*', '+', '(', ')'];
    var pattern = '[';

    for (var i = 0; i < charArray.length; i++) {
        var chr = charArray[i];
        if (containsValue(specialChars, chr)) {
            pattern += '\\' + chr;
        } else {
            pattern += chr;
        }
    }

    pattern += ']';

    var regex = new RegExp(pattern, 'g');

    return inputString.split(regex);
}

function getIndentationLevel(str) {
    var leadingWhitespace = str.match(/^(\s+)/);
    if (leadingWhitespace) {
        return leadingWhitespace[0].replace('\t', '   ').split('').length - 1; 
    } else {
        return 0;
    }
}

function trimLeft(str) {
    var start = 0;
    var end = str.length;
    
    while (start < end && str.charAt(start).match(/[\s]/)) {
        start++;
    }
    
    return str.slice(start, end);
}

function trimRight(str) {
    var start = 0;
    var end = str.length;

    while (end > start && str.charAt(end - 1).match(/[\s]/)) {
        end--;
    }
    
    return str.slice(start, end);
}

function trim(str) {
    return trimRight(trimLeft(str));
}


function trim(str) {
    return trimRight(trimLeft(str));
}

function delay(milliseconds) {
    var then = new Date().getTime() + milliseconds;
    while (new Date().getTime() < then) {
    }
}

function isIntersecting(rect1, rect2) {
    return (rect1[0] < rect2[2] &&
            rect1[2] > rect2[0] &&
            rect1[1] < rect2[3] &&
            rect1[3] > rect2[1]);
}

function randomPaddedInteger(min, max, charCount) {
    if (min > max) {
        var temp = min;
        min = max;
        max = temp;
    }

    var number = Math.floor(Math.random() * (max - min + 1)) + min;
    var numberStr = number.toString();

    while (numberStr.length < charCount) {
        numberStr = '0' + numberStr;
    }

    return numberStr;
}

function getMax(array) {
    var result = array[0];

    for (var i = 1; i < array.length; i++) {
        if(array[i] > result) {
            result = array[i];
        }
    }

    return result;
}

function getMin(array) {
    var result = array[0];

    for (var i = 1; i < array.length; i++) {
        if(array[i] < result) {
            result = array[i];
        }
    }

    return result;
}

function startsWith(str, text) {
    return (str.length >= text.length && str.substring(0, text.length) == text);
}

function endsWith(str, text) {
    return (str.length >= text.length && str.substring(str.length - text.length, text.length) == text);
}

function contains(str, text) {
    return str.indexOf(text) >= 0;
}

function isOdd(num) {
    return num % 2 != 0;
}

function isEven(num) {
    return !isOdd(num);
}