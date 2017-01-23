const bindAll = require('lodash.bindall');
const React = require('react');
const VM = require('scratch-vm');

const backdropLibraryContent = require('../lib/libraries/backdrops.json');
const LibaryComponent = require('../components/library/library.jsx');


class BackdropLibrary extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleItemSelect',
            'selectBackdropToImport',
            'importBackdrop'
        ]);
        this.props.vm.filepicker = null;
    }
    handleItemSelect (item) {
        const vmBackdrop = {
            skin: `https://cdn.assets.scratch.mit.edu/internalapi/asset/${item.md5}/get/`,
            name: item.name,
            rotationCenterX: item.info[0] && item.info[0] / 2,
            rotationCenterY: item.info[1] && item.info[1] / 2
        };
        if (item.info.length > 2) {
            vmBackdrop.bitmapResolution = item.info[2];
        }
        this.props.vm.addBackdrop(vmBackdrop);
    }
    
    selectBackdropToImport () {
        const vm = this.props.vm;
        const backdrop = this;
        const inp = document.createElement('input');
        const imageSelectedCallback = function () {
            document.body.removeChild(inp);
            vm.filePicker = null;
            for (let i = 0; i < inp.files.length; i++){
                backdrop.importBackdrop(inp.files[i], vm);
            }
        };
        if (vm.filePicker) {
            document.body.removeChild(vm.filePicker);
            vm.filePicker = null;
        }
        inp.type = 'file';
        inp.style.color = 'transparent';
        inp.style.backgroundColor = 'transparent';
        inp.style.border = 'none';
        inp.style.outline = 'none';
        inp.style.position = 'absolute';
        inp.style.top = '0px';
        inp.style.left = '0px';
        inp.style.width = '0px';
        inp.style.height = '0px';
        inp.style.display = 'none';
        inp.addEventListener('change', imageSelectedCallback, false);
        
        document.body.appendChild(inp);
        vm.filePicker = inp;
        inp.click();
    }

    importBackdrop (aFile, vm) {
        const frd = new FileReader();
        const pic = new Image();
        pic.onload = function () {
            const vmBackdrop = {
                skin: pic.src,
                name: aFile.name,
                rotationCenterX: pic.width / 2,
                rotationCenterY: pic.height / 2,
                bitmapResolution: 1
            };
            vm.addBackdrop(vmBackdrop);
        };
        frd.onloadend = function (e) {
            pic.src = e.target.result;
        };
        frd.readAsDataURL(aFile);
    }
    
    render () {
        return (
            <LibaryComponent
                data={backdropLibraryContent}
                import={this.selectBackdropToImport}
                showImport={this.props.visible}
                title="Backdrop Library"
                visible={this.props.visible}
                onItemSelected={this.handleItemSelect}
                onRequestClose={this.props.onRequestClose}
            />
        );
    }
}

BackdropLibrary.propTypes = {
    onRequestClose: React.PropTypes.func,
    visible: React.PropTypes.bool,
    vm: React.PropTypes.instanceOf(VM).isRequired
};

module.exports = BackdropLibrary;
