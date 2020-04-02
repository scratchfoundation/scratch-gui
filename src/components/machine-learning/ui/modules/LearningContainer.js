
class LearningContainer {
	constructor(element) {
        this.element = element;
        this.element.addEventListener('scroll', this.mouseWheel);
	}

    mouseWheel(e){
        const wiresLeft = GLOBALS.learningSection.wiresLeft;
        const wiresRight = GLOBALS.learningSection.wiresRight;
        wiresLeft.setOffsetValue(this.scrollTop);
        wiresLeft.render(1);
        wiresRight.setOffsetValue(this.scrollTop);
        wiresRight.render(1);
    }
}
import GLOBALS from './../../config.js';
export default LearningContainer;