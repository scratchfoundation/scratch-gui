/* global Opal */

/**
 * Primitive class for RubyToBlocksConverter
 */
class Primitive {
    constructor (type, value, node) {
        this._type = type;
        this._value = value;
        this._node = node;

        if (this.type === 'hash') {
            this._hashCache = new Map();
            this._value.forEach((v, k) => {
                if (k instanceof Primitive) {
                    switch (k.type) {
                    case 'sym':
                        this._hashCache.set(`sym:${k.value}`, v);
                        break;
                    }
                }
            });
        }
    }

    get type () {
        return this._type;
    }

    get value () {
        return this._value;
    }

    get node () {
        return this._node;
    }

    toString () {
        if (this._type === 'const') {
            return `${this._value.scope === Opal.nil ? '' : this._value.scope.toString()}::${this._value.name}`;
        }
        return this._value.toString();
    }

    get length () {
        return this._value.length;
    }

    get size () {
        return this._value.size;
    }

    get (name) {
        return this._hashCache.get(name);
    }
}

export default Primitive;
