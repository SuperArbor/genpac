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
        ret = testHost(host, i);
        if (ret != undefined)
            return ret;
    }
    return 'DIRECT';
}

function testHost(host, index) {
    for (var i = 0; i < rules[index].length; i++) {
        for (var j = 0; j < rules[index][i].length; j++) {
            lastRule = rules[index][i][j];
            if (i % 3 == 0 && (host == lastRule || host.endsWith('.' + lastRule)))
                return reject;
            if (i % 3 == 1 && (host == lastRule || host.endsWith('.' + lastRule)))
                return 'DIRECT';
            if (i % 3 == 2 && (host == lastRule || host.endsWith('.' + lastRule)))
                return proxy;
        }
    }
    lastRule = '';
}

// REF: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
if (!String.prototype.endsWith) {
    String.prototype.endsWith = function(searchString, position) {
        var subjectString = this.toString();
        if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
            position = subjectString.length;
        }
        position -= searchString.length;
        var lastIndex = subjectString.indexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
  }
}
