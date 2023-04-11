/**
 * __GENPAC__
 * Generated: __GENERATED__
 * GFWList Last-Modified: __MODIFIED__
 * GFWList From: __GFWLIST_FROM__
 */

var reject = '__REJECT__';
var proxy = '__PROXY__';
var rules = __RULES__;

var lastRule = '';

function FindProxyForURL(url, host) {
    for (var i = 0; i < rules.length; i++) {
        var ret = testURL(url, i);
        if (ret !== undefined)
            return ret;
    }
    return 'DIRECT';
}

function testURL(url, index) {
    for (var i = 0; i < rules[index].length; i++) {
        for (var j = 0; j < rules[index][i].length; j++) {
            lastRule = rules[index][i][j];
            if (i % 3 == 0 && regExpMatch(url, lastRule))
                return reject;
            if (i % 3 == 1 && regExpMatch(url, lastRule))
                return 'DIRECT';
            if (i % 3 == 2 && shExpMatch(url, lastRule))
                return proxy;
        }
    }
    lastRule = '';
}

function regExpMatch(url, pattern) {
    try {
        return new RegExp(pattern).test(url);
    } catch(ex) {
        return false;
    }
};
