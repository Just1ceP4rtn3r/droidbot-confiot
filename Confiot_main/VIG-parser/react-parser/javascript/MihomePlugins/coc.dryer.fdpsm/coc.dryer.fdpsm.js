
__d(function (global, _require, module, exports, _dependencyMap) {
    var _miot = _require(_dependencyMap[0]);

    var _Page = _require(_dependencyMap[1]);

    var _Page2 = babelHelpers.interopRequireDefault(_Page);

    var _SceneMain = _require(_dependencyMap[2]);

    var _SceneMain2 = babelHelpers.interopRequireDefault(_SceneMain);

    _miot.PackageEvent.packageAuthorizationCancel.addListener(function () {
        console.log("packageAuthorizationCancel");
        var licenseKey = "license-" + _miot.Device.deviceID;

        _miot.Host.storage.set(licenseKey, false);

        _miot.Package.exit();
    });

    _miot.PackageEvent.packageViewWillAppear.addListener(function () {
        console.log("packageViewWillAppear");
    });

    _miot.PackageEvent.packageWillLoad.addListener(function () {
        console.log("packageWillLoad");
    });

    _miot.PackageEvent.packageDidLoaded.addListener(function () {
        console.log("packageDidLoaded");
    });

    _miot.PackageEvent.packageDidResume.addListener(function () {
        console.log("packageDidResume");
    });

    _miot.PackageEvent.packageWillPause.addListener(function () {
        console.log("packageWillPause");
    });

    _miot.PackageEvent.packageWillExit.addListener(function () {
        console.log("packageWillExit");
    });

    switch (_miot.Package.entrance) {
        case _miot.Entrance.Scene:
            _miot.Package.entry(_SceneMain2.default, function (_) {});

            break;

        default:
            _miot.Package.entry(_Page2.default, function (_) {});

            break;
    }
},10001,[10074,10004,10049],"projects/com.coc.dryer.fdpsm/index.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _NavigationBar = _require(_dependencyMap[0]);

    var _NavigationBar2 = babelHelpers.interopRequireDefault(_NavigationBar);

    var _react = _require(_dependencyMap[1]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNavigation = _require(_dependencyMap[2]);

    var _MainPage = _require(_dependencyMap[3]);

    var _MainPage2 = babelHelpers.interopRequireDefault(_MainPage);

    var _CommonSetting = _require(_dependencyMap[4]);

    var _Setting = _require(_dependencyMap[5]);

    var _Setting2 = babelHelpers.interopRequireDefault(_Setting);

    var _RpcControl = _require(_dependencyMap[6]);

    var _RpcControl2 = babelHelpers.interopRequireDefault(_RpcControl);

    var _Select = _require(_dependencyMap[7]);

    var _Select2 = babelHelpers.interopRequireDefault(_Select);

    var _PromptPage = _require(_dependencyMap[8]);

    var _PromptPage2 = babelHelpers.interopRequireDefault(_PromptPage);

    var _miot = _require(_dependencyMap[9]);

    var imagePathMap = new Map();

    var onPressShare = function onPressShare() {
        var imageName = "share_" + new Date().getTime() + ".png";

        _miot.Host.file.screenShot(imageName).then(function (imagePath) {
            imagePathMap.set(imageName, imagePath);

            _miot.Host.ui.openShareListBar(_miot.Device.name, _miot.Device.name + '分享描述', {
                uri: imagePath
            }, '');
        }).catch(function (result) {});
    };

    var RootStack = (0, _reactNavigation.createStackNavigator)({
        Home: _MainPage2.default,
        Setting: _Setting2.default,
        MoreSetting: _CommonSetting.MoreSetting,
        FirmwareUpgrade: _CommonSetting.FirmwareUpgrade,
        RpcControl: _RpcControl2.default,
        Selects: _Select2.default,
        PromptPage: _PromptPage2.default
    }, {
        initialRouteName: 'Home',
        navigationOptions: function navigationOptions(_ref) {
            var navigation = _ref.navigation;
            return {
                header: _react2.default.createElement(_NavigationBar2.default, {
                    backgroundColor: "#0892fe",
                    type: _NavigationBar2.default.TYPE.DARK,
                    left: [{
                        key: _NavigationBar2.default.ICON.BACK,
                        onPress: function onPress() {
                            _miot.Package.exit();
                        }
                    }],
                    right: [{
                        key: _NavigationBar2.default.ICON.SHARE,
                        onPress: function onPress() {
                            onPressShare();
                        }
                    }, {
                        key: _NavigationBar2.default.ICON.MORE,
                        onPress: function onPress() {
                            navigation.navigate('Setting', {
                                'title': '设置'
                            });
                        }
                    }],
                    title: navigation.state.params ? navigation.state.params.title : _miot.Device.name,
                    onPressTitle: function onPressTitle() {
                        console.log('onPressTitle');
                    }
                })
            };
        },
        transitionConfig: function transitionConfig() {
            return {
                screenInterpolator: interpolator
            };
        }
    });
    {}
    {}
    {}
    {}
    {}
    {}
    {}
    {}
    {}
    {}
    {}
    {}
    {}
    {}
    {}
    {}
    {}
    {}
    {}
    {}
    {}
    {}
    {}
    {}
    {}

    function interpolator(props) {
        var layout = props.layout,
            position = props.position,
            scene = props.scene;

        if (!layout.isMeasured) {
            return function (props) {
                var navigation = props.navigation,
                    scene = props.scene;
                var focused = navigation.state.index === scene.index;
                var opacity = focused ? 1 : 0;
                var translate = focused ? 0 : 1000000;
                return {
                    opacity: opacity,
                    transform: [{
                        translateX: translate
                    }, {
                        translateY: translate
                    }]
                };
            };
        }

        var interpolate = function interpolate(props) {
            var scene = props.scene,
                scenes = props.scenes;
            var index = scene.index;
            var lastSceneIndexInScenes = scenes.length - 1;
            var isBack = !scenes[lastSceneIndexInScenes].isActive;

            if (isBack) {
                var currentSceneIndexInScenes = scenes.findIndex(function (item) {
                    return item === scene;
                });
                var targetSceneIndexInScenes = scenes.findIndex(function (item) {
                    return item.isActive;
                });
                var targetSceneIndex = scenes[targetSceneIndexInScenes].index;
                var lastSceneIndex = scenes[lastSceneIndexInScenes].index;

                if (index !== targetSceneIndex && currentSceneIndexInScenes === lastSceneIndexInScenes) {
                    return {
                        first: Math.min(targetSceneIndex, index - 1),
                        last: index + 1
                    };
                } else if (index === targetSceneIndex && currentSceneIndexInScenes === targetSceneIndexInScenes) {
                    return {
                        first: index - 1,
                        last: Math.max(lastSceneIndex, index + 1)
                    };
                } else if (index === targetSceneIndex || currentSceneIndexInScenes > targetSceneIndexInScenes) {
                    return null;
                } else {
                    return {
                        first: index - 1,
                        last: index + 1
                    };
                }
            } else {
                return {
                    first: index - 1,
                    last: index + 1
                };
            }
        };

        if (!interpolate) return {
            opacity: 0
        };
        var p = interpolate(props);
        if (!p) return;
        var first = p.first,
            last = p.last;
        var index = scene.index;
        var opacity = position.interpolate({
            inputRange: [first, first + 0.01, index, last - 0.01, last],
            outputRange: [0, 1, 1, 0.85, 0]
        });
        var width = layout.initWidth;
        var translateX = position.interpolate({
            inputRange: [first, index, last],
            outputRange: [width, 0, width * -0.3]
        });
        var translateY = 0;
        return {
            opacity: opacity,
            transform: [{
                translateX: translateX
            }, {
                translateY: translateY
            }]
        };
    }

    ;

    var App = function (_React$Component) {
        babelHelpers.inherits(App, _React$Component);

        function App() {
            babelHelpers.classCallCheck(this, App);
            return babelHelpers.possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
        }

        babelHelpers.createClass(App, [{
            key: "render",
            value: function render() {
                return _react2.default.createElement(RootStack, null);
            }
        }]);
        return App;
    }(_react2.default.Component);

    exports.default = App;
},10004,[10719,10297,10918,10007,10353,10040,10043,10010,10046,10074],"projects/com.coc.dryer.fdpsm/Page/index.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _miot = _require(_dependencyMap[1]);

    var _Select = _require(_dependencyMap[2]);

    var _Select2 = babelHelpers.interopRequireDefault(_Select);

    var _reactNative = _require(_dependencyMap[3]);

    var _reactNativeProgress = _require(_dependencyMap[4]);

    var Progress = babelHelpers.interopRequireWildcard(_reactNativeProgress);

    var _reactNativeSvg = _require(_dependencyMap[5]);

    var _reactNativeSvg2 = babelHelpers.interopRequireDefault(_reactNativeSvg);

    var _Dialog = _require(_dependencyMap[6]);

    var Dimensions = _require(_dependencyMap[7]);

    var _Dimensions$get = Dimensions.get("screen"),
        width = _Dimensions$get.width,
        height = _Dimensions$get.height;

    var UIManager = _reactNative.NativeModules.UIManager;
    var requestStatus = 0;
    var devieStatus = false;
    var maxWidth = width;

    if (width > 450) {
        maxWidth = 450;
    }

    var language = _miot.Host.locale.language;
    var isCN = language == 'zh';
    var clickStatus = false;
    var isLongClick = false;

    var App = function (_React$Component) {
        babelHelpers.inherits(App, _React$Component);

        function App(props) {
            babelHelpers.classCallCheck(this, App);

            var _this = babelHelpers.possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

            _this.animateInfo = function () {
                return _reactNative.Animated.timing(_this.state.scaleValue, {
                    toValue: 100,
                    duration: 2000,
                    friction: 100,
                    easing: _reactNative.Easing.linear,
                    useNativeDriver: true
                });
            };

            _this.setAnimateStart = function () {
                if (_this.state.count > 0) {
                    _this.setState({
                        aniClock: false,
                        o: 1,
                        scaleValue: new _reactNative.Animated.Value(0)
                    });

                    _reactNative.Animated.loop(_this.animateInfo()).start();
                }
            };

            _this.setAnimateStop = function () {
                if (_this.state.count <= 0) {
                    _this.setState({
                        aniClock: true,
                        o: 0,
                        scaleValue: new _reactNative.Animated.Value(0)
                    });

                    _reactNative.Animated.loop(_this.animateInfo()).stop();
                }
            };

            _this.setNum = function (param) {
                if (typeof param != "number") {
                    console.log('参数值类型错误');
                    return false;
                }

                _this.setState({
                    count: param,
                    percents: _this.state.status ? param / _this.state.max * 100 : 0,
                    time: _this.setTime(param)
                });
            };

            _this.setCountdown = function (number) {
                _this.timer && clearInterval(_this.timer);
                console.log('运行状态：' + _this.state.status);

                if (number > 0) {
                    _this.timer = setInterval(function () {
                        var count = _this.state.count;

                        _this.setState({
                            count: count - 1,
                            percents: (count - 1) / _this.state.max * 100
                        });

                        if (_this.state.count <= 0) {
                            _this.timer && clearInterval(_this.timer);

                            _this.outRun(0);

                            _this.setNum(0);

                            _this.setState({
                                status: false,
                                statusText: isCN ? _this.state.onText : _this.state.onTextEn,
                                scaleValue: new _reactNative.Animated.Value(0),
                                o: 0
                            });

                            var getParamTime = setTimeout(function () {
                                _this.setState({
                                    getParam: 0
                                });
                            }, 50);

                            _this.setAnimateStop();
                        }
                    }, 60000);
                }
            };

            _this.setClickLock = function () {
                clickStatus = true;
            };

            _this.setRun = function (count) {
                if (!_this.state.status) {
                    _this.setState({
                        status: true,
                        count: _this.state.count > 0 ? _this.state.count : 120
                    });

                    devieStatus = true;
                } else {
                    _this.setState({
                        status: false,
                        count: 0
                    });

                    devieStatus = false;

                    _this.setAnimateStop();
                }
            };

            _this.outRun = function (num) {
                _this.timerCount && clearInterval(_this.timerCount);
                _this.runLoop && clearInterval(_this.runLoop);

                _this.requestClock();

                _this.setNum(num > 0 ? num : _this.state.count);

                _this.runLoop = setInterval(function () {
                    if (requestStatus <= 0) {
                        console.log('发送开关机请求 outRun');

                        _this._sendRequests('setPower', num > 0 ? num : _this.state.count);

                        setTimeout(function () {
                            if (num <= 0) {
                                _this.setState({
                                    getParam: 0
                                });
                            }
                        }, 500);
                        _this.runLoop && clearInterval(_this.runLoop);
                    }
                }, 1000);
            };

            _this.setPlusNum = function (num) {
                isLongClick = true;

                if (_this.state.count <= _this.state.max - _this.state.step) {
                    _this.setNum(_this.state.count + _this.state.step);
                } else {
                    _this.setState({
                        count: _this.state.max
                    });
                }
            };

            _this.setLongPlusNum = function () {
                _this.timerCount && clearInterval(_this.timerCount);
                isLongClick = true;
                _this.timerCount = setInterval(function () {
                    if (_this.state.count <= _this.state.max - _this.state.longStep) {
                        _this.setNum(_this.state.count + 1);
                    } else {
                        _this.setState({
                            count: _this.state.max
                        });
                    }
                }, 25);
            };

            _this.setReduceNum = function (num) {
                isLongClick = true;

                if (_this.state.count >= _this.state.min + _this.state.step) {
                    _this.setNum(_this.state.count - _this.state.step);
                } else {
                    _this.setState({
                        count: _this.state.min
                    });

                    setTimeout(function () {
                        _this.setState({
                            getParam: 0
                        });
                    }, 500);
                }
            };

            _this.setLongReduceNum = function () {
                _this.timerCount && clearInterval(_this.timerCount);
                isLongClick = true;
                _this.timerCount = setInterval(function () {
                    if (_this.state.count >= _this.state.min + _this.state.longStep) {
                        _this.setNum(_this.state.count - 1);
                    } else {
                        _this.setState({
                            count: _this.state.min
                        });

                        setTimeout(function () {
                            _this.setState({
                                getParam: 0
                            });
                        }, 500);
                    }
                }, 25);
            };

            _this.longOut = function () {
                _this.timerCount && clearInterval(_this.timerCount);
                _this.timeLoop && clearInterval(_this.timeLoop);

                _this.requestClock();

                _this.timeLoop = setInterval(function () {
                    if (requestStatus <= 0) {
                        _this.setNum(_this.state.count);

                        if (devieStatus == true) {
                            console.log('发送时间请求');

                            _this._sendRequests('setLeftTime', _this.state.count);

                            _this.setCountdown(_this.state.count);

                            _this.timeLoop && clearInterval(_this.timeLoop);
                        }

                        _this.timeLoop && clearInterval(_this.timeLoop);
                        console.log(requestStatus);
                    } else {
                        console.log('执行跳过 : ' + requestStatus);
                    }
                }, 1000);
            };

            _this.requestClock = function (t) {
                _this.request && clearInterval(_this.request);
                var time = 50;
                _this.request = setInterval(function () {
                    time = time - 1;
                    requestStatus = time;

                    if (requestStatus <= 0 && !isLongClick) {
                        _this.request && clearInterval(_this.request);
                        setTimeout(function () {
                            clickStatus = false;
                            isLongClick = false;
                            requestStatus = 0;
                        }, 5000);
                    }
                }, 10);
            };

            _this.getRequest = function (status) {
                var method = 'get_properties';
                var params = [{
                    "did": _this.state.did,
                    "piid": 1,
                    "siid": 3
                }, {
                    "did": _this.state.did,
                    "piid": 2,
                    "siid": 3
                }, {
                    "did": _this.state.did,
                    "piid": 3,
                    "siid": 3
                }, {
                    "did": _this.state.did,
                    "piid": 4,
                    "siid": 3
                }, {
                    "did": _this.state.did,
                    "piid": 5,
                    "siid": 3
                }];

                _miot.Device.getDeviceWifi().callMethod(method, params).then(function (res) {
                    var result = JSON.stringify(res);
                    var arrys = JSON.parse(result);
                    var status = arrys.result[2].value == 'on' ? true : false;

                    if (clickStatus && isLongClick) {
                        console.log('click lock');
                    } else {
                        if (status != _this.state.status || arrys.result[0].value != _this.state.count) {
                            console.log('开始请求 ：' + clickStatus + '：' + isLongClick);

                            _this.setState({
                                status: arrys.result[2].value == 'on' ? true : false,
                                aniClock: arrys.result[2].value == 'on' ? true : false,
                                result: result
                            });

                            devieStatus = arrys.result[2].value == 'on' ? true : false;

                            _this.setNum(arrys.result[0].value);

                            setTimeout(function () {
                                _this.setCountdown(_this.state.count);
                            }, 10);

                            if (arrys.result[2].value == 'off') {
                                setTimeout(function () {
                                    _this.setState({
                                        getParam: 0
                                    });
                                }, 500);
                            }

                            if (!_this.state.aniClock) {
                                _this.setAnimateStop();
                            } else {
                                _this.setAnimateStart();
                            }
                        } else {}
                    }
                }).catch(function (err) {
                    console.log('error:', err);
                    var result = JSON.stringify(err);
                    result = "Error: \n" + result;

                    _this.setState({
                        result: result
                    });
                });
            };

            _this.getRequestLoop = function (n) {
                var loop = n || 5;
                _this.getLoop && clearInterval(_this.getLoop);
                _this.getLoop = setInterval(function () {
                    if (!_this.state.status) {
                        _this.getLoop && clearInterval(_this.getLoop);
                    }

                    loop = loop - 1;

                    if (loop <= 0) {
                        loop = 3;

                        _this.getRequest();
                    }

                    console.log('getLoop : ' + loop);
                }, 1000);
            };

            _this.setTime = function (param) {
                var paramTime = {
                    hours: Math.floor(param / 60),
                    minute: Math.floor(Math.floor(param % 60))
                };
                var tomorrow = '';
                var date = new Date();
                var year = date.getFullYear().toString();
                var month = (date.getMonth() + 1).toString();
                var day = date.getDate().toString();
                var hourNumber = date.getHours() + paramTime.hours;
                var minuteNumber = date.getMinutes() + paramTime.minute;

                if (minuteNumber > 0) {
                    hourNumber = hourNumber + Math.floor(minuteNumber / 60);
                    minuteNumber = minuteNumber % 60;
                }

                if (hourNumber >= 24) {
                    hourNumber = hourNumber % 24;
                    if (hourNumber.toString() === 1) hourNumber = '0' + hourNumber.toString();
                    tomorrow = '明天 ';
                }

                var hour = hourNumber.toString();
                var minute = minuteNumber.toString();
                if (hour.length === 1) hour = '0' + hour;
                if (minute.length === 1) minute = '0' + minute;
                return hour + ':' + minute;
            };

            _this.goToSelect = function () {
                if (_this.state.getParam <= 0) {
                    _this.props.navigation.navigate('Selects', {
                        'title': _this.state.selectTitle
                    });
                }
            };

            _this.state = {
                min: 0,
                max: 360,
                count: 0,
                defaultNum: 120,
                percents: 0,
                getParam: 0,
                getParamText: '工作中......',
                getParamTextEn: 'Working......',
                selectTitle: '烘干时间表',
                selectTitleEn: 'Dryer time',
                selectText: '帮我计算干衣时间 >',
                selectTextEn: 'Calculate the dryer time for me >',
                error: false,
                errorText: '设备异常，请检查是否倾倒或跌落。',
                closeOneMin: '为保护主机，风扇将在一分钟后关闭......',
                closeOneMinEn: 'The fan will be shut down after 1 min for protesting the main engine.',
                closing: '设备正在关机......',
                closingEn: 'Shutting down…',
                dialogErrorText: '设备异常，请检查：\n1. 产品是否倾倒或跌落；\n2. 主机进风口或出风口是否被遮挡。',
                dialogErrorTextEn: 'Breakdown, please check:\n1.If the product is not vetical or fell down.\n2.If the air-inlet or air-outlet be sheltered. ',
                buttonText: '我知道了',
                buttonTextEn: 'OK',
                step: 10,
                longStep: 40,
                status: false,
                statusText: devieStatus ? '开机' : '关机',
                statusTextEn: devieStatus ? 'ON' : 'OFF',
                onText: '开机',
                onTextEn: 'ON',
                offText: '关机',
                offTextEn: 'OFF',
                statusImg: _require(_dependencyMap[8]),
                plusText: '加时',
                plusTextEn: 'Increase time',
                plusImg: _require(_dependencyMap[9]),
                reduceText: '减时',
                reduceTextEn: 'Reduce time ',
                reduceImg: _require(_dependencyMap[10]),
                overTimeText: '待开机',
                overTimeTextEn: 'Standby',
                overTimeAfter: '约 ',
                overTimeAfterEn: 'Finish at ',
                overTimeBefor: ' 完成',
                overTimeBeforEn: " o'clock",
                time: _this.setTime(0),
                o: 0,
                scaleValue: new _reactNative.Animated.Value(0),
                aniClock: true,
                circleSize: maxWidth * .79 - 65,
                svgSize: maxWidth * .79,
                svgCircleSize: maxWidth * .79 / 2,
                svgCircleBorder: 1,
                svgCircleFill: 'none',
                svgCircleR: [maxWidth * .79 / 2 - 22, maxWidth * .79 / 2 - 20, maxWidth * .79 / 2 - 18, maxWidth * .79 / 2 - 16, maxWidth * .79 / 2 - 14, maxWidth * .79 / 2 - 12, maxWidth * .79 / 2 - 10, maxWidth * .79 / 2 - 8, maxWidth * .79 / 2 - 6, maxWidth * .79 / 2 - 4],
                svgCircleStroke: 'rgba(255,255,255,.3)',
                visMessage: false,
                siid: 3,
                leftTimePiid: 1,
                errorCodePiid: 2,
                powerPiid: 3,
                modePiid: 4,
                endStatusPiid: 5,
                setTimeAiid: 1,
                setPowerAiid: 2,
                setModeAiid: 3,
                endSendEiid: 1,
                buttonPressedEiid: 2,
                errorSendEiid: 3,
                requestStatus: null,
                did: _miot.Device.deviceID,
                method: 'get_properties',
                params: [{
                    'value': 'on'
                }],
                extra: {},
                paramsString: '',
                extraString: {},
                result: 'None',
                getEvent: ''
            };
            return _this;
        }

        babelHelpers.createClass(App, [{
            key: "_sendRequests",
            value: function _sendRequests(type, value) {
                var _this2 = this;

                var did, setLeftTime, setMode, setPower, getLeftTime, getErrorCode, getPower, getMode, getEndStatus, data;
                return regeneratorRuntime.async(function _sendRequests$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                did = _miot.Device.deviceID;
                                setLeftTime = {
                                    did: did,
                                    siid: 3,
                                    piid: 1,
                                    value: value
                                };
                                setMode = {
                                    did: did,
                                    siid: 3,
                                    piid: 2,
                                    value: value
                                };
                                setPower = {
                                    did: did,
                                    siid: 3,
                                    piid: 3,
                                    value: value > 0 ? 'on' : 'off'
                                };
                                getLeftTime = {
                                    did: did,
                                    siid: 3,
                                    piid: 1
                                };
                                getErrorCode = {
                                    did: did,
                                    siid: 3,
                                    piid: 2
                                };
                                getPower = {
                                    did: did,
                                    siid: 3,
                                    piid: 3
                                };
                                getMode = {
                                    did: did,
                                    siid: 3,
                                    piid: 4
                                };
                                getEndStatus = {
                                    did: did,
                                    siid: 3,
                                    piid: 5
                                };
                                _context.t0 = type;
                                _context.next = _context.t0 === 'setLeftTime' ? 12 : _context.t0 === 'setPower' ? 15 : _context.t0 === 'setMode' ? 17 : _context.t0 === 'get' ? 20 : _context.t0 === 'do' ? 22 : _context.t0 === 'sub' ? 24 : _context.t0 === 'getSpec' ? 26 : _context.t0 === 'getCurrent' ? 28 : 35;
                                break;

                            case 12:
                                this.on = !this.on;

                                _miot.Service.spec.setPropertiesValue([setLeftTime]).then(function (res) {
                                    _this2.setCountdown(value);

                                    if (value == 0) {
                                        _this2.setState({
                                            visMessage: true
                                        });

                                        _this2.setState({
                                            getParam: 0
                                        });
                                    }
                                }).catch(function (res) {
                                    console.log(res, 'catch');
                                });

                                return _context.abrupt("break", 36);

                            case 15:
                                _miot.Service.spec.setPropertiesValue([setLeftTime, setPower]).then(function (res) {
                                    setTimeout(function () {
                                        _this2.getRequest();
                                    }, 0);

                                    if (value <= 0) {
                                        if (_this2.state.count >= 360) _this2.setState({
                                            count: 359
                                        });
                                        setTimeout(function () {
                                            if (!_this2.state.aniClock) {
                                                _this2.setAnimateStop();
                                            }

                                            _this2.setState({
                                                visMessage: true,
                                                getParam: 0,
                                                statusText: isCN ? _this2.state.onText : _this2.state.onTextEn,
                                                scaleValue: new _reactNative.Animated.Value(0)
                                            });
                                        }, 500);
                                    } else {
                                        _this2.setState({
                                            visMessage: false,
                                            statusText: isCN ? _this2.state.offText : _this2.state.offTextEn
                                        });

                                        if (_this2.state.aniClock) {
                                            _this2.setAnimateStart();
                                        }
                                    }
                                }).catch(function (res) {
                                    console.log(res, 'catch');
                                });

                                return _context.abrupt("break", 36);

                            case 17:
                                this.on = !this.on;

                                _miot.Service.spec.setPropertiesValue([setMode]).then(function (res) {
                                    console.log('setPropertiesValue', res);
                                }).catch(function (res) {
                                    console.log(res, 'catch');
                                });

                                return _context.abrupt("break", 36);

                            case 20:
                                _miot.Service.spec.getPropertiesValue([getLeftTime, getErrorCode, getPower, getMode, getEndStatus]).then(function (res) {
                                    var result = JSON.stringify(res);
                                    var arrys = JSON.parse(result);

                                    _this2.setState({
                                        status: arrys.result[0].value > 0 ? true : false,
                                        aniClock: arrys.result[0].value > 0 ? true : false,
                                        result: result
                                    });

                                    devieStatus = arrys.result[0].value > 0 ? true : false;

                                    _this2.setNum(arrys.result[0].value);

                                    setTimeout(function () {
                                        _this2.setCountdown(_this2.state.count);
                                    }, 10);
                                    console.log('getPropertiesValue', res);
                                }).catch(function (res) {
                                    console.log(res, 'catch');
                                });

                                return _context.abrupt("break", 36);

                            case 22:
                                _miot.Service.spec.doAction({
                                    did: did,
                                    siid: 3,
                                    aiid: 1,
                                    inList: [10]
                                }).then(function (res) {
                                    console.log('doAction', res);
                                }).catch(function (res) {
                                    console.log(res, 'catch');
                                });

                                return _context.abrupt("break", 36);

                            case 24:
                                _miot.Device.getDeviceWifi().subscribeMessages("end-send", "button-pressed", "error-send").then(function (res) {
                                    console.log('subscribeMessages', res);
                                }).catch(function (res) {
                                    console.log(res, 'catch');
                                });

                                return _context.abrupt("break", 36);

                            case 26:
                                _miot.Service.spec.getSpecString(did).then(function (res) {
                                    console.log('getSpecString', JSON.stringify(res));
                                }).catch(function (res) {
                                    console.log(res, 'catch');
                                });

                                return _context.abrupt("break", 36);

                            case 28:
                                console.log('执行到这了');
                                _context.next = 31;
                                return regeneratorRuntime.awrap(_miot.Service.spec.getCurrentSpecValue(_miot.Device.deviceID));

                            case 31:
                                data = _context.sent;
                                console.log(data);
                                this.setState({
                                    data: data
                                });
                                return _context.abrupt("break", 36);

                            case 35:
                                return _context.abrupt("break", 36);

                            case 36:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, null, this);
            }
        }, {
            key: "componentDidMount",
            value: function componentDidMount() {
                var _this3 = this;

                var agreementURL = isCN ? _require(_dependencyMap[11]) : _require(_dependencyMap[12]);
                var privacyURL = isCN ? _require(_dependencyMap[13]) : _require(_dependencyMap[14]);
                var options = {
                    agreementURL: agreementURL,
                    privacyURL: privacyURL
                };

                _miot.Service.smarthome.batchGetDeviceDatas([{
                    did: _miot.Device.deviceID,
                    props: ["prop.s_auth_config"]
                }]).then(function (res) {
                    console.log('batchGetDeviceDatas ', res);
                    var alreadyAuthed = false;
                    var result = res[_miot.Device.deviceID];
                    var config = void 0;

                    if (result && result['prop.s_auth_config']) {
                        config = result['prop.s_auth_config'];
                    }

                    if (config) {
                        try {
                            var authJson = JSON.parse(config);
                            console.log('auth config ', authJson);
                            alreadyAuthed = authJson.privacyAuthed && true;
                        } catch (err) {}
                    }

                    if (alreadyAuthed) {
                        return new Promise.resolve("已经授权");
                    } else {
                        return _miot.Host.ui.alertLegalInformationAuthorization(options).then(function (res) {
                            console.log('授权结果', res);

                            if (res) {
                                return _miot.Service.smarthome.batchSetDeviceDatas([{
                                    did: _miot.Device.deviceID,
                                    props: {
                                        "prop.s_auth_config": JSON.stringify({
                                            'privacyAuthed': 'true'
                                        })
                                    }
                                }]);
                            } else {
                                return new Promise.reject("取消授权");
                            }
                        });
                    }
                }).catch(function (err) {
                    alert('授权错误' + err);

                    _miot.Package.exit();
                });

                _reactNative.Animated.loop(this.animateInfo()).start();

                this.outPackage = _miot.PackageEvent.packageWillPause.addListener(function () {
                    console.log('我离开了');

                    _this3.setState({
                        o: 0
                    });
                });
                this.backPackage = _miot.PackageEvent.packageDidResume.addListener(function () {
                    console.log('我又回来了');

                    if (_this3.state.status) {
                        _this3.setState({
                            o: 1
                        });
                    }

                    _this3.getRequest();
                });
                this.subscription = _reactNative.DeviceEventEmitter.addListener("EventType", function (param) {
                    if (param > 0) {
                        _this3.setNum(param);

                        setTimeout(function () {
                            _this3.setCountdown(param);
                        }, 100);

                        _this3.setState({
                            getParam: param
                        });

                        _this3.outRun(param);
                    }
                });
                this.getRequest();

                _miot.Device.getDeviceWifi().subscribeMessages("event.3.1", "event.3.2", "event.3.3", "event.3.4").then(function (res) {
                    console.log('subscribeMessages ：', res);
                }).catch(function (res) {
                    console.log(res, 'catch');
                });

                _miot.DeviceEvent.deviceReceivedMessages.addListener(function (device, map, res) {
                    if (res[0].key == 'event.3.3') {
                        if (res[0].value[0].value != 2) {
                            _this3.setState({
                                error: true
                            });
                        } else {
                            _this3.setState({
                                error: false
                            });
                        }
                    }

                    _this3.getRequest();
                });
            }
        }, {
            key: "componentWillUnmount",
            value: function componentWillUnmount() {
                this.outPackage && this.outPackage.remove();
                this.backPackage && this.backPackage.remove();
                this._deviceNameChangedListener && this._deviceNameChangedListener.remove();
            }
        }, {
            key: "render",
            value: function render() {
                var _this4 = this;

                var scale = this.state.scaleValue.interpolate({
                    inputRange: [0, 50, 100],
                    outputRange: [0.88, 1, 0.88]
                });
                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: style.container
                    },
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: style.overTimeBox
                        },
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: style.overTime
                            },
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: style.overTimeText
                                },
                                !this.state.status ? isCN ? this.state.overTimeText : this.state.overTimeTextEn : (isCN ? this.state.overTimeAfter : this.state.overTimeAfterEn) + this.state.time + (isCN ? this.state.overTimeBefor : this.state.overTimeBeforEn)
                            )
                        )
                    ),
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: {
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: height * .05,
                                marginTop: -height * .01,
                                padding: 0,
                                position: 'relative'
                            }
                        },
                        _react2.default.createElement(Progress.Circle, {
                            size: this.state.circleSize,
                            width: this.state.circleSize,
                            height: this.state.circleSize,
                            thickness: 20,
                            borderRadius: 10,
                            strokeCap: this.state.status && this.state.count > 0 ? 'round' : 'butt',
                            progress: this.state.status ? this.state.count / this.state.max * 100 / 100 : 0,
                            borderWidth: 0,
                            unfilledColor: 'rgba(255,255,255,.3)',
                            color: "#fff"
                        }),
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: style.timeContainer
                            },
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: style.timeLable
                                },
                                this.state.count
                            ),
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: style.unitLable
                                },
                                "min"
                            )
                        ),
                        _react2.default.createElement(_reactNative.Animated.View, {
                            style: [style.timeBeContainer0, {
                                transform: [{
                                    scale: scale
                                }],
                                opacity: this.state.o
                            }]
                        }),
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: style.timeBeContainerCircle
                            },
                            _react2.default.createElement(
                                _reactNativeSvg2.default,
                                {
                                    height: this.state.svgSize,
                                    width: this.state.svgSize
                                },
                                _react2.default.createElement(_reactNativeSvg.Circle, {
                                    cx: this.state.svgCircleSize,
                                    cy: this.state.svgCircleSize,
                                    r: this.state.svgCircleR[0],
                                    stroke: this.state.svgCircleStroke,
                                    strokeWidth: this.state.svgCircleBorder,
                                    fill: this.state.svgCircleFill
                                })
                            )
                        ),
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: style.timeBeContainerCircle
                            },
                            _react2.default.createElement(
                                _reactNativeSvg2.default,
                                {
                                    height: this.state.svgSize,
                                    width: this.state.svgSize
                                },
                                _react2.default.createElement(_reactNativeSvg.Circle, {
                                    cx: this.state.svgCircleSize,
                                    cy: this.state.svgCircleSize,
                                    r: this.state.svgCircleR[1],
                                    stroke: this.state.svgCircleStroke,
                                    strokeWidth: this.state.svgCircleBorder,
                                    fill: this.state.svgCircleFill
                                })
                            )
                        ),
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: style.timeBeContainerCircle
                            },
                            _react2.default.createElement(
                                _reactNativeSvg2.default,
                                {
                                    height: this.state.svgSize,
                                    width: this.state.svgSize
                                },
                                _react2.default.createElement(_reactNativeSvg.Circle, {
                                    cx: this.state.svgCircleSize,
                                    cy: this.state.svgCircleSize,
                                    r: this.state.svgCircleR[2],
                                    stroke: this.state.svgCircleStroke,
                                    strokeWidth: this.state.svgCircleBorder,
                                    fill: this.state.svgCircleFill
                                })
                            )
                        ),
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: style.timeBeContainerCircle
                            },
                            _react2.default.createElement(
                                _reactNativeSvg2.default,
                                {
                                    height: this.state.svgSize,
                                    width: this.state.svgSize
                                },
                                _react2.default.createElement(_reactNativeSvg.Circle, {
                                    cx: this.state.svgCircleSize,
                                    cy: this.state.svgCircleSize,
                                    r: this.state.svgCircleR[3],
                                    stroke: this.state.svgCircleStroke,
                                    strokeWidth: this.state.svgCircleBorder,
                                    fill: this.state.svgCircleFill
                                })
                            )
                        ),
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: style.timeBeContainerCircle
                            },
                            _react2.default.createElement(
                                _reactNativeSvg2.default,
                                {
                                    height: this.state.svgSize,
                                    width: this.state.svgSize
                                },
                                _react2.default.createElement(_reactNativeSvg.Circle, {
                                    cx: this.state.svgCircleSize,
                                    cy: this.state.svgCircleSize,
                                    r: this.state.svgCircleR[4],
                                    stroke: this.state.svgCircleStroke,
                                    strokeWidth: this.state.svgCircleBorder,
                                    fill: this.state.svgCircleFill
                                })
                            )
                        ),
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: style.timeBeContainerCircle
                            },
                            _react2.default.createElement(
                                _reactNativeSvg2.default,
                                {
                                    height: this.state.svgSize,
                                    width: this.state.svgSize
                                },
                                _react2.default.createElement(_reactNativeSvg.Circle, {
                                    cx: this.state.svgCircleSize,
                                    cy: this.state.svgCircleSize,
                                    r: this.state.svgCircleR[5],
                                    stroke: this.state.svgCircleStroke,
                                    strokeWidth: this.state.svgCircleBorder,
                                    fill: this.state.svgCircleFill
                                })
                            )
                        ),
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: style.timeBeContainerCircle
                            },
                            _react2.default.createElement(
                                _reactNativeSvg2.default,
                                {
                                    height: this.state.svgSize,
                                    width: this.state.svgSize
                                },
                                _react2.default.createElement(_reactNativeSvg.Circle, {
                                    cx: this.state.svgCircleSize,
                                    cy: this.state.svgCircleSize,
                                    r: this.state.svgCircleR[6],
                                    stroke: this.state.svgCircleStroke,
                                    strokeWidth: this.state.svgCircleBorder,
                                    fill: this.state.svgCircleFill
                                })
                            )
                        ),
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: style.timeBeContainerCircle
                            },
                            _react2.default.createElement(
                                _reactNativeSvg2.default,
                                {
                                    height: this.state.svgSize,
                                    width: this.state.svgSize
                                },
                                _react2.default.createElement(_reactNativeSvg.Circle, {
                                    cx: this.state.svgCircleSize,
                                    cy: this.state.svgCircleSize,
                                    r: this.state.svgCircleR[7],
                                    stroke: this.state.svgCircleStroke,
                                    strokeWidth: this.state.svgCircleBorder,
                                    fill: this.state.svgCircleFill
                                })
                            )
                        ),
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: style.timeBeContainerCircle
                            },
                            _react2.default.createElement(
                                _reactNativeSvg2.default,
                                {
                                    height: this.state.svgSize,
                                    width: this.state.svgSize
                                },
                                _react2.default.createElement(_reactNativeSvg.Circle, {
                                    cx: this.state.svgCircleSize,
                                    cy: this.state.svgCircleSize,
                                    r: this.state.svgCircleR[8],
                                    stroke: this.state.svgCircleStroke,
                                    strokeWidth: this.state.svgCircleBorder,
                                    fill: this.state.svgCircleFill
                                })
                            )
                        ),
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: style.timeBeContainerCircle
                            },
                            _react2.default.createElement(
                                _reactNativeSvg2.default,
                                {
                                    height: this.state.svgSize,
                                    width: this.state.svgSize
                                },
                                _react2.default.createElement(_reactNativeSvg.Circle, {
                                    cx: this.state.svgCircleSize,
                                    cy: this.state.svgCircleSize,
                                    r: this.state.svgCircleR[9],
                                    stroke: this.state.svgCircleStroke,
                                    strokeWidth: this.state.svgCircleBorder,
                                    fill: this.state.svgCircleFill
                                })
                            )
                        )
                    ),
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: style.rowContainer
                        },
                        _react2.default.createElement(
                            _reactNative.Text,
                            {
                                style: style.tabLable,
                                onPress: function onPress() {
                                    return _this4.goToSelect();
                                }
                            },
                            this.state.getParam <= 0 ? isCN ? this.state.selectText : this.state.selectTextEn : isCN ? this.state.getParamText : this.state.getParamTextEn
                        )
                    ),
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: style.rowContainer
                        },
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: style.butBox
                            },
                            _react2.default.createElement(
                                _reactNative.TouchableOpacity,
                                {
                                    style: [style.butIcon, {
                                        backgroundColor: this.state.status ? 'rgba(255,255,255,.30000000000000)' : 'transparent'
                                    }],
                                    onPress: function onPress() {
                                        return _this4.setRun();
                                    },
                                    onPressIn: function onPressIn() {
                                        return _this4.setClickLock();
                                    },
                                    onPressOut: function onPressOut() {
                                        return _this4.outRun();
                                    }
                                },
                                _react2.default.createElement(_reactNative.Image, {
                                    style: {
                                        width: 30,
                                        height: 30
                                    },
                                    source: this.state.statusImg
                                }),
                                _react2.default.createElement(
                                    _reactNative.View,
                                    {
                                        style: style.buttonCircle
                                    },
                                    _react2.default.createElement(
                                        _reactNativeSvg2.default,
                                        {
                                            height: 64,
                                            width: 64
                                        },
                                        _react2.default.createElement(_reactNativeSvg.Circle, {
                                            cx: 32,
                                            cy: 32,
                                            r: 29,
                                            stroke: '#fff',
                                            strokeWidth: 1.3,
                                            fill: 'transparent'
                                        })
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: style.butLable,
                                    onPress: function onPress() {
                                        return _this4.setRun();
                                    },
                                    onPressIn: function onPressIn() {
                                        return _this4.setClickLock();
                                    },
                                    onPressOut: function onPressOut() {
                                        return _this4.outRun();
                                    }
                                },
                                devieStatus ? isCN ? this.state.offText : this.state.offTextEn : isCN ? this.state.onText : this.state.onTextEn
                            )
                        ),
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: style.butBox
                            },
                            _react2.default.createElement(
                                _reactNative.TouchableOpacity,
                                {
                                    style: style.butIcon,
                                    onPress: function onPress() {
                                        return _this4.setReduceNum();
                                    },
                                    onPressIn: function onPressIn() {
                                        return _this4.setClickLock();
                                    },
                                    delayLongPress: 1000,
                                    onLongPress: function onLongPress() {
                                        return _this4.setLongReduceNum();
                                    },
                                    onPressOut: function onPressOut() {
                                        return _this4.longOut();
                                    }
                                },
                                _react2.default.createElement(_reactNative.Image, {
                                    style: {
                                        width: 30,
                                        height: 30
                                    },
                                    source: this.state.reduceImg
                                }),
                                _react2.default.createElement(
                                    _reactNative.View,
                                    {
                                        style: style.buttonCircle
                                    },
                                    _react2.default.createElement(
                                        _reactNativeSvg2.default,
                                        {
                                            height: 64,
                                            width: 64
                                        },
                                        _react2.default.createElement(_reactNativeSvg.Circle, {
                                            cx: 32,
                                            cy: 32,
                                            r: 29,
                                            stroke: '#fff',
                                            strokeWidth: 1.3,
                                            fill: 'transparent'
                                        })
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: style.butLable,
                                    onPress: function onPress() {
                                        return _this4.setReduceNum();
                                    },
                                    onPressIn: function onPressIn() {
                                        return _this4.setClickLock();
                                    },
                                    delayLongPress: 1000,
                                    onLongPress: function onLongPress() {
                                        return _this4.setLongReduceNum();
                                    },
                                    onPressOut: function onPressOut() {
                                        return _this4.longOut();
                                    }
                                },
                                isCN ? this.state.reduceText : this.state.reduceTextEn
                            )
                        ),
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: style.butBox
                            },
                            _react2.default.createElement(
                                _reactNative.TouchableOpacity,
                                {
                                    style: style.butIcon,
                                    onPress: function onPress() {
                                        return _this4.setPlusNum();
                                    },
                                    onPressIn: function onPressIn() {
                                        return _this4.setClickLock();
                                    },
                                    delayLongPress: 1000,
                                    onLongPress: function onLongPress() {
                                        return _this4.setLongPlusNum();
                                    },
                                    onPressOut: function onPressOut() {
                                        return _this4.longOut();
                                    }
                                },
                                _react2.default.createElement(_reactNative.Image, {
                                    style: {
                                        width: 30,
                                        height: 30
                                    },
                                    source: this.state.plusImg
                                }),
                                _react2.default.createElement(
                                    _reactNative.View,
                                    {
                                        style: style.buttonCircle
                                    },
                                    _react2.default.createElement(
                                        _reactNativeSvg2.default,
                                        {
                                            height: 64,
                                            width: 64
                                        },
                                        _react2.default.createElement(_reactNativeSvg.Circle, {
                                            cx: 32,
                                            cy: 32,
                                            r: 29,
                                            stroke: '#fff',
                                            strokeWidth: 1.3,
                                            fill: 'transparent'
                                        })
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: style.butLable,
                                    onPress: function onPress() {
                                        return _this4.setPlusNum();
                                    },
                                    onPressIn: function onPressIn() {
                                        return _this4.setClickLock();
                                    },
                                    delayLongPress: 1000,
                                    onPressOut: function onPressOut() {
                                        return _this4.longOut();
                                    },
                                    onLongPress: function onLongPress() {
                                        return _this4.setLongPlusNum();
                                    }
                                },
                                isCN ? this.state.plusText : this.state.plusTextEn
                            )
                        )
                    ),
                    _react2.default.createElement(_Dialog.MessageDialog, {
                        visible: this.state.visMessage,
                        message: isCN ? this.state.closeOneMin : this.state.closeOneMinEn,
                        buttons: [{
                            text: isCN ? this.state.buttonText : this.state.buttonTextEn,
                            callback: function callback(_) {
                                return _this4.setState({
                                    visMessage: false
                                });
                            }
                        }]
                    }),
                    _react2.default.createElement(_Dialog.MessageDialog, {
                        visible: this.state.error,
                        message: isCN ? this.state.dialogErrorText : this.state.dialogErrorTextEn,
                        buttons: [{
                            text: isCN ? this.state.buttonText : this.state.buttonTextEn,
                            callback: function callback(_) {
                                return _this4.setState({
                                    error: false
                                });
                            }
                        }]
                    })
                );
            }
        }]);
        return App;
    }(_react2.default.Component);

    exports.default = App;

    _miot.Package.entry(App, function () {});

    var style = _reactNative.StyleSheet.create({
        navigate: {
            backgroundColor: 'transparent'
        },
        container: {
            width: width,
            height: height - 90,
            backgroundColor: '#0892fe',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flex: 1
        },
        rowContainer: {
            height: 5,
            alignSelf: 'stretch',
            flexDirection: 'row',
            paddingLeft: 23,
            paddingRight: 23,
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1
        },
        timeContainer: {
            position: 'absolute',
            borderWidth: 20,
            borderColor: 'rgba(255,255,255,0)',
            borderRadius: maxWidth / 2,
            width: maxWidth * .78,
            height: maxWidth * .78,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        timeBeContainer: {
            opacity: 0.3,
            position: 'absolute',
            borderWidth: 20,
            borderColor: 'rgba(255,255,255,0)',
            borderRadius: maxWidth / 2,
            width: maxWidth * .77,
            height: maxWidth * .77
        },
        timeBeContainer0: {
            opacity: 0,
            position: 'absolute',
            borderWidth: 1,
            borderColor: '#fff',
            borderRadius: maxWidth / 2,
            width: maxWidth * .78,
            height: maxWidth * .78
        },
        timeBeContainerCircle: {
            position: 'absolute'
        },
        buttonCircle: {
            position: 'absolute'
        },
        tabLable: {
            marginLeft: 5,
            marginRight: 5,
            paddingTop: 5,
            paddingBottom: 5,
            fontSize: 18,
            width: width,
            textAlign: 'center',
            color: '#fff'
        },
        timeLable: babelHelpers.extends({
            marginLeft: 5,
            marginRight: 5,
            color: '#fff',
            width: width * .45,
            textAlign: 'center'
        }, {
            lineHeight: maxWidth < 359 ? maxWidth * .15 : 58,
            fontSize: maxWidth < 359 ? maxWidth * .15 : 58
        }),
        unitLable: babelHelpers.extends({
            marginLeft: 5,
            marginRight: 5,
            color: '#fff',
            width: width * .45,
            textAlign: 'center'
        }, {
            lineHeight: maxWidth < 359 ? maxWidth * .08 : 32,
            fontSize: maxWidth < 359 ? maxWidth * .08 : 32
        }),
        butBox: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            height: 60
        },
        butIcon: {
            alignItems: 'center',
            justifyContent: 'center',
            height: 60,
            width: 60,
            borderRadius: 30,
            marginBottom: 15
        },
        butLable: {
            marginLeft: 20,
            marginRight: 20,
            width: 90,
            textAlign: 'center',
            fontSize: 14,
            color: '#fff'
        },
        list: {
            alignSelf: 'stretch'
        },
        title: {
            fontSize: 15,
            color: '#333333',
            alignItems: 'center',
            flex: 1
        },
        subArrow: {
            width: 7,
            height: 14
        },
        text: {
            color: '#fff'
        },
        content: {
            flex: .3,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 0,
            marginTop: 0,
            padding: 0
        },
        overTimeBox: {
            flex: 1,
            marginTop: height * .03,
            alignItems: 'center',
            justifyContent: 'flex-start'
        },
        overTime: {
            borderWidth: 1.3,
            borderColor: '#fff',
            borderRadius: height * .1,
            width: isCN ? 120 : width * .45,
            alignItems: 'center',
            justifyContent: 'center'
        },
        overTimeText: babelHelpers.extends({
            color: '#fff',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            textAlignVertical: 'center',
            width: width * .6
        }, {
            fontSize: maxWidth < 359 ? maxWidth * .015 : 14,
            lineHeight: maxWidth < 359 ? maxWidth * .03 : 26
        })
    });
},10007,[10297,10074,10010,10033,13636,11485,10755,10429,10019,10022,10025,10028,10031,10034,10037],"projects/com.coc.dryer.fdpsm/Page/MainPage.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _miot = _require(_dependencyMap[1]);

    var _reactNative = _require(_dependencyMap[2]);

    var _NavigationBar = _require(_dependencyMap[3]);

    var _NavigationBar2 = babelHelpers.interopRequireDefault(_NavigationBar);

    var _ui = _require(_dependencyMap[4]);

    var _Dialog = _require(_dependencyMap[5]);

    var _reactNativeSvg = _require(_dependencyMap[6]);

    var Dimensions = _require(_dependencyMap[7]);

    var _Dimensions$get = Dimensions.get("screen"),
        width = _Dimensions$get.width,
        height = _Dimensions$get.height;

    var param = 0;
    var classList = [];
    var valueList = [];
    var maxWidth = width;

    if (width > 450) {
        maxWidth = 450;
    }

    var language = _miot.Host.locale.language;
    var isCN = language == 'zh';
    var isDewatering = true;
    var defaultClass = isCN ? '棉质衬衫' : 'Cotton Shirt';

    var Selects = function (_React$Component) {
        babelHelpers.inherits(Selects, _React$Component);

        function Selects(props) {
            babelHelpers.classCallCheck(this, Selects);

            var _this = babelHelpers.possibleConstructorReturn(this, (Selects.__proto__ || Object.getPrototypeOf(Selects)).call(this, props));

            _this.setLikeAnimate = function () {
                return _reactNative.Animated.timing(_this.state.progressValue, {
                    toValue: 100,
                    duration: 100,
                    friction: 100,
                    easing: _reactNative.Easing.linear,
                    useNativeDriver: true
                });
            };

            _this.setAnimateStart = function () {
                _reactNative.Animated.loop(_this.setLikeAnimate()).start();
            };

            _this.setAnimateStop = function () {
                _reactNative.Animated.loop(_this.setLikeAnimate()).stop();

                _this.setState({
                    progressValue: new _reactNative.Animated.Value(0)
                });
            };

            _this.setTime = function (param) {
                return param;
            };

            _this._onPressButtonY = function () {
                _this.setState({
                    isDewatering: true
                });

                isDewatering = true;

                _this._onPressButtonDo();
            };

            _this._onPressButtonN = function () {
                _this.setState({
                    isDewatering: false
                });

                isDewatering = false;

                _this._onPressButtonDo();
            };

            _this._onPressButtonDo = function () {
                _this.setState({
                    visMessage: false
                });

                setTimeout(function () {
                    _this.selectData(defaultClass);
                }, 200);
            };

            _this.confirmProps = function () {
                _this.setState({
                    confirmImg: _require(_dependencyMap[8])
                });

                _this.props.navigation.popToTop();

                _reactNative.DeviceEventEmitter.emit("EventType", param);
            };

            _this.updateOneValue = function (data) {
                defaultClass = data.newValue;

                _this.setState({
                    param: data.newValue,
                    defaultClass: data.newValue
                });

                _this.selectData(data.newValue);
            };

            _this.formatData = function () {
                var mainList = _this.state.contentList;
                classList = [];
                valueList = [];

                for (var i = 0; i < mainList.length; i++) {
                    var mainName = isCN ? mainList[i].name : mainList[i].enName;
                    classList.push(mainName);

                    for (var v = 0; v < mainList[i].list.length; v++) {
                        var childName = isCN ? mainList[i].list[v].name : mainList[i].list[v].enName;
                        valueList.push(childName);
                    }
                }

                _this.setState({
                    classList: classList,
                    valueList: valueList
                });
            };

            _this.selectData = function (value) {
                var mainList = _this.state.contentList;

                for (var i = 0; i < mainList.length; i++) {
                    var mainName = isCN ? mainList[i].name : mainList[i].enName;

                    if (mainName == value) {
                        _this.setState({
                            defaultValue: isCN ? mainList[i].list[0].name : mainList[i].list[0].enName,
                            param: isDewatering ? mainList[i].list[0].value : mainList[i].list[0].noValue,
                            time: _this.setTime(isDewatering ? mainList[i].list[0].value : mainList[i].list[0].noValue)
                        });

                        param = mainList[i].list[0].value;
                    }

                    for (var v = 0; v < mainList[i].list.length; v++) {
                        var childName = isCN ? mainList[i].list[v].name : mainList[i].list[v].enName;

                        if (childName == value) {
                            _this.setState({
                                defaultClass: isCN ? mainList[i].name : mainList[i].enName,
                                defaultValue: isCN ? mainList[i].list[v].name : mainList[i].list[v].enName,
                                param: isDewatering ? mainList[i].list[v].value : mainList[i].list[v].noValue,
                                time: _this.setTime(isDewatering ? mainList[i].list[v].value : mainList[i].list[v].noValue),
                                confirmImg: mainList[i].list[v].value > 0 ? _this.state.confirmFocusImg : _this.state.confirmImg
                            });

                            param = isDewatering ? mainList[i].list[v].value : mainList[i].list[v].noValue;
                        }
                    }
                }
            };

            _this.state = {
                param: 0,
                visMessage: false,
                overTimeText: '待开机',
                overTimeTextEn: 'Standby',
                overTimeAfter: '约 ',
                overTimeAfterEn: 'Finish after ',
                overTimeBefor: ' min 完成',
                overTimeBeforEn: ' min',
                buttonText: '我知道了',
                buttonTextEn: 'OK',
                dialogTitle: '提示',
                dialogTitleEn: 'Attention',
                dialogMsg1: '1. 请确保衣物间留有一定空隙',
                dialogMsg2: '2. 请根据最厚的一件衣物，来选择相应时间',
                dialogMsg3: '3. 根据衣物是否已脱水，实际烘干时长会略有偏差',
                dialogMsgEn1: '1. Please make sure there is space between the clothes.',
                dialogMsgEn2: '2. According to the thickest piece of clothing, to choose the appropriate time.',
                dialogMsgEn3: '3. According to whether the clothes are dehydrated, the actual drying time will be slightly different.',
                isDewateringText: '衣物是否已脱水？',
                isDewateringTextEn: 'Is the clothing dehydrated?',
                BtnYesText: '是',
                BtnYesTextEn: 'Yes',
                BtnNoText: '否',
                BtnNoTextEn: 'No',
                visible: true,
                isDewatering: true,
                time: _this.setTime(0),
                defaultClass: isCN ? '上装' : 'Upperwear',
                defaultValue: isCN ? '棉质衬衫' : 'Cotton Shirt',
                classList: [''],
                valueList: [''],
                contentList: [{
                    id: 1,
                    name: '上装',
                    enName: 'Upperwear',
                    list: [{
                        id: 100,
                        name: '棉质衬衫',
                        enName: 'Cotton Shirt',
                        value: 120,
                        noValue: 150
                    }, {
                        id: 101,
                        name: '针织衫',
                        enName: 'Knit',
                        value: 150,
                        noValue: 180
                    }, {
                        id: 102,
                        name: '毛衣',
                        enName: 'Sweater',
                        value: 240,
                        noValue: 270
                    }, {
                        id: 103,
                        name: '卫衣',
                        enName: 'Fleece',
                        value: 240,
                        noValue: 270
                    }, {
                        id: 104,
                        name: '牛仔服',
                        enName: 'Cowboy Suit',
                        value: 240,
                        noValue: 270
                    }, {
                        id: 105,
                        name: '风衣',
                        enName: 'Dust Coat',
                        value: 240,
                        noValue: 270
                    }, {
                        id: 106,
                        name: '棉质运动服',
                        enName: 'Sportswear',
                        value: 210,
                        noValue: 240
                    }, {
                        id: 107,
                        name: 'T恤',
                        enName: 'T-shirt',
                        value: 80,
                        noValue: 100
                    }, {
                        id: 108,
                        name: 'POLO衫',
                        enName: 'Polo Shirt',
                        value: 90,
                        noValue: 120
                    }, {
                        id: 109,
                        name: '轻薄睡衣',
                        enName: 'Thin Pajamas',
                        value: 90,
                        noValue: 120
                    }, {
                        id: 110,
                        name: '纯棉睡衣',
                        enName: 'Pajamas',
                        value: 120,
                        noValue: 150
                    }]
                }, {
                    id: 2,
                    name: '下装',
                    enName: 'Bottoms',
                    list: [{
                        id: 200,
                        name: '牛仔裤',
                        enName: 'Jeans',
                        value: 120,
                        noValue: 180
                    }, {
                        id: 201,
                        name: '休闲裤',
                        enName: 'Casual Pants',
                        value: 120,
                        noValue: 150
                    }, {
                        id: 202,
                        name: '西裤',
                        enName: 'Suit Pants',
                        value: 120,
                        noValue: 150
                    }, {
                        id: 203,
                        name: '棉质运动裤',
                        enName: 'Sweatpants',
                        value: 150,
                        noValue: 180
                    }, {
                        id: 204,
                        name: '短裤',
                        enName: 'Shorts',
                        value: 90,
                        noValue: 120
                    }, {
                        id: 205,
                        name: '半身裙',
                        enName: 'Skirts',
                        value: 120,
                        noValue: 150
                    }, {
                        id: 206,
                        name: '连衣裙',
                        enName: 'Dress',
                        value: 150,
                        noValue: 180
                    }]
                }, {
                    id: 3,
                    name: '贴身衣物',
                    enName: 'Underclothes',
                    list: [{
                        id: 300,
                        name: '保暖内衣',
                        enName: 'Thermal',
                        value: 120,
                        noValue: 150
                    }, {
                        id: 301,
                        name: '文胸',
                        enName: 'Bra',
                        value: 120,
                        noValue: 150
                    }, {
                        id: 302,
                        name: '吊带背心',
                        enName: 'Camisole',
                        value: 60,
                        noValue: 70
                    }, {
                        id: 303,
                        name: '纯棉背心',
                        enName: 'Cotton Vest',
                        value: 90,
                        noValue: 120
                    }, {
                        id: 304,
                        name: '内裤',
                        enName: 'Underpants',
                        value: 60,
                        noValue: 70
                    }, {
                        id: 305,
                        name: '短款安全裤',
                        enName: 'Safety Pants',
                        value: 60,
                        noValue: 70
                    }, {
                        id: 306,
                        name: '棉质长袜',
                        enName: 'Stockings',
                        value: 90,
                        noValue: 120
                    }, {
                        id: 307,
                        name: '棉质短袜',
                        enName: 'Cotton Socks',
                        value: 90,
                        noValue: 120
                    }, {
                        id: 308,
                        name: '棉质过膝袜',
                        enName: 'Knee Socks',
                        value: 120,
                        noValue: 150
                    }, {
                        id: 309,
                        name: '毛线帽',
                        enName: 'Woolen Hat',
                        value: 150,
                        noValue: 180
                    }]
                }, {
                    id: 4,
                    name: '儿童衣物',
                    enName: 'Baby Clothes',
                    list: [{
                        id: 400,
                        name: '婴儿口水巾',
                        enName: 'Baby Towel',
                        value: 60,
                        noValue: 70
                    }, {
                        id: 401,
                        name: '棉质围兜',
                        enName: 'Baby Bib',
                        value: 60,
                        noValue: 70
                    }, {
                        id: 402,
                        name: '棉质尿布',
                        enName: 'Cotton Diaper',
                        value: 150,
                        noValue: 180
                    }, {
                        id: 403,
                        name: '婴儿连体衣',
                        enName: 'Baby Jumpsuit',
                        value: 120,
                        noValue: 180
                    }]
                }, {
                    id: 5,
                    name: '运动用品',
                    enName: 'Sport',
                    list: [{
                        id: 500,
                        name: '速干背心',
                        enName: 'Thin Vest',
                        value: 30,
                        noValue: 40
                    }, {
                        id: 501,
                        name: '速干运动服',
                        enName: 'Sports Shirt',
                        value: 60,
                        noValue: 70
                    }, {
                        id: 502,
                        name: '球服',
                        enName: 'Uniforms',
                        value: 90,
                        noValue: 120
                    }, {
                        id: 503,
                        name: '护具',
                        enName: 'Sports Safety',
                        value: 120,
                        noValue: 150
                    }]
                }, {
                    id: 6,
                    name: '居家用品',
                    enName: 'Home',
                    list: [{
                        id: 600,
                        name: '毛巾',
                        enName: 'Towel',
                        value: 120,
                        noValue: 150
                    }, {
                        id: 601,
                        name: '浴巾',
                        enName: 'Bath Towel',
                        value: 180,
                        noValue: 240
                    }, {
                        id: 602,
                        name: '枕套',
                        enName: 'Pillowslip',
                        value: 90,
                        noValue: 120
                    }, {
                        id: 603,
                        name: '床单',
                        enName: 'Bed Sheet',
                        value: 300,
                        noValue: 330
                    }, {
                        id: 604,
                        name: '被套',
                        enName: 'Quilt Cover',
                        value: 330,
                        noValue: 360
                    }, {
                        id: 604,
                        name: '袖套',
                        enName: 'Oversleeve',
                        value: 90,
                        noValue: 120
                    }, {
                        id: 604,
                        name: '围裙',
                        enName: 'Apron',
                        value: 90,
                        noValue: 120
                    }, {
                        id: 604,
                        name: '地板袜',
                        enName: 'Room Socks',
                        value: 180,
                        noValue: 210
                    }, {
                        id: 604,
                        name: '帆布袋',
                        enName: 'Canvas Bag',
                        value: 90,
                        noValue: 120
                    }]
                }],
                defaultIndexs: [0, 0],
                confirmImg: _require(_dependencyMap[9]),
                confirmFocusImg: _require(_dependencyMap[9]),
                confirmNullImg: _require(_dependencyMap[9]),
                progressValue: new _reactNative.Animated.Value(0),
                opacity: 0
            };
            return _this;
        }

        babelHelpers.createClass(Selects, [{
            key: "componentDidMount",
            value: function componentDidMount() {
                var _this2 = this;

                this.selectData(this.state.defaultValue);
                this.setState({
                    visMessage: true
                });
                this.subscription = _reactNative.DeviceEventEmitter.addListener("DewaterType", function (isDewater) {
                    if (isDewater === true || isDewater === false) {
                        _this2.setState({
                            isDewatering: isDewater
                        });

                        isDewatering = isDewater;
                    }
                });
                setTimeout(function () {
                    _this2.formatData();

                    _this2.selectData(_this2.state.defaultValue);
                }, 100);
            }
        }, {
            key: "render",
            value: function render() {
                var _this3 = this;

                var scale = this.state.progressValue.interpolate({
                    inputRange: [0, 100],
                    outputRange: [1, 1.3]
                });
                var opacity = this.state.progressValue.interpolate({
                    inputRange: [0, 50, 100],
                    outputRange: [1, 1, 0]
                });
                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: {
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignContent: 'center',
                            backgroundColor: '#0892fe'
                        }
                    },
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: style.overTimeBox
                        },
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: style.overTime
                            },
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: style.overTimeText
                                },
                                this.state.count <= 0 ? isCN ? this.state.overTimeText : this.state.overTimeTextEn : (isCN ? this.state.overTimeAfter : this.state.overTimeAfterEn) + this.state.time + (isCN ? this.state.overTimeBefor : this.state.overTimeBeforEn)
                            )
                        )
                    ),
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: style.spinner
                        },
                        _react2.default.createElement(_ui.StringSpinner, {
                            style: style.pickerStyle,
                            dataSource: this.state.classList,
                            textColor: "#ffffff",
                            defaultValue: this.state.defaultClass,
                            pickerInnerStyle: {
                                lineColor: "#ffffff",
                                textClolor: 'rgba(255,255,255,.8)',
                                selectTextColor: "#ffffff",
                                fontSize: 18,
                                selectFontSize: 18,
                                rowHeight: 40
                            },
                            onValueChanged: function onValueChanged(data) {
                                _this3.updateOneValue(data);
                            }
                        }),
                        _react2.default.createElement(_ui.StringSpinner, {
                            style: style.pickerStyle,
                            dataSource: this.state.valueList,
                            defaultValue: this.state.defaultValue,
                            textColor: "#ffffff",
                            pickerInnerStyle: {
                                lineColor: "#ffffff",
                                textClolor: 'rgba(255,255,255,.8)',
                                selectTextColor: "#ffffff",
                                fontSize: 18,
                                selectFontSize: 18,
                                rowHeight: 40
                            },
                            onValueChanged: function onValueChanged(data) {
                                _this3.updateOneValue(data);
                            }
                        })
                    ),
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: style.butBox
                        },
                        _react2.default.createElement(
                            _reactNative.TouchableOpacity,
                            {
                                style: style.butIcon,
                                onPress: function onPress() {
                                    return _this3.confirmProps();
                                }
                            },
                            _react2.default.createElement(_reactNative.Image, {
                                style: {
                                    width: 30,
                                    height: 30
                                },
                                source: this.state.confirmImg
                            }),
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: style.buttonCircle
                                },
                                _react2.default.createElement(
                                    _reactNativeSvg.Svg,
                                    {
                                        height: 64,
                                        width: 64
                                    },
                                    _react2.default.createElement(_reactNativeSvg.Circle, {
                                        cx: 32,
                                        cy: 32,
                                        r: 29,
                                        stroke: '#fff',
                                        strokeWidth: 1.3,
                                        fill: 'transparent'
                                    })
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: [style.spinner, {
                                marginTop: -28
                            }]
                        },
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: style.spinnerTexts
                            },
                            _react2.default.createElement(_reactNative.View, {
                                style: [style.spinnerTitle, {
                                    height: 10,
                                    borderTopWidth: 0.5,
                                    borderColor: '#fff'
                                }]
                            }),
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: style.spinnerTitle
                                },
                                isCN ? this.state.dialogTitle : this.state.dialogTitleEn
                            ),
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: style.spinnerText
                                },
                                isCN ? this.state.dialogMsg1 : this.state.dialogMsgEn1
                            ),
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: style.spinnerText
                                },
                                isCN ? this.state.dialogMsg2 : this.state.dialogMsgEn2
                            ),
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: style.spinnerText
                                },
                                isCN ? this.state.dialogMsg3 : this.state.dialogMsgEn3
                            )
                        )
                    ),
                    _react2.default.createElement(
                        _Dialog.AbstractDialog,
                        {
                            visible: this.state.visMessage,
                            title: isCN ? this.state.isDewateringText : this.state.isDewateringTextEn,
                            showTitle: false,
                            showSubtitle: false,
                            canDismiss: false,
                            style: {
                                fontSize: 18
                            },
                            buttons: [{
                                text: isCN ? this.state.BtnYesText : this.state.BtnYesTextEn,
                                style: {
                                    color: '#0892fe'
                                },
                                callback: function callback(_) {
                                    return _this3._onPressButtonY();
                                }
                            }, {
                                text: isCN ? this.state.BtnNoText : this.state.BtnNoTextEn,
                                style: {
                                    color: '#0892fe'
                                },
                                callback: function callback(_) {
                                    return _this3._onPressButtonN();
                                }
                            }],
                            onDismiss: false
                        },
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: {
                                    flex: 1,
                                    height: 60,
                                    borderTopLeftRadius: 10,
                                    borderTopEndRadius: 10,
                                    borderBottomWidth: 1,
                                    borderBottomColor: 'rgba(0,0,0,.1)',
                                    borderBottomStyle: 'solid',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }
                            },
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: {
                                        fontSize: 20
                                    }
                                },
                                isCN ? this.state.isDewateringText : this.state.isDewateringTextEn
                            )
                        )
                    )
                );
            }
        }]);
        return Selects;
    }(_react2.default.Component);

    Selects.navigationOptions = function (_ref) {
        var navigation = _ref.navigation;
        return {
            header: _react2.default.createElement(_NavigationBar2.default, {
                title: isCN ? '干衣时间' : 'Dryer time',
                backgroundColor: "#0892fe",
                type: _NavigationBar2.default.TYPE.DARK,
                left: [{
                    key: _NavigationBar2.default.ICON.BACK,
                    onPress: function onPress() {
                        navigation.goBack();
                    }
                }],
                onPressTitle: function onPressTitle() {
                    console.log('onPressTitle');
                }
            })
        };
    };

    exports.default = Selects;

    var style = _reactNative.StyleSheet.create({
        navigate: {
            backgroundColor: 'transparent'
        },
        container: {
            width: width,
            height: height - 90,
            backgroundColor: '#0892fe',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flex: 1
        },
        rowContainer: {
            height: 5,
            alignSelf: 'stretch',
            flexDirection: 'row',
            paddingLeft: 23,
            paddingRight: 23,
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1
        },
        timeContainer: {
            position: 'absolute',
            borderWidth: 20,
            borderColor: 'rgba(255,255,255,0)',
            borderRadius: 150,
            width: 250,
            height: 250,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        timeBeContainer: {
            opacity: 0.3,
            position: 'absolute',
            borderWidth: 20,
            borderColor: 'rgba(255,255,255,0)',
            borderRadius: 150,
            width: 250,
            height: 250
        },
        timeBeContainer0: {
            opacity: 0,
            position: 'absolute',
            borderWidth: 1,
            borderColor: '#fff',
            borderRadius: 160,
            width: 309,
            height: 309
        },
        timeBeContainerCircle: {
            position: 'absolute'
        },
        buttonCircle: {
            position: 'absolute'
        },
        tabLable: {
            marginLeft: 5,
            marginRight: 5,
            color: '#fff'
        },
        timeLable: {
            marginLeft: 5,
            marginRight: 5,
            color: '#fff',
            lineHeight: 68,
            fontSize: 68
        },
        unitLable: {
            marginLeft: 5,
            marginRight: 5,
            color: '#fff',
            lineHeight: 42,
            fontSize: 42
        },
        butBox: {
            flex: 1.5,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 50
        },
        butIcon: {
            alignItems: 'center',
            justifyContent: 'center',
            height: 60,
            width: 60,
            borderRadius: 30,
            marginBottom: 15
        },
        butLable: {
            marginLeft: 20,
            marginRight: 20,
            fontSize: 14,
            color: '#fff'
        },
        list: {
            alignSelf: 'stretch'
        },
        title: {
            fontSize: 15,
            color: '#333333',
            alignItems: 'center',
            flex: 1
        },
        subArrow: {
            width: 7,
            height: 14
        },
        text: {
            color: '#fff'
        },
        content: {
            flex: .3,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 0,
            marginTop: 0,
            padding: 0
        },
        overTimeBox: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
        },
        overTime: {
            borderWidth: 1,
            borderColor: '#ffffff',
            backgroundColor: '#ffffff',
            borderRadius: 16,
            width: isCN ? 130 : 150,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
        },
        overTimeText: babelHelpers.extends({
            color: '#0892fe',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            textAlignVertical: 'center',
            width: 200
        }, {
            fontSize: maxWidth < 359 ? maxWidth * .015 : 14,
            lineHeight: maxWidth < 359 ? maxWidth * .03 : 26
        }),
        pickerStyle: {
            width: 120,
            height: 200,
            marginRight: 0,
            backgroundColor: 'transparent'
        },
        spinner: {
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
            marginTop: 0
        },
        spinnerTexts: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignContent: 'center',
            width: maxWidth * .9,
            marginLeft: 20,
            marginRight: 20,
            marginTop: -40,
            borderColor: '#ffffff',
            borderRadius: 10
        },
        spinnerTitle: {
            fontSize: 16,
            color: '#FFFFFF',
            width: maxWidth * .85,
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 5,
            borderColor: '#ffffff',
            borderRadius: 10,
            paddingLeft: 10,
            paddingRight: 10
        },
        spinnerText: babelHelpers.extends({
            color: '#fff',
            width: maxWidth * .85,
            marginLeft: 10,
            marginRight: 10,
            paddingLeft: 10,
            paddingRight: 10
        }, {
            fontSize: 12
        }),
        zoomAnimate: babelHelpers.extends({
            position: 'absolute',
            width: isCN ? 130 : 150,
            zIndex: -1,
            borderRadius: 16,
            backgroundColor: 'rgba(255,255,255,.5)'
        }, {
            lineHeight: maxWidth < 359 ? maxWidth * .03 : 28
        })
    });
},10010,[10297,10074,10033,10719,10230,10755,11485,10429,10013,10016],"projects/com.coc.dryer.fdpsm/Page/Select.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.coc.dryer.fdpsm/Resources/dryer",
    "width": 114,
    "height": 115,
    "scales": [1],
    "hash": "526643f86595fe8fd02f750de6d4875f",
    "name": "confirm-focus",
    "type": "png"
  });
},10013,[10420],"projects/com.coc.dryer.fdpsm/Resources/dryer/confirm-focus.png");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.coc.dryer.fdpsm/Resources/dryer",
    "width": 970,
    "height": 970,
    "scales": [1],
    "hash": "facbc9783517eb7e0b2bcca7e8e4f829",
    "name": "select-big",
    "type": "png"
  });
},10016,[10420],"projects/com.coc.dryer.fdpsm/Resources/dryer/select-big.png");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.coc.dryer.fdpsm/Resources/dryer",
    "width": 970,
    "height": 970,
    "scales": [1],
    "hash": "13a50281d921034f4a6775b08f01eceb",
    "name": "switch-big",
    "type": "png"
  });
},10019,[10420],"projects/com.coc.dryer.fdpsm/Resources/dryer/switch-big.png");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.coc.dryer.fdpsm/Resources/dryer",
    "width": 970,
    "height": 970,
    "scales": [1],
    "hash": "75fb8341e967ba6452db58438a442c31",
    "name": "plus-big",
    "type": "png"
  });
},10022,[10420],"projects/com.coc.dryer.fdpsm/Resources/dryer/plus-big.png");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.coc.dryer.fdpsm/Resources/dryer",
    "width": 970,
    "height": 970,
    "scales": [1],
    "hash": "75ddf4554639a472794f6736d288b9b9",
    "name": "reduce-big",
    "type": "png"
  });
},10025,[10420],"projects/com.coc.dryer.fdpsm/Resources/dryer/reduce-big.png");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.coc.dryer.fdpsm/Resources/raw",
    "scales": [1],
    "hash": "8750290ae058dcd10b368ccd46bbc2a4",
    "name": "license_zh",
    "type": "html"
  });
},10028,[10420],"projects/com.coc.dryer.fdpsm/Resources/raw/license_zh.html");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.coc.dryer.fdpsm/Resources/raw",
    "scales": [1],
    "hash": "b99791bff238ad556f10ec08e31642f3",
    "name": "license_en",
    "type": "html"
  });
},10031,[10420],"projects/com.coc.dryer.fdpsm/Resources/raw/license_en.html");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.coc.dryer.fdpsm/Resources/raw",
    "scales": [1],
    "hash": "0d3c73476697d13de5ff11122fda0d85",
    "name": "privacy_zh",
    "type": "html"
  });
},10034,[10420],"projects/com.coc.dryer.fdpsm/Resources/raw/privacy_zh.html");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.coc.dryer.fdpsm/Resources/raw",
    "scales": [1],
    "hash": "63c68dffe26798a07bcaa4b80b527992",
    "name": "privacy_en",
    "type": "html"
  });
},10037,[10420],"projects/com.coc.dryer.fdpsm/Resources/raw/privacy_en.html");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _resources = _require(_dependencyMap[0]);

    var _CommonSetting = _require(_dependencyMap[1]);

    var _CommonSetting2 = _require(_dependencyMap[2]);

    var _ListItem = _require(_dependencyMap[3]);

    var _Separator = _require(_dependencyMap[4]);

    var _Separator2 = babelHelpers.interopRequireDefault(_Separator);

    var _NavigationBar = _require(_dependencyMap[5]);

    var _NavigationBar2 = babelHelpers.interopRequireDefault(_NavigationBar);

    var _react = _require(_dependencyMap[6]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[7]);

    var _miot = _require(_dependencyMap[8]);

    var first_options = _CommonSetting.SETTING_KEYS.first_options,
        second_options = _CommonSetting.SETTING_KEYS.second_options;
    var language = _miot.Host.locale.language;
    var isCN = language == 'zh';

    var Setting = function (_React$Component) {
        babelHelpers.inherits(Setting, _React$Component);

        function Setting(props, context) {
            babelHelpers.classCallCheck(this, Setting);

            var _this = babelHelpers.possibleConstructorReturn(this, (Setting.__proto__ || Object.getPrototypeOf(Setting)).call(this, props, context));

            _this.state = {
                deleteDeviceMsg: '真的要删除？你不再考虑考虑？',
                deleteDeviceMsgEn: 'Delete the device, are you sure?',
                sliderValue: 25,
                switchValue: false,
                name: _miot.Device.name,
                showDot: []
            };
            return _this;
        }

        babelHelpers.createClass(Setting, [{
            key: "render",
            value: function render() {
                var firstOptions = [first_options.SHARE];
                var secondOptions = [second_options.AUTO_UPGRADE, second_options.TIMEZONE];
                var extraOptions = {
                    showUpgrade: true,
                    upgradePageKey: 'FirmwareUpgrade',
                    licenseUrl: isCN ? _require(_dependencyMap[9]) : _require(_dependencyMap[10]),
                    policyUrl: isCN ? _require(_dependencyMap[11]) : _require(_dependencyMap[12]),
                    deleteDeviceMessage: isCN ? this.deleteDeviceMsg : this.deleteDeviceMsgEn,
                    excludeRequiredOptions: [_CommonSetting2.secondAllOptions.SECURITY]
                };
                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: styles.container
                    },
                    _react2.default.createElement(_Separator2.default, null),
                    _react2.default.createElement(
                        _reactNative.ScrollView,
                        {
                            showsVerticalScrollIndicator: false
                        },
                        _react2.default.createElement(_CommonSetting.CommonSetting, {
                            navigation: this.props.navigation,
                            firstOptions: firstOptions,
                            secondOptions: secondOptions,
                            extraOptions: extraOptions
                        }),
                        _react2.default.createElement(_reactNative.View, {
                            style: {
                                height: 20
                            }
                        })
                    )
                );
            }
        }, {
            key: "onValueChange",
            value: function onValueChange(value) {
                console.log(value);
            }
        }, {
            key: "onSlidingComplete",
            value: function onSlidingComplete(value) {
                console.log(value);
            }
        }, {
            key: "componentDidMount",
            value: function componentDidMount() {
                var _this2 = this;

                setTimeout(function (_) {
                    return _this2.setState({
                        switchValue: true,
                        sliderValue: 75,
                        showDot: [first_options.FIRMWARE_UPGRADE]
                    });
                }, 2000);
            }
        }]);
        return Setting;
    }(_react2.default.Component);

    Setting.navigationOptions = function (_ref) {
        var navigation = _ref.navigation;
        return {
            header: _react2.default.createElement(_NavigationBar2.default, {
                title: _resources.strings.setting,
                backgroundColor: "#fff",
                left: [{
                    key: _NavigationBar2.default.ICON.BACK,
                    onPress: function onPress() {
                        navigation.goBack();
                    }
                }],
                onPressTitle: function onPressTitle() {
                    console.log('onPressTitle');
                }
            })
        };
    };

    exports.default = Setting;

    var styles = _reactNative.StyleSheet.create({
        container: {
            backgroundColor: _resources.Styles.common.backgroundColor,
            flex: 1
        },
        featureSetting: {
            backgroundColor: '#fff'
        },
        blank: {
            height: 8,
            backgroundColor: _resources.Styles.common.backgroundColor,
            borderTopColor: _resources.Styles.common.hairlineColor,
            borderTopWidth: _reactNative.StyleSheet.hairlineWidth,
            borderBottomColor: _resources.Styles.common.hairlineColor,
            borderBottomWidth: _reactNative.StyleSheet.hairlineWidth
        },
        titleContainer: {
            height: 32,
            backgroundColor: '#fff',
            justifyContent: 'center',
            paddingLeft: _resources.Styles.common.padding
        },
        title: {
            fontSize: 11,
            color: 'rgba(0,0,0,0.5)',
            lineHeight: 14
        }
    });
},10040,[10077,10353,10326,10338,10332,10719,10297,10033,10074,10028,10031,10034,10037],"projects/com.coc.dryer.fdpsm/Page/Setting.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _miot = _require(_dependencyMap[0]);

    var _TitleBar = _require(_dependencyMap[1]);

    var _TitleBar2 = babelHelpers.interopRequireDefault(_TitleBar);

    var _react = _require(_dependencyMap[2]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[3]);

    var RPCControl = function (_React$Component) {
        babelHelpers.inherits(RPCControl, _React$Component);

        function RPCControl(props, context) {
            babelHelpers.classCallCheck(this, RPCControl);

            var _this = babelHelpers.possibleConstructorReturn(this, (RPCControl.__proto__ || Object.getPrototypeOf(RPCControl)).call(this, props, context));

            _this.state = {
                requestStatus: false,
                method: '',
                params: {},
                extra: {},
                paramsString: '',
                extraString: {},
                result: 'None'
            };
            return _this;
        }

        babelHelpers.createClass(RPCControl, [{
            key: "componentDidMount",
            value: function componentDidMount() {}
        }, {
            key: "componentWillUnmount",
            value: function componentWillUnmount() {}
        }, {
            key: "render",
            value: function render() {
                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: styles.containerAll
                    },
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: styles.menu
                        },
                        _react2.default.createElement(
                            _reactNative.Text,
                            null,
                            "\u9ED8\u8BA4\u6307\u4EE4"
                        ),
                        _react2.default.createElement(_reactNative.Button, {
                            style: styles.btn,
                            title: "\u6E05\u7A7A",
                            onPress: this.clearParams.bind(this)
                        }),
                        _react2.default.createElement(_reactNative.Button, {
                            style: styles.btn,
                            title: "\u95F9\u949F \u5C5E\u6027",
                            onPress: this.setParamsTo_alarm_ops.bind(this)
                        }),
                        _react2.default.createElement(_reactNative.Button, {
                            style: styles.btn,
                            title: "\u95F9\u949F \u5012\u8BA1\u65F6",
                            onPress: this.setParamsTo_get_count_down.bind(this)
                        }),
                        _react2.default.createElement(_reactNative.Button, {
                            style: styles.btn,
                            title: "\u5B9C\u5BB6\u706F \u5C5E\u6027",
                            onPress: this.setPramsTo_light_props.bind(this)
                        }),
                        _react2.default.createElement(_reactNative.Button, {
                            style: styles.btn,
                            title: "\u5F00\u5173",
                            onPress: this.setPramsTo_light_toggle.bind(this)
                        })
                    ),
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: styles.main
                        },
                        _react2.default.createElement(
                            _reactNative.Text,
                            null,
                            "Main"
                        ),
                        _react2.default.createElement(_reactNative.TextInput, {
                            style: styles.input,
                            placeholder: "method",
                            value: this.state.method,
                            onChange: this.onMethodTextRChanged.bind(this)
                        }),
                        _react2.default.createElement(_reactNative.TextInput, {
                            style: styles.input,
                            placeholder: "extra \u53EF\u4EE5\u4E3A\u7A7A",
                            value: this.state.extraString,
                            onChange: this.onExtraTextBChanged.bind(this)
                        }),
                        _react2.default.createElement(_reactNative.TextInput, {
                            style: [styles.input, styles.area],
                            placeholder: "params String",
                            value: this.state.paramsString,
                            multiline: true,
                            numberOfLines: 10,
                            onChange: this.onParamsTextGChanged.bind(this)
                        }),
                        _react2.default.createElement(_reactNative.Button, {
                            style: styles.btn,
                            title: "\u53D1\u9001\u666E\u901A\u6307\u4EE4",
                            onPress: this.sendRequest.bind(this)
                        }),
                        _react2.default.createElement(_reactNative.Button, {
                            style: styles.btn,
                            title: "\u53D1\u9001Remote\u6307\u4EE4",
                            onPress: this.sendRemoteRequest.bind(this)
                        }),
                        _react2.default.createElement(
                            _reactNative.Text,
                            null,
                            "result: "
                        ),
                        _react2.default.createElement(
                            _reactNative.Text,
                            null,
                            this.state.result
                        )
                    )
                );
            }
        }, {
            key: "sendRequest",
            value: function sendRequest() {
                var _this2 = this;

                var params = this.state.params;
                var method = this.state.method;
                var extra = this.state.extra;

                if (method == '') {
                    alert('method 不能为空');
                    return;
                }

                console.log('extra', extra);
                alert(JSON.stringify(method + ':' + params + ':' + extra));

                _miot.Device.getDeviceWifi().callMethod('power', ['on']).then(function (res) {
                    var result = JSON.stringify(res);

                    _this2.setState({
                        result: result
                    });

                    alert('成功 ' + result);
                }).catch(function (err) {
                    console.log('error:', err);
                    var result = JSON.stringify(err);
                    result = "Error: \n" + result;

                    _this2.setState({
                        result: result
                    });

                    alert('失败 ' + result);
                });
            }
        }, {
            key: "sendRemoteRequest",
            value: function sendRemoteRequest() {
                var _this3 = this;

                var params = this.state.params;
                var method = this.state.method;
                var extra = this.state.extra;

                if (method == '') {
                    alert('method 不能为空');
                    return;
                }

                _miot.Device.getDeviceWifi().callMethodFromCloud(method, params).then(function (res) {
                    var result = JSON.stringify(res);

                    _this3.setState({
                        result: result
                    });
                }).catch(function (err) {
                    var result = JSON.stringify(err);
                    result = "Error: \n" + result;

                    _this3.setState({
                        result: result
                    });
                });
            }
        }, {
            key: "clearParams",
            value: function clearParams() {
                this.setState({
                    params: {},
                    extra: {},
                    paramsString: '',
                    extraString: '',
                    method: ''
                });
            }
        }, {
            key: "setParamsTo_alarm_ops",
            value: function setParamsTo_alarm_ops() {
                var params = {
                    "operation": "query",
                    "req_type": "alarm",
                    "index": 0
                };
                var paramsString = JSON.stringify(params);
                var method = 'power';
                var extraString = '';
                this.setState({
                    params: params,
                    paramsString: paramsString,
                    method: method,
                    extraString: extraString
                });
            }
        }, {
            key: "setParamsTo_get_count_down",
            value: function setParamsTo_get_count_down() {
                var params = [];
                var paramsString = JSON.stringify(params);
                var method = 'get_count_down';
                var extraString = '';
                this.setState({
                    params: params,
                    paramsString: paramsString,
                    method: method,
                    extraString: extraString
                });
            }
        }, {
            key: "setPramsTo_light_props",
            value: function setPramsTo_light_props() {
                var params = [_miot.Device.deviceID, "light_level", "power_status"];
                var paramsString = JSON.stringify(params);
                var extra = {
                    id: _miot.Device.deviceID
                };
                var extraString = JSON.stringify(extra);
                var method = 'get_device_prop';
                this.setState({
                    params: params,
                    paramsString: paramsString,
                    method: method,
                    extraString: extraString,
                    extra: extra
                });
            }
        }, {
            key: "setPramsTo_light_toggle",
            value: function setPramsTo_light_toggle() {
                var params = ['on'];
                var paramsString = JSON.stringify(params);
                var extra = {
                    'sid': _miot.Device.deviceID
                };
                var extraString = JSON.stringify(extra);
                var method = 'power';
                this.setState({
                    params: params,
                    paramsString: paramsString,
                    method: method,
                    extraString: extraString,
                    extra: extra
                });
            }
        }, {
            key: "onMethodTextRChanged",
            value: function onMethodTextRChanged(event) {
                this.setState({
                    method: event.nativeEvent.text
                });
            }
        }, {
            key: "onParamsTextGChanged",
            value: function onParamsTextGChanged(event) {
                var paramsString = event.nativeEvent.text;

                try {
                    var params = JSON.parse(paramsString);
                    this.setState({
                        params: params,
                        paramsString: paramsString,
                        result: 'None'
                    });
                } catch (err) {
                    var params = [];
                    this.setState({
                        params: params,
                        paramsString: paramsString,
                        result: "prase params failed"
                    });
                }
            }
        }, {
            key: "onExtraTextBChanged",
            value: function onExtraTextBChanged(event) {
                var extraString = event.nativeEvent.text;

                try {
                    var extra = JSON.parse(extraString);
                    this.setState({
                        extra: extra,
                        extraString: extraString,
                        result: 'None'
                    });
                } catch (err) {
                    var extra = {};
                    this.setState({
                        extra: extra,
                        extraString: extraString,
                        result: "prase extra failed"
                    });
                }
            }
        }, {
            key: "onSendDidButtonPress",
            value: function onSendDidButtonPress() {
                var _this4 = this;

                _miot.Device.getDeviceWifi().callMethod("set_rgb", [this.state.textR << 16 | this.state.textG << 8 | this.state.textB]).then(function (json) {
                    console.log("rpc result:" + isSuccess + json);

                    _this4.setState({
                        requestStatus: isSuccess
                    });
                });
            }
        }]);
        return RPCControl;
    }(_react2.default.Component);

    RPCControl.navigationOptions = function (_ref) {
        var navigation = _ref.navigation;
        return {
            header: _react2.default.createElement(_TitleBar2.default, {
                type: "dark",
                title: navigation.state.params.title,
                style: {
                    backgroundColor: '#fff'
                },
                onPressLeft: function onPressLeft() {
                    navigation.goBack();
                }
            })
        };
    };

    exports.default = RPCControl;

    var styles = _reactNative.StyleSheet.create({
        containerAll: {
            flex: 1,
            flexDirection: 'row',
            backgroundColor: '#838383'
        },
        menu: {
            padding: 10,
            backgroundColor: "white",
            alignItems: 'flex-start'
        },
        main: {
            padding: 10,
            flex: 1
        },
        input: {
            marginTop: 5,
            marginBottom: 5,
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: 'black'
        },
        area: {
            height: 200
        },
        btn: {
            fontSize: 10
        }
    });
},10043,[10074,10284,10297,10033],"projects/com.coc.dryer.fdpsm/Page/RpcControl.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _miot = _require(_dependencyMap[1]);

    var _reactNative = _require(_dependencyMap[2]);

    var _NavigationBar = _require(_dependencyMap[3]);

    var _NavigationBar2 = babelHelpers.interopRequireDefault(_NavigationBar);

    var _ui = _require(_dependencyMap[4]);

    var _Dialog = _require(_dependencyMap[5]);

    var _reactNativeSvg = _require(_dependencyMap[6]);

    var Dimensions = _require(_dependencyMap[7]);

    var _Dimensions$get = Dimensions.get("screen"),
        width = _Dimensions$get.width,
        height = _Dimensions$get.height;

    var param = 0;
    var maxWidth = width;

    if (width > 450) {
        maxWidth = 450;
    }

    var language = _miot.Host.locale.language;
    var isCN = language == 'zh';
    var isDewatering = true;
    var defaultClass = isCN ? '棉质衬衫' : 'Cotton Shirt';
    var defaultValue = '';

    var PromptPage = function (_React$Component) {
        babelHelpers.inherits(PromptPage, _React$Component);

        function PromptPage(props) {
            babelHelpers.classCallCheck(this, PromptPage);

            var _this = babelHelpers.possibleConstructorReturn(this, (PromptPage.__proto__ || Object.getPrototypeOf(PromptPage)).call(this, props));

            _this.setTime = function (param) {
                return param;
            };

            _this.paramNum = function (num) {
                _this.setState({
                    param: num.newValue
                });

                param = num.newValue;
            };

            _this._onPressButtonY = function () {
                _this.setState({
                    isDewatering: true
                });

                isDewatering = true;
            };

            _this._onPressButtonN = function () {
                _this.setState({
                    isDewatering: false
                });

                isDewatering = false;
            };

            _this._onPressButtonDo = function () {
                setTimeout(function () {
                    _this.props.navigation.navigate('Selects', {
                        'title': _this.state.selectTitle
                    });

                    _reactNative.DeviceEventEmitter.emit("DewaterType", isDewatering);
                }, 200);
            };

            _this.state = {
                param: 0,
                visMessage: false,
                overTimeText: '待开机',
                overTimeTextEn: 'Standby',
                overTimeAfter: '约 ',
                overTimeAfterEn: 'Finish after ',
                overTimeBefor: ' min 完成',
                overTimeBeforEn: ' min',
                dialogTitle: '提示',
                dialogTitleEn: 'Attention',
                dialogMsg1: '1、请确保衣物间留有一定空隙',
                dialogMsg2: '2、根据衣物是否脱水，实际烘干时长会略有偏差',
                dialogMsg3: '3、根据最厚的一件衣物，来选择相应时间吧',
                dialogMsgEn1: '1.Please make sure there is space between the clothes.',
                dialogMsgEn2: '2.According to whether the clothes are dehydrated, the actual drying time will be slightly different.',
                dialogMsgEn3: '3.According to the thickest piece of clothing, to choose the appropriate time.',
                buttonText: '我知道了',
                buttonTextEn: 'OK',
                time: _this.setTime(0),
                defaultIndexs: [0, 0],
                confirmImg: _require(_dependencyMap[8]),
                confirmFocusImg: _require(_dependencyMap[8]),
                confirmNullImg: _require(_dependencyMap[8]),
                isDewateringText: '衣物是否脱水？',
                isDewateringTextEn: 'Is the clothing dehydrated?',
                BtnYesText: '是',
                BtnYesTextEn: 'Yes',
                BtnNoText: '否',
                BtnNoTextEn: 'No',
                isDewatering: ''
            };
            return _this;
        }

        babelHelpers.createClass(PromptPage, [{
            key: "componentDidMount",
            value: function componentDidMount() {
                this.setState({
                    visMessage: true
                });
            }
        }, {
            key: "onDismiss",
            value: function onDismiss(index) {}
        }, {
            key: "render",
            value: function render() {
                var _this2 = this;

                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: {
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignContent: 'center',
                            backgroundColor: '#0892fe'
                        }
                    },
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: style.overTimeBox
                        },
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: {
                                    marginTop: 30
                                }
                            },
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: {
                                        color: '#fff',
                                        textAlign: 'center',
                                        fontSize: 24,
                                        marginBottom: 10
                                    }
                                },
                                isCN ? this.state.isDewateringText : this.state.isDewateringTextEn
                            ),
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: {
                                        flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignContent: 'center'
                                    }
                                },
                                _react2.default.createElement(
                                    _reactNative.TouchableOpacity,
                                    {
                                        onPress: function onPress() {
                                            _this2._onPressButtonY();
                                        },
                                        onPressOut: function onPressOut() {
                                            _this2._onPressButtonDo();
                                        },
                                        underlayColor: "white"
                                    },
                                    _react2.default.createElement(
                                        _reactNative.View,
                                        {
                                            style: {
                                                padding: 3,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                margin: 10,
                                                opacity: isDewatering ? 1 : .5
                                            }
                                        },
                                        _react2.default.createElement(
                                            _reactNativeSvg.Svg,
                                            {
                                                height: 50,
                                                width: 50
                                            },
                                            _react2.default.createElement(_reactNativeSvg.Path, {
                                                fill: "#FFF",
                                                d: "M25,0.7C11.6,0.7,0.7,11.6,0.7,25S11.6,49.3,25,49.3S49.3,38.4,49.3,25S38.4,0.7,25,0.7z M21.5,37.7l-1.2-1.1 c-3.1-3-8.2-7.9-8.8-8.3l0,0l1.8-2.6c0.5,0.4,4.9,4.5,8,7.5l17.5-18.3l2.3,2.2L21.5,37.7z"
                                            })
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    _reactNative.TouchableOpacity,
                                    {
                                        onPress: function onPress() {
                                            _this2._onPressButtonN();
                                        },
                                        onPressOut: function onPressOut() {
                                            _this2._onPressButtonDo();
                                        },
                                        underlayColor: "white"
                                    },
                                    _react2.default.createElement(
                                        _reactNative.View,
                                        {
                                            style: {
                                                padding: 3,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                margin: 10,
                                                opacity: isDewatering ? .5 : 1
                                            }
                                        },
                                        _react2.default.createElement(
                                            _reactNativeSvg.Svg,
                                            {
                                                height: 50,
                                                width: 50
                                            },
                                            _react2.default.createElement(_reactNativeSvg.Path, {
                                                fill: "#FFF",
                                                d: "M25,0.7C11.6,0.7,0.7,11.6,0.7,25S11.6,49.3,25,49.3S49.3,38.4,49.3,25S38.4,0.7,25,0.7z M35.5,33.3l-2.3,2.3 L25,27.3l-8.3,8.3l-2.3-2.3l8.3-8.3l-8.3-8.3l2.3-2.3l8.3,8.3l8.3-8.3l2.3,2.3L27.3,25L35.5,33.3z"
                                            })
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: style.spinner
                        },
                        _react2.default.createElement(
                            _reactNative.View,
                            null,
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: style.text
                                },
                                isCN ? this.state.dialogTitle : this.state.dialogTitleEn
                            ),
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: style.text
                                },
                                isCN ? this.state.dialogMsg1 : this.state.dialogMsgEn1
                            ),
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: style.text
                                },
                                isCN ? this.state.dialogMsg2 : this.state.dialogMsgEn2
                            ),
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: style.text
                                },
                                isCN ? this.state.dialogMsg3 : this.state.dialogMsgEn3
                            )
                        )
                    )
                );
            }
        }]);
        return PromptPage;
    }(_react2.default.Component);

    PromptPage.navigationOptions = function (_ref) {
        var navigation = _ref.navigation;
        return {
            header: _react2.default.createElement(_NavigationBar2.default, {
                title: isCN ? '干衣时间' : 'Dryer time',
                backgroundColor: "#0892fe",
                type: _NavigationBar2.default.TYPE.DARK,
                left: [{
                    key: _NavigationBar2.default.ICON.BACK,
                    onPress: function onPress() {
                        navigation.goBack();
                    }
                }],
                onPressTitle: function onPressTitle() {
                    console.log('onPressTitle');
                }
            })
        };
    };

    exports.default = PromptPage;

    var style = _reactNative.StyleSheet.create({
        navigate: {
            backgroundColor: 'transparent'
        },
        container: {
            width: width,
            height: height - 90,
            backgroundColor: '#0892fe',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flex: 1
        },
        rowContainer: {
            height: 5,
            alignSelf: 'stretch',
            flexDirection: 'row',
            paddingLeft: 23,
            paddingRight: 23,
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1
        },
        timeContainer: {
            position: 'absolute',
            borderWidth: 20,
            borderColor: 'rgba(255,255,255,0)',
            borderRadius: 150,
            width: 250,
            height: 250,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        timeBeContainer: {
            opacity: 0.3,
            position: 'absolute',
            borderWidth: 20,
            borderColor: 'rgba(255,255,255,0)',
            borderRadius: 150,
            width: 250,
            height: 250
        },
        timeBeContainer0: {
            opacity: 0,
            position: 'absolute',
            borderWidth: 1,
            borderColor: '#fff',
            borderRadius: 160,
            width: 309,
            height: 309
        },
        timeBeContainer1: {
            position: 'absolute',
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,.3)',
            borderRadius: 200,
            width: 273,
            height: 273
        },
        timeBeContainer2: {
            position: 'absolute',
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,.3)',
            borderRadius: 160,
            width: 277,
            height: 277
        },
        timeBeContainer3: {
            position: 'absolute',
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,.3)',
            borderRadius: 160,
            width: 281,
            height: 281
        },
        timeBeContainer4: {
            position: 'absolute',
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,.3)',
            borderRadius: 160,
            width: 285,
            height: 285
        },
        timeBeContainer5: {
            position: 'absolute',
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,.3)',
            borderRadius: 160,
            width: 289,
            height: 289
        },
        timeBeContainer6: {
            position: 'absolute',
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,.3)',
            borderRadius: 160,
            width: 293,
            height: 293
        },
        timeBeContainer7: {
            position: 'absolute',
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,.3)',
            borderRadius: 160,
            width: 297,
            height: 297
        },
        timeBeContainer8: {
            position: 'absolute',
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,.3)',
            borderRadius: 160,
            width: 301,
            height: 301
        },
        timeBeContainer9: {
            position: 'absolute',
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,.3)',
            borderRadius: 160,
            width: 305,
            height: 305
        },
        timeBeContainer10: {
            position: 'absolute',
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,.3)',
            borderRadius: 160,
            width: 309,
            height: 309
        },
        timeBeContainerCircle: {
            position: 'absolute'
        },
        buttonCircle: {
            position: 'absolute'
        },
        tabLable: {
            marginLeft: 5,
            marginRight: 5,
            color: '#fff'
        },
        timeLable: {
            marginLeft: 5,
            marginRight: 5,
            color: '#fff',
            lineHeight: 68,
            fontSize: 68
        },
        unitLable: {
            marginLeft: 5,
            marginRight: 5,
            color: '#fff',
            lineHeight: 42,
            fontSize: 42
        },
        butBox: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            height: 115
        },
        butIcon: {
            alignItems: 'center',
            justifyContent: 'center',
            height: 60,
            width: 60,
            borderRadius: 30,
            marginBottom: 15
        },
        butLable: {
            marginLeft: 20,
            marginRight: 20,
            fontSize: 14,
            color: '#fff'
        },
        list: {
            alignSelf: 'stretch'
        },
        title: {
            fontSize: 15,
            color: '#333333',
            alignItems: 'center',
            flex: 1
        },
        subArrow: {
            width: 7,
            height: 14
        },
        text: {
            color: '#fff'
        },
        content: {
            flex: .3,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 0,
            marginTop: 0,
            padding: 0
        },
        overTimeBox: {
            flex: 1,
            marginTop: 60,
            alignItems: 'center',
            justifyContent: 'flex-start'
        },
        overTime: {
            borderWidth: 1,
            borderColor: '#ffffff',
            backgroundColor: '#ffffff',
            borderRadius: 16,
            width: isCN ? 130 : 150,
            alignItems: 'center',
            justifyContent: 'center'
        },
        overTimeText: babelHelpers.extends({
            color: '#0892fe',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            textAlignVertical: 'center',
            width: 200
        }, {
            fontSize: maxWidth < 359 ? maxWidth * .015 : 14,
            lineHeight: maxWidth < 359 ? maxWidth * .03 : 26
        }),
        pickerStyle: {
            width: 120,
            height: 200,
            marginRight: 0,
            backgroundColor: 'transparent'
        },
        spinner: {
            flexDirection: 'row',
            flex: 1.5,
            justifyContent: 'center',
            alignContent: 'center',
            marginTop: 0
        }
    });
},10046,[10297,10074,10033,10719,10230,10755,11485,10429,10016],"projects/com.coc.dryer.fdpsm/Page/PromptPage.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _miot = _require(_dependencyMap[0]);

  var _TitleBar = _require(_dependencyMap[1]);

  var _TitleBar2 = babelHelpers.interopRequireDefault(_TitleBar);

  var _react = _require(_dependencyMap[2]);

  var _react2 = babelHelpers.interopRequireDefault(_react);

  var _reactNative = _require(_dependencyMap[3]);

  var APPBAR_HEIGHT = 56;
  var rValue = 0;
  var gValue = 0;
  var bValue = 0;

  var SceneMain = function (_React$Component) {
    babelHelpers.inherits(SceneMain, _React$Component);

    function SceneMain(props, context) {
      babelHelpers.classCallCheck(this, SceneMain);

      var _this = babelHelpers.possibleConstructorReturn(this, (SceneMain.__proto__ || Object.getPrototypeOf(SceneMain)).call(this, props, context));

      console.log(_miot.Package.entryInfo);
      _this.state = {
        requestStatus: false
      };
      return _this;
    }

    babelHelpers.createClass(SceneMain, [{
      key: "componentDidMount",
      value: function componentDidMount() {}
    }, {
      key: "test",
      value: function test() {
        alert("test");
      }
    }, {
      key: "render",
      value: function render() {
        return _react2.default.createElement(
          _reactNative.View,
          {
            style: styles.containerAll
          },
          _react2.default.createElement(_TitleBar2.default, {
            type: "dark",
            onPressLeft: function onPressLeft() {
              return _miot.Package.exit();
            },
            disabled: !this.state.numValid,
            rightText: '确定',
            onPressRight: function onPressRight() {
              var color = rValue << 16 | gValue << 8 | bValue;
              var action = _miot.Package.entryInfo;
              action.payload.value = {
                'test': 't'
              };
              console.log(_miot.Package.exitInfo);
              _miot.Package.exitInfo = action;
            }
          }),
          _react2.default.createElement(
            _reactNative.View,
            {
              style: styles.containerIconDemo
            },
            _react2.default.createElement(_reactNative.Image, {
              style: styles.iconDemo,
              source: _require(_dependencyMap[4])
            }),
            _react2.default.createElement(
              _reactNative.Text,
              {
                style: styles.iconText
              },
              "\u5F00\u53D1\u81EA\u5B9A\u4E49\u667A\u80FD\u573A\u666F"
            )
          ),
          _react2.default.createElement(
            _reactNative.View,
            {
              style: styles.containerMenu
            },
            _react2.default.createElement(_reactNative.TextInput, {
              style: styles.textInput,
              maxLength: 3,
              placeholder: "R: 0-255",
              onChangeText: function onChangeText(text) {
                rValue = text;
              }
            }),
            _react2.default.createElement(_reactNative.TextInput, {
              style: styles.textInput,
              maxLength: 3,
              placeholder: "G: 0-255",
              onChangeText: function onChangeText(text) {
                gValue = text;
              }
            }),
            _react2.default.createElement(_reactNative.TextInput, {
              style: styles.textInput,
              maxLength: 3,
              placeholder: "B: 0-255",
              onChangeText: function onChangeText(text) {
                bValue = text;
              }
            })
          )
        );
      }
    }]);
    return SceneMain;
  }(_react2.default.Component);

  exports.default = SceneMain;

  var styles = _reactNative.StyleSheet.create({
    containerAll: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#838383',
      marginTop: 0
    },
    containerIconDemo: {
      flex: 1.7,
      flexDirection: 'column',
      backgroundColor: '#191919',
      alignSelf: 'stretch',
      justifyContent: 'center'
    },
    containerMenu: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#ffffff',
      alignSelf: 'stretch'
    },
    iconDemo: {
      width: 270,
      height: 181,
      alignSelf: 'center'
    },
    iconText: {
      fontSize: 20,
      textAlign: 'center',
      color: '#ffffff',
      marginTop: 20,
      alignSelf: 'center'
    },
    textInput: {
      height: 40,
      borderWidth: 0.5,
      borderColor: '#0f0f0f',
      fontSize: 16,
      padding: 4,
      marginTop: 20,
      marginLeft: 30,
      marginRight: 30,
      backgroundColor: '#ffffff'
    }
  });
},10049,[10074,10284,10297,10033,10052],"projects/com.coc.dryer.fdpsm/Main/SceneMain.js");
__d(function (global, _require, module, exports, _dependencyMap) {
	module.exports = _require(_dependencyMap[0]).registerAsset({
		"__packager_asset": true,
		"httpServerLocation": "/assets/projects/com.coc.dryer.fdpsm/Resources",
		"width": 673,
		"height": 451,
		"scales": [1],
		"hash": "cc5bc3556f4d5399f6081528ab675bb0",
		"name": "control_home",
		"type": "png"
	});
},10052,[10420],"projects/com.coc.dryer.fdpsm/Resources/control_home.png");
require(10120);
require(10001);