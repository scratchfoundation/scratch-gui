import languageZh from './all/zh'
import languageEn from './all/en'
import enums from '../enums'

/**
 * 单实例：
 * @example
 * import lan from '../mycode/language/Local'
 * 取值 {lan.data.Home_Menu_1}
 * 取值：LOCAL.Home_Menu_1
 *
 */
class Local {
    constructor() {
        this.type = enums.language.zh;
        this.data = languageZh.data;
        try {
            //this.checkLanguage();
            this.InitCheck();
            //this.set(1);
        } catch (e) {
            console.error(e);
        }
    }

    init(){

    }

    /*
     if (language.indexOf('en') > -1) document.location.href = 'english.htm';
     else if (language.indexOf('nl') > -1) document.location.href = 'dutch.htm';
     else if (language.indexOf('fr') > -1) document.location.href = 'french.htm';
     else if (language.indexOf('de') > -1) document.location.href = 'german.htm';
     else if (language.indexOf('ja') > -1) document.location.href = 'japanese.htm';
     else if (language.indexOf('it') > -1) document.location.href = 'italian.htm';
     else if (language.indexOf('pt') > -1) document.location.href = 'portuguese.htm';
     else if (language.indexOf('es') > -1) document.location.href = 'Spanish.htm';
     else if (language.indexOf('sv') > -1) document.location.href = 'swedish.htm';
     else if (language.indexOf('zh') > -1) document.location.href = 'chinese.htm';
     */
    checkLanguage() {
        let language = 'en';
        try {
            //language = (navigator.languages==undefined)?navigator.language:navigator.languages[0];
            language = navigator.browserLanguage ? navigator.browserLanguage : navigator.language;
            //console.log('language='+language);
        } catch (e) {
            console.error(e);
        }
        let type = 1;
        if (language.indexOf('en') > -1) {
            type = 1;//english
        }
        else if (language.indexOf('zh') > -1) {
            type = 2; //chinese
        }
        else {
            type = 1;
        }
        this.set(type);
    }

    set(type) {
        this.type = type;
        switch (type) {
            case 2:
                this.data = languageZh.data;
                break;
            case 1:
                this.data = languageEn.data;
                break;
            default:
                this.type = 1;
                this.data = languageEn.data;
                break;
        }
        try {
            LOCAL = this.data;
            //console.log('load my language ---------:'+ this.type);
        } catch (error) {
            console.error(error);
        }
    }

    get() {
        return this.data;
    }

    getType() {
        return this.type;
    }

    InitCheck(){
        var type = Number(this.getData());
        //console.log('InitCheck:'+ type);
        if(type == null || type == -1 || type == 0 ){
            this.checkLanguage();
        }else{
            this.set(type);
        }
    }

    setData(type){
        try{
            localStorage.setItem('gslanguage', JSON.stringify(type));
        }
        catch (error){
            console.error(error);
        }
    }

    getData(){
        try{
            return JSON.parse(localStorage.getItem('gslanguage'));
        }catch(error){
            console.error(error);
        }
        return -1 ;
    }
}

export default new Local();
