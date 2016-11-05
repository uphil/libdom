'use strict';


var CORE = require("libcore"),
    SEPARATE_RE = /[ \r\n\t]*[ \r\n\t]+[ \r\n\t]*/,
    CAMEL_RE = /[^a-z]+[a-z]/ig,
    STYLIZE_RE = /^([Mm]oz|[Ww]ebkit|[Mm]s|[oO])[A-Z]/,
    HTML_ESCAPE_CHARS_RE = /[^\u0021-\u007e]|[\u003e\u003c\&\"\']/g,
    TEXTAREA = global.document.createElement('textarea'),
    EXPORTS = {
        camelize: camelize,
        stylize: stylize,
        addWord: addWord,
        removeWord: removeWord,
        
        xmlEncode: htmlescape,
        xmlDecode: htmlunescape,
        
        1001: "Invalid [name] parameter.",
        1011: "Invalid [handler] parameter.",
    
        1101: "Invalid DOM [element] parameter.",
        1102: "Invalid [dom] Object parameter.",
        1103: "Invalid DOM [node] parameter.",
        1104: "Invalid DOM [document] parameter.",
        
        1111: "Invalid CSS [selector] parameter.",
        1112: "Invalid tree traverse [callback] parameter.",
        
        1121: "Invalid DOM Element [config] parameter.",
        
        1131: "Invalid [observable] parameter.",
        1132: "Invalid Event [type] parameter.",
        1133: "Invalid Event [handler] parameter.",
        
        
        1141: "Invalid [style] Rule parameter.",
        //1142: "Invalid Colorset [type] parameter.",
        //1143: "Invalid [colorValue] integer parameter.",
        
        1151: "Invalid Animation [handler] parameter.",
        1152: "Invalid Animation [displacements] parameter.",
        
        2001: "Style Attribute manipulation is not supported",
        2002: "Computed style is not supported by this browser.",
        2003 : "CSS Selector query form DOM is not supported.",
        2004: "DOM position comparison is not supported.",
        2005: "DOM selection not supported.",
        2006: "CSS Opacity is not supported by this browser"
        
        
        
    };


function camelize(str) {
    return str.replace(CAMEL_RE, onCamelizeMatch);
}

function onCamelizeMatch(all) {
    return all[all.length - 1].toUpperCase();
}

function onStylizeMatch(all, match) {
    var found = match.toLowerCase(),
        len = found.length;
    
    if (found === 'moz') {
        found = 'Moz';
    }
    
    return found + all.substring(len, all.length);
}

function stylize(str) {
    return camelize(str).replace(STYLIZE_RE, onStylizeMatch);
}

function addWord(str, items) {
    var isString = CORE.string,
        c = -1,
        l = items.length;
    var cl, name;
    
    str = str.split(SEPARATE_RE);
    cl = str.length;
    for (; l--;) {
        name = items[++c];
        if (isString(name) && str.indexOf(name) === -1) {
            str[cl++] = name;
        }
    }
    
    return str.join(' ');
}

function removeWord(str, items) {
    var c = -1,
        l = items.length;
    var cl, total, name;
    
    str = str.split(SEPARATE_RE);
    total = str.length;
    
    for (; l--;) {
        name = items[++c];
        for (cl = total; cl--;) {
            if (name === str[cl]) {
                str.splice(cl, 1);
                total--;
            }
        }
    }
    
    return str.join(' ');    
}

function htmlunescape(str) {
    var textarea = TEXTAREA;
    var value = '';
    if (textarea) {
        textarea.innerHTML = str;
        value = textarea.value;
    }
    textarea = null;
    return value;
}

function htmlescape(str) {
    return str.replace(HTML_ESCAPE_CHARS_RE, htmlescapeCallback);
}

function htmlescapeCallback(chr) {
    var code = chr.charCodeAt(0).toString(16);
    var value;
    switch (code) {
    case '26': value = 'amp';
        break;
    case '22': value = 'quot';
        break;
    case '27': value = 'apos';
        break;
    case '3C':
    case '3c': value = 'lt';
        break;
    case '3E':
    case '3e': value = 'gt';
        break;
    default:
        value = '#x' + code;
    }
    return '&' + value + ';';
}


// register destructor
function onDestroy() {
    TEXTAREA = null;
}


CORE.register("libdom.event.global-destroy", onDestroy);

module.exports = EXPORTS;
