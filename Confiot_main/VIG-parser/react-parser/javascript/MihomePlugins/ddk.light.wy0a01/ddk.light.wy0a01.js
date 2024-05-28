
__d(function (global, _require, module, exports, _dependencyMap) {
    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNavigation = _require(_dependencyMap[1]);

    var _miot = _require(_dependencyMap[2]);

    var _CommonSetting = _require(_dependencyMap[3]);

    var _main = _require(_dependencyMap[4]);

    var _main2 = babelHelpers.interopRequireDefault(_main);

    var _setting = _require(_dependencyMap[5]);

    var _setting2 = babelHelpers.interopRequireDefault(_setting);

    var _countdown = _require(_dependencyMap[6]);

    var _countdown2 = babelHelpers.interopRequireDefault(_countdown);

    var _developer_mode_page = _require(_dependencyMap[7]);

    var _developer_mode_page2 = babelHelpers.interopRequireDefault(_developer_mode_page);

    _miot.PackageEvent.packageAuthorizationCancel.addListener(function () {
        _miot.Package.exit();
    });

    var RootStack = (0, _reactNavigation.createStackNavigator)({
        Main: _main2.default,
        Setting: _setting2.default,
        MoreSetting: _CommonSetting.MoreSetting,
        FirmwareUpgrade: _CommonSetting.FirmwareUpgrade,
        Countdown: _countdown2.default,
        DeveloperModePage: _developer_mode_page2.default
    }, {
        initialRouteName: 'Main',
        navigationOptions: {
            header: null
        }
    });

    var App = function (_Component) {
        babelHelpers.inherits(App, _Component);

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
    }(_react.Component);

    _miot.Package.entry(App, function () {});
},10001,[10297,10918,10074,10353,10004,10298,10304,10313],"projects/com.jsc.light.wydfn1/index.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var _miot = _require(_dependencyMap[2]);

    var _bases = _require(_dependencyMap[3]);

    var _navigator = _require(_dependencyMap[4]);

    var _navigator2 = babelHelpers.interopRequireDefault(_navigator);

    var _device_light = _require(_dependencyMap[5]);

    var _device_light2 = babelHelpers.interopRequireDefault(_device_light);

    var _slides_model = _require(_dependencyMap[6]);

    var _slides_model2 = babelHelpers.interopRequireDefault(_slides_model);

    var _btn_group = _require(_dependencyMap[7]);

    var _btn_group2 = babelHelpers.interopRequireDefault(_btn_group);

    var _background_model = _require(_dependencyMap[8]);

    var _background_model2 = babelHelpers.interopRequireDefault(_background_model);

    var App = function (_Component) {
        babelHelpers.inherits(App, _Component);

        function App() {
            babelHelpers.classCallCheck(this, App);
            return babelHelpers.possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
        }

        babelHelpers.createClass(App, [{
            key: "_subscribeProps",
            value: function _subscribeProps() {
                this._deviceStatusListener = _miot.DeviceEvent.deviceReceivedMessages.addListener(function (device, messages) {
                    if (messages.has("prop.2.1") || messages.has("prop.2.2") || messages.has("prop.2.3")) {
                        _reactNative.DeviceEventEmitter.emit('propsState', messages);
                    }
                });

                _miot.Device.getDeviceWifi().subscribeMessages('prop.2.1', 'prop.2.2', 'prop.2.3').then(function (subcription) {
                    msgSubscription = subcription;
                }).catch(console.log);
            }
        }, {
            key: "componentWillMount",
            value: function componentWillMount() {
                (0, _bases.initProtocol)();

                this._subscribeProps();
            }
        }, {
            key: "componentWillUnmount",
            value: function componentWillUnmount() {
                this._deviceStatusListener.remove();
            }
        }, {
            key: "render",
            value: function render() {
                return _react2.default.createElement(
                    _background_model2.default,
                    null,
                    _react2.default.createElement(_navigator2.default, {
                        navigation: this.props.navigation
                    }),
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: styles.content
                        },
                        _react2.default.createElement(_device_light2.default, null),
                        _react2.default.createElement(_slides_model2.default, null),
                        _react2.default.createElement(_btn_group2.default, null)
                    )
                );
            }
        }]);
        return App;
    }(_react.Component);

    exports.default = App;

    var _Dimensions$get = _reactNative.Dimensions.get('window'),
        height = _Dimensions$get.height,
        width = _Dimensions$get.width;

    var styles = _reactNative.StyleSheet.create({
        content: {
            width: width,
            height: height - 100,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around'
        }
    });
},10004,[10297,10033,10074,10007,10160,10196,10211,10226,10295],"projects/com.jsc.light.wydfn1/main/index.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.initProtocol = exports.privacyURL = undefined;

    var _miot = _require(_dependencyMap[0]);

    var LANGUAGE = _miot.Resources.getLanguage();

    var MODEL = _miot.Device.model.split('.')[0];

    var privacyURL = void 0;

    switch (MODEL) {
        case 'jsc':
            exports.privacyURL = privacyURL = LANGUAGE === 'zh' ? _require(_dependencyMap[1]) : _require(_dependencyMap[2]);
            break;

        case 'hdm':
            exports.privacyURL = privacyURL = LANGUAGE === 'zh' ? _require(_dependencyMap[3]) : _require(_dependencyMap[4]);
            break;

        case 'yhzm':
            exports.privacyURL = privacyURL = LANGUAGE === 'zh' ? _require(_dependencyMap[5]) : _require(_dependencyMap[6]);
            break;

        case 'ymj':
            exports.privacyURL = privacyURL = LANGUAGE === 'zh' ? _require(_dependencyMap[7]) : _require(_dependencyMap[8]);
            break;

        case 'hyzm':
            exports.privacyURL = privacyURL = LANGUAGE === 'zh' ? _require(_dependencyMap[9]) : _require(_dependencyMap[10]);
            break;

        case 'ltdzsw':
            exports.privacyURL = privacyURL = LANGUAGE === 'zh' ? _require(_dependencyMap[11]) : _require(_dependencyMap[12]);
            break;

        case 'ftds':
            exports.privacyURL = privacyURL = LANGUAGE === 'zh' ? _require(_dependencyMap[13]) : _require(_dependencyMap[14]);
            break;

        case 'ylzm':
            exports.privacyURL = privacyURL = LANGUAGE === 'zh' ? _require(_dependencyMap[15]) : _require(_dependencyMap[16]);
            break;

        case 'jxgc':
            exports.privacyURL = privacyURL = LANGUAGE === 'zh' ? _require(_dependencyMap[17]) : _require(_dependencyMap[18]);
            break;

        case 'app':
            exports.privacyURL = privacyURL = LANGUAGE === 'zh' ? _require(_dependencyMap[19]) : _require(_dependencyMap[20]);
            break;

        case 'stds':
            exports.privacyURL = privacyURL = LANGUAGE === 'zh' ? _require(_dependencyMap[21]) : _require(_dependencyMap[22]);
            break;

        case 'asdds':
            exports.privacyURL = privacyURL = LANGUAGE === 'zh' ? _require(_dependencyMap[23]) : _require(_dependencyMap[24]);
            break;

        case 'hcznjj':
            exports.privacyURL = privacyURL = LANGUAGE === 'zh' ? _require(_dependencyMap[25]) : _require(_dependencyMap[26]);
            break;

        case 'xzx':
            exports.privacyURL = privacyURL = LANGUAGE === 'zh' ? _require(_dependencyMap[27]) : _require(_dependencyMap[28]);
            break;

        case 'cxds':
            exports.privacyURL = privacyURL = LANGUAGE === 'zh' ? _require(_dependencyMap[29]) : _require(_dependencyMap[30]);
            break;

        case 'zszm':
            exports.privacyURL = privacyURL = LANGUAGE === 'zh' ? _require(_dependencyMap[31]) : _require(_dependencyMap[32]);
            break;

        case 'lejiaj':
            exports.privacyURL = privacyURL = LANGUAGE === 'zh' ? _require(_dependencyMap[33]) : _require(_dependencyMap[34]);
            break;

        case 'lejia':
            exports.privacyURL = privacyURL = LANGUAGE === 'zh' ? _require(_dependencyMap[35]) : _require(_dependencyMap[36]);
            break;

        case 'pze':
            exports.privacyURL = privacyURL = LANGUAGE === 'zh' ? _require(_dependencyMap[37]) : _require(_dependencyMap[38]);
            break;

        case 'ougn':
            exports.privacyURL = privacyURL = LANGUAGE === 'zh' ? _require(_dependencyMap[39]) : _require(_dependencyMap[40]);
            break;

        case 'lsds':
            exports.privacyURL = privacyURL = LANGUAGE === 'zh' ? _require(_dependencyMap[41]) : _require(_dependencyMap[42]);
            break;

        case 'lemesh':
            exports.privacyURL = privacyURL = LANGUAGE === 'zh' ? _require(_dependencyMap[43]) : _require(_dependencyMap[44]);
            break;

        case 'xgds':
            exports.privacyURL = privacyURL = LANGUAGE === 'zh' ? _require(_dependencyMap[45]) : _require(_dependencyMap[46]);
            break;

        case 'ddk':
            exports.privacyURL = privacyURL = LANGUAGE === 'zh' ? _require(_dependencyMap[47]) : _require(_dependencyMap[48]);
            break;

        default:
            exports.privacyURL = privacyURL = LANGUAGE === 'zh' ? _require(_dependencyMap[49]) : _require(_dependencyMap[50]);
            break;
    }

    function initProtocol() {
        var options = {
            privacyURL: privacyURL
        };
        options.hideAgreement = true;
        options.hideUserExperiencePlan = true;

        _miot.Service.smarthome.batchGetDeviceDatas([{
            did: _miot.Device.deviceID,
            props: ["prop.s_auth_config"]
        }]).then(function (res) {
            var alreadyAuthed = false;
            var result = res[_miot.Device.deviceID];
            var config = void 0;

            if (result && result['prop.s_auth_config']) {
                config = result['prop.s_auth_config'];
            }

            if (config) {
                try {
                    var authJson = JSON.parse(config);
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
            _miot.Package.exit();
        });
    }

    exports.privacyURL = privacyURL;
    exports.initProtocol = initProtocol;
},10007,[10074,10010,10013,10016,10019,10022,10025,10028,10031,10034,10037,10040,10043,10046,10049,10052,10055,10058,10061,10064,10067,10070,10073,10076,10079,10082,10085,10088,10091,10094,10097,10100,10103,10106,10109,10112,10115,10118,10121,10124,10127,10130,10133,10136,10139,10142,10145,10148,10151,10154,10157],"projects/com.jsc.light.wydfn1/utils/bases.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
        "scales": [1],
        "hash": "1551b539f33f41a618b4a827534b3a13",
        "name": "jsc_policy_zh",
        "type": "html"
    });
},10010,[10420],"projects/com.jsc.light.wydfn1/protocol/jsc_policy_zh.html");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
    "scales": [1],
    "hash": "2cea605c9b931422af37009b7c805e49",
    "name": "jsc_policy_en",
    "type": "html"
  });
},10013,[10420],"projects/com.jsc.light.wydfn1/protocol/jsc_policy_en.html");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
        "scales": [1],
        "hash": "f2fdf17da4e886b004204c6d49d9b84a",
        "name": "hdm_policy_zh",
        "type": "html"
    });
},10016,[10420],"projects/com.jsc.light.wydfn1/protocol/hdm_policy_zh.html");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
    "scales": [1],
    "hash": "24298fa919e508d8b3eceba94702ce80",
    "name": "hdm_policy_en",
    "type": "html"
  });
},10019,[10420],"projects/com.jsc.light.wydfn1/protocol/hdm_policy_en.html");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
        "scales": [1],
        "hash": "d241146902ed10400775443ad0c6aaa4",
        "name": "yhzm_policy_zh",
        "type": "html"
    });
},10022,[10420],"projects/com.jsc.light.wydfn1/protocol/yhzm_policy_zh.html");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
    "scales": [1],
    "hash": "48a6bc2f8fcc976740e3300e038f6409",
    "name": "yhzm_policy_en",
    "type": "html"
  });
},10025,[10420],"projects/com.jsc.light.wydfn1/protocol/yhzm_policy_en.html");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
        "scales": [1],
        "hash": "1c5c46719bb38090673e8f006c687651",
        "name": "ymj_policy_zh",
        "type": "html"
    });
},10028,[10420],"projects/com.jsc.light.wydfn1/protocol/ymj_policy_zh.html");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
    "scales": [1],
    "hash": "7f148f0fc6fe51e9fef13e743d29d095",
    "name": "ymj_policy_en",
    "type": "html"
  });
},10031,[10420],"projects/com.jsc.light.wydfn1/protocol/ymj_policy_en.html");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
        "scales": [1],
        "hash": "a130aaa734a778bb1b3d51c6ca723742",
        "name": "hyzm_policy_zh",
        "type": "html"
    });
},10034,[10420],"projects/com.jsc.light.wydfn1/protocol/hyzm_policy_zh.html");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
    "scales": [1],
    "hash": "e786ac37d9d9778b3e734abf47c1aaa2",
    "name": "hyzm_policy_en",
    "type": "html"
  });
},10037,[10420],"projects/com.jsc.light.wydfn1/protocol/hyzm_policy_en.html");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
        "scales": [1],
        "hash": "20cad3c58bd80fd5a523b5c375636985",
        "name": "ltdzsw_policy_zh",
        "type": "html"
    });
},10040,[10420],"projects/com.jsc.light.wydfn1/protocol/ltdzsw_policy_zh.html");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
    "scales": [1],
    "hash": "e18a8f249332f3e5e97c9f2d314c3f21",
    "name": "ltdzsw_policy_en",
    "type": "html"
  });
},10043,[10420],"projects/com.jsc.light.wydfn1/protocol/ltdzsw_policy_en.html");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
        "scales": [1],
        "hash": "2f05bc2b71d22de48dfb8b2a187e4555",
        "name": "ftds_policy_zh",
        "type": "html"
    });
},10046,[10420],"projects/com.jsc.light.wydfn1/protocol/ftds_policy_zh.html");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
    "scales": [1],
    "hash": "a2bb7e2188ab6e301eb45262054e8fd7",
    "name": "ftds_policy_en",
    "type": "html"
  });
},10049,[10420],"projects/com.jsc.light.wydfn1/protocol/ftds_policy_en.html");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
        "scales": [1],
        "hash": "2fd0047e0e847259a30a11feaa83e435",
        "name": "ylzm_policy_zh",
        "type": "html"
    });
},10052,[10420],"projects/com.jsc.light.wydfn1/protocol/ylzm_policy_zh.html");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
    "scales": [1],
    "hash": "106987e7196cb3efcc5f0208e9951c81",
    "name": "ylzm_policy_en",
    "type": "html"
  });
},10055,[10420],"projects/com.jsc.light.wydfn1/protocol/ylzm_policy_en.html");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
        "scales": [1],
        "hash": "6ab45a3c8d1a5dc939463166c96310af",
        "name": "jxgc_policy_zh",
        "type": "html"
    });
},10058,[10420],"projects/com.jsc.light.wydfn1/protocol/jxgc_policy_zh.html");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
    "scales": [1],
    "hash": "aa9a3087e8ac295cee6586ac2a7edfdf",
    "name": "jxgc_policy_en",
    "type": "html"
  });
},10061,[10420],"projects/com.jsc.light.wydfn1/protocol/jxgc_policy_en.html");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
        "scales": [1],
        "hash": "e0911127d352c4243e66ac9e188f7b2b",
        "name": "app_policy_zh",
        "type": "html"
    });
},10064,[10420],"projects/com.jsc.light.wydfn1/protocol/app_policy_zh.html");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
    "scales": [1],
    "hash": "914c5b086778378646b2bc3f27b34919",
    "name": "app_policy_en",
    "type": "html"
  });
},10067,[10420],"projects/com.jsc.light.wydfn1/protocol/app_policy_en.html");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
        "scales": [1],
        "hash": "47f4ef14cbed4b7bb1028f5d303a43d7",
        "name": "stds_policy_zh",
        "type": "html"
    });
},10070,[10420],"projects/com.jsc.light.wydfn1/protocol/stds_policy_zh.html");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
    "scales": [1],
    "hash": "120277340fb6576827b5e2b21da1507c",
    "name": "stds_policy_en",
    "type": "html"
  });
},10073,[10420],"projects/com.jsc.light.wydfn1/protocol/stds_policy_en.html");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
        "scales": [1],
        "hash": "9ae34525e62ae9b499ceeaa96fcf2088",
        "name": "asdds_policy_zh",
        "type": "html"
    });
},10076,[10420],"projects/com.jsc.light.wydfn1/protocol/asdds_policy_zh.html");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
    "scales": [1],
    "hash": "e21355dbf711e2aff91f90b36711bf49",
    "name": "asdds_policy_en",
    "type": "html"
  });
},10079,[10420],"projects/com.jsc.light.wydfn1/protocol/asdds_policy_en.html");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
        "scales": [1],
        "hash": "aebe9dc8b5c7c116ef6dbc87cc5d2c5e",
        "name": "hcznjj_policy_zh",
        "type": "html"
    });
},10082,[10420],"projects/com.jsc.light.wydfn1/protocol/hcznjj_policy_zh.html");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
    "scales": [1],
    "hash": "4bcb2065afcc50e316b35647831486dd",
    "name": "hcznjj_policy_en",
    "type": "html"
  });
},10085,[10420],"projects/com.jsc.light.wydfn1/protocol/hcznjj_policy_en.html");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
        "scales": [1],
        "hash": "9e66a1be0fac5a1c65e2275488baf75c",
        "name": "xzx_policy_zh",
        "type": "html"
    });
},10088,[10420],"projects/com.jsc.light.wydfn1/protocol/xzx_policy_zh.html");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
    "scales": [1],
    "hash": "189642e973d545daf407c8a3c54e5f76",
    "name": "xzx_policy_en",
    "type": "html"
  });
},10091,[10420],"projects/com.jsc.light.wydfn1/protocol/xzx_policy_en.html");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
        "scales": [1],
        "hash": "1438ab05b3c66a5e7c13a6e712de065f",
        "name": "cxds_policy_zh",
        "type": "html"
    });
},10094,[10420],"projects/com.jsc.light.wydfn1/protocol/cxds_policy_zh.html");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
    "scales": [1],
    "hash": "9621d2ba611cfe644182c155e829799f",
    "name": "cxds_policy_en",
    "type": "html"
  });
},10097,[10420],"projects/com.jsc.light.wydfn1/protocol/cxds_policy_en.html");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
        "scales": [1],
        "hash": "ba0ef601faa571216d519f70e65c2dc4",
        "name": "zszm_policy_zh",
        "type": "html"
    });
},10100,[10420],"projects/com.jsc.light.wydfn1/protocol/zszm_policy_zh.html");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
    "scales": [1],
    "hash": "ef4d8ad2e9411849f4db122f48480f2d",
    "name": "zszm_policy_en",
    "type": "html"
  });
},10103,[10420],"projects/com.jsc.light.wydfn1/protocol/zszm_policy_en.html");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
        "scales": [1],
        "hash": "09e10daa90b3821b19190d606e4dce81",
        "name": "lejiaj_policy_zh",
        "type": "html"
    });
},10106,[10420],"projects/com.jsc.light.wydfn1/protocol/lejiaj_policy_zh.html");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
    "scales": [1],
    "hash": "c411aa9148dc52a4f0c3d167ce472d0c",
    "name": "lejiaj_policy_en",
    "type": "html"
  });
},10109,[10420],"projects/com.jsc.light.wydfn1/protocol/lejiaj_policy_en.html");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
        "scales": [1],
        "hash": "bd61f845df2e74dd2c94e8a626e588ba",
        "name": "lejia_policy_zh",
        "type": "html"
    });
},10112,[10420],"projects/com.jsc.light.wydfn1/protocol/lejia_policy_zh.html");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
    "scales": [1],
    "hash": "41f19ad253964699dd192078a7aa8a0d",
    "name": "lejia_policy_en",
    "type": "html"
  });
},10115,[10420],"projects/com.jsc.light.wydfn1/protocol/lejia_policy_en.html");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
        "scales": [1],
        "hash": "83341886a205e8e570a8ba08ff7abf5f",
        "name": "pze_policy_zh",
        "type": "html"
    });
},10118,[10420],"projects/com.jsc.light.wydfn1/protocol/pze_policy_zh.html");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
    "scales": [1],
    "hash": "a93ab036d856a019a82e502861673733",
    "name": "pze_policy_en",
    "type": "html"
  });
},10121,[10420],"projects/com.jsc.light.wydfn1/protocol/pze_policy_en.html");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
        "scales": [1],
        "hash": "10047e398c341b53bb0de068a27cb1a8",
        "name": "ougn_policy_zh",
        "type": "html"
    });
},10124,[10420],"projects/com.jsc.light.wydfn1/protocol/ougn_policy_zh.html");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
    "scales": [1],
    "hash": "54a127cbeff1190ec762490c0d97ea11",
    "name": "ougn_policy_en",
    "type": "html"
  });
},10127,[10420],"projects/com.jsc.light.wydfn1/protocol/ougn_policy_en.html");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
        "scales": [1],
        "hash": "92ec459cae854497e31261c7a1a81fe8",
        "name": "lsds_policy_zh",
        "type": "html"
    });
},10130,[10420],"projects/com.jsc.light.wydfn1/protocol/lsds_policy_zh.html");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
    "scales": [1],
    "hash": "26954dc66e5bee6505d75038e48ba050",
    "name": "lsds_policy_en",
    "type": "html"
  });
},10133,[10420],"projects/com.jsc.light.wydfn1/protocol/lsds_policy_en.html");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
        "scales": [1],
        "hash": "e72c530d618b01cd7a19b1b6ed7d2478",
        "name": "lemesh_policy_zh",
        "type": "html"
    });
},10136,[10420],"projects/com.jsc.light.wydfn1/protocol/lemesh_policy_zh.html");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
    "scales": [1],
    "hash": "1355201ef4f15cc00a116b1cd2dd43e7",
    "name": "lemesh_policy_en",
    "type": "html"
  });
},10139,[10420],"projects/com.jsc.light.wydfn1/protocol/lemesh_policy_en.html");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
        "scales": [1],
        "hash": "4fa0c170b9fc36e42ba9ac4adbab211c",
        "name": "xgds_policy_zh",
        "type": "html"
    });
},10142,[10420],"projects/com.jsc.light.wydfn1/protocol/xgds_policy_zh.html");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
    "scales": [1],
    "hash": "af6340b3607bdb20a1ed7aa7cdd860a7",
    "name": "xgds_policy_en",
    "type": "html"
  });
},10145,[10420],"projects/com.jsc.light.wydfn1/protocol/xgds_policy_en.html");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
        "scales": [1],
        "hash": "c9ca6b4856548a6c4de4fa731327571c",
        "name": "ddk_policy_zh",
        "type": "html"
    });
},10148,[10420],"projects/com.jsc.light.wydfn1/protocol/ddk_policy_zh.html");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
    "scales": [1],
    "hash": "a1e0aa587985b639067c9d418a8e720f",
    "name": "ddk_policy_en",
    "type": "html"
  });
},10151,[10420],"projects/com.jsc.light.wydfn1/protocol/ddk_policy_en.html");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
        "scales": [1],
        "hash": "40b2f258acb162f71d9ff084971f4b89",
        "name": "policy_zh",
        "type": "html"
    });
},10154,[10420],"projects/com.jsc.light.wydfn1/protocol/policy_zh.html");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/protocol",
    "scales": [1],
    "hash": "c88b52f22dccb3c3220e8b458f0d49d4",
    "name": "policy_en",
    "type": "html"
  });
},10157,[10420],"projects/com.jsc.light.wydfn1/protocol/policy_en.html");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var _miot = _require(_dependencyMap[2]);

    var _ui = _require(_dependencyMap[3]);

    var _TitleBarBlack = _require(_dependencyMap[4]);

    var _TitleBarBlack2 = babelHelpers.interopRequireDefault(_TitleBarBlack);

    function goback(navigation) {
        if (navigation.state.routeName === 'Main') {
            _miot.Package.exit();
        } else {
            navigation.goBack();
        }
    }

    function gosetting(navigation) {
        navigation.navigate('Setting');
    }

    var _class = function (_Component) {
        babelHelpers.inherits(_class, _Component);

        function _class(props) {
            babelHelpers.classCallCheck(this, _class);

            var _this = babelHelpers.possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

            _this.state = {
                DeviceNeedUpgrade: false,
                onClickTitle: 0,
                visible: false
            };
            return _this;
        }

        babelHelpers.createClass(_class, [{
            key: "_getLatestVersion",
            value: function _getLatestVersion() {
                var _this2 = this;

                var FW_VERSION = void 0;

                try {
                    FW_VERSION = JSON.parse(_miot.Device.extra).fw_version;
                } catch (err) {
                    FW_VERSION = _miot.Device.extra.fw_version;
                }

                _miot.Service.smarthome.getLatestVersion(_miot.Device.model).then(function (res) {
                    if (res.version > FW_VERSION) _this2.setState({
                        DeviceNeedUpgrade: true
                    });
                }).catch(function (err) {
                    return console.log('getLatestVersion.error:', err);
                });
            }
        }, {
            key: "getDevelopersConfig",
            value: function getDevelopersConfig() {
                var _this3 = this;

                _miot.Service.storage.getThirdUserConfigs(_miot.Device.model, 1).then(function (_) {
                    var isDevelopers = _[0].data.isDevelopers;

                    if (!isDevelopers) {
                        _this3.setConfig({
                            isDevelopers: false
                        });
                    }
                }).catch(function (err) {
                    return console.log('getThirdUserConfigs.error:', err);
                });
            }
        }, {
            key: "setConfig",
            value: function setConfig(obj) {
                _miot.Service.storage.setThirdUserConfigs(_miot.Device.model, 1, obj).then(function (_) {
                    if (!_) return;
                }).catch(function (err) {
                    return console.log('setThirdUserConfigs.error:', err);
                });
            }
        }, {
            key: "componentWillMount",
            value: function componentWillMount() {
                var _this4 = this;

                this._getLatestVersion();

                this.subscription = _miot.DeviceEvent.deviceNameChanged.addListener(function (device) {
                    _this4.props.navigation.setParams({
                        title: device.name
                    });
                });
            }
        }, {
            key: "componentDidMount",
            value: function componentDidMount() {
                this.getDevelopersConfig();
            }
        }, {
            key: "componentWillUnmount",
            value: function componentWillUnmount() {
                this.subscription.remove();
            }
        }, {
            key: "render",
            value: function render() {
                var _this5 = this;

                var navigation = this.props.navigation;
                var TitleBar = _TitleBarBlack2.default;
                var title = navigation.getParam('title');
                return _react2.default.createElement(
                    _reactNative.View,
                    null,
                    _react2.default.createElement(TitleBar, {
                        title: title || _miot.Device.name,
                        onPressTitle: function onPressTitle() {
                            var num = _this5.state.onClickTitle;
                            num = num + 1;

                            _this5.setState({
                                onClickTitle: num
                            });

                            if (num === 8) {
                                _this5.setConfig({
                                    isDevelopers: true
                                });

                                _this5.setState({
                                    visible: true
                                });
                            }
                        },
                        onPressLeft: function onPressLeft() {
                            goback(navigation);
                        },
                        onPressRight: navigation.state.routeName === 'Main' ? function () {
                            gosetting(navigation);
                        } : null,
                        showDot: navigation.state.routeName === 'Main' ? this.state.DeviceNeedUpgrade : undefined,
                        style: {
                            zIndex: 999,
                            backgroundColor: '#fff'
                        }
                    }),
                    _react2.default.createElement(_ui.LoadingDialog, {
                        visible: this.state.visible,
                        cancelable: true,
                        title: null,
                        message: '开发者模式已打开',
                        onDismiss: function onDismiss() {
                            _this5.setState({
                                visible: false
                            });
                        },
                        timeout: 1000
                    })
                );
            }
        }]);
        return _class;
    }(_react.Component);

    exports.default = _class;
},10160,[10297,10033,10074,10230,10163],"projects/com.jsc.light.wydfn1/modules/navigator.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var _reactNativeUiKitten = _require(_dependencyMap[2]);

    var _reactNavigation = _require(_dependencyMap[3]);

    var _ImageButton = _require(_dependencyMap[4]);

    var _ImageButton2 = babelHelpers.interopRequireDefault(_ImageButton);

    var _Dimensions$get = _reactNative.Dimensions.get('window'),
        width = _Dimensions$get.width,
        height = _Dimensions$get.height;

    var titleHeight = 44;
    var imgHeight = 28;

    var TitleBarBlack = function (_Component) {
        babelHelpers.inherits(TitleBarBlack, _Component);

        function TitleBarBlack(props) {
            babelHelpers.classCallCheck(this, TitleBarBlack);
            return babelHelpers.possibleConstructorReturn(this, (TitleBarBlack.__proto__ || Object.getPrototypeOf(TitleBarBlack)).call(this, props));
        }

        babelHelpers.createClass(TitleBarBlack, [{
            key: "render",
            value: function render() {
                _reactNative.Text.defaultProps = babelHelpers.extends({}, _reactNative.Text.defaultProps, {
                    allowFontScaling: false
                });

                _reactNative.StatusBar.setBarStyle('dark-content');

                {
                    _reactNative.StatusBar.setTranslucent(true);
                }
                var leftWidth = this.props.leftTextStyle ? this.props.leftTextStyle.width : 0;
                var rightWidth = this.props.rightTextStyle ? this.props.rightTextStyle.width : 0;
                return _react2.default.createElement(
                    _reactNavigation.SafeAreaView,
                    {
                        style: [styles.titleBarContainer, this.props.style]
                    },
                    this.props.leftText ? _react2.default.createElement(
                        _reactNativeUiKitten.RkButton,
                        {
                            onPress: this.props.onPressLeft,
                            contentStyle: [styles.leftRightText, this.props.leftTextStyle],
                            style: [styles.leftRightText, {
                                height: this.props.onPressLeft ? titleHeight : 0,
                                width: leftWidth ? leftWidth : imgHeight + 28
                            }]
                        },
                        this.props.leftText
                    ) : _react2.default.createElement(_ImageButton2.default, {
                        onPress: this.props.onPressLeft,
                        style: [styles.img, {
                            height: this.props.onPressLeft ? imgHeight : 0
                        }],
                        source: _require(_dependencyMap[5]),
                        highlightedSource: _require(_dependencyMap[6])
                    }),
                    _react2.default.createElement(_ImageButton2.default, {
                        onPress: this.props.onPressLeft2,
                        style: [styles.img, {
                            marginLeft: 0,
                            height: this.props.onPressLeft2 ? imgHeight : 0
                        }],
                        source: _require(_dependencyMap[7]),
                        highlightedSource: _require(_dependencyMap[8])
                    }),
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: [styles.textContainer]
                        },
                        _react2.default.createElement(
                            _reactNative.Text,
                            {
                                style: [styles.titleText],
                                onPress: this.props.onPressTitle
                            },
                            this.props.title
                        ),
                        this.props.subTitle ? _react2.default.createElement(
                            _reactNative.Text,
                            {
                                style: [styles.subtitleText],
                                onPress: this.props.onPressTitle
                            },
                            this.props.subTitle
                        ) : _react2.default.createElement(_reactNative.View, null)
                    ),
                    _react2.default.createElement(_ImageButton2.default, {
                        onPress: this.props.onPressRight2,
                        style: [styles.img, {
                            marginRight: 0,
                            height: this.props.onPressRight2 ? imgHeight : 0
                        }],
                        source: _require(_dependencyMap[9]),
                        highlightedSource: _require(_dependencyMap[10])
                    }),
                    this.props.rightText ? _react2.default.createElement(
                        _reactNativeUiKitten.RkButton,
                        {
                            onPress: this.props.onPressRight,
                            contentStyle: [styles.leftRightText, this.props.rightTextStyle],
                            style: [styles.leftRightText, {
                                height: this.props.onPressRight ? titleHeight : 0,
                                width: rightWidth ? rightWidth : imgHeight + 28
                            }]
                        },
                        this.props.rightText
                    ) : _react2.default.createElement(_ImageButton2.default, {
                        onPress: this.props.onPressRight,
                        style: [styles.img, {
                            height: this.props.onPressRight ? imgHeight : 0
                        }],
                        source: _require(_dependencyMap[11]),
                        highlightedSource: _require(_dependencyMap[12])
                    }),
                    this.props.showDot && _react2.default.createElement(_reactNative.Image, {
                        style: styles.dot,
                        source: _require(_dependencyMap[13])
                    })
                );
            }
        }]);
        return TitleBarBlack;
    }(_react.Component);

    exports.default = TitleBarBlack;

    var styles = _reactNative.StyleSheet.create({
        titleBarContainer: {
            flexDirection: 'row',
            width: width,
            alignItems: 'flex-end',
            height: _reactNative.StatusBar.currentHeight + titleHeight
        },
        textContainer: {
            height: titleHeight,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        },
        titleText: {
            width: '100%',
            height: titleHeight,
            lineHeight: titleHeight / 2,
            color: '#000000cc',
            fontSize: 12,
            textAlignVertical: 'center',
            textAlign: 'center'
        },
        subtitleText: {
            color: '#00000088',
            fontSize: 12,
            textAlignVertical: 'center',
            textAlign: 'center'
        },
        leftRightText: {
            flexDirection: 'column',
            backgroundColor: '#0000',
            color: '#00000088',
            fontSize: 14,
            alignItems: 'center',
            justifyContent: 'center',
            textAlignVertical: "center",
            textAlign: "center"
        },
        img: {
            width: imgHeight,
            height: imgHeight,
            resizeMode: 'contain',
            marginLeft: 14,
            marginTop: (titleHeight - 28) / 2,
            marginBottom: (titleHeight - 28) / 2,
            marginRight: 14
        },
        dot: {
            position: 'absolute',
            width: 10,
            height: 10,
            resizeMode: 'contain',
            right: 14,
            bottom: titleHeight - 14
        }
    });
},10163,[10297,10033,11251,10918,10166,10169,10172,10175,10178,10181,10184,10187,10190,10193],"projects/com.jsc.light.wydfn1/modules/TitleBarBlack.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var ImageButton = function (_React$Component) {
        babelHelpers.inherits(ImageButton, _React$Component);

        function ImageButton(props) {
            babelHelpers.classCallCheck(this, ImageButton);

            var _this = babelHelpers.possibleConstructorReturn(this, (ImageButton.__proto__ || Object.getPrototypeOf(ImageButton)).call(this, props));

            _this.state = {
                buttonPressed: false
            };
            return _this;
        }

        babelHelpers.createClass(ImageButton, [{
            key: "_buttonPressIn",
            value: function _buttonPressIn() {
                this.setState({
                    buttonPressed: true
                });
            }
        }, {
            key: "_buttonPressOut",
            value: function _buttonPressOut() {
                this.setState({
                    buttonPressed: false
                });
            }
        }, {
            key: "_isButtonPressed",
            value: function _isButtonPressed() {
                return this.state.buttonPressed;
            }
        }, {
            key: "render",
            value: function render() {
                var source = this.props.source;

                if (this._isButtonPressed() && this.props.highlightedSource) {
                    source = this.props.highlightedSource;
                }

                return _react2.default.createElement(
                    _reactNative.TouchableWithoutFeedback,
                    {
                        disabled: this.props.disabled,
                        onPress: this.props.onPress,
                        onPressIn: this._buttonPressIn.bind(this),
                        onPressOut: this._buttonPressOut.bind(this)
                    },
                    _react2.default.createElement(_reactNative.Image, {
                        style: this.props.style,
                        source: source
                    })
                );
            }
        }]);
        return ImageButton;
    }(_react2.default.Component);

    ImageButton.initialState = {
        buttonPressed: false
    };
    ImageButton.defaultProps = {
        source: null,
        highlightedSource: null,
        onPress: null
    };
    exports.default = ImageButton;
    ;
},10166,[10297,10033],"projects/com.jsc.light.wydfn1/modules/ImageButton.js");
__d(function (global, _require, module, exports, _dependencyMap) {
	module.exports = _require(_dependencyMap[0]).registerAsset({
		"__packager_asset": true,
		"httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/resources/title",
		"width": 84,
		"height": 84,
		"scales": [1],
		"hash": "77c3edd83aea8884ed8a25ab6e522e4e",
		"name": "std_tittlebar_main_device_back_normal",
		"type": "png"
	});
},10169,[10420],"projects/com.jsc.light.wydfn1/resources/title/std_tittlebar_main_device_back_normal.png");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/resources/title",
    "width": 84,
    "height": 84,
    "scales": [1],
    "hash": "1289524d53ef0d2949fb2260360651d5",
    "name": "std_tittlebar_main_device_back_press",
    "type": "png"
  });
},10172,[10420],"projects/com.jsc.light.wydfn1/resources/title/std_tittlebar_main_device_back_press.png");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/resources/title",
    "width": 87,
    "height": 87,
    "scales": [1],
    "hash": "3117874a709d626368bf8f844a8f563d",
    "name": "std_tittlebar_main_device_back2_normal",
    "type": "png"
  });
},10175,[10420],"projects/com.jsc.light.wydfn1/resources/title/std_tittlebar_main_device_back2_normal.png");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/resources/title",
    "width": 87,
    "height": 87,
    "scales": [1],
    "hash": "dfb14722108511efbeb6db0a976e7fe2",
    "name": "std_tittlebar_main_device_back2_press",
    "type": "png"
  });
},10178,[10420],"projects/com.jsc.light.wydfn1/resources/title/std_tittlebar_main_device_back2_press.png");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/resources/title",
    "width": 84,
    "height": 84,
    "scales": [1],
    "hash": "09c0094e0533f101c9e759611fbad580",
    "name": "std_tittlebar_main_device_share_normal",
    "type": "png"
  });
},10181,[10420],"projects/com.jsc.light.wydfn1/resources/title/std_tittlebar_main_device_share_normal.png");
__d(function (global, _require, module, exports, _dependencyMap) {
	module.exports = _require(_dependencyMap[0]).registerAsset({
		"__packager_asset": true,
		"httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/resources/title",
		"width": 84,
		"height": 84,
		"scales": [1],
		"hash": "456e343d82a6a0d4b9edd15f93b537c7",
		"name": "std_tittlebar_main_device_share_press",
		"type": "png"
	});
},10184,[10420],"projects/com.jsc.light.wydfn1/resources/title/std_tittlebar_main_device_share_press.png");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/resources/title",
    "width": 84,
    "height": 84,
    "scales": [1],
    "hash": "c22a73839e35512c33fa0d7bf82db41d",
    "name": "std_tittlebar_main_device_more_normal",
    "type": "png"
  });
},10187,[10420],"projects/com.jsc.light.wydfn1/resources/title/std_tittlebar_main_device_more_normal.png");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/resources/title",
    "width": 84,
    "height": 84,
    "scales": [1],
    "hash": "5acbc46bc324c470005f2f9c6e2c15a2",
    "name": "std_tittlebar_main_device_more_press",
    "type": "png"
  });
},10190,[10420],"projects/com.jsc.light.wydfn1/resources/title/std_tittlebar_main_device_more_press.png");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/resources/title",
    "width": 30,
    "height": 30,
    "scales": [1],
    "hash": "d13f3ee1e886c69b794e4adde2487c8d",
    "name": "std_tittlebar_main_device_massage_point",
    "type": "png"
  });
},10193,[10420],"projects/com.jsc.light.wydfn1/resources/title/std_tittlebar_main_device_massage_point.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var _miot = _require(_dependencyMap[2]);

    var App = function (_Component) {
        babelHelpers.inherits(App, _Component);

        function App(props) {
            babelHelpers.classCallCheck(this, App);

            var _this = babelHelpers.possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

            _this.state = {
                power: false,
                brightness: 1,
                colorTemperature: 3000
            };
            return _this;
        }

        babelHelpers.createClass(App, [{
            key: "getPropertyValue",
            value: function getPropertyValue() {
                var _this2 = this;

                _miot.Service.spec.getPropertiesValue([{
                    did: _miot.Device.deviceID,
                    siid: 2,
                    piid: 1
                }, {
                    did: _miot.Device.deviceID,
                    siid: 2,
                    piid: 2
                }, {
                    did: _miot.Device.deviceID,
                    siid: 2,
                    piid: 3
                }]).then(function (res) {
                    var _power = res[0].value;
                    var _brightness = res[1].value;
                    var _colorTemperature = res[2].value;

                    _this2.setState({
                        power: _power,
                        colorTemperature: _colorTemperature,
                        brightness: _brightness
                    });
                }).catch(function (err) {
                    return console.log('getPropertiesValue.error', err);
                });
            }
        }, {
            key: "componentDidMount",
            value: function componentDidMount() {
                var _this3 = this;

                this.getPropertyValue();
                this.listener = _reactNative.DeviceEventEmitter.addListener('power', function (data) {
                    _this3.setState({
                        power: data
                    });
                });
                this.listener = _reactNative.DeviceEventEmitter.addListener('brightness', function (data) {
                    _this3.setState({
                        brightness: data
                    });
                });
                this.listener = _reactNative.DeviceEventEmitter.addListener('colorTemperature', function (data) {
                    _this3.setState({
                        colorTemperature: data
                    });
                });
                this.listener = _reactNative.DeviceEventEmitter.addListener('propsState', function (data) {
                    if (data.has('prop.2.1')) {
                        if (_this3.state.power === data.get('prop.2.1')[0]) return;

                        _this3.setState({
                            power: data.get('prop.2.1')[0]
                        });
                    }

                    if (data.has('prop.2.2')) {
                        if (_this3.state.brightness === data.get('prop.2.2')[0]) return;

                        _this3.setState({
                            brightness: data.get('prop.2.2')[0]
                        });
                    }

                    if (data.has('prop.2.3')) {
                        if (_this3.state.colorTemperature === data.get('prop.2.3')[0]) return;

                        _this3.setState({
                            colorTemperature: data.get('prop.2.3')[0]
                        });
                    }
                });
            }
        }, {
            key: "componentWillUnmount",
            value: function componentWillUnmount() {
                this.listener.remove();
            }
        }, {
            key: "render",
            value: function render() {
                var _state = this.state,
                    power = _state.power,
                    brightness = _state.brightness,
                    colorTemperature = _state.colorTemperature;
                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: styles.light
                    },
                    _react2.default.createElement(_reactNative.Image, {
                        style: styles.device,
                        source: _require(_dependencyMap[3])
                    }),
                    power || _react2.default.createElement(_reactNative.Image, {
                        style: styles.device,
                        source: _require(_dependencyMap[4])
                    }),
                    !power || _react2.default.createElement(_reactNative.Image, {
                        style: [styles.device, {
                            opacity: brightness / 100
                        }],
                        source: _require(_dependencyMap[5])
                    }),
                    !power || _react2.default.createElement(_reactNative.Image, {
                        style: [styles.device, {
                            opacity: 1 - (colorTemperature - 3000) / 3400
                        }],
                        source: _require(_dependencyMap[6])
                    })
                );
            }
        }]);
        return App;
    }(_react.Component);

    exports.default = App;

    var _Dimensions$get = _reactNative.Dimensions.get('window'),
        height = _Dimensions$get.height,
        width = _Dimensions$get.width;

    var deviceWH = width - 100;

    var styles = _reactNative.StyleSheet.create({
        light: {
            width: width,
            height: deviceWH,
            position: 'relative'
        },
        device: {
            width: deviceWH,
            height: deviceWH,
            marginTop: -(deviceWH / 2),
            marginLeft: -(deviceWH / 2),
            position: 'absolute',
            top: '50%',
            left: '50%'
        }
    });
},10196,[10297,10033,10074,10199,10202,10205,10208],"projects/com.jsc.light.wydfn1/main/device_light.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/resources/light",
    "width": 945,
    "height": 945,
    "scales": [1],
    "hash": "081b231ded03f6c94d2f98f2bd3fc42a",
    "name": "device-off",
    "type": "png"
  });
},10199,[10420],"projects/com.jsc.light.wydfn1/resources/light/device-off.png");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/resources/light",
    "width": 945,
    "height": 945,
    "scales": [1],
    "hash": "e280f36282effe35aca24692237e60a7",
    "name": "device-dark",
    "type": "png"
  });
},10202,[10420],"projects/com.jsc.light.wydfn1/resources/light/device-dark.png");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/resources/light",
    "width": 945,
    "height": 945,
    "scales": [1],
    "hash": "41189627f59e923aea6ca94175d27c90",
    "name": "device-on",
    "type": "png"
  });
},10205,[10420],"projects/com.jsc.light.wydfn1/resources/light/device-on.png");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/resources/light",
    "width": 945,
    "height": 945,
    "scales": [1],
    "hash": "4fadf779dd0c006f2a1e6460893587a4",
    "name": "device-colorful",
    "type": "png"
  });
},10208,[10420],"projects/com.jsc.light.wydfn1/resources/light/device-colorful.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var _miot = _require(_dependencyMap[2]);

    var _slider2 = _require(_dependencyMap[3]);

    var _slider3 = babelHelpers.interopRequireDefault(_slider2);

    var App = function (_Component) {
        babelHelpers.inherits(App, _Component);

        function App(props) {
            babelHelpers.classCallCheck(this, App);

            var _this = babelHelpers.possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

            _this.currListener = false;
            _this.state = {
                power: false,
                brightness: 0,
                colorTemperature: 0
            };
            return _this;
        }

        babelHelpers.createClass(App, [{
            key: "getPropertyValue",
            value: function getPropertyValue() {
                var _this2 = this;

                _miot.Service.spec.getPropertiesValue([{
                    did: _miot.Device.deviceID,
                    siid: 2,
                    piid: 1
                }, {
                    did: _miot.Device.deviceID,
                    siid: 2,
                    piid: 2
                }, {
                    did: _miot.Device.deviceID,
                    siid: 2,
                    piid: 3
                }]).then(function (res) {
                    var _power = res[0].value;
                    var _brightness = res[1].value;
                    var _colorTemperature = res[2].value;

                    _this2.setState({
                        power: _power,
                        colorTemperature: _colorTemperature,
                        brightness: _brightness,
                        _colorTemperature: _colorTemperature,
                        _brightness: _brightness
                    });
                }).catch(function (err) {
                    return console.log('getPropertiesValue.error', err);
                });
            }
        }, {
            key: "sendPropertiesValue",
            value: function sendPropertiesValue(callback) {
                for (var _len = arguments.length, propertys = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    propertys[_key - 1] = arguments[_key];
                }

                _miot.Service.spec.setPropertiesValue(propertys).then(function (res) {
                    if (res[0]['code'] < 0) return;
                    callback();
                }).catch(function (err) {
                    return console.log('err', err);
                });
            }
        }, {
            key: "componentDidMount",
            value: function componentDidMount() {
                var _this3 = this;

                this.getPropertyValue();
                this.listener = _reactNative.DeviceEventEmitter.addListener('power', function (data) {
                    _this3.setState({
                        power: data
                    });
                });
                this.listener = _reactNative.DeviceEventEmitter.addListener('brightness', function (data) {
                    if (!_this3.currListener) _this3.setState({
                        brightness: data,
                        _brightness: data
                    });
                });
                this.listener = _reactNative.DeviceEventEmitter.addListener('colorTemperature', function (data) {
                    if (!_this3.currListener) _this3.setState({
                        colorTemperature: data,
                        _colorTemperature: data
                    });
                });
                this.listener = _reactNative.DeviceEventEmitter.addListener('propsState', function (data) {
                    if (data.has('prop.2.1')) {
                        if (_this3.state.power === data.get('prop.2.1')[0]) return;

                        _this3.setState({
                            power: data.get('prop.2.1')[0]
                        });
                    }

                    if (data.has('prop.2.2')) {
                        if (_this3.state.brightness === data.get('prop.2.2')[0]) return;

                        _this3.setState({
                            brightness: data.get('prop.2.2')[0],
                            _brightness: data.get('prop.2.2')[0]
                        });
                    }

                    if (data.has('prop.2.3')) {
                        if (_this3.state.colorTemperature === data.get('prop.2.3')[0]) return;

                        _this3.setState({
                            colorTemperature: data.get('prop.2.3')[0],
                            _colorTemperature: data.get('prop.2.3')[0]
                        });
                    }
                });
            }
        }, {
            key: "componentWillUnmount",
            value: function componentWillUnmount() {
                this.listener.remove();
            }
        }, {
            key: "render",
            value: function render() {
                var _this4 = this;

                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: styles.slides
                    },
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: styles.slide
                        },
                        _react2.default.createElement(_reactNative.Image, {
                            style: styles.slideImg,
                            source: _require(_dependencyMap[4])
                        }),
                        _react2.default.createElement(_slider3.default, {
                            disabled: !this.state.power,
                            value: this.state.colorTemperature,
                            minimumValue: 3000,
                            maximumValue: 6400,
                            minimumTrackTintColor: "#ed8926",
                            maximumTrackTintColor: "#b4e9ef",
                            onSlidingComplete: function onSlidingComplete() {
                                if (!_this4.state.power) return;
                                _this4.currListener = false;

                                _this4.setState({
                                    colorTemperature: _this4.state.colorTemperature
                                });

                                _this4.sendPropertiesValue(function () {}, {
                                    did: _miot.Device.deviceID,
                                    siid: 2,
                                    piid: 3,
                                    value: _this4.state.colorTemperature
                                });
                            },
                            onValueChange: function onValueChange(value) {
                                if (!_this4.state.power) return;

                                _this4.setState({
                                    colorTemperature: value
                                });

                                _this4.currListener = true;

                                _reactNative.DeviceEventEmitter.emit('colorTemperature', value);
                            }
                        }),
                        _react2.default.createElement(
                            _reactNative.Text,
                            {
                                style: styles.slideText
                            },
                            (this.state.colorTemperature || 3000) + "K"
                        )
                    ),
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: styles.slide
                        },
                        _react2.default.createElement(_reactNative.Image, {
                            style: styles.slideImg,
                            source: _require(_dependencyMap[5])
                        }),
                        _react2.default.createElement(_slider3.default, {
                            disabled: !this.state.power,
                            value: this.state.brightness,
                            minimumValue: 1,
                            maximumValue: 100,
                            minimumTrackTintColor: "#752857",
                            maximumTrackTintColor: "#f2a5d4",
                            onSlidingComplete: function onSlidingComplete() {
                                _this4.currListener = false;

                                _this4.setState({
                                    brightness: _this4.state.brightness
                                });

                                _this4.sendPropertiesValue(function () {}, {
                                    did: _miot.Device.deviceID,
                                    siid: 2,
                                    piid: 2,
                                    value: _this4.state.brightness
                                });
                            },
                            onValueChange: function onValueChange(value) {
                                _this4.setState({
                                    brightness: value
                                });

                                _this4.currListener = true;

                                _reactNative.DeviceEventEmitter.emit('brightness', value);
                            }
                        }),
                        _react2.default.createElement(
                            _reactNative.Text,
                            {
                                style: styles.slideText
                            },
                            (this.state.brightness || 1) + "%"
                        )
                    )
                );
            }
        }]);
        return App;
    }(_react.Component);

    exports.default = App;

    var _Dimensions$get = _reactNative.Dimensions.get('window'),
        height = _Dimensions$get.height,
        width = _Dimensions$get.width;

    var styles = _reactNative.StyleSheet.create({
        slides: {
            width: width,
            height: height / 4,
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        },
        slide: {
            width: width,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around'
        },
        slideText: {
            width: 50,
            textAlign: 'center',
            color: '#fff',
            fontSize: 14
        },
        slideImg: {
            width: 30,
            height: 30
        }
    });
},10211,[10297,10033,10074,10214,10220,10223],"projects/com.jsc.light.wydfn1/main/slides_model.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var _reactNativeLinearGradient = _require(_dependencyMap[2]);

    var _reactNativeLinearGradient2 = babelHelpers.interopRequireDefault(_reactNativeLinearGradient);

    var App = function (_Component) {
        babelHelpers.inherits(App, _Component);

        function App(props) {
            babelHelpers.classCallCheck(this, App);

            var _this = babelHelpers.possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

            _this.state = {
                sliderX: 0
            };
            return _this;
        }

        babelHelpers.createClass(App, [{
            key: "componentWillMount",
            value: function componentWillMount() {
                var _this2 = this;

                this._panResponder = _reactNative.PanResponder.create({
                    onStartShouldSetPanResponder: function onStartShouldSetPanResponder(evt, gestureState) {
                        return true;
                    },
                    onStartShouldSetPanResponderCapture: function onStartShouldSetPanResponderCapture(evt, gestureState) {
                        return true;
                    },
                    onMoveShouldSetPanResponder: function onMoveShouldSetPanResponder(evt, gestureState) {
                        return true;
                    },
                    onMoveShouldSetPanResponderCapture: function onMoveShouldSetPanResponderCapture(evt, gestureState) {
                        return true;
                    },
                    onPanResponderGrant: function onPanResponderGrant(evt, gestureState) {
                        _this2.startX = evt.nativeEvent.locationX;

                        _this2.setState({
                            sliderX: _this2.startX
                        });

                        var _value = parseInt((_this2.props.maximumValue - _this2.props.minimumValue) * (_this2.startX / sliderWH) + _this2.props.minimumValue);

                        if (_value < _this2.props.minimumValue) _value = _this2.props.minimumValue;
                        if (_value > _this2.props.maximumValue) _value = _this2.props.maximumValue;

                        _this2.props.onValueChange(_value);
                    },
                    onPanResponderMove: function onPanResponderMove(evt, gestureState) {
                        var _x = _this2.startX + gestureState.dx;

                        if (_x < 0) _x = 0;
                        if (_x > sliderWH) _x = sliderWH;

                        _this2.setState({
                            sliderX: _x
                        });

                        var _value = parseInt((_this2.props.maximumValue - _this2.props.minimumValue) * (_x / sliderWH) + _this2.props.minimumValue);

                        if (_value <= _this2.props.minimumValue) _value = _this2.props.minimumValue;
                        if (_value > _this2.props.maximumValue) _value = _this2.props.maximumValue;

                        _this2.props.onValueChange(_value);
                    },
                    onPanResponderTerminationRequest: function onPanResponderTerminationRequest(evt, gestureState) {
                        return true;
                    },
                    onPanResponderRelease: function onPanResponderRelease(evt, gestureState) {
                        _this2.props.onSlidingComplete();
                    },
                    onPanResponderTerminate: function onPanResponderTerminate(evt, gestureState) {},
                    onShouldBlockNativeResponder: function onShouldBlockNativeResponder(evt, gestureState) {
                        return true;
                    }
                });
            }
        }, {
            key: "render",
            value: function render() {
                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: styles.slider
                    },
                    _react2.default.createElement(
                        _reactNativeLinearGradient2.default,
                        {
                            style: styles.line,
                            colors: this.props.disabled ? ['#f1f1f1', '#ccc'] : [this.props.minimumTrackTintColor, this.props.maximumTrackTintColor],
                            start: {
                                x: 0,
                                y: 1
                            },
                            end: {
                                x: 1,
                                y: 0
                            }
                        },
                        _react2.default.createElement(_reactNative.View, null)
                    ),
                    _react2.default.createElement(_reactNative.Image, {
                        style: [styles.iconImg, {
                            left: sliderWH * ((this.props.value - this.props.minimumValue) / (this.props.maximumValue - this.props.minimumValue)).toFixed(2)
                        }],
                        source: _require(_dependencyMap[3])
                    }),
                    this.props.disabled || _react2.default.createElement(_reactNative.View, babelHelpers.extends({
                        style: styles.mask
                    }, this._panResponder.panHandlers))
                );
            }
        }]);
        return App;
    }(_react.Component);

    exports.default = App;

    var _Dimensions$get = _reactNative.Dimensions.get('window'),
        width = _Dimensions$get.width;

    var sliderWH = width * 0.7;

    var styles = _reactNative.StyleSheet.create({
        slider: {
            width: sliderWH,
            height: 70,
            position: 'relative'
        },
        line: {
            width: sliderWH,
            height: 2,
            marginTop: 34
        },
        iconImg: {
            width: 16,
            height: 12,
            marginLeft: -8,
            position: 'absolute',
            top: 20,
            left: 0
        },
        mask: {
            width: sliderWH,
            height: 70,
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 999
        }
    });
},10214,[10297,10033,14299,10217],"projects/com.jsc.light.wydfn1/main/slider.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/resources",
    "width": 32,
    "height": 24,
    "scales": [1],
    "hash": "f6d351794c60e30b65b0c53dab77fc39",
    "name": "temp_switcher_ic",
    "type": "png"
  });
},10217,[10420],"projects/com.jsc.light.wydfn1/resources/temp_switcher_ic.png");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/resources",
    "width": 80,
    "height": 80,
    "scales": [1],
    "hash": "169fab7cb6547869b48e0d51718dda23",
    "name": "icon_color_temperature",
    "type": "png"
  });
},10220,[10420],"projects/com.jsc.light.wydfn1/resources/icon_color_temperature.png");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/resources",
    "width": 80,
    "height": 80,
    "scales": [1],
    "hash": "f6c9a37357a5cd07eef73e686bde7d77",
    "name": "icon_brightness",
    "type": "png"
  });
},10223,[10420],"projects/com.jsc.light.wydfn1/resources/icon_brightness.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var _miot = _require(_dependencyMap[2]);

    var _consts = _require(_dependencyMap[3]);

    var _btn = _require(_dependencyMap[4]);

    var _btn2 = babelHelpers.interopRequireDefault(_btn);

    var App = function (_Component) {
        babelHelpers.inherits(App, _Component);

        function App(props) {
            babelHelpers.classCallCheck(this, App);

            var _this = babelHelpers.possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

            _this.state = {
                power: false,
                colorTemperature: 3000,
                brightness: 1
            };
            return _this;
        }

        babelHelpers.createClass(App, [{
            key: "getPropertyValue",
            value: function getPropertyValue() {
                var _this2 = this;

                _miot.Service.spec.getPropertiesValue([{
                    did: _miot.Device.deviceID,
                    siid: 2,
                    piid: 1
                }, {
                    did: _miot.Device.deviceID,
                    siid: 2,
                    piid: 2
                }, {
                    did: _miot.Device.deviceID,
                    siid: 2,
                    piid: 3
                }]).then(function (res) {
                    var _power = res[0].value;
                    var _brightness = res[1].value;
                    var _colorTemperature = res[2].value;

                    _this2.setState({
                        power: _power,
                        colorTemperature: _colorTemperature,
                        brightness: _brightness
                    });
                }).catch(function (err) {
                    return console.log('getPropertiesValue.error', err);
                });
            }
        }, {
            key: "sendPropertiesValue",
            value: function sendPropertiesValue(callback) {
                for (var _len = arguments.length, propertys = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    propertys[_key - 1] = arguments[_key];
                }

                console.log('propertys:', propertys);

                _miot.Service.spec.setPropertiesValue(propertys).then(function (res) {
                    if (res[0]['code'] < 0) return;
                    callback();
                }).catch(function (err) {
                    return console.log('err', err);
                });
            }
        }, {
            key: "componentDidMount",
            value: function componentDidMount() {
                var _this3 = this;

                this.getPropertyValue();
                this.listener = _reactNative.DeviceEventEmitter.addListener('brightness', function (data) {
                    _this3.setState({
                        brightness: data
                    });
                });
                this.listener = _reactNative.DeviceEventEmitter.addListener('colorTemperature', function (data) {
                    _this3.setState({
                        colorTemperature: data
                    });
                });
                this.listener = _reactNative.DeviceEventEmitter.addListener('propsState', function (data) {
                    if (data.has('prop.2.1')) {
                        if (_this3.state.power === data.get('prop.2.1')[0]) return;

                        _this3.setState({
                            power: data.get('prop.2.1')[0]
                        });
                    }

                    if (data.has('prop.2.2')) {
                        if (_this3.state.brightness === data.get('prop.2.2')[0]) return;

                        _this3.setState({
                            brightness: data.get('prop.2.2')[0]
                        });
                    }

                    if (data.has('prop.2.3')) {
                        if (_this3.state.colorTemperature === data.get('prop.2.3')[0]) return;

                        _this3.setState({
                            colorTemperature: data.get('prop.2.3')[0]
                        });
                    }
                });
            }
        }, {
            key: "componentWillUnmount",
            value: function componentWillUnmount() {
                this.listener.remove();
            }
        }, {
            key: "render",
            value: function render() {
                var _this4 = this;

                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: styles.btnGroup
                    },
                    _react2.default.createElement(_btn2.default, {
                        name: _consts.LocalizedString.AriesPower(),
                        sourceOn: _require(_dependencyMap[5]),
                        sourceOff: _require(_dependencyMap[6]),
                        status: this.state.power,
                        onPress: function onPress() {
                            var _power = !_this4.state.power;

                            _this4.sendPropertiesValue(function () {
                                _this4.setState({
                                    power: _power
                                });

                                _reactNative.DeviceEventEmitter.emit('power', _power);
                            }, {
                                did: _miot.Device.deviceID,
                                siid: 2,
                                piid: 1,
                                value: _power
                            });
                        }
                    }),
                    _react2.default.createElement(_btn2.default, {
                        name: _consts.LocalizedString.AriesNight(),
                        sourceOn: _require(_dependencyMap[7]),
                        sourceOff: _require(_dependencyMap[8]),
                        status: this.state.power && this.state.brightness === 5,
                        onPress: function onPress() {
                            if (!_this4.state.power) return;

                            _this4.sendPropertiesValue(function () {
                                _this4.setState({
                                    brightness: 5
                                });

                                _reactNative.DeviceEventEmitter.emit('brightness', 5);
                            }, {
                                did: _miot.Device.deviceID,
                                siid: 2,
                                piid: 2,
                                value: 5
                            });
                        }
                    })
                );
            }
        }]);
        return App;
    }(_react.Component);

    exports.default = App;

    var _Dimensions$get = _reactNative.Dimensions.get('window'),
        width = _Dimensions$get.width;

    var styles = _reactNative.StyleSheet.create({
        btnGroup: {
            width: width,
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        }
    });
},10226,[10297,10033,10074,10229,10280,10283,10286,10289,10292],"projects/com.jsc.light.wydfn1/main/btn_group.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TemperatureKey = exports.BrightnessKey = exports.SwitchKey = exports.PROTOCOLCACHEKEY = exports.INSTANCECACHEKEY = exports.DeviceID = exports.LocalizedString = exports.HEIGHT = exports.WIDTH = undefined;
  exports.NOOP = NOOP;
  exports.formatTimerTime = formatTimerTime;
  exports.fixNum = fixNum;
  exports.adjustSize = adjustSize;
  exports.getInstanceFromCache = getInstanceFromCache;
  exports.getInstanceFromNet = getInstanceFromNet;
  exports.getDefinitionWithKeyFromInstance = getDefinitionWithKeyFromInstance;

  var _reactNative = _require(_dependencyMap[0]);

  var _miot = _require(_dependencyMap[1]);

  var _i18n = _require(_dependencyMap[2]);

  var _i18n2 = babelHelpers.interopRequireDefault(_i18n);

  var window = _reactNative.Dimensions.get('window');

  var WIDTH = exports.WIDTH = window.width;
  var HEIGHT = exports.HEIGHT = window.height;

  _miot.Resources.registerStrings(_i18n2.default);

  var LocalizedString = exports.LocalizedString = _miot.Resources.strings;
  var DeviceID = exports.DeviceID = _miot.Device.deviceID;
  var INSTANCECACHEKEY = exports.INSTANCECACHEKEY = 'INSTANCECACHE:' + DeviceID;
  var PROTOCOLCACHEKEY = exports.PROTOCOLCACHEKEY = 'PROTOCOLCACHE:' + DeviceID;
  var SwitchKey = exports.SwitchKey = 'urn:miot-spec-v2:property:on:00000006';
  var BrightnessKey = exports.BrightnessKey = 'urn:miot-spec-v2:property:brightness:0000000D';
  var TemperatureKey = exports.TemperatureKey = 'urn:miot-spec-v2:property:color-temperature:0000000F';

  function NOOP() {}

  function formatTimerTime(time) {
    if (!time) {
      return false;
    }

    var ts = time.split(/\s+/);
    var now = new Date();
    var y = now.getFullYear();
    var m = ts[3] - 1;
    var d = ts[2] - 0;
    var h = ts[1] - 0;
    var i = ts[0] - 0;
    return new Date(y, m, d, h, i, 0);
  }

  function fixNum(n) {
    return ('00' + n).slice(-2);
  }

  function adjustSize(n) {
    return n / 360 * WIDTH;
  }

  function getInstanceFromCache(cb) {
    _miot.Host.storage.get(INSTANCECACHEKEY).then(function (instance) {
      if (typeof instance === 'string') {
        instance = JSON.parse(instance);
      }

      cb(instance);
    }).catch(function (err) {
      cb();
    });
  }

  function getInstanceFromNet(cb) {
    _miot.Service.spec.getSpecString(DeviceID).then(function (instance) {
      if (typeof instance === 'string') {
        instance = JSON.parse(instance);
      }

      _miot.Host.storage.set(INSTANCECACHEKEY, instance, {
        expire: 2592000
      });

      cb(instance);
    }).catch(function (err) {
      cb();
    });
  }

  function getDefinitionWithKeyFromInstance(instance) {
    for (var _len = arguments.length, keys = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      keys[_key - 1] = arguments[_key];
    }

    var ret = {};

    if (!keys || !keys.length) {
      return ret;
    }

    var needFound = keys.length;

    for (var i = 0, ls = instance.services.length; i < ls; i++) {
      var service = instance.services[i];
      var props = service.properties;

      for (var lp = props.length, n = lp - 1; n >= 0; n--) {
        var prop = props[n];
        var key = prop.type.split(':').slice(0, 5).join(':');

        if (keys.includes(key)) {
          if (!ret[key]) {
            needFound -= 1;
          }

          ret[key] = babelHelpers.extends({}, prop, {
            siid: service.iid,
            piid: prop.iid
          });
        }

        if (!needFound) {
          return ret;
        }
      }
    }

    return ret;
  }
},10229,[10033,10074,10232],"projects/com.jsc.light.wydfn1/modules/consts.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _miot = _require(_dependencyMap[0]);

  var _resources = _require(_dependencyMap[1]);

  var LANGUAGE = _miot.Resources.getLanguage();

  function getLocalizedString(language) {
    var K = getI18nKeywords(language);
    return {
      powerOn: K.keyword0,
      powerOff: K.keyword1,
      switch: K.keyword2,
      setTime: K.keyword3,
      timer: K.keyword4,
      setting: K.keyword5,
      featureSetting: K.keyword6,
      commonSetting: K.keyword7,
      deviceName: K.keyword8,
      deviceTimezone: K.keyword9,
      locationManagement: K.keyword10,
      shareDevice: K.keyword11,
      ifttt: K.keyword12,
      firmwareUpgrate: K.keyword13,
      moreSetting: K.keyword14,
      helpPage: K.keyword15,
      feedback: K.keyword16,
      addToDesktop: K.keyword17,
      licenseAndPolicy: K.keyword18,
      resetDevice: K.keyword19,
      security: K.keyword39,
      buttonOpenTitle: K.keyword36,
      buttonSuspendTitle: K.keyword37,
      buttonCloseTitle: K.keyword35,
      customize: K.keyword20,
      cancel: K.keyword21,
      startUp: K.keyword22,
      timingTipOn: K.keyword23,
      timingTipOff: K.keyword24,
      countdownTipOn: function countdownTipOn(h, m) {
        var s = '';

        if (h > 0) {
          s += (h == 1 ? K.keyword25_0 : K.keyword25_0_plurals).replace('{1}', h) + ' ';
        }

        s += (m == 1 ? K.keyword25_1 : K.keyword25_1_plurals).replace('{1}', m);
        return K.keyword25.replace('{1}', s);
      },
      countdownTipOff: function countdownTipOff(h, m) {
        var s = '';

        if (h > 0) {
          s += (h == 1 ? K.keyword25_0 : K.keyword25_0_plurals).replace('{1}', h) + ' ';
        }

        s += (m == 1 ? K.keyword25_1 : K.keyword25_1_plurals).replace('{1}', m);
        return K.keyword26.replace('{1}', s);
      },
      openInfo: K.keyword27,
      closeInfo: K.keyword28,
      shortHour: K.keyword29,
      shortMinute: K.keyword30,
      minute: K.keyword32,
      minutes: K.keyword32_plurals,
      handling: K.keyword33,
      failed: K.keyword34,
      noSharedPermission: K.keyword40,
      AriesPower: K.keyword41,
      AriesNight: K.keyword42,
      AriesRead: K.keyword43,
      AriesVideo: K.keyword44,
      CreateALightGroup: K.keyword45,
      EditLightGroup: K.keyword46
    };
  }

  function getI18nKeywords(language) {
    switch (language) {
      case _resources.Language.zh:
        return _require(_dependencyMap[2]);

      case _resources.Language.zh_tw:
        return _require(_dependencyMap[3]);

      case _resources.Language.zh_hk:
        return _require(_dependencyMap[4]);

      case _resources.Language.en:
        return _require(_dependencyMap[5]);

      case _resources.Language.ko:
        return _require(_dependencyMap[6]);

      case _resources.Language.ru:
        return _require(_dependencyMap[7]);

      case _resources.Language.es:
        return _require(_dependencyMap[8]);

      case _resources.Language.fr:
        return _require(_dependencyMap[9]);

      case _resources.Language.it:
        return _require(_dependencyMap[10]);

      case _resources.Language.de:
        return _require(_dependencyMap[11]);

      case _resources.Language.id:
        return _require(_dependencyMap[12]);

      case _resources.Language.pl:
        return _require(_dependencyMap[13]);

      case _resources.Language.vi:
        return _require(_dependencyMap[14]);

      case _resources.Language.ja:
        return _require(_dependencyMap[15]);

      case _resources.Language.th:
        return _require(_dependencyMap[16]);

      default:
        return _require(_dependencyMap[2]);
    }
  }

  exports.default = babelHelpers.defineProperty({}, LANGUAGE, getLocalizedString(LANGUAGE));
},10232,[10074,10077,10235,10238,10241,10244,10247,10250,10253,10256,10259,10262,10265,10268,10271,10274,10277],"projects/com.jsc.light.wydfn1/modules/i18n/index.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = {
    keyword0: '设备已开启',
    keyword1: '设备已关闭',
    keyword2: '开关',
    keyword3: '定时',
    keyword4: '倒计时',
    keyword5: '设置',
    keyword6: '功能设置',
    keyword7: '通用设置',
    keyword8: '设备名称',
    keyword9: '设备时区',
    keyword10: '位置管理',
    keyword11: '共享',
    keyword12: '智能',
    keyword13: '检查固件升级',
    keyword14: '更多设置',
    keyword15: '常见问题',
    keyword16: '用户反馈',
    keyword17: '添加到桌面',
    keyword18: '法律信息',
    keyword19: '删除设备',
    keyword20: '自定义',
    keyword21: '取消',
    keyword22: '启动',
    keyword23: '{1}开启',
    keyword24: '{1}关闭',
    keyword25_0: '{1}小时',
    keyword25_0_plurals: '{1}小时',
    keyword25_1: '{1}分',
    keyword25_1_plurals: '{1}分',
    keyword25: '{1}后启动',
    keyword26: '{1}后关闭',
    keyword27: '设备将在{1}开启',
    keyword28: '设备将在{1}关闭',
    keyword29: '时',
    keyword30: '分',
    keyword31: '分钟',
    keyword32: '{1}分钟',
    keyword32_plurals: '{1}分钟',
    keyword33: '操作中...',
    keyword34: '处理失败，请稍后再试',
    keyword35: '关闭',
    keyword36: '开启',
    keyword37: '暂停',
    keyword38: '电机反转',
    keyword39: '安全设置',
    keyword40: '被共享设备无此权限',
    keyword41: '开关',
    keyword42: '小夜灯',
    keyword43: '阅读',
    keyword44: '音影',
    keyword45: '创建灯组',
    keyword46: '设备管理'
  };
},10235,[],"projects/com.jsc.light.wydfn1/modules/i18n/zh.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = {
    keyword0: '裝置已開啟',
    keyword1: '裝置已關閉',
    keyword2: '開關',
    keyword3: '定時',
    keyword4: '倒數計時',
    keyword5: '設定',
    keyword6: '功能設定',
    keyword7: '一般設定',
    keyword8: '裝置名稱',
    keyword9: '裝置時區',
    keyword10: '位置管理',
    keyword11: '共用',
    keyword12: '智慧',
    keyword13: '檢查韌體更新',
    keyword14: '更多設定',
    keyword15: '常見問題',
    keyword16: '使用者反饋',
    keyword17: '新増捷徑至桌面',
    keyword18: 'Legal info',
    keyword19: '刪除裝置',
    keyword20: '自訂',
    keyword21: '取消',
    keyword22: '啟動',
    keyword23: '{1}開啟',
    keyword24: '{1}關閉',
    keyword25_0: '{1}小時',
    keyword25_0_plurals: '{1}小時',
    keyword25_1: '{1}分',
    keyword25_1_plurals: '{1}分',
    keyword25: '{1}後啟動',
    keyword26: '{1}後關閉',
    keyword27: '裝置將在{1}開啟',
    keyword28: '裝置將在{1}關閉',
    keyword29: '時',
    keyword30: '分',
    keyword31: '分鐘',
    keyword32: '{1}分鐘',
    keyword32_plurals: '{1}分鐘',
    keyword33: '執行中',
    keyword34: '處理失敗，請重試',
    keyword35: '關閉',
    keyword36: '開啟',
    keyword37: '暫停',
    keyword38: 'The motor is reversing',
    keyword39: '安全設置',
    keyword40: 'Shared device has no permission',
    keyword41: '開關',
    keyword42: '小夜燈',
    keyword43: '閱讀',
    keyword44: '音影',
    keyword45: '創建燈組',
    keyword46: '編輯燈組'
  };
},10238,[],"projects/com.jsc.light.wydfn1/modules/i18n/zh_tw.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = {
    keyword0: '裝置已開啟',
    keyword1: '裝置已關閉',
    keyword2: '開關',
    keyword3: '定時',
    keyword4: '倒數計時',
    keyword5: '設定',
    keyword6: '功能設定',
    keyword7: '一般設定',
    keyword8: '裝置名稱',
    keyword9: '裝置時區',
    keyword10: '位置管理',
    keyword11: '共用',
    keyword12: '智慧',
    keyword13: '檢查韌體更新',
    keyword14: '更多設定',
    keyword15: '常見問題',
    keyword16: '使用者反饋',
    keyword17: '新增到桌面',
    keyword18: 'Legal info',
    keyword19: '刪除裝置',
    keyword20: '自訂',
    keyword21: '取消',
    keyword22: '啟動',
    keyword23: '{1}開啟',
    keyword24: '{1}關閉',
    keyword25_0: '{1}小時',
    keyword25_0_plurals: '{1}小時',
    keyword25_1: '{1}分',
    keyword25_1_plurals: '{1}分',
    keyword25: '{1}後啟動',
    keyword26: '{1}後關閉',
    keyword27: '裝置將在{1}開啟',
    keyword28: '裝置將在{1}關閉',
    keyword29: '時',
    keyword30: '分',
    keyword31: '分鐘',
    keyword32: '{1}分鐘',
    keyword32_plurals: '{1}分鐘',
    keyword33: '執行中',
    keyword34: '處理失敗，請重試',
    keyword35: '關閉',
    keyword36: '開啟',
    keyword37: '暫停',
    keyword38: 'The motor is reversing',
    keyword39: '安全設置',
    keyword40: 'Shared device has no permission',
    keyword41: '開關',
    keyword42: '小夜燈',
    keyword43: '閱讀',
    keyword44: '音影',
    keyword45: '創建燈組',
    keyword46: '編輯燈組'
  };
},10241,[],"projects/com.jsc.light.wydfn1/modules/i18n/zh_hk.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = {
    keyword0: 'Device is on',
    keyword1: 'Device is off',
    keyword2: 'On/Off',
    keyword3: 'Timer',
    keyword4: 'Countdown',
    keyword5: 'Settings',
    keyword6: 'Shortcut settings',
    keyword7: 'General settings',
    keyword8: 'Device name',
    keyword9: 'Device time zone',
    keyword10: 'Manage locations',
    keyword11: 'Share',
    keyword12: 'Automation',
    keyword13: 'Check for firmware updates',
    keyword14: 'Additional settings',
    keyword15: 'FAQ',
    keyword16: 'Feedback',
    keyword17: 'Add to Home screen',
    keyword18: 'Legal info',
    keyword19: 'Remove device',
    keyword20: 'Custom',
    keyword21: 'Stop',
    keyword22: 'Start',
    keyword23: '{1} is on',
    keyword24: '{1} is off',
    keyword25_0: '{1}h',
    keyword25_0_plurals: '{1}h',
    keyword25_1: '{1}m',
    keyword25_1_plurals: '{1}m',
    keyword25: 'Turn on in {1}',
    keyword26: 'Turn off in {1}',
    keyword27: 'Device will be on at {1}',
    keyword28: 'Device will be off at {1}',
    keyword29: 'h',
    keyword30: 'm',
    keyword31: 'm',
    keyword32: '{1} minute',
    keyword32_plurals: '{1} minutes',
    keyword33: 'Running…',
    keyword34: 'Could not operate, please try again later',
    keyword35: 'Turn off',
    keyword36: 'Turn on',
    keyword37: 'Pause',
    keyword38: 'The motor is reversing',
    keyword39: 'Security settings',
    keyword40: 'Shared device has no permission',
    keyword41: 'Power',
    keyword42: 'Night',
    keyword43: 'Read',
    keyword44: 'Video',
    keyword45: 'Create a light group',
    keyword46: 'Edit light group'
  };
},10244,[],"projects/com.jsc.light.wydfn1/modules/i18n/en.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = {
    keyword0: '기기가 켜져 있음',
    keyword1: '기기가 꺼져 있습니다',
    keyword2: '켜기/끄기',
    keyword3: '타이머',
    keyword4: '카운트다운',
    keyword5: '설정',
    keyword6: '바로가기 설정',
    keyword7: '일반 설정',
    keyword8: '기기 이름',
    keyword9: '디바이스 시간대',
    keyword10: '위치 관리',
    keyword11: '공유',
    keyword12: '자동화',
    keyword13: '펌웨어 업데이트 확인',
    keyword14: '추가 설정',
    keyword15: '자주 묻는 질문',
    keyword16: '피드백',
    keyword17: '홈 화면에 추가',
    keyword18: 'Legal info',
    keyword19: '기기 제거',
    keyword20: '사용자 지정',
    keyword21: '중지',
    keyword22: '시작',
    keyword23: '{1}가 켜져 있음',
    keyword24: '{1}가 꺼져 있습니다',
    keyword25_0: '{1}시간',
    keyword25_0_plurals: '{1}시간',
    keyword25_1: '{1}분',
    keyword25_1_plurals: '{1}분',
    keyword25: '{1} 후 실행',
    keyword26: '{1} 후 종료',
    keyword27: '기기는 {1} 분에 켜집니다.',
    keyword28: '기기가 {1} 분에 꺼집니다.',
    keyword29: '시간',
    keyword30: '분',
    keyword31: '분',
    keyword32: '{1}분',
    keyword32_plurals: '{1}분',
    keyword33: '실행 중',
    keyword34: '다시 시도',
    keyword35: '끄기',
    keyword36: '켜기',
    keyword37: '일시정지',
    keyword38: 'The motor is reversing',
    keyword39: '보안 설정',
    keyword40: 'Shared device has no permission'
  };
},10247,[],"projects/com.jsc.light.wydfn1/modules/i18n/ko.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = {
    keyword0: 'Устройство включено',
    keyword1: 'Устройство выключено',
    keyword2: 'Вкл/Выкл',
    keyword3: 'Таймер',
    keyword4: 'Обратный отсчет',
    keyword5: 'Настройки',
    keyword6: 'Настройки ярлыков',
    keyword7: 'Общие настройки',
    keyword8: 'Имя устройства',
    keyword9: 'Часовой пояс устройства',
    keyword10: 'Управлять местами',
    keyword11: 'Поделиться',
    keyword12: 'Автоматизация',
    keyword13: 'Проверить наличие обновлений',
    keyword14: 'Дополнительные настройки',
    keyword15: 'Вопросы и ответы',
    keyword16: 'Отзыв',
    keyword17: 'Добавить на главный экран',
    keyword18: 'Legal info',
    keyword19: 'Удалить устройство',
    keyword20: 'Пользовательский',
    keyword21: 'Остановить',
    keyword22: 'Начать',
    keyword23: '{1} включено',
    keyword24: '{1} выключено',
    keyword25_0: '{1} ч',
    keyword25_0_plurals: '{1} ч',
    keyword25_1: '{1} мин',
    keyword25_1_plurals: '{1} мин',
    keyword25: 'Включить через {1}',
    keyword26: 'Выключить через {1}',
    keyword27: 'Устройство будет включено в {1}',
    keyword28: 'Устройство будет выключено в {1}',
    keyword29: 'ч.',
    keyword30: 'мин.',
    keyword31: 'мин.',
    keyword32: '{1} минута',
    keyword32_plurals: '{1} минуты',
    keyword33: 'Загрузка...',
    keyword34: 'Попробовать снова',
    keyword35: 'Отключить',
    keyword36: 'ключить',
    keyword37: 'Приостановить',
    keyword38: 'The motor is reversing',
    keyword39: 'Параметры безопасности',
    keyword40: 'Shared device has no permission'
  };
},10250,[],"projects/com.jsc.light.wydfn1/modules/i18n/ru.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = {
    keyword0: 'El dispositivo está encendido',
    keyword1: 'El dispositivo está apagado',
    keyword2: 'Activado/Desactivado',
    keyword3: 'Temporizador',
    keyword4: 'Temporizador automático',
    keyword5: 'Configuración',
    keyword6: 'Ajustes de acceso directo',
    keyword7: 'Ajustes generales',
    keyword8: 'Nombre del dispositivo',
    keyword9: 'Zona horaria del dispositivo',
    keyword10: 'Gestionar ubicaciones',
    keyword11: 'Compartir',
    keyword12: 'Automatización',
    keyword13: 'Buscar actualizaciones de firmware',
    keyword14: 'Ajustes adicionales',
    keyword15: 'Preguntas frecuentes',
    keyword16: 'Comentario',
    keyword17: 'Añadir a la pantalla de Inicio',
    keyword18: 'Legal info',
    keyword19: 'Eliminar dispositivo',
    keyword20: 'Personalizar',
    keyword21: 'Parar',
    keyword22: 'Inicio',
    keyword23: '{1} está encendido',
    keyword24: '{1} está apagado',
    keyword25_0: '{1}h',
    keyword25_0_plurals: '{1}h',
    keyword25_1: '{1}m',
    keyword25_1_plurals: '{1}m',
    keyword25: 'Activar en {1}',
    keyword26: 'Desactivar en {1}',
    keyword27: 'El dispositivo estará encendido a las {1}',
    keyword28: 'El dispositivo estará apagado a las {1}',
    keyword29: 'hr',
    keyword30: 'min',
    keyword31: 'min',
    keyword32: '{1} minuto',
    keyword32_plurals: '{1} minutos',
    keyword33: 'Ejecutándose...',
    keyword34: 'Reintentar',
    keyword35: 'Desactivar',
    keyword36: 'ctivar',
    keyword37: 'Pausar',
    keyword38: 'The motor is reversing',
    keyword39: 'Ajustes de seguridad',
    keyword40: 'Shared device has no permission'
  };
},10253,[],"projects/com.jsc.light.wydfn1/modules/i18n/es.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = {
    keyword0: 'L\'appareil est allumé',
    keyword1: 'L\'appareil est éteint',
    keyword2: 'Allumé/éteint',
    keyword3: 'Minuterie',
    keyword4: 'Retardateur',
    keyword5: 'Paramètres',
    keyword6: 'Réglages des raccourcis',
    keyword7: 'Réglages généraux',
    keyword8: 'Nom de l\'appareil',
    keyword9: 'Fuseau horaire de l’appareil',
    keyword10: 'Gérer les emplacements',
    keyword11: 'Partager',
    keyword12: 'Automatisation',
    keyword13: 'Vérifier les mises à jour du micrologiciel',
    keyword14: 'Paramètres supplémentaires',
    keyword15: 'FAQ',
    keyword16: 'Retour',
    keyword17: 'Ajouter à l\'écran d\'accueil',
    keyword18: 'Legal info',
    keyword19: 'Supprimer l\'appareil',
    keyword20: 'Personnaliser',
    keyword21: 'Arrêter',
    keyword22: 'Démarrer',
    keyword23: '{1} est allumé',
    keyword24: '{1} est éteint',
    keyword25_0: '{1} heures',
    keyword25_0_plurals: '{1} heures',
    keyword25_1: '{1} minutes',
    keyword25_1_plurals: '{1} minutes',
    keyword25: 'Démarrer après {1}',
    keyword26: 'Éteindre après {1}',
    keyword27: 'L\'appareil sera allumé à {1}',
    keyword28: 'L\'appareil sera éteint à {1}',
    keyword29: 'h',
    keyword30: 'min',
    keyword31: 'min',
    keyword32: '{1} minute',
    keyword32_plurals: '{1} minutes',
    keyword33: 'En cours d’exécution…',
    keyword34: 'Réessayer',
    keyword35: 'Désactiver',
    keyword36: 'Activer',
    keyword37: 'Suspendre',
    keyword38: 'The motor is reversing',
    keyword39: 'Paramètres de sécurité',
    keyword40: 'Shared device has no permission'
  };
},10256,[],"projects/com.jsc.light.wydfn1/modules/i18n/fr.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = {
    keyword0: 'Il dispositivo è acceso',
    keyword1: 'Il dispositivo è spento',
    keyword2: 'Attivato/disattivato',
    keyword3: 'Timer',
    keyword4: 'Conto alla rovescia',
    keyword5: 'Impostazioni',
    keyword6: 'Impostazioni collegamenti',
    keyword7: 'Impostazioni generali',
    keyword8: 'Nome dispositivo',
    keyword9: 'Fuso orario del dispositivo',
    keyword10: 'Gestisci posizioni',
    keyword11: 'Condividi',
    keyword12: 'Automazione',
    keyword13: 'Controlla aggiornamenti firmware',
    keyword14: 'Impostazioni aggiuntive',
    keyword15: 'Domande frequenti',
    keyword16: 'Feedback',
    keyword17: 'Aggiungi a schermata iniziale',
    keyword18: 'Legal info',
    keyword19: 'Rimuovi dispositivo',
    keyword20: 'Personalizza',
    keyword21: 'Interrompi',
    keyword22: 'Avvia',
    keyword23: '{1} è acceso',
    keyword24: '{1} è spento',
    keyword25_0: '{1} ora',
    keyword25_0_plurals: '{1} ore',
    keyword25_1: '{1} minuti',
    keyword25_1_plurals: '{1} minuti',
    keyword25: 'Avvia dopo {1}',
    keyword26: 'Disattiva dopo {1}',
    keyword27: 'Il dispositivo sarà acceso alle {1}',
    keyword28: 'Il dispositivo sarà spento alle {1}',
    keyword29: 'ore',
    keyword30: 'min',
    keyword31: 'min',
    keyword32: '{1} minuto',
    keyword32_plurals: '{1} minuti',
    keyword33: 'In esecuzione…',
    keyword34: 'Riprova',
    keyword35: 'Disattiva',
    keyword36: 'Attiva',
    keyword37: 'Pausa',
    keyword38: 'The motor is reversing',
    keyword39: 'Saugumo nustatymai',
    keyword40: 'Shared device has no permission'
  };
},10259,[],"projects/com.jsc.light.wydfn1/modules/i18n/it.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = {
    keyword0: 'Gerät ist eingeschaltet',
    keyword1: 'Gerät ist ausgeschaltet',
    keyword2: 'Ein/Aus',
    keyword3: 'Timer',
    keyword4: 'Countdown',
    keyword5: 'Einstellungen',
    keyword6: 'Verknüpfungseinstellungen',
    keyword7: 'Allgemeine Einstellungen',
    keyword8: 'Gerätename',
    keyword9: 'Gerätezeitzone',
    keyword10: 'Standorte verwalten',
    keyword11: 'Teilen',
    keyword12: 'Automatisierung',
    keyword13: 'Nach Firmware-Aktualisierungen suchen',
    keyword14: 'Zusätzliche Einstellungen',
    keyword15: 'FAQ',
    keyword16: 'Feedback',
    keyword17: 'Zur Startseite hinzufügen',
    keyword18: 'Legal info',
    keyword19: 'Geräte entfernen',
    keyword20: 'Angepasst',
    keyword21: 'Stopp',
    keyword22: 'Start',
    keyword23: '{1} ist eingeschaltet',
    keyword24: '{1} ist ausgeschaltet',
    keyword25_0: '{1} Stunden',
    keyword25_0_plurals: '{1} Stunden',
    keyword25_1: '{1} Minuten',
    keyword25_1_plurals: '{1} Minuten',
    keyword25: 'Nach {1} starten',
    keyword26: 'Nach {1} herunterfahren',
    keyword27: 'Das Gerät ist um {1} eingeschaltet',
    keyword28: 'Das Gerät ist um {1} ausgeschaltet',
    keyword29: 'Std.',
    keyword30: 'Min.',
    keyword31: 'Min.',
    keyword32: '{1} Minute',
    keyword32_plurals: '{1} Minuten',
    keyword33: 'Wird ausgeführt...',
    keyword34: 'Erneut versuchen',
    keyword35: 'Ausschalten',
    keyword36: 'Einschalten',
    keyword37: 'Pause',
    keyword38: 'The motor is reversing',
    keyword39: 'Sicherheitseinstellungen',
    keyword40: 'Shared device has no permission'
  };
},10262,[],"projects/com.jsc.light.wydfn1/modules/i18n/de.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = {
    keyword0: 'Perangkat aktif',
    keyword1: 'Perangkat nonaktif',
    keyword2: 'Aktif/Nonaktif',
    keyword3: 'Pengatur waktu',
    keyword4: 'Hitung mundur',
    keyword5: 'Pengaturan',
    keyword6: 'Pengaturan pintasan',
    keyword7: 'Pengaturan umum',
    keyword8: 'Nama perangkat',
    keyword9: 'Zona waktu perangkat',
    keyword10: 'Kelola lokasi',
    keyword11: 'Bagikan',
    keyword12: 'Otomatisasi',
    keyword13: 'Periksa pembaruan firmware',
    keyword14: 'Pengaturan tambahan',
    keyword15: 'Pertanyaan umum (FAQ)',
    keyword16: 'Umpan balik',
    keyword17: 'Tambahkan ke layar Beranda',
    keyword18: 'Legal info',
    keyword19: 'Hapus perangkat',
    keyword20: 'Kustom',
    keyword21: 'Berhenti',
    keyword22: 'Mulai',
    keyword23: '{1} aktif',
    keyword24: '{1} nonaktif',
    keyword25_0: '{1} jam',
    keyword25_0_plurals: '{1} jam',
    keyword25_1: '{1} menit',
    keyword25_1_plurals: '{1} menit',
    keyword25: 'Mulai setelah {1}',
    keyword26: 'Matikan setelah {1}',
    keyword27: 'Perangkat akan aktif pukul {1}',
    keyword28: 'Perangkat akan mati pada {1}',
    keyword29: 'jam',
    keyword30: 'menit',
    keyword31: 'menit',
    keyword32: '{1} menit',
    keyword32_plurals: '{1} menit',
    keyword33: 'Menjalankan...',
    keyword34: 'Coba lagi',
    keyword35: 'Matikan',
    keyword36: 'Hidupkan',
    keyword37: 'Jeda',
    keyword38: 'The motor is reversing',
    keyword39: 'Setelan keamanan',
    keyword40: 'Shared device has no permission'
  };
},10265,[],"projects/com.jsc.light.wydfn1/modules/i18n/id.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = {
    keyword0: 'Urządzenie jest włączone',
    keyword1: 'Urządzenie jest wyłączone',
    keyword2: 'Wł./Wył.',
    keyword3: 'Czasomierz',
    keyword4: 'Odliczanie',
    keyword5: 'Ustawienia',
    keyword6: 'Ustawienia skrótów',
    keyword7: 'Ustawienia ogólne',
    keyword8: 'Nazwa urządzenia',
    keyword9: 'Strefa czasowa urządzenia',
    keyword10: 'Zarządzaj lokalizacjami',
    keyword11: 'Udostępnij',
    keyword12: 'Automatyzacja',
    keyword13: 'Sprawdź aktualizacje oprogramowania sprzętowe',
    keyword14: 'Dodatkowe ustawienia',
    keyword15: 'FAQ',
    keyword16: 'Informacje zwrotne',
    keyword17: 'Dodaj do ekranu głównego',
    keyword18: 'Legal info',
    keyword19: 'Usuń urządzenie',
    keyword20: 'Niestandardowe',
    keyword21: 'Zatrzymaj',
    keyword22: 'Uruchom',
    keyword23: '{1} jest włączone',
    keyword24: '{1} jest wyłączone',
    keyword25_0: 'Liczba godzin: {1}',
    keyword25_0_plurals: 'Liczba godzin: {1}',
    keyword25_1: 'Liczba minut: {1}',
    keyword25_1_plurals: 'Liczba minut: {1}',
    keyword25: 'Uruchomienie po {1}',
    keyword26: 'Wyłącz po {1}',
    keyword27: 'Urządzenie będzie włączone o {1}',
    keyword28: 'Urządzenie wyłączy się o {1}',
    keyword29: 'godz.',
    keyword30: 'min',
    keyword31: 'min',
    keyword32: '{1} minuta',
    keyword32_plurals: '{1} minuty',
    keyword33: 'Pracuje…',
    keyword34: 'Spróbuj ponownie',
    keyword35: 'Wyłącz',
    keyword36: 'Włącz',
    keyword37: 'Wstrzymaj',
    keyword38: 'The motor is reversing',
    keyword39: 'Ustawienia bezpieczeństwa',
    keyword40: 'Shared device has no permission'
  };
},10268,[],"projects/com.jsc.light.wydfn1/modules/i18n/pl.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = {
    keyword0: 'Thiết bị đang bật',
    keyword1: 'Thiết bị đã tắt',
    keyword2: 'Bật/Tắt',
    keyword3: 'Hẹn giờ',
    keyword4: 'Đếm ngược',
    keyword5: 'Cài đặt',
    keyword6: 'Cài đặt phím tắt',
    keyword7: 'Cài đặt chung',
    keyword8: 'Tên thiết bị',
    keyword9: 'Múi giờ thiết bị',
    keyword10: 'Quản lý các vị trí',
    keyword11: 'Chia sẻ',
    keyword12: 'Tự động',
    keyword13: 'Kiểm tra bản cập nhật chương trình cơ sở',
    keyword14: 'Cài đặt khác',
    keyword15: 'Câu hỏi thường gặp',
    keyword16: 'Phản hồi',
    keyword17: 'Thêm vào Màn hình chính',
    keyword18: 'Legal info',
    keyword19: 'Xóa thiết bị',
    keyword20: 'Tùy chỉnh',
    keyword21: 'Dừng',
    keyword22: 'Bắt đầu',
    keyword23: '{1} đang bật',
    keyword24: '{1} đã tắt',
    keyword25_0: '{1} giờ',
    keyword25_0_plurals: '{1} giờ',
    keyword25_1: '{1} phút',
    keyword25_1_plurals: '{1} phút',
    keyword25: 'Bắt đầu sau {1}',
    keyword26: 'Đóng sau {1}',
    keyword27: 'Thiết bị sẽ bật ở {1}',
    keyword28: 'Thiết bị sẽ tắt ở {1}',
    keyword29: 'giờ',
    keyword30: 'phút',
    keyword31: 'phút',
    keyword32: '{1} phút',
    keyword32_plurals: '{1}phút',
    keyword33: 'Đang thực hiện',
    keyword34: 'Thử lại',
    keyword35: 'Kết thúc',
    keyword36: 'Kích hoạt',
    keyword37: 'Tạm dừng',
    keyword38: 'The motor is reversing',
    keyword39: 'Cài đặt bảo mật',
    keyword40: 'Shared device has no permission'
  };
},10271,[],"projects/com.jsc.light.wydfn1/modules/i18n/vi.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = {
    keyword0: 'デバイスオン',
    keyword1: 'デバイスオフ',
    keyword2: 'オン/オフ',
    keyword3: 'タイマー',
    keyword4: 'カウントダウン',
    keyword5: 'ショートカット設定',
    keyword6: 'デバイス名',
    keyword7: 'デバイスタイムゾーン',
    keyword8: '位置を管理する',
    keyword9: '共有',
    keyword10: '自動化',
    keyword11: '共享',
    keyword12: '智能',
    keyword13: 'ファームウェア更新プログラムの有無を確認する',
    keyword14: '詳細設定',
    keyword15: 'FAQ',
    keyword16: 'フィードバック',
    keyword17: 'ホーム画面に追加する',
    keyword18: 'Legal info',
    keyword19: 'デバイスを削除する',
    keyword20: 'カスタム',
    keyword21: '取消',
    keyword22: '開始',
    keyword23: '{1}オン',
    keyword24: '{1}オフ',
    keyword25_0: '{1} 時間',
    keyword25_0_plurals: '{1} 時間',
    keyword25_1: '{1} 分',
    keyword25_1_plurals: '{1} 分',
    keyword25: '{1} 後に開始する',
    keyword26: '{1} 後にシャットダウンする',
    keyword27: 'デバイスは{1}にオンになります',
    keyword28: 'デバイスは{1}にオフになります',
    keyword29: '時間',
    keyword30: '分',
    keyword31: '分',
    keyword32: '{1}分間',
    keyword32_plurals: '{1}分間',
    keyword33: '実行中',
    keyword34: '再試行する',
    keyword35: 'オフ',
    keyword36: 'オン',
    keyword37: '一時停止',
    keyword38: 'The motor is reversing',
    keyword39: 'セキュリティ設定',
    keyword40: 'Shared device has no permission'
  };
},10274,[],"projects/com.jsc.light.wydfn1/modules/i18n/ja.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = {
    keyword0: 'อุปกรณ์เปิดอยู่',
    keyword1: 'อุปกรณ์ปิดอยู่',
    keyword2: 'เปิด/ปิด',
    keyword3: 'ตัวจับเวลา',
    keyword4: 'นับถอยหลัง',
    keyword5: 'การตั้งค่า',
    keyword6: 'การตั้งค่าทางลัด',
    keyword7: 'การตั้งค่าทั่วไป',
    keyword8: 'ชื่ออุปกรณ์',
    keyword9: 'โซนเวลาของอุปกรณ์',
    keyword10: 'จัดการตำแหน่งที่ตั้ง',
    keyword11: 'แชร์',
    keyword12: 'ระบบอัตโนมัติ',
    keyword13: 'ตรวจสอบหาการอัปเดตเฟิร์มแวร์',
    keyword14: 'การตั้งค่าเพิ่มเติม',
    keyword15: 'คำถามที่พบบ่อย',
    keyword16: 'คำติชม',
    keyword17: 'เพิ่มไปยังหน้าโฮม',
    keyword18: 'Legal info',
    keyword19: 'ลบอุปกรณ์ออก',
    keyword20: 'กำหนดเอง',
    keyword21: 'หยุด',
    keyword22: 'เริ่ม',
    keyword23: '{1}เปิดอยู่',
    keyword24: '{1}ปิดอยู่',
    keyword25_0: '{1} ชั่วโมง',
    keyword25_0_plurals: '{1} ชั่วโมง',
    keyword25_1: '{1} นาที',
    keyword25_1_plurals: '{1} นาที',
    keyword25: 'เริ่มหลังจาก {1}',
    keyword26: 'ปิดเครื่องหลัง {1}',
    keyword27: 'อุปกรณ์จะเปิดที่{1}',
    keyword28: 'อุปกรณ์จะปิดที่{1}',
    keyword29: 'ชม.',
    keyword30: 'น.',
    keyword31: 'น.',
    keyword32: '{1} นาที',
    keyword32_plurals: '{1} นาที',
    keyword33: 'ในการดำเนินการ',
    keyword34: 'ลองอีกครั้ง',
    keyword35: 'ปิด',
    keyword36: 'เปิด',
    keyword37: 'หยดเวลา',
    keyword38: 'The motor is reversing',
    keyword39: 'ตั้งค่าความปลอดภัย',
    keyword40: 'Shared device has no permission'
  };
},10277,[],"projects/com.jsc.light.wydfn1/modules/i18n/th.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var App = function (_Component) {
        babelHelpers.inherits(App, _Component);

        function App() {
            babelHelpers.classCallCheck(this, App);
            return babelHelpers.possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
        }

        babelHelpers.createClass(App, [{
            key: "render",
            value: function render() {
                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: styles.btn
                    },
                    _react2.default.createElement(
                        _reactNative.TouchableOpacity,
                        {
                            style: styles.button,
                            onPress: this.props.onPress
                        },
                        _react2.default.createElement(_reactNative.Image, {
                            style: styles.btnImg,
                            source: this.props.status ? this.props.sourceOn : this.props.sourceOff
                        })
                    ),
                    _react2.default.createElement(
                        _reactNative.Text,
                        {
                            style: styles.btnTxt
                        },
                        " \xA0 ",
                        this.props.name,
                        " \xA0 "
                    )
                );
            }
        }]);
        return App;
    }(_react.Component);

    exports.default = App;

    var _Dimensions$get = _reactNative.Dimensions.get('window'),
        width = _Dimensions$get.width;

    var btnW = width <= 375 ? 20 : 40;

    var styles = _reactNative.StyleSheet.create({
        btn: {
            width: width / 4 - btnW,
            marginLeft: btnW / 2,
            marginRight: btnW / 2,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        },
        btnImg: {
            width: width / 4 - btnW,
            height: width / 4 - btnW,
            overflow: 'hidden'
        },
        btnTxt: {
            height: 20,
            marginTop: 10,
            color: '#fff',
            fontSize: 14
        }
    });
},10280,[10297,10033],"projects/com.jsc.light.wydfn1/main/btn.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/resources",
    "width": 150,
    "height": 150,
    "scales": [1],
    "hash": "dbcf87916aa3e92079088b847d7d0749",
    "name": "power_on_btn",
    "type": "png"
  });
},10283,[10420],"projects/com.jsc.light.wydfn1/resources/power_on_btn.png");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/resources",
    "width": 150,
    "height": 150,
    "scales": [1],
    "hash": "875a7c7ed22e0d7256f60ae061c5f63f",
    "name": "power_off_btn",
    "type": "png"
  });
},10286,[10420],"projects/com.jsc.light.wydfn1/resources/power_off_btn.png");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/resources",
    "width": 164,
    "height": 164,
    "scales": [1],
    "hash": "1723d8d0cf094899a162aaaf3d68a3ad",
    "name": "night_on_btn",
    "type": "png"
  });
},10289,[10420],"projects/com.jsc.light.wydfn1/resources/night_on_btn.png");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/resources",
    "width": 164,
    "height": 164,
    "scales": [1],
    "hash": "7d57ed75b7225a798261d8df9aff4755",
    "name": "night_off_btn",
    "type": "png"
  });
},10292,[10420],"projects/com.jsc.light.wydfn1/resources/night_off_btn.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var _miot = _require(_dependencyMap[2]);

    var _reactNativeLinearGradient = _require(_dependencyMap[3]);

    var _reactNativeLinearGradient2 = babelHelpers.interopRequireDefault(_reactNativeLinearGradient);

    var App = function (_Component) {
        babelHelpers.inherits(App, _Component);

        function App(props) {
            babelHelpers.classCallCheck(this, App);

            var _this = babelHelpers.possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

            _this.state = {
                power: false,
                brightness: 1,
                colorTemperature: 3000
            };
            return _this;
        }

        babelHelpers.createClass(App, [{
            key: "getPropertyValue",
            value: function getPropertyValue() {
                var _this2 = this;

                _miot.Service.spec.getPropertiesValue([{
                    did: _miot.Device.deviceID,
                    siid: 2,
                    piid: 1
                }, {
                    did: _miot.Device.deviceID,
                    siid: 2,
                    piid: 2
                }, {
                    did: _miot.Device.deviceID,
                    siid: 2,
                    piid: 3
                }]).then(function (res) {
                    var _power = res[0].value;
                    var _brightness = res[1].value;
                    var _colorTemperature = res[2].value;

                    _this2.setState({
                        power: _power,
                        colorTemperature: _colorTemperature,
                        brightness: _brightness
                    });
                }).catch(function (err) {
                    return console.log('getPropertiesValue.error', err);
                });
            }
        }, {
            key: "componentDidMount",
            value: function componentDidMount() {
                var _this3 = this;

                this.getPropertyValue();
                this.listener = _reactNative.DeviceEventEmitter.addListener('power', function (data) {
                    _this3.setState({
                        power: data
                    });
                });
                this.listener = _reactNative.DeviceEventEmitter.addListener('brightness', function (data) {
                    _this3.setState({
                        brightness: data
                    });
                });
                this.listener = _reactNative.DeviceEventEmitter.addListener('colorTemperature', function (data) {
                    _this3.setState({
                        colorTemperature: data
                    });
                });
                this.listener = _reactNative.DeviceEventEmitter.addListener('propsState', function (data) {
                    if (data.has('prop.2.1')) {
                        if (_this3.state.power === data.get('prop.2.1')[0]) return;

                        _this3.setState({
                            power: data.get('prop.2.1')[0]
                        });
                    }

                    if (data.has('prop.2.2')) {
                        if (_this3.state.brightness === data.get('prop.2.2')[0]) return;

                        _this3.setState({
                            brightness: data.get('prop.2.2')[0]
                        });
                    }

                    if (data.has('prop.2.3')) {
                        if (_this3.state.colorTemperature === data.get('prop.2.3')[0]) return;

                        _this3.setState({
                            colorTemperature: data.get('prop.2.3')[0]
                        });
                    }
                });
            }
        }, {
            key: "componentWillUnmount",
            value: function componentWillUnmount() {
                this.listener.remove();
            }
        }, {
            key: "render",
            value: function render() {
                var _state = this.state,
                    brightness = _state.brightness,
                    colorTemperature = _state.colorTemperature,
                    power = _state.power;
                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: styles.backgroundGroup
                    },
                    _react2.default.createElement(_reactNativeLinearGradient2.default, {
                        style: [styles.backgroundGroup, styles.background],
                        start: {
                            x: 0.2,
                            y: 0.3
                        },
                        end: {
                            x: 0.7,
                            y: 0.8
                        },
                        colors: ['#636266', '#424058']
                    }),
                    !power || _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: [styles.backgroundGroup, styles.brightness, {
                                opacity: (brightness < 20 ? 20 : brightness) / 100
                            }]
                        },
                        _react2.default.createElement(_reactNativeLinearGradient2.default, {
                            style: [styles.backgroundGroup, styles.background],
                            start: {
                                x: 0.2,
                                y: 0.3
                            },
                            end: {
                                x: 0.7,
                                y: 0.8
                            },
                            colors: ['#e7e7e5', '#afeaf2']
                        }),
                        _react2.default.createElement(_reactNativeLinearGradient2.default, {
                            style: [styles.backgroundGroup, styles.background, {
                                opacity: 1 - (colorTemperature - 3000) / 3400
                            }],
                            start: {
                                x: 0.2,
                                y: 0.3
                            },
                            end: {
                                x: 0.7,
                                y: 0.8
                            },
                            colors: ['#ffd2a0', '#ff7b0f']
                        })
                    ),
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: styles.children
                        },
                        this.props.children
                    )
                );
            }
        }]);
        return App;
    }(_react.Component);

    exports.default = App;

    var _Dimensions$get = _reactNative.Dimensions.get('window'),
        height = _Dimensions$get.height,
        width = _Dimensions$get.width;

    var styles = _reactNative.StyleSheet.create({
        backgroundGroup: {
            width: width,
            height: '100%',
            position: 'relative'
        },
        brightness: {
            position: 'absolute',
            top: 0,
            left: 0
        },
        background: {
            position: 'absolute',
            top: 0,
            left: 0
        },
        children: {
            position: 'absolute',
            top: 0,
            left: 0
        }
    });
},10295,[10297,10033,10074,14299],"projects/com.jsc.light.wydfn1/main/background_model.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _CommonSetting = _require(_dependencyMap[1]);

    var _reactNative = _require(_dependencyMap[2]);

    var _miot = _require(_dependencyMap[3]);

    var _bases = _require(_dependencyMap[4]);

    var _navigator = _require(_dependencyMap[5]);

    var _navigator2 = babelHelpers.interopRequireDefault(_navigator);

    var _function_setting = _require(_dependencyMap[6]);

    var _function_setting2 = babelHelpers.interopRequireDefault(_function_setting);

    var App = function (_Component) {
        babelHelpers.inherits(App, _Component);

        function App(props) {
            babelHelpers.classCallCheck(this, App);

            var _this = babelHelpers.possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

            _this.state = {
                DeviceNeedUpgrade: null
            };
            return _this;
        }

        babelHelpers.createClass(App, [{
            key: "_getLatestVersion",
            value: function _getLatestVersion() {
                var _this2 = this;

                var FW_VERSION = void 0;

                try {
                    FW_VERSION = JSON.parse(_miot.Device.extra).fw_version;
                } catch (err) {
                    FW_VERSION = _miot.Device.extra.fw_version;
                }

                _miot.Service.smarthome.getLatestVersion(_miot.Device.model).then(function (res) {
                    if (res.version > FW_VERSION) _this2.setState({
                        DeviceNeedUpgrade: true
                    });
                }).catch(function (err) {
                    return console.log('getLatestVersion.error:', err);
                });
            }
        }, {
            key: "componentWillMount",
            value: function componentWillMount() {
                this._getLatestVersion();
            }
        }, {
            key: "render",
            value: function render() {
                var first_options = _CommonSetting.SETTING_KEYS.first_options,
                    second_options = _CommonSetting.SETTING_KEYS.second_options;
                var firstOptions = [first_options.SHARE, first_options.IFTTT, _miot.Device.type !== '17' ? first_options.FIRMWARE_UPGRADE : null];
                var secondOptions = [second_options.SECURITY, second_options.FEEDBACK, second_options.TIMEZONE, second_options.ADD_TO_DESKTOP];
                var showDot = [first_options.FIRMWARE_UPGRADE];
                var extraOptions = {
                    showUpgrade: true,
                    option: {
                        privacyURL: _bases.privacyURL,
                        hideAgreement: true,
                        hideUserExperiencePlan: true
                    }
                };
                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: styles.main
                    },
                    _react2.default.createElement(_navigator2.default, {
                        navigation: this.props.navigation
                    }),
                    _react2.default.createElement(
                        _reactNative.ScrollView,
                        null,
                        _miot.Device.isShared || _react2.default.createElement(_function_setting2.default, {
                            navigation: this.props.navigation
                        }),
                        _react2.default.createElement(_CommonSetting.CommonSetting, {
                            navigation: this.props.navigation,
                            firstOptions: firstOptions,
                            secondOptions: secondOptions,
                            showDot: !!this.state.DeviceNeedUpgrade ? showDot : [],
                            extraOptions: extraOptions
                        })
                    )
                );
            }
        }]);
        return App;
    }(_react.Component);

    exports.default = App;

    var _Dimensions$get = _reactNative.Dimensions.get('window'),
        width = _Dimensions$get.width;

    var styles = _reactNative.StyleSheet.create({
        main: {
            width: width,
            height: '100%',
            backgroundColor: '#f7f7f7'
        }
    });
},10298,[10297,10353,10033,10074,10007,10160,10301],"projects/com.jsc.light.wydfn1/setting/index.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var _miot = _require(_dependencyMap[2]);

    var _ListItem = _require(_dependencyMap[3]);

    var _consts = _require(_dependencyMap[4]);

    var MODEL = _miot.Device.model.split('.')[0];

    var App = function (_Component) {
        babelHelpers.inherits(App, _Component);

        function App(props) {
            babelHelpers.classCallCheck(this, App);

            var _this = babelHelpers.possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

            _this.SwitchBaseProps = {
                siid: 2,
                piid: 1
            };
            _this.state = {
                DeviceNeedUpgrade: false,
                isDevelopers: false
            };
            return _this;
        }

        babelHelpers.createClass(App, [{
            key: "_setTime",
            value: function _setTime() {
                if (!this.SwitchBaseProps) {
                    return;
                }

                var switchOnProps = babelHelpers.extends({}, this.SwitchBaseProps, {
                    value: true,
                    did: _miot.Device.deviceID
                });
                var switchOffProps = babelHelpers.extends({}, this.SwitchBaseProps, {
                    value: false,
                    did: _miot.Device.deviceID
                });

                _miot.Host.ui.openTimerSettingPageWithVariousTypeParams('set_properties', [switchOnProps], 'set_properties', [switchOffProps]);
            }
        }, {
            key: "_timer",
            value: function _timer() {
                if (!this.SwitchBaseProps) {
                    return;
                }

                var now = new Date();
                var firstCountdownTimer = this.firstCountdownTimer;
                var firstCountdownTime = this.firstCountdownTimer && this.firstCountdownTimer.time > now ? this.firstCountdownTimer.time : now;
                var onParam = babelHelpers.extends({}, this.SwitchBaseProps, {
                    value: true,
                    did: _miot.Device.deviceID
                });
                var offParam = babelHelpers.extends({}, this.SwitchBaseProps, {
                    value: false,
                    did: _miot.Device.deviceID
                });
                this.props.navigation.navigate('Countdown', {
                    hideRightButton: true,
                    title: _consts.LocalizedString.timer(),
                    countdownTimer: this.firstCountdownTimer && this.firstCountdownTimer.time > now ? this.firstCountdownTimer.timer : null,
                    onMethod: 'set_properties',
                    offMethod: 'set_properties',
                    onParam: [onParam],
                    offParam: [offParam]
                });
            }
        }, {
            key: "_LightGroup",
            value: function _LightGroup() {
                try {
                    _miot.Host.ui.openMeshDeviceGroupPage(_miot.Device.type === '17' ? 'edit' : 'add', _miot.Device.deviceID);
                } catch (err) {
                    console.log('openMeshDeviceGroupPage.error:', err);
                }
            }
        }, {
            key: "_firmwareUpgrate",
            value: function _firmwareUpgrate() {
                try {
                    _miot.Host.ui.openBleMeshDeviceUpgradePage();
                } catch (err) {
                    console.log('openBleMeshDeviceUpgradePage.error:', err);
                }
            }
        }, {
            key: "_getLatestVersion",
            value: function _getLatestVersion() {
                var _this2 = this;

                var FW_VERSION = void 0;

                try {
                    FW_VERSION = JSON.parse(_miot.Device.extra).fw_version;
                } catch (err) {
                    FW_VERSION = _miot.Device.extra.fw_version;
                }

                _miot.Service.smarthome.getLatestVersion(_miot.Device.model).then(function (res) {
                    if (res.version > FW_VERSION) _this2.setState({
                        DeviceNeedUpgrade: true
                    });
                }).catch(function (err) {
                    return console.log('getLatestVersion.error:', err);
                });
            }
        }, {
            key: "getDevelopersConfig",
            value: function getDevelopersConfig() {
                var _this3 = this;

                _miot.Service.storage.getThirdUserConfigs(_miot.Device.model, 1).then(function (_) {
                    var isDevelopers = _[0].data.isDevelopers;

                    _this3.setState({
                        isDevelopers: !!isDevelopers
                    });
                }).catch(function (err) {
                    return console.log('getThirdUserConfigs.error:', err);
                });
            }
        }, {
            key: "componentWillMount",
            value: function componentWillMount() {
                this._getLatestVersion();

                this.getDevelopersConfig();
            }
        }, {
            key: "render",
            value: function render() {
                var _this4 = this;

                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: styles.setting
                    },
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: styles.title
                        },
                        _react2.default.createElement(
                            _reactNative.Text,
                            {
                                style: styles.tit
                            },
                            _consts.LocalizedString.featureSetting()
                        )
                    ),
                    _react2.default.createElement(_ListItem.ListItem, {
                        title: _consts.LocalizedString.setTime(),
                        onPress: this._setTime.bind(this)
                    }),
                    _react2.default.createElement(_ListItem.ListItem, {
                        title: _consts.LocalizedString.timer(),
                        onPress: this._timer.bind(this)
                    }),
                    MODEL === 'lejiaj' ? _react2.default.createElement(_ListItem.ListItem, {
                        title: _miot.Device.type === '17' ? _consts.LocalizedString.EditLightGroup() : _consts.LocalizedString.CreateALightGroup(),
                        onPress: this._LightGroup.bind(this)
                    }) : null,
                    !!this.state.isDevelopers ? _react2.default.createElement(_ListItem.ListItem, {
                        title: '设备设置（开发者模式）',
                        onPress: function onPress() {
                            _this4.props.navigation.navigate('DeveloperModePage', {
                                title: '设备设置（开发者模式）',
                                refresh: function refresh() {}
                            });
                        }
                    }) : null
                );
            }
        }]);
        return App;
    }(_react.Component);

    exports.default = App;

    var _Dimensions$get = _reactNative.Dimensions.get('window'),
        width = _Dimensions$get.width;

    var styles = _reactNative.StyleSheet.create({
        setting: {
            width: width,
            backgroundColor: '#fff',
            borderBottomWidth: 10,
            borderColor: '#f7f7f7'
        },
        title: {
            height: 32,
            marginLeft: 24,
            borderBottomWidth: 0.3,
            borderBottomColor: '#d9d9d9',
            borderStyle: 'solid',
            flexDirection: 'row',
            alignItems: 'center'
        },
        tit: {
            color: '#909090',
            fontSize: 11
        }
    });
},10301,[10297,10033,10074,10338,10229],"projects/com.jsc.light.wydfn1/setting/function_setting.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react = _require(_dependencyMap[0]);

  var _react2 = babelHelpers.interopRequireDefault(_react);

  var _reactNative = _require(_dependencyMap[1]);

  var _reactNavigation = _require(_dependencyMap[2]);

  var _ReactNativeART = _require(_dependencyMap[3]);

  var _ReactNativeART2 = babelHelpers.interopRequireDefault(_ReactNativeART);

  var _consts = _require(_dependencyMap[4]);

  var _miot = _require(_dependencyMap[5]);

  var _ui = _require(_dependencyMap[6]);

  var _navigator = _require(_dependencyMap[7]);

  var _navigator2 = babelHelpers.interopRequireDefault(_navigator);

  var Surface = _ReactNativeART2.default.Surface,
      Path = _ReactNativeART2.default.Path,
      Group = _ReactNativeART2.default.Group,
      Transform = _ReactNativeART2.default.Transform,
      Shape = _ReactNativeART2.default.Shape;

  var count_down_timer_thumb_on = _require(_dependencyMap[8]);

  var count_down_timer_thumb_off = _require(_dependencyMap[9]);

  var window = _reactNative.Dimensions.get('window');

  var WIDTH = window.width;
  var HEIGHT = window.height;
  var ratio = WIDTH / 375 > 1.5 ? 1.5 : WIDTH / 375;
  var isIphoneX = false;

  var pickHour = function () {
    var ret = [];

    for (var i = 0; i < 24; i++) {
      ret.push({
        value: i,
        label: String(i)
      });
    }

    return ret;
  }();

  var pickMinutes = function () {
    var ret = [];

    for (var i = 0; i < 60; i++) {
      ret.push({
        value: i,
        label: String(i)
      });
    }

    return ret;
  }();

  var CIRCLE_PATH = "M" + 173.5 * ratio + " " + 20.43 * ratio + " A" + 130 * ratio + " " + 130 * ratio + ", 0, 1, 0, " + 201.5 * ratio + " " + 20.43 * ratio;
  var P_CIRCLE_PATH = 'M151 37 A 14 14, 0, 1, 1, 150 37 Z';
  var POINTER_PATH = 'M148 46 L154 50 L148 54';
  var LINE_PATH = "M" + WIDTH / 2 + " " + 16.1 * ratio + " v" + 17 * ratio;
  var DeviceID = _miot.Device.deviceID;

  var styles = _reactNative.StyleSheet.create({
    background: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#ff7b0f'
    },
    safearea: {
      flex: 1,
      width: '100%'
    },
    pointerContainer: {
      width: 100 * ratio,
      height: 100 * ratio,
      position: 'absolute',
      backgroundColor: 'transparent',
      left: 160 * ratio
    },
    pointer: {
      width: 24 * ratio,
      height: 24 * ratio,
      marginTop: 8 * ratio,
      marginLeft: 15 * ratio
    },
    circleContainer: {
      position: 'absolute',
      top: '50%',
      marginTop: -150 * ratio,
      width: 375 * ratio,
      left: (WIDTH - 375 * ratio) / 2,
      height: 300 * ratio,
      overflow: 'visible',
      backgroundColor: 'transparent'
    },
    triangle: {
      width: 24 * ratio,
      height: 24 * ratio,
      marginTop: 3 * ratio,
      marginLeft: 14 * ratio
    },
    surfaceContainer: {
      position: 'absolute',
      top: '50%',
      transform: [{
        translateY: -260 / 2 * ratio
      }],
      width: 375 * ratio,
      left: (WIDTH - 375 * ratio) / 2,
      height: 260 * ratio
    },
    surface: {
      backgroundColor: 'transparent'
    },
    centerTextWrap: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: [{
        translateY: -200 / 2 * ratio
      }, {
        translateX: -200 / 2 * ratio
      }],
      width: 200 * ratio,
      height: 200 * ratio,
      justifyContent: 'center',
      alignItems: 'center'
    },
    centerText: {
      fontSize: 18 * ratio,
      color: '#FFFFFF',
      textAlign: 'center',
      fontFamily: 'MI-LANTING--GBK1-Light'
    },
    rotate: {
      position: 'absolute'
    },
    top: {
      flex: 1,
      backgroundColor: 'transparent'
    },
    bottom: {
      backgroundColor: 'white',
      paddingBottom: isIphoneX ? 44 : 10
    },
    list: {
      height: 167,
      marginBottom: 10,
      overflow: 'scroll'
    },
    item: {
      height: 55,
      borderBottomWidth: 1,
      borderColor: '#E4E4E4',
      justifyContent: 'center'
    },
    listText: {
      paddingLeft: 21 * ratio,
      fontSize: 12,
      color: '#333333',
      fontFamily: 'MI-LANTING--GBK1-Light'
    },
    button: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    cancelContainer: {
      flexDirection: 'row'
    },
    confirm: {
      width: 300,
      height: 50,
      borderWidth: 1,
      borderRadius: 25,
      borderColor: '#E4E4E4',
      alignItems: 'center',
      justifyContent: 'center'
    },
    confirmText: {
      fontSize: 15,
      color: '#333333',
      fontFamily: 'MI-LANTING--GBK1-Light'
    },
    cancel: {
      width: 150,
      height: 50,
      borderWidth: 1,
      borderTopLeftRadius: 25,
      borderBottomLeftRadius: 25,
      borderColor: '#E4E4E4',
      alignItems: 'center',
      justifyContent: 'center'
    },
    stop: {
      width: 150,
      height: 50,
      borderWidth: 1,
      borderTopRightRadius: 25,
      borderBottomRightRadius: 25,
      borderColor: '#E4E4E4',
      alignItems: 'center',
      justifyContent: 'center'
    },
    pickerCover: {
      width: WIDTH,
      position: 'absolute',
      top: 0,
      bottom: 0,
      backgroundColor: 'transparent',
      paddingBottom: isIphoneX ? 44 : 10
    },
    pickerTop: {
      width: WIDTH,
      flex: 1,
      marginTop: 0,
      backgroundColor: '#000',
      opacity: 0.4
    },
    pickerBottom: {
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      width: WIDTH,
      paddingBottom: 0
    },
    pickerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: 167,
      width: WIDTH,
      overflow: 'scroll'
    },
    picker: {
      width: 100,
      height: 167
    },
    pickerConfirm: {
      width: 300,
      height: 50,
      borderWidth: 1,
      borderRadius: 25,
      borderColor: '#E4E4E4',
      marginTop: 10,
      alignItems: 'center',
      justifyContent: 'center'
    },
    pickerText: {
      fontSize: 20
    },
    text: {
      position: 'absolute',
      alignSelf: 'center',
      backgroundColor: 'transparent',
      color: '#FFFFFF',
      fontSize: 20
    }
  });

  var circle = _react2.default.createElement(
    Surface,
    {
      width: WIDTH,
      height: 427.536 * ratio,
      style: [styles.surface]
    },
    _react2.default.createElement(Shape, {
      d: CIRCLE_PATH,
      stroke: "#FFFFFF",
      strokeWidth: 1
    })
  );

  var CountDown = function (_React$Component) {
    babelHelpers.inherits(CountDown, _React$Component);

    function CountDown(props) {
      babelHelpers.classCallCheck(this, CountDown);

      var _this = babelHelpers.possibleConstructorReturn(this, (CountDown.__proto__ || Object.getPrototypeOf(CountDown)).call(this, props));

      _this.rows = [];
      _this.lastTimer = null;
      _this.onMethod = '';
      _this.onParam = null;
      _this.offMethod = '';
      _this.offParam = null;
      _this.deviceStateKnown = false;
      _this.countdownTimerKnown = false;

      _this.showLoadingTips = function (tip) {
        return;
        _this.timerTips && clearTimeout(_this.timerTips);

        _this.setState({
          showDialog: true,
          dialogTimeout: 0,
          dialogTitle: tip
        });
      };

      _this.dismissTips = function () {
        _this.timerTips && clearTimeout(_this.timerTips);
        setTimeout(function () {
          _this.setState({
            showDialog: false,
            dialogTimeout: 0,
            dialogTitle: ''
          });
        }, 300);
      };

      _this.showFailTips = function (tip) {
        _this.setState({
          showDialog: true,
          dialogTimeout: 300,
          dialogTitle: tip
        });

        _this.timerTips && clearTimeout(_this.timerTips);
        _this.timerTips = setTimeout(function () {
          _this.dismissTips();
        }, 300);
      };

      _this.setRotation = function (x, y, vx) {
        if (x >= 0 && y >= 0) {
          return (0.5 * Math.PI - Math.atan(y / x)) * (180 / Math.PI);
        } else if (x > 0 && y < 0) {
          return (0.5 * Math.PI + Math.atan(-y / x)) * (180 / Math.PI);
        } else if (x <= 0 && y <= 0) {
          return (Math.PI + Math.atan(Math.abs(x / y))) * (180 / Math.PI);
        } else if (x < 0 && y > 0) {
          return (2 * Math.PI - Math.atan(-x / y)) * (180 / Math.PI);
        }
      };

      _this.lastX = WIDTH / 2;
      _this.lastY = 0;

      _this.initCountingInterval = function () {
        _this.countingInterval && clearInterval(_this.countingInterval);
        _this.countingInterval = setInterval(function () {
          if (!_this.state.isCounting || !_this.lastTimer || !_this.deviceStateKnown || !_this.countdownTimerKnown) {
            return;
          }

          var lastTimer = _this.lastTimer;
          var on = _this.state.on;
          var now = new Date();
          var then = on ? lastTimer.formatedOffTime : lastTimer.formatedOnTime;
          var diffSeconds = Math.ceil((then.getTime() - now.getTime()) / 1000);
          var hourFromNow = Math.floor(diffSeconds / 3600);
          var minuteFromNow = Math.ceil((diffSeconds - hourFromNow * 3600) / 60);

          if (minuteFromNow === 60) {
            hourFromNow += 1;
            minuteFromNow = 0;
          }

          if (hourFromNow <= 0 && minuteFromNow <= 0) {
            _this.setState({
              isCounting: false,
              circleCount: 0,
              hours: 0,
              minutes: 0,
              rotation: 0
            });

            _this.lastTimer = null;
            return;
          }

          _this.setState({
            isCounting: true,
            circleCount: hourFromNow,
            hours: hourFromNow,
            minutes: minuteFromNow,
            rotation: minuteFromNow * 6 + hourFromNow * 360
          });
        }, 1000);
      };

      _this.initParams = function () {
        var navigation = _this.props.navigation;
        var on = navigation.getParam('on');
        var hideRightButton = navigation.getParam('hideRightButton');
        var countdownTimer = navigation.getParam('countdownTimer');
        var onMethod = navigation.getParam('onMethod');
        var onParam = navigation.getParam('onParam');
        var offMethod = navigation.getParam('offMethod');
        var offParam = navigation.getParam('offParam');
        navigation.setParams({
          barColor: 'white',
          hideRightButton: true
        });
        var firstOnParam = onParam && onParam[0];
        var firstOffParam = offParam && offParam[0];

        if (!onMethod || !offMethod || !firstOnParam || !firstOffParam || !firstOnParam.hasOwnProperty('siid') || !firstOnParam.hasOwnProperty('piid') || !firstOffParam.hasOwnProperty('siid') || !firstOffParam.hasOwnProperty('piid')) {
          _this.showFailTips(_consts.LocalizedString.failed());

          return;
        }

        _this.onMethod = onMethod;
        _this.onParam = onParam;
        _this.offMethod = offMethod;
        _this.offParam = offParam;
        _this.siid = firstOnParam.siid;
        _this.piid = firstOnParam.piid;

        if (typeof on !== 'undefined') {
          _this.setState({
            on: on
          });

          _this.deviceStateKnown = true;
        } else {
          _this.getDeviceState();
        }

        if (countdownTimer) {
          _this.timers = [{
            timer: countdownTimer,
            formatedOnTime: (0, _consts.formatTimerTime)(countdownTimer.setting.on_time),
            formatedOffTime: (0, _consts.formatTimerTime)(countdownTimer.setting.off_time)
          }];
          _this.countdownTimerKnown = true;
        } else {
          _this.loadCountdownTimer();
        }

        _this.tryInitFirstPaint();
      };

      _this.findLastTimer = function (timers, on, now) {
        if (!timers || !timers.length) {
          return null;
        }

        if (!now) {
          now = new Date();
        }

        var sortedTimers = [].concat(babelHelpers.toConsumableArray(timers));

        function sortByOnTime(a, b) {
          return a.formatedOnTime > b.formatedOnTime ? 1 : -1;
        }

        ;

        function sortByOffTime(a, b) {
          return a.formatedOffTime > b.formatedOffTime ? 1 : -1;
        }

        ;
        sortedTimers.sort(on ? sortByOffTime : sortByOnTime);
        var ret = sortedTimers.find(function (timer) {
          return on ? timer.formatedOffTime > now && timer.timer.setting.enable_timer_off === '1' : timer.formatedOnTime > now && timer.timer.setting.enable_timer_on === '1';
        });
        return ret;
      };

      _this.tryInitFirstPaint = function () {
        if (!_this.deviceStateKnown || !_this.countdownTimerKnown) {
          return;
        }

        var on = _this.state.on;
        var now = new Date();

        var lastTimer = _this.findLastTimer(_this.timers, on, now);

        if (!lastTimer) {
          return;
        }

        var then = on ? lastTimer.formatedOffTime : lastTimer.formatedOnTime;
        var diffSeconds = Math.ceil((then.getTime() - now.getTime()) / 1000);
        var hourFromNow = Math.floor(diffSeconds / 3600);
        var minuteFromNow = Math.ceil((diffSeconds - hourFromNow * 3600) / 60);

        if (minuteFromNow === 60) {
          hourFromNow += 1;
          minuteFromNow = 0;
        }

        if (hourFromNow <= 0 && minuteFromNow <= 0) {
          return;
        }

        _this.setState({
          isCounting: true,
          circleCount: hourFromNow,
          hours: hourFromNow,
          minutes: minuteFromNow,
          rotation: minuteFromNow * 6 + hourFromNow * 360
        });

        _this.lastTimer = lastTimer;
      };

      _this.getDeviceState = function () {
        _miot.Service.spec.getPropertiesValue([{
          did: DeviceID,
          siid: _this.siid,
          piid: _this.piid
        }]).then(function (_) {
          if (!_ || !_[0]) {
            _this.showFailTips(_consts.LocalizedString.failed());

            return;
          }

          var value = _[0].value;

          if (typeof value === 'undefined') {
            _this.showFailTips(_consts.LocalizedString.failed());

            return;
          }

          var on = _this.offParam[0].value === value ? false : true;

          _this.setState({
            on: on
          });

          _this.deviceStateKnown = true;

          _this.tryInitFirstPaint();
        }).catch(function (_) {});
      };

      _this.loadCountdownTimer = function () {
        _miot.Service.scene.loadTimerScenes(DeviceID, {
          identify: DeviceID
        }).then(function (_) {
          _this.timers = _.filter(function (timer) {
            return timer.deviceID === DeviceID && timer.setting.enable_timer === '1' && timer.setting.timer_type === '1' && timer.status === 0;
          }).map(function (timer) {
            return {
              timer: timer,
              formatedOnTime: (0, _consts.formatTimerTime)(timer.setting.on_time),
              formatedOffTime: (0, _consts.formatTimerTime)(timer.setting.off_time)
            };
          });
          _this.countdownTimerKnown = true;

          _this.tryInitFirstPaint();
        }).catch(function (_) {});
      };

      _this._onQuickSet = function (Rowdata) {
        var that = _this;

        function closure() {
          if (Rowdata.type == 1) {
            that.setState({
              circleCount: 0,
              rotation: Rowdata.rotation,
              hours: 0,
              minutes: Math.floor(Rowdata.rotation % 360 / 6),
              isCounting: false
            });
          } else {
            that.setState({
              showPicker: true,
              isCounting: false
            });
            return;
          }
        }

        return closure;
      };

      _this.isLeapYear = function (Year) {
        if (Year % 4 == 0 && Year % 100 != 0 || Year % 400 == 0) {
          return true;
        } else {
          return false;
        }
      };

      _this.isCrossMonth = function (month, date) {
        if (date <= 28) {
          return false;
        }

        ;

        if (month == 2) {
          var currentDate = new Date();

          if (date > 28 && !_this.isLeapYear(currentDate.getFullYear()) || date > 29 && _this.isLeapYear(currentDate.getFullYear())) {
            return true;
          } else {
            return false;
          }
        } else if (month == 4 || month == 6 || month == 9 || month == 11) {
          if (date > 30) {
            return true;
          }
        } else {
          if (date > 31) {
            return true;
          }
        }

        ;
        return false;
      };

      _this.setTime = function (isCountDown) {
        var currentDate = new Date();
        var setedMin = isCountDown ? currentDate.getMinutes() + _this.state.minutes : currentDate.getMinutes();
        var setedHour = isCountDown ? currentDate.getHours() + _this.state.hours : currentDate.getHours();
        var setedDate = currentDate.getDate();
        var setedDay = currentDate.getDay();
        var setedMonth = currentDate.getMonth() + 1;

        if (setedMin >= 60) {
          setedMin -= 60;
          setedHour++;
        }

        ;

        if (setedHour >= 24) {
          setedHour -= 24;
          setedDay++;
          setedDate++;
        }

        ;

        if (setedDay > 6) {
          setedDay = setedDay % 7;
        }

        ;

        if (_this.isCrossMonth(setedMonth, setedDate)) {
          setedDate = 1;
          setedMonth++;
        }

        ;

        if (setedMonth > 12) {
          setedMonth == 1;
        }

        ;
        var setedString = setedMin + " " + setedHour + " " + setedDate + " " + setedMonth + " *";
        return setedString;
      };

      _this._onConfirm = function () {
        if (_this.state.rotation == 0) {
          return;
        }

        ;
        var _this$state = _this.state,
            on = _this$state.on,
            onMethod = _this$state.onMethod,
            onParam = _this$state.onParam,
            offMethod = _this$state.offMethod,
            offParam = _this$state.offParam;
        var pickerData = {
          identify: DeviceID,
          name: _miot.Device.name,
          sceneID: _this.lastTimer ? _this.lastTimer.timer.sceneID : null,
          us_id: _this.lastTimer ? _this.lastTimer.timer.sceneID : null,
          setting: {
            enable_timer: JSON.stringify(Number(true)),
            on_time: _this.setTime(!on),
            enable_timer_on: JSON.stringify(Number(!on)),
            off_time: _this.setTime(on),
            enable_timer_off: JSON.stringify(Number(on)),
            on_method: _this.onMethod,
            off_method: _this.offMethod,
            on_param: _this.onParam,
            off_param: _this.offParam,
            timer_type: JSON.stringify(1)
          },
          authed: [DeviceID],
          did: DeviceID
        };

        _this.showLoadingTips(_consts.LocalizedString.handling());

        var scene = _miot.Service.scene.createTimerScene(DeviceID, pickerData);

        scene.save().then(function (response) {
          _this.dismissTips();

          if (response.status !== 0) {
            if (!_miot.Device.isOwner) {
              _this.showFailTips(_consts.LocalizedString.noSharedPermission());

              return;
            }

            _this.showFailTips(_consts.LocalizedString.failed());

            return;
          }

          _this.setState({
            isCounting: true,
            showPicker: false
          });

          _this.lastTimer = {
            timer: scene,
            formatedOnTime: (0, _consts.formatTimerTime)(scene.setting.on_time),
            formatedOffTime: (0, _consts.formatTimerTime)(scene.setting.off_time)
          };
        }).catch(function () {
          if (!_miot.Device.isOwner) {
            _this.showFailTips(_consts.LocalizedString.noSharedPermission());

            return;
          }

          _this.showFailTips(_consts.LocalizedString.failed());
        });
      };

      _this._onCancel = function () {
        if (!_this.lastTimer) {
          return;
        }

        var scene = _this.lastTimer.timer;

        if (!scene) {
          return;
        }

        _this.showLoadingTips(_consts.LocalizedString.handling());

        scene.remove().then(function (response) {
          _this.dismissTips();

          if (response.code == undefined || response.code == 0) {
            _this.setState({
              circleCount: 0,
              rotation: 0,
              hours: 0,
              minutes: 0,
              isCounting: false
            });

            _this.lastTimer = null;
          } else {
            _this.showFailTips(_consts.LocalizedString.failed());
          }
        }).catch(function (_) {
          _this.showFailTips(_consts.LocalizedString.failed());
        });
      };

      _this.formatRows = function () {
        var rows = _this.rows;

        if (rows.length == 0) {
          for (var i = 0; i < 360; i += 2) {
            rows.push(_react2.default.createElement(Shape, {
              key: i,
              d: LINE_PATH,
              opacity: 0.5,
              transform: new Transform().rotate(i, WIDTH / 2, 130 * ratio),
              stroke: "#FFFFFF",
              strokeWidth: 1
            }));
          }

          return rows;
        }

        for (var _i = 0; _i < 360; _i += 2) {
          var o = rows[_i / 2].props.opacity;

          if (_i < _this.state.rotation && o === 1 || _i >= _this.state.rotation && o === 0.5) {} else {
            rows[_i / 2] = _react2.default.createElement(Shape, {
              key: _i,
              d: LINE_PATH,
              opacity: _i < _this.state.rotation ? 1 : 0.5,
              transform: new Transform().rotate(_i, WIDTH / 2, 130 * ratio),
              stroke: "#FFFFFF",
              strokeWidth: 1
            });
          }
        }

        return rows;
      };

      _this.formatButtons = function () {
        var isCounting = _this.state.isCounting;
        var fn = _this.state.isCounting ? _this._onCancel : _this._onConfirm;
        var text = _this.state.isCounting ? _consts.LocalizedString.cancel() : _consts.LocalizedString.startUp();
        return _react2.default.createElement(
          _reactNative.TouchableHighlight,
          {
            underlayColor: "#E4E4E4",
            style: styles.confirm,
            onPress: fn
          },
          _react2.default.createElement(
            _reactNative.Text,
            {
              style: styles.confirmText
            },
            text
          )
        );
      };

      _this.formatPointer = function () {
        var isCounting = _this.state.isCounting;

        if (isCounting) {
          return _react2.default.createElement(
            _reactNative.View,
            babelHelpers.extends({
              style: styles.pointerContainer
            }, _this._panResponder.panHandlers),
            _react2.default.createElement(
              _reactNative.View,
              null,
              _react2.default.createElement(_reactNative.Image, {
                style: styles.triangle,
                source: count_down_timer_thumb_on,
                resizeMode: "contain"
              })
            )
          );
        }

        return _react2.default.createElement(
          _reactNative.View,
          babelHelpers.extends({
            style: styles.pointerContainer
          }, _this._panResponder.panHandlers),
          _react2.default.createElement(_reactNative.Image, {
            style: styles.pointer,
            source: count_down_timer_thumb_off
          })
        );
      };

      var ds = new _reactNative.ListView.DataSource({
        rowHasChanged: function rowHasChanged(r1, r2) {
          return r1 !== r2;
        }
      });
      _this.state = {
        dataSource: ds.cloneWithRows([{
          type: 1,
          rotation: 6,
          text: _consts.LocalizedString.minute(1)
        }, {
          type: 1,
          rotation: 18,
          text: _consts.LocalizedString.minutes(3)
        }, {
          type: 1,
          rotation: 30,
          text: _consts.LocalizedString.minutes(5)
        }, {
          type: 2,
          text: _consts.LocalizedString.customize()
        }]),
        rotation: 0,
        circleCount: 0,
        minutes: 0,
        hours: 0,
        showPicker: false,
        isCounting: false,
        on: false,
        showDialog: false,
        dialogTimeout: 0,
        dialogTitle: '',
        hideRightButton: false
      };
      return _this;
    }

    babelHelpers.createClass(CountDown, [{
      key: "componentWillMount",
      value: function componentWillMount() {
        var _this2 = this;

        this._panResponder = _reactNative.PanResponder.create({
          onStartShouldSetPanResponder: function onStartShouldSetPanResponder() {
            return true;
          },
          onMoveShouldSetPanResponder: function onMoveShouldSetPanResponder() {
            return true;
          },
          onPanResponderGrant: function onPanResponderGrant(event, gestureState) {
            _this2.setState({
              x0: gestureState.x0,
              y0: gestureState.y0
            });
          },
          onPanResponderMove: function onPanResponderMove(event, gestureState) {
            if (_this2.state.circleCount == 0 && _this2.lastX >= WIDTH / 2 && gestureState.moveX <= WIDTH / 2 && _this2.state.rotation < 120) {
              _this2.setState({
                rotation: 0,
                minutes: 0,
                hours: 0
              });

              return;
            }

            ;

            if (_this2.lastX < WIDTH / 2 && gestureState.moveX >= WIDTH / 2 && gestureState.moveY < 222) {
              _this2.setState({
                isCounting: false,
                circleCount: _this2.state.circleCount + 1,
                hours: _this2.state.hours + 1,
                rotation: _this2.setRotation(gestureState.moveX - WIDTH / 2, 222 * ratio - gestureState.moveY, gestureState.vx) + (_this2.state.circleCount + 1) * 360,
                minutes: Math.floor(_this2.state.rotation % 360 / 6)
              });
            } else if (_this2.lastX > WIDTH / 2 && gestureState.moveX <= WIDTH / 2 && gestureState.moveY < 222 * ratio) {
              _this2.setState({
                isCounting: false,
                circleCount: _this2.state.circleCount - 1,
                hours: _this2.state.hours - 1,
                rotation: _this2.setRotation(gestureState.moveX - WIDTH / 2, 222 * ratio - gestureState.moveY, gestureState.vx) + (_this2.state.circleCount - 1) * 360,
                minutes: Math.floor(_this2.state.rotation % 360 / 6)
              });
            } else {
              _this2.setState({
                isCounting: false,
                rotation: _this2.setRotation(gestureState.moveX - WIDTH / 2, 222 * ratio - gestureState.moveY, gestureState.vx) + _this2.state.circleCount * 360,
                minutes: Math.floor(_this2.state.rotation % 360 / 6)
              });
            }

            _this2.lastX = gestureState.moveX;
            _this2.lastY = gestureState.moveY;
          }
        });
        this._panResponderCancelPicker = _reactNative.PanResponder.create({
          onStartShouldSetPanResponder: function onStartShouldSetPanResponder() {
            return true;
          },
          onMoveShouldSetPanResponder: function onMoveShouldSetPanResponder() {
            return true;
          },
          onPanResponderGrant: function onPanResponderGrant(event, gestureState) {
            _this2.setState({
              showPicker: false
            });
          }
        });
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this3 = this;

        this.initParams();
        this.initCountingInterval();
        this.listener = _reactNative.DeviceEventEmitter.addListener('propsState', function (data) {
          if (data.has('prop.2.1')) {
            console.log('power:', data.get('prop.2.1')[0]);

            _this3.setState({
              on: data.get('prop.2.1')[0]
            });
          }
        });
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.rows = [];
        this.countingInterval && clearInterval(this.countingInterval);
        this.listener.remove();
      }
    }, {
      key: "render",
      value: function render() {
        var _this4 = this;

        var _state = this.state,
            showDialog = _state.showDialog,
            dialogTitle = _state.dialogTitle,
            dialogTimeout = _state.dialogTimeout,
            hideRightButton = _state.hideRightButton,
            on = _state.on;
        var rows = this.formatRows();
        var buttons = this.formatButtons();
        var pointer = this.formatPointer();
        var countdownTip = on ? _consts.LocalizedString.countdownTipOff(this.state.hours, this.state.minutes) : _consts.LocalizedString.countdownTipOn(this.state.hours, this.state.minutes);
        return _react2.default.createElement(
          _reactNative.View,
          {
            style: styles.background
          },
          _react2.default.createElement(_navigator2.default, {
            navigation: this.props.navigation
          }),
          _react2.default.createElement(
            _reactNative.View,
            {
              style: {
                flex: 1
              }
            },
            _react2.default.createElement(
              _reactNative.View,
              {
                style: [{
                  width: WIDTH
                }, styles.top]
              },
              _react2.default.createElement(
                _reactNative.View,
                {
                  style: styles.centerTextWrap
                },
                _react2.default.createElement(
                  _reactNative.Text,
                  {
                    style: styles.centerText
                  },
                  countdownTip
                )
              ),
              _react2.default.createElement(
                _reactNative.View,
                {
                  style: styles.surfaceContainer
                },
                _react2.default.createElement(
                  Surface,
                  {
                    width: WIDTH,
                    height: 427.536 * ratio,
                    style: [styles.surface]
                  },
                  _react2.default.createElement(
                    Group,
                    null,
                    rows
                  )
                )
              ),
              _react2.default.createElement(
                _reactNative.View,
                {
                  style: [{
                    transform: [{
                      rotate: this.state.rotation + 'deg'
                    }]
                  }, styles.circleContainer]
                },
                circle,
                pointer
              )
            ),
            _react2.default.createElement(
              _reactNative.View,
              {
                style: [{
                  width: WIDTH
                }, styles.bottom]
              },
              _react2.default.createElement(_reactNative.ListView, {
                style: styles.list,
                automaticallyAdjustContentInsets: false,
                dataSource: this.state.dataSource,
                renderRow: function renderRow(rowData) {
                  return _react2.default.createElement(
                    _reactNative.TouchableHighlight,
                    {
                      underlayColor: "#E4E4E4",
                      style: styles.item,
                      onPress: _this4._onQuickSet(rowData).bind(_this4)
                    },
                    _react2.default.createElement(
                      _reactNative.Text,
                      {
                        style: styles.listText
                      },
                      rowData.text
                    )
                  );
                }
              }),
              _react2.default.createElement(
                _reactNative.View,
                {
                  style: styles.button
                },
                buttons
              )
            )
          ),
          _react2.default.createElement(
            _reactNative.View,
            {
              style: [styles.pickerCover, {
                top: this.state.showPicker ? 0 : 9999
              }]
            },
            _react2.default.createElement(_reactNative.View, babelHelpers.extends({
              style: styles.pickerTop
            }, this._panResponderCancelPicker.panHandlers)),
            _react2.default.createElement(
              _reactNative.View,
              {
                style: styles.pickerBottom
              },
              _react2.default.createElement(
                _reactNative.View,
                {
                  style: styles.pickerContainer
                },
                _react2.default.createElement(_ui.NumberSpinner, {
                  style: styles.picker,
                  maxValue: 23,
                  minValue: 0,
                  interval: 1,
                  defaultValue: 0,
                  unit: _consts.LocalizedString.shortHour(),
                  onNumberChanged: function onNumberChanged(_ref) {
                    var val = _ref.newValue;

                    _this4.setState({
                      hours: val,
                      rotation: val * 360 + _this4.state.minutes * 6
                    });
                  }
                }),
                _react2.default.createElement(_ui.NumberSpinner, {
                  style: styles.picker,
                  maxValue: 59,
                  minValue: 0,
                  interval: 1,
                  defaultValue: 0,
                  unit: _consts.LocalizedString.shortMinute(),
                  onNumberChanged: function onNumberChanged(_ref2) {
                    var val = _ref2.newValue;

                    _this4.setState({
                      minutes: val,
                      rotation: _this4.state.hours * 360 + val * 6
                    });
                  }
                })
              ),
              _react2.default.createElement(
                _reactNative.TouchableHighlight,
                {
                  underlayColor: "#E4E4E4",
                  style: styles.pickerConfirm,
                  onPress: this._onConfirm
                },
                _react2.default.createElement(
                  _reactNative.Text,
                  {
                    style: styles.confirmText
                  },
                  _consts.LocalizedString.startUp()
                )
              )
            )
          ),
          _react2.default.createElement(_ui.LoadingDialog, {
            visible: showDialog,
            message: dialogTitle,
            timeout: dialogTimeout
          })
        );
      }
    }]);
    return CountDown;
  }(_react2.default.Component);

  exports.default = CountDown;
},10304,[10297,10033,10918,10462,10229,10074,10230,10160,10307,10310],"projects/com.jsc.light.wydfn1/main/countdown.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/main/countdown",
    "width": 36,
    "height": 54,
    "scales": [1],
    "hash": "d39b904abd0e72ca19cd30c6316880db",
    "name": "count_down_timer_thumb_on",
    "type": "png"
  });
},10307,[10420],"projects/com.jsc.light.wydfn1/main/countdown/count_down_timer_thumb_on.png");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.jsc.light.wydfn1/main/countdown",
    "width": 82,
    "height": 82,
    "scales": [1],
    "hash": "edf417c1543c9480071e848e8e163626",
    "name": "count_down_timer_thumb_off",
    "type": "png"
  });
},10310,[10420],"projects/com.jsc.light.wydfn1/main/countdown/count_down_timer_thumb_off.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var _miot = _require(_dependencyMap[2]);

    var _navigator = _require(_dependencyMap[3]);

    var _navigator2 = babelHelpers.interopRequireDefault(_navigator);

    var DEVICE_ADDRESS = _miot.Device.getBluetoothLE().mac;

    var DEVICE_NAME = _miot.Device.name;
    var DEVICE_MODEL = _miot.Device.model;

    var DEV_BLE = _miot.Device.getBluetoothLE();

    var App = function (_Component) {
        babelHelpers.inherits(App, _Component);

        function App(props) {
            babelHelpers.classCallCheck(this, App);

            var _this = babelHelpers.possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

            _this._firmwareDowngrade = function () {
                _this._setSpotaMemDev();
            };

            _this._setSpotaMemDev = function () {
                var _this$state = _this.state,
                    serviceUUID = _this$state.serviceUUID,
                    characteristicUUID = _this$state.characteristicUUID;
                var temp = '00000013';
                DEV_BLE.getService(serviceUUID).getCharacteristic(characteristicUUID).write(temp).then(console.log).catch(console.log);
            };

            _this.state = {
                latestVersion: null,
                currentVersion: null,
                serviceUUID: null,
                characteristicUUID: null
            };
            return _this;
        }

        babelHelpers.createClass(App, [{
            key: "getLatestVersion",
            value: function getLatestVersion() {
                var _this2 = this;

                _miot.Service.smarthome.getLatestVersion(DEVICE_MODEL).then(function (_) {
                    console.log('[TEST >>> CONSOLE.LOG >> latest version]', _);

                    _this2.setState({
                        latestVersion: _.version
                    });

                    _this2.connectDevice();
                }).catch(console.log);
            }
        }, {
            key: "connectDevice",
            value: function connectDevice() {
                var _this3 = this;

                _miot.Device.getBluetoothLE().connect(3).then(function (_) {
                    if (_.code < 0) return;
                    console.log('[TEST >>> CONSOLE.LOG >> connect.success]', _);

                    _this3.getCurrentVersion();
                }).catch(console.log);
            }
        }, {
            key: "getCurrentVersion",
            value: function getCurrentVersion() {
                var _this4 = this;

                _miot.Device.getBluetoothLE().getVersion().then(function (_) {
                    console.log('[TEST >>> CONSOLE.LOG >> getVersion]', _);

                    _this4.setState({
                        currentVersion: _
                    });
                }).catch(console.log);
            }
        }, {
            key: "componentWillMount",
            value: function componentWillMount() {
                var _this5 = this;

                this.subscription = _miot.BluetoothEvent.bluetoothCharacteristicDiscovered.addListener(function (bluetooth, service) {
                    for (var _len = arguments.length, characters = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                        characters[_key - 2] = arguments[_key];
                    }

                    _this5.setState({
                        serviceUUID: service.UUID,
                        characteristicUUID: characters[0][0].UUID
                    });
                });
            }
        }, {
            key: "componentWillUnmount",
            value: function componentWillUnmount() {
                this.subscription.remove();
            }
        }, {
            key: "render",
            value: function render() {
                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: styles.main
                    },
                    _react2.default.createElement(_navigator2.default, {
                        navigation: this.props.navigation
                    }),
                    _react2.default.createElement(
                        _reactNative.ScrollView,
                        null,
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: styles.content
                            },
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: styles.info
                                },
                                _react2.default.createElement(
                                    _reactNative.View,
                                    {
                                        style: styles.row
                                    },
                                    _react2.default.createElement(
                                        _reactNative.Text,
                                        {
                                            style: styles.tit
                                        },
                                        "mac\u5730\u5740:"
                                    ),
                                    _react2.default.createElement(
                                        _reactNative.Text,
                                        {
                                            style: styles.con
                                        },
                                        DEVICE_ADDRESS
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                _reactNative.TouchableOpacity,
                                {
                                    style: styles.button,
                                    onPress: this.getLatestVersion.bind(this)
                                },
                                _react2.default.createElement(
                                    _reactNative.Text,
                                    {
                                        style: styles.btnText
                                    },
                                    "\u94FE\u63A5\u8BBE\u5907"
                                )
                            ),
                            !!this.state.latestVersion ? _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: styles.info
                                },
                                _react2.default.createElement(
                                    _reactNative.View,
                                    {
                                        style: styles.row
                                    },
                                    _react2.default.createElement(
                                        _reactNative.Text,
                                        {
                                            style: styles.tit
                                        },
                                        "\u6700\u65B0\u56FA\u4EF6\u7248\u672C:"
                                    ),
                                    _react2.default.createElement(
                                        _reactNative.Text,
                                        {
                                            style: styles.con
                                        },
                                        this.state.latestVersion
                                    )
                                ),
                                !!this.state.currentVersion ? _react2.default.createElement(
                                    _reactNative.View,
                                    {
                                        style: styles.row
                                    },
                                    _react2.default.createElement(
                                        _reactNative.Text,
                                        {
                                            style: styles.tit
                                        },
                                        "\u5F53\u524D\u56FA\u4EF6\u7248\u672C:"
                                    ),
                                    _react2.default.createElement(
                                        _reactNative.Text,
                                        {
                                            style: styles.con
                                        },
                                        this.state.currentVersion
                                    )
                                ) : null
                            ) : null,
                            _react2.default.createElement(
                                _reactNative.TouchableOpacity,
                                {
                                    style: styles.button,
                                    onPress: this._firmwareDowngrade.bind(this)
                                },
                                _react2.default.createElement(
                                    _reactNative.Text,
                                    {
                                        style: styles.btnText
                                    },
                                    "\u56FA\u4EF6\u964D\u7EA7"
                                )
                            )
                        )
                    )
                );
            }
        }]);
        return App;
    }(_react.Component);

    exports.default = App;

    var _Dimensions$get = _reactNative.Dimensions.get('window'),
        height = _Dimensions$get.height,
        width = _Dimensions$get.width;

    var styles = _reactNative.StyleSheet.create({
        main: {
            width: width,
            height: height,
            backgroundColor: '#fff'
        },
        content: {
            width: width,
            height: height - 100,
            paddingTop: 15,
            alignItems: 'center'
        },
        button: {
            width: width * 0.8,
            height: 50,
            backgroundColor: '#00bc9c',
            borderRadius: 5,
            marginBottom: 15,
            alignItems: 'center',
            justifyContent: 'center'
        },
        btnText: {
            color: '#fff'
        },
        info: {
            width: width * 0.8,
            flexDirection: 'column'
        },
        row: {
            width: width * 0.8,
            marginBottom: 15,
            flexDirection: 'row'
        },
        tit: {
            width: width * 0.8 * 0.25,
            fontSize: 10
        },
        con: {
            width: width * 0.8 * 0.75,
            fontSize: 10
        }
    });
},10313,[10297,10033,10074,10160],"projects/com.jsc.light.wydfn1/main/developer_mode_page.js");
require(10120);
require(10001);