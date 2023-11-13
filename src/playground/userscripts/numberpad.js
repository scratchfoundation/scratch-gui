module.exports = {
    func: function () {
        if (localStorage.getItem("numberpad") === "true") {
            const originalShowEditor_ = ScratchBlocks.FieldNumber.prototype.showEditor_;
            ScratchBlocks.FieldNumber.prototype.showEditor_ = function (...args) {
                this.useTouchInteraction_ = true;
                return originalShowEditor_.apply(this, args);
            };
        }
    }
}