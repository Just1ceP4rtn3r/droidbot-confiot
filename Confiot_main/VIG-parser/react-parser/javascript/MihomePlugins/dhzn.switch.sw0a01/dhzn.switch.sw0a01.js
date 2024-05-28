
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[1]);

  var _classCallCheck2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));

  var _createClass2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));

  var _possibleConstructorReturn2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));

  var _getPrototypeOf2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));

  var _inherits2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));

  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[7]));

  var _reactNavigation = _$$_REQUIRE(_dependencyMap[8]);

  var _miot = _$$_REQUIRE(_dependencyMap[9]);

  var _CommonSetting = _$$_REQUIRE(_dependencyMap[10]);

  var _main = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));

  var _setting = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[12]));

  _miot.PackageEvent.packageAuthorizationCancel.addListener(function () {
    _miot.Package.exit();
  });

  _miot.Package.disableAutoCheckUpgrade = true;
  var RootStack = (0, _reactNavigation.createStackNavigator)({
    Main: _main.default,
    Setting: _setting.default,
    MoreSetting: _CommonSetting.MoreSetting,
    FirmwareUpgrade: _CommonSetting.FirmwareUpgrade
  }, {
    initialRouteName: 'Main',
    navigationOptions: {
      header: null
    }
  });

  var App = function (_Component) {
    (0, _inherits2.default)(App, _Component);

    function App() {
      (0, _classCallCheck2.default)(this, App);
      return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(App).apply(this, arguments));
    }

    (0, _createClass2.default)(App, [{
      key: "render",
      value: function render() {
        return _react.default.createElement(RootStack, null);
      }
    }]);
    return App;
  }(_react.Component);

  _miot.Package.entry(App, function () {});
},10001,[14308,14305,14320,14323,14371,14377,14386,10297,10918,10074,10353,10004,10091]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[1]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _classCallCheck2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));

  var _createClass2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));

  var _possibleConstructorReturn2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));

  var _getPrototypeOf2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));

  var _inherits2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));

  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[7]));

  var _reactNative = _$$_REQUIRE(_dependencyMap[8]);

  var _reactNativeLinearGradient = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));

  var _miot = _$$_REQUIRE(_dependencyMap[10]);

  var _bases = _$$_REQUIRE(_dependencyMap[11]);

  var _navigator = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[12]));

  var _switch = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[13]));

  var _scenes = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[14]));

  var LANGUAGE = _miot.Resources.getLanguage();

  var App = function (_Component) {
    (0, _inherits2.default)(App, _Component);

    function App() {
      (0, _classCallCheck2.default)(this, App);
      return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(App).apply(this, arguments));
    }

    (0, _createClass2.default)(App, [{
      key: "_subscribeProps",
      value: function _subscribeProps() {
        this._deviceStatusListener = _miot.DeviceEvent.deviceReceivedMessages.addListener(function (device, messages) {
          if (messages.has("prop.2.1") || messages.has("prop.3.2")) _reactNative.DeviceEventEmitter.emit('propsState', messages);
        });

        _miot.Device.getDeviceWifi().subscribeMessages('prop.2.1', 'prop.3.2').then(function (subcription) {
          msgSubscription = subcription;
        }).catch(console.log);
      }
    }, {
      key: "initProtocol",
      value: function initProtocol() {
        var privacyURL = LANGUAGE === 'zh' ? _$$_REQUIRE(_dependencyMap[15]) : _$$_REQUIRE(_dependencyMap[16]);
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
          var config;

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
        return _react.default.createElement(_reactNativeLinearGradient.default, {
          style: styles.main,
          colors: ['#D8E8F7', '#86ACD7']
        }, _react.default.createElement(_navigator.default, {
          navigation: this.props.navigation,
          barColor: 'black'
        }), _react.default.createElement(_reactNative.View, {
          style: styles.content
        }, _react.default.createElement(_switch.default, null), _miot.Device.isShared || _react.default.createElement(_scenes.default, null)));
      }
    }]);
    return App;
  }(_react.Component);

  exports.default = App;

  var _Dimensions$get = _reactNative.Dimensions.get('window'),
      width = _Dimensions$get.width,
      height = _Dimensions$get.height;

  var styles = _reactNative.StyleSheet.create({
    main: {
      width: width,
      flex: 1
    },
    content: {
      width: width,
      height: height - 100,
      alignItems: 'center',
      justifyContent: 'center'
    }
  });
},10004,[14308,14305,14320,14323,14371,14377,14386,10297,10033,14299,10074,10007,10016,10019,10082,10010,10013]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initProtocol = initProtocol;

  var _miot = _$$_REQUIRE(_dependencyMap[0]);

  var LANGUAGE = _miot.Resources.getLanguage();

  function initProtocol() {
    var privacyURL = LANGUAGE === 'zh' ? _$$_REQUIRE(_dependencyMap[1]) : _$$_REQUIRE(_dependencyMap[2]);
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
      var config;

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
},10007,[10074,10010,10013]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  module.exports = _$$_REQUIRE(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.dhzn.switch.sw0a01/protocol",
    "scales": [1],
    "hash": "ff911b5c5e91cebc545a2cec92fb0506",
    "name": "dhzn_policy_zh",
    "type": "html"
  });
},10010,[10420]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  module.exports = _$$_REQUIRE(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.dhzn.switch.sw0a01/protocol",
    "scales": [1],
    "hash": "2b9f30d3b7d002ce0a39c5f00bf1012e",
    "name": "dhzn_policy_en",
    "type": "html"
  });
},10013,[10420]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[1]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _classCallCheck2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));

  var _createClass2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));

  var _possibleConstructorReturn2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));

  var _getPrototypeOf2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));

  var _inherits2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));

  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[7]));

  var _miot = _$$_REQUIRE(_dependencyMap[8]);

  var _ui = _$$_REQUIRE(_dependencyMap[9]);

  var LANGUAGE = _miot.Resources.getLanguage();

  function goback(navigation) {
    if (navigation.state.routeName === 'Main') {
      _miot.Package.exit();
    } else if (navigation.state.routeName === 'Setting') {
      navigation.navigate('Main', {
        color: 'black'
      });
    } else {
      navigation.goBack();
    }
  }

  function gosetting(navigation) {
    navigation.navigate('Setting', {
      color: 'black',
      title: LANGUAGE === 'zh' ? '设置' : 'setting'
    });
  }

  var _default = function (_Component) {
    (0, _inherits2.default)(_default, _Component);

    function _default(props) {
      var _this;

      (0, _classCallCheck2.default)(this, _default);
      _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(_default).call(this, props));
      _this.state = {
        DeviceNeedUpgrade: null
      };
      return _this;
    }

    (0, _createClass2.default)(_default, [{
      key: "checkFirmwareUpdate",
      value: function checkFirmwareUpdate() {
        var _this2 = this;

        _miot.Device.checkFirmwareUpdateAndAlert().then(function (res) {
          if (_this2.props.navigation.state.routeName !== 'Main') return false;

          _this2.setState({
            DeviceNeedUpgrade: res.needUpgrade
          });
        }).catch(function (err) {
          return console.log('checkFirmwareUpdateAndAlert.error:', err);
        });
      }
    }, {
      key: "componentWillMount",
      value: function componentWillMount() {
        var _this3 = this;

        this.checkFirmwareUpdate();
        this.subscription = _miot.DeviceEvent.deviceNameChanged.addListener(function (device) {
          _this3.props.navigation.setParams({
            title: device.name
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
        var navigation = this.props.navigation;
        var TitleBar = navigation.getParam('color') === 'white' ? _ui.TitleBarWhite : _ui.TitleBarBlack;
        var title = navigation.getParam('title');
        return _react.default.createElement(TitleBar, {
          title: title || _miot.Device.name,
          onPressLeft: function onPressLeft() {
            goback(navigation);
          },
          onPressRight: navigation.state.routeName === 'Main' ? function () {
            gosetting(navigation);
          } : null,
          showDot: navigation.state.routeName === 'Main' ? this.state.DeviceNeedUpgrade : undefined,
          style: {
            zIndex: 999
          }
        });
      }
    }]);
    return _default;
  }(_react.Component);

  exports.default = _default;
},10016,[14308,14305,14320,14323,14371,14377,14386,10297,10074,10230]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[1]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _classCallCheck2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));

  var _createClass2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));

  var _possibleConstructorReturn2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));

  var _getPrototypeOf2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));

  var _inherits2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));

  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[7]));

  var _reactNative = _$$_REQUIRE(_dependencyMap[8]);

  var _miot = _$$_REQUIRE(_dependencyMap[9]);

  var _consts = _$$_REQUIRE(_dependencyMap[10]);

  var App = function (_Component) {
    (0, _inherits2.default)(App, _Component);

    function App(props) {
      var _this;

      (0, _classCallCheck2.default)(this, App);
      _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(App).call(this, props));
      _this.state = {
        isOn: false
      };
      return _this;
    }

    (0, _createClass2.default)(App, [{
      key: "getPropertyValue",
      value: function getPropertyValue() {
        var _this2 = this;

        _miot.Service.spec.getPropertiesValue([{
          did: _miot.Device.deviceID,
          siid: 2,
          piid: 1
        }]).then(function (res) {
          _this2.setState({
            isOn: res[0].value
          });

          _reactNative.DeviceEventEmitter.emit('isOn', res[0].value);
        }).catch(console.log);
      }
    }, {
      key: "sendPropertiesValue",
      value: function sendPropertiesValue() {
        var _this3 = this;

        var value = !this.state.isOn;

        _miot.Service.spec.setPropertiesValue([{
          did: _miot.Device.deviceID,
          siid: 2,
          piid: 1,
          value: value
        }]).then(function (res) {
          if (res[0]['code'] < 0) return;

          _this3.setState({
            isOn: value
          });

          _reactNative.DeviceEventEmitter.emit('isOn', value);
        }).catch(console.log);
      }
    }, {
      key: "componentWillMount",
      value: function componentWillMount() {
        var _this4 = this;

        this.getPropertyValue();
        this.listener = _reactNative.DeviceEventEmitter.addListener('propsState', function (message) {
          if (message.has('prop.2.1')) {
            _this4.getPropertyValue();
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
        var isOn = this.state.isOn;
        return _react.default.createElement(_reactNative.View, {
          style: styles.main
        }, _react.default.createElement(_reactNative.Text, {
          style: styles.txt
        }, isOn ? _consts.LocalizedString.powerOn() : _consts.LocalizedString.powerOff()), _react.default.createElement(_reactNative.TouchableOpacity, {
          style: styles.btn,
          onPress: this.sendPropertiesValue.bind(this)
        }, _react.default.createElement(_reactNative.ImageBackground, {
          style: styles.btn,
          source: _$$_REQUIRE(_dependencyMap[11])
        }, _react.default.createElement(_reactNative.Image, {
          style: [styles.icon, {
            top: isOn ? 10 : distance
          }],
          source: isOn ? _$$_REQUIRE(_dependencyMap[12]) : _$$_REQUIRE(_dependencyMap[13])
        }))), _react.default.createElement(_reactNative.Text, {
          style: styles.txt
        }, _miot.Device.name));
      }
    }]);
    return App;
  }(_react.Component);

  exports.default = App;

  var _Dimensions$get = _reactNative.Dimensions.get('window'),
      width = _Dimensions$get.width;

  var btnW = width / 3;
  var distance = parseInt(btnW * 1.5 - btnW * 0.7 - 20);

  var styles = _reactNative.StyleSheet.create({
    main: {
      width: width,
      height: width,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    btn: {
      width: btnW,
      height: btnW * 1.5,
      position: 'relative'
    },
    icon: {
      width: btnW * 0.7,
      height: btnW * 0.7,
      marginLeft: btnW * 0.7 / 2 * -1,
      position: 'absolute',
      left: '50%'
    },
    txt: {
      width: width,
      height: 50,
      lineHeight: 50,
      textAlign: 'center',
      color: '#666',
      fontSize: 14
    }
  });
},10019,[14308,14305,14320,14323,14371,14377,14386,10297,10033,10074,10022,10073,10076,10079]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NOOP = NOOP;
  exports.formatTimerTime = formatTimerTime;
  exports.fixNum = fixNum;
  exports.adjustSize = adjustSize;
  exports.getInstanceFromCache = getInstanceFromCache;
  exports.getInstanceFromNet = getInstanceFromNet;
  exports.getDefinitionWithKeyFromInstance = getDefinitionWithKeyFromInstance;
  exports.TemperatureKey = exports.BrightnessKey = exports.SwitchKey = exports.PROTOCOLCACHEKEY = exports.INSTANCECACHEKEY = exports.DeviceID = exports.LocalizedString = exports.HEIGHT = exports.WIDTH = undefined;

  var _objectSpread2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));

  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);

  var _miot = _$$_REQUIRE(_dependencyMap[3]);

  var _i18n = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));

  var window = _reactNative.Dimensions.get('window');

  var WIDTH = window.width;
  exports.WIDTH = WIDTH;
  var HEIGHT = window.height;
  exports.HEIGHT = HEIGHT;

  _miot.Resources.registerStrings(_i18n.default);

  var LocalizedString = _miot.Resources.strings;
  exports.LocalizedString = LocalizedString;
  var DeviceID = _miot.Device.deviceID;
  exports.DeviceID = DeviceID;
  var INSTANCECACHEKEY = 'INSTANCECACHE:' + DeviceID;
  exports.INSTANCECACHEKEY = INSTANCECACHEKEY;
  var PROTOCOLCACHEKEY = 'PROTOCOLCACHE:' + DeviceID;
  exports.PROTOCOLCACHEKEY = PROTOCOLCACHEKEY;
  var SwitchKey = 'urn:miot-spec-v2:property:on:00000006';
  exports.SwitchKey = SwitchKey;
  var BrightnessKey = 'urn:miot-spec-v2:property:brightness:0000000D';
  exports.BrightnessKey = BrightnessKey;
  var TemperatureKey = 'urn:miot-spec-v2:property:color-temperature:0000000F';
  exports.TemperatureKey = TemperatureKey;

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
    for (var _len = arguments.length, keys = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
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

          ret[key] = (0, _objectSpread2.default)({}, prop, {
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
},10022,[14305,14314,10033,10074,10025]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _defineProperty2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));

  var _miot = _$$_REQUIRE(_dependencyMap[2]);

  var _resources = _$$_REQUIRE(_dependencyMap[3]);

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
      noSharedPermission: K.keyword40
    };
  }

  function getI18nKeywords(language) {
    switch (language) {
      case _resources.Language.zh:
        return _$$_REQUIRE(_dependencyMap[4]);

      case _resources.Language.zh_tw:
        return _$$_REQUIRE(_dependencyMap[5]);

      case _resources.Language.zh_hk:
        return _$$_REQUIRE(_dependencyMap[6]);

      case _resources.Language.en:
        return _$$_REQUIRE(_dependencyMap[7]);

      case _resources.Language.ko:
        return _$$_REQUIRE(_dependencyMap[8]);

      case _resources.Language.ru:
        return _$$_REQUIRE(_dependencyMap[9]);

      case _resources.Language.es:
        return _$$_REQUIRE(_dependencyMap[10]);

      case _resources.Language.fr:
        return _$$_REQUIRE(_dependencyMap[11]);

      case _resources.Language.it:
        return _$$_REQUIRE(_dependencyMap[12]);

      case _resources.Language.de:
        return _$$_REQUIRE(_dependencyMap[13]);

      case _resources.Language.id:
        return _$$_REQUIRE(_dependencyMap[14]);

      case _resources.Language.pl:
        return _$$_REQUIRE(_dependencyMap[15]);

      case _resources.Language.vi:
        return _$$_REQUIRE(_dependencyMap[16]);

      case _resources.Language.ja:
        return _$$_REQUIRE(_dependencyMap[17]);

      case _resources.Language.th:
        return _$$_REQUIRE(_dependencyMap[18]);

      default:
        return _$$_REQUIRE(_dependencyMap[4]);
    }
  }

  var _default = (0, _defineProperty2.default)({}, LANGUAGE, getLocalizedString(LANGUAGE));

  exports.default = _default;
},10025,[14305,14317,10074,10077,10028,10031,10034,10037,10040,10043,10046,10049,10052,10055,10058,10061,10064,10067,10070]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
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
    keyword40: '被共享设备无此权限'
  };
},10028,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
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
    keyword40: 'Shared device has no permission'
  };
},10031,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
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
    keyword40: 'Shared device has no permission'
  };
},10034,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
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
    keyword40: 'Shared device has no permission'
  };
},10037,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
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
},10040,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
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
},10043,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
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
},10046,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
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
},10049,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
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
},10052,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
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
},10055,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
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
},10058,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
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
},10061,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
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
},10064,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
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
},10067,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
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
},10070,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  module.exports = _$$_REQUIRE(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.dhzn.switch.sw0a01/resources",
    "width": 400,
    "height": 600,
    "scales": [1],
    "hash": "ade4c3a5411684e82d43e6fd3e9760de",
    "name": "btn_icon_button",
    "type": "png"
  });
},10073,[10420]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  module.exports = _$$_REQUIRE(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.dhzn.switch.sw0a01/resources",
    "width": 280,
    "height": 280,
    "scales": [1],
    "hash": "9a76dc3656b091842a12f27816a3e7c9",
    "name": "btn_icon_on",
    "type": "png"
  });
},10076,[10420]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  module.exports = _$$_REQUIRE(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.dhzn.switch.sw0a01/resources",
    "width": 280,
    "height": 280,
    "scales": [1],
    "hash": "7a531cad0c02c15b7f977aae0979d13f",
    "name": "btn_icon_off",
    "type": "png"
  });
},10079,[10420]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[1]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _extends2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));

  var _classCallCheck2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));

  var _createClass2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));

  var _possibleConstructorReturn2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));

  var _getPrototypeOf2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));

  var _inherits2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));

  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[8]));

  var _miot = _$$_REQUIRE(_dependencyMap[9]);

  var _reactNative = _$$_REQUIRE(_dependencyMap[10]);

  var LANGUAGE = _miot.Resources.getLanguage();

  var App = function (_Component) {
    (0, _inherits2.default)(App, _Component);

    function App(props) {
      var _this;

      (0, _classCallCheck2.default)(this, App);
      _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(App).call(this, props));
      _this.SwitchBaseProps = {
        siid: 2,
        piid: 1
      };
      _this.state = {
        isOn: false
      };
      return _this;
    }

    (0, _createClass2.default)(App, [{
      key: "_setTime",
      value: function _setTime() {
        var switchOnProps = (0, _extends2.default)({}, this.SwitchBaseProps, {
          value: true,
          did: _miot.Device.deviceID
        });
        var switchOffProps = (0, _extends2.default)({}, this.SwitchBaseProps, {
          value: false,
          did: _miot.Device.deviceID
        });
        var options = {
          onMethod: "set_properties",
          onParam: [switchOnProps],
          offMethod: "set_properties",
          offParam: [switchOffProps],
          displayName: "\u5B9A\u65F6",
          identify: _miot.Device.deviceID + "-set-time-light"
        };

        _miot.Host.ui.openTimerSettingPageWithOptions(options);
      }
    }, {
      key: "_timer",
      value: function _timer() {
        var onParam = (0, _extends2.default)({}, this.SwitchBaseProps, {
          value: true,
          did: _miot.Device.deviceID
        });
        var offParam = (0, _extends2.default)({}, this.SwitchBaseProps, {
          value: false,
          did: _miot.Device.deviceID
        });
        var options = {
          onMethod: "set_properties",
          offMethod: 'set_properties',
          onParam: [onParam],
          offParam: [offParam],
          identify: _miot.Device.deviceID + "-timer-light",
          displayName: "\u5012\u8BA1\u65F6"
        };

        _miot.Host.ui.openCountDownPage(this.state.isOn, options);
      }
    }, {
      key: "componentWillMount",
      value: function componentWillMount() {
        var _this2 = this;

        this.listener = _reactNative.DeviceEventEmitter.addListener('isOn', function (state) {
          _this2.setState({
            isOn: state
          });
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
        return _react.default.createElement(_reactNative.View, {
          style: styles.timers
        }, _react.default.createElement(_reactNative.View, null, _react.default.createElement(_reactNative.TouchableOpacity, {
          style: styles.btn,
          onPress: this._setTime.bind(this)
        }, _react.default.createElement(_reactNative.Image, {
          style: styles.icon,
          source: _$$_REQUIRE(_dependencyMap[11])
        })), _react.default.createElement(_reactNative.Text, {
          style: styles.btnTxt
        }, LANGUAGE === 'zh' ? '定时' : 'timing')), _react.default.createElement(_reactNative.View, null, _react.default.createElement(_reactNative.TouchableOpacity, {
          style: styles.btn,
          onPress: this._timer.bind(this)
        }, _react.default.createElement(_reactNative.Image, {
          style: styles.icon,
          source: _$$_REQUIRE(_dependencyMap[12])
        })), _react.default.createElement(_reactNative.Text, {
          style: styles.btnTxt
        }, LANGUAGE === 'zh' ? '倒计时' : 'count')));
      }
    }]);
    return App;
  }(_react.Component);

  exports.default = App;

  var _Dimensions$get = _reactNative.Dimensions.get('window'),
      width = _Dimensions$get.width;

  var styles = _reactNative.StyleSheet.create({
    timers: {
      opacity: 0.6,
      width: width * 0.8,
      height: width * 0.5,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-around'
    },
    btn: {
      width: width * 0.14,
      height: width * 0.14,
      borderWidth: 1.4,
      borderColor: '#fff',
      borderRadius: width,
      justifyContent: 'center',
      alignItems: 'center'
    },
    icon: {
      width: width * 0.1,
      height: width * 0.1
    },
    btnTxt: {
      width: '100%',
      marginTop: 6,
      textAlign: 'center',
      color: '#fff'
    }
  });
},10082,[14308,14305,14344,14320,14323,14371,14377,14386,10297,10074,10033,10085,10088]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  module.exports = _$$_REQUIRE(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.dhzn.switch.sw0a01/resources",
    "width": 200,
    "height": 200,
    "scales": [1],
    "hash": "249a484a90185aa34d6b23adce8bf37d",
    "name": "icon_timing",
    "type": "png"
  });
},10085,[10420]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  module.exports = _$$_REQUIRE(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.dhzn.switch.sw0a01/resources",
    "width": 200,
    "height": 200,
    "scales": [1],
    "hash": "8f67c75c1fef7ddf486cd7739173fcff",
    "name": "icon_countdown",
    "type": "png"
  });
},10088,[10420]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[1]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _classCallCheck2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));

  var _createClass2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));

  var _possibleConstructorReturn2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));

  var _getPrototypeOf2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));

  var _inherits2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));

  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[7]));

  var _CommonSetting = _$$_REQUIRE(_dependencyMap[8]);

  var _reactNative = _$$_REQUIRE(_dependencyMap[9]);

  var _miot = _$$_REQUIRE(_dependencyMap[10]);

  var _navigator = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));

  var _function_setting = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[12]));

  var LANGUAGE = _miot.Resources.getLanguage();

  var App = function (_Component) {
    (0, _inherits2.default)(App, _Component);

    function App() {
      (0, _classCallCheck2.default)(this, App);
      return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(App).apply(this, arguments));
    }

    (0, _createClass2.default)(App, [{
      key: "render",
      value: function render() {
        var first_options = _CommonSetting.SETTING_KEYS.first_options,
            second_options = _CommonSetting.SETTING_KEYS.second_options;
        var firstOptions = [first_options.SHARE, first_options.IFTTT, first_options.FIRMWARE_UPGRADE];
        var secondOptions = [second_options.SECURITY, second_options.FEEDBACK, second_options.TIMEZONE, second_options.ADD_TO_DESKTOP];
        var extraOptions = {
          showUpgrade: true,
          option: {
            privacyURL: LANGUAGE === 'zh' ? _$$_REQUIRE(_dependencyMap[13]) : _$$_REQUIRE(_dependencyMap[14]),
            hideAgreement: true,
            hideUserExperiencePlan: true
          }
        };
        return _react.default.createElement(_reactNative.View, {
          style: styles.main
        }, _react.default.createElement(_navigator.default, {
          navigation: this.props.navigation
        }), _react.default.createElement(_reactNative.ScrollView, null, _miot.Device.isShared || _react.default.createElement(_function_setting.default, {
          navigation: this.props.navigation
        }), _react.default.createElement(_CommonSetting.CommonSetting, {
          navigation: this.props.navigation,
          firstOptions: firstOptions,
          secondOptions: secondOptions,
          extraOptions: extraOptions
        })));
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
      backgroundColor: '#F7F7F7',
      flex: 1,
      flexDirection: 'column'
    }
  });
},10091,[14308,14305,14320,14323,14371,14377,14386,10297,10353,10033,10074,10016,10094,10010,10013]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[1]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _classCallCheck2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));

  var _createClass2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));

  var _possibleConstructorReturn2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));

  var _getPrototypeOf2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));

  var _inherits2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));

  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[7]));

  var _reactNative = _$$_REQUIRE(_dependencyMap[8]);

  var _miot = _$$_REQUIRE(_dependencyMap[9]);

  var _ListItem = _$$_REQUIRE(_dependencyMap[10]);

  var _Dialog = _$$_REQUIRE(_dependencyMap[11]);

  var _consts = _$$_REQUIRE(_dependencyMap[12]);

  var LANGUAGE = _miot.Resources.getLanguage();

  var App = function (_Component) {
    (0, _inherits2.default)(App, _Component);

    function App(props) {
      var _this;

      (0, _classCallCheck2.default)(this, App);
      _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(App).call(this, props));
      _this.state = {
        visible: false,
        check: 0
      };
      return _this;
    }

    (0, _createClass2.default)(App, [{
      key: "sendPropertiesValue",
      value: function sendPropertiesValue(value) {
        _miot.Service.spec.setPropertiesValue([{
          did: _miot.Device.deviceID,
          siid: 3,
          piid: 2,
          value: value
        }]).then(function (res) {
          if (res[0]['code'] < 0) return;
        }).catch(console.log);
      }
    }, {
      key: "getPropertyValue",
      value: function getPropertyValue() {
        var _this2 = this;

        _miot.Service.spec.getPropertiesValue([{
          did: _miot.Device.deviceID,
          siid: 3,
          piid: 2
        }]).then(function (res) {
          _this2.setState({
            check: res[0].value - 1
          });
        }).catch(console.log);
      }
    }, {
      key: "componentWillMount",
      value: function componentWillMount() {
        var _this3 = this;

        this.getPropertyValue();
        this.listener = _reactNative.DeviceEventEmitter.addListener('propsState', function (message) {
          if (message.has('prop.3.2')) {
            _this3.getPropertyValue();
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

        var checks = [LANGUAGE === 'zh' ? '开启' : 'open', LANGUAGE === 'zh' ? '关闭' : 'close', LANGUAGE === 'zh' ? '恢复断电前状态' : 'Restore the state before power failure'];
        return _react.default.createElement(_reactNative.View, {
          style: styles.setting
        }, _react.default.createElement(_reactNative.View, {
          style: styles.title
        }, _react.default.createElement(_reactNative.Text, {
          style: styles.tit
        }, _consts.LocalizedString.featureSetting())), _react.default.createElement(_ListItem.ListItem, {
          title: LANGUAGE === 'zh' ? '通电后默认状态' : 'Default state after power on',
          onPress: function onPress(_) {
            return _this4.setState({
              visible: true
            });
          }
        }), _react.default.createElement(_Dialog.AbstractDialog, {
          visible: this.state.visible,
          showTitle: false,
          onDismiss: function onDismiss(_) {
            return _this4.setState({
              visible: false
            });
          },
          buttons: [{
            text: LANGUAGE === 'zh' ? '取消' : 'cancel',
            callback: function callback(_) {
              return _this4.setState({
                visible: false
              });
            }
          }, {
            text: LANGUAGE === 'zh' ? '确认' : 'confirm',
            callback: function callback(_) {
              _this4.sendPropertiesValue(_this4.state.check + 1);

              _this4.setState({
                visible: false
              });
            }
          }]
        }, _react.default.createElement(_reactNative.View, {
          style: styles.dialog
        }, _react.default.createElement(_reactNative.View, {
          style: styles.dialogTitle
        }, _react.default.createElement(_reactNative.Text, {
          style: styles.dialogTit
        }, LANGUAGE === 'zh' ? '通电反应' : 'Energized response'), _react.default.createElement(_reactNative.Text, {
          style: styles.dialogSubTitle
        }, LANGUAGE === 'zh' ? '设备由于停电或关闭传统开关等原因断电后,再次通电时开关的状态' : 'The state of the switch when the device is powered off after a power failure due to a power outage or a traditional switch off')), _react.default.createElement(_reactNative.View, {
          style: styles.centent
        }, checks.map(function (val, i) {
          return _react.default.createElement(_reactNative.TouchableOpacity, {
            style: styles.option,
            key: i,
            onPress: function onPress(_) {
              return _this4.setState({
                check: i
              });
            }
          }, _react.default.createElement(_reactNative.Image, {
            style: styles.check,
            source: _this4.state.check === i ? _$$_REQUIRE(_dependencyMap[13]) : _$$_REQUIRE(_dependencyMap[14])
          }), _react.default.createElement(_reactNative.Text, {
            style: styles.text
          }, val));
        })))));
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
    },
    dialog: {
      width: '100%',
      borderRadius: 20
    },
    dialogTitle: {
      width: '100%',
      marginBottom: 15
    },
    dialogTit: {
      width: '100%',
      lineHeight: 30,
      paddingTop: 15,
      paddingLeft: 15,
      color: '#000',
      fontSize: 18
    },
    dialogSubTitle: {
      width: '100%',
      paddingLeft: 15,
      paddingRight: 15,
      color: '#666',
      fontSize: 12
    },
    centent: {
      width: '100%',
      paddingLeft: 15,
      paddingRight: 15
    },
    option: {
      width: '100%',
      height: 50,
      borderBottomWidth: 0.3,
      borderColor: '#f1f1f1',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    check: {
      width: 30,
      height: 30,
      marginRight: 15
    }
  });
},10094,[14308,14305,14320,14323,14371,14377,14386,10297,10033,10074,10338,10755,10022,10097,10100]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  module.exports = _$$_REQUIRE(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.dhzn.switch.sw0a01/resources",
    "width": 200,
    "height": 200,
    "scales": [1],
    "hash": "8d1682bf6829fb50e57a5314689a86b8",
    "name": "icon_check",
    "type": "png"
  });
},10097,[10420]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  module.exports = _$$_REQUIRE(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.dhzn.switch.sw0a01/resources",
    "width": 200,
    "height": 200,
    "scales": [1],
    "hash": "72688982543eb508b994e73d9bb3f32a",
    "name": "icon_uncheck",
    "type": "png"
  });
},10100,[10420]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var start = Date.now();

  _$$_REQUIRE(_dependencyMap[0]);

  _$$_REQUIRE(_dependencyMap[1]);

  _$$_REQUIRE(_dependencyMap[2]);

  _$$_REQUIRE(_dependencyMap[3]);

  _$$_REQUIRE(_dependencyMap[4]);

  _$$_REQUIRE(_dependencyMap[5]);

  _$$_REQUIRE(_dependencyMap[6]);

  _$$_REQUIRE(_dependencyMap[7]);

  _$$_REQUIRE(_dependencyMap[8]);

  _$$_REQUIRE(_dependencyMap[9]);

  _$$_REQUIRE(_dependencyMap[10]);

  var GlobalPerformanceLogger = _$$_REQUIRE(_dependencyMap[11]);

  GlobalPerformanceLogger.markPoint('initializeCore_start', GlobalPerformanceLogger.currentTimestamp() - (Date.now() - start));
  GlobalPerformanceLogger.markPoint('initializeCore_end');
},10120,[14449,14452,14455,14470,14479,14485,14500,14524,14533,14536,14560,14548]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }

  module.exports = _interopRequireDefault;
},14305,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _typeof = _$$_REQUIRE(_dependencyMap[0]);

  function _getRequireWildcardCache() {
    if (typeof WeakMap !== "function") return null;
    var cache = new WeakMap();

    _getRequireWildcardCache = function _getRequireWildcardCache() {
      return cache;
    };

    return cache;
  }

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    }

    if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
      return {
        "default": obj
      };
    }

    var cache = _getRequireWildcardCache();

    if (cache && cache.has(obj)) {
      return cache.get(obj);
    }

    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }

    newObj["default"] = obj;

    if (cache) {
      cache.set(obj, newObj);
    }

    return newObj;
  }

  module.exports = _interopRequireWildcard;
},14308,[14311]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof (typeof Symbol === "function" ? Symbol.iterator : "@@iterator") === "symbol") {
      module.exports = _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      module.exports = _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== (typeof Symbol === "function" ? Symbol.prototype : "@@prototype") ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  module.exports = _typeof;
},14311,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var defineProperty = _$$_REQUIRE(_dependencyMap[0]);

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(Object(source));

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  module.exports = _objectSpread;
},14314,[14317]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  module.exports = _defineProperty;
},14317,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  module.exports = _classCallCheck;
},14320,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  module.exports = _createClass;
},14323,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var invariant = function invariant(condition, format, a, b, c, d, e, f) {
    if (!condition) {
      var error;

      if (format === undefined) {
        error = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
      } else {
        var args = [a, b, c, d, e, f];
        var argIndex = 0;
        error = new Error(format.replace(/%s/g, function () {
          return args[argIndex++];
        }));
        error.name = 'Invariant Violation';
      }

      error.framesToPop = 1;
      throw error;
    }
  };

  module.exports = invariant;
},14326,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var warning = _$$_REQUIRE(_dependencyMap[0]);

  var warnedKeys = {};

  function warnOnce(key, message) {
    if (warnedKeys[key]) {
      return;
    }

    warning(false, message);
    warnedKeys[key] = true;
  }

  module.exports = warnOnce;
},14329,[14332]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var emptyFunction = _$$_REQUIRE(_dependencyMap[0]);

  var warning = emptyFunction;
  module.exports = warning;
},14332,[14335]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  function makeEmptyFunction(arg) {
    return function () {
      return arg;
    };
  }

  var emptyFunction = function emptyFunction() {};

  emptyFunction.thatReturns = makeEmptyFunction;
  emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
  emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
  emptyFunction.thatReturnsNull = makeEmptyFunction(null);

  emptyFunction.thatReturnsThis = function () {
    return this;
  };

  emptyFunction.thatReturnsArgument = function (arg) {
    return arg;
  };

  module.exports = emptyFunction;
},14335,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var TurboModuleRegistry = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1]));

  var _default = TurboModuleRegistry.get('AccessibilityInfo');

  exports.default = _default;
},14338,[14308,14341]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.get = get;
  exports.getEnforcing = getEnforcing;

  var _invariant = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));

  var NativeModules = _$$_REQUIRE(_dependencyMap[2]);

  var turboModuleProxy = global.__turboModuleProxy;

  function get(name) {
    if (!global.RN$Bridgeless) {
      var legacyModule = NativeModules[name];

      if (legacyModule != null) {
        return legacyModule;
      }
    }

    if (turboModuleProxy != null) {
      var module = turboModuleProxy(name);
      return module;
    }

    return null;
  }

  function getEnforcing(name) {
    var module = get(name);
    (0, _invariant.default)(module != null, "TurboModuleRegistry.getEnforcing(...): '" + name + "' could not be found. " + 'Verify that a module by this name is registered in the native binary.');
    return module;
  }
},14341,[14305,14326,10042]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  function _extends() {
    module.exports = _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  module.exports = _extends;
},14344,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var arrayWithHoles = _$$_REQUIRE(_dependencyMap[0]);

  var iterableToArrayLimit = _$$_REQUIRE(_dependencyMap[1]);

  var nonIterableRest = _$$_REQUIRE(_dependencyMap[2]);

  function _slicedToArray(arr, i) {
    return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest();
  }

  module.exports = _slicedToArray;
},14347,[14350,14353,14356]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  module.exports = _arrayWithHoles;
},14350,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  function _iterableToArrayLimit(arr, i) {
    if (!((typeof Symbol === "function" ? Symbol.iterator : "@@iterator") in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
      return;
    }

    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  module.exports = _iterableToArrayLimit;
},14353,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  module.exports = _nonIterableRest;
},14356,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var arrayWithoutHoles = _$$_REQUIRE(_dependencyMap[0]);

  var iterableToArray = _$$_REQUIRE(_dependencyMap[1]);

  var nonIterableSpread = _$$_REQUIRE(_dependencyMap[2]);

  function _toConsumableArray(arr) {
    return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
  }

  module.exports = _toConsumableArray;
},14359,[14362,14365,14368]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    }
  }

  module.exports = _arrayWithoutHoles;
},14362,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  function _iterableToArray(iter) {
    if ((typeof Symbol === "function" ? Symbol.iterator : "@@iterator") in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  module.exports = _iterableToArray;
},14365,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  module.exports = _nonIterableSpread;
},14368,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _typeof = _$$_REQUIRE(_dependencyMap[0]);

  var assertThisInitialized = _$$_REQUIRE(_dependencyMap[1]);

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }

    return assertThisInitialized(self);
  }

  module.exports = _possibleConstructorReturn;
},14371,[14311,14374]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  function _assertThisInitialized(self) {
    if (self === undefined) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  module.exports = _assertThisInitialized;
},14374,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  function _getPrototypeOf(o) {
    module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  module.exports = _getPrototypeOf;
},14377,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var superPropBase = _$$_REQUIRE(_dependencyMap[0]);

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      module.exports = _get = Reflect.get;
    } else {
      module.exports = _get = function _get(target, property, receiver) {
        var base = superPropBase(target, property);
        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  module.exports = _get;
},14380,[14383]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var getPrototypeOf = _$$_REQUIRE(_dependencyMap[0]);

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  module.exports = _superPropBase;
},14383,[14377]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var setPrototypeOf = _$$_REQUIRE(_dependencyMap[0]);

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) setPrototypeOf(subClass, superClass);
  }

  module.exports = _inherits;
},14386,[14389]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  function _setPrototypeOf(o, p) {
    module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  module.exports = _setPrototypeOf;
},14389,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  module.exports = {
    getViewManagerConfig: function getViewManagerConfig(viewManagerName) {
      console.warn('Attempting to get config for view manager: ' + viewManagerName);
      return null;
    },
    getConstants: function getConstants() {
      return {};
    },
    getConstantsForViewManager: function getConstantsForViewManager(viewManagerName) {},
    getDefaultEventTypes: function getDefaultEventTypes() {
      return [];
    },
    playTouchSound: function playTouchSound() {},
    lazilyLoadView: function lazilyLoadView(name) {},
    createView: function createView(reactTag, viewName, rootTag, props) {},
    updateView: function updateView(reactTag, viewName, props) {},
    focus: function focus(reactTag) {},
    blur: function blur(reactTag) {},
    findSubviewIn: function findSubviewIn(reactTag, point, callback) {},
    dispatchViewManagerCommand: function dispatchViewManagerCommand(reactTag, commandID, commandArgs) {},
    measure: function measure(reactTag, callback) {},
    measureInWindow: function measureInWindow(reactTag, callback) {},
    viewIsDescendantOf: function viewIsDescendantOf(reactTag, ancestorReactTag, callback) {},
    measureLayout: function measureLayout(reactTag, ancestorReactTag, errorCallback, callback) {},
    measureLayoutRelativeToParent: function measureLayoutRelativeToParent(reactTag, errorCallback, callback) {},
    setJSResponder: function setJSResponder(reactTag, blockNativeResponder) {},
    clearJSResponder: function clearJSResponder() {},
    configureNextLayoutAnimation: function configureNextLayoutAnimation(config, callback, errorCallback) {},
    removeSubviewsFromContainerWithID: function removeSubviewsFromContainerWithID(containerID) {},
    replaceExistingNonRootView: function replaceExistingNonRootView(reactTag, newReactTag) {},
    setChildren: function setChildren(containerTag, reactTags) {},
    manageChildren: function manageChildren(containerTag, moveFromIndices, moveToIndices, addChildReactTags, addAtIndices, removeAtIndices) {},
    setLayoutAnimationEnabledExperimental: function setLayoutAnimationEnabledExperimental(enabled) {},
    sendAccessibilityEvent: function sendAccessibilityEvent(reactTag, eventType) {},
    showPopupMenu: function showPopupMenu(reactTag, items, error, success) {},
    dismissPopupMenu: function dismissPopupMenu() {}
  };
},14392,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);

  var _objectSpread2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));

  var _NativeUIManager = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));

  var NativeModules = _$$_REQUIRE(_dependencyMap[3]);

  var Platform = _$$_REQUIRE(_dependencyMap[4]);

  var UIManagerProperties = _$$_REQUIRE(_dependencyMap[5]);

  var defineLazyObjectProperty = _$$_REQUIRE(_dependencyMap[6]);

  var viewManagerConfigs = {};
  var triedLoadingConfig = new Set();
  var NativeUIManagerConstants = {};
  var isNativeUIManagerConstantsSet = false;

  function _getConstants() {
    if (!isNativeUIManagerConstantsSet) {
      NativeUIManagerConstants = _NativeUIManager.default.getConstants();
      isNativeUIManagerConstantsSet = true;
    }

    return NativeUIManagerConstants;
  }

  var UIManagerJS = (0, _objectSpread2.default)({}, _NativeUIManager.default, {
    getConstants: function getConstants() {
      return _getConstants();
    },
    getViewManagerConfig: function getViewManagerConfig(viewManagerName) {
      if (viewManagerConfigs[viewManagerName] === undefined && _NativeUIManager.default.getConstantsForViewManager) {
        try {
          viewManagerConfigs[viewManagerName] = _NativeUIManager.default.getConstantsForViewManager(viewManagerName);
        } catch (e) {
          viewManagerConfigs[viewManagerName] = null;
        }
      }

      var config = viewManagerConfigs[viewManagerName];

      if (config) {
        return config;
      }

      if (!global.nativeCallSyncHook) {
        return config;
      }

      if (_NativeUIManager.default.lazilyLoadView && !triedLoadingConfig.has(viewManagerName)) {
        var result = _NativeUIManager.default.lazilyLoadView(viewManagerName);

        triedLoadingConfig.add(viewManagerName);

        if (result.viewConfig) {
          _getConstants()[viewManagerName] = result.viewConfig;
          lazifyViewManagerConfig(viewManagerName);
        }
      }

      return viewManagerConfigs[viewManagerName];
    }
  });
  _NativeUIManager.default.getViewManagerConfig = UIManagerJS.getViewManagerConfig;

  function lazifyViewManagerConfig(viewName) {
    var viewConfig = _getConstants()[viewName];

    viewManagerConfigs[viewName] = viewConfig;

    if (viewConfig.Manager) {
      defineLazyObjectProperty(viewConfig, 'Constants', {
        get: function get() {
          var viewManager = NativeModules[viewConfig.Manager];
          var constants = {};
          viewManager && Object.keys(viewManager).forEach(function (key) {
            var value = viewManager[key];

            if (typeof value !== 'function') {
              constants[key] = value;
            }
          });
          return constants;
        }
      });
      defineLazyObjectProperty(viewConfig, 'Commands', {
        get: function get() {
          var viewManager = NativeModules[viewConfig.Manager];
          var commands = {};
          var index = 0;
          viewManager && Object.keys(viewManager).forEach(function (key) {
            var value = viewManager[key];

            if (typeof value === 'function') {
              commands[key] = index++;
            }
          });
          return commands;
        }
      });
    }
  }

  if (_getConstants().ViewManagerNames) {
    _NativeUIManager.default.getConstants().ViewManagerNames.forEach(function (viewManagerName) {
      defineLazyObjectProperty(_NativeUIManager.default, viewManagerName, {
        get: function get() {
          return _NativeUIManager.default.getConstantsForViewManager(viewManagerName);
        }
      });
    });
  }

  if (!global.nativeCallSyncHook) {
    Object.keys(_getConstants()).forEach(function (viewManagerName) {
      if (!UIManagerProperties.includes(viewManagerName)) {
        if (!viewManagerConfigs[viewManagerName]) {
          viewManagerConfigs[viewManagerName] = _getConstants()[viewManagerName];
        }

        defineLazyObjectProperty(_NativeUIManager.default, viewManagerName, {
          get: function get() {
            console.warn("Accessing view manager configs directly off UIManager via UIManager['" + viewManagerName + "'] " + ("is no longer supported. Use UIManager.getViewManagerConfig('" + viewManagerName + "') instead."));
            return UIManagerJS.getViewManagerConfig(viewManagerName);
          }
        });
      }
    });
  }

  module.exports = UIManagerJS;
},14395,[14305,14314,14398,10042,10066,14404,10084]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var TurboModuleRegistry = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1]));

  var _default = TurboModuleRegistry.getEnforcing('UIManager');

  exports.default = _default;
},14398,[14308,14341]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var TurboModuleRegistry = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1]));

  var _default = TurboModuleRegistry.getEnforcing('PlatformConstants');

  exports.default = _default;
},14401,[14308,14341]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  module.exports = ['clearJSResponder', 'configureNextLayoutAnimation', 'createView', 'dismissPopupMenu', 'dispatchViewManagerCommand', 'findSubviewIn', 'getConstantsForViewManager', 'getDefaultEventTypes', 'manageChildren', 'measure', 'measureInWindow', 'measureLayout', 'measureLayoutRelativeToParent', 'playTouchSound', 'removeRootView', 'removeSubviewsFromContainerWithID', 'replaceExistingNonRootView', 'sendAccessibilityEvent', 'setChildren', 'setJSResponder', 'setLayoutAnimationEnabledExperimental', 'showPopupMenu', 'updateView', 'viewIsDescendantOf', 'PopupMenu', 'LazyViewManagersEnabled', 'ViewManagerNames', 'StyleConstants', 'AccessibilityEventTypes', 'UIView', 'getViewManagerConfig', 'blur', 'focus', 'genericBubblingEventTypes', 'genericDirectEventTypes', 'lazilyLoadView'];
},14404,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var objectWithoutPropertiesLoose = _$$_REQUIRE(_dependencyMap[0]);

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = objectWithoutPropertiesLoose(source, excluded);
    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  module.exports = _objectWithoutProperties;
},14407,[14410]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  module.exports = _objectWithoutPropertiesLoose;
},14410,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var TurboModuleRegistry = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1]));

  var NativeModule = TurboModuleRegistry.getEnforcing('DeviceInfo');
  var NativeDeviceInfo = NativeModule;
  var _default = NativeDeviceInfo;
  exports.default = _default;
},14413,[14308,14341]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _objectSpread = _$$_REQUIRE(_dependencyMap[0]);

  var DeprecatedColorPropType = _$$_REQUIRE(_dependencyMap[1]);

  var DeprecatedLayoutPropTypes = _$$_REQUIRE(_dependencyMap[2]);

  var DeprecatedShadowPropTypesIOS = _$$_REQUIRE(_dependencyMap[3]);

  var DeprecatedTransformPropTypes = _$$_REQUIRE(_dependencyMap[4]);

  var ReactPropTypes = _$$_REQUIRE(_dependencyMap[5]);

  var ImageStylePropTypes = _objectSpread({}, DeprecatedLayoutPropTypes, DeprecatedShadowPropTypesIOS, DeprecatedTransformPropTypes, {
    resizeMode: ReactPropTypes.oneOf(['center', 'contain', 'cover', 'repeat', 'stretch']),
    backfaceVisibility: ReactPropTypes.oneOf(['visible', 'hidden']),
    backgroundColor: DeprecatedColorPropType,
    borderColor: DeprecatedColorPropType,
    borderWidth: ReactPropTypes.number,
    borderRadius: ReactPropTypes.number,
    overflow: ReactPropTypes.oneOf(['visible', 'hidden']),
    tintColor: DeprecatedColorPropType,
    opacity: ReactPropTypes.number,
    overlayColor: ReactPropTypes.string,
    borderTopLeftRadius: ReactPropTypes.number,
    borderTopRightRadius: ReactPropTypes.number,
    borderBottomLeftRadius: ReactPropTypes.number,
    borderBottomRightRadius: ReactPropTypes.number
  });

  module.exports = ImageStylePropTypes;
},14416,[14314,14419,14425,14428,14431,10318]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var normalizeColor = _$$_REQUIRE(_dependencyMap[0]);

  var colorPropType = function colorPropType(isRequired, props, propName, componentName, location, propFullName) {
    var color = props[propName];

    if (color === undefined || color === null) {
      if (isRequired) {
        return new Error('Required ' + location + ' `' + (propFullName || propName) + '` was not specified in `' + componentName + '`.');
      }

      return;
    }

    if (typeof color === 'number') {
      return;
    }

    if (normalizeColor(color) === null) {
      return new Error('Invalid ' + location + ' `' + (propFullName || propName) + '` supplied to `' + componentName + '`: ' + color + '\n' + "Valid color formats are\n  - '#f0f' (#rgb)\n  - '#f0fc' (#rgba)\n  - '#ff00ff' (#rrggbb)\n  - '#ff00ff00' (#rrggbbaa)\n  - 'rgb(255, 255, 255)'\n  - 'rgba(255, 255, 255, 1.0)'\n  - 'hsl(360, 100%, 100%)'\n  - 'hsla(360, 100%, 100%, 1.0)'\n  - 'transparent'\n  - 'red'\n  - 0xff00ff00 (0xrrggbbaa)\n");
    }
  };

  var ColorPropType = colorPropType.bind(null, false);
  ColorPropType.isRequired = colorPropType.bind(null, true);
  module.exports = ColorPropType;
},14419,[14422]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  function normalizeColor(color) {
    var matchers = getMatchers();
    var match;

    if (typeof color === 'number') {
      if (color >>> 0 === color && color >= 0 && color <= 0xffffffff) {
        return color;
      }

      return null;
    }

    if (match = matchers.hex6.exec(color)) {
      return parseInt(match[1] + 'ff', 16) >>> 0;
    }

    if (names.hasOwnProperty(color)) {
      return names[color];
    }

    if (match = matchers.rgb.exec(color)) {
      return (parse255(match[1]) << 24 | parse255(match[2]) << 16 | parse255(match[3]) << 8 | 0x000000ff) >>> 0;
    }

    if (match = matchers.rgba.exec(color)) {
      return (parse255(match[1]) << 24 | parse255(match[2]) << 16 | parse255(match[3]) << 8 | parse1(match[4])) >>> 0;
    }

    if (match = matchers.hex3.exec(color)) {
      return parseInt(match[1] + match[1] + match[2] + match[2] + match[3] + match[3] + 'ff', 16) >>> 0;
    }

    if (match = matchers.hex8.exec(color)) {
      return parseInt(match[1], 16) >>> 0;
    }

    if (match = matchers.hex4.exec(color)) {
      return parseInt(match[1] + match[1] + match[2] + match[2] + match[3] + match[3] + match[4] + match[4], 16) >>> 0;
    }

    if (match = matchers.hsl.exec(color)) {
      return (hslToRgb(parse360(match[1]), parsePercentage(match[2]), parsePercentage(match[3])) | 0x000000ff) >>> 0;
    }

    if (match = matchers.hsla.exec(color)) {
      return (hslToRgb(parse360(match[1]), parsePercentage(match[2]), parsePercentage(match[3])) | parse1(match[4])) >>> 0;
    }

    return null;
  }

  function hue2rgb(p, q, t) {
    if (t < 0) {
      t += 1;
    }

    if (t > 1) {
      t -= 1;
    }

    if (t < 0.16666666666666666) {
      return p + (q - p) * 6 * t;
    }

    if (t < 0.5) {
      return q;
    }

    if (t < 0.6666666666666666) {
      return p + (q - p) * (0.6666666666666666 - t) * 6;
    }

    return p;
  }

  function hslToRgb(h, s, l) {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    var r = hue2rgb(p, q, h + 0.3333333333333333);
    var g = hue2rgb(p, q, h);
    var b = hue2rgb(p, q, h - 0.3333333333333333);
    return Math.round(r * 255) << 24 | Math.round(g * 255) << 16 | Math.round(b * 255) << 8;
  }

  var NUMBER = '[-+]?\\d*\\.?\\d+';
  var PERCENTAGE = "[-+]?\\d*\\.?\\d+%";

  function call() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return '\\(\\s*(' + args.join(')\\s*,\\s*(') + ')\\s*\\)';
  }

  var cachedMatchers;

  function getMatchers() {
    if (cachedMatchers === undefined) {
      cachedMatchers = {
        rgb: new RegExp('rgb' + call(NUMBER, NUMBER, NUMBER)),
        rgba: new RegExp('rgba' + call(NUMBER, NUMBER, NUMBER, NUMBER)),
        hsl: new RegExp('hsl' + call(NUMBER, PERCENTAGE, PERCENTAGE)),
        hsla: new RegExp('hsla' + call(NUMBER, PERCENTAGE, PERCENTAGE, NUMBER)),
        hex3: /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex4: /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex6: /^#([0-9a-fA-F]{6})$/,
        hex8: /^#([0-9a-fA-F]{8})$/
      };
    }

    return cachedMatchers;
  }

  function parse255(str) {
    var int = parseInt(str, 10);

    if (int < 0) {
      return 0;
    }

    if (int > 255) {
      return 255;
    }

    return int;
  }

  function parse360(str) {
    var int = parseFloat(str);
    return (int % 360 + 360) % 360 / 360;
  }

  function parse1(str) {
    var num = parseFloat(str);

    if (num < 0) {
      return 0;
    }

    if (num > 1) {
      return 255;
    }

    return Math.round(num * 255);
  }

  function parsePercentage(str) {
    var int = parseFloat(str);

    if (int < 0) {
      return 0;
    }

    if (int > 100) {
      return 1;
    }

    return int / 100;
  }

  var names = {
    transparent: 0x00000000,
    aliceblue: 0xf0f8ffff,
    antiquewhite: 0xfaebd7ff,
    aqua: 0x00ffffff,
    aquamarine: 0x7fffd4ff,
    azure: 0xf0ffffff,
    beige: 0xf5f5dcff,
    bisque: 0xffe4c4ff,
    black: 0x000000ff,
    blanchedalmond: 0xffebcdff,
    blue: 0x0000ffff,
    blueviolet: 0x8a2be2ff,
    brown: 0xa52a2aff,
    burlywood: 0xdeb887ff,
    burntsienna: 0xea7e5dff,
    cadetblue: 0x5f9ea0ff,
    chartreuse: 0x7fff00ff,
    chocolate: 0xd2691eff,
    coral: 0xff7f50ff,
    cornflowerblue: 0x6495edff,
    cornsilk: 0xfff8dcff,
    crimson: 0xdc143cff,
    cyan: 0x00ffffff,
    darkblue: 0x00008bff,
    darkcyan: 0x008b8bff,
    darkgoldenrod: 0xb8860bff,
    darkgray: 0xa9a9a9ff,
    darkgreen: 0x006400ff,
    darkgrey: 0xa9a9a9ff,
    darkkhaki: 0xbdb76bff,
    darkmagenta: 0x8b008bff,
    darkolivegreen: 0x556b2fff,
    darkorange: 0xff8c00ff,
    darkorchid: 0x9932ccff,
    darkred: 0x8b0000ff,
    darksalmon: 0xe9967aff,
    darkseagreen: 0x8fbc8fff,
    darkslateblue: 0x483d8bff,
    darkslategray: 0x2f4f4fff,
    darkslategrey: 0x2f4f4fff,
    darkturquoise: 0x00ced1ff,
    darkviolet: 0x9400d3ff,
    deeppink: 0xff1493ff,
    deepskyblue: 0x00bfffff,
    dimgray: 0x696969ff,
    dimgrey: 0x696969ff,
    dodgerblue: 0x1e90ffff,
    firebrick: 0xb22222ff,
    floralwhite: 0xfffaf0ff,
    forestgreen: 0x228b22ff,
    fuchsia: 0xff00ffff,
    gainsboro: 0xdcdcdcff,
    ghostwhite: 0xf8f8ffff,
    gold: 0xffd700ff,
    goldenrod: 0xdaa520ff,
    gray: 0x808080ff,
    green: 0x008000ff,
    greenyellow: 0xadff2fff,
    grey: 0x808080ff,
    honeydew: 0xf0fff0ff,
    hotpink: 0xff69b4ff,
    indianred: 0xcd5c5cff,
    indigo: 0x4b0082ff,
    ivory: 0xfffff0ff,
    khaki: 0xf0e68cff,
    lavender: 0xe6e6faff,
    lavenderblush: 0xfff0f5ff,
    lawngreen: 0x7cfc00ff,
    lemonchiffon: 0xfffacdff,
    lightblue: 0xadd8e6ff,
    lightcoral: 0xf08080ff,
    lightcyan: 0xe0ffffff,
    lightgoldenrodyellow: 0xfafad2ff,
    lightgray: 0xd3d3d3ff,
    lightgreen: 0x90ee90ff,
    lightgrey: 0xd3d3d3ff,
    lightpink: 0xffb6c1ff,
    lightsalmon: 0xffa07aff,
    lightseagreen: 0x20b2aaff,
    lightskyblue: 0x87cefaff,
    lightslategray: 0x778899ff,
    lightslategrey: 0x778899ff,
    lightsteelblue: 0xb0c4deff,
    lightyellow: 0xffffe0ff,
    lime: 0x00ff00ff,
    limegreen: 0x32cd32ff,
    linen: 0xfaf0e6ff,
    magenta: 0xff00ffff,
    maroon: 0x800000ff,
    mediumaquamarine: 0x66cdaaff,
    mediumblue: 0x0000cdff,
    mediumorchid: 0xba55d3ff,
    mediumpurple: 0x9370dbff,
    mediumseagreen: 0x3cb371ff,
    mediumslateblue: 0x7b68eeff,
    mediumspringgreen: 0x00fa9aff,
    mediumturquoise: 0x48d1ccff,
    mediumvioletred: 0xc71585ff,
    midnightblue: 0x191970ff,
    mintcream: 0xf5fffaff,
    mistyrose: 0xffe4e1ff,
    moccasin: 0xffe4b5ff,
    navajowhite: 0xffdeadff,
    navy: 0x000080ff,
    oldlace: 0xfdf5e6ff,
    olive: 0x808000ff,
    olivedrab: 0x6b8e23ff,
    orange: 0xffa500ff,
    orangered: 0xff4500ff,
    orchid: 0xda70d6ff,
    palegoldenrod: 0xeee8aaff,
    palegreen: 0x98fb98ff,
    paleturquoise: 0xafeeeeff,
    palevioletred: 0xdb7093ff,
    papayawhip: 0xffefd5ff,
    peachpuff: 0xffdab9ff,
    peru: 0xcd853fff,
    pink: 0xffc0cbff,
    plum: 0xdda0ddff,
    powderblue: 0xb0e0e6ff,
    purple: 0x800080ff,
    rebeccapurple: 0x663399ff,
    red: 0xff0000ff,
    rosybrown: 0xbc8f8fff,
    royalblue: 0x4169e1ff,
    saddlebrown: 0x8b4513ff,
    salmon: 0xfa8072ff,
    sandybrown: 0xf4a460ff,
    seagreen: 0x2e8b57ff,
    seashell: 0xfff5eeff,
    sienna: 0xa0522dff,
    silver: 0xc0c0c0ff,
    skyblue: 0x87ceebff,
    slateblue: 0x6a5acdff,
    slategray: 0x708090ff,
    slategrey: 0x708090ff,
    snow: 0xfffafaff,
    springgreen: 0x00ff7fff,
    steelblue: 0x4682b4ff,
    tan: 0xd2b48cff,
    teal: 0x008080ff,
    thistle: 0xd8bfd8ff,
    tomato: 0xff6347ff,
    turquoise: 0x40e0d0ff,
    violet: 0xee82eeff,
    wheat: 0xf5deb3ff,
    white: 0xffffffff,
    whitesmoke: 0xf5f5f5ff,
    yellow: 0xffff00ff,
    yellowgreen: 0x9acd32ff
  };
  module.exports = normalizeColor;
},14422,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var ReactPropTypes = _$$_REQUIRE(_dependencyMap[0]);

  var LayoutPropTypes = {
    display: ReactPropTypes.oneOf(['none', 'flex']),
    width: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),
    height: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),
    start: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),
    end: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),
    top: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),
    left: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),
    right: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),
    bottom: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),
    minWidth: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),
    maxWidth: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),
    minHeight: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),
    maxHeight: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),
    margin: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),
    marginVertical: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),
    marginHorizontal: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),
    marginTop: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),
    marginBottom: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),
    marginLeft: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),
    marginRight: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),
    marginStart: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),
    marginEnd: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),
    padding: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),
    paddingVertical: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),
    paddingHorizontal: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),
    paddingTop: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),
    paddingBottom: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),
    paddingLeft: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),
    paddingRight: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),
    paddingStart: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),
    paddingEnd: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),
    borderWidth: ReactPropTypes.number,
    borderTopWidth: ReactPropTypes.number,
    borderStartWidth: ReactPropTypes.number,
    borderEndWidth: ReactPropTypes.number,
    borderRightWidth: ReactPropTypes.number,
    borderBottomWidth: ReactPropTypes.number,
    borderLeftWidth: ReactPropTypes.number,
    position: ReactPropTypes.oneOf(['absolute', 'relative']),
    flexDirection: ReactPropTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse']),
    flexWrap: ReactPropTypes.oneOf(['wrap', 'nowrap', 'wrap-reverse']),
    justifyContent: ReactPropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly']),
    alignItems: ReactPropTypes.oneOf(['flex-start', 'flex-end', 'center', 'stretch', 'baseline']),
    alignSelf: ReactPropTypes.oneOf(['auto', 'flex-start', 'flex-end', 'center', 'stretch', 'baseline']),
    alignContent: ReactPropTypes.oneOf(['flex-start', 'flex-end', 'center', 'stretch', 'space-between', 'space-around']),
    overflow: ReactPropTypes.oneOf(['visible', 'hidden', 'scroll']),
    flex: ReactPropTypes.number,
    flexGrow: ReactPropTypes.number,
    flexShrink: ReactPropTypes.number,
    flexBasis: ReactPropTypes.oneOfType([ReactPropTypes.number, ReactPropTypes.string]),
    aspectRatio: ReactPropTypes.number,
    zIndex: ReactPropTypes.number,
    direction: ReactPropTypes.oneOf(['inherit', 'ltr', 'rtl'])
  };
  module.exports = LayoutPropTypes;
},14425,[10318]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var DeprecatedColorPropType = _$$_REQUIRE(_dependencyMap[0]);

  var ReactPropTypes = _$$_REQUIRE(_dependencyMap[1]);

  var DeprecatedShadowPropTypesIOS = {
    shadowColor: DeprecatedColorPropType,
    shadowOffset: ReactPropTypes.shape({
      width: ReactPropTypes.number,
      height: ReactPropTypes.number
    }),
    shadowOpacity: ReactPropTypes.number,
    shadowRadius: ReactPropTypes.number
  };
  module.exports = DeprecatedShadowPropTypesIOS;
},14428,[14419,10318]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var ReactPropTypes = _$$_REQUIRE(_dependencyMap[0]);

  var deprecatedPropType = _$$_REQUIRE(_dependencyMap[1]);

  var TransformMatrixPropType = function TransformMatrixPropType(props, propName, componentName) {
    if (props[propName]) {
      return new Error("The transformMatrix style property is deprecated. Use `transform: [{ matrix: ... }]` instead.");
    }
  };

  var DecomposedMatrixPropType = function DecomposedMatrixPropType(props, propName, componentName) {
    if (props[propName]) {
      return new Error("The decomposedMatrix style property is deprecated. Use `transform: [...]` instead.");
    }
  };

  var DeprecatedTransformPropTypes = {
    transform: ReactPropTypes.arrayOf(ReactPropTypes.oneOfType([ReactPropTypes.shape({
      perspective: ReactPropTypes.number
    }), ReactPropTypes.shape({
      rotate: ReactPropTypes.string
    }), ReactPropTypes.shape({
      rotateX: ReactPropTypes.string
    }), ReactPropTypes.shape({
      rotateY: ReactPropTypes.string
    }), ReactPropTypes.shape({
      rotateZ: ReactPropTypes.string
    }), ReactPropTypes.shape({
      scale: ReactPropTypes.number
    }), ReactPropTypes.shape({
      scaleX: ReactPropTypes.number
    }), ReactPropTypes.shape({
      scaleY: ReactPropTypes.number
    }), ReactPropTypes.shape({
      translateX: ReactPropTypes.number
    }), ReactPropTypes.shape({
      translateY: ReactPropTypes.number
    }), ReactPropTypes.shape({
      skewX: ReactPropTypes.string
    }), ReactPropTypes.shape({
      skewY: ReactPropTypes.string
    })])),
    transformMatrix: TransformMatrixPropType,
    decomposedMatrix: DecomposedMatrixPropType,
    scaleX: deprecatedPropType(ReactPropTypes.number, 'Use the transform prop instead.'),
    scaleY: deprecatedPropType(ReactPropTypes.number, 'Use the transform prop instead.'),
    rotation: deprecatedPropType(ReactPropTypes.number, 'Use the transform prop instead.'),
    translateX: deprecatedPropType(ReactPropTypes.number, 'Use the transform prop instead.'),
    translateY: deprecatedPropType(ReactPropTypes.number, 'Use the transform prop instead.')
  };
  module.exports = DeprecatedTransformPropTypes;
},14431,[10318,10366]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _objectSpread = _$$_REQUIRE(_dependencyMap[0]);

  var DeprecatedColorPropType = _$$_REQUIRE(_dependencyMap[1]);

  var DeprecatedViewStylePropTypes = _$$_REQUIRE(_dependencyMap[2]);

  var ReactPropTypes = _$$_REQUIRE(_dependencyMap[3]);

  var DeprecatedTextStylePropTypes = _objectSpread({}, DeprecatedViewStylePropTypes, {
    color: DeprecatedColorPropType,
    fontFamily: ReactPropTypes.string,
    fontSize: ReactPropTypes.number,
    fontStyle: ReactPropTypes.oneOf(['normal', 'italic']),
    fontWeight: ReactPropTypes.oneOf(['normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900']),
    fontVariant: ReactPropTypes.arrayOf(ReactPropTypes.oneOf(['small-caps', 'oldstyle-nums', 'lining-nums', 'tabular-nums', 'proportional-nums'])),
    textShadowOffset: ReactPropTypes.shape({
      width: ReactPropTypes.number,
      height: ReactPropTypes.number
    }),
    textShadowRadius: ReactPropTypes.number,
    textShadowColor: DeprecatedColorPropType,
    letterSpacing: ReactPropTypes.number,
    lineHeight: ReactPropTypes.number,
    textAlign: ReactPropTypes.oneOf(['auto', 'left', 'right', 'center', 'justify']),
    textAlignVertical: ReactPropTypes.oneOf(['auto', 'top', 'bottom', 'center']),
    includeFontPadding: ReactPropTypes.bool,
    textDecorationLine: ReactPropTypes.oneOf(['none', 'underline', 'line-through', 'underline line-through']),
    textDecorationStyle: ReactPropTypes.oneOf(['solid', 'double', 'dotted', 'dashed']),
    textDecorationColor: DeprecatedColorPropType,
    textTransform: ReactPropTypes.oneOf(['none', 'capitalize', 'uppercase', 'lowercase']),
    writingDirection: ReactPropTypes.oneOf(['auto', 'ltr', 'rtl'])
  });

  module.exports = DeprecatedTextStylePropTypes;
},14434,[14314,14419,14437,10318]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _objectSpread = _$$_REQUIRE(_dependencyMap[0]);

  var DeprecatedColorPropType = _$$_REQUIRE(_dependencyMap[1]);

  var DeprecatedLayoutPropTypes = _$$_REQUIRE(_dependencyMap[2]);

  var DeprecatedShadowPropTypesIOS = _$$_REQUIRE(_dependencyMap[3]);

  var DeprecatedTransformPropTypes = _$$_REQUIRE(_dependencyMap[4]);

  var ReactPropTypes = _$$_REQUIRE(_dependencyMap[5]);

  var DeprecatedViewStylePropTypes = _objectSpread({}, DeprecatedLayoutPropTypes, DeprecatedShadowPropTypesIOS, DeprecatedTransformPropTypes, {
    backfaceVisibility: ReactPropTypes.oneOf(['visible', 'hidden']),
    backgroundColor: DeprecatedColorPropType,
    borderColor: DeprecatedColorPropType,
    borderTopColor: DeprecatedColorPropType,
    borderRightColor: DeprecatedColorPropType,
    borderBottomColor: DeprecatedColorPropType,
    borderLeftColor: DeprecatedColorPropType,
    borderStartColor: DeprecatedColorPropType,
    borderEndColor: DeprecatedColorPropType,
    borderRadius: ReactPropTypes.number,
    borderTopLeftRadius: ReactPropTypes.number,
    borderTopRightRadius: ReactPropTypes.number,
    borderTopStartRadius: ReactPropTypes.number,
    borderTopEndRadius: ReactPropTypes.number,
    borderBottomLeftRadius: ReactPropTypes.number,
    borderBottomRightRadius: ReactPropTypes.number,
    borderBottomStartRadius: ReactPropTypes.number,
    borderBottomEndRadius: ReactPropTypes.number,
    borderStyle: ReactPropTypes.oneOf(['solid', 'dotted', 'dashed']),
    borderWidth: ReactPropTypes.number,
    borderTopWidth: ReactPropTypes.number,
    borderRightWidth: ReactPropTypes.number,
    borderBottomWidth: ReactPropTypes.number,
    borderLeftWidth: ReactPropTypes.number,
    opacity: ReactPropTypes.number,
    elevation: ReactPropTypes.number
  });

  module.exports = DeprecatedViewStylePropTypes;
},14437,[14314,14419,14425,14428,14431,10318]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = exports.__INTERNAL_VIEW_CONFIG = undefined;

  var Platform = _$$_REQUIRE(_dependencyMap[0]);

  var ReactNative = _$$_REQUIRE(_dependencyMap[1]);

  var ReactNativeViewViewConfigAndroid = _$$_REQUIRE(_dependencyMap[2]);

  var registerGeneratedViewConfig = _$$_REQUIRE(_dependencyMap[3]);

  var requireNativeComponent = _$$_REQUIRE(_dependencyMap[4]);

  var NativeViewComponent;
  var viewConfig;
  {
    NativeViewComponent = requireNativeComponent('RCTView');
  }
  var __INTERNAL_VIEW_CONFIG = viewConfig;
  exports.__INTERNAL_VIEW_CONFIG = __INTERNAL_VIEW_CONFIG;
  var _default = NativeViewComponent;
  exports.default = _default;
},14440,[10066,10114,14581,14584,10372]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  var _extends = _$$_REQUIRE(_dependencyMap[0]);

  _$$_REQUIRE(_dependencyMap[1]);

  var ReactNativePrivateInterface = _$$_REQUIRE(_dependencyMap[2]),
      React = _$$_REQUIRE(_dependencyMap[3]),
      Scheduler = _$$_REQUIRE(_dependencyMap[4]);

  function ReactError(error) {
    error.name = "Invariant Violation";
    return error;
  }

  var eventPluginOrder = null,
      namesToPlugins = {};

  function recomputePluginOrdering() {
    if (eventPluginOrder) for (var pluginName in namesToPlugins) {
      var pluginModule = namesToPlugins[pluginName],
          pluginIndex = eventPluginOrder.indexOf(pluginName);
      if (!(-1 < pluginIndex)) throw ReactError(Error("EventPluginRegistry: Cannot inject event plugins that do not exist in the plugin ordering, `" + pluginName + "`."));

      if (!plugins[pluginIndex]) {
        if (!pluginModule.extractEvents) throw ReactError(Error("EventPluginRegistry: Event plugins must implement an `extractEvents` method, but `" + pluginName + "` does not."));
        plugins[pluginIndex] = pluginModule;
        pluginIndex = pluginModule.eventTypes;

        for (var eventName in pluginIndex) {
          var JSCompiler_inline_result = undefined;
          var dispatchConfig = pluginIndex[eventName],
              pluginModule$jscomp$0 = pluginModule,
              eventName$jscomp$0 = eventName;
          if (eventNameDispatchConfigs.hasOwnProperty(eventName$jscomp$0)) throw ReactError(Error("EventPluginHub: More than one plugin attempted to publish the same event name, `" + eventName$jscomp$0 + "`."));
          eventNameDispatchConfigs[eventName$jscomp$0] = dispatchConfig;
          var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;

          if (phasedRegistrationNames) {
            for (JSCompiler_inline_result in phasedRegistrationNames) {
              phasedRegistrationNames.hasOwnProperty(JSCompiler_inline_result) && publishRegistrationName(phasedRegistrationNames[JSCompiler_inline_result], pluginModule$jscomp$0, eventName$jscomp$0);
            }

            JSCompiler_inline_result = true;
          } else dispatchConfig.registrationName ? (publishRegistrationName(dispatchConfig.registrationName, pluginModule$jscomp$0, eventName$jscomp$0), JSCompiler_inline_result = true) : JSCompiler_inline_result = false;

          if (!JSCompiler_inline_result) throw ReactError(Error("EventPluginRegistry: Failed to publish event `" + eventName + "` for plugin `" + pluginName + "`."));
        }
      }
    }
  }

  function publishRegistrationName(registrationName, pluginModule) {
    if (registrationNameModules[registrationName]) throw ReactError(Error("EventPluginHub: More than one plugin attempted to publish the same registration name, `" + registrationName + "`."));
    registrationNameModules[registrationName] = pluginModule;
  }

  var plugins = [],
      eventNameDispatchConfigs = {},
      registrationNameModules = {};

  function invokeGuardedCallbackImpl(name, func, context, a, b, c, d, e, f) {
    var funcArgs = Array.prototype.slice.call(arguments, 3);

    try {
      func.apply(context, funcArgs);
    } catch (error) {
      this.onError(error);
    }
  }

  var hasError = false,
      caughtError = null,
      hasRethrowError = false,
      rethrowError = null,
      reporter = {
    onError: function onError(error) {
      hasError = true;
      caughtError = error;
    }
  };

  function invokeGuardedCallback(name, func, context, a, b, c, d, e, f) {
    hasError = false;
    caughtError = null;
    invokeGuardedCallbackImpl.apply(reporter, arguments);
  }

  function invokeGuardedCallbackAndCatchFirstError(name, func, context, a, b, c, d, e, f) {
    invokeGuardedCallback.apply(this, arguments);

    if (hasError) {
      if (hasError) {
        var error = caughtError;
        hasError = false;
        caughtError = null;
      } else throw ReactError(Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue."));

      hasRethrowError || (hasRethrowError = true, rethrowError = error);
    }
  }

  var getFiberCurrentPropsFromNode = null,
      getInstanceFromNode = null,
      getNodeFromInstance = null;

  function executeDispatch(event, listener, inst) {
    var type = event.type || "unknown-event";
    event.currentTarget = getNodeFromInstance(inst);
    invokeGuardedCallbackAndCatchFirstError(type, listener, undefined, event);
    event.currentTarget = null;
  }

  function executeDirectDispatch(event) {
    var dispatchListener = event._dispatchListeners,
        dispatchInstance = event._dispatchInstances;
    if (Array.isArray(dispatchListener)) throw ReactError(Error("executeDirectDispatch(...): Invalid `event`."));
    event.currentTarget = dispatchListener ? getNodeFromInstance(dispatchInstance) : null;
    dispatchListener = dispatchListener ? dispatchListener(event) : null;
    event.currentTarget = null;
    event._dispatchListeners = null;
    event._dispatchInstances = null;
    return dispatchListener;
  }

  function accumulateInto(current, next) {
    if (null == next) throw ReactError(Error("accumulateInto(...): Accumulated items must not be null or undefined."));
    if (null == current) return next;

    if (Array.isArray(current)) {
      if (Array.isArray(next)) return current.push.apply(current, next), current;
      current.push(next);
      return current;
    }

    return Array.isArray(next) ? [current].concat(next) : [current, next];
  }

  function forEachAccumulated(arr, cb, scope) {
    Array.isArray(arr) ? arr.forEach(cb, scope) : arr && cb.call(scope, arr);
  }

  var eventQueue = null;

  function executeDispatchesAndReleaseTopLevel(e) {
    if (e) {
      var dispatchListeners = e._dispatchListeners,
          dispatchInstances = e._dispatchInstances;
      if (Array.isArray(dispatchListeners)) for (var i = 0; i < dispatchListeners.length && !e.isPropagationStopped(); i++) {
        executeDispatch(e, dispatchListeners[i], dispatchInstances[i]);
      } else dispatchListeners && executeDispatch(e, dispatchListeners, dispatchInstances);
      e._dispatchListeners = null;
      e._dispatchInstances = null;
      e.isPersistent() || e.constructor.release(e);
    }
  }

  var injection = {
    injectEventPluginOrder: function injectEventPluginOrder(injectedEventPluginOrder) {
      if (eventPluginOrder) throw ReactError(Error("EventPluginRegistry: Cannot inject event plugin ordering more than once. You are likely trying to load more than one copy of React."));
      eventPluginOrder = Array.prototype.slice.call(injectedEventPluginOrder);
      recomputePluginOrdering();
    },
    injectEventPluginsByName: function injectEventPluginsByName(injectedNamesToPlugins) {
      var isOrderingDirty = false,
          pluginName;

      for (pluginName in injectedNamesToPlugins) {
        if (injectedNamesToPlugins.hasOwnProperty(pluginName)) {
          var pluginModule = injectedNamesToPlugins[pluginName];

          if (!namesToPlugins.hasOwnProperty(pluginName) || namesToPlugins[pluginName] !== pluginModule) {
            if (namesToPlugins[pluginName]) throw ReactError(Error("EventPluginRegistry: Cannot inject two different event plugins using the same name, `" + pluginName + "`."));
            namesToPlugins[pluginName] = pluginModule;
            isOrderingDirty = true;
          }
        }
      }

      isOrderingDirty && recomputePluginOrdering();
    }
  };

  function getListener(inst, registrationName) {
    var listener = inst.stateNode;
    if (!listener) return null;
    var props = getFiberCurrentPropsFromNode(listener);
    if (!props) return null;
    listener = props[registrationName];

    a: switch (registrationName) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
        (props = !props.disabled) || (inst = inst.type, props = !("button" === inst || "input" === inst || "select" === inst || "textarea" === inst));
        inst = !props;
        break a;

      default:
        inst = false;
    }

    if (inst) return null;
    if (listener && "function" !== typeof listener) throw ReactError(Error("Expected `" + registrationName + "` listener to be a function, instead got a value of `" + typeof listener + "` type."));
    return listener;
  }

  function getParent(inst) {
    do {
      inst = inst.return;
    } while (inst && 5 !== inst.tag);

    return inst ? inst : null;
  }

  function traverseTwoPhase(inst, fn, arg) {
    for (var path = []; inst;) {
      path.push(inst), inst = getParent(inst);
    }

    for (inst = path.length; 0 < inst--;) {
      fn(path[inst], "captured", arg);
    }

    for (inst = 0; inst < path.length; inst++) {
      fn(path[inst], "bubbled", arg);
    }
  }

  function accumulateDirectionalDispatches(inst, phase, event) {
    if (phase = getListener(inst, event.dispatchConfig.phasedRegistrationNames[phase])) event._dispatchListeners = accumulateInto(event._dispatchListeners, phase), event._dispatchInstances = accumulateInto(event._dispatchInstances, inst);
  }

  function accumulateTwoPhaseDispatchesSingle(event) {
    event && event.dispatchConfig.phasedRegistrationNames && traverseTwoPhase(event._targetInst, accumulateDirectionalDispatches, event);
  }

  function accumulateTwoPhaseDispatchesSingleSkipTarget(event) {
    if (event && event.dispatchConfig.phasedRegistrationNames) {
      var targetInst = event._targetInst;
      targetInst = targetInst ? getParent(targetInst) : null;
      traverseTwoPhase(targetInst, accumulateDirectionalDispatches, event);
    }
  }

  function accumulateDirectDispatchesSingle(event) {
    if (event && event.dispatchConfig.registrationName) {
      var inst = event._targetInst;

      if (inst && event && event.dispatchConfig.registrationName) {
        var listener = getListener(inst, event.dispatchConfig.registrationName);
        listener && (event._dispatchListeners = accumulateInto(event._dispatchListeners, listener), event._dispatchInstances = accumulateInto(event._dispatchInstances, inst));
      }
    }
  }

  function functionThatReturnsTrue() {
    return true;
  }

  function functionThatReturnsFalse() {
    return false;
  }

  function SyntheticEvent(dispatchConfig, targetInst, nativeEvent, nativeEventTarget) {
    this.dispatchConfig = dispatchConfig;
    this._targetInst = targetInst;
    this.nativeEvent = nativeEvent;
    dispatchConfig = this.constructor.Interface;

    for (var propName in dispatchConfig) {
      dispatchConfig.hasOwnProperty(propName) && ((targetInst = dispatchConfig[propName]) ? this[propName] = targetInst(nativeEvent) : "target" === propName ? this.target = nativeEventTarget : this[propName] = nativeEvent[propName]);
    }

    this.isDefaultPrevented = (null != nativeEvent.defaultPrevented ? nativeEvent.defaultPrevented : false === nativeEvent.returnValue) ? functionThatReturnsTrue : functionThatReturnsFalse;
    this.isPropagationStopped = functionThatReturnsFalse;
    return this;
  }

  _extends(SyntheticEvent.prototype, {
    preventDefault: function preventDefault() {
      this.defaultPrevented = true;
      var event = this.nativeEvent;
      event && (event.preventDefault ? event.preventDefault() : "unknown" !== typeof event.returnValue && (event.returnValue = false), this.isDefaultPrevented = functionThatReturnsTrue);
    },
    stopPropagation: function stopPropagation() {
      var event = this.nativeEvent;
      event && (event.stopPropagation ? event.stopPropagation() : "unknown" !== typeof event.cancelBubble && (event.cancelBubble = true), this.isPropagationStopped = functionThatReturnsTrue);
    },
    persist: function persist() {
      this.isPersistent = functionThatReturnsTrue;
    },
    isPersistent: functionThatReturnsFalse,
    destructor: function destructor() {
      var Interface = this.constructor.Interface,
          propName;

      for (propName in Interface) {
        this[propName] = null;
      }

      this.nativeEvent = this._targetInst = this.dispatchConfig = null;
      this.isPropagationStopped = this.isDefaultPrevented = functionThatReturnsFalse;
      this._dispatchInstances = this._dispatchListeners = null;
    }
  });

  SyntheticEvent.Interface = {
    type: null,
    target: null,
    currentTarget: function currentTarget() {
      return null;
    },
    eventPhase: null,
    bubbles: null,
    cancelable: null,
    timeStamp: function timeStamp(event) {
      return event.timeStamp || Date.now();
    },
    defaultPrevented: null,
    isTrusted: null
  };

  SyntheticEvent.extend = function (Interface) {
    function E() {}

    function Class() {
      return Super.apply(this, arguments);
    }

    var Super = this;
    E.prototype = Super.prototype;
    var prototype = new E();

    _extends(prototype, Class.prototype);

    Class.prototype = prototype;
    Class.prototype.constructor = Class;
    Class.Interface = _extends({}, Super.Interface, Interface);
    Class.extend = Super.extend;
    addEventPoolingTo(Class);
    return Class;
  };

  addEventPoolingTo(SyntheticEvent);

  function getPooledEvent(dispatchConfig, targetInst, nativeEvent, nativeInst) {
    if (this.eventPool.length) {
      var instance = this.eventPool.pop();
      this.call(instance, dispatchConfig, targetInst, nativeEvent, nativeInst);
      return instance;
    }

    return new this(dispatchConfig, targetInst, nativeEvent, nativeInst);
  }

  function releasePooledEvent(event) {
    if (!(event instanceof this)) throw ReactError(Error("Trying to release an event instance into a pool of a different type."));
    event.destructor();
    10 > this.eventPool.length && this.eventPool.push(event);
  }

  function addEventPoolingTo(EventConstructor) {
    EventConstructor.eventPool = [];
    EventConstructor.getPooled = getPooledEvent;
    EventConstructor.release = releasePooledEvent;
  }

  var ResponderSyntheticEvent = SyntheticEvent.extend({
    touchHistory: function touchHistory() {
      return null;
    }
  });

  function isStartish(topLevelType) {
    return "topTouchStart" === topLevelType;
  }

  function isMoveish(topLevelType) {
    return "topTouchMove" === topLevelType;
  }

  var startDependencies = ["topTouchStart"],
      moveDependencies = ["topTouchMove"],
      endDependencies = ["topTouchCancel", "topTouchEnd"],
      touchBank = [],
      touchHistory = {
    touchBank: touchBank,
    numberActiveTouches: 0,
    indexOfSingleActiveTouch: -1,
    mostRecentTimeStamp: 0
  };

  function timestampForTouch(touch) {
    return touch.timeStamp || touch.timestamp;
  }

  function getTouchIdentifier(_ref) {
    _ref = _ref.identifier;
    if (null == _ref) throw ReactError(Error("Touch object is missing identifier."));
    return _ref;
  }

  function recordTouchStart(touch) {
    var identifier = getTouchIdentifier(touch),
        touchRecord = touchBank[identifier];
    touchRecord ? (touchRecord.touchActive = true, touchRecord.startPageX = touch.pageX, touchRecord.startPageY = touch.pageY, touchRecord.startTimeStamp = timestampForTouch(touch), touchRecord.currentPageX = touch.pageX, touchRecord.currentPageY = touch.pageY, touchRecord.currentTimeStamp = timestampForTouch(touch), touchRecord.previousPageX = touch.pageX, touchRecord.previousPageY = touch.pageY, touchRecord.previousTimeStamp = timestampForTouch(touch)) : (touchRecord = {
      touchActive: true,
      startPageX: touch.pageX,
      startPageY: touch.pageY,
      startTimeStamp: timestampForTouch(touch),
      currentPageX: touch.pageX,
      currentPageY: touch.pageY,
      currentTimeStamp: timestampForTouch(touch),
      previousPageX: touch.pageX,
      previousPageY: touch.pageY,
      previousTimeStamp: timestampForTouch(touch)
    }, touchBank[identifier] = touchRecord);
    touchHistory.mostRecentTimeStamp = timestampForTouch(touch);
  }

  function recordTouchMove(touch) {
    var touchRecord = touchBank[getTouchIdentifier(touch)];
    touchRecord ? (touchRecord.touchActive = true, touchRecord.previousPageX = touchRecord.currentPageX, touchRecord.previousPageY = touchRecord.currentPageY, touchRecord.previousTimeStamp = touchRecord.currentTimeStamp, touchRecord.currentPageX = touch.pageX, touchRecord.currentPageY = touch.pageY, touchRecord.currentTimeStamp = timestampForTouch(touch), touchHistory.mostRecentTimeStamp = timestampForTouch(touch)) : console.warn("Cannot record touch move without a touch start.\nTouch Move: %s\n", "Touch Bank: %s", printTouch(touch), printTouchBank());
  }

  function recordTouchEnd(touch) {
    var touchRecord = touchBank[getTouchIdentifier(touch)];
    touchRecord ? (touchRecord.touchActive = false, touchRecord.previousPageX = touchRecord.currentPageX, touchRecord.previousPageY = touchRecord.currentPageY, touchRecord.previousTimeStamp = touchRecord.currentTimeStamp, touchRecord.currentPageX = touch.pageX, touchRecord.currentPageY = touch.pageY, touchRecord.currentTimeStamp = timestampForTouch(touch), touchHistory.mostRecentTimeStamp = timestampForTouch(touch)) : console.warn("Cannot record touch end without a touch start.\nTouch End: %s\n", "Touch Bank: %s", printTouch(touch), printTouchBank());
  }

  function printTouch(touch) {
    return JSON.stringify({
      identifier: touch.identifier,
      pageX: touch.pageX,
      pageY: touch.pageY,
      timestamp: timestampForTouch(touch)
    });
  }

  function printTouchBank() {
    var printed = JSON.stringify(touchBank.slice(0, 20));
    20 < touchBank.length && (printed += " (original size: " + touchBank.length + ")");
    return printed;
  }

  var ResponderTouchHistoryStore = {
    recordTouchTrack: function recordTouchTrack(topLevelType, nativeEvent) {
      if (isMoveish(topLevelType)) nativeEvent.changedTouches.forEach(recordTouchMove);else if (isStartish(topLevelType)) nativeEvent.changedTouches.forEach(recordTouchStart), touchHistory.numberActiveTouches = nativeEvent.touches.length, 1 === touchHistory.numberActiveTouches && (touchHistory.indexOfSingleActiveTouch = nativeEvent.touches[0].identifier);else if ("topTouchEnd" === topLevelType || "topTouchCancel" === topLevelType) if (nativeEvent.changedTouches.forEach(recordTouchEnd), touchHistory.numberActiveTouches = nativeEvent.touches.length, 1 === touchHistory.numberActiveTouches) for (topLevelType = 0; topLevelType < touchBank.length; topLevelType++) {
        if (nativeEvent = touchBank[topLevelType], null != nativeEvent && nativeEvent.touchActive) {
          touchHistory.indexOfSingleActiveTouch = topLevelType;
          break;
        }
      }
    },
    touchHistory: touchHistory
  };

  function accumulate(current, next) {
    if (null == next) throw ReactError(Error("accumulate(...): Accumulated items must not be null or undefined."));
    return null == current ? next : Array.isArray(current) ? current.concat(next) : Array.isArray(next) ? [current].concat(next) : [current, next];
  }

  var responderInst = null,
      trackedTouchCount = 0;

  function changeResponder(nextResponderInst, blockHostResponder) {
    var oldResponderInst = responderInst;
    responderInst = nextResponderInst;
    if (null !== ResponderEventPlugin.GlobalResponderHandler) ResponderEventPlugin.GlobalResponderHandler.onChange(oldResponderInst, nextResponderInst, blockHostResponder);
  }

  var eventTypes = {
    startShouldSetResponder: {
      phasedRegistrationNames: {
        bubbled: "onStartShouldSetResponder",
        captured: "onStartShouldSetResponderCapture"
      },
      dependencies: startDependencies
    },
    scrollShouldSetResponder: {
      phasedRegistrationNames: {
        bubbled: "onScrollShouldSetResponder",
        captured: "onScrollShouldSetResponderCapture"
      },
      dependencies: ["topScroll"]
    },
    selectionChangeShouldSetResponder: {
      phasedRegistrationNames: {
        bubbled: "onSelectionChangeShouldSetResponder",
        captured: "onSelectionChangeShouldSetResponderCapture"
      },
      dependencies: ["topSelectionChange"]
    },
    moveShouldSetResponder: {
      phasedRegistrationNames: {
        bubbled: "onMoveShouldSetResponder",
        captured: "onMoveShouldSetResponderCapture"
      },
      dependencies: moveDependencies
    },
    responderStart: {
      registrationName: "onResponderStart",
      dependencies: startDependencies
    },
    responderMove: {
      registrationName: "onResponderMove",
      dependencies: moveDependencies
    },
    responderEnd: {
      registrationName: "onResponderEnd",
      dependencies: endDependencies
    },
    responderRelease: {
      registrationName: "onResponderRelease",
      dependencies: endDependencies
    },
    responderTerminationRequest: {
      registrationName: "onResponderTerminationRequest",
      dependencies: []
    },
    responderGrant: {
      registrationName: "onResponderGrant",
      dependencies: []
    },
    responderReject: {
      registrationName: "onResponderReject",
      dependencies: []
    },
    responderTerminate: {
      registrationName: "onResponderTerminate",
      dependencies: []
    }
  },
      ResponderEventPlugin = {
    _getResponder: function _getResponder() {
      return responderInst;
    },
    eventTypes: eventTypes,
    extractEvents: function extractEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
      if (isStartish(topLevelType)) trackedTouchCount += 1;else if ("topTouchEnd" === topLevelType || "topTouchCancel" === topLevelType) if (0 <= trackedTouchCount) --trackedTouchCount;else return console.error("Ended a touch event which was not counted in `trackedTouchCount`."), null;
      ResponderTouchHistoryStore.recordTouchTrack(topLevelType, nativeEvent);

      if (targetInst && ("topScroll" === topLevelType && !nativeEvent.responderIgnoreScroll || 0 < trackedTouchCount && "topSelectionChange" === topLevelType || isStartish(topLevelType) || isMoveish(topLevelType))) {
        var JSCompiler_temp = isStartish(topLevelType) ? eventTypes.startShouldSetResponder : isMoveish(topLevelType) ? eventTypes.moveShouldSetResponder : "topSelectionChange" === topLevelType ? eventTypes.selectionChangeShouldSetResponder : eventTypes.scrollShouldSetResponder;
        if (responderInst) b: {
          var JSCompiler_temp$jscomp$0 = responderInst;

          for (var depthA = 0, tempA = JSCompiler_temp$jscomp$0; tempA; tempA = getParent(tempA)) {
            depthA++;
          }

          tempA = 0;

          for (var tempB = targetInst; tempB; tempB = getParent(tempB)) {
            tempA++;
          }

          for (; 0 < depthA - tempA;) {
            JSCompiler_temp$jscomp$0 = getParent(JSCompiler_temp$jscomp$0), depthA--;
          }

          for (; 0 < tempA - depthA;) {
            targetInst = getParent(targetInst), tempA--;
          }

          for (; depthA--;) {
            if (JSCompiler_temp$jscomp$0 === targetInst || JSCompiler_temp$jscomp$0 === targetInst.alternate) break b;
            JSCompiler_temp$jscomp$0 = getParent(JSCompiler_temp$jscomp$0);
            targetInst = getParent(targetInst);
          }

          JSCompiler_temp$jscomp$0 = null;
        } else JSCompiler_temp$jscomp$0 = targetInst;
        targetInst = JSCompiler_temp$jscomp$0 === responderInst;
        JSCompiler_temp$jscomp$0 = ResponderSyntheticEvent.getPooled(JSCompiler_temp, JSCompiler_temp$jscomp$0, nativeEvent, nativeEventTarget);
        JSCompiler_temp$jscomp$0.touchHistory = ResponderTouchHistoryStore.touchHistory;
        targetInst ? forEachAccumulated(JSCompiler_temp$jscomp$0, accumulateTwoPhaseDispatchesSingleSkipTarget) : forEachAccumulated(JSCompiler_temp$jscomp$0, accumulateTwoPhaseDispatchesSingle);

        b: {
          JSCompiler_temp = JSCompiler_temp$jscomp$0._dispatchListeners;
          targetInst = JSCompiler_temp$jscomp$0._dispatchInstances;
          if (Array.isArray(JSCompiler_temp)) for (depthA = 0; depthA < JSCompiler_temp.length && !JSCompiler_temp$jscomp$0.isPropagationStopped(); depthA++) {
            if (JSCompiler_temp[depthA](JSCompiler_temp$jscomp$0, targetInst[depthA])) {
              JSCompiler_temp = targetInst[depthA];
              break b;
            }
          } else if (JSCompiler_temp && JSCompiler_temp(JSCompiler_temp$jscomp$0, targetInst)) {
            JSCompiler_temp = targetInst;
            break b;
          }
          JSCompiler_temp = null;
        }

        JSCompiler_temp$jscomp$0._dispatchInstances = null;
        JSCompiler_temp$jscomp$0._dispatchListeners = null;
        JSCompiler_temp$jscomp$0.isPersistent() || JSCompiler_temp$jscomp$0.constructor.release(JSCompiler_temp$jscomp$0);
        JSCompiler_temp && JSCompiler_temp !== responderInst ? (JSCompiler_temp$jscomp$0 = undefined, targetInst = ResponderSyntheticEvent.getPooled(eventTypes.responderGrant, JSCompiler_temp, nativeEvent, nativeEventTarget), targetInst.touchHistory = ResponderTouchHistoryStore.touchHistory, forEachAccumulated(targetInst, accumulateDirectDispatchesSingle), depthA = true === executeDirectDispatch(targetInst), responderInst ? (tempA = ResponderSyntheticEvent.getPooled(eventTypes.responderTerminationRequest, responderInst, nativeEvent, nativeEventTarget), tempA.touchHistory = ResponderTouchHistoryStore.touchHistory, forEachAccumulated(tempA, accumulateDirectDispatchesSingle), tempB = !tempA._dispatchListeners || executeDirectDispatch(tempA), tempA.isPersistent() || tempA.constructor.release(tempA), tempB ? (tempA = ResponderSyntheticEvent.getPooled(eventTypes.responderTerminate, responderInst, nativeEvent, nativeEventTarget), tempA.touchHistory = ResponderTouchHistoryStore.touchHistory, forEachAccumulated(tempA, accumulateDirectDispatchesSingle), JSCompiler_temp$jscomp$0 = accumulate(JSCompiler_temp$jscomp$0, [targetInst, tempA]), changeResponder(JSCompiler_temp, depthA)) : (JSCompiler_temp = ResponderSyntheticEvent.getPooled(eventTypes.responderReject, JSCompiler_temp, nativeEvent, nativeEventTarget), JSCompiler_temp.touchHistory = ResponderTouchHistoryStore.touchHistory, forEachAccumulated(JSCompiler_temp, accumulateDirectDispatchesSingle), JSCompiler_temp$jscomp$0 = accumulate(JSCompiler_temp$jscomp$0, JSCompiler_temp))) : (JSCompiler_temp$jscomp$0 = accumulate(JSCompiler_temp$jscomp$0, targetInst), changeResponder(JSCompiler_temp, depthA)), JSCompiler_temp = JSCompiler_temp$jscomp$0) : JSCompiler_temp = null;
      } else JSCompiler_temp = null;

      JSCompiler_temp$jscomp$0 = responderInst && isStartish(topLevelType);
      targetInst = responderInst && isMoveish(topLevelType);
      depthA = responderInst && ("topTouchEnd" === topLevelType || "topTouchCancel" === topLevelType);
      if (JSCompiler_temp$jscomp$0 = JSCompiler_temp$jscomp$0 ? eventTypes.responderStart : targetInst ? eventTypes.responderMove : depthA ? eventTypes.responderEnd : null) JSCompiler_temp$jscomp$0 = ResponderSyntheticEvent.getPooled(JSCompiler_temp$jscomp$0, responderInst, nativeEvent, nativeEventTarget), JSCompiler_temp$jscomp$0.touchHistory = ResponderTouchHistoryStore.touchHistory, forEachAccumulated(JSCompiler_temp$jscomp$0, accumulateDirectDispatchesSingle), JSCompiler_temp = accumulate(JSCompiler_temp, JSCompiler_temp$jscomp$0);
      JSCompiler_temp$jscomp$0 = responderInst && "topTouchCancel" === topLevelType;
      if (topLevelType = responderInst && !JSCompiler_temp$jscomp$0 && ("topTouchEnd" === topLevelType || "topTouchCancel" === topLevelType)) a: {
        if ((topLevelType = nativeEvent.touches) && 0 !== topLevelType.length) for (targetInst = 0; targetInst < topLevelType.length; targetInst++) {
          if (depthA = topLevelType[targetInst].target, null !== depthA && undefined !== depthA && 0 !== depthA) {
            tempA = getInstanceFromNode(depthA);

            b: {
              for (depthA = responderInst; tempA;) {
                if (depthA === tempA || depthA === tempA.alternate) {
                  depthA = true;
                  break b;
                }

                tempA = getParent(tempA);
              }

              depthA = false;
            }

            if (depthA) {
              topLevelType = false;
              break a;
            }
          }
        }
        topLevelType = true;
      }
      if (topLevelType = JSCompiler_temp$jscomp$0 ? eventTypes.responderTerminate : topLevelType ? eventTypes.responderRelease : null) nativeEvent = ResponderSyntheticEvent.getPooled(topLevelType, responderInst, nativeEvent, nativeEventTarget), nativeEvent.touchHistory = ResponderTouchHistoryStore.touchHistory, forEachAccumulated(nativeEvent, accumulateDirectDispatchesSingle), JSCompiler_temp = accumulate(JSCompiler_temp, nativeEvent), changeResponder(null);
      return JSCompiler_temp;
    },
    GlobalResponderHandler: null,
    injection: {
      injectGlobalResponderHandler: function injectGlobalResponderHandler(GlobalResponderHandler) {
        ResponderEventPlugin.GlobalResponderHandler = GlobalResponderHandler;
      }
    }
  },
      customBubblingEventTypes = ReactNativePrivateInterface.ReactNativeViewConfigRegistry.customBubblingEventTypes,
      customDirectEventTypes = ReactNativePrivateInterface.ReactNativeViewConfigRegistry.customDirectEventTypes;
  injection.injectEventPluginOrder(["ResponderEventPlugin", "ReactNativeBridgeEventPlugin"]);
  injection.injectEventPluginsByName({
    ResponderEventPlugin: ResponderEventPlugin,
    ReactNativeBridgeEventPlugin: {
      eventTypes: {},
      extractEvents: function extractEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
        if (null == targetInst) return null;
        var bubbleDispatchConfig = customBubblingEventTypes[topLevelType],
            directDispatchConfig = customDirectEventTypes[topLevelType];
        if (!bubbleDispatchConfig && !directDispatchConfig) throw ReactError(Error('Unsupported top level event type "' + topLevelType + '" dispatched'));
        topLevelType = SyntheticEvent.getPooled(bubbleDispatchConfig || directDispatchConfig, targetInst, nativeEvent, nativeEventTarget);
        if (bubbleDispatchConfig) forEachAccumulated(topLevelType, accumulateTwoPhaseDispatchesSingle);else if (directDispatchConfig) forEachAccumulated(topLevelType, accumulateDirectDispatchesSingle);else return null;
        return topLevelType;
      }
    }
  });
  var instanceCache = new Map(),
      instanceProps = new Map();

  function getInstanceFromTag(tag) {
    return instanceCache.get(tag) || null;
  }

  var restoreTarget = null,
      restoreQueue = null;

  function restoreStateOfTarget(target) {
    if (getInstanceFromNode(target)) throw ReactError(Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue."));
  }

  function batchedUpdatesImpl(fn, bookkeeping) {
    return fn(bookkeeping);
  }

  function flushDiscreteUpdatesImpl() {}

  var isInsideEventHandler = false;

  function batchedUpdates(fn, bookkeeping) {
    if (isInsideEventHandler) return fn(bookkeeping);
    isInsideEventHandler = true;

    try {
      return batchedUpdatesImpl(fn, bookkeeping);
    } finally {
      if (isInsideEventHandler = false, null !== restoreTarget || null !== restoreQueue) if (flushDiscreteUpdatesImpl(), restoreTarget && (bookkeeping = restoreTarget, fn = restoreQueue, restoreQueue = restoreTarget = null, restoreStateOfTarget(bookkeeping), fn)) for (bookkeeping = 0; bookkeeping < fn.length; bookkeeping++) {
        restoreStateOfTarget(fn[bookkeeping]);
      }
    }
  }

  var EMPTY_NATIVE_EVENT = {};

  function _receiveRootNodeIDEvent(rootNodeID, topLevelType, nativeEventParam) {
    var nativeEvent = nativeEventParam || EMPTY_NATIVE_EVENT,
        inst = getInstanceFromTag(rootNodeID);
    batchedUpdates(function () {
      var events = nativeEvent.target;

      for (var events$jscomp$0 = null, i = 0; i < plugins.length; i++) {
        var possiblePlugin = plugins[i];
        possiblePlugin && (possiblePlugin = possiblePlugin.extractEvents(topLevelType, inst, nativeEvent, events)) && (events$jscomp$0 = accumulateInto(events$jscomp$0, possiblePlugin));
      }

      events = events$jscomp$0;
      null !== events && (eventQueue = accumulateInto(eventQueue, events));
      events = eventQueue;
      eventQueue = null;

      if (events) {
        forEachAccumulated(events, executeDispatchesAndReleaseTopLevel);
        if (eventQueue) throw ReactError(Error("processEventQueue(): Additional events were enqueued while processing an event queue. Support for this has not yet been implemented."));
        if (hasRethrowError) throw events = rethrowError, hasRethrowError = false, rethrowError = null, events;
      }
    });
  }

  ReactNativePrivateInterface.RCTEventEmitter.register({
    receiveEvent: function receiveEvent(rootNodeID, topLevelType, nativeEventParam) {
      _receiveRootNodeIDEvent(rootNodeID, topLevelType, nativeEventParam);
    },
    receiveTouches: function receiveTouches(eventTopLevelType, touches, changedIndices) {
      if ("topTouchEnd" === eventTopLevelType || "topTouchCancel" === eventTopLevelType) {
        var JSCompiler_temp = [];

        for (var i = 0; i < changedIndices.length; i++) {
          var index = changedIndices[i];
          JSCompiler_temp.push(touches[index]);
          touches[index] = null;
        }

        for (i = changedIndices = 0; i < touches.length; i++) {
          index = touches[i], null !== index && (touches[changedIndices++] = index);
        }

        touches.length = changedIndices;
      } else for (JSCompiler_temp = [], i = 0; i < changedIndices.length; i++) {
        JSCompiler_temp.push(touches[changedIndices[i]]);
      }

      for (changedIndices = 0; changedIndices < JSCompiler_temp.length; changedIndices++) {
        i = JSCompiler_temp[changedIndices];
        i.changedTouches = JSCompiler_temp;
        i.touches = touches;
        index = null;
        var target = i.target;
        null === target || undefined === target || 1 > target || (index = target);

        _receiveRootNodeIDEvent(index, eventTopLevelType, i);
      }
    }
  });

  getFiberCurrentPropsFromNode = function getFiberCurrentPropsFromNode(stateNode) {
    return instanceProps.get(stateNode._nativeTag) || null;
  };

  getInstanceFromNode = getInstanceFromTag;

  getNodeFromInstance = function getNodeFromInstance(inst) {
    var tag = inst.stateNode._nativeTag;
    undefined === tag && (tag = inst.stateNode.canonical._nativeTag);
    if (!tag) throw ReactError(Error("All native instances should have a tag."));
    return tag;
  };

  ResponderEventPlugin.injection.injectGlobalResponderHandler({
    onChange: function onChange(from, to, blockNativeResponder) {
      null !== to ? ReactNativePrivateInterface.UIManager.setJSResponder(to.stateNode._nativeTag, blockNativeResponder) : ReactNativePrivateInterface.UIManager.clearJSResponder();
    }
  });
  var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  ReactSharedInternals.hasOwnProperty("ReactCurrentDispatcher") || (ReactSharedInternals.ReactCurrentDispatcher = {
    current: null
  });
  ReactSharedInternals.hasOwnProperty("ReactCurrentBatchConfig") || (ReactSharedInternals.ReactCurrentBatchConfig = {
    suspense: null
  });
  var hasSymbol = "function" === typeof Symbol && (typeof Symbol === "function" ? Symbol.for : "@@for"),
      REACT_ELEMENT_TYPE = hasSymbol ? (typeof Symbol === "function" ? Symbol.for : "@@for")("react.element") : 60103,
      REACT_PORTAL_TYPE = hasSymbol ? (typeof Symbol === "function" ? Symbol.for : "@@for")("react.portal") : 60106,
      REACT_FRAGMENT_TYPE = hasSymbol ? (typeof Symbol === "function" ? Symbol.for : "@@for")("react.fragment") : 60107,
      REACT_STRICT_MODE_TYPE = hasSymbol ? (typeof Symbol === "function" ? Symbol.for : "@@for")("react.strict_mode") : 60108,
      REACT_PROFILER_TYPE = hasSymbol ? (typeof Symbol === "function" ? Symbol.for : "@@for")("react.profiler") : 60114,
      REACT_PROVIDER_TYPE = hasSymbol ? (typeof Symbol === "function" ? Symbol.for : "@@for")("react.provider") : 60109,
      REACT_CONTEXT_TYPE = hasSymbol ? (typeof Symbol === "function" ? Symbol.for : "@@for")("react.context") : 60110,
      REACT_CONCURRENT_MODE_TYPE = hasSymbol ? (typeof Symbol === "function" ? Symbol.for : "@@for")("react.concurrent_mode") : 60111,
      REACT_FORWARD_REF_TYPE = hasSymbol ? (typeof Symbol === "function" ? Symbol.for : "@@for")("react.forward_ref") : 60112,
      REACT_SUSPENSE_TYPE = hasSymbol ? (typeof Symbol === "function" ? Symbol.for : "@@for")("react.suspense") : 60113,
      REACT_SUSPENSE_LIST_TYPE = hasSymbol ? (typeof Symbol === "function" ? Symbol.for : "@@for")("react.suspense_list") : 60120,
      REACT_MEMO_TYPE = hasSymbol ? (typeof Symbol === "function" ? Symbol.for : "@@for")("react.memo") : 60115,
      REACT_LAZY_TYPE = hasSymbol ? (typeof Symbol === "function" ? Symbol.for : "@@for")("react.lazy") : 60116;
  hasSymbol && (typeof Symbol === "function" ? Symbol.for : "@@for")("react.fundamental");
  hasSymbol && (typeof Symbol === "function" ? Symbol.for : "@@for")("react.responder");
  var MAYBE_ITERATOR_SYMBOL = "function" === typeof Symbol && (typeof Symbol === "function" ? Symbol.iterator : "@@iterator");

  function getIteratorFn(maybeIterable) {
    if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
    maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
    return "function" === typeof maybeIterable ? maybeIterable : null;
  }

  function getComponentName(type) {
    if (null == type) return null;
    if ("function" === typeof type) return type.displayName || type.name || null;
    if ("string" === typeof type) return type;

    switch (type) {
      case REACT_FRAGMENT_TYPE:
        return "Fragment";

      case REACT_PORTAL_TYPE:
        return "Portal";

      case REACT_PROFILER_TYPE:
        return "Profiler";

      case REACT_STRICT_MODE_TYPE:
        return "StrictMode";

      case REACT_SUSPENSE_TYPE:
        return "Suspense";

      case REACT_SUSPENSE_LIST_TYPE:
        return "SuspenseList";
    }

    if ("object" === typeof type) switch (type.$$typeof) {
      case REACT_CONTEXT_TYPE:
        return "Context.Consumer";

      case REACT_PROVIDER_TYPE:
        return "Context.Provider";

      case REACT_FORWARD_REF_TYPE:
        var innerType = type.render;
        innerType = innerType.displayName || innerType.name || "";
        return type.displayName || ("" !== innerType ? "ForwardRef(" + innerType + ")" : "ForwardRef");

      case REACT_MEMO_TYPE:
        return getComponentName(type.type);

      case REACT_LAZY_TYPE:
        if (type = 1 === type._status ? type._result : null) return getComponentName(type);
    }
    return null;
  }

  function isFiberMountedImpl(fiber) {
    var node = fiber;
    if (fiber.alternate) for (; node.return;) {
      node = node.return;
    } else {
      if (0 !== (node.effectTag & 2)) return 1;

      for (; node.return;) {
        if (node = node.return, 0 !== (node.effectTag & 2)) return 1;
      }
    }
    return 3 === node.tag ? 2 : 3;
  }

  function assertIsMounted(fiber) {
    if (2 !== isFiberMountedImpl(fiber)) throw ReactError(Error("Unable to find node on an unmounted component."));
  }

  function findCurrentFiberUsingSlowPath(fiber) {
    var alternate = fiber.alternate;

    if (!alternate) {
      alternate = isFiberMountedImpl(fiber);
      if (3 === alternate) throw ReactError(Error("Unable to find node on an unmounted component."));
      return 1 === alternate ? null : fiber;
    }

    for (var a = fiber, b = alternate;;) {
      var parentA = a.return;
      if (null === parentA) break;
      var parentB = parentA.alternate;

      if (null === parentB) {
        b = parentA.return;

        if (null !== b) {
          a = b;
          continue;
        }

        break;
      }

      if (parentA.child === parentB.child) {
        for (parentB = parentA.child; parentB;) {
          if (parentB === a) return assertIsMounted(parentA), fiber;
          if (parentB === b) return assertIsMounted(parentA), alternate;
          parentB = parentB.sibling;
        }

        throw ReactError(Error("Unable to find node on an unmounted component."));
      }

      if (a.return !== b.return) a = parentA, b = parentB;else {
        for (var didFindChild = false, _child = parentA.child; _child;) {
          if (_child === a) {
            didFindChild = true;
            a = parentA;
            b = parentB;
            break;
          }

          if (_child === b) {
            didFindChild = true;
            b = parentA;
            a = parentB;
            break;
          }

          _child = _child.sibling;
        }

        if (!didFindChild) {
          for (_child = parentB.child; _child;) {
            if (_child === a) {
              didFindChild = true;
              a = parentB;
              b = parentA;
              break;
            }

            if (_child === b) {
              didFindChild = true;
              b = parentB;
              a = parentA;
              break;
            }

            _child = _child.sibling;
          }

          if (!didFindChild) throw ReactError(Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue."));
        }
      }
      if (a.alternate !== b) throw ReactError(Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue."));
    }

    if (3 !== a.tag) throw ReactError(Error("Unable to find node on an unmounted component."));
    return a.stateNode.current === a ? fiber : alternate;
  }

  function findCurrentHostFiber(parent) {
    parent = findCurrentFiberUsingSlowPath(parent);
    if (!parent) return null;

    for (var node = parent;;) {
      if (5 === node.tag || 6 === node.tag) return node;
      if (node.child) node.child.return = node, node = node.child;else {
        if (node === parent) break;

        for (; !node.sibling;) {
          if (!node.return || node.return === parent) return null;
          node = node.return;
        }

        node.sibling.return = node.return;
        node = node.sibling;
      }
    }

    return null;
  }

  var emptyObject = {},
      removedKeys = null,
      removedKeyCount = 0;

  function restoreDeletedValuesInNestedArray(updatePayload, node, validAttributes) {
    if (Array.isArray(node)) for (var i = node.length; i-- && 0 < removedKeyCount;) {
      restoreDeletedValuesInNestedArray(updatePayload, node[i], validAttributes);
    } else if (node && 0 < removedKeyCount) for (i in removedKeys) {
      if (removedKeys[i]) {
        var nextProp = node[i];

        if (undefined !== nextProp) {
          var attributeConfig = validAttributes[i];

          if (attributeConfig) {
            "function" === typeof nextProp && (nextProp = true);
            "undefined" === typeof nextProp && (nextProp = null);
            if ("object" !== typeof attributeConfig) updatePayload[i] = nextProp;else if ("function" === typeof attributeConfig.diff || "function" === typeof attributeConfig.process) nextProp = "function" === typeof attributeConfig.process ? attributeConfig.process(nextProp) : nextProp, updatePayload[i] = nextProp;
            removedKeys[i] = false;
            removedKeyCount--;
          }
        }
      }
    }
  }

  function diffNestedProperty(updatePayload, prevProp, nextProp, validAttributes) {
    if (!updatePayload && prevProp === nextProp) return updatePayload;
    if (!prevProp || !nextProp) return nextProp ? addNestedProperty(updatePayload, nextProp, validAttributes) : prevProp ? clearNestedProperty(updatePayload, prevProp, validAttributes) : updatePayload;
    if (!Array.isArray(prevProp) && !Array.isArray(nextProp)) return diffProperties(updatePayload, prevProp, nextProp, validAttributes);

    if (Array.isArray(prevProp) && Array.isArray(nextProp)) {
      var minLength = prevProp.length < nextProp.length ? prevProp.length : nextProp.length,
          i;

      for (i = 0; i < minLength; i++) {
        updatePayload = diffNestedProperty(updatePayload, prevProp[i], nextProp[i], validAttributes);
      }

      for (; i < prevProp.length; i++) {
        updatePayload = clearNestedProperty(updatePayload, prevProp[i], validAttributes);
      }

      for (; i < nextProp.length; i++) {
        updatePayload = addNestedProperty(updatePayload, nextProp[i], validAttributes);
      }

      return updatePayload;
    }

    return Array.isArray(prevProp) ? diffProperties(updatePayload, ReactNativePrivateInterface.flattenStyle(prevProp), nextProp, validAttributes) : diffProperties(updatePayload, prevProp, ReactNativePrivateInterface.flattenStyle(nextProp), validAttributes);
  }

  function addNestedProperty(updatePayload, nextProp, validAttributes) {
    if (!nextProp) return updatePayload;
    if (!Array.isArray(nextProp)) return diffProperties(updatePayload, emptyObject, nextProp, validAttributes);

    for (var i = 0; i < nextProp.length; i++) {
      updatePayload = addNestedProperty(updatePayload, nextProp[i], validAttributes);
    }

    return updatePayload;
  }

  function clearNestedProperty(updatePayload, prevProp, validAttributes) {
    if (!prevProp) return updatePayload;
    if (!Array.isArray(prevProp)) return diffProperties(updatePayload, prevProp, emptyObject, validAttributes);

    for (var i = 0; i < prevProp.length; i++) {
      updatePayload = clearNestedProperty(updatePayload, prevProp[i], validAttributes);
    }

    return updatePayload;
  }

  function diffProperties(updatePayload, prevProps, nextProps, validAttributes) {
    var attributeConfig, propKey;

    for (propKey in nextProps) {
      if (attributeConfig = validAttributes[propKey]) {
        var prevProp = prevProps[propKey];
        var nextProp = nextProps[propKey];
        "function" === typeof nextProp && (nextProp = true, "function" === typeof prevProp && (prevProp = true));
        "undefined" === typeof nextProp && (nextProp = null, "undefined" === typeof prevProp && (prevProp = null));
        removedKeys && (removedKeys[propKey] = false);
        if (updatePayload && undefined !== updatePayload[propKey]) {
          if ("object" !== typeof attributeConfig) updatePayload[propKey] = nextProp;else {
            if ("function" === typeof attributeConfig.diff || "function" === typeof attributeConfig.process) attributeConfig = "function" === typeof attributeConfig.process ? attributeConfig.process(nextProp) : nextProp, updatePayload[propKey] = attributeConfig;
          }
        } else if (prevProp !== nextProp) if ("object" !== typeof attributeConfig) ("object" !== typeof nextProp || null === nextProp || ReactNativePrivateInterface.deepDiffer(prevProp, nextProp)) && ((updatePayload || (updatePayload = {}))[propKey] = nextProp);else if ("function" === typeof attributeConfig.diff || "function" === typeof attributeConfig.process) {
          if (undefined === prevProp || ("function" === typeof attributeConfig.diff ? attributeConfig.diff(prevProp, nextProp) : "object" !== typeof nextProp || null === nextProp || ReactNativePrivateInterface.deepDiffer(prevProp, nextProp))) attributeConfig = "function" === typeof attributeConfig.process ? attributeConfig.process(nextProp) : nextProp, (updatePayload || (updatePayload = {}))[propKey] = attributeConfig;
        } else removedKeys = null, removedKeyCount = 0, updatePayload = diffNestedProperty(updatePayload, prevProp, nextProp, attributeConfig), 0 < removedKeyCount && updatePayload && (restoreDeletedValuesInNestedArray(updatePayload, nextProp, attributeConfig), removedKeys = null);
      }
    }

    for (var _propKey in prevProps) {
      undefined === nextProps[_propKey] && (!(attributeConfig = validAttributes[_propKey]) || updatePayload && undefined !== updatePayload[_propKey] || (prevProp = prevProps[_propKey], undefined !== prevProp && ("object" !== typeof attributeConfig || "function" === typeof attributeConfig.diff || "function" === typeof attributeConfig.process ? ((updatePayload || (updatePayload = {}))[_propKey] = null, removedKeys || (removedKeys = {}), removedKeys[_propKey] || (removedKeys[_propKey] = true, removedKeyCount++)) : updatePayload = clearNestedProperty(updatePayload, prevProp, attributeConfig))));
    }

    return updatePayload;
  }

  function mountSafeCallback_NOT_REALLY_SAFE(context, callback) {
    return function () {
      if (callback && ("boolean" !== typeof context.__isMounted || context.__isMounted)) return callback.apply(context, arguments);
    };
  }

  var ReactNativeFiberHostComponent = function () {
    function ReactNativeFiberHostComponent(tag, viewConfig) {
      if (!(this instanceof ReactNativeFiberHostComponent)) throw new TypeError("Cannot call a class as a function");
      this._nativeTag = tag;
      this._children = [];
      this.viewConfig = viewConfig;
    }

    ReactNativeFiberHostComponent.prototype.blur = function () {
      ReactNativePrivateInterface.TextInputState.blurTextInput(this._nativeTag);
    };

    ReactNativeFiberHostComponent.prototype.focus = function () {
      ReactNativePrivateInterface.TextInputState.focusTextInput(this._nativeTag);
    };

    ReactNativeFiberHostComponent.prototype.measure = function (callback) {
      ReactNativePrivateInterface.UIManager.measure(this._nativeTag, mountSafeCallback_NOT_REALLY_SAFE(this, callback));
    };

    ReactNativeFiberHostComponent.prototype.measureInWindow = function (callback) {
      ReactNativePrivateInterface.UIManager.measureInWindow(this._nativeTag, mountSafeCallback_NOT_REALLY_SAFE(this, callback));
    };

    ReactNativeFiberHostComponent.prototype.measureLayout = function (relativeToNativeNode, onSuccess, onFail) {
      var relativeNode = undefined;
      "number" === typeof relativeToNativeNode ? relativeNode = relativeToNativeNode : relativeToNativeNode._nativeTag ? relativeNode = relativeToNativeNode._nativeTag : relativeToNativeNode.canonical && relativeToNativeNode.canonical._nativeTag && (relativeNode = relativeToNativeNode.canonical._nativeTag);
      null != relativeNode && ReactNativePrivateInterface.UIManager.measureLayout(this._nativeTag, relativeNode, mountSafeCallback_NOT_REALLY_SAFE(this, onFail), mountSafeCallback_NOT_REALLY_SAFE(this, onSuccess));
    };

    ReactNativeFiberHostComponent.prototype.setNativeProps = function (nativeProps) {
      nativeProps = diffProperties(null, emptyObject, nativeProps, this.viewConfig.validAttributes);
      null != nativeProps && ReactNativePrivateInterface.UIManager.updateView(this._nativeTag, this.viewConfig.uiViewClassName, nativeProps);
    };

    return ReactNativeFiberHostComponent;
  }();

  function shim$1() {
    throw ReactError(Error("The current renderer does not support hydration. This error is likely caused by a bug in React. Please file an issue."));
  }

  var getViewConfigForType = ReactNativePrivateInterface.ReactNativeViewConfigRegistry.get,
      UPDATE_SIGNAL = {},
      nextReactTag = 3;

  function allocateTag() {
    var tag = nextReactTag;
    1 === tag % 10 && (tag += 2);
    nextReactTag = tag + 2;
    return tag;
  }

  function recursivelyUncacheFiberNode(node) {
    if ("number" === typeof node) instanceCache.delete(node), instanceProps.delete(node);else {
      var tag = node._nativeTag;
      instanceCache.delete(tag);
      instanceProps.delete(tag);

      node._children.forEach(recursivelyUncacheFiberNode);
    }
  }

  function finalizeInitialChildren(parentInstance) {
    if (0 === parentInstance._children.length) return false;

    var nativeTags = parentInstance._children.map(function (child) {
      return "number" === typeof child ? child : child._nativeTag;
    });

    ReactNativePrivateInterface.UIManager.setChildren(parentInstance._nativeTag, nativeTags);
    return false;
  }

  var scheduleTimeout = setTimeout,
      cancelTimeout = clearTimeout,
      BEFORE_SLASH_RE = /^(.*)[\\\/]/;

  function getStackByFiberInDevAndProd(workInProgress) {
    var info = "";

    do {
      a: switch (workInProgress.tag) {
        case 3:
        case 4:
        case 6:
        case 7:
        case 10:
        case 9:
          var JSCompiler_inline_result = "";
          break a;

        default:
          var owner = workInProgress._debugOwner,
              source = workInProgress._debugSource,
              name = getComponentName(workInProgress.type);
          JSCompiler_inline_result = null;
          owner && (JSCompiler_inline_result = getComponentName(owner.type));
          owner = name;
          name = "";
          source ? name = " (at " + source.fileName.replace(BEFORE_SLASH_RE, "") + ":" + source.lineNumber + ")" : JSCompiler_inline_result && (name = " (created by " + JSCompiler_inline_result + ")");
          JSCompiler_inline_result = "\n    in " + (owner || "Unknown") + name;
      }

      info += JSCompiler_inline_result;
      workInProgress = workInProgress.return;
    } while (workInProgress);

    return info;
  }

  new Set();
  var valueStack = [],
      index = -1;

  function pop(cursor) {
    0 > index || (cursor.current = valueStack[index], valueStack[index] = null, index--);
  }

  function push(cursor, value) {
    index++;
    valueStack[index] = cursor.current;
    cursor.current = value;
  }

  var emptyContextObject = {},
      contextStackCursor = {
    current: emptyContextObject
  },
      didPerformWorkStackCursor = {
    current: false
  },
      previousContext = emptyContextObject;

  function getMaskedContext(workInProgress, unmaskedContext) {
    var contextTypes = workInProgress.type.contextTypes;
    if (!contextTypes) return emptyContextObject;
    var instance = workInProgress.stateNode;
    if (instance && instance.__reactInternalMemoizedUnmaskedChildContext === unmaskedContext) return instance.__reactInternalMemoizedMaskedChildContext;
    var context = {},
        key;

    for (key in contextTypes) {
      context[key] = unmaskedContext[key];
    }

    instance && (workInProgress = workInProgress.stateNode, workInProgress.__reactInternalMemoizedUnmaskedChildContext = unmaskedContext, workInProgress.__reactInternalMemoizedMaskedChildContext = context);
    return context;
  }

  function isContextProvider(type) {
    type = type.childContextTypes;
    return null !== type && undefined !== type;
  }

  function popContext(fiber) {
    pop(didPerformWorkStackCursor, fiber);
    pop(contextStackCursor, fiber);
  }

  function popTopLevelContextObject(fiber) {
    pop(didPerformWorkStackCursor, fiber);
    pop(contextStackCursor, fiber);
  }

  function pushTopLevelContextObject(fiber, context, didChange) {
    if (contextStackCursor.current !== emptyContextObject) throw ReactError(Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue."));
    push(contextStackCursor, context, fiber);
    push(didPerformWorkStackCursor, didChange, fiber);
  }

  function processChildContext(fiber, type, parentContext) {
    var instance = fiber.stateNode;
    fiber = type.childContextTypes;
    if ("function" !== typeof instance.getChildContext) return parentContext;
    instance = instance.getChildContext();

    for (var contextKey in instance) {
      if (!(contextKey in fiber)) throw ReactError(Error((getComponentName(type) || "Unknown") + '.getChildContext(): key "' + contextKey + '" is not defined in childContextTypes.'));
    }

    return _extends({}, parentContext, instance);
  }

  function pushContextProvider(workInProgress) {
    var instance = workInProgress.stateNode;
    instance = instance && instance.__reactInternalMemoizedMergedChildContext || emptyContextObject;
    previousContext = contextStackCursor.current;
    push(contextStackCursor, instance, workInProgress);
    push(didPerformWorkStackCursor, didPerformWorkStackCursor.current, workInProgress);
    return true;
  }

  function invalidateContextProvider(workInProgress, type, didChange) {
    var instance = workInProgress.stateNode;
    if (!instance) throw ReactError(Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue."));
    didChange ? (type = processChildContext(workInProgress, type, previousContext), instance.__reactInternalMemoizedMergedChildContext = type, pop(didPerformWorkStackCursor, workInProgress), pop(contextStackCursor, workInProgress), push(contextStackCursor, type, workInProgress)) : pop(didPerformWorkStackCursor, workInProgress);
    push(didPerformWorkStackCursor, didChange, workInProgress);
  }

  var Scheduler_runWithPriority = Scheduler.unstable_runWithPriority,
      Scheduler_scheduleCallback = Scheduler.unstable_scheduleCallback,
      Scheduler_cancelCallback = Scheduler.unstable_cancelCallback,
      Scheduler_shouldYield = Scheduler.unstable_shouldYield,
      Scheduler_requestPaint = Scheduler.unstable_requestPaint,
      Scheduler_now = Scheduler.unstable_now,
      Scheduler_getCurrentPriorityLevel = Scheduler.unstable_getCurrentPriorityLevel,
      Scheduler_ImmediatePriority = Scheduler.unstable_ImmediatePriority,
      Scheduler_UserBlockingPriority = Scheduler.unstable_UserBlockingPriority,
      Scheduler_NormalPriority = Scheduler.unstable_NormalPriority,
      Scheduler_LowPriority = Scheduler.unstable_LowPriority,
      Scheduler_IdlePriority = Scheduler.unstable_IdlePriority,
      fakeCallbackNode = {},
      requestPaint = undefined !== Scheduler_requestPaint ? Scheduler_requestPaint : function () {},
      syncQueue = null,
      immediateQueueCallbackNode = null,
      isFlushingSyncQueue = false,
      initialTimeMs = Scheduler_now(),
      now = 1e4 > initialTimeMs ? Scheduler_now : function () {
    return Scheduler_now() - initialTimeMs;
  };

  function getCurrentPriorityLevel() {
    switch (Scheduler_getCurrentPriorityLevel()) {
      case Scheduler_ImmediatePriority:
        return 99;

      case Scheduler_UserBlockingPriority:
        return 98;

      case Scheduler_NormalPriority:
        return 97;

      case Scheduler_LowPriority:
        return 96;

      case Scheduler_IdlePriority:
        return 95;

      default:
        throw ReactError(Error("Unknown priority level."));
    }
  }

  function reactPriorityToSchedulerPriority(reactPriorityLevel) {
    switch (reactPriorityLevel) {
      case 99:
        return Scheduler_ImmediatePriority;

      case 98:
        return Scheduler_UserBlockingPriority;

      case 97:
        return Scheduler_NormalPriority;

      case 96:
        return Scheduler_LowPriority;

      case 95:
        return Scheduler_IdlePriority;

      default:
        throw ReactError(Error("Unknown priority level."));
    }
  }

  function runWithPriority(reactPriorityLevel, fn) {
    reactPriorityLevel = reactPriorityToSchedulerPriority(reactPriorityLevel);
    return Scheduler_runWithPriority(reactPriorityLevel, fn);
  }

  function scheduleCallback(reactPriorityLevel, callback, options) {
    reactPriorityLevel = reactPriorityToSchedulerPriority(reactPriorityLevel);
    return Scheduler_scheduleCallback(reactPriorityLevel, callback, options);
  }

  function scheduleSyncCallback(callback) {
    null === syncQueue ? (syncQueue = [callback], immediateQueueCallbackNode = Scheduler_scheduleCallback(Scheduler_ImmediatePriority, flushSyncCallbackQueueImpl)) : syncQueue.push(callback);
    return fakeCallbackNode;
  }

  function flushSyncCallbackQueue() {
    null !== immediateQueueCallbackNode && Scheduler_cancelCallback(immediateQueueCallbackNode);
    flushSyncCallbackQueueImpl();
  }

  function flushSyncCallbackQueueImpl() {
    if (!isFlushingSyncQueue && null !== syncQueue) {
      isFlushingSyncQueue = true;
      var i = 0;

      try {
        var queue = syncQueue;
        runWithPriority(99, function () {
          for (; i < queue.length; i++) {
            var callback = queue[i];

            do {
              callback = callback(true);
            } while (null !== callback);
          }
        });
        syncQueue = null;
      } catch (error) {
        throw null !== syncQueue && (syncQueue = syncQueue.slice(i + 1)), Scheduler_scheduleCallback(Scheduler_ImmediatePriority, flushSyncCallbackQueue), error;
      } finally {
        isFlushingSyncQueue = false;
      }
    }
  }

  function inferPriorityFromExpirationTime(currentTime, expirationTime) {
    if (1073741823 === expirationTime) return 99;
    if (1 === expirationTime) return 95;
    currentTime = 10 * (1073741821 - expirationTime) - 10 * (1073741821 - currentTime);
    return 0 >= currentTime ? 99 : 250 >= currentTime ? 98 : 5250 >= currentTime ? 97 : 95;
  }

  function is(x, y) {
    return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
  }

  var hasOwnProperty = Object.prototype.hasOwnProperty;

  function shallowEqual(objA, objB) {
    if (is(objA, objB)) return true;
    if ("object" !== typeof objA || null === objA || "object" !== typeof objB || null === objB) return false;
    var keysA = Object.keys(objA),
        keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) return false;

    for (keysB = 0; keysB < keysA.length; keysB++) {
      if (!hasOwnProperty.call(objB, keysA[keysB]) || !is(objA[keysA[keysB]], objB[keysA[keysB]])) return false;
    }

    return true;
  }

  function resolveDefaultProps(Component, baseProps) {
    if (Component && Component.defaultProps) {
      baseProps = _extends({}, baseProps);
      Component = Component.defaultProps;

      for (var propName in Component) {
        undefined === baseProps[propName] && (baseProps[propName] = Component[propName]);
      }
    }

    return baseProps;
  }

  function readLazyComponentType(lazyComponent) {
    var result = lazyComponent._result;

    switch (lazyComponent._status) {
      case 1:
        return result;

      case 2:
        throw result;

      case 0:
        throw result;

      default:
        lazyComponent._status = 0;
        result = lazyComponent._ctor;
        result = result();
        result.then(function (moduleObject) {
          0 === lazyComponent._status && (moduleObject = moduleObject.default, lazyComponent._status = 1, lazyComponent._result = moduleObject);
        }, function (error) {
          0 === lazyComponent._status && (lazyComponent._status = 2, lazyComponent._result = error);
        });

        switch (lazyComponent._status) {
          case 1:
            return lazyComponent._result;

          case 2:
            throw lazyComponent._result;
        }

        lazyComponent._result = result;
        throw result;
    }
  }

  var valueCursor = {
    current: null
  },
      currentlyRenderingFiber = null,
      lastContextDependency = null,
      lastContextWithAllBitsObserved = null;

  function resetContextDependencies() {
    lastContextWithAllBitsObserved = lastContextDependency = currentlyRenderingFiber = null;
  }

  function pushProvider(providerFiber, nextValue) {
    var context = providerFiber.type._context;
    push(valueCursor, context._currentValue, providerFiber);
    context._currentValue = nextValue;
  }

  function popProvider(providerFiber) {
    var currentValue = valueCursor.current;
    pop(valueCursor, providerFiber);
    providerFiber.type._context._currentValue = currentValue;
  }

  function scheduleWorkOnParentPath(parent, renderExpirationTime) {
    for (; null !== parent;) {
      var alternate = parent.alternate;
      if (parent.childExpirationTime < renderExpirationTime) parent.childExpirationTime = renderExpirationTime, null !== alternate && alternate.childExpirationTime < renderExpirationTime && (alternate.childExpirationTime = renderExpirationTime);else if (null !== alternate && alternate.childExpirationTime < renderExpirationTime) alternate.childExpirationTime = renderExpirationTime;else break;
      parent = parent.return;
    }
  }

  function prepareToReadContext(workInProgress, renderExpirationTime) {
    currentlyRenderingFiber = workInProgress;
    lastContextWithAllBitsObserved = lastContextDependency = null;
    workInProgress = workInProgress.dependencies;
    null !== workInProgress && null !== workInProgress.firstContext && (workInProgress.expirationTime >= renderExpirationTime && (didReceiveUpdate = true), workInProgress.firstContext = null);
  }

  function readContext(context, observedBits) {
    if (lastContextWithAllBitsObserved !== context && false !== observedBits && 0 !== observedBits) {
      if ("number" !== typeof observedBits || 1073741823 === observedBits) lastContextWithAllBitsObserved = context, observedBits = 1073741823;
      observedBits = {
        context: context,
        observedBits: observedBits,
        next: null
      };

      if (null === lastContextDependency) {
        if (null === currentlyRenderingFiber) throw ReactError(Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."));
        lastContextDependency = observedBits;
        currentlyRenderingFiber.dependencies = {
          expirationTime: 0,
          firstContext: observedBits,
          responders: null
        };
      } else lastContextDependency = lastContextDependency.next = observedBits;
    }

    return context._currentValue;
  }

  var hasForceUpdate = false;

  function createUpdateQueue(baseState) {
    return {
      baseState: baseState,
      firstUpdate: null,
      lastUpdate: null,
      firstCapturedUpdate: null,
      lastCapturedUpdate: null,
      firstEffect: null,
      lastEffect: null,
      firstCapturedEffect: null,
      lastCapturedEffect: null
    };
  }

  function cloneUpdateQueue(currentQueue) {
    return {
      baseState: currentQueue.baseState,
      firstUpdate: currentQueue.firstUpdate,
      lastUpdate: currentQueue.lastUpdate,
      firstCapturedUpdate: null,
      lastCapturedUpdate: null,
      firstEffect: null,
      lastEffect: null,
      firstCapturedEffect: null,
      lastCapturedEffect: null
    };
  }

  function createUpdate(expirationTime, suspenseConfig) {
    return {
      expirationTime: expirationTime,
      suspenseConfig: suspenseConfig,
      tag: 0,
      payload: null,
      callback: null,
      next: null,
      nextEffect: null
    };
  }

  function appendUpdateToQueue(queue, update) {
    null === queue.lastUpdate ? queue.firstUpdate = queue.lastUpdate = update : (queue.lastUpdate.next = update, queue.lastUpdate = update);
  }

  function enqueueUpdate(fiber, update) {
    var alternate = fiber.alternate;

    if (null === alternate) {
      var queue1 = fiber.updateQueue;
      var queue2 = null;
      null === queue1 && (queue1 = fiber.updateQueue = createUpdateQueue(fiber.memoizedState));
    } else queue1 = fiber.updateQueue, queue2 = alternate.updateQueue, null === queue1 ? null === queue2 ? (queue1 = fiber.updateQueue = createUpdateQueue(fiber.memoizedState), queue2 = alternate.updateQueue = createUpdateQueue(alternate.memoizedState)) : queue1 = fiber.updateQueue = cloneUpdateQueue(queue2) : null === queue2 && (queue2 = alternate.updateQueue = cloneUpdateQueue(queue1));

    null === queue2 || queue1 === queue2 ? appendUpdateToQueue(queue1, update) : null === queue1.lastUpdate || null === queue2.lastUpdate ? (appendUpdateToQueue(queue1, update), appendUpdateToQueue(queue2, update)) : (appendUpdateToQueue(queue1, update), queue2.lastUpdate = update);
  }

  function enqueueCapturedUpdate(workInProgress, update) {
    var workInProgressQueue = workInProgress.updateQueue;
    workInProgressQueue = null === workInProgressQueue ? workInProgress.updateQueue = createUpdateQueue(workInProgress.memoizedState) : ensureWorkInProgressQueueIsAClone(workInProgress, workInProgressQueue);
    null === workInProgressQueue.lastCapturedUpdate ? workInProgressQueue.firstCapturedUpdate = workInProgressQueue.lastCapturedUpdate = update : (workInProgressQueue.lastCapturedUpdate.next = update, workInProgressQueue.lastCapturedUpdate = update);
  }

  function ensureWorkInProgressQueueIsAClone(workInProgress, queue) {
    var current = workInProgress.alternate;
    null !== current && queue === current.updateQueue && (queue = workInProgress.updateQueue = cloneUpdateQueue(queue));
    return queue;
  }

  function getStateFromUpdate(workInProgress, queue, update, prevState, nextProps, instance) {
    switch (update.tag) {
      case 1:
        return workInProgress = update.payload, "function" === typeof workInProgress ? workInProgress.call(instance, prevState, nextProps) : workInProgress;

      case 3:
        workInProgress.effectTag = workInProgress.effectTag & -2049 | 64;

      case 0:
        workInProgress = update.payload;
        nextProps = "function" === typeof workInProgress ? workInProgress.call(instance, prevState, nextProps) : workInProgress;
        if (null === nextProps || undefined === nextProps) break;
        return _extends({}, prevState, nextProps);

      case 2:
        hasForceUpdate = true;
    }

    return prevState;
  }

  function processUpdateQueue(workInProgress, queue, props, instance, renderExpirationTime) {
    hasForceUpdate = false;
    queue = ensureWorkInProgressQueueIsAClone(workInProgress, queue);

    for (var newBaseState = queue.baseState, newFirstUpdate = null, newExpirationTime = 0, update = queue.firstUpdate, resultState = newBaseState; null !== update;) {
      var updateExpirationTime = update.expirationTime;
      updateExpirationTime < renderExpirationTime ? (null === newFirstUpdate && (newFirstUpdate = update, newBaseState = resultState), newExpirationTime < updateExpirationTime && (newExpirationTime = updateExpirationTime)) : (markRenderEventTimeAndConfig(updateExpirationTime, update.suspenseConfig), resultState = getStateFromUpdate(workInProgress, queue, update, resultState, props, instance), null !== update.callback && (workInProgress.effectTag |= 32, update.nextEffect = null, null === queue.lastEffect ? queue.firstEffect = queue.lastEffect = update : (queue.lastEffect.nextEffect = update, queue.lastEffect = update)));
      update = update.next;
    }

    updateExpirationTime = null;

    for (update = queue.firstCapturedUpdate; null !== update;) {
      var _updateExpirationTime = update.expirationTime;
      _updateExpirationTime < renderExpirationTime ? (null === updateExpirationTime && (updateExpirationTime = update, null === newFirstUpdate && (newBaseState = resultState)), newExpirationTime < _updateExpirationTime && (newExpirationTime = _updateExpirationTime)) : (resultState = getStateFromUpdate(workInProgress, queue, update, resultState, props, instance), null !== update.callback && (workInProgress.effectTag |= 32, update.nextEffect = null, null === queue.lastCapturedEffect ? queue.firstCapturedEffect = queue.lastCapturedEffect = update : (queue.lastCapturedEffect.nextEffect = update, queue.lastCapturedEffect = update)));
      update = update.next;
    }

    null === newFirstUpdate && (queue.lastUpdate = null);
    null === updateExpirationTime ? queue.lastCapturedUpdate = null : workInProgress.effectTag |= 32;
    null === newFirstUpdate && null === updateExpirationTime && (newBaseState = resultState);
    queue.baseState = newBaseState;
    queue.firstUpdate = newFirstUpdate;
    queue.firstCapturedUpdate = updateExpirationTime;
    workInProgress.expirationTime = newExpirationTime;
    workInProgress.memoizedState = resultState;
  }

  function commitUpdateQueue(finishedWork, finishedQueue, instance) {
    null !== finishedQueue.firstCapturedUpdate && (null !== finishedQueue.lastUpdate && (finishedQueue.lastUpdate.next = finishedQueue.firstCapturedUpdate, finishedQueue.lastUpdate = finishedQueue.lastCapturedUpdate), finishedQueue.firstCapturedUpdate = finishedQueue.lastCapturedUpdate = null);
    commitUpdateEffects(finishedQueue.firstEffect, instance);
    finishedQueue.firstEffect = finishedQueue.lastEffect = null;
    commitUpdateEffects(finishedQueue.firstCapturedEffect, instance);
    finishedQueue.firstCapturedEffect = finishedQueue.lastCapturedEffect = null;
  }

  function commitUpdateEffects(effect, instance) {
    for (; null !== effect;) {
      var _callback3 = effect.callback;

      if (null !== _callback3) {
        effect.callback = null;
        var context = instance;
        if ("function" !== typeof _callback3) throw ReactError(Error("Invalid argument passed as callback. Expected a function. Instead received: " + _callback3));

        _callback3.call(context);
      }

      effect = effect.nextEffect;
    }
  }

  var ReactCurrentBatchConfig = ReactSharedInternals.ReactCurrentBatchConfig,
      emptyRefsObject = new React.Component().refs;

  function applyDerivedStateFromProps(workInProgress, ctor, getDerivedStateFromProps, nextProps) {
    ctor = workInProgress.memoizedState;
    getDerivedStateFromProps = getDerivedStateFromProps(nextProps, ctor);
    getDerivedStateFromProps = null === getDerivedStateFromProps || undefined === getDerivedStateFromProps ? ctor : _extends({}, ctor, getDerivedStateFromProps);
    workInProgress.memoizedState = getDerivedStateFromProps;
    nextProps = workInProgress.updateQueue;
    null !== nextProps && 0 === workInProgress.expirationTime && (nextProps.baseState = getDerivedStateFromProps);
  }

  var classComponentUpdater = {
    isMounted: function isMounted(component) {
      return (component = component._reactInternalFiber) ? 2 === isFiberMountedImpl(component) : false;
    },
    enqueueSetState: function enqueueSetState(inst, payload, callback) {
      inst = inst._reactInternalFiber;
      var currentTime = requestCurrentTime(),
          suspenseConfig = ReactCurrentBatchConfig.suspense;
      currentTime = computeExpirationForFiber(currentTime, inst, suspenseConfig);
      suspenseConfig = createUpdate(currentTime, suspenseConfig);
      suspenseConfig.payload = payload;
      undefined !== callback && null !== callback && (suspenseConfig.callback = callback);
      enqueueUpdate(inst, suspenseConfig);
      scheduleUpdateOnFiber(inst, currentTime);
    },
    enqueueReplaceState: function enqueueReplaceState(inst, payload, callback) {
      inst = inst._reactInternalFiber;
      var currentTime = requestCurrentTime(),
          suspenseConfig = ReactCurrentBatchConfig.suspense;
      currentTime = computeExpirationForFiber(currentTime, inst, suspenseConfig);
      suspenseConfig = createUpdate(currentTime, suspenseConfig);
      suspenseConfig.tag = 1;
      suspenseConfig.payload = payload;
      undefined !== callback && null !== callback && (suspenseConfig.callback = callback);
      enqueueUpdate(inst, suspenseConfig);
      scheduleUpdateOnFiber(inst, currentTime);
    },
    enqueueForceUpdate: function enqueueForceUpdate(inst, callback) {
      inst = inst._reactInternalFiber;
      var currentTime = requestCurrentTime(),
          suspenseConfig = ReactCurrentBatchConfig.suspense;
      currentTime = computeExpirationForFiber(currentTime, inst, suspenseConfig);
      suspenseConfig = createUpdate(currentTime, suspenseConfig);
      suspenseConfig.tag = 2;
      undefined !== callback && null !== callback && (suspenseConfig.callback = callback);
      enqueueUpdate(inst, suspenseConfig);
      scheduleUpdateOnFiber(inst, currentTime);
    }
  };

  function checkShouldComponentUpdate(workInProgress, ctor, oldProps, newProps, oldState, newState, nextContext) {
    workInProgress = workInProgress.stateNode;
    return "function" === typeof workInProgress.shouldComponentUpdate ? workInProgress.shouldComponentUpdate(newProps, newState, nextContext) : ctor.prototype && ctor.prototype.isPureReactComponent ? !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState) : true;
  }

  function constructClassInstance(workInProgress, ctor, props) {
    var isLegacyContextConsumer = false,
        unmaskedContext = emptyContextObject;
    var context = ctor.contextType;
    "object" === typeof context && null !== context ? context = readContext(context) : (unmaskedContext = isContextProvider(ctor) ? previousContext : contextStackCursor.current, isLegacyContextConsumer = ctor.contextTypes, context = (isLegacyContextConsumer = null !== isLegacyContextConsumer && undefined !== isLegacyContextConsumer) ? getMaskedContext(workInProgress, unmaskedContext) : emptyContextObject);
    ctor = new ctor(props, context);
    workInProgress.memoizedState = null !== ctor.state && undefined !== ctor.state ? ctor.state : null;
    ctor.updater = classComponentUpdater;
    workInProgress.stateNode = ctor;
    ctor._reactInternalFiber = workInProgress;
    isLegacyContextConsumer && (workInProgress = workInProgress.stateNode, workInProgress.__reactInternalMemoizedUnmaskedChildContext = unmaskedContext, workInProgress.__reactInternalMemoizedMaskedChildContext = context);
    return ctor;
  }

  function callComponentWillReceiveProps(workInProgress, instance, newProps, nextContext) {
    workInProgress = instance.state;
    "function" === typeof instance.componentWillReceiveProps && instance.componentWillReceiveProps(newProps, nextContext);
    "function" === typeof instance.UNSAFE_componentWillReceiveProps && instance.UNSAFE_componentWillReceiveProps(newProps, nextContext);
    instance.state !== workInProgress && classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
  }

  function mountClassInstance(workInProgress, ctor, newProps, renderExpirationTime) {
    var instance = workInProgress.stateNode;
    instance.props = newProps;
    instance.state = workInProgress.memoizedState;
    instance.refs = emptyRefsObject;
    var contextType = ctor.contextType;
    "object" === typeof contextType && null !== contextType ? instance.context = readContext(contextType) : (contextType = isContextProvider(ctor) ? previousContext : contextStackCursor.current, instance.context = getMaskedContext(workInProgress, contextType));
    contextType = workInProgress.updateQueue;
    null !== contextType && (processUpdateQueue(workInProgress, contextType, newProps, instance, renderExpirationTime), instance.state = workInProgress.memoizedState);
    contextType = ctor.getDerivedStateFromProps;
    "function" === typeof contextType && (applyDerivedStateFromProps(workInProgress, ctor, contextType, newProps), instance.state = workInProgress.memoizedState);
    "function" === typeof ctor.getDerivedStateFromProps || "function" === typeof instance.getSnapshotBeforeUpdate || "function" !== typeof instance.UNSAFE_componentWillMount && "function" !== typeof instance.componentWillMount || (ctor = instance.state, "function" === typeof instance.componentWillMount && instance.componentWillMount(), "function" === typeof instance.UNSAFE_componentWillMount && instance.UNSAFE_componentWillMount(), ctor !== instance.state && classComponentUpdater.enqueueReplaceState(instance, instance.state, null), contextType = workInProgress.updateQueue, null !== contextType && (processUpdateQueue(workInProgress, contextType, newProps, instance, renderExpirationTime), instance.state = workInProgress.memoizedState));
    "function" === typeof instance.componentDidMount && (workInProgress.effectTag |= 4);
  }

  var isArray = Array.isArray;

  function coerceRef(returnFiber, current$$1, element) {
    returnFiber = element.ref;

    if (null !== returnFiber && "function" !== typeof returnFiber && "object" !== typeof returnFiber) {
      if (element._owner) {
        element = element._owner;
        var inst = undefined;

        if (element) {
          if (1 !== element.tag) throw ReactError(Error("Function components cannot have refs. Did you mean to use React.forwardRef()?"));
          inst = element.stateNode;
        }

        if (!inst) throw ReactError(Error("Missing owner for string ref " + returnFiber + ". This error is likely caused by a bug in React. Please file an issue."));
        var stringRef = "" + returnFiber;
        if (null !== current$$1 && null !== current$$1.ref && "function" === typeof current$$1.ref && current$$1.ref._stringRef === stringRef) return current$$1.ref;

        current$$1 = function current$$1(value) {
          var refs = inst.refs;
          refs === emptyRefsObject && (refs = inst.refs = {});
          null === value ? delete refs[stringRef] : refs[stringRef] = value;
        };

        current$$1._stringRef = stringRef;
        return current$$1;
      }

      if ("string" !== typeof returnFiber) throw ReactError(Error("Expected ref to be a function, a string, an object returned by React.createRef(), or null."));
      if (!element._owner) throw ReactError(Error("Element ref was specified as a string (" + returnFiber + ") but no owner was set. This could happen for one of the following reasons:\n1. You may be adding a ref to a function component\n2. You may be adding a ref to a component that was not created inside a component's render method\n3. You have multiple copies of React loaded\nSee https://fb.me/react-refs-must-have-owner for more information."));
    }

    return returnFiber;
  }

  function throwOnInvalidObjectType(returnFiber, newChild) {
    if ("textarea" !== returnFiber.type) throw ReactError(Error("Objects are not valid as a React child (found: " + ("[object Object]" === Object.prototype.toString.call(newChild) ? "object with keys {" + Object.keys(newChild).join(", ") + "}" : newChild) + ")."));
  }

  function ChildReconciler(shouldTrackSideEffects) {
    function deleteChild(returnFiber, childToDelete) {
      if (shouldTrackSideEffects) {
        var last = returnFiber.lastEffect;
        null !== last ? (last.nextEffect = childToDelete, returnFiber.lastEffect = childToDelete) : returnFiber.firstEffect = returnFiber.lastEffect = childToDelete;
        childToDelete.nextEffect = null;
        childToDelete.effectTag = 8;
      }
    }

    function deleteRemainingChildren(returnFiber, currentFirstChild) {
      if (!shouldTrackSideEffects) return null;

      for (; null !== currentFirstChild;) {
        deleteChild(returnFiber, currentFirstChild), currentFirstChild = currentFirstChild.sibling;
      }

      return null;
    }

    function mapRemainingChildren(returnFiber, currentFirstChild) {
      for (returnFiber = new Map(); null !== currentFirstChild;) {
        null !== currentFirstChild.key ? returnFiber.set(currentFirstChild.key, currentFirstChild) : returnFiber.set(currentFirstChild.index, currentFirstChild), currentFirstChild = currentFirstChild.sibling;
      }

      return returnFiber;
    }

    function useFiber(fiber, pendingProps, expirationTime) {
      fiber = createWorkInProgress(fiber, pendingProps, expirationTime);
      fiber.index = 0;
      fiber.sibling = null;
      return fiber;
    }

    function placeChild(newFiber, lastPlacedIndex, newIndex) {
      newFiber.index = newIndex;
      if (!shouldTrackSideEffects) return lastPlacedIndex;
      newIndex = newFiber.alternate;
      if (null !== newIndex) return newIndex = newIndex.index, newIndex < lastPlacedIndex ? (newFiber.effectTag = 2, lastPlacedIndex) : newIndex;
      newFiber.effectTag = 2;
      return lastPlacedIndex;
    }

    function placeSingleChild(newFiber) {
      shouldTrackSideEffects && null === newFiber.alternate && (newFiber.effectTag = 2);
      return newFiber;
    }

    function updateTextNode(returnFiber, current$$1, textContent, expirationTime) {
      if (null === current$$1 || 6 !== current$$1.tag) return current$$1 = createFiberFromText(textContent, returnFiber.mode, expirationTime), current$$1.return = returnFiber, current$$1;
      current$$1 = useFiber(current$$1, textContent, expirationTime);
      current$$1.return = returnFiber;
      return current$$1;
    }

    function updateElement(returnFiber, current$$1, element, expirationTime) {
      if (null !== current$$1 && current$$1.elementType === element.type) return expirationTime = useFiber(current$$1, element.props, expirationTime), expirationTime.ref = coerceRef(returnFiber, current$$1, element), expirationTime.return = returnFiber, expirationTime;
      expirationTime = createFiberFromTypeAndProps(element.type, element.key, element.props, null, returnFiber.mode, expirationTime);
      expirationTime.ref = coerceRef(returnFiber, current$$1, element);
      expirationTime.return = returnFiber;
      return expirationTime;
    }

    function updatePortal(returnFiber, current$$1, portal, expirationTime) {
      if (null === current$$1 || 4 !== current$$1.tag || current$$1.stateNode.containerInfo !== portal.containerInfo || current$$1.stateNode.implementation !== portal.implementation) return current$$1 = createFiberFromPortal(portal, returnFiber.mode, expirationTime), current$$1.return = returnFiber, current$$1;
      current$$1 = useFiber(current$$1, portal.children || [], expirationTime);
      current$$1.return = returnFiber;
      return current$$1;
    }

    function updateFragment(returnFiber, current$$1, fragment, expirationTime, key) {
      if (null === current$$1 || 7 !== current$$1.tag) return current$$1 = createFiberFromFragment(fragment, returnFiber.mode, expirationTime, key), current$$1.return = returnFiber, current$$1;
      current$$1 = useFiber(current$$1, fragment, expirationTime);
      current$$1.return = returnFiber;
      return current$$1;
    }

    function createChild(returnFiber, newChild, expirationTime) {
      if ("string" === typeof newChild || "number" === typeof newChild) return newChild = createFiberFromText("" + newChild, returnFiber.mode, expirationTime), newChild.return = returnFiber, newChild;

      if ("object" === typeof newChild && null !== newChild) {
        switch (newChild.$$typeof) {
          case REACT_ELEMENT_TYPE:
            return expirationTime = createFiberFromTypeAndProps(newChild.type, newChild.key, newChild.props, null, returnFiber.mode, expirationTime), expirationTime.ref = coerceRef(returnFiber, null, newChild), expirationTime.return = returnFiber, expirationTime;

          case REACT_PORTAL_TYPE:
            return newChild = createFiberFromPortal(newChild, returnFiber.mode, expirationTime), newChild.return = returnFiber, newChild;
        }

        if (isArray(newChild) || getIteratorFn(newChild)) return newChild = createFiberFromFragment(newChild, returnFiber.mode, expirationTime, null), newChild.return = returnFiber, newChild;
        throwOnInvalidObjectType(returnFiber, newChild);
      }

      return null;
    }

    function updateSlot(returnFiber, oldFiber, newChild, expirationTime) {
      var key = null !== oldFiber ? oldFiber.key : null;
      if ("string" === typeof newChild || "number" === typeof newChild) return null !== key ? null : updateTextNode(returnFiber, oldFiber, "" + newChild, expirationTime);

      if ("object" === typeof newChild && null !== newChild) {
        switch (newChild.$$typeof) {
          case REACT_ELEMENT_TYPE:
            return newChild.key === key ? newChild.type === REACT_FRAGMENT_TYPE ? updateFragment(returnFiber, oldFiber, newChild.props.children, expirationTime, key) : updateElement(returnFiber, oldFiber, newChild, expirationTime) : null;

          case REACT_PORTAL_TYPE:
            return newChild.key === key ? updatePortal(returnFiber, oldFiber, newChild, expirationTime) : null;
        }

        if (isArray(newChild) || getIteratorFn(newChild)) return null !== key ? null : updateFragment(returnFiber, oldFiber, newChild, expirationTime, null);
        throwOnInvalidObjectType(returnFiber, newChild);
      }

      return null;
    }

    function updateFromMap(existingChildren, returnFiber, newIdx, newChild, expirationTime) {
      if ("string" === typeof newChild || "number" === typeof newChild) return existingChildren = existingChildren.get(newIdx) || null, updateTextNode(returnFiber, existingChildren, "" + newChild, expirationTime);

      if ("object" === typeof newChild && null !== newChild) {
        switch (newChild.$$typeof) {
          case REACT_ELEMENT_TYPE:
            return existingChildren = existingChildren.get(null === newChild.key ? newIdx : newChild.key) || null, newChild.type === REACT_FRAGMENT_TYPE ? updateFragment(returnFiber, existingChildren, newChild.props.children, expirationTime, newChild.key) : updateElement(returnFiber, existingChildren, newChild, expirationTime);

          case REACT_PORTAL_TYPE:
            return existingChildren = existingChildren.get(null === newChild.key ? newIdx : newChild.key) || null, updatePortal(returnFiber, existingChildren, newChild, expirationTime);
        }

        if (isArray(newChild) || getIteratorFn(newChild)) return existingChildren = existingChildren.get(newIdx) || null, updateFragment(returnFiber, existingChildren, newChild, expirationTime, null);
        throwOnInvalidObjectType(returnFiber, newChild);
      }

      return null;
    }

    function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren, expirationTime) {
      for (var resultingFirstChild = null, previousNewFiber = null, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = null; null !== oldFiber && newIdx < newChildren.length; newIdx++) {
        oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = null) : nextOldFiber = oldFiber.sibling;
        var newFiber = updateSlot(returnFiber, oldFiber, newChildren[newIdx], expirationTime);

        if (null === newFiber) {
          null === oldFiber && (oldFiber = nextOldFiber);
          break;
        }

        shouldTrackSideEffects && oldFiber && null === newFiber.alternate && deleteChild(returnFiber, oldFiber);
        currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
        null === previousNewFiber ? resultingFirstChild = newFiber : previousNewFiber.sibling = newFiber;
        previousNewFiber = newFiber;
        oldFiber = nextOldFiber;
      }

      if (newIdx === newChildren.length) return deleteRemainingChildren(returnFiber, oldFiber), resultingFirstChild;

      if (null === oldFiber) {
        for (; newIdx < newChildren.length; newIdx++) {
          oldFiber = createChild(returnFiber, newChildren[newIdx], expirationTime), null !== oldFiber && (currentFirstChild = placeChild(oldFiber, currentFirstChild, newIdx), null === previousNewFiber ? resultingFirstChild = oldFiber : previousNewFiber.sibling = oldFiber, previousNewFiber = oldFiber);
        }

        return resultingFirstChild;
      }

      for (oldFiber = mapRemainingChildren(returnFiber, oldFiber); newIdx < newChildren.length; newIdx++) {
        nextOldFiber = updateFromMap(oldFiber, returnFiber, newIdx, newChildren[newIdx], expirationTime), null !== nextOldFiber && (shouldTrackSideEffects && null !== nextOldFiber.alternate && oldFiber.delete(null === nextOldFiber.key ? newIdx : nextOldFiber.key), currentFirstChild = placeChild(nextOldFiber, currentFirstChild, newIdx), null === previousNewFiber ? resultingFirstChild = nextOldFiber : previousNewFiber.sibling = nextOldFiber, previousNewFiber = nextOldFiber);
      }

      shouldTrackSideEffects && oldFiber.forEach(function (child) {
        return deleteChild(returnFiber, child);
      });
      return resultingFirstChild;
    }

    function reconcileChildrenIterator(returnFiber, currentFirstChild, newChildrenIterable, expirationTime) {
      var iteratorFn = getIteratorFn(newChildrenIterable);
      if ("function" !== typeof iteratorFn) throw ReactError(Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue."));
      newChildrenIterable = iteratorFn.call(newChildrenIterable);
      if (null == newChildrenIterable) throw ReactError(Error("An iterable object provided no iterator."));

      for (var previousNewFiber = iteratorFn = null, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = null, step = newChildrenIterable.next(); null !== oldFiber && !step.done; newIdx++, step = newChildrenIterable.next()) {
        oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = null) : nextOldFiber = oldFiber.sibling;
        var newFiber = updateSlot(returnFiber, oldFiber, step.value, expirationTime);

        if (null === newFiber) {
          null === oldFiber && (oldFiber = nextOldFiber);
          break;
        }

        shouldTrackSideEffects && oldFiber && null === newFiber.alternate && deleteChild(returnFiber, oldFiber);
        currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
        null === previousNewFiber ? iteratorFn = newFiber : previousNewFiber.sibling = newFiber;
        previousNewFiber = newFiber;
        oldFiber = nextOldFiber;
      }

      if (step.done) return deleteRemainingChildren(returnFiber, oldFiber), iteratorFn;

      if (null === oldFiber) {
        for (; !step.done; newIdx++, step = newChildrenIterable.next()) {
          step = createChild(returnFiber, step.value, expirationTime), null !== step && (currentFirstChild = placeChild(step, currentFirstChild, newIdx), null === previousNewFiber ? iteratorFn = step : previousNewFiber.sibling = step, previousNewFiber = step);
        }

        return iteratorFn;
      }

      for (oldFiber = mapRemainingChildren(returnFiber, oldFiber); !step.done; newIdx++, step = newChildrenIterable.next()) {
        step = updateFromMap(oldFiber, returnFiber, newIdx, step.value, expirationTime), null !== step && (shouldTrackSideEffects && null !== step.alternate && oldFiber.delete(null === step.key ? newIdx : step.key), currentFirstChild = placeChild(step, currentFirstChild, newIdx), null === previousNewFiber ? iteratorFn = step : previousNewFiber.sibling = step, previousNewFiber = step);
      }

      shouldTrackSideEffects && oldFiber.forEach(function (child) {
        return deleteChild(returnFiber, child);
      });
      return iteratorFn;
    }

    return function (returnFiber, currentFirstChild, newChild, expirationTime) {
      var isUnkeyedTopLevelFragment = "object" === typeof newChild && null !== newChild && newChild.type === REACT_FRAGMENT_TYPE && null === newChild.key;
      isUnkeyedTopLevelFragment && (newChild = newChild.props.children);
      var isObject = "object" === typeof newChild && null !== newChild;
      if (isObject) switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          a: {
            isObject = newChild.key;

            for (isUnkeyedTopLevelFragment = currentFirstChild; null !== isUnkeyedTopLevelFragment;) {
              if (isUnkeyedTopLevelFragment.key === isObject) {
                if (7 === isUnkeyedTopLevelFragment.tag ? newChild.type === REACT_FRAGMENT_TYPE : isUnkeyedTopLevelFragment.elementType === newChild.type) {
                  deleteRemainingChildren(returnFiber, isUnkeyedTopLevelFragment.sibling);
                  currentFirstChild = useFiber(isUnkeyedTopLevelFragment, newChild.type === REACT_FRAGMENT_TYPE ? newChild.props.children : newChild.props, expirationTime);
                  currentFirstChild.ref = coerceRef(returnFiber, isUnkeyedTopLevelFragment, newChild);
                  currentFirstChild.return = returnFiber;
                  returnFiber = currentFirstChild;
                  break a;
                }

                deleteRemainingChildren(returnFiber, isUnkeyedTopLevelFragment);
                break;
              } else deleteChild(returnFiber, isUnkeyedTopLevelFragment);

              isUnkeyedTopLevelFragment = isUnkeyedTopLevelFragment.sibling;
            }

            newChild.type === REACT_FRAGMENT_TYPE ? (currentFirstChild = createFiberFromFragment(newChild.props.children, returnFiber.mode, expirationTime, newChild.key), currentFirstChild.return = returnFiber, returnFiber = currentFirstChild) : (expirationTime = createFiberFromTypeAndProps(newChild.type, newChild.key, newChild.props, null, returnFiber.mode, expirationTime), expirationTime.ref = coerceRef(returnFiber, currentFirstChild, newChild), expirationTime.return = returnFiber, returnFiber = expirationTime);
          }

          return placeSingleChild(returnFiber);

        case REACT_PORTAL_TYPE:
          a: {
            for (isUnkeyedTopLevelFragment = newChild.key; null !== currentFirstChild;) {
              if (currentFirstChild.key === isUnkeyedTopLevelFragment) {
                if (4 === currentFirstChild.tag && currentFirstChild.stateNode.containerInfo === newChild.containerInfo && currentFirstChild.stateNode.implementation === newChild.implementation) {
                  deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
                  currentFirstChild = useFiber(currentFirstChild, newChild.children || [], expirationTime);
                  currentFirstChild.return = returnFiber;
                  returnFiber = currentFirstChild;
                  break a;
                }

                deleteRemainingChildren(returnFiber, currentFirstChild);
                break;
              } else deleteChild(returnFiber, currentFirstChild);

              currentFirstChild = currentFirstChild.sibling;
            }

            currentFirstChild = createFiberFromPortal(newChild, returnFiber.mode, expirationTime);
            currentFirstChild.return = returnFiber;
            returnFiber = currentFirstChild;
          }

          return placeSingleChild(returnFiber);
      }
      if ("string" === typeof newChild || "number" === typeof newChild) return newChild = "" + newChild, null !== currentFirstChild && 6 === currentFirstChild.tag ? (deleteRemainingChildren(returnFiber, currentFirstChild.sibling), currentFirstChild = useFiber(currentFirstChild, newChild, expirationTime), currentFirstChild.return = returnFiber, returnFiber = currentFirstChild) : (deleteRemainingChildren(returnFiber, currentFirstChild), currentFirstChild = createFiberFromText(newChild, returnFiber.mode, expirationTime), currentFirstChild.return = returnFiber, returnFiber = currentFirstChild), placeSingleChild(returnFiber);
      if (isArray(newChild)) return reconcileChildrenArray(returnFiber, currentFirstChild, newChild, expirationTime);
      if (getIteratorFn(newChild)) return reconcileChildrenIterator(returnFiber, currentFirstChild, newChild, expirationTime);
      isObject && throwOnInvalidObjectType(returnFiber, newChild);
      if ("undefined" === typeof newChild && !isUnkeyedTopLevelFragment) switch (returnFiber.tag) {
        case 1:
        case 0:
          throw returnFiber = returnFiber.type, ReactError(Error((returnFiber.displayName || returnFiber.name || "Component") + "(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null."));
      }
      return deleteRemainingChildren(returnFiber, currentFirstChild);
    };
  }

  var reconcileChildFibers = ChildReconciler(true),
      mountChildFibers = ChildReconciler(false),
      NO_CONTEXT = {},
      contextStackCursor$1 = {
    current: NO_CONTEXT
  },
      contextFiberStackCursor = {
    current: NO_CONTEXT
  },
      rootInstanceStackCursor = {
    current: NO_CONTEXT
  };

  function requiredContext(c) {
    if (c === NO_CONTEXT) throw ReactError(Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue."));
    return c;
  }

  function pushHostContainer(fiber, nextRootInstance) {
    push(rootInstanceStackCursor, nextRootInstance, fiber);
    push(contextFiberStackCursor, fiber, fiber);
    push(contextStackCursor$1, NO_CONTEXT, fiber);
    pop(contextStackCursor$1, fiber);
    push(contextStackCursor$1, {
      isInAParentText: false
    }, fiber);
  }

  function popHostContainer(fiber) {
    pop(contextStackCursor$1, fiber);
    pop(contextFiberStackCursor, fiber);
    pop(rootInstanceStackCursor, fiber);
  }

  function pushHostContext(fiber) {
    requiredContext(rootInstanceStackCursor.current);
    var context = requiredContext(contextStackCursor$1.current);
    var nextContext = fiber.type;
    nextContext = "AndroidTextInput" === nextContext || "RCTMultilineTextInputView" === nextContext || "RCTSinglelineTextInputView" === nextContext || "RCTText" === nextContext || "RCTVirtualText" === nextContext;
    nextContext = context.isInAParentText !== nextContext ? {
      isInAParentText: nextContext
    } : context;
    context !== nextContext && (push(contextFiberStackCursor, fiber, fiber), push(contextStackCursor$1, nextContext, fiber));
  }

  function popHostContext(fiber) {
    contextFiberStackCursor.current === fiber && (pop(contextStackCursor$1, fiber), pop(contextFiberStackCursor, fiber));
  }

  var SubtreeSuspenseContextMask = 1,
      InvisibleParentSuspenseContext = 1,
      ForceSuspenseFallback = 2,
      suspenseStackCursor = {
    current: 0
  };

  function findFirstSuspended(row) {
    for (var node = row; null !== node;) {
      if (13 === node.tag) {
        if (null !== node.memoizedState) return node;
      } else if (19 === node.tag && undefined !== node.memoizedProps.revealOrder) {
        if (0 !== (node.effectTag & 64)) return node;
      } else if (null !== node.child) {
        node.child.return = node;
        node = node.child;
        continue;
      }

      if (node === row) break;

      for (; null === node.sibling;) {
        if (null === node.return || node.return === row) return null;
        node = node.return;
      }

      node.sibling.return = node.return;
      node = node.sibling;
    }

    return null;
  }

  function createResponderListener(responder, props) {
    return {
      responder: responder,
      props: props
    };
  }

  var NoEffect$1 = 0,
      UnmountSnapshot = 2,
      UnmountMutation = 4,
      MountMutation = 8,
      UnmountLayout = 16,
      MountLayout = 32,
      MountPassive = 64,
      UnmountPassive = 128,
      ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher,
      renderExpirationTime$1 = 0,
      currentlyRenderingFiber$1 = null,
      currentHook = null,
      nextCurrentHook = null,
      firstWorkInProgressHook = null,
      workInProgressHook = null,
      nextWorkInProgressHook = null,
      remainingExpirationTime = 0,
      componentUpdateQueue = null,
      sideEffectTag = 0,
      didScheduleRenderPhaseUpdate = false,
      renderPhaseUpdates = null,
      numberOfReRenders = 0;

  function throwInvalidHookError() {
    throw ReactError(Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem."));
  }

  function areHookInputsEqual(nextDeps, prevDeps) {
    if (null === prevDeps) return false;

    for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
      if (!is(nextDeps[i], prevDeps[i])) return false;
    }

    return true;
  }

  function renderWithHooks(current, workInProgress, Component, props, refOrContext, nextRenderExpirationTime) {
    renderExpirationTime$1 = nextRenderExpirationTime;
    currentlyRenderingFiber$1 = workInProgress;
    nextCurrentHook = null !== current ? current.memoizedState : null;
    ReactCurrentDispatcher$1.current = null === nextCurrentHook ? HooksDispatcherOnMount : HooksDispatcherOnUpdate;
    workInProgress = Component(props, refOrContext);

    if (didScheduleRenderPhaseUpdate) {
      do {
        didScheduleRenderPhaseUpdate = false, numberOfReRenders += 1, nextCurrentHook = null !== current ? current.memoizedState : null, nextWorkInProgressHook = firstWorkInProgressHook, componentUpdateQueue = workInProgressHook = currentHook = null, ReactCurrentDispatcher$1.current = HooksDispatcherOnUpdate, workInProgress = Component(props, refOrContext);
      } while (didScheduleRenderPhaseUpdate);

      renderPhaseUpdates = null;
      numberOfReRenders = 0;
    }

    ReactCurrentDispatcher$1.current = ContextOnlyDispatcher;
    current = currentlyRenderingFiber$1;
    current.memoizedState = firstWorkInProgressHook;
    current.expirationTime = remainingExpirationTime;
    current.updateQueue = componentUpdateQueue;
    current.effectTag |= sideEffectTag;
    current = null !== currentHook && null !== currentHook.next;
    renderExpirationTime$1 = 0;
    nextWorkInProgressHook = workInProgressHook = firstWorkInProgressHook = nextCurrentHook = currentHook = currentlyRenderingFiber$1 = null;
    remainingExpirationTime = 0;
    componentUpdateQueue = null;
    sideEffectTag = 0;
    if (current) throw ReactError(Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement."));
    return workInProgress;
  }

  function resetHooks() {
    ReactCurrentDispatcher$1.current = ContextOnlyDispatcher;
    renderExpirationTime$1 = 0;
    nextWorkInProgressHook = workInProgressHook = firstWorkInProgressHook = nextCurrentHook = currentHook = currentlyRenderingFiber$1 = null;
    remainingExpirationTime = 0;
    componentUpdateQueue = null;
    sideEffectTag = 0;
    didScheduleRenderPhaseUpdate = false;
    renderPhaseUpdates = null;
    numberOfReRenders = 0;
  }

  function mountWorkInProgressHook() {
    var hook = {
      memoizedState: null,
      baseState: null,
      queue: null,
      baseUpdate: null,
      next: null
    };
    null === workInProgressHook ? firstWorkInProgressHook = workInProgressHook = hook : workInProgressHook = workInProgressHook.next = hook;
    return workInProgressHook;
  }

  function updateWorkInProgressHook() {
    if (null !== nextWorkInProgressHook) workInProgressHook = nextWorkInProgressHook, nextWorkInProgressHook = workInProgressHook.next, currentHook = nextCurrentHook, nextCurrentHook = null !== currentHook ? currentHook.next : null;else {
      if (null === nextCurrentHook) throw ReactError(Error("Rendered more hooks than during the previous render."));
      currentHook = nextCurrentHook;
      var newHook = {
        memoizedState: currentHook.memoizedState,
        baseState: currentHook.baseState,
        queue: currentHook.queue,
        baseUpdate: currentHook.baseUpdate,
        next: null
      };
      workInProgressHook = null === workInProgressHook ? firstWorkInProgressHook = newHook : workInProgressHook.next = newHook;
      nextCurrentHook = currentHook.next;
    }
    return workInProgressHook;
  }

  function basicStateReducer(state, action) {
    return "function" === typeof action ? action(state) : action;
  }

  function updateReducer(reducer) {
    var hook = updateWorkInProgressHook(),
        queue = hook.queue;
    if (null === queue) throw ReactError(Error("Should have a queue. This is likely a bug in React. Please file an issue."));
    queue.lastRenderedReducer = reducer;

    if (0 < numberOfReRenders) {
      var _dispatch = queue.dispatch;

      if (null !== renderPhaseUpdates) {
        var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);

        if (undefined !== firstRenderPhaseUpdate) {
          renderPhaseUpdates.delete(queue);
          var newState = hook.memoizedState;

          do {
            newState = reducer(newState, firstRenderPhaseUpdate.action), firstRenderPhaseUpdate = firstRenderPhaseUpdate.next;
          } while (null !== firstRenderPhaseUpdate);

          is(newState, hook.memoizedState) || (didReceiveUpdate = true);
          hook.memoizedState = newState;
          hook.baseUpdate === queue.last && (hook.baseState = newState);
          queue.lastRenderedState = newState;
          return [newState, _dispatch];
        }
      }

      return [hook.memoizedState, _dispatch];
    }

    _dispatch = queue.last;
    var baseUpdate = hook.baseUpdate;
    newState = hook.baseState;
    null !== baseUpdate ? (null !== _dispatch && (_dispatch.next = null), _dispatch = baseUpdate.next) : _dispatch = null !== _dispatch ? _dispatch.next : null;

    if (null !== _dispatch) {
      var newBaseUpdate = firstRenderPhaseUpdate = null,
          _update = _dispatch,
          didSkip = false;

      do {
        var updateExpirationTime = _update.expirationTime;
        updateExpirationTime < renderExpirationTime$1 ? (didSkip || (didSkip = true, newBaseUpdate = baseUpdate, firstRenderPhaseUpdate = newState), updateExpirationTime > remainingExpirationTime && (remainingExpirationTime = updateExpirationTime)) : (markRenderEventTimeAndConfig(updateExpirationTime, _update.suspenseConfig), newState = _update.eagerReducer === reducer ? _update.eagerState : reducer(newState, _update.action));
        baseUpdate = _update;
        _update = _update.next;
      } while (null !== _update && _update !== _dispatch);

      didSkip || (newBaseUpdate = baseUpdate, firstRenderPhaseUpdate = newState);
      is(newState, hook.memoizedState) || (didReceiveUpdate = true);
      hook.memoizedState = newState;
      hook.baseUpdate = newBaseUpdate;
      hook.baseState = firstRenderPhaseUpdate;
      queue.lastRenderedState = newState;
    }

    return [hook.memoizedState, queue.dispatch];
  }

  function pushEffect(tag, create, destroy, deps) {
    tag = {
      tag: tag,
      create: create,
      destroy: destroy,
      deps: deps,
      next: null
    };
    null === componentUpdateQueue ? (componentUpdateQueue = {
      lastEffect: null
    }, componentUpdateQueue.lastEffect = tag.next = tag) : (create = componentUpdateQueue.lastEffect, null === create ? componentUpdateQueue.lastEffect = tag.next = tag : (destroy = create.next, create.next = tag, tag.next = destroy, componentUpdateQueue.lastEffect = tag));
    return tag;
  }

  function mountEffectImpl(fiberEffectTag, hookEffectTag, create, deps) {
    var hook = mountWorkInProgressHook();
    sideEffectTag |= fiberEffectTag;
    hook.memoizedState = pushEffect(hookEffectTag, create, undefined, undefined === deps ? null : deps);
  }

  function updateEffectImpl(fiberEffectTag, hookEffectTag, create, deps) {
    var hook = updateWorkInProgressHook();
    deps = undefined === deps ? null : deps;
    var destroy = undefined;

    if (null !== currentHook) {
      var prevEffect = currentHook.memoizedState;
      destroy = prevEffect.destroy;

      if (null !== deps && areHookInputsEqual(deps, prevEffect.deps)) {
        pushEffect(NoEffect$1, create, destroy, deps);
        return;
      }
    }

    sideEffectTag |= fiberEffectTag;
    hook.memoizedState = pushEffect(hookEffectTag, create, destroy, deps);
  }

  function imperativeHandleEffect(create, ref) {
    if ("function" === typeof ref) return create = create(), ref(create), function () {
      ref(null);
    };
    if (null !== ref && undefined !== ref) return create = create(), ref.current = create, function () {
      ref.current = null;
    };
  }

  function mountDebugValue() {}

  function dispatchAction(fiber, queue, action) {
    if (!(25 > numberOfReRenders)) throw ReactError(Error("Too many re-renders. React limits the number of renders to prevent an infinite loop."));
    var alternate = fiber.alternate;
    if (fiber === currentlyRenderingFiber$1 || null !== alternate && alternate === currentlyRenderingFiber$1) {
      if (didScheduleRenderPhaseUpdate = true, fiber = {
        expirationTime: renderExpirationTime$1,
        suspenseConfig: null,
        action: action,
        eagerReducer: null,
        eagerState: null,
        next: null
      }, null === renderPhaseUpdates && (renderPhaseUpdates = new Map()), action = renderPhaseUpdates.get(queue), undefined === action) renderPhaseUpdates.set(queue, fiber);else {
        for (queue = action; null !== queue.next;) {
          queue = queue.next;
        }

        queue.next = fiber;
      }
    } else {
      var currentTime = requestCurrentTime(),
          _suspenseConfig = ReactCurrentBatchConfig.suspense;
      currentTime = computeExpirationForFiber(currentTime, fiber, _suspenseConfig);
      _suspenseConfig = {
        expirationTime: currentTime,
        suspenseConfig: _suspenseConfig,
        action: action,
        eagerReducer: null,
        eagerState: null,
        next: null
      };
      var _last = queue.last;
      if (null === _last) _suspenseConfig.next = _suspenseConfig;else {
        var first = _last.next;
        null !== first && (_suspenseConfig.next = first);
        _last.next = _suspenseConfig;
      }
      queue.last = _suspenseConfig;
      if (0 === fiber.expirationTime && (null === alternate || 0 === alternate.expirationTime) && (alternate = queue.lastRenderedReducer, null !== alternate)) try {
        var currentState = queue.lastRenderedState,
            _eagerState = alternate(currentState, action);

        _suspenseConfig.eagerReducer = alternate;
        _suspenseConfig.eagerState = _eagerState;
        if (is(_eagerState, currentState)) return;
      } catch (error) {} finally {}
      scheduleUpdateOnFiber(fiber, currentTime);
    }
  }

  var ContextOnlyDispatcher = {
    readContext: readContext,
    useCallback: throwInvalidHookError,
    useContext: throwInvalidHookError,
    useEffect: throwInvalidHookError,
    useImperativeHandle: throwInvalidHookError,
    useLayoutEffect: throwInvalidHookError,
    useMemo: throwInvalidHookError,
    useReducer: throwInvalidHookError,
    useRef: throwInvalidHookError,
    useState: throwInvalidHookError,
    useDebugValue: throwInvalidHookError,
    useResponder: throwInvalidHookError
  },
      HooksDispatcherOnMount = {
    readContext: readContext,
    useCallback: function useCallback(callback, deps) {
      mountWorkInProgressHook().memoizedState = [callback, undefined === deps ? null : deps];
      return callback;
    },
    useContext: readContext,
    useEffect: function useEffect(create, deps) {
      return mountEffectImpl(516, 192, create, deps);
    },
    useImperativeHandle: function useImperativeHandle(ref, create, deps) {
      deps = null !== deps && undefined !== deps ? deps.concat([ref]) : null;
      return mountEffectImpl(4, 36, imperativeHandleEffect.bind(null, create, ref), deps);
    },
    useLayoutEffect: function useLayoutEffect(create, deps) {
      return mountEffectImpl(4, 36, create, deps);
    },
    useMemo: function useMemo(nextCreate, deps) {
      var hook = mountWorkInProgressHook();
      deps = undefined === deps ? null : deps;
      nextCreate = nextCreate();
      hook.memoizedState = [nextCreate, deps];
      return nextCreate;
    },
    useReducer: function useReducer(reducer, initialArg, init) {
      var hook = mountWorkInProgressHook();
      initialArg = undefined !== init ? init(initialArg) : initialArg;
      hook.memoizedState = hook.baseState = initialArg;
      reducer = hook.queue = {
        last: null,
        dispatch: null,
        lastRenderedReducer: reducer,
        lastRenderedState: initialArg
      };
      reducer = reducer.dispatch = dispatchAction.bind(null, currentlyRenderingFiber$1, reducer);
      return [hook.memoizedState, reducer];
    },
    useRef: function useRef(initialValue) {
      var hook = mountWorkInProgressHook();
      initialValue = {
        current: initialValue
      };
      return hook.memoizedState = initialValue;
    },
    useState: function useState(initialState) {
      var hook = mountWorkInProgressHook();
      "function" === typeof initialState && (initialState = initialState());
      hook.memoizedState = hook.baseState = initialState;
      initialState = hook.queue = {
        last: null,
        dispatch: null,
        lastRenderedReducer: basicStateReducer,
        lastRenderedState: initialState
      };
      initialState = initialState.dispatch = dispatchAction.bind(null, currentlyRenderingFiber$1, initialState);
      return [hook.memoizedState, initialState];
    },
    useDebugValue: mountDebugValue,
    useResponder: createResponderListener
  },
      HooksDispatcherOnUpdate = {
    readContext: readContext,
    useCallback: function useCallback(callback, deps) {
      var hook = updateWorkInProgressHook();
      deps = undefined === deps ? null : deps;
      var prevState = hook.memoizedState;
      if (null !== prevState && null !== deps && areHookInputsEqual(deps, prevState[1])) return prevState[0];
      hook.memoizedState = [callback, deps];
      return callback;
    },
    useContext: readContext,
    useEffect: function useEffect(create, deps) {
      return updateEffectImpl(516, 192, create, deps);
    },
    useImperativeHandle: function useImperativeHandle(ref, create, deps) {
      deps = null !== deps && undefined !== deps ? deps.concat([ref]) : null;
      return updateEffectImpl(4, 36, imperativeHandleEffect.bind(null, create, ref), deps);
    },
    useLayoutEffect: function useLayoutEffect(create, deps) {
      return updateEffectImpl(4, 36, create, deps);
    },
    useMemo: function useMemo(nextCreate, deps) {
      var hook = updateWorkInProgressHook();
      deps = undefined === deps ? null : deps;
      var prevState = hook.memoizedState;
      if (null !== prevState && null !== deps && areHookInputsEqual(deps, prevState[1])) return prevState[0];
      nextCreate = nextCreate();
      hook.memoizedState = [nextCreate, deps];
      return nextCreate;
    },
    useReducer: updateReducer,
    useRef: function useRef() {
      return updateWorkInProgressHook().memoizedState;
    },
    useState: function useState(initialState) {
      return updateReducer(basicStateReducer, initialState);
    },
    useDebugValue: mountDebugValue,
    useResponder: createResponderListener
  },
      hydrationParentFiber = null,
      nextHydratableInstance = null,
      isHydrating = false;

  function tryHydrate(fiber, nextInstance) {
    switch (fiber.tag) {
      case 5:
        return nextInstance = shim$1(nextInstance, fiber.type, fiber.pendingProps), null !== nextInstance ? (fiber.stateNode = nextInstance, true) : false;

      case 6:
        return nextInstance = shim$1(nextInstance, fiber.pendingProps), null !== nextInstance ? (fiber.stateNode = nextInstance, true) : false;

      case 13:
        return false;

      default:
        return false;
    }
  }

  function tryToClaimNextHydratableInstance(fiber$jscomp$0) {
    if (isHydrating) {
      var nextInstance = nextHydratableInstance;

      if (nextInstance) {
        var firstAttemptedInstance = nextInstance;

        if (!tryHydrate(fiber$jscomp$0, nextInstance)) {
          nextInstance = shim$1(firstAttemptedInstance);

          if (!nextInstance || !tryHydrate(fiber$jscomp$0, nextInstance)) {
            fiber$jscomp$0.effectTag |= 2;
            isHydrating = false;
            hydrationParentFiber = fiber$jscomp$0;
            return;
          }

          var returnFiber = hydrationParentFiber,
              fiber = createFiber(5, null, null, 0);
          fiber.elementType = "DELETED";
          fiber.type = "DELETED";
          fiber.stateNode = firstAttemptedInstance;
          fiber.return = returnFiber;
          fiber.effectTag = 8;
          null !== returnFiber.lastEffect ? (returnFiber.lastEffect.nextEffect = fiber, returnFiber.lastEffect = fiber) : returnFiber.firstEffect = returnFiber.lastEffect = fiber;
        }

        hydrationParentFiber = fiber$jscomp$0;
        nextHydratableInstance = shim$1(nextInstance);
      } else fiber$jscomp$0.effectTag |= 2, isHydrating = false, hydrationParentFiber = fiber$jscomp$0;
    }
  }

  var ReactCurrentOwner$3 = ReactSharedInternals.ReactCurrentOwner,
      didReceiveUpdate = false;

  function reconcileChildren(current$$1, workInProgress, nextChildren, renderExpirationTime) {
    workInProgress.child = null === current$$1 ? mountChildFibers(workInProgress, null, nextChildren, renderExpirationTime) : reconcileChildFibers(workInProgress, current$$1.child, nextChildren, renderExpirationTime);
  }

  function updateForwardRef(current$$1, workInProgress, Component, nextProps, renderExpirationTime) {
    Component = Component.render;
    var ref = workInProgress.ref;
    prepareToReadContext(workInProgress, renderExpirationTime);
    nextProps = renderWithHooks(current$$1, workInProgress, Component, nextProps, ref, renderExpirationTime);
    if (null !== current$$1 && !didReceiveUpdate) return workInProgress.updateQueue = current$$1.updateQueue, workInProgress.effectTag &= -517, current$$1.expirationTime <= renderExpirationTime && (current$$1.expirationTime = 0), bailoutOnAlreadyFinishedWork(current$$1, workInProgress, renderExpirationTime);
    workInProgress.effectTag |= 1;
    reconcileChildren(current$$1, workInProgress, nextProps, renderExpirationTime);
    return workInProgress.child;
  }

  function updateMemoComponent(current$$1, workInProgress, Component, nextProps, updateExpirationTime, renderExpirationTime) {
    if (null === current$$1) {
      var type = Component.type;
      if ("function" === typeof type && !shouldConstruct(type) && undefined === type.defaultProps && null === Component.compare && undefined === Component.defaultProps) return workInProgress.tag = 15, workInProgress.type = type, updateSimpleMemoComponent(current$$1, workInProgress, type, nextProps, updateExpirationTime, renderExpirationTime);
      current$$1 = createFiberFromTypeAndProps(Component.type, null, nextProps, null, workInProgress.mode, renderExpirationTime);
      current$$1.ref = workInProgress.ref;
      current$$1.return = workInProgress;
      return workInProgress.child = current$$1;
    }

    type = current$$1.child;
    if (updateExpirationTime < renderExpirationTime && (updateExpirationTime = type.memoizedProps, Component = Component.compare, Component = null !== Component ? Component : shallowEqual, Component(updateExpirationTime, nextProps) && current$$1.ref === workInProgress.ref)) return bailoutOnAlreadyFinishedWork(current$$1, workInProgress, renderExpirationTime);
    workInProgress.effectTag |= 1;
    current$$1 = createWorkInProgress(type, nextProps, renderExpirationTime);
    current$$1.ref = workInProgress.ref;
    current$$1.return = workInProgress;
    return workInProgress.child = current$$1;
  }

  function updateSimpleMemoComponent(current$$1, workInProgress, Component, nextProps, updateExpirationTime, renderExpirationTime) {
    return null !== current$$1 && shallowEqual(current$$1.memoizedProps, nextProps) && current$$1.ref === workInProgress.ref && (didReceiveUpdate = false, updateExpirationTime < renderExpirationTime) ? bailoutOnAlreadyFinishedWork(current$$1, workInProgress, renderExpirationTime) : updateFunctionComponent(current$$1, workInProgress, Component, nextProps, renderExpirationTime);
  }

  function markRef(current$$1, workInProgress) {
    var ref = workInProgress.ref;
    if (null === current$$1 && null !== ref || null !== current$$1 && current$$1.ref !== ref) workInProgress.effectTag |= 128;
  }

  function updateFunctionComponent(current$$1, workInProgress, Component, nextProps, renderExpirationTime) {
    var context = isContextProvider(Component) ? previousContext : contextStackCursor.current;
    context = getMaskedContext(workInProgress, context);
    prepareToReadContext(workInProgress, renderExpirationTime);
    Component = renderWithHooks(current$$1, workInProgress, Component, nextProps, context, renderExpirationTime);
    if (null !== current$$1 && !didReceiveUpdate) return workInProgress.updateQueue = current$$1.updateQueue, workInProgress.effectTag &= -517, current$$1.expirationTime <= renderExpirationTime && (current$$1.expirationTime = 0), bailoutOnAlreadyFinishedWork(current$$1, workInProgress, renderExpirationTime);
    workInProgress.effectTag |= 1;
    reconcileChildren(current$$1, workInProgress, Component, renderExpirationTime);
    return workInProgress.child;
  }

  function updateClassComponent(current$$1, workInProgress, Component, nextProps, renderExpirationTime) {
    if (isContextProvider(Component)) {
      var hasContext = true;
      pushContextProvider(workInProgress);
    } else hasContext = false;

    prepareToReadContext(workInProgress, renderExpirationTime);
    if (null === workInProgress.stateNode) null !== current$$1 && (current$$1.alternate = null, workInProgress.alternate = null, workInProgress.effectTag |= 2), constructClassInstance(workInProgress, Component, nextProps, renderExpirationTime), mountClassInstance(workInProgress, Component, nextProps, renderExpirationTime), nextProps = true;else if (null === current$$1) {
      var instance = workInProgress.stateNode,
          oldProps = workInProgress.memoizedProps;
      instance.props = oldProps;
      var oldContext = instance.context,
          contextType = Component.contextType;
      "object" === typeof contextType && null !== contextType ? contextType = readContext(contextType) : (contextType = isContextProvider(Component) ? previousContext : contextStackCursor.current, contextType = getMaskedContext(workInProgress, contextType));
      var getDerivedStateFromProps = Component.getDerivedStateFromProps,
          hasNewLifecycles = "function" === typeof getDerivedStateFromProps || "function" === typeof instance.getSnapshotBeforeUpdate;
      hasNewLifecycles || "function" !== typeof instance.UNSAFE_componentWillReceiveProps && "function" !== typeof instance.componentWillReceiveProps || (oldProps !== nextProps || oldContext !== contextType) && callComponentWillReceiveProps(workInProgress, instance, nextProps, contextType);
      hasForceUpdate = false;
      var oldState = workInProgress.memoizedState;
      oldContext = instance.state = oldState;
      var updateQueue = workInProgress.updateQueue;
      null !== updateQueue && (processUpdateQueue(workInProgress, updateQueue, nextProps, instance, renderExpirationTime), oldContext = workInProgress.memoizedState);
      oldProps !== nextProps || oldState !== oldContext || didPerformWorkStackCursor.current || hasForceUpdate ? ("function" === typeof getDerivedStateFromProps && (applyDerivedStateFromProps(workInProgress, Component, getDerivedStateFromProps, nextProps), oldContext = workInProgress.memoizedState), (oldProps = hasForceUpdate || checkShouldComponentUpdate(workInProgress, Component, oldProps, nextProps, oldState, oldContext, contextType)) ? (hasNewLifecycles || "function" !== typeof instance.UNSAFE_componentWillMount && "function" !== typeof instance.componentWillMount || ("function" === typeof instance.componentWillMount && instance.componentWillMount(), "function" === typeof instance.UNSAFE_componentWillMount && instance.UNSAFE_componentWillMount()), "function" === typeof instance.componentDidMount && (workInProgress.effectTag |= 4)) : ("function" === typeof instance.componentDidMount && (workInProgress.effectTag |= 4), workInProgress.memoizedProps = nextProps, workInProgress.memoizedState = oldContext), instance.props = nextProps, instance.state = oldContext, instance.context = contextType, nextProps = oldProps) : ("function" === typeof instance.componentDidMount && (workInProgress.effectTag |= 4), nextProps = false);
    } else instance = workInProgress.stateNode, oldProps = workInProgress.memoizedProps, instance.props = workInProgress.type === workInProgress.elementType ? oldProps : resolveDefaultProps(workInProgress.type, oldProps), oldContext = instance.context, contextType = Component.contextType, "object" === typeof contextType && null !== contextType ? contextType = readContext(contextType) : (contextType = isContextProvider(Component) ? previousContext : contextStackCursor.current, contextType = getMaskedContext(workInProgress, contextType)), getDerivedStateFromProps = Component.getDerivedStateFromProps, (hasNewLifecycles = "function" === typeof getDerivedStateFromProps || "function" === typeof instance.getSnapshotBeforeUpdate) || "function" !== typeof instance.UNSAFE_componentWillReceiveProps && "function" !== typeof instance.componentWillReceiveProps || (oldProps !== nextProps || oldContext !== contextType) && callComponentWillReceiveProps(workInProgress, instance, nextProps, contextType), hasForceUpdate = false, oldContext = workInProgress.memoizedState, oldState = instance.state = oldContext, updateQueue = workInProgress.updateQueue, null !== updateQueue && (processUpdateQueue(workInProgress, updateQueue, nextProps, instance, renderExpirationTime), oldState = workInProgress.memoizedState), oldProps !== nextProps || oldContext !== oldState || didPerformWorkStackCursor.current || hasForceUpdate ? ("function" === typeof getDerivedStateFromProps && (applyDerivedStateFromProps(workInProgress, Component, getDerivedStateFromProps, nextProps), oldState = workInProgress.memoizedState), (getDerivedStateFromProps = hasForceUpdate || checkShouldComponentUpdate(workInProgress, Component, oldProps, nextProps, oldContext, oldState, contextType)) ? (hasNewLifecycles || "function" !== typeof instance.UNSAFE_componentWillUpdate && "function" !== typeof instance.componentWillUpdate || ("function" === typeof instance.componentWillUpdate && instance.componentWillUpdate(nextProps, oldState, contextType), "function" === typeof instance.UNSAFE_componentWillUpdate && instance.UNSAFE_componentWillUpdate(nextProps, oldState, contextType)), "function" === typeof instance.componentDidUpdate && (workInProgress.effectTag |= 4), "function" === typeof instance.getSnapshotBeforeUpdate && (workInProgress.effectTag |= 256)) : ("function" !== typeof instance.componentDidUpdate || oldProps === current$$1.memoizedProps && oldContext === current$$1.memoizedState || (workInProgress.effectTag |= 4), "function" !== typeof instance.getSnapshotBeforeUpdate || oldProps === current$$1.memoizedProps && oldContext === current$$1.memoizedState || (workInProgress.effectTag |= 256), workInProgress.memoizedProps = nextProps, workInProgress.memoizedState = oldState), instance.props = nextProps, instance.state = oldState, instance.context = contextType, nextProps = getDerivedStateFromProps) : ("function" !== typeof instance.componentDidUpdate || oldProps === current$$1.memoizedProps && oldContext === current$$1.memoizedState || (workInProgress.effectTag |= 4), "function" !== typeof instance.getSnapshotBeforeUpdate || oldProps === current$$1.memoizedProps && oldContext === current$$1.memoizedState || (workInProgress.effectTag |= 256), nextProps = false);
    return finishClassComponent(current$$1, workInProgress, Component, nextProps, hasContext, renderExpirationTime);
  }

  function finishClassComponent(current$$1, workInProgress, Component, shouldUpdate, hasContext, renderExpirationTime) {
    markRef(current$$1, workInProgress);
    var didCaptureError = 0 !== (workInProgress.effectTag & 64);
    if (!shouldUpdate && !didCaptureError) return hasContext && invalidateContextProvider(workInProgress, Component, false), bailoutOnAlreadyFinishedWork(current$$1, workInProgress, renderExpirationTime);
    shouldUpdate = workInProgress.stateNode;
    ReactCurrentOwner$3.current = workInProgress;
    var nextChildren = didCaptureError && "function" !== typeof Component.getDerivedStateFromError ? null : shouldUpdate.render();
    workInProgress.effectTag |= 1;
    null !== current$$1 && didCaptureError ? (workInProgress.child = reconcileChildFibers(workInProgress, current$$1.child, null, renderExpirationTime), workInProgress.child = reconcileChildFibers(workInProgress, null, nextChildren, renderExpirationTime)) : reconcileChildren(current$$1, workInProgress, nextChildren, renderExpirationTime);
    workInProgress.memoizedState = shouldUpdate.state;
    hasContext && invalidateContextProvider(workInProgress, Component, true);
    return workInProgress.child;
  }

  function pushHostRootContext(workInProgress) {
    var root = workInProgress.stateNode;
    root.pendingContext ? pushTopLevelContextObject(workInProgress, root.pendingContext, root.pendingContext !== root.context) : root.context && pushTopLevelContextObject(workInProgress, root.context, false);
    pushHostContainer(workInProgress, root.containerInfo);
  }

  var SUSPENDED_MARKER = {};

  function updateSuspenseComponent(current$$1, workInProgress, renderExpirationTime) {
    var mode = workInProgress.mode,
        nextProps = workInProgress.pendingProps,
        suspenseContext = suspenseStackCursor.current,
        nextState = null,
        nextDidTimeout = false,
        JSCompiler_temp;
    (JSCompiler_temp = 0 !== (workInProgress.effectTag & 64)) || (JSCompiler_temp = 0 !== (suspenseContext & ForceSuspenseFallback) && (null === current$$1 || null !== current$$1.memoizedState));
    JSCompiler_temp ? (nextState = SUSPENDED_MARKER, nextDidTimeout = true, workInProgress.effectTag &= -65) : null !== current$$1 && null === current$$1.memoizedState || undefined === nextProps.fallback || true === nextProps.unstable_avoidThisFallback || (suspenseContext |= InvisibleParentSuspenseContext);
    suspenseContext &= SubtreeSuspenseContextMask;
    push(suspenseStackCursor, suspenseContext, workInProgress);
    if (null === current$$1) {
      if (nextDidTimeout) {
        nextProps = nextProps.fallback;
        current$$1 = createFiberFromFragment(null, mode, 0, null);
        current$$1.return = workInProgress;
        if (0 === (workInProgress.mode & 2)) for (nextDidTimeout = null !== workInProgress.memoizedState ? workInProgress.child.child : workInProgress.child, current$$1.child = nextDidTimeout; null !== nextDidTimeout;) {
          nextDidTimeout.return = current$$1, nextDidTimeout = nextDidTimeout.sibling;
        }
        renderExpirationTime = createFiberFromFragment(nextProps, mode, renderExpirationTime, null);
        renderExpirationTime.return = workInProgress;
        current$$1.sibling = renderExpirationTime;
        mode = current$$1;
      } else mode = renderExpirationTime = mountChildFibers(workInProgress, null, nextProps.children, renderExpirationTime);
    } else {
      if (null !== current$$1.memoizedState) {
        if (suspenseContext = current$$1.child, mode = suspenseContext.sibling, nextDidTimeout) {
          nextProps = nextProps.fallback;
          renderExpirationTime = createWorkInProgress(suspenseContext, suspenseContext.pendingProps, 0);
          renderExpirationTime.return = workInProgress;
          if (0 === (workInProgress.mode & 2) && (nextDidTimeout = null !== workInProgress.memoizedState ? workInProgress.child.child : workInProgress.child, nextDidTimeout !== suspenseContext.child)) for (renderExpirationTime.child = nextDidTimeout; null !== nextDidTimeout;) {
            nextDidTimeout.return = renderExpirationTime, nextDidTimeout = nextDidTimeout.sibling;
          }
          nextProps = createWorkInProgress(mode, nextProps, mode.expirationTime);
          nextProps.return = workInProgress;
          renderExpirationTime.sibling = nextProps;
          mode = renderExpirationTime;
          renderExpirationTime.childExpirationTime = 0;
          renderExpirationTime = nextProps;
        } else mode = renderExpirationTime = reconcileChildFibers(workInProgress, suspenseContext.child, nextProps.children, renderExpirationTime);
      } else if (suspenseContext = current$$1.child, nextDidTimeout) {
        nextDidTimeout = nextProps.fallback;
        nextProps = createFiberFromFragment(null, mode, 0, null);
        nextProps.return = workInProgress;
        nextProps.child = suspenseContext;
        null !== suspenseContext && (suspenseContext.return = nextProps);
        if (0 === (workInProgress.mode & 2)) for (suspenseContext = null !== workInProgress.memoizedState ? workInProgress.child.child : workInProgress.child, nextProps.child = suspenseContext; null !== suspenseContext;) {
          suspenseContext.return = nextProps, suspenseContext = suspenseContext.sibling;
        }
        renderExpirationTime = createFiberFromFragment(nextDidTimeout, mode, renderExpirationTime, null);
        renderExpirationTime.return = workInProgress;
        nextProps.sibling = renderExpirationTime;
        renderExpirationTime.effectTag |= 2;
        mode = nextProps;
        nextProps.childExpirationTime = 0;
      } else renderExpirationTime = mode = reconcileChildFibers(workInProgress, suspenseContext, nextProps.children, renderExpirationTime);
      workInProgress.stateNode = current$$1.stateNode;
    }
    workInProgress.memoizedState = nextState;
    workInProgress.child = mode;
    return renderExpirationTime;
  }

  function initSuspenseListRenderState(workInProgress, isBackwards, tail, lastContentRow, tailMode) {
    var renderState = workInProgress.memoizedState;
    null === renderState ? workInProgress.memoizedState = {
      isBackwards: isBackwards,
      rendering: null,
      last: lastContentRow,
      tail: tail,
      tailExpiration: 0,
      tailMode: tailMode
    } : (renderState.isBackwards = isBackwards, renderState.rendering = null, renderState.last = lastContentRow, renderState.tail = tail, renderState.tailExpiration = 0, renderState.tailMode = tailMode);
  }

  function updateSuspenseListComponent(current$$1, workInProgress, renderExpirationTime) {
    var nextProps = workInProgress.pendingProps,
        revealOrder = nextProps.revealOrder,
        tailMode = nextProps.tail;
    reconcileChildren(current$$1, workInProgress, nextProps.children, renderExpirationTime);
    nextProps = suspenseStackCursor.current;
    if (0 !== (nextProps & ForceSuspenseFallback)) nextProps = nextProps & SubtreeSuspenseContextMask | ForceSuspenseFallback, workInProgress.effectTag |= 64;else {
      if (null !== current$$1 && 0 !== (current$$1.effectTag & 64)) a: for (current$$1 = workInProgress.child; null !== current$$1;) {
        if (13 === current$$1.tag) {
          if (null !== current$$1.memoizedState) {
            current$$1.expirationTime < renderExpirationTime && (current$$1.expirationTime = renderExpirationTime);
            var alternate = current$$1.alternate;
            null !== alternate && alternate.expirationTime < renderExpirationTime && (alternate.expirationTime = renderExpirationTime);
            scheduleWorkOnParentPath(current$$1.return, renderExpirationTime);
          }
        } else if (null !== current$$1.child) {
          current$$1.child.return = current$$1;
          current$$1 = current$$1.child;
          continue;
        }

        if (current$$1 === workInProgress) break a;

        for (; null === current$$1.sibling;) {
          if (null === current$$1.return || current$$1.return === workInProgress) break a;
          current$$1 = current$$1.return;
        }

        current$$1.sibling.return = current$$1.return;
        current$$1 = current$$1.sibling;
      }
      nextProps &= SubtreeSuspenseContextMask;
    }
    push(suspenseStackCursor, nextProps, workInProgress);
    if (0 === (workInProgress.mode & 2)) workInProgress.memoizedState = null;else switch (revealOrder) {
      case "forwards":
        renderExpirationTime = workInProgress.child;

        for (revealOrder = null; null !== renderExpirationTime;) {
          nextProps = renderExpirationTime.alternate, null !== nextProps && null === findFirstSuspended(nextProps) && (revealOrder = renderExpirationTime), renderExpirationTime = renderExpirationTime.sibling;
        }

        renderExpirationTime = revealOrder;
        null === renderExpirationTime ? (revealOrder = workInProgress.child, workInProgress.child = null) : (revealOrder = renderExpirationTime.sibling, renderExpirationTime.sibling = null);
        initSuspenseListRenderState(workInProgress, false, revealOrder, renderExpirationTime, tailMode);
        break;

      case "backwards":
        renderExpirationTime = null;
        revealOrder = workInProgress.child;

        for (workInProgress.child = null; null !== revealOrder;) {
          nextProps = revealOrder.alternate;

          if (null !== nextProps && null === findFirstSuspended(nextProps)) {
            workInProgress.child = revealOrder;
            break;
          }

          nextProps = revealOrder.sibling;
          revealOrder.sibling = renderExpirationTime;
          renderExpirationTime = revealOrder;
          revealOrder = nextProps;
        }

        initSuspenseListRenderState(workInProgress, true, renderExpirationTime, null, tailMode);
        break;

      case "together":
        initSuspenseListRenderState(workInProgress, false, null, null, undefined);
        break;

      default:
        workInProgress.memoizedState = null;
    }
    return workInProgress.child;
  }

  function bailoutOnAlreadyFinishedWork(current$$1, workInProgress, renderExpirationTime) {
    null !== current$$1 && (workInProgress.dependencies = current$$1.dependencies);
    if (workInProgress.childExpirationTime < renderExpirationTime) return null;
    if (null !== current$$1 && workInProgress.child !== current$$1.child) throw ReactError(Error("Resuming work not yet implemented."));

    if (null !== workInProgress.child) {
      current$$1 = workInProgress.child;
      renderExpirationTime = createWorkInProgress(current$$1, current$$1.pendingProps, current$$1.expirationTime);
      workInProgress.child = renderExpirationTime;

      for (renderExpirationTime.return = workInProgress; null !== current$$1.sibling;) {
        current$$1 = current$$1.sibling, renderExpirationTime = renderExpirationTime.sibling = createWorkInProgress(current$$1, current$$1.pendingProps, current$$1.expirationTime), renderExpirationTime.return = workInProgress;
      }

      renderExpirationTime.sibling = null;
    }

    return workInProgress.child;
  }

  var appendAllChildren = undefined,
      updateHostContainer = undefined,
      updateHostComponent$1 = undefined,
      updateHostText$1 = undefined;

  appendAllChildren = function appendAllChildren(parent, workInProgress) {
    for (var node = workInProgress.child; null !== node;) {
      if (5 === node.tag || 6 === node.tag) parent._children.push(node.stateNode);else if (4 !== node.tag && null !== node.child) {
        node.child.return = node;
        node = node.child;
        continue;
      }
      if (node === workInProgress) break;

      for (; null === node.sibling;) {
        if (null === node.return || node.return === workInProgress) return;
        node = node.return;
      }

      node.sibling.return = node.return;
      node = node.sibling;
    }
  };

  updateHostContainer = function updateHostContainer() {};

  updateHostComponent$1 = function updateHostComponent$1(current, workInProgress, type, newProps) {
    current.memoizedProps !== newProps && (requiredContext(contextStackCursor$1.current), workInProgress.updateQueue = UPDATE_SIGNAL) && (workInProgress.effectTag |= 4);
  };

  updateHostText$1 = function updateHostText$1(current, workInProgress, oldText, newText) {
    oldText !== newText && (workInProgress.effectTag |= 4);
  };

  function cutOffTailIfNeeded(renderState, hasRenderedATailFallback) {
    switch (renderState.tailMode) {
      case "hidden":
        hasRenderedATailFallback = renderState.tail;

        for (var lastTailNode = null; null !== hasRenderedATailFallback;) {
          null !== hasRenderedATailFallback.alternate && (lastTailNode = hasRenderedATailFallback), hasRenderedATailFallback = hasRenderedATailFallback.sibling;
        }

        null === lastTailNode ? renderState.tail = null : lastTailNode.sibling = null;
        break;

      case "collapsed":
        lastTailNode = renderState.tail;

        for (var _lastTailNode = null; null !== lastTailNode;) {
          null !== lastTailNode.alternate && (_lastTailNode = lastTailNode), lastTailNode = lastTailNode.sibling;
        }

        null === _lastTailNode ? hasRenderedATailFallback || null === renderState.tail ? renderState.tail = null : renderState.tail.sibling = null : _lastTailNode.sibling = null;
    }
  }

  function unwindWork(workInProgress) {
    switch (workInProgress.tag) {
      case 1:
        isContextProvider(workInProgress.type) && popContext(workInProgress);
        var effectTag = workInProgress.effectTag;
        return effectTag & 2048 ? (workInProgress.effectTag = effectTag & -2049 | 64, workInProgress) : null;

      case 3:
        popHostContainer(workInProgress);
        popTopLevelContextObject(workInProgress);
        effectTag = workInProgress.effectTag;
        if (0 !== (effectTag & 64)) throw ReactError(Error("The root failed to unmount after an error. This is likely a bug in React. Please file an issue."));
        workInProgress.effectTag = effectTag & -2049 | 64;
        return workInProgress;

      case 5:
        return popHostContext(workInProgress), null;

      case 13:
        return pop(suspenseStackCursor, workInProgress), effectTag = workInProgress.effectTag, effectTag & 2048 ? (workInProgress.effectTag = effectTag & -2049 | 64, workInProgress) : null;

      case 18:
        return null;

      case 19:
        return pop(suspenseStackCursor, workInProgress), null;

      case 4:
        return popHostContainer(workInProgress), null;

      case 10:
        return popProvider(workInProgress), null;

      default:
        return null;
    }
  }

  function createCapturedValue(value, source) {
    return {
      value: value,
      source: source,
      stack: getStackByFiberInDevAndProd(source)
    };
  }

  if ("function" !== typeof ReactNativePrivateInterface.ReactFiberErrorDialog.showErrorDialog) throw ReactError(Error("Expected ReactFiberErrorDialog.showErrorDialog to be a function."));

  function logCapturedError(capturedError) {
    false !== ReactNativePrivateInterface.ReactFiberErrorDialog.showErrorDialog(capturedError) && console.error(capturedError.error);
  }

  var PossiblyWeakSet$1 = "function" === typeof WeakSet ? WeakSet : Set;

  function logError(boundary, errorInfo) {
    var source = errorInfo.source,
        stack = errorInfo.stack;
    null === stack && null !== source && (stack = getStackByFiberInDevAndProd(source));
    errorInfo = {
      componentName: null !== source ? getComponentName(source.type) : null,
      componentStack: null !== stack ? stack : "",
      error: errorInfo.value,
      errorBoundary: null,
      errorBoundaryName: null,
      errorBoundaryFound: false,
      willRetry: false
    };
    null !== boundary && 1 === boundary.tag && (errorInfo.errorBoundary = boundary.stateNode, errorInfo.errorBoundaryName = getComponentName(boundary.type), errorInfo.errorBoundaryFound = true, errorInfo.willRetry = true);

    try {
      logCapturedError(errorInfo);
    } catch (e) {
      setTimeout(function () {
        throw e;
      });
    }
  }

  function safelyCallComponentWillUnmount(current$$1, instance) {
    try {
      instance.props = current$$1.memoizedProps, instance.state = current$$1.memoizedState, instance.componentWillUnmount();
    } catch (unmountError) {
      captureCommitPhaseError(current$$1, unmountError);
    }
  }

  function safelyDetachRef(current$$1) {
    var ref = current$$1.ref;
    if (null !== ref) if ("function" === typeof ref) try {
      ref(null);
    } catch (refError) {
      captureCommitPhaseError(current$$1, refError);
    } else ref.current = null;
  }

  function commitHookEffectList(unmountTag, mountTag, finishedWork) {
    finishedWork = finishedWork.updateQueue;
    finishedWork = null !== finishedWork ? finishedWork.lastEffect : null;

    if (null !== finishedWork) {
      var effect = finishedWork = finishedWork.next;

      do {
        if ((effect.tag & unmountTag) !== NoEffect$1) {
          var destroy = effect.destroy;
          effect.destroy = undefined;
          undefined !== destroy && destroy();
        }

        (effect.tag & mountTag) !== NoEffect$1 && (destroy = effect.create, effect.destroy = destroy());
        effect = effect.next;
      } while (effect !== finishedWork);
    }
  }

  function commitUnmount(current$$1$jscomp$0, renderPriorityLevel) {
    "function" === typeof onCommitFiberUnmount && onCommitFiberUnmount(current$$1$jscomp$0);

    switch (current$$1$jscomp$0.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        var updateQueue = current$$1$jscomp$0.updateQueue;

        if (null !== updateQueue && (updateQueue = updateQueue.lastEffect, null !== updateQueue)) {
          var firstEffect = updateQueue.next;
          runWithPriority(97 < renderPriorityLevel ? 97 : renderPriorityLevel, function () {
            var effect = firstEffect;

            do {
              var destroy = effect.destroy;

              if (undefined !== destroy) {
                var current$$1 = current$$1$jscomp$0;

                try {
                  destroy();
                } catch (error) {
                  captureCommitPhaseError(current$$1, error);
                }
              }

              effect = effect.next;
            } while (effect !== firstEffect);
          });
        }

        break;

      case 1:
        safelyDetachRef(current$$1$jscomp$0);
        renderPriorityLevel = current$$1$jscomp$0.stateNode;
        "function" === typeof renderPriorityLevel.componentWillUnmount && safelyCallComponentWillUnmount(current$$1$jscomp$0, renderPriorityLevel);
        break;

      case 5:
        safelyDetachRef(current$$1$jscomp$0);
        break;

      case 4:
        unmountHostComponents(current$$1$jscomp$0, renderPriorityLevel);
    }
  }

  function detachFiber(current$$1) {
    var alternate = current$$1.alternate;
    current$$1.return = null;
    current$$1.child = null;
    current$$1.memoizedState = null;
    current$$1.updateQueue = null;
    current$$1.dependencies = null;
    current$$1.alternate = null;
    current$$1.firstEffect = null;
    current$$1.lastEffect = null;
    current$$1.pendingProps = null;
    current$$1.memoizedProps = null;
    null !== alternate && detachFiber(alternate);
  }

  function isHostParent(fiber) {
    return 5 === fiber.tag || 3 === fiber.tag || 4 === fiber.tag;
  }

  function commitPlacement(finishedWork) {
    a: {
      for (var parent = finishedWork.return; null !== parent;) {
        if (isHostParent(parent)) {
          var parentFiber = parent;
          break a;
        }

        parent = parent.return;
      }

      throw ReactError(Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue."));
    }

    parent = parentFiber.stateNode;

    switch (parentFiber.tag) {
      case 5:
        var isContainer = false;
        break;

      case 3:
        parent = parent.containerInfo;
        isContainer = true;
        break;

      case 4:
        parent = parent.containerInfo;
        isContainer = true;
        break;

      default:
        throw ReactError(Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue."));
    }

    parentFiber.effectTag & 16 && (parentFiber.effectTag &= -17);

    a: b: for (parentFiber = finishedWork;;) {
      for (; null === parentFiber.sibling;) {
        if (null === parentFiber.return || isHostParent(parentFiber.return)) {
          parentFiber = null;
          break a;
        }

        parentFiber = parentFiber.return;
      }

      parentFiber.sibling.return = parentFiber.return;

      for (parentFiber = parentFiber.sibling; 5 !== parentFiber.tag && 6 !== parentFiber.tag && 18 !== parentFiber.tag;) {
        if (parentFiber.effectTag & 2) continue b;
        if (null === parentFiber.child || 4 === parentFiber.tag) continue b;else parentFiber.child.return = parentFiber, parentFiber = parentFiber.child;
      }

      if (!(parentFiber.effectTag & 2)) {
        parentFiber = parentFiber.stateNode;
        break a;
      }
    }

    for (var node = finishedWork;;) {
      var isHost = 5 === node.tag || 6 === node.tag;

      if (isHost) {
        var stateNode = isHost ? node.stateNode : node.stateNode.instance;
        if (parentFiber) {
          if (isContainer) {
            if ("number" === typeof parent) throw ReactError(Error("Container does not support insertBefore operation"));
          } else {
            isHost = parent;
            var beforeChild = parentFiber,
                children = isHost._children,
                index = children.indexOf(stateNode);
            0 <= index ? (children.splice(index, 1), beforeChild = children.indexOf(beforeChild), children.splice(beforeChild, 0, stateNode), ReactNativePrivateInterface.UIManager.manageChildren(isHost._nativeTag, [index], [beforeChild], [], [], [])) : (index = children.indexOf(beforeChild), children.splice(index, 0, stateNode), ReactNativePrivateInterface.UIManager.manageChildren(isHost._nativeTag, [], [], ["number" === typeof stateNode ? stateNode : stateNode._nativeTag], [index], []));
          }
        } else isContainer ? ReactNativePrivateInterface.UIManager.setChildren(parent, ["number" === typeof stateNode ? stateNode : stateNode._nativeTag]) : (isHost = parent, children = "number" === typeof stateNode ? stateNode : stateNode._nativeTag, index = isHost._children, beforeChild = index.indexOf(stateNode), 0 <= beforeChild ? (index.splice(beforeChild, 1), index.push(stateNode), ReactNativePrivateInterface.UIManager.manageChildren(isHost._nativeTag, [beforeChild], [index.length - 1], [], [], [])) : (index.push(stateNode), ReactNativePrivateInterface.UIManager.manageChildren(isHost._nativeTag, [], [], [children], [index.length - 1], [])));
      } else if (4 !== node.tag && null !== node.child) {
        node.child.return = node;
        node = node.child;
        continue;
      }

      if (node === finishedWork) break;

      for (; null === node.sibling;) {
        if (null === node.return || node.return === finishedWork) return;
        node = node.return;
      }

      node.sibling.return = node.return;
      node = node.sibling;
    }
  }

  function unmountHostComponents(current$$1, renderPriorityLevel$jscomp$0) {
    for (var node = current$$1, currentParentIsValid = false, currentParent = undefined, currentParentIsContainer = undefined;;) {
      if (!currentParentIsValid) {
        currentParentIsValid = node.return;

        a: for (;;) {
          if (null === currentParentIsValid) throw ReactError(Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue."));
          currentParent = currentParentIsValid.stateNode;

          switch (currentParentIsValid.tag) {
            case 5:
              currentParentIsContainer = false;
              break a;

            case 3:
              currentParent = currentParent.containerInfo;
              currentParentIsContainer = true;
              break a;

            case 4:
              currentParent = currentParent.containerInfo;
              currentParentIsContainer = true;
              break a;
          }

          currentParentIsValid = currentParentIsValid.return;
        }

        currentParentIsValid = true;
      }

      if (5 === node.tag || 6 === node.tag) {
        a: for (var root = node, renderPriorityLevel = renderPriorityLevel$jscomp$0, node$jscomp$0 = root;;) {
          if (commitUnmount(node$jscomp$0, renderPriorityLevel), null !== node$jscomp$0.child && 4 !== node$jscomp$0.tag) node$jscomp$0.child.return = node$jscomp$0, node$jscomp$0 = node$jscomp$0.child;else {
            if (node$jscomp$0 === root) break;

            for (; null === node$jscomp$0.sibling;) {
              if (null === node$jscomp$0.return || node$jscomp$0.return === root) break a;
              node$jscomp$0 = node$jscomp$0.return;
            }

            node$jscomp$0.sibling.return = node$jscomp$0.return;
            node$jscomp$0 = node$jscomp$0.sibling;
          }
        }

        currentParentIsContainer ? (root = currentParent, recursivelyUncacheFiberNode(node.stateNode), ReactNativePrivateInterface.UIManager.manageChildren(root, [], [], [], [], [0])) : (root = currentParent, node$jscomp$0 = node.stateNode, recursivelyUncacheFiberNode(node$jscomp$0), renderPriorityLevel = root._children, node$jscomp$0 = renderPriorityLevel.indexOf(node$jscomp$0), renderPriorityLevel.splice(node$jscomp$0, 1), ReactNativePrivateInterface.UIManager.manageChildren(root._nativeTag, [], [], [], [], [node$jscomp$0]));
      } else if (4 === node.tag) {
        if (null !== node.child) {
          currentParent = node.stateNode.containerInfo;
          currentParentIsContainer = true;
          node.child.return = node;
          node = node.child;
          continue;
        }
      } else if (commitUnmount(node, renderPriorityLevel$jscomp$0), null !== node.child) {
        node.child.return = node;
        node = node.child;
        continue;
      }

      if (node === current$$1) break;

      for (; null === node.sibling;) {
        if (null === node.return || node.return === current$$1) return;
        node = node.return;
        4 === node.tag && (currentParentIsValid = false);
      }

      node.sibling.return = node.return;
      node = node.sibling;
    }
  }

  function commitWork(current$$1, finishedWork) {
    switch (finishedWork.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        commitHookEffectList(UnmountMutation, MountMutation, finishedWork);
        break;

      case 1:
        break;

      case 5:
        var instance = finishedWork.stateNode;

        if (null != instance) {
          var newProps = finishedWork.memoizedProps;
          current$$1 = null !== current$$1 ? current$$1.memoizedProps : newProps;
          var updatePayload = finishedWork.updateQueue;
          finishedWork.updateQueue = null;
          null !== updatePayload && (finishedWork = instance.viewConfig, instanceProps.set(instance._nativeTag, newProps), newProps = diffProperties(null, current$$1, newProps, finishedWork.validAttributes), null != newProps && ReactNativePrivateInterface.UIManager.updateView(instance._nativeTag, finishedWork.uiViewClassName, newProps));
        }

        break;

      case 6:
        if (null === finishedWork.stateNode) throw ReactError(Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue."));
        ReactNativePrivateInterface.UIManager.updateView(finishedWork.stateNode, "RCTRawText", {
          text: finishedWork.memoizedProps
        });
        break;

      case 3:
        break;

      case 12:
        break;

      case 13:
        instance = finishedWork;
        null === finishedWork.memoizedState ? newProps = false : (newProps = true, instance = finishedWork.child, globalMostRecentFallbackTime = now());
        if (null !== instance) a: for (current$$1 = instance;;) {
          if (5 === current$$1.tag) {
            if (updatePayload = current$$1.stateNode, newProps) {
              var viewConfig = updatePayload.viewConfig;
              var updatePayload$jscomp$0 = diffProperties(null, emptyObject, {
                style: {
                  display: "none"
                }
              }, viewConfig.validAttributes);
              ReactNativePrivateInterface.UIManager.updateView(updatePayload._nativeTag, viewConfig.uiViewClassName, updatePayload$jscomp$0);
            } else {
              updatePayload = current$$1.stateNode;
              updatePayload$jscomp$0 = current$$1.memoizedProps;
              viewConfig = updatePayload.viewConfig;

              var prevProps = _extends({}, updatePayload$jscomp$0, {
                style: [updatePayload$jscomp$0.style, {
                  display: "none"
                }]
              });

              updatePayload$jscomp$0 = diffProperties(null, prevProps, updatePayload$jscomp$0, viewConfig.validAttributes);
              ReactNativePrivateInterface.UIManager.updateView(updatePayload._nativeTag, viewConfig.uiViewClassName, updatePayload$jscomp$0);
            }
          } else {
            if (6 === current$$1.tag) throw Error("Not yet implemented.");

            if (13 === current$$1.tag && null !== current$$1.memoizedState) {
              updatePayload = current$$1.child.sibling;
              updatePayload.return = current$$1;
              current$$1 = updatePayload;
              continue;
            } else if (null !== current$$1.child) {
              current$$1.child.return = current$$1;
              current$$1 = current$$1.child;
              continue;
            }
          }
          if (current$$1 === instance) break a;

          for (; null === current$$1.sibling;) {
            if (null === current$$1.return || current$$1.return === instance) break a;
            current$$1 = current$$1.return;
          }

          current$$1.sibling.return = current$$1.return;
          current$$1 = current$$1.sibling;
        }
        attachSuspenseRetryListeners(finishedWork);
        break;

      case 19:
        attachSuspenseRetryListeners(finishedWork);
        break;

      case 17:
        break;

      case 20:
        break;

      default:
        throw ReactError(Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue."));
    }
  }

  function attachSuspenseRetryListeners(finishedWork) {
    var thenables = finishedWork.updateQueue;

    if (null !== thenables) {
      finishedWork.updateQueue = null;
      var retryCache = finishedWork.stateNode;
      null === retryCache && (retryCache = finishedWork.stateNode = new PossiblyWeakSet$1());
      thenables.forEach(function (thenable) {
        var retry = resolveRetryThenable.bind(null, finishedWork, thenable);
        retryCache.has(thenable) || (retryCache.add(thenable), thenable.then(retry, retry));
      });
    }
  }

  var PossiblyWeakMap = "function" === typeof WeakMap ? WeakMap : Map;

  function createRootErrorUpdate(fiber, errorInfo, expirationTime) {
    expirationTime = createUpdate(expirationTime, null);
    expirationTime.tag = 3;
    expirationTime.payload = {
      element: null
    };
    var error = errorInfo.value;

    expirationTime.callback = function () {
      hasUncaughtError || (hasUncaughtError = true, firstUncaughtError = error);
      logError(fiber, errorInfo);
    };

    return expirationTime;
  }

  function createClassErrorUpdate(fiber, errorInfo, expirationTime) {
    expirationTime = createUpdate(expirationTime, null);
    expirationTime.tag = 3;
    var getDerivedStateFromError = fiber.type.getDerivedStateFromError;

    if ("function" === typeof getDerivedStateFromError) {
      var error = errorInfo.value;

      expirationTime.payload = function () {
        logError(fiber, errorInfo);
        return getDerivedStateFromError(error);
      };
    }

    var inst = fiber.stateNode;
    null !== inst && "function" === typeof inst.componentDidCatch && (expirationTime.callback = function () {
      "function" !== typeof getDerivedStateFromError && (null === legacyErrorBoundariesThatAlreadyFailed ? legacyErrorBoundariesThatAlreadyFailed = new Set([this]) : legacyErrorBoundariesThatAlreadyFailed.add(this), logError(fiber, errorInfo));
      var stack = errorInfo.stack;
      this.componentDidCatch(errorInfo.value, {
        componentStack: null !== stack ? stack : ""
      });
    });
    return expirationTime;
  }

  var ceil = Math.ceil,
      ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher,
      ReactCurrentOwner$2 = ReactSharedInternals.ReactCurrentOwner,
      NoContext = 0,
      LegacyUnbatchedContext = 8,
      RenderContext = 16,
      CommitContext = 32,
      RootIncomplete = 0,
      RootErrored = 1,
      RootSuspended = 2,
      RootSuspendedWithDelay = 3,
      RootCompleted = 4,
      executionContext = NoContext,
      workInProgressRoot = null,
      workInProgress = null,
      renderExpirationTime = 0,
      workInProgressRootExitStatus = RootIncomplete,
      workInProgressRootLatestProcessedExpirationTime = 1073741823,
      workInProgressRootLatestSuspenseTimeout = 1073741823,
      workInProgressRootCanSuspendUsingConfig = null,
      workInProgressRootHasPendingPing = false,
      globalMostRecentFallbackTime = 0,
      FALLBACK_THROTTLE_MS = 500,
      nextEffect = null,
      hasUncaughtError = false,
      firstUncaughtError = null,
      legacyErrorBoundariesThatAlreadyFailed = null,
      rootDoesHavePassiveEffects = false,
      rootWithPendingPassiveEffects = null,
      pendingPassiveEffectsRenderPriority = 90,
      pendingPassiveEffectsExpirationTime = 0,
      rootsWithPendingDiscreteUpdates = null,
      nestedUpdateCount = 0,
      rootWithNestedUpdates = null,
      currentEventTime = 0;

  function requestCurrentTime() {
    return (executionContext & 48) !== NoContext ? 1073741821 - (now() / 10 | 0) : 0 !== currentEventTime ? currentEventTime : currentEventTime = 1073741821 - (now() / 10 | 0);
  }

  function computeExpirationForFiber(currentTime, fiber, suspenseConfig) {
    fiber = fiber.mode;
    if (0 === (fiber & 2)) return 1073741823;
    var priorityLevel = getCurrentPriorityLevel();
    if (0 === (fiber & 4)) return 99 === priorityLevel ? 1073741823 : 1073741822;
    if ((executionContext & RenderContext) !== NoContext) return renderExpirationTime;
    if (null !== suspenseConfig) currentTime = 1073741821 - 25 * (((1073741821 - currentTime + (suspenseConfig.timeoutMs | 0 || 5e3) / 10) / 25 | 0) + 1);else switch (priorityLevel) {
      case 99:
        currentTime = 1073741823;
        break;

      case 98:
        currentTime = 1073741821 - 10 * (((1073741821 - currentTime + 15) / 10 | 0) + 1);
        break;

      case 97:
      case 96:
        currentTime = 1073741821 - 25 * (((1073741821 - currentTime + 500) / 25 | 0) + 1);
        break;

      case 95:
        currentTime = 1;
        break;

      default:
        throw ReactError(Error("Expected a valid priority level"));
    }
    null !== workInProgressRoot && currentTime === renderExpirationTime && --currentTime;
    return currentTime;
  }

  function scheduleUpdateOnFiber(fiber, expirationTime) {
    if (50 < nestedUpdateCount) throw nestedUpdateCount = 0, rootWithNestedUpdates = null, ReactError(Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops."));
    fiber = markUpdateTimeFromFiberToRoot(fiber, expirationTime);

    if (null !== fiber) {
      fiber.pingTime = 0;
      var priorityLevel = getCurrentPriorityLevel();
      if (1073741823 === expirationTime) {
        if ((executionContext & LegacyUnbatchedContext) !== NoContext && (executionContext & 48) === NoContext) for (var callback = renderRoot(fiber, 1073741823, true); null !== callback;) {
          callback = callback(true);
        } else scheduleCallbackForRoot(fiber, 99, 1073741823), executionContext === NoContext && flushSyncCallbackQueue();
      } else scheduleCallbackForRoot(fiber, priorityLevel, expirationTime);
      (executionContext & 4) === NoContext || 98 !== priorityLevel && 99 !== priorityLevel || (null === rootsWithPendingDiscreteUpdates ? rootsWithPendingDiscreteUpdates = new Map([[fiber, expirationTime]]) : (priorityLevel = rootsWithPendingDiscreteUpdates.get(fiber), (undefined === priorityLevel || priorityLevel > expirationTime) && rootsWithPendingDiscreteUpdates.set(fiber, expirationTime)));
    }
  }

  function markUpdateTimeFromFiberToRoot(fiber, expirationTime) {
    fiber.expirationTime < expirationTime && (fiber.expirationTime = expirationTime);
    var alternate = fiber.alternate;
    null !== alternate && alternate.expirationTime < expirationTime && (alternate.expirationTime = expirationTime);
    var node = fiber.return,
        root = null;
    if (null === node && 3 === fiber.tag) root = fiber.stateNode;else for (; null !== node;) {
      alternate = node.alternate;
      node.childExpirationTime < expirationTime && (node.childExpirationTime = expirationTime);
      null !== alternate && alternate.childExpirationTime < expirationTime && (alternate.childExpirationTime = expirationTime);

      if (null === node.return && 3 === node.tag) {
        root = node.stateNode;
        break;
      }

      node = node.return;
    }
    null !== root && (expirationTime > root.firstPendingTime && (root.firstPendingTime = expirationTime), fiber = root.lastPendingTime, 0 === fiber || expirationTime < fiber) && (root.lastPendingTime = expirationTime);
    return root;
  }

  function scheduleCallbackForRoot(root, priorityLevel, expirationTime) {
    if (root.callbackExpirationTime < expirationTime) {
      var existingCallbackNode = root.callbackNode;
      null !== existingCallbackNode && existingCallbackNode !== fakeCallbackNode && Scheduler_cancelCallback(existingCallbackNode);
      root.callbackExpirationTime = expirationTime;
      1073741823 === expirationTime ? root.callbackNode = scheduleSyncCallback(runRootCallback.bind(null, root, renderRoot.bind(null, root, expirationTime))) : (existingCallbackNode = null, 1 !== expirationTime && (existingCallbackNode = {
        timeout: 10 * (1073741821 - expirationTime) - now()
      }), root.callbackNode = scheduleCallback(priorityLevel, runRootCallback.bind(null, root, renderRoot.bind(null, root, expirationTime)), existingCallbackNode));
    }
  }

  function runRootCallback(root, callback, isSync) {
    var prevCallbackNode = root.callbackNode,
        continuation = null;

    try {
      return continuation = callback(isSync), null !== continuation ? runRootCallback.bind(null, root, continuation) : null;
    } finally {
      null === continuation && prevCallbackNode === root.callbackNode && (root.callbackNode = null, root.callbackExpirationTime = 0);
    }
  }

  function resolveLocksOnRoot(root, expirationTime) {
    var firstBatch = root.firstBatch;
    return null !== firstBatch && firstBatch._defer && firstBatch._expirationTime >= expirationTime ? (scheduleCallback(97, function () {
      firstBatch._onComplete();

      return null;
    }), true) : false;
  }

  function flushPendingDiscreteUpdates() {
    if (null !== rootsWithPendingDiscreteUpdates) {
      var roots = rootsWithPendingDiscreteUpdates;
      rootsWithPendingDiscreteUpdates = null;
      roots.forEach(function (expirationTime, root) {
        scheduleSyncCallback(renderRoot.bind(null, root, expirationTime));
      });
      flushSyncCallbackQueue();
    }
  }

  function prepareFreshStack(root, expirationTime) {
    root.finishedWork = null;
    root.finishedExpirationTime = 0;
    var timeoutHandle = root.timeoutHandle;
    -1 !== timeoutHandle && (root.timeoutHandle = -1, cancelTimeout(timeoutHandle));
    if (null !== workInProgress) for (timeoutHandle = workInProgress.return; null !== timeoutHandle;) {
      var interruptedWork = timeoutHandle;

      switch (interruptedWork.tag) {
        case 1:
          var childContextTypes = interruptedWork.type.childContextTypes;
          null !== childContextTypes && undefined !== childContextTypes && popContext(interruptedWork);
          break;

        case 3:
          popHostContainer(interruptedWork);
          popTopLevelContextObject(interruptedWork);
          break;

        case 5:
          popHostContext(interruptedWork);
          break;

        case 4:
          popHostContainer(interruptedWork);
          break;

        case 13:
          pop(suspenseStackCursor, interruptedWork);
          break;

        case 19:
          pop(suspenseStackCursor, interruptedWork);
          break;

        case 10:
          popProvider(interruptedWork);
      }

      timeoutHandle = timeoutHandle.return;
    }
    workInProgressRoot = root;
    workInProgress = createWorkInProgress(root.current, null, expirationTime);
    renderExpirationTime = expirationTime;
    workInProgressRootExitStatus = RootIncomplete;
    workInProgressRootLatestSuspenseTimeout = workInProgressRootLatestProcessedExpirationTime = 1073741823;
    workInProgressRootCanSuspendUsingConfig = null;
    workInProgressRootHasPendingPing = false;
  }

  function renderRoot(root$jscomp$0, expirationTime, isSync) {
    if ((executionContext & 48) !== NoContext) throw ReactError(Error("Should not already be working."));
    if (root$jscomp$0.firstPendingTime < expirationTime) return null;
    if (isSync && root$jscomp$0.finishedExpirationTime === expirationTime) return commitRoot.bind(null, root$jscomp$0);
    flushPassiveEffects();
    if (root$jscomp$0 !== workInProgressRoot || expirationTime !== renderExpirationTime) prepareFreshStack(root$jscomp$0, expirationTime);else if (workInProgressRootExitStatus === RootSuspendedWithDelay) if (workInProgressRootHasPendingPing) prepareFreshStack(root$jscomp$0, expirationTime);else {
      var lastPendingTime = root$jscomp$0.lastPendingTime;
      if (lastPendingTime < expirationTime) return renderRoot.bind(null, root$jscomp$0, lastPendingTime);
    }

    if (null !== workInProgress) {
      lastPendingTime = executionContext;
      executionContext |= RenderContext;
      var prevDispatcher = ReactCurrentDispatcher.current;
      null === prevDispatcher && (prevDispatcher = ContextOnlyDispatcher);
      ReactCurrentDispatcher.current = ContextOnlyDispatcher;

      if (isSync) {
        if (1073741823 !== expirationTime) {
          var currentTime = requestCurrentTime();
          if (currentTime < expirationTime) return executionContext = lastPendingTime, resetContextDependencies(), ReactCurrentDispatcher.current = prevDispatcher, renderRoot.bind(null, root$jscomp$0, currentTime);
        }
      } else currentEventTime = 0;

      do {
        try {
          if (isSync) for (; null !== workInProgress;) {
            workInProgress = performUnitOfWork(workInProgress);
          } else for (; null !== workInProgress && !Scheduler_shouldYield();) {
            workInProgress = performUnitOfWork(workInProgress);
          }
          break;
        } catch (thrownValue) {
          resetContextDependencies();
          resetHooks();
          currentTime = workInProgress;
          if (null === currentTime || null === currentTime.return) throw prepareFreshStack(root$jscomp$0, expirationTime), executionContext = lastPendingTime, thrownValue;

          a: {
            var root = root$jscomp$0,
                returnFiber = currentTime.return,
                sourceFiber = currentTime,
                value = thrownValue,
                renderExpirationTime$jscomp$0 = renderExpirationTime;
            sourceFiber.effectTag |= 1024;
            sourceFiber.firstEffect = sourceFiber.lastEffect = null;

            if (null !== value && "object" === typeof value && "function" === typeof value.then) {
              var thenable = value,
                  hasInvisibleParentBoundary = 0 !== (suspenseStackCursor.current & InvisibleParentSuspenseContext);
              value = returnFiber;

              do {
                var JSCompiler_temp;
                if (JSCompiler_temp = 13 === value.tag) null !== value.memoizedState ? JSCompiler_temp = false : (JSCompiler_temp = value.memoizedProps, JSCompiler_temp = undefined === JSCompiler_temp.fallback ? false : true !== JSCompiler_temp.unstable_avoidThisFallback ? true : hasInvisibleParentBoundary ? false : true);

                if (JSCompiler_temp) {
                  returnFiber = value.updateQueue;
                  null === returnFiber ? (returnFiber = new Set(), returnFiber.add(thenable), value.updateQueue = returnFiber) : returnFiber.add(thenable);

                  if (0 === (value.mode & 2)) {
                    value.effectTag |= 64;
                    sourceFiber.effectTag &= -1957;
                    1 === sourceFiber.tag && (null === sourceFiber.alternate ? sourceFiber.tag = 17 : (renderExpirationTime$jscomp$0 = createUpdate(1073741823, null), renderExpirationTime$jscomp$0.tag = 2, enqueueUpdate(sourceFiber, renderExpirationTime$jscomp$0)));
                    sourceFiber.expirationTime = 1073741823;
                    break a;
                  }

                  sourceFiber = root;
                  root = renderExpirationTime$jscomp$0;
                  hasInvisibleParentBoundary = sourceFiber.pingCache;
                  null === hasInvisibleParentBoundary ? (hasInvisibleParentBoundary = sourceFiber.pingCache = new PossiblyWeakMap(), returnFiber = new Set(), hasInvisibleParentBoundary.set(thenable, returnFiber)) : (returnFiber = hasInvisibleParentBoundary.get(thenable), undefined === returnFiber && (returnFiber = new Set(), hasInvisibleParentBoundary.set(thenable, returnFiber)));
                  returnFiber.has(root) || (returnFiber.add(root), sourceFiber = pingSuspendedRoot.bind(null, sourceFiber, thenable, root), thenable.then(sourceFiber, sourceFiber));
                  value.effectTag |= 2048;
                  value.expirationTime = renderExpirationTime$jscomp$0;
                  break a;
                }

                value = value.return;
              } while (null !== value);

              value = Error((getComponentName(sourceFiber.type) || "A React component") + " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display." + getStackByFiberInDevAndProd(sourceFiber));
            }

            workInProgressRootExitStatus !== RootCompleted && (workInProgressRootExitStatus = RootErrored);
            value = createCapturedValue(value, sourceFiber);
            sourceFiber = returnFiber;

            do {
              switch (sourceFiber.tag) {
                case 3:
                  sourceFiber.effectTag |= 2048;
                  sourceFiber.expirationTime = renderExpirationTime$jscomp$0;
                  renderExpirationTime$jscomp$0 = createRootErrorUpdate(sourceFiber, value, renderExpirationTime$jscomp$0);
                  enqueueCapturedUpdate(sourceFiber, renderExpirationTime$jscomp$0);
                  break a;

                case 1:
                  if (thenable = value, root = sourceFiber.type, returnFiber = sourceFiber.stateNode, 0 === (sourceFiber.effectTag & 64) && ("function" === typeof root.getDerivedStateFromError || null !== returnFiber && "function" === typeof returnFiber.componentDidCatch && (null === legacyErrorBoundariesThatAlreadyFailed || !legacyErrorBoundariesThatAlreadyFailed.has(returnFiber)))) {
                    sourceFiber.effectTag |= 2048;
                    sourceFiber.expirationTime = renderExpirationTime$jscomp$0;
                    renderExpirationTime$jscomp$0 = createClassErrorUpdate(sourceFiber, thenable, renderExpirationTime$jscomp$0);
                    enqueueCapturedUpdate(sourceFiber, renderExpirationTime$jscomp$0);
                    break a;
                  }

              }

              sourceFiber = sourceFiber.return;
            } while (null !== sourceFiber);
          }

          workInProgress = completeUnitOfWork(currentTime);
        }
      } while (1);

      executionContext = lastPendingTime;
      resetContextDependencies();
      ReactCurrentDispatcher.current = prevDispatcher;
      if (null !== workInProgress) return renderRoot.bind(null, root$jscomp$0, expirationTime);
    }

    root$jscomp$0.finishedWork = root$jscomp$0.current.alternate;
    root$jscomp$0.finishedExpirationTime = expirationTime;
    if (resolveLocksOnRoot(root$jscomp$0, expirationTime)) return null;
    workInProgressRoot = null;

    switch (workInProgressRootExitStatus) {
      case RootIncomplete:
        throw ReactError(Error("Should have a work-in-progress."));

      case RootErrored:
        return lastPendingTime = root$jscomp$0.lastPendingTime, lastPendingTime < expirationTime ? renderRoot.bind(null, root$jscomp$0, lastPendingTime) : isSync ? commitRoot.bind(null, root$jscomp$0) : (prepareFreshStack(root$jscomp$0, expirationTime), scheduleSyncCallback(renderRoot.bind(null, root$jscomp$0, expirationTime)), null);

      case RootSuspended:
        if (1073741823 === workInProgressRootLatestProcessedExpirationTime && !isSync && (isSync = globalMostRecentFallbackTime + FALLBACK_THROTTLE_MS - now(), 10 < isSync)) {
          if (workInProgressRootHasPendingPing) return prepareFreshStack(root$jscomp$0, expirationTime), renderRoot.bind(null, root$jscomp$0, expirationTime);
          lastPendingTime = root$jscomp$0.lastPendingTime;
          if (lastPendingTime < expirationTime) return renderRoot.bind(null, root$jscomp$0, lastPendingTime);
          root$jscomp$0.timeoutHandle = scheduleTimeout(commitRoot.bind(null, root$jscomp$0), isSync);
          return null;
        }

        return commitRoot.bind(null, root$jscomp$0);

      case RootSuspendedWithDelay:
        if (!isSync) {
          if (workInProgressRootHasPendingPing) return prepareFreshStack(root$jscomp$0, expirationTime), renderRoot.bind(null, root$jscomp$0, expirationTime);
          isSync = root$jscomp$0.lastPendingTime;
          if (isSync < expirationTime) return renderRoot.bind(null, root$jscomp$0, isSync);
          1073741823 !== workInProgressRootLatestSuspenseTimeout ? isSync = 10 * (1073741821 - workInProgressRootLatestSuspenseTimeout) - now() : 1073741823 === workInProgressRootLatestProcessedExpirationTime ? isSync = 0 : (isSync = 10 * (1073741821 - workInProgressRootLatestProcessedExpirationTime) - 5e3, lastPendingTime = now(), expirationTime = 10 * (1073741821 - expirationTime) - lastPendingTime, isSync = lastPendingTime - isSync, 0 > isSync && (isSync = 0), isSync = (120 > isSync ? 120 : 480 > isSync ? 480 : 1080 > isSync ? 1080 : 1920 > isSync ? 1920 : 3e3 > isSync ? 3e3 : 4320 > isSync ? 4320 : 1960 * ceil(isSync / 1960)) - isSync, expirationTime < isSync && (isSync = expirationTime));
          if (10 < isSync) return root$jscomp$0.timeoutHandle = scheduleTimeout(commitRoot.bind(null, root$jscomp$0), isSync), null;
        }

        return commitRoot.bind(null, root$jscomp$0);

      case RootCompleted:
        return !isSync && 1073741823 !== workInProgressRootLatestProcessedExpirationTime && null !== workInProgressRootCanSuspendUsingConfig && (lastPendingTime = workInProgressRootLatestProcessedExpirationTime, prevDispatcher = workInProgressRootCanSuspendUsingConfig, expirationTime = prevDispatcher.busyMinDurationMs | 0, 0 >= expirationTime ? expirationTime = 0 : (isSync = prevDispatcher.busyDelayMs | 0, lastPendingTime = now() - (10 * (1073741821 - lastPendingTime) - (prevDispatcher.timeoutMs | 0 || 5e3)), expirationTime = lastPendingTime <= isSync ? 0 : isSync + expirationTime - lastPendingTime), 10 < expirationTime) ? (root$jscomp$0.timeoutHandle = scheduleTimeout(commitRoot.bind(null, root$jscomp$0), expirationTime), null) : commitRoot.bind(null, root$jscomp$0);

      default:
        throw ReactError(Error("Unknown root exit status."));
    }
  }

  function markRenderEventTimeAndConfig(expirationTime, suspenseConfig) {
    expirationTime < workInProgressRootLatestProcessedExpirationTime && 1 < expirationTime && (workInProgressRootLatestProcessedExpirationTime = expirationTime);
    null !== suspenseConfig && expirationTime < workInProgressRootLatestSuspenseTimeout && 1 < expirationTime && (workInProgressRootLatestSuspenseTimeout = expirationTime, workInProgressRootCanSuspendUsingConfig = suspenseConfig);
  }

  function performUnitOfWork(unitOfWork) {
    var next = beginWork$$1(unitOfWork.alternate, unitOfWork, renderExpirationTime);
    unitOfWork.memoizedProps = unitOfWork.pendingProps;
    null === next && (next = completeUnitOfWork(unitOfWork));
    ReactCurrentOwner$2.current = null;
    return next;
  }

  function completeUnitOfWork(unitOfWork) {
    workInProgress = unitOfWork;

    do {
      var current$$1 = workInProgress.alternate;
      unitOfWork = workInProgress.return;

      if (0 === (workInProgress.effectTag & 1024)) {
        a: {
          var current = current$$1;
          current$$1 = workInProgress;
          var renderExpirationTime$jscomp$0 = renderExpirationTime,
              newProps = current$$1.pendingProps;

          switch (current$$1.tag) {
            case 2:
              break;

            case 16:
              break;

            case 15:
            case 0:
              break;

            case 1:
              isContextProvider(current$$1.type) && popContext(current$$1);
              break;

            case 3:
              popHostContainer(current$$1);
              popTopLevelContextObject(current$$1);
              newProps = current$$1.stateNode;
              newProps.pendingContext && (newProps.context = newProps.pendingContext, newProps.pendingContext = null);
              if (null === current || null === current.child) current$$1.effectTag &= -3;
              updateHostContainer(current$$1);
              break;

            case 5:
              popHostContext(current$$1);
              renderExpirationTime$jscomp$0 = requiredContext(rootInstanceStackCursor.current);
              var type = current$$1.type;
              if (null !== current && null != current$$1.stateNode) updateHostComponent$1(current, current$$1, type, newProps, renderExpirationTime$jscomp$0), current.ref !== current$$1.ref && (current$$1.effectTag |= 128);else if (newProps) {
                current = requiredContext(contextStackCursor$1.current);
                var type$jscomp$0 = type;
                var _instance6 = newProps;
                var rootContainerInstance = renderExpirationTime$jscomp$0,
                    internalInstanceHandle = current$$1,
                    tag = allocateTag();
                type$jscomp$0 = getViewConfigForType(type$jscomp$0);
                var updatePayload = diffProperties(null, emptyObject, _instance6, type$jscomp$0.validAttributes);
                ReactNativePrivateInterface.UIManager.createView(tag, type$jscomp$0.uiViewClassName, rootContainerInstance, updatePayload);
                rootContainerInstance = new ReactNativeFiberHostComponent(tag, type$jscomp$0);
                instanceCache.set(tag, internalInstanceHandle);
                instanceProps.set(tag, _instance6);
                _instance6 = rootContainerInstance;
                appendAllChildren(_instance6, current$$1, false, false);
                finalizeInitialChildren(_instance6, type, newProps, renderExpirationTime$jscomp$0, current) && (current$$1.effectTag |= 4);
                current$$1.stateNode = _instance6;
                null !== current$$1.ref && (current$$1.effectTag |= 128);
              } else if (null === current$$1.stateNode) throw ReactError(Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue."));
              break;

            case 6:
              if (current && null != current$$1.stateNode) updateHostText$1(current, current$$1, current.memoizedProps, newProps);else {
                if ("string" !== typeof newProps && null === current$$1.stateNode) throw ReactError(Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue."));
                type = requiredContext(rootInstanceStackCursor.current);
                renderExpirationTime$jscomp$0 = requiredContext(contextStackCursor$1.current);
                current = current$$1;
                if (!renderExpirationTime$jscomp$0.isInAParentText) throw ReactError(Error("Text strings must be rendered within a <Text> component."));
                renderExpirationTime$jscomp$0 = allocateTag();
                ReactNativePrivateInterface.UIManager.createView(renderExpirationTime$jscomp$0, "RCTRawText", type, {
                  text: newProps
                });
                instanceCache.set(renderExpirationTime$jscomp$0, current$$1);
                current.stateNode = renderExpirationTime$jscomp$0;
              }
              break;

            case 11:
              break;

            case 13:
              pop(suspenseStackCursor, current$$1);
              newProps = current$$1.memoizedState;

              if (0 !== (current$$1.effectTag & 64)) {
                current$$1.expirationTime = renderExpirationTime$jscomp$0;
                break a;
              }

              newProps = null !== newProps;
              renderExpirationTime$jscomp$0 = false;
              null !== current && (type = current.memoizedState, renderExpirationTime$jscomp$0 = null !== type, newProps || null === type || (type = current.child.sibling, null !== type && (_instance6 = current$$1.firstEffect, null !== _instance6 ? (current$$1.firstEffect = type, type.nextEffect = _instance6) : (current$$1.firstEffect = current$$1.lastEffect = type, type.nextEffect = null), type.effectTag = 8)));
              if (newProps && !renderExpirationTime$jscomp$0 && 0 !== (current$$1.mode & 2)) if (null === current && true !== current$$1.memoizedProps.unstable_avoidThisFallback || 0 !== (suspenseStackCursor.current & InvisibleParentSuspenseContext)) workInProgressRootExitStatus === RootIncomplete && (workInProgressRootExitStatus = RootSuspended);else if (workInProgressRootExitStatus === RootIncomplete || workInProgressRootExitStatus === RootSuspended) workInProgressRootExitStatus = RootSuspendedWithDelay;
              if (newProps || renderExpirationTime$jscomp$0) current$$1.effectTag |= 4;
              break;

            case 7:
              break;

            case 8:
              break;

            case 12:
              break;

            case 4:
              popHostContainer(current$$1);
              updateHostContainer(current$$1);
              break;

            case 10:
              popProvider(current$$1);
              break;

            case 9:
              break;

            case 14:
              break;

            case 17:
              isContextProvider(current$$1.type) && popContext(current$$1);
              break;

            case 18:
              break;

            case 19:
              pop(suspenseStackCursor, current$$1);
              newProps = current$$1.memoizedState;
              if (null === newProps) break;
              type = 0 !== (current$$1.effectTag & 64);
              _instance6 = newProps.rendering;
              if (null === _instance6) {
                if (type) cutOffTailIfNeeded(newProps, false);else {
                  if (workInProgressRootExitStatus !== RootIncomplete || null !== current && 0 !== (current.effectTag & 64)) for (current = current$$1.child; null !== current;) {
                    _instance6 = findFirstSuspended(current);

                    if (null !== _instance6) {
                      current$$1.effectTag |= 64;
                      cutOffTailIfNeeded(newProps, false);
                      newProps = _instance6.updateQueue;
                      null !== newProps && (current$$1.updateQueue = newProps, current$$1.effectTag |= 4);
                      current$$1.firstEffect = current$$1.lastEffect = null;
                      newProps = renderExpirationTime$jscomp$0;

                      for (current = current$$1.child; null !== current;) {
                        renderExpirationTime$jscomp$0 = current, type = newProps, renderExpirationTime$jscomp$0.effectTag &= 2, renderExpirationTime$jscomp$0.nextEffect = null, renderExpirationTime$jscomp$0.firstEffect = null, renderExpirationTime$jscomp$0.lastEffect = null, _instance6 = renderExpirationTime$jscomp$0.alternate, null === _instance6 ? (renderExpirationTime$jscomp$0.childExpirationTime = 0, renderExpirationTime$jscomp$0.expirationTime = type, renderExpirationTime$jscomp$0.child = null, renderExpirationTime$jscomp$0.memoizedProps = null, renderExpirationTime$jscomp$0.memoizedState = null, renderExpirationTime$jscomp$0.updateQueue = null, renderExpirationTime$jscomp$0.dependencies = null) : (renderExpirationTime$jscomp$0.childExpirationTime = _instance6.childExpirationTime, renderExpirationTime$jscomp$0.expirationTime = _instance6.expirationTime, renderExpirationTime$jscomp$0.child = _instance6.child, renderExpirationTime$jscomp$0.memoizedProps = _instance6.memoizedProps, renderExpirationTime$jscomp$0.memoizedState = _instance6.memoizedState, renderExpirationTime$jscomp$0.updateQueue = _instance6.updateQueue, type = _instance6.dependencies, renderExpirationTime$jscomp$0.dependencies = null === type ? null : {
                          expirationTime: type.expirationTime,
                          firstContext: type.firstContext,
                          responders: type.responders
                        }), current = current.sibling;
                      }

                      push(suspenseStackCursor, suspenseStackCursor.current & SubtreeSuspenseContextMask | ForceSuspenseFallback, current$$1);
                      current$$1 = current$$1.child;
                      break a;
                    }

                    current = current.sibling;
                  }
                }
              } else {
                if (!type) if (current = findFirstSuspended(_instance6), null !== current) {
                  if (current$$1.effectTag |= 64, type = true, cutOffTailIfNeeded(newProps, true), null === newProps.tail && "hidden" === newProps.tailMode) {
                    current = current.updateQueue;
                    null !== current && (current$$1.updateQueue = current, current$$1.effectTag |= 4);
                    current$$1 = current$$1.lastEffect = newProps.lastEffect;
                    null !== current$$1 && (current$$1.nextEffect = null);
                    break;
                  }
                } else now() > newProps.tailExpiration && 1 < renderExpirationTime$jscomp$0 && (current$$1.effectTag |= 64, type = true, cutOffTailIfNeeded(newProps, false), current$$1.expirationTime = current$$1.childExpirationTime = renderExpirationTime$jscomp$0 - 1);
                newProps.isBackwards ? (_instance6.sibling = current$$1.child, current$$1.child = _instance6) : (current = newProps.last, null !== current ? current.sibling = _instance6 : current$$1.child = _instance6, newProps.last = _instance6);
              }

              if (null !== newProps.tail) {
                0 === newProps.tailExpiration && (newProps.tailExpiration = now() + 500);
                current = newProps.tail;
                newProps.rendering = current;
                newProps.tail = current.sibling;
                newProps.lastEffect = current$$1.lastEffect;
                current.sibling = null;
                newProps = suspenseStackCursor.current;
                newProps = type ? newProps & SubtreeSuspenseContextMask | ForceSuspenseFallback : newProps & SubtreeSuspenseContextMask;
                push(suspenseStackCursor, newProps, current$$1);
                current$$1 = current;
                break a;
              }

              break;

            case 20:
              break;

            default:
              throw ReactError(Error("Unknown unit of work tag. This error is likely caused by a bug in React. Please file an issue."));
          }

          current$$1 = null;
        }

        newProps = workInProgress;

        if (1 === renderExpirationTime || 1 !== newProps.childExpirationTime) {
          current = 0;

          for (renderExpirationTime$jscomp$0 = newProps.child; null !== renderExpirationTime$jscomp$0;) {
            type = renderExpirationTime$jscomp$0.expirationTime, _instance6 = renderExpirationTime$jscomp$0.childExpirationTime, type > current && (current = type), _instance6 > current && (current = _instance6), renderExpirationTime$jscomp$0 = renderExpirationTime$jscomp$0.sibling;
          }

          newProps.childExpirationTime = current;
        }

        if (null !== current$$1) return current$$1;
        null !== unitOfWork && 0 === (unitOfWork.effectTag & 1024) && (null === unitOfWork.firstEffect && (unitOfWork.firstEffect = workInProgress.firstEffect), null !== workInProgress.lastEffect && (null !== unitOfWork.lastEffect && (unitOfWork.lastEffect.nextEffect = workInProgress.firstEffect), unitOfWork.lastEffect = workInProgress.lastEffect), 1 < workInProgress.effectTag && (null !== unitOfWork.lastEffect ? unitOfWork.lastEffect.nextEffect = workInProgress : unitOfWork.firstEffect = workInProgress, unitOfWork.lastEffect = workInProgress));
      } else {
        current$$1 = unwindWork(workInProgress, renderExpirationTime);
        if (null !== current$$1) return current$$1.effectTag &= 1023, current$$1;
        null !== unitOfWork && (unitOfWork.firstEffect = unitOfWork.lastEffect = null, unitOfWork.effectTag |= 1024);
      }

      current$$1 = workInProgress.sibling;
      if (null !== current$$1) return current$$1;
      workInProgress = unitOfWork;
    } while (null !== workInProgress);

    workInProgressRootExitStatus === RootIncomplete && (workInProgressRootExitStatus = RootCompleted);
    return null;
  }

  function commitRoot(root) {
    var renderPriorityLevel = getCurrentPriorityLevel();
    runWithPriority(99, commitRootImpl.bind(null, root, renderPriorityLevel));
    null !== rootWithPendingPassiveEffects && scheduleCallback(97, function () {
      flushPassiveEffects();
      return null;
    });
    return null;
  }

  function commitRootImpl(root, renderPriorityLevel) {
    flushPassiveEffects();
    if ((executionContext & 48) !== NoContext) throw ReactError(Error("Should not already be working."));
    var finishedWork = root.finishedWork,
        expirationTime = root.finishedExpirationTime;
    if (null === finishedWork) return null;
    root.finishedWork = null;
    root.finishedExpirationTime = 0;
    if (finishedWork === root.current) throw ReactError(Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue."));
    root.callbackNode = null;
    root.callbackExpirationTime = 0;
    var updateExpirationTimeBeforeCommit = finishedWork.expirationTime,
        childExpirationTimeBeforeCommit = finishedWork.childExpirationTime;
    updateExpirationTimeBeforeCommit = childExpirationTimeBeforeCommit > updateExpirationTimeBeforeCommit ? childExpirationTimeBeforeCommit : updateExpirationTimeBeforeCommit;
    root.firstPendingTime = updateExpirationTimeBeforeCommit;
    updateExpirationTimeBeforeCommit < root.lastPendingTime && (root.lastPendingTime = updateExpirationTimeBeforeCommit);
    root === workInProgressRoot && (workInProgress = workInProgressRoot = null, renderExpirationTime = 0);
    1 < finishedWork.effectTag ? null !== finishedWork.lastEffect ? (finishedWork.lastEffect.nextEffect = finishedWork, updateExpirationTimeBeforeCommit = finishedWork.firstEffect) : updateExpirationTimeBeforeCommit = finishedWork : updateExpirationTimeBeforeCommit = finishedWork.firstEffect;

    if (null !== updateExpirationTimeBeforeCommit) {
      childExpirationTimeBeforeCommit = executionContext;
      executionContext |= CommitContext;
      ReactCurrentOwner$2.current = null;
      nextEffect = updateExpirationTimeBeforeCommit;

      do {
        try {
          for (; null !== nextEffect;) {
            if (0 !== (nextEffect.effectTag & 256)) {
              var current$$1 = nextEffect.alternate,
                  finishedWork$jscomp$0 = nextEffect;

              switch (finishedWork$jscomp$0.tag) {
                case 0:
                case 11:
                case 15:
                  commitHookEffectList(UnmountSnapshot, NoEffect$1, finishedWork$jscomp$0);
                  break;

                case 1:
                  if (finishedWork$jscomp$0.effectTag & 256 && null !== current$$1) {
                    var prevProps = current$$1.memoizedProps,
                        prevState = current$$1.memoizedState,
                        instance = finishedWork$jscomp$0.stateNode,
                        snapshot = instance.getSnapshotBeforeUpdate(finishedWork$jscomp$0.elementType === finishedWork$jscomp$0.type ? prevProps : resolveDefaultProps(finishedWork$jscomp$0.type, prevProps), prevState);
                    instance.__reactInternalSnapshotBeforeUpdate = snapshot;
                  }

                  break;

                case 3:
                case 5:
                case 6:
                case 4:
                case 17:
                  break;

                default:
                  throw ReactError(Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue."));
              }
            }

            nextEffect = nextEffect.nextEffect;
          }
        } catch (error) {
          if (null === nextEffect) throw ReactError(Error("Should be working on an effect."));
          captureCommitPhaseError(nextEffect, error);
          nextEffect = nextEffect.nextEffect;
        }
      } while (null !== nextEffect);

      nextEffect = updateExpirationTimeBeforeCommit;

      do {
        try {
          for (current$$1 = renderPriorityLevel; null !== nextEffect;) {
            var effectTag = nextEffect.effectTag;

            if (effectTag & 128) {
              var current$$1$jscomp$0 = nextEffect.alternate;

              if (null !== current$$1$jscomp$0) {
                var currentRef = current$$1$jscomp$0.ref;
                null !== currentRef && ("function" === typeof currentRef ? currentRef(null) : currentRef.current = null);
              }
            }

            switch (effectTag & 14) {
              case 2:
                commitPlacement(nextEffect);
                nextEffect.effectTag &= -3;
                break;

              case 6:
                commitPlacement(nextEffect);
                nextEffect.effectTag &= -3;
                commitWork(nextEffect.alternate, nextEffect);
                break;

              case 4:
                commitWork(nextEffect.alternate, nextEffect);
                break;

              case 8:
                prevProps = nextEffect, unmountHostComponents(prevProps, current$$1), detachFiber(prevProps);
            }

            nextEffect = nextEffect.nextEffect;
          }
        } catch (error) {
          if (null === nextEffect) throw ReactError(Error("Should be working on an effect."));
          captureCommitPhaseError(nextEffect, error);
          nextEffect = nextEffect.nextEffect;
        }
      } while (null !== nextEffect);

      root.current = finishedWork;
      nextEffect = updateExpirationTimeBeforeCommit;

      do {
        try {
          for (effectTag = expirationTime; null !== nextEffect;) {
            var effectTag$jscomp$0 = nextEffect.effectTag;

            if (effectTag$jscomp$0 & 36) {
              var current$$1$jscomp$1 = nextEffect.alternate;
              current$$1$jscomp$0 = nextEffect;
              currentRef = effectTag;

              switch (current$$1$jscomp$0.tag) {
                case 0:
                case 11:
                case 15:
                  commitHookEffectList(UnmountLayout, MountLayout, current$$1$jscomp$0);
                  break;

                case 1:
                  var instance$jscomp$0 = current$$1$jscomp$0.stateNode;
                  if (current$$1$jscomp$0.effectTag & 4) if (null === current$$1$jscomp$1) instance$jscomp$0.componentDidMount();else {
                    var prevProps$jscomp$0 = current$$1$jscomp$0.elementType === current$$1$jscomp$0.type ? current$$1$jscomp$1.memoizedProps : resolveDefaultProps(current$$1$jscomp$0.type, current$$1$jscomp$1.memoizedProps);
                    instance$jscomp$0.componentDidUpdate(prevProps$jscomp$0, current$$1$jscomp$1.memoizedState, instance$jscomp$0.__reactInternalSnapshotBeforeUpdate);
                  }
                  var updateQueue = current$$1$jscomp$0.updateQueue;
                  null !== updateQueue && commitUpdateQueue(current$$1$jscomp$0, updateQueue, instance$jscomp$0, currentRef);
                  break;

                case 3:
                  var _updateQueue = current$$1$jscomp$0.updateQueue;

                  if (null !== _updateQueue) {
                    current$$1 = null;
                    if (null !== current$$1$jscomp$0.child) switch (current$$1$jscomp$0.child.tag) {
                      case 5:
                        current$$1 = current$$1$jscomp$0.child.stateNode;
                        break;

                      case 1:
                        current$$1 = current$$1$jscomp$0.child.stateNode;
                    }
                    commitUpdateQueue(current$$1$jscomp$0, _updateQueue, current$$1, currentRef);
                  }

                  break;

                case 5:
                  break;

                case 6:
                  break;

                case 4:
                  break;

                case 12:
                  break;

                case 13:
                case 19:
                case 17:
                case 20:
                  break;

                default:
                  throw ReactError(Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue."));
              }
            }

            if (effectTag$jscomp$0 & 128) {
              var ref = nextEffect.ref;

              if (null !== ref) {
                var instance$jscomp$1 = nextEffect.stateNode;

                switch (nextEffect.tag) {
                  case 5:
                    var instanceToUse = instance$jscomp$1;
                    break;

                  default:
                    instanceToUse = instance$jscomp$1;
                }

                "function" === typeof ref ? ref(instanceToUse) : ref.current = instanceToUse;
              }
            }

            effectTag$jscomp$0 & 512 && (rootDoesHavePassiveEffects = true);
            nextEffect = nextEffect.nextEffect;
          }
        } catch (error) {
          if (null === nextEffect) throw ReactError(Error("Should be working on an effect."));
          captureCommitPhaseError(nextEffect, error);
          nextEffect = nextEffect.nextEffect;
        }
      } while (null !== nextEffect);

      nextEffect = null;
      requestPaint();
      executionContext = childExpirationTimeBeforeCommit;
    } else root.current = finishedWork;

    if (rootDoesHavePassiveEffects) rootDoesHavePassiveEffects = false, rootWithPendingPassiveEffects = root, pendingPassiveEffectsExpirationTime = expirationTime, pendingPassiveEffectsRenderPriority = renderPriorityLevel;else for (nextEffect = updateExpirationTimeBeforeCommit; null !== nextEffect;) {
      renderPriorityLevel = nextEffect.nextEffect, nextEffect.nextEffect = null, nextEffect = renderPriorityLevel;
    }
    renderPriorityLevel = root.firstPendingTime;
    0 !== renderPriorityLevel ? (effectTag$jscomp$0 = requestCurrentTime(), effectTag$jscomp$0 = inferPriorityFromExpirationTime(effectTag$jscomp$0, renderPriorityLevel), scheduleCallbackForRoot(root, effectTag$jscomp$0, renderPriorityLevel)) : legacyErrorBoundariesThatAlreadyFailed = null;
    "function" === typeof onCommitFiberRoot && onCommitFiberRoot(finishedWork.stateNode, expirationTime);
    1073741823 === renderPriorityLevel ? root === rootWithNestedUpdates ? nestedUpdateCount++ : (nestedUpdateCount = 0, rootWithNestedUpdates = root) : nestedUpdateCount = 0;
    if (hasUncaughtError) throw hasUncaughtError = false, root = firstUncaughtError, firstUncaughtError = null, root;
    if ((executionContext & LegacyUnbatchedContext) !== NoContext) return null;
    flushSyncCallbackQueue();
    return null;
  }

  function flushPassiveEffects() {
    if (null === rootWithPendingPassiveEffects) return false;
    var root = rootWithPendingPassiveEffects,
        expirationTime = pendingPassiveEffectsExpirationTime,
        renderPriorityLevel = pendingPassiveEffectsRenderPriority;
    rootWithPendingPassiveEffects = null;
    pendingPassiveEffectsExpirationTime = 0;
    pendingPassiveEffectsRenderPriority = 90;
    return runWithPriority(97 < renderPriorityLevel ? 97 : renderPriorityLevel, flushPassiveEffectsImpl.bind(null, root, expirationTime));
  }

  function flushPassiveEffectsImpl(root) {
    if ((executionContext & 48) !== NoContext) throw ReactError(Error("Cannot flush passive effects while already rendering."));
    var prevExecutionContext = executionContext;
    executionContext |= CommitContext;

    for (root = root.current.firstEffect; null !== root;) {
      try {
        var finishedWork = root;
        if (0 !== (finishedWork.effectTag & 512)) switch (finishedWork.tag) {
          case 0:
          case 11:
          case 15:
            commitHookEffectList(UnmountPassive, NoEffect$1, finishedWork), commitHookEffectList(NoEffect$1, MountPassive, finishedWork);
        }
      } catch (error) {
        if (null === root) throw ReactError(Error("Should be working on an effect."));
        captureCommitPhaseError(root, error);
      }

      finishedWork = root.nextEffect;
      root.nextEffect = null;
      root = finishedWork;
    }

    executionContext = prevExecutionContext;
    flushSyncCallbackQueue();
    return true;
  }

  function captureCommitPhaseErrorOnRoot(rootFiber, sourceFiber, error) {
    sourceFiber = createCapturedValue(error, sourceFiber);
    sourceFiber = createRootErrorUpdate(rootFiber, sourceFiber, 1073741823);
    enqueueUpdate(rootFiber, sourceFiber);
    rootFiber = markUpdateTimeFromFiberToRoot(rootFiber, 1073741823);
    null !== rootFiber && scheduleCallbackForRoot(rootFiber, 99, 1073741823);
  }

  function captureCommitPhaseError(sourceFiber, error) {
    if (3 === sourceFiber.tag) captureCommitPhaseErrorOnRoot(sourceFiber, sourceFiber, error);else for (var fiber = sourceFiber.return; null !== fiber;) {
      if (3 === fiber.tag) {
        captureCommitPhaseErrorOnRoot(fiber, sourceFiber, error);
        break;
      } else if (1 === fiber.tag) {
        var instance = fiber.stateNode;

        if ("function" === typeof fiber.type.getDerivedStateFromError || "function" === typeof instance.componentDidCatch && (null === legacyErrorBoundariesThatAlreadyFailed || !legacyErrorBoundariesThatAlreadyFailed.has(instance))) {
          sourceFiber = createCapturedValue(error, sourceFiber);
          sourceFiber = createClassErrorUpdate(fiber, sourceFiber, 1073741823);
          enqueueUpdate(fiber, sourceFiber);
          fiber = markUpdateTimeFromFiberToRoot(fiber, 1073741823);
          null !== fiber && scheduleCallbackForRoot(fiber, 99, 1073741823);
          break;
        }
      }

      fiber = fiber.return;
    }
  }

  function pingSuspendedRoot(root, thenable, suspendedTime) {
    var pingCache = root.pingCache;
    null !== pingCache && pingCache.delete(thenable);
    workInProgressRoot === root && renderExpirationTime === suspendedTime ? workInProgressRootExitStatus === RootSuspendedWithDelay || workInProgressRootExitStatus === RootSuspended && 1073741823 === workInProgressRootLatestProcessedExpirationTime && now() - globalMostRecentFallbackTime < FALLBACK_THROTTLE_MS ? prepareFreshStack(root, renderExpirationTime) : workInProgressRootHasPendingPing = true : root.lastPendingTime < suspendedTime || (thenable = root.pingTime, 0 !== thenable && thenable < suspendedTime || (root.pingTime = suspendedTime, root.finishedExpirationTime === suspendedTime && (root.finishedExpirationTime = 0, root.finishedWork = null), thenable = requestCurrentTime(), thenable = inferPriorityFromExpirationTime(thenable, suspendedTime), scheduleCallbackForRoot(root, thenable, suspendedTime)));
  }

  function resolveRetryThenable(boundaryFiber, thenable) {
    var retryCache = boundaryFiber.stateNode;
    null !== retryCache && retryCache.delete(thenable);
    retryCache = requestCurrentTime();
    thenable = computeExpirationForFiber(retryCache, boundaryFiber, null);
    retryCache = inferPriorityFromExpirationTime(retryCache, thenable);
    boundaryFiber = markUpdateTimeFromFiberToRoot(boundaryFiber, thenable);
    null !== boundaryFiber && scheduleCallbackForRoot(boundaryFiber, retryCache, thenable);
  }

  var beginWork$$1 = undefined;

  beginWork$$1 = function beginWork$$1(current$$1, workInProgress, renderExpirationTime) {
    var updateExpirationTime = workInProgress.expirationTime;
    if (null !== current$$1) {
      if (current$$1.memoizedProps !== workInProgress.pendingProps || didPerformWorkStackCursor.current) didReceiveUpdate = true;else {
        if (updateExpirationTime < renderExpirationTime) {
          didReceiveUpdate = false;

          switch (workInProgress.tag) {
            case 3:
              pushHostRootContext(workInProgress);
              break;

            case 5:
              pushHostContext(workInProgress);
              break;

            case 1:
              isContextProvider(workInProgress.type) && pushContextProvider(workInProgress);
              break;

            case 4:
              pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
              break;

            case 10:
              pushProvider(workInProgress, workInProgress.memoizedProps.value);
              break;

            case 13:
              if (null !== workInProgress.memoizedState) {
                updateExpirationTime = workInProgress.child.childExpirationTime;
                if (0 !== updateExpirationTime && updateExpirationTime >= renderExpirationTime) return updateSuspenseComponent(current$$1, workInProgress, renderExpirationTime);
                push(suspenseStackCursor, suspenseStackCursor.current & SubtreeSuspenseContextMask, workInProgress);
                workInProgress = bailoutOnAlreadyFinishedWork(current$$1, workInProgress, renderExpirationTime);
                return null !== workInProgress ? workInProgress.sibling : null;
              }

              push(suspenseStackCursor, suspenseStackCursor.current & SubtreeSuspenseContextMask, workInProgress);
              break;

            case 19:
              updateExpirationTime = workInProgress.childExpirationTime >= renderExpirationTime;

              if (0 !== (current$$1.effectTag & 64)) {
                if (updateExpirationTime) return updateSuspenseListComponent(current$$1, workInProgress, renderExpirationTime);
                workInProgress.effectTag |= 64;
              }

              var renderState = workInProgress.memoizedState;
              null !== renderState && (renderState.rendering = null, renderState.tail = null);
              push(suspenseStackCursor, suspenseStackCursor.current, workInProgress);
              if (!updateExpirationTime) return null;
          }

          return bailoutOnAlreadyFinishedWork(current$$1, workInProgress, renderExpirationTime);
        }
      }
    } else didReceiveUpdate = false;
    workInProgress.expirationTime = 0;

    switch (workInProgress.tag) {
      case 2:
        updateExpirationTime = workInProgress.type;
        null !== current$$1 && (current$$1.alternate = null, workInProgress.alternate = null, workInProgress.effectTag |= 2);
        current$$1 = workInProgress.pendingProps;
        renderState = getMaskedContext(workInProgress, contextStackCursor.current);
        prepareToReadContext(workInProgress, renderExpirationTime);
        renderState = renderWithHooks(null, workInProgress, updateExpirationTime, current$$1, renderState, renderExpirationTime);
        workInProgress.effectTag |= 1;

        if ("object" === typeof renderState && null !== renderState && "function" === typeof renderState.render && undefined === renderState.$$typeof) {
          workInProgress.tag = 1;
          resetHooks();

          if (isContextProvider(updateExpirationTime)) {
            var hasContext = true;
            pushContextProvider(workInProgress);
          } else hasContext = false;

          workInProgress.memoizedState = null !== renderState.state && undefined !== renderState.state ? renderState.state : null;
          var getDerivedStateFromProps = updateExpirationTime.getDerivedStateFromProps;
          "function" === typeof getDerivedStateFromProps && applyDerivedStateFromProps(workInProgress, updateExpirationTime, getDerivedStateFromProps, current$$1);
          renderState.updater = classComponentUpdater;
          workInProgress.stateNode = renderState;
          renderState._reactInternalFiber = workInProgress;
          mountClassInstance(workInProgress, updateExpirationTime, current$$1, renderExpirationTime);
          workInProgress = finishClassComponent(null, workInProgress, updateExpirationTime, true, hasContext, renderExpirationTime);
        } else workInProgress.tag = 0, reconcileChildren(null, workInProgress, renderState, renderExpirationTime), workInProgress = workInProgress.child;

        return workInProgress;

      case 16:
        renderState = workInProgress.elementType;
        null !== current$$1 && (current$$1.alternate = null, workInProgress.alternate = null, workInProgress.effectTag |= 2);
        current$$1 = workInProgress.pendingProps;
        renderState = readLazyComponentType(renderState);
        workInProgress.type = renderState;
        hasContext = workInProgress.tag = resolveLazyComponentTag(renderState);
        current$$1 = resolveDefaultProps(renderState, current$$1);

        switch (hasContext) {
          case 0:
            workInProgress = updateFunctionComponent(null, workInProgress, renderState, current$$1, renderExpirationTime);
            break;

          case 1:
            workInProgress = updateClassComponent(null, workInProgress, renderState, current$$1, renderExpirationTime);
            break;

          case 11:
            workInProgress = updateForwardRef(null, workInProgress, renderState, current$$1, renderExpirationTime);
            break;

          case 14:
            workInProgress = updateMemoComponent(null, workInProgress, renderState, resolveDefaultProps(renderState.type, current$$1), updateExpirationTime, renderExpirationTime);
            break;

          default:
            throw ReactError(Error("Element type is invalid. Received a promise that resolves to: " + renderState + ". Lazy element type must resolve to a class or function."));
        }

        return workInProgress;

      case 0:
        return updateExpirationTime = workInProgress.type, renderState = workInProgress.pendingProps, renderState = workInProgress.elementType === updateExpirationTime ? renderState : resolveDefaultProps(updateExpirationTime, renderState), updateFunctionComponent(current$$1, workInProgress, updateExpirationTime, renderState, renderExpirationTime);

      case 1:
        return updateExpirationTime = workInProgress.type, renderState = workInProgress.pendingProps, renderState = workInProgress.elementType === updateExpirationTime ? renderState : resolveDefaultProps(updateExpirationTime, renderState), updateClassComponent(current$$1, workInProgress, updateExpirationTime, renderState, renderExpirationTime);

      case 3:
        pushHostRootContext(workInProgress);
        updateExpirationTime = workInProgress.updateQueue;
        if (null === updateExpirationTime) throw ReactError(Error("If the root does not have an updateQueue, we should have already bailed out. This error is likely caused by a bug in React. Please file an issue."));
        renderState = workInProgress.memoizedState;
        renderState = null !== renderState ? renderState.element : null;
        processUpdateQueue(workInProgress, updateExpirationTime, workInProgress.pendingProps, null, renderExpirationTime);
        updateExpirationTime = workInProgress.memoizedState.element;
        updateExpirationTime === renderState ? workInProgress = bailoutOnAlreadyFinishedWork(current$$1, workInProgress, renderExpirationTime) : (reconcileChildren(current$$1, workInProgress, updateExpirationTime, renderExpirationTime), workInProgress = workInProgress.child);
        return workInProgress;

      case 5:
        return pushHostContext(workInProgress), null === current$$1 && tryToClaimNextHydratableInstance(workInProgress), updateExpirationTime = workInProgress.pendingProps.children, markRef(current$$1, workInProgress), reconcileChildren(current$$1, workInProgress, updateExpirationTime, renderExpirationTime), workInProgress.child;

      case 6:
        return null === current$$1 && tryToClaimNextHydratableInstance(workInProgress), null;

      case 13:
        return updateSuspenseComponent(current$$1, workInProgress, renderExpirationTime);

      case 4:
        return pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo), updateExpirationTime = workInProgress.pendingProps, null === current$$1 ? workInProgress.child = reconcileChildFibers(workInProgress, null, updateExpirationTime, renderExpirationTime) : reconcileChildren(current$$1, workInProgress, updateExpirationTime, renderExpirationTime), workInProgress.child;

      case 11:
        return updateExpirationTime = workInProgress.type, renderState = workInProgress.pendingProps, renderState = workInProgress.elementType === updateExpirationTime ? renderState : resolveDefaultProps(updateExpirationTime, renderState), updateForwardRef(current$$1, workInProgress, updateExpirationTime, renderState, renderExpirationTime);

      case 7:
        return reconcileChildren(current$$1, workInProgress, workInProgress.pendingProps, renderExpirationTime), workInProgress.child;

      case 8:
        return reconcileChildren(current$$1, workInProgress, workInProgress.pendingProps.children, renderExpirationTime), workInProgress.child;

      case 12:
        return reconcileChildren(current$$1, workInProgress, workInProgress.pendingProps.children, renderExpirationTime), workInProgress.child;

      case 10:
        a: {
          updateExpirationTime = workInProgress.type._context;
          renderState = workInProgress.pendingProps;
          getDerivedStateFromProps = workInProgress.memoizedProps;
          hasContext = renderState.value;
          pushProvider(workInProgress, hasContext);

          if (null !== getDerivedStateFromProps) {
            var oldValue = getDerivedStateFromProps.value;
            hasContext = is(oldValue, hasContext) ? 0 : ("function" === typeof updateExpirationTime._calculateChangedBits ? updateExpirationTime._calculateChangedBits(oldValue, hasContext) : 1073741823) | 0;

            if (0 === hasContext) {
              if (getDerivedStateFromProps.children === renderState.children && !didPerformWorkStackCursor.current) {
                workInProgress = bailoutOnAlreadyFinishedWork(current$$1, workInProgress, renderExpirationTime);
                break a;
              }
            } else for (oldValue = workInProgress.child, null !== oldValue && (oldValue.return = workInProgress); null !== oldValue;) {
              var list = oldValue.dependencies;

              if (null !== list) {
                getDerivedStateFromProps = oldValue.child;

                for (var dependency = list.firstContext; null !== dependency;) {
                  if (dependency.context === updateExpirationTime && 0 !== (dependency.observedBits & hasContext)) {
                    1 === oldValue.tag && (dependency = createUpdate(renderExpirationTime, null), dependency.tag = 2, enqueueUpdate(oldValue, dependency));
                    oldValue.expirationTime < renderExpirationTime && (oldValue.expirationTime = renderExpirationTime);
                    dependency = oldValue.alternate;
                    null !== dependency && dependency.expirationTime < renderExpirationTime && (dependency.expirationTime = renderExpirationTime);
                    scheduleWorkOnParentPath(oldValue.return, renderExpirationTime);
                    list.expirationTime < renderExpirationTime && (list.expirationTime = renderExpirationTime);
                    break;
                  }

                  dependency = dependency.next;
                }
              } else getDerivedStateFromProps = 10 === oldValue.tag ? oldValue.type === workInProgress.type ? null : oldValue.child : oldValue.child;

              if (null !== getDerivedStateFromProps) getDerivedStateFromProps.return = oldValue;else for (getDerivedStateFromProps = oldValue; null !== getDerivedStateFromProps;) {
                if (getDerivedStateFromProps === workInProgress) {
                  getDerivedStateFromProps = null;
                  break;
                }

                oldValue = getDerivedStateFromProps.sibling;

                if (null !== oldValue) {
                  oldValue.return = getDerivedStateFromProps.return;
                  getDerivedStateFromProps = oldValue;
                  break;
                }

                getDerivedStateFromProps = getDerivedStateFromProps.return;
              }
              oldValue = getDerivedStateFromProps;
            }
          }

          reconcileChildren(current$$1, workInProgress, renderState.children, renderExpirationTime);
          workInProgress = workInProgress.child;
        }

        return workInProgress;

      case 9:
        return renderState = workInProgress.type, hasContext = workInProgress.pendingProps, updateExpirationTime = hasContext.children, prepareToReadContext(workInProgress, renderExpirationTime), renderState = readContext(renderState, hasContext.unstable_observedBits), updateExpirationTime = updateExpirationTime(renderState), workInProgress.effectTag |= 1, reconcileChildren(current$$1, workInProgress, updateExpirationTime, renderExpirationTime), workInProgress.child;

      case 14:
        return renderState = workInProgress.type, hasContext = resolveDefaultProps(renderState, workInProgress.pendingProps), hasContext = resolveDefaultProps(renderState.type, hasContext), updateMemoComponent(current$$1, workInProgress, renderState, hasContext, updateExpirationTime, renderExpirationTime);

      case 15:
        return updateSimpleMemoComponent(current$$1, workInProgress, workInProgress.type, workInProgress.pendingProps, updateExpirationTime, renderExpirationTime);

      case 17:
        return updateExpirationTime = workInProgress.type, renderState = workInProgress.pendingProps, renderState = workInProgress.elementType === updateExpirationTime ? renderState : resolveDefaultProps(updateExpirationTime, renderState), null !== current$$1 && (current$$1.alternate = null, workInProgress.alternate = null, workInProgress.effectTag |= 2), workInProgress.tag = 1, isContextProvider(updateExpirationTime) ? (current$$1 = true, pushContextProvider(workInProgress)) : current$$1 = false, prepareToReadContext(workInProgress, renderExpirationTime), constructClassInstance(workInProgress, updateExpirationTime, renderState, renderExpirationTime), mountClassInstance(workInProgress, updateExpirationTime, renderState, renderExpirationTime), finishClassComponent(null, workInProgress, updateExpirationTime, true, current$$1, renderExpirationTime);

      case 19:
        return updateSuspenseListComponent(current$$1, workInProgress, renderExpirationTime);
    }

    throw ReactError(Error("Unknown unit of work tag. This error is likely caused by a bug in React. Please file an issue."));
  };

  var onCommitFiberRoot = null,
      onCommitFiberUnmount = null;

  function injectInternals(internals) {
    if ("undefined" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) return false;
    var hook = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (hook.isDisabled || !hook.supportsFiber) return true;

    try {
      var rendererID = hook.inject(internals);

      onCommitFiberRoot = function onCommitFiberRoot(root) {
        try {
          hook.onCommitFiberRoot(rendererID, root, undefined, 64 === (root.current.effectTag & 64));
        } catch (err) {}
      };

      onCommitFiberUnmount = function onCommitFiberUnmount(fiber) {
        try {
          hook.onCommitFiberUnmount(rendererID, fiber);
        } catch (err) {}
      };
    } catch (err) {}

    return true;
  }

  function FiberNode(tag, pendingProps, key, mode) {
    this.tag = tag;
    this.key = key;
    this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
    this.index = 0;
    this.ref = null;
    this.pendingProps = pendingProps;
    this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
    this.mode = mode;
    this.effectTag = 0;
    this.lastEffect = this.firstEffect = this.nextEffect = null;
    this.childExpirationTime = this.expirationTime = 0;
    this.alternate = null;
  }

  function createFiber(tag, pendingProps, key, mode) {
    return new FiberNode(tag, pendingProps, key, mode);
  }

  function shouldConstruct(Component) {
    Component = Component.prototype;
    return !(!Component || !Component.isReactComponent);
  }

  function resolveLazyComponentTag(Component) {
    if ("function" === typeof Component) return shouldConstruct(Component) ? 1 : 0;

    if (undefined !== Component && null !== Component) {
      Component = Component.$$typeof;
      if (Component === REACT_FORWARD_REF_TYPE) return 11;
      if (Component === REACT_MEMO_TYPE) return 14;
    }

    return 2;
  }

  function createWorkInProgress(current, pendingProps) {
    var workInProgress = current.alternate;
    null === workInProgress ? (workInProgress = createFiber(current.tag, pendingProps, current.key, current.mode), workInProgress.elementType = current.elementType, workInProgress.type = current.type, workInProgress.stateNode = current.stateNode, workInProgress.alternate = current, current.alternate = workInProgress) : (workInProgress.pendingProps = pendingProps, workInProgress.effectTag = 0, workInProgress.nextEffect = null, workInProgress.firstEffect = null, workInProgress.lastEffect = null);
    workInProgress.childExpirationTime = current.childExpirationTime;
    workInProgress.expirationTime = current.expirationTime;
    workInProgress.child = current.child;
    workInProgress.memoizedProps = current.memoizedProps;
    workInProgress.memoizedState = current.memoizedState;
    workInProgress.updateQueue = current.updateQueue;
    pendingProps = current.dependencies;
    workInProgress.dependencies = null === pendingProps ? null : {
      expirationTime: pendingProps.expirationTime,
      firstContext: pendingProps.firstContext,
      responders: pendingProps.responders
    };
    workInProgress.sibling = current.sibling;
    workInProgress.index = current.index;
    workInProgress.ref = current.ref;
    return workInProgress;
  }

  function createFiberFromTypeAndProps(type, key, pendingProps, owner, mode, expirationTime) {
    var fiberTag = 2;
    owner = type;
    if ("function" === typeof type) shouldConstruct(type) && (fiberTag = 1);else if ("string" === typeof type) fiberTag = 5;else a: switch (type) {
      case REACT_FRAGMENT_TYPE:
        return createFiberFromFragment(pendingProps.children, mode, expirationTime, key);

      case REACT_CONCURRENT_MODE_TYPE:
        fiberTag = 8;
        mode |= 7;
        break;

      case REACT_STRICT_MODE_TYPE:
        fiberTag = 8;
        mode |= 1;
        break;

      case REACT_PROFILER_TYPE:
        return type = createFiber(12, pendingProps, key, mode | 8), type.elementType = REACT_PROFILER_TYPE, type.type = REACT_PROFILER_TYPE, type.expirationTime = expirationTime, type;

      case REACT_SUSPENSE_TYPE:
        return type = createFiber(13, pendingProps, key, mode), type.type = REACT_SUSPENSE_TYPE, type.elementType = REACT_SUSPENSE_TYPE, type.expirationTime = expirationTime, type;

      case REACT_SUSPENSE_LIST_TYPE:
        return type = createFiber(19, pendingProps, key, mode), type.elementType = REACT_SUSPENSE_LIST_TYPE, type.expirationTime = expirationTime, type;

      default:
        if ("object" === typeof type && null !== type) switch (type.$$typeof) {
          case REACT_PROVIDER_TYPE:
            fiberTag = 10;
            break a;

          case REACT_CONTEXT_TYPE:
            fiberTag = 9;
            break a;

          case REACT_FORWARD_REF_TYPE:
            fiberTag = 11;
            break a;

          case REACT_MEMO_TYPE:
            fiberTag = 14;
            break a;

          case REACT_LAZY_TYPE:
            fiberTag = 16;
            owner = null;
            break a;
        }
        throw ReactError(Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + (null == type ? type : typeof type) + "."));
    }
    key = createFiber(fiberTag, pendingProps, key, mode);
    key.elementType = type;
    key.type = owner;
    key.expirationTime = expirationTime;
    return key;
  }

  function createFiberFromFragment(elements, mode, expirationTime, key) {
    elements = createFiber(7, elements, key, mode);
    elements.expirationTime = expirationTime;
    return elements;
  }

  function createFiberFromText(content, mode, expirationTime) {
    content = createFiber(6, content, null, mode);
    content.expirationTime = expirationTime;
    return content;
  }

  function createFiberFromPortal(portal, mode, expirationTime) {
    mode = createFiber(4, null !== portal.children ? portal.children : [], portal.key, mode);
    mode.expirationTime = expirationTime;
    mode.stateNode = {
      containerInfo: portal.containerInfo,
      pendingChildren: null,
      implementation: portal.implementation
    };
    return mode;
  }

  function FiberRootNode(containerInfo, tag, hydrate) {
    this.tag = tag;
    this.current = null;
    this.containerInfo = containerInfo;
    this.pingCache = this.pendingChildren = null;
    this.finishedExpirationTime = 0;
    this.finishedWork = null;
    this.timeoutHandle = -1;
    this.pendingContext = this.context = null;
    this.hydrate = hydrate;
    this.callbackNode = this.firstBatch = null;
    this.pingTime = this.lastPendingTime = this.firstPendingTime = this.callbackExpirationTime = 0;
  }

  function findHostInstance(component) {
    var fiber = component._reactInternalFiber;

    if (undefined === fiber) {
      if ("function" === typeof component.render) throw ReactError(Error("Unable to find node on an unmounted component."));
      throw ReactError(Error("Argument appears to not be a ReactComponent. Keys: " + Object.keys(component)));
    }

    component = findCurrentHostFiber(fiber);
    return null === component ? null : component.stateNode;
  }

  function updateContainer(element, container, parentComponent, callback) {
    var current$$1 = container.current,
        currentTime = requestCurrentTime(),
        suspenseConfig = ReactCurrentBatchConfig.suspense;
    current$$1 = computeExpirationForFiber(currentTime, current$$1, suspenseConfig);
    currentTime = container.current;

    a: if (parentComponent) {
      parentComponent = parentComponent._reactInternalFiber;

      b: {
        if (2 !== isFiberMountedImpl(parentComponent) || 1 !== parentComponent.tag) throw ReactError(Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue."));
        var parentContext = parentComponent;

        do {
          switch (parentContext.tag) {
            case 3:
              parentContext = parentContext.stateNode.context;
              break b;

            case 1:
              if (isContextProvider(parentContext.type)) {
                parentContext = parentContext.stateNode.__reactInternalMemoizedMergedChildContext;
                break b;
              }

          }

          parentContext = parentContext.return;
        } while (null !== parentContext);

        throw ReactError(Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue."));
      }

      if (1 === parentComponent.tag) {
        var Component = parentComponent.type;

        if (isContextProvider(Component)) {
          parentComponent = processChildContext(parentComponent, Component, parentContext);
          break a;
        }
      }

      parentComponent = parentContext;
    } else parentComponent = emptyContextObject;

    null === container.context ? container.context = parentComponent : container.pendingContext = parentComponent;
    container = callback;
    suspenseConfig = createUpdate(current$$1, suspenseConfig);
    suspenseConfig.payload = {
      element: element
    };
    container = undefined === container ? null : container;
    null !== container && (suspenseConfig.callback = container);
    enqueueUpdate(currentTime, suspenseConfig);
    scheduleUpdateOnFiber(currentTime, current$$1);
    return current$$1;
  }

  function _createPortal(children, containerInfo, implementation) {
    var key = 3 < arguments.length && undefined !== arguments[3] ? arguments[3] : null;
    return {
      $$typeof: REACT_PORTAL_TYPE,
      key: null == key ? null : "" + key,
      children: children,
      containerInfo: containerInfo,
      implementation: implementation
    };
  }

  function _inherits(subClass, superClass) {
    if ("function" !== typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
  }

  var getInspectorDataForViewTag = undefined;

  getInspectorDataForViewTag = function getInspectorDataForViewTag() {
    throw ReactError(Error("getInspectorDataForViewTag() is not available in production"));
  };

  function findNodeHandle(componentOrHandle) {
    if (null == componentOrHandle) return null;
    if ("number" === typeof componentOrHandle) return componentOrHandle;
    if (componentOrHandle._nativeTag) return componentOrHandle._nativeTag;
    if (componentOrHandle.canonical && componentOrHandle.canonical._nativeTag) return componentOrHandle.canonical._nativeTag;
    componentOrHandle = findHostInstance(componentOrHandle);
    return null == componentOrHandle ? componentOrHandle : componentOrHandle.canonical ? componentOrHandle.canonical._nativeTag : componentOrHandle._nativeTag;
  }

  batchedUpdatesImpl = function batchedUpdatesImpl(fn, a) {
    var prevExecutionContext = executionContext;
    executionContext |= 1;

    try {
      return fn(a);
    } finally {
      executionContext = prevExecutionContext, executionContext === NoContext && flushSyncCallbackQueue();
    }
  };

  flushDiscreteUpdatesImpl = function flushDiscreteUpdatesImpl() {
    (executionContext & 49) === NoContext && (flushPendingDiscreteUpdates(), flushPassiveEffects());
  };

  var roots = new Map(),
      ReactNativeRenderer = {
    NativeComponent: function (findNodeHandle, findHostInstance) {
      return function (_React$Component) {
        function ReactNativeComponent() {
          if (!(this instanceof ReactNativeComponent)) throw new TypeError("Cannot call a class as a function");

          var call = _React$Component.apply(this, arguments);

          if (!this) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return !call || "object" !== typeof call && "function" !== typeof call ? this : call;
        }

        _inherits(ReactNativeComponent, _React$Component);

        ReactNativeComponent.prototype.blur = function () {
          ReactNativePrivateInterface.TextInputState.blurTextInput(findNodeHandle(this));
        };

        ReactNativeComponent.prototype.focus = function () {
          ReactNativePrivateInterface.TextInputState.focusTextInput(findNodeHandle(this));
        };

        ReactNativeComponent.prototype.measure = function (callback) {
          var maybeInstance = undefined;

          try {
            maybeInstance = findHostInstance(this);
          } catch (error) {}

          null != maybeInstance && (maybeInstance.canonical ? nativeFabricUIManager.measure(maybeInstance.node, mountSafeCallback_NOT_REALLY_SAFE(this, callback)) : ReactNativePrivateInterface.UIManager.measure(findNodeHandle(this), mountSafeCallback_NOT_REALLY_SAFE(this, callback)));
        };

        ReactNativeComponent.prototype.measureInWindow = function (callback) {
          var maybeInstance = undefined;

          try {
            maybeInstance = findHostInstance(this);
          } catch (error) {}

          null != maybeInstance && (maybeInstance.canonical ? nativeFabricUIManager.measureInWindow(maybeInstance.node, mountSafeCallback_NOT_REALLY_SAFE(this, callback)) : ReactNativePrivateInterface.UIManager.measureInWindow(findNodeHandle(this), mountSafeCallback_NOT_REALLY_SAFE(this, callback)));
        };

        ReactNativeComponent.prototype.measureLayout = function (relativeToNativeNode, onSuccess, onFail) {
          var maybeInstance = undefined;

          try {
            maybeInstance = findHostInstance(this);
          } catch (error) {}

          null == maybeInstance || maybeInstance.canonical || (maybeInstance = undefined, "number" === typeof relativeToNativeNode ? maybeInstance = relativeToNativeNode : relativeToNativeNode._nativeTag && (maybeInstance = relativeToNativeNode._nativeTag), null != maybeInstance && ReactNativePrivateInterface.UIManager.measureLayout(findNodeHandle(this), maybeInstance, mountSafeCallback_NOT_REALLY_SAFE(this, onFail), mountSafeCallback_NOT_REALLY_SAFE(this, onSuccess)));
        };

        ReactNativeComponent.prototype.setNativeProps = function (nativeProps) {
          var maybeInstance = undefined;

          try {
            maybeInstance = findHostInstance(this);
          } catch (error) {}

          if (null != maybeInstance && !maybeInstance.canonical) {
            var nativeTag = maybeInstance._nativeTag || maybeInstance.canonical._nativeTag;
            maybeInstance = maybeInstance.viewConfig || maybeInstance.canonical.viewConfig;
            nativeProps = diffProperties(null, emptyObject, nativeProps, maybeInstance.validAttributes);
            null != nativeProps && ReactNativePrivateInterface.UIManager.updateView(nativeTag, maybeInstance.uiViewClassName, nativeProps);
          }
        };

        return ReactNativeComponent;
      }(React.Component);
    }(findNodeHandle, findHostInstance),
    findNodeHandle: findNodeHandle,
    dispatchCommand: function dispatchCommand(handle, command, args) {
      null != handle._nativeTag && ReactNativePrivateInterface.UIManager.dispatchViewManagerCommand(handle._nativeTag, command, args);
    },
    setNativeProps: function setNativeProps(handle, nativeProps) {
      null != handle._nativeTag && (nativeProps = diffProperties(null, emptyObject, nativeProps, handle.viewConfig.validAttributes), null != nativeProps && ReactNativePrivateInterface.UIManager.updateView(handle._nativeTag, handle.viewConfig.uiViewClassName, nativeProps));
    },
    render: function render(element, containerTag, callback) {
      var root = roots.get(containerTag);

      if (!root) {
        root = new FiberRootNode(containerTag, 0, false);
        var uninitializedFiber = createFiber(3, null, null, 0);
        root.current = uninitializedFiber;
        uninitializedFiber.stateNode = root;
        roots.set(containerTag, root);
      }

      updateContainer(element, root, null, callback);

      a: if (element = root.current, element.child) switch (element.child.tag) {
        case 5:
          element = element.child.stateNode;
          break a;

        default:
          element = element.child.stateNode;
      } else element = null;

      return element;
    },
    unmountComponentAtNode: function unmountComponentAtNode(containerTag) {
      var root = roots.get(containerTag);
      root && updateContainer(null, root, null, function () {
        roots.delete(containerTag);
      });
    },
    unmountComponentAtNodeAndRemoveContainer: function unmountComponentAtNodeAndRemoveContainer(containerTag) {
      ReactNativeRenderer.unmountComponentAtNode(containerTag);
      ReactNativePrivateInterface.UIManager.removeRootView(containerTag);
    },
    createPortal: function createPortal(children, containerTag) {
      return _createPortal(children, containerTag, null, 2 < arguments.length && undefined !== arguments[2] ? arguments[2] : null);
    },
    unstable_batchedUpdates: batchedUpdates,
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
      NativeMethodsMixin: function (findNodeHandle, findHostInstance) {
        return {
          measure: function measure(callback) {
            var maybeInstance = undefined;

            try {
              maybeInstance = findHostInstance(this);
            } catch (error) {}

            null != maybeInstance && (maybeInstance.canonical ? nativeFabricUIManager.measure(maybeInstance.node, mountSafeCallback_NOT_REALLY_SAFE(this, callback)) : ReactNativePrivateInterface.UIManager.measure(findNodeHandle(this), mountSafeCallback_NOT_REALLY_SAFE(this, callback)));
          },
          measureInWindow: function measureInWindow(callback) {
            var maybeInstance = undefined;

            try {
              maybeInstance = findHostInstance(this);
            } catch (error) {}

            null != maybeInstance && (maybeInstance.canonical ? nativeFabricUIManager.measureInWindow(maybeInstance.node, mountSafeCallback_NOT_REALLY_SAFE(this, callback)) : ReactNativePrivateInterface.UIManager.measureInWindow(findNodeHandle(this), mountSafeCallback_NOT_REALLY_SAFE(this, callback)));
          },
          measureLayout: function measureLayout(relativeToNativeNode, onSuccess, onFail) {
            var maybeInstance = undefined;

            try {
              maybeInstance = findHostInstance(this);
            } catch (error) {}

            null == maybeInstance || maybeInstance.canonical || (maybeInstance = undefined, "number" === typeof relativeToNativeNode ? maybeInstance = relativeToNativeNode : relativeToNativeNode._nativeTag && (maybeInstance = relativeToNativeNode._nativeTag), null != maybeInstance && ReactNativePrivateInterface.UIManager.measureLayout(findNodeHandle(this), maybeInstance, mountSafeCallback_NOT_REALLY_SAFE(this, onFail), mountSafeCallback_NOT_REALLY_SAFE(this, onSuccess)));
          },
          setNativeProps: function setNativeProps(nativeProps) {
            var maybeInstance = undefined;

            try {
              maybeInstance = findHostInstance(this);
            } catch (error) {}

            if (null != maybeInstance && !maybeInstance.canonical) {
              var nativeTag = maybeInstance._nativeTag || maybeInstance.canonical._nativeTag;
              maybeInstance = maybeInstance.viewConfig || maybeInstance.canonical.viewConfig;
              nativeProps = diffProperties(null, emptyObject, nativeProps, maybeInstance.validAttributes);
              null != nativeProps && ReactNativePrivateInterface.UIManager.updateView(nativeTag, maybeInstance.uiViewClassName, nativeProps);
            }
          },
          focus: function focus() {
            ReactNativePrivateInterface.TextInputState.focusTextInput(findNodeHandle(this));
          },
          blur: function blur() {
            ReactNativePrivateInterface.TextInputState.blurTextInput(findNodeHandle(this));
          }
        };
      }(findNodeHandle, findHostInstance),
      computeComponentStackForErrorReporting: function computeComponentStackForErrorReporting(reactTag) {
        return (reactTag = getInstanceFromTag(reactTag)) ? getStackByFiberInDevAndProd(reactTag) : "";
      }
    }
  };

  (function (devToolsConfig) {
    var _findFiberByHostInstance = devToolsConfig.findFiberByHostInstance;
    return injectInternals(_extends({}, devToolsConfig, {
      overrideHookState: null,
      overrideProps: null,
      setSuspenseHandler: null,
      scheduleUpdate: null,
      currentDispatcherRef: ReactSharedInternals.ReactCurrentDispatcher,
      findHostInstanceByFiber: function findHostInstanceByFiber(fiber) {
        fiber = findCurrentHostFiber(fiber);
        return null === fiber ? null : fiber.stateNode;
      },
      findFiberByHostInstance: function findFiberByHostInstance(instance) {
        return _findFiberByHostInstance ? _findFiberByHostInstance(instance) : null;
      },
      findHostInstancesForRefresh: null,
      scheduleRefresh: null,
      scheduleRoot: null,
      setRefreshHandler: null,
      getCurrentFiber: null
    }));
  })({
    findFiberByHostInstance: getInstanceFromTag,
    getInspectorDataForViewTag: getInspectorDataForViewTag,
    bundleType: 0,
    version: "16.8.6",
    rendererPackageName: "react-native-renderer"
  });

  var ReactNativeRenderer$2 = {
    default: ReactNativeRenderer
  },
      ReactNativeRenderer$3 = ReactNativeRenderer$2 && ReactNativeRenderer || ReactNativeRenderer$2;
  module.exports = ReactNativeRenderer$3.default || ReactNativeRenderer$3;
},14443,[14344,14446,14566,10297,14575]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  _$$_REQUIRE(_dependencyMap[0]);
},14446,[10120]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  if (global.GLOBAL === undefined) {
    global.GLOBAL = global;
  }

  if (global.window === undefined) {
    global.window = global;
  }

  if (global.self === undefined) {
    global.self = global;
  }

  global.process = global.process || {};
  global.process.env = global.process.env || {};

  if (!global.process.env.NODE_ENV) {
    global.process.env.NODE_ENV = 'production';
  }
},14449,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  if (global.__RCTProfileIsProfiling) {
    var Systrace = _$$_REQUIRE(_dependencyMap[0]);

    Systrace.installReactHook();
    Systrace.setEnabled(true);
  }
},14452,[10054]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var ExceptionsManager = _$$_REQUIRE(_dependencyMap[0]);

  ExceptionsManager.installConsoleErrorReporter();

  if (!global.__fbDisableExceptionsManager) {
    var handleError = function handleError(e, isFatal) {
      try {
        ExceptionsManager.handleException(e, isFatal);
      } catch (ee) {
        console.log('Failed to print error: ', ee.message);
        throw e;
      }
    };

    var ErrorUtils = _$$_REQUIRE(_dependencyMap[1]);

    ErrorUtils.setGlobalHandler(handleError);
  }
},14455,[10141,10051]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var getPrototypeOf = _$$_REQUIRE(_dependencyMap[0]);

  var setPrototypeOf = _$$_REQUIRE(_dependencyMap[1]);

  var isNativeFunction = _$$_REQUIRE(_dependencyMap[2]);

  var construct = _$$_REQUIRE(_dependencyMap[3]);

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    module.exports = _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return construct(Class, arguments, getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  module.exports = _wrapNativeSuper;
},14458,[14377,14389,14461,14464]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  module.exports = _isNativeFunction;
},14461,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var setPrototypeOf = _$$_REQUIRE(_dependencyMap[0]);

  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      module.exports = _construct = Reflect.construct;
    } else {
      module.exports = _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  module.exports = _construct;
},14464,[14389]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var TurboModuleRegistry = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1]));

  var Platform = _$$_REQUIRE(_dependencyMap[2]);

  var NativeModule = TurboModuleRegistry.getEnforcing('ExceptionsManager');
  var ExceptionsManager = {
    reportFatalException: function reportFatalException(message, stack, exceptionId) {
      NativeModule.reportFatalException(message, stack, exceptionId);
    },
    reportSoftException: function reportSoftException(message, stack, exceptionId) {
      NativeModule.reportSoftException(message, stack, exceptionId);
    },
    updateExceptionMessage: function updateExceptionMessage(message, stack, exceptionId) {
      NativeModule.updateExceptionMessage(message, stack, exceptionId);
    },
    dismissRedbox: function dismissRedbox() {
      if (NativeModule.dismissRedbox) {
        NativeModule.dismissRedbox();
      }
    },
    reportException: function reportException(data) {
      if (NativeModule.reportException) {
        NativeModule.reportException(data);
        return;
      }

      if (data.isFatal) {
        ExceptionsManager.reportFatalException(data.message, data.stack, data.id);
      } else {
        ExceptionsManager.reportSoftException(data.message, data.stack, data.id);
      }
    }
  };
  var _default = ExceptionsManager;
  exports.default = _default;
},14467,[14308,14341,10066]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _require = _$$_REQUIRE(_dependencyMap[0]),
      polyfillGlobal = _require.polyfillGlobal;

  polyfillGlobal('Promise', function () {
    return _$$_REQUIRE(_dependencyMap[1]);
  });
},14470,[14473,10159]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var defineLazyObjectProperty = _$$_REQUIRE(_dependencyMap[0]);

  function polyfillObjectProperty(object, name, getValue) {
    var descriptor = Object.getOwnPropertyDescriptor(object, name);

    var _ref = descriptor || {},
        enumerable = _ref.enumerable,
        writable = _ref.writable,
        configurable = _ref.configurable;

    if (descriptor && !configurable) {
      console.error('Failed to set polyfill. ' + name + ' is not configurable.');
      return;
    }

    defineLazyObjectProperty(object, name, {
      get: getValue,
      enumerable: enumerable !== false,
      writable: writable !== false
    });
  }

  function polyfillGlobal(name, getValue) {
    polyfillObjectProperty(global, name, getValue);
  }

  module.exports = {
    polyfillObjectProperty: polyfillObjectProperty,
    polyfillGlobal: polyfillGlobal
  };
},14473,[10084]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var Promise = _$$_REQUIRE(_dependencyMap[0]);

  module.exports = Promise;

  Promise.prototype['finally'] = function (f) {
    return this.then(function (value) {
      return Promise.resolve(f()).then(function () {
        return value;
      });
    }, function (err) {
      return Promise.resolve(f()).then(function () {
        throw err;
      });
    });
  };
},14476,[10168]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _require = _$$_REQUIRE(_dependencyMap[0]),
      polyfillGlobal = _require.polyfillGlobal;

  polyfillGlobal('regeneratorRuntime', function () {
    delete global.regeneratorRuntime;
    return _$$_REQUIRE(_dependencyMap[1]);
  });
},14479,[14473,14482]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var runtime = function (exports) {
    "use strict";

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined;
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function wrap(innerFn, outerFn, self, tryLocsList) {
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []);
      generator._invoke = makeInvokeMethod(innerFn, self, context);
      return generator;
    }

    exports.wrap = wrap;

    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";
    var ContinueSentinel = {};

    function Generator() {}

    function GeneratorFunction() {}

    function GeneratorFunctionPrototype() {}

    var IteratorPrototype = {};

    IteratorPrototype[iteratorSymbol] = function () {
      return this;
    };

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        prototype[method] = function (arg) {
          return this._invoke(method, arg);
        };
      });
    }

    exports.isGeneratorFunction = function (genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction || (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };

    exports.mark = function (genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;

        if (!(toStringTagSymbol in genFun)) {
          genFun[toStringTagSymbol] = "GeneratorFunction";
        }
      }

      genFun.prototype = Object.create(Gp);
      return genFun;
    };

    exports.awrap = function (arg) {
      return {
        __await: arg
      };
    };

    function AsyncIterator(generator) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);

        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;

          if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
            return Promise.resolve(value.__await).then(function (value) {
              invoke("next", value, resolve, reject);
            }, function (err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return Promise.resolve(value).then(function (unwrapped) {
            result.value = unwrapped;
            resolve(result);
          }, function (error) {
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new Promise(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }

      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);

    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
      return this;
    };

    exports.AsyncIterator = AsyncIterator;

    exports.async = function (innerFn, outerFn, self, tryLocsList) {
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));
      return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }

          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            context.sent = context._sent = context.arg;
          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);
          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;
          var record = tryCatch(innerFn, self, context);

          if (record.type === "normal") {
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };
          } else if (record.type === "throw") {
            state = GenStateCompleted;
            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    }

    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];

      if (method === undefined) {
        context.delegate = null;

        if (context.method === "throw") {
          if (delegate.iterator["return"]) {
            context.method = "return";
            context.arg = undefined;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (!info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        context[delegate.resultName] = info.value;
        context.next = delegate.nextLoc;

        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined;
        }
      } else {
        return info;
      }

      context.delegate = null;
      return ContinueSentinel;
    }

    defineIteratorMethods(Gp);
    Gp[toStringTagSymbol] = "Generator";

    Gp[iteratorSymbol] = function () {
      return this;
    };

    Gp.toString = function () {
      return "[object Generator]";
    };

    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      this.tryEntries = [{
        tryLoc: "root"
      }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    exports.keys = function (object) {
      var keys = [];

      for (var key in object) {
        keys.push(key);
      }

      keys.reverse();
      return function next() {
        while (keys.length) {
          var key = keys.pop();

          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        }

        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];

        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1,
              next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined;
            next.done = true;
            return next;
          };

          return next.next = next;
        }
      }

      return {
        next: doneResult
      };
    }

    exports.values = values;

    function doneResult() {
      return {
        value: undefined,
        done: true
      };
    }

    Context.prototype = {
      constructor: Context,
      reset: function reset(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        this.sent = this._sent = undefined;
        this.done = false;
        this.delegate = null;
        this.method = "next";
        this.arg = undefined;
        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined;
            }
          }
        }
      },
      stop: function stop() {
        this.done = true;
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;

        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },
      dispatchException: function dispatchException(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;

        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            context.method = "next";
            context.arg = undefined;
          }

          return !!caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
      abrupt: function abrupt(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },
      complete: function complete(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" || record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },
      finish: function finish(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },
      "catch": function _catch(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;

            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }

            return thrown;
          }
        }

        throw new Error("illegal catch attempt");
      },
      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          this.arg = undefined;
        }

        return ContinueSentinel;
      }
    };
    return exports;
  }(typeof module === "object" ? module.exports : {});

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
},14482,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  if (!global.RN$Bridgeless) {
    var _require = _$$_REQUIRE(_dependencyMap[0]),
        polyfillGlobal = _require.polyfillGlobal;

    var defineLazyTimer = function defineLazyTimer(name) {
      polyfillGlobal(name, function () {
        return _$$_REQUIRE(_dependencyMap[1])[name];
      });
    };

    defineLazyTimer('setTimeout');
    defineLazyTimer('setInterval');
    defineLazyTimer('setImmediate');
    defineLazyTimer('clearTimeout');
    defineLazyTimer('clearInterval');
    defineLazyTimer('clearImmediate');
    defineLazyTimer('requestAnimationFrame');
    defineLazyTimer('cancelAnimationFrame');
    defineLazyTimer('requestIdleCallback');
    defineLazyTimer('cancelIdleCallback');
  }
},14485,[14473,10063]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var TurboModuleRegistry = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1]));

  var _default = TurboModuleRegistry.get('Timing');

  exports.default = _default;
},14488,[14308,14341]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  var performance = _$$_REQUIRE(_dependencyMap[0]);

  var performanceNow;

  if (performance.now) {
    performanceNow = function performanceNow() {
      return performance.now();
    };
  } else {
    performanceNow = function performanceNow() {
      return Date.now();
    };
  }

  module.exports = performanceNow;
},14491,[14494]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var ExecutionEnvironment = _$$_REQUIRE(_dependencyMap[0]);

  var performance;

  if (ExecutionEnvironment.canUseDOM) {
    performance = window.performance || window.msPerformance || window.webkitPerformance;
  }

  module.exports = performance || {};
},14494,[14497]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
  var ExecutionEnvironment = {
    canUseDOM: canUseDOM,
    canUseWorkers: typeof Worker !== 'undefined',
    canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),
    canUseViewport: canUseDOM && !!window.screen,
    isInWorker: !canUseDOM
  };
  module.exports = ExecutionEnvironment;
},14497,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _require = _$$_REQUIRE(_dependencyMap[0]),
      polyfillGlobal = _require.polyfillGlobal;

  polyfillGlobal('XMLHttpRequest', function () {
    return _$$_REQUIRE(_dependencyMap[1]);
  });
  polyfillGlobal('FormData', function () {
    return _$$_REQUIRE(_dependencyMap[2]);
  });
  polyfillGlobal('fetch', function () {
    return _$$_REQUIRE(_dependencyMap[3]).fetch;
  });
  polyfillGlobal('Headers', function () {
    return _$$_REQUIRE(_dependencyMap[3]).Headers;
  });
  polyfillGlobal('Request', function () {
    return _$$_REQUIRE(_dependencyMap[3]).Request;
  });
  polyfillGlobal('Response', function () {
    return _$$_REQUIRE(_dependencyMap[3]).Response;
  });
  polyfillGlobal('WebSocket', function () {
    return _$$_REQUIRE(_dependencyMap[4]);
  });
  polyfillGlobal('Blob', function () {
    return _$$_REQUIRE(_dependencyMap[5]);
  });
  polyfillGlobal('File', function () {
    return _$$_REQUIRE(_dependencyMap[6]);
  });
  polyfillGlobal('FileReader', function () {
    return _$$_REQUIRE(_dependencyMap[7]);
  });
  polyfillGlobal('URL', function () {
    return _$$_REQUIRE(_dependencyMap[8]).URL;
  });
  polyfillGlobal('URLSearchParams', function () {
    return _$$_REQUIRE(_dependencyMap[8]).URLSearchParams;
  });
  polyfillGlobal('AbortController', function () {
    return _$$_REQUIRE(_dependencyMap[9]).AbortController;
  });
  polyfillGlobal('AbortSignal', function () {
    return _$$_REQUIRE(_dependencyMap[9]).AbortSignal;
  });
},14500,[14473,10177,10219,10222,10228,10210,10234,10237,10240,14521]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var TurboModuleRegistry = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1]));

  var _default = TurboModuleRegistry.get('BlobModule');

  exports.default = _default;
},14503,[14308,14341]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  var privateData = new WeakMap();
  var wrappers = new WeakMap();

  function pd(event) {
    var retv = privateData.get(event);

    if (retv === null) {
      throw new TypeError("'this' is expected an Event object, but got " + JSON.stringify(event));
    }

    return retv;
  }

  function setCancelFlag(data) {
    if (data.passiveListener != null) {
      if (typeof console !== "undefined" && typeof console.error === "function") {
        console.error("Unable to preventDefault inside passive event listener invocation.", data.passiveListener);
      }

      return;
    }

    if (!data.event.cancelable) {
      return;
    }

    data.canceled = true;

    if (typeof data.event.preventDefault === "function") {
      data.event.preventDefault();
    }
  }

  function Event(eventTarget, event) {
    privateData.set(this, {
      eventTarget: eventTarget,
      event: event,
      eventPhase: 2,
      currentTarget: eventTarget,
      canceled: false,
      stopped: false,
      immediateStopped: false,
      passiveListener: null,
      timeStamp: event.timeStamp || Date.now()
    });
    Object.defineProperty(this, "isTrusted", {
      value: false,
      enumerable: true
    });
    var keys = Object.keys(event);

    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];

      if (!(key in this)) {
        Object.defineProperty(this, key, defineRedirectDescriptor(key));
      }
    }
  }

  Event.prototype = {
    get type() {
      return pd(this).event.type;
    },

    get target() {
      return pd(this).eventTarget;
    },

    get currentTarget() {
      return pd(this).currentTarget;
    },

    composedPath: function composedPath() {
      var currentTarget = pd(this).currentTarget;

      if (currentTarget == null) {
        return [];
      }

      return [currentTarget];
    },

    get NONE() {
      return 0;
    },

    get CAPTURING_PHASE() {
      return 1;
    },

    get AT_TARGET() {
      return 2;
    },

    get BUBBLING_PHASE() {
      return 3;
    },

    get eventPhase() {
      return pd(this).eventPhase;
    },

    stopPropagation: function stopPropagation() {
      var data = pd(this);
      data.stopped = true;

      if (typeof data.event.stopPropagation === "function") {
        data.event.stopPropagation();
      }
    },
    stopImmediatePropagation: function stopImmediatePropagation() {
      var data = pd(this);
      data.stopped = true;
      data.immediateStopped = true;

      if (typeof data.event.stopImmediatePropagation === "function") {
        data.event.stopImmediatePropagation();
      }
    },

    get bubbles() {
      return Boolean(pd(this).event.bubbles);
    },

    get cancelable() {
      return Boolean(pd(this).event.cancelable);
    },

    preventDefault: function preventDefault() {
      setCancelFlag(pd(this));
    },

    get defaultPrevented() {
      return pd(this).canceled;
    },

    get composed() {
      return Boolean(pd(this).event.composed);
    },

    get timeStamp() {
      return pd(this).timeStamp;
    },

    get srcElement() {
      return pd(this).eventTarget;
    },

    get cancelBubble() {
      return pd(this).stopped;
    },

    set cancelBubble(value) {
      if (!value) {
        return;
      }

      var data = pd(this);
      data.stopped = true;

      if (typeof data.event.cancelBubble === "boolean") {
        data.event.cancelBubble = true;
      }
    },

    get returnValue() {
      return !pd(this).canceled;
    },

    set returnValue(value) {
      if (!value) {
        setCancelFlag(pd(this));
      }
    },

    initEvent: function initEvent() {}
  };
  Object.defineProperty(Event.prototype, "constructor", {
    value: Event,
    configurable: true,
    writable: true
  });

  if (typeof window !== "undefined" && typeof window.Event !== "undefined") {
    Object.setPrototypeOf(Event.prototype, window.Event.prototype);
    wrappers.set(window.Event.prototype, Event);
  }

  function defineRedirectDescriptor(key) {
    return {
      get: function get() {
        return pd(this).event[key];
      },
      set: function set(value) {
        pd(this).event[key] = value;
      },
      configurable: true,
      enumerable: true
    };
  }

  function defineCallDescriptor(key) {
    return {
      value: function value() {
        var event = pd(this).event;
        return event[key].apply(event, arguments);
      },
      configurable: true,
      enumerable: true
    };
  }

  function defineWrapper(BaseEvent, proto) {
    var keys = Object.keys(proto);

    if (keys.length === 0) {
      return BaseEvent;
    }

    function CustomEvent(eventTarget, event) {
      BaseEvent.call(this, eventTarget, event);
    }

    CustomEvent.prototype = Object.create(BaseEvent.prototype, {
      constructor: {
        value: CustomEvent,
        configurable: true,
        writable: true
      }
    });

    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];

      if (!(key in BaseEvent.prototype)) {
        var descriptor = Object.getOwnPropertyDescriptor(proto, key);
        var isFunc = typeof descriptor.value === "function";
        Object.defineProperty(CustomEvent.prototype, key, isFunc ? defineCallDescriptor(key) : defineRedirectDescriptor(key));
      }
    }

    return CustomEvent;
  }

  function getWrapper(proto) {
    if (proto == null || proto === Object.prototype) {
      return Event;
    }

    var wrapper = wrappers.get(proto);

    if (wrapper == null) {
      wrapper = defineWrapper(getWrapper(Object.getPrototypeOf(proto)), proto);
      wrappers.set(proto, wrapper);
    }

    return wrapper;
  }

  function wrapEvent(eventTarget, event) {
    var Wrapper = getWrapper(Object.getPrototypeOf(event));
    return new Wrapper(eventTarget, event);
  }

  function isStopped(event) {
    return pd(event).immediateStopped;
  }

  function setEventPhase(event, eventPhase) {
    pd(event).eventPhase = eventPhase;
  }

  function setCurrentTarget(event, currentTarget) {
    pd(event).currentTarget = currentTarget;
  }

  function setPassiveListener(event, passiveListener) {
    pd(event).passiveListener = passiveListener;
  }

  var listenersMap = new WeakMap();
  var CAPTURE = 1;
  var BUBBLE = 2;
  var ATTRIBUTE = 3;

  function isObject(x) {
    return x !== null && typeof x === "object";
  }

  function getListeners(eventTarget) {
    var listeners = listenersMap.get(eventTarget);

    if (listeners == null) {
      throw new TypeError("'this' is expected an EventTarget object, but got another value.");
    }

    return listeners;
  }

  function defineEventAttributeDescriptor(eventName) {
    return {
      get: function get() {
        var listeners = getListeners(this);
        var node = listeners.get(eventName);

        while (node != null) {
          if (node.listenerType === ATTRIBUTE) {
            return node.listener;
          }

          node = node.next;
        }

        return null;
      },
      set: function set(listener) {
        if (typeof listener !== "function" && !isObject(listener)) {
          listener = null;
        }

        var listeners = getListeners(this);
        var prev = null;
        var node = listeners.get(eventName);

        while (node != null) {
          if (node.listenerType === ATTRIBUTE) {
            if (prev !== null) {
              prev.next = node.next;
            } else if (node.next !== null) {
              listeners.set(eventName, node.next);
            } else {
              listeners.delete(eventName);
            }
          } else {
            prev = node;
          }

          node = node.next;
        }

        if (listener !== null) {
          var newNode = {
            listener: listener,
            listenerType: ATTRIBUTE,
            passive: false,
            once: false,
            next: null
          };

          if (prev === null) {
            listeners.set(eventName, newNode);
          } else {
            prev.next = newNode;
          }
        }
      },
      configurable: true,
      enumerable: true
    };
  }

  function defineEventAttribute(eventTargetPrototype, eventName) {
    Object.defineProperty(eventTargetPrototype, "on" + eventName, defineEventAttributeDescriptor(eventName));
  }

  function defineCustomEventTarget(eventNames) {
    function CustomEventTarget() {
      EventTarget.call(this);
    }

    CustomEventTarget.prototype = Object.create(EventTarget.prototype, {
      constructor: {
        value: CustomEventTarget,
        configurable: true,
        writable: true
      }
    });

    for (var i = 0; i < eventNames.length; ++i) {
      defineEventAttribute(CustomEventTarget.prototype, eventNames[i]);
    }

    return CustomEventTarget;
  }

  function EventTarget() {
    if (this instanceof EventTarget) {
      listenersMap.set(this, new Map());
      return;
    }

    if (arguments.length === 1 && Array.isArray(arguments[0])) {
      return defineCustomEventTarget(arguments[0]);
    }

    if (arguments.length > 0) {
      var types = new Array(arguments.length);

      for (var i = 0; i < arguments.length; ++i) {
        types[i] = arguments[i];
      }

      return defineCustomEventTarget(types);
    }

    throw new TypeError("Cannot call a class as a function");
  }

  EventTarget.prototype = {
    addEventListener: function addEventListener(eventName, listener, options) {
      if (listener == null) {
        return;
      }

      if (typeof listener !== "function" && !isObject(listener)) {
        throw new TypeError("'listener' should be a function or an object.");
      }

      var listeners = getListeners(this);
      var optionsIsObj = isObject(options);
      var capture = optionsIsObj ? Boolean(options.capture) : Boolean(options);
      var listenerType = capture ? CAPTURE : BUBBLE;
      var newNode = {
        listener: listener,
        listenerType: listenerType,
        passive: optionsIsObj && Boolean(options.passive),
        once: optionsIsObj && Boolean(options.once),
        next: null
      };
      var node = listeners.get(eventName);

      if (node === undefined) {
        listeners.set(eventName, newNode);
        return;
      }

      var prev = null;

      while (node != null) {
        if (node.listener === listener && node.listenerType === listenerType) {
          return;
        }

        prev = node;
        node = node.next;
      }

      prev.next = newNode;
    },
    removeEventListener: function removeEventListener(eventName, listener, options) {
      if (listener == null) {
        return;
      }

      var listeners = getListeners(this);
      var capture = isObject(options) ? Boolean(options.capture) : Boolean(options);
      var listenerType = capture ? CAPTURE : BUBBLE;
      var prev = null;
      var node = listeners.get(eventName);

      while (node != null) {
        if (node.listener === listener && node.listenerType === listenerType) {
          if (prev !== null) {
            prev.next = node.next;
          } else if (node.next !== null) {
            listeners.set(eventName, node.next);
          } else {
            listeners.delete(eventName);
          }

          return;
        }

        prev = node;
        node = node.next;
      }
    },
    dispatchEvent: function dispatchEvent(event) {
      if (event == null || typeof event.type !== "string") {
        throw new TypeError('"event.type" should be a string.');
      }

      var listeners = getListeners(this);
      var eventName = event.type;
      var node = listeners.get(eventName);

      if (node == null) {
        return true;
      }

      var wrappedEvent = wrapEvent(this, event);
      var prev = null;

      while (node != null) {
        if (node.once) {
          if (prev !== null) {
            prev.next = node.next;
          } else if (node.next !== null) {
            listeners.set(eventName, node.next);
          } else {
            listeners.delete(eventName);
          }
        } else {
          prev = node;
        }

        setPassiveListener(wrappedEvent, node.passive ? node.listener : null);

        if (typeof node.listener === "function") {
          try {
            node.listener.call(this, wrappedEvent);
          } catch (err) {
            if (typeof console !== "undefined" && typeof console.error === "function") {
              console.error(err);
            }
          }
        } else if (node.listenerType !== ATTRIBUTE && typeof node.listener.handleEvent === "function") {
          node.listener.handleEvent(wrappedEvent);
        }

        if (isStopped(wrappedEvent)) {
          break;
        }

        node = node.next;
      }

      setPassiveListener(wrappedEvent, null);
      setEventPhase(wrappedEvent, 0);
      setCurrentTarget(wrappedEvent, null);
      return !wrappedEvent.defaultPrevented;
    }
  };
  Object.defineProperty(EventTarget.prototype, "constructor", {
    value: EventTarget,
    configurable: true,
    writable: true
  });

  if (typeof window !== "undefined" && typeof window.EventTarget !== "undefined") {
    Object.setPrototypeOf(EventTarget.prototype, window.EventTarget.prototype);
  }

  exports.defineEventAttribute = defineEventAttribute;
  exports.EventTarget = EventTarget;
  exports.default = EventTarget;
  module.exports = EventTarget;
  module.exports.EventTarget = module.exports["default"] = EventTarget;
  module.exports.defineEventAttribute = defineEventAttribute;
},14506,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var TurboModuleRegistry = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1]));

  var _default = TurboModuleRegistry.getEnforcing('Networking');

  exports.default = _default;
},14509,[14308,14341]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : factory(global.WHATWGFetch = {});
  })(this, function (exports) {
    'use strict';

    var support = {
      searchParams: 'URLSearchParams' in self,
      iterable: 'Symbol' in self && 'iterator' in Symbol,
      blob: 'FileReader' in self && 'Blob' in self && function () {
        try {
          new Blob();
          return true;
        } catch (e) {
          return false;
        }
      }(),
      formData: 'FormData' in self,
      arrayBuffer: 'ArrayBuffer' in self
    };

    function isDataView(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj);
    }

    if (support.arrayBuffer) {
      var viewClasses = ['[object Int8Array]', '[object Uint8Array]', '[object Uint8ClampedArray]', '[object Int16Array]', '[object Uint16Array]', '[object Int32Array]', '[object Uint32Array]', '[object Float32Array]', '[object Float64Array]'];

      var isArrayBufferView = ArrayBuffer.isView || function (obj) {
        return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
      };
    }

    function normalizeName(name) {
      if (typeof name !== 'string') {
        name = String(name);
      }

      if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
        throw new TypeError('Invalid character in header field name');
      }

      return name.toLowerCase();
    }

    function normalizeValue(value) {
      if (typeof value !== 'string') {
        value = String(value);
      }

      return value;
    }

    function iteratorFor(items) {
      var iterator = {
        next: function next() {
          var value = items.shift();
          return {
            done: value === undefined,
            value: value
          };
        }
      };

      if (support.iterable) {
        iterator[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"] = function () {
          return iterator;
        };
      }

      return iterator;
    }

    function Headers(headers) {
      this.map = {};

      if (headers instanceof Headers) {
        headers.forEach(function (value, name) {
          this.append(name, value);
        }, this);
      } else if (Array.isArray(headers)) {
        headers.forEach(function (header) {
          this.append(header[0], header[1]);
        }, this);
      } else if (headers) {
        Object.getOwnPropertyNames(headers).forEach(function (name) {
          this.append(name, headers[name]);
        }, this);
      }
    }

    Headers.prototype.append = function (name, value) {
      name = normalizeName(name);
      value = normalizeValue(value);
      var oldValue = this.map[name];
      this.map[name] = oldValue ? oldValue + ', ' + value : value;
    };

    Headers.prototype['delete'] = function (name) {
      delete this.map[normalizeName(name)];
    };

    Headers.prototype.get = function (name) {
      name = normalizeName(name);
      return this.has(name) ? this.map[name] : null;
    };

    Headers.prototype.has = function (name) {
      return this.map.hasOwnProperty(normalizeName(name));
    };

    Headers.prototype.set = function (name, value) {
      this.map[normalizeName(name)] = normalizeValue(value);
    };

    Headers.prototype.forEach = function (callback, thisArg) {
      for (var name in this.map) {
        if (this.map.hasOwnProperty(name)) {
          callback.call(thisArg, this.map[name], name, this);
        }
      }
    };

    Headers.prototype.keys = function () {
      var items = [];
      this.forEach(function (value, name) {
        items.push(name);
      });
      return iteratorFor(items);
    };

    Headers.prototype.values = function () {
      var items = [];
      this.forEach(function (value) {
        items.push(value);
      });
      return iteratorFor(items);
    };

    Headers.prototype.entries = function () {
      var items = [];
      this.forEach(function (value, name) {
        items.push([name, value]);
      });
      return iteratorFor(items);
    };

    if (support.iterable) {
      Headers.prototype[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"] = Headers.prototype.entries;
    }

    function consumed(body) {
      if (body.bodyUsed) {
        return Promise.reject(new TypeError('Already read'));
      }

      body.bodyUsed = true;
    }

    function fileReaderReady(reader) {
      return new Promise(function (resolve, reject) {
        reader.onload = function () {
          resolve(reader.result);
        };

        reader.onerror = function () {
          reject(reader.error);
        };
      });
    }

    function readBlobAsArrayBuffer(blob) {
      var reader = new FileReader();
      var promise = fileReaderReady(reader);
      reader.readAsArrayBuffer(blob);
      return promise;
    }

    function readBlobAsText(blob) {
      var reader = new FileReader();
      var promise = fileReaderReady(reader);
      reader.readAsText(blob);
      return promise;
    }

    function readArrayBufferAsText(buf) {
      var view = new Uint8Array(buf);
      var chars = new Array(view.length);

      for (var i = 0; i < view.length; i++) {
        chars[i] = String.fromCharCode(view[i]);
      }

      return chars.join('');
    }

    function bufferClone(buf) {
      if (buf.slice) {
        return buf.slice(0);
      } else {
        var view = new Uint8Array(buf.byteLength);
        view.set(new Uint8Array(buf));
        return view.buffer;
      }
    }

    function Body() {
      this.bodyUsed = false;

      this._initBody = function (body) {
        this._bodyInit = body;

        if (!body) {
          this._bodyText = '';
        } else if (typeof body === 'string') {
          this._bodyText = body;
        } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
          this._bodyBlob = body;
        } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
          this._bodyFormData = body;
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this._bodyText = body.toString();
        } else if (support.arrayBuffer && support.blob && isDataView(body)) {
          this._bodyArrayBuffer = bufferClone(body.buffer);
          this._bodyInit = new Blob([this._bodyArrayBuffer]);
        } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
          this._bodyArrayBuffer = bufferClone(body);
        } else {
          this._bodyText = body = Object.prototype.toString.call(body);
        }

        if (!this.headers.get('content-type')) {
          if (typeof body === 'string') {
            this.headers.set('content-type', 'text/plain;charset=UTF-8');
          } else if (this._bodyBlob && this._bodyBlob.type) {
            this.headers.set('content-type', this._bodyBlob.type);
          } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
            this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
          }
        }
      };

      if (support.blob) {
        this.blob = function () {
          var rejected = consumed(this);

          if (rejected) {
            return rejected;
          }

          if (this._bodyBlob) {
            return Promise.resolve(this._bodyBlob);
          } else if (this._bodyArrayBuffer) {
            return Promise.resolve(new Blob([this._bodyArrayBuffer]));
          } else if (this._bodyFormData) {
            throw new Error('could not read FormData body as blob');
          } else {
            return Promise.resolve(new Blob([this._bodyText]));
          }
        };

        this.arrayBuffer = function () {
          if (this._bodyArrayBuffer) {
            return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
          } else {
            return this.blob().then(readBlobAsArrayBuffer);
          }
        };
      }

      this.text = function () {
        var rejected = consumed(this);

        if (rejected) {
          return rejected;
        }

        if (this._bodyBlob) {
          return readBlobAsText(this._bodyBlob);
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as text');
        } else {
          return Promise.resolve(this._bodyText);
        }
      };

      if (support.formData) {
        this.formData = function () {
          return this.text().then(decode);
        };
      }

      this.json = function () {
        return this.text().then(JSON.parse);
      };

      return this;
    }

    var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

    function normalizeMethod(method) {
      var upcased = method.toUpperCase();
      return methods.indexOf(upcased) > -1 ? upcased : method;
    }

    function Request(input, options) {
      options = options || {};
      var body = options.body;

      if (input instanceof Request) {
        if (input.bodyUsed) {
          throw new TypeError('Already read');
        }

        this.url = input.url;
        this.credentials = input.credentials;

        if (!options.headers) {
          this.headers = new Headers(input.headers);
        }

        this.method = input.method;
        this.mode = input.mode;
        this.signal = input.signal;

        if (!body && input._bodyInit != null) {
          body = input._bodyInit;
          input.bodyUsed = true;
        }
      } else {
        this.url = String(input);
      }

      this.credentials = options.credentials || this.credentials || 'same-origin';

      if (options.headers || !this.headers) {
        this.headers = new Headers(options.headers);
      }

      this.method = normalizeMethod(options.method || this.method || 'GET');
      this.mode = options.mode || this.mode || null;
      this.signal = options.signal || this.signal;
      this.referrer = null;

      if ((this.method === 'GET' || this.method === 'HEAD') && body) {
        throw new TypeError('Body not allowed for GET or HEAD requests');
      }

      this._initBody(body);
    }

    Request.prototype.clone = function () {
      return new Request(this, {
        body: this._bodyInit
      });
    };

    function decode(body) {
      var form = new FormData();
      body.trim().split('&').forEach(function (bytes) {
        if (bytes) {
          var split = bytes.split('=');
          var name = split.shift().replace(/\+/g, ' ');
          var value = split.join('=').replace(/\+/g, ' ');
          form.append(decodeURIComponent(name), decodeURIComponent(value));
        }
      });
      return form;
    }

    function parseHeaders(rawHeaders) {
      var headers = new Headers();
      var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
      preProcessedHeaders.split(/\r?\n/).forEach(function (line) {
        var parts = line.split(':');
        var key = parts.shift().trim();

        if (key) {
          var value = parts.join(':').trim();
          headers.append(key, value);
        }
      });
      return headers;
    }

    Body.call(Request.prototype);

    function Response(bodyInit, options) {
      if (!options) {
        options = {};
      }

      this.type = 'default';
      this.status = options.status === undefined ? 200 : options.status;
      this.ok = this.status >= 200 && this.status < 300;
      this.statusText = 'statusText' in options ? options.statusText : 'OK';
      this.headers = new Headers(options.headers);
      this.url = options.url || '';

      this._initBody(bodyInit);
    }

    Body.call(Response.prototype);

    Response.prototype.clone = function () {
      return new Response(this._bodyInit, {
        status: this.status,
        statusText: this.statusText,
        headers: new Headers(this.headers),
        url: this.url
      });
    };

    Response.error = function () {
      var response = new Response(null, {
        status: 0,
        statusText: ''
      });
      response.type = 'error';
      return response;
    };

    var redirectStatuses = [301, 302, 303, 307, 308];

    Response.redirect = function (url, status) {
      if (redirectStatuses.indexOf(status) === -1) {
        throw new RangeError('Invalid status code');
      }

      return new Response(null, {
        status: status,
        headers: {
          location: url
        }
      });
    };

    exports.DOMException = self.DOMException;

    try {
      new exports.DOMException();
    } catch (err) {
      exports.DOMException = function (message, name) {
        this.message = message;
        this.name = name;
        var error = Error(message);
        this.stack = error.stack;
      };

      exports.DOMException.prototype = Object.create(Error.prototype);
      exports.DOMException.prototype.constructor = exports.DOMException;
    }

    function fetch(input, init) {
      return new Promise(function (resolve, reject) {
        var request = new Request(input, init);

        if (request.signal && request.signal.aborted) {
          return reject(new exports.DOMException('Aborted', 'AbortError'));
        }

        var xhr = new XMLHttpRequest();

        function abortXhr() {
          xhr.abort();
        }

        xhr.onload = function () {
          var options = {
            status: xhr.status,
            statusText: xhr.statusText,
            headers: parseHeaders(xhr.getAllResponseHeaders() || '')
          };
          options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
          var body = 'response' in xhr ? xhr.response : xhr.responseText;
          resolve(new Response(body, options));
        };

        xhr.onerror = function () {
          reject(new TypeError('Network request failed'));
        };

        xhr.ontimeout = function () {
          reject(new TypeError('Network request failed'));
        };

        xhr.onabort = function () {
          reject(new exports.DOMException('Aborted', 'AbortError'));
        };

        xhr.open(request.method, request.url, true);

        if (request.credentials === 'include') {
          xhr.withCredentials = true;
        } else if (request.credentials === 'omit') {
          xhr.withCredentials = false;
        }

        if ('responseType' in xhr && support.blob) {
          xhr.responseType = 'blob';
        }

        request.headers.forEach(function (value, name) {
          xhr.setRequestHeader(name, value);
        });

        if (request.signal) {
          request.signal.addEventListener('abort', abortXhr);

          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
              request.signal.removeEventListener('abort', abortXhr);
            }
          };
        }

        xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
      });
    }

    fetch.polyfill = true;

    if (!self.fetch) {
      self.fetch = fetch;
      self.Headers = Headers;
      self.Request = Request;
      self.Response = Response;
    }

    exports.Headers = Headers;
    exports.Request = Request;
    exports.Response = Response;
    exports.fetch = fetch;
    Object.defineProperty(exports, '__esModule', {
      value: true
    });
  });
},14512,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var TurboModuleRegistry = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1]));

  var _default = TurboModuleRegistry.getEnforcing('WebSocketModule');

  exports.default = _default;
},14515,[14308,14341]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var TurboModuleRegistry = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1]));

  var _default = TurboModuleRegistry.getEnforcing('FileReaderModule');

  exports.default = _default;
},14518,[14308,14341]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _classCallCheck = _$$_REQUIRE(_dependencyMap[0]);

  var _createClass = _$$_REQUIRE(_dependencyMap[1]);

  var _possibleConstructorReturn = _$$_REQUIRE(_dependencyMap[2]);

  var _getPrototypeOf = _$$_REQUIRE(_dependencyMap[3]);

  var _inherits = _$$_REQUIRE(_dependencyMap[4]);

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var eventTargetShim = _$$_REQUIRE(_dependencyMap[5]);

  var AbortSignal = function (_eventTargetShim$Even) {
    _inherits(AbortSignal, _eventTargetShim$Even);

    function AbortSignal() {
      var _this;

      _classCallCheck(this, AbortSignal);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(AbortSignal).call(this));
      throw new TypeError("AbortSignal cannot be constructed directly");
      return _this;
    }

    _createClass(AbortSignal, [{
      key: "aborted",
      get: function get() {
        var aborted = abortedFlags.get(this);

        if (typeof aborted !== "boolean") {
          throw new TypeError("Expected 'this' to be an 'AbortSignal' object, but got " + (this === null ? "null" : typeof this));
        }

        return aborted;
      }
    }]);

    return AbortSignal;
  }(eventTargetShim.EventTarget);

  eventTargetShim.defineEventAttribute(AbortSignal.prototype, "abort");

  function createAbortSignal() {
    var signal = Object.create(AbortSignal.prototype);
    eventTargetShim.EventTarget.call(signal);
    abortedFlags.set(signal, false);
    return signal;
  }

  function abortSignal(signal) {
    if (abortedFlags.get(signal) !== false) {
      return;
    }

    abortedFlags.set(signal, true);
    signal.dispatchEvent({
      type: "abort"
    });
  }

  var abortedFlags = new WeakMap();
  Object.defineProperties(AbortSignal.prototype, {
    aborted: {
      enumerable: true
    }
  });

  if (typeof Symbol === "function" && typeof (typeof Symbol === "function" ? Symbol.toStringTag : "@@toStringTag") === "symbol") {
    Object.defineProperty(AbortSignal.prototype, typeof Symbol === "function" ? Symbol.toStringTag : "@@toStringTag", {
      configurable: true,
      value: "AbortSignal"
    });
  }

  var AbortController = function () {
    function AbortController() {
      _classCallCheck(this, AbortController);

      signals.set(this, createAbortSignal());
    }

    _createClass(AbortController, [{
      key: "abort",
      value: function abort() {
        abortSignal(getSignal(this));
      }
    }, {
      key: "signal",
      get: function get() {
        return getSignal(this);
      }
    }]);

    return AbortController;
  }();

  var signals = new WeakMap();

  function getSignal(controller) {
    var signal = signals.get(controller);

    if (signal == null) {
      throw new TypeError("Expected 'this' to be an 'AbortController' object, but got " + (controller === null ? "null" : typeof controller));
    }

    return signal;
  }

  Object.defineProperties(AbortController.prototype, {
    signal: {
      enumerable: true
    },
    abort: {
      enumerable: true
    }
  });

  if (typeof Symbol === "function" && typeof (typeof Symbol === "function" ? Symbol.toStringTag : "@@toStringTag") === "symbol") {
    Object.defineProperty(AbortController.prototype, typeof Symbol === "function" ? Symbol.toStringTag : "@@toStringTag", {
      configurable: true,
      value: "AbortController"
    });
  }

  exports.AbortController = AbortController;
  exports.AbortSignal = AbortSignal;
  exports.default = AbortController;
  module.exports = AbortController;
  module.exports.AbortController = module.exports["default"] = AbortController;
  module.exports.AbortSignal = AbortSignal;
},14521,[14320,14323,14371,14377,14386,14506]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  if (!global.alert) {
    global.alert = function (text) {
      _$$_REQUIRE(_dependencyMap[0]).alert('Alert', '' + text);
    };
  }
},14524,[10243]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var TurboModuleRegistry = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1]));

  var _default = TurboModuleRegistry.get('DialogManagerAndroid');

  exports.default = _default;
},14527,[14308,14341]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);

  var _NativeDialogManagerAndroid = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));

  function emptyCallback() {}

  module.exports = {
    alertWithArgs: function alertWithArgs(args, callback) {
      if (!_NativeDialogManagerAndroid.default) {
        return;
      }

      _NativeDialogManagerAndroid.default.showAlert(args, emptyCallback, callback || emptyCallback);
    }
  };
},14530,[14305,14527]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _require = _$$_REQUIRE(_dependencyMap[0]),
      polyfillObjectProperty = _require.polyfillObjectProperty;

  var navigator = global.navigator;

  if (navigator === undefined) {
    global.navigator = navigator = {};
  }

  polyfillObjectProperty(navigator, 'product', function () {
    return 'ReactNative';
  });
},14533,[14473]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  if (!global.RN$Bridgeless) {
    var BatchedBridge = _$$_REQUIRE(_dependencyMap[0]);

    BatchedBridge.registerLazyCallableModule('Systrace', function () {
      return _$$_REQUIRE(_dependencyMap[1]);
    });
    BatchedBridge.registerLazyCallableModule('JSTimers', function () {
      return _$$_REQUIRE(_dependencyMap[2]);
    });
    BatchedBridge.registerLazyCallableModule('HeapCapture', function () {
      return _$$_REQUIRE(_dependencyMap[3]);
    });
    BatchedBridge.registerLazyCallableModule('SamplingProfiler', function () {
      return _$$_REQUIRE(_dependencyMap[4]);
    });
    BatchedBridge.registerLazyCallableModule('RCTLog', function () {
      return _$$_REQUIRE(_dependencyMap[5]);
    });
    BatchedBridge.registerLazyCallableModule('RCTDeviceEventEmitter', function () {
      return _$$_REQUIRE(_dependencyMap[6]);
    });
    BatchedBridge.registerLazyCallableModule('RCTNativeAppEventEmitter', function () {
      return _$$_REQUIRE(_dependencyMap[7]);
    });
    BatchedBridge.registerLazyCallableModule('GlobalPerformanceLogger', function () {
      return _$$_REQUIRE(_dependencyMap[8]);
    });
    BatchedBridge.registerLazyCallableModule('JSDevSupportModule', function () {
      return _$$_REQUIRE(_dependencyMap[9]);
    });
    {
      BatchedBridge.registerCallableModule('HMRClient', _$$_REQUIRE(_dependencyMap[10]));
    }
  }
},14536,[10045,10054,10063,14539,10261,10264,10087,10267,14548,10276,14557]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);

  var _NativeHeapCapture = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));

  var HeapCapture = {
    captureHeap: function captureHeap(path) {
      var error = null;

      try {
        global.nativeCaptureHeap(path);
        console.log('HeapCapture.captureHeap succeeded: ' + path);
      } catch (e) {
        console.log('HeapCapture.captureHeap error: ' + e.toString());
        error = e.toString();
      }

      if (_NativeHeapCapture.default) {
        _NativeHeapCapture.default.captureComplete(path, error);
      }
    }
  };
  module.exports = HeapCapture;
},14539,[14305,14542]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var TurboModuleRegistry = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1]));

  var _default = TurboModuleRegistry.get('HeapCapture');

  exports.default = _default;
},14542,[14308,14341]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var TurboModuleRegistry = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1]));

  var _default = TurboModuleRegistry.get('JSCSamplingProfiler');

  exports.default = _default;
},14545,[14308,14341]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var createPerformanceLogger = _$$_REQUIRE(_dependencyMap[0]);

  var GlobalPerformanceLogger = createPerformanceLogger();
  module.exports = GlobalPerformanceLogger;
},14548,[14551]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var Systrace = _$$_REQUIRE(_dependencyMap[0]);

  var infoLog = _$$_REQUIRE(_dependencyMap[1]);

  var performanceNow = global.nativeQPLTimestamp || global.nativePerformanceNow || _$$_REQUIRE(_dependencyMap[2]);

  var _cookies = {};
  var PRINT_TO_CONSOLE = false;

  function createPerformanceLogger() {
    var result = {
      _timespans: {},
      _extras: {},
      _points: {},
      addTimespan: function addTimespan(key, lengthInMs, description) {
        if (this._timespans[key]) {
          return;
        }

        this._timespans[key] = {
          description: description,
          totalTime: lengthInMs
        };
      },
      startTimespan: function startTimespan(key, description) {
        if (this._timespans[key]) {
          return;
        }

        this._timespans[key] = {
          description: description,
          startTime: performanceNow()
        };
        _cookies[key] = Systrace.beginAsyncEvent(key);
      },
      stopTimespan: function stopTimespan(key) {
        var timespan = this._timespans[key];

        if (!timespan || !timespan.startTime) {
          return;
        }

        if (timespan.endTime) {
          return;
        }

        timespan.endTime = performanceNow();
        timespan.totalTime = timespan.endTime - (timespan.startTime || 0);
        Systrace.endAsyncEvent(key, _cookies[key]);
        delete _cookies[key];
      },
      clear: function clear() {
        this._timespans = {};
        this._extras = {};
        this._points = {};
      },
      clearCompleted: function clearCompleted() {
        for (var _key in this._timespans) {
          if (this._timespans[_key].totalTime) {
            delete this._timespans[_key];
          }
        }

        this._extras = {};
        this._points = {};
      },
      clearExceptTimespans: function clearExceptTimespans(keys) {
        this._timespans = Object.keys(this._timespans).reduce(function (previous, key) {
          if (keys.indexOf(key) !== -1) {
            previous[key] = this._timespans[key];
          }

          return previous;
        }, {});
        this._extras = {};
        this._points = {};
      },
      currentTimestamp: function currentTimestamp() {
        return performanceNow();
      },
      getTimespans: function getTimespans() {
        return this._timespans;
      },
      hasTimespan: function hasTimespan(key) {
        return !!this._timespans[key];
      },
      logTimespans: function logTimespans() {},
      addTimespans: function addTimespans(newTimespans, labels) {
        for (var ii = 0, l = newTimespans.length; ii < l; ii += 2) {
          var label = labels[ii / 2];
          this.addTimespan(label, newTimespans[ii + 1] - newTimespans[ii], label);
        }
      },
      setExtra: function setExtra(key, value) {
        if (this._extras[key]) {
          return;
        }

        this._extras[key] = value;
      },
      getExtras: function getExtras() {
        return this._extras;
      },
      removeExtra: function removeExtra(key) {
        var value = this._extras[key];
        delete this._extras[key];
        return value;
      },
      logExtras: function logExtras() {},
      markPoint: function markPoint(key, timestamp) {
        var _timestamp;

        if (this._points[key]) {
          return;
        }

        this._points[key] = (_timestamp = timestamp) != null ? _timestamp : performanceNow();
      },
      getPoints: function getPoints() {
        return this._points;
      },
      logPoints: function logPoints() {},
      logEverything: function logEverything() {
        this.logTimespans();
        this.logExtras();
        this.logPoints();
      }
    };
    return result;
  }

  module.exports = createPerformanceLogger;
},14551,[10054,10273,14491]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var TurboModuleRegistry = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1]));

  var _default = TurboModuleRegistry.get('JSDevSupport');

  exports.default = _default;
},14554,[14308,14341]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var HMRClientProdShim = {
    setup: function setup() {},
    enable: function enable() {
      console.error("Fast Refresh is disabled in JavaScript bundles built in production mode. Did you forget to run Metro?");
    },
    disable: function disable() {},
    registerBundle: function registerBundle() {},
    log: function log() {}
  };
  module.exports = HMRClientProdShim;
},14557,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  function __fetchSegment(segmentId, options, callback) {
    var SegmentFetcher = _$$_REQUIRE(_dependencyMap[0]).default;

    SegmentFetcher.fetchSegment(segmentId, options, function (errorObject) {
      if (errorObject) {
        var error = new Error(errorObject.message);
        error.code = errorObject.code;
        callback(error);
      }

      callback(null);
    });
  }

  global.__fetchSegment = __fetchSegment;

  function __getSegment(segmentId, options, callback) {
    var SegmentFetcher = _$$_REQUIRE(_dependencyMap[0]).default;

    if (!SegmentFetcher.getSegment) {
      throw new Error('SegmentFetcher.getSegment must be defined');
    }

    SegmentFetcher.getSegment(segmentId, options, function (errorObject, path) {
      if (errorObject) {
        var error = new Error(errorObject.message);
        error.code = errorObject.code;
        callback(error);
      }

      callback(null, path);
    });
  }

  global.__getSegment = __getSegment;
},14560,[14563]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var TurboModuleRegistry = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1]));

  var _default = TurboModuleRegistry.getEnforcing('SegmentFetcher');

  exports.default = _default;
},14563,[14308,14341]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  module.exports = {
    get BatchedBridge() {
      return _$$_REQUIRE(_dependencyMap[0]);
    },

    get ExceptionsManager() {
      return _$$_REQUIRE(_dependencyMap[1]);
    },

    get Platform() {
      return _$$_REQUIRE(_dependencyMap[2]);
    },

    get RCTEventEmitter() {
      return _$$_REQUIRE(_dependencyMap[3]);
    },

    get ReactNativeViewConfigRegistry() {
      return _$$_REQUIRE(_dependencyMap[4]);
    },

    get TextInputState() {
      return _$$_REQUIRE(_dependencyMap[5]);
    },

    get UIManager() {
      return _$$_REQUIRE(_dependencyMap[6]);
    },

    get deepDiffer() {
      return _$$_REQUIRE(_dependencyMap[7]);
    },

    get deepFreezeAndThrowOnMutationInDev() {
      return _$$_REQUIRE(_dependencyMap[8]);
    },

    get flattenStyle() {
      return _$$_REQUIRE(_dependencyMap[9]);
    },

    get ReactFiberErrorDialog() {
      return _$$_REQUIRE(_dependencyMap[10]);
    }

  };
},14566,[10045,10141,10066,10282,14569,10285,10279,10288,10057,10291,14572]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var invariant = _$$_REQUIRE(_dependencyMap[0]);

  var customBubblingEventTypes = {};
  var customDirectEventTypes = {};
  exports.customBubblingEventTypes = customBubblingEventTypes;
  exports.customDirectEventTypes = customDirectEventTypes;
  var viewConfigCallbacks = new Map();
  var viewConfigs = new Map();

  function processEventTypes(viewConfig) {
    var bubblingEventTypes = viewConfig.bubblingEventTypes,
        directEventTypes = viewConfig.directEventTypes;

    if (bubblingEventTypes != null) {
      for (var _topLevelType in bubblingEventTypes) {
        if (customBubblingEventTypes[_topLevelType] == null) {
          customBubblingEventTypes[_topLevelType] = bubblingEventTypes[_topLevelType];
        }
      }
    }

    if (directEventTypes != null) {
      for (var _topLevelType2 in directEventTypes) {
        if (customDirectEventTypes[_topLevelType2] == null) {
          customDirectEventTypes[_topLevelType2] = directEventTypes[_topLevelType2];
        }
      }
    }
  }

  exports.register = function (name, callback) {
    invariant(!viewConfigCallbacks.has(name), 'Tried to register two views with the same name %s', name);
    viewConfigCallbacks.set(name, callback);
    return name;
  };

  exports.get = function (name) {
    var viewConfig;

    if (!viewConfigs.has(name)) {
      var callback = viewConfigCallbacks.get(name);

      if (typeof callback !== 'function') {
        invariant(false, 'View config not found for name %s.%s', name, typeof name[0] === 'string' && /[a-z]/.test(name[0]) ? ' Make sure to start component names with a capital letter.' : '');
      }

      viewConfigCallbacks.set(name, null);
      viewConfig = callback();
      processEventTypes(viewConfig);
      viewConfigs.set(name, viewConfig);
    } else {
      viewConfig = viewConfigs.get(name);
    }

    invariant(viewConfig, 'View config not found for name %s', name);
    return viewConfig;
  };
},14569,[14326]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _ExceptionsManager = _$$_REQUIRE(_dependencyMap[0]);

  function showErrorDialog(capturedError) {
    var componentStack = capturedError.componentStack,
        error = capturedError.error;
    var errorToHandle;

    if (error instanceof Error) {
      errorToHandle = error;
    } else if (typeof error === 'string') {
      errorToHandle = new _ExceptionsManager.SyntheticError(error);
    } else {
      errorToHandle = new _ExceptionsManager.SyntheticError('Unspecified error');
    }

    try {
      errorToHandle.componentStack = componentStack;
    } catch (e) {}

    (0, _ExceptionsManager.handleException)(errorToHandle, false);
    return false;
  }

  module.exports = {
    showErrorDialog: showErrorDialog
  };
},14572,[10141]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  {
    module.exports = _$$_REQUIRE(_dependencyMap[0]);
  }
},14575,[14578]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  /** @license React v0.15.0
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _d = undefined,
      e = undefined,
      g = undefined,
      m = undefined,
      n = undefined;
  exports.unstable_now = undefined;
  exports.unstable_forceFrameRate = undefined;

  if ("undefined" === typeof window || "function" !== typeof MessageChannel) {
    var p = null,
        q = null,
        r = function r() {
      if (null !== p) try {
        var a = exports.unstable_now();
        p(true, a);
        p = null;
      } catch (b) {
        throw setTimeout(r, 0), b;
      }
    };

    exports.unstable_now = function () {
      return Date.now();
    };

    _d = function d(a) {
      null !== p ? setTimeout(_d, 0, a) : (p = a, setTimeout(r, 0));
    };

    e = function e(a, b) {
      q = setTimeout(a, b);
    };

    g = function g() {
      clearTimeout(q);
    };

    m = function m() {
      return false;
    };

    n = exports.unstable_forceFrameRate = function () {};
  } else {
    var t = window.performance,
        u = window.Date,
        v = window.setTimeout,
        w = window.clearTimeout,
        x = window.requestAnimationFrame,
        y = window.cancelAnimationFrame;
    "undefined" !== typeof console && ("function" !== typeof x && console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"), "function" !== typeof y && console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"));
    exports.unstable_now = "object" === typeof t && "function" === typeof t.now ? function () {
      return t.now();
    } : function () {
      return u.now();
    };
    var z = false,
        A = null,
        B = -1,
        C = -1,
        D = 33.33,
        E = -1,
        F = -1,
        G = 0,
        H = false;

    m = function m() {
      return exports.unstable_now() >= G;
    };

    n = function n() {};

    exports.unstable_forceFrameRate = function (a) {
      0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing framerates higher than 125 fps is not unsupported") : 0 < a ? (D = Math.floor(1E3 / a), H = true) : (D = 33.33, H = false);
    };

    var J = function J() {
      if (null !== A) {
        var a = exports.unstable_now(),
            b = 0 < G - a;

        try {
          A(b, a) || (A = null);
        } catch (c) {
          throw I.postMessage(null), c;
        }
      }
    },
        K = new MessageChannel(),
        I = K.port2;

    K.port1.onmessage = J;

    var L = function L(a) {
      if (null === A) F = E = -1, z = false;else {
        z = true;
        x(function (a) {
          w(B);
          L(a);
        });

        var b = function b() {
          G = exports.unstable_now() + D / 2;
          J();
          B = v(b, 3 * D);
        };

        B = v(b, 3 * D);

        if (-1 !== E && .1 < a - E) {
          var c = a - E;
          !H && -1 !== F && c < D && F < D && (D = c < F ? F : c, 8.33 > D && (D = 8.33));
          F = c;
        }

        E = a;
        G = a + D;
        I.postMessage(null);
      }
    };

    _d = function _d(a) {
      A = a;
      z || (z = true, x(function (a) {
        L(a);
      }));
    };

    e = function e(a, b) {
      C = v(function () {
        a(exports.unstable_now());
      }, b);
    };

    g = function g() {
      w(C);
      C = -1;
    };
  }

  var M = null,
      N = null,
      O = null,
      P = 3,
      Q = false,
      R = false,
      S = false;

  function T(a, b) {
    var c = a.next;
    if (c === a) M = null;else {
      a === M && (M = c);
      var f = a.previous;
      f.next = c;
      c.previous = f;
    }
    a.next = a.previous = null;
    c = a.callback;
    f = P;
    var l = O;
    P = a.priorityLevel;
    O = a;

    try {
      var h = a.expirationTime <= b;

      switch (P) {
        case 1:
          var k = c(h);
          break;

        case 2:
          k = c(h);
          break;

        case 3:
          k = c(h);
          break;

        case 4:
          k = c(h);
          break;

        case 5:
          k = c(h);
      }
    } catch (Z) {
      throw Z;
    } finally {
      P = f, O = l;
    }

    if ("function" === typeof k) if (b = a.expirationTime, a.callback = k, null === M) M = a.next = a.previous = a;else {
      k = null;
      h = M;

      do {
        if (b <= h.expirationTime) {
          k = h;
          break;
        }

        h = h.next;
      } while (h !== M);

      null === k ? k = M : k === M && (M = a);
      b = k.previous;
      b.next = k.previous = a;
      a.next = k;
      a.previous = b;
    }
  }

  function U(a) {
    if (null !== N && N.startTime <= a) {
      do {
        var b = N,
            c = b.next;
        if (b === c) N = null;else {
          N = c;
          var f = b.previous;
          f.next = c;
          c.previous = f;
        }
        b.next = b.previous = null;
        V(b, b.expirationTime);
      } while (null !== N && N.startTime <= a);
    }
  }

  function W(a) {
    S = false;
    U(a);
    R || (null !== M ? (R = true, _d(X)) : null !== N && e(W, N.startTime - a));
  }

  function X(a, b) {
    R = false;
    S && (S = false, g());
    U(b);
    Q = true;

    try {
      if (!a) for (; null !== M && M.expirationTime <= b;) {
        T(M, b), b = exports.unstable_now(), U(b);
      } else if (null !== M) {
        do {
          T(M, b), b = exports.unstable_now(), U(b);
        } while (null !== M && !m());
      }
      if (null !== M) return true;
      null !== N && e(W, N.startTime - b);
      return false;
    } finally {
      Q = false;
    }
  }

  function Y(a) {
    switch (a) {
      case 1:
        return -1;

      case 2:
        return 250;

      case 5:
        return 1073741823;

      case 4:
        return 1E4;

      default:
        return 5E3;
    }
  }

  function V(a, b) {
    if (null === M) M = a.next = a.previous = a;else {
      var c = null,
          f = M;

      do {
        if (b < f.expirationTime) {
          c = f;
          break;
        }

        f = f.next;
      } while (f !== M);

      null === c ? c = M : c === M && (M = a);
      b = c.previous;
      b.next = c.previous = a;
      a.next = c;
      a.previous = b;
    }
  }

  var aa = n;
  exports.unstable_ImmediatePriority = 1;
  exports.unstable_UserBlockingPriority = 2;
  exports.unstable_NormalPriority = 3;
  exports.unstable_IdlePriority = 5;
  exports.unstable_LowPriority = 4;

  exports.unstable_runWithPriority = function (a, b) {
    switch (a) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;

      default:
        a = 3;
    }

    var c = P;
    P = a;

    try {
      return b();
    } finally {
      P = c;
    }
  };

  exports.unstable_next = function (a) {
    switch (P) {
      case 1:
      case 2:
      case 3:
        var b = 3;
        break;

      default:
        b = P;
    }

    var c = P;
    P = b;

    try {
      return a();
    } finally {
      P = c;
    }
  };

  exports.unstable_scheduleCallback = function (a, b, c) {
    var f = exports.unstable_now();

    if ("object" === typeof c && null !== c) {
      var l = c.delay;
      l = "number" === typeof l && 0 < l ? f + l : f;
      c = "number" === typeof c.timeout ? c.timeout : Y(a);
    } else c = Y(a), l = f;

    c = l + c;
    a = {
      callback: b,
      priorityLevel: a,
      startTime: l,
      expirationTime: c,
      next: null,
      previous: null
    };

    if (l > f) {
      c = l;
      if (null === N) N = a.next = a.previous = a;else {
        b = null;
        var h = N;

        do {
          if (c < h.startTime) {
            b = h;
            break;
          }

          h = h.next;
        } while (h !== N);

        null === b ? b = N : b === N && (N = a);
        c = b.previous;
        c.next = b.previous = a;
        a.next = b;
        a.previous = c;
      }
      null === M && N === a && (S ? g() : S = true, e(W, l - f));
    } else V(a, c), R || Q || (R = true, _d(X));

    return a;
  };

  exports.unstable_cancelCallback = function (a) {
    var b = a.next;

    if (null !== b) {
      if (a === b) a === M ? M = null : a === N && (N = null);else {
        a === M ? M = b : a === N && (N = b);
        var c = a.previous;
        c.next = b;
        b.previous = c;
      }
      a.next = a.previous = null;
    }
  };

  exports.unstable_wrapCallback = function (a) {
    var b = P;
    return function () {
      var c = P;
      P = b;

      try {
        return a.apply(this, arguments);
      } finally {
        P = c;
      }
    };
  };

  exports.unstable_getCurrentPriorityLevel = function () {
    return P;
  };

  exports.unstable_shouldYield = function () {
    var a = exports.unstable_now();
    U(a);
    return null !== O && null !== M && M.startTime <= a && M.expirationTime < O.expirationTime || m();
  };

  exports.unstable_requestPaint = aa;

  exports.unstable_continueExecution = function () {
    R || Q || (R = true, _d(X));
  };

  exports.unstable_pauseExecution = function () {};

  exports.unstable_getFirstCallbackNode = function () {
    return M;
  };
},14578,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var ReactNativeViewViewConfigAndroid = {
    uiViewClassName: 'RCTView',
    bubblingEventTypes: {
      topSelect: {
        phasedRegistrationNames: {
          bubbled: 'onSelect',
          captured: 'onSelectCapture'
        }
      }
    },
    directEventTypes: {
      topClick: {
        registrationName: 'onClick'
      },
      topContentSizeChange: {
        registrationName: 'onContentSizeChange'
      },
      topLoadingError: {
        registrationName: 'onLoadingError'
      },
      topLoadingFinish: {
        registrationName: 'onLoadingFinish'
      },
      topLoadingStart: {
        registrationName: 'onLoadingStart'
      },
      topMessage: {
        registrationName: 'onMessage'
      },
      topMomentumScrollBegin: {
        registrationName: 'onMomentumScrollBegin'
      },
      topMomentumScrollEnd: {
        registrationName: 'onMomentumScrollEnd'
      },
      topScroll: {
        registrationName: 'onScroll'
      },
      topScrollBeginDrag: {
        registrationName: 'onScrollBeginDrag'
      },
      topScrollEndDrag: {
        registrationName: 'onScrollEndDrag'
      },
      topSelectionChange: {
        registrationName: 'onSelectionChange'
      }
    },
    validAttributes: {
      hasTVPreferredFocus: true,
      focusable: true,
      nativeBackgroundAndroid: true,
      nativeForegroundAndroid: true,
      nextFocusDown: true,
      nextFocusForward: true,
      nextFocusLeft: true,
      nextFocusRight: true,
      nextFocusUp: true
    }
  };
  module.exports = ReactNativeViewViewConfigAndroid;
},14581,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);

  var _objectSpread2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));

  var _verifyComponentAttributeEquivalence = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));

  var ReactNativeViewConfigRegistry = _$$_REQUIRE(_dependencyMap[3]);

  var ReactNativeViewViewConfig = _$$_REQUIRE(_dependencyMap[4]);

  function registerGeneratedViewConfig(componentName, viewConfig) {
    var mergedViewConfig = {
      uiViewClassName: componentName,
      Commands: {},
      bubblingEventTypes: (0, _objectSpread2.default)({}, ReactNativeViewViewConfig.bubblingEventTypes, viewConfig.bubblingEventTypes || {}),
      directEventTypes: (0, _objectSpread2.default)({}, ReactNativeViewViewConfig.directEventTypes, viewConfig.directEventTypes || {}),
      validAttributes: (0, _objectSpread2.default)({}, ReactNativeViewViewConfig.validAttributes, viewConfig.validAttributes || {})
    };
    ReactNativeViewConfigRegistry.register(componentName, function () {
      (0, _verifyComponentAttributeEquivalence.default)(componentName, mergedViewConfig);
      return mergedViewConfig;
    });
  }

  module.exports = registerGeneratedViewConfig;
},14584,[14305,14314,14587,14569,14590]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.lefthandObjectDiff = lefthandObjectDiff;
  exports.getConfigWithoutViewProps = getConfigWithoutViewProps;
  exports.stringifyViewConfig = stringifyViewConfig;
  exports.default = undefined;

  var _ReactNativeViewViewConfig = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));

  var getNativeComponentAttributes = _$$_REQUIRE(_dependencyMap[2]);

  var IGNORED_KEYS = ['transform', 'hitSlop'];

  function verifyComponentAttributeEquivalence(componentName, config) {}

  function lefthandObjectDiff(leftObj, rightObj) {
    var differentKeys = {};

    function compare(leftItem, rightItem, key) {
      if (typeof leftItem !== typeof rightItem && leftItem != null) {
        differentKeys[key] = rightItem;
        return;
      }

      if (typeof leftItem === 'object') {
        var objDiff = lefthandObjectDiff(leftItem, rightItem);

        if (Object.keys(objDiff).length > 1) {
          differentKeys[key] = objDiff;
        }

        return;
      }

      if (leftItem !== rightItem) {
        differentKeys[key] = rightItem;
        return;
      }
    }

    for (var key in leftObj) {
      if (IGNORED_KEYS.includes(key)) {
        continue;
      }

      if (!rightObj) {
        differentKeys[key] = {};
      } else if (leftObj.hasOwnProperty(key)) {
        compare(leftObj[key], rightObj[key], key);
      }
    }

    return differentKeys;
  }

  function getConfigWithoutViewProps(viewConfig, propName) {
    if (!viewConfig[propName]) {
      return {};
    }

    return Object.keys(viewConfig[propName]).filter(function (prop) {
      return !_ReactNativeViewViewConfig.default[propName][prop];
    }).reduce(function (obj, prop) {
      obj[prop] = viewConfig[propName][prop];
      return obj;
    }, {});
  }

  function stringifyViewConfig(viewConfig) {
    return JSON.stringify(viewConfig, function (key, val) {
      if (typeof val === 'function') {
        return "\u0192 " + val.name;
      }

      return val;
    }, 2);
  }

  var _default = verifyComponentAttributeEquivalence;
  exports.default = _default;
},14587,[14305,14590,14593]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);

  var _objectSpread2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));

  var _ReactNativeViewViewConfigAndroid = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));

  var ReactNativeViewConfig = {
    uiViewClassName: 'RCTView',
    baseModuleName: null,
    Manager: 'ViewManager',
    Commands: {},
    Constants: {},
    bubblingEventTypes: (0, _objectSpread2.default)({}, _ReactNativeViewViewConfigAndroid.default.bubblingEventTypes, {
      topBlur: {
        phasedRegistrationNames: {
          bubbled: 'onBlur',
          captured: 'onBlurCapture'
        }
      },
      topChange: {
        phasedRegistrationNames: {
          bubbled: 'onChange',
          captured: 'onChangeCapture'
        }
      },
      topEndEditing: {
        phasedRegistrationNames: {
          bubbled: 'onEndEditing',
          captured: 'onEndEditingCapture'
        }
      },
      topFocus: {
        phasedRegistrationNames: {
          bubbled: 'onFocus',
          captured: 'onFocusCapture'
        }
      },
      topKeyPress: {
        phasedRegistrationNames: {
          bubbled: 'onKeyPress',
          captured: 'onKeyPressCapture'
        }
      },
      topPress: {
        phasedRegistrationNames: {
          bubbled: 'onPress',
          captured: 'onPressCapture'
        }
      },
      topSubmitEditing: {
        phasedRegistrationNames: {
          bubbled: 'onSubmitEditing',
          captured: 'onSubmitEditingCapture'
        }
      },
      topTouchCancel: {
        phasedRegistrationNames: {
          bubbled: 'onTouchCancel',
          captured: 'onTouchCancelCapture'
        }
      },
      topTouchEnd: {
        phasedRegistrationNames: {
          bubbled: 'onTouchEnd',
          captured: 'onTouchEndCapture'
        }
      },
      topTouchMove: {
        phasedRegistrationNames: {
          bubbled: 'onTouchMove',
          captured: 'onTouchMoveCapture'
        }
      },
      topTouchStart: {
        phasedRegistrationNames: {
          bubbled: 'onTouchStart',
          captured: 'onTouchStartCapture'
        }
      }
    }),
    directEventTypes: (0, _objectSpread2.default)({}, _ReactNativeViewViewConfigAndroid.default.directEventTypes, {
      topAccessibilityAction: {
        registrationName: 'onAccessibilityAction'
      },
      topAccessibilityEscape: {
        registrationName: 'onAccessibilityEscape'
      },
      topAccessibilityTap: {
        registrationName: 'onAccessibilityTap'
      },
      topLayout: {
        registrationName: 'onLayout'
      },
      topMagicTap: {
        registrationName: 'onMagicTap'
      },
      onGestureHandlerEvent: {
        registrationName: 'onGestureHandlerEvent'
      },
      onGestureHandlerStateChange: {
        registrationName: 'onGestureHandlerStateChange'
      }
    }),
    validAttributes: (0, _objectSpread2.default)({}, _ReactNativeViewViewConfigAndroid.default.validAttributes, {
      accessibilityActions: true,
      accessibilityElementsHidden: true,
      accessibilityHint: true,
      accessibilityIgnoresInvertColors: true,
      accessibilityLabel: true,
      accessibilityLiveRegion: true,
      accessibilityRole: true,
      accessibilityStates: true,
      accessibilityState: true,
      accessibilityViewIsModal: true,
      accessible: true,
      alignContent: true,
      alignItems: true,
      alignSelf: true,
      aspectRatio: true,
      backfaceVisibility: true,
      backgroundColor: {
        process: _$$_REQUIRE(_dependencyMap[3])
      },
      borderBottomColor: {
        process: _$$_REQUIRE(_dependencyMap[3])
      },
      borderBottomEndRadius: true,
      borderBottomLeftRadius: true,
      borderBottomRightRadius: true,
      borderBottomStartRadius: true,
      borderBottomWidth: true,
      borderColor: {
        process: _$$_REQUIRE(_dependencyMap[3])
      },
      borderEndColor: {
        process: _$$_REQUIRE(_dependencyMap[3])
      },
      borderEndWidth: true,
      borderLeftColor: {
        process: _$$_REQUIRE(_dependencyMap[3])
      },
      borderLeftWidth: true,
      borderRadius: true,
      borderRightColor: {
        process: _$$_REQUIRE(_dependencyMap[3])
      },
      borderRightWidth: true,
      borderStartColor: {
        process: _$$_REQUIRE(_dependencyMap[3])
      },
      borderStartWidth: true,
      borderStyle: true,
      borderTopColor: {
        process: _$$_REQUIRE(_dependencyMap[3])
      },
      borderTopEndRadius: true,
      borderTopLeftRadius: true,
      borderTopRightRadius: true,
      borderTopStartRadius: true,
      borderTopWidth: true,
      borderWidth: true,
      bottom: true,
      clickable: true,
      collapsable: true,
      direction: true,
      display: true,
      elevation: true,
      end: true,
      flex: true,
      flexBasis: true,
      flexDirection: true,
      flexGrow: true,
      flexShrink: true,
      flexWrap: true,
      height: true,
      hitSlop: {
        diff: _$$_REQUIRE(_dependencyMap[4])
      },
      importantForAccessibility: true,
      justifyContent: true,
      left: true,
      margin: true,
      marginBottom: true,
      marginEnd: true,
      marginHorizontal: true,
      marginLeft: true,
      marginRight: true,
      marginStart: true,
      marginTop: true,
      marginVertical: true,
      maxHeight: true,
      maxWidth: true,
      minHeight: true,
      minWidth: true,
      nativeID: true,
      needsOffscreenAlphaCompositing: true,
      onAccessibilityAction: true,
      onAccessibilityEscape: true,
      onAccessibilityTap: true,
      onLayout: true,
      onMagicTap: true,
      opacity: true,
      overflow: true,
      padding: true,
      paddingBottom: true,
      paddingEnd: true,
      paddingHorizontal: true,
      paddingLeft: true,
      paddingRight: true,
      paddingStart: true,
      paddingTop: true,
      paddingVertical: true,
      pointerEvents: true,
      position: true,
      removeClippedSubviews: true,
      renderToHardwareTextureAndroid: true,
      right: true,
      rotation: true,
      scaleX: true,
      scaleY: true,
      shadowColor: {
        process: _$$_REQUIRE(_dependencyMap[3])
      },
      shadowOffset: {
        diff: _$$_REQUIRE(_dependencyMap[5])
      },
      shadowOpacity: true,
      shadowRadius: true,
      shouldRasterizeIOS: true,
      start: true,
      style: {
        alignContent: true,
        alignItems: true,
        alignSelf: true,
        aspectRatio: true,
        backfaceVisibility: true,
        backgroundColor: {
          process: _$$_REQUIRE(_dependencyMap[3])
        },
        borderBottomColor: {
          process: _$$_REQUIRE(_dependencyMap[3])
        },
        borderBottomEndRadius: true,
        borderBottomLeftRadius: true,
        borderBottomRightRadius: true,
        borderBottomStartRadius: true,
        borderBottomWidth: true,
        borderColor: {
          process: _$$_REQUIRE(_dependencyMap[3])
        },
        borderEndColor: {
          process: _$$_REQUIRE(_dependencyMap[3])
        },
        borderEndWidth: true,
        borderLeftColor: {
          process: _$$_REQUIRE(_dependencyMap[3])
        },
        borderLeftWidth: true,
        borderRadius: true,
        borderRightColor: {
          process: _$$_REQUIRE(_dependencyMap[3])
        },
        borderRightWidth: true,
        borderStartColor: {
          process: _$$_REQUIRE(_dependencyMap[3])
        },
        borderStartWidth: true,
        borderStyle: true,
        borderTopColor: {
          process: _$$_REQUIRE(_dependencyMap[3])
        },
        borderTopEndRadius: true,
        borderTopLeftRadius: true,
        borderTopRightRadius: true,
        borderTopStartRadius: true,
        borderTopWidth: true,
        borderWidth: true,
        bottom: true,
        color: {
          process: _$$_REQUIRE(_dependencyMap[3])
        },
        decomposedMatrix: true,
        direction: true,
        display: true,
        elevation: true,
        end: true,
        flex: true,
        flexBasis: true,
        flexDirection: true,
        flexGrow: true,
        flexShrink: true,
        flexWrap: true,
        fontFamily: true,
        fontSize: true,
        fontStyle: true,
        fontVariant: true,
        fontWeight: true,
        height: true,
        includeFontPadding: true,
        justifyContent: true,
        left: true,
        letterSpacing: true,
        lineHeight: true,
        margin: true,
        marginBottom: true,
        marginEnd: true,
        marginHorizontal: true,
        marginLeft: true,
        marginRight: true,
        marginStart: true,
        marginTop: true,
        marginVertical: true,
        maxHeight: true,
        maxWidth: true,
        minHeight: true,
        minWidth: true,
        opacity: true,
        overflow: true,
        overlayColor: {
          process: _$$_REQUIRE(_dependencyMap[3])
        },
        padding: true,
        paddingBottom: true,
        paddingEnd: true,
        paddingHorizontal: true,
        paddingLeft: true,
        paddingRight: true,
        paddingStart: true,
        paddingTop: true,
        paddingVertical: true,
        position: true,
        resizeMode: true,
        right: true,
        rotation: true,
        scaleX: true,
        scaleY: true,
        shadowColor: {
          process: _$$_REQUIRE(_dependencyMap[3])
        },
        shadowOffset: {
          diff: _$$_REQUIRE(_dependencyMap[5])
        },
        shadowOpacity: true,
        shadowRadius: true,
        start: true,
        textAlign: true,
        textAlignVertical: true,
        textDecorationColor: {
          process: _$$_REQUIRE(_dependencyMap[3])
        },
        textDecorationLine: true,
        textDecorationStyle: true,
        textShadowColor: {
          process: _$$_REQUIRE(_dependencyMap[3])
        },
        textShadowOffset: true,
        textShadowRadius: true,
        textTransform: true,
        tintColor: {
          process: _$$_REQUIRE(_dependencyMap[3])
        },
        top: true,
        transform: {
          diff: _$$_REQUIRE(_dependencyMap[6])
        },
        transformMatrix: true,
        translateX: true,
        translateY: true,
        width: true,
        writingDirection: true,
        zIndex: true
      },
      testID: true,
      top: true,
      transform: {
        diff: _$$_REQUIRE(_dependencyMap[6])
      },
      translateX: true,
      translateY: true,
      width: true,
      zIndex: true
    })
  };
  module.exports = ReactNativeViewConfig;
},14590,[14305,14314,14581,10393,10408,10402,10411]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _extends = _$$_REQUIRE(_dependencyMap[0]);

  var _objectSpread = _$$_REQUIRE(_dependencyMap[1]);

  var ReactNativeStyleAttributes = _$$_REQUIRE(_dependencyMap[2]);

  var UIManager = _$$_REQUIRE(_dependencyMap[3]);

  var insetsDiffer = _$$_REQUIRE(_dependencyMap[4]);

  var invariant = _$$_REQUIRE(_dependencyMap[5]);

  var matricesDiffer = _$$_REQUIRE(_dependencyMap[6]);

  var pointsDiffer = _$$_REQUIRE(_dependencyMap[7]);

  var processColor = _$$_REQUIRE(_dependencyMap[8]);

  var processColorArray = _$$_REQUIRE(_dependencyMap[9]);

  var resolveAssetSource = _$$_REQUIRE(_dependencyMap[10]);

  var sizesDiffer = _$$_REQUIRE(_dependencyMap[11]);

  var warning = _$$_REQUIRE(_dependencyMap[12]);

  function getNativeComponentAttributes(uiViewClassName) {
    var viewConfig = UIManager.getViewManagerConfig(uiViewClassName);
    invariant(viewConfig != null && viewConfig.NativeProps != null, 'requireNativeComponent: "%s" was not found in the UIManager.', uiViewClassName);
    var baseModuleName = viewConfig.baseModuleName,
        bubblingEventTypes = viewConfig.bubblingEventTypes,
        directEventTypes = viewConfig.directEventTypes;
    var nativeProps = viewConfig.NativeProps;

    while (baseModuleName) {
      var baseModule = UIManager.getViewManagerConfig(baseModuleName);

      if (!baseModule) {
        warning(false, 'Base module "%s" does not exist', baseModuleName);
        baseModuleName = null;
      } else {
        bubblingEventTypes = _objectSpread({}, baseModule.bubblingEventTypes, bubblingEventTypes);
        directEventTypes = _objectSpread({}, baseModule.directEventTypes, directEventTypes);
        nativeProps = _objectSpread({}, baseModule.NativeProps, nativeProps);
        baseModuleName = baseModule.baseModuleName;
      }
    }

    var validAttributes = {};

    for (var key in nativeProps) {
      var typeName = nativeProps[key];
      var diff = getDifferForType(typeName);
      var process = getProcessorForType(typeName);
      validAttributes[key] = diff == null && process == null ? true : {
        diff: diff,
        process: process
      };
    }

    validAttributes.style = ReactNativeStyleAttributes;

    _extends(viewConfig, {
      uiViewClassName: uiViewClassName,
      validAttributes: validAttributes,
      bubblingEventTypes: bubblingEventTypes,
      directEventTypes: directEventTypes
    });

    if (!hasAttachedDefaultEventTypes) {
      attachDefaultEventTypes(viewConfig);
      hasAttachedDefaultEventTypes = true;
    }

    return viewConfig;
  }

  var hasAttachedDefaultEventTypes = false;

  function attachDefaultEventTypes(viewConfig) {
    var constants = UIManager.getConstants();

    if (constants.ViewManagerNames || constants.LazyViewManagersEnabled) {
      viewConfig = merge(viewConfig, UIManager.getDefaultEventTypes());
    } else {
      viewConfig.bubblingEventTypes = merge(viewConfig.bubblingEventTypes, constants.genericBubblingEventTypes);
      viewConfig.directEventTypes = merge(viewConfig.directEventTypes, constants.genericDirectEventTypes);
    }
  }

  function merge(destination, source) {
    if (!source) {
      return destination;
    }

    if (!destination) {
      return source;
    }

    for (var key in source) {
      if (!source.hasOwnProperty(key)) {
        continue;
      }

      var sourceValue = source[key];

      if (destination.hasOwnProperty(key)) {
        var destinationValue = destination[key];

        if (typeof sourceValue === 'object' && typeof destinationValue === 'object') {
          sourceValue = merge(destinationValue, sourceValue);
        }
      }

      destination[key] = sourceValue;
    }

    return destination;
  }

  function getDifferForType(typeName) {
    switch (typeName) {
      case 'CATransform3D':
        return matricesDiffer;

      case 'CGPoint':
        return pointsDiffer;

      case 'CGSize':
        return sizesDiffer;

      case 'UIEdgeInsets':
        return insetsDiffer;
    }

    return null;
  }

  function getProcessorForType(typeName) {
    switch (typeName) {
      case 'CGColor':
      case 'UIColor':
        return processColor;

      case 'CGColorArray':
      case 'UIColorArray':
        return processColorArray;

      case 'CGImage':
      case 'UIImage':
      case 'RCTImageSource':
        return resolveAssetSource;

      case 'Color':
        return processColor;

      case 'ColorArray':
        return processColorArray;
    }

    return null;
  }

  module.exports = getNativeComponentAttributes;
},14593,[14344,14314,10378,10279,10408,14326,10411,10414,10393,14596,10417,10402,14332]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var processColor = _$$_REQUIRE(_dependencyMap[0]);

  function processColorArray(colors) {
    return colors == null ? null : colors.map(processColor);
  }

  module.exports = processColorArray;
},14596,[10393]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var androidScaleSuffix = {
    '0.75': 'ldpi',
    '1': 'mdpi',
    '1.5': 'hdpi',
    '2': 'xhdpi',
    '3': 'xxhdpi',
    '4': 'xxxhdpi'
  };

  function getAndroidAssetSuffix(scale) {
    if (scale.toString() in androidScaleSuffix) {
      return androidScaleSuffix[scale.toString()];
    }

    throw new Error('no such scale ' + scale.toString());
  }

  var drawableFileTypes = new Set(['gif', 'jpeg', 'jpg', 'png', 'svg', 'webp', 'xml']);

  function getAndroidResourceFolderName(asset, scale) {
    if (!drawableFileTypes.has(asset.type)) {
      return 'raw';
    }

    var suffix = getAndroidAssetSuffix(scale);

    if (!suffix) {
      throw new Error("Don't know which android drawable suffix to use for scale: " + scale + '\nAsset: ' + JSON.stringify(asset, null, '\t') + '\nPossible scales are:' + JSON.stringify(androidScaleSuffix, null, '\t'));
    }

    var androidFolder = 'drawable-' + suffix;
    return androidFolder;
  }

  function getAndroidResourceIdentifier(asset) {
    var folderPath = getBasePath(asset);
    return (folderPath + '/' + asset.name).toLowerCase().replace(/\//g, '_').replace(/([^a-z0-9_])/g, '').replace(/^assets_/, '');
  }

  function getBasePath(asset) {
    var basePath = asset.httpServerLocation;

    if (basePath[0] === '/') {
      basePath = basePath.substr(1);
    }

    return basePath;
  }

  module.exports = {
    getAndroidAssetSuffix: getAndroidAssetSuffix,
    getAndroidResourceFolderName: getAndroidResourceFolderName,
    getAndroidResourceIdentifier: getAndroidResourceIdentifier,
    getBasePath: getBasePath
  };
},14599,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var TurboModuleRegistry = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1]));

  var _default = TurboModuleRegistry.getEnforcing('SourceCode');

  exports.default = _default;
},14602,[14308,14341]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _codegenNativeComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));

  var _default = (0, _codegenNativeComponent.default)('AndroidProgressBar');

  exports.default = _default;
},14605,[14305,14608]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _requireNativeComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));

  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);

  function codegenNativeComponent(componentName, options) {
    var componentNameInUse = options && options.paperComponentName ? options.paperComponentName : componentName;

    if (options != null && options.paperComponentNameDeprecated != null) {
      if (_reactNative.UIManager.getViewManagerConfig(componentName)) {
        componentNameInUse = componentName;
      } else if (options.paperComponentNameDeprecated != null && _reactNative.UIManager.getViewManagerConfig(options.paperComponentNameDeprecated)) {
        componentNameInUse = options.paperComponentNameDeprecated;
      } else {
        throw new Error("Failed to find native component for either " + componentName + " or " + (options.paperComponentNameDeprecated || '(unknown)'));
      }
    }

    return (0, _requireNativeComponent.default)(componentNameInUse);
  }

  var _default = codegenNativeComponent;
  exports.default = _default;
},14608,[14305,10372,10033]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var DeprecatedColorPropType = _$$_REQUIRE(_dependencyMap[0]);

  var DeprecatedEdgeInsetsPropType = _$$_REQUIRE(_dependencyMap[1]);

  var DeprecatedStyleSheetPropType = _$$_REQUIRE(_dependencyMap[2]);

  var PropTypes = _$$_REQUIRE(_dependencyMap[3]);

  var DeprecatedTextStylePropTypes = _$$_REQUIRE(_dependencyMap[4]);

  var stylePropType = DeprecatedStyleSheetPropType(DeprecatedTextStylePropTypes);
  var DataDetectorTypes = ['phoneNumber', 'link', 'email', 'none', 'all'];
  module.exports = {
    ellipsizeMode: PropTypes.oneOf(['head', 'middle', 'tail', 'clip']),
    numberOfLines: PropTypes.number,
    textBreakStrategy: PropTypes.oneOf(['simple', 'highQuality', 'balanced']),
    onLayout: PropTypes.func,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    pressRetentionOffset: DeprecatedEdgeInsetsPropType,
    selectable: PropTypes.bool,
    selectionColor: DeprecatedColorPropType,
    suppressHighlighting: PropTypes.bool,
    style: stylePropType,
    testID: PropTypes.string,
    nativeID: PropTypes.string,
    allowFontScaling: PropTypes.bool,
    maxFontSizeMultiplier: PropTypes.number,
    accessible: PropTypes.bool,
    adjustsFontSizeToFit: PropTypes.bool,
    minimumFontScale: PropTypes.number,
    disabled: PropTypes.bool,
    dataDetectorType: PropTypes.oneOf(DataDetectorTypes)
  };
},14611,[14419,14614,14617,10318,14434]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var PropTypes = _$$_REQUIRE(_dependencyMap[0]);

  var DeprecatedEdgeInsetsPropType = PropTypes.shape({
    top: PropTypes.number,
    left: PropTypes.number,
    bottom: PropTypes.number,
    right: PropTypes.number
  });
  module.exports = DeprecatedEdgeInsetsPropType;
},14614,[10318]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var deprecatedCreateStrictShapeTypeChecker = _$$_REQUIRE(_dependencyMap[0]);

  var flattenStyle = _$$_REQUIRE(_dependencyMap[1]);

  function DeprecatedStyleSheetPropType(shape) {
    var shapePropType = deprecatedCreateStrictShapeTypeChecker(shape);
    return function (props, propName, componentName, location) {
      var newProps = props;

      if (props[propName]) {
        newProps = {};
        newProps[propName] = flattenStyle(props[propName]);
      }

      for (var _len = arguments.length, rest = new Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
        rest[_key - 4] = arguments[_key];
      }

      return shapePropType.apply(undefined, [newProps, propName, componentName, location].concat(rest));
    };
  }

  module.exports = DeprecatedStyleSheetPropType;
},14617,[14620,10291]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var invariant = _$$_REQUIRE(_dependencyMap[0]);

  var merge = _$$_REQUIRE(_dependencyMap[1]);

  function deprecatedCreateStrictShapeTypeChecker(shapeTypes) {
    function checkType(isRequired, props, propName, componentName, location) {
      if (!props[propName]) {
        if (isRequired) {
          invariant(false, "Required object `" + propName + "` was not specified in " + ("`" + componentName + "`."));
        }

        return;
      }

      var propValue = props[propName];
      var propType = typeof propValue;
      var locationName = location || '(unknown)';

      if (propType !== 'object') {
        invariant(false, "Invalid " + locationName + " `" + propName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
      }

      var allKeys = merge(props[propName], shapeTypes);

      for (var _len = arguments.length, rest = new Array(_len > 5 ? _len - 5 : 0), _key = 5; _key < _len; _key++) {
        rest[_key - 5] = arguments[_key];
      }

      for (var _key2 in allKeys) {
        var checker = shapeTypes[_key2];

        if (!checker) {
          invariant(false, "Invalid props." + propName + " key `" + _key2 + "` supplied to `" + componentName + "`." + '\nBad object: ' + JSON.stringify(props[propName], null, '  ') + '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  '));
        }

        var error = checker.apply(undefined, [propValue, _key2, componentName, location].concat(rest));

        if (error) {
          invariant(false, error.message + '\nBad object: ' + JSON.stringify(props[propName], null, '  '));
        }
      }
    }

    function chainedCheckType(props, propName, componentName, location) {
      for (var _len2 = arguments.length, rest = new Array(_len2 > 4 ? _len2 - 4 : 0), _key3 = 4; _key3 < _len2; _key3++) {
        rest[_key3 - 4] = arguments[_key3];
      }

      return checkType.apply(undefined, [false, props, propName, componentName, location].concat(rest));
    }

    chainedCheckType.isRequired = checkType.bind(null, true);
    return chainedCheckType;
  }

  module.exports = deprecatedCreateStrictShapeTypeChecker;
},14620,[14326,10339]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var React = _$$_REQUIRE(_dependencyMap[0]);

  module.exports = React.createContext(false);
},14623,[10297]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);

  var _NativeTVNavigationEventEmitter = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));

  var Platform = _$$_REQUIRE(_dependencyMap[2]);

  var NativeEventEmitter = _$$_REQUIRE(_dependencyMap[3]);

  function TVEventHandler() {
    this.__nativeTVNavigationEventListener = null;
    this.__nativeTVNavigationEventEmitter = null;
  }

  TVEventHandler.prototype.enable = function (component, callback) {
    this.__nativeTVNavigationEventEmitter = new NativeEventEmitter(_NativeTVNavigationEventEmitter.default);
    this.__nativeTVNavigationEventListener = this.__nativeTVNavigationEventEmitter.addListener('onHWKeyEvent', function (data) {
      if (callback) {
        callback(component, data);
      }
    });
  };

  TVEventHandler.prototype.disable = function () {
    if (this.__nativeTVNavigationEventListener) {
      this.__nativeTVNavigationEventListener.remove();

      delete this.__nativeTVNavigationEventListener;
    }

    if (this.__nativeTVNavigationEventEmitter) {
      delete this.__nativeTVNavigationEventEmitter;
    }
  };

  module.exports = TVEventHandler;
},14626,[14305,14629,10066,10198]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var TurboModuleRegistry = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1]));

  var _default = TurboModuleRegistry.get('TVNavigationEventEmitter');

  exports.default = _default;
},14629,[14308,14341]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var invariant = _$$_REQUIRE(_dependencyMap[0]);

  var keyMirror = function keyMirror(obj) {
    var ret = {};
    var key;
    !(obj instanceof Object && !Array.isArray(obj)) ? invariant(false) : undefined;

    for (key in obj) {
      if (!obj.hasOwnProperty(key)) {
        continue;
      }

      ret[key] = key;
    }

    return ret;
  };

  module.exports = keyMirror;
},14632,[14635]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var validateFormat = function (format) {
    if (format === undefined) {
      throw new Error('invariant(...): Second argument must be a string.');
    }
  };

  function invariant(condition, format) {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    validateFormat(format);

    if (!condition) {
      var error;

      if (format === undefined) {
        error = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
      } else {
        var argIndex = 0;
        error = new Error(format.replace(/%s/g, function () {
          return String(args[argIndex++]);
        }));
        error.name = 'Invariant Violation';
      }

      error.framesToPop = 1;
      throw error;
    }
  }

  module.exports = invariant;
},14635,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  function nullthrows(x, message) {
    if (x != null) {
      return x;
    }

    var error = new Error(message !== undefined ? message : 'Got unexpected ' + x);
    error.framesToPop = 1;
    throw error;
  }

  module.exports = nullthrows;
  module.exports.default = nullthrows;
  Object.defineProperty(module.exports, '__esModule', {
    value: true
  });
},14638,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  module.exports = {
    DeprecatedAccessibilityRoles: ['none', 'button', 'link', 'search', 'image', 'keyboardkey', 'text', 'adjustable', 'imagebutton', 'header', 'summary', 'alert', 'checkbox', 'combobox', 'menu', 'menubar', 'menuitem', 'progressbar', 'radio', 'radiogroup', 'scrollbar', 'spinbutton', 'switch', 'tab', 'tablist', 'timer', 'toolbar'],
    DeprecatedAccessibilityStates: ['selected', 'disabled', 'checked', 'unchecked', 'busy', 'expanded', 'collapsed', 'hasPopup']
  };
},14641,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _objectSpread = _$$_REQUIRE(_dependencyMap[0]);

  var _require = _$$_REQUIRE(_dependencyMap[1]),
      AnimatedEvent = _require.AnimatedEvent,
      attachNativeEvent = _require.attachNativeEvent;

  var AnimatedImplementation = _$$_REQUIRE(_dependencyMap[2]);

  var AnimatedInterpolation = _$$_REQUIRE(_dependencyMap[3]);

  var AnimatedNode = _$$_REQUIRE(_dependencyMap[4]);

  var AnimatedProps = _$$_REQUIRE(_dependencyMap[5]);

  var AnimatedValue = _$$_REQUIRE(_dependencyMap[6]);

  var AnimatedValueXY = _$$_REQUIRE(_dependencyMap[7]);

  var createAnimatedComponent = _$$_REQUIRE(_dependencyMap[8]);

  var emptyAnimation = {
    start: function start() {},
    stop: function stop() {},
    reset: function reset() {},
    _startNativeLoop: function _startNativeLoop() {},
    _isUsingNativeDriver: function _isUsingNativeDriver() {
      return false;
    }
  };

  var spring = function spring(value, config) {
    var anyValue = value;
    return _objectSpread({}, emptyAnimation, {
      start: function start(callback) {
        anyValue.setValue(config.toValue);
        callback && callback({
          finished: true
        });
      }
    });
  };

  var timing = function timing(value, config) {
    var anyValue = value;
    return _objectSpread({}, emptyAnimation, {
      start: function start(callback) {
        anyValue.setValue(config.toValue);
        callback && callback({
          finished: true
        });
      }
    });
  };

  var decay = function decay(value, config) {
    return emptyAnimation;
  };

  var sequence = function sequence(animations) {
    return emptyAnimation;
  };

  var parallel = function parallel(animations, config) {
    return emptyAnimation;
  };

  var delay = function delay(time) {
    return emptyAnimation;
  };

  var stagger = function stagger(time, animations) {
    return emptyAnimation;
  };

  var loop = function loop(animation) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$iterations = _ref.iterations,
        iterations = _ref$iterations === undefined ? -1 : _ref$iterations;

    return emptyAnimation;
  };

  var event = function event(argMapping, config) {
    return null;
  };

  module.exports = {
    Value: AnimatedValue,
    ValueXY: AnimatedValueXY,
    Interpolation: AnimatedInterpolation,
    Node: AnimatedNode,
    decay: decay,
    timing: timing,
    spring: spring,
    add: AnimatedImplementation.add,
    subtract: AnimatedImplementation.subtract,
    divide: AnimatedImplementation.divide,
    multiply: AnimatedImplementation.multiply,
    modulo: AnimatedImplementation.modulo,
    diffClamp: AnimatedImplementation.diffClamp,
    delay: delay,
    sequence: sequence,
    parallel: parallel,
    stagger: stagger,
    loop: loop,
    event: event,
    createAnimatedComponent: createAnimatedComponent,
    attachNativeEvent: attachNativeEvent,
    forkEvent: AnimatedImplementation.forkEvent,
    unforkEvent: AnimatedImplementation.unforkEvent,
    Event: AnimatedEvent,
    __PropsOnlyForTests: AnimatedProps
  };
},14644,[14314,10528,10525,10534,10537,10567,10531,10579,10603]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var TurboModuleRegistry = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1]));

  var _default = TurboModuleRegistry.get('NativeAnimatedModule');

  exports.default = _default;
},14647,[14308,14341]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _classCallCheck = _$$_REQUIRE(_dependencyMap[0]);

  var _createClass = _$$_REQUIRE(_dependencyMap[1]);

  var _possibleConstructorReturn = _$$_REQUIRE(_dependencyMap[2]);

  var _getPrototypeOf = _$$_REQUIRE(_dependencyMap[3]);

  var _get = _$$_REQUIRE(_dependencyMap[4]);

  var _inherits = _$$_REQUIRE(_dependencyMap[5]);

  var AnimatedInterpolation = _$$_REQUIRE(_dependencyMap[6]);

  var AnimatedNode = _$$_REQUIRE(_dependencyMap[7]);

  var AnimatedValue = _$$_REQUIRE(_dependencyMap[8]);

  var AnimatedWithChildren = _$$_REQUIRE(_dependencyMap[9]);

  var AnimatedSubtraction = function (_AnimatedWithChildren) {
    _inherits(AnimatedSubtraction, _AnimatedWithChildren);

    function AnimatedSubtraction(a, b) {
      var _this;

      _classCallCheck(this, AnimatedSubtraction);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(AnimatedSubtraction).call(this));
      _this._a = typeof a === 'number' ? new AnimatedValue(a) : a;
      _this._b = typeof b === 'number' ? new AnimatedValue(b) : b;
      return _this;
    }

    _createClass(AnimatedSubtraction, [{
      key: "__makeNative",
      value: function __makeNative() {
        this._a.__makeNative();

        this._b.__makeNative();

        _get(_getPrototypeOf(AnimatedSubtraction.prototype), "__makeNative", this).call(this);
      }
    }, {
      key: "__getValue",
      value: function __getValue() {
        return this._a.__getValue() - this._b.__getValue();
      }
    }, {
      key: "interpolate",
      value: function interpolate(config) {
        return new AnimatedInterpolation(this, config);
      }
    }, {
      key: "__attach",
      value: function __attach() {
        this._a.__addChild(this);

        this._b.__addChild(this);
      }
    }, {
      key: "__detach",
      value: function __detach() {
        this._a.__removeChild(this);

        this._b.__removeChild(this);

        _get(_getPrototypeOf(AnimatedSubtraction.prototype), "__detach", this).call(this);
      }
    }, {
      key: "__getNativeConfig",
      value: function __getNativeConfig() {
        return {
          type: 'subtraction',
          input: [this._a.__getNativeTag(), this._b.__getNativeTag()]
        };
      }
    }]);

    return AnimatedSubtraction;
  }(AnimatedWithChildren);

  module.exports = AnimatedSubtraction;
},14650,[14320,14323,14371,14377,14380,14386,10534,10537,10531,10543]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var FlatList = _$$_REQUIRE(_dependencyMap[0]);

  var createAnimatedComponent = _$$_REQUIRE(_dependencyMap[1]);

  module.exports = createAnimatedComponent(FlatList, {
    scrollEventThrottle: 0.0001
  });
},14653,[10657,10603]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _codegenNativeComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));

  var _default = (0, _codegenNativeComponent.default)('AndroidSwipeRefreshLayout');

  exports.default = _default;
},14656,[14305,14608]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _codegenNativeComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));

  var _default = (0, _codegenNativeComponent.default)('PullToRefreshView', {
    paperComponentName: 'RCTRefreshControl'
  });

  exports.default = _default;
},14659,[14305,14608]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var TurboModuleRegistry = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1]));

  var _default = TurboModuleRegistry.get('FrameRateLogger');

  exports.default = _default;
},14662,[14308,14341]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var TurboModuleRegistry = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1]));

  var _default = TurboModuleRegistry.get('KeyboardObserver');

  exports.default = _default;
},14665,[14308,14341]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _extends = _$$_REQUIRE(_dependencyMap[0]);

  var OUTER_PROPS = _extends(Object.create(null), {
    margin: true,
    marginHorizontal: true,
    marginVertical: true,
    marginBottom: true,
    marginTop: true,
    marginLeft: true,
    marginRight: true,
    flex: true,
    flexGrow: true,
    flexShrink: true,
    flexBasis: true,
    alignSelf: true,
    height: true,
    minHeight: true,
    maxHeight: true,
    width: true,
    minWidth: true,
    maxWidth: true,
    position: true,
    left: true,
    right: true,
    bottom: true,
    top: true
  });

  function splitLayoutProps(props) {
    var inner = {};
    var outer = {};

    if (props) {
      Object.keys(props).forEach(function (k) {
        var value = props[k];

        if (OUTER_PROPS[k]) {
          outer[k] = value;
        } else {
          inner[k] = value;
        }
      });
    }

    return {
      outer: outer,
      inner: inner
    };
  }

  module.exports = splitLayoutProps;
},14668,[14344]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var Image = _$$_REQUIRE(_dependencyMap[0]);

  var createAnimatedComponent = _$$_REQUIRE(_dependencyMap[1]);

  module.exports = createAnimatedComponent(Image);
},14671,[10606,10603]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  module.exports = _$$_REQUIRE(_dependencyMap[0]);
},14674,[14677]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var runtime = function (exports) {
    "use strict";

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined;
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function wrap(innerFn, outerFn, self, tryLocsList) {
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []);
      generator._invoke = makeInvokeMethod(innerFn, self, context);
      return generator;
    }

    exports.wrap = wrap;

    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";
    var ContinueSentinel = {};

    function Generator() {}

    function GeneratorFunction() {}

    function GeneratorFunctionPrototype() {}

    var IteratorPrototype = {};

    IteratorPrototype[iteratorSymbol] = function () {
      return this;
    };

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        prototype[method] = function (arg) {
          return this._invoke(method, arg);
        };
      });
    }

    exports.isGeneratorFunction = function (genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction || (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };

    exports.mark = function (genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;

        if (!(toStringTagSymbol in genFun)) {
          genFun[toStringTagSymbol] = "GeneratorFunction";
        }
      }

      genFun.prototype = Object.create(Gp);
      return genFun;
    };

    exports.awrap = function (arg) {
      return {
        __await: arg
      };
    };

    function AsyncIterator(generator) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);

        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;

          if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
            return Promise.resolve(value.__await).then(function (value) {
              invoke("next", value, resolve, reject);
            }, function (err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return Promise.resolve(value).then(function (unwrapped) {
            result.value = unwrapped;
            resolve(result);
          }, function (error) {
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new Promise(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }

      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);

    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
      return this;
    };

    exports.AsyncIterator = AsyncIterator;

    exports.async = function (innerFn, outerFn, self, tryLocsList) {
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));
      return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }

          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            context.sent = context._sent = context.arg;
          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);
          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;
          var record = tryCatch(innerFn, self, context);

          if (record.type === "normal") {
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };
          } else if (record.type === "throw") {
            state = GenStateCompleted;
            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    }

    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];

      if (method === undefined) {
        context.delegate = null;

        if (context.method === "throw") {
          if (delegate.iterator["return"]) {
            context.method = "return";
            context.arg = undefined;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (!info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        context[delegate.resultName] = info.value;
        context.next = delegate.nextLoc;

        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined;
        }
      } else {
        return info;
      }

      context.delegate = null;
      return ContinueSentinel;
    }

    defineIteratorMethods(Gp);
    Gp[toStringTagSymbol] = "Generator";

    Gp[iteratorSymbol] = function () {
      return this;
    };

    Gp.toString = function () {
      return "[object Generator]";
    };

    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      this.tryEntries = [{
        tryLoc: "root"
      }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    exports.keys = function (object) {
      var keys = [];

      for (var key in object) {
        keys.push(key);
      }

      keys.reverse();
      return function next() {
        while (keys.length) {
          var key = keys.pop();

          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        }

        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];

        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1,
              next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined;
            next.done = true;
            return next;
          };

          return next.next = next;
        }
      }

      return {
        next: doneResult
      };
    }

    exports.values = values;

    function doneResult() {
      return {
        value: undefined,
        done: true
      };
    }

    Context.prototype = {
      constructor: Context,
      reset: function reset(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        this.sent = this._sent = undefined;
        this.done = false;
        this.delegate = null;
        this.method = "next";
        this.arg = undefined;
        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined;
            }
          }
        }
      },
      stop: function stop() {
        this.done = true;
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;

        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },
      dispatchException: function dispatchException(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;

        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            context.method = "next";
            context.arg = undefined;
          }

          return !!caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
      abrupt: function abrupt(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },
      complete: function complete(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" || record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },
      finish: function finish(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },
      "catch": function _catch(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;

            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }

            return thrown;
          }
        }

        throw new Error("illegal catch attempt");
      },
      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          this.arg = undefined;
        }

        return ContinueSentinel;
      }
    };
    return exports;
  }(typeof module === "object" ? module.exports : {});

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
},14677,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _objectSpread = _$$_REQUIRE(_dependencyMap[0]);

  var DeprecatedEdgeInsetsPropType = _$$_REQUIRE(_dependencyMap[1]);

  var DeprecatedStyleSheetPropType = _$$_REQUIRE(_dependencyMap[2]);

  var DeprecatedViewStylePropTypes = _$$_REQUIRE(_dependencyMap[3]);

  var PlatformViewPropTypes = _$$_REQUIRE(_dependencyMap[4]);

  var PropTypes = _$$_REQUIRE(_dependencyMap[5]);

  var _require = _$$_REQUIRE(_dependencyMap[6]),
      DeprecatedAccessibilityRoles = _require.DeprecatedAccessibilityRoles,
      DeprecatedAccessibilityStates = _require.DeprecatedAccessibilityStates;

  var stylePropType = DeprecatedStyleSheetPropType(DeprecatedViewStylePropTypes);
  module.exports = _objectSpread({
    accessible: PropTypes.bool,
    accessibilityLabel: PropTypes.node,
    accessibilityHint: PropTypes.string,
    accessibilityActions: PropTypes.arrayOf(PropTypes.string),
    accessibilityIgnoresInvertColors: PropTypes.bool,
    accessibilityRole: PropTypes.oneOf(DeprecatedAccessibilityRoles),
    accessibilityStates: PropTypes.arrayOf(PropTypes.oneOf(DeprecatedAccessibilityStates)),
    accessibilityState: PropTypes.object,
    accessibilityLiveRegion: PropTypes.oneOf(['none', 'polite', 'assertive']),
    importantForAccessibility: PropTypes.oneOf(['auto', 'yes', 'no', 'no-hide-descendants']),
    accessibilityViewIsModal: PropTypes.bool,
    accessibilityElementsHidden: PropTypes.bool,
    onAccessibilityAction: PropTypes.func,
    onAccessibilityTap: PropTypes.func,
    onMagicTap: PropTypes.func,
    testID: PropTypes.string,
    nativeID: PropTypes.string,
    onResponderGrant: PropTypes.func,
    onResponderMove: PropTypes.func,
    onResponderReject: PropTypes.func,
    onResponderRelease: PropTypes.func,
    onResponderTerminate: PropTypes.func,
    onResponderTerminationRequest: PropTypes.func,
    onStartShouldSetResponder: PropTypes.func,
    onStartShouldSetResponderCapture: PropTypes.func,
    onMoveShouldSetResponder: PropTypes.func,
    onMoveShouldSetResponderCapture: PropTypes.func,
    hitSlop: DeprecatedEdgeInsetsPropType,
    onLayout: PropTypes.func,
    pointerEvents: PropTypes.oneOf(['box-none', 'none', 'box-only', 'auto']),
    style: stylePropType,
    removeClippedSubviews: PropTypes.bool,
    renderToHardwareTextureAndroid: PropTypes.bool,
    shouldRasterizeIOS: PropTypes.bool,
    collapsable: PropTypes.bool,
    needsOffscreenAlphaCompositing: PropTypes.bool
  }, PlatformViewPropTypes);
},14680,[14314,14614,14617,14437,10348,10318,14641]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var requireNativeComponent = _$$_REQUIRE(_dependencyMap[0]);

  var ImageViewNativeComponent = requireNativeComponent('RCTImageView');
  module.exports = ImageViewNativeComponent;
},14683,[10372]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var requireNativeComponent = _$$_REQUIRE(_dependencyMap[0]);

  var TextInlineImage = requireNativeComponent('RCTTextInlineImage');
  module.exports = TextInlineImage;
},14686,[10372]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var ScrollView = _$$_REQUIRE(_dependencyMap[0]);

  var createAnimatedComponent = _$$_REQUIRE(_dependencyMap[1]);

  module.exports = createAnimatedComponent(ScrollView, {
    scrollEventThrottle: 0.0001
  });
},14689,[10609,10603]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var SectionList = _$$_REQUIRE(_dependencyMap[0]);

  var createAnimatedComponent = _$$_REQUIRE(_dependencyMap[1]);

  module.exports = createAnimatedComponent(SectionList, {
    scrollEventThrottle: 0.0001
  });
},14692,[10744,10603]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var Text = _$$_REQUIRE(_dependencyMap[0]);

  var createAnimatedComponent = _$$_REQUIRE(_dependencyMap[1]);

  module.exports = createAnimatedComponent(Text);
},14695,[10483,10603]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var View = _$$_REQUIRE(_dependencyMap[0]);

  var createAnimatedComponent = _$$_REQUIRE(_dependencyMap[1]);

  module.exports = createAnimatedComponent(View);
},14698,[10447,10603]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var requireNativeComponent = _$$_REQUIRE(_dependencyMap[0]);

  module.exports = requireNativeComponent('AndroidCheckBox');
},14701,[10372]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  function setAndForwardRef(_ref) {
    var getForwardedRef = _ref.getForwardedRef,
        setLocalRef = _ref.setLocalRef;
    return function forwardRef(ref) {
      var forwardedRef = getForwardedRef();
      setLocalRef(ref);

      if (typeof forwardedRef === 'function') {
        forwardedRef(ref);
      } else if (typeof forwardedRef === 'object' && forwardedRef != null) {
        forwardedRef.current = ref;
      }
    };
  }

  module.exports = setAndForwardRef;
},14704,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[1]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = exports.Commands = undefined;

  var _codegenNativeCommands = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));

  var _codegenNativeComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));

  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[4]));

  var Commands = (0, _codegenNativeCommands.default)({
    supportedCommands: ['openDrawer', 'closeDrawer']
  });
  exports.Commands = Commands;

  var _default = (0, _codegenNativeComponent.default)('AndroidDrawerLayout');

  exports.default = _default;
},14707,[14308,14305,14710,14608,10297]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _ReactNative = _$$_REQUIRE(_dependencyMap[0]);

  function codegenNativeCommands(options) {
    var commandObj = {};
    options.supportedCommands.forEach(function (command) {
      commandObj[command] = function (ref) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        (0, _ReactNative.dispatchCommand)(ref, command, args);
      };
    });
    return commandObj;
  }

  var _default = codegenNativeCommands;
  exports.default = _default;
},14710,[10114]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var TurboModuleRegistry = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1]));

  var _default = TurboModuleRegistry.getEnforcing('StatusBarManager');

  exports.default = _default;
},14713,[14308,14341]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _objectSpread = _$$_REQUIRE(_dependencyMap[0]);

  var _extends = _$$_REQUIRE(_dependencyMap[1]);

  var _objectWithoutProperties = _$$_REQUIRE(_dependencyMap[2]);

  var InternalListViewType = _$$_REQUIRE(_dependencyMap[3]);

  var ListViewDataSource = _$$_REQUIRE(_dependencyMap[4]);

  var React = _$$_REQUIRE(_dependencyMap[5]);

  var ReactNative = _$$_REQUIRE(_dependencyMap[6]);

  var Platform = ReactNative.Platform;
  var RCTScrollViewManager = ReactNative.NativeModules.ScrollViewManager;
  var ScrollView = ReactNative.ScrollView;

  var ScrollResponderMixin = _$$_REQUIRE(_dependencyMap[7]).Mixin;

  var StaticRenderer = _$$_REQUIRE(_dependencyMap[8]);

  var View = ReactNative.View;

  var cloneReferencedElement = _$$_REQUIRE(_dependencyMap[9]);

  var createReactClass = _$$_REQUIRE(_dependencyMap[10]);

  var isEmpty = _$$_REQUIRE(_dependencyMap[11]);

  var DEFAULT_PAGE_SIZE = 1;
  var DEFAULT_INITIAL_ROWS = 10;
  var DEFAULT_SCROLL_RENDER_AHEAD = 1000;
  var DEFAULT_END_REACHED_THRESHOLD = 1000;
  var DEFAULT_SCROLL_CALLBACK_THROTTLE = 50;
  var ListView = createReactClass({
    displayName: 'ListView',
    _rafIds: [],
    _childFrames: [],
    _sentEndForContentLength: null,
    _scrollComponent: null,
    _prevRenderedRowsCount: 0,
    _visibleRows: {},
    scrollProperties: {},
    mixins: [ScrollResponderMixin],
    statics: {
      DataSource: ListViewDataSource
    },
    getMetrics: function getMetrics() {
      return {
        contentLength: this.scrollProperties.contentLength,
        totalRows: this.props.enableEmptySections ? this.props.dataSource.getRowAndSectionCount() : this.props.dataSource.getRowCount(),
        renderedRows: this.state.curRenderedRowsCount,
        visibleRows: Object.keys(this._visibleRows).length
      };
    },
    getScrollResponder: function getScrollResponder() {
      if (this._scrollComponent && this._scrollComponent.getScrollResponder) {
        return this._scrollComponent.getScrollResponder();
      }
    },
    getScrollableNode: function getScrollableNode() {
      if (this._scrollComponent && this._scrollComponent.getScrollableNode) {
        return this._scrollComponent.getScrollableNode();
      } else {
        return ReactNative.findNodeHandle(this._scrollComponent);
      }
    },
    scrollTo: function scrollTo() {
      if (this._scrollComponent && this._scrollComponent.scrollTo) {
        var _this$_scrollComponen;

        (_this$_scrollComponen = this._scrollComponent).scrollTo.apply(_this$_scrollComponen, arguments);
      }
    },
    scrollToEnd: function scrollToEnd(options) {
      if (this._scrollComponent) {
        if (this._scrollComponent.scrollToEnd) {
          this._scrollComponent.scrollToEnd(options);
        } else {
          console.warn("The scroll component used by the ListView does not support scrollToEnd. Check the renderScrollComponent prop of your ListView.");
        }
      }
    },
    flashScrollIndicators: function flashScrollIndicators() {
      if (this._scrollComponent && this._scrollComponent.flashScrollIndicators) {
        this._scrollComponent.flashScrollIndicators();
      }
    },
    setNativeProps: function setNativeProps(props) {
      if (this._scrollComponent) {
        this._scrollComponent.setNativeProps(props);
      }
    },
    getDefaultProps: function getDefaultProps() {
      return {
        initialListSize: DEFAULT_INITIAL_ROWS,
        pageSize: DEFAULT_PAGE_SIZE,
        renderScrollComponent: function renderScrollComponent(props) {
          return React.createElement(ScrollView, props);
        },
        scrollRenderAheadDistance: DEFAULT_SCROLL_RENDER_AHEAD,
        onEndReachedThreshold: DEFAULT_END_REACHED_THRESHOLD,
        stickySectionHeadersEnabled: false,
        stickyHeaderIndices: []
      };
    },
    getInitialState: function getInitialState() {
      return {
        curRenderedRowsCount: this.props.initialListSize,
        highlightedRow: {}
      };
    },
    getInnerViewNode: function getInnerViewNode() {
      return this._scrollComponent && this._scrollComponent.getInnerViewNode();
    },
    UNSAFE_componentWillMount: function UNSAFE_componentWillMount() {
      this.scrollProperties = {
        visibleLength: null,
        contentLength: null,
        offset: 0
      };
      this._rafIds = [];
      this._childFrames = [];
      this._visibleRows = {};
      this._prevRenderedRowsCount = 0;
      this._sentEndForContentLength = null;
    },
    componentWillUnmount: function componentWillUnmount() {
      this._rafIds.forEach(cancelAnimationFrame);

      this._rafIds = [];
    },
    componentDidMount: function componentDidMount() {
      var _this = this;

      this._requestAnimationFrame(function () {
        _this._measureAndUpdateScrollProps();
      });
    },
    UNSAFE_componentWillReceiveProps: function UNSAFE_componentWillReceiveProps(nextProps) {
      var _this2 = this;

      if (this.props.dataSource !== nextProps.dataSource || this.props.initialListSize !== nextProps.initialListSize) {
        this.setState(function (state, props) {
          _this2._prevRenderedRowsCount = 0;
          return {
            curRenderedRowsCount: Math.min(Math.max(state.curRenderedRowsCount, props.initialListSize), props.enableEmptySections ? props.dataSource.getRowAndSectionCount() : props.dataSource.getRowCount())
          };
        }, function () {
          return _this2._renderMoreRowsIfNeeded();
        });
      }
    },
    componentDidUpdate: function componentDidUpdate() {
      var _this3 = this;

      this._requestAnimationFrame(function () {
        _this3._measureAndUpdateScrollProps();
      });
    },
    _onRowHighlighted: function _onRowHighlighted(sectionID, rowID) {
      this.setState({
        highlightedRow: {
          sectionID: sectionID,
          rowID: rowID
        }
      });
    },
    render: function render() {
      var bodyComponents = [];
      var dataSource = this.props.dataSource;
      var allRowIDs = dataSource.rowIdentities;
      var rowCount = 0;
      var stickySectionHeaderIndices = [];
      var renderSectionHeader = this.props.renderSectionHeader;
      var header = this.props.renderHeader && this.props.renderHeader();
      var footer = this.props.renderFooter && this.props.renderFooter();
      var totalIndex = header ? 1 : 0;

      for (var sectionIdx = 0; sectionIdx < allRowIDs.length; sectionIdx++) {
        var sectionID = dataSource.sectionIdentities[sectionIdx];
        var rowIDs = allRowIDs[sectionIdx];

        if (rowIDs.length === 0) {
          if (this.props.enableEmptySections === undefined) {
            var warning = _$$_REQUIRE(_dependencyMap[12]);

            warning(false, "In next release empty section headers will be rendered. In this release you can use 'enableEmptySections' flag to render empty section headers.");
            continue;
          } else {
            var invariant = _$$_REQUIRE(_dependencyMap[13]);

            invariant(this.props.enableEmptySections, "In next release 'enableEmptySections' flag will be deprecated, empty section headers will always be rendered. If empty section headers are not desirable their indices should be excluded from sectionIDs object. In this release 'enableEmptySections' may only have value 'true' to allow empty section headers rendering.");
          }
        }

        if (renderSectionHeader) {
          var element = renderSectionHeader(dataSource.getSectionHeaderData(sectionIdx), sectionID);

          if (element) {
            bodyComponents.push(React.cloneElement(element, {
              key: 's_' + sectionID
            }));

            if (this.props.stickySectionHeadersEnabled) {
              stickySectionHeaderIndices.push(totalIndex);
            }

            totalIndex++;
          }
        }

        for (var rowIdx = 0; rowIdx < rowIDs.length; rowIdx++) {
          var rowID = rowIDs[rowIdx];
          var comboID = sectionID + '_' + rowID;
          var shouldUpdateRow = rowCount >= this._prevRenderedRowsCount && dataSource.rowShouldUpdate(sectionIdx, rowIdx);
          var row = React.createElement(StaticRenderer, {
            key: 'r_' + comboID,
            shouldUpdate: !!shouldUpdateRow,
            render: this.props.renderRow.bind(null, dataSource.getRowData(sectionIdx, rowIdx), sectionID, rowID, this._onRowHighlighted)
          });
          bodyComponents.push(row);
          totalIndex++;

          if (this.props.renderSeparator && (rowIdx !== rowIDs.length - 1 || sectionIdx === allRowIDs.length - 1)) {
            var adjacentRowHighlighted = this.state.highlightedRow.sectionID === sectionID && (this.state.highlightedRow.rowID === rowID || this.state.highlightedRow.rowID === rowIDs[rowIdx + 1]);
            var separator = this.props.renderSeparator(sectionID, rowID, adjacentRowHighlighted);

            if (separator) {
              bodyComponents.push(React.createElement(View, {
                key: 's_' + comboID
              }, separator));
              totalIndex++;
            }
          }

          if (++rowCount === this.state.curRenderedRowsCount) {
            break;
          }
        }

        if (rowCount >= this.state.curRenderedRowsCount) {
          break;
        }
      }

      var _this$props = this.props,
          renderScrollComponent = _this$props.renderScrollComponent,
          props = _objectWithoutProperties(_this$props, ["renderScrollComponent"]);

      if (!props.scrollEventThrottle) {
        props.scrollEventThrottle = DEFAULT_SCROLL_CALLBACK_THROTTLE;
      }

      if (props.removeClippedSubviews === undefined) {
        props.removeClippedSubviews = true;
      }

      _extends(props, {
        onScroll: this._onScroll,
        stickyHeaderIndices: this.props.stickyHeaderIndices.concat(stickySectionHeaderIndices),
        onKeyboardWillShow: undefined,
        onKeyboardWillHide: undefined,
        onKeyboardDidShow: undefined,
        onKeyboardDidHide: undefined
      });

      return cloneReferencedElement(renderScrollComponent(props), {
        ref: this._setScrollComponentRef,
        onContentSizeChange: this._onContentSizeChange,
        onLayout: this._onLayout,
        DEPRECATED_sendUpdatedChildFrames: typeof props.onChangeVisibleRows !== undefined
      }, header, bodyComponents, footer);
    },
    _requestAnimationFrame: function _requestAnimationFrame(fn) {
      var _this4 = this;

      var rafId = requestAnimationFrame(function () {
        _this4._rafIds = _this4._rafIds.filter(function (id) {
          return id !== rafId;
        });
        fn();
      });

      this._rafIds.push(rafId);
    },
    _measureAndUpdateScrollProps: function _measureAndUpdateScrollProps() {
      var scrollComponent = this.getScrollResponder();

      if (!scrollComponent || !scrollComponent.getInnerViewNode) {
        return;
      }

      RCTScrollViewManager && RCTScrollViewManager.calculateChildFrames && RCTScrollViewManager.calculateChildFrames(ReactNative.findNodeHandle(scrollComponent), this._updateVisibleRows);
    },
    _setScrollComponentRef: function _setScrollComponentRef(scrollComponent) {
      this._scrollComponent = scrollComponent;
    },
    _onContentSizeChange: function _onContentSizeChange(width, height) {
      var contentLength = !this.props.horizontal ? height : width;

      if (contentLength !== this.scrollProperties.contentLength) {
        this.scrollProperties.contentLength = contentLength;

        this._updateVisibleRows();

        this._renderMoreRowsIfNeeded();
      }

      this.props.onContentSizeChange && this.props.onContentSizeChange(width, height);
    },
    _onLayout: function _onLayout(event) {
      var _event$nativeEvent$la = event.nativeEvent.layout,
          width = _event$nativeEvent$la.width,
          height = _event$nativeEvent$la.height;
      var visibleLength = !this.props.horizontal ? height : width;

      if (visibleLength !== this.scrollProperties.visibleLength) {
        this.scrollProperties.visibleLength = visibleLength;

        this._updateVisibleRows();

        this._renderMoreRowsIfNeeded();
      }

      this.props.onLayout && this.props.onLayout(event);
    },
    _maybeCallOnEndReached: function _maybeCallOnEndReached(event) {
      if (this.props.onEndReached && this.scrollProperties.contentLength !== this._sentEndForContentLength && this._getDistanceFromEnd(this.scrollProperties) < this.props.onEndReachedThreshold && this.state.curRenderedRowsCount === (this.props.enableEmptySections ? this.props.dataSource.getRowAndSectionCount() : this.props.dataSource.getRowCount())) {
        this._sentEndForContentLength = this.scrollProperties.contentLength;
        this.props.onEndReached(event);
        return true;
      }

      return false;
    },
    _renderMoreRowsIfNeeded: function _renderMoreRowsIfNeeded() {
      if (this.scrollProperties.contentLength === null || this.scrollProperties.visibleLength === null || this.state.curRenderedRowsCount === (this.props.enableEmptySections ? this.props.dataSource.getRowAndSectionCount() : this.props.dataSource.getRowCount())) {
        this._maybeCallOnEndReached();

        return;
      }

      var distanceFromEnd = this._getDistanceFromEnd(this.scrollProperties);

      if (distanceFromEnd < this.props.scrollRenderAheadDistance) {
        this._pageInNewRows();
      }
    },
    _pageInNewRows: function _pageInNewRows() {
      var _this5 = this;

      this.setState(function (state, props) {
        var rowsToRender = Math.min(state.curRenderedRowsCount + props.pageSize, props.enableEmptySections ? props.dataSource.getRowAndSectionCount() : props.dataSource.getRowCount());
        _this5._prevRenderedRowsCount = state.curRenderedRowsCount;
        return {
          curRenderedRowsCount: rowsToRender
        };
      }, function () {
        _this5._measureAndUpdateScrollProps();

        _this5._prevRenderedRowsCount = _this5.state.curRenderedRowsCount;
      });
    },
    _getDistanceFromEnd: function _getDistanceFromEnd(scrollProperties) {
      return scrollProperties.contentLength - scrollProperties.visibleLength - scrollProperties.offset;
    },
    _updateVisibleRows: function _updateVisibleRows(updatedFrames) {
      var _this6 = this;

      if (!this.props.onChangeVisibleRows) {
        return;
      }

      if (updatedFrames) {
        updatedFrames.forEach(function (newFrame) {
          _this6._childFrames[newFrame.index] = _objectSpread({}, newFrame);
        });
      }

      var isVertical = !this.props.horizontal;
      var dataSource = this.props.dataSource;
      var visibleMin = this.scrollProperties.offset;
      var visibleMax = visibleMin + this.scrollProperties.visibleLength;
      var allRowIDs = dataSource.rowIdentities;
      var header = this.props.renderHeader && this.props.renderHeader();
      var totalIndex = header ? 1 : 0;
      var visibilityChanged = false;
      var changedRows = {};

      for (var sectionIdx = 0; sectionIdx < allRowIDs.length; sectionIdx++) {
        var rowIDs = allRowIDs[sectionIdx];

        if (rowIDs.length === 0) {
          continue;
        }

        var sectionID = dataSource.sectionIdentities[sectionIdx];

        if (this.props.renderSectionHeader) {
          totalIndex++;
        }

        var visibleSection = this._visibleRows[sectionID];

        if (!visibleSection) {
          visibleSection = {};
        }

        for (var rowIdx = 0; rowIdx < rowIDs.length; rowIdx++) {
          var rowID = rowIDs[rowIdx];
          var frame = this._childFrames[totalIndex];
          totalIndex++;

          if (this.props.renderSeparator && (rowIdx !== rowIDs.length - 1 || sectionIdx === allRowIDs.length - 1)) {
            totalIndex++;
          }

          if (!frame) {
            break;
          }

          var rowVisible = visibleSection[rowID];
          var min = isVertical ? frame.y : frame.x;
          var max = min + (isVertical ? frame.height : frame.width);

          if (!min && !max || min === max) {
            break;
          }

          if (min > visibleMax || max < visibleMin) {
            if (rowVisible) {
              visibilityChanged = true;
              delete visibleSection[rowID];

              if (!changedRows[sectionID]) {
                changedRows[sectionID] = {};
              }

              changedRows[sectionID][rowID] = false;
            }
          } else if (!rowVisible) {
            visibilityChanged = true;
            visibleSection[rowID] = true;

            if (!changedRows[sectionID]) {
              changedRows[sectionID] = {};
            }

            changedRows[sectionID][rowID] = true;
          }
        }

        if (!isEmpty(visibleSection)) {
          this._visibleRows[sectionID] = visibleSection;
        } else if (this._visibleRows[sectionID]) {
          delete this._visibleRows[sectionID];
        }
      }

      visibilityChanged && this.props.onChangeVisibleRows(this._visibleRows, changedRows);
    },
    _onScroll: function _onScroll(e) {
      var isVertical = !this.props.horizontal;
      this.scrollProperties.visibleLength = e.nativeEvent.layoutMeasurement[isVertical ? 'height' : 'width'];
      this.scrollProperties.contentLength = e.nativeEvent.contentSize[isVertical ? 'height' : 'width'];
      this.scrollProperties.offset = e.nativeEvent.contentOffset[isVertical ? 'y' : 'x'];

      this._updateVisibleRows(e.nativeEvent.updatedChildFrames);

      if (!this._maybeCallOnEndReached(e)) {
        this._renderMoreRowsIfNeeded();
      }

      if (this.props.onEndReached && this._getDistanceFromEnd(this.scrollProperties) > this.props.onEndReachedThreshold) {
        this._sentEndForContentLength = null;
      }

      this.props.onScroll && this.props.onScroll(e);
    }
  });
  module.exports = ListView;
},14716,[14314,14344,14407,14719,14722,10297,10033,10615,14728,10675,10456,14725,10078,13495]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _classCallCheck = _$$_REQUIRE(_dependencyMap[0]);

  var _createClass = _$$_REQUIRE(_dependencyMap[1]);

  var _possibleConstructorReturn = _$$_REQUIRE(_dependencyMap[2]);

  var _getPrototypeOf = _$$_REQUIRE(_dependencyMap[3]);

  var _inherits = _$$_REQUIRE(_dependencyMap[4]);

  var React = _$$_REQUIRE(_dependencyMap[5]);

  var ListViewDataSource = _$$_REQUIRE(_dependencyMap[6]);

  var InternalListViewType = function (_React$Component) {
    "use strict";

    _inherits(InternalListViewType, _React$Component);

    function InternalListViewType() {
      _classCallCheck(this, InternalListViewType);

      return _possibleConstructorReturn(this, _getPrototypeOf(InternalListViewType).apply(this, arguments));
    }

    _createClass(InternalListViewType, [{
      key: "setNativeProps",
      value: function setNativeProps(props) {}
    }, {
      key: "flashScrollIndicators",
      value: function flashScrollIndicators() {}
    }, {
      key: "getScrollResponder",
      value: function getScrollResponder() {}
    }, {
      key: "getScrollableNode",
      value: function getScrollableNode() {}
    }, {
      key: "getMetrics",
      value: function getMetrics() {}
    }, {
      key: "scrollTo",
      value: function scrollTo() {}
    }, {
      key: "scrollToEnd",
      value: function scrollToEnd(options) {}
    }]);

    return InternalListViewType;
  }(React.Component);

  InternalListViewType.DataSource = ListViewDataSource;
  module.exports = InternalListViewType;
},14719,[14320,14323,14371,14377,14386,10297,14722]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _toConsumableArray = _$$_REQUIRE(_dependencyMap[0]);

  var _classCallCheck = _$$_REQUIRE(_dependencyMap[1]);

  var _createClass = _$$_REQUIRE(_dependencyMap[2]);

  var invariant = _$$_REQUIRE(_dependencyMap[3]);

  var isEmpty = _$$_REQUIRE(_dependencyMap[4]);

  var warning = _$$_REQUIRE(_dependencyMap[5]);

  function defaultGetRowData(dataBlob, sectionID, rowID) {
    return dataBlob[sectionID][rowID];
  }

  function defaultGetSectionHeaderData(dataBlob, sectionID) {
    return dataBlob[sectionID];
  }

  var ListViewDataSource = function () {
    function ListViewDataSource(params) {
      _classCallCheck(this, ListViewDataSource);

      invariant(params && typeof params.rowHasChanged === 'function', 'Must provide a rowHasChanged function.');
      this._rowHasChanged = params.rowHasChanged;
      this._getRowData = params.getRowData || defaultGetRowData;
      this._sectionHeaderHasChanged = params.sectionHeaderHasChanged;
      this._getSectionHeaderData = params.getSectionHeaderData || defaultGetSectionHeaderData;
      this._dataBlob = null;
      this._dirtyRows = [];
      this._dirtySections = [];
      this._cachedRowCount = 0;
      this.rowIdentities = [];
      this.sectionIdentities = [];
    }

    _createClass(ListViewDataSource, [{
      key: "cloneWithRows",
      value: function cloneWithRows(dataBlob, rowIdentities) {
        var rowIds = rowIdentities ? [_toConsumableArray(rowIdentities)] : null;

        if (!this._sectionHeaderHasChanged) {
          this._sectionHeaderHasChanged = function () {
            return false;
          };
        }

        return this.cloneWithRowsAndSections({
          s1: dataBlob
        }, ['s1'], rowIds);
      }
    }, {
      key: "cloneWithRowsAndSections",
      value: function cloneWithRowsAndSections(dataBlob, sectionIdentities, rowIdentities) {
        invariant(typeof this._sectionHeaderHasChanged === 'function', 'Must provide a sectionHeaderHasChanged function with section data.');
        invariant(!sectionIdentities || !rowIdentities || sectionIdentities.length === rowIdentities.length, 'row and section ids lengths must be the same');
        var newSource = new ListViewDataSource({
          getRowData: this._getRowData,
          getSectionHeaderData: this._getSectionHeaderData,
          rowHasChanged: this._rowHasChanged,
          sectionHeaderHasChanged: this._sectionHeaderHasChanged
        });
        newSource._dataBlob = dataBlob;

        if (sectionIdentities) {
          newSource.sectionIdentities = sectionIdentities;
        } else {
          newSource.sectionIdentities = Object.keys(dataBlob);
        }

        if (rowIdentities) {
          newSource.rowIdentities = rowIdentities;
        } else {
          newSource.rowIdentities = [];
          newSource.sectionIdentities.forEach(function (sectionID) {
            newSource.rowIdentities.push(Object.keys(dataBlob[sectionID]));
          });
        }

        newSource._cachedRowCount = countRows(newSource.rowIdentities);

        newSource._calculateDirtyArrays(this._dataBlob, this.sectionIdentities, this.rowIdentities);

        return newSource;
      }
    }, {
      key: "getRowCount",
      value: function getRowCount() {
        return this._cachedRowCount;
      }
    }, {
      key: "getRowAndSectionCount",
      value: function getRowAndSectionCount() {
        return this._cachedRowCount + this.sectionIdentities.length;
      }
    }, {
      key: "rowShouldUpdate",
      value: function rowShouldUpdate(sectionIndex, rowIndex) {
        var needsUpdate = this._dirtyRows[sectionIndex][rowIndex];
        warning(needsUpdate !== undefined, 'missing dirtyBit for section, row: ' + sectionIndex + ', ' + rowIndex);
        return needsUpdate;
      }
    }, {
      key: "getRowData",
      value: function getRowData(sectionIndex, rowIndex) {
        var sectionID = this.sectionIdentities[sectionIndex];
        var rowID = this.rowIdentities[sectionIndex][rowIndex];
        warning(sectionID !== undefined && rowID !== undefined, 'rendering invalid section, row: ' + sectionIndex + ', ' + rowIndex);
        return this._getRowData(this._dataBlob, sectionID, rowID);
      }
    }, {
      key: "getRowIDForFlatIndex",
      value: function getRowIDForFlatIndex(index) {
        var accessIndex = index;

        for (var ii = 0; ii < this.sectionIdentities.length; ii++) {
          if (accessIndex >= this.rowIdentities[ii].length) {
            accessIndex -= this.rowIdentities[ii].length;
          } else {
            return this.rowIdentities[ii][accessIndex];
          }
        }

        return null;
      }
    }, {
      key: "getSectionIDForFlatIndex",
      value: function getSectionIDForFlatIndex(index) {
        var accessIndex = index;

        for (var ii = 0; ii < this.sectionIdentities.length; ii++) {
          if (accessIndex >= this.rowIdentities[ii].length) {
            accessIndex -= this.rowIdentities[ii].length;
          } else {
            return this.sectionIdentities[ii];
          }
        }

        return null;
      }
    }, {
      key: "getSectionLengths",
      value: function getSectionLengths() {
        var results = [];

        for (var ii = 0; ii < this.sectionIdentities.length; ii++) {
          results.push(this.rowIdentities[ii].length);
        }

        return results;
      }
    }, {
      key: "sectionHeaderShouldUpdate",
      value: function sectionHeaderShouldUpdate(sectionIndex) {
        var needsUpdate = this._dirtySections[sectionIndex];
        warning(needsUpdate !== undefined, 'missing dirtyBit for section: ' + sectionIndex);
        return needsUpdate;
      }
    }, {
      key: "getSectionHeaderData",
      value: function getSectionHeaderData(sectionIndex) {
        if (!this._getSectionHeaderData) {
          return null;
        }

        var sectionID = this.sectionIdentities[sectionIndex];
        warning(sectionID !== undefined, 'renderSection called on invalid section: ' + sectionIndex);
        return this._getSectionHeaderData(this._dataBlob, sectionID);
      }
    }, {
      key: "_calculateDirtyArrays",
      value: function _calculateDirtyArrays(prevDataBlob, prevSectionIDs, prevRowIDs) {
        var prevSectionsHash = keyedDictionaryFromArray(prevSectionIDs);
        var prevRowsHash = {};

        for (var ii = 0; ii < prevRowIDs.length; ii++) {
          var sectionID = prevSectionIDs[ii];
          warning(!prevRowsHash[sectionID], 'SectionID appears more than once: ' + sectionID);
          prevRowsHash[sectionID] = keyedDictionaryFromArray(prevRowIDs[ii]);
        }

        this._dirtySections = [];
        this._dirtyRows = [];
        var dirty;

        for (var sIndex = 0; sIndex < this.sectionIdentities.length; sIndex++) {
          var _sectionID = this.sectionIdentities[sIndex];
          dirty = !prevSectionsHash[_sectionID];
          var sectionHeaderHasChanged = this._sectionHeaderHasChanged;

          if (!dirty && sectionHeaderHasChanged) {
            dirty = sectionHeaderHasChanged(this._getSectionHeaderData(prevDataBlob, _sectionID), this._getSectionHeaderData(this._dataBlob, _sectionID));
          }

          this._dirtySections.push(!!dirty);

          this._dirtyRows[sIndex] = [];

          for (var rIndex = 0; rIndex < this.rowIdentities[sIndex].length; rIndex++) {
            var rowID = this.rowIdentities[sIndex][rIndex];
            dirty = !prevSectionsHash[_sectionID] || !prevRowsHash[_sectionID][rowID] || this._rowHasChanged(this._getRowData(prevDataBlob, _sectionID, rowID), this._getRowData(this._dataBlob, _sectionID, rowID));

            this._dirtyRows[sIndex].push(!!dirty);
          }
        }
      }
    }]);

    return ListViewDataSource;
  }();

  function countRows(allRowIDs) {
    var totalRows = 0;

    for (var sectionIdx = 0; sectionIdx < allRowIDs.length; sectionIdx++) {
      var rowIDs = allRowIDs[sectionIdx];
      totalRows += rowIDs.length;
    }

    return totalRows;
  }

  function keyedDictionaryFromArray(arr) {
    if (isEmpty(arr)) {
      return {};
    }

    var result = {};

    for (var ii = 0; ii < arr.length; ii++) {
      var _key = arr[ii];
      warning(!result[_key], 'Value appears more than once in array: ' + _key);
      result[_key] = true;
    }

    return result;
  }

  module.exports = ListViewDataSource;
},14722,[14359,14320,14323,13495,14725,10078]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  function isEmpty(obj) {
    if (Array.isArray(obj)) {
      return obj.length === 0;
    } else if (typeof obj === 'object') {
      for (var i in obj) {
        return false;
      }

      return true;
    } else {
      return !obj;
    }
  }

  module.exports = isEmpty;
},14725,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _classCallCheck = _$$_REQUIRE(_dependencyMap[0]);

  var _createClass = _$$_REQUIRE(_dependencyMap[1]);

  var _possibleConstructorReturn = _$$_REQUIRE(_dependencyMap[2]);

  var _getPrototypeOf = _$$_REQUIRE(_dependencyMap[3]);

  var _inherits = _$$_REQUIRE(_dependencyMap[4]);

  var React = _$$_REQUIRE(_dependencyMap[5]);

  var StaticRenderer = function (_React$Component) {
    _inherits(StaticRenderer, _React$Component);

    function StaticRenderer() {
      _classCallCheck(this, StaticRenderer);

      return _possibleConstructorReturn(this, _getPrototypeOf(StaticRenderer).apply(this, arguments));
    }

    _createClass(StaticRenderer, [{
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate(nextProps) {
        return nextProps.shouldUpdate;
      }
    }, {
      key: "render",
      value: function render() {
        return this.props.render();
      }
    }]);

    return StaticRenderer;
  }(React.Component);

  module.exports = StaticRenderer;
},14728,[14320,14323,14371,14377,14386,10297]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "WebView", {
    enumerable: true,
    get: function get() {
      return _WebView.default;
    }
  });
  exports.default = undefined;

  var _WebView = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));

  var _default = _WebView.default;
  exports.default = _default;
},14731,[14305,14734]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _extends2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));

  var _react = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));

  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);

  var _invariant = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));

  var _WebViewShared = _$$_REQUIRE(_dependencyMap[5]);

  var _WebView = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));

  var __extends = this && this.__extends || function () {
    var _extendStatics = function extendStatics(d, b) {
      _extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (b.hasOwnProperty(p)) d[p] = b[p];
        }
      };

      return _extendStatics(d, b);
    };

    return function (d, b) {
      _extendStatics(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();

  var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function (resolve) {
        resolve(value);
      });
    }

    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }

      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }

      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }

      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };

  var __generator = this && this.__generator || function (thisArg, body) {
    var _ = {
      label: 0,
      sent: function sent() {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
        f,
        y,
        t,
        g;
    return g = {
      next: verb(0),
      "throw": verb(1),
      "return": verb(2)
    }, typeof Symbol === "function" && (g[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"] = function () {
      return this;
    }), g;

    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }

    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");

      while (_) {
        try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];

          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;

            case 4:
              _.label++;
              return {
                value: op[1],
                done: false
              };

            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;

            case 7:
              op = _.ops.pop();

              _.trys.pop();

              continue;

            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }

              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }

              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }

              if (t && _.label < t[2]) {
                _.label = t[2];

                _.ops.push(op);

                break;
              }

              if (t[2]) _.ops.pop();

              _.trys.pop();

              continue;
          }

          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      }

      if (op[0] & 5) throw op[1];
      return {
        value: op[0] ? op[1] : undefined,
        done: true
      };
    }
  };

  var __rest = this && this.__rest || function (s, e) {
    var t = {};

    for (var p in s) {
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }

    if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
  };

  var UIManager = _reactNative.UIManager;
  var RNCWebView = (0, _reactNative.requireNativeComponent)('RNCWebView');
  var resolveAssetSource = _reactNative.Image.resolveAssetSource;

  var WebView = function (_super) {
    __extends(WebView, _super);

    function WebView() {
      var _this = _super !== null && _super.apply(this, arguments) || this;

      _this.startUrl = null;
      _this.state = {
        viewState: _this.props.startInLoadingState ? 'LOADING' : 'IDLE',
        lastErrorEvent: null
      };
      _this.webViewRef = _react.default.createRef();

      _this.getCommands = function () {
        return UIManager.getViewManagerConfig('RNCWebView').Commands;
      };

      _this.goForward = function () {
        UIManager.dispatchViewManagerCommand(_this.getWebViewHandle(), _this.getCommands().goForward, undefined);
      };

      _this.goBack = function () {
        UIManager.dispatchViewManagerCommand(_this.getWebViewHandle(), _this.getCommands().goBack, undefined);
      };

      _this.reload = function () {
        _this.setState({
          viewState: 'LOADING'
        });

        UIManager.dispatchViewManagerCommand(_this.getWebViewHandle(), _this.getCommands().reload, undefined);
      };

      _this.stopLoading = function () {
        UIManager.dispatchViewManagerCommand(_this.getWebViewHandle(), _this.getCommands().stopLoading, undefined);
      };

      _this.requestFocus = function () {
        UIManager.dispatchViewManagerCommand(_this.getWebViewHandle(), _this.getCommands().requestFocus, undefined);
      };

      _this.postMessage = function (data) {
        UIManager.dispatchViewManagerCommand(_this.getWebViewHandle(), _this.getCommands().postMessage, [String(data)]);
      };

      _this.clearFormData = function () {
        UIManager.dispatchViewManagerCommand(_this.getWebViewHandle(), _this.getCommands().clearFormData, undefined);
      };

      _this.clearCache = function (includeDiskFiles) {
        UIManager.dispatchViewManagerCommand(_this.getWebViewHandle(), _this.getCommands().clearCache, [includeDiskFiles]);
      };

      _this.clearHistory = function () {
        UIManager.dispatchViewManagerCommand(_this.getWebViewHandle(), _this.getCommands().clearHistory, undefined);
      };

      _this.injectJavaScript = function (data) {
        UIManager.dispatchViewManagerCommand(_this.getWebViewHandle(), _this.getCommands().injectJavaScript, [data]);
      };

      _this.updateNavigationState = function (event) {
        if (_this.props.onNavigationStateChange) {
          _this.props.onNavigationStateChange(event.nativeEvent);
        }
      };

      _this.getWebViewHandle = function () {
        var nodeHandle = (0, _reactNative.findNodeHandle)(_this.webViewRef.current);
        (0, _invariant.default)(nodeHandle != null, 'nodeHandle expected to be non-null');
        return nodeHandle;
      };

      _this.onLoadingStart = function (event) {
        var onLoadStart = _this.props.onLoadStart;
        var url = event.nativeEvent.url;
        _this.startUrl = url;

        if (onLoadStart) {
          onLoadStart(event);
        }

        _this.updateNavigationState(event);
      };

      _this.onLoadingError = function (event) {
        event.persist();
        var _a = _this.props,
            onError = _a.onError,
            onLoadEnd = _a.onLoadEnd;

        if (onError) {
          onError(event);
        }

        if (onLoadEnd) {
          onLoadEnd(event);
        }

        console.warn('Encountered an error loading page', event.nativeEvent);

        _this.setState({
          lastErrorEvent: event.nativeEvent,
          viewState: 'ERROR'
        });
      };

      _this.onHttpError = function (event) {
        var onHttpError = _this.props.onHttpError;

        if (onHttpError) {
          onHttpError(event);
        }
      };

      _this.onLoadingFinish = function (event) {
        var _a = _this.props,
            onLoad = _a.onLoad,
            onLoadEnd = _a.onLoadEnd;
        var url = event.nativeEvent.url;

        if (onLoad) {
          onLoad(event);
        }

        if (onLoadEnd) {
          onLoadEnd(event);
        }

        if (url === _this.startUrl) {
          _this.setState({
            viewState: 'IDLE'
          });
        }

        _this.updateNavigationState(event);
      };

      _this.onMessage = function (event) {
        var onMessage = _this.props.onMessage;

        if (onMessage) {
          onMessage(event);
        }
      };

      _this.onLoadingProgress = function (event) {
        var onLoadProgress = _this.props.onLoadProgress;
        var progress = event.nativeEvent.progress;

        if (progress === 1) {
          _this.setState(function (state) {
            if (state.viewState === 'LOADING') {
              return {
                viewState: 'IDLE'
              };
            }

            return null;
          });
        }

        if (onLoadProgress) {
          onLoadProgress(event);
        }
      };

      _this.onShouldStartLoadWithRequestCallback = function (shouldStart, url) {
        if (shouldStart) {
          UIManager.dispatchViewManagerCommand(_this.getWebViewHandle(), _this.getCommands().loadUrl, [String(url)]);
        }
      };

      return _this;
    }

    WebView.prototype.render = function () {
      var _a = this.props,
          onMessage = _a.onMessage,
          onShouldStartLoadWithRequestProp = _a.onShouldStartLoadWithRequest,
          originWhitelist = _a.originWhitelist,
          renderError = _a.renderError,
          renderLoading = _a.renderLoading,
          source = _a.source,
          style = _a.style,
          containerStyle = _a.containerStyle,
          _b = _a.nativeConfig,
          nativeConfig = _b === undefined ? {} : _b,
          otherProps = __rest(_a, ["onMessage", "onShouldStartLoadWithRequest", "originWhitelist", "renderError", "renderLoading", "source", "style", "containerStyle", "nativeConfig"]);

      var otherView = null;

      if (this.state.viewState === 'LOADING') {
        otherView = (renderLoading || _WebViewShared.defaultRenderLoading)();
      } else if (this.state.viewState === 'ERROR') {
        var errorEvent = this.state.lastErrorEvent;
        (0, _invariant.default)(errorEvent != null, 'lastErrorEvent expected to be non-null');
        otherView = (renderError || _WebViewShared.defaultRenderError)(errorEvent.domain, errorEvent.code, errorEvent.description);
      } else if (this.state.viewState !== 'IDLE') {
        console.error("RNCWebView invalid state encountered: " + this.state.viewState);
      }

      var webViewStyles = [_WebView.default.container, _WebView.default.webView, style];
      var webViewContainerStyle = [_WebView.default.container, containerStyle];

      if (typeof source !== "number" && source && 'method' in source) {
        if (source.method === 'POST' && source.headers) {
          console.warn('WebView: `source.headers` is not supported when using POST.');
        } else if (source.method === 'GET' && source.body) {
          console.warn('WebView: `source.body` is not supported when using GET.');
        }
      }

      var NativeWebView = nativeConfig.component || RNCWebView;
      var onShouldStartLoadWithRequest = (0, _WebViewShared.createOnShouldStartLoadWithRequest)(this.onShouldStartLoadWithRequestCallback, originWhitelist, onShouldStartLoadWithRequestProp);

      var webView = _react.default.createElement(NativeWebView, (0, _extends2.default)({
        key: "webViewKey"
      }, otherProps, {
        messagingEnabled: typeof onMessage === 'function',
        onLoadingError: this.onLoadingError,
        onLoadingFinish: this.onLoadingFinish,
        onLoadingProgress: this.onLoadingProgress,
        onLoadingStart: this.onLoadingStart,
        onHttpError: this.onHttpError,
        onMessage: this.onMessage,
        onShouldStartLoadWithRequest: onShouldStartLoadWithRequest,
        ref: this.webViewRef,
        source: resolveAssetSource(source),
        style: webViewStyles
      }, nativeConfig.props));

      return _react.default.createElement(_reactNative.View, {
        style: webViewContainerStyle
      }, webView, otherView);
    };

    WebView.defaultProps = {
      overScrollMode: 'always',
      javaScriptEnabled: true,
      thirdPartyCookiesEnabled: true,
      scalesPageToFit: true,
      allowsFullscreenVideo: false,
      allowFileAccess: false,
      saveFormDataDisabled: false,
      cacheEnabled: true,
      androidHardwareAccelerationDisabled: false,
      originWhitelist: _WebViewShared.defaultOriginWhitelist
    };

    WebView.isFileUploadSupported = function () {
      return __awaiter(undefined, undefined, undefined, function () {
        return __generator(this, function (_a) {
          return [2, _reactNative.NativeModules.RNCWebView.isFileUploadSupported()];
        });
      });
    };

    return WebView;
  }(_react.default.Component);

  var _default = WebView;
  exports.default = _default;
},14734,[14305,14344,10297,10033,14326,14737,14743]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.defaultRenderError = exports.defaultRenderLoading = exports.createOnShouldStartLoadWithRequest = exports.defaultOriginWhitelist = undefined;

  var _escapeStringRegexp = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));

  var _react = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));

  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);

  var _WebView = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));

  var __spreadArrays = this && this.__spreadArrays || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
      s += arguments[i].length;
    }

    for (var r = Array(s), k = 0, i = 0; i < il; i++) {
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
        r[k] = a[j];
      }
    }

    return r;
  };

  var defaultOriginWhitelist = ['http://*', 'https://*'];
  exports.defaultOriginWhitelist = defaultOriginWhitelist;

  var extractOrigin = function extractOrigin(url) {
    var result = /^[A-Za-z][A-Za-z0-9+\-.]+:(\/\/)?[^/]*/.exec(url);
    return result === null ? '' : result[0];
  };

  var originWhitelistToRegex = function originWhitelistToRegex(originWhitelist) {
    return "^" + (0, _escapeStringRegexp.default)(originWhitelist).replace(/\\\*/g, '.*');
  };

  var passesWhitelist = function passesWhitelist(compiledWhitelist, url) {
    var origin = extractOrigin(url);
    return compiledWhitelist.some(function (x) {
      return new RegExp(x).test(origin);
    });
  };

  var compileWhitelist = function compileWhitelist(originWhitelist) {
    return __spreadArrays(['about:blank'], originWhitelist || []).map(originWhitelistToRegex);
  };

  var createOnShouldStartLoadWithRequest = function createOnShouldStartLoadWithRequest(loadRequest, originWhitelist, onShouldStartLoadWithRequest) {
    return function (_a) {
      var nativeEvent = _a.nativeEvent;
      var shouldStart = true;
      var url = nativeEvent.url,
          lockIdentifier = nativeEvent.lockIdentifier;

      if (!passesWhitelist(compileWhitelist(originWhitelist), url)) {
        _reactNative.Linking.openURL(url);

        shouldStart = false;
      }

      if (onShouldStartLoadWithRequest) {
        shouldStart = onShouldStartLoadWithRequest(nativeEvent);
      }

      loadRequest(shouldStart, url, lockIdentifier);
    };
  };

  exports.createOnShouldStartLoadWithRequest = createOnShouldStartLoadWithRequest;

  var defaultRenderLoading = function defaultRenderLoading() {
    return _react.default.createElement(_reactNative.View, {
      style: _WebView.default.loadingOrErrorView
    }, _react.default.createElement(_reactNative.ActivityIndicator, null));
  };

  exports.defaultRenderLoading = defaultRenderLoading;

  var defaultRenderError = function defaultRenderError(errorDomain, errorCode, errorDesc) {
    return _react.default.createElement(_reactNative.View, {
      style: _WebView.default.loadingOrErrorView
    }, _react.default.createElement(_reactNative.Text, {
      style: _WebView.default.errorTextTitle
    }, "Error loading page"), _react.default.createElement(_reactNative.Text, {
      style: _WebView.default.errorText
    }, "Domain: " + errorDomain), _react.default.createElement(_reactNative.Text, {
      style: _WebView.default.errorText
    }, "Error Code: " + errorCode), _react.default.createElement(_reactNative.Text, {
      style: _WebView.default.errorText
    }, "Description: " + errorDesc));
  };

  exports.defaultRenderError = defaultRenderError;
},14737,[14305,14740,10297,10033,14743]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var matchOperatorsRegex = /[|\\{}()[\]^$+*?.-]/g;

  module.exports = function (string) {
    if (typeof string !== 'string') {
      throw new TypeError('Expected a string');
    }

    return string.replace(matchOperatorsRegex, '\\$&');
  };
},14740,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);

  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      overflow: 'hidden'
    },
    loadingOrErrorView: {
      position: 'absolute',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      backgroundColor: 'white'
    },
    loadingProgressBar: {
      height: 20
    },
    errorText: {
      fontSize: 14,
      textAlign: 'center',
      marginBottom: 2
    },
    errorTextTitle: {
      fontSize: 15,
      fontWeight: '500',
      marginBottom: 10
    },
    webView: {
      backgroundColor: '#ffffff'
    }
  });

  var _default = styles;
  exports.default = _default;
},14743,[10033]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);

  var _classCallCheck2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));

  var _createClass2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));

  var _possibleConstructorReturn2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));

  var _getPrototypeOf2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));

  var _inherits2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));

  var _RCTInputAccessoryViewNativeComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));

  var DeprecatedColorPropType = _$$_REQUIRE(_dependencyMap[7]);

  var Platform = _$$_REQUIRE(_dependencyMap[8]);

  var React = _$$_REQUIRE(_dependencyMap[9]);

  var StyleSheet = _$$_REQUIRE(_dependencyMap[10]);

  var InputAccessoryView = function (_React$Component) {
    (0, _inherits2.default)(InputAccessoryView, _React$Component);

    function InputAccessoryView() {
      (0, _classCallCheck2.default)(this, InputAccessoryView);
      return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(InputAccessoryView).apply(this, arguments));
    }

    (0, _createClass2.default)(InputAccessoryView, [{
      key: "render",
      value: function render() {
        {
          console.warn('<InputAccessoryView> is only supported on iOS.');
        }

        if (React.Children.count(this.props.children) === 0) {
          return null;
        }

        return React.createElement(_RCTInputAccessoryViewNativeComponent.default, {
          style: [this.props.style, styles.container],
          nativeID: this.props.nativeID,
          backgroundColor: this.props.backgroundColor
        }, this.props.children);
      }
    }]);
    return InputAccessoryView;
  }(React.Component);

  var styles = StyleSheet.create({
    container: {
      position: 'absolute'
    }
  });
  module.exports = InputAccessoryView;
},14746,[14305,14320,14323,14371,14377,14386,14749,14419,10066,10297,10441]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _codegenNativeComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));

  var _default = (0, _codegenNativeComponent.default)('RCTInputAccessoryView');

  exports.default = _default;
},14749,[14305,14608]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var TurboModuleRegistry = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1]));

  var _default = TurboModuleRegistry.get('ModalManager');

  exports.default = _default;
},14752,[14308,14341]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _codegenNativeComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));

  var _default = (0, _codegenNativeComponent.default)('ModalHostView', {
    interfaceOnly: true,
    paperComponentName: 'RCTModalHostView'
  });

  exports.default = _default;
},14755,[14305,14608]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var React = _$$_REQUIRE(_dependencyMap[0]);

  module.exports = React.createContext(0);
},14758,[10297]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var TurboModuleRegistry = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1]));

  var _default = TurboModuleRegistry.get('I18nManager');

  exports.default = _default;
},14761,[14308,14341]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);

  module.exports = (0, _reactNative.requireNativeComponent)('AndroidDropdownPicker');
},14764,[10033]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);

  module.exports = (0, _reactNative.requireNativeComponent)('AndroidDialogPicker');
},14767,[10033]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _extends = _$$_REQUIRE(_dependencyMap[0]);

  var _objectWithoutProperties = _$$_REQUIRE(_dependencyMap[1]);

  var Platform = _$$_REQUIRE(_dependencyMap[2]);

  var React = _$$_REQUIRE(_dependencyMap[3]);

  var View = _$$_REQUIRE(_dependencyMap[4]);

  var exported;
  {
    var SafeAreaView = function SafeAreaView(props, forwardedRef) {
      var emulateUnlessSupported = props.emulateUnlessSupported,
          localProps = _objectWithoutProperties(props, ["emulateUnlessSupported"]);

      return React.createElement(View, _extends({}, localProps, {
        ref: forwardedRef
      }));
    };

    var SafeAreaViewRef = React.forwardRef(SafeAreaView);
    SafeAreaViewRef.displayName = 'SafeAreaView';
    exported = SafeAreaViewRef;
  }
  module.exports = exported;
},14770,[14344,14407,10066,10297,10447]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _codegenNativeComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));

  var _default = (0, _codegenNativeComponent.default)('Slider', {
    interfaceOnly: true,
    paperComponentName: 'RCTSlider'
  });

  exports.default = _default;
},14773,[14305,14608]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _codegenNativeComponent = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));

  var _default = (0, _codegenNativeComponent.default)('Switch', {
    paperComponentName: 'RCTSwitch'
  });

  exports.default = _default;
},14776,[14305,14608]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _require = _$$_REQUIRE(_dependencyMap[0]),
      NativeComponent = _require.NativeComponent;

  var requireNativeComponent = _$$_REQUIRE(_dependencyMap[1]);

  module.exports = requireNativeComponent('AndroidSwitch');
},14779,[10114,10372]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _objectSpread = _$$_REQUIRE(_dependencyMap[0]);

  var PropTypes = _$$_REQUIRE(_dependencyMap[1]);

  var DeprecatedColorPropType = _$$_REQUIRE(_dependencyMap[2]);

  var DeprecatedViewPropTypes = _$$_REQUIRE(_dependencyMap[3]);

  var DocumentSelectionState = _$$_REQUIRE(_dependencyMap[4]);

  var Text = _$$_REQUIRE(_dependencyMap[5]);

  var DataDetectorTypes = ['phoneNumber', 'link', 'address', 'calendarEvent', 'none', 'all'];
  module.exports = _objectSpread({}, DeprecatedViewPropTypes, {
    autoCapitalize: PropTypes.oneOf(['none', 'sentences', 'words', 'characters']),
    autoCompleteType: PropTypes.oneOf(['cc-csc', 'cc-exp', 'cc-exp-month', 'cc-exp-year', 'cc-number', 'email', 'name', 'password', 'postal-code', 'street-address', 'tel', 'username', 'off']),
    autoCorrect: PropTypes.bool,
    spellCheck: PropTypes.bool,
    autoFocus: PropTypes.bool,
    allowFontScaling: PropTypes.bool,
    maxFontSizeMultiplier: PropTypes.number,
    editable: PropTypes.bool,
    keyboardType: PropTypes.oneOf(['default', 'email-address', 'numeric', 'phone-pad', 'number-pad', 'ascii-capable', 'numbers-and-punctuation', 'url', 'name-phone-pad', 'decimal-pad', 'twitter', 'web-search', 'visible-password']),
    keyboardAppearance: PropTypes.oneOf(['default', 'light', 'dark']),
    returnKeyType: PropTypes.oneOf(['done', 'go', 'next', 'search', 'send', 'none', 'previous', 'default', 'emergency-call', 'google', 'join', 'route', 'yahoo']),
    returnKeyLabel: PropTypes.string,
    maxLength: PropTypes.number,
    numberOfLines: PropTypes.number,
    disableFullscreenUI: PropTypes.bool,
    enablesReturnKeyAutomatically: PropTypes.bool,
    multiline: PropTypes.bool,
    textBreakStrategy: PropTypes.oneOf(['simple', 'highQuality', 'balanced']),
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onChange: PropTypes.func,
    onChangeText: PropTypes.func,
    onContentSizeChange: PropTypes.func,
    onTextInput: PropTypes.func,
    onEndEditing: PropTypes.func,
    onSelectionChange: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    onKeyPress: PropTypes.func,
    onLayout: PropTypes.func,
    onScroll: PropTypes.func,
    placeholder: PropTypes.string,
    placeholderTextColor: DeprecatedColorPropType,
    scrollEnabled: PropTypes.bool,
    secureTextEntry: PropTypes.bool,
    selectionColor: DeprecatedColorPropType,
    selectionState: PropTypes.instanceOf(DocumentSelectionState),
    selection: PropTypes.shape({
      start: PropTypes.number.isRequired,
      end: PropTypes.number
    }),
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    clearButtonMode: PropTypes.oneOf(['never', 'while-editing', 'unless-editing', 'always']),
    clearTextOnFocus: PropTypes.bool,
    selectTextOnFocus: PropTypes.bool,
    blurOnSubmit: PropTypes.bool,
    style: Text.propTypes.style,
    underlineColorAndroid: DeprecatedColorPropType,
    inlineImageLeft: PropTypes.string,
    inlineImagePadding: PropTypes.number,
    rejectResponderTermination: PropTypes.bool,
    dataDetectorTypes: PropTypes.oneOfType([PropTypes.oneOf(DataDetectorTypes), PropTypes.arrayOf(PropTypes.oneOf(DataDetectorTypes))]),
    caretHidden: PropTypes.bool,
    contextMenuHidden: PropTypes.bool,
    inputAccessoryViewID: PropTypes.string,
    textContentType: PropTypes.oneOf(['none', 'URL', 'addressCity', 'addressCityAndState', 'addressState', 'countryName', 'creditCardNumber', 'emailAddress', 'familyName', 'fullStreetAddress', 'givenName', 'jobTitle', 'location', 'middleName', 'name', 'namePrefix', 'nameSuffix', 'nickname', 'organizationName', 'postalCode', 'streetAddressLine1', 'streetAddressLine2', 'sublocality', 'telephoneNumber', 'username', 'password', 'newPassword', 'oneTimeCode']),
    showSoftInputOnFocus: PropTypes.bool
  });
},14782,[14314,10318,14419,14680,10789,10483]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  var keyOf = function keyOf(oneKeyObj) {
    var key;

    for (key in oneKeyObj) {
      if (!oneKeyObj.hasOwnProperty(key)) {
        continue;
      }

      return key;
    }

    return null;
  };

  module.exports = keyOf;
},14785,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var TurboModuleRegistry = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1]));

  var _default = TurboModuleRegistry.get('ActionSheetManager');

  exports.default = _default;
},14788,[14308,14341]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var TurboModuleRegistry = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1]));

  var _default = TurboModuleRegistry.get('HeadlessJsTaskSupport');

  exports.default = _default;
},14791,[14308,14341]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _classCallCheck2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));

  var _possibleConstructorReturn2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));

  var _getPrototypeOf2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));

  var _inherits2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));

  var _wrapNativeSuper2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));

  var HeadlessJsTaskError = function (_Error) {
    (0, _inherits2.default)(HeadlessJsTaskError, _Error);

    function HeadlessJsTaskError() {
      (0, _classCallCheck2.default)(this, HeadlessJsTaskError);
      return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(HeadlessJsTaskError).apply(this, arguments));
    }

    return HeadlessJsTaskError;
  }((0, _wrapNativeSuper2.default)(Error));

  exports.default = HeadlessJsTaskError;
},14794,[14305,14320,14371,14377,14386,14458]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var TurboModuleRegistry = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1]));

  var _default = TurboModuleRegistry.get('BugReporting');

  exports.default = _default;
},14797,[14308,14341]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var TurboModuleRegistry = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1]));

  var _default = TurboModuleRegistry.get('RedBox');

  exports.default = _default;
},14800,[14308,14341]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);

  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[1]);

  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));

  var _GlobalPerformanceLogger = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));

  var PerformanceLoggerContext = React.createContext(_GlobalPerformanceLogger.default);
  module.exports = PerformanceLoggerContext;
},14803,[14305,14308,10297,14548]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var React = _$$_REQUIRE(_dependencyMap[0]);

  var StyleSheet = _$$_REQUIRE(_dependencyMap[1]);

  var Text = _$$_REQUIRE(_dependencyMap[2]);

  var View = _$$_REQUIRE(_dependencyMap[3]);

  function ReactFabricIndicator() {
    return React.createElement(View, {
      style: styles.container
    }, React.createElement(Text, {
      style: styles.text
    }, "FABRIC"));
  }

  var styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0, 0.25)',
      position: 'absolute',
      top: 0,
      right: 0,
      padding: 2
    },
    text: {
      fontSize: 6,
      color: '#ffffff'
    }
  });
  module.exports = ReactFabricIndicator;
},14806,[10297,10441,10483,10447]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var TurboModuleRegistry = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1]));

  var _default = TurboModuleRegistry.get('DeviceEventManager');

  exports.default = _default;
},14809,[14308,14341]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _ReactNativePrivateInterface = _$$_REQUIRE(_dependencyMap[0]);

  var ReactFabric;
  {
    ReactFabric = _$$_REQUIRE(_dependencyMap[1]);
  }

  _ReactNativePrivateInterface.BatchedBridge.registerCallableModule('ReactFabric', ReactFabric);

  module.exports = ReactFabric;
},14812,[14566,14815]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  var _extends = _$$_REQUIRE(_dependencyMap[0]);

  _$$_REQUIRE(_dependencyMap[1]);

  var ReactNativePrivateInterface = _$$_REQUIRE(_dependencyMap[2]),
      React = _$$_REQUIRE(_dependencyMap[3]),
      Scheduler = _$$_REQUIRE(_dependencyMap[4]);

  function ReactError(error) {
    error.name = "Invariant Violation";
    return error;
  }

  var eventPluginOrder = null,
      namesToPlugins = {};

  function recomputePluginOrdering() {
    if (eventPluginOrder) for (var pluginName in namesToPlugins) {
      var pluginModule = namesToPlugins[pluginName],
          pluginIndex = eventPluginOrder.indexOf(pluginName);
      if (!(-1 < pluginIndex)) throw ReactError(Error("EventPluginRegistry: Cannot inject event plugins that do not exist in the plugin ordering, `" + pluginName + "`."));

      if (!plugins[pluginIndex]) {
        if (!pluginModule.extractEvents) throw ReactError(Error("EventPluginRegistry: Event plugins must implement an `extractEvents` method, but `" + pluginName + "` does not."));
        plugins[pluginIndex] = pluginModule;
        pluginIndex = pluginModule.eventTypes;

        for (var eventName in pluginIndex) {
          var JSCompiler_inline_result = undefined;
          var dispatchConfig = pluginIndex[eventName],
              pluginModule$jscomp$0 = pluginModule,
              eventName$jscomp$0 = eventName;
          if (eventNameDispatchConfigs.hasOwnProperty(eventName$jscomp$0)) throw ReactError(Error("EventPluginHub: More than one plugin attempted to publish the same event name, `" + eventName$jscomp$0 + "`."));
          eventNameDispatchConfigs[eventName$jscomp$0] = dispatchConfig;
          var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;

          if (phasedRegistrationNames) {
            for (JSCompiler_inline_result in phasedRegistrationNames) {
              phasedRegistrationNames.hasOwnProperty(JSCompiler_inline_result) && publishRegistrationName(phasedRegistrationNames[JSCompiler_inline_result], pluginModule$jscomp$0, eventName$jscomp$0);
            }

            JSCompiler_inline_result = true;
          } else dispatchConfig.registrationName ? (publishRegistrationName(dispatchConfig.registrationName, pluginModule$jscomp$0, eventName$jscomp$0), JSCompiler_inline_result = true) : JSCompiler_inline_result = false;

          if (!JSCompiler_inline_result) throw ReactError(Error("EventPluginRegistry: Failed to publish event `" + eventName + "` for plugin `" + pluginName + "`."));
        }
      }
    }
  }

  function publishRegistrationName(registrationName, pluginModule) {
    if (registrationNameModules[registrationName]) throw ReactError(Error("EventPluginHub: More than one plugin attempted to publish the same registration name, `" + registrationName + "`."));
    registrationNameModules[registrationName] = pluginModule;
  }

  var plugins = [],
      eventNameDispatchConfigs = {},
      registrationNameModules = {};

  function invokeGuardedCallbackImpl(name, func, context, a, b, c, d, e, f) {
    var funcArgs = Array.prototype.slice.call(arguments, 3);

    try {
      func.apply(context, funcArgs);
    } catch (error) {
      this.onError(error);
    }
  }

  var hasError = false,
      caughtError = null,
      hasRethrowError = false,
      rethrowError = null,
      reporter = {
    onError: function onError(error) {
      hasError = true;
      caughtError = error;
    }
  };

  function invokeGuardedCallback(name, func, context, a, b, c, d, e, f) {
    hasError = false;
    caughtError = null;
    invokeGuardedCallbackImpl.apply(reporter, arguments);
  }

  function invokeGuardedCallbackAndCatchFirstError(name, func, context, a, b, c, d, e, f) {
    invokeGuardedCallback.apply(this, arguments);

    if (hasError) {
      if (hasError) {
        var error = caughtError;
        hasError = false;
        caughtError = null;
      } else throw ReactError(Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue."));

      hasRethrowError || (hasRethrowError = true, rethrowError = error);
    }
  }

  var getFiberCurrentPropsFromNode = null,
      getInstanceFromNode = null,
      getNodeFromInstance = null;

  function executeDispatch(event, listener, inst) {
    var type = event.type || "unknown-event";
    event.currentTarget = getNodeFromInstance(inst);
    invokeGuardedCallbackAndCatchFirstError(type, listener, undefined, event);
    event.currentTarget = null;
  }

  function executeDirectDispatch(event) {
    var dispatchListener = event._dispatchListeners,
        dispatchInstance = event._dispatchInstances;
    if (Array.isArray(dispatchListener)) throw ReactError(Error("executeDirectDispatch(...): Invalid `event`."));
    event.currentTarget = dispatchListener ? getNodeFromInstance(dispatchInstance) : null;
    dispatchListener = dispatchListener ? dispatchListener(event) : null;
    event.currentTarget = null;
    event._dispatchListeners = null;
    event._dispatchInstances = null;
    return dispatchListener;
  }

  function accumulateInto(current, next) {
    if (null == next) throw ReactError(Error("accumulateInto(...): Accumulated items must not be null or undefined."));
    if (null == current) return next;

    if (Array.isArray(current)) {
      if (Array.isArray(next)) return current.push.apply(current, next), current;
      current.push(next);
      return current;
    }

    return Array.isArray(next) ? [current].concat(next) : [current, next];
  }

  function forEachAccumulated(arr, cb, scope) {
    Array.isArray(arr) ? arr.forEach(cb, scope) : arr && cb.call(scope, arr);
  }

  var eventQueue = null;

  function executeDispatchesAndReleaseTopLevel(e) {
    if (e) {
      var dispatchListeners = e._dispatchListeners,
          dispatchInstances = e._dispatchInstances;
      if (Array.isArray(dispatchListeners)) for (var i = 0; i < dispatchListeners.length && !e.isPropagationStopped(); i++) {
        executeDispatch(e, dispatchListeners[i], dispatchInstances[i]);
      } else dispatchListeners && executeDispatch(e, dispatchListeners, dispatchInstances);
      e._dispatchListeners = null;
      e._dispatchInstances = null;
      e.isPersistent() || e.constructor.release(e);
    }
  }

  var injection = {
    injectEventPluginOrder: function injectEventPluginOrder(injectedEventPluginOrder) {
      if (eventPluginOrder) throw ReactError(Error("EventPluginRegistry: Cannot inject event plugin ordering more than once. You are likely trying to load more than one copy of React."));
      eventPluginOrder = Array.prototype.slice.call(injectedEventPluginOrder);
      recomputePluginOrdering();
    },
    injectEventPluginsByName: function injectEventPluginsByName(injectedNamesToPlugins) {
      var isOrderingDirty = false,
          pluginName;

      for (pluginName in injectedNamesToPlugins) {
        if (injectedNamesToPlugins.hasOwnProperty(pluginName)) {
          var pluginModule = injectedNamesToPlugins[pluginName];

          if (!namesToPlugins.hasOwnProperty(pluginName) || namesToPlugins[pluginName] !== pluginModule) {
            if (namesToPlugins[pluginName]) throw ReactError(Error("EventPluginRegistry: Cannot inject two different event plugins using the same name, `" + pluginName + "`."));
            namesToPlugins[pluginName] = pluginModule;
            isOrderingDirty = true;
          }
        }
      }

      isOrderingDirty && recomputePluginOrdering();
    }
  };

  function getListener(inst, registrationName) {
    var listener = inst.stateNode;
    if (!listener) return null;
    var props = getFiberCurrentPropsFromNode(listener);
    if (!props) return null;
    listener = props[registrationName];

    a: switch (registrationName) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
        (props = !props.disabled) || (inst = inst.type, props = !("button" === inst || "input" === inst || "select" === inst || "textarea" === inst));
        inst = !props;
        break a;

      default:
        inst = false;
    }

    if (inst) return null;
    if (listener && "function" !== typeof listener) throw ReactError(Error("Expected `" + registrationName + "` listener to be a function, instead got a value of `" + typeof listener + "` type."));
    return listener;
  }

  function getParent(inst) {
    do {
      inst = inst.return;
    } while (inst && 5 !== inst.tag);

    return inst ? inst : null;
  }

  function traverseTwoPhase(inst, fn, arg) {
    for (var path = []; inst;) {
      path.push(inst), inst = getParent(inst);
    }

    for (inst = path.length; 0 < inst--;) {
      fn(path[inst], "captured", arg);
    }

    for (inst = 0; inst < path.length; inst++) {
      fn(path[inst], "bubbled", arg);
    }
  }

  function accumulateDirectionalDispatches(inst, phase, event) {
    if (phase = getListener(inst, event.dispatchConfig.phasedRegistrationNames[phase])) event._dispatchListeners = accumulateInto(event._dispatchListeners, phase), event._dispatchInstances = accumulateInto(event._dispatchInstances, inst);
  }

  function accumulateTwoPhaseDispatchesSingle(event) {
    event && event.dispatchConfig.phasedRegistrationNames && traverseTwoPhase(event._targetInst, accumulateDirectionalDispatches, event);
  }

  function accumulateTwoPhaseDispatchesSingleSkipTarget(event) {
    if (event && event.dispatchConfig.phasedRegistrationNames) {
      var targetInst = event._targetInst;
      targetInst = targetInst ? getParent(targetInst) : null;
      traverseTwoPhase(targetInst, accumulateDirectionalDispatches, event);
    }
  }

  function accumulateDirectDispatchesSingle(event) {
    if (event && event.dispatchConfig.registrationName) {
      var inst = event._targetInst;

      if (inst && event && event.dispatchConfig.registrationName) {
        var listener = getListener(inst, event.dispatchConfig.registrationName);
        listener && (event._dispatchListeners = accumulateInto(event._dispatchListeners, listener), event._dispatchInstances = accumulateInto(event._dispatchInstances, inst));
      }
    }
  }

  function functionThatReturnsTrue() {
    return true;
  }

  function functionThatReturnsFalse() {
    return false;
  }

  function SyntheticEvent(dispatchConfig, targetInst, nativeEvent, nativeEventTarget) {
    this.dispatchConfig = dispatchConfig;
    this._targetInst = targetInst;
    this.nativeEvent = nativeEvent;
    dispatchConfig = this.constructor.Interface;

    for (var propName in dispatchConfig) {
      dispatchConfig.hasOwnProperty(propName) && ((targetInst = dispatchConfig[propName]) ? this[propName] = targetInst(nativeEvent) : "target" === propName ? this.target = nativeEventTarget : this[propName] = nativeEvent[propName]);
    }

    this.isDefaultPrevented = (null != nativeEvent.defaultPrevented ? nativeEvent.defaultPrevented : false === nativeEvent.returnValue) ? functionThatReturnsTrue : functionThatReturnsFalse;
    this.isPropagationStopped = functionThatReturnsFalse;
    return this;
  }

  _extends(SyntheticEvent.prototype, {
    preventDefault: function preventDefault() {
      this.defaultPrevented = true;
      var event = this.nativeEvent;
      event && (event.preventDefault ? event.preventDefault() : "unknown" !== typeof event.returnValue && (event.returnValue = false), this.isDefaultPrevented = functionThatReturnsTrue);
    },
    stopPropagation: function stopPropagation() {
      var event = this.nativeEvent;
      event && (event.stopPropagation ? event.stopPropagation() : "unknown" !== typeof event.cancelBubble && (event.cancelBubble = true), this.isPropagationStopped = functionThatReturnsTrue);
    },
    persist: function persist() {
      this.isPersistent = functionThatReturnsTrue;
    },
    isPersistent: functionThatReturnsFalse,
    destructor: function destructor() {
      var Interface = this.constructor.Interface,
          propName;

      for (propName in Interface) {
        this[propName] = null;
      }

      this.nativeEvent = this._targetInst = this.dispatchConfig = null;
      this.isPropagationStopped = this.isDefaultPrevented = functionThatReturnsFalse;
      this._dispatchInstances = this._dispatchListeners = null;
    }
  });

  SyntheticEvent.Interface = {
    type: null,
    target: null,
    currentTarget: function currentTarget() {
      return null;
    },
    eventPhase: null,
    bubbles: null,
    cancelable: null,
    timeStamp: function timeStamp(event) {
      return event.timeStamp || Date.now();
    },
    defaultPrevented: null,
    isTrusted: null
  };

  SyntheticEvent.extend = function (Interface) {
    function E() {}

    function Class() {
      return Super.apply(this, arguments);
    }

    var Super = this;
    E.prototype = Super.prototype;
    var prototype = new E();

    _extends(prototype, Class.prototype);

    Class.prototype = prototype;
    Class.prototype.constructor = Class;
    Class.Interface = _extends({}, Super.Interface, Interface);
    Class.extend = Super.extend;
    addEventPoolingTo(Class);
    return Class;
  };

  addEventPoolingTo(SyntheticEvent);

  function getPooledEvent(dispatchConfig, targetInst, nativeEvent, nativeInst) {
    if (this.eventPool.length) {
      var instance = this.eventPool.pop();
      this.call(instance, dispatchConfig, targetInst, nativeEvent, nativeInst);
      return instance;
    }

    return new this(dispatchConfig, targetInst, nativeEvent, nativeInst);
  }

  function releasePooledEvent(event) {
    if (!(event instanceof this)) throw ReactError(Error("Trying to release an event instance into a pool of a different type."));
    event.destructor();
    10 > this.eventPool.length && this.eventPool.push(event);
  }

  function addEventPoolingTo(EventConstructor) {
    EventConstructor.eventPool = [];
    EventConstructor.getPooled = getPooledEvent;
    EventConstructor.release = releasePooledEvent;
  }

  var ResponderSyntheticEvent = SyntheticEvent.extend({
    touchHistory: function touchHistory() {
      return null;
    }
  });

  function isStartish(topLevelType) {
    return "topTouchStart" === topLevelType;
  }

  function isMoveish(topLevelType) {
    return "topTouchMove" === topLevelType;
  }

  var startDependencies = ["topTouchStart"],
      moveDependencies = ["topTouchMove"],
      endDependencies = ["topTouchCancel", "topTouchEnd"],
      touchBank = [],
      touchHistory = {
    touchBank: touchBank,
    numberActiveTouches: 0,
    indexOfSingleActiveTouch: -1,
    mostRecentTimeStamp: 0
  };

  function timestampForTouch(touch) {
    return touch.timeStamp || touch.timestamp;
  }

  function getTouchIdentifier(_ref) {
    _ref = _ref.identifier;
    if (null == _ref) throw ReactError(Error("Touch object is missing identifier."));
    return _ref;
  }

  function recordTouchStart(touch) {
    var identifier = getTouchIdentifier(touch),
        touchRecord = touchBank[identifier];
    touchRecord ? (touchRecord.touchActive = true, touchRecord.startPageX = touch.pageX, touchRecord.startPageY = touch.pageY, touchRecord.startTimeStamp = timestampForTouch(touch), touchRecord.currentPageX = touch.pageX, touchRecord.currentPageY = touch.pageY, touchRecord.currentTimeStamp = timestampForTouch(touch), touchRecord.previousPageX = touch.pageX, touchRecord.previousPageY = touch.pageY, touchRecord.previousTimeStamp = timestampForTouch(touch)) : (touchRecord = {
      touchActive: true,
      startPageX: touch.pageX,
      startPageY: touch.pageY,
      startTimeStamp: timestampForTouch(touch),
      currentPageX: touch.pageX,
      currentPageY: touch.pageY,
      currentTimeStamp: timestampForTouch(touch),
      previousPageX: touch.pageX,
      previousPageY: touch.pageY,
      previousTimeStamp: timestampForTouch(touch)
    }, touchBank[identifier] = touchRecord);
    touchHistory.mostRecentTimeStamp = timestampForTouch(touch);
  }

  function recordTouchMove(touch) {
    var touchRecord = touchBank[getTouchIdentifier(touch)];
    touchRecord ? (touchRecord.touchActive = true, touchRecord.previousPageX = touchRecord.currentPageX, touchRecord.previousPageY = touchRecord.currentPageY, touchRecord.previousTimeStamp = touchRecord.currentTimeStamp, touchRecord.currentPageX = touch.pageX, touchRecord.currentPageY = touch.pageY, touchRecord.currentTimeStamp = timestampForTouch(touch), touchHistory.mostRecentTimeStamp = timestampForTouch(touch)) : console.warn("Cannot record touch move without a touch start.\nTouch Move: %s\n", "Touch Bank: %s", printTouch(touch), printTouchBank());
  }

  function recordTouchEnd(touch) {
    var touchRecord = touchBank[getTouchIdentifier(touch)];
    touchRecord ? (touchRecord.touchActive = false, touchRecord.previousPageX = touchRecord.currentPageX, touchRecord.previousPageY = touchRecord.currentPageY, touchRecord.previousTimeStamp = touchRecord.currentTimeStamp, touchRecord.currentPageX = touch.pageX, touchRecord.currentPageY = touch.pageY, touchRecord.currentTimeStamp = timestampForTouch(touch), touchHistory.mostRecentTimeStamp = timestampForTouch(touch)) : console.warn("Cannot record touch end without a touch start.\nTouch End: %s\n", "Touch Bank: %s", printTouch(touch), printTouchBank());
  }

  function printTouch(touch) {
    return JSON.stringify({
      identifier: touch.identifier,
      pageX: touch.pageX,
      pageY: touch.pageY,
      timestamp: timestampForTouch(touch)
    });
  }

  function printTouchBank() {
    var printed = JSON.stringify(touchBank.slice(0, 20));
    20 < touchBank.length && (printed += " (original size: " + touchBank.length + ")");
    return printed;
  }

  var ResponderTouchHistoryStore = {
    recordTouchTrack: function recordTouchTrack(topLevelType, nativeEvent) {
      if (isMoveish(topLevelType)) nativeEvent.changedTouches.forEach(recordTouchMove);else if (isStartish(topLevelType)) nativeEvent.changedTouches.forEach(recordTouchStart), touchHistory.numberActiveTouches = nativeEvent.touches.length, 1 === touchHistory.numberActiveTouches && (touchHistory.indexOfSingleActiveTouch = nativeEvent.touches[0].identifier);else if ("topTouchEnd" === topLevelType || "topTouchCancel" === topLevelType) if (nativeEvent.changedTouches.forEach(recordTouchEnd), touchHistory.numberActiveTouches = nativeEvent.touches.length, 1 === touchHistory.numberActiveTouches) for (topLevelType = 0; topLevelType < touchBank.length; topLevelType++) {
        if (nativeEvent = touchBank[topLevelType], null != nativeEvent && nativeEvent.touchActive) {
          touchHistory.indexOfSingleActiveTouch = topLevelType;
          break;
        }
      }
    },
    touchHistory: touchHistory
  };

  function accumulate(current, next) {
    if (null == next) throw ReactError(Error("accumulate(...): Accumulated items must not be null or undefined."));
    return null == current ? next : Array.isArray(current) ? current.concat(next) : Array.isArray(next) ? [current].concat(next) : [current, next];
  }

  var responderInst = null,
      trackedTouchCount = 0;

  function changeResponder(nextResponderInst, blockHostResponder) {
    var oldResponderInst = responderInst;
    responderInst = nextResponderInst;
    if (null !== ResponderEventPlugin.GlobalResponderHandler) ResponderEventPlugin.GlobalResponderHandler.onChange(oldResponderInst, nextResponderInst, blockHostResponder);
  }

  var eventTypes = {
    startShouldSetResponder: {
      phasedRegistrationNames: {
        bubbled: "onStartShouldSetResponder",
        captured: "onStartShouldSetResponderCapture"
      },
      dependencies: startDependencies
    },
    scrollShouldSetResponder: {
      phasedRegistrationNames: {
        bubbled: "onScrollShouldSetResponder",
        captured: "onScrollShouldSetResponderCapture"
      },
      dependencies: ["topScroll"]
    },
    selectionChangeShouldSetResponder: {
      phasedRegistrationNames: {
        bubbled: "onSelectionChangeShouldSetResponder",
        captured: "onSelectionChangeShouldSetResponderCapture"
      },
      dependencies: ["topSelectionChange"]
    },
    moveShouldSetResponder: {
      phasedRegistrationNames: {
        bubbled: "onMoveShouldSetResponder",
        captured: "onMoveShouldSetResponderCapture"
      },
      dependencies: moveDependencies
    },
    responderStart: {
      registrationName: "onResponderStart",
      dependencies: startDependencies
    },
    responderMove: {
      registrationName: "onResponderMove",
      dependencies: moveDependencies
    },
    responderEnd: {
      registrationName: "onResponderEnd",
      dependencies: endDependencies
    },
    responderRelease: {
      registrationName: "onResponderRelease",
      dependencies: endDependencies
    },
    responderTerminationRequest: {
      registrationName: "onResponderTerminationRequest",
      dependencies: []
    },
    responderGrant: {
      registrationName: "onResponderGrant",
      dependencies: []
    },
    responderReject: {
      registrationName: "onResponderReject",
      dependencies: []
    },
    responderTerminate: {
      registrationName: "onResponderTerminate",
      dependencies: []
    }
  },
      ResponderEventPlugin = {
    _getResponder: function _getResponder() {
      return responderInst;
    },
    eventTypes: eventTypes,
    extractEvents: function extractEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
      if (isStartish(topLevelType)) trackedTouchCount += 1;else if ("topTouchEnd" === topLevelType || "topTouchCancel" === topLevelType) if (0 <= trackedTouchCount) --trackedTouchCount;else return console.error("Ended a touch event which was not counted in `trackedTouchCount`."), null;
      ResponderTouchHistoryStore.recordTouchTrack(topLevelType, nativeEvent);

      if (targetInst && ("topScroll" === topLevelType && !nativeEvent.responderIgnoreScroll || 0 < trackedTouchCount && "topSelectionChange" === topLevelType || isStartish(topLevelType) || isMoveish(topLevelType))) {
        var JSCompiler_temp = isStartish(topLevelType) ? eventTypes.startShouldSetResponder : isMoveish(topLevelType) ? eventTypes.moveShouldSetResponder : "topSelectionChange" === topLevelType ? eventTypes.selectionChangeShouldSetResponder : eventTypes.scrollShouldSetResponder;
        if (responderInst) b: {
          var JSCompiler_temp$jscomp$0 = responderInst;

          for (var depthA = 0, tempA = JSCompiler_temp$jscomp$0; tempA; tempA = getParent(tempA)) {
            depthA++;
          }

          tempA = 0;

          for (var tempB = targetInst; tempB; tempB = getParent(tempB)) {
            tempA++;
          }

          for (; 0 < depthA - tempA;) {
            JSCompiler_temp$jscomp$0 = getParent(JSCompiler_temp$jscomp$0), depthA--;
          }

          for (; 0 < tempA - depthA;) {
            targetInst = getParent(targetInst), tempA--;
          }

          for (; depthA--;) {
            if (JSCompiler_temp$jscomp$0 === targetInst || JSCompiler_temp$jscomp$0 === targetInst.alternate) break b;
            JSCompiler_temp$jscomp$0 = getParent(JSCompiler_temp$jscomp$0);
            targetInst = getParent(targetInst);
          }

          JSCompiler_temp$jscomp$0 = null;
        } else JSCompiler_temp$jscomp$0 = targetInst;
        targetInst = JSCompiler_temp$jscomp$0 === responderInst;
        JSCompiler_temp$jscomp$0 = ResponderSyntheticEvent.getPooled(JSCompiler_temp, JSCompiler_temp$jscomp$0, nativeEvent, nativeEventTarget);
        JSCompiler_temp$jscomp$0.touchHistory = ResponderTouchHistoryStore.touchHistory;
        targetInst ? forEachAccumulated(JSCompiler_temp$jscomp$0, accumulateTwoPhaseDispatchesSingleSkipTarget) : forEachAccumulated(JSCompiler_temp$jscomp$0, accumulateTwoPhaseDispatchesSingle);

        b: {
          JSCompiler_temp = JSCompiler_temp$jscomp$0._dispatchListeners;
          targetInst = JSCompiler_temp$jscomp$0._dispatchInstances;
          if (Array.isArray(JSCompiler_temp)) for (depthA = 0; depthA < JSCompiler_temp.length && !JSCompiler_temp$jscomp$0.isPropagationStopped(); depthA++) {
            if (JSCompiler_temp[depthA](JSCompiler_temp$jscomp$0, targetInst[depthA])) {
              JSCompiler_temp = targetInst[depthA];
              break b;
            }
          } else if (JSCompiler_temp && JSCompiler_temp(JSCompiler_temp$jscomp$0, targetInst)) {
            JSCompiler_temp = targetInst;
            break b;
          }
          JSCompiler_temp = null;
        }

        JSCompiler_temp$jscomp$0._dispatchInstances = null;
        JSCompiler_temp$jscomp$0._dispatchListeners = null;
        JSCompiler_temp$jscomp$0.isPersistent() || JSCompiler_temp$jscomp$0.constructor.release(JSCompiler_temp$jscomp$0);
        JSCompiler_temp && JSCompiler_temp !== responderInst ? (JSCompiler_temp$jscomp$0 = undefined, targetInst = ResponderSyntheticEvent.getPooled(eventTypes.responderGrant, JSCompiler_temp, nativeEvent, nativeEventTarget), targetInst.touchHistory = ResponderTouchHistoryStore.touchHistory, forEachAccumulated(targetInst, accumulateDirectDispatchesSingle), depthA = true === executeDirectDispatch(targetInst), responderInst ? (tempA = ResponderSyntheticEvent.getPooled(eventTypes.responderTerminationRequest, responderInst, nativeEvent, nativeEventTarget), tempA.touchHistory = ResponderTouchHistoryStore.touchHistory, forEachAccumulated(tempA, accumulateDirectDispatchesSingle), tempB = !tempA._dispatchListeners || executeDirectDispatch(tempA), tempA.isPersistent() || tempA.constructor.release(tempA), tempB ? (tempA = ResponderSyntheticEvent.getPooled(eventTypes.responderTerminate, responderInst, nativeEvent, nativeEventTarget), tempA.touchHistory = ResponderTouchHistoryStore.touchHistory, forEachAccumulated(tempA, accumulateDirectDispatchesSingle), JSCompiler_temp$jscomp$0 = accumulate(JSCompiler_temp$jscomp$0, [targetInst, tempA]), changeResponder(JSCompiler_temp, depthA)) : (JSCompiler_temp = ResponderSyntheticEvent.getPooled(eventTypes.responderReject, JSCompiler_temp, nativeEvent, nativeEventTarget), JSCompiler_temp.touchHistory = ResponderTouchHistoryStore.touchHistory, forEachAccumulated(JSCompiler_temp, accumulateDirectDispatchesSingle), JSCompiler_temp$jscomp$0 = accumulate(JSCompiler_temp$jscomp$0, JSCompiler_temp))) : (JSCompiler_temp$jscomp$0 = accumulate(JSCompiler_temp$jscomp$0, targetInst), changeResponder(JSCompiler_temp, depthA)), JSCompiler_temp = JSCompiler_temp$jscomp$0) : JSCompiler_temp = null;
      } else JSCompiler_temp = null;

      JSCompiler_temp$jscomp$0 = responderInst && isStartish(topLevelType);
      targetInst = responderInst && isMoveish(topLevelType);
      depthA = responderInst && ("topTouchEnd" === topLevelType || "topTouchCancel" === topLevelType);
      if (JSCompiler_temp$jscomp$0 = JSCompiler_temp$jscomp$0 ? eventTypes.responderStart : targetInst ? eventTypes.responderMove : depthA ? eventTypes.responderEnd : null) JSCompiler_temp$jscomp$0 = ResponderSyntheticEvent.getPooled(JSCompiler_temp$jscomp$0, responderInst, nativeEvent, nativeEventTarget), JSCompiler_temp$jscomp$0.touchHistory = ResponderTouchHistoryStore.touchHistory, forEachAccumulated(JSCompiler_temp$jscomp$0, accumulateDirectDispatchesSingle), JSCompiler_temp = accumulate(JSCompiler_temp, JSCompiler_temp$jscomp$0);
      JSCompiler_temp$jscomp$0 = responderInst && "topTouchCancel" === topLevelType;
      if (topLevelType = responderInst && !JSCompiler_temp$jscomp$0 && ("topTouchEnd" === topLevelType || "topTouchCancel" === topLevelType)) a: {
        if ((topLevelType = nativeEvent.touches) && 0 !== topLevelType.length) for (targetInst = 0; targetInst < topLevelType.length; targetInst++) {
          if (depthA = topLevelType[targetInst].target, null !== depthA && undefined !== depthA && 0 !== depthA) {
            tempA = getInstanceFromNode(depthA);

            b: {
              for (depthA = responderInst; tempA;) {
                if (depthA === tempA || depthA === tempA.alternate) {
                  depthA = true;
                  break b;
                }

                tempA = getParent(tempA);
              }

              depthA = false;
            }

            if (depthA) {
              topLevelType = false;
              break a;
            }
          }
        }
        topLevelType = true;
      }
      if (topLevelType = JSCompiler_temp$jscomp$0 ? eventTypes.responderTerminate : topLevelType ? eventTypes.responderRelease : null) nativeEvent = ResponderSyntheticEvent.getPooled(topLevelType, responderInst, nativeEvent, nativeEventTarget), nativeEvent.touchHistory = ResponderTouchHistoryStore.touchHistory, forEachAccumulated(nativeEvent, accumulateDirectDispatchesSingle), JSCompiler_temp = accumulate(JSCompiler_temp, nativeEvent), changeResponder(null);
      return JSCompiler_temp;
    },
    GlobalResponderHandler: null,
    injection: {
      injectGlobalResponderHandler: function injectGlobalResponderHandler(GlobalResponderHandler) {
        ResponderEventPlugin.GlobalResponderHandler = GlobalResponderHandler;
      }
    }
  },
      customBubblingEventTypes = ReactNativePrivateInterface.ReactNativeViewConfigRegistry.customBubblingEventTypes,
      customDirectEventTypes = ReactNativePrivateInterface.ReactNativeViewConfigRegistry.customDirectEventTypes;
  injection.injectEventPluginOrder(["ResponderEventPlugin", "ReactNativeBridgeEventPlugin"]);
  injection.injectEventPluginsByName({
    ResponderEventPlugin: ResponderEventPlugin,
    ReactNativeBridgeEventPlugin: {
      eventTypes: {},
      extractEvents: function extractEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
        if (null == targetInst) return null;
        var bubbleDispatchConfig = customBubblingEventTypes[topLevelType],
            directDispatchConfig = customDirectEventTypes[topLevelType];
        if (!bubbleDispatchConfig && !directDispatchConfig) throw ReactError(Error('Unsupported top level event type "' + topLevelType + '" dispatched'));
        topLevelType = SyntheticEvent.getPooled(bubbleDispatchConfig || directDispatchConfig, targetInst, nativeEvent, nativeEventTarget);
        if (bubbleDispatchConfig) forEachAccumulated(topLevelType, accumulateTwoPhaseDispatchesSingle);else if (directDispatchConfig) forEachAccumulated(topLevelType, accumulateDirectDispatchesSingle);else return null;
        return topLevelType;
      }
    }
  });

  function getInstanceFromInstance(instanceHandle) {
    return instanceHandle;
  }

  getFiberCurrentPropsFromNode = function getFiberCurrentPropsFromNode(inst) {
    return inst.canonical.currentProps;
  };

  getInstanceFromNode = getInstanceFromInstance;

  getNodeFromInstance = function getNodeFromInstance(inst) {
    inst = inst.stateNode.canonical._nativeTag;
    if (!inst) throw ReactError(Error("All native instances should have a tag."));
    return inst;
  };

  ResponderEventPlugin.injection.injectGlobalResponderHandler({
    onChange: function onChange(from, to, blockNativeResponder) {
      null !== to ? ReactNativePrivateInterface.UIManager.setJSResponder(to.stateNode.canonical._nativeTag, blockNativeResponder) : ReactNativePrivateInterface.UIManager.clearJSResponder();
    }
  });
  var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  ReactSharedInternals.hasOwnProperty("ReactCurrentDispatcher") || (ReactSharedInternals.ReactCurrentDispatcher = {
    current: null
  });
  ReactSharedInternals.hasOwnProperty("ReactCurrentBatchConfig") || (ReactSharedInternals.ReactCurrentBatchConfig = {
    suspense: null
  });
  var hasSymbol = "function" === typeof Symbol && (typeof Symbol === "function" ? Symbol.for : "@@for"),
      REACT_ELEMENT_TYPE = hasSymbol ? (typeof Symbol === "function" ? Symbol.for : "@@for")("react.element") : 60103,
      REACT_PORTAL_TYPE = hasSymbol ? (typeof Symbol === "function" ? Symbol.for : "@@for")("react.portal") : 60106,
      REACT_FRAGMENT_TYPE = hasSymbol ? (typeof Symbol === "function" ? Symbol.for : "@@for")("react.fragment") : 60107,
      REACT_STRICT_MODE_TYPE = hasSymbol ? (typeof Symbol === "function" ? Symbol.for : "@@for")("react.strict_mode") : 60108,
      REACT_PROFILER_TYPE = hasSymbol ? (typeof Symbol === "function" ? Symbol.for : "@@for")("react.profiler") : 60114,
      REACT_PROVIDER_TYPE = hasSymbol ? (typeof Symbol === "function" ? Symbol.for : "@@for")("react.provider") : 60109,
      REACT_CONTEXT_TYPE = hasSymbol ? (typeof Symbol === "function" ? Symbol.for : "@@for")("react.context") : 60110,
      REACT_CONCURRENT_MODE_TYPE = hasSymbol ? (typeof Symbol === "function" ? Symbol.for : "@@for")("react.concurrent_mode") : 60111,
      REACT_FORWARD_REF_TYPE = hasSymbol ? (typeof Symbol === "function" ? Symbol.for : "@@for")("react.forward_ref") : 60112,
      REACT_SUSPENSE_TYPE = hasSymbol ? (typeof Symbol === "function" ? Symbol.for : "@@for")("react.suspense") : 60113,
      REACT_SUSPENSE_LIST_TYPE = hasSymbol ? (typeof Symbol === "function" ? Symbol.for : "@@for")("react.suspense_list") : 60120,
      REACT_MEMO_TYPE = hasSymbol ? (typeof Symbol === "function" ? Symbol.for : "@@for")("react.memo") : 60115,
      REACT_LAZY_TYPE = hasSymbol ? (typeof Symbol === "function" ? Symbol.for : "@@for")("react.lazy") : 60116;
  hasSymbol && (typeof Symbol === "function" ? Symbol.for : "@@for")("react.fundamental");
  hasSymbol && (typeof Symbol === "function" ? Symbol.for : "@@for")("react.responder");
  var MAYBE_ITERATOR_SYMBOL = "function" === typeof Symbol && (typeof Symbol === "function" ? Symbol.iterator : "@@iterator");

  function getIteratorFn(maybeIterable) {
    if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
    maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
    return "function" === typeof maybeIterable ? maybeIterable : null;
  }

  function getComponentName(type) {
    if (null == type) return null;
    if ("function" === typeof type) return type.displayName || type.name || null;
    if ("string" === typeof type) return type;

    switch (type) {
      case REACT_FRAGMENT_TYPE:
        return "Fragment";

      case REACT_PORTAL_TYPE:
        return "Portal";

      case REACT_PROFILER_TYPE:
        return "Profiler";

      case REACT_STRICT_MODE_TYPE:
        return "StrictMode";

      case REACT_SUSPENSE_TYPE:
        return "Suspense";

      case REACT_SUSPENSE_LIST_TYPE:
        return "SuspenseList";
    }

    if ("object" === typeof type) switch (type.$$typeof) {
      case REACT_CONTEXT_TYPE:
        return "Context.Consumer";

      case REACT_PROVIDER_TYPE:
        return "Context.Provider";

      case REACT_FORWARD_REF_TYPE:
        var innerType = type.render;
        innerType = innerType.displayName || innerType.name || "";
        return type.displayName || ("" !== innerType ? "ForwardRef(" + innerType + ")" : "ForwardRef");

      case REACT_MEMO_TYPE:
        return getComponentName(type.type);

      case REACT_LAZY_TYPE:
        if (type = 1 === type._status ? type._result : null) return getComponentName(type);
    }
    return null;
  }

  function isFiberMountedImpl(fiber) {
    var node = fiber;
    if (fiber.alternate) for (; node.return;) {
      node = node.return;
    } else {
      if (0 !== (node.effectTag & 2)) return 1;

      for (; node.return;) {
        if (node = node.return, 0 !== (node.effectTag & 2)) return 1;
      }
    }
    return 3 === node.tag ? 2 : 3;
  }

  function assertIsMounted(fiber) {
    if (2 !== isFiberMountedImpl(fiber)) throw ReactError(Error("Unable to find node on an unmounted component."));
  }

  function findCurrentFiberUsingSlowPath(fiber) {
    var alternate = fiber.alternate;

    if (!alternate) {
      alternate = isFiberMountedImpl(fiber);
      if (3 === alternate) throw ReactError(Error("Unable to find node on an unmounted component."));
      return 1 === alternate ? null : fiber;
    }

    for (var a = fiber, b = alternate;;) {
      var parentA = a.return;
      if (null === parentA) break;
      var parentB = parentA.alternate;

      if (null === parentB) {
        b = parentA.return;

        if (null !== b) {
          a = b;
          continue;
        }

        break;
      }

      if (parentA.child === parentB.child) {
        for (parentB = parentA.child; parentB;) {
          if (parentB === a) return assertIsMounted(parentA), fiber;
          if (parentB === b) return assertIsMounted(parentA), alternate;
          parentB = parentB.sibling;
        }

        throw ReactError(Error("Unable to find node on an unmounted component."));
      }

      if (a.return !== b.return) a = parentA, b = parentB;else {
        for (var didFindChild = false, _child = parentA.child; _child;) {
          if (_child === a) {
            didFindChild = true;
            a = parentA;
            b = parentB;
            break;
          }

          if (_child === b) {
            didFindChild = true;
            b = parentA;
            a = parentB;
            break;
          }

          _child = _child.sibling;
        }

        if (!didFindChild) {
          for (_child = parentB.child; _child;) {
            if (_child === a) {
              didFindChild = true;
              a = parentB;
              b = parentA;
              break;
            }

            if (_child === b) {
              didFindChild = true;
              b = parentB;
              a = parentA;
              break;
            }

            _child = _child.sibling;
          }

          if (!didFindChild) throw ReactError(Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue."));
        }
      }
      if (a.alternate !== b) throw ReactError(Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue."));
    }

    if (3 !== a.tag) throw ReactError(Error("Unable to find node on an unmounted component."));
    return a.stateNode.current === a ? fiber : alternate;
  }

  function findCurrentHostFiber(parent) {
    parent = findCurrentFiberUsingSlowPath(parent);
    if (!parent) return null;

    for (var node = parent;;) {
      if (5 === node.tag || 6 === node.tag) return node;
      if (node.child) node.child.return = node, node = node.child;else {
        if (node === parent) break;

        for (; !node.sibling;) {
          if (!node.return || node.return === parent) return null;
          node = node.return;
        }

        node.sibling.return = node.return;
        node = node.sibling;
      }
    }

    return null;
  }

  function mountSafeCallback_NOT_REALLY_SAFE(context, callback) {
    return function () {
      if (callback && ("boolean" !== typeof context.__isMounted || context.__isMounted)) return callback.apply(context, arguments);
    };
  }

  var emptyObject = {},
      removedKeys = null,
      removedKeyCount = 0;

  function restoreDeletedValuesInNestedArray(updatePayload, node, validAttributes) {
    if (Array.isArray(node)) for (var i = node.length; i-- && 0 < removedKeyCount;) {
      restoreDeletedValuesInNestedArray(updatePayload, node[i], validAttributes);
    } else if (node && 0 < removedKeyCount) for (i in removedKeys) {
      if (removedKeys[i]) {
        var nextProp = node[i];

        if (undefined !== nextProp) {
          var attributeConfig = validAttributes[i];

          if (attributeConfig) {
            "function" === typeof nextProp && (nextProp = true);
            "undefined" === typeof nextProp && (nextProp = null);
            if ("object" !== typeof attributeConfig) updatePayload[i] = nextProp;else if ("function" === typeof attributeConfig.diff || "function" === typeof attributeConfig.process) nextProp = "function" === typeof attributeConfig.process ? attributeConfig.process(nextProp) : nextProp, updatePayload[i] = nextProp;
            removedKeys[i] = false;
            removedKeyCount--;
          }
        }
      }
    }
  }

  function diffNestedProperty(updatePayload, prevProp, nextProp, validAttributes) {
    if (!updatePayload && prevProp === nextProp) return updatePayload;
    if (!prevProp || !nextProp) return nextProp ? addNestedProperty(updatePayload, nextProp, validAttributes) : prevProp ? clearNestedProperty(updatePayload, prevProp, validAttributes) : updatePayload;
    if (!Array.isArray(prevProp) && !Array.isArray(nextProp)) return diffProperties(updatePayload, prevProp, nextProp, validAttributes);

    if (Array.isArray(prevProp) && Array.isArray(nextProp)) {
      var minLength = prevProp.length < nextProp.length ? prevProp.length : nextProp.length,
          i;

      for (i = 0; i < minLength; i++) {
        updatePayload = diffNestedProperty(updatePayload, prevProp[i], nextProp[i], validAttributes);
      }

      for (; i < prevProp.length; i++) {
        updatePayload = clearNestedProperty(updatePayload, prevProp[i], validAttributes);
      }

      for (; i < nextProp.length; i++) {
        updatePayload = addNestedProperty(updatePayload, nextProp[i], validAttributes);
      }

      return updatePayload;
    }

    return Array.isArray(prevProp) ? diffProperties(updatePayload, ReactNativePrivateInterface.flattenStyle(prevProp), nextProp, validAttributes) : diffProperties(updatePayload, prevProp, ReactNativePrivateInterface.flattenStyle(nextProp), validAttributes);
  }

  function addNestedProperty(updatePayload, nextProp, validAttributes) {
    if (!nextProp) return updatePayload;
    if (!Array.isArray(nextProp)) return diffProperties(updatePayload, emptyObject, nextProp, validAttributes);

    for (var i = 0; i < nextProp.length; i++) {
      updatePayload = addNestedProperty(updatePayload, nextProp[i], validAttributes);
    }

    return updatePayload;
  }

  function clearNestedProperty(updatePayload, prevProp, validAttributes) {
    if (!prevProp) return updatePayload;
    if (!Array.isArray(prevProp)) return diffProperties(updatePayload, prevProp, emptyObject, validAttributes);

    for (var i = 0; i < prevProp.length; i++) {
      updatePayload = clearNestedProperty(updatePayload, prevProp[i], validAttributes);
    }

    return updatePayload;
  }

  function diffProperties(updatePayload, prevProps, nextProps, validAttributes) {
    var attributeConfig, propKey;

    for (propKey in nextProps) {
      if (attributeConfig = validAttributes[propKey]) {
        var prevProp = prevProps[propKey];
        var nextProp = nextProps[propKey];
        "function" === typeof nextProp && (nextProp = true, "function" === typeof prevProp && (prevProp = true));
        "undefined" === typeof nextProp && (nextProp = null, "undefined" === typeof prevProp && (prevProp = null));
        removedKeys && (removedKeys[propKey] = false);
        if (updatePayload && undefined !== updatePayload[propKey]) {
          if ("object" !== typeof attributeConfig) updatePayload[propKey] = nextProp;else {
            if ("function" === typeof attributeConfig.diff || "function" === typeof attributeConfig.process) attributeConfig = "function" === typeof attributeConfig.process ? attributeConfig.process(nextProp) : nextProp, updatePayload[propKey] = attributeConfig;
          }
        } else if (prevProp !== nextProp) if ("object" !== typeof attributeConfig) ("object" !== typeof nextProp || null === nextProp || ReactNativePrivateInterface.deepDiffer(prevProp, nextProp)) && ((updatePayload || (updatePayload = {}))[propKey] = nextProp);else if ("function" === typeof attributeConfig.diff || "function" === typeof attributeConfig.process) {
          if (undefined === prevProp || ("function" === typeof attributeConfig.diff ? attributeConfig.diff(prevProp, nextProp) : "object" !== typeof nextProp || null === nextProp || ReactNativePrivateInterface.deepDiffer(prevProp, nextProp))) attributeConfig = "function" === typeof attributeConfig.process ? attributeConfig.process(nextProp) : nextProp, (updatePayload || (updatePayload = {}))[propKey] = attributeConfig;
        } else removedKeys = null, removedKeyCount = 0, updatePayload = diffNestedProperty(updatePayload, prevProp, nextProp, attributeConfig), 0 < removedKeyCount && updatePayload && (restoreDeletedValuesInNestedArray(updatePayload, nextProp, attributeConfig), removedKeys = null);
      }
    }

    for (var _propKey in prevProps) {
      undefined === nextProps[_propKey] && (!(attributeConfig = validAttributes[_propKey]) || updatePayload && undefined !== updatePayload[_propKey] || (prevProp = prevProps[_propKey], undefined !== prevProp && ("object" !== typeof attributeConfig || "function" === typeof attributeConfig.diff || "function" === typeof attributeConfig.process ? ((updatePayload || (updatePayload = {}))[_propKey] = null, removedKeys || (removedKeys = {}), removedKeys[_propKey] || (removedKeys[_propKey] = true, removedKeyCount++)) : updatePayload = clearNestedProperty(updatePayload, prevProp, attributeConfig))));
    }

    return updatePayload;
  }

  var restoreTarget = null,
      restoreQueue = null;

  function restoreStateOfTarget(target) {
    if (getInstanceFromNode(target)) throw ReactError(Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue."));
  }

  function batchedUpdatesImpl(fn, bookkeeping) {
    return fn(bookkeeping);
  }

  function flushDiscreteUpdatesImpl() {}

  var isInsideEventHandler = false;

  function batchedUpdates(fn, bookkeeping) {
    if (isInsideEventHandler) return fn(bookkeeping);
    isInsideEventHandler = true;

    try {
      return batchedUpdatesImpl(fn, bookkeeping);
    } finally {
      if (isInsideEventHandler = false, null !== restoreTarget || null !== restoreQueue) if (flushDiscreteUpdatesImpl(), restoreTarget && (bookkeeping = restoreTarget, fn = restoreQueue, restoreQueue = restoreTarget = null, restoreStateOfTarget(bookkeeping), fn)) for (bookkeeping = 0; bookkeeping < fn.length; bookkeeping++) {
        restoreStateOfTarget(fn[bookkeeping]);
      }
    }
  }

  function _inherits(subClass, superClass) {
    if ("function" !== typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
  }

  (function (_React$Component) {
    function ReactNativeComponent() {
      if (!(this instanceof ReactNativeComponent)) throw new TypeError("Cannot call a class as a function");

      var call = _React$Component.apply(this, arguments);

      if (!this) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !call || "object" !== typeof call && "function" !== typeof call ? this : call;
    }

    _inherits(ReactNativeComponent, _React$Component);

    ReactNativeComponent.prototype.blur = function () {};

    ReactNativeComponent.prototype.focus = function () {};

    ReactNativeComponent.prototype.measure = function () {};

    ReactNativeComponent.prototype.measureInWindow = function () {};

    ReactNativeComponent.prototype.measureLayout = function () {};

    ReactNativeComponent.prototype.setNativeProps = function () {};

    return ReactNativeComponent;
  })(React.Component);

  new Map();
  new Map();
  new Set();
  new Map();

  function dispatchEvent(target, topLevelType, nativeEvent) {
    batchedUpdates(function () {
      var events = nativeEvent.target;

      for (var events$jscomp$0 = null, i = 0; i < plugins.length; i++) {
        var possiblePlugin = plugins[i];
        possiblePlugin && (possiblePlugin = possiblePlugin.extractEvents(topLevelType, target, nativeEvent, events)) && (events$jscomp$0 = accumulateInto(events$jscomp$0, possiblePlugin));
      }

      events = events$jscomp$0;
      null !== events && (eventQueue = accumulateInto(eventQueue, events));
      events = eventQueue;
      eventQueue = null;

      if (events) {
        forEachAccumulated(events, executeDispatchesAndReleaseTopLevel);
        if (eventQueue) throw ReactError(Error("processEventQueue(): Additional events were enqueued while processing an event queue. Support for this has not yet been implemented."));
        if (hasRethrowError) throw events = rethrowError, hasRethrowError = false, rethrowError = null, events;
      }
    });
  }

  function shim$1() {
    throw ReactError(Error("The current renderer does not support hydration. This error is likely caused by a bug in React. Please file an issue."));
  }

  var _nativeFabricUIManage$1 = nativeFabricUIManager,
      createNode = _nativeFabricUIManage$1.createNode,
      cloneNode = _nativeFabricUIManage$1.cloneNode,
      cloneNodeWithNewChildren = _nativeFabricUIManage$1.cloneNodeWithNewChildren,
      cloneNodeWithNewChildrenAndProps = _nativeFabricUIManage$1.cloneNodeWithNewChildrenAndProps,
      cloneNodeWithNewProps = _nativeFabricUIManage$1.cloneNodeWithNewProps,
      createChildNodeSet = _nativeFabricUIManage$1.createChildSet,
      appendChildNode = _nativeFabricUIManage$1.appendChild,
      appendChildNodeToSet = _nativeFabricUIManage$1.appendChildToSet,
      completeRoot = _nativeFabricUIManage$1.completeRoot,
      registerEventHandler = _nativeFabricUIManage$1.registerEventHandler,
      fabricMeasure = _nativeFabricUIManage$1.measure,
      fabricMeasureInWindow = _nativeFabricUIManage$1.measureInWindow,
      fabricMeasureLayout = _nativeFabricUIManage$1.measureLayout,
      getViewConfigForType = ReactNativePrivateInterface.ReactNativeViewConfigRegistry.get,
      nextReactTag = 2;
  registerEventHandler && registerEventHandler(dispatchEvent);

  var ReactFabricHostComponent = function () {
    function ReactFabricHostComponent(tag, viewConfig, props, internalInstanceHandle) {
      if (!(this instanceof ReactFabricHostComponent)) throw new TypeError("Cannot call a class as a function");
      this._nativeTag = tag;
      this.viewConfig = viewConfig;
      this.currentProps = props;
      this._internalInstanceHandle = internalInstanceHandle;
    }

    ReactFabricHostComponent.prototype.blur = function () {
      ReactNativePrivateInterface.TextInputState.blurTextInput(this._nativeTag);
    };

    ReactFabricHostComponent.prototype.focus = function () {
      ReactNativePrivateInterface.TextInputState.focusTextInput(this._nativeTag);
    };

    ReactFabricHostComponent.prototype.measure = function (callback) {
      fabricMeasure(this._internalInstanceHandle.stateNode.node, mountSafeCallback_NOT_REALLY_SAFE(this, callback));
    };

    ReactFabricHostComponent.prototype.measureInWindow = function (callback) {
      fabricMeasureInWindow(this._internalInstanceHandle.stateNode.node, mountSafeCallback_NOT_REALLY_SAFE(this, callback));
    };

    ReactFabricHostComponent.prototype.measureLayout = function (relativeToNativeNode, onSuccess, onFail) {
      "number" !== typeof relativeToNativeNode && relativeToNativeNode instanceof ReactFabricHostComponent && fabricMeasureLayout(this._internalInstanceHandle.stateNode.node, relativeToNativeNode._internalInstanceHandle.stateNode.node, mountSafeCallback_NOT_REALLY_SAFE(this, onFail), mountSafeCallback_NOT_REALLY_SAFE(this, onSuccess));
    };

    ReactFabricHostComponent.prototype.setNativeProps = function () {};

    return ReactFabricHostComponent;
  }();

  function createTextInstance(text, rootContainerInstance, hostContext, internalInstanceHandle) {
    if (!hostContext.isInAParentText) throw ReactError(Error("Text strings must be rendered within a <Text> component."));
    hostContext = nextReactTag;
    nextReactTag += 2;
    return {
      node: createNode(hostContext, "RCTRawText", rootContainerInstance, {
        text: text
      }, internalInstanceHandle)
    };
  }

  var scheduleTimeout = setTimeout,
      cancelTimeout = clearTimeout;

  function cloneHiddenInstance(instance) {
    var node = instance.node;
    var updatePayload = diffProperties(null, emptyObject, {
      style: {
        display: "none"
      }
    }, instance.canonical.viewConfig.validAttributes);
    return {
      node: cloneNodeWithNewProps(node, updatePayload),
      canonical: instance.canonical
    };
  }

  var BEFORE_SLASH_RE = /^(.*)[\\\/]/;

  function getStackByFiberInDevAndProd(workInProgress) {
    var info = "";

    do {
      a: switch (workInProgress.tag) {
        case 3:
        case 4:
        case 6:
        case 7:
        case 10:
        case 9:
          var JSCompiler_inline_result = "";
          break a;

        default:
          var owner = workInProgress._debugOwner,
              source = workInProgress._debugSource,
              name = getComponentName(workInProgress.type);
          JSCompiler_inline_result = null;
          owner && (JSCompiler_inline_result = getComponentName(owner.type));
          owner = name;
          name = "";
          source ? name = " (at " + source.fileName.replace(BEFORE_SLASH_RE, "") + ":" + source.lineNumber + ")" : JSCompiler_inline_result && (name = " (created by " + JSCompiler_inline_result + ")");
          JSCompiler_inline_result = "\n    in " + (owner || "Unknown") + name;
      }

      info += JSCompiler_inline_result;
      workInProgress = workInProgress.return;
    } while (workInProgress);

    return info;
  }

  new Set();
  var valueStack = [],
      index = -1;

  function pop(cursor) {
    0 > index || (cursor.current = valueStack[index], valueStack[index] = null, index--);
  }

  function push(cursor, value) {
    index++;
    valueStack[index] = cursor.current;
    cursor.current = value;
  }

  var emptyContextObject = {},
      contextStackCursor = {
    current: emptyContextObject
  },
      didPerformWorkStackCursor = {
    current: false
  },
      previousContext = emptyContextObject;

  function getMaskedContext(workInProgress, unmaskedContext) {
    var contextTypes = workInProgress.type.contextTypes;
    if (!contextTypes) return emptyContextObject;
    var instance = workInProgress.stateNode;
    if (instance && instance.__reactInternalMemoizedUnmaskedChildContext === unmaskedContext) return instance.__reactInternalMemoizedMaskedChildContext;
    var context = {},
        key;

    for (key in contextTypes) {
      context[key] = unmaskedContext[key];
    }

    instance && (workInProgress = workInProgress.stateNode, workInProgress.__reactInternalMemoizedUnmaskedChildContext = unmaskedContext, workInProgress.__reactInternalMemoizedMaskedChildContext = context);
    return context;
  }

  function isContextProvider(type) {
    type = type.childContextTypes;
    return null !== type && undefined !== type;
  }

  function popContext(fiber) {
    pop(didPerformWorkStackCursor, fiber);
    pop(contextStackCursor, fiber);
  }

  function popTopLevelContextObject(fiber) {
    pop(didPerformWorkStackCursor, fiber);
    pop(contextStackCursor, fiber);
  }

  function pushTopLevelContextObject(fiber, context, didChange) {
    if (contextStackCursor.current !== emptyContextObject) throw ReactError(Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue."));
    push(contextStackCursor, context, fiber);
    push(didPerformWorkStackCursor, didChange, fiber);
  }

  function processChildContext(fiber, type, parentContext) {
    var instance = fiber.stateNode;
    fiber = type.childContextTypes;
    if ("function" !== typeof instance.getChildContext) return parentContext;
    instance = instance.getChildContext();

    for (var contextKey in instance) {
      if (!(contextKey in fiber)) throw ReactError(Error((getComponentName(type) || "Unknown") + '.getChildContext(): key "' + contextKey + '" is not defined in childContextTypes.'));
    }

    return _extends({}, parentContext, instance);
  }

  function pushContextProvider(workInProgress) {
    var instance = workInProgress.stateNode;
    instance = instance && instance.__reactInternalMemoizedMergedChildContext || emptyContextObject;
    previousContext = contextStackCursor.current;
    push(contextStackCursor, instance, workInProgress);
    push(didPerformWorkStackCursor, didPerformWorkStackCursor.current, workInProgress);
    return true;
  }

  function invalidateContextProvider(workInProgress, type, didChange) {
    var instance = workInProgress.stateNode;
    if (!instance) throw ReactError(Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue."));
    didChange ? (type = processChildContext(workInProgress, type, previousContext), instance.__reactInternalMemoizedMergedChildContext = type, pop(didPerformWorkStackCursor, workInProgress), pop(contextStackCursor, workInProgress), push(contextStackCursor, type, workInProgress)) : pop(didPerformWorkStackCursor, workInProgress);
    push(didPerformWorkStackCursor, didChange, workInProgress);
  }

  var Scheduler_runWithPriority = Scheduler.unstable_runWithPriority,
      Scheduler_scheduleCallback = Scheduler.unstable_scheduleCallback,
      Scheduler_cancelCallback = Scheduler.unstable_cancelCallback,
      Scheduler_shouldYield = Scheduler.unstable_shouldYield,
      Scheduler_requestPaint = Scheduler.unstable_requestPaint,
      Scheduler_now = Scheduler.unstable_now,
      Scheduler_getCurrentPriorityLevel = Scheduler.unstable_getCurrentPriorityLevel,
      Scheduler_ImmediatePriority = Scheduler.unstable_ImmediatePriority,
      Scheduler_UserBlockingPriority = Scheduler.unstable_UserBlockingPriority,
      Scheduler_NormalPriority = Scheduler.unstable_NormalPriority,
      Scheduler_LowPriority = Scheduler.unstable_LowPriority,
      Scheduler_IdlePriority = Scheduler.unstable_IdlePriority,
      fakeCallbackNode = {},
      requestPaint = undefined !== Scheduler_requestPaint ? Scheduler_requestPaint : function () {},
      syncQueue = null,
      immediateQueueCallbackNode = null,
      isFlushingSyncQueue = false,
      initialTimeMs = Scheduler_now(),
      now = 1e4 > initialTimeMs ? Scheduler_now : function () {
    return Scheduler_now() - initialTimeMs;
  };

  function getCurrentPriorityLevel() {
    switch (Scheduler_getCurrentPriorityLevel()) {
      case Scheduler_ImmediatePriority:
        return 99;

      case Scheduler_UserBlockingPriority:
        return 98;

      case Scheduler_NormalPriority:
        return 97;

      case Scheduler_LowPriority:
        return 96;

      case Scheduler_IdlePriority:
        return 95;

      default:
        throw ReactError(Error("Unknown priority level."));
    }
  }

  function reactPriorityToSchedulerPriority(reactPriorityLevel) {
    switch (reactPriorityLevel) {
      case 99:
        return Scheduler_ImmediatePriority;

      case 98:
        return Scheduler_UserBlockingPriority;

      case 97:
        return Scheduler_NormalPriority;

      case 96:
        return Scheduler_LowPriority;

      case 95:
        return Scheduler_IdlePriority;

      default:
        throw ReactError(Error("Unknown priority level."));
    }
  }

  function runWithPriority$1(reactPriorityLevel, fn) {
    reactPriorityLevel = reactPriorityToSchedulerPriority(reactPriorityLevel);
    return Scheduler_runWithPriority(reactPriorityLevel, fn);
  }

  function scheduleCallback(reactPriorityLevel, callback, options) {
    reactPriorityLevel = reactPriorityToSchedulerPriority(reactPriorityLevel);
    return Scheduler_scheduleCallback(reactPriorityLevel, callback, options);
  }

  function scheduleSyncCallback(callback) {
    null === syncQueue ? (syncQueue = [callback], immediateQueueCallbackNode = Scheduler_scheduleCallback(Scheduler_ImmediatePriority, flushSyncCallbackQueueImpl)) : syncQueue.push(callback);
    return fakeCallbackNode;
  }

  function flushSyncCallbackQueue() {
    null !== immediateQueueCallbackNode && Scheduler_cancelCallback(immediateQueueCallbackNode);
    flushSyncCallbackQueueImpl();
  }

  function flushSyncCallbackQueueImpl() {
    if (!isFlushingSyncQueue && null !== syncQueue) {
      isFlushingSyncQueue = true;
      var i = 0;

      try {
        var queue = syncQueue;
        runWithPriority$1(99, function () {
          for (; i < queue.length; i++) {
            var callback = queue[i];

            do {
              callback = callback(true);
            } while (null !== callback);
          }
        });
        syncQueue = null;
      } catch (error) {
        throw null !== syncQueue && (syncQueue = syncQueue.slice(i + 1)), Scheduler_scheduleCallback(Scheduler_ImmediatePriority, flushSyncCallbackQueue), error;
      } finally {
        isFlushingSyncQueue = false;
      }
    }
  }

  function inferPriorityFromExpirationTime(currentTime, expirationTime) {
    if (1073741823 === expirationTime) return 99;
    if (1 === expirationTime) return 95;
    currentTime = 10 * (1073741821 - expirationTime) - 10 * (1073741821 - currentTime);
    return 0 >= currentTime ? 99 : 250 >= currentTime ? 98 : 5250 >= currentTime ? 97 : 95;
  }

  function is(x, y) {
    return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
  }

  var hasOwnProperty = Object.prototype.hasOwnProperty;

  function shallowEqual(objA, objB) {
    if (is(objA, objB)) return true;
    if ("object" !== typeof objA || null === objA || "object" !== typeof objB || null === objB) return false;
    var keysA = Object.keys(objA),
        keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) return false;

    for (keysB = 0; keysB < keysA.length; keysB++) {
      if (!hasOwnProperty.call(objB, keysA[keysB]) || !is(objA[keysA[keysB]], objB[keysA[keysB]])) return false;
    }

    return true;
  }

  function resolveDefaultProps(Component, baseProps) {
    if (Component && Component.defaultProps) {
      baseProps = _extends({}, baseProps);
      Component = Component.defaultProps;

      for (var propName in Component) {
        undefined === baseProps[propName] && (baseProps[propName] = Component[propName]);
      }
    }

    return baseProps;
  }

  function readLazyComponentType(lazyComponent) {
    var result = lazyComponent._result;

    switch (lazyComponent._status) {
      case 1:
        return result;

      case 2:
        throw result;

      case 0:
        throw result;

      default:
        lazyComponent._status = 0;
        result = lazyComponent._ctor;
        result = result();
        result.then(function (moduleObject) {
          0 === lazyComponent._status && (moduleObject = moduleObject.default, lazyComponent._status = 1, lazyComponent._result = moduleObject);
        }, function (error) {
          0 === lazyComponent._status && (lazyComponent._status = 2, lazyComponent._result = error);
        });

        switch (lazyComponent._status) {
          case 1:
            return lazyComponent._result;

          case 2:
            throw lazyComponent._result;
        }

        lazyComponent._result = result;
        throw result;
    }
  }

  var valueCursor = {
    current: null
  },
      currentlyRenderingFiber = null,
      lastContextDependency = null,
      lastContextWithAllBitsObserved = null;

  function resetContextDependencies() {
    lastContextWithAllBitsObserved = lastContextDependency = currentlyRenderingFiber = null;
  }

  function pushProvider(providerFiber, nextValue) {
    var context = providerFiber.type._context;
    push(valueCursor, context._currentValue2, providerFiber);
    context._currentValue2 = nextValue;
  }

  function popProvider(providerFiber) {
    var currentValue = valueCursor.current;
    pop(valueCursor, providerFiber);
    providerFiber.type._context._currentValue2 = currentValue;
  }

  function scheduleWorkOnParentPath(parent, renderExpirationTime) {
    for (; null !== parent;) {
      var alternate = parent.alternate;
      if (parent.childExpirationTime < renderExpirationTime) parent.childExpirationTime = renderExpirationTime, null !== alternate && alternate.childExpirationTime < renderExpirationTime && (alternate.childExpirationTime = renderExpirationTime);else if (null !== alternate && alternate.childExpirationTime < renderExpirationTime) alternate.childExpirationTime = renderExpirationTime;else break;
      parent = parent.return;
    }
  }

  function prepareToReadContext(workInProgress, renderExpirationTime) {
    currentlyRenderingFiber = workInProgress;
    lastContextWithAllBitsObserved = lastContextDependency = null;
    workInProgress = workInProgress.dependencies;
    null !== workInProgress && null !== workInProgress.firstContext && (workInProgress.expirationTime >= renderExpirationTime && (didReceiveUpdate = true), workInProgress.firstContext = null);
  }

  function readContext(context, observedBits) {
    if (lastContextWithAllBitsObserved !== context && false !== observedBits && 0 !== observedBits) {
      if ("number" !== typeof observedBits || 1073741823 === observedBits) lastContextWithAllBitsObserved = context, observedBits = 1073741823;
      observedBits = {
        context: context,
        observedBits: observedBits,
        next: null
      };

      if (null === lastContextDependency) {
        if (null === currentlyRenderingFiber) throw ReactError(Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."));
        lastContextDependency = observedBits;
        currentlyRenderingFiber.dependencies = {
          expirationTime: 0,
          firstContext: observedBits,
          responders: null
        };
      } else lastContextDependency = lastContextDependency.next = observedBits;
    }

    return context._currentValue2;
  }

  var hasForceUpdate = false;

  function createUpdateQueue(baseState) {
    return {
      baseState: baseState,
      firstUpdate: null,
      lastUpdate: null,
      firstCapturedUpdate: null,
      lastCapturedUpdate: null,
      firstEffect: null,
      lastEffect: null,
      firstCapturedEffect: null,
      lastCapturedEffect: null
    };
  }

  function cloneUpdateQueue(currentQueue) {
    return {
      baseState: currentQueue.baseState,
      firstUpdate: currentQueue.firstUpdate,
      lastUpdate: currentQueue.lastUpdate,
      firstCapturedUpdate: null,
      lastCapturedUpdate: null,
      firstEffect: null,
      lastEffect: null,
      firstCapturedEffect: null,
      lastCapturedEffect: null
    };
  }

  function createUpdate(expirationTime, suspenseConfig) {
    return {
      expirationTime: expirationTime,
      suspenseConfig: suspenseConfig,
      tag: 0,
      payload: null,
      callback: null,
      next: null,
      nextEffect: null
    };
  }

  function appendUpdateToQueue(queue, update) {
    null === queue.lastUpdate ? queue.firstUpdate = queue.lastUpdate = update : (queue.lastUpdate.next = update, queue.lastUpdate = update);
  }

  function enqueueUpdate(fiber, update) {
    var alternate = fiber.alternate;

    if (null === alternate) {
      var queue1 = fiber.updateQueue;
      var queue2 = null;
      null === queue1 && (queue1 = fiber.updateQueue = createUpdateQueue(fiber.memoizedState));
    } else queue1 = fiber.updateQueue, queue2 = alternate.updateQueue, null === queue1 ? null === queue2 ? (queue1 = fiber.updateQueue = createUpdateQueue(fiber.memoizedState), queue2 = alternate.updateQueue = createUpdateQueue(alternate.memoizedState)) : queue1 = fiber.updateQueue = cloneUpdateQueue(queue2) : null === queue2 && (queue2 = alternate.updateQueue = cloneUpdateQueue(queue1));

    null === queue2 || queue1 === queue2 ? appendUpdateToQueue(queue1, update) : null === queue1.lastUpdate || null === queue2.lastUpdate ? (appendUpdateToQueue(queue1, update), appendUpdateToQueue(queue2, update)) : (appendUpdateToQueue(queue1, update), queue2.lastUpdate = update);
  }

  function enqueueCapturedUpdate(workInProgress, update) {
    var workInProgressQueue = workInProgress.updateQueue;
    workInProgressQueue = null === workInProgressQueue ? workInProgress.updateQueue = createUpdateQueue(workInProgress.memoizedState) : ensureWorkInProgressQueueIsAClone(workInProgress, workInProgressQueue);
    null === workInProgressQueue.lastCapturedUpdate ? workInProgressQueue.firstCapturedUpdate = workInProgressQueue.lastCapturedUpdate = update : (workInProgressQueue.lastCapturedUpdate.next = update, workInProgressQueue.lastCapturedUpdate = update);
  }

  function ensureWorkInProgressQueueIsAClone(workInProgress, queue) {
    var current = workInProgress.alternate;
    null !== current && queue === current.updateQueue && (queue = workInProgress.updateQueue = cloneUpdateQueue(queue));
    return queue;
  }

  function getStateFromUpdate(workInProgress, queue, update, prevState, nextProps, instance) {
    switch (update.tag) {
      case 1:
        return workInProgress = update.payload, "function" === typeof workInProgress ? workInProgress.call(instance, prevState, nextProps) : workInProgress;

      case 3:
        workInProgress.effectTag = workInProgress.effectTag & -2049 | 64;

      case 0:
        workInProgress = update.payload;
        nextProps = "function" === typeof workInProgress ? workInProgress.call(instance, prevState, nextProps) : workInProgress;
        if (null === nextProps || undefined === nextProps) break;
        return _extends({}, prevState, nextProps);

      case 2:
        hasForceUpdate = true;
    }

    return prevState;
  }

  function processUpdateQueue(workInProgress, queue, props, instance, renderExpirationTime) {
    hasForceUpdate = false;
    queue = ensureWorkInProgressQueueIsAClone(workInProgress, queue);

    for (var newBaseState = queue.baseState, newFirstUpdate = null, newExpirationTime = 0, update = queue.firstUpdate, resultState = newBaseState; null !== update;) {
      var updateExpirationTime = update.expirationTime;
      updateExpirationTime < renderExpirationTime ? (null === newFirstUpdate && (newFirstUpdate = update, newBaseState = resultState), newExpirationTime < updateExpirationTime && (newExpirationTime = updateExpirationTime)) : (markRenderEventTimeAndConfig(updateExpirationTime, update.suspenseConfig), resultState = getStateFromUpdate(workInProgress, queue, update, resultState, props, instance), null !== update.callback && (workInProgress.effectTag |= 32, update.nextEffect = null, null === queue.lastEffect ? queue.firstEffect = queue.lastEffect = update : (queue.lastEffect.nextEffect = update, queue.lastEffect = update)));
      update = update.next;
    }

    updateExpirationTime = null;

    for (update = queue.firstCapturedUpdate; null !== update;) {
      var _updateExpirationTime = update.expirationTime;
      _updateExpirationTime < renderExpirationTime ? (null === updateExpirationTime && (updateExpirationTime = update, null === newFirstUpdate && (newBaseState = resultState)), newExpirationTime < _updateExpirationTime && (newExpirationTime = _updateExpirationTime)) : (resultState = getStateFromUpdate(workInProgress, queue, update, resultState, props, instance), null !== update.callback && (workInProgress.effectTag |= 32, update.nextEffect = null, null === queue.lastCapturedEffect ? queue.firstCapturedEffect = queue.lastCapturedEffect = update : (queue.lastCapturedEffect.nextEffect = update, queue.lastCapturedEffect = update)));
      update = update.next;
    }

    null === newFirstUpdate && (queue.lastUpdate = null);
    null === updateExpirationTime ? queue.lastCapturedUpdate = null : workInProgress.effectTag |= 32;
    null === newFirstUpdate && null === updateExpirationTime && (newBaseState = resultState);
    queue.baseState = newBaseState;
    queue.firstUpdate = newFirstUpdate;
    queue.firstCapturedUpdate = updateExpirationTime;
    workInProgress.expirationTime = newExpirationTime;
    workInProgress.memoizedState = resultState;
  }

  function commitUpdateQueue(finishedWork, finishedQueue, instance) {
    null !== finishedQueue.firstCapturedUpdate && (null !== finishedQueue.lastUpdate && (finishedQueue.lastUpdate.next = finishedQueue.firstCapturedUpdate, finishedQueue.lastUpdate = finishedQueue.lastCapturedUpdate), finishedQueue.firstCapturedUpdate = finishedQueue.lastCapturedUpdate = null);
    commitUpdateEffects(finishedQueue.firstEffect, instance);
    finishedQueue.firstEffect = finishedQueue.lastEffect = null;
    commitUpdateEffects(finishedQueue.firstCapturedEffect, instance);
    finishedQueue.firstCapturedEffect = finishedQueue.lastCapturedEffect = null;
  }

  function commitUpdateEffects(effect, instance) {
    for (; null !== effect;) {
      var _callback3 = effect.callback;

      if (null !== _callback3) {
        effect.callback = null;
        var context = instance;
        if ("function" !== typeof _callback3) throw ReactError(Error("Invalid argument passed as callback. Expected a function. Instead received: " + _callback3));

        _callback3.call(context);
      }

      effect = effect.nextEffect;
    }
  }

  var ReactCurrentBatchConfig = ReactSharedInternals.ReactCurrentBatchConfig,
      emptyRefsObject = new React.Component().refs;

  function applyDerivedStateFromProps(workInProgress, ctor, getDerivedStateFromProps, nextProps) {
    ctor = workInProgress.memoizedState;
    getDerivedStateFromProps = getDerivedStateFromProps(nextProps, ctor);
    getDerivedStateFromProps = null === getDerivedStateFromProps || undefined === getDerivedStateFromProps ? ctor : _extends({}, ctor, getDerivedStateFromProps);
    workInProgress.memoizedState = getDerivedStateFromProps;
    nextProps = workInProgress.updateQueue;
    null !== nextProps && 0 === workInProgress.expirationTime && (nextProps.baseState = getDerivedStateFromProps);
  }

  var classComponentUpdater = {
    isMounted: function isMounted(component) {
      return (component = component._reactInternalFiber) ? 2 === isFiberMountedImpl(component) : false;
    },
    enqueueSetState: function enqueueSetState(inst, payload, callback) {
      inst = inst._reactInternalFiber;
      var currentTime = requestCurrentTime(),
          suspenseConfig = ReactCurrentBatchConfig.suspense;
      currentTime = computeExpirationForFiber(currentTime, inst, suspenseConfig);
      suspenseConfig = createUpdate(currentTime, suspenseConfig);
      suspenseConfig.payload = payload;
      undefined !== callback && null !== callback && (suspenseConfig.callback = callback);
      enqueueUpdate(inst, suspenseConfig);
      scheduleUpdateOnFiber(inst, currentTime);
    },
    enqueueReplaceState: function enqueueReplaceState(inst, payload, callback) {
      inst = inst._reactInternalFiber;
      var currentTime = requestCurrentTime(),
          suspenseConfig = ReactCurrentBatchConfig.suspense;
      currentTime = computeExpirationForFiber(currentTime, inst, suspenseConfig);
      suspenseConfig = createUpdate(currentTime, suspenseConfig);
      suspenseConfig.tag = 1;
      suspenseConfig.payload = payload;
      undefined !== callback && null !== callback && (suspenseConfig.callback = callback);
      enqueueUpdate(inst, suspenseConfig);
      scheduleUpdateOnFiber(inst, currentTime);
    },
    enqueueForceUpdate: function enqueueForceUpdate(inst, callback) {
      inst = inst._reactInternalFiber;
      var currentTime = requestCurrentTime(),
          suspenseConfig = ReactCurrentBatchConfig.suspense;
      currentTime = computeExpirationForFiber(currentTime, inst, suspenseConfig);
      suspenseConfig = createUpdate(currentTime, suspenseConfig);
      suspenseConfig.tag = 2;
      undefined !== callback && null !== callback && (suspenseConfig.callback = callback);
      enqueueUpdate(inst, suspenseConfig);
      scheduleUpdateOnFiber(inst, currentTime);
    }
  };

  function checkShouldComponentUpdate(workInProgress, ctor, oldProps, newProps, oldState, newState, nextContext) {
    workInProgress = workInProgress.stateNode;
    return "function" === typeof workInProgress.shouldComponentUpdate ? workInProgress.shouldComponentUpdate(newProps, newState, nextContext) : ctor.prototype && ctor.prototype.isPureReactComponent ? !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState) : true;
  }

  function constructClassInstance(workInProgress, ctor, props) {
    var isLegacyContextConsumer = false,
        unmaskedContext = emptyContextObject;
    var context = ctor.contextType;
    "object" === typeof context && null !== context ? context = readContext(context) : (unmaskedContext = isContextProvider(ctor) ? previousContext : contextStackCursor.current, isLegacyContextConsumer = ctor.contextTypes, context = (isLegacyContextConsumer = null !== isLegacyContextConsumer && undefined !== isLegacyContextConsumer) ? getMaskedContext(workInProgress, unmaskedContext) : emptyContextObject);
    ctor = new ctor(props, context);
    workInProgress.memoizedState = null !== ctor.state && undefined !== ctor.state ? ctor.state : null;
    ctor.updater = classComponentUpdater;
    workInProgress.stateNode = ctor;
    ctor._reactInternalFiber = workInProgress;
    isLegacyContextConsumer && (workInProgress = workInProgress.stateNode, workInProgress.__reactInternalMemoizedUnmaskedChildContext = unmaskedContext, workInProgress.__reactInternalMemoizedMaskedChildContext = context);
    return ctor;
  }

  function callComponentWillReceiveProps(workInProgress, instance, newProps, nextContext) {
    workInProgress = instance.state;
    "function" === typeof instance.componentWillReceiveProps && instance.componentWillReceiveProps(newProps, nextContext);
    "function" === typeof instance.UNSAFE_componentWillReceiveProps && instance.UNSAFE_componentWillReceiveProps(newProps, nextContext);
    instance.state !== workInProgress && classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
  }

  function mountClassInstance(workInProgress, ctor, newProps, renderExpirationTime) {
    var instance = workInProgress.stateNode;
    instance.props = newProps;
    instance.state = workInProgress.memoizedState;
    instance.refs = emptyRefsObject;
    var contextType = ctor.contextType;
    "object" === typeof contextType && null !== contextType ? instance.context = readContext(contextType) : (contextType = isContextProvider(ctor) ? previousContext : contextStackCursor.current, instance.context = getMaskedContext(workInProgress, contextType));
    contextType = workInProgress.updateQueue;
    null !== contextType && (processUpdateQueue(workInProgress, contextType, newProps, instance, renderExpirationTime), instance.state = workInProgress.memoizedState);
    contextType = ctor.getDerivedStateFromProps;
    "function" === typeof contextType && (applyDerivedStateFromProps(workInProgress, ctor, contextType, newProps), instance.state = workInProgress.memoizedState);
    "function" === typeof ctor.getDerivedStateFromProps || "function" === typeof instance.getSnapshotBeforeUpdate || "function" !== typeof instance.UNSAFE_componentWillMount && "function" !== typeof instance.componentWillMount || (ctor = instance.state, "function" === typeof instance.componentWillMount && instance.componentWillMount(), "function" === typeof instance.UNSAFE_componentWillMount && instance.UNSAFE_componentWillMount(), ctor !== instance.state && classComponentUpdater.enqueueReplaceState(instance, instance.state, null), contextType = workInProgress.updateQueue, null !== contextType && (processUpdateQueue(workInProgress, contextType, newProps, instance, renderExpirationTime), instance.state = workInProgress.memoizedState));
    "function" === typeof instance.componentDidMount && (workInProgress.effectTag |= 4);
  }

  var isArray = Array.isArray;

  function coerceRef(returnFiber, current$$1, element) {
    returnFiber = element.ref;

    if (null !== returnFiber && "function" !== typeof returnFiber && "object" !== typeof returnFiber) {
      if (element._owner) {
        element = element._owner;
        var inst = undefined;

        if (element) {
          if (1 !== element.tag) throw ReactError(Error("Function components cannot have refs. Did you mean to use React.forwardRef()?"));
          inst = element.stateNode;
        }

        if (!inst) throw ReactError(Error("Missing owner for string ref " + returnFiber + ". This error is likely caused by a bug in React. Please file an issue."));
        var stringRef = "" + returnFiber;
        if (null !== current$$1 && null !== current$$1.ref && "function" === typeof current$$1.ref && current$$1.ref._stringRef === stringRef) return current$$1.ref;

        current$$1 = function current$$1(value) {
          var refs = inst.refs;
          refs === emptyRefsObject && (refs = inst.refs = {});
          null === value ? delete refs[stringRef] : refs[stringRef] = value;
        };

        current$$1._stringRef = stringRef;
        return current$$1;
      }

      if ("string" !== typeof returnFiber) throw ReactError(Error("Expected ref to be a function, a string, an object returned by React.createRef(), or null."));
      if (!element._owner) throw ReactError(Error("Element ref was specified as a string (" + returnFiber + ") but no owner was set. This could happen for one of the following reasons:\n1. You may be adding a ref to a function component\n2. You may be adding a ref to a component that was not created inside a component's render method\n3. You have multiple copies of React loaded\nSee https://fb.me/react-refs-must-have-owner for more information."));
    }

    return returnFiber;
  }

  function throwOnInvalidObjectType(returnFiber, newChild) {
    if ("textarea" !== returnFiber.type) throw ReactError(Error("Objects are not valid as a React child (found: " + ("[object Object]" === Object.prototype.toString.call(newChild) ? "object with keys {" + Object.keys(newChild).join(", ") + "}" : newChild) + ")."));
  }

  function ChildReconciler(shouldTrackSideEffects) {
    function deleteChild(returnFiber, childToDelete) {
      if (shouldTrackSideEffects) {
        var last = returnFiber.lastEffect;
        null !== last ? (last.nextEffect = childToDelete, returnFiber.lastEffect = childToDelete) : returnFiber.firstEffect = returnFiber.lastEffect = childToDelete;
        childToDelete.nextEffect = null;
        childToDelete.effectTag = 8;
      }
    }

    function deleteRemainingChildren(returnFiber, currentFirstChild) {
      if (!shouldTrackSideEffects) return null;

      for (; null !== currentFirstChild;) {
        deleteChild(returnFiber, currentFirstChild), currentFirstChild = currentFirstChild.sibling;
      }

      return null;
    }

    function mapRemainingChildren(returnFiber, currentFirstChild) {
      for (returnFiber = new Map(); null !== currentFirstChild;) {
        null !== currentFirstChild.key ? returnFiber.set(currentFirstChild.key, currentFirstChild) : returnFiber.set(currentFirstChild.index, currentFirstChild), currentFirstChild = currentFirstChild.sibling;
      }

      return returnFiber;
    }

    function useFiber(fiber, pendingProps, expirationTime) {
      fiber = createWorkInProgress(fiber, pendingProps, expirationTime);
      fiber.index = 0;
      fiber.sibling = null;
      return fiber;
    }

    function placeChild(newFiber, lastPlacedIndex, newIndex) {
      newFiber.index = newIndex;
      if (!shouldTrackSideEffects) return lastPlacedIndex;
      newIndex = newFiber.alternate;
      if (null !== newIndex) return newIndex = newIndex.index, newIndex < lastPlacedIndex ? (newFiber.effectTag = 2, lastPlacedIndex) : newIndex;
      newFiber.effectTag = 2;
      return lastPlacedIndex;
    }

    function placeSingleChild(newFiber) {
      shouldTrackSideEffects && null === newFiber.alternate && (newFiber.effectTag = 2);
      return newFiber;
    }

    function updateTextNode(returnFiber, current$$1, textContent, expirationTime) {
      if (null === current$$1 || 6 !== current$$1.tag) return current$$1 = createFiberFromText(textContent, returnFiber.mode, expirationTime), current$$1.return = returnFiber, current$$1;
      current$$1 = useFiber(current$$1, textContent, expirationTime);
      current$$1.return = returnFiber;
      return current$$1;
    }

    function updateElement(returnFiber, current$$1, element, expirationTime) {
      if (null !== current$$1 && current$$1.elementType === element.type) return expirationTime = useFiber(current$$1, element.props, expirationTime), expirationTime.ref = coerceRef(returnFiber, current$$1, element), expirationTime.return = returnFiber, expirationTime;
      expirationTime = createFiberFromTypeAndProps(element.type, element.key, element.props, null, returnFiber.mode, expirationTime);
      expirationTime.ref = coerceRef(returnFiber, current$$1, element);
      expirationTime.return = returnFiber;
      return expirationTime;
    }

    function updatePortal(returnFiber, current$$1, portal, expirationTime) {
      if (null === current$$1 || 4 !== current$$1.tag || current$$1.stateNode.containerInfo !== portal.containerInfo || current$$1.stateNode.implementation !== portal.implementation) return current$$1 = createFiberFromPortal(portal, returnFiber.mode, expirationTime), current$$1.return = returnFiber, current$$1;
      current$$1 = useFiber(current$$1, portal.children || [], expirationTime);
      current$$1.return = returnFiber;
      return current$$1;
    }

    function updateFragment(returnFiber, current$$1, fragment, expirationTime, key) {
      if (null === current$$1 || 7 !== current$$1.tag) return current$$1 = createFiberFromFragment(fragment, returnFiber.mode, expirationTime, key), current$$1.return = returnFiber, current$$1;
      current$$1 = useFiber(current$$1, fragment, expirationTime);
      current$$1.return = returnFiber;
      return current$$1;
    }

    function createChild(returnFiber, newChild, expirationTime) {
      if ("string" === typeof newChild || "number" === typeof newChild) return newChild = createFiberFromText("" + newChild, returnFiber.mode, expirationTime), newChild.return = returnFiber, newChild;

      if ("object" === typeof newChild && null !== newChild) {
        switch (newChild.$$typeof) {
          case REACT_ELEMENT_TYPE:
            return expirationTime = createFiberFromTypeAndProps(newChild.type, newChild.key, newChild.props, null, returnFiber.mode, expirationTime), expirationTime.ref = coerceRef(returnFiber, null, newChild), expirationTime.return = returnFiber, expirationTime;

          case REACT_PORTAL_TYPE:
            return newChild = createFiberFromPortal(newChild, returnFiber.mode, expirationTime), newChild.return = returnFiber, newChild;
        }

        if (isArray(newChild) || getIteratorFn(newChild)) return newChild = createFiberFromFragment(newChild, returnFiber.mode, expirationTime, null), newChild.return = returnFiber, newChild;
        throwOnInvalidObjectType(returnFiber, newChild);
      }

      return null;
    }

    function updateSlot(returnFiber, oldFiber, newChild, expirationTime) {
      var key = null !== oldFiber ? oldFiber.key : null;
      if ("string" === typeof newChild || "number" === typeof newChild) return null !== key ? null : updateTextNode(returnFiber, oldFiber, "" + newChild, expirationTime);

      if ("object" === typeof newChild && null !== newChild) {
        switch (newChild.$$typeof) {
          case REACT_ELEMENT_TYPE:
            return newChild.key === key ? newChild.type === REACT_FRAGMENT_TYPE ? updateFragment(returnFiber, oldFiber, newChild.props.children, expirationTime, key) : updateElement(returnFiber, oldFiber, newChild, expirationTime) : null;

          case REACT_PORTAL_TYPE:
            return newChild.key === key ? updatePortal(returnFiber, oldFiber, newChild, expirationTime) : null;
        }

        if (isArray(newChild) || getIteratorFn(newChild)) return null !== key ? null : updateFragment(returnFiber, oldFiber, newChild, expirationTime, null);
        throwOnInvalidObjectType(returnFiber, newChild);
      }

      return null;
    }

    function updateFromMap(existingChildren, returnFiber, newIdx, newChild, expirationTime) {
      if ("string" === typeof newChild || "number" === typeof newChild) return existingChildren = existingChildren.get(newIdx) || null, updateTextNode(returnFiber, existingChildren, "" + newChild, expirationTime);

      if ("object" === typeof newChild && null !== newChild) {
        switch (newChild.$$typeof) {
          case REACT_ELEMENT_TYPE:
            return existingChildren = existingChildren.get(null === newChild.key ? newIdx : newChild.key) || null, newChild.type === REACT_FRAGMENT_TYPE ? updateFragment(returnFiber, existingChildren, newChild.props.children, expirationTime, newChild.key) : updateElement(returnFiber, existingChildren, newChild, expirationTime);

          case REACT_PORTAL_TYPE:
            return existingChildren = existingChildren.get(null === newChild.key ? newIdx : newChild.key) || null, updatePortal(returnFiber, existingChildren, newChild, expirationTime);
        }

        if (isArray(newChild) || getIteratorFn(newChild)) return existingChildren = existingChildren.get(newIdx) || null, updateFragment(returnFiber, existingChildren, newChild, expirationTime, null);
        throwOnInvalidObjectType(returnFiber, newChild);
      }

      return null;
    }

    function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren, expirationTime) {
      for (var resultingFirstChild = null, previousNewFiber = null, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = null; null !== oldFiber && newIdx < newChildren.length; newIdx++) {
        oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = null) : nextOldFiber = oldFiber.sibling;
        var newFiber = updateSlot(returnFiber, oldFiber, newChildren[newIdx], expirationTime);

        if (null === newFiber) {
          null === oldFiber && (oldFiber = nextOldFiber);
          break;
        }

        shouldTrackSideEffects && oldFiber && null === newFiber.alternate && deleteChild(returnFiber, oldFiber);
        currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
        null === previousNewFiber ? resultingFirstChild = newFiber : previousNewFiber.sibling = newFiber;
        previousNewFiber = newFiber;
        oldFiber = nextOldFiber;
      }

      if (newIdx === newChildren.length) return deleteRemainingChildren(returnFiber, oldFiber), resultingFirstChild;

      if (null === oldFiber) {
        for (; newIdx < newChildren.length; newIdx++) {
          oldFiber = createChild(returnFiber, newChildren[newIdx], expirationTime), null !== oldFiber && (currentFirstChild = placeChild(oldFiber, currentFirstChild, newIdx), null === previousNewFiber ? resultingFirstChild = oldFiber : previousNewFiber.sibling = oldFiber, previousNewFiber = oldFiber);
        }

        return resultingFirstChild;
      }

      for (oldFiber = mapRemainingChildren(returnFiber, oldFiber); newIdx < newChildren.length; newIdx++) {
        nextOldFiber = updateFromMap(oldFiber, returnFiber, newIdx, newChildren[newIdx], expirationTime), null !== nextOldFiber && (shouldTrackSideEffects && null !== nextOldFiber.alternate && oldFiber.delete(null === nextOldFiber.key ? newIdx : nextOldFiber.key), currentFirstChild = placeChild(nextOldFiber, currentFirstChild, newIdx), null === previousNewFiber ? resultingFirstChild = nextOldFiber : previousNewFiber.sibling = nextOldFiber, previousNewFiber = nextOldFiber);
      }

      shouldTrackSideEffects && oldFiber.forEach(function (child) {
        return deleteChild(returnFiber, child);
      });
      return resultingFirstChild;
    }

    function reconcileChildrenIterator(returnFiber, currentFirstChild, newChildrenIterable, expirationTime) {
      var iteratorFn = getIteratorFn(newChildrenIterable);
      if ("function" !== typeof iteratorFn) throw ReactError(Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue."));
      newChildrenIterable = iteratorFn.call(newChildrenIterable);
      if (null == newChildrenIterable) throw ReactError(Error("An iterable object provided no iterator."));

      for (var previousNewFiber = iteratorFn = null, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = null, step = newChildrenIterable.next(); null !== oldFiber && !step.done; newIdx++, step = newChildrenIterable.next()) {
        oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = null) : nextOldFiber = oldFiber.sibling;
        var newFiber = updateSlot(returnFiber, oldFiber, step.value, expirationTime);

        if (null === newFiber) {
          null === oldFiber && (oldFiber = nextOldFiber);
          break;
        }

        shouldTrackSideEffects && oldFiber && null === newFiber.alternate && deleteChild(returnFiber, oldFiber);
        currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
        null === previousNewFiber ? iteratorFn = newFiber : previousNewFiber.sibling = newFiber;
        previousNewFiber = newFiber;
        oldFiber = nextOldFiber;
      }

      if (step.done) return deleteRemainingChildren(returnFiber, oldFiber), iteratorFn;

      if (null === oldFiber) {
        for (; !step.done; newIdx++, step = newChildrenIterable.next()) {
          step = createChild(returnFiber, step.value, expirationTime), null !== step && (currentFirstChild = placeChild(step, currentFirstChild, newIdx), null === previousNewFiber ? iteratorFn = step : previousNewFiber.sibling = step, previousNewFiber = step);
        }

        return iteratorFn;
      }

      for (oldFiber = mapRemainingChildren(returnFiber, oldFiber); !step.done; newIdx++, step = newChildrenIterable.next()) {
        step = updateFromMap(oldFiber, returnFiber, newIdx, step.value, expirationTime), null !== step && (shouldTrackSideEffects && null !== step.alternate && oldFiber.delete(null === step.key ? newIdx : step.key), currentFirstChild = placeChild(step, currentFirstChild, newIdx), null === previousNewFiber ? iteratorFn = step : previousNewFiber.sibling = step, previousNewFiber = step);
      }

      shouldTrackSideEffects && oldFiber.forEach(function (child) {
        return deleteChild(returnFiber, child);
      });
      return iteratorFn;
    }

    return function (returnFiber, currentFirstChild, newChild, expirationTime) {
      var isUnkeyedTopLevelFragment = "object" === typeof newChild && null !== newChild && newChild.type === REACT_FRAGMENT_TYPE && null === newChild.key;
      isUnkeyedTopLevelFragment && (newChild = newChild.props.children);
      var isObject = "object" === typeof newChild && null !== newChild;
      if (isObject) switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          a: {
            isObject = newChild.key;

            for (isUnkeyedTopLevelFragment = currentFirstChild; null !== isUnkeyedTopLevelFragment;) {
              if (isUnkeyedTopLevelFragment.key === isObject) {
                if (7 === isUnkeyedTopLevelFragment.tag ? newChild.type === REACT_FRAGMENT_TYPE : isUnkeyedTopLevelFragment.elementType === newChild.type) {
                  deleteRemainingChildren(returnFiber, isUnkeyedTopLevelFragment.sibling);
                  currentFirstChild = useFiber(isUnkeyedTopLevelFragment, newChild.type === REACT_FRAGMENT_TYPE ? newChild.props.children : newChild.props, expirationTime);
                  currentFirstChild.ref = coerceRef(returnFiber, isUnkeyedTopLevelFragment, newChild);
                  currentFirstChild.return = returnFiber;
                  returnFiber = currentFirstChild;
                  break a;
                }

                deleteRemainingChildren(returnFiber, isUnkeyedTopLevelFragment);
                break;
              } else deleteChild(returnFiber, isUnkeyedTopLevelFragment);

              isUnkeyedTopLevelFragment = isUnkeyedTopLevelFragment.sibling;
            }

            newChild.type === REACT_FRAGMENT_TYPE ? (currentFirstChild = createFiberFromFragment(newChild.props.children, returnFiber.mode, expirationTime, newChild.key), currentFirstChild.return = returnFiber, returnFiber = currentFirstChild) : (expirationTime = createFiberFromTypeAndProps(newChild.type, newChild.key, newChild.props, null, returnFiber.mode, expirationTime), expirationTime.ref = coerceRef(returnFiber, currentFirstChild, newChild), expirationTime.return = returnFiber, returnFiber = expirationTime);
          }

          return placeSingleChild(returnFiber);

        case REACT_PORTAL_TYPE:
          a: {
            for (isUnkeyedTopLevelFragment = newChild.key; null !== currentFirstChild;) {
              if (currentFirstChild.key === isUnkeyedTopLevelFragment) {
                if (4 === currentFirstChild.tag && currentFirstChild.stateNode.containerInfo === newChild.containerInfo && currentFirstChild.stateNode.implementation === newChild.implementation) {
                  deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
                  currentFirstChild = useFiber(currentFirstChild, newChild.children || [], expirationTime);
                  currentFirstChild.return = returnFiber;
                  returnFiber = currentFirstChild;
                  break a;
                }

                deleteRemainingChildren(returnFiber, currentFirstChild);
                break;
              } else deleteChild(returnFiber, currentFirstChild);

              currentFirstChild = currentFirstChild.sibling;
            }

            currentFirstChild = createFiberFromPortal(newChild, returnFiber.mode, expirationTime);
            currentFirstChild.return = returnFiber;
            returnFiber = currentFirstChild;
          }

          return placeSingleChild(returnFiber);
      }
      if ("string" === typeof newChild || "number" === typeof newChild) return newChild = "" + newChild, null !== currentFirstChild && 6 === currentFirstChild.tag ? (deleteRemainingChildren(returnFiber, currentFirstChild.sibling), currentFirstChild = useFiber(currentFirstChild, newChild, expirationTime), currentFirstChild.return = returnFiber, returnFiber = currentFirstChild) : (deleteRemainingChildren(returnFiber, currentFirstChild), currentFirstChild = createFiberFromText(newChild, returnFiber.mode, expirationTime), currentFirstChild.return = returnFiber, returnFiber = currentFirstChild), placeSingleChild(returnFiber);
      if (isArray(newChild)) return reconcileChildrenArray(returnFiber, currentFirstChild, newChild, expirationTime);
      if (getIteratorFn(newChild)) return reconcileChildrenIterator(returnFiber, currentFirstChild, newChild, expirationTime);
      isObject && throwOnInvalidObjectType(returnFiber, newChild);
      if ("undefined" === typeof newChild && !isUnkeyedTopLevelFragment) switch (returnFiber.tag) {
        case 1:
        case 0:
          throw returnFiber = returnFiber.type, ReactError(Error((returnFiber.displayName || returnFiber.name || "Component") + "(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null."));
      }
      return deleteRemainingChildren(returnFiber, currentFirstChild);
    };
  }

  var reconcileChildFibers = ChildReconciler(true),
      mountChildFibers = ChildReconciler(false),
      NO_CONTEXT = {},
      contextStackCursor$1 = {
    current: NO_CONTEXT
  },
      contextFiberStackCursor = {
    current: NO_CONTEXT
  },
      rootInstanceStackCursor = {
    current: NO_CONTEXT
  };

  function requiredContext(c) {
    if (c === NO_CONTEXT) throw ReactError(Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue."));
    return c;
  }

  function pushHostContainer(fiber, nextRootInstance) {
    push(rootInstanceStackCursor, nextRootInstance, fiber);
    push(contextFiberStackCursor, fiber, fiber);
    push(contextStackCursor$1, NO_CONTEXT, fiber);
    pop(contextStackCursor$1, fiber);
    push(contextStackCursor$1, {
      isInAParentText: false
    }, fiber);
  }

  function popHostContainer(fiber) {
    pop(contextStackCursor$1, fiber);
    pop(contextFiberStackCursor, fiber);
    pop(rootInstanceStackCursor, fiber);
  }

  function pushHostContext(fiber) {
    requiredContext(rootInstanceStackCursor.current);
    var context = requiredContext(contextStackCursor$1.current);
    var nextContext = fiber.type;
    nextContext = "AndroidTextInput" === nextContext || "RCTMultilineTextInputView" === nextContext || "RCTSinglelineTextInputView" === nextContext || "RCTText" === nextContext || "RCTVirtualText" === nextContext;
    nextContext = context.isInAParentText !== nextContext ? {
      isInAParentText: nextContext
    } : context;
    context !== nextContext && (push(contextFiberStackCursor, fiber, fiber), push(contextStackCursor$1, nextContext, fiber));
  }

  function popHostContext(fiber) {
    contextFiberStackCursor.current === fiber && (pop(contextStackCursor$1, fiber), pop(contextFiberStackCursor, fiber));
  }

  var SubtreeSuspenseContextMask = 1,
      InvisibleParentSuspenseContext = 1,
      ForceSuspenseFallback = 2,
      suspenseStackCursor = {
    current: 0
  };

  function findFirstSuspended(row) {
    for (var node = row; null !== node;) {
      if (13 === node.tag) {
        if (null !== node.memoizedState) return node;
      } else if (19 === node.tag && undefined !== node.memoizedProps.revealOrder) {
        if (0 !== (node.effectTag & 64)) return node;
      } else if (null !== node.child) {
        node.child.return = node;
        node = node.child;
        continue;
      }

      if (node === row) break;

      for (; null === node.sibling;) {
        if (null === node.return || node.return === row) return null;
        node = node.return;
      }

      node.sibling.return = node.return;
      node = node.sibling;
    }

    return null;
  }

  function createResponderListener(responder, props) {
    return {
      responder: responder,
      props: props
    };
  }

  var NoEffect$1 = 0,
      UnmountSnapshot = 2,
      UnmountMutation = 4,
      MountMutation = 8,
      UnmountLayout = 16,
      MountLayout = 32,
      MountPassive = 64,
      UnmountPassive = 128,
      ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher,
      renderExpirationTime$1 = 0,
      currentlyRenderingFiber$1 = null,
      currentHook = null,
      nextCurrentHook = null,
      firstWorkInProgressHook = null,
      workInProgressHook = null,
      nextWorkInProgressHook = null,
      remainingExpirationTime = 0,
      componentUpdateQueue = null,
      sideEffectTag = 0,
      didScheduleRenderPhaseUpdate = false,
      renderPhaseUpdates = null,
      numberOfReRenders = 0;

  function throwInvalidHookError() {
    throw ReactError(Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem."));
  }

  function areHookInputsEqual(nextDeps, prevDeps) {
    if (null === prevDeps) return false;

    for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
      if (!is(nextDeps[i], prevDeps[i])) return false;
    }

    return true;
  }

  function renderWithHooks(current, workInProgress, Component, props, refOrContext, nextRenderExpirationTime) {
    renderExpirationTime$1 = nextRenderExpirationTime;
    currentlyRenderingFiber$1 = workInProgress;
    nextCurrentHook = null !== current ? current.memoizedState : null;
    ReactCurrentDispatcher$1.current = null === nextCurrentHook ? HooksDispatcherOnMount : HooksDispatcherOnUpdate;
    workInProgress = Component(props, refOrContext);

    if (didScheduleRenderPhaseUpdate) {
      do {
        didScheduleRenderPhaseUpdate = false, numberOfReRenders += 1, nextCurrentHook = null !== current ? current.memoizedState : null, nextWorkInProgressHook = firstWorkInProgressHook, componentUpdateQueue = workInProgressHook = currentHook = null, ReactCurrentDispatcher$1.current = HooksDispatcherOnUpdate, workInProgress = Component(props, refOrContext);
      } while (didScheduleRenderPhaseUpdate);

      renderPhaseUpdates = null;
      numberOfReRenders = 0;
    }

    ReactCurrentDispatcher$1.current = ContextOnlyDispatcher;
    current = currentlyRenderingFiber$1;
    current.memoizedState = firstWorkInProgressHook;
    current.expirationTime = remainingExpirationTime;
    current.updateQueue = componentUpdateQueue;
    current.effectTag |= sideEffectTag;
    current = null !== currentHook && null !== currentHook.next;
    renderExpirationTime$1 = 0;
    nextWorkInProgressHook = workInProgressHook = firstWorkInProgressHook = nextCurrentHook = currentHook = currentlyRenderingFiber$1 = null;
    remainingExpirationTime = 0;
    componentUpdateQueue = null;
    sideEffectTag = 0;
    if (current) throw ReactError(Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement."));
    return workInProgress;
  }

  function resetHooks() {
    ReactCurrentDispatcher$1.current = ContextOnlyDispatcher;
    renderExpirationTime$1 = 0;
    nextWorkInProgressHook = workInProgressHook = firstWorkInProgressHook = nextCurrentHook = currentHook = currentlyRenderingFiber$1 = null;
    remainingExpirationTime = 0;
    componentUpdateQueue = null;
    sideEffectTag = 0;
    didScheduleRenderPhaseUpdate = false;
    renderPhaseUpdates = null;
    numberOfReRenders = 0;
  }

  function mountWorkInProgressHook() {
    var hook = {
      memoizedState: null,
      baseState: null,
      queue: null,
      baseUpdate: null,
      next: null
    };
    null === workInProgressHook ? firstWorkInProgressHook = workInProgressHook = hook : workInProgressHook = workInProgressHook.next = hook;
    return workInProgressHook;
  }

  function updateWorkInProgressHook() {
    if (null !== nextWorkInProgressHook) workInProgressHook = nextWorkInProgressHook, nextWorkInProgressHook = workInProgressHook.next, currentHook = nextCurrentHook, nextCurrentHook = null !== currentHook ? currentHook.next : null;else {
      if (null === nextCurrentHook) throw ReactError(Error("Rendered more hooks than during the previous render."));
      currentHook = nextCurrentHook;
      var newHook = {
        memoizedState: currentHook.memoizedState,
        baseState: currentHook.baseState,
        queue: currentHook.queue,
        baseUpdate: currentHook.baseUpdate,
        next: null
      };
      workInProgressHook = null === workInProgressHook ? firstWorkInProgressHook = newHook : workInProgressHook.next = newHook;
      nextCurrentHook = currentHook.next;
    }
    return workInProgressHook;
  }

  function basicStateReducer(state, action) {
    return "function" === typeof action ? action(state) : action;
  }

  function updateReducer(reducer) {
    var hook = updateWorkInProgressHook(),
        queue = hook.queue;
    if (null === queue) throw ReactError(Error("Should have a queue. This is likely a bug in React. Please file an issue."));
    queue.lastRenderedReducer = reducer;

    if (0 < numberOfReRenders) {
      var _dispatch = queue.dispatch;

      if (null !== renderPhaseUpdates) {
        var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);

        if (undefined !== firstRenderPhaseUpdate) {
          renderPhaseUpdates.delete(queue);
          var newState = hook.memoizedState;

          do {
            newState = reducer(newState, firstRenderPhaseUpdate.action), firstRenderPhaseUpdate = firstRenderPhaseUpdate.next;
          } while (null !== firstRenderPhaseUpdate);

          is(newState, hook.memoizedState) || (didReceiveUpdate = true);
          hook.memoizedState = newState;
          hook.baseUpdate === queue.last && (hook.baseState = newState);
          queue.lastRenderedState = newState;
          return [newState, _dispatch];
        }
      }

      return [hook.memoizedState, _dispatch];
    }

    _dispatch = queue.last;
    var baseUpdate = hook.baseUpdate;
    newState = hook.baseState;
    null !== baseUpdate ? (null !== _dispatch && (_dispatch.next = null), _dispatch = baseUpdate.next) : _dispatch = null !== _dispatch ? _dispatch.next : null;

    if (null !== _dispatch) {
      var newBaseUpdate = firstRenderPhaseUpdate = null,
          _update = _dispatch,
          didSkip = false;

      do {
        var updateExpirationTime = _update.expirationTime;
        updateExpirationTime < renderExpirationTime$1 ? (didSkip || (didSkip = true, newBaseUpdate = baseUpdate, firstRenderPhaseUpdate = newState), updateExpirationTime > remainingExpirationTime && (remainingExpirationTime = updateExpirationTime)) : (markRenderEventTimeAndConfig(updateExpirationTime, _update.suspenseConfig), newState = _update.eagerReducer === reducer ? _update.eagerState : reducer(newState, _update.action));
        baseUpdate = _update;
        _update = _update.next;
      } while (null !== _update && _update !== _dispatch);

      didSkip || (newBaseUpdate = baseUpdate, firstRenderPhaseUpdate = newState);
      is(newState, hook.memoizedState) || (didReceiveUpdate = true);
      hook.memoizedState = newState;
      hook.baseUpdate = newBaseUpdate;
      hook.baseState = firstRenderPhaseUpdate;
      queue.lastRenderedState = newState;
    }

    return [hook.memoizedState, queue.dispatch];
  }

  function pushEffect(tag, create, destroy, deps) {
    tag = {
      tag: tag,
      create: create,
      destroy: destroy,
      deps: deps,
      next: null
    };
    null === componentUpdateQueue ? (componentUpdateQueue = {
      lastEffect: null
    }, componentUpdateQueue.lastEffect = tag.next = tag) : (create = componentUpdateQueue.lastEffect, null === create ? componentUpdateQueue.lastEffect = tag.next = tag : (destroy = create.next, create.next = tag, tag.next = destroy, componentUpdateQueue.lastEffect = tag));
    return tag;
  }

  function mountEffectImpl(fiberEffectTag, hookEffectTag, create, deps) {
    var hook = mountWorkInProgressHook();
    sideEffectTag |= fiberEffectTag;
    hook.memoizedState = pushEffect(hookEffectTag, create, undefined, undefined === deps ? null : deps);
  }

  function updateEffectImpl(fiberEffectTag, hookEffectTag, create, deps) {
    var hook = updateWorkInProgressHook();
    deps = undefined === deps ? null : deps;
    var destroy = undefined;

    if (null !== currentHook) {
      var prevEffect = currentHook.memoizedState;
      destroy = prevEffect.destroy;

      if (null !== deps && areHookInputsEqual(deps, prevEffect.deps)) {
        pushEffect(NoEffect$1, create, destroy, deps);
        return;
      }
    }

    sideEffectTag |= fiberEffectTag;
    hook.memoizedState = pushEffect(hookEffectTag, create, destroy, deps);
  }

  function imperativeHandleEffect(create, ref) {
    if ("function" === typeof ref) return create = create(), ref(create), function () {
      ref(null);
    };
    if (null !== ref && undefined !== ref) return create = create(), ref.current = create, function () {
      ref.current = null;
    };
  }

  function mountDebugValue() {}

  function dispatchAction(fiber, queue, action) {
    if (!(25 > numberOfReRenders)) throw ReactError(Error("Too many re-renders. React limits the number of renders to prevent an infinite loop."));
    var alternate = fiber.alternate;
    if (fiber === currentlyRenderingFiber$1 || null !== alternate && alternate === currentlyRenderingFiber$1) {
      if (didScheduleRenderPhaseUpdate = true, fiber = {
        expirationTime: renderExpirationTime$1,
        suspenseConfig: null,
        action: action,
        eagerReducer: null,
        eagerState: null,
        next: null
      }, null === renderPhaseUpdates && (renderPhaseUpdates = new Map()), action = renderPhaseUpdates.get(queue), undefined === action) renderPhaseUpdates.set(queue, fiber);else {
        for (queue = action; null !== queue.next;) {
          queue = queue.next;
        }

        queue.next = fiber;
      }
    } else {
      var currentTime = requestCurrentTime(),
          _suspenseConfig = ReactCurrentBatchConfig.suspense;
      currentTime = computeExpirationForFiber(currentTime, fiber, _suspenseConfig);
      _suspenseConfig = {
        expirationTime: currentTime,
        suspenseConfig: _suspenseConfig,
        action: action,
        eagerReducer: null,
        eagerState: null,
        next: null
      };
      var _last = queue.last;
      if (null === _last) _suspenseConfig.next = _suspenseConfig;else {
        var first = _last.next;
        null !== first && (_suspenseConfig.next = first);
        _last.next = _suspenseConfig;
      }
      queue.last = _suspenseConfig;
      if (0 === fiber.expirationTime && (null === alternate || 0 === alternate.expirationTime) && (alternate = queue.lastRenderedReducer, null !== alternate)) try {
        var currentState = queue.lastRenderedState,
            _eagerState = alternate(currentState, action);

        _suspenseConfig.eagerReducer = alternate;
        _suspenseConfig.eagerState = _eagerState;
        if (is(_eagerState, currentState)) return;
      } catch (error) {} finally {}
      scheduleUpdateOnFiber(fiber, currentTime);
    }
  }

  var ContextOnlyDispatcher = {
    readContext: readContext,
    useCallback: throwInvalidHookError,
    useContext: throwInvalidHookError,
    useEffect: throwInvalidHookError,
    useImperativeHandle: throwInvalidHookError,
    useLayoutEffect: throwInvalidHookError,
    useMemo: throwInvalidHookError,
    useReducer: throwInvalidHookError,
    useRef: throwInvalidHookError,
    useState: throwInvalidHookError,
    useDebugValue: throwInvalidHookError,
    useResponder: throwInvalidHookError
  },
      HooksDispatcherOnMount = {
    readContext: readContext,
    useCallback: function useCallback(callback, deps) {
      mountWorkInProgressHook().memoizedState = [callback, undefined === deps ? null : deps];
      return callback;
    },
    useContext: readContext,
    useEffect: function useEffect(create, deps) {
      return mountEffectImpl(516, 192, create, deps);
    },
    useImperativeHandle: function useImperativeHandle(ref, create, deps) {
      deps = null !== deps && undefined !== deps ? deps.concat([ref]) : null;
      return mountEffectImpl(4, 36, imperativeHandleEffect.bind(null, create, ref), deps);
    },
    useLayoutEffect: function useLayoutEffect(create, deps) {
      return mountEffectImpl(4, 36, create, deps);
    },
    useMemo: function useMemo(nextCreate, deps) {
      var hook = mountWorkInProgressHook();
      deps = undefined === deps ? null : deps;
      nextCreate = nextCreate();
      hook.memoizedState = [nextCreate, deps];
      return nextCreate;
    },
    useReducer: function useReducer(reducer, initialArg, init) {
      var hook = mountWorkInProgressHook();
      initialArg = undefined !== init ? init(initialArg) : initialArg;
      hook.memoizedState = hook.baseState = initialArg;
      reducer = hook.queue = {
        last: null,
        dispatch: null,
        lastRenderedReducer: reducer,
        lastRenderedState: initialArg
      };
      reducer = reducer.dispatch = dispatchAction.bind(null, currentlyRenderingFiber$1, reducer);
      return [hook.memoizedState, reducer];
    },
    useRef: function useRef(initialValue) {
      var hook = mountWorkInProgressHook();
      initialValue = {
        current: initialValue
      };
      return hook.memoizedState = initialValue;
    },
    useState: function useState(initialState) {
      var hook = mountWorkInProgressHook();
      "function" === typeof initialState && (initialState = initialState());
      hook.memoizedState = hook.baseState = initialState;
      initialState = hook.queue = {
        last: null,
        dispatch: null,
        lastRenderedReducer: basicStateReducer,
        lastRenderedState: initialState
      };
      initialState = initialState.dispatch = dispatchAction.bind(null, currentlyRenderingFiber$1, initialState);
      return [hook.memoizedState, initialState];
    },
    useDebugValue: mountDebugValue,
    useResponder: createResponderListener
  },
      HooksDispatcherOnUpdate = {
    readContext: readContext,
    useCallback: function useCallback(callback, deps) {
      var hook = updateWorkInProgressHook();
      deps = undefined === deps ? null : deps;
      var prevState = hook.memoizedState;
      if (null !== prevState && null !== deps && areHookInputsEqual(deps, prevState[1])) return prevState[0];
      hook.memoizedState = [callback, deps];
      return callback;
    },
    useContext: readContext,
    useEffect: function useEffect(create, deps) {
      return updateEffectImpl(516, 192, create, deps);
    },
    useImperativeHandle: function useImperativeHandle(ref, create, deps) {
      deps = null !== deps && undefined !== deps ? deps.concat([ref]) : null;
      return updateEffectImpl(4, 36, imperativeHandleEffect.bind(null, create, ref), deps);
    },
    useLayoutEffect: function useLayoutEffect(create, deps) {
      return updateEffectImpl(4, 36, create, deps);
    },
    useMemo: function useMemo(nextCreate, deps) {
      var hook = updateWorkInProgressHook();
      deps = undefined === deps ? null : deps;
      var prevState = hook.memoizedState;
      if (null !== prevState && null !== deps && areHookInputsEqual(deps, prevState[1])) return prevState[0];
      nextCreate = nextCreate();
      hook.memoizedState = [nextCreate, deps];
      return nextCreate;
    },
    useReducer: updateReducer,
    useRef: function useRef() {
      return updateWorkInProgressHook().memoizedState;
    },
    useState: function useState(initialState) {
      return updateReducer(basicStateReducer, initialState);
    },
    useDebugValue: mountDebugValue,
    useResponder: createResponderListener
  },
      hydrationParentFiber = null,
      nextHydratableInstance = null,
      isHydrating = false;

  function tryHydrate(fiber, nextInstance) {
    switch (fiber.tag) {
      case 5:
        return nextInstance = shim$1(nextInstance, fiber.type, fiber.pendingProps), null !== nextInstance ? (fiber.stateNode = nextInstance, true) : false;

      case 6:
        return nextInstance = shim$1(nextInstance, fiber.pendingProps), null !== nextInstance ? (fiber.stateNode = nextInstance, true) : false;

      case 13:
        return false;

      default:
        return false;
    }
  }

  function tryToClaimNextHydratableInstance(fiber$jscomp$0) {
    if (isHydrating) {
      var nextInstance = nextHydratableInstance;

      if (nextInstance) {
        var firstAttemptedInstance = nextInstance;

        if (!tryHydrate(fiber$jscomp$0, nextInstance)) {
          nextInstance = shim$1(firstAttemptedInstance);

          if (!nextInstance || !tryHydrate(fiber$jscomp$0, nextInstance)) {
            fiber$jscomp$0.effectTag |= 2;
            isHydrating = false;
            hydrationParentFiber = fiber$jscomp$0;
            return;
          }

          var returnFiber = hydrationParentFiber,
              fiber = createFiber(5, null, null, 0);
          fiber.elementType = "DELETED";
          fiber.type = "DELETED";
          fiber.stateNode = firstAttemptedInstance;
          fiber.return = returnFiber;
          fiber.effectTag = 8;
          null !== returnFiber.lastEffect ? (returnFiber.lastEffect.nextEffect = fiber, returnFiber.lastEffect = fiber) : returnFiber.firstEffect = returnFiber.lastEffect = fiber;
        }

        hydrationParentFiber = fiber$jscomp$0;
        nextHydratableInstance = shim$1(nextInstance);
      } else fiber$jscomp$0.effectTag |= 2, isHydrating = false, hydrationParentFiber = fiber$jscomp$0;
    }
  }

  var ReactCurrentOwner$3 = ReactSharedInternals.ReactCurrentOwner,
      didReceiveUpdate = false;

  function reconcileChildren(current$$1, workInProgress, nextChildren, renderExpirationTime) {
    workInProgress.child = null === current$$1 ? mountChildFibers(workInProgress, null, nextChildren, renderExpirationTime) : reconcileChildFibers(workInProgress, current$$1.child, nextChildren, renderExpirationTime);
  }

  function updateForwardRef(current$$1, workInProgress, Component, nextProps, renderExpirationTime) {
    Component = Component.render;
    var ref = workInProgress.ref;
    prepareToReadContext(workInProgress, renderExpirationTime);
    nextProps = renderWithHooks(current$$1, workInProgress, Component, nextProps, ref, renderExpirationTime);
    if (null !== current$$1 && !didReceiveUpdate) return workInProgress.updateQueue = current$$1.updateQueue, workInProgress.effectTag &= -517, current$$1.expirationTime <= renderExpirationTime && (current$$1.expirationTime = 0), bailoutOnAlreadyFinishedWork(current$$1, workInProgress, renderExpirationTime);
    workInProgress.effectTag |= 1;
    reconcileChildren(current$$1, workInProgress, nextProps, renderExpirationTime);
    return workInProgress.child;
  }

  function updateMemoComponent(current$$1, workInProgress, Component, nextProps, updateExpirationTime, renderExpirationTime) {
    if (null === current$$1) {
      var type = Component.type;
      if ("function" === typeof type && !shouldConstruct(type) && undefined === type.defaultProps && null === Component.compare && undefined === Component.defaultProps) return workInProgress.tag = 15, workInProgress.type = type, updateSimpleMemoComponent(current$$1, workInProgress, type, nextProps, updateExpirationTime, renderExpirationTime);
      current$$1 = createFiberFromTypeAndProps(Component.type, null, nextProps, null, workInProgress.mode, renderExpirationTime);
      current$$1.ref = workInProgress.ref;
      current$$1.return = workInProgress;
      return workInProgress.child = current$$1;
    }

    type = current$$1.child;
    if (updateExpirationTime < renderExpirationTime && (updateExpirationTime = type.memoizedProps, Component = Component.compare, Component = null !== Component ? Component : shallowEqual, Component(updateExpirationTime, nextProps) && current$$1.ref === workInProgress.ref)) return bailoutOnAlreadyFinishedWork(current$$1, workInProgress, renderExpirationTime);
    workInProgress.effectTag |= 1;
    current$$1 = createWorkInProgress(type, nextProps, renderExpirationTime);
    current$$1.ref = workInProgress.ref;
    current$$1.return = workInProgress;
    return workInProgress.child = current$$1;
  }

  function updateSimpleMemoComponent(current$$1, workInProgress, Component, nextProps, updateExpirationTime, renderExpirationTime) {
    return null !== current$$1 && shallowEqual(current$$1.memoizedProps, nextProps) && current$$1.ref === workInProgress.ref && (didReceiveUpdate = false, updateExpirationTime < renderExpirationTime) ? bailoutOnAlreadyFinishedWork(current$$1, workInProgress, renderExpirationTime) : updateFunctionComponent(current$$1, workInProgress, Component, nextProps, renderExpirationTime);
  }

  function markRef(current$$1, workInProgress) {
    var ref = workInProgress.ref;
    if (null === current$$1 && null !== ref || null !== current$$1 && current$$1.ref !== ref) workInProgress.effectTag |= 128;
  }

  function updateFunctionComponent(current$$1, workInProgress, Component, nextProps, renderExpirationTime) {
    var context = isContextProvider(Component) ? previousContext : contextStackCursor.current;
    context = getMaskedContext(workInProgress, context);
    prepareToReadContext(workInProgress, renderExpirationTime);
    Component = renderWithHooks(current$$1, workInProgress, Component, nextProps, context, renderExpirationTime);
    if (null !== current$$1 && !didReceiveUpdate) return workInProgress.updateQueue = current$$1.updateQueue, workInProgress.effectTag &= -517, current$$1.expirationTime <= renderExpirationTime && (current$$1.expirationTime = 0), bailoutOnAlreadyFinishedWork(current$$1, workInProgress, renderExpirationTime);
    workInProgress.effectTag |= 1;
    reconcileChildren(current$$1, workInProgress, Component, renderExpirationTime);
    return workInProgress.child;
  }

  function updateClassComponent(current$$1, workInProgress, Component, nextProps, renderExpirationTime) {
    if (isContextProvider(Component)) {
      var hasContext = true;
      pushContextProvider(workInProgress);
    } else hasContext = false;

    prepareToReadContext(workInProgress, renderExpirationTime);
    if (null === workInProgress.stateNode) null !== current$$1 && (current$$1.alternate = null, workInProgress.alternate = null, workInProgress.effectTag |= 2), constructClassInstance(workInProgress, Component, nextProps, renderExpirationTime), mountClassInstance(workInProgress, Component, nextProps, renderExpirationTime), nextProps = true;else if (null === current$$1) {
      var instance = workInProgress.stateNode,
          oldProps = workInProgress.memoizedProps;
      instance.props = oldProps;
      var oldContext = instance.context,
          contextType = Component.contextType;
      "object" === typeof contextType && null !== contextType ? contextType = readContext(contextType) : (contextType = isContextProvider(Component) ? previousContext : contextStackCursor.current, contextType = getMaskedContext(workInProgress, contextType));
      var getDerivedStateFromProps = Component.getDerivedStateFromProps,
          hasNewLifecycles = "function" === typeof getDerivedStateFromProps || "function" === typeof instance.getSnapshotBeforeUpdate;
      hasNewLifecycles || "function" !== typeof instance.UNSAFE_componentWillReceiveProps && "function" !== typeof instance.componentWillReceiveProps || (oldProps !== nextProps || oldContext !== contextType) && callComponentWillReceiveProps(workInProgress, instance, nextProps, contextType);
      hasForceUpdate = false;
      var oldState = workInProgress.memoizedState;
      oldContext = instance.state = oldState;
      var updateQueue = workInProgress.updateQueue;
      null !== updateQueue && (processUpdateQueue(workInProgress, updateQueue, nextProps, instance, renderExpirationTime), oldContext = workInProgress.memoizedState);
      oldProps !== nextProps || oldState !== oldContext || didPerformWorkStackCursor.current || hasForceUpdate ? ("function" === typeof getDerivedStateFromProps && (applyDerivedStateFromProps(workInProgress, Component, getDerivedStateFromProps, nextProps), oldContext = workInProgress.memoizedState), (oldProps = hasForceUpdate || checkShouldComponentUpdate(workInProgress, Component, oldProps, nextProps, oldState, oldContext, contextType)) ? (hasNewLifecycles || "function" !== typeof instance.UNSAFE_componentWillMount && "function" !== typeof instance.componentWillMount || ("function" === typeof instance.componentWillMount && instance.componentWillMount(), "function" === typeof instance.UNSAFE_componentWillMount && instance.UNSAFE_componentWillMount()), "function" === typeof instance.componentDidMount && (workInProgress.effectTag |= 4)) : ("function" === typeof instance.componentDidMount && (workInProgress.effectTag |= 4), workInProgress.memoizedProps = nextProps, workInProgress.memoizedState = oldContext), instance.props = nextProps, instance.state = oldContext, instance.context = contextType, nextProps = oldProps) : ("function" === typeof instance.componentDidMount && (workInProgress.effectTag |= 4), nextProps = false);
    } else instance = workInProgress.stateNode, oldProps = workInProgress.memoizedProps, instance.props = workInProgress.type === workInProgress.elementType ? oldProps : resolveDefaultProps(workInProgress.type, oldProps), oldContext = instance.context, contextType = Component.contextType, "object" === typeof contextType && null !== contextType ? contextType = readContext(contextType) : (contextType = isContextProvider(Component) ? previousContext : contextStackCursor.current, contextType = getMaskedContext(workInProgress, contextType)), getDerivedStateFromProps = Component.getDerivedStateFromProps, (hasNewLifecycles = "function" === typeof getDerivedStateFromProps || "function" === typeof instance.getSnapshotBeforeUpdate) || "function" !== typeof instance.UNSAFE_componentWillReceiveProps && "function" !== typeof instance.componentWillReceiveProps || (oldProps !== nextProps || oldContext !== contextType) && callComponentWillReceiveProps(workInProgress, instance, nextProps, contextType), hasForceUpdate = false, oldContext = workInProgress.memoizedState, oldState = instance.state = oldContext, updateQueue = workInProgress.updateQueue, null !== updateQueue && (processUpdateQueue(workInProgress, updateQueue, nextProps, instance, renderExpirationTime), oldState = workInProgress.memoizedState), oldProps !== nextProps || oldContext !== oldState || didPerformWorkStackCursor.current || hasForceUpdate ? ("function" === typeof getDerivedStateFromProps && (applyDerivedStateFromProps(workInProgress, Component, getDerivedStateFromProps, nextProps), oldState = workInProgress.memoizedState), (getDerivedStateFromProps = hasForceUpdate || checkShouldComponentUpdate(workInProgress, Component, oldProps, nextProps, oldContext, oldState, contextType)) ? (hasNewLifecycles || "function" !== typeof instance.UNSAFE_componentWillUpdate && "function" !== typeof instance.componentWillUpdate || ("function" === typeof instance.componentWillUpdate && instance.componentWillUpdate(nextProps, oldState, contextType), "function" === typeof instance.UNSAFE_componentWillUpdate && instance.UNSAFE_componentWillUpdate(nextProps, oldState, contextType)), "function" === typeof instance.componentDidUpdate && (workInProgress.effectTag |= 4), "function" === typeof instance.getSnapshotBeforeUpdate && (workInProgress.effectTag |= 256)) : ("function" !== typeof instance.componentDidUpdate || oldProps === current$$1.memoizedProps && oldContext === current$$1.memoizedState || (workInProgress.effectTag |= 4), "function" !== typeof instance.getSnapshotBeforeUpdate || oldProps === current$$1.memoizedProps && oldContext === current$$1.memoizedState || (workInProgress.effectTag |= 256), workInProgress.memoizedProps = nextProps, workInProgress.memoizedState = oldState), instance.props = nextProps, instance.state = oldState, instance.context = contextType, nextProps = getDerivedStateFromProps) : ("function" !== typeof instance.componentDidUpdate || oldProps === current$$1.memoizedProps && oldContext === current$$1.memoizedState || (workInProgress.effectTag |= 4), "function" !== typeof instance.getSnapshotBeforeUpdate || oldProps === current$$1.memoizedProps && oldContext === current$$1.memoizedState || (workInProgress.effectTag |= 256), nextProps = false);
    return finishClassComponent(current$$1, workInProgress, Component, nextProps, hasContext, renderExpirationTime);
  }

  function finishClassComponent(current$$1, workInProgress, Component, shouldUpdate, hasContext, renderExpirationTime) {
    markRef(current$$1, workInProgress);
    var didCaptureError = 0 !== (workInProgress.effectTag & 64);
    if (!shouldUpdate && !didCaptureError) return hasContext && invalidateContextProvider(workInProgress, Component, false), bailoutOnAlreadyFinishedWork(current$$1, workInProgress, renderExpirationTime);
    shouldUpdate = workInProgress.stateNode;
    ReactCurrentOwner$3.current = workInProgress;
    var nextChildren = didCaptureError && "function" !== typeof Component.getDerivedStateFromError ? null : shouldUpdate.render();
    workInProgress.effectTag |= 1;
    null !== current$$1 && didCaptureError ? (workInProgress.child = reconcileChildFibers(workInProgress, current$$1.child, null, renderExpirationTime), workInProgress.child = reconcileChildFibers(workInProgress, null, nextChildren, renderExpirationTime)) : reconcileChildren(current$$1, workInProgress, nextChildren, renderExpirationTime);
    workInProgress.memoizedState = shouldUpdate.state;
    hasContext && invalidateContextProvider(workInProgress, Component, true);
    return workInProgress.child;
  }

  function pushHostRootContext(workInProgress) {
    var root = workInProgress.stateNode;
    root.pendingContext ? pushTopLevelContextObject(workInProgress, root.pendingContext, root.pendingContext !== root.context) : root.context && pushTopLevelContextObject(workInProgress, root.context, false);
    pushHostContainer(workInProgress, root.containerInfo);
  }

  var SUSPENDED_MARKER = {};

  function updateSuspenseComponent(current$$1, workInProgress, renderExpirationTime) {
    var mode = workInProgress.mode,
        nextProps = workInProgress.pendingProps,
        suspenseContext = suspenseStackCursor.current,
        nextState = null,
        nextDidTimeout = false,
        JSCompiler_temp;
    (JSCompiler_temp = 0 !== (workInProgress.effectTag & 64)) || (JSCompiler_temp = 0 !== (suspenseContext & ForceSuspenseFallback) && (null === current$$1 || null !== current$$1.memoizedState));
    JSCompiler_temp ? (nextState = SUSPENDED_MARKER, nextDidTimeout = true, workInProgress.effectTag &= -65) : null !== current$$1 && null === current$$1.memoizedState || undefined === nextProps.fallback || true === nextProps.unstable_avoidThisFallback || (suspenseContext |= InvisibleParentSuspenseContext);
    suspenseContext &= SubtreeSuspenseContextMask;
    push(suspenseStackCursor, suspenseContext, workInProgress);
    if (null === current$$1) {
      if (nextDidTimeout) {
        nextProps = nextProps.fallback;
        current$$1 = createFiberFromFragment(null, mode, 0, null);
        current$$1.return = workInProgress;
        if (0 === (workInProgress.mode & 2)) for (nextDidTimeout = null !== workInProgress.memoizedState ? workInProgress.child.child : workInProgress.child, current$$1.child = nextDidTimeout; null !== nextDidTimeout;) {
          nextDidTimeout.return = current$$1, nextDidTimeout = nextDidTimeout.sibling;
        }
        renderExpirationTime = createFiberFromFragment(nextProps, mode, renderExpirationTime, null);
        renderExpirationTime.return = workInProgress;
        current$$1.sibling = renderExpirationTime;
        mode = current$$1;
      } else mode = renderExpirationTime = mountChildFibers(workInProgress, null, nextProps.children, renderExpirationTime);
    } else {
      if (null !== current$$1.memoizedState) {
        if (suspenseContext = current$$1.child, mode = suspenseContext.sibling, nextDidTimeout) {
          nextProps = nextProps.fallback;
          renderExpirationTime = createWorkInProgress(suspenseContext, suspenseContext.pendingProps, 0);
          renderExpirationTime.return = workInProgress;
          if (0 === (workInProgress.mode & 2) && (nextDidTimeout = null !== workInProgress.memoizedState ? workInProgress.child.child : workInProgress.child, nextDidTimeout !== suspenseContext.child)) for (renderExpirationTime.child = nextDidTimeout; null !== nextDidTimeout;) {
            nextDidTimeout.return = renderExpirationTime, nextDidTimeout = nextDidTimeout.sibling;
          }
          nextProps = createWorkInProgress(mode, nextProps, mode.expirationTime);
          nextProps.return = workInProgress;
          renderExpirationTime.sibling = nextProps;
          mode = renderExpirationTime;
          renderExpirationTime.childExpirationTime = 0;
          renderExpirationTime = nextProps;
        } else mode = renderExpirationTime = reconcileChildFibers(workInProgress, suspenseContext.child, nextProps.children, renderExpirationTime);
      } else if (suspenseContext = current$$1.child, nextDidTimeout) {
        nextDidTimeout = nextProps.fallback;
        nextProps = createFiberFromFragment(null, mode, 0, null);
        nextProps.return = workInProgress;
        nextProps.child = suspenseContext;
        null !== suspenseContext && (suspenseContext.return = nextProps);
        if (0 === (workInProgress.mode & 2)) for (suspenseContext = null !== workInProgress.memoizedState ? workInProgress.child.child : workInProgress.child, nextProps.child = suspenseContext; null !== suspenseContext;) {
          suspenseContext.return = nextProps, suspenseContext = suspenseContext.sibling;
        }
        renderExpirationTime = createFiberFromFragment(nextDidTimeout, mode, renderExpirationTime, null);
        renderExpirationTime.return = workInProgress;
        nextProps.sibling = renderExpirationTime;
        renderExpirationTime.effectTag |= 2;
        mode = nextProps;
        nextProps.childExpirationTime = 0;
      } else renderExpirationTime = mode = reconcileChildFibers(workInProgress, suspenseContext, nextProps.children, renderExpirationTime);
      workInProgress.stateNode = current$$1.stateNode;
    }
    workInProgress.memoizedState = nextState;
    workInProgress.child = mode;
    return renderExpirationTime;
  }

  function initSuspenseListRenderState(workInProgress, isBackwards, tail, lastContentRow, tailMode) {
    var renderState = workInProgress.memoizedState;
    null === renderState ? workInProgress.memoizedState = {
      isBackwards: isBackwards,
      rendering: null,
      last: lastContentRow,
      tail: tail,
      tailExpiration: 0,
      tailMode: tailMode
    } : (renderState.isBackwards = isBackwards, renderState.rendering = null, renderState.last = lastContentRow, renderState.tail = tail, renderState.tailExpiration = 0, renderState.tailMode = tailMode);
  }

  function updateSuspenseListComponent(current$$1, workInProgress, renderExpirationTime) {
    var nextProps = workInProgress.pendingProps,
        revealOrder = nextProps.revealOrder,
        tailMode = nextProps.tail;
    reconcileChildren(current$$1, workInProgress, nextProps.children, renderExpirationTime);
    nextProps = suspenseStackCursor.current;
    if (0 !== (nextProps & ForceSuspenseFallback)) nextProps = nextProps & SubtreeSuspenseContextMask | ForceSuspenseFallback, workInProgress.effectTag |= 64;else {
      if (null !== current$$1 && 0 !== (current$$1.effectTag & 64)) a: for (current$$1 = workInProgress.child; null !== current$$1;) {
        if (13 === current$$1.tag) {
          if (null !== current$$1.memoizedState) {
            current$$1.expirationTime < renderExpirationTime && (current$$1.expirationTime = renderExpirationTime);
            var alternate = current$$1.alternate;
            null !== alternate && alternate.expirationTime < renderExpirationTime && (alternate.expirationTime = renderExpirationTime);
            scheduleWorkOnParentPath(current$$1.return, renderExpirationTime);
          }
        } else if (null !== current$$1.child) {
          current$$1.child.return = current$$1;
          current$$1 = current$$1.child;
          continue;
        }

        if (current$$1 === workInProgress) break a;

        for (; null === current$$1.sibling;) {
          if (null === current$$1.return || current$$1.return === workInProgress) break a;
          current$$1 = current$$1.return;
        }

        current$$1.sibling.return = current$$1.return;
        current$$1 = current$$1.sibling;
      }
      nextProps &= SubtreeSuspenseContextMask;
    }
    push(suspenseStackCursor, nextProps, workInProgress);
    if (0 === (workInProgress.mode & 2)) workInProgress.memoizedState = null;else switch (revealOrder) {
      case "forwards":
        renderExpirationTime = workInProgress.child;

        for (revealOrder = null; null !== renderExpirationTime;) {
          nextProps = renderExpirationTime.alternate, null !== nextProps && null === findFirstSuspended(nextProps) && (revealOrder = renderExpirationTime), renderExpirationTime = renderExpirationTime.sibling;
        }

        renderExpirationTime = revealOrder;
        null === renderExpirationTime ? (revealOrder = workInProgress.child, workInProgress.child = null) : (revealOrder = renderExpirationTime.sibling, renderExpirationTime.sibling = null);
        initSuspenseListRenderState(workInProgress, false, revealOrder, renderExpirationTime, tailMode);
        break;

      case "backwards":
        renderExpirationTime = null;
        revealOrder = workInProgress.child;

        for (workInProgress.child = null; null !== revealOrder;) {
          nextProps = revealOrder.alternate;

          if (null !== nextProps && null === findFirstSuspended(nextProps)) {
            workInProgress.child = revealOrder;
            break;
          }

          nextProps = revealOrder.sibling;
          revealOrder.sibling = renderExpirationTime;
          renderExpirationTime = revealOrder;
          revealOrder = nextProps;
        }

        initSuspenseListRenderState(workInProgress, true, renderExpirationTime, null, tailMode);
        break;

      case "together":
        initSuspenseListRenderState(workInProgress, false, null, null, undefined);
        break;

      default:
        workInProgress.memoizedState = null;
    }
    return workInProgress.child;
  }

  function bailoutOnAlreadyFinishedWork(current$$1, workInProgress, renderExpirationTime) {
    null !== current$$1 && (workInProgress.dependencies = current$$1.dependencies);
    if (workInProgress.childExpirationTime < renderExpirationTime) return null;
    if (null !== current$$1 && workInProgress.child !== current$$1.child) throw ReactError(Error("Resuming work not yet implemented."));

    if (null !== workInProgress.child) {
      current$$1 = workInProgress.child;
      renderExpirationTime = createWorkInProgress(current$$1, current$$1.pendingProps, current$$1.expirationTime);
      workInProgress.child = renderExpirationTime;

      for (renderExpirationTime.return = workInProgress; null !== current$$1.sibling;) {
        current$$1 = current$$1.sibling, renderExpirationTime = renderExpirationTime.sibling = createWorkInProgress(current$$1, current$$1.pendingProps, current$$1.expirationTime), renderExpirationTime.return = workInProgress;
      }

      renderExpirationTime.sibling = null;
    }

    return workInProgress.child;
  }

  var _appendAllChildren = undefined,
      updateHostContainer = undefined,
      updateHostComponent$1 = undefined,
      updateHostText$1 = undefined;

  _appendAllChildren = function appendAllChildren(parent, workInProgress, needsVisibilityToggle, isHidden) {
    for (var node = workInProgress.child; null !== node;) {
      if (5 === node.tag) {
        var instance = node.stateNode;
        needsVisibilityToggle && isHidden && (instance = cloneHiddenInstance(instance, node.type, node.memoizedProps, node));
        appendChildNode(parent.node, instance.node);
      } else if (6 === node.tag) {
        instance = node.stateNode;
        if (needsVisibilityToggle && isHidden) throw Error("Not yet implemented.");
        appendChildNode(parent.node, instance.node);
      } else if (4 !== node.tag) {
        if (13 === node.tag && 0 !== (node.effectTag & 4) && (instance = null !== node.memoizedState)) {
          var primaryChildParent = node.child;

          if (null !== primaryChildParent && (null !== primaryChildParent.child && (primaryChildParent.child.return = primaryChildParent, _appendAllChildren(parent, primaryChildParent, true, instance)), instance = primaryChildParent.sibling, null !== instance)) {
            instance.return = node;
            node = instance;
            continue;
          }
        }

        if (null !== node.child) {
          node.child.return = node;
          node = node.child;
          continue;
        }
      }

      if (node === workInProgress) break;

      for (; null === node.sibling;) {
        if (null === node.return || node.return === workInProgress) return;
        node = node.return;
      }

      node.sibling.return = node.return;
      node = node.sibling;
    }
  };

  function appendAllChildrenToContainer(containerChildSet, workInProgress, needsVisibilityToggle, isHidden) {
    for (var node = workInProgress.child; null !== node;) {
      if (5 === node.tag) {
        var instance = node.stateNode;
        needsVisibilityToggle && isHidden && (instance = cloneHiddenInstance(instance, node.type, node.memoizedProps, node));
        appendChildNodeToSet(containerChildSet, instance.node);
      } else if (6 === node.tag) {
        instance = node.stateNode;
        if (needsVisibilityToggle && isHidden) throw Error("Not yet implemented.");
        appendChildNodeToSet(containerChildSet, instance.node);
      } else if (4 !== node.tag) {
        if (13 === node.tag && 0 !== (node.effectTag & 4) && (instance = null !== node.memoizedState)) {
          var primaryChildParent = node.child;

          if (null !== primaryChildParent && (null !== primaryChildParent.child && (primaryChildParent.child.return = primaryChildParent, appendAllChildrenToContainer(containerChildSet, primaryChildParent, true, instance)), instance = primaryChildParent.sibling, null !== instance)) {
            instance.return = node;
            node = instance;
            continue;
          }
        }

        if (null !== node.child) {
          node.child.return = node;
          node = node.child;
          continue;
        }
      }

      if (node === workInProgress) break;

      for (; null === node.sibling;) {
        if (null === node.return || node.return === workInProgress) return;
        node = node.return;
      }

      node.sibling.return = node.return;
      node = node.sibling;
    }
  }

  updateHostContainer = function updateHostContainer(workInProgress) {
    var portalOrRoot = workInProgress.stateNode;

    if (null !== workInProgress.firstEffect) {
      var container = portalOrRoot.containerInfo,
          newChildSet = createChildNodeSet(container);
      appendAllChildrenToContainer(newChildSet, workInProgress, false, false);
      portalOrRoot.pendingChildren = newChildSet;
      workInProgress.effectTag |= 4;
      completeRoot(container, newChildSet);
    }
  };

  updateHostComponent$1 = function updateHostComponent$1(current, workInProgress, type, newProps) {
    type = current.stateNode;
    var oldProps = current.memoizedProps;
    if ((current = null === workInProgress.firstEffect) && oldProps === newProps) workInProgress.stateNode = type;else {
      var recyclableInstance = workInProgress.stateNode;
      requiredContext(contextStackCursor$1.current);
      var updatePayload = null;
      oldProps !== newProps && (oldProps = diffProperties(null, oldProps, newProps, recyclableInstance.canonical.viewConfig.validAttributes), recyclableInstance.canonical.currentProps = newProps, updatePayload = oldProps);
      current && null === updatePayload ? workInProgress.stateNode = type : (newProps = updatePayload, recyclableInstance = type.node, type = {
        node: current ? null !== newProps ? cloneNodeWithNewProps(recyclableInstance, newProps) : cloneNode(recyclableInstance) : null !== newProps ? cloneNodeWithNewChildrenAndProps(recyclableInstance, newProps) : cloneNodeWithNewChildren(recyclableInstance),
        canonical: type.canonical
      }, workInProgress.stateNode = type, current ? workInProgress.effectTag |= 4 : _appendAllChildren(type, workInProgress, false, false));
    }
  };

  updateHostText$1 = function updateHostText$1(current, workInProgress, oldText, newText) {
    oldText !== newText && (current = requiredContext(rootInstanceStackCursor.current), oldText = requiredContext(contextStackCursor$1.current), workInProgress.stateNode = createTextInstance(newText, current, oldText, workInProgress), workInProgress.effectTag |= 4);
  };

  function cutOffTailIfNeeded(renderState, hasRenderedATailFallback) {
    switch (renderState.tailMode) {
      case "hidden":
        hasRenderedATailFallback = renderState.tail;

        for (var lastTailNode = null; null !== hasRenderedATailFallback;) {
          null !== hasRenderedATailFallback.alternate && (lastTailNode = hasRenderedATailFallback), hasRenderedATailFallback = hasRenderedATailFallback.sibling;
        }

        null === lastTailNode ? renderState.tail = null : lastTailNode.sibling = null;
        break;

      case "collapsed":
        lastTailNode = renderState.tail;

        for (var _lastTailNode = null; null !== lastTailNode;) {
          null !== lastTailNode.alternate && (_lastTailNode = lastTailNode), lastTailNode = lastTailNode.sibling;
        }

        null === _lastTailNode ? hasRenderedATailFallback || null === renderState.tail ? renderState.tail = null : renderState.tail.sibling = null : _lastTailNode.sibling = null;
    }
  }

  function unwindWork(workInProgress) {
    switch (workInProgress.tag) {
      case 1:
        isContextProvider(workInProgress.type) && popContext(workInProgress);
        var effectTag = workInProgress.effectTag;
        return effectTag & 2048 ? (workInProgress.effectTag = effectTag & -2049 | 64, workInProgress) : null;

      case 3:
        popHostContainer(workInProgress);
        popTopLevelContextObject(workInProgress);
        effectTag = workInProgress.effectTag;
        if (0 !== (effectTag & 64)) throw ReactError(Error("The root failed to unmount after an error. This is likely a bug in React. Please file an issue."));
        workInProgress.effectTag = effectTag & -2049 | 64;
        return workInProgress;

      case 5:
        return popHostContext(workInProgress), null;

      case 13:
        return pop(suspenseStackCursor, workInProgress), effectTag = workInProgress.effectTag, effectTag & 2048 ? (workInProgress.effectTag = effectTag & -2049 | 64, workInProgress) : null;

      case 18:
        return null;

      case 19:
        return pop(suspenseStackCursor, workInProgress), null;

      case 4:
        return popHostContainer(workInProgress), null;

      case 10:
        return popProvider(workInProgress), null;

      default:
        return null;
    }
  }

  function createCapturedValue(value, source) {
    return {
      value: value,
      source: source,
      stack: getStackByFiberInDevAndProd(source)
    };
  }

  if ("function" !== typeof ReactNativePrivateInterface.ReactFiberErrorDialog.showErrorDialog) throw ReactError(Error("Expected ReactFiberErrorDialog.showErrorDialog to be a function."));

  function logCapturedError(capturedError) {
    false !== ReactNativePrivateInterface.ReactFiberErrorDialog.showErrorDialog(capturedError) && console.error(capturedError.error);
  }

  var PossiblyWeakSet$1 = "function" === typeof WeakSet ? WeakSet : Set;

  function logError(boundary, errorInfo) {
    var source = errorInfo.source,
        stack = errorInfo.stack;
    null === stack && null !== source && (stack = getStackByFiberInDevAndProd(source));
    errorInfo = {
      componentName: null !== source ? getComponentName(source.type) : null,
      componentStack: null !== stack ? stack : "",
      error: errorInfo.value,
      errorBoundary: null,
      errorBoundaryName: null,
      errorBoundaryFound: false,
      willRetry: false
    };
    null !== boundary && 1 === boundary.tag && (errorInfo.errorBoundary = boundary.stateNode, errorInfo.errorBoundaryName = getComponentName(boundary.type), errorInfo.errorBoundaryFound = true, errorInfo.willRetry = true);

    try {
      logCapturedError(errorInfo);
    } catch (e) {
      setTimeout(function () {
        throw e;
      });
    }
  }

  function safelyCallComponentWillUnmount(current$$1, instance) {
    try {
      instance.props = current$$1.memoizedProps, instance.state = current$$1.memoizedState, instance.componentWillUnmount();
    } catch (unmountError) {
      captureCommitPhaseError(current$$1, unmountError);
    }
  }

  function safelyDetachRef(current$$1) {
    var ref = current$$1.ref;
    if (null !== ref) if ("function" === typeof ref) try {
      ref(null);
    } catch (refError) {
      captureCommitPhaseError(current$$1, refError);
    } else ref.current = null;
  }

  function commitHookEffectList(unmountTag, mountTag, finishedWork) {
    finishedWork = finishedWork.updateQueue;
    finishedWork = null !== finishedWork ? finishedWork.lastEffect : null;

    if (null !== finishedWork) {
      var effect = finishedWork = finishedWork.next;

      do {
        if ((effect.tag & unmountTag) !== NoEffect$1) {
          var destroy = effect.destroy;
          effect.destroy = undefined;
          undefined !== destroy && destroy();
        }

        (effect.tag & mountTag) !== NoEffect$1 && (destroy = effect.create, effect.destroy = destroy());
        effect = effect.next;
      } while (effect !== finishedWork);
    }
  }

  function commitUnmount(current$$1$jscomp$0, renderPriorityLevel) {
    "function" === typeof onCommitFiberUnmount && onCommitFiberUnmount(current$$1$jscomp$0);

    switch (current$$1$jscomp$0.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        var updateQueue = current$$1$jscomp$0.updateQueue;

        if (null !== updateQueue && (updateQueue = updateQueue.lastEffect, null !== updateQueue)) {
          var firstEffect = updateQueue.next;
          runWithPriority$1(97 < renderPriorityLevel ? 97 : renderPriorityLevel, function () {
            var effect = firstEffect;

            do {
              var destroy = effect.destroy;

              if (undefined !== destroy) {
                var current$$1 = current$$1$jscomp$0;

                try {
                  destroy();
                } catch (error) {
                  captureCommitPhaseError(current$$1, error);
                }
              }

              effect = effect.next;
            } while (effect !== firstEffect);
          });
        }

        break;

      case 1:
        safelyDetachRef(current$$1$jscomp$0);
        renderPriorityLevel = current$$1$jscomp$0.stateNode;
        "function" === typeof renderPriorityLevel.componentWillUnmount && safelyCallComponentWillUnmount(current$$1$jscomp$0, renderPriorityLevel);
        break;

      case 5:
        safelyDetachRef(current$$1$jscomp$0);
        break;

      case 4:
        createChildNodeSet(current$$1$jscomp$0.stateNode.containerInfo);
    }
  }

  function detachFiber(current$$1) {
    var alternate = current$$1.alternate;
    current$$1.return = null;
    current$$1.child = null;
    current$$1.memoizedState = null;
    current$$1.updateQueue = null;
    current$$1.dependencies = null;
    current$$1.alternate = null;
    current$$1.firstEffect = null;
    current$$1.lastEffect = null;
    current$$1.pendingProps = null;
    current$$1.memoizedProps = null;
    null !== alternate && detachFiber(alternate);
  }

  function commitWork(current$$1, finishedWork) {
    switch (finishedWork.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        commitHookEffectList(UnmountMutation, MountMutation, finishedWork);
        return;

      case 12:
        return;

      case 13:
        null !== finishedWork.memoizedState && (globalMostRecentFallbackTime = now());
        attachSuspenseRetryListeners(finishedWork);
        return;

      case 19:
        attachSuspenseRetryListeners(finishedWork);
        return;
    }

    switch (finishedWork.tag) {
      case 1:
      case 5:
      case 6:
      case 20:
        break;

      case 3:
      case 4:
        break;

      default:
        throw ReactError(Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue."));
    }
  }

  function attachSuspenseRetryListeners(finishedWork) {
    var thenables = finishedWork.updateQueue;

    if (null !== thenables) {
      finishedWork.updateQueue = null;
      var retryCache = finishedWork.stateNode;
      null === retryCache && (retryCache = finishedWork.stateNode = new PossiblyWeakSet$1());
      thenables.forEach(function (thenable) {
        var retry = resolveRetryThenable.bind(null, finishedWork, thenable);
        retryCache.has(thenable) || (retryCache.add(thenable), thenable.then(retry, retry));
      });
    }
  }

  var PossiblyWeakMap = "function" === typeof WeakMap ? WeakMap : Map;

  function createRootErrorUpdate(fiber, errorInfo, expirationTime) {
    expirationTime = createUpdate(expirationTime, null);
    expirationTime.tag = 3;
    expirationTime.payload = {
      element: null
    };
    var error = errorInfo.value;

    expirationTime.callback = function () {
      hasUncaughtError || (hasUncaughtError = true, firstUncaughtError = error);
      logError(fiber, errorInfo);
    };

    return expirationTime;
  }

  function createClassErrorUpdate(fiber, errorInfo, expirationTime) {
    expirationTime = createUpdate(expirationTime, null);
    expirationTime.tag = 3;
    var getDerivedStateFromError = fiber.type.getDerivedStateFromError;

    if ("function" === typeof getDerivedStateFromError) {
      var error = errorInfo.value;

      expirationTime.payload = function () {
        logError(fiber, errorInfo);
        return getDerivedStateFromError(error);
      };
    }

    var inst = fiber.stateNode;
    null !== inst && "function" === typeof inst.componentDidCatch && (expirationTime.callback = function () {
      "function" !== typeof getDerivedStateFromError && (null === legacyErrorBoundariesThatAlreadyFailed ? legacyErrorBoundariesThatAlreadyFailed = new Set([this]) : legacyErrorBoundariesThatAlreadyFailed.add(this), logError(fiber, errorInfo));
      var stack = errorInfo.stack;
      this.componentDidCatch(errorInfo.value, {
        componentStack: null !== stack ? stack : ""
      });
    });
    return expirationTime;
  }

  var ceil = Math.ceil,
      ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher,
      ReactCurrentOwner$2 = ReactSharedInternals.ReactCurrentOwner,
      NoContext = 0,
      LegacyUnbatchedContext = 8,
      RenderContext = 16,
      CommitContext = 32,
      RootIncomplete = 0,
      RootErrored = 1,
      RootSuspended = 2,
      RootSuspendedWithDelay = 3,
      RootCompleted = 4,
      executionContext = NoContext,
      workInProgressRoot = null,
      workInProgress = null,
      renderExpirationTime = 0,
      workInProgressRootExitStatus = RootIncomplete,
      workInProgressRootLatestProcessedExpirationTime = 1073741823,
      workInProgressRootLatestSuspenseTimeout = 1073741823,
      workInProgressRootCanSuspendUsingConfig = null,
      workInProgressRootHasPendingPing = false,
      globalMostRecentFallbackTime = 0,
      FALLBACK_THROTTLE_MS = 500,
      nextEffect = null,
      hasUncaughtError = false,
      firstUncaughtError = null,
      legacyErrorBoundariesThatAlreadyFailed = null,
      rootDoesHavePassiveEffects = false,
      rootWithPendingPassiveEffects = null,
      pendingPassiveEffectsRenderPriority = 90,
      pendingPassiveEffectsExpirationTime = 0,
      rootsWithPendingDiscreteUpdates = null,
      nestedUpdateCount = 0,
      rootWithNestedUpdates = null,
      currentEventTime = 0;

  function requestCurrentTime() {
    return (executionContext & 48) !== NoContext ? 1073741821 - (now() / 10 | 0) : 0 !== currentEventTime ? currentEventTime : currentEventTime = 1073741821 - (now() / 10 | 0);
  }

  function computeExpirationForFiber(currentTime, fiber, suspenseConfig) {
    fiber = fiber.mode;
    if (0 === (fiber & 2)) return 1073741823;
    var priorityLevel = getCurrentPriorityLevel();
    if (0 === (fiber & 4)) return 99 === priorityLevel ? 1073741823 : 1073741822;
    if ((executionContext & RenderContext) !== NoContext) return renderExpirationTime;
    if (null !== suspenseConfig) currentTime = 1073741821 - 25 * (((1073741821 - currentTime + (suspenseConfig.timeoutMs | 0 || 5e3) / 10) / 25 | 0) + 1);else switch (priorityLevel) {
      case 99:
        currentTime = 1073741823;
        break;

      case 98:
        currentTime = 1073741821 - 10 * (((1073741821 - currentTime + 15) / 10 | 0) + 1);
        break;

      case 97:
      case 96:
        currentTime = 1073741821 - 25 * (((1073741821 - currentTime + 500) / 25 | 0) + 1);
        break;

      case 95:
        currentTime = 1;
        break;

      default:
        throw ReactError(Error("Expected a valid priority level"));
    }
    null !== workInProgressRoot && currentTime === renderExpirationTime && --currentTime;
    return currentTime;
  }

  function scheduleUpdateOnFiber(fiber, expirationTime) {
    if (50 < nestedUpdateCount) throw nestedUpdateCount = 0, rootWithNestedUpdates = null, ReactError(Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops."));
    fiber = markUpdateTimeFromFiberToRoot(fiber, expirationTime);

    if (null !== fiber) {
      fiber.pingTime = 0;
      var priorityLevel = getCurrentPriorityLevel();
      if (1073741823 === expirationTime) {
        if ((executionContext & LegacyUnbatchedContext) !== NoContext && (executionContext & 48) === NoContext) for (var callback = renderRoot(fiber, 1073741823, true); null !== callback;) {
          callback = callback(true);
        } else scheduleCallbackForRoot(fiber, 99, 1073741823), executionContext === NoContext && flushSyncCallbackQueue();
      } else scheduleCallbackForRoot(fiber, priorityLevel, expirationTime);
      (executionContext & 4) === NoContext || 98 !== priorityLevel && 99 !== priorityLevel || (null === rootsWithPendingDiscreteUpdates ? rootsWithPendingDiscreteUpdates = new Map([[fiber, expirationTime]]) : (priorityLevel = rootsWithPendingDiscreteUpdates.get(fiber), (undefined === priorityLevel || priorityLevel > expirationTime) && rootsWithPendingDiscreteUpdates.set(fiber, expirationTime)));
    }
  }

  function markUpdateTimeFromFiberToRoot(fiber, expirationTime) {
    fiber.expirationTime < expirationTime && (fiber.expirationTime = expirationTime);
    var alternate = fiber.alternate;
    null !== alternate && alternate.expirationTime < expirationTime && (alternate.expirationTime = expirationTime);
    var node = fiber.return,
        root = null;
    if (null === node && 3 === fiber.tag) root = fiber.stateNode;else for (; null !== node;) {
      alternate = node.alternate;
      node.childExpirationTime < expirationTime && (node.childExpirationTime = expirationTime);
      null !== alternate && alternate.childExpirationTime < expirationTime && (alternate.childExpirationTime = expirationTime);

      if (null === node.return && 3 === node.tag) {
        root = node.stateNode;
        break;
      }

      node = node.return;
    }
    null !== root && (expirationTime > root.firstPendingTime && (root.firstPendingTime = expirationTime), fiber = root.lastPendingTime, 0 === fiber || expirationTime < fiber) && (root.lastPendingTime = expirationTime);
    return root;
  }

  function scheduleCallbackForRoot(root, priorityLevel, expirationTime) {
    if (root.callbackExpirationTime < expirationTime) {
      var existingCallbackNode = root.callbackNode;
      null !== existingCallbackNode && existingCallbackNode !== fakeCallbackNode && Scheduler_cancelCallback(existingCallbackNode);
      root.callbackExpirationTime = expirationTime;
      1073741823 === expirationTime ? root.callbackNode = scheduleSyncCallback(runRootCallback.bind(null, root, renderRoot.bind(null, root, expirationTime))) : (existingCallbackNode = null, 1 !== expirationTime && (existingCallbackNode = {
        timeout: 10 * (1073741821 - expirationTime) - now()
      }), root.callbackNode = scheduleCallback(priorityLevel, runRootCallback.bind(null, root, renderRoot.bind(null, root, expirationTime)), existingCallbackNode));
    }
  }

  function runRootCallback(root, callback, isSync) {
    var prevCallbackNode = root.callbackNode,
        continuation = null;

    try {
      return continuation = callback(isSync), null !== continuation ? runRootCallback.bind(null, root, continuation) : null;
    } finally {
      null === continuation && prevCallbackNode === root.callbackNode && (root.callbackNode = null, root.callbackExpirationTime = 0);
    }
  }

  function resolveLocksOnRoot(root, expirationTime) {
    var firstBatch = root.firstBatch;
    return null !== firstBatch && firstBatch._defer && firstBatch._expirationTime >= expirationTime ? (scheduleCallback(97, function () {
      firstBatch._onComplete();

      return null;
    }), true) : false;
  }

  function flushPendingDiscreteUpdates() {
    if (null !== rootsWithPendingDiscreteUpdates) {
      var roots = rootsWithPendingDiscreteUpdates;
      rootsWithPendingDiscreteUpdates = null;
      roots.forEach(function (expirationTime, root) {
        scheduleSyncCallback(renderRoot.bind(null, root, expirationTime));
      });
      flushSyncCallbackQueue();
    }
  }

  function prepareFreshStack(root, expirationTime) {
    root.finishedWork = null;
    root.finishedExpirationTime = 0;
    var timeoutHandle = root.timeoutHandle;
    -1 !== timeoutHandle && (root.timeoutHandle = -1, cancelTimeout(timeoutHandle));
    if (null !== workInProgress) for (timeoutHandle = workInProgress.return; null !== timeoutHandle;) {
      var interruptedWork = timeoutHandle;

      switch (interruptedWork.tag) {
        case 1:
          var childContextTypes = interruptedWork.type.childContextTypes;
          null !== childContextTypes && undefined !== childContextTypes && popContext(interruptedWork);
          break;

        case 3:
          popHostContainer(interruptedWork);
          popTopLevelContextObject(interruptedWork);
          break;

        case 5:
          popHostContext(interruptedWork);
          break;

        case 4:
          popHostContainer(interruptedWork);
          break;

        case 13:
          pop(suspenseStackCursor, interruptedWork);
          break;

        case 19:
          pop(suspenseStackCursor, interruptedWork);
          break;

        case 10:
          popProvider(interruptedWork);
      }

      timeoutHandle = timeoutHandle.return;
    }
    workInProgressRoot = root;
    workInProgress = createWorkInProgress(root.current, null, expirationTime);
    renderExpirationTime = expirationTime;
    workInProgressRootExitStatus = RootIncomplete;
    workInProgressRootLatestSuspenseTimeout = workInProgressRootLatestProcessedExpirationTime = 1073741823;
    workInProgressRootCanSuspendUsingConfig = null;
    workInProgressRootHasPendingPing = false;
  }

  function renderRoot(root$jscomp$0, expirationTime, isSync) {
    if ((executionContext & 48) !== NoContext) throw ReactError(Error("Should not already be working."));
    if (root$jscomp$0.firstPendingTime < expirationTime) return null;
    if (isSync && root$jscomp$0.finishedExpirationTime === expirationTime) return commitRoot.bind(null, root$jscomp$0);
    flushPassiveEffects();
    if (root$jscomp$0 !== workInProgressRoot || expirationTime !== renderExpirationTime) prepareFreshStack(root$jscomp$0, expirationTime);else if (workInProgressRootExitStatus === RootSuspendedWithDelay) if (workInProgressRootHasPendingPing) prepareFreshStack(root$jscomp$0, expirationTime);else {
      var lastPendingTime = root$jscomp$0.lastPendingTime;
      if (lastPendingTime < expirationTime) return renderRoot.bind(null, root$jscomp$0, lastPendingTime);
    }

    if (null !== workInProgress) {
      lastPendingTime = executionContext;
      executionContext |= RenderContext;
      var prevDispatcher = ReactCurrentDispatcher.current;
      null === prevDispatcher && (prevDispatcher = ContextOnlyDispatcher);
      ReactCurrentDispatcher.current = ContextOnlyDispatcher;

      if (isSync) {
        if (1073741823 !== expirationTime) {
          var currentTime = requestCurrentTime();
          if (currentTime < expirationTime) return executionContext = lastPendingTime, resetContextDependencies(), ReactCurrentDispatcher.current = prevDispatcher, renderRoot.bind(null, root$jscomp$0, currentTime);
        }
      } else currentEventTime = 0;

      do {
        try {
          if (isSync) for (; null !== workInProgress;) {
            workInProgress = performUnitOfWork(workInProgress);
          } else for (; null !== workInProgress && !Scheduler_shouldYield();) {
            workInProgress = performUnitOfWork(workInProgress);
          }
          break;
        } catch (thrownValue) {
          resetContextDependencies();
          resetHooks();
          currentTime = workInProgress;
          if (null === currentTime || null === currentTime.return) throw prepareFreshStack(root$jscomp$0, expirationTime), executionContext = lastPendingTime, thrownValue;

          a: {
            var root = root$jscomp$0,
                returnFiber = currentTime.return,
                sourceFiber = currentTime,
                value = thrownValue,
                renderExpirationTime$jscomp$0 = renderExpirationTime;
            sourceFiber.effectTag |= 1024;
            sourceFiber.firstEffect = sourceFiber.lastEffect = null;

            if (null !== value && "object" === typeof value && "function" === typeof value.then) {
              var thenable = value,
                  hasInvisibleParentBoundary = 0 !== (suspenseStackCursor.current & InvisibleParentSuspenseContext);
              value = returnFiber;

              do {
                var JSCompiler_temp;
                if (JSCompiler_temp = 13 === value.tag) null !== value.memoizedState ? JSCompiler_temp = false : (JSCompiler_temp = value.memoizedProps, JSCompiler_temp = undefined === JSCompiler_temp.fallback ? false : true !== JSCompiler_temp.unstable_avoidThisFallback ? true : hasInvisibleParentBoundary ? false : true);

                if (JSCompiler_temp) {
                  returnFiber = value.updateQueue;
                  null === returnFiber ? (returnFiber = new Set(), returnFiber.add(thenable), value.updateQueue = returnFiber) : returnFiber.add(thenable);

                  if (0 === (value.mode & 2)) {
                    value.effectTag |= 64;
                    sourceFiber.effectTag &= -1957;
                    1 === sourceFiber.tag && (null === sourceFiber.alternate ? sourceFiber.tag = 17 : (renderExpirationTime$jscomp$0 = createUpdate(1073741823, null), renderExpirationTime$jscomp$0.tag = 2, enqueueUpdate(sourceFiber, renderExpirationTime$jscomp$0)));
                    sourceFiber.expirationTime = 1073741823;
                    break a;
                  }

                  sourceFiber = root;
                  root = renderExpirationTime$jscomp$0;
                  hasInvisibleParentBoundary = sourceFiber.pingCache;
                  null === hasInvisibleParentBoundary ? (hasInvisibleParentBoundary = sourceFiber.pingCache = new PossiblyWeakMap(), returnFiber = new Set(), hasInvisibleParentBoundary.set(thenable, returnFiber)) : (returnFiber = hasInvisibleParentBoundary.get(thenable), undefined === returnFiber && (returnFiber = new Set(), hasInvisibleParentBoundary.set(thenable, returnFiber)));
                  returnFiber.has(root) || (returnFiber.add(root), sourceFiber = pingSuspendedRoot.bind(null, sourceFiber, thenable, root), thenable.then(sourceFiber, sourceFiber));
                  value.effectTag |= 2048;
                  value.expirationTime = renderExpirationTime$jscomp$0;
                  break a;
                }

                value = value.return;
              } while (null !== value);

              value = Error((getComponentName(sourceFiber.type) || "A React component") + " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display." + getStackByFiberInDevAndProd(sourceFiber));
            }

            workInProgressRootExitStatus !== RootCompleted && (workInProgressRootExitStatus = RootErrored);
            value = createCapturedValue(value, sourceFiber);
            sourceFiber = returnFiber;

            do {
              switch (sourceFiber.tag) {
                case 3:
                  sourceFiber.effectTag |= 2048;
                  sourceFiber.expirationTime = renderExpirationTime$jscomp$0;
                  renderExpirationTime$jscomp$0 = createRootErrorUpdate(sourceFiber, value, renderExpirationTime$jscomp$0);
                  enqueueCapturedUpdate(sourceFiber, renderExpirationTime$jscomp$0);
                  break a;

                case 1:
                  if (thenable = value, root = sourceFiber.type, returnFiber = sourceFiber.stateNode, 0 === (sourceFiber.effectTag & 64) && ("function" === typeof root.getDerivedStateFromError || null !== returnFiber && "function" === typeof returnFiber.componentDidCatch && (null === legacyErrorBoundariesThatAlreadyFailed || !legacyErrorBoundariesThatAlreadyFailed.has(returnFiber)))) {
                    sourceFiber.effectTag |= 2048;
                    sourceFiber.expirationTime = renderExpirationTime$jscomp$0;
                    renderExpirationTime$jscomp$0 = createClassErrorUpdate(sourceFiber, thenable, renderExpirationTime$jscomp$0);
                    enqueueCapturedUpdate(sourceFiber, renderExpirationTime$jscomp$0);
                    break a;
                  }

              }

              sourceFiber = sourceFiber.return;
            } while (null !== sourceFiber);
          }

          workInProgress = completeUnitOfWork(currentTime);
        }
      } while (1);

      executionContext = lastPendingTime;
      resetContextDependencies();
      ReactCurrentDispatcher.current = prevDispatcher;
      if (null !== workInProgress) return renderRoot.bind(null, root$jscomp$0, expirationTime);
    }

    root$jscomp$0.finishedWork = root$jscomp$0.current.alternate;
    root$jscomp$0.finishedExpirationTime = expirationTime;
    if (resolveLocksOnRoot(root$jscomp$0, expirationTime)) return null;
    workInProgressRoot = null;

    switch (workInProgressRootExitStatus) {
      case RootIncomplete:
        throw ReactError(Error("Should have a work-in-progress."));

      case RootErrored:
        return lastPendingTime = root$jscomp$0.lastPendingTime, lastPendingTime < expirationTime ? renderRoot.bind(null, root$jscomp$0, lastPendingTime) : isSync ? commitRoot.bind(null, root$jscomp$0) : (prepareFreshStack(root$jscomp$0, expirationTime), scheduleSyncCallback(renderRoot.bind(null, root$jscomp$0, expirationTime)), null);

      case RootSuspended:
        if (1073741823 === workInProgressRootLatestProcessedExpirationTime && !isSync && (isSync = globalMostRecentFallbackTime + FALLBACK_THROTTLE_MS - now(), 10 < isSync)) {
          if (workInProgressRootHasPendingPing) return prepareFreshStack(root$jscomp$0, expirationTime), renderRoot.bind(null, root$jscomp$0, expirationTime);
          lastPendingTime = root$jscomp$0.lastPendingTime;
          if (lastPendingTime < expirationTime) return renderRoot.bind(null, root$jscomp$0, lastPendingTime);
          root$jscomp$0.timeoutHandle = scheduleTimeout(commitRoot.bind(null, root$jscomp$0), isSync);
          return null;
        }

        return commitRoot.bind(null, root$jscomp$0);

      case RootSuspendedWithDelay:
        if (!isSync) {
          if (workInProgressRootHasPendingPing) return prepareFreshStack(root$jscomp$0, expirationTime), renderRoot.bind(null, root$jscomp$0, expirationTime);
          isSync = root$jscomp$0.lastPendingTime;
          if (isSync < expirationTime) return renderRoot.bind(null, root$jscomp$0, isSync);
          1073741823 !== workInProgressRootLatestSuspenseTimeout ? isSync = 10 * (1073741821 - workInProgressRootLatestSuspenseTimeout) - now() : 1073741823 === workInProgressRootLatestProcessedExpirationTime ? isSync = 0 : (isSync = 10 * (1073741821 - workInProgressRootLatestProcessedExpirationTime) - 5e3, lastPendingTime = now(), expirationTime = 10 * (1073741821 - expirationTime) - lastPendingTime, isSync = lastPendingTime - isSync, 0 > isSync && (isSync = 0), isSync = (120 > isSync ? 120 : 480 > isSync ? 480 : 1080 > isSync ? 1080 : 1920 > isSync ? 1920 : 3e3 > isSync ? 3e3 : 4320 > isSync ? 4320 : 1960 * ceil(isSync / 1960)) - isSync, expirationTime < isSync && (isSync = expirationTime));
          if (10 < isSync) return root$jscomp$0.timeoutHandle = scheduleTimeout(commitRoot.bind(null, root$jscomp$0), isSync), null;
        }

        return commitRoot.bind(null, root$jscomp$0);

      case RootCompleted:
        return !isSync && 1073741823 !== workInProgressRootLatestProcessedExpirationTime && null !== workInProgressRootCanSuspendUsingConfig && (lastPendingTime = workInProgressRootLatestProcessedExpirationTime, prevDispatcher = workInProgressRootCanSuspendUsingConfig, expirationTime = prevDispatcher.busyMinDurationMs | 0, 0 >= expirationTime ? expirationTime = 0 : (isSync = prevDispatcher.busyDelayMs | 0, lastPendingTime = now() - (10 * (1073741821 - lastPendingTime) - (prevDispatcher.timeoutMs | 0 || 5e3)), expirationTime = lastPendingTime <= isSync ? 0 : isSync + expirationTime - lastPendingTime), 10 < expirationTime) ? (root$jscomp$0.timeoutHandle = scheduleTimeout(commitRoot.bind(null, root$jscomp$0), expirationTime), null) : commitRoot.bind(null, root$jscomp$0);

      default:
        throw ReactError(Error("Unknown root exit status."));
    }
  }

  function markRenderEventTimeAndConfig(expirationTime, suspenseConfig) {
    expirationTime < workInProgressRootLatestProcessedExpirationTime && 1 < expirationTime && (workInProgressRootLatestProcessedExpirationTime = expirationTime);
    null !== suspenseConfig && expirationTime < workInProgressRootLatestSuspenseTimeout && 1 < expirationTime && (workInProgressRootLatestSuspenseTimeout = expirationTime, workInProgressRootCanSuspendUsingConfig = suspenseConfig);
  }

  function performUnitOfWork(unitOfWork) {
    var next = beginWork$$1(unitOfWork.alternate, unitOfWork, renderExpirationTime);
    unitOfWork.memoizedProps = unitOfWork.pendingProps;
    null === next && (next = completeUnitOfWork(unitOfWork));
    ReactCurrentOwner$2.current = null;
    return next;
  }

  function completeUnitOfWork(unitOfWork) {
    workInProgress = unitOfWork;

    do {
      var current$$1 = workInProgress.alternate;
      unitOfWork = workInProgress.return;

      if (0 === (workInProgress.effectTag & 1024)) {
        a: {
          var current = current$$1;
          current$$1 = workInProgress;
          var renderExpirationTime$jscomp$0 = renderExpirationTime,
              newProps = current$$1.pendingProps;

          switch (current$$1.tag) {
            case 2:
              break;

            case 16:
              break;

            case 15:
            case 0:
              break;

            case 1:
              isContextProvider(current$$1.type) && popContext(current$$1);
              break;

            case 3:
              popHostContainer(current$$1);
              popTopLevelContextObject(current$$1);
              renderExpirationTime$jscomp$0 = current$$1.stateNode;
              renderExpirationTime$jscomp$0.pendingContext && (renderExpirationTime$jscomp$0.context = renderExpirationTime$jscomp$0.pendingContext, renderExpirationTime$jscomp$0.pendingContext = null);
              if (null === current || null === current.child) current$$1.effectTag &= -3;
              updateHostContainer(current$$1);
              break;

            case 5:
              popHostContext(current$$1);
              renderExpirationTime$jscomp$0 = requiredContext(rootInstanceStackCursor.current);
              var type = current$$1.type;
              if (null !== current && null != current$$1.stateNode) updateHostComponent$1(current, current$$1, type, newProps, renderExpirationTime$jscomp$0), current.ref !== current$$1.ref && (current$$1.effectTag |= 128);else if (newProps) {
                requiredContext(contextStackCursor$1.current);
                current = newProps;
                var rootContainerInstance = renderExpirationTime$jscomp$0;
                renderExpirationTime$jscomp$0 = current$$1;
                newProps = nextReactTag;
                nextReactTag += 2;
                type = getViewConfigForType(type);
                var updatePayload = diffProperties(null, emptyObject, current, type.validAttributes);
                rootContainerInstance = createNode(newProps, type.uiViewClassName, rootContainerInstance, updatePayload, renderExpirationTime$jscomp$0);
                current = new ReactFabricHostComponent(newProps, type, current, renderExpirationTime$jscomp$0);
                current = {
                  node: rootContainerInstance,
                  canonical: current
                };

                _appendAllChildren(current, current$$1, false, false);

                current$$1.stateNode = current;
                null !== current$$1.ref && (current$$1.effectTag |= 128);
              } else if (null === current$$1.stateNode) throw ReactError(Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue."));
              break;

            case 6:
              if (current && null != current$$1.stateNode) updateHostText$1(current, current$$1, current.memoizedProps, newProps);else {
                if ("string" !== typeof newProps && null === current$$1.stateNode) throw ReactError(Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue."));
                current = requiredContext(rootInstanceStackCursor.current);
                renderExpirationTime$jscomp$0 = requiredContext(contextStackCursor$1.current);
                current$$1.stateNode = createTextInstance(newProps, current, renderExpirationTime$jscomp$0, current$$1);
              }
              break;

            case 11:
              break;

            case 13:
              pop(suspenseStackCursor, current$$1);
              newProps = current$$1.memoizedState;

              if (0 !== (current$$1.effectTag & 64)) {
                current$$1.expirationTime = renderExpirationTime$jscomp$0;
                break a;
              }

              renderExpirationTime$jscomp$0 = null !== newProps;
              newProps = false;
              null !== current && (type = current.memoizedState, newProps = null !== type, renderExpirationTime$jscomp$0 || null === type || (type = current.child.sibling, null !== type && (rootContainerInstance = current$$1.firstEffect, null !== rootContainerInstance ? (current$$1.firstEffect = type, type.nextEffect = rootContainerInstance) : (current$$1.firstEffect = current$$1.lastEffect = type, type.nextEffect = null), type.effectTag = 8)));
              if (renderExpirationTime$jscomp$0 && !newProps && 0 !== (current$$1.mode & 2)) if (null === current && true !== current$$1.memoizedProps.unstable_avoidThisFallback || 0 !== (suspenseStackCursor.current & InvisibleParentSuspenseContext)) workInProgressRootExitStatus === RootIncomplete && (workInProgressRootExitStatus = RootSuspended);else if (workInProgressRootExitStatus === RootIncomplete || workInProgressRootExitStatus === RootSuspended) workInProgressRootExitStatus = RootSuspendedWithDelay;
              renderExpirationTime$jscomp$0 && (current$$1.effectTag |= 4);
              break;

            case 7:
              break;

            case 8:
              break;

            case 12:
              break;

            case 4:
              popHostContainer(current$$1);
              updateHostContainer(current$$1);
              break;

            case 10:
              popProvider(current$$1);
              break;

            case 9:
              break;

            case 14:
              break;

            case 17:
              isContextProvider(current$$1.type) && popContext(current$$1);
              break;

            case 18:
              break;

            case 19:
              pop(suspenseStackCursor, current$$1);
              newProps = current$$1.memoizedState;
              if (null === newProps) break;
              type = 0 !== (current$$1.effectTag & 64);
              rootContainerInstance = newProps.rendering;
              if (null === rootContainerInstance) {
                if (type) cutOffTailIfNeeded(newProps, false);else {
                  if (workInProgressRootExitStatus !== RootIncomplete || null !== current && 0 !== (current.effectTag & 64)) for (current = current$$1.child; null !== current;) {
                    rootContainerInstance = findFirstSuspended(current);

                    if (null !== rootContainerInstance) {
                      current$$1.effectTag |= 64;
                      cutOffTailIfNeeded(newProps, false);
                      current = rootContainerInstance.updateQueue;
                      null !== current && (current$$1.updateQueue = current, current$$1.effectTag |= 4);
                      current$$1.firstEffect = current$$1.lastEffect = null;
                      current = renderExpirationTime$jscomp$0;

                      for (renderExpirationTime$jscomp$0 = current$$1.child; null !== renderExpirationTime$jscomp$0;) {
                        newProps = renderExpirationTime$jscomp$0, type = current, newProps.effectTag &= 2, newProps.nextEffect = null, newProps.firstEffect = null, newProps.lastEffect = null, rootContainerInstance = newProps.alternate, null === rootContainerInstance ? (newProps.childExpirationTime = 0, newProps.expirationTime = type, newProps.child = null, newProps.memoizedProps = null, newProps.memoizedState = null, newProps.updateQueue = null, newProps.dependencies = null) : (newProps.childExpirationTime = rootContainerInstance.childExpirationTime, newProps.expirationTime = rootContainerInstance.expirationTime, newProps.child = rootContainerInstance.child, newProps.memoizedProps = rootContainerInstance.memoizedProps, newProps.memoizedState = rootContainerInstance.memoizedState, newProps.updateQueue = rootContainerInstance.updateQueue, type = rootContainerInstance.dependencies, newProps.dependencies = null === type ? null : {
                          expirationTime: type.expirationTime,
                          firstContext: type.firstContext,
                          responders: type.responders
                        }), renderExpirationTime$jscomp$0 = renderExpirationTime$jscomp$0.sibling;
                      }

                      push(suspenseStackCursor, suspenseStackCursor.current & SubtreeSuspenseContextMask | ForceSuspenseFallback, current$$1);
                      current$$1 = current$$1.child;
                      break a;
                    }

                    current = current.sibling;
                  }
                }
              } else {
                if (!type) if (current = findFirstSuspended(rootContainerInstance), null !== current) {
                  if (current$$1.effectTag |= 64, type = true, cutOffTailIfNeeded(newProps, true), null === newProps.tail && "hidden" === newProps.tailMode) {
                    current = current.updateQueue;
                    null !== current && (current$$1.updateQueue = current, current$$1.effectTag |= 4);
                    current$$1 = current$$1.lastEffect = newProps.lastEffect;
                    null !== current$$1 && (current$$1.nextEffect = null);
                    break;
                  }
                } else now() > newProps.tailExpiration && 1 < renderExpirationTime$jscomp$0 && (current$$1.effectTag |= 64, type = true, cutOffTailIfNeeded(newProps, false), current$$1.expirationTime = current$$1.childExpirationTime = renderExpirationTime$jscomp$0 - 1);
                newProps.isBackwards ? (rootContainerInstance.sibling = current$$1.child, current$$1.child = rootContainerInstance) : (current = newProps.last, null !== current ? current.sibling = rootContainerInstance : current$$1.child = rootContainerInstance, newProps.last = rootContainerInstance);
              }

              if (null !== newProps.tail) {
                0 === newProps.tailExpiration && (newProps.tailExpiration = now() + 500);
                current = newProps.tail;
                newProps.rendering = current;
                newProps.tail = current.sibling;
                newProps.lastEffect = current$$1.lastEffect;
                current.sibling = null;
                renderExpirationTime$jscomp$0 = suspenseStackCursor.current;
                renderExpirationTime$jscomp$0 = type ? renderExpirationTime$jscomp$0 & SubtreeSuspenseContextMask | ForceSuspenseFallback : renderExpirationTime$jscomp$0 & SubtreeSuspenseContextMask;
                push(suspenseStackCursor, renderExpirationTime$jscomp$0, current$$1);
                current$$1 = current;
                break a;
              }

              break;

            case 20:
              break;

            default:
              throw ReactError(Error("Unknown unit of work tag. This error is likely caused by a bug in React. Please file an issue."));
          }

          current$$1 = null;
        }

        current = workInProgress;

        if (1 === renderExpirationTime || 1 !== current.childExpirationTime) {
          renderExpirationTime$jscomp$0 = 0;

          for (newProps = current.child; null !== newProps;) {
            type = newProps.expirationTime, rootContainerInstance = newProps.childExpirationTime, type > renderExpirationTime$jscomp$0 && (renderExpirationTime$jscomp$0 = type), rootContainerInstance > renderExpirationTime$jscomp$0 && (renderExpirationTime$jscomp$0 = rootContainerInstance), newProps = newProps.sibling;
          }

          current.childExpirationTime = renderExpirationTime$jscomp$0;
        }

        if (null !== current$$1) return current$$1;
        null !== unitOfWork && 0 === (unitOfWork.effectTag & 1024) && (null === unitOfWork.firstEffect && (unitOfWork.firstEffect = workInProgress.firstEffect), null !== workInProgress.lastEffect && (null !== unitOfWork.lastEffect && (unitOfWork.lastEffect.nextEffect = workInProgress.firstEffect), unitOfWork.lastEffect = workInProgress.lastEffect), 1 < workInProgress.effectTag && (null !== unitOfWork.lastEffect ? unitOfWork.lastEffect.nextEffect = workInProgress : unitOfWork.firstEffect = workInProgress, unitOfWork.lastEffect = workInProgress));
      } else {
        current$$1 = unwindWork(workInProgress, renderExpirationTime);
        if (null !== current$$1) return current$$1.effectTag &= 1023, current$$1;
        null !== unitOfWork && (unitOfWork.firstEffect = unitOfWork.lastEffect = null, unitOfWork.effectTag |= 1024);
      }

      current$$1 = workInProgress.sibling;
      if (null !== current$$1) return current$$1;
      workInProgress = unitOfWork;
    } while (null !== workInProgress);

    workInProgressRootExitStatus === RootIncomplete && (workInProgressRootExitStatus = RootCompleted);
    return null;
  }

  function commitRoot(root) {
    var renderPriorityLevel = getCurrentPriorityLevel();
    runWithPriority$1(99, commitRootImpl.bind(null, root, renderPriorityLevel));
    null !== rootWithPendingPassiveEffects && scheduleCallback(97, function () {
      flushPassiveEffects();
      return null;
    });
    return null;
  }

  function commitRootImpl(root, renderPriorityLevel) {
    flushPassiveEffects();
    if ((executionContext & 48) !== NoContext) throw ReactError(Error("Should not already be working."));
    var finishedWork = root.finishedWork,
        expirationTime = root.finishedExpirationTime;
    if (null === finishedWork) return null;
    root.finishedWork = null;
    root.finishedExpirationTime = 0;
    if (finishedWork === root.current) throw ReactError(Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue."));
    root.callbackNode = null;
    root.callbackExpirationTime = 0;
    var updateExpirationTimeBeforeCommit = finishedWork.expirationTime,
        childExpirationTimeBeforeCommit = finishedWork.childExpirationTime;
    updateExpirationTimeBeforeCommit = childExpirationTimeBeforeCommit > updateExpirationTimeBeforeCommit ? childExpirationTimeBeforeCommit : updateExpirationTimeBeforeCommit;
    root.firstPendingTime = updateExpirationTimeBeforeCommit;
    updateExpirationTimeBeforeCommit < root.lastPendingTime && (root.lastPendingTime = updateExpirationTimeBeforeCommit);
    root === workInProgressRoot && (workInProgress = workInProgressRoot = null, renderExpirationTime = 0);
    1 < finishedWork.effectTag ? null !== finishedWork.lastEffect ? (finishedWork.lastEffect.nextEffect = finishedWork, updateExpirationTimeBeforeCommit = finishedWork.firstEffect) : updateExpirationTimeBeforeCommit = finishedWork : updateExpirationTimeBeforeCommit = finishedWork.firstEffect;

    if (null !== updateExpirationTimeBeforeCommit) {
      childExpirationTimeBeforeCommit = executionContext;
      executionContext |= CommitContext;
      ReactCurrentOwner$2.current = null;
      nextEffect = updateExpirationTimeBeforeCommit;

      do {
        try {
          for (; null !== nextEffect;) {
            if (0 !== (nextEffect.effectTag & 256)) {
              var current$$1 = nextEffect.alternate,
                  finishedWork$jscomp$0 = nextEffect;

              switch (finishedWork$jscomp$0.tag) {
                case 0:
                case 11:
                case 15:
                  commitHookEffectList(UnmountSnapshot, NoEffect$1, finishedWork$jscomp$0);
                  break;

                case 1:
                  if (finishedWork$jscomp$0.effectTag & 256 && null !== current$$1) {
                    var prevProps = current$$1.memoizedProps,
                        prevState = current$$1.memoizedState,
                        instance = finishedWork$jscomp$0.stateNode,
                        snapshot = instance.getSnapshotBeforeUpdate(finishedWork$jscomp$0.elementType === finishedWork$jscomp$0.type ? prevProps : resolveDefaultProps(finishedWork$jscomp$0.type, prevProps), prevState);
                    instance.__reactInternalSnapshotBeforeUpdate = snapshot;
                  }

                  break;

                case 3:
                case 5:
                case 6:
                case 4:
                case 17:
                  break;

                default:
                  throw ReactError(Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue."));
              }
            }

            nextEffect = nextEffect.nextEffect;
          }
        } catch (error) {
          if (null === nextEffect) throw ReactError(Error("Should be working on an effect."));
          captureCommitPhaseError(nextEffect, error);
          nextEffect = nextEffect.nextEffect;
        }
      } while (null !== nextEffect);

      nextEffect = updateExpirationTimeBeforeCommit;

      do {
        try {
          for (current$$1 = renderPriorityLevel; null !== nextEffect;) {
            var effectTag = nextEffect.effectTag;

            if (effectTag & 128) {
              var current$$1$jscomp$0 = nextEffect.alternate;

              if (null !== current$$1$jscomp$0) {
                var currentRef = current$$1$jscomp$0.ref;
                null !== currentRef && ("function" === typeof currentRef ? currentRef(null) : currentRef.current = null);
              }
            }

            switch (effectTag & 14) {
              case 2:
                nextEffect.effectTag &= -3;
                break;

              case 6:
                nextEffect.effectTag &= -3;
                commitWork(nextEffect.alternate, nextEffect);
                break;

              case 4:
                commitWork(nextEffect.alternate, nextEffect);
                break;

              case 8:
                prevProps = nextEffect;

                a: for (prevState = prevProps, instance = current$$1, snapshot = prevState;;) {
                  if (commitUnmount(snapshot, instance), null !== snapshot.child) snapshot.child.return = snapshot, snapshot = snapshot.child;else {
                    if (snapshot === prevState) break;

                    for (; null === snapshot.sibling;) {
                      if (null === snapshot.return || snapshot.return === prevState) break a;
                      snapshot = snapshot.return;
                    }

                    snapshot.sibling.return = snapshot.return;
                    snapshot = snapshot.sibling;
                  }
                }

                detachFiber(prevProps);
            }

            nextEffect = nextEffect.nextEffect;
          }
        } catch (error) {
          if (null === nextEffect) throw ReactError(Error("Should be working on an effect."));
          captureCommitPhaseError(nextEffect, error);
          nextEffect = nextEffect.nextEffect;
        }
      } while (null !== nextEffect);

      root.current = finishedWork;
      nextEffect = updateExpirationTimeBeforeCommit;

      do {
        try {
          for (effectTag = expirationTime; null !== nextEffect;) {
            var effectTag$jscomp$0 = nextEffect.effectTag;

            if (effectTag$jscomp$0 & 36) {
              var current$$1$jscomp$1 = nextEffect.alternate;
              current$$1$jscomp$0 = nextEffect;
              currentRef = effectTag;

              switch (current$$1$jscomp$0.tag) {
                case 0:
                case 11:
                case 15:
                  commitHookEffectList(UnmountLayout, MountLayout, current$$1$jscomp$0);
                  break;

                case 1:
                  var instance$jscomp$0 = current$$1$jscomp$0.stateNode;
                  if (current$$1$jscomp$0.effectTag & 4) if (null === current$$1$jscomp$1) instance$jscomp$0.componentDidMount();else {
                    var prevProps$jscomp$0 = current$$1$jscomp$0.elementType === current$$1$jscomp$0.type ? current$$1$jscomp$1.memoizedProps : resolveDefaultProps(current$$1$jscomp$0.type, current$$1$jscomp$1.memoizedProps);
                    instance$jscomp$0.componentDidUpdate(prevProps$jscomp$0, current$$1$jscomp$1.memoizedState, instance$jscomp$0.__reactInternalSnapshotBeforeUpdate);
                  }
                  var updateQueue = current$$1$jscomp$0.updateQueue;
                  null !== updateQueue && commitUpdateQueue(current$$1$jscomp$0, updateQueue, instance$jscomp$0, currentRef);
                  break;

                case 3:
                  var _updateQueue = current$$1$jscomp$0.updateQueue;

                  if (null !== _updateQueue) {
                    current$$1 = null;
                    if (null !== current$$1$jscomp$0.child) switch (current$$1$jscomp$0.child.tag) {
                      case 5:
                        current$$1 = current$$1$jscomp$0.child.stateNode.canonical;
                        break;

                      case 1:
                        current$$1 = current$$1$jscomp$0.child.stateNode;
                    }
                    commitUpdateQueue(current$$1$jscomp$0, _updateQueue, current$$1, currentRef);
                  }

                  break;

                case 5:
                  if (null === current$$1$jscomp$1 && current$$1$jscomp$0.effectTag & 4) throw ReactError(Error("The current renderer does not support mutation. This error is likely caused by a bug in React. Please file an issue."));
                  break;

                case 6:
                  break;

                case 4:
                  break;

                case 12:
                  break;

                case 13:
                case 19:
                case 17:
                case 20:
                  break;

                default:
                  throw ReactError(Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue."));
              }
            }

            if (effectTag$jscomp$0 & 128) {
              var ref = nextEffect.ref;

              if (null !== ref) {
                var instance$jscomp$1 = nextEffect.stateNode;

                switch (nextEffect.tag) {
                  case 5:
                    var instanceToUse = instance$jscomp$1.canonical;
                    break;

                  default:
                    instanceToUse = instance$jscomp$1;
                }

                "function" === typeof ref ? ref(instanceToUse) : ref.current = instanceToUse;
              }
            }

            effectTag$jscomp$0 & 512 && (rootDoesHavePassiveEffects = true);
            nextEffect = nextEffect.nextEffect;
          }
        } catch (error) {
          if (null === nextEffect) throw ReactError(Error("Should be working on an effect."));
          captureCommitPhaseError(nextEffect, error);
          nextEffect = nextEffect.nextEffect;
        }
      } while (null !== nextEffect);

      nextEffect = null;
      requestPaint();
      executionContext = childExpirationTimeBeforeCommit;
    } else root.current = finishedWork;

    if (rootDoesHavePassiveEffects) rootDoesHavePassiveEffects = false, rootWithPendingPassiveEffects = root, pendingPassiveEffectsExpirationTime = expirationTime, pendingPassiveEffectsRenderPriority = renderPriorityLevel;else for (nextEffect = updateExpirationTimeBeforeCommit; null !== nextEffect;) {
      renderPriorityLevel = nextEffect.nextEffect, nextEffect.nextEffect = null, nextEffect = renderPriorityLevel;
    }
    renderPriorityLevel = root.firstPendingTime;
    0 !== renderPriorityLevel ? (effectTag$jscomp$0 = requestCurrentTime(), effectTag$jscomp$0 = inferPriorityFromExpirationTime(effectTag$jscomp$0, renderPriorityLevel), scheduleCallbackForRoot(root, effectTag$jscomp$0, renderPriorityLevel)) : legacyErrorBoundariesThatAlreadyFailed = null;
    "function" === typeof onCommitFiberRoot && onCommitFiberRoot(finishedWork.stateNode, expirationTime);
    1073741823 === renderPriorityLevel ? root === rootWithNestedUpdates ? nestedUpdateCount++ : (nestedUpdateCount = 0, rootWithNestedUpdates = root) : nestedUpdateCount = 0;
    if (hasUncaughtError) throw hasUncaughtError = false, root = firstUncaughtError, firstUncaughtError = null, root;
    if ((executionContext & LegacyUnbatchedContext) !== NoContext) return null;
    flushSyncCallbackQueue();
    return null;
  }

  function flushPassiveEffects() {
    if (null === rootWithPendingPassiveEffects) return false;
    var root = rootWithPendingPassiveEffects,
        expirationTime = pendingPassiveEffectsExpirationTime,
        renderPriorityLevel = pendingPassiveEffectsRenderPriority;
    rootWithPendingPassiveEffects = null;
    pendingPassiveEffectsExpirationTime = 0;
    pendingPassiveEffectsRenderPriority = 90;
    return runWithPriority$1(97 < renderPriorityLevel ? 97 : renderPriorityLevel, flushPassiveEffectsImpl.bind(null, root, expirationTime));
  }

  function flushPassiveEffectsImpl(root) {
    if ((executionContext & 48) !== NoContext) throw ReactError(Error("Cannot flush passive effects while already rendering."));
    var prevExecutionContext = executionContext;
    executionContext |= CommitContext;

    for (root = root.current.firstEffect; null !== root;) {
      try {
        var finishedWork = root;
        if (0 !== (finishedWork.effectTag & 512)) switch (finishedWork.tag) {
          case 0:
          case 11:
          case 15:
            commitHookEffectList(UnmountPassive, NoEffect$1, finishedWork), commitHookEffectList(NoEffect$1, MountPassive, finishedWork);
        }
      } catch (error) {
        if (null === root) throw ReactError(Error("Should be working on an effect."));
        captureCommitPhaseError(root, error);
      }

      finishedWork = root.nextEffect;
      root.nextEffect = null;
      root = finishedWork;
    }

    executionContext = prevExecutionContext;
    flushSyncCallbackQueue();
    return true;
  }

  function captureCommitPhaseErrorOnRoot(rootFiber, sourceFiber, error) {
    sourceFiber = createCapturedValue(error, sourceFiber);
    sourceFiber = createRootErrorUpdate(rootFiber, sourceFiber, 1073741823);
    enqueueUpdate(rootFiber, sourceFiber);
    rootFiber = markUpdateTimeFromFiberToRoot(rootFiber, 1073741823);
    null !== rootFiber && scheduleCallbackForRoot(rootFiber, 99, 1073741823);
  }

  function captureCommitPhaseError(sourceFiber, error) {
    if (3 === sourceFiber.tag) captureCommitPhaseErrorOnRoot(sourceFiber, sourceFiber, error);else for (var fiber = sourceFiber.return; null !== fiber;) {
      if (3 === fiber.tag) {
        captureCommitPhaseErrorOnRoot(fiber, sourceFiber, error);
        break;
      } else if (1 === fiber.tag) {
        var instance = fiber.stateNode;

        if ("function" === typeof fiber.type.getDerivedStateFromError || "function" === typeof instance.componentDidCatch && (null === legacyErrorBoundariesThatAlreadyFailed || !legacyErrorBoundariesThatAlreadyFailed.has(instance))) {
          sourceFiber = createCapturedValue(error, sourceFiber);
          sourceFiber = createClassErrorUpdate(fiber, sourceFiber, 1073741823);
          enqueueUpdate(fiber, sourceFiber);
          fiber = markUpdateTimeFromFiberToRoot(fiber, 1073741823);
          null !== fiber && scheduleCallbackForRoot(fiber, 99, 1073741823);
          break;
        }
      }

      fiber = fiber.return;
    }
  }

  function pingSuspendedRoot(root, thenable, suspendedTime) {
    var pingCache = root.pingCache;
    null !== pingCache && pingCache.delete(thenable);
    workInProgressRoot === root && renderExpirationTime === suspendedTime ? workInProgressRootExitStatus === RootSuspendedWithDelay || workInProgressRootExitStatus === RootSuspended && 1073741823 === workInProgressRootLatestProcessedExpirationTime && now() - globalMostRecentFallbackTime < FALLBACK_THROTTLE_MS ? prepareFreshStack(root, renderExpirationTime) : workInProgressRootHasPendingPing = true : root.lastPendingTime < suspendedTime || (thenable = root.pingTime, 0 !== thenable && thenable < suspendedTime || (root.pingTime = suspendedTime, root.finishedExpirationTime === suspendedTime && (root.finishedExpirationTime = 0, root.finishedWork = null), thenable = requestCurrentTime(), thenable = inferPriorityFromExpirationTime(thenable, suspendedTime), scheduleCallbackForRoot(root, thenable, suspendedTime)));
  }

  function resolveRetryThenable(boundaryFiber, thenable) {
    var retryCache = boundaryFiber.stateNode;
    null !== retryCache && retryCache.delete(thenable);
    retryCache = requestCurrentTime();
    thenable = computeExpirationForFiber(retryCache, boundaryFiber, null);
    retryCache = inferPriorityFromExpirationTime(retryCache, thenable);
    boundaryFiber = markUpdateTimeFromFiberToRoot(boundaryFiber, thenable);
    null !== boundaryFiber && scheduleCallbackForRoot(boundaryFiber, retryCache, thenable);
  }

  var beginWork$$1 = undefined;

  beginWork$$1 = function beginWork$$1(current$$1, workInProgress, renderExpirationTime) {
    var updateExpirationTime = workInProgress.expirationTime;
    if (null !== current$$1) {
      if (current$$1.memoizedProps !== workInProgress.pendingProps || didPerformWorkStackCursor.current) didReceiveUpdate = true;else {
        if (updateExpirationTime < renderExpirationTime) {
          didReceiveUpdate = false;

          switch (workInProgress.tag) {
            case 3:
              pushHostRootContext(workInProgress);
              break;

            case 5:
              pushHostContext(workInProgress);
              break;

            case 1:
              isContextProvider(workInProgress.type) && pushContextProvider(workInProgress);
              break;

            case 4:
              pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
              break;

            case 10:
              pushProvider(workInProgress, workInProgress.memoizedProps.value);
              break;

            case 13:
              if (null !== workInProgress.memoizedState) {
                updateExpirationTime = workInProgress.child.childExpirationTime;
                if (0 !== updateExpirationTime && updateExpirationTime >= renderExpirationTime) return updateSuspenseComponent(current$$1, workInProgress, renderExpirationTime);
                push(suspenseStackCursor, suspenseStackCursor.current & SubtreeSuspenseContextMask, workInProgress);
                workInProgress = bailoutOnAlreadyFinishedWork(current$$1, workInProgress, renderExpirationTime);
                return null !== workInProgress ? workInProgress.sibling : null;
              }

              push(suspenseStackCursor, suspenseStackCursor.current & SubtreeSuspenseContextMask, workInProgress);
              break;

            case 19:
              updateExpirationTime = workInProgress.childExpirationTime >= renderExpirationTime;

              if (0 !== (current$$1.effectTag & 64)) {
                if (updateExpirationTime) return updateSuspenseListComponent(current$$1, workInProgress, renderExpirationTime);
                workInProgress.effectTag |= 64;
              }

              var renderState = workInProgress.memoizedState;
              null !== renderState && (renderState.rendering = null, renderState.tail = null);
              push(suspenseStackCursor, suspenseStackCursor.current, workInProgress);
              if (!updateExpirationTime) return null;
          }

          return bailoutOnAlreadyFinishedWork(current$$1, workInProgress, renderExpirationTime);
        }
      }
    } else didReceiveUpdate = false;
    workInProgress.expirationTime = 0;

    switch (workInProgress.tag) {
      case 2:
        updateExpirationTime = workInProgress.type;
        null !== current$$1 && (current$$1.alternate = null, workInProgress.alternate = null, workInProgress.effectTag |= 2);
        current$$1 = workInProgress.pendingProps;
        renderState = getMaskedContext(workInProgress, contextStackCursor.current);
        prepareToReadContext(workInProgress, renderExpirationTime);
        renderState = renderWithHooks(null, workInProgress, updateExpirationTime, current$$1, renderState, renderExpirationTime);
        workInProgress.effectTag |= 1;

        if ("object" === typeof renderState && null !== renderState && "function" === typeof renderState.render && undefined === renderState.$$typeof) {
          workInProgress.tag = 1;
          resetHooks();

          if (isContextProvider(updateExpirationTime)) {
            var hasContext = true;
            pushContextProvider(workInProgress);
          } else hasContext = false;

          workInProgress.memoizedState = null !== renderState.state && undefined !== renderState.state ? renderState.state : null;
          var getDerivedStateFromProps = updateExpirationTime.getDerivedStateFromProps;
          "function" === typeof getDerivedStateFromProps && applyDerivedStateFromProps(workInProgress, updateExpirationTime, getDerivedStateFromProps, current$$1);
          renderState.updater = classComponentUpdater;
          workInProgress.stateNode = renderState;
          renderState._reactInternalFiber = workInProgress;
          mountClassInstance(workInProgress, updateExpirationTime, current$$1, renderExpirationTime);
          workInProgress = finishClassComponent(null, workInProgress, updateExpirationTime, true, hasContext, renderExpirationTime);
        } else workInProgress.tag = 0, reconcileChildren(null, workInProgress, renderState, renderExpirationTime), workInProgress = workInProgress.child;

        return workInProgress;

      case 16:
        renderState = workInProgress.elementType;
        null !== current$$1 && (current$$1.alternate = null, workInProgress.alternate = null, workInProgress.effectTag |= 2);
        current$$1 = workInProgress.pendingProps;
        renderState = readLazyComponentType(renderState);
        workInProgress.type = renderState;
        hasContext = workInProgress.tag = resolveLazyComponentTag(renderState);
        current$$1 = resolveDefaultProps(renderState, current$$1);

        switch (hasContext) {
          case 0:
            workInProgress = updateFunctionComponent(null, workInProgress, renderState, current$$1, renderExpirationTime);
            break;

          case 1:
            workInProgress = updateClassComponent(null, workInProgress, renderState, current$$1, renderExpirationTime);
            break;

          case 11:
            workInProgress = updateForwardRef(null, workInProgress, renderState, current$$1, renderExpirationTime);
            break;

          case 14:
            workInProgress = updateMemoComponent(null, workInProgress, renderState, resolveDefaultProps(renderState.type, current$$1), updateExpirationTime, renderExpirationTime);
            break;

          default:
            throw ReactError(Error("Element type is invalid. Received a promise that resolves to: " + renderState + ". Lazy element type must resolve to a class or function."));
        }

        return workInProgress;

      case 0:
        return updateExpirationTime = workInProgress.type, renderState = workInProgress.pendingProps, renderState = workInProgress.elementType === updateExpirationTime ? renderState : resolveDefaultProps(updateExpirationTime, renderState), updateFunctionComponent(current$$1, workInProgress, updateExpirationTime, renderState, renderExpirationTime);

      case 1:
        return updateExpirationTime = workInProgress.type, renderState = workInProgress.pendingProps, renderState = workInProgress.elementType === updateExpirationTime ? renderState : resolveDefaultProps(updateExpirationTime, renderState), updateClassComponent(current$$1, workInProgress, updateExpirationTime, renderState, renderExpirationTime);

      case 3:
        pushHostRootContext(workInProgress);
        updateExpirationTime = workInProgress.updateQueue;
        if (null === updateExpirationTime) throw ReactError(Error("If the root does not have an updateQueue, we should have already bailed out. This error is likely caused by a bug in React. Please file an issue."));
        renderState = workInProgress.memoizedState;
        renderState = null !== renderState ? renderState.element : null;
        processUpdateQueue(workInProgress, updateExpirationTime, workInProgress.pendingProps, null, renderExpirationTime);
        updateExpirationTime = workInProgress.memoizedState.element;
        updateExpirationTime === renderState ? workInProgress = bailoutOnAlreadyFinishedWork(current$$1, workInProgress, renderExpirationTime) : (reconcileChildren(current$$1, workInProgress, updateExpirationTime, renderExpirationTime), workInProgress = workInProgress.child);
        return workInProgress;

      case 5:
        return pushHostContext(workInProgress), null === current$$1 && tryToClaimNextHydratableInstance(workInProgress), updateExpirationTime = workInProgress.pendingProps.children, markRef(current$$1, workInProgress), reconcileChildren(current$$1, workInProgress, updateExpirationTime, renderExpirationTime), workInProgress.child;

      case 6:
        return null === current$$1 && tryToClaimNextHydratableInstance(workInProgress), null;

      case 13:
        return updateSuspenseComponent(current$$1, workInProgress, renderExpirationTime);

      case 4:
        return pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo), updateExpirationTime = workInProgress.pendingProps, null === current$$1 ? workInProgress.child = reconcileChildFibers(workInProgress, null, updateExpirationTime, renderExpirationTime) : reconcileChildren(current$$1, workInProgress, updateExpirationTime, renderExpirationTime), workInProgress.child;

      case 11:
        return updateExpirationTime = workInProgress.type, renderState = workInProgress.pendingProps, renderState = workInProgress.elementType === updateExpirationTime ? renderState : resolveDefaultProps(updateExpirationTime, renderState), updateForwardRef(current$$1, workInProgress, updateExpirationTime, renderState, renderExpirationTime);

      case 7:
        return reconcileChildren(current$$1, workInProgress, workInProgress.pendingProps, renderExpirationTime), workInProgress.child;

      case 8:
        return reconcileChildren(current$$1, workInProgress, workInProgress.pendingProps.children, renderExpirationTime), workInProgress.child;

      case 12:
        return reconcileChildren(current$$1, workInProgress, workInProgress.pendingProps.children, renderExpirationTime), workInProgress.child;

      case 10:
        a: {
          updateExpirationTime = workInProgress.type._context;
          renderState = workInProgress.pendingProps;
          getDerivedStateFromProps = workInProgress.memoizedProps;
          hasContext = renderState.value;
          pushProvider(workInProgress, hasContext);

          if (null !== getDerivedStateFromProps) {
            var oldValue = getDerivedStateFromProps.value;
            hasContext = is(oldValue, hasContext) ? 0 : ("function" === typeof updateExpirationTime._calculateChangedBits ? updateExpirationTime._calculateChangedBits(oldValue, hasContext) : 1073741823) | 0;

            if (0 === hasContext) {
              if (getDerivedStateFromProps.children === renderState.children && !didPerformWorkStackCursor.current) {
                workInProgress = bailoutOnAlreadyFinishedWork(current$$1, workInProgress, renderExpirationTime);
                break a;
              }
            } else for (oldValue = workInProgress.child, null !== oldValue && (oldValue.return = workInProgress); null !== oldValue;) {
              var list = oldValue.dependencies;

              if (null !== list) {
                getDerivedStateFromProps = oldValue.child;

                for (var dependency = list.firstContext; null !== dependency;) {
                  if (dependency.context === updateExpirationTime && 0 !== (dependency.observedBits & hasContext)) {
                    1 === oldValue.tag && (dependency = createUpdate(renderExpirationTime, null), dependency.tag = 2, enqueueUpdate(oldValue, dependency));
                    oldValue.expirationTime < renderExpirationTime && (oldValue.expirationTime = renderExpirationTime);
                    dependency = oldValue.alternate;
                    null !== dependency && dependency.expirationTime < renderExpirationTime && (dependency.expirationTime = renderExpirationTime);
                    scheduleWorkOnParentPath(oldValue.return, renderExpirationTime);
                    list.expirationTime < renderExpirationTime && (list.expirationTime = renderExpirationTime);
                    break;
                  }

                  dependency = dependency.next;
                }
              } else getDerivedStateFromProps = 10 === oldValue.tag ? oldValue.type === workInProgress.type ? null : oldValue.child : oldValue.child;

              if (null !== getDerivedStateFromProps) getDerivedStateFromProps.return = oldValue;else for (getDerivedStateFromProps = oldValue; null !== getDerivedStateFromProps;) {
                if (getDerivedStateFromProps === workInProgress) {
                  getDerivedStateFromProps = null;
                  break;
                }

                oldValue = getDerivedStateFromProps.sibling;

                if (null !== oldValue) {
                  oldValue.return = getDerivedStateFromProps.return;
                  getDerivedStateFromProps = oldValue;
                  break;
                }

                getDerivedStateFromProps = getDerivedStateFromProps.return;
              }
              oldValue = getDerivedStateFromProps;
            }
          }

          reconcileChildren(current$$1, workInProgress, renderState.children, renderExpirationTime);
          workInProgress = workInProgress.child;
        }

        return workInProgress;

      case 9:
        return renderState = workInProgress.type, hasContext = workInProgress.pendingProps, updateExpirationTime = hasContext.children, prepareToReadContext(workInProgress, renderExpirationTime), renderState = readContext(renderState, hasContext.unstable_observedBits), updateExpirationTime = updateExpirationTime(renderState), workInProgress.effectTag |= 1, reconcileChildren(current$$1, workInProgress, updateExpirationTime, renderExpirationTime), workInProgress.child;

      case 14:
        return renderState = workInProgress.type, hasContext = resolveDefaultProps(renderState, workInProgress.pendingProps), hasContext = resolveDefaultProps(renderState.type, hasContext), updateMemoComponent(current$$1, workInProgress, renderState, hasContext, updateExpirationTime, renderExpirationTime);

      case 15:
        return updateSimpleMemoComponent(current$$1, workInProgress, workInProgress.type, workInProgress.pendingProps, updateExpirationTime, renderExpirationTime);

      case 17:
        return updateExpirationTime = workInProgress.type, renderState = workInProgress.pendingProps, renderState = workInProgress.elementType === updateExpirationTime ? renderState : resolveDefaultProps(updateExpirationTime, renderState), null !== current$$1 && (current$$1.alternate = null, workInProgress.alternate = null, workInProgress.effectTag |= 2), workInProgress.tag = 1, isContextProvider(updateExpirationTime) ? (current$$1 = true, pushContextProvider(workInProgress)) : current$$1 = false, prepareToReadContext(workInProgress, renderExpirationTime), constructClassInstance(workInProgress, updateExpirationTime, renderState, renderExpirationTime), mountClassInstance(workInProgress, updateExpirationTime, renderState, renderExpirationTime), finishClassComponent(null, workInProgress, updateExpirationTime, true, current$$1, renderExpirationTime);

      case 19:
        return updateSuspenseListComponent(current$$1, workInProgress, renderExpirationTime);
    }

    throw ReactError(Error("Unknown unit of work tag. This error is likely caused by a bug in React. Please file an issue."));
  };

  var onCommitFiberRoot = null,
      onCommitFiberUnmount = null;

  function injectInternals(internals) {
    if ("undefined" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) return false;
    var hook = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (hook.isDisabled || !hook.supportsFiber) return true;

    try {
      var rendererID = hook.inject(internals);

      onCommitFiberRoot = function onCommitFiberRoot(root) {
        try {
          hook.onCommitFiberRoot(rendererID, root, undefined, 64 === (root.current.effectTag & 64));
        } catch (err) {}
      };

      onCommitFiberUnmount = function onCommitFiberUnmount(fiber) {
        try {
          hook.onCommitFiberUnmount(rendererID, fiber);
        } catch (err) {}
      };
    } catch (err) {}

    return true;
  }

  function FiberNode(tag, pendingProps, key, mode) {
    this.tag = tag;
    this.key = key;
    this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
    this.index = 0;
    this.ref = null;
    this.pendingProps = pendingProps;
    this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
    this.mode = mode;
    this.effectTag = 0;
    this.lastEffect = this.firstEffect = this.nextEffect = null;
    this.childExpirationTime = this.expirationTime = 0;
    this.alternate = null;
  }

  function createFiber(tag, pendingProps, key, mode) {
    return new FiberNode(tag, pendingProps, key, mode);
  }

  function shouldConstruct(Component) {
    Component = Component.prototype;
    return !(!Component || !Component.isReactComponent);
  }

  function resolveLazyComponentTag(Component) {
    if ("function" === typeof Component) return shouldConstruct(Component) ? 1 : 0;

    if (undefined !== Component && null !== Component) {
      Component = Component.$$typeof;
      if (Component === REACT_FORWARD_REF_TYPE) return 11;
      if (Component === REACT_MEMO_TYPE) return 14;
    }

    return 2;
  }

  function createWorkInProgress(current, pendingProps) {
    var workInProgress = current.alternate;
    null === workInProgress ? (workInProgress = createFiber(current.tag, pendingProps, current.key, current.mode), workInProgress.elementType = current.elementType, workInProgress.type = current.type, workInProgress.stateNode = current.stateNode, workInProgress.alternate = current, current.alternate = workInProgress) : (workInProgress.pendingProps = pendingProps, workInProgress.effectTag = 0, workInProgress.nextEffect = null, workInProgress.firstEffect = null, workInProgress.lastEffect = null);
    workInProgress.childExpirationTime = current.childExpirationTime;
    workInProgress.expirationTime = current.expirationTime;
    workInProgress.child = current.child;
    workInProgress.memoizedProps = current.memoizedProps;
    workInProgress.memoizedState = current.memoizedState;
    workInProgress.updateQueue = current.updateQueue;
    pendingProps = current.dependencies;
    workInProgress.dependencies = null === pendingProps ? null : {
      expirationTime: pendingProps.expirationTime,
      firstContext: pendingProps.firstContext,
      responders: pendingProps.responders
    };
    workInProgress.sibling = current.sibling;
    workInProgress.index = current.index;
    workInProgress.ref = current.ref;
    return workInProgress;
  }

  function createFiberFromTypeAndProps(type, key, pendingProps, owner, mode, expirationTime) {
    var fiberTag = 2;
    owner = type;
    if ("function" === typeof type) shouldConstruct(type) && (fiberTag = 1);else if ("string" === typeof type) fiberTag = 5;else a: switch (type) {
      case REACT_FRAGMENT_TYPE:
        return createFiberFromFragment(pendingProps.children, mode, expirationTime, key);

      case REACT_CONCURRENT_MODE_TYPE:
        fiberTag = 8;
        mode |= 7;
        break;

      case REACT_STRICT_MODE_TYPE:
        fiberTag = 8;
        mode |= 1;
        break;

      case REACT_PROFILER_TYPE:
        return type = createFiber(12, pendingProps, key, mode | 8), type.elementType = REACT_PROFILER_TYPE, type.type = REACT_PROFILER_TYPE, type.expirationTime = expirationTime, type;

      case REACT_SUSPENSE_TYPE:
        return type = createFiber(13, pendingProps, key, mode), type.type = REACT_SUSPENSE_TYPE, type.elementType = REACT_SUSPENSE_TYPE, type.expirationTime = expirationTime, type;

      case REACT_SUSPENSE_LIST_TYPE:
        return type = createFiber(19, pendingProps, key, mode), type.elementType = REACT_SUSPENSE_LIST_TYPE, type.expirationTime = expirationTime, type;

      default:
        if ("object" === typeof type && null !== type) switch (type.$$typeof) {
          case REACT_PROVIDER_TYPE:
            fiberTag = 10;
            break a;

          case REACT_CONTEXT_TYPE:
            fiberTag = 9;
            break a;

          case REACT_FORWARD_REF_TYPE:
            fiberTag = 11;
            break a;

          case REACT_MEMO_TYPE:
            fiberTag = 14;
            break a;

          case REACT_LAZY_TYPE:
            fiberTag = 16;
            owner = null;
            break a;
        }
        throw ReactError(Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + (null == type ? type : typeof type) + "."));
    }
    key = createFiber(fiberTag, pendingProps, key, mode);
    key.elementType = type;
    key.type = owner;
    key.expirationTime = expirationTime;
    return key;
  }

  function createFiberFromFragment(elements, mode, expirationTime, key) {
    elements = createFiber(7, elements, key, mode);
    elements.expirationTime = expirationTime;
    return elements;
  }

  function createFiberFromText(content, mode, expirationTime) {
    content = createFiber(6, content, null, mode);
    content.expirationTime = expirationTime;
    return content;
  }

  function createFiberFromPortal(portal, mode, expirationTime) {
    mode = createFiber(4, null !== portal.children ? portal.children : [], portal.key, mode);
    mode.expirationTime = expirationTime;
    mode.stateNode = {
      containerInfo: portal.containerInfo,
      pendingChildren: null,
      implementation: portal.implementation
    };
    return mode;
  }

  function FiberRootNode(containerInfo, tag, hydrate) {
    this.tag = tag;
    this.current = null;
    this.containerInfo = containerInfo;
    this.pingCache = this.pendingChildren = null;
    this.finishedExpirationTime = 0;
    this.finishedWork = null;
    this.timeoutHandle = -1;
    this.pendingContext = this.context = null;
    this.hydrate = hydrate;
    this.callbackNode = this.firstBatch = null;
    this.pingTime = this.lastPendingTime = this.firstPendingTime = this.callbackExpirationTime = 0;
  }

  function findHostInstance(component) {
    var fiber = component._reactInternalFiber;

    if (undefined === fiber) {
      if ("function" === typeof component.render) throw ReactError(Error("Unable to find node on an unmounted component."));
      throw ReactError(Error("Argument appears to not be a ReactComponent. Keys: " + Object.keys(component)));
    }

    component = findCurrentHostFiber(fiber);
    return null === component ? null : component.stateNode;
  }

  function updateContainer(element, container, parentComponent, callback) {
    var current$$1 = container.current,
        currentTime = requestCurrentTime(),
        suspenseConfig = ReactCurrentBatchConfig.suspense;
    current$$1 = computeExpirationForFiber(currentTime, current$$1, suspenseConfig);
    currentTime = container.current;

    a: if (parentComponent) {
      parentComponent = parentComponent._reactInternalFiber;

      b: {
        if (2 !== isFiberMountedImpl(parentComponent) || 1 !== parentComponent.tag) throw ReactError(Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue."));
        var parentContext = parentComponent;

        do {
          switch (parentContext.tag) {
            case 3:
              parentContext = parentContext.stateNode.context;
              break b;

            case 1:
              if (isContextProvider(parentContext.type)) {
                parentContext = parentContext.stateNode.__reactInternalMemoizedMergedChildContext;
                break b;
              }

          }

          parentContext = parentContext.return;
        } while (null !== parentContext);

        throw ReactError(Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue."));
      }

      if (1 === parentComponent.tag) {
        var Component = parentComponent.type;

        if (isContextProvider(Component)) {
          parentComponent = processChildContext(parentComponent, Component, parentContext);
          break a;
        }
      }

      parentComponent = parentContext;
    } else parentComponent = emptyContextObject;

    null === container.context ? container.context = parentComponent : container.pendingContext = parentComponent;
    container = callback;
    suspenseConfig = createUpdate(current$$1, suspenseConfig);
    suspenseConfig.payload = {
      element: element
    };
    container = undefined === container ? null : container;
    null !== container && (suspenseConfig.callback = container);
    enqueueUpdate(currentTime, suspenseConfig);
    scheduleUpdateOnFiber(currentTime, current$$1);
    return current$$1;
  }

  function _createPortal(children, containerInfo, implementation) {
    var key = 3 < arguments.length && undefined !== arguments[3] ? arguments[3] : null;
    return {
      $$typeof: REACT_PORTAL_TYPE,
      key: null == key ? null : "" + key,
      children: children,
      containerInfo: containerInfo,
      implementation: implementation
    };
  }

  function _inherits$1(subClass, superClass) {
    if ("function" !== typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
  }

  var getInspectorDataForViewTag = undefined;

  getInspectorDataForViewTag = function getInspectorDataForViewTag() {
    throw ReactError(Error("getInspectorDataForViewTag() is not available in production"));
  };

  var fabricDispatchCommand = nativeFabricUIManager.dispatchCommand;

  function findNodeHandle(componentOrHandle) {
    if (null == componentOrHandle) return null;
    if ("number" === typeof componentOrHandle) return componentOrHandle;
    if (componentOrHandle._nativeTag) return componentOrHandle._nativeTag;
    if (componentOrHandle.canonical && componentOrHandle.canonical._nativeTag) return componentOrHandle.canonical._nativeTag;
    componentOrHandle = findHostInstance(componentOrHandle);
    return null == componentOrHandle ? componentOrHandle : componentOrHandle.canonical ? componentOrHandle.canonical._nativeTag : componentOrHandle._nativeTag;
  }

  batchedUpdatesImpl = function batchedUpdatesImpl(fn, a) {
    var prevExecutionContext = executionContext;
    executionContext |= 1;

    try {
      return fn(a);
    } finally {
      executionContext = prevExecutionContext, executionContext === NoContext && flushSyncCallbackQueue();
    }
  };

  flushDiscreteUpdatesImpl = function flushDiscreteUpdatesImpl() {
    (executionContext & 49) === NoContext && (flushPendingDiscreteUpdates(), flushPassiveEffects());
  };

  var roots = new Map(),
      ReactFabric = {
    NativeComponent: function (findNodeHandle, findHostInstance) {
      return function (_React$Component) {
        function ReactNativeComponent() {
          if (!(this instanceof ReactNativeComponent)) throw new TypeError("Cannot call a class as a function");

          var call = _React$Component.apply(this, arguments);

          if (!this) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return !call || "object" !== typeof call && "function" !== typeof call ? this : call;
        }

        _inherits$1(ReactNativeComponent, _React$Component);

        ReactNativeComponent.prototype.blur = function () {
          ReactNativePrivateInterface.TextInputState.blurTextInput(findNodeHandle(this));
        };

        ReactNativeComponent.prototype.focus = function () {
          ReactNativePrivateInterface.TextInputState.focusTextInput(findNodeHandle(this));
        };

        ReactNativeComponent.prototype.measure = function (callback) {
          var maybeInstance = undefined;

          try {
            maybeInstance = findHostInstance(this);
          } catch (error) {}

          null != maybeInstance && (maybeInstance.canonical ? nativeFabricUIManager.measure(maybeInstance.node, mountSafeCallback_NOT_REALLY_SAFE(this, callback)) : ReactNativePrivateInterface.UIManager.measure(findNodeHandle(this), mountSafeCallback_NOT_REALLY_SAFE(this, callback)));
        };

        ReactNativeComponent.prototype.measureInWindow = function (callback) {
          var maybeInstance = undefined;

          try {
            maybeInstance = findHostInstance(this);
          } catch (error) {}

          null != maybeInstance && (maybeInstance.canonical ? nativeFabricUIManager.measureInWindow(maybeInstance.node, mountSafeCallback_NOT_REALLY_SAFE(this, callback)) : ReactNativePrivateInterface.UIManager.measureInWindow(findNodeHandle(this), mountSafeCallback_NOT_REALLY_SAFE(this, callback)));
        };

        ReactNativeComponent.prototype.measureLayout = function (relativeToNativeNode, onSuccess, onFail) {
          var maybeInstance = undefined;

          try {
            maybeInstance = findHostInstance(this);
          } catch (error) {}

          null == maybeInstance || maybeInstance.canonical || (maybeInstance = undefined, "number" === typeof relativeToNativeNode ? maybeInstance = relativeToNativeNode : relativeToNativeNode._nativeTag && (maybeInstance = relativeToNativeNode._nativeTag), null != maybeInstance && ReactNativePrivateInterface.UIManager.measureLayout(findNodeHandle(this), maybeInstance, mountSafeCallback_NOT_REALLY_SAFE(this, onFail), mountSafeCallback_NOT_REALLY_SAFE(this, onSuccess)));
        };

        ReactNativeComponent.prototype.setNativeProps = function (nativeProps) {
          var maybeInstance = undefined;

          try {
            maybeInstance = findHostInstance(this);
          } catch (error) {}

          if (null != maybeInstance && !maybeInstance.canonical) {
            var nativeTag = maybeInstance._nativeTag || maybeInstance.canonical._nativeTag;
            maybeInstance = maybeInstance.viewConfig || maybeInstance.canonical.viewConfig;
            nativeProps = diffProperties(null, emptyObject, nativeProps, maybeInstance.validAttributes);
            null != nativeProps && ReactNativePrivateInterface.UIManager.updateView(nativeTag, maybeInstance.uiViewClassName, nativeProps);
          }
        };

        return ReactNativeComponent;
      }(React.Component);
    }(findNodeHandle, findHostInstance),
    findNodeHandle: findNodeHandle,
    setNativeProps: function setNativeProps() {},
    dispatchCommand: function dispatchCommand(handle, command, args) {
      null != handle._nativeTag && null != handle._internalInstanceHandle && fabricDispatchCommand(handle._internalInstanceHandle.stateNode.node, command, args);
    },
    render: function render(element, containerTag, callback) {
      var root = roots.get(containerTag);

      if (!root) {
        root = new FiberRootNode(containerTag, 0, false);
        var uninitializedFiber = createFiber(3, null, null, 0);
        root.current = uninitializedFiber;
        uninitializedFiber.stateNode = root;
        roots.set(containerTag, root);
      }

      updateContainer(element, root, null, callback);

      a: if (element = root.current, element.child) switch (element.child.tag) {
        case 5:
          element = element.child.stateNode.canonical;
          break a;

        default:
          element = element.child.stateNode;
      } else element = null;

      return element;
    },
    unmountComponentAtNode: function unmountComponentAtNode(containerTag) {
      var root = roots.get(containerTag);
      root && updateContainer(null, root, null, function () {
        roots.delete(containerTag);
      });
    },
    createPortal: function createPortal(children, containerTag) {
      return _createPortal(children, containerTag, null, 2 < arguments.length && undefined !== arguments[2] ? arguments[2] : null);
    },
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
      NativeMethodsMixin: function (findNodeHandle, findHostInstance) {
        return {
          measure: function measure(callback) {
            var maybeInstance = undefined;

            try {
              maybeInstance = findHostInstance(this);
            } catch (error) {}

            null != maybeInstance && (maybeInstance.canonical ? nativeFabricUIManager.measure(maybeInstance.node, mountSafeCallback_NOT_REALLY_SAFE(this, callback)) : ReactNativePrivateInterface.UIManager.measure(findNodeHandle(this), mountSafeCallback_NOT_REALLY_SAFE(this, callback)));
          },
          measureInWindow: function measureInWindow(callback) {
            var maybeInstance = undefined;

            try {
              maybeInstance = findHostInstance(this);
            } catch (error) {}

            null != maybeInstance && (maybeInstance.canonical ? nativeFabricUIManager.measureInWindow(maybeInstance.node, mountSafeCallback_NOT_REALLY_SAFE(this, callback)) : ReactNativePrivateInterface.UIManager.measureInWindow(findNodeHandle(this), mountSafeCallback_NOT_REALLY_SAFE(this, callback)));
          },
          measureLayout: function measureLayout(relativeToNativeNode, onSuccess, onFail) {
            var maybeInstance = undefined;

            try {
              maybeInstance = findHostInstance(this);
            } catch (error) {}

            null == maybeInstance || maybeInstance.canonical || (maybeInstance = undefined, "number" === typeof relativeToNativeNode ? maybeInstance = relativeToNativeNode : relativeToNativeNode._nativeTag && (maybeInstance = relativeToNativeNode._nativeTag), null != maybeInstance && ReactNativePrivateInterface.UIManager.measureLayout(findNodeHandle(this), maybeInstance, mountSafeCallback_NOT_REALLY_SAFE(this, onFail), mountSafeCallback_NOT_REALLY_SAFE(this, onSuccess)));
          },
          setNativeProps: function setNativeProps(nativeProps) {
            var maybeInstance = undefined;

            try {
              maybeInstance = findHostInstance(this);
            } catch (error) {}

            if (null != maybeInstance && !maybeInstance.canonical) {
              var nativeTag = maybeInstance._nativeTag || maybeInstance.canonical._nativeTag;
              maybeInstance = maybeInstance.viewConfig || maybeInstance.canonical.viewConfig;
              nativeProps = diffProperties(null, emptyObject, nativeProps, maybeInstance.validAttributes);
              null != nativeProps && ReactNativePrivateInterface.UIManager.updateView(nativeTag, maybeInstance.uiViewClassName, nativeProps);
            }
          },
          focus: function focus() {
            ReactNativePrivateInterface.TextInputState.focusTextInput(findNodeHandle(this));
          },
          blur: function blur() {
            ReactNativePrivateInterface.TextInputState.blurTextInput(findNodeHandle(this));
          }
        };
      }(findNodeHandle, findHostInstance)
    }
  };

  (function (devToolsConfig) {
    var _findFiberByHostInstance = devToolsConfig.findFiberByHostInstance;
    return injectInternals(_extends({}, devToolsConfig, {
      overrideHookState: null,
      overrideProps: null,
      setSuspenseHandler: null,
      scheduleUpdate: null,
      currentDispatcherRef: ReactSharedInternals.ReactCurrentDispatcher,
      findHostInstanceByFiber: function findHostInstanceByFiber(fiber) {
        fiber = findCurrentHostFiber(fiber);
        return null === fiber ? null : fiber.stateNode;
      },
      findFiberByHostInstance: function findFiberByHostInstance(instance) {
        return _findFiberByHostInstance ? _findFiberByHostInstance(instance) : null;
      },
      findHostInstancesForRefresh: null,
      scheduleRefresh: null,
      scheduleRoot: null,
      setRefreshHandler: null,
      getCurrentFiber: null
    }));
  })({
    findFiberByHostInstance: getInstanceFromInstance,
    getInspectorDataForViewTag: getInspectorDataForViewTag,
    bundleType: 0,
    version: "16.8.6",
    rendererPackageName: "react-native-renderer"
  });

  var ReactFabric$2 = {
    default: ReactFabric
  },
      ReactFabric$3 = ReactFabric$2 && ReactFabric || ReactFabric$2;
  module.exports = ReactFabric$3.default || ReactFabric$3;
},14815,[14344,14446,14566,10297,14575]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var TurboModuleRegistry = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1]));

  var _default = TurboModuleRegistry.getEnforcing('AppState');

  exports.default = _default;
},14818,[14308,14341]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var TurboModuleRegistry = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1]));

  var _default = TurboModuleRegistry.get('AsyncSQLiteDBStorage') || TurboModuleRegistry.get('AsyncLocalStorage');

  exports.default = _default;
},14821,[14308,14341]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var TurboModuleRegistry = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1]));

  var _default = TurboModuleRegistry.getEnforcing('Clipboard');

  exports.default = _default;
},14824,[14308,14341]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var TurboModuleRegistry = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1]));

  var _default = TurboModuleRegistry.getEnforcing('DatePickerAndroid');

  exports.default = _default;
},14827,[14308,14341]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);

  var _NativeImagePickerIOS = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));

  var _invariant = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));

  var ImagePickerIOS = {
    canRecordVideos: function canRecordVideos(callback) {
      (0, _invariant.default)(_NativeImagePickerIOS.default, 'ImagePickerIOS is not available');
      return _NativeImagePickerIOS.default.canRecordVideos(callback);
    },
    canUseCamera: function canUseCamera(callback) {
      (0, _invariant.default)(_NativeImagePickerIOS.default, 'ImagePickerIOS is not available');
      return _NativeImagePickerIOS.default.canUseCamera(callback);
    },
    openCameraDialog: function openCameraDialog(config, successCallback, cancelCallback) {
      (0, _invariant.default)(_NativeImagePickerIOS.default, 'ImagePickerIOS is not available');
      var newConfig = {
        videoMode: true,
        unmirrorFrontFacingCamera: false
      };

      if (config.videoMode != null) {
        newConfig.videoMode = config.videoMode;
      }

      if (config.unmirrorFrontFacingCamera != null) {
        newConfig.unmirrorFrontFacingCamera = config.unmirrorFrontFacingCamera;
      }

      return _NativeImagePickerIOS.default.openCameraDialog(newConfig, successCallback, cancelCallback);
    },
    openSelectDialog: function openSelectDialog(config, successCallback, cancelCallback) {
      (0, _invariant.default)(_NativeImagePickerIOS.default, 'ImagePickerIOS is not available');
      var newConfig = {
        showImages: true,
        showVideos: false
      };

      if (config.showImages != null) {
        newConfig.showImages = config.showImages;
      }

      if (config.showVideos != null) {
        newConfig.showVideos = config.showVideos;
      }

      return _NativeImagePickerIOS.default.openSelectDialog(newConfig, successCallback, cancelCallback);
    }
  };
  module.exports = ImagePickerIOS;
},14830,[14305,14833,14326]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var TurboModuleRegistry = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1]));

  var _default = TurboModuleRegistry.get('ImagePickerIOS');

  exports.default = _default;
},14833,[14308,14341]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);

  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[1]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var TurboModuleRegistry = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));

  var _Platform = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));

  var _default = _Platform.default.OS === 'android' ? TurboModuleRegistry.getEnforcing('IntentAndroid') : TurboModuleRegistry.getEnforcing('LinkingManager');

  exports.default = _default;
},14836,[14305,14308,14341,10066]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var TouchHistoryMath = {
    centroidDimension: function centroidDimension(touchHistory, touchesChangedAfter, isXAxis, ofCurrent) {
      var touchBank = touchHistory.touchBank;
      var total = 0;
      var count = 0;
      var oneTouchData = touchHistory.numberActiveTouches === 1 ? touchHistory.touchBank[touchHistory.indexOfSingleActiveTouch] : null;

      if (oneTouchData !== null) {
        if (oneTouchData.touchActive && oneTouchData.currentTimeStamp > touchesChangedAfter) {
          total += ofCurrent && isXAxis ? oneTouchData.currentPageX : ofCurrent && !isXAxis ? oneTouchData.currentPageY : !ofCurrent && isXAxis ? oneTouchData.previousPageX : oneTouchData.previousPageY;
          count = 1;
        }
      } else {
        for (var i = 0; i < touchBank.length; i++) {
          var touchTrack = touchBank[i];

          if (touchTrack !== null && touchTrack !== undefined && touchTrack.touchActive && touchTrack.currentTimeStamp >= touchesChangedAfter) {
            var toAdd = undefined;

            if (ofCurrent && isXAxis) {
              toAdd = touchTrack.currentPageX;
            } else if (ofCurrent && !isXAxis) {
              toAdd = touchTrack.currentPageY;
            } else if (!ofCurrent && isXAxis) {
              toAdd = touchTrack.previousPageX;
            } else {
              toAdd = touchTrack.previousPageY;
            }

            total += toAdd;
            count++;
          }
        }
      }

      return count > 0 ? total / count : TouchHistoryMath.noCentroid;
    },
    currentCentroidXOfTouchesChangedAfter: function currentCentroidXOfTouchesChangedAfter(touchHistory, touchesChangedAfter) {
      return TouchHistoryMath.centroidDimension(touchHistory, touchesChangedAfter, true, true);
    },
    currentCentroidYOfTouchesChangedAfter: function currentCentroidYOfTouchesChangedAfter(touchHistory, touchesChangedAfter) {
      return TouchHistoryMath.centroidDimension(touchHistory, touchesChangedAfter, false, true);
    },
    previousCentroidXOfTouchesChangedAfter: function previousCentroidXOfTouchesChangedAfter(touchHistory, touchesChangedAfter) {
      return TouchHistoryMath.centroidDimension(touchHistory, touchesChangedAfter, true, false);
    },
    previousCentroidYOfTouchesChangedAfter: function previousCentroidYOfTouchesChangedAfter(touchHistory, touchesChangedAfter) {
      return TouchHistoryMath.centroidDimension(touchHistory, touchesChangedAfter, false, false);
    },
    currentCentroidX: function currentCentroidX(touchHistory) {
      return TouchHistoryMath.centroidDimension(touchHistory, 0, true, true);
    },
    currentCentroidY: function currentCentroidY(touchHistory) {
      return TouchHistoryMath.centroidDimension(touchHistory, 0, false, true);
    },
    noCentroid: -1
  };
  module.exports = TouchHistoryMath;
},14839,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var TurboModuleRegistry = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1]));

  var _default = TurboModuleRegistry.get('PermissionsAndroid');

  exports.default = _default;
},14842,[14308,14341]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var TurboModuleRegistry = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1]));

  var _default = TurboModuleRegistry.get('PushNotificationManager');

  exports.default = _default;
},14845,[14308,14341]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var TurboModuleRegistry = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1]));

  var _default = TurboModuleRegistry.get('ShareModule');

  exports.default = _default;
},14848,[14308,14341]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);

  var _regenerator = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));

  var _classCallCheck2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));

  var _createClass2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));

  var _NativeTimePickerAndroid = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));

  var TimePickerAndroid = function () {
    function TimePickerAndroid() {
      (0, _classCallCheck2.default)(this, TimePickerAndroid);
    }

    (0, _createClass2.default)(TimePickerAndroid, null, [{
      key: "open",
      value: function open(options) {
        return _regenerator.default.async(function open$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!_NativeTimePickerAndroid.default) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return", _NativeTimePickerAndroid.default.open(options));

              case 4:
                return _context.abrupt("return", Promise.reject({
                  message: 'TimePickerAndroid is not supported on this platform.'
                }));

              case 5:
              case "end":
                return _context.stop();
            }
          }
        });
      }
    }]);
    return TimePickerAndroid;
  }();

  TimePickerAndroid.timeSetAction = 'timeSetAction';
  TimePickerAndroid.dismissedAction = 'dismissedAction';
  module.exports = TimePickerAndroid;
},14851,[14305,14674,14320,14323,14854]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var TurboModuleRegistry = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1]));

  var _default = TurboModuleRegistry.get('TimePickerAndroid');

  exports.default = _default;
},14854,[14308,14341]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var TurboModuleRegistry = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1]));

  var _default = TurboModuleRegistry.getEnforcing('ToastAndroid');

  exports.default = _default;
},14857,[14308,14341]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[1]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = useWindowDimensions;

  var _Dimensions = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));

  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));

  function useWindowDimensions() {
    var dims = _Dimensions.default.get('window');

    var forceUpdate = React.useState(false)[1].bind(null, function (v) {
      return !v;
    });
    var initialDims = React.useState(dims)[0];
    React.useEffect(function () {
      _Dimensions.default.addEventListener('change', forceUpdate);

      var latestDims = _Dimensions.default.get('window');

      if (latestDims !== initialDims) {
        forceUpdate();
      }

      return function () {
        _Dimensions.default.removeEventListener('change', forceUpdate);
      };
    }, [forceUpdate, initialDims]);
    return dims;
  }
},14860,[14308,14305,10429,10297]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var deepFreezeAndThrowOnMutationInDev = _$$_REQUIRE(_dependencyMap[0]);

  var UTFSequence = deepFreezeAndThrowOnMutationInDev({
    BOM: "\uFEFF",
    BULLET: "\u2022",
    BULLET_SP: "\xA0\u2022\xA0",
    MIDDOT: "\xB7",
    MIDDOT_SP: "\xA0\xB7\xA0",
    MIDDOT_KATAKANA: "\u30FB",
    MDASH: "\u2014",
    MDASH_SP: "\xA0\u2014\xA0",
    NDASH: "\u2013",
    NDASH_SP: "\xA0\u2013\xA0",
    NBSP: "\xA0",
    PIZZA: "\uD83C\uDF55",
    TRIANGLE_LEFT: "\u25C0",
    TRIANGLE_RIGHT: "\u25B6"
  });
  module.exports = UTFSequence;
},14863,[10057]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var TurboModuleRegistry = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1]));

  var _default = TurboModuleRegistry.getEnforcing('Vibration');

  exports.default = _default;
},14866,[14308,14341]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _classCallCheck = _$$_REQUIRE(_dependencyMap[0]);

  var _createClass = _$$_REQUIRE(_dependencyMap[1]);

  var _possibleConstructorReturn = _$$_REQUIRE(_dependencyMap[2]);

  var _getPrototypeOf = _$$_REQUIRE(_dependencyMap[3]);

  var _inherits = _$$_REQUIRE(_dependencyMap[4]);

  var React = _$$_REQUIRE(_dependencyMap[5]);

  var YellowBox;
  {
    YellowBox = function (_React$Component2) {
      _inherits(YellowBox, _React$Component2);

      function YellowBox() {
        _classCallCheck(this, YellowBox);

        return _possibleConstructorReturn(this, _getPrototypeOf(YellowBox).apply(this, arguments));
      }

      _createClass(YellowBox, [{
        key: "render",
        value: function render() {
          return null;
        }
      }], [{
        key: "ignoreWarnings",
        value: function ignoreWarnings(patterns) {}
      }, {
        key: "install",
        value: function install() {}
      }, {
        key: "uninstall",
        value: function uninstall() {}
      }]);

      return YellowBox;
    }(React.Component);
  }
  module.exports = YellowBox;
},14869,[14320,14323,14371,14377,14386,10297]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var PropTypes = _$$_REQUIRE(_dependencyMap[0]);

  var PointPropType = PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  });
  module.exports = PointPropType;
},14872,[10318]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[1]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _exportNames = {
    fetch: true,
    addEventListener: true,
    useNetInfo: true,
    removeEventListener: true,
    getConnectionInfo: true,
    isConnectionExpensive: true,
    isConnected: true
  };
  exports.fetch = fetch;
  exports.addEventListener = addEventListener;
  exports.useNetInfo = useNetInfo;
  exports.removeEventListener = removeEventListener;
  exports.getConnectionInfo = getConnectionInfo;
  exports.isConnectionExpensive = isConnectionExpensive;
  exports.default = exports.isConnected = undefined;

  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));

  var _react = _$$_REQUIRE(_dependencyMap[3]);

  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);

  var _deprecatedUtils = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));

  var _deprecatedState = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));

  var DeprecatedTypes = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[7]));

  Object.keys(DeprecatedTypes).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function get() {
        return DeprecatedTypes[key];
      }
    });
  });

  var _state = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));

  var Types = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[9]));

  Object.keys(Types).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function get() {
        return Types[key];
      }
    });
  });

  _state.default.setup();

  _deprecatedState.default.setup();

  var _isConnectedListeners = new Map();

  function fetch() {
    if (_reactNative.Platform.OS === 'android') {
      return _state.default.latest().then(function (state) {
        return state.type.toUpperCase();
      });
    } else {
      return _state.default.latest();
    }
  }

  function addEventListener(listenerOrType) {
    var deprecatedHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

    if (typeof listenerOrType === 'string') {
      _deprecatedUtils.default.warnOnce();

      if (listenerOrType === DeprecatedTypes.CHANGE_EVENT_NAME && deprecatedHandler) {
        _deprecatedState.default.add(deprecatedHandler);

        return {
          remove: function remove() {
            _deprecatedState.default.remove(deprecatedHandler);
          }
        };
      } else {
        return {
          remove: function remove() {}
        };
      }
    } else {
      var _listener = listenerOrType;

      _state.default.add(_listener);

      return function () {
        _state.default.remove(_listener);
      };
    }
  }

  function useNetInfo() {
    var _useState = (0, _react.useState)({
      type: Types.NetInfoStateType.unknown,
      isConnected: false,
      isInternetReachable: false,
      details: null
    }),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        netInfo = _useState2[0],
        setNetInfo = _useState2[1];

    (0, _react.useEffect)(function () {
      return addEventListener(setNetInfo);
    }, []);
    return netInfo;
  }

  function removeEventListener(type, handler) {
    _deprecatedUtils.default.warnOnce();

    if (type === DeprecatedTypes.CHANGE_EVENT_NAME) {
      _deprecatedState.default.remove(handler);
    }
  }

  function getConnectionInfo() {
    _deprecatedUtils.default.warnOnce();

    return _deprecatedState.default.latest();
  }

  function isConnectionExpensive() {
    _deprecatedUtils.default.warnOnce();

    return _state.default.latest().then(_deprecatedUtils.default.isConnectionExpensive);
  }

  var isConnected = {
    addEventListener: function addEventListener(eventName, handler) {
      if (eventName !== DeprecatedTypes.CHANGE_EVENT_NAME) {
        return {
          remove: function remove() {}
        };
      }

      var listener = function listener(state) {
        handler(_deprecatedUtils.default.isConnected(state));
      };

      _isConnectedListeners.set(handler, listener);

      _state.default.add(listener);

      return {
        remove: function remove() {
          _state.default.remove(listener);
        }
      };
    },
    removeEventListener: function removeEventListener(_eventName, handler) {
      var listener = _isConnectedListeners.get(handler);

      listener && _state.default.remove(listener);

      _isConnectedListeners.delete(handler);
    },
    fetch: function fetch() {
      return _state.default.latest().then(_deprecatedUtils.default.isConnected);
    }
  };
  exports.isConnected = isConnected;
  var _default = {
    fetch: fetch,
    addEventListener: addEventListener,
    useNetInfo: useNetInfo,
    removeEventListener: removeEventListener,
    getConnectionInfo: getConnectionInfo,
    isConnectionExpensive: isConnectionExpensive,
    isConnected: isConnected
  };
  exports.default = _default;
},14875,[14308,14305,14347,10297,10033,14878,14884,14899,14887,14881]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.convertState = convertState;
  exports.isConnectionExpensive = isConnectionExpensive;
  exports.isConnected = isConnected;
  exports.warnOnce = warnOnce;
  exports.default = undefined;

  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);

  var Types = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));

  function convertState(input) {
    var effectiveType = 'unknown';

    if (input.type === 'cellular') {
      effectiveType = input.details.cellularGeneration || 'unknown';
    }

    var type = input.type === Types.NetInfoStateType.vpn || input.type === Types.NetInfoStateType.other ? 'unknown' : input.type;
    return {
      type: type,
      effectiveType: effectiveType
    };
  }

  function isConnectionExpensive(input) {
    if (_reactNative.Platform.OS === 'android') {
      if (input.type !== Types.NetInfoStateType.none && input.type !== Types.NetInfoStateType.unknown) {
        return input.details.isConnectionExpensive;
      } else {
        return false;
      }
    } else {
      throw new Error('Currently not supported on iOS');
    }
  }

  function isConnected(input) {
    return input.isConnected;
  }

  var warned = false;

  function warnOnce() {
    if (warned) {
      return;
    }

    console.warn('Warning: RNCNetInfo - You are using the deprecated API. It will still work, but you must upgrade to the new API to receive the new features. The old API will be removed in the future');
    warned = true;
  }

  var _default = {
    convertState: convertState,
    isConnectionExpensive: isConnectionExpensive,
    isConnected: isConnected,
    warnOnce: warnOnce
  };
  exports.default = _default;
},14878,[14308,10033,14881]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NetInfoCellularGeneration = exports.NetInfoStateType = undefined;
  var NetInfoStateType;
  exports.NetInfoStateType = NetInfoStateType;

  (function (NetInfoStateType) {
    NetInfoStateType["unknown"] = "unknown";
    NetInfoStateType["none"] = "none";
    NetInfoStateType["cellular"] = "cellular";
    NetInfoStateType["wifi"] = "wifi";
    NetInfoStateType["bluetooth"] = "bluetooth";
    NetInfoStateType["ethernet"] = "ethernet";
    NetInfoStateType["wimax"] = "wimax";
    NetInfoStateType["vpn"] = "vpn";
    NetInfoStateType["other"] = "other";
  })(NetInfoStateType || (exports.NetInfoStateType = NetInfoStateType = {}));

  var NetInfoCellularGeneration;
  exports.NetInfoCellularGeneration = NetInfoCellularGeneration;

  (function (NetInfoCellularGeneration) {
    NetInfoCellularGeneration["2g"] = "2g";
    NetInfoCellularGeneration["3g"] = "3g";
    NetInfoCellularGeneration["4g"] = "4g";
  })(NetInfoCellularGeneration || (exports.NetInfoCellularGeneration = NetInfoCellularGeneration = {}));
},14881,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.setup = setup;
  exports.tearDown = tearDown;
  exports.latest = latest;
  exports.add = add;
  exports.remove = remove;
  exports.default = undefined;

  var _state = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));

  var _deprecatedUtils = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));

  var _isSetup = false;

  var _subscriptions = new Set();

  var _latestState = null;

  function _handler(state) {
    var convertedState = _deprecatedUtils.default.convertState(state);

    _latestState = convertedState;

    _subscriptions.forEach(function (handler) {
      return handler(convertedState);
    });
  }

  function setup() {
    _state.default.add(_handler);
  }

  function tearDown() {
    {
      return;
    }

    _state.default.remove(_handler);

    _latestState = null;

    _subscriptions.clear();
  }

  function latest() {
    if (_latestState) {
      return Promise.resolve(_latestState);
    } else {
      return _state.default.latest().then(function (state) {
        _latestState = _deprecatedUtils.default.convertState(state);
        return _latestState;
      });
    }
  }

  function add(handler) {
    _subscriptions.add(handler);

    if (_latestState) {
      handler(_latestState);
    } else {
      latest().then(handler);
    }
  }

  function remove(handler) {
    _subscriptions.delete(handler);
  }

  var _default = {
    setup: setup,
    tearDown: tearDown,
    latest: latest,
    add: add,
    remove: remove
  };
  exports.default = _default;
},14884,[14305,14887,14878]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.setup = setup;
  exports.tearDown = tearDown;
  exports.latest = latest;
  exports.add = add;
  exports.remove = remove;
  exports.default = undefined;

  var _objectSpread2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));

  var _nativeInterface = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));

  var _internetReachability = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));

  var _utils = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));

  var DEVICE_CONNECTIVITY_EVENT = 'netInfo.networkStatusDidChange';
  var _isSetup = false;
  var _nativeEventSubscription = null;
  var _internetReachabilitySubscription = null;

  var _subscriptions = new Set();

  var _latestState = null;

  function fetchCurrentState() {
    return _utils.default.currentState().then(function (state) {
      _internetReachability.default.update(state);

      var convertedState = _utils.default.convertState(state);

      _latestState = convertedState;
      return convertedState;
    });
  }

  function setup() {
    if (_isSetup) {
      return;
    }

    _nativeEventSubscription = _nativeInterface.default.eventEmitter.addListener(DEVICE_CONNECTIVITY_EVENT, function (state) {
      _internetReachability.default.update(state);

      var convertedState = _utils.default.convertState(state);

      _latestState = convertedState;

      _subscriptions.forEach(function (handler) {
        return handler(convertedState);
      });
    });
    fetchCurrentState();
    _internetReachabilitySubscription = _internetReachability.default.addSubscription(function (isInternetReachable) {
      if (!_latestState) {
        return;
      }

      var nextState = (0, _objectSpread2.default)({}, _latestState, {
        isInternetReachable: isInternetReachable
      });
      _latestState = nextState;

      _subscriptions.forEach(function (handler) {
        return handler(nextState);
      });
    });
    _isSetup = true;
  }

  function tearDown() {
    if (!_isSetup) {
      return;
    }

    if (_nativeEventSubscription) {
      _nativeEventSubscription.remove();
    }

    _subscriptions.clear();

    _internetReachability.default.clear();

    if (_internetReachabilitySubscription) {
      _internetReachabilitySubscription();
    }

    _isSetup = false;
  }

  function latest() {
    if (_latestState) {
      return Promise.resolve(_latestState);
    } else {
      return fetchCurrentState();
    }
  }

  function add(handler) {
    _subscriptions.add(handler);

    if (_latestState) {
      handler(_latestState);
    } else {
      latest().then(handler);
    }
  }

  function remove(handler) {
    _subscriptions.delete(handler);
  }

  var _default = {
    setup: setup,
    tearDown: tearDown,
    latest: latest,
    add: add,
    remove: remove
  };
  exports.default = _default;
},14887,[14305,14314,14890,14893,14896]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _objectSpread2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));

  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);

  var RNCNetInfo = _reactNative.NativeModules.RNCNetInfo;

  if (!RNCNetInfo) {
    throw new Error("@react-native-community/netinfo: NativeModule.RNCNetInfo is null. To fix this issue try these steps:\n\n\u2022 Run `react-native link @react-native-community/netinfo` in the project root.\n\u2022 Rebuild and re-run the app.\n\u2022 If you are using CocoaPods on iOS, run `pod install` in the `ios` directory and then rebuild and re-run the app. You may also need to re-open Xcode to get the new pods.\n\u2022 Check that the library was linked correctly when you used the link command by running through the manual installation instructions in the README.\n* If you are getting this error while unit testing you need to mock the native module. Follow the guide in the README.\n\nIf none of these fix the issue, please open an issue on the Github repository: https://github.com/react-native-community/react-native-netinfo");
  }

  var nativeEventEmitter = null;

  var _default = (0, _objectSpread2.default)({}, RNCNetInfo, {
    get eventEmitter() {
      if (!nativeEventEmitter) {
        nativeEventEmitter = new _reactNative.NativeEventEmitter(RNCNetInfo);
      }

      return nativeEventEmitter;
    }

  });

  exports.default = _default;
},14890,[14305,14314,10033]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.clear = clear;
  exports.update = update;
  exports.currentState = currentState;
  exports.addSubscription = addSubscription;
  exports.default = undefined;
  var REACHABILITY_URL = 'https://clients3.google.com/generate_204';
  var LONG_TIMEOUT = 60000;
  var SHORT_TIMEOUT = 5000;

  var _subscriptions = new Set();

  var _isInternetReachable = null;
  var _currentInternetReachabilityCheckHandler = null;
  var _currentTimeoutHandle = null;

  function setIsInternetReachable(isInternetReachable) {
    if (_isInternetReachable === isInternetReachable) {
      return;
    }

    _isInternetReachable = isInternetReachable;

    _subscriptions.forEach(function (listener) {
      listener(_isInternetReachable);
    });
  }

  function checkInternetReachability() {
    var hasCanceled = false;
    var promise = fetch(REACHABILITY_URL).then(function (response) {
      if (!hasCanceled) {
        setIsInternetReachable(response.status === 204);
        var nextTimeoutInterval = _isInternetReachable ? LONG_TIMEOUT : SHORT_TIMEOUT;
        _currentTimeoutHandle = setTimeout(checkInternetReachability, nextTimeoutInterval);
      }
    }).catch(function () {
      setIsInternetReachable(false);
      _currentTimeoutHandle = setTimeout(checkInternetReachability, SHORT_TIMEOUT);
    });
    return {
      promise: promise,
      cancel: function cancel() {
        hasCanceled = true;
      }
    };
  }

  function setExpectsConnection(expectsConnection) {
    if (_currentInternetReachabilityCheckHandler !== null) {
      _currentInternetReachabilityCheckHandler.cancel();

      _currentInternetReachabilityCheckHandler = null;
    }

    if (_currentTimeoutHandle !== null) {
      clearTimeout(_currentTimeoutHandle);
      _currentTimeoutHandle = null;
    }

    if (expectsConnection) {
      if (!_isInternetReachable) {
        setIsInternetReachable(null);
      }

      _currentInternetReachabilityCheckHandler = checkInternetReachability();
    } else {
      setIsInternetReachable(false);
    }
  }

  function clear() {
    if (_currentInternetReachabilityCheckHandler !== null) {
      _currentInternetReachabilityCheckHandler.cancel();

      _currentInternetReachabilityCheckHandler = null;
    }

    if (_currentTimeoutHandle !== null) {
      clearTimeout(_currentTimeoutHandle);
      _currentTimeoutHandle = null;
    }

    _subscriptions.clear();
  }

  function update(state) {
    if (typeof state.isInternetReachable === 'boolean') {
      setIsInternetReachable(state.isInternetReachable);
    } else {
      setExpectsConnection(state.isConnected);
    }
  }

  function currentState() {
    return _isInternetReachable;
  }

  function addSubscription(listener) {
    _subscriptions.add(listener);

    return function () {
      _subscriptions.delete(listener);
    };
  }

  var _default = {
    update: update,
    currentState: currentState,
    clear: clear,
    addSubscription: addSubscription
  };
  exports.default = _default;
},14893,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.convertState = convertState;
  exports.currentState = currentState;
  exports.default = undefined;

  var _objectSpread2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));

  var _internetReachability = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));

  var _nativeInterface = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));

  function convertState(input) {
    if (typeof input.isInternetReachable === 'boolean') {
      return input;
    } else {
      return (0, _objectSpread2.default)({}, input, {
        isInternetReachable: _internetReachability.default.currentState()
      });
    }
  }

  function currentState() {
    return _nativeInterface.default.getCurrentState();
  }

  var _default = {
    convertState: convertState,
    currentState: currentState
  };
  exports.default = _default;
},14896,[14305,14314,14893,14890]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.CHANGE_EVENT_NAME = undefined;
  var CHANGE_EVENT_NAME = 'connectionChange';
  exports.CHANGE_EVENT_NAME = CHANGE_EVENT_NAME;
},14899,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  module.exports = _$$_REQUIRE(_dependencyMap[0]);
},14902,[14905]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);

  var _extends2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));

  var _classCallCheck2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));

  var _createClass2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));

  var _possibleConstructorReturn2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));

  var _getPrototypeOf3 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));

  var _assertThisInitialized2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));

  var _inherits2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));

  var _utils = _$$_REQUIRE(_dependencyMap[8]);

  var React = _$$_REQUIRE(_dependencyMap[9]);

  var ReactNative = _$$_REQUIRE(_dependencyMap[10]);

  var Platform = ReactNative.Platform,
      UIManager = ReactNative.UIManager;

  var dismissKeyboard = _$$_REQUIRE(_dependencyMap[11]);

  var NativeViewPager = _$$_REQUIRE(_dependencyMap[12]);

  var VIEW_PAGER_REF = 'viewPager';
  var VIEW_MANAGER_NAME = 'RNCViewPager';

  function getViewManagerConfig(viewManagerName) {
    if (!UIManager.getViewManagerConfig) {
      return UIManager[viewManagerName];
    }

    return UIManager.getViewManagerConfig(viewManagerName);
  }

  var ViewPager = function (_React$Component) {
    (0, _inherits2.default)(ViewPager, _React$Component);

    function ViewPager() {
      var _getPrototypeOf2;

      var _this;

      (0, _classCallCheck2.default)(this, ViewPager);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(ViewPager)).call.apply(_getPrototypeOf2, [this].concat(args)));
      _this.isScrolling = false;

      _this.getInnerViewNode = function () {
        return _this.refs[VIEW_PAGER_REF].getInnerViewNode();
      };

      _this._onPageScroll = function (e) {
        if (_this.props.onPageScroll) {
          _this.props.onPageScroll(e);
        }

        {
          if (_this.props.keyboardDismissMode === 'on-drag') {
            dismissKeyboard();
          }
        }
      };

      _this._onPageScrollStateChanged = function (e) {
        if (_this.props.onPageScrollStateChanged) {
          _this.props.onPageScrollStateChanged(e);
        }

        _this.isScrolling = e.nativeEvent.pageScrollState === 'dragging';
      };

      _this._onPageSelected = function (e) {
        if (_this.props.onPageSelected) {
          _this.props.onPageSelected(e);
        }
      };

      _this.setPage = function (selectedPage) {
        UIManager.dispatchViewManagerCommand(ReactNative.findNodeHandle((0, _assertThisInitialized2.default)(_this)), getViewManagerConfig(VIEW_MANAGER_NAME).Commands.setPage, [selectedPage]);
      };

      _this.setPageWithoutAnimation = function (selectedPage) {
        UIManager.dispatchViewManagerCommand(ReactNative.findNodeHandle((0, _assertThisInitialized2.default)(_this)), getViewManagerConfig(VIEW_MANAGER_NAME).Commands.setPageWithoutAnimation, [selectedPage]);
      };

      _this.setScrollEnabled = function (scrollEnabled) {
        UIManager.dispatchViewManagerCommand(ReactNative.findNodeHandle((0, _assertThisInitialized2.default)(_this)), getViewManagerConfig(VIEW_MANAGER_NAME).Commands.setScrollEnabled, [scrollEnabled]);
      };

      _this._onMoveShouldSetResponderCapture = function () {
        return false;
      };

      return _this;
    }

    (0, _createClass2.default)(ViewPager, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        {
          if (this.props.initialPage != null) {
            this.setPageWithoutAnimation(this.props.initialPage);
          }
        }
      }
    }, {
      key: "render",
      value: function render() {
        return React.createElement(NativeViewPager, (0, _extends2.default)({}, this.props, {
          ref: VIEW_PAGER_REF,
          style: this.props.style,
          onPageScroll: this._onPageScroll,
          onPageScrollStateChanged: this._onPageScrollStateChanged,
          onPageSelected: this._onPageSelected,
          onMoveShouldSetResponderCapture: this._onMoveShouldSetResponderCapture,
          children: (0, _utils.childrenWithOverriddenStyle)(this.props.children)
        }));
      }
    }]);
    return ViewPager;
  }(React.Component);

  module.exports = ViewPager;
},14905,[14305,14344,14320,14323,14371,14377,14374,14386,14908,10297,10033,10627,14911]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[1]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.childrenWithOverriddenStyle = undefined;

  var _objectSpread2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));

  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));

  var childrenWithOverriddenStyle = function childrenWithOverriddenStyle(children) {
    return React.Children.map(children, function (child) {
      if (!child) {
        return null;
      }

      var newProps = (0, _objectSpread2.default)({}, child.props, {
        style: [child.props.style, {
          position: 'absolute',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          width: undefined,
          height: undefined
        }],
        collapsable: false
      });
      return React.createElement(child.type, newProps);
    });
  };

  exports.childrenWithOverriddenStyle = childrenWithOverriddenStyle;
},14908,[14308,14305,14314,10297]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _require = _$$_REQUIRE(_dependencyMap[0]),
      requireNativeComponent = _require.requireNativeComponent;

  module.exports = requireNativeComponent('RNCViewPager');
},14911,[10033]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  ;

  (function (isNode) {
    var Public = function Public(clone) {
      return merge(clone === true, false, arguments);
    },
        publicName = 'merge';

    Public.recursive = function (clone) {
      return merge(clone === true, true, arguments);
    };

    Public.clone = function (input) {
      var output = input,
          type = typeOf(input),
          index,
          size;

      if (type === 'array') {
        output = [];
        size = input.length;

        for (index = 0; index < size; ++index) {
          output[index] = Public.clone(input[index]);
        }
      } else if (type === 'object') {
        output = {};

        for (index in input) {
          output[index] = Public.clone(input[index]);
        }
      }

      return output;
    };

    function merge_recursive(base, extend) {
      if (typeOf(base) !== 'object') return extend;

      for (var key in extend) {
        if (typeOf(base[key]) === 'object' && typeOf(extend[key]) === 'object') {
          base[key] = merge_recursive(base[key], extend[key]);
        } else {
          base[key] = extend[key];
        }
      }

      return base;
    }

    function merge(clone, recursive, argv) {
      var result = argv[0],
          size = argv.length;
      if (clone || typeOf(result) !== 'object') result = {};

      for (var index = 0; index < size; ++index) {
        var item = argv[index],
            type = typeOf(item);
        if (type !== 'object') continue;

        for (var key in item) {
          if (key === '__proto__') continue;
          var sitem = clone ? Public.clone(item[key]) : item[key];

          if (recursive) {
            result[key] = merge_recursive(result[key], sitem);
          } else {
            result[key] = sitem;
          }
        }
      }

      return result;
    }

    function typeOf(input) {
      return {}.toString.call(input).slice(8, -1).toLowerCase();
    }

    if (isNode) {
      module.exports = Public;
    } else {
      window[publicName] = Public;
    }
  })(typeof module === 'object' && module && typeof module.exports === 'object' && module.exports);
},14914,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = extractColor;
  exports.integerColor = exports.colorNames = undefined;

  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);

  var colorNames = {
    aliceblue: [240, 248, 255],
    antiquewhite: [250, 235, 215],
    aqua: [0, 255, 255],
    aquamarine: [127, 255, 212],
    azure: [240, 255, 255],
    beige: [245, 245, 220],
    bisque: [255, 228, 196],
    black: [0, 0, 0],
    blanchedalmond: [255, 235, 205],
    blue: [0, 0, 255],
    blueviolet: [138, 43, 226],
    brown: [165, 42, 42],
    burlywood: [222, 184, 135],
    cadetblue: [95, 158, 160],
    chartreuse: [127, 255, 0],
    chocolate: [210, 105, 30],
    coral: [255, 127, 80],
    cornflowerblue: [100, 149, 237],
    cornsilk: [255, 248, 220],
    crimson: [220, 20, 60],
    cyan: [0, 255, 255],
    darkblue: [0, 0, 139],
    darkcyan: [0, 139, 139],
    darkgoldenrod: [184, 134, 11],
    darkgray: [169, 169, 169],
    darkgreen: [0, 100, 0],
    darkgrey: [169, 169, 169],
    darkkhaki: [189, 183, 107],
    darkmagenta: [139, 0, 139],
    darkolivegreen: [85, 107, 47],
    darkorange: [255, 140, 0],
    darkorchid: [153, 50, 204],
    darkred: [139, 0, 0],
    darksalmon: [233, 150, 122],
    darkseagreen: [143, 188, 143],
    darkslateblue: [72, 61, 139],
    darkslategray: [47, 79, 79],
    darkslategrey: [47, 79, 79],
    darkturquoise: [0, 206, 209],
    darkviolet: [148, 0, 211],
    deeppink: [255, 20, 147],
    deepskyblue: [0, 191, 255],
    dimgray: [105, 105, 105],
    dimgrey: [105, 105, 105],
    dodgerblue: [30, 144, 255],
    firebrick: [178, 34, 34],
    floralwhite: [255, 250, 240],
    forestgreen: [34, 139, 34],
    fuchsia: [255, 0, 255],
    gainsboro: [220, 220, 220],
    ghostwhite: [248, 248, 255],
    gold: [255, 215, 0],
    goldenrod: [218, 165, 32],
    gray: [128, 128, 128],
    green: [0, 128, 0],
    greenyellow: [173, 255, 47],
    grey: [128, 128, 128],
    honeydew: [240, 255, 240],
    hotpink: [255, 105, 180],
    indianred: [205, 92, 92],
    indigo: [75, 0, 130],
    ivory: [255, 255, 240],
    khaki: [240, 230, 140],
    lavender: [230, 230, 250],
    lavenderblush: [255, 240, 245],
    lawngreen: [124, 252, 0],
    lemonchiffon: [255, 250, 205],
    lightblue: [173, 216, 230],
    lightcoral: [240, 128, 128],
    lightcyan: [224, 255, 255],
    lightgoldenrodyellow: [250, 250, 210],
    lightgray: [211, 211, 211],
    lightgreen: [144, 238, 144],
    lightgrey: [211, 211, 211],
    lightpink: [255, 182, 193],
    lightsalmon: [255, 160, 122],
    lightseagreen: [32, 178, 170],
    lightskyblue: [135, 206, 250],
    lightslategray: [119, 136, 153],
    lightslategrey: [119, 136, 153],
    lightsteelblue: [176, 196, 222],
    lightyellow: [255, 255, 224],
    lime: [0, 255, 0],
    limegreen: [50, 205, 50],
    linen: [250, 240, 230],
    magenta: [255, 0, 255],
    maroon: [128, 0, 0],
    mediumaquamarine: [102, 205, 170],
    mediumblue: [0, 0, 205],
    mediumorchid: [186, 85, 211],
    mediumpurple: [147, 112, 219],
    mediumseagreen: [60, 179, 113],
    mediumslateblue: [123, 104, 238],
    mediumspringgreen: [0, 250, 154],
    mediumturquoise: [72, 209, 204],
    mediumvioletred: [199, 21, 133],
    midnightblue: [25, 25, 112],
    mintcream: [245, 255, 250],
    mistyrose: [255, 228, 225],
    moccasin: [255, 228, 181],
    navajowhite: [255, 222, 173],
    navy: [0, 0, 128],
    oldlace: [253, 245, 230],
    olive: [128, 128, 0],
    olivedrab: [107, 142, 35],
    orange: [255, 165, 0],
    orangered: [255, 69, 0],
    orchid: [218, 112, 214],
    palegoldenrod: [238, 232, 170],
    palegreen: [152, 251, 152],
    paleturquoise: [175, 238, 238],
    palevioletred: [219, 112, 147],
    papayawhip: [255, 239, 213],
    peachpuff: [255, 218, 185],
    peru: [205, 133, 63],
    pink: [255, 192, 203],
    plum: [221, 160, 221],
    powderblue: [176, 224, 230],
    purple: [128, 0, 128],
    rebeccapurple: [102, 51, 153],
    red: [255, 0, 0],
    rosybrown: [188, 143, 143],
    royalblue: [65, 105, 225],
    saddlebrown: [139, 69, 19],
    salmon: [250, 128, 114],
    sandybrown: [244, 164, 96],
    seagreen: [46, 139, 87],
    seashell: [255, 245, 238],
    sienna: [160, 82, 45],
    silver: [192, 192, 192],
    skyblue: [135, 206, 235],
    slateblue: [106, 90, 205],
    slategray: [112, 128, 144],
    slategrey: [112, 128, 144],
    snow: [255, 250, 250],
    springgreen: [0, 255, 127],
    steelblue: [70, 130, 180],
    tan: [210, 180, 140],
    teal: [0, 128, 128],
    thistle: [216, 191, 216],
    tomato: [255, 99, 71],
    turquoise: [64, 224, 208],
    violet: [238, 130, 238],
    wheat: [245, 222, 179],
    white: [255, 255, 255],
    whitesmoke: [245, 245, 245],
    yellow: [255, 255, 0],
    yellowgreen: [154, 205, 50]
  };
  exports.colorNames = colorNames;

  for (var name in colorNames) {
    if (colorNames.hasOwnProperty(name)) {
      var color = colorNames[name];
      var r = color[0];
      var g = color[1];
      var b = color[2];
      colorNames[name] = (0xff000000 | r << 16 | g << 8 | b) >>> 0;
    }
  }

  Object.freeze(colorNames);

  function hslToRgb(hsl) {
    var h = hsl[0] / 360;
    var s = hsl[1] / 100;
    var l = hsl[2] / 100;
    var t1;
    var t2;
    var t3;
    var rgb;
    var val;

    if (s === 0) {
      val = l * 255;
      return [val, val, val];
    }

    if (l < 0.5) {
      t2 = l * (1 + s);
    } else {
      t2 = l + s - l * s;
    }

    t1 = 2 * l - t2;
    rgb = [0, 0, 0];

    for (var i = 0; i < 3; i++) {
      t3 = h + 0.3333333333333333 * -(i - 1);

      if (t3 < 0) {
        t3++;
      }

      if (t3 > 1) {
        t3--;
      }

      if (6 * t3 < 1) {
        val = t1 + (t2 - t1) * 6 * t3;
      } else if (2 * t3 < 1) {
        val = t2;
      } else if (3 * t3 < 2) {
        val = t1 + (t2 - t1) * (0.6666666666666666 - t3) * 6;
      } else {
        val = t1;
      }

      rgb[i] = val;
    }

    return rgb;
  }

  function hwbToRgb(hwb) {
    var h = hwb[0] / 360;
    var wh = hwb[1] / 100;
    var bl = hwb[2] / 100;
    var ratio = wh + bl;
    var i;
    var v;
    var f;
    var n;

    if (ratio > 1) {
      wh /= ratio;
      bl /= ratio;
    }

    i = Math.floor(6 * h);
    v = 1 - bl;
    f = 6 * h - i;

    if ((i & 0x01) !== 0) {
      f = 1 - f;
    }

    n = wh + f * (v - wh);
    var r;
    var g;
    var b;

    switch (i) {
      default:
      case 6:
      case 0:
        r = v;
        g = n;
        b = wh;
        break;

      case 1:
        r = n;
        g = v;
        b = wh;
        break;

      case 2:
        r = wh;
        g = v;
        b = n;
        break;

      case 3:
        r = wh;
        g = n;
        b = v;
        break;

      case 4:
        r = n;
        g = wh;
        b = v;
        break;

      case 5:
        r = v;
        g = wh;
        b = n;
        break;
    }

    return [r, g, b];
  }

  function clamp(num, min, max) {
    return Math.min(Math.max(min, num), max);
  }

  var abbr = /^#([a-f0-9]{3,4})$/i;
  var hex = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i;
  var rgba = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d.]+)\s*)?\)$/;
  var per = /^rgba?\(\s*([+-]?[\d.]+)%\s*,\s*([+-]?[\d.]+)%\s*,\s*([+-]?[\d.]+)%\s*(?:,\s*([+-]?[\d.]+)\s*)?\)$/;
  var keyword = /(\D+)/;

  function rgbFromString(string) {
    var rgb = [0, 0, 0, 1];
    var match;
    var i;
    var hexAlpha;

    if (match = string.match(hex)) {
      hexAlpha = match[2];
      match = match[1];

      for (i = 0; i < 3; i++) {
        var i2 = i * 2;
        rgb[i] = parseInt(match.slice(i2, i2 + 2), 16) / 255;
      }

      if (hexAlpha) {
        rgb[3] = Math.round(parseInt(hexAlpha, 16) / 255 * 100) / 100;
      }
    } else if (match = string.match(abbr)) {
      match = match[1];
      hexAlpha = match[3];

      for (i = 0; i < 3; i++) {
        rgb[i] = parseInt(match[i] + match[i], 16) / 255;
      }

      if (hexAlpha) {
        rgb[3] = Math.round(parseInt(hexAlpha + hexAlpha, 16) / 255 * 100) / 100;
      }
    } else if (match = string.match(rgba)) {
      for (i = 0; i < 3; i++) {
        rgb[i] = parseInt(match[i + 1], 0) / 255;
      }

      if (match[4]) {
        rgb[3] = parseFloat(match[4]);
      }
    } else if (match = string.match(per)) {
      for (i = 0; i < 3; i++) {
        rgb[i] = parseFloat(match[i + 1]) / 100;
      }

      if (match[4]) {
        rgb[3] = parseFloat(match[4]);
      }
    } else if (match = string.match(keyword)) {
      if (match[1] === 'transparent') {
        return [0, 0, 0, 0];
      }

      rgb = colorNames[match[1]];

      if (!(typeof rgb === 'number')) {
        return null;
      }

      return integerColor(rgb);
    } else {
      return null;
    }

    for (i = 0; i < 4; i++) {
      rgb[i] = clamp(rgb[i], 0, 1);
    }

    return rgb;
  }

  var hslRegEx = /^hsla?\(\s*([+-]?(?:\d*\.)?\d+)(?:deg)?\s*,\s*([+-]?[\d.]+)%\s*,\s*([+-]?[\d.]+)%\s*(?:,\s*([+-]?[\d.]+)\s*)?\)$/;

  function rgbFromHslString(string) {
    var match = string.match(hslRegEx);

    if (!match) {
      return null;
    }

    var alpha = parseFloat(match[4]);
    var h = (parseFloat(match[1]) + 360) % 360;
    var s = clamp(parseFloat(match[2]), 0, 100);
    var l = clamp(parseFloat(match[3]), 0, 100);
    var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
    return hslToRgb([h, s, l, a]);
  }

  var hwbRegEx = /^hwb\(\s*([+-]?\d*[.]?\d+)(?:deg)?\s*,\s*([+-]?[\d.]+)%\s*,\s*([+-]?[\d.]+)%\s*(?:,\s*([+-]?[\d.]+)\s*)?\)$/;

  function rgbFromHwbString(string) {
    var match = string.match(hwbRegEx);

    if (!match) {
      return null;
    }

    var alpha = parseFloat(match[4]);
    var h = (parseFloat(match[1]) % 360 + 360) % 360;
    var w = clamp(parseFloat(match[2]), 0, 100);
    var b = clamp(parseFloat(match[3]), 0, 100);
    var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
    return hwbToRgb([h, w, b, a]);
  }

  function colorFromString(string) {
    var prefix = string.substring(0, 3).toLowerCase();

    switch (prefix) {
      case 'hsl':
        return rgbFromHslString(string);

      case 'hwb':
        return rgbFromHwbString(string);

      default:
        return rgbFromString(string);
    }
  }

  var identity = function identity(x) {
    return x;
  };

  var toSignedInt32 = function toSignedInt32(x) {
    return x | 0x0;
  };

  var integerColor = _reactNative.Platform.OS === 'android' ? toSignedInt32 : identity;
  exports.integerColor = integerColor;

  function extractColor(color) {
    if (typeof color === 'number') {
      if (color >>> 0 === color && color >= 0 && color <= 0xffffffff) {
        return integerColor(color);
      }

      return null;
    }

    var parsedColor = typeof color === 'string' ? colorFromString(color) : color;

    if (!Array.isArray(parsedColor)) {
      return parsedColor;
    }

    var r = parsedColor[0];
    var g = parsedColor[1];
    var b = parsedColor[2];
    var a = parsedColor[3];
    var int32Color = ((a === undefined ? 0xff000000 : Math.round(a * 255) << 24) | Math.round(r * 255) << 16 | Math.round(g * 255) << 8 | Math.round(b * 255)) >>> 0;
    return integerColor(int32Color);
  }
},14917,[10033]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  "use strict";

  function peg$subclass(child, parent) {
    function ctor() {
      this.constructor = child;
    }

    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function peg$SyntaxError(message, expected, found, location) {
    this.message = message;
    this.expected = expected;
    this.found = found;
    this.location = location;
    this.name = "SyntaxError";

    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, peg$SyntaxError);
    }
  }

  peg$subclass(peg$SyntaxError, Error);

  peg$SyntaxError.buildMessage = function (expected, found) {
    var DESCRIBE_EXPECTATION_FNS = {
      literal: function literal(expectation) {
        return "\"" + literalEscape(expectation.text) + "\"";
      },
      "class": function _class(expectation) {
        var escapedParts = "",
            i;

        for (i = 0; i < expectation.parts.length; i++) {
          escapedParts += expectation.parts[i] instanceof Array ? classEscape(expectation.parts[i][0]) + "-" + classEscape(expectation.parts[i][1]) : classEscape(expectation.parts[i]);
        }

        return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
      },
      any: function any(expectation) {
        return "any character";
      },
      end: function end(expectation) {
        return "end of input";
      },
      other: function other(expectation) {
        return expectation.description;
      }
    };

    function hex(ch) {
      return ch.charCodeAt(0).toString(16).toUpperCase();
    }

    function literalEscape(s) {
      return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\0/g, '\\0').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/[\x00-\x0F]/g, function (ch) {
        return '\\x0' + hex(ch);
      }).replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) {
        return '\\x' + hex(ch);
      });
    }

    function classEscape(s) {
      return s.replace(/\\/g, '\\\\').replace(/\]/g, '\\]').replace(/\^/g, '\\^').replace(/-/g, '\\-').replace(/\0/g, '\\0').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/[\x00-\x0F]/g, function (ch) {
        return '\\x0' + hex(ch);
      }).replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) {
        return '\\x' + hex(ch);
      });
    }

    function describeExpectation(expectation) {
      return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
    }

    function describeExpected(expected) {
      var descriptions = new Array(expected.length),
          i,
          j;

      for (i = 0; i < expected.length; i++) {
        descriptions[i] = describeExpectation(expected[i]);
      }

      descriptions.sort();

      if (descriptions.length > 0) {
        for (i = 1, j = 1; i < descriptions.length; i++) {
          if (descriptions[i - 1] !== descriptions[i]) {
            descriptions[j] = descriptions[i];
            j++;
          }
        }

        descriptions.length = j;
      }

      switch (descriptions.length) {
        case 1:
          return descriptions[0];

        case 2:
          return descriptions[0] + " or " + descriptions[1];

        default:
          return descriptions.slice(0, -1).join(", ") + ", or " + descriptions[descriptions.length - 1];
      }
    }

    function describeFound(found) {
      return found ? "\"" + literalEscape(found) + "\"" : "end of input";
    }

    return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
  };

  function peg$parse(input, options) {
    options = options !== undefined ? options : {};

    var peg$FAILED = {},
        peg$startRuleFunctions = {
      transformList: peg$parsetransformList
    },
        peg$startRuleFunction = peg$parsetransformList,
        peg$c0 = function peg$c0(ts) {
      return ts;
    },
        peg$c1 = function peg$c1(t, ts) {
      return multiply_matrices(t, ts);
    },
        peg$c2 = "matrix",
        peg$c3 = peg$literalExpectation("matrix", false),
        peg$c4 = "(",
        peg$c5 = peg$literalExpectation("(", false),
        peg$c6 = ")",
        peg$c7 = peg$literalExpectation(")", false),
        peg$c8 = function peg$c8(a, b, c, d, e, f) {
      return [a, c, e, b, d, f];
    },
        peg$c9 = "translate",
        peg$c10 = peg$literalExpectation("translate", false),
        peg$c11 = function peg$c11(tx, ty) {
      return [1, 0, tx, 0, 1, ty || 0];
    },
        peg$c12 = "scale",
        peg$c13 = peg$literalExpectation("scale", false),
        peg$c14 = function peg$c14(sx, sy) {
      return [sx, 0, 0, 0, sy === null ? sx : sy, 0];
    },
        peg$c15 = "rotate",
        peg$c16 = peg$literalExpectation("rotate", false),
        peg$c17 = function peg$c17(angle, c) {
      var cos = Math.cos(deg2rad * angle);
      var sin = Math.sin(deg2rad * angle);

      if (c !== null) {
        var x = c[0];
        var y = c[1];
        return [cos, -sin, cos * -x + -sin * -y + x, sin, cos, sin * -x + cos * -y + y];
      }

      return [cos, -sin, 0, sin, cos, 0];
    },
        peg$c18 = "skewX",
        peg$c19 = peg$literalExpectation("skewX", false),
        peg$c20 = function peg$c20(angle) {
      return [1, Math.tan(deg2rad * angle), 0, 0, 1, 0];
    },
        peg$c21 = "skewY",
        peg$c22 = peg$literalExpectation("skewY", false),
        peg$c23 = function peg$c23(angle) {
      return [1, 0, 0, Math.tan(deg2rad * angle), 1, 0];
    },
        peg$c24 = function peg$c24(f) {
      return parseFloat(f.join(""));
    },
        peg$c25 = function peg$c25(i) {
      return parseInt(i.join(""));
    },
        peg$c26 = function peg$c26(n) {
      return n;
    },
        peg$c27 = function peg$c27(n1, n2) {
      return [n1, n2];
    },
        peg$c28 = ",",
        peg$c29 = peg$literalExpectation(",", false),
        peg$c30 = function peg$c30(ds) {
      return ds.join("");
    },
        peg$c31 = function peg$c31(f) {
      return f.join("");
    },
        peg$c32 = function peg$c32(d) {
      return d.join("");
    },
        peg$c33 = peg$otherExpectation("fractionalConstant"),
        peg$c34 = ".",
        peg$c35 = peg$literalExpectation(".", false),
        peg$c36 = function peg$c36(d1, d2) {
      return [d1 ? d1.join("") : null, ".", d2.join("")].join("");
    },
        peg$c37 = /^[eE]/,
        peg$c38 = peg$classExpectation(["e", "E"], false, false),
        peg$c39 = function peg$c39(e) {
      return [e[0], e[1], e[2].join("")].join("");
    },
        peg$c40 = /^[+\-]/,
        peg$c41 = peg$classExpectation(["+", "-"], false, false),
        peg$c42 = /^[0-9]/,
        peg$c43 = peg$classExpectation([["0", "9"]], false, false),
        peg$c44 = /^[ \t\r\n]/,
        peg$c45 = peg$classExpectation([" ", "\t", "\r", "\n"], false, false),
        peg$currPos = 0,
        peg$savedPos = 0,
        peg$posDetailsCache = [{
      line: 1,
      column: 1
    }],
        peg$maxFailPos = 0,
        peg$maxFailExpected = [],
        peg$silentFails = 0,
        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function peg$literalExpectation(text, ignoreCase) {
      return {
        type: "literal",
        text: text,
        ignoreCase: ignoreCase
      };
    }

    function peg$classExpectation(parts, inverted, ignoreCase) {
      return {
        type: "class",
        parts: parts,
        inverted: inverted,
        ignoreCase: ignoreCase
      };
    }

    function peg$endExpectation() {
      return {
        type: "end"
      };
    }

    function peg$otherExpectation(description) {
      return {
        type: "other",
        description: description
      };
    }

    function peg$computePosDetails(pos) {
      var details = peg$posDetailsCache[pos],
          p;

      if (details) {
        return details;
      } else {
        p = pos - 1;

        while (!peg$posDetailsCache[p]) {
          p--;
        }

        details = peg$posDetailsCache[p];
        details = {
          line: details.line,
          column: details.column
        };

        while (p < pos) {
          if (input.charCodeAt(p) === 10) {
            details.line++;
            details.column = 1;
          } else {
            details.column++;
          }

          p++;
        }

        peg$posDetailsCache[pos] = details;
        return details;
      }
    }

    function peg$computeLocation(startPos, endPos) {
      var startPosDetails = peg$computePosDetails(startPos),
          endPosDetails = peg$computePosDetails(endPos);
      return {
        start: {
          offset: startPos,
          line: startPosDetails.line,
          column: startPosDetails.column
        },
        end: {
          offset: endPos,
          line: endPosDetails.line,
          column: endPosDetails.column
        }
      };
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) {
        return;
      }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildSimpleError(message, location) {
      return new peg$SyntaxError(message, null, null, location);
    }

    function peg$buildStructuredError(expected, found, location) {
      return new peg$SyntaxError(peg$SyntaxError.buildMessage(expected, found), expected, found, location);
    }

    function peg$parsetransformList() {
      var s0, s1, s2, s3, s4;
      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsewsp();

      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parsewsp();
      }

      if (s1 !== peg$FAILED) {
        s2 = peg$parsetransforms();

        if (s2 === peg$FAILED) {
          s2 = null;
        }

        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$parsewsp();

          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$parsewsp();
          }

          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c0(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsetransforms() {
      var s0, s1, s2, s3;
      s0 = peg$currPos;
      s1 = peg$parsetransform();

      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsecommaWsp();

        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsecommaWsp();
        }

        if (s2 !== peg$FAILED) {
          s3 = peg$parsetransforms();

          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c1(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 === peg$FAILED) {
        s0 = peg$parsetransform();
      }

      return s0;
    }

    function peg$parsetransform() {
      var s0;
      s0 = peg$parsematrix();

      if (s0 === peg$FAILED) {
        s0 = peg$parsetranslate();

        if (s0 === peg$FAILED) {
          s0 = peg$parsescale();

          if (s0 === peg$FAILED) {
            s0 = peg$parserotate();

            if (s0 === peg$FAILED) {
              s0 = peg$parseskewX();

              if (s0 === peg$FAILED) {
                s0 = peg$parseskewY();
              }
            }
          }
        }
      }

      return s0;
    }

    function peg$parsematrix() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15, s16, s17;
      s0 = peg$currPos;

      if (input.substr(peg$currPos, 6) === peg$c2) {
        s1 = peg$c2;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c3);
        }
      }

      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsewsp();

        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsewsp();
        }

        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 40) {
            s3 = peg$c4;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c5);
            }
          }

          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$parsewsp();

            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$parsewsp();
            }

            if (s4 !== peg$FAILED) {
              s5 = peg$parsenumber();

              if (s5 !== peg$FAILED) {
                s6 = peg$parsecommaWsp();

                if (s6 !== peg$FAILED) {
                  s7 = peg$parsenumber();

                  if (s7 !== peg$FAILED) {
                    s8 = peg$parsecommaWsp();

                    if (s8 !== peg$FAILED) {
                      s9 = peg$parsenumber();

                      if (s9 !== peg$FAILED) {
                        s10 = peg$parsecommaWsp();

                        if (s10 !== peg$FAILED) {
                          s11 = peg$parsenumber();

                          if (s11 !== peg$FAILED) {
                            s12 = peg$parsecommaWsp();

                            if (s12 !== peg$FAILED) {
                              s13 = peg$parsenumber();

                              if (s13 !== peg$FAILED) {
                                s14 = peg$parsecommaWsp();

                                if (s14 !== peg$FAILED) {
                                  s15 = peg$parsenumber();

                                  if (s15 !== peg$FAILED) {
                                    s16 = [];
                                    s17 = peg$parsewsp();

                                    while (s17 !== peg$FAILED) {
                                      s16.push(s17);
                                      s17 = peg$parsewsp();
                                    }

                                    if (s16 !== peg$FAILED) {
                                      if (input.charCodeAt(peg$currPos) === 41) {
                                        s17 = peg$c6;
                                        peg$currPos++;
                                      } else {
                                        s17 = peg$FAILED;

                                        if (peg$silentFails === 0) {
                                          peg$fail(peg$c7);
                                        }
                                      }

                                      if (s17 !== peg$FAILED) {
                                        peg$savedPos = s0;
                                        s1 = peg$c8(s5, s7, s9, s11, s13, s15);
                                        s0 = s1;
                                      } else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                      }
                                    } else {
                                      peg$currPos = s0;
                                      s0 = peg$FAILED;
                                    }
                                  } else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                  }
                                } else {
                                  peg$currPos = s0;
                                  s0 = peg$FAILED;
                                }
                              } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsetranslate() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8;
      s0 = peg$currPos;

      if (input.substr(peg$currPos, 9) === peg$c9) {
        s1 = peg$c9;
        peg$currPos += 9;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c10);
        }
      }

      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsewsp();

        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsewsp();
        }

        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 40) {
            s3 = peg$c4;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c5);
            }
          }

          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$parsewsp();

            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$parsewsp();
            }

            if (s4 !== peg$FAILED) {
              s5 = peg$parsenumber();

              if (s5 !== peg$FAILED) {
                s6 = peg$parsecommaWspNumber();

                if (s6 === peg$FAILED) {
                  s6 = null;
                }

                if (s6 !== peg$FAILED) {
                  s7 = [];
                  s8 = peg$parsewsp();

                  while (s8 !== peg$FAILED) {
                    s7.push(s8);
                    s8 = peg$parsewsp();
                  }

                  if (s7 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s8 = peg$c6;
                      peg$currPos++;
                    } else {
                      s8 = peg$FAILED;

                      if (peg$silentFails === 0) {
                        peg$fail(peg$c7);
                      }
                    }

                    if (s8 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c11(s5, s6);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsescale() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8;
      s0 = peg$currPos;

      if (input.substr(peg$currPos, 5) === peg$c12) {
        s1 = peg$c12;
        peg$currPos += 5;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c13);
        }
      }

      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsewsp();

        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsewsp();
        }

        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 40) {
            s3 = peg$c4;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c5);
            }
          }

          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$parsewsp();

            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$parsewsp();
            }

            if (s4 !== peg$FAILED) {
              s5 = peg$parsenumber();

              if (s5 !== peg$FAILED) {
                s6 = peg$parsecommaWspNumber();

                if (s6 === peg$FAILED) {
                  s6 = null;
                }

                if (s6 !== peg$FAILED) {
                  s7 = [];
                  s8 = peg$parsewsp();

                  while (s8 !== peg$FAILED) {
                    s7.push(s8);
                    s8 = peg$parsewsp();
                  }

                  if (s7 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s8 = peg$c6;
                      peg$currPos++;
                    } else {
                      s8 = peg$FAILED;

                      if (peg$silentFails === 0) {
                        peg$fail(peg$c7);
                      }
                    }

                    if (s8 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c14(s5, s6);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parserotate() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8;
      s0 = peg$currPos;

      if (input.substr(peg$currPos, 6) === peg$c15) {
        s1 = peg$c15;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c16);
        }
      }

      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsewsp();

        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsewsp();
        }

        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 40) {
            s3 = peg$c4;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c5);
            }
          }

          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$parsewsp();

            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$parsewsp();
            }

            if (s4 !== peg$FAILED) {
              s5 = peg$parsenumber();

              if (s5 !== peg$FAILED) {
                s6 = peg$parsecommaWspTwoNumbers();

                if (s6 === peg$FAILED) {
                  s6 = null;
                }

                if (s6 !== peg$FAILED) {
                  s7 = [];
                  s8 = peg$parsewsp();

                  while (s8 !== peg$FAILED) {
                    s7.push(s8);
                    s8 = peg$parsewsp();
                  }

                  if (s7 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s8 = peg$c6;
                      peg$currPos++;
                    } else {
                      s8 = peg$FAILED;

                      if (peg$silentFails === 0) {
                        peg$fail(peg$c7);
                      }
                    }

                    if (s8 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c17(s5, s6);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseskewX() {
      var s0, s1, s2, s3, s4, s5, s6, s7;
      s0 = peg$currPos;

      if (input.substr(peg$currPos, 5) === peg$c18) {
        s1 = peg$c18;
        peg$currPos += 5;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c19);
        }
      }

      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsewsp();

        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsewsp();
        }

        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 40) {
            s3 = peg$c4;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c5);
            }
          }

          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$parsewsp();

            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$parsewsp();
            }

            if (s4 !== peg$FAILED) {
              s5 = peg$parsenumber();

              if (s5 !== peg$FAILED) {
                s6 = [];
                s7 = peg$parsewsp();

                while (s7 !== peg$FAILED) {
                  s6.push(s7);
                  s7 = peg$parsewsp();
                }

                if (s6 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s7 = peg$c6;
                    peg$currPos++;
                  } else {
                    s7 = peg$FAILED;

                    if (peg$silentFails === 0) {
                      peg$fail(peg$c7);
                    }
                  }

                  if (s7 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c20(s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseskewY() {
      var s0, s1, s2, s3, s4, s5, s6, s7;
      s0 = peg$currPos;

      if (input.substr(peg$currPos, 5) === peg$c21) {
        s1 = peg$c21;
        peg$currPos += 5;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c22);
        }
      }

      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsewsp();

        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsewsp();
        }

        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 40) {
            s3 = peg$c4;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c5);
            }
          }

          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$parsewsp();

            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$parsewsp();
            }

            if (s4 !== peg$FAILED) {
              s5 = peg$parsenumber();

              if (s5 !== peg$FAILED) {
                s6 = [];
                s7 = peg$parsewsp();

                while (s7 !== peg$FAILED) {
                  s6.push(s7);
                  s7 = peg$parsewsp();
                }

                if (s6 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s7 = peg$c6;
                    peg$currPos++;
                  } else {
                    s7 = peg$FAILED;

                    if (peg$silentFails === 0) {
                      peg$fail(peg$c7);
                    }
                  }

                  if (s7 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c23(s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsenumber() {
      var s0, s1, s2, s3;
      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$parsesign();

      if (s2 === peg$FAILED) {
        s2 = null;
      }

      if (s2 !== peg$FAILED) {
        s3 = peg$parsefloatingPointConstant();

        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c24(s1);
      }

      s0 = s1;

      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = peg$parsesign();

        if (s2 === peg$FAILED) {
          s2 = null;
        }

        if (s2 !== peg$FAILED) {
          s3 = peg$parseintegerConstant();

          if (s3 !== peg$FAILED) {
            s2 = [s2, s3];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }

        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c25(s1);
        }

        s0 = s1;
      }

      return s0;
    }

    function peg$parsecommaWspNumber() {
      var s0, s1, s2;
      s0 = peg$currPos;
      s1 = peg$parsecommaWsp();

      if (s1 !== peg$FAILED) {
        s2 = peg$parsenumber();

        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c26(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsecommaWspTwoNumbers() {
      var s0, s1, s2, s3, s4;
      s0 = peg$currPos;
      s1 = peg$parsecommaWsp();

      if (s1 !== peg$FAILED) {
        s2 = peg$parsenumber();

        if (s2 !== peg$FAILED) {
          s3 = peg$parsecommaWsp();

          if (s3 !== peg$FAILED) {
            s4 = peg$parsenumber();

            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c27(s2, s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsecommaWsp() {
      var s0, s1, s2, s3, s4;
      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsewsp();

      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parsewsp();
        }
      } else {
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        s2 = peg$parsecomma();

        if (s2 === peg$FAILED) {
          s2 = null;
        }

        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$parsewsp();

          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$parsewsp();
          }

          if (s3 !== peg$FAILED) {
            s1 = [s1, s2, s3];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsecomma();

        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$parsewsp();

          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parsewsp();
          }

          if (s2 !== peg$FAILED) {
            s1 = [s1, s2];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      }

      return s0;
    }

    function peg$parsecomma() {
      var s0;

      if (input.charCodeAt(peg$currPos) === 44) {
        s0 = peg$c28;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c29);
        }
      }

      return s0;
    }

    function peg$parseintegerConstant() {
      var s0, s1;
      s0 = peg$currPos;
      s1 = peg$parsedigitSequence();

      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c30(s1);
      }

      s0 = s1;
      return s0;
    }

    function peg$parsefloatingPointConstant() {
      var s0, s1, s2, s3;
      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$parsefractionalConstant();

      if (s2 !== peg$FAILED) {
        s3 = peg$parseexponent();

        if (s3 === peg$FAILED) {
          s3 = null;
        }

        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c31(s1);
      }

      s0 = s1;

      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = peg$parsedigitSequence();

        if (s2 !== peg$FAILED) {
          s3 = peg$parseexponent();

          if (s3 !== peg$FAILED) {
            s2 = [s2, s3];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }

        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c32(s1);
        }

        s0 = s1;
      }

      return s0;
    }

    function peg$parsefractionalConstant() {
      var s0, s1, s2, s3;
      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsedigitSequence();

      if (s1 === peg$FAILED) {
        s1 = null;
      }

      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 46) {
          s2 = peg$c34;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c35);
          }
        }

        if (s2 !== peg$FAILED) {
          s3 = peg$parsedigitSequence();

          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c36(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsedigitSequence();

        if (s1 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 46) {
            s2 = peg$c34;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c35);
            }
          }

          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c32(s1);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      }

      peg$silentFails--;

      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c33);
        }
      }

      return s0;
    }

    function peg$parseexponent() {
      var s0, s1, s2, s3, s4;
      s0 = peg$currPos;
      s1 = peg$currPos;

      if (peg$c37.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c38);
        }
      }

      if (s2 !== peg$FAILED) {
        s3 = peg$parsesign();

        if (s3 === peg$FAILED) {
          s3 = null;
        }

        if (s3 !== peg$FAILED) {
          s4 = peg$parsedigitSequence();

          if (s4 !== peg$FAILED) {
            s2 = [s2, s3, s4];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c39(s1);
      }

      s0 = s1;
      return s0;
    }

    function peg$parsesign() {
      var s0;

      if (peg$c40.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c41);
        }
      }

      return s0;
    }

    function peg$parsedigitSequence() {
      var s0, s1;
      s0 = [];
      s1 = peg$parsedigit();

      if (s1 !== peg$FAILED) {
        while (s1 !== peg$FAILED) {
          s0.push(s1);
          s1 = peg$parsedigit();
        }
      } else {
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsedigit() {
      var s0;

      if (peg$c42.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c43);
        }
      }

      return s0;
    }

    function peg$parsewsp() {
      var s0;

      if (peg$c44.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c45);
        }
      }

      return s0;
    }

    var deg2rad = Math.PI / 180;

    function multiply_matrices(l, r) {
      var al = l[0];
      var cl = l[1];
      var el = l[2];
      var bl = l[3];
      var dl = l[4];
      var fl = l[5];
      var ar = r[0];
      var cr = r[1];
      var er = r[2];
      var br = r[3];
      var dr = r[4];
      var fr = r[5];
      var a = al * ar + cl * br;
      var c = al * cr + cl * dr;
      var e = al * er + cl * fr + el;
      var b = bl * ar + dl * br;
      var d = bl * cr + dl * dr;
      var f = bl * er + dl * fr + fl;
      return [a, c, e, b, d, f];
    }

    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail(peg$endExpectation());
      }

      throw peg$buildStructuredError(peg$maxFailExpected, peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null, peg$maxFailPos < input.length ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1) : peg$computeLocation(peg$maxFailPos, peg$maxFailPos));
    }
  }

  module.exports = {
    SyntaxError: peg$SyntaxError,
    parse: peg$parse
  };
},14920,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.pickNotNil = pickNotNil;
  exports.idPattern = undefined;

  function pickNotNil(object) {
    var result = {};

    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        var value = object[key];

        if (value !== undefined && value !== null) {
          result[key] = value;
        }
      }
    }

    return result;
  }

  var idPattern = /#([^)]+)\)?$/;
  exports.idPattern = idPattern;
},14923,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _default = {
    objectBoundingBox: 0,
    userSpaceOnUse: 1
  };
  exports.default = _default;
},14926,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _extends2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));

  var _classCallCheck2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));

  var _createClass2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));

  var _possibleConstructorReturn2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));

  var _getPrototypeOf2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));

  var _inherits2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));

  var _react = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));

  var _reactNative = _$$_REQUIRE(_dependencyMap[8]);

  var _extractTransform = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));

  var _extractViewBox = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));

  var _units = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));

  var _Shape2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[12]));

  var Pattern = function (_Shape) {
    (0, _inherits2.default)(Pattern, _Shape);

    function Pattern() {
      (0, _classCallCheck2.default)(this, Pattern);
      return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Pattern).apply(this, arguments));
    }

    (0, _createClass2.default)(Pattern, [{
      key: "render",
      value: function render() {
        var props = this.props;
        var patternTransform = props.patternTransform,
            transform = props.transform,
            id = props.id,
            x = props.x,
            y = props.y,
            width = props.width,
            height = props.height,
            patternUnits = props.patternUnits,
            patternContentUnits = props.patternContentUnits,
            children = props.children,
            viewBox = props.viewBox,
            preserveAspectRatio = props.preserveAspectRatio;
        var matrix = (0, _extractTransform.default)(patternTransform || transform || props);
        return _react.default.createElement(RNSVGPattern, (0, _extends2.default)({
          ref: this.refMethod,
          name: id,
          x: x,
          y: y,
          width: width,
          height: height,
          matrix: matrix,
          patternTransform: matrix,
          patternUnits: _units.default[patternUnits] || 0,
          patternContentUnits: patternContentUnits ? _units.default[patternContentUnits] : 1
        }, (0, _extractViewBox.default)({
          viewBox: viewBox,
          preserveAspectRatio: preserveAspectRatio
        })), children);
      }
    }]);
    return Pattern;
  }(_Shape2.default);

  exports.default = Pattern;
  Pattern.displayName = 'Pattern';
  Pattern.defaultProps = {
    x: '0%',
    y: '0%',
    width: '100%',
    height: '100%'
  };
  var RNSVGPattern = (0, _reactNative.requireNativeComponent)('RNSVGPattern');
},14929,[14305,14344,14320,14323,14371,14377,14386,10297,10033,11554,11644,14926,11497]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[1]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _extends2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));

  var _objectSpread2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));

  var _classCallCheck2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));

  var _createClass2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));

  var _possibleConstructorReturn2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));

  var _getPrototypeOf2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));

  var _inherits2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));

  var _react = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));

  var _reactNative = _$$_REQUIRE(_dependencyMap[10]);

  var _extractTransform = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));

  var _extractProps = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[12]));

  var _units = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[13]));

  var _Shape2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[14]));

  var Mask = function (_Shape) {
    (0, _inherits2.default)(Mask, _Shape);

    function Mask() {
      (0, _classCallCheck2.default)(this, Mask);
      return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Mask).apply(this, arguments));
    }

    (0, _createClass2.default)(Mask, [{
      key: "render",
      value: function render() {
        var props = this.props;
        var maskTransform = props.maskTransform,
            transform = props.transform,
            x = props.x,
            y = props.y,
            width = props.width,
            height = props.height,
            maskUnits = props.maskUnits,
            maskContentUnits = props.maskContentUnits,
            children = props.children;
        return _react.default.createElement(RNSVGMask, (0, _extends2.default)({
          ref: this.refMethod
        }, (0, _extractProps.default)((0, _objectSpread2.default)({}, (0, _extractProps.propsAndStyles)(props), {
          x: null,
          y: null
        }), this), {
          x: x,
          y: y,
          width: width,
          height: height,
          maskTransform: (0, _extractTransform.default)(maskTransform || transform || props),
          maskUnits: maskUnits !== undefined ? _units.default[maskUnits] : 0,
          maskContentUnits: maskContentUnits !== undefined ? _units.default[maskContentUnits] : 1
        }), children);
      }
    }]);
    return Mask;
  }(_Shape2.default);

  exports.default = Mask;
  Mask.displayName = 'Mask';
  Mask.defaultProps = {
    x: '0%',
    y: '0%',
    width: '100%',
    height: '100%'
  };
  var RNSVGMask = (0, _reactNative.requireNativeComponent)('RNSVGMask');
},14932,[14308,14305,14344,14314,14320,14323,14371,14377,14386,10297,10033,11554,11509,14926,11497]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object.keys(descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== undefined) {
      desc.value = desc.initializer ? desc.initializer.call(context) : undefined;
      desc.initializer = undefined;
    }

    if (desc.initializer === undefined) {
      Object.defineProperty(target, property, desc);
      desc = null;
    }

    return desc;
  }

  module.exports = _applyDecoratedDescriptor;
},22393,[]);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var arrayWithHoles = _$$_REQUIRE(_dependencyMap[0]);

  var iterableToArray = _$$_REQUIRE(_dependencyMap[1]);

  var nonIterableRest = _$$_REQUIRE(_dependencyMap[2]);

  function _toArray(arr) {
    return arrayWithHoles(arr) || iterableToArray(arr) || nonIterableRest();
  }

  module.exports = _toArray;
},22396,[14350,14365,14356]);
__r(10120);
__r(10001);