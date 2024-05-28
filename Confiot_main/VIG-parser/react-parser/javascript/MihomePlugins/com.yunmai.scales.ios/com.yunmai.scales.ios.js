
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    var _miot = _require(_dependencyMap[0]);

    var _index = _require(_dependencyMap[1]);

    var _index2 = babelHelpers.interopRequireDefault(_index);

    _miot.Package.entry(_index2.default);
}, 10001, [10074, 10004], "projects/com.yunmai.scales.ios/index.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var _miot = _require(_dependencyMap[2]);

    var _YMDataHold = _require(_dependencyMap[3]);

    var _YMDataHold2 = babelHelpers.interopRequireDefault(_YMDataHold);

    var _YMBLEControl = _require(_dependencyMap[4]);

    var _YMBLEControl2 = babelHelpers.interopRequireDefault(_YMBLEControl);

    var _Global = _require(_dependencyMap[5]);

    var _Global2 = babelHelpers.interopRequireDefault(_Global);

    var _reactNavigation = _require(_dependencyMap[6]);

    var _ui = _require(_dependencyMap[7]);

    var _Home = _require(_dependencyMap[8]);

    var _Home2 = babelHelpers.interopRequireDefault(_Home);

    var _EvaluationCard = _require(_dependencyMap[9]);

    var _EvaluationCard2 = babelHelpers.interopRequireDefault(_EvaluationCard);

    var _BriefingCurve = _require(_dependencyMap[10]);

    var _BriefingCurve2 = babelHelpers.interopRequireDefault(_BriefingCurve);

    var _NewNavBar = _require(_dependencyMap[11]);

    var _NewNavBar2 = babelHelpers.interopRequireDefault(_NewNavBar);

    var _DeviceControl = _require(_dependencyMap[12]);

    var _DeviceControl2 = babelHelpers.interopRequireDefault(_DeviceControl);

    var _Setting = _require(_dependencyMap[13]);

    var _Setting2 = babelHelpers.interopRequireDefault(_Setting);

    var _MultiUserList = _require(_dependencyMap[14]);

    var _MultiUserList2 = babelHelpers.interopRequireDefault(_MultiUserList);

    var _VisitorModeView = _require(_dependencyMap[15]);

    var _VisitorModeView2 = babelHelpers.interopRequireDefault(_VisitorModeView);

    var _Helper = _require(_dependencyMap[16]);

    var _Helper2 = babelHelpers.interopRequireDefault(_Helper);

    var _MultiUserEdit = _require(_dependencyMap[17]);

    var _MultiUserEdit2 = babelHelpers.interopRequireDefault(_MultiUserEdit);

    var _UpgradeView = _require(_dependencyMap[18]);

    var _UpgradeView2 = babelHelpers.interopRequireDefault(_UpgradeView);

    var _BriefingList = _require(_dependencyMap[19]);

    var _BriefingList2 = babelHelpers.interopRequireDefault(_BriefingList);

    var YMPluginApp = function (_React$Component) {
        babelHelpers.inherits(YMPluginApp, _React$Component);

        function YMPluginApp(props) {
            babelHelpers.classCallCheck(this, YMPluginApp);

            var _this = babelHelpers.possibleConstructorReturn(this, (YMPluginApp.__proto__ || Object.getPrototypeOf(YMPluginApp)).call(this, props));

            _this._handleAppStateChange = function (currentAppState) {
                if (currentAppState === 'active') { } else { }
            };

            _this.firstPage = _Home2.default;
            return _this;
        }

        babelHelpers.createClass(YMPluginApp, [{
            key: "componentWillMount",
            value: function componentWillMount() {
                _YMDataHold2.default.getUserList();

                _miot.Host.ui.keepScreenNotLock(true);
            }
        }, {
            key: "componentDidMount",
            value: function componentDidMount() {
                _reactNative.AppState.addEventListener('change', this._handleAppStateChange);
            }
        }, {
            key: "componentWillUnmount",
            value: function componentWillUnmount() {
                _miot.Host.ui.keepScreenNotLock(false);

                _reactNative.AppState.removeEventListener('change', this._handleAppStateChange);
            }
        }, {
            key: "render",
            value: function render() {
                var RoteStack = (0, _reactNavigation.createStackNavigator)({
                    Home: _Home2.default,
                    EvaluationCard: _EvaluationCard2.default,
                    BriefingCurve: _BriefingCurve2.default,
                    Setting: _Setting2.default,
                    DeviceControl: _DeviceControl2.default,
                    MultiUserList: _MultiUserList2.default,
                    VisitorModeView: _VisitorModeView2.default,
                    Helper: _Helper2.default,
                    MultiUserEdit: _MultiUserEdit2.default,
                    UpgradeView: _UpgradeView2.default,
                    BriefingList: _BriefingList2.default
                }, {
                    initialRouteName: 'Home',
                    defaultNavigationOptions: function defaultNavigationOptions(_ref) {
                        var navigation = _ref.navigation;
                        return {
                            gesturesEnabled: false,
                            header: _react2.default.createElement(_NewNavBar2.default, {
                                title: navigation.state.params ? navigation.state.params.title : '',
                                style: styles.bar,
                                type: "dark",
                                onWillFocus: function onWillFocus(route) {
                                    if (navigation.routeName === 'Home' || navigation.routeName === 'BriefingCurve') {
                                        _reactNative.StatusBar.setBarStyle('light-content');
                                    } else {
                                        _reactNative.StatusBar.setBarStyle('dark-content');
                                    }

                                    {
                                        _reactNative.StatusBar.setBarStyle('default');

                                        _reactNative.StatusBar.setHidden(false);
                                    }
                                },
                                onPressLeft: function onPressLeft(_) {
                                    if (navigation.state.routeName === 'Home') {
                                        _miot.Package.exit();
                                    } else {
                                        navigation.goBack();
                                    }
                                }
                            })
                        };
                    }
                });
                return _react2.default.createElement(RoteStack, null);
            }
        }]);
        return YMPluginApp;
    }(_react2.default.Component);

    exports.default = YMPluginApp;

    var styles = _reactNative.StyleSheet.create({
        appContainer: {
            flex: 1,
            height: _Global2.default.screenHeight(),
            width: _Global2.default.screenWidth()
        },
        bar: {
            backgroundColor: 'rgb(26, 182, 181)'
        },
        defaultFontFamily: {
            fontFamily: 'System'
        }
    });

    var oldRender = _reactNative.Text.prototype.render;

    _reactNative.Text.prototype.render = function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var origin = oldRender.call.apply(oldRender, [this].concat(args));
        return _react2.default.cloneElement(origin, {
            style: [origin.props.style, styles.defaultFontFamily]
        });
    };
}, 10004, [10297, 10033, 10074, 10007, 10364, 10010, 10918, 10230, 10376, 10436, 10487, 10379, 10442, 10445, 10463, 10478, 10481, 10466, 10448, 10508], "projects/com.yunmai.scales.ios/Main/index.ios.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _miot = _require(_dependencyMap[0]);

    var _smarthome = _require(_dependencyMap[1]);

    var _smarthome2 = babelHelpers.interopRequireDefault(_smarthome);

    var _Global = _require(_dependencyMap[2]);

    var _YMUserInfo = _require(_dependencyMap[3]);

    var _YMUserInfo2 = babelHelpers.interopRequireDefault(_YMUserInfo);

    var _YMUser = _require(_dependencyMap[4]);

    var _YMUser2 = babelHelpers.interopRequireDefault(_YMUser);

    var SERVER_MAIN_GET_URL = '/user/getpdata';
    var SERVER_MAIN_SET_URL = '/user/setpdata';
    var SERVER_SUB_SET_URL = '/user/set_user_device_data';
    var SERVER_SUB_GET_URL = '/user/get_user_device_data';
    var SERVER_SUB_DEL_URL = '/user/del_user_device_data';
    var SERVER_SUB_TYPE = 'config';
    var SERVER_MAIN_KEY = 'body_info_yunmai';
    var SERVER_SUB_KEY = 'sub_account';
    var SERVER_DATA_SET_URL = '/user/set_user_device_data';
    var SERVER_DATA_GET_URL = '/user/get_user_device_data';
    var SERVER_DATA_TYPE = 'data';
    var SERVER_DATA_KEY = 'weight';
    var LOCAL_KEY = 'YMUserInfoMsg';

    var YMDataHold = function YMDataHold() {
        babelHelpers.classCallCheck(this, YMDataHold);
    };

    YMDataHold.getUserList = function (callback) {
        YMDataHold.normalLog('本地userDefault读取 ');

        _miot.Host.storage.get('users' + _miot.Device.deviceID + _miot.Service.account.ID).then(function (info) {
            if (!_Global.Function.equalNull(info)) {
                var userInfo = info[LOCAL_KEY];

                if (!_Global.Function.equalNull(userInfo)) {
                    var myUserInfo = userInfo[_miot.Service.account.ID.toString()];

                    if (!_Global.Function.equalNull(myUserInfo)) {
                        _Global.Function.normalLog('本地userDefault读取 ', [myUserInfo]);

                        if (Array.isArray(myUserInfo)) {
                            _YMUser2.default.setList(myUserInfo.map(function (item, index) {
                                var userInfo = new _YMUserInfo2.default();
                                userInfo.pUid = item.pUid;
                                userInfo.shortId = item.shortId;
                                userInfo.userName = item.userName;
                                userInfo.bodyType = item.bodyType;
                                userInfo.basisWeight = item.basisWeight;
                                userInfo.unit = item.unit;
                                userInfo.status = item.status;
                                userInfo.lastDownTime = item.lastDownTime;
                                userInfo.usageCount = item.usageCount;
                                userInfo.sex = item.sex;
                                userInfo.height = item.height;
                                userInfo.relevance = item.relevance;
                                userInfo.birthday = item.birthday;
                                var birthday = item.birthday;
                                var age = 1;
                                var date = new Date();
                                age = date.getFullYear() - birthday.substring(0, 4);
                                userInfo.age = age;
                                return userInfo;
                            }));

                            if (callback) {
                                callback();
                            }
                        } else {
                            var _userInfo = new _YMUserInfo2.default();

                            _userInfo.shortId = myUserInfo.shortId || '';

                            _miot.Service.account.load().then(function (account) {
                                _userInfo.userName = _miot.Service.account.nickName;
                            });

                            _userInfo.basisWeight = myUserInfo.basisWeight;
                            _userInfo.unit = myUserInfo.unit;
                            _userInfo.lastDownTime = myUserInfo.lastDownTime;
                            _userInfo.sex = myUserInfo.sex;
                            _userInfo.height = myUserInfo.height;
                            _userInfo.relevance = 0;

                            if (!_Global.Function.equalNull(myUserInfo.age)) {
                                _userInfo.age = myUserInfo.age;
                                var date = new Date();
                                var year = date.getFullYear() - myUserInfo.age;
                                _userInfo.birthday = year + '0101';
                            } else if (!_Global.Function.equalNull(myUserInfo.birthday)) {
                                _userInfo.birthday = myUserInfo.birthday;

                                var _date = new Date();

                                _userInfo.age = _date.getFullYear() - myUserInfo.birthday.substring(0, 4);
                            }

                            _YMUser2.default.setList([_userInfo]);
                        }
                    } else {
                        _Global.Function.failedLog('本地userDefault读取 无对应当前ID的用户信息数据');

                        if (callback) {
                            callback();
                        }
                    }
                } else {
                    _Global.Function.failedLog('本地userDefault读取 无任何用户信息数据');

                    if (callback) {
                        callback();
                    }
                }
            } else {
                _Global.Function.failedLog('本地userDefault读取 无任何userDefault数据');

                if (callback) {
                    callback();
                }
            }
        }).catch(function (err) {
            if (err === 'expired') {
                _Global.Function.normalLog('value for key already expired');
            }
        });
    };

    YMDataHold.saveUserList = function () {
        var userList = _YMUser2.default.getList();

        var userId = _miot.Service.account.ID;
        var storageKey = 'users' + _miot.Device.deviceID + _miot.Service.account.ID;

        if (_Global.Function.equalNull(userId)) {
            YMDataHold.failedLog('本地userDefault保存 用户id有误');
            return;
        } else {
            var userKey = userId.toString();

            _miot.Host.storage.get(storageKey).then(function (info) {
                _Global.Function.normalLog('本地userDefault保存 修改前', [info]);

                if (_Global.Function.equalNull(info)) {
                    var userDefault = {};
                    userDefault[LOCAL_KEY] = {};
                    userDefault[LOCAL_KEY][userKey] = userList;

                    _miot.Host.storage.set(storageKey, userDefault);

                    _Global.Function.normalLog('本地userDefault保存 修改后', [userDefault]);

                    _Global.Function.successLog('本地userDefault保存 成功1');
                } else {
                    var allInfo = info[LOCAL_KEY];

                    if (_Global.Function.equalNull(allInfo)) {
                        allInfo = {};
                    }

                    allInfo[userKey] = userList;
                    info[LOCAL_KEY] = allInfo;

                    _miot.Host.storage.set(storageKey, info);

                    _Global.Function.normalLog('本地userDefault保存 修改后', [info]);

                    _Global.Function.successLog('本地userDefault保存 成功2');
                }
            }).catch(function (err) {
                _Global.Function.failedLog('本地userDefault保存 ', '', err);

                if (err === 'expired') {
                    _Global.Function.normalLog('value for key already expired');
                }
            });
        }
    };

    YMDataHold.fetchUserList = function (callback) {
        var param = {
            did: _miot.Device.deviceID,
            type: SERVER_SUB_TYPE,
            key: SERVER_SUB_KEY,
            time_start: -1,
            time_end: 0,
            limit: 999999
        };
        var time = parseInt(new Date().getTime() * 0.001);
        var mainParams = {
            params: [{
                key: SERVER_MAIN_KEY,
                time_start: time,
                time_end: -1
            }]
        };

        _smarthome2.default.getUserPDData(mainParams).then(function (response) {
            var mainUserValue = response[SERVER_MAIN_KEY][0].value;

            if (_Global.Function.equalNull(mainUserValue) || _Global.Function.equalNull(mainUserValue.height) || _Global.Function.equalNull(mainUserValue.birthday) || _Global.Function.equalNull(mainUserValue.sex)) {
                if (callback) {
                    callback('New');
                }
            } else {
                if (mainUserValue.userName) {
                    _YMUser2.default.getMainUserInfo().userName = mainUserValue.userName.toString();
                }

                if (mainUserValue.unit) {
                    _YMUser2.default.getMainUserInfo().unit = parseInt(mainUserValue.unit);
                }

                if (mainUserValue.basisWeight) {
                    _YMUser2.default.getMainUserInfo().basisWeight = parseInt(mainUserValue.basisWeight);
                }

                if (mainUserValue.sex) {
                    _YMUser2.default.getMainUserInfo().sex = parseInt(mainUserValue.sex);
                }

                if (mainUserValue.height) {
                    _YMUser2.default.getMainUserInfo().height = parseInt(mainUserValue.height);
                }

                if (mainUserValue.birthday) {
                    var birthday = mainUserValue.birthday.toString();
                    var age = 1;
                    var date = new Date();

                    if (birthday.length > 4) {
                        age = date.getFullYear() - birthday.substring(0, 4);
                    } else {
                        age = birthday;
                    }

                    _YMUser2.default.getMainUserInfo().birthday = mainUserValue.birthday.toString().substring(0, 4) + '0101';
                    _YMUser2.default.getMainUserInfo().age = parseInt(age);
                }
            }

            var userList = [_YMUser2.default.getMainUserInfo()];
            var subParams = {
                did: _miot.Device.deviceID,
                uid: _miot.Service.account.ID,
                type: SERVER_SUB_TYPE,
                key: SERVER_SUB_KEY,
                time_start: -1,
                time_end: 0
            };

            _smarthome2.default.getDeviceData(subParams).then(function (res) {
                _Global.Function.successLog('用户列表获取');

                if (_Global.Function.equalNull(res) || _Global.Function.equalNull(res[0]) || _Global.Function.equalNull(res[0].value)) {
                    _Global.Function.normalLog('用户列表获取 为空', [res]);
                } else {
                    _Global.Function.successLog('getDeviceData user :' + res[0].value);

                    var arr = Array.apply(undefined, babelHelpers.toConsumableArray(JSON.parse(res[0].value)));

                    if (_Global.Function.equalNull(arr)) {
                        _Global.Function.normalLog('用户列表获取 为空', arr);

                        if (callback) {
                            callback('New', null);
                            return;
                        }
                    }

                    var mainUserinfoObj = arr.find(function (userinfo) {
                        return _Global.Function.equalNull(userinfo.isMain) || userinfo.isMain === true;
                    });

                    if (_Global.Function.equalNull(mainUserinfoObj) || _Global.Function.equalNull(mainUserinfoObj.height) || _Global.Function.equalNull(mainUserinfoObj.birthday) || _Global.Function.equalNull(mainUserinfoObj.sex)) {
                        if (callback) {
                            callback('New', null);
                        }
                    } else {
                        _Global.Function.normalLog('用户列表获取 主账户', [mainUserinfoObj]);

                        if (mainUserinfoObj.subid) {
                            _YMUser2.default.getMainUserInfo().shortId = mainUserinfoObj.subid.toString();
                        }

                        if (mainUserinfoObj.userName) {
                            _YMUser2.default.getMainUserInfo().userName = mainUserinfoObj.userName.toString();
                        }

                        if (mainUserinfoObj.basisWeight) {
                            _YMUser2.default.getMainUserInfo().basisWeight = parseInt(mainUserinfoObj.basisWeight);
                        }

                        if (mainUserinfoObj.unit) {
                            _YMUser2.default.getMainUserInfo().unit = parseInt(mainUserinfoObj.unit);
                        }

                        if (mainUserinfoObj.sex) {
                            _YMUser2.default.getMainUserInfo().sex = parseInt(mainUserinfoObj.sex);
                        }

                        if (mainUserinfoObj.height) {
                            _YMUser2.default.getMainUserInfo().height = parseInt(mainUserinfoObj.height);
                        }

                        if (mainUserinfoObj.birthday) {
                            var _birthday = mainUserinfoObj.birthday.toString();

                            var _age = 1;

                            var _date2 = new Date();

                            if (_birthday.length > 4) {
                                _age = _date2.getFullYear() - _birthday.substring(0, 4);
                            } else {
                                _age = _birthday;
                            }

                            _YMUser2.default.getMainUserInfo().birthday = mainUserinfoObj.birthday.toString().substring(0, 4) + '0101';
                            _YMUser2.default.getMainUserInfo().age = parseInt(_age);
                        }
                    }

                    arr.map(function (subUserinfoObj) {
                        if (_Global.Function.equalNull(subUserinfoObj.isMain) || subUserinfoObj.isMain) { } else {
                            var subUserinfo = _YMUser2.default.getList().find(function (userInfo) {
                                var affiliationConsistency = _miot.Service.account.ID == userInfo.pUid;
                                var objectConsistency = subUserinfoObj.userName == userInfo.userName;
                                return affiliationConsistency && objectConsistency;
                            });

                            if (!subUserinfo) {
                                subUserinfo = new _YMUserInfo2.default();
                            }

                            if (subUserinfoObj.subid) {
                                subUserinfo.shortId = subUserinfoObj.subid.toString();
                            }

                            if (subUserinfoObj.pUid) {
                                subUserinfo.pUid = subUserinfoObj.pUid.toString();
                            }

                            if (subUserinfoObj.userName) {
                                subUserinfo.userName = subUserinfoObj.userName.toString();
                            }

                            if (subUserinfoObj.unit) {
                                subUserinfo.unit = parseInt(subUserinfoObj.unit);
                            }

                            if (subUserinfoObj.basisWeight) {
                                subUserinfo.basisWeight = parseInt(subUserinfoObj.basisWeight);
                            }

                            if (subUserinfoObj.sex) {
                                subUserinfo.sex = parseInt(subUserinfoObj.sex);
                            }

                            if (subUserinfoObj.height) {
                                subUserinfo.height = parseInt(subUserinfoObj.height);
                            }

                            if (subUserinfoObj.relevanceName) {
                                subUserinfo.relevance = parseInt(subUserinfoObj.relevanceName);
                            }

                            if (subUserinfoObj.birthday) {
                                var _birthday2 = subUserinfoObj.birthday.toString();

                                var _age2 = 1;

                                var _date3 = new Date();

                                if (_birthday2.length > 4) {
                                    _age2 = _date3.getFullYear() - _birthday2.substring(0, 4);
                                } else {
                                    _age2 = _birthday2;
                                }

                                subUserinfo.birthday = subUserinfoObj.birthday.toString().substring(0, 4) + '0101';
                                subUserinfo.age = parseInt(_age2);
                            }

                            userList.push(subUserinfo);
                        }
                    });
                }

                _YMUser2.default.setList(userList);

                if (_YMUser2.default.getList().some(function (userinfo) {
                    return _Global.Function.equalNull(userinfo.shortId) || userinfo.shortId === 0 || userinfo.shortId === '0';
                })) {
                    _Global.Function.normalLog('用户列表获取 有用户subid为空 再次上传');

                    YMDataHold.uploadUserList(function () { });
                } else {
                    _Global.Function.successLog('用户列表获取完成 subid验证完成');

                    _Global.Function.normalLog('用户列表获取list', _YMUser2.default.getList());

                    if (callback) {
                        callback('Succeed', null);
                    }
                }
            }).catch(function (reason) {
                console.log(reason);
                console.log('fetchUserList reason - ' + reason);

                _Global.Function.failedLog('用户列表获取', '', reason);

                if (callback) {
                    callback('Failed', reason);
                }
            });
        }).catch(function (e) {
            if (callback) {
                callback('New');
            }

            _Global.Function.failedLog('getUserPDData', '', e);
        });
    };

    YMDataHold.uploadUserList = function (callback) {
        var userList = _YMUser2.default.getList();

        var userinfoList = userList.map(function (userinfo, index) {
            var userinfoForServer = {
                pUid: userinfo.pUid,
                userName: userinfo.userName,
                isMain: index == 0,
                unit: userinfo.unit,
                basisWeight: userinfo.basisWeight,
                sex: userinfo.sex,
                height: userinfo.height,
                birthday: userinfo.birthday,
                relevanceName: userinfo.relevance
            };

            if (!_Global.Function.equalNull(userinfo.shortId) && userinfo.shortId !== 0 && userinfo.shortId !== '0') {
                userinfoForServer = babelHelpers.extends({}, userinfoForServer, {
                    subid: userinfo.shortId
                });
            }

            return userinfoForServer;
        });
        var mainUser = {
            userId: _miot.Service.account.ID,
            userName: userList[0].userName,
            unit: userList[0].unit,
            basisWeight: userList[0].basisWeight,
            sex: userList[0].sex,
            height: userList[0].height,
            birthday: userList[0].birthday
        };
        var mainParam = {
            key: SERVER_MAIN_KEY,
            value: mainUser,
            time: 0
        };
        var param = {
            uid: _miot.Service.account.ID,
            did: _miot.Device.deviceID,
            time: 0,
            type: SERVER_SUB_TYPE,
            key: SERVER_SUB_KEY,
            value: userinfoList
        };

        _smarthome2.default.setUserPDData(mainParam).then(function (response) {
            _Global.Function.successLog('用户信息保存111' + response);

            if (response == 'success') {
                _smarthome2.default.setDeviceData(param).then(function (_) {
                    _Global.Function.successLog('用户信息保存');

                    YMDataHold.fetchUserList(function (completed, reason) {
                        if (completed === 'Succeed' || completed === 'New') {
                            _Global.Function.successLog('用户信息保存 获取subid');

                            if (callback) {
                                callback(true, null);
                            }
                        } else {
                            _Global.Function.failedLog('用户信息保存 获取subid');

                            if (callback) {
                                callback(false, reason);
                            }
                        }
                    });
                }).catch(function (reason) {
                    _Global.Function.failedLog('用户信息保存', '', reason);

                    if (callback) {
                        callback(false, reason);
                    }
                });
            }
        }).catch(function (e) {
            if (callback) {
                callback(false, e);
            }
        });

        _Global.Function.normalLog('用户信息保存', '', [param]);
    };

    YMDataHold.fetchWeightData = function (startTimestamp, endTimestamp, callback) {
        if (!callback) {
            return;
        }

        var params = {
            did: _miot.Device.deviceID,
            type: SERVER_DATA_TYPE,
            key: SERVER_DATA_KEY,
            time_start: startTimestamp,
            time_end: endTimestamp
        };

        _smarthome2.default.getDeviceData(params).then(function (res) {
            _Global.Function.successLog('请求称重数据');

            _Global.Function.normalLog('请求称重数据', '', [res]);

            callback(res.map(function (item) {
                var value = JSON.parse(item.value);

                _Global.Function.normalLog('称重数据 weight ', '', [item.value]);

                var data = babelHelpers.extends({}, value, {
                    isUploaded: 1,
                    uid: value.subid || '0',
                    did: value.did || _miot.Device.deviceID,
                    deviceVer: value.deviceVer || '31'
                });
                delete data.subid;
                delete data.deviceUUID;
                return data;
            }));
        }).catch(function (reason) {
            _Global.Function.failedLog('请求称重数据', reason);

            callback(null);
        });
    };

    YMDataHold.uploadWeightData = function (weightData, callback) {
        if (!callback) {
            return;
        }

        var value = babelHelpers.extends({}, weightData, {
            subid: weightData.uid
        });
        delete value.uid;
        delete value.isUploaded;
        delete value.weighType;
        delete value.dateStr;
        delete value.hourStr;
        delete value.minuteStr;
        var params = {
            did: value.did,
            uid: _miot.Service.account.ID,
            type: SERVER_DATA_TYPE,
            key: SERVER_DATA_KEY,
            time: value.createTime,
            notifyThird: 1,
            value: value
        };

        _Global.Function.normalLog('保存称重数据 params', '', [params]);

        _smarthome2.default.setDeviceData(params).then(function (_) {
            _Global.Function.successLog('保存称重数据');

            callback(true);
        }).catch(function (reason) {
            _Global.Function.failedLog('保存称重数据', '', reason);

            callback(false);
        });
    };

    YMDataHold.deleteWeight = function (weightData, callback) {
        if (!callback) {
            return;
        }

        var value = babelHelpers.extends({}, weightData, {
            subid: weightData.uid
        });
        delete value.uid;
        delete value.isUploaded;
        delete value.weighType;
        delete value.dateStr;
        delete value.hourStr;
        delete value.minuteStr;
        var params = {
            did: value.did,
            type: SERVER_DATA_TYPE,
            key: SERVER_DATA_KEY,
            time: value.createTime
        };

        _Global.Function.normalLog('删除称重数据 params', '', [params]);

        _smarthome2.default.delDeviceData(params).then(function (_) {
            _Global.Function.successLog('删除称重数据');

            callback(true);
        }).catch(function (reason) {
            _Global.Function.failedLog('删除称重数据', '', reason);

            callback(false);
        });
    };

    YMDataHold.normalLog = function (message, objs) { };

    YMDataHold.successLog = function (message) { };

    YMDataHold.failedLog = function (message, err) { };

    exports.default = YMDataHold;
}, 10007, [10074, 10065, 10010, 10022, 10019], "projects/com.yunmai.scales.ios/Main/Tools/YMDataHold.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Function = undefined;

    var _propTypes = _require(_dependencyMap[0]);

    var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

    var _reactNative = _require(_dependencyMap[1]);

    var _reactNative2 = babelHelpers.interopRequireDefault(_reactNative);

    var _NativeModules = _require(_dependencyMap[2]);

    var _Localized = _require(_dependencyMap[3]);

    var _YMUser = _require(_dependencyMap[4]);

    var _YMUser2 = babelHelpers.interopRequireDefault(_YMUser);

    var Constant = function Constant() {
        babelHelpers.classCallCheck(this, Constant);
    };

    Constant.screenWidth = function () {
        return _reactNative.Dimensions.get('window').width;
    };

    Constant.screenHeight = function () {
        return _reactNative.Dimensions.get('window').height;
    };

    Constant.statusBarHeight = function () {
        return Constant.deviceIsX() ? 44.0 : 20.0;
    };

    Constant.navBarHeight = function () {
        return 44.0;
    };

    Constant.topHeight = function () {
        return Constant.statusBarHeight() + Constant.navBarHeight();
    };

    Constant.bottomSafePadding = function () {
        return Constant.deviceIsX() ? 34.0 : 0.0;
    };

    Constant.usr_unselected_woman = _require(_dependencyMap[5]);
    Constant.mnu_briefBtn = _require(_dependencyMap[6]);
    Constant.mnu_closeBtn = _require(_dependencyMap[7]);
    Constant.mnu_arrow = _require(_dependencyMap[8]);
    Constant.fml_deleteBtn = _require(_dependencyMap[9]);
    Constant.elc_noData_bmi = _require(_dependencyMap[10]);
    Constant.elc_noData_bmr = _require(_dependencyMap[11]);
    Constant.elc_noData_bodyFatIndex = _require(_dependencyMap[12]);
    Constant.elc_noData_bone = _require(_dependencyMap[13]);
    Constant.elc_noData_fat = _require(_dependencyMap[14]);
    Constant.elc_noData_fatFreeMass = _require(_dependencyMap[15]);
    Constant.elc_noData_fatMass = _require(_dependencyMap[16]);
    Constant.elc_noData_muscle = _require(_dependencyMap[17]);
    Constant.elc_noData_normalWeight = _require(_dependencyMap[18]);
    Constant.elc_noData_obesityLevel = _require(_dependencyMap[19]);
    Constant.elc_noData_protein = _require(_dependencyMap[20]);
    Constant.elc_noData_somaAge = _require(_dependencyMap[21]);
    Constant.elc_noData_somatotype = _require(_dependencyMap[22]);
    Constant.elc_noData_visFat = _require(_dependencyMap[23]);
    Constant.elc_noData_water = _require(_dependencyMap[24]);
    Constant.elc_somatotype_yAxis = _require(_dependencyMap[25]);
    Constant.elc_somatotype_RecessiveObesity = _require(_dependencyMap[26]);
    Constant.elc_somatotype_Fat = _require(_dependencyMap[27]);
    Constant.elc_somatotype_AthleticFat = _require(_dependencyMap[28]);
    Constant.elc_somatotype_LackOfTraining = _require(_dependencyMap[29]);
    Constant.elc_somatotype_Standard = _require(_dependencyMap[30]);
    Constant.elc_somatotype_AthleticStandard = _require(_dependencyMap[31]);
    Constant.elc_somatotype_Slim = _require(_dependencyMap[32]);
    Constant.elc_somatotype_AthleticSlim = _require(_dependencyMap[33]);
    Constant.elc_somatotype_Bodybuilding = _require(_dependencyMap[34]);
    Constant.elc_somatotype_xAxis = _require(_dependencyMap[35]);
    Constant.elc_bmi = _require(_dependencyMap[36]);
    Constant.elc_bmr = _require(_dependencyMap[37]);
    Constant.elc_bodyFatIndex = _require(_dependencyMap[38]);
    Constant.elc_bone = _require(_dependencyMap[39]);
    Constant.elc_fat = _require(_dependencyMap[40]);
    Constant.elc_fatFreeMass = _require(_dependencyMap[41]);
    Constant.elc_fatMass = _require(_dependencyMap[42]);
    Constant.elc_muscle = _require(_dependencyMap[43]);
    Constant.elc_normalWeight = _require(_dependencyMap[44]);
    Constant.elc_obesityLevel = _require(_dependencyMap[45]);
    Constant.elc_protein = _require(_dependencyMap[46]);
    Constant.elc_somaAge = _require(_dependencyMap[47]);
    Constant.elc_visFat = _require(_dependencyMap[48]);
    Constant.elc_water = _require(_dependencyMap[49]);
    Constant.elc_analyses = _require(_dependencyMap[50]);
    Constant.elc_bulb = _require(_dependencyMap[51]);
    Constant.elc_somatotype_RecessiveObesity = _require(_dependencyMap[26]);
    Constant.elc_somatotype_RecessiveObesity_Highlight = _require(_dependencyMap[52]);
    Constant.elc_somatotype_Fat = _require(_dependencyMap[27]);
    Constant.elc_somatotype_Fat_Highlight = _require(_dependencyMap[53]);
    Constant.elc_somatotype_AthleticFat = _require(_dependencyMap[28]);
    Constant.elc_somatotype_AthleticFat_Highlight = _require(_dependencyMap[54]);
    Constant.elc_somatotype_LackOfTraining = _require(_dependencyMap[29]);
    Constant.elc_somatotype_LackOfTraining_Highlight = _require(_dependencyMap[55]);
    Constant.elc_somatotype_Standard = _require(_dependencyMap[30]);
    Constant.elc_somatotype_Standard_Highlight = _require(_dependencyMap[56]);
    Constant.elc_somatotype_AthleticStandard = _require(_dependencyMap[31]);
    Constant.elc_somatotype_AthleticStandard_Highlight = _require(_dependencyMap[57]);
    Constant.elc_somatotype_Slim = _require(_dependencyMap[32]);
    Constant.elc_somatotype_Slim_Highlight = _require(_dependencyMap[58]);
    Constant.elc_somatotype_AthleticSlim = _require(_dependencyMap[33]);
    Constant.elc_somatotype_AthleticSlim_Highlight = _require(_dependencyMap[59]);
    Constant.elc_somatotype_Bodybuilding = _require(_dependencyMap[34]);
    Constant.elc_somatotype_Bodybuilding_Highlight = _require(_dependencyMap[60]);
    Constant.elc_slider1 = _require(_dependencyMap[61]);
    Constant.elc_slider2 = _require(_dependencyMap[62]);
    Constant.elc_slider3 = _require(_dependencyMap[63]);
    Constant.elc_slider4 = _require(_dependencyMap[64]);
    Constant.elc_slider5 = _require(_dependencyMap[65]);
    Constant.elc_slider6 = _require(_dependencyMap[66]);
    Constant.elc_slider7 = _require(_dependencyMap[67]);
    Constant.grd_bmi = _require(_dependencyMap[68]);
    Constant.grd_bmr = _require(_dependencyMap[69]);
    Constant.grd_bodyFatIndex = _require(_dependencyMap[70]);
    Constant.grd_bone = _require(_dependencyMap[71]);
    Constant.grd_fat = _require(_dependencyMap[72]);
    Constant.grd_fatFreeMass = _require(_dependencyMap[73]);
    Constant.grd_fatMass = _require(_dependencyMap[74]);
    Constant.grd_muscle = _require(_dependencyMap[75]);
    Constant.grd_normalWeight = _require(_dependencyMap[76]);
    Constant.grd_obesityLevel = _require(_dependencyMap[77]);
    Constant.grd_protein = _require(_dependencyMap[78]);
    Constant.grd_somaAge = _require(_dependencyMap[79]);
    Constant.grd_somatotype = _require(_dependencyMap[80]);
    Constant.grd_visFat = _require(_dependencyMap[81]);
    Constant.grd_water = _require(_dependencyMap[82]);
    Constant.fml_addBtn = _require(_dependencyMap[83]);
    Constant.lst_marked = _require(_dependencyMap[84]);
    Constant.lst_addBtn = _require(_dependencyMap[85]);
    Constant.brf_arrowDown = _require(_dependencyMap[86]);
    Constant.brf_arrowLeft = _require(_dependencyMap[87]);
    Constant.brf_arrowRight = _require(_dependencyMap[88]);
    Constant.brf_noData = _require(_dependencyMap[89]);
    Constant.brf_arrowUp = _require(_dependencyMap[90]);
    Constant.brf_arrowDown = _require(_dependencyMap[86]);
    Constant.brf_bmi = _require(_dependencyMap[91]);
    Constant.brf_muscle = _require(_dependencyMap[92]);
    Constant.brf_visFat = _require(_dependencyMap[93]);
    Constant.brf_bmr = _require(_dependencyMap[94]);
    Constant.brf_protein = _require(_dependencyMap[95]);
    Constant.brf_somaAge = _require(_dependencyMap[96]);
    Constant.brf_bone = _require(_dependencyMap[97]);
    Constant.brf_water = _require(_dependencyMap[98]);
    Constant.brf_fatMass = _require(_dependencyMap[99]);
    Constant.brf_bodyFatIndex = _require(_dependencyMap[100]);
    Constant.brf_obesityLevel = _require(_dependencyMap[101]);
    Constant.brf_somatotype = _require(_dependencyMap[102]);
    Constant.brf_normalWeight = _require(_dependencyMap[103]);
    Constant.brf_fatFreeMass = _require(_dependencyMap[104]);
    Constant.brf_noon = _require(_dependencyMap[105]);
    Constant.brf_night = _require(_dependencyMap[106]);
    Constant.brf_morning = _require(_dependencyMap[107]);
    Constant.lst_addBtn = _require(_dependencyMap[85]);
    Constant.lst_marked = _require(_dependencyMap[84]);
    Constant.brf_bubble = _require(_dependencyMap[108]);
    Constant.main_dash = _require(_dependencyMap[109]);
    Constant.close_white_normal = _require(_dependencyMap[110]);
    Constant.usr_selected_man = _require(_dependencyMap[111]);
    Constant.usr_unselected_man = _require(_dependencyMap[112]);
    Constant.usr_selected_woman = _require(_dependencyMap[113]);
    Constant.usr_unselected_woman = _require(_dependencyMap[5]);
    Constant.upd_new_icon = _require(_dependencyMap[114]);
    Constant.upd_arrow_icon = _require(_dependencyMap[115]);
    Constant.upd_right_icon = _require(_dependencyMap[116]);
    Constant.upd_error_icon = _require(_dependencyMap[117]);

    Constant.basePath = function () {
        return '';
    };

    Constant.unitCoefficient = function (unitCode) {
        switch (unitCode) {
            case 1:
                return 1.0;

            case 2:
                return 2.2046226;

            case 3:
                return 2.0;

            default:
                return 0;
        }
    };

    Constant.deviceType = function () {
        switch (Constant.screenHeight()) {
            case 568:
                return 'Small';

            case 667:
                return 'Normal';

            case 736:
                return 'Plus';

            case 812:
            case 896:
                return 'X';

            case 1024:
                return 'Pad';

            case 1112:
                return 'PadPro105';

            case 1366:
                return 'PadPro129';

            default:
                return 'Other';
        }
    };

    Constant.deviceIsPad = function () {
        return Constant.deviceType() === 'Pad' || Constant.deviceType() === 'PadPro105' || Constant.deviceType() === 'PadPro129';
    };

    Constant.deviceIsX = function () {
        return Constant.deviceType() === 'X';
    };

    exports.default = Constant;

    var Function = exports.Function = function () {
        function Function() {
            babelHelpers.classCallCheck(this, Function);
        }

        babelHelpers.createClass(Function, null, [{
            key: "sourceOfImage",
            value: function sourceOfImage(filename) {
                return {
                    uri: Constant.basePath + filename,
                    scale: _reactNative.PixelRatio.get()
                };
            }
        }, {
            key: "getImageSource",
            value: function getImageSource(filename) {
                return _require(_dependencyMap[5]);
            }
        }, {
            key: "getDateString",
            value: function getDateString(type, d) {
                var year = d.getFullYear(),
                    mon = d.getMonth() + 1,
                    day = d.getDate(),
                    hou = d.getHours(),
                    minu = d.getMinutes(),
                    sec = d.getSeconds();
                mon = mon < 10 ? "0" + mon : mon;
                day = day < 10 ? "0" + day : day;
                hou = hou < 10 ? "0" + hou : hou;
                minu = minu < 10 ? "0" + minu : minu;
                sec = sec < 10 ? "0" + sec : sec;

                if (type == 0) {
                    return mon + _Localized.Localized.Global_Unit_Month + day + _Localized.Localized.Global_Unit_Date;
                } else if (type == 1) {
                    return mon + _Localized.Localized.Global_Unit_Month + day + _Localized.Localized.Global_Unit_Date;
                } else if (type == 2) {
                    return year + _Localized.Localized.Global_Unit_Year + mon + _Localized.Localized.Global_Unit_Month;
                } else if (type == 3) {
                    return day + _Localized.Localized.Global_Unit_Date;
                } else if (type == 4) {
                    return mon + _Localized.Localized.Global_Unit_Month;
                }

                return year + "/" + mon + "/" + day + " " + hou + ":" + minu + ":" + sec;
            }
        }, {
            key: "normalLog",
            value: function normalLog(message) { }
        }, {
            key: "normalLog",
            value: function normalLog(typeStr, message, objs) { }
        }, {
            key: "successLog",
            value: function successLog(message) { }
        }, {
            key: "successLog",
            value: function successLog(typeStr, message) { }
        }, {
            key: "failedLog",
            value: function failedLog(typeStr, message) {
                console.error(typeStr + ' - ' + message + ' 失败');
            }
        }, {
            key: "failedLog",
            value: function failedLog(message) { }
        }, {
            key: "failedLog",
            value: function failedLog(typeStr, message, reason) { }
        }]);
        return Function;
    }();

    Function.equalNull = function (object) {
        return object === null || typeof object === 'undefined' || typeof object === 'number' && isNaN(object) || typeof object === 'string' && object.length === 0 || Array.isArray(object) && object.length === 0;
    };

    Function.handleNaN = function (number) {
        if (typeof number === 'number') {
            if (isNaN(number)) {
                return 0;
            } else {
                return number;
            }
        } else {
            return Function.handleNaN(Number(number));
        }
    };

    Function.convertUnit = function (unitCode) {
        switch (unitCode) {
            case 1:
                return _Localized.Localized.Global_Unit_KG;

            case 2:
                return _Localized.Localized.Global_Unit_Pound;

            case 3:
                return _Localized.Localized.Global_Unit_Jin;

            default:
                return '';
        }
    };

    Function.converKgToOther = function (value, unitCode) {
        return value * Constant.unitCoefficient(unitCode);
    };

    Function.converKgToOtherString = function (value, unitCode) {
        return Number(Function.converKgToOther(value, unitCode)).toFixed(1);
    };

    Function.converKgToOtherStringWithUnit = function (value, unitCode) {
        return Function.converKgToOtherString(value, unitCode) + Function.convertUnit(unitCode);
    };

    Function.converInfo = function (infoType) {
        return _Localized.Localized['Global_UserInfo_' + infoType];
    };

    Function.converRelevanceToText = function (relevanceCode) {
        switch (relevanceCode) {
            case 1:
                return _Localized.Localized.Globla_Relevance_Dad;

            case 2:
                return _Localized.Localized.Globla_Relevance_Mom;

            case 3:
                return _Localized.Localized.Globla_Relevance_Husband;

            case 4:
                return _Localized.Localized.Globla_Relevance_Wife;

            case 5:
                return _Localized.Localized.Globla_Relevance_Son;

            case 6:
                return _Localized.Localized.Globla_Relevance_Daughter;

            case 7:
                return _Localized.Localized.Globla_Relevance_Grandpa;

            case 8:
                return _Localized.Localized.Globla_Relevance_Grandma;

            case 9:
                return _Localized.Localized.Globla_Relevance_Brother;

            case 10:
                return _Localized.Localized.Globla_Relevance_OlderSister;

            case 11:
                return _Localized.Localized.Globla_Relevance_YoungerBrother;

            case 12:
                return _Localized.Localized.Globla_Relevance_YoungerSister;

            case 88:
                return _Localized.Localized.Globla_Relevance_Other;

            case 0:
                return '主账户';

            case 99:
                return '访客';

            default:
                return '';
        }
    };

    Function.converTextToRelevance = function (relevanceText) {
        switch (relevanceText) {
            case _Localized.Localized.Globla_Relevance_Dad:
                return 1;

            case _Localized.Localized.Globla_Relevance_Mom:
                return 2;

            case _Localized.Localized.Globla_Relevance_Husband:
                return 3;

            case _Localized.Localized.Globla_Relevance_Wife:
                return 4;

            case _Localized.Localized.Globla_Relevance_Son:
                return 5;

            case _Localized.Localized.Globla_Relevance_Daughter:
                return 6;

            case _Localized.Localized.Globla_Relevance_Grandpa:
                return 7;

            case _Localized.Localized.Globla_Relevance_Grandma:
                return 8;

            case _Localized.Localized.Globla_Relevance_Brother:
                return 9;

            case _Localized.Localized.Globla_Relevance_OlderSister:
                return 10;

            case _Localized.Localized.Globla_Relevance_YoungerBrother:
                return 11;

            case _Localized.Localized.Globla_Relevance_YoungerSister:
                return 12;

            case _Localized.Localized.Globla_Relevance_Other:
                return 88;

            case '主账户':
                return 0;

            case '访客':
                return 99;

            default:
                return 88;
        }
    };

    Function.textHandler = function (_ref) {
        var type = _ref.type,
            value = _ref.value,
            unit = _ref.unit;

        if (Function.equalNull(value) || value == 0) {
            return '- -';
        }

        switch (type) {
            case 'bmi':
            case 'visFat':
            case 'bmr':
            case 'somaAge':
            case 'bodyFatIndex':
            case 'obesityLevel':
                return String(value);

            case 'fat':
            case 'muscle':
            case 'water':
            case 'protein':
            case 'bone':
                return String(value) + '%';

            case 'fatMass':
            case 'fatFreeMass':
                return Function.converKgToOtherStringWithUnit(value, unit);

            case 'normalWeight':
                var height = _YMUser2.default.getCurrentUserInfo().height;

                return Function.converKgToOtherString(18.5 * height * height * 0.0001, unit) + '-' + Function.converKgToOtherStringWithUnit(24.0 * height * height * 0.0001, unit);

            case 'somatotype':
                return '';

            default:
                return '- -';
        }
    };

    Function.reorganizeWeightData = function (data, type) {
        var date = new Date();
        date.setTime(data.createTime * 1000);
        var object = {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
            hour: date.getHours(),
            minute: date.getMinutes()
        };

        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                var element = object[key];

                if (element < 10) {
                    object[key] = '0' + element;
                } else {
                    object[key] = String(element);
                }
            }
        }

        var yesteday = new Date();
        yesteday.setTime(Date.now() - 86400000);
        var dateStr = '';

        if (date.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)) {
            dateStr = '今天';
        } else if (date.setHours(0, 0, 0, 0) === yesteday.setHours(0, 0, 0, 0)) {
            dateStr = '昨天';
        } else {
            dateStr = object.year + '年' + object.month + '月' + object.day + '日';
        }

        return babelHelpers.extends({}, data, object, {
            date: dateStr,
            weighType: type || 'Normal'
        });
    };

    var Document = function Document() {
        babelHelpers.classCallCheck(this, Document);
    };

    Document.About = {
        infoType: _propTypes2.default.string,
        sex: _propTypes2.default.number,
        height: _propTypes2.default.number,
        age: _propTypes2.default.number,
        birthday: _propTypes2.default.string,
        relevance: _propTypes2.default.number,
        unit: _propTypes2.default.number,
        uid: _propTypes2.default.string,
        did: _propTypes2.default.string,
        deviceName: _propTypes2.default.string,
        macNo: _propTypes2.default.string,
        deviceVer: _propTypes2.default.number,
        weight: _propTypes2.default.number,
        bmi: _propTypes2.default.number,
        fat: _propTypes2.default.number,
        muscle: _propTypes2.default.number,
        water: _propTypes2.default.number,
        protein: _propTypes2.default.number,
        visFat: _propTypes2.default.number,
        bone: _propTypes2.default.number,
        bmr: _propTypes2.default.number,
        somaAge: _propTypes2.default.number,
        fatMass: _propTypes2.default.number,
        somatotype: _propTypes2.default.number,
        bodyFatIndex: _propTypes2.default.number,
        obesityLevel: _propTypes2.default.number,
        normalWeight: _propTypes2.default.number,
        fatFreeMass: _propTypes2.default.number,
        intervalIndex: _propTypes2.default.number,
        shownNodeControl: _propTypes2.default.Array,
        realNodeControl: _propTypes2.default.Array,
        evaluate: _propTypes2.default.string,
        resistance: _propTypes2.default.number,
        createTime: _propTypes2.default.number,
        weighType: _propTypes2.default.string,
        isUploaded: _propTypes2.default.number
    };
}, 10010, [10318, 10033, 10042, 10013, 10019, 10025, 10028, 10031, 10034, 10037, 10040, 10043, 10046, 10049, 10052, 10055, 10058, 10061, 10064, 10067, 10070, 10073, 10076, 10079, 10082, 10085, 10088, 10091, 10094, 10097, 10100, 10103, 10106, 10109, 10112, 10115, 10118, 10121, 10124, 10127, 10130, 10133, 10136, 10139, 10142, 10145, 10148, 10151, 10154, 10157, 10160, 10163, 10166, 10169, 10172, 10175, 10178, 10181, 10184, 10187, 10190, 10193, 10196, 10199, 10202, 10205, 10208, 10211, 10214, 10217, 10220, 10223, 10226, 10229, 10232, 10235, 10238, 10241, 10244, 10247, 10250, 10253, 10256, 10259, 10262, 10265, 10268, 10271, 10274, 10277, 10280, 10283, 10286, 10289, 10292, 10295, 10298, 10301, 10304, 10307, 10310, 10313, 10316, 10319, 10322, 10325, 10328, 10331, 10334, 10337, 10340, 10343, 10346, 10349, 10352, 10355, 10358, 10361], "projects/com.yunmai.scales.ios/Main/Tools/Global.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Localized = undefined;

    var _LocalizedStrings = _require(_dependencyMap[0]);

    var _LocalizedStrings2 = babelHelpers.interopRequireDefault(_LocalizedStrings);

    var Localized = exports.Localized = new _LocalizedStrings2.default({
        "en": {
            Global_DateFomattedIdentifier: 'en-US',
            Global_Text_Space: ' ',
            Global_UserInfo_Unit: 'Unit',
            Global_UserInfo_Age: 'Age',
            Global_UserInfo_Height: 'Height',
            Global_UserInfo_Sex: 'Gender',
            Global_UserInfo_Relevance: 'Relationship',
            Global_UserInfo_Nickname: 'Nickname',
            Global_UserInfo_Weight: 'Weight',
            Global_UserInfo_bmi: 'BMI',
            Global_UserInfo_fat: 'Body Fat',
            Global_UserInfo_water: 'Water',
            Global_UserInfo_muscle: 'Muscle',
            Global_UserInfo_bone: 'Bone Mass',
            Global_UserInfo_bmr: 'BMR',
            Global_UserInfo_visFat: 'Visceral Fat',
            Global_UserInfo_protein: 'Protein',
            Global_UserInfo_somaAge: 'Body Age',
            Global_UserInfo_fatMass: 'Fat Mass',
            Global_UserInfo_somatotype: 'Somatotype',
            Global_UserInfo_bodyFatIndex: 'Body Fat Index',
            Global_UserInfo_obesityLevel: 'Obesity Level',
            Global_UserInfo_normalWeight: 'Normal Weight',
            Global_UserInfo_fatFreeMass: 'Fat Free Mass',
            Global_Unit_KG: 'Kg',
            Global_Unit_Pound: 'Lb',
            Global_Unit_Jin: 'Jin',
            Global_Unit_CalPerDay: 'cal/day',
            Global_Unit_Years: '',
            Global_Unit_Year: 'Year',
            Global_Unit_Month: 'Month',
            Global_Unit_Week: 'Week',
            Global_Unit_Date: 'Day',
            Global_Unit_Day: 'Day',
            Global_Unit_Hour: 'Hour',
            Global_Unit_Minute: 'Minute',
            Global_Unit_Second: 'Second',
            Global_Unit_Year_Abbr: 'Y',
            Global_Unit_Month_Abbr: 'M',
            Global_Unit_Week_Abbr: 'W',
            Global_Week_Mon_Short: 'M',
            Global_Week_Tue_Short: 'T',
            Global_Week_Wed_Short: 'W',
            Global_Week_Thu_Short: 'T',
            Global_Week_Fri_Short: 'F',
            Global_Week_Sat_Short: 'S',
            Global_Week_Sun_Short: 'S',
            Global_Sex_Male: 'Male',
            Global_Sex_Female: 'Female',
            Globla_Relevance_Dad: 'Dad',
            Globla_Relevance_Mom: 'Mon',
            Globla_Relevance_Husband: 'Husband',
            Globla_Relevance_Wife: 'Wife',
            Globla_Relevance_Son: 'Son',
            Globla_Relevance_Daughter: 'Daughter',
            Globla_Relevance_Grandpa: 'Grandpa',
            Globla_Relevance_Grandma: 'Grandma',
            Globla_Relevance_Brother: 'Brother',
            Globla_Relevance_OlderSister: 'Older sister',
            Globla_Relevance_YoungerBrother: 'Younger brother',
            Globla_Relevance_YoungerSister: 'Younger sister',
            Globla_Relevance_Other: 'Other',
            Global_Interaction_Add: 'Add',
            Global_Interaction_Delete: 'Delete',
            Global_Interaction_Done: 'Confirm',
            Global_Interaction_Save: 'Save',
            Global_Interaction_Cancel: 'Cancel',
            Global_Interaction_Alert: 'Reminder',
            Global_Interaction_Finished: 'Finish',
            Global_Interaction_Previous: 'Previous',
            Global_Interaction_Next: 'Next',
            Global_Interaction_PleaseEnterNumber: 'Please enter correct characters',
            Global_Interaction_TooHigh: 'Exceed limit, please enter again',
            Global_Interaction_TooLow: 'Exceed limit, please enter again',
            Global_Interaction_TooOld: 'Exceed limit, please enter again',
            Global_Interaction_TooYoung: 'Exceed limit, please enter again',
            Global_Interaction_TooLong: 'Too long, please enter again',
            Global_Interaction_PleaseFillInHeight: 'Please enter height',
            Global_Interaction_PleaseFillInAge: 'Please enter age',
            Global_Interaction_PleaseFillInGender: 'Please enter gender',
            Global_Interaction_PleaseFillInRelevance: 'Please enter relationship',
            Global_Interaction_PleaseFillInNickname: 'Please enter nickname',
            Global_Evaluation_bmi_Slim: 'Slim',
            Global_Evaluation_bmi_Normal: 'Normal',
            Global_Evaluation_bmi_PartialFat: 'Fat',
            Global_Evaluation_bmi_fat: 'Heavy',
            Global_Evaluation_bmi_Overweight: 'Overweight',
            Global_Evaluation_fat_Low: 'Low',
            Global_Evaluation_fat_Normal: 'Normal',
            Global_Evaluation_fat_PartialFat: 'Fat',
            Global_Evaluation_fat_fat: 'Overweight',
            Global_Evaluation_water_Low: 'Low',
            Global_Evaluation_water_Standard: 'Normal',
            Global_Evaluation_water_High: 'High',
            Global_Evaluation_muscle_Low: 'Low',
            Global_Evaluation_muscle_Standard: 'Normal',
            Global_Evaluation_bone_Low: 'Low',
            Global_Evaluation_bone_Normal: 'Normal',
            Global_Evaluation_bone_High: 'High',
            Global_Evaluation_bmr_Unstandard: 'Under standard',
            Global_Evaluation_bmr_Standard: 'Good',
            Global_Evaluation_visFat_Normal: 'Normal',
            Global_Evaluation_visFat_High: 'High',
            Global_Evaluation_visFat_VeryHigh: 'Extremely High',
            Global_Evaluation_protein_Low: 'Low',
            Global_Evaluation_protein_Normal: 'Normal',
            Global_Evaluation_protein_High: 'High',
            Global_Evaluation_somaAge_Young: 'Under',
            Global_Evaluation_somaAge_Old: 'Over',
            Global_Evaluation_fatMass_Low: 'Low',
            Global_Evaluation_fatMass_Normal: 'Normal',
            Global_Evaluation_fatMass_Fat: 'Fat',
            Global_Evaluation_fatMass_Overweight: 'Overweight',
            Global_Evaluation_somatotype_RecessiveObesity: 'Recessive obesity',
            Global_Evaluation_somatotype_Fat: 'Fat',
            Global_Evaluation_somatotype_AthleticFat: 'Athletic fat',
            Global_Evaluation_somatotype_LackOfTraining: 'Lack of training',
            Global_Evaluation_somatotype_Standard: 'Standard',
            Global_Evaluation_somatotype_AthleticStandard: 'Athletic standard',
            Global_Evaluation_somatotype_Slim: 'Slim',
            Global_Evaluation_somatotype_AthleticSlim: 'Athletic slim',
            Global_Evaluation_somatotype_Bodybuilding: 'Bodybuilding',
            Global_Evaluation_bodyFatIndex_VeryLow: 'Very low',
            Global_Evaluation_bodyFatIndex_Low: 'Low',
            Global_Evaluation_bodyFatIndex_Normal: 'Normal',
            Global_Evaluation_bodyFatIndex_Good: 'Good',
            Global_Evaluation_bodyFatIndex_High: 'High',
            Global_Evaluation_bodyFatIndex_VeryHigh: 'Very high',
            Global_Evaluation_bodyFatIndex_ExtremelyHigh: 'Extremely high',
            Global_Evaluation_obesityLevel_NotObese: 'Not obese',
            Global_Evaluation_obesityLevel_BitFat: 'Bit fat',
            Global_Evaluation_obesityLevel_Fat: 'Fat',
            Global_Evaluation_obesityLevel_Overweight: 'Overweight',
            Global_Evaluation_normalWeight_Light: 'Light',
            Global_Evaluation_normalWeight_Normal: 'Normal',
            Global_Evaluation_normalWeight_Weight: 'Weight',
            Global_Evaluation_fatFreeMass_: '',
            Home_Title_VisitorMode: 'Visitor',
            Home_Subtitle_Connect: 'Connected',
            Home_Subtitle_Disconnect: 'Connecting',
            Home_Subtitle_BTBeenOff: 'Bluetooth been off',
            Home_Text_Day: ' days',
            Home_Text_Hour: 'hours',
            Home_Text_Minute: 'minutes',
            Home_Text_Ago: ' ago',
            Home_Text_Just: 'Just now',
            Home_Text_Score: 'points',
            Home_Text_Measuring: 'Measuring',
            Home_Text_PleaseBarefootOnTheScale: 'Please step on\nthe scale with barefoot',
            Home_Text_ToCompleteTheFirstWeighing: '\nto finish the first\nweigh in. ',
            Home_Text_Today: 'Today',
            Home_Text_Yesterday: 'Yesterday',
            Home_Text_NeedSomeBasicInformation: 'Before we get started, we need to know some basic information',
            Home_Text_MakeSureTheContent: 'Make sure the content is real and effective',
            Home_Interaction_ExitedVisitorMode: 'Visitor mode has been exited',
            EvaluationCard_Text_somatotype_RecessiveObesity: 'Recessive\nobesity',
            EvaluationCard_Text_somatotype_Fat: 'Fat',
            EvaluationCard_Text_somatotype_AthleticFat: 'Athletic\nfat',
            EvaluationCard_Text_somatotype_LackOfTraining: 'Lack of\ntraining',
            EvaluationCard_Text_somatotype_Standard: 'Standard',
            EvaluationCard_Text_somatotype_AthleticStandard: 'Athletic\nstandard',
            EvaluationCard_Text_somatotype_Slim: 'Slim',
            EvaluationCard_Text_somatotype_AthleticSlim: 'Athletic\nslim',
            EvaluationCard_Text_somatotype_Bodybuilding: 'Bodybuilding',
            EvaluationCard_Text_Description_bmi: 'The body mass index (BMI) is a value derived from the mass (weight) and height of an individual. The BMI is defined as the body mass divided by the square of the body height.',
            EvaluationCard_Text_Description_fat: 'The body fat percentage is the total mass of fat divided by total body mass.',
            EvaluationCard_Text_Description_muscle: 'Muscle mass is composed of your muscle and bone tissue as well as the water in your body and your organs.',
            EvaluationCard_Text_Description_water: 'Body Water is the total amount of fluid in the body expressed as a percentage of total weight.',
            EvaluationCard_Text_Description_protein: 'Protein is a nutrient needed by the human body for growth and maintenance. Aside from water, proteins are the most abundant kind of molecules in the body.',
            EvaluationCard_Text_Description_visFat: 'Visceral fat is body fat that is stored within the abdominal cavity and is therefore stored around a number of important internal organs such as the liver, pancreas and intestines.',
            EvaluationCard_Text_Description_bone: 'The predicted weight of bone mineral in your body. It’s important to maintain healthy bones by having a balanced diet rich in calcium and by doing plenty of weight-bearing exercise.',
            EvaluationCard_Text_Description_bmr: 'Basal metabolic rate (BMR) is the amount of energy expended while at rest in a neutrally temperate environment, in the post-absorptive state.',
            EvaluationCard_Text_Description_somaAge: 'Body age is a measurement of how old you are biologically based upon your health and fitness level as opposed to what your birth certificate indicates.',
            EvaluationCard_Text_Description_fatMass: 'The weight of the fat contained in the body. The fat mass contains the subcutaneous fat and the visceral fat.',
            EvaluationCard_Text_Description_somatotype: '',
            EvaluationCard_Text_Description_bodyFatIndex: 'The body fat index(BFI) is a grading of body fat rates. If the BFI is too high, can increase the risk of hypertension, coronary heart disease, diabetes and other diseases. if the BFI is too low, it may cause dysfunction. The BFI is an important indicator of health.',
            EvaluationCard_Text_Description_obesityLevel: 'The obesity level reflects the visual effect of the body. Keep good body shape will be more healthy and dynamic, obese body not only affect the visual effect, there is also the risk of causing the disease.',
            EvaluationCard_Text_Description_normalWeight: 'Normal weight is ideal weight range that based on your current basic data derived. In the normal weight range looks more healthy, is to determine whether an important indicator of obesity.',
            EvaluationCard_Text_Description_fatFreeMass: 'Fat free mass(FFM) is also known as lean body weight. Refers to the sum of the other components other than fat. Skin, muscle, bones and internal organs are the main components of lean body weight.',
            EvaluationCard_Text_Evaluate_bmi_1: 'BMI is relatively low currently which belong to the slim crowd. There is a little distance from standard stature.',
            EvaluationCard_Text_Evaluate_bmi_2: 'BMI is normal. Please continue to maintain the perfect stature.',
            EvaluationCard_Text_Evaluate_bmi_3: 'BMI is relatively high. There is a litte distance from standard stature.',
            EvaluationCard_Text_Evaluate_bmi_4: 'BMI IS relatively higher.Please pay attention to improve living habits in case of higher risk such as heart disease, high blood pressure and other diseases.',
            EvaluationCard_Text_Evaluate_bmi_5: 'BMI IS relatively overweight.Please pay attention to improve living habits in case of higher risk such as heart disease, high blood pressure and other diseases.',
            EvaluationCard_Text_Evaluate_fat_1: 'It will consume protein when body fat is not enough to give the energy supply in daily actiivties.Excessive protein consumption could damage human tissue at the same time.',
            EvaluationCard_Text_Evaluate_fat_2: 'Congratulations. The body fat is normal,please keep it up.',
            EvaluationCard_Text_Evaluate_fat_3: 'Body fat is high,indicating that excessive fat intake with lack of exercise. Please be vigilant to avoid diabetes, high blood pressure and other  cerebrovascular diseases caused by accumulation of fat.',
            EvaluationCard_Text_Evaluate_fat_4: 'Body fat is higher,indicating that excessive fat intake with lack of exercise. Please be vigilant to avoid diabetes, high blood pressure and other  cerebrovascular diseases in long term.',
            EvaluationCard_Text_Evaluate_muscle_1: 'Lacking of exercise and diet are the major causes of muscle loss.Muscle is the main force of energy consumption, which increasing muscle to improve calorie consumption with a healthy way to reduce excess fat.',
            EvaluationCard_Text_Evaluate_muscle_2: 'Congratulations. The muscle is normal,please keep it up.',
            EvaluationCard_Text_Evaluate_water_1: 'Keeping plenty of water can help your body metabolize and take away waste and toxins from the body',
            EvaluationCard_Text_Evaluate_water_2: 'Congratulations. The water is normal,please keep it up.',
            EvaluationCard_Text_Evaluate_water_3: 'Belong to edema body at present.The reason is the lack of water in the body, which can not promote metabolism. The body of excess trace elements can not excrete.',
            EvaluationCard_Text_Evaluate_protein_1: 'Low protein is caused by inadequate nutrient intake or indigestion.Lack of protein can lead to decreased immunity, muscle weakness and anemia, and lower basal metabolism.',
            EvaluationCard_Text_Evaluate_protein_2: 'Congratulations. The protein is normal,please keep it up.',
            EvaluationCard_Text_Evaluate_protein_3: 'High protein is caused by excess nutrients. Excessive protein intake can lead to conversion into fat, causing fat accumulation',
            EvaluationCard_Text_Evaluate_visFat_1: 'Visceral fat is normal. appropriate visceral fat can significantly reduce the risk of cerebrovascular disease.',
            EvaluationCard_Text_Evaluate_visFat_2: 'Too much fat hoarding around viscera will lead to the high visceral fat.It will cause space smaller in abdominal and thoracic,visceral function decline, even causing diabetes and other diseases.',
            EvaluationCard_Text_Evaluate_visFat_3: 'Please be vigilant of too much fat hoarding around viscera will cause declining visceral function, heart disease, high blood pressure and other diseases of the higher incidence.',
            EvaluationCard_Text_Evaluate_bone_1: 'Your standard of bone mass will not change significantly in the short term.',
            EvaluationCard_Text_Evaluate_bmr_1: 'BMR is not up to standard! Diet, stay up all night, lack of exercise will lead to low basal metabolic rate, and the corresponding lower body energy consumption, even eating a litle can easier to get fat.',
            EvaluationCard_Text_Evaluate_bmr_2: 'Congratulations. Your BMR is up to the standard. Improve basal metabolic rate, body energy consumption will increase accordingly.It is not easy to gain weight.',
            EvaluationCard_Text_Evaluate_somaAge_1: 'Your body age is older than the actual age, indicating that the body function is slightly aging. Stay up late, lack of exercise will lead to older body age.',
            EvaluationCard_Text_Evaluate_somaAge_2: 'Young body age is indicating that the body of the normal function.Please keep it up.',
            EvaluationCard_Text_Evaluate_fatMass_1: 'It will consume protein when body fat is not enough to give the energy supply in daily actiivties.Excessive protein consumption could damage human tissue at the same time.',
            EvaluationCard_Text_Evaluate_fatMass_2: 'Congratulations. The body fat is normal,please keep it up.',
            EvaluationCard_Text_Evaluate_fatMass_3: 'Body fat is high,indicating that excessive fat intake with lack of exercise. Please be vigilant to avoid diabetes, high blood pressure and other  cerebrovascular diseases caused by accumulation of fat.',
            EvaluationCard_Text_Evaluate_fatMass_4: 'Body fat is higher,indicating that excessive fat intake with lack of exercise. Please be vigilant to avoid diabetes, high blood pressure and other  cerebrovascular diseases in long term.',
            EvaluationCard_Text_Evaluate_somatotype_1: '',
            EvaluationCard_Text_Evaluate_somatotype_2: 'Your body type is somewhat plump, fat accumulation will continue to cause diabetes, high blood pressure and other diseases. Although there is a lovely side, but health is more important',
            EvaluationCard_Text_Evaluate_somatotype_3: '',
            EvaluationCard_Text_Evaluate_somatotype_4: '',
            EvaluationCard_Text_Evaluate_somatotype_5: 'Your body indicators are very standard, please continue to maintain a healthy eating habits and exercise.',
            EvaluationCard_Text_Evaluate_somatotype_6: '',
            EvaluationCard_Text_Evaluate_somatotype_7: '',
            EvaluationCard_Text_Evaluate_somatotype_8: 'Although a bit slim, but also a good body, continue to maintain',
            EvaluationCard_Text_Evaluate_somatotype_9: '',
            EvaluationCard_Text_Evaluate_bodyFatIndex_1: 'The body fat index is too low, lack of body fat may lead to excessive consumption of human activities protein, and further damage the body\'s normal function.',
            EvaluationCard_Text_Evaluate_bodyFatIndex_2: 'The body fat index is low. Body fat for the protection of cardiovascular health is of great significance, it is recommended appropriate fat.',
            EvaluationCard_Text_Evaluate_bodyFatIndex_3: 'The body fat index is normal, in a healthy state',
            EvaluationCard_Text_Evaluate_bodyFatIndex_4: 'The body fat index is normal, to continue to maintain a healthy lifestyle',
            EvaluationCard_Text_Evaluate_bodyFatIndex_5: 'The body fat index is high, pay attention to lose weight',
            EvaluationCard_Text_Evaluate_bodyFatIndex_6: 'The body fat index is too high, increase the risk of various chronic diseases, the need to develop a fat reduction plan!',
            EvaluationCard_Text_Evaluate_bodyFatIndex_7: 'The body fat index is extremely high, the risk of health diseases greatly improved, you must change the diet and lifestyle it! Insist on losing weight!',
            EvaluationCard_Text_Evaluate_obesityLevel_1: 'Looks not fat! If you want to look more healthy and dynamic, you can exercise the muscles.',
            EvaluationCard_Text_Evaluate_obesityLevel_2: 'Looks a little fat, pay attention to prevent stature further obesity!',
            EvaluationCard_Text_Evaluate_obesityLevel_3: 'May someone say that you fat, seriously implement the weight loss plan it, refueling!',
            EvaluationCard_Text_Evaluate_obesityLevel_4: 'Obesity will increase the risk of disease, refueling will be successful weight loss!',
            EvaluationCard_Text_Evaluate_normalWeight_1: 'Weight below normal, should be appropriate weight gain to improve your health!',
            EvaluationCard_Text_Evaluate_normalWeight_2: 'The current weight is normal, to continue to maintain!',
            EvaluationCard_Text_Evaluate_normalWeight_3: 'The current weight is higher than the normal level, the need for appropriate weight loss to make the body more healthy.',
            EvaluationCard_Text_Evaluate_fatFreeMass_: '',
            EvaluationCard_Text_Suggest: 'There is a trick here.',
            EvaluationCard_Text_Suggest_bmi_1: 'Increase muscle! Strength training helps stimulate muscle growth and improves body consumption. It will be the good chooses On the diet for protein for energy supplement, like chicken breast, shrimp, egg.',
            EvaluationCard_Text_Suggest_bmi_2: 'Develop a regular lifestyle, try to exercise 2-3 times a week to maintain your body\'s basal metabolism and increase your body\'s circulatory capacity. Remember to stretch and relax after exercise.',
            EvaluationCard_Text_Suggest_bmi_3: 'Reduce fat! 2-3 high intensity intermittent exercises a week can help burn fat and improve heart and lung functions. The principle is less than the consumption of fat intake, as long as the exercise and the reasonable control of intake,you will soon be able to be slim.',
            EvaluationCard_Text_Suggest_bmi_4: 'Control diet and increase exercise consumption. Aerobic exercise can help fat consumption. When you have a larger weight base, do not choose to exercise more pressure on your knees. You can start with walking and cycling.',
            EvaluationCard_Text_Suggest_bmi_5: 'Control strictly of intake is necessary. Please keep away from high calorie foods. At the same time, increasing the amount of exercise will help to consume fat. When you have a larger weight base, do not choose more pressure on your knees, such as running and beating.',
            EvaluationCard_Text_Suggest_fat_1: 'Fat is divided into saturated fatty acids and unsaturated fatty acids. Unsaturated fats are easy to decompose and are not easy to accumulate into fat. They can be taken in proper quantities to supplement energy for the body. Nuts, soybeans, sunflower seeds, peanuts and so on are good choices.',
            EvaluationCard_Text_Suggest_fat_2: 'Exercise and reasonable diet! Adhere to exercise can improve the basic metabolism, help to eliminate fatigue caused by work, work and rest can make work more efficient.',
            EvaluationCard_Text_Suggest_fat_3: 'Reduce fat! 2-3 times a week for strength training is conducive to the consumption of fat, high intensity intermittent exercise make fat burning time, it will be helpful when you are lying after workouts.',
            EvaluationCard_Text_Suggest_fat_4: 'Caloric intake should be strictly controlled, and excess fat in the body can be consumed by exercise. Long period required to maintain the consumption is greater than three do seven intake, eat a reasonable diet to reduce fat more effective.',
            EvaluationCard_Text_Suggest_muscle_1: 'When you are in process of increase muscle, your body requires energy support, with greater intake than consumption, especially sugar and protein. High protein foods can choose chicken breast, egg white, etc.. Sugar can be taken from carbohydrates, such as grains, sweet potatoes, etc.',
            EvaluationCard_Text_Suggest_muscle_2: 'When you are in process of increase muscle, your body requires energy support, with greater intake than consumption, especially sugar and protein. High protein foods can choose chicken breast, egg white, etc.. Sugar can be taken from carbohydrates, such as grains, sweet potatoes, etc.',
            EvaluationCard_Text_Suggest_water_1: 'After your weight loss, the water decreases, but body fat does not change, the reduction may be part of the body\'s moisture, it will lead to inadequate moisture and metabolic disorders, indicating that weight loss is unscientific.',
            EvaluationCard_Text_Suggest_water_2: 'Keep a regular diet and rest. Eight glasses of water a day will keep you up to normal! If you do exercise, please pay attention to add moisture, make up for excessive sweating caused by water loss.',
            EvaluationCard_Text_Suggest_water_3: 'Pay attention to supplement the water, promote the body metabolism, water excretion can take away the trace elements and waste waste, which can maintain a metabolic cycle.',
            EvaluationCard_Text_Suggest_protein_1: 'Protein is an important nutrient for physical activity and muscle growth, increase the protein can be added through daily diet, egg, milk and beans are good sources of protein, thsoe should be included in your diets.',
            EvaluationCard_Text_Suggest_protein_2: 'An adequate diet, maintain a balanced diet could keep protein in a stable level.',
            EvaluationCard_Text_Suggest_protein_3: 'Keep a mild and resonable diet, keep exercise and regular work and rest will be in good lifestyle.',
            EvaluationCard_Text_Suggest_visFat_1: 'Keep a resonable diet, refuse high calorie foods, keep exercise and regular work and rest will be in good lifestyle.',
            EvaluationCard_Text_Suggest_visFat_2: 'Increase the amount of exercise and promote visceral fat consumption, 1-2 aerobic exercises can be arranged every week, 30 minutes walking after meals, and the diet is mild and keep away from high calorie foods.',
            EvaluationCard_Text_Suggest_visFat_3: 'Keep a mild and resonable diet, refuse high calorie foods, keep exercise with 30 miuntes walking after meals, it is helpful for food digestion and driving energy consumption.',
            EvaluationCard_Text_Suggest_bone_1: '20 minutes walking after meals every day. Proper exposure to the sun helps the absorption of calcium. It is usually obtained from foods such as milk, soy products, fish and animal bones.',
            EvaluationCard_Text_Suggest_bmr_1: 'Strength training can increase basal metabolism and increase energy consumption. foods such as chicken breast, eggs can well provide this. Protein consumes more energy than carbohydrates and fats.The body uses calories to digest proteins also.',
            EvaluationCard_Text_Suggest_bmr_2: 'BMR is closely related to diet, daily work and exercise. Keep a healthy schedule and a balanced diet with at least once a week workout to keep away from fat.',
            EvaluationCard_Text_Suggest_somaAge_1: 'Maintain a healthy schedule and eat less fat and high calorie foods, strengthen exercise to keep your body in a stable metabolic cycle, for staying young and energetic.',
            EvaluationCard_Text_Suggest_somaAge_2: 'Keep a healthy lifestyle and do exercises。Keep a reasonable schedule and a nutritious diet to keep your body active and young.',
            EvaluationCard_Text_Suggest_fatMass_1: 'Fat is divided into saturated fatty acids and unsaturated fatty acids. Unsaturated fats are easy to decompose and are not easy to accumulate into fat. They can be taken in proper quantities to supplement energy for the body. Nuts, soybeans, sunflower seeds, peanuts and so on are good choices.',
            EvaluationCard_Text_Suggest_fatMass_2: 'Exercise and reasonable diet! Adhere to exercise can improve the basic metabolism, help to eliminate fatigue caused by work, work and rest can make work more efficient.',
            EvaluationCard_Text_Suggest_fatMass_3: 'Reduce fat! 2-3 times a week for strength training is conducive to the consumption of fat, high intensity intermittent exercise make fat burning time, it will be helpful when you are lying after workouts.',
            EvaluationCard_Text_Suggest_fatMass_4: 'Caloric intake should be strictly controlled, and excess fat in the body can be consumed by exercise. Long period required to maintain the consumption is greater than three do seven intake, eat a reasonable diet to reduce fat more effective.',
            EvaluationCard_Text_Suggest_somatotype_1: '',
            EvaluationCard_Text_Suggest_somatotype_2: 'It is recommended to adjust the diet, reduce the intake of high-fat food, of course, sweets are restricted; in the exercise to maintain the frequency and length of aerobic training, 3 to 4 times a week, 30 minutes per time.',
            EvaluationCard_Text_Suggest_somatotype_3: '',
            EvaluationCard_Text_Suggest_somatotype_4: '',
            EvaluationCard_Text_Suggest_somatotype_5: 'Regular way of life is to keep a good foundation for the body. If you want to have a more bodybuilding body lines, you can increase the strength of 2 to 3 times a week training, after practicing remember to relax and stretch',
            EvaluationCard_Text_Suggest_somatotype_6: '',
            EvaluationCard_Text_Suggest_somatotype_7: '',
            EvaluationCard_Text_Suggest_somatotype_8: 'You need to carry out a reasonable diet management, and more to add some eggs, fish, meat and other high-protein foods to ensure energy intake, but also with the appropriate training, adequate exercise can improve the body\'s ability to absorb energy.',
            EvaluationCard_Text_Suggest_somatotype_9: '',
            EvaluationCard_Text_Suggest_bodyFatIndex_1: 'By eating fat-rich foods can improve body fat, better food choices are nuts, sunflower seeds, olive oil and so on.',
            EvaluationCard_Text_Suggest_bodyFatIndex_2: 'Appropriate fat can be more than eat, do not picky eat, early to bed and early to start, to develop a good habit of living it!',
            EvaluationCard_Text_Suggest_bodyFatIndex_3: 'It is recommended to maintain a good living habits, get rid of burn the candle, sedentary, no breakfast and other bad habits.',
            EvaluationCard_Text_Suggest_bodyFatIndex_4: 'Eat more fruits and vegetables, exercise to ease the work pressure, a weekly outdoor activities to contact the nature, to maintain a relaxed and happy mood, you can improve the quality of life',
            EvaluationCard_Text_Suggest_bodyFatIndex_5: 'Check the eating habits, get rid of bad habits: eat too little breakfast, lunch and dinner to eat too full, more meat and less vegetables, prefer greasy food. Check the living habits, get rid of bad habits: sedentary, no weekly sports training.',
            EvaluationCard_Text_Suggest_bodyFatIndex_6: 'Diet recommended to refuse high-calorie foods such as carbonated beverages, high-sugar snacks, fried foods and so on. Living habits suggest increasing daily physical activity, such as walking instead of driving.',
            EvaluationCard_Text_Suggest_bodyFatIndex_7: 'Weight loss methods, we all know to "less eat,  more sport", but many people do not know to maintain a good attitude, should not worry too, to relax the heart, slowly to do it',
            EvaluationCard_Text_Suggest_obesityLevel_1: 'Can increase muscle strength through strength training, so that body more bodybuilding! Simple strength training methods are dumbbells, push-ups, squat and so on. Remember to warm up before going to fitness and stretch after exercise!',
            EvaluationCard_Text_Suggest_obesityLevel_2: 'Recommended to control the diet, and strengthen the exercise exercise, make you looks better. Control of the diet can be from eating less fried chicken, fries, chocolate and other high-calorie food began. In addition, running and ride is a very popular way of exercise, you can go to experience!',
            EvaluationCard_Text_Suggest_obesityLevel_3: 'High intensity intermittent training is a good way to burn fat. At the same time, not just to exercise, but also to control the diet, so that calorie intake less than consumption',
            EvaluationCard_Text_Suggest_obesityLevel_4: 'High intensity intermittent training is a good way to burn fat. At the same time, not just to exercise, but also to control the diet, so that calorie intake less than consumption',
            EvaluationCard_Text_Suggest_normalWeight_1: 'It is recommended to set weight gain targets, heat management, so that adequate intake of calories and greater than consumption. Three meals a day the energy intake of a reasonable proportion of breakfast: lunch: dinner = 3: 4: 3.',
            EvaluationCard_Text_Suggest_normalWeight_2: 'It is recommended to continue to maintain a healthy eating habits, and arrange sport 2-3 times a week to ease the work of fatigue, improve the quality of life.',
            EvaluationCard_Text_Suggest_normalWeight_3: 'It is recommended to set the weight loss target, the heat management, so that dietary intake of calories lower than consumption, eat less high-calorie foods, and actively participate in sports exercise.',
            EvaluationCard_Text_Suggest_fatFreeMass_: '',
            EvaluationCard_Text_Your: 'Your',
            EvaluationCard_Text_PercentageOfBodyWeight: 'percentage of body weight',
            BriefingList_Title: 'History Record',
            BriefingList_Delete_Weight: 'Are you sure to delete this record?',
            BriefingList_Text_Average: 'average',
            BriefingList_Text_Change: 'change',
            BriefingList_Text_NoData: ' No Data',
            BriefingList_Text_NoFatData: ' No Data',
            BriefingList_Text_NoMuscleData: ' No Data',
            BriefingList_Interaction_Loding: 'Loding...',
            DeviceControl_Title: 'Device',
            DeviceControl_Text_WeightUnit: 'Weight Unit',
            Setting_Title: 'Setting',
            Setting_Text_DeviceRename: 'Device Rename',
            Setting_Text_DeviceSharing: 'Device Sharing',
            Setting_Text_DeviceGrouping: 'Device Grouping',
            Setting_Text_FirmwareUpgrade: 'Check Firmware Upgrade',
            Setting_Text_DeleteDevice: 'Delete Device',
            Setting_Text_Feedback: 'Feedback',
            Setting_Text_Add_ToDesktopPage: 'Add To Desktop',
            Setting_Text_license_privacy: 'Terms of Use and Privacy Protocols',
            FirmwareUpgrade_Title: 'Firmware Upgrade',
            FirmwareUpgrade_Text_IsAlreadyUpToDate: 'Latest version',
            FirmwareUpgrade_Text_CurrentVersion: 'Version',
            FirmwareUpgrade_Text_LatestVersion: 'Latest version',
            FirmwareUpgrade_Text_DoNotDisconnectTheBluetoothConnection: 'Firmware upgrading, please do not turn off the Bluetooth.',
            FirmwareUpgrade_Text_UpgradeSuccessed: 'Finished',
            FirmwareUpgrade_Text_HasBeenUpgradedTo: 'Firmware upgrading to',
            FirmwareUpgrade_Text_UpgradeFailed: 'Failed',
            FirmwareUpgrade_Text_MakeSureBluetoothConnectedProperly: 'Please confirm Bluetooth is turned on',
            FirmwareUpgrade_Interaction_UpgradeImmediately: 'Upgrade now',
            FirmwareUpgrade_Interaction_Finished: 'Finish',
            FirmwareUpgrade_Interaction_Retry: 'Retry',
            UserSetting_Title: 'Basic Information',
            UserSetting_Interaction_GenderCanNotChanged: 'Gender cannot be changed',
            UserSetting_Interaction_ModifyGender: 'Data will be changed once you change your gender, confirm?',
            MultiUserList_Title: 'Multi User Management',
            FamilyMembersAdd_Title: 'Add User',
            MultiUserEdit_Title: 'User Information',
            MultiUser_Interaction_NicknameLimit: 'Nickname can not be longer than 10 characters',
            MultiUser_Interaction_Saving: 'Saving...',
            MultiUser_Interaction_SaveSuccessfully: 'Save user information successfully',
            MultiUser_Interaction_SaveFailed: 'Save user information failed, please try again',
            MultiUser_Interaction_DataWillDelete: 'All data for this user will be deleted from the server and the device',
            VisitorMode_OutTitle: 'Visitor Mode',
            VisitorMode_InnerTitle: 'Add Visitor',
            VisitorMode_Text_TheDataIsNotSaved: 'No data will be recorded in Visitor mode.',
            Help_Title: 'User Manual'
        },
        "zh-CN": {
            Global_DateFomattedIdentifier: 'zh-CN',
            Global_Text_Space: '',
            Global_UserInfo_Unit: '单位',
            Global_UserInfo_Age: '年龄',
            Global_UserInfo_Height: '身高',
            Global_UserInfo_Sex: '性别',
            Global_UserInfo_Relevance: '关系',
            Global_UserInfo_Nickname: '昵称',
            Global_UserInfo_Weight: '体重',
            Global_UserInfo_bmi: 'BMI',
            Global_UserInfo_fat: '脂肪',
            Global_UserInfo_water: '水分',
            Global_UserInfo_muscle: '肌肉',
            Global_UserInfo_bone: '骨量',
            Global_UserInfo_bmr: '基础代谢率',
            Global_UserInfo_visFat: '内脏脂肪',
            Global_UserInfo_protein: '蛋白质',
            Global_UserInfo_somaAge: '身体年龄',
            Global_UserInfo_fatMass: '脂肪重量',
            Global_UserInfo_somatotype: '体型',
            Global_UserInfo_bodyFatIndex: '体脂指数',
            Global_UserInfo_obesityLevel: '肥胖级别',
            Global_UserInfo_normalWeight: '正常体重',
            Global_UserInfo_fatFreeMass: '去脂体重',
            Global_Unit_KG: '公斤',
            Global_Unit_Pound: '磅',
            Global_Unit_Jin: '斤',
            Global_Unit_CalPerDay: '大卡/天',
            Global_Unit_Years: '岁',
            Global_Unit_Year: '年',
            Global_Unit_Month: '月',
            Global_Unit_Week: '周',
            Global_Unit_Date: '日',
            Global_Unit_Day: '天',
            Global_Unit_Hour: '时',
            Global_Unit_Minute: '分',
            Global_Unit_Second: '秒',
            Global_Unit_Year_Abbr: '年',
            Global_Unit_Month_Abbr: '月',
            Global_Unit_Week_Abbr: '周',
            Global_Week_Mon_Short: '一',
            Global_Week_Tue_Short: '二',
            Global_Week_Wed_Short: '三',
            Global_Week_Thu_Short: '四',
            Global_Week_Fri_Short: '五',
            Global_Week_Sat_Short: '六',
            Global_Week_Sun_Short: '日',
            Global_Sex_Male: '男',
            Global_Sex_Female: '女',
            Globla_Relevance_Dad: '爸爸',
            Globla_Relevance_Mom: '妈妈',
            Globla_Relevance_Husband: '老公',
            Globla_Relevance_Wife: '老婆',
            Globla_Relevance_Son: '儿子',
            Globla_Relevance_Daughter: '女儿',
            Globla_Relevance_Grandpa: '爷爷',
            Globla_Relevance_Grandma: '奶奶',
            Globla_Relevance_Brother: '哥哥',
            Globla_Relevance_OlderSister: '姐姐',
            Globla_Relevance_YoungerBrother: '弟弟',
            Globla_Relevance_YoungerSister: '妹妹',
            Globla_Relevance_Other: '其他',
            Global_Interaction_Add: '添加',
            Global_Interaction_Delete: '删除',
            Global_Interaction_Done: '确定',
            Global_Interaction_Save: '保存',
            Global_Interaction_Cancel: '取消',
            Global_Interaction_Alert: '提示',
            Global_Interaction_Finished: '完成',
            Global_Interaction_Previous: '上一步',
            Global_Interaction_Next: '下一步',
            Global_Interaction_PleaseEnterNumber: '请输入数字',
            Global_Interaction_TooHigh: '填写身高太高，请重新填写',
            Global_Interaction_TooLow: '填写身高太低，请重新填写',
            Global_Interaction_TooOld: '填写年龄过大，请重新填写',
            Global_Interaction_TooYoung: '填写年龄过小，请重新填写',
            Global_Interaction_TooLong: '填写昵称过长，请重新填写',
            Global_Interaction_PleaseFillInHeight: '请填写身高',
            Global_Interaction_PleaseFillInAge: '请填写年龄',
            Global_Interaction_PleaseFillInGender: '请填写性别',
            Global_Interaction_PleaseFillInRelevance: '请填写关系',
            Global_Interaction_PleaseFillInNickname: '请填写昵称',
            Global_Evaluation_bmi_Slim: '偏瘦',
            Global_Evaluation_bmi_Normal: '正常',
            Global_Evaluation_bmi_PartialFat: '偏胖',
            Global_Evaluation_bmi_fat: '肥胖',
            Global_Evaluation_bmi_Overweight: '极胖',
            Global_Evaluation_fat_Low: '偏低',
            Global_Evaluation_fat_Normal: '正常',
            Global_Evaluation_fat_PartialFat: '偏胖',
            Global_Evaluation_fat_fat: '肥胖',
            Global_Evaluation_water_Low: '偏低',
            Global_Evaluation_water_Standard: '标准',
            Global_Evaluation_water_High: '偏高',
            Global_Evaluation_muscle_Low: '偏低',
            Global_Evaluation_muscle_Standard: '标准',
            Global_Evaluation_bone_Low: '偏低',
            Global_Evaluation_bone_Normal: '正常',
            Global_Evaluation_bone_High: '偏高',
            Global_Evaluation_bmr_Unstandard: '未达标',
            Global_Evaluation_bmr_Standard: '达标',
            Global_Evaluation_visFat_Normal: '正常',
            Global_Evaluation_visFat_High: '偏高',
            Global_Evaluation_visFat_VeryHigh: '超高',
            Global_Evaluation_protein_Low: '偏低',
            Global_Evaluation_protein_Normal: '正常',
            Global_Evaluation_protein_High: '偏高',
            Global_Evaluation_somaAge_Young: '年轻',
            Global_Evaluation_somaAge_Old: '偏大',
            Global_Evaluation_fatMass_Low: '偏低',
            Global_Evaluation_fatMass_Normal: '正常',
            Global_Evaluation_fatMass_Fat: '偏胖',
            Global_Evaluation_fatMass_Overweight: '肥胖',
            Global_Evaluation_somatotype_RecessiveObesity: '隐性肥胖',
            Global_Evaluation_somatotype_Fat: '偏胖型',
            Global_Evaluation_somatotype_AthleticFat: '运动型偏胖',
            Global_Evaluation_somatotype_LackOfTraining: '缺乏锻炼型',
            Global_Evaluation_somatotype_Standard: '标准型',
            Global_Evaluation_somatotype_AthleticStandard: '标准运动型',
            Global_Evaluation_somatotype_Slim: '偏瘦型',
            Global_Evaluation_somatotype_AthleticSlim: '偏瘦运动型',
            Global_Evaluation_somatotype_Bodybuilding: '运动健美型',
            Global_Evaluation_bodyFatIndex_VeryLow: '过低',
            Global_Evaluation_bodyFatIndex_Low: '偏低',
            Global_Evaluation_bodyFatIndex_Normal: '正常',
            Global_Evaluation_bodyFatIndex_Good: '良好',
            Global_Evaluation_bodyFatIndex_High: '偏高',
            Global_Evaluation_bodyFatIndex_VeryHigh: '过高',
            Global_Evaluation_bodyFatIndex_ExtremelyHigh: '极高',
            Global_Evaluation_obesityLevel_NotObese: '不肥胖',
            Global_Evaluation_obesityLevel_BitFat: '微胖',
            Global_Evaluation_obesityLevel_Fat: '偏胖',
            Global_Evaluation_obesityLevel_Overweight: '肥胖',
            Global_Evaluation_normalWeight_Light: '偏轻',
            Global_Evaluation_normalWeight_Normal: '正常',
            Global_Evaluation_normalWeight_Weight: '偏重',
            Global_Evaluation_fatFreeMass_: '',
            Home_Title_VisitorMode: '访客模式',
            Home_Subtitle_Connect: '已连接',
            Home_Subtitle_Disconnect: '正在连接',
            Home_Subtitle_BTBeenOff: '蓝牙未开启',
            Home_Text_Day: '天',
            Home_Text_Hour: '小时',
            Home_Text_Minute: '分钟',
            Home_Text_Ago: '前',
            Home_Text_Just: '刚刚',
            Home_Text_Score: '分',
            Home_Text_Measuring: '正在检测',
            Home_Text_PleaseBarefootOnTheScale: '请赤脚上秤',
            Home_Text_ToCompleteTheFirstWeighing: '\n\n完成首次称重',
            Home_Text_Today: '今天',
            Home_Text_Yesterday: '昨天',
            Home_Text_NeedSomeBasicInformation: '在使用前,我们需要知道一些基本资料',
            Home_Text_MakeSureTheContent: '请务必真实填写喔~',
            Home_Interaction_ExitedVisitorMode: '已退出访客模式',
            EvaluationCard_Text_somatotype_RecessiveObesity: '隐性\n肥胖',
            EvaluationCard_Text_somatotype_Fat: '偏胖型',
            EvaluationCard_Text_somatotype_AthleticFat: '运动型\n偏胖',
            EvaluationCard_Text_somatotype_LackOfTraining: '缺乏\n锻炼型',
            EvaluationCard_Text_somatotype_Standard: '标准型',
            EvaluationCard_Text_somatotype_AthleticStandard: '标准\n运动型',
            EvaluationCard_Text_somatotype_Slim: '偏瘦型',
            EvaluationCard_Text_somatotype_AthleticSlim: '偏瘦\n运动型',
            EvaluationCard_Text_somatotype_Bodybuilding: '运动\n健美型',
            EvaluationCard_Text_Description_bmi: 'BMI 是国际上用于衡量人体胖瘦程度的标准。',
            EvaluationCard_Text_Description_fat: '体脂率指人体内脂肪组织占体重的百分比。体重高不等于胖，但脂肪率高则是肥胖的信号。',
            EvaluationCard_Text_Description_muscle: '指人体成分中肌肉占体重的百分比。肌肉率越高，基础代谢率越大，消耗的热量越多。',
            EvaluationCard_Text_Description_water: '水分指人体成分中水分占体重的百分比。充足的水分可以促进体内新陈代谢。',
            EvaluationCard_Text_Description_protein: '蛋白质是组成人体细胞，组织的重要成分，约占人体全部质量的18%。 机体所有重要的组成部分都需要蛋白质的参与，它是生命活动的主要承担者。',
            EvaluationCard_Text_Description_visFat: '内脏脂肪是人体脂肪的一种，与皮下脂肪不同，主要存在于腹腔内，围绕着人的脏器。一定量的脂肪可以起到支撑，稳定，保护内脏的作用。',
            EvaluationCard_Text_Description_bone: '骨量是人体成分中骨组织的重量，代表骨骼健康的情况。骨组织由细胞、纤维和基质构成，纤维为骨胶纤维，基质含有大量的固体无机盐。',
            EvaluationCard_Text_Description_bmr: '基础代谢率指人体在清醒又极端安静的状态下，不受肌肉活动、环境温度、食物及精神紧张等影响时的能量代谢率。',
            EvaluationCard_Text_Description_somaAge: '身体年龄指以基础代谢率为基础，综合体重、身高、脂肪、肌肉等指标得出的数值，主要取决于生活方式和健康状况。',
            EvaluationCard_Text_Description_fatMass: '身体内所含脂肪的重量。脂肪重量包含皮下脂肪和内脏脂肪两种脂肪的重量。',
            EvaluationCard_Text_Description_somatotype: '',
            EvaluationCard_Text_Description_bodyFatIndex: '体脂指数是对体脂率的分等级划分。若体脂指数过高，可增加高血压、冠心病、糖尿病等疾病风险；若体脂率过低，则可能引起功能失调。体脂指数是评价身体健康的一个重要指标。',
            EvaluationCard_Text_Description_obesityLevel: '肥胖级别反映体形的视觉效果。保持不肥胖的体形会更加健康、有活力；而肥胖的体型不仅影响视觉上的效果，也存在引发疾病的风险。',
            EvaluationCard_Text_Description_normalWeight: '正常体重是根据您当前的基础身体数据推导出的理想体重范围。在正常体重范围内看上去更加健康，是判断是否肥胖的一个重要指标。',
            EvaluationCard_Text_Description_fatFreeMass: '去脂体重也称为瘦体重。是指除脂肪以外的其他成分的总和。皮肤、肌肉、骨骼和内脏器官是瘦体重的主要构成部分。',
            EvaluationCard_Text_Evaluate_bmi_1: '目前BMI指数较低，属于偏瘦人群，离标准身材还有一点距离哦！',
            EvaluationCard_Text_Evaluate_bmi_2: '目前BMI指数正常，身材指数完美，要继续保持哦！',
            EvaluationCard_Text_Evaluate_bmi_3: '目前BMI指数偏高，离标准的身材还有一点距离哦！',
            EvaluationCard_Text_Evaluate_bmi_4: '当前BMI指数较高，心脏病、高血压等疾病的发病风险较高，请注意改善生活习惯！',
            EvaluationCard_Text_Evaluate_bmi_5: 'BMI指数较高，心脏病、高血压等疾病的发病风险较高，请注意改善生活习惯！',
            EvaluationCard_Text_Evaluate_fat_1: '当前体脂率偏低。当脂肪不足以给人体日常活动供能时，会转而消耗蛋白质，过多的蛋白质消耗会损害人体组织。',
            EvaluationCard_Text_Evaluate_fat_2: '恭喜你，体脂率为正常水准，要继续保持哦！',
            EvaluationCard_Text_Evaluate_fat_3: '体脂率偏高，表明脂肪摄入过剩而运动不足。脂肪持续堆积会导致糖尿病、高血压等心脑血管疾病，请注意警惕！',
            EvaluationCard_Text_Evaluate_fat_4: '体脂率过高，表明脂肪摄入过剩而运动不足，长期会导致糖尿病、高血压等心脑血管疾病，请提高警惕！',
            EvaluationCard_Text_Evaluate_muscle_1: '运动过少和节食是肌肉流失的主要原因。肌肉是能量消耗的主力军，增加肌肉能提高热量消耗，以健康的方式减掉多余脂肪。',
            EvaluationCard_Text_Evaluate_muscle_2: '恭喜你，肌肉含量达标，要继续保持哦~',
            EvaluationCard_Text_Evaluate_water_1: '保持充足的水分可以促进身体代谢，带走体内的废物和毒素。',
            EvaluationCard_Text_Evaluate_water_2: '恭喜你水分达标，注意保持哦~',
            EvaluationCard_Text_Evaluate_water_3: '当前属于水肿体质，原因是体内水分不足，无法促进代谢，体内多余的微量元素排泄不出，滞留在体内。',
            EvaluationCard_Text_Evaluate_protein_1: '蛋白质偏低是营养摄入不足或消化不良导致。缺乏蛋白质会引起免疫力下降、肌肉无力和贫血，使身体基础代谢降低。',
            EvaluationCard_Text_Evaluate_protein_2: '恭喜你蛋白质达标，注意保持哦~',
            EvaluationCard_Text_Evaluate_protein_3: '蛋白质偏高，是营养过剩导致。蛋白质摄取过剩会导致转化成脂肪，造成脂肪堆积。',
            EvaluationCard_Text_Evaluate_visFat_1: '内脏脂肪水平正常，适当的内脏脂肪可以大幅降低心脑血管疾病的发病危险哦！',
            EvaluationCard_Text_Evaluate_visFat_2: '内脏脂肪偏高是由于囤积在内脏周围的脂肪过多，会导致腹部和胸腔的空间变小，内脏机能下降，从而引发糖尿病等疾病。',
            EvaluationCard_Text_Evaluate_visFat_3: '囤积在内脏周围的脂肪过多，会导致内脏机能不断下降，心脏病、高血压等疾病的发病率较高，请注意警惕！',
            EvaluationCard_Text_Evaluate_bone_1: '你的骨量水平标准，短期内不会发生明显的变化。',
            EvaluationCard_Text_Evaluate_bmr_1: '基础代谢率未达标！节食、熬夜、缺乏运动均会导致基础代谢率偏低，相应的身体能耗降低，稍微吃多一点就容易发胖噢~',
            EvaluationCard_Text_Evaluate_bmr_2: '恭喜你，你的基础代谢率在标准水平！提高基础代谢率，身体能耗会相应增加，就不容易发胖。',
            EvaluationCard_Text_Evaluate_somaAge_1: '您的身体年龄高于实际年龄，表明身体机能略有老化，熬夜、缺乏运动都会导致身体年龄偏高。',
            EvaluationCard_Text_Evaluate_somaAge_2: '身体年龄年轻，表明体内各项机能正常，要继续保持哦！',
            EvaluationCard_Text_Evaluate_fatMass_1: '当前脂肪重量偏低。当脂肪不足以给人体日常活动供能时，会转而消耗蛋白质，过多的蛋白质消耗会损害人体组织。',
            EvaluationCard_Text_Evaluate_fatMass_2: '恭喜你，脂肪重量为正常水准，要继续保持哦！',
            EvaluationCard_Text_Evaluate_fatMass_3: '脂肪重量偏高，表明脂肪摄入过剩而运动不足。脂肪持续堆积会导致糖尿病、高血压等心脑血管疾病，请注意警惕！',
            EvaluationCard_Text_Evaluate_fatMass_4: '脂肪重量过高，表明脂肪摄入过剩而运动不足，长期会导致糖尿病、高血压等心脑血管疾病，请提高警惕！',
            EvaluationCard_Text_Evaluate_somatotype_1: '',
            EvaluationCard_Text_Evaluate_somatotype_2: '您的身型稍嫌丰满，脂肪持续堆积还会有引起糖尿病、高血压等疾病的危险。虽有大白般温暖萌萌哒的一面，但是健康更重要哦~',
            EvaluationCard_Text_Evaluate_somatotype_3: '',
            EvaluationCard_Text_Evaluate_somatotype_4: '',
            EvaluationCard_Text_Evaluate_somatotype_5: '您的各项身体指标都很标准哦~请继续保持健康的饮食习惯和运动方式。',
            EvaluationCard_Text_Evaluate_somatotype_6: '',
            EvaluationCard_Text_Evaluate_somatotype_7: '',
            EvaluationCard_Text_Evaluate_somatotype_8: '虽然身材有点偏瘦，但是又具有运动者所拥有的良好线条，继续保持哦~',
            EvaluationCard_Text_Evaluate_somatotype_9: '',
            EvaluationCard_Text_Evaluate_bodyFatIndex_1: '当前体脂指数太低啦！体内脂肪不足可能导致人体活动消耗过多蛋白质，进一步损害人体正常机能。',
            EvaluationCard_Text_Evaluate_bodyFatIndex_2: '当前体脂指数偏低。体脂对于保护心血管健康具有重要意义，建议适当增脂。',
            EvaluationCard_Text_Evaluate_bodyFatIndex_3: '当前体脂指数正常，处于健康状态呢~',
            EvaluationCard_Text_Evaluate_bodyFatIndex_4: '当前体脂指数正常，要继续保持健康的生活饮食习惯哦~',
            EvaluationCard_Text_Evaluate_bodyFatIndex_5: '当前体脂指数偏高，要注意减脂了哦~',
            EvaluationCard_Text_Evaluate_bodyFatIndex_6: '当前体脂指数过高，增加各种慢性疾病的风险，需要制定减脂计划了！',
            EvaluationCard_Text_Evaluate_bodyFatIndex_7: '当前体脂指数极高，健康疾病风险大大提高，必须改变饮食方式与生活习惯啦！持之以恒，把体脂减下来吧！',
            EvaluationCard_Text_Evaluate_obesityLevel_1: '看上去不胖哟！想要自己看上去更健康有活力，可以适当增肌哦~',
            EvaluationCard_Text_Evaluate_obesityLevel_2: '看上去有点肉咯，要注意预防身形进一步肥胖呀！',
            EvaluationCard_Text_Evaluate_obesityLevel_3: '会被别人说胖啦，认真实行减肥计划吧，加油哦！',
            EvaluationCard_Text_Evaluate_obesityLevel_4: '肥胖会提高健康疾病风险，加把劲能减下来哦！',
            EvaluationCard_Text_Evaluate_normalWeight_1: '体重低于正常水平，应该适当增重以提高体质哦！',
            EvaluationCard_Text_Evaluate_normalWeight_2: '当前体重正常，要继续保持哦！',
            EvaluationCard_Text_Evaluate_normalWeight_3: '当前体重高于正常水平，需要适当减重以让身体更健康哦~',
            EvaluationCard_Text_Evaluate_fatFreeMass_: '',
            EvaluationCard_Text_Suggest: '此处有妙招',
            EvaluationCard_Text_Suggest_bmi_1: '当前适合增肌，使身材更加健美哦！力量训练有助于刺激肌肉生长，提高身体消耗。饮食上需借助蛋白质进行能量补充，鸡胸肉、虾、鸡蛋白等都是较好的选择!',
            EvaluationCard_Text_Suggest_bmi_2: '保持规律的生活方式，少熬夜多运动，每周安排2-3次运动可以保持身体的基础代谢，使身体的循环能力增强。运动后记得拉伸放松哦。',
            EvaluationCard_Text_Suggest_bmi_3: '当前建议减脂，每周2-3次高强度间歇训练有助于快速燃烧脂肪，提高心肺功能。减脂原理是消耗大于摄入，只要坚持运动并合理控制摄入，很快就能瘦下来哦!',
            EvaluationCard_Text_Suggest_bmi_4: '减脂原理是消耗大于摄入，当前需控制饮食，增加运动消耗。有氧运动有助于脂肪消耗，体重基数较大时不要选择对膝盖压力较大的运动，可从走路、踩单车开始。',
            EvaluationCard_Text_Suggest_bmi_5: '当前需要严格控制摄入，请远离高热量食物；同时增加运动量有助于消耗脂肪，体重基数较大时不要选择对膝盖压力较大的运动如跑步、跳动。',
            EvaluationCard_Text_Suggest_fat_1: '脂肪分为饱和脂肪酸和不饱和脂肪酸，不饱和脂肪易分解，不易堆积成脂肪，可适量摄入为身体补充能量。坚果、大豆、葵花籽、花生等都是较好的选择。',
            EvaluationCard_Text_Suggest_fat_2: '注意保持锻炼，合理饮食！坚持运动可以提高基础代谢，有助于消除工作带来的疲劳，劳逸结合可以使工作效率更高哦！',
            EvaluationCard_Text_Suggest_fat_3: '当前建议减脂，每周安排2-3次力量训练有助于消耗脂肪，高强度间歇运动使脂肪燃烧的时间延长，做完运动躺着也会瘦哦~',
            EvaluationCard_Text_Suggest_fat_4: '当前需严格控制热量摄入，通过运动消耗体内多余脂肪。减脂期需保持消耗大于摄入，三分练七分吃，合理饮食能使减脂事半功倍哦~',
            EvaluationCard_Text_Suggest_muscle_1: '增肌阶段需要能量支持，需保持摄入大于消耗，尤其是糖分和蛋白质。高蛋白食物可选择鸡胸肉、鸡蛋白等。糖分可从碳水化合物中摄取如各类谷物、红薯等。',
            EvaluationCard_Text_Suggest_muscle_2: '增肌阶段需要能量支持，需保持摄入大于消耗，尤其是糖分和蛋白质。高蛋白食物可选择鸡胸肉、鸡蛋白等。糖分可从碳水化合物中摄取如各类谷物、红薯等。',
            EvaluationCard_Text_Suggest_water_1: '体重降低时，若水分降低但体脂无变化，减轻的部分可能是体内的水分，会导致水分不足、代谢紊乱，表明减重方式不科学噢~',
            EvaluationCard_Text_Suggest_water_2: '保持规律的饮食和作息，每天八杯水就能保持正常水平啦！如有进行运动锻炼，请注意补充水分，弥补出汗过多导致的水分流失。',
            EvaluationCard_Text_Suggest_water_3: '注意补充水分，促进身体代谢，水分的排泄可以带走体内的微量元素和废物垃圾，使内环境保持健康循环！',
            EvaluationCard_Text_Suggest_protein_1: '蛋白质是身体活动及肌肉生长的重要营养元素，提高蛋白质可通过日常膳食补充，鸡蛋、牛奶、豆类都是优质的蛋白质来源，脂肪含量低，适合在三餐中食用哟！',
            EvaluationCard_Text_Suggest_protein_2: '不过分节食，保持营养均衡，就能维持稳定的蛋白质水平啦！',
            EvaluationCard_Text_Suggest_protein_3: '饮食清淡，膳食合理，坚持锻炼，规律作息，健康会一直陪伴着你哒！',
            EvaluationCard_Text_Suggest_visFat_1: '均衡膳食，拒绝高热量食物，保持规律的作息，健康会一直陪伴着你哒！',
            EvaluationCard_Text_Suggest_visFat_2: '当前需要增加运动量，促进内脏脂肪消耗,。每周可安排1-2次有氧运动，每天饭后步行30分钟；饮食上以清淡为主，远离高热量食物！',
            EvaluationCard_Text_Suggest_visFat_3: '保持饮食清淡，少吃高热量食物；坚持运动，饭后步行30分钟，有利于促进食物消化，带动能量消耗！',
            EvaluationCard_Text_Suggest_bone_1: '每天饭后步行20分钟，适当到户外晒晒太阳有助于钙质的吸收哦~平常可从牛奶、豆制品、鱼、动物骨头等食物中获取钙质。',
            EvaluationCard_Text_Suggest_bmr_1: '力量训练可提高基础代谢，增加能耗。饮食上可摄入富含蛋白质的食物如鸡胸肉、鸡蛋白等。蛋白质耗能比碳水化合物和脂肪多，身体消化蛋白质时也会消耗热量。',
            EvaluationCard_Text_Suggest_bmr_2: '基础代谢率与饮食、作息和运动息息相关，保持健康作息和均衡膳食，坚持每周至少运动一次，脂肪就永远找不上门咯！',
            EvaluationCard_Text_Suggest_somaAge_1: '注意保持健康作息，少熬夜，少吃高脂高热量的食物，加强锻炼，让身体处于稳定的代谢循环，一直保持年轻和活力哦！',
            EvaluationCard_Text_Suggest_somaAge_2: '继续健康的生活方式，坚持运动，保持合理作息和营养膳食，让身体一直保持活力和年轻！',
            EvaluationCard_Text_Suggest_fatMass_1: '脂肪分为饱和脂肪酸和不饱和脂肪酸，不饱和脂肪易分解，不易堆积成脂肪，可适量摄入为身体补充能量。坚果、大豆、葵花籽、花生等都是较好的选择。',
            EvaluationCard_Text_Suggest_fatMass_2: '注意保持锻炼，合理饮食！坚持运动可以提高基础代谢，有助于消除工作带来的疲劳，劳逸结合可以使工作效率更高哦！',
            EvaluationCard_Text_Suggest_fatMass_3: '当前建议减脂，每周安排2-3次力量训练有助于消耗脂肪，高强度间歇运动使脂肪燃烧的时间延长，做完运动躺着也会瘦哦~',
            EvaluationCard_Text_Suggest_fatMass_4: '当前需严格控制热量摄入，通过运动消耗体内多余脂肪。减脂期需保持消耗大于摄入，三分练七分吃，合理饮食能使减脂事半功倍哦~',
            EvaluationCard_Text_Suggest_somatotype_1: '',
            EvaluationCard_Text_Suggest_somatotype_2: '建议调整饮食结构，减少高油脂食物的摄入，当然甜食也是禁区；在运动上保持有氧训练的频率和长度，每周3~4次，每次30分钟左右。',
            EvaluationCard_Text_Suggest_somatotype_3: '',
            EvaluationCard_Text_Suggest_somatotype_4: '',
            EvaluationCard_Text_Suggest_somatotype_5: '规律的生活方式是保持好身体的基础。如果您想拥有更加健美的身体线条，可以每周增加2~3次的力量训练，练完之后记得放松和拉伸哦~',
            EvaluationCard_Text_Suggest_somatotype_6: '',
            EvaluationCard_Text_Suggest_somatotype_7: '',
            EvaluationCard_Text_Suggest_somatotype_8: '您需要进行合理的膳食管理，多补充一些蛋、鱼、肉等高蛋白的食物，保证能量的摄入，同时也要配合相应的训练，充分的锻炼可以提高身体对能量的吸收能力，塑造更好的线条。',
            EvaluationCard_Text_Suggest_somatotype_9: '',
            EvaluationCard_Text_Suggest_bodyFatIndex_1: '通过食用富含脂肪的食物可以提高体脂，比较好的食物选择有坚果、葵花籽、橄榄油等。',
            EvaluationCard_Text_Suggest_bodyFatIndex_2: '适当增脂可从多吃饭、不挑食、早睡早起开始，养成良好的生活习惯吧！',
            EvaluationCard_Text_Suggest_bodyFatIndex_3: '建议保持良好的生活习惯哦，检查一下，改掉坏习惯：晚上熬夜、工作时久坐不走动、不吃早餐等。',
            EvaluationCard_Text_Suggest_bodyFatIndex_4: '多吃水果和蔬菜、运动缓解工作压力，每周进行一次户外活动接触大自然、保持轻松愉快的心情，可以提升生活品质哦~',
            EvaluationCard_Text_Suggest_bodyFatIndex_5: '检查一下饮食习惯，改掉坏习惯：早餐吃太少、午餐晚餐吃太饱、多肉少菜、偏爱油腻食物等。检查一下生活习惯，改掉坏习惯：久坐不动、每周没有运动训练等。',
            EvaluationCard_Text_Suggest_bodyFatIndex_6: '饮食上建议拒绝高热量食物，如碳酸饮料、高糖零食、油炸食品等。生活习惯上建议增加日常体力活动，如以步代车。',
            EvaluationCard_Text_Suggest_bodyFatIndex_7: '减肥方法多，大家都知道要“管住嘴，迈开腿”，但很多人不知道还要保持良好的心态哦~切忌心太急，要放宽心，慢慢来哦~',
            EvaluationCard_Text_Suggest_obesityLevel_1: '可通过力量训练增加肌肉力量，使体态更加健美！简单的力量训练方法有举哑铃、俯卧撑、深蹲等。记得要健身前热身和健身后拉伸放松哦！',
            EvaluationCard_Text_Suggest_obesityLevel_2: '建议控制饮食，并加强运动锻炼，使体形更好看。控制饮食可以从少吃炸鸡、薯条、巧克力等高热量食物开始。另外，跑步和骑行是很受欢迎的运动方式，可以去体验哦！',
            EvaluationCard_Text_Suggest_obesityLevel_3: '高强度间歇训练是不错的燃脂方法。同时，减肥不止要多运动，还要控制饮食，使热量摄入小于消耗哦~',
            EvaluationCard_Text_Suggest_obesityLevel_4: '高强度间歇训练是不错的燃脂方法。同时，减肥不止要多运动，还要控制饮食，使热量摄入小于消耗哦~',
            EvaluationCard_Text_Suggest_normalWeight_1: '建议设定增重目标，进行热量管理，使饮食摄入热量充足且大于消耗。一日三餐的能量摄入合理比例为早餐：午餐：晚餐 = 3：4：3。',
            EvaluationCard_Text_Suggest_normalWeight_2: '建议继续保持健康的饮食习惯，并安排每周2-3次运动以缓解工作疲劳，提高生活品质。',
            EvaluationCard_Text_Suggest_normalWeight_3: '建议设定减重目标，进行热量管理，使饮食摄入热量低于消耗，少吃高热量食物，同时积极参与运动锻炼。',
            EvaluationCard_Text_Suggest_fatFreeMass_: '',
            EvaluationCard_Text_Your: '你的',
            EvaluationCard_Text_PercentageOfBodyWeight: '占体重',
            BriefingList_Title: '历史记录',
            BriefingList_Delete_Weight: '你确定要删除这条记录么?',
            BriefingList_Text_Average: '均',
            BriefingList_Text_Change: '变化',
            BriefingList_Text_NoData: '无称重数据',
            BriefingList_Text_NoFatData: '无脂肪数据',
            BriefingList_Text_NoMuscleData: '无肌肉数据',
            BriefingList_Interaction_Loding: '加载中...',
            DeviceControl_Title: '设备控制',
            DeviceControl_Text_WeightUnit: '体重单位',
            Setting_Title: '通用设置',
            Setting_Text_DeviceRename: '重命名',
            Setting_Text_DeviceSharing: '设备共享',
            Setting_Text_DeviceGrouping: '设备分组',
            Setting_Text_FirmwareUpgrade: '检查固件升级',
            Setting_Text_DeleteDevice: '解除连接',
            Setting_Text_Feedback: '反馈',
            Setting_Text_Add_ToDesktopPage: '添加快捷方式',
            Setting_Text_license_privacy: '查看使用条款和隐私协议',
            FirmwareUpgrade_Title: '固件升级',
            FirmwareUpgrade_Text_IsAlreadyUpToDate: '固件已经是最新版本',
            FirmwareUpgrade_Text_CurrentVersion: '当前版本',
            FirmwareUpgrade_Text_LatestVersion: '最新版本',
            FirmwareUpgrade_Text_DoNotDisconnectTheBluetoothConnection: '正在升级, 请勿断开蓝牙连接',
            FirmwareUpgrade_Text_UpgradeSuccessed: '升级成功',
            FirmwareUpgrade_Text_HasBeenUpgradedTo: '固件已升级至',
            FirmwareUpgrade_Text_UpgradeFailed: '升级失败',
            FirmwareUpgrade_Text_MakeSureBluetoothConnectedProperly: '请确保蓝牙正常连接',
            FirmwareUpgrade_Interaction_UpgradeImmediately: '立即升级',
            FirmwareUpgrade_Interaction_Finished: '完成',
            FirmwareUpgrade_Interaction_Retry: '重试',
            UserSetting_Title: '个人设置',
            UserSetting_Interaction_GenderCanNotChanged: '性别不能更改',
            UserSetting_Interaction_ModifyGender: '性别修改后会导致前后差异，确认需要修改?',
            MultiUserList_Title: '多用户管理',
            FamilyMembersAdd_Title: '添加成员',
            MultiUserEdit_Title: '用户信息',
            MultiUser_Interaction_NicknameLimit: '昵称长度不可超过10个字符',
            MultiUser_Interaction_Saving: '保存中...',
            MultiUser_Interaction_SaveSuccessfully: '保存用户信息成功',
            MultiUser_Interaction_SaveFailed: '保存用户信息失败, 请重试',
            MultiUser_Interaction_DataWillDelete: '此用户所有数据将从服务器和设备上删除',
            VisitorMode_OutTitle: '访客模式',
            VisitorMode_InnerTitle: '添加访客',
            VisitorMode_Text_TheDataIsNotSaved: '访客模式不会对检测数据进行保存',
            Help_Title: '使用帮助'
        },
        "zh-Hans": {
            Global_DateFomattedIdentifier: 'zh-CN',
            Global_Text_Space: '',
            Global_UserInfo_Unit: '单位',
            Global_UserInfo_Age: '年龄',
            Global_UserInfo_Height: '身高',
            Global_UserInfo_Sex: '性别',
            Global_UserInfo_Relevance: '关系',
            Global_UserInfo_Nickname: '昵称',
            Global_UserInfo_Weight: '体重',
            Global_UserInfo_bmi: 'BMI',
            Global_UserInfo_fat: '脂肪',
            Global_UserInfo_water: '水分',
            Global_UserInfo_muscle: '肌肉',
            Global_UserInfo_bone: '骨量',
            Global_UserInfo_bmr: '基础代谢率',
            Global_UserInfo_visFat: '内脏脂肪',
            Global_UserInfo_protein: '蛋白质',
            Global_UserInfo_somaAge: '身体年龄',
            Global_UserInfo_fatMass: '脂肪重量',
            Global_UserInfo_somatotype: '体型',
            Global_UserInfo_bodyFatIndex: '体脂指数',
            Global_UserInfo_obesityLevel: '肥胖级别',
            Global_UserInfo_normalWeight: '正常体重',
            Global_UserInfo_fatFreeMass: '去脂体重',
            Global_Unit_KG: '公斤',
            Global_Unit_Pound: '磅',
            Global_Unit_Jin: '斤',
            Global_Unit_CalPerDay: '大卡/天',
            Global_Unit_Years: '岁',
            Global_Unit_Year: '年',
            Global_Unit_Month: '月',
            Global_Unit_Week: '周',
            Global_Unit_Date: '日',
            Global_Unit_Day: '天',
            Global_Unit_Hour: '时',
            Global_Unit_Minute: '分',
            Global_Unit_Second: '秒',
            Global_Unit_Year_Abbr: '年',
            Global_Unit_Month_Abbr: '月',
            Global_Unit_Week_Abbr: '周',
            Global_Week_Mon_Short: '一',
            Global_Week_Tue_Short: '二',
            Global_Week_Wed_Short: '三',
            Global_Week_Thu_Short: '四',
            Global_Week_Fri_Short: '五',
            Global_Week_Sat_Short: '六',
            Global_Week_Sun_Short: '日',
            Global_Sex_Male: '男',
            Global_Sex_Female: '女',
            Globla_Relevance_Dad: '爸爸',
            Globla_Relevance_Mom: '妈妈',
            Globla_Relevance_Husband: '老公',
            Globla_Relevance_Wife: '老婆',
            Globla_Relevance_Son: '儿子',
            Globla_Relevance_Daughter: '女儿',
            Globla_Relevance_Grandpa: '爷爷',
            Globla_Relevance_Grandma: '奶奶',
            Globla_Relevance_Brother: '哥哥',
            Globla_Relevance_OlderSister: '姐姐',
            Globla_Relevance_YoungerBrother: '弟弟',
            Globla_Relevance_YoungerSister: '妹妹',
            Globla_Relevance_Other: '其他',
            Global_Interaction_Add: '添加',
            Global_Interaction_Delete: '删除',
            Global_Interaction_Done: '确定',
            Global_Interaction_Save: '保存',
            Global_Interaction_Cancel: '取消',
            Global_Interaction_Alert: '提示',
            Global_Interaction_Finished: '完成',
            Global_Interaction_Previous: '上一步',
            Global_Interaction_Next: '下一步',
            Global_Interaction_PleaseEnterNumber: '请输入数字',
            Global_Interaction_TooHigh: '填写身高太高，请重新填写',
            Global_Interaction_TooLow: '填写身高太低，请重新填写',
            Global_Interaction_TooOld: '填写年龄过大，请重新填写',
            Global_Interaction_TooYoung: '填写年龄过小，请重新填写',
            Global_Interaction_TooLong: '填写昵称过长，请重新填写',
            Global_Interaction_PleaseFillInHeight: '请填写身高',
            Global_Interaction_PleaseFillInAge: '请填写年龄',
            Global_Interaction_PleaseFillInGender: '请填写性别',
            Global_Interaction_PleaseFillInRelevance: '请填写关系',
            Global_Interaction_PleaseFillInNickname: '请填写昵称',
            Global_Evaluation_bmi_Slim: '偏瘦',
            Global_Evaluation_bmi_Normal: '正常',
            Global_Evaluation_bmi_PartialFat: '偏胖',
            Global_Evaluation_bmi_fat: '肥胖',
            Global_Evaluation_bmi_Overweight: '极胖',
            Global_Evaluation_fat_Low: '偏低',
            Global_Evaluation_fat_Normal: '正常',
            Global_Evaluation_fat_PartialFat: '偏胖',
            Global_Evaluation_fat_fat: '肥胖',
            Global_Evaluation_water_Low: '偏低',
            Global_Evaluation_water_Standard: '标准',
            Global_Evaluation_water_High: '偏高',
            Global_Evaluation_muscle_Low: '偏低',
            Global_Evaluation_muscle_Standard: '标准',
            Global_Evaluation_bone_Low: '偏低',
            Global_Evaluation_bone_Normal: '正常',
            Global_Evaluation_bone_High: '偏高',
            Global_Evaluation_bmr_Unstandard: '未达标',
            Global_Evaluation_bmr_Standard: '达标',
            Global_Evaluation_visFat_Normal: '正常',
            Global_Evaluation_visFat_High: '偏高',
            Global_Evaluation_visFat_VeryHigh: '超高',
            Global_Evaluation_protein_Low: '偏低',
            Global_Evaluation_protein_Normal: '正常',
            Global_Evaluation_protein_High: '偏高',
            Global_Evaluation_somaAge_Young: '年轻',
            Global_Evaluation_somaAge_Old: '偏大',
            Global_Evaluation_fatMass_Low: '偏低',
            Global_Evaluation_fatMass_Normal: '正常',
            Global_Evaluation_fatMass_Fat: '偏胖',
            Global_Evaluation_fatMass_Overweight: '肥胖',
            Global_Evaluation_somatotype_RecessiveObesity: '隐性肥胖',
            Global_Evaluation_somatotype_Fat: '偏胖型',
            Global_Evaluation_somatotype_AthleticFat: '运动型偏胖',
            Global_Evaluation_somatotype_LackOfTraining: '缺乏锻炼型',
            Global_Evaluation_somatotype_Standard: '标准型',
            Global_Evaluation_somatotype_AthleticStandard: '标准运动型',
            Global_Evaluation_somatotype_Slim: '偏瘦型',
            Global_Evaluation_somatotype_AthleticSlim: '偏瘦运动型',
            Global_Evaluation_somatotype_Bodybuilding: '运动健美型',
            Global_Evaluation_bodyFatIndex_VeryLow: '过低',
            Global_Evaluation_bodyFatIndex_Low: '偏低',
            Global_Evaluation_bodyFatIndex_Normal: '正常',
            Global_Evaluation_bodyFatIndex_Good: '良好',
            Global_Evaluation_bodyFatIndex_High: '偏高',
            Global_Evaluation_bodyFatIndex_VeryHigh: '过高',
            Global_Evaluation_bodyFatIndex_ExtremelyHigh: '极高',
            Global_Evaluation_obesityLevel_NotObese: '不肥胖',
            Global_Evaluation_obesityLevel_BitFat: '微胖',
            Global_Evaluation_obesityLevel_Fat: '偏胖',
            Global_Evaluation_obesityLevel_Overweight: '肥胖',
            Global_Evaluation_normalWeight_Light: '偏轻',
            Global_Evaluation_normalWeight_Normal: '正常',
            Global_Evaluation_normalWeight_Weight: '偏重',
            Global_Evaluation_fatFreeMass_: '',
            Home_Title_VisitorMode: '访客模式',
            Home_Subtitle_Connect: '已连接',
            Home_Subtitle_Disconnect: '正在连接',
            Home_Subtitle_BTBeenOff: '蓝牙未开启',
            Home_Text_Day: '天',
            Home_Text_Hour: '小时',
            Home_Text_Minute: '分钟',
            Home_Text_Ago: '前',
            Home_Text_Just: '刚刚',
            Home_Text_Score: '分',
            Home_Text_Measuring: '正在检测',
            Home_Text_PleaseBarefootOnTheScale: '请赤脚上秤',
            Home_Text_ToCompleteTheFirstWeighing: '\n\n完成首次称重',
            Home_Text_Today: '今天',
            Home_Text_Yesterday: '昨天',
            Home_Text_NeedSomeBasicInformation: '在使用前,我们需要知道一些基本资料',
            Home_Text_MakeSureTheContent: '请务必真实填写喔~',
            Home_Interaction_ExitedVisitorMode: '已退出访客模式',
            EvaluationCard_Text_somatotype_RecessiveObesity: '隐性\n肥胖',
            EvaluationCard_Text_somatotype_Fat: '偏胖型',
            EvaluationCard_Text_somatotype_AthleticFat: '运动型\n偏胖',
            EvaluationCard_Text_somatotype_LackOfTraining: '缺乏\n锻炼型',
            EvaluationCard_Text_somatotype_Standard: '标准型',
            EvaluationCard_Text_somatotype_AthleticStandard: '标准\n运动型',
            EvaluationCard_Text_somatotype_Slim: '偏瘦型',
            EvaluationCard_Text_somatotype_AthleticSlim: '偏瘦\n运动型',
            EvaluationCard_Text_somatotype_Bodybuilding: '运动\n健美型',
            EvaluationCard_Text_Description_bmi: 'BMI 是国际上用于衡量人体胖瘦程度的标准。',
            EvaluationCard_Text_Description_fat: '体脂率指人体内脂肪组织占体重的百分比。体重高不等于胖，但脂肪率高则是肥胖的信号。',
            EvaluationCard_Text_Description_muscle: '指人体成分中肌肉占体重的百分比。肌肉率越高，基础代谢率越大，消耗的热量越多。',
            EvaluationCard_Text_Description_water: '水分指人体成分中水分占体重的百分比。充足的水分可以促进体内新陈代谢。',
            EvaluationCard_Text_Description_protein: '蛋白质是组成人体细胞，组织的重要成分，约占人体全部质量的18%。 机体所有重要的组成部分都需要蛋白质的参与，它是生命活动的主要承担者。',
            EvaluationCard_Text_Description_visFat: '内脏脂肪是人体脂肪的一种，与皮下脂肪不同，主要存在于腹腔内，围绕着人的脏器。一定量的脂肪可以起到支撑，稳定，保护内脏的作用。',
            EvaluationCard_Text_Description_bone: '骨量是人体成分中骨组织的重量，代表骨骼健康的情况。骨组织由细胞、纤维和基质构成，纤维为骨胶纤维，基质含有大量的固体无机盐。',
            EvaluationCard_Text_Description_bmr: '基础代谢率指人体在清醒又极端安静的状态下，不受肌肉活动、环境温度、食物及精神紧张等影响时的能量代谢率。',
            EvaluationCard_Text_Description_somaAge: '身体年龄指以基础代谢率为基础，综合体重、身高、脂肪、肌肉等指标得出的数值，主要取决于生活方式和健康状况。',
            EvaluationCard_Text_Description_fatMass: '身体内所含脂肪的重量。脂肪重量包含皮下脂肪和内脏脂肪两种脂肪的重量。',
            EvaluationCard_Text_Description_somatotype: '',
            EvaluationCard_Text_Description_bodyFatIndex: '体脂指数是对体脂率的分等级划分。若体脂指数过高，可增加高血压、冠心病、糖尿病等疾病风险；若体脂率过低，则可能引起功能失调。体脂指数是评价身体健康的一个重要指标。',
            EvaluationCard_Text_Description_obesityLevel: '肥胖级别反映体形的视觉效果。保持不肥胖的体形会更加健康、有活力；而肥胖的体型不仅影响视觉上的效果，也存在引发疾病的风险。',
            EvaluationCard_Text_Description_normalWeight: '正常体重是根据您当前的基础身体数据推导出的理想体重范围。在正常体重范围内看上去更加健康，是判断是否肥胖的一个重要指标。',
            EvaluationCard_Text_Description_fatFreeMass: '去脂体重也称为瘦体重。是指除脂肪以外的其他成分的总和。皮肤、肌肉、骨骼和内脏器官是瘦体重的主要构成部分。',
            EvaluationCard_Text_Evaluate_bmi_1: '目前BMI指数较低，属于偏瘦人群，离标准身材还有一点距离哦！',
            EvaluationCard_Text_Evaluate_bmi_2: '目前BMI指数正常，身材指数完美，要继续保持哦！',
            EvaluationCard_Text_Evaluate_bmi_3: '目前BMI指数偏高，离标准的身材还有一点距离哦！',
            EvaluationCard_Text_Evaluate_bmi_4: '当前BMI指数较高，心脏病、高血压等疾病的发病风险较高，请注意改善生活习惯！',
            EvaluationCard_Text_Evaluate_bmi_5: 'BMI指数较高，心脏病、高血压等疾病的发病风险较高，请注意改善生活习惯！',
            EvaluationCard_Text_Evaluate_fat_1: '当前体脂率偏低。当脂肪不足以给人体日常活动供能时，会转而消耗蛋白质，过多的蛋白质消耗会损害人体组织。',
            EvaluationCard_Text_Evaluate_fat_2: '恭喜你，体脂率为正常水准，要继续保持哦！',
            EvaluationCard_Text_Evaluate_fat_3: '体脂率偏高，表明脂肪摄入过剩而运动不足。脂肪持续堆积会导致糖尿病、高血压等心脑血管疾病，请注意警惕！',
            EvaluationCard_Text_Evaluate_fat_4: '体脂率过高，表明脂肪摄入过剩而运动不足，长期会导致糖尿病、高血压等心脑血管疾病，请提高警惕！',
            EvaluationCard_Text_Evaluate_muscle_1: '运动过少和节食是肌肉流失的主要原因。肌肉是能量消耗的主力军，增加肌肉能提高热量消耗，以健康的方式减掉多余脂肪。',
            EvaluationCard_Text_Evaluate_muscle_2: '恭喜你，肌肉含量达标，要继续保持哦~',
            EvaluationCard_Text_Evaluate_water_1: '保持充足的水分可以促进身体代谢，带走体内的废物和毒素。',
            EvaluationCard_Text_Evaluate_water_2: '恭喜你水分达标，注意保持哦~',
            EvaluationCard_Text_Evaluate_water_3: '当前属于水肿体质，原因是体内水分不足，无法促进代谢，体内多余的微量元素排泄不出，滞留在体内。',
            EvaluationCard_Text_Evaluate_protein_1: '蛋白质偏低是营养摄入不足或消化不良导致。缺乏蛋白质会引起免疫力下降、肌肉无力和贫血，使身体基础代谢降低。',
            EvaluationCard_Text_Evaluate_protein_2: '恭喜你蛋白质达标，注意保持哦~',
            EvaluationCard_Text_Evaluate_protein_3: '蛋白质偏高，是营养过剩导致。蛋白质摄取过剩会导致转化成脂肪，造成脂肪堆积。',
            EvaluationCard_Text_Evaluate_visFat_1: '内脏脂肪水平正常，适当的内脏脂肪可以大幅降低心脑血管疾病的发病危险哦！',
            EvaluationCard_Text_Evaluate_visFat_2: '内脏脂肪偏高是由于囤积在内脏周围的脂肪过多，会导致腹部和胸腔的空间变小，内脏机能下降，从而引发糖尿病等疾病。',
            EvaluationCard_Text_Evaluate_visFat_3: '囤积在内脏周围的脂肪过多，会导致内脏机能不断下降，心脏病、高血压等疾病的发病率较高，请注意警惕！',
            EvaluationCard_Text_Evaluate_bone_1: '你的骨量水平标准，短期内不会发生明显的变化。',
            EvaluationCard_Text_Evaluate_bmr_1: '基础代谢率未达标！节食、熬夜、缺乏运动均会导致基础代谢率偏低，相应的身体能耗降低，稍微吃多一点就容易发胖噢~',
            EvaluationCard_Text_Evaluate_bmr_2: '恭喜你，你的基础代谢率在标准水平！提高基础代谢率，身体能耗会相应增加，就不容易发胖。',
            EvaluationCard_Text_Evaluate_somaAge_1: '您的身体年龄高于实际年龄，表明身体机能略有老化，熬夜、缺乏运动都会导致身体年龄偏高。',
            EvaluationCard_Text_Evaluate_somaAge_2: '身体年龄年轻，表明体内各项机能正常，要继续保持哦！',
            EvaluationCard_Text_Evaluate_fatMass_1: '当前脂肪重量偏低。当脂肪不足以给人体日常活动供能时，会转而消耗蛋白质，过多的蛋白质消耗会损害人体组织。',
            EvaluationCard_Text_Evaluate_fatMass_2: '恭喜你，脂肪重量为正常水准，要继续保持哦！',
            EvaluationCard_Text_Evaluate_fatMass_3: '脂肪重量偏高，表明脂肪摄入过剩而运动不足。脂肪持续堆积会导致糖尿病、高血压等心脑血管疾病，请注意警惕！',
            EvaluationCard_Text_Evaluate_fatMass_4: '脂肪重量过高，表明脂肪摄入过剩而运动不足，长期会导致糖尿病、高血压等心脑血管疾病，请提高警惕！',
            EvaluationCard_Text_Evaluate_somatotype_1: '',
            EvaluationCard_Text_Evaluate_somatotype_2: '您的身型稍嫌丰满，脂肪持续堆积还会有引起糖尿病、高血压等疾病的危险。虽有大白般温暖萌萌哒的一面，但是健康更重要哦~',
            EvaluationCard_Text_Evaluate_somatotype_3: '',
            EvaluationCard_Text_Evaluate_somatotype_4: '',
            EvaluationCard_Text_Evaluate_somatotype_5: '您的各项身体指标都很标准哦~请继续保持健康的饮食习惯和运动方式。',
            EvaluationCard_Text_Evaluate_somatotype_6: '',
            EvaluationCard_Text_Evaluate_somatotype_7: '',
            EvaluationCard_Text_Evaluate_somatotype_8: '虽然身材有点偏瘦，但是又具有运动者所拥有的良好线条，继续保持哦~',
            EvaluationCard_Text_Evaluate_somatotype_9: '',
            EvaluationCard_Text_Evaluate_bodyFatIndex_1: '当前体脂指数太低啦！体内脂肪不足可能导致人体活动消耗过多蛋白质，进一步损害人体正常机能。',
            EvaluationCard_Text_Evaluate_bodyFatIndex_2: '当前体脂指数偏低。体脂对于保护心血管健康具有重要意义，建议适当增脂。',
            EvaluationCard_Text_Evaluate_bodyFatIndex_3: '当前体脂指数正常，处于健康状态呢~',
            EvaluationCard_Text_Evaluate_bodyFatIndex_4: '当前体脂指数正常，要继续保持健康的生活饮食习惯哦~',
            EvaluationCard_Text_Evaluate_bodyFatIndex_5: '当前体脂指数偏高，要注意减脂了哦~',
            EvaluationCard_Text_Evaluate_bodyFatIndex_6: '当前体脂指数过高，增加各种慢性疾病的风险，需要制定减脂计划了！',
            EvaluationCard_Text_Evaluate_bodyFatIndex_7: '当前体脂指数极高，健康疾病风险大大提高，必须改变饮食方式与生活习惯啦！持之以恒，把体脂减下来吧！',
            EvaluationCard_Text_Evaluate_obesityLevel_1: '看上去不胖哟！想要自己看上去更健康有活力，可以适当增肌哦~',
            EvaluationCard_Text_Evaluate_obesityLevel_2: '看上去有点肉咯，要注意预防身形进一步肥胖呀！',
            EvaluationCard_Text_Evaluate_obesityLevel_3: '会被别人说胖啦，认真实行减肥计划吧，加油哦！',
            EvaluationCard_Text_Evaluate_obesityLevel_4: '肥胖会提高健康疾病风险，加把劲能减下来哦！',
            EvaluationCard_Text_Evaluate_normalWeight_1: '体重低于正常水平，应该适当增重以提高体质哦！',
            EvaluationCard_Text_Evaluate_normalWeight_2: '当前体重正常，要继续保持哦！',
            EvaluationCard_Text_Evaluate_normalWeight_3: '当前体重高于正常水平，需要适当减重以让身体更健康哦~',
            EvaluationCard_Text_Evaluate_fatFreeMass_: '',
            EvaluationCard_Text_Suggest: '此处有妙招',
            EvaluationCard_Text_Suggest_bmi_1: '当前适合增肌，使身材更加健美哦！力量训练有助于刺激肌肉生长，提高身体消耗。饮食上需借助蛋白质进行能量补充，鸡胸肉、虾、鸡蛋白等都是较好的选择!',
            EvaluationCard_Text_Suggest_bmi_2: '保持规律的生活方式，少熬夜多运动，每周安排2-3次运动可以保持身体的基础代谢，使身体的循环能力增强。运动后记得拉伸放松哦。',
            EvaluationCard_Text_Suggest_bmi_3: '当前建议减脂，每周2-3次高强度间歇训练有助于快速燃烧脂肪，提高心肺功能。减脂原理是消耗大于摄入，只要坚持运动并合理控制摄入，很快就能瘦下来哦!',
            EvaluationCard_Text_Suggest_bmi_4: '减脂原理是消耗大于摄入，当前需控制饮食，增加运动消耗。有氧运动有助于脂肪消耗，体重基数较大时不要选择对膝盖压力较大的运动，可从走路、踩单车开始。',
            EvaluationCard_Text_Suggest_bmi_5: '当前需要严格控制摄入，请远离高热量食物；同时增加运动量有助于消耗脂肪，体重基数较大时不要选择对膝盖压力较大的运动如跑步、跳动。',
            EvaluationCard_Text_Suggest_fat_1: '脂肪分为饱和脂肪酸和不饱和脂肪酸，不饱和脂肪易分解，不易堆积成脂肪，可适量摄入为身体补充能量。坚果、大豆、葵花籽、花生等都是较好的选择。',
            EvaluationCard_Text_Suggest_fat_2: '注意保持锻炼，合理饮食！坚持运动可以提高基础代谢，有助于消除工作带来的疲劳，劳逸结合可以使工作效率更高哦！',
            EvaluationCard_Text_Suggest_fat_3: '当前建议减脂，每周安排2-3次力量训练有助于消耗脂肪，高强度间歇运动使脂肪燃烧的时间延长，做完运动躺着也会瘦哦~',
            EvaluationCard_Text_Suggest_fat_4: '当前需严格控制热量摄入，通过运动消耗体内多余脂肪。减脂期需保持消耗大于摄入，三分练七分吃，合理饮食能使减脂事半功倍哦~',
            EvaluationCard_Text_Suggest_muscle_1: '增肌阶段需要能量支持，需保持摄入大于消耗，尤其是糖分和蛋白质。高蛋白食物可选择鸡胸肉、鸡蛋白等。糖分可从碳水化合物中摄取如各类谷物、红薯等。',
            EvaluationCard_Text_Suggest_muscle_2: '增肌阶段需要能量支持，需保持摄入大于消耗，尤其是糖分和蛋白质。高蛋白食物可选择鸡胸肉、鸡蛋白等。糖分可从碳水化合物中摄取如各类谷物、红薯等。',
            EvaluationCard_Text_Suggest_water_1: '体重降低时，若水分降低但体脂无变化，减轻的部分可能是体内的水分，会导致水分不足、代谢紊乱，表明减重方式不科学噢~',
            EvaluationCard_Text_Suggest_water_2: '保持规律的饮食和作息，每天八杯水就能保持正常水平啦！如有进行运动锻炼，请注意补充水分，弥补出汗过多导致的水分流失。',
            EvaluationCard_Text_Suggest_water_3: '注意补充水分，促进身体代谢，水分的排泄可以带走体内的微量元素和废物垃圾，使内环境保持健康循环！',
            EvaluationCard_Text_Suggest_protein_1: '蛋白质是身体活动及肌肉生长的重要营养元素，提高蛋白质可通过日常膳食补充，鸡蛋、牛奶、豆类都是优质的蛋白质来源，脂肪含量低，适合在三餐中食用哟！',
            EvaluationCard_Text_Suggest_protein_2: '不过分节食，保持营养均衡，就能维持稳定的蛋白质水平啦！',
            EvaluationCard_Text_Suggest_protein_3: '饮食清淡，膳食合理，坚持锻炼，规律作息，健康会一直陪伴着你哒！',
            EvaluationCard_Text_Suggest_visFat_1: '均衡膳食，拒绝高热量食物，保持规律的作息，健康会一直陪伴着你哒！',
            EvaluationCard_Text_Suggest_visFat_2: '当前需要增加运动量，促进内脏脂肪消耗,。每周可安排1-2次有氧运动，每天饭后步行30分钟；饮食上以清淡为主，远离高热量食物！',
            EvaluationCard_Text_Suggest_visFat_3: '保持饮食清淡，少吃高热量食物；坚持运动，饭后步行30分钟，有利于促进食物消化，带动能量消耗！',
            EvaluationCard_Text_Suggest_bone_1: '每天饭后步行20分钟，适当到户外晒晒太阳有助于钙质的吸收哦~平常可从牛奶、豆制品、鱼、动物骨头等食物中获取钙质。',
            EvaluationCard_Text_Suggest_bmr_1: '力量训练可提高基础代谢，增加能耗。饮食上可摄入富含蛋白质的食物如鸡胸肉、鸡蛋白等。蛋白质耗能比碳水化合物和脂肪多，身体消化蛋白质时也会消耗热量。',
            EvaluationCard_Text_Suggest_bmr_2: '基础代谢率与饮食、作息和运动息息相关，保持健康作息和均衡膳食，坚持每周至少运动一次，脂肪就永远找不上门咯！',
            EvaluationCard_Text_Suggest_somaAge_1: '注意保持健康作息，少熬夜，少吃高脂高热量的食物，加强锻炼，让身体处于稳定的代谢循环，一直保持年轻和活力哦！',
            EvaluationCard_Text_Suggest_somaAge_2: '继续健康的生活方式，坚持运动，保持合理作息和营养膳食，让身体一直保持活力和年轻！',
            EvaluationCard_Text_Suggest_fatMass_1: '脂肪分为饱和脂肪酸和不饱和脂肪酸，不饱和脂肪易分解，不易堆积成脂肪，可适量摄入为身体补充能量。坚果、大豆、葵花籽、花生等都是较好的选择。',
            EvaluationCard_Text_Suggest_fatMass_2: '注意保持锻炼，合理饮食！坚持运动可以提高基础代谢，有助于消除工作带来的疲劳，劳逸结合可以使工作效率更高哦！',
            EvaluationCard_Text_Suggest_fatMass_3: '当前建议减脂，每周安排2-3次力量训练有助于消耗脂肪，高强度间歇运动使脂肪燃烧的时间延长，做完运动躺着也会瘦哦~',
            EvaluationCard_Text_Suggest_fatMass_4: '当前需严格控制热量摄入，通过运动消耗体内多余脂肪。减脂期需保持消耗大于摄入，三分练七分吃，合理饮食能使减脂事半功倍哦~',
            EvaluationCard_Text_Suggest_somatotype_1: '',
            EvaluationCard_Text_Suggest_somatotype_2: '建议调整饮食结构，减少高油脂食物的摄入，当然甜食也是禁区；在运动上保持有氧训练的频率和长度，每周3~4次，每次30分钟左右。',
            EvaluationCard_Text_Suggest_somatotype_3: '',
            EvaluationCard_Text_Suggest_somatotype_4: '',
            EvaluationCard_Text_Suggest_somatotype_5: '规律的生活方式是保持好身体的基础。如果您想拥有更加健美的身体线条，可以每周增加2~3次的力量训练，练完之后记得放松和拉伸哦~',
            EvaluationCard_Text_Suggest_somatotype_6: '',
            EvaluationCard_Text_Suggest_somatotype_7: '',
            EvaluationCard_Text_Suggest_somatotype_8: '您需要进行合理的膳食管理，多补充一些蛋、鱼、肉等高蛋白的食物，保证能量的摄入，同时也要配合相应的训练，充分的锻炼可以提高身体对能量的吸收能力，塑造更好的线条。',
            EvaluationCard_Text_Suggest_somatotype_9: '',
            EvaluationCard_Text_Suggest_bodyFatIndex_1: '通过食用富含脂肪的食物可以提高体脂，比较好的食物选择有坚果、葵花籽、橄榄油等。',
            EvaluationCard_Text_Suggest_bodyFatIndex_2: '适当增脂可从多吃饭、不挑食、早睡早起开始，养成良好的生活习惯吧！',
            EvaluationCard_Text_Suggest_bodyFatIndex_3: '建议保持良好的生活习惯哦，检查一下，改掉坏习惯：晚上熬夜、工作时久坐不走动、不吃早餐等。',
            EvaluationCard_Text_Suggest_bodyFatIndex_4: '多吃水果和蔬菜、运动缓解工作压力，每周进行一次户外活动接触大自然、保持轻松愉快的心情，可以提升生活品质哦~',
            EvaluationCard_Text_Suggest_bodyFatIndex_5: '检查一下饮食习惯，改掉坏习惯：早餐吃太少、午餐晚餐吃太饱、多肉少菜、偏爱油腻食物等。检查一下生活习惯，改掉坏习惯：久坐不动、每周没有运动训练等。',
            EvaluationCard_Text_Suggest_bodyFatIndex_6: '饮食上建议拒绝高热量食物，如碳酸饮料、高糖零食、油炸食品等。生活习惯上建议增加日常体力活动，如以步代车。',
            EvaluationCard_Text_Suggest_bodyFatIndex_7: '减肥方法多，大家都知道要“管住嘴，迈开腿”，但很多人不知道还要保持良好的心态哦~切忌心太急，要放宽心，慢慢来哦~',
            EvaluationCard_Text_Suggest_obesityLevel_1: '可通过力量训练增加肌肉力量，使体态更加健美！简单的力量训练方法有举哑铃、俯卧撑、深蹲等。记得要健身前热身和健身后拉伸放松哦！',
            EvaluationCard_Text_Suggest_obesityLevel_2: '建议控制饮食，并加强运动锻炼，使体形更好看。控制饮食可以从少吃炸鸡、薯条、巧克力等高热量食物开始。另外，跑步和骑行是很受欢迎的运动方式，可以去体验哦！',
            EvaluationCard_Text_Suggest_obesityLevel_3: '高强度间歇训练是不错的燃脂方法。同时，减肥不止要多运动，还要控制饮食，使热量摄入小于消耗哦~',
            EvaluationCard_Text_Suggest_obesityLevel_4: '高强度间歇训练是不错的燃脂方法。同时，减肥不止要多运动，还要控制饮食，使热量摄入小于消耗哦~',
            EvaluationCard_Text_Suggest_normalWeight_1: '建议设定增重目标，进行热量管理，使饮食摄入热量充足且大于消耗。一日三餐的能量摄入合理比例为早餐：午餐：晚餐 = 3：4：3。',
            EvaluationCard_Text_Suggest_normalWeight_2: '建议继续保持健康的饮食习惯，并安排每周2-3次运动以缓解工作疲劳，提高生活品质。',
            EvaluationCard_Text_Suggest_normalWeight_3: '建议设定减重目标，进行热量管理，使饮食摄入热量低于消耗，少吃高热量食物，同时积极参与运动锻炼。',
            EvaluationCard_Text_Suggest_fatFreeMass_: '',
            EvaluationCard_Text_Your: '你的',
            EvaluationCard_Text_PercentageOfBodyWeight: '占体重',
            BriefingList_Title: '历史记录',
            BriefingList_Delete_Weight: '你确定要删除这条记录么?',
            BriefingList_Text_Average: '均',
            BriefingList_Text_Change: '变化',
            BriefingList_Text_NoData: '无称重数据',
            BriefingList_Text_NoFatData: '无脂肪数据',
            BriefingList_Text_NoMuscleData: '无肌肉数据',
            BriefingList_Interaction_Loding: '加载中...',
            DeviceControl_Title: '设备控制',
            DeviceControl_Text_WeightUnit: '体重单位',
            Setting_Title: '通用设置',
            Setting_Text_DeviceRename: '重命名',
            Setting_Text_DeviceSharing: '设备共享',
            Setting_Text_DeviceGrouping: '设备分组',
            Setting_Text_FirmwareUpgrade: '检查固件升级',
            Setting_Text_DeleteDevice: '解除连接',
            Setting_Text_Feedback: '反馈',
            Setting_Text_Add_ToDesktopPage: '添加快捷方式',
            Setting_Text_license_privacy: '查看使用条款和隐私协议',
            FirmwareUpgrade_Title: '固件升级',
            FirmwareUpgrade_Text_IsAlreadyUpToDate: '固件已经是最新版本',
            FirmwareUpgrade_Text_CurrentVersion: '当前版本',
            FirmwareUpgrade_Text_LatestVersion: '最新版本',
            FirmwareUpgrade_Text_DoNotDisconnectTheBluetoothConnection: '正在升级, 请勿断开蓝牙连接',
            FirmwareUpgrade_Text_UpgradeSuccessed: '升级成功',
            FirmwareUpgrade_Text_HasBeenUpgradedTo: '固件已升级至',
            FirmwareUpgrade_Text_UpgradeFailed: '升级失败',
            FirmwareUpgrade_Text_MakeSureBluetoothConnectedProperly: '请确保蓝牙正常连接',
            FirmwareUpgrade_Interaction_UpgradeImmediately: '立即升级',
            FirmwareUpgrade_Interaction_Finished: '完成',
            FirmwareUpgrade_Interaction_Retry: '重试',
            UserSetting_Title: '个人设置',
            UserSetting_Interaction_GenderCanNotChanged: '性别不能更改',
            UserSetting_Interaction_ModifyGender: '性别修改后会导致前后差异，确认需要修改?',
            MultiUserList_Title: '多用户管理',
            FamilyMembersAdd_Title: '添加成员',
            MultiUserEdit_Title: '用户信息',
            MultiUser_Interaction_NicknameLimit: '昵称长度不可超过10个字符',
            MultiUser_Interaction_Saving: '保存中...',
            MultiUser_Interaction_SaveSuccessfully: '保存用户信息成功',
            MultiUser_Interaction_SaveFailed: '保存用户信息失败, 请重试',
            MultiUser_Interaction_DataWillDelete: '此用户所有数据将从服务器和设备上删除',
            VisitorMode_OutTitle: '访客模式',
            VisitorMode_InnerTitle: '添加访客',
            VisitorMode_Text_TheDataIsNotSaved: '访客模式不会对检测数据进行保存',
            Help_Title: '使用帮助'
        },
        "zh-Hant": {
            Global_DateFomattedIdentifier: 'zh-CHT',
            Global_Text_Space: '',
            Global_UserInfo_Unit: '單位',
            Global_UserInfo_Age: '年齡',
            Global_UserInfo_Height: '身高',
            Global_UserInfo_Sex: '性別',
            Global_UserInfo_Relevance: '關係',
            Global_UserInfo_Nickname: '昵稱',
            Global_UserInfo_Weight: '體重',
            Global_UserInfo_bmi: 'BMI',
            Global_UserInfo_fat: '脂肪',
            Global_UserInfo_water: '水分',
            Global_UserInfo_muscle: '肌肉',
            Global_UserInfo_bone: '骨量',
            Global_UserInfo_bmr: '基礎代謝率',
            Global_UserInfo_visFat: '內臟脂肪',
            Global_UserInfo_protein: '蛋白質',
            Global_UserInfo_somaAge: '身體年齡',
            Global_UserInfo_fatMass: '脂肪重量',
            Global_UserInfo_somatotype: '體型',
            Global_UserInfo_bodyFatIndex: '體脂指數',
            Global_UserInfo_obesityLevel: '肥胖級別',
            Global_UserInfo_normalWeight: '正常體重',
            Global_UserInfo_fatFreeMass: '去脂體重',
            Global_Unit_KG: '公斤',
            Global_Unit_Pound: '磅',
            Global_Unit_Jin: '斤',
            Global_Unit_CalPerDay: '大卡/天',
            Global_Unit_Years: '歲',
            Global_Unit_Year: '年',
            Global_Unit_Month: '月',
            Global_Unit_Week: '周',
            Global_Unit_Date: '日',
            Global_Unit_Day: '天',
            Global_Unit_Hour: '時',
            Global_Unit_Minute: '分',
            Global_Unit_Second: '秒',
            Global_Unit_Year_Abbr: '年',
            Global_Unit_Month_Abbr: '月',
            Global_Unit_Week_Abbr: '周',
            Global_Week_Mon_Short: '一',
            Global_Week_Tue_Short: '二',
            Global_Week_Wed_Short: '三',
            Global_Week_Thu_Short: '四',
            Global_Week_Fri_Short: '五',
            Global_Week_Sat_Short: '六',
            Global_Week_Sun_Short: '日',
            Global_Sex_Male: '男',
            Global_Sex_Female: '女',
            Globla_Relevance_Dad: '爸爸',
            Globla_Relevance_Mom: '媽媽',
            Globla_Relevance_Husband: '老公',
            Globla_Relevance_Wife: '老婆',
            Globla_Relevance_Son: '兒子',
            Globla_Relevance_Daughter: '女兒',
            Globla_Relevance_Grandpa: '爺爺',
            Globla_Relevance_Grandma: '奶奶',
            Globla_Relevance_Brother: '哥哥',
            Globla_Relevance_OlderSister: '姐姐',
            Globla_Relevance_YoungerBrother: '弟弟',
            Globla_Relevance_YoungerSister: '妹妹',
            Globla_Relevance_Other: '其他',
            Global_Interaction_Add: '添加',
            Global_Interaction_Delete: '刪除',
            Global_Interaction_Done: '確定',
            Global_Interaction_Save: '保存',
            Global_Interaction_Cancel: '取消',
            Global_Interaction_Alert: '提示',
            Global_Interaction_Finished: '完成',
            Global_Interaction_Previous: '上一步',
            Global_Interaction_Next: '下一步',
            Global_Interaction_PleaseEnterNumber: '請輸入數字',
            Global_Interaction_TooHigh: '填寫身高太高，請重新填寫',
            Global_Interaction_TooLow: '填寫身高太低，請重新填寫',
            Global_Interaction_TooOld: '填寫年齡過大，請重新填寫',
            Global_Interaction_TooYoung: '填寫年齡過小，請重新填寫',
            Global_Interaction_TooLong: '填寫昵稱過長，請重新填寫',
            Global_Interaction_PleaseFillInHeight: '請填寫身高',
            Global_Interaction_PleaseFillInAge: '請填寫年齡',
            Global_Interaction_PleaseFillInGender: '請填寫性別',
            Global_Interaction_PleaseFillInRelevance: '請填寫關係',
            Global_Interaction_PleaseFillInNickname: '請填寫昵稱',
            Global_Evaluation_bmi_Slim: '偏瘦',
            Global_Evaluation_bmi_Normal: '正常',
            Global_Evaluation_bmi_PartialFat: '偏胖',
            Global_Evaluation_bmi_fat: '肥胖',
            Global_Evaluation_bmi_Overweight: '極胖',
            Global_Evaluation_fat_Low: '偏低',
            Global_Evaluation_fat_Normal: '正常',
            Global_Evaluation_fat_PartialFat: '偏胖',
            Global_Evaluation_fat_fat: '肥胖',
            Global_Evaluation_water_Low: '偏低',
            Global_Evaluation_water_Standard: '標準',
            Global_Evaluation_water_High: '偏高',
            Global_Evaluation_muscle_Low: '偏低',
            Global_Evaluation_muscle_Standard: '標準',
            Global_Evaluation_bone_Low: '偏低',
            Global_Evaluation_bone_Normal: '正常',
            Global_Evaluation_bone_High: '偏高',
            Global_Evaluation_bmr_Unstandard: '未達標',
            Global_Evaluation_bmr_Standard: '達標',
            Global_Evaluation_visFat_Normal: '正常',
            Global_Evaluation_visFat_High: '偏高',
            Global_Evaluation_visFat_VeryHigh: '超高',
            Global_Evaluation_protein_Low: '偏低',
            Global_Evaluation_protein_Normal: '正常',
            Global_Evaluation_protein_High: '偏高',
            Global_Evaluation_somaAge_Young: '年輕',
            Global_Evaluation_somaAge_Old: '偏大',
            Global_Evaluation_fatMass_Low: '偏低',
            Global_Evaluation_fatMass_Normal: '正常',
            Global_Evaluation_fatMass_Fat: '偏胖',
            Global_Evaluation_fatMass_Overweight: '肥胖',
            Global_Evaluation_somatotype_RecessiveObesity: '隱性肥胖',
            Global_Evaluation_somatotype_Fat: '偏胖型',
            Global_Evaluation_somatotype_AthleticFat: '運動型偏胖',
            Global_Evaluation_somatotype_LackOfTraining: '缺乏鍛煉型',
            Global_Evaluation_somatotype_Standard: '標準型',
            Global_Evaluation_somatotype_AthleticStandard: '標準運動型',
            Global_Evaluation_somatotype_Slim: '偏瘦型',
            Global_Evaluation_somatotype_AthleticSlim: '偏瘦運動型',
            Global_Evaluation_somatotype_Bodybuilding: '運動健美型',
            Global_Evaluation_bodyFatIndex_VeryLow: '過低',
            Global_Evaluation_bodyFatIndex_Low: '偏低',
            Global_Evaluation_bodyFatIndex_Normal: '正常',
            Global_Evaluation_bodyFatIndex_Good: '良好',
            Global_Evaluation_bodyFatIndex_High: '偏高',
            Global_Evaluation_bodyFatIndex_VeryHigh: '過高',
            Global_Evaluation_bodyFatIndex_ExtremelyHigh: '極高',
            Global_Evaluation_obesityLevel_NotObese: '不肥胖',
            Global_Evaluation_obesityLevel_BitFat: '微胖',
            Global_Evaluation_obesityLevel_Fat: '偏胖',
            Global_Evaluation_obesityLevel_Overweight: '肥胖',
            Global_Evaluation_normalWeight_Light: '偏輕',
            Global_Evaluation_normalWeight_Normal: '正常',
            Global_Evaluation_normalWeight_Weight: '偏重',
            Global_Evaluation_fatFreeMass_: '',
            Home_Title_VisitorMode: '訪客模式',
            Home_Subtitle_Connect: '已連接',
            Home_Subtitle_Disconnect: '正在連接',
            Home_Subtitle_BTBeenOff: '藍牙未開啟',
            Home_Text_Day: '天',
            Home_Text_Hour: '小時',
            Home_Text_Minute: '分鐘',
            Home_Text_Ago: '前',
            Home_Text_Just: '剛剛',
            Home_Text_Score: '分',
            Home_Text_Measuring: '正在檢測',
            Home_Text_PleaseBarefootOnTheScale: '請赤腳上秤',
            Home_Text_ToCompleteTheFirstWeighing: '\n\n完成首次稱重',
            Home_Text_Today: '今天',
            Home_Text_Yesterday: '昨天',
            Home_Text_NeedSomeBasicInformation: '在使用前,我們需要知道一些基本資料',
            Home_Text_MakeSureTheContent: '請務必真實填寫喔~',
            Home_Interaction_ExitedVisitorMode: '已退出訪客模式',
            EvaluationCard_Text_somatotype_RecessiveObesity: '隱性\n肥胖',
            EvaluationCard_Text_somatotype_Fat: '偏胖型',
            EvaluationCard_Text_somatotype_AthleticFat: '運動型\n偏胖',
            EvaluationCard_Text_somatotype_LackOfTraining: '缺乏\n鍛煉型',
            EvaluationCard_Text_somatotype_Standard: '標準型',
            EvaluationCard_Text_somatotype_AthleticStandard: '標準\n運動型',
            EvaluationCard_Text_somatotype_Slim: '偏瘦型',
            EvaluationCard_Text_somatotype_AthleticSlim: '偏瘦\n運動型',
            EvaluationCard_Text_somatotype_Bodybuilding: '運動\n健美型',
            EvaluationCard_Text_Description_bmi: 'BMI 是國際上用于衡量人體胖瘦程度的標準。',
            EvaluationCard_Text_Description_fat: '體脂率指人體內脂肪組織占體重的百分比。體重高不等於胖，但脂肪率高則是肥胖的信號。',
            EvaluationCard_Text_Description_muscle: '指人體成分中肌肉占體重的百分比。肌肉率越高，基礎代謝率越大，消耗的熱量越多。',
            EvaluationCard_Text_Description_water: '水分指人體成分中水分佔體重的百分比。充足的水分可以促進體內新陳代謝。',
            EvaluationCard_Text_Description_protein: '蛋白質是組成人體細胞，組織的重要成分，約佔人體全部質量的18%。 機體所有重要的組成部分都需要蛋白質的參與，它是生命活動的主要承擔者。',
            EvaluationCard_Text_Description_visFat: '內臟脂肪是人體脂肪的一種，與皮下脂肪不同，主要存在於腹腔內，圍繞着人的臟器。一定量的脂肪可以起到支撐，穩定，保護內髒的作用。',
            EvaluationCard_Text_Description_bone: '骨量是人體成分中骨組織的重量，代表骨骼健康的情況。骨組織由細胞、纖維和基質構成，纖維為骨膠纖維，基質含有大量的固體無機鹽。',
            EvaluationCard_Text_Description_bmr: '基礎代謝率指人體在清醒又極端安靜的狀態下，不受肌肉活動、環境溫度、食物及精神緊張等影響時的能量代謝率。',
            EvaluationCard_Text_Description_somaAge: '身體年齡指以基礎代謝率為基礎，綜合體重、身高、脂肪、肌肉等指標得出的數值，主要取決於生活方式和健康狀況。',
            EvaluationCard_Text_Description_fatMass: '身體內所含脂肪的重量。脂肪重量包含皮下脂肪和內臟脂肪兩種脂肪的重量。',
            EvaluationCard_Text_Description_somatotype: '',
            EvaluationCard_Text_Description_bodyFatIndex: '體脂指數是對體脂率的分等級劃分。若體脂指數過高，可增加高血壓、冠心病、糖尿病等疾病風險；若體脂率過低，則可能引起功能失調。體脂指數是評價身體健康的一個重要指標。',
            EvaluationCard_Text_Description_obesityLevel: '肥胖級別反映體形的視覺效果。保持不肥胖的體形會更加健康、有活力；而肥胖的體型不僅影響視覺上的效果，也存在引發疾病的風險。',
            EvaluationCard_Text_Description_normalWeight: '正常體重是根據您當前的基礎身體數據推導出的理想體重範圍。在正常體重範圍內看上去更加健康，是判斷是否肥胖的一個重要指標。',
            EvaluationCard_Text_Description_fatFreeMass: '去脂體重也稱為瘦體重。是指除脂肪以外的其他成分的總和。皮膚、肌肉、骨骼和內臟器官是瘦體重的主要構成部分。',
            EvaluationCard_Text_Evaluate_bmi_1: '目前BMI指數較低，屬於偏瘦人群，離標準身材還有一點距離哦！',
            EvaluationCard_Text_Evaluate_bmi_2: '目前BMI指數正常，身材指數完美，要繼續保持哦！',
            EvaluationCard_Text_Evaluate_bmi_3: '目前BMI指數偏高，離標準的身材還有一點距離哦！',
            EvaluationCard_Text_Evaluate_bmi_4: '當前BMI指數較高，心臟病、高血壓等疾病的發病風險較高，請注意改善生活習慣！',
            EvaluationCard_Text_Evaluate_bmi_5: 'BMI指數較高，心臟病、高血壓等疾病的發病風險較高，請注意改善生活習慣！',
            EvaluationCard_Text_Evaluate_fat_1: '當前體脂率偏低。當脂肪不足以給人體日常活動供能時，會轉而消耗蛋白質，過多的蛋白質消耗會損害人體組織。',
            EvaluationCard_Text_Evaluate_fat_2: '恭喜你，體脂率為正常水準，要繼續保持哦！',
            EvaluationCard_Text_Evaluate_fat_3: '體脂率偏高，表明脂肪攝入過剩而運動不足。脂肪持續堆積會導致糖尿病、高血壓等心腦血管疾病，請注意警惕！',
            EvaluationCard_Text_Evaluate_fat_4: '體脂率過高，表明脂肪攝入過剩而運動不足，長期會導致糖尿病、高血壓等心腦血管疾病，請提高警惕！',
            EvaluationCard_Text_Evaluate_muscle_1: '運動過少和節食是肌肉流失的主要原因。肌肉是能量消耗的主力軍，增加肌肉能提高熱量消耗，以健康的方式減掉多餘脂肪。',
            EvaluationCard_Text_Evaluate_muscle_2: '恭喜你，肌肉含量達標，要繼續保持哦~',
            EvaluationCard_Text_Evaluate_water_1: '保持充足的水分可以促進身體代謝，帶走體內的廢物和毒素。',
            EvaluationCard_Text_Evaluate_water_2: '恭喜你水分達標，注意保持哦~',
            EvaluationCard_Text_Evaluate_water_3: '當前屬於水腫體質，原因是體內水分不足，無法促進代謝，體內多餘的微量元素排泄不出，滯留在體內。',
            EvaluationCard_Text_Evaluate_protein_1: '蛋白質偏低是營養攝入不足或消化不良導致。缺乏蛋白質會引起免疫力下降、肌肉無力和貧血，使身體基礎代謝降低。',
            EvaluationCard_Text_Evaluate_protein_2: '恭喜你蛋白質達標，注意保持哦~',
            EvaluationCard_Text_Evaluate_protein_3: '蛋白質偏高，是營養過剩導致。蛋白質攝取過剩會導致轉化成脂肪，造成脂肪堆積。',
            EvaluationCard_Text_Evaluate_visFat_1: '內臟脂肪水平正常，適當的內臟脂肪可以大幅降低心腦血管疾病的發病危險哦！',
            EvaluationCard_Text_Evaluate_visFat_2: '內臟脂肪偏高是由於囤積在內臟周圍的脂肪過多，會導致腹部和胸腔的空間變小，內臟機能下降，從而引發糖尿病等疾病。',
            EvaluationCard_Text_Evaluate_visFat_3: '囤積在內臟周圍的脂肪過多，會導致內臟機能不斷下降，心臟病、高血壓等疾病的發病率較高，請注意警惕！',
            EvaluationCard_Text_Evaluate_bone_1: '你的骨量水平標準，短期內不會發生明顯的變化。',
            EvaluationCard_Text_Evaluate_bmr_1: '基礎代謝率未達標！節食、熬夜、缺乏運動均會導致基礎代謝率偏低，相應的身體能耗降低，稍微吃多一點就容易發胖噢~',
            EvaluationCard_Text_Evaluate_bmr_2: '恭喜你，你的基礎代謝率在標準水平！提高基礎代謝率，身體能耗會相應增加，就不容易發胖。',
            EvaluationCard_Text_Evaluate_somaAge_1: '您的身體年齡高於實際年齡，表明身體機能略有老化，熬夜、缺乏運動都會導致身體年齡偏高。',
            EvaluationCard_Text_Evaluate_somaAge_2: '身體年齡年輕，表明體內各項機能正常，要繼續保持哦！',
            EvaluationCard_Text_Evaluate_fatMass_1: '當前脂肪重量偏低。當脂肪不足以給人體日常活動供能時，會轉而消耗蛋白質，過多的蛋白質消耗會損害人體組織。',
            EvaluationCard_Text_Evaluate_fatMass_2: '恭喜你，脂肪重量為正常水準，要繼續保持哦！',
            EvaluationCard_Text_Evaluate_fatMass_3: '脂肪重量偏高，表明脂肪攝入過剩而運動不足。脂肪持續堆積會導致糖尿病、高血壓等心腦血管疾病，請注意警惕！',
            EvaluationCard_Text_Evaluate_fatMass_4: '脂肪重量過高，表明脂肪攝入過剩而運動不足，長期會導致糖尿病、高血壓等心腦血管疾病，請提高警惕！',
            EvaluationCard_Text_Evaluate_somatotype_1: '',
            EvaluationCard_Text_Evaluate_somatotype_2: '您的身型稍嫌豐滿，脂肪持續堆積還會有引起糖尿病、高血壓等疾病的危險。雖有大白般溫暖萌萌噠的一面，但是健康更重要哦~',
            EvaluationCard_Text_Evaluate_somatotype_3: '',
            EvaluationCard_Text_Evaluate_somatotype_4: '',
            EvaluationCard_Text_Evaluate_somatotype_5: '您的各項身體指標都很標準哦~請繼續保持健康的飲食習慣和運動方式。',
            EvaluationCard_Text_Evaluate_somatotype_6: '',
            EvaluationCard_Text_Evaluate_somatotype_7: '',
            EvaluationCard_Text_Evaluate_somatotype_8: '雖然身材有點偏瘦，但是又具有運動者所擁有的良好線條，繼續保持哦~',
            EvaluationCard_Text_Evaluate_somatotype_9: '',
            EvaluationCard_Text_Evaluate_bodyFatIndex_1: '當前體脂指數太低啦！體內脂肪不足可能導致人體活動消耗過多蛋白質，進一步損害人體正常機能。',
            EvaluationCard_Text_Evaluate_bodyFatIndex_2: '當前體脂指數偏低。體脂對於保護心血管健康具有重要意義，建議適當增脂。',
            EvaluationCard_Text_Evaluate_bodyFatIndex_3: '當前體脂指數正常，處於健康狀態呢~',
            EvaluationCard_Text_Evaluate_bodyFatIndex_4: '當前體脂指數正常，要繼續保持健康的生活飲食習慣哦~',
            EvaluationCard_Text_Evaluate_bodyFatIndex_5: '當前體脂指數偏高，要注意減脂了哦~',
            EvaluationCard_Text_Evaluate_bodyFatIndex_6: '當前體脂指數過高，增加各種慢性疾病的風險，需要制定減脂計划了！',
            EvaluationCard_Text_Evaluate_bodyFatIndex_7: '當前體脂指數極高，健康疾病風險大大提高，必須改變飲食方式與生活習慣啦！持之以恆，把體脂減下來吧！',
            EvaluationCard_Text_Evaluate_obesityLevel_1: '看上去不胖喲！想要自己看上去更健康有活力，可以適當增肌哦~',
            EvaluationCard_Text_Evaluate_obesityLevel_2: '看上去有點肉咯，要注意預防身形進一步肥胖呀！',
            EvaluationCard_Text_Evaluate_obesityLevel_3: '會被別人說胖啦，認真實行減肥計劃吧，加油哦！',
            EvaluationCard_Text_Evaluate_obesityLevel_4: '肥胖會提高健康疾病風險，加把勁能減下來哦！',
            EvaluationCard_Text_Evaluate_normalWeight_1: '體重低於正常水平，應該適當增重以提高體質哦！',
            EvaluationCard_Text_Evaluate_normalWeight_2: '當前體重正常，要繼續保持哦！',
            EvaluationCard_Text_Evaluate_normalWeight_3: '當前體重高於正常水平，需要適當減重以讓身體更健康哦~',
            EvaluationCard_Text_Evaluate_fatFreeMass_: '',
            EvaluationCard_Text_Suggest: '此處有妙招',
            EvaluationCard_Text_Suggest_bmi_1: '當前適合增肌，使身材更加健美哦！力量訓練有助於刺激肌肉生長，提高身體消耗。飲食上需藉助蛋白質進行能量補充，雞胸肉、蝦、雞蛋白等都是較好的選擇!',
            EvaluationCard_Text_Suggest_bmi_2: '保持規律的生活方式，少熬夜多運動，每周安排2-3次運動可以保持身體的基礎代謝，使身體的循環能力增強。運動後記得拉伸放鬆哦。',
            EvaluationCard_Text_Suggest_bmi_3: '當前建議減脂，每周2-3次高強度間歇訓練有助於快速燃燒脂肪，提高心肺功能。減脂原理是消耗大於攝入，只要堅持運動併合理控制攝入，很快就能瘦下來哦!',
            EvaluationCard_Text_Suggest_bmi_4: '減脂原理是消耗大於攝入，當前需控制飲食，增加運動消耗。有氧運動有助於脂肪消耗，體重基數較大時不要選擇對膝蓋壓力較大的運動，可從走路、踩單車開始。',
            EvaluationCard_Text_Suggest_bmi_5: '當前需要嚴格控制攝入，請遠離高熱量食物；同時增加運動量有助於消耗脂肪，體重基數較大時不要選擇對膝蓋壓力較大的運動如跑步、跳動。',
            EvaluationCard_Text_Suggest_fat_1: '脂肪分為飽和脂肪酸和不飽和脂肪酸，不飽和脂肪易分解，不易堆積成脂肪，可適量攝入為身體補充能量。堅果、大豆、葵花籽、花生等都是較好的選擇。',
            EvaluationCard_Text_Suggest_fat_2: '注意保持鍛煉，合理飲食！堅持運動可以提高基礎代謝，有助於消除工作帶來的疲勞，勞逸結合可以使工作效率更高哦！',
            EvaluationCard_Text_Suggest_fat_3: '當前建議減脂，每周安排2-3次力量訓練有助於消耗脂肪，高強度間歇運動使脂肪燃燒的時間延長，做完運動躺着也會瘦哦~',
            EvaluationCard_Text_Suggest_fat_4: '當前需嚴格控制熱量攝入，通過運動消耗體內多餘脂肪。減脂期需保持消耗大於攝入，三分練七分吃，合理飲食能使減脂事半功倍哦~',
            EvaluationCard_Text_Suggest_muscle_1: '增肌階段需要能量支持，需保持攝入大於消耗，尤其是糖分和蛋白質。高蛋白食物可選擇雞胸肉、雞蛋白等。糖分可從碳水化合物中攝取如各類穀物、紅薯等。',
            EvaluationCard_Text_Suggest_muscle_2: '增肌階段需要能量支持，需保持攝入大於消耗，尤其是糖分和蛋白質。高蛋白食物可選擇雞胸肉、雞蛋白等。糖分可從碳水化合物中攝取如各類穀物、紅薯等。',
            EvaluationCard_Text_Suggest_water_1: '體重降低時，若水分降低但體脂無變化，減輕的部分可能是體內的水分，會導致水分不足、代謝紊亂，表明減重方式不科學噢~',
            EvaluationCard_Text_Suggest_water_2: '保持規律的飲食和作息，每天八杯水就能保持正常水平啦！如有進行運動鍛煉，請注意補充水分，彌補出汗過多導致的水分流失。',
            EvaluationCard_Text_Suggest_water_3: '注意補充水分，促進身體代謝，水分的排泄可以帶走體內的微量元素和廢物垃圾，使內環境保持健康循環！',
            EvaluationCard_Text_Suggest_protein_1: '蛋白質是身體活動及肌肉生長的重要營養元素，提高蛋白質可通過日常膳食補充，雞蛋、牛奶、豆類都是優質的蛋白質來源，脂肪含量低，適合在三餐中食用喲！',
            EvaluationCard_Text_Suggest_protein_2: '不過分節食，保持營養均衡，就能維持穩定的蛋白質水平啦！',
            EvaluationCard_Text_Suggest_protein_3: '飲食清淡，膳食合理，堅持鍛煉，規律作息，健康會一直陪伴着你噠！',
            EvaluationCard_Text_Suggest_visFat_1: '均衡膳食，拒絕高熱量食物，保持規律的作息，健康會一直陪伴着你噠！',
            EvaluationCard_Text_Suggest_visFat_2: '當前需要增加運動量，促進內臟脂肪消耗,。每周可安排1-2次有氧運動，每天飯後步行30分鐘；飲食上以清淡為主，遠離高熱量食物！',
            EvaluationCard_Text_Suggest_visFat_3: '保持飲食清淡，少吃高熱量食物；堅持運動，飯後步行30分鐘，有利於促進食物消化，帶動能量消耗！',
            EvaluationCard_Text_Suggest_bone_1: '每天飯後步行20分鐘，適當到戶外晒晒太陽有助於鈣質的吸收哦~平常可從牛奶、豆製品、魚、動物骨頭等食物中獲取鈣質。',
            EvaluationCard_Text_Suggest_bmr_1: '力量訓練可提高基礎代謝，增加能耗。飲食上可攝入富含蛋白質的食物如雞胸肉、雞蛋白等。蛋白質耗能比碳水化合物和脂肪多，身體消化蛋白質時也會消耗熱量。',
            EvaluationCard_Text_Suggest_bmr_2: '基礎代謝率與飲食、作息和運動息息相關，保持健康作息和均衡膳食，堅持每周至少運動一次，脂肪就永遠找不上門咯！',
            EvaluationCard_Text_Suggest_somaAge_1: '注意保持健康作息，少熬夜，少吃高脂高熱量的食物，加強鍛煉，讓身體處於穩定的代謝循環，一直保持年輕和活力哦！',
            EvaluationCard_Text_Suggest_somaAge_2: '繼續健康的生活方式，堅持運動，保持合理作息和營養膳食，讓身體一直保持活力和年輕！',
            EvaluationCard_Text_Suggest_fatMass_1: '脂肪分為飽和脂肪酸和不飽和脂肪酸，不飽和脂肪易分解，不易堆積成脂肪，可適量攝入為身體補充能量。堅果、大豆、葵花籽、花生等都是較好的選擇。',
            EvaluationCard_Text_Suggest_fatMass_2: '注意保持鍛煉，合理飲食！堅持運動可以提高基礎代謝，有助於消除工作帶來的疲勞，勞逸結合可以使工作效率更高哦！',
            EvaluationCard_Text_Suggest_fatMass_3: '當前建議減脂，每周安排2-3次力量訓練有助於消耗脂肪，高強度間歇運動使脂肪燃燒的時間延長，做完運動躺着也會瘦哦~',
            EvaluationCard_Text_Suggest_fatMass_4: '當前需嚴格控制熱量攝入，通過運動消耗體內多餘脂肪。減脂期需保持消耗大於攝入，三分練七分吃，合理飲食能使減脂事半功倍哦~',
            EvaluationCard_Text_Suggest_somatotype_1: '',
            EvaluationCard_Text_Suggest_somatotype_2: '建議調整飲食結構，減少高油脂食物的攝入，當然甜食也是禁區；在運動上保持有氧訓練的頻率和長度，每周3~4次，每次30分鐘左右。',
            EvaluationCard_Text_Suggest_somatotype_3: '',
            EvaluationCard_Text_Suggest_somatotype_4: '',
            EvaluationCard_Text_Suggest_somatotype_5: '規律的生活方式是保持好身體的基礎。如果您想擁有更加健美的身體線條，可以每周增加2~3次的力量訓練，練完之後記得放鬆和拉伸哦~',
            EvaluationCard_Text_Suggest_somatotype_6: '',
            EvaluationCard_Text_Suggest_somatotype_7: '',
            EvaluationCard_Text_Suggest_somatotype_8: '您需要進行合理的膳食管理，多補充一些蛋、魚、肉等高蛋白的食物，保證能量的攝入，同時也要配合相應的訓練，充分的鍛煉可以提高身體對能量的吸收能力，塑造更好的線條。',
            EvaluationCard_Text_Suggest_somatotype_9: '',
            EvaluationCard_Text_Suggest_bodyFatIndex_1: '通過食用富含脂肪的食物可以提高體脂，比較好的食物選擇有堅果、葵花籽、橄欖油等。',
            EvaluationCard_Text_Suggest_bodyFatIndex_2: '適當增脂可從多吃飯、不挑食、早睡早起開始，養成良好的生活習慣吧！',
            EvaluationCard_Text_Suggest_bodyFatIndex_3: '建議保持良好的生活習慣哦，檢查一下，改掉壞習慣：晚上熬夜、工作時久坐不走動、不吃早餐等。',
            EvaluationCard_Text_Suggest_bodyFatIndex_4: '多吃水果和蔬菜、運動緩解工作壓力，每周進行一次戶外活動接觸大自然、保持輕鬆愉快的心情，可以提升生活品質哦~',
            EvaluationCard_Text_Suggest_bodyFatIndex_5: '檢查一下飲食習慣，改掉壞習慣：早餐吃太少、午餐晚餐吃太飽、多肉少菜、偏愛油膩食物等。檢查一下生活習慣，改掉壞習慣：久坐不動、每周沒有運動訓練等。',
            EvaluationCard_Text_Suggest_bodyFatIndex_6: '飲食上建議拒絕高熱量食物，如碳酸飲料、高糖零食、油炸食品等。生活習慣上建議增加日常體力活動，如以步代車。',
            EvaluationCard_Text_Suggest_bodyFatIndex_7: '減肥方法多，大家都知道要“管住嘴，邁開腿”，但很多人不知道還要保持良好的心態哦~切忌心太急，要放寬心，慢慢來哦~',
            EvaluationCard_Text_Suggest_obesityLevel_1: '可通過力量訓練增加肌肉力量，使體態更加健美！簡單的力量訓練方法有舉啞鈴、俯卧撐、深蹲等。記得要健身前熱身和健身後拉伸放鬆哦！',
            EvaluationCard_Text_Suggest_obesityLevel_2: '建議控制飲食，並加強運動鍛煉，使體形更好看。控制飲食可以從少吃炸雞、薯條、巧克力等高熱量食物開始。另外，跑步和騎行是很受歡迎的運動方式，可以去體驗哦！',
            EvaluationCard_Text_Suggest_obesityLevel_3: '高強度間歇訓練是不錯的燃脂方法。同時，減肥不止要多運動，還要控制飲食，使熱量攝入小於消耗哦~',
            EvaluationCard_Text_Suggest_obesityLevel_4: '高強度間歇訓練是不錯的燃脂方法。同時，減肥不止要多運動，還要控制飲食，使熱量攝入小於消耗哦~',
            EvaluationCard_Text_Suggest_normalWeight_1: '建議設定增重目標，進行熱量管理，使飲食攝入熱量充足且大於消耗。一日三餐的能量攝入合理比例為早餐：午餐：晚餐 = 3：4：3。',
            EvaluationCard_Text_Suggest_normalWeight_2: '建議繼續保持健康的飲食習慣，並安排每周2-3次運動以緩解工作疲勞，提高生活品質。',
            EvaluationCard_Text_Suggest_normalWeight_3: '建議設定減重目標，進行熱量管理，使飲食攝入熱量低於消耗，少吃高熱量食物，同時積极參与運動鍛煉。',
            EvaluationCard_Text_Suggest_fatFreeMass_: '',
            EvaluationCard_Text_Your: '你的',
            EvaluationCard_Text_PercentageOfBodyWeight: '占體重',
            BriefingList_Title: '歷史記錄',
            BriefingList_Delete_Weight: '妳確定要刪除這條記錄麽?',
            BriefingList_Text_Average: '均',
            BriefingList_Text_Change: '變化',
            BriefingList_Text_NoData: '無稱重數據',
            BriefingList_Text_NoFatData: '無脂肪數據',
            BriefingList_Text_NoMuscleData: '無肌肉數據',
            BriefingList_Interaction_Loding: '加載中...',
            DeviceControl_Title: '設備控制',
            DeviceControl_Text_WeightUnit: '體重單位',
            Setting_Title: '通用設置',
            Setting_Text_DeviceRename: '重命名',
            Setting_Text_DeviceSharing: '設備共享',
            Setting_Text_DeviceGrouping: '設備分組',
            Setting_Text_FirmwareUpgrade: '檢查固件升級',
            Setting_Text_DeleteDevice: '解除連接',
            Setting_Text_Feedback: '反饋',
            Setting_Text_Add_ToDesktopPage: '添加快捷方式',
            Setting_Text_license_privacy: '查看使用条款和隐私协议',
            FirmwareUpgrade_Title: '固件升級',
            FirmwareUpgrade_Text_IsAlreadyUpToDate: '固件已經是最新版本',
            FirmwareUpgrade_Text_CurrentVersion: '當前版本',
            FirmwareUpgrade_Text_LatestVersion: '最新版本',
            FirmwareUpgrade_Text_DoNotDisconnectTheBluetoothConnection: '正在升級, 請勿斷開藍牙連接',
            FirmwareUpgrade_Text_UpgradeSuccessed: '升級成功',
            FirmwareUpgrade_Text_HasBeenUpgradedTo: '固件已升級至',
            FirmwareUpgrade_Text_UpgradeFailed: '升級失敗',
            FirmwareUpgrade_Text_MakeSureBluetoothConnectedProperly: '請確保藍牙正常連接',
            FirmwareUpgrade_Interaction_UpgradeImmediately: '立即升級',
            FirmwareUpgrade_Interaction_Finished: '完成',
            FirmwareUpgrade_Interaction_Retry: '重試',
            UserSetting_Title: '個人設置',
            UserSetting_Interaction_GenderCanNotChanged: '性別不能更改',
            UserSetting_Interaction_ModifyGender: '性別修改後會導致前後差異，確認需要修改?',
            MultiUserList_Title: '多用戶管理',
            FamilyMembersAdd_Title: '添加成員',
            MultiUserEdit_Title: '用戶信息',
            MultiUser_Interaction_NicknameLimit: '昵稱長度不可超過10個字符',
            MultiUser_Interaction_Saving: '保存中...',
            MultiUser_Interaction_SaveSuccessfully: '保存用戶信息成功',
            MultiUser_Interaction_SaveFailed: '保存用戶信息失敗, 請重試',
            MultiUser_Interaction_DataWillDelete: '此用戶所有數據將從服務器和設備上刪除',
            VisitorMode_OutTitle: '訪客模式',
            VisitorMode_InnerTitle: '添加訪客',
            VisitorMode_Text_TheDataIsNotSaved: '訪客模式不會對檢測數據進行保存',
            Help_Title: '使用幫助'
        },
        "zh-HK": {
            Global_DateFomattedIdentifier: 'zh-HK',
            Global_Text_Space: '',
            Global_UserInfo_Unit: '單位',
            Global_UserInfo_Age: '年齡',
            Global_UserInfo_Height: '身高',
            Global_UserInfo_Sex: '性別',
            Global_UserInfo_Relevance: '關係',
            Global_UserInfo_Nickname: '昵稱',
            Global_UserInfo_Weight: '體重',
            Global_UserInfo_bmi: 'BMI',
            Global_UserInfo_fat: '脂肪',
            Global_UserInfo_water: '水分',
            Global_UserInfo_muscle: '肌肉',
            Global_UserInfo_bone: '骨量',
            Global_UserInfo_bmr: '基礎代謝率',
            Global_UserInfo_visFat: '內臟脂肪',
            Global_UserInfo_protein: '蛋白質',
            Global_UserInfo_somaAge: '身體年齡',
            Global_UserInfo_fatMass: '脂肪重量',
            Global_UserInfo_somatotype: '體型',
            Global_UserInfo_bodyFatIndex: '體脂指數',
            Global_UserInfo_obesityLevel: '肥胖級別',
            Global_UserInfo_normalWeight: '正常體重',
            Global_UserInfo_fatFreeMass: '去脂體重',
            Global_Unit_KG: '公斤',
            Global_Unit_Pound: '磅',
            Global_Unit_Jin: '斤',
            Global_Unit_CalPerDay: '大卡/天',
            Global_Unit_Years: '歲',
            Global_Unit_Year: '年',
            Global_Unit_Month: '月',
            Global_Unit_Week: '周',
            Global_Unit_Date: '日',
            Global_Unit_Day: '天',
            Global_Unit_Hour: '時',
            Global_Unit_Minute: '分',
            Global_Unit_Second: '秒',
            Global_Unit_Year_Abbr: '年',
            Global_Unit_Month_Abbr: '月',
            Global_Unit_Week_Abbr: '周',
            Global_Week_Mon_Short: '一',
            Global_Week_Tue_Short: '二',
            Global_Week_Wed_Short: '三',
            Global_Week_Thu_Short: '四',
            Global_Week_Fri_Short: '五',
            Global_Week_Sat_Short: '六',
            Global_Week_Sun_Short: '日',
            Global_Sex_Male: '男',
            Global_Sex_Female: '女',
            Globla_Relevance_Dad: '爸爸',
            Globla_Relevance_Mom: '媽媽',
            Globla_Relevance_Husband: '老公',
            Globla_Relevance_Wife: '老婆',
            Globla_Relevance_Son: '兒子',
            Globla_Relevance_Daughter: '女兒',
            Globla_Relevance_Grandpa: '爺爺',
            Globla_Relevance_Grandma: '奶奶',
            Globla_Relevance_Brother: '哥哥',
            Globla_Relevance_OlderSister: '姐姐',
            Globla_Relevance_YoungerBrother: '弟弟',
            Globla_Relevance_YoungerSister: '妹妹',
            Globla_Relevance_Other: '其他',
            Global_Interaction_Add: '添加',
            Global_Interaction_Delete: '刪除',
            Global_Interaction_Done: '確定',
            Global_Interaction_Save: '保存',
            Global_Interaction_Cancel: '取消',
            Global_Interaction_Alert: '提示',
            Global_Interaction_Finished: '完成',
            Global_Interaction_Previous: '上一步',
            Global_Interaction_Next: '下一步',
            Global_Interaction_PleaseEnterNumber: '請輸入數字',
            Global_Interaction_TooHigh: '填寫身高太高，請重新填寫',
            Global_Interaction_TooLow: '填寫身高太低，請重新填寫',
            Global_Interaction_TooOld: '填寫年齡過大，請重新填寫',
            Global_Interaction_TooYoung: '填寫年齡過小，請重新填寫',
            Global_Interaction_TooLong: '填寫昵稱過長，請重新填寫',
            Global_Interaction_PleaseFillInHeight: '請填寫身高',
            Global_Interaction_PleaseFillInAge: '請填寫年齡',
            Global_Interaction_PleaseFillInGender: '請填寫性別',
            Global_Interaction_PleaseFillInRelevance: '請填寫關係',
            Global_Interaction_PleaseFillInNickname: '請填寫昵稱',
            Global_Evaluation_bmi_Slim: '偏瘦',
            Global_Evaluation_bmi_Normal: '正常',
            Global_Evaluation_bmi_PartialFat: '偏胖',
            Global_Evaluation_bmi_fat: '肥胖',
            Global_Evaluation_bmi_Overweight: '極胖',
            Global_Evaluation_fat_Low: '偏低',
            Global_Evaluation_fat_Normal: '正常',
            Global_Evaluation_fat_PartialFat: '偏胖',
            Global_Evaluation_fat_fat: '肥胖',
            Global_Evaluation_water_Low: '偏低',
            Global_Evaluation_water_Standard: '標準',
            Global_Evaluation_water_High: '偏高',
            Global_Evaluation_muscle_Low: '偏低',
            Global_Evaluation_muscle_Standard: '標準',
            Global_Evaluation_bone_Low: '偏低',
            Global_Evaluation_bone_Normal: '正常',
            Global_Evaluation_bone_High: '偏高',
            Global_Evaluation_bmr_Unstandard: '未達標',
            Global_Evaluation_bmr_Standard: '達標',
            Global_Evaluation_visFat_Normal: '正常',
            Global_Evaluation_visFat_High: '偏高',
            Global_Evaluation_visFat_VeryHigh: '超高',
            Global_Evaluation_protein_Low: '偏低',
            Global_Evaluation_protein_Normal: '正常',
            Global_Evaluation_protein_High: '偏高',
            Global_Evaluation_somaAge_Young: '年輕',
            Global_Evaluation_somaAge_Old: '偏大',
            Global_Evaluation_fatMass_Low: '偏低',
            Global_Evaluation_fatMass_Normal: '正常',
            Global_Evaluation_fatMass_Fat: '偏胖',
            Global_Evaluation_fatMass_Overweight: '肥胖',
            Global_Evaluation_somatotype_RecessiveObesity: '隱性肥胖',
            Global_Evaluation_somatotype_Fat: '偏胖型',
            Global_Evaluation_somatotype_AthleticFat: '運動型偏胖',
            Global_Evaluation_somatotype_LackOfTraining: '缺乏鍛煉型',
            Global_Evaluation_somatotype_Standard: '標準型',
            Global_Evaluation_somatotype_AthleticStandard: '標準運動型',
            Global_Evaluation_somatotype_Slim: '偏瘦型',
            Global_Evaluation_somatotype_AthleticSlim: '偏瘦運動型',
            Global_Evaluation_somatotype_Bodybuilding: '運動健美型',
            Global_Evaluation_bodyFatIndex_VeryLow: '過低',
            Global_Evaluation_bodyFatIndex_Low: '偏低',
            Global_Evaluation_bodyFatIndex_Normal: '正常',
            Global_Evaluation_bodyFatIndex_Good: '良好',
            Global_Evaluation_bodyFatIndex_High: '偏高',
            Global_Evaluation_bodyFatIndex_VeryHigh: '過高',
            Global_Evaluation_bodyFatIndex_ExtremelyHigh: '極高',
            Global_Evaluation_obesityLevel_NotObese: '不肥胖',
            Global_Evaluation_obesityLevel_BitFat: '微胖',
            Global_Evaluation_obesityLevel_Fat: '偏胖',
            Global_Evaluation_obesityLevel_Overweight: '肥胖',
            Global_Evaluation_normalWeight_Light: '偏輕',
            Global_Evaluation_normalWeight_Normal: '正常',
            Global_Evaluation_normalWeight_Weight: '偏重',
            Global_Evaluation_fatFreeMass_: '',
            Home_Title_VisitorMode: '訪客模式',
            Home_Subtitle_Connect: '已連接',
            Home_Subtitle_Disconnect: '正在連接',
            Home_Subtitle_BTBeenOff: '藍牙未開啟',
            Home_Text_Day: '天',
            Home_Text_Hour: '小時',
            Home_Text_Minute: '分鐘',
            Home_Text_Ago: '前',
            Home_Text_Just: '剛剛',
            Home_Text_Score: '分',
            Home_Text_Measuring: '正在檢測',
            Home_Text_PleaseBarefootOnTheScale: '請赤腳上秤',
            Home_Text_ToCompleteTheFirstWeighing: '\n\n完成首次稱重',
            Home_Text_Today: '今天',
            Home_Text_Yesterday: '昨天',
            Home_Text_NeedSomeBasicInformation: '在使用前,我們需要知道一些基本資料',
            Home_Text_MakeSureTheContent: '請務必真實填寫喔~',
            Home_Interaction_ExitedVisitorMode: '已退出訪客模式',
            EvaluationCard_Text_somatotype_RecessiveObesity: '隱性\n肥胖',
            EvaluationCard_Text_somatotype_Fat: '偏胖型',
            EvaluationCard_Text_somatotype_AthleticFat: '運動型\n偏胖',
            EvaluationCard_Text_somatotype_LackOfTraining: '缺乏\n鍛煉型',
            EvaluationCard_Text_somatotype_Standard: '標準型',
            EvaluationCard_Text_somatotype_AthleticStandard: '標準\n運動型',
            EvaluationCard_Text_somatotype_Slim: '偏瘦型',
            EvaluationCard_Text_somatotype_AthleticSlim: '偏瘦\n運動型',
            EvaluationCard_Text_somatotype_Bodybuilding: '運動\n健美型',
            EvaluationCard_Text_Description_bmi: 'BMI 是國際上用于衡量人體胖瘦程度的標準。',
            EvaluationCard_Text_Description_fat: '體脂率指人體內脂肪組織占體重的百分比。體重高不等於胖，但脂肪率高則是肥胖的信號。',
            EvaluationCard_Text_Description_muscle: '指人體成分中肌肉占體重的百分比。肌肉率越高，基礎代謝率越大，消耗的熱量越多。',
            EvaluationCard_Text_Description_water: '水分指人體成分中水分佔體重的百分比。充足的水分可以促進體內新陳代謝。',
            EvaluationCard_Text_Description_protein: '蛋白質是組成人體細胞，組織的重要成分，約佔人體全部質量的18%。 機體所有重要的組成部分都需要蛋白質的參與，它是生命活動的主要承擔者。',
            EvaluationCard_Text_Description_visFat: '內臟脂肪是人體脂肪的一種，與皮下脂肪不同，主要存在於腹腔內，圍繞着人的臟器。一定量的脂肪可以起到支撐，穩定，保護內髒的作用。',
            EvaluationCard_Text_Description_bone: '骨量是人體成分中骨組織的重量，代表骨骼健康的情況。骨組織由細胞、纖維和基質構成，纖維為骨膠纖維，基質含有大量的固體無機鹽。',
            EvaluationCard_Text_Description_bmr: '基礎代謝率指人體在清醒又極端安靜的狀態下，不受肌肉活動、環境溫度、食物及精神緊張等影響時的能量代謝率。',
            EvaluationCard_Text_Description_somaAge: '身體年齡指以基礎代謝率為基礎，綜合體重、身高、脂肪、肌肉等指標得出的數值，主要取決於生活方式和健康狀況。',
            EvaluationCard_Text_Description_fatMass: '身體內所含脂肪的重量。脂肪重量包含皮下脂肪和內臟脂肪兩種脂肪的重量。',
            EvaluationCard_Text_Description_somatotype: '',
            EvaluationCard_Text_Description_bodyFatIndex: '體脂指數是對體脂率的分等級劃分。若體脂指數過高，可增加高血壓、冠心病、糖尿病等疾病風險；若體脂率過低，則可能引起功能失調。體脂指數是評價身體健康的一個重要指標。',
            EvaluationCard_Text_Description_obesityLevel: '肥胖級別反映體形的視覺效果。保持不肥胖的體形會更加健康、有活力；而肥胖的體型不僅影響視覺上的效果，也存在引發疾病的風險。',
            EvaluationCard_Text_Description_normalWeight: '正常體重是根據您當前的基礎身體數據推導出的理想體重範圍。在正常體重範圍內看上去更加健康，是判斷是否肥胖的一個重要指標。',
            EvaluationCard_Text_Description_fatFreeMass: '去脂體重也稱為瘦體重。是指除脂肪以外的其他成分的總和。皮膚、肌肉、骨骼和內臟器官是瘦體重的主要構成部分。',
            EvaluationCard_Text_Evaluate_bmi_1: '目前BMI指數較低，屬於偏瘦人群，離標準身材還有一點距離哦！',
            EvaluationCard_Text_Evaluate_bmi_2: '目前BMI指數正常，身材指數完美，要繼續保持哦！',
            EvaluationCard_Text_Evaluate_bmi_3: '目前BMI指數偏高，離標準的身材還有一點距離哦！',
            EvaluationCard_Text_Evaluate_bmi_4: '當前BMI指數較高，心臟病、高血壓等疾病的發病風險較高，請注意改善生活習慣！',
            EvaluationCard_Text_Evaluate_bmi_5: 'BMI指數較高，心臟病、高血壓等疾病的發病風險較高，請注意改善生活習慣！',
            EvaluationCard_Text_Evaluate_fat_1: '當前體脂率偏低。當脂肪不足以給人體日常活動供能時，會轉而消耗蛋白質，過多的蛋白質消耗會損害人體組織。',
            EvaluationCard_Text_Evaluate_fat_2: '恭喜你，體脂率為正常水準，要繼續保持哦！',
            EvaluationCard_Text_Evaluate_fat_3: '體脂率偏高，表明脂肪攝入過剩而運動不足。脂肪持續堆積會導致糖尿病、高血壓等心腦血管疾病，請注意警惕！',
            EvaluationCard_Text_Evaluate_fat_4: '體脂率過高，表明脂肪攝入過剩而運動不足，長期會導致糖尿病、高血壓等心腦血管疾病，請提高警惕！',
            EvaluationCard_Text_Evaluate_muscle_1: '運動過少和節食是肌肉流失的主要原因。肌肉是能量消耗的主力軍，增加肌肉能提高熱量消耗，以健康的方式減掉多餘脂肪。',
            EvaluationCard_Text_Evaluate_muscle_2: '恭喜你，肌肉含量達標，要繼續保持哦~',
            EvaluationCard_Text_Evaluate_water_1: '保持充足的水分可以促進身體代謝，帶走體內的廢物和毒素。',
            EvaluationCard_Text_Evaluate_water_2: '恭喜你水分達標，注意保持哦~',
            EvaluationCard_Text_Evaluate_water_3: '當前屬於水腫體質，原因是體內水分不足，無法促進代謝，體內多餘的微量元素排泄不出，滯留在體內。',
            EvaluationCard_Text_Evaluate_protein_1: '蛋白質偏低是營養攝入不足或消化不良導致。缺乏蛋白質會引起免疫力下降、肌肉無力和貧血，使身體基礎代謝降低。',
            EvaluationCard_Text_Evaluate_protein_2: '恭喜你蛋白質達標，注意保持哦~',
            EvaluationCard_Text_Evaluate_protein_3: '蛋白質偏高，是營養過剩導致。蛋白質攝取過剩會導致轉化成脂肪，造成脂肪堆積。',
            EvaluationCard_Text_Evaluate_visFat_1: '內臟脂肪水平正常，適當的內臟脂肪可以大幅降低心腦血管疾病的發病危險哦！',
            EvaluationCard_Text_Evaluate_visFat_2: '內臟脂肪偏高是由於囤積在內臟周圍的脂肪過多，會導致腹部和胸腔的空間變小，內臟機能下降，從而引發糖尿病等疾病。',
            EvaluationCard_Text_Evaluate_visFat_3: '囤積在內臟周圍的脂肪過多，會導致內臟機能不斷下降，心臟病、高血壓等疾病的發病率較高，請注意警惕！',
            EvaluationCard_Text_Evaluate_bone_1: '你的骨量水平標準，短期內不會發生明顯的變化。',
            EvaluationCard_Text_Evaluate_bmr_1: '基礎代謝率未達標！節食、熬夜、缺乏運動均會導致基礎代謝率偏低，相應的身體能耗降低，稍微吃多一點就容易發胖噢~',
            EvaluationCard_Text_Evaluate_bmr_2: '恭喜你，你的基礎代謝率在標準水平！提高基礎代謝率，身體能耗會相應增加，就不容易發胖。',
            EvaluationCard_Text_Evaluate_somaAge_1: '您的身體年齡高於實際年齡，表明身體機能略有老化，熬夜、缺乏運動都會導致身體年齡偏高。',
            EvaluationCard_Text_Evaluate_somaAge_2: '身體年齡年輕，表明體內各項機能正常，要繼續保持哦！',
            EvaluationCard_Text_Evaluate_fatMass_1: '當前脂肪重量偏低。當脂肪不足以給人體日常活動供能時，會轉而消耗蛋白質，過多的蛋白質消耗會損害人體組織。',
            EvaluationCard_Text_Evaluate_fatMass_2: '恭喜你，脂肪重量為正常水準，要繼續保持哦！',
            EvaluationCard_Text_Evaluate_fatMass_3: '脂肪重量偏高，表明脂肪攝入過剩而運動不足。脂肪持續堆積會導致糖尿病、高血壓等心腦血管疾病，請注意警惕！',
            EvaluationCard_Text_Evaluate_fatMass_4: '脂肪重量過高，表明脂肪攝入過剩而運動不足，長期會導致糖尿病、高血壓等心腦血管疾病，請提高警惕！',
            EvaluationCard_Text_Evaluate_somatotype_1: '',
            EvaluationCard_Text_Evaluate_somatotype_2: '您的身型稍嫌豐滿，脂肪持續堆積還會有引起糖尿病、高血壓等疾病的危險。雖有大白般溫暖萌萌噠的一面，但是健康更重要哦~',
            EvaluationCard_Text_Evaluate_somatotype_3: '',
            EvaluationCard_Text_Evaluate_somatotype_4: '',
            EvaluationCard_Text_Evaluate_somatotype_5: '您的各項身體指標都很標準哦~請繼續保持健康的飲食習慣和運動方式。',
            EvaluationCard_Text_Evaluate_somatotype_6: '',
            EvaluationCard_Text_Evaluate_somatotype_7: '',
            EvaluationCard_Text_Evaluate_somatotype_8: '雖然身材有點偏瘦，但是又具有運動者所擁有的良好線條，繼續保持哦~',
            EvaluationCard_Text_Evaluate_somatotype_9: '',
            EvaluationCard_Text_Evaluate_bodyFatIndex_1: '當前體脂指數太低啦！體內脂肪不足可能導致人體活動消耗過多蛋白質，進一步損害人體正常機能。',
            EvaluationCard_Text_Evaluate_bodyFatIndex_2: '當前體脂指數偏低。體脂對於保護心血管健康具有重要意義，建議適當增脂。',
            EvaluationCard_Text_Evaluate_bodyFatIndex_3: '當前體脂指數正常，處於健康狀態呢~',
            EvaluationCard_Text_Evaluate_bodyFatIndex_4: '當前體脂指數正常，要繼續保持健康的生活飲食習慣哦~',
            EvaluationCard_Text_Evaluate_bodyFatIndex_5: '當前體脂指數偏高，要注意減脂了哦~',
            EvaluationCard_Text_Evaluate_bodyFatIndex_6: '當前體脂指數過高，增加各種慢性疾病的風險，需要制定減脂計划了！',
            EvaluationCard_Text_Evaluate_bodyFatIndex_7: '當前體脂指數極高，健康疾病風險大大提高，必須改變飲食方式與生活習慣啦！持之以恆，把體脂減下來吧！',
            EvaluationCard_Text_Evaluate_obesityLevel_1: '看上去不胖喲！想要自己看上去更健康有活力，可以適當增肌哦~',
            EvaluationCard_Text_Evaluate_obesityLevel_2: '看上去有點肉咯，要注意預防身形進一步肥胖呀！',
            EvaluationCard_Text_Evaluate_obesityLevel_3: '會被別人說胖啦，認真實行減肥計劃吧，加油哦！',
            EvaluationCard_Text_Evaluate_obesityLevel_4: '肥胖會提高健康疾病風險，加把勁能減下來哦！',
            EvaluationCard_Text_Evaluate_normalWeight_1: '體重低於正常水平，應該適當增重以提高體質哦！',
            EvaluationCard_Text_Evaluate_normalWeight_2: '當前體重正常，要繼續保持哦！',
            EvaluationCard_Text_Evaluate_normalWeight_3: '當前體重高於正常水平，需要適當減重以讓身體更健康哦~',
            EvaluationCard_Text_Evaluate_fatFreeMass_: '',
            EvaluationCard_Text_Suggest: '此處有妙招',
            EvaluationCard_Text_Suggest_bmi_1: '當前適合增肌，使身材更加健美哦！力量訓練有助於刺激肌肉生長，提高身體消耗。飲食上需藉助蛋白質進行能量補充，雞胸肉、蝦、雞蛋白等都是較好的選擇!',
            EvaluationCard_Text_Suggest_bmi_2: '保持規律的生活方式，少熬夜多運動，每周安排2-3次運動可以保持身體的基礎代謝，使身體的循環能力增強。運動後記得拉伸放鬆哦。',
            EvaluationCard_Text_Suggest_bmi_3: '當前建議減脂，每周2-3次高強度間歇訓練有助於快速燃燒脂肪，提高心肺功能。減脂原理是消耗大於攝入，只要堅持運動併合理控制攝入，很快就能瘦下來哦!',
            EvaluationCard_Text_Suggest_bmi_4: '減脂原理是消耗大於攝入，當前需控制飲食，增加運動消耗。有氧運動有助於脂肪消耗，體重基數較大時不要選擇對膝蓋壓力較大的運動，可從走路、踩單車開始。',
            EvaluationCard_Text_Suggest_bmi_5: '當前需要嚴格控制攝入，請遠離高熱量食物；同時增加運動量有助於消耗脂肪，體重基數較大時不要選擇對膝蓋壓力較大的運動如跑步、跳動。',
            EvaluationCard_Text_Suggest_fat_1: '脂肪分為飽和脂肪酸和不飽和脂肪酸，不飽和脂肪易分解，不易堆積成脂肪，可適量攝入為身體補充能量。堅果、大豆、葵花籽、花生等都是較好的選擇。',
            EvaluationCard_Text_Suggest_fat_2: '注意保持鍛煉，合理飲食！堅持運動可以提高基礎代謝，有助於消除工作帶來的疲勞，勞逸結合可以使工作效率更高哦！',
            EvaluationCard_Text_Suggest_fat_3: '當前建議減脂，每周安排2-3次力量訓練有助於消耗脂肪，高強度間歇運動使脂肪燃燒的時間延長，做完運動躺着也會瘦哦~',
            EvaluationCard_Text_Suggest_fat_4: '當前需嚴格控制熱量攝入，通過運動消耗體內多餘脂肪。減脂期需保持消耗大於攝入，三分練七分吃，合理飲食能使減脂事半功倍哦~',
            EvaluationCard_Text_Suggest_muscle_1: '增肌階段需要能量支持，需保持攝入大於消耗，尤其是糖分和蛋白質。高蛋白食物可選擇雞胸肉、雞蛋白等。糖分可從碳水化合物中攝取如各類穀物、紅薯等。',
            EvaluationCard_Text_Suggest_muscle_2: '增肌階段需要能量支持，需保持攝入大於消耗，尤其是糖分和蛋白質。高蛋白食物可選擇雞胸肉、雞蛋白等。糖分可從碳水化合物中攝取如各類穀物、紅薯等。',
            EvaluationCard_Text_Suggest_water_1: '體重降低時，若水分降低但體脂無變化，減輕的部分可能是體內的水分，會導致水分不足、代謝紊亂，表明減重方式不科學噢~',
            EvaluationCard_Text_Suggest_water_2: '保持規律的飲食和作息，每天八杯水就能保持正常水平啦！如有進行運動鍛煉，請注意補充水分，彌補出汗過多導致的水分流失。',
            EvaluationCard_Text_Suggest_water_3: '注意補充水分，促進身體代謝，水分的排泄可以帶走體內的微量元素和廢物垃圾，使內環境保持健康循環！',
            EvaluationCard_Text_Suggest_protein_1: '蛋白質是身體活動及肌肉生長的重要營養元素，提高蛋白質可通過日常膳食補充，雞蛋、牛奶、豆類都是優質的蛋白質來源，脂肪含量低，適合在三餐中食用喲！',
            EvaluationCard_Text_Suggest_protein_2: '不過分節食，保持營養均衡，就能維持穩定的蛋白質水平啦！',
            EvaluationCard_Text_Suggest_protein_3: '飲食清淡，膳食合理，堅持鍛煉，規律作息，健康會一直陪伴着你噠！',
            EvaluationCard_Text_Suggest_visFat_1: '均衡膳食，拒絕高熱量食物，保持規律的作息，健康會一直陪伴着你噠！',
            EvaluationCard_Text_Suggest_visFat_2: '當前需要增加運動量，促進內臟脂肪消耗,。每周可安排1-2次有氧運動，每天飯後步行30分鐘；飲食上以清淡為主，遠離高熱量食物！',
            EvaluationCard_Text_Suggest_visFat_3: '保持飲食清淡，少吃高熱量食物；堅持運動，飯後步行30分鐘，有利於促進食物消化，帶動能量消耗！',
            EvaluationCard_Text_Suggest_bone_1: '每天飯後步行20分鐘，適當到戶外晒晒太陽有助於鈣質的吸收哦~平常可從牛奶、豆製品、魚、動物骨頭等食物中獲取鈣質。',
            EvaluationCard_Text_Suggest_bmr_1: '力量訓練可提高基礎代謝，增加能耗。飲食上可攝入富含蛋白質的食物如雞胸肉、雞蛋白等。蛋白質耗能比碳水化合物和脂肪多，身體消化蛋白質時也會消耗熱量。',
            EvaluationCard_Text_Suggest_bmr_2: '基礎代謝率與飲食、作息和運動息息相關，保持健康作息和均衡膳食，堅持每周至少運動一次，脂肪就永遠找不上門咯！',
            EvaluationCard_Text_Suggest_somaAge_1: '注意保持健康作息，少熬夜，少吃高脂高熱量的食物，加強鍛煉，讓身體處於穩定的代謝循環，一直保持年輕和活力哦！',
            EvaluationCard_Text_Suggest_somaAge_2: '繼續健康的生活方式，堅持運動，保持合理作息和營養膳食，讓身體一直保持活力和年輕！',
            EvaluationCard_Text_Suggest_fatMass_1: '脂肪分為飽和脂肪酸和不飽和脂肪酸，不飽和脂肪易分解，不易堆積成脂肪，可適量攝入為身體補充能量。堅果、大豆、葵花籽、花生等都是較好的選擇。',
            EvaluationCard_Text_Suggest_fatMass_2: '注意保持鍛煉，合理飲食！堅持運動可以提高基礎代謝，有助於消除工作帶來的疲勞，勞逸結合可以使工作效率更高哦！',
            EvaluationCard_Text_Suggest_fatMass_3: '當前建議減脂，每周安排2-3次力量訓練有助於消耗脂肪，高強度間歇運動使脂肪燃燒的時間延長，做完運動躺着也會瘦哦~',
            EvaluationCard_Text_Suggest_fatMass_4: '當前需嚴格控制熱量攝入，通過運動消耗體內多餘脂肪。減脂期需保持消耗大於攝入，三分練七分吃，合理飲食能使減脂事半功倍哦~',
            EvaluationCard_Text_Suggest_somatotype_1: '',
            EvaluationCard_Text_Suggest_somatotype_2: '建議調整飲食結構，減少高油脂食物的攝入，當然甜食也是禁區；在運動上保持有氧訓練的頻率和長度，每周3~4次，每次30分鐘左右。',
            EvaluationCard_Text_Suggest_somatotype_3: '',
            EvaluationCard_Text_Suggest_somatotype_4: '',
            EvaluationCard_Text_Suggest_somatotype_5: '規律的生活方式是保持好身體的基礎。如果您想擁有更加健美的身體線條，可以每周增加2~3次的力量訓練，練完之後記得放鬆和拉伸哦~',
            EvaluationCard_Text_Suggest_somatotype_6: '',
            EvaluationCard_Text_Suggest_somatotype_7: '',
            EvaluationCard_Text_Suggest_somatotype_8: '您需要進行合理的膳食管理，多補充一些蛋、魚、肉等高蛋白的食物，保證能量的攝入，同時也要配合相應的訓練，充分的鍛煉可以提高身體對能量的吸收能力，塑造更好的線條。',
            EvaluationCard_Text_Suggest_somatotype_9: '',
            EvaluationCard_Text_Suggest_bodyFatIndex_1: '通過食用富含脂肪的食物可以提高體脂，比較好的食物選擇有堅果、葵花籽、橄欖油等。',
            EvaluationCard_Text_Suggest_bodyFatIndex_2: '適當增脂可從多吃飯、不挑食、早睡早起開始，養成良好的生活習慣吧！',
            EvaluationCard_Text_Suggest_bodyFatIndex_3: '建議保持良好的生活習慣哦，檢查一下，改掉壞習慣：晚上熬夜、工作時久坐不走動、不吃早餐等。',
            EvaluationCard_Text_Suggest_bodyFatIndex_4: '多吃水果和蔬菜、運動緩解工作壓力，每周進行一次戶外活動接觸大自然、保持輕鬆愉快的心情，可以提升生活品質哦~',
            EvaluationCard_Text_Suggest_bodyFatIndex_5: '檢查一下飲食習慣，改掉壞習慣：早餐吃太少、午餐晚餐吃太飽、多肉少菜、偏愛油膩食物等。檢查一下生活習慣，改掉壞習慣：久坐不動、每周沒有運動訓練等。',
            EvaluationCard_Text_Suggest_bodyFatIndex_6: '飲食上建議拒絕高熱量食物，如碳酸飲料、高糖零食、油炸食品等。生活習慣上建議增加日常體力活動，如以步代車。',
            EvaluationCard_Text_Suggest_bodyFatIndex_7: '減肥方法多，大家都知道要“管住嘴，邁開腿”，但很多人不知道還要保持良好的心態哦~切忌心太急，要放寬心，慢慢來哦~',
            EvaluationCard_Text_Suggest_obesityLevel_1: '可通過力量訓練增加肌肉力量，使體態更加健美！簡單的力量訓練方法有舉啞鈴、俯卧撐、深蹲等。記得要健身前熱身和健身後拉伸放鬆哦！',
            EvaluationCard_Text_Suggest_obesityLevel_2: '建議控制飲食，並加強運動鍛煉，使體形更好看。控制飲食可以從少吃炸雞、薯條、巧克力等高熱量食物開始。另外，跑步和騎行是很受歡迎的運動方式，可以去體驗哦！',
            EvaluationCard_Text_Suggest_obesityLevel_3: '高強度間歇訓練是不錯的燃脂方法。同時，減肥不止要多運動，還要控制飲食，使熱量攝入小於消耗哦~',
            EvaluationCard_Text_Suggest_obesityLevel_4: '高強度間歇訓練是不錯的燃脂方法。同時，減肥不止要多運動，還要控制飲食，使熱量攝入小於消耗哦~',
            EvaluationCard_Text_Suggest_normalWeight_1: '建議設定增重目標，進行熱量管理，使飲食攝入熱量充足且大於消耗。一日三餐的能量攝入合理比例為早餐：午餐：晚餐 = 3：4：3。',
            EvaluationCard_Text_Suggest_normalWeight_2: '建議繼續保持健康的飲食習慣，並安排每周2-3次運動以緩解工作疲勞，提高生活品質。',
            EvaluationCard_Text_Suggest_normalWeight_3: '建議設定減重目標，進行熱量管理，使飲食攝入熱量低於消耗，少吃高熱量食物，同時積极參与運動鍛煉。',
            EvaluationCard_Text_Suggest_fatFreeMass_: '',
            EvaluationCard_Text_Your: '你的',
            EvaluationCard_Text_PercentageOfBodyWeight: '占體重',
            BriefingList_Title: '歷史記錄',
            BriefingList_Delete_Weight: '妳確定要刪除這條記錄麽?',
            BriefingList_Text_Average: '均',
            BriefingList_Text_Change: '變化',
            BriefingList_Text_NoData: '無稱重數據',
            BriefingList_Text_NoFatData: '無脂肪數據',
            BriefingList_Text_NoMuscleData: '無肌肉數據',
            BriefingList_Interaction_Loding: '加載中...',
            DeviceControl_Title: '設備控制',
            DeviceControl_Text_WeightUnit: '體重單位',
            Setting_Title: '通用設置',
            Setting_Text_DeviceRename: '重命名',
            Setting_Text_DeviceSharing: '設備共享',
            Setting_Text_DeviceGrouping: '設備分組',
            Setting_Text_FirmwareUpgrade: '檢查固件升級',
            Setting_Text_DeleteDevice: '解除連接',
            Setting_Text_Feedback: '反饋',
            Setting_Text_Add_ToDesktopPage: '添加快捷方式',
            Setting_Text_license_privacy: '查看使用条款和隐私协议',
            FirmwareUpgrade_Title: '固件升級',
            FirmwareUpgrade_Text_IsAlreadyUpToDate: '固件已經是最新版本',
            FirmwareUpgrade_Text_CurrentVersion: '當前版本',
            FirmwareUpgrade_Text_LatestVersion: '最新版本',
            FirmwareUpgrade_Text_DoNotDisconnectTheBluetoothConnection: '正在升級, 請勿斷開藍牙連接',
            FirmwareUpgrade_Text_UpgradeSuccessed: '升級成功',
            FirmwareUpgrade_Text_HasBeenUpgradedTo: '固件已升級至',
            FirmwareUpgrade_Text_UpgradeFailed: '升級失敗',
            FirmwareUpgrade_Text_MakeSureBluetoothConnectedProperly: '請確保藍牙正常連接',
            FirmwareUpgrade_Interaction_UpgradeImmediately: '立即升級',
            FirmwareUpgrade_Interaction_Finished: '完成',
            FirmwareUpgrade_Interaction_Retry: '重試',
            UserSetting_Title: '個人設置',
            UserSetting_Interaction_GenderCanNotChanged: '性別不能更改',
            UserSetting_Interaction_ModifyGender: '性別修改後會導致前後差異，確認需要修改?',
            MultiUserList_Title: '多用戶管理',
            FamilyMembersAdd_Title: '添加成員',
            MultiUserEdit_Title: '用戶信息',
            MultiUser_Interaction_NicknameLimit: '昵稱長度不可超過10個字符',
            MultiUser_Interaction_Saving: '保存中...',
            MultiUser_Interaction_SaveSuccessfully: '保存用戶信息成功',
            MultiUser_Interaction_SaveFailed: '保存用戶信息失敗, 請重試',
            MultiUser_Interaction_DataWillDelete: '此用戶所有數據將從服務器和設備上刪除',
            VisitorMode_OutTitle: '訪客模式',
            VisitorMode_InnerTitle: '添加訪客',
            VisitorMode_Text_TheDataIsNotSaved: '訪客模式不會對檢測數據進行保存',
            Help_Title: '使用幫助'
        },
        "zh-TW": {
            Global_DateFomattedIdentifier: 'zh-TW',
            Global_Text_Space: '',
            Global_UserInfo_Unit: '單位',
            Global_UserInfo_Age: '年齡',
            Global_UserInfo_Height: '身高',
            Global_UserInfo_Sex: '性別',
            Global_UserInfo_Relevance: '關係',
            Global_UserInfo_Nickname: '昵稱',
            Global_UserInfo_Weight: '體重',
            Global_UserInfo_bmi: 'BMI',
            Global_UserInfo_fat: '脂肪',
            Global_UserInfo_water: '水分',
            Global_UserInfo_muscle: '肌肉',
            Global_UserInfo_bone: '骨量',
            Global_UserInfo_bmr: '基礎代謝率',
            Global_UserInfo_visFat: '內臟脂肪',
            Global_UserInfo_protein: '蛋白質',
            Global_UserInfo_somaAge: '身體年齡',
            Global_UserInfo_fatMass: '脂肪重量',
            Global_UserInfo_somatotype: '體型',
            Global_UserInfo_bodyFatIndex: '體脂指數',
            Global_UserInfo_obesityLevel: '肥胖級別',
            Global_UserInfo_normalWeight: '正常體重',
            Global_UserInfo_fatFreeMass: '去脂體重',
            Global_Unit_KG: '公斤',
            Global_Unit_Pound: '磅',
            Global_Unit_Jin: '斤',
            Global_Unit_CalPerDay: '大卡/天',
            Global_Unit_Years: '歲',
            Global_Unit_Year: '年',
            Global_Unit_Month: '月',
            Global_Unit_Week: '周',
            Global_Unit_Date: '日',
            Global_Unit_Day: '天',
            Global_Unit_Hour: '時',
            Global_Unit_Minute: '分',
            Global_Unit_Second: '秒',
            Global_Unit_Year_Abbr: '年',
            Global_Unit_Month_Abbr: '月',
            Global_Unit_Week_Abbr: '周',
            Global_Week_Mon_Short: '一',
            Global_Week_Tue_Short: '二',
            Global_Week_Wed_Short: '三',
            Global_Week_Thu_Short: '四',
            Global_Week_Fri_Short: '五',
            Global_Week_Sat_Short: '六',
            Global_Week_Sun_Short: '日',
            Global_Sex_Male: '男',
            Global_Sex_Female: '女',
            Globla_Relevance_Dad: '爸爸',
            Globla_Relevance_Mom: '媽媽',
            Globla_Relevance_Husband: '老公',
            Globla_Relevance_Wife: '老婆',
            Globla_Relevance_Son: '兒子',
            Globla_Relevance_Daughter: '女兒',
            Globla_Relevance_Grandpa: '爺爺',
            Globla_Relevance_Grandma: '奶奶',
            Globla_Relevance_Brother: '哥哥',
            Globla_Relevance_OlderSister: '姐姐',
            Globla_Relevance_YoungerBrother: '弟弟',
            Globla_Relevance_YoungerSister: '妹妹',
            Globla_Relevance_Other: '其他',
            Global_Interaction_Add: '添加',
            Global_Interaction_Delete: '刪除',
            Global_Interaction_Done: '確定',
            Global_Interaction_Save: '保存',
            Global_Interaction_Cancel: '取消',
            Global_Interaction_Alert: '提示',
            Global_Interaction_Finished: '完成',
            Global_Interaction_Previous: '上一步',
            Global_Interaction_Next: '下一步',
            Global_Interaction_PleaseEnterNumber: '請輸入數字',
            Global_Interaction_TooHigh: '填寫身高太高，請重新填寫',
            Global_Interaction_TooLow: '填寫身高太低，請重新填寫',
            Global_Interaction_TooOld: '填寫年齡過大，請重新填寫',
            Global_Interaction_TooYoung: '填寫年齡過小，請重新填寫',
            Global_Interaction_TooLong: '填寫昵稱過長，請重新填寫',
            Global_Interaction_PleaseFillInHeight: '請填寫身高',
            Global_Interaction_PleaseFillInAge: '請填寫年齡',
            Global_Interaction_PleaseFillInGender: '請填寫性別',
            Global_Interaction_PleaseFillInRelevance: '請填寫關係',
            Global_Interaction_PleaseFillInNickname: '請填寫昵稱',
            Global_Evaluation_bmi_Slim: '偏瘦',
            Global_Evaluation_bmi_Normal: '正常',
            Global_Evaluation_bmi_PartialFat: '偏胖',
            Global_Evaluation_bmi_fat: '肥胖',
            Global_Evaluation_bmi_Overweight: '極胖',
            Global_Evaluation_fat_Low: '偏低',
            Global_Evaluation_fat_Normal: '正常',
            Global_Evaluation_fat_PartialFat: '偏胖',
            Global_Evaluation_fat_fat: '肥胖',
            Global_Evaluation_water_Low: '偏低',
            Global_Evaluation_water_Standard: '標準',
            Global_Evaluation_water_High: '偏高',
            Global_Evaluation_muscle_Low: '偏低',
            Global_Evaluation_muscle_Standard: '標準',
            Global_Evaluation_bone_Low: '偏低',
            Global_Evaluation_bone_Normal: '正常',
            Global_Evaluation_bone_High: '偏高',
            Global_Evaluation_bmr_Unstandard: '未達標',
            Global_Evaluation_bmr_Standard: '達標',
            Global_Evaluation_visFat_Normal: '正常',
            Global_Evaluation_visFat_High: '偏高',
            Global_Evaluation_visFat_VeryHigh: '超高',
            Global_Evaluation_protein_Low: '偏低',
            Global_Evaluation_protein_Normal: '正常',
            Global_Evaluation_protein_High: '偏高',
            Global_Evaluation_somaAge_Young: '年輕',
            Global_Evaluation_somaAge_Old: '偏大',
            Global_Evaluation_fatMass_Low: '偏低',
            Global_Evaluation_fatMass_Normal: '正常',
            Global_Evaluation_fatMass_Fat: '偏胖',
            Global_Evaluation_fatMass_Overweight: '肥胖',
            Global_Evaluation_somatotype_RecessiveObesity: '隱性肥胖',
            Global_Evaluation_somatotype_Fat: '偏胖型',
            Global_Evaluation_somatotype_AthleticFat: '運動型偏胖',
            Global_Evaluation_somatotype_LackOfTraining: '缺乏鍛煉型',
            Global_Evaluation_somatotype_Standard: '標準型',
            Global_Evaluation_somatotype_AthleticStandard: '標準運動型',
            Global_Evaluation_somatotype_Slim: '偏瘦型',
            Global_Evaluation_somatotype_AthleticSlim: '偏瘦運動型',
            Global_Evaluation_somatotype_Bodybuilding: '運動健美型',
            Global_Evaluation_bodyFatIndex_VeryLow: '過低',
            Global_Evaluation_bodyFatIndex_Low: '偏低',
            Global_Evaluation_bodyFatIndex_Normal: '正常',
            Global_Evaluation_bodyFatIndex_Good: '良好',
            Global_Evaluation_bodyFatIndex_High: '偏高',
            Global_Evaluation_bodyFatIndex_VeryHigh: '過高',
            Global_Evaluation_bodyFatIndex_ExtremelyHigh: '極高',
            Global_Evaluation_obesityLevel_NotObese: '不肥胖',
            Global_Evaluation_obesityLevel_BitFat: '微胖',
            Global_Evaluation_obesityLevel_Fat: '偏胖',
            Global_Evaluation_obesityLevel_Overweight: '肥胖',
            Global_Evaluation_normalWeight_Light: '偏輕',
            Global_Evaluation_normalWeight_Normal: '正常',
            Global_Evaluation_normalWeight_Weight: '偏重',
            Global_Evaluation_fatFreeMass_: '',
            Home_Title_VisitorMode: '訪客模式',
            Home_Subtitle_Connect: '已連接',
            Home_Subtitle_Disconnect: '正在連接',
            Home_Subtitle_BTBeenOff: '藍牙未開啟',
            Home_Text_Day: '天',
            Home_Text_Hour: '小時',
            Home_Text_Minute: '分鐘',
            Home_Text_Ago: '前',
            Home_Text_Just: '剛剛',
            Home_Text_Score: '分',
            Home_Text_Measuring: '正在檢測',
            Home_Text_PleaseBarefootOnTheScale: '請赤腳上秤',
            Home_Text_ToCompleteTheFirstWeighing: '\n\n完成首次稱重',
            Home_Text_Today: '今天',
            Home_Text_Yesterday: '昨天',
            Home_Text_NeedSomeBasicInformation: '在使用前,我們需要知道一些基本資料',
            Home_Text_MakeSureTheContent: '請務必真實填寫喔~',
            Home_Interaction_ExitedVisitorMode: '已退出訪客模式',
            EvaluationCard_Text_somatotype_RecessiveObesity: '隱性\n肥胖',
            EvaluationCard_Text_somatotype_Fat: '偏胖型',
            EvaluationCard_Text_somatotype_AthleticFat: '運動型\n偏胖',
            EvaluationCard_Text_somatotype_LackOfTraining: '缺乏\n鍛煉型',
            EvaluationCard_Text_somatotype_Standard: '標準型',
            EvaluationCard_Text_somatotype_AthleticStandard: '標準\n運動型',
            EvaluationCard_Text_somatotype_Slim: '偏瘦型',
            EvaluationCard_Text_somatotype_AthleticSlim: '偏瘦\n運動型',
            EvaluationCard_Text_somatotype_Bodybuilding: '運動\n健美型',
            EvaluationCard_Text_Description_bmi: 'BMI 是國際上用于衡量人體胖瘦程度的標準。',
            EvaluationCard_Text_Description_fat: '體脂率指人體內脂肪組織占體重的百分比。體重高不等於胖，但脂肪率高則是肥胖的信號。',
            EvaluationCard_Text_Description_muscle: '指人體成分中肌肉占體重的百分比。肌肉率越高，基礎代謝率越大，消耗的熱量越多。',
            EvaluationCard_Text_Description_water: '水分指人體成分中水分佔體重的百分比。充足的水分可以促進體內新陳代謝。',
            EvaluationCard_Text_Description_protein: '蛋白質是組成人體細胞，組織的重要成分，約佔人體全部質量的18%。 機體所有重要的組成部分都需要蛋白質的參與，它是生命活動的主要承擔者。',
            EvaluationCard_Text_Description_visFat: '內臟脂肪是人體脂肪的一種，與皮下脂肪不同，主要存在於腹腔內，圍繞著人的臟器。一定量的脂肪可以起到支撐，穩定，保護內髒的作用。',
            EvaluationCard_Text_Description_bone: '骨量是人體成分中骨組織的重量，代表骨骼健康的情況。骨組織由細胞、纖維和基質構成，纖維為骨膠纖維，基質含有大量的固體無機鹽。',
            EvaluationCard_Text_Description_bmr: '基礎代謝率指人體在清醒又極端安靜的狀態下，不受肌肉活動、環境溫度、食物及精神緊張等影響時的能量代謝率。',
            EvaluationCard_Text_Description_somaAge: '身體年齡指以基礎代謝率為基礎，綜合體重、身高、脂肪、肌肉等指標得出的數值，主要取決於生活方式和健康狀況。',
            EvaluationCard_Text_Description_fatMass: '身體內所含脂肪的重量。脂肪重量包含皮下脂肪和內臟脂肪兩種脂肪的重量。',
            EvaluationCard_Text_Description_somatotype: '',
            EvaluationCard_Text_Description_bodyFatIndex: '體脂指數是對體脂率的分等級劃分。若體脂指數過高，可增加高血壓、冠心病、糖尿病等疾病風險；若體脂率過低，則可能引起功能失調。體脂指數是評價身體健康的一個重要指標。',
            EvaluationCard_Text_Description_obesityLevel: '肥胖級別反映體形的視覺效果。保持不肥胖的體形會更加健康、有活力；而肥胖的體型不僅影響視覺上的效果，也存在引發疾病的風險。',
            EvaluationCard_Text_Description_normalWeight: '正常體重是根據您當前的基礎身體數據推導出的理想體重範圍。在正常體重範圍內看上去更加健康，是判斷是否肥胖的一個重要指標。',
            EvaluationCard_Text_Description_fatFreeMass: '去脂體重也稱為瘦體重。是指除脂肪以外的其他成分的總和。皮膚、肌肉、骨骼和內臟器官是瘦體重的主要構成部分。',
            EvaluationCard_Text_Evaluate_bmi_1: '目前BMI指數較低，屬於偏瘦人群，離標準身材還有一點距離哦！',
            EvaluationCard_Text_Evaluate_bmi_2: '目前BMI指數正常，身材指數完美，要繼續保持哦！',
            EvaluationCard_Text_Evaluate_bmi_3: '目前BMI指數偏高，離標準的身材還有一點距離哦！',
            EvaluationCard_Text_Evaluate_bmi_4: '當前BMI指數較高，心臟病、高血壓等疾病的發病風險較高，請注意改善生活習慣！',
            EvaluationCard_Text_Evaluate_bmi_5: 'BMI指數較高，心臟病、高血壓等疾病的發病風險較高，請注意改善生活習慣！',
            EvaluationCard_Text_Evaluate_fat_1: '當前體脂率偏低。當脂肪不足以給人體日常活動供能時，會轉而消耗蛋白質，過多的蛋白質消耗會損害人體組織。',
            EvaluationCard_Text_Evaluate_fat_2: '恭喜你，體脂率為正常水準，要繼續保持哦！',
            EvaluationCard_Text_Evaluate_fat_3: '體脂率偏高，表明脂肪攝入過剩而運動不足。脂肪持續堆積會導致糖尿病、高血壓等心腦血管疾病，請注意警惕！',
            EvaluationCard_Text_Evaluate_fat_4: '體脂率過高，表明脂肪攝入過剩而運動不足，長期會導致糖尿病、高血壓等心腦血管疾病，請提高警惕！',
            EvaluationCard_Text_Evaluate_muscle_1: '運動過少和節食是肌肉流失的主要原因。肌肉是能量消耗的主力軍，增加肌肉能提高熱量消耗，以健康的方式減掉多餘脂肪。',
            EvaluationCard_Text_Evaluate_muscle_2: '恭喜你，肌肉含量達標，要繼續保持哦~',
            EvaluationCard_Text_Evaluate_water_1: '保持充足的水分可以促進身體代謝，帶走體內的廢物和毒素。',
            EvaluationCard_Text_Evaluate_water_2: '恭喜你水分達標，注意保持哦~',
            EvaluationCard_Text_Evaluate_water_3: '當前屬於水腫體質，原因是體內水分不足，無法促進代謝，體內多餘的微量元素排泄不出，滯留在體內。',
            EvaluationCard_Text_Evaluate_protein_1: '蛋白質偏低是營養攝入不足或消化不良導致。缺乏蛋白質會引起免疫力下降、肌肉無力和貧血，使身體基礎代謝降低。',
            EvaluationCard_Text_Evaluate_protein_2: '恭喜你蛋白質達標，注意保持哦~',
            EvaluationCard_Text_Evaluate_protein_3: '蛋白質偏高，是營養過剩導致。蛋白質攝取過剩會導致轉化成脂肪，造成脂肪堆積。',
            EvaluationCard_Text_Evaluate_visFat_1: '內臟脂肪水平正常，適當的內臟脂肪可以大幅降低心腦血管疾病的發病危險哦！',
            EvaluationCard_Text_Evaluate_visFat_2: '內臟脂肪偏高是由於囤積在內臟周圍的脂肪過多，會導致腹部和胸腔的空間變小，內臟機能下降，從而引發糖尿病等疾病。',
            EvaluationCard_Text_Evaluate_visFat_3: '囤積在內臟周圍的脂肪過多，會導致內臟機能不斷下降，心臟病、高血壓等疾病的發病率較高，請注意警惕！',
            EvaluationCard_Text_Evaluate_bone_1: '你的骨量水平標準，短期內不會發生明顯的變化。',
            EvaluationCard_Text_Evaluate_bmr_1: '基礎代謝率未達標！節食、熬夜、缺乏運動均會導致基礎代謝率偏低，相應的身體能耗降低，稍微吃多一點就容易發胖噢~',
            EvaluationCard_Text_Evaluate_bmr_2: '恭喜你，你的基礎代謝率在標準水平！提高基礎代謝率，身體能耗會相應增加，就不容易發胖。',
            EvaluationCard_Text_Evaluate_somaAge_1: '您的身體年齡高於實際年齡，表明身體機能略有老化，熬夜、缺乏運動都會導致身體年齡偏高。',
            EvaluationCard_Text_Evaluate_somaAge_2: '身體年齡年輕，表明體內各項機能正常，要繼續保持哦！',
            EvaluationCard_Text_Evaluate_fatMass_1: '當前脂肪重量偏低。當脂肪不足以給人體日常活動供能時，會轉而消耗蛋白質，過多的蛋白質消耗會損害人體組織。',
            EvaluationCard_Text_Evaluate_fatMass_2: '恭喜你，脂肪重量為正常水準，要繼續保持哦！',
            EvaluationCard_Text_Evaluate_fatMass_3: '脂肪重量偏高，表明脂肪攝入過剩而運動不足。脂肪持續堆積會導致糖尿病、高血壓等心腦血管疾病，請注意警惕！',
            EvaluationCard_Text_Evaluate_fatMass_4: '脂肪重量過高，表明脂肪攝入過剩而運動不足，長期會導致糖尿病、高血壓等心腦血管疾病，請提高警惕！',
            EvaluationCard_Text_Evaluate_somatotype_1: '',
            EvaluationCard_Text_Evaluate_somatotype_2: '您的身型稍嫌豐滿，脂肪持續堆積還會有引起糖尿病、高血壓等疾病的危險。雖有大白般溫暖萌萌噠的一面，但是健康更重要哦~',
            EvaluationCard_Text_Evaluate_somatotype_3: '',
            EvaluationCard_Text_Evaluate_somatotype_4: '',
            EvaluationCard_Text_Evaluate_somatotype_5: '您的各項身體指標都很標準哦~請繼續保持健康的飲食習慣和運動方式。',
            EvaluationCard_Text_Evaluate_somatotype_6: '',
            EvaluationCard_Text_Evaluate_somatotype_7: '',
            EvaluationCard_Text_Evaluate_somatotype_8: '雖然身材有點偏瘦，但是又具有運動者所擁有的良好線條，繼續保持哦~',
            EvaluationCard_Text_Evaluate_somatotype_9: '',
            EvaluationCard_Text_Evaluate_bodyFatIndex_1: '當前體脂指數太低啦！體內脂肪不足可能導致人體活動消耗過多蛋白質，進一步損害人體正常機能。',
            EvaluationCard_Text_Evaluate_bodyFatIndex_2: '當前體脂指數偏低。體脂對於保護心血管健康具有重要意義，建議適當增脂。',
            EvaluationCard_Text_Evaluate_bodyFatIndex_3: '當前體脂指數正常，處於健康狀態呢~',
            EvaluationCard_Text_Evaluate_bodyFatIndex_4: '當前體脂指數正常，要繼續保持健康的生活飲食習慣哦~',
            EvaluationCard_Text_Evaluate_bodyFatIndex_5: '當前體脂指數偏高，要注意減脂了哦~',
            EvaluationCard_Text_Evaluate_bodyFatIndex_6: '當前體脂指數過高，增加各種慢性疾病的風險，需要制定減脂計划了！',
            EvaluationCard_Text_Evaluate_bodyFatIndex_7: '當前體脂指數極高，健康疾病風險大大提高，必須改變飲食方式與生活習慣啦！持之以恆，把體脂減下來吧！',
            EvaluationCard_Text_Evaluate_obesityLevel_1: '看上去不胖喲！想要自己看上去更健康有活力，可以適當增肌哦~',
            EvaluationCard_Text_Evaluate_obesityLevel_2: '看上去有點肉咯，要注意預防身形進一步肥胖呀！',
            EvaluationCard_Text_Evaluate_obesityLevel_3: '會被別人說胖啦，認真實行減肥計劃吧，加油哦！',
            EvaluationCard_Text_Evaluate_obesityLevel_4: '肥胖會提高健康疾病風險，加把勁能減下來哦！',
            EvaluationCard_Text_Evaluate_normalWeight_1: '體重低於正常水平，應該適當增重以提高體質哦！',
            EvaluationCard_Text_Evaluate_normalWeight_2: '當前體重正常，要繼續保持哦！',
            EvaluationCard_Text_Evaluate_normalWeight_3: '當前體重高於正常水平，需要適當減重以讓身體更健康哦~',
            EvaluationCard_Text_Evaluate_fatFreeMass_: '',
            EvaluationCard_Text_Suggest: '此處有妙招',
            EvaluationCard_Text_Suggest_bmi_1: '當前適合增肌，使身材更加健美哦！力量訓練有助於刺激肌肉生長，提高身體消耗。飲食上需藉助蛋白質進行能量補充，雞胸肉、蝦、雞蛋白等都是較好的選擇!',
            EvaluationCard_Text_Suggest_bmi_2: '保持規律的生活方式，少熬夜多運動，每周安排2-3次運動可以保持身體的基礎代謝，使身體的循環能力增強。運動後記得拉伸放鬆哦。',
            EvaluationCard_Text_Suggest_bmi_3: '當前建議減脂，每周2-3次高強度間歇訓練有助於快速燃燒脂肪，提高心肺功能。減脂原理是消耗大於攝入，只要堅持運動併合理控制攝入，很快就能瘦下來哦!',
            EvaluationCard_Text_Suggest_bmi_4: '減脂原理是消耗大於攝入，當前需控制飲食，增加運動消耗。有氧運動有助於脂肪消耗，體重基數較大時不要選擇對膝蓋壓力較大的運動，可從走路、踩單車開始。',
            EvaluationCard_Text_Suggest_bmi_5: '當前需要嚴格控制攝入，請遠離高熱量食物；同時增加運動量有助於消耗脂肪，體重基數較大時不要選擇對膝蓋壓力較大的運動如跑步、跳動。',
            EvaluationCard_Text_Suggest_fat_1: '脂肪分為飽和脂肪酸和不飽和脂肪酸，不飽和脂肪易分解，不易堆積成脂肪，可適量攝入為身體補充能量。堅果、大豆、葵花籽、花生等都是較好的選擇。',
            EvaluationCard_Text_Suggest_fat_2: '注意保持鍛煉，合理飲食！堅持運動可以提高基礎代謝，有助於消除工作帶來的疲勞，勞逸結合可以使工作效率更高哦！',
            EvaluationCard_Text_Suggest_fat_3: '當前建議減脂，每周安排2-3次力量訓練有助於消耗脂肪，高強度間歇運動使脂肪燃燒的時間延長，做完運動躺著也會瘦哦~',
            EvaluationCard_Text_Suggest_fat_4: '當前需嚴格控制熱量攝入，通過運動消耗體內多餘脂肪。減脂期需保持消耗大於攝入，三分練七分吃，合理飲食能使減脂事半功倍哦~',
            EvaluationCard_Text_Suggest_muscle_1: '增肌階段需要能量支持，需保持攝入大於消耗，尤其是糖分和蛋白質。高蛋白食物可選擇雞胸肉、雞蛋白等。糖分可從碳水化合物中攝取如各類穀物、紅薯等。',
            EvaluationCard_Text_Suggest_muscle_2: '增肌階段需要能量支持，需保持攝入大於消耗，尤其是糖分和蛋白質。高蛋白食物可選擇雞胸肉、雞蛋白等。糖分可從碳水化合物中攝取如各類穀物、紅薯等。',
            EvaluationCard_Text_Suggest_water_1: '體重降低時，若水分降低但體脂無變化，減輕的部分可能是體內的水分，會導致水分不足、代謝紊亂，表明減重方式不科學噢~',
            EvaluationCard_Text_Suggest_water_2: '保持規律的飲食和作息，每天八杯水就能保持正常水平啦！如有進行運動鍛煉，請注意補充水分，彌補出汗過多導致的水分流失。',
            EvaluationCard_Text_Suggest_water_3: '注意補充水分，促進身體代謝，水分的排泄可以帶走體內的微量元素和廢物垃圾，使內環境保持健康循環！',
            EvaluationCard_Text_Suggest_protein_1: '蛋白質是身體活動及肌肉生長的重要營養元素，提高蛋白質可通過日常膳食補充，雞蛋、牛奶、豆類都是優質的蛋白質來源，脂肪含量低，適合在三餐中食用喲！',
            EvaluationCard_Text_Suggest_protein_2: '不過分節食，保持營養均衡，就能維持穩定的蛋白質水平啦！',
            EvaluationCard_Text_Suggest_protein_3: '飲食清淡，膳食合理，堅持鍛煉，規律作息，健康會一直陪伴著你噠！',
            EvaluationCard_Text_Suggest_visFat_1: '均衡膳食，拒絕高熱量食物，保持規律的作息，健康會一直陪伴著你噠！',
            EvaluationCard_Text_Suggest_visFat_2: '當前需要增加運動量，促進內臟脂肪消耗,。每周可安排1-2次有氧運動，每天飯後步行30分鐘；飲食上以清淡為主，遠離高熱量食物！',
            EvaluationCard_Text_Suggest_visFat_3: '保持飲食清淡，少吃高熱量食物；堅持運動，飯後步行30分鐘，有利於促進食物消化，帶動能量消耗！',
            EvaluationCard_Text_Suggest_bone_1: '每天飯後步行20分鐘，適當到戶外晒晒太陽有助於鈣質的吸收哦~平常可從牛奶、豆製品、魚、動物骨頭等食物中獲取鈣質。',
            EvaluationCard_Text_Suggest_bmr_1: '力量訓練可提高基礎代謝，增加能耗。飲食上可攝入富含蛋白質的食物如雞胸肉、雞蛋白等。蛋白質耗能比碳水化合物和脂肪多，身體消化蛋白質時也會消耗熱量。',
            EvaluationCard_Text_Suggest_bmr_2: '基礎代謝率與飲食、作息和運動息息相關，保持健康作息和均衡膳食，堅持每周至少運動一次，脂肪就永遠找不上門咯！',
            EvaluationCard_Text_Suggest_somaAge_1: '注意保持健康作息，少熬夜，少吃高脂高熱量的食物，加強鍛煉，讓身體處於穩定的代謝循環，一直保持年輕和活力哦！',
            EvaluationCard_Text_Suggest_somaAge_2: '繼續健康的生活方式，堅持運動，保持合理作息和營養膳食，讓身體一直保持活力和年輕！',
            EvaluationCard_Text_Suggest_fatMass_1: '脂肪分為飽和脂肪酸和不飽和脂肪酸，不飽和脂肪易分解，不易堆積成脂肪，可適量攝入為身體補充能量。堅果、大豆、葵花籽、花生等都是較好的選擇。',
            EvaluationCard_Text_Suggest_fatMass_2: '注意保持鍛煉，合理飲食！堅持運動可以提高基礎代謝，有助於消除工作帶來的疲勞，勞逸結合可以使工作效率更高哦！',
            EvaluationCard_Text_Suggest_fatMass_3: '當前建議減脂，每周安排2-3次力量訓練有助於消耗脂肪，高強度間歇運動使脂肪燃燒的時間延長，做完運動躺着也會瘦哦~',
            EvaluationCard_Text_Suggest_fatMass_4: '當前需嚴格控制熱量攝入，通過運動消耗體內多餘脂肪。減脂期需保持消耗大於攝入，三分練七分吃，合理飲食能使減脂事半功倍哦~',
            EvaluationCard_Text_Suggest_somatotype_1: '',
            EvaluationCard_Text_Suggest_somatotype_2: '建議調整飲食結構，減少高油脂食物的攝入，當然甜食也是禁區；在運動上保持有氧訓練的頻率和長度，每周3~4次，每次30分鐘左右。',
            EvaluationCard_Text_Suggest_somatotype_3: '',
            EvaluationCard_Text_Suggest_somatotype_4: '',
            EvaluationCard_Text_Suggest_somatotype_5: '規律的生活方式是保持好身體的基礎。如果您想擁有更加健美的身體線條，可以每周增加2~3次的力量訓練，練完之後記得放鬆和拉伸哦~',
            EvaluationCard_Text_Suggest_somatotype_6: '',
            EvaluationCard_Text_Suggest_somatotype_7: '',
            EvaluationCard_Text_Suggest_somatotype_8: '您需要進行合理的膳食管理，多補充一些蛋、魚、肉等高蛋白的食物，保證能量的攝入，同時也要配合相應的訓練，充分的鍛煉可以提高身體對能量的吸收能力，塑造更好的線條。',
            EvaluationCard_Text_Suggest_somatotype_9: '',
            EvaluationCard_Text_Suggest_bodyFatIndex_1: '通過食用富含脂肪的食物可以提高體脂，比較好的食物選擇有堅果、葵花籽、橄欖油等。',
            EvaluationCard_Text_Suggest_bodyFatIndex_2: '適當增脂可從多吃飯、不挑食、早睡早起開始，養成良好的生活習慣吧！',
            EvaluationCard_Text_Suggest_bodyFatIndex_3: '建議保持良好的生活習慣哦，檢查一下，改掉壞習慣：晚上熬夜、工作時久坐不走動、不吃早餐等。',
            EvaluationCard_Text_Suggest_bodyFatIndex_4: '多吃水果和蔬菜、運動緩解工作壓力，每周進行一次戶外活動接觸大自然、保持輕鬆愉快的心情，可以提升生活品質哦~',
            EvaluationCard_Text_Suggest_bodyFatIndex_5: '檢查一下飲食習慣，改掉壞習慣：早餐吃太少、午餐晚餐吃太飽、多肉少菜、偏愛油膩食物等。檢查一下生活習慣，改掉壞習慣：久坐不動、每周沒有運動訓練等。',
            EvaluationCard_Text_Suggest_bodyFatIndex_6: '飲食上建議拒絕高熱量食物，如碳酸飲料、高糖零食、油炸食品等。生活習慣上建議增加日常體力活動，如以步代車。',
            EvaluationCard_Text_Suggest_bodyFatIndex_7: '減肥方法多，大家都知道要“管住嘴，邁開腿”，但很多人不知道還要保持良好的心態哦~切忌心太急，要放寬心，慢慢來哦~',
            EvaluationCard_Text_Suggest_obesityLevel_1: '可通過力量訓練增加肌肉力量，使體態更加健美！簡單的力量訓練方法有舉啞鈴、俯卧撐、深蹲等。記得要健身前熱身和健身後拉伸放鬆哦！',
            EvaluationCard_Text_Suggest_obesityLevel_2: '建議控制飲食，並加強運動鍛煉，使體形更好看。控制飲食可以從少吃炸雞、薯條、巧克力等高熱量食物開始。另外，跑步和騎行是很受歡迎的運動方式，可以去體驗哦！',
            EvaluationCard_Text_Suggest_obesityLevel_3: '高強度間歇訓練是不錯的燃脂方法。同時，減肥不止要多運動，還要控制飲食，使熱量攝入小於消耗哦~',
            EvaluationCard_Text_Suggest_obesityLevel_4: '高強度間歇訓練是不錯的燃脂方法。同時，減肥不止要多運動，還要控制飲食，使熱量攝入小於消耗哦~',
            EvaluationCard_Text_Suggest_normalWeight_1: '建議設定增重目標，進行熱量管理，使飲食攝入熱量充足且大於消耗。一日三餐的能量攝入合理比例為早餐：午餐：晚餐 = 3：4：3。',
            EvaluationCard_Text_Suggest_normalWeight_2: '建議繼續保持健康的飲食習慣，並安排每周2-3次運動以緩解工作疲勞，提高生活品質。',
            EvaluationCard_Text_Suggest_normalWeight_3: '建議設定減重目標，進行熱量管理，使飲食攝入熱量低於消耗，少吃高熱量食物，同時積极參与運動鍛煉。',
            EvaluationCard_Text_Suggest_fatFreeMass_: '',
            EvaluationCard_Text_Your: '你的',
            EvaluationCard_Text_PercentageOfBodyWeight: '占體重',
            BriefingList_Title: '歷史記錄',
            BriefingList_Delete_Weight: '妳確定要刪除這條記錄麽?',
            BriefingList_Text_Average: '均',
            BriefingList_Text_Change: '變化',
            BriefingList_Text_NoData: '無稱重數據',
            BriefingList_Text_NoFatData: '無脂肪數據',
            BriefingList_Text_NoMuscleData: '無肌肉數據',
            BriefingList_Interaction_Loding: '加載中...',
            DeviceControl_Title: '設備控制',
            DeviceControl_Text_WeightUnit: '體重單位',
            Setting_Title: '通用設置',
            Setting_Text_DeviceRename: '重命名',
            Setting_Text_DeviceSharing: '設備共享',
            Setting_Text_DeviceGrouping: '設備分組',
            Setting_Text_FirmwareUpgrade: '檢查固件升級',
            Setting_Text_DeleteDevice: '解除連接',
            Setting_Text_Feedback: '反饋',
            Setting_Text_Add_ToDesktopPage: '添加快捷方式',
            Setting_Text_license_privacy: '查看使用条款和隐私协议',
            FirmwareUpgrade_Title: '固件升級',
            FirmwareUpgrade_Text_IsAlreadyUpToDate: '固件已經是最新版本',
            FirmwareUpgrade_Text_CurrentVersion: '當前版本',
            FirmwareUpgrade_Text_LatestVersion: '最新版本',
            FirmwareUpgrade_Text_DoNotDisconnectTheBluetoothConnection: '正在升級, 請勿斷開藍牙連接',
            FirmwareUpgrade_Text_UpgradeSuccessed: '升級成功',
            FirmwareUpgrade_Text_HasBeenUpgradedTo: '固件已升級至',
            FirmwareUpgrade_Text_UpgradeFailed: '升級失敗',
            FirmwareUpgrade_Text_MakeSureBluetoothConnectedProperly: '請確保藍牙正常連接',
            FirmwareUpgrade_Interaction_UpgradeImmediately: '立即升級',
            FirmwareUpgrade_Interaction_Finished: '完成',
            FirmwareUpgrade_Interaction_Retry: '重試',
            UserSetting_Title: '個人設置',
            UserSetting_Interaction_GenderCanNotChanged: '性別不能更改',
            UserSetting_Interaction_ModifyGender: '性別修改後會導致前後差異，確認需要修改?',
            MultiUserList_Title: '多用戶管理',
            FamilyMembersAdd_Title: '添加成員',
            MultiUserEdit_Title: '用戶信息',
            MultiUser_Interaction_NicknameLimit: '昵稱長度不可超過10個字符',
            MultiUser_Interaction_Saving: '保存中...',
            MultiUser_Interaction_SaveSuccessfully: '保存用戶信息成功',
            MultiUser_Interaction_SaveFailed: '保存用戶信息失敗, 請重試',
            MultiUser_Interaction_DataWillDelete: '此用戶所有數據將從服務器和設備上刪除',
            VisitorMode_OutTitle: '訪客模式',
            VisitorMode_InnerTitle: '添加訪客',
            VisitorMode_Text_TheDataIsNotSaved: '訪客模式不會對檢測數據進行保存',
            Help_Title: '使用幫助'
        }
    });
}, 10013, [10016], "projects/com.yunmai.scales.ios/Main/Localized.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    var localization = _require(_dependencyMap[0]).ReactLocalization;

    var interfaceLanguage = localization.language;

    var LocalizedStrings = function () {
        babelHelpers.createClass(LocalizedStrings, [{
            key: "_getBestMatchingLanguage",
            value: function _getBestMatchingLanguage(language, props) {
                if (props[language]) return language;
                return Object.keys(props)[0];
            }
        }]);

        function LocalizedStrings(props) {
            babelHelpers.classCallCheck(this, LocalizedStrings);
            this.props = props;
            this.setLanguage(interfaceLanguage);
        }

        babelHelpers.createClass(LocalizedStrings, [{
            key: "setLanguage",
            value: function setLanguage(language) {
                var bestLanguage = this._getBestMatchingLanguage(language, this.props);

                this.language = bestLanguage;

                if (this.props[bestLanguage]) {
                    var localizedStrings = this.props[this.language];

                    for (var key in localizedStrings) {
                        if (localizedStrings.hasOwnProperty(key)) {
                            this[key] = localizedStrings[key];
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
        }]);
        return LocalizedStrings;
    }();

    module.exports = LocalizedStrings;
}, 10016, [10042], "projects/com.yunmai.scales.ios/CommonModules/LocalizedStrings.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    var _reactNative = _require(_dependencyMap[0]);

    var _reactNative2 = babelHelpers.interopRequireDefault(_reactNative);

    var _Global = _require(_dependencyMap[1]);

    var _YMUserInfo = _require(_dependencyMap[2]);

    var _YMUserInfo2 = babelHelpers.interopRequireDefault(_YMUserInfo);

    var _miot = _require(_dependencyMap[3]);

    var list;
    var currentIndex = 0;
    var visitorInfo = new _YMUserInfo2.default();
    visitorInfo.shortId = 999999;
    visitorInfo.relevance = -99;
    visitorInfo.unit = 3;
    var visitorIndex = -99;
    var YMUser = {
        setList: function setList(userList) {
            if (_Global.Function.equalNull(userList) || _Global.Function.equalNull(userList[0])) {
                return;
            }

            list = userList;
        },
        setCurrentUserInfo: function setCurrentUserInfo(index) {
            if (index >= 0 && index < list.length) {
                currentIndex = index;
            }
        },
        setCurrentForVisitor: function setCurrentForVisitor() {
            currentIndex = visitorIndex;
        },
        getList: function getList() {
            if (_Global.Function.equalNull(list) || _Global.Function.equalNull(list[0])) {
                var mainUserInfo = new _YMUserInfo2.default();
                list = [mainUserInfo];
            }

            list[0].pUid = '0';
            list[0].relevance = 0;
            return list;
        },
        getCurrentUserInfo: function getCurrentUserInfo() {
            if (currentIndex === visitorIndex) {
                return visitorInfo;
            }

            var userInfo = YMUser.getList()[currentIndex];

            if (userInfo.unit !== 1 && userInfo.unit !== 2 && userInfo.unit !== 3) {
                userInfo.unit = 3;
            }

            return userInfo;
        },
        getVisitorInfo: function getVisitorInfo() {
            return visitorInfo;
        },
        getMainUserInfo: function getMainUserInfo() {
            var mainUserInfo = YMUser.getList()[0];

            if (mainUserInfo.unit !== 1 && mainUserInfo.unit !== 2 && mainUserInfo.unit !== 3) {
                mainUserInfo.unit = 3;
            }

            return YMUser.getList()[0];
        }
    };
    module.exports = YMUser;
}, 10019, [10033, 10010, 10022, 10074], "projects/com.yunmai.scales.ios/Main/Tools/YMUser.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var YMUserInfo = function YMUserInfo(props) {
        babelHelpers.classCallCheck(this, YMUserInfo);
        this.pUid = '0';
        this.shortId = '';
        this.userName = '';
        this.bodyType = 0;
        this.basisWeight = 0;
        this.unit = 3;
        this.status = 0;
        this.lastDownTime = 0;
        this.usageCount = 0;
        this.sex = 1;
        this.age = 0;
        this.height = 0;
        this.relevance = 88;
        this.birthday = '19000101';
    };

    YMUserInfo.mutableCopy = function (userInfo) {
        var newUserInfo = new YMUserInfo();
        newUserInfo.pUid = userInfo.pUid;
        newUserInfo.shortId = userInfo.shortId;
        newUserInfo.userName = userInfo.userName;
        newUserInfo.bodyType = userInfo.bodyType;
        newUserInfo.basisWeight = userInfo.basisWeight;
        newUserInfo.unit = userInfo.unit;
        newUserInfo.status = userInfo.status;
        newUserInfo.lastDownTime = userInfo.lastDownTime;
        newUserInfo.usageCount = userInfo.usageCount;
        newUserInfo.sex = userInfo.sex;
        newUserInfo.age = userInfo.age;
        newUserInfo.height = userInfo.height;
        newUserInfo.relevance = userInfo.relevance;
        newUserInfo.birthday = userInfo.birthday;
        return newUserInfo;
    };

    exports.default = YMUserInfo;
}, 10022, [], "projects/com.yunmai.scales.ios/Main/Tools/YMUserInfo.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 180,
        "height": 180,
        "scales": [1],
        "hash": "bb83901eb7a09b2be5bc69cd63fcb168",
        "name": "usr_unselected_woman",
        "type": "png"
    });
}, 10025, [10420], "projects/com.yunmai.scales.ios/Resources/usr_unselected_woman.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 60,
        "height": 60,
        "scales": [1],
        "hash": "cb8af9809a560162509e226c8f4babea",
        "name": "mnu_briefBtn",
        "type": "png"
    });
}, 10028, [10420], "projects/com.yunmai.scales.ios/Resources/mnu_briefBtn.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 60,
        "height": 60,
        "scales": [1],
        "hash": "626950c59e479e2ba8e73f51bb05fffc",
        "name": "mnu_closeBtn",
        "type": "png"
    });
}, 10031, [10420], "projects/com.yunmai.scales.ios/Resources/mnu_closeBtn.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 14,
        "height": 27,
        "scales": [1],
        "hash": "f63d39c291dcfe2af0ac1bd26a35c3de",
        "name": "mnu_arrow",
        "type": "png"
    });
}, 10034, [10420], "projects/com.yunmai.scales.ios/Resources/mnu_arrow.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 66,
        "height": 66,
        "scales": [1],
        "hash": "632ceeb53aac75f3be7d3021bddedacb",
        "name": "fml_deleteBtn",
        "type": "png"
    });
}, 10037, [10420], "projects/com.yunmai.scales.ios/Resources/fml_deleteBtn.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 150,
        "height": 150,
        "scales": [1],
        "hash": "754b8a791e0d64625e5bbe5b1fea2c79",
        "name": "elc_noData_bmi",
        "type": "png"
    });
}, 10040, [10420], "projects/com.yunmai.scales.ios/Resources/elc_noData_bmi.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 150,
        "height": 150,
        "scales": [1],
        "hash": "2fc1946609c5eb7ecf0bce08f83a45fe",
        "name": "elc_noData_bmr",
        "type": "png"
    });
}, 10043, [10420], "projects/com.yunmai.scales.ios/Resources/elc_noData_bmr.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 150,
        "height": 150,
        "scales": [1],
        "hash": "b43f047179d3cde6b59461b7ac64b0ce",
        "name": "elc_noData_bodyFatIndex",
        "type": "png"
    });
}, 10046, [10420], "projects/com.yunmai.scales.ios/Resources/elc_noData_bodyFatIndex.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 150,
        "height": 150,
        "scales": [1],
        "hash": "0f3a32735d0bb1989a87b8f4518a2438",
        "name": "elc_noData_bone",
        "type": "png"
    });
}, 10049, [10420], "projects/com.yunmai.scales.ios/Resources/elc_noData_bone.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 150,
        "height": 150,
        "scales": [1],
        "hash": "c518dde023be00ce7649d4a9a70c3064",
        "name": "elc_noData_fat",
        "type": "png"
    });
}, 10052, [10420], "projects/com.yunmai.scales.ios/Resources/elc_noData_fat.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 150,
        "height": 150,
        "scales": [1],
        "hash": "1f0c4d64b207ed045506cf61fe200055",
        "name": "elc_noData_fatFreeMass",
        "type": "png"
    });
}, 10055, [10420], "projects/com.yunmai.scales.ios/Resources/elc_noData_fatFreeMass.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 150,
        "height": 150,
        "scales": [1],
        "hash": "3e9d906829eee0b449a303b0d7842e0d",
        "name": "elc_noData_fatMass",
        "type": "png"
    });
}, 10058, [10420], "projects/com.yunmai.scales.ios/Resources/elc_noData_fatMass.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 150,
        "height": 150,
        "scales": [1],
        "hash": "0022ece0295ed36d7e2869b86f4efe28",
        "name": "elc_noData_muscle",
        "type": "png"
    });
}, 10061, [10420], "projects/com.yunmai.scales.ios/Resources/elc_noData_muscle.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 150,
        "height": 150,
        "scales": [1],
        "hash": "9a16d7024220c89bd7ee74b28f945ea8",
        "name": "elc_noData_normalWeight",
        "type": "png"
    });
}, 10064, [10420], "projects/com.yunmai.scales.ios/Resources/elc_noData_normalWeight.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 150,
        "height": 150,
        "scales": [1],
        "hash": "03f6fb488e1231ebedf1e6bf5ff4bbfa",
        "name": "elc_noData_obesityLevel",
        "type": "png"
    });
}, 10067, [10420], "projects/com.yunmai.scales.ios/Resources/elc_noData_obesityLevel.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 150,
        "height": 150,
        "scales": [1],
        "hash": "a2d5c6c87df941865c5bd89508610c39",
        "name": "elc_noData_protein",
        "type": "png"
    });
}, 10070, [10420], "projects/com.yunmai.scales.ios/Resources/elc_noData_protein.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 150,
        "height": 150,
        "scales": [1],
        "hash": "5128f03e2a01cf8c8b25e3231982cd4b",
        "name": "elc_noData_somaAge",
        "type": "png"
    });
}, 10073, [10420], "projects/com.yunmai.scales.ios/Resources/elc_noData_somaAge.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 150,
        "height": 150,
        "scales": [1],
        "hash": "613910d6fe18e5d020d0a76759dcb2ab",
        "name": "elc_noData_somatotype",
        "type": "png"
    });
}, 10076, [10420], "projects/com.yunmai.scales.ios/Resources/elc_noData_somatotype.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 150,
        "height": 150,
        "scales": [1],
        "hash": "6ca5901bc3881e0f61fe26c2d2f714a3",
        "name": "elc_noData_visFat",
        "type": "png"
    });
}, 10079, [10420], "projects/com.yunmai.scales.ios/Resources/elc_noData_visFat.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 150,
        "height": 150,
        "scales": [1],
        "hash": "ee50d7ff59a0f39168dad0474291e582",
        "name": "elc_noData_water",
        "type": "png"
    });
}, 10082, [10420], "projects/com.yunmai.scales.ios/Resources/elc_noData_water.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 20,
        "height": 426,
        "scales": [1],
        "hash": "631945b94dd688b7021e27a651cede2d",
        "name": "elc_somatotype_yAxis",
        "type": "png"
    });
}, 10085, [10420], "projects/com.yunmai.scales.ios/Resources/elc_somatotype_yAxis.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 42,
        "height": 78,
        "scales": [1],
        "hash": "09e68fee349361755a834aefc7d44289",
        "name": "elc_somatotype_RecessiveObesity",
        "type": "png"
    });
}, 10088, [10420], "projects/com.yunmai.scales.ios/Resources/elc_somatotype_RecessiveObesity.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 52,
        "height": 78,
        "scales": [1],
        "hash": "35afd9970e6ee5ab9cd53930f107291b",
        "name": "elc_somatotype_Fat",
        "type": "png"
    });
}, 10091, [10420], "projects/com.yunmai.scales.ios/Resources/elc_somatotype_Fat.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 52,
        "height": 78,
        "scales": [1],
        "hash": "e5eb4ed27515eec7a1c4b13d51ddbfdf",
        "name": "elc_somatotype_AthleticFat",
        "type": "png"
    });
}, 10094, [10420], "projects/com.yunmai.scales.ios/Resources/elc_somatotype_AthleticFat.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 34,
        "height": 78,
        "scales": [1],
        "hash": "592f0c7d38252405d1f94391ba7e8308",
        "name": "elc_somatotype_LackOfTraining",
        "type": "png"
    });
}, 10097, [10420], "projects/com.yunmai.scales.ios/Resources/elc_somatotype_LackOfTraining.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 44,
        "height": 78,
        "scales": [1],
        "hash": "31458b71c233343ec54272c4eb63fcf1",
        "name": "elc_somatotype_Standard",
        "type": "png"
    });
}, 10100, [10420], "projects/com.yunmai.scales.ios/Resources/elc_somatotype_Standard.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 48,
        "height": 78,
        "scales": [1],
        "hash": "a69dd9c9bd3f279013655710ae8ec39a",
        "name": "elc_somatotype_AthleticStandard",
        "type": "png"
    });
}, 10103, [10420], "projects/com.yunmai.scales.ios/Resources/elc_somatotype_AthleticStandard.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 34,
        "height": 78,
        "scales": [1],
        "hash": "a374010b12298b5886a0b576aeeb8511",
        "name": "elc_somatotype_Slim",
        "type": "png"
    });
}, 10106, [10420], "projects/com.yunmai.scales.ios/Resources/elc_somatotype_Slim.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 42,
        "height": 78,
        "scales": [1],
        "hash": "b6c4f7cd06a8c52ce3cfd3f86d89ee77",
        "name": "elc_somatotype_AthleticSlim",
        "type": "png"
    });
}, 10109, [10420], "projects/com.yunmai.scales.ios/Resources/elc_somatotype_AthleticSlim.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 40,
        "height": 78,
        "scales": [1],
        "hash": "5d03bda228796389a3a9c39e47e9ff71",
        "name": "elc_somatotype_Bodybuilding",
        "type": "png"
    });
}, 10112, [10420], "projects/com.yunmai.scales.ios/Resources/elc_somatotype_Bodybuilding.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 580,
        "height": 20,
        "scales": [1],
        "hash": "46000833c1e8c1b465dae926a6f27383",
        "name": "elc_somatotype_xAxis",
        "type": "png"
    });
}, 10115, [10420], "projects/com.yunmai.scales.ios/Resources/elc_somatotype_xAxis.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 88,
        "height": 88,
        "scales": [1],
        "hash": "5f8c5d724634c9f5403f5ec83561a87f",
        "name": "elc_bmi",
        "type": "png"
    });
}, 10118, [10420], "projects/com.yunmai.scales.ios/Resources/elc_bmi.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 88,
        "height": 88,
        "scales": [1],
        "hash": "bdc8efa3ed1d62bafa422f5039d3a510",
        "name": "elc_bmr",
        "type": "png"
    });
}, 10121, [10420], "projects/com.yunmai.scales.ios/Resources/elc_bmr.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 88,
        "height": 88,
        "scales": [1],
        "hash": "128a36abd00bcdbef6f7b3360aa29527",
        "name": "elc_bodyFatIndex",
        "type": "png"
    });
}, 10124, [10420], "projects/com.yunmai.scales.ios/Resources/elc_bodyFatIndex.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 88,
        "height": 88,
        "scales": [1],
        "hash": "71a4f46b80049f25203739b07c6f2c42",
        "name": "elc_bone",
        "type": "png"
    });
}, 10127, [10420], "projects/com.yunmai.scales.ios/Resources/elc_bone.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 88,
        "height": 88,
        "scales": [1],
        "hash": "e59dd752cb57ff5102d9a87a7bee21dc",
        "name": "elc_fat",
        "type": "png"
    });
}, 10130, [10420], "projects/com.yunmai.scales.ios/Resources/elc_fat.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 88,
        "height": 88,
        "scales": [1],
        "hash": "b49fd00592a48a173ac071750b53066c",
        "name": "elc_fatFreeMass",
        "type": "png"
    });
}, 10133, [10420], "projects/com.yunmai.scales.ios/Resources/elc_fatFreeMass.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 88,
        "height": 88,
        "scales": [1],
        "hash": "451018b513167f82871638d2e7cf21a7",
        "name": "elc_fatMass",
        "type": "png"
    });
}, 10136, [10420], "projects/com.yunmai.scales.ios/Resources/elc_fatMass.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 88,
        "height": 88,
        "scales": [1],
        "hash": "d3302b9f1ad800f306fb2b6453be447c",
        "name": "elc_muscle",
        "type": "png"
    });
}, 10139, [10420], "projects/com.yunmai.scales.ios/Resources/elc_muscle.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 88,
        "height": 88,
        "scales": [1],
        "hash": "e32a7a7217db6d2c1593dd4fa877337f",
        "name": "elc_normalWeight",
        "type": "png"
    });
}, 10142, [10420], "projects/com.yunmai.scales.ios/Resources/elc_normalWeight.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 88,
        "height": 88,
        "scales": [1],
        "hash": "0018ec9676136e6e4e5bd69731973986",
        "name": "elc_obesityLevel",
        "type": "png"
    });
}, 10145, [10420], "projects/com.yunmai.scales.ios/Resources/elc_obesityLevel.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 88,
        "height": 88,
        "scales": [1],
        "hash": "1c6e70a7edcd27665dc1adcd6ccc9626",
        "name": "elc_protein",
        "type": "png"
    });
}, 10148, [10420], "projects/com.yunmai.scales.ios/Resources/elc_protein.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 88,
        "height": 88,
        "scales": [1],
        "hash": "b35f1c07f4386cb4d39ff7039f338f88",
        "name": "elc_somaAge",
        "type": "png"
    });
}, 10151, [10420], "projects/com.yunmai.scales.ios/Resources/elc_somaAge.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 88,
        "height": 88,
        "scales": [1],
        "hash": "c3584065a28f6394f979fac92ee9cfa1",
        "name": "elc_visFat",
        "type": "png"
    });
}, 10154, [10420], "projects/com.yunmai.scales.ios/Resources/elc_visFat.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 88,
        "height": 88,
        "scales": [1],
        "hash": "ce1bc899469d6d5fde296db992899231",
        "name": "elc_water",
        "type": "png"
    });
}, 10157, [10420], "projects/com.yunmai.scales.ios/Resources/elc_water.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 44,
        "height": 44,
        "scales": [1],
        "hash": "6015564343d0007d5fe7d943c1c5be63",
        "name": "elc_analyses",
        "type": "png"
    });
}, 10160, [10420], "projects/com.yunmai.scales.ios/Resources/elc_analyses.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 44,
        "height": 44,
        "scales": [1],
        "hash": "edd38a229703c742153ae11ed6d5ed74",
        "name": "elc_bulb",
        "type": "png"
    });
}, 10163, [10420], "projects/com.yunmai.scales.ios/Resources/elc_bulb.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 50,
        "height": 80,
        "scales": [1],
        "hash": "02203f48d6932baa010ae6d57320c3ec",
        "name": "elc_somatotype_RecessiveObesity_Highlight",
        "type": "png"
    });
}, 10166, [10420], "projects/com.yunmai.scales.ios/Resources/elc_somatotype_RecessiveObesity_Highlight.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 50,
        "height": 80,
        "scales": [1],
        "hash": "16486d46352268a6a0e80ed8110eb25a",
        "name": "elc_somatotype_Fat_Highlight",
        "type": "png"
    });
}, 10169, [10420], "projects/com.yunmai.scales.ios/Resources/elc_somatotype_Fat_Highlight.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 50,
        "height": 80,
        "scales": [1],
        "hash": "236b6bb487d3c30f27d8b2d659c7ec4f",
        "name": "elc_somatotype_AthleticFat_Highlight",
        "type": "png"
    });
}, 10172, [10420], "projects/com.yunmai.scales.ios/Resources/elc_somatotype_AthleticFat_Highlight.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 50,
        "height": 80,
        "scales": [1],
        "hash": "d6da779e4bd280298ed23c59f92b8387",
        "name": "elc_somatotype_LackOfTraining_Highlight",
        "type": "png"
    });
}, 10175, [10420], "projects/com.yunmai.scales.ios/Resources/elc_somatotype_LackOfTraining_Highlight.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 50,
        "height": 80,
        "scales": [1],
        "hash": "bafcec122aadbb226b6725c84c086f92",
        "name": "elc_somatotype_Standard_Highlight",
        "type": "png"
    });
}, 10178, [10420], "projects/com.yunmai.scales.ios/Resources/elc_somatotype_Standard_Highlight.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 50,
        "height": 80,
        "scales": [1],
        "hash": "2d91483f5c2ac106edf5ecde9ceef869",
        "name": "elc_somatotype_AthleticStandard_Highlight",
        "type": "png"
    });
}, 10181, [10420], "projects/com.yunmai.scales.ios/Resources/elc_somatotype_AthleticStandard_Highlight.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 50,
        "height": 80,
        "scales": [1],
        "hash": "8dd6a4145503ae5a3665974ff788365d",
        "name": "elc_somatotype_Slim_Highlight",
        "type": "png"
    });
}, 10184, [10420], "projects/com.yunmai.scales.ios/Resources/elc_somatotype_Slim_Highlight.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 50,
        "height": 80,
        "scales": [1],
        "hash": "5d0469b56de5d3376a04f5150178626a",
        "name": "elc_somatotype_AthleticSlim_Highlight",
        "type": "png"
    });
}, 10187, [10420], "projects/com.yunmai.scales.ios/Resources/elc_somatotype_AthleticSlim_Highlight.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 50,
        "height": 80,
        "scales": [1],
        "hash": "fd0139aaa836f4223b8919ccb0339a57",
        "name": "elc_somatotype_Bodybuilding_Highlight",
        "type": "png"
    });
}, 10190, [10420], "projects/com.yunmai.scales.ios/Resources/elc_somatotype_Bodybuilding_Highlight.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 20,
        "height": 32,
        "scales": [1],
        "hash": "f4768cda830736fa3d8c6773ee307318",
        "name": "elc_slider1",
        "type": "png"
    });
}, 10193, [10420], "projects/com.yunmai.scales.ios/Resources/elc_slider1.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 20,
        "height": 32,
        "scales": [1],
        "hash": "f3e5475012703116ca7b685b2592272d",
        "name": "elc_slider2",
        "type": "png"
    });
}, 10196, [10420], "projects/com.yunmai.scales.ios/Resources/elc_slider2.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 20,
        "height": 32,
        "scales": [1],
        "hash": "0bba8d4402a5b9ec446ab82319bf611d",
        "name": "elc_slider3",
        "type": "png"
    });
}, 10199, [10420], "projects/com.yunmai.scales.ios/Resources/elc_slider3.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 20,
        "height": 32,
        "scales": [1],
        "hash": "ebd6fbaa19b44cfccba2a394a8d1a610",
        "name": "elc_slider4",
        "type": "png"
    });
}, 10202, [10420], "projects/com.yunmai.scales.ios/Resources/elc_slider4.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 20,
        "height": 32,
        "scales": [1],
        "hash": "32b6ab9ae5dd516601889ac18dc77dbe",
        "name": "elc_slider5",
        "type": "png"
    });
}, 10205, [10420], "projects/com.yunmai.scales.ios/Resources/elc_slider5.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 20,
        "height": 32,
        "scales": [1],
        "hash": "ec865632b9e3a0ad5ca2c0d0a45d1ca1",
        "name": "elc_slider6",
        "type": "png"
    });
}, 10208, [10420], "projects/com.yunmai.scales.ios/Resources/elc_slider6.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 20,
        "height": 32,
        "scales": [1],
        "hash": "1ca307c9788ce14bb03f927cdf3275b5",
        "name": "elc_slider7",
        "type": "png"
    });
}, 10211, [10420], "projects/com.yunmai.scales.ios/Resources/elc_slider7.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 60,
        "height": 60,
        "scales": [1],
        "hash": "6e0d7b14bb85fcb23812696679633f5d",
        "name": "grd_bmi",
        "type": "png"
    });
}, 10214, [10420], "projects/com.yunmai.scales.ios/Resources/grd_bmi.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 60,
        "height": 60,
        "scales": [1],
        "hash": "fd296840b4956359c50b17a881e450bb",
        "name": "grd_bmr",
        "type": "png"
    });
}, 10217, [10420], "projects/com.yunmai.scales.ios/Resources/grd_bmr.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 60,
        "height": 60,
        "scales": [1],
        "hash": "59aff746e8597b8f7d04b49371d6c8e8",
        "name": "grd_bodyFatIndex",
        "type": "png"
    });
}, 10220, [10420], "projects/com.yunmai.scales.ios/Resources/grd_bodyFatIndex.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 60,
        "height": 60,
        "scales": [1],
        "hash": "3257465a45c0e53c23372601742d8781",
        "name": "grd_bone",
        "type": "png"
    });
}, 10223, [10420], "projects/com.yunmai.scales.ios/Resources/grd_bone.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 60,
        "height": 60,
        "scales": [1],
        "hash": "174bf71dd4bd9b4825dbbcd3c2a95440",
        "name": "grd_fat",
        "type": "png"
    });
}, 10226, [10420], "projects/com.yunmai.scales.ios/Resources/grd_fat.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 60,
        "height": 60,
        "scales": [1],
        "hash": "f337c6ddc9a501d8140a7b75b5e7fb51",
        "name": "grd_fatFreeMass",
        "type": "png"
    });
}, 10229, [10420], "projects/com.yunmai.scales.ios/Resources/grd_fatFreeMass.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 60,
        "height": 60,
        "scales": [1],
        "hash": "a5583b682a75d52157d1fda899b7ad90",
        "name": "grd_fatMass",
        "type": "png"
    });
}, 10232, [10420], "projects/com.yunmai.scales.ios/Resources/grd_fatMass.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 60,
        "height": 60,
        "scales": [1],
        "hash": "5f2cc6683e25d40f85b5c772d37e3cb1",
        "name": "grd_muscle",
        "type": "png"
    });
}, 10235, [10420], "projects/com.yunmai.scales.ios/Resources/grd_muscle.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 60,
        "height": 60,
        "scales": [1],
        "hash": "f629ed0d8d8f656356c7775aeacdee39",
        "name": "grd_normalWeight",
        "type": "png"
    });
}, 10238, [10420], "projects/com.yunmai.scales.ios/Resources/grd_normalWeight.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 60,
        "height": 60,
        "scales": [1],
        "hash": "cd946fea10ff02a5a9012dbf5751b4b7",
        "name": "grd_obesityLevel",
        "type": "png"
    });
}, 10241, [10420], "projects/com.yunmai.scales.ios/Resources/grd_obesityLevel.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 60,
        "height": 60,
        "scales": [1],
        "hash": "b50fd0823fd480396f47e4fc731dae2a",
        "name": "grd_protein",
        "type": "png"
    });
}, 10244, [10420], "projects/com.yunmai.scales.ios/Resources/grd_protein.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 60,
        "height": 60,
        "scales": [1],
        "hash": "4e057e934670dd3ad430b177328a4312",
        "name": "grd_somaAge",
        "type": "png"
    });
}, 10247, [10420], "projects/com.yunmai.scales.ios/Resources/grd_somaAge.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 60,
        "height": 60,
        "scales": [1],
        "hash": "228e47886df2b18759549ec2cb95d8d1",
        "name": "grd_somatotype",
        "type": "png"
    });
}, 10250, [10420], "projects/com.yunmai.scales.ios/Resources/grd_somatotype.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 60,
        "height": 60,
        "scales": [1],
        "hash": "ee3d2123c6a47d52a12b4cd7a43072c9",
        "name": "grd_visFat",
        "type": "png"
    });
}, 10253, [10420], "projects/com.yunmai.scales.ios/Resources/grd_visFat.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 60,
        "height": 60,
        "scales": [1],
        "hash": "d56496fc5ddd50e1e6bc3ddaaf5089c4",
        "name": "grd_water",
        "type": "png"
    });
}, 10256, [10420], "projects/com.yunmai.scales.ios/Resources/grd_water.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 67,
        "height": 67,
        "scales": [1],
        "hash": "184d5bcb5e45da934fae0bd150a985ca",
        "name": "fml_addBtn",
        "type": "png"
    });
}, 10259, [10420], "projects/com.yunmai.scales.ios/Resources/fml_addBtn.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 26,
        "height": 18,
        "scales": [1],
        "hash": "50e5194a38d7093f8d206ecbec942aa1",
        "name": "lst_marked",
        "type": "png"
    });
}, 10262, [10420], "projects/com.yunmai.scales.ios/Resources/lst_marked.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 58,
        "height": 58,
        "scales": [1],
        "hash": "1926ece20f2c349427dddeee9d3eb605",
        "name": "lst_addBtn",
        "type": "png"
    });
}, 10265, [10420], "projects/com.yunmai.scales.ios/Resources/lst_addBtn.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 28,
        "height": 16,
        "scales": [1],
        "hash": "9e9b6c364985ca69b01e631446d9479c",
        "name": "brf_arrowDown",
        "type": "png"
    });
}, 10268, [10420], "projects/com.yunmai.scales.ios/Resources/brf_arrowDown.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 16,
        "height": 28,
        "scales": [1],
        "hash": "5d3cd697e716d7be32ede5ec60a1a23a",
        "name": "brf_arrowLeft",
        "type": "png"
    });
}, 10271, [10420], "projects/com.yunmai.scales.ios/Resources/brf_arrowLeft.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 16,
        "height": 28,
        "scales": [1],
        "hash": "e89afa0c284f10ad2b347d7d1b45ecf6",
        "name": "brf_arrowRight",
        "type": "png"
    });
}, 10274, [10420], "projects/com.yunmai.scales.ios/Resources/brf_arrowRight.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 44,
        "height": 44,
        "scales": [1],
        "hash": "9077f130a50bfc4b3413747d47e3d55f",
        "name": "brf_noData",
        "type": "png"
    });
}, 10277, [10420], "projects/com.yunmai.scales.ios/Resources/brf_noData.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 28,
        "height": 16,
        "scales": [1],
        "hash": "9e49c89918cbc7c72c3e6fc389f10062",
        "name": "brf_arrowUp",
        "type": "png"
    });
}, 10280, [10420], "projects/com.yunmai.scales.ios/Resources/brf_arrowUp.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 48,
        "height": 48,
        "scales": [1],
        "hash": "c0921867f29ab4c16a2d935df0dc0a68",
        "name": "brf_bmi",
        "type": "png"
    });
}, 10283, [10420], "projects/com.yunmai.scales.ios/Resources/brf_bmi.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 48,
        "height": 48,
        "scales": [1],
        "hash": "42a548ac981acaa64b7aa09f9fab50b9",
        "name": "brf_muscle",
        "type": "png"
    });
}, 10286, [10420], "projects/com.yunmai.scales.ios/Resources/brf_muscle.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 48,
        "height": 48,
        "scales": [1],
        "hash": "0a01120788a1bf199fff561e048fd4ca",
        "name": "brf_visFat",
        "type": "png"
    });
}, 10289, [10420], "projects/com.yunmai.scales.ios/Resources/brf_visFat.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 48,
        "height": 48,
        "scales": [1],
        "hash": "eba42c165cf1543330feee95aeae13c3",
        "name": "brf_bmr",
        "type": "png"
    });
}, 10292, [10420], "projects/com.yunmai.scales.ios/Resources/brf_bmr.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 48,
        "height": 48,
        "scales": [1],
        "hash": "1dcfc47c844522b2fc08b8eefe3cdac6",
        "name": "brf_protein",
        "type": "png"
    });
}, 10295, [10420], "projects/com.yunmai.scales.ios/Resources/brf_protein.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 48,
        "height": 48,
        "scales": [1],
        "hash": "f6fdf5a34c97d5fe56a3a598e51a0121",
        "name": "brf_somaAge",
        "type": "png"
    });
}, 10298, [10420], "projects/com.yunmai.scales.ios/Resources/brf_somaAge.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 48,
        "height": 48,
        "scales": [1],
        "hash": "7c4fac2d76ec0ed641bae04db4be0bb2",
        "name": "brf_bone",
        "type": "png"
    });
}, 10301, [10420], "projects/com.yunmai.scales.ios/Resources/brf_bone.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 48,
        "height": 48,
        "scales": [1],
        "hash": "b46c82422ce0dbaa8f8f3f6f9a32961d",
        "name": "brf_water",
        "type": "png"
    });
}, 10304, [10420], "projects/com.yunmai.scales.ios/Resources/brf_water.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 48,
        "height": 48,
        "scales": [1],
        "hash": "94fe6c8373c30e38255bf9bc52d8f58c",
        "name": "brf_fatMass",
        "type": "png"
    });
}, 10307, [10420], "projects/com.yunmai.scales.ios/Resources/brf_fatMass.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 48,
        "height": 48,
        "scales": [1],
        "hash": "4f492dc4a42933da29a1a21ea77646f0",
        "name": "brf_bodyFatIndex",
        "type": "png"
    });
}, 10310, [10420], "projects/com.yunmai.scales.ios/Resources/brf_bodyFatIndex.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 48,
        "height": 48,
        "scales": [1],
        "hash": "e7da001b7feebac67f68dcaf225cc260",
        "name": "brf_obesityLevel",
        "type": "png"
    });
}, 10313, [10420], "projects/com.yunmai.scales.ios/Resources/brf_obesityLevel.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 48,
        "height": 48,
        "scales": [1],
        "hash": "a2a9499b98454a86014ec70eeff4ed06",
        "name": "brf_somatotype",
        "type": "png"
    });
}, 10316, [10420], "projects/com.yunmai.scales.ios/Resources/brf_somatotype.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 48,
        "height": 48,
        "scales": [1],
        "hash": "870333f5565df117c51965fe076ce552",
        "name": "brf_normalWeight",
        "type": "png"
    });
}, 10319, [10420], "projects/com.yunmai.scales.ios/Resources/brf_normalWeight.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 48,
        "height": 48,
        "scales": [1],
        "hash": "6d901ad4e8d99cb8d415e4f65344cc19",
        "name": "brf_fatFreeMass",
        "type": "png"
    });
}, 10322, [10420], "projects/com.yunmai.scales.ios/Resources/brf_fatFreeMass.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 48,
        "height": 48,
        "scales": [1],
        "hash": "d1fe59ba44437905836935b503928a21",
        "name": "brf_noon",
        "type": "png"
    });
}, 10325, [10420], "projects/com.yunmai.scales.ios/Resources/brf_noon.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 48,
        "height": 48,
        "scales": [1],
        "hash": "01795fc8ff9952cef6a388070a689e3a",
        "name": "brf_night",
        "type": "png"
    });
}, 10328, [10420], "projects/com.yunmai.scales.ios/Resources/brf_night.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 48,
        "height": 48,
        "scales": [1],
        "hash": "8423428c8a69a948c82f477d78b3022f",
        "name": "brf_morning",
        "type": "png"
    });
}, 10331, [10420], "projects/com.yunmai.scales.ios/Resources/brf_morning.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 82,
        "height": 52,
        "scales": [1],
        "hash": "d2a7068855effeb1962f0c3c56a5d804",
        "name": "brf_bubble",
        "type": "png"
    });
}, 10334, [10420], "projects/com.yunmai.scales.ios/Resources/brf_bubble.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 642,
        "height": 642,
        "scales": [1],
        "hash": "eae329a9add0c2a1fb8f52e559ae0cda",
        "name": "main_dash",
        "type": "png"
    });
}, 10337, [10420], "projects/com.yunmai.scales.ios/Resources/main_dash.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 87,
        "height": 87,
        "scales": [1],
        "hash": "6cccc1a523df5d602ece799dd627034b",
        "name": "close_white_normal",
        "type": "png"
    });
}, 10340, [10420], "projects/com.yunmai.scales.ios/Resources/close_white_normal.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 180,
        "height": 180,
        "scales": [1],
        "hash": "6f454f989abef5ca3848ce99e284401e",
        "name": "usr_selected_man",
        "type": "png"
    });
}, 10343, [10420], "projects/com.yunmai.scales.ios/Resources/usr_selected_man.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 180,
        "height": 180,
        "scales": [1],
        "hash": "ae99a30a5587d67e9746105dfb26210d",
        "name": "usr_unselected_man",
        "type": "png"
    });
}, 10346, [10420], "projects/com.yunmai.scales.ios/Resources/usr_unselected_man.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 180,
        "height": 180,
        "scales": [1],
        "hash": "43e96a871cda4a686665983571e47d44",
        "name": "usr_selected_woman",
        "type": "png"
    });
}, 10349, [10420], "projects/com.yunmai.scales.ios/Resources/usr_selected_woman.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 180,
        "height": 180,
        "scales": [1],
        "hash": "3dbf41b611ecee8eaa3900f724a3b7d9",
        "name": "upd_new_icon",
        "type": "png"
    });
}, 10352, [10420], "projects/com.yunmai.scales.ios/Resources/upd_new_icon.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 180,
        "height": 180,
        "scales": [1],
        "hash": "c9c1fcb03de0e1684d299001aa149ef6",
        "name": "upd_arrow_icon",
        "type": "png"
    });
}, 10355, [10420], "projects/com.yunmai.scales.ios/Resources/upd_arrow_icon.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 180,
        "height": 180,
        "scales": [1],
        "hash": "0509a5a7b4ff5484d2c488106e937be1",
        "name": "upd_right_icon",
        "type": "png"
    });
}, 10358, [10420], "projects/com.yunmai.scales.ios/Resources/upd_right_icon.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 180,
        "height": 180,
        "scales": [1],
        "hash": "7b943887e6b13fa66113e7e4c18e2604",
        "name": "upd_error_icon",
        "type": "png"
    });
}, 10361, [10420], "projects/com.yunmai.scales.ios/Resources/upd_error_icon.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.BLENotification = undefined;

    var _reactNative = _require(_dependencyMap[0]);

    var _miot = _require(_dependencyMap[1]);

    var _Bluetooth = _require(_dependencyMap[2]);

    var _Global = _require(_dependencyMap[3]);

    var _Global2 = babelHelpers.interopRequireDefault(_Global);

    var _HardwareControl = _require(_dependencyMap[4]);

    var _HardwareControl2 = babelHelpers.interopRequireDefault(_HardwareControl);

    var _YMHexParse = _require(_dependencyMap[5]);

    var _YMHexParse2 = babelHelpers.interopRequireDefault(_YMHexParse);

    var _YMUser = _require(_dependencyMap[6]);

    var _YMUser2 = babelHelpers.interopRequireDefault(_YMUser);

    var _YMDataHold = _require(_dependencyMap[7]);

    var _YMDataHold2 = babelHelpers.interopRequireDefault(_YMDataHold);

    var YM_HEX_BEGIN = '0D';
    var YM_SERVICE_READ = 'FFE0';
    var YM_SERVICE_WRITE = 'FFE5';
    var YM_SERVICE_AD = 'FE95';
    var YM_CHR_READ = 'FFE4';
    var YM_CHR_WRITE = 'FFE9';
    var YM_UPGRADE_CH = 'FFEA';
    var writeDataing = void 0;
    var connecting = void 0;
    var deviceMac = '';
    var deviceUUID = '';
    var BLE = void 0;
    var readService = void 0;
    var writeService = void 0;
    var readChar = void 0;
    var writeChar = void 0;
    var NOTIFICATION_BLE_STATUS = 'NOTIFICATION_BLE_STATUS';
    var NOTIFICATION_BLE_CONNECTED = 'NOTIFICATION_BLE_CONNECTED';
    var NOTIFICATION_DEVICE_USER_CROWDED = 'NOTIFICATION_DEVICE_USER_CROWDED';
    var NOTIFICATION_DEVICE_REALTIME = 'NOTIFICATION_DEVICE_REALTIME';
    var NOTIFICATION_DEVICE_RESULT = 'NOTIFICATION_DEVICE_RESULT';
    var BLENotification = exports.BLENotification = {
        NOTIFICATION_BLE_STATUS: NOTIFICATION_BLE_STATUS,
        NOTIFICATION_BLE_CONNECTED: NOTIFICATION_BLE_CONNECTED,
        NOTIFICATION_DEVICE_USER_CROWDED: NOTIFICATION_DEVICE_USER_CROWDED,
        NOTIFICATION_DEVICE_REALTIME: NOTIFICATION_DEVICE_REALTIME,
        NOTIFICATION_DEVICE_RESULT: NOTIFICATION_DEVICE_RESULT
    };

    var YMBLEControl = function () {
        function YMBLEControl() {
            babelHelpers.classCallCheck(this, YMBLEControl);
        }

        babelHelpers.createClass(YMBLEControl, null, [{
            key: "checkAndConnectScale",
            value: function checkAndConnectScale() {
                var _this = this;

                _Global.Function.normalLog('checkAndConnectScale');

                if (BLE && BLE.isConnected) {
                    return;
                }

                if (connecting) {
                    return;
                }

                var userInfo = babelHelpers.extends({}, _YMUser2.default.getCurrentUserInfo());

                if (_Global.Function.equalNull(userInfo) || _Global.Function.equalNull(userInfo.height) || _Global.Function.equalNull(userInfo.birthday) || _Global.Function.equalNull(userInfo.sex) || userInfo.height == 0 || userInfo.birthday == 19000101) {
                    setTimeout(function (_) {
                        _this.checkAndConnectScale();
                    }, 5000);
                    return;
                }

                connecting = true;

                _miot.Bluetooth.checkBluetoothIsEnabled().then(function (isEnabled) {
                    if (isEnabled) {
                        _Global.Function.normalLog('蓝牙可用');

                        _this.connect();
                    } else {
                        _Global.Function.normalLog('蓝牙不可用');

                        setTimeout(function (_) {
                            _Global.Function.normalLog('setTimeout');

                            _this.checkAndConnectScale();
                        }, 5000);
                        connecting = false;
                    }

                    _reactNative.DeviceEventEmitter.emit(NOTIFICATION_BLE_STATUS, {
                        isEnabled: isEnabled
                    });
                }).catch(function (reason) {
                    _Global.Function.failedLog('获取蓝牙可用性', reason);

                    connecting = false;
                    setTimeout(function (_) {
                        _this.checkAndConnectScale();
                    }, 5000);
                });
            }
        }, {
            key: "connect",
            value: function connect() {
                var _this2 = this;

                BLE = _miot.Device.getBluetoothLE();

                if (BLE.isConnected) {
                    return;
                }

                _Global.Function.normalLog('开始连接');

                writeDataing = false;
                deviceMac = BLE.mac;

                _Global.Function.normalLog('获取设备Mac地址', [deviceMac]);

                this.addListener();
                BLE.connect().then(function (res) {
                    _Global.Function.successLog('BLE.connect()');

                    deviceUUID = res.uuid;
                    _HardwareControl2.default.lastVersion = res.key_version;

                    _Global.Function.normalLog('获取设备UUID', '', [deviceUUID]);

                    connecting = false;
                    _this2.hasConnected = true;

                    _this2.discoverServer();

                    _this2.sendConnectedNotification();
                }).catch(function (reason) {
                    _Global.Function.failedLog('BLE.connect()', "", reason);

                    connecting = false;
                    _this2.hasConnected = false;
                    setTimeout(function (_) {
                        _this2.checkAndConnectScale();
                    }, 5000);
                });
            }
        }, {
            key: "discoverServer",
            value: function discoverServer() {
                BLE.startDiscoverServices(YM_SERVICE_READ, YM_SERVICE_WRITE);
            }
        }, {
            key: "addListener",
            value: function addListener() {
                var _this3 = this;

                _Global.Function.normalLog('添加蓝牙相关监听');

                this.bluetoothStatusChanged = _miot.BluetoothEvent.bluetoothStatusChanged.addListener(function (isEnabled) {
                    _Global.Function.normalLog('蓝牙开关状态变更', [isEnabled]);

                    _reactNative.DeviceEventEmitter.emit(NOTIFICATION_BLE_STATUS, {
                        isEnabled: isEnabled
                    });
                });
                this.bluetoothConnectionStatusChanged = _miot.BluetoothEvent.bluetoothConnectionStatusChanged.addListener(function (bluetooth, isConnected) {
                    _Global.Function.normalLog('蓝牙连接状态变更', [bluetooth, isConnected]);

                    if (!isConnected) { }

                    _reactNative.DeviceEventEmitter.emit(NOTIFICATION_BLE_CONNECTED, {
                        bluetooth: bluetooth,
                        isConnected: isConnected
                    });
                });
                this.bluetoothDeviceDiscovered = _miot.BluetoothEvent.bluetoothDeviceDiscovered.addListener(function (bluetoothData) {
                    _Global.Function.successLog('设备发现');

                    _Global.Function.normalLog('设备发现', [bluetoothData]);
                });
                this.bluetoothDeviceDiscoverFailed = _miot.BluetoothEvent.bluetoothDeviceDiscoverFailed.addListener(function (error) {
                    _Global.Function.failedLog('设备发现', error);
                });
                this.bluetoothSeviceDiscovered = _miot.BluetoothEvent.bluetoothSeviceDiscovered.addListener(function (bluetooth, service) {
                    _Global.Function.successLog('服务发现');

                    _Global.Function.normalLog('服务发现', [bluetooth, service]);

                    service.map(function (server) {
                        var iServer = server;

                        if (!iServer.isDiscovered) {
                            return;
                        }

                        if (_miot.Bluetooth.isSameUUID(iServer.UUID, YM_SERVICE_READ)) {
                            readService = iServer;
                            BLE.getService(YM_SERVICE_READ).startDiscoverCharacteristics(YM_CHR_READ);
                        } else if (_miot.Bluetooth.isSameUUID(iServer.UUID, YM_SERVICE_WRITE)) {
                            writeService = iServer;
                            BLE.getService(YM_SERVICE_WRITE).startDiscoverCharacteristics(YM_CHR_WRITE);
                        }
                    });
                });
                this.bluetoothSeviceDiscoverFailed = _miot.BluetoothEvent.bluetoothSeviceDiscoverFailed.addListener(function (bluetooth, error) {
                    _Global.Function.failedLog('服务发现', error);
                });
                this.bluetoothCharacteristicDiscovered = _miot.BluetoothEvent.bluetoothCharacteristicDiscovered.addListener(function (bluetooth, service, character) {
                    _Global.Function.successLog('特征发现');

                    _Global.Function.normalLog('特征发现', [bluetooth, service, character]);

                    character.map(function (char) {
                        var iChar = char;

                        if (!iChar.isDiscovered) {
                            return;
                        }

                        if (_miot.Bluetooth.isSameUUID(iChar.UUID, YM_CHR_READ)) {
                            readChar = iChar;
                            readChar.setNotify(true);
                        } else if (_miot.Bluetooth.isSameUUID(iChar.UUID, YM_CHR_WRITE)) {
                            writeChar = iChar;

                            _this3.writeConfigData();
                        }
                    });
                });
                this.bluetoothCharacteristicDiscoverFailed = _miot.BluetoothEvent.bluetoothCharacteristicDiscoverFailed.addListener(function (bluetooth, service, error) {
                    _Global.Function.failedLog('特征发现', error);
                });
            }
        }, {
            key: "removeListener",
            value: function removeListener() {
                _Global.Function.normalLog('移除蓝牙相关监听');

                if (this.bluetoothStatusChanged) {
                    this.bluetoothStatusChanged.remove();
                }

                if (this.bluetoothConnectionStatusChanged) {
                    this.bluetoothConnectionStatusChanged.remove();
                }

                if (this.bluetoothDeviceDiscovered) {
                    this.bluetoothDeviceDiscovered.remove();
                }

                if (this.bluetoothDeviceDiscoverFailed) {
                    this.bluetoothDeviceDiscoverFailed.remove();
                }

                if (this.bluetoothSeviceDiscovered) {
                    this.bluetoothSeviceDiscovered.remove();
                }

                if (this.bluetoothSeviceDiscoverFailed) {
                    this.bluetoothSeviceDiscoverFailed.remove();
                }

                if (this.bluetoothCharacteristicDiscovered) {
                    this.bluetoothCharacteristicDiscovered.remove();
                }

                if (this.bluetoothCharacteristicDiscoverFailed) {
                    this.bluetoothCharacteristicDiscoverFailed.remove();
                }

                if (this.bluetoothCharacteristicValueChanged) {
                    this.bluetoothCharacteristicValueChanged.remove();
                }

                this.hasConnected = false;
            }
        }]);
        return YMBLEControl;
    }();

    YMBLEControl.devicePeripheral = null;
    YMBLEControl.devicMmac = '';
    YMBLEControl.deviceModel = '';
    YMBLEControl.deviceName = '';
    YMBLEControl.deviceVersion = '0';
    YMBLEControl.writeChara = null;
    YMBLEControl.connectedNotify = 'sendConnectedNotification';
    YMBLEControl.hasConnected = false;
    YMBLEControl.hasStopConnected = false;

    YMBLEControl.writeConfigData = function () {
        if (writeDataing) return;
        writeDataing = true;
        setTimeout(function () {
            var configData = _YMHexParse2.default.scaleConfig();

            YMBLEControl.writeValue(configData);
        }, 200);
        setTimeout(function () {
            _YMDataHold2.default.getUserList(function () {
                var userInfo = babelHelpers.extends({}, _YMUser2.default.getCurrentUserInfo());

                if (userInfo.height) {
                    var userData = _YMHexParse2.default.setUserToScale(3, userInfo);

                    YMBLEControl.writeValue(userData);
                }
            });
        }, 600);
    };

    YMBLEControl.writeValue = function (data) {
        if (_Global.Function.equalNull(data)) {
            _Global.Function.failedLog('指令为空 写入单条数据', data);

            return;
        }

        if (!BLE.isConnected) {
            _Global.Function.failedLog('设备未连接 写入单条数据');

            return;
        }

        if (writeChar) {
            writeChar.write(data).then(function (success) {
                return _Global.Function.normalLog('写入单条数据', [data, success]);
            }).catch(function (reason) {
                return _Global.Function.failedLog('写入单条数据', reason);
            });
        }
    };

    YMBLEControl.sendConnectedNotification = function () {
        _reactNative.DeviceEventEmitter.emit(YMBLEControl.connectedNotify);
    };

    YMBLEControl.disconnectScale = function () {
        YMBLEControl.hasStopConnected = true;

        if (BLE) {
            BLE.disconnect(0);
        }
    };

    YMBLEControl.normalLog = function (message, objs) { };

    YMBLEControl.successLog = function (message) { };

    YMBLEControl.failedLog = function (message, err) { };

    exports.default = YMBLEControl;
}, 10364, [10033, 10074, 10026, 10010, 10367, 10370, 10019, 10007], "projects/com.yunmai.scales.ios/Main/Tools/YMBLEControl.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _NativeModules = _require(_dependencyMap[0]);

    var _YMHexParse = _require(_dependencyMap[1]);

    var _YMHexParse2 = babelHelpers.interopRequireDefault(_YMHexParse);

    var YM_UPGRADE_SERVICE = 'FFE5';
    var YM_UPGRADE_CH = 'FFEA';
    var YM_WRITE_CH = 'FFE9';
    var YMUPGRADE_SYSINFO = '80';
    var YMUPGRADE_BEGIN = '82';
    var YMUPGRADE_END = '85';
    var YMUPGRADE_ERROR = '87';
    var YMUPGRADE_CHECK = '88';

    var HardwareControl = function HardwareControl() {
        babelHelpers.classCallCheck(this, HardwareControl);
    };

    HardwareControl.YM_UPGRADE_PERCENT_NOTIFY = 'YM_UPGRADE_PERCENT_NOTIFICATION';
    HardwareControl.YM_UPGRADE_STATE_NOTIFY = 'YM_UPGRADE_STATE_NOTIFICATION';
    HardwareControl.upgradeChara = null;
    HardwareControl.writeChara = null;
    HardwareControl.checksum = 0;
    HardwareControl.scaleSysInfo = '';
    HardwareControl.dataArr = null;
    HardwareControl.lostNum = 0;
    HardwareControl.dataBreak = false;
    HardwareControl.upgrading = false;
    HardwareControl.checking = false;
    HardwareControl.dataSending = false;
    HardwareControl.sucessed = false;
    HardwareControl.lastVersion = '0';

    HardwareControl.AnalysisScaleSysInfo = function (data) {
        var upgradeInfo = data.substr(4, 22);
        var firmwareVer = data.substr(2, 2);
        var proModel = data.substr(8, 10);
        var deviceVer = data.substr(20, 2);
    };

    HardwareControl.AnalysisUpgradeData = function (data) {
        var dataType = parseInt(data.substr(6, 2), 16);

        if (dataType == parseInt(YMUPGRADE_SYSINFO, 16)) {
            var sysInfo = data.substr(8, 20);

            if (sysInfo) {
                HardwareControl.scaleSysInfo = sysInfo;
                HardwareControl.beginUpgrade();
            }
        } else if (dataType == parseInt(YMUPGRADE_BEGIN, 16)) {
            var state = data.substr(8, 2);

            if (state == '01') { } else if (state == '02') {
                HardwareControl.writeFirmwareData(0);
            } else {
                _NativeModules.MHPluginSDK.sendEvent(HardwareControl.YM_UPGRADE_STATE_NOTIFY, {
                    state: 2
                });
            }
        } else if (dataType == parseInt(YMUPGRADE_END, 16)) {
            var _state = data.substr(8, 2);

            if (_state == '01') {
                if (HardwareControl.checking) {
                    return;
                }

                HardwareControl.checking = true;
            } else if (_state == '02') {
                HardwareControl.sucessed = true;

                _NativeModules.MHPluginSDK.sendEvent(HardwareControl.YM_UPGRADE_STATE_NOTIFY, {
                    state: 1
                });
            } else {
                HardwareControl.dataBreak = true;

                _NativeModules.MHPluginSDK.sendEvent(HardwareControl.YM_UPGRADE_STATE_NOTIFY, {
                    state: 2
                });
            }
        } else if (dataType == parseInt(YMUPGRADE_ERROR, 16)) {
            if (data.length > 36) {
                var stateStr = data.substr(28, 2);

                if (stateStr == '03') {
                    var str = data.substr(32, 4);
                    var strNum = parseInt(str, 16);
                    HardwareControl.mendData(strNum);
                } else if (stateStr.toUpperCase() == 'FF') {
                    _NativeModules.MHPluginSDK.sendEvent(HardwareControl.YM_UPGRADE_STATE_NOTIFY, {
                        state: 2
                    });
                }
            }
        } else if (dataType == parseInt(YMUPGRADE_CHECK, 16)) { }
    };

    HardwareControl.getScaleSysInfo = function () {
        HardwareControl.checking = false;
        HardwareControl.dataSending = false;
        setTimeout(function () {
            if (!HardwareControl.dataSending) {
                _NativeModules.MHPluginSDK.sendEvent(HardwareControl.YM_UPGRADE_STATE_NOTIFY, {
                    state: 2
                });
            }
        }, 3000);

        var data = _YMHexParse2.default.getScaleSysInfo();

        HardwareControl.writeDataToScale(data);
    };

    HardwareControl.beginUpgrade = function () {
        if (HardwareControl.dataArr) {
            var arr = HardwareControl.dataArr;

            var data = _YMHexParse2.default.beginUpgrade(HardwareControl.scaleSysInfo, arr.length);

            HardwareControl.writeDataToScale(data);
        }
    };

    HardwareControl.finishedUpgrade = function () {
        var data = _YMHexParse2.default.finishedUpgrade(HardwareControl.scaleSysInfo, HardwareControl.checksum);

        HardwareControl.writeDataToScale(data);
    };

    HardwareControl.writeFirmwareData = function (i) {
        if (HardwareControl.dataArr) {
            if (HardwareControl.dataArr.length > 0) {
                var arr = HardwareControl.dataArr;

                if (!i) {
                    i = 0;
                }

                HardwareControl.dataBreak = false;
                HardwareControl.writeOneFirmwareData(arr, i);
            }
        }
    };

    HardwareControl.writeOneFirmwareData = function (arr, i) {
        if (arr.length <= i || HardwareControl.dataBreak) {
            setTimeout(function () {
                HardwareControl.finishedUpgrade();
            }, 1000);
            return;
        } else {
            if (i % 10 == 0) {
                var percent = Math.round(i / arr.length * 100);

                _NativeModules.MHPluginSDK.sendEvent(HardwareControl.YM_UPGRADE_PERCENT_NOTIFY, {
                    percent: percent
                });
            }

            HardwareControl.dataSending = true;
            HardwareControl.writeFirmwareDataToScale(arr[i]);
            i++;
            setTimeout(function () {
                HardwareControl.writeOneFirmwareData(arr, i);
            }, 8);
        }
    };

    HardwareControl.mendData = function (i) {
        var arr = HardwareControl.dataArr;

        if (!arr) {
            return;
        }

        if (i < arr.length) {
            setTimeout(function () {
                HardwareControl.writeFirmwareDataToScale(arr[i]);
            }, 30);
        }
    };

    HardwareControl.writeDataToScale = function (data) {
        if (!data) {
            return;
        }

        _NativeModules.MHBluetooth.writeHexDataWithCallback(data, YM_WRITE_CH, YM_UPGRADE_SERVICE, 0, function (sucess, info) { });
    };

    HardwareControl.writeFirmwareDataToScale = function (data) {
        if (!data) {
            return;
        }

        _NativeModules.MHBluetooth.writeHexDataWithCallback(data, YM_UPGRADE_CH, YM_UPGRADE_SERVICE, 1, function (sucess, info) { });
    };

    exports.default = HardwareControl;
}, 10367, [10042, 10370], "projects/com.yunmai.scales.ios/Main/YMUpgrade/HardwareControl.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _Global = _require(_dependencyMap[0]);

    var _YMHexTools = _require(_dependencyMap[1]);

    var _YMHexTools2 = babelHelpers.interopRequireDefault(_YMHexTools);

    var YMHexParse = function YMHexParse() {
        babelHelpers.classCallCheck(this, YMHexParse);
    };

    YMHexParse.scaleConfig = function () {
        var time = parseInt(new Date().getTime() * 0.001);
        var flagWeight = 20;
        var hexStr = '0911';
        var timeHex = time.toString(16);
        var weightHex = flagWeight.toString(16);
        var flagStr = hexStr + timeHex + weightHex;

        var checkSumStr = _YMHexTools2.default._checkSum(flagStr);

        hexStr = '0D' + flagStr + checkSumStr;
        return hexStr;
    };

    YMHexParse.dataHasGeted = function () {
        var hexStr = '0414';

        var checkSumStr = _YMHexTools2.default._checkSum(hexStr);

        hexStr = '0D' + hexStr + checkSumStr;
        return hexStr;
    };

    YMHexParse.getUsersInScale = function () {
        var hexStr = '0412';

        var checkSumStr = _YMHexTools2.default._checkSum(hexStr);

        hexStr = '0D' + hexStr + checkSumStr;
        return hexStr;
    };

    YMHexParse.resetScale = function () {
        var hexStr = '0415';

        var checkSumStr = _YMHexTools2.default._checkSum(hexStr);

        hexStr = '0D' + hexStr + checkSumStr;
        return hexStr;
    };

    YMHexParse.setUserToScale = function (type, userInfo) {
        if (_Global.Function.equalNull(userInfo) || _Global.Function.equalNull(userInfo.shortId)) {
            return;
        }

        var flagType = '03';

        if (type > 0) {
            flagType = '0' + type.toString();
        }

        var unit = '01';

        if (userInfo.unit == 2) {
            unit = '02';
        } else if (userInfo.unit == 3) {
            unit = '03';
        }

        var userIdStr = parseInt(userInfo.shortId).toString(16);

        while (userIdStr.length < 8) {
            userIdStr = '0' + userIdStr;
        }

        if (!userInfo.basisWeight) {
            userInfo.basisWeight = 0;
        }

        userInfo.sex = parseInt(userInfo.sex);
        userInfo.height = parseInt(userInfo.height);
        userInfo.age = parseInt(userInfo.age);

        var basisWeightStr = _YMHexTools2.default._toHexStr(parseInt(userInfo.basisWeight * 100));

        while (basisWeightStr.length < 4) {
            basisWeightStr = '0' + basisWeightStr;
        }

        var hexStr = '1210' + flagType + userIdStr + _YMHexTools2.default._toHexStr(userInfo.height) + _YMHexTools2.default._toHexStr(userInfo.sex) + _YMHexTools2.default._toHexStr(userInfo.age) + '0000' + basisWeightStr + unit + '00';

        var checkSumStr = _YMHexTools2.default._checkSum(hexStr);

        hexStr = '0D' + hexStr + checkSumStr;
        return hexStr;
    };

    YMHexParse.getScaleSysInfo = function () {
        var hexStr = '0490';

        var checkSumStr = _YMHexTools2.default._checkSum(hexStr);

        hexStr = '0D' + hexStr + checkSumStr;
        return hexStr;
    };

    YMHexParse.beginUpgrade = function (msg, length) {
        var hexStr = '1192' + msg + '01';

        var lengthStr = _YMHexTools2.default._toHexStr(length);

        while (lengthStr.length < 4) {
            lengthStr = '0' + lengthStr;
        }

        hexStr = hexStr + lengthStr;

        var checkSumStr = _YMHexTools2.default._checkSum(hexStr);

        hexStr = '0D' + hexStr + checkSumStr;
        return hexStr.toUpperCase();
    };

    YMHexParse.finishedUpgrade = function (msg, checkSum) {
        var hexStr = '1095' + msg;
        var allCheckSumStr = checkSum;

        while (allCheckSumStr.length < 4) {
            allCheckSumStr = '0' + allCheckSumStr;
        }

        hexStr = hexStr + allCheckSumStr;

        var checkSumStr = _YMHexTools2.default._checkSum(hexStr);

        hexStr = '0D' + hexStr + checkSumStr;
        return hexStr.toUpperCase();
    };

    exports.default = YMHexParse;
}, 10370, [10010, 10373], "projects/com.yunmai.scales.ios/Main/Tools/YMHexParse.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var YMHexTools = function YMHexTools() {
        babelHelpers.classCallCheck(this, YMHexTools);
    };

    YMHexTools._hexStrToByteArr = function (hexStr) {
        var byteArr = new Array();

        if (!hexStr || !hexStr.length || hexStr.length % 2 !== 0) {
            return byteArr;
        }

        hexStr = hexStr.toLocaleUpperCase();
        var hexs = '0123456789ABCDEF';

        for (var i = 0; i < hexStr.length / 2; i++) {
            var bytePR = hexStr[2 * i];
            var byteSF = hexStr[2 * i + 1];

            if (bytePR.indexOf(hexs) && byteSF.indexOf(hexs)) {
                byteArr.push(parseInt(bytePR + byteSF, 16));
            }
        }

        return byteArr;
    };

    YMHexTools._byteArrToHexStr = function (byteArr) {
        var hexStr = '';

        if (!byteArr || byteArr.length <= 0) {
            return hexStr;
        }

        for (var i = 0; i < byteArr.length; i++) {
            var hexNum = byteArr[i];

            if (hexNum >= 0 && hexNum <= 255) {
                var hexByteStr = hexNum.toString(16).toUpperCase();

                if (hexByteStr.length % 2 == 1) {
                    hexByteStr = '0' + hexByteStr;
                }

                hexStr = hexStr + hexByteStr;
            }
        }

        return hexStr;
    };

    YMHexTools._toHexStr = function (num) {
        var hexNumStr = '';

        if (num < 0) {
            hexNumStr = (num >>> 0).toString(16).toUpperCase();
        } else {
            hexNumStr = num.toString(16).toUpperCase();
        }

        if (hexNumStr.length % 2 == 1) {
            return '0' + hexNumStr;
        }

        return hexNumStr;
    };

    YMHexTools._checkSum = function (dataStr) {
        var sum = 0;
        var i = 0;

        for (var i = 0; i < dataStr.length; i = i + 2) {
            var hexStr = dataStr[i] + dataStr[i + 1];
            sum = sum ^ parseInt(hexStr, 16);
        }

        var str = sum.toString(16);

        if (str.length < 2) {
            str = '0' + str;
        }

        return str;
    };

    YMHexTools.YMCheckSum = function (dataArr) {
        var checkSumCon = 0;

        for (var i = 0; i < 7; i++) {
            checkSumCon = checkSumCon >> 8 | checkSumCon << 8;
            checkSumCon ^= parseInt(dataArr[i], 16);
            checkSumCon ^= (checkSumCon & parseInt('ff', 16)) >> 4;
            checkSumCon ^= checkSumCon << 12;
            checkSumCon ^= (checkSumCon & parseInt('ff', 16)) << 5;
        }

        return checkSumCon;
    };

    exports.default = YMHexTools;
}, 10373, [], "projects/com.yunmai.scales.ios/Main/Tools/YMHexTools.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var _ui = _require(_dependencyMap[2]);

    var _Global = _require(_dependencyMap[3]);

    var _Global2 = babelHelpers.interopRequireDefault(_Global);

    var _Localized = _require(_dependencyMap[4]);

    var _NewNavBar = _require(_dependencyMap[5]);

    var _NewNavBar2 = babelHelpers.interopRequireDefault(_NewNavBar);

    var _HeaderView = _require(_dependencyMap[6]);

    var _HeaderView2 = babelHelpers.interopRequireDefault(_HeaderView);

    var _GridView = _require(_dependencyMap[7]);

    var _GridView2 = babelHelpers.interopRequireDefault(_GridView);

    var _Menu = _require(_dependencyMap[8]);

    var _Menu2 = babelHelpers.interopRequireDefault(_Menu);

    var _UserList = _require(_dependencyMap[9]);

    var _UserList2 = babelHelpers.interopRequireDefault(_UserList);

    var _BriefingCurve = _require(_dependencyMap[10]);

    var _BriefingCurve2 = babelHelpers.interopRequireDefault(_BriefingCurve);

    var _UserRequiredMainView = _require(_dependencyMap[11]);

    var _UserRequiredMainView2 = babelHelpers.interopRequireDefault(_UserRequiredMainView);

    var _YMHexParse = _require(_dependencyMap[12]);

    var _YMHexParse2 = babelHelpers.interopRequireDefault(_YMHexParse);

    var _YMHandleScaleData = _require(_dependencyMap[13]);

    var _YMHandleScaleData2 = babelHelpers.interopRequireDefault(_YMHandleScaleData);

    var _YMBLEControl = _require(_dependencyMap[14]);

    var _YMBLEControl2 = babelHelpers.interopRequireDefault(_YMBLEControl);

    var _SQLite = _require(_dependencyMap[15]);

    var _SQLite2 = babelHelpers.interopRequireDefault(_SQLite);

    var _YMDataHold = _require(_dependencyMap[16]);

    var _YMDataHold2 = babelHelpers.interopRequireDefault(_YMDataHold);

    var _YMUser = _require(_dependencyMap[17]);

    var _YMUser2 = babelHelpers.interopRequireDefault(_YMUser);

    var _base = _require(_dependencyMap[18]);

    var _base2 = babelHelpers.interopRequireDefault(_base);

    var _miot = _require(_dependencyMap[19]);

    var _HardwareControl = _require(_dependencyMap[20]);

    var _HardwareControl2 = babelHelpers.interopRequireDefault(_HardwareControl);

    var YM_HEX_BEGIN = '0D';
    var YM_SERVICE_READ = 'FFE0';
    var YM_SERVICE_WRITE = 'FFE5';
    var YM_CHR_READ = 'FFE4';
    var isShowDiaolg = false;

    var Home = function (_Component) {
        babelHelpers.inherits(Home, _Component);

        function Home(props) {
            babelHelpers.classCallCheck(this, Home);

            var _this = babelHelpers.possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this, props));

            _this.componentWillMount = function () {
                _this._checkAuthorization().then(function () {
                    console.log("蓝牙监听");

                    _miot.Bluetooth.checkBluetoothIsEnabled().then(function (isEnabled) {
                        console.log("蓝牙监听 状态 ", isEnabled);

                        if (isEnabled) {
                            _this.setState({
                                subtitle: _Localized.Localized.Home_Subtitle_Disconnect
                            });

                            _this.props.navigation.setParams({
                                subtitle: _Localized.Localized.Home_Subtitle_Disconnect
                            });
                        } else {
                            _this.setState({
                                subtitle: _Localized.Localized.Home_Subtitle_BTBeenOff
                            });

                            _this.props.navigation.setParams({
                                subtitle: _Localized.Localized.Home_Subtitle_BTBeenOff
                            });
                        }
                    }).catch(function (reason) { });

                    _this._centralManagerDidUpdateState = _miot.BluetoothEvent.bluetoothStatusChanged.addListener(function (isEnabled) {
                        if (isEnabled) {
                            _this.setState({
                                subtitle: _Localized.Localized.Home_Subtitle_Disconnect
                            });

                            _this.props.navigation.setParams({
                                subtitle: _Localized.Localized.Home_Subtitle_Disconnect
                            });
                        } else {
                            _this.setState({
                                subtitle: _Localized.Localized.Home_Subtitle_BTBeenOff
                            });

                            _this.props.navigation.setParams({
                                subtitle: _Localized.Localized.Home_Subtitle_BTBeenOff
                            });

                            _this.resetYMBleState();
                        }
                    });
                    _this.bluetoothConnectionStatusChangedListener = _reactNative.DeviceEventEmitter.addListener(_YMBLEControl.BLENotification.NOTIFICATION_BLE_CONNECTED, function (_ref) {
                        var _ = _ref._,
                            isConnected = _ref.isConnected;

                        if (isConnected) {
                            _this.setState({
                                subtitle: _Localized.Localized.Home_Subtitle_Connect
                            });

                            _this.props.navigation.setParams({
                                subtitle: _Localized.Localized.Home_Subtitle_Connect
                            });
                        } else {
                            _this.setState({
                                subtitle: _Localized.Localized.Home_Subtitle_Disconnect
                            });

                            _this.props.navigation.setParams({
                                subtitle: _Localized.Localized.Home_Subtitle_Disconnect
                            });
                        }
                    });
                    _this._didConnectPeripheralListener = _reactNative.DeviceEventEmitter.addListener('sendConnectedNotification', function () {
                        _this.setState({
                            subtitle: _Localized.Localized.Home_Subtitle_Connect
                        });

                        _this.props.navigation.setParams({
                            subtitle: _Localized.Localized.Home_Subtitle_Connect
                        });

                        _this._didDisconnectPeripheralListener = _miot.BluetoothEvent.bluetoothConnectionStatusChanged.addListener(function (bluetooh, isConnected) {
                            if (!isConnected) {
                                _this.resetYMBleState();

                                _this.setState({
                                    subtitle: _Localized.Localized.Home_Subtitle_Disconnect
                                });

                                _this.props.navigation.setParams({
                                    subtitle: _Localized.Localized.Home_Subtitle_Disconnect
                                });
                            }
                        });
                        _this._didDiscoverServices = _miot.BluetoothEvent.bluetoothSeviceDiscovered.addListener(function (bluetooh, service) {
                            service.map(function (server) {
                                var iServer = server;

                                if (!iServer.isDiscovered) {
                                    return;
                                }
                            });
                        });
                        _this.bluetoothCharacteristicDiscovered = _miot.BluetoothEvent.bluetoothCharacteristicDiscovered.addListener(function (bluetooth, service, character) { });
                        _this.bluetoothCharacteristicValueChanged = _miot.BluetoothEvent.bluetoothCharacteristicValueChanged.addListener(function (bluetooth, service, character, value) {
                            _Global.Function.normalLog('特征值变化', [bluetooth, service, character, value]);

                            var iChar = character;

                            if (_miot.Bluetooth.isSameUUID(iChar.UUID, YM_CHR_READ)) {
                                var msgData = value;

                                if (!msgData) {
                                    return;
                                }

                                var msgArr = msgData;

                                if (!msgArr || !(msgArr.length > 0)) {
                                    return;
                                }

                                msgData = msgData.toUpperCase();

                                if (msgData.indexOf(YM_HEX_BEGIN) != 0) {
                                    return;
                                }

                                if (msgData.length === 12 && msgData[6] === '0' && msgData[7] === '4') {
                                    _this.clearDeviceUserList();
                                }

                                var dataLength = parseInt(msgData.substr(4, 2), 16);

                                _Global.Function.normalLog('特征值变化111 dataLength  ' + dataLength);

                                if (dataLength != msgData.length / 2) {
                                    return;
                                }

                                var dataType = parseInt(msgData.substr(6, 2), 16);

                                if (dataType == 1) {
                                    if (_this.refreshFlag) {
                                        _this.myDelay = setTimeout(function () {
                                            if (_this.headerView) {
                                                _this.headerView.refreshData(_this.state.weightInfo);
                                            }

                                            _this.refreshFlag = true;
                                        }, 6000);
                                        _this.refreshFlag = false;
                                    } else {
                                        clearInterval(_this.myDelay);
                                        _this.myDelay = setTimeout(function () {
                                            if (_this.headerView) {
                                                _this.headerView.refreshData(_this.state.weightInfo);
                                            }

                                            _this.refreshFlag = true;
                                        }, 6000);
                                    }

                                    var nowWeight = parseInt(msgData.substr(16, 4), 16) / 100;

                                    if (_this.headerView) {
                                        _this.headerView.refreshData({
                                            createTime: 0,
                                            weight: nowWeight,
                                            bmi: 0,
                                            fat: 0,
                                            muscle: 0,
                                            water: 0,
                                            protein: 0,
                                            visFat: 0,
                                            bone: 0,
                                            bmr: 0,
                                            somaAge: 0,
                                            weighType: 'Weighting'
                                        });
                                    }
                                }

                                if (dataType == 2 && msgData.length >= 36) {
                                    _YMHandleScaleData2.default.currentMac = _YMBLEControl2.default.deviceMac;

                                    if (msgData == _this.lastWeightStr) {
                                        return;
                                    }

                                    _this.lastWeightStr = msgData;

                                    var lastWeightData = _YMHandleScaleData2.default.getWeightInfoWithData(msgData);

                                    clearInterval(_this.myDelay);

                                    _this.setState({
                                        weightInfo: _Global.Function.reorganizeWeightData(lastWeightData, 'Weighted')
                                    });

                                    if (!_this.state.isVisitorMode) {
                                        _YMDataHold2.default.uploadWeightData(lastWeightData, function (completed) {
                                            _this.sqlite.saveSingleWeightInfo(babelHelpers.extends({}, lastWeightData, {
                                                isUploaded: completed ? 1 : 0
                                            }));
                                        });
                                    }
                                }

                                if (dataType == parseInt('80', 16) || dataType == parseInt('82', 16) || dataType == parseInt('85', 16) || dataType == parseInt('87', 16) || dataType == parseInt('88', 16)) {
                                    _HardwareControl2.default.AnalysisUpgradeData(msgData);
                                }
                            }
                        });
                    });
                    _this._writUserInfoToSacleListener = _reactNative.DeviceEventEmitter.addListener('writUserInfoToSacle', function () {
                        _this._writeUserDataToScale(_YMUser2.default.getCurrentUserInfo());
                    });
                    _this._changeToVisitorModeListener = _reactNative.DeviceEventEmitter.addListener('changeToVisitorMode', function () {
                        _this.setState({
                            weightInfo: {
                                createTime: 0,
                                weight: null,
                                bmi: null,
                                fat: null,
                                muscle: null,
                                water: null,
                                protein: null,
                                visFat: null,
                                bone: null,
                                bmr: null,
                                somaAge: null,
                                weighType: 'Null'
                            },
                            isVisitorMode: true
                        });

                        _this.props.navigation.setParams({
                            isVisitorMode: true
                        });
                    });
                    _this._addNewUserListener = _reactNative.DeviceEventEmitter.addListener('addNewUser', function () {
                        _this.getLastWeightData();
                    });
                    _this.onNewMainUserEvent = _reactNative.DeviceEventEmitter.addListener('onNewMainUser', function () {
                        _this.getLastWeightData();
                    });
                    _this.deletcUserEvent = _reactNative.DeviceEventEmitter.addListener('deletcUser', function () {
                        _this.getLastWeightData();
                    });
                    _this.changeUnitEvent = _reactNative.DeviceEventEmitter.addListener('changeUnit', function () {
                        _this.getLastWeightData();
                    });
                    _this.onDeleteWeightEvent = _reactNative.DeviceEventEmitter.addListener('onDeleteWeightEvent', function (e) {
                        if (e.isFirstData) {
                            _this.getLastWeightData();
                        }
                    });
                    _this._deviceNameChangedListener = _miot.DeviceEvent.deviceNameChanged.addListener(function (event) {
                        _this.setState({
                            title: event.name
                        });

                        _this.props.navigation.setParams({
                            title: event.name
                        });
                    });
                }).catch(function (e) {
                    console.log('componentWillMount catch ', "catch");
                });

                _miot.PackageEvent.packageAuthorizationCancel.addListener(function () {
                    console.log("packageAuthorizationCancel");
                    var licenseKey = "license-" + _miot.Device.deviceID;

                    _miot.Host.storage.set(licenseKey, false);

                    _miot.Service.smarthome.batchSetDeviceDatas([{
                        did: _miot.Device.deviceID,
                        props: {
                            "prop.s_auth_config": null
                        }
                    }]);

                    _miot.Package.exit();
                });
            };

            _this._onClickVisitor = function () {
                _YMUser2.default.setCurrentUserInfo(0);

                _this.setState({
                    messageMsg: _Localized.Localized.Home_Interaction_ExitedVisitorMode,
                    messageVisible: true
                });

                _this.getLastWeightData();

                _this._writeUserDataToScale(_YMUser2.default.getMainUserInfo());
            };

            _this._onClickopenMenu = function () {
                _this.menu.openMenu();
            };

            _this._setIsVisitorMode = function (isVisitorMode) {
                _this.setState({
                    isVisitorMode: isVisitorMode
                });
            };

            _this.clearDeviceUserList = function () {
                _YMBLEControl2.default.writeValue(_YMHexParse2.default.resetScale());

                _this._writeUserDataToScale(_YMUser2.default.getCurrentUserInfo());
            };

            _this._writeUserDataToScale = function (userInfo) {
                var userData = _YMHexParse2.default.setUserToScale(3, userInfo);

                if (_YMBLEControl2.default.hasConnected) {
                    _YMBLEControl2.default.writeValue(userData);
                }
            };

            _this.getLastWeightData = function () {
                _this.sqlite.getLastWeightInfoByUid(_YMUser2.default.getCurrentUserInfo().shortId, function (lastData) {
                    _Global.Function.normalLog("getLastWeightData lastData " + lastData);

                    if (_Global.Function.equalNull(lastData)) {
                        _this.setState({
                            weightInfo: {
                                createTime: 0,
                                weight: null,
                                bmi: null,
                                fat: null,
                                muscle: null,
                                water: null,
                                protein: null,
                                visFat: null,
                                bone: null,
                                bmr: null,
                                somaAge: null,
                                weighType: 'Null'
                            }
                        });
                    } else {
                        _this.setState({
                            weightInfo: _Global.Function.reorganizeWeightData(lastData, 'History')
                        });
                    }
                });
            };

            _this.resetYMBleState = function () {
                _YMBLEControl2.default.hasConnected = false;
                _HardwareControl2.default.upgradeChara = null;
                _HardwareControl2.default.writeChara = null;

                if (_this._didDisconnectPeripheralListener) {
                    _this._didDisconnectPeripheralListener.remove();
                }

                if (_this._didDiscoverServices) {
                    _this._didDiscoverServices.remove();
                }

                if (_this._didDiscoverCharactisics) {
                    _this._didDiscoverCharactisics.remove();
                }

                if (_this._didUpdateValueForCharacteristicListener) {
                    _this._didUpdateValueForCharacteristicListener.remove();
                }

                if (_this._didUpdateValueForCharacteristicListener) {
                    _this._didUpdateValueForCharacteristicListener.remove();
                }

                _YMBLEControl2.default.checkAndConnectScale();

                _YMBLEControl2.default.removeListener();
            };

            _this.props.navigation.setParams({
                setIsVisitorMode: _this._setIsVisitorMode
            });

            _this.refreshFlag = true;
            _this.sqlite = new _SQLite2.default();
            _this.state = {
                weightInfo: {
                    weight: null,
                    bmi: null,
                    fat: null,
                    muscle: null,
                    water: null,
                    protein: null,
                    visFat: null,
                    bone: null,
                    bmr: null,
                    somaAge: null,
                    createTime: 0,
                    weighType: 'Null'
                },
                userInfoSelectView: _react2.default.createElement(_reactNative.View, null),
                isVisitorMode: false,
                title: _miot.Device.name,
                subtitle: _Localized.Localized.Home_Subtitle_Disconnect,
                loadingTitle: '',
                loadingMsg: '',
                loadingVisible: false,
                messageTitle: '',
                messageMsg: '',
                messageVisible: false
            };
            return _this;
        }

        babelHelpers.createClass(Home, [{
            key: "render",
            value: function render() {
                var _this2 = this;

                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: mainStyles.container
                    },
                    _react2.default.createElement(
                        _reactNative.ScrollView,
                        {
                            style: {
                                backgroundColor: 'rgb(26, 182, 181)'
                            },
                            showsVerticalScrollIndicator: false
                        },
                        _react2.default.createElement(_HeaderView2.default, {
                            ref: function ref(_ref2) {
                                _this2.headerView = _ref2;
                            },
                            style: mainStyles.headerView,
                            data: this.state.weightInfo
                        }),
                        _react2.default.createElement(_GridView2.default, {
                            style: mainStyles.gridView,
                            navigation: this.props.navigation,
                            data: this.state.weightInfo
                        })
                    ),
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: {
                                position: 'absolute',
                                flexDirection: 'row',
                                alignItems: 'center',
                                left: 0,
                                top: 106,
                                width: 59,
                                height: 36,
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                borderTopRightRadius: 18,
                                borderBottomRightRadius: 18,
                                opacity: this.state.isVisitorMode ? 0 : 1
                            }
                        },
                        _react2.default.createElement(
                            _reactNative.TouchableHighlight,
                            {
                                style: {
                                    width: 50,
                                    height: 30,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                },
                                underlayColor: "transparent",
                                onPress: function onPress(e) {
                                    _this2.userList.openList();
                                }
                            },
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: {
                                        fontSize: 16.0,
                                        color: '#1AB6B5'
                                    }
                                },
                                String(_YMUser2.default.getCurrentUserInfo().userName).substr(0, 2)
                            )
                        )
                    ),
                    _react2.default.createElement(_UserList2.default, {
                        ref: function ref(_ref3) {
                            _this2.userList = _ref3;
                        },
                        navigator: this.props.navigation,
                        selectedCallback: function selectedCallback() {
                            _Global.Function.normalLog('写入单条数据 selectedCallback');

                            _this2._writeUserDataToScale(_YMUser2.default.getCurrentUserInfo());

                            _this2.getLastWeightData();
                        },
                        addUserCallback: function addUserCallback() {
                            _this2.props.navigation.navigate('MultiUserEdit', {
                                index: -1
                            });
                        }
                    }),
                    _react2.default.createElement(_Menu2.default, {
                        ref: function ref(_ref4) {
                            _this2.menu = _ref4;
                        },
                        navigator: this.props.navigation
                    }),
                    _react2.default.createElement(
                        _reactNative.View,
                        null,
                        this.state.userInfoSelectView
                    ),
                    _react2.default.createElement(_ui.LoadingDialog, {
                        title: this.state.loadingTitle,
                        message: this.state.loadingMsg,
                        onDismiss: function onDismiss() { },
                        visible: this.state.loadingVisible
                    }),
                    _react2.default.createElement(_ui.MessageDialog, {
                        title: this.state.messageTitle,
                        message: this.state.messageMsg,
                        confirm: _Localized.Localized.Global_Interaction_Done,
                        onCancel: function onCancel() { },
                        onConfirm: function onConfirm() { },
                        onDismiss: function onDismiss() {
                            _this2.setState({
                                messageMsg: _Localized.Localized.Home_Interaction_ExitedVisitorMode,
                                messageVisible: false
                            });
                        },
                        visible: this.state.messageVisible
                    })
                );
            }
        }, {
            key: "_checkAuthorization",
            value: function _checkAuthorization() {
                console.log('_checkAuthorization ', "xxx隐私弹框");

                var agreementURL = _require(_dependencyMap[21]);

                var privacyURL = _require(_dependencyMap[22]);

                var options = {
                    agreementURL: agreementURL,
                    privacyURL: privacyURL
                };
                options.hideUserExperiencePlan = true;
                return _miot.Service.smarthome.batchGetDeviceDatas([{
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
                        } catch (err) { }
                    }

                    if (alreadyAuthed) {
                        return new Promise.resolve("已经授权");
                    } else {
                        if (isShowDiaolg) {
                            console.log('重复弹起');
                            return new Promise.resolve("重复弹起");
                        } else {
                            isShowDiaolg = true;
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
                    }
                }).catch(function (err) {
                    console.log('_checkAuthorization ', "没能授权成功");

                    _miot.Package.exit();
                });
            }
        }, {
            key: "componentDidMount",
            value: function componentDidMount() {
                var _this3 = this;

                var ver = '版本: YM - 4 - 2';
                console.log(ver);
                this.props.navigation.setParams({
                    onClickVisitor: this._onClickVisitor,
                    onClickopenMenu: this._onClickopenMenu
                });

                _YMDataHold2.default.fetchUserList(function (completed, error) {
                    if (completed === 'New') {
                        _this3.setState({
                            userInfoSelectView: _react2.default.createElement(_UserRequiredMainView2.default, null)
                        });
                    } else if (completed === 'Succeed') {
                        _this3._writeUserDataToScale(_YMUser2.default.getCurrentUserInfo());

                        _YMDataHold2.default.saveUserList();

                        _this3.getLastWeightData();

                        _this3.fetchWeightData();
                    }
                });

                _YMBLEControl2.default.checkAndConnectScale();

                this.sqlite.getAllUnUploadedData(function (data) {
                    var filteredData = data.map(function (item) {
                        _YMDataHold2.default.uploadWeightData(item, function (completed) {
                            if (completed) {
                                item.isUploaded = 1;
                            }

                            return item;
                        });
                    });

                    _this3.sqlite.saveWeightInfoList(filteredData);
                });
            }
        }, {
            key: "componentWillUnmount",
            value: function componentWillUnmount() {
                console.log('主页没了');
                this.sqlite.close();

                if (this._didConnectPeripheralListener) {
                    this._didConnectPeripheralListener.remove();
                }

                if (this._didDisconnectPeripheralListener) {
                    this._didDisconnectPeripheralListener.remove();
                }

                if (this._centralManagerDidUpdateState) {
                    this._centralManagerDidUpdateState.remove();
                }

                if (this._didDiscoverServices) {
                    this._didDiscoverServices.remove();
                }

                if (this._didDiscoverCharactisics) {
                    this._didDiscoverCharactisics.remove();
                }

                if (this._didUpdateValueForCharacteristicListener) {
                    this._didUpdateValueForCharacteristicListener.remove();
                }

                if (this.bluetoothConnectionStatusChangedListener) {
                    this.bluetoothConnectionStatusChangedListener.remove();
                }

                if (this._writUserInfoToSacleListener) {
                    this._writUserInfoToSacleListener.remove();
                }

                if (this.changeUnitEvent) {
                    this.changeUnitEvent.remove();
                }

                if (this._changeToVisitorModeListener) {
                    this._changeToVisitorModeListener.remove();
                }

                if (this.bluetoothCharacteristicValueChanged) {
                    this.bluetoothCharacteristicValueChanged.remove();
                }

                if (this._addNewUserListener) {
                    this._addNewUserListener.remove();
                }

                if (this._deviceNameChangedListener) {
                    this._deviceNameChangedListener.remove();
                }

                if (this.onDeleteWeightEvent) {
                    this.onDeleteWeightEvent.remove();
                }

                if (this.onNewMainUserEvent) {
                    this.onNewMainUserEvent.remove();
                }

                if (this.deletcUserEvent) {
                    this.deletcUserEvent.remove();
                }
            }
        }, {
            key: "fetchWeightData",
            value: function fetchWeightData() {
                var _this4 = this;

                if (_YMUser2.default.getCurrentUserInfo() === -99) {
                    return;
                }

                var startTimestamp = _YMUser2.default.getCurrentUserInfo().lastDownTime;

                var endTimestamp = parseInt(new Date().getTime() * 0.001);

                _YMDataHold2.default.fetchWeightData(startTimestamp, endTimestamp, function (weightData) {
                    if (weightData.length > 0) {
                        _this4.sqlite.saveWeightInfoList(weightData, function () {
                            _this4.getLastWeightData();
                        });
                    }

                    _YMUser2.default.getCurrentUserInfo().lastDownTime = endTimestamp;

                    _YMDataHold2.default.saveUserList();
                });
            }
        }]);
        return Home;
    }(_react.Component);

    Home.navigationOptions = function (_ref5) {
        var navigation = _ref5.navigation;
        console.log('navigation', navigation.getParam('subtitle', "默认"));
        return {
            header: _react2.default.createElement(_NewNavBar2.default, {
                haveDividerLine: false,
                style: navStyles.bar,
                type: "dark",
                title: navigation.getParam('isVisitorMode', false) ? _Localized.Localized.Home_Title_VisitorMode : navigation.getParam('title', _miot.Device.name),
                subTitle: navigation.getParam('isVisitorMode', false) ? _Localized.Localized.Home_Title_VisitorMode : navigation.getParam('subtitle', _Localized.Localized.Home_Subtitle_Disconnect),
                titleStyle: {
                    color: 'rgba(255, 255, 255, 0.9)'
                },
                onPressLeft: function onPressLeft() {
                    _YMBLEControl2.default.disconnectScale();

                    setTimeout(function () {
                        _miot.Package.exit();
                    }, 100);
                },
                showRight: navigation.getParam('isVisitorMode', false) ? false : true,
                onPressRight2: function onPressRight2() {
                    if (navigation.getParam('isVisitorMode', false)) {
                        navigation.state.params.setIsVisitorMode();
                        navigation.setParams({
                            isVisitorMode: false
                        });
                        navigation.state.params.onClickVisitor();
                    } else {
                        navigation.state.params.onClickopenMenu();
                    }
                },
                rightImg2: navigation.getParam('isVisitorMode', false) ? _Global2.default.close_white_normal : null,
                onPressRight: function onPressRight() {
                    navigation.navigate('BriefingCurve', {});
                }
            })
        };
    };

    exports.default = Home;

    var mainStyles = _reactNative.StyleSheet.create({
        container: {
            flex: 1
        },
        headerView: {
            width: _Global2.default.screenWidth(),
            height: 316.0
        },
        gridView: {
            width: _Global2.default.screenWidth()
        },
        footerView: {
            width: _Global2.default.screenWidth(),
            height: _Global2.default.screenHeight(),
            backgroundColor: 'rgb(243, 243, 247)'
        }
    });

    var navStyles = _reactNative.StyleSheet.create({
        bar: {
            backgroundColor: 'rgb(26, 182, 181)'
        },
        titleComponent: {
            alignItems: 'center',
            justifyContent: 'flex-end'
        },
        titleText: {
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: 17,
            textAlign: 'center'
        },
        subtitleText: {
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: 13,
            marginTop: 5,
            marginBottom: 4
        },
        rightComponent: {
            position: 'absolute',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: 84,
            height: 44,
            top: _Global2.default.statusBarHeight(),
            right: 6
        },
        button: {
            justifyContent: 'center',
            alignItems: 'center',
            width: 42,
            height: 44
        },
        buttonImage: {
            width: 30,
            height: 30,
            tintColor: 'white'
        }
    });
}, 10376, [10297, 10033, 10230, 10010, 10013, 10379, 10418, 10430, 10439, 10484, 10487, 10514, 10370, 10529, 10364, 10469, 10007, 10019, 10454, 10074, 10367, 10457, 10460], "projects/com.yunmai.scales.ios/Main/Home/Home.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var _ui = _require(_dependencyMap[2]);

    var _Global = _require(_dependencyMap[3]);

    var _Global2 = babelHelpers.interopRequireDefault(_Global);

    var _reactNavigation = _require(_dependencyMap[4]);

    var _Dimensions$get = _reactNative.Dimensions.get('window'),
        width = _Dimensions$get.width;

    var titleHeight = _Global2.default.deviceIsX() ? 55 : 55;
    var imgHeight = 28;
    var marginBetWeenImgs = (titleHeight - imgHeight) / 2;
    var marginBetWeenImgText = 3;

    var NewNavBar = function (_Component) {
        babelHelpers.inherits(NewNavBar, _Component);

        function NewNavBar(props) {
            babelHelpers.classCallCheck(this, NewNavBar);
            return babelHelpers.possibleConstructorReturn(this, (NewNavBar.__proto__ || Object.getPrototypeOf(NewNavBar)).call(this, props));
        }

        babelHelpers.createClass(NewNavBar, [{
            key: "render",
            value: function render() {
                var dark = this.props.type === 'dark';
                dark ? _reactNative.StatusBar.setBarStyle('light-content') : _reactNative.StatusBar.setBarStyle('default');
                {
                    _reactNative.StatusBar.setBarStyle('default');

                    _reactNative.StatusBar.setHidden(false);
                }
                var dividerLineStyle = this.props.haveDividerLine ? {
                    position: 'absolute',
                    width: _reactNative.Dimensions.get('window').width,
                    height: 0.5,
                    bottom: 0,
                    backgroundColor: 'rgb(191, 191, 192)'
                } : {
                    width: 0,
                    height: 0
                };
                return _react2.default.createElement(
                    _reactNavigation.SafeAreaView,
                    {
                        style: [styles.titleBarContainer, this.props.style]
                    },
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: {
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingLeft: marginBetWeenImgs
                            }
                        },
                        this.props.onPressLeft && _react2.default.createElement(_ui.ImageButton, {
                            onPress: this.props.onPressLeft,
                            style: [styles.img],
                            source: dark ? _require(_dependencyMap[5]) : _require(_dependencyMap[6]),
                            highlightedSource: dark ? _require(_dependencyMap[7]) : _require(_dependencyMap[8])
                        }),
                        this.props.leftText ? _react2.default.createElement(
                            _reactNative.Text,
                            {
                                style: [styles.leftRightText, this.props.onPressLeft ? {
                                    marginLeft: marginBetWeenImgText
                                } : {}, dark ? {
                                    color: '#fff'
                                } : {}],
                                onPress: this.props.onPressLeft2 || this.props.onPressLeft || function (_) {
                                    console.warn('no callback for leftText!');
                                }
                            },
                            this.props.leftText
                        ) : this.props.onPressLeft2 && _react2.default.createElement(_ui.ImageButton, {
                            onPress: this.props.onPressLeft2,
                            style: [styles.img, {
                                marginLeft: marginBetWeenImgs
                            }],
                            source: dark ? _require(_dependencyMap[9]) : _require(_dependencyMap[10]),
                            highlightedSource: dark ? _require(_dependencyMap[11]) : _require(_dependencyMap[12])
                        })
                    ),
                    this.props.titleComponent ? this.props.titleComponent : _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: {
                                flex: this.props.flex || 3,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }
                        },
                        _react2.default.createElement(
                            _reactNative.Text,
                            {
                                numberOfLines: 1,
                                ellipsizeMode: "tail",
                                style: [styles.titleText, {
                                    color: dark ? "rgba(255, 255, 255, 0.9)" : "#000000"
                                }],
                                onPress: this.props.onPressTitle
                            },
                            this.props.title
                        ),
                        this.props.subTitle && _react2.default.createElement(
                            _reactNative.Text,
                            {
                                numberOfLines: 1,
                                ellipsizeMode: "tail",
                                style: [styles.subtitleText],
                                onPress: this.props.onPressTitle
                            },
                            this.props.subTitle
                        )
                    ),
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: {
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingRight: marginBetWeenImgs
                            }
                        },
                        _react2.default.createElement(_reactNative.View, {
                            style: {
                                flex: 1
                            }
                        }),
                        this.props.onPressRight && this.props.showRight && _react2.default.createElement(_ui.ImageButton, {
                            onPress: this.props.onPressRight,
                            style: [styles.img],
                            source: dark ? _require(_dependencyMap[13]) : _require(_dependencyMap[13]),
                            highlightedSource: dark ? _require(_dependencyMap[13]) : _require(_dependencyMap[13])
                        }),
                        this.props.rightText ? _react2.default.createElement(
                            _reactNative.Text,
                            {
                                style: [styles.leftRightText, {
                                    marginLeft: marginBetWeenImgText
                                }, dark ? {
                                    color: '#fff'
                                } : {}],
                                onPress: this.props.onPressRight2 || this.props.onPressRight || function (_) {
                                    console.warn('no callback for rightText!');
                                }
                            },
                            this.props.rightText
                        ) : this.props.onPressRight2 && _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: [styles.img, {
                                    marginLeft: marginBetWeenImgs
                                }]
                            },
                            _react2.default.createElement(_ui.ImageButton, {
                                onPress: this.props.onPressRight2,
                                style: [styles.img],
                                source: dark ? this.props.rightImg2 ? this.props.rightImg2 : _require(_dependencyMap[14]) : _require(_dependencyMap[15]),
                                highlightedSource: dark ? this.props.rightImg2 ? this.props.rightImg2 : _require(_dependencyMap[16]) : _require(_dependencyMap[17])
                            }),
                            this.props.showDot && _react2.default.createElement(_reactNative.Image, {
                                style: styles.dot,
                                source: _require(_dependencyMap[18])
                            })
                        )
                    ),
                    _react2.default.createElement(_reactNative.View, {
                        style: dividerLineStyle
                    }),
                    _react2.default.createElement(_reactNative.StatusBar, {
                        translucent: true,
                        animated: true,
                        hidden: false,
                        backgroundColor: 'transparent',
                        barStyle: 'default'
                    })
                );
            }
        }]);
        return NewNavBar;
    }(_react.Component);

    exports.default = NewNavBar;

    var styles = _reactNative.StyleSheet.create({
        titleBarContainer: {
            width: width,
            height: titleHeight + _reactNative.StatusBar.currentHeight,
            flexDirection: 'row',
            paddingTop: _reactNative.StatusBar.currentHeight
        },
        titleText: {
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: 17,
            fontFamily: 'Cochin',
            textAlign: 'center'
        },
        subtitleText: {
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: 13,
            marginTop: 5,
            marginBottom: 4
        },
        leftRightText: {
            color: '#666',
            fontSize: 14,
            textAlignVertical: "center",
            textAlign: "center"
        },
        img: {
            width: imgHeight,
            height: imgHeight
        },
        dot: {
            position: 'absolute',
            width: 8,
            height: 8,
            resizeMode: 'contain',
            right: 0
        }
    });
}, 10379, [10297, 10033, 10230, 10010, 10918, 10382, 10385, 10388, 10391, 10340, 10394, 10397, 10400, 10028, 10403, 10406, 10409, 10412, 10415], "projects/com.yunmai.scales.ios/Main/NewNavBar.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 84,
        "height": 84,
        "scales": [1],
        "hash": "0f3a62db30dafc8e59fdfa6694c96874",
        "name": "back_white_normal",
        "type": "png"
    });
}, 10382, [10420], "projects/com.yunmai.scales.ios/Resources/back_white_normal.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 84,
        "height": 84,
        "scales": [1],
        "hash": "77c3edd83aea8884ed8a25ab6e522e4e",
        "name": "back_normal",
        "type": "png"
    });
}, 10385, [10420], "projects/com.yunmai.scales.ios/Resources/back_normal.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 84,
        "height": 84,
        "scales": [1],
        "hash": "4bca0b4ed8af62e214636ef87248c6da",
        "name": "back_white_press",
        "type": "png"
    });
}, 10388, [10420], "projects/com.yunmai.scales.ios/Resources/back_white_press.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 84,
        "height": 84,
        "scales": [1],
        "hash": "1289524d53ef0d2949fb2260360651d5",
        "name": "back_press",
        "type": "png"
    });
}, 10391, [10420], "projects/com.yunmai.scales.ios/Resources/back_press.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 87,
        "height": 87,
        "scales": [1],
        "hash": "3117874a709d626368bf8f844a8f563d",
        "name": "close_normal",
        "type": "png"
    });
}, 10394, [10420], "projects/com.yunmai.scales.ios/Resources/close_normal.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 87,
        "height": 87,
        "scales": [1],
        "hash": "7f5f252bd6c362c5b83369c136da107e",
        "name": "close_white_press",
        "type": "png"
    });
}, 10397, [10420], "projects/com.yunmai.scales.ios/Resources/close_white_press.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 87,
        "height": 87,
        "scales": [1],
        "hash": "dfb14722108511efbeb6db0a976e7fe2",
        "name": "close_press",
        "type": "png"
    });
}, 10400, [10420], "projects/com.yunmai.scales.ios/Resources/close_press.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 84,
        "height": 84,
        "scales": [1],
        "hash": "2a1a96d366898eaed79cb2b9313143ba",
        "name": "more_white_normal",
        "type": "png"
    });
}, 10403, [10420], "projects/com.yunmai.scales.ios/Resources/more_white_normal.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 84,
        "height": 84,
        "scales": [1],
        "hash": "c22a73839e35512c33fa0d7bf82db41d",
        "name": "more_normal",
        "type": "png"
    });
}, 10406, [10420], "projects/com.yunmai.scales.ios/Resources/more_normal.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 84,
        "height": 84,
        "scales": [1],
        "hash": "392d37a8abe306b333e87edbe953a639",
        "name": "more_white_press",
        "type": "png"
    });
}, 10409, [10420], "projects/com.yunmai.scales.ios/Resources/more_white_press.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 84,
        "height": 84,
        "scales": [1],
        "hash": "5acbc46bc324c470005f2f9c6e2c15a2",
        "name": "more_press",
        "type": "png"
    });
}, 10412, [10420], "projects/com.yunmai.scales.ios/Resources/more_press.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "width": 30,
        "height": 30,
        "scales": [1],
        "hash": "d13f3ee1e886c69b794e4adde2487c8d",
        "name": "dot",
        "type": "png"
    });
}, 10415, [10420], "projects/com.yunmai.scales.ios/Resources/dot.png");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var _Global = _require(_dependencyMap[2]);

    var _Global2 = babelHelpers.interopRequireDefault(_Global);

    var _Localized = _require(_dependencyMap[3]);

    var _ScreenUtil = _require(_dependencyMap[4]);

    var _YMUser = _require(_dependencyMap[5]);

    var _YMUser2 = babelHelpers.interopRequireDefault(_YMUser);

    var _YMScore = _require(_dependencyMap[6]);

    var _YMScore2 = babelHelpers.interopRequireDefault(_YMScore);

    var OUT_DIAMETER = 234;
    var INNER_DIAMETER = 214;

    var HeaderView = function (_Component) {
        babelHelpers.inherits(HeaderView, _Component);

        function HeaderView(props) {
            babelHelpers.classCallCheck(this, HeaderView);

            var _this = babelHelpers.possibleConstructorReturn(this, (HeaderView.__proto__ || Object.getPrototypeOf(HeaderView)).call(this, props));

            _this.componentWillReceiveProps = function (newProps) {
                _this.refreshData(newProps.data);

                _this.setState({
                    userInfo: _YMUser2.default.getCurrentUserInfo()
                });
            };

            _this.refreshData = function (newData) {
                _Global.Function.normalLog('refreshData ' + newData);

                if (newData.weighType === 'Weighting') {
                    if (!_this.state.isWeighting) {
                        _this.resetAni();

                        _this.setState({
                            isWeighting: true,
                            dashedRingOpacity: 1,
                            outerRingOpacity: 0,
                            finallyTextRotate: '180deg'
                        });
                    }

                    _this.weightingView.refreshData(newData);
                } else if (_this.state.data.createTime != newData.createTime) {
                    _this.setState({
                        data: newData,
                        dashedRingOpacity: 0,
                        outerRingOpacity: 1
                    });

                    if (_this.state.isWeighting) {
                        _this.startCircleFlipAnima();
                    }
                } else {
                    _Global.Function.normalLog('refreshData 22' + newData);

                    _this.setState({
                        isWeighting: false,
                        data: newData,
                        dashedRingOpacity: 0,
                        outerRingOpacity: 1
                    });
                }
            };

            _this.startRotateDashedCircleAnima = function () {
                _this.state.rotateDashedCircleAnima.setValue(0);

                _this.rotateDashedCircleAnima.start(function () {
                    _this.startRotateDashedCircleAnima();
                });
            };

            _this.startCircleFlipAnima = function () {
                console.log('开始结束动画');

                _this.setState({
                    dashedRingOpacity: 0,
                    outerRingOpacity: 1
                });

                _this.startRightCircleProgressAnima();
            };

            _this.startRightCircleProgressAnima = function () {
                console.log('右圆环动画');

                _reactNative.Animated.timing(_this.state.rightCircleProgressAnima, {
                    toValue: 1,
                    duration: 600,
                    easing: _reactNative.Easing.linear
                }).start(_this.startLeftCircleProgressAnima);
            };

            _this.startLeftCircleProgressAnima = function () {
                console.log('左圆环动画');

                _reactNative.Animated.timing(_this.state.leftCircleProgressAnima, {
                    toValue: 1,
                    duration: 600,
                    easing: _reactNative.Easing.linear
                }).start(_this.startFlipAnima);
            };

            _this.startFlipAnima = function () {
                console.log('翻转动画');

                _reactNative.Animated.timing(_this.state.flipAnima, {
                    toValue: 1,
                    duration: 800,
                    easing: _reactNative.Easing.linear
                }).start(function () {
                    _this.setState({
                        isWeighting: false
                    });

                    _this.startResetFlipAni();
                });

                _reactNative.Animated.timing(_this.state.textOpacity, {
                    toValue: 1,
                    duration: 800,
                    easing: _reactNative.Easing.linear
                }).start();
            };

            _this.render = function () {
                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: [_this.props.style, {
                            backgroundColor: 'rgb(26, 182, 181)'
                        }]
                    },
                    _react2.default.createElement(
                        _reactNative.Animated.View,
                        {
                            style: [styles.container, {
                                transform: [{
                                    rotateY: _this.state.flipAnima.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['0deg', '180deg']
                                    })
                                }]
                            }]
                        },
                        _react2.default.createElement(_reactNative.View, {
                            style: [styles.outerCircle, {
                                opacity: _this.state.outerRingOpacity
                            }]
                        }),
                        _react2.default.createElement(_reactNative.View, {
                            style: styles.innerCircle
                        }),
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: [styles.circleProgress, {
                                    opacity: _this.state.isWeighting ? 1 : 0
                                }]
                            },
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: [styles.mask]
                                },
                                _react2.default.createElement(
                                    _reactNative.Animated.View,
                                    {
                                        style: {
                                            width: INNER_DIAMETER,
                                            height: INNER_DIAMETER,
                                            transform: [{
                                                rotate: _this.state.leftCircleProgressAnima.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: ['0deg', '180deg']
                                                })
                                            }]
                                        }
                                    },
                                    _react2.default.createElement(_reactNative.View, {
                                        style: [styles.halfCircle, styles.leftHalfCircle]
                                    })
                                )
                            ),
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: [styles.mask, {
                                        right: 0
                                    }]
                                },
                                _react2.default.createElement(
                                    _reactNative.Animated.View,
                                    {
                                        style: {
                                            width: INNER_DIAMETER,
                                            height: INNER_DIAMETER,
                                            position: 'absolute',
                                            left: -INNER_DIAMETER * 0.5,
                                            transform: [{
                                                rotate: _this.state.rightCircleProgressAnima.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: ['0deg', '180deg']
                                                })
                                            }]
                                        }
                                    },
                                    _react2.default.createElement(_reactNative.View, {
                                        style: [styles.halfCircle, styles.rightHalfCircle]
                                    })
                                )
                            )
                        ),
                        _react2.default.createElement(_reactNative.Animated.Image, {
                            style: [styles.dashedCircle, {
                                transform: [{
                                    rotate: _this.state.rotateDashedCircleAnima.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['0deg', '360deg']
                                    })
                                }],
                                opacity: _this.state.dashedRingOpacity
                            }],
                            source: _Global2.default.main_dash
                        }),
                        _react2.default.createElement(
                            _reactNative.Animated.View,
                            {
                                style: [{
                                    opacity: _this.state.textOpacity.interpolate({
                                        inputRange: [0, 0.4999, 0.5],
                                        outputRange: [1, 1, 0]
                                    })
                                }, {
                                    position: 'absolute',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: INNER_DIAMETER - 10,
                                    height: INNER_DIAMETER - 10,
                                    borderRadius: (INNER_DIAMETER - 10) * 0.5,
                                    marginTop: (OUT_DIAMETER - (INNER_DIAMETER - 10)) * 0.5,
                                    marginLeft: (OUT_DIAMETER - (INNER_DIAMETER - 10)) * 0.5
                                }]
                            },
                            _this.state.isWeighting ? _react2.default.createElement(WeightingView, {
                                ref: function ref(_ref) {
                                    _this.weightingView = _ref;
                                },
                                unit: _this.state.userInfo.unit,
                                data: _this.state.data
                            }) : _react2.default.createElement(WeightedView, {
                                data: _this.state.data,
                                userInfo: _this.state.userInfo
                            })
                        ),
                        _react2.default.createElement(
                            _reactNative.Animated.View,
                            {
                                style: [{
                                    opacity: _this.state.textOpacity.interpolate({
                                        inputRange: [0, 0.4999, 0.5],
                                        outputRange: [0, 0, 1]
                                    }),
                                    transform: [{
                                        rotateY: _this.state.finallyTextRotate
                                    }]
                                }, {
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }]
                            },
                            _react2.default.createElement(WeightedView, {
                                data: _this.state.data,
                                userInfo: _this.state.userInfo
                            })
                        )
                    )
                );
            };

            _this.state = {
                userInfo: {
                    unit: 3,
                    sex: null,
                    age: null
                },
                data: _this.props.data,
                rotateDashedCircleAnima: new _reactNative.Animated.Value(0),
                rightCircleProgressAnima: new _reactNative.Animated.Value(0),
                leftCircleProgressAnima: new _reactNative.Animated.Value(0),
                flipAnima: new _reactNative.Animated.Value(0),
                textOpacity: new _reactNative.Animated.Value(0),
                isWeighting: false,
                finallyTextRotate: '180deg',
                dashedRingOpacity: 0,
                outerRingOpacity: 1
            };
            _this.rotateDashedCircleAnima = _reactNative.Animated.timing(_this.state.rotateDashedCircleAnima, {
                toValue: 1,
                duration: 800,
                easing: _reactNative.Easing.linear
            });

            _this.startRotateDashedCircleAnima();

            return _this;
        }

        babelHelpers.createClass(HeaderView, [{
            key: "componentWillUnmount",
            value: function componentWillUnmount() { }
        }, {
            key: "resetAni",
            value: function resetAni() {
                _reactNative.Animated.timing(this.state.textOpacity, {
                    toValue: 0,
                    duration: 0,
                    easing: _reactNative.Easing.linear
                }).start();

                _reactNative.Animated.timing(this.state.flipAnima, {
                    toValue: 0,
                    duration: 0,
                    easing: _reactNative.Easing.linear
                }).start();

                _reactNative.Animated.timing(this.state.rightCircleProgressAnima, {
                    toValue: 0,
                    duration: 0,
                    easing: _reactNative.Easing.linear
                }).start();

                _reactNative.Animated.timing(this.state.leftCircleProgressAnima, {
                    toValue: 0,
                    duration: 0,
                    easing: _reactNative.Easing.linear
                }).start();
            }
        }, {
            key: "startResetFlipAni",
            value: function startResetFlipAni() {
                _reactNative.Animated.timing(this.state.flipAnima, {
                    toValue: 0,
                    duration: 0,
                    easing: _reactNative.Easing.linear
                }).start();

                this.setState({
                    finallyTextRotate: '0deg'
                });
            }
        }]);
        return HeaderView;
    }(_react.Component);

    exports.default = HeaderView;

    var WeightingView = function (_Component2) {
        babelHelpers.inherits(WeightingView, _Component2);

        function WeightingView(props) {
            babelHelpers.classCallCheck(this, WeightingView);

            var _this2 = babelHelpers.possibleConstructorReturn(this, (WeightingView.__proto__ || Object.getPrototypeOf(WeightingView)).call(this, props));

            _this2.componentWillReceiveProps = function (newProps) {
                _this2.refreshData(newProps.data);
            };

            _this2.refreshData = function (newData) {
                _this2.setState({
                    data: newData
                });
            };

            _this2.state = {
                data: _this2.props.data
            };
            return _this2;
        }

        babelHelpers.createClass(WeightingView, [{
            key: "render",
            value: function render() {
                var weightValue = _Global.Function.converKgToOtherString(this.state.data.weight, this.props.unit);

                var integerPatr = Math.floor(weightValue);
                var decimalPart = Math.abs(Math.round((weightValue - integerPatr) * 10));
                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: styles.centerTextView
                    },
                    _react2.default.createElement(
                        _reactNative.Text,
                        {
                            style: styles.bigText
                        },
                        integerPatr,
                        _react2.default.createElement(
                            _reactNative.Text,
                            {
                                style: {
                                    fontSize: (0, _ScreenUtil.SP)(40),
                                    marginLeft: 3
                                }
                            },
                            '.' + decimalPart
                        )
                    ),
                    _react2.default.createElement(
                        _reactNative.Text,
                        {
                            style: styles.affiliatedText
                        },
                        _Localized.Localized.Home_Text_Measuring
                    )
                );
            }
        }]);
        return WeightingView;
    }(_react.Component);

    var WeightedView = function (_Component3) {
        babelHelpers.inherits(WeightedView, _Component3);

        function WeightedView(props) {
            babelHelpers.classCallCheck(this, WeightedView);

            var _this3 = babelHelpers.possibleConstructorReturn(this, (WeightedView.__proto__ || Object.getPrototypeOf(WeightedView)).call(this, props));

            _this3.componentWillReceiveProps = function (newProps) {
                _this3.refreshData(newProps.data);
            };

            _this3.refreshData = function (newData) {
                _this3.setState({
                    data: newData
                });
            };

            _this3.state = {
                data: _this3.props.data
            };
            return _this3;
        }

        babelHelpers.createClass(WeightedView, [{
            key: "render",
            value: function render() {
                var weightValue = _Global.Function.converKgToOtherString(this.state.data.weight, this.props.userInfo.unit);

                var centerTextView = _react2.default.createElement(_reactNative.View, null);

                if (this.state.data.weighType === 'Null') {
                    centerTextView = _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: styles.centerTextView
                        },
                        _react2.default.createElement(
                            _reactNative.Text,
                            {
                                style: [styles.affiliatedText, {
                                    marginTop: 11,
                                    fontFamily: 'Cochin'
                                }]
                            },
                            _Localized.Localized.Home_Text_PleaseBarefootOnTheScale + _Localized.Localized.Home_Text_ToCompleteTheFirstWeighing
                        )
                    );
                } else {
                    var timeAlert = '';
                    var timeDifferent = Date.parse(new Date()) / 1000 - this.state.data.createTime;

                    if (timeDifferent <= 60) {
                        timeAlert = _Localized.Localized.Home_Text_Just;
                    } else if (timeDifferent <= 3600) {
                        timeAlert = Math.floor(timeDifferent / 60) + _Localized.Localized.Home_Text_Minute + _Localized.Localized.Home_Text_Ago;
                    } else if (timeDifferent <= 86400) {
                        timeAlert = Math.floor(timeDifferent / 60 / 60) + _Localized.Localized.Home_Text_Hour + _Localized.Localized.Home_Text_Ago;
                    } else {
                        timeAlert = Math.floor(timeDifferent / 60 / 60 / 24) + _Localized.Localized.Home_Text_Day + _Localized.Localized.Home_Text_Ago;
                    }

                    centerTextView = _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: [styles.centerTextView, {
                                justifyContent: 'flex-start'
                            }]
                        },
                        _react2.default.createElement(
                            _reactNative.Text,
                            {
                                style: [styles.timeText, {
                                    width: 150
                                }]
                            },
                            timeAlert
                        ),
                        _react2.default.createElement(
                            _reactNative.View,
                            null,
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: [styles.bigText, {
                                        paddingTop: _Global2.default.deviceIsX() ? 0 : -12
                                    }]
                                },
                                _YMScore2.default.getScore(this.state.data),
                                _react2.default.createElement(
                                    _reactNative.Text,
                                    {
                                        style: {
                                            fontSize: (0, _ScreenUtil.SP)(14),
                                            color: 'rgba(255, 255, 255, 0.8)',
                                            width: 50
                                        }
                                    },
                                    _Localized.Localized.Home_Text_Score
                                )
                            )
                        ),
                        _react2.default.createElement(
                            _reactNative.Text,
                            {
                                style: [styles.affiliatedText, {
                                    marginTop: _Global2.default.deviceIsX() ? 0 : -19,
                                    width: 100
                                }]
                            },
                            weightValue,
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: {
                                        fontSize: (0, _ScreenUtil.SP)(18)
                                    }
                                },
                                _Global.Function.convertUnit(this.props.userInfo.unit)
                            )
                        )
                    );
                }

                return centerTextView;
            }
        }]);
        return WeightedView;
    }(_react.Component);

    var styles = _reactNative.StyleSheet.create({
        container: {
            position: 'absolute',
            width: OUT_DIAMETER,
            height: OUT_DIAMETER,
            marginTop: 31,
            marginLeft: (_Global2.default.screenWidth() - OUT_DIAMETER) * 0.5
        },
        outerCircle: {
            position: 'absolute',
            width: OUT_DIAMETER,
            height: OUT_DIAMETER,
            borderWidth: 1.5,
            borderColor: 'rgb(72, 197, 196)',
            borderRadius: OUT_DIAMETER * 0.5
        },
        innerCircle: {
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            width: INNER_DIAMETER,
            height: INNER_DIAMETER,
            marginTop: (OUT_DIAMETER - INNER_DIAMETER) * 0.5,
            marginLeft: (OUT_DIAMETER - INNER_DIAMETER) * 0.5,
            borderWidth: 2,
            borderColor: 'rgb(187, 233, 233)',
            borderRadius: INNER_DIAMETER * 0.5
        },
        dashedCircle: {
            position: 'absolute',
            width: OUT_DIAMETER,
            height: OUT_DIAMETER
        },
        circleProgress: {
            position: 'absolute',
            width: INNER_DIAMETER,
            height: INNER_DIAMETER,
            marginTop: (OUT_DIAMETER - INNER_DIAMETER) * 0.5,
            marginLeft: (OUT_DIAMETER - INNER_DIAMETER) * 0.5
        },
        mask: {
            position: 'absolute',
            width: INNER_DIAMETER * 0.5,
            height: INNER_DIAMETER,
            borderColor: 'transparent',
            overflow: 'hidden'
        },
        halfCircle: {
            width: INNER_DIAMETER * 0.5,
            height: INNER_DIAMETER,
            borderWidth: 2,
            borderColor: 'rgb(72, 197, 196)',
            overflow: 'hidden'
        },
        leftHalfCircle: {
            borderRightWidth: 0,
            borderTopLeftRadius: INNER_DIAMETER * 0.5,
            borderBottomLeftRadius: INNER_DIAMETER * 0.5
        },
        rightHalfCircle: {
            borderLeftWidth: 0,
            borderTopRightRadius: INNER_DIAMETER * 0.5,
            borderBottomRightRadius: INNER_DIAMETER * 0.5,
            marginLeft: INNER_DIAMETER * 0.5
        },
        centerTextView: {
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            width: INNER_DIAMETER - 10,
            height: INNER_DIAMETER - 10,
            borderRadius: (INNER_DIAMETER - 10) * 0.5,
            backgroundColor: 'transparent'
        },
        timeText: {
            textAlign: 'center',
            fontSize: (0, _ScreenUtil.SP)(12),
            color: 'rgb(168, 221, 220)',
            marginTop: 38,
            backgroundColor: 'transparent'
        },
        bigText: {
            textAlign: 'center',
            fontSize: 84,
            color: 'white',
            width: INNER_DIAMETER - 10,
            backgroundColor: 'transparent'
        },
        affiliatedText: {
            textAlign: 'center',
            fontSize: 20,
            color: 'white',
            backgroundColor: 'transparent'
        }
    });
}, 10418, [10297, 10033, 10010, 10013, 10421, 10019, 10424], "projects/com.yunmai.scales.ios/Main/Home/HeaderView.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.DEFAULT_DENSITY = exports.pixelRatio = exports.screenH = exports.screenW = undefined;
    exports.DW = DW;
    exports.DH = DH;
    exports.SP = SP;
    exports.setSpText2 = setSpText2;
    exports.isIphoneX = isIphoneX;
    exports.ifIphoneX = ifIphoneX;
    exports.isEmpty = isEmpty;
    exports.getRemainingime = getRemainingime;
    exports.getRemainingimeDistance = getRemainingimeDistance;
    exports.toNormal = toNormal;
    exports.toDate = toDate;
    exports.toTimestamp = toTimestamp;
    exports.getTaskTime = getTaskTime;
    exports.getRemainingimeDistance2 = getRemainingimeDistance2;
    exports.saveAsyncStorage = saveAsyncStorage;
    exports.getAsyncStorage = getAsyncStorage;
    exports.removeAsyncStorage = removeAsyncStorage;

    var _reactNative = _require(_dependencyMap[0]);

    var screenW = exports.screenW = _reactNative.Dimensions.get('window').width;

    var screenH = exports.screenH = _reactNative.Dimensions.get('window').height;

    var fontScale = _reactNative.PixelRatio.getFontScale();

    var pixelRatio = exports.pixelRatio = _reactNative.PixelRatio.get();

    var DEFAULT_DENSITY = exports.DEFAULT_DENSITY = 3;
    var defaultWidth = 360;
    var defaultHeight = 640;
    var w2 = defaultWidth / DEFAULT_DENSITY;
    var h2 = defaultHeight / DEFAULT_DENSITY;

    var _scaleWidth = screenW / defaultWidth;

    var _scaleHeight = screenH / defaultHeight;

    var X_WIDTH = 375;
    var X_HEIGHT = 812;

    function DW(size) {
        return size * _scaleWidth;
    }

    function DH(size) {
        return size * _scaleHeight;
    }

    function SP(size) {
        var scaleWidth = screenW / w2;
        var scaleHeight = screenH / h2;
        var scale = Math.min(scaleWidth, scaleHeight);
        size = Math.round(size * scale + 0.5);
        return size / DEFAULT_DENSITY * fontScale;
    }

    function setSpText2(size) {
        var allowFontScaling = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var scale = Math.min(_scaleWidth, _scaleHeight);
        var fontSize = allowFontScaling ? 1 : fontScale;
        return size * scale / fontSize;
    }

    function isIphoneX() {
        return false;
    }

    function ifIphoneX(iphoneXStyle) {
        var iosStyle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var androidStyle = arguments[2];

        if (isIphoneX()) {
            return iphoneXStyle;
        } else {
            if (androidStyle) return androidStyle;
            return iosStyle;
        }
    }

    function isEmpty(str) {
        if (!str) {
            return true;
        } else if (typeof str === 'object' && Object.keys(str).length === 0) {
            return true;
        } else if (str.replace(/(^\s*)|(\s*$)/g, "").length === 0) {
            return true;
        }

        return false;
    }

    Date.prototype.format = function (format) {
        var date = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "S+": this.getMilliseconds()
        };

        if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
        }

        for (var k in date) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
            }
        }

        return format;
    };

    function getRemainingime(current, start) {
        var time = start - current;

        if (time < 0) {
            return ["0", "0", "0", "0", "0", "0"];
        }

        var year = Math.floor(time / 946080000000);
        var month = Math.floor(time / 2592000000);
        var days = Math.floor(time / 86400000);
        var temp1 = time % 86400000;
        var temp2 = temp1 % 3600000;
        var minutes = Math.floor(temp2 / 60000);
        var hours = Math.floor(temp1 / 3600000);
        var temp3 = temp2 % 60000;
        var seconds = Math.round(temp3 / 1000);
        var strs = [year, toNormal(month), toNormal(days), toNormal(hours), toNormal(minutes), toNormal(seconds)];
        return strs;
    }

    function getRemainingimeDistance(distance) {
        var time = distance * 1000;

        if (time < 0) {
            return ["0", "0", "0", "0", "0", "0"];
        }

        var year = Math.floor(time / 946080000000);
        var month = Math.floor(time / 2592000000);
        var days = Math.floor(time / 86400000);
        var temp1 = time % 86400000;
        var hours = Math.floor(temp1 / 3600000);
        var temp2 = temp1 % 3600000;
        var minutes = Math.floor(temp2 / 60000);
        var temp3 = temp2 % 60000;
        var seconds = Math.round(temp3 / 1000);
        var strs = [year, toNormal(month), toNormal(days), toNormal(hours), toNormal(minutes), toNormal(seconds)];
        return strs;
    }

    function toNormal(time) {
        return time >= 10 ? time : '0' + time;
    }

    function toDate(timestamp) {
        var format1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-MM-dd hh:mm:ss';

        try {
            if (timestamp > 10000) {
                var date = new Date();
                date.setTime(timestamp);
                return date.format(format1);
            } else {
                return '';
            }
        } catch (erro) {
            return '';
        }

        return '';
    }

    function toTimestamp(date) {
        var timestamp = Date.parse(date);
        return timestamp / 1000;
    }

    function getTaskTime(strDate) {
        if (null == strDate || "" == strDate) {
            return "";
        }

        var dateStr = strDate.trim().split(" ");
        var strGMT = dateStr[0] + " " + dateStr[1] + " " + dateStr[2] + " " + dateStr[5] + " " + dateStr[3] + " GMT+0800";
        var date = new Date(Date.parse(strGMT));
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = date.getDate();
        d = d < 10 ? '0' + d : d;
        var h = date.getHours();
        var minute = date.getMinutes();
        minute = minute < 10 ? '0' + minute : minute;
        var second = date.getSeconds();
        second = second < 10 ? '0' + second : second;
        return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
    }

    ;

    function getRemainingimeDistance2(distance) {
        var time = distance;
        var days = Math.floor(time / 86400000);
        var temp1 = time % 86400000;
        var hours = Math.floor(temp1 / 3600000);
        var temp2 = temp1 % 3600000;
        var minutes = Math.floor(temp2 / 60000);

        if (time <= 60000) {
            minutes = 1;
        }

        var temp3 = temp2 % 60000;
        var seconds = Math.round(temp3 / 1000);
        return [hours, minutes];
    }

    function saveAsyncStorage(key, value, successCallback, errorCallback) {
        _reactNative.AsyncStorage.setItem(key, value, function (error) {
            if (error) {
                errorCallback(error);
            } else {
                successCallback();
            }
        });
    }

    function getAsyncStorage(key, successCallback, errorCallback) {
        _reactNative.AsyncStorage.getItem(key, function (error, result) {
            if (error) {
                errorCallback(error);
            } else {
                successCallback(result);
            }
        });
    }

    function removeAsyncStorage(key, successCallback, errorCallback) {
        _reactNative.AsyncStorage.getItem(key, function (error) {
            if (error) {
                errorCallback(error);
            } else {
                successCallback();
            }
        });
    }
}, 10421, [10033], "projects/com.yunmai.scales.ios/CommonModules/ScreenUtil.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _YMStand = _require(_dependencyMap[0]);

    var _YMStand2 = babelHelpers.interopRequireDefault(_YMStand);

    var _YMUser = _require(_dependencyMap[1]);

    var _YMUser2 = babelHelpers.interopRequireDefault(_YMUser);

    var _Global = _require(_dependencyMap[2]);

    var YMScore = function YMScore() {
        babelHelpers.classCallCheck(this, YMScore);
    };

    YMScore.getScore = function (userData) {
        var userInfo = _YMUser2.default.getCurrentUserInfo();

        _Global.Function.normalLog('Function userInfo' + userInfo);

        if (!userInfo || !userData) {
            return 0;
        }

        if (!userInfo.age) {
            return 0;
        }

        _Global.Function.normalLog('Function userInfo ' + userInfo.age);

        _Global.Function.normalLog('Function fat ' + userData.fat);

        if (userInfo.age < 18) {
            return 0;
        } else if (userData.fat > 75 || userData.fat < 5) {
            return 0;
        }

        var score = 0;
        var bmiScore = YMScore.getBmiScore(userInfo, userData.bmi);
        var fatScore = YMScore.getFatScore(userInfo, userData.fat);
        var waterScore = YMScore.getWaterScore(userInfo, userData.water);
        var muscleScore = YMScore.getMuscleScore(userInfo, userData.muscle);
        var boneScore = YMScore.getBoneScore();
        score = bmiScore + fatScore + waterScore + muscleScore + boneScore;

        _Global.Function.normalLog('Function score' + score);

        score += 4;

        if (score >= 99) {
            score = 99;
        }

        return score.toFixed(0);
    };

    YMScore.getBmiScore = function (_ref, value) {
        var sex = _ref.sex,
            age = _ref.age;
        var allMark = 0;
        var oneMark = 0;
        var maxData = 0;
        var minData = 0;
        var markIndex = 0;

        if (value < 10 || value >= 60) {
            return 10;
        }

        if (sex == 1) {
            if (age < 30) {
                if (value < 17) {
                    allMark = 42;
                    oneMark = 32;
                    maxData = 17;
                    minData = 0;
                    markIndex = 1;
                } else if (value >= 17 && value < 18.5) {
                    allMark = 52;
                    oneMark = 10;
                    maxData = 18.5;
                    minData = 17;
                    markIndex = 2;
                } else if (value >= 18.5 && value < 21) {
                    allMark = 60;
                    oneMark = 8;
                    maxData = 21;
                    minData = 18.5;
                    markIndex = 3;
                } else if (value >= 21 && value < 22) {
                    allMark = 60;
                    oneMark = 9;
                    maxData = 22;
                    minData = 21;
                    markIndex = 4;
                } else if (value >= 22 && value < 23) {
                    allMark = 51;
                    oneMark = 2;
                    maxData = 23;
                    minData = 22;
                    markIndex = 5;
                } else if (value >= 23 && value < 24.5) {
                    allMark = 49;
                    oneMark = 3;
                    maxData = 24.5;
                    minData = 23;
                    markIndex = 6;
                } else if (value >= 24.5 && value < 35) {
                    allMark = 46;
                    oneMark = 21;
                    maxData = 35;
                    minData = 24.5;
                    markIndex = 7;
                } else if (value >= 35 && value < 60) {
                    allMark = 25;
                    oneMark = 15;
                    maxData = 60;
                    minData = 35;
                    markIndex = 8;
                }
            } else if (age >= 30 && age < 40) {
                if (value < 17) {
                    allMark = 42;
                    oneMark = 32;
                    maxData = 17;
                    minData = 0;
                    markIndex = 1;
                } else if (value >= 17 && value < 18.5) {
                    allMark = 52;
                    oneMark = 10;
                    maxData = 18.5;
                    minData = 17;
                    markIndex = 2;
                } else if (value >= 18.5 && value < 21.5) {
                    allMark = 60;
                    oneMark = 8;
                    maxData = 21.5;
                    minData = 18.5;
                    markIndex = 3;
                } else if (value >= 21.5 && value < 23) {
                    allMark = 60;
                    oneMark = 11;
                    maxData = 23;
                    minData = 21.5;
                    markIndex = 4;
                } else if (value >= 23 && value < 24) {
                    allMark = 49;
                    oneMark = 4;
                    maxData = 24;
                    minData = 23;
                    markIndex = 5;
                } else if (value >= 24 && value < 26) {
                    allMark = 45;
                    oneMark = 5;
                    maxData = 26;
                    minData = 24;
                    markIndex = 6;
                } else if (value >= 26 && value < 35) {
                    allMark = 40;
                    oneMark = 18;
                    maxData = 35;
                    minData = 26;
                    markIndex = 7;
                } else if (value >= 35 && value < 60) {
                    allMark = 22;
                    oneMark = 12;
                    maxData = 60;
                    minData = 35;
                    markIndex = 8;
                }
            } else if (age >= 40) {
                if (value < 17) {
                    allMark = 40;
                    oneMark = 30;
                    maxData = 17;
                    minData = 0;
                    markIndex = 1;
                } else if (value >= 17 && value < 18.5) {
                    allMark = 52;
                    oneMark = 12;
                    maxData = 18.5;
                    minData = 17;
                    markIndex = 2;
                } else if (value >= 18.5 && value < 22) {
                    allMark = 60;
                    oneMark = 8;
                    maxData = 22;
                    minData = 18.5;
                    markIndex = 3;
                } else if (value >= 22 && value < 24) {
                    allMark = 60;
                    oneMark = 14;
                    maxData = 24;
                    minData = 22;
                    markIndex = 4;
                } else if (value >= 24 && value < 25.5) {
                    allMark = 46;
                    oneMark = 4;
                    maxData = 25.5;
                    minData = 24;
                    markIndex = 5;
                } else if (value >= 25.5 && value < 27) {
                    allMark = 42;
                    oneMark = 8;
                    maxData = 27;
                    minData = 25.5;
                    markIndex = 6;
                } else if (value >= 27 && value < 35) {
                    allMark = 34;
                    oneMark = 15;
                    maxData = 35;
                    minData = 27;
                    markIndex = 7;
                } else if (value >= 35 && value < 60) {
                    allMark = 19;
                    oneMark = 9;
                    maxData = 60;
                    minData = 35;
                    markIndex = 8;
                }
            }
        } else {
            if (age < 30) {
                if (value < 16) {
                    allMark = 44;
                    oneMark = 34;
                    maxData = 16;
                    minData = 0;
                    markIndex = 1;
                } else if (value >= 16 && value < 18.5) {
                    allMark = 54;
                    oneMark = 10;
                    maxData = 18.5;
                    minData = 16;
                    markIndex = 2;
                } else if (value >= 18.5 && value < 19) {
                    allMark = 60;
                    oneMark = 6;
                    maxData = 19;
                    minData = 18.5;
                    markIndex = 3;
                } else if (value >= 19 && value < 19.5) {
                    allMark = 60;
                    oneMark = 6;
                    maxData = 19.5;
                    minData = 19;
                    markIndex = 4;
                } else if (value >= 19.5 && value < 20.5) {
                    allMark = 54;
                    oneMark = 3;
                    maxData = 20.5;
                    minData = 19.5;
                    markIndex = 5;
                } else if (value >= 20.5 && value < 22) {
                    allMark = 51;
                    oneMark = 2;
                    maxData = 22;
                    minData = 20.5;
                    markIndex = 6;
                } else if (value >= 22 && value < 35) {
                    allMark = 49;
                    oneMark = 19;
                    maxData = 35;
                    minData = 22;
                    markIndex = 7;
                } else if (value >= 35 && value < 60) {
                    allMark = 30;
                    oneMark = 20;
                    maxData = 60;
                    minData = 35;
                    markIndex = 8;
                }
            } else if (age >= 30 && age <= 40) {
                if (value < 16) {
                    allMark = 42;
                    oneMark = 32;
                    maxData = 16;
                    minData = 0;
                    markIndex = 1;
                } else if (value >= 16 && value < 18.5) {
                    allMark = 52;
                    oneMark = 10;
                    maxData = 18.5;
                    minData = 16;
                    markIndex = 2;
                } else if (value >= 18.5 && value < 19.5) {
                    allMark = 60;
                    oneMark = 8;
                    maxData = 19.5;
                    minData = 18.5;
                    markIndex = 3;
                } else if (value >= 19.5 && value < 21) {
                    allMark = 60;
                    oneMark = 8;
                    maxData = 21;
                    minData = 19.5;
                    markIndex = 4;
                } else if (value >= 21 && value < 22.5) {
                    allMark = 52;
                    oneMark = 3;
                    maxData = 22.5;
                    minData = 21;
                    markIndex = 5;
                } else if (value >= 22.5 && value < 25) {
                    allMark = 49;
                    oneMark = 4;
                    maxData = 25;
                    minData = 22.5;
                    markIndex = 6;
                } else if (value >= 25 && value < 35) {
                    allMark = 45;
                    oneMark = 20;
                    maxData = 35;
                    minData = 25;
                    markIndex = 7;
                } else if (value >= 35 && value < 60) {
                    allMark = 25;
                    oneMark = 15;
                    maxData = 60;
                    minData = 35;
                    markIndex = 8;
                }
            } else if (age >= 40) {
                if (value < 16) {
                    allMark = 42;
                    oneMark = 32;
                    maxData = 16;
                    minData = 0;
                    markIndex = 1;
                } else if (value >= 16 && value < 19) {
                    allMark = 52;
                    oneMark = 10;
                    maxData = 19;
                    minData = 16;
                    markIndex = 2;
                } else if (value >= 19 && value < 20.5) {
                    allMark = 60;
                    oneMark = 8;
                    maxData = 20.5;
                    minData = 19;
                    markIndex = 3;
                } else if (value >= 20.5 && value < 22) {
                    allMark = 60;
                    oneMark = 8;
                    maxData = 22;
                    minData = 20.5;
                    markIndex = 4;
                } else if (value >= 22 && value < 23.5) {
                    allMark = 52;
                    oneMark = 3;
                    maxData = 23.5;
                    minData = 22;
                    markIndex = 5;
                } else if (value >= 23.5 && value < 26) {
                    allMark = 49;
                    oneMark = 4;
                    maxData = 26;
                    minData = 23.5;
                    markIndex = 6;
                } else if (value >= 26 && value < 35) {
                    allMark = 45;
                    oneMark = 20;
                    maxData = 35;
                    minData = 26;
                    markIndex = 7;
                } else if (value >= 35 && value < 60) {
                    allMark = 25;
                    oneMark = 15;
                    maxData = 60;
                    minData = 35;
                    markIndex = 8;
                }
            }
        }

        var mark = allMark - YMScore.getCurrentIndexScore(value, maxData, minData, oneMark, markIndex);
        return mark;
    };

    YMScore.getFatScore = function (_ref2, value) {
        var sex = _ref2.sex,
            age = _ref2.age;
        var allMark = 0;
        var oneMark = 0;
        var maxData = 0;
        var minData = 0;
        var markIndex = 0;

        if (value < 5 || value > 75) {
            return 0;
        }

        if (sex == 1) {
            if (age < 30) {
                if (value < 10) {
                    allMark = 23;
                    oneMark = 18;
                    maxData = 10;
                    minData = 0;
                    markIndex = 1;
                } else if (value >= 10 && value < 14) {
                    allMark = 26;
                    oneMark = 3;
                    maxData = 14;
                    minData = 10;
                    markIndex = 2;
                } else if (value >= 14 && value < 18) {
                    allMark = 30;
                    oneMark = 4;
                    maxData = 18;
                    minData = 14;
                    markIndex = 3;
                } else if (value >= 18 && value < 20) {
                    allMark = 30;
                    oneMark = 4.5;
                    maxData = 20;
                    minData = 18;
                    markIndex = 4;
                } else if (value >= 20 && value < 25) {
                    allMark = 25.5;
                    oneMark = 7.5;
                    maxData = 25;
                    minData = 20;
                    markIndex = 5;
                } else if (value >= 25 && value < 76) {
                    allMark = 18;
                    oneMark = 13;
                    maxData = 76;
                    minData = 25;
                    markIndex = 6;
                }
            } else if (age >= 30 && age < 40) {
                if (value < 11) {
                    allMark = 23;
                    oneMark = 18;
                    maxData = 11;
                    minData = 0;
                    markIndex = 1;
                } else if (value >= 11 && value < 15) {
                    allMark = 26;
                    oneMark = 3;
                    maxData = 15;
                    minData = 11;
                    markIndex = 2;
                } else if (value >= 15 && value < 19.5) {
                    allMark = 30;
                    oneMark = 4;
                    maxData = 19.5;
                    minData = 15;
                    markIndex = 3;
                } else if (value >= 19.5 && value < 21.5) {
                    allMark = 30;
                    oneMark = 7;
                    maxData = 21.5;
                    minData = 19.5;
                    markIndex = 4;
                } else if (value >= 21.5 && value < 26.5) {
                    allMark = 23;
                    oneMark = 8;
                    maxData = 26.5;
                    minData = 21.5;
                    markIndex = 5;
                } else if (value >= 26.5 && value < 76) {
                    allMark = 15;
                    oneMark = 10;
                    maxData = 76;
                    minData = 26.5;
                    markIndex = 6;
                }
            } else {
                if (value < 12) {
                    allMark = 23;
                    oneMark = 18;
                    maxData = 12;
                    minData = 0;
                    markIndex = 1;
                } else if (value >= 12 && value < 17) {
                    allMark = 26;
                    oneMark = 3;
                    maxData = 17;
                    minData = 12;
                    markIndex = 2;
                } else if (value >= 17 && value < 21) {
                    allMark = 30;
                    oneMark = 4;
                    maxData = 21;
                    minData = 17;
                    markIndex = 3;
                } else if (value >= 21 && value < 23) {
                    allMark = 30;
                    oneMark = 8;
                    maxData = 23;
                    minData = 21;
                    markIndex = 4;
                } else if (value >= 23 && value < 30) {
                    allMark = 22;
                    oneMark = 9;
                    maxData = 30;
                    minData = 23;
                    markIndex = 5;
                } else if (value >= 30 && value < 76) {
                    allMark = 13;
                    oneMark = 8;
                    maxData = 76;
                    minData = 30;
                    markIndex = 6;
                }
            }
        } else {
            if (age < 30) {
                if (value < 16) {
                    allMark = 15;
                    oneMark = 10;
                    maxData = 16;
                    minData = 0;
                    markIndex = 1;
                } else if (value >= 16 && value < 19) {
                    allMark = 25;
                    oneMark = 10;
                    maxData = 19;
                    minData = 16;
                    markIndex = 2;
                } else if (value >= 19 && value < 22) {
                    allMark = 30;
                    oneMark = 5;
                    maxData = 22;
                    minData = 19;
                    markIndex = 3;
                } else if (value >= 22 && value < 24) {
                    allMark = 30;
                    oneMark = 4.5;
                    maxData = 24;
                    minData = 22;
                    markIndex = 4;
                } else if (value >= 24 && value < 30) {
                    allMark = 25.5;
                    oneMark = 3;
                    maxData = 30;
                    minData = 24;
                    markIndex = 5;
                } else if (value >= 30 && value < 76) {
                    allMark = 22.5;
                    oneMark = 17.5;
                    maxData = 76;
                    minData = 30;
                    markIndex = 6;
                }
            } else if (age >= 30 && age <= 40) {
                if (value < 18) {
                    allMark = 14;
                    oneMark = 9;
                    maxData = 18;
                    minData = 0;
                    markIndex = 1;
                } else if (value >= 18 && value < 21) {
                    allMark = 24;
                    oneMark = 10;
                    maxData = 21;
                    minData = 18;
                    markIndex = 2;
                } else if (value >= 21 && value < 25) {
                    allMark = 30;
                    oneMark = 6;
                    maxData = 25;
                    minData = 21;
                    markIndex = 3;
                } else if (value >= 25 && value < 27) {
                    allMark = 30;
                    oneMark = 4.5;
                    maxData = 27;
                    minData = 25;
                    markIndex = 4;
                } else if (value >= 27 && value < 35) {
                    allMark = 25.5;
                    oneMark = 7.5;
                    maxData = 35;
                    minData = 27;
                    markIndex = 5;
                } else if (value >= 35 && value < 76) {
                    allMark = 18;
                    oneMark = 13;
                    maxData = 76;
                    minData = 35;
                    markIndex = 6;
                }
            } else if (age >= 40) {
                if (value < 20) {
                    allMark = 14;
                    oneMark = 9;
                    maxData = 20;
                    minData = 0;
                    markIndex = 1;
                } else if (value >= 20 && value < 22) {
                    allMark = 24;
                    oneMark = 10;
                    maxData = 22;
                    minData = 20;
                    markIndex = 2;
                } else if (value >= 22 && value < 26) {
                    allMark = 30;
                    oneMark = 6;
                    maxData = 26;
                    minData = 22;
                    markIndex = 3;
                } else if (value >= 26 && value < 28) {
                    allMark = 30;
                    oneMark = 4.5;
                    maxData = 28;
                    minData = 26;
                    markIndex = 4;
                } else if (value >= 28 && value < 35) {
                    allMark = 25.5;
                    oneMark = 7.5;
                    maxData = 35;
                    minData = 28;
                    markIndex = 5;
                } else if (value >= 35 && value < 76) {
                    allMark = 18;
                    oneMark = 13;
                    maxData = 76;
                    minData = 35;
                    markIndex = 6;
                }
            }
        }

        var mark = allMark - YMScore.getCurrentIndexScore(value, maxData, minData, oneMark, markIndex);
        return mark;
    };

    YMScore.getWaterScore = function (_ref3, value) {
        var sex = _ref3.sex;

        if (_YMStand2.default.getWaterStand({
            sex: sex
        }, value).intervalIndex == 2) {
            return 2;
        } else {
            return 1;
        }
    };

    YMScore.getMuscleScore = function (_ref4, value) {
        var sex = _ref4.sex;

        if (_YMStand2.default.getMuscleStand({
            sex: sex
        }, value).intervalIndex == 2) {
            return 2;
        } else {
            return 1;
        }
    };

    YMScore.getBoneScore = function () {
        return 2;
    };

    YMScore.getCurrentIndexScore = function (myData, maxData, minData, mark, markIndex) {
        var flag = mark / (maxData - minData);
        var myMark = 0;

        switch (markIndex) {
            case 1:
            case 2:
            case 3:
                {
                    myMark = (maxData - myData) * flag;
                    break;
                }

            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
                {
                    myMark = (myData - minData) * flag;
                    break;
                }

            default:
                return 0;
        }

        return myMark;
    };

    exports.default = YMScore;
}, 10424, [10427, 10019, 10010], "projects/com.yunmai.scales.ios/Main/Tools/YMScore.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _YMUser = _require(_dependencyMap[0]);

    var _YMUser2 = babelHelpers.interopRequireDefault(_YMUser);

    var _Localized = _require(_dependencyMap[1]);

    var _Global = _require(_dependencyMap[2]);

    var colors = ['#9BCEF5', '#64AEE7', '#6ED7A0', '#4BC355', '#FEBA4D', '#F57A6B', '#F5523E'];

    var YMStand = function YMStand() {
        babelHelpers.classCallCheck(this, YMStand);
    };

    YMStand.getStand = function (_ref) {
        var type = _ref.type,
            value = _ref.value,
            fatValue = _ref.fatValue,
            weight = _ref.weight;
        var text = '- -';
        var stand = {
            intervalIndex: 0,
            evaluate: 'unknown',
            shownNodeControl: [0, 0],
            realNodeControl: [0, 0],
            textControl: ['']
        };

        var userInfo = _YMUser2.default.getCurrentUserInfo();

        switch (type) {
            case 'bmi':
                stand = YMStand.getBMIStand(value);
                break;

            case 'fat':
                stand = YMStand.getFatStand(userInfo, value);
                break;

            case 'water':
                stand = YMStand.getWaterStand(userInfo, value);
                break;

            case 'muscle':
                stand = YMStand.getMuscleStand(userInfo, value);
                break;

            case 'bone':
                stand = YMStand.getBoneStand(value);
                break;

            case 'bmr':
                stand = YMStand.getBMRStand(userInfo, fatValue);
                break;

            case 'visFat':
                stand = YMStand.getVisFatStand(value);
                break;

            case 'protein':
                stand = YMStand.getProteinStand(value);
                break;

            case 'somaAge':
                stand = YMStand.getSomaAgeStand(userInfo, value);
                break;

            case 'fatMass':
                stand = YMStand.getFatMassStand(userInfo, fatValue, weight);
                break;

            case 'somatotype':
                stand = YMStand.getSomatotypeStand(userInfo, fatValue);
                break;

            case 'bodyFatIndex':
                stand = YMStand.getBodyFatIndexStand(userInfo, value);
                break;

            case 'obesityLevel':
                stand = YMStand.getObesityLevelStand(userInfo, value);
                break;

            case 'normalWeight':
                stand = YMStand.getNormalWeightStand(userInfo, weight);
                break;

            case 'fatFreeMass':
                stand = YMStand.getFatFreeMassStand();
                break;
        }

        if (stand.intervalIndex != 0) {
            text = stand.textControl[stand.intervalIndex - 1];
        }

        var _YMStand$getColorOffs = YMStand.getColorOffsetAndIntervalCount(type),
            colorOffset = _YMStand$getColorOffs.offset,
            intervalCount = _YMStand$getColorOffs.count;

        return babelHelpers.extends({}, stand, {
            text: text,
            colorOffset: colorOffset,
            colorControl: colors.slice(colorOffset, colorOffset + intervalCount)
        });
    };

    YMStand.getIntervalIndex = function (value, realNodeControl) {
        if (_Global.Function.equalNull(realNodeControl)) {
            return 0;
        }

        var result = realNodeControl.findIndex(function (item, index) {
            if (index === 0) {
                return false;
            } else {
                return value <= item && value > realNodeControl[index - 1];
            }
        });

        if (result === -1) {
            result = 0;
        }

        return result;
    };

    YMStand.getColorOffsetAndIntervalCount = function (type) {
        switch (type) {
            case 'bmi':
                return {
                    offset: 2,
                    count: 5
                };

            case 'fat':
                return {
                    offset: 2,
                    count: 4
                };

            case 'water':
                return {
                    offset: 2,
                    count: 3
                };

            case 'muscle':
                return {
                    offset: 2,
                    count: 2
                };

            case 'bone':
                return {
                    offset: 3,
                    count: 1
                };

            case 'bmr':
                return {
                    offset: 3,
                    count: 1
                };

            case 'visFat':
                return {
                    offset: 3,
                    count: 3
                };

            case 'protein':
                return {
                    offset: 2,
                    count: 3
                };

            case 'somaAge':
                return {
                    offset: 3,
                    count: 1
                };

            case 'fatMass':
                return {
                    offset: 2,
                    count: 4
                };

            case 'somatotype':
                return {
                    offset: 0,
                    count: 0
                };

            case 'bodyFatIndex':
                return {
                    offset: 0,
                    count: 7
                };

            case 'obesityLevel':
                return {
                    offset: 3,
                    count: 4
                };

            case 'normalWeight':
                return {
                    offset: 2,
                    count: 3
                };

            case 'fatFreeMass':
                return {
                    offset: 3,
                    count: 1
                };

            default:
                return {
                    offset: 0,
                    count: 0
                };
        }
    };

    YMStand.getBMIStand = function (value) {
        var intervalIndex = 0;
        var evaluate = 'unknown';
        var shownNodeControl = ['18.5', '24', '28', '35'];
        var realNodeControl = [0, 18.5, 24, 28, 35, 200];

        if (value > 0) {
            intervalIndex = YMStand.getIntervalIndex(value, realNodeControl);

            if (intervalIndex === 2) {
                evaluate = 'good';
            } else {
                evaluate = 'bad';
            }
        }

        return {
            intervalIndex: intervalIndex,
            evaluate: evaluate,
            shownNodeControl: shownNodeControl,
            realNodeControl: realNodeControl,
            textControl: [_Localized.Localized.Global_Evaluation_bmi_Slim, _Localized.Localized.Global_Evaluation_bmi_Normal, _Localized.Localized.Global_Evaluation_bmi_PartialFat, _Localized.Localized.Global_Evaluation_bmi_fat, _Localized.Localized.Global_Evaluation_bmi_Overweight]
        };
    };

    YMStand.getFatStand = function (_ref2, value) {
        var age = _ref2.age,
            sex = _ref2.sex;
        var intervalIndex = 0;
        var evaluate = 'unknown';
        var shownNodeControl = [];
        var realNodeControl = [];

        if (sex === 1) {
            if (age < 39) {
                shownNodeControl = ['10.0%', '21.0%', '26.0%'];
                realNodeControl = [0, 10, 21, 26, 76];
            } else if (age < 59) {
                shownNodeControl = ['11.0%', '22.0%', '27.0%'];
                realNodeControl = [0, 11, 22, 27, 76];
            } else {
                shownNodeControl = ['13.0%', '24.0%', '29.0%'];
                realNodeControl = [0, 13, 24, 29, 76];
            }
        } else {
            if (age < 39) {
                shownNodeControl = ['20.0%', '34.0%', '39.0%'];
                realNodeControl = [0, 20, 34, 39, 76];
            } else if (age < 59) {
                shownNodeControl = ['21.0%', '35.0%', '40.0%'];
                realNodeControl = [0, 21, 35, 40, 76];
            } else {
                shownNodeControl = ['22.0%', '36.0%', '41.0%'];
                realNodeControl = [0, 22, 36, 41, 76];
            }
        }

        if (value > 0) {
            intervalIndex = YMStand.getIntervalIndex(value, realNodeControl);

            if (intervalIndex === 2) {
                evaluate = 'good';
            } else {
                evaluate = 'bad';
            }
        }

        return {
            intervalIndex: intervalIndex,
            evaluate: evaluate,
            shownNodeControl: shownNodeControl,
            realNodeControl: realNodeControl,
            textControl: [_Localized.Localized.Global_Evaluation_fat_Low, _Localized.Localized.Global_Evaluation_fat_Normal, _Localized.Localized.Global_Evaluation_fat_PartialFat, _Localized.Localized.Global_Evaluation_fat_fat]
        };
    };

    YMStand.getWaterStand = function (_ref3, value) {
        var sex = _ref3.sex;
        var intervalIndex = 0;
        var evaluate = 'unknown';
        var shownNodeControl = [];
        var realNodeControl = [];

        if (sex === 1) {
            shownNodeControl = ['55.0%', '65.0%'];
            realNodeControl = [0, 55, 65, 100];
        } else {
            shownNodeControl = ['45.0%', '60.0%'];
            realNodeControl = [0, 45, 60, 100];
        }

        if (value > 0) {
            intervalIndex = YMStand.getIntervalIndex(value, realNodeControl);

            if (intervalIndex === 2) {
                evaluate = 'good';
            } else {
                evaluate = 'bad';
            }
        }

        return {
            intervalIndex: intervalIndex,
            shownNodeControl: shownNodeControl,
            realNodeControl: realNodeControl,
            evaluate: evaluate,
            textControl: [_Localized.Localized.Global_Evaluation_water_Low, _Localized.Localized.Global_Evaluation_water_Standard, _Localized.Localized.Global_Evaluation_water_High]
        };
    };

    YMStand.getMuscleStand = function (_ref4, value) {
        var sex = _ref4.sex;
        var intervalIndex = 0;
        var evaluate = 'unknown';
        var shownNodeControl = [];
        var realNodeControl = [];

        if (sex === 1) {
            shownNodeControl = ['51.0%'];
            realNodeControl = [0, 51, 100];
        } else {
            shownNodeControl = ['46.0%'];
            realNodeControl = [0, 46, 100];
        }

        if (value > 0) {
            intervalIndex = YMStand.getIntervalIndex(value, realNodeControl);

            if (intervalIndex === 2) {
                evaluate = 'good';
            } else {
                evaluate = 'bad';
            }
        }

        return {
            intervalIndex: intervalIndex,
            evaluate: evaluate,
            shownNodeControl: shownNodeControl,
            realNodeControl: realNodeControl,
            textControl: [_Localized.Localized.Global_Evaluation_muscle_Low, _Localized.Localized.Global_Evaluation_muscle_Standard]
        };
    };

    YMStand.getBoneStand = function (value) {
        var intervalIndex = 0;
        var evaluate = 'unknown';
        var shownNodeControl = [];
        var realNodeControl = [];

        if (value > 0) {
            intervalIndex = 1;
            evaluate = 'good';
        }

        return {
            intervalIndex: intervalIndex,
            evaluate: evaluate,
            shownNodeControl: shownNodeControl,
            realNodeControl: realNodeControl,
            textControl: [_Localized.Localized.Global_Evaluation_bone_Normal]
        };
    };

    YMStand.getBMRStand = function (_ref5, fatValue) {
        var age = _ref5.age,
            sex = _ref5.sex;
        var intervalIndex = 0;
        var evaluate = 'unknown';
        var shownNodeControl = [];
        var realNodeControl = [];

        if (sex === 1) {
            if (age < 40) {
                realNodeControl = [0, 5, 26, 100];
            } else if (age < 60) {
                realNodeControl = [0, 5.5, 27, 100];
            } else {
                realNodeControl = [0, 6.5, 29, 100];
            }
        } else {
            if (age < 40) {
                realNodeControl = [0, 10, 39, 100];
            } else if (age < 60) {
                realNodeControl = [0, 10.5, 40, 100];
            } else {
                realNodeControl = [0, 11, 41, 100];
            }
        }

        if (fatValue > 0) {
            intervalIndex = YMStand.getIntervalIndex(fatValue, realNodeControl);

            if (intervalIndex === 2) {
                evaluate = 'good';
            } else {
                evaluate = 'bad';
                intervalIndex = 1;
            }
        }

        return {
            intervalIndex: intervalIndex,
            evaluate: evaluate,
            shownNodeControl: shownNodeControl,
            realNodeControl: realNodeControl,
            textControl: [_Localized.Localized.Global_Evaluation_bmr_Unstandard, _Localized.Localized.Global_Evaluation_bmr_Standard]
        };
    };

    YMStand.getVisFatStand = function (value) {
        var intervalIndex = 0;
        var evaluate = 'unknown';
        var shownNodeControl = ['10', '15'];
        var realNodeControl = [0, 10, 15, 30];

        if (value > 0) {
            intervalIndex = YMStand.getIntervalIndex(value, realNodeControl);

            if (intervalIndex === 1) {
                evaluate = 'good';
            } else {
                evaluate = 'bad';
            }
        }

        return {
            intervalIndex: intervalIndex,
            evaluate: evaluate,
            shownNodeControl: shownNodeControl,
            realNodeControl: realNodeControl,
            textControl: [_Localized.Localized.Global_Evaluation_visFat_Normal, _Localized.Localized.Global_Evaluation_visFat_High, _Localized.Localized.Global_Evaluation_visFat_VeryHigh]
        };
    };

    YMStand.getProteinStand = function (value) {
        var intervalIndex = 0;
        var evaluate = 'unknown';
        var shownNodeControl = ['16.0%', '20.0%'];
        var realNodeControl = [0, 16, 20, 30];

        if (value > 0) {
            intervalIndex = YMStand.getIntervalIndex(value, realNodeControl);

            if (intervalIndex === 2) {
                evaluate = 'good';
            } else {
                evaluate = 'bad';
            }
        }

        return {
            intervalIndex: intervalIndex,
            evaluate: evaluate,
            shownNodeControl: shownNodeControl,
            realNodeControl: realNodeControl,
            textControl: [_Localized.Localized.Global_Evaluation_protein_Low, _Localized.Localized.Global_Evaluation_protein_Normal, _Localized.Localized.Global_Evaluation_protein_High]
        };
    };

    YMStand.getSomaAgeStand = function (_ref6, value) {
        var age = _ref6.age;
        var intervalIndex = 0;
        var evaluate = 'unknown';
        var shownNodeControl = [];
        var realNodeControl = [];

        if (value > 0) {
            if (value <= age) {
                intervalIndex = 2;
                evaluate = 'good';
            } else {
                intervalIndex = 1;
                evaluate = 'bad';
            }
        }

        return {
            intervalIndex: intervalIndex,
            evaluate: evaluate,
            shownNodeControl: shownNodeControl,
            realNodeControl: realNodeControl,
            textControl: [_Localized.Localized.Global_Evaluation_somaAge_Old, _Localized.Localized.Global_Evaluation_somaAge_Young]
        };
    };

    YMStand.getFatMassStand = function (userInfo, fatValue, weight) {
        var fatStand = YMStand.getFatStand(userInfo, fatValue);
        var shownNodeControl = fatStand.realNodeControl.slice(1, 4).map(function (item) {
            return _Global.Function.converKgToOtherStringWithUnit(item * weight * 0.01, _YMUser2.default.getCurrentUserInfo().unit);
        });
        var realNodeControl = fatStand.realNodeControl.map(function (item) {
            return item * weight * 0.01;
        });
        return {
            intervalIndex: fatStand.intervalIndex,
            evaluate: fatStand.evaluate,
            shownNodeControl: shownNodeControl,
            realNodeControl: realNodeControl,
            textControl: [_Localized.Localized.Global_Evaluation_fatMass_Low, _Localized.Localized.Global_Evaluation_fatMass_Normal, _Localized.Localized.Global_Evaluation_fatMass_Fat, _Localized.Localized.Global_Evaluation_fatMass_Overweight]
        };
    };

    YMStand.getSomatotypeStand = function (userInfo, fatValue) {
        var intervalIndex = 0;
        var evaluate = 'unknown';
        var shownNodeControl = [];
        var realNodeControl = [];
        var fatStand = YMStand.getFatStand(userInfo, fatValue);

        if (fatStand.intervalIndex == 1) {
            intervalIndex = 8;
            evaluate = 'bad';
        } else if (fatStand.intervalIndex == 2) {
            intervalIndex = 5;
            evaluate = 'good';
        } else if (fatStand.intervalIndex == 3 || fatStand.intervalIndex == 4) {
            intervalIndex = 2;
            evaluate = 'bad';
        }

        return {
            intervalIndex: intervalIndex,
            evaluate: evaluate,
            shownNodeControl: shownNodeControl,
            realNodeControl: realNodeControl,
            textControl: [_Localized.Localized.Global_Evaluation_somatotype_RecessiveObesity, _Localized.Localized.Global_Evaluation_somatotype_Fat, _Localized.Localized.Global_Evaluation_somatotype_AthleticFat, _Localized.Localized.Global_Evaluation_somatotype_LackOfTraining, _Localized.Localized.Global_Evaluation_somatotype_Standard, _Localized.Localized.Global_Evaluation_somatotype_AthleticStandard, _Localized.Localized.Global_Evaluation_somatotype_Slim, _Localized.Localized.Global_Evaluation_somatotype_AthleticSlim, _Localized.Localized.Global_Evaluation_somatotype_Bodybuilding]
        };
    };

    YMStand.getBodyFatIndexStand = function (_ref7, value) {
        var age = _ref7.age,
            sex = _ref7.sex;
        var intervalIndex = 0;
        var evaluate = 'unknown';
        var shownNodeControl = ['2', '3', '4', '5', '6', '7'];
        var realNodeControl = [];

        if (age >= 18 && value > 0) {
            if (sex == 1) {
                realNodeControl = [0, 7.0, 12.0, 16.0, 21.0, 26.0, 30.0, 100];
            } else {
                realNodeControl = [0, 13.0, 20.0, 27.0, 34.0, 39.0, 45.0, 100];
            }
        }

        if (value > 0) {
            intervalIndex = YMStand.getIntervalIndex(value, realNodeControl);

            if (intervalIndex === 3 || intervalIndex === 4) {
                evaluate = 'good';
            } else {
                evaluate = 'bad';
            }
        }

        return {
            intervalIndex: intervalIndex,
            evaluate: evaluate,
            shownNodeControl: shownNodeControl,
            realNodeControl: realNodeControl,
            textControl: [_Localized.Localized.Global_Evaluation_bodyFatIndex_VeryLow, _Localized.Localized.Global_Evaluation_bodyFatIndex_Low, _Localized.Localized.Global_Evaluation_bodyFatIndex_Normal, _Localized.Localized.Global_Evaluation_bodyFatIndex_Good, _Localized.Localized.Global_Evaluation_bodyFatIndex_High, _Localized.Localized.Global_Evaluation_bodyFatIndex_VeryHigh, _Localized.Localized.Global_Evaluation_bodyFatIndex_ExtremelyHigh]
        };
    };

    YMStand.getObesityLevelStand = function (_ref8, value) {
        var sex = _ref8.sex;
        var intervalIndex = 0;
        var evaluate = 'unknown';
        var shownNodeControl = ['2', '3', '4'];
        var realNodeControl = [];

        if (sex == 1) {
            realNodeControl = [0, 21.0, 26.0, 30.0, 100];
        } else {
            realNodeControl = [0, 34.0, 39.0, 45.0, 100];
        }

        if (value > 0) {
            intervalIndex = YMStand.getIntervalIndex(value, realNodeControl);

            if (intervalIndex === 1) {
                evaluate = 'good';
            } else {
                evaluate = 'bad';
            }
        }

        return {
            intervalIndex: intervalIndex,
            evaluate: evaluate,
            shownNodeControl: shownNodeControl,
            realNodeControl: realNodeControl,
            textControl: [_Localized.Localized.Global_Evaluation_obesityLevel_NotObese, _Localized.Localized.Global_Evaluation_obesityLevel_BitFat, _Localized.Localized.Global_Evaluation_obesityLevel_Fat, _Localized.Localized.Global_Evaluation_obesityLevel_Overweight]
        };
    };

    YMStand.getNormalWeightStand = function (_ref9, weight) {
        var height = _ref9.height;
        var intervalIndex = 0;
        var evaluate = 'unknown';
        var shownNodeControl = [];
        var realNodeControl = [];
        var lowerBound = 18.5 * height * height * 0.0001;
        var upperBound = 24.0 * height * height * 0.0001;
        realNodeControl = [0, lowerBound, upperBound, 200];
        shownNodeControl = [lowerBound, upperBound].map(function (item) {
            return _Global.Function.converKgToOtherStringWithUnit(item, _YMUser2.default.getCurrentUserInfo().unit);
        });

        if (height > 0) {
            intervalIndex = YMStand.getIntervalIndex(weight, realNodeControl);
        }

        return {
            intervalIndex: intervalIndex,
            evaluate: evaluate,
            shownNodeControl: shownNodeControl,
            realNodeControl: realNodeControl,
            textControl: [_Localized.Localized.Global_Evaluation_normalWeight_Light, _Localized.Localized.Global_Evaluation_normalWeight_Normal, _Localized.Localized.Global_Evaluation_normalWeight_Weight]
        };
    };

    YMStand.getFatFreeMassStand = function () {
        var intervalIndex = 0;
        var evaluate = 'unknown';
        var shownNodeControl = [];
        var realNodeControl = [];
        return {
            intervalIndex: intervalIndex,
            shownNodeControl: shownNodeControl,
            realNodeControl: realNodeControl,
            textControl: [_Localized.Localized.Global_Evaluation_fatFreeMass_]
        };
    };

    exports.default = YMStand;
}, 10427, [10019, 10013, 10010], "projects/com.yunmai.scales.ios/Main/Tools/YMStand.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var _Global = _require(_dependencyMap[2]);

    var _Global2 = babelHelpers.interopRequireDefault(_Global);

    var _EvaluationView = _require(_dependencyMap[3]);

    var _EvaluationView2 = babelHelpers.interopRequireDefault(_EvaluationView);

    var _EvaluationCard = _require(_dependencyMap[4]);

    var _EvaluationCard2 = babelHelpers.interopRequireDefault(_EvaluationCard);

    var _YMStand = _require(_dependencyMap[5]);

    var _YMStand2 = babelHelpers.interopRequireDefault(_YMStand);

    var _YMUser = _require(_dependencyMap[6]);

    var _YMUser2 = babelHelpers.interopRequireDefault(_YMUser);

    var GridView = function (_Component) {
        babelHelpers.inherits(GridView, _Component);

        function GridView() {
            var _ref;

            var _temp, _this, _ret;

            babelHelpers.classCallCheck(this, GridView);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _ret = (_temp = (_this = babelHelpers.possibleConstructorReturn(this, (_ref = GridView.__proto__ || Object.getPrototypeOf(GridView)).call.apply(_ref, [this].concat(args))), _this), _this.push = function (event, data) {
                _this.props.navigation.navigate('EvaluationCard', {
                    data: data
                });
            }, _this.getGrdImg = function (type) {
                return _Global2.default["grd_" + type];
            }, _temp), babelHelpers.possibleConstructorReturn(_this, _ret);
        }

        babelHelpers.createClass(GridView, [{
            key: "render",
            value: function render() {
                var _this2 = this;

                var _props$data = this.props.data,
                    weight = _props$data.weight,
                    bmi = _props$data.bmi,
                    fat = _props$data.fat,
                    muscle = _props$data.muscle,
                    water = _props$data.water,
                    protein = _props$data.protein,
                    visFat = _props$data.visFat,
                    bone = _props$data.bone,
                    bmr = _props$data.bmr,
                    somaAge = _props$data.somaAge;
                var cellDatas = [{
                    type: 'bmi',
                    value: Number(bmi).toFixed(1)
                }, {
                    type: 'fat',
                    value: Number(fat).toFixed(1)
                }, {
                    type: 'muscle',
                    value: Number(muscle).toFixed(1)
                }, {
                    type: 'water',
                    value: Number(water).toFixed(1)
                }, {
                    type: 'protein',
                    value: Number(protein).toFixed(1)
                }, {
                    type: 'visFat',
                    value: Number(visFat).toFixed(0)
                }, {
                    type: 'fatMass',
                    value: Number(fat * weight / 100).toFixed(1),
                    fatValue: Number(fat).toFixed(1),
                    weight: Number(weight)
                }, {
                    type: 'bone',
                    value: weight ? (Number(bone) / Number(weight) * 100).toFixed(1) : '0',
                    boneValue: Number(bone).toFixed(1)
                }, {
                    type: 'bmr',
                    value: Number(bmr).toFixed(0),
                    fatValue: Number(fat).toFixed(1)
                }, {
                    type: 'somaAge',
                    value: Number(somaAge).toFixed(0)
                }, {
                    type: 'somatotype',
                    value: Number(fat).toFixed(1),
                    fatValue: Number(fat)
                }, {
                    type: 'bodyFatIndex',
                    value: Number(fat).toFixed(1)
                }, {
                    type: 'obesityLevel',
                    value: Number(fat).toFixed(1)
                }, {
                    type: 'normalWeight',
                    value: Number(weight).toFixed(1),
                    weight: Number(weight)
                }, {
                    type: 'fatFreeMass',
                    value: Number(fat > 5 ? (1 - fat / 100) * weight : 0).toFixed(1),
                    fatValue: Number(fat)
                }];
                var cellSize = {
                    standard: _Global2.default.screenWidth() / 3 - 0.5,
                    nonstandard: _Global2.default.screenWidth() / 3 - 0.5
                };
                var marginBottom = 0.5;
                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: [mainStyles.container, this.props.style]
                    },
                    cellDatas.map(function (item, index) {
                        return _react2.default.createElement(GridCell, {
                            key: 'gridCell' + index,
                            style: {
                                width: index % 3 ? cellSize.nonstandard : cellSize.standard,
                                height: cellSize.standard,
                                marginBottom: marginBottom
                            },
                            type: item.type,
                            onPress: function onPress(e) {
                                return _this2.push(e, item);
                            },
                            icon: _this2.getGrdImg(item.type),
                            indicatorText: _Global.Function.converInfo(item.type),
                            valueText: _Global.Function.textHandler(babelHelpers.extends({}, item, {
                                unit: _YMUser2.default.getCurrentUserInfo().unit
                            })),
                            stand: _YMStand2.default.getStand(item)
                        });
                    })
                );
            }
        }]);
        return GridView;
    }(_react.Component);

    exports.default = GridView;

    var GridCell = function (_Component2) {
        babelHelpers.inherits(GridCell, _Component2);

        function GridCell() {
            babelHelpers.classCallCheck(this, GridCell);
            return babelHelpers.possibleConstructorReturn(this, (GridCell.__proto__ || Object.getPrototypeOf(GridCell)).apply(this, arguments));
        }

        babelHelpers.createClass(GridCell, [{
            key: "render",
            value: function render() {
                var _props = this.props,
                    indicatorText = _props.indicatorText,
                    valueText = _props.valueText,
                    stand = _props.stand,
                    type = _props.type;
                var evaluationView = [_react2.default.createElement(
                    _reactNative.Text,
                    {
                        key: 'evaluationView text',
                        style: cellStyle.valueText
                    },
                    function () {
                        if (type === 'bodyFatIndex' || type === 'obesityLevel') {
                            return indicatorText + ' ' + stand.intervalIndex;
                        } else {
                            return indicatorText + ' ' + valueText;
                        }
                    }()
                ), _react2.default.createElement(_EvaluationView2.default, {
                    key: 'evaluationView stand',
                    stand: stand
                })];

                if (type === 'normalWeight' || type === 'fatFreeMass') {
                    evaluationView = [_react2.default.createElement(
                        _reactNative.Text,
                        {
                            key: 'evaluationView text',
                            style: cellStyle.valueText
                        },
                        indicatorText
                    ), _react2.default.createElement(
                        _reactNative.Text,
                        {
                            key: 'evaluationView stand',
                            style: {
                                fontSize: 12,
                                color: 'rgba(0, 0, 0, 0.8)',
                                marginTop: 2
                            }
                        },
                        valueText
                    )];
                } else if (type === 'somatotype') {
                    evaluationView = [_react2.default.createElement(
                        _reactNative.Text,
                        {
                            key: 'evaluationView text',
                            style: cellStyle.valueText
                        },
                        indicatorText
                    ), _react2.default.createElement(_EvaluationView2.default, {
                        key: 'evaluationView stand',
                        stand: stand
                    })];
                }

                return _react2.default.createElement(
                    _reactNative.TouchableHighlight,
                    {
                        underlayColor: 'transparent',
                        onPress: this.props.onPress
                    },
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: [cellStyle.container, this.props.style]
                        },
                        _react2.default.createElement(_reactNative.Image, {
                            style: cellStyle.icon,
                            source: this.props.icon
                        }),
                        evaluationView
                    )
                );
            }
        }]);
        return GridCell;
    }(_react.Component);

    var mainStyles = _reactNative.StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            backgroundColor: 'rgb(218, 218, 218)'
        }
    });

    var cellStyle = _reactNative.StyleSheet.create({
        container: {
            justifyContent: 'center',
            alignItems: "center",
            backgroundColor: 'white'
        },
        icon: {
            width: 30,
            height: 30
        },
        valueText: {
            width: _Global2.default.screenWidth() / 3 - 0.5,
            textAlign: "center",
            marginTop: 8,
            marginBottom: 8,
            fontSize: 14,
            color: 'rgba(0, 0, 0, 0.8)'
        }
    });
}, 10430, [10297, 10033, 10010, 10433, 10436, 10427, 10019], "projects/com.yunmai.scales.ios/Main/Home/GridView.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var EvaluationView = function (_Component) {
        babelHelpers.inherits(EvaluationView, _Component);

        function EvaluationView() {
            babelHelpers.classCallCheck(this, EvaluationView);
            return babelHelpers.possibleConstructorReturn(this, (EvaluationView.__proto__ || Object.getPrototypeOf(EvaluationView)).apply(this, arguments));
        }

        babelHelpers.createClass(EvaluationView, [{
            key: "render",
            value: function render() {
                var _props$stand = this.props.stand,
                    text = _props$stand.text,
                    evaluate = _props$stand.evaluate;
                var evaluationTextStyle = null;
                var containerStyle = {
                    backgroundColor: null,
                    paddingHorizontal: 6
                };

                if (evaluate === 'good') {
                    containerStyle.backgroundColor = 'rgb(37, 201, 152)';
                } else if (evaluate === 'unknown') {
                    containerStyle.backgroundColor = 'rgb(202, 202, 202)';
                    containerStyle.width = 36;
                    evaluationTextStyle = {
                        fontSize: 16,
                        lineHeight: 16
                    };
                } else {
                    containerStyle.backgroundColor = 'rgb(252, 182, 53)';
                }

                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: [style.container, containerStyle, this.props.style]
                    },
                    _react2.default.createElement(
                        _reactNative.Text,
                        {
                            style: [style.evaluationText, evaluationTextStyle]
                        },
                        text
                    )
                );
            }
        }]);
        return EvaluationView;
    }(_react.Component);

    exports.default = EvaluationView;

    var style = _reactNative.StyleSheet.create({
        container: {
            justifyContent: 'center',
            alignItems: 'center',
            height: 16,
            borderRadius: 2
        },
        evaluationText: {
            fontSize: 12,
            color: 'white'
        }
    });
}, 10433, [10297, 10033], "projects/com.yunmai.scales.ios/Main/EvaluationView.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var _Localized = _require(_dependencyMap[2]);

    var _Global = _require(_dependencyMap[3]);

    var _Global2 = babelHelpers.interopRequireDefault(_Global);

    var _NewNavBar = _require(_dependencyMap[4]);

    var _NewNavBar2 = babelHelpers.interopRequireDefault(_NewNavBar);

    var _YMStand = _require(_dependencyMap[5]);

    var _YMStand2 = babelHelpers.interopRequireDefault(_YMStand);

    var _YMUser = _require(_dependencyMap[6]);

    var _YMUser2 = babelHelpers.interopRequireDefault(_YMUser);

    var EvaluationCard = function (_Component) {
        babelHelpers.inherits(EvaluationCard, _Component);

        function EvaluationCard(props) {
            babelHelpers.classCallCheck(this, EvaluationCard);

            var _this = babelHelpers.possibleConstructorReturn(this, (EvaluationCard.__proto__ || Object.getPrototypeOf(EvaluationCard)).call(this, props));

            _this.getDescription = function (type) {
                return _Localized.Localized['EvaluationCard_Text_Description_' + type];
            };

            _this.getNodataImg = function (type) {
                return _Global2.default["elc_noData_" + type];
            };

            _this.getHasdataImg = function (type) {
                return _Global2.default["elc_" + type];
            };

            _this.getEvaluate = function (type, intervalIndex) {
                return _Localized.Localized['EvaluationCard_Text_Evaluate_' + type + '_' + intervalIndex];
            };

            _this.getSuggest = function (type, intervalIndex) {
                return _Localized.Localized['EvaluationCard_Text_Suggest_' + type + '_' + intervalIndex];
            };

            _this.state = {
                type: 'Null',
                value: null,
                fatValue: null,
                boneValue: null,
                weight: null
            };
            return _this;
        }

        babelHelpers.createClass(EvaluationCard, [{
            key: "componentDidMount",
            value: function componentDidMount() {
                this.setState({
                    type: this.props.navigation.state.params.data.type,
                    value: this.props.navigation.state.params.data.value,
                    fatValue: this.props.navigation.state.params.data.fatValue,
                    boneValue: this.props.navigation.state.params.data.boneValue,
                    weight: this.props.navigation.state.params.data.weight
                });
            }
        }, {
            key: "render",
            value: function render() {
                var _YMStand$getStand = _YMStand2.default.getStand(this.state),
                    text = _YMStand$getStand.text,
                    intervalIndex = _YMStand$getStand.intervalIndex,
                    shownNodeControl = _YMStand$getStand.shownNodeControl,
                    realNodeControl = _YMStand$getStand.realNodeControl,
                    colorControl = _YMStand$getStand.colorControl,
                    colorOffset = _YMStand$getStand.colorOffset,
                    textControl = _YMStand$getStand.textControl;

                var view = _react2.default.createElement(_reactNative.View, {
                    style: mainStyles.container
                });

                var _state = this.state,
                    type = _state.type,
                    value = _state.value,
                    fatValue = _state.fatValue,
                    boneValue = _state.boneValue,
                    weight = _state.weight;

                if (value == 0 || _Global.Function.equalNull(value)) {
                    view = [_react2.default.createElement(_reactNative.Image, {
                        key: 'No Data UI Image',
                        style: noDataStyle.icon,
                        source: this.getNodataImg(type)
                    }), _react2.default.createElement(
                        _reactNative.Text,
                        {
                            key: 'No Data UI Description',
                            style: noDataStyle.description
                        },
                        this.getDescription(type)
                    ), _react2.default.createElement(ColorfulSlider, {
                        key: 'No Data UI ColorfulSlider',
                        haveData: false,
                        style: noDataStyle.colorfulSliderArea,
                        type: type,
                        shownNodeControl: shownNodeControl,
                        realNodeControl: realNodeControl,
                        colorControl: colorControl,
                        colorOffset: colorOffset,
                        textControl: textControl
                    })];

                    if (type === 'somatotype') {
                        view = _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: somatotypeStyle.container
                            },
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: [somatotypeStyle.childContainer, {
                                        flexDirection: 'row'
                                    }]
                                },
                                _react2.default.createElement(
                                    _reactNative.View,
                                    {
                                        style: somatotypeStyle.yAxisView
                                    },
                                    _react2.default.createElement(
                                        _reactNative.View,
                                        {
                                            style: [somatotypeStyle.childContainer, {
                                                justifyContent: 'center'
                                            }]
                                        },
                                        _react2.default.createElement(
                                            _reactNative.Text,
                                            {
                                                style: somatotypeStyle.axisText
                                            },
                                            '体'
                                        ),
                                        _react2.default.createElement(
                                            _reactNative.Text,
                                            {
                                                style: somatotypeStyle.axisText
                                            },
                                            '脂'
                                        ),
                                        _react2.default.createElement(
                                            _reactNative.Text,
                                            {
                                                style: somatotypeStyle.axisText
                                            },
                                            '率'
                                        )
                                    ),
                                    _react2.default.createElement(_reactNative.Image, {
                                        style: somatotypeStyle.yAxisImage,
                                        source: _Global2.default.elc_somatotype_yAxis
                                    })
                                ),
                                _react2.default.createElement(
                                    _reactNative.View,
                                    {
                                        style: somatotypeStyle.childContainer
                                    },
                                    _react2.default.createElement(
                                        _reactNative.View,
                                        {
                                            style: [somatotypeStyle.childContainer, {
                                                flexDirection: 'row'
                                            }]
                                        },
                                        _react2.default.createElement(
                                            _reactNative.View,
                                            {
                                                style: somatotypeStyle.childContainer
                                            },
                                            _react2.default.createElement(
                                                _reactNative.View,
                                                {
                                                    style: somatotypeStyle.cell
                                                },
                                                _react2.default.createElement(_reactNative.Image, {
                                                    style: somatotypeStyle.cellImage,
                                                    source: _Global2.default.elc_somatotype_RecessiveObesity
                                                }),
                                                _react2.default.createElement(
                                                    _reactNative.Text,
                                                    {
                                                        style: somatotypeStyle.cellText
                                                    },
                                                    _Localized.Localized.EvaluationCard_Text_somatotype_RecessiveObesity
                                                )
                                            )
                                        ),
                                        _react2.default.createElement(_reactNative.View, {
                                            style: [somatotypeStyle.separator, {
                                                width: 1,
                                                marginTop: 6
                                            }]
                                        }),
                                        _react2.default.createElement(
                                            _reactNative.View,
                                            {
                                                style: somatotypeStyle.childContainer
                                            },
                                            _react2.default.createElement(
                                                _reactNative.View,
                                                {
                                                    style: somatotypeStyle.cell
                                                },
                                                _react2.default.createElement(_reactNative.Image, {
                                                    style: somatotypeStyle.cellImage,
                                                    source: _Global2.default.elc_somatotype_Fat
                                                }),
                                                _react2.default.createElement(
                                                    _reactNative.Text,
                                                    {
                                                        style: somatotypeStyle.cellText
                                                    },
                                                    _Localized.Localized.EvaluationCard_Text_somatotype_Fat
                                                )
                                            )
                                        ),
                                        _react2.default.createElement(_reactNative.View, {
                                            style: [somatotypeStyle.separator, {
                                                width: 1,
                                                marginTop: 6
                                            }]
                                        }),
                                        _react2.default.createElement(
                                            _reactNative.View,
                                            {
                                                style: somatotypeStyle.childContainer
                                            },
                                            _react2.default.createElement(
                                                _reactNative.View,
                                                {
                                                    style: somatotypeStyle.cell
                                                },
                                                _react2.default.createElement(_reactNative.Image, {
                                                    style: somatotypeStyle.cellImage,
                                                    source: _Global2.default.elc_somatotype_AthleticFat
                                                }),
                                                _react2.default.createElement(
                                                    _reactNative.Text,
                                                    {
                                                        style: somatotypeStyle.cellText
                                                    },
                                                    _Localized.Localized.EvaluationCard_Text_somatotype_AthleticFat
                                                )
                                            )
                                        )
                                    ),
                                    _react2.default.createElement(_reactNative.View, {
                                        style: [somatotypeStyle.separator, {
                                            height: 1,
                                            marginLeft: 6,
                                            marginRight: 6
                                        }]
                                    }),
                                    _react2.default.createElement(
                                        _reactNative.View,
                                        {
                                            style: [somatotypeStyle.childContainer, {
                                                flexDirection: 'row'
                                            }]
                                        },
                                        _react2.default.createElement(
                                            _reactNative.View,
                                            {
                                                style: somatotypeStyle.childContainer
                                            },
                                            _react2.default.createElement(
                                                _reactNative.View,
                                                {
                                                    style: somatotypeStyle.cell
                                                },
                                                _react2.default.createElement(_reactNative.Image, {
                                                    style: somatotypeStyle.cellImage,
                                                    source: _Global2.default.elc_somatotype_LackOfTraining
                                                }),
                                                _react2.default.createElement(
                                                    _reactNative.Text,
                                                    {
                                                        style: somatotypeStyle.cellText
                                                    },
                                                    _Localized.Localized.EvaluationCard_Text_somatotype_LackOfTraining
                                                )
                                            )
                                        ),
                                        _react2.default.createElement(_reactNative.View, {
                                            style: [somatotypeStyle.separator, {
                                                width: 1
                                            }]
                                        }),
                                        _react2.default.createElement(
                                            _reactNative.View,
                                            {
                                                style: somatotypeStyle.childContainer
                                            },
                                            _react2.default.createElement(
                                                _reactNative.View,
                                                {
                                                    style: somatotypeStyle.cell
                                                },
                                                _react2.default.createElement(_reactNative.Image, {
                                                    style: somatotypeStyle.cellImage,
                                                    source: _Global2.default.elc_somatotype_Standard
                                                }),
                                                _react2.default.createElement(
                                                    _reactNative.Text,
                                                    {
                                                        style: somatotypeStyle.cellText
                                                    },
                                                    _Localized.Localized.EvaluationCard_Text_somatotype_Standard
                                                )
                                            )
                                        ),
                                        _react2.default.createElement(_reactNative.View, {
                                            style: [somatotypeStyle.separator, {
                                                width: 1
                                            }]
                                        }),
                                        _react2.default.createElement(
                                            _reactNative.View,
                                            {
                                                style: somatotypeStyle.childContainer
                                            },
                                            _react2.default.createElement(
                                                _reactNative.View,
                                                {
                                                    style: somatotypeStyle.cell
                                                },
                                                _react2.default.createElement(_reactNative.Image, {
                                                    style: somatotypeStyle.cellImage,
                                                    source: _Global2.default.elc_somatotype_AthleticStandard
                                                }),
                                                _react2.default.createElement(
                                                    _reactNative.Text,
                                                    {
                                                        style: somatotypeStyle.cellText
                                                    },
                                                    _Localized.Localized.EvaluationCard_Text_somatotype_AthleticStandard
                                                )
                                            )
                                        )
                                    ),
                                    _react2.default.createElement(_reactNative.View, {
                                        style: [somatotypeStyle.separator, {
                                            height: 1,
                                            marginLeft: 6,
                                            marginRight: 6
                                        }]
                                    }),
                                    _react2.default.createElement(
                                        _reactNative.View,
                                        {
                                            style: [somatotypeStyle.childContainer, {
                                                flexDirection: 'row'
                                            }]
                                        },
                                        _react2.default.createElement(
                                            _reactNative.View,
                                            {
                                                style: somatotypeStyle.childContainer
                                            },
                                            _react2.default.createElement(
                                                _reactNative.View,
                                                {
                                                    style: somatotypeStyle.cell
                                                },
                                                _react2.default.createElement(_reactNative.Image, {
                                                    style: somatotypeStyle.cellImage,
                                                    source: _Global2.default.elc_somatotype_Slim
                                                }),
                                                _react2.default.createElement(
                                                    _reactNative.Text,
                                                    {
                                                        style: somatotypeStyle.cellText
                                                    },
                                                    _Localized.Localized.EvaluationCard_Text_somatotype_Slim
                                                )
                                            )
                                        ),
                                        _react2.default.createElement(_reactNative.View, {
                                            style: [somatotypeStyle.separator, {
                                                width: 1,
                                                marginBottom: 6
                                            }]
                                        }),
                                        _react2.default.createElement(
                                            _reactNative.View,
                                            {
                                                style: somatotypeStyle.childContainer
                                            },
                                            _react2.default.createElement(
                                                _reactNative.View,
                                                {
                                                    style: somatotypeStyle.cell
                                                },
                                                _react2.default.createElement(_reactNative.Image, {
                                                    style: somatotypeStyle.cellImage,
                                                    source: _Global2.default.elc_somatotype_AthleticSlim
                                                }),
                                                _react2.default.createElement(
                                                    _reactNative.Text,
                                                    {
                                                        style: somatotypeStyle.cellText
                                                    },
                                                    _Localized.Localized.EvaluationCard_Text_somatotype_AthleticSlim
                                                )
                                            )
                                        ),
                                        _react2.default.createElement(_reactNative.View, {
                                            style: [somatotypeStyle.separator, {
                                                width: 1,
                                                marginBottom: 6
                                            }]
                                        }),
                                        _react2.default.createElement(
                                            _reactNative.View,
                                            {
                                                style: somatotypeStyle.childContainer
                                            },
                                            _react2.default.createElement(
                                                _reactNative.View,
                                                {
                                                    style: somatotypeStyle.cell
                                                },
                                                _react2.default.createElement(_reactNative.Image, {
                                                    style: somatotypeStyle.cellImage,
                                                    source: _Global2.default.elc_somatotype_Bodybuilding
                                                }),
                                                _react2.default.createElement(
                                                    _reactNative.Text,
                                                    {
                                                        style: somatotypeStyle.cellText
                                                    },
                                                    _Localized.Localized.EvaluationCard_Text_somatotype_Bodybuilding
                                                )
                                            )
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: {
                                        height: 21.5
                                    }
                                },
                                _react2.default.createElement(_reactNative.Image, {
                                    style: somatotypeStyle.xAxisImage,
                                    source: _Global2.default.elc_somatotype_xAxis
                                }),
                                _react2.default.createElement(
                                    _reactNative.Text,
                                    {
                                        style: [somatotypeStyle.axisText, {
                                            marginLeft: 15
                                        }]
                                    },
                                    '肌肉率'
                                )
                            )
                        );
                    }
                } else {
                    view = [_react2.default.createElement(
                        _reactNative.View,
                        {
                            key: 'Have Data UI TopArea',
                            style: haveDataStyle.topArea
                        },
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: haveDataStyle.valueView
                            },
                            _react2.default.createElement(_reactNative.Image, {
                                style: haveDataStyle.typeIcon,
                                source: this.getHasdataImg(type)
                            }),
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: haveDataStyle.valueText
                                },
                                function () {
                                    if (type === 'bodyFatIndex' || type === 'obesityLevel') {
                                        return intervalIndex;
                                    } else {
                                        return _Global.Function.textHandler({
                                            type: type,
                                            value: value,
                                            unit: _YMUser2.default.getCurrentUserInfo().unit
                                        });
                                    }
                                }()
                            ),
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: [haveDataStyle.evaluationText, {
                                        opacity: type === 'normalWeight' || type === 'fatFreeMass' ? 0 : 1
                                    }]
                                },
                                text
                            )
                        ),
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: {
                                    flex: 1
                                }
                            },
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: haveDataStyle.descriptionText
                                },
                                this.getDescription(type)
                            )
                        )
                    ), _react2.default.createElement(ColorfulSlider, {
                        key: 'Have Data UI ColorfulSlider',
                        haveData: true,
                        style: haveDataStyle.colorfulSliderArea,
                        type: type,
                        shownNodeControl: shownNodeControl,
                        realNodeControl: realNodeControl,
                        colorControl: colorControl,
                        colorOffset: colorOffset,
                        textControl: textControl,
                        sliderParameter: {
                            intervalIndex: intervalIndex,
                            value: value,
                            boneValue: boneValue,
                            fatValue: fatValue
                        }
                    }), _react2.default.createElement(_reactNative.View, {
                        key: 'Have Data UI Separator',
                        style: haveDataStyle.separator
                    }), _react2.default.createElement(
                        _reactNative.View,
                        {
                            key: 'Have Data UI BottomArea',
                            style: haveDataStyle.bottomArea
                        },
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: haveDataStyle.analysesView
                            },
                            _react2.default.createElement(_reactNative.Image, {
                                style: haveDataStyle.icon,
                                source: _Global2.default.elc_analyses
                            }),
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: haveDataStyle.analysesTitle
                                },
                                function () {
                                    if (type === 'normalWeight') {
                                        return _Localized.Localized.Global_UserInfo_Weight + _Localized.Localized.Global_Text_Space + text;
                                    } else if (type === 'obesityLevel') {
                                        return text;
                                    } else {
                                        return _Global.Function.converInfo(type) + _Localized.Localized.Global_Text_Space + text;
                                    }
                                }()
                            )
                        ),
                        _react2.default.createElement(
                            _reactNative.Text,
                            {
                                style: haveDataStyle.analysesText
                            },
                            this.getEvaluate(type, intervalIndex)
                        ),
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: haveDataStyle.tipsView
                            },
                            _react2.default.createElement(_reactNative.Image, {
                                style: haveDataStyle.icon,
                                source: _Global2.default.elc_bulb
                            }),
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: haveDataStyle.tipsTitle
                                },
                                _Localized.Localized.EvaluationCard_Text_Suggest
                            )
                        ),
                        _react2.default.createElement(
                            _reactNative.Text,
                            {
                                style: haveDataStyle.tipsText
                            },
                            this.getSuggest(type, intervalIndex)
                        )
                    )];

                    if (type === 'fatFreeMass') {
                        view = view.slice(0, 2);
                    } else if (type === 'somatotype') {
                        view = [_react2.default.createElement(
                            _reactNative.View,
                            {
                                key: 'Have Data UI TopArea',
                                style: somatotypeStyle.container
                            },
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: [somatotypeStyle.childContainer, {
                                        flexDirection: 'row'
                                    }]
                                },
                                _react2.default.createElement(
                                    _reactNative.View,
                                    {
                                        style: somatotypeStyle.yAxisView
                                    },
                                    _react2.default.createElement(
                                        _reactNative.View,
                                        {
                                            style: [somatotypeStyle.childContainer, {
                                                justifyContent: 'center'
                                            }]
                                        },
                                        _react2.default.createElement(
                                            _reactNative.Text,
                                            {
                                                style: somatotypeStyle.axisText
                                            },
                                            '体'
                                        ),
                                        _react2.default.createElement(
                                            _reactNative.Text,
                                            {
                                                style: somatotypeStyle.axisText
                                            },
                                            '脂'
                                        ),
                                        _react2.default.createElement(
                                            _reactNative.Text,
                                            {
                                                style: somatotypeStyle.axisText
                                            },
                                            '率'
                                        )
                                    ),
                                    _react2.default.createElement(_reactNative.Image, {
                                        style: somatotypeStyle.yAxisImage,
                                        source: _Global2.default.elc_somatotype_yAxis
                                    })
                                ),
                                _react2.default.createElement(
                                    _reactNative.View,
                                    {
                                        style: somatotypeStyle.childContainer
                                    },
                                    _react2.default.createElement(
                                        _reactNative.View,
                                        {
                                            style: [somatotypeStyle.childContainer, {
                                                flexDirection: 'row'
                                            }]
                                        },
                                        _react2.default.createElement(
                                            _reactNative.View,
                                            {
                                                style: somatotypeStyle.childContainer
                                            },
                                            _react2.default.createElement(
                                                _reactNative.View,
                                                {
                                                    style: [somatotypeStyle.cell, {
                                                        backgroundColor: intervalIndex === 1 ? "rgb(75.0, 214.0, 99.0)" : "white"
                                                    }]
                                                },
                                                _react2.default.createElement(_reactNative.Image, {
                                                    style: somatotypeStyle.cellImage,
                                                    source: intervalIndex == 1 ? _Global2.default.elc_somatotype_RecessiveObesity_Highlight : _Global2.default.elc_somatotype_RecessiveObesity
                                                }),
                                                _react2.default.createElement(
                                                    _reactNative.Text,
                                                    {
                                                        style: [somatotypeStyle.cellText, {
                                                            color: intervalIndex === 1 ? "white" : "rgb(136, 136, 136)"
                                                        }]
                                                    },
                                                    _Localized.Localized.EvaluationCard_Text_somatotype_RecessiveObesity
                                                )
                                            )
                                        ),
                                        _react2.default.createElement(_reactNative.View, {
                                            style: [somatotypeStyle.separator, {
                                                width: 1,
                                                marginTop: 6
                                            }]
                                        }),
                                        _react2.default.createElement(
                                            _reactNative.View,
                                            {
                                                style: somatotypeStyle.childContainer
                                            },
                                            _react2.default.createElement(
                                                _reactNative.View,
                                                {
                                                    style: [somatotypeStyle.cell, {
                                                        backgroundColor: intervalIndex === 2 ? "rgb(75.0, 214.0, 99.0)" : "white"
                                                    }]
                                                },
                                                _react2.default.createElement(_reactNative.Image, {
                                                    style: somatotypeStyle.cellImage,
                                                    source: intervalIndex == 2 ? _Global2.default.elc_somatotype_Fat_Highlight : _Global2.default.elc_somatotype_Fat
                                                }),
                                                _react2.default.createElement(
                                                    _reactNative.Text,
                                                    {
                                                        style: [somatotypeStyle.cellText, {
                                                            color: intervalIndex === 2 ? "white" : "rgb(136, 136, 136)"
                                                        }]
                                                    },
                                                    _Localized.Localized.EvaluationCard_Text_somatotype_Fat
                                                )
                                            )
                                        ),
                                        _react2.default.createElement(_reactNative.View, {
                                            style: [somatotypeStyle.separator, {
                                                width: 1,
                                                marginTop: 6
                                            }]
                                        }),
                                        _react2.default.createElement(
                                            _reactNative.View,
                                            {
                                                style: somatotypeStyle.childContainer
                                            },
                                            _react2.default.createElement(
                                                _reactNative.View,
                                                {
                                                    style: [somatotypeStyle.cell, {
                                                        backgroundColor: intervalIndex === 3 ? "rgb(75.0, 214.0, 99.0)" : "white"
                                                    }]
                                                },
                                                _react2.default.createElement(_reactNative.Image, {
                                                    style: somatotypeStyle.cellImage,
                                                    source: intervalIndex == 3 ? _Global2.default.elc_somatotype_AthleticFat_Highlight : _Global2.default.elc_somatotype_AthleticFat
                                                }),
                                                _react2.default.createElement(
                                                    _reactNative.Text,
                                                    {
                                                        style: [somatotypeStyle.cellText, {
                                                            color: intervalIndex === 3 ? "white" : "rgb(136, 136, 136)"
                                                        }]
                                                    },
                                                    _Localized.Localized.EvaluationCard_Text_somatotype_AthleticFat
                                                )
                                            )
                                        )
                                    ),
                                    _react2.default.createElement(_reactNative.View, {
                                        style: [somatotypeStyle.separator, {
                                            height: 1,
                                            marginLeft: 6,
                                            marginRight: 6
                                        }]
                                    }),
                                    _react2.default.createElement(
                                        _reactNative.View,
                                        {
                                            style: [somatotypeStyle.childContainer, {
                                                flexDirection: 'row'
                                            }]
                                        },
                                        _react2.default.createElement(
                                            _reactNative.View,
                                            {
                                                style: somatotypeStyle.childContainer
                                            },
                                            _react2.default.createElement(
                                                _reactNative.View,
                                                {
                                                    style: [somatotypeStyle.cell, {
                                                        backgroundColor: intervalIndex === 4 ? "rgb(75.0, 214.0, 99.0)" : "white"
                                                    }]
                                                },
                                                _react2.default.createElement(_reactNative.Image, {
                                                    style: somatotypeStyle.cellImage,
                                                    source: intervalIndex == 4 ? _Global2.default.elc_somatotype_LackOfTraining_Highlight : _Global2.default.elc_somatotype_LackOfTraining
                                                }),
                                                _react2.default.createElement(
                                                    _reactNative.Text,
                                                    {
                                                        style: [somatotypeStyle.cellText, {
                                                            color: intervalIndex === 4 ? "white" : "rgb(136, 136, 136)"
                                                        }]
                                                    },
                                                    _Localized.Localized.EvaluationCard_Text_somatotype_LackOfTraining
                                                )
                                            )
                                        ),
                                        _react2.default.createElement(_reactNative.View, {
                                            style: [somatotypeStyle.separator, {
                                                width: 1
                                            }]
                                        }),
                                        _react2.default.createElement(
                                            _reactNative.View,
                                            {
                                                style: somatotypeStyle.childContainer
                                            },
                                            _react2.default.createElement(
                                                _reactNative.View,
                                                {
                                                    style: [somatotypeStyle.cell, {
                                                        backgroundColor: intervalIndex === 5 ? "rgb(75.0, 214.0, 99.0)" : "white"
                                                    }]
                                                },
                                                _react2.default.createElement(_reactNative.Image, {
                                                    style: somatotypeStyle.cellImage,
                                                    source: intervalIndex == 5 ? _Global2.default.elc_somatotype_Standard_Highlight : _Global2.default.elc_somatotype_Standard
                                                }),
                                                _react2.default.createElement(
                                                    _reactNative.Text,
                                                    {
                                                        style: [somatotypeStyle.cellText, {
                                                            color: intervalIndex === 5 ? "white" : "rgb(136, 136, 136)"
                                                        }]
                                                    },
                                                    _Localized.Localized.EvaluationCard_Text_somatotype_Standard
                                                )
                                            )
                                        ),
                                        _react2.default.createElement(_reactNative.View, {
                                            style: [somatotypeStyle.separator, {
                                                width: 1
                                            }]
                                        }),
                                        _react2.default.createElement(
                                            _reactNative.View,
                                            {
                                                style: somatotypeStyle.childContainer
                                            },
                                            _react2.default.createElement(
                                                _reactNative.View,
                                                {
                                                    style: [somatotypeStyle.cell, {
                                                        backgroundColor: intervalIndex === 6 ? "rgb(75.0, 214.0, 99.0)" : "white"
                                                    }]
                                                },
                                                _react2.default.createElement(_reactNative.Image, {
                                                    style: somatotypeStyle.cellImage,
                                                    source: intervalIndex == 6 ? _Global2.default.elc_somatotype_AthleticStandard_Highlight : _Global2.default.elc_somatotype_AthleticStandard
                                                }),
                                                _react2.default.createElement(
                                                    _reactNative.Text,
                                                    {
                                                        style: [somatotypeStyle.cellText, {
                                                            color: intervalIndex === 6 ? "white" : "rgb(136, 136, 136)"
                                                        }]
                                                    },
                                                    _Localized.Localized.EvaluationCard_Text_somatotype_AthleticStandard
                                                )
                                            )
                                        )
                                    ),
                                    _react2.default.createElement(_reactNative.View, {
                                        style: [somatotypeStyle.separator, {
                                            height: 1,
                                            marginLeft: 6,
                                            marginRight: 6
                                        }]
                                    }),
                                    _react2.default.createElement(
                                        _reactNative.View,
                                        {
                                            style: [somatotypeStyle.childContainer, {
                                                flexDirection: 'row'
                                            }]
                                        },
                                        _react2.default.createElement(
                                            _reactNative.View,
                                            {
                                                style: somatotypeStyle.childContainer
                                            },
                                            _react2.default.createElement(
                                                _reactNative.View,
                                                {
                                                    style: [somatotypeStyle.cell, {
                                                        backgroundColor: intervalIndex === 7 ? "rgb(75.0, 214.0, 99.0)" : "white"
                                                    }]
                                                },
                                                _react2.default.createElement(_reactNative.Image, {
                                                    style: somatotypeStyle.cellImage,
                                                    source: intervalIndex == 7 ? _Global2.default.elc_somatotype_Slim_Highlight : _Global2.default.elc_somatotype_Slim
                                                }),
                                                _react2.default.createElement(
                                                    _reactNative.Text,
                                                    {
                                                        style: [somatotypeStyle.cellText, {
                                                            color: intervalIndex === 7 ? "white" : "rgb(136, 136, 136)"
                                                        }]
                                                    },
                                                    _Localized.Localized.EvaluationCard_Text_somatotype_Slim
                                                )
                                            )
                                        ),
                                        _react2.default.createElement(_reactNative.View, {
                                            style: [somatotypeStyle.separator, {
                                                width: 1,
                                                marginBottom: 6
                                            }]
                                        }),
                                        _react2.default.createElement(
                                            _reactNative.View,
                                            {
                                                style: somatotypeStyle.childContainer
                                            },
                                            _react2.default.createElement(
                                                _reactNative.View,
                                                {
                                                    style: [somatotypeStyle.cell, {
                                                        backgroundColor: intervalIndex === 8 ? "rgb(75.0, 214.0, 99.0)" : "white"
                                                    }]
                                                },
                                                _react2.default.createElement(_reactNative.Image, {
                                                    style: somatotypeStyle.cellImage,
                                                    source: intervalIndex == 8 ? _Global2.default.elc_somatotype_AthleticSlim_Highlight : _Global2.default.elc_somatotype_AthleticSlim
                                                }),
                                                _react2.default.createElement(
                                                    _reactNative.Text,
                                                    {
                                                        style: [somatotypeStyle.cellText, {
                                                            color: intervalIndex === 8 ? "white" : "rgb(136, 136, 136)"
                                                        }]
                                                    },
                                                    _Localized.Localized.EvaluationCard_Text_somatotype_AthleticSlim
                                                )
                                            )
                                        ),
                                        _react2.default.createElement(_reactNative.View, {
                                            style: [somatotypeStyle.separator, {
                                                width: 1,
                                                marginBottom: 6
                                            }]
                                        }),
                                        _react2.default.createElement(
                                            _reactNative.View,
                                            {
                                                style: somatotypeStyle.childContainer
                                            },
                                            _react2.default.createElement(
                                                _reactNative.View,
                                                {
                                                    style: [somatotypeStyle.cell, {
                                                        backgroundColor: intervalIndex === 9 ? "rgb(75.0, 214.0, 99.0)" : "white"
                                                    }]
                                                },
                                                _react2.default.createElement(_reactNative.Image, {
                                                    style: somatotypeStyle.cellImage,
                                                    source: intervalIndex == 9 ? _Global2.default.elc_somatotype_Bodybuilding_Highlight : _Global2.default.elc_somatotype_Bodybuilding
                                                }),
                                                _react2.default.createElement(
                                                    _reactNative.Text,
                                                    {
                                                        style: [somatotypeStyle.cellText, {
                                                            color: intervalIndex === 9 ? "white" : "rgb(136, 136, 136)"
                                                        }]
                                                    },
                                                    _Localized.Localized.EvaluationCard_Text_somatotype_Bodybuilding
                                                )
                                            )
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: {
                                        height: 21.5
                                    }
                                },
                                _react2.default.createElement(_reactNative.Image, {
                                    style: somatotypeStyle.xAxisImage,
                                    source: _Global2.default.elc_somatotype_xAxis
                                }),
                                _react2.default.createElement(
                                    _reactNative.Text,
                                    {
                                        style: [somatotypeStyle.axisText, {
                                            marginLeft: 15
                                        }]
                                    },
                                    '肌肉率'
                                )
                            )
                        ), _react2.default.createElement(_reactNative.View, {
                            key: 'Have Data UI Separator',
                            style: haveDataStyle.separator
                        }), _react2.default.createElement(
                            _reactNative.View,
                            {
                                key: 'Have Data UI BottomArea',
                                style: haveDataStyle.bottomArea
                            },
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: haveDataStyle.analysesView
                                },
                                _react2.default.createElement(_reactNative.Image, {
                                    style: haveDataStyle.icon,
                                    source: _Global2.default.elc_analyses
                                }),
                                _react2.default.createElement(
                                    _reactNative.Text,
                                    {
                                        style: haveDataStyle.analysesTitle
                                    },
                                    text
                                )
                            ),
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: haveDataStyle.analysesText
                                },
                                this.getEvaluate(type, intervalIndex)
                            ),
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: haveDataStyle.tipsView
                                },
                                _react2.default.createElement(_reactNative.Image, {
                                    style: haveDataStyle.icon,
                                    source: _Global2.default.elc_bulb
                                }),
                                _react2.default.createElement(
                                    _reactNative.Text,
                                    {
                                        style: haveDataStyle.tipsTitle
                                    },
                                    _Localized.Localized.EvaluationCard_Text_Suggest
                                )
                            ),
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: haveDataStyle.tipsText
                                },
                                this.getSuggest(type, intervalIndex)
                            )
                        )];
                    }
                }

                return _react2.default.createElement(
                    _reactNative.View,
                    null,
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: mainStyles.container
                        },
                        view
                    )
                );
            }
        }]);
        return EvaluationCard;
    }(_react.Component);

    EvaluationCard.navigationOptions = function (_ref) {
        var navigation = _ref.navigation;
        return {
            header: _react2.default.createElement(_NewNavBar2.default, {
                haveDividerLine: false,
                style: navStyles.bar,
                type: "dark",
                title: _Global.Function.converInfo(navigation.state.params.data.type),
                onPressLeft: function onPressLeft() {
                    navigation.goBack();
                }
            })
        };
    };

    exports.default = EvaluationCard;

    var ColorfulSlider = function (_Component2) {
        babelHelpers.inherits(ColorfulSlider, _Component2);

        function ColorfulSlider() {
            var _ref2;

            var _temp, _this2, _ret;

            babelHelpers.classCallCheck(this, ColorfulSlider);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _ret = (_temp = (_this2 = babelHelpers.possibleConstructorReturn(this, (_ref2 = ColorfulSlider.__proto__ || Object.getPrototypeOf(ColorfulSlider)).call.apply(_ref2, [this].concat(args))), _this2), _this2.getSliderImg = function (intervalIndex, colorOffset) {
                return _Global2.default["elc_slider" + (intervalIndex + colorOffset)];
            }, _temp), babelHelpers.possibleConstructorReturn(_this2, _ret);
        }

        babelHelpers.createClass(ColorfulSlider, [{
            key: "render",
            value: function render() {
                var _props = this.props,
                    shownNodeControl = _props.shownNodeControl,
                    realNodeControl = _props.realNodeControl,
                    colorControl = _props.colorControl,
                    colorOffset = _props.colorOffset,
                    textControl = _props.textControl,
                    haveData = _props.haveData,
                    _props$type = _props.type,
                    type = _props$type === undefined ? 'Null' : _props$type,
                    style = _props.style,
                    sliderParameter = _props.sliderParameter;
                var intervalIndex = 0;
                var value = 0;
                var boneValue = 0;
                var fatValue = 0;

                if (sliderParameter) {
                    boneValue = sliderParameter.boneValue;
                    fatValue = sliderParameter.fatValue;
                    value = sliderParameter.value;
                    intervalIndex = sliderParameter.intervalIndex;
                }

                var nodeTextArea = _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: colorfulSliderStyle.nodeTextArea
                    },
                    shownNodeControl.map(function (item, index) {
                        return _react2.default.createElement(
                            _reactNative.Text,
                            {
                                key: 'nodeText' + index,
                                style: [colorfulSliderStyle.nodeText, {
                                    width: (_Global2.default.screenWidth() - 50) / colorControl.length
                                }]
                            },
                            item
                        );
                    })
                );

                var intervalWidth = Math.ceil((_Global2.default.screenWidth() - 50) / colorControl.length);

                var slider = _react2.default.createElement(_reactNative.View, null);

                if (type != 'Null' && type != 'bmr' && type != 'bone' && type != 'somaAge' && type != 'fatFreeMass') {
                    var intervalOffsetRatio = 0;

                    if (value >= realNodeControl[realNodeControl.length - 1]) {
                        intervalOffsetRatio = 1;
                    } else {
                        var intervalLeft = realNodeControl[intervalIndex - 1];
                        var intervalRight = realNodeControl[intervalIndex];
                        intervalOffsetRatio = (value - intervalLeft) / (intervalRight - intervalLeft);
                    }

                    var offsetX = intervalWidth * (intervalIndex - 1 + intervalOffsetRatio) - 5;
                    if (intervalIndex > -1 && !_Global.Function.equalNull(intervalIndex) && value > 0 && !_Global.Function.equalNull(value)) slider = _react2.default.createElement(_reactNative.Image, {
                        style: [colorfulSliderStyle.slider, {
                            left: offsetX
                        }],
                        source: this.getSliderImg(intervalIndex, colorOffset)
                    });
                }

                var colorfulBar = _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: colorfulSliderStyle.colorfulBar
                    },
                    colorControl.map(function (item, index) {
                        return _react2.default.createElement(_reactNative.View, {
                            key: 'colorfulBar' + index,
                            style: [colorfulSliderStyle.colorfulBarInterval, {
                                width: intervalWidth,
                                backgroundColor: item,
                                borderTopLeftRadius: index == 0 ? 2 : 0,
                                borderBottomLeftRadius: index == 0 ? 2 : 0,
                                borderTopRightRadius: index == colorControl.length - 1 ? 2 : 0,
                                borderBottomRightRadius: index == colorControl.length - 1 ? 2 : 0
                            }]
                        });
                    }),
                    slider
                );

                var standTextArea = _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: colorfulSliderStyle.standTextArea
                    },
                    textControl.map(function (item, index) {
                        return _react2.default.createElement(
                            _reactNative.Text,
                            {
                                key: 'standText' + index,
                                style: colorfulSliderStyle.standText
                            },
                            item
                        );
                    })
                );

                if (type === 'bone') {
                    standTextArea = _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: colorfulSliderStyle.standTextArea
                        },
                        _react2.default.createElement(
                            _reactNative.Text,
                            {
                                style: colorfulSliderStyle.standText
                            },
                            function () {
                                var prefix = _Localized.Localized.EvaluationCard_Text_Your + _Localized.Localized.Global_Text_Space + _Localized.Localized.Global_UserInfo_bone + ': ';

                                if (haveData) {
                                    return prefix + _Global.Function.converKgToOtherStringWithUnit(boneValue, _YMUser2.default.getCurrentUserInfo().unit) + ', ' + _Localized.Localized.EvaluationCard_Text_PercentageOfBodyWeight + ': ' + value + '%';
                                } else {
                                    return prefix + '- -' + ', ' + _Localized.Localized.EvaluationCard_Text_PercentageOfBodyWeight + ': ' + '- -';
                                }
                            }()
                        )
                    );
                } else if (type === 'bmr') {
                    standTextArea = _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: colorfulSliderStyle.standTextArea
                        },
                        _react2.default.createElement(
                            _reactNative.Text,
                            {
                                style: colorfulSliderStyle.standText
                            },
                            function () {
                                var prefix = _Localized.Localized.EvaluationCard_Text_Your + _Localized.Localized.Global_Text_Space + _Localized.Localized.Global_UserInfo_bmr + ': ';

                                if (haveData) {
                                    return prefix + value + _Localized.Localized.Global_Unit_CalPerDay;
                                } else {
                                    return prefix + '- -';
                                }
                            }()
                        )
                    );
                } else if (type === 'somaAge') {
                    standTextArea = _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: colorfulSliderStyle.standTextArea
                        },
                        _react2.default.createElement(
                            _reactNative.Text,
                            {
                                style: colorfulSliderStyle.standText
                            },
                            function () {
                                var prefix = _Localized.Localized.EvaluationCard_Text_Your + _Localized.Localized.Global_Text_Space + _Localized.Localized.Global_UserInfo_somaAge + ': ';

                                if (haveData) {
                                    return prefix + value + _Localized.Localized.Global_Unit_Years;
                                } else {
                                    return prefix + '- -';
                                }
                            }()
                        )
                    );
                } else if (type === 'fatFreeMass') {
                    standTextArea = _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: colorfulSliderStyle.standTextArea
                        },
                        _react2.default.createElement(
                            _reactNative.Text,
                            {
                                style: colorfulSliderStyle.standText
                            },
                            function () {
                                var prefix = _Localized.Localized.EvaluationCard_Text_Your + _Localized.Localized.Global_Text_Space + _Localized.Localized.Global_UserInfo_fatFreeMass + ': ';

                                if (haveData) {
                                    return prefix + _Global.Function.converKgToOtherStringWithUnit(value, _YMUser2.default.getCurrentUserInfo().unit) + ', ' + _Localized.Localized.EvaluationCard_Text_PercentageOfBodyWeight + ': ' + (100 - fatValue) + '%';
                                } else {
                                    return prefix + '- -' + ', ' + _Localized.Localized.EvaluationCard_Text_PercentageOfBodyWeight + ': ' + '- -';
                                }
                            }()
                        )
                    );
                }

                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: style
                    },
                    nodeTextArea,
                    colorfulBar,
                    standTextArea
                );
            }
        }]);
        return ColorfulSlider;
    }(_react.Component);

    var mainStyles = _reactNative.StyleSheet.create({
        container: {
            alignItems: 'center',
            width: _Global2.default.screenWidth(),
            height: _Global2.default.screenHeight(),
            backgroundColor: 'white'
        }
    });

    var noDataStyle = _reactNative.StyleSheet.create({
        icon: {
            width: 75,
            height: 75,
            marginTop: _Global2.default.deviceType() == 'Small' ? 40 : 62
        },
        description: {
            fontSize: 15,
            color: 'rgba(0, 0, 0, 0.8)',
            lineHeight: 22,
            marginTop: _Global2.default.deviceType() == 'Small' ? 20 : 30,
            marginLeft: 25,
            fontFamily: 'Cochin',
            marginRight: 25
        },
        colorfulSliderArea: {
            position: 'absolute',
            top: (_Global2.default.screenHeight() - 64) * 0.55,
            left: 25
        }
    });

    var haveDataStyle = _reactNative.StyleSheet.create({
        topArea: {
            flexDirection: 'row',
            alignItems: 'center',
            width: _Global2.default.screenWidth() - 50,
            height: _Global2.default.screenHeight() * 0.25
        },
        valueView: {
            justifyContent: 'center',
            alignItems: 'center'
        },
        typeIcon: {
            width: 44,
            height: 44
        },
        valueText: {
            fontSize: _Global2.default.deviceType() == 'Small' ? 15 : 15,
            textAlign: 'center',
            fontFamily: 'Cochin',
            color: 'rgba(0, 0, 0, 0.9)',
            marginTop: 10
        },
        evaluationText: {
            fontSize: 14,
            textAlign: 'center',
            color: 'rgba(0, 0, 0, 0.8)',
            marginTop: 6
        },
        descriptionText: {
            fontSize: 15,
            textAlign: 'justify',
            fontFamily: 'Cochin',
            color: 'rgba(0, 0, 0, 0.8)',
            marginLeft: 15,
            lineHeight: 22
        },
        colorfulSliderArea: {
            marginTop: 20
        },
        separator: {
            width: _Global2.default.screenWidth() - 30,
            height: 0.5,
            marginTop: _Global2.default.deviceType() == 'Small' ? 20 : 40,
            backgroundColor: 'rgba(0, 0, 0, 0.1)'
        },
        bottomArea: {
            width: _Global2.default.screenWidth() - 50
        },
        analysesView: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: _Global2.default.deviceType() == 'Small' ? 30 : 45
        },
        analysesTitle: {
            fontSize: 15,
            color: 'rgba(0, 0, 0, 0.8)',
            marginLeft: 11
        },
        analysesText: {
            fontSize: 15,
            lineHeight: 22,
            color: 'rgba(0, 0, 0, 0.8)',
            marginTop: 6,
            fontFamily: 'Cochin',
            marginLeft: 33
        },
        tipsView: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: _Global2.default.deviceType() == 'Small' ? 20 : 35
        },
        tipsTitle: {
            fontSize: 15,
            color: 'rgba(0, 0, 0, 0.8)',
            marginLeft: 11
        },
        tipsText: {
            fontSize: 15,
            lineHeight: 22,
            fontFamily: 'Cochin',
            color: 'rgba(0, 0, 0, 0.8)',
            marginTop: 6,
            marginLeft: 33
        },
        icon: {
            width: 22,
            height: 22
        }
    });

    var somatotypeStyle = _reactNative.StyleSheet.create({
        container: {
            alignItems: 'stretch',
            width: _Global2.default.screenWidth() - 50,
            height: _Global2.default.screenHeight() * 0.3,
            marginTop: 34
        },
        childContainer: {
            flex: 1
        },
        cell: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: 6,
            borderRadius: 4
        },
        separator: {
            backgroundColor: 'rgb(229, 229, 229)'
        },
        cellImage: {
            width: 26,
            height: 39,
            marginLeft: 8,
            marginRight: 5,
            resizeMode: 'contain'
        },
        axisText: {
            textAlign: 'center',
            fontSize: 12,
            color: 'rgb(136, 136, 136)'
        },
        cellText: {
            width: 50,
            fontSize: 12,
            color: "rgb(136, 136, 136)",
            backgroundColor: 'transparent'
        },
        yAxisView: {
            width: 21.5,
            flexDirection: 'row'
        },
        yAxisImage: {
            width: 10,
            resizeMode: 'stretch',
            height: _Global2.default.screenHeight() * 0.3 - 21.5,
            flex: 1
        },
        xAxisImage: {
            height: 10,
            marginLeft: 20,
            resizeMode: 'stretch',
            width: _Global2.default.screenWidth() - 50 - 21.5
        }
    });

    var colorfulSliderStyle = _reactNative.StyleSheet.create({
        nodeTextArea: {
            flexDirection: 'row',
            justifyContent: 'center'
        },
        nodeText: {
            fontSize: 12,
            color: 'rgba(0, 0, 0, 0.6)',
            textAlign: 'center'
        },
        colorfulBar: {
            flexDirection: 'row',
            alignItems: 'center',
            height: 25
        },
        colorfulBarInterval: {
            height: 5
        },
        slider: {
            position: 'absolute',
            width: 10,
            height: 16,
            top: 4.5
        },
        standTextArea: {
            flexDirection: 'row',
            justifyContent: 'space-around'
        },
        standText: {
            flex: 1,
            fontSize: 12,
            color: 'rgba(0, 0, 0, 0.6)',
            textAlign: 'center',
            height: 15
        }
    });

    var navStyles = _reactNative.StyleSheet.create({
        bar: {
            backgroundColor: 'rgb(26, 182, 181)'
        },
        titleComponent: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: _Global2.default.navBarHeight(),
            marginTop: _Global2.default.statusBarHeight()
        },
        titleText: {
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: 17,
            textAlign: 'center'
        },
        titleIcon: {
            width: 11,
            height: 6,
            marginTop: 2,
            marginLeft: 4,
            tintColor: 'white'
        },
        rightComponent: {
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            width: 44,
            height: 44,
            top: _Global2.default.statusBarHeight(),
            right: 5
        },
        button: {
            width: 30,
            height: 30,
            tintColor: 'white'
        }
    });
}, 10436, [10297, 10033, 10013, 10010, 10379, 10427, 10019], "projects/com.yunmai.scales.ios/Main/EvaluationCard/EvaluationCard.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var _miot = _require(_dependencyMap[2]);

    var _Global = _require(_dependencyMap[3]);

    var _Global2 = babelHelpers.interopRequireDefault(_Global);

    var _Localized = _require(_dependencyMap[4]);

    var _DeviceControl = _require(_dependencyMap[5]);

    var _DeviceControl2 = babelHelpers.interopRequireDefault(_DeviceControl);

    var _Setting = _require(_dependencyMap[6]);

    var _Setting2 = babelHelpers.interopRequireDefault(_Setting);

    var _MultiUserList = _require(_dependencyMap[7]);

    var _MultiUserList2 = babelHelpers.interopRequireDefault(_MultiUserList);

    var _VisitorModeView = _require(_dependencyMap[8]);

    var _VisitorModeView2 = babelHelpers.interopRequireDefault(_VisitorModeView);

    var _Helper = _require(_dependencyMap[9]);

    var _Helper2 = babelHelpers.interopRequireDefault(_Helper);

    var Menu = function (_Component) {
        babelHelpers.inherits(Menu, _Component);

        function Menu(props) {
            babelHelpers.classCallCheck(this, Menu);

            var _this = babelHelpers.possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, props));

            _this.openMenu = function () {
                _this.setState({
                    menuIsExpand: true
                });

                _reactNative.StatusBar.setBarStyle('dark-content');
            };

            _this.closeMenu = function () {
                _this.setState({
                    menuIsExpand: false
                });

                _reactNative.StatusBar.setBarStyle('light-content');
            };

            var menuList = [{
                name: _Localized.Localized.DeviceControl_Title,
                func: function func() {
                    return _this.props.navigator.navigate('DeviceControl', {});
                }
            }, {
                name: _Localized.Localized.MultiUserList_Title,
                func: function func() {
                    return _this.props.navigator.navigate('MultiUserList', {});
                }
            }, {
                name: _Localized.Localized.VisitorMode_OutTitle,
                func: function func() {
                    return _this.props.navigator.navigate('VisitorModeView', {});
                }
            }, {
                name: _Localized.Localized.Help_Title,
                func: function func() {
                    return _this.props.navigator.navigate('Helper', {});
                }
            }];

            if (_miot.Service.account.ID == _miot.Device.owner.ID) {
                menuList.splice(1, 0, {
                    name: _Localized.Localized.Setting_Title,
                    func: function func() {
                        return _this.props.navigator.navigate('Setting', {});
                    }
                });
            }

            _this.rows = menuList.map(function (item, index) {
                return _react2.default.createElement(
                    _reactNative.TouchableHighlight,
                    {
                        key: index + 'touchableHighlight',
                        underlayColor: "transparent",
                        onPress: function onPress(e) {
                            _this.closeMenu();

                            item.func();
                        }
                    },
                    _react2.default.createElement(
                        _reactNative.View,
                        null,
                        _react2.default.createElement(_reactNative.View, {
                            style: styles.separator
                        }),
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
                                item.name
                            )
                        )
                    )
                );
            });
            _this.menuHeight = (_Global2.default.deviceIsX() ? 99.0 : 75.0) + 51.5 * _this.rows.length;
            _this.state = {
                menuIsExpand: false
            };
            return _this;
        }

        babelHelpers.createClass(Menu, [{
            key: "render",
            value: function render() {
                var _this2 = this;

                return _react2.default.createElement(
                    _reactNative.Modal,
                    {
                        transparent: true,
                        visible: this.state.menuIsExpand,
                        onRequestClose: function onRequestClose() {
                            _this2.closeMenu();
                        }
                    },
                    _react2.default.createElement(
                        _reactNative.View,
                        null,
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: [styles.container, {
                                    height: this.menuHeight
                                }]
                            },
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: styles.topView
                                },
                                _react2.default.createElement(
                                    _reactNative.TouchableHighlight,
                                    {
                                        onPress: this.closeMenu,
                                        underlayColor: "transparent"
                                    },
                                    _react2.default.createElement(_reactNative.Image, {
                                        style: styles.closeBtn,
                                        source: _Global2.default.mnu_closeBtn
                                    })
                                )
                            ),
                            this.rows
                        ),
                        _react2.default.createElement(
                            _reactNative.TouchableHighlight,
                            {
                                underlayColor: "transparent",
                                onPress: this.closeMenu
                            },
                            _react2.default.createElement(_reactNative.View, {
                                style: styles.backgroundContainer
                            })
                        )
                    )
                );
            }
        }]);
        return Menu;
    }(_react.Component);

    exports.default = Menu;

    var styles = _reactNative.StyleSheet.create({
        backgroundContainer: {
            height: _Global2.default.screenHeight(),
            width: _Global2.default.screenWidth(),
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
        },
        container: {
            justifyContent: 'center',
            alignItems: 'center',
            width: _Global2.default.screenWidth(),
            backgroundColor: 'white'
        },
        rowContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 51,
            width: _Global2.default.screenWidth()
        },
        topView: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            width: _Global2.default.screenWidth(),
            height: _Global2.default.deviceIsX() ? 99.0 : 75.0
        },
        closeBtn: {
            width: 30,
            height: 30,
            marginTop: _Global2.default.statusBarHeight() + (_Global2.default.navBarHeight() - 30) * 0.5,
            marginRight: 12
        },
        title: {
            fontSize: 16,
            color: 'rgba(0, 0, 0, 0.8)',
            marginLeft: 15
        },
        separator: {
            height: 0.5,
            backgroundColor: 'rgb(218, 218, 218)',
            marginLeft: 15,
            marginRight: 15
        }
    });
}, 10439, [10297, 10033, 10074, 10010, 10013, 10442, 10445, 10463, 10478, 10481], "projects/com.yunmai.scales.ios/Main/Home/Menu.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var _ui = _require(_dependencyMap[2]);

    var _Localized = _require(_dependencyMap[3]);

    var _NewNavBar = _require(_dependencyMap[4]);

    var _NewNavBar2 = babelHelpers.interopRequireDefault(_NewNavBar);

    var _YMUser = _require(_dependencyMap[5]);

    var _YMUser2 = babelHelpers.interopRequireDefault(_YMUser);

    var _YMDataHold = _require(_dependencyMap[6]);

    var _YMDataHold2 = babelHelpers.interopRequireDefault(_YMDataHold);

    var DeviceControl = function (_Component) {
        babelHelpers.inherits(DeviceControl, _Component);

        function DeviceControl(props) {
            babelHelpers.classCallCheck(this, DeviceControl);

            var _this = babelHelpers.possibleConstructorReturn(this, (DeviceControl.__proto__ || Object.getPrototypeOf(DeviceControl)).call(this, props));

            _this.getUserUnit = function () {
                var unit = _YMUser2.default.getCurrentUserInfo().unit;

                _this.setState({
                    unitButtons: [_Localized.Localized.Global_Unit_KG, _Localized.Localized.Global_Unit_Jin, _Localized.Localized.Global_Unit_Pound].map(function (item, index) {
                        var selected = [1, 3, 2];
                        return _react2.default.createElement(UnitButton, {
                            key: 'unitButton' + index,
                            unit: item,
                            selected: selected[index] == unit,
                            onPress: function onPress() {
                                return _this.setUserUnit(selected[index]);
                            }
                        });
                    })
                });
            };

            _this.setUserUnit = function (unit) {
                var tempUnit = _YMUser2.default.getCurrentUserInfo().unit;

                _YMUser2.default.getCurrentUserInfo().unit = unit;

                _YMDataHold2.default.uploadUserList(function (success) {
                    if (success) {
                        _YMDataHold2.default.saveUserList();

                        _reactNative.DeviceEventEmitter.emit('writUserInfoToSacle', {});

                        _reactNative.DeviceEventEmitter.emit('changeUnit', {});

                        _this.getUserUnit();

                        _this.setState({
                            dialogVisible: true,
                            dialogMessage: "保存成功"
                        });
                    } else {
                        _YMUser2.default.getCurrentUserInfo().unit = tempUnit;

                        _this.setState({
                            dialogVisible: true,
                            dialogMessage: "保存失败, 请重试"
                        });
                    }
                });
            };

            _this.state = {
                unitButtons: _react2.default.createElement(_reactNative.View, null),
                dialogMessage: "",
                dialogVisible: false
            };
            return _this;
        }

        babelHelpers.createClass(DeviceControl, [{
            key: "componentDidMount",
            value: function componentDidMount() {
                this.getUserUnit();
            }
        }, {
            key: "render",
            value: function render() {
                var _this2 = this;

                var dataSource = new _reactNative.ListView.DataSource({
                    rowHasChanged: function rowHasChanged(r1, r2) {
                        return r1 !== r2;
                    }
                }).cloneWithRows([_react2.default.createElement(RowCell, {
                    title: _Localized.Localized.DeviceControl_Text_WeightUnit,
                    accessoryView: _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: mainStyles.unitPicker
                        },
                        this.state.unitButtons
                    )
                })]);
                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: mainStyles.container
                    },
                    _react2.default.createElement(_reactNative.ListView, {
                        style: mainStyles.list,
                        dataSource: dataSource,
                        renderRow: function renderRow(rowData) {
                            return rowData;
                        },
                        showsVerticalScrollIndicator: false
                    }),
                    _react2.default.createElement(_ui.MessageDialog, {
                        visible: this.state.dialogVisible,
                        title: "",
                        confirm: "\u786E\u5B9A",
                        message: this.state.dialogMessage,
                        onDismiss: function onDismiss() {
                            _this2.setState({
                                dialogVisible: false
                            });
                        }
                    })
                );
            }
        }]);
        return DeviceControl;
    }(_react.Component);

    DeviceControl.navigationOptions = function (_ref) {
        var navigation = _ref.navigation;
        return {
            header: _react2.default.createElement(_NewNavBar2.default, {
                title: _Localized.Localized.DeviceControl_Title,
                style: {
                    backgroundColor: "rgb(239, 239, 240)"
                },
                type: "light",
                haveDividerLine: true,
                onPressLeft: function onPressLeft() {
                    navigation.goBack();
                }
            })
        };
    };

    exports.default = DeviceControl;

    var RowCell = function (_Component2) {
        babelHelpers.inherits(RowCell, _Component2);

        function RowCell() {
            babelHelpers.classCallCheck(this, RowCell);
            return babelHelpers.possibleConstructorReturn(this, (RowCell.__proto__ || Object.getPrototypeOf(RowCell)).apply(this, arguments));
        }

        babelHelpers.createClass(RowCell, [{
            key: "render",
            value: function render() {
                return _react2.default.createElement(
                    _reactNative.View,
                    null,
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: rowCellStyle.container
                        },
                        _react2.default.createElement(
                            _reactNative.Text,
                            {
                                style: rowCellStyle.title
                            },
                            this.props.title
                        ),
                        this.props.accessoryView
                    ),
                    _react2.default.createElement(_reactNative.View, {
                        style: rowCellStyle.separator
                    })
                );
            }
        }]);
        return RowCell;
    }(_react.Component);

    var UnitButton = function (_Component3) {
        babelHelpers.inherits(UnitButton, _Component3);

        function UnitButton() {
            babelHelpers.classCallCheck(this, UnitButton);
            return babelHelpers.possibleConstructorReturn(this, (UnitButton.__proto__ || Object.getPrototypeOf(UnitButton)).apply(this, arguments));
        }

        babelHelpers.createClass(UnitButton, [{
            key: "render",
            value: function render() {
                return _react2.default.createElement(
                    _reactNative.View,
                    null,
                    _react2.default.createElement(
                        _reactNative.TouchableWithoutFeedback,
                        {
                            onPress: this.props.onPress
                        },
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: [unitButtonStyle.container, this.props.selected ? unitButtonStyle.selectedButton : unitButtonStyle.deselectedButton]
                            },
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: [unitButtonStyle.unitText, this.props.selected ? unitButtonStyle.selectedText : unitButtonStyle.deselectedText]
                                },
                                this.props.unit
                            )
                        )
                    )
                );
            }
        }]);
        return UnitButton;
    }(_react.Component);

    var mainStyles = _reactNative.StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            marginBottom: 0,
            marginTop: 0
        },
        list: {
            alignSelf: 'stretch'
        },
        unitPicker: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 15,
            width: 105,
            height: 29,
            borderRadius: 6,
            backgroundColor: 'rgb(18, 196, 190)'
        }
    });

    var rowCellStyle = _reactNative.StyleSheet.create({
        container: {
            alignSelf: 'stretch',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flex: 1,
            height: 51
        },
        title: {
            fontSize: 16,
            color: 'rgba(0, 0, 0, 0.8)',
            marginLeft: 15
        },
        separator: {
            height: 0.5,
            backgroundColor: 'rgb(218, 218, 218)',
            marginLeft: 15,
            marginRight: 15
        }
    });

    var unitButtonStyle = _reactNative.StyleSheet.create({
        container: {
            width: 34,
            height: 27,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5
        },
        unitText: {
            textAlign: 'center',
            fontSize: 13
        },
        selectedButton: {
            backgroundColor: 'white'
        },
        deselectedButton: {
            backgroundColor: 'rgb(18, 196, 190)'
        },
        selectedText: {
            color: 'rgb(18, 196, 190)'
        },
        deselectedText: {
            color: 'white'
        }
    });
}, 10442, [10297, 10033, 10230, 10013, 10379, 10019, 10007], "projects/com.yunmai.scales.ios/Main/DeviceControl.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var _NewNavBar = _require(_dependencyMap[2]);

    var _NewNavBar2 = babelHelpers.interopRequireDefault(_NewNavBar);

    var _NativeModules = _require(_dependencyMap[3]);

    var _Global = _require(_dependencyMap[4]);

    var _Global2 = babelHelpers.interopRequireDefault(_Global);

    var _Localized = _require(_dependencyMap[5]);

    var _YMBLEControl = _require(_dependencyMap[6]);

    var _YMBLEControl2 = babelHelpers.interopRequireDefault(_YMBLEControl);

    var _UpgradeView = _require(_dependencyMap[7]);

    var _UpgradeView2 = babelHelpers.interopRequireDefault(_UpgradeView);

    var _miot = _require(_dependencyMap[8]);

    var Setting = function (_Component) {
        babelHelpers.inherits(Setting, _Component);

        function Setting(props) {
            babelHelpers.classCallCheck(this, Setting);

            var _this = babelHelpers.possibleConstructorReturn(this, (Setting.__proto__ || Object.getPrototypeOf(Setting)).call(this, props));

            _this.state = {
                deviceName: _miot.Device.name
            };
            return _this;
        }

        babelHelpers.createClass(Setting, [{
            key: "componentWillMount",
            value: function componentWillMount() {
                var _this2 = this;

                this._deviceNameChangedListener = _miot.DeviceEvent.deviceNameChanged.addListener(function (event) {
                    _this2.setState({
                        deviceName: event.name
                    });

                    _this2.props.navigation.setParams({
                        deviceName: event.name
                    });
                });
            }
        }, {
            key: "componentWillUnmount",
            value: function componentWillUnmount() {
                if (this._deviceNameChangedListener) {
                    this._deviceNameChangedListener.remove();
                }
            }
        }, {
            key: "render",
            value: function render() {
                var _this3 = this;

                console.log('deviceName', this.state.deviceName);
                var dataSource = new _reactNative.ListView.DataSource({
                    rowHasChanged: function rowHasChanged(r1, r2) {
                        return r1 !== r2;
                    }
                }).cloneWithRows([{
                    title: _Localized.Localized.Setting_Text_DeviceRename,
                    func: function func() {
                        return _miot.Host.ui.openChangeDeviceName();
                    },
                    accessoryView: _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: {
                                flexDirection: 'row'
                            }
                        },
                        _react2.default.createElement(
                            _reactNative.Text,
                            {
                                style: {
                                    fontSize: 12,
                                    color: "rgba(0, 0, 0, 0.5)"
                                }
                            },
                            this.state.deviceName
                        ),
                        _react2.default.createElement(_reactNative.Image, {
                            style: mainStyles.arrowImage,
                            source: _Global2.default.mnu_arrow
                        })
                    )
                }, {
                    title: _Localized.Localized.Setting_Text_DeviceSharing,
                    func: function func() {
                        return _miot.Host.ui.openShareDevicePage();
                    },
                    accessoryView: _react2.default.createElement(
                        _reactNative.View,
                        null,
                        _react2.default.createElement(_reactNative.Image, {
                            style: mainStyles.arrowImage,
                            source: _Global2.default.mnu_arrow
                        })
                    )
                }, {
                    title: _Localized.Localized.Setting_Text_FirmwareUpgrade,
                    func: function func() {
                        return _this3.props.navigation.navigate("UpgradeView", {});
                    },
                    accessoryView: _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: {
                                flexDirection: 'row'
                            }
                        },
                        _react2.default.createElement(
                            _reactNative.Text,
                            {
                                style: {
                                    fontSize: 12,
                                    color: 'rgba(0, 0, 0, 0.5)'
                                }
                            },
                            _YMBLEControl2.default.deviceVersion == 0 ? '' : _YMBLEControl2.default.deviceVersion
                        ),
                        _react2.default.createElement(_reactNative.Image, {
                            style: mainStyles.arrowImage,
                            source: _Global2.default.mnu_arrow
                        })
                    )
                }, {
                    title: _Localized.Localized.Setting_Text_DeleteDevice,
                    func: function func() {
                        return _miot.Host.ui.openDeleteDevice();
                    },
                    accessoryView: _react2.default.createElement(
                        _reactNative.View,
                        null,
                        _react2.default.createElement(_reactNative.Image, {
                            style: mainStyles.arrowImage,
                            source: _Global2.default.mnu_arrow
                        })
                    )
                }, {
                    title: _Localized.Localized.Setting_Text_Feedback,
                    func: function func() {
                        return _miot.Host.ui.openFeedbackInput();
                    },
                    accessoryView: _react2.default.createElement(
                        _reactNative.View,
                        null,
                        _react2.default.createElement(_reactNative.Image, {
                            style: mainStyles.arrowImage,
                            source: _Global2.default.mnu_arrow
                        })
                    )
                }, {
                    title: _Localized.Localized.Setting_Text_Add_ToDesktopPage,
                    func: function func() {
                        return _miot.Host.ui.openAddToDesktopPage();
                    }
                }, {
                    title: _Localized.Localized.Setting_Text_license_privacy,
                    func: function func() {
                        var agreementURL = _require(_dependencyMap[9]);

                        var privacyURL = _require(_dependencyMap[10]);

                        return _miot.Host.ui.privacyAndProtocolReview('软件许可及服务协议', agreementURL, '隐私协议', privacyURL);
                    }
                }].map(function (item, index) {
                    return _react2.default.createElement(RowCell, {
                        key: 'rowCell' + index,
                        title: item.title,
                        onPress: item.func,
                        accessoryView: item.accessoryView
                    });
                }));
                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: mainStyles.container
                    },
                    _react2.default.createElement(_reactNative.ListView, {
                        style: mainStyles.list,
                        dataSource: dataSource,
                        showsVerticalScrollIndicator: false,
                        renderRow: function renderRow(rowData) {
                            return rowData;
                        }
                    })
                );
            }
        }]);
        return Setting;
    }(_react.Component);

    Setting.navigationOptions = function (_ref) {
        var navigation = _ref.navigation;
        return {
            header: _react2.default.createElement(_NewNavBar2.default, {
                title: _Localized.Localized.Setting_Title,
                style: {
                    backgroundColor: "rgb(239, 239, 240)"
                },
                type: "light",
                haveDividerLine: true,
                onPressLeft: function onPressLeft() {
                    navigation.goBack();
                }
            })
        };
    };

    exports.default = Setting;

    var RowCell = function (_Component2) {
        babelHelpers.inherits(RowCell, _Component2);

        function RowCell() {
            babelHelpers.classCallCheck(this, RowCell);
            return babelHelpers.possibleConstructorReturn(this, (RowCell.__proto__ || Object.getPrototypeOf(RowCell)).apply(this, arguments));
        }

        babelHelpers.createClass(RowCell, [{
            key: "render",
            value: function render() {
                return _react2.default.createElement(
                    _reactNative.TouchableHighlight,
                    {
                        onPress: this.props.onPress,
                        underlayColor: "transparent"
                    },
                    _react2.default.createElement(
                        _reactNative.View,
                        null,
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: rowCellStyle.container
                            },
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: rowCellStyle.title
                                },
                                this.props.title
                            ),
                            this.props.accessoryView
                        ),
                        _react2.default.createElement(_reactNative.View, {
                            style: rowCellStyle.separator
                        })
                    )
                );
            }
        }]);
        return RowCell;
    }(_react.Component);

    var mainStyles = _reactNative.StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            marginBottom: 0,
            marginTop: 0
        },
        list: {
            alignSelf: 'stretch'
        },
        arrowImage: {
            width: 7,
            height: 13.5,
            marginLeft: 10,
            marginRight: 15
        }
    });

    var rowCellStyle = _reactNative.StyleSheet.create({
        container: {
            flex: 1,
            alignSelf: 'stretch',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 51
        },
        title: {
            fontSize: 16,
            color: 'rgba(0, 0, 0, 0.8)',
            marginLeft: 15
        },
        separator: {
            height: 0.5,
            backgroundColor: 'rgb(218, 218, 218)',
            marginLeft: 15,
            marginRight: 15
        }
    });
}, 10445, [10297, 10033, 10379, 10042, 10010, 10013, 10364, 10448, 10074, 10457, 10460], "projects/com.yunmai.scales.ios/Main/Setting.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var _miot = _require(_dependencyMap[2]);

    var _Global = _require(_dependencyMap[3]);

    var _Global2 = babelHelpers.interopRequireDefault(_Global);

    var _Localized = _require(_dependencyMap[4]);

    var _NewNavBar = _require(_dependencyMap[5]);

    var _NewNavBar2 = babelHelpers.interopRequireDefault(_NewNavBar);

    var _HardwareRequest = _require(_dependencyMap[6]);

    var _HardwareRequest2 = babelHelpers.interopRequireDefault(_HardwareRequest);

    var _HardwareControl = _require(_dependencyMap[7]);

    var _HardwareControl2 = babelHelpers.interopRequireDefault(_HardwareControl);

    var wWidth = _Global2.default.screenWidth();

    var UpgradeView = function (_Component) {
        babelHelpers.inherits(UpgradeView, _Component);

        function UpgradeView(props) {
            babelHelpers.classCallCheck(this, UpgradeView);

            var _this = babelHelpers.possibleConstructorReturn(this, (UpgradeView.__proto__ || Object.getPrototypeOf(UpgradeView)).call(this, props));

            _initialiseProps.call(_this);

            _this.currentVersion = '0';
            _this.state = {
                page_1: 0,
                page_2: 0,
                page_3: 0,
                page_4: 0,
                page_5: 0,
                percent: 0,
                versions: '',
                newVersions: '',
                updateContent: ''
            };
            return _this;
        }

        babelHelpers.createClass(UpgradeView, [{
            key: "componentDidMount",
            value: function componentDidMount() {
                var _this2 = this;

                this.noUpgrade(_HardwareControl2.default.lastVersion);
                return;
                var closeUp = false;

                if (closeUp) {
                    this.noUpgrade(_HardwareControl2.default.lastVersion);
                } else {
                    MHPluginSDK.showLoadingTips('');

                    _HardwareRequest2.default.requestLatestVersion(function (sucess, info) {
                        MHPluginSDK.dismissTips();

                        if (sucess) {
                            var latelyVersion = info.version;
                            var nowVersion = info.nowVersion;
                            var changeLog = info.changeLog;

                            if (latelyVersion) {
                                if (latelyVersion.length > 1) {
                                    latelyVersion = latelyVersion.replace("V", "");
                                }
                            }

                            if (latelyVersion == nowVersion) {
                                _this2.noUpgrade(nowVersion);
                            } else {
                                if (nowVersion == '0') {
                                    _this2.noUpgrade(latelyVersion);
                                } else {
                                    _this2.upgradeNow(nowVersion, latelyVersion, changeLog);

                                    _this2.currentVersion = latelyVersion;
                                }
                            }
                        } else {
                            MHPluginSDK.showFailTips('获取固件版本信息错误！');
                        }
                    });
                }
            }
        }, {
            key: "componentWillUnmount",
            value: function componentWillUnmount() {
                this.upGradePercentNotify.remove();
                this.upGradeStateNotify.remove();

                this._didDisconnectPeripheralListener.remove();

                this._centralManagerDidUpdateState.remove();
            }
        }, {
            key: "render",
            value: function render() {
                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: styles.container
                    },
                    this.state.page_1 == 0 ? null : _react2.default.createElement(
                        _reactNative.View,
                        null,
                        _react2.default.createElement(_reactNative.Image, {
                            style: styles.icon,
                            source: _Global2.default.upd_new_icon
                        }),
                        _react2.default.createElement(
                            _reactNative.Text,
                            {
                                style: styles.text_1
                            },
                            _Localized.Localized.FirmwareUpgrade_Text_IsAlreadyUpToDate + '\n',
                            this.state.versions
                        ),
                        _react2.default.createElement(
                            _reactNative.TouchableHighlight,
                            {
                                style: styles.buttons,
                                underlayColor: 'transparent',
                                onPress: this.noUpgradeReturnBtn
                            },
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: [{
                                        color: 'black',
                                        fontSize: 14
                                    }]
                                },
                                _Localized.Localized.Global_Interaction_Done
                            )
                        )
                    ),
                    this.state.page_2 == 0 ? null : _react2.default.createElement(
                        _reactNative.View,
                        null,
                        _react2.default.createElement(
                            _reactNative.Text,
                            {
                                style: [styles.text_1, styles.text_2]
                            },
                            _Localized.Localized.FirmwareUpgrade_Text_CurrentVersion + ' ' + this.state.versions
                        ),
                        _react2.default.createElement(_reactNative.Image, {
                            style: styles.icon,
                            source: _Global2.default.upd_arrow_icon
                        }),
                        _react2.default.createElement(
                            _reactNative.Text,
                            {
                                style: [styles.text_1, styles.text_3]
                            },
                            _Localized.Localized.FirmwareUpgrade_Text_LatestVersion + ' ' + this.state.newVersions
                        ),
                        _react2.default.createElement(
                            _reactNative.Text,
                            {
                                style: [styles.text_4, {
                                    opacity: this.state.updateContent ? 1 : 0
                                }]
                            },
                            this.state.updateContent
                        ),
                        _react2.default.createElement(
                            _reactNative.TouchableHighlight,
                            {
                                style: styles.buttons,
                                underlayColor: 'transparent',
                                onPress: this.upgradeNowBtn
                            },
                            _react2.default.createElement(
                                _reactNative.Text,
                                null,
                                _Localized.Localized.FirmwareUpgrade_Interaction_UpgradeImmediately
                            )
                        )
                    ),
                    this.state.page_3 == 0 ? null : _react2.default.createElement(
                        _reactNative.View,
                        null,
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: styles.circleProgress
                            },
                            _react2.default.createElement(_reactNative.View, {
                                style: styles.innerCircle
                            }),
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: styles.mask
                                },
                                _react2.default.createElement(
                                    _reactNative.View,
                                    {
                                        style: {
                                            width: 90,
                                            height: 90,
                                            transform: [{
                                                rotate: (this.state.percent < 50 ? 0 : (this.state.percent - 50) * 2 * 1.8) + 'deg'
                                            }]
                                        }
                                    },
                                    _react2.default.createElement(_reactNative.View, {
                                        style: [styles.halfCircle, styles.leftHalfCircle]
                                    })
                                )
                            ),
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: [styles.mask, {
                                        right: 0
                                    }]
                                },
                                _react2.default.createElement(
                                    _reactNative.View,
                                    {
                                        style: {
                                            width: 90,
                                            height: 90,
                                            position: 'absolute',
                                            left: -45,
                                            transform: [{
                                                rotate: (this.state.percent < 50 ? this.state.percent * 2 * 1.8 : 180) + 'deg'
                                            }]
                                        }
                                    },
                                    _react2.default.createElement(_reactNative.View, {
                                        style: [styles.halfCircle, styles.rightHalfCircle]
                                    })
                                )
                            ),
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: styles.text_5
                                },
                                this.state.percent,
                                "%"
                            )
                        ),
                        _react2.default.createElement(
                            _reactNative.Text,
                            {
                                style: styles.text_1
                            },
                            _Localized.Localized.FirmwareUpgrade_Text_DoNotDisconnectTheBluetoothConnection
                        )
                    ),
                    this.state.page_4 == 0 ? null : _react2.default.createElement(
                        _reactNative.View,
                        null,
                        _react2.default.createElement(_reactNative.Image, {
                            style: styles.icon,
                            source: _Global2.default.upd_right_icon
                        }),
                        _react2.default.createElement(
                            _reactNative.Text,
                            {
                                style: styles.text_1
                            },
                            _Localized.Localized.FirmwareUpgrade_Text_UpgradeSuccessed + '\n',
                            _Localized.Localized.FirmwareUpgrade_Text_HasBeenUpgradedTo + ' ' + this.state.versions
                        ),
                        _react2.default.createElement(
                            _reactNative.TouchableHighlight,
                            {
                                style: styles.buttons,
                                underlayColor: 'transparent',
                                onPress: this.completeUpgradeBtn
                            },
                            _react2.default.createElement(
                                _reactNative.Text,
                                null,
                                _Localized.Localized.FirmwareUpgrade_Interaction_Finished
                            )
                        )
                    ),
                    this.state.page_5 == 0 ? null : _react2.default.createElement(
                        _reactNative.View,
                        null,
                        _react2.default.createElement(_reactNative.Image, {
                            style: styles.icon,
                            source: _Global2.default.upd_error_icon
                        }),
                        _react2.default.createElement(
                            _reactNative.Text,
                            {
                                style: styles.text_1
                            },
                            _Localized.Localized.FirmwareUpgrade_Text_UpgradeFailed + '\n',
                            _Localized.Localized.FirmwareUpgrade_Text_MakeSureBluetoothConnectedProperly
                        ),
                        _react2.default.createElement(
                            _reactNative.TouchableHighlight,
                            {
                                style: styles.buttons,
                                underlayColor: 'transparent',
                                onPress: this.failRetryBtn
                            },
                            _react2.default.createElement(
                                _reactNative.Text,
                                null,
                                _Localized.Localized.FirmwareUpgrade_Interaction_Retry
                            )
                        )
                    )
                );
            }
        }]);
        return UpgradeView;
    }(_react.Component);

    UpgradeView.navigationOptions = function (_ref) {
        var navigation = _ref.navigation;
        return {
            header: _react2.default.createElement(_NewNavBar2.default, {
                title: _Localized.Localized.FirmwareUpgrade_Title,
                style: {
                    backgroundColor: "rgb(239, 239, 240)"
                },
                type: "light",
                haveDividerLine: true,
                onPressLeft: function onPressLeft() {
                    navigation.goBack();
                }
            })
        };
    };

    var _initialiseProps = function _initialiseProps() {
        var _this3 = this;

        this.componentWillMount = function () {
            _this3.upGradePercentNotify = _reactNative.DeviceEventEmitter.addListener(_HardwareControl2.default.YM_UPGRADE_PERCENT_NOTIFY, function (info) {
                var percent = info.percent;

                _this3.upgradeSchedule(percent);
            });
            _this3.upGradeStateNotify = _reactNative.DeviceEventEmitter.addListener(_HardwareControl2.default.YM_UPGRADE_STATE_NOTIFY, function (info) {
                var state = info.state;

                if (state == 1) {
                    _this3.upgradeSuccess(_this3.currentVersion);
                } else {
                    _this3.upgradeFailed();
                }
            });
            _this3._didDisconnectPeripheralListener = _miot.BluetoothEvent.bluetoothConnectionStatusChanged.addListener(function (bluetooth, isConnected) {
                if (!isConnected) {
                    if (_HardwareControl2.default.upgrading) {
                        _this3.upgradeFailed();
                    }
                }
            });
            _this3._centralManagerDidUpdateState = _miot.BluetoothEvent.bluetoothStatusChanged.addListener(function (isEnabled) {
                if (isEnabled) { } else {
                    if (_HardwareControl2.default.upgrading) {
                        his.upgradeFailed();
                    }
                }
            });
        };

        this.noUpgrade = function (versions) {
            _this3.setState({
                page_1: 1,
                page_2: 0,
                page_3: 0,
                page_4: 0,
                page_5: 0,
                versions: versions
            });
        };

        this.upgradeNow = function (versions, newVersions, updateContent) {
            _this3.setState({
                page_1: 0,
                page_2: 1,
                page_3: 0,
                page_4: 0,
                page_5: 0,
                versions: versions,
                newVersions: newVersions,
                updateContent: updateContent
            });
        };

        this.noUpgradeReturnBtn = function (e) {
            _this3.props.navigation.pop();
        };

        this.upgradeNowBtn = function (e) {
            _this3.beginUpgrade();
        };

        this.upgradeSchedule = function (percent) {
            _this3.setState({
                percent: percent
            });
        };

        this.upgrading = function () {
            _this3.setState({
                page_1: 0,
                page_2: 0,
                page_3: 1,
                page_4: 0,
                page_5: 0
            });
        };

        this.upgradeSuccess = function (versions) {
            MHPluginSDK.dismissTips();

            _this3.setState({
                page_1: 0,
                page_2: 0,
                page_3: 0,
                page_4: 1,
                page_5: 0,
                versions: versions
            });
        };

        this.upgradeFailed = function () {
            MHPluginSDK.dismissTips();
            _HardwareControl2.default.upgrading = false;

            if (_HardwareControl2.default.sucessed) {
                return;
            }

            _HardwareControl2.default.dataBreak = true;

            _this3.setState({
                page_1: 0,
                page_2: 0,
                page_3: 0,
                page_4: 0,
                page_5: 1,
                percent: 0
            });
        };

        this.completeUpgradeBtn = function (e) {
            _this3.props.navigator.pop();
        };

        this.failRetryBtn = function (e) {
            _this3.beginUpgrade();
        };

        this.beginUpgrade = function () {
            MHPluginSDK.getDevicePropertyFromMemCache(["isOnline", "name", "mac", "version"], function (props) {
                if (props.isOnline == false) {
                    MHPluginSDK.showFailTips('蓝牙未连接！');
                } else {
                    _this3.upgrading();

                    _HardwareRequest2.default.requestHardwareBin(function (sucess, arr) {
                        if (sucess) {
                            _HardwareControl2.default.dataBreak = false;
                            _HardwareControl2.default.upgrading = true;

                            _HardwareControl2.default.getScaleSysInfo();
                        } else {
                            _this3.upgradeFailed();
                        }
                    });
                }
            });
        };
    };

    exports.default = UpgradeView;

    var styles = _reactNative.StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white',
            marginBottom: 0,
            marginTop: 0
        },
        icon: {
            position: 'absolute',
            width: 90,
            height: 90,
            marginTop: 136,
            marginLeft: (wWidth - 90) * 0.5
        },
        text_1: {
            width: wWidth,
            position: 'absolute',
            top: 276,
            textAlign: 'center',
            color: 'black',
            lineHeight: 18,
            fontSize: 14
        },
        text_2: {
            top: 71,
            color: 'black',
            opacity: 0.5
        },
        text_3: {
            top: 241,
            opacity: 0.8
        },
        text_4: {
            width: wWidth - 46,
            backgroundColor: '#efeff0',
            position: 'absolute',
            borderRadius: 8,
            fontSize: 14,
            lineHeight: 22,
            top: 266,
            marginLeft: 23,
            paddingTop: 7,
            paddingLeft: 12,
            paddingRight: 12,
            paddingBottom: 13,
            overflow: 'hidden'
        },
        text_5: {
            width: 90,
            position: 'absolute',
            color: '#2892ff',
            fontSize: 32,
            textAlign: 'center',
            top: 26
        },
        circleProgress: {
            position: 'absolute',
            width: 90,
            height: 90,
            marginTop: 136,
            marginLeft: (wWidth - 90) * 0.5
        },
        innerCircle: {
            position: 'absolute',
            width: 89,
            height: 89,
            margin: 0.5,
            borderWidth: 1.5,
            borderColor: '#2892ff',
            borderRadius: 44
        },
        mask: {
            position: 'absolute',
            width: 45,
            height: 90,
            borderColor: 'transparent',
            overflow: 'hidden'
        },
        halfCircle: {
            width: 45,
            height: 90,
            borderWidth: 2.2,
            borderColor: '#bcdeff',
            overflow: 'hidden'
        },
        leftHalfCircle: {
            borderRightWidth: 0,
            borderTopLeftRadius: 45,
            borderBottomLeftRadius: 45
        },
        rightHalfCircle: {
            borderLeftWidth: 0,
            borderTopRightRadius: 45,
            borderBottomRightRadius: 45,
            marginLeft: 45
        },
        buttons: {
            justifyContent: 'center',
            alignItems: 'center',
            width: wWidth - 46,
            height: 40,
            lineHeight: 27,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: 'rgba(0, 0, 0, 0.2)',
            textAlign: 'center',
            position: 'absolute',
            fontSize: 16,
            marginLeft: 23,
            color: 'rgba(0, 0, 0, 0.8)',
            top: _Global2.default.screenHeight() - 139 - _Global2.default.bottomSafePadding()
        }
    });
}, 10448, [10297, 10033, 10074, 10010, 10013, 10379, 10451, 10367], "projects/com.yunmai.scales.ios/Main/YMUpgrade/UpgradeView.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _NativeModules = _require(_dependencyMap[0]);

    var _base = _require(_dependencyMap[1]);

    var _base2 = babelHelpers.interopRequireDefault(_base);

    var _YMHexTools = _require(_dependencyMap[2]);

    var _YMHexTools2 = babelHelpers.interopRequireDefault(_YMHexTools);

    var _HardwareControl = _require(_dependencyMap[3]);

    var _HardwareControl2 = babelHelpers.interopRequireDefault(_HardwareControl);

    var HardwareRequest = function HardwareRequest() {
        babelHelpers.classCallCheck(this, HardwareRequest);
    };

    HardwareRequest.requestHardwareBin = function (callback) {
        _NativeModules.MHPluginSDK.callSmartHomeAPI("/home/latest_version", {
            "model": _NativeModules.MHPluginSDK.deviceModel
        }, function (response) {
            var url = response.result.url;

            if (url) {
                _NativeModules.MHPluginFS.downloadFile(url, 'YMUpgrade.bin', function (success, result) {
                    if (success && result.path) {
                        _NativeModules.MHPluginFS.readFileToBase64(result.filename, function (isSucess, utf8Content) {
                            if (isSucess) {
                                var strArr = _base2.default.decode(utf8Content);

                                if (strArr.length > 2) {
                                    var falgA = strArr.pop();
                                    _HardwareControl2.default.checksum = strArr.pop() + falgA;
                                }

                                var arr = new Array();
                                var j = 0;
                                var flagStr = '';

                                for (var i = 0; i < strArr.length; i++) {
                                    if (0 == i % 18) {
                                        if (i != 0) {
                                            arr.push(flagStr);
                                            j++;
                                        }

                                        var hexNum = _YMHexTools2.default._toHexStr(j);

                                        while (hexNum.length < 4) {
                                            hexNum = '0' + hexNum;
                                        }

                                        flagStr = hexNum + strArr[i];
                                    } else {
                                        flagStr = flagStr + strArr[i];
                                    }
                                }

                                if (flagStr) {
                                    arr.push(flagStr);
                                }

                                _HardwareControl2.default.dataArr = arr;
                                callback(true, arr);
                            } else {
                                callback(false, null);
                            }
                        });
                    } else {
                        callback(false, null);
                    }
                });
            } else {
                calcallback(false, null);
            }
        });
    };

    HardwareRequest.requestLatestVersion = function (callback) {
        _NativeModules.MHPluginSDK.callSmartHomeAPI("/home/latest_version", {
            "model": _NativeModules.MHPluginSDK.deviceModel
        }, function (response) {
            if (response.code == 0) {
                var version = response.result.version;
                var msg = response.result.changeLog;
                var nowVersion = _HardwareControl2.default.lastVersion;

                if (nowVersion) {
                    callback(true, {
                        version: version,
                        changeLog: msg,
                        nowVersion: nowVersion
                    });
                } else {
                    callback(true, {
                        version: version,
                        changeLog: msg,
                        nowVersion: '0'
                    });
                }
            } else {
                callback(false, {});
            }
        });
    };

    exports.default = HardwareRequest;
}, 10451, [10042, 10454, 10373, 10367], "projects/com.yunmai.scales.ios/Main/YMUpgrade/HardwareRequest.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    function base64_decode(str) {
        var c1, c2, c3, c4;
        var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
        var i = 0,
            len = str.length,
            string = '';

        while (i < len) {
            do {
                c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
            } while (i < len && c1 == -1);

            if (c1 == -1) break;

            do {
                c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
            } while (i < len && c2 == -1);

            if (c2 == -1) break;
            string += String.fromCharCode(c1 << 2 | (c2 & 0x30) >> 4);

            do {
                c3 = str.charCodeAt(i++) & 0xff;
                if (c3 == 61) return string;
                c3 = base64DecodeChars[c3];
            } while (i < len && c3 == -1);

            if (c3 == -1) break;
            string += String.fromCharCode((c2 & 0XF) << 4 | (c3 & 0x3C) >> 2);

            do {
                c4 = str.charCodeAt(i++) & 0xff;
                if (c4 == 61) return string;
                c4 = base64DecodeChars[c4];
            } while (i < len && c4 == -1);

            if (c4 == -1) break;
            string += String.fromCharCode((c3 & 0x03) << 6 | c4);
        }

        return string;
    }

    function base64_encode(str) {
        var c1, c2, c3;
        var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var i = 0,
            len = str.length,
            string = '';

        while (i < len) {
            c1 = str.charCodeAt(i++) & 0xff;

            if (i == len) {
                string += base64EncodeChars.charAt(c1 >> 2);
                string += base64EncodeChars.charAt((c1 & 0x3) << 4);
                string += "==";
                break;
            }

            c2 = str.charCodeAt(i++);

            if (i == len) {
                string += base64EncodeChars.charAt(c1 >> 2);
                string += base64EncodeChars.charAt((c1 & 0x3) << 4 | (c2 & 0xF0) >> 4);
                string += base64EncodeChars.charAt((c2 & 0xF) << 2);
                string += "=";
                break;
            }

            c3 = str.charCodeAt(i++);
            string += base64EncodeChars.charAt(c1 >> 2);
            string += base64EncodeChars.charAt((c1 & 0x3) << 4 | (c2 & 0xF0) >> 4);
            string += base64EncodeChars.charAt((c2 & 0xF) << 2 | (c3 & 0xC0) >> 6);
            string += base64EncodeChars.charAt(c3 & 0x3F);
        }

        return string;
    }

    function stringToHex(str) {
        var val = new Array(11);

        for (var i = 0; i < str.length; i++) {
            var flagStr = str.charCodeAt(i).toString(16);

            if (flagStr.length < 2) {
                flagStr = '0' + flagStr;
            }

            val[i] = flagStr;
        }

        return val;
    }

    function utf16to8(str) {
        var out, i, len, c;
        out = "";
        len = str.length;

        for (i = 0; i < len; i++) {
            c = str.charCodeAt(i);

            if (c >= 0x0001 && c <= 0x007F) {
                out += str.charAt(i);
            } else if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | c >> 12 & 0x0F);
                out += String.fromCharCode(0x80 | c >> 6 & 0x3F);
                out += String.fromCharCode(0x80 | c >> 0 & 0x3F);
            } else {
                out += String.fromCharCode(0xC0 | c >> 6 & 0x1F);
                out += String.fromCharCode(0x80 | c >> 0 & 0x3F);
            }
        }

        return out;
    }

    function bytesToStr(arr) {
        var str = '';

        for (i = 0; i < arr.length; i++) {
            str += String.fromCharCode(arr[i]);
        }

        return str;
    }

    module.exports = {
        decode: function decode(str) {
            return stringToHex(base64_decode(str));
        },
        decodeStr: function decodeStr(str) {
            return base64_decode(str);
        },
        encode: function encode(arr) {
            return base64_encode(bytesToStr(arr));
        }
    };
}, 10454, [], "projects/com.yunmai.scales.ios/Main/Tools/base64.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "scales": [1],
        "hash": "b2a6a3999ad745148a42d3cbc2090a9a",
        "name": "license_zh",
        "type": "html"
    });
}, 10457, [10420], "projects/com.yunmai.scales.ios/Resources/license_zh.html");
__d(function (global, _require, module, exports, _dependencyMap) {
    module.exports = _require(_dependencyMap[0]).registerAsset({
        "__packager_asset": true,
        "httpServerLocation": "/assets/projects/com.yunmai.scales.ios/Resources",
        "scales": [1],
        "hash": "bad96ed7ab495d100e30cc0fcd603e01",
        "name": "privacy_zh",
        "type": "html"
    });
}, 10460, [10420], "projects/com.yunmai.scales.ios/Resources/privacy_zh.html");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var _Global = _require(_dependencyMap[2]);

    var _Global2 = babelHelpers.interopRequireDefault(_Global);

    var _YMUser = _require(_dependencyMap[3]);

    var _YMUser2 = babelHelpers.interopRequireDefault(_YMUser);

    var _MultiUserEdit = _require(_dependencyMap[4]);

    var _MultiUserEdit2 = babelHelpers.interopRequireDefault(_MultiUserEdit);

    var _Localized = _require(_dependencyMap[5]);

    var _NewNavBar = _require(_dependencyMap[6]);

    var _NewNavBar2 = babelHelpers.interopRequireDefault(_NewNavBar);

    var MultiUserList = function (_Component) {
        babelHelpers.inherits(MultiUserList, _Component);

        function MultiUserList(props) {
            babelHelpers.classCallCheck(this, MultiUserList);

            var _this = babelHelpers.possibleConstructorReturn(this, (MultiUserList.__proto__ || Object.getPrototypeOf(MultiUserList)).call(this, props));

            _this.push = function (index) {
                _this.props.navigation.navigate('MultiUserEdit', {
                    index: index
                });
            };

            _this.componentWillMount = function () {
                _this.setState({
                    userInfos: _YMUser2.default.getList()
                });

                _this._addNewUserListener = _reactNative.DeviceEventEmitter.addListener('addNewUser', function () {
                    _this.setState({
                        userInfos: _YMUser2.default.getList()
                    });
                });
                _this._addNewUserListener = _reactNative.DeviceEventEmitter.addListener('deletcUser', function () {
                    _this.setState({
                        userInfos: _YMUser2.default.getList()
                    });
                });
            };

            _this.componentWillUnmount = function () {
                if (_this._addNewUserListener) {
                    _this._addNewUserListener.remove();
                }
            };

            _this.state = {
                userInfos: null
            };
            return _this;
        }

        babelHelpers.createClass(MultiUserList, [{
            key: "render",
            value: function render() {
                var _this2 = this;

                var userList = this.state.userInfos.map(function (item, index) {
                    return _react2.default.createElement(
                        _reactNative.TouchableHighlight,
                        {
                            key: index + 'touchableHighlight',
                            underlayColor: "transparent",
                            onPress: function onPress(e) {
                                _this2.push(index);
                            }
                        },
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: {
                                    alignItems: 'center'
                                }
                            },
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: styles.rowContainer
                                },
                                _react2.default.createElement(
                                    _reactNative.View,
                                    null,
                                    _react2.default.createElement(
                                        _reactNative.Text,
                                        {
                                            style: styles.title
                                        },
                                        item.userName
                                    ),
                                    _react2.default.createElement(
                                        _reactNative.Text,
                                        {
                                            style: styles.subtitle
                                        },
                                        _Global.Function.converRelevanceToText(item.relevance)
                                    )
                                ),
                                _react2.default.createElement(_reactNative.Image, {
                                    style: styles.arrowIcon,
                                    source: _Global2.default.mnu_arrow
                                })
                            ),
                            _react2.default.createElement(_reactNative.View, {
                                style: styles.separator
                            })
                        )
                    );
                });
                var dataSource = new _reactNative.ListView.DataSource({
                    rowHasChanged: function rowHasChanged(r1, r2) {
                        return r1 !== r2;
                    }
                }).cloneWithRows(userList);
                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: styles.container
                    },
                    _react2.default.createElement(_reactNative.ListView, {
                        style: {
                            backgroundColor: 'white'
                        },
                        dataSource: dataSource,
                        renderRow: function renderRow(rowData) {
                            return rowData;
                        }
                    }),
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: styles.bottomView
                        },
                        _react2.default.createElement(_reactNative.View, {
                            style: [styles.separator, {
                                width: _Global2.default.screenWidth()
                            }]
                        }),
                        _react2.default.createElement(
                            _reactNative.TouchableHighlight,
                            {
                                underlayColor: 'transparent',
                                onPress: function onPress(e) {
                                    _this2.push(-1);
                                }
                            },
                            _react2.default.createElement(_reactNative.Image, {
                                style: styles.addBtn,
                                source: _Global2.default.fml_addBtn
                            })
                        ),
                        _react2.default.createElement(
                            _reactNative.Text,
                            {
                                style: styles.addTitle
                            },
                            _Localized.Localized.Global_Interaction_Add
                        )
                    )
                );
            }
        }]);
        return MultiUserList;
    }(_react.Component);

    MultiUserList.navigationOptions = function (_ref) {
        var navigation = _ref.navigation;
        return {
            header: _react2.default.createElement(_NewNavBar2.default, {
                title: _Localized.Localized.MultiUserList_Title,
                style: {
                    backgroundColor: "rgb(239, 239, 240)"
                },
                type: "light",
                haveDividerLine: true,
                onPressLeft: function onPressLeft() {
                    navigation.goBack();
                }
            })
        };
    };

    exports.default = MultiUserList;

    var styles = _reactNative.StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 0,
            marginTop: 0
        },
        bottomView: {
            position: 'absolute',
            alignItems: 'center',
            backgroundColor: 'white',
            width: _Global2.default.screenWidth(),
            height: 85 + _Global2.default.bottomSafePadding(),
            right: 0,
            bottom: 0
        },
        rowContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 70,
            width: _Global2.default.screenWidth()
        },
        title: {
            fontSize: 16,
            color: 'rgba(0, 0, 0, 0.8)',
            marginLeft: 15
        },
        subtitle: {
            fontSize: 13,
            color: 'rgba(0, 0, 0, 0.4)',
            marginTop: 3,
            marginLeft: 15
        },
        arrowIcon: {
            width: 7,
            height: 14,
            marginRight: 15
        },
        separator: {
            height: 0.5,
            width: _Global2.default.screenWidth() - 30,
            backgroundColor: 'rgb(218, 218, 218)'
        },
        addBtn: {
            width: 33,
            height: 33,
            marginTop: 12
        },
        addTitle: {
            fontSize: 12,
            color: 'rgba(0, 0, 0, 0.4)',
            marginTop: 8
        }
    });
}, 10463, [10297, 10033, 10010, 10019, 10466, 10013, 10379], "projects/com.yunmai.scales.ios/Main/MultiUserManagement/MultiUserList.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var _Global = _require(_dependencyMap[2]);

    var _Global2 = babelHelpers.interopRequireDefault(_Global);

    var _YMUser = _require(_dependencyMap[3]);

    var _YMUser2 = babelHelpers.interopRequireDefault(_YMUser);

    var _YMUserInfo = _require(_dependencyMap[4]);

    var _YMUserInfo2 = babelHelpers.interopRequireDefault(_YMUserInfo);

    var _YMDataHold = _require(_dependencyMap[5]);

    var _YMDataHold2 = babelHelpers.interopRequireDefault(_YMDataHold);

    var _SQLite = _require(_dependencyMap[6]);

    var _SQLite2 = babelHelpers.interopRequireDefault(_SQLite);

    var _Localized = _require(_dependencyMap[7]);

    var _NewNavBar = _require(_dependencyMap[8]);

    var _NewNavBar2 = babelHelpers.interopRequireDefault(_NewNavBar);

    var _miot = _require(_dependencyMap[9]);

    var _SelectSexDialog = _require(_dependencyMap[10]);

    var _SelectSexDialog2 = babelHelpers.interopRequireDefault(_SelectSexDialog);

    var _ui = _require(_dependencyMap[11]);

    var _HandlerOnceTap = _require(_dependencyMap[12]);

    var _HandlerOnceTap2 = babelHelpers.interopRequireDefault(_HandlerOnceTap);

    var string_done = _Localized.Localized.Global_Interaction_Done;
    var string_cancel = _Localized.Localized.Global_Interaction_Cancel;
    var string_alert = _Localized.Localized.Global_Interaction_Alert;
    var string_height = _Localized.Localized.Global_UserInfo_Height;
    var string_age = _Localized.Localized.Global_UserInfo_Age;

    var MultiUserEdit = function (_Component) {
        babelHelpers.inherits(MultiUserEdit, _Component);

        function MultiUserEdit(props) {
            babelHelpers.classCallCheck(this, MultiUserEdit);

            var _this = babelHelpers.possibleConstructorReturn(this, (MultiUserEdit.__proto__ || Object.getPrototypeOf(MultiUserEdit)).call(this, props));

            _this.selectSex = function (sex) {
                if (sex == 1) {
                    _this.state.sex = _Localized.Localized.Global_Sex_Male;
                } else {
                    _this.state.sex = _Localized.Localized.Global_Sex_Female;
                }

                _this.setState({});
            };

            _this.selectRelevance = function (relevanceCode) {
                _this.state.relevance = _Global.Function.converRelevanceToText(relevanceCode);

                _this.setState({});
            };

            _this.saveUserInfo = function () {
                if (_Global.Function.equalNull(_this.state.age)) {
                    _this.setState({
                        dialogVisible: true,
                        dialogMessage: _Localized.Localized.Global_Interaction_PleaseFillInAge
                    });

                    return;
                } else if (_Global.Function.equalNull(_this.state.height)) {
                    _this.setState({
                        dialogVisible: true,
                        dialogMessage: _Localized.Localized.Global_Interaction_PleaseFillInHeight
                    });

                    return;
                } else if (_Global.Function.equalNull(_this.state.sex)) {
                    _this.setState({
                        dialogVisible: true,
                        dialogMessage: _Localized.Localized.Global_Interaction_PleaseFillInGender
                    });

                    return;
                } else if (_Global.Function.equalNull(_this.state.relevance)) {
                    _this.setState({
                        dialogVisible: true,
                        dialogMessage: _Localized.Localized.Global_Interaction_PleaseFillInRelevance
                    });

                    return;
                } else if (_Global.Function.equalNull(_this.state.userName)) {
                    _this.setState({
                        dialogVisible: true,
                        dialogMessage: _Localized.Localized.Global_Interaction_PleaseFillInNickname
                    });

                    return;
                }

                var userInfo = null;

                if (_this.state.index === -1) {
                    userInfo = new _YMUserInfo2.default();
                    userInfo.pUid = _miot.Service.account.ID;
                } else {
                    userInfo = _YMUser2.default.getList()[_this.state.index];
                }

                userInfo.userName = _this.state.userName;
                userInfo.relevance = _Global.Function.converTextToRelevance(_this.state.relevance);
                userInfo.age = parseInt(_this.state.age);
                userInfo.height = parseInt(_this.state.height);
                userInfo.sex = _this.state.sex == _Localized.Localized.Global_Sex_Male ? 1 : 2;
                var date = new Date();

                var year = date.getFullYear() - _this.state.age;

                userInfo.birthday = year + '0101';
                var tempUserInfo = new _YMUserInfo2.default();

                if (_this.state.index === -1) {
                    _YMUser2.default.getList().push(userInfo);
                } else {
                    tempUserInfo = _YMUserInfo2.default.mutableCopy(_YMUser2.default.getList()[_this.state.index]);
                    _YMUser2.default.getList()[_this.state.index] = userInfo;
                }

                _YMDataHold2.default.uploadUserList(function (completed, error) {
                    if (completed) {
                        if (_this.state.index === -1) {
                            _YMUser2.default.setCurrentUserInfo(_YMUser2.default.getList().length - 1);
                        } else {
                            _YMUser2.default.setCurrentUserInfo(_this.state.index);
                        }

                        _YMDataHold2.default.saveUserList();

                        _reactNative.DeviceEventEmitter.emit('writUserInfoToSacle', {});

                        _reactNative.DeviceEventEmitter.emit('addNewUser', {});

                        _this.setState({
                            dialogVisible: true,
                            dialogMessage: _Localized.Localized.MultiUser_Interaction_SaveSuccessfully
                        });

                        _this.props.navigation.pop();
                    } else {
                        if (_this.state.index === -1) {
                            _YMUser2.default.getList().pop();
                        } else {
                            _YMUser2.default.getList()[_this.state.index] = tempUserInfo;
                        }

                        _this.setState({
                            dialogVisible: true,
                            dialogMessage: _Localized.Localized.MultiUser_Interaction_SaveFailed
                        });
                    }
                });
            };

            _this.saveUserName = function (inputText) {
                console.log("inputText = " + inputText);

                if (inputText.length > 10) {
                    _this.setState({
                        dialogVisible: true,
                        dialogMessage: _Localized.Localized.Global_Interaction_TooLong
                    });
                } else {
                    _this.state.userName = inputText;

                    _this.setState({});
                }
            };

            _this.saveHeight = function (inputText) {
                var reg = new RegExp("^[0-9]*$");

                if (!reg.test(inputText)) {
                    _this.setState({
                        dialogVisible: true,
                        dialogMessage: _Localized.Localized.Global_Interaction_PleaseEnterNumber
                    });

                    return;
                }

                if (inputText > 226) {
                    _this.setState({
                        dialogVisible: true,
                        dialogMessage: _Localized.Localized.Global_Interaction_TooHigh
                    });
                } else if (inputText < 100) {
                    _this.setState({
                        dialogVisible: true,
                        dialogMessage: _Localized.Localized.Global_Interaction_TooLow
                    });
                } else {
                    _this.state.height = inputText;

                    _this.setState({});
                }
            };

            _this.saveAge = function (inputText) {
                var reg = new RegExp("^[0-9]*$");

                if (!reg.test(inputText)) {
                    _this.setState({
                        dialogVisible: true,
                        dialogMessage: _Localized.Localized.Global_Interaction_PleaseEnterNumber
                    });

                    return;
                }

                if (inputText > 100) {
                    _this.setState({
                        dialogVisible: true,
                        dialogMessage: _Localized.Localized.Global_Interaction_TooOld
                    });
                } else if (inputText < 1) {
                    _this.setState({
                        dialogVisible: true,
                        dialogMessage: _Localized.Localized.Global_Interaction_TooYoung
                    });
                } else {
                    _this.state.age = inputText;

                    _this.setState({});
                }
            };

            _this.deleteUserInfo = function () {
                var deletedUserInfos = _YMUser2.default.getList().splice(_this.state.index, 1);

                _YMDataHold2.default.uploadUserList(function (success) {
                    if (success) {
                        _YMUser2.default.setCurrentUserInfo(0);

                        _YMDataHold2.default.saveUserList();

                        _reactNative.DeviceEventEmitter.emit('writUserInfoToSacle', {});

                        _reactNative.DeviceEventEmitter.emit('deletcUser', {});

                        var sqlite = new _SQLite2.default();
                        sqlite.deleteAllWeightInfoByUid(deletedUserInfos.shortId);
                    } else {
                        var _YMUser$getList;

                        (_YMUser$getList = _YMUser2.default.getList()).splice.apply(_YMUser$getList, [_this.state.index, 0].concat(babelHelpers.toConsumableArray(deletedUserInfos)));
                    }

                    _this.props.navigation.pop();
                });
            };

            _this.props.navigation.setParams({
                saveUserInfo: _this.saveUserInfo
            });

            _this.state = {
                index: -1,
                userName: '',
                height: '',
                age: '',
                sex: '',
                relevance: '',
                dialogMessage: "",
                dialogVisible: false,
                isShowUserNameDialog: false,
                isShowheightDialog: false,
                isShowAgeDialog: false,
                dialogType: "1",
                isShowSexDialog: false,
                isShowDelectDialog: false,
                isSelectSex: false,
                isSelectRelevance: false,
                sexPosition: 0,
                relevancePosition: 0
            };
            return _this;
        }

        babelHelpers.createClass(MultiUserEdit, [{
            key: "componentWillMount",
            value: function componentWillMount() { }
        }, {
            key: "componentWillUnmount",
            value: function componentWillUnmount() { }
        }, {
            key: "_keyboardDidShow",
            value: function _keyboardDidShow() { }
        }, {
            key: "_keyboardDidHide",
            value: function _keyboardDidHide() { }
        }, {
            key: "componentDidMount",
            value: function componentDidMount() {
                this.state.index = this.props.navigation.state.params.index;
                console.log("index = " + this.props.navigation.state.params.index);

                if (this.props.navigation.state.params.index >= 0) {
                    var userInfo = _YMUser2.default.getList()[this.props.navigation.state.params.index];

                    console.log("userInfo = " + userInfo.userName);
                    this.state.userName = userInfo.userName;
                    this.state.height = userInfo.height;
                    this.state.age = userInfo.age;
                    this.state.relevance = _Global.Function.converRelevanceToText(userInfo.relevance);

                    if (userInfo.sex == 1) {
                        this.state.sex = _Localized.Localized.Global_Sex_Male;
                    } else {
                        this.state.sex = _Localized.Localized.Global_Sex_Female;
                    }
                }

                this.setState({});
            }
        }, {
            key: "render",
            value: function render() {
                var _this2 = this;

                var rows = [{
                    title: _Localized.Localized.Global_UserInfo_Nickname,
                    type: 'userName',
                    func: function func(e) {
                        _this2.setState({
                            isShowUserNameDialog: true
                        });

                        _this2._keyboardDidShow();
                    }
                }, {
                    title: string_height,
                    type: 'height',
                    func: function func(e) {
                        _this2.setState({
                            isShowheightDialog: true
                        });
                    }
                }, {
                    title: string_age,
                    type: 'age',
                    func: function func(e) {
                        _this2.setState({
                            isShowAgeDialog: true
                        });
                    }
                }, {
                    title: _Localized.Localized.Global_UserInfo_Sex,
                    type: 'sex',
                    func: function func(e) {
                        if (_Global.Function.equalNull(_this2.state.sex)) {
                            _this2.setState({
                                isSelectSex: true
                            });
                        } else {
                            _this2.setState({
                                isShowSexDialog: true
                            });
                        }
                    }
                }];

                if (this.state.index != 0) {
                    rows.push({
                        title: _Localized.Localized.Global_UserInfo_Relevance,
                        type: 'relevance',
                        func: function func(e) {
                            _this2.setState({
                                isSelectRelevance: true
                            });
                        }
                    });
                }

                var dataSource = new _reactNative.ListView.DataSource({
                    rowHasChanged: function rowHasChanged(r1, r2) {
                        return r1 !== r2;
                    }
                }).cloneWithRows(rows.map(function (item, index) {
                    return _react2.default.createElement(
                        _reactNative.TouchableHighlight,
                        {
                            key: 'TouchableHighlight' + index,
                            underlayColor: 'transparent',
                            onPress: item.func
                        },
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: {
                                    alignItems: 'center'
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
                                        style: styles.rowTitle
                                    },
                                    item.title
                                ),
                                _react2.default.createElement(
                                    _reactNative.View,
                                    {
                                        style: {
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }
                                    },
                                    _react2.default.createElement(
                                        _reactNative.Text,
                                        {
                                            style: styles.rowSubtitle
                                        },
                                        _this2.state[item.type]
                                    ),
                                    _react2.default.createElement(_reactNative.Image, {
                                        style: styles.arrowIcon,
                                        source: _Global2.default.mnu_arrow
                                    })
                                )
                            ),
                            _react2.default.createElement(_reactNative.View, {
                                style: styles.separator
                            })
                        )
                    );
                }));
                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: styles.container
                    },
                    _react2.default.createElement(_reactNative.ListView, {
                        style: {
                            backgroundColor: 'white'
                        },
                        dataSource: dataSource,
                        renderRow: function renderRow(rowData) {
                            return rowData;
                        }
                    }),
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: [styles.bottomView, {
                                opacity: this.props.navigation.state.params.index <= 0 ? 0 : 1
                            }]
                        },
                        _react2.default.createElement(_reactNative.View, {
                            style: [styles.separator, {
                                width: _Global2.default.screenWidth()
                            }]
                        }),
                        _react2.default.createElement(
                            _reactNative.TouchableHighlight,
                            {
                                underlayColor: 'transparent',
                                onPress: function onPress(e) {
                                    _this2.setState({
                                        isShowDelectDialog: true
                                    });
                                }
                            },
                            _react2.default.createElement(_reactNative.Image, {
                                style: styles.deleteBtn,
                                source: _Global2.default.fml_deleteBtn
                            })
                        ),
                        _react2.default.createElement(
                            _reactNative.Text,
                            {
                                style: styles.deleteTitle
                            },
                            _Localized.Localized.Global_Interaction_Delete
                        )
                    ),
                    _react2.default.createElement(_ui.InputDialog, {
                        title: _Localized.Localized.Global_UserInfo_Nickname,
                        message: _Localized.Localized.MultiUser_Interaction_NicknameLimit,
                        singleLine: true,
                        cancel: string_cancel,
                        cancelable: false,
                        timeout: 0,
                        confirm: string_done,
                        placeholder: "请输入昵称",
                        onConfirm: function onConfirm(e) {
                            console.log('onConfirm', e);

                            _this2.saveUserName(e.text);
                        },
                        onDismiss: function onDismiss() {
                            console.log('onDismiss');

                            _this2._keyboardDidHide();

                            _this2.setState({
                                isShowUserNameDialog: false
                            });
                        },
                        visible: this.state.isShowUserNameDialog
                    }),
                    _react2.default.createElement(_ui.InputDialog, {
                        title: string_height + ' (cm)',
                        singleLine: true,
                        cancel: string_cancel,
                        cancelable: false,
                        timeout: 0,
                        confirm: string_done,
                        message: "请输入身高",
                        onConfirm: function onConfirm(e) {
                            console.log('onConfirm', e);

                            _this2.saveHeight(e.text);
                        },
                        onDismiss: function onDismiss() {
                            console.log('onDismiss');

                            _this2.setState({
                                isShowheightDialog: false
                            });
                        },
                        visible: this.state.isShowheightDialog
                    }),
                    _react2.default.createElement(_ui.InputDialog, {
                        title: string_age,
                        singleLine: true,
                        cancel: string_cancel,
                        cancelable: false,
                        timeout: 0,
                        confirm: string_done,
                        message: "请输入年龄",
                        onConfirm: function onConfirm(e) {
                            console.log('onConfirm', e);

                            _this2.saveAge(e.text);
                        },
                        onDismiss: function onDismiss() {
                            console.log('onDismiss');

                            _this2.setState({
                                isShowAgeDialog: false
                            });
                        },
                        visible: this.state.isShowAgeDialog
                    }),
                    _react2.default.createElement(_ui.MessageDialog, {
                        visible: this.state.dialogVisible,
                        confirm: "\u786E\u5B9A",
                        message: this.state.dialogMessage,
                        onDismiss: function onDismiss() {
                            _this2.setState({
                                dialogVisible: false
                            });
                        }
                    }),
                    _react2.default.createElement(_ui.MessageDialog, {
                        visible: this.state.isShowSexDialog,
                        confirm: "\u786E\u5B9A",
                        cancel: string_cancel,
                        message: _Localized.Localized.UserSetting_Interaction_ModifyGender,
                        onConfirm: function onConfirm() {
                            _this2.setState({
                                isSelectSex: true
                            });
                        },
                        onDismiss: function onDismiss() {
                            _this2.setState({
                                isShowSexDialog: false
                            });
                        }
                    }),
                    _react2.default.createElement(_ui.MessageDialog, {
                        visible: this.state.isShowDelectDialog,
                        confirm: "\u786E\u5B9A",
                        cancel: string_cancel,
                        message: _Localized.Localized.MultiUser_Interaction_DataWillDelete,
                        onConfirm: function onConfirm() {
                            _this2.deleteUserInfo();
                        },
                        onDismiss: function onDismiss() {
                            _this2.setState({
                                isShowDelectDialog: false
                            });
                        }
                    }),
                    _react2.default.createElement(_ui.SingleChoseDialog, {
                        visible: this.state.isSelectSex,
                        title: _Localized.Localized.Global_Interaction_PleaseFillInGender,
                        cancel: string_cancel,
                        confirm: string_done,
                        onConfirm: function onConfirm(e) {
                            console.log('onConfirm', e);

                            _this2.selectSex(sexPosition + 1);
                        },
                        onDismiss: function onDismiss(e) {
                            _this2.setState({
                                isSelectSex: false
                            });
                        },
                        onCheck: function onCheck(e) {
                            console.log('onCheck', e);
                            sexPosition = e.position;
                        },
                        dataSource: [_Localized.Localized.Global_Sex_Male, _Localized.Localized.Global_Sex_Female]
                    }),
                    _react2.default.createElement(_ui.SingleChoseDialog, {
                        visible: this.state.isSelectRelevance,
                        cancel: string_cancel,
                        confirm: string_done,
                        title: _Localized.Localized.Global_Interaction_PleaseFillInRelevance,
                        onConfirm: function onConfirm(e) {
                            console.log('onConfirm', e);

                            _this2.selectRelevance(_Global.Function.converTextToRelevance(relevanceList[relevancePosition]));
                        },
                        onCheck: function onCheck(e) {
                            console.log('onCheck', e);
                            relevancePosition = e.position;
                        },
                        onDismiss: function onDismiss(e) {
                            _this2.setState({
                                isSelectRelevance: false
                            });
                        },
                        dataSource: relevanceList
                    })
                );
            }
        }]);
        return MultiUserEdit;
    }(_react.Component);

    MultiUserEdit.navigationOptions = function (_ref) {
        var navigation = _ref.navigation;
        return {
            header: _react2.default.createElement(_NewNavBar2.default, {
                title: navigation.getParam('index') < 0 ? _Localized.Localized.FamilyMembersAdd_Title : _Localized.Localized.MultiUserEdit_Title,
                style: {
                    backgroundColor: "rgb(239, 239, 240)"
                },
                type: "light",
                haveDividerLine: true,
                rightText: _Localized.Localized.Global_Interaction_Save,
                onPressRight2: function onPressRight2() {
                    return (0, _HandlerOnceTap2.default)(function () {
                        navigation.state.params.saveUserInfo();
                    });
                },
                onPressLeft: function onPressLeft() {
                    navigation.goBack();
                }
            })
        };
    };

    exports.default = MultiUserEdit;
    var sexPosition = 0;
    var relevancePosition = 0;
    var relevanceList = [_Localized.Localized.Globla_Relevance_Mom, _Localized.Localized.Globla_Relevance_Husband, _Localized.Localized.Globla_Relevance_Wife, _Localized.Localized.Globla_Relevance_Son, _Localized.Localized.Globla_Relevance_Daughter, _Localized.Localized.Globla_Relevance_Grandpa, _Localized.Localized.Globla_Relevance_Grandma, _Localized.Localized.Globla_Relevance_Brother, _Localized.Localized.Globla_Relevance_OlderSister, _Localized.Localized.Globla_Relevance_YoungerBrother, _Localized.Localized.Globla_Relevance_YoungerSister, _Localized.Localized.Globla_Relevance_Other];

    var styles = _reactNative.StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 0,
            marginTop: 0
        },
        rightComponent: {
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            width: 44,
            height: 44,
            top: _Global2.default.statusBarHeight(),
            right: 12
        },
        rowContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 51,
            width: _Global2.default.screenWidth()
        },
        rowTitle: {
            fontSize: 16,
            color: 'rgba(0, 0, 0, 0.8)',
            marginLeft: 15
        },
        rowSubtitle: {
            fontSize: 13,
            color: 'rgba(0, 0, 0, 0.5)',
            marginRight: 11
        },
        arrowIcon: {
            width: 7,
            height: 14,
            marginRight: 15
        },
        separator: {
            height: 0.5,
            width: _Global2.default.screenWidth() - 30,
            backgroundColor: 'rgb(218, 218, 218)'
        },
        bottomView: {
            position: 'absolute',
            alignItems: 'center',
            width: _Global2.default.screenWidth(),
            height: 85 + _Global2.default.bottomSafePadding(),
            right: 0,
            bottom: 0
        },
        deleteBtn: {
            width: 33,
            height: 33,
            marginTop: 12
        },
        deleteTitle: {
            fontSize: 12,
            color: 'rgba(0, 0, 0, 0.4)',
            marginTop: 8
        }
    });
}, 10466, [10297, 10033, 10010, 10019, 10022, 10007, 10469, 10013, 10379, 10074, 10472, 10230, 10475], "projects/com.yunmai.scales.ios/Main/MultiUserManagement/MultiUserEdit.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _reactNativeSqliteStorage = _require(_dependencyMap[0]);

    var _reactNativeSqliteStorage2 = babelHelpers.interopRequireDefault(_reactNativeSqliteStorage);

    var _YMUser = _require(_dependencyMap[1]);

    var _YMUser2 = babelHelpers.interopRequireDefault(_YMUser);

    var _Global = _require(_dependencyMap[2]);

    var _Global2 = babelHelpers.interopRequireDefault(_Global);

    var _miot = _require(_dependencyMap[3]);

    _reactNativeSqliteStorage2.default.DEBUG(false);

    _reactNativeSqliteStorage2.default.enablePromise(false);

    var database_name = 'scale.db';
    var database_version = '1.0';
    var database_displayname = 'MySQLite';
    var database_size = 200000;
    var testFlag = false;
    var Weight_TABLE_NAME = testFlag ? 'WeightTableTest' : 'WeightTable';

    var SQLite = function () {
        function SQLite(props) {
            var _this = this;

            babelHelpers.classCallCheck(this, SQLite);

            this.open = function () {
                _this.db = _reactNativeSqliteStorage2.default.openDatabase(database_name, database_version, database_displayname, database_size, function () {
                    _Global.Function.successLog('打开数据库');
                }, function (err) {
                    _Global.Function.failedLog('打开数据库', err);
                });
            };

            this.close = function () {
                if (_this.db) {
                    _Global.Function.successLog('关闭数据库');

                    _this.db.close();
                } else {
                    _Global.Function.failedLog('数据库未打开');
                }
            };

            this.normalLog = function (message, objs) { };

            this.successLog = function (message) { };

            this.failedLog = function (message, err) { };

            this.open();
            var sql = ['CREATE TABLE IF NOT EXISTS', Weight_TABLE_NAME, '(', 'uid INTEGER,', 'did VARCHAR,', 'deviceName VARCHAR,', 'macNo VARCHAR,', 'deviceVer VARCHAR,', 'weight FLOAT,', 'bmi FLOAT,', 'fat FLOAT,', 'muscle FLOAT,', 'water FLOAT,', 'protein FLOAT,', 'visFat INTEGER,', 'bone FLOAT,', 'bmr INTEGER,', 'somaAge INTEGER,', 'resistance INTEGER,', 'createTime INTEGER NOT NULL UNIQUE,', 'isUploaded INTEGER,', 'val1 FLOAT,', 'val2 FLOAT,', 'val3 FLOAT,', 'text1 VARCHAR,', 'text2 VARCHAR', ')'].join(' ');
            this.db.executeSql(sql, [], function () {
                _Global.Function.successLog('创建表');
            }, function (err) {
                _Global.Function.failedLog('创建表', err);
            });
        }

        babelHelpers.createClass(SQLite, [{
            key: "saveSingleWeightInfo",
            value: function saveSingleWeightInfo(data) {
                if (!this.db) {
                    this.open();
                }

                var sql = ['INSERT OR REPLACE INTO', Weight_TABLE_NAME, '(', 'uid,', 'did,', 'deviceName,', 'macNo,', 'deviceVer,', 'weight,', 'bmi,', 'fat,', 'muscle,', 'water,', 'protein,', 'visFat,', 'bone,', 'bmr,', 'somaAge,', 'resistance,', 'createTime,', 'isUploaded', ') VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'].join(' ');
                var arr = [data.uid, data.did, data.deviceName, data.macNo, data.deviceVer, data.weight, data.bmi, data.fat, data.muscle, data.water, data.protein, data.visFat, data.bone, data.bmr, data.somaAge, data.resistance, data.createTime, data.isUploaded];
                this.db.transaction(function (db) {
                    db.executeSql(sql, arr, function () {
                        _Global.Function.successLog('保存一条体重记录 uid: ' + data.uid);
                    }, function (err) {
                        _Global.Function.failedLog('保存一条体重记录 uid: ' + data.uid, err);
                    });
                }, function (error) {
                    _Global.Function.failedLog('保存一条体重记录 事务 uid: ' + data.uid, error);
                }, function () {
                    _Global.Function.successLog('保存一条体重记录 事务 uid: ' + data.uid);
                });
            }
        }, {
            key: "saveWeightInfoList",
            value: function saveWeightInfoList(weightArr, callBack) {
                if (!this.db) {
                    this.open();
                }

                _Global.Function.normalLog('批量保存称重数据', [weightArr]);

                var sql = ['INSERT OR REPLACE INTO', Weight_TABLE_NAME, '(', 'uid,', 'did,', 'deviceName,', 'macNo,', 'deviceVer,', 'weight,', 'bmi,', 'fat,', 'muscle,', 'water,', 'protein,', 'visFat,', 'bone,', 'bmr,', 'somaAge,', 'resistance,', 'createTime,', 'isUploaded', ') VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'].join(' ');
                var len = weightArr.length;
                this.db.transaction(function (db) {
                    weightArr.map(function (item, index) {
                        var arr = [item.uid, item.did, item.deviceName, item.macNo, item.deviceVer, item.weight, item.bmi, item.fat, item.muscle, item.water, item.protein, item.visFat, item.bone, item.bmr, item.somaAge, item.resistance, item.createTime, item.isUploaded];
                        db.executeSql(sql, arr, function () {
                            _Global.Function.successLog('批量保存称重数据 index:' + index);
                        }, function (err) {
                            _Global.Function.failedLog('批量保存称重数据 index:' + index, '', err);
                        });
                    });
                }, function (error) {
                    _Global.Function.failedLog('批量保存称重数据 事务', error);
                }, function () {
                    _Global.Function.successLog('批量保存称重数据 事务');

                    if (callBack) {
                        callBack();
                    }
                });
            }
        }, {
            key: "getLastWeightInfoByUid",
            value: function getLastWeightInfoByUid(uid, callBack) {
                if (!callBack) {
                    _Global.Function.failedLog('获取最新一条体重信息 未传递回调函数');

                    return;
                }

                if (!this.db) {
                    this.open();
                }

                var isMain = false;

                if (uid == _YMUser2.default.getMainUserInfo().shortId) {
                    isMain = true;
                }

                var sql = ['SELECT * FROM', Weight_TABLE_NAME, isMain ? 'WHERE (uid = ? OR uid = ' + _miot.Service.account.ID + ' OR uid = 0 OR uid IS NULL)' : 'WHERE uid = ?', 'AND did = ?', 'ORDER BY createTime DESC', 'LIMIT 1'].join(' ');

                _Global.Function.normalLog('获取最新一条体重信息 sql: ' + sql + 'did' + _miot.Device.deviceID + ' us ' + uid);

                this.db.executeSql(sql, [uid, _miot.Device.deviceID || ''], function (rowCallback) {
                    _Global.Function.normalLog('获取最新一条体重信息 uid1: ' + uid, [rowCallback.rows.item(0)]);

                    callBack(rowCallback.rows.item(0));
                }, function (err) {
                    _Global.Function.failedLog('获取最新一条体重信息 uid: ' + uid, err);
                });
            }
        }, {
            key: "getSectionWeightInfoForCurve",
            value: function getSectionWeightInfoForCurve(uid, startTimestamp, endTimestamp, callBack) {
                if (!callBack) {
                    _Global.Function.failedLog('曲线页面数据查询 未传递回调函数');

                    return;
                }

                if (!this.db) {
                    this.open();
                }

                var isMain = false;

                if (uid == _YMUser2.default.getMainUserInfo().shortId) {
                    isMain = true;
                }

                var sql = ['SELECT * FROM', Weight_TABLE_NAME, isMain ? 'WHERE (uid = ? OR uid = ' + _miot.Service.account.ID + ' OR uid = 0 OR uid IS NULL)' : 'WHERE uid = ?', 'AND did = ?', 'AND createTime BETWEEN ? AND ?', 'ORDER BY createTime'].join(' ');
                this.db.executeSql(sql, [uid, _miot.Device.deviceID || '', startTimestamp, endTimestamp], function (rowCallback) {
                    var len = rowCallback.rows.length;
                    var result = [];

                    for (var index = 0; index < len; index++) {
                        result.push(rowCallback.rows.item(index));
                    }

                    callBack(result);

                    _Global.Function.normalLog('曲线页面数据查询 uid: ' + uid, result);

                    _Global.Function.successLog('曲线页面数据查询 uid: ' + uid);
                }, function (err) {
                    callBack();

                    _Global.Function.failedLog('曲线页面数据查询 uid: ' + uid, err);
                });
            }
        }, {
            key: "getSectionWeightInfoForList",
            value: function getSectionWeightInfoForList(uid, startTimestamp, endTimestamp, limit, offset, callBack) {
                if (!callBack) {
                    _Global.Function.failedLog('列表页面数据查询 未传递回调函数');

                    return;
                }

                if (!this.db) {
                    this.open();
                }

                var isMain = false;

                if (uid == _YMUser2.default.getMainUserInfo().shortId) {
                    isMain = true;
                }

                var sql = ['SELECT * FROM', Weight_TABLE_NAME, isMain ? 'WHERE (uid = ? OR uid = ' + _miot.Service.account.ID + ' OR uid = 0 OR uid IS NULL)' : 'WHERE uid = ?', 'AND did = ?', 'AND createTime BETWEEN ? AND ?', 'ORDER BY createTime DESC', 'LIMIT ?', 'OFFSET ?'].join(' ');
                this.db.executeSql(sql, [uid, _miot.Device.deviceID || '', startTimestamp, endTimestamp, limit, offset], function (rowCallback) {
                    var len = rowCallback.rows.length;
                    var result = [];

                    for (var index = 0; index < len; index++) {
                        result.push(rowCallback.rows.item(index));
                    }

                    callBack(result);

                    _Global.Function.normalLog('列表页面数据查询 uid: ' + uid, result);

                    _Global.Function.successLog('列表页面数据查询 uid: ' + uid);
                }, function (err) {
                    callBack();

                    _Global.Function.failedLog('列表页面数据查询 uid: ' + uid, err);
                });
            }
        }, {
            key: "getAllUnUploadedData",
            value: function getAllUnUploadedData(callBack) {
                if (!callBack) {
                    _Global.Function.failedLog('获取所有未上传的数据 未传递回调函数');

                    return;
                }

                if (!this.db) {
                    this.open();
                }

                var sql = ['SELECT * FROM', Weight_TABLE_NAME, 'WHERE isUploaded = 0'].join(' ');
                this.db.executeSql(sql, [], function (rowCallback) {
                    var len = rowCallback.rows.length;
                    var result = [];

                    for (var index = 0; index < len; index++) {
                        result.push(rowCallback.rows.item(index));
                    }

                    callBack(result);

                    _Global.Function.normalLog('获取所有未上传的数据 ', result);

                    _Global.Function.successLog('获取所有未上传的数据 ');
                }, function (err) {
                    _Global.Function.failedLog('获取所有未上传的数据 ', err);
                });
            }
        }, {
            key: "deleteAllWeightInfoByUid",
            value: function deleteAllWeightInfoByUid(uid) {
                if (!this.db) {
                    this.open();
                }

                var sql = ['DELETE FROM', Weight_TABLE_NAME, 'WHERE uid = ?'].join(' ');
                this.db.executeSql(sql, [uid], function () {
                    _Global.Function.successLog('删除某ID对应的所有体重信息 uid: ' + uid);
                }, function (err) {
                    _Global.Function.failedLog('删除某ID对应的所有体重信息 uid: ' + uid, err);
                });
            }
        }, {
            key: "deleteWeight",
            value: function deleteWeight(weightData, callBack) {
                if (!this.db) {
                    this.open();
                }

                var sql = ['DELETE FROM ', Weight_TABLE_NAME, " WHERE uid = ?  and did = '" + weightData.did + '\' and weight = ' + weightData.weight + ' and fat = ' + weightData.fat + ' and createTime = ' + weightData.createTime].join(' ');
                this.db.dele;
                this.db.executeSql(sql, [weightData.uid], function () {
                    callBack(weightData);
                }, function (err) {
                    callBack(weightData);
                });
            }
        }, {
            key: "test",
            value: function test() {
                if (!this.db) {
                    this.open();
                }

                var sql = ['SELECT * FROM', Weight_TABLE_NAME, 'WHERE uid = 1000385'].join(' ');
                this.db.executeSql(sql, [], function (rowCallback) {
                    var len = rowCallback.rows.length;
                    var result = [];

                    for (var index = 0; index < len; index++) {
                        console.log('larry sue start');
                        console.log(rowCallback.rows.item(index));
                        console.log('larry sue end');
                    }

                    _Global.Function.normalLog('测试方法', [rowCallback.rows.length]);

                    _Global.Function.successLog('测试方法');
                }, function (err) {
                    _Global.Function.failedLog('测试方法', err);
                });
            }
        }]);
        return SQLite;
    }();

    exports.default = SQLite;
}, 10469, [13681, 10019, 10010, 10074], "projects/com.yunmai.scales.ios/Main/Tools/SQLite.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var _NativeModules = _require(_dependencyMap[2]);

    var _Localized = _require(_dependencyMap[3]);

    var _Global = _require(_dependencyMap[4]);

    var _Global2 = babelHelpers.interopRequireDefault(_Global);

    var SelectSex = function (_Component) {
        babelHelpers.inherits(SelectSex, _Component);

        function SelectSex(props) {
            babelHelpers.classCallCheck(this, SelectSex);

            var _this = babelHelpers.possibleConstructorReturn(this, (SelectSex.__proto__ || Object.getPrototypeOf(SelectSex)).call(this, props));

            _this.openPicker = function () {
                _this.setState({
                    modalVisible: true
                });
            };

            _this.closePicker = function () {
                _this.setState({
                    modalVisible: false
                });
            };

            _this.state = {
                modalVisible: false,
                selected: 1
            };
            return _this;
        }

        babelHelpers.createClass(SelectSex, [{
            key: "render",
            value: function render() {
                var _this2 = this;

                return _react2.default.createElement(
                    _reactNative.Modal,
                    {
                        animationType: "slide",
                        transparent: true,
                        onRequestClose: function onRequestClose() {
                            _this2.closePicker();
                        },
                        visible: this.state.modalVisible
                    },
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: styles.modalBackgroundStyle
                        },
                        _react2.default.createElement(
                            _reactNative.TouchableHighlight,
                            {
                                underlayColor: "transparent",
                                onPress: this.closePicker()
                            },
                            _react2.default.createElement(_reactNative.View, {
                                style: styles.backgroundContainer
                            })
                        ),
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: {
                                    backgroundColor: "#ffffff",
                                    height: 200
                                }
                            },
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: styles.topView
                                },
                                _react2.default.createElement(
                                    _reactNative.Text,
                                    {
                                        style: {
                                            fontSize: 16,
                                            color: 'rgba(0, 0, 0, 0.8)'
                                        }
                                    },
                                    _Localized.Localized.Global_Interaction_PleaseFillInGender
                                )
                            ),
                            _react2.default.createElement(_reactNative.View, {
                                style: styles.lineView
                            }),
                            _react2.default.createElement(_reactNative.FlatList, {
                                data: [{
                                    value: _Localized.Localized.Global_Sex_Male,
                                    index: 1
                                }, {
                                    value: _Localized.Localized.Global_Sex_Female,
                                    index: 2
                                }],
                                ItemSeparatorComponent: this.sepa,
                                renderItem: function renderItem(_ref) {
                                    var item = _ref.item;
                                    return _react2.default.createElement(
                                        _reactNative.TouchableHighlight,
                                        {
                                            underlayColor: "transparent",
                                            style: {
                                                height: 40,
                                                marginLeft: 20,
                                                justifyContent: "center",
                                                alignItems: "center"
                                            },
                                            onPress: function onPress() {
                                                console.log("onItemClick11" + item);

                                                _this2.setState({
                                                    selected: item.index
                                                });

                                                _this2.props.callbackParent(item.index);

                                                _this2.closePicker();
                                            }
                                        },
                                        _react2.default.createElement(
                                            _reactNative.Text,
                                            {
                                                style: {
                                                    color: "#000000"
                                                }
                                            },
                                            item.value
                                        )
                                    );
                                },
                                keyExtractor: function keyExtractor(item) {
                                    return item.index;
                                },
                                style: styles.picker
                            }),
                            _react2.default.createElement(_reactNative.View, {
                                style: styles.lineView
                            })
                        )
                    )
                );
            }
        }, {
            key: "sepa",
            value: function sepa() {
                return _react2.default.createElement(_reactNative.View, {
                    style: {
                        height: 0.5,
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        marginLeft: 20,
                        marginRight: 20
                    }
                });
            }
        }, {
            key: "listItem",
            value: function listItem(_ref2) {
                var item = _ref2.item;
                return _react2.default.createElement(
                    _reactNative.TouchableHighlight,
                    {
                        style: {
                            height: 50,
                            marginLeft: 20,
                            justifyContent: "center"
                        },
                        onPress: this.onItemClick
                    },
                    _react2.default.createElement(
                        _reactNative.Text,
                        {
                            style: {
                                color: "#000000"
                            }
                        },
                        item.value
                    )
                );
            }
        }]);
        return SelectSex;
    }(_react.Component);

    exports.default = SelectSex;

    var styles = _reactNative.StyleSheet.create({
        backgroundContainer: {
            flex: 1,
            height: _Global2.default.screenHeight(),
            width: _Global2.default.screenWidth(),
            backgroundColor: 'rgba(52,52,52,0.5)'
        },
        modalBackgroundStyle: {
            width: _Global2.default.screenWidth(),
            height: _Global2.default.screenHeight(),
            backgroundColor: 'rgba(52,52,52,0.5)',
            justifyContent: "flex-end",
            alignItems: "flex-end"
        },
        topView: {
            width: _Global2.default.screenWidth(),
            height: 50,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: "center",
            backgroundColor: 'white'
        },
        lineView: {
            backgroundColor: 'rgb(232, 232, 232)',
            height: 0.5,
            width: _Global2.default.screenWidth()
        },
        leftText: {
            marginLeft: 15,
            fontSize: 16,
            color: 'rgba(0, 0, 0, 0.5)'
        },
        rightText: {
            marginRight: 15,
            fontSize: 16,
            color: 'rgba(0, 0, 0, 0.8)'
        },
        picker: {
            width: _Global2.default.screenWidth(),
            backgroundColor: 'white'
        }
    });
}, 10472, [10297, 10033, 10042, 10013, 10010], "projects/com.yunmai.scales.ios/Main/SelectSexDialog.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var isCalled = false,
        timer = void 0;

    exports.default = HandlerOnceTap = function HandlerOnceTap(functionTobeCalled) {
        var interval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;

        if (!isCalled) {
            isCalled = true;
            clearTimeout(timer);
            timer = setTimeout(function () {
                isCalled = false;
            }, interval);
            return functionTobeCalled();
        }
    };
}, 10475, [], "projects/com.yunmai.scales.ios/CommonModules/HandlerOnceTap.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var _Global = _require(_dependencyMap[2]);

    var _Global2 = babelHelpers.interopRequireDefault(_Global);

    var _Localized = _require(_dependencyMap[3]);

    var _YMUser = _require(_dependencyMap[4]);

    var _YMUser2 = babelHelpers.interopRequireDefault(_YMUser);

    var _NewNavBar = _require(_dependencyMap[5]);

    var _NewNavBar2 = babelHelpers.interopRequireDefault(_NewNavBar);

    var _SelectSexDialog = _require(_dependencyMap[6]);

    var _SelectSexDialog2 = babelHelpers.interopRequireDefault(_SelectSexDialog);

    var _ui = _require(_dependencyMap[7]);

    var string_done = _Localized.Localized.Global_Interaction_Done;
    var string_cancel = _Localized.Localized.Global_Interaction_Cancel;
    var string_alert = _Localized.Localized.Global_Interaction_Alert;
    var string_height = _Localized.Localized.Global_UserInfo_Height;
    var string_age = _Localized.Localized.Global_UserInfo_Age;

    var VisitorModeView = function (_Component) {
        babelHelpers.inherits(VisitorModeView, _Component);

        function VisitorModeView(props, context) {
            babelHelpers.classCallCheck(this, VisitorModeView);

            var _this = babelHelpers.possibleConstructorReturn(this, (VisitorModeView.__proto__ || Object.getPrototypeOf(VisitorModeView)).call(this, props, context));

            _this.selectSex = function (sex) {
                this.state.sex = sex;

                if (sex == 1) {
                    this.state.userSex = _Localized.Localized.Global_Sex_Male;
                } else {
                    this.state.userSex = _Localized.Localized.Global_Sex_Female;
                }

                this.setState({});
            }.bind(_this);

            _this.saveHeight = function (text) {
                var reg = new RegExp("^[0-9]*$");

                if (!reg.test(text)) {
                    _this.setState({
                        dialogVisible: true,
                        dialogMessage: _Localized.Localized.Global_Interaction_PleaseEnterNumber
                    });

                    return;
                }

                if (text > 226) {
                    _this.setState({
                        dialogVisible: true,
                        dialogMessage: _Localized.Localized.Global_Interaction_TooHigh
                    });
                } else if (text < 100) {
                    _this.setState({
                        dialogVisible: true,
                        dialogMessage: _Localized.Localized.Global_Interaction_TooLow
                    });
                } else {
                    _this.state.userHeight = text;
                    _this.state.heightUnit = ' cm';

                    _this.setState({});
                }
            };

            _this.saveAge = function (text) {
                var reg = new RegExp("^[0-9]*$");

                if (!reg.test(text)) {
                    _this.setState({
                        dialogVisible: true,
                        dialogMessage: _Localized.Localized.Global_Interaction_PleaseEnterNumber
                    });

                    return;
                }

                if (text > 100) {
                    _this.setState({
                        dialogVisible: true,
                        dialogMessage: _Localized.Localized.Global_Interaction_TooOld
                    });
                } else if (text < 1) {
                    _this.setState({
                        dialogVisible: true,
                        dialogMessage: _Localized.Localized.Global_Interaction_TooYoung
                    });
                } else {
                    _this.state.userAge = text;
                    _this.state.ageUnit = ' ' + _Localized.Localized.Global_Unit_Years;

                    _this.setState({});
                }
            };

            _this.state = {
                userHeight: '',
                userAge: '',
                userSex: '',
                sex: 1,
                heightUnit: '',
                ageUnit: '',
                isShowHeight: false,
                isShowAge: false,
                dialogMessage: "",
                dialogVisible: false,
                isSelectSex: false
            };
            return _this;
        }

        babelHelpers.createClass(VisitorModeView, [{
            key: "render",
            value: function render() {
                var _this2 = this;

                var dataSource = new _reactNative.ListView.DataSource({
                    rowHasChanged: function rowHasChanged(r1, r2) {
                        return r1 !== r2;
                    }
                }).cloneWithRows([{
                    title: string_height,
                    unit: this.state.heightUnit,
                    userData: this.state.userHeight,
                    func: function func() {
                        _this2.setState({
                            isShowHeight: true
                        });
                    }
                }, {
                    title: string_age,
                    unit: this.state.ageUnit,
                    userData: this.state.userAge,
                    func: function func() {
                        _this2.setState({
                            isShowAge: true
                        });
                    }
                }, {
                    title: _Localized.Localized.Global_UserInfo_Sex,
                    unit: '',
                    userData: this.state.userSex,
                    func: function func() {
                        _this2.setState({
                            isSelectSex: true
                        });
                    }
                }].map(function (item, index) {
                    return _react2.default.createElement(RowCell, {
                        title: item.title,
                        unit: item.unit,
                        userData: item.userData,
                        onPress: item.func
                    });
                }));
                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: mainStyles.container
                    },
                    _react2.default.createElement(_reactNative.ListView, {
                        style: mainStyles.list,
                        dataSource: dataSource,
                        showsVerticalScrollIndicator: false,
                        bounces: false,
                        renderRow: function renderRow(rowData) {
                            return rowData;
                        }
                    }),
                    _react2.default.createElement(
                        _reactNative.Text,
                        {
                            style: mainStyles.visitorText
                        },
                        '* ' + _Localized.Localized.VisitorMode_Text_TheDataIsNotSaved
                    ),
                    _react2.default.createElement(
                        _reactNative.TouchableOpacity,
                        {
                            style: mainStyles.footerView,
                            onPress: function onPress() {
                                if (_Global.Function.equalNull(_this2.state.userHeight)) {
                                    _this2.setState({
                                        dialogVisible: true,
                                        dialogMessage: _Localized.Localized.Global_Interaction_PleaseFillInHeight
                                    });
                                } else if (_Global.Function.equalNull(_this2.state.userAge)) {
                                    _this2.setState({
                                        dialogVisible: true,
                                        dialogMessage: _Localized.Localized.Global_Interaction_PleaseFillInAge
                                    });
                                } else if (_Global.Function.equalNull(_this2.state.userSex)) {
                                    _this2.setState({
                                        dialogVisible: true,
                                        dialogMessage: _Localized.Localized.Global_Interaction_PleaseFillInGender
                                    });
                                } else {
                                    _YMUser2.default.setCurrentForVisitor();

                                    var visitorInfo = _YMUser2.default.getVisitorInfo();

                                    visitorInfo.height = parseInt(_this2.state.userHeight);
                                    visitorInfo.age = parseInt(_this2.state.userAge);
                                    visitorInfo.sex = parseInt(_this2.state.sex);

                                    _this2.props.navigation.pop();

                                    _reactNative.DeviceEventEmitter.emit('writUserInfoToSacle', {});

                                    _reactNative.DeviceEventEmitter.emit('changeToVisitorMode', {});
                                }
                            }
                        },
                        _react2.default.createElement(
                            _reactNative.Text,
                            {
                                style: mainStyles.footerText
                            },
                            string_done
                        )
                    ),
                    _react2.default.createElement(_ui.InputDialog, {
                        title: string_height + ' (cm)',
                        singleLine: true,
                        cancel: string_cancel,
                        cancelable: false,
                        timeout: 0,
                        confirm: string_done,
                        message: "请输入身高",
                        defaultText: this.state.userHeight,
                        onConfirm: function onConfirm(e) {
                            console.log('onConfirm', e);

                            _this2.saveHeight(e.text);
                        },
                        onDismiss: function onDismiss() {
                            console.log('onDismiss');

                            _this2.setState({
                                isShowHeight: false
                            });
                        },
                        visible: this.state.isShowHeight
                    }),
                    _react2.default.createElement(_ui.InputDialog, {
                        title: string_age,
                        singleLine: true,
                        cancel: string_cancel,
                        cancelable: false,
                        timeout: 0,
                        confirm: string_done,
                        message: "请输入年龄",
                        defaultText: this.state.userAge,
                        onConfirm: function onConfirm(e) {
                            console.log('onConfirm', e);

                            _this2.saveAge(e.text);
                        },
                        onDismiss: function onDismiss() {
                            console.log('onDismiss');

                            _this2.setState({
                                isShowAge: false
                            });
                        },
                        visible: this.state.isShowAge
                    }),
                    _react2.default.createElement(_ui.SingleChoseDialog, {
                        visible: this.state.isSelectSex,
                        title: _Localized.Localized.Global_Interaction_PleaseFillInGender,
                        cancel: string_cancel,
                        confirm: string_done,
                        onConfirm: function onConfirm(e) {
                            _this2.selectSex(sexPosition + 1);
                        },
                        onDismiss: function onDismiss(e) {
                            _this2.setState({
                                isSelectSex: false
                            });
                        },
                        onCheck: function onCheck(e) {
                            console.log('onCheck', e);
                            sexPosition = e.position;
                        },
                        dataSource: [_Localized.Localized.Global_Sex_Male, _Localized.Localized.Global_Sex_Female]
                    }),
                    _react2.default.createElement(_ui.MessageDialog, {
                        visible: this.state.dialogVisible,
                        title: "",
                        confirm: "\u786E\u5B9A",
                        message: this.state.dialogMessage,
                        onDismiss: function onDismiss() {
                            _this2.setState({
                                dialogVisible: false
                            });
                        }
                    })
                );
            }
        }]);
        return VisitorModeView;
    }(_react.Component);

    VisitorModeView.navigationOptions = function (_ref) {
        var navigation = _ref.navigation;
        return {
            header: _react2.default.createElement(_NewNavBar2.default, {
                title: _Localized.Localized.VisitorMode_InnerTitle,
                style: {
                    backgroundColor: "rgb(239, 239, 240)"
                },
                type: "light",
                haveDividerLine: true,
                onPressLeft: function onPressLeft() {
                    navigation.goBack();
                }
            })
        };
    };

    exports.default = VisitorModeView;
    var sexPosition = 0;

    var RowCell = function (_Component2) {
        babelHelpers.inherits(RowCell, _Component2);

        function RowCell() {
            babelHelpers.classCallCheck(this, RowCell);
            return babelHelpers.possibleConstructorReturn(this, (RowCell.__proto__ || Object.getPrototypeOf(RowCell)).apply(this, arguments));
        }

        babelHelpers.createClass(RowCell, [{
            key: "render",
            value: function render() {
                return _react2.default.createElement(
                    _reactNative.TouchableOpacity,
                    {
                        onPress: this.props.onPress
                    },
                    _react2.default.createElement(
                        _reactNative.View,
                        null,
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: rowCellStyle.container
                            },
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: rowCellStyle.title
                                },
                                this.props.title
                            ),
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: rowCellStyle.rightPart
                                },
                                _react2.default.createElement(
                                    _reactNative.Text,
                                    {
                                        style: rowCellStyle.userText
                                    },
                                    this.props.userData + this.props.unit
                                ),
                                _react2.default.createElement(_reactNative.Image, {
                                    style: rowCellStyle.arrowImage,
                                    source: _Global2.default.mnu_arrow
                                })
                            )
                        ),
                        _react2.default.createElement(_reactNative.View, {
                            style: rowCellStyle.separator
                        })
                    )
                );
            }
        }]);
        return RowCell;
    }(_react.Component);

    var mainStyles = _reactNative.StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            marginBottom: 0,
            marginTop: 0
        },
        list: {
            alignSelf: 'stretch'
        },
        visitorText: {
            fontSize: 13,
            color: 'rgb(255, 84, 0)',
            position: 'absolute',
            top: 173 + _Global2.default.topHeight(),
            left: 15
        },
        footerView: {
            borderRadius: 20,
            borderWidth: 0.5,
            borderColor: 'rgba(0, 0, 0, 0.2)',
            height: 40,
            width: _Global2.default.screenWidth() - 46,
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center'
        },
        footerText: {
            fontSize: 16,
            color: 'rgba(0, 0, 0, 0.8)'
        }
    });

    var rowCellStyle = _reactNative.StyleSheet.create({
        container: {
            flex: 1,
            alignSelf: 'stretch',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 51
        },
        title: {
            fontSize: 16,
            color: 'rgba(0, 0, 0, 0.8)',
            marginLeft: 15
        },
        separator: {
            height: 0.5,
            backgroundColor: 'rgb(218, 218, 218)',
            marginLeft: 15,
            marginRight: 15
        },
        rightPart: {
            flexDirection: 'row'
        },
        userText: {
            fontSize: 13,
            color: 'rgba(0, 0, 0, 0.5)',
            marginRight: 10
        },
        arrowImage: {
            width: 7,
            height: 13.5,
            marginRight: 15
        }
    });
}, 10478, [10297, 10033, 10010, 10013, 10019, 10379, 10472, 10230], "projects/com.yunmai.scales.ios/Main/VisitorModeView.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var _Localized = _require(_dependencyMap[2]);

    var _Global = _require(_dependencyMap[3]);

    var _Global2 = babelHelpers.interopRequireDefault(_Global);

    var _NewNavBar = _require(_dependencyMap[4]);

    var _NewNavBar2 = babelHelpers.interopRequireDefault(_NewNavBar);

    var Helper = function (_Component) {
        babelHelpers.inherits(Helper, _Component);

        function Helper(props) {
            babelHelpers.classCallCheck(this, Helper);

            var _this = babelHelpers.possibleConstructorReturn(this, (Helper.__proto__ || Object.getPrototypeOf(Helper)).call(this, props));

            _this.onClickBack = function () {
                _this.webView.goBack();
            };

            _this.URL = 'http://www.iyunmai.com/others/mijiaHelp/';
            _this.currentURL = _this.URL;

            _this.props.navigation.setParams({
                URL: _this.URL,
                currentURL: _this.currentURL
            });

            _this.props.navigation.setParams({
                onClickBack: _this.onClickBack
            });

            return _this;
        }

        babelHelpers.createClass(Helper, [{
            key: "render",
            value: function render() {
                var _this2 = this;

                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: styles.container
                    },
                    _react2.default.createElement(_reactNative.WebView, {
                        ref: function ref(_ref) {
                            return _this2.webView = _ref;
                        },
                        style: styles.webView,
                        source: {
                            uri: this.URL
                        },
                        onShouldStartLoadWithRequest: function onShouldStartLoadWithRequest(e) {
                            _this2.currentURL = e.url;
                            console.log("e.url = " + e.url);

                            _this2.props.navigation.setParams({
                                currentURL: e.url
                            });

                            return true;
                        }
                    })
                );
            }
        }]);
        return Helper;
    }(_react.Component);

    Helper.navigationOptions = function (_ref2) {
        var navigation = _ref2.navigation;
        return {
            header: _react2.default.createElement(_NewNavBar2.default, {
                title: _Localized.Localized.Help_Title,
                style: {
                    backgroundColor: "rgb(239, 239, 240)"
                },
                type: "light",
                haveDividerLine: true,
                onPressLeft: function onPressLeft() {
                    var URL = navigation.getParam("URL");
                    var currentURL = navigation.getParam("currentURL");
                    console.log("URL = " + URL + ' currentURL = ' + currentURL);

                    if (currentURL != URL && currentURL.indexOf(URL) >= 0) {
                        navigation.state.params.onClickBack();
                    } else {
                        navigation.goBack();
                    }
                }
            })
        };
    };

    exports.default = Helper;

    var styles = _reactNative.StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 0,
            marginTop: 0
        },
        webView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: _Global2.default.screenWidth()
        }
    });
}, 10481, [10297, 10033, 10013, 10010, 10379], "projects/com.yunmai.scales.ios/Main/Helper.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var _Global = _require(_dependencyMap[2]);

    var _Global2 = babelHelpers.interopRequireDefault(_Global);

    var _YMUser = _require(_dependencyMap[3]);

    var _YMUser2 = babelHelpers.interopRequireDefault(_YMUser);

    var _MultiUserEdit = _require(_dependencyMap[4]);

    var _MultiUserEdit2 = babelHelpers.interopRequireDefault(_MultiUserEdit);

    var _Localized = _require(_dependencyMap[5]);

    var usedWidth = _Global2.default.screenWidth() * 0.72;

    var UserList = function (_Component) {
        babelHelpers.inherits(UserList, _Component);

        function UserList(props) {
            babelHelpers.classCallCheck(this, UserList);

            var _this = babelHelpers.possibleConstructorReturn(this, (UserList.__proto__ || Object.getPrototypeOf(UserList)).call(this, props));

            _this.openList = function () {
                _this.setState({
                    listIsExpand: true,
                    userList: _YMUser2.default.getList()
                });

                _reactNative.StatusBar.setBarStyle('dark-content');
            };

            _this.closeList = function () {
                _this.setState({
                    listIsExpand: false,
                    userList: _YMUser2.default.getList()
                });

                _reactNative.StatusBar.setBarStyle('light-content');
            };

            _this.selectedUser = function (index) {
                _YMUser2.default.setCurrentUserInfo(index);

                if (_this.props.selectedCallback) {
                    _this.props.selectedCallback();
                }

                _this.closeList();
            };

            _this.addUser = function () {
                _this.closeList();

                if (_this.props.addUserCallback) {
                    _this.props.addUserCallback();
                }
            };

            _this.state = {
                listIsExpand: false,
                userList: _YMUser2.default.getList()
            };
            return _this;
        }

        babelHelpers.createClass(UserList, [{
            key: "render",
            value: function render() {
                var _this2 = this;

                this.height = 75 + 51.5 * this.state.userList.length + 0.5 + 52;
                this.list = this.state.userList.map(function (item, index) {
                    return _react2.default.createElement(
                        _reactNative.TouchableHighlight,
                        {
                            key: index + 'touchableHighlight',
                            underlayColor: "transparent",
                            onPress: function onPress(e) {
                                _this2.selectedUser(index);
                            }
                        },
                        _react2.default.createElement(
                            _reactNative.View,
                            null,
                            _react2.default.createElement(_reactNative.View, {
                                style: [styles.separator, {
                                    height: index == 0 ? 0 : 0.5
                                }]
                            }),
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: styles.rowContainer
                                },
                                _react2.default.createElement(
                                    _reactNative.Text,
                                    {
                                        style: [styles.title, {
                                            color: item == _YMUser2.default.getCurrentUserInfo() ? 'rgb(26, 182, 181)' : 'rgba(0, 0, 0, 0.8)'
                                        }]
                                    },
                                    item.userName
                                ),
                                _react2.default.createElement(_reactNative.Image, {
                                    style: [styles.markedIcon, {
                                        opacity: item == _YMUser2.default.getCurrentUserInfo() ? 1 : 0
                                    }],
                                    source: _Global2.default.lst_marked
                                })
                            )
                        )
                    );
                });

                if (this.height >= _Global2.default.screenHeight()) {
                    var dataSource = new _reactNative.ListView.DataSource({
                        rowHasChanged: function rowHasChanged(r1, r2) {
                            return r1 !== r2;
                        }
                    }).cloneWithRows(this.list);
                    this.list = _react2.default.createElement(_reactNative.ListView, {
                        dataSource: dataSource,
                        renderRow: function renderRow(rowData) {
                            return rowData;
                        }
                    });
                }

                return _react2.default.createElement(
                    _reactNative.Modal,
                    babelHelpers.extends({}, this.props, {
                        onRequestClose: function onRequestClose() {
                            _this2.closeList();
                        },
                        transparent: true,
                        visible: this.state.listIsExpand
                    }),
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: {
                                flexDirection: 'row'
                            }
                        },
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: styles.container
                            },
                            _react2.default.createElement(_reactNative.View, {
                                style: styles.topView
                            }),
                            _react2.default.createElement(_reactNative.View, {
                                style: [styles.separator, {
                                    width: usedWidth - 30
                                }]
                            }),
                            this.list,
                            _react2.default.createElement(_reactNative.View, {
                                style: [styles.separator, {
                                    width: usedWidth - 30
                                }]
                            }),
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: styles.bottomView
                                },
                                _react2.default.createElement(
                                    _reactNative.TouchableHighlight,
                                    {
                                        onPress: this.addUser,
                                        underlayColor: "transparent"
                                    },
                                    _react2.default.createElement(_reactNative.Image, {
                                        style: styles.addBtn,
                                        source: _Global2.default.lst_addBtn
                                    })
                                ),
                                _react2.default.createElement(
                                    _reactNative.Text,
                                    {
                                        style: styles.addTitle
                                    },
                                    _Localized.Localized.Global_Interaction_Add
                                )
                            )
                        ),
                        _react2.default.createElement(
                            _reactNative.TouchableHighlight,
                            {
                                underlayColor: "transparent",
                                onPress: this.closeList
                            },
                            _react2.default.createElement(_reactNative.View, {
                                style: styles.backgroundContainer
                            })
                        )
                    )
                );
            }
        }]);
        return UserList;
    }(_react.Component);

    exports.default = UserList;

    var styles = _reactNative.StyleSheet.create({
        backgroundContainer: {
            width: _Global2.default.screenWidth(),
            height: _Global2.default.screenHeight(),
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
        },
        container: {
            backgroundColor: 'white',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: usedWidth,
            height: _Global2.default.screenHeight()
        },
        rowContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 51,
            width: usedWidth
        },
        topView: {
            width: usedWidth,
            height: 75
        },
        bottomView: {
            flexDirection: 'row',
            alignItems: 'center',
            width: usedWidth,
            height: 52
        },
        addBtn: {
            width: 30,
            height: 30,
            marginLeft: 15
        },
        addTitle: {
            fontSize: 16,
            color: 'rgba(0, 0, 0, 0.8)',
            marginLeft: 7
        },
        markedIcon: {
            width: 13,
            height: 9,
            marginRight: 15
        },
        title: {
            fontSize: 16,
            marginLeft: 15
        },
        separator: {
            height: 0.5,
            backgroundColor: 'rgb(218, 218, 218)',
            marginLeft: 15,
            marginRight: 15
        }
    });
}, 10484, [10297, 10033, 10010, 10019, 10466, 10013], "projects/com.yunmai.scales.ios/Main/Home/UserList.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var _miot = _require(_dependencyMap[2]);

    var _ReactNativeART = _require(_dependencyMap[3]);

    var _Circle = _require(_dependencyMap[4]);

    var _Circle2 = babelHelpers.interopRequireDefault(_Circle);

    var _ui = _require(_dependencyMap[5]);

    var _NewNavBar = _require(_dependencyMap[6]);

    var _NewNavBar2 = babelHelpers.interopRequireDefault(_NewNavBar);

    var _SegmentedControl = _require(_dependencyMap[7]);

    var _SegmentedControl2 = babelHelpers.interopRequireDefault(_SegmentedControl);

    var _SegmentedControls = _require(_dependencyMap[8]);

    var _SegmentedControls2 = babelHelpers.interopRequireDefault(_SegmentedControls);

    var _Global = _require(_dependencyMap[9]);

    var _Global2 = babelHelpers.interopRequireDefault(_Global);

    var _Localized = _require(_dependencyMap[10]);

    var _BriefingCalendar = _require(_dependencyMap[11]);

    var _BriefingCalendar2 = babelHelpers.interopRequireDefault(_BriefingCalendar);

    var _BriefingList = _require(_dependencyMap[12]);

    var _BriefingList2 = babelHelpers.interopRequireDefault(_BriefingList);

    var _YMUser = _require(_dependencyMap[13]);

    var _YMUser2 = babelHelpers.interopRequireDefault(_YMUser);

    var _SQLite = _require(_dependencyMap[14]);

    var _SQLite2 = babelHelpers.interopRequireDefault(_SQLite);

    var dataControl = [{
        type: 'weight',
        text: _Localized.Localized.Global_UserInfo_Weight
    }, {
        type: 'fat',
        text: _Localized.Localized.Global_UserInfo_fat
    }, {
        type: 'muscle',
        text: _Localized.Localized.Global_UserInfo_muscle
    }];
    var dateFormatter = {
        yearMonth: {
            year: 'numeric',
            month: 'short'
        },
        monthDate: {
            day: 'numeric',
            month: 'short'
        },
        month: {
            month: 'short'
        },
        date: {
            day: 'numeric'
        }
    };
    var cycleControl = [{
        type: '周',
        text: _Localized.Localized.Global_Unit_Week_Abbr,
        longText: _Localized.Localized.Global_Unit_Week,
        dataCount: 7,
        options: dateFormatter.monthDate
    }, {
        type: '月',
        text: _Localized.Localized.Global_Unit_Month_Abbr,
        longText: _Localized.Localized.Global_Unit_Month,
        dataCount: 30,
        options: dateFormatter.monthDate
    }, {
        type: '年',
        text: _Localized.Localized.Global_Unit_Year_Abbr,
        longText: _Localized.Localized.Global_Unit_Year,
        dataCount: 365,
        options: dateFormatter.yearMonth
    }];

    var BriefingCurve = function (_Component) {
        babelHelpers.inherits(BriefingCurve, _Component);

        function BriefingCurve(props) {
            babelHelpers.classCallCheck(this, BriefingCurve);

            var _this = babelHelpers.possibleConstructorReturn(this, (BriefingCurve.__proto__ || Object.getPrototypeOf(BriefingCurve)).call(this, props));

            _this._onClickOpenCalendar = function () {
                _this.calendar.openCalendar();
            };

            _this.getSourceDatas = function (endDate, callback) {
                var endTimestamp = endDate.setHours(0, 0, 0, 0) * 0.001 + 86400;
                var startTimestamp = endTimestamp - 31536000;

                _this.sqlite.getSectionWeightInfoForCurve(_YMUser2.default.getCurrentUserInfo().shortId, startTimestamp, endTimestamp, function (resultList) {
                    var weightList = [];
                    var fatList = [];
                    var muscleList = [];
                    resultList.map(function (data) {
                        weightList.push({
                            value: data.weight,
                            createTime: data.createTime
                        });
                        fatList.push({
                            value: data.fat,
                            createTime: data.createTime
                        });
                        muscleList.push({
                            value: data.muscle,
                            createTime: data.createTime
                        });
                    });
                    var sections = [];

                    for (var index = 0; index < 365; index++) {
                        var sectionStartTimestamp = startTimestamp + 86400 * index;
                        var sectionEndTimestamp = sectionStartTimestamp + 86400;
                        sections.push({
                            startTimestamp: sectionStartTimestamp,
                            endTimestamp: sectionEndTimestamp,
                            positionNum: 364 - index,
                            weightValue: 0,
                            fatValue: 0,
                            muscleValue: 0
                        });
                    }

                    var weightMergedList = [];
                    var fatMergedList = [];
                    var muscleMergedList = [];
                    sections.map(function (section, index) {
                        var weightSection = weightList.filter(function (weightData) {
                            return weightData.createTime >= section.startTimestamp && weightData.createTime < section.endTimestamp && weightData.value !== 0;
                        });
                        var fatSection = fatList.filter(function (fatData) {
                            return fatData.createTime >= section.startTimestamp && fatData.createTime < section.endTimestamp && fatData.value !== 0;
                        });
                        var muscleSection = muscleList.filter(function (muscleData) {
                            return muscleData.createTime >= section.startTimestamp && muscleData.createTime < section.endTimestamp && muscleData.value !== 0;
                        });

                        if (weightSection.length !== 0) {
                            section.weightValue = weightSection[weightSection.length - 1].value;
                        }

                        if (fatSection.length !== 0) {
                            section.fatValue = fatSection[fatSection.length - 1].value;
                        }

                        if (muscleSection.length !== 0) {
                            section.muscleValue = muscleSection[muscleSection.length - 1].value;
                        }

                        weightMergedList.push({
                            positionNum: section.positionNum,
                            value: section.weightValue
                        });
                        fatMergedList.push({
                            positionNum: section.positionNum,
                            value: section.fatValue
                        });
                        muscleMergedList.push({
                            positionNum: section.positionNum,
                            value: section.muscleValue
                        });
                    });

                    if (callback) {
                        callback({
                            weight: weightMergedList,
                            fat: fatMergedList,
                            muscle: muscleMergedList
                        });
                    }
                });
            };

            _this.getDataLables = function (endDate, type) {
                var endTimestamp = endDate.setHours(0, 0, 0, 0);
                var localId = _Localized.Localized.Global_DateFomattedIdentifier;
                var endingYear = endDate.getFullYear();
                var endingMonth = endDate.getMonth();
                var isCrossedDate = false;

                switch (type) {
                    case '周':
                        {
                            var dateForLable1 = new Date(endTimestamp);
                            var dateForLable2 = new Date(endTimestamp - 86400000);
                            var dateForLable3 = new Date(endTimestamp - 172800000);
                            var dateForLable4 = new Date(endTimestamp - 259200000);
                            var dateForLable5 = new Date(endTimestamp - 345600000);
                            var dateForLable6 = new Date(endTimestamp - 432000000);
                            var dateForLable7 = new Date(endTimestamp - 518400000);
                            return [dateForLable1, dateForLable2, dateForLable3, dateForLable4, dateForLable5, dateForLable6, dateForLable7].map(function (date, index) {
                                if (index == 0) {
                                    return _Global.Function.getDateString(1, date);
                                } else {
                                    if (date.getMonth() != endingMonth && !isCrossedDate) {
                                        isCrossedDate = true;
                                        return _Global.Function.getDateString(1, date);
                                    } else {
                                        return _Global.Function.getDateString(3, date);
                                    }
                                }
                            }).reverse();
                        }

                    case '月':
                        {
                            var _dateForLable = new Date(endTimestamp);

                            var _dateForLable2 = new Date(endTimestamp - 604800000);

                            var _dateForLable3 = new Date(endTimestamp - 1209600000);

                            var _dateForLable4 = new Date(endTimestamp - 1814400000);

                            var _dateForLable5 = new Date(endTimestamp - 2505600000);

                            return [_dateForLable, _dateForLable2, _dateForLable3, _dateForLable4, _dateForLable5].map(function (date, index) {
                                if (index == 0) {
                                    return _Global.Function.getDateString(1, date);
                                } else {
                                    if (date.getMonth() != endingMonth && !isCrossedDate) {
                                        isCrossedDate = true;
                                        return _Global.Function.getDateString(1, date);
                                    } else {
                                        return _Global.Function.getDateString(3, date);
                                    }
                                }
                            }).reverse();
                        }

                    case '年':
                        {
                            var _dateForLable6 = new Date(endTimestamp);

                            var _dateForLable7 = new Date(endTimestamp - 7862400000);

                            var _dateForLable8 = new Date(endTimestamp - 15724800000);

                            var _dateForLable9 = new Date(endTimestamp - 23587200000);

                            var _dateForLable10 = new Date(endTimestamp - 31449600000);

                            return [_dateForLable6, _dateForLable7, _dateForLable8, _dateForLable9, _dateForLable10].map(function (date, index) {
                                if (index == 0) {
                                    return _Global.Function.getDateString(2, date);
                                } else {
                                    if (date.getFullYear() != endingYear && !isCrossedDate) {
                                        isCrossedDate = true;
                                        return _Global.Function.getDateString(1, date);
                                    } else {
                                        return _Global.Function.getDateString(4, date);
                                    }
                                }
                            }).reverse();
                        }
                }
            };

            _this.sqlite = new _SQLite2.default();
            _this.state = {
                selectedDate: new Date(),
                cycleTypeControl: 0,
                dataType: dataControl[0].type,
                mergeList: {
                    weight: [],
                    fat: [],
                    muscle: []
                }
            };
            _this.onDeleteWeightEvent = _reactNative.DeviceEventEmitter.addListener('onDeleteWeightEvent', function (e) {
                _this.getSourceDatas(_this.state.selectedDate, function (mergeList) {
                    _this.setState({
                        mergeList: mergeList
                    });
                });
            });
            return _this;
        }

        babelHelpers.createClass(BriefingCurve, [{
            key: "componentDidMount",
            value: function componentDidMount() {
                var _this2 = this;

                this.getSourceDatas(this.state.selectedDate, function (mergeList) {
                    _this2.setState({
                        mergeList: mergeList
                    });
                });
                this.props.navigation.setParams({
                    onClickOpenCalendar: this._onClickOpenCalendar
                });
            }
        }, {
            key: "componentWillUnmount",
            value: function componentWillUnmount() {
                if (this.onDeleteWeightEvent) {
                    this.onDeleteWeightEvent.remove();
                }
            }
        }, {
            key: "render",
            value: function render() {
                var _this3 = this;

                var dataCount = cycleControl[this.state.cycleTypeControl].dataCount;
                var endDate = new Date(this.state.selectedDate);
                var startDate = new Date(this.state.selectedDate);
                startDate.setDate(endDate.getDate() - dataCount + 1);
                var dateLables = this.getDataLables(endDate, cycleControl[this.state.cycleTypeControl].type);
                var data = this.state.mergeList;
                var weightData = Array.apply(undefined, babelHelpers.toConsumableArray(data.weight.slice(-dataCount)));
                var fatData = Array.apply(undefined, babelHelpers.toConsumableArray(data.fat.slice(-dataCount)));
                var muscleData = Array.apply(undefined, babelHelpers.toConsumableArray(data.muscle.slice(-dataCount)));
                var maxWeight = 0;
                var maxFat = 0;
                var maxMuscle = 0;
                var minWeight = 999;
                var minFat = 999;
                var minMuscle = 999;
                var firstWeight = 0;
                var firstFat = 0;
                var firstMuscle = 0;
                var lastWeight = 0;
                var lastFat = 0;
                var lastMuscle = 0;
                var sumWeight = 0;
                var sumFat = 0;
                var sumMuscle = 0;
                var countWeight = 0;
                var countFat = 0;
                var countMuscle = 0;
                weightData.map(function (item) {
                    var weight = item.value;

                    if (weight != 0) {
                        if (weight > maxWeight) {
                            maxWeight = weight;
                        }

                        if (weight < minWeight) {
                            minWeight = weight;
                        }

                        if (firstWeight == 0) {
                            firstWeight = weight;
                        }

                        if (weight != 0) {
                            lastWeight = weight;
                        }

                        sumWeight += weight;
                        countWeight += 1;
                    }
                });
                fatData.map(function (item) {
                    var fat = item.value;

                    if (fat != 0) {
                        if (fat > maxFat) {
                            maxFat = fat;
                        }

                        if (fat < minFat) {
                            minFat = fat;
                        }

                        if (firstFat == 0) {
                            firstFat = fat;
                        }

                        if (fat != 0) {
                            lastFat = fat;
                        }

                        sumFat += fat;
                        countFat += 1;
                    }
                });
                muscleData.map(function (item) {
                    var muscle = item.value;

                    if (muscle != 0) {
                        if (muscle > maxMuscle) {
                            maxMuscle = muscle;
                        }

                        if (muscle < minMuscle) {
                            minMuscle = muscle;
                        }

                        if (firstMuscle == 0) {
                            firstMuscle = muscle;
                        }

                        if (muscle != 0) {
                            lastMuscle = muscle;
                        }

                        sumMuscle += muscle;
                        countMuscle += 1;
                    }
                });
                var aveWeight = countWeight !== 0 ? sumWeight / countWeight : 0;
                var aveFat = countFat !== 0 ? sumFat / countFat : 0;
                var aveMuscle = countMuscle !== 0 ? sumMuscle / countMuscle : 0;
                var diffWeight = lastWeight - firstWeight;
                var diffFat = lastFat - firstFat;
                var diffMuscle = lastMuscle - firstMuscle;

                var _onSegmentedControlChange = function _onSegmentedControlChange(e) {
                    _this3.setState({
                        dataType: dataControl[e.nativeEvent.selectedSegmentIndex].type
                    });
                };

                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: mainStyles.container
                    },
                    _react2.default.createElement(_BriefingCalendar2.default, {
                        ref: function ref(_ref) {
                            _this3.calendar = _ref;
                        },
                        selectedCallback: function selectedCallback(date) {
                            _this3.getSourceDatas(date, function (mergeList) {
                                _this3.setState({
                                    selectedDate: date,
                                    mergeList: mergeList
                                });

                                _this3.props.navigation.setParams({
                                    selectedDate: date
                                });
                            });
                        }
                    }),
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: mainStyles.topView
                        },
                        _react2.default.createElement(_SegmentedControl2.default, {
                            style: mainStyles.segmentedControl,
                            selectedIndex: 0,
                            values: dataControl.map(function (item) {
                                return item.text;
                            }),
                            onChange: _onSegmentedControlChange
                        })
                    ),
                    _react2.default.createElement(Curve, {
                        cycleType: cycleControl[this.state.cycleTypeControl].type,
                        dataType: this.state.dataType,
                        dataSource: this.state.mergeList[this.state.dataType],
                        dataCount: dataCount,
                        dateLables: dateLables,
                        valueHandle: function valueHandle(value) {
                            if (_this3.state.dataType == 'weight') {
                                return _Global.Function.converKgToOtherString(value, _YMUser2.default.getCurrentUserInfo().unit);
                            } else {
                                return value.toFixed(1);
                            }
                        }
                    }),
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: mainStyles.bottomView
                        },
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: {
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    marginTop: _Global2.default.screenWidth() == 320 ? 22 : _Global2.default.screenWidth() == 414 ? 48 : 38
                                }
                            },
                            [{
                                title: cycleControl[this.state.cycleTypeControl].longText + _Localized.Localized.Global_Text_Space + _Localized.Localized.BriefingList_Text_Average + _Localized.Localized.Global_Text_Space + _Localized.Localized.Global_UserInfo_Weight,
                                value: _Global.Function.converKgToOtherString(aveWeight, _YMUser2.default.getCurrentUserInfo().unit),
                                unit: _Global.Function.convertUnit(_YMUser2.default.getCurrentUserInfo().unit)
                            }, {
                                title: cycleControl[this.state.cycleTypeControl].longText + _Localized.Localized.Global_Text_Space + _Localized.Localized.BriefingList_Text_Average + _Localized.Localized.Global_Text_Space + _Localized.Localized.Global_UserInfo_fat,
                                value: aveFat.toFixed(1),
                                unit: '%'
                            }, {
                                title: cycleControl[this.state.cycleTypeControl].longText + _Localized.Localized.Global_Text_Space + _Localized.Localized.BriefingList_Text_Average + _Localized.Localized.Global_Text_Space + _Localized.Localized.Global_UserInfo_muscle,
                                value: aveMuscle.toFixed(1),
                                unit: '%'
                            }].map(function (item, index) {
                                return _react2.default.createElement(BottomValueView, {
                                    key: "bottomValueView-01" + index,
                                    data: item
                                });
                            })
                        ),
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: {
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    marginTop: _Global2.default.screenWidth() == 320 ? 22 : _Global2.default.screenWidth() == 414 ? 43 : 33
                                }
                            },
                            [{
                                title: _Localized.Localized.Global_UserInfo_Weight + _Localized.Localized.Global_Text_Space + _Localized.Localized.BriefingList_Text_Change,
                                value: _Global.Function.converKgToOtherString(diffWeight, _YMUser2.default.getCurrentUserInfo().unit),
                                unit: _Global.Function.convertUnit(_YMUser2.default.getCurrentUserInfo().unit)
                            }, {
                                title: _Localized.Localized.Global_UserInfo_fat + _Localized.Localized.Global_Text_Space + _Localized.Localized.BriefingList_Text_Change,
                                value: diffFat.toFixed(1),
                                unit: '%'
                            }, {
                                title: _Localized.Localized.Global_UserInfo_muscle + _Localized.Localized.Global_Text_Space + _Localized.Localized.BriefingList_Text_Change,
                                value: diffMuscle.toFixed(1),
                                unit: '%'
                            }].map(function (item, index) {
                                return _react2.default.createElement(BottomValueView, {
                                    key: "bottomValueView-02" + index,
                                    data: item
                                });
                            })
                        ),
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: mainStyles.bottomButtonArea
                            },
                            cycleControl.map(function (item, index) {
                                return _react2.default.createElement(CycleTypeButton, {
                                    key: '' + index,
                                    title: item.text,
                                    selected: _this3.state.cycleTypeControl == index,
                                    onPress: function onPress(e) {
                                        _this3.setState({
                                            cycleTypeControl: index
                                        });

                                        _this3.props.navigation.setParams({
                                            cycleTypeControl: index
                                        });
                                    }
                                });
                            })
                        )
                    )
                );
            }
        }]);
        return BriefingCurve;
    }(_react.Component);

    BriefingCurve.navigationOptions = function (_ref2) {
        var navigation = _ref2.navigation;
        var dataCount = cycleControl[navigation.getParam('cycleTypeControl', 0)].dataCount;
        var endDate = new Date(navigation.getParam('selectedDate', new Date()));
        var startDate = new Date(navigation.getParam('selectedDate', new Date()));
        startDate.setDate(endDate.getDate() - dataCount + 1);
        return {
            gesturesEnabled: false,
            header: _react2.default.createElement(_NewNavBar2.default, {
                style: navStyles.bar,
                type: "dark",
                onPressLeft: function onPressLeft(_) {
                    navigation.goBack();
                },
                titleComponent: _react2.default.createElement(
                    _reactNative.TouchableHighlight,
                    {
                        underlayColor: "transparent",
                        onPress: function onPress(e) {
                            navigation.state.params.onClickOpenCalendar();
                        }
                    },
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: navStyles.titleComponent
                        },
                        _react2.default.createElement(
                            _reactNative.Text,
                            {
                                style: navStyles.titleText
                            },
                            _Global.Function.getDateString(navigation.getParam('cycleTypeControl', 0), startDate) + ' - ' + _Global.Function.getDateString(navigation.getParam('cycleTypeControl', 0), endDate)
                        ),
                        _react2.default.createElement(_reactNative.Image, {
                            style: navStyles.titleIcon,
                            source: _Global2.default.brf_arrowDown
                        })
                    )
                ),
                onPressRight2: function onPressRight2() {
                    navigation.navigate('BriefingList', {});
                }
            })
        };
    };

    exports.default = BriefingCurve;

    var Curve = function (_Component2) {
        babelHelpers.inherits(Curve, _Component2);

        function Curve() {
            babelHelpers.classCallCheck(this, Curve);
            return babelHelpers.possibleConstructorReturn(this, (Curve.__proto__ || Object.getPrototypeOf(Curve)).apply(this, arguments));
        }

        babelHelpers.createClass(Curve, [{
            key: "render",
            value: function render() {
                var _this5 = this;

                var xStep = 0;
                var dataSource = [];
                var coordinates = [];
                var lableWidth = 0;
                var curveStr = '';
                var points = [];
                var valueLables = [];
                var upperBound = 0;
                var lowerBound = 999;
                var ySpan = 0;
                var scaleCoefficient = 1;
                var height = _Global2.default.screenHeight() * 0.4;
                var topGap = _Global2.default.screenWidth() == 320 ? 45 : 77;
                var bottomGap = _Global2.default.screenWidth() == 320 ? 35 : 46;

                switch (this.props.cycleType) {
                    case '周':
                        xStep = (_Global2.default.screenWidth() - 75) / (this.props.dataCount - 1);
                        lableWidth = Math.min(70, xStep);
                        break;

                    case '月':
                        xStep = (_Global2.default.screenWidth() - 75) / (this.props.dataCount - 1);
                        lableWidth = Math.min(70, xStep * 6);
                        break;

                    case '年':
                        xStep = (_Global2.default.screenWidth() - 75) / (this.props.dataCount - 1);
                        lableWidth = Math.min(70, xStep * 80);
                        break;
                }

                var noDataText = _Localized.Localized.BriefingList_Text_NoData;

                switch (this.props.dataType) {
                    case 'weight':
                        noDataText = _Localized.Localized.BriefingList_Text_NoData;
                        break;

                    case 'fat':
                        noDataText = _Localized.Localized.BriefingList_Text_NoFatData;
                        break;

                    case 'muscle':
                        noDataText = _Localized.Localized.BriefingList_Text_NoMuscleData;
                        break;
                }

                dataSource = this.props.dataSource.slice(-this.props.dataCount);

                if (!dataSource.some(function (item) {
                    return item.value != 0;
                })) {
                    return _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: curveAreaStyle.container
                        },
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: [curveAreaStyle.main, {
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }]
                            },
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: {
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }
                                },
                                _react2.default.createElement(_reactNative.Image, {
                                    style: {
                                        width: 22,
                                        height: 22,
                                        marginRight: 6
                                    },
                                    source: _Global2.default.brf_noData
                                }),
                                _react2.default.createElement(
                                    _reactNative.Text,
                                    {
                                        style: {
                                            fontSize: 15,
                                            color: 'rgba(255, 255, 255, 0.9)'
                                        }
                                    },
                                    noDataText
                                )
                            )
                        ),
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: curveAreaStyle.bar
                            },
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: [curveAreaStyle.dateLablesArea, {
                                        marginLeft: 35 - lableWidth * 0.5,
                                        marginRight: 60 - lableWidth * 0.5
                                    }]
                                },
                                this.props.dateLables.map(function (item, index) {
                                    return _react2.default.createElement(
                                        _reactNative.Text,
                                        {
                                            key: 'lable' + index,
                                            style: [curveAreaStyle.dateLable, {
                                                width: lableWidth,
                                                color: index == _this5.props.dateLables.length - 1 ? 'rgb(26, 182, 181)' : 'rgba(0, 0, 0, 0.4)'
                                            }]
                                        },
                                        item
                                    );
                                })
                            )
                        ),
                        _react2.default.createElement(_reactNative.View, {
                            style: curveAreaStyle.separator
                        })
                    );
                }

                dataSource.map(function (item, index) {
                    if (item.value !== 0) {
                        switch (_this5.props.dataType) {
                            case 'weight':
                                if (item.value - 2.5 < lowerBound) {
                                    lowerBound = item.value - 2.5;
                                }

                                if (item.value + 2.5 > upperBound) {
                                    upperBound = item.value + 2.5;
                                }

                                break;

                            case 'fat':
                            case 'muscle':
                                if (item.value - 2 < lowerBound) {
                                    lowerBound = Math.max(item.value - 2, 0);
                                }

                                if (item.value + 2 > upperBound) {
                                    upperBound = Math.min(item.value + 2, 100);
                                }

                        }
                    }
                });
                ySpan = upperBound - lowerBound;
                scaleCoefficient = (height - bottomGap - topGap) / ySpan;
                dataSource.map(function (item, index) {
                    if (item.value !== 0) {
                        var x = index * xStep + 35;
                        var y = height - bottomGap - (item.value - lowerBound) * scaleCoefficient;
                        coordinates.push(babelHelpers.extends({}, item, {
                            x: x,
                            y: y
                        }));
                    }
                });
                coordinates.map(function (item, index) {
                    var x = item.x;
                    var y = item.y;

                    if (curveStr === '') {
                        curveStr += 'M' + x + ' ' + y;
                    } else {
                        curveStr += ' C' + (x - 0.5 * (coordinates[index - 1].positionNum - item.positionNum) * xStep) + ' ' + coordinates[index - 1].y + ' ' + (x - 0.5 * (coordinates[index - 1].positionNum - item.positionNum) * xStep) + ' ' + y + ' ' + x + ' ' + y;
                    }

                    points.push(_react2.default.createElement(_Circle2.default, {
                        key: 'circle' + index,
                        x: x,
                        y: y,
                        radius: item.positionNum == 0 ? 4.5 : 3,
                        stroke: 'rgb(26, 182, 181)',
                        strokeWidth: 2,
                        fill: 'white'
                    }));
                    console.log('item.positionNum ' + item.positionNum);

                    if (_this5.props.cycleType == '周' && item.positionNum > 0) {
                        valueLables.push(_react2.default.createElement(
                            _reactNative.Text,
                            {
                                key: 'valueLable' + index,
                                style: {
                                    position: 'absolute',
                                    left: x - 20.5,
                                    bottom: height - (y - 8),
                                    width: 41,
                                    fontSize: 13,
                                    textAlign: 'center',
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    backgroundColor: 'transparent'
                                }
                            },
                            _this5.props.valueHandle(item.value)
                        ));
                    } else if (item.positionNum == 0) {
                        console.log('item.positionNum ');
                        valueLables.push(_react2.default.createElement(
                            _reactNative.View,
                            {
                                style: {
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'absolute',
                                    left: x - 20.5,
                                    bottom: height - (y - 6),
                                    width: 41,
                                    height: 26
                                }
                            },
                            _react2.default.createElement(_reactNative.Image, {
                                key: 'bubbleValueLable',
                                style: {
                                    position: 'absolute',
                                    width: 41,
                                    height: 26
                                },
                                source: _Global2.default.brf_bubble
                            }),
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    key: 'valueLable' + index,
                                    style: {
                                        width: 41,
                                        fontSize: 13,
                                        textAlign: 'center',
                                        position: 'absolute',
                                        color: 'rgb(26, 182, 181)',
                                        backgroundColor: 'transparent',
                                        marginBottom: 1
                                    }
                                },
                                _this5.props.valueHandle(item.value)
                            )
                        ));
                    }
                });
                var curve = new _ReactNativeART.Path(curveStr);
                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: curveAreaStyle.container
                    },
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: curveAreaStyle.main
                        },
                        _react2.default.createElement(
                            _ReactNativeART.Surface,
                            {
                                width: _Global2.default.screenWidth(),
                                height: height
                            },
                            _react2.default.createElement(
                                _ReactNativeART.Group,
                                null,
                                _react2.default.createElement(_ReactNativeART.Shape, {
                                    d: new _ReactNativeART.Path('M15 ' + topGap + ' L' + (_Global2.default.screenWidth() - 15) + ' ' + topGap),
                                    stroke: 'rgba(255, 255, 255, 0.4)',
                                    strokeWidth: 0.5
                                }),
                                _react2.default.createElement(_ReactNativeART.Shape, {
                                    d: new _ReactNativeART.Path('M15 ' + (height - bottomGap) + ' L' + (_Global2.default.screenWidth() - 15) + ' ' + (height - bottomGap)),
                                    stroke: 'rgba(255, 255, 255, 0.4)',
                                    strokeWidth: 0.5
                                }),
                                _react2.default.createElement(_ReactNativeART.Shape, {
                                    d: curve,
                                    stroke: "white",
                                    strokeWidth: 1
                                }),
                                this.props.cycleType == '年' ? points.length <= 1 ? points : [] : points
                            )
                        ),
                        _react2.default.createElement(
                            _reactNative.Text,
                            {
                                style: [curveAreaStyle.bound, {
                                    top: topGap + 6,
                                    width: 35
                                }]
                            },
                            this.props.valueHandle(upperBound)
                        ),
                        _react2.default.createElement(
                            _reactNative.Text,
                            {
                                style: [curveAreaStyle.bound, {
                                    top: height - bottomGap + 6,
                                    width: 35
                                }]
                            },
                            this.props.valueHandle(lowerBound)
                        ),
                        valueLables
                    ),
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: curveAreaStyle.bar
                        },
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: [curveAreaStyle.dateLablesArea, {
                                    marginLeft: 35 - lableWidth * 0.5,
                                    marginRight: 60 - lableWidth * 0.5
                                }]
                            },
                            this.props.dateLables.map(function (item, index) {
                                return _react2.default.createElement(
                                    _reactNative.Text,
                                    {
                                        key: 'lable' + index,
                                        style: [curveAreaStyle.dateLable, {
                                            width: lableWidth,
                                            color: index == _this5.props.dateLables.length - 1 ? 'rgb(26, 182, 181)' : 'rgba(0, 0, 0, 0.4)'
                                        }]
                                    },
                                    item
                                );
                            })
                        )
                    ),
                    _react2.default.createElement(_reactNative.View, {
                        style: curveAreaStyle.separator
                    })
                );
            }
        }]);
        return Curve;
    }(_react.Component);

    var BottomValueView = function (_Component3) {
        babelHelpers.inherits(BottomValueView, _Component3);

        function BottomValueView() {
            babelHelpers.classCallCheck(this, BottomValueView);
            return babelHelpers.possibleConstructorReturn(this, (BottomValueView.__proto__ || Object.getPrototypeOf(BottomValueView)).apply(this, arguments));
        }

        babelHelpers.createClass(BottomValueView, [{
            key: "render",
            value: function render() {
                var _props$data = this.props.data,
                    title = _props$data.title,
                    value = _props$data.value,
                    unit = _props$data.unit;
                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: {
                            width: _Global2.default.screenWidth() * 0.33,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }
                    },
                    _react2.default.createElement(
                        _reactNative.Text,
                        {
                            style: {
                                fontSize: _Global2.default.screenWidth() == 320 ? 11 : 13,
                                color: 'rgba(0, 0, 0, 0.4)',
                                textAlign: 'center'
                            }
                        },
                        title
                    ),
                    _react2.default.createElement(
                        _reactNative.Text,
                        {
                            style: {
                                fontSize: 25,
                                color: 'rgba(0, 0, 0, 0.8)',
                                fontFamily: 'System'
                            }
                        },
                        value == 0 ? '- -' : value,
                        _react2.default.createElement(
                            _reactNative.Text,
                            {
                                style: {
                                    fontSize: 11,
                                    color: 'rgba(0, 0, 0, 0.4)',
                                    fontFamily: 'System'
                                }
                            },
                            value == 0 ? '' : unit
                        )
                    )
                );
            }
        }]);
        return BottomValueView;
    }(_react.Component);

    var CycleTypeButton = function (_Component4) {
        babelHelpers.inherits(CycleTypeButton, _Component4);

        function CycleTypeButton() {
            babelHelpers.classCallCheck(this, CycleTypeButton);
            return babelHelpers.possibleConstructorReturn(this, (CycleTypeButton.__proto__ || Object.getPrototypeOf(CycleTypeButton)).apply(this, arguments));
        }

        babelHelpers.createClass(CycleTypeButton, [{
            key: "render",
            value: function render() {
                return _react2.default.createElement(
                    _reactNative.View,
                    null,
                    _react2.default.createElement(
                        _reactNative.TouchableHighlight,
                        {
                            underlayColor: "transparent",
                            onPress: this.props.onPress
                        },
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: [cycleTypeButtonStyle.container, this.props.selected ? cycleTypeButtonStyle.selectedButton : cycleTypeButtonStyle.deselectedButton]
                            },
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: [cycleTypeButtonStyle.unitText, this.props.selected ? cycleTypeButtonStyle.selectedText : cycleTypeButtonStyle.deselectedText]
                                },
                                this.props.title
                            )
                        )
                    )
                );
            }
        }]);
        return CycleTypeButton;
    }(_react.Component);

    var mainStyles = _reactNative.StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 0,
            marginTop: 0,
            backgroundColor: 'white'
        },
        topView: {
            justifyContent: 'center',
            alignItems: 'center',
            width: _Global2.default.screenWidth(),
            height: 48,
            backgroundColor: 'rgb(26, 182, 181)'
        },
        segmentedControl: {
            width: 285,
            height: 26
        },
        bottomView: {
            flex: 1,
            width: _Global2.default.screenWidth(),
            backgroundColor: 'white'
        },
        bottomButtonArea: {
            flex: 1,
            width: _Global2.default.screenWidth(),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-end'
        }
    });

    var navStyles = _reactNative.StyleSheet.create({
        bar: {
            backgroundColor: 'rgb(26, 182, 181)'
        },
        titleComponent: {
            flex: 3,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: _Global2.default.navBarHeight()
        },
        titleText: {
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: 17,
            fontFamily: 'System',
            textAlign: 'center'
        },
        titleIcon: {
            width: 11,
            height: 6,
            marginTop: 2,
            marginLeft: 4,
            tintColor: 'white'
        },
        rightComponent: {
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            width: 44,
            height: 44,
            top: _Global2.default.statusBarHeight(),
            right: 5
        },
        button: {
            width: 30,
            height: 30,
            tintColor: 'white'
        }
    });

    var curveAreaStyle = _reactNative.StyleSheet.create({
        container: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white'
        },
        main: {
            width: _Global2.default.screenWidth(),
            height: _Global2.default.screenHeight() * 0.4,
            backgroundColor: 'rgb(26, 182, 181)'
        },
        bound: {
            fontSize: 11,
            color: 'rgba(255, 255, 255, 0.4)',
            position: 'absolute',
            right: 15
        },
        bar: {
            flexDirection: 'row',
            alignItems: 'center',
            width: _Global2.default.screenWidth(),
            height: 32
        },
        dateLablesArea: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        dateLable: {
            fontSize: _Global2.default.screenWidth() == 320 ? 8 : _Global2.default.screenWidth() == 414 ? 9 : 11,
            textAlign: 'center'
        },
        separator: {
            width: _Global2.default.screenWidth(),
            height: 0.5,
            marginLeft: 15,
            marginRight: 15,
            backgroundColor: 'rgb(218, 218, 218)'
        }
    });

    var cycleTypeButtonStyle = _reactNative.StyleSheet.create({
        container: {
            width: 34,
            height: 34,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 17,
            borderWidth: 1,
            borderColor: 'rgb(186, 186, 186)',
            marginBottom: _Global2.default.screenWidth() == 320 ? 20 : 20,
            marginLeft: 15.5,
            marginRight: 15.5
        },
        unitText: {
            textAlign: 'center'
        },
        selectedButton: {
            backgroundColor: 'rgb(211, 211, 211)'
        },
        deselectedButton: {
            backgroundColor: 'white'
        },
        selectedText: {
            fontSize: 15,
            color: 'white'
        },
        deselectedText: {
            fontSize: 14,
            color: 'rgba(0, 0, 0, 0.8)'
        }
    });
}, 10487, [10297, 10033, 10074, 10462, 10490, 10230, 10379, 10496, 10499, 10010, 10013, 10505, 10508, 10019, 10469], "projects/com.yunmai.scales.ios/Main/Briefing/BriefingCurve.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var _constants = _require(_dependencyMap[2]);

    var C = babelHelpers.interopRequireWildcard(_constants);

    var _propTypes = _require(_dependencyMap[3]);

    var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

    var Path = _reactNative.ART.Path,
        Shape = _reactNative.ART.Shape;

    var Circle = function (_Component) {
        babelHelpers.inherits(Circle, _Component);

        function Circle() {
            babelHelpers.classCallCheck(this, Circle);
            return babelHelpers.possibleConstructorReturn(this, (Circle.__proto__ || Object.getPrototypeOf(Circle)).apply(this, arguments));
        }

        babelHelpers.createClass(Circle, [{
            key: "render",
            value: function render() {
                var _props = this.props,
                    x = _props.x,
                    y = _props.y,
                    radius = _props.radius;
                var path = new Path().moveTo(x, y - radius).arc(0, radius * 2, radius).arc(0, radius * -2, radius).close();
                return _react2.default.createElement(Shape, {
                    d: path,
                    stroke: this.props.stroke,
                    fill: this.props.fill,
                    strokeWidth: 1
                });
            }
        }]);
        return Circle;
    }(_react.Component);

    Circle.propTypes = {
        radius: _propTypes2.default.number.isRequired,
        x: _propTypes2.default.number.isRequired,
        y: _propTypes2.default.number.isRequired,
        onPress: _propTypes2.default.func,
        fill: _propTypes2.default.string,
        stroke: _propTypes2.default.string
    };
    Circle.defaultProps = {
        onPress: function onPress() { },
        radius: 2,
        fill: C.BLACK,
        stroke: C.BLACK
    };
    exports.default = Circle;
}, 10490, [10297, 10033, 10493, 10318], "projects/com.yunmai.scales.ios/CommonModules/Chart/Circle.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var BLUE = exports.BLUE = '#4DC4E6';
    var BLACK = exports.BLACK = '#333333';
    var GREY = exports.GREY = '#999999';
    var RED = exports.RED = '#DF8165';
    var WHITE = exports.WHITE = '#F5F5F5';
    var YELLOW = exports.YELLOW = 'rgba(255, 205, 0, 0.9)';
    var GREEN = exports.GREEN = '#90C456';
    var DARK_PURPLE = exports.DARK_PURPLE = '#374E5C';
    var LIGHT_PURPLE = exports.LIGHT_PURPLE = '#4a697c';
}, 10493, [], "projects/com.yunmai.scales.ios/CommonModules/Chart/constants.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _propTypes = _require(_dependencyMap[1]);

    var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

    var _SegmentedControls = _require(_dependencyMap[2]);

    var _SegmentedControls2 = babelHelpers.interopRequireDefault(_SegmentedControls);

    var _reactNative = _require(_dependencyMap[3]);

    var SegmentedControl = function (_Component) {
        babelHelpers.inherits(SegmentedControl, _Component);

        function SegmentedControl() {
            var _ref;

            var _temp, _this, _ret;

            babelHelpers.classCallCheck(this, SegmentedControl);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _ret = (_temp = (_this = babelHelpers.possibleConstructorReturn(this, (_ref = SegmentedControl.__proto__ || Object.getPrototypeOf(SegmentedControl)).call.apply(_ref, [this].concat(args))), _this), _this.onChange = function (selectedOption, selectedIndex) {
                var onChange = _this.props.onChange;
                onChange({
                    nativeEvent: {
                        selectedSegmentIndex: selectedIndex
                    }
                });
            }, _temp), babelHelpers.possibleConstructorReturn(_this, _ret);
        }

        babelHelpers.createClass(SegmentedControl, [{
            key: "render",
            value: function render() {
                var _props = this.props,
                    values = _props.values,
                    style = _props.style,
                    selectedIndex = _props.selectedIndex;
                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: style
                    },
                    _react2.default.createElement(_SegmentedControls2.default, {
                        options: values,
                        onSelection: this.onChange,
                        selectedIndex: selectedIndex,
                        tint: 'white',
                        backTint: 'transparent',
                        selectedTint: 'rgb(26, 182, 181)'
                    })
                );
            }
        }]);
        return SegmentedControl;
    }(_react.Component);

    SegmentedControl.propTypes = {
        values: _propTypes2.default.array.isRequired,
        onChange: _propTypes2.default.func,
        selectedIndex: _propTypes2.default.number,
        style: _propTypes2.default.any
    };
    exports.default = SegmentedControl;
}, 10496, [10297, 10318, 10499, 10033], "projects/com.yunmai.scales.ios/Main/Briefing/SegmentedControl.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var _reactNative2 = babelHelpers.interopRequireDefault(_reactNative);

    var _RadioButtons = _require(_dependencyMap[2]);

    var _RadioButtons2 = babelHelpers.interopRequireDefault(_RadioButtons);

    var Text = _reactNative2.default.Text,
        TouchableWithoutFeedback = _reactNative2.default.TouchableWithoutFeedback,
        View = _reactNative2.default.View,
        Platform = _reactNative2.default.Platform;

    var SegmentedControls = function (_React$Component) {
        babelHelpers.inherits(SegmentedControls, _React$Component);

        function SegmentedControls() {
            babelHelpers.classCallCheck(this, SegmentedControls);
            return babelHelpers.possibleConstructorReturn(this, (SegmentedControls.__proto__ || Object.getPrototypeOf(SegmentedControls)).apply(this, arguments));
        }

        babelHelpers.createClass(SegmentedControls, [{
            key: "render",
            value: function render() {
                var config = this.getConfig();
                return _react2.default.createElement(_RadioButtons2.default, babelHelpers.extends({}, this.props, {
                    renderOption: this.renderOption.bind(this, config),
                    renderContainer: this.renderContainer.bind(this, config)
                }));
            }
        }, {
            key: "getConfig",
            value: function getConfig() {
                var tint = this.props.tint || DEFAULTS.tint;
                var backTint = this.props.backTint || DEFAULTS.backTint;
                var colors = {
                    tint: tint,
                    selectedTint: backTint,
                    backgroundColor: backTint,
                    selectedBackgroundColor: tint,
                    containerBorderTint: tint,
                    separatorTint: tint
                };
                return babelHelpers.extends({}, DEFAULTS, colors, this.props);
            }
        }, {
            key: "renderContainer",
            value: function renderContainer(config, options) {
                var baseContainerStyle = {
                    flexDirection: config.direction,
                    backgroundColor: config.backgroundColor,
                    borderColor: config.containerBorderTint,
                    borderWidth: config.containerBorderWidth,
                    overflow: 'hidden'
                };
                baseContainerStyle.borderRadius = config.containerBorderRadius;
                var containerStyle = [baseContainerStyle, this.props.containerStyle];
                return _react2.default.createElement(
                    View,
                    {
                        style: containerStyle
                    },
                    options
                );
            }
        }, {
            key: "renderOption",
            value: function renderOption(config, option, selected, onSelect, index) {
                var disabled = this.props.enabled === false;
                var baseTextStyle = {
                    textAlign: config.textAlign
                };
                var normalTextStyle = [baseTextStyle, this.props.optionStyle, {
                    color: config.tint
                }];
                var selectedTextStyle = [baseTextStyle, this.props.optionStyle, {
                    color: config.selectedTint
                }];
                var baseColor = selected ? config.selectedBackgroundColor : config.backgroundColor;
                var opacity = disabled ? 0.5 : 1.0;
                var baseOptionContainerStyle = [{
                    paddingTop: config.paddingTop,
                    paddingBottom: config.paddingBottom,
                    backgroundColor: baseColor,
                    opacity: opacity
                }, config.direction === 'row' && {
                    flex: 1
                }];
                var borderStyles = config.direction === 'row' ? {
                    borderLeftWidth: config.separatorWidth,
                    borderLeftColor: config.separatorTint
                } : {
                    borderTopWidth: config.separatorWidth,
                    borderTopColor: config.separatorTint
                };
                var separatorStyle = [baseOptionContainerStyle, borderStyles];
                var containerBorderRadius = config.containerBorderRadius,
                    containerBorderWidth = config.containerBorderWidth;
                var borderRadiusStyle = void 0;

                if (containerBorderRadius) {
                    var adjustedBorderRadius = containerBorderRadius - containerBorderWidth;

                    if (this.props.options.length > 1) {
                        if (index === 0) {
                            borderRadiusStyle = config.direction === 'row' ? {
                                borderTopLeftRadius: adjustedBorderRadius,
                                borderBottomLeftRadius: adjustedBorderRadius
                            } : {
                                borderTopLeftRadius: adjustedBorderRadius,
                                borderTopRightRadius: adjustedBorderRadius
                            };
                        } else if (index === this.props.options.length - 1) {
                            borderRadiusStyle = config.direction === 'row' ? {
                                borderTopRightRadius: adjustedBorderRadius,
                                borderBottomRightRadius: adjustedBorderRadius
                            } : {
                                borderBottomLeftRadius: adjustedBorderRadius,
                                borderBottomRightRadius: adjustedBorderRadius
                            };
                        }

                        if (index === this.props.options.length - 2) {
                            borderRadiusStyle = config.direction === 'row' ? {
                                borderRightWidth: config.separatorWidth,
                                borderRightColor: config.separatorTint
                            } : {
                                borderBottomWidth: config.separatorWidth,
                                borderBottomColor: config.separatorTint
                            };
                        }
                    } else {
                        borderRadiusStyle = {
                            borderRadius: adjustedBorderRadius
                        };
                    }
                }

                var textStyle = selected ? selectedTextStyle : normalTextStyle;
                var label = this.props.extractText ? this.props.extractText(option) : option;
                var scaleFont = this.props.allowFontScaling === false ? false : true;
                return _react2.default.createElement(
                    TouchableWithoutFeedback,
                    {
                        onPress: onSelect,
                        key: index,
                        disabled: disabled
                    },
                    _react2.default.createElement(
                        View,
                        {
                            style: [index > 0 ? separatorStyle : baseOptionContainerStyle, this.props.optionContainerStyle, borderRadiusStyle]
                        },
                        typeof this.props.renderOption === 'function' ? this.props.renderOption.call(this, option, selected) : _react2.default.createElement(
                            Text,
                            {
                                allowFontScaling: scaleFont,
                                style: textStyle
                            },
                            label
                        )
                    )
                );
            }
        }]);
        return SegmentedControls;
    }(_react2.default.Component);

    var IOS_BLUE = '#007AFF';
    var IOS_WHITE = '#ffffff';
    var DEFAULTS = {
        direction: 'row',
        tint: IOS_BLUE,
        backTint: IOS_WHITE,
        paddingTop: 5,
        paddingBottom: 5,
        textAlign: 'center',
        selectedTint: IOS_WHITE,
        selectedBackgroundColor: IOS_WHITE,
        separatorTint: IOS_BLUE,
        separatorWidth: 1,
        containerBorderTint: IOS_BLUE,
        containerBorderWidth: 1,
        containerBorderRadius: 5
    };
    exports.default = SegmentedControls;
}, 10499, [10297, 10033, 10502], "projects/com.yunmai.scales.ios/Main/Briefing/SegmentedControls.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    var React = _require(_dependencyMap[0]);

    var ReactNative = _require(_dependencyMap[1]);

    var PropTypes = _require(_dependencyMap[2]);

    var Text = ReactNative.Text,
        TouchableWithoutFeedback = ReactNative.TouchableWithoutFeedback,
        View = ReactNative.View;
    var propTypes = {
        options: PropTypes.array.isRequired,
        testOptionEqual: PropTypes.func,
        renderOption: PropTypes.func,
        renderContainer: PropTypes.func,
        onSelection: PropTypes.func
    };

    var RadioButtons = function (_React$Component) {
        babelHelpers.inherits(RadioButtons, _React$Component);

        function RadioButtons() {
            babelHelpers.classCallCheck(this, RadioButtons);

            var _this = babelHelpers.possibleConstructorReturn(this, (RadioButtons.__proto__ || Object.getPrototypeOf(RadioButtons)).call(this));

            _this.state = {
                selectedOption: null,
                selectedIndex: null
            };
            return _this;
        }

        babelHelpers.createClass(RadioButtons, [{
            key: "copySelectedOptionFromProps",
            value: function copySelectedOptionFromProps(_ref) {
                var selectedOption = _ref.selectedOption,
                    selectedIndex = _ref.selectedIndex;
                this.setState({
                    selectedOption: selectedOption,
                    selectedIndex: selectedIndex
                });
            }
        }, {
            key: "componentWillMount",
            value: function componentWillMount() {
                this.copySelectedOptionFromProps(this.props);
            }
        }, {
            key: "componentWillReceiveProps",
            value: function componentWillReceiveProps(newProps) { }
        }, {
            key: "selectOption",
            value: function selectOption(selectedOption, selectedIndex) {
                this.setState({
                    selectedOption: selectedOption,
                    selectedIndex: selectedIndex
                });
                this.props.onSelection(selectedOption, selectedIndex);
                console.log('selectOption ' + selectedIndex);
            }
        }, {
            key: "render",
            value: function render() {
                var _state = this.state,
                    selectedOption = _state.selectedOption,
                    selectedIndex = _state.selectedIndex;
                var children = this.props.options.map(function (option, index) {
                    var isSelected = selectedIndex === index || this.props.testOptionEqual(selectedOption, option);
                    var onSelection = this.selectOption.bind(this, option, index);
                    return this.props.renderOption(option, isSelected, onSelection, index);
                }.bind(this));
                return this.props.renderContainer(children);
            }
        }], [{
            key: "getTextOptionRenderer",
            value: function getTextOptionRenderer(normalStyle, selectedStyle, extractText) {
                return function renderOption(option, selected, onSelect, index) {
                    var style = selected ? selectedStyle : normalStyle;
                    var label = extractText ? extractText(option) : option;
                    return React.createElement(
                        TouchableWithoutFeedback,
                        {
                            onPress: onSelect,
                            key: index
                        },
                        React.createElement(
                            Text,
                            {
                                style: style
                            },
                            label
                        )
                    );
                };
            }
        }, {
            key: "getViewContainerRenderer",
            value: function getViewContainerRenderer(style) {
                return function renderContainer(options) {
                    return React.createElement(
                        View,
                        {
                            style: style
                        },
                        options
                    );
                };
            }
        }]);
        return RadioButtons;
    }(React.Component);

    RadioButtons.renderHorizontalContainer = RadioButtons.getViewContainerRenderer({
        flexDirection: 'row'
    });
    RadioButtons.renderVerticalContainer = RadioButtons.getViewContainerRenderer({
        flexDirection: 'column'
    });
    RadioButtons.defaultProps = {
        testOptionEqual: function testOptionEqual(a, b) {
            return a === b;
        },
        renderOption: RadioButtons.getTextOptionRenderer({}, {
            fontWeight: 'bold'
        }),
        renderContainer: RadioButtons.renderVerticalContainer,
        onSelection: function onSelection(option) { }
    };
    RadioButtons.propTypes = propTypes;
    module.exports = RadioButtons;
}, 10502, [10297, 10033, 10318], "projects/com.yunmai.scales.ios/Main/Briefing/RadioButtons.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var _ui = _require(_dependencyMap[2]);

    var _Global = _require(_dependencyMap[3]);

    var _Global2 = babelHelpers.interopRequireDefault(_Global);

    var _Localized = _require(_dependencyMap[4]);

    var BriefingCalendar = function (_Component) {
        babelHelpers.inherits(BriefingCalendar, _Component);

        function BriefingCalendar(props) {
            babelHelpers.classCallCheck(this, BriefingCalendar);

            var _this = babelHelpers.possibleConstructorReturn(this, (BriefingCalendar.__proto__ || Object.getPrototypeOf(BriefingCalendar)).call(this, props));

            _initialiseProps.call(_this);

            var date = new Date();
            _this.state = {
                selectedDate: date,
                viewedDate: date,
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                calendarIsExpand: false,
                loadingTitle: '',
                loadingMsg: '',
                loadingVisible: false
            };
            return _this;
        }

        babelHelpers.createClass(BriefingCalendar, [{
            key: "render",
            value: function render() {
                var _this2 = this;

                var today = new Date();
                var dateFormatterOptions = {
                    year: 'numeric',
                    month: 'short'
                };
                var lastMonth = new Date(this.state.year, this.state.month - 1, 0, 0, 0, 0, 0);
                var thisMonthFirstDay = new Date(this.state.year, this.state.month - 1, 1, 0, 0, 0, 0);
                var thisMonthLastDay = new Date(this.state.year, this.state.month, 0, 0, 0, 0, 0);
                var dayInLastMonth = lastMonth.getDate();
                var prefixDayCount = thisMonthFirstDay.getDay();
                var fullDayInMonth = prefixDayCount + thisMonthLastDay.getDate();

                while (fullDayInMonth % 7) {
                    fullDayInMonth += 1;
                }

                var viewedPageIsCurrent = this.state.year == today.getFullYear() && this.state.month == today.getMonth() + 1;
                var viewedPageIsSelected = this.state.year == this.state.selectedDate.getFullYear() && this.state.month == this.state.selectedDate.getMonth() + 1;
                var cells = [];

                for (var index = 0; index < fullDayInMonth; index++) {
                    var isSelectedDay = false;
                    var isToday = false;
                    var isBelongToCurrentMonth = false;
                    var day = 0;

                    var callback = function callback(e) { };

                    if (index < prefixDayCount) {
                        day = dayInLastMonth - prefixDayCount + index + 1;
                    } else if (index < thisMonthLastDay.getDate() + prefixDayCount) {
                        day = index - prefixDayCount + 1;

                        if (!(viewedPageIsCurrent && day > today.getDate())) {
                            isBelongToCurrentMonth = true;

                            if (viewedPageIsCurrent && day == today.getDate()) {
                                isToday = true;
                            }

                            if (viewedPageIsSelected && day == this.state.selectedDate.getDate()) {
                                isSelectedDay = true;
                            }

                            callback = this.selectedDate1;
                        }
                    } else {
                        day = index - thisMonthLastDay.getDate() - prefixDayCount + 1;
                    }

                    cells.push(_react2.default.createElement(DayCell, {
                        key: 'daycell' + index,
                        day: day,
                        isSelectedDay: isSelectedDay,
                        isToday: isToday,
                        isBelongToCurrentMonth: isBelongToCurrentMonth,
                        onPress: callback
                    }));
                }

                var lastMonthBtnDisable = this.state.year == 2017 && this.state.month == 1;
                var nextMonthBtnDisable = viewedPageIsCurrent;
                return _react2.default.createElement(
                    _reactNative.Modal,
                    {
                        transparent: true,
                        onRequestClose: function onRequestClose() {
                            _this2.closeCalendar();
                        },
                        visible: this.state.calendarIsExpand
                    },
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: {
                                width: _Global2.default.screenWidth(),
                                height: _Global2.default.screenHeight()
                            }
                        },
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: mainStyles.container
                            },
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: mainStyles.topView
                                },
                                _react2.default.createElement(
                                    _reactNative.TouchableHighlight,
                                    {
                                        disabled: lastMonthBtnDisable,
                                        underlayColor: "transparent",
                                        onPress: this.lastMonth
                                    },
                                    _react2.default.createElement(
                                        _reactNative.View,
                                        {
                                            style: mainStyles.monthBtn
                                        },
                                        _react2.default.createElement(_reactNative.Image, {
                                            style: [mainStyles.monthBtnIcon, {
                                                opacity: lastMonthBtnDisable ? 0.4 : 1
                                            }],
                                            source: _Global2.default.brf_arrowLeft
                                        })
                                    )
                                ),
                                _react2.default.createElement(
                                    _reactNative.Text,
                                    {
                                        style: mainStyles.title
                                    },
                                    _Global.Function.getDateString(2, this.state.viewedDate)
                                ),
                                _react2.default.createElement(
                                    _reactNative.TouchableHighlight,
                                    {
                                        disabled: nextMonthBtnDisable,
                                        underlayColor: "transparent",
                                        onPress: this.nextMonth
                                    },
                                    _react2.default.createElement(
                                        _reactNative.View,
                                        {
                                            style: mainStyles.monthBtn
                                        },
                                        _react2.default.createElement(_reactNative.Image, {
                                            style: [mainStyles.monthBtnIcon, {
                                                opacity: nextMonthBtnDisable ? 0.4 : 1.0
                                            }],
                                            source: _Global2.default.brf_arrowRight
                                        })
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: mainStyles.weekdayView
                                },
                                [_Localized.Localized.Global_Week_Sun_Short, _Localized.Localized.Global_Week_Mon_Short, _Localized.Localized.Global_Week_Tue_Short, _Localized.Localized.Global_Week_Wed_Short, _Localized.Localized.Global_Week_Thu_Short, _Localized.Localized.Global_Week_Fri_Short, _Localized.Localized.Global_Week_Sat_Short].map(function (item, index) {
                                    return _react2.default.createElement(
                                        _reactNative.View,
                                        {
                                            key: 'weekday' + index,
                                            style: mainStyles.cell
                                        },
                                        _react2.default.createElement(
                                            _reactNative.Text,
                                            {
                                                style: {
                                                    fontSize: 12,
                                                    color: 'rgba(50, 50, 50, 0.4)'
                                                }
                                            },
                                            item
                                        )
                                    );
                                })
                            ),
                            _react2.default.createElement(_reactNative.View, {
                                style: mainStyles.separator
                            }),
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: mainStyles.dataView
                                },
                                cells
                            ),
                            _react2.default.createElement(_reactNative.View, {
                                style: mainStyles.bottomView
                            })
                        ),
                        _react2.default.createElement(
                            _reactNative.TouchableHighlight,
                            {
                                underlayColor: "transparent",
                                onPress: this.closeCalendar,
                                style: {
                                    width: _Global2.default.screenWidth(),
                                    height: _Global2.default.screenHeight()
                                }
                            },
                            _react2.default.createElement(_reactNative.View, {
                                style: mainStyles.backgroundContainer
                            })
                        ),
                        _react2.default.createElement(_ui.LoadingDialog, {
                            title: this.state.loadingTitle,
                            message: this.state.loadingMsg,
                            onDismiss: function onDismiss() { },
                            visible: this.state.loadingVisible
                        })
                    )
                );
            }
        }]);
        return BriefingCalendar;
    }(_react.Component);

    var _initialiseProps = function _initialiseProps() {
        var _this3 = this;

        this.openCalendar = function () {
            var date = new Date();

            _this3.setState({
                viewedDate: date,
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                calendarIsExpand: true
            });

            _reactNative.StatusBar.setBarStyle('dark-content');
        };

        this.closeCalendar = function () {
            _this3.setState({
                calendarIsExpand: false
            });

            _reactNative.StatusBar.setBarStyle('light-content');
        };

        this.selectedDate1 = function (day) {
            var selectDay = new Date(_this3.state.year, _this3.state.month - 1, day, 0, 0, 0, 0);

            _this3.setState({
                loadingMsg: _Localized.Localized.BriefingList_Interaction_Loding,
                loadingVisible: true,
                selectedDate: selectDay
            });

            if (_this3.props.selectedCallback) {
                _this3.props.selectedCallback(selectDay);
            }

            _this3.setState({
                loadingMsg: _Localized.Localized.BriefingList_Interaction_Loding,
                loadingVisible: false,
                selectedDate: selectDay,
                calendarIsExpand: false
            });
        };

        this.lastMonth = function () {
            _this3.state.month -= 1;

            if (_this3.state.month == 0) {
                _this3.state.month = 12;
                _this3.state.year -= 1;
            }

            _this3.state.viewedDate = new Date(_this3.state.year, _this3.state.month - 1, 1, 0, 0, 0, 0);

            _this3.setState({});
        };

        this.nextMonth = function () {
            _this3.state.month += 1;

            if (_this3.state.month == 13) {
                _this3.state.month = 1;
                _this3.state.year += 1;
            }

            _this3.state.viewedDate = new Date(_this3.state.year, _this3.state.month - 1, 1, 0, 0, 0, 0);

            _this3.setState({});
        };
    };

    exports.default = BriefingCalendar;

    var DayCell = function (_Component2) {
        babelHelpers.inherits(DayCell, _Component2);

        function DayCell() {
            babelHelpers.classCallCheck(this, DayCell);
            return babelHelpers.possibleConstructorReturn(this, (DayCell.__proto__ || Object.getPrototypeOf(DayCell)).apply(this, arguments));
        }

        babelHelpers.createClass(DayCell, [{
            key: "render",
            value: function render() {
                var _this5 = this;

                return _react2.default.createElement(
                    _reactNative.TouchableHighlight,
                    {
                        underlayColor: "transparent",
                        onPress: function onPress(e) {
                            _this5.props.onPress(_this5.props.day);
                        }
                    },
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: [mainStyles.cell, dayCellStyles.container]
                        },
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: [dayCellStyles.markLayer, {
                                    backgroundColor: this.props.isSelectedDay ? 'rgb(26, 182, 181)' : 'transparent',
                                    borderColor: this.props.isToday ? 'rgb(26, 182, 181)' : 'transparent'
                                }]
                            },
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: [dayCellStyles.text, this.props.isBelongToCurrentMonth ? this.props.isSelectedDay ? dayCellStyles.selectedText : this.props.isToday ? dayCellStyles.todayText : dayCellStyles.defaultText : dayCellStyles.inactiveText]
                                },
                                this.props.day
                            )
                        )
                    )
                );
            }
        }]);
        return DayCell;
    }(_react.Component);

    var mainStyles = _reactNative.StyleSheet.create({
        backgroundContainer: {
            flex: 1,
            height: _Global2.default.screenHeight(),
            width: _Global2.default.screenWidth(),
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
        },
        container: {
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: _Global2.default.screenWidth(),
            backgroundColor: 'white'
        },
        topView: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: _Global2.default.screenWidth(),
            height: _Global2.default.navBarHeight(),
            marginTop: _Global2.default.statusBarHeight()
        },
        monthBtn: {
            justifyContent: 'center',
            alignItems: 'center',
            width: 38,
            height: 44
        },
        monthBtnIcon: {
            width: 8,
            height: 14
        },
        title: {
            fontSize: 17,
            color: 'rgba(0, 0, 0, 0.8)'
        },
        weekdayView: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: _Global2.default.screenWidth(),
            height: _Global2.default.deviceIsPad() ? 90 : 32
        },
        separator: {
            height: 0.5,
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            width: _Global2.default.screenWidth()
        },
        bottomView: {
            width: _Global2.default.screenWidth(),
            height: 25
        },
        cell: {
            justifyContent: 'center',
            alignItems: 'center',
            width: _Global2.default.deviceIsPad() ? 85 : 32,
            height: _Global2.default.deviceIsPad() ? 85 : 32,
            marginLeft: _Global2.default.deviceType() == 'Small' ? 6 : _Global2.default.deviceType() == 'Plus' ? 11 : 9,
            marginRight: _Global2.default.deviceType() == 'Small' ? 6 : _Global2.default.deviceType() == 'Plus' ? 11 : 9
        },
        dataView: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: _Global2.default.screenWidth(),
            flexWrap: 'wrap'
        }
    });

    var dayCellStyles = _reactNative.StyleSheet.create({
        container: {
            marginTop: 15,
            marginBottom: 2
        },
        markLayer: {
            justifyContent: 'center',
            alignItems: 'center',
            width: 22,
            height: 22,
            borderRadius: 11,
            borderWidth: 1
        },
        text: {
            fontSize: 15,
            backgroundColor: 'transparent'
        },
        defaultText: {
            color: 'rgba(0, 0, 0, 0.8)'
        },
        inactiveText: {
            color: 'rgba(0, 0, 0, 0.2)'
        },
        selectedText: {
            color: 'white'
        },
        todayText: {
            color: 'rgb(26, 182, 181)'
        }
    });
}, 10505, [10297, 10033, 10230, 10010, 10013], "projects/com.yunmai.scales.ios/Main/Briefing/BriefingCalendar.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var _Localized = _require(_dependencyMap[2]);

    var _miot = _require(_dependencyMap[3]);

    var _Global = _require(_dependencyMap[4]);

    var _Global2 = babelHelpers.interopRequireDefault(_Global);

    var _BriefingView = _require(_dependencyMap[5]);

    var _BriefingView2 = babelHelpers.interopRequireDefault(_BriefingView);

    var _NewNavBar = _require(_dependencyMap[6]);

    var _NewNavBar2 = babelHelpers.interopRequireDefault(_NewNavBar);

    var _YMUser = _require(_dependencyMap[7]);

    var _YMUser2 = babelHelpers.interopRequireDefault(_YMUser);

    var _SQLite = _require(_dependencyMap[8]);

    var _SQLite2 = babelHelpers.interopRequireDefault(_SQLite);

    var queryControl = 20;

    var BriefingList = function (_Component) {
        babelHelpers.inherits(BriefingList, _Component);

        function BriefingList(props) {
            babelHelpers.classCallCheck(this, BriefingList);

            var _this = babelHelpers.possibleConstructorReturn(this, (BriefingList.__proto__ || Object.getPrototypeOf(BriefingList)).call(this, props));

            _this.queryData = function () {
                if (_this.isLoding) {
                    return;
                }

                _this.isLoding = true;
                var endTimestamp = new Date().setHours(0, 0, 0, 0) * 0.001 + 86400;
                var startTimestamp = 0;

                _this.sqlite.getSectionWeightInfoForList(_YMUser2.default.getCurrentUserInfo().shortId, startTimestamp, endTimestamp, queryControl, _this.queryOffset, function (resultList) {
                    var _this$state$weightDat;

                    if (resultList.length == 0) {
                        return;
                    }

                    if (_this.state.weightDatas.length > 0 && _this.state.weightDatas[_this.state.weightDatas.length - 1].createTime <= resultList[0].createTime) {
                        return;
                    }

                    var newDatas = (_this$state$weightDat = _this.state.weightDatas).concat.apply(_this$state$weightDat, babelHelpers.toConsumableArray(resultList.map(_Global.Function.reorganizeWeightData)));

                    _this.setState({
                        weightDatas: newDatas
                    });

                    _this.queryOffset += queryControl;
                    _this.isLoding = false;
                });
            };

            _this.toEnd = function () {
                _this.queryData();
            };

            _this.sqlite = new _SQLite2.default();
            _this.queryOffset = 0;
            _this.isLoding = false;
            _this.state = {
                weightDatas: []
            };
            return _this;
        }

        babelHelpers.createClass(BriefingList, [{
            key: "componentDidMount",
            value: function componentDidMount() {
                this.queryData();
            }
        }, {
            key: "render",
            value: function render() {
                var nodes = [];
                var reorganizeData = [];
                this.state.weightDatas.map(function (item) {
                    if (!reorganizeData.some(function (element) {
                        return element.date == item.date;
                    })) reorganizeData.push({
                        date: item.date,
                        timeData: []
                    });
                    reorganizeData.map(function (element) {
                        if (element.date == item.date) {
                            element.timeData.push(item);
                        }
                    });
                });
                reorganizeData.map(function (item, index) {
                    return nodes.push(_react2.default.createElement(_BriefingView2.default, {
                        style: styles.dayDataView,
                        data: item,
                        index: index
                    }));
                });
                nodes.push(_react2.default.createElement(_reactNative.View, {
                    style: styles.footerView
                }));
                var mainDataSource = new _reactNative.ListView.DataSource({
                    rowHasChanged: function rowHasChanged(r1, r2) {
                        return r1 !== r2;
                    }
                }).cloneWithRows(nodes);
                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: styles.container
                    },
                    _react2.default.createElement(_reactNative.ListView, {
                        dataSource: mainDataSource,
                        renderRow: function renderRow(rowData) {
                            return rowData;
                        },
                        pageSize: 2,
                        scrollRenderAheadDistance: 100,
                        onEndReached: this.toEnd
                    })
                );
            }
        }]);
        return BriefingList;
    }(_react.Component);

    BriefingList.navigationOptions = function (_ref) {
        var navigation = _ref.navigation;
        return {
            header: _react2.default.createElement(_NewNavBar2.default, {
                title: _Localized.Localized.BriefingList_Title,
                style: {
                    backgroundColor: "rgb(239, 239, 240)"
                },
                type: "light",
                onPressLeft: function onPressLeft(_) {
                    navigation.goBack();
                }
            })
        };
    };

    exports.default = BriefingList;

    var styles = _reactNative.StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginBottom: 0,
            marginTop: 0,
            backgroundColor: 'rgb(243, 243, 247)'
        },
        dayDataView: {
            width: _Global2.default.screenWidth()
        },
        footerView: {
            width: _Global2.default.screenWidth(),
            height: 44
        }
    });
}, 10508, [10297, 10033, 10013, 10074, 10010, 10511, 10379, 10019, 10469], "projects/com.yunmai.scales.ios/Main/Briefing/BriefingList.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _ui = _require(_dependencyMap[1]);

    var _reactNative = _require(_dependencyMap[2]);

    var _SQLite = _require(_dependencyMap[3]);

    var _SQLite2 = babelHelpers.interopRequireDefault(_SQLite);

    var _Global = _require(_dependencyMap[4]);

    var _Global2 = babelHelpers.interopRequireDefault(_Global);

    var _YMDataHold = _require(_dependencyMap[5]);

    var _YMDataHold2 = babelHelpers.interopRequireDefault(_YMDataHold);

    var _Localized = _require(_dependencyMap[6]);

    var _EvaluationView = _require(_dependencyMap[7]);

    var _EvaluationView2 = babelHelpers.interopRequireDefault(_EvaluationView);

    var _YMStand = _require(_dependencyMap[8]);

    var _YMStand2 = babelHelpers.interopRequireDefault(_YMStand);

    var _YMUser = _require(_dependencyMap[9]);

    var _YMUser2 = babelHelpers.interopRequireDefault(_YMUser);

    var BriefingView = function (_Component) {
        babelHelpers.inherits(BriefingView, _Component);

        function BriefingView(props) {
            babelHelpers.classCallCheck(this, BriefingView);

            var _this = babelHelpers.possibleConstructorReturn(this, (BriefingView.__proto__ || Object.getPrototypeOf(BriefingView)).call(this, props));

            _this.timeRow = function (item, index) {
                var separator = null;

                if (index != 0) {
                    separator = _react2.default.createElement(_reactNative.View, {
                        key: index + 'separator',
                        style: [mainStyles.separator, mainStyles.shortSeparator]
                    });
                }

                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        key: index + 'container'
                    },
                    separator,
                    _react2.default.createElement(TimeView, {
                        key: index + 'timeView',
                        data: item,
                        itemIndex: _this.props.index,
                        timeIndex: index
                    })
                );
            };

            _this.state = {
                isHide: false
            };
            _this.onDeleteWeightEvent = _reactNative.DeviceEventEmitter.addListener('onDeleteWeightEvent', function (e) {
                if (_this.props.index == e.itemIndex && e.isFirstData) {
                    var needHide = _this.props.data.timeData.length == 0;

                    _this.setState({
                        isHide: needHide
                    });
                }
            });
            return _this;
        }

        babelHelpers.createClass(BriefingView, [{
            key: "componentWillUnmount",
            value: function componentWillUnmount() {
                this.onDeleteWeightEvent.remove();
            }
        }, {
            key: "render",
            value: function render() {
                return this.state.isHide ? null : _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: [mainStyles.container, this.props.style]
                    },
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: mainStyles.dateLable
                        },
                        _react2.default.createElement(
                            _reactNative.Text,
                            {
                                style: mainStyles.dateLableText
                            },
                            this.props.data.date
                        )
                    ),
                    _react2.default.createElement(_reactNative.View, {
                        style: mainStyles.separator
                    }),
                    this.props.data.timeData.map(this.timeRow),
                    _react2.default.createElement(_reactNative.View, {
                        style: mainStyles.separator
                    })
                );
            }
        }]);
        return BriefingView;
    }(_react.Component);

    exports.default = BriefingView;

    var TimeView = function (_Component2) {
        babelHelpers.inherits(TimeView, _Component2);

        function TimeView(props) {
            babelHelpers.classCallCheck(this, TimeView);

            var _this2 = babelHelpers.possibleConstructorReturn(this, (TimeView.__proto__ || Object.getPrototypeOf(TimeView)).call(this, props));

            _this2.onTouchSectionHeader = function () {
                _this2.setState({
                    isExpand: !_this2.state.isExpand
                });
            };

            _this2.onDeleteWeight = function () {
                _this2.setState({
                    loadingVisible: false
                });

                _YMDataHold2.default.deleteWeight(_this2.props.data, function (completed) {
                    var sqlite = new _SQLite2.default();
                    sqlite.deleteWeight(_this2.props.data, function (weight) {
                        _this2.setState({
                            isHide: true
                        });

                        _reactNative.DeviceEventEmitter.emit('onDeleteWeightEvent', {
                            weightData: _this2.props.data,
                            isFirstData: _this2.props.itemIndex == 0 && _this2.props.timeIndex == 0,
                            itemIndex: _this2.props.itemIndex,
                            timeIndex: _this2.props.timeIndex
                        });
                    });
                });
            };

            _this2.state = {
                isHide: false,
                isExpand: false,
                messageMsg: '',
                messageVisible: false,
                loadingMsg: '',
                loadingVisible: false
            };
            return _this2;
        }

        babelHelpers.createClass(TimeView, [{
            key: "render",
            value: function render() {
                var _this3 = this;

                var timeIcon = _Global2.default.brf_noon;

                if (this.props.data.hour <= 4 || this.props.data.hour >= 18) {
                    timeIcon = _Global2.default.brf_night;
                } else if (this.props.data.hour <= 11) {
                    timeIcon = _Global2.default.brf_morning;
                }

                var showDetail = this.props.data.fat > 5;
                var arrowSource = showDetail ? this.state.isExpand ? _Global2.default.brf_arrowUp : _Global2.default.brf_arrowDown : "";
                var detailView = showDetail ? this.state.isExpand ? _react2.default.createElement(DetailView, {
                    data: this.props.data
                }) : null : null;

                var weightValue = _Global.Function.converKgToOtherString(this.props.data.weight, _YMUser2.default.getCurrentUserInfo().unit);

                return this.state.isHide ? null : _react2.default.createElement(
                    _reactNative.View,
                    null,
                    _react2.default.createElement(
                        _reactNative.TouchableHighlight,
                        {
                            underlayColor: 'transparent',
                            delayLongPress: 1500,
                            delayPressIn: 0,
                            onLongPress: function onLongPress() {
                                _this3.setState({
                                    messageMsg: _Localized.Localized.BriefingList_Delete_Weight,
                                    messageVisible: true
                                });
                            },
                            onPress: showDetail ? this.onTouchSectionHeader : function (e) { }
                        },
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: timeStyle.container
                            },
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: timeStyle.timeView
                                },
                                _react2.default.createElement(_reactNative.Image, {
                                    style: timeStyle.icon,
                                    source: timeIcon
                                }),
                                _react2.default.createElement(
                                    _reactNative.Text,
                                    {
                                        style: [timeStyle.time, timeStyle.normalText]
                                    },
                                    this.props.data.hour + ':' + this.props.data.minute
                                )
                            ),
                            _react2.default.createElement(_reactNative.View, {
                                style: timeStyle.separator
                            }),
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: timeStyle.itemView
                                },
                                _react2.default.createElement(
                                    _reactNative.View,
                                    {
                                        style: {
                                            flexDirection: 'row',
                                            height: 16
                                        }
                                    },
                                    _react2.default.createElement(
                                        _reactNative.Text,
                                        {
                                            style: timeStyle.normalText
                                        },
                                        _Localized.Localized.Global_UserInfo_Weight
                                    )
                                ),
                                _react2.default.createElement(
                                    _reactNative.View,
                                    {
                                        style: timeStyle.itemValueView
                                    },
                                    _react2.default.createElement(
                                        _reactNative.Text,
                                        {
                                            style: [timeStyle.boldText, {
                                                width: 150
                                            }]
                                        },
                                        weightValue,
                                        _react2.default.createElement(
                                            _reactNative.Text,
                                            {
                                                style: [timeStyle.normalText, {
                                                    fontSize: 12
                                                }]
                                            },
                                            _Global.Function.convertUnit(_YMUser2.default.getCurrentUserInfo().unit)
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(_reactNative.View, {
                                style: timeStyle.separator
                            }),
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: timeStyle.itemView
                                },
                                _react2.default.createElement(
                                    _reactNative.View,
                                    {
                                        style: {
                                            flexDirection: 'row'
                                        }
                                    },
                                    _react2.default.createElement(
                                        _reactNative.Text,
                                        {
                                            style: timeStyle.normalText
                                        },
                                        _Global.Function.converInfo(showDetail ? 'fat' : 'bmi')
                                    ),
                                    _react2.default.createElement(_EvaluationView2.default, {
                                        style: {
                                            marginLeft: 4.5
                                        },
                                        stand: showDetail ? _YMStand2.default.getStand({
                                            type: 'fat',
                                            value: this.props.data.fat
                                        }) : _YMStand2.default.getStand({
                                            type: 'bmi',
                                            value: this.props.data.bmi
                                        })
                                    })
                                ),
                                _react2.default.createElement(
                                    _reactNative.View,
                                    {
                                        style: timeStyle.itemValueView
                                    },
                                    _react2.default.createElement(
                                        _reactNative.Text,
                                        {
                                            style: [timeStyle.boldText, {
                                                width: 100
                                            }]
                                        },
                                        showDetail ? Number(this.props.data.fat).toFixed(1) : Number(this.props.data.bmi).toFixed(1),
                                        _react2.default.createElement(
                                            _reactNative.Text,
                                            {
                                                style: [timeStyle.normalText, {
                                                    fontSize: 12
                                                }]
                                            },
                                            showDetail ? '%' : ''
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: timeStyle.rightArrowView
                                },
                                _react2.default.createElement(_reactNative.Image, {
                                    style: timeStyle.arrow,
                                    source: arrowSource
                                })
                            )
                        )
                    ),
                    detailView,
                    _react2.default.createElement(_ui.MessageDialog, {
                        message: this.state.messageMsg,
                        cancel: _Localized.Localized.Global_Interaction_Cancel,
                        confirm: _Localized.Localized.Global_Interaction_Done,
                        onCancel: function onCancel() { },
                        onConfirm: function onConfirm() {
                            _this3.setState({
                                loadingVisible: true
                            });

                            _this3.onDeleteWeight();
                        },
                        onDismiss: function onDismiss() {
                            _this3.setState({
                                messageMsg: _Localized.Localized.BriefingList_Delete_Weight,
                                messageVisible: false
                            });
                        },
                        visible: this.state.messageVisible
                    }),
                    _react2.default.createElement(_ui.LoadingDialog, {
                        message: this.state.loadingMsg,
                        onDismiss: function onDismiss() {
                            _this3.setState({
                                loadingVisible: false
                            });
                        },
                        visible: this.state.loadingVisible
                    })
                );
            }
        }]);
        return TimeView;
    }(_react.Component);

    var DetailView = function (_Component3) {
        babelHelpers.inherits(DetailView, _Component3);

        function DetailView() {
            babelHelpers.classCallCheck(this, DetailView);
            return babelHelpers.possibleConstructorReturn(this, (DetailView.__proto__ || Object.getPrototypeOf(DetailView)).apply(this, arguments));
        }

        babelHelpers.createClass(DetailView, [{
            key: "render",
            value: function render() {
                var _props$data = this.props.data,
                    weight = _props$data.weight,
                    bmi = _props$data.bmi,
                    fat = _props$data.fat,
                    muscle = _props$data.muscle,
                    water = _props$data.water,
                    protein = _props$data.protein,
                    visFat = _props$data.visFat,
                    bone = _props$data.bone,
                    bmr = _props$data.bmr,
                    somaAge = _props$data.somaAge;
                return _react2.default.createElement(
                    _reactNative.View,
                    null,
                    [{
                        type: 'bmi',
                        img: _Global2.default.brf_bmi,
                        value: Number(bmi).toFixed(1)
                    }, {
                        type: 'muscle',
                        img: _Global2.default.brf_muscle,
                        value: Number(muscle).toFixed(1)
                    }, {
                        type: 'visFat',
                        img: _Global2.default.brf_visFat,
                        value: Number(visFat).toFixed(0)
                    }, {
                        type: 'bmr',
                        img: _Global2.default.brf_bmr,
                        value: Number(bmr).toFixed(0),
                        fatValue: Number(fat).toFixed(1)
                    }, {
                        type: 'protein',
                        img: _Global2.default.brf_protein,
                        value: Number(protein).toFixed(1)
                    }, {
                        type: 'somaAge',
                        img: _Global2.default.brf_somaAge,
                        value: Number(somaAge).toFixed(0)
                    }, {
                        type: 'bone',
                        img: _Global2.default.brf_bone,
                        value: weight ? (Number(bone) / Number(weight) * 100).toFixed(1) : '0'
                    }, {
                        type: 'water',
                        img: _Global2.default.brf_water,
                        value: Number(water).toFixed(1)
                    }, {
                        type: 'fatMass',
                        img: _Global2.default.brf_fatMass,
                        value: Number(fat * weight / 100).toFixed(1),
                        fatValue: Number(fat).toFixed(1),
                        weight: Number(weight)
                    }, {
                        type: 'bodyFatIndex',
                        img: _Global2.default.brf_bodyFatIndex,
                        value: Number(fat).toFixed(1)
                    }, {
                        type: 'obesityLevel',
                        img: _Global2.default.brf_obesityLevel,
                        value: Number(fat).toFixed(1)
                    }, {
                        type: 'somatotype',
                        img: _Global2.default.brf_somatotype,
                        value: Number(fat).toFixed(1),
                        fatValue: Number(fat)
                    }, {
                        type: 'normalWeight',
                        img: _Global2.default.brf_normalWeight,
                        value: Number(weight).toFixed(1),
                        weight: Number(weight)
                    }, {
                        type: 'fatFreeMass',
                        img: _Global2.default.brf_fatFreeMass,
                        value: Number(fat > 5 ? (1 - fat / 100) * weight : 0).toFixed(1),
                        fatValue: Number(fat)
                    }].map(function (item, index) {
                        return _react2.default.createElement(DetailRow, {
                            key: 'detailRow' + index,
                            type: item.type,
                            title: _Global.Function.converInfo(item.type),
                            icon: item.img,
                            valueText: _Global.Function.textHandler(babelHelpers.extends({}, item, {
                                unit: _YMUser2.default.getCurrentUserInfo().unit
                            })),
                            stand: _YMStand2.default.getStand(item)
                        });
                    })
                );
            }
        }]);
        return DetailView;
    }(_react.Component);

    var DetailRow = function (_Component4) {
        babelHelpers.inherits(DetailRow, _Component4);

        function DetailRow() {
            babelHelpers.classCallCheck(this, DetailRow);
            return babelHelpers.possibleConstructorReturn(this, (DetailRow.__proto__ || Object.getPrototypeOf(DetailRow)).apply(this, arguments));
        }

        babelHelpers.createClass(DetailRow, [{
            key: "render",
            value: function render() {
                var _props = this.props,
                    title = _props.title,
                    valueText = _props.valueText,
                    stand = _props.stand,
                    icon = _props.icon,
                    type = _props.type;
                return _react2.default.createElement(
                    _reactNative.View,
                    null,
                    _react2.default.createElement(_reactNative.View, {
                        style: detailStyle.separator
                    }),
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: [detailStyle.row, detailStyle.whole]
                        },
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: [detailStyle.row, detailStyle.left]
                            },
                            _react2.default.createElement(_reactNative.Image, {
                                style: detailStyle.icon,
                                source: icon
                            }),
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: detailStyle.text
                                },
                                title
                            )
                        ),
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: [detailStyle.row, detailStyle.right]
                            },
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: detailStyle.text
                                },
                                type === 'bodyFatIndex' || type === 'obesityLevel' ? stand.intervalIndex : valueText
                            ),
                            type === 'normalWeight' || type === 'fatFreeMass' ? null : _react2.default.createElement(_EvaluationView2.default, {
                                style: detailStyle.evaluation,
                                stand: stand
                            })
                        )
                    )
                );
            }
        }]);
        return DetailRow;
    }(_react.Component);

    var mainStyles = _reactNative.StyleSheet.create({
        container: {
            justifyContent: 'flex-start',
            backgroundColor: 'white'
        },
        dateLable: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            height: 45.0,
            backgroundColor: 'rgb(243, 243, 247)'
        },
        dateLableText: {
            marginLeft: 15,
            fontSize: 14,
            textAlign: 'left',
            color: 'rgb(136, 136, 136)'
        },
        separator: {
            height: 0.5,
            backgroundColor: 'rgb(218, 218, 218)'
        },
        shortSeparator: {
            marginHorizontal: 15
        }
    });

    var timeStyle = _reactNative.StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            height: 78,
            backgroundColor: 'white'
        },
        timeView: {
            justifyContent: 'center',
            alignItems: 'center',
            width: (_Global2.default.screenWidth() - 2) / 3
        },
        icon: {
            width: 24,
            height: 24
        },
        time: {
            width: (_Global2.default.screenWidth() - 2) / 3,
            textAlign: 'center',
            marginTop: 4
        },
        itemView: {
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingLeft: 30,
            width: (_Global2.default.screenWidth() - 2) / 3
        },
        itemValueView: {
            flexDirection: 'row',
            alignItems: 'flex-end',
            marginTop: 3
        },
        rightArrowView: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end'
        },
        arrow: {
            width: 14,
            height: 8,
            marginRight: 15
        },
        separator: {
            width: 0.5,
            height: 44,
            backgroundColor: 'rgb(218, 218, 218)'
        },
        normalText: {
            fontSize: 14,
            color: 'rgb(136, 136, 136)'
        },
        boldText: {
            fontSize: 24,
            color: 'rgba(0, 0, 0, 0.8)'
        }
    });

    var detailStyle = _reactNative.StyleSheet.create({
        row: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        whole: {
            justifyContent: 'space-between',
            height: 44,
            width: _Global2.default.screenWidth()
        },
        left: {
            justifyContent: 'flex-end'
        },
        right: {
            justifyContent: 'flex-start'
        },
        separator: {
            height: 0.5,
            backgroundColor: 'rgb(218, 218, 218)',
            marginHorizontal: 15
        },
        icon: {
            width: 24,
            height: 24,
            marginLeft: 15
        },
        text: {
            fontSize: 14,
            color: 'rgba(0, 0, 0, 0.8)',
            marginHorizontal: 14
        },
        evaluation: {
            marginRight: 15
        }
    });
}, 10511, [10297, 10230, 10033, 10469, 10010, 10007, 10013, 10433, 10427, 10019], "projects/com.yunmai.scales.ios/Main/Briefing/BriefingView.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var _miot = _require(_dependencyMap[2]);

    var _Localized = _require(_dependencyMap[3]);

    var _UserRequiredSex = _require(_dependencyMap[4]);

    var _UserRequiredSex2 = babelHelpers.interopRequireDefault(_UserRequiredSex);

    var _UserRequiredHeight = _require(_dependencyMap[5]);

    var _UserRequiredHeight2 = babelHelpers.interopRequireDefault(_UserRequiredHeight);

    var _UserRequiredAge = _require(_dependencyMap[6]);

    var _UserRequiredAge2 = babelHelpers.interopRequireDefault(_UserRequiredAge);

    var _YMDataHold = _require(_dependencyMap[7]);

    var _YMDataHold2 = babelHelpers.interopRequireDefault(_YMDataHold);

    var _YMBLEControl = _require(_dependencyMap[8]);

    var _YMBLEControl2 = babelHelpers.interopRequireDefault(_YMBLEControl);

    var _ui = _require(_dependencyMap[9]);

    var UserRequiredMainView = function (_Component) {
        babelHelpers.inherits(UserRequiredMainView, _Component);

        function UserRequiredMainView(props) {
            babelHelpers.classCallCheck(this, UserRequiredMainView);

            var _this = babelHelpers.possibleConstructorReturn(this, (UserRequiredMainView.__proto__ || Object.getPrototypeOf(UserRequiredMainView)).call(this, props));

            _this.requireUser = function (requiredViewType) {
                var _this2 = this;

                this.requiredViewType = requiredViewType;

                switch (requiredViewType) {
                    case 0:
                        this.setState({
                            modalVisible: false
                        });

                        _YMBLEControl2.default.disconnectScale();

                        setTimeout(function () {
                            _miot.Package.exit();
                        }, 100);
                        break;

                    case 1:
                        this.setState({
                            mainView: _react2.default.createElement(_UserRequiredSex2.default, {
                                callbackParent: this.requireUser
                            })
                        });
                        break;

                    case 2:
                        this.setState({
                            mainView: _react2.default.createElement(_UserRequiredHeight2.default, {
                                callbackParent: this.requireUser
                            })
                        });
                        break;

                    case 3:
                        this.setState({
                            mainView: _react2.default.createElement(_UserRequiredAge2.default, {
                                callbackParent: this.requireUser
                            })
                        });
                        break;

                    case 4:
                        this.setState({
                            modalVisible: false
                        });
                        break;

                    case 5:
                        _YMDataHold2.default.uploadUserList(function (success) {
                            if (success) {
                                _YMDataHold2.default.saveUserList();

                                _reactNative.DeviceEventEmitter.emit('writUserInfoToSacle', {});

                                _reactNative.DeviceEventEmitter.emit('onNewMainUser', {});

                                _this2.requireUser(4);

                                _this2.setState({
                                    dialogVisible: true,
                                    dialogMessage: _Localized.Localized.MultiUser_Interaction_SaveSuccessfully
                                });
                            } else {
                                _this2.setState({
                                    dialogVisible: true,
                                    dialogMessage: _Localized.Localized.MultiUser_Interaction_SaveFailed
                                });
                            }
                        });

                        break;

                    default:
                        break;
                }
            }.bind(_this);

            _this.state = {
                modalVisible: true,
                dialogMessage: "",
                dialogVisible: false,
                mainView: _react2.default.createElement(_UserRequiredSex2.default, {
                    callbackParent: _this.requireUser
                })
            };
            return _this;
        }

        babelHelpers.createClass(UserRequiredMainView, [{
            key: "render",
            value: function render() {
                var _this3 = this;

                {
                    _reactNative.StatusBar.setBarStyle('default');

                    _reactNative.StatusBar.setHidden(false);
                }
                return _react2.default.createElement(
                    _reactNative.Modal,
                    {
                        animated: true,
                        transparent: true,
                        visible: this.state.modalVisible,
                        onRequestClose: function onRequestClose() {
                            if (_this3.requiredViewType <= 1) {
                                _this3.setState({
                                    modalVisible: false
                                });

                                _YMBLEControl2.default.disconnectScale();

                                _miot.Package.exit();
                            } else {
                                console.log('this.requiredViewType ' + _this3.requiredViewType);

                                _this3.requireUser(_this3.requiredViewType - 1);
                            }
                        }
                    },
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: styles.modalBackgroundStyle
                        },
                        this.state.mainView
                    ),
                    _react2.default.createElement(_ui.MessageDialog, {
                        visible: this.state.dialogVisible,
                        confirm: "\u786E\u5B9A",
                        message: this.state.dialogMessage,
                        onDismiss: function onDismiss() {
                            _this3.setState({
                                dialogVisible: false
                            });
                        }
                    })
                );
            }
        }]);
        return UserRequiredMainView;
    }(_react.Component);

    exports.default = UserRequiredMainView;

    var styles = _reactNative.StyleSheet.create({
        modalBackgroundStyle: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'flex-start',
            alignItems: 'center'
        }
    });
}, 10514, [10297, 10033, 10074, 10013, 10517, 10523, 10526, 10007, 10364, 10230], "projects/com.yunmai.scales.ios/Main/Home/UserRequired/UserRequiredMainView.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var _UserRequiredTitle = _require(_dependencyMap[2]);

    var _UserRequiredTitle2 = babelHelpers.interopRequireDefault(_UserRequiredTitle);

    var _YMUser = _require(_dependencyMap[3]);

    var _YMUser2 = babelHelpers.interopRequireDefault(_YMUser);

    var _Global = _require(_dependencyMap[4]);

    var _Global2 = babelHelpers.interopRequireDefault(_Global);

    var _Localized = _require(_dependencyMap[5]);

    var UserRequiredSex = function (_Component) {
        babelHelpers.inherits(UserRequiredSex, _Component);

        function UserRequiredSex(props, context) {
            babelHelpers.classCallCheck(this, UserRequiredSex);

            var _this = babelHelpers.possibleConstructorReturn(this, (UserRequiredSex.__proto__ || Object.getPrototypeOf(UserRequiredSex)).call(this, props, context));

            _this._onPressButton = function (requiredViewType) {
                if (requiredViewType == 2) {
                    var sex = 1;

                    if (_this.state.selecteSex.man) {
                        sex = 1;
                    } else {
                        sex = 2;
                    }

                    _YMUser2.default.getMainUserInfo().sex = sex;
                } else {
                    _YMUser2.default.getMainUserInfo().sex = undefined;
                }

                _this.props.callbackParent(requiredViewType);
            };

            _this.state = {
                selecteSex: {
                    man: false,
                    woman: false
                }
            };
            return _this;
        }

        babelHelpers.createClass(UserRequiredSex, [{
            key: "componentWillMount",
            value: function componentWillMount() {
                if (_YMUser2.default.getMainUserInfo().sex === 1) {
                    this.state.selecteSex.man = true;
                    this.state.selecteSex.woman = false;
                } else if (_YMUser2.default.getMainUserInfo().sex === 2) {
                    this.state.selecteSex.man = false;
                    this.state.selecteSex.woman = true;
                } else {
                    this.state.selecteSex.man = true;
                    this.state.selecteSex.woman = false;
                }
            }
        }, {
            key: "render",
            value: function render() {
                var _this2 = this;

                var manPic = this.state.selecteSex.man ? _Global2.default.usr_selected_man : _Global2.default.usr_unselected_man;
                var womanPic = this.state.selecteSex.woman ? _Global2.default.usr_selected_woman : _Global2.default.usr_unselected_woman;
                var manTextColor = {
                    color: this.state.selecteSex.man ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)'
                };
                var womanTextColor = {
                    color: this.state.selecteSex.woman ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)'
                };
                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: style.container
                    },
                    _react2.default.createElement(_UserRequiredTitle2.default, {
                        style: style.UserRequiredTitle,
                        step: "1 / 3"
                    }),
                    _react2.default.createElement(
                        _reactNative.Text,
                        {
                            style: style.textTitleSex
                        },
                        _Localized.Localized.Global_UserInfo_Sex
                    ),
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: style.sexView
                        },
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: style.manView
                            },
                            _react2.default.createElement(
                                _reactNative.TouchableWithoutFeedback,
                                {
                                    onPress: function onPress() {
                                        return _this2.setState({
                                            selecteSex: {
                                                man: true,
                                                woman: false
                                            }
                                        });
                                    }
                                },
                                _react2.default.createElement(_reactNative.Image, {
                                    style: style.btnMan,
                                    source: manPic
                                })
                            ),
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: [style.textSex, manTextColor]
                                },
                                _Localized.Localized.Global_Sex_Male
                            )
                        ),
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: style.womanView
                            },
                            _react2.default.createElement(
                                _reactNative.TouchableWithoutFeedback,
                                {
                                    onPress: function onPress() {
                                        return _this2.setState({
                                            selecteSex: {
                                                man: false,
                                                woman: true
                                            }
                                        });
                                    }
                                },
                                _react2.default.createElement(_reactNative.Image, {
                                    style: style.btnWoman,
                                    source: womanPic
                                })
                            ),
                            _react2.default.createElement(
                                _reactNative.Text,
                                {
                                    style: [style.textSex, womanTextColor]
                                },
                                _Localized.Localized.Global_Sex_Female
                            )
                        )
                    ),
                    _react2.default.createElement(
                        _reactNative.View,
                        {
                            style: style.footerView
                        },
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: style.backView
                            },
                            _react2.default.createElement(
                                _reactNative.TouchableOpacity,
                                {
                                    onPress: function onPress() {
                                        return _this2._onPressButton(0);
                                    }
                                },
                                _react2.default.createElement(
                                    _reactNative.Text,
                                    {
                                        style: style.footerText
                                    },
                                    _Localized.Localized.Global_Interaction_Cancel
                                )
                            )
                        ),
                        _react2.default.createElement(_reactNative.View, {
                            style: style.line
                        }),
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: style.nextView
                            },
                            _react2.default.createElement(
                                _reactNative.TouchableOpacity,
                                {
                                    onPress: function onPress() {
                                        return _this2._onPressButton(2);
                                    }
                                },
                                _react2.default.createElement(
                                    _reactNative.Text,
                                    {
                                        style: style.footerText
                                    },
                                    _Localized.Localized.Global_Interaction_Next
                                )
                            )
                        )
                    )
                );
            }
        }]);
        return UserRequiredSex;
    }(_react.Component);

    exports.default = UserRequiredSex;

    var style = _reactNative.StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            top: _Global2.default.screenHeight() * 0.17,
            backgroundColor: "rgb(255,255,255)"
        },
        textTitleSex: {
            marginTop: 71,
            fontSize: 18,
            color: 'rgba(0, 0, 0, 0.8)'
        },
        sexView: {
            marginTop: 39,
            flexDirection: 'row',
            height: 90,
            width: _Global2.default.screenWidth(),
            justifyContent: 'center'
        },
        manView: {
            width: 90,
            height: 111,
            marginRight: 25.5,
            alignItems: 'center'
        },
        womanView: {
            width: 90,
            height: 111,
            marginLeft: 25.5,
            alignItems: 'center'
        },
        btnMan: {
            width: 90,
            height: 90
        },
        btnWoman: {
            width: 90,
            height: 90
        },
        textSex: {
            marginTop: 7,
            fontSize: 13
        },
        footerView: {
            borderRadius: 20,
            borderWidth: 0.5,
            borderColor: 'rgba(0, 0, 0, 0.2)',
            height: 40,
            width: _Global2.default.screenWidth() - 46,
            marginTop: _Global2.default.screenHeight() - (_Global2.default.screenHeight() * 0.17 + 340 + 40) - 6,
            flexDirection: 'row'
        },
        backView: {
            alignItems: 'center',
            justifyContent: 'center',
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            height: 40,
            flex: 1
        },
        line: {
            height: 39,
            width: 0.5,
            backgroundColor: 'rgba(0, 0, 0, 0.2)'
        },
        nextView: {
            alignItems: 'center',
            justifyContent: 'center',
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            height: 40,
            flex: 1
        },
        footerText: {
            fontSize: 16,
            color: 'rgba(0, 0, 0, 0.8)',
            textAlign: 'center',
            paddingVertical: 10,
            paddingHorizontal: 40,
            backgroundColor: 'transparent'
        },
        bottomView: {
            height: 1000,
            backgroundColor: 'rgb(255,255,255)'
        }
    });
}, 10517, [10297, 10033, 10520, 10019, 10010, 10013], "projects/com.yunmai.scales.ios/Main/Home/UserRequired/UserRequiredSex.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var _Localized = _require(_dependencyMap[2]);

    var _Global = _require(_dependencyMap[3]);

    var _Global2 = babelHelpers.interopRequireDefault(_Global);

    var UserRequiredTitle = function (_Component) {
        babelHelpers.inherits(UserRequiredTitle, _Component);

        function UserRequiredTitle() {
            babelHelpers.classCallCheck(this, UserRequiredTitle);
            return babelHelpers.possibleConstructorReturn(this, (UserRequiredTitle.__proto__ || Object.getPrototypeOf(UserRequiredTitle)).apply(this, arguments));
        }

        babelHelpers.createClass(UserRequiredTitle, [{
            key: "render",
            value: function render() {
                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: mainStyles.container
                    },
                    _react2.default.createElement(
                        _reactNative.Text,
                        {
                            style: textStyle.sectionA
                        },
                        _Localized.Localized.Home_Text_NeedSomeBasicInformation
                    ),
                    _react2.default.createElement(
                        _reactNative.Text,
                        {
                            style: textStyle.sectionB
                        },
                        _Localized.Localized.Home_Text_MakeSureTheContent
                    ),
                    _react2.default.createElement(
                        _reactNative.Text,
                        {
                            style: textStyle.sectionC
                        },
                        this.props.step
                    )
                );
            }
        }]);
        return UserRequiredTitle;
    }(_react.Component);

    exports.default = UserRequiredTitle;

    var mainStyles = _reactNative.StyleSheet.create({
        container: {
            alignItems: 'center',
            backgroundColor: 'rgb(243, 243, 247)',
            height: 104,
            width: _Global2.default.screenWidth()
        }
    });

    var textStyle = _reactNative.StyleSheet.create({
        sectionA: {
            marginTop: 22,
            fontSize: 14,
            color: 'rgb(0, 0, 0)'
        },
        sectionB: {
            marginTop: 6,
            fontSize: 14,
            color: 'rgb(255, 84, 0)'
        },
        sectionC: {
            marginTop: 8,
            fontSize: 12,
            color: 'rgba(0, 0, 0,0.5)'
        }
    });
}, 10520, [10297, 10033, 10013, 10010], "projects/com.yunmai.scales.ios/Main/Home/UserRequired/UserRequiredTitle.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var _Localized = _require(_dependencyMap[2]);

    var _Global = _require(_dependencyMap[3]);

    var _Global2 = babelHelpers.interopRequireDefault(_Global);

    var _UserRequiredTitle = _require(_dependencyMap[4]);

    var _UserRequiredTitle2 = babelHelpers.interopRequireDefault(_UserRequiredTitle);

    var _YMUser = _require(_dependencyMap[5]);

    var _YMUser2 = babelHelpers.interopRequireDefault(_YMUser);

    var _ui = _require(_dependencyMap[6]);

    var UserRequiredHeight = function (_Component) {
        babelHelpers.inherits(UserRequiredHeight, _Component);

        function UserRequiredHeight(props, context) {
            babelHelpers.classCallCheck(this, UserRequiredHeight);

            var _this = babelHelpers.possibleConstructorReturn(this, (UserRequiredHeight.__proto__ || Object.getPrototypeOf(UserRequiredHeight)).call(this, props, context));

            _this._onPressButton = function (requiredViewType) {
                if (requiredViewType === 1) {
                    _this.props.callbackParent(requiredViewType);

                    _YMUser2.default.getMainUserInfo().height = undefined;
                } else if (requiredViewType === 3) {
                    if (_this.state.userHeight === undefined) {
                        _this.setState({
                            dialogVisible: true,
                            dialogMessage: _Localized.Localized.Global_Interaction_PleaseFillInHeight
                        });
                    } else if (_this.state.userHeight > 226) {
                        _this.setState({
                            dialogVisible: true,
                            dialogMessage: _Localized.Localized.Global_Interaction_TooHigh
                        });
                    } else if (_this.state.userHeight < 100) {
                        _this.setState({
                            dialogVisible: true,
                            dialogMessage: _Localized.Localized.Global_Interaction_TooLow
                        });
                    } else {
                        _YMUser2.default.getMainUserInfo().height = parseInt(_this.state.userHeight);

                        _this.props.callbackParent(requiredViewType);
                    }
                }
            };

            _this.state = {
                userHeight: 0,
                dialogMessage: "",
                dialogVisible: false
            };
            _this.state.userHeight = _YMUser2.default.getMainUserInfo().height;
            return _this;
        }

        babelHelpers.createClass(UserRequiredHeight, [{
            key: "render",
            value: function render() {
                var _this2 = this;

                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: style.container
                    },
                    _react2.default.createElement(
                        _reactNative.ScrollView,
                        {
                            contentContainerStyle: {
                                flex: 1,
                                alignItems: 'center',
                                alignContent: 'center'
                            }
                        },
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: {
                                    alignItems: 'center',
                                    alignContent: 'center'
                                }
                            },
                            _react2.default.createElement(_UserRequiredTitle2.default, {
                                style: style.UserRequiredTitle,
                                step: "2 / 3"
                            }),
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: {
                                        alignItems: 'center'
                                    }
                                },
                                _react2.default.createElement(
                                    _reactNative.Text,
                                    {
                                        style: style.textTitle
                                    },
                                    _Localized.Localized.Global_UserInfo_Height
                                )
                            ),
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: {
                                        alignItems: 'center'
                                    }
                                },
                                _react2.default.createElement(_reactNative.TextInput, {
                                    style: style.textInput,
                                    autoFocus: true,
                                    underlineColorAndroid: "transparent",
                                    selectionColor: "rgb(37,201,152)",
                                    keyboardType: "number-pad",
                                    maxLength: 3,
                                    defaultValue: String(_YMUser2.default.getMainUserInfo().height == 0 ? '' : _YMUser2.default.getMainUserInfo().height),
                                    onChangeText: function onChangeText(text) {
                                        _this2.state.userHeight = text;
                                    }
                                })
                            ),
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: {
                                        flexDirection: 'row',
                                        top: -14,
                                        alignItems: 'center',
                                        alignContent: 'center',
                                        justifyContent: 'center'
                                    }
                                },
                                _react2.default.createElement(_reactNative.View, {
                                    style: {
                                        marginLeft: 25,
                                        marginTop: 14,
                                        backgroundColor: 'rgb(37,201,152)',
                                        width: 110,
                                        height: 1
                                    }
                                }),
                                _react2.default.createElement(
                                    _reactNative.Text,
                                    {
                                        style: {
                                            marginLeft: 5,
                                            fontSize: 14,
                                            color: 'rgba(0, 0, 0, 0.8)',
                                            fontFamily: "Cochin"
                                        }
                                    },
                                    "cm"
                                )
                            ),
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: style.footerView
                                },
                                _react2.default.createElement(
                                    _reactNative.View,
                                    {
                                        style: style.backView
                                    },
                                    _react2.default.createElement(
                                        _reactNative.TouchableOpacity,
                                        {
                                            onPress: function onPress() {
                                                return _this2._onPressButton(1);
                                            }
                                        },
                                        _react2.default.createElement(
                                            _reactNative.Text,
                                            {
                                                style: style.footerText
                                            },
                                            _Localized.Localized.Global_Interaction_Previous
                                        )
                                    )
                                ),
                                _react2.default.createElement(_reactNative.View, {
                                    style: style.line
                                }),
                                _react2.default.createElement(
                                    _reactNative.View,
                                    {
                                        style: style.nextView
                                    },
                                    _react2.default.createElement(
                                        _reactNative.TouchableOpacity,
                                        {
                                            onPress: function onPress() {
                                                return _this2._onPressButton(3);
                                            }
                                        },
                                        _react2.default.createElement(
                                            _reactNative.Text,
                                            {
                                                style: style.footerText
                                            },
                                            _Localized.Localized.Global_Interaction_Next
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(_ui.MessageDialog, {
                        visible: this.state.dialogVisible,
                        confirm: "\u786E\u5B9A",
                        message: this.state.dialogMessage,
                        onDismiss: function onDismiss() {
                            _this2.setState({
                                dialogVisible: false
                            });
                        }
                    })
                );
            }
        }]);
        return UserRequiredHeight;
    }(_react.Component);

    exports.default = UserRequiredHeight;

    var style = _reactNative.StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            top: _Global2.default.screenHeight() * 0.17,
            backgroundColor: "rgb(255,255,255)"
        },
        textTitle: {
            marginTop: 42,
            fontSize: 18,
            alignItems: 'center',
            color: 'rgba(0, 0, 0, 0.8)'
        },
        textInput: {
            marginTop: 23,
            height: 70,
            width: 110,
            textAlign: "center",
            color: 'black',
            fontSize: 50,
            alignItems: 'center'
        },
        footerView: {
            borderRadius: 20,
            borderWidth: 0.5,
            borderColor: 'rgba(0, 0, 0, 0.2)',
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            width: _Global2.default.screenWidth() - 46,
            marginTop: 40,
            flexDirection: 'row'
        },
        backView: {
            alignItems: 'center',
            justifyContent: 'center',
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            height: 40,
            flex: 1
        },
        line: {
            height: 40,
            width: 0.5,
            backgroundColor: 'rgba(0, 0, 0, 0.2)'
        },
        nextView: {
            alignItems: 'center',
            justifyContent: 'center',
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            height: 40,
            flex: 1
        },
        footerText: {
            fontSize: 16,
            alignItems: 'center',
            color: 'rgba(0, 0, 0, 0.8)',
            textAlign: 'center',
            paddingVertical: 10,
            paddingHorizontal: 40,
            backgroundColor: 'transparent'
        },
        bottomView: {
            height: 1000,
            backgroundColor: 'rgb(255,255,255)'
        }
    });
}, 10523, [10297, 10033, 10013, 10010, 10520, 10019, 10230], "projects/com.yunmai.scales.ios/Main/Home/UserRequired/UserRequiredHeight.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = _require(_dependencyMap[0]);

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactNative = _require(_dependencyMap[1]);

    var _Localized = _require(_dependencyMap[2]);

    var _Global = _require(_dependencyMap[3]);

    var _Global2 = babelHelpers.interopRequireDefault(_Global);

    var _UserRequiredTitle = _require(_dependencyMap[4]);

    var _UserRequiredTitle2 = babelHelpers.interopRequireDefault(_UserRequiredTitle);

    var _YMUser = _require(_dependencyMap[5]);

    var _YMUser2 = babelHelpers.interopRequireDefault(_YMUser);

    var _ui = _require(_dependencyMap[6]);

    var _miot = _require(_dependencyMap[7]);

    var UserRequiredAge = function (_Component) {
        babelHelpers.inherits(UserRequiredAge, _Component);

        function UserRequiredAge(props, context) {
            babelHelpers.classCallCheck(this, UserRequiredAge);

            var _this = babelHelpers.possibleConstructorReturn(this, (UserRequiredAge.__proto__ || Object.getPrototypeOf(UserRequiredAge)).call(this, props, context));

            _this._onPressButton = function (requiredViewType) {
                if (requiredViewType == 2) {
                    _this.props.callbackParent(requiredViewType);
                } else if (requiredViewType == 4) {
                    var date = new Date();
                    var year = date.getFullYear;
                    var maxAge = 120;
                    var miniYear = 1;

                    if (_this.state.userAge == 0) {
                        _this.setState({
                            dialogVisible: true,
                            dialogMessage: _Localized.Localized.Global_Interaction_PleaseFillInAge
                        });
                    } else if (_this.state.userAge > maxAge) {
                        _this.setState({
                            dialogVisible: true,
                            dialogMessage: _Localized.Localized.Global_Interaction_TooOld
                        });
                    } else if (_this.state.userAge < miniYear) {
                        _this.setState({
                            dialogVisible: true,
                            dialogMessage: _Localized.Localized.Global_Interaction_TooYoung
                        });
                    } else {
                        _YMUser2.default.getMainUserInfo().age = parseInt(_this.state.userAge);

                        var _date = new Date();

                        var _year = _date.getFullYear() - parseInt(_this.state.userAge);

                        _YMUser2.default.getMainUserInfo().birthday = _year + '0101';
                        console.log('this.state.nickName ' + _this.state.nickName);
                        _YMUser2.default.getMainUserInfo().userName = _this.state.nickName;

                        _this.props.callbackParent(5);
                    }
                }
            };

            _this.state = {
                userAge: 0,
                dialogMessage: "",
                dialogVisible: false,
                nickName: ''
            };

            _miot.Service.account.load().then(function (account) {
                console.log('Service.account.nickName ' + _miot.Service.account.nickName);

                _this.setState({
                    nickName: _miot.Service.account.nickName
                });
            });

            return _this;
        }

        babelHelpers.createClass(UserRequiredAge, [{
            key: "render",
            value: function render() {
                var _this2 = this;

                return _react2.default.createElement(
                    _reactNative.View,
                    {
                        style: style.container
                    },
                    _react2.default.createElement(
                        _reactNative.ScrollView,
                        {
                            contentContainerStyle: {
                                flex: 1,
                                alignItems: 'center',
                                alignContent: 'center'
                            }
                        },
                        _react2.default.createElement(
                            _reactNative.View,
                            {
                                style: {
                                    alignItems: 'center'
                                }
                            },
                            _react2.default.createElement(_UserRequiredTitle2.default, {
                                style: style.UserRequiredTitle,
                                step: "3 / 3"
                            }),
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: {
                                        alignItems: 'center'
                                    }
                                },
                                _react2.default.createElement(
                                    _reactNative.Text,
                                    {
                                        style: style.textTitle
                                    },
                                    _Localized.Localized.Global_UserInfo_Age
                                )
                            ),
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: {
                                        alignItems: 'center'
                                    }
                                },
                                _react2.default.createElement(_reactNative.TextInput, {
                                    style: style.textInput,
                                    autoFocus: true,
                                    underlineColorAndroid: "transparent",
                                    selectionColor: "rgb(37,201,152)",
                                    keyboardType: "number-pad",
                                    maxLength: 3,
                                    onChangeText: function onChangeText(text) {
                                        _this2.state.userAge = text;
                                    }
                                })
                            ),
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: {
                                        flexDirection: 'row',
                                        top: -14,
                                        justifyContent: 'center'
                                    }
                                },
                                _react2.default.createElement(_reactNative.View, {
                                    style: {
                                        marginLeft: 25,
                                        marginTop: 14,
                                        backgroundColor: 'rgb(37,201,152)',
                                        width: 110,
                                        height: 1
                                    }
                                }),
                                _react2.default.createElement(
                                    _reactNative.Text,
                                    {
                                        style: {
                                            marginLeft: 5,
                                            fontSize: 14,
                                            color: 'rgba(0, 0, 0, 0.8)'
                                        }
                                    },
                                    _Localized.Localized.Global_Unit_Years
                                )
                            ),
                            _react2.default.createElement(
                                _reactNative.View,
                                {
                                    style: style.footerView
                                },
                                _react2.default.createElement(
                                    _reactNative.View,
                                    {
                                        style: style.backView
                                    },
                                    _react2.default.createElement(
                                        _reactNative.TouchableOpacity,
                                        {
                                            onPress: function onPress() {
                                                return _this2._onPressButton(2);
                                            }
                                        },
                                        _react2.default.createElement(
                                            _reactNative.Text,
                                            {
                                                style: style.footerText
                                            },
                                            _Localized.Localized.Global_Interaction_Previous
                                        )
                                    )
                                ),
                                _react2.default.createElement(_reactNative.View, {
                                    style: style.line
                                }),
                                _react2.default.createElement(
                                    _reactNative.View,
                                    {
                                        style: style.nextView
                                    },
                                    _react2.default.createElement(
                                        _reactNative.TouchableOpacity,
                                        {
                                            onPress: function onPress() {
                                                return _this2._onPressButton(4);
                                            }
                                        },
                                        _react2.default.createElement(
                                            _reactNative.Text,
                                            {
                                                style: style.footerText
                                            },
                                            _Localized.Localized.Global_Interaction_Finished
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(_ui.MessageDialog, {
                        visible: this.state.dialogVisible,
                        confirm: "\u786E\u5B9A",
                        message: this.state.dialogMessage,
                        onDismiss: function onDismiss() {
                            _this2.setState({
                                dialogVisible: false
                            });
                        }
                    })
                );
            }
        }]);
        return UserRequiredAge;
    }(_react.Component);

    exports.default = UserRequiredAge;

    var style = _reactNative.StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            top: _Global2.default.screenHeight() * 0.17,
            backgroundColor: "rgb(255,255,255)"
        },
        textTitle: {
            marginTop: 42,
            fontSize: 18,
            color: 'rgba(0, 0, 0, 0.8)'
        },
        textInput: {
            marginTop: 23,
            height: 70,
            width: 110,
            color: 'black',
            fontSize: 50,
            alignItems: 'center',
            textAlign: "center"
        },
        footerView: {
            borderRadius: 20,
            borderWidth: 0.5,
            borderColor: 'rgba(0, 0, 0, 0.2)',
            height: 40,
            justifyContent: 'center',
            width: _Global2.default.screenWidth() - 46,
            marginTop: 40,
            flexDirection: 'row'
        },
        backView: {
            alignItems: 'center',
            justifyContent: 'center',
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            height: 40,
            flex: 1
        },
        line: {
            height: 40,
            width: 0.5,
            backgroundColor: 'rgba(0, 0, 0, 0.2)'
        },
        nextView: {
            alignItems: 'center',
            justifyContent: 'center',
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            height: 40,
            flex: 1
        },
        footerText: {
            fontSize: 16,
            color: 'rgba(0, 0, 0, 0.8)',
            textAlign: 'center',
            paddingVertical: 10,
            paddingHorizontal: 40,
            backgroundColor: 'transparent'
        },
        bottomView: {
            height: 1000,
            backgroundColor: 'rgb(255,255,255)'
        }
    });
}, 10526, [10297, 10033, 10013, 10010, 10520, 10019, 10230, 10074], "projects/com.yunmai.scales.ios/Main/Home/UserRequired/UserRequiredAge.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _miot = _require(_dependencyMap[0]);

    var _YMComposition = _require(_dependencyMap[1]);

    var _YMComposition2 = babelHelpers.interopRequireDefault(_YMComposition);

    var _YMBLEControl = _require(_dependencyMap[2]);

    var _YMBLEControl2 = babelHelpers.interopRequireDefault(_YMBLEControl);

    var _YMUser = _require(_dependencyMap[3]);

    var _YMUser2 = babelHelpers.interopRequireDefault(_YMUser);

    var YMHandleScaleData = function YMHandleScaleData() {
        babelHelpers.classCallCheck(this, YMHandleScaleData);
    };

    YMHandleScaleData.currentMac = '';
    YMHandleScaleData.currentDeviceName = 'mi';

    YMHandleScaleData.getWeightInfoWithData = function (data) {
        var userInfo = _YMUser2.default.getCurrentUserInfo();

        var resistance = parseInt(data.substr(30, 4), 16);
        var weight = parseInt(data.substr(26, 4), 16) / 100;

        if (weight < 3) {
            return {};
        }

        var createTime = parseInt(data.substr(10, 8), 16);
        var userId = parseInt(data.substr(18, 8), 16);
        var fat = (parseInt(data.substr(34, 4), 16) / 100).toFixed(1);

        var bmi = _YMComposition2.default.getBMIWithWeight(userInfo.height, weight);

        var deviceVer = parseInt(data.substr(2, 2), 16);
        var deviceName = _YMBLEControl2.default.bleName;

        if (!deviceName) {
            deviceName = YMHandleScaleData.currentDeviceName;
        }

        var muscle = 0.0;
        var water = 0.0;
        var protein = 0.0;
        var visFat = 0;
        var bone = 0.0;
        var bmr = 0;
        var somaAge = 0;

        if (fat < 5 || fat > 75) {
            fat = 0;
        } else {
            muscle = _YMComposition2.default.getMuscleWithFat(fat, 0);
            water = _YMComposition2.default.getWaterWithFat(fat);
            protein = _YMComposition2.default.getProtein(muscle, bmi, weight);
            visFat = _YMComposition2.default.getVisFat(fat, userInfo.age, userInfo.sex);
            bone = _YMComposition2.default.getBoneWithMuscle(muscle, weight, userInfo);
            bmr = _YMComposition2.default.getNewBMR(weight, fat);
            somaAge = _YMComposition2.default.getSomaAgeWithAge(userInfo.age, bmi);
        }

        var macNo = YMHandleScaleData.currentMac;
        userInfo.basisWeight = weight;
        var result = {
            uid: String(userId),
            did: _miot.Device.deviceID,
            deviceName: deviceName,
            macNo: macNo,
            deviceVer: deviceVer,
            weight: weight,
            bmi: bmi,
            fat: fat,
            muscle: muscle,
            water: water,
            protein: protein,
            visFat: visFat,
            bone: bone,
            bmr: bmr,
            somaAge: somaAge,
            resistance: resistance,
            createTime: createTime
        };
        return result;
    };

    exports.default = YMHandleScaleData;
}, 10529, [10074, 10532, 10364, 10019], "projects/com.yunmai.scales.ios/Main/Tools/YMHandleScaleData.js");
__d(function (global, _require, module, exports, _dependencyMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var MANNORMVISFATFLAG = 1.4;
    var WOMANNORMVISFATFLAG = 1.8;
    var FATVISFATFLAG = 1.1;

    var YMComposition = function YMComposition() {
        babelHelpers.classCallCheck(this, YMComposition);
    };

    YMComposition.getBMIWithWeight = function (height, weight) {
        if (!height) {
            return 0;
        }

        var bmi = 0.0;
        bmi = weight / (height / 100 * (height / 100));
        return bmi.toFixed(1);
    };

    YMComposition.getWaterWithFat = function (fat) {
        if (!(fat > 0)) {
            return 0.0;
        }

        var water = (100 - fat) * 0.726;

        if (!(water > 0)) {
            return 0.0;
        }

        return water.toFixed(1);
    };

    YMComposition.getMuscleWithFat = function (fat, bodyType) {
        var muscle = 0.0;

        if (!(fat > 0)) {
            return 0.0;
        }

        var flag = 0.67;

        if (bodyType == 1) {
            flag = 0.7;
        }

        muscle = (100.0 - fat) * flag;

        if (muscle > 0) {
            return muscle.toFixed(1);
        } else {
            return 0.0;
        }
    };

    YMComposition.getBoneWithMuscle = function (muscle, weight, _ref) {
        var height = _ref.height,
            sex = _ref.sex;

        if (muscle < 1) {
            return 0.0;
        }

        var revise1 = 0;
        var revise2 = 0;
        var bone = 0.0;

        if (sex == 1) {
            revise1 = 0.22;
            revise2 = 0.6;
        } else {
            revise1 = 0.34;
            revise2 = 0.45;
        }

        bone = muscle * 0.01 * weight * 4.0 / 7.0 * revise1 * revise2 + (height - 170.0) / 100.0;

        if (bone > 0) {
            return bone.toFixed(1);
        } else {
            return 0.0;
        }
    };

    YMComposition.getSomaAgeWithAge = function (age, bmi) {
        if (age < 18) {
            return 0;
        }

        var somaAge = 0.0;
        var xishu = 0.0;

        if (bmi <= 28) {
            xishu = 1;
        } else if (bmi > 28 && bmi <= 35) {
            xishu = (bmi - 28) / 100 + 1;
        } else if (bmi > 35 && bmi <= 40) {
            xishu = ((bmi - 28) / 100 + 1) * ((bmi - 35) / 100 + 1);
        } else if (bmi > 40) {
            xishu = ((bmi - 28) / 100 + 1) * ((bmi - 35) / 100 + 1) * ((bmi - 40) / 100 + 1);
        }

        var diff = bmi - 24;

        if (diff >= 0) {
            somaAge = (age + Math.pow(Math.abs(diff), 0.5)) * xishu;
        } else {
            somaAge = (age - Math.pow(Math.abs(diff), 0.5)) * xishu;
        }

        return Math.round(somaAge);
    };

    YMComposition.getVisFat = function (fat, age, sex) {
        if (!(fat > 0)) {
            return 0;
        }

        var maxFat = 21;

        if (sex == 1) {
            if (age < 40) {
                maxFat = 21;
            } else if (age >= 40 && age < 60) {
                maxFat = 22;
            } else if (age >= 60) {
                maxFat = 24;
            }
        } else {
            if (age < 40) {
                maxFat = 34;
            } else if (age >= 40 && age < 60) {
                maxFat = 35;
            } else {
                maxFat = 36;
            }
        }

        var visFat = 9;
        var flagFat = fat - maxFat;
        var temp = 0.0;
        var visFatFlag = MANNORMVISFATFLAG;

        if (flagFat > 0) {
            visFatFlag = FATVISFATFLAG;
        } else {
            if (sex == 1) {
                visFatFlag = MANNORMVISFATFLAG;
            } else if (sex == 2) {
                visFatFlag = WOMANNORMVISFATFLAG;
            }
        }

        temp = Math.round(flagFat / visFatFlag);
        visFat = visFat + temp + 0.5;

        if (visFat < 1) {
            visFat = 1;
        } else if (visFat > 30) {
            visFat = 30;
        }

        return Math.round(visFat);
    };

    YMComposition.getProtein = function (muscle, bmi, weight) {
        if (muscle < 1) {
            return 0.0;
        }

        var protein = 0.0;
        var flag = 0.0;
        flag = bmi >= 22.0 ? -Math.pow(bmi - 22.0, 0.25) : Math.pow(22.0 - bmi, 0.3333333333333333);
        flag = flag > 2.5 ? 2.5 : flag;
        flag = flag < -2.5 ? -2.5 : flag;
        protein = weight / 100.0 * (18 + flag) / 100.0 * 100.0 / weight * 100.0;
        return protein.toFixed(1);
    };

    YMComposition.getNewBMR = function (weight, fat) {
        if (!(fat > 0)) {
            return 0;
        }

        var kLBM = weight * (1.0 - fat / 100.0);
        var bmr = 370 + 21.6 * kLBM;
        return Math.round(bmr);
    };

    exports.default = YMComposition;
}, 10532, [], "projects/com.yunmai.scales.ios/Main/Tools/YMComposition.js");
require(10120);
require(10001);
