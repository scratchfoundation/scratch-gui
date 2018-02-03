//import myrequest form 'request'
import Cast from '../utils/Cast'
import Robot from './robot/Robot'

export default new class MyAi {
    constructor() {
        try {
            this.loadApp();
            this.loadLib();
            //console.log('MyAi loading')
        } catch (error) {
            console.error(error);
        }
    }

    init(){

    }

    loadApp(){
        //SEP.Node.request = myrequest;
    }

    loadLib(){
        //-------------------------- step 1
        //config
        //百度和图灵的账号密码  账号：15989421064,pwd:Mokuai520

        var baidu_APP_ID = "10628043";
        var baidu_API_KEY = "zQ7wxOiwyZrCItthLB8Yi8ma";
        var baidu_SECRET_KEY = "4296bb9dbf8ddd2c46d60687638a4a51";

        var tuling_key = 'a38ea18f16ea4fc49b11adfe1fab0b8f'
        var tuling_api = 'http://www.tuling123.com/openapi/api';
        var sampleRate = 8000 ;//16000,//录音频率
        var request = SEP.Node.request ;//require('request');

        var client ;
        var dir ;
        var fs ;

        function init() {
            dir = SEP.ele.dir;// path.join(__dirname, '/../');
            fs = SEP.Node.fs ;//require('fs');

            var baidu_AipSpeechClient = SEP.Node.baiduAi ;// require(dir+"/node/baidu-ai").speech;
            client = new baidu_AipSpeechClient(baidu_APP_ID, baidu_API_KEY, baidu_SECRET_KEY);
            //const  path = require('path');
            SEP.ai.context = new AudioContext();
            SEP.ai.audio = new Audio();
        }

        function buttonClick() {
            var tx = document.getElementById('mytext').value ;
            writelog('我：',tx,0);
            answerQuestion(tx);
        }

        //把 txt 说出来：
        function speakSound(txt,callBack) {
            try{
                var path2 = dir + '/remote/speak.mp3';
                //writelog('合成:结束，写数据文件:', txt ,0);
                //console.log('speakSound path2=',path2);
                // 语音合成, 附带合成参数
                client.text2audio(txt, {spd: 5, per: 0}).then(function(result) {
                    //console.log('<text2audio>: ' + JSON.stringify(result));
                    // 把data数据写入到文件
                    fs.writeFileSync(path2, result.data);
                    let audio = SEP.ai.audio ;// new Audio();
                    audio.src = path2 + "?temp="+ new Date().getTime();
                    //"../remote/speak.mp3?temp="+ new Date().getTime();
                    audio.play();
                    if(callBack)callBack();
                });

            }catch (error){
                console.log(error);
            }

        }

        //自动 回答问题：并 调用 callback
        function answerQuestion(txt , callback ) {
            var url = tuling_api + txt ;
            //https://github.com/request/request
            request.post(
                { url:tuling_api ,
                    form: {
                        key:tuling_key,
                        userid:1,
                        info:txt
                    }},
                function(err,httpResponse,body){
                    //console.log('body:', body);
                    var jsonData = JSON.parse(body);
                    var answer = jsonData.text ;
                    var flag = jsonData.code ;
                    writelog('机器人说：',answer,1);
                    // speakSound(answer);
                    callback(answer)
                });
        }

        // 写日志
        function writelog(tag,info,flag) {
            try{
                console.log(tag, info );
                //var old =document.getElementById('mylog').innerHTML ;
                //var log = '<br/>'+tag +" "+ info ;
                //if(flag === 1) log = '<br/>'+tag +'<span>'+ info +'</span>';
                //document.getElementById('mylog').innerHTML = old + log ;
            }catch (error){}
        }

        init();

        // --------------------------------------------- step 2
        //声音流转为文子
        function buffer2Text(voiceBuffer,type,bite,language, callBack){
            // 识别本地文件，附带参数：语种选择，中文=zh、粤语=ct、英文=en，不区分大小写，默认中文
            client.recognize(voiceBuffer, type, bite, {lan: language} ).then(function (result) {
                //console.log('<recognize>: ' + JSON.stringify(result));
                var err_no = result['err_no']
                if(err_no == 0){
                    var tx = result['result'][0] ;
                    writelog('我：',tx,1);
                    //answerQuestion(tx , speakSound );
                    callBack(tx)
                }else {
                    writelog('出错了：' , JSON.stringify(result),0);
                }

            }, function(err) {
                console.log(err);
            });
        }
        //处理识别的文字：
        function buffer2TextBack(txt) {
            //answerQuestion(txt , speakSound );
            checkTextToDo(txt);
        }

        // 检查一下【我】说的内容：是不是命令；并执行，并说出来
        function checkTextToDo(txt) {
            if(txt.indexOf("红灯")!=-1){
                robotWork(10);
            }
            else if(txt.indexOf("关灯")!=-1 || txt.indexOf("光灯")!=-1 ){
                robotWork(13);
            }
            else if(txt.indexOf("黄灯")!=-1 || txt.indexOf("黄东")!=-1 || txt.indexOf("王东")!=-1 ){
                robotWork(11);
            }
            else if(txt.indexOf("绿灯")!=-1 || txt.indexOf("绿装")!=-1 || txt.indexOf("日钢")!=-1 ){
                robotWork(12);
            }
            else if(txt.indexOf("摩洛克")!=-1){
                robotWork(20);
            }else{
                //正常对话：
                answerQuestion(txt , speakSound );
            }
        }

        //机器人事件
        function robotWork(type) {
            console.log("小车命令：" + type);
            try {
                var myrobot = SEP.RobotManage.getCurrentRobot();
                if(!myrobot){
                    speakSound('请用USB线连接机器人')
                    return ;
                }
                if (type === 20) {
                    //发声音
                    const buffer3 = new Buffer('52420b0413fa052a03e8ca', "hex");
                    myrobot.writeBuffer(buffer3);
                }else if(type ==10){
                    //red
                    let color = Cast.toRgbColorObject('#ff0000');
                    Robot.setLed(0, color.r, color.g, color.b, true);
                    const buffer3 = new Buffer('52420b0413fa052a03e8ca', "hex");
                    myrobot.writeBuffer(buffer3);
                }else if(type ==11){
                    //yellow
                    let color = Cast.toRgbColorObject('#fffd14');
                    Robot.setLed(0, color.r, color.g, color.b, true);
                    const buffer3 = new Buffer('52420b0413fa052a03e8ca', "hex");
                    myrobot.writeBuffer(buffer3);
                }else if(type ==12){
                    //green
                    let color = Cast.toRgbColorObject('#00d37b');
                    Robot.setLed(0, color.r, color.g, color.b, true);
                    const buffer3 = new Buffer('52420b0413fa052a03e8ca', "hex");
                    myrobot.writeBuffer(buffer3);
                }else if(type ==13){
                    //green
                    let color = Cast.toRgbColorObject('#000000');
                    Robot.setLed(0, color.r, color.g, color.b, true);
                    const buffer3 = new Buffer('52420b0413fa052a03e8ca', "hex");
                    myrobot.writeBuffer(buffer3);
                }
                else {
                    const buffer3 = new Buffer('52420b0413fa052a03e8ca', "hex");
                    myrobot.writeBuffer(buffer3);
                }
            } catch (error) {
                console.error('robotWork:', error);
            }
        }

        // --------------------------------------------- step 3
        var recorder;
        var language = 'zh';
         SEP.ai.startRecording =function(la) {
            language = la ;
            HZRecorder.get(function (rec) {
                recorder = rec;
                recorder.start();
            });
        }
        SEP.ai.stopRecording = function() {
            recorder.stop();
            //createDownloadLink();
            AudioBaidu(language );
        }

        function AudioBaidu(language) {
            writelog('','开始识别：',0);
            var bl = recorder.getBlob();
            blob2Butter(bl,language);
        }
        //文件转化为butter ,转为 text :
        function blob2Butter(bl,language) {
            //var bl = new Blob(); // bl是要转换的blob
            var fr = new FileReader();
            fr.onload = function(){
                var ab = this.result; // ab是转换后的结果
                let voiceBuffer2 = new Buffer(ab);
                //console.log('blob2Butter',voiceBuffer2);
                buffer2Text(voiceBuffer2,'wav',sampleRate,language,buffer2TextBack );
            };
            fr.readAsArrayBuffer(bl);
        }
        // --------------------------------------------- step back
        (function (window) {
            //兼容
            window.URL = window.URL || window.webkitURL;
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

            var HZRecorder = function (stream, config) {
                config = config || {};
                config.sampleBits = config.sampleBits || 16;      //采样数位 8, 16
                config.sampleRate = config.sampleRate || (8000);   //采样率(1/6 44100)


                var context = SEP.ai.context ;//new AudioContext();
                var audioInput = context.createMediaStreamSource(stream);
                var recorder = context.createScriptProcessor(4096, 1, 1);


                var audioData = {
                    size: 0          //录音文件长度
                    , buffer: []     //录音缓存
                    , inputSampleRate: context.sampleRate    //输入采样率
                    , inputSampleBits: 16       //输入采样数位 8, 16
                    , outputSampleRate: config.sampleRate    //输出采样率
                    , oututSampleBits: config.sampleBits       //输出采样数位 8, 16
                    , input: function (data) {
                        this.buffer.push(new Float32Array(data));
                        this.size += data.length;
                    }
                    , compress: function () { //合并压缩
                        //合并
                        var data = new Float32Array(this.size);
                        var offset = 0;
                        for (var i = 0; i < this.buffer.length; i++) {
                            data.set(this.buffer[i], offset);
                            offset += this.buffer[i].length;
                        }
                        //压缩
                        var compression = parseInt(this.inputSampleRate / this.outputSampleRate);
                        //console.log('audioData',this.inputSampleRate +' --- '+ this.outputSampleRate)
                        var length = data.length / compression;
                        var result = new Float32Array(length);
                        var index = 0, j = 0;
                        while (index < length) {
                            result[index] = data[j];
                            j += compression;
                            index++;
                        }
                        return result;
                    }
                    , encodeWAV: function () {
                        var sampleRate = Math.min(this.inputSampleRate, this.outputSampleRate);
                        var sampleBits = Math.min(this.inputSampleBits, this.oututSampleBits);
                        var bytes = this.compress();
                        var dataLength = bytes.length * (sampleBits / 8);
                        var buffer = new ArrayBuffer(44 + dataLength);
                        var data = new DataView(buffer);


                        var channelCount = 1;//单声道
                        var offset = 0;


                        var writeString = function (str) {
                            for (var i = 0; i < str.length; i++) {
                                data.setUint8(offset + i, str.charCodeAt(i));
                            }
                        }

                        // 资源交换文件标识符
                        writeString('RIFF'); offset += 4;
                        // 下个地址开始到文件尾总字节数,即文件大小-8
                        data.setUint32(offset, 36 + dataLength, true); offset += 4;
                        // WAV文件标志
                        writeString('WAVE'); offset += 4;
                        // 波形格式标志
                        writeString('fmt '); offset += 4;
                        // 过滤字节,一般为 0x10 = 16
                        data.setUint32(offset, 16, true); offset += 4;
                        // 格式类别 (PCM形式采样数据)
                        data.setUint16(offset, 1, true); offset += 2;
                        // 通道数
                        data.setUint16(offset, channelCount, true); offset += 2;
                        // 采样率,每秒样本数,表示每个通道的播放速度
                        data.setUint32(offset, sampleRate, true); offset += 4;
                        // 波形数据传输率 (每秒平均字节数) 单声道×每秒数据位数×每样本数据位/8
                        data.setUint32(offset, channelCount * sampleRate * (sampleBits / 8), true); offset += 4;
                        // 快数据调整数 采样一次占用字节数 单声道×每样本的数据位数/8
                        data.setUint16(offset, channelCount * (sampleBits / 8), true); offset += 2;
                        // 每样本数据位数
                        data.setUint16(offset, sampleBits, true); offset += 2;
                        // 数据标识符
                        writeString('data'); offset += 4;
                        // 采样数据总数,即数据总大小-44
                        data.setUint32(offset, dataLength, true); offset += 4;
                        // 写入采样数据
                        if (sampleBits === 8) {
                            for (var i = 0; i < bytes.length; i++, offset++) {
                                var s = Math.max(-1, Math.min(1, bytes[i]));
                                var val = s < 0 ? s * 0x8000 : s * 0x7FFF;
                                val = parseInt(255 / (65535 / (val + 32768)));
                                data.setInt8(offset, val, true);
                            }
                        } else {
                            for (var i = 0; i < bytes.length; i++, offset += 2) {
                                var s = Math.max(-1, Math.min(1, bytes[i]));
                                data.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
                            }
                        }


                        return new Blob([data], { type: 'audio/wav' });
                    }
                };

                //开始录音
                this.start = function () {
                    audioInput.connect(recorder);
                    recorder.connect(context.destination);
                }


                //停止
                this.stop = function () {
                    recorder.disconnect();
                }
                //获取音频文件
                this.getBlob = function () {
                    this.stop();
                    return audioData.encodeWAV();
                }
                //回放
                this.play = function (audio) {
                    audio.src = window.URL.createObjectURL(this.getBlob());
                }

                //音频采集
                recorder.onaudioprocess = function (e) {
                    audioData.input(e.inputBuffer.getChannelData(0));
                    //record(e.inputBuffer.getChannelData(0));
                }
            };
            //抛出异常
            HZRecorder.throwError = function (message) {
                alert(message);
                throw new function () { this.toString = function () { return message; } }
            }
            //是否支持录音
            HZRecorder.canRecording = (navigator.getUserMedia != null);
            //获取录音机
            HZRecorder.get = function (callback, config) {
                if (callback) {
                    if (navigator.getUserMedia) {
                        navigator.getUserMedia(
                            { audio: true } //只启用音频
                            , function (stream) {
                                var rec = new HZRecorder(stream, config);
                                callback(rec);
                            }
                            , function (error) {
                                switch (error.code || error.name) {
                                    case 'PERMISSION_DENIED':
                                    case 'PermissionDeniedError':
                                        HZRecorder.throwError('用户拒绝提供信息。');
                                        break;
                                    case 'NOT_SUPPORTED_ERROR':
                                    case 'NotSupportedError':
                                        HZRecorder.throwError('浏览器不支持硬件设备。');
                                        break;
                                    case 'MANDATORY_UNSATISFIED_ERROR':
                                    case 'MandatoryUnsatisfiedError':
                                        HZRecorder.throwError('无法发现指定的硬件设备。');
                                        break;
                                    default:
                                        HZRecorder.throwError('无法打开麦克风。异常信息:' + (error.code || error.name));
                                        break;
                                }
                            });
                    } else {
                        HZRecorder.throwErr('当前浏览器不支持录音功能。'); return;
                    }
                }
            }
            window.HZRecorder = HZRecorder;
        })(window);
    }

}
