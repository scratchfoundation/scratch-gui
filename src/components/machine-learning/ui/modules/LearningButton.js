class LearningButton {
	constructor() {
        this.newModelElement = document.querySelector("#newmodel");
        this.newModelElement.addEventListener('click', this.showModel.bind(this));
        
        this.closeModelElement = document.querySelector('#close_newmodel');
        this.closeModelElement.addEventListener('click', this.closeModel.bind(this));

        this.createModelElement = document.querySelector("#newmodel_confirm");
        this.createModelElement.addEventListener("click", this.newModel.bind(this));

        // this.applyModelElement = document.querySelector("#applymodel");
        // this.applyModelElement.addEventListener('click', this.applyModel.bind(this));
    }
    showModel(){
        document.querySelector("#learningclass_model_count").setAttribute('value', 3);
        document.querySelector('#select_learnclass_model').style.display = "block"
    };
    closeModel(){document.querySelector('#select_learnclass_model').style.display = "none"};

    newModel(){
        // 新建模型
        
        let leftwidth = GLOBALS.learningSection.wiresLeft.width;
        let leftheight = GLOBALS.learningSection.wiresLeft.height;
        let rightwidth = GLOBALS.learningSection.wiresRight.width;
        let rightheight = GLOBALS.learningSection.wiresRight.height;
        GLOBALS.learningSection.wiresLeft.context.clearRect(0, 0, leftwidth, leftheight);
        GLOBALS.learningSection.wiresRight.context.clearRect(0, 0, rightwidth, rightheight);

        GLOBALS.learningSection.wiresLeft.element.removeChild(GLOBALS.learningSection.wiresLeft.element.querySelector("canvas"));
        GLOBALS.learningSection.wiresRight.element.removeChild(GLOBALS.learningSection.wiresRight.element.querySelector("canvas"));
        GLOBALS.outputSection.outputs.TextOutput.element.removeChild(GLOBALS.outputSection.outputs.TextOutput.element.querySelector('h1'));
        for(const lc_element of GLOBALS.learningSection.learningClasses){
            try{
                lc_element.resetLink.click();
            }catch(e){}
            
        }
        
        let learningclassmodelcount = Number(document.querySelector("#learningclass_model_count").value);
        if(!learningclassmodelcount||learningclassmodelcount<3){
            learningclassmodelcount = 3
        }else if(learningclassmodelcount>30){
            learningclassmodelcount = 30
        }
        // 对象销毁
        GLOBALS.browserUtils = null;
        // for(let i=0;i<GLOBALS.learningSection.learningClasses.length;i++){
        //     GLOBALS.learningSection.learningClasses[i] = null;
        // }
        GLOBALS.learningSection.learningClasses = [];
        GLOBALS.learningSection = null;
        GLOBALS.LearningContainer = null;
        GLOBALS.inputSection = null;
        GLOBALS.outputSection = null;
        GLOBALS.init = null;
        GLOBALS.clearing = false;
        GLOBALS.learnClassCount = learningclassmodelcount;
        init();
        this.closeModel();
    }
    applyModel(){
        // 使用模型
    }
}

import GLOBALS from './../../config.js';
import {init} from './../../index.jsx';

export default LearningButton;