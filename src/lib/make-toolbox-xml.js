const separator = '<sep gap="45"/>';

const top = `
    <category name="Top" colour="#FFFFFF" secondaryColour="#CCCCCC">
        <block type="event_whenflagclicked"/>
        <block type="event_whenkeypressed">
        </block>
        <block type="event_whenthisspriteclicked"/>
        <block type="motion_movesteps">
            <value name="STEPS">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="motion_turnright">
            <value name="DEGREES">
                <shadow type="math_number">
                    <field name="NUM">15</field>
                </shadow>
            </value>
        </block>
        <block type="motion_ifonedgebounce"/>
        <block type="sound_playuntildone">
            <value name="SOUND_MENU">
                <shadow type="sound_sounds_menu"/>
            </value>
        </block>
        <block type="looks_changeeffectby">
            <value name="CHANGE">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="control_repeat">
            <value name="TIMES">
                <shadow type="math_whole_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="control_wait">
            <value name="DURATION">
                <shadow type="math_positive_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        <block type="operator_random">
            <value name="FROM">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="TO">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
    </category>
`;

const motion = `
    <category name="Motion" colour="#4C97FF" secondaryColour="#3373CC">
        <block type="motion_movesteps">
            <value name="STEPS">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="motion_turnright">
            <value name="DEGREES">
                <shadow type="math_number">
                    <field name="NUM">15</field>
                </shadow>
            </value>
        </block>
        <block type="motion_turnleft">
            <value name="DEGREES">
                <shadow type="math_number">
                    <field name="NUM">15</field>
                </shadow>
            </value>
        </block>
        <block type="motion_pointindirection">
            <value name="DIRECTION">
                <shadow type="math_angle">
                    <field name="NUM">90</field>
                </shadow>
            </value>
        </block>
        <block type="motion_pointtowards">
            <value name="TOWARDS">
                <shadow type="motion_pointtowards_menu">
                </shadow>
            </value>
        </block>
        <block type="motion_gotoxy">
            <value name="X">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="motion_goto">
            <value name="TO">
                <shadow type="motion_goto_menu">
                </shadow>
            </value>
        </block>
        <block type="motion_glidesecstoxy">
            <value name="SECS">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="X">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="motion_glideto" id="motion_glideto">
            <value name="SECS">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="TO">
                <shadow type="motion_glideto_menu">
                </shadow>
            </value>
        </block>
        <block type="motion_changexby">
            <value name="DX">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="motion_setx">
            <value name="X">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="motion_changeyby">
            <value name="DY">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="motion_sety">
            <value name="Y">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="motion_ifonedgebounce"/>
        <block type="motion_setrotationstyle"/>
        <block type="motion_xposition"/>
        <block type="motion_yposition"/>
        <block type="motion_direction"/>
    </category>
`;

const looks = `
    <category name="Looks" colour="#9966FF" secondaryColour="#774DCB">
        <block type="looks_show"/>
        <block type="looks_hide"/>
        <block type="looks_switchcostumeto">
            <value name="COSTUME">
                <shadow type="looks_costume"/>
            </value>
        </block>
        <block type="looks_nextcostume"/>
        <block type="looks_nextbackdrop"/>
        <block type="looks_switchbackdropto">
            <value name="BACKDROP">
                <shadow type="looks_backdrops"/>
            </value>
        </block>
        <block type="looks_switchbackdroptoandwait">
            <value name="BACKDROP">
                <shadow type="looks_backdrops"/>
            </value>
        </block>
        <block type="looks_changeeffectby">
            <value name="CHANGE">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="looks_seteffectto">
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="looks_cleargraphiceffects"/>
        <block type="looks_changesizeby">
            <value name="CHANGE">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="looks_setsizeto">
            <value name="SIZE">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
        </block>
        <block type="looks_gotofront"/>
        <block type="looks_gobacklayers">
            <value name="NUM">
                <shadow type="math_integer">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        <block type="looks_costumeorder"/>
        <block type="looks_backdroporder"/>
        <block type="looks_backdropname"/>
        <block type="looks_size"/>
    </category>
`;

