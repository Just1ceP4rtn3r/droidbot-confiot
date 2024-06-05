
__d(function (global, _require, module, exports, _dependencyMap) {
    var _Main = _require(_dependencyMap[0]);

    var _Main2 = babelHelpers.interopRequireDefault(_Main);

    var _miot = _require(_dependencyMap[1]);

    switch (_miot.Package.entrance) {
        case _miot.Entrance.Scene:
            break;

        default:
            console.log('App', _miot.Package.entryInfo);

            _miot.Package.entry(_Main2.default, function (_) {});

            break;
    }
},10001,[10004,10074],"projects/com.shjszn.gateway.ios/index.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react = _require(_dependencyMap[0]);

  var _react2 = babelHelpers.interopRequireDefault(_react);

  var _reactNative = _require(_dependencyMap[1]);

  var _miot = _require(_dependencyMap[2]);

  var _reactNavigation = _require(_dependencyMap[3]);

  var _ui = _require(_dependencyMap[4]);

  var _ZKMyHomeGateWayPage = _require(_dependencyMap[5]);

  var _ZKMyHomeGateWayPage2 = babelHelpers.interopRequireDefault(_ZKMyHomeGateWayPage);

  var _MoreMenu = _require(_dependencyMap[6]);

  var _MoreMenu2 = babelHelpers.interopRequireDefault(_MoreMenu);

  var RootStack = (0, _reactNavigation.createStackNavigator)({
    Home: _ZKMyHomeGateWayPage2.default,
    MoreMenu: _MoreMenu2.default
  }, {
    initialRouteName: 'Home',
    navigationOptions: function navigationOptions(_ref) {
      var navigation = _ref.navigation;
      return {
        header: _react2.default.createElement(_ui.TitleBarBlack, {
          title: navigation.state.params ? navigation.state.params.title : '',
          style: {
            backgroundColor: '#fff'
          },
          onPressLeft: function onPressLeft() {
            navigation.goBack();
          }
        })
      };
    }
  });

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
},10004,[10297,10033,10074,10918,10230,10007,10031],"projects/com.shjszn.gateway.ios/Main/index.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var _ui = _require(_dependencyMap[2]);

    var _miot = _require(_dependencyMap[3]);

    var _ZKCommonString = _require(_dependencyMap[4]);

    var _ZKCommonString2 = babelHelpers.interopRequireDefault(_ZKCommonString);

    var ScreenWidth = _reactNative.Dimensions.get('window').width;

    var ScreenHeight = _reactNative.Dimensions.get('window').height;

    var HeightBottomBgView = (ScreenHeight - 64) * 0.4519774011299435;
    var HeightBottomBgViewV2 = HeightBottomBgView > 211.33333333333334 ? HeightBottomBgView : 211.33333333333334;
    var HeightTopBgViewV2 = ScreenHeight - HeightBottomBgViewV2 - 64.0;
    var HeightFindBtn = 43.333333333333336;
    var APPBAR_HEIGHT = 56;
    var fitIXStatusBarHeight = 0;

    var ZKMyHomeGateWayPage = function (_React$Component) {
        babelHelpers.inherits(ZKMyHomeGateWayPage, _React$Component);

        function ZKMyHomeGateWayPage(props, context) {
            babelHelpers.classCallCheck(this, ZKMyHomeGateWayPage);

            var _this = babelHelpers.possibleConstructorReturn(this, (ZKMyHomeGateWayPage.__proto__ || Object.getPrototypeOf(ZKMyHomeGateWayPage)).call(this, props, context));

            var ds = new _reactNative.ListView.DataSource({
                rowHasChanged: function rowHasChanged(r1, r2) {
                    return r1 != r2;
                }
            });
            _this.state = {
                promptText: '网络未连接，请确保网络畅通。',
                memberId: '',
                setBtnClickBackgroundColor: "#308CF9",
                setBtnClickTextColor: "white",
                refreshLocksBtnClickBackgroundColor: "white",
                refreshLocksBtnClickTextColor: "#2889fd",
                pageStatus: 1,
                gatewayStatus: '离线',
                gatewayVersion: "",
                gatewayStatusTextColor: '#e83434',
                gatewayRSSIPic: _require(_dependencyMap[5]),
                dataSource: ds,
                data: new Array()
            };
            return _this;
        }

        babelHelpers.createClass(ZKMyHomeGateWayPage, [{
            key: "componentWillMount",
            value: function componentWillMount() {
                var _this2 = this;

                this.setState({
                    gatewayRSSIPic: _require(_dependencyMap[6]),
                    promptText: ''
                });
                this._deviceNameChangedListener = _miot.DeviceEvent.deviceNameChanged.addListener(function (device) {
                    console.log("修改设备名称", device);

                    _this2.props.navigation.setParams({
                        name: device.name
                    });

                    _this2.forceUpdate();
                });
                this.checkPrivacy();
            }
        }, {
            key: "componentDidMount",
            value: function componentDidMount() {
                this.getGatewayVersion();
            }
        }, {
            key: "componentWillUnmount",
            value: function componentWillUnmount() {
                this._deviceNameChangedListener.remove();

                this.timer && clearTimeout(this.timer);
            }
        }, {
            key: "checkPrivacy",
            value: function checkPrivacy() {
                var licenseURL = _require(_dependencyMap[7]);

                var policyURL = _require(_dependencyMap[8]);

                var params = {
                    'did': _miot.Device.deviceID,
                    'props': ["prop.s_privacy_agreement"]
                };

                _miot.Service.smarthome.batchGetDeviceDatas([params]).then(function (res) {
                    console.log('get privacy_agreement:', res);

                    if (res[_miot.Device.deviceID] && res[_miot.Device.deviceID]['prop.s_privacy_agreement'] == '1') {} else {
                        var slasa = _ZKCommonString2.default.slasa;
                        var priAgree = _ZKCommonString2.default.privacyAgreement;

                        _miot.Host.ui.openPrivacyLicense(slasa, licenseURL, priAgree, policyURL).then(function (res) {
                            if (res) {
                                var _params = {
                                    'did': _miot.Device.deviceID,
                                    'props': {
                                        "prop.s_privacy_agreement": "1"
                                    }
                                };

                                _miot.Service.smarthome.batchSetDeviceDatas([_params]).then(function (res) {
                                    console.log('set privacy_agreement:', res);
                                });
                            }
                        }).catch(function (error) {
                            console.log(error);
                        });
                    }
                });
            }
        }, {
            key: "getGatewayVersion",
            value: function getGatewayVersion() {
                console.log(_miot.Device.extra);
                console.log(_miot.Device.lastVersion);
                this.setState({
                    gatewayVersion: "v" + _miot.Device.lastVersion,
                    gatewayStatus: _miot.Device.isOnline == true ? _ZKCommonString2.default.online : _ZKCommonString2.default.offline,
                    gatewayStatusTextColor: _miot.Device.isOnline == true ? "#009933" : "#e83434"
                });
            }
        }, {
            key: "getPeripheralLock",
            value: function getPeripheralLock() {}
        }, {
            key: "_setBtnClick",
            value: function _setBtnClick() {
                this.getGatewayVersion();
            }
        }, {
            key: "_setBtnPressIn",
            value: function _setBtnPressIn() {
                this.setState({
                    setBtnClickBackgroundColor: "#2889fd",
                    setBtnClickTextColor: "white"
                });
            }
        }, {
            key: "_setBtnPressOut",
            value: function _setBtnPressOut() {
                this.setState({
                    setBtnClickBackgroundColor: "#308CF9",
                    setBtnClickTextColor: "white"
                });
            }
        }, {
            key: "refreshLocksBtnClick",
            value: function refreshLocksBtnClick() {
                this.getPeripheralLock();
            }
        }, {
            key: "refreshLocksBtnPressIn",
            value: function refreshLocksBtnPressIn() {
                this.setState({
                    refreshLocksBtnClickBackgroundColor: "#c6c6c6",
                    refreshLocksBtnClickTextColor: "#308CF9"
                });
            }
        }, {
            key: "refreshLocksBtnPressOut",
            value: function refreshLocksBtnPressOut() {
                this.setState({
                    refreshLocksBtnClickBackgroundColor: "white",
                    refreshLocksBtnClickTextColor: "#2889fd"
                });
            }
        }, {
            key: "createLocksRow",
            value: function createLocksRow(rowData, sectionId, rowId) {
                var lineBackgroundColor = '#c6c6c6';
                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: styles.locksRow
                    },
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: styles.lockRowBgView
                        },
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: styles.lockRowLeftTextView
                            },
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: {
                                        fontSize: 14,
                                        color: '#000000',
                                        opacity: 0.8,
                                        backgroundColor: 'white'
                                    }
                                },
                                "\u9501\u540D\u79F0"
                            )
                        ),
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: styles.lockRowRightTextView
                            },
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: [styles.lockRowRightText, {
                                        color: this.state.gatewayStatusTextColor
                                    }]
                                },
                                rowId
                            )
                        )
                    ),
                    _react2.default.createElement(_reactNative.View, {
                        style: {
                            position: 'absolute',
                            height: 1,
                            left: 23,
                            right: 23,
                            top: ScreenHeight * 0.07656967840735068 - 1,
                            backgroundColor: lineBackgroundColor
                        }
                    })
                );
            }
        }, {
            key: "render",
            value: function render() {
                var _this3 = this;

                if (this.state.pageStatus == 0) {
                    return _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: styles.container
                        },
                        _react2.default.createElement(_reactNative.View, {
                            style: {
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: ScreenWidth,
                                height: 1,
                                zIndex: 100,
                                backgroundColor: '#B8B8B8'
                            }
                        }),
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: styles.contentContainer
                            },
                            _react2.default.createElement(_reactNative.View, {
                                style: styles.status0BgView
                            }),
                            _react2.default.createElement(_reactNative.Image, {
                                style: styles.wifiIcon,
                                source: _require(_dependencyMap[9])
                            }),
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: styles.promptText
                                },
                                _react2.default.createElement(
                                    _reactNative.Text,
                                    {
                                        style: {
                                            fontSize: 14,
                                            color: '#000000',
                                            opacity: 0.5,
                                            backgroundColor: 'white'
                                        }
                                    },
                                    this.state.promptText
                                )
                            ),
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: styles.setBtnBgView
                                },
                                _react2.default.createElement(
                                    _reactNative.TouchableWithoutFeedback,
                                    {
                                        onPress: this._setBtnClick.bind(this),
                                        onPressIn: this._setBtnPressIn.bind(this),
                                        onPressOut: this._setBtnPressOut.bind(this)
                                    },
                                    _react2.default.createElement(
                                        _reactNative.View,
                                        {
                                            style: [styles.setBtnTextBgView, {
                                                backgroundColor: this.state.setBtnClickBackgroundColor
                                            }]
                                        },
                                        _react2.default.createElement(
                                            _reactNative.Text,
                                            {
                                                style: [styles.setBtnText, {
                                                    color: this.state.setBtnClickTextColor
                                                }]
                                            },
                                            "\u5237\u65B0"
                                        )
                                    )
                                )
                            )
                        )
                    );
                }

                if (this.state.pageStatus == 2) {
                    return _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: styles.container
                        },
                        _react2.default.createElement(_reactNative.View, {
                            style: {
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: ScreenWidth,
                                height: 1,
                                zIndex: 100,
                                backgroundColor: '#B8B8B8'
                            }
                        }),
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: styles.contentContainer
                            },
                            _react2.default.createElement(_reactNative.View, {
                                style: styles.status1BottomBgView
                            }),
                            _react2.default.createElement(_reactNative.Image, {
                                style: styles.wifiIconOnline,
                                source: this.state.gatewayRSSIPic
                            }),
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: styles.promptTextOnline
                                },
                                _react2.default.createElement(
                                    _reactNative.Text,
                                    {
                                        style: {
                                            fontSize: 12,
                                            color: '#2889fd',
                                            opacity: 1.0,
                                            backgroundColor: 'white'
                                        }
                                    },
                                    this.state.promptText
                                )
                            ),
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: styles.listViewBg
                                },
                                _react2.default.createElement(_reactNative.ListView, {
                                    style: styles.listViewStyle,
                                    dataSource: this.state.dataSource.cloneWithRows(this.state.data),
                                    renderRow: function renderRow(rowData, sectionId, rowId) {
                                        return _this3.createLocksRow(rowData, sectionId, rowId);
                                    },
                                    showsVerticalScrollIndicator: false,
                                    enableEmptySections: true
                                })
                            ),
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: styles.refreshLocksBtnBgView
                                },
                                _react2.default.createElement(
                                    _reactNative.TouchableWithoutFeedback,
                                    {
                                        onPress: this.refreshLocksBtnClick.bind(this),
                                        onPressIn: this.refreshLocksBtnPressIn.bind(this),
                                        onPressOut: this.refreshLocksBtnPressOut.bind(this)
                                    },
                                    _react2.default.createElement(
                                        _reactNative.View,
                                        {
                                            style: [styles.refreshLocksBtnTextBgView, {
                                                backgroundColor: this.state.refreshLocksBtnClickBackgroundColor
                                            }]
                                        },
                                        _react2.default.createElement(
                                            _reactNative.Text,
                                            {
                                                style: [styles.refreshLocksBtnText, {
                                                    color: this.state.refreshLocksBtnClickTextColor
                                                }]
                                            },
                                            "\u5237\u65B0"
                                        )
                                    )
                                )
                            )
                        )
                    );
                }

                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: styles.container
                    },
                    _react2.default.createElement(_reactNative.View, {
                        style: {
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: ScreenWidth,
                            height: 1,
                            zIndex: 100,
                            backgroundColor: '#B8B8B8'
                        }
                    }),
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: styles.contentContainer
                        },
                        _react2.default.createElement(_reactNative.View, {
                            style: styles.status1BottomBgView
                        }),
                        _react2.default.createElement(_reactNative.Image, {
                            style: styles.wifiIconOnline,
                            source: this.state.gatewayRSSIPic
                        }),
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: styles.promptTextOnline
                            },
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: {
                                        fontSize: 12,
                                        color: '#2889fd',
                                        opacity: 1.0,
                                        backgroundColor: 'white',
                                        fontFamily: ''
                                    }
                                },
                                this.state.promptText
                            )
                        ),
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: styles.promptTextArea
                            },
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: styles.promptTextWView
                                },
                                _react2.default.createElement(
                                    _reactNative.Text,
                                    {
                                        style: {
                                            fontSize: 15,
                                            color: '#c9c9c9',
                                            opacity: 1.0,
                                            backgroundColor: 'white',
                                            fontFamily: ''
                                        }
                                    },
                                    _ZKCommonString2.default.mainLine1
                                )
                            ),
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: styles.promptTextWView
                                },
                                _react2.default.createElement(
                                    _reactNative.Text,
                                    {
                                        style: {
                                            fontSize: 15,
                                            color: '#c9c9c9',
                                            opacity: 1.0,
                                            backgroundColor: 'white',
                                            fontFamily: ''
                                        }
                                    },
                                    _ZKCommonString2.default.mainLine2
                                )
                            ),
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: styles.promptTextWView
                                },
                                _react2.default.createElement(
                                    _reactNative.Text,
                                    {
                                        style: {
                                            fontSize: 15,
                                            color: '#c9c9c9',
                                            opacity: 1.0,
                                            backgroundColor: 'white',
                                            fontFamily: ''
                                        }
                                    },
                                    _ZKCommonString2.default.mainLine3
                                )
                            )
                        ),
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: styles.gatewayStatusBgView
                            },
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: styles.gatewayStatusLeftTextView
                                },
                                _react2.default.createElement(
                                    _reactNative.Text,
                                    {
                                        style: {
                                            fontSize: 14,
                                            color: '#000000',
                                            opacity: 0.8,
                                            backgroundColor: 'white',
                                            fontFamily: ''
                                        }
                                    },
                                    _ZKCommonString2.default.gatewayStatus
                                )
                            ),
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: styles.gatewayStatusRightTextView
                                },
                                _react2.default.createElement(
                                    _reactNative.Text,
                                    {
                                        style: [styles.gatewayStatusText, {
                                            color: this.state.gatewayStatusTextColor,
                                            fontFamily: ''
                                        }]
                                    },
                                    this.state.gatewayStatus
                                )
                            )
                        ),
                        _react2.default.createElement(_reactNative.View, {
                            style: styles.lineView
                        }),
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: styles.gatewayVersionBgView
                            },
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: styles.gatewayStatusLeftTextView
                                },
                                _react2.default.createElement(
                                    _reactNative.Text,
                                    {
                                        style: {
                                            fontSize: 14,
                                            color: '#000000',
                                            opacity: 0.8,
                                            backgroundColor: 'white',
                                            fontFamily: ''
                                        }
                                    },
                                    _ZKCommonString2.default.currentVersion
                                )
                            ),
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: styles.gatewayStatusRightTextView
                                },
                                _react2.default.createElement(
                                    _reactNative.Text,
                                    {
                                        style: {
                                            fontSize: 12,
                                            color: '#000000',
                                            opacity: 0.8,
                                            backgroundColor: 'white',
                                            fontFamily: ''
                                        }
                                    },
                                    this.state.gatewayVersion
                                )
                            )
                        )
                    )
                );
            }
        }]);
        return ZKMyHomeGateWayPage;
    }(_react2.default.Component);

    ZKMyHomeGateWayPage.navigationOptions = function (_ref) {
        var navigation = _ref.navigation;
        return {
            header: _react2.default.createElement(
                _reactNative.View,
                null,
                _react2.default.createElement(_ui.TitleBar, {
                    type: "dark",
                    title: navigation.state["params"] ? navigation.state.params.name : _miot.Device.name,
                    style: {
                        backgroundColor: '#fff'
                    },
                    onPressLeft: function onPressLeft() {
                        _miot.Package.exit();
                    },
                    onPressRight: function onPressRight() {
                        navigation.navigate('MoreMenu', {
                            'title': _ZKCommonString2.default.setting
                        });
                    }
                })
            )
        };
    };

    exports.default = ZKMyHomeGateWayPage;

    var styles = _reactNative.StyleSheet.create({
        container: {
            top: 0,
            flexDirection: 'row',
            flex: 1,
            backgroundColor: '#eeeeee'
        },
        contentContainer: {
            top: fitIXStatusBarHeight,
            flexDirection: 'row',
            flex: 1,
            backgroundColor: '#eeeeee'
        },
        status0BgView: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: ScreenWidth,
            height: ScreenHeight - 64,
            backgroundColor: 'white',
            opacity: 1.0
        },
        status1BottomBgView: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: ScreenWidth,
            height: ScreenHeight * 0.4880040837161817,
            backgroundColor: '#FFFFFF',
            opacity: 1.0
        },
        gatewayStatusBgView: {
            position: 'absolute',
            top: ScreenHeight * 0.5176110260336907,
            left: 0,
            width: ScreenWidth,
            height: ScreenHeight * 0.07656967840735068,
            backgroundColor: '#ffffff',
            opacity: 1.0
        },
        gatewayStatusLeftTextView: {
            position: 'absolute',
            top: (ScreenHeight * 0.07656967840735068 - 20) / 2.0,
            height: 20,
            width: 100,
            left: ScreenHeight * 0.034201123021949976,
            alignItems: 'flex-start',
            justifyContent: 'center'
        },
        gatewayStatusRightTextView: {
            position: 'absolute',
            top: (ScreenHeight * 0.07656967840735068 - 20) / 2.0,
            height: 20,
            width: 100,
            right: ScreenHeight * 0.036753445635528334,
            alignItems: 'flex-end',
            justifyContent: 'center'
        },
        gatewayStatusText: {
            fontSize: 12,
            color: '#009933',
            opacity: 0.8,
            backgroundColor: 'white'
        },
        lineView: {
            position: 'absolute',
            top: ScreenHeight * 0.5941807044410413 - 1,
            left: ScreenHeight * 0.034201123021949976,
            right: ScreenHeight * 0.034201123021949976,
            height: 1,
            backgroundColor: '#c9c9c9',
            opacity: 1.0
        },
        gatewayVersionBgView: {
            position: 'absolute',
            top: ScreenHeight * 0.5941807044410413,
            left: 0,
            width: ScreenWidth,
            height: ScreenHeight * 0.07656967840735068,
            backgroundColor: '#ffffff',
            opacity: 1.0
        },
        wifiIcon: {
            position: 'absolute',
            top: ScreenHeight * 0.20929045431342522,
            height: ScreenHeight * 0.0816743236345074,
            width: ScreenHeight * 0.10515569167942827,
            left: (ScreenWidth - ScreenHeight * 0.10515569167942827) / 2.0
        },
        wifiIconOnline: {
            position: 'absolute',
            top: ScreenHeight * 0.1582440020418581 - 30,
            height: ScreenHeight * 0.1332312404287902,
            width: ScreenHeight * 0.12557427258805512,
            left: (ScreenWidth - ScreenHeight * 0.12557427258805512) / 2.0
        },
        promptText: {
            position: 'absolute',
            top: ScreenHeight * 0.20929045431342522 + ScreenHeight * 0.12098009188361408,
            height: 20,
            width: ScreenWidth,
            left: 0,
            alignItems: 'center',
            justifyContent: 'center'
        },
        promptTextOnline: {
            position: 'absolute',
            top: ScreenHeight * 0.1582440020418581 + ScreenHeight * 0.16488004083716182,
            height: 20,
            width: ScreenWidth,
            left: 0,
            alignItems: 'center',
            justifyContent: 'center'
        },
        promptTextArea: {
            position: 'absolute',
            top: ScreenHeight * 0.1582440020418581 + ScreenHeight * 0.16488004083716182 + 20 - 30 - 10,
            height: ScreenHeight * 0.16488004083716182,
            width: ScreenWidth
        },
        promptTextWView: {
            marginLeft: 20,
            marginRight: 20
        },
        promptTextOnline1: {
            position: 'absolute',
            top: ScreenHeight * 0.1582440020418581 + ScreenHeight * 0.16488004083716182 + 20 - 30,
            height: 20,
            width: ScreenWidth,
            left: 0,
            alignItems: 'center',
            justifyContent: 'center'
        },
        promptTextOnline2: {
            position: 'absolute',
            top: ScreenHeight * 0.1582440020418581 + ScreenHeight * 0.16488004083716182 + 40 - 30,
            height: 20,
            width: ScreenWidth,
            left: 0,
            alignItems: 'center',
            justifyContent: 'center'
        },
        promptTextOnline22: {
            position: 'absolute',
            top: ScreenHeight * 0.1582440020418581 + ScreenHeight * 0.16488004083716182 + 60 - 30,
            height: 20,
            width: 315,
            left: (ScreenWidth - 315) / 2.0,
            alignItems: 'flex-start',
            justifyContent: 'flex-start'
        },
        promptTextOnline3: {
            position: 'absolute',
            top: ScreenHeight * 0.1582440020418581 + ScreenHeight * 0.16488004083716182 + 80 - 30,
            height: 20,
            width: ScreenWidth,
            left: 0,
            alignItems: 'center',
            justifyContent: 'center'
        },
        setBtnBgView: {
            position: 'absolute',
            top: 25 + +HeightTopBgViewV2 + HeightFindBtn + 44,
            left: 23,
            right: 23,
            height: HeightFindBtn,
            backgroundColor: '#ffffff',
            borderRadius: 5
        },
        setBtnTextBgView: {
            position: 'absolute',
            height: HeightFindBtn,
            right: 0,
            top: 0,
            left: 0,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            borderRadius: 5
        },
        setBtnText: {
            fontSize: 14,
            color: '#2889fd'
        },
        refreshLocksBtnBgView: {
            position: 'absolute',
            top: ScreenHeight * 0.7682491066870852,
            left: 0,
            right: 0,
            height: 50.0,
            backgroundColor: '#ffffff'
        },
        refreshLocksBtnTextBgView: {
            position: 'absolute',
            height: 50.0,
            right: 0,
            top: 0,
            left: 0,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white'
        },
        refreshLocksBtnText: {
            fontSize: 14,
            color: '#2889fd'
        },
        listViewBg: {
            position: 'absolute',
            top: ScreenHeight * 0.5477284328739153,
            left: 0,
            right: 0,
            height: ScreenHeight * 0.15313935681470137,
            backgroundColor: '#ffffff'
        },
        listViewStyle: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: ScreenHeight * 0.15313935681470137,
            backgroundColor: '#eeeeee'
        },
        locksRow: {
            left: 0,
            right: 0,
            height: ScreenHeight * 0.07656967840735068,
            backgroundColor: 'white'
        },
        lockRowBgView: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: ScreenWidth,
            height: ScreenHeight * 0.07656967840735068,
            backgroundColor: '#ffffff',
            opacity: 1.0
        },
        lockRowLeftTextView: {
            position: 'absolute',
            top: (ScreenHeight * 0.07656967840735068 - 20) / 2.0,
            height: 20,
            width: 100,
            left: ScreenHeight * 0.034201123021949976,
            alignItems: 'flex-start',
            justifyContent: 'center'
        },
        lockRowRightTextView: {
            position: 'absolute',
            top: (ScreenHeight * 0.07656967840735068 - 20) / 2.0,
            height: 20,
            width: 100,
            right: ScreenHeight * 0.036753445635528334,
            alignItems: 'flex-end',
            justifyContent: 'center'
        },
        lockRowRightText: {
            fontSize: 12,
            color: '#009933',
            opacity: 0.8,
            backgroundColor: 'white'
        }
    });
},10007,[10297,10033,10230,10074,10010,10016,10019,10022,10025,10028],"projects/com.shjszn.gateway.ios/Main/ZKMyHomeGateWayPage.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _LocalizedStrings = _require(_dependencyMap[0]);

    var _LocalizedStrings2 = babelHelpers.interopRequireDefault(_LocalizedStrings);

    var ZKCommonString = new _LocalizedStrings2.default({
        "en": {
            phoneBleIsNotOpen: "phone's BLE is closed",
            pleaseOpenBle: "Please open bluetooth",
            pleaseOpenBleAndCloseToTheLock: "Please open bluetooth and make sure your lock is near by",
            pleasePutThePhoneCloseToTheLock: "Put your phone next to your lock",
            notFoundTheLock: "No lock found, please place your phone close to your lock",
            clickUnlock: "tap to unlock",
            networkIsNotConnected: "limited internet access, please make sure good internet connection",
            deviceHasBeenReset: "lock has been reset, please remove the lock and add it back again",
            sure: "Confirm",
            cancel: "Cancel",
            getTheDataFailFromMi: "Failed to fetch data",
            notGetTheData: "No data is fetched",
            errorCode: "error code",
            password: "password",
            delete: "delete",
            prompt: "Remind",
            pleaseInputLegalName: "name contains illegal character",
            receiveTheMessage: "Enable lock notification",
            doNotReceiveTheMessage: "Disable lock notification",
            keyDetail: "Digital key details",
            pwdUnlock: "password unlock",
            modifyPwd: "change password",
            deleting: "deleting",
            deleteSuccess: "delete successfully",
            deleteFail: "Failed to delete",
            exit: "exit",
            temporaryPassword: "Temporary password",
            deviceInfo: "Device information",
            checkTheFirmwareUpdate: "Check firmware update",
            deleteDevice: "delete device",
            gotIt: "OK",
            commandIsNotValid: "command is expired",
            addMemberMax1: "",
            addMemberMax2: " members have been added,no more members accept",
            commandIsNotValidPleaseSyncTimeWithErrCode: 'command expired,please get to "device information" page and synchronize the phone`s time to the lock and try again(error code:0x03)',
            commandIsNotValidPleaseSyncTime: 'command expired,please get to "device information" page and synchronize the iphone`s time to the lock',
            plug_inVersionReleaseHistory: "Plug-in release history",
            year: "",
            month: "",
            day: "",
            hour: "",
            minute: "",
            second: "",
            clearPwd: "Empty password",
            clearPwdBtnTitle: "Empty",
            sureToClearPwd: "are you sure to empty the password function",
            clearPwdFail: "fail to empty",
            clearPwdSuccess: "Empty password successfully",
            clearPwdPromptText: "By executing clear password, all users’ password will be cleared",
            featureSetting: "Shortcut settings",
            commonSetting: "Common settings",
            message: "message",
            loading: "loading",
            modifyDeviceName: "Modify device name",
            locationManagement: "Location management",
            securitySettings: "Security Settings",
            faq: "FAQ",
            feedback: "Feedback",
            addToDesktop: "Add to desktop",
            delDevice: "Delete device",
            cksytkhysxy: "View terms of use and privacy agreement",
            ifttt: "Automation",
            setting: 'Setting',
            MemberManagement: 'Member management',
            share: "Share",
            mainLine1: "1. Keep gateway and lock close enough, less than 5 meters and no obstacle is recommended",
            mainLine2: "2. It is not necessary to pair lock ang gateway. Bind gateway and lock to same account",
            mainLine3: "3. The gateway can only receive notifications from lock. User can not operation lock remotely through gateway",
            gatewayStatus: "Status",
            currentVersion: "Version",
            online: "Online",
            offline: "Offline",
            slasa: "Software license and service agreement",
            privacyAgreement: "Privacy agreement"
        },
        "zh": {
            phoneBleIsNotOpen: "手机蓝牙未打开",
            pleaseOpenBle: "请打开手机蓝牙",
            pleaseOpenBleAndCloseToTheLock: "请打开手机蓝牙并靠近门锁",
            pleasePutThePhoneCloseToTheLock: "请将手机靠近门锁",
            notFoundTheLock: "未发现门锁，请靠近门锁重试",
            clickUnlock: "点击开锁",
            networkIsNotConnected: "网络未连接，请确保网络畅通",
            deviceHasBeenReset: "设备已被重置，请解除绑定后重新添加",
            sure: "确定",
            cancel: "取消",
            getTheDataFailFromMi: "获取数据失败",
            notGetTheData: "未获取到数据",
            errorCode: "错误码",
            password: "密码",
            delete: "删除",
            prompt: "提示",
            pleaseInputLegalName: "请输入合法的姓名",
            receiveTheMessage: "接收消息",
            doNotReceiveTheMessage: "不接收消息",
            keyDetail: "钥匙详情",
            pwdUnlock: "密码解锁",
            modifyPwd: "修改密码",
            deleting: "正在删除",
            deleteSuccess: "删除成功",
            deleteFail: "删除失败",
            exit: "退出",
            temporaryPassword: "临时密码",
            deviceInfo: "设备信息",
            checkTheFirmwareUpdate: "检查固件升级",
            deleteDevice: "删除设备",
            gotIt: "知道了",
            commandIsNotValid: "命令不在有效期",
            addMemberMax1: "当前已添加",
            addMemberMax2: "个成员，不可再添加",
            commandIsNotValidPleaseSyncTimeWithErrCode: "命令不在有效期，请到“设备信息”页将手机时间同步到锁内后再尝试(错误码：0x03)",
            commandIsNotValidPleaseSyncTime: "命令不在有效期，请到“设备信息”页将手机时间同步到门锁",
            plug_inVersionReleaseHistory: "插件版本发布历史",
            year: "年",
            month: "月",
            day: "日",
            hour: "时",
            minute: "分",
            second: "秒",
            clearPwd: "清空密码",
            clearPwdBtnTitle: "清空",
            sureToClearPwd: "确定要清空密码吗？",
            clearPwdFail: "清空密码失败",
            clearPwdSuccess: "清空密码成功",
            clearPwdPromptText: "执行清空密码操作，会作废所有成员的密码",
            featureSetting: "功能设置",
            commonSetting: "通用设置",
            message: "消息",
            loading: "加载中",
            modifyDeviceName: "修改设备名称",
            locationManagement: "位置管理",
            securitySettings: "安全设置",
            faq: "常见问题",
            feedback: "反馈问题",
            addToDesktop: "添加到桌面",
            delDevice: "删除设备",
            cksytkhysxy: "查看使用条款和隐私协议",
            ifttt: "自动化",
            setting: '设置',
            MemberManagement: '成员管理',
            share: "设备共享",
            mainLine1: "1.建议距离门锁不超过五米，不能有障碍物阻隔",
            mainLine2: "2.无需和门锁进行配对，绑定到和门锁相同账号下即可",
            mainLine3: "3.只能接收门锁状态和通知，无法远程操作门锁",
            gatewayStatus: "网关状态",
            currentVersion: "当前版本",
            online: "在线",
            offline: "离线",
            slasa: "软件许可及服务协议",
            privacyAgreement: "隐私协议"
        }
    });
    exports.default = ZKCommonString;
},10010,[10013],"projects/com.shjszn.gateway.ios/MultiLingualSupport/ZKCommonString.js");
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
},10013,[10074],"projects/com.shjszn.gateway.ios/CommonModules/LocalizedStrings.js");
__d(function (global, _require, module, exports, _dependencyMap) {
	module.exports = _require(_dependencyMap[0]).registerAsset({
		"__packager_asset": true,
		"httpServerLocation": "/assets/projects/com.shjszn.gateway.ios/Resources/gateway",
		"width": 342,
		"height": 257,
		"scales": [1],
		"hash": "39f5b6d05740fe5f0b9e09c4dbe1385e",
		"name": "gateway_icon_xinhaoruo",
		"type": "png"
	});
},10016,[10420],"projects/com.shjszn.gateway.ios/Resources/gateway/gateway_icon_xinhaoruo.png");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.shjszn.gateway.ios/Resources/gateway",
    "width": 246,
    "height": 261,
    "scales": [1],
    "hash": "266fba4719269650b0cdacc50bec3f25",
    "name": "gateway_icon",
    "type": "png"
  });
},10019,[10420],"projects/com.shjszn.gateway.ios/Resources/gateway/gateway_icon.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.shjszn.gateway.ios/Resources/raw",
        "scales": [1],
        "hash": "4b0c372fd246351ae1dd164a8f374186",
        "name": "license_zh",
        "type": "html"
    });
},10022,[10420],"projects/com.shjszn.gateway.ios/Resources/raw/license_zh.html");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.shjszn.gateway.ios/Resources/raw",
        "scales": [1],
        "hash": "88526a1ff8698500adddd3528878792b",
        "name": "privacy_zh",
        "type": "html"
    });
},10025,[10420],"projects/com.shjszn.gateway.ios/Resources/raw/privacy_zh.html");
__d(function (global, _require, module, exports, _dependencyMap) {
	module.exports = _require(_dependencyMap[0]).registerAsset({
		"__packager_asset": true,
		"httpServerLocation": "/assets/projects/com.shjszn.gateway.ios/Resources/gateway",
		"width": 206,
		"height": 160,
		"scales": [1],
		"hash": "43d110b3f09ed9ab12e6d697d64146e3",
		"name": "gateway_icon_wifi",
		"type": "png"
	});
},10028,[10420],"projects/com.shjszn.gateway.ios/Resources/gateway/gateway_icon_wifi.png");
__d(function (global, _require, module, exports, _dependencyMap) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react = _require(_dependencyMap[0]);

  var _react2 = babelHelpers.interopRequireDefault(_react);

  var _reactNative = _require(_dependencyMap[1]);

  var _miot = _require(_dependencyMap[2]);

  var _ui = _require(_dependencyMap[3]);

  var _ZKCommonString = _require(_dependencyMap[4]);

  var _ZKCommonString2 = babelHelpers.interopRequireDefault(_ZKCommonString);

  var BUTTONS = ['测试对话框', '确定'];

  var MoreMenu = function (_React$Component) {
    babelHelpers.inherits(MoreMenu, _React$Component);

    function MoreMenu(props) {
      babelHelpers.classCallCheck(this, MoreMenu);

      var _this = babelHelpers.possibleConstructorReturn(this, (MoreMenu.__proto__ || Object.getPrototypeOf(MoreMenu)).call(this, props));

      var ds = new _reactNative.ListView.DataSource({
        rowHasChanged: function rowHasChanged(r1, r2) {
          return r1 !== r2;
        }
      });

      _this._createMenuData();

      _this.state = {
        dataSource: ds.cloneWithRows(_this._menuData.map(function (o) {
          return o.name;
        }))
      };
      return _this;
    }

    babelHelpers.createClass(MoreMenu, [{
      key: "componentWillMount",
      value: function componentWillMount() {
        this.authorizationCancel = _miot.PackageEvent.packageAuthorizationCancel.addListener(function (event) {
          _miot.Package.exit();
        });
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.authorizationCancel.remove();
      }
    }, {
      key: "_createMenuData",
      value: function _createMenuData() {
        this._menuData = [{
          'name': _ZKCommonString2.default.modifyDeviceName,
          'func': function func() {
            _miot.Host.ui.openChangeDeviceName();
          }
        }, {
          'name': _ZKCommonString2.default.locationManagement,
          'func': function func() {
            _miot.Host.ui.openRoomManagementPage();
          }
        }, {
          'name': _ZKCommonString2.default.share,
          'func': function func() {
            _miot.Host.ui.openShareDevicePage();
          }
        }, {
          'name': _ZKCommonString2.default.checkTheFirmwareUpdate,
          'func': function func() {
            _miot.Host.ui.openDeviceUpgradePage();
          }
        }, {
          'name': _ZKCommonString2.default.securitySettings,
          'func': function func() {
            _miot.Host.ui.openSecuritySetting();
          }
        }, {
          'name': _ZKCommonString2.default.faq,
          'func': function func() {
            _miot.Host.ui.openHelpPage();
          }
        }, {
          'name': _ZKCommonString2.default.feedback,
          'func': function func() {
            _miot.Host.ui.openFeedbackInput();
          }
        }, {
          'name': _ZKCommonString2.default.addToDesktop,
          'func': function func() {
            _miot.Host.ui.openAddToDesktopPage();
          }
        }, {
          'name': _ZKCommonString2.default.cksytkhysxy,
          'func': function func() {
            var licenseURL = _require(_dependencyMap[5]);

            var policyURL = _require(_dependencyMap[6]);

            var slasa = _ZKCommonString2.default.slasa;
            var priAgree = _ZKCommonString2.default.privacyAgreement;

            _miot.Host.ui.privacyAndProtocolReview(slasa, licenseURL, priAgree, policyURL);
          }
        }, {
          'name': _ZKCommonString2.default.delDevice,
          'func': function func() {
            _miot.Host.ui.openDeleteDevice();
          }
        }];

        if (!_miot.Device.isOwner) {
          this._menuData = [{
            'name': _ZKCommonString2.default.modifyDeviceName,
            'func': function func() {
              _miot.Host.ui.openChangeDeviceName();
            }
          }, {
            'name': _ZKCommonString2.default.locationManagement,
            'func': function func() {
              _miot.Host.ui.openRoomManagementPage();
            }
          }, {
            'name': _ZKCommonString2.default.securitySettings,
            'func': function func() {
              _miot.Host.ui.openSecuritySetting();
            }
          }, {
            'name': _ZKCommonString2.default.faq,
            'func': function func() {
              _miot.Host.ui.openHelpPage();
            }
          }, {
            'name': _ZKCommonString2.default.feedback,
            'func': function func() {
              _miot.Host.ui.openFeedbackInput();
            }
          }, {
            'name': _ZKCommonString2.default.addToDesktop,
            'func': function func() {
              _miot.Host.ui.openAddToDesktopPage();
            }
          }, {
            'name': _ZKCommonString2.default.cksytkhysxy,
            'func': function func() {
              var licenseURL = _require(_dependencyMap[5]);

              var policyURL = _require(_dependencyMap[6]);

              var slasa = _ZKCommonString2.default.slasa;
              var priAgree = _ZKCommonString2.default.privacyAgreement;

              _miot.Host.ui.privacyAndProtocolReview(slasa, licenseURL, priAgree, policyURL);
            }
          }, {
            'name': _ZKCommonString2.default.delDevice,
            'func': function func() {
              _miot.Host.ui.openDeleteDevice();
            }
          }];
        }
      }
    }, {
      key: "render",
      value: function render() {
        return _react2.default.createElement(
          _reactNative.View,
          {
            style: styles.container
          },
          _react2.default.createElement(_reactNative.ListView, {
            style: styles.list,
            dataSource: this.state.dataSource,
            renderRow: this._renderRow.bind(this)
          })
        );
      }
    }, {
      key: "_renderRow",
      value: function _renderRow(rowData, sectionID, rowID) {
        var _this2 = this;

        return _react2.default.createElement(
          _reactNative.TouchableHighlight,
          {
            underlayColor: "#838383",
            onPress: function onPress() {
              return _this2._pressRow(rowID);
            }
          },
          _react2.default.createElement(
            _reactNative.View,
            null,
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
                rowData
              ),
              _react2.default.createElement(_reactNative.Image, {
                style: styles.subArrow,
                source: _require(_dependencyMap[7])
              })
            ),
            _react2.default.createElement(_reactNative.View, {
              style: styles.separator
            })
          )
        );
      }
    }, {
      key: "_pressRow",
      value: function _pressRow(rowID) {
        console.log("row" + rowID + "clicked!");

        this._menuData[rowID].func();
      }
    }, {
      key: "onShowDidButtonPress",
      value: function onShowDidButtonPress() {
        this.props.navigation.navigate('helloDeveloper');
      }
    }, {
      key: "showReactART",
      value: function showReactART() {
        this.props.navigation.navigate('helloReactART');
      }
    }, {
      key: "showChart",
      value: function showChart() {
        this.props.navigator.push(ChartDemo.route);
      }
    }, {
      key: "showActionSheet",
      value: function showActionSheet() {
        if (_miot.Host.isIOS) _reactNative.ActionSheetIOS.showActionSheetWithOptions({
          options: BUTTONS,
          destructiveButtonIndex: 1
        }, function (buttonIndex) {});
      }
    }]);
    return MoreMenu;
  }(_react2.default.Component);

  MoreMenu.navigationOptions = function (_ref) {
    var navigation = _ref.navigation;
    return {
      header: _react2.default.createElement(_ui.TitleBarBlack, {
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

  exports.default = MoreMenu;
  ;

  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      borderTopColor: '#f1f1f1',
      borderTopWidth: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      marginBottom: 0,
      marginTop: 0
    },
    rowContainer: {
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
      flex: 1
    },
    subArrow: {
      width: 7,
      height: 14
    },
    separator: {
      height: 1 / _reactNative.PixelRatio.get(),
      backgroundColor: '#e5e5e5',
      marginLeft: 20
    }
  });
},10031,[10297,10033,10074,10230,10010,10022,10025,10034],"projects/com.shjszn.gateway.ios/Main/MoreMenu.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.shjszn.gateway.ios/Resources",
    "width": 22,
    "height": 41,
    "scales": [1],
    "hash": "2a12f112e01f0379378b28ee14a04959",
    "name": "sub_arrow",
    "type": "png"
  });
},10034,[10420],"projects/com.shjszn.gateway.ios/Resources/sub_arrow.png");
require(10120);
require(10001);