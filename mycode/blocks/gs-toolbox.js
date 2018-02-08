/*
 * toolbox 菜单
 *
 * * @example:
 * import GsToolbox from '../../mycode/blocks/gs-toolbox';
 * const GsToolbox = require('../mycode/blocks/gs-toolbox');
 * GsToolbox.robotToolbox(isStage, targetId,blockSeparator,categorySeparator);
 *
 * 主要用在：src/lib/make-toolbox-xml.js
 * */
import gsblocks from './gs-blocks'
import lan from '../../mycode/language/Local'

export default new class GsToolbox {
    constructor() {
        //this.loadblock();
        //console.log('ScratchBlocks',ScratchBlocks);
        gsblocks.init();
    }

    robotToolbox(isStage, targetId, blockSeparator, categorySeparator) {
    return `
            <category name="${lan.data.gui_toolbox_category_gsrobot}" colour="#47a970" secondaryColour="#3373CC">           
           
            	<block type="gs_motion_move" id="gs_motion_move">
      <value name="LEFT">
      <shadow type="math_number">
      <field name="NUM">0</field>
      </shadow>
      </value>
      <value name="RIGHT">
      <shadow type="math_number">
      <field name="NUM">0</field>
      </shadow>
      </value>
      </block>
      <block type="gs_motion_move_2" id="gs_motion_move_2">
      <value name="SPEED">
      <shadow type="math_number">
      <field name="NUM">0</field>
      </shadow>
      </value>
      </block>
      <block type="gs_motion_move_3" id="gs_motion_move_3">
      <value name="SPEED">
      <shadow type="math_number">
      <field name="NUM">0</field>
      </shadow>
      </value>
      </block>
      <block type="gs_motion_steering_engine" id="gs_motion_steering_engine">
      <value name="s1">
      <shadow type="math_number">
      <field name="NUM">0</field>
      </shadow>
      </value>
      <value name="s2">
      <shadow type="math_number">
      <field name="NUM">0</field>
      </shadow>
      </value>
      </block>
      <block type="gs_light_change" id="gs_light_change">
      </block>
      <block type="gs_light_change_2" id="gs_light_change">
      <value name="RED">
      <shadow type="math_number">
      <field name="NUM">205</field>
      </shadow>
      </value>
      <value name="GREEN">
      <shadow type="math_number">
      <field name="NUM">92</field>
      </shadow>
      </value>
      <value name="BLUE">
      <shadow type="math_number">
      <field name="NUM">92</field>
      </shadow>
      </value>
      </block>
      <block type="gs_light_change_3" id="gs_light_change_3">
      <value name="COLOR">
      <shadow type="colour_picker">
      </shadow>
      </value>
      </block>
      <block type="gs_matrix_change_4" id="gs_matrix_change_4">
      <field name="PORT">7</field>
      </block>
      <block type="gs_matrix_change_5" id="gs_matrix_change_5">
      <field name="PORT">7</field>
      </block>
      <block type="gs_matrix_change_6" id="gs_matrix_change_6">
      <field name="PORT">7</field>
      </block>
      <block type="gs_matrix_change_7" id="gs_matrix_change_7">
      <field name="PORT">7</field>
      </block>
      <block type="gs_matrix_change_8" id="gs_matrix_change_8">
      <field name="PORT">7</field>
      </block>
      <block type="gs_light_ultrasonic_2" id="gs_light_ultrasonic_2">
      <field name="PORT">6</field>
      <value name="RED">
      <shadow type="math_number">
      <field name="NUM">205</field>
      </shadow>
      </value>
      <value name="GREEN">
      <shadow type="math_number">
      <field name="NUM">92</field>
      </shadow>
      </value>
      <value name="BLUE">
      <shadow type="math_number">
      <field name="NUM">92</field>
      </shadow>
      </value>
      </block>
      <block type="gs_light_ultrasonic_3" id="gs_light_ultrasonic_3">
      <field name="PORT">6</field>
      <value name="COLOR">
      <shadow type="colour_picker">
      </shadow>
      </value>
      </block>
      <block type="gs_light_ultrasonic_4" id="gs_light_ultrasonic_4">
      <field name="PORT">6</field>
      </block>
      <block type="gs_sound_play" id="gs_sound_play">
      </block>
      <block type="gs_sensing_distanceto" id="gs_sensing_distanceto">
      <field name="PORT">6</field>
      </block>
      <block type="gs_sensing_linePatrolValue" id="gs_sensing_linePatrolValue">
      <field name="PORT">2</field>
      </block>
      <block type="gs_sensing_mousedown" id="gs_sensing_mousedown"></block>
            </category>
            `;
};


}

//module.exports = new GsToolbox();

//export default GsToolbox;