const sound = `
    <category name="Sound" colour="#D65CD6" secondaryColour="#BD42BD">
        <block type="sound_play">
            <value name="SOUND_MENU">
                <shadow type="sound_sounds_menu"/>
            </value>
        </block>
        <block type="sound_playuntildone">
            <value name="SOUND_MENU">
                <shadow type="sound_sounds_menu"/>
            </value>
        </block>
        <block type="sound_stopallsounds"/>
        <block type="sound_playdrumforbeats">
            <value name="DRUM">
                <shadow type="sound_drums_menu"/>
            </value>
            <value name="BEATS">
                <shadow type="math_number">
                    <field name="NUM">0.25</field>
                </shadow>
            </value>
        </block>
        <block type="sound_restforbeats">
            <value name="BEATS">
                <shadow type="math_number">
                    <field name="NUM">0.25</field>
                </shadow>
            </value>
        </block>
        <block type="sound_playnoteforbeats">
            <value name="NOTE">
                <shadow type="math_number">
                    <field name="NUM">60</field>
                </shadow>
            </value>
            <value name="BEATS">
                <shadow type="math_number">
                    <field name="NUM">0.5</field>
                </shadow>
            </value>
        </block>
        <block type="sound_setinstrumentto">
            <value name="INSTRUMENT">
                <shadow type="sound_instruments_menu"/>
            </value>
        </block>
        <block type="sound_changeeffectby">
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="sound_seteffectto">
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
        </block>
        <block type="sound_cleareffects"/>
        <block type="sound_changevolumeby">
            <value name="VOLUME">
                <shadow type="math_number">
                    <field name="NUM">-10</field>
                </shadow>
            </value>
        </block>
        <block type="sound_setvolumeto">
            <value name="VOLUME">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
        </block>
        <block type="sound_volume"/>
        <block type="sound_changetempoby">
            <value name="TEMPO">
                <shadow type="math_number">
                    <field name="NUM">20</field>
                </shadow>
            </value>
        </block>
        <block type="sound_settempotobpm">
            <value name="TEMPO">
                <shadow type="math_number">
                    <field name="NUM">60</field>
                </shadow>
            </value>
        </block>
        <block type="sound_tempo"/>
    </category>
`;

const events = `
    <category name="Events" colour="#FFD500" secondaryColour="#CC9900">
        <block type="event_whenflagclicked"/>
        <block type="event_whenkeypressed">
        </block>
        <block type="event_whenthisspriteclicked"/>
        <block type="event_whenbackdropswitchesto">
        </block>
        <block type="event_whengreaterthan">
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="event_whenbroadcastreceived">
        </block>
        <block type="event_broadcast">
            <value name="BROADCAST_OPTION">
                <shadow type="event_broadcast_menu"/>
            </value>
        </block>
        <block type="event_broadcastandwait">
            <value name="BROADCAST_OPTION">
                <shadow type="event_broadcast_menu"/>
            </value>
        </block>
    </category>
`;

const control = `
    <category name="Control" colour="#FFAB19" secondaryColour="#CF8B17">
        <block type="control_wait">
            <value name="DURATION">
                <shadow type="math_positive_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        <block type="control_repeat">
            <value name="TIMES">
                <shadow type="math_whole_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="control_forever"/>
        <block type="control_if"/>
        <block type="control_if_else"/>
        <block type="control_wait_until"/>
        <block type="control_repeat_until"/>
        <block type="control_stop"/>
        <block type="control_start_as_clone"/>
        <block type="control_create_clone_of">
            <value name="CLONE_OPTION">
                <shadow type="control_create_clone_of_menu"/>
            </value>
        </block>
        <block type="control_delete_this_clone"/>
    </category>
`;

