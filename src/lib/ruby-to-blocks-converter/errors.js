/**
 * Exception class for RubyToBlocksConverter
 */
class RubyToBlocksConverterError {
    constructor (node, message) {
        this.node = node;
        this.message = message;
    }
}

export {
    RubyToBlocksConverterError
};
