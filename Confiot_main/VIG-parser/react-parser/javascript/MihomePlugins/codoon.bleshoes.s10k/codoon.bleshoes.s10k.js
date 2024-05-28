
__d(function (global, _require, module, exports, _dependencyMap) {
  var _Page = _require(_dependencyMap[0]);

  var _Page2 = babelHelpers.interopRequireDefault(_Page);

  var _miot = _require(_dependencyMap[1]);

  _miot.Package.entry(_Page2.default, function (_) {});
},10001,[10004,10074],"projects/com.codoon.bleshoes.s10k/index.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react = _require(_dependencyMap[0]);

  var _react2 = babelHelpers.interopRequireDefault(_react);

  var _reactNative = _require(_dependencyMap[1]);

  var _reactNavigation = _require(_dependencyMap[2]);

  var _MainPage = _require(_dependencyMap[3]);

  var _MainPage2 = babelHelpers.interopRequireDefault(_MainPage);

  var _MoreMenu = _require(_dependencyMap[4]);

  var _MoreMenu2 = babelHelpers.interopRequireDefault(_MoreMenu);

  var _ui = _require(_dependencyMap[5]);

  var _miot = _require(_dependencyMap[6]);

  var RootStack = (0, _reactNavigation.createStackNavigator)({
    Home: _MainPage2.default,
    moreMenu: _MoreMenu2.default
  }, {
    initialRouteName: "Home",
    navigationOptions: function navigationOptions(_ref) {
      var navigation = _ref.navigation;
      return {
        header: _react2.default.createElement(_ui.TitleBarBlack, {
          title: navigation.state.params ? navigation.state.params.title : "",
          style: {
            backgroundColor: "#fff"
          },
          onPressLeft: function onPressLeft() {
            _miot.Package.exit();

            navigation.goBack();
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

    var _interpolate = interpolate(props),
        first = _interpolate.first,
        last = _interpolate.last;

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
},10004,[10297,10033,10918,10007,10067,10230,10074],"projects/com.codoon.bleshoes.s10k/Page/index.js");
__d(function (global, _require, module, exports, _dependencyMap) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = _require(_dependencyMap[0]);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _reactNative = _require(_dependencyMap[1]);

	var _ui = _require(_dependencyMap[2]);

	var _MHLocalizableString = _require(_dependencyMap[3]);

	var _miot = _require(_dependencyMap[4]);

	var _utils = _require(_dependencyMap[5]);

	var _smartHome = _require(_dependencyMap[6]);

	var _smartHome2 = babelHelpers.interopRequireDefault(_smartHome);

	var _CompHeader = _require(_dependencyMap[7]);

	var _CompHeader2 = babelHelpers.interopRequireDefault(_CompHeader);

	var _CompGPS = _require(_dependencyMap[8]);

	var _CompGPS2 = babelHelpers.interopRequireDefault(_CompGPS);

	var _styles = _require(_dependencyMap[9]);

	var _styles2 = babelHelpers.interopRequireDefault(_styles);

	var width = _reactNative.Dimensions.get('window').width;

	var height = _reactNative.Dimensions.get('window').height;

	var ble = _miot.Device.getBluetoothLE();

	var LICENSE_KEY = 'license-' + _miot.Device.deviceID;
	var STORAGE_KEY = 'storage-' + _miot.Device.deviceID;
	var UUID_SERVICE = '180F';
	var UUID_CHARACTERISTICS = '2A19';
	var UUID_ANDROID_SERVICE = '0000180f-0000-1000-8000-00805f9b34fb';
	var UUID_ANDROID_CHARACTERISTICS = '00002a19-0000-1000-8000-00805f9b34fb';
	var DEVICE_STATUS = {
		CONNECTING: 'connecting',
		CONNECTED: 'connected',
		DISCONNECTED: 'disconnected',
		ASYNC: 'async',
		DONE: 'done'
	};
	var UPLOAD_KEY = {
		'AA910C': '10k_steps_data',
		'BF': '10k_running_data'
	};

	var MainPage = function (_React$Component) {
		babelHelpers.inherits(MainPage, _React$Component);

		function MainPage(props, context) {
			babelHelpers.classCallCheck(this, MainPage);

			var _this = babelHelpers.possibleConstructorReturn(this, (MainPage.__proto__ || Object.getPrototypeOf(MainPage)).call(this, props, context));

			_this.state = {
				isEnable: false,
				mac: _miot.Device.mac,
				device: {
					name: (0, _MHLocalizableString.getString)('device_name'),
					peripheral: {
						state: 'connecting'
					}
				},
				async_state: null,
				total: {
					days: 0,
					m: 0,
					last_async_day: '',
					last_record_date: ''
				},
				data: {
					AAE806: 0,
					AA910C: [],
					BF: []
				}
			};
			_this.hexs = {};
			_this.frames = {};
			_this.mount = false;

			_reactNative.StatusBar.setBarStyle('dark-content');

			{
				_reactNative.StatusBar.setTranslucent(true);
			}
			return _this;
		}

		babelHelpers.createClass(MainPage, [{
			key: "componentWillMount",
			value: function componentWillMount() {
				var _this2 = this;

				this._s0 = _miot.PackageEvent.packageAuthorizationCancel.addListener(function () {
					_miot.Host.storage.set(LICENSE_KEY, false);

					_smartHome2.default.setDeviceData({
						"last_record_date": "",
						"last_async_day": "",
						"days": 0,
						"m": 0
					});

					_this2.state.data['BF'] = [];

					_this2.saveInfo({
						data: babelHelpers.extends({}, _this2.state.data)
					});
				});
				this._s1 = _miot.DeviceEvent.deviceNameChanged.addListener(function (device) {
					_this2.props.navigation.setParams({
						name: device.name
					});

					_this2.forceUpdate();
				});

				_smartHome2.default.getDeviceData().then(function (res) {
					if (res && res[0]) {
						var total = JSON.parse(res[0].value);
						_this2._total = JSON.parse(res[0].value);

						_this2.setSafeState({
							total: total
						});
					}
				});

				_miot.Host.storage.get(LICENSE_KEY).then(function (res) {
					if (!res) {
						var licenseURL = void 0;
						var policyURL = void 0;

						if ((0, _MHLocalizableString.getString)('licenseURL') === 'license_en.codoon') {
							licenseURL = _require(_dependencyMap[10]);
							policyURL = _require(_dependencyMap[11]);
						} else {
							licenseURL = _require(_dependencyMap[12]);
							policyURL = _require(_dependencyMap[13]);
						}

						_miot.Host.ui.openPrivacyLicense('软件许可及服务协议', licenseURL, '隐私协议', policyURL).then(function (res) {
							res && _miot.Host.storage.set(LICENSE_KEY, true);
						}).catch(function (error) {
							console.log(error);
						});
					}
				});
			}
		}, {
			key: "componentDidMount",
			value: function componentDidMount() {
				var _this3 = this;

				this.mount = true;
				this.loadLocalInfo();

				_miot.Bluetooth.checkBluetoothIsEnabled().then(function (res) {
					_this3.state.isEnable = res;

					if (res) {
						_this3.connect();
					} else {
						_reactNative.Alert.alert((0, _MHLocalizableString.getString)('alert'), (0, _MHLocalizableString.getString)('bluetooth_is_not_avaiable'), [{
							text: 'OK',
							onPress: function onPress() {
								return _miot.Package.exit();
							}
						}]);
					}
				});

				this._s2 = _miot.BluetoothEvent.bluetoothSeviceDiscovered.addListener(function (blut, services) {
					if (ble.isConnected) {
						services.forEach(function (s) {
							if (s.UUID === UUID_SERVICE || s.UUID === UUID_ANDROID_SERVICE) {
								s.startDiscoverCharacteristics(UUID_CHARACTERISTICS);
							}
						});
					} else {
						_this3.connect();
					}
				});
				this._s3 = _miot.BluetoothEvent.bluetoothCharacteristicDiscovered.addListener(function (blut, service, characters) {
					if (ble.isConnected) {
						characters.forEach(function (charac) {
							if (charac.UUID === UUID_CHARACTERISTICS || charac.UUID === UUID_ANDROID_CHARACTERISTICS) {
								_this3.charac = charac;
								charac.setNotify(true);

								var activate_cmd = _utils.Request.verifySendCmd('activate');

								var time_cmd = _utils.Request.verifySendCmd('setTime');

								var battery_cmd = _utils.Request.verifySendCmd('getBattery');

								var standby_async_cmd = _utils.Request.verifySendCmd('standbyAsync');

								var step_frames_cmd = _utils.Request.verifySendCmd('getStep_DataFrames');

								charac.write(activate_cmd);
								charac.write(time_cmd);
								charac.write(battery_cmd);
								charac.write(standby_async_cmd);
								charac.write(step_frames_cmd);
							}
						});
					} else {
						_this3.connect();
					}
				});
				this._s4 = _miot.BluetoothEvent.bluetoothCharacteristicValueChanged.addListener(function (blut, service, character, value) {
					if (ble.isConnected) {
						_this3.handle(value.toUpperCase());
					} else {
						_this3.connect();
					}
				});
				this._s6 = _miot.BluetoothEvent.bluetoothConnectionStatusChanged.addListener(function (blut, isConnect) {
					if (!isConnect) {
						_this3.setSafeState({
							async_state: DEVICE_STATUS.DISCONNECTED
						});
					}
				});
			}
		}, {
			key: "componentWillUnmount",
			value: function componentWillUnmount() {
				this.mount = false;

				if (ble.isConnected || !ble.isConnected) {
					ble.disconnect();
				}

				this._s0 && this._s0.remove();
				this._s1 && this._s1.remove();
				this._s2 && this._s2.remove();
				this._s3 && this._s3.remove();
				this._s6 && this._s6.remove();
			}
		}, {
			key: "setSafeState",
			value: function setSafeState(data) {
				this.mount && this.setState(data);
			}
		}, {
			key: "connect",
			value: function connect() {
				var _this4 = this;

				if (this.mount) {
					if (ble.isConnected) {
						console.log("connected");
						ble.startDiscoverServices(UUID_SERVICE);
					} else {
						ble.connect(-1).then(function () {
							console.log("reconnect", ble);

							_this4.setSafeState({
								async_state: 'async'
							});

							ble.startDiscoverServices(UUID_SERVICE);
						}).catch(function (res) {
							console.log("连接 error", res);

							if (res.code === -7) {
								_this4.connect();
							}
						});
					}
				}
			}
		}, {
			key: "handle",
			value: function handle(val) {
				var _this5 = this;

				if (this.hexs[val] === 0) {
					return this.hexs[val] += 1;
				} else if (!this.hexs[val]) {
					this.hexs[val] = 0;
				}

				var res = void 0;

				if (/^AA(8C|E6)03/.test(val)) {
					res = _utils.Response.handlePreResponse(val);
				} else {
					res = _utils.Response.handleResponse(val, this.frames);
				}

				if (res && res.data && res.data.name && res.data.type) {
					if (res.data.frames) {
						var from = '0000';

						var cmd = _utils.Request.verifySendCmd(res.data.name, _utils.Helper.fillZero(from, 4));

						this.frames[res.data.name] = res.data.frames;
						this.charac.write(cmd);
					} else if (res.data.name === 'getStep') {
						var _cmd = _utils.Request.verifySendCmd('getGPS_DataFrames');

						this.charac.write(_cmd);
					} else if (res.data.name === 'getGPS') {
						this.setSafeState({
							async_state: 'async_done'
						});
						setTimeout(function () {
							_this5.setSafeState({
								async_state: 'connected'
							});
						}, 2000);

						var _cmd2 = _utils.Request.verifySendCmd('cleanData');

						this.charac.write(_cmd2);
					}
				} else if (res && res.next) {
					var _cmd3 = _utils.Request.verifySendCmd(res.name, res.next_frames_from);

					this.charac.write(_cmd3);
				} else if (res) {
					if (res.name === 'getGPS') {
						this.setSafeState({
							async_state: 'async_done'
						});
						setTimeout(function () {
							_this5.setSafeState({
								async_state: 'connected'
							});
						}, 2000);

						var _cmd4 = _utils.Request.verifySendCmd('cleanData');

						this.charac.write(_cmd4);
					} else if (res.name === 'getStep') {
						var _cmd5 = _utils.Request.verifySendCmd('getGPS_DataFrames');

						this.charac.write(_cmd5);
					}
				}

				var data = this.state.data;

				if (res && res.data && !res.data.name) {
					if (res.name === 'getStep') {
						data['AA910C'] = data['AA910C'].concat(res.data['AA910C']);
					} else if (res.name === 'getGPS') {
						data['BF'] = data['BF'].concat(res.data['BF']);
					} else {
						data = babelHelpers.extends({}, data, res.data);
					}

					this.setSafeState({
						data: data
					});
					this.recordData(res);
				}
			}
		}, {
			key: "recordData",
			value: function recordData(_ref) {
				var _this6 = this;

				var key = _ref.key,
				    data = _ref.data;

				var cur_day = _utils.Helper.formatDate().substr(0, 10);

				var _mac = this.state.mac.split(':').reverse().join(':');

				if (key === 'BF') {
					var total = void 0;
					var _state$total = this.state.total,
					    days = _state$total.days,
					    m = _state$total.m,
					    last_async_day = _state$total.last_async_day,
					    last_record_date = _state$total.last_record_date;
					data[key].map(function (record) {
						var end_time = record.end_time.substr(0, 10);
						var isAdd = last_async_day ? new Date(last_async_day) < new Date(end_time) : true;
						total = {
							days: isAdd ? days + 1 : days,
							m: last_record_date !== record.end_time && record.total_length ? m + record.total_length / 10 : m,
							last_async_day: isAdd ? end_time : last_async_day,
							last_record_date: record.end_time
						};

						_this6.uploadHexData(key, {
							"mac": _mac || '',
							"product_id": _utils.Helper.getProductId(_mac),
							"hex": record.hex
						}, total);

						days = total.days;
						last_record_date = total.last_record_date;
						last_async_day = total.last_async_day;
					});
					this.setSafeState({
						total: total
					});
					this.saveInfo({
						data: babelHelpers.extends({}, this.state.data)
					});
				} else if (key === 'AA910C') {
					data[key] = data[key].filter(function (record) {
						_this6.uploadHexData(key, {
							"mac": _mac,
							"product_id": _utils.Helper.getProductId(_mac),
							"hex": record.hex
						});

						if (record.recently_time.startsWith(cur_day)) {
							return record;
						}
					});
					this.state.data[key] = this.state.data[key].filter(function (f) {
						if (f.recently_time.startsWith(cur_day)) {
							return f;
						}
					});
					this.saveInfo({
						data: babelHelpers.extends({}, this.state.data)
					});
				}
			}
		}, {
			key: "uploadHexData",
			value: function uploadHexData(key, value, total) {
				if (!UPLOAD_KEY[key]) return;
				if (!value) return;

				_smartHome2.default.reportRecords(UPLOAD_KEY[key], value);

				if (!total || this._total && this._total.days === total.days) {
					return;
				}

				_smartHome2.default.setDeviceData(total);
			}
		}, {
			key: "saveInfo",
			value: function saveInfo(data) {
				var info;
				return regeneratorRuntime.async(function saveInfo$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								if (data) {
									_context.next = 2;
									break;
								}

								return _context.abrupt("return");

							case 2:
								_context.next = 4;
								return regeneratorRuntime.awrap(_miot.Host.storage.get(STORAGE_KEY));

							case 4:
								_context.t0 = _context.sent;

								if (_context.t0) {
									_context.next = 7;
									break;
								}

								_context.t0 = {};

							case 7:
								info = _context.t0;
								console.log('info', info);

								_miot.Host.storage.set(STORAGE_KEY, babelHelpers.extends({}, info, data));

							case 10:
							case "end":
								return _context.stop();
						}
					}
				}, null, this);
			}
		}, {
			key: "loadLocalInfo",
			value: function loadLocalInfo() {
				var info;
				return regeneratorRuntime.async(function loadLocalInfo$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								_context2.next = 2;
								return regeneratorRuntime.awrap(_miot.Host.storage.get(STORAGE_KEY));

							case 2:
								info = _context2.sent;
								console.log('本地存储信息: ', info);

								if (info) {
									this.setSafeState(info);
								}

							case 5:
							case "end":
								return _context2.stop();
						}
					}
				}, null, this);
			}
		}, {
			key: "renderDataCard",
			value: function renderDataCard() {
				var _state$data$BF = this.state.data.BF,
				    BF = _state$data$BF === undefined ? [] : _state$data$BF;

				if (BF && BF.length) {
					var record = BF[BF.length - 1];
					return _react2.default.createElement(_CompGPS2.default, {
						record: record
					});
				}

				return null;
			}
		}, {
			key: "render",
			value: function render() {
				return _react2.default.createElement(
					_reactNative.View,
					{
						style: _styles2.default.container
					},
					_react2.default.createElement(
						_reactNative.ScrollView,
						{
							style: _styles2.default.scrollView,
							overScrollMode: 'auto',
							alwaysBounceVertical: true
						},
						_react2.default.createElement(_CompHeader2.default, {
							data: this.state
						}),
						this.renderDataCard('sport')
					)
				);
			}
		}]);
		return MainPage;
	}(_react2.default.Component);

	MainPage.navigationOptions = function (_ref2) {
		var navigation = _ref2.navigation;
		return {
			header: _react2.default.createElement(
				_reactNative.View,
				null,
				_react2.default.createElement(_ui.TitleBarBlack, {
					title: navigation.state["params"] ? navigation.state.params.name : _miot.Device.name,
					style: {
						backgroundColor: '#fff'
					},
					onPressLeft: function onPressLeft() {
						_miot.Package.exit();
					},
					onPressRight: function onPressRight() {
						{
							navigation.navigate('moreMenu', {
								'title': '设置'
							});
						}
					}
				})
			)
		};
	};

	exports.default = MainPage;
},10007,[10297,10033,10230,10010,10074,10016,10037,10040,10049,10043,10055,10058,10061,10064],"projects/com.codoon.bleshoes.s10k/Page/MainPage.js");
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

  _require(_dependencyMap[5]);

  _require(_dependencyMap[6]);

  var strings = exports.strings = {
    'en': {
      setting: 'setting',
      featureSetting: 'Shortcut settings',
      commonSetting: 'Common settings',
      deviceName: 'Device name',
      securitySettings: 'Security settings',
      helpPage: 'Help Page',
      showLicenseAndPolicy: 'Show User Agreement & Privacy Policy',
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
      licenseURL: 'license_en.codoon',
      policyURL: 'privacy_en.codoon',
      0: 'running',
      modify_device_name: 'Modify device name',
      disconnect: 'Disconnect',
      feedback: 'Feedback',
      bluetooth_disconnect: 'Bluetooth disconnected',
      motion_introduction: 'Sport function Introduction',
      introduction: 'Introduction',
      introduction_1: 'CODOON smart chip has a data storage function, and can record and store motion data without the phone.',
      introduction_2: 'When running, the recording will be automatically turned on, the recording will be automatically ended when the running is stopped, and the recording will not include the GPS track.',
      introduction_3: 'In order to ensure that your data will not be lost, it is recommended to download CODOON APP and bind smart running shoes in CODOON.',
      timeout: 'Connection timeout, please try again',
      alert: 'note',
      compatible: 'The chip is not compatible with the Mijia App. Please use the Codoon App to sync data.',
      bluetooth_is_not_avaiable: 'Bluetooth is not available, please turn on Bluetooth and then link!',
      connecting: 'connecting...',
      connected: 'connected',
      disconnected: 'disconnected',
      async: 'updating...',
      async_done: 'updated',
      upload: 'uploading...',
      upload_done: 'upload completed',
      device_name: "CODOOON RUNNER 10K",
      total_desc: "Total Activity",
      day: "day",
      KM: "KM",
      km: "km",
      battery: "Battery",
      Steps: "Today's Steps",
      steps: "steps",
      lastSport: "Last Activity",
      month: "/",
      date: "/",
      swimming: "swimming",
      duration: "duration",
      calorie: "calorie",
      avg_heartrate: 'avg heartrate',
      avg_pace: 'avg pace',
      m_avg_pace: '100m avg speed'
    },
    'zh': {
      setting: '设置',
      featureSetting: '功能设置',
      commonSetting: '通用设置',
      deviceName: '设备名称',
      securitySettings: '安全设置',
      helpPage: '常见问题',
      showLicenseAndPolicy: '查看条款和隐私政策',
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
      licenseURL: 'license_zh.codoon',
      policyURL: 'privacy_zh.codoon',
      0: '跑步',
      modify_device_name: '修改设备名称',
      disconnect: '解除连接',
      feedback: '问题反馈',
      bluetooth_disconnect: '连蓝牙设备已断开连接',
      motion_introduction: '运动功能介绍',
      introduction: '介绍',
      introduction_1: '跑鞋智能芯片具备数据存储功能，运动时不带手机，仍可以记录并存储运动数据。',
      introduction_2: '跑步时，将自动开启记录，停止跑步时自动结束记录，记录不含GPS轨迹。',
      introduction_3: '为了保证您的数据不会丢失，建议下载咕咚APP，并在咕咚里绑定智能跑鞋。',
      timeout: '连接超时，请重试',
      alert: '提示',
      compatible: '该芯片不支持通过米家同步运动数据，请使用咕咚APP同步。',
      bluetooth_is_not_avaiable: '蓝牙不可用，请打开蓝牙再连接！',
      connecting: '连接中...',
      connected: '已连接',
      disconnected: '未连接',
      async: '同步中...',
      async_done: '同步成功',
      upload: '上传数据中...',
      upload_done: '上传完成',
      device_name: '咕咚智能跑鞋时尚10K',
      total_desc: "你使用芯片累积运动",
      day: "天",
      KM: "公里",
      km: "公里",
      battery: "电量",
      Steps: "今日步数",
      steps: "步",
      lastSport: "上次运动",
      month: "月",
      date: "日",
      swimming: "游泳",
      duration: "时长",
      calorie: "卡路里",
      avg_heartrate: '平均心率',
      avg_pace: '平均配速',
      m_avg_pace: '百米平均配速'
    },
    'zh-tw': {
      setting: '設置',
      featureSetting: '功能設定',
      commonSetting: '一般設定',
      deviceName: '裝置名稱',
      securitySettings: '安全設定',
      helpPage: '常见问题',
      showLicenseAndPolicy: '查看条款和隐私政策',
      locationManagement: '位置管理',
      shareDevice: '裝置共用',
      ifttt: '自動化',
      firmwareUpgrate: '檢查韌體更新',
      moreSetting: '更多設定',
      addToDesktop: '新增到桌面',
      resetDevice: '重置裝置',
      licenseAndPolicy: '用戶協議和隱私政策',
      licenseURL: 'license_zh.codoon',
      policyURL: 'privacy_zh.codoon',
      0: '跑步',
      setting_download: '下載咕咚APP,使用更多設置功能',
      modify_device_name: '修改設備名稱',
      disconnect: '解除鏈接',
      feedback: '问题反饋',
      bluetooth_disconnect: '連藍牙設備已斷開鏈接',
      motion_introduction: '運動功能介紹',
      introduction: '介紹',
      introduction_1: '跑鞋智能芯片具备数据存储功能，运动时不带手机，仍可以记录并存储运动数据。',
      introduction_2: '跑步时，将自动开启记录，停止跑步时自动结束记录，记录不含GPS轨迹。',
      introduction_3: '为了保证您的数据不会丢失，建议下载咕咚APP，并在咕咚里绑定智能跑鞋。',
      timeout: '連接超時，請重試',
      alert: '提示',
      compatible: '该芯片不支持通过米家同步运动数据，请使用咕咚APP同步。',
      bluetooth_is_not_avaiable: '蓝牙不可用，请打开蓝牙再連接！',
      connecting: '連接中...',
      connected: '已連接',
      disconnected: '未連接',
      async: '同步中...',
      async_done: '同步成功',
      upload: '上傳數據中...',
      upload_done: '上傳完成',
      device_name: '咕咚智能跑鞋时尚10K',
      total_desc: "你使用芯片累計運動",
      day: "天",
      KM: "公里",
      km: "公里",
      battery: "電量",
      Steps: "今日步數",
      steps: "步",
      lastSport: "上次運動",
      month: "月",
      date: "日",
      swimming: "游泳",
      duration: "時長",
      calorie: "卡路里",
      avg_heartrate: '平均心率',
      avg_pace: '平均配速',
      m_avg_pace: '百米平均配速'
    },
    'zh-hk': {
      setting: '設置',
      featureSetting: 'feature setting',
      commonSetting: '一般設定',
      deviceName: '裝置名稱',
      securitySettings: '安全設定',
      helpPage: '常见问题',
      showLicenseAndPolicy: '查看条款和隐私政策',
      locationManagement: '位置管理',
      shareDevice: '裝置共用',
      ifttt: '自動化',
      firmwareUpgrate: '檢查韌體更新',
      moreSetting: '更多設定',
      addToDesktop: '新增到桌面',
      resetDevice: '重置裝置',
      licenseAndPolicy: '用戶協議和隱私政策',
      licenseURL: 'license_zh.codoon',
      policyURL: 'privacy_zh.codoon',
      0: '跑步',
      setting_download: '下載咕咚APP,使用更多設置功能',
      modify_device_name: '修改設備名稱',
      disconnect: '解除鏈接',
      feedback: '问题反饋',
      bluetooth_disconnect: '連藍牙設備已斷開鏈接',
      motion_introduction: '運動功能介紹',
      introduction: '介紹',
      introduction_1: '跑鞋智能芯片具备数据存储功能，运动时不带手机，仍可以记录并存储运动数据。',
      introduction_2: '跑步时，将自动开启记录，停止跑步时自动结束记录，记录不含GPS轨迹。',
      introduction_3: '为了保证您的数据不会丢失，建议下载咕咚APP，并在咕咚里绑定智能跑鞋。',
      timeout: '連接超時，請重試',
      alert: '提示',
      compatible: '该芯片不支持通过米家同步运动数据，请使用咕咚APP同步。',
      bluetooth_is_not_avaiable: '蓝牙不可用，请打开蓝牙再連接！',
      connecting: '連接中...',
      connected: '已連接',
      disconnected: '未連接',
      async: '同步中...',
      async_done: '同步成功',
      upload: '上傳數據中...',
      upload_done: '上傳完成',
      device_name: '咕咚智能跑鞋时尚10K',
      total_desc: "你使用芯片累計運動",
      day: "天",
      KM: "公里",
      km: "公里",
      battery: "電量",
      Steps: "今日步數",
      steps: "步",
      lastSport: "上次運動",
      month: "月",
      date: "日",
      swimming: "游泳",
      duration: "時長",
      calorie: "卡路里",
      avg_heartrate: '平均心率',
      avg_pace: '平均配速',
      m_avg_pace: '百米平均配速'
    },
    'ko': {
      featureSetting: '바로가기 설정',
      commonSetting: '일반 설정',
      deviceName: '기기 이름',
      locationManagement: '위치',
      shareDevice: '기기 공유',
      ifttt: '자동화',
      firmwareUpgrate: '펌웨어 업데이트 확인',
      moreSetting: '추가 설정',
      addToDesktop: '홈 화면에 추가',
      resetDevice: '기기 초기화',
      licenseAndPolicy: '이용 약관 & 개인 정보 보호 정책'
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
},10010,[10013,13591,13582,13669,13672,13675,13678],"projects/com.codoon.bleshoes.s10k/Page/MHLocalizableString.js");
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
},10013,[10074],"projects/com.codoon.bleshoes.s10k/CommonModules/LocalizedStrings.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _helper = _require(_dependencyMap[0]);

  Object.defineProperty(exports, "Helper", {
    enumerable: true,
    get: function get() {
      return babelHelpers.interopRequireDefault(_helper).default;
    }
  });

  var _request = _require(_dependencyMap[1]);

  Object.defineProperty(exports, "Request", {
    enumerable: true,
    get: function get() {
      return babelHelpers.interopRequireDefault(_request).default;
    }
  });

  var _response = _require(_dependencyMap[2]);

  Object.defineProperty(exports, "Response", {
    enumerable: true,
    get: function get() {
      return babelHelpers.interopRequireDefault(_response).default;
    }
  });
},10016,[10019,10022,10025],"projects/com.codoon.bleshoes.s10k/Page/10K/utils/index.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  'use strict';

  function addZero(num) {
    if (typeof num === 'string' && num.length === 1) {
      return "0" + num;
    }

    return num < 10 ? "0" + num : num;
  }

  module.exports = {
    addZero: addZero,
    getProductId: function getProductId(mac) {
      var productType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '182';
      if (!mac || !productType) return '';
      var productId = '';
      var mac_list = mac.split(':');
      productId += productType + "-0-0-0-";
      productId += parseInt(mac_list[0], 16) + "-";
      productId += (parseInt(mac_list[1], 16) << 8) + parseInt(mac_list[2], 16) + "-";
      productId += (parseInt(mac_list[3], 16) << 8) + parseInt(mac_list[4], 16) + "-";
      productId += "" + parseInt(mac_list[5], 16);
      return productId;
    },
    jsCoreDateCreator: function jsCoreDateCreator(dateString) {
      if (!dateString) return;
      var dateParam = dateString.split(/[\s-:]/);
      dateParam[1] = (parseInt(dateParam[1], 10) - 1).toString();
      return new (Function.prototype.bind.apply(Date, [null].concat(babelHelpers.toConsumableArray(dateParam))))();
    },
    transTotalTime: function transTotalTime(time) {
      var hours = addZero(parseInt(time / 3600));
      var minutes = addZero(parseInt(time / 60) - hours * 60);
      var seconds = addZero(time % 60);
      return hours + ":" + minutes + ":" + seconds;
    },
    formatAverageSpeed: function formatAverageSpeed(total_time) {
      var _m = parseInt(total_time / 60);

      var _s = parseInt(total_time - _m * 60);

      return addZero(_m, 2) + "'" + addZero(_s, 2) + "\"";
    },
    fillZero: function fillZero(val, len) {
      return (Array(len).join(0) + val).slice(-len);
    },
    decodeZigZag: function decodeZigZag(i, unit) {
      i = parseInt(i, 2);
      return unit ? (i >> 1 ^ -(i & 1)) * unit : i >> 1 ^ -(i & 1);
    },
    formatDate: function formatDate(time) {
      var date = time ? new Date(time) : new Date();
      var year = date.getFullYear();
      var month = addZero(date.getMonth() + 1);
      var day = addZero(date.getDate());
      var hours = addZero(date.getHours());
      var minutes = addZero(date.getMinutes());
      var seconds = addZero(date.getSeconds());
      return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    },
    hexStrTODate: function hexStrTODate(str) {
      if (!str) return '';
      var year = 2000 + parseInt(str.substr(0, 2), 16);
      var month = addZero(parseInt(str.substr(2, 2), 16));
      var day = addZero(parseInt(str.substr(4, 2), 16));
      var hour = addZero(parseInt(str.substr(6, 2), 16));
      var minute = addZero(parseInt(str.substr(8, 2), 16));
      var second = addZero(parseInt(str.substr(10, 2) || '00', 16));
      return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    },
    hexStr2TODate: function hexStr2TODate(str) {
      if (!str) return '';
      var year = str.substr(0, 4);
      var month = str.substr(4, 2);
      var day = str.substr(6, 2);
      var hour = str.substr(8, 2);
      var minute = str.substr(10, 2);
      var second = str.substr(12, 2) || '00';
      return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    },
    hexStrTOTime: function hexStrTOTime(str) {
      var date = this.hexStrTODate(str);
      return new Date(date).getTime();
    },
    hexStr2ToTime: function hexStr2ToTime(str) {
      var date = this.hexStr2TODate(str);
      return new Date(date).getTime();
    },
    hexStrTOSportData: function hexStrTOSportData(time, i, str) {
      if (!str) return '';
      time = this.formatDate(time + i * 600000);
      var steps = parseInt(str.substr(0, 4), 16);
      var calorie = parseInt(str.substr(4, 4), 16) / 10;
      var meters = parseInt(str.substr(8, 4), 16);
      return {
        time: time,
        steps: steps,
        calorie: calorie,
        meters: meters
      };
    },
    getDataLength: function getDataLength(str) {
      var list = str.substr(0, 11).split(/\s/).reverse();
      var len = 0;
      list.map(function (i, key) {
        if (i && key !== 0) {
          len += i << 8 * key;
        } else if (i && key === 0) {
          len += parseInt(i, 16);
        }
      });
      return len;
    },
    transByteToVal: function transByteToVal(byte, unit) {
      var val = 0;

      if (byte.length % 2 !== 0) {
        console.warn('输入长度应为2的倍数,byte = ' + byte);
        return val;
      } else {
        val = parseInt(byte, 16);
        return val && unit ? (val * unit).toFixed(2) : val;
      }
    }
  };
},10019,[],"projects/com.codoon.bleshoes.s10k/Page/10K/utils/helper.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  'use strict';

  var Helper = _require(_dependencyMap[0]);

  function cleanData() {
    return ['AA', '14', '00'];
  }

  function activate() {
    return ['AA', '41', '00'];
  }

  function setTime() {
    var list = ['AA', '0A', '07'];
    var date = new Date();
    var year = date.getFullYear().toString().substr(-2);
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var week = date.getDay();
    list.push(year.toString());
    list.push(Helper.addZero(month).toString());
    list.push(Helper.addZero(day).toString());
    list.push(Helper.addZero(hours).toString());
    list.push(Helper.addZero(minutes).toString());
    list.push(Helper.addZero(seconds).toString());
    list.push(Helper.addZero(week));
    return list;
  }

  function getBattery() {
    return ['AA', '68', '00'];
  }

  function standbyAsync() {
    return ['AA', '0D', '00'];
  }

  function getStep_DataFrames() {
    return ['AA', '0C', '00'];
  }

  function getGPS_DataFrames() {
    return ['AA', '66', '00'];
  }

  function getStep() {
    return ['AA', '11', '02'];
  }

  function stopRunning() {
    return ['AA', '8B', '00'];
  }

  function getGPS() {
    return ['AA', '67', '02'];
  }

  var fns = {
    activate: activate,
    standbyAsync: standbyAsync,
    stopRunning: stopRunning,
    cleanData: cleanData,
    setTime: setTime,
    getBattery: getBattery,
    getStep_DataFrames: getStep_DataFrames,
    getGPS_DataFrames: getGPS_DataFrames,
    getStep: getStep(),
    getGPS: getGPS()
  };
  module.exports = {
    verifySendCmd: function verifySendCmd(name, from) {
      var list = void 0;
      var code = 0;
      var cmd = '';

      if (typeof fns[name] === 'function') {
        list = fns[name]();
      } else {
        list = fns[name];
        list[3] = from || '0000';
      }

      for (var i = 0; i < list.length; i++) {
        if (typeof list[i] === 'string') {
          if (list[i].length === 4) {
            var _a = list[i].substr(0, 2);

            var _b = list[i].substr(2, 2);

            code = code + parseInt(_a, 16) + parseInt(_b, 16);
            cmd += list[i];
          } else {
            code += parseInt(list[i], 16);
            cmd += list[i];
          }
        } else {
          code += list[i];
          cmd += Helper.addZero(list[i].toString(16));
        }
      }

      cmd += code.toString(16).substr(-2);
      return cmd;
    }
  };
},10022,[10019],"projects/com.codoon.bleshoes.s10k/Page/10K/utils/request.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  'use strict';

  var Helper = _require(_dependencyMap[0]);

  var HandleStep = _require(_dependencyMap[1]);

  var HandleGPS = _require(_dependencyMap[2]);

  var TYPE = {
    '8C': 'getStep',
    'E6': 'getGPS'
  };
  var hexStep = '';
  var hexGPS = '';
  var response = {
    'AAC100': verifyActivateRes,
    'AA04C1': verifyCleanRes,
    'AA8A07': verifyTimeRes,
    'AAE806': verifyBatteryRes,
    'AA910C': verifyStepRes,
    'BF': verifyGPSRes
  };

  function verifyActivateRes(res) {
    return {
      hex: res,
      data: null
    };
  }

  function verifyCleanRes(res) {
    return {
      hex: res,
      data: null
    };
  }

  function verifyTimeRes(res) {
    return {
      hex: res,
      data: null
    };
  }

  function verifyBatteryRes(res) {
    var _res = [];

    _res.push(res.substr(0, 2));

    _res.push(res.substr(2, 2));

    _res.push(res.substr(4, 2));

    _res.push(res.substr(6, 2));

    _res.push(res.substr(8, 2));

    _res.push(res.substr(10, 2));

    _res.push(res.substr(12, 2));

    _res.push(res.substr(14, 2));

    _res.push(res.substr(16, 2));

    _res.push(res.substr(18, 2));

    var __res = 0;
    var len = _res.length;

    for (var i = 0; i < len - 1; i++) {
      __res += parseInt(_res[i], 16);
    }

    __res = __res.toString(16).substr(-2);

    if (__res.toLocaleUpperCase() == _res[len - 1]) {
      return {
        hex: res,
        data: _res
      };
    }

    return false;
  }

  function verifyStepRes(hex, frames) {
    var total_frames = frames[TYPE['8C']];
    var _len = hex.length;
    var cur_frames = parseInt(hex.substr(6, 4), 16) + 1;
    hexStep += hex.substr(10, _len - 12 - 4);

    if (cur_frames < total_frames) {
      if (cur_frames % 16 === 0) {
        return {
          name: TYPE['8C'],
          next: true,
          next_frames_from: Helper.fillZero(cur_frames.toString(16), 4),
          hex: null,
          data: null
        };
      }

      return false;
    } else if (total_frames === cur_frames) {
      var step_json = [];
      var list = hexStep.split('FEFEFEFEFEFE');

      for (var i = 0; i < list.length; i++) {
        if (list[i]) {
          var element = 'FEFEFEFEFEFE' + list[i];
          var bin_step = new HandleStep();
          var steps_json = bin_step.stepBinaryToJSON(element);

          if (steps_json.recently_time) {
            step_json.push(babelHelpers.extends({
              hex: element
            }, steps_json));
          }
        }
      }

      return {
        name: TYPE['8C'],
        next: false,
        next_frames_from: 0,
        hex: '',
        data: step_json
      };
    }
  }

  function verifyGPSRes(hex, frames) {
    var total_frames = frames[TYPE['E6']];
    var _len = hex.length;
    var cur_frames = parseInt(hex.substr(2, 4), 16) + 1;

    if (hex.substr(-6, 4) !== '0000') {
      hexGPS += hex.substr(6, _len - 8);
    } else {
      hexGPS += hex.substr(6, _len - 12);
    }

    if (cur_frames < total_frames) {
      if (cur_frames % 16 === 0) {
        return {
          name: TYPE['E6'],
          next: true,
          next_frames_from: Helper.fillZero(cur_frames.toString(16), 4),
          hex: null,
          data: null
        };
      }

      return false;
    } else if (total_frames === cur_frames) {
      var gps_json = [];
      var list = hexGPS.split('FAFAFAFAFAFAFAFA');

      for (var i = 0; i < list.length; i++) {
        if (list[i]) {
          var element = 'FAFAFAFAFAFAFAFA' + list[i];
          var bin_gps = new HandleGPS();

          if (element.indexOf('FAFAFAFAFAFAFAFA00') !== 0) {
            var json = bin_gps.sportBinaryToJSON(element);

            if (json.start_time) {
              gps_json.push(babelHelpers.extends({
                hex: element
              }, json));
            }
          }
        }
      }

      return {
        name: TYPE['E6'],
        next: false,
        next_framse_from: 0,
        hex: '',
        data: gps_json
      };
    }
  }

  module.exports = {
    handlePreResponse: function handlePreResponse(res) {
      var _res = [];

      _res.push(res.substr(0, 2));

      _res.push(res.substr(2, 2));

      _res.push(res.substr(4, 2));

      _res.push(res.substr(6, 2));

      _res.push(res.substr(8, 2));

      _res.push(res.substr(10, 2));

      _res.push(res.substr(12, 2));

      var __res = 0;
      var len = _res.length;

      for (var i = 0; i < len - 1; i++) {
        __res += parseInt(_res[i], 16);
      }

      __res = __res.toString(16).substr(-2);

      if (__res.toLocaleUpperCase() == _res[len - 1]) {
        return {
          hex: res,
          data: {
            type: _res[1],
            name: TYPE[_res[1]],
            frames: parseInt(_res[4].toString() + _res[5], 16)
          }
        };
      }

      return false;
    },
    handleResponse: function handleResponse(result, frames) {
      var key = result.startsWith('BF') ? 'BF' : result.substr(0, 6);
      var res = response[key] ? response[key](result, frames) : {};
      var hex = res.hex;
      var name = res.name;
      var next = res.next;
      var next_frames_from = res.next_frames_from;
      return res ? {
        key: key,
        name: name,
        hex: hex,
        next: next,
        next_frames_from: next_frames_from,
        data: res.data ? babelHelpers.defineProperty({}, key, res.data) : null
      } : false;
    }
  };
},10025,[10019,10028,10031],"projects/com.codoon.bleshoes.s10k/Page/10K/utils/response.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  'use strict';

  var HELPER = _require(_dependencyMap[0]);

  var HandleBinStep = function () {
    function HandleBinStep() {
      babelHelpers.classCallCheck(this, HandleBinStep);
      this.step_characteristic = 'FEFEFEFEFEFE', this.send_data = {
        recently_time: '',
        total_steps: 0,
        total_meters: 0,
        total_calorie: 0,
        step_segs: []
      };
    }

    babelHelpers.createClass(HandleBinStep, [{
      key: "stepBinaryToJSON",
      value: function stepBinaryToJSON(data) {
        var begin_len = 24;
        var step_len = 12;
        var time = HELPER.hexStr2ToTime(data.substr(12, 12));

        var _original_str = data.substr(begin_len);

        var _original_len = _original_str.length;
        var i = void 0;

        for (i = 0; i < _original_len;) {
          var _item = _original_str.substr(i, step_len);

          if (_item === 'FFFFFFFFFFFF') {
            break;
          }

          if (_item.length === step_len) {
            var step_seg = HELPER.hexStrTOSportData(time, i / 12, _item);
            this.send_data.recently_time = step_seg.time ? step_seg.time : time;
            this.send_data.total_steps += step_seg.steps;
            this.send_data.total_meters += step_seg.meters;
            this.send_data.total_calorie += step_seg.calorie;
            this.send_data.step_segs.push(step_seg);
          }

          i += step_len;
        }

        return this.send_data;
      }
    }]);
    return HandleBinStep;
  }();

  module.exports = HandleBinStep;
},10028,[10019],"projects/com.codoon.bleshoes.s10k/Page/10K/service/handleBin.step.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  'use strict';

  var HELPER = _require(_dependencyMap[0]);

  var HandleBinData = function () {
    function HandleBinData() {
      babelHelpers.classCallCheck(this, HandleBinData);
      this.i = 0;
      this.sportData = {};
      this.data_map = {
        'flag_start': {
          byte_len: 16,
          items: null,
          getVal: function getVal(str) {
            return str;
          }
        },
        'start_time': {
          byte_len: 12,
          items: null,
          getVal: HELPER.getDate
        },
        'detail_list': [{
          name: 'step',
          byte_len: 4,
          getVal: HELPER.transByteToVal
        }, {
          name: 'distance',
          byte_len: 4,
          getVal: HELPER.transByteToVal
        }, {
          name: 'f_step',
          byte_len: 4,
          getVal: HELPER.transByteToVal
        }, {
          name: 'e_step',
          byte_len: 4,
          getVal: HELPER.transByteToVal
        }, {
          name: 'i_step',
          byte_len: 4,
          getVal: HELPER.transByteToVal
        }, {
          name: 'o_step',
          byte_len: 4,
          getVal: HELPER.transByteToVal
        }, {
          name: 'b_force',
          byte_len: 4,
          getVal: HELPER.transByteToVal
        }],
        'total_length': {
          byte_len: 8,
          items: null,
          getVal: HELPER.transByteToVal
        },
        'total_calorie': {
          byte_len: 8,
          items: null,
          getVal: HELPER.transByteToVal
        },
        'sprint': {
          byte_len: 4,
          items: null,
          getVal: HELPER.transByteToVal
        },
        'avg_landing_time': {
          byte_len: 4,
          items: null,
          getVal: HELPER.transByteToVal
        },
        'avg_support_time': {
          byte_len: 4,
          items: null,
          getVal: HELPER.transByteToVal
        },
        'avg_departure_time': {
          byte_len: 4,
          items: null,
          getVal: HELPER.transByteToVal
        },
        'speed0': {
          byte_len: 4,
          items: null,
          getVal: HELPER.transByteToVal
        },
        'speed1​': [{
          byte_len: 4,
          getVal: HELPER.transByteToVal
        }],
        'end_time': {
          byte_len: 16,
          items: null,
          getVal: HELPER.getDate
        }
      };
    }

    babelHelpers.createClass(HandleBinData, [{
      key: "handleItem",
      value: function handleItem(hex, key) {
        var str = hex.substr(this.i, this.data_map[key].byte_len);
        this.i += this.data_map[key].byte_len;
        this.sportData[key] = this.data_map[key].getVal(str);
      }
    }, {
      key: "handleList",
      value: function handleList(hex, key) {
        this.sportData[key] = [];
        key === 'detail_list' ? this.handleDetail(hex, key) : this.handleSpeed(hex, key);
      }
    }, {
      key: "handleDetail",
      value: function handleDetail(hex, key) {
        var _this = this;

        var next = function next() {
          var str = hex.substr(_this.i, 16);

          if (str && /(fc){8}/.test(str.toLowerCase())) {
            _this.i += 16;
            _this.sportData['flag_abstact'] = str;
            return false;
          }

          return true;
        };

        var _loop = function _loop() {
          var item = {};

          _this.data_map[key].map(function (i) {
            var str = hex.substr(_this.i, i.byte_len);
            _this.i += i.byte_len;
            item[i.name] = i.getVal(str);
          });

          _this.sportData[key].push(item);
        };

        do {
          _loop();
        } while (next());
      }
    }, {
      key: "handleSpeed",
      value: function handleSpeed(hex, key) {
        var _this2 = this;

        var next = function next() {
          var str = hex.substr(_this2.i, 16);

          if (str && /^(fb){8}/.test(str.toLowerCase())) {
            _this2.i += 16;
            _this2.sportData['flag_stop'] = str;
            return false;
          }

          return true;
        };

        do {
          var _item = {};
          var i = this.data_map[key][0];
          var str = hex.substr(this.i, i.byte_len);
          this.i += i.byte_len;
          _item = i.getVal(str);
          this.sportData[key].push(_item);
        } while (next());
      }
    }, {
      key: "sportBinaryToJSON",
      value: function sportBinaryToJSON(hex) {
        for (var key in this.data_map) {
          if (this.data_map.hasOwnProperty(key)) {
            Object.prototype.toString.call(this.data_map[key]) === '[object Array]' ? this.handleList(hex, key) : this.handleItem(hex, key);
          }
        }

        return this.sportData;
      }
    }]);
    return HandleBinData;
  }();

  module.exports = HandleBinData;
},10031,[10034],"projects/com.codoon.bleshoes.s10k/Page/10K/service/handleBin.shoes.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  'use strict';

  function addZero(num) {
    if (typeof num === 'string' && num.length === 1) {
      return "0" + num;
    }

    return num < 10 ? "0" + num : num;
  }

  module.exports = {
    getDate: function getDate(str) {
      if (str.length !== 16 && str.endsWith('0000')) {
        console.warn("\u83B7\u53D6\u5F00\u59CB\u3001\u7ED3\u675F\u65F6\u95F4\u5B57\u7B26\u957F\u5EA6\u6709\u8BEF: " + str.length);
      }

      var year = "20" + str.substr(0, 2);
      var month = str.substr(2, 2);
      var day = str.substr(4, 2);
      var hour = str.substr(6, 2);
      var minute = str.substr(8, 2);
      var second = str.substr(10, 2);
      return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    },
    transByteToVal: function transByteToVal(byte, unit) {
      var val = 0;

      if (byte.length % 2 !== 0) {
        console.warn('输入长度应为2的倍数,byte = ' + byte);
        return val;
      } else {
        val = parseInt(byte, 16);
        return val && unit ? (val * unit).toFixed(2) : val;
      }
    }
  };
},10034,[],"projects/com.codoon.bleshoes.s10k/Page/10K/utils/helper.shoes.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  'use strict';

  var _miot = _require(_dependencyMap[0]);

  module.exports = {
    getDeviceData: function getDeviceData() {
      var params = {
        "did": _miot.Device.deviceID,
        "uid": _miot.Service.account.ID,
        "key": 'total',
        "type": "prop",
        "time_start": new Date('2019-01-01').getTime(),
        "time_end": new Date().getTime(),
        "limit": 1
      };
      return _miot.Service.smarthome.getDeviceData(params);
    },
    setDeviceData: function setDeviceData(total) {
      var params = {
        "did": _miot.Device.deviceID,
        "uid": _miot.Service.account.ID,
        "key": "total",
        "type": "prop",
        "time": new Date().getTime(),
        "value": JSON.stringify(total)
      };

      _miot.Service.smarthome.setDeviceData(params);
    },
    reportRecords: function reportRecords(key, value) {
      var params = {
        "type": "event",
        "key": key,
        "value": JSON.stringify(value),
        "timestamp": new Date().getTime()
      };

      _miot.Service.smarthome.reportRecords(_miot.Device.deviceID, params);
    }
  };
},10037,[10074],"projects/com.codoon.bleshoes.s10k/Page/10K/utils/smartHome.js");
__d(function (global, _require, module, exports, _dependencyMap) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = _require(_dependencyMap[0]);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _reactNative = _require(_dependencyMap[1]);

	var _utils = _require(_dependencyMap[2]);

	var _MHLocalizableString = _require(_dependencyMap[3]);

	var _styles = _require(_dependencyMap[4]);

	var _styles2 = babelHelpers.interopRequireDefault(_styles);

	var DEVICE_STATUS = {
		CONNECTING: 'connecting',
		CONNECTED: 'connected',
		DISCONNECTED: 'disconnected',
		ASYNC: 'async',
		DONE: 'done'
	};

	var CompHeader = function (_React$Component) {
		babelHelpers.inherits(CompHeader, _React$Component);

		function CompHeader(props) {
			babelHelpers.classCallCheck(this, CompHeader);
			return babelHelpers.possibleConstructorReturn(this, (CompHeader.__proto__ || Object.getPrototypeOf(CompHeader)).call(this, props));
		}

		babelHelpers.createClass(CompHeader, [{
			key: "download",
			value: function download() {}
		}, {
			key: "renderStep",
			value: function renderStep() {
				var AA910C = this.props.data.data.AA910C;
				if (!AA910C) return null;

				var cur_day = _utils.Helper.formatDate().substr(0, 10);

				var total_steps = 0;
				AA910C.map(function (item) {
					if (item && item.recently_time.startsWith(cur_day)) {
						total_steps += item.total_steps;
					}
				});
				return _react2.default.createElement(
					_reactNative.View,
					null,
					_react2.default.createElement(
						_reactNative.TouchableOpacity,
						{
							onPress: this.download,
							style: _styles2.default.sportCard,
							activeOpacity: 1
						},
						_react2.default.createElement(
							_reactNative.View,
							{
								style: _styles2.default.sportCardInfo
							},
							_react2.default.createElement(_reactNative.Image, {
								style: {
									height: 44,
									width: 44
								},
								source: _require(_dependencyMap[5])
							}),
							_react2.default.createElement(
								_reactNative.View,
								{
									style: _styles2.default.stepCardType
								},
								_react2.default.createElement(
									_reactNative.Text,
									{
										style: _styles2.default.font1
									},
									(0, _MHLocalizableString.getString)('Steps')
								)
							)
						),
						_react2.default.createElement(
							_reactNative.View,
							{
								style: _styles2.default.sportCardNum
							},
							_react2.default.createElement(
								_reactNative.Text,
								{
									style: _styles2.default.sportCardVal
								},
								total_steps
							),
							_react2.default.createElement(
								_reactNative.View,
								{
									style: _styles2.default.sportCardTypeWarper
								},
								_react2.default.createElement(
									_reactNative.Text,
									{
										style: _styles2.default.sportCardValType
									},
									(0, _MHLocalizableString.getString)('steps')
								)
							)
						)
					),
					_react2.default.createElement(_reactNative.View, {
						style: {
							backgroundColor: '#f2f2f2',
							height: 6
						}
					})
				);
			}
		}, {
			key: "render",
			value: function render() {
				var _props$data = this.props.data,
				    mac = _props$data.mac,
				    _props$data$device = _props$data.device,
				    name = _props$data$device.name,
				    state = _props$data$device.peripheral.state,
				    async_state = _props$data.async_state,
				    total = _props$data.total,
				    _props$data$data$AAE = _props$data.data.AAE806,
				    AAE806 = _props$data$data$AAE === undefined ? [] : _props$data$data$AAE;
				var m = +(total.m / 1000).toFixed(4).substr(0, 4);
				var battery = parseInt(AAE806[4], 16) || '';

				var _mac = mac ? mac.split(':').reverse().join('') : null;

				return _react2.default.createElement(
					_reactNative.View,
					null,
					_react2.default.createElement(
						_reactNative.View,
						{
							style: _styles2.default.header
						},
						_react2.default.createElement(
							_reactNative.View,
							{
								style: _styles2.default.headerTip
							},
							_react2.default.createElement(
								_reactNative.Text,
								{
									style: _styles2.default.tipTextDesc
								},
								(0, _MHLocalizableString.getString)('total_desc')
							),
							_react2.default.createElement(
								_reactNative.Text,
								{
									style: _styles2.default.tipTextVal
								},
								total.days,
								" ",
								(0, _MHLocalizableString.getString)('day') === 'day' && total.days != 1 ? (0, _MHLocalizableString.getString)('day') + "s" : (0, _MHLocalizableString.getString)('day')
							)
						),
						_react2.default.createElement(
							_reactNative.View,
							{
								style: _styles2.default.nums
							},
							_react2.default.createElement(
								_reactNative.Text,
								{
									style: _styles2.default.kms
								},
								m
							),
							_react2.default.createElement(
								_reactNative.Text,
								{
									style: _styles2.default.km
								},
								(0, _MHLocalizableString.getString)('KM')
							)
						)
					),
					_react2.default.createElement(
						_reactNative.View,
						{
							style: _styles2.default.card
						},
						_react2.default.createElement(
							_reactNative.View,
							null,
							_react2.default.createElement(_reactNative.Image, {
								style: _styles2.default.watchimage,
								source: {
									uri: 'https://static.home.mi.com/app/image/get/file/developer_1543937123s1mqxhkh.jpg'
								}
							})
						),
						_react2.default.createElement(
							_reactNative.View,
							{
								style: _styles2.default.watchInfo
							},
							_react2.default.createElement(
								_reactNative.Text,
								{
									style: _styles2.default.font1,
									numberOfLines: 1
								},
								name
							),
							_react2.default.createElement(
								_reactNative.Text,
								{
									style: _styles2.default.font2
								},
								"ID ",
								_mac,
								" ",
								(0, _MHLocalizableString.getString)('battery'),
								" ",
								battery,
								"%"
							)
						),
						_react2.default.createElement(
							_reactNative.Text,
							{
								style: [_styles2.default.watchStatus, {
									color: async_state === DEVICE_STATUS.CONNECTED ? '#00bc71' : '#fa6666'
								}]
							},
							(0, _MHLocalizableString.getString)(async_state) || (0, _MHLocalizableString.getString)(state)
						)
					),
					this.renderStep(),
					_react2.default.createElement(_reactNative.View, {
						style: {
							backgroundColor: '#f2f2f2',
							height: 10
						}
					})
				);
			}
		}]);
		return CompHeader;
	}(_react2.default.Component);

	exports.default = CompHeader;
},10040,[10297,10033,10016,10010,10043,10046],"projects/com.codoon.bleshoes.s10k/Page/CompHeader.js");
__d(function (global, _require, module, exports, _dependencyMap) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _reactNative = _require(_dependencyMap[0]);

	var _Dimensions$get = _reactNative.Dimensions.get('window'),
	    screenHeight = _Dimensions$get.height,
	    screenWidth = _Dimensions$get.width;

	var APPBAR_MARGINTOP = 0;
	exports.default = _reactNative.StyleSheet.create({
		container: {
			flex: 1,
			marginTop: APPBAR_MARGINTOP
		},
		scrollView: {
			width: screenWidth
		},
		header: {
			height: 200,
			backgroundColor: '#4cbcf7'
		},
		headerTip: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			marginTop: 22,
			paddingHorizontal: 20
		},
		tipTextDesc: {
			width: 200,
			fontSize: 16,
			color: '#ffffff',
			textAlign: 'left'
		},
		tipTextVal: {
			width: 100,
			fontSize: 16,
			color: '#ffffff',
			textAlign: 'right'
		},
		nums: {
			alignItems: 'center',
			justifyContent: 'center'
		},
		kms: {
			marginTop: 20,
			fontSize: 60,
			fontStyle: 'italic',
			fontWeight: '900',
			color: '#ffffff',
			width: screenWidth,
			textAlign: 'center'
		},
		km: {
			width: screenWidth,
			textAlign: 'center',
			marginTop: 6,
			fontSize: 18,
			color: '#ffffff'
		},
		card: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			marginTop: -20,
			marginLeft: 10,
			paddingHorizontal: 15,
			height: 100,
			width: screenWidth - 20,
			backgroundColor: '#ffffff',
			borderRadius: 4,
			borderColor: '#bebec1',
			borderBottomWidth: 0,
			shadowColor: '#bebec1',
			shadowOffset: {
				width: 1,
				height: 2
			},
			shadowOpacity: 0.12,
			shadowRadius: 2
		},
		watchimage: {
			height: 60,
			width: 60
		},
		watchInfo: {
			width: screenWidth - 24 - 60 - 90,
			height: 45,
			justifyContent: 'space-between',
			alignItems: 'center'
		},
		font1: {
			fontSize: 16,
			color: '#222222'
		},
		font2: {
			fontSize: 12,
			color: '#bebec1',
			width: screenWidth - 24 - 60 - 90,
			textAlign: 'center'
		},
		gpsFont2: {
			fontSize: 12,
			color: '#bebec1'
		},
		watchStatus: {
			width: 80,
			fontSize: 12,
			letterSpacing: 0.2,
			textAlign: 'center'
		},
		desc: {
			marginTop: 22,
			marginBottom: 18,
			paddingHorizontal: 20,
			height: 40,
			justifyContent: 'space-between'
		},
		sportCard: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			height: 100,
			paddingHorizontal: 16
		},
		sportCardInfo: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center'
		},
		stepCardType: {
			justifyContent: 'space-between',
			marginLeft: 12
		},
		sportCardType: {
			height: 38,
			justifyContent: 'space-between',
			marginLeft: 12
		},
		sportCardNum: {
			flexDirection: 'row'
		},
		sportCardVal: {
			fontSize: 24,
			fontStyle: 'italic',
			fontWeight: '900',
			color: '#4d4d4d',
			width: 140,
			paddingRight: 5,
			textAlign: 'right'
		},
		sportCardTypeWarper: {
			justifyContent: 'flex-end',
			alignItems: 'flex-end',
			marginLeft: 6
		},
		sportCardValType: {
			fontSize: 14,
			color: '#bebec1'
		},
		sportCardData: {
			flexDirection: 'row',
			justifyContent: 'space-around',
			paddingTop: 8,
			paddingBottom: 24,
			paddingHorizontal: 22
		},
		sportCardDataWarper: {
			height: 45,
			justifyContent: 'space-between',
			alignItems: 'center'
		},
		partingLineWarper: {
			justifyContent: 'center'
		},
		partingLine: {
			height: 23,
			paddingVertical: 10,
			borderColor: '#e6e6e6',
			borderWidth: 1
		},
		font3: {
			width: parseInt(screenWidth / 3),
			textAlign: 'center',
			fontSize: 22,
			fontWeight: '900',
			fontStyle: 'italic',
			color: '#4d4d4d'
		},
		btn: {
			height: 55,
			justifyContent: 'center',
			alignItems: 'center'
		},
		btnText: {
			fontSize: 16,
			color: '#fa6666'
		}
	});
},10043,[10033],"projects/com.codoon.bleshoes.s10k/Page/styles.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.codoon.bleshoes.s10k/Resources",
    "width": 264,
    "height": 264,
    "scales": [1],
    "hash": "11bb136aff99d328b418e2112d494b49",
    "name": "ic_gpswatch_step",
    "type": "png"
  });
},10046,[10420],"projects/com.codoon.bleshoes.s10k/Resources/ic_gpswatch_step.png");
__d(function (global, _require, module, exports, _dependencyMap) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react = _require(_dependencyMap[0]);

  var _react2 = babelHelpers.interopRequireDefault(_react);

  var _reactNative = _require(_dependencyMap[1]);

  var _utils = _require(_dependencyMap[2]);

  var _MHLocalizableString = _require(_dependencyMap[3]);

  var _styles = _require(_dependencyMap[4]);

  var _styles2 = babelHelpers.interopRequireDefault(_styles);

  var CompGPS = function (_React$Component) {
    babelHelpers.inherits(CompGPS, _React$Component);

    function CompGPS(props) {
      babelHelpers.classCallCheck(this, CompGPS);
      return babelHelpers.possibleConstructorReturn(this, (CompGPS.__proto__ || Object.getPrototypeOf(CompGPS)).call(this, props));
    }

    babelHelpers.createClass(CompGPS, [{
      key: "download",
      value: function download() {
        _reactNative.Alert.alert('更多详细数据和图标，请下载咕咚app查看');
      }
    }, {
      key: "render",
      value: function render() {
        var record = this.props.record;
        var total_length = +(record.total_length / 10000).toFixed(4).substr(0, 4);
        record.total_time = (_utils.Helper.jsCoreDateCreator(record.end_time).getTime() - _utils.Helper.jsCoreDateCreator(record.start_time).getTime()) / 1000 || '';

        var total_time = _utils.Helper.transTotalTime(record.total_time);

        var average_speed = total_length ? _utils.Helper.formatAverageSpeed(record.total_time / record.total_length * 10000) : "00'00\"";
        var total_calorie = +(record.total_calorie / 10).toFixed(2);
        return _react2.default.createElement(
          _reactNative.TouchableOpacity,
          {
            onPress: this.download,
            activeOpacity: 0.9
          },
          _react2.default.createElement(
            _reactNative.View,
            {
              style: _styles2.default.sportCard
            },
            _react2.default.createElement(
              _reactNative.View,
              {
                style: _styles2.default.sportCardInfo
              },
              _react2.default.createElement(_reactNative.Image, {
                style: {
                  height: 44,
                  width: 44
                },
                source: _require(_dependencyMap[5])
              }),
              _react2.default.createElement(
                _reactNative.View,
                {
                  style: _styles2.default.sportCardType
                },
                _react2.default.createElement(
                  _reactNative.Text,
                  {
                    style: _styles2.default.font1
                  },
                  (0, _MHLocalizableString.getString)('lastSport')
                ),
                _react2.default.createElement(
                  _reactNative.Text,
                  {
                    style: _styles2.default.gpsFont2
                  },
                  record.start_time.substr(5, 2),
                  (0, _MHLocalizableString.getString)('month'),
                  record.start_time.substr(8, 2),
                  (0, _MHLocalizableString.getString)('date') == '/' ? '' : (0, _MHLocalizableString.getString)('date'),
                  " ",
                  record.end_time.substr(11, 5),
                  " ",
                  (0, _MHLocalizableString.getString)('0')
                )
              )
            ),
            _react2.default.createElement(
              _reactNative.View,
              {
                style: _styles2.default.sportCardNum
              },
              _react2.default.createElement(
                _reactNative.Text,
                {
                  style: _styles2.default.sportCardVal
                },
                total_length
              ),
              _react2.default.createElement(
                _reactNative.View,
                {
                  style: _styles2.default.sportCardTypeWarper
                },
                _react2.default.createElement(
                  _reactNative.Text,
                  {
                    style: _styles2.default.sportCardValType
                  },
                  (0, _MHLocalizableString.getString)('km')
                )
              )
            )
          ),
          _react2.default.createElement(
            _reactNative.View,
            {
              style: _styles2.default.sportCardData
            },
            _react2.default.createElement(
              _reactNative.View,
              {
                style: _styles2.default.sportCardDataWarper
              },
              _react2.default.createElement(
                _reactNative.Text,
                {
                  style: _styles2.default.font3
                },
                total_time
              ),
              _react2.default.createElement(
                _reactNative.Text,
                {
                  style: _styles2.default.gpsFont2
                },
                (0, _MHLocalizableString.getString)('duration')
              )
            ),
            _react2.default.createElement(
              _reactNative.View,
              {
                style: _styles2.default.partingLineWarper
              },
              _react2.default.createElement(_reactNative.View, {
                style: _styles2.default.partingLine
              })
            ),
            _react2.default.createElement(
              _reactNative.View,
              {
                style: _styles2.default.sportCardDataWarper
              },
              _react2.default.createElement(
                _reactNative.Text,
                {
                  style: _styles2.default.font3
                },
                average_speed
              ),
              _react2.default.createElement(
                _reactNative.Text,
                {
                  style: _styles2.default.gpsFont2
                },
                (0, _MHLocalizableString.getString)('avg_pace')
              )
            ),
            _react2.default.createElement(
              _reactNative.View,
              {
                style: _styles2.default.partingLineWarper
              },
              _react2.default.createElement(_reactNative.View, {
                style: _styles2.default.partingLine
              })
            ),
            _react2.default.createElement(
              _reactNative.View,
              {
                style: _styles2.default.sportCardDataWarper
              },
              _react2.default.createElement(
                _reactNative.Text,
                {
                  style: _styles2.default.font3
                },
                total_calorie
              ),
              _react2.default.createElement(
                _reactNative.Text,
                {
                  style: _styles2.default.gpsFont2
                },
                (0, _MHLocalizableString.getString)('calorie')
              )
            )
          ),
          _react2.default.createElement(_reactNative.View, {
            style: {
              backgroundColor: '#f2f2f2',
              height: 6
            }
          })
        );
      }
    }]);
    return CompGPS;
  }(_react2.default.Component);

  exports.default = CompGPS;
},10049,[10297,10033,10016,10010,10043,10052],"projects/com.codoon.bleshoes.s10k/Page/CompGPS.js");
__d(function (global, _require, module, exports, _dependencyMap) {
	module.exports = _require(_dependencyMap[0]).registerAsset({
		"__packager_asset": true,
		"httpServerLocation": "/assets/projects/com.codoon.bleshoes.s10k/Resources",
		"width": 88,
		"height": 88,
		"scales": [1],
		"hash": "38b863640e086d7cf14d6508947e4c3c",
		"name": "ic_gpswatch_run",
		"type": "png"
	});
},10052,[10420],"projects/com.codoon.bleshoes.s10k/Resources/ic_gpswatch_run.png");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.codoon.bleshoes.s10k/Resources/raw",
    "scales": [1],
    "hash": "f1503878780016b9141526ab517627ed",
    "name": "license_en.codoon",
    "type": "html"
  });
},10055,[10420],"projects/com.codoon.bleshoes.s10k/Resources/raw/license_en.codoon.html");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.codoon.bleshoes.s10k/Resources/raw",
    "scales": [1],
    "hash": "be8328cc4036183df43f66086bcf7114",
    "name": "privacy_en.codoon",
    "type": "html"
  });
},10058,[10420],"projects/com.codoon.bleshoes.s10k/Resources/raw/privacy_en.codoon.html");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.codoon.bleshoes.s10k/Resources/raw",
    "scales": [1],
    "hash": "73599b699900c585c6eb6e26f768fad0",
    "name": "license_zh.codoon",
    "type": "html"
  });
},10061,[10420],"projects/com.codoon.bleshoes.s10k/Resources/raw/license_zh.codoon.html");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.codoon.bleshoes.s10k/Resources/raw",
    "scales": [1],
    "hash": "5685d5385971b48ff9c2c50713934fc3",
    "name": "privacy_zh.codoon",
    "type": "html"
  });
},10064,[10420],"projects/com.codoon.bleshoes.s10k/Resources/raw/privacy_zh.codoon.html");
__d(function (global, _require, module, exports, _dependencyMap) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react = _require(_dependencyMap[0]);

  var _react2 = babelHelpers.interopRequireDefault(_react);

  var _reactNative = _require(_dependencyMap[1]);

  var _MHLocalizableString = _require(_dependencyMap[2]);

  var _miot = _require(_dependencyMap[3]);

  var _ui = _require(_dependencyMap[4]);

  var _Dimensions$get = _reactNative.Dimensions.get('window'),
      screenHeight = _Dimensions$get.height,
      screenWidth = _Dimensions$get.width;

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
      key: "_createMenuData",
      value: function _createMenuData() {
        this._menuData = [{
          'name': (0, _MHLocalizableString.getString)('deviceName'),
          'func': function func() {
            _miot.Host.ui.openChangeDeviceName();
          }
        }, {
          'name': (0, _MHLocalizableString.getString)('securitySettings'),
          'func': function func() {
            _miot.Host.ui.openSecuritySetting();
          }
        }, {
          'name': (0, _MHLocalizableString.getString)('helpPage'),
          'func': function func() {
            _miot.Host.ui.openHelpPage();
          }
        }, {
          'name': (0, _MHLocalizableString.getString)('feedback'),
          'func': function func() {
            _miot.Host.ui.openFeedbackInput();
          }
        }, {
          'name': (0, _MHLocalizableString.getString)('locationManagement'),
          'func': function func() {
            _miot.Host.ui.openRoomManagementPage();
          }
        }, {
          'name': (0, _MHLocalizableString.getString)('addToDesktop'),
          'func': function func() {
            _miot.Host.ui.openAddToDesktopPage();
          }
        }, {
          'name': (0, _MHLocalizableString.getString)('showLicenseAndPolicy'),
          'func': function func() {
            var licenseURL = void 0;
            var policyURL = void 0;

            if ((0, _MHLocalizableString.getString)('licenseURL') === 'license_en.codoon') {
              licenseURL = _require(_dependencyMap[5]);
              policyURL = _require(_dependencyMap[6]);
            } else {
              licenseURL = _require(_dependencyMap[7]);
              policyURL = _require(_dependencyMap[8]);
            }

            _miot.Host.ui.privacyAndProtocolReview('软件许可及服务协议', licenseURL, '隐私协议', policyURL);
          }
        }, {
          'name': (0, _MHLocalizableString.getString)('device_more_activity_unbind'),
          'func': function func() {
            _miot.Host.ui.openDeleteDevice();
          }
        }];
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
            style: {
              flex: 1,
              width: screenWidth,
              height: 52
            },
            activeOpacity: 0.8,
            underlayColor: "#838383",
            onPress: function onPress() {
              return _this2._pressRow(rowID);
            }
          },
          _react2.default.createElement(
            _reactNative.View,
            {
              style: {
                height: 52
              }
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
                rowData
              ),
              _react2.default.createElement(_reactNative.Image, {
                style: styles.subArrow,
                source: _require(_dependencyMap[9])
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
        this._menuData[rowID].func();
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
      marginTop: 0,
      height: 52
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
},10067,[10297,10033,10010,10074,10230,10055,10058,10061,10064,10070],"projects/com.codoon.bleshoes.s10k/Page/MoreMenu.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.codoon.bleshoes.s10k/Resources",
    "width": 22,
    "height": 41,
    "scales": [1],
    "hash": "2a12f112e01f0379378b28ee14a04959",
    "name": "sub_arrow",
    "type": "png"
  });
},10070,[10420],"projects/com.codoon.bleshoes.s10k/Resources/sub_arrow.png");
require(10120);
require(10001);