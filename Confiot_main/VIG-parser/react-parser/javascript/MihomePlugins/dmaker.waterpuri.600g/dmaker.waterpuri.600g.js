
__d(function (global, _require, module, exports, _dependencyMap) {
    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _miot = _require(_dependencyMap[1]);

    var _Main = _require(_dependencyMap[2]);

    var _Main2 = babelHelpers.interopRequireDefault(_Main);

    var _Package = _require(_dependencyMap[3]);

    _Package.PackageEvent.packageAuthorizationCancel.addListener(function () {
        _miot.Package.exit();
    });

    _miot.Package.entry(_Main2.default, function () {});
},10001,[10297,10074,10004,10056],"projects/com.dmaker.water_purifier/index.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNavigation = _require(_dependencyMap[1]);

    var _MainPage = _require(_dependencyMap[2]);

    var _MainPage2 = babelHelpers.interopRequireDefault(_MainPage);

    var _miot = _require(_dependencyMap[3]);

    var _SettingPage = _require(_dependencyMap[4]);

    var _SettingPage2 = babelHelpers.interopRequireDefault(_SettingPage);

    var _CommonSetting = _require(_dependencyMap[5]);

    var _TestPage = _require(_dependencyMap[6]);

    var _TestPage2 = babelHelpers.interopRequireDefault(_TestPage);

    var _NavigationBar = _require(_dependencyMap[7]);

    var _NavigationBar2 = babelHelpers.interopRequireDefault(_NavigationBar);

    var _CompositeFilterPage = _require(_dependencyMap[8]);

    var _CompositeFilterPage2 = babelHelpers.interopRequireDefault(_CompositeFilterPage);

    var _InstructionPage = _require(_dependencyMap[9]);

    var _InstructionPage2 = babelHelpers.interopRequireDefault(_InstructionPage);

    var RootStack = (0, _reactNavigation.createStackNavigator)({
        MoreSetting: _CommonSetting.MoreSetting,
        FirmwareUpgrade: _CommonSetting.FirmwareUpgrade,
        Home: _MainPage2.default,
        Setting: _SettingPage2.default,
        Test: _TestPage2.default,
        CompositeFilterPage: _CompositeFilterPage2.default,
        InstructionPage: _InstructionPage2.default
    }, {
        initialRouteName: 'Home',
        navigationOptions: function navigationOptions(_ref) {
            var navigation = _ref.navigation;
            return {
                header: _react2.default.createElement(_NavigationBar2.default, {
                    backgroundColor: "transparent",
                    type: _NavigationBar2.default.TYPE.LIGHT,
                    left: [{
                        key: _NavigationBar2.default.ICON.BACK,
                        onPress: function onPress(_) {
                            return navigation.goBack();
                        }
                    }],
                    title: navigation.state.params ? navigation.state.params.title : ''
                })
            };
        },
        headerMode: 'screen',
        transitionConfig: function transitionConfig() {
            return _miot.Host.isAndroid ? {
                screenInterpolator: interpolator
            } : {};
        }
    });

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
},10004,[10297,10918,10007,10074,10118,10353,10121,10719,10124,10130],"projects/com.dmaker.water_purifier/Main/index.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var _MHGlobalData = _require(_dependencyMap[2]);

    var _MHGlobalData2 = babelHelpers.interopRequireDefault(_MHGlobalData);

    var _OtherConstant = _require(_dependencyMap[3]);

    var _OtherConstant2 = babelHelpers.interopRequireDefault(_OtherConstant);

    var _Color = _require(_dependencyMap[4]);

    var _Color2 = babelHelpers.interopRequireDefault(_Color);

    var _FontSizeConstant = _require(_dependencyMap[5]);

    var _FontSizeConstant2 = babelHelpers.interopRequireDefault(_FontSizeConstant);

    var _String = _require(_dependencyMap[6]);

    var _miot = _require(_dependencyMap[7]);

    var _MHCard = _require(_dependencyMap[8]);

    var _MHCard2 = babelHelpers.interopRequireDefault(_MHCard);

    var _ui = _require(_dependencyMap[9]);

    var _PropsHelp = _require(_dependencyMap[10]);

    var _PropsHelp2 = babelHelpers.interopRequireDefault(_PropsHelp);

    var _StorageUtil = _require(_dependencyMap[11]);

    var _StorageUtil2 = babelHelpers.interopRequireDefault(_StorageUtil);

    var _ToolUtil = _require(_dependencyMap[12]);

    var _ToolUtil2 = babelHelpers.interopRequireDefault(_ToolUtil);

    var _NavigationBar = _require(_dependencyMap[13]);

    var _NavigationBar2 = babelHelpers.interopRequireDefault(_NavigationBar);

    var _Style = _require(_dependencyMap[14]);

    var _Style2 = babelHelpers.interopRequireDefault(_Style);

    var _ModelView = _require(_dependencyMap[15]);

    var _ModelView2 = babelHelpers.interopRequireDefault(_ModelView);

    var _SpecHelp = _require(_dependencyMap[16]);

    var _SpecHelp2 = babelHelpers.interopRequireDefault(_SpecHelp);

    var _WaveView = _require(_dependencyMap[17]);

    var _WaveView2 = babelHelpers.interopRequireDefault(_WaveView);

    var _RpcManage = _require(_dependencyMap[18]);

    var _RpcManage2 = babelHelpers.interopRequireDefault(_RpcManage);

    var _RequestHelp = _require(_dependencyMap[19]);

    var _RequestHelp2 = babelHelpers.interopRequireDefault(_RequestHelp);

    var _reactNativeEasyToast = _require(_dependencyMap[20]);

    var _reactNativeEasyToast2 = babelHelpers.interopRequireDefault(_reactNativeEasyToast);

    var HomeScrollView = _reactNative.ScrollView;

    if (_miot.Host.isAndroid && _ui.MiotAndroidScrollView) {
        HomeScrollView = _ui.MiotAndroidScrollView;
    }

    var waveHeight = (0, _MHGlobalData.getWindowHeight)() * 0.580;
    var storageProps = _SpecHelp.props;
    var version = 1;
    var colorDuration = 1200;
    var UPDATE_PERIOD = 1000;
    var UPDATE_PROPS = 2000;
    var UPDATE_TIMER = 30000;

    var MainPage = function (_React$Component) {
        babelHelpers.inherits(MainPage, _React$Component);

        function MainPage(ps, context) {
            babelHelpers.classCallCheck(this, MainPage);

            var _this = babelHelpers.possibleConstructorReturn(this, (MainPage.__proto__ || Object.getPrototypeOf(MainPage)).call(this, ps, context));

            _this.setMode = function (mode) {
                _this.requestHelp.setEnabled('mode', false);

                _SpecHelp2.default.setMode(mode).then(function () {
                    _this.requestHelp.setEnabled('mode', true);

                    _this.propsHelp.increment(_SpecHelp.setProps[1]);

                    _this.setState({
                        mode: mode
                    });
                }).catch(function (err) {
                    _this.requestHelp.setEnabled('mode', true);

                    _this.toast && _this.toast.show((0, _String.getString)('set_mode_fail'));
                    (0, _MHGlobalData.print)('set mode failure', err);
                });
            };

            _this.enableCallback = function (key) {
                return _this.requestHelp.isEnabled(key);
            };

            _this.propsHelp = new _PropsHelp2.default(_SpecHelp.setProps);
            _this.specHelp = new _SpecHelp2.default(_SpecHelp.props);
            _this.requestHelp = new _RequestHelp2.default(_SpecHelp.setProps);
            _this.state = {
                deviceName: _miot.Device.name,
                power: true,
                mode: 2,
                status: 1,
                ppc_filter_rate: _OtherConstant2.default.defaultFilterLife,
                ppc_filter_day: _OtherConstant2.default.defaultFilterTime,
                ro_filter_rate: _OtherConstant2.default.defaultFilterLife,
                ro_filter_day: _OtherConstant2.default.defaultFilterTime,
                tds_in: 100,
                tds_out: 0
            };
            return _this;
        }

        babelHelpers.createClass(MainPage, [{
            key: "componentWillMount",
            value: function componentWillMount() {
                var _this2 = this;

                this.deviceNameListener = _miot.DeviceEvent.deviceNameChanged.addListener(function (device) {
                    _this2.setState({
                        deviceName: device.name
                    });
                });
            }
        }, {
            key: "componentDidMount",
            value: function componentDidMount() {
                this.mounted = true;
                this.loadPrivacyAuthed();
                this.loadCache();
                this.getProps();
                this.getSubscribe();
                this.getInterval();
            }
        }, {
            key: "componentWillUnmount",
            value: function componentWillUnmount() {
                this.mounted = false;
                this.deviceNameListener && this.deviceNameListener.remove();
                this.deviceListener && this.deviceListener.remove();
                this.msgSubscription && this.msgSubscription.remove();
                this.timer && clearInterval(this.timer);
                this.specHelp.unMount();
            }
        }, {
            key: "render",
            value: function render() {
                var _this3 = this;

                var themeColor = _Color2.default.ColorOf47D7EC;
                var ppcFilterSubtitle = (0, _String.getQuantityString)('filterDayLeftTip', this.state.ppc_filter_day, this.state.ppc_filter_day);
                var roFilterSubtitle = (0, _String.getQuantityString)('filterDayLeftTip', this.state.ro_filter_day, this.state.ro_filter_day);
                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: {
                            flex: 1,
                            backgroundColor: '#f7f7f7',
                            flexDirection: 'column'
                        },
                        onLayout: function onLayout(event) {
                            var _event$nativeEvent$la = event.nativeEvent.layout,
                                width = _event$nativeEvent$la.width,
                                height = _event$nativeEvent$la.height;

                            if (_miot.Host.isAndroid && ((0, _MHGlobalData.getWindowWidth)() !== width || (0, _MHGlobalData.getWindowHeight)() !== height)) {
                                (0, _MHGlobalData.setWindowHeight)(height);
                                (0, _MHGlobalData.setWindowWidth)(width);
                            }
                        }
                    },
                    _react2.default.createElement(_reactNative.StatusBar, {
                        barStyle: "dark-content",
                        backgroundColor: "transparent",
                        animated: true
                    }),
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: {
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: waveHeight
                            }
                        },
                        _react2.default.createElement(_WaveView2.default, {
                            surfaceWidth: (0, _MHGlobalData.getWindowWidth)(),
                            surfaceHeigth: waveHeight
                        })
                    ),
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: [{
                                flex: 1,
                                width: '100%',
                                position: 'absolute',
                                height: '100%'
                            }]
                        },
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: {
                                    marginTop: (0, _MHGlobalData.getWindowHeight)() * 0.175,
                                    alignItems: 'center'
                                }
                            },
                            this.getTDSText(),
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: [styles.tdsTipStyle, _Style2.default.androidLightFont]
                                },
                                (0, _String.getString)("tdsTip")
                            )
                        ),
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: {
                                    backgroundColor: 'transparent',
                                    width: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                    flex: 1,
                                    paddingBottom: _MHGlobalData2.default.isIphoneX ? 34 : (0, _MHGlobalData.getHeightSize)(28)
                                }
                            },
                            _react2.default.createElement(_ModelView2.default, {
                                showShadow: true,
                                themeColor: themeColor,
                                duration: colorDuration,
                                disabled: !this.state.power,
                                modeCardStyle: {
                                    marginTop: (0, _MHGlobalData.getHeightSize)(10)
                                },
                                modeIndex: this.state.mode,
                                onModeChange: function onModeChange(mode) {
                                    if (_this3.state.mode === mode) {
                                        return;
                                    }

                                    _RpcManage2.default.getInstance().rpcRequest(_SpecHelp.SpecList.mode.getSpecProp(), mode, function () {
                                        _this3.setMode(mode);
                                    });
                                },
                                enableCallback: this.enableCallback
                            }),
                            _react2.default.createElement(_MHCard2.default, {
                                title: (0, _String.getString)(_OtherConstant.FilterType.PPC.title),
                                subtitle: ppcFilterSubtitle,
                                cardMarginTop: (0, _MHGlobalData.getHeightSize)(16),
                                cardType: _MHCard2.default.CARD_TYPE.NORMAL,
                                cardRadiusType: _MHCard2.default.CARD_RADIUS_TYPE.TOP,
                                showShadow: true,
                                onPress: function onPress() {
                                    if (_miot.Device.isOnline) {
                                        var _state = _this3.state,
                                            ppc_filter_rate = _state.ppc_filter_rate,
                                            ppc_filter_day = _state.ppc_filter_day;

                                        _this3.props.navigation.navigate('CompositeFilterPage', {
                                            filterLife: ppc_filter_rate,
                                            filterTime: ppc_filter_day,
                                            filterType: _OtherConstant.FilterType.PPC
                                        });
                                    }
                                },
                                icon: _require(_dependencyMap[21]),
                                iconContainerStyle: {
                                    width: (0, _MHGlobalData.getWidthSize)(40),
                                    height: (0, _MHGlobalData.getWidthSize)(40),
                                    borderRadius: (0, _MHGlobalData.getWidthSize)(20)
                                },
                                iconStyle: {
                                    width: (0, _MHGlobalData.getWidthSize)(36),
                                    height: (0, _MHGlobalData.getWidthSize)(36)
                                },
                                cardHeight: Math.ceil((0, _MHGlobalData.getHeightSize)(80)),
                                hasLine: true,
                                lineStyle: {
                                    width: (0, _MHGlobalData.getWindowWidth)() - 60,
                                    marginLeft: 20
                                }
                            }),
                            _react2.default.createElement(_MHCard2.default, {
                                title: (0, _String.getString)(_OtherConstant.FilterType.RO.title),
                                subtitle: roFilterSubtitle,
                                cardType: _MHCard2.default.CARD_TYPE.NORMAL,
                                cardRadiusType: _MHCard2.default.CARD_RADIUS_TYPE.BOTTOM,
                                showShadow: true,
                                onPress: function onPress() {
                                    if (_miot.Device.isOnline) {
                                        var _state2 = _this3.state,
                                            ro_filter_rate = _state2.ro_filter_rate,
                                            ro_filter_day = _state2.ro_filter_day;

                                        _this3.props.navigation.navigate('CompositeFilterPage', {
                                            filterLife: ro_filter_rate,
                                            filterTime: ro_filter_day,
                                            filterType: _OtherConstant.FilterType.RO
                                        });
                                    }
                                },
                                icon: _require(_dependencyMap[22]),
                                iconContainerStyle: {
                                    width: (0, _MHGlobalData.getWidthSize)(40),
                                    height: (0, _MHGlobalData.getWidthSize)(40),
                                    borderRadius: (0, _MHGlobalData.getWidthSize)(20)
                                },
                                iconStyle: {
                                    width: (0, _MHGlobalData.getWidthSize)(36),
                                    height: (0, _MHGlobalData.getWidthSize)(36)
                                },
                                cardHeight: Math.ceil((0, _MHGlobalData.getHeightSize)(80))
                            })
                        )
                    ),
                    this.getNavigationBar(themeColor),
                    _react2.default.createElement(_reactNativeEasyToast2.default, {
                        ref: function ref(_ref) {
                            return _this3.toast = _ref;
                        },
                        opacity: 0.8,
                        textStyle: _Style2.default.toastTextStyle,
                        style: {
                            marginHorizontal: 20
                        },
                        fadeOutDuration: 1000
                    })
                );
            }
        }, {
            key: "getTDSText",
            value: function getTDSText() {
                if (_ToolUtil2.default.toNumber(this.state.tds_out) == 1000) {
                    var marginStyle = _miot.Host.isAndroid ? {
                        marginBottom: -(0, _MHGlobalData.getHeightSize)(12)
                    } : {
                        marginBottom: -(0, _MHGlobalData.getHeightSize)(8)
                    };
                    return _react2.default.createElement(
                        _reactNative.Text,
                        {
                            style: [marginStyle, {
                                fontSize: (0, _FontSizeConstant.setSpText)(86),
                                fontFamily: _FontSizeConstant2.default.FontFamilyOfMiKmedium,
                                includeFontPadding: false,
                                color: "#E6E7EC"
                            }]
                        },
                        _react2.default.createElement(
                            _reactNative.Text,
                            null,
                            "--"
                        )
                    );
                } else {
                    var hasValue = this.state.tds_out >= 0;
                    var tds = this.state.tds_out || 0;
                    tds = ('00' + tds).slice(-3);
                    var textArray = Array.from(String(tds)).map(function (value, index) {
                        var color = 'rgba(230,231,236,1.0)';

                        if (tds > Math.pow(10, 2 - index) - 1) {
                            color = _Color2.default.ColorOf47D7EC;
                        }

                        if (tds == 0 && index === 2 && hasValue) {
                            color = _Color2.default.ColorOf47D7EC;
                        }

                        return _react2.default.createElement(
                            _reactNative.Text,
                            {
                                key: index,
                                style: [{
                                    color: color
                                }]
                            },
                            value
                        );
                    });

                    var _marginStyle = _miot.Host.isAndroid ? {
                        marginBottom: -(0, _MHGlobalData.getHeightSize)(12)
                    } : {
                        marginBottom: -(0, _MHGlobalData.getHeightSize)(8)
                    };

                    return _react2.default.createElement(
                        _reactNative.Text,
                        {
                            style: [_marginStyle, {
                                fontSize: (0, _FontSizeConstant.setSpText)(86),
                                fontFamily: _FontSizeConstant2.default.FontFamilyOfMiKmedium,
                                includeFontPadding: false
                            }]
                        },
                        textArray
                    );
                }
            }
        }, {
            key: "getNavigationBar",
            value: function getNavigationBar(themeColor) {
                var _this4 = this;

                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: {
                            justifyContent: 'center',
                            alignItems: 'center'
                        }
                    },
                    _react2.default.createElement(_NavigationBar2.default, {
                        ref: function ref(_ref2) {
                            _this4.navigationBar = _ref2;
                        },
                        backgroundColor: "transparent",
                        type: _NavigationBar2.default.TYPE.LIGHT,
                        left: [{
                            key: _NavigationBar2.default.ICON.BACK,
                            onPress: function onPress() {
                                return _miot.Package.exit();
                            }
                        }],
                        right: [{
                            key: _NavigationBar2.default.ICON.MORE,
                            showDot: this.state.showDot,
                            onPress: function onPress() {
                                if (_miot.Device.isOnline) {
                                    _this4.props.navigation.navigate('Setting');
                                }
                            }
                        }],
                        subtitle: this.getSubtitle(),
                        title: this.state.deviceName,
                        onPressTitle: function onPressTitle() {}
                    })
                );
            }
        }, {
            key: "loadPrivacyAuthed",
            value: function loadPrivacyAuthed() {
                var params = {
                    'did': _miot.Device.deviceID,
                    'props': ["prop.s_auth_config"]
                };

                _miot.Service.smarthome.batchGetDeviceDatas([params]).then(function (res) {
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
                        _miot.Host.ui.openPrivacyLicense((0, _String.getString)('license'), (0, _String.getString)('userAgreementUrl'), (0, _String.getString)('privacy'), (0, _String.getString)('privacyPolicyUrl')).then(function (res) {
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
                    (0, _MHGlobalData.print)('授权错误', err);
                });
            }
        }, {
            key: "loadCache",
            value: function loadCache() {
                var _this5 = this;

                _StorageUtil2.default.load(storageProps).then(function (res) {
                    var cacheMap = new Map();

                    for (var i = 0; i < storageProps.length; i++) {
                        cacheMap.set(storageProps[i], res[i]);
                    }

                    (0, _MHGlobalData.print)("load cache succeed: ", cacheMap);

                    _this5.applyProps(cacheMap, false, false);
                }).catch(function (err) {
                    (0, _MHGlobalData.print)('load cache failure', err);
                });
            }
        }, {
            key: "getProps",
            value: function getProps() {
                var _this6 = this;

                this.specHelp.getProps(function (propsMap) {
                    _this6.applyProps(propsMap, true, false);
                });
            }
        }, {
            key: "getSubscribe",
            value: function getSubscribe() {
                var _this7 = this;

                this.deviceListener = _miot.DeviceEvent.deviceReceivedMessages.addListener(function (device, messages) {
                    (0, _MHGlobalData.print)('deviceReceivedMessages before ', messages);

                    var subscribeMap = _SpecHelp2.default.getSubscribeMap(messages);

                    (0, _MHGlobalData.print)('deviceReceivedMessages after ', subscribeMap);

                    _this7.applyProps(subscribeMap, true, true);
                });

                _SpecHelp2.default.subscribeMessages().then(function (subscription) {
                    _this7.msgSubscription = subscription;
                }).catch(function () {
                    return (0, _MHGlobalData.print)('subscribe failed');
                });
            }
        }, {
            key: "applyProps",
            value: function applyProps(map, save, subscribe) {
                var size = map.size;

                if (size === 0) {
                    return;
                }

                var newState = {};
                var forProps = save ? _SpecHelp.props : storageProps;

                for (var _iterator = forProps, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
                    var _ref3;

                    if (_isArray) {
                        if (_i >= _iterator.length) break;
                        _ref3 = _iterator[_i++];
                    } else {
                        _i = _iterator.next();
                        if (_i.done) break;
                        _ref3 = _i.value;
                    }

                    var prop = _ref3;

                    if (map.has(prop)) {
                        size--;
                        var value = map.get(prop);
                        var isBool = prop === 'power';

                        if (isBool) {
                            value = _ToolUtil2.default.toBoolValue(value);
                        } else {
                            value = Number(value);
                        }

                        var enable = true;
                        var checkProp = this.propsHelp.checkProp(prop);

                        if (subscribe && checkProp) {
                            this.propsHelp.decrement(prop);
                            enable = this.propsHelp.enabled(prop);
                        }

                        if (value !== this.state[prop] && enable) {
                            newState[prop] = value;
                        }
                    }

                    if (size <= 0) {
                        break;
                    }
                }

                if (Object.keys(newState).length > 0) {
                    this.setState(newState);
                }

                save && _StorageUtil2.default.save(map);
            }
        }, {
            key: "getInterval",
            value: function getInterval() {
                var _this8 = this;

                this.intervalCount = 0;
                this.timer = setInterval(function () {
                    if (_this8.intervalCount % (UPDATE_PROPS / UPDATE_PERIOD) === 0) {
                        _RpcManage2.default.getInstance().rpcRequest('get_properties', ['tds_in', 'tds_out'], function () {
                            _this8.getEnvironmentProp();
                        });
                    }

                    _this8.intervalCount++;
                }, UPDATE_PERIOD);
            }
        }, {
            key: "getEnvironmentProp",
            value: function getEnvironmentProp() {
                var _this9 = this;

                _SpecHelp2.default.getProps(['tds_in', 'tds_out']).then(function (map) {
                    _this9.applyProps(map, true, false);
                }).catch(function (err) {
                    return (0, _MHGlobalData.print)('get failure', err);
                });
            }
        }, {
            key: "getSubtitle",
            value: function getSubtitle() {
                var subtitle = (0, _String.getString)('tdsInTip') + _ToolUtil2.default.getTDSTitle(this.state.tds_in) + " | " + _ToolUtil2.default.getTDSPersentTitle(this.state.mode, this.state.tds_in);

                return subtitle;
            }
        }]);
        return MainPage;
    }(_react2.default.Component);

    MainPage.navigationOptions = function (_ref4) {
        var navigation = _ref4.navigation;
        return {
            header: null
        };
    };

    exports.default = MainPage;

    var styles = _reactNative.StyleSheet.create({
        tempTitle: {
            color: '#1C2229',
            fontSize: (0, _FontSizeConstant.setSpText)(34),
            includeFontPadding: false,
            fontFamily: _FontSizeConstant2.default.FontFamilyOfMiLight
        },
        tempSubtitle: {
            color: '#7f7f7f',
            fontSize: _FontSizeConstant2.default.FontOf12
        },
        tdsTipStyle: {
            color: _Color2.default.ColorOfAAABB5,
            fontSize: (0, _FontSizeConstant.setSpText)(14),
            textAlign: "center"
        }
    });
},10007,[10297,10033,10010,10034,10037,10040,10013,10074,10043,10230,10061,10064,10031,10067,10070,10073,10097,10103,10100,10106,10109,10112,10115],"projects/com.dmaker.water_purifier/Main/pages/MainPage.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.androidEn = exports.isLanguageEn = exports.isLongScreen = exports.getHeightSize = exports.getWidthSize = exports.getWindowWidth = exports.getWindowHeight = exports.setWindowWidth = exports.setWindowHeight = exports.printError = exports.print = undefined;

    var _index = _require(_dependencyMap[0]);

    var _reactNative = _require(_dependencyMap[1]);

    var _String = _require(_dependencyMap[2]);

    var _ToolUtil = _require(_dependencyMap[3]);

    var _ToolUtil2 = babelHelpers.interopRequireDefault(_ToolUtil);

    var StatusBarManager = _reactNative.NativeModules.StatusBarManager;

    var window = _reactNative.Dimensions.get('window');

    var isIpad = _index.Host.isIOS && _index.Host.systemInfo.mobileModel.indexOf("iPad") !== -1;
    var naviTitleHeight = 65;
    var iosStatusBarHeight = 20;
    var statusBarHeight = _index.Host.isAndroid ? _reactNative.StatusBar.currentHeight : iosStatusBarHeight;
    _index.Host.isIOS && StatusBarManager.getHeight(function (statusBar) {
        if (statusBar.hasOwnProperty("height")) {
            statusBarHeight = _ToolUtil2.default.toNumber(statusBar["height"]);
            MHGlobal.isIphoneX = _index.Host.isIOS && statusBarHeight > iosStatusBarHeight;
            MHGlobal.statusBarHeight = statusBarHeight;
            MHGlobal.naviHeight = naviTitleHeight + statusBarHeight;
        }
    });
    var PhoneWindow = {
        windowHeight: 0,
        windowWidth: 0
    };
    var MHGlobal = {
        userId: _index.Service.account.ID,
        deviceModel: _index.Device.model,
        isIphoneX: false,
        isIpad: isIpad,
        HeightPercent: (getWindowHeight() / 667.00).toFixed(2),
        WidthPercent: (getWindowWidth() / 375.00).toFixed(2),
        naviTitleHeight: naviTitleHeight,
        statusBarHeight: statusBarHeight,
        naviHeight: naviTitleHeight + statusBarHeight,
        headerScale: 0.5,
        centerScale: 0.46
    };
    exports.default = MHGlobal;
    var printDate = new Date();

    function print(msg) {}

    function printError(msg) {}

    function setWindowHeight(height) {
        PhoneWindow.windowHeight = height;
    }

    function setWindowWidth(width) {
        PhoneWindow.windowWidth = width;
    }

    function getWindowHeight() {
        if (PhoneWindow.windowHeight === 0) {
            return window.height;
        }

        return PhoneWindow.windowHeight;
    }

    function getWindowWidth() {
        if (PhoneWindow.windowWidth === 0) {
            return window.width;
        }

        return PhoneWindow.windowWidth;
    }

    function getWidthSize(width) {
        return width * MHGlobal.WidthPercent;
    }

    function getHeightSize(height) {
        return height * MHGlobal.HeightPercent;
    }

    function isLongScreen() {
        return getWindowWidth() / getWindowHeight() < 0.52;
    }

    function isLanguageEn() {
        return (0, _String.getString)('isEN');
    }

    function androidEn() {
        return isLanguageEn() && _index.Host.isAndroid;
    }

    exports.print = print;
    exports.printError = printError;
    exports.setWindowHeight = setWindowHeight;
    exports.setWindowWidth = setWindowWidth;
    exports.getWindowHeight = getWindowHeight;
    exports.getWindowWidth = getWindowWidth;
    exports.getWidthSize = getWidthSize;
    exports.getHeightSize = getHeightSize;
    exports.isLongScreen = isLongScreen;
    exports.isLanguageEn = isLanguageEn;
    exports.androidEn = androidEn;

    Date.prototype.Format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "S": this.getMilliseconds()
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }

        return fmt;
    };

    Array.prototype.equals = function (array) {
        if (!array) return false;
        if (this.length !== array.length) return false;

        for (var i = 0, l = this.length; i < l; i++) {
            if (this[i] instanceof Array && array[i] instanceof Array) {
                if (!this[i].equals(array[i])) return false;
            } else if (this[i] !== array[i]) {
                return false;
            }
        }

        return true;
    };

    Object.defineProperty(Array.prototype, "equals", {
        enumerable: false
    });
},10010,[10074,10033,10013,10031],"projects/com.dmaker.water_purifier/Main/MHGlobalData.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.localStrings = exports.strings = undefined;
    exports.getString = getString;
    exports.getQuantityString = getQuantityString;

    var _LocalizedStrings = _require(_dependencyMap[0]);

    var _LocalizedStrings2 = babelHelpers.interopRequireDefault(_LocalizedStrings);

    var _intlMessageformat = _require(_dependencyMap[1]);

    var _intlMessageformat2 = babelHelpers.interopRequireDefault(_intlMessageformat);

    _require(_dependencyMap[2]);

    _require(_dependencyMap[3]);

    _require(_dependencyMap[4]);

    _require(_dependencyMap[5]);

    _require(_dependencyMap[6]);

    var strings = exports.strings = {
        "en": {
            controlDevice: "Device Controls",
            hour: "h",
            minute: "min",
            license: "License",
            privacy: "Privacy",
            privacyPolicyUrl: _require(_dependencyMap[7]),
            userAgreementUrl: _require(_dependencyMap[8]),
            isEN: true,
            waterSaving: "Water saving",
            stamina: "Eco",
            intelligent: "Smart",
            tdsTip: "Output water(TDS)",
            tdsInTip: "Tap water(TDS): ",
            tdsInPersent: "Recovery ratio",
            on: "Turn on",
            off: "Turn off",
            current: "Current ",
            mode: " Mode ",
            timerTitle: "Scheduled on/off",
            compoundFilterTitle: "Composite filter life remaining: {0}%",
            filterDayLeftTip: {
                one: 'Estimated remaining life: {0} day',
                other: "Estimated remaining life: {0} days"
            },
            buyFilterSuggestion: "\nplease purchase a new filter soon.",
            replaceFilterSuggestion: "\nplease replace the filter soon.",
            filterBuyTip: "Coming soon",
            notEnabled: "Not enabled",
            enabled: 'Enabled',
            notAdd: "Not added",
            childLock: "Parental controls",
            childLockTip: "After enabling parental controls, the device can only be controlled via the app",
            deviceSound: "Notification sounds",
            compoundTitle: "Composite filter",
            buyFilter: "Purchase now",
            left: "Remaining ",
            compoundFilterDes: "Filter pro and filter are combined together, up to\nH13 level HEPA, which can effectively filter pollen,\nPM0.3 and other particulates",
            PPCTitle: 'PPC Filter',
            ROTitle: 'RO Filter',
            PPCFilterDesc: 'Polypropylene+activated carbon composite filter has good filtering effect on removing suspended solids, colloids and impurities in water',
            ROFilterDesc: 'Polymer reverse osmosis technology, with a filtration accuracy of 0.0001 micron, filters out harmful substances such as organic matter, microorganisms, chemical residues, heavy metals, bacteria, etc.',
            Instruction1: 'When the filter indicator light is red, it means the filter life is expired. You need to replace the filter. Grasp the filter counterclockwise to a certain angle, the filter element can be pulled out.',
            Instruction2: 'Align the new filter with the filter cartridge, insert it horizontally, and turn it clockwise to the vertical direction.',
            Instruction4: 'After the filter replacement is complete, power on the machine and turn on the faucet. The machine automatically starts the rinse, and after five minutes, turn off the faucet and the rinse is over.',
            ROInstruction: 'After replacing the new filter, press and hold RO filter reset key to reset the filter. After the filter indicator light changes from red to blue,  the filter can be used normally.',
            PPCInstruction: 'After replacing the new filter , press and hold the PPC filter reset button to reset the filter. After the filter indicator light changes from red to blue, the filter can be used normally.',
            InstructionTitle: 'Replace the Filter',
            set_mode_fail: 'Could not set mode'
        },
        'zh': {
            controlDevice: "设备控制",
            hour: "小时",
            minute: "分钟",
            license: "使用条款",
            privacy: "隐私政策",
            privacyPolicyUrl: _require(_dependencyMap[9]),
            userAgreementUrl: _require(_dependencyMap[10]),
            isEN: false,
            waterSaving: "节水模式",
            stamina: "长效模式",
            intelligent: "智能模式",
            tdsTip: "过滤后水质(TDS)",
            tdsInTip: "过滤前水质(TDS): ",
            tdsInPersent: "纯废水比",
            on: "开机",
            off: "关机",
            current: "当前",
            mode: "模式",
            timerTitle: "定时开关机",
            compoundFilterTitle: "复合滤芯还剩{0}%",
            filterDayLeftTip: {
                one: "预计还可以使用{0}天",
                other: "预计还可以使用{0}天"
            },
            buyFilterSuggestion: "\n建议及时购买滤芯",
            replaceFilterSuggestion: "\n建议及时更换滤芯",
            filterBuyTip: "滤芯购买稍后上线",
            notEnabled: "未开启",
            enabled: '开启',
            notAdd: "未添加",
            childLock: "童锁",
            childLockTip: "开启后，只可用APP控制净化器",
            deviceSound: "提示音",
            compoundTitle: "PPC滤芯",
            buyFilter: "一键购买",
            left: "滤芯剩余",
            compoundFilterDes: "高效与中效滤芯二合一，最高H13级HEPA\n有效过滤花粉、PM0.3 等颗粒物",
            PPCTitle: 'PPC滤芯',
            ROTitle: 'RO反渗透滤芯',
            PPCFilterDesc: '聚丙烯+活性炭复合滤芯，对剔除水中的悬浮物、胶体、杂质，有良好的过滤效果',
            ROFilterDesc: '高分子反渗透技术，过滤精度为0.0001微米，滤除水中的有机物、微生物、化学残留物、重金属、细菌等有害物质',
            Instruction1: '滤芯指示灯红色时代表滤芯寿命到期，需要更换滤芯，抓住滤芯逆时针旋转至一定角度，即可抽出滤芯。',
            Instruction2: '将新滤芯对准滤芯仓，沿水平方向插入，顺时针旋转至垂直方向。',
            Instruction4: '滤芯更换完成后，机器接通电源，打开水龙头。机器自动进入冲洗，五分钟后，关闭水龙头，冲洗结束。',
            ROInstruction: '替换完新滤芯后长按RO滤芯复位键进行滤芯复位，滤芯指示灯由红色变为蓝色后滤芯可以正常使用。',
            PPCInstruction: '替换完新滤芯后长按PPC滤芯复位键进行滤芯复位，滤芯指示灯由红色变为蓝色后滤芯可以正常使用。',
            InstructionTitle: '滤芯更换说明',
            set_mode_fail: '模式设置失败'
        },
        'zh-tw': {
            controlDevice: "設備控制",
            hour: "小時",
            minute: "分鐘",
            license: "使用條款",
            privacy: "隱私政策",
            privacyPolicyUrl: _require(_dependencyMap[9]),
            userAgreementUrl: _require(_dependencyMap[10]),
            isEN: false,
            waterSaving: "節水模式",
            stamina: "長效模式",
            intelligent: "智能模式",
            tdsTip: "過濾後水質(TDS)",
            tdsInTip: "過濾前水質(TDS): ",
            tdsInPersent: "純廢水比",
            on: "開機",
            off: "關機",
            current: "當前",
            mode: "模式",
            timerTitle: "定時開關機",
            compoundFilterTitle: "復合濾芯還剩{0}%",
            filterDayLeftTip: {
                one: "預計還可以使用{0}天",
                other: "預計還可以使用{0}天"
            },
            buyFilterSuggestion: "\n建議及时購買濾芯",
            replaceFilterSuggestion: "\n建議及时更換濾芯",
            filterBuyTip: "濾芯購買稍後上線",
            notEnabled: "未開啟",
            enabled: '開啟',
            notAdd: "未添加",
            childLock: "童鎖",
            childLockTip: "開啓後，只可用APP控制淨化器",
            deviceSound: "提示音",
            compoundTitle: "復合濾芯",
            buyFilter: "立即購買",
            left: "剩余",
            compoundFilterDes: "高效與中效濾芯二合一，最高H13級HEPA\n有效過濾花粉、PM0.3 等顆粒物",
            PPCTitle: 'PPC濾芯',
            ROTitle: 'RO反滲透濾芯',
            PPCFilterDesc: '聚丙烯+活性炭復合濾芯，對剔除水中的懸浮物、膠體、雜質，有良好的過濾效果',
            ROFilterDesc: '高分子反滲透技術，過濾精度為0.0001微米，濾除水中的有機物、微生物、化學殘留物、重金屬、細菌等有害物質',
            Instruction1: '濾芯指示燈紅色時代表濾芯壽命到期，需要更換濾芯，抓住濾芯逆時針旋轉至壹定角度，即可抽出濾芯。',
            Instruction2: '將新濾芯對準濾芯倉，沿水平方向插入，順時針旋轉至垂直方向。',
            Instruction4: '濾芯更換完成後，機器接通電源，打開水龍頭。機器自動進入沖洗，五分鐘後，關閉水龍頭，沖洗結束。',
            ROInstruction: '替換完新濾芯後長按RO濾芯復位鍵進行濾芯復位，濾芯指示燈由紅色變為藍色後濾芯可以正常使用。',
            PPCInstruction: '替換完新濾芯後長按PPC濾芯復位鍵進行濾芯復位，濾芯指示燈由紅色變為藍色後濾芯可以正常使用。',
            InstructionTitle: '濾芯更換說明',
            set_mode_fail: '模式設置失敗'
        },
        'zh-hk': {
            controlDevice: "設備控制",
            hour: "小時",
            minute: "分鐘",
            license: "使用條款",
            privacy: "隱私政策",
            privacyPolicyUrl: _require(_dependencyMap[9]),
            userAgreementUrl: _require(_dependencyMap[10]),
            isEN: false,
            waterSaving: "節水模式",
            stamina: "長效模式",
            intelligent: "智能模式",
            tdsTip: "過濾後水質(TDS)",
            tdsInTip: "過濾前水質(TDS): ",
            tdsInPersent: "純廢水比",
            on: "開機",
            off: "關機",
            current: "當前",
            mode: "模式",
            timerTitle: "定時開關機",
            compoundFilterTitle: "復合濾芯還剩{0}%",
            filterDayLeftTip: {
                one: "預計還可以使用{0}天",
                other: "預計還可以使用{0}天"
            },
            buyFilterSuggestion: "\n建議及时購買濾芯",
            replaceFilterSuggestion: "\n建議及时更換濾芯",
            filterBuyTip: "濾芯購買稍後上線",
            notEnabled: "未開啟",
            enabled: '開啟',
            notAdd: "未添加",
            childLock: "童鎖",
            childLockTip: "開啓後，只可用APP控制淨化器",
            deviceSound: "提示音",
            compoundTitle: "復合濾芯",
            buyFilter: "立即購買",
            left: "剩余",
            compoundFilterDes: "高效與中效濾芯二合一，最高H13級HEPA\n有效過濾花粉、PM0.3 等顆粒物",
            PPCTitle: 'PPC濾芯',
            ROTitle: 'RO反滲透濾芯',
            PPCFilterDesc: '聚丙烯+活性炭復合濾芯，對剔除水中的懸浮物、膠體、雜質，有良好的過濾效果',
            ROFilterDesc: '高分子反滲透技術，過濾精度為0.0001微米，濾除水中的有機物、微生物、化學殘留物、重金屬、細菌等有害物質',
            Instruction1: '濾芯指示燈紅色時代表濾芯壽命到期，需要更換濾芯，抓住濾芯逆時針旋轉至壹定角度，即可抽出濾芯。',
            Instruction2: '將新濾芯對準濾芯倉，沿水平方向插入，順時針旋轉至垂直方向。',
            Instruction4: '濾芯更換完成後，機器接通電源，打開水龍頭。機器自動進入沖洗，五分鐘後，關閉水龍頭，沖洗結束。',
            ROInstruction: '替換完新濾芯後長按RO濾芯復位鍵進行濾芯復位，濾芯指示燈由紅色變為藍色後濾芯可以正常使用。',
            PPCInstruction: '替換完新濾芯後長按PPC濾芯復位鍵進行濾芯復位，濾芯指示燈由紅色變為藍色後濾芯可以正常使用。',
            InstructionTitle: '濾芯更換說明',
            set_mode_fail: '模式設置失敗'
        },
        'ko': {
            controlDevice: '장치 제어'
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

    function getQuantityString(name, quantity, formats) {
        var strings = getString(name);
        return strings[quantity > 1 ? 'other' : 'one'].format(formats);
    }

    String.prototype.format = function (args) {
        var result = this;

        if (arguments.length > 0) {
            if (arguments.length === 1 && typeof args === "object") {
                for (var key in args) {
                    if (args[key] != undefined) {
                        var reg = new RegExp("({" + key + "})", "g");
                        result = result.replace(reg, args[key]);
                    }
                }
            } else {
                for (var i = 0; i < arguments.length; i++) {
                    if (arguments[i] != undefined) {
                        var _reg = new RegExp("({)" + i + "(})", "g");

                        result = result.replace(_reg, arguments[i]);
                    }
                }
            }
        }

        return result;
    };
},10013,[10016,13591,13582,13669,13672,13675,13678,10019,10022,10025,10028],"projects/com.dmaker.water_purifier/resources/strings/String.js");
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
},10016,[10074],"projects/com.dmaker.water_purifier/common/LocalizedStrings.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.dmaker.water_purifier/resources/html",
        "scales": [1],
        "hash": "8017021b7f91e997463d1fe634dacc13",
        "name": "policy_en",
        "type": "html"
    });
},10019,[10420],"projects/com.dmaker.water_purifier/resources/html/policy_en.html");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.dmaker.water_purifier/resources/html",
        "scales": [1],
        "hash": "ca66b9b119fb958ed595951cda67b252",
        "name": "license_en",
        "type": "html"
    });
},10022,[10420],"projects/com.dmaker.water_purifier/resources/html/license_en.html");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.dmaker.water_purifier/resources/html",
        "scales": [1],
        "hash": "741eb2152ad8f6b6dd1f16fdd1a515b8",
        "name": "policy_cn",
        "type": "html"
    });
},10025,[10420],"projects/com.dmaker.water_purifier/resources/html/policy_cn.html");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.dmaker.water_purifier/resources/html",
        "scales": [1],
        "hash": "6f3d864e05ffbdd530359d773f051065",
        "name": "license_cn",
        "type": "html"
    });
},10028,[10420],"projects/com.dmaker.water_purifier/resources/html/license_cn.html");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _String = _require(_dependencyMap[0]);

    var ToolUtil = function () {
        function ToolUtil() {
            babelHelpers.classCallCheck(this, ToolUtil);
        }

        babelHelpers.createClass(ToolUtil, null, [{
            key: "toBoolValue",
            value: function toBoolValue(bool) {
                return String(bool) === 'true';
            }
        }, {
            key: "isEmptyObject",
            value: function isEmptyObject(obj) {
                for (var name in obj) {
                    if (obj.hasOwnProperty(name)) {
                        return false;
                    }
                }

                return true;
            }
        }, {
            key: "toNumber",
            value: function toNumber(key) {
                var type = typeof 10;

                if (typeof key !== type) {
                    key = isNaN(Number(key)) ? 0 : Number(key);
                }

                return key;
            }
        }, {
            key: "toBool",
            value: function toBool(key) {
                var type = typeof true;

                if (typeof key !== type) {
                    key = Boolean(key);
                }

                return key;
            }
        }, {
            key: "interpolateArray",
            value: function interpolateArray(targetArray, outPutArray, val) {
                if (val < Math.min.apply(null, targetArray)) {
                    return 0;
                }

                if (val > Math.max.apply(null, targetArray)) {
                    return targetArray.length - 1;
                }

                var idx = 0,
                    i = 0,
                    j = targetArray.length;

                for (i; i < j; i++) {
                    if (targetArray[i] >= val) {
                        idx = i;
                        break;
                    }

                    ;
                }

                ;
                return outPutArray[idx];
            }
        }, {
            key: "getTDSPersentTitle",
            value: function getTDSPersentTitle(mode, tds) {
                var title = (0, _String.getString)("tdsInPersent");
                var persent = ToolUtil.getPersent(tds);
                var tip = title;

                switch (mode) {
                    case 0:
                        {
                            tip = title + "2.5:1";
                        }
                        break;

                    case 1:
                        {
                            tip = title + "1:1";
                        }
                        break;

                    case 2:
                        {
                            tip = title + persent;
                        }
                        break;
                }

                return tip;
            }
        }, {
            key: "getTDSTitle",
            value: function getTDSTitle(tds) {
                var tip = ToolUtil.toNumber(tds) == 1000 ? "--" : tds;
                return tip;
            }
        }, {
            key: "getPersent",
            value: function getPersent(tds) {
                var per = "1:1";

                if (tds >= 0 && tds < 200) {
                    per = "2.5:1";
                }

                if (tds >= 200 && tds < 400) {
                    per = "2:1";
                }

                return per;
            }
        }]);
        return ToolUtil;
    }();

    exports.default = ToolUtil;
},10031,[10013],"projects/com.dmaker.water_purifier/Main/utils/ToolUtil.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var OtherConstant = {
        pm25Level1: 75,
        pm25Level2: 150,
        pm25Level3: 500,
        areaMinHeight: 2.4,
        areaMaxHeight: 2.9,
        defaultSpeed: 60,
        maxSpeed: 400,
        minSpeed: 60,
        maxPm25: 999,
        minPm25: 0,
        defaultGear: 0,
        defaultFilterLife: 100,
        defaultFilterTime: 180
    };
    var FilterType = exports.FilterType = {
        PPC: {
            title: 'PPCTitle',
            descStringKey: 'PPCFilterDesc',
            instruction1: 'Instruction1',
            instruction2: 'Instruction2',
            instruction3: 'PPCInstruction',
            instruction4: 'Instruction4',
            isPPC: true
        },
        RO: {
            title: 'ROTitle',
            descStringKey: 'ROFilterDesc',
            instruction1: 'Instruction1',
            instruction2: 'Instruction2',
            instruction3: 'ROInstruction',
            instruction4: 'Instruction4',
            isPPC: false
        }
    };
    var ENABLED = exports.ENABLED = '1';
    exports.default = OtherConstant;
},10034,[],"projects/com.dmaker.water_purifier/Main/constant/OtherConstant.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var color = {
        ColorOfWhite: '#ffffff',
        ColorOfBlack: '#000000',
        ColorOff8f8f8: '#f8f8f8',
        ColorOf333333: '#333333',
        ColorOf666666: '#666666',
        ColorOf4C4C4C: "#4C4C4C",
        ColorOf7F7F7F: "#7F7F7F",
        ColorOf999999: '#999999',
        ColorOfFD723F: '#FD723F',
        ColorOf00B7A2: '#00B7A2',
        ColorOfB2B2B2: '#B2B2B2',
        ColorOf47D7EC: '#47D7EC',
        ColorOf2A344C: '#2A344C',
        ColorOfAAABB5: '#AAABB5',
        ColorOfF4F5F8: '#F4F5F8',
        ColorOfAEAEAE: '#AEAEAE',
        ColorOfIndoorPM25: "#505763",
        ColorOfOutdoorPM25: "#8A99AE",
        FilterThemeColor: '#47D7EC',
        DarkTextColor: '#313232',
        circleUnfilledColor: '#D5E1E3',
        ColorOfSeparate: '#dddddd',
        ColorOFDBDBDB: "#DBDBDB",
        ColorOfSelected: "rgba(0,0,0,0.2)",
        ColorOfFF6849: "#ff6849"
    };
    exports.default = color;
},10037,[],"projects/com.dmaker.water_purifier/resources/color/Color.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.setSpTextSize = exports.screenH = exports.screenW = undefined;
    exports.setSpText = setSpText;

    var _reactNative = _require(_dependencyMap[0]);

    var fontScale = _reactNative.PixelRatio.getFontScale();

    var screenW = exports.screenW = _reactNative.Dimensions.get('window').width;

    var screenH = exports.screenH = _reactNative.Dimensions.get('window').height;

    var designWidth = 750.0;
    var designHeight = 1334.0;

    var setSpTextSize = exports.setSpTextSize = function setSpTextSize(size) {
        var scaleWidth = screenW / designWidth;
        var scaleHeight = screenH / designHeight;
        var scale = Math.min(scaleWidth, scaleHeight);
        var result = Math.round(size * scale / fontScale + 0.5);
        return result;
    };

    function setSpText(size) {
        var allowFontScaling = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var fontSize = allowFontScaling ? 1 : fontScale;
        return size / fontSize;
    }

    var fontSize = {
        FontOf10: setSpText(10),
        FontOf12: setSpText(12),
        FontOf13: setSpText(13),
        FontOf14: setSpText(14),
        FontOf15: setSpText(15),
        FontOf16: setSpText(16),
        FontOf17: setSpText(17),
        FontOf18: setSpText(18),
        FontOf20: setSpText(20),
        FontOf24: setSpText(24),
        FontFamilyOfDin: 'D-DIN',
        FontFamilyOfDinCondensedBold: 'D-DINCondensed-Bold',
        FontFamilyOfDinCondensed: 'D-DINCondensed',
        FontFamilyOfDinExpBold: 'D-DINExp-Bold',
        FontFamilyOfMiKmedium: 'Kmedium',
        FontFamilyOfDigital: 'DS-Digital',
        FontFamilyOfMiLight: 'MI-LANTING--GBK1-Light',
        FontFamilyOfMiThin: 'MI-LANTING--GBK1-Thin'
    };
    exports.default = fontSize;
},10040,[10033],"projects/com.dmaker.water_purifier/Main/constant/FontSizeConstant.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _propTypes = _require(_dependencyMap[0]);

    var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

    var _react = _require(_dependencyMap[1]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[2]);

    var _resources = _require(_dependencyMap[3]);

    var _Card = _require(_dependencyMap[4]);

    var _Card2 = babelHelpers.interopRequireDefault(_Card);

    var _Switch = _require(_dependencyMap[5]);

    var _Switch2 = babelHelpers.interopRequireDefault(_Switch);

    var _MHGlobalData = _require(_dependencyMap[6]);

    var CARD_TYPE = {
        NORMAL: 'normal',
        SWITCH: 'switch'
    };
    Object.freeze(CARD_TYPE);
    var CARD_RADIUS_TYPE = {
        ALL: 'all',
        NONE: 'none',
        TOP: 'top',
        BOTTOM: 'bottom'
    };
    Object.freeze(CARD_RADIUS_TYPE);

    var _Dimensions$get = _reactNative.Dimensions.get('window'),
        width = _Dimensions$get.width;

    var cardMargin = 20;
    var cardWidth = width - cardMargin * 2;
    var cardHeight = 80;
    var cardPadding = 20;
    var ICON_SIZE = 40;
    var ARROW_SIZE = 26;
    var disabledOpacity = 0.35;

    var AnimatedSwitch = _reactNative.Animated.createAnimatedComponent(_Switch2.default);

    var MHCard = function (_React$Component) {
        babelHelpers.inherits(MHCard, _React$Component);

        function MHCard(props) {
            var _CARD_RADIUS_TYPE$ALL;

            babelHelpers.classCallCheck(this, MHCard);

            var _this = babelHelpers.possibleConstructorReturn(this, (MHCard.__proto__ || Object.getPrototypeOf(MHCard)).call(this, props));

            _this.radiusStyle = (_CARD_RADIUS_TYPE$ALL = {}, babelHelpers.defineProperty(_CARD_RADIUS_TYPE$ALL, CARD_RADIUS_TYPE.ALL, {
                borderRadius: 10
            }), babelHelpers.defineProperty(_CARD_RADIUS_TYPE$ALL, CARD_RADIUS_TYPE.NONE, {
                borderRadius: 0
            }), babelHelpers.defineProperty(_CARD_RADIUS_TYPE$ALL, CARD_RADIUS_TYPE.TOP, {
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10
            }), babelHelpers.defineProperty(_CARD_RADIUS_TYPE$ALL, CARD_RADIUS_TYPE.BOTTOM, {
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10
            }), _CARD_RADIUS_TYPE$ALL)[_this.props.cardRadiusType];
            _this.cardStyle = _reactNative.StyleSheet.flatten([_this.radiusStyle, {
                width: cardWidth,
                height: Math.ceil(_this.props.cardHeight),
                marginTop: _this.props.cardMarginTop
            }]);
            _this.colorAnimated = new _reactNative.Animated.Value(0);
            _this.reverse = false;
            _this.lastStartTheme = _this.props.themeColor;
            _this.lastEndTheme = _this.lastStartTheme;
            return _this;
        }

        babelHelpers.createClass(MHCard, [{
            key: "componentWillReceiveProps",
            value: function componentWillReceiveProps(newProps) {
                if (newProps.animated && newProps.themeColor) {
                    var startThemeColor = this.props.themeColor,
                        endThemeColor = newProps.themeColor;

                    if (this.lastStartTheme !== startThemeColor || this.lastEndTheme !== endThemeColor) {
                        var outputRange = this.reverse ? [endThemeColor, startThemeColor] : [startThemeColor, endThemeColor];
                        this.themeColorIp = this.colorAnimated.interpolate({
                            inputRange: [0, 1],
                            outputRange: outputRange
                        });
                        this.lastStartTheme = startThemeColor;
                        this.lastEndTheme = endThemeColor;
                    }
                }
            }
        }, {
            key: "componentDidUpdate",
            value: function componentDidUpdate(prevProps) {
                if (this.props.animated && this.props.themeColor) {
                    if (this.props.themeColor !== prevProps.themeColor) {
                        var toValue = this.reverse ? 0 : 1;
                        this.reverse = !this.reverse;

                        _reactNative.Animated.timing(this.colorAnimated, {
                            toValue: toValue,
                            duration: this.props.duration
                        }).start();
                    }
                }
            }
        }, {
            key: "renderInnerView",
            value: function renderInnerView() {
                var _props = this.props,
                    disabled = _props.disabled,
                    iconContainerStyle = _props.iconContainerStyle,
                    themeColor = _props.themeColor,
                    animated = _props.animated;
                var opacityStyle = {
                    opacity: disabled ? disabledOpacity : 1
                };
                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: {
                            flexDirection: 'column',
                            flex: 1
                        }
                    },
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: [styles.container, this.radiusStyle, opacityStyle]
                        },
                        _react2.default.createElement(
                            _reactNative.Animated.View,
                            {
                                style: [styles.iconContainer, {
                                    backgroundColor: animated && this.themeColorIp || themeColor
                                }, iconContainerStyle]
                            },
                            _react2.default.createElement(_reactNative.Image, {
                                style: [styles.icon, this.props.iconStyle],
                                source: this.props.icon,
                                resizeMode: "contain"
                            })
                        ),
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: styles.textContainer
                            },
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: styles.titleContainer
                                },
                                _react2.default.createElement(
                                    _reactNative.Text,
                                    {
                                        style: [_resources.Styles.common.title, this.props.titleStyle],
                                        numberOfLines: 1
                                    },
                                    this.props.title || ''
                                ),
                                this.props.subtitle ? _react2.default.createElement(
                                    _reactNative.Text,
                                    {
                                        style: [styles.subtitle, this.props.subtitleStyle],
                                        numberOfLines: 1
                                    },
                                    this.props.subtitle
                                ) : null
                            ),
                            this.props.rightText ? _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: [styles.rightText, this.props.rightTextStyle],
                                    numberOfLines: 2
                                },
                                this.props.rightText || ''
                            ) : null
                        ),
                        this.renderRight()
                    ),
                    this.renderLine()
                );
            }
        }, {
            key: "renderLine",
            value: function renderLine() {
                if (this.props.hasLine) {
                    return _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: {
                                backgroundColor: '#ffffff',
                                height: 1,
                                justifyContent: 'center'
                            }
                        },
                        _react2.default.createElement(_reactNative.View, {
                            style: [{
                                width: cardWidth,
                                height: 1,
                                backgroundColor: '#F4F5F8'
                            }, this.props.lineStyle]
                        })
                    );
                } else {
                    return null;
                }
            }
        }, {
            key: "renderRight",
            value: function renderRight() {
                if (this.props.cardType === CARD_TYPE.NORMAL) {
                    if (this.props.hideArrow) return null;
                    return _react2.default.createElement(_reactNative.Image, {
                        style: styles.arrow,
                        source: _resources.Images.common.right_arrow,
                        resizeMode: "contain"
                    });
                } else if (this.props.cardType === CARD_TYPE.SWITCH) {
                    var _props2 = this.props,
                        themeColor = _props2.themeColor,
                        animated = _props2.animated;
                    return _react2.default.createElement(AnimatedSwitch, babelHelpers.extends({
                        value: this.props.switchValue,
                        onTintColor: animated && this.themeColorIp || themeColor
                    }, this.props));
                } else {
                    console.warn('cardType must be one of CARD_TYPE');
                }
            }
        }, {
            key: "render",
            value: function render() {
                return _react2.default.createElement(_Card2.default, babelHelpers.extends({
                    innerView: this.renderInnerView(),
                    cardStyle: this.cardStyle
                }, this.props));
            }
        }]);
        return MHCard;
    }(_react2.default.Component);

    MHCard.propTypes = {
        cardType: _propTypes2.default.oneOf([CARD_TYPE.NORMAL, CARD_TYPE.SWITCH]),
        cardRadiusType: _propTypes2.default.oneOf([CARD_RADIUS_TYPE.ALL, CARD_RADIUS_TYPE.NONE, CARD_RADIUS_TYPE.TOP, CARD_RADIUS_TYPE.BOTTOM]),
        iconContainerStyle: _propTypes2.default.object,
        icon: _propTypes2.default.number.isRequired,
        iconStyle: _propTypes2.default.object,
        title: _propTypes2.default.string.isRequired,
        titleStyle: _propTypes2.default.object,
        subtitle: _propTypes2.default.string,
        subtitleStyle: _propTypes2.default.object,
        rightText: _propTypes2.default.string,
        rightTextStyle: _propTypes2.default.object,
        hideArrow: _propTypes2.default.bool,
        hasLine: _propTypes2.default.bool,
        lineStyle: _propTypes2.default.object,
        onPress: _propTypes2.default.func,
        switchValue: _propTypes2.default.bool,
        onTintColor: _propTypes2.default.string,
        tintColor: _propTypes2.default.string,
        onValueChange: _propTypes2.default.func,
        disabled: _propTypes2.default.bool,
        visible: _propTypes2.default.bool,
        showShadow: _propTypes2.default.bool,
        cardMarginTop: _propTypes2.default.number,
        duration: _propTypes2.default.number,
        themeColor: _propTypes2.default.any,
        cardHeight: _propTypes2.default.number,
        animated: _propTypes2.default.bool
    };
    MHCard.defaultProps = {
        cardType: CARD_TYPE.NORMAL,
        cardRadiusType: CARD_RADIUS_TYPE.ALL,
        icon: _resources.Images.common.mihome,
        hideArrow: false,
        switchValue: false,
        disabled: false,
        visible: true,
        showShadow: false,
        cardMarginTop: 0,
        duration: 1200,
        animated: true,
        hasLine: false,
        cardHeight: cardHeight
    };
    MHCard.CARD_TYPE = CARD_TYPE;
    MHCard.CARD_RADIUS_TYPE = CARD_RADIUS_TYPE;
    exports.default = MHCard;

    var styles = _reactNative.StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: cardPadding,
            backgroundColor: '#fff',
            flexDirection: 'row',
            alignItems: 'center'
        },
        iconContainer: {
            width: ICON_SIZE,
            height: ICON_SIZE,
            justifyContent: 'center',
            alignItems: 'center'
        },
        icon: {
            width: ICON_SIZE,
            height: ICON_SIZE,
            borderRadius: ICON_SIZE / 2
        },
        textContainer: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 14
        },
        titleContainer: {
            flex: 1,
            justifyContent: 'center'
        },
        subtitle: {
            fontSize: 12,
            lineHeight: 16,
            color: '#666'
        },
        rightText: {
            flex: 0.5,
            textAlign: 'right',
            fontSize: 16,
            color: '#000'
        },
        arrow: {
            width: ARROW_SIZE,
            height: ARROW_SIZE
        }
    });
},10043,[10046,10297,10033,10077,10055,10347,10010],"projects/com.dmaker.water_purifier/Main/views/mi/MHCard.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  {
    module.exports = _require(_dependencyMap[0])();
  }
},10046,[10049],"projects/com.dmaker.water_purifier/node_modules/prop-types/index.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  'use strict';

  var ReactPropTypesSecret = _require(_dependencyMap[0]);

  function emptyFunction() {}

  function emptyFunctionWithReset() {}

  emptyFunctionWithReset.resetWarningCache = emptyFunction;

  module.exports = function () {
    function shim(props, propName, componentName, location, propFullName, secret) {
      if (secret === ReactPropTypesSecret) {
        return;
      }

      var err = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
      err.name = 'Invariant Violation';
      throw err;
    }

    ;
    shim.isRequired = shim;

    function getShim() {
      return shim;
    }

    ;
    var ReactPropTypes = {
      array: shim,
      bool: shim,
      func: shim,
      number: shim,
      object: shim,
      string: shim,
      symbol: shim,
      any: shim,
      arrayOf: getShim,
      element: shim,
      elementType: shim,
      instanceOf: getShim,
      node: shim,
      objectOf: getShim,
      oneOf: getShim,
      oneOfType: getShim,
      shape: getShim,
      exact: getShim,
      checkPropTypes: emptyFunctionWithReset,
      resetWarningCache: emptyFunction
    };
    ReactPropTypes.PropTypes = ReactPropTypes;
    return ReactPropTypes;
  };
},10049,[10052],"projects/com.dmaker.water_purifier/node_modules/prop-types/factoryWithThrowingShims.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  'use strict';

  var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
  module.exports = ReactPropTypesSecret;
},10052,[],"projects/com.dmaker.water_purifier/node_modules/prop-types/lib/ReactPropTypesSecret.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _propTypes = _require(_dependencyMap[0]);

  var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

  var _react = _require(_dependencyMap[1]);

  var _react2 = babelHelpers.interopRequireDefault(_react);

  var _reactNative = _require(_dependencyMap[2]);

  var _reactNativeShadow = _require(_dependencyMap[3]);

  var _CardBase = _require(_dependencyMap[4]);

  var _CardBase2 = babelHelpers.interopRequireDefault(_CardBase);

  var _Dimensions$get = _reactNative.Dimensions.get('window'),
      width = _Dimensions$get.width;

  var DURATION = 250;
  var DEFAULT_STYLE = {
    HEIGHT: 66,
    WIDTH: width - 30,
    RADIUS: 8,
    MARGIN_TOP: {
      marginTop: 15
    }
  };

  var Card = function (_React$Component) {
    babelHelpers.inherits(Card, _React$Component);

    function Card(props, context) {
      babelHelpers.classCallCheck(this, Card);

      var _this = babelHelpers.possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).call(this, props, context));

      _this.state = {
        showShadow: _this.props.visible && _this.props.showShadow
      };
      return _this;
    }

    babelHelpers.createClass(Card, [{
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(newProps) {
        var _this2 = this;

        if (newProps.showShadow === false) return;
        if (newProps.visible === this.props.visible) return;

        if (newProps.visible === false) {
          this.setState({
            showShadow: false
          });
        } else if (newProps.visible === true) {
            setTimeout(function (_) {
              return _this2.setState({
                showShadow: true
              });
            }, DURATION);
          }
      }
    }, {
      key: "renderCardIOS",
      value: function renderCardIOS() {
        var shadowIOS = this.props.showShadow ? {
          position: 'relative',
          shadowColor: this.props.shadowColor,
          shadowOpacity: this.props.shadowOpacity,
          shadowOffset: {
            width: 0,
            height: 8
          }
        } : {};

        var cardStyle = _reactNative.StyleSheet.flatten([{}, DEFAULT_STYLE.MARGIN_TOP, this.props.cardStyle, shadowIOS]);

        return _react2.default.createElement(_CardBase2.default, babelHelpers.extends({}, this.props, {
          cardStyle: cardStyle
        }));
      }
    }, {
      key: "renderCardAndroid",
      value: function renderCardAndroid() {
        if (!this.state.showShadow) {
          var cardStyle = _reactNative.StyleSheet.flatten([{}, DEFAULT_STYLE.MARGIN_TOP, this.props.cardStyle]);

          return _react2.default.createElement(_CardBase2.default, babelHelpers.extends({}, this.props, {
            cardStyle: cardStyle
          }));
        } else {
          var _props$cardStyle = this.props.cardStyle,
              _width = _props$cardStyle.width,
              height = _props$cardStyle.height,
              borderRadius = _props$cardStyle.borderRadius;

          var _getCorrectStyle = this.getCorrectStyle(),
              shadowAndroidStyle = _getCorrectStyle.shadowAndroidStyle,
              _cardStyle = _getCorrectStyle.cardStyle;

          var shadowAndroid = {
            width: _width || DEFAULT_STYLE.WIDTH,
            height: height || DEFAULT_STYLE.HEIGHT,
            radius: borderRadius || DEFAULT_STYLE.RADIUS,
            color: this.props.shadowColor,
            border: 10,
            opacity: this.props.shadowOpacity,
            x: 0,
            y: 6,
            style: shadowAndroidStyle
          };
          return _react2.default.createElement(
            _reactNativeShadow.BoxShadow,
            {
              setting: shadowAndroid
            },
            _react2.default.createElement(_CardBase2.default, babelHelpers.extends({}, this.props, {
              cardStyle: _cardStyle
            }))
          );
        }
      }
    }, {
      key: "getCorrectStyle",
      value: function getCorrectStyle() {
        var _this3 = this;

        var shadowAndroidStyle = babelHelpers.extends({}, DEFAULT_STYLE.MARGIN_TOP);
        var cardStyle = {};
        Object.keys(this.props.cardStyle).forEach(function (key) {
          if (key.toString().startsWith('margin')) {
            shadowAndroidStyle[key] = _this3.props.cardStyle[key];
          } else {
            cardStyle[key] = _this3.props.cardStyle[key];
          }
        });
        return {
          shadowAndroidStyle: shadowAndroidStyle,
          cardStyle: cardStyle
        };
      }
    }, {
      key: "render",
      value: function render() {
        return this.renderCardAndroid();
      }
    }]);
    return Card;
  }(_react2.default.Component);

  Card.propTypes = {
    innerView: _propTypes2.default.object,
    icon: _propTypes2.default.number,
    text: _propTypes2.default.string,
    visible: _propTypes2.default.bool,
    showDismiss: _propTypes2.default.bool,
    disabled: _propTypes2.default.bool,
    dismiss: _propTypes2.default.func,
    showShadow: _propTypes2.default.bool,
    onPress: _propTypes2.default.func,
    cardStyle: _propTypes2.default.object,
    iconStyle: _propTypes2.default.object,
    textStyle: _propTypes2.default.object,
    underlayColor: _propTypes2.default.string,
    shadowColor: _propTypes2.default.string,
    shadowOpacity: _propTypes2.default.number
  };
  Card.defaultProps = {
    visible: true,
    showDismiss: false,
    disabled: false,
    showShadow: true,
    cardStyle: {},
    shadowColor: '#000',
    shadowOpacity: 0.03
  };
  exports.default = Card;
},10055,[10046,10297,10033,13699,10058],"projects/com.dmaker.water_purifier/Main/views/mi/Card.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _propTypes = _require(_dependencyMap[0]);

  var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

  var _react = _require(_dependencyMap[1]);

  var _react2 = babelHelpers.interopRequireDefault(_react);

  var _reactNative = _require(_dependencyMap[2]);

  var _resources = _require(_dependencyMap[3]);

  var _MHGlobalData = _require(_dependencyMap[4]);

  var _Dimensions$get = _reactNative.Dimensions.get('window'),
      width = _Dimensions$get.width;

  var DURATION_OUT = 250;
  var DURATION_IN = 250;
  var DEFAULT_STYLE = {
    MARGIN_H: 15,
    HEIGHT: 66,
    WIDTH: width - 30,
    ICON_SIZE: 35,
    CLOSE_AREA: 30,
    CLOSE_SIZE: 20
  };

  var CardBase = function (_React$Component) {
    babelHelpers.inherits(CardBase, _React$Component);

    function CardBase(props, context) {
      babelHelpers.classCallCheck(this, CardBase);

      var _this = babelHelpers.possibleConstructorReturn(this, (CardBase.__proto__ || Object.getPrototypeOf(CardBase)).call(this, props, context));

      var _this$props$cardStyle = _this.props.cardStyle,
          height = _this$props$cardStyle.height,
          marginTop = _this$props$cardStyle.marginTop;
      _this.cardHeight = height || DEFAULT_STYLE.HEIGHT;
      var initValue = _this.props.visible ? 1 : 0;
      _this.height = new _reactNative.Animated.Value(initValue);
      _this.opacity = new _reactNative.Animated.Value(initValue);
      _this.marginTop = marginTop || 0;
      return _this;
    }

    babelHelpers.createClass(CardBase, [{
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(nextProps) {
        var _nextProps$cardStyle = nextProps.cardStyle,
            height = _nextProps$cardStyle.height,
            marginTop = _nextProps$cardStyle.marginTop;
        this.cardHeight = height || DEFAULT_STYLE.HEIGHT;
        this.marginTop = marginTop || 0;
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        this.height.addListener(function (e) {
          _this2.refs.card.setNativeProps({
            marginTop: _this2.marginTop * e.value
          });
        });
      }
    }, {
      key: "renderInner",
      value: function renderInner() {
        if (this.props.innerView === undefined) {
          var _props = this.props,
              icon = _props.icon,
              text = _props.text,
              iconStyle = _props.iconStyle,
              textStyle = _props.textStyle;
          return _react2.default.createElement(
            _reactNative.Animated.View,
            {
              style: [styles.innerContainer, {
                opacity: this.opacity
              }]
            },
            icon ? _react2.default.createElement(_reactNative.Image, {
              style: [styles.innerIcon, iconStyle],
              source: icon,
              resizeMode: "contain"
            }) : null,
            _react2.default.createElement(
              _reactNative.Text,
              {
                style: [styles.innerText, textStyle],
                numberOfLines: 1,
                ellipsizeMode: "tail"
              },
              text || ''
            )
          );
        }

        return _react2.default.createElement(
          _reactNative.Animated.View,
          {
            style: [{
              flex: 1
            }, {
              opacity: this.opacity
            }]
          },
          this.props.innerView
        );
      }
    }, {
      key: "renderClose",
      value: function renderClose() {
        var _this3 = this;

        if (!this.props.showDismiss) return null;
        return _react2.default.createElement(
          _reactNative.TouchableHighlight,
          {
            style: styles.closeArea,
            underlayColor: "transparent",
            onPress: function onPress(_) {
              return _this3.dismiss();
            }
          },
          _react2.default.createElement(_reactNative.Animated.Image, {
            style: [styles.close, {
              opacity: this.opacity
            }],
            source: _resources.Images.common.close
          })
        );
      }
    }, {
      key: "getCorrectStyle",
      value: function getCorrectStyle(cardStyle) {
        var animatedViewStyle = {};
        var containerStyle = {};
        Object.keys(cardStyle).forEach(function (key) {
          if (key.toString().startsWith('margin') || key.toString() === 'width') {
            animatedViewStyle[key] = cardStyle[key];
          } else {
            containerStyle[key] = cardStyle[key];
          }
        });
        return {
          animatedViewStyle: animatedViewStyle,
          containerStyle: containerStyle
        };
      }
    }, {
      key: "render",
      value: function render() {
        var toValue = this.props.visible ? 1 : 0;

        if (!this.props.visible) {
          _reactNative.Animated.parallel([_reactNative.Animated.timing(this.height, {
            toValue: toValue,
            duration: DURATION_OUT,
            easing: _reactNative.Easing.ease
          }), _reactNative.Animated.timing(this.opacity, {
            toValue: toValue,
            duration: DURATION_OUT * 0.4,
            easing: _reactNative.Easing.ease
          })], {
            stopTogether: false
          }).start();
        } else {
            _reactNative.Animated.parallel([_reactNative.Animated.timing(this.opacity, {
              toValue: toValue,
              duration: DURATION_IN * 0.5,
              easing: _reactNative.Easing.ease,
              delay: DURATION_IN * 0.5
            }), _reactNative.Animated.timing(this.height, {
              toValue: toValue,
              duration: DURATION_IN,
              easing: _reactNative.Easing.ease
            })]).start();
          }

        var cardStyle = _reactNative.StyleSheet.flatten([styles.container, this.props.cardStyle]);

        var _getCorrectStyle = this.getCorrectStyle(cardStyle),
            animatedViewStyle = _getCorrectStyle.animatedViewStyle,
            containerStyle = _getCorrectStyle.containerStyle;

        return _react2.default.createElement(
          _reactNative.Animated.View,
          {
            ref: "card",
            style: [animatedViewStyle, {
              opacity: this.opacity,
              height: this.height.interpolate({
                inputRange: [0, 1],
                outputRange: [0, this.cardHeight]
              })
            }]
          },
          _react2.default.createElement(
            _reactNative.TouchableHighlight,
            {
              style: [containerStyle, {
                flex: 1
              }],
              underlayColor: this.props.underlayColor,
              disabled: this.props.disabled,
              onPress: this.props.onPress
            },
            _react2.default.createElement(
              _reactNative.View,
              {
                style: {
                  flex: 1
                }
              },
              this.renderInner(),
              this.renderClose()
            )
          )
        );
      }
    }, {
      key: "dismiss",
      value: function dismiss() {
        this.props.dismiss && this.props.dismiss();
      }
    }]);
    return CardBase;
  }(_react2.default.Component);

  CardBase.propTypes = {
    innerView: _propTypes2.default.object,
    icon: _propTypes2.default.number,
    text: _propTypes2.default.string,
    showDismiss: _propTypes2.default.bool,
    disabled: _propTypes2.default.bool,
    dismiss: _propTypes2.default.func,
    visible: _propTypes2.default.bool,
    onPress: _propTypes2.default.func,
    cardStyle: _propTypes2.default.object,
    iconStyle: _propTypes2.default.object,
    textStyle: _propTypes2.default.object,
    underlayColor: _propTypes2.default.string
  };
  CardBase.defaultProps = {
    showDismiss: false,
    disabled: false,
    visible: true,
    underlayColor: _resources.Styles.common.underlayColor
  };
  exports.default = CardBase;

  var styles = _reactNative.StyleSheet.create({
    container: {
      width: DEFAULT_STYLE.WIDTH,
      backgroundColor: '#ffffff'
    },
    innerContainer: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: DEFAULT_STYLE.MARGIN_H
    },
    innerIcon: {
      width: DEFAULT_STYLE.ICON_SIZE,
      height: DEFAULT_STYLE.ICON_SIZE,
      marginRight: DEFAULT_STYLE.MARGIN_H
    },
    innerText: {
      flex: 1,
      fontSize: 14,
      color: '#000'
    },
    closeArea: {
      width: DEFAULT_STYLE.CLOSE_AREA,
      height: DEFAULT_STYLE.CLOSE_AREA,
      position: 'absolute',
      top: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center'
    },
    close: {
      width: DEFAULT_STYLE.CLOSE_SIZE,
      height: DEFAULT_STYLE.CLOSE_SIZE
    }
  });
},10058,[10046,10297,10033,10077,10010],"projects/com.dmaker.water_purifier/Main/views/mi/CardBase.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var MAX_PUSH_SECOND = 3;
    var MAX_PUSH_BETWEEN_MILLISECONDS = 500;

    var PropsHelp = function () {
        babelHelpers.createClass(PropsHelp, null, [{
            key: "getTimestamp",
            value: function getTimestamp() {
                return parseInt(Date.now() / 1000);
            }
        }]);

        function PropsHelp(props) {
            babelHelpers.classCallCheck(this, PropsHelp);
            this.propsIndex = new Map();

            for (var i = 0; i < props.length; i++) {
                this.propsIndex.set(props[i], {
                    count: 0,
                    timestamp: PropsHelp.getTimestamp()
                });
            }
        }

        babelHelpers.createClass(PropsHelp, [{
            key: "increment",
            value: function increment(prop) {
                if (this.checkProp(prop)) {
                    var propObj = this.propsIndex.get(prop);
                    var count = 0;

                    if (propObj.count < 0 || this.isTimeout(propObj)) {
                        count = 0;
                    } else {
                        count = propObj.count;
                    }

                    var newPropObj = {
                        count: count + 1,
                        timestamp: PropsHelp.getTimestamp()
                    };
                    this.propsIndex.set(prop, newPropObj);
                }
            }
        }, {
            key: "decrement",
            value: function decrement(prop) {
                if (this.checkProp(prop)) {
                    var propObj = this.propsIndex.get(prop);

                    if ('pushTime' in propObj) {
                        if (Date.now() - propObj.pushTime < MAX_PUSH_BETWEEN_MILLISECONDS) {
                            propObj.pushTime = Date.now();
                            return;
                        }
                    }

                    propObj.pushTime = Date.now();
                    propObj.count -= 1;
                    this.propsIndex.set(prop, propObj);
                }
            }
        }, {
            key: "enabled",
            value: function enabled(prop) {
                if (this.checkProp(prop)) {
                    var propObj = this.propsIndex.get(prop);
                    return propObj.count < 0 || this.isTimeout(propObj);
                }

                return true;
            }
        }, {
            key: "isTimeout",
            value: function isTimeout(propObj) {
                return PropsHelp.getTimestamp() - propObj.timestamp > MAX_PUSH_SECOND;
            }
        }, {
            key: "checkProp",
            value: function checkProp(prop) {
                return this.propsIndex.has(prop);
            }
        }]);
        return PropsHelp;
    }();

    exports.default = PropsHelp;
},10061,[],"projects/com.dmaker.water_purifier/Main/utils/PropsHelp.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _miot = _require(_dependencyMap[0]);

    var storageKey = _miot.Service.account.ID + "-" + _miot.Device.deviceID + "-";
    var searchKey = 'prop.';

    var StorageUtil = function () {
        function StorageUtil() {
            babelHelpers.classCallCheck(this, StorageUtil);
        }

        babelHelpers.createClass(StorageUtil, null, [{
            key: "set",
            value: function set(key, value) {
                _miot.Host.storage.set(StorageUtil.addStorageKey(key), value);
            }
        }, {
            key: "save",
            value: function save(propsMap) {
                for (var _iterator = propsMap, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
                    var _ref3;

                    if (_isArray) {
                        if (_i >= _iterator.length) break;
                        _ref3 = _iterator[_i++];
                    } else {
                        _i = _iterator.next();
                        if (_i.done) break;
                        _ref3 = _i.value;
                    }

                    var _ref = _ref3;

                    var _ref2 = babelHelpers.slicedToArray(_ref, 2);

                    var key = _ref2[0];
                    var value = _ref2[1];
                    StorageUtil.set(key, value);
                }
            }
        }, {
            key: "get",
            value: function get(key) {
                return _miot.Host.storage.get(StorageUtil.addStorageKey(key));
            }
        }, {
            key: "load",
            value: function load(keys) {
                return _miot.Host.storage.load(keys.map(function (key) {
                    return StorageUtil.addStorageKey(key);
                }));
            }
        }, {
            key: "addStorageKey",
            value: function addStorageKey(key) {
                var newKey = void 0;

                if (key.includes(searchKey)) {
                    newKey = key.replace(searchKey, storageKey);
                } else {
                    newKey = storageKey + key;
                }

                return newKey;
            }
        }]);
        return StorageUtil;
    }();

    exports.default = StorageUtil;
},10064,[10074],"projects/com.dmaker.water_purifier/Main/utils/StorageUtil.js");
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

    var _Images = _require(_dependencyMap[4]);

    var _Images2 = babelHelpers.interopRequireDefault(_Images);

    var _ImageButton = _require(_dependencyMap[5]);

    var _ImageButton2 = babelHelpers.interopRequireDefault(_ImageButton);

    var TYPE = {
        DARK: 'dark',
        LIGHT: 'light'
    };
    Object.freeze(TYPE);
    var ICON = {
        ADD: 'add',
        BACK: 'back',
        CLOSE: 'close',
        COLLECT: 'collect',
        COMPLETE: 'complete',
        DELETE: 'delete',
        DETAIL: 'detail',
        MORE: 'more',
        NEXT: 'next',
        PROFILE: 'profile',
        QR: 'qr',
        SEARCH: 'search',
        SELECT_ALL: 'select_all',
        SELECTED_ALL: 'selected_all',
        SETTING: 'setting',
        SHARE: 'share'
    };
    Object.freeze(ICON);
    var _Images$navigation = _Images2.default.navigation,
        light = _Images$navigation.light,
        dark = _Images$navigation.dark,
        dot = _Images$navigation.dot;

    var _Dimensions$get = _reactNative.Dimensions.get('window'),
        width = _Dimensions$get.width;

    var navigationBarHeightThin = 52;
    var navigationBarHeightFat = 65;
    var paddingHorizontal = 9;
    var iconSize = 40;
    var lightTitleColor = '#000000';
    var darkTitleColor = '#ffffff';
    var lightSubtitleColor = '#666666';
    var darkSubtitleColor = '#ffffff';

    var NavigationBar = function (_Component) {
        babelHelpers.inherits(NavigationBar, _Component);

        function NavigationBar() {
            babelHelpers.classCallCheck(this, NavigationBar);
            return babelHelpers.possibleConstructorReturn(this, (NavigationBar.__proto__ || Object.getPrototypeOf(NavigationBar)).apply(this, arguments));
        }

        babelHelpers.createClass(NavigationBar, [{
            key: "getIconsOfType",
            value: function getIconsOfType(arr) {
                var icons = this.isDarkStyle ? dark : light;
                return arr.map(function (item) {
                    var key = item.key,
                        disable = item.disable;

                    if (disable) {
                        item.source = icons[key] ? icons[key].disable : null;
                        item.highlightedSource = null;
                    } else {
                        item.source = icons[key] ? icons[key].normal : null;
                        item.highlightedSource = icons[key] ? icons[key].press : null;
                    }

                    return item;
                }).filter(function (item) {
                    return item.source;
                });
            }
        }, {
            key: "renderIcons",
            value: function renderIcons(arr) {
                var icons = (arr || []).slice(0, 2);
                return icons.map(function (icon, i) {
                    if (!icon.source) {
                        return _react2.default.createElement(_reactNative.View, {
                            key: icon.key + i,
                            style: {
                                width: iconSize
                            }
                        });
                    }

                    return _react2.default.createElement(
                        _reactNative.View,
                        {
                            key: icon.key + i,
                            style: {
                                width: iconSize,
                                height: iconSize
                            }
                        },
                        icon.showDot ? _react2.default.createElement(_reactNative.Image, {
                            style: styles.dot,
                            resizeMode: "contain",
                            source: dot
                        }) : null,
                        _react2.default.createElement(_ImageButton2.default, {
                            disabled: !!icon.disable,
                            onPress: icon.onPress,
                            style: styles.icon,
                            source: icon.source,
                            highlightedSource: icon.highlightedSource
                        })
                    );
                });
            }
        }, {
            key: "renderTitle",
            value: function renderTitle() {
                var _this2 = this;

                var _props = this.props,
                    title = _props.title,
                    subtitle = _props.subtitle,
                    onPressTitle = _props.onPressTitle;
                var titleColor = {
                    color: this.isDarkStyle ? darkTitleColor : lightTitleColor
                };
                var subtitleColor = {
                    color: this.isDarkStyle ? darkSubtitleColor : lightSubtitleColor
                };
                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        ref: function ref(_ref) {
                            return _this2.titleContainerView = _ref;
                        },
                        style: [styles.titleContainer]
                    },
                    _react2.default.createElement(
                        _reactNative.Text,
                        {
                            numberOfLines: 1,
                            style: [styles.title, titleColor, {
                                fontSize: subtitle ? 16 : 18
                            }],
                            onPress: onPressTitle
                        },
                        title || ''
                    ),
                    subtitle ? _react2.default.createElement(
                        _reactNative.Text,
                        {
                            numberOfLines: 1,
                            style: [styles.subtitle, subtitleColor],
                            onPress: onPressTitle
                        },
                        subtitle
                    ) : null
                );
            }
        }, {
            key: "render",
            value: function render() {
                this.isDarkStyle = this.props.type === TYPE.DARK;

                _reactNative.StatusBar.setBarStyle(this.isDarkStyle ? 'light-content' : 'dark-content');

                {
                    _reactNative.StatusBar.setTranslucent(true);
                }
                var leftIcons = this.getIconsOfType(this.props.left);
                var rightIcons = this.getIconsOfType(this.props.right);
                leftIcons.length < rightIcons.length && leftIcons.push({});
                leftIcons.length > rightIcons.length && rightIcons.unshift({});
                var containerHeight = _reactNative.StatusBar.currentHeight || 0;
                containerHeight += this.props.subtitle ? navigationBarHeightFat : navigationBarHeightThin;
                var backgroundColor = this.props.backgroundColor ? this.props.backgroundColor : this.isDarkStyle ? '#000000' : '#ffffff';
                var containerStyle = {
                    backgroundColor: backgroundColor,
                    height: containerHeight
                };
                return _react2.default.createElement(
                    _reactNavigation.SafeAreaView,
                    {
                        forceInset: {
                            bottom: 'never'
                        },
                        style: [styles.container, containerStyle, {
                            paddingTop: _reactNative.StatusBar.currentHeight
                        }]
                    },
                    this.renderIcons(leftIcons),
                    this.renderTitle(),
                    this.renderIcons(rightIcons)
                );
            }
        }, {
            key: "setTitleNativeProps",
            value: function setTitleNativeProps(props) {
                this.titleContainerView && this.titleContainerView.setNativeProps(props);
            }
        }]);
        return NavigationBar;
    }(_react.Component);

    NavigationBar.propTypes = {
        type: _propTypes2.default.oneOf([TYPE.DARK, TYPE.LIGHT]),
        style: _propTypes2.default.any,
        left: _propTypes2.default.array,
        right: _propTypes2.default.array,
        title: _propTypes2.default.string,
        subtitle: _propTypes2.default.string,
        onPressTitle: _propTypes2.default.func,
        backgroundColor: _propTypes2.default.string
    };
    NavigationBar.defaultProps = {
        type: TYPE.LIGHT,
        left: [],
        right: []
    };
    NavigationBar.TYPE = TYPE;
    NavigationBar.ICON = ICON;
    exports.default = NavigationBar;

    var styles = _reactNative.StyleSheet.create({
        container: {
            width: width,
            paddingHorizontal: paddingHorizontal,
            flexDirection: 'row',
            alignItems: 'center'
        },
        titleContainer: {
            flex: 1,
            alignSelf: 'stretch',
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 5
        },
        title: {
            fontSize: 16,
            fontFamily: 'PingFang-SC-Regular',
            textAlignVertical: 'center',
            textAlign: 'center'
        },
        subtitle: {
            fontSize: 12,
            lineHeight: 17,
            fontFamily: 'MI-LANTING--GBK1-Light',
            textAlignVertical: 'center',
            textAlign: 'center'
        },
        icon: {
            position: 'absolute',
            width: iconSize,
            height: iconSize
        },
        dot: {
            width: iconSize,
            height: iconSize
        }
    });
},10067,[10046,10297,10033,10918,10308,10200],"projects/com.dmaker.water_purifier/Main/views/mi/NavigationBar.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.toastTextStyle = exports.okButtonOpacity = undefined;

    var _reactNative = _require(_dependencyMap[0]);

    var _miot = _require(_dependencyMap[1]);

    var _FontSizeConstant = _require(_dependencyMap[2]);

    var _FontSizeConstant2 = babelHelpers.interopRequireDefault(_FontSizeConstant);

    var _MHGlobalData = _require(_dependencyMap[3]);

    var _index = _require(_dependencyMap[4]);

    var okButtonOpacity = exports.okButtonOpacity = 0.85;
    exports.default = MHStyle = _reactNative.StyleSheet.create({
        androidLightFont: _miot.Host.isAndroid ? {
            fontFamily: _FontSizeConstant2.default.FontFamilyOfMiLight
        } : {},
        androidDinFont: _miot.Host.isAndroid ? {
            fontFamily: _FontSizeConstant2.default.FontFamilyOfDin
        } : {},
        verticalSeparator: {
            width: 1,
            backgroundColor: _index.Styles.common.hairlineColor,
            alignSelf: 'stretch',
            marginTop: (0, _MHGlobalData.getHeightSize)(1),
            marginBottom: (0, _MHGlobalData.getHeightSize)(1)
        },
        arrowRightSize: {
            width: (0, _MHGlobalData.getWidthSize)(28),
            height: (0, _MHGlobalData.getWidthSize)(28)
        },
        toastTextStyle: _reactNative.StyleSheet.flatten([_miot.Host.isAndroid ? {
            fontFamily: _FontSizeConstant2.default.FontFamilyOfMiLight
        } : {}, {
            color: '#ffffff'
        }])
    });
    var toastTextStyle = exports.toastTextStyle = [_miot.Host.isAndroid ? {
        fontFamily: _FontSizeConstant2.default.FontFamilyOfMiLight
    } : {}, {
        color: '#ffffff'
    }];
},10070,[10033,10074,10040,10010,10077],"projects/com.dmaker.water_purifier/resources/styles/Style.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var _propTypes = _require(_dependencyMap[2]);

    var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

    var _Card = _require(_dependencyMap[3]);

    var _Card2 = babelHelpers.interopRequireDefault(_Card);

    var _String = _require(_dependencyMap[4]);

    var _MHGlobalData = _require(_dependencyMap[5]);

    var _ARTViews = _require(_dependencyMap[6]);

    var _FontSizeConstant = _require(_dependencyMap[7]);

    var _OtherConstant = _require(_dependencyMap[8]);

    var _OtherConstant2 = babelHelpers.interopRequireDefault(_OtherConstant);

    var _Dimensions$get = _reactNative.Dimensions.get('window'),
        width = _Dimensions$get.width;

    var AnimatedARTCircle = _reactNative.Animated.createAnimatedComponent(_ARTViews.ARTCircle);

    var containerH = (0, _MHGlobalData.getHeightSize)(110);

    var ModelView = function (_React$Component) {
        babelHelpers.inherits(ModelView, _React$Component);

        function ModelView(props, context) {
            babelHelpers.classCallCheck(this, ModelView);

            var _this = babelHelpers.possibleConstructorReturn(this, (ModelView.__proto__ || Object.getPrototypeOf(ModelView)).call(this, props, context));

            _this.createModes();

            _this.state = {
                modeIndex: _this.props.modeIndex
            };
            _this.colorAnimated = new _reactNative.Animated.Value(0);
            _this.reverse = false;
            _this.lastStartTheme = _this.props.themeColor;
            _this.lastEndTheme = _this.lastStartTheme;
            return _this;
        }

        babelHelpers.createClass(ModelView, [{
            key: "componentWillReceiveProps",
            value: function componentWillReceiveProps(nextProps) {
                var newState = {};

                if (nextProps.modeIndex !== this.state.modeIndex) {
                    newState = babelHelpers.extends({}, newState, {
                        modeIndex: nextProps.modeIndex
                    });
                }

                if (Object.keys(newState).length > 0) {
                    this.setState(newState);
                }

                var startThemeColor = this.props.themeColor,
                    endThemeColor = nextProps.themeColor;

                if (this.lastStartTheme !== startThemeColor || this.lastEndTheme !== endThemeColor) {
                    var outputRange = this.reverse ? [endThemeColor, startThemeColor] : [startThemeColor, endThemeColor];
                    this.themeColorIp = this.colorAnimated.interpolate({
                        inputRange: [0, 1],
                        outputRange: outputRange
                    });
                    this.lastStartTheme = startThemeColor;
                    this.lastEndTheme = endThemeColor;
                }
            }
        }, {
            key: "componentDidUpdate",
            value: function componentDidUpdate(prevProps) {
                if (this.props.themeColor !== prevProps.themeColor) {
                    var toValue = this.reverse ? 0 : 1;
                    this.reverse = !this.reverse;

                    _reactNative.Animated.timing(this.colorAnimated, {
                        toValue: toValue,
                        duration: this.props.duration
                    }).start();
                }
            }
        }, {
            key: "render",
            value: function render() {
                var _props = this.props,
                    showShadow = _props.showShadow,
                    modeCardStyle = _props.modeCardStyle;
                var defaultCardStyle = {
                    marginTop: 0,
                    width: width - 40,
                    borderRadius: 10
                };
                var mixCardStyle = babelHelpers.extends({}, defaultCardStyle, modeCardStyle, {
                    height: this.props.containerHeight
                });
                return _react2.default.createElement(_Card2.default, {
                    showShadow: showShadow,
                    disabled: false,
                    innerView: this.renderModeCard(),
                    cardStyle: mixCardStyle
                });
            }
        }, {
            key: "renderModeCard",
            value: function renderModeCard() {
                var paddingBottom = 24;
                var opacity = this.props.disabled ? 0.3 : 1.0;
                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: {
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginHorizontal: (0, _MHGlobalData.getWidthSize)(20),
                            height: this.props.containerHeight,
                            opacity: opacity
                        }
                    },
                    this.renderModes()
                );
            }
        }, {
            key: "renderModes",
            value: function renderModes() {
                var _this2 = this;

                var _props2 = this.props,
                    themeColor = _props2.themeColor,
                    disabled = _props2.disabled;
                var animatedColor = this.themeColorIp || themeColor;
                return this.modes.map(function (mode, index) {
                    var isDisabled = mode.isDisabled,
                        icon = mode.icon,
                        description = mode.description,
                        isPressing = mode.isPressing;
                    var iconSource = void 0,
                        descriptionStyle = {},
                        circleStyle = void 0;
                    circleStyle = {
                        stroke: 'rgba(170, 171, 181, 1.0)',
                        strokeWidth: 1
                    };

                    var modeIndex = _this2.getRealModeIndex();

                    if (index === modeIndex) {
                        if (disabled) {
                            circleStyle = {
                                fill: 'rgba(197, 201, 203, 0.3)'
                            };
                            iconSource = icon.normal;
                        } else {
                            iconSource = icon.active;
                            circleStyle = {
                                fill: animatedColor
                            };
                        }
                    } else if (isPressing) {
                        iconSource = icon.press;
                        circleStyle = {
                            fill: 'rgba(0, 0, 0, 0.1)'
                        };
                    } else {
                        iconSource = icon.normal;
                    }

                    var itemWH = Math.ceil((0, _MHGlobalData.getWidthSize)(52));
                    return _react2.default.createElement(
                        _reactNative.TouchableWithoutFeedback,
                        {
                            key: index,
                            onPressIn: function onPressIn() {
                                _this2.pressInOutMode(index, true);
                            },
                            onPressOut: function onPressOut() {
                                _this2.pressInOutMode(index, false);
                            },
                            onPress: function onPress() {
                                _this2.pressMode(index);
                            },
                            disabled: _this2.props.disabled || isDisabled
                        },
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: [{
                                    alignItems: 'center',
                                    flex: 1
                                }]
                            },
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: {
                                        width: itemWH,
                                        height: itemWH,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }
                                },
                                _react2.default.createElement(AnimatedARTCircle, babelHelpers.extends({
                                    style: {
                                        width: itemWH,
                                        height: itemWH
                                    },
                                    radius: itemWH / 2
                                }, circleStyle)),
                                _react2.default.createElement(_reactNative.Image, {
                                    style: [{
                                        position: 'absolute',
                                        width: (0, _MHGlobalData.getWidthSize)(30),
                                        height: (0, _MHGlobalData.getWidthSize)(30)
                                    }],
                                    resizeMode: "contain",
                                    source: iconSource
                                })
                            ),
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: {
                                        flexDirection: "row",
                                        alignItems: 'center',
                                        marginHorizontal: 5
                                    }
                                },
                                _react2.default.createElement(
                                    _reactNative.Animated.Text,
                                    {
                                        style: [styles.description, descriptionStyle, {
                                            flex: 1
                                        }],
                                        numberOfLines: 1,
                                        ellipsizeMode: "tail"
                                    },
                                    description
                                )
                            )
                        )
                    );
                });
            }
        }, {
            key: "pressInOutMode",
            value: function pressInOutMode(pressIndex, pressing) {
                this.modes.forEach(function (value, index) {
                    value['isPressing'] = pressing ? index === pressIndex : false;
                });
                this.setState({});
            }
        }, {
            key: "pressMode",
            value: function pressMode(pressIndex) {
                var modeIndex = this.getModeIndex(pressIndex);

                if (this.props.enableCallback && this.props.enableCallback('mode')) {
                    this.props.onModeChange && this.props.onModeChange(modeIndex);
                }
            }
        }, {
            key: "getRealModeIndex",
            value: function getRealModeIndex() {
                var index = this.state.modeIndex;

                if (2 <= index) {
                    if (index <= 4) {
                        index = 2;
                    } else {
                        index = 3;
                    }
                }

                return index;
            }
        }, {
            key: "getModeIndex",
            value: function getModeIndex(index) {
                var gear = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _OtherConstant2.default.defaultGear;
                var modeIndex = index;

                if (modeIndex < 2) {
                    gear = 0;
                } else if (modeIndex > 2) {
                    gear = 2;
                }

                return modeIndex + gear;
            }
        }, {
            key: "createModes",
            value: function createModes() {
                this.modes = [{
                    description: (0, _String.getString)('waterSaving'),
                    icon: {
                        normal: _require(_dependencyMap[9]),
                        active: _require(_dependencyMap[10]),
                        press: _require(_dependencyMap[10])
                    },
                    isDisabled: false,
                    isPressing: false
                }, {
                    description: (0, _String.getString)('stamina'),
                    icon: {
                        normal: _require(_dependencyMap[11]),
                        active: _require(_dependencyMap[12]),
                        press: _require(_dependencyMap[12])
                    },
                    isDisabled: false,
                    isPressing: false
                }, {
                    description: (0, _String.getString)('intelligent'),
                    icon: {
                        normal: _require(_dependencyMap[13]),
                        active: _require(_dependencyMap[14]),
                        press: _require(_dependencyMap[14])
                    },
                    isDisabled: false,
                    isPressing: false
                }];
            }
        }]);
        return ModelView;
    }(_react2.default.Component);

    ModelView.propTypes = {
        onModeChange: _propTypes2.default.func,
        containerHeight: _propTypes2.default.number,
        enableCallback: _propTypes2.default.func
    };
    ModelView.defaultProps = {
        duration: 1200,
        containerHeight: containerH
    };
    exports.default = ModelView;

    var styles = _reactNative.StyleSheet.create({
        description: {
            fontSize: (0, _FontSizeConstant.setSpText)(13),
            color: '#2A344C',
            marginTop: (0, _MHGlobalData.getWidthSize)(10),
            textAlign: 'center'
        },
        title: {
            color: '#000000',
            fontSize: (0, _FontSizeConstant.setSpText)(14)
        },
        subtitle: {
            color: '#7f7f7f',
            fontSize: (0, _FontSizeConstant.setSpText)(12)
        }
    });
},10073,[10297,10033,10046,10055,10013,10010,10076,10040,10034,10079,10082,10085,10088,10091,10094],"projects/com.dmaker.water_purifier/Main/views/ModelView.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ARTCircle = exports.Circle = undefined;

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var Shape = _reactNative.ART.Shape,
        Path = _reactNative.ART.Path,
        Surface = _reactNative.ART.Surface;

    var Circle = exports.Circle = function (_React$Component) {
        babelHelpers.inherits(Circle, _React$Component);

        function Circle() {
            babelHelpers.classCallCheck(this, Circle);
            return babelHelpers.possibleConstructorReturn(this, (Circle.__proto__ || Object.getPrototypeOf(Circle)).apply(this, arguments));
        }

        babelHelpers.createClass(Circle, [{
            key: "render",
            value: function render() {
                var _props = this.props,
                    radius = _props.radius,
                    strokeWidth = _props.strokeWidth;
                var cRadius = radius;

                if (strokeWidth) {
                    cRadius -= strokeWidth;
                }

                var path = Path().moveTo(0, -cRadius).arc(0, cRadius * 2, cRadius, cRadius).arc(0, cRadius * -2, cRadius, cRadius).close();
                return _react2.default.createElement(Shape, babelHelpers.extends({}, this.props, {
                    d: path
                }));
            }
        }]);
        return Circle;
    }(_react2.default.Component);

    var ARTCircle = exports.ARTCircle = function (_React$Component2) {
        babelHelpers.inherits(ARTCircle, _React$Component2);

        function ARTCircle() {
            babelHelpers.classCallCheck(this, ARTCircle);
            return babelHelpers.possibleConstructorReturn(this, (ARTCircle.__proto__ || Object.getPrototypeOf(ARTCircle)).apply(this, arguments));
        }

        babelHelpers.createClass(ARTCircle, [{
            key: "render",
            value: function render() {
                var _props2 = this.props,
                    style = _props2.style,
                    marginLeft = _props2.marginLeft,
                    marginRight = _props2.marginRight,
                    marginTop = _props2.marginTop,
                    marginBottom = _props2.marginBottom,
                    others = babelHelpers.objectWithoutProperties(_props2, ["style", "marginLeft", "marginRight", "marginTop", "marginBottom"]);
                var width = style && style.width || 0;
                var height = style && style.height || 0;
                var x = width / 2,
                    y = height / 2;
                x += marginLeft;
                x -= marginRight;
                y += marginTop;
                y -= marginBottom;
                return _react2.default.createElement(
                    Surface,
                    {
                        style: style,
                        width: width,
                        height: height
                    },
                    _react2.default.createElement(Circle, babelHelpers.extends({}, others, {
                        x: x,
                        y: y
                    }))
                );
            }
        }]);
        return ARTCircle;
    }(_react2.default.Component);

    ARTCircle.defaultProps = {
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0
    };
},10076,[10297,10033],"projects/com.dmaker.water_purifier/Main/views/ARTViews.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.dmaker.water_purifier/resources/img",
    "width": 105,
    "height": 105,
    "scales": [1],
    "hash": "7efe367703520e0ec4511b1425549f39",
    "name": "icon_water_saving_nor",
    "type": "png"
  });
},10079,[10420],"projects/com.dmaker.water_purifier/resources/img/icon_water_saving_nor.png");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.dmaker.water_purifier/resources/img",
    "width": 105,
    "height": 105,
    "scales": [1],
    "hash": "ce3a23a7e5fa7bd978c04342974c66fa",
    "name": "icon_water_saving_sel",
    "type": "png"
  });
},10082,[10420],"projects/com.dmaker.water_purifier/resources/img/icon_water_saving_sel.png");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.dmaker.water_purifier/resources/img",
    "width": 102,
    "height": 102,
    "scales": [1],
    "hash": "2934e9f707c12f8e7da94895ad86d61f",
    "name": "icon_stamina_nor",
    "type": "png"
  });
},10085,[10420],"projects/com.dmaker.water_purifier/resources/img/icon_stamina_nor.png");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.dmaker.water_purifier/resources/img",
    "width": 102,
    "height": 102,
    "scales": [1],
    "hash": "34a9c7df9376af327fd27368e01ca3f0",
    "name": "icon_stamina_sel",
    "type": "png"
  });
},10088,[10420],"projects/com.dmaker.water_purifier/resources/img/icon_stamina_sel.png");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.dmaker.water_purifier/resources/img",
    "width": 102,
    "height": 102,
    "scales": [1],
    "hash": "90835e128afce0dfb3d7f3a94599f0c4",
    "name": "icon_intelligent_nor",
    "type": "png"
  });
},10091,[10420],"projects/com.dmaker.water_purifier/resources/img/icon_intelligent_nor.png");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.dmaker.water_purifier/resources/img",
    "width": 102,
    "height": 102,
    "scales": [1],
    "hash": "1a8c1cb37bb426a2db2596ad5baf8ee7",
    "name": "icon_intelligent_sel",
    "type": "png"
  });
},10094,[10420],"projects/com.dmaker.water_purifier/resources/img/icon_intelligent_sel.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.setProps = exports.props = exports.Spec = exports.SpecMap = exports.SpecList = undefined;

    var _miot = _require(_dependencyMap[0]);

    var _MHGlobalData = _require(_dependencyMap[1]);

    var _RpcManage = _require(_dependencyMap[2]);

    var _RpcManage2 = babelHelpers.interopRequireDefault(_RpcManage);

    var maxPropsSize = 16;
    var requestTimeout = 500;
    var props = ['power', 'mode', 'status', 'tds_in', 'tds_out', 'ro_filter_rate', 'ro_filter_day', 'ppc_filter_rate', 'ppc_filter_day'];
    var setProps = ['power', 'mode'];

    var Spec = function () {
        function Spec(siid, piid) {
            babelHelpers.classCallCheck(this, Spec);
            this.did = _miot.Device.deviceID;
            this.siid = siid;
            this.piid = piid;
        }

        babelHelpers.createClass(Spec, [{
            key: "getSpecProp",
            value: function getSpecProp() {
                return "prop." + this.siid + "." + this.piid;
            }
        }, {
            key: "equals",
            value: function equals(obj) {
                if (!obj) {
                    return false;
                }

                return this.did === obj.did && this.siid === obj.siid && this.piid === obj.piid;
            }
        }], [{
            key: "createSpec",
            value: function createSpec(siid, piid) {
                return new Spec(siid, piid);
            }
        }]);
        return Spec;
    }();

    var SpecList = {
        power: Spec.createSpec(2, 2),
        status: Spec.createSpec(2, 3),
        mode: Spec.createSpec(2, 4),
        tds_in: Spec.createSpec(4, 1),
        tds_out: Spec.createSpec(4, 2),
        ro_filter_rate: Spec.createSpec(7, 1),
        ro_filter_day: Spec.createSpec(7, 3),
        ppc_filter_rate: Spec.createSpec(7, 2),
        ppc_filter_day: Spec.createSpec(7, 4)
    };
    var SpecMap = new Map();
    Object.entries(SpecList).forEach(function (_ref) {
        var _ref2 = babelHelpers.slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        SpecMap.set("prop." + value.siid + "." + value.piid, key);
    });
    exports.SpecList = SpecList;
    exports.SpecMap = SpecMap;
    exports.Spec = Spec;
    exports.props = props;
    exports.setProps = setProps;

    var SpecHelp = function () {
        function SpecHelp(props) {
            babelHelpers.classCallCheck(this, SpecHelp);
            this.props = props;
            var requestCount = Math.ceil(props.length / maxPropsSize);
            this.requestPropsCountArray = new Array(requestCount).fill(3);
            this.timeoutArray = [];
        }

        babelHelpers.createClass(SpecHelp, [{
            key: "getProps",
            value: function getProps(callback) {
                var _this = this;

                if (!_miot.Device.isOnline || !this.props) {
                    return;
                }

                var getDeviceProps = function getDeviceProps(someProps, requestArray, index) {
                    SpecHelp.getProps(someProps).then(function (res) {
                        (0, _MHGlobalData.print)('get props result: ', res);
                        requestArray[index] = 0;
                        callback && callback(res);
                    }).catch(function (err) {
                        if (requestArray[index] > 0) {
                            requestArray[index]--;

                            _RpcManage2.default.getInstance().rpcRequest('get_properties', someProps, function () {
                                getDeviceProps(someProps, requestArray, index);
                            }, true);
                        }
                    });
                };

                var _loop = function _loop(i) {
                    var someProps = _this.props.slice(i * maxPropsSize, i * maxPropsSize + maxPropsSize);

                    if (i === 0) {
                        _RpcManage2.default.getInstance().rpcRequest('get_properties', someProps, function () {
                            getDeviceProps(someProps, _this.requestPropsCountArray, i);
                        });
                    } else {
                        _this.timeoutArray.push(setTimeout(function () {
                            _RpcManage2.default.getInstance().rpcRequest('get_properties', someProps, function () {
                                getDeviceProps(someProps, _this.requestPropsCountArray, i);
                            });
                        }, i * requestTimeout));
                    }
                };

                for (var i = 0; i < this.requestPropsCountArray.length; i++) {
                    _loop(i);
                }
            }
        }, {
            key: "unMount",
            value: function unMount() {
                if (this.timeoutArray) {
                    for (var _iterator = this.timeoutArray, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
                        var _ref3;

                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref3 = _iterator[_i++];
                        } else {
                            _i = _iterator.next();
                            if (_i.done) break;
                            _ref3 = _i.value;
                        }

                        var timeout = _ref3;
                        clearTimeout(timeout);
                    }
                }
            }
        }], [{
            key: "alertError",
            value: function alertError(err) {
                (0, _MHGlobalData.print)("rpc request error:", err);

                if (err.hasOwnProperty("error")) {
                    var code = void 0;

                    if (_miot.Host.isAndroid) {
                        code = err.error;
                    } else {
                        code = err.error.code;
                    }

                    if (code === -12 || code === -97) {
                        alert("发现了RPC限流错误：" + JSON.stringify(err));
                    }
                }
            }
        }, {
            key: "getProps",
            value: function getProps(props) {
                return _miot.Device.getDeviceWifi().callMethod('get_properties', props.map(function (prop) {
                    return SpecList[prop];
                })).then(function (res) {
                    var propsMap = new Map();

                    if (res.hasOwnProperty('result')) {
                        var result = res['result'];

                        for (var i = 0; i < result.length; i++) {
                            var _result$i = result[i],
                                code = _result$i.code,
                                value = _result$i.value;

                            if (code === 0) {
                                var key = props[i];
                                var spec = SpecList[key];

                                if (spec.equals(result[i])) {
                                    propsMap.set(key, value);
                                }
                            }
                        }
                    }

                    return propsMap;
                });
            }
        }, {
            key: "subscribeMessages",
            value: function subscribeMessages() {
                var _Device$getDeviceWifi;

                return (_Device$getDeviceWifi = _miot.Device.getDeviceWifi()).subscribeMessages.apply(_Device$getDeviceWifi, babelHelpers.toConsumableArray(SpecHelp.getSpecProps()));
            }
        }, {
            key: "getSpecProps",
            value: function getSpecProps() {
                return Object.values(SpecList).map(function (spec) {
                    return spec.getSpecProp();
                });
            }
        }, {
            key: "getSubscribeMap",
            value: function getSubscribeMap(messages) {
                var subscribeMap = new Map();

                for (var _iterator2 = messages, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
                    var _ref6;

                    if (_isArray2) {
                        if (_i2 >= _iterator2.length) break;
                        _ref6 = _iterator2[_i2++];
                    } else {
                        _i2 = _iterator2.next();
                        if (_i2.done) break;
                        _ref6 = _i2.value;
                    }

                    var _ref4 = _ref6;

                    var _ref5 = babelHelpers.slicedToArray(_ref4, 2);

                    var key = _ref5[0];
                    var value = _ref5[1];

                    if (SpecMap.has(key)) {
                        if (Array.isArray(value)) {
                            value = value[0];
                        }

                        subscribeMap.set(SpecMap.get(key), value);
                    }
                }

                return subscribeMap;
            }
        }, {
            key: "setPower",
            value: function setPower(power) {
                var params = SpecHelp.getPropertiesParams('power', power);
                return SpecHelp.setPropertiesValue(params);
            }
        }, {
            key: "setMode",
            value: function setMode(mode) {
                var params = SpecHelp.getPropertiesParams('mode', mode);
                return SpecHelp.setPropertiesValue(params);
            }
        }, {
            key: "getPropertiesParams",
            value: function getPropertiesParams(key, value) {
                (0, _MHGlobalData.print)("set props key: " + key + ", value: " + value);
                return babelHelpers.extends({}, SpecList[key], {
                    value: value
                });
            }
        }, {
            key: "setPropertiesValue",
            value: function setPropertiesValue(params) {
                return _miot.Service.spec.setPropertiesValue([params]).then(function (res) {
                    return new Promise(function (resolve, reject) {
                        var result = res[0];

                        if (result.code === 0) {
                            resolve(result);
                        } else {
                            reject(result);
                        }
                    });
                });
            }
        }]);
        return SpecHelp;
    }();

    exports.default = SpecHelp;
},10097,[10074,10010,10100],"projects/com.dmaker.water_purifier/Main/utils/SpecHelp.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _miot = _require(_dependencyMap[0]);

    var req_delay = 1300;

    var RpcManage = function () {
        function RpcManage() {
            babelHelpers.classCallCheck(this, RpcManage);
            this.requestMap = new Map();
        }

        babelHelpers.createClass(RpcManage, [{
            key: "rpcRequest",
            value: function rpcRequest(method, params, func) {
                var delay = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
                var key = this.concat(_miot.Device.deviceID, method, params);
                var request = void 0;

                if (this.requestMap.has(key)) {
                    request = this.requestMap.get(key);
                } else {
                    request = {
                        time: 0
                    };
                    this.requestMap.set(key, request);
                }

                var overSecond = Date.now() - request.time > req_delay;

                if (overSecond) {
                    request.time = Date.now();
                    func();
                } else {
                    if (!delay) return false;

                    if (!request.queue) {
                        request.queue = new Queue();
                    }

                    request.queue.add(timeout(func));
                    request.queue.run();
                    request.time += req_delay;
                }

                return true;
            }
        }, {
            key: "concat",
            value: function concat(did, method, params) {
                return did + "_" + method + "_" + params;
            }
        }, {
            key: "destroy",
            value: function destroy() {
                this.requestMap.forEach(function (value) {
                    if (value.queue) {
                        value.queue.stop();
                    }
                });
            }
        }], [{
            key: "getInstance",
            value: function getInstance() {
                if (!this._instance) {
                    this._instance = new RpcManage();
                }

                return this._instance;
            }
        }]);
        return RpcManage;
    }();

    exports.default = RpcManage;

    var Queue = function Queue() {
        var _this = this;

        babelHelpers.classCallCheck(this, Queue);

        this.next = function () {
            if (_this.index > _this.list.length - 1 || !_this.running) {
                _this.stop();

                return;
            }

            var cur = _this.list[_this.index++];
            cur(_this.next);
        };

        this.add = function () {
            var _list;

            (_list = _this.list).push.apply(_list, arguments);
        };

        this.run = function () {
            if (!_this.running) {
                _this.running = true;
                var cur = _this.list[_this.index++];
                typeof cur === 'function' && cur(_this.next);
            }
        };

        this.stop = function () {
            _this.running = false;
        };

        this.list = [];
        this.index = 0;
        this.running = false;
    };

    var timeout = function timeout(fn) {
        return function (next) {
            setTimeout(function () {
                fn();
                next();
            }, req_delay);
        };
    };
},10100,[10074],"projects/com.dmaker.water_purifier/Main/utils/RpcManage.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var Shape = _reactNative.ART.Shape,
        Path = _reactNative.ART.Path,
        Surface = _reactNative.ART.Surface,
        LinearGradient = _reactNative.ART.LinearGradient;

    var WaveView = function (_React$Component) {
        babelHelpers.inherits(WaveView, _React$Component);

        function WaveView(props) {
            babelHelpers.classCallCheck(this, WaveView);

            var _this = babelHelpers.possibleConstructorReturn(this, (WaveView.__proto__ || Object.getPrototypeOf(WaveView)).call(this, props));

            _this.surfaceWidth = _this.props.surfaceWidth;
            _this.surfaceHeigth = _this.props.surfaceHeigth;
            _this.state = {
                a: 1.5,
                b: 0,
                increase: false
            };
            return _this;
        }

        babelHelpers.createClass(WaveView, [{
            key: "componentDidMount",
            value: function componentDidMount() {
                var _this2 = this;

                this.intervalTimer = setInterval(function () {
                    var a = _this2.state.a;
                    var b = _this2.state.b;
                    var increase = _this2.state.increase;

                    if (increase) {
                        a += 0.01;
                    } else {
                        a -= 0.01;
                    }

                    if (a <= 1) {
                        increase = true;
                    }

                    if (a >= 1.5) {
                        increase = false;
                    }

                    b += 0.1;

                    _this2.setState({
                        a: a,
                        b: b,
                        increase: increase
                    });
                }, 50);
            }
        }, {
            key: "componentWillUnmount",
            value: function componentWillUnmount() {
                this.intervalTimer && clearInterval(this.intervalTimer);
            }
        }, {
            key: "artBg",
            value: function artBg() {
                var w = this.props.surfaceWidth;
                var h = this.props.surfaceHeigth;
                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: {
                            backgroundColor: 'transparent'
                        }
                    },
                    _react2.default.createElement(
                        Surface,
                        {
                            width: this.surfaceWidth,
                            height: this.surfaceHeigth
                        },
                        this.wave(15, 'rgba(71, 215, 236, 0.3)'),
                        this.wave1(18, 'rgba(71, 215, 236, 0.6)'),
                        this.wave2(35, 'rgba(71, 215, 236, 1.0)')
                    )
                );
            }
        }, {
            key: "wave",
            value: function wave(startY, fl) {
                var a = this.state.a;
                var b = this.state.b;
                var w = this.props.surfaceWidth;
                var h = this.props.surfaceHeigth;
                var pathBase = new Path();
                pathBase.moveTo(0, startY);

                for (var i = 0; i <= w / 68; i += 0.1) {
                    var x = i * 70;
                    var y = a * Math.cos(i + b) * 10 + startY;
                    pathBase.lineTo(x, y);
                }

                pathBase.lineTo(w, h);
                pathBase.lineTo(0, h);
                pathBase.close();
                return _react2.default.createElement(Shape, {
                    d: pathBase,
                    fill: fl
                });
            }
        }, {
            key: "wave1",
            value: function wave1(startY, fl) {
                var a = this.state.a;
                var b = this.state.b;
                var w = this.props.surfaceWidth;
                var h = this.props.surfaceHeigth;
                var pathBase = new Path();
                pathBase.moveTo(0, startY);

                for (var i = 0; i <= w / 68; i += 0.1) {
                    var x = i * 70;
                    var y = a * Math.sin(i + b) * 8 + startY;
                    pathBase.lineTo(x, y);
                }

                pathBase.lineTo(w, h);
                pathBase.lineTo(0, h);
                pathBase.close();
                return _react2.default.createElement(Shape, {
                    d: pathBase,
                    fill: fl
                });
            }
        }, {
            key: "wave2",
            value: function wave2(startY, fl) {
                var a = this.state.a;
                var b = this.state.b;
                var w = this.props.surfaceWidth;
                var h = this.props.surfaceHeigth;
                var pathBase = new Path();
                pathBase.moveTo(0, startY);

                for (var i = 0; i <= w / 98; i += 0.1) {
                    var x = i * 100;
                    var y = a * Math.sin(i + b) * 6 + startY;
                    pathBase.lineTo(x, y);
                }

                pathBase.lineTo(w, h);
                pathBase.lineTo(0, h);
                pathBase.close();
                return _react2.default.createElement(Shape, {
                    d: pathBase,
                    fill: fl
                });
            }
        }, {
            key: "render",
            value: function render() {
                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: {
                            width: this.props.surfaceWidth,
                            height: this.props.surfaceHeigth,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }
                    },
                    this.artBg()
                );
            }
        }]);
        return WaveView;
    }(_react2.default.Component);

    WaveView.defaultProps = {
        surfaceWidth: 200,
        surfaceHeigth: 189
    };
    exports.default = WaveView;
},10103,[10297,10033],"projects/com.dmaker.water_purifier/Main/views/WaveView.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var RequestHelp = function () {
        function RequestHelp(props) {
            babelHelpers.classCallCheck(this, RequestHelp);
            this.requestAble = {};

            for (var i = 0; i < props.length; i++) {
                this.requestAble[props[i]] = true;
            }
        }

        babelHelpers.createClass(RequestHelp, [{
            key: "setEnabled",
            value: function setEnabled(prop, enable) {
                if (this.checkProp(prop)) {
                    this.requestAble[prop] = enable;
                }
            }
        }, {
            key: "isEnabled",
            value: function isEnabled(prop) {
                if (this.checkProp(prop)) {
                    return this.requestAble[prop];
                }

                return false;
            }
        }, {
            key: "checkProp",
            value: function checkProp(prop) {
                return this.requestAble.hasOwnProperty(prop);
            }
        }]);
        return RequestHelp;
    }();

    exports.default = RequestHelp;
},10106,[],"projects/com.dmaker.water_purifier/Main/utils/RequestHelp.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.DURATION = undefined;

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var _propTypes = _require(_dependencyMap[2]);

    var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

    var ViewPropTypes = _reactNative.ViewPropTypes || _reactNative.View.propTypes;
    var DURATION = exports.DURATION = {
        LENGTH_SHORT: 500,
        FOREVER: 0
    };

    var _Dimensions$get = _reactNative.Dimensions.get('window'),
        height = _Dimensions$get.height,
        width = _Dimensions$get.width;

    var Toast = function (_Component) {
        babelHelpers.inherits(Toast, _Component);

        function Toast(props) {
            babelHelpers.classCallCheck(this, Toast);

            var _this = babelHelpers.possibleConstructorReturn(this, (Toast.__proto__ || Object.getPrototypeOf(Toast)).call(this, props));

            _this.state = {
                isShow: false,
                text: '',
                opacityValue: new _reactNative.Animated.Value(_this.props.opacity)
            };
            return _this;
        }

        babelHelpers.createClass(Toast, [{
            key: "show",
            value: function show(text, duration, callback) {
                var _this2 = this;

                this.duration = typeof duration === 'number' ? duration : DURATION.LENGTH_SHORT;
                this.callback = callback;
                this.setState({
                    isShow: true,
                    text: text
                });
                this.animation = _reactNative.Animated.timing(this.state.opacityValue, {
                    toValue: this.props.opacity,
                    duration: this.props.fadeInDuration
                });
                this.animation.start(function () {
                    _this2.isShow = true;
                    if (duration !== DURATION.FOREVER) _this2.close();
                });
            }
        }, {
            key: "close",
            value: function close(duration) {
                var _this3 = this;

                var delay = typeof duration === 'undefined' ? this.duration : duration;
                if (delay === DURATION.FOREVER) delay = this.props.defaultCloseDelay || 250;
                if (!this.isShow && !this.state.isShow) return;
                this.timer && clearTimeout(this.timer);
                this.timer = setTimeout(function () {
                    _this3.animation = _reactNative.Animated.timing(_this3.state.opacityValue, {
                        toValue: 0.0,
                        duration: _this3.props.fadeOutDuration
                    });

                    _this3.animation.start(function () {
                        _this3.setState({
                            isShow: false
                        });

                        _this3.isShow = false;

                        if (typeof _this3.callback === 'function') {
                            _this3.callback();
                        }
                    });
                }, delay);
            }
        }, {
            key: "componentWillUnmount",
            value: function componentWillUnmount() {
                this.animation && this.animation.stop();
                this.timer && clearTimeout(this.timer);
            }
        }, {
            key: "render",
            value: function render() {
                var pos = void 0;

                switch (this.props.position) {
                    case 'top':
                        pos = this.props.positionValue;
                        break;

                    case 'center':
                        pos = height / 2;
                        break;

                    case 'bottom':
                        pos = height - this.props.positionValue;
                        break;
                }

                var view = this.state.isShow ? _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: [styles.container, {
                            top: pos
                        }],
                        pointerEvents: "none"
                    },
                    _react2.default.createElement(
                        _reactNative.Animated.View,
                        {
                            style: [styles.content, {
                                opacity: this.state.opacityValue
                            }, this.props.style]
                        },
                        _react2.default.isValidElement(this.state.text) ? this.state.text : _react2.default.createElement(
                            _reactNative.Text,
                            {
                                style: this.props.textStyle
                            },
                            this.state.text
                        )
                    )
                ) : null;
                return view;
            }
        }]);
        return Toast;
    }(_react.Component);

    exports.default = Toast;

    var styles = _reactNative.StyleSheet.create({
        container: {
            position: 'absolute',
            left: 0,
            right: 0,
            elevation: 999,
            alignItems: 'center',
            zIndex: 10000
        },
        content: {
            backgroundColor: 'black',
            borderRadius: 5,
            padding: 10
        },
        text: {
            color: 'white'
        }
    });

    Toast.propTypes = {
        style: ViewPropTypes.style,
        position: _propTypes2.default.oneOf(['top', 'center', 'bottom']),
        textStyle: _reactNative.Text.propTypes.style,
        positionValue: _propTypes2.default.number,
        fadeInDuration: _propTypes2.default.number,
        fadeOutDuration: _propTypes2.default.number,
        opacity: _propTypes2.default.number
    };
    Toast.defaultProps = {
        position: 'bottom',
        textStyle: styles.text,
        positionValue: 120,
        fadeInDuration: 500,
        fadeOutDuration: 500,
        opacity: 1
    };
},10109,[10297,10033,10046],"projects/com.dmaker.water_purifier/node_modules/react-native-easy-toast/index.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.dmaker.water_purifier/resources/img",
    "width": 108,
    "height": 108,
    "scales": [1],
    "hash": "a9b2588ca60f9a06400936f9c6b566ee",
    "name": "icon_ppc",
    "type": "png"
  });
},10112,[10420],"projects/com.dmaker.water_purifier/resources/img/icon_ppc.png");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.dmaker.water_purifier/resources/img",
    "width": 108,
    "height": 108,
    "scales": [1],
    "hash": "c7e74b5711cc1400f072f63d05529ad5",
    "name": "icon_ro",
    "type": "png"
  });
},10115,[10420],"projects/com.dmaker.water_purifier/resources/img/icon_ro.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _resources = _require(_dependencyMap[0]);

    var _index = _require(_dependencyMap[1]);

    var _Separator = _require(_dependencyMap[2]);

    var _Separator2 = babelHelpers.interopRequireDefault(_Separator);

    var _react = _require(_dependencyMap[3]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[4]);

    var _String = _require(_dependencyMap[5]);

    var _index2 = _require(_dependencyMap[6]);

    var _MHGlobalData = _require(_dependencyMap[7]);

    var _MHGlobalData2 = babelHelpers.interopRequireDefault(_MHGlobalData);

    var _FontSizeConstant = _require(_dependencyMap[8]);

    var _FontSizeConstant2 = babelHelpers.interopRequireDefault(_FontSizeConstant);

    var _NavigationBar = _require(_dependencyMap[9]);

    var _NavigationBar2 = babelHelpers.interopRequireDefault(_NavigationBar);

    var first_options = _index.SETTING_KEYS.first_options,
        second_options = _index.SETTING_KEYS.second_options;

    var Setting = function (_React$Component) {
        babelHelpers.inherits(Setting, _React$Component);

        function Setting(props, context) {
            babelHelpers.classCallCheck(this, Setting);

            var _this = babelHelpers.possibleConstructorReturn(this, (Setting.__proto__ || Object.getPrototypeOf(Setting)).call(this, props, context));

            _this.hasNewFm = false;
            _this.state = {
                showDot: []
            };
            return _this;
        }

        babelHelpers.createClass(Setting, [{
            key: "render",
            value: function render() {
                var _this2 = this;

                var firstOptions = [first_options.SHARE, first_options.IFTTT, first_options.FIRMWARE_UPGRADE];
                var secondOptions = [];
                var extraOptions = {
                    showUpgrade: true,
                    licenseUrl: (0, _String.getString)('userAgreementUrl'),
                    policyUrl: (0, _String.getString)('privacyPolicyUrl')
                };
                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: styles.container
                    },
                    _react2.default.createElement(_NavigationBar2.default, {
                        backgroundColor: "transparent",
                        type: _NavigationBar2.default.TYPE.LIGHT,
                        left: [{
                            key: _NavigationBar2.default.ICON.BACK,
                            onPress: function onPress(_) {
                                return _this2.props.navigation.goBack();
                            }
                        }],
                        title: _resources.strings.setting
                    }),
                    _react2.default.createElement(_Separator2.default, null),
                    _react2.default.createElement(_reactNative.StatusBar, {
                        barStyle: "dark-content",
                        animated: true
                    }),
                    _react2.default.createElement(
                        _reactNative.ScrollView,
                        {
                            showsVerticalScrollIndicator: false
                        },
                        _react2.default.createElement(_index.CommonSetting, {
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
                );
            }
        }, {
            key: "componentDidMount",
            value: function componentDidMount() {
                this.mounted = true;

                this._checkUpdate();
            }
        }, {
            key: "componentWillMount",
            value: function componentWillMount() {
                var _this3 = this;

                this._packageDidResumeListener = _index2.PackageEvent.packageDidResume.addListener(function () {
                    var focused = _this3.props.navigation.isFocused();

                    if (_this3.mounted && focused) {
                        _this3._checkUpdate();
                    }
                });
            }
        }, {
            key: "componentWillUnmount",
            value: function componentWillUnmount() {
                this.mounted = false;
                this._packageDidResumeListener && this._packageDidResumeListener.remove();
            }
        }, {
            key: "_checkUpdate",
            value: function _checkUpdate() {
                var _this4 = this;

                _index2.Service.smarthome.checkDeviceVersion(_index2.Device.deviceID, '0').then(function (result) {
                    if (result) {
                        var hasNewFirmware = result['hasNewFirmware'];

                        if (hasNewFirmware !== _this4.hasNewFm) {
                            _this4.hasNewFm = hasNewFirmware;

                            _this4.setState({
                                showDot: hasNewFirmware ? [first_options.FIRMWARE_UPGRADE] : []
                            });
                        }
                    }
                }).catch(function (err) {
                    return print('check update failed:', err);
                });
            }
        }]);
        return Setting;
    }(_react2.default.Component);

    Setting.navigationOptions = function (_ref) {
        var navigation = _ref.navigation;
        return {
            header: null
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
        },
        titleStyle: {
            fontSize: _FontSizeConstant2.default.FontOf18,
            color: "#202121"
        }
    });
},10118,[10077,10353,10332,10297,10033,10013,10074,10010,10040,10719],"projects/com.dmaker.water_purifier/Main/pages/more/SettingPage.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var _miot = _require(_dependencyMap[2]);

    var _NavigationBar = _require(_dependencyMap[3]);

    var _NavigationBar2 = babelHelpers.interopRequireDefault(_NavigationBar);

    var _resources = _require(_dependencyMap[4]);

    var _Separator = _require(_dependencyMap[5]);

    var _Separator2 = babelHelpers.interopRequireDefault(_Separator);

    var TestPage = function (_React$Component) {
        babelHelpers.inherits(TestPage, _React$Component);

        function TestPage(props, context) {
            babelHelpers.classCallCheck(this, TestPage);
            return babelHelpers.possibleConstructorReturn(this, (TestPage.__proto__ || Object.getPrototypeOf(TestPage)).call(this, props, context));
        }

        babelHelpers.createClass(TestPage, [{
            key: "componentWillMount",
            value: function componentWillMount() {}
        }, {
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
                        style: styles.container
                    },
                    _react2.default.createElement(_NavigationBar2.default, {
                        backgroundColor: "blue",
                        type: _NavigationBar2.default.TYPE.LIGHT,
                        left: [{
                            key: _NavigationBar2.default.ICON.BACK,
                            onPress: function onPress(_) {
                                _miot.Package.exit();
                            }
                        }],
                        title: _resources.strings.setting
                    }),
                    _react2.default.createElement(_Separator2.default, null),
                    _react2.default.createElement(_reactNative.StatusBar, {
                        barStyle: "dark-content",
                        animated: true
                    })
                );
            }
        }]);
        return TestPage;
    }(_react2.default.Component);

    TestPage.navigationOptions = function (_ref) {
        var navigation = _ref.navigation;
        return {
            header: null
        };
    };

    exports.default = TestPage;

    var styles = _reactNative.StyleSheet.create({
        container: {
            backgroundColor: _resources.Styles.common.backgroundColor,
            flex: 1
        }
    });
},10121,[10297,10033,10074,10719,10077,10332],"projects/com.dmaker.water_purifier/Main/pages/demo/TestPage.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _resources = _require(_dependencyMap[0]);

    var _index = _require(_dependencyMap[1]);

    var _Separator = _require(_dependencyMap[2]);

    var _Separator2 = babelHelpers.interopRequireDefault(_Separator);

    var _react = _require(_dependencyMap[3]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[4]);

    var _String = _require(_dependencyMap[5]);

    var _index2 = _require(_dependencyMap[6]);

    var _MHGlobalData = _require(_dependencyMap[7]);

    var _MHGlobalData2 = babelHelpers.interopRequireDefault(_MHGlobalData);

    var _FontSizeConstant = _require(_dependencyMap[8]);

    var _FontSizeConstant2 = babelHelpers.interopRequireDefault(_FontSizeConstant);

    var _NavigationBar = _require(_dependencyMap[9]);

    var _NavigationBar2 = babelHelpers.interopRequireDefault(_NavigationBar);

    var _reactNativeUiKitten = _require(_dependencyMap[10]);

    var _Color = _require(_dependencyMap[11]);

    var _Color2 = babelHelpers.interopRequireDefault(_Color);

    var _ToolUtil = _require(_dependencyMap[12]);

    var _ToolUtil2 = babelHelpers.interopRequireDefault(_ToolUtil);

    var _OtherConstant = _require(_dependencyMap[13]);

    var _OtherConstant2 = babelHelpers.interopRequireDefault(_OtherConstant);

    var _SpecHelp = _require(_dependencyMap[14]);

    var _SpecHelp2 = babelHelpers.interopRequireDefault(_SpecHelp);

    var _StorageUtil = _require(_dependencyMap[15]);

    var _StorageUtil2 = babelHelpers.interopRequireDefault(_StorageUtil);

    var _CircleProgressView = _require(_dependencyMap[16]);

    var _CircleProgressView2 = babelHelpers.interopRequireDefault(_CircleProgressView);

    var _reactNativeEasyToast = _require(_dependencyMap[17]);

    var _reactNativeEasyToast2 = babelHelpers.interopRequireDefault(_reactNativeEasyToast);

    var _Style = _require(_dependencyMap[18]);

    var _Style2 = babelHelpers.interopRequireDefault(_Style);

    var regionArr = [0, 20, 100];
    var colorArr = [_Color2.default.ColorOfFF6849, _Color2.default.ColorOfFF6849, _Color2.default.DarkTextColor];
    var colorArray = [_Color2.default.ColorOfFF6849, _Color2.default.ColorOfFF6849, _Color2.default.ColorOfAEAEAE];
    var pageProps = ['filterLife', 'filterTime'];

    var CompositeFilterPage = function (_React$Component) {
        babelHelpers.inherits(CompositeFilterPage, _React$Component);

        function CompositeFilterPage(props, context) {
            babelHelpers.classCallCheck(this, CompositeFilterPage);

            var _this = babelHelpers.possibleConstructorReturn(this, (CompositeFilterPage.__proto__ || Object.getPrototypeOf(CompositeFilterPage)).call(this, props, context));

            _this.specHelp = new _SpecHelp2.default(pageProps);
            var params = _this.props.navigation.state.params || {};
            var filterLife = _OtherConstant2.default.defaultFilterLife;
            var filterTime = _OtherConstant2.default.defaultFilterTime;
            var filterType = _OtherConstant.FilterType.PPC;

            if (params.hasOwnProperty('filterLife')) {
                filterLife = params.filterLife;
            }

            if (params.hasOwnProperty('filterTime')) {
                filterTime = params.filterTime;
            }

            if (params.hasOwnProperty('filterType')) {
                filterType = params.filterType;
            }

            _this.state = {
                filterLife: filterLife,
                filterTime: filterTime,
                filterType: filterType
            };
            return _this;
        }

        babelHelpers.createClass(CompositeFilterPage, [{
            key: "render",
            value: function render() {
                var _this2 = this;

                var titleColor = this.getPercentColor(regionArr, colorArr, this.state.filterLife);
                var persentColor = this.getPercentColor(regionArr, colorArray, this.state.filterLife);
                var showTip = _ToolUtil2.default.toNumber(this.state.filterLife) <= 20 ? true : false;
                var filterSug = this.getFilterSuggestion();
                var textStyle = {
                    fontFamily: _FontSizeConstant2.default.FontFamilyOfMiLight,
                    textAlign: 'center',
                    paddingHorizontal: (0, _MHGlobalData.getWidthSize)(19)
                };
                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: styles.container
                    },
                    _react2.default.createElement(_NavigationBar2.default, {
                        backgroundColor: "transparent",
                        type: _NavigationBar2.default.TYPE.LIGHT,
                        left: [{
                            key: _NavigationBar2.default.ICON.BACK,
                            onPress: function onPress() {
                                return _this2.props.navigation.goBack();
                            }
                        }],
                        right: [{
                            key: _NavigationBar2.default.ICON.DETAIL,
                            showDot: showTip,
                            onPress: function onPress() {
                                _this2.props.navigation.navigate('InstructionPage', {
                                    filterType: _this2.state.filterType
                                });
                            }
                        }],
                        title: (0, _String.getString)(this.state.filterType.title)
                    }),
                    _react2.default.createElement(_reactNative.StatusBar, {
                        barStyle: "dark-content",
                        animated: true
                    }),
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: {
                                flex: 1,
                                flexDirection: 'column',
                                alignItems: 'center'
                            }
                        },
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: {
                                    marginTop: (0, _MHGlobalData.getHeightSize)(40)
                                }
                            },
                            _react2.default.createElement(_CircleProgressView2.default, {
                                filterLife: this.state.filterLife,
                                filterTime: this.state.filterTime,
                                numberColor: titleColor,
                                persentColor: persentColor,
                                suggestion: filterSug
                            })
                        ),
                        _react2.default.createElement(
                            _reactNative.Text,
                            {
                                style: babelHelpers.extends({}, textStyle, {
                                    fontSize: (0, _FontSizeConstant.setSpText)(14),
                                    color: _Color2.default.ColorOfAEAEAE,
                                    marginTop: (0, _MHGlobalData.getHeightSize)(69)
                                })
                            },
                            (0, _String.getString)(this.state.filterType.descStringKey)
                        ),
                        _react2.default.createElement(_reactNative.View, null),
                        _react2.default.createElement(
                            _reactNativeUiKitten.RkButton,
                            {
                                style: [styles.buttonContainer],
                                onPress: function onPress(_) {
                                    _this2.toast && _this2.toast.show((0, _String.getString)('filterBuyTip'));
                                },
                                activeOpacity: 0.8
                            },
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: [styles.buttonText, _Style2.default.androidLightFont]
                                },
                                (0, _String.getString)('buyFilter')
                            )
                        )
                    ),
                    _react2.default.createElement(_reactNativeEasyToast2.default, {
                        ref: function ref(_ref) {
                            return _this2.toast = _ref;
                        },
                        opacity: 0.8,
                        textStyle: _Style2.default.toastTextStyle,
                        style: {
                            marginHorizontal: 20
                        },
                        fadeOutDuration: 1000
                    })
                );
            }
        }, {
            key: "componentDidMount",
            value: function componentDidMount() {
                var _this3 = this;

                this.specHelp.getProps(function (result) {
                    _this3.applyProps(result);
                });
                this.getSubscribe();
            }
        }, {
            key: "componentWillMount",
            value: function componentWillMount() {}
        }, {
            key: "componentWillUnmount",
            value: function componentWillUnmount() {
                this.deviceListener && this.deviceListener.remove();
                this.specHelp.unMount();
            }
        }, {
            key: "getSubscribe",
            value: function getSubscribe() {
                var _this4 = this;

                this.deviceListener = _index2.DeviceEvent.deviceReceivedMessages.addListener(function (device, messages) {
                    var subscribeMap = _SpecHelp2.default.getSubscribeMap(messages);

                    _this4.applyProps(subscribeMap);
                });
            }
        }, {
            key: "applyProps",
            value: function applyProps(map) {
                var newState = {};
                var size = map.size;

                if (size === 0) {
                    return;
                }

                for (var _iterator = pageProps, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
                    var _ref2;

                    if (_isArray) {
                        if (_i >= _iterator.length) break;
                        _ref2 = _iterator[_i++];
                    } else {
                        _i = _iterator.next();
                        if (_i.done) break;
                        _ref2 = _i.value;
                    }

                    var prop = _ref2;

                    if (map.has(prop)) {
                        --size;
                        var value = map.get(prop);
                        value = Number(value);

                        if (value !== this.state[prop]) {
                            newState[prop] = value;
                        }
                    }

                    if (size <= 0) {
                        break;
                    }
                }

                if (Object.keys(newState).length > 0) {
                    this.setState(newState);
                }

                _StorageUtil2.default.save(map);
            }
        }, {
            key: "getPercentColor",
            value: function getPercentColor(regions, colors, percent) {
                var num = _ToolUtil2.default.toNumber(percent);

                return _ToolUtil2.default.interpolateArray(regions, colors, num);
            }
        }, {
            key: "getFilterSuggestion",
            value: function getFilterSuggestion() {
                var persent = _ToolUtil2.default.toNumber(this.state.filterLife);

                var filterSug = (0, _String.getQuantityString)('filterDayLeftTip', this.state.filterTime, this.state.filterTime);
                var tip = filterSug;

                if (persent <= 10) {
                    tip = filterSug + ', ' + (0, _String.getString)("replaceFilterSuggestion");
                } else if (persent <= 20) {
                    tip = filterSug + ', ' + (0, _String.getString)("buyFilterSuggestion");
                }

                return tip;
            }
        }]);
        return CompositeFilterPage;
    }(_react2.default.Component);

    CompositeFilterPage.navigationOptions = function (_ref3) {
        var navigation = _ref3.navigation;
        return {
            header: null
        };
    };

    exports.default = CompositeFilterPage;

    var styles = _reactNative.StyleSheet.create({
        container: {
            backgroundColor: _resources.Styles.common.backgroundColor,
            flex: 1
        },
        buttonContainer: {
            position: 'absolute',
            bottom: _MHGlobalData2.default.isIphoneX ? (0, _MHGlobalData.getHeightSize)(41) + 34 : (0, _MHGlobalData.getHeightSize)(41),
            width: (0, _MHGlobalData.getWindowWidth)() - (0, _MHGlobalData.getWidthSize)(20) * 2,
            height: (0, _MHGlobalData.getHeightSize)(42),
            borderRadius: 4,
            borderColor: _Color2.default.FilterThemeColor,
            borderWidth: _reactNative.StyleSheet.hairlineWidth,
            backgroundColor: _Color2.default.FilterThemeColor,
            marginHorizontal: (0, _MHGlobalData.getWidthSize)(20)
        },
        buttonText: {
            fontSize: (0, _FontSizeConstant.setSpText)(16),
            textAlign: 'center',
            color: '#ffffff'
        }
    });
},10124,[10077,10353,10332,10297,10033,10013,10074,10010,10040,10067,11251,10037,10031,10034,10097,10064,10127,10109,10070],"projects/com.dmaker.water_purifier/Main/pages/CompositeFilterPage.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react = _require(_dependencyMap[0]);

  var _react2 = babelHelpers.interopRequireDefault(_react);

  var _reactNative = _require(_dependencyMap[1]);

  var _Circle = _require(_dependencyMap[2]);

  var _Circle2 = babelHelpers.interopRequireDefault(_Circle);

  var _Color = _require(_dependencyMap[3]);

  var _Color2 = babelHelpers.interopRequireDefault(_Color);

  var _MHGlobalData = _require(_dependencyMap[4]);

  var _String = _require(_dependencyMap[5]);

  var _FontSizeConstant = _require(_dependencyMap[6]);

  var _FontSizeConstant2 = babelHelpers.interopRequireDefault(_FontSizeConstant);

  var _OtherConstant = _require(_dependencyMap[7]);

  var _OtherConstant2 = babelHelpers.interopRequireDefault(_OtherConstant);

  var _miot = _require(_dependencyMap[8]);

  var CircleProgressView = function (_React$Component) {
    babelHelpers.inherits(CircleProgressView, _React$Component);

    function CircleProgressView(props) {
      babelHelpers.classCallCheck(this, CircleProgressView);

      var _this = babelHelpers.possibleConstructorReturn(this, (CircleProgressView.__proto__ || Object.getPrototypeOf(CircleProgressView)).call(this, props));

      _this.state = {
        filterLife: _this.props.filterLife,
        filterTime: _this.props.filterTime
      };
      return _this;
    }

    babelHelpers.createClass(CircleProgressView, [{
      key: "componentWillMount",
      value: function componentWillMount() {}
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {}
    }, {
      key: "render",
      value: function render() {
        var textOffset = this.props.borderWidth + this.props.thickness;
        var textSize = this.props.size - textOffset * 2;
        var textStyle = {
          fontFamily: _FontSizeConstant2.default.FontFamilyOfMiLight,
          textAlign: 'center'
        };
        var filterLeftDaysText = (0, _String.getQuantityString)('filterDayLeftTip', this.state.filterTime, this.state.filterTime);
        var marginStyle = _miot.Host.isAndroid ? {
          marginTop: -(0, _MHGlobalData.getHeightSize)(2)
        } : {
          marginTop: (0, _MHGlobalData.getHeightSize)(6)
        };
        return _react2.default.createElement(
          _reactNative.View,
          {
            style: {
              height: this.props.size,
              alignItems: 'center',
              justifyContent: "center"
            }
          },
          _react2.default.createElement(
            _Circle2.default,
            {
              size: this.props.size,
              borderWidth: this.props.borderWidth,
              unfilledColor: _Color2.default.circleUnfilledColor,
              color: _Color2.default.FilterThemeColor,
              progress: this.state.filterLife / 100,
              showsText: false,
              thickness: this.props.thickness
            },
            _react2.default.createElement(
              _reactNative.View,
              {
                style: {
                  position: 'absolute',
                  left: textOffset,
                  top: textOffset,
                  width: textSize,
                  height: textSize,
                  borderRadius: textSize / 2,
                  alignItems: 'center',
                  justifyContent: 'center'
                }
              },
              _react2.default.createElement(
                _reactNative.View,
                {
                  style: {
                    alignItems: 'center',
                    justifyContent: 'center'
                  }
                },
                _react2.default.createElement(
                  _reactNative.Text,
                  {
                    style: babelHelpers.extends({}, textStyle, {
                      fontSize: (0, _FontSizeConstant.setSpText)(16),
                      color: _Color2.default.ColorOfAEAEAE
                    }),
                    numberOfLines: 1,
                    ellipsizeMode: "tail"
                  },
                  (0, _String.getString)('left')
                ),
                _react2.default.createElement(
                  _reactNative.Text,
                  {
                    style: [{
                      alignSelf: 'center',
                      fontFamily: _FontSizeConstant2.default.FontFamilyOfMiKmedium,
                      fontSize: (0, _FontSizeConstant.setSpText)(56),
                      fontWeight: 'bold',
                      color: this.props.numberColor
                    }, marginStyle],
                    numberOfLines: 1,
                    ellipsizeMode: "tail"
                  },
                  ' ' + this.state.filterLife,
                  _react2.default.createElement(
                    _reactNative.Text,
                    {
                      style: {
                        fontFamily: _FontSizeConstant2.default.FontFamilyOfMiKmedium,
                        fontSize: (0, _FontSizeConstant.setSpText)(20),
                        color: this.props.persentColor
                      }
                    },
                    "%"
                  )
                ),
                _react2.default.createElement(
                  _reactNative.Text,
                  {
                    style: babelHelpers.extends({}, textStyle, {
                      fontSize: (0, _FontSizeConstant.setSpText)(12),
                      color: _Color2.default.ColorOfAAABB5
                    })
                  },
                  this.props.suggestion
                )
              )
            )
          )
        );
      }
    }]);
    return CircleProgressView;
  }(_react2.default.Component);

  CircleProgressView.defaultProps = {
    size: (0, _MHGlobalData.getWindowWidth)() - (0, _MHGlobalData.getWidthSize)(100),
    borderWidth: 0,
    thickness: 3,
    filterLife: _OtherConstant2.default.defaultFilterLife,
    filterTime: _OtherConstant2.default.defaultFilterTime
  };
  CircleProgressView.propTypes = {};
  exports.default = CircleProgressView;

  var styles = _reactNative.StyleSheet.create({});
},10127,[10297,10033,13642,10037,10010,10013,10040,10034,10074],"projects/com.dmaker.water_purifier/Main/views/CircleProgressView.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var _resources = _require(_dependencyMap[2]);

    var _String = _require(_dependencyMap[3]);

    var _NavigationBar = _require(_dependencyMap[4]);

    var _NavigationBar2 = babelHelpers.interopRequireDefault(_NavigationBar);

    var _OtherConstant = _require(_dependencyMap[5]);

    var _NumberLabelView = _require(_dependencyMap[6]);

    var _NumberLabelView2 = babelHelpers.interopRequireDefault(_NumberLabelView);

    var _Color = _require(_dependencyMap[7]);

    var _Color2 = babelHelpers.interopRequireDefault(_Color);

    var _MHGlobalData = _require(_dependencyMap[8]);

    var _MHGlobalData2 = babelHelpers.interopRequireDefault(_MHGlobalData);

    var _Style = _require(_dependencyMap[9]);

    var _Style2 = babelHelpers.interopRequireDefault(_Style);

    var InstructionPage = function (_React$Component) {
        babelHelpers.inherits(InstructionPage, _React$Component);

        function InstructionPage(props) {
            babelHelpers.classCallCheck(this, InstructionPage);

            var _this = babelHelpers.possibleConstructorReturn(this, (InstructionPage.__proto__ || Object.getPrototypeOf(InstructionPage)).call(this, props));

            var params = _this.props.navigation.state.params;
            var filterType = params.filterType;
            _this.state = {
                filterType: filterType
            };
            return _this;
        }

        babelHelpers.createClass(InstructionPage, [{
            key: "render",
            value: function render() {
                var _this2 = this;

                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: styles.rootView
                    },
                    _react2.default.createElement(_NavigationBar2.default, {
                        backgroundColor: "transparent",
                        type: _NavigationBar2.default.TYPE.LIGHT,
                        title: (0, _String.getString)('InstructionTitle'),
                        left: [{
                            key: _NavigationBar2.default.ICON.BACK,
                            onPress: function onPress() {
                                return _this2.props.navigation.goBack();
                            }
                        }]
                    }),
                    _react2.default.createElement(
                        _reactNative.ScrollView,
                        {
                            style: styles.rootView,
                            contentContainerStyle: {
                                alignItems: "center"
                            },
                            overScrollMode: "never",
                            scrollEventThrottle: 1,
                            decelerationRate: 0.9,
                            bounces: false,
                            alwaysBounceVertical: false,
                            showsVerticalScrollIndicator: true
                        },
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: {
                                    flex: 1,
                                    flexDirection: 'column',
                                    marginTop: (0, _MHGlobalData.getHeightSize)(29),
                                    marginBottom: (0, _MHGlobalData.getHeightSize)(54)
                                }
                            },
                            this.renderContent()
                        )
                    )
                );
            }
        }, {
            key: "renderContent",
            value: function renderContent() {
                var _this3 = this;

                var imgArr = this.state.filterType.isPPC ? [_require(_dependencyMap[10]), _require(_dependencyMap[11]), _require(_dependencyMap[12])] : [_require(_dependencyMap[13]), _require(_dependencyMap[14]), _require(_dependencyMap[15])];
                var dataSource = [{
                    "image": imgArr[0],
                    "title": (0, _String.getString)(this.state.filterType.instruction1)
                }, {
                    "image": imgArr[1],
                    "title": (0, _String.getString)(this.state.filterType.instruction2)
                }, {
                    "image": imgArr[2],
                    "title": (0, _String.getString)(this.state.filterType.instruction3)
                }, {
                    "title": (0, _String.getString)(this.state.filterType.instruction4)
                }];
                return dataSource.map(function (item, index) {
                    return _this3.renderItem(item, index + 1);
                });
            }
        }, {
            key: "renderItem",
            value: function renderItem(item, index) {
                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: {
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: 17,
                            marginRight: 35
                        },
                        key: index
                    },
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: {
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                                width: (0, _MHGlobalData.getWindowWidth)() - 52,
                                justifyContent: 'flex-start'
                            }
                        },
                        _react2.default.createElement(_NumberLabelView2.default, {
                            width: 21,
                            height: 21,
                            text: index
                        }),
                        _react2.default.createElement(
                            _reactNative.Text,
                            {
                                style: [styles.text, _Style2.default.androidLightFont]
                            },
                            item.title
                        )
                    ),
                    item.image ? _react2.default.createElement(_reactNative.Image, {
                        source: item.image,
                        style: {
                            marginTop: (0, _MHGlobalData.getHeightSize)(33),
                            marginBottom: (0, _MHGlobalData.getHeightSize)(33)
                        }
                    }) : null
                );
            }
        }]);
        return InstructionPage;
    }(_react2.default.Component);

    InstructionPage.defaultProps = {
        filterType: _OtherConstant.FilterType.PPC
    };

    InstructionPage.navigationOptions = function (_ref) {
        var navigation = _ref.navigation;
        return {
            header: null
        };
    };

    exports.default = InstructionPage;

    var styles = _reactNative.StyleSheet.create({
        rootView: {
            backgroundColor: _resources.Styles.common.backgroundColor,
            flex: 1
        },
        text: {
            paddingHorizontal: 10,
            alignSelf: 'center',
            textAlign: 'left',
            color: _Color2.default.DarkTextColor,
            lineHeight: 18
        },
        headerAndFooterSpace: {
            height: 30
        }
    });
},10130,[10297,10033,10077,10013,10067,10034,10133,10037,10010,10070,10136,10139,10142,10145,10148,10151],"projects/com.dmaker.water_purifier/Main/pages/InstructionPage.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react = _require(_dependencyMap[0]);

  var _react2 = babelHelpers.interopRequireDefault(_react);

  var _reactNative = _require(_dependencyMap[1]);

  var _Color = _require(_dependencyMap[2]);

  var _Color2 = babelHelpers.interopRequireDefault(_Color);

  var NumberLabelView = function (_React$Component) {
    babelHelpers.inherits(NumberLabelView, _React$Component);

    function NumberLabelView(props) {
      babelHelpers.classCallCheck(this, NumberLabelView);

      var _this = babelHelpers.possibleConstructorReturn(this, (NumberLabelView.__proto__ || Object.getPrototypeOf(NumberLabelView)).call(this, props));

      _this.state = {
        text: _this.props.text
      };
      return _this;
    }

    babelHelpers.createClass(NumberLabelView, [{
      key: "render",
      value: function render() {
        return _react2.default.createElement(
          _reactNative.View,
          {
            style: {
              width: this.props.width,
              height: this.props.height,
              backgroundColor: this.props.backgroundColor,
              borderRadius: this.props.height / 2,
              justifyContent: 'center'
            }
          },
          _react2.default.createElement(
            _reactNative.Text,
            {
              style: {
                alignSelf: 'center',
                fontSize: this.props.height / 2,
                color: _Color2.default.ColorOfWhite
              }
            },
            this.props.text
          )
        );
      }
    }]);
    return NumberLabelView;
  }(_react2.default.Component);

  NumberLabelView.defaultProps = {
    text: 'N',
    width: 21,
    height: 21,
    backgroundColor: _Color2.default.FilterThemeColor
  };
  NumberLabelView.propTypes = {};
  exports.default = NumberLabelView;

  var styles = _reactNative.StyleSheet.create({});
},10133,[10297,10033,10037],"projects/com.dmaker.water_purifier/Main/views/NumberLabelView.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.dmaker.water_purifier/resources/img/PPC_change",
    "width": 648,
    "height": 648,
    "scales": [1],
    "hash": "498da911662f57fe6485c38b1a3a144c",
    "name": "img_ppc_change1",
    "type": "png"
  });
},10136,[10420],"projects/com.dmaker.water_purifier/resources/img/PPC_change/img_ppc_change1.png");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.dmaker.water_purifier/resources/img/PPC_change",
    "width": 648,
    "height": 648,
    "scales": [1],
    "hash": "898700fadd756265d440928a3cc1787d",
    "name": "img_ppc_change2",
    "type": "png"
  });
},10139,[10420],"projects/com.dmaker.water_purifier/resources/img/PPC_change/img_ppc_change2.png");
__d(function (global, _require, module, exports, _dependencyMap) {
	module.exports = _require(_dependencyMap[0]).registerAsset({
		"__packager_asset": true,
		"httpServerLocation": "/assets/projects/com.dmaker.water_purifier/resources/img/PPC_change",
		"width": 648,
		"height": 648,
		"scales": [1],
		"hash": "fe99d5f3e6a7a89cdba0bea998402986",
		"name": "img_ppc_change3",
		"type": "png"
	});
},10142,[10420],"projects/com.dmaker.water_purifier/resources/img/PPC_change/img_ppc_change3.png");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.dmaker.water_purifier/resources/img/RO_change",
    "width": 648,
    "height": 648,
    "scales": [1],
    "hash": "d8fd6a52fb12e93452c4c524c4b99638",
    "name": "img_ro_change1",
    "type": "png"
  });
},10145,[10420],"projects/com.dmaker.water_purifier/resources/img/RO_change/img_ro_change1.png");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.dmaker.water_purifier/resources/img/RO_change",
    "width": 648,
    "height": 648,
    "scales": [1],
    "hash": "79a1b5af9282c35fd2687fdc7b577552",
    "name": "img_ro_change2",
    "type": "png"
  });
},10148,[10420],"projects/com.dmaker.water_purifier/resources/img/RO_change/img_ro_change2.png");
__d(function (global, _require, module, exports, _dependencyMap) {
	module.exports = _require(_dependencyMap[0]).registerAsset({
		"__packager_asset": true,
		"httpServerLocation": "/assets/projects/com.dmaker.water_purifier/resources/img/RO_change",
		"width": 648,
		"height": 648,
		"scales": [1],
		"hash": "568e85aa0a93d1a9a1e4dde08acab403",
		"name": "img_ro_change3",
		"type": "png"
	});
},10151,[10420],"projects/com.dmaker.water_purifier/resources/img/RO_change/img_ro_change3.png");
require(10120);
require(10001);