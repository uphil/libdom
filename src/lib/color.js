'use strict';


import {
            string,
            contains,
            number
        } from "libcore";


import * as hexColor from "./color/hex.js";
import * as rgbColor from "./color/rgb.js";
import * as rgbaColor from "./color/rgba.js";
import * as hslColor from "./color/hsl.js";
import * as hslaColor from "./color/hsla.js";

import format from "./color/format.js";


var ERROR_SUBJECT = 'Invalid [subject] parameter.',
    COLOR_RE = /^(\#?|rgba?|hsla?)(\(([^\,]+(\,[^\,]+){2,3})\)|[a-f0-9]{3}|[a-f0-9]{6})$/,
    NUMBER_RE = /^[0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*$/,
    REMOVE_SPACES = /[ \r\n\t\s]+/g,
    TO_COLOR = {
        rgb: rgbColor,
        rgba: rgbaColor,
        hsl: hslColor,
        hsla: hslaColor,
        hex: hexColor
    };

function preParseValue(str) {
    if (typeof str === 'string') {
        str = str.replace(REMOVE_SPACES, '');
        if (COLOR_RE.test(str)) {
            return str;
        }
    }
    return null;
}

function parseColorStringType(str) {
    var list = TO_COLOR,
        m = str.match(COLOR_RE),
        type = m[1];

    var items, isHex, item;

    if (!contains(list, type)) {
        type = 'hex';
    }

    items = m[3];
    isHex = !items;

    // breakdown hex
    if (isHex) {
        items = m[2];

        // three digit
        if (items.length < 6) {
            item = items.charAt(2);
            items = ([items.charAt(0),
                        items.substring(0, 2),
                        items.charAt(1),
                        item,
                        item]).join('');
        }
    }
    else {
        items = items.split(',');
    }

    return [type, isHex, items];

}

export
    function parseColorType(subject) {

        if (!string(subject, true)) {
            throw new Error(ERROR_SUBJECT);
        }

        subject = preParseValue(subject);
        if (subject) {
            return parseColorStringType(subject) || null;
        }
        return null;
    }

export
    function parseColor(subject) {
        var F = format,
            formatPercent = F.PERCENT,
            formatNumber = F.NUMBER,
            formatHex = F.HEX,
            numberRe = NUMBER_RE;

        var parsed, c, l, item, items, itemizer,
            processor, type, isHex, toProcess;

        if (!string(subject, true)) {
            throw new Error(ERROR_SUBJECT);
        }

        subject = preParseValue(subject);
        parsed = subject && parseColorStringType(subject);

        if (parsed) {
            type = parsed[0];
            processor = TO_COLOR[type];
            itemizer = processor.itemize;

            toProcess = [];
            isHex = parsed[1];
            items = parsed[2];

            c = -1;
            if (isHex) {
                toProcess[3] = 100;
                l = 3;
            }
            else {
                l = items.length;
            }

            for (; l--;) {
                item = items[++c];
                if (isHex) {
                    item = items.substring(c * 2, c * 2 + 2);
                }
                else if (!numberRe.test(item)) {
                    return null;
                }

                toProcess[c] = itemizer(item,
                                        c,
                                        isHex ?
                                            formatHex :
                                            item.
                                                charAt(item.length -1) === '%' ?
                                                    formatPercent :
                                                    formatNumber);
            }

            // add type
            return processor.toInteger.apply(processor, toProcess);
        }

        return null;
    }

export
    function formatColor(colorValue, type) {
        var list = TO_COLOR;

        if (!number(colorValue) || colorValue < 0) {
            throw new Error("Invalid [colorValue] parameter.");
        }

        if (arguments.length < 2) {
            type = 'hex';
        }
        else if (!string(type)) {
            throw new Error("Invalid [type] parameter.");
        }

        if (!contains(list, type)) {
            return null;
        }

        colorValue = Math.round(colorValue);

        return list[type].toString(colorValue);
    }