const sensing = `
    <category name="Sensing" colour="#4CBFE6" secondaryColour="#2E8EB8">
        <block type="sensing_touchingobject">
            <value name="TOUCHINGOBJECTMENU">
                <shadow type="sensing_touchingobjectmenu"/>
            </value>
        </block>
        <block type="sensing_touchingcolor">
            <value name="COLOR">
                <shadow type="colour_picker"/>
            </value>
        </block>
        <block type="sensing_coloristouchingcolor">
            <value name="COLOR">
                <shadow type="colour_picker"/>
            </value>
            <value name="COLOR2">
                <shadow type="colour_picker"/>
            </value>
        </block>
        <block type="sensing_distanceto">
            <value name="DISTANCETOMENU">
                <shadow type="sensing_distancetomenu"/>
            </value>
        </block>
        <block type="sensing_keypressed">
            <value name="KEY_OPTION">
                <shadow type="sensing_keyoptions"/>
            </value>
        </block>
        <block type="sensing_mousedown"/>
        <block type="sensing_mousex"/>
        <block type="sensing_mousey"/>
        <block type="sensing_loudness"/>
        <block type="sensing_timer"/>
        <block type="sensing_resettimer"/>
        <block type="sensing_of">
            <value name="PROPERTY">
                <shadow type="sensing_of_property_menu"/>
            </value>
            <value name="OBJECT">
                <shadow type="sensing_of_object_menu"/>
            </value>
        </block>
        <block type="sensing_current">
            <value name="CURRENTMENU">
                <shadow type="sensing_currentmenu"/>
            </value>
        </block>
        <block type="sensing_dayssince2000"/>
    </category>
`;

const operators = `
    <category name="Operators" colour="#40BF4A" secondaryColour="#389438">
        <block type="operator_add">
            <value name="NUM1">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
            <value name="NUM2">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
        <block type="operator_subtract">
            <value name="NUM1">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
            <value name="NUM2">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
        <block type="operator_multiply">
            <value name="NUM1">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
            <value name="NUM2">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
        <block type="operator_divide">
            <value name="NUM1">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
            <value name="NUM2">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
        <block type="operator_random">
            <value name="FROM">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="TO">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="operator_lt">
            <value name="OPERAND1">
                <shadow type="text">
                    <field name="TEXT"/>
                </shadow>
            </value>
            <value name="OPERAND2">
                <shadow type="text">
                    <field name="TEXT"/>
                </shadow>
            </value>
        </block>
        <block type="operator_equals">
            <value name="OPERAND1">
                <shadow type="text">
                    <field name="TEXT"/>
                </shadow>
            </value>
            <value name="OPERAND2">
                <shadow type="text">
                    <field name="TEXT"/>
                </shadow>
            </value>
        </block>
        <block type="operator_gt">
            <value name="OPERAND1">
                <shadow type="text">
                    <field name="TEXT"/>
                </shadow>
            </value>
            <value name="OPERAND2">
                <shadow type="text">
                    <field name="TEXT"/>
                </shadow>
            </value>
        </block>
        <block type="operator_and"/>
        <block type="operator_or"/>
        <block type="operator_not"/>
        <block type="operator_join">
            <value name="STRING1">
                <shadow type="text">
                    <field name="TEXT">hello</field>
                </shadow>
            </value>
            <value name="STRING2">
                <shadow type="text">
                    <field name="TEXT">world</field>
                </shadow>
            </value>
        </block>
        <block type="operator_letter_of">
            <value name="LETTER">
                <shadow type="math_whole_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="STRING">
                <shadow type="text">
                    <field name="TEXT">world</field>
                </shadow>
            </value>
        </block>
        <block type="operator_length">
            <value name="STRING">
                <shadow type="text">
                    <field name="TEXT">world</field>
                </shadow>
            </value>
        </block>
        <block type="operator_mod">
            <value name="NUM1">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
            <value name="NUM2">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
        <block type="operator_round">
            <value name="NUM">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
        <block type="operator_mathop">
            <value name="NUM">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
    </category>
`;

const data = `
    <category name="Data" colour="#FF8C1A" secondaryColour="#DB6E00" custom="VARIABLE">
    </category>
`;

const xmlOpen = '<xml style="display: none">';
const xmlClose = '</xml>';

/**
 * @param {string?} categoriesXML - null for default toolbox, or an XML string with <category> elements.
 * @returns {string} - a ScratchBlocks-style XML document for the contents of the toolbox.
 */
const makeToolboxXML = function (categoriesXML) {
    const gap = [separator];

    const everything = [
        xmlOpen,
        top, gap,
        motion, gap,
        looks, gap,
        sound, gap,
        events, gap,
        control, gap,
        sensing, gap,
        operators, gap,
        data
    ];

    if (categoriesXML) {
        everything.push(gap, categoriesXML);
    }

    everything.push(xmlClose);

    return everything.join('\n');
};

export default makeToolboxXML;
