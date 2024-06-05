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
