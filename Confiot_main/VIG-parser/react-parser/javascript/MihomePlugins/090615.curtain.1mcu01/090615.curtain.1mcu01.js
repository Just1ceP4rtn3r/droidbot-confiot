
__d(function (global, _require, module, exports, _dependencyMap) {
    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNavigation = _require(_dependencyMap[1]);

    var _miot = _require(_dependencyMap[2]);

    var _app = _require(_dependencyMap[3]);

    var _app2 = babelHelpers.interopRequireDefault(_app);

    var _MoreMenu = _require(_dependencyMap[4]);

    var _MoreMenu2 = babelHelpers.interopRequireDefault(_MoreMenu);

    var _CommonSetting = _require(_dependencyMap[5]);

    var _CommonSetting2 = babelHelpers.interopRequireDefault(_CommonSetting);

    var _MoreMenu3 = _require(_dependencyMap[6]);

    var _MoreMenu4 = babelHelpers.interopRequireDefault(_MoreMenu3);

    var _CommonSetting3 = _require(_dependencyMap[7]);

    _miot.PackageEvent.packageAuthorizationCancel.addListener(function () {
        _miot.Host.storage.set('PROTOCOLCACHE:' + _miot.Device.deviceID, false);

        _miot.Package.exit();
    });

    var RootStack = (0, _reactNavigation.createStackNavigator)({
        App: _app2.default,
        MoreMenu: _MoreMenu2.default,
        CommonSetting: _CommonSetting2.default,
        MoreMenu2: _MoreMenu4.default,
        MoreSetting: _CommonSetting3.MoreSetting
    }, {
        initialRouteName: 'App',
        navigationOptions: function navigationOptions(_ref) {
            var navigation = _ref.navigation;
            return {
                headerMode: 'none',
                header: null
            };
        }
    });

    _miot.Package.entry(RootStack, function () { });
}, 10001, [10297, 10918, 10074, 10004, 10025, 10079, 10082, 10353], "projects/a.curtain2/index.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _propTypes = _require(_dependencyMap[1]);

    var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

    var _reactNative = _require(_dependencyMap[2]);

    var _miot = _require(_dependencyMap[3]);

    var _ui = _require(_dependencyMap[4]);

    var _XMLocalizableString = _require(_dependencyMap[5]);

    var _spec = _require(_dependencyMap[6]);

    var _ControllerView = _require(_dependencyMap[7]);

    var _ControllerView2 = babelHelpers.interopRequireDefault(_ControllerView);

    var _MoreMenu = _require(_dependencyMap[8]);

    var _MoreMenu2 = babelHelpers.interopRequireDefault(_MoreMenu);

    var _Util = _require(_dependencyMap[9]);

    var _Constant = _require(_dependencyMap[10]);

    var _Constant2 = babelHelpers.interopRequireDefault(_Constant);

    var _protocol = _require(_dependencyMap[11]);

    var _protocol2 = babelHelpers.interopRequireDefault(_protocol);

    var _NavigationBar = _require(_dependencyMap[12]);

    var _NavigationBar2 = babelHelpers.interopRequireDefault(_NavigationBar);

    var App = function (_Component) {
        babelHelpers.inherits(App, _Component);

        function App(props) {
            babelHelpers.classCallCheck(this, App);

            var _this = babelHelpers.possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

            _this.state = {
                position: 0,
                showDialog: false,
                selected: 0
            };
            return _this;
        }

        babelHelpers.createClass(App, [{
            key: "componentDidMount",
            value: function componentDidMount() {
                var _this2 = this;

                _miot.Host.storage.get('PROTOCOLCACHE:' + _miot.Device.deviceID).then(function (cache) {
                    if (cache) {
                        return;
                    }

                    _miot.Host.ui.alertLegalInformationAuthorization(_protocol2.default).then(function (agreed) {
                        if (agreed) {
                            _miot.Host.storage.set('PROTOCOLCACHE:' + _miot.Device.deviceID, true);
                        }
                    }).catch(function (_) { });
                }).catch(function (_) { });

                _miot.Device.getDeviceWifi().callMethod('get_prop', [0, 1, 2]).then(function (res) {
                    _this2.setState({
                        selected: res['result'][0]
                    });

                    _Constant2.default.settingMode = res['result'][2];

                    if (res['result'][1] <= 100) {
                        _this2.setState({
                            position: res['result'][1]
                        });
                    }
                }).catch(function (err) { });

                this._deviceStatusListener = _miot.DeviceEvent.deviceReceivedMessages.addListener(function (device, messages) {
                    if (messages.has('prop.2.7')) {
                        var pos = messages.get('prop.2.7')[0];

                        if (pos <= 100) {
                            _this2.setState({
                                position: messages.get('prop.2.7')[0]
                            });
                        }
                    } else if (messages.has('prop.2.8')) {
                        _Constant2.default.settingMode = messages.get('prop.2.8')[0];
                    }
                });

                _miot.Device.getDeviceWifi().subscribeMessages('prop.2.7', 'prop.2.8').then(function (subcription) {
                    _this2._msgSubscription = subcription;
                }).catch(function (err) { });
            }
        }, {
            key: "componentWillUnmount",
            value: function componentWillUnmount() {
                this._msgSubscription && this._msgSubscription.remove();
                this._deviceStatusListener && this._deviceStatusListener.remove();
            }
        }, {
            key: "render",
            value: function render() {
                var _this3 = this;

                return _react2.default.createElement(
                    _reactNative.ImageBackground,
                    {
                        style: styles.curtainContainer
                    },
                    _react2.default.createElement(_NavigationBar2.default, {
                        backgroundColor: "transparent",
                        type: _NavigationBar2.default.TYPE.LIGHT,
                        left: [{
                            key: _NavigationBar2.default.ICON.BACK,
                            onPress: function onPress(_) {
                                return _miot.Package.exit();
                            }
                        }],
                        right: [{
                            key: _NavigationBar2.default.ICON.MORE,
                            onPress: function onPress(_) {
                                return _this3.props.navigation.navigate('MoreMenu2', {});
                            }
                        }],
                        title: _miot.Device.name
                    }),
                    _react2.default.createElement(
                        _reactNative.ImageBackground,
                        {
                            style: [styles.curtainImage],
                            source: _require(_dependencyMap[13]),
                            resizeMode: "stretch"
                        },
                        _react2.default.createElement(
                            _reactNative.Text,
                            {
                                style: styles.text1
                            },
                            (0, _XMLocalizableString.getString)('percent') + this.state.position + '%'
                        )
                    ),
                    _react2.default.createElement(
                        _reactNative.ImageBackground,
                        {
                            style: styles.positionContainer
                        },
                        _react2.default.createElement(_reactNative.Slider, {
                            style: styles.ProgressViewStyle,
                            minimumValue: 0,
                            maximumValue: 100,
                            minimumTrackTintColor: '#68727C',
                            value: this.state.position,
                            step: 1,
                            onSlidingComplete: function onSlidingComplete(value) {
                                _this3.setState({
                                    showDialog: true
                                });

                                _this3.setState({
                                    position: value
                                });

                                _miot.Device.getDeviceWifi().callMethod('setPosition', [value]).then(function (res) {
                                    _this3.setState({
                                        showDialog: false
                                    });
                                }).catch(function (err) {
                                    _this3.setState({
                                        showDialog: false
                                    });
                                });
                            }
                        })
                    ),
                    _react2.default.createElement(_ControllerView2.default, {
                        selected: this.state.selected
                    }),
                    _react2.default.createElement(_ui.LoadingDialog, {
                        visible: this.state.showDialog,
                        message: 'loading...'
                    })
                );
            }
        }]);
        return App;
    }(_react.Component);

    exports.default = App;

    var styles = _reactNative.StyleSheet.create({
        curtainContainer: {
            flex: 1,
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            backgroundColor: '#FEFEFE'
        },
        curtainImage: {
            marginLeft: '2%',
            marginRight: '2%',
            width: '96%',
            height: _reactNative.Dimensions.get('window').width * 96 / 100,
            flexDirection: 'row',
            alignItems: 'flex-end',
            marginBottom: '2%'
        },
        positionContainer: {
            width: '96%',
            margin: '2%',
            height: 50,
            borderRadius: 5,
            backgroundColor: '#F3F3F3',
            flexDirection: 'row',
            alignItems: 'center'
        },
        ProgressViewStyle: {
            width: '100%',
            marginTop: 10
        },
        text1: {
            width: '100%',
            color: '#68727C',
            alignSelf: 'flex-end',
            textAlign: 'center',
            justifyContent: 'center',
            textAlignVertical: 'center',
            fontFamily: 'MI-LANTING--GBK1-Light'
        },
        text2: {
            marginLeft: 30,
            marginTop: 15,
            fontFamily: 'MI-LANTING--GBK1-Light',
            color: '#fff'
        },
        img1: {
            marginRight: 30,
            height: 15,
            width: 15,
            marginTop: 15,
            resizeMode: 'center'
        }
    });
}, 10004, [10297, 10318, 10033, 10074, 10230, 10007, 10287, 10013, 10025, 10058, 10028, 10061, 10719, 10076], "projects/a.curtain2/views/app.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.localStrings = exports.strings = undefined;
    exports.getString = getString;

    var _LocalizedStrings = _require(_dependencyMap[0]);

    var _LocalizedStrings2 = babelHelpers.interopRequireDefault(_LocalizedStrings);

    var _intlMessageformat = _require(_dependencyMap[1]);

    var _intlMessageformat2 = babelHelpers.interopRequireDefault(_intlMessageformat);

    _require(_dependencyMap[2]);

    _require(_dependencyMap[3]);

    _require(_dependencyMap[4]);

    var strings = exports.strings = {
        'en': {
            close: 'Close',
            stop: 'Stop',
            open: 'Open',
            controller: 'CurtainOperation',
            position: 'CurtainPosition',
            more_setting: 'MoreSetting',
            percent: ' Position:',
            setting: 'setting',
            Curtaincalibration: 'Calibration',
            Curtain_reversal: 'CurtainPositive',
            featureSetting: 'Shortcut settings',
            commonSetting: 'Common settings',
            deviceName: 'Device name',
            locationManagement: 'Locations',
            shareDevice: 'Share device',
            ifttt: 'Automation',
            firmwareUpgrate: 'Check for firmware updates',
            moreSetting: 'Additional settings',
            addToDesktop: 'Add to Home screen',
            resetDevice: 'Reset device',
            licenseAndPolicy: 'User Agreement & Privacy Policy',
            device_more_activity_rename: 'Rename',
            device_more_activity_about: 'About',
            device_more_activity_help: 'Tutorial',
            device_more_activity_firmware_update: 'Check for firmware updates',
            device_more_activity_noti_quick_op: 'Notification center shortcuts',
            device_more_activity_unbind: 'Remove device',
            device_more_activity_feedback: 'Feedback',
            device_more_activity_scence: 'Automation',
            device_more_activity_help_feedback: 'Help',
            device_more_activity_reset: 'Reset',
            device_more_activity_setting: 'Settings',
            device_more_activity_common_setting: 'General settings',
            device_more_activity_network_info: 'Network info',
            device_more_activity_license_privacy: 'User Agreement and Privacy Policy',
            device_more_activity_license: 'User Agreement',
            device_more_activity_privacy: ' Privacy Policy ',
            device_more_activity_cancel_license_privacy: 'Withdraw the authorization from User Agreement and Privacy Policy',
            OpenLibList: 'open source library test',
            ViewTest: ' test view',
            cancel: "Cancel",
            ok: "OK",
            save: "Save",
            saved: "Saved successfully",
            voiceBroadcast: 'voice control',
            start_calibration: 'start calibration',
            stop_calibration: 'stop calibration',
            calibrationing: 'calibrationing',
            calibration_failure: 'calibration failure',
            calibration_successful: 'calibration successful',
            device_time_zone: 'device time zone',
            version: 'version'
        },
        'zh': {
            close: '关闭窗帘',
            stop: '暂停窗帘',
            open: '打开窗帘',
            controller: '窗帘控制',
            position: '窗帘位置',
            more_setting: '更多设置',
            percent: '窗帘位置:',
            setting: '设置',
            Curtaincalibration: '窗帘校准',
            Curtain_reversal: '窗帘正反转',
            featureSetting: '功能设置',
            commonSetting: '通用设置',
            deviceName: '设备名称',
            locationManagement: '位置管理',
            shareDevice: '设备共享',
            ifttt: '自动化',
            firmwareUpgrate: '检查固件升级',
            moreSetting: '更多设置',
            addToDesktop: '添加到桌面',
            resetDevice: '重置设备',
            licenseAndPolicy: '使用条款和隐私政策',
            device_more_activity_rename: '重命名',
            device_more_activity_about: '关于',
            device_more_activity_help: '玩法教程',
            device_more_activity_firmware_update: '检查固件更新',
            device_more_activity_noti_quick_op: '通知中心快捷开关',
            device_more_activity_unbind: '删除设备',
            device_more_activity_feedback: '反馈',
            device_more_activity_reset: '重置',
            device_more_activity_setting: '设置',
            device_more_activity_scence: '智能',
            device_more_activity_help_feedback: '使用帮助',
            device_more_activity_common_setting: '通用设置',
            device_more_activity_network_info: '网络信息',
            device_more_activity_license_privacy: '使用条款和隐私政策',
            device_more_activity_license: '使用条款',
            device_more_activity_privacy: '隐私政策',
            device_more_activity_cancel_license_privacy: '撤销“使用条款和隐私政策”授权',
            home_title: '虚拟设备',
            home_subtitle: '子设备',
            control_demo: ' 控制示例',
            cloud_debug: ' 云端调试',
            my_product: ' 创建自己的产品',
            OpenLibList: ' 第三方库测试',
            ViewTest: ' 常用的 view 测试',
            start_calibration: '开始校准',
            stop_calibration: '停止校准',
            calibrationing: '校准中',
            calibration_failure: '校准失败',
            calibration_successful: '校准成功',
            device_time_zone: '设备时区',
            version: '版本'
        }
    };
    var localStrings = exports.localStrings = new _LocalizedStrings2.default(strings);

    function getString(key) {
        var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        if (obj) {
            return new _intlMessageformat2.default(localStrings[key], localStrings.language).format(obj);
        } else {
            return localStrings[key];
        }
    }
}, 10007, [10010, 13591, 13582, 13669, 13672], "projects/a.curtain2/modules/XMLocalizableString.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    var _miot = _require(_dependencyMap[0]);

    var localization = _miot.Host.locale.language;

    if (!localization) {
        console.error("Something went wrong initializing the native ReactLocalization module.\nPlease check your configuration.\nDid you run 'react-native link'?");
    }

    var interfaceLanguage = localization.replace(/_/g, '-');

    var LocalizedStrings = function () {
        babelHelpers.createClass(LocalizedStrings, [{
            key: "_getBestMatchingLanguage",
            value: function _getBestMatchingLanguage(language, props) {
                if (props[language]) return language;
                var idx = language.lastIndexOf("-");

                if (idx >= 0) {
                    language = language.substring(0, idx);
                    return this._getBestMatchingLanguage(language, props);
                }

                return Object.keys(props)[0];
            }
        }]);

        function LocalizedStrings(props) {
            babelHelpers.classCallCheck(this, LocalizedStrings);
            this.props = props;
            this.setLanguage(interfaceLanguage);
        }

        babelHelpers.createClass(LocalizedStrings, [{
            key: "setContent",
            value: function setContent(props) {
                this.props = props;
                this.setLanguage(this.language);
            }
        }, {
            key: "setLanguage",
            value: function setLanguage(language) {
                var bestLanguage = this._getBestMatchingLanguage(language, this.props);

                var defaultLanguage = Object.keys(this.props)[0];
                this.language = bestLanguage;

                if (this.props[bestLanguage]) {
                    var localizedStrings = babelHelpers.extends({}, this.props[defaultLanguage], this.props[this.language]);

                    for (var key in localizedStrings) {
                        if (localizedStrings.hasOwnProperty(key)) {
                            this[key] = localizedStrings[key];
                        }
                    }

                    if (defaultLanguage !== this.language) {
                        localizedStrings = this.props[defaultLanguage];

                        this._fallbackValues(localizedStrings, this);
                    }
                }
            }
        }, {
            key: "_fallbackValues",
            value: function _fallbackValues(defaultStrings, strings) {
                for (var key in defaultStrings) {
                    if (defaultStrings.hasOwnProperty(key) && !strings[key]) {
                        strings[key] = defaultStrings[key];
                        console.log("Missing localization for language '" + this.language + "' and key '" + key + "'.");
                    } else {
                        if (typeof strings[key] != "string") {
                            this._fallbackValues(defaultStrings[key], strings[key]);
                        }
                    }
                }
            }
        }, {
            key: "getLanguage",
            value: function getLanguage() {
                return this.language;
            }
        }, {
            key: "getInterfaceLanguage",
            value: function getInterfaceLanguage() {
                return interfaceLanguage;
            }
        }, {
            key: "getLocaleObject",
            value: function getLocaleObject() {
                return this.props;
            }
        }, {
            key: "getAvailableLanguages",
            value: function getAvailableLanguages() {
                if (!this.availableLanguages) {
                    this.availableLanguages = [];

                    for (var language in this.props) {
                        this.availableLanguages.push(language);
                    }
                }

                return this.availableLanguages;
            }
        }, {
            key: "formatString",
            value: function formatString(str) {
                var res = str;

                for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    values[_key - 1] = arguments[_key];
                }

                for (var i = 0; i < values.length; i++) {
                    res = this._replaceAll("{" + i + "}", values[i], res);
                }

                return res;
            }
        }, {
            key: "getString",
            value: function getString(key, language) {
                try {
                    return this.props[language][key];
                } catch (ex) {
                    console.log("No localization found for key " + key + " and language " + language);
                }

                return null;
            }
        }, {
            key: "_replaceAll",
            value: function _replaceAll(original, replacement, str) {
                original = original.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
                replacement = ("" + replacement).replace(/([$])/g, '$$$$');
                return str.replace(new RegExp(original, 'g'), replacement);
            }
        }]);
        return LocalizedStrings;
    }();

    module.exports = LocalizedStrings;
}, 10010, [10074], "projects/a.curtain2/modules/LocalizedStrings.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _propTypes = _require(_dependencyMap[0]);

    var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

    var _react = _require(_dependencyMap[1]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[2]);

    var _reactNavigation = _require(_dependencyMap[3]);

    var _miot = _require(_dependencyMap[4]);

    var _ui = _require(_dependencyMap[5]);

    var _XMLocalizableString = _require(_dependencyMap[6]);

    var ControllerView = function (_Component) {
        babelHelpers.inherits(ControllerView, _Component);

        function ControllerView(props) {
            babelHelpers.classCallCheck(this, ControllerView);

            var _this = babelHelpers.possibleConstructorReturn(this, (ControllerView.__proto__ || Object.getPrototypeOf(ControllerView)).call(this, props));

            _this.state = {
                selected: 3,
                disabled: false
            };
            return _this;
        }

        babelHelpers.createClass(ControllerView, [{
            key: "render",
            value: function render() {
                var _this2 = this;

                return _react2.default.createElement(
                    _reactNative.ImageBackground,
                    {
                        style: styles.controllerContainer
                    },
                    _react2.default.createElement(
                        _reactNative.TouchableOpacity,
                        {
                            disabled: this.state.disabled,
                            onPress: function onPress() {
                                _this2._changeSwitchState(2);
                            }
                        },
                        _react2.default.createElement(
                            _reactNative.ImageBackground,
                            {
                                style: styles.controllerImg,
                                source: _require(_dependencyMap[7])
                            },
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: styles.text6
                                },
                                (0, _XMLocalizableString.getString)('close')
                            )
                        )
                    ),
                    _react2.default.createElement(
                        _reactNative.TouchableOpacity,
                        {
                            disabled: this.state.disabled,
                            onPress: function onPress() {
                                _this2._changeSwitchState(0);
                            }
                        },
                        _react2.default.createElement(
                            _reactNative.ImageBackground,
                            {
                                style: styles.controllerImg,
                                source: _require(_dependencyMap[8])
                            },
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: styles.text6
                                },
                                (0, _XMLocalizableString.getString)('stop')
                            )
                        )
                    ),
                    _react2.default.createElement(
                        _reactNative.TouchableOpacity,
                        {
                            disabled: this.state.disabled,
                            onPress: function onPress() {
                                _this2._changeSwitchState(1);
                            }
                        },
                        _react2.default.createElement(
                            _reactNative.ImageBackground,
                            {
                                style: styles.controllerImg,
                                source: _require(_dependencyMap[9])
                            },
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: styles.text6
                                },
                                (0, _XMLocalizableString.getString)('open')
                            )
                        )
                    )
                );
            }
        }, {
            key: "_changeSwitchState",
            value: function _changeSwitchState(state) {
                var _this3 = this;

                var did = _miot.Device.deviceID;
                this.setState({
                    disabled: true
                });

                _miot.Service.spec.setPropertiesValue([{
                    did: did,
                    siid: 2,
                    piid: 2,
                    value: state
                }]).then(function (res) {
                    console.log("a", res);

                    _this3.setState({
                        disabled: false
                    });
                }).catch(function (err) {
                    console.log("a", err);

                    _this3.setState({
                        disabled: false
                    });
                });
            }
        }]);
        return ControllerView;
    }(_react.Component);

    exports.default = ControllerView;

    var styles = _reactNative.StyleSheet.create({
        text: {
            paddingTop: 10,
            paddingLeft: 10,
            fontFamily: 'MI-LANTING--GBK1-Light',
            fontWeight: 'bold'
        },
        text2: {
            fontFamily: 'MI-LANTING--GBK1-Light'
        },
        controllerContainer: {
            paddingLeft: 20,
            paddingRight: 20,
            flexDirection: 'row',
            width: '96%',
            marginLeft: '2%',
            marginRight: '2%',
            marginTop: '2%',
            height: 70,
            borderRadius: 5,
            backgroundColor: '#F3F3F3',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        controllerImg: {
            height: 65,
            width: 65,
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginTop: 6
        },
        Touchablestyle: {
            alignSelf: 'center'
        },
        text5: {
            fontFamily: 'MI-LANTING--GBK1-Light',
            fontSize: 10,
            marginBottom: 12,
            color: '#F3F4F4'
        },
        text6: {
            fontFamily: 'MI-LANTING--GBK1-Light',
            fontSize: 10,
            marginBottom: 12,
            color: '#68727C'
        }
    });
}, 10013, [10318, 10297, 10033, 10918, 10074, 10230, 10007, 10016, 10019, 10022], "projects/a.curtain2/views/ControllerView.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/a.curtain2/resources",
        "width": 150,
        "height": 150,
        "scales": [1],
        "hash": "198869354f33c7c6a18a61b9646bb47a",
        "name": "close_normal",
        "type": "png"
    });
}, 10016, [10420], "projects/a.curtain2/resources/close_normal.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/a.curtain2/resources",
        "width": 150,
        "height": 150,
        "scales": [1],
        "hash": "3fbfc1a4149fbbd536b5aeafb7d385f9",
        "name": "stop_normal",
        "type": "png"
    });
}, 10019, [10420], "projects/a.curtain2/resources/stop_normal.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/a.curtain2/resources",
        "width": 150,
        "height": 150,
        "scales": [1],
        "hash": "4c04d165afc0022357c895d7cf6c50db",
        "name": "open_normal",
        "type": "png"
    });
}, 10022, [10420], "projects/a.curtain2/resources/open_normal.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var _propTypes = _require(_dependencyMap[2]);

    var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

    var _ui = _require(_dependencyMap[3]);

    var _miot = _require(_dependencyMap[4]);

    var _XMLocalizableString = _require(_dependencyMap[5]);

    var _Constant = _require(_dependencyMap[6]);

    var _Constant2 = babelHelpers.interopRequireDefault(_Constant);

    var _SettingItem = _require(_dependencyMap[7]);

    var _SettingItem2 = babelHelpers.interopRequireDefault(_SettingItem);

    var MoreMenu = function (_Component) {
        babelHelpers.inherits(MoreMenu, _Component);

        function MoreMenu(props) {
            babelHelpers.classCallCheck(this, MoreMenu);

            var _this = babelHelpers.possibleConstructorReturn(this, (MoreMenu.__proto__ || Object.getPrototypeOf(MoreMenu)).call(this, props));

            _this.state = {
                showDialog: false,
                dialogMessage: 'loading...',
                settingMode: _Constant2.default.settingMode
            };
            calibration = true;
            return _this;
        }

        babelHelpers.createClass(MoreMenu, [{
            key: "render",
            value: function render() {
                var _this2 = this;

                var isShared = !_miot.Device.isOwner;
                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: styles.container
                    },
                    _react2.default.createElement(_ui.TitleBarBlack, {
                        style: {
                            zIndex: 99999
                        },
                        title: (0, _XMLocalizableString.getString)('setting'),
                        onPressLeft: function onPressLeft() {
                            _this2.props.navigation.goBack();
                        }
                    }),
                    _react2.default.createElement(_reactNative.View, {
                        style: styles.separator2
                    }),
                    isShared ? null : _react2.default.createElement(_SettingItem2.default, {
                        title: (0, _XMLocalizableString.getString)('device_more_activity_scence'),
                        onPress: function onPress() {
                            _miot.Host.ui.openIftttAutoPage();
                        }
                    }),
                    _react2.default.createElement(_SettingItem2.default, {
                        title: (0, _XMLocalizableString.getString)('Curtain_reversal'),
                        onPress: function onPress() {
                            _this2.setState({
                                showDialog: true,
                                dialogMessage: 'loading...'
                            });

                            var a = void 0;

                            if (_Constant2.default.settingMode === 1 || _Constant2.default.settingMode === 11) {
                                a = 0;
                            } else {
                                a = 1;
                            }

                            _miot.Device.getDeviceWifi().callMethod('setMode', [a]).then(function (res) {
                                _Constant2.default.settingMode = a;

                                _this2.setState({
                                    showDialog: false,
                                    settingMode: a
                                });
                            }).catch(function (err) {
                                _this2.setState({
                                    showDialog: false
                                });
                            });
                        },
                        rightView: _react2.default.createElement(_reactNative.Image, {
                            style: styles.switch,
                            source: this.state.settingMode === 1 ? _require(_dependencyMap[8]) : _require(_dependencyMap[9])
                        })
                    }),
                    _react2.default.createElement(_SettingItem2.default, {
                        title: (0, _XMLocalizableString.getString)('Curtaincalibration'),
                        onPress: function onPress() {
                            var a = void 0;

                            if (calibration) {
                                a = 11;

                                _this2.setState({
                                    dialogMessage: (0, _XMLocalizableString.getString)('start_calibration'),
                                    showDialog: true
                                });
                            } else {
                                a = 10;

                                _this2.setState({
                                    dialogMessage: (0, _XMLocalizableString.getString)('stop_calibration'),
                                    showDialog: true
                                });
                            }

                            _miot.Device.getDeviceWifi().callMethod('setMode', [a]).then(function (res) {
                                if (calibration) {
                                    calibration = false;
                                    _this2.timer = setTimeout(function () {
                                        _this2.setState({
                                            showDialog: false
                                        });
                                    }, 2000);
                                } else {
                                    calibration = true;

                                    _this2.setState({
                                        showDialog: false
                                    });
                                }

                                switch (a) {
                                    case 10:
                                    case 11:
                                        break;

                                    case 50:
                                        break;

                                    case 51:
                                        break;
                                }
                            }).catch(function (err) {
                                _this2.setState({
                                    showDialog: false
                                });
                            });
                        },
                        rightView: _react2.default.createElement(_reactNative.Image, {
                            style: styles.update_style,
                            source: _require(_dependencyMap[10])
                        })
                    }),
                    isShared ? null : _react2.default.createElement(_SettingItem2.default, {
                        title: (0, _XMLocalizableString.getString)('shareDevice'),
                        onPress: function onPress() {
                            _miot.Host.ui.openShareDevicePage();
                        }
                    }),
                    _react2.default.createElement(_SettingItem2.default, {
                        title: (0, _XMLocalizableString.getString)('commonSetting'),
                        onPress: function onPress() {
                            _this2.props.navigation.navigate('CommonSetting', {
                                title: (0, _XMLocalizableString.getString)('commonSetting')
                            });
                        }
                    }),
                    _react2.default.createElement(_SettingItem2.default, {
                        title: (0, _XMLocalizableString.getString)('device_more_activity_help_feedback'),
                        onPress: function onPress() {
                            _miot.Host.ui.openHelpPage();
                        }
                    }),
                    _react2.default.createElement(_SettingItem2.default, {
                        title: (0, _XMLocalizableString.getString)('licenseAndPolicy'),
                        onPress: function onPress() {
                            if (_miot.Host.locale.language === 'zh') {
                                _miot.Host.ui.privacyAndProtocolReview((0, _XMLocalizableString.getString)('device_more_activity_license'), _require(_dependencyMap[11]), (0, _XMLocalizableString.getString)('device_more_activity_privacy'), _require(_dependencyMap[12]));
                            } else {
                                _miot.Host.ui.privacyAndProtocolReview((0, _XMLocalizableString.getString)('device_more_activity_license'), _require(_dependencyMap[13]), (0, _XMLocalizableString.getString)('device_more_activity_privacy'), _require(_dependencyMap[14]));
                            }
                        }
                    }),
                    _react2.default.createElement(_ui.LoadingDialog, {
                        visible: this.state.showDialog,
                        message: this.state.dialogMessage
                    })
                );
            }
        }]);
        return MoreMenu;
    }(_react.Component);

    exports.default = MoreMenu;

    var styles = _reactNative.StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#ffffff',
            flexDirection: 'column',
            width: '100%',
            height: '100%'
        },
        touchablestyle: {
            width: '100%',
            height: 52
        },
        rowContainer: {
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            paddingLeft: 23,
            paddingRight: 23,
            alignItems: 'center',
            flex: 1
        },
        update_style: {
            width: 35,
            height: 35,
            resizeMode: 'contain'
        },
        title: {
            fontSize: 15,
            color: '#333333',
            flex: 1,
            fontFamily: 'MI-LANTING--GBK1-Light'
        },
        subArrow: {
            width: 7,
            height: 14
        },
        switch: {
            width: 45,
            height: 45,
            resizeMode: 'contain'
        },
        separator: {
            height: 1,
            width: '100%',
            backgroundColor: '#e5e5e5',
            marginLeft: 20
        },
        separator2: {
            height: 1,
            width: '100%',
            backgroundColor: '#e5e5e5'
        }
    });
}, 10025, [10297, 10033, 10318, 10230, 10074, 10007, 10028, 10031, 10037, 10040, 10043, 10046, 10049, 10052, 10055], "projects/a.curtain2/views/MoreMenu.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    var Cons = {};
    Cons.settingMode = 0;
    module.exports = Cons;
}, 10028, [], "projects/a.curtain2/views/Constant.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var _propTypes = _require(_dependencyMap[2]);

    var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

    var _miot = _require(_dependencyMap[3]);

    var SettingItem = function (_Component) {
        babelHelpers.inherits(SettingItem, _Component);

        function SettingItem(props) {
            babelHelpers.classCallCheck(this, SettingItem);

            var _this = babelHelpers.possibleConstructorReturn(this, (SettingItem.__proto__ || Object.getPrototypeOf(SettingItem)).call(this, props));

            _this.state = {
                selected: _this.props.selected,
                disabled: false
            };
            return _this;
        }

        babelHelpers.createClass(SettingItem, [{
            key: "componentWillReceiveProps",
            value: function componentWillReceiveProps(nextProps) {
                if (nextProps) {
                    var selected = nextProps.selected;
                    this.setState({
                        selected: selected
                    });
                }
            }
        }, {
            key: "render",
            value: function render() {
                var _this2 = this;

                return _react2.default.createElement(
                    _reactNative.TouchableHighlight,
                    {
                        style: styles.touchablestyle,
                        underlayColor: "#838383",
                        onPress: function onPress() {
                            if (_this2.props.onPress) {
                                _this2.props.onPress(_this2);
                            }
                        }
                    },
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: styles.view1
                        },
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: styles.rowContainer
                            },
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: styles.title
                                },
                                this.props.title
                            ),
                            this.props.rightView == null ? _react2.default.createElement(_reactNative.Image, {
                                style: styles.subArrow,
                                source: _require(_dependencyMap[4])
                            }) : this.props.rightView
                        )
                    )
                );
            }
        }, {
            key: "_changeSwitchState",
            value: function _changeSwitchState(state) {
                var _this3 = this;

                this.setState({
                    disabled: true
                });

                _miot.Device.getDeviceWifi().callMethod('setOperation', state).then(function (res) {
                    console.log(res);

                    _this3.setState({
                        disabled: false
                    });
                }).catch(function (err) {
                    console.log(err);

                    _this3.setState({
                        disabled: false
                    });
                });
            }
        }]);
        return SettingItem;
    }(_react.Component);

    SettingItem.propTypes = {
        rightView: _propTypes2.default.object,
        onPress: _propTypes2.default.func,
        title: _propTypes2.default.string
    };
    exports.default = SettingItem;

    var styles = _reactNative.StyleSheet.create({
        touchablestyle: {
            width: '100%',
            height: 52,
            backgroundColor: '#ffffff'
        },
        rowContainer: {
            width: '100%',
            height: 51,
            flexDirection: 'row',
            paddingLeft: 23,
            paddingRight: 23,
            alignItems: 'center',
            flex: 1
        },
        update_style: {
            width: 35,
            height: 35,
            resizeMode: 'contain'
        },
        title: {
            fontSize: 15,
            lineHeight: 20,
            color: '#000',
            flex: 1
        },
        view1: {
            width: '100%',
            height: 52,
            flexDirection: 'column'
        },
        subArrow: {
            width: 7,
            height: 14
        },
        separator: {
            height: 1,
            width: '100%',
            backgroundColor: '#e5e5e5',
            marginLeft: 20
        }
    });
}, 10031, [10297, 10033, 10318, 10074, 10034], "projects/a.curtain2/views/SettingItem.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/a.curtain2/resources",
        "width": 22,
        "height": 41,
        "scales": [1],
        "hash": "2a12f112e01f0379378b28ee14a04959",
        "name": "sub_arrow",
        "type": "png"
    });
}, 10034, [10420], "projects/a.curtain2/resources/sub_arrow.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/a.curtain2/resources",
        "width": 105,
        "height": 70,
        "scales": [1],
        "hash": "d0aa888cdd752afd179483ad3904b2e6",
        "name": "switch_on",
        "type": "png"
    });
}, 10037, [10420], "projects/a.curtain2/resources/switch_on.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/a.curtain2/resources",
        "width": 106,
        "height": 70,
        "scales": [1],
        "hash": "8a619744d205393e1f54f3797f203f18",
        "name": "switch_off",
        "type": "png"
    });
}, 10040, [10420], "projects/a.curtain2/resources/switch_off.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/a.curtain2/resources",
        "width": 200,
        "height": 200,
        "scales": [1],
        "hash": "d7bc142f9da8ee175d7e0c129495e396",
        "name": "update",
        "type": "png"
    });
}, 10043, [10420], "projects/a.curtain2/resources/update.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/a.curtain2",
        "scales": [1],
        "hash": "12b67f88b35670229daf3e0e780dc07f",
        "name": "license",
        "type": "html"
    });
}, 10046, [10420], "projects/a.curtain2/license.html");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/a.curtain2",
        "scales": [1],
        "hash": "8e64073fc72e21fe0dd3861eb0d3c5b7",
        "name": "policy",
        "type": "html"
    });
}, 10049, [10420], "projects/a.curtain2/policy.html");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/a.curtain2",
        "scales": [1],
        "hash": "12b67f88b35670229daf3e0e780dc07f",
        "name": "license_english",
        "type": "html"
    });
}, 10052, [10420], "projects/a.curtain2/license_english.html");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/a.curtain2",
        "scales": [1],
        "hash": "61e9b2518a3dbdf78148d16c92473e13",
        "name": "policy_english",
        "type": "html"
    });
}, 10055, [10420], "projects/a.curtain2/policy_english.html");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Util = undefined;

    var _reactNative = _require(_dependencyMap[0]);

    var _miot = _require(_dependencyMap[1]);

    var _XMLocalizableString = _require(_dependencyMap[2]);

    var _LocalizedStrings = _require(_dependencyMap[3]);

    var Util = exports.Util = function () {
        function Util() {
            babelHelpers.classCallCheck(this, Util);
        }

        babelHelpers.createClass(Util, null, [{
            key: "showAgreement",
            value: function showAgreement() {
                var licenseKey = "license-" + _miot.Device.deviceID;

                _miot.Host.storage.get(licenseKey).then(function (res) {
                    if (res === true) { } else {
                        if (_miot.Host.locale.language === 'zh') {
                            _miot.Host.ui.openPrivacyLicense(_LocalizedStrings.LocalizedString.device_more_activity_license(), _require(_dependencyMap[4]), _LocalizedStrings.LocalizedString.device_more_activity_privacy(), _require(_dependencyMap[5])).then(function (res) {
                                if (res) {
                                    _miot.Host.storage.set(licenseKey, true);
                                }
                            }).catch(function (error) {
                                console.log(error);
                            });
                        } else {
                            _miot.Host.ui.openPrivacyLicense(_LocalizedStrings.LocalizedString.device_more_activity_license(), _require(_dependencyMap[6]), _LocalizedStrings.LocalizedString.device_more_activity_privacy(), _require(_dependencyMap[7])).then(function (res) {
                                if (res) {
                                    _miot.Host.storage.set(licenseKey, true);
                                }
                            }).catch(function (error) {
                                console.log(error);
                            });
                        }
                    }
                }).catch(function (error) { });
            }
        }]);
        return Util;
    }();
}, 10058, [10033, 10074, 10007, 10010, 10046, 10049, 10052, 10055], "projects/a.curtain2/util/Util.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _miot = _require(_dependencyMap[0]);

    function localized() {
        var lang = _miot.Host.locale.language;
        console.warn(lang);

        switch (lang) {
            case 'zh':
                return {
                    privacyURL: _require(_dependencyMap[1]),
                    agreementURL: _require(_dependencyMap[2]),
                    hideAgreement: true,
                    experiencePlanURL: '',
                    hideUserExperiencePlan: true
                };

            default:
                return {
                    privacyURL: _require(_dependencyMap[3]),
                    agreementURL: _require(_dependencyMap[4]),
                    hideAgreement: true,
                    experiencePlanURL: '',
                    hideUserExperiencePlan: true
                };
        }
    }

    exports.default = localized();
}, 10061, [10074, 10064, 10067, 10070, 10073], "projects/a.curtain2/protocol/index.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/a.curtain2/protocol",
        "scales": [1],
        "hash": "c4c812c1b9762d04c36354317d2eec2f",
        "name": "policy",
        "type": "html"
    });
}, 10064, [10420], "projects/a.curtain2/protocol/policy.html");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/a.curtain2/protocol",
        "scales": [1],
        "hash": "12b67f88b35670229daf3e0e780dc07f",
        "name": "license",
        "type": "html"
    });
}, 10067, [10420], "projects/a.curtain2/protocol/license.html");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/a.curtain2/protocol",
        "scales": [1],
        "hash": "1e79ba22d7f16f5d968ae59faf51dc7a",
        "name": "policy_english",
        "type": "html"
    });
}, 10070, [10420], "projects/a.curtain2/protocol/policy_english.html");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/a.curtain2/protocol",
        "scales": [1],
        "hash": "12b67f88b35670229daf3e0e780dc07f",
        "name": "license_english",
        "type": "html"
    });
}, 10073, [10420], "projects/a.curtain2/protocol/license_english.html");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/a.curtain2/resources",
        "width": 993,
        "height": 1029,
        "scales": [1],
        "hash": "71711fac5e197b097a94a7d6c64a6157",
        "name": "bg1",
        "type": "png"
    });
}, 10076, [10420], "projects/a.curtain2/resources/bg1.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var _ui = _require(_dependencyMap[2]);

    var _miot = _require(_dependencyMap[3]);

    var _XMLocalizableString = _require(_dependencyMap[4]);

    var _SettingItem = _require(_dependencyMap[5]);

    var _SettingItem2 = babelHelpers.interopRequireDefault(_SettingItem);

    var CommonSetting = function (_Component) {
        babelHelpers.inherits(CommonSetting, _Component);

        function CommonSetting() {
            babelHelpers.classCallCheck(this, CommonSetting);
            return babelHelpers.possibleConstructorReturn(this, (CommonSetting.__proto__ || Object.getPrototypeOf(CommonSetting)).apply(this, arguments));
        }

        babelHelpers.createClass(CommonSetting, [{
            key: "render",
            value: function render() {
                var _this2 = this;

                var isShared = _miot.Device.isShared;
                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: styles.container
                    },
                    _react2.default.createElement(_ui.TitleBarBlack, {
                        style: {
                            zIndex: 99999
                        },
                        title: (0, _XMLocalizableString.getString)('device_more_activity_common_setting'),
                        onPressLeft: function onPressLeft() {
                            _this2.props.navigation.goBack();
                        }
                    }),
                    _react2.default.createElement(_reactNative.View, {
                        style: styles.separator2
                    }),
                    isShared ? null : _react2.default.createElement(_SettingItem2.default, {
                        title: (0, _XMLocalizableString.getString)('device_more_activity_rename'),
                        onPress: function onPress() {
                            _miot.Host.ui.openChangeDeviceName();
                        }
                    }),
                    _react2.default.createElement(_SettingItem2.default, {
                        title: (0, _XMLocalizableString.getString)('device_more_activity_firmware_update'),
                        onPress: function onPress() {
                            _miot.Host.ui.openDeviceUpgradePage();
                        }
                    }),
                    _react2.default.createElement(_SettingItem2.default, {
                        title: (0, _XMLocalizableString.getString)('device_more_activity_unbind'),
                        onPress: function onPress() {
                            _miot.Host.ui.openDeleteDevice();
                        }
                    }),
                    _react2.default.createElement(_SettingItem2.default, {
                        title: (0, _XMLocalizableString.getString)('addToDesktop'),
                        onPress: function onPress() {
                            _miot.Host.ui.openAddToDesktopPage();
                        }
                    }),
                    _react2.default.createElement(_SettingItem2.default, {
                        title: (0, _XMLocalizableString.getString)('device_time_zone'),
                        onPress: function onPress() {
                            _miot.Host.ui.openDeviceTimeZoneSettingPage();
                        }
                    }),
                    _react2.default.createElement(_SettingItem2.default, {
                        title: (0, _XMLocalizableString.getString)('device_more_activity_feedback'),
                        onPress: function onPress() {
                            _miot.Host.ui.openFeedbackInput();
                        }
                    }),
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: styles.view1
                        },
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: styles.rowContainer
                            },
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: styles.title
                                },
                                (0, _XMLocalizableString.getString)('version') + '-' + 34
                            )
                        ),
                        _react2.default.createElement(_reactNative.View, {
                            style: styles.separator
                        })
                    )
                );
            }
        }]);
        return CommonSetting;
    }(_react.Component);

    exports.default = CommonSetting;

    var styles = _reactNative.StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#ffffff',
            flexDirection: 'column',
            width: '100%',
            height: '100%'
        },
        rowContainer: {
            width: '100%',
            height: 52,
            alignSelf: 'stretch',
            flexDirection: 'row',
            paddingLeft: 23,
            paddingRight: 23,
            alignItems: 'center',
            flex: 1
        },
        list: {
            alignSelf: 'stretch'
        },
        title: {
            fontSize: 15,
            color: '#333333',
            alignItems: 'center',
            flex: 1,
            fontFamily: 'MI-LANTING--GBK1-Light'
        },
        subArrow: {
            width: 7,
            height: 14
        },
        separator: {
            height: 1,
            backgroundColor: '#e5e5e5',
            marginLeft: 20
        },
        separator2: {
            height: 1,
            backgroundColor: '#e5e5e5'
        },
        view1: {
            width: '100%',
            height: 52,
            flexDirection: 'column'
        }
    });
}, 10079, [10297, 10033, 10230, 10074, 10007, 10031], "projects/a.curtain2/views/CommonSetting.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var _propTypes = _require(_dependencyMap[2]);

    var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

    var _ui = _require(_dependencyMap[3]);

    var _NavigationBar = _require(_dependencyMap[4]);

    var _NavigationBar2 = babelHelpers.interopRequireDefault(_NavigationBar);

    var _miot = _require(_dependencyMap[5]);

    var _XMLocalizableString = _require(_dependencyMap[6]);

    var _Constant = _require(_dependencyMap[7]);

    var _Constant2 = babelHelpers.interopRequireDefault(_Constant);

    var _SettingItem = _require(_dependencyMap[8]);

    var _SettingItem2 = babelHelpers.interopRequireDefault(_SettingItem);

    var _Separator = _require(_dependencyMap[9]);

    var _Separator2 = babelHelpers.interopRequireDefault(_Separator);

    var _resources = _require(_dependencyMap[10]);

    var _ListItem = _require(_dependencyMap[11]);

    var _CommonSetting = _require(_dependencyMap[12]);

    var _MoreSetting = _require(_dependencyMap[13]);

    var _MoreSetting2 = babelHelpers.interopRequireDefault(_MoreSetting);

    var _protocol = _require(_dependencyMap[14]);

    var _protocol2 = babelHelpers.interopRequireDefault(_protocol);

    var first_options = _CommonSetting.SETTING_KEYS.first_options,
        second_options = _CommonSetting.SETTING_KEYS.second_options,
        secondAllOptions = _CommonSetting.SETTING_KEYS.secondAllOptions;
    var did = _miot.Device.deviceID;
    var isShared = !_miot.Device.isOwner;

    var MoreMenu2 = function (_Component) {
        babelHelpers.inherits(MoreMenu2, _Component);

        function MoreMenu2(props) {
            babelHelpers.classCallCheck(this, MoreMenu2);

            var _this = babelHelpers.possibleConstructorReturn(this, (MoreMenu2.__proto__ || Object.getPrototypeOf(MoreMenu2)).call(this, props));

            _this.setMotorReverse = function (value) {
                _this.setState({
                    showDialog: true,
                    dialogMessage: 'loading...'
                });

                var a = void 0;

                if (_Constant2.default.settingMode === 1 || _Constant2.default.settingMode === 11) {
                    a = 0;
                } else {
                    a = 1;
                }

                _miot.Service.spec.setPropertiesValue([{
                    did: did,
                    siid: 2,
                    piid: 8,
                    value: a
                }]).then(function (res) {
                    _Constant2.default.settingMode = a;

                    _this.setState({
                        showDialog: false,
                        motorReverse: a === 1
                    });
                }).catch(function (err) {
                    _this.setState({
                        showDialog: false
                    });
                });
            };

            _this.calibration = function () {
                var a = void 0;

                if (calibration) {
                    a = 1;

                    _this.setState({
                        dialogMessage: (0, _XMLocalizableString.getString)('start_calibration'),
                        showDialog: true
                    });
                } else {
                    a = 0;

                    _this.setState({
                        dialogMessage: (0, _XMLocalizableString.getString)('stop_calibration'),
                        showDialog: true
                    });
                }

                _miot.Service.spec.setPropertiesValue([{
                    did: did,
                    siid: 2,
                    piid: 5,
                    value: a
                }]).then(function (res) {
                    if (calibration) {
                        calibration = false;
                        _this.timer = setTimeout(function () {
                            _this.setState({
                                showDialog: false
                            });
                        }, 2000);
                    } else {
                        calibration = true;

                        _this.setState({
                            showDialog: false
                        });
                    }

                    switch (a) {
                        case 10:
                        case 11:
                            break;

                        case 50:
                            break;

                        case 51:
                            break;
                    }
                }).catch(function (err) {
                    _this.setState({
                        showDialog: false
                    });
                });
            };

            _this.state = {
                showDialog: false,
                dialogMessage: 'loading...',
                supportReverse: false,
                motorReverse: _Constant2.default.settingMode === 1
            };
            calibration = true;
            return _this;
        }

        babelHelpers.createClass(MoreMenu2, [{
            key: "omponentDidMount",
            value: function omponentDidMount() {
                this.props.navigation.setParams({
                    hideRightButton: true
                });
            }
        }, {
            key: "render",
            value: function render() {
                var _this2 = this;

                var _state = this.state,
                    motorReverse = _state.motorReverse,
                    supportReverse = _state.supportReverse,
                    showDialog = _state.showDialog,
                    dialogTimeout = _state.dialogTimeout,
                    dialogTitle = _state.dialogTitle;
                var firstOptions = [first_options.MORE, first_options.HELP, first_options.SHARE, first_options.LEGAL_INFO, first_options.IFTTT, first_options.FIRMWARE_UPGRADE];
                var secondOptions = [second_options.NAME, second_options.TIMEZONE];
                var extraOptions = {
                    option: _protocol2.default,
                    showUpgrade: true
                };
                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: styles.container
                    },
                    _react2.default.createElement(_NavigationBar2.default, {
                        backgroundColor: "#ffffff",
                        type: _NavigationBar2.default.TYPE.LIGHT,
                        left: [{
                            key: _NavigationBar2.default.ICON.BACK,
                            onPress: function onPress(_) {
                                return _this2.props.navigation.goBack();
                            }
                        }],
                        title: (0, _XMLocalizableString.getString)('setting')
                    }),
                    _react2.default.createElement(
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
                            _react2.default.createElement(
                                _react.Fragment,
                                null,
                                _react2.default.createElement(_reactNative.View, {
                                    style: [styles.blank, {
                                        borderTopWidth: 0
                                    }]
                                }),
                                _react2.default.createElement(
                                    _reactNative.View,
                                    {
                                        style: styles.featureSetting
                                    },
                                    _react2.default.createElement(
                                        _reactNative.View,
                                        {
                                            style: styles.titleContainer
                                        },
                                        _react2.default.createElement(
                                            _reactNative.Text,
                                            {
                                                style: styles.featureSettingText
                                            },
                                            _resources.strings.featureSetting
                                        )
                                    ),
                                    _react2.default.createElement(_Separator2.default, {
                                        style: {
                                            marginLeft: _resources.Styles.common.padding
                                        }
                                    }),
                                    _react2.default.createElement(_ListItem.ListItemWithSwitch, {
                                        title: (0, _XMLocalizableString.getString)("Curtain_reversal"),
                                        value: motorReverse,
                                        onValueChange: this.setMotorReverse
                                    })
                                ),
                                _react2.default.createElement(_SettingItem2.default, {
                                    title: (0, _XMLocalizableString.getString)('Curtaincalibration'),
                                    onPress: this.calibration,
                                    rightView: _react2.default.createElement(_reactNative.Image, {
                                        style: styles.update_style,
                                        source: _require(_dependencyMap[15])
                                    })
                                })
                            ),
                            _react2.default.createElement(_reactNative.View, {
                                style: styles.blank
                            }),
                            _react2.default.createElement(_CommonSetting.CommonSetting, {
                                navigation: this.props.navigation,
                                firstOptions: firstOptions,
                                showDot: this.state.showDot,
                                secondOptions: secondOptions,
                                extraOptions: extraOptions
                            }),
                            _react2.default.createElement(_reactNative.View, {
                                style: {
                                    height: 20
                                }
                            })
                        )
                    ),
                    _react2.default.createElement(_ui.LoadingDialog, {
                        visible: this.state.showDialog,
                        message: this.state.dialogMessage
                    })
                );
            }
        }]);
        return MoreMenu2;
    }(_react.Component);

    exports.default = MoreMenu2;

    var styles = _reactNative.StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#f7f7f7',
            flexDirection: 'column',
            width: '100%',
            height: '100%'
        },
        touchablestyle: {
            width: '100%',
            height: 52,
            backgroundColor: '#ffffff'
        },
        rowContainer: {
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            paddingLeft: 23,
            paddingRight: 23,
            alignItems: 'center',
            flex: 1
        },
        update_style: {
            width: 35,
            height: 35,
            resizeMode: 'contain'
        },
        title: {
            fontSize: 15,
            color: '#333333',
            flex: 1,
            fontFamily: 'MI-LANTING--GBK1-Light'
        },
        subArrow: {
            width: 7,
            height: 14
        },
        switch: {
            width: 45,
            height: 45,
            resizeMode: 'contain'
        },
        separator: {
            height: 1,
            width: '100%',
            backgroundColor: '#e5e5e5',
            marginLeft: 20
        },
        separator2: {
            height: 1,
            width: '100%',
            backgroundColor: '#e5e5e5'
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
        featureSettingText: {
            fontSize: 11,
            color: 'rgba(0,0,0,0.5)',
            lineHeight: 14
        }
    });
}, 10082, [10297, 10033, 10318, 10230, 10719, 10074, 10007, 10028, 10031, 10332, 10077, 10338, 10353, 10350, 10061, 10043], "projects/a.curtain2/views/MoreMenu2.js");
require(10120);
require(10001);
