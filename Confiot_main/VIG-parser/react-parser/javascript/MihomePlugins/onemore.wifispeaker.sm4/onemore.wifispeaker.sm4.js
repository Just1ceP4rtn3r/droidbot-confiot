
__d(function (global, _require, module, exports, _dependencyMap) {
    var _miot = _require(_dependencyMap[0]);

    var _Main = _require(_dependencyMap[1]);

    var _Main2 = babelHelpers.interopRequireDefault(_Main);

    var _SceneMain = _require(_dependencyMap[2]);

    var _SceneMain2 = babelHelpers.interopRequireDefault(_SceneMain);

    _miot.PackageEvent.packageAuthorizationCancel.addListener(function () {
        console.log("packageAuthorizationCancel");

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

    _miot.Package.disableAutoCheckUpgrade = true;
    console.log("package", _miot.Package);

    switch (_miot.Package.entrance) {
        case _miot.Entrance.Scene:
            _miot.Package.entry(_SceneMain2.default, function (_) {});

            break;

        default:
            _miot.Package.entry(_Main2.default, function (_) {});

            break;
    }
},10001,[10074,10004,10070],"projects/com.onemore.xiaomiaibox/index.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react = _require(_dependencyMap[0]);

  var _react2 = babelHelpers.interopRequireDefault(_react);

  var _reactNavigation = _require(_dependencyMap[1]);

  var _MainPage = _require(_dependencyMap[2]);

  var _MainPage2 = babelHelpers.interopRequireDefault(_MainPage);

  var _MoreMenu = _require(_dependencyMap[3]);

  var _MoreMenu2 = babelHelpers.interopRequireDefault(_MoreMenu);

  var _NavigationBar = _require(_dependencyMap[4]);

  var _NavigationBar2 = babelHelpers.interopRequireDefault(_NavigationBar);

  var _CommonSetting = _require(_dependencyMap[5]);

  var _DialogTest = _require(_dependencyMap[6]);

  var _DialogTest2 = babelHelpers.interopRequireDefault(_DialogTest);

  function createRootStack(initPage) {
    return (0, _reactNavigation.createStackNavigator)({
      Home: _MainPage2.default,
      MoreSetting: _CommonSetting.MoreSetting,
      FirmwareUpgrade: _CommonSetting.FirmwareUpgrade,
      moreMenu: _MoreMenu2.default,
      DialogTest: _DialogTest2.default
    }, {
      initialRouteName: 'Home',
      navigationOptions: function navigationOptions(_ref) {
        var navigation = _ref.navigation;
        return {
          header: _react2.default.createElement(_NavigationBar2.default, {
            backgroundColor: "transparent",
            type: _NavigationBar2.default.TYPE.DARK,
            left: [{
              key: _NavigationBar2.default.ICON.BACK,
              onPress: function onPress(_) {
                return navigation.goBack();
              }
            }],
            title: navigation.state.params ? navigation.state.params.title : ''
          })
        };
      }
    });
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
        var RootStack = createRootStack(this.initPage);
        return _react2.default.createElement(RootStack, null);
      }
    }]);
    return App;
  }(_react2.default.Component);

  exports.default = App;
},10004,[10297,10918,10007,10064,10719,10353,10067],"projects/com.onemore.xiaomiaibox/Main/index.js");
__d(function (global, _require, module, exports, _dependencyMap) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = _require(_dependencyMap[0]);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _reactNative = _require(_dependencyMap[1]);

	var _ui = _require(_dependencyMap[2]);

	var _NavigationBar = _require(_dependencyMap[3]);

	var _NavigationBar2 = babelHelpers.interopRequireDefault(_NavigationBar);

	var _MHLocalizableString = _require(_dependencyMap[4]);

	var _miot = _require(_dependencyMap[5]);

	var _ArtWave = _require(_dependencyMap[6]);

	var _ArtWave2 = babelHelpers.interopRequireDefault(_ArtWave);

	var _MHStateSwitch = _require(_dependencyMap[7]);

	var _MHStateSwitch2 = babelHelpers.interopRequireDefault(_MHStateSwitch);

	var _NativeModules = _require(_dependencyMap[8]);

	var _Dimensions$get = _reactNative.Dimensions.get('window'),
	    width = _Dimensions$get.width,
	    height = _Dimensions$get.height;

	var PROPS_KEY = ["speaker_SpeakerVolume", "speaker_SpeakerRate", "speaker_SpeakerMute", "microphone_MicrophoneMute"];
	var mountFlag = true;
	var switchMicrophoneTimerFlag = true;
	var switchPlayStatusTimerFlag = true;
	var changeVolumeTimerFlag = true;

	var MainPage = function (_React$Component) {
		babelHelpers.inherits(MainPage, _React$Component);

		function MainPage(props, context) {
			babelHelpers.classCallCheck(this, MainPage);

			var _this = babelHelpers.possibleConstructorReturn(this, (MainPage.__proto__ || Object.getPrototypeOf(MainPage)).call(this, props, context));

			_this.state = {
				isOnline: true,
				isSpeakerPlaying: 0,
				isSpeakerMute: false,
				speakerVolume: 50,
				isOpenMicroPhone: true,
				volumeStep: 10,
				isNewfirmware: true
			};
			return _this;
		}

		babelHelpers.createClass(MainPage, [{
			key: "componentWillMount",
			value: function componentWillMount() {
				var _this2 = this;

				if (mountFlag) {
					this._deviceNameChangedListener = _miot.DeviceEvent.deviceNameChanged.addListener(function (device) {
						console.log("不要以为你改了名字我就不认识你了", device);

						_this2.props.navigation.setParams({
							name: device.name
						});

						_this2.forceUpdate();
					});
				}
			}
		}, {
			key: "componentWillUnmount",
			value: function componentWillUnmount() {
				this._deviceNameChangedListener.remove();

				this._removeSubscription();

				this.timeout && clearTimeout(this.timeout);
				this.switchMicrophoneTimer && clearTimeout(this.switchMicrophoneTimer);
				this.switchPlayStatusTimer && clearTimeout(this.switchPlayStatusTimer);
				this.changeVolumeTimer && clearTimeout(this.changeVolumeTimer);
			}
		}, {
			key: "componentDidMount",
			value: function componentDidMount() {
				if (mountFlag) {
					mountFlag = false;

					this._checkUserAgreePrivacy();
				} else {
					this._checkDeviceStatus();
				}
			}
		}, {
			key: "render",
			value: function render() {
				var _this3 = this;

				{
					_reactNative.StatusBar.setBackgroundColor('transparent');
				}
				return _react2.default.createElement(
					_reactNative.View,
					{
						style: styles.containerAll
					},
					_react2.default.createElement(_reactNative.StatusBar, {
						barStyle: "light-content"
					}),
					_react2.default.createElement(
						_reactNative.View,
						{
							style: styles.containerAlbumCover
						},
						_react2.default.createElement(_ArtWave2.default, {
							proportion: 0.4,
							surfaceWidth: width,
							stroke: 'white',
							style: {
								backgroundColor: 'transparent'
							},
							isStop: !this.state.isSpeakerPlaying
						})
					),
					_react2.default.createElement(
						_reactNative.View,
						{
							style: styles.containerState
						},
						_react2.default.createElement(
							_reactNative.Text,
							{
								style: styles.stateText
							},
							this.state.isOnline ? _MHLocalizableString.localStrings.deviceOnline : _MHLocalizableString.localStrings.deviceOffline
						)
					),
					_react2.default.createElement(
						_reactNative.View,
						{
							style: styles.microphone
						},
						_react2.default.createElement(_MHStateSwitch2.default, {
							source: _require(_dependencyMap[9]),
							anotherSource: _require(_dependencyMap[10]),
							isStateOne: this.state.isOpenMicroPhone,
							onPress: function onPress() {
								_this3._switchMicrophone(!_this3.state.isOpenMicroPhone);
							},
							style: styles.micSwitch
						})
					),
					_react2.default.createElement(
						_reactNative.View,
						{
							style: styles.containerVolume
						},
						_react2.default.createElement(_ui.ImageButton, {
							source: _require(_dependencyMap[11]),
							highlightedSource: _require(_dependencyMap[12]),
							onPress: function onPress() {
								var value = _this3.state.speakerVolume - _this3.state.volumeStep;

								if (value <= 1) {
									value = 1;
								}

								_this3._changeVolumeOnButton(value);
							},
							style: styles.loudspeaker
						}),
						_react2.default.createElement(_reactNative.Slider, {
							style: styles.slider,
							maximumValue: 100,
							minimumValue: 1,
							value: this.state.speakerVolume,
							step: 1,
							onValueChange: function onValueChange(value) {
								_this3._setTimeoutTochangeVolume(value);
							}
						}),
						_react2.default.createElement(_ui.ImageButton, {
							source: _require(_dependencyMap[13]),
							highlightedSource: _require(_dependencyMap[14]),
							onPress: function onPress() {
								var value = _this3.state.speakerVolume + _this3.state.volumeStep;

								if (value >= 100) {
									value = 100;
								}

								_this3._changeVolumeOnButton(value);
							},
							style: styles.loudspeaker
						})
					),
					_react2.default.createElement(
						_reactNative.View,
						{
							style: styles.switchSong
						},
						_react2.default.createElement(_MHStateSwitch2.default, {
							source: _require(_dependencyMap[15]),
							anotherSource: _require(_dependencyMap[16]),
							isStateOne: this.state.isSpeakerPlaying,
							onPress: function onPress() {
								_this3._switchPlayStatus();
							},
							style: styles.playButton
						})
					)
				);
			}
		}, {
			key: "_checkDeviceStatus",
			value: function _checkDeviceStatus() {
				var isOnline = _miot.Device.isOnline;

				if (!isOnline) {
					this.setState({
						isOnline: false
					});
					return;
				}

				this._pollingDeviceProps();
			}
		}, {
			key: "_checkUserAgreePrivacy",
			value: function _checkUserAgreePrivacy() {
				var _this4 = this;

				var agreementURL = _miot.Host.locale.language === 'zh' ? _require(_dependencyMap[17]) : _require(_dependencyMap[18]);
				var privacyURL = _miot.Host.locale.language === 'zh' ? _require(_dependencyMap[19]) : _require(_dependencyMap[20]);
				var experiencePlanURL = _miot.Host.locale.language === 'zh' ? _require(_dependencyMap[21]) : _require(_dependencyMap[22]);
				var hideAgreement = false;
				var hideUserExperiencePlan = true;
				var options = {
					agreementURL: agreementURL,
					privacyURL: privacyURL,
					experiencePlanURL: experiencePlanURL,
					hideAgreement: hideAgreement,
					hideUserExperiencePlan: hideUserExperiencePlan
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
						_this4._checkDeviceStatus();

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
					console.log('授权错误', err);

					_miot.Package.exit();
				});
			}
		}, {
			key: "_pollingDeviceProps",
			value: function _pollingDeviceProps() {
				var _this5 = this;

				this._getDeviceProps();

				this._deviceStatusListener = _miot.DeviceEvent.deviceReceivedMessages.addListener(function (device, map, res) {
					if (map.has('prop.SpeakerVolume')) {
						_this5.setState({
							speakerVolume: parseInt(map.get('prop.SpeakerVolume'))
						});
					}

					if (map.has('prop.SpeakerRate')) {
						_this5.setState({
							isSpeakerPlaying: parseInt(map.get('prop.SpeakerRate'))
						});
					}

					if (map.has('prop.SpeakerMute')) {
						_this5.setState({
							isSpeakerMute: map.get('prop.SpeakerMute') == 'true' ? true : false
						});
					}

					if (map.has('prop.MicrophoneMute')) {
						_this5.setState({
							isOpenMicroPhone: map.get('prop.MicrophoneMute') == 'true' ? true : false
						});
					}
				});

				_miot.Device.getDeviceWifi().subscribeMessages('prop.SpeakerVolume', 'prop.SpeakerRate', 'prop.SpeakerMute', 'prop.MicrophoneMute').then(function (subcription) {
					console.log('subscribe success');
				}).catch(function (subcription) {
					console.error('subscribe failed');
				});
			}
		}, {
			key: "_getDeviceProps",
			value: function _getDeviceProps() {
				var _this6 = this;

				_miot.Device.getDeviceWifi().loadProperties('speaker_SpeakerVolume', 'speaker_SpeakerRate', 'speaker_SpeakerMute', 'microphone_MicrophoneMute').then(function (map) {
					_this6.setState({
						isOnline: true,
						speakerVolume: map.get('speaker_SpeakerVolume'),
						isSpeakerPlaying: map.get('speaker_SpeakerRate'),
						isSpeakerMute: map.get('speaker_SpeakerMute'),
						isOpenMicroPhone: map.get('microphone_MicrophoneMute')
					});
				}).catch(function (error) {
					return console.error('load properties failed:', error);
				});
			}
		}, {
			key: "_removeSubscription",
			value: function _removeSubscription() {
				if (this._deviceStatusListener) {
					this._deviceStatusListener.remove();
				}
			}
		}, {
			key: "_changeVolumeOnButton",
			value: function _changeVolumeOnButton(value) {
				if (this.state.isOnline == false) return;

				if (changeVolumeTimerFlag == true) {
					changeVolumeTimerFlag = false;
					this.changeVolumeTimer && clearTimeout(this.changeVolumeTimer);
					this.changeVolumeTimer = setTimeout(function () {
						changeVolumeTimerFlag = true;
					}, 1000);

					this._changeVolume(value);
				}
			}
		}, {
			key: "_setTimeoutTochangeVolume",
			value: function _setTimeoutTochangeVolume(value) {
				var _this7 = this;

				if (this.state.isOnline == false) return;

				if (this.timeout) {
					clearTimeout(this.timeout);
					this.timeout = null;
				}

				this.timeout = setTimeout(function () {
					_this7._changeVolume(value);
				}, 500);
			}
		}, {
			key: "_changeVolume",
			value: function _changeVolume(value) {
				var _this8 = this;

				_miot.Device.getDeviceWifi().callMethod("set_speaker_SpeakerVolume", [value]).then(function (res) {
					console.log('set_speaker_SpeakerVolume success');

					_this8.setState({
						speakerVolume: value
					});
				}).catch(function (err) {
					console.log('set_speaker_SpeakerVolume failed');
				});
			}
		}, {
			key: "_switchMicrophone",
			value: function _switchMicrophone(value) {
				var _this9 = this;

				if (this.state.isOnline == false) return;

				if (switchMicrophoneTimerFlag == true) {
					switchMicrophoneTimerFlag = false;
					this.switchMicrophoneTimer && clearTimeout(this.switchMicrophoneTimer);
					this.switchMicrophoneTimer = setTimeout(function () {
						switchMicrophoneTimerFlag = true;
					}, 1000);

					_miot.Device.getDeviceWifi().callMethod("set_microphone_MicrophoneMute", [value]).then(function (res) {
						console.log('set_microphone_MicrophoneMute success');

						_this9.setState({
							isOpenMicroPhone: value
						});
					}).catch(function (err) {
						console.log('set_microphone_MicrophoneMute failed');
					});
				}
			}
		}, {
			key: "_switchPlayStatus",
			value: function _switchPlayStatus() {
				var _this10 = this;

				if (this.state.isOnline == false) return;

				if (switchPlayStatusTimerFlag == true) {
					switchPlayStatusTimerFlag = false;
					this.switchPlayStatusTimer && clearTimeout(this.switchPlayStatusTimer);
					this.switchPlayStatusTimer = setTimeout(function () {
						switchPlayStatusTimerFlag = true;
					}, 1000);
					var value = 1 - this.state.isSpeakerPlaying;

					_miot.Device.getDeviceWifi().callMethod("set_speaker_SpeakerRate", [value]).then(function (res) {
						console.log('set_speaker_SpeakerRate success');

						_this10.setState({
							isSpeakerPlaying: value
						});
					}).catch(function (err) {
						console.log('set_speaker_SpeakerRate failed');
					});
				}
			}
		}]);
		return MainPage;
	}(_react2.default.Component);

	MainPage.navigationOptions = function (_ref) {
		var navigation = _ref.navigation;
		return {
			header: _react2.default.createElement(
				_reactNative.View,
				null,
				_react2.default.createElement(_NavigationBar2.default, {
					backgroundColor: "#232426",
					type: _NavigationBar2.default.TYPE.DARK,
					left: [{
						key: _NavigationBar2.default.ICON.BACK,
						onPress: function onPress(_) {
							return _miot.Package.exit();
						}
					}],
					right: [{
						key: _NavigationBar2.default.ICON.MORE,
						onPress: function onPress(_) {
							return navigation.navigate('moreMenu', {
								'title': (0, _MHLocalizableString.getString)('setting')
							});
						}
					}],
					title: navigation.state["params"] ? navigation.state.params.name : _miot.Device.name
				})
			)
		};
	};

	MainPage.defaultProps = {
		speaker_SpeakerVolume: 0,
		speaker_SpeakerRate: 0,
		speaker_SpeakerMute: false,
		microphone_MicrophoneMute: false
	};
	exports.default = MainPage;

	var styles = _reactNative.StyleSheet.create({
		containerAll: {
			flex: 1,
			flexDirection: 'column',
			backgroundColor: '#232426'
		},
		containerAlbumCover: {
			flex: 2,
			flexDirection: 'column',
			alignSelf: 'stretch',
			justifyContent: 'center'
		},
		containerState: {
			flex: 1,
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center'
		},
		stateText: {
			color: '#fff',
			fontSize: 14
		},
		microphone: {
			flex: 3,
			backgroundColor: 'transparent',
			alignItems: 'center',
			justifyContent: 'center'
		},
		micSwitch: {
			width: 60,
			height: 60,
			alignItems: 'center',
			justifyContent: 'center'
		},
		containerVolume: {
			flex: 1,
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: 'transparent'
		},
		slider: {
			width: width - 96 - 16
		},
		loudspeaker: {
			width: 48,
			height: 48,
			alignItems: 'center',
			tintColor: '#ffffff'
		},
		switchSong: {
			flex: 3,
			marginBottom: 35,
			alignItems: 'center',
			justifyContent: 'center',
			flexDirection: 'row'
		},
		playButton: {
			width: 64,
			height: 64,
			marginHorizontal: 24,
			alignItems: 'center',
			tintColor: '#ffffff'
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
		rowContainer: {
			alignSelf: 'stretch',
			flexDirection: 'row',
			flex: 1
		},
		title: {
			fontSize: 17,
			alignItems: 'center',
			alignSelf: 'center',
			color: '#000000',
			flex: 1,
			marginLeft: 15
		},
		subArrow: {
			width: 9,
			height: 17,
			marginRight: 15,
			alignSelf: 'center'
		},
		separator: {
			height: 0.5,
			alignSelf: 'stretch',
			backgroundColor: '#dddddd',
			marginLeft: 15,
			marginRight: 15
		}
	});
},10007,[10297,10033,10230,10719,10010,10074,10016,10019,10042,10022,10025,10028,10031,10034,10037,10040,10043,10046,10049,10052,10055,10058,10061],"projects/com.onemore.xiaomiaibox/Main/MainPage.js");
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
      NUM_PHOTOS: "You have {numPhotos, plural, =0 {no photos.}=1 {one photo.}other {# photos.}}",
      t1: 'tttttttt',
      t2: ['tl{1}'],
      t3: ['tt{1},{2}', [0, 'zero'], [1, 'one'], [2, 'two,{2}', 1], [function (v) {
        return v > 100;
      }, 'more']],
      t4: {
        t5: [function () {
          return 'akjasdkljflkasdjf';
        }],
        t6: ['yyy{1}']
      },
      setting: 'Settings',
      enterText: 'Please enter the play content',
      enterTextTitle: 'Voice Broadcast',
      instructionsText: 'Enter instructions for Xiao Ai to execute, such as "play news"',
      instructionsTextTitle: 'Custom Instructions',
      showText: 'Chinese and English supported, as well as coma, period, question mark and exclamation mark (full width).',
      executionStyle: 'Silent Execution',
      executionStyleText: 'Xiao Ai will not play text reply when executing instructions.',
      featureSetting: 'Shortcut settings',
      commonSetting: 'Common settings',
      locationManagement: 'Locations',
      shareDevice: 'Share device',
      ifttt: 'Automation',
      firmwareUpgrate: 'Check for firmware updates',
      moreSetting: 'Additional settings',
      addToDesktop: 'Add to Home screen',
      resetDevice: 'Reset device',
      deviceOnline: 'Online',
      deviceOffline: 'Offline',
      entryAuth: 'Manage audio devices',
      licenseAndPolicy: 'User Agreement & Privacy Policy',
      device_more_activity_rename: 'Rename',
      device_more_activity_about: 'About',
      device_more_activity_help: 'Tutorial',
      device_more_activity_firmware_update: 'Check for firmware updates',
      device_more_activity_noti_quick_op: 'Notification center shortcuts',
      device_more_activity_unbind: 'Remove device',
      device_more_activity_security_settings: 'Security settings',
      device_more_activity_feedback: 'Feedback',
      device_more_activity_FAQ: 'FAQ',
      device_more_activity_scence: 'Automation',
      device_more_activity_help_feedback: 'Help',
      device_more_activity_reset: 'Reset',
      device_more_activity_setting: 'Settings',
      device_more_activity_common_setting: 'General settings',
      device_more_activity_network_info: 'Network info',
      OpenLibList: 'open source library test',
      ViewTest: ' test view',
      cancel: "Cancel",
      ok: "OK",
      save: "Save",
      saved: "Saved successfully",
      voiceBroadcast: 'voice control'
    },
    'zh': {
      NUM_PHOTOS: "Usted {numPhotos, plural, =0 {no tiene fotos.}=1 {tiene una foto.}other {tiene # fotos.}}",
      t1: 'tttttttt',
      t2: ['tt{1}'],
      t3: ['tt{1},{2}', [0, 'zero'], [1, 'one'], [2, 'two,{2}', 1], [function (v) {
        return v > 100;
      }, 'more']],
      t4: {
        t5: [function () {
          return 'akjasdkljflkasdjf';
        }],
        t6: ['yyy{1}']
      },
      setting: '设置',
      enterText: '请输入播放内容',
      enterTextTitle: '语音播报',
      instructionsText: '输入让小爱执行的指令，例如：“播放新闻”',
      instructionsTextTitle: '自定义指令',
      showText: '支持输入中文、英文，符号仅支持中文逗号、句号、问号、感叹号。',
      executionStyle: '静默执行',
      executionStyleText: '小爱执行指令时将不播放文字回复',
      featureSetting: '功能设置',
      commonSetting: '通用设置',
      locationManagement: '位置管理',
      shareDevice: '设备共享',
      ifttt: '自动化',
      firmwareUpgrate: '检查固件升级',
      moreSetting: '更多设置',
      addToDesktop: '添加到桌面',
      resetDevice: '重置设备',
      deviceOnline: '设备在线',
      deviceOffline: '设备离线',
      entryAuth: '设备授权管理',
      licenseAndPolicy: '使用条款和隐私政策',
      device_more_activity_rename: '重命名',
      device_more_activity_about: '关于',
      device_more_activity_help: '玩法教程',
      device_more_activity_firmware_update: '检查固件更新',
      device_more_activity_noti_quick_op: '通知中心快捷开关',
      device_more_activity_unbind: '删除设备',
      device_more_activity_security_settings: '安全设置',
      device_more_activity_feedback: '反馈问题',
      device_more_activity_FAQ: '常见问题',
      device_more_activity_reset: '重置',
      device_more_activity_setting: '设置',
      device_more_activity_scence: '智能',
      device_more_activity_help_feedback: '使用帮助',
      device_more_activity_common_setting: '通用设置',
      device_more_activity_network_info: '网络信息',
      home_title: '虚拟设备',
      home_subtitle: '子设备',
      control_demo: ' 控制示例',
      cloud_debug: ' 云端调试',
      my_product: ' 创建自己的产品',
      OpenLibList: ' 第三方库测试',
      ViewTest: ' 常用的 view 测试'
    },
    'zh-tw': {
      NUM_PHOTOS: "You have {numPhotos, plural, =0 {no photos.}=1 {one photo.}other {# photos.}}",
      setting: '設置',
      enterText: '請輸入播放內容',
      enterTextTitle: '語音播報',
      instructionsText: '輸入讓小愛執行的指令，例如：“播放新聞”',
      instructionsTextTitle: '自定義指令',
      showText: '支持輸入中文、英文，符號僅支持中文逗號、句號、問號、感嘆號。',
      executionStyle: '靜默執行',
      executionStyleText: '小愛執行指令時將不播放文字回復',
      featureSetting: '功能設定',
      commonSetting: '一般設定',
      locationManagement: '位置管理',
      shareDevice: '裝置共用',
      ifttt: '自動化',
      firmwareUpgrate: '檢查韌體更新',
      moreSetting: '更多設定',
      addToDesktop: '新增到桌面',
      device_more_activity_unbind: '刪除裝置',
      device_more_activity_security_settings: '安全設置',
      device_more_activity_feedback: '反饋問題',
      device_more_activity_FAQ: '常見問題',
      device_more_activity_help_feedback: '使用幫助',
      device_more_activity_common_setting: '通用設置',
      resetDevice: '重置裝置',
      deviceOnline: '線上裝置',
      deviceOffline: '裝置離線',
      entryAuth: '裝置授權管理',
      licenseAndPolicy: '用戶協議和隱私政策'
    },
    'zh-hk': {
      NUM_PHOTOS: "You have {numPhotos, plural, =0 {no photos.}=1 {one photo.}other {# photos.}}",
      setting: '設置',
      enterText: '請輸入播放內容',
      enterTextTitle: '語音播報',
      instructionsText: '輸入讓小愛執行的指令，例如：“播放新聞”',
      instructionsTextTitle: '自定義指令',
      showText: '支持輸入中文、英文，符號僅支持中文逗號、句號、問號、感嘆號。',
      executionStyle: '靜默執行',
      executionStyleText: '小愛執行指令時將不播放文字回復',
      featureSetting: 'feature setting',
      commonSetting: '一般設定',
      locationManagement: '位置管理',
      shareDevice: '裝置共用',
      ifttt: '自動化',
      firmwareUpgrate: '檢查韌體更新',
      moreSetting: '更多設定',
      addToDesktop: '新增到桌面',
      device_more_activity_unbind: '刪除裝置',
      device_more_activity_security_settings: '安全設置',
      device_more_activity_feedback: '反饋問題',
      device_more_activity_FAQ: '常見問題',
      device_more_activity_help_feedback: '使用幫助',
      device_more_activity_common_setting: '通用設置',
      resetDevice: '重置裝置',
      deviceOnline: '線上裝置',
      deviceOffline: '裝置離線',
      entryAuth: '裝置授權管理',
      licenseAndPolicy: '用戶協議和隱私政策'
    },
    'ko': {
      NUM_PHOTOS: "You have {numPhotos, plural, =0 {no photos.}=1 {one photo.}other {# photos.}}",
      featureSetting: '바로가기 설정',
      commonSetting: '일반 설정',
      locationManagement: '위치',
      shareDevice: '기기 공유',
      ifttt: '자동화',
      firmwareUpgrate: '펌웨어 업데이트 확인',
      moreSetting: '추가 설정',
      addToDesktop: '홈 화면에 추가',
      resetDevice: '기기 초기화',
      deviceOnline: '기기 온라인',
      deviceOffline: '오프라인',
      entryAuth: '오디오 기기 관리',
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
},10010,[10013,13591,13582,13669,13672,13675,13678],"projects/com.onemore.xiaomiaibox/Main/MHLocalizableString.js");
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
},10013,[10074],"projects/com.onemore.xiaomiaibox/CommonModules/LocalizedStrings.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react = _require(_dependencyMap[0]);

  var _react2 = babelHelpers.interopRequireDefault(_react);

  var _reactNative = _require(_dependencyMap[1]);

  var _ReactNativeART = _require(_dependencyMap[2]);

  var ArtWave = function (_React$Component) {
    babelHelpers.inherits(ArtWave, _React$Component);

    function ArtWave(props) {
      babelHelpers.classCallCheck(this, ArtWave);

      var _this = babelHelpers.possibleConstructorReturn(this, (ArtWave.__proto__ || Object.getPrototypeOf(ArtWave)).call(this, props));

      _this.radian = 0;
      _this.isStop = 1;
      _this.proportion = _this.props.proportion;
      _this.surfaceHeigth = _this.props.surfaceHeigth;
      _this.state = {
        moveY: _this.surfaceHeigth * (1 - _this.proportion),
        radian: 0.1
      };
      return _this;
    }

    babelHelpers.createClass(ArtWave, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        if (!this.props.isStop) {
          this._startAnimation();
        }
      }
    }, {
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(nextProps) {
        if (this.isStop == nextProps.isStop) {
          return;
        }

        this.isStop = nextProps.isStop;

        if (this.isStop) {
          this._stopAnimation();
        } else {
          this._startAnimation();
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.intervalTimer && clearTimeout(this.intervalTimer);
      }
    }, {
      key: "_drawWaveView",
      value: function _drawWaveView() {
        if (!this.intervalTimer) {
          return;
        }

        var moveX = 0;
        var moveY = 40 * Math.cos(0 - this.state.radian) + this.state.moveY;
        var linePath = new _ReactNativeART.Path().moveTo(moveX, moveY);

        for (var x = 0; x <= this.props.surfaceWidth / 6; x++) {
          var t = 6 * x / this.props.surfaceWidth;
          var y = 40 * Math.cos(2 * Math.PI * t - this.state.radian) + this.state.moveY;
          linePath.lineTo(x * 6, y);
        }

        return _react2.default.createElement(
          _reactNative.View,
          {
            style: [{
              backgroundColor: this.state.backgroundColor
            }, this.props.style]
          },
          _react2.default.createElement(
            _ReactNativeART.Surface,
            {
              width: this.props.surfaceWidth,
              height: this.surfaceHeigth
            },
            _react2.default.createElement(_ReactNativeART.Shape, {
              d: linePath,
              stroke: "rgba(255,255,255,0.8)",
              strokeWidth: 1
            })
          )
        );
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
              alignItems: 'center',
              backgroundColor: 'rgba(255,255,255,0.0)'
            }
          },
          this._drawWaveView()
        );
      }
    }, {
      key: "_startAnimation",
      value: function _startAnimation() {
        var _this2 = this;

        console.log('Animated start');

        if (this.intervalTimer) {
          return;
        }

        this.intervalTimer = setInterval(function () {
          _this2.radian += 0.1;

          _this2.setState({
            radian: _this2.radian
          });

          if (_this2.radian >= 2 * Math.PI) {
            _this2.radian = 0;
          }
        }, 20);
      }
    }, {
      key: "_stopAnimation",
      value: function _stopAnimation() {
        console.log('Animated stop');
        this.intervalTimer && clearInterval(this.intervalTimer);
        this.intervalTimer = null;
      }
    }]);
    return ArtWave;
  }(_react2.default.Component);

  ArtWave.defaultProps = {
    proportion: 0.3,
    surfaceWidth: 300,
    surfaceHeigth: 120,
    backgroundColor: 'black',
    stroke: 'white',
    strokeWidth: 2
  };
  exports.default = ArtWave;
},10016,[10297,10033,10462],"projects/com.onemore.xiaomiaibox/Main/ArtWave.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react = _require(_dependencyMap[0]);

  var _react2 = babelHelpers.interopRequireDefault(_react);

  var _reactNative = _require(_dependencyMap[1]);

  var _propTypes = _require(_dependencyMap[2]);

  var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

  var propTypes = {
    onPress: _propTypes2.default.func
  };

  var MHStateSwitch = function (_React$Component) {
    babelHelpers.inherits(MHStateSwitch, _React$Component);

    function MHStateSwitch() {
      babelHelpers.classCallCheck(this, MHStateSwitch);
      return babelHelpers.possibleConstructorReturn(this, (MHStateSwitch.__proto__ || Object.getPrototypeOf(MHStateSwitch)).apply(this, arguments));
    }

    babelHelpers.createClass(MHStateSwitch, [{
      key: "_changeState",
      value: function _changeState() {}
    }, {
      key: "render",
      value: function render() {
        var source;

        if (this.props.isStateOne) {
          source = this.props.source;
        } else {
          source = this.props.anotherSource;
        }

        return _react2.default.createElement(
          _reactNative.TouchableWithoutFeedback,
          {
            onPress: this.props.onPress
          },
          _react2.default.createElement(_reactNative.Image, {
            style: this.props.style,
            source: source
          })
        );
      }
    }]);
    return MHStateSwitch;
  }(_react2.default.Component);

  MHStateSwitch.propTypes = propTypes;
  MHStateSwitch.initialState = {};
  MHStateSwitch.defaultProps = {
    image: null,
    highlightedImage: null,
    onPress: null,
    isStateOne: true
  };
  exports.default = MHStateSwitch;
},10019,[10297,10033,10318],"projects/com.onemore.xiaomiaibox/Main/MHStateSwitch.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.onemore.xiaomiaibox/Resources",
    "width": 168,
    "height": 168,
    "scales": [1],
    "hash": "9e380937d8ae6406de6761be9a8c6573",
    "name": "icon_voice_pre",
    "type": "png"
  });
},10022,[10420],"projects/com.onemore.xiaomiaibox/Resources/icon_voice_pre.png");
__d(function (global, _require, module, exports, _dependencyMap) {
	module.exports = _require(_dependencyMap[0]).registerAsset({
		"__packager_asset": true,
		"httpServerLocation": "/assets/projects/com.onemore.xiaomiaibox/Resources",
		"width": 168,
		"height": 168,
		"scales": [1],
		"hash": "50e6273b52c7574fcef37b5e318c20f7",
		"name": "icon_voice_nor",
		"type": "png"
	});
},10025,[10420],"projects/com.onemore.xiaomiaibox/Resources/icon_voice_nor.png");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.onemore.xiaomiaibox/Resources",
    "width": 114,
    "height": 114,
    "scales": [1],
    "hash": "4be6c534b09e4c82d6ec812aae10ee08",
    "name": "icon_vol_-_pre",
    "type": "png"
  });
},10028,[10420],"projects/com.onemore.xiaomiaibox/Resources/icon_vol_-_pre.png");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.onemore.xiaomiaibox/Resources",
    "width": 114,
    "height": 114,
    "scales": [1],
    "hash": "04cd94b91cc53198acc705bd17fc165c",
    "name": "icon_vol_-_nor",
    "type": "png"
  });
},10031,[10420],"projects/com.onemore.xiaomiaibox/Resources/icon_vol_-_nor.png");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.onemore.xiaomiaibox/Resources",
    "width": 114,
    "height": 114,
    "scales": [1],
    "hash": "9bae91ef38f3003800c346e0cab77065",
    "name": "icon_vol_+_pre",
    "type": "png"
  });
},10034,[10420],"projects/com.onemore.xiaomiaibox/Resources/icon_vol_+_pre.png");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.onemore.xiaomiaibox/Resources",
    "width": 114,
    "height": 114,
    "scales": [1],
    "hash": "7c6882ca5894e1555600f6b8f3f78ee8",
    "name": "icon_vol_+_nor",
    "type": "png"
  });
},10037,[10420],"projects/com.onemore.xiaomiaibox/Resources/icon_vol_+_nor.png");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.onemore.xiaomiaibox/Resources",
    "width": 168,
    "height": 168,
    "scales": [1],
    "hash": "58ef36a270fa477af9f5a964bde288a6",
    "name": "icon_pause_nor",
    "type": "png"
  });
},10040,[10420],"projects/com.onemore.xiaomiaibox/Resources/icon_pause_nor.png");
__d(function (global, _require, module, exports, _dependencyMap) {
  module.exports = _require(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.onemore.xiaomiaibox/Resources",
    "width": 168,
    "height": 168,
    "scales": [1],
    "hash": "d4dc336e1c4de2a0b050cb58a0f4de7d",
    "name": "icon_play_nor",
    "type": "png"
  });
},10043,[10420],"projects/com.onemore.xiaomiaibox/Resources/icon_play_nor.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.onemore.xiaomiaibox/Resources/raw",
        "scales": [1],
        "hash": "9ef7e589861fe250aefb9a6d97147745",
        "name": "UserAgreement",
        "type": "html"
    });
},10046,[10420],"projects/com.onemore.xiaomiaibox/Resources/raw/UserAgreement.html");
__d(function (global, _require, module, exports, _dependencyMap) {
				module.exports = _require(_dependencyMap[0]).registerAsset({
								"__packager_asset": true,
								"httpServerLocation": "/assets/projects/com.onemore.xiaomiaibox/Resources/raw",
								"scales": [1],
								"hash": "4cc26acad65fab81383a65273e9b09fc",
								"name": "UserAgreement_en",
								"type": "html"
				});
},10049,[10420],"projects/com.onemore.xiaomiaibox/Resources/raw/UserAgreement_en.html");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.onemore.xiaomiaibox/Resources/raw",
        "scales": [1],
        "hash": "fbec975f4babd28ac76726ff239b41b8",
        "name": "PrivacyPolicy",
        "type": "html"
    });
},10052,[10420],"projects/com.onemore.xiaomiaibox/Resources/raw/PrivacyPolicy.html");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.onemore.xiaomiaibox/Resources/raw",
        "scales": [1],
        "hash": "8b322b1b3b851cf6fe7f249f289aa73b",
        "name": "PrivacyPolicy_en",
        "type": "html"
    });
},10055,[10420],"projects/com.onemore.xiaomiaibox/Resources/raw/PrivacyPolicy_en.html");
__d(function (global, _require, module, exports, _dependencyMap) {
				module.exports = _require(_dependencyMap[0]).registerAsset({
								"__packager_asset": true,
								"httpServerLocation": "/assets/projects/com.onemore.xiaomiaibox/Resources/raw",
								"scales": [1],
								"hash": "4ff11547a21312e66c8d865c168f7da6",
								"name": "UserExperienceProgram",
								"type": "html"
				});
},10058,[10420],"projects/com.onemore.xiaomiaibox/Resources/raw/UserExperienceProgram.html");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.onemore.xiaomiaibox/Resources/raw",
        "scales": [1],
        "hash": "cd4c3da4c6f6b436b6da7f4953b904d0",
        "name": "UserExperienceProgram_en",
        "type": "html"
    });
},10061,[10420],"projects/com.onemore.xiaomiaibox/Resources/raw/UserExperienceProgram_en.html");
__d(function (global, _require, module, exports, _dependencyMap) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _miot = _require(_dependencyMap[0]);

  var _NavigationBar = _require(_dependencyMap[1]);

  var _NavigationBar2 = babelHelpers.interopRequireDefault(_NavigationBar);

  var _CommonSetting = _require(_dependencyMap[2]);

  var _CommonSetting2 = _require(_dependencyMap[3]);

  var _react = _require(_dependencyMap[4]);

  var _react2 = babelHelpers.interopRequireDefault(_react);

  var _reactNative = _require(_dependencyMap[5]);

  var BUTTONS = ['测试对话框', '确定'];

  var MoreMenu = function (_React$Component) {
    babelHelpers.inherits(MoreMenu, _React$Component);

    function MoreMenu() {
      babelHelpers.classCallCheck(this, MoreMenu);
      return babelHelpers.possibleConstructorReturn(this, (MoreMenu.__proto__ || Object.getPrototypeOf(MoreMenu)).apply(this, arguments));
    }

    babelHelpers.createClass(MoreMenu, [{
      key: "render",
      value: function render() {
        var first_options = _CommonSetting.SETTING_KEYS.first_options,
            second_options = _CommonSetting.SETTING_KEYS.second_options;
        var firstOptions = [first_options.SHARE, first_options.VOICE_AUTH, first_options.IFTTT];
        var secondOptions = [second_options.TIMEZONE];
        var extraOptions = {
          option: {
            privacyURL: _miot.Host.locale.language === 'zh' ? _require(_dependencyMap[6]) : _require(_dependencyMap[7]),
            agreementURL: _miot.Host.locale.language === 'zh' ? _require(_dependencyMap[8]) : _require(_dependencyMap[9]),
            experiencePlanURL: _miot.Host.locale.language === 'zh' ? _require(_dependencyMap[10]) : _require(_dependencyMap[11]),
            hideAgreement: false,
            hideUserExperiencePlan: true
          },
          syncDevice: false,
          networkInfoConfig: 1
        };
        return _react2.default.createElement(
          _reactNative.View,
          {
            style: styles.container
          },
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
            })
          )
        );
      }
    }]);
    return MoreMenu;
  }(_react2.default.Component);

  MoreMenu.navigationOptions = function (_ref) {
    var navigation = _ref.navigation;
    return {
      header: _react2.default.createElement(_NavigationBar2.default, {
        backgroundColor: "#fff",
        type: _NavigationBar2.default.TYPE.LIGHT,
        title: navigation.state.params.title,
        left: [{
          key: _NavigationBar2.default.ICON.BACK,
          onPress: function onPress(_) {
            return navigation.goBack();
          }
        }]
      })
    };
  };

  exports.default = MoreMenu;
  ;

  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      borderTopColor: '#D0D0D0',
      borderTopWidth: 0.5,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      marginBottom: 0,
      marginTop: 0
    },
    separator: {
      height: 1 / _reactNative.PixelRatio.get(),
      backgroundColor: '#e5e5e5',
      marginLeft: 20
    }
  });
},10064,[10074,10719,10353,10326,10297,10033,10052,10055,10046,10049,10058,10061],"projects/com.onemore.xiaomiaibox/Main/MoreMenu.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react = _require(_dependencyMap[0]);

  var _react2 = babelHelpers.interopRequireDefault(_react);

  var _reactNative = _require(_dependencyMap[1]);

  var _ui = _require(_dependencyMap[2]);

  var _TitleBar = _require(_dependencyMap[3]);

  var _TitleBar2 = babelHelpers.interopRequireDefault(_TitleBar);

  var DialogTest = function (_React$Component) {
    babelHelpers.inherits(DialogTest, _React$Component);

    function DialogTest() {
      babelHelpers.classCallCheck(this, DialogTest);

      var _this = babelHelpers.possibleConstructorReturn(this, (DialogTest.__proto__ || Object.getPrototypeOf(DialogTest)).call(this));

      var timer1 = null;
      _this.state = {
        visMessage: false,
        visInput: false,
        visSingle: false,
        visMulti: false,
        visLoading: false,
        visProgress: false,
        progress: 0
      };
      return _this;
    }

    babelHelpers.createClass(DialogTest, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        return _react2.default.createElement(
          _reactNative.View,
          {
            style: styles.container
          },
          _react2.default.createElement(
            _reactNative.TouchableHighlight,
            {
              style: styles.rowContainer,
              underlayColor: "#838383",
              onPress: function onPress() {
                _this2.setState({
                  visMessage: true
                });
              }
            },
            _react2.default.createElement(
              _reactNative.Text,
              {
                style: {
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  fontFamily: 'MI-LANTING--GBK1-Light',
                  height: 45
                }
              },
              "\u663E\u793AMessageDialog"
            )
          ),
          _react2.default.createElement(_ui.MessageDialog, {
            title: 'title',
            message: 'message',
            cancelable: true,
            cancel: '取消',
            confirm: '确认',
            timeout: 10000,
            onCancel: function onCancel(e) {
              console.log('onCancel', e);
            },
            onConfirm: function onConfirm(e) {
              console.log('onConfirm', e);
            },
            onDismiss: function onDismiss() {
              console.log('onDismiss');

              _this2.setState({
                visMessage: false
              });
            },
            visible: this.state.visMessage
          }),
          _react2.default.createElement(
            _reactNative.TouchableHighlight,
            {
              style: styles.rowContainer,
              underlayColor: "#838383",
              onPress: function onPress() {
                _this2.setState({
                  visInput: true
                });
              }
            },
            _react2.default.createElement(
              _reactNative.Text,
              {
                style: {
                  textAlign: 'center',
                  fontFamily: 'D-DIN',
                  textAlignVertical: 'center',
                  height: 45
                }
              },
              "\u663E\u793AInputDialog"
            )
          ),
          _react2.default.createElement(_ui.InputDialog, {
            title: 'title',
            message: 'message',
            singleLine: true,
            cancel: '取消',
            cancelable: false,
            timeout: 0,
            confirm: '确认',
            placeholder: 'placeholder',
            defaultText: 'default text',
            onCancel: function onCancel(e) {
              console.log('onCancel', e);
            },
            onConfirm: function onConfirm(e) {
              console.log('onConfirm', e);
            },
            onDismiss: function onDismiss() {
              console.log('onDismiss');

              _this2.setState({
                visInput: false
              });
            },
            visible: this.state.visInput
          }),
          _react2.default.createElement(
            _reactNative.TouchableHighlight,
            {
              style: styles.rowContainer,
              underlayColor: "#838383",
              onPress: function onPress() {
                _this2.setState({
                  visSingle: true
                });
              }
            },
            _react2.default.createElement(
              _reactNative.Text,
              {
                style: {
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  fontFamily: 'D-DINCondensed-Bold',
                  height: 45
                }
              },
              "\u663E\u793ASingleChoseDialog"
            )
          ),
          _react2.default.createElement(_ui.SingleChoseDialog, {
            title: 'title',
            dataSource: ['message0', 'message1', 'message2', 'message3', 'message4', 'message5', 'message6'],
            cancel: '取消',
            confirm: '确认',
            cancelable: false,
            timeout: 0,
            check: 2,
            onCancel: function onCancel(e) {
              console.log('onCancel', e);
            },
            onConfirm: function onConfirm(e) {
              console.log('onConfirm', e);
            },
            onCheck: function onCheck(e) {
              console.log('onCheck', e);
            },
            onDismiss: function onDismiss() {
              console.log('onDismiss');

              _this2.setState({
                visSingle: false
              });
            },
            visible: this.state.visSingle
          }),
          _react2.default.createElement(
            _reactNative.TouchableHighlight,
            {
              style: styles.rowContainer,
              underlayColor: "#838383",
              onPress: function onPress() {
                _this2.setState({
                  visMulti: true
                });
              }
            },
            _react2.default.createElement(
              _reactNative.Text,
              {
                style: {
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  fontFamily: 'D-DINCondensed',
                  height: 45
                }
              },
              "\u663E\u793AMultiChoseDialog"
            )
          ),
          _react2.default.createElement(_ui.MultiChoseDialog, {
            title: 'title',
            timeout: 0,
            cancelable: false,
            dataSource: [{
              'name': 'message0',
              'check': true
            }, {
              'name': 'message1',
              'check': true
            }, {
              'name': 'message2',
              'check': false
            }, {
              'name': 'message3',
              'check': false
            }, {
              'name': 'message4',
              'check': false
            }, {
              'name': 'message5',
              'check': false
            }, {
              'name': 'message6',
              'check': true
            }],
            dataKey: 'name',
            checkKey: 'check',
            cancel: '取消',
            confirm: '确认',
            onCancel: function onCancel(e) {
              console.log('onCancel', e);
            },
            onConfirm: function onConfirm(e) {
              console.log('onConfirm', e);
            },
            onCheck: function onCheck(e) {
              console.log('onCheck', e);
            },
            onDismiss: function onDismiss() {
              console.log('onDismiss');

              _this2.setState({
                visMulti: false
              });
            },
            visible: this.state.visMulti
          }),
          _react2.default.createElement(
            _reactNative.TouchableHighlight,
            {
              style: styles.rowContainer,
              underlayColor: "#838383",
              onPress: function onPress() {
                _this2.setState({
                  visLoading: true
                });

                setTimeout(function () {
                  _this2.setState({
                    visLoading: false
                  });
                }, 3000);
              }
            },
            _react2.default.createElement(
              _reactNative.Text,
              {
                style: {
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  fontFamily: 'D-DINExp-Bold',
                  height: 45
                }
              },
              "\u663E\u793ALoadingDialog"
            )
          ),
          _react2.default.createElement(_ui.LoadingDialog, {
            message: 'message',
            cancelable: false,
            timeout: 3000,
            onDismiss: function onDismiss() {
              console.log('onDismiss');

              _this2.setState({
                visLoading: false
              });
            },
            visible: this.state.visLoading
          }),
          _react2.default.createElement(
            _reactNative.TouchableHighlight,
            {
              style: styles.rowContainer,
              underlayColor: "#838383",
              onPress: function onPress() {
                _this2.setState({
                  visProgress: true,
                  progress: 0
                });

                _this2.timer1 = setInterval(function () {
                  console.log('setInterval', _this2.state.progress);

                  if (_this2.state.progress === 100) {
                    clearInterval(_this2.timer1);

                    _this2.setState({
                      visProgress: false
                    });
                  } else {
                    var nextProgress = _this2.state.progress + 1;

                    _this2.setState({
                      progress: nextProgress
                    });
                  }
                }, 40);
              }
            },
            _react2.default.createElement(
              _reactNative.Text,
              {
                style: {
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  fontFamily: 'DS-Digital',
                  height: 45
                }
              },
              "\u663E\u793AProgressDialog"
            )
          ),
          _react2.default.createElement(_ui.ProgressDialog, {
            message: 'message',
            max: 100,
            cancelable: false,
            progress: this.state.progress,
            onDismiss: function onDismiss() {
              console.log('onDismiss');

              _this2.setState({
                visProgress: false
              });
            },
            visible: this.state.visProgress
          }),
          _react2.default.createElement(
            _reactNative.TouchableHighlight,
            {
              style: styles.rowContainer,
              underlayColor: "#838383",
              onPress: function onPress() {
                _reactNative.Alert.alert('Alert Title', 'My Alert Msg', [{
                  text: 'Ask me later',
                  onPress: function onPress() {
                    return console.log('Ask me later pressed');
                  }
                }, {
                  text: 'Cancel',
                  onPress: function onPress() {
                    return console.log('Cancel Pressed');
                  },
                  style: 'cancel'
                }, {
                  text: 'OK',
                  onPress: function onPress() {
                    return console.log('OK Pressed');
                  }
                }], {
                  cancelable: false
                });
              }
            },
            _react2.default.createElement(
              _reactNative.Text,
              {
                style: {
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  height: 45
                }
              },
              "Alert(RN\u81EA\u5E26\u7684) "
            )
          ),
          _react2.default.createElement(
            _reactNative.TouchableHighlight,
            {
              style: styles.rowContainer,
              underlayColor: "#838383",
              onPress: function onPress() {
                {
                  _reactNative.Alert.alert('ios 特有', 'android不支持', [{
                    text: 'OK',
                    onPress: function onPress() {
                      return console.log('OK Pressed');
                    }
                  }], {
                    cancelable: false
                  });
                }
              }
            },
            _react2.default.createElement(
              _reactNative.Text,
              {
                style: {
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  height: 45
                }
              },
              "ActionSheet(RN\u81EA\u5E26\u7684,iOS \u7279\u6709\u7684) "
            )
          )
        );
      }
    }]);
    return DialogTest;
  }(_react2.default.Component);

  DialogTest.navigationOptions = function (_ref) {
    var navigation = _ref.navigation;
    return {
      header: _react2.default.createElement(_TitleBar2.default, {
        title: 'DialogTest',
        style: {
          backgroundColor: '#fff'
        },
        onPressLeft: function onPressLeft() {
          navigation.goBack();
        }
      })
    };
  };

  exports.default = DialogTest;

  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      borderTopColor: '#f1f1f1',
      borderTopWidth: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch',
      backgroundColor: '#ffffff',
      marginBottom: 0,
      marginTop: 0
    }
  });
},10067,[10297,10033,10230,10284],"projects/com.onemore.xiaomiaibox/Main/DialogTest.js");
__d(function (global, _require, module, exports, _dependencyMap) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _miot = _require(_dependencyMap[0]);

  var _NavigationBar = _require(_dependencyMap[1]);

  var _NavigationBar2 = babelHelpers.interopRequireDefault(_NavigationBar);

  var _ListItem = _require(_dependencyMap[2]);

  var _MHLocalizableString = _require(_dependencyMap[3]);

  var _react = _require(_dependencyMap[4]);

  var _react2 = babelHelpers.interopRequireDefault(_react);

  var _reactNative = _require(_dependencyMap[5]);

  var _Dimensions$get = _reactNative.Dimensions.get('window'),
      width = _Dimensions$get.width,
      height = _Dimensions$get.height;

  var playDictateParagraphId = 2062;

  var SceneMain = function (_React$Component) {
    babelHelpers.inherits(SceneMain, _React$Component);

    function SceneMain(props, context) {
      babelHelpers.classCallCheck(this, SceneMain);

      var _this = babelHelpers.possibleConstructorReturn(this, (SceneMain.__proto__ || Object.getPrototypeOf(SceneMain)).call(this, props, context));

      var textV = '';
      var textP = 1;

      if (_miot.Package.entryInfo.payload.value != null) {
        if (_miot.Package.entryInfo.payload.value.length != 0) {
          if (_miot.Package.entryInfo.payload.id == playDictateParagraphId) {
            textV = _miot.Package.entryInfo.payload.value;
            textP = 1;
          } else {
            textV = _miot.Package.entryInfo.payload.value[0];
            textP = _miot.Package.entryInfo.payload.value[1];
          }
        }
      }

      _this.state = {
        textValue: textV,
        textType: textP
      };
      return _this;
    }

    babelHelpers.createClass(SceneMain, [{
      key: "componentDidMount",
      value: function componentDidMount() {}
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var pathTop = _reactNative.ART.Path();

        pathTop.moveTo(0, 0);
        pathTop.lineTo(width, 0);

        var pathLow = _reactNative.ART.Path();

        pathLow.moveTo(0, 0);
        pathLow.lineTo(width - 40, 0);
        return _react2.default.createElement(
          _reactNative.View,
          {
            style: styles.containerAll
          },
          _react2.default.createElement(_NavigationBar2.default, {
            backgroundColor: "#fff",
            type: _NavigationBar2.default.TYPE.LIGHT,
            left: [{
              key: _NavigationBar2.default.ICON.BACK,
              onPress: function onPress(_) {
                return _miot.Package.exit();
              }
            }],
            right: [{
              key: _NavigationBar2.default.ICON.COMPLETE,
              onPress: function onPress(_) {
                if (_this2.state.textValue.length != 0) {
                  var action = _miot.Package.entryInfo;

                  if (action.payload.id == playDictateParagraphId) {
                    action.payload.value = _this2.state.textValue;
                  } else {
                    action.payload.value = [_this2.state.textValue, _this2.state.textType];
                  }

                  _miot.Package.exit(action);
                }
              }
            }],
            title: _miot.Package.entryInfo.payload.id == playDictateParagraphId ? (0, _MHLocalizableString.getString)('enterTextTitle') : (0, _MHLocalizableString.getString)('instructionsTextTitle')
          }),
          _react2.default.createElement(
            _reactNative.View,
            null,
            _react2.default.createElement(
              _reactNative.ART.Surface,
              {
                width: width,
                height: 0.5
              },
              _react2.default.createElement(_reactNative.ART.Shape, {
                d: pathTop,
                stroke: "#909090",
                strokeWidth: 0.5
              })
            )
          ),
          _react2.default.createElement(
            _reactNative.View,
            null,
            _react2.default.createElement(_reactNative.TextInput, {
              style: styles.textInput,
              maxLength: 200,
              placeholder: _miot.Package.entryInfo.payload.id == playDictateParagraphId ? (0, _MHLocalizableString.getString)('enterText') : (0, _MHLocalizableString.getString)('instructionsText'),
              multiline: true,
              textAlignVertical: 'top',
              underlineColorAndroid: "transparent",
              value: this.state.textValue,
              onChangeText: function onChangeText(text) {
                _this2.setState({
                  textValue: text
                });
              }
            })
          ),
          _react2.default.createElement(
            _reactNative.View,
            null,
            _react2.default.createElement(
              _reactNative.Text,
              {
                style: styles.stateNumberText
              },
              " ",
              this.state.textValue.length + "/200",
              " "
            )
          ),
          _react2.default.createElement(
            _reactNative.View,
            {
              style: styles.stateArtLow
            },
            _react2.default.createElement(
              _reactNative.ART.Surface,
              {
                width: width - 40,
                height: 0.5
              },
              _react2.default.createElement(_reactNative.ART.Shape, {
                d: pathLow,
                stroke: "#909090",
                strokeWidth: 0.5
              })
            )
          ),
          _react2.default.createElement(
            _reactNative.View,
            null,
            _react2.default.createElement(
              _reactNative.Text,
              {
                style: styles.stateText
              },
              " ",
              (0, _MHLocalizableString.getString)('showText'),
              " "
            )
          ),
          _miot.Package.entryInfo.payload.id == playDictateParagraphId ? null : _react2.default.createElement(
            _reactNative.View,
            {
              style: styles.stateListItem
            },
            _react2.default.createElement(_ListItem.ListItemWithSwitch, {
              title: (0, _MHLocalizableString.getString)('executionStyle'),
              subtitle: (0, _MHLocalizableString.getString)('executionStyleText'),
              value: this.state.textType == 1 ? false : true,
              onValueChange: function onValueChange(type) {
                return type == true ? _this2.setState({
                  textType: 0
                }) : _this2.setState({
                  textType: 1
                });
              },
              showSeparator: false,
              titleStyle: {
                marginTop: 20,
                height: 50
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
      backgroundColor: '#ffffff'
    },
    textInput: {
      height: (200 / ((width - 50) / 14) + 2) * 14 + 40,
      fontSize: 14,
      marginTop: 20,
      marginLeft: 25,
      marginRight: 25,
      color: '#000000',
      backgroundColor: '#ffffff'
    },
    stateNumberText: {
      color: '#909090',
      fontSize: 12,
      marginLeft: 20,
      marginRight: 20,
      textAlign: 'right'
    },
    stateArtLow: {
      marginTop: 10,
      marginLeft: 20,
      marginRight: 20
    },
    stateText: {
      color: '#909090',
      fontSize: 11,
      marginTop: 10,
      marginLeft: 20,
      marginRight: 20
    },
    stateListItem: {
      marginTop: 20
    }
  });
},10070,[10074,10719,10338,10010,10297,10033],"projects/com.onemore.xiaomiaibox/Main/SceneMain.js");
require(10120);
require(10001);