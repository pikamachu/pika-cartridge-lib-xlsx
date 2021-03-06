'use strict';

var DataReader = require('./dataReader');

function Uint8ArrayReader(data) {
    if (data) {
        this.data = data;
        this.length = this.data.length;
        this.index = 0;
    }
}

Uint8ArrayReader.prototype = new DataReader();

Uint8ArrayReader.prototype.byteAt = function(i) {
    return this.data[i];
};

Uint8ArrayReader.prototype.lastIndexOfSignature = function(sig) {
    var sig0 = sig.charCodeAt(0),
        sig1 = sig.charCodeAt(1),
        sig2 = sig.charCodeAt(2),
        sig3 = sig.charCodeAt(3);

    for (var i = this.length - 4; i >= 0; --i) {
        if (
            this.data[i] === sig0 &&
            this.data[i + 1] === sig1 &&
            this.data[i + 2] === sig2 &&
            this.data[i + 3] === sig3
        ) {
            return i;
        }
    }

    return -1;
};

Uint8ArrayReader.prototype.readData = function(size) {
    this.checkOffset(size);

    if (size === 0) {
        return new Uint8Array(0);
    }

    var result = this.data.subarray(this.index, this.index + size);
    this.index += size;
    return result;
};

module.exports = Uint8ArrayReader;
